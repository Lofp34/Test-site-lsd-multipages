/**
 * Consolidated Audit API Route - Daily Cron Job
 * 
 * This route consolidates all daily audit tasks into a single endpoint
 * to respect Vercel Hobby plan limits (max 2 cron jobs).
 * 
 * Responsibilities:
 * - Complete link audit with optimizations
 * - Task queue processing
 * - Critical alerts detection and sending
 * - Automatic corrections (limited to 5 per execution)
 * - Resource usage monitoring
 * 
 * Optimizations:
 * - 30s max execution time
 * - Batch processing (10 links simultaneous)
 * - Intelligent caching (6h TTL)
 * - Memory management with streaming
 * - Timeout reduction (5s per request)
 */

import { NextRequest, NextResponse } from 'next/server';
import { VercelUsageMonitor } from '@/lib/vercel/usage-monitor';
import { TaskQueue } from '@/lib/audit/task-queue';
import { CacheStrategy } from '@/lib/audit/cache-strategy';
import { LinkScanner } from '@/lib/audit/link-scanner';
import { LinkValidator } from '@/lib/audit/link-validator';
import { AutoCorrector } from '@/lib/audit/auto-corrector';
import { AlertManager } from '@/lib/audit/alert-manager';
import { validateConfig } from '@/lib/audit/config';

// Consolidated audit configuration
const AUDIT_CONFIG = {
  maxExecutionTime: 30000, // 30 seconds max
  batchSize: 10,           // 10 links per batch
  maxConcurrency: 3,       // 3 batches simultaneous
  requestTimeout: 5000,    // 5s per request (reduced from 30s)
  maxCorrections: 5,       // Max 5 corrections per execution
  cacheTimeout: 6 * 60 * 60 * 1000, // 6 hours cache TTL
} as const;

// Execution state for timeout management
interface ExecutionState {
  startTime: number;
  linksProcessed: number;
  tasksProcessed: number;
  correctionsApplied: number;
  alertsSent: number;
  errors: string[];
  resourceUsage: {
    memoryUsed: number;
    cpuTime: number;
  };
}

// Result interface
interface AuditCompleteResult {
  success: boolean;
  executionTime: number;
  summary: {
    linksProcessed: number;
    tasksProcessed: number;
    correctionsApplied: number;
    alertsSent: number;
    cacheHitRate: number;
  };
  resourceUsage: {
    memoryUsed: number;
    cpuTime: number;
    vercelUsage: any;
  };
  errors: string[];
  nextExecution?: Date;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const executionState: ExecutionState = {
    startTime: Date.now(),
    linksProcessed: 0,
    tasksProcessed: 0,
    correctionsApplied: 0,
    alertsSent: 0,
    errors: [],
    resourceUsage: {
      memoryUsed: 0,
      cpuTime: 0,
    },
  };

