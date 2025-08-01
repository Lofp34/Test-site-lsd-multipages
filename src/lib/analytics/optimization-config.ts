/**
 * Optimization Configuration Manager
 * Manages dynamic configuration parameters based on production analytics
 */

export interface OptimizationConfig {
  cache: {
    linksTtl: number; // in hours
    sitemapTtl: number; // in hours
    reportsTtl: number; // in hours
    maxCacheSize: number; // in MB
  };
  batch: {
    size: number;
    maxConcurrency: number;
    timeoutMs: number;
    retryAttempts: number;
  };
  alerts: {
    errorRateThreshold: number; // percentage
    memoryThreshold: number; // MB
    responseTimeThreshold: number; // ms
    falsePositiveThreshold: number; // percentage
  };
  vercel: {
    usageWarningThreshold: number; // percentage of limit
    usageCriticalThreshold: number; // percentage of limit
    upgradeRecommendationThreshold: number; // percentage of limit
  };
  performance: {
    maxAuditDuration: number; // ms
    maxMemoryUsage: number; // MB
    minCacheHitRate: number; // percentage
    maxErrorRate: number; // percentage
  };
}

export const DEFAULT_CONFIG: OptimizationConfig = {
  cache: {
    linksTtl: 6,
    sitemapTtl: 24,
    reportsTtl: 168, // 7 days
    maxCacheSize: 100
  },
  batch: {
    size: 10,
    maxConcurrency: 3,
    timeoutMs: 5000,
    retryAttempts: 2
  },
  alerts: {
    errorRateThreshold: 5,
    memoryThreshold: 400,
    responseTimeThreshold: 10000,
    falsePositiveThreshold: 5
  },
  vercel: {
    usageWarningThreshold: 70,
    usageCriticalThreshold: 85,
    upgradeRecommendationThreshold: 80
  },
  performance: {
    maxAuditDuration: 180000, // 3 minutes
    maxMemoryUsage: 512,
    minCacheHitRate: 70,
    maxErrorRate: 3
  }
};

export class OptimizationConfigManager {
  private supabase: any;
  private currentConfig: OptimizationConfig;

  constructor(supabaseClient: any) {
    this.supabase = supabaseClient;
    this.currentConfig = { ...DEFAULT_CONFIG };
  }

  /**
   * Load configuration from database
   */
  async loadConfig(): Promise<OptimizationConfig> {
    try {
      const { data: configs } = await this.supabase
        .from('system_config')
        .select('key, value')
        .like('key', 'optimization_%');

      if (configs && configs.length > 0) {
        const configMap = new Map(configs.map((c: any) => [c.key, c.value]));
        this.currentConfig = this.parseConfigFromMap(configMap);
      }

      return this.currentConfig;
    } catch (error) {
      console.error('Error loading optimization config:', error);
      return DEFAULT_CONFIG;
    }
  }

