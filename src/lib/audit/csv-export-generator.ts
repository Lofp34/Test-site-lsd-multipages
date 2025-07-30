import { AuditReport, BrokenLinkDetail, CorrectionResult } from './types';
import fs from 'fs/promises';
import path from 'path';

export interface CSVExportOptions {
  includeHeaders?: boolean;
  delimiter?: string;
  encoding?: BufferEncoding;
  dateFormat?: 'iso' | 'fr' | 'us';
}

export class CSVExportGenerator {
  private defaultOptions: CSVExportOptions = {
    includeHeaders: true,
    delimiter: ',',
    encoding: 'utf-8',
    dateFormat: 'fr'
  };

  /**
   * Exporte le rapport complet au format CSV
   */
  async exportToCSV(
    report: AuditReport, 
    outputPath?: string, 
    options?: CSVExportOptions
  ): Promise<string> {
    const opts = { ...this.defaultOptions, ...options };
    const timestamp = report.timestamp.toISOString().replace(/[:.]/g, '-');
    const filename = outputPath || `reports/audit-complete-${timestamp}.csv`;
    
    // Créer le dossier reports s'il n'existe pas
    const dir = path.dirname(filename);
    await fs.mkdir(dir, { recursive: true });

    // Générer le contenu CSV complet
    const csvContent = this.generateCompleteCSV(report, opts);
    
    // Écrire le fichier
    await fs.writeFile(filename, csvContent, opts.encoding);
    
    return filename;
  }

  /**
   * Exporte uniquement les liens morts au format CSV
   */
  async exportBrokenLinksToCSV(
    brokenLinks: BrokenLinkDetail[], 
    outputPath?: string, 
    options?: CSVExportOptions
  ): Promise<string> {
    const opts = { ...this.defaultOptions, ...options };
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = outputPath || `reports/broken-links-${timestamp}.csv`;
    
    // Créer le dossier reports s'il n'existe pas
    const dir = path.dirname(filename);
    await fs.mkdir(dir, { recursive: true });

    // Générer le contenu CSV des liens morts
    const csvContent = this.generateBrokenLinksCSV(brokenLinks, opts);
    
    // Écrire le fichier
    await fs.writeFile(filename, csvContent, opts.encoding);
    
    return filename;
  }

  /**
   * Exporte les corrections au format CSV
   */
  async exportCorrectionsToCSV(
    corrections: CorrectionResult[], 
    outputPath?: string, 
    options?: CSVExportOptions
  ): Promise<string> {
    const opts = { ...this.defaultOptions, ...options };
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = outputPath || `reports/corrections-${timestamp}.csv`;
    
    // Créer le dossier reports s'il n'existe pas
    const dir = path.dirname(filename);
    await fs.mkdir(dir, { recursive: true });

    // Générer le contenu CSV des corrections
    const csvContent = this.generateCorrectionsCSV(corrections, opts);
    
    // Écrire le fichier
    await fs.writeFile(filename, csvContent, opts.encoding);
    
    return filename;
  }

  /**
   * Exporte les statistiques de performance au format CSV
   */
  async exportPerformanceStatsToCSV(
    report: AuditReport, 
    outputPath?: string, 
    options?: CSVExportOptions
  ): Promise<string> {
    const opts = { ...this.defaultOptions, ...options };
    const timestamp = report.timestamp.toISOString().replace(/[:.]/g, '-');
    const filename = outputPath || `reports/performance-stats-${timestamp}.csv`;
    
    // Créer le dossier reports s'il n'existe pas
    const dir = path.dirname(filename);
    await fs.mkdir(dir, { recursive: true });

    // Générer le contenu CSV des statistiques
    const csvContent = this.generatePerformanceStatsCSV(report, opts);
    
    // Écrire le fichier
    await fs.writeFile(filename, csvContent, opts.encoding);
    
    return filename;
  }

  /**
   * Exporte une vue par priorité au format CSV
   */
  async exportByPriorityToCSV(
    brokenLinks: BrokenLinkDetail[], 
    priority: string,
    outputPath?: string, 
    options?: CSVExportOptions
  ): Promise<string> {
    const filteredLinks = brokenLinks.filter(link => link.priority === priority);
    const opts = { ...this.defaultOptions, ...options };
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = outputPath || `reports/priority-${priority}-${timestamp}.csv`;
    
    return this.exportBrokenLinksToCSV(filteredLinks, filename, opts);
  }

  /**
   * Exporte une vue par type au format CSV
   */
  async exportByTypeToCSV(
    brokenLinks: BrokenLinkDetail[], 
    linkType: string,
    outputPath?: string, 
    options?: CSVExportOptions
  ): Promise<string> {
    const filteredLinks = brokenLinks.filter(link => link.linkType === linkType);
    const opts = { ...this.defaultOptions, ...options };
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = outputPath || `reports/type-${linkType}-${timestamp}.csv`;
    
    return this.exportBrokenLinksToCSV(filteredLinks, filename, opts);
  }

