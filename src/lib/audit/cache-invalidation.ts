/**
 * Cache Invalidation and Refresh System
 * 
 * Provides intelligent cache invalidation strategies:
 * - Time-based invalidation (TTL)
 * - Event-based invalidation (content changes)
 * - Manual invalidation (admin actions)
 * - Selective refresh (partial cache updates)
 */

import { cacheStrategy, createCacheKey } from './cache-strategy';
import { cachedLinkValidator, cachedSitemapProcessor, cachedReportGenerator } from './cache-integration';
import { getSupabaseAdmin } from './database';

export interface InvalidationRule {
  pattern: RegExp;
  cacheTypes: ('links' | 'sitemap' | 'reports')[];
  reason: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface InvalidationEvent {
  type: 'content_change' | 'deployment' | 'manual' | 'scheduled' | 'error_recovery';
  source: string;
  timestamp: Date;
  affectedUrls?: string[];
  metadata?: Record<string, any>;
}

export interface RefreshStrategy {
  immediate: boolean;
  batchSize: number;
  priority: 'background' | 'normal' | 'urgent';
  retryAttempts: number;
}

export class CacheInvalidationManager {
  private invalidationRules: InvalidationRule[] = [];
  private refreshQueue: Array<{ url: string; strategy: RefreshStrategy }> = [];
  private isProcessingQueue = false;

  constructor() {
    this.setupDefaultRules();
  }

  /**
   * Setup default invalidation rules
   */
  private setupDefaultRules(): void {
    this.invalidationRules = [
      // Invalidate all caches for homepage changes
      {
        pattern: /^https:\/\/laurent-serre-developpement\.fr\/?$/,
        cacheTypes: ['links', 'sitemap', 'reports'],
        reason: 'Homepage content change',
        priority: 'critical',
      },
      
      // Invalidate sitemap cache for sitemap changes
      {
        pattern: /\/sitemap.*\.xml$/,
        cacheTypes: ['sitemap'],
        reason: 'Sitemap file change',
        priority: 'high',
      },
      
      // Invalidate link cache for page content changes
      {
        pattern: /\.(html|tsx?|jsx?|md)$/,
        cacheTypes: ['links'],
        reason: 'Page content change',
        priority: 'medium',
      },
      
      // Invalidate report cache for data changes
      {
        pattern: /\/api\/(audit|admin)/,
        cacheTypes: ['reports'],
        reason: 'Audit data change',
        priority: 'medium',
      },
    ];
  }

  /**
   * Add custom invalidation rule
   */
  addInvalidationRule(rule: InvalidationRule): void {
    this.invalidationRules.push(rule);
    this.sortRulesByPriority();
  }

  /**
   * Remove invalidation rule
   */
  removeInvalidationRule(pattern: RegExp): boolean {
    const initialLength = this.invalidationRules.length;
    this.invalidationRules = this.invalidationRules.filter(rule => 
      rule.pattern.source !== pattern.source
    );
    return this.invalidationRules.length < initialLength;
  }

  /**
   * Process invalidation event
   */
  async processInvalidationEvent(event: InvalidationEvent): Promise<void> {
    console.log(`Processing invalidation event: ${event.type} from ${event.source}`);
    
    const applicableRules = this.findApplicableRules(event);
    
    if (applicableRules.length === 0) {
      console.log('No applicable invalidation rules found');
      return;
    }

    // Group rules by cache type for efficient processing
    const cacheTypeGroups = this.groupRulesByCacheType(applicableRules);
    
    let totalInvalidated = 0;
    
    // Process each cache type group
    for (const [cacheType, rules] of cacheTypeGroups) {
      const patterns = rules.map(rule => rule.pattern);
      const invalidated = await this.invalidateByCacheType(cacheType, patterns, event);
      totalInvalidated += invalidated;
    }

    // Log invalidation results
    await this.logInvalidationEvent(event, applicableRules, totalInvalidated);
    
    // Schedule refresh if needed
    if (event.affectedUrls && event.affectedUrls.length > 0) {
      await this.scheduleRefresh(event.affectedUrls, this.getRefreshStrategy(event));
    }

    console.log(`Invalidation complete: ${totalInvalidated} entries invalidated`);
  }

