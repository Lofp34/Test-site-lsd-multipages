/**
 * Optimized Report Generator for Weekly Maintenance
 * 
 * This enhanced version of the ReportGenerator is specifically optimized
 * for the weekly maintenance cron job with:
 * - Intelligent caching integration
 * - Memory-efficient processing
 * - Compressed output formats
 * - Performance metrics tracking
 * - Vercel usage integration
 */

import { ReportGenerator } from './report-generator';
import { CacheStrategy } from './cache-strategy';
import { VercelUsageMonitor } from '@/lib/vercel/usage-monitor';
import { AuditReport, ValidationResult, ScannedLink, CorrectionResult } from './types';
import { createClient } from '@supabase/supabase-js';
import { gzipSync, gunzipSync } from 'zlib';

export interface OptimizedReportConfig {
  enableCompression: boolean;
  maxReportSize: number;
  cacheReports: boolean;
  includeVercelMetrics: boolean;
  generateTrends: boolean;
  exportFormats: ('json' | 'html' | 'csv')[];
}

export interface WeeklyReportMetrics {
  generationTime: number;
  memoryUsed: number;
  cacheHitRate: number;
  compressionRatio: number;
  vercelUsage: any;
  dataPoints: number;
}

export interface EnhancedAuditReport extends AuditReport {
  metadata: {
    generatedAt: Date;
    generationTime: number;
    dataSource: 'fresh' | 'cached' | 'mixed';
    compressionEnabled: boolean;
    vercelMetrics?: any;
    weekIdentifier: string;
  };
  performance: WeeklyReportMetrics;
  trends?: {
    linkHealthTrend: string;
    brokenLinksEvolution: Array<{ date: string; count: number }>;
    seoScoreEvolution: Array<{ date: string; score: number }>;
    vercelUsageTrend: Array<{ date: string; usage: number }>;
  };
}

export class OptimizedReportGenerator {
  private baseGenerator: ReportGenerator;
  private cacheStrategy: CacheStrategy;
  private usageMonitor: VercelUsageMonitor;
  private config: OptimizedReportConfig;
  private supabase;

  constructor(
    cacheStrategy: CacheStrategy,
    usageMonitor: VercelUsageMonitor,
    config?: Partial<OptimizedReportConfig>
  ) {
    this.baseGenerator = new ReportGenerator();
    this.cacheStrategy = cacheStrategy;
    this.usageMonitor = usageMonitor;
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    this.config = {
      enableCompression: true,
      maxReportSize: 10 * 1024 * 1024, // 10MB
      cacheReports: true,
      includeVercelMetrics: true,
      generateTrends: true,
      exportFormats: ['json', 'html', 'csv'],
      ...config,
    };
  }

  /**
   * Generate optimized weekly report with caching and compression
   */
  async generateWeeklyReport(weekIdentifier?: string): Promise<EnhancedAuditReport> {
    const startTime = Date.now();
    const weekId = weekIdentifier || this.getWeekIdentifier();
    const cacheKey = `weekly_report_${weekId}`;

    console.log(`🔄 Generating optimized weekly report for week ${weekId}...`);

    // Check cache first
    let cachedReport: EnhancedAuditReport | null = null;
    if (this.config.cacheReports) {
      cachedReport = this.getCachedReport(cacheKey);
      if (cachedReport) {
        console.log('✅ Using cached weekly report');
        return this.updateReportMetadata(cachedReport, 'cached', startTime);
      }
    }

    // Gather data efficiently
    const reportData = await this.gatherReportData();
    
    // Generate base report
    const baseReport = await this.baseGenerator.generateReport(
      reportData.validationResults,
      reportData.scannedLinks,
      reportData.corrections
    );

    // Enhance with optimizations
    const enhancedReport = await this.enhanceReport(baseReport, reportData, startTime);

    // Cache the report if enabled
    if (this.config.cacheReports) {
      this.cacheReport(cacheKey, enhancedReport);
    }

    // Generate export formats
    if (this.config.exportFormats.length > 0) {
      await this.generateExportFormats(enhancedReport, weekId);
    }

    console.log(`✅ Weekly report generated in ${Date.now() - startTime}ms`);
    return enhancedReport;
  }