  /**
   * Exporte une vue par page source au format CSV
   */
  async exportByPageToCSV(
    brokenLinks: BrokenLinkDetail[], 
    outputPath?: string, 
    options?: CSVExportOptions
  ): Promise<string> {
    const opts = { ...this.defaultOptions, ...options };
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = outputPath || `reports/by-page-${timestamp}.csv`;
    
    // Créer le dossier reports s'il n'existe pas
    const dir = path.dirname(filename);
    await fs.mkdir(dir, { recursive: true });

    // Générer le contenu CSV par page
    const csvContent = this.generateByPageCSV(brokenLinks, opts);
    
    // Écrire le fichier
    await fs.writeFile(filename, csvContent, opts.encoding);
    
    return filename;
  }

  /**
   * Génère le CSV complet du rapport
   */
  private generateCompleteCSV(report: AuditReport, options: CSVExportOptions): string {
    const lines: string[] = [];
    const { delimiter } = options;

    // Section résumé
    if (options.includeHeaders) {
      lines.push('# RÉSUMÉ EXÉCUTIF');
      lines.push(`Date du rapport${delimiter}${this.formatDate(report.timestamp, options.dateFormat!)}`);
      lines.push(`Total des liens${delimiter}${report.summary.totalLinks}`);
      lines.push(`Liens valides${delimiter}${report.summary.validLinks}`);
      lines.push(`Liens morts${delimiter}${report.summary.brokenLinks}`);
      lines.push(`Liens corrigés${delimiter}${report.summary.correctedLinks}`);
      lines.push(`Liens en attente${delimiter}${report.summary.pendingLinks}`);
      lines.push(`Score de santé SEO${delimiter}${report.summary.seoHealthScore}%`);
      lines.push('');
    }

    // Section impact SEO
    if (options.includeHeaders) {
      lines.push('# IMPACT SEO');
      lines.push(`Problèmes critiques${delimiter}${report.seoImpact.criticalIssues}`);
      lines.push(`Perte de trafic estimée${delimiter}${report.seoImpact.estimatedTrafficLoss.toFixed(1)}%`);
      lines.push(`Score santé des liens${delimiter}${report.seoImpact.linkHealthScore}%`);
      lines.push(`Pages affectées${delimiter}${report.seoImpact.affectedPages.length}`);
      lines.push('');
    }

    // Section liens morts
    if (options.includeHeaders) {
      lines.push('# LIENS MORTS DÉTAILLÉS');
    }
    lines.push(this.generateBrokenLinksCSV(report.brokenLinks, { ...options, includeHeaders: false }));

    // Section corrections
    if (report.corrections.length > 0) {
      if (options.includeHeaders) {
        lines.push('');
        lines.push('# CORRECTIONS APPLIQUÉES');
      }
      lines.push(this.generateCorrectionsCSV(report.corrections, { ...options, includeHeaders: false }));
    }

    return lines.join('\n');
  }

  /**
   * Génère le CSV des liens morts
   */
  private generateBrokenLinksCSV(brokenLinks: BrokenLinkDetail[], options: CSVExportOptions): string {
    const lines: string[] = [];
    const { delimiter } = options;

    // En-têtes
    if (options.includeHeaders) {
      lines.push([
        'URL',
        'Priorité',
        'Type de lien',
        'Erreur',
        'Impact SEO',
        'Nombre de sources',
        'Fichiers sources',
        'Actions suggérées',
        'Dernière fois fonctionnel'
      ].join(delimiter));
    }

    // Données
    brokenLinks.forEach(link => {
      const row = [
        this.escapeCSVField(link.url),
        this.escapeCSVField(link.priority),
        this.escapeCSVField(link.linkType),
        this.escapeCSVField(link.error),
        link.seoImpact.toString(),
        link.sourceFiles.length.toString(),
        this.escapeCSVField(link.sourceFiles.join('; ')),
        this.escapeCSVField(link.suggestedActions.join('; ')),
        link.lastWorking ? this.formatDate(link.lastWorking, options.dateFormat!) : 'Inconnu'
      ];
      lines.push(row.join(delimiter));
    });

    return lines.join('\n');
  }

