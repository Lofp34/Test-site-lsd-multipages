/**
 * Cache Integration Layer
 * 
 * Integrates the intelligent cache system with existing audit components:
 * - Link validation with cache
 * - Sitemap processing with cache
 * - Report generation with cache
 */

import { ValidationResult, ScannedLink, AuditReport } from './types';
import { cacheStrategy, createCacheKey, SitemapData } from './cache-strategy';
import { LinkValidator } from './link-validator';
import { getSupabaseAdmin } from './database';

export class CachedLinkValidator extends LinkValidator {
  /**
   * Validate link with cache integration
   */
  async validateLink(url: string, config?: any): Promise<ValidationResult> {
    // Try to get from cache first
    const cached = cacheStrategy.getLinkResult(url);
    if (cached) {
      return cached;
    }

    // Not in cache, validate normally
    const result = await super.validateLink(url, config);
    
    // Cache the result
    cacheStrategy.setLinkResult(url, result);
    
    return result;
  }

  /**
   * Validate batch with intelligent cache usage
   */
  async validateBatch(urls: string[], config?: any): Promise<ValidationResult[]> {
    // Check cache for existing results
    const { cached, missing } = cacheStrategy.getLinkResultsBatch(urls);
    
    if (missing.length === 0) {
      // All URLs are cached, return cached results in original order
      return urls.map(url => cacheStrategy.getLinkResult(url)!);
    }

    // Validate only missing URLs
    const freshResults = await super.validateBatch(missing, config);
    
    // Cache the fresh results
    cacheStrategy.setLinkResultsBatch(freshResults);
    
    // Combine cached and fresh results in original order
    const resultMap = new Map<string, ValidationResult>();
    
    // Add cached results
    cached.forEach(result => resultMap.set(result.url, result));
    
    // Add fresh results
    freshResults.forEach(result => resultMap.set(result.url, result));
    
    // Return in original order
    return urls.map(url => resultMap.get(url)!);
  }

  /**
   * Force refresh of cached link result
   */
  async refreshCachedLink(url: string, config?: any): Promise<ValidationResult> {
    return cacheStrategy.refreshLinkResult(url, (url) => super.validateLink(url, config));
  }

  /**
   * Preload cache with critical links
   */
  async preloadCriticalLinks(links: ScannedLink[]): Promise<void> {
    const criticalUrls = links
      .filter(link => link.priority === 'critical' || link.priority === 'high')
      .map(link => link.url);

    if (criticalUrls.length > 0) {
      await cacheStrategy.preloadCache(criticalUrls, (urls) => super.validateBatch(urls));
    }
  }
}