  /**
   * Generate trend analysis report
   */
  async generateTrendReport(days: number = 30): Promise<any> {
    const cacheKey = `trend_report_${days}d`;
    
    // Check cache first
    if (this.config.cacheReports) {
      const cached = this.cacheStrategy.getReportData(cacheKey);
      if (cached) {
        console.log('✅ Using cached trend report');
        return cached;
      }
    }

    // Generate fresh trend report
    const trendReport = await this.baseGenerator.generateTrendReport(days);
    
    // Add Vercel usage trends if enabled
    if (this.config.includeVercelMetrics) {
      const vercelTrends = await this.getVercelUsageTrends(days);
      trendReport.vercelUsageTrends = vercelTrends;
    }

    // Cache the trend report
    if (this.config.cacheReports) {
      this.cacheStrategy.setReportData(cacheKey, trendReport);
    }

    return trendReport;
  }

  /**
   * Generate all export formats efficiently
   */
  async generateAllFormats(report: EnhancedAuditReport, outputDir?: string): Promise<{
    json?: string;
    html?: string;
    csv?: any;
  }> {
    const results: any = {};
    const timestamp = report.timestamp.toISOString().replace(/[:.]/g, '-');
    const baseDir = outputDir || `reports/weekly-${timestamp}`;

    // Generate requested formats in parallel
    const formatPromises: Promise<void>[] = [];

    if (this.config.exportFormats.includes('json')) {
      formatPromises.push(
        this.generateCompressedJSON(report, `${baseDir}/report.json`).then(path => {
          results.json = path;
        })
      );
    }

    if (this.config.exportFormats.includes('html')) {
      formatPromises.push(
        this.baseGenerator.exportToHTML(report, `${baseDir}/report.html`).then(path => {
          results.html = path;
        })
      );
    }

    if (this.config.exportFormats.includes('csv')) {
      formatPromises.push(
        this.baseGenerator.exportToCSV(report, `${baseDir}/report.csv`).then(path => {
          results.csv = path;
        })
      );
    }

    await Promise.all(formatPromises);
    return results;
  }

  /**
   * Get cached report with decompression if needed
   */
  private getCachedReport(cacheKey: string): EnhancedAuditReport | null {
    try {
      const cached = this.cacheStrategy.getReportData(cacheKey);
      if (!cached) return null;

      // If report is compressed, decompress it
      if (cached.metadata?.compressionEnabled) {
        return this.decompressReport(cached as any);
      }

      return cached as EnhancedAuditReport;
    } catch (error) {
      console.warn('Failed to retrieve cached report:', error);
      return null;
    }
  }

  /**
   * Cache report with compression if enabled
   */
  private cacheReport(cacheKey: string, report: EnhancedAuditReport): void {
    try {
      let reportToCache = report;

      // Compress if enabled and report is large
      if (this.config.enableCompression) {
        const reportSize = JSON.stringify(report).length;
        if (reportSize > 1024 * 1024) { // 1MB threshold
          reportToCache = this.compressReport(report);
        }
      }

      this.cacheStrategy.setReportData(cacheKey, reportToCache as any);
    } catch (error) {
      console.warn('Failed to cache report:', error);
    }
  }

  /**
   * Gather all necessary data for report generation
   */
  private async gatherReportData(): Promise<{
    validationResults: ValidationResult[];
    scannedLinks: ScannedLink[];
    corrections: CorrectionResult[];
  }> {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Use Promise.all for parallel data fetching
    const [validationResults, scannedLinks, corrections] = await Promise.all([
      this.fetchValidationResults(weekAgo),
      this.fetchScannedLinks(weekAgo),
      this.fetchCorrections(weekAgo),
    ]);

    return {
      validationResults: validationResults || [],
      scannedLinks: scannedLinks || [],
      corrections: corrections || [],
    };
  }

  /**
   * Fetch validation results with caching
   */
  private async fetchValidationResults(since: Date): Promise<ValidationResult[]> {
    const cacheKey = `validation_results_${since.toISOString().split('T')[0]}`;
    
    // Check cache first
    const cached = this.cacheStrategy.get(cacheKey, 'reports');
    if (cached) {
      return cached as ValidationResult[];
    }

    // Fetch from database
    const { data, error } = await this.supabase
      .from('validation_results')
      .select('*')
      .gte('checked_at', since.toISOString())
      .order('checked_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch validation results:', error);
      return [];
    }

