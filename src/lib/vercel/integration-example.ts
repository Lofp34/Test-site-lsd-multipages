/**
 * Example integration of Vercel monitoring and FallbackManager with consolidated audit system
 * This shows how the monitoring and fallback would be integrated into the main audit API routes
 */

import { createVercelMonitor } from './index';
import { FallbackManager } from './fallback-manager';

/**
 * Pre-audit usage check with fallback detection to determine if we should run full or minimal audit
 */
export async function preAuditUsageCheck(): Promise<{
  canRunFullAudit: boolean;
  usageLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  fallbackRequired: boolean;
  fallbackReason?: string;
}> {
  try {
    const monitor = createVercelMonitor();
    const fallbackManager = new FallbackManager();
    
    const [currentUsage, prediction, systemHealth, fallbackStatus] = await Promise.all([
      monitor.getCurrentUsage(),
      monitor.predictMonthlyUsage(),
      fallbackManager.checkSystemHealth(),
      fallbackManager.shouldActivateFallback()
    ]);
    
    // Check if fallback is required
    if (fallbackStatus.isVercelDown) {
      console.warn('🚨 Fallback required:', fallbackStatus.reason);
      await fallbackManager.activateFallback('urgent');
      
      return {
        canRunFullAudit: false,
        usageLevel: 'critical',
        recommendations: ['System fallback activated - minimal operations only'],
        fallbackRequired: true,
        fallbackReason: fallbackStatus.reason
      };
    }
    
    // Determine if we can run full audit based on usage and system health
    const canRunFullAudit = currentUsage.percentageOfLimit < 85 && 
                           prediction.riskLevel !== 'critical' &&
                           systemHealth.vercelCrons !== 'unhealthy';
    
    const recommendations = prediction.recommendations.map((r: any) => r.message);
    
    // Add system health recommendations
    if (systemHealth.vercelCrons === 'warning') {
      recommendations.push('Cron jobs running with delays - monitor closely');
    }
    if (systemHealth.database === 'slow') {
      recommendations.push('Database performance degraded - consider optimization');
    }
    
    return {
      canRunFullAudit,
      usageLevel: prediction.riskLevel,
      recommendations,
      fallbackRequired: false
    };
  } catch (error) {
    console.error('Pre-audit usage check failed:', error);
    
    // Try to activate fallback in case of monitoring failure
    try {
      const fallbackManager = new FallbackManager();
      await fallbackManager.activateFallback('urgent');
    } catch (fallbackError) {
      console.error('Failed to activate fallback:', fallbackError);
    }
    
    // Default to allowing full audit if monitoring fails
    return {
      canRunFullAudit: true,
      usageLevel: 'low',
      recommendations: ['Vercel monitoring unavailable - proceeding with caution'],
      fallbackRequired: false
    };
  }
}

/**
 * Post-audit usage tracking to record resource consumption
 */
export async function postAuditUsageTracking(auditMetrics: {
  linksProcessed: number;
  executionTime: number;
  memoryUsed?: number;
}): Promise<void> {
  try {
    const monitor = createVercelMonitor();
    const currentUsage = await monitor.getCurrentUsage();
    
    // Log audit resource consumption
    console.log('Audit Resource Consumption:', {
      linksProcessed: auditMetrics.linksProcessed,
      executionTime: auditMetrics.executionTime,
      currentUsage: {
        invocations: currentUsage.functionInvocations,
        computeHours: currentUsage.computeHours,
        percentageOfLimit: currentUsage.percentageOfLimit,
      },
    });
    
    // Check if we need to send alerts after audit
    const prediction = await monitor.predictMonthlyUsage();
    if (prediction.riskLevel === 'high' || prediction.riskLevel === 'critical') {
      console.warn('High usage detected after audit - consider optimizations');
      
      // Send alert if usage is critical
      if (prediction.riskLevel === 'critical') {
        await monitor.sendUsageAlert(90);
      }
    }
    
  } catch (error) {
    console.error('Post-audit usage tracking failed:', error);
  }
}

/**
 * Example of how to integrate with the consolidated audit API route with fallback support
 */
