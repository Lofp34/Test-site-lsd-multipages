/**
 * Business Analytics Module for Weekly Maintenance
 * 
 * Provides comprehensive business analytics and metrics calculation
 * optimized for the weekly maintenance cron job with:
 * - Link health statistics and trends
 * - Resource request analytics
 * - Performance optimization recommendations
 * - Business intelligence insights
 * - Predictive analytics for system health
 */

import { createClient } from '@supabase/supabase-js';
import { VercelUsageMonitor } from '@/lib/vercel/usage-monitor';

export interface BusinessMetrics {
  linkHealth: LinkHealthMetrics;
  resourceRequests: ResourceRequestMetrics;
  systemPerformance: SystemPerformanceMetrics;
  businessInsights: BusinessInsights;
  recommendations: OptimizationRecommendation[];
  trends: TrendAnalysis;
}

export interface LinkHealthMetrics {
  totalLinks: number;
  brokenLinks: number;
  validLinks: number;
  healthScore: number;
  criticalIssues: number;
  weeklyChange: number;
  topBrokenDomains: Array<{ domain: string; count: number }>;
  linkTypeDistribution: Record<string, number>;
}

export interface ResourceRequestMetrics {
  totalRequests: number;
  fulfilledRequests: number;
  pendingRequests: number;
  fulfillmentRate: number;
  averageResponseTime: number;
  topRequestedResources: Array<{ url: string; count: number; priority: string }>;
  requestsByCategory: Record<string, number>;
}

export interface SystemPerformanceMetrics {
  averageAuditTime: number;
  successRate: number;
  errorRate: number;
  memoryUsage: number;
  cacheHitRate: number;
  vercelUsageEfficiency: number;
  uptime: number;
}

export interface BusinessInsights {
  userEngagement: {
    mostAccessedPages: Array<{ page: string; brokenLinks: number; impact: string }>;
    conversionImpact: number;
    seoImpactScore: number;
  };
  operationalEfficiency: {
    automationRate: number;
    manualInterventionNeeded: number;
    costSavings: number;
  };
  riskAssessment: {
    criticalRiskLevel: 'low' | 'medium' | 'high' | 'critical';
    businessContinuityScore: number;
    complianceStatus: string;
  };
}

export interface OptimizationRecommendation {
  type: 'performance' | 'cost' | 'reliability' | 'user_experience';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  expectedImpact: string;
  implementationEffort: 'low' | 'medium' | 'high';
  estimatedROI: number;
}

export interface TrendAnalysis {
  linkHealthTrend: 'improving' | 'stable' | 'declining';
  resourceDemandTrend: 'increasing' | 'stable' | 'decreasing';
  systemEfficiencyTrend: 'improving' | 'stable' | 'declining';
  vercelUsageTrend: 'increasing' | 'stable' | 'decreasing';
  predictions: {
    nextWeekHealthScore: number;
    nextMonthVercelUsage: number;
    recommendedActions: string[];
  };
}

export class BusinessAnalytics {
  private supabase;
  private usageMonitor: VercelUsageMonitor;

  constructor(usageMonitor: VercelUsageMonitor) {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    this.usageMonitor = usageMonitor;
  }

  /**
   * Calculate comprehensive business metrics for the week
   */
  async calculateWeeklyMetrics(): Promise<BusinessMetrics> {
    console.log('📊 Calculating weekly business metrics...');

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    // Calculate all metrics in parallel for efficiency
    const [
      linkHealth,
      resourceRequests,
      systemPerformance,
      businessInsights,
      trends
    ] = await Promise.all([
      this.calculateLinkHealthMetrics(weekAgo, twoWeeksAgo),
      this.calculateResourceRequestMetrics(weekAgo),
      this.calculateSystemPerformanceMetrics(weekAgo),
      this.calculateBusinessInsights(weekAgo),
      this.calculateTrendAnalysis(weekAgo)
    ]);

    // Generate optimization recommendations based on all metrics
    const recommendations = this.generateOptimizationRecommendations({
      linkHealth,
      resourceRequests,
      systemPerformance,
      businessInsights,
      trends
    });

    return {
      linkHealth,
      resourceRequests,
      systemPerformance,
      businessInsights,
      recommendations,
      trends
    };
  }

