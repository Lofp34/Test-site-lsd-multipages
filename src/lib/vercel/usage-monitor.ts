import { 
  UsageMetrics, 
  UsagePrediction, 
  LimitStatus, 
  VercelUsageResponse,
  MonitoringConfig,
  UsageRecommendation,
  AlertThreshold
} from './types';
import { getMonitoringConfig, VERCEL_API_ENDPOINTS, SAFE_USAGE_TARGETS } from './config';

/**
 * VercelUsageMonitor - Monitors Vercel resource usage and provides alerts
 */
export class VercelUsageMonitor {
  private config: MonitoringConfig;
  private lastUsageCheck: Date | null = null;
  private usageHistory: UsageMetrics[] = [];

  constructor(config?: MonitoringConfig) {
    this.config = config || getMonitoringConfig();
  }

  /**
   * Get current usage metrics from Vercel API
   */
  async getCurrentUsage(): Promise<UsageMetrics> {
    try {
      const response = await this.fetchVercelUsage();
      const metrics = this.parseUsageResponse(response);
      
      // Store in history for trend analysis
      this.usageHistory.push(metrics);
      
      // Keep only last 100 measurements
      if (this.usageHistory.length > 100) {
        this.usageHistory = this.usageHistory.slice(-100);
      }
      
      this.lastUsageCheck = new Date();
      return metrics;
    } catch (error) {
      console.error('Failed to fetch Vercel usage:', error);
      throw new Error(`Unable to retrieve usage metrics: ${error.message}`);
    }
  }

  /**
   * Predict monthly usage based on current trends
   */
  async predictMonthlyUsage(): Promise<UsagePrediction> {
    const currentUsage = await this.getCurrentUsage();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const daysInMonth = endOfMonth.getDate();
    const daysPassed = now.getDate();
    const daysRemaining = daysInMonth - daysPassed;
    
    // Calculate daily averages
    const dailyInvocations = currentUsage.functionInvocations / daysPassed;
    const dailyComputeHours = currentUsage.computeHours / daysPassed;
    
    // Project to end of month
    const predictedInvocations = dailyInvocations * daysInMonth;
    const predictedComputeHours = dailyComputeHours * daysInMonth;
    
    // Calculate confidence based on data points available
    const confidence = Math.min(this.usageHistory.length / 30, 1); // More data = higher confidence
    
    // Determine risk level
    const invocationRisk = predictedInvocations / this.config.plan.invocationLimit;
    const computeRisk = predictedComputeHours / this.config.plan.computeHoursLimit;
    const maxRisk = Math.max(invocationRisk, computeRisk);
    
    let riskLevel: 'low' | 'medium' | 'high' | 'critical';
    if (maxRisk < 0.7) riskLevel = 'low';
    else if (maxRisk < 0.8) riskLevel = 'medium';
    else if (maxRisk < 0.95) riskLevel = 'high';
    else riskLevel = 'critical';
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(
      predictedInvocations,
      predictedComputeHours,
      riskLevel
    );
    
    return {
      predictedInvocations,
      predictedComputeHours,
      confidence,
      daysRemaining,
      recommendations,
      riskLevel,
    };
  }

  /**
   * Check if usage limits are being approached
   */
  async checkLimits(): Promise<LimitStatus[]> {
    const currentUsage = await this.getCurrentUsage();
    const statuses: LimitStatus[] = [];
    
    // Check invocation limits
    for (const threshold of this.config.alertThresholds) {
      const invocationUsage = (currentUsage.functionInvocations / this.config.plan.invocationLimit) * 100;
      statuses.push({
        currentUsage: invocationUsage,
        threshold: threshold.percentage,
        exceeded: invocationUsage >= threshold.percentage,
        resetTime: this.getNextResetTime(),
        limitType: 'invocations',
      });
      
      const computeUsage = (currentUsage.computeHours / this.config.plan.computeHoursLimit) * 100;
      statuses.push({
        currentUsage: computeUsage,
        threshold: threshold.percentage,
        exceeded: computeUsage >= threshold.percentage,
        resetTime: this.getNextResetTime(),
        limitType: 'compute_hours',
      });
    }
    
    return statuses;
  }

  /**
   * Send usage alert if thresholds are exceeded
   */
  async sendUsageAlert(threshold: number): Promise<void> {
    const currentUsage = await this.getCurrentUsage();
    const prediction = await this.predictMonthlyUsage();
    
    // Check if we should send alert (considering cooldown)
    const alertThreshold = this.config.alertThresholds.find(t => t.percentage === threshold);
    if (!alertThreshold?.enabled) return;
    
    if (alertThreshold.lastAlertSent) {
      const timeSinceLastAlert = Date.now() - alertThreshold.lastAlertSent.getTime();
      const cooldownMs = alertThreshold.cooldownMinutes * 60 * 1000;
      if (timeSinceLastAlert < cooldownMs) return;
    }
    
    // Prepare alert data
    const alertData = {
      threshold,
      currentUsage,
      prediction,
      timestamp: new Date(),
      severity: prediction.riskLevel,
    };
    
    // Send alert (integrate with existing alert system)
    await this.sendAlert(alertData);
    
    // Update last alert sent time
    alertThreshold.lastAlertSent = new Date();
  }

