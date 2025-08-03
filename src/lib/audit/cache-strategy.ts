/**
 * Intelligent Cache System for Vercel Optimization
 * 
 * Implements configurable TTL caching for:
 * - Link validation results (6h TTL)
 * - Sitemap data (24h TTL) 
 * - Reports (7 days TTL)
 * 
 * Features:
 * - Memory-based cache with TTL
 * - Automatic cache invalidation
 * - Cache statistics and monitoring
 * - Batch operations support
 */

import { ValidationResult, AuditReport } from './types';
import { getSupabaseAdmin } from './database';
import { cpuOptimizer } from './cpu-optimizer';
import { memoryOptimizer } from './memory-optimizer';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  hits: number;
  lastAccessed: number;
}

export interface CacheConfig {
  linkResultsTTL: number;      // 6 hours in milliseconds
  sitemapDataTTL: number;      // 24 hours in milliseconds
  reportDataTTL: number;       // 7 days in milliseconds
  maxMemoryUsage: number;      // Max memory usage in MB
  cleanupInterval: number;     // Cleanup interval in milliseconds
}

export interface CacheStats {
  totalEntries: number;
  memoryUsage: number;
  hitRate: number;
  missRate: number;
  totalHits: number;
  totalMisses: number;
  oldestEntry: number;
  newestEntry: number;
}

export interface SitemapData {
  urls: string[];
  lastModified: Date;
  totalPages: number;
  metadata: Record<string, any>;
}

export class CacheStrategy {
  private linkCache = new Map<string, CacheEntry<ValidationResult>>();
  private sitemapCache = new Map<string, CacheEntry<SitemapData>>();
  private reportCache = new Map<string, CacheEntry<AuditReport>>();
  
  private config: CacheConfig;
  private stats = {
    totalHits: 0,
    totalMisses: 0,
  };
  
  private cleanupTimer?: NodeJS.Timeout;

  constructor(config?: Partial<CacheConfig>) {
    this.config = {
      linkResultsTTL: 6 * 60 * 60 * 1000,      // 6 hours
      sitemapDataTTL: 24 * 60 * 60 * 1000,     // 24 hours
      reportDataTTL: 7 * 24 * 60 * 60 * 1000,  // 7 days
      maxMemoryUsage: 100,                      // 100 MB
      cleanupInterval: 30 * 60 * 1000,          // 30 minutes
      ...config,
    };

    // Start automatic cleanup
    this.startCleanupTimer();
  }

  /**
   * Cache link validation result
   */
  async setLinkResult(url: string, result: ValidationResult): Promise<void> {
    const entry: CacheEntry<ValidationResult> = {
      data: result,
      timestamp: Date.now(),
      ttl: this.config.linkResultsTTL,
      hits: 0,
      lastAccessed: Date.now(),
    };

    this.linkCache.set(url, entry);
    await this.enforceMemoryLimit();
  }

  /**
   * Get cached link validation result with CPU optimization
   */
  getLinkResult(url: string): ValidationResult | null {
    return cpuOptimizer.profileFunction(
      'CacheStrategy.getLinkResult',
      () => {
        const entry = this.linkCache.get(url);
        
        if (!entry) {
          this.stats.totalMisses++;
          return null;
        }

        // Check if entry has expired
        if (this.isExpired(entry)) {
          this.linkCache.delete(url);
          this.stats.totalMisses++;
          return null;
        }

        // Update access statistics
        entry.hits++;
        entry.lastAccessed = Date.now();
        this.stats.totalHits++;

        return entry.data;
      },
      { enableMemoization: true, memoTTL: 60000 } // 1 minute memoization for frequently accessed URLs
    );
  }

  /**
   * Cache multiple link results in batch
   */
  async setLinkResultsBatch(results: ValidationResult[]): Promise<void> {
    const now = Date.now();
    
    results.forEach(result => {
      const entry: CacheEntry<ValidationResult> = {
        data: result,
        timestamp: now,
        ttl: this.config.linkResultsTTL,
        hits: 0,
        lastAccessed: now,
      };
      
      this.linkCache.set(result.url, entry);
    });

    await this.enforceMemoryLimit();
  }