export class CachedSitemapProcessor {
  /**
   * Process sitemap with caching
   */
  async processSitemap(sitemapUrl: string, forceRefresh = false): Promise<SitemapData> {
    const cacheKey = createCacheKey.sitemapData(new URL(sitemapUrl).hostname);
    
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = cacheStrategy.getSitemapData(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Fetch and process sitemap
    const sitemapData = await this.fetchSitemapData(sitemapUrl);
    
    // Cache the result
    cacheStrategy.setSitemapData(cacheKey, sitemapData);
    
    return sitemapData;
  }

  /**
   * Get cached sitemap URLs for validation
   */
  async getCachedSitemapUrls(domain: string): Promise<string[]> {
    const cacheKey = createCacheKey.sitemapData(domain);
    const cached = cacheStrategy.getSitemapData(cacheKey);
    
    return cached?.urls || [];
  }

  /**
   * Fetch sitemap data from URL
   */
  private async fetchSitemapData(sitemapUrl: string): Promise<SitemapData> {
    try {
      const response = await fetch(sitemapUrl, {
        headers: {
          'User-Agent': 'Laurent Serre Link Audit Bot/1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch sitemap: ${response.status}`);
      }

      const xml = await response.text();
      const urls = this.parseSitemapXml(xml);

      return {
        urls,
        lastModified: new Date(),
        totalPages: urls.length,
        metadata: {
          source: sitemapUrl,
          contentType: response.headers.get('content-type'),
          lastFetched: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Error fetching sitemap:', error);
      throw error;
    }
  }

  /**
   * Parse sitemap XML to extract URLs
   */
  private parseSitemapXml(xml: string): string[] {
    const urls: string[] = [];
    
    // Handle sitemap index files
    const sitemapMatches = xml.match(/<sitemap>[\s\S]*?<\/sitemap>/g);
    if (sitemapMatches) {
      // This is a sitemap index, extract sitemap URLs
      sitemapMatches.forEach(sitemapBlock => {
        const locMatch = sitemapBlock.match(/<loc>(.*?)<\/loc>/);
        if (locMatch) {
          urls.push(locMatch[1]);
        }
      });
      return urls;
    }

    // Handle regular sitemap files
    const urlMatches = xml.match(/<url>[\s\S]*?<\/url>/g);
    if (urlMatches) {
      urlMatches.forEach(urlBlock => {
        const locMatch = urlBlock.match(/<loc>(.*?)<\/loc>/);
        if (locMatch) {
          urls.push(locMatch[1]);
        }
      });
    }

    return urls;
  }
}

export class CachedReportGenerator {
  /**
   * Generate report with caching
   */
  async generateReport(
    reportType: string,
    dateKey: string,
    generator: () => Promise<AuditReport>,
    forceRefresh = false
  ): Promise<AuditReport> {
    const cacheKey = createCacheKey.reportData(dateKey, reportType);
    
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = cacheStrategy.getReportData(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Generate fresh report
    const report = await generator();
    
    // Cache the report
    cacheStrategy.setReportData(cacheKey, report);
    
    return report;
  }

  /**
   * Get cached report if available
   */
  getCachedReport(reportType: string, dateKey: string): AuditReport | null {
    const cacheKey = createCacheKey.reportData(dateKey, reportType);
    return cacheStrategy.getReportData(cacheKey);
  }

  /**
   * Generate daily audit report with caching
   */
  async generateDailyReport(date: Date, forceRefresh = false): Promise<AuditReport> {
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
    
    return this.generateReport('daily', dateKey, async () => {
      // Generate fresh daily report
      return this.createDailyReport(date);
    }, forceRefresh);
  }

  /**
   * Generate weekly audit report with caching
   */
  async generateWeeklyReport(weekStart: Date, forceRefresh = false): Promise<AuditReport> {
    const dateKey = `${weekStart.toISOString().split('T')[0]}-weekly`;
    
    return this.generateReport('weekly', dateKey, async () => {
      // Generate fresh weekly report
      return this.createWeeklyReport(weekStart);
    }, forceRefresh);
  }

  /**
   * Create daily report (implementation)
   */
  private async createDailyReport(date: Date): Promise<AuditReport> {
    const supabase = getSupabaseAdmin();
    
    // Get validation results for the day
    const { data: validationResults } = await supabase
      .from('validation_results')
      .select('*')
      .gte('checked_at', date.toISOString().split('T')[0])
      .lt('checked_at', new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    const results = validationResults || [];
    
    // Calculate summary statistics
    const totalLinks = results.length;
    const validLinks = results.filter(r => r.status === 'valid').length;
    const brokenLinks = results.filter(r => r.status === 'broken').length;
    const redirectLinks = results.filter(r => r.status === 'redirect').length;

    // Create report
    const report: AuditReport = {
      timestamp: new Date(),
      summary: {
        totalLinks,
        validLinks,
        brokenLinks,
        correctedLinks: 0, // TODO: Get from corrections table
        pendingLinks: results.filter(r => r.status === 'timeout').length,
        seoHealthScore: Math.round((validLinks / Math.max(totalLinks, 1)) * 100),
      },
      brokenLinks: results
        .filter(r => r.status === 'broken')
        .map(r => ({
          url: r.url,
          sourceFiles: [], // TODO: Get from link sources
          linkType: 'unknown',
          priority: 'medium',
          error: r.error_message || 'Unknown error',
          suggestedActions: [],
          seoImpact: 1,
        })),
      corrections: [], // TODO: Get from corrections table
      recommendations: this.generateRecommendations(results),
      seoImpact: {
        criticalIssues: results.filter(r => r.status === 'broken').length,
        estimatedTrafficLoss: 0,
        affectedPages: [],
        priorityActions: [],
        linkHealthScore: Math.round((validLinks / Math.max(totalLinks, 1)) * 100),
      },
      resourceRequests: {
        totalRequests: 0,
        mostRequested: [],
      },
    };

    return report;
  }

  /**
   * Create weekly report (implementation)
   */
  private async createWeeklyReport(weekStart: Date): Promise<AuditReport> {
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    const supabase = getSupabaseAdmin();
    
    // Get validation results for the week
    const { data: validationResults } = await supabase
      .from('validation_results')
      .select('*')
      .gte('checked_at', weekStart.toISOString())
      .lt('checked_at', weekEnd.toISOString());

    const results = validationResults || [];
    
    // Similar to daily report but with weekly aggregation
    const totalLinks = results.length;
    const validLinks = results.filter(r => r.status === 'valid').length;
    const brokenLinks = results.filter(r => r.status === 'broken').length;

    const report: AuditReport = {
      timestamp: new Date(),
      summary: {
        totalLinks,
        validLinks,
        brokenLinks,
        correctedLinks: 0,
        pendingLinks: results.filter(r => r.status === 'timeout').length,
        seoHealthScore: Math.round((validLinks / Math.max(totalLinks, 1)) * 100),
      },
      brokenLinks: results
        .filter(r => r.status === 'broken')
        .map(r => ({
          url: r.url,
          sourceFiles: [],
          linkType: 'unknown',
          priority: 'medium',
          error: r.error_message || 'Unknown error',
          suggestedActions: [],
          seoImpact: 1,
        })),
      corrections: [],
      recommendations: this.generateWeeklyRecommendations(results),
      seoImpact: {
        criticalIssues: results.filter(r => r.status === 'broken').length,
        estimatedTrafficLoss: 0,
        affectedPages: [],
        priorityActions: [],
        linkHealthScore: Math.round((validLinks / Math.max(totalLinks, 1)) * 100),
      },
      resourceRequests: {
        totalRequests: 0,
        mostRequested: [],
      },
    };

    return report;
  }

  /**
   * Generate recommendations based on validation results
   */
  private generateRecommendations(results: any[]): string[] {
    const recommendations: string[] = [];
    
    const brokenCount = results.filter(r => r.status === 'broken').length;
    const timeoutCount = results.filter(r => r.status === 'timeout').length;
    const redirectCount = results.filter(r => r.status === 'redirect').length;

    if (brokenCount > 0) {
      recommendations.push(`Fix ${brokenCount} broken links to improve SEO health`);
    }

    if (timeoutCount > 5) {
      recommendations.push(`Investigate ${timeoutCount} timeout issues - may indicate server problems`);
    }

    if (redirectCount > 10) {
      recommendations.push(`Review ${redirectCount} redirects - consider updating to direct links`);
    }

    if (results.length === 0) {
      recommendations.push('No links validated today - ensure audit system is running properly');
    }

    return recommendations;
  }

  /**
   * Generate weekly recommendations
   */
  private generateWeeklyRecommendations(results: any[]): string[] {
    const recommendations = this.generateRecommendations(results);
    
    // Add weekly-specific recommendations
    const avgResponseTime = results.reduce((sum, r) => sum + (r.response_time || 0), 0) / results.length;
    
    if (avgResponseTime > 5000) {
      recommendations.push('Average response time is high - consider performance optimization');
    }

    return recommendations;
  }
}

// Cache management utilities
export class CacheManager {
  /**
   * Warm up all caches with essential data
   */
  async warmupCaches(): Promise<void> {
    console.log('Starting cache warmup...');
    
    try {
      // Warm up sitemap cache
      const sitemapProcessor = new CachedSitemapProcessor();
      await sitemapProcessor.processSitemap('https://laurent-serre-developpement.fr/sitemap.xml');
      
      // Warm up critical links cache
      const validator = new CachedLinkValidator();
      const criticalUrls = [
        'https://laurent-serre-developpement.fr',
        'https://laurent-serre-developpement.fr/contact',
        'https://laurent-serre-developpement.fr/services',
        'https://laurent-serre-developpement.fr/ressources',
      ];
      
      await validator.validateBatch(criticalUrls);
      
      console.log('Cache warmup completed successfully');
    } catch (error) {
      console.error('Cache warmup failed:', error);
    }
  }

  /**
   * Perform cache maintenance
   */
  async performMaintenance(): Promise<void> {
    console.log('Starting cache maintenance...');
    
    // Clear expired entries
    const clearedCount = cacheStrategy.clearExpired();
    console.log(`Cleared ${clearedCount} expired cache entries`);
    
    // Persist cache to database
    await cacheStrategy.persistToDatabase();
    console.log('Cache persisted to database');
    
    // Log cache statistics
    const stats = cacheStrategy.getStats();
    console.log('Cache statistics:', {
      totalEntries: stats.totalEntries,
      memoryUsage: `${stats.memoryUsage}MB`,
      hitRate: `${(stats.hitRate * 100).toFixed(2)}%`,
      totalHits: stats.totalHits,
      totalMisses: stats.totalMisses,
    });
  }

  /**
   * Invalidate cache for specific domain
   */
  async invalidateDomainCache(domain: string): Promise<void> {
    const pattern = new RegExp(`^https?://${domain.replace('.', '\\.')}`);
    const invalidated = cacheStrategy.invalidateByPattern(pattern);
    console.log(`Invalidated ${invalidated} cache entries for domain: ${domain}`);
  }

  /**
   * Get cache health status
   */
  getCacheHealth(): { status: 'healthy' | 'warning' | 'critical'; details: any } {
    const stats = cacheStrategy.getStats();
    
    let status: 'healthy' | 'warning' | 'critical' = 'healthy';
    const issues: string[] = [];
    
    // Check memory usage
    if (stats.memoryUsage > 80) {
      status = 'critical';
      issues.push('Memory usage is very high');
    } else if (stats.memoryUsage > 60) {
      status = 'warning';
      issues.push('Memory usage is elevated');
    }
    
    // Check hit rate
    if (stats.hitRate < 0.3) {
      status = status === 'critical' ? 'critical' : 'warning';
      issues.push('Cache hit rate is low');
    }
    
    return {
      status,
      details: {
        ...stats,
        issues,
      },
    };
  }
}

// Export instances
export const cachedLinkValidator = new CachedLinkValidator();
export const cachedSitemapProcessor = new CachedSitemapProcessor();
export const cachedReportGenerator = new CachedReportGenerator();
export const cacheManager = new CacheManager();