  /**
   * Manual cache invalidation
   */
  async invalidateManually(
    patterns: string[],
    cacheTypes: ('links' | 'sitemap' | 'reports')[],
    reason: string
  ): Promise<number> {
    const event: InvalidationEvent = {
      type: 'manual',
      source: 'admin',
      timestamp: new Date(),
      metadata: { reason, patterns },
    };

    let totalInvalidated = 0;
    
    for (const cacheType of cacheTypes) {
      for (const patternStr of patterns) {
        const pattern = new RegExp(patternStr);
        const invalidated = cacheStrategy.invalidateByPattern(pattern, cacheType);
        totalInvalidated += invalidated;
      }
    }

    await this.logInvalidationEvent(event, [], totalInvalidated);
    
    return totalInvalidated;
  }

  /**
   * Invalidate cache for specific URL
   */
  async invalidateUrl(url: string, cacheTypes?: ('links' | 'sitemap' | 'reports')[]): Promise<boolean> {
    const types = cacheTypes || ['links', 'sitemap', 'reports'];
    let found = false;

    for (const cacheType of types) {
      if (cacheStrategy.invalidate(url, cacheType)) {
        found = true;
      }
    }

    if (found) {
      const event: InvalidationEvent = {
        type: 'manual',
        source: 'api',
        timestamp: new Date(),
        affectedUrls: [url],
      };

      await this.logInvalidationEvent(event, [], 1);
    }

    return found;
  }

  /**
   * Invalidate cache for domain
   */
  async invalidateDomain(domain: string): Promise<number> {
    const pattern = new RegExp(`^https?://${domain.replace('.', '\\.')}`);
    const invalidated = cacheStrategy.invalidateByPattern(pattern);
    
    const event: InvalidationEvent = {
      type: 'manual',
      source: 'admin',
      timestamp: new Date(),
      metadata: { domain },
    };

    await this.logInvalidationEvent(event, [], invalidated);
    
    return invalidated;
  }

  /**
   * Schedule cache refresh
   */
  async scheduleRefresh(urls: string[], strategy: RefreshStrategy): Promise<void> {
    // Add URLs to refresh queue
    urls.forEach(url => {
      this.refreshQueue.push({ url, strategy });
    });

    // Sort queue by priority
    this.refreshQueue.sort((a, b) => {
      const priorityOrder = { urgent: 0, normal: 1, background: 2 };
      return priorityOrder[a.strategy.priority] - priorityOrder[b.strategy.priority];
    });

    // Process queue if not already processing
    if (!this.isProcessingQueue) {
      await this.processRefreshQueue();
    }
  }

  /**
   * Force refresh of specific URLs
   */
  async forceRefresh(urls: string[]): Promise<void> {
    const strategy: RefreshStrategy = {
      immediate: true,
      batchSize: 5,
      priority: 'urgent',
      retryAttempts: 2,
    };

    await this.scheduleRefresh(urls, strategy);
  }

  /**
   * Refresh expired cache entries
   */
  async refreshExpired(): Promise<number> {
    const stats = cacheStrategy.getStats();
    const clearedCount = cacheStrategy.clearExpired();
    
    if (clearedCount > 0) {
      console.log(`Cleared ${clearedCount} expired cache entries`);
      
      // Log the cleanup
      const event: InvalidationEvent = {
        type: 'scheduled',
        source: 'system',
        timestamp: new Date(),
        metadata: { clearedCount, reason: 'TTL expiration' },
      };

      await this.logInvalidationEvent(event, [], clearedCount);
    }

    return clearedCount;
  }