  /**
   * Calculate link health metrics and statistics
   */
  private async calculateLinkHealthMetrics(
    weekAgo: Date,
    twoWeeksAgo: Date
  ): Promise<LinkHealthMetrics> {
    // Get current week's validation results
    const { data: currentWeekResults } = await this.supabase
      .from('validation_results')
      .select('url, status, error')
      .gte('checked_at', weekAgo.toISOString());

    // Get previous week's results for comparison
    const { data: previousWeekResults } = await this.supabase
      .from('validation_results')
      .select('url, status')
      .gte('checked_at', twoWeeksAgo.toISOString())
      .lt('checked_at', weekAgo.toISOString());

    // Get scanned links for link type distribution
    const { data: scannedLinks } = await this.supabase
      .from('scanned_links')
      .select('url, link_type')
      .gte('scanned_at', weekAgo.toISOString());

    const currentResults = currentWeekResults || [];
    const previousResults = previousWeekResults || [];
    const linkTypes = scannedLinks || [];

    // Calculate basic metrics
    const totalLinks = new Set(currentResults.map(r => r.url)).size;
    const brokenLinks = currentResults.filter(r => r.status === 'broken').length;
    const validLinks = currentResults.filter(r => r.status === 'valid').length;
    const healthScore = totalLinks > 0 ? Math.round((validLinks / totalLinks) * 100) : 100;

    // Calculate weekly change
    const previousHealthScore = previousResults.length > 0 
      ? Math.round((previousResults.filter(r => r.status === 'valid').length / previousResults.length) * 100)
      : healthScore;
    const weeklyChange = healthScore - previousHealthScore;

    // Analyze broken links by domain
    const brokenByDomain = new Map<string, number>();
    currentResults
      .filter(r => r.status === 'broken')
      .forEach(result => {
        try {
          const domain = new URL(result.url).hostname;
          brokenByDomain.set(domain, (brokenByDomain.get(domain) || 0) + 1);
        } catch {
          brokenByDomain.set('invalid-url', (brokenByDomain.get('invalid-url') || 0) + 1);
        }
      });

    const topBrokenDomains = Array.from(brokenByDomain.entries())
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate link type distribution
    const linkTypeDistribution: Record<string, number> = {};
    linkTypes.forEach(link => {
      const type = link.link_type || 'unknown';
      linkTypeDistribution[type] = (linkTypeDistribution[type] || 0) + 1;
    });

    // Count critical issues (broken internal links, CTAs, etc.)
    const criticalIssues = currentResults.filter(r => 
      r.status === 'broken' && 
      (r.url.includes(process.env.NEXT_PUBLIC_SITE_URL || '') || 
       r.error?.includes('404') ||
       r.url.includes('/contact') ||
       r.url.includes('/ressources'))
    ).length;

    return {
      totalLinks,
      brokenLinks,
      validLinks,
      healthScore,
      criticalIssues,
      weeklyChange,
      topBrokenDomains,
      linkTypeDistribution
    };
  }