  /**
   * Save configuration to database
   */
  async saveConfig(config: OptimizationConfig): Promise<void> {
    try {
      const configEntries = this.flattenConfig(config);
      
      const upsertData = configEntries.map(([key, value]) => ({
        key: `optimization_${key}`,
        value: value.toString(),
        updated_at: new Date().toISOString()
      }));

      await this.supabase
        .from('system_config')
        .upsert(upsertData);

      this.currentConfig = { ...config };
    } catch (error) {
      console.error('Error saving optimization config:', error);
      throw error;
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): OptimizationConfig {
    return { ...this.currentConfig };
  }

  /**
   * Update configuration based on analytics recommendations
   */
  async applyAnalyticsOptimizations(metrics: any): Promise<OptimizationConfig> {
    const newConfig = { ...this.currentConfig };
    let configChanged = false;

    // Cache optimizations
    if (metrics.performance.cacheHitRate < this.currentConfig.performance.minCacheHitRate) {
      // Increase cache TTL for better hit rate
      newConfig.cache.linksTtl = Math.min(newConfig.cache.linksTtl * 1.5, 12);
      newConfig.cache.sitemapTtl = Math.min(newConfig.cache.sitemapTtl * 1.2, 48);
      configChanged = true;
    }

    // Batch size optimizations
    if (metrics.performance.averageResponseTime > this.currentConfig.alerts.responseTimeThreshold) {
      // Reduce batch size to improve response time
      newConfig.batch.size = Math.max(newConfig.batch.size - 2, 5);
      newConfig.batch.maxConcurrency = Math.min(newConfig.batch.maxConcurrency + 1, 5);
      configChanged = true;
    } else if (metrics.performance.averageResponseTime < 3000 && metrics.performance.errorRate < 2) {
      // Increase batch size for better throughput
      newConfig.batch.size = Math.min(newConfig.batch.size + 1, 15);
      configChanged = true;
    }

    // Memory optimizations
    if (metrics.performance.memoryUsage > this.currentConfig.alerts.memoryThreshold) {
      // Reduce batch size and cache size
      newConfig.batch.size = Math.max(newConfig.batch.size - 1, 5);
      newConfig.cache.maxCacheSize = Math.max(newConfig.cache.maxCacheSize - 20, 50);
      configChanged = true;
    }

    // Alert threshold optimizations
    if (metrics.systemHealth.falsePositiveRate > this.currentConfig.alerts.falsePositiveThreshold) {
      // Increase thresholds to reduce false positives
      newConfig.alerts.errorRateThreshold = Math.min(newConfig.alerts.errorRateThreshold + 1, 10);
      newConfig.alerts.responseTimeThreshold = Math.min(newConfig.alerts.responseTimeThreshold + 2000, 15000);
      configChanged = true;
    }

    // Vercel usage optimizations
    if (metrics.vercelUsage.percentageOfLimit > this.currentConfig.vercel.usageWarningThreshold) {
      // Optimize for lower resource usage
      newConfig.batch.timeoutMs = Math.max(newConfig.batch.timeoutMs - 1000, 3000);
      newConfig.cache.linksTtl = Math.min(newConfig.cache.linksTtl + 2, 12);
      configChanged = true;
    }

    if (configChanged) {
      await this.saveConfig(newConfig);
      console.log('Configuration optimized based on analytics data');
    }

    return newConfig;
  }

  /**
   * Reset configuration to defaults
   */
  async resetToDefaults(): Promise<void> {
    await this.saveConfig(DEFAULT_CONFIG);
  }

  /**
   * Get configuration recommendations based on metrics
   */
  getConfigRecommendations(metrics: any): Array<{
    parameter: string;
    currentValue: any;
    recommendedValue: any;
    reason: string;
    impact: string;
  }> {
    const recommendations = [];

    // Cache recommendations
    if (metrics.performance.cacheHitRate < 70) {
      recommendations.push({
        parameter: 'cache.linksTtl',
        currentValue: this.currentConfig.cache.linksTtl,
        recommendedValue: Math.min(this.currentConfig.cache.linksTtl * 1.5, 12),
        reason: `Taux de cache hit faible (${metrics.performance.cacheHitRate.toFixed(1)}%)`,
        impact: 'Amélioration des performances et réduction des coûts Vercel'
      });
    }

    // Batch size recommendations
    if (metrics.performance.averageResponseTime > 8000) {
      recommendations.push({
        parameter: 'batch.size',
        currentValue: this.currentConfig.batch.size,
        recommendedValue: Math.max(this.currentConfig.batch.size - 2, 5),
        reason: `Temps de réponse élevé (${(metrics.performance.averageResponseTime / 1000).toFixed(1)}s)`,
        impact: 'Réduction du temps de réponse et des timeouts'
      });
    }

    // Memory recommendations
    if (metrics.performance.memoryUsage > 450) {
      recommendations.push({
        parameter: 'batch.size',
        currentValue: this.currentConfig.batch.size,
        recommendedValue: Math.max(this.currentConfig.batch.size - 1, 5),
        reason: `Usage mémoire élevé (${metrics.performance.memoryUsage}MB)`,
        impact: 'Réduction de l\'usage mémoire et des risques de timeout'
      });
    }

    // Alert threshold recommendations
    if (metrics.systemHealth.falsePositiveRate > 8) {
      recommendations.push({
        parameter: 'alerts.errorRateThreshold',
        currentValue: this.currentConfig.alerts.errorRateThreshold,
        recommendedValue: this.currentConfig.alerts.errorRateThreshold + 2,
        reason: `Taux de faux positifs élevé (${metrics.systemHealth.falsePositiveRate.toFixed(1)}%)`,
        impact: 'Réduction des alertes non pertinentes'
      });
    }

    return recommendations;
  }

  private parseConfigFromMap(configMap: Map<string, string>): OptimizationConfig {
    const config = { ...DEFAULT_CONFIG };

    // Parse cache config
    if (configMap.has('optimization_cache_links_ttl')) {
      config.cache.linksTtl = parseInt(configMap.get('optimization_cache_links_ttl')!);
    }
    if (configMap.has('optimization_cache_sitemap_ttl')) {
      config.cache.sitemapTtl = parseInt(configMap.get('optimization_cache_sitemap_ttl')!);
    }
    if (configMap.has('optimization_cache_reports_ttl')) {
      config.cache.reportsTtl = parseInt(configMap.get('optimization_cache_reports_ttl')!);
    }

    // Parse batch config
    if (configMap.has('optimization_batch_size')) {
      config.batch.size = parseInt(configMap.get('optimization_batch_size')!);
    }
    if (configMap.has('optimization_batch_max_concurrency')) {
      config.batch.maxConcurrency = parseInt(configMap.get('optimization_batch_max_concurrency')!);
    }
    if (configMap.has('optimization_batch_timeout_ms')) {
      config.batch.timeoutMs = parseInt(configMap.get('optimization_batch_timeout_ms')!);
    }

    // Parse alert config
    if (configMap.has('optimization_alerts_error_rate_threshold')) {
      config.alerts.errorRateThreshold = parseFloat(configMap.get('optimization_alerts_error_rate_threshold')!);
    }
    if (configMap.has('optimization_alerts_memory_threshold')) {
      config.alerts.memoryThreshold = parseInt(configMap.get('optimization_alerts_memory_threshold')!);
    }

    return config;
  }

  private flattenConfig(config: OptimizationConfig): Array<[string, any]> {
    return [
      ['cache_links_ttl', config.cache.linksTtl],
      ['cache_sitemap_ttl', config.cache.sitemapTtl],
      ['cache_reports_ttl', config.cache.reportsTtl],
      ['cache_max_cache_size', config.cache.maxCacheSize],
      ['batch_size', config.batch.size],
      ['batch_max_concurrency', config.batch.maxConcurrency],
      ['batch_timeout_ms', config.batch.timeoutMs],
      ['batch_retry_attempts', config.batch.retryAttempts],
      ['alerts_error_rate_threshold', config.alerts.errorRateThreshold],
      ['alerts_memory_threshold', config.alerts.memoryThreshold],
      ['alerts_response_time_threshold', config.alerts.responseTimeThreshold],
      ['alerts_false_positive_threshold', config.alerts.falsePositiveThreshold],
      ['vercel_usage_warning_threshold', config.vercel.usageWarningThreshold],
      ['vercel_usage_critical_threshold', config.vercel.usageCriticalThreshold],
      ['vercel_upgrade_recommendation_threshold', config.vercel.upgradeRecommendationThreshold],
      ['performance_max_audit_duration', config.performance.maxAuditDuration],
      ['performance_max_memory_usage', config.performance.maxMemoryUsage],
      ['performance_min_cache_hit_rate', config.performance.minCacheHitRate],
      ['performance_max_error_rate', config.performance.maxErrorRate]
    ];
  }
}