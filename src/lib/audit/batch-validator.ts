import { ValidationResult, ValidationConfig, ScannedLink } from './types';
import { LinkValidator } from './link-validator';
import { LocalFileValidator } from './local-file-validator';
import { validationConfig } from './config';
import { getSupabaseAdmin } from './database';

/**
 * Batch Validation System
 * Orchestrates validation of multiple links with rate limiting, caching, and performance optimization
 */
export class BatchValidator {
  private httpValidator: LinkValidator;
  private localValidator: LocalFileValidator;
  private config: ValidationConfig;
  private validationCache: Map<string, ValidationResult> = new Map();
  private rateLimitQueue: Array<{ task: () => Promise<ValidationResult>; resolve: (result: ValidationResult) => void; reject: (error: Error) => void }> = [];
  private isProcessingQueue = false;
  private stats = {
    totalProcessed: 0,
    cacheHits: 0,
    validLinks: 0,
    brokenLinks: 0,
    timeouts: 0,
    errors: 0,
  };

  constructor(config?: Partial<ValidationConfig>) {
    this.config = { ...validationConfig(), ...config };
    this.httpValidator = new LinkValidator(this.config);
    this.localValidator = new LocalFileValidator();
  }

  /**
   * Validate a batch of links with intelligent routing and optimization
   */
  async validateBatch(links: ScannedLink[]): Promise<ValidationResult[]> {
    console.log(`Starting batch validation of ${links.length} links`);
    
    // Reset stats
    this.resetStats();
    
    // Load existing results from cache/database
    await this.loadCachedResults(links);
    
    // Separate links by type for optimized processing
    const { externalLinks, localLinks, cachedResults } = this.categorizeLinks(links);
    
    console.log(`Found ${cachedResults.length} cached results, ${externalLinks.length} external links, ${localLinks.length} local links`);
    
    const results: ValidationResult[] = [...cachedResults];
    
    // Process local links first (faster, no rate limiting needed)
    if (localLinks.length > 0) {
      console.log('Processing local links...');
      const localResults = await this.processLocalLinks(localLinks);
      results.push(...localResults);
    }
    
    // Process external links with rate limiting and batching
    if (externalLinks.length > 0) {
      console.log('Processing external links...');
      const externalResults = await this.processExternalLinks(externalLinks);
      results.push(...externalResults);
    }
    
    // Update cache and database
    await this.updateCache(results);
    await this.saveMetrics();
    
    console.log('Batch validation completed:', this.getStats());
    
    return results;
  }

  /**
   * Categorize links for optimized processing
   */
  private categorizeLinks(links: ScannedLink[]): {
    externalLinks: ScannedLink[];
    localLinks: ScannedLink[];
    cachedResults: ValidationResult[];
  } {
    const externalLinks: ScannedLink[] = [];
    const localLinks: ScannedLink[] = [];
    const cachedResults: ValidationResult[] = [];

    for (const link of links) {
      // Check cache first
      const cached = this.validationCache.get(link.url);
      if (cached && this.isCacheValid(cached)) {
        cachedResults.push(cached);
        this.stats.cacheHits++;
        continue;
      }

      // Categorize by link type
      if (link.linkType === 'external') {
        externalLinks.push(link);
      } else {
        localLinks.push(link);
      }
    }

    return { externalLinks, localLinks, cachedResults };
  }

  /**
   * Process local links (internal routes, downloads, anchors)
   */
  private async processLocalLinks(links: ScannedLink[]): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    // Local links can be processed in parallel as they're fast
    const batchSize = Math.min(links.length, 20); // Process up to 20 at once
    
