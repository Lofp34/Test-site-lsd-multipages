// Optimized Task Queue System for Vercel Hobby Plan
import { v4 as uuidv4 } from 'uuid';
import { getSupabaseAdmin } from './database';
import {
  AuditTask,
  TaskResult,
  BatchResult,
  QueueMetrics,
  TaskQueueConfig,
  RetryConfig,
  TaskPriority,
  TaskType,
  TaskStatus,
  TaskQueueRow,
  TaskExecutionLogRow,
  QueueMetricsRow
} from './task-queue-types';

export class TaskQueue {
  private config: TaskQueueConfig;
  private retryConfig: RetryConfig;
  private isProcessing = false;
  private processingPromise: Promise<void> | null = null;
  private metricsCache: QueueMetrics | null = null;
  private lastMetricsUpdate = 0;

  constructor(config?: Partial<TaskQueueConfig>) {
    this.config = {
      batchSize: 10,
      maxConcurrency: 3,
      retryDelayMs: 1000,
      maxRetryDelayMs: 30000,
      backoffMultiplier: 2,
      cleanupIntervalMs: 60000, // 1 minute
      maxTaskAge: 24 * 60 * 60 * 1000, // 24 hours
      enableMetrics: true,
      ...config
    };

    this.retryConfig = {
      maxAttempts: 3,
      initialDelayMs: 1000,
      maxDelayMs: 30000,
      backoffMultiplier: 2,
      jitterMs: 500
    };
  }

  /**
   * Add a task to the queue
   */
  async addTask(
    type: TaskType,
    payload: any,
    priority: TaskPriority = 'medium',
    options?: {
      maxAttempts?: number;
      scheduledFor?: Date;
      metadata?: Record<string, any>;
    }
  ): Promise<string> {
    const task: AuditTask = {
      id: uuidv4(),
      type,
      priority,
      payload,
      status: 'pending',
      attempts: 0,
      maxAttempts: options?.maxAttempts || this.retryConfig.maxAttempts,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduledFor: options?.scheduledFor,
      metadata: options?.metadata
    };

    await this.persistTask(task);
    return task.id;
  }

  /**
   * Process tasks in batches with concurrency control
   */
  async processBatch(batchSize?: number): Promise<BatchResult> {
    const actualBatchSize = batchSize || this.config.batchSize;
    const batchId = uuidv4();
    const startTime = Date.now();

    // Get pending tasks ordered by priority and creation time
    const tasks = await this.getPendingTasks(actualBatchSize);
    
    if (tasks.length === 0) {
      return {
        batchId,
        totalTasks: 0,
        completedTasks: 0,
        failedTasks: 0,
        results: [],
        executionTime: Date.now() - startTime,
        averageTaskTime: 0
      };
    }

    // Mark tasks as in progress
    await this.updateTasksStatus(tasks.map(t => t.id), 'in_progress');

    // Process tasks with concurrency control
    const results: TaskResult[] = [];
    const semaphore = new Semaphore(this.config.maxConcurrency);

    const taskPromises = tasks.map(async (task) => {
      return semaphore.acquire(async () => {
        const result = await this.executeTask(task);
        results.push(result);
        return result;
      });
    });

    await Promise.all(taskPromises);

    const completedTasks = results.filter(r => r.success).length;
    const failedTasks = results.filter(r => !r.success).length;
    const totalExecutionTime = Date.now() - startTime;
    const averageTaskTime = results.length > 0 
      ? results.reduce((sum, r) => sum + r.executionTime, 0) / results.length 
      : 0;

    // Update metrics if enabled
    if (this.config.enableMetrics) {
      await this.updateMetrics();
    }

    return {
      batchId,
      totalTasks: tasks.length,
      completedTasks,
      failedTasks,
      results,
      executionTime: totalExecutionTime,
      averageTaskTime
    };
  }