  /**
   * Calculate resource request metrics
   */
  private async calculateResourceRequestMetrics(weekAgo: Date): Promise<ResourceRequestMetrics> {
    const { data: requests } = await this.supabase
      .from('resource_requests')
      .select('*')
      .gte('created_at', weekAgo.toISOString());

    if (!requests || requests.length === 0) {
      return {
        totalRequests: 0,
        fulfilledRequests: 0,
        pendingRequests: 0,
        fulfillmentRate: 100,
        averageResponseTime: 0,
        topRequestedResources: [],
        requestsByCategory: {}
      };
    }

    const totalRequests = requests.reduce((sum, r) => sum + r.request_count, 0);
    const fulfilledRequests = requests.filter(r => r.status === 'fulfilled').length;
    const pendingRequests = requests.filter(r => r.status === 'pending').length;
    const fulfillmentRate = requests.length > 0 ? (fulfilledRequests / requests.length) * 100 : 100;

    // Calculate average response time for fulfilled requests
    const fulfilledWithTime = requests.filter(r => 
      r.status === 'fulfilled' && r.fulfilled_at && r.created_at
    );
    const averageResponseTime = fulfilledWithTime.length > 0
      ? fulfilledWithTime.reduce((sum, r) => {
          const responseTime = new Date(r.fulfilled_at).getTime() - new Date(r.created_at).getTime();
          return sum + responseTime;
        }, 0) / fulfilledWithTime.length / (1000 * 60 * 60) // Convert to hours
      : 0;

    // Top requested resources
    const topRequestedResources = requests
      .sort((a, b) => b.request_count - a.request_count)
      .slice(0, 10)
      .map(r => ({
        url: r.requested_url,
        count: r.request_count,
        priority: r.priority || 'medium'
      }));

    // Categorize requests by URL pattern
    const requestsByCategory: Record<string, number> = {};
    requests.forEach(request => {
      let category = 'other';
      const url = request.requested_url.toLowerCase();
      
      if (url.includes('/guide') || url.includes('/formation')) {
        category = 'formation';
      } else if (url.includes('/outil') || url.includes('/template')) {
        category = 'outils';
      } else if (url.includes('/ressource') || url.includes('/download')) {
        category = 'ressources';
      } else if (url.includes('/blog') || url.includes('/article')) {
        category = 'contenu';
      }
      
      requestsByCategory[category] = (requestsByCategory[category] || 0) + request.request_count;
    });

    return {
      totalRequests,
      fulfilledRequests,
      pendingRequests,
      fulfillmentRate,
      averageResponseTime,
      topRequestedResources,
      requestsByCategory
    };
  }

  /**
   * Calculate system performance metrics
   */
  private async calculateSystemPerformanceMetrics(weekAgo: Date): Promise<SystemPerformanceMetrics> {
    // Get audit execution data
    const { data: auditHistory } = await this.supabase
      .from('audit_history')
      .select('execution_time, total_links, broken_links')
      .gte('created_at', weekAgo.toISOString());

    // Get task execution logs
    const { data: taskLogs } = await this.supabase
      .from('task_execution_log')
      .select('execution_time, success')
      .gte('started_at', weekAgo.toISOString());

    // Calculate averages
    const averageAuditTime = auditHistory && auditHistory.length > 0
      ? auditHistory.reduce((sum, h) => sum + (h.execution_time || 0), 0) / auditHistory.length
      : 0;

    const successRate = taskLogs && taskLogs.length > 0
      ? (taskLogs.filter(log => log.success).length / taskLogs.length) * 100
      : 100;

    const errorRate = 100 - successRate;

    // Get current system metrics
    let vercelUsageEfficiency = 0;
    let cacheHitRate = 0;
    
    try {
      const currentUsage = await this.usageMonitor.getCurrentUsage();
      vercelUsageEfficiency = Math.max(0, 100 - currentUsage.percentageOfLimit);
      
      // Cache hit rate would come from cache strategy if available
      cacheHitRate = 75; // Placeholder - would be calculated from actual cache stats
    } catch (error) {
      console.warn('Could not fetch Vercel usage for performance metrics:', error);
    }

    return {
      averageAuditTime,
      successRate,
      errorRate,
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
      cacheHitRate,
      vercelUsageEfficiency,
      uptime: 99.5 // Placeholder - would be calculated from actual uptime monitoring
    };
  }

