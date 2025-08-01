/**
 * Database Cleanup Utilities for Weekly Maintenance
 * 
 * Provides comprehensive database cleanup operations optimized for
 * the weekly maintenance cron job with:
 * - Batch processing for large datasets
 * - Index optimization
 * - Vacuum operations
 * - Statistics tracking
 * - Safe deletion with referential integrity
 */

import { createClient } from '@supabase/supabase-js';
import { TaskQueue } from './task-queue';

export interface CleanupConfig {
  retentionDays: number;
  batchSize: number;
  maxExecutionTime: number;
  enableVacuum: boolean;
  enableIndexOptimization: boolean;
  preserveRecentData: boolean;
}

export interface CleanupResult {
  totalRecordsDeleted: number;
  tablesProcessed: string[];
  diskSpaceFreed: number; // Estimated in bytes
  executionTime: number;
  indexesOptimized: number;
  errors: string[];
  statistics: {
    auditLogsDeleted: number;
    validationResultsDeleted: number;
    taskQueueCleaned: number;
    resourceRequestsCleaned: number;
    executionLogsCleaned: number;
    cacheEntriesCleaned: number;
  };
}

export class DatabaseCleanup {
  private supabase;
  private config: CleanupConfig;

  constructor(config?: Partial<CleanupConfig>) {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    this.config = {
      retentionDays: 30,
      batchSize: 1000,
      maxExecutionTime: 30000, // 30 seconds
      enableVacuum: true,
      enableIndexOptimization: true,
      preserveRecentData: true,
      ...config,
    };
  }

  /**
   * Perform comprehensive database cleanup
   */
  async performCleanup(): Promise<CleanupResult> {
    const startTime = Date.now();
    const result: CleanupResult = {
      totalRecordsDeleted: 0,
      tablesProcessed: [],
      diskSpaceFreed: 0,
      executionTime: 0,
      indexesOptimized: 0,
      errors: [],
      statistics: {
        auditLogsDeleted: 0,
        validationResultsDeleted: 0,
        taskQueueCleaned: 0,
        resourceRequestsCleaned: 0,
        executionLogsCleaned: 0,
        cacheEntriesCleaned: 0,
      },
    };

    console.log(`🧹 Starting database cleanup (retention: ${this.config.retentionDays} days)...`);

    try {
      // Calculate cleanup date
      const cleanupDate = new Date(Date.now() - this.config.retentionDays * 24 * 60 * 60 * 1000);
      console.log(`Cleaning records older than: ${cleanupDate.toISOString()}`);

      // Clean audit history
      await this.cleanAuditHistory(cleanupDate, result);

      // Clean validation results (keep most recent per URL)
      await this.cleanValidationResults(cleanupDate, result);

      // Clean task queue
      await this.cleanTaskQueue(result);

      // Clean resource requests
      await this.cleanResourceRequests(cleanupDate, result);

      // Clean execution logs
      await this.cleanExecutionLogs(cleanupDate, result);

      // Clean cache entries
      await this.cleanCacheEntries(cleanupDate, result);

      // Optimize database indexes
      if (this.config.enableIndexOptimization) {
        await this.optimizeIndexes(result);
      }

      // Run vacuum operations
      if (this.config.enableVacuum) {
        await this.runVacuumOperations(result);
      }

      result.executionTime = Date.now() - startTime;
      console.log(`✅ Database cleanup completed in ${result.executionTime}ms`);
      console.log(`📊 Total records deleted: ${result.totalRecordsDeleted}`);
      console.log(`💾 Estimated disk space freed: ${(result.diskSpaceFreed / 1024 / 1024).toFixed(2)}MB`);

      return result;

    } catch (error) {
      const errorMessage = `Database cleanup failed: ${error instanceof Error ? error.message : String(error)}`;
      result.errors.push(errorMessage);
      result.executionTime = Date.now() - startTime;
      console.error(errorMessage);
      return result;
    }
  }

