/**
 * Production Analytics System
 * Analyzes real production data to optimize system performance
 */

export interface ProductionMetrics {
  // Vercel Usage Metrics
  vercelUsage: {
    invocations: number;
    computeHours: number;
    percentageOfLimit: number;
    dailyAverage: number;
    weeklyTrend: number;
    projectedMonthly: number;
  };
  
  // Performance Metrics
  performance: {
    auditDuration: number;
    linksProcessed: number;
    averageResponseTime: number;
    memoryUsage: number;
    cpuUtilization: number;
    cacheHitRate: number;
    errorRate: number;
  };
  
  // System Health
  systemHealth: {
    uptime: number;
    availability: number;
    fallbackActivations: number;
    alertsTriggered: number;
    falsePositiveRate: number;
  };
  
  // Business Metrics
  business: {
    brokenLinksDetected: number;
    autoCorrections: number;
    criticalAlertsCount: number;
    reportGenerationTime: number;
    userSatisfactionScore: number;
  };
}

export interface OptimizationRecommendation {
  category: 'cache' | 'batch' | 'alerts' | 'infrastructure' | 'upgrade';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  implementation: string;
  estimatedImprovement: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface AnalysisReport {
  timestamp: Date;
  period: string;
  metrics: ProductionMetrics;
  trends: {
    usageTrend: 'increasing' | 'stable' | 'decreasing';
    performanceTrend: 'improving' | 'stable' | 'degrading';
    errorTrend: 'increasing' | 'stable' | 'decreasing';
  };
  recommendations: OptimizationRecommendation[];
  upgradeRecommendation?: {
    recommended: boolean;
    reason: string;
    roi: string;
    timeline: string;
  };
}

export class ProductionAnalytics {
  private supabase: any;
  
  constructor(supabaseClient: any) {
    this.supabase = supabaseClient;
  }

  /**
   * Collect metrics from the last week of production data
   */
  async collectWeeklyMetrics(): Promise<ProductionMetrics> {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    try {
      // Get Vercel usage data
      const vercelUsage = await this.getVercelUsageMetrics(oneWeekAgo);
      
      // Get performance data
      const performance = await this.getPerformanceMetrics(oneWeekAgo);
      
      // Get system health data
      const systemHealth = await this.getSystemHealthMetrics(oneWeekAgo);
      
      // Get business metrics
      const business = await this.getBusinessMetrics(oneWeekAgo);
      
      return {
        vercelUsage,
        performance,
        systemHealth,
        business
      };
    } catch (error) {
      console.error('Error collecting weekly metrics:', error);
      throw error;
    }
  }

  private async getVercelUsageMetrics(since: Date) {
    const { data: usageData } = await this.supabase
      .from('vercel_usage_logs')
      .select('*')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false });

    if (!usageData || usageData.length === 0) {
      return {
        invocations: 0,
        computeHours: 0,
        percentageOfLimit: 0,
        dailyAverage: 0,
        weeklyTrend: 0,
        projectedMonthly: 0
      };
    }

    const totalInvocations = usageData.reduce((sum: number, record: any) => sum + record.invocations, 0);
    const totalComputeHours = usageData.reduce((sum: number, record: any) => sum + record.compute_hours, 0);
    const dailyAverage = totalInvocations / 7;
    const projectedMonthly = dailyAverage * 30;
    const percentageOfLimit = (projectedMonthly / 100000) * 100; // 100k limit

    // Calculate trend (comparing first half vs second half of week)
    const midWeek = new Date(since.getTime() + 3.5 * 24 * 60 * 60 * 1000);
    const firstHalf = usageData.filter((record: any) => new Date(record.created_at) <= midWeek);
    const secondHalf = usageData.filter((record: any) => new Date(record.created_at) > midWeek);
    
    const firstHalfAvg = firstHalf.reduce((sum: number, record: any) => sum + record.invocations, 0) / Math.max(firstHalf.length, 1);
    const secondHalfAvg = secondHalf.reduce((sum: number, record: any) => sum + record.invocations, 0) / Math.max(secondHalf.length, 1);
    const weeklyTrend = ((secondHalfAvg - firstHalfAvg) / Math.max(firstHalfAvg, 1)) * 100;