  /**
   * Get multiple cached link results with CPU optimization
   */
  getLinkResultsBatch(urls: string[]): { cached: ValidationResult[]; missing: string[] } {
    return cpuOptimizer.profileFunction(
      'CacheStrategy.getLinkResultsBatch',
      () => {
        const cached: ValidationResult[] = [];
        const missing: string[] = [];

        // Process URLs in optimized batches to reduce CPU load
        const batchSize = 50; // Process 50 URLs at a time
        for (let i = 0; i < urls.length; i += batchSize) {
          const batch = urls.slice(i, i + batchSize);
          
          batch.forEach(url => {
            const result = this.getLinkResult(url);
            if (result) {
              cached.push(result);
            } else {
              missing.push(url);
            }
          });

          // Yield control to event loop every batch to prevent blocking
          if (i + batchSize < urls.length) {
            setImmediate(() => {}); // Non-blocking yield
          }
        }

        return { cached, missing };
      },
      { enableMemoization: true, memoTTL: 30000 } // 30 seconds memoization for batch operations
    );
  }

  /**
   * Cache sitemap data
   */
  async setSitemapData(key: string, data: SitemapData): Promise<void> {
    const entry: CacheEntry<SitemapData> = {
      data,
      timestamp: Date.now(),
      ttl: this.config.sitemapDataTTL,
      hits: 0,
      lastAccessed: Date.now(),
    };

    this.sitemapCache.set(key, entry);
    await this.enforceMemoryLimit();
  }

  /**
   * Get cached sitemap data
   */
  getSitemapData(key: string): SitemapData | null {
    const entry = this.sitemapCache.get(key);
    
    if (!entry) {
      this.stats.totalMisses++;
      return null;
    }

    if (this.isExpired(entry)) {
      this.sitemapCache.delete(key);
      this.stats.totalMisses++;
      return null;
    }

    entry.hits++;
    entry.lastAccessed = Date.now();
    this.stats.totalHits++;

    return entry.data;
  }

  /**
   * Cache report data
   */
  async setReportData(key: string, report: AuditReport): Promise<void> {
    const entry: CacheEntry<AuditReport> = {
      data: report,
      timestamp: Date.now(),
      ttl: this.config.reportDataTTL,
      hits: 0,
      lastAccessed: Date.now(),
    };

    this.reportCache.set(key, entry);
    await this.enforceMemoryLimit();
  }

  /**
   * Get cached report data
   */
  getReportData(key: string): AuditReport | null {
    const entry = this.reportCache.get(key);
    
    if (!entry) {
      this.stats.totalMisses++;
      return null;
    }

    if (this.isExpired(entry)) {
      this.reportCache.delete(key);
      this.stats.totalMisses++;
      return null;
    }

    entry.hits++;
    entry.lastAccessed = Date.now();
    this.stats.totalHits++;

    return entry.data;
  }

  /**
   * Invalidate cache entries by pattern
   */
  invalidateByPattern(pattern: RegExp, cacheType?: 'links' | 'sitemap' | 'reports'): number {
    let invalidated = 0;

    if (!cacheType || cacheType === 'links') {
      for (const [key] of this.linkCache) {
        if (pattern.test(key)) {
          this.linkCache.delete(key);
          invalidated++;
        }
      }
    }

    if (!cacheType || cacheType === 'sitemap') {
      for (const [key] of this.sitemapCache) {
        if (pattern.test(key)) {
          this.sitemapCache.delete(key);
          invalidated++;
        }
      }
    }

    if (!cacheType || cacheType === 'reports') {
      for (const [key] of this.reportCache) {
        if (pattern.test(key)) {
          this.reportCache.delete(key);
          invalidated++;
        }
      }
    }

    return invalidated;
  }

  /**
   * Invalidate specific cache entry
   */
  invalidate(key: string, cacheType?: 'links' | 'sitemap' | 'reports'): boolean {
    let found = false;

    if (!cacheType || cacheType === 'links') {
      if (this.linkCache.delete(key)) found = true;
    }

    if (!cacheType || cacheType === 'sitemap') {
      if (this.sitemapCache.delete(key)) found = true;
    }

    if (!cacheType || cacheType === 'reports') {
      if (this.reportCache.delete(key)) found = true;
    }

    return found;
  }

  /**
   * Refresh cache entry by re-fetching data
   */
  async refreshLinkResult(url: string, validator: (url: string) => Promise<ValidationResult>): Promise<ValidationResult> {
    // Remove existing entry
    this.linkCache.delete(url);
    
    // Fetch fresh data
    const result = await validator(url);
    
    // Cache the fresh result
    this.setLinkResult(url, result);
    
    return result;
  }

