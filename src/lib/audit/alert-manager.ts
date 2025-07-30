/**
 * Gestionnaire d'alertes pour le système d'audit des liens morts
 * 
 * Ce service gère :
 * - La détection des seuils critiques
 * - L'envoi d'alertes automatiques via SendGrid
 * - La gestion des notifications pour nouveaux liens morts
 * - L'envoi de rapports hebdomadaires
 */

import { AuditDatabase } from './database';
import { SendGridEmailService, AuditAlertData, WeeklyReportData, BrokenLinkDetail } from '@/lib/email/sendgrid-service';

export interface AlertThresholds {
  criticalLinksThreshold: number;
  healthScoreThreshold: number;
  brokenLinksIncreaseThreshold: number;
  responseTimeThreshold: number;
}

export interface AlertConfig {
  enabled: boolean;
  thresholds: AlertThresholds;
  cooldownPeriod: number; // minutes
  adminEmail: string;
}

export class AlertManager {
  private config: AlertConfig;
  private emailService: SendGridEmailService;
  private lastAlertTimestamps: Map<string, Date> = new Map();

  constructor(config?: Partial<AlertConfig>) {
    this.config = {
      enabled: config?.enabled ?? true,
      thresholds: {
        criticalLinksThreshold: 5,
        healthScoreThreshold: 85,
        brokenLinksIncreaseThreshold: 10,
        responseTimeThreshold: 5000,
        ...config?.thresholds
      },
      cooldownPeriod: config?.cooldownPeriod ?? 60, // 1 hour default
      adminEmail: config?.adminEmail ?? process.env.ADMIN_EMAIL ?? 'ls@laurentserre.com'
    };

    this.emailService = new SendGridEmailService();
  }

  /**
   * Vérifier si une alerte peut être envoyée (respecte le cooldown)
   */
  private canSendAlert(alertType: string): boolean {
    const lastAlert = this.lastAlertTimestamps.get(alertType);
    if (!lastAlert) return true;

    const cooldownMs = this.config.cooldownPeriod * 60 * 1000;
    return Date.now() - lastAlert.getTime() > cooldownMs;
  }

  /**
   * Marquer qu'une alerte a été envoyée
   */
  private markAlertSent(alertType: string): void {
    this.lastAlertTimestamps.set(alertType, new Date());
  }

  /**
   * Analyser les résultats d'audit et détecter les problèmes critiques
   */
  async analyzeAuditResults(): Promise<void> {
    if (!this.config.enabled) {
      console.log('🔕 Alertes désactivées');
      return;
    }

    try {
      // Récupérer le dernier audit
      const latestAudit = await AuditDatabase.getLatestAudit();
      if (!latestAudit) {
        console.log('ℹ️ Aucun audit trouvé pour l\'analyse');
        return;
      }

      // Calculer le score de santé
      const healthScore = latestAudit.total_links > 0 
        ? Math.round(((latestAudit.total_links - latestAudit.broken_links) / latestAudit.total_links) * 100)
        : 100;

      // Récupérer les liens morts avec détails
      const { data: brokenLinksData } = await AuditDatabase.getSupabaseAdmin()
        .from('validation_results')
        .select(`
          url,
          status_code,
          error_message,
          scanned_links!inner(priority, source_file, link_type)
        `)
        .eq('status', 'broken')
        .order('checked_at', { ascending: false });

      const brokenLinks: BrokenLinkDetail[] = (brokenLinksData || []).map(link => ({
        url: link.url,
        error: link.error_message || `Erreur ${link.status_code || 'inconnue'}`,
        seoImpact: this.calculateSEOImpact(link.scanned_links?.priority, link.scanned_links?.link_type),
        sourceFiles: link.scanned_links?.source_file || 'Inconnu',
        priority: link.scanned_links?.priority || 'medium'
      }));

      const criticalLinks = brokenLinks.filter(link => link.priority === 'critical');

      // Vérifier les seuils critiques
      await this.checkCriticalThresholds(latestAudit, healthScore, brokenLinks, criticalLinks);

      // Vérifier les tendances négatives
      await this.checkNegativeTrends(latestAudit, healthScore);

      console.log('✅ Analyse des alertes terminée');

    } catch (error) {
      console.error('❌ Erreur lors de l\'analyse des alertes:', error);
    }
  }

