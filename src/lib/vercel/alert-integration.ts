import { UsageMetrics, UsagePrediction, LimitStatus } from './types';

/**
 * Integration with existing alert system for Vercel usage monitoring
 */
export class VercelAlertIntegration {
  
  /**
   * Send usage threshold alert
   */
  async sendUsageThresholdAlert(
    threshold: number,
    currentUsage: UsageMetrics,
    prediction: UsagePrediction
  ): Promise<void> {
    const alertData = {
      type: 'vercel_usage_threshold',
      severity: this.mapRiskLevelToSeverity(prediction.riskLevel),
      title: `Vercel Usage Alert - ${threshold}% Threshold Reached`,
      message: this.buildThresholdAlertMessage(threshold, currentUsage, prediction),
      data: {
        threshold,
        currentUsage,
        prediction,
        timestamp: new Date().toISOString(),
      },
      actions: this.getRecommendedActions(prediction),
    };

    // Send email alert
    await this.sendEmailAlert(alertData);
    
    // Log to monitoring system
    await this.logAlert(alertData);
  }

  /**
   * Send critical usage alert
   */
  async sendCriticalUsageAlert(
    currentUsage: UsageMetrics,
    prediction: UsagePrediction
  ): Promise<void> {
    const alertData = {
      type: 'vercel_usage_critical',
      severity: 'critical' as const,
      title: 'CRITICAL: Vercel Usage Approaching Limits',
      message: this.buildCriticalAlertMessage(currentUsage, prediction),
      data: {
        currentUsage,
        prediction,
        timestamp: new Date().toISOString(),
      },
      actions: [
        'Activate GitHub Actions fallback immediately',
        'Consider upgrading to Vercel Pro plan',
        'Optimize function performance urgently',
      ],
    };

    // Send immediate email alert
    await this.sendEmailAlert(alertData);
    
    // Send to monitoring dashboard
    await this.logAlert(alertData);
    
    // Trigger fallback preparation if configured
    await this.triggerFallbackPreparation();
  }

  /**
   * Send daily usage summary
   */
  async sendDailyUsageSummary(
    currentUsage: UsageMetrics,
    prediction: UsagePrediction,
    trend: { trend: string; changeRate: number; confidence: number }
  ): Promise<void> {
    const alertData = {
      type: 'vercel_usage_summary',
      severity: 'info' as const,
      title: 'Daily Vercel Usage Summary',
      message: this.buildDailySummaryMessage(currentUsage, prediction, trend),
      data: {
        currentUsage,
        prediction,
        trend,
        timestamp: new Date().toISOString(),
      },
    };

    await this.sendEmailAlert(alertData);
    await this.logAlert(alertData);
  }

  /**
   * Build threshold alert message
   */
  private buildThresholdAlertMessage(
    threshold: number,
    currentUsage: UsageMetrics,
    prediction: UsagePrediction
  ): string {
    const invocationPercent = (currentUsage.functionInvocations / 100000) * 100;
    const computePercent = (currentUsage.computeHours / 100) * 100;
    
    return `
🚨 Vercel Usage Alert - ${threshold}% Threshold Reached

Current Usage:
• Function Invocations: ${currentUsage.functionInvocations.toLocaleString()} (${invocationPercent.toFixed(1)}%)
• Compute Hours: ${currentUsage.computeHours.toFixed(2)} GB-hours (${computePercent.toFixed(1)}%)

Monthly Projection:
• Predicted Invocations: ${prediction.predictedInvocations.toLocaleString()}
• Predicted Compute Hours: ${prediction.predictedComputeHours.toFixed(2)} GB-hours
• Risk Level: ${prediction.riskLevel.toUpperCase()}
• Days Remaining: ${prediction.daysRemaining}

Recommendations:
${prediction.recommendations.map(r => `• ${r.message}`).join('\n')}

Please take action to optimize usage and avoid service interruption.
    `.trim();
  }

  /**
   * Build critical alert message
   */
  private buildCriticalAlertMessage(
    currentUsage: UsageMetrics,
    prediction: UsagePrediction
  ): string {
    return `
🔥 CRITICAL ALERT: Vercel Usage Approaching Limits

Current Status:
• Function Invocations: ${currentUsage.functionInvocations.toLocaleString()}
• Compute Hours: ${currentUsage.computeHours.toFixed(2)} GB-hours
• Usage Level: ${currentUsage.percentageOfLimit.toFixed(1)}%

Immediate Actions Required:
${prediction.recommendations
  .filter(r => r.priority === 'critical')
  .map(r => `• ${r.message}`)
  .join('\n')}

Service may be interrupted if limits are exceeded. Please take immediate action.
    `.trim();
  }

