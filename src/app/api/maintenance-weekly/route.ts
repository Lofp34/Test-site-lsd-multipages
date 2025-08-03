/**
 * Weekly Maintenance API Route - Hebdomadaire Cron Job
 * 
 * This route handles all weekly maintenance tasks in a single endpoint
 * to respect Vercel Hobby plan limits (max 2 cron jobs).
 * 
 * Responsibilities:
 * - Generate optimized weekly reports (JSON, HTML, CSV)
 * - Database cleanup (old logs >30 days, completed tasks)
 * - Business analytics and metrics calculation
 * - Vercel quota verification and projections
 * - System health monitoring
 * - Performance optimization recommendations
 * 
 * Optimizations:
 * - Uses cached data when possible
 * - Batch processing for database operations
 * - Memory-efficient report generation
 * - Compressed output formats
 * 
 * Schedule: Every Monday at 9:00 AM
 */

import { NextRequest, NextResponse } from 'next/server';
import { VercelUsageMonitor } from '@/lib/vercel/usage-monitor';
import { ReportGenerator } from '@/lib/audit/report-generator';
import { OptimizedReportGenerator } from '@/lib/audit/optimized-report-generator';
import { DatabaseCleanup } from '@/lib/audit/database-cleanup';
import { BusinessAnalytics } from '@/lib/audit/business-analytics';
import { CacheStrategy } from '@/lib/audit/cache-strategy';
import { TaskQueue } from '@/lib/audit/task-queue';
import { AlertManager } from '@/lib/audit/alert-manager';
import { validateConfig } from '@/lib/audit/config';
import { createClient } from '@supabase/supabase-js';

// Weekly maintenance configuration
const MAINTENANCE_CONFIG = {
  maxExecutionTime: 45000, // 45 seconds max (longer than daily audit)
  cleanupRetentionDays: 30, // Keep data for 30 days
  reportCacheTTL: 7 * 24 * 60 * 60 * 1000, // 7 days cache for reports
  batchSize: 100, // Larger batches for cleanup operations
  maxReportSize: 10 * 1024 * 1024, // 10MB max report size
} as const;

// Execution state for tracking progress
interface MaintenanceState {
  startTime: number;
  reportsGenerated: number;
  recordsCleaned: number;
  analyticsCalculated: number;
  optimizationsApplied: number;
  errors: string[];
  resourceUsage: {
    memoryUsed: number;
    cpuTime: number;
    diskSpaceFreed: number;
  };
}

// Result interface
interface MaintenanceResult {
  success: boolean;
  executionTime: number;
  summary: {
    reportsGenerated: number;
    recordsCleaned: number;
    analyticsCalculated: number;
    optimizationsApplied: number;
    diskSpaceFreed: number;
  };
  vercelUsage: {
    current: any;
    projections: any;
    recommendations: any[];
  };
  systemHealth: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  errors: string[];
  nextExecution?: Date;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const maintenanceState: MaintenanceState = {
    startTime: Date.now(),
    reportsGenerated: 0,
    recordsCleaned: 0,
    analyticsCalculated: 0,
    optimizationsApplied: 0,
    errors: [],
    resourceUsage: {
      memoryUsed: 0,
      cpuTime: 0,
      diskSpaceFreed: 0,
    },
  };