  /**
   * Calculer l'impact SEO d'un lien
   */
  private calculateSEOImpact(priority?: string, linkType?: string): string {
    let impact = 'Moyen';
    
    if (priority === 'critical') {
      impact = 'Critique';
    } else if (priority === 'high') {
      impact = 'Élevé';
    } else if (priority === 'low') {
      impact = 'Faible';
    }

    if (linkType === 'internal') {
      impact += ' (Interne)';
    }

    return impact;
  }

  /**
   * Vérifier les seuils critiques
   */
  private async checkCriticalThresholds(
    audit: any,
    healthScore: number,
    brokenLinks: BrokenLinkDetail[],
    criticalLinks: BrokenLinkDetail[]
  ): Promise<void> {
    
    // Alerte pour liens critiques
    if (criticalLinks.length >= this.config.thresholds.criticalLinksThreshold) {
      if (this.canSendAlert('critical_links')) {
        await this.sendCriticalLinksAlert(audit, healthScore, brokenLinks, criticalLinks);
        this.markAlertSent('critical_links');
      }
    }

    // Alerte pour score de santé faible
    if (healthScore < this.config.thresholds.healthScoreThreshold) {
      if (this.canSendAlert('low_health_score')) {
        await this.sendLowHealthScoreAlert(audit, healthScore, brokenLinks);
        this.markAlertSent('low_health_score');
      }
    }

    // Alerte pour augmentation importante des liens morts
    const previousAudit = await this.getPreviousAudit(audit.id);
    if (previousAudit) {
      const increase = audit.broken_links - previousAudit.broken_links;
      if (increase >= this.config.thresholds.brokenLinksIncreaseThreshold) {
        if (this.canSendAlert('broken_links_increase')) {
          await this.sendBrokenLinksIncreaseAlert(audit, previousAudit, increase, brokenLinks);
          this.markAlertSent('broken_links_increase');
        }
      }
    }
  }

  /**
   * Vérifier les tendances négatives
   */
  private async checkNegativeTrends(audit: any, healthScore: number): Promise<void> {
    // Récupérer les 5 derniers audits pour analyser les tendances
    const { data: recentAudits } = await AuditDatabase.getSupabaseAdmin()
      .from('audit_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (!recentAudits || recentAudits.length < 3) {
      return; // Pas assez de données pour analyser les tendances
    }

    // Calculer la tendance du score de santé
    const healthScores = recentAudits.map(a => {
      return a.total_links > 0 
        ? ((a.total_links - a.broken_links) / a.total_links) * 100
        : 100;
    });

    const isDecreasingTrend = this.isDecreasingTrend(healthScores);
    
    if (isDecreasingTrend && this.canSendAlert('negative_trend')) {
      await this.sendNegativeTrendAlert(recentAudits, healthScores);
      this.markAlertSent('negative_trend');
    }
  }

  /**
   * Détecter une tendance décroissante
   */
  private isDecreasingTrend(values: number[]): boolean {
    if (values.length < 3) return false;
    
    let decreasingCount = 0;
    for (let i = 1; i < values.length; i++) {
      if (values[i] < values[i - 1]) {
        decreasingCount++;
      }
    }
    
    // Tendance décroissante si au moins 60% des valeurs diminuent
    return decreasingCount / (values.length - 1) >= 0.6;
  }