  /**
   * Execute a single task with retry logic
   */
  private async executeTask(task: AuditTask): Promise<TaskResult> {
    const startTime = Date.now();
    const logId = await this.logTaskExecution(task.id, task.attempts + 1);

    try {
      // Update attempt count
      task.attempts++;
      await this.updateTask(task.id, { 
        attempts: task.attempts,
        updatedAt: new Date()
      });

      // Execute the task based on its type
      const result = await this.executeTaskByType(task);

      // Mark as completed
      await this.updateTask(task.id, {
        status: 'completed',
        completedAt: new Date(),
        updatedAt: new Date()
      });

      // Log successful execution
      await this.updateTaskExecutionLog(logId, {
        completed_at: new Date().toISOString(),
        success: true,
        execution_time: Date.now() - startTime
      });

      return {
        taskId: task.id,
        success: true,
        result,
        executionTime: Date.now() - startTime
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Log failed execution
      await this.updateTaskExecutionLog(logId, {
        completed_at: new Date().toISOString(),
        success: false,
        error: errorMessage,
        execution_time: Date.now() - startTime
      });

      // Check if we should retry
      if (task.attempts < task.maxAttempts) {
        const retryDelay = this.calculateRetryDelay(task.attempts);
        const scheduledFor = new Date(Date.now() + retryDelay);
        
        await this.updateTask(task.id, {
          status: 'retrying',
          scheduledFor,
          error: errorMessage,
          updatedAt: new Date()
        });

        return {
          taskId: task.id,
          success: false,
          error: `Retrying in ${retryDelay}ms: ${errorMessage}`,
          executionTime: Date.now() - startTime
        };
      } else {
        // Max attempts reached, mark as failed
        await this.updateTask(task.id, {
          status: 'failed',
          error: errorMessage,
          updatedAt: new Date()
        });

        return {
          taskId: task.id,
          success: false,
          error: errorMessage,
          executionTime: Date.now() - startTime
        };
      }
    }
  }

  /**
   * Execute task based on its type
   */
  private async executeTaskByType(task: AuditTask): Promise<any> {
    switch (task.type) {
      case 'link_check':
        return this.executeLinkCheck(task.payload);
      case 'correction':
        return this.executeCorrection(task.payload);
      case 'alert':
        return this.executeAlert(task.payload);
      case 'report':
        return this.executeReport(task.payload);
      case 'cleanup':
        return this.executeCleanup(task.payload);
      case 'maintenance':
        return this.executeMaintenance(task.payload);
      default:
        throw new Error(`Unknown task type: ${task.type}`);
    }
  }

  /**
   * Task execution methods (to be implemented based on existing audit system)
   */
  private async executeLinkCheck(payload: any): Promise<any> {
    // Import and use existing link validator
    const { LinkValidator } = await import('./link-validator');
    const validator = new LinkValidator();
    return validator.validateUrl(payload.url);
  }

  private async executeCorrection(payload: any): Promise<any> {
    // Import and use existing auto corrector
    const { AutoCorrector } = await import('./auto-corrector');
    const corrector = new AutoCorrector();
    return corrector.correctLink(payload.originalUrl, payload.suggestedUrl, payload.filePath);
  }

  private async executeAlert(payload: any): Promise<any> {
    // Import and use existing alert manager
    const { AlertManager } = await import('./alert-manager');
    const alertManager = new AlertManager();
    return alertManager.sendAlert(payload.type, payload.data);
  }

  private async executeReport(payload: any): Promise<any> {
    // Import and use existing report generator
    const { ReportGenerator } = await import('./report-generator');
    const reportGenerator = new ReportGenerator();
    return reportGenerator.generateReport(payload.type, payload.data);
  }

  private async executeCleanup(payload: any): Promise<any> {
    // Database cleanup operations
    const { AuditDatabase } = await import('./database');
    return AuditDatabase.cleanOldData(payload.retentionDays);
  }

  private async executeMaintenance(payload: any): Promise<any> {
    // Maintenance operations
    return { message: 'Maintenance task completed', payload };
  }

  /**
   * Get queue status and metrics
   */
  async getQueueStatus(): Promise<QueueMetrics> {
    // Use cached metrics if recent (within 30 seconds)
    if (this.metricsCache && Date.now() - this.lastMetricsUpdate < 30000) {
      return this.metricsCache;
    }

    const supabase = getSupabaseAdmin();
    
    // Get task counts by status
    const { data: statusCounts } = await supabase
      .from('task_queue')
      .select('status')
      .then(result => ({
        data: result.data?.reduce((acc, row) => {
          acc[row.status] = (acc[row.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {}
      }));

    // Get task counts by priority
    const { data: priorityCounts } = await supabase
      .from('task_queue')
      .select('priority')
      .then(result => ({
        data: result.data?.reduce((acc, row) => {
          acc[row.priority] = (acc[row.priority] || 0) + 1;
          return acc;
        }, {} as Record<TaskPriority, number>) || {}
      }));

    // Get task counts by type
    const { data: typeCounts } = await supabase
      .from('task_queue')
      .select('type')
      .then(result => ({
        data: result.data?.reduce((acc, row) => {
          acc[row.type] = (acc[row.type] || 0) + 1;
          return acc;
        }, {} as Record<TaskType, number>) || {}
      }));

    // Get execution metrics
    const { data: execMetrics } = await supabase
      .from('task_execution_log')
      .select('execution_time, success')
      .gte('started_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .then(result => {
        const logs = result.data || [];
        const totalLogs = logs.length;
        const successfulLogs = logs.filter(log => log.success).length;
        const avgTime = totalLogs > 0 
          ? logs.reduce((sum, log) => sum + log.execution_time, 0) / totalLogs 
          : 0;
        
        return {
          data: {
            averageExecutionTime: avgTime,
            successRate: totalLogs > 0 ? successfulLogs / totalLogs : 0
          }
        };
      });

    const metrics: QueueMetrics = {
      totalTasks: Object.values(statusCounts || {}).reduce((sum, count) => sum + count, 0),
      pendingTasks: statusCounts?.pending || 0,
      inProgressTasks: statusCounts?.in_progress || 0,
      completedTasks: statusCounts?.completed || 0,
      failedTasks: statusCounts?.failed || 0,
      tasksByPriority: {
        critical: priorityCounts?.critical || 0,
        high: priorityCounts?.high || 0,
        medium: priorityCounts?.medium || 0,
        low: priorityCounts?.low || 0
      },
      tasksByType: {
        link_check: typeCounts?.link_check || 0,
        correction: typeCounts?.correction || 0,
        alert: typeCounts?.alert || 0,
        report: typeCounts?.report || 0,
        cleanup: typeCounts?.cleanup || 0,
        maintenance: typeCounts?.maintenance || 0
      },
      averageExecutionTime: execMetrics?.data?.averageExecutionTime || 0,
      successRate: execMetrics?.data?.successRate || 0,
      lastProcessedAt: new Date()
    };

    // Cache the metrics
    this.metricsCache = metrics;
    this.lastMetricsUpdate = Date.now();

    return metrics;
  }

  /**
   * Clear completed tasks older than specified age
   */
  async clearCompletedTasks(maxAge?: number): Promise<number> {
    const cutoffDate = new Date(Date.now() - (maxAge || this.config.maxTaskAge));
    
    const { data, error } = await getSupabaseAdmin()
      .from('task_queue')
      .delete()
      .in('status', ['completed', 'failed'])
      .lt('updated_at', cutoffDate.toISOString())
      .select('id');

    if (error) {
      throw new Error(`Failed to clear completed tasks: ${error.message}`);
    }

    return data?.length || 0;
  }

  /**
   * Database operations
   */
  private async persistTask(task: AuditTask): Promise<void> {
    const row: Omit<TaskQueueRow, 'created_at' | 'updated_at'> = {
      id: task.id,
      type: task.type,
      priority: task.priority,
      payload: task.payload,
      status: task.status,
      attempts: task.attempts,
      max_attempts: task.maxAttempts,
      scheduled_for: task.scheduledFor?.toISOString(),
      completed_at: task.completedAt?.toISOString(),
      error: task.error,
      metadata: task.metadata
    };

    const { error } = await getSupabaseAdmin()
      .from('task_queue')
      .insert(row);

    if (error) {
      throw new Error(`Failed to persist task: ${error.message}`);
    }
  }

  private async getPendingTasks(limit: number): Promise<AuditTask[]> {
    const now = new Date().toISOString();
    
    const { data, error } = await getSupabaseAdmin()
      .from('task_queue')
      .select('*')
      .in('status', ['pending', 'retrying'])
      .or(`scheduled_for.is.null,scheduled_for.lte.${now}`)
      .order('priority', { ascending: false }) // critical first
      .order('created_at', { ascending: true }) // oldest first
      .limit(limit);

    if (error) {
      throw new Error(`Failed to get pending tasks: ${error.message}`);
    }

    return (data || []).map(this.rowToTask);
  }

  private async updateTask(taskId: string, updates: Partial<AuditTask>): Promise<void> {
    const updateData: any = {};
    
    if (updates.status) updateData.status = updates.status;
    if (updates.attempts !== undefined) updateData.attempts = updates.attempts;
    if (updates.scheduledFor) updateData.scheduled_for = updates.scheduledFor.toISOString();
    if (updates.completedAt) updateData.completed_at = updates.completedAt.toISOString();
    if (updates.error) updateData.error = updates.error;
    if (updates.updatedAt) updateData.updated_at = updates.updatedAt.toISOString();

    const { error } = await getSupabaseAdmin()
      .from('task_queue')
      .update(updateData)
      .eq('id', taskId);

    if (error) {
      throw new Error(`Failed to update task: ${error.message}`);
    }
  }

  private async updateTasksStatus(taskIds: string[], status: TaskStatus): Promise<void> {
    const { error } = await getSupabaseAdmin()
      .from('task_queue')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .in('id', taskIds);

    if (error) {
      throw new Error(`Failed to update tasks status: ${error.message}`);
    }
  }

  private async logTaskExecution(taskId: string, attempt: number): Promise<number> {
    const { data, error } = await getSupabaseAdmin()
      .from('task_execution_log')
      .insert({
        task_id: taskId,
        attempt,
        started_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to log task execution: ${error.message}`);
    }

    return data.id;
  }

  private async updateTaskExecutionLog(logId: number, updates: Partial<TaskExecutionLogRow>): Promise<void> {
    const { error } = await getSupabaseAdmin()
      .from('task_execution_log')
      .update(updates)
      .eq('id', logId);

    if (error) {
      throw new Error(`Failed to update task execution log: ${error.message}`);
    }
  }

  private async updateMetrics(): Promise<void> {
    const metrics = await this.getQueueStatus();
    
    const { error } = await getSupabaseAdmin()
      .from('queue_metrics')
      .insert({
        snapshot_at: new Date().toISOString(),
        total_tasks: metrics.totalTasks,
        pending_tasks: metrics.pendingTasks,
        in_progress_tasks: metrics.inProgressTasks,
        completed_tasks: metrics.completedTasks,
        failed_tasks: metrics.failedTasks,
        average_execution_time: metrics.averageExecutionTime,
        success_rate: metrics.successRate
      });

    if (error) {
      console.error('Failed to update metrics:', error.message);
    }
  }

  private calculateRetryDelay(attempt: number): number {
    const baseDelay = this.retryConfig.initialDelayMs;
    const exponentialDelay = baseDelay * Math.pow(this.retryConfig.backoffMultiplier, attempt - 1);
    const jitter = Math.random() * this.retryConfig.jitterMs;
    
    return Math.min(exponentialDelay + jitter, this.retryConfig.maxDelayMs);
  }

  private rowToTask(row: TaskQueueRow): AuditTask {
    return {
      id: row.id,
      type: row.type,
      priority: row.priority,
      payload: row.payload,
      status: row.status,
      attempts: row.attempts,
      maxAttempts: row.max_attempts,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      scheduledFor: row.scheduled_for ? new Date(row.scheduled_for) : undefined,
      completedAt: row.completed_at ? new Date(row.completed_at) : undefined,
      error: row.error,
      metadata: row.metadata
    };
  }
}

/**
 * Semaphore for concurrency control
 */
class Semaphore {
  private permits: number;
  private waiting: Array<() => void> = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (this.permits > 0) {
        this.permits--;
        this.execute(fn, resolve, reject);
      } else {
        this.waiting.push(() => {
          this.permits--;
          this.execute(fn, resolve, reject);
        });
      }
    });
  }

  private async execute<T>(
    fn: () => Promise<T>,
    resolve: (value: T) => void,
    reject: (reason: any) => void
  ): Promise<void> {
    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.permits++;
      if (this.waiting.length > 0) {
        const next = this.waiting.shift();
        if (next) next();
      }
    }
  }
}

// Export singleton instance
export const taskQueue = new TaskQueue();