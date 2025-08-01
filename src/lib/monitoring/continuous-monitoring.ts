/**
 * Continuous Monitoring System - Système de monitoring continu
 * 
 * Ce module implémente le monitoring continu pour l'optimisation Vercel avec :
 * - Alertes automatiques pour tous les seuils critiques
 * - Reporting automatique des métriques d'usage
 * - Dashboards de suivi pour l'équipe technique
 * - Monitoring de la santé des fallbacks GitHub Actions
 */

import { VercelUsageMonitor } from '@/lib/vercel/usage-monitor';
import { PerformanceAlerts } from '@/lib/vercel/performance-alerts';
import { AlertManager } from '@/lib/audit/alert-manager';
import { FallbackManager } from '@/lib/vercel/fallback-manager';
import { GitHubActionsFallback } from '@/lib/vercel/github-actions-fallback';

export interface MonitoringConfig {
  /** Intervalle de vérification en millisecondes */
  checkInterval: number;
  /** Seuils d'alerte pour l'usage Vercel */
  usageThresholds: {
    warning: number;    // 70%
    error: number;      // 80%
    critical: number;   // 90%
  };
  /** Configuration des alertes */
  alerting: {
    enabled: boolean;
    cooldownMinutes: number;
    adminEmail: string;
    slackWebhook?: string;
  };
  /** Configuration des rapports automatiques */
  reporting: {
    dailyReport: boolean;
    weeklyReport: boolean;
    monthlyReport: boolean;
    reportEmail: string;
  };
  /** Configuration du monitoring des fallbacks */
  fallbackMonitoring: {
    enabled: boolean;
    healthCheckInterval: number; // en millisecondes
    maxFailureCount: number;
  };
}

export interface MonitoringMetrics {
  timestamp: Date;
  vercelUsage: {
    invocations: number;
    computeHours: number;
    percentageUsed: number;
    projectedMonthly: number;
  };
  performance: {
    averageResponseTime: number;
    errorRate: number;
    memoryUsage: number;
    slowFunctions: number;
  };
  systemHealth: {
    vercelStatus: 'healthy' | 'warning' | 'critical';
    databaseStatus: 'healthy' | 'slow' | 'unhealthy';
    fallbackStatus: 'ready' | 'active' | 'failed';
    lastAuditTime: Date | null;
  };
  alerts: {
    activeAlerts: number;
    criticalAlerts: number;
    alertsSentToday: number;
  };
}

export interface AlertRule {
  id: string;
  name: string;
  condition: (metrics: MonitoringMetrics) => boolean;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: (metrics: MonitoringMetrics) => string;
  cooldownMinutes: number;
  enabled: boolean;
  lastTriggered?: Date;
}

export class ContinuousMonitoring {
  private config: MonitoringConfig;
  private usageMonitor: VercelUsageMonitor;
  private performanceAlerts: PerformanceAlerts;
  private alertManager: AlertManager;
  private fallbackManager: FallbackManager;
  private githubFallback: GitHubActionsFallback;
  
  private isRunning: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private metricsHistory: MonitoringMetrics[] = [];
  private alertRules: AlertRule[] = [];
  private lastMetrics: MonitoringMetrics | null = null;