  /**
   * Récupérer l'audit précédent
   */
  private async getPreviousAudit(currentAuditId: number): Promise<any> {
    const { data } = await AuditDatabase.getSupabaseAdmin()
      .from('audit_history')
      .select('*')
      .lt('id', currentAuditId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    return data;
  }

  /**
   * Envoyer une alerte pour liens critiques
   */
  private async sendCriticalLinksAlert(
    audit: any,
    healthScore: number,
    brokenLinks: BrokenLinkDetail[],
    criticalLinks: BrokenLinkDetail[]
  ): Promise<void> {
    const alertData: AuditAlertData = {
      brokenLinksCount: brokenLinks.length,
      totalLinks: audit.total_links,
      healthScore,
      criticalLinks,
      reportUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/audit-dashboard`,
      timestamp: new Date().toLocaleString('fr-FR')
    };

    const success = await this.emailService.sendAuditAlert(alertData);
    if (success) {
      console.log(`🚨 Alerte liens critiques envoyée (${criticalLinks.length} liens)`);
    }
  }

  /**
   * Envoyer une alerte pour score de santé faible
   */
  private async sendLowHealthScoreAlert(
    audit: any,
    healthScore: number,
    brokenLinks: BrokenLinkDetail[]
  ): Promise<void> {
    const alertData: AuditAlertData = {
      brokenLinksCount: brokenLinks.length,
      totalLinks: audit.total_links,
      healthScore,
      criticalLinks: brokenLinks.filter(link => link.priority === 'critical'),
      reportUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/audit-dashboard`,
      timestamp: new Date().toLocaleString('fr-FR')
    };

    const success = await this.emailService.sendAuditAlert(alertData);
    if (success) {
      console.log(`📉 Alerte score de santé faible envoyée (${healthScore}%)`);
    }
  }

  /**
   * Envoyer une alerte pour augmentation des liens morts
   */
  private async sendBrokenLinksIncreaseAlert(
    currentAudit: any,
    previousAudit: any,
    increase: number,
    brokenLinks: BrokenLinkDetail[]
  ): Promise<void> {
    const healthScore = currentAudit.total_links > 0 
      ? Math.round(((currentAudit.total_links - currentAudit.broken_links) / currentAudit.total_links) * 100)
      : 100;

    const alertData: AuditAlertData = {
      brokenLinksCount: brokenLinks.length,
      totalLinks: currentAudit.total_links,
      healthScore,
      criticalLinks: brokenLinks.filter(link => link.priority === 'critical'),
      reportUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/audit-dashboard`,
      timestamp: new Date().toLocaleString('fr-FR')
    };

    const success = await this.emailService.sendAuditAlert(alertData);
    if (success) {
      console.log(`📈 Alerte augmentation liens morts envoyée (+${increase} liens)`);
    }
  }

  /**
   * Envoyer une alerte pour tendance négative
   */
  private async sendNegativeTrendAlert(
    recentAudits: any[],
    healthScores: number[]
  ): Promise<void> {
    const latestAudit = recentAudits[0];
    const currentHealthScore = healthScores[0];

    // Récupérer les liens morts actuels
    const { data: brokenLinksData } = await AuditDatabase.getSupabaseAdmin()
      .from('validation_results')
      .select(`
        url,
        error_message,
        scanned_links!inner(priority, source_file, link_type)
      `)
      .eq('status', 'broken')
      .limit(10);

    const brokenLinks: BrokenLinkDetail[] = (brokenLinksData || []).map(link => ({
      url: link.url,
      error: link.error_message || 'Erreur inconnue',
      seoImpact: this.calculateSEOImpact(link.scanned_links?.priority, link.scanned_links?.link_type),
      sourceFiles: link.scanned_links?.source_file || 'Inconnu',
      priority: link.scanned_links?.priority || 'medium'
    }));

    const alertData: AuditAlertData = {
      brokenLinksCount: latestAudit.broken_links,
      totalLinks: latestAudit.total_links,
      healthScore: Math.round(currentHealthScore),
      criticalLinks: brokenLinks.filter(link => link.priority === 'critical'),
      reportUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/audit-dashboard`,
      timestamp: new Date().toLocaleString('fr-FR')
    };

    const success = await this.emailService.sendAuditAlert(alertData);
    if (success) {
      console.log('📉 Alerte tendance négative envoyée');
    }
  }

  /**
   * Générer et envoyer le rapport hebdomadaire
   */
  async sendWeeklyReport(): Promise<void> {
    if (!this.config.enabled) {
      console.log('🔕 Rapports hebdomadaires désactivés');
      return;
    }

    try {
      // Calculer la période (7 derniers jours)
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const period = `${startDate.toLocaleDateString('fr-FR')} - ${endDate.toLocaleDateString('fr-FR')}`;

      // Récupérer les audits de la semaine
      const { data: weeklyAudits } = await AuditDatabase.getSupabaseAdmin()
        .from('audit_history')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

      if (!weeklyAudits || weeklyAudits.length === 0) {
        console.log('ℹ️ Aucun audit cette semaine pour le rapport');
        return;
      }

      // Calculer les statistiques
      const totalAudits = weeklyAudits.length;
      const averageHealthScore = Math.round(
        weeklyAudits.reduce((sum, audit) => sum + audit.seo_score, 0) / totalAudits
      );
      const totalBrokenLinks = weeklyAudits[weeklyAudits.length - 1].broken_links;
      const totalCorrections = weeklyAudits.reduce((sum, audit) => sum + audit.corrected_links, 0);

      // Calculer les tendances
      const firstAudit = weeklyAudits[0];
      const lastAudit = weeklyAudits[weeklyAudits.length - 1];
      const healthScoreChange = lastAudit.seo_score - firstAudit.seo_score;
      const brokenLinksChange = lastAudit.broken_links - firstAudit.broken_links;

      // Récupérer les ressources les plus demandées
      const { data: requestedResources } = await AuditDatabase.getSupabaseAdmin()
        .from('resource_requests')
        .select('requested_url')
        .gte('created_at', startDate.toISOString());

      const resourceCounts = new Map<string, number>();
      requestedResources?.forEach(req => {
        const count = resourceCounts.get(req.requested_url) || 0;
        resourceCounts.set(req.requested_url, count + 1);
      });

      const mostRequestedResources = Array.from(resourceCounts.entries())
        .map(([url, count]) => ({ url, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Préparer les données du rapport
      const reportData: WeeklyReportData = {
        period,
        totalAudits,
        averageHealthScore,
        totalBrokenLinks,
        totalCorrections,
        mostRequestedResources,
        trends: {
          healthScoreChange,
          brokenLinksChange
        }
      };

      // Envoyer le rapport
      const success = await this.emailService.sendWeeklyReport(reportData);
      if (success) {
        console.log('📊 Rapport hebdomadaire envoyé avec succès');
      }

    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi du rapport hebdomadaire:', error);
    }
  }

  /**
   * Configurer les seuils d'alerte
   */
  updateThresholds(newThresholds: Partial<AlertThresholds>): void {
    this.config.thresholds = {
      ...this.config.thresholds,
      ...newThresholds
    };
    console.log('⚙️ Seuils d\'alerte mis à jour:', this.config.thresholds);
  }

  /**
   * Activer/désactiver les alertes
   */
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
    console.log(`${enabled ? '🔔' : '🔕'} Alertes ${enabled ? 'activées' : 'désactivées'}`);
  }

  /**
   * Obtenir la configuration actuelle
   */
  getConfig(): AlertConfig {
    return { ...this.config };
  }

  /**
   * Tester le système d'alertes
   */
  async testAlerts(): Promise<boolean> {
    try {
      console.log('🧪 Test du système d\'alertes...');
      
      // Test avec des données fictives
      const testAlertData: AuditAlertData = {
        brokenLinksCount: 3,
        totalLinks: 100,
        healthScore: 97,
        criticalLinks: [
          {
            url: 'https://example.com/test-link',
            error: 'Test error',
            seoImpact: 'Test',
            sourceFiles: 'test-file.tsx',
            priority: 'critical'
          }
        ],
        reportUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/audit-dashboard`,
        timestamp: new Date().toLocaleString('fr-FR')
      };

      const success = await this.emailService.sendAuditAlert(testAlertData);
      console.log(`${success ? '✅' : '❌'} Test d'alerte ${success ? 'réussi' : 'échoué'}`);
      
      return success;
    } catch (error) {
      console.error('❌ Erreur lors du test d\'alertes:', error);
      return false;
    }
  }
}

/**
 * Instance singleton du gestionnaire d'alertes
 */
let _alertManagerInstance: AlertManager | null = null;

export function getAlertManager(): AlertManager {
  if (!_alertManagerInstance) {
    _alertManagerInstance = new AlertManager();
  }
  return _alertManagerInstance;
}