    return {
      invocations: totalInvocations,
      computeHours: totalComputeHours,
      percentageOfLimit,
      dailyAverage,
      weeklyTrend,
      projectedMonthly
    };
  }

  private async getPerformanceMetrics(since: Date) {
    const { data: auditData } = await this.supabase
      .from('audit_history')
      .select('*')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false });

    if (!auditData || auditData.length === 0) {
      return {
        auditDuration: 0,
        linksProcessed: 0,
        averageResponseTime: 0,
        memoryUsage: 0,
        cpuUtilization: 0,
        cacheHitRate: 0,
        errorRate: 0
      };
    }

    const avgDuration = auditData.reduce((sum: number, record: any) => sum + (record.execution_time || 0), 0) / auditData.length;
    const totalLinks = auditData.reduce((sum: number, record: any) => sum + (record.total_links || 0), 0);
    const avgResponseTime = auditData.reduce((sum: number, record: any) => sum + (record.avg_response_time || 0), 0) / auditData.length;
    const avgMemory = auditData.reduce((sum: number, record: any) => sum + (record.memory_used || 0), 0) / auditData.length;
    const avgCpu = auditData.reduce((sum: number, record: any) => sum + (record.cpu_time || 0), 0) / auditData.length;
    const avgCacheHit = auditData.reduce((sum: number, record: any) => sum + (record.cache_hit_rate || 0), 0) / auditData.length;
    const errorRate = auditData.reduce((sum: number, record: any) => sum + (record.error_count || 0), 0) / Math.max(totalLinks, 1) * 100;

    return {
      auditDuration: avgDuration,
      linksProcessed: totalLinks,
      averageResponseTime: avgResponseTime,
      memoryUsage: avgMemory,
      cpuUtilization: avgCpu,
      cacheHitRate: avgCacheHit,
      errorRate
    };
  }

  private async getSystemHealthMetrics(since: Date) {
    const { data: healthData } = await this.supabase
      .from('system_health_logs')
      .select('*')
      .gte('created_at', since.toISOString());

    const { data: alertData } = await this.supabase
      .from('alert_history')
      .select('*')
      .gte('created_at', since.toISOString());

    const totalChecks = healthData?.length || 0;
    const successfulChecks = healthData?.filter((record: any) => record.status === 'healthy').length || 0;
    const availability = totalChecks > 0 ? (successfulChecks / totalChecks) * 100 : 100;
    
    const fallbackActivations = healthData?.filter((record: any) => record.fallback_active).length || 0;
    const alertsTriggered = alertData?.length || 0;
    const falsePositives = alertData?.filter((record: any) => record.false_positive).length || 0;
    const falsePositiveRate = alertsTriggered > 0 ? (falsePositives / alertsTriggered) * 100 : 0;

    return {
      uptime: availability,
      availability,
      fallbackActivations,
      alertsTriggered,
      falsePositiveRate
    };
  }

  private async getBusinessMetrics(since: Date) {
    const { data: auditResults } = await this.supabase
      .from('audit_history')
      .select('*')
      .gte('created_at', since.toISOString());

    const { data: corrections } = await this.supabase
      .from('auto_corrections')
      .select('*')
      .gte('created_at', since.toISOString());

    const { data: alerts } = await this.supabase
      .from('alert_history')
      .select('*')
      .gte('created_at', since.toISOString())
      .eq('priority', 'critical');

    const brokenLinksDetected = auditResults?.reduce((sum: number, record: any) => sum + (record.broken_links || 0), 0) || 0;
    const autoCorrections = corrections?.length || 0;
    const criticalAlertsCount = alerts?.length || 0;
    const avgReportTime = auditResults?.reduce((sum: number, record: any) => sum + (record.report_generation_time || 0), 0) / Math.max(auditResults?.length || 1, 1);

    return {
      brokenLinksDetected,
      autoCorrections,
      criticalAlertsCount,
      reportGenerationTime: avgReportTime,
      userSatisfactionScore: 85 // Placeholder - would come from user feedback
    };
  }

  /**
   * Analyze metrics and generate optimization recommendations
   */
  async generateOptimizationRecommendations(metrics: ProductionMetrics): Promise<OptimizationRecommendation[]> {
    const recommendations: OptimizationRecommendation[] = [];

    // Cache optimization recommendations
    if (metrics.performance.cacheHitRate < 70) {
      recommendations.push({
        category: 'cache',
        priority: 'high',
        title: 'Améliorer le taux de cache hit',
        description: `Le taux de cache hit actuel (${metrics.performance.cacheHitRate.toFixed(1)}%) est en dessous de l'objectif de 70%`,
        impact: 'Réduction de 20-30% du temps d\'exécution et des invocations Vercel',
        implementation: 'Augmenter les TTL de cache pour les liens stables, implémenter un cache prédictif',
        estimatedImprovement: '25% de réduction des coûts Vercel',
        riskLevel: 'low'
      });
    }

    // Batch size optimization
    if (metrics.performance.averageResponseTime > 5000) {
      recommendations.push({
        category: 'batch',
        priority: 'medium',
        title: 'Optimiser la taille des batches',
        description: `Temps de réponse moyen élevé (${(metrics.performance.averageResponseTime / 1000).toFixed(1)}s)`,
        impact: 'Amélioration des performances et réduction du timeout',
        implementation: 'Réduire la taille des batches de 10 à 8 liens, augmenter la concurrence à 4',
        estimatedImprovement: '15% d\'amélioration des performances',
        riskLevel: 'low'
      });
    }

    // Memory optimization
    if (metrics.performance.memoryUsage > 400) {
      recommendations.push({
        category: 'infrastructure',
        priority: 'high',
        title: 'Optimisation mémoire critique',
        description: `Usage mémoire élevé (${metrics.performance.memoryUsage}MB)`,
        impact: 'Risque de timeout et de dégradation des performances',
        implementation: 'Implémenter le streaming processing, forcer le garbage collection',
        estimatedImprovement: '30% de réduction de l\'usage mémoire',
        riskLevel: 'medium'
      });
    }

    // Alert optimization
    if (metrics.systemHealth.falsePositiveRate > 5) {
      recommendations.push({
        category: 'alerts',
        priority: 'medium',
        title: 'Réduire les faux positifs d\'alertes',
        description: `Taux de faux positifs élevé (${metrics.systemHealth.falsePositiveRate.toFixed(1)}%)`,
        impact: 'Amélioration de la confiance dans le système d\'alertes',
        implementation: 'Ajuster les seuils d\'alerte, implémenter une validation double',
        estimatedImprovement: 'Réduction à <3% de faux positifs',
        riskLevel: 'low'
      });
    }

    // Vercel usage optimization
    if (metrics.vercelUsage.percentageOfLimit > 80) {
      recommendations.push({
        category: 'upgrade',
        priority: 'critical',
        title: 'Upgrade Vercel Pro recommandé',
        description: `Usage Vercel à ${metrics.vercelUsage.percentageOfLimit.toFixed(1)}% des limites`,
        impact: 'Éviter les interruptions de service et débloquer plus de fonctionnalités',
        implementation: 'Migrer vers Vercel Pro, ajuster la configuration pour plus de cron jobs',
        estimatedImprovement: 'Capacité 10x supérieure, monitoring avancé',
        riskLevel: 'low'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * Generate comprehensive analysis report
   */
  async generateAnalysisReport(): Promise<AnalysisReport> {
    const metrics = await this.collectWeeklyMetrics();
    const recommendations = await this.generateOptimizationRecommendations(metrics);
    
    // Determine trends
    const trends = {
      usageTrend: metrics.vercelUsage.weeklyTrend > 10 ? 'increasing' as const : 
                  metrics.vercelUsage.weeklyTrend < -10 ? 'decreasing' as const : 'stable' as const,
      performanceTrend: metrics.performance.averageResponseTime < 3000 ? 'improving' as const :
                       metrics.performance.averageResponseTime > 8000 ? 'degrading' as const : 'stable' as const,
      errorTrend: metrics.performance.errorRate > 5 ? 'increasing' as const :
                  metrics.performance.errorRate < 1 ? 'decreasing' as const : 'stable' as const
    };

    // Upgrade recommendation
    const upgradeRecommendation = metrics.vercelUsage.percentageOfLimit > 80 ? {
      recommended: true,
      reason: `Usage actuel à ${metrics.vercelUsage.percentageOfLimit.toFixed(1)}% des limites avec tendance ${trends.usageTrend}`,
      roi: 'ROI positif estimé à 200% grâce aux fonctionnalités avancées et à la réduction des risques',
      timeline: 'Upgrade recommandé dans les 2 semaines pour éviter les interruptions'
    } : undefined;

    return {
      timestamp: new Date(),
      period: 'Dernière semaine',
      metrics,
      trends,
      recommendations,
      upgradeRecommendation
    };
  }

  /**
   * Apply optimization recommendations automatically
   */
  async applyOptimizations(recommendations: OptimizationRecommendation[]): Promise<void> {
    for (const rec of recommendations) {
      if (rec.riskLevel === 'low' && rec.priority !== 'critical') {
        try {
          await this.applyOptimization(rec);
          console.log(`Applied optimization: ${rec.title}`);
        } catch (error) {
          console.error(`Failed to apply optimization ${rec.title}:`, error);
        }
      }
    }
  }

  private async applyOptimization(recommendation: OptimizationRecommendation): Promise<void> {
    switch (recommendation.category) {
      case 'cache':
        await this.optimizeCache();
        break;
      case 'batch':
        await this.optimizeBatchSize();
        break;
      case 'alerts':
        await this.optimizeAlertThresholds();
        break;
      default:
        console.log(`Manual intervention required for: ${recommendation.title}`);
    }
  }

  private async optimizeCache(): Promise<void> {
    // Update cache TTL settings
    await this.supabase
      .from('system_config')
      .upsert({
        key: 'cache_ttl_links',
        value: '8h', // Increased from 6h
        updated_at: new Date().toISOString()
      });
  }

  private async optimizeBatchSize(): Promise<void> {
    // Update batch processing settings
    await this.supabase
      .from('system_config')
      .upsert({
        key: 'batch_size',
        value: '8', // Reduced from 10
        updated_at: new Date().toISOString()
      });

    await this.supabase
      .from('system_config')
      .upsert({
        key: 'max_concurrency',
        value: '4', // Increased from 3
        updated_at: new Date().toISOString()
      });
  }

  private async optimizeAlertThresholds(): Promise<void> {
    // Update alert thresholds to reduce false positives
    await this.supabase
      .from('system_config')
      .upsert({
        key: 'alert_threshold_error_rate',
        value: '7', // Increased from 5
        updated_at: new Date().toISOString()
      });
  }
}