  /**
   * Find applicable invalidation rules for event
   */
  private findApplicableRules(event: InvalidationEvent): InvalidationRule[] {
    const applicableRules: InvalidationRule[] = [];
    
    // Check event source against rules
    for (const rule of this.invalidationRules) {
      if (rule.pattern.test(event.source)) {
        applicableRules.push(rule);
      }
    }

    // Check affected URLs if provided
    if (event.affectedUrls) {
      for (const url of event.affectedUrls) {
        for (const rule of this.invalidationRules) {
          if (rule.pattern.test(url) && !applicableRules.includes(rule)) {
            applicableRules.push(rule);
          }
        }
      }
    }

    return applicableRules;
  }

  /**
   * Group rules by cache type
   */
  private groupRulesByCacheType(rules: InvalidationRule[]): Map<string, InvalidationRule[]> {
    const groups = new Map<string, InvalidationRule[]>();
    
    for (const rule of rules) {
      for (const cacheType of rule.cacheTypes) {
        if (!groups.has(cacheType)) {
          groups.set(cacheType, []);
        }
        groups.get(cacheType)!.push(rule);
      }
    }

    return groups;
  }

  /**
   * Invalidate by cache type
   */
  private async invalidateByCacheType(
    cacheType: string,
    patterns: RegExp[],
    event: InvalidationEvent
  ): Promise<number> {
    let totalInvalidated = 0;
    
    for (const pattern of patterns) {
      const invalidated = cacheStrategy.invalidateByPattern(
        pattern,
        cacheType as 'links' | 'sitemap' | 'reports'
      );
      totalInvalidated += invalidated;
    }

    return totalInvalidated;
  }

  /**
   * Get refresh strategy based on event
   */
  private getRefreshStrategy(event: InvalidationEvent): RefreshStrategy {
    switch (event.type) {
      case 'deployment':
        return {
          immediate: true,
          batchSize: 10,
          priority: 'urgent',
          retryAttempts: 3,
        };
      
      case 'content_change':
        return {
          immediate: false,
          batchSize: 5,
          priority: 'normal',
          retryAttempts: 2,
        };
      
      case 'error_recovery':
        return {
          immediate: true,
          batchSize: 3,
          priority: 'urgent',
          retryAttempts: 5,
        };
      
      default:
        return {
          immediate: false,
          batchSize: 10,
          priority: 'background',
          retryAttempts: 1,
        };
    }
  }