    for (let i = 0; i < links.length; i += batchSize) {
      const batch = links.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (link) => {
        try {
          const result = await this.localValidator.validateLocalLink(link);
          this.updateStats(result);
          return result;
        } catch (error) {
          const errorResult: ValidationResult = {
            url: link.url,
            status: 'broken',
            error: error instanceof Error ? error.message : String(error),
            responseTime: 0,
            lastChecked: new Date(),
          };
          this.updateStats(errorResult);
          return errorResult;
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      console.log(`Processed ${Math.min(i + batchSize, links.length)}/${links.length} local links`);
    }

    return results;
  }

  /**
   * Process external links with rate limiting and retry logic
   */
  private async processExternalLinks(links: ScannedLink[]): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    // Process external links with rate limiting
    const promises = links.map(link => 
      this.addToRateLimitQueue(async () => {
        try {
          const result = await this.httpValidator.validateLink(link.url);
          this.updateStats(result);
          return result;
        } catch (error) {
          const errorResult: ValidationResult = {
            url: link.url,
            status: 'broken',
            error: error instanceof Error ? error.message : String(error),
            responseTime: 0,
            lastChecked: new Date(),
          };
          this.updateStats(errorResult);
          return errorResult;
        }
      })
    );

    const batchResults = await Promise.all(promises);
    results.push(...batchResults);

    return results;
  }

  /**
   * Add task to rate limit queue
   */
  private async addToRateLimitQueue(task: () => Promise<ValidationResult>): Promise<ValidationResult> {
    return new Promise((resolve, reject) => {
      this.rateLimitQueue.push({ task, resolve, reject });
      this.processQueue();
    });
  }

  /**
   * Process the rate limit queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.rateLimitQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    while (this.rateLimitQueue.length > 0) {
      // Process batch of requests
      const batchSize = Math.min(this.config.batchSize, this.rateLimitQueue.length);
      const batch = this.rateLimitQueue.splice(0, batchSize);

      // Execute batch in parallel
      const batchPromises = batch.map(async ({ task, resolve, reject }) => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error instanceof Error ? error : new Error(String(error)));
        }
      });

      await Promise.all(batchPromises);

      // Rate limiting delay between batches
      if (this.rateLimitQueue.length > 0) {
        await this.sleep(this.config.rateLimitDelay);
      }
    }

    this.isProcessingQueue = false;
  }

  /**
   * Load cached results from database
   */
  private async loadCachedResults(links: ScannedLink[]): Promise<void> {
    try {
      const urls = links.map(link => link.url);
      
      const { data: cachedResults, error } = await getSupabaseAdmin()
        .from('validation_results')
        .select('*')
        .in('url', urls)
        .gte('checked_at', new Date(Date.now() - 60 * 60 * 1000).toISOString()); // 1 hour cache

      if (error) {
        console.error('Failed to load cached results:', error);
        return;
      }

      if (cachedResults) {
        for (const cached of cachedResults) {
          const result: ValidationResult = {
            url: cached.url,
            status: cached.status as ValidationResult['status'],
            statusCode: cached.status_code,
            redirectUrl: cached.redirect_url,
            error: cached.error_message,
            responseTime: cached.response_time,
            lastChecked: new Date(cached.checked_at),
          };

          this.validationCache.set(cached.url, result);
        }
      }
    } catch (error) {
      console.error('Error loading cached results:', error);
    }
  }

  /**
   * Update cache with new results
   */
  private async updateCache(results: ValidationResult[]): Promise<void> {
    // Update in-memory cache
    for (const result of results) {
      this.validationCache.set(result.url, result);
    }

    // Batch update database
    try {
      const dbRecords = results.map(result => ({
        url: result.url,
        status: result.status,
        status_code: result.statusCode,
        redirect_url: result.redirectUrl,
        error_message: result.error,
        response_time: result.responseTime,
        checked_at: result.lastChecked.toISOString(),
      }));

      const { error } = await getSupabaseAdmin()
        .from('validation_results')
        .upsert(dbRecords);

      if (error) {
        console.error('Failed to update cache in database:', error);
      }
    } catch (error) {
      console.error('Error updating cache:', error);
    }
  }

  /**
   * Save validation metrics
   */
  private async saveMetrics(): Promise<void> {
    try {
      const healthScore = this.calculateHealthScore();
      
      const { error } = await getSupabaseAdmin()
        .from('link_health_metrics')
        .upsert({
          date: new Date().toISOString().split('T')[0],
          total_links: this.stats.totalProcessed,
          broken_links: this.stats.brokenLinks,
          health_score: healthScore,
          response_time_avg: this.calculateAverageResponseTime(),
        });

      if (error) {
        console.error('Failed to save metrics:', error);
      }
    } catch (error) {
      console.error('Error saving metrics:', error);
    }
  }