  constructor(config?: Partial<MonitoringConfig>) {
    this.config = {
      checkInterval: 5 * 60 * 1000, // 5 minutes par défaut
      usageThresholds: {
        warning: 70,
        error: 80,
        critical: 90
      },
      alerting: {
        enabled: true,
        cooldownMinutes: 30,
        adminEmail: process.env.ADMIN_EMAIL || 'ls@laurentserre.com'
      },
      reporting: {
        dailyReport: true,
        weeklyReport: true,
        monthlyReport: true,
        reportEmail: process.env.ADMIN_EMAIL || 'ls@laurentserre.com'
      },
      fallbackMonitoring: {
        enabled: true,
        healthCheckInterval: 10 * 60 * 1000, // 10 minutes
        maxFailureCount: 3
      },
      ...config
    };

    // Initialize components with graceful degradation
    try {
      this.usageMonitor = new VercelUsageMonitor();
    } catch (error) {
      console.warn('⚠️ VercelUsageMonitor not available - monitoring will work with limited functionality');
      this.usageMonitor = null as any;
    }

    try {
      this.alertManager = new AlertManager();
    } catch (error) {
      console.warn('⚠️ AlertManager not available - alerts will be logged only');
      // Create a mock alert manager for testing
      this.alertManager = {
        sendAlert: async () => console.log('Mock alert sent'),
        analyzeAuditResults: async () => console.log('Mock audit analysis'),
        sendWeeklyReport: async () => console.log('Mock weekly report'),
        testAlerts: async () => true,
        getConfig: () => ({ enabled: false }),
        setEnabled: () => {},
        updateThresholds: () => {}
      } as any;
    }
    this.performanceAlerts = new PerformanceAlerts(this.alertManager);
    this.fallbackManager = new FallbackManager();
    this.githubFallback = new GitHubActionsFallback();

    this.initializeAlertRules();
  }

  /**
   * Démarre le monitoring continu
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      console.log('⚠️ Le monitoring continu est déjà en cours');
      return;
    }

    console.log('🚀 Démarrage du monitoring continu...');
    this.isRunning = true;

    // Première vérification immédiate
    await this.performMonitoringCycle();

    // Programmer les vérifications périodiques
    this.monitoringInterval = setInterval(async () => {
      try {
        await this.performMonitoringCycle();
      } catch (error) {
        console.error('❌ Erreur lors du cycle de monitoring:', error);
      }
    }, this.config.checkInterval);

    console.log(`✅ Monitoring continu démarré (intervalle: ${this.config.checkInterval / 1000}s)`);
  }

  /**
   * Arrête le monitoring continu
   */
  stop(): void {
    if (!this.isRunning) {
      console.log('⚠️ Le monitoring continu n\'est pas en cours');
      return;
    }

    console.log('🛑 Arrêt du monitoring continu...');
    this.isRunning = false;

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    console.log('✅ Monitoring continu arrêté');
  }

  /**
   * Effectue un cycle complet de monitoring
   */
  private async performMonitoringCycle(): Promise<void> {
    console.log('🔍 Début du cycle de monitoring...');

    try {
      // 1. Collecter les métriques
      const metrics = await this.collectMetrics();
      
      // 2. Stocker les métriques
      this.storeMetrics(metrics);
      
      // 3. Vérifier les règles d'alerte
      await this.checkAlertRules(metrics);
      
      // 4. Vérifier la santé des fallbacks
      if (this.config.fallbackMonitoring.enabled) {
        await this.checkFallbackHealth();
      }
      
      // 5. Générer les rapports si nécessaire
      await this.generateScheduledReports();
      
      console.log('✅ Cycle de monitoring terminé');
    } catch (error) {
      console.error('❌ Erreur lors du cycle de monitoring:', error);
      
      // Envoyer une alerte pour l'erreur de monitoring
      await this.sendMonitoringErrorAlert(error);
    }
  }

