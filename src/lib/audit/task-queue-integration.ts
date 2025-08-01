// Task Queue Integration Examples for Consolidated API Routes

import { TaskQueue } from './task-queue';
import { BatchProcessor } from './batch-processor';
import { TaskType, TaskPriority } from './task-queue-types';

/**
 * Integration example for /api/audit-complete (Daily cron job)
 */
export class AuditCompleteIntegration {
  private taskQueue: TaskQueue;
  private batchProcessor: BatchProcessor;

  constructor() {
    this.taskQueue = new TaskQueue({
      batchSize: 10,
      maxConcurrency: 3,
      enableMetrics: true
    });

    this.batchProcessor = new BatchProcessor({
      batchSize: 10,
      maxConcurrency: 3,
      memoryLimitMB: 512,
      enableBackpressure: true
    });
  }

  /**
   * Main execution method for daily audit
   */
  async executeAuditComplete(): Promise<{
    success: boolean;
    summary: {
      linksProcessed: number;
      correctionsApplied: number;
      alertsSent: number;
      executionTime: number;
    };
    errors?: string[];
  }> {
    const startTime = Date.now();
    const errors: string[] = [];
    let linksProcessed = 0;
    let correctionsApplied = 0;
    let alertsSent = 0;

    try {
      console.log('🚀 Starting daily audit complete process...');

      // Step 1: Add link check tasks for all URLs
      const urls = await this.getAllUrls();
      console.log(`📝 Adding ${urls.length} link check tasks...`);
      
      for (const url of urls) {
        await this.taskQueue.addTask(
          'link_check',
          { 
            url: url.href,
            sourceFile: url.sourceFile,
            priority: url.priority,
            timeout: 5000
          },
          url.priority as TaskPriority
        );
      }

      // Step 2: Process link checks in batches
      console.log('⚡ Processing link check tasks...');
      let batchCount = 0;
      while (true) {
        const batchResult = await this.taskQueue.processBatch();
        if (batchResult.totalTasks === 0) break;
        
        batchCount++;
        linksProcessed += batchResult.completedTasks;
        console.log(`  Batch ${batchCount}: ${batchResult.completedTasks}/${batchResult.totalTasks} completed`);

        // Check for broken links and add correction tasks
        for (const result of batchResult.results) {
          if (!result.success && result.error?.includes('broken')) {
            await this.taskQueue.addTask(
              'correction',
              {
                originalUrl: result.result?.url,
                error: result.error
              },
              'high'
            );
          }
        }
      }

      // Step 3: Process corrections
      console.log('🔧 Processing correction tasks...');
      while (true) {
        const correctionBatch = await this.taskQueue.processBatch();
        if (correctionBatch.totalTasks === 0) break;
        
        correctionsApplied += correctionBatch.completedTasks;
      }

      // Step 4: Send critical alerts
      console.log('🚨 Processing alert tasks...');
      const criticalIssues = await this.identifyCriticalIssues();
      
      for (const issue of criticalIssues) {
        await this.taskQueue.addTask(
          'alert',
          {
            type: 'critical_link_failure',
            url: issue.url,
            impact: issue.impact,
            message: issue.message
          },
          'critical'
        );
      }

      // Process alerts
      while (true) {
        const alertBatch = await this.taskQueue.processBatch();
        if (alertBatch.totalTasks === 0) break;
        
        alertsSent += alertBatch.completedTasks;
      }

      const executionTime = Date.now() - startTime;
      console.log(`✅ Daily audit complete finished in ${executionTime}ms`);

      return {
        success: true,
        summary: {
          linksProcessed,
          correctionsApplied,
          alertsSent,
          executionTime
        }
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(errorMessage);
      console.error('❌ Daily audit complete failed:', errorMessage);

      return {
        success: false,
        summary: {
          linksProcessed,
          correctionsApplied,
          alertsSent,
          executionTime: Date.now() - startTime
        },
        errors
      };
    }
  }

  private async getAllUrls(): Promise<Array<{
    href: string;
    sourceFile: string;
    priority: string;
  }>> {
    // Mock implementation - in real system, this would scan all files
    return [
      { href: 'https://example.com', sourceFile: 'src/pages/index.tsx', priority: 'high' },
      { href: 'https://test.com', sourceFile: 'src/pages/about.tsx', priority: 'medium' },
      // ... more URLs
    ];
  }

  private async identifyCriticalIssues(): Promise<Array<{
    url: string;
    impact: string;
    message: string;
  }>> {
    // Mock implementation - in real system, this would analyze broken links
    return [
      {
        url: 'https://critical-resource.com',
        impact: 'high',
        message: 'Critical resource unavailable - affects main CTA'
      }
    ];
  }
}

/**
 * Integration example for /api/maintenance-weekly (Weekly cron job)
 */
export class MaintenanceWeeklyIntegration {
  private taskQueue: TaskQueue;

  constructor() {
    this.taskQueue = new TaskQueue({
      batchSize: 5,
      maxConcurrency: 2,
      enableMetrics: true
    });
  }