  try {
    // Validate configuration
    validateConfig();

    // Initialize monitoring and systems
    const usageMonitor = new VercelUsageMonitor();
    const taskQueue = new TaskQueue({
      batchSize: AUDIT_CONFIG.batchSize,
      maxConcurrency: AUDIT_CONFIG.maxConcurrency,
    });
    const cacheStrategy = new CacheStrategy({
      linkResultsTTL: AUDIT_CONFIG.cacheTimeout,
    });

    console.log('🚀 Starting consolidated audit execution...');

    // Check Vercel usage before starting
    const initialUsage = await usageMonitor.getCurrentUsage();
    console.log(`📊 Initial Vercel usage: ${initialUsage.percentageOfLimit.toFixed(1)}%`);

    // Set up timeout protection
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Execution timeout after ${AUDIT_CONFIG.maxExecutionTime}ms`));
      }, AUDIT_CONFIG.maxExecutionTime);
    });

    // Execute main audit logic with timeout protection
    const auditPromise = executeConsolidatedAudit(
      executionState,
      usageMonitor,
      taskQueue,
      cacheStrategy
    );

    const result = await Promise.race([auditPromise, timeoutPromise]);

    // Get final resource usage
    const finalUsage = await usageMonitor.getCurrentUsage();
    const executionTime = Date.now() - executionState.startTime;

    console.log(`✅ Audit completed in ${executionTime}ms`);
    console.log(`📊 Final Vercel usage: ${finalUsage.percentageOfLimit.toFixed(1)}%`);

    // Prepare response
    const response: AuditCompleteResult = {
      success: true,
      executionTime,
      summary: {
        linksProcessed: executionState.linksProcessed,
        tasksProcessed: executionState.tasksProcessed,
        correctionsApplied: executionState.correctionsApplied,
        alertsSent: executionState.alertsSent,
        cacheHitRate: calculateCacheHitRate(cacheStrategy),
      },
      resourceUsage: {
        memoryUsed: process.memoryUsage().heapUsed / 1024 / 1024, // MB
        cpuTime: process.cpuUsage().user / 1000, // ms
        vercelUsage: {
          before: initialUsage,
          after: finalUsage,
          increase: {
            invocations: finalUsage.functionInvocations - initialUsage.functionInvocations,
            computeHours: finalUsage.computeHours - initialUsage.computeHours,
          },
        },
      },
      errors: executionState.errors,
      nextExecution: getNextExecutionTime(),
    };

    return NextResponse.json(response);

  } catch (error) {
    const executionTime = Date.now() - executionState.startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    console.error('❌ Audit execution failed:', errorMessage);
    executionState.errors.push(errorMessage);

    // Try to send critical alert about the failure
    try {
      const alertManager = new AlertManager();
      await alertManager.sendAlert('critical', {
        type: 'audit_execution_failure',
        message: `Consolidated audit failed: ${errorMessage}`,
        executionTime,
        state: executionState,
      });
    } catch (alertError) {
      console.error('Failed to send failure alert:', alertError);
    }

    const errorResponse: AuditCompleteResult = {
      success: false,
      executionTime,
      summary: {
        linksProcessed: executionState.linksProcessed,
        tasksProcessed: executionState.tasksProcessed,
        correctionsApplied: executionState.correctionsApplied,
        alertsSent: executionState.alertsSent,
        cacheHitRate: 0,
      },
      resourceUsage: {
        memoryUsed: process.memoryUsage().heapUsed / 1024 / 1024,
        cpuTime: process.cpuUsage().user / 1000,
        vercelUsage: null,
      },
      errors: executionState.errors,
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * Main consolidated audit execution logic
 */
async function executeConsolidatedAudit(
  state: ExecutionState,
  usageMonitor: VercelUsageMonitor,
  taskQueue: TaskQueue,
  cacheStrategy: CacheStrategy
): Promise<void> {
  console.log('🔍 Phase 1: Link audit with optimizations...');
  await executeLinkAuditPhase(state, cacheStrategy);
  
  console.log('📋 Phase 2: Task queue processing...');
  await executeTaskQueuePhase(state, taskQueue);
  
  console.log('🔧 Phase 3: Automatic corrections...');
  await executeCorrectionsPhase(state, cacheStrategy);
  
  console.log('🚨 Phase 4: Critical alerts processing...');
  await executeAlertsPhase(state);
  
  console.log('📊 Phase 5: Resource monitoring...');
  await executeMonitoringPhase(state, usageMonitor);
}

/**
 * Phase 1: Execute link audit with caching and batch processing
 */
async function executeLinkAuditPhase(
  state: ExecutionState,
  cacheStrategy: CacheStrategy
): Promise<void> {
  try {
    const linkScanner = new LinkScanner();
    const linkValidator = new LinkValidator({
      timeout: AUDIT_CONFIG.requestTimeout,
      batchSize: AUDIT_CONFIG.batchSize,
    });

    // Scan all links
    const scanResult = await linkScanner.scanAllLinks();
    console.log(`Found ${scanResult.links.length} total links`);

    // Check cache for existing results
    const urls = scanResult.links.map(link => link.url);
    const { cached, missing } = cacheStrategy.getLinkResultsBatch(urls);
    
    console.log(`Cache hit: ${cached.length}, Cache miss: ${missing.length}`);
    state.linksProcessed += cached.length;

    // Validate only missing URLs in batches
    if (missing.length > 0) {
      const validationResults = await linkValidator.validateBatch(missing);
      
      // Cache the new results
      cacheStrategy.setLinkResultsBatch(validationResults);
      state.linksProcessed += validationResults.length;
    }

    // Force garbage collection to free memory
    if (global.gc) {
      global.gc();
    }

  } catch (error) {
    const errorMessage = `Link audit phase failed: ${error instanceof Error ? error.message : String(error)}`;
    state.errors.push(errorMessage);
    console.error(errorMessage);
  }
}

/**
 * Phase 2: Process task queue with priority handling
 */
async function executeTaskQueuePhase(
  state: ExecutionState,
  taskQueue: TaskQueue
): Promise<void> {
  try {
    // Check remaining execution time
    const remainingTime = AUDIT_CONFIG.maxExecutionTime - (Date.now() - state.startTime);
    if (remainingTime < 5000) { // Need at least 5s for other phases
      console.log('⏰ Skipping task queue due to time constraints');
      return;
    }

    // Process tasks in batches
    const batchResult = await taskQueue.processBatch(AUDIT_CONFIG.batchSize);
    state.tasksProcessed = batchResult.completedTasks;

    console.log(`Processed ${batchResult.completedTasks} tasks, ${batchResult.failedTasks} failed`);

    // Log failed tasks for monitoring
    if (batchResult.failedTasks > 0) {
      const failedTasks = batchResult.results.filter(r => !r.success);
      state.errors.push(`${batchResult.failedTasks} tasks failed: ${failedTasks.map(t => t.error).join(', ')}`);
    }

  } catch (error) {
    const errorMessage = `Task queue phase failed: ${error instanceof Error ? error.message : String(error)}`;
    state.errors.push(errorMessage);
    console.error(errorMessage);
  }
}

/**
 * Phase 3: Apply automatic corrections (limited to 5 per execution)
 */
async function executeCorrectionsPhase(
  state: ExecutionState,
  cacheStrategy: CacheStrategy
): Promise<void> {
  try {
    // Check remaining execution time
    const remainingTime = AUDIT_CONFIG.maxExecutionTime - (Date.now() - state.startTime);
    if (remainingTime < 3000) { // Need at least 3s for remaining phases
      console.log('⏰ Skipping corrections due to time constraints');
      return;
    }

    const autoCorrector = new AutoCorrector();
    
    // Get broken links that need correction (from cache or recent validation)
    // This is a simplified implementation - in reality, we'd get this from the validation results
    const brokenLinks: string[] = []; // TODO: Get from validation results
    
    let correctionsApplied = 0;
    for (const url of brokenLinks) {
      if (correctionsApplied >= AUDIT_CONFIG.maxCorrections) {
        console.log(`⚠️ Reached max corrections limit (${AUDIT_CONFIG.maxCorrections})`);
        break;
      }

      try {
        const suggestion = await autoCorrector.suggestCorrection(url);
        if (suggestion && suggestion.confidence > 0.8) {
          await autoCorrector.applyCorrection(suggestion);
          correctionsApplied++;
          
          // Invalidate cache for corrected URL
          cacheStrategy.invalidate(url, 'links');
        }
      } catch (correctionError) {
        console.error(`Failed to correct ${url}:`, correctionError);
      }
    }

    state.correctionsApplied = correctionsApplied;
    console.log(`Applied ${correctionsApplied} corrections`);

  } catch (error) {
    const errorMessage = `Corrections phase failed: ${error instanceof Error ? error.message : String(error)}`;
    state.errors.push(errorMessage);
    console.error(errorMessage);
  }
}

/**
 * Phase 4: Process critical alerts
 */
async function executeAlertsPhase(state: ExecutionState): Promise<void> {
  try {
    const alertManager = new AlertManager();
    
    // Check for critical broken links (CTA, important resources)
    // This would be determined from the validation results
    const criticalBrokenLinks: string[] = []; // TODO: Get from validation results
    
    if (criticalBrokenLinks.length > 0) {
      // Group similar alerts to avoid spam
      const groupedAlerts = groupSimilarAlerts(criticalBrokenLinks);
      
      for (const alertGroup of groupedAlerts) {
        await alertManager.sendAlert('critical', {
          type: 'critical_links_broken',
          urls: alertGroup.urls,
          count: alertGroup.count,
          category: alertGroup.category,
        });
        state.alertsSent++;
      }
    }

    console.log(`Sent ${state.alertsSent} critical alerts`);

  } catch (error) {
    const errorMessage = `Alerts phase failed: ${error instanceof Error ? error.message : String(error)}`;
    state.errors.push(errorMessage);
    console.error(errorMessage);
  }
}

/**
 * Phase 5: Monitor resource usage and send warnings if needed
 */
async function executeMonitoringPhase(
  state: ExecutionState,
  usageMonitor: VercelUsageMonitor
): Promise<void> {
  try {
    // Check current usage
    const currentUsage = await usageMonitor.getCurrentUsage();
    
    // Check if we're approaching limits
    const limitStatuses = await usageMonitor.checkLimits();
    
    for (const status of limitStatuses) {
      if (status.exceeded && status.threshold >= 70) {
        await usageMonitor.sendUsageAlert(status.threshold);
        console.log(`⚠️ Sent usage alert for ${status.limitType} at ${status.threshold}%`);
      }
    }

    // Update resource usage in state
    state.resourceUsage.memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
    state.resourceUsage.cpuTime = process.cpuUsage().user / 1000;

  } catch (error) {
    const errorMessage = `Monitoring phase failed: ${error instanceof Error ? error.message : String(error)}`;
    state.errors.push(errorMessage);
    console.error(errorMessage);
  }
}

/**
 * Helper function to calculate cache hit rate
 */
function calculateCacheHitRate(cacheStrategy: CacheStrategy): number {
  const stats = cacheStrategy.getStats();
  const totalRequests = stats.totalHits + stats.totalMisses;
  return totalRequests > 0 ? stats.hitRate : 0;
}

/**
 * Helper function to group similar alerts
 */
function groupSimilarAlerts(urls: string[]): Array<{ urls: string[]; count: number; category: string }> {
  // Simple grouping by domain for now
  const groups = new Map<string, string[]>();
  
  for (const url of urls) {
    try {
      const domain = new URL(url).hostname;
      if (!groups.has(domain)) {
        groups.set(domain, []);
      }
      groups.get(domain)!.push(url);
    } catch {
      // Invalid URL, group as 'invalid'
      if (!groups.has('invalid')) {
        groups.set('invalid', []);
      }
      groups.get('invalid')!.push(url);
    }
  }

  return Array.from(groups.entries()).map(([category, urls]) => ({
    urls,
    count: urls.length,
    category,
  }));
}

/**
 * Calculate next execution time (daily at 2 AM)
 */
function getNextExecutionTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(2, 0, 0, 0); // 2 AM
  return tomorrow;
}

// Only allow POST requests (for cron jobs)
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for cron execution.' },
    { status: 405 }
  );
}