  /**
   * Génère le CSV des corrections
   */
  private generateCorrectionsCSV(corrections: CorrectionResult[], options: CSVExportOptions): string {
    const lines: string[] = [];
    const { delimiter } = options;

    // En-têtes
    if (options.includeHeaders) {
      lines.push([
        'URL Originale',
        'Nouvelle URL',
        'Fichier',
        'Statut',
        'Backup créé',
        'ID de rollback'
      ].join(delimiter));
    }

    // Données
    corrections.forEach(correction => {
      const row = [
        this.escapeCSVField(correction.originalUrl),
        this.escapeCSVField(correction.newUrl),
        this.escapeCSVField(correction.filePath),
        correction.applied ? 'Appliquée' : 'Échec',
        correction.backupCreated ? 'Oui' : 'Non',
        this.escapeCSVField(correction.rollbackId)
      ];
      lines.push(row.join(delimiter));
    });

    return lines.join('\n');
  }

  /**
   * Génère le CSV des statistiques de performance
   */
  private generatePerformanceStatsCSV(report: AuditReport, options: CSVExportOptions): string {
    const lines: string[] = [];
    const { delimiter } = options;

    // En-têtes
    if (options.includeHeaders) {
      lines.push([
        'Métrique',
        'Valeur',
        'Description'
      ].join(delimiter));
    }

    // Métriques de base
    const metrics = [
      ['Total des liens', report.summary.totalLinks.toString(), 'Nombre total de liens scannés'],
      ['Liens valides', report.summary.validLinks.toString(), 'Liens fonctionnels'],
      ['Liens morts', report.summary.brokenLinks.toString(), 'Liens retournant une erreur'],
      ['Liens corrigés', report.summary.correctedLinks.toString(), 'Liens corrigés automatiquement'],
      ['Score de santé SEO', `${report.summary.seoHealthScore}%`, 'Pourcentage de liens fonctionnels'],
      ['Problèmes critiques', report.seoImpact.criticalIssues.toString(), 'Liens à priorité critique'],
      ['Perte de trafic estimée', `${report.seoImpact.estimatedTrafficLoss.toFixed(1)}%`, 'Impact estimé sur le trafic'],
      ['Score santé des liens', `${report.seoImpact.linkHealthScore}%`, 'Score global de santé des liens'],
      ['Pages affectées', report.seoImpact.affectedPages.length.toString(), 'Nombre de pages contenant des liens morts'],
      ['Demandes de ressources', report.resourceRequests.totalRequests.toString(), 'Total des demandes utilisateurs']
    ];

    metrics.forEach(([metric, value, description]) => {
      lines.push([
        this.escapeCSVField(metric),
        this.escapeCSVField(value),
        this.escapeCSVField(description)
      ].join(delimiter));
    });

    // Répartition par type
    const typeStats = this.calculateTypeStats(report.brokenLinks);
    lines.push('');
    if (options.includeHeaders) {
      lines.push('# RÉPARTITION PAR TYPE');
      lines.push(['Type de lien', 'Nombre', 'Pourcentage'].join(delimiter));
    }

    Object.entries(typeStats).forEach(([type, count]) => {
      const percentage = report.brokenLinks.length > 0 
        ? ((count / report.brokenLinks.length) * 100).toFixed(1)
        : '0';
      lines.push([
        this.escapeCSVField(type),
        count.toString(),
        `${percentage}%`
      ].join(delimiter));
    });

    // Répartition par priorité
    const priorityStats = this.calculatePriorityStats(report.brokenLinks);
    lines.push('');
    if (options.includeHeaders) {
      lines.push('# RÉPARTITION PAR PRIORITÉ');
      lines.push(['Priorité', 'Nombre', 'Pourcentage'].join(delimiter));
    }

    Object.entries(priorityStats).forEach(([priority, count]) => {
      const percentage = report.brokenLinks.length > 0 
        ? ((count / report.brokenLinks.length) * 100).toFixed(1)
        : '0';
      lines.push([
        this.escapeCSVField(priority),
        count.toString(),
        `${percentage}%`
      ].join(delimiter));
    });

    return lines.join('\n');
  }