  try {
    // Validate configuration
    validateConfig();

    // Initialize systems
    const usageMonitor = new VercelUsageMonitor();
    const cacheStrategy = new CacheStrategy({
      reportDataTTL: MAINTENANCE_CONFIG.reportCacheTTL,
    });
    const reportGenerator = new ReportGenerator();
    const optimizedReportGenerator = new OptimizedReportGenerator(
      cacheStrategy,
      usageMonitor,
      {
        enableCompression: true,
        maxReportSize: MAINTENANCE_CONFIG.maxReportSize,
        cacheReports: true,
        includeVercelMetrics: true,
        generateTrends: true,
        exportFormats: ['json', 'html', 'csv'],
      }
    );
    const taskQueue = new TaskQueue();
    const databaseCleanup = new DatabaseCleanup({
      retentionDays: MAINTENANCE_CONFIG.cleanupRetentionDays,
      batchSize: MAINTENANCE_CONFIG.batchSize,
      maxExecutionTime: 20000, // 20 seconds for cleanup
      enableVacuum: true,
      enableIndexOptimization: true,
      preserveRecentData: true,
    });
    const businessAnalytics = new BusinessAnalytics(usageMonitor);
    const alertManager = new AlertManager();

    console.log('🔧 Starting weekly maintenance execution...');

    // Check initial Vercel usage and system health
    const initialUsage = await usageMonitor.getCurrentUsage();
    console.log(`📊 Initial Vercel usage: ${initialUsage.percentageOfLimit.toFixed(1)}%`);

    // Set up timeout protection
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Maintenance timeout after ${MAINTENANCE_CONFIG.maxExecutionTime}ms`));
      }, MAINTENANCE_CONFIG.maxExecutionTime);
    });

    // Execute main maintenance logic with timeout protection
    const maintenancePromise = executeWeeklyMaintenance(
      maintenanceState,
      usageMonitor,
      optimizedReportGenerator,
      cacheStrategy,
      databaseCleanup,
      businessAnalytics,
      alertManager
    );

    await Promise.race([maintenancePromise, timeoutPromise]);

    // Get final resource usage and calculate projections
    const finalUsage = await usageMonitor.getCurrentUsage();
    const usagePredictions = await usageMonitor.predictMonthlyUsage();
    const executionTime = Date.now() - maintenanceState.startTime;

    console.log(`✅ Weekly maintenance completed in ${executionTime}ms`);
    console.log(`📊 Final Vercel usage: ${finalUsage.percentageOfLimit.toFixed(1)}%`);

    // Calculate system health score
    const systemHealth = calculateSystemHealth(maintenanceState, finalUsage, usagePredictions);

    // Prepare response
    const response: MaintenanceResult = {
      success: true,
      executionTime,
      summary: {
        reportsGenerated: maintenanceState.reportsGenerated,
        recordsCleaned: maintenanceState.recordsCleaned,
        analyticsCalculated: maintenanceState.analyticsCalculated,
        optimizationsApplied: maintenanceState.optimizationsApplied,
        diskSpaceFreed: maintenanceState.resourceUsage.diskSpaceFreed,
      },
      vercelUsage: {
        current: finalUsage,
        projections: usagePredictions,
        recommendations: usagePredictions.recommendations,
      },
      systemHealth,
      errors: maintenanceState.errors,
      nextExecution: getNextMaintenanceTime(),
    };

    // Send summary alert if there are issues
    if (systemHealth.score < 80 || maintenanceState.errors.length > 0) {
      await alertManager.sendAlert('warning', {
        type: 'weekly_maintenance_issues',
        systemHealth,
        errors: maintenanceState.errors,
        vercelUsage: finalUsage,
      });
    }

    return NextResponse.json(response);

  } catch (error) {
    const executionTime = Date.now() - maintenanceState.startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    console.error('❌ Weekly maintenance failed:', errorMessage);
    maintenanceState.errors.push(errorMessage);

    // Try to send critical alert about the failure
    try {
      const alertManager = new AlertManager();
      await alertManager.sendAlert('critical', {
        type: 'maintenance_execution_failure',
        message: `Weekly maintenance failed: ${errorMessage}`,
        executionTime,
        state: maintenanceState,
      });
    } catch (alertError) {
      console.error('Failed to send maintenance failure alert:', alertError);
    }

    const errorResponse: MaintenanceResult = {
      success: false,
      executionTime,
      summary: {
        reportsGenerated: maintenanceState.reportsGenerated,
        recordsCleaned: maintenanceState.recordsCleaned,
        analyticsCalculated: maintenanceState.analyticsCalculated,
        optimizationsApplied: maintenanceState.optimizationsApplied,
        diskSpaceFreed: maintenanceState.resourceUsage.diskSpaceFreed,
      },
      vercelUsage: {
        current: null,
        projections: null,
        recommendations: [],
      },
      systemHealth: {
        score: 0,
        issues: [`Maintenance execution failed: ${errorMessage}`],
        recommendations: ['Check system logs and retry maintenance'],
      },
      errors: maintenanceState.errors,
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * Main weekly maintenance execution logic
 */
async function executeWeeklyMaintenance(
  state: MaintenanceState,
  usageMonitor: VercelUsageMonitor,
  optimizedReportGenerator: OptimizedReportGenerator,
  cacheStrategy: CacheStrategy,
  databaseCleanup: DatabaseCleanup,
  businessAnalytics: BusinessAnalytics,
  alertManager: AlertManager
): Promise<void> {
  console.log('📊 Phase 1: Vercel quota verification and projections...');
  await executeQuotaVerificationPhase(state, usageMonitor);
  
  console.log('📈 Phase 2: Generate optimized weekly reports...');
  await executeReportGenerationPhase(state, optimizedReportGenerator, cacheStrategy);
  
  console.log('🧹 Phase 3: Database cleanup and optimization...');
  await executeDatabaseCleanupPhase(state, databaseCleanup);
  
  console.log('📊 Phase 4: Business analytics and metrics...');
  await executeAnalyticsPhase(state, businessAnalytics);
  
  console.log('🔍 Phase 5: System health monitoring...');
  await executeSystemHealthPhase(state, usageMonitor, alertManager);
}

/**
 * Phase 1: Verify Vercel quotas and calculate projections
 */
async function executeQuotaVerificationPhase(
  state: MaintenanceState,
  usageMonitor: VercelUsageMonitor
): Promise<void> {
  try {
    // Get current usage metrics
    const currentUsage = await usageMonitor.getCurrentUsage();
    console.log(`Current usage: ${currentUsage.functionInvocations} invocations, ${currentUsage.computeHours.toFixed(2)} compute hours`);

    // Calculate monthly projections
    const predictions = await usageMonitor.predictMonthlyUsage();
    console.log(`Monthly projections: ${Math.round(predictions.predictedInvocations)} invocations, ${predictions.predictedComputeHours.toFixed(1)} compute hours`);
    console.log(`Risk level: ${predictions.riskLevel}, Confidence: ${(predictions.confidence * 100).toFixed(1)}%`);

    // Check if we're approaching limits
    const limitStatuses = await usageMonitor.checkLimits();
    const criticalLimits = limitStatuses.filter(status => status.exceeded && status.threshold >= 80);
    
    if (criticalLimits.length > 0) {
      state.errors.push(`Critical usage limits exceeded: ${criticalLimits.map(l => `${l.limitType} at ${l.currentUsage.toFixed(1)}%`).join(', ')}`);
      
      // Send immediate alerts for critical usage
      for (const limit of criticalLimits) {
        await usageMonitor.sendUsageAlert(limit.threshold);
      }
    }

    // Get usage trend analysis
    const trend = usageMonitor.getUsageTrend();
    console.log(`Usage trend: ${trend.trend} (${trend.changeRate.toFixed(1)}% change, ${(trend.confidence * 100).toFixed(1)}% confidence)`);

    state.analyticsCalculated++;

  } catch (error) {
    const errorMessage = `Quota verification failed: ${error instanceof Error ? error.message : String(error)}`;
    state.errors.push(errorMessage);
    console.error(errorMessage);
  }
}

/**
 * Phase 2: Generate optimized weekly reports
 */
async function executeReportGenerationPhase(
  state: MaintenanceState,
  optimizedReportGenerator: OptimizedReportGenerator,
  cacheStrategy: CacheStrategy
): Promise<void> {
  try {
    // Check remaining execution time
    const remainingTime = MAINTENANCE_CONFIG.maxExecutionTime - (Date.now() - state.startTime);
    if (remainingTime < 20000) { // Need at least 20s for report generation
      console.log('⏰ Skipping report generation due to time constraints');
      return;
    }

    // Generate optimized weekly report with caching and compression
    const weeklyReport = await optimizedReportGenerator.generateWeeklyReport();
    console.log(`Weekly report generated: ${weeklyReport.metadata.dataSource} data, ${weeklyReport.performance.generationTime}ms`);
    console.log(`Cache hit rate: ${(weeklyReport.performance.cacheHitRate * 100).toFixed(1)}%`);
    console.log(`Memory used: ${weeklyReport.performance.memoryUsed.toFixed(1)}MB`);

    // Generate all export formats
    const exportResults = await optimizedReportGenerator.generateAllFormats(weeklyReport);
    console.log(`Generated exports:`, Object.keys(exportResults));
    
    // Count generated reports
    state.reportsGenerated = Object.keys(exportResults).length;

    // Generate trend report for the last 30 days
    const trendReport = await optimizedReportGenerator.generateTrendReport(30);
    console.log(`Trend analysis: ${trendReport.trends?.linkHealth || 'No trend data'}`);
    
    if (trendReport) {
      state.reportsGenerated++;
      state.analyticsCalculated++;
    }

    // Add Vercel usage metrics to analytics count
    if (weeklyReport.metadata.vercelMetrics) {
      state.analyticsCalculated++;
    }

    // Force garbage collection to free memory
    if (global.gc) {
      global.gc();
    }

    console.log(`✅ Report generation completed: ${state.reportsGenerated} reports, ${state.analyticsCalculated} analytics`);

  } catch (error) {
    const errorMessage = `Optimized report generation failed: ${error instanceof Error ? error.message : String(error)}`;
    state.errors.push(errorMessage);
    console.error(errorMessage);
  }
}

/**
 * Phase 3: Database cleanup and optimization
 */
async function executeDatabaseCleanupPhase(
  state: MaintenanceState,
  databaseCleanup: DatabaseCleanup
): Promise<void> {
  try {
    // Check remaining execution time
    const remainingTime = MAINTENANCE_CONFIG.maxExecutionTime - (Date.now() - state.startTime);
    if (remainingTime < 15000) { // Need at least 15s for cleanup
      console.log('⏰ Skipping database cleanup due to time constraints');
      return;
    }

    // Perform comprehensive database cleanup
    const cleanupResult = await databaseCleanup.performCleanup();

    // Update maintenance state with cleanup results
    state.recordsCleaned = cleanupResult.totalRecordsDeleted;
    state.resourceUsage.diskSpaceFreed = cleanupResult.diskSpaceFreed;
    state.optimizationsApplied += cleanupResult.indexesOptimized;

    // Add any cleanup errors to the main error list
    if (cleanupResult.errors.length > 0) {
      state.errors.push(...cleanupResult.errors);
    }

    // Log detailed cleanup statistics
    console.log(`📊 Cleanup Statistics:`);
    console.log(`  - Audit logs deleted: ${cleanupResult.statistics.auditLogsDeleted}`);
    console.log(`  - Validation results cleaned: ${cleanupResult.statistics.validationResultsDeleted}`);
    console.log(`  - Task queue cleaned: ${cleanupResult.statistics.taskQueueCleaned}`);
    console.log(`  - Resource requests cleaned: ${cleanupResult.statistics.resourceRequestsCleaned}`);
    console.log(`  - Execution logs cleaned: ${cleanupResult.statistics.executionLogsCleaned}`);
    console.log(`  - Cache entries cleaned: ${cleanupResult.statistics.cacheEntriesCleaned}`);
    console.log(`  - Tables processed: ${cleanupResult.tablesProcessed.join(', ')}`);
    console.log(`  - Indexes optimized: ${cleanupResult.indexesOptimized}`);
    console.log(`  - Disk space freed: ${(cleanupResult.diskSpaceFreed / 1024 / 1024).toFixed(2)}MB`);

    // Validate database integrity after cleanup
    const integrityCheck = await databaseCleanup.validateIntegrity();
    if (!integrityCheck.isValid) {
      console.warn('⚠️ Database integrity issues detected:', integrityCheck.issues);
      state.errors.push(`Database integrity issues: ${integrityCheck.issues.join(', ')}`);
    }

    if (integrityCheck.recommendations.length > 0) {
      console.log('💡 Database recommendations:', integrityCheck.recommendations);
    }

    console.log(`✅ Database cleanup completed: ${cleanupResult.totalRecordsDeleted} records cleaned in ${cleanupResult.executionTime}ms`);

  } catch (error) {
    const errorMessage = `Enhanced database cleanup failed: ${error instanceof Error ? error.message : String(error)}`;
    state.errors.push(errorMessage);
    console.error(errorMessage);
  }
}

/**
 * Phase 4: Calculate business analytics and metrics
 */
async function executeAnalyticsPhase(
  state: MaintenanceState,
  businessAnalytics: BusinessAnalytics
): Promise<void> {
  try {
    // Check remaining execution time
    const remainingTime = MAINTENANCE_CONFIG.maxExecutionTime - (Date.now() - state.startTime);
    if (remainingTime < 10000) { // Need at least 10s for analytics
      console.log('⏰ Skipping analytics due to time constraints');
      return;
    }

    // Calculate comprehensive business metrics
    const businessMetrics = await businessAnalytics.calculateWeeklyMetrics();

    // Log key metrics
    console.log(`📊 Business Analytics Summary:`);
    console.log(`  - Link Health Score: ${businessMetrics.linkHealth.healthScore}% (${businessMetrics.linkHealth.weeklyChange > 0 ? '+' : ''}${businessMetrics.linkHealth.weeklyChange})`);
    console.log(`  - Total Links: ${businessMetrics.linkHealth.totalLinks} (${businessMetrics.linkHealth.brokenLinks} broken)`);
    console.log(`  - Critical Issues: ${businessMetrics.linkHealth.criticalIssues}`);
    console.log(`  - Resource Fulfillment Rate: ${businessMetrics.resourceRequests.fulfillmentRate.toFixed(1)}%`);
    console.log(`  - System Success Rate: ${businessMetrics.systemPerformance.successRate.toFixed(1)}%`);
    console.log(`  - Automation Rate: ${businessMetrics.businessInsights.operationalEfficiency.automationRate.toFixed(1)}%`);
    console.log(`  - Business Continuity Score: ${businessMetrics.businessInsights.riskAssessment.businessContinuityScore}`);

    // Log trends
    console.log(`📈 Trends Analysis:`);
    console.log(`  - Link Health: ${businessMetrics.trends.linkHealthTrend}`);
    console.log(`  - Resource Demand: ${businessMetrics.trends.resourceDemandTrend}`);
    console.log(`  - System Efficiency: ${businessMetrics.trends.systemEfficiencyTrend}`);
    console.log(`  - Vercel Usage: ${businessMetrics.trends.vercelUsageTrend}`);

    // Log top recommendations
    if (businessMetrics.recommendations.length > 0) {
      console.log(`💡 Top Optimization Recommendations:`);
      businessMetrics.recommendations.slice(0, 3).forEach((rec, index) => {
        console.log(`  ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.title}`);
        console.log(`     Impact: ${rec.expectedImpact} (ROI: ${rec.estimatedROI}%)`);
      });
    }

    // Log predictions
    console.log(`🔮 Predictions:`);
    console.log(`  - Next Week Health Score: ${businessMetrics.trends.predictions.nextWeekHealthScore}%`);
    console.log(`  - Next Month Vercel Usage: ${businessMetrics.trends.predictions.nextMonthVercelUsage}%`);

    // Store analytics results for historical tracking
    await businessAnalytics.storeAnalyticsResults(businessMetrics);

    // Update maintenance state
    state.analyticsCalculated = 5; // Link health, resource requests, system performance, business insights, trends
    state.optimizationsApplied += businessMetrics.recommendations.length;

    // Log top broken domains for operational insights
    if (businessMetrics.linkHealth.topBrokenDomains.length > 0) {
      console.log(`🔗 Top Broken Domains:`);
      businessMetrics.linkHealth.topBrokenDomains.slice(0, 5).forEach(domain => {
        console.log(`  - ${domain.domain}: ${domain.count} broken links`);
      });
    }

    // Log high-demand resources
    if (businessMetrics.resourceRequests.topRequestedResources.length > 0) {
      console.log(`📦 Most Requested Resources:`);
      businessMetrics.resourceRequests.topRequestedResources.slice(0, 3).forEach(resource => {
        console.log(`  - ${resource.url}: ${resource.count} requests (${resource.priority} priority)`);
      });
    }

    console.log(`✅ Business analytics completed: ${state.analyticsCalculated} metrics calculated, ${state.optimizationsApplied} recommendations generated`);

  } catch (error) {
    const errorMessage = `Enhanced analytics calculation failed: ${error instanceof Error ? error.message : String(error)}`;
    state.errors.push(errorMessage);
    console.error(errorMessage);
  }
}

/**
 * Phase 5: System health monitoring
 */
async function executeSystemHealthPhase(
  state: MaintenanceState,
  usageMonitor: VercelUsageMonitor,
  alertManager: AlertManager
): Promise<void> {
  try {
    // Check system components health
    const healthChecks = await performSystemHealthChecks();
    
    // Check Vercel usage health
    const currentUsage = await usageMonitor.getCurrentUsage();
    const usageHealth = currentUsage.percentageOfLimit < 80 ? 'healthy' : 'warning';
    
    // Check database connectivity
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { error: dbError } = await supabase
      .from('audit_history')
      .select('id')
      .limit(1);
    
    const dbHealth = dbError ? 'unhealthy' : 'healthy';
    
    // Update resource usage metrics
    state.resourceUsage.memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
    state.resourceUsage.cpuTime = process.cpuUsage().user / 1000;

    console.log(`System health checks completed: DB ${dbHealth}, Usage ${usageHealth}`);
    console.log(`Memory usage: ${state.resourceUsage.memoryUsed.toFixed(1)}MB, CPU time: ${state.resourceUsage.cpuTime.toFixed(1)}ms`);

    // Send health summary if there are issues
    if (dbHealth === 'unhealthy' || usageHealth === 'warning' || state.errors.length > 0) {
      await alertManager.sendAlert('warning', {
        type: 'system_health_warning',
        dbHealth,
        usageHealth,
        errors: state.errors,
        resourceUsage: state.resourceUsage,
      });
    }

  } catch (error) {
    const errorMessage = `System health monitoring failed: ${error instanceof Error ? error.message : String(error)}`;
    state.errors.push(errorMessage);
    console.error(errorMessage);
  }
}

/**
 * Helper function to perform system health checks
 */
async function performSystemHealthChecks(): Promise<{ [key: string]: 'healthy' | 'warning' | 'unhealthy' }> {
  const checks: { [key: string]: 'healthy' | 'warning' | 'unhealthy' } = {};

  // Check memory usage
  const memoryUsage = process.memoryUsage();
  const memoryUsedMB = memoryUsage.heapUsed / 1024 / 1024;
  checks.memory = memoryUsedMB < 400 ? 'healthy' : memoryUsedMB < 500 ? 'warning' : 'unhealthy';

  // Check if required environment variables are set
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'SENDGRID_API_KEY',
  ];
  
  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  checks.environment = missingEnvVars.length === 0 ? 'healthy' : 'unhealthy';

  return checks;
}



/**
 * Calculate system health score based on various metrics
 */
function calculateSystemHealth(
  state: MaintenanceState,
  usage: any,
  predictions: any
): { score: number; issues: string[]; recommendations: string[] } {
  let score = 100;
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Deduct points for errors
  score -= state.errors.length * 10;
  if (state.errors.length > 0) {
    issues.push(`${state.errors.length} errors occurred during maintenance`);
    recommendations.push('Review error logs and fix underlying issues');
  }

  // Deduct points for high Vercel usage
  if (usage && usage.percentageOfLimit > 80) {
    score -= 20;
    issues.push(`High Vercel usage: ${usage.percentageOfLimit.toFixed(1)}%`);
    recommendations.push('Optimize function performance or consider upgrading plan');
  }

  // Deduct points for high risk predictions
  if (predictions && predictions.riskLevel === 'critical') {
    score -= 30;
    issues.push('Critical usage risk level predicted');
    recommendations.push('Immediate action required to reduce resource consumption');
  } else if (predictions && predictions.riskLevel === 'high') {
    score -= 15;
    issues.push('High usage risk level predicted');
    recommendations.push('Monitor usage closely and prepare optimization measures');
  }

  // Deduct points for high memory usage
  if (state.resourceUsage.memoryUsed > 400) {
    score -= 10;
    issues.push(`High memory usage: ${state.resourceUsage.memoryUsed.toFixed(1)}MB`);
    recommendations.push('Optimize memory usage in maintenance operations');
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  return { score, issues, recommendations };
}

/**
 * Get week identifier for caching (YYYY-WW format)
 */
function getWeekIdentifier(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000;
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-${weekNumber.toString().padStart(2, '0')}`;
}

/**
 * Calculate next maintenance execution time (next Monday at 9 AM)
 */
function getNextMaintenanceTime(): Date {
  const now = new Date();
  const nextMonday = new Date(now);
  
  // Calculate days until next Monday
  const daysUntilMonday = (8 - now.getDay()) % 7 || 7;
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  nextMonday.setHours(9, 0, 0, 0); // 9 AM
  
  return nextMonday;
}

// Only allow POST requests (for cron jobs)
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for cron execution.' },
    { status: 405 }
  );
}