  /**
   * Process refresh queue
   */
  private async processRefreshQueue(): Promise<void> {
    if (this.isProcessingQueue || this.refreshQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;
    console.log(`Processing refresh queue: ${this.refreshQueue.length} items`);

    try {
      while (this.refreshQueue.length > 0) {
        const batch = this.refreshQueue.splice(0, 10); // Process in batches of 10
        
        await Promise.all(
          batch.map(async ({ url, strategy }) => {
            try {
              await this.refreshUrl(url, strategy);
            } catch (error) {
              console.error(`Failed to refresh ${url}:`, error);
            }
          })
        );

        // Small delay between batches
        if (this.refreshQueue.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    } finally {
      this.isProcessingQueue = false;
    }

    console.log('Refresh queue processing complete');
  }

  /**
   * Refresh specific URL
   */
  private async refreshUrl(url: string, strategy: RefreshStrategy): Promise<void> {
    let attempts = 0;
    
    while (attempts < strategy.retryAttempts) {
      try {
        // Determine refresh method based on URL type
        if (url.includes('sitemap')) {
          await cachedSitemapProcessor.processSitemap(url, true);
        } else {
          await cachedLinkValidator.refreshCachedLink(url);
        }
        
        console.log(`Successfully refreshed: ${url}`);
        return;
      } catch (error) {
        attempts++;
        console.error(`Refresh attempt ${attempts} failed for ${url}:`, error);
        
        if (attempts < strategy.retryAttempts) {
          // Exponential backoff
          const delay = Math.pow(2, attempts) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    console.error(`Failed to refresh ${url} after ${strategy.retryAttempts} attempts`);
  }

  /**
   * Log invalidation event to database
   */
  private async logInvalidationEvent(
    event: InvalidationEvent,
    rules: InvalidationRule[],
    entriesInvalidated: number
  ): Promise<void> {
    try {
      const supabase = getSupabaseAdmin();
      
      const { error } = await supabase
        .from('cache_invalidation_log')
        .insert({
          event_type: event.type,
          source: event.source,
          timestamp: event.timestamp.toISOString(),
          affected_urls: event.affectedUrls || [],
          rules_applied: rules.map(r => ({
            pattern: r.pattern.source,
            cacheTypes: r.cacheTypes,
            reason: r.reason,
            priority: r.priority,
          })),
          entries_invalidated: entriesInvalidated,
          metadata: event.metadata || {},
        });

      if (error) {
        console.error('Failed to log invalidation event:', error);
      }
    } catch (error) {
      console.error('Error logging invalidation event:', error);
    }
  }

  /**
   * Sort rules by priority
   */
  private sortRulesByPriority(): void {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    
    this.invalidationRules.sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  /**
   * Get invalidation statistics
   */
  async getInvalidationStats(days = 7): Promise<any> {
    try {
      const supabase = getSupabaseAdmin();
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      
      const { data, error } = await supabase
        .from('cache_invalidation_log')
        .select('*')
        .gte('timestamp', since.toISOString());

      if (error) {
        console.error('Failed to get invalidation stats:', error);
        return null;
      }

      const stats = {
        totalEvents: data.length,
        totalEntriesInvalidated: data.reduce((sum, event) => sum + event.entries_invalidated, 0),
        eventsByType: data.reduce((acc, event) => {
          acc[event.event_type] = (acc[event.event_type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        averageEntriesPerEvent: data.length > 0 
          ? Math.round(data.reduce((sum, event) => sum + event.entries_invalidated, 0) / data.length)
          : 0,
      };

      return stats;
    } catch (error) {
      console.error('Error getting invalidation stats:', error);
      return null;
    }
  }
}

// Export singleton instance
export const cacheInvalidationManager = new CacheInvalidationManager();

// Export utility functions
export const invalidationUtils = {
  /**
   * Trigger invalidation for content deployment
   */
  async onDeployment(affectedUrls: string[]): Promise<void> {
    const event: InvalidationEvent = {
      type: 'deployment',
      source: 'vercel',
      timestamp: new Date(),
      affectedUrls,
      metadata: { trigger: 'deployment_hook' },
    };

    await cacheInvalidationManager.processInvalidationEvent(event);
  },

  /**
   * Trigger invalidation for content changes
   */
  async onContentChange(changedFiles: string[]): Promise<void> {
    const event: InvalidationEvent = {
      type: 'content_change',
      source: 'cms',
      timestamp: new Date(),
      affectedUrls: changedFiles,
      metadata: { trigger: 'content_update' },
    };

    await cacheInvalidationManager.processInvalidationEvent(event);
  },

  /**
   * Trigger invalidation for error recovery
   */
  async onErrorRecovery(failedUrls: string[]): Promise<void> {
    const event: InvalidationEvent = {
      type: 'error_recovery',
      source: 'audit_system',
      timestamp: new Date(),
      affectedUrls: failedUrls,
      metadata: { trigger: 'error_recovery' },
    };

    await cacheInvalidationManager.processInvalidationEvent(event);
  },

  /**
   * Schedule regular cache maintenance
   */
  async scheduledMaintenance(): Promise<void> {
    const event: InvalidationEvent = {
      type: 'scheduled',
      source: 'cron',
      timestamp: new Date(),
      metadata: { trigger: 'scheduled_maintenance' },
    };

    await cacheInvalidationManager.processInvalidationEvent(event);
    await cacheInvalidationManager.refreshExpired();
  },
};