  /**
   * Preload cache with commonly accessed data
   */
  async preloadCache(urls: string[], validator: (urls: string[]) => Promise<ValidationResult[]>): Promise<void> {
    // Check which URLs are not cached or expired
    const { missing } = this.getLinkResultsBatch(urls);
    
    if (missing.length === 0) {
      return; // All URLs are already cached
    }

    // Fetch missing data
    const results = await validator(missing);
    
    // Cache the results
    this.setLinkResultsBatch(results);
  }

  /**
   * Get comprehensive cache statistics
   */
  getStats(): CacheStats {
    const totalEntries = this.linkCache.size + this.sitemapCache.size + this.reportCache.size;
    const memoryUsage = this.estimateMemoryUsage();
    
    let oldestTimestamp = Date.now();
    let newestTimestamp = 0;

    // Find oldest and newest entries
    [this.linkCache, this.sitemapCache, this.reportCache].forEach(cache => {
      for (const entry of cache.values()) {
        if (entry.timestamp < oldestTimestamp) {
          oldestTimestamp = entry.timestamp;
        }
        if (entry.timestamp > newestTimestamp) {
          newestTimestamp = entry.timestamp;
        }
      }
    });

    const totalRequests = this.stats.totalHits + this.stats.totalMisses;
    
    return {
      totalEntries,
      memoryUsage,
      hitRate: totalRequests > 0 ? this.stats.totalHits / totalRequests : 0,
      missRate: totalRequests > 0 ? this.stats.totalMisses / totalRequests : 0,
      totalHits: this.stats.totalHits,
      totalMisses: this.stats.totalMisses,
      oldestEntry: oldestTimestamp,
      newestEntry: newestTimestamp,
    };
  }

  /**
   * Clear all caches
   */
  clearAll(): void {
    this.linkCache.clear();
    this.sitemapCache.clear();
    this.reportCache.clear();
    this.stats.totalHits = 0;
    this.stats.totalMisses = 0;
  }

  /**
   * Clear expired entries from all caches
   */
  clearExpired(): number {
    let cleared = 0;
    const now = Date.now();

    // Clear expired link results
    for (const [key, entry] of this.linkCache) {
      if (now - entry.timestamp > entry.ttl) {
        this.linkCache.delete(key);
        cleared++;
      }
    }

    // Clear expired sitemap data
    for (const [key, entry] of this.sitemapCache) {
      if (now - entry.timestamp > entry.ttl) {
        this.sitemapCache.delete(key);
        cleared++;
      }
    }

    // Clear expired reports
    for (const [key, entry] of this.reportCache) {
      if (now - entry.timestamp > entry.ttl) {
        this.reportCache.delete(key);
        cleared++;
      }
    }

    return cleared;
  }