  /**
   * Calculate health score based on validation results
   */
  private calculateHealthScore(): number {
    if (this.stats.totalProcessed === 0) return 100;
    
    const validPercentage = (this.stats.validLinks / this.stats.totalProcessed) * 100;
    return Math.round(validPercentage * 100) / 100;
  }

  /**
   * Calculate average response time
   */
  private calculateAverageResponseTime(): number {
    // This would need to be tracked during validation
    // For now, return a placeholder
    return 0;
  }

  /**
   * Update validation statistics
   */
  private updateStats(result: ValidationResult): void {
    this.stats.totalProcessed++;
    
    switch (result.status) {
      case 'valid':
        this.stats.validLinks++;
        break;
      case 'broken':
        this.stats.brokenLinks++;
        break;
      case 'timeout':
        this.stats.timeouts++;
        break;
      default:
        this.stats.errors++;
    }
  }

  /**
   * Reset statistics
   */
  private resetStats(): void {
    this.stats = {
      totalProcessed: 0,
      cacheHits: 0,
      validLinks: 0,
      brokenLinks: 0,
      timeouts: 0,
      errors: 0,
    };
  }

  /**
   * Get current statistics
   */
  getStats(): typeof this.stats {
    return { ...this.stats };
  }

  /**
   * Check if cache entry is still valid
   */
  private isCacheValid(result: ValidationResult): boolean {
    const now = new Date();
    const cacheAge = now.getTime() - result.lastChecked.getTime();
    const maxAge = 60 * 60 * 1000; // 1 hour
    
    return cacheAge < maxAge;
  }

  /**
   * Sleep utility for delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    this.validationCache.clear();
    this.httpValidator.clearCache();
    this.localValidator.clearCache();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    batchCache: number;
    httpCache: number;
    localCache: number;
    hitRate: number;
  } {
    const httpStats = this.httpValidator.getCacheStats();
    const localStats = this.localValidator.getCacheStats();
    
    return {
      batchCache: this.validationCache.size,
      httpCache: httpStats.size,
      localCache: localStats.size,
      hitRate: this.stats.totalProcessed > 0 ? 
        (this.stats.cacheHits / this.stats.totalProcessed) * 100 : 0,
    };
  }

  /**
   * Validate links with priority-based processing
   */
  async validateWithPriority(links: ScannedLink[]): Promise<ValidationResult[]> {
    // Sort links by priority (critical first)
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const sortedLinks = [...links].sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    // Process critical and high priority links first
    const criticalLinks = sortedLinks.filter(link => 
      link.priority === 'critical' || link.priority === 'high'
    );
    const normalLinks = sortedLinks.filter(link => 
      link.priority === 'medium' || link.priority === 'low'
    );

    const results: ValidationResult[] = [];

    if (criticalLinks.length > 0) {
      console.log(`Processing ${criticalLinks.length} critical/high priority links...`);
      const criticalResults = await this.validateBatch(criticalLinks);
      results.push(...criticalResults);
    }

    if (normalLinks.length > 0) {
      console.log(`Processing ${normalLinks.length} normal priority links...`);
      const normalResults = await this.validateBatch(normalLinks);
      results.push(...normalResults);
    }

    return results;
  }

  /**
   * Get validation summary
   */
  getValidationSummary(results: ValidationResult[]): {
    total: number;
    valid: number;
    broken: number;
    redirects: number;
    timeouts: number;
    healthScore: number;
    criticalIssues: ValidationResult[];
  } {
    const summary = {
      total: results.length,
      valid: 0,
      broken: 0,
      redirects: 0,
      timeouts: 0,
      healthScore: 0,
      criticalIssues: [] as ValidationResult[],
    };

    for (const result of results) {
      switch (result.status) {
        case 'valid':
          summary.valid++;
          break;
        case 'broken':
          summary.broken++;
          summary.criticalIssues.push(result);
          break;
        case 'redirect':
          summary.redirects++;
          break;
        case 'timeout':
          summary.timeouts++;
          summary.criticalIssues.push(result);
          break;
      }
    }

    summary.healthScore = summary.total > 0 ? 
      Math.round((summary.valid / summary.total) * 100) : 100;

    return summary;
  }
}

// Export singleton instance
export const batchValidator = new BatchValidator();