  /**
   * Calculate business insights
   */
  private async calculateBusinessInsights(weekAgo: Date): Promise<BusinessInsights> {
    // Get broken links by page to assess user impact
    const { data: brokenLinksByPage } = await this.supabase
      .from('scanned_links')
      .select('source_file, url')
      .gte('scanned_at', weekAgo.toISOString());

    const { data: brokenValidations } = await this.supabase
      .from('validation_results')
      .select('url')
      .eq('status', 'broken')
      .gte('checked_at', weekAgo.toISOString());

    const brokenUrls = new Set(brokenValidations?.map(v => v.url) || []);
    
    // Analyze most affected pages
    const pageImpact = new Map<string, number>();
    brokenLinksByPage?.forEach(link => {
      if (brokenUrls.has(link.url)) {
        const page = link.source_file || 'unknown';
        pageImpact.set(page, (pageImpact.get(page) || 0) + 1);
      }
    });

    const mostAccessedPages = Array.from(pageImpact.entries())
      .map(([page, brokenLinks]) => ({
        page,
        brokenLinks,
        impact: brokenLinks > 5 ? 'high' : brokenLinks > 2 ? 'medium' : 'low'
      }))
      .sort((a, b) => b.brokenLinks - a.brokenLinks)
      .slice(0, 10);

    // Calculate automation metrics
    const { data: corrections } = await this.supabase
      .from('correction_results')
      .select('applied')
      .gte('applied_at', weekAgo.toISOString());

    const totalIssues = brokenUrls.size;
    const automatedFixes = corrections?.filter(c => c.applied).length || 0;
    const automationRate = totalIssues > 0 ? (automatedFixes / totalIssues) * 100 : 0;

    // Risk assessment
    const criticalRiskLevel = totalIssues > 20 ? 'critical' : 
                             totalIssues > 10 ? 'high' : 
                             totalIssues > 5 ? 'medium' : 'low';

    return {
      userEngagement: {
        mostAccessedPages,
        conversionImpact: Math.min(totalIssues * 2, 25), // Estimated % impact
        seoImpactScore: Math.max(0, 100 - totalIssues * 3)
      },
      operationalEfficiency: {
        automationRate,
        manualInterventionNeeded: totalIssues - automatedFixes,
        costSavings: automatedFixes * 15 // Estimated $15 per automated fix
      },
      riskAssessment: {
        criticalRiskLevel,
        businessContinuityScore: Math.max(0, 100 - totalIssues * 2),
        complianceStatus: totalIssues < 5 ? 'compliant' : 'needs-attention'
      }
    };
  }