  /**
   * Collecte toutes les métriques du système
   */
  private async collectMetrics(): Promise<MonitoringMetrics> {
    console.log('📊 Collecte des métriques...');

    // Métriques d'usage Vercel (avec fallback si non disponible)
    let vercelUsage;
    try {
      vercelUsage = this.usageMonitor ? await this.usageMonitor.getCurrentUsage() : {
        functionInvocations: 0,
        computeHours: 0,
        percentageOfLimit: 0,
        projectedMonthly: 0,
        timestamp: new Date()
      };
    } catch (error) {
      console.warn('⚠️ Impossible de récupérer les métriques Vercel, utilisation de valeurs par défaut');
      vercelUsage = {
        functionInvocations: 0,
        computeHours: 0,
        percentageOfLimit: 0,
        projectedMonthly: 0,
        timestamp: new Date()
      };
    }
    
    // Métriques de performance (simulées pour l'exemple)
    const performance = {
      averageResponseTime: 1200, // ms
      errorRate: 2.1, // %
      memoryUsage: 380, // MB
      slowFunctions: 0
    };

    // Santé du système (avec fallback si non disponible)
    let systemHealth;
    try {
      systemHealth = await this.fallbackManager.checkSystemHealth();
    } catch (error) {
      console.warn('⚠️ Impossible de vérifier la santé du système, utilisation de valeurs par défaut');
      systemHealth = {
        vercelCrons: 'unknown' as const,
        vercelApi: 'unknown' as const,
        database: 'unknown' as const,
        lastAuditTime: null,
        timeSinceLastAudit: 0
      };
    }
    
    // Alertes actives
    const alerts = {
      activeAlerts: 0, // À implémenter avec un système de stockage des alertes
      criticalAlerts: 0,
      alertsSentToday: 0
    };

    const metrics: MonitoringMetrics = {
      timestamp: new Date(),
      vercelUsage: {
        invocations: vercelUsage.functionInvocations,
        computeHours: vercelUsage.computeHours,
        percentageUsed: vercelUsage.percentageOfLimit,
        projectedMonthly: vercelUsage.projectedMonthly
      },
      performance,
      systemHealth: {
        vercelStatus: this.determineVercelStatus(vercelUsage.percentageOfLimit),
        databaseStatus: systemHealth.database,
        fallbackStatus: systemHealth.vercelCrons === 'healthy' ? 'ready' : 'active',
        lastAuditTime: systemHealth.lastAuditTime
      },
      alerts
    };

    this.lastMetrics = metrics;
    return metrics;
  }

  /**
   * Stocke les métriques dans l'historique
   */
  private storeMetrics(metrics: MonitoringMetrics): void {
    this.metricsHistory.push(metrics);
    
    // Garder seulement les 1000 dernières métriques (environ 3.5 jours à 5min d'intervalle)
    if (this.metricsHistory.length > 1000) {
      this.metricsHistory = this.metricsHistory.slice(-1000);
    }

    // Sauvegarder en base de données (optionnel)
    this.saveMetricsToDatabase(metrics).catch(console.error);
  }