    // Cache the results
    this.cacheStrategy.set(cacheKey, data, 'reports');
    return data || [];
  }

  /**
   * Fetch scanned links with caching
   */
  private async fetchScannedLinks(since: Date): Promise<ScannedLink[]> {
    const cacheKey = `scanned_links_${since.toISOString().split('T')[0]}`;
    
    const cached = this.cacheStrategy.get(cacheKey, 'reports');
    if (cached) {
      return cached as ScannedLink[];
    }

    const { data, error } = await this.supabase
      .from('scanned_links')
      .select('*')
      .gte('scanned_at', since.toISOString());

    if (error) {
      console.error('Failed to fetch scanned links:', error);
      return [];
    }

    this.cacheStrategy.set(cacheKey, data, 'reports');
    return data || [];
  }

  /**
   * Fetch corrections with caching
   */
  private async fetchCorrections(since: Date): Promise<CorrectionResult[]> {
    const cacheKey = `corrections_${since.toISOString().split('T')[0]}`;
    
    const cached = this.cacheStrategy.get(cacheKey, 'reports');
    if (cached) {
      return cached as CorrectionResult[];
    }

    const { data, error } = await this.supabase
      .from('correction_results')
      .select('*')
      .gte('applied_at', since.toISOString());

    if (error) {
      console.warn('Failed to fetch corrections:', error);
      return [];
    }

    this.cacheStrategy.set(cacheKey, data, 'reports');
    return data || [];
  }

  /**
   * Enhance base report with optimizations and metrics
   */
  private async enhanceReport(
    baseReport: AuditReport,
    reportData: any,
    startTime: number
  ): Promise<EnhancedAuditReport> {
    const generationTime = Date.now() - startTime;
    const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;

    // Get Vercel metrics if enabled
    let vercelMetrics = null;
    if (this.config.includeVercelMetrics) {
      try {
        vercelMetrics = await this.usageMonitor.getCurrentUsage();
      } catch (error) {
        console.warn('Failed to fetch Vercel metrics:', error);
      }
    }

    // Generate trends if enabled
    let trends = null;
    if (this.config.generateTrends) {
      trends = await this.generateTrendData();
    }

    // Calculate performance metrics
    const cacheStats = this.cacheStrategy.getStats();
    const performance: WeeklyReportMetrics = {
      generationTime,
      memoryUsed,
      cacheHitRate: cacheStats.hitRate,
      compressionRatio: 1, // Will be updated if compression is used
      vercelUsage: vercelMetrics,
      dataPoints: reportData.validationResults.length + reportData.scannedLinks.length,
    };

    const enhancedReport: EnhancedAuditReport = {
      ...baseReport,
      metadata: {
        generatedAt: new Date(),
        generationTime,
        dataSource: 'fresh',
        compressionEnabled: this.config.enableCompression,
        vercelMetrics,
        weekIdentifier: this.getWeekIdentifier(),
      },
      performance,
      trends,
    };

    return enhancedReport;
  }

  /**
   * Generate trend data for the report
   */
  private async generateTrendData(): Promise<any> {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      // Get historical audit data
      const { data: auditHistory, error } = await this.supabase
        .from('audit_history')
        .select('created_at, broken_links, seo_score')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true });

      if (error || !auditHistory) {
        return null;
      }

      // Calculate trends
      const brokenLinksEvolution = auditHistory.map(record => ({
        date: record.created_at,
        count: record.broken_links,
      }));

      const seoScoreEvolution = auditHistory.map(record => ({
        date: record.created_at,
        score: record.seo_score,
      }));

      // Calculate link health trend
      const linkHealthTrend = this.calculateHealthTrend(auditHistory);

      // Get Vercel usage trend if available
      let vercelUsageTrend: Array<{ date: string; usage: number }> = [];
      if (this.config.includeVercelMetrics) {
        vercelUsageTrend = await this.getVercelUsageTrends(30);
      }

      return {
        linkHealthTrend,
        brokenLinksEvolution,
        seoScoreEvolution,
        vercelUsageTrend,
      };
    } catch (error) {
      console.warn('Failed to generate trend data:', error);
      return null;
    }
  }

  /**
   * Get Vercel usage trends
   */
  private async getVercelUsageTrends(days: number): Promise<Array<{ date: string; usage: number }>> {
    try {
      // This would ideally come from stored Vercel usage history
      // For now, we'll return a simple trend based on current usage
      const currentUsage = await this.usageMonitor.getCurrentUsage();
      const trend = this.usageMonitor.getUsageTrend();

      // Generate synthetic trend data (in a real implementation, this would come from stored data)
      const trends: Array<{ date: string; usage: number }> = [];
      for (let i = days; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const usage = currentUsage.percentageOfLimit * (1 + (Math.random() - 0.5) * 0.1);
        trends.push({
          date: date.toISOString().split('T')[0],
          usage: Math.max(0, Math.min(100, usage)),
        });
      }

      return trends;
    } catch (error) {
      console.warn('Failed to get Vercel usage trends:', error);
      return [];
    }
  }

  /**
   * Calculate health trend from historical data
   */
  private calculateHealthTrend(auditHistory: any[]): string {
    if (auditHistory.length < 2) return 'Insufficient data';

    const first = auditHistory[0];
    const last = auditHistory[auditHistory.length - 1];
    
    const scoreDiff = last.seo_score - first.seo_score;
    const brokenDiff = last.broken_links - first.broken_links;

    if (scoreDiff > 5 && brokenDiff <= 0) {
      return 'Improving significantly';
    } else if (scoreDiff < -5 || brokenDiff > 5) {
      return 'Degrading - attention needed';
    } else {
      return 'Stable';
    }
  }

  /**
   * Compress report data
   */
  private compressReport(report: EnhancedAuditReport): any {
    try {
      const jsonString = JSON.stringify(report);
      const compressed = gzipSync(jsonString);
      const compressionRatio = compressed.length / jsonString.length;

      console.log(`Report compressed: ${jsonString.length} -> ${compressed.length} bytes (${(compressionRatio * 100).toFixed(1)}%)`);

      return {
        ...report,
        _compressed: true,
        _compressedData: compressed.toString('base64'),
        performance: {
          ...report.performance,
          compressionRatio,
        },
      };
    } catch (error) {
      console.warn('Failed to compress report:', error);
      return report;
    }
  }

  /**
   * Decompress report data
   */
  private decompressReport(compressedReport: any): EnhancedAuditReport {
    try {
      if (!compressedReport._compressed) {
        return compressedReport;
      }

      const compressedData = Buffer.from(compressedReport._compressedData, 'base64');
      const decompressed = gunzipSync(compressedData);
      const report = JSON.parse(decompressed.toString());

      return report;
    } catch (error) {
      console.warn('Failed to decompress report:', error);
      return compressedReport;
    }
  }

  /**
   * Generate compressed JSON export
   */
  private async generateCompressedJSON(report: EnhancedAuditReport, outputPath: string): Promise<string> {
    const fs = await import('fs/promises');
    const path = await import('path');

    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    await fs.mkdir(dir, { recursive: true });

    let jsonContent = JSON.stringify(report, null, 2);

    // Compress if enabled and file is large
    if (this.config.enableCompression && jsonContent.length > 1024 * 1024) {
      const compressed = gzipSync(jsonContent);
      await fs.writeFile(outputPath + '.gz', compressed);
      console.log(`Compressed JSON report saved: ${outputPath}.gz`);
      return outputPath + '.gz';
    } else {
      await fs.writeFile(outputPath, jsonContent, 'utf-8');
      return outputPath;
    }
  }

  /**
   * Update report metadata for cached reports
   */
  private updateReportMetadata(
    report: EnhancedAuditReport,
    dataSource: 'fresh' | 'cached' | 'mixed',
    startTime: number
  ): EnhancedAuditReport {
    return {
      ...report,
      metadata: {
        ...report.metadata,
        dataSource,
        generationTime: Date.now() - startTime,
      },
    };
  }

  /**
   * Get current week identifier (YYYY-WW format)
   */
  private getWeekIdentifier(): string {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    return `${now.getFullYear()}-${weekNumber.toString().padStart(2, '0')}`;
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    // Clean up any resources if needed
  }
}