  /**
   * Build daily summary message
   */
  private buildDailySummaryMessage(
    currentUsage: UsageMetrics,
    prediction: UsagePrediction,
    trend: { trend: string; changeRate: number; confidence: number }
  ): string {
    const trendEmoji = trend.trend === 'increasing' ? '📈' : 
                      trend.trend === 'decreasing' ? '📉' : '📊';
    
    return `
📊 Daily Vercel Usage Summary

Current Usage:
• Function Invocations: ${currentUsage.functionInvocations.toLocaleString()}
• Compute Hours: ${currentUsage.computeHours.toFixed(2)} GB-hours
• Overall Usage: ${currentUsage.percentageOfLimit.toFixed(1)}%

Trend Analysis: ${trendEmoji}
• Trend: ${trend.trend}
• Change Rate: ${trend.changeRate.toFixed(1)}%
• Confidence: ${(trend.confidence * 100).toFixed(0)}%

Monthly Projection:
• Risk Level: ${prediction.riskLevel.toUpperCase()}
• Days Remaining: ${prediction.daysRemaining}
• Predicted Usage: ${(prediction.predictedInvocations / 1000).toFixed(0)}k invocations

Status: ${prediction.riskLevel === 'low' ? '✅ All Good' : 
          prediction.riskLevel === 'medium' ? '⚠️ Monitor Closely' :
          prediction.riskLevel === 'high' ? '🚨 Action Needed' : '🔥 Critical'}
    `.trim();
  }

  /**
   * Map risk level to alert severity
   */
  private mapRiskLevelToSeverity(riskLevel: string): 'info' | 'warning' | 'error' | 'critical' {
    switch (riskLevel) {
      case 'low': return 'info';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'critical';
      default: return 'info';
    }
  }

  /**
   * Get recommended actions based on prediction
   */
  private getRecommendedActions(prediction: UsagePrediction): string[] {
    return prediction.recommendations.map(r => r.action || r.message);
  }

  /**
   * Send email alert using existing email service
   */
  private async sendEmailAlert(alertData: any): Promise<void> {
    try {
      // This would integrate with the existing SendGrid service
      // For now, we'll log the alert
      console.log('Vercel Alert Email:', {
        to: process.env.ADMIN_EMAIL || 'admin@example.com',
        subject: alertData.title,
        body: alertData.message,
        severity: alertData.severity,
      });

      // TODO: Integrate with existing SendGrid service
      // const sendGridService = new SendGridService();
      // await sendGridService.sendAlert({
      //   to: process.env.ADMIN_EMAIL,
      //   subject: alertData.title,
      //   html: this.formatAlertAsHtml(alertData),
      //   priority: alertData.severity,
      // });
    } catch (error) {
      console.error('Failed to send Vercel usage alert email:', error);
    }
  }

  /**
   * Log alert to monitoring system
   */
  private async logAlert(alertData: any): Promise<void> {
    try {
      // Log to console for now
      console.log('Vercel Usage Alert Logged:', {
        timestamp: new Date().toISOString(),
        type: alertData.type,
        severity: alertData.severity,
        title: alertData.title,
        data: alertData.data,
      });

      // TODO: Integrate with existing audit database
      // const auditDb = new AuditDatabase();
      // await auditDb.logAlert({
      //   type: alertData.type,
      //   severity: alertData.severity,
      //   message: alertData.title,
      //   data: JSON.stringify(alertData.data),
      //   timestamp: new Date(),
      // });
    } catch (error) {
      console.error('Failed to log Vercel usage alert:', error);
    }
  }

  /**
   * Trigger fallback preparation when usage is critical
   */
  private async triggerFallbackPreparation(): Promise<void> {
    try {
      console.log('Triggering fallback preparation due to critical Vercel usage');
      
      // TODO: Integrate with fallback system
      // const fallbackManager = new FallbackManager();
      // await fallbackManager.prepareGitHubActionsFallback();
    } catch (error) {
      console.error('Failed to trigger fallback preparation:', error);
    }
  }

  /**
   * Format alert as HTML for email
   */
  private formatAlertAsHtml(alertData: any): string {
    const severityColor = {
      info: '#3b82f6',
      warning: '#f59e0b',
      error: '#ef4444',
      critical: '#dc2626',
    }[alertData.severity] || '#6b7280';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${alertData.title}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: ${severityColor}; color: white; padding: 15px; border-radius: 5px 5px 0 0;">
      <h2 style="margin: 0;">${alertData.title}</h2>
    </div>
    <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; border: 1px solid #ddd;">
      <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${alertData.message}</pre>
      
      ${alertData.actions ? `
      <div style="margin-top: 20px; padding: 15px; background: #fff; border-radius: 5px; border-left: 4px solid ${severityColor};">
        <h3 style="margin-top: 0;">Recommended Actions:</h3>
        <ul>
          ${alertData.actions.map(action => `<li>${action}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
      
      <div style="margin-top: 20px; padding: 10px; background: #e5e7eb; border-radius: 5px; font-size: 12px; color: #6b7280;">
        <strong>Timestamp:</strong> ${new Date().toLocaleString()}<br>
        <strong>Alert Type:</strong> ${alertData.type}<br>
        <strong>Severity:</strong> ${alertData.severity}
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();
  }
}