  /**
   * Main execution method for weekly maintenance
   */
  async executeWeeklyMaintenance(): Promise<{
    success: boolean;
    summary: {
      reportsGenerated: number;
      recordsCleaned: number;
      metricsCalculated: number;
      executionTime: number;
    };
    errors?: string[];
  }> {
    const startTime = Date.now();
    const errors: string[] = [];
    let reportsGenerated = 0;
    let recordsCleaned = 0;
    let metricsCalculated = 0;

    try {
      console.log('🚀 Starting weekly maintenance process...');

      // Step 1: Generate reports
      console.log('📊 Adding report generation tasks...');
      const reportTypes = ['weekly_summary', 'seo_health', 'link_analytics', 'performance_metrics'];
      
      for (const reportType of reportTypes) {
        await this.taskQueue.addTask(
          'report',
          {
            type: reportType,
            period: 'weekly',
            format: ['json', 'html', 'csv']
          },
          'medium'
        );
      }

      // Process report generation
      while (true) {
        const reportBatch = await this.taskQueue.processBatch();
        if (reportBatch.totalTasks === 0) break;
        
        reportsGenerated += reportBatch.completedTasks;
      }

      // Step 2: Database cleanup
      console.log('🧹 Adding cleanup tasks...');
      const cleanupTasks = [
        { table: 'validation_results', retentionDays: 30 },
        { table: 'scanned_links', retentionDays: 30 },
        { table: 'task_execution_log', retentionDays: 7 },
        { table: 'queue_metrics', retentionDays: 90 }
      ];

      for (const cleanup of cleanupTasks) {
        await this.taskQueue.addTask(
          'cleanup',
          cleanup,
          'low'
        );
      }

      // Process cleanup tasks
      while (true) {
        const cleanupBatch = await this.taskQueue.processBatch();
        if (cleanupBatch.totalTasks === 0) break;
        
        recordsCleaned += cleanupBatch.completedTasks;
      }

      // Step 3: Calculate metrics and analytics
      console.log('📈 Adding metrics calculation tasks...');
      const metricsTypes = ['link_health_trends', 'performance_analytics', 'usage_statistics'];
      
      for (const metricsType of metricsTypes) {
        await this.taskQueue.addTask(
          'maintenance',
          {
            operation: 'calculate_metrics',
            type: metricsType,
            period: 'weekly'
          },
          'medium'
        );
      }

      // Process metrics tasks
      while (true) {
        const metricsBatch = await this.taskQueue.processBatch();
        if (metricsBatch.totalTasks === 0) break;
        
        metricsCalculated += metricsBatch.completedTasks;
      }

      const executionTime = Date.now() - startTime;
      console.log(`✅ Weekly maintenance finished in ${executionTime}ms`);

      return {
        success: true,
        summary: {
          reportsGenerated,
          recordsCleaned,
          metricsCalculated,
          executionTime
        }
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(errorMessage);
      console.error('❌ Weekly maintenance failed:', errorMessage);

      return {
        success: false,
        summary: {
          reportsGenerated,
          recordsCleaned,
          metricsCalculated,
          executionTime: Date.now() - startTime
        },
        errors
      };
    }
  }
}

/**
 * Utility functions for task queue integration
 */
export class TaskQueueUtils {
  /**
   * Get queue health status
   */
  static async getQueueHealth(taskQueue: TaskQueue): Promise<{
    healthy: boolean;
    metrics: any;
    warnings: string[];
  }> {
    const metrics = await taskQueue.getQueueStatus();
    const warnings: string[] = [];
    
    // Check for potential issues
    if (metrics.pendingTasks > 100) {
      warnings.push(`High number of pending tasks: ${metrics.pendingTasks}`);
    }
    
    if (metrics.successRate < 0.9) {
      warnings.push(`Low success rate: ${(metrics.successRate * 100).toFixed(1)}%`);
    }
    
    if (metrics.averageExecutionTime > 10000) {
      warnings.push(`High average execution time: ${metrics.averageExecutionTime}ms`);
    }

    return {
      healthy: warnings.length === 0,
      metrics,
      warnings
    };
  }

  /**
   * Emergency queue cleanup
   */
  static async emergencyCleanup(taskQueue: TaskQueue): Promise<{
    cleaned: number;
    remaining: number;
  }> {
    console.log('🚨 Performing emergency queue cleanup...');
    
    // Clear all completed and failed tasks
    const cleaned = await taskQueue.clearCompletedTasks(0);
    
    // Get remaining tasks
    const status = await taskQueue.getQueueStatus();
    const remaining = status.pendingTasks + status.inProgressTasks;
    
    console.log(`🧹 Emergency cleanup: ${cleaned} tasks cleaned, ${remaining} remaining`);
    
    return { cleaned, remaining };
  }

  /**
   * Estimate processing time for pending tasks
   */
  static async estimateProcessingTime(taskQueue: TaskQueue): Promise<{
    estimatedMinutes: number;
    pendingTasks: number;
    averageTaskTime: number;
  }> {
    const metrics = await taskQueue.getQueueStatus();
    const averageTaskTime = metrics.averageExecutionTime || 1000; // Default 1 second
    const estimatedMs = metrics.pendingTasks * averageTaskTime;
    const estimatedMinutes = Math.ceil(estimatedMs / 60000);
    
    return {
      estimatedMinutes,
      pendingTasks: metrics.pendingTasks,
      averageTaskTime
    };
  }
}

// Export singleton instances
export const auditCompleteIntegration = new AuditCompleteIntegration();
export const maintenanceWeeklyIntegration = new MaintenanceWeeklyIntegration();