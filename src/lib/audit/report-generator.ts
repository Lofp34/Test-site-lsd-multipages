import { 
  AuditReport, 
  BrokenLinkDetail, 
  SEOImpactAnalysis, 
  ValidationResult, 
  ScannedLink, 
  CorrectionResult 
} from './types';
import { createClient } from '@supabase/supabase-js';
import { HTMLReportGenerator } from './html-report-generator';
import { CSVExportGenerator } from './csv-export-generator';
import fs from 'fs/promises';
import path from 'path';

export class ReportGenerator {
  private supabase;
  private htmlGenerator: HTMLReportGenerator;
  private csvGenerator: CSVExportGenerator;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    this.htmlGenerator = new HTMLReportGenerator();
    this.csvGenerator = new CSVExportGenerator();
  }

  /**
   * Génère un rapport d'audit complet
   */
  async generateReport(
    validationResults: ValidationResult[],
    scannedLinks: ScannedLink[],
    corrections: CorrectionResult[] = []
  ): Promise<AuditReport> {
    const timestamp = new Date();
    
    // Calculer les métriques de base
    const summary = this.calculateSummary(validationResults, corrections);
    
    // Analyser les liens morts
    const brokenLinks = await this.analyzeBrokenLinks(validationResults, scannedLinks);
    
    // Calculer l'impact SEO
    const seoImpact = await this.calculateSEOImpact(brokenLinks);
    
    // Générer les recommandations
    const recommendations = this.generateRecommendations(brokenLinks, seoImpact);
    
    // Récupérer les statistiques des demandes de ressources
    const resourceRequests = await this.getResourceRequestStats();

    const report: AuditReport = {
      timestamp,
      summary,
      brokenLinks,
      corrections,
      recommendations,
      seoImpact,
      resourceRequests
    };

    // Sauvegarder en base de données
    await this.saveReportToDatabase(report);

    return report;
  }

  /**
   * Calcule les métriques de résumé
   */
  private calculateSummary(validationResults: ValidationResult[], corrections: CorrectionResult[]) {
    const totalLinks = validationResults.length;
    const validLinks = validationResults.filter(r => r.status === 'valid').length;
    const brokenLinks = validationResults.filter(r => r.status === 'broken').length;
    const correctedLinks = corrections.filter(c => c.applied).length;
    const pendingLinks = validationResults.filter(r => 
      ['timeout', 'unknown'].includes(r.status)
    ).length;

    // Calcul du score de santé SEO (0-100)
    const seoHealthScore = totalLinks > 0 
      ? Math.round(((validLinks + correctedLinks) / totalLinks) * 100)
      : 100;

    return {
      totalLinks,
      validLinks,
      brokenLinks,
      correctedLinks,
      pendingLinks,
      seoHealthScore
    };
  }

  /**
   * Analyse les liens morts pour créer des détails enrichis
   */
  private async analyzeBrokenLinks(
    validationResults: ValidationResult[], 
    scannedLinks: ScannedLink[]
  ): Promise<BrokenLinkDetail[]> {
    const brokenResults = validationResults.filter(r => r.status === 'broken');
    const brokenDetails: BrokenLinkDetail[] = [];

    for (const result of brokenResults) {
      // Trouver tous les liens scannés correspondants
      const matchingLinks = scannedLinks.filter(link => link.url === result.url);
      
      if (matchingLinks.length === 0) continue;

      const sourceFiles = [...new Set(matchingLinks.map(link => link.sourceFile))];
      const linkType = matchingLinks[0].linkType;
      const priority = this.determinePriority(matchingLinks, sourceFiles);
      
      // Calculer l'impact SEO
      const seoImpact = this.calculateLinkSEOImpact(linkType, priority, sourceFiles.length);
      
      // Générer des actions suggérées
      const suggestedActions = this.generateSuggestedActions(result, linkType, priority);

      brokenDetails.push({
        url: result.url,
        sourceFiles,
        linkType,
        priority,
        error: result.error || `Status ${result.statusCode}`,
        suggestedActions,
        seoImpact,
        lastWorking: await this.getLastWorkingDate(result.url)
      });
    }

    // Trier par impact SEO décroissant
    return brokenDetails.sort((a, b) => b.seoImpact - a.seoImpact);
  }

  /**
   * Détermine la priorité d'un lien basée sur ses occurrences
   */
  private determinePriority(links: ScannedLink[], sourceFiles: string[]): string {
    const maxPriority = links.reduce((max, link) => {
      const priorities = ['low', 'medium', 'high', 'critical'];
      const currentIndex = priorities.indexOf(link.priority);
      const maxIndex = priorities.indexOf(max);
      return currentIndex > maxIndex ? link.priority : max;
    }, 'low');

    // Augmenter la priorité si le lien apparaît dans plusieurs fichiers
    if (sourceFiles.length > 5) {
      return 'critical';
    } else if (sourceFiles.length > 2 && maxPriority !== 'critical') {
      const priorities = ['low', 'medium', 'high', 'critical'];
      const currentIndex = priorities.indexOf(maxPriority);
      return priorities[Math.min(currentIndex + 1, 3)];
    }

    return maxPriority;
  }

  /**
   * Calcule l'impact SEO d'un lien mort
   */
  private calculateLinkSEOImpact(linkType: string, priority: string, occurrences: number): number {
    let baseImpact = 0;

    // Impact de base selon le type
    switch (linkType) {
      case 'internal':
        baseImpact = 8; // Impact élevé pour les liens internes
        break;
      case 'download':
        baseImpact = 6; // Impact moyen-élevé pour les téléchargements
        break;
      case 'external':
        baseImpact = 3; // Impact faible pour les liens externes
        break;
      case 'anchor':
        baseImpact = 4; // Impact moyen pour les ancres
        break;
    }

    // Multiplicateur selon la priorité
    const priorityMultiplier = {
      'low': 1,
      'medium': 1.5,
      'high': 2,
      'critical': 3
    }[priority] || 1;

    // Multiplicateur selon le nombre d'occurrences
    const occurrenceMultiplier = Math.min(1 + (occurrences - 1) * 0.2, 2);

    return Math.round(baseImpact * priorityMultiplier * occurrenceMultiplier);
  }

  /**
   * Génère des actions suggérées pour un lien mort
   */
  private generateSuggestedActions(
    result: ValidationResult, 
    linkType: string, 
    priority: string
  ): string[] {
    const actions: string[] = [];

    if (result.statusCode === 404) {
      actions.push("Vérifier si la page a été déplacée");
      actions.push("Rechercher une URL alternative");
      if (linkType === 'internal') {
        actions.push("Créer une redirection 301 si nécessaire");
      }
    }

    if (result.statusCode && result.statusCode >= 500) {
      actions.push("Problème serveur temporaire - revérifier plus tard");
    }

    if (linkType === 'download') {
      actions.push("Vérifier si le fichier existe dans le dossier public");
      actions.push("Créer une page temporaire 'Ressource en développement'");
    }

    if (priority === 'critical') {
      actions.push("PRIORITÉ CRITIQUE - Corriger immédiatement");
    }

    if (linkType === 'internal') {
      actions.push("Vérifier la structure des routes Next.js");
    }

    return actions;
  }

  /**
   * Calcule l'analyse d'impact SEO globale
   */
  private async calculateSEOImpact(brokenLinks: BrokenLinkDetail[]): Promise<SEOImpactAnalysis> {
    const criticalIssues = brokenLinks.filter(link => link.priority === 'critical').length;
    
    // Estimation de la perte de trafic basée sur l'impact SEO
    const totalSEOImpact = brokenLinks.reduce((sum, link) => sum + link.seoImpact, 0);
    const estimatedTrafficLoss = Math.min(totalSEOImpact * 0.5, 25); // Max 25% de perte estimée
    
    // Pages affectées
    const affectedPages = [...new Set(
      brokenLinks.flatMap(link => link.sourceFiles)
    )].slice(0, 10); // Top 10 des pages les plus affectées
    
    // Actions prioritaires
    const priorityActions = this.generatePriorityActions(brokenLinks, criticalIssues);
    
    // Score de santé des liens (0-100)
    const linkHealthScore = brokenLinks.length > 0 
      ? Math.max(0, 100 - (totalSEOImpact / brokenLinks.length * 2))
      : 100;

    return {
      criticalIssues,
      estimatedTrafficLoss,
      affectedPages,
      priorityActions,
      linkHealthScore: Math.round(linkHealthScore)
    };
  }

  /**
   * Génère les actions prioritaires
   */
  private generatePriorityActions(brokenLinks: BrokenLinkDetail[], criticalIssues: number): string[] {
    const actions: string[] = [];

    if (criticalIssues > 0) {
      actions.push(`Corriger immédiatement ${criticalIssues} liens critiques`);
    }

    const internalBroken = brokenLinks.filter(link => link.linkType === 'internal').length;
    if (internalBroken > 0) {
      actions.push(`Réparer ${internalBroken} liens internes cassés (impact SEO élevé)`);
    }

    const downloadBroken = brokenLinks.filter(link => link.linkType === 'download').length;
    if (downloadBroken > 0) {
      actions.push(`Créer ${downloadBroken} pages temporaires pour ressources manquantes`);
    }

    if (brokenLinks.length > 10) {
      actions.push("Mettre en place un monitoring automatique des liens");
    }

    const highImpactLinks = brokenLinks.filter(link => link.seoImpact > 15).length;
    if (highImpactLinks > 0) {
      actions.push(`Prioriser ${highImpactLinks} liens à fort impact SEO`);
    }

    return actions.slice(0, 5); // Max 5 actions prioritaires
  }

  /**
   * Génère les recommandations générales
   */
  private generateRecommendations(brokenLinks: BrokenLinkDetail[], seoImpact: SEOImpactAnalysis): string[] {
    const recommendations: string[] = [];

    if (seoImpact.linkHealthScore < 80) {
      recommendations.push("Score de santé des liens faible - audit complet recommandé");
    }

    if (seoImpact.criticalIssues > 0) {
      recommendations.push("Liens critiques détectés - intervention immédiate requise");
    }

    if (seoImpact.estimatedTrafficLoss > 5) {
      recommendations.push(`Perte de trafic estimée: ${seoImpact.estimatedTrafficLoss.toFixed(1)}% - optimisation urgente`);
    }

    const internalLinks = brokenLinks.filter(link => link.linkType === 'internal');
    if (internalLinks.length > 0) {
      recommendations.push("Mettre en place des redirections 301 pour les liens internes cassés");
    }

    const downloadLinks = brokenLinks.filter(link => link.linkType === 'download');
    if (downloadLinks.length > 0) {
      recommendations.push("Créer des pages temporaires pour les ressources en développement");
    }

    if (brokenLinks.length > 5) {
      recommendations.push("Planifier des audits réguliers automatisés");
    }

    return recommendations;
  }

  /**
   * Récupère les statistiques des demandes de ressources
   */
  private async getResourceRequestStats() {
    try {
      const { data: requests, error } = await this.supabase
        .from('resource_requests')
        .select('requested_url, request_count')
        .order('request_count', { ascending: false })
        .limit(10);

      if (error) throw error;

      const totalRequests = requests?.reduce((sum, req) => sum + req.request_count, 0) || 0;
      const mostRequested = requests?.map(req => ({
        url: req.requested_url,
        count: req.request_count
      })) || [];

      return {
        totalRequests,
        mostRequested
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes de ressources:', error);
      return {
        totalRequests: 0,
        mostRequested: []
      };
    }
  }

  /**
   * Récupère la dernière date où un lien fonctionnait
   */
  private async getLastWorkingDate(url: string): Promise<Date | undefined> {
    try {
      const { data, error } = await this.supabase
        .from('validation_results')
        .select('checked_at')
        .eq('url', url)
        .eq('status', 'valid')
        .order('checked_at', { ascending: false })
        .limit(1);

      if (error || !data || data.length === 0) return undefined;

      return new Date(data[0].checked_at);
    } catch (error) {
      console.error('Erreur lors de la récupération de la dernière date de fonctionnement:', error);
      return undefined;
    }
  }

  /**
   * Sauvegarde le rapport en base de données
   */
  private async saveReportToDatabase(report: AuditReport): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('audit_history')
        .insert({
          total_links: report.summary.totalLinks,
          broken_links: report.summary.brokenLinks,
          corrected_links: report.summary.correctedLinks,
          seo_score: report.summary.seoHealthScore,
          report_path: `reports/audit-${Date.now()}.json`,
          execution_time: 0 // À calculer lors de l'exécution
        });

      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du rapport:', error);
    }
  }

  /**
   * Exporte le rapport au format JSON
   */
  async exportToJSON(report: AuditReport, outputPath?: string): Promise<string> {
    const timestamp = report.timestamp.toISOString().replace(/[:.]/g, '-');
    const filename = outputPath || `reports/audit-report-${timestamp}.json`;
    
    // Créer le dossier reports s'il n'existe pas
    const dir = path.dirname(filename);
    await fs.mkdir(dir, { recursive: true });

    // Sérialiser le rapport avec une indentation lisible
    const jsonContent = JSON.stringify(report, null, 2);
    
    // Écrire le fichier
    await fs.writeFile(filename, jsonContent, 'utf-8');
    
    return filename;
  }

  /**
   * Exporte le rapport au format HTML interactif
   */
  async exportToHTML(report: AuditReport, outputPath?: string): Promise<string> {
    return this.htmlGenerator.generateHTMLReport(report, outputPath);
  }

  /**
   * Exporte le rapport au format CSV
   */
  async exportToCSV(report: AuditReport, outputPath?: string): Promise<string> {
    return this.csvGenerator.exportToCSV(report, outputPath);
  }

  /**
   * Génère tous les formats d'export en une fois
   */
  async generateAllFormats(report: AuditReport, outputDir?: string): Promise<{
    json: string;
    html: string;
    csv: {
      complete: string;
      brokenLinks: string;
      corrections: string;
      performanceStats: string;
      byPriority: Record<string, string>;
      byType: Record<string, string>;
      byPage: string;
    };
  }> {
    const timestamp = report.timestamp.toISOString().replace(/[:.]/g, '-');
    const baseDir = outputDir || `reports/audit-${timestamp}`;
    
    // Créer le dossier de base
    await fs.mkdir(baseDir, { recursive: true });

    // Générer tous les formats
    const [json, html, csv] = await Promise.all([
      this.exportToJSON(report, `${baseDir}/report.json`),
      this.exportToHTML(report, `${baseDir}/report.html`),
      this.csvGenerator.generateMultipleExports(report, `${baseDir}/csv`)
    ]);

    return { json, html, csv };
  }

  /**
   * Génère un rapport de tendances basé sur l'historique
   */
  async generateTrendReport(days: number = 30): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('audit_history')
        .select('*')
        .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        return {
          period: `${days} derniers jours`,
          trends: {
            linkHealth: 'Aucune donnée disponible',
            brokenLinksEvolution: [],
            seoScoreEvolution: []
          }
        };
      }

      // Calculer les tendances
      const trends = {
        linkHealth: this.calculateHealthTrend(data),
        brokenLinksEvolution: data.map(d => ({
          date: d.created_at,
          count: d.broken_links
        })),
        seoScoreEvolution: data.map(d => ({
          date: d.created_at,
          score: d.seo_score
        }))
      };

      return {
        period: `${days} derniers jours`,
        totalAudits: data.length,
        trends
      };
    } catch (error) {
      console.error('Erreur lors de la génération du rapport de tendances:', error);
      return {
        period: `${days} derniers jours`,
        error: 'Impossible de générer le rapport de tendances'
      };
    }
  }

  /**
   * Calcule la tendance de santé des liens
   */
  private calculateHealthTrend(data: any[]): string {
    if (data.length < 2) return 'Données insuffisantes';

    const first = data[0];
    const last = data[data.length - 1];
    
    const scoreDiff = last.seo_score - first.seo_score;
    const brokenDiff = last.broken_links - first.broken_links;

    if (scoreDiff > 5 && brokenDiff <= 0) {
      return 'Amélioration significative';
    } else if (scoreDiff < -5 || brokenDiff > 5) {
      return 'Dégradation préoccupante';
    } else {
      return 'Stable';
    }
  }
}