export async function integratedAuditExample() {
  // This would be inside /api/audit-complete route
  
  console.log('🔍 Starting consolidated audit with Vercel monitoring and fallback...');
  
  const fallbackManager = new FallbackManager();
  
  // 1. Pre-audit usage and system check
  const usageCheck = await preAuditUsageCheck();
  console.log(`Usage level: ${usageCheck.usageLevel}, Can run full audit: ${usageCheck.canRunFullAudit}, Fallback required: ${usageCheck.fallbackRequired}`);
  
  // If fallback is required, delegate to GitHub Actions
  if (usageCheck.fallbackRequired) {
    console.log('🔄 Delegating to GitHub Actions fallback...');
    
    // Synchronize data for fallback
    await fallbackManager.synchronizeData();
    
    return {
      success: false,
      fallbackActivated: true,
      reason: usageCheck.fallbackReason,
      message: 'Audit delegated to GitHub Actions fallback system'
    };
  }
  
  const startTime = Date.now();
  let linksProcessed = 0;
  
  try {
    if (usageCheck.canRunFullAudit) {
      console.log('✅ Running full audit (usage within safe limits)');
      
      // Run full audit logic here
      // - Link scanning
      // - Auto corrections
      // - Report generation
      // - Alert processing
      
      linksProcessed = 498; // Example: all links processed
      
    } else {
      console.log('⚠️ Running minimal audit (usage approaching limits)');
      
      // Run minimal audit logic here
      // - Critical links only
      // - Essential corrections only
      // - Basic alerts only
      
      linksProcessed = 50; // Example: only critical links processed
      
      // Log why we're running minimal audit
      console.log('Minimal audit reasons:', usageCheck.recommendations);
      
      // Prepare fallback for next time if conditions worsen
      await fallbackManager.synchronizeData();
    }
    
    const executionTime = Date.now() - startTime;
    
    // 2. Post-audit usage tracking
    await postAuditUsageTracking({
      linksProcessed,
      executionTime,
    });
    
    // 3. Check if we need to prepare fallback for future runs
    const postAuditStatus = await fallbackManager.shouldActivateFallback();
    if (postAuditStatus.isVercelDown) {
      console.warn('⚠️ System degraded after audit - preparing fallback');
      await fallbackManager.activateFallback('health');
    }
    
    console.log(`✅ Audit completed in ${executionTime}ms, processed ${linksProcessed} links`);
    
    return {
      success: true,
      auditType: usageCheck.canRunFullAudit ? 'full' : 'minimal',
      linksProcessed,
      executionTime,
      usageLevel: usageCheck.usageLevel,
      fallbackPrepared: postAuditStatus.isVercelDown
    };
    
  } catch (error) {
    console.error('Audit failed:', error);
    
    // Activate emergency fallback on failure
    try {
      await fallbackManager.activateFallback('urgent');
      console.log('🚨 Emergency fallback activated due to audit failure');
    } catch (fallbackError) {
      console.error('Failed to activate emergency fallback:', fallbackError);
    }
    
    // Still track usage even if audit fails
    const executionTime = Date.now() - startTime;
    await postAuditUsageTracking({
      linksProcessed,
      executionTime,
    });
    
    throw error;
  }
}

/**
 * Weekly maintenance with usage optimization and fallback management
 */