  /**
   * Génère le CSV par page source
   */
  private generateByPageCSV(brokenLinks: BrokenLinkDetail[], options: CSVExportOptions): string {
    const lines: string[] = [];
    const { delimiter } = options;

    // Grouper par page source
    const pageStats = new Map<string, {
      brokenCount: number;
      links: BrokenLinkDetail[];
      totalImpact: number;
    }>();

    brokenLinks.forEach(link => {
      link.sourceFiles.forEach(sourceFile => {
        if (!pageStats.has(sourceFile)) {
          pageStats.set(sourceFile, {
            brokenCount: 0,
            links: [],
            totalImpact: 0
          });
        }
        const stats = pageStats.get(sourceFile)!;
        stats.brokenCount++;
        stats.links.push(link);
        stats.totalImpact += link.seoImpact;
      });
    });

    // En-têtes
    if (options.includeHeaders) {
      lines.push([
        'Page source',
        'Nombre de liens morts',
        'Impact SEO total',
        'Impact SEO moyen',
        'Priorité maximale',
        'URLs concernées'
      ].join(delimiter));
    }

    // Trier par impact SEO décroissant
    const sortedPages = Array.from(pageStats.entries())
      .sort(([, a], [, b]) => b.totalImpact - a.totalImpact);

    sortedPages.forEach(([page, stats]) => {
      const avgImpact = (stats.totalImpact / stats.brokenCount).toFixed(1);
      const maxPriority = this.getMaxPriority(stats.links);
      const urls = [...new Set(stats.links.map(link => link.url))].join('; ');

      const row = [
        this.escapeCSVField(page),
        stats.brokenCount.toString(),
        stats.totalImpact.toString(),
        avgImpact,
        this.escapeCSVField(maxPriority),
        this.escapeCSVField(urls)
      ];
      lines.push(row.join(delimiter));
    });

    return lines.join('\n');
  }

  /**
   * Calcule les statistiques par type
   */
  private calculateTypeStats(brokenLinks: BrokenLinkDetail[]): Record<string, number> {
    const stats: Record<string, number> = {};
    brokenLinks.forEach(link => {
      stats[link.linkType] = (stats[link.linkType] || 0) + 1;
    });
    return stats;
  }

  /**
   * Calcule les statistiques par priorité
   */
  private calculatePriorityStats(brokenLinks: BrokenLinkDetail[]): Record<string, number> {
    const stats: Record<string, number> = {};
    brokenLinks.forEach(link => {
      stats[link.priority] = (stats[link.priority] || 0) + 1;
    });
    return stats;
  }

  /**
   * Détermine la priorité maximale d'une liste de liens
   */
  private getMaxPriority(links: BrokenLinkDetail[]): string {
    const priorities = ['low', 'medium', 'high', 'critical'];
    let maxIndex = 0;
    
    links.forEach(link => {
      const index = priorities.indexOf(link.priority);
      if (index > maxIndex) {
        maxIndex = index;
      }
    });
    
    return priorities[maxIndex];
  }

  /**
   * Échappe un champ CSV
   */
  private escapeCSVField(field: string): string {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  }

  /**
   * Formate une date selon le format spécifié
   */
  private formatDate(date: Date, format: string): string {
    switch (format) {
      case 'iso':
        return date.toISOString();
      case 'us':
        return date.toLocaleDateString('en-US');
      case 'fr':
      default:
        return date.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
    }
  }

  /**
   * Génère plusieurs exports CSV en une fois
   */
  async generateMultipleExports(
    report: AuditReport,
    outputDir?: string
  ): Promise<{
    complete: string;
    brokenLinks: string;
    corrections: string;
    performanceStats: string;
    byPriority: Record<string, string>;
    byType: Record<string, string>;
    byPage: string;
  }> {
    const timestamp = report.timestamp.toISOString().replace(/[:.]/g, '-');
    const baseDir = outputDir || `reports/export-${timestamp}`;
    
    // Créer le dossier de base
    await fs.mkdir(baseDir, { recursive: true });

    // Export complet
    const complete = await this.exportToCSV(report, `${baseDir}/complete.csv`);
    
    // Export liens morts
    const brokenLinks = await this.exportBrokenLinksToCSV(
      report.brokenLinks, 
      `${baseDir}/broken-links.csv`
    );
    
    // Export corrections
    const corrections = await this.exportCorrectionsToCSV(
      report.corrections, 
      `${baseDir}/corrections.csv`
    );
    
    // Export statistiques
    const performanceStats = await this.exportPerformanceStatsToCSV(
      report, 
      `${baseDir}/performance-stats.csv`
    );
    
    // Export par priorité
    const priorities = [...new Set(report.brokenLinks.map(link => link.priority))];
    const byPriority: Record<string, string> = {};
    for (const priority of priorities) {
      byPriority[priority] = await this.exportByPriorityToCSV(
        report.brokenLinks, 
        priority, 
        `${baseDir}/priority-${priority}.csv`
      );
    }
    
    // Export par type
    const types = [...new Set(report.brokenLinks.map(link => link.linkType))];
    const byType: Record<string, string> = {};
    for (const type of types) {
      byType[type] = await this.exportByTypeToCSV(
        report.brokenLinks, 
        type, 
        `${baseDir}/type-${type}.csv`
      );
    }
    
    // Export par page
    const byPage = await this.exportByPageToCSV(
      report.brokenLinks, 
      `${baseDir}/by-page.csv`
    );

    return {
      complete,
      brokenLinks,
      corrections,
      performanceStats,
      byPriority,
      byType,
      byPage
    };
  }
}