  /**
   * Persist cache to database for durability
   */
  async persistToDatabase(): Promise<void> {
    try {
      const supabase = getSupabaseAdmin();
      
      // Prepare cache data for persistence
      const cacheData = {
        link_cache: Array.from(this.linkCache.entries()),
        sitemap_cache: Array.from(this.sitemapCache.entries()),
        report_cache: Array.from(this.reportCache.entries()),
        stats: this.stats,
        timestamp: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('cache_snapshots')
        .upsert({
          id: 'current',
          data: cacheData,
          created_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Failed to persist cache to database:', error);
      }
    } catch (error) {
      console.error('Error persisting cache:', error);
    }
  }

  /**
   * Restore cache from database
   */
  async restoreFromDatabase(): Promise<boolean> {
    try {
      const supabase = getSupabaseAdmin();
      
      const { data, error } = await supabase
        .from('cache_snapshots')
        .select('data')
        .eq('id', 'current')
        .single();

      if (error || !data) {
        return false;
      }

      const cacheData = data.data;
      
      // Restore caches
      this.linkCache = new Map(cacheData.link_cache);
      this.sitemapCache = new Map(cacheData.sitemap_cache);
      this.reportCache = new Map(cacheData.report_cache);
      this.stats = cacheData.stats || { totalHits: 0, totalMisses: 0 };

      // Clear expired entries after restoration
      this.clearExpired();

      return true;
    } catch (error) {
      console.error('Error restoring cache:', error);
      return false;
    }
  }

  /**
   * Check if cache entry has expired
   */
  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  /**
   * Estimate memory usage of all caches
   */
  private estimateMemoryUsage(): number {
    let totalSize = 0;

    // Rough estimation: each entry ~1KB on average
    totalSize += this.linkCache.size * 1024;
    totalSize += this.sitemapCache.size * 2048; // Sitemap data is larger
    totalSize += this.reportCache.size * 5120;  // Reports are much larger

    return Math.round(totalSize / (1024 * 1024)); // Convert to MB
  }

  /**
   * Enforce memory limits by removing least recently used entries with memory optimization
   */
  private async enforceMemoryLimit(): Promise<void> {
    const currentUsage = this.estimateMemoryUsage();
    
    if (currentUsage <= this.config.maxMemoryUsage) {
      return;
    }

    // Check system memory before proceeding
    if (!memoryOptimizer.isMemorySafe()) {
      console.warn('⚠️  System memory is high, forcing garbage collection before cache cleanup');
      memoryOptimizer.forceGarbageCollection();
    }

    // Collect all entries with their last accessed time
    const allEntries: Array<{ key: string; lastAccessed: number; cache: 'links' | 'sitemap' | 'reports' }> = [];

    for (const [key, entry] of this.linkCache) {
      allEntries.push({ key, lastAccessed: entry.lastAccessed, cache: 'links' });
    }

    for (const [key, entry] of this.sitemapCache) {
      allEntries.push({ key, lastAccessed: entry.lastAccessed, cache: 'sitemap' });
    }

    for (const [key, entry] of this.reportCache) {
      allEntries.push({ key, lastAccessed: entry.lastAccessed, cache: 'reports' });
    }

    // Sort by last accessed (oldest first) - optimized sorting
    allEntries.sort((a, b) => a.lastAccessed - b.lastAccessed);

    // Remove oldest entries until under memory limit
    let removed = 0;
    const batchSize = 10; // Remove entries in batches to reduce CPU load
    
    for (let i = 0; i < allEntries.length; i += batchSize) {
      if (this.estimateMemoryUsage() <= this.config.maxMemoryUsage) {
        break;
      }

      const batch = allEntries.slice(i, i + batchSize);
      
      for (const entry of batch) {
        switch (entry.cache) {
          case 'links':
            this.linkCache.delete(entry.key);
            break;
          case 'sitemap':
            this.sitemapCache.delete(entry.key);
            break;
          case 'reports':
            this.reportCache.delete(entry.key);
            break;
        }
        removed++;
      }

      // Yield control to event loop between batches
      if (i + batchSize < allEntries.length) {
        await new Promise(resolve => setImmediate(resolve));
      }
    }

    if (removed > 0) {
      console.log(`🗑️  Cache: Removed ${removed} entries to stay under memory limit`);
      
      // Force garbage collection after cleanup
      memoryOptimizer.forceGarbageCollection();
    }
  }

  /**
   * Start automatic cleanup timer
   */
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      const cleared = this.clearExpired();
      if (cleared > 0) {
        console.log(`Cache: Automatically cleared ${cleared} expired entries`);
      }
    }, this.config.cleanupInterval);
  }

  /**
   * Stop automatic cleanup timer
   */
  stopCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = undefined;
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stopCleanupTimer();
    this.clearAll();
  }
}

// Export singleton instance
export const cacheStrategy = new CacheStrategy();

// Export cache configuration utilities
export const createCacheKey = {
  linkResult: (url: string) => `link:${url}`,
  sitemapData: (domain: string) => `sitemap:${domain}`,
  reportData: (date: string, type: string) => `report:${date}:${type}`,
  batchValidation: (urls: string[]) => `batch:${urls.sort().join(',')}`,
};

// Export cache warming utilities
export const cacheWarming = {
  /**
   * Warm up cache with critical URLs
   */
  async warmCriticalUrls(urls: string[], validator: (urls: string[]) => Promise<ValidationResult[]>): Promise<void> {
    await cacheStrategy.preloadCache(urls, validator);
  },

  /**
   * Warm up cache with sitemap data
   */
  async warmSitemapData(sitemapUrl: string): Promise<void> {
    try {
      const response = await fetch(sitemapUrl);
      const xml = await response.text();
      
      // Parse sitemap XML (simplified)
      const urls = xml.match(/<loc>(.*?)<\/loc>/g)?.map(match => 
        match.replace(/<\/?loc>/g, '')
      ) || [];

      const sitemapData: SitemapData = {
        urls,
        lastModified: new Date(),
        totalPages: urls.length,
        metadata: { source: sitemapUrl },
      };

      cacheStrategy.setSitemapData(createCacheKey.sitemapData('main'), sitemapData);
    } catch (error) {
      console.error('Failed to warm sitemap cache:', error);
    }
  },
};