  /**
   * Get usage trend analysis
   */
  getUsageTrend(): {
    trend: 'increasing' | 'decreasing' | 'stable';
    changeRate: number;
    confidence: number;
  } {
    if (this.usageHistory.length < 5) {
      return { trend: 'stable', changeRate: 0, confidence: 0 };
    }
    
    const recent = this.usageHistory.slice(-5);
    const older = this.usageHistory.slice(-10, -5);
    
    if (older.length === 0) {
      return { trend: 'stable', changeRate: 0, confidence: 0.5 };
    }
    
    const recentAvg = recent.reduce((sum, m) => sum + m.functionInvocations, 0) / recent.length;
    const olderAvg = older.reduce((sum, m) => sum + m.functionInvocations, 0) / older.length;
    
    const changeRate = ((recentAvg - olderAvg) / olderAvg) * 100;
    const confidence = Math.min(this.usageHistory.length / 20, 1);
    
    let trend: 'increasing' | 'decreasing' | 'stable';
    if (Math.abs(changeRate) < 5) trend = 'stable';
    else if (changeRate > 0) trend = 'increasing';
    else trend = 'decreasing';
    
    return { trend, changeRate, confidence };
  }

  /**
   * Private method to fetch usage from Vercel API
   */
  private async fetchVercelUsage(): Promise<VercelUsageResponse> {
    const url = VERCEL_API_ENDPOINTS.usage(this.config.teamId);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Parse Vercel API response into our metrics format
   */
  private parseUsageResponse(response: VercelUsageResponse): UsageMetrics {
    const invocations = response.usage.invocations || 0;
    const computeHours = response.usage.computeHours || 0;
    
    const invocationPercentage = (invocations / this.config.plan.invocationLimit) * 100;
    const computePercentage = (computeHours / this.config.plan.computeHoursLimit) * 100;
    const percentageOfLimit = Math.max(invocationPercentage, computePercentage);
    
    // Simple projection based on current day of month
    const now = new Date();
    const dayOfMonth = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const projectedMonthly = (invocations / dayOfMonth) * daysInMonth;
    
    return {
      functionInvocations: invocations,
      computeHours: computeHours,
      percentageOfLimit,
      projectedMonthly,
      timestamp: new Date(),
    };
  }

  /**
   * Generate usage recommendations based on predictions
   */
  private generateRecommendations(
    predictedInvocations: number,
    predictedComputeHours: number,
    riskLevel: string
  ): UsageRecommendation[] {
    const recommendations: UsageRecommendation[] = [];
    
    // Check invocation limits
    if (predictedInvocations > SAFE_USAGE_TARGETS.invocations) {
      recommendations.push({
        type: 'optimize',
        message: `Predicted invocations (${Math.round(predictedInvocations)}) exceed safe target. Consider optimizing function calls.`,
        priority: riskLevel === 'critical' ? 'critical' : 'high',
        action: 'Implement caching and reduce unnecessary API calls',
      });
    }
    
    // Check compute hours
    if (predictedComputeHours > SAFE_USAGE_TARGETS.computeHours) {
      recommendations.push({
        type: 'optimize',
        message: `Predicted compute hours (${predictedComputeHours.toFixed(1)}) exceed safe target. Optimize function performance.`,
        priority: riskLevel === 'critical' ? 'critical' : 'high',
        action: 'Reduce function execution time and memory usage',
      });
    }
    
    // Upgrade recommendation for critical usage
    if (riskLevel === 'critical') {
      recommendations.push({
        type: 'upgrade',
        message: 'Consider upgrading to Vercel Pro plan to avoid service interruption.',
        priority: 'critical',
        action: 'Evaluate ROI of upgrading to Pro plan',
      });
    }
    
    // Fallback recommendation
    if (riskLevel === 'high' || riskLevel === 'critical') {
      recommendations.push({
        type: 'fallback',
        message: 'Activate GitHub Actions fallback system to ensure service continuity.',
        priority: 'high',
        action: 'Test and prepare fallback mechanisms',
      });
    }
    
    return recommendations;
  }

  /**
   * Get next billing period reset time
   */
  private getNextResetTime(): Date {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth;
  }

  /**
   * Send alert through existing alert system
   */
  private async sendAlert(alertData: any): Promise<void> {
    // This would integrate with the existing AlertManager
    // For now, we'll log the alert
    console.warn('Vercel Usage Alert:', {
      threshold: alertData.threshold,
      currentInvocations: alertData.currentUsage.functionInvocations,
      currentComputeHours: alertData.currentUsage.computeHours,
      riskLevel: alertData.severity,
      recommendations: alertData.prediction.recommendations,
    });
    
    // TODO: Integrate with existing AlertManager from src/lib/audit/alert-manager.ts
    // await alertManager.sendAlert({
    //   type: 'vercel_usage',
    //   severity: alertData.severity,
    //   message: `Vercel usage at ${alertData.threshold}% threshold`,
    //   data: alertData,
    // });
  }
}