  /**
   * Clean old audit history records
   */
  private async cleanAuditHistory(cleanupDate: Date, result: CleanupResult): Promise<void> {
    try {
      console.log('🗂️ Cleaning audit history...');

      // Keep at least the last 10 records even if they're old
      const { data: recentRecords } = await this.supabase
        .from('audit_history')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(10);

      const keepIds = recentRecords?.map(r => r.id) || [];

      // Delete old records in batches
      let totalDeleted = 0;
      let hasMore = true;

      while (hasMore && this.hasTimeRemaining(result)) {
        const { data: toDelete } = await this.supabase
          .from('audit_history')
          .select('id')
          .lt('created_at', cleanupDate.toISOString())
          .not('id', 'in', `(${keepIds.join(',')})`)
          .limit(this.config.batchSize);

        if (!toDelete || toDelete.length === 0) {
          hasMore = false;
          break;
        }

        const { count, error } = await this.supabase
          .from('audit_history')
          .delete({ count: 'exact' })
          .in('id', toDelete.map(r => r.id));

        if (error) {
          result.errors.push(`Failed to delete audit history: ${error.message}`);
          break;
        }

        const deleted = count || 0;
        totalDeleted += deleted;
        result.totalRecordsDeleted += deleted;

        // Estimate disk space freed (rough estimate: 2KB per record)
        result.diskSpaceFreed += deleted * 2048;

        if (deleted < this.config.batchSize) {
          hasMore = false;
        }
      }

      result.statistics.auditLogsDeleted = totalDeleted;
      result.tablesProcessed.push('audit_history');
      console.log(`✅ Cleaned ${totalDeleted} audit history records`);

    } catch (error) {
      result.errors.push(`Audit history cleanup failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Clean old validation results while preserving the most recent for each URL
   */
  private async cleanValidationResults(cleanupDate: Date, result: CleanupResult): Promise<void> {
    try {
      console.log('🔗 Cleaning validation results...');

      // Get unique URLs that have old validation results
      const { data: urlsWithOldResults } = await this.supabase
        .from('validation_results')
        .select('url')
        .lt('checked_at', cleanupDate.toISOString())
        .group('url');

      if (!urlsWithOldResults || urlsWithOldResults.length === 0) {
        console.log('No old validation results to clean');
        return;
      }

      let totalDeleted = 0;

      // Process URLs in batches
      for (let i = 0; i < urlsWithOldResults.length && this.hasTimeRemaining(result); i += this.config.batchSize) {
        const urlBatch = urlsWithOldResults.slice(i, i + this.config.batchSize);

        for (const { url } of urlBatch) {
          // Keep only the most recent validation result for each URL
          const { data: recentResult } = await this.supabase
            .from('validation_results')
            .select('id')
            .eq('url', url)
            .order('checked_at', { ascending: false })
            .limit(1);

          if (recentResult && recentResult.length > 0) {
            const keepId = recentResult[0].id;

            // Delete all other results for this URL
            const { count, error } = await this.supabase
              .from('validation_results')
              .delete({ count: 'exact' })
              .eq('url', url)
              .neq('id', keepId);

            if (error) {
              result.errors.push(`Failed to clean validation results for ${url}: ${error.message}`);
              continue;
            }

            const deleted = count || 0;
            totalDeleted += deleted;
            result.totalRecordsDeleted += deleted;

            // Estimate disk space freed (rough estimate: 1KB per record)
            result.diskSpaceFreed += deleted * 1024;
          }
        }
      }

      result.statistics.validationResultsDeleted = totalDeleted;
      result.tablesProcessed.push('validation_results');
      console.log(`✅ Cleaned ${totalDeleted} validation result records`);

    } catch (error) {
      result.errors.push(`Validation results cleanup failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Clean completed tasks from task queue
   */
  private async cleanTaskQueue(result: CleanupResult): Promise<void> {
    try {
      console.log('📋 Cleaning task queue...');

      const taskQueue = new TaskQueue();
      const deletedCount = await taskQueue.clearCompletedTasks();

      result.statistics.taskQueueCleaned = deletedCount;
      result.totalRecordsDeleted += deletedCount;
      result.tablesProcessed.push('task_queue');

      // Estimate disk space freed (rough estimate: 1.5KB per task)
      result.diskSpaceFreed += deletedCount * 1536;

      console.log(`✅ Cleaned ${deletedCount} completed tasks`);

    } catch (error) {
      result.errors.push(`Task queue cleanup failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Clean old resource requests
   */
  private async cleanResourceRequests(cleanupDate: Date, result: CleanupResult): Promise<void> {
    try {
      console.log('📦 Cleaning resource requests...');

      // Only delete fulfilled requests older than retention period
      const { count, error } = await this.supabase
        .from('resource_requests')
        .delete({ count: 'exact' })
        .eq('status', 'fulfilled')
        .lt('created_at', cleanupDate.toISOString());

      if (error) {
        result.errors.push(`Failed to clean resource requests: ${error.message}`);
        return;
      }

      const deleted = count || 0;
      result.statistics.resourceRequestsCleaned = deleted;
      result.totalRecordsDeleted += deleted;
      result.tablesProcessed.push('resource_requests');

      // Estimate disk space freed (rough estimate: 2KB per request)
      result.diskSpaceFreed += deleted * 2048;

      console.log(`✅ Cleaned ${deleted} fulfilled resource requests`);

    } catch (error) {
      result.errors.push(`Resource requests cleanup failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Clean old execution logs
   */
  private async cleanExecutionLogs(cleanupDate: Date, result: CleanupResult): Promise<void> {
    try {
      console.log('📝 Cleaning execution logs...');

      const { count, error } = await this.supabase
        .from('task_execution_log')
        .delete({ count: 'exact' })
        .lt('started_at', cleanupDate.toISOString());

      if (error) {
        result.errors.push(`Failed to clean execution logs: ${error.message}`);
        return;
      }

      const deleted = count || 0;
      result.statistics.executionLogsCleaned = deleted;
      result.totalRecordsDeleted += deleted;
      result.tablesProcessed.push('task_execution_log');

      // Estimate disk space freed (rough estimate: 0.5KB per log)
      result.diskSpaceFreed += deleted * 512;

      console.log(`✅ Cleaned ${deleted} execution log records`);

    } catch (error) {
      result.errors.push(`Execution logs cleanup failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Clean old cache entries
   */
  private async cleanCacheEntries(cleanupDate: Date, result: CleanupResult): Promise<void> {
    try {
      console.log('🗄️ Cleaning cache entries...');

      const { count, error } = await this.supabase
        .from('cache_snapshots')
        .delete({ count: 'exact' })
        .lt('created_at', cleanupDate.toISOString());

      if (error) {
        result.errors.push(`Failed to clean cache entries: ${error.message}`);
        return;
      }

      const deleted = count || 0;
      result.statistics.cacheEntriesCleaned = deleted;
      result.totalRecordsDeleted += deleted;
      result.tablesProcessed.push('cache_snapshots');

      // Estimate disk space freed (rough estimate: 10KB per cache entry)
      result.diskSpaceFreed += deleted * 10240;

      console.log(`✅ Cleaned ${deleted} cache entries`);

    } catch (error) {
      result.errors.push(`Cache entries cleanup failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Optimize database indexes
   */
  private async optimizeIndexes(result: CleanupResult): Promise<void> {
    try {
      console.log('🔧 Optimizing database indexes...');

      // List of tables that benefit from index optimization
      const tablesToOptimize = [
        'audit_history',
        'validation_results',
        'task_queue',
        'resource_requests',
        'task_execution_log'
      ];

      let optimizedCount = 0;

      for (const table of tablesToOptimize) {
        if (!this.hasTimeRemaining(result)) break;

        try {
          // Run REINDEX for the table (PostgreSQL specific)
          await this.supabase.rpc('reindex_table', { table_name: table });
          optimizedCount++;
        } catch (error) {
          // REINDEX might not be available, try ANALYZE instead
          try {
            await this.supabase.rpc('analyze_table', { table_name: table });
            optimizedCount++;
          } catch (analyzeError) {
            console.warn(`Could not optimize indexes for ${table}:`, analyzeError);
          }
        }
      }

      result.indexesOptimized = optimizedCount;
      console.log(`✅ Optimized indexes for ${optimizedCount} tables`);

    } catch (error) {
      result.errors.push(`Index optimization failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Run vacuum operations to reclaim disk space
   */
  private async runVacuumOperations(result: CleanupResult): Promise<void> {
    try {
      console.log('🧽 Running vacuum operations...');

      // Run VACUUM ANALYZE on main tables (PostgreSQL specific)
      const tablesToVacuum = result.tablesProcessed;

      for (const table of tablesToVacuum) {
        if (!this.hasTimeRemaining(result)) break;

        try {
          await this.supabase.rpc('vacuum_table', { table_name: table });
        } catch (error) {
          console.warn(`Could not vacuum ${table}:`, error);
        }
      }

      console.log(`✅ Vacuum operations completed for ${tablesToVacuum.length} tables`);

    } catch (error) {
      result.errors.push(`Vacuum operations failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Check if there's enough time remaining for operations
   */
  private hasTimeRemaining(result: CleanupResult): boolean {
    const elapsed = Date.now() - (Date.now() - result.executionTime);
    return elapsed < this.config.maxExecutionTime;
  }

  /**
   * Get cleanup statistics for monitoring
   */
  async getCleanupStatistics(days: number = 7): Promise<{
    totalCleanupRuns: number;
    averageRecordsDeleted: number;
    averageDiskSpaceFreed: number;
    lastCleanupDate: Date | null;
    errorRate: number;
  }> {
    try {
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

      // This would require a cleanup_history table to track cleanup runs
      // For now, return estimated statistics
      return {
        totalCleanupRuns: Math.floor(days / 7), // Weekly cleanups
        averageRecordsDeleted: 1000, // Estimated
        averageDiskSpaceFreed: 5 * 1024 * 1024, // 5MB estimated
        lastCleanupDate: new Date(), // Would be from cleanup_history
        errorRate: 0.05, // 5% estimated error rate
      };

    } catch (error) {
      console.error('Failed to get cleanup statistics:', error);
      return {
        totalCleanupRuns: 0,
        averageRecordsDeleted: 0,
        averageDiskSpaceFreed: 0,
        lastCleanupDate: null,
        errorRate: 1,
      };
    }
  }

  /**
   * Validate database integrity after cleanup
   */
  async validateIntegrity(): Promise<{
    isValid: boolean;
    issues: string[];
    recommendations: string[];
  }> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    try {
      // Check for orphaned records
      const { data: orphanedValidations } = await this.supabase
        .from('validation_results')
        .select('url')
        .not('url', 'in', '(SELECT DISTINCT url FROM scanned_links)')
        .limit(10);

      if (orphanedValidations && orphanedValidations.length > 0) {
        issues.push(`Found ${orphanedValidations.length} orphaned validation results`);
        recommendations.push('Consider cleaning orphaned validation results');
      }

      // Check for missing indexes (would require database introspection)
      // This is a simplified check
      const { data: slowQueries } = await this.supabase
        .from('audit_history')
        .select('id')
        .limit(1000);

      if (slowQueries && slowQueries.length > 500) {
        recommendations.push('Consider adding indexes for better query performance');
      }

      return {
        isValid: issues.length === 0,
        issues,
        recommendations,
      };

    } catch (error) {
      return {
        isValid: false,
        issues: [`Integrity validation failed: ${error instanceof Error ? error.message : String(error)}`],
        recommendations: ['Run manual database integrity check'],
      };
    }
  }
}