export async function weeklyMaintenanceWithUsageOptimization() {
  console.log('🔧 Starting weekly maintenance with usage optimization and fallback management...');
  
  const monitor = createVercelMonitor();
  const fallbackManager = new FallbackManager();
  
  // 1. Check system health and usage
  const [currentUsage, prediction, systemHealth, fallbackStatus] = await Promise.all([
    monitor.getCurrentUsage(),
    monitor.predictMonthlyUsage(),
    fallbackManager.checkSystemHealth(),
    fallbackManager.shouldActivateFallback()
  ]);
  
  const trend = monitor.getUsageTrend();
  
  console.log('System Summary:', {
    usage: `${currentUsage.percentageOfLimit.toFixed(1)}%`,
    trend: trend.trend,
    riskLevel: prediction.riskLevel,
    systemHealth: systemHealth.vercelCrons,
    fallbackActive: fallbackStatus.fallbackActive
  });
  
  // 2. If fallback is required, delegate to GitHub Actions
  if (fallbackStatus.isVercelDown) {
    console.log('🔄 System unhealthy - delegating maintenance to GitHub Actions...');
    
    await fallbackManager.activateFallback('maintenance');
    await fallbackManager.synchronizeData();
    
    return {
      success: false,
      fallbackActivated: true,
      reason: fallbackStatus.reason,
      message: 'Weekly maintenance delegated to GitHub Actions fallback'
    };
  }
  
  // 3. Perform maintenance tasks based on usage level and system health
  let maintenanceLevel: 'full' | 'essential' | 'minimal';
  
  if (prediction.riskLevel === 'low' && systemHealth.vercelCrons === 'healthy') {
    console.log('✅ Low usage & healthy system - running full maintenance');
    maintenanceLevel = 'full';
    // Run all maintenance tasks
    // - Database cleanup
    // - Report generation
    // - Analytics processing
    // - Cache optimization
    // - Fallback system health check
    
  } else if (prediction.riskLevel === 'medium' || systemHealth.vercelCrons === 'warning') {
    console.log('⚠️ Medium usage or system warnings - running essential maintenance');
    maintenanceLevel = 'essential';
    // Run essential maintenance only
    // - Critical database cleanup
    // - Essential reports
    // - Basic analytics
    // - Fallback preparation
    
  } else {
    console.log('🚨 High usage or system issues - running minimal maintenance');
    maintenanceLevel = 'minimal';
    // Run minimal maintenance
    // - Emergency cleanup only
    // - Critical alerts
    // - Usage optimization
    // - Fallback activation preparation
  }
  
  // 4. Synchronize data for fallback system
  try {
    await fallbackManager.synchronizeData();
    console.log('✅ Fallback data synchronized');
  } catch (error) {
    console.error('⚠️ Failed to synchronize fallback data:', error);
  }
  
  // 5. Generate comprehensive usage and health report
  const maintenanceReport = {
    timestamp: new Date().toISOString(),
    currentUsage,
    prediction,
    trend,
    systemHealth: {
      vercelApi: systemHealth.vercelApi,
      vercelCrons: systemHealth.vercelCrons,
      database: systemHealth.database,
      lastAuditTime: systemHealth.lastAuditTime,
      timeSinceLastAudit: systemHealth.timeSinceLastAudit
    },
    fallbackStatus: {
      isActive: fallbackStatus.fallbackActive,
      reason: fallbackStatus.reason,
      lastCheck: fallbackStatus.lastCheck
    },
    recommendations: prediction.recommendations,
    maintenanceLevel,
    fallbackSynchronized: true
  };
  
  console.log('📊 Weekly maintenance and health report generated');
  
  // 6. Send weekly summary with fallback status
  try {
    const { VercelAlertIntegration } = await import('./alert-integration');
    const alertIntegration = new VercelAlertIntegration();
    await alertIntegration.sendDailyUsageSummary(currentUsage, prediction, trend);
    
    // Send additional fallback status if there are concerns
    if (systemHealth.vercelCrons !== 'healthy' || prediction.riskLevel === 'high') {
      await alertIntegration.sendSystemHealthAlert(systemHealth, fallbackStatus);
    }
  } catch (error) {
    console.error('Failed to send weekly maintenance summary:', error);
  }
  
  // 7. Prepare fallback if conditions are deteriorating
  if (prediction.riskLevel === 'high' || systemHealth.vercelCrons === 'warning') {
    console.log('⚠️ Preparing fallback due to deteriorating conditions...');
    try {
      // Pre-synchronize data for faster fallback activation
      await fallbackManager.synchronizeData();
      console.log('✅ Fallback prepared for potential activation');
    } catch (error) {
      console.error('Failed to prepare fallback:', error);
    }
  }
  
  return maintenanceReport;
}

/**
 * Continuous monitoring with automatic fallback activation
 */
export async function continuousMonitoringWithFallback() {
  console.log('🔄 Starting continuous monitoring with automatic fallback...');
  
  const monitor = createVercelMonitor();
  const fallbackManager = new FallbackManager();
  
  const monitoringInterval = setInterval(async () => {
    try {
      // 1. Check system health and usage
      const [usage, systemHealth, fallbackStatus] = await Promise.all([
        monitor.getCurrentUsage(),
        fallbackManager.checkSystemHealth(),
        fallbackManager.shouldActivateFallback()
      ]);
      
      console.log(`📊 Monitoring - Usage: ${usage.percentageOfLimit.toFixed(1)}%, Health: ${systemHealth.vercelCrons}, Fallback: ${fallbackStatus.fallbackActive ? 'Active' : 'Inactive'}`);
      
      // 2. Automatic fallback activation based on conditions
      if (fallbackStatus.isVercelDown && !fallbackStatus.fallbackActive) {
        console.log('🚨 Automatic fallback activation triggered');
        await fallbackManager.activateFallback('health');
        await fallbackManager.synchronizeData();
      }
      
      // 3. Prepare fallback if usage is high
      if (usage.percentageOfLimit > 85) {
        console.log('⚠️ High usage detected - preparing fallback');
        await fallbackManager.synchronizeData();
      }
      
      // 4. Send alerts for critical conditions
      if (usage.percentageOfLimit > 90 || systemHealth.vercelCrons === 'unhealthy') {
        try {
          const { VercelAlertIntegration } = await import('./alert-integration');
          const alertIntegration = new VercelAlertIntegration();
          await alertIntegration.sendCriticalAlert(usage, systemHealth);
        } catch (error) {
          console.error('Failed to send critical alert:', error);
        }
      }
      
    } catch (error) {
      console.error('❌ Error in continuous monitoring:', error);
      
      // Emergency fallback activation on monitoring failure
      try {
        await fallbackManager.activateFallback('urgent');
        console.log('🚨 Emergency fallback activated due to monitoring failure');
      } catch (fallbackError) {
        console.error('❌ Failed to activate emergency fallback:', fallbackError);
      }
    }
  }, 60000); // Every minute
  
  // Return cleanup function
  return () => {
    clearInterval(monitoringInterval);
    console.log('⏹️ Continuous monitoring stopped');
  };
}