  /**
   * Calculate trend analysis
   */
  private async calculateTrendAnalysis(weekAgo: Date): Promise<TrendAnalysis> {
    // Get historical data for trend analysis
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const { data: historicalData } = await this.supabase
      .from('audit_history')
      .select('created_at, broken_links, seo_score')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: true });

    if (!historicalData || historicalData.length < 2) {
      return {
        linkHealthTrend: 'stable',
        resourceDemandTrend: 'stable',
        systemEfficiencyTrend: 'stable',
        vercelUsageTrend: 'stable',
        predictions: {
          nextWeekHealthScore: 85,
          nextMonthVercelUsage: 50,
          recommendedActions: ['Insufficient historical data for predictions']
        }
      };
    }

    // Calculate trends
    const first = historicalData[0];
    const last = historicalData[historicalData.length - 1];
    
    const linkHealthTrend = last.seo_score > first.seo_score + 5 ? 'improving' :
                           last.seo_score < first.seo_score - 5 ? 'declining' : 'stable';

    // Get resource request trends
    const { data: resourceTrends } = await this.supabase
      .from('resource_requests')
      .select('created_at, request_count')
      .gte('created_at', thirtyDaysAgo.toISOString());

    const totalRecentRequests = resourceTrends?.reduce((sum, r) => sum + r.request_count, 0) || 0;
    const resourceDemandTrend = totalRecentRequests > 100 ? 'increasing' : 
                               totalRecentRequests < 20 ? 'decreasing' : 'stable';

    // System efficiency trend (based on error rates)
    const recentErrors = historicalData.slice(-7).reduce((sum, h) => sum + h.broken_links, 0);
    const olderErrors = historicalData.slice(0, 7).reduce((sum, h) => sum + h.broken_links, 0);
    const systemEfficiencyTrend = recentErrors < olderErrors ? 'improving' :
                                 recentErrors > olderErrors ? 'declining' : 'stable';

    // Vercel usage trend
    let vercelUsageTrend: 'increasing' | 'stable' | 'decreasing' = 'stable';
    try {
      const usageTrend = this.usageMonitor.getUsageTrend();
      vercelUsageTrend = usageTrend.trend === 'increasing' ? 'increasing' :
                        usageTrend.trend === 'decreasing' ? 'decreasing' : 'stable';
    } catch (error) {
      console.warn('Could not get Vercel usage trend:', error);
    }

    // Generate predictions
    const nextWeekHealthScore = Math.max(0, Math.min(100, 
      last.seo_score + (linkHealthTrend === 'improving' ? 5 : linkHealthTrend === 'declining' ? -5 : 0)
    ));

    const currentUsage = await this.usageMonitor.getCurrentUsage().catch(() => ({ percentageOfLimit: 50 }));
    const nextMonthVercelUsage = Math.max(0, Math.min(100,
      currentUsage.percentageOfLimit + (vercelUsageTrend === 'increasing' ? 10 : vercelUsageTrend === 'decreasing' ? -5 : 0)
    ));

    const recommendedActions = this.generateTrendBasedRecommendations({
      linkHealthTrend,
      resourceDemandTrend,
      systemEfficiencyTrend,
      vercelUsageTrend
    });

    return {
      linkHealthTrend,
      resourceDemandTrend,
      systemEfficiencyTrend,
      vercelUsageTrend,
      predictions: {
        nextWeekHealthScore,
        nextMonthVercelUsage,
        recommendedActions
      }
    };
  }

  /**
   * Generate optimization recommendations based on all metrics
   */
  private generateOptimizationRecommendations(metrics: Partial<BusinessMetrics>): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];

    // Link health recommendations
    if (metrics.linkHealth) {
      if (metrics.linkHealth.healthScore < 80) {
        recommendations.push({
          type: 'reliability',
          priority: 'high',
          title: 'Improve Link Health Score',
          description: `Current health score is ${metrics.linkHealth.healthScore}%. Focus on fixing ${metrics.linkHealth.brokenLinks} broken links.`,
          expectedImpact: 'Improved SEO ranking and user experience',
          implementationEffort: 'medium',
          estimatedROI: 85
        });
      }

      if (metrics.linkHealth.criticalIssues > 0) {
        recommendations.push({
          type: 'user_experience',
          priority: 'critical',
          title: 'Fix Critical Link Issues',
          description: `${metrics.linkHealth.criticalIssues} critical links are broken, affecting core functionality.`,
          expectedImpact: 'Prevent user frustration and conversion loss',
          implementationEffort: 'high',
          estimatedROI: 150
        });
      }
    }

    // Resource request recommendations
    if (metrics.resourceRequests) {
      if (metrics.resourceRequests.fulfillmentRate < 80) {
        recommendations.push({
          type: 'user_experience',
          priority: 'medium',
          title: 'Improve Resource Fulfillment Rate',
          description: `Only ${metrics.resourceRequests.fulfillmentRate.toFixed(1)}% of resource requests are fulfilled.`,
          expectedImpact: 'Better user satisfaction and engagement',
          implementationEffort: 'medium',
          estimatedROI: 65
        });
      }

      if (metrics.resourceRequests.topRequestedResources.length > 0) {
        const topResource = metrics.resourceRequests.topRequestedResources[0];
        recommendations.push({
          type: 'user_experience',
          priority: 'high',
          title: 'Create High-Demand Resource',
          description: `"${topResource.url}" has been requested ${topResource.count} times.`,
          expectedImpact: 'Satisfy user demand and improve engagement',
          implementationEffort: 'low',
          estimatedROI: 120
        });
      }
    }

    // System performance recommendations
    if (metrics.systemPerformance) {
      if (metrics.systemPerformance.vercelUsageEfficiency < 70) {
        recommendations.push({
          type: 'cost',
          priority: 'medium',
          title: 'Optimize Vercel Usage',
          description: 'Vercel usage efficiency is below optimal levels.',
          expectedImpact: 'Reduced hosting costs and better performance',
          implementationEffort: 'medium',
          estimatedROI: 90
        });
      }

      if (metrics.systemPerformance.cacheHitRate < 70) {
        recommendations.push({
          type: 'performance',
          priority: 'medium',
          title: 'Improve Cache Strategy',
          description: `Cache hit rate is ${metrics.systemPerformance.cacheHitRate}%. Optimize caching for better performance.`,
          expectedImpact: 'Faster response times and reduced server load',
          implementationEffort: 'low',
          estimatedROI: 75
        });
      }
    }

    // Business insights recommendations
    if (metrics.businessInsights) {
      if (metrics.businessInsights.operationalEfficiency.automationRate < 50) {
        recommendations.push({
          type: 'cost',
          priority: 'medium',
          title: 'Increase Automation Rate',
          description: `Only ${metrics.businessInsights.operationalEfficiency.automationRate.toFixed(1)}% of issues are automatically resolved.`,
          expectedImpact: 'Reduced manual work and operational costs',
          implementationEffort: 'high',
          estimatedROI: 200
        });
      }
    }

    // Sort by priority and ROI
    return recommendations.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      return priorityDiff !== 0 ? priorityDiff : b.estimatedROI - a.estimatedROI;
    });
  }

  /**
   * Generate trend-based recommendations
   */
  private generateTrendBasedRecommendations(trends: {
    linkHealthTrend: string;
    resourceDemandTrend: string;
    systemEfficiencyTrend: string;
    vercelUsageTrend: string;
  }): string[] {
    const actions: string[] = [];

    if (trends.linkHealthTrend === 'declining') {
      actions.push('Investigate root causes of increasing link failures');
      actions.push('Implement more aggressive monitoring and alerting');
    }

    if (trends.resourceDemandTrend === 'increasing') {
      actions.push('Scale up resource creation to meet growing demand');
      actions.push('Analyze user behavior to predict future resource needs');
    }

    if (trends.systemEfficiencyTrend === 'declining') {
      actions.push('Review and optimize system performance bottlenecks');
      actions.push('Consider infrastructure upgrades or optimizations');
    }

    if (trends.vercelUsageTrend === 'increasing') {
      actions.push('Monitor Vercel usage closely to avoid limit overruns');
      actions.push('Implement additional caching and optimization measures');
    }

    if (actions.length === 0) {
      actions.push('Continue monitoring current stable trends');
      actions.push('Focus on proactive maintenance and optimization');
    }

    return actions;
  }

  /**
   * Store analytics results for historical tracking
   */
  async storeAnalyticsResults(metrics: BusinessMetrics): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('weekly_analytics')
        .insert({
          week_start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          total_links: metrics.linkHealth.totalLinks,
          broken_links: metrics.linkHealth.brokenLinks,
          health_score: metrics.linkHealth.healthScore,
          resource_requests: metrics.resourceRequests.totalRequests,
          fulfillment_rate: metrics.resourceRequests.fulfillmentRate,
          system_efficiency: metrics.systemPerformance.successRate,
          vercel_usage_efficiency: metrics.systemPerformance.vercelUsageEfficiency,
          recommendations_count: metrics.recommendations.length,
          critical_issues: metrics.linkHealth.criticalIssues,
          automation_rate: metrics.businessInsights.operationalEfficiency.automationRate,
          business_continuity_score: metrics.businessInsights.riskAssessment.businessContinuityScore,
          metadata: {
            trends: metrics.trends,
            topRecommendations: metrics.recommendations.slice(0, 5)
          }
        });

      if (error) {
        console.error('Failed to store analytics results:', error);
      } else {
        console.log('✅ Analytics results stored successfully');
      }
    } catch (error) {
      console.error('Error storing analytics results:', error);
    }
  }
}