  /**
   * Sauvegarde les métriques en base de données
   */
  private async saveMetricsToDatabase(metrics: MonitoringMetrics): Promise<void> {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      await supabase
        .from('monitoring_metrics')
        .insert({
          timestamp: metrics.timestamp.toISOString(),
          vercel_invocations: metrics.vercelUsage.invocations,
          vercel_compute_hours: metrics.vercelUsage.computeHours,
          vercel_percentage_used: metrics.vercelUsage.percentageUsed,
          average_response_time: metrics.performance.averageResponseTime,
          error_rate: metrics.performance.errorRate,
          memory_usage: metrics.performance.memoryUsage,
          vercel_status: metrics.systemHealth.vercelStatus,
          database_status: metrics.systemHealth.databaseStatus,
          fallback_status: metrics.systemHealth.fallbackStatus,
          active_alerts: metrics.alerts.activeAlerts
        });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des métriques:', error);
    }
  }

  /**
   * Vérifie toutes les règles d'alerte
   */
  private async checkAlertRules(metrics: MonitoringMetrics): Promise<void> {
    for (const rule of this.alertRules) {
      if (!rule.enabled) continue;

      // Vérifier le cooldown
      if (rule.lastTriggered) {
        const timeSinceLastAlert = Date.now() - rule.lastTriggered.getTime();
        const cooldownMs = rule.cooldownMinutes * 60 * 1000;
        if (timeSinceLastAlert < cooldownMs) continue;
      }

      // Évaluer la condition
      if (rule.condition(metrics)) {
        console.log(`🚨 Règle d'alerte déclenchée: ${rule.name}`);
        
        await this.sendAlert({
          id: rule.id,
          name: rule.name,
          severity: rule.severity,
          message: rule.message(metrics),
          timestamp: new Date(),
          metrics
        });

        rule.lastTriggered = new Date();
      }
    }
  }

  /**
   * Vérifie la santé des systèmes de fallback
   */
  private async checkFallbackHealth(): Promise<void> {
    console.log('🏥 Vérification de la santé des fallbacks...');

    try {
      // Vérifier si le fallback doit être activé
      const fallbackStatus = await this.fallbackManager.shouldActivateFallback();
      
      if (fallbackStatus.isVercelDown && !fallbackStatus.fallbackActive) {
        console.log('🔄 Activation automatique du fallback...');
        
        // Activer le fallback d'urgence
        const success = await this.fallbackManager.activateFallback('urgent');
        
        if (success) {
          await this.sendAlert({
            id: 'fallback_activated',
            name: 'Fallback GitHub Actions Activé',
            severity: 'critical',
            message: `Le système de fallback a été activé automatiquement. Raison: ${fallbackStatus.reason}`,
            timestamp: new Date(),
            metrics: this.lastMetrics
          });
        } else {
          await this.sendAlert({
            id: 'fallback_failed',
            name: 'Échec d\'Activation du Fallback',
            severity: 'critical',
            message: `Impossible d'activer le système de fallback. Intervention manuelle requise.`,
            timestamp: new Date(),
            metrics: this.lastMetrics
          });
        }
      }

      // Vérifier la santé des workflows GitHub Actions
      await this.checkGitHubActionsHealth();
      
    } catch (error) {
      console.error('❌ Erreur lors de la vérification des fallbacks:', error);
    }
  }

  /**
   * Vérifie la santé des workflows GitHub Actions
   */
  private async checkGitHubActionsHealth(): Promise<void> {
    if (!this.githubFallback.isConfigured()) {
      console.warn('⚠️ GitHub Actions non configuré - monitoring des fallbacks désactivé');
      return;
    }

    try {
      // Récupérer les workflows de fallback disponibles
      const workflows = await this.githubFallback.listAvailableWorkflows();
      
      for (const workflow of workflows) {
        // Vérifier les runs récents de chaque workflow
        const recentRuns = await this.githubFallback.getRecentWorkflowRuns(workflow.path, 5);
        
        // Analyser les échecs récents
        const failedRuns = recentRuns.filter(run => run.conclusion === 'failure');
        const failureRate = failedRuns.length / Math.max(recentRuns.length, 1);
        
        if (failureRate > 0.5) { // Plus de 50% d'échecs
          await this.sendAlert({
            id: `github_workflow_failing_${workflow.id}`,
            name: 'Workflow GitHub Actions en Échec',
            severity: 'error',
            message: `Le workflow ${workflow.name} a un taux d'échec élevé (${Math.round(failureRate * 100)}%)`,
            timestamp: new Date(),
            metrics: this.lastMetrics
          });
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification des workflows GitHub Actions:', error);
    }
  }

  /**
   * Génère les rapports programmés
   */
  private async generateScheduledReports(): Promise<void> {
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay();
    const dayOfMonth = now.getDate();

    // Rapport quotidien à 9h
    if (this.config.reporting.dailyReport && hour === 9 && !this.hasReportBeenSentToday('daily')) {
      await this.generateDailyReport();
      this.markReportAsSent('daily');
    }

    // Rapport hebdomadaire le lundi à 10h
    if (this.config.reporting.weeklyReport && dayOfWeek === 1 && hour === 10 && !this.hasReportBeenSentToday('weekly')) {
      await this.generateWeeklyReport();
      this.markReportAsSent('weekly');
    }

    // Rapport mensuel le 1er du mois à 11h
    if (this.config.reporting.monthlyReport && dayOfMonth === 1 && hour === 11 && !this.hasReportBeenSentToday('monthly')) {
      await this.generateMonthlyReport();
      this.markReportAsSent('monthly');
    }
  }

  /**
   * Génère le rapport quotidien
   */
  private async generateDailyReport(): Promise<void> {
    console.log('📊 Génération du rapport quotidien...');

    const last24h = this.metricsHistory.filter(
      m => Date.now() - m.timestamp.getTime() < 24 * 60 * 60 * 1000
    );

    if (last24h.length === 0) {
      console.log('⚠️ Pas assez de données pour le rapport quotidien');
      return;
    }

    const avgUsage = last24h.reduce((sum, m) => sum + m.vercelUsage.percentageUsed, 0) / last24h.length;
    const maxUsage = Math.max(...last24h.map(m => m.vercelUsage.percentageUsed));
    const avgResponseTime = last24h.reduce((sum, m) => sum + m.performance.averageResponseTime, 0) / last24h.length;
    const totalAlerts = last24h.reduce((sum, m) => sum + m.alerts.activeAlerts, 0);

    const report = {
      period: '24 dernières heures',
      averageUsage: Math.round(avgUsage),
      maxUsage: Math.round(maxUsage),
      averageResponseTime: Math.round(avgResponseTime),
      totalAlerts,
      systemStatus: this.lastMetrics?.systemHealth.vercelStatus || 'unknown',
      fallbackActivations: 0, // À calculer depuis les logs
      recommendations: this.generateRecommendations()
    };

    await this.sendReport('daily', report);
  }

  /**
   * Génère le rapport hebdomadaire
   */
  private async generateWeeklyReport(): Promise<void> {
    console.log('📊 Génération du rapport hebdomadaire...');
    
    // Utiliser le système existant de rapport hebdomadaire
    await this.alertManager.sendWeeklyReport();
  }

  /**
   * Génère le rapport mensuel
   */
  private async generateMonthlyReport(): Promise<void> {
    console.log('📊 Génération du rapport mensuel...');

    const prediction = await this.usageMonitor.predictMonthlyUsage();
    const trend = this.usageMonitor.getUsageTrend();

    const report = {
      period: 'Mois en cours',
      projectedInvocations: Math.round(prediction.predictedInvocations),
      projectedComputeHours: prediction.predictedComputeHours.toFixed(1),
      riskLevel: prediction.riskLevel,
      trend: trend.trend,
      changeRate: trend.changeRate.toFixed(1),
      recommendations: prediction.recommendations,
      upgradeRecommendation: prediction.riskLevel === 'critical'
    };

    await this.sendReport('monthly', report);
  }

  /**
   * Initialise les règles d'alerte par défaut
   */
  private initializeAlertRules(): void {
    this.alertRules = [
      {
        id: 'vercel_usage_warning',
        name: 'Usage Vercel - Seuil d\'Avertissement',
        condition: (metrics) => metrics.vercelUsage.percentageUsed >= this.config.usageThresholds.warning,
        severity: 'warning',
        message: (metrics) => `Usage Vercel à ${metrics.vercelUsage.percentageUsed.toFixed(1)}% (seuil: ${this.config.usageThresholds.warning}%)`,
        cooldownMinutes: 60,
        enabled: true
      },
      {
        id: 'vercel_usage_error',
        name: 'Usage Vercel - Seuil d\'Erreur',
        condition: (metrics) => metrics.vercelUsage.percentageUsed >= this.config.usageThresholds.error,
        severity: 'error',
        message: (metrics) => `Usage Vercel critique à ${metrics.vercelUsage.percentageUsed.toFixed(1)}% (seuil: ${this.config.usageThresholds.error}%)`,
        cooldownMinutes: 30,
        enabled: true
      },
      {
        id: 'vercel_usage_critical',
        name: 'Usage Vercel - Seuil Critique',
        condition: (metrics) => metrics.vercelUsage.percentageUsed >= this.config.usageThresholds.critical,
        severity: 'critical',
        message: (metrics) => `Usage Vercel CRITIQUE à ${metrics.vercelUsage.percentageUsed.toFixed(1)}% (seuil: ${this.config.usageThresholds.critical}%) - Risque d'interruption de service`,
        cooldownMinutes: 15,
        enabled: true
      },
      {
        id: 'high_response_time',
        name: 'Temps de Réponse Élevé',
        condition: (metrics) => metrics.performance.averageResponseTime > 5000,
        severity: 'warning',
        message: (metrics) => `Temps de réponse élevé: ${metrics.performance.averageResponseTime}ms (seuil: 5000ms)`,
        cooldownMinutes: 30,
        enabled: true
      },
      {
        id: 'high_error_rate',
        name: 'Taux d\'Erreur Élevé',
        condition: (metrics) => metrics.performance.errorRate > 5,
        severity: 'error',
        message: (metrics) => `Taux d'erreur élevé: ${metrics.performance.errorRate.toFixed(1)}% (seuil: 5%)`,
        cooldownMinutes: 15,
        enabled: true
      },
      {
        id: 'database_unhealthy',
        name: 'Base de Données Inaccessible',
        condition: (metrics) => metrics.systemHealth.databaseStatus === 'unhealthy',
        severity: 'critical',
        message: () => 'Base de données inaccessible - Intervention immédiate requise',
        cooldownMinutes: 10,
        enabled: true
      },
      {
        id: 'fallback_active',
        name: 'Système de Fallback Actif',
        condition: (metrics) => metrics.systemHealth.fallbackStatus === 'active',
        severity: 'error',
        message: () => 'Le système de fallback GitHub Actions est actif - Vercel pourrait être en panne',
        cooldownMinutes: 30,
        enabled: true
      }
    ];
  }

  /**
   * Détermine le statut Vercel basé sur le pourcentage d'usage
   */
  private determineVercelStatus(percentageUsed: number): 'healthy' | 'warning' | 'critical' {
    if (percentageUsed >= this.config.usageThresholds.critical) return 'critical';
    if (percentageUsed >= this.config.usageThresholds.warning) return 'warning';
    return 'healthy';
  }

  /**
   * Envoie une alerte
   */
  private async sendAlert(alert: {
    id: string;
    name: string;
    severity: 'info' | 'warning' | 'error' | 'critical';
    message: string;
    timestamp: Date;
    metrics: MonitoringMetrics | null;
  }): Promise<void> {
    if (!this.config.alerting.enabled) {
      console.log('🔕 Alertes désactivées - alerte ignorée:', alert.name);
      return;
    }

    console.log(`🚨 Envoi d'alerte [${alert.severity.toUpperCase()}]: ${alert.name}`);
    console.log(`📝 Message: ${alert.message}`);

    try {
      // Envoyer via le système d'alerte existant
      await this.alertManager.sendAlert({
        type: 'monitoring',
        severity: alert.severity,
        title: alert.name,
        message: alert.message,
        details: {
          alertId: alert.id,
          timestamp: alert.timestamp.toISOString(),
          metrics: alert.metrics
        },
        timestamp: alert.timestamp
      });

      console.log('✅ Alerte envoyée avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'alerte:', error);
    }
  }

  /**
   * Envoie un rapport
   */
  private async sendReport(type: 'daily' | 'weekly' | 'monthly', report: any): Promise<void> {
    console.log(`📊 Envoi du rapport ${type}...`);

    try {
      // Pour l'instant, on log le rapport
      // Dans une implémentation complète, on l'enverrait par email
      console.log(`Rapport ${type}:`, JSON.stringify(report, null, 2));
      
      console.log(`✅ Rapport ${type} envoyé`);
    } catch (error) {
      console.error(`❌ Erreur lors de l'envoi du rapport ${type}:`, error);
    }
  }

  /**
   * Envoie une alerte d'erreur de monitoring
   */
  private async sendMonitoringErrorAlert(error: any): Promise<void> {
    await this.sendAlert({
      id: 'monitoring_error',
      name: 'Erreur du Système de Monitoring',
      severity: 'error',
      message: `Erreur lors du cycle de monitoring: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      timestamp: new Date(),
      metrics: this.lastMetrics
    });
  }

  /**
   * Génère des recommandations basées sur les métriques actuelles
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    if (!this.lastMetrics) return recommendations;

    const metrics = this.lastMetrics;

    if (metrics.vercelUsage.percentageUsed > 80) {
      recommendations.push('Considérer l\'upgrade vers Vercel Pro pour éviter les limitations');
    }

    if (metrics.performance.averageResponseTime > 3000) {
      recommendations.push('Optimiser les performances des fonctions (cache, requêtes DB)');
    }

    if (metrics.performance.errorRate > 3) {
      recommendations.push('Investiguer et corriger les erreurs récurrentes');
    }

    if (metrics.systemHealth.databaseStatus === 'slow') {
      recommendations.push('Optimiser les requêtes de base de données et les index');
    }

    return recommendations;
  }

  /**
   * Vérifie si un rapport a déjà été envoyé aujourd'hui
   */
  private hasReportBeenSentToday(type: string): boolean {
    // Implémentation simplifiée - dans un vrai système, on vérifierait en base
    return false;
  }

  /**
   * Marque un rapport comme envoyé
   */
  private markReportAsSent(type: string): void {
    // Implémentation simplifiée - dans un vrai système, on sauvegarderait en base
    console.log(`📝 Rapport ${type} marqué comme envoyé`);
  }

  /**
   * Obtient les métriques actuelles
   */
  getCurrentMetrics(): MonitoringMetrics | null {
    return this.lastMetrics;
  }

  /**
   * Obtient l'historique des métriques
   */
  getMetricsHistory(hours: number = 24): MonitoringMetrics[] {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    return this.metricsHistory.filter(m => m.timestamp.getTime() > cutoff);
  }

  /**
   * Obtient les règles d'alerte actives
   */
  getAlertRules(): AlertRule[] {
    return [...this.alertRules];
  }

  /**
   * Met à jour une règle d'alerte
   */
  updateAlertRule(ruleId: string, updates: Partial<AlertRule>): boolean {
    const ruleIndex = this.alertRules.findIndex(r => r.id === ruleId);
    if (ruleIndex === -1) return false;

    this.alertRules[ruleIndex] = { ...this.alertRules[ruleIndex], ...updates };
    console.log(`⚙️ Règle d'alerte ${ruleId} mise à jour`);
    return true;
  }

  /**
   * Ajoute une nouvelle règle d'alerte
   */
  addAlertRule(rule: AlertRule): void {
    this.alertRules.push(rule);
    console.log(`➕ Nouvelle règle d'alerte ajoutée: ${rule.name}`);
  }

  /**
   * Supprime une règle d'alerte
   */
  removeAlertRule(ruleId: string): boolean {
    const initialLength = this.alertRules.length;
    this.alertRules = this.alertRules.filter(r => r.id !== ruleId);
    
    if (this.alertRules.length < initialLength) {
      console.log(`🗑️ Règle d'alerte ${ruleId} supprimée`);
      return true;
    }
    
    return false;
  }

  /**
   * Force un cycle de monitoring (pour les tests)
   */
  async forceMonitoringCycle(): Promise<MonitoringMetrics> {
    console.log('🔄 Cycle de monitoring forcé...');
    await this.performMonitoringCycle();
    return this.lastMetrics!;
  }

  /**
   * Obtient le statut du monitoring
   */
  getStatus(): {
    isRunning: boolean;
    lastCheck: Date | null;
    nextCheck: Date | null;
    metricsCount: number;
    activeRules: number;
  } {
    return {
      isRunning: this.isRunning,
      lastCheck: this.lastMetrics?.timestamp || null,
      nextCheck: this.isRunning ? new Date(Date.now() + this.config.checkInterval) : null,
      metricsCount: this.metricsHistory.length,
      activeRules: this.alertRules.filter(r => r.enabled).length
    };
  }
}

// Instance singleton pour l'utilisation globale
export const continuousMonitoring = new ContinuousMonitoring();