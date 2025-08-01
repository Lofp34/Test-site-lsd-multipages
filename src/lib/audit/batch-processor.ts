// Batch Processor for Optimized Task Execution
import { TaskQueue } from './task-queue';
import { TaskType, TaskPriority, BatchResult } from './task-queue-types';
import { memoryOptimizer, MemoryOptimizer } from './memory-optimizer';
import { streamingProcessor, StreamingProcessor } from './streaming-processor';

export interface BatchProcessorConfig {
  batchSize: number;
  maxConcurrency: number;
  timeoutMs: number;
  enableBackpressure: boolean;
  memoryLimitMB: number;
  backpressureThresholdPercent: number;
  maxQueueSize: number;
  retryAttempts: number;
  retryDelayMs: number;
  enableErrorRecovery: boolean;
  circuitBreakerThreshold: number;
}

export interface ProcessingStats {
  totalItems: number;
  processedItems: number;
  failedItems: number;
  retriedItems: number;
  batchCount: number;
  totalTime: number;
  averageItemTime: number;
  memoryUsage: number;
  throughput: number; // items per second
  backpressureEvents: number;
  circuitBreakerTrips: number;
  errorsByType: Record<string, number>;
  queueWaitTime: number;
}

export class BatchProcessor {
  private taskQueue: TaskQueue;
  private config: BatchProcessorConfig;
  private isProcessing = false;
  private memoryOptimizer: MemoryOptimizer;
  private streamingProcessor: StreamingProcessor;

  constructor(config?: Partial<BatchProcessorConfig>) {
    this.config = {
      batchSize: 10,
      maxConcurrency: 3,
      timeoutMs: 30000, // 30 seconds max per batch
      enableBackpressure: true,
      memoryLimitMB: 512,
      backpressureThresholdPercent: 75,
      maxQueueSize: 1000,
      retryAttempts: 2,
      retryDelayMs: 1000,
      enableErrorRecovery: true,
      circuitBreakerThreshold: 5, // 5 consecutive failures
      ...config
    };

    this.taskQueue = new TaskQueue({
      batchSize: this.config.batchSize,
      maxConcurrency: this.config.maxConcurrency
    });

    // Initialize memory optimizer with batch processor config
    this.memoryOptimizer = new MemoryOptimizer({
      memoryLimitMB: this.config.memoryLimitMB,
      enableAutoGC: true,
      enableStreaming: true,
      streamChunkSize: this.config.batchSize
    });

    // Initialize streaming processor for large datasets
    this.streamingProcessor = new StreamingProcessor({
      chunkSize: this.config.batchSize,
      maxConcurrency: this.config.maxConcurrency,
      memoryLimitMB: this.config.memoryLimitMB,
      enableBackpressure: this.config.enableBackpressure,
      backpressureThresholdPercent: this.config.backpressureThresholdPercent
    });
  }

  /**
   * Process items in batches with backpressure management
   */
  async processWithBackpressure<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    taskType: TaskType = 'link_check',
    priority: TaskPriority = 'medium'
  ): Promise<ProcessingStats> {
    if (this.isProcessing) {
      throw new Error('Batch processor is already running');
    }

    this.isProcessing = true;
    const startTime = Date.now();
    let processedItems = 0;
    let failedItems = 0;
    let batchCount = 0;

    try {
      // Start memory monitoring
      this.memoryOptimizer.startMonitoring();

      // Add all items as tasks to the queue
      const taskIds: string[] = [];
      for (let i = 0; i < items.length; i++) {
        const taskId = await this.taskQueue.addTask(
          taskType,
          { 
            item: items[i], 
            index: i,
            processor: processor.toString() // For debugging
          },
          priority,
          {
            metadata: { batchProcessor: true, itemIndex: i }
          }
        );
        taskIds.push(taskId);
      }

      // Process batches with backpressure control
      while (true) {
        // Check memory usage before processing
        if (this.config.enableBackpressure) {
          if (!this.memoryOptimizer.isMemorySafe()) {
            console.log('⚠️  Memory threshold reached, waiting for release...');
            const released = await this.memoryOptimizer.waitForMemoryRelease();
            if (!released) {
              throw new Error('Memory limit exceeded and could not be released');
            }
          }
        }

        // Process a batch
        const batchResult = await this.processBatchWithTimeout();
        
        if (batchResult.totalTasks === 0) {
          break; // No more tasks to process
        }

        batchCount++;
        processedItems += batchResult.completedTasks;
        failedItems += batchResult.failedTasks;

        console.log(`Batch ${batchCount}: ${batchResult.completedTasks}/${batchResult.totalTasks} completed`);

        // Apply backpressure if needed
        if (this.config.enableBackpressure && batchResult.failedTasks > batchResult.completedTasks) {
          console.log('High failure rate detected, applying backpressure...');
          await this.sleep(1000); // Wait 1 second before next batch
        }
      }

      const totalTime = Date.now() - startTime;
      const averageItemTime = processedItems > 0 ? totalTime / processedItems : 0;
      const throughput = processedItems > 0 ? (processedItems / (totalTime / 1000)) : 0;

      const memoryStats = this.memoryOptimizer.getCurrentMemoryStats();
      
      return {
        totalItems: items.length,
        processedItems,
        failedItems,
        batchCount,
        totalTime,
        averageItemTime,
        memoryUsage: memoryStats.heapUsed,
        throughput
      };

    } finally {
      this.isProcessing = false;
      this.memoryOptimizer.stopMonitoring();
      
      // Force garbage collection after processing
      if (this.config.enableBackpressure) {
        this.memoryOptimizer.forceGarbageCollection();
      }
    }
  }

  /**
   * Process a batch with timeout protection
   */
  private async processBatchWithTimeout(): Promise<BatchResult> {
    return new Promise(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Batch processing timeout after ${this.config.timeoutMs}ms`));
      }, this.config.timeoutMs);

      try {
        const result = await this.taskQueue.processBatch();
        clearTimeout(timeout);
        resolve(result);
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
  }

  /**
   * Process large datasets with streaming for memory efficiency
   */
  async processWithStreaming<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    taskType: TaskType = 'link_check',
    priority: TaskPriority = 'medium',
    options?: {
      onProgress?: (processed: number, total: number) => void;
      onChunkComplete?: (chunkIndex: number, results: R[]) => void;
    }
  ): Promise<ProcessingStats> {
    if (this.isProcessing) {
      throw new Error('Batch processor is already running');
    }

    this.isProcessing = true;
    const startTime = Date.now();

    try {
      console.log(`🚀 Starting streaming processing of ${items.length} items...`);
      
      const results = await this.streamingProcessor.processStream(
        items,
        processor,
        {
          onProgress: (stats) => {
            if (options?.onProgress) {
              options.onProgress(stats.processedItems, stats.totalItems);
            }
          },
          onChunkComplete: options?.onChunkComplete
        }
      );

      const totalTime = Date.now() - startTime;
      const streamingStats = this.streamingProcessor.getStats();

      return {
        totalItems: items.length,
        processedItems: streamingStats.processedItems,
        failedItems: streamingStats.failedItems,
        batchCount: streamingStats.chunksProcessed,
        totalTime,
        averageItemTime: streamingStats.averageChunkTime / this.config.batchSize,
        memoryUsage: streamingStats.memoryUsage.peak,
        throughput: streamingStats.throughput
      };

    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Get current memory statistics
   */
  getMemoryStats() {
    return this.memoryOptimizer.getCurrentMemoryStats();
  }

  /**
   * Get memory usage trend
   */
  getMemoryTrend() {
    return this.memoryOptimizer.getMemoryTrend();
  }

  /**
   * Force garbage collection
   */
  forceGarbageCollection(): boolean {
    return this.memoryOptimizer.forceGarbageCollection();
  }

  /**
   * Advanced batch processing with backpressure management and error recovery
   */
  async processAdvancedBatch<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    options?: {
      priority?: TaskPriority;
      enableRetry?: boolean;
      enableCircuitBreaker?: boolean;
      onProgress?: (stats: ProcessingStats) => void;
      onError?: (error: Error, item: T, attempt: number) => void;
      onBackpressure?: (memoryUsage: number, queueSize: number) => void;
    }
  ): Promise<ProcessingStats> {
    if (this.isProcessing) {
      throw new Error('Advanced batch processor is already running');
    }

    this.isProcessing = true;
    const startTime = Date.now();
    
    const stats: ProcessingStats = {
      totalItems: items.length,
      processedItems: 0,
      failedItems: 0,
      retriedItems: 0,
      batchCount: 0,
      totalTime: 0,
      averageItemTime: 0,
      memoryUsage: 0,
      throughput: 0,
      backpressureEvents: 0,
      circuitBreakerTrips: 0,
      errorsByType: {},
      queueWaitTime: 0
    };

    const {
      priority = 'medium',
      enableRetry = this.config.enableErrorRecovery,
      enableCircuitBreaker = this.config.enableErrorRecovery,
      onProgress,
      onError,
      onBackpressure
    } = options || {};

    // Circuit breaker state
    let consecutiveFailures = 0;
    let circuitBreakerOpen = false;
    let circuitBreakerResetTime = 0;

    try {
      this.memoryOptimizer.startMonitoring();

      // Process items with advanced backpressure management
      const queue = new AdvancedQueue<T>(this.config.maxQueueSize);
      const results: R[] = [];
      let itemIndex = 0;

      // Producer: Add items to queue with backpressure control
      const producer = async () => {
        for (const item of items) {
          // Check backpressure conditions
          const memoryStats = this.memoryOptimizer.getCurrentMemoryStats();
          const queueSize = queue.size();

          if (memoryStats.percentageUsed > this.config.backpressureThresholdPercent || 
              queueSize > this.config.maxQueueSize * 0.8) {
            
            stats.backpressureEvents++;
            
            if (onBackpressure) {
              onBackpressure(memoryStats.heapUsed, queueSize);
            }

            console.log(`⏸️  Backpressure detected: memory ${memoryStats.percentageUsed}%, queue ${queueSize}`);
            
            // Wait for conditions to improve
            await this.waitForBackpressureRelief();
          }

          await queue.enqueue(item);
        }
        queue.close();
      };

      // Consumer: Process items from queue
      const consumer = async (workerId: number) => {
        while (!queue.isClosed() || queue.size() > 0) {
          try {
            const item = await queue.dequeue(1000); // 1 second timeout
            if (!item) continue;

            const itemStartTime = Date.now();

            // Check circuit breaker
            if (enableCircuitBreaker && circuitBreakerOpen) {
              if (Date.now() < circuitBreakerResetTime) {
                stats.failedItems++;
                continue;
              } else {
                // Try to reset circuit breaker
                circuitBreakerOpen = false;
                consecutiveFailures = 0;
                console.log('🔄 Circuit breaker reset attempt');
              }
            }

            let result: R | null = null;
            let attempts = 0;
            let lastError: Error | null = null;

            // Retry loop
            while (attempts <= this.config.retryAttempts) {
              try {
                result = await this.processWithTimeout(processor, item, this.config.timeoutMs);
                consecutiveFailures = 0; // Reset on success
                break;

              } catch (error) {
                attempts++;
                lastError = error as Error;
                
                // Record error type
                const errorType = error instanceof Error ? error.constructor.name : 'Unknown';
                stats.errorsByType[errorType] = (stats.errorsByType[errorType] || 0) + 1;

                if (onError) {
                  onError(error as Error, item, attempts);
                }

                if (attempts <= this.config.retryAttempts && enableRetry) {
                  stats.retriedItems++;
                  console.log(`🔄 Retrying item ${itemIndex} (attempt ${attempts}/${this.config.retryAttempts})`);
                  
                  // Exponential backoff
                  const delay = this.config.retryDelayMs * Math.pow(2, attempts - 1);
                  await this.sleep(delay);
                } else {
                  consecutiveFailures++;
                  
                  // Check circuit breaker threshold
                  if (enableCircuitBreaker && consecutiveFailures >= this.config.circuitBreakerThreshold) {
                    circuitBreakerOpen = true;
                    circuitBreakerResetTime = Date.now() + 30000; // 30 seconds
                    stats.circuitBreakerTrips++;
                    console.warn(`🚨 Circuit breaker opened after ${consecutiveFailures} failures`);
                  }
                  
                  break;
                }
              }
            }

            const itemTime = Date.now() - itemStartTime;

            if (result !== null) {
              results.push(result);
              stats.processedItems++;
            } else {
              stats.failedItems++;
              console.error(`❌ Failed to process item ${itemIndex} after ${attempts} attempts:`, lastError?.message);
            }

            // Update progress
            const currentTime = Date.now();
            stats.totalTime = currentTime - startTime;
            stats.averageItemTime = stats.totalTime / (stats.processedItems + stats.failedItems);
            stats.throughput = stats.processedItems / (stats.totalTime / 1000);
            stats.memoryUsage = this.memoryOptimizer.getCurrentMemoryStats().heapUsed;

            if (onProgress && (stats.processedItems + stats.failedItems) % 10 === 0) {
              onProgress({ ...stats });
            }

            itemIndex++;

          } catch (error) {
            console.error(`❌ Consumer ${workerId} error:`, error);
          }
        }
      };

      // Start producer and consumers
      const producerPromise = producer();
      const consumerPromises = Array.from({ length: this.config.maxConcurrency }, (_, i) => 
        consumer(i)
      );

      // Wait for all to complete
      await Promise.all([producerPromise, ...consumerPromises]);

      stats.totalTime = Date.now() - startTime;
      stats.batchCount = Math.ceil(items.length / this.config.batchSize);

      console.log(`✅ Advanced batch processing completed: ${stats.processedItems}/${stats.totalItems} items processed`);
      
      return stats;

    } finally {
      this.isProcessing = false;
      this.memoryOptimizer.stopMonitoring();
      this.memoryOptimizer.forceGarbageCollection();
    }
  }

  /**
   * Process items with adaptive batch sizing based on performance
   */
  async processAdaptiveBatch<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    options?: {
      initialBatchSize?: number;
      minBatchSize?: number;
      maxBatchSize?: number;
      targetLatencyMs?: number;
      adaptationRate?: number;
    }
  ): Promise<ProcessingStats> {
    const {
      initialBatchSize = this.config.batchSize,
      minBatchSize = 1,
      maxBatchSize = 50,
      targetLatencyMs = 1000,
      adaptationRate = 0.1
    } = options || {};

    let currentBatchSize = initialBatchSize;
    let totalProcessed = 0;
    const results: R[] = [];
    const startTime = Date.now();

    const stats: ProcessingStats = {
      totalItems: items.length,
      processedItems: 0,
      failedItems: 0,
      retriedItems: 0,
      batchCount: 0,
      totalTime: 0,
      averageItemTime: 0,
      memoryUsage: 0,
      throughput: 0,
      backpressureEvents: 0,
      circuitBreakerTrips: 0,
      errorsByType: {},
      queueWaitTime: 0
    };

    console.log(`🎯 Starting adaptive batch processing with initial batch size: ${currentBatchSize}`);

    while (totalProcessed < items.length) {
      const batchStart = totalProcessed;
      const batchEnd = Math.min(totalProcessed + currentBatchSize, items.length);
      const batch = items.slice(batchStart, batchEnd);

      const batchStartTime = Date.now();

      try {
        // Process current batch
        const batchResults = await Promise.all(
          batch.map(async (item, index) => {
            try {
              return await processor(item);
            } catch (error) {
              stats.failedItems++;
              console.error(`❌ Error processing item ${batchStart + index}:`, error);
              return null;
            }
          })
        );

        // Filter out failed results
        const successfulResults = batchResults.filter((result): result is R => result !== null);
        results.push(...successfulResults);
        stats.processedItems += successfulResults.length;

        const batchTime = Date.now() - batchStartTime;
        const avgItemTime = batchTime / batch.length;

        // Adapt batch size based on performance
        if (avgItemTime < targetLatencyMs * 0.5) {
          // Too fast, increase batch size
          currentBatchSize = Math.min(maxBatchSize, Math.ceil(currentBatchSize * (1 + adaptationRate)));
          console.log(`📈 Increasing batch size to ${currentBatchSize} (fast processing: ${avgItemTime}ms/item)`);
        } else if (avgItemTime > targetLatencyMs) {
          // Too slow, decrease batch size
          currentBatchSize = Math.max(minBatchSize, Math.floor(currentBatchSize * (1 - adaptationRate)));
          console.log(`📉 Decreasing batch size to ${currentBatchSize} (slow processing: ${avgItemTime}ms/item)`);
        }

        stats.batchCount++;
        totalProcessed = batchEnd;

        // Update stats
        stats.totalTime = Date.now() - startTime;
        stats.averageItemTime = stats.totalTime / stats.processedItems;
        stats.throughput = stats.processedItems / (stats.totalTime / 1000);
        stats.memoryUsage = this.memoryOptimizer.getCurrentMemoryStats().heapUsed;

        console.log(`📦 Batch ${stats.batchCount} completed: ${batch.length} items in ${batchTime}ms (${Math.round(avgItemTime)}ms/item)`);

      } catch (error) {
        console.error(`❌ Batch processing error:`, error);
        stats.failedItems += batch.length;
        totalProcessed = batchEnd;
      }

      // Apply backpressure if needed
      if (this.config.enableBackpressure) {
        const memoryStats = this.memoryOptimizer.getCurrentMemoryStats();
        if (memoryStats.percentageUsed > this.config.backpressureThresholdPercent) {
          stats.backpressureEvents++;
          await this.waitForBackpressureRelief();
        }
      }
    }

    console.log(`✅ Adaptive batch processing completed with final batch size: ${currentBatchSize}`);
    return stats;
  }

  private async processWithTimeout<T, R>(
    processor: (item: T) => Promise<R>,
    item: T,
    timeoutMs: number
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Processing timeout after ${timeoutMs}ms`));
      }, timeoutMs);

      processor(item)
        .then(result => {
          clearTimeout(timeout);
          resolve(result);
        })
        .catch(error => {
          clearTimeout(timeout);
          reject(error);
        });
    });
  }

  private async waitForBackpressureRelief(): Promise<void> {
    const maxWaitTime = 10000; // 10 seconds max
    const checkInterval = 500; // Check every 500ms
    let waitTime = 0;

    while (waitTime < maxWaitTime) {
      const memoryStats = this.memoryOptimizer.getCurrentMemoryStats();
      
      if (memoryStats.percentageUsed < this.config.backpressureThresholdPercent * 0.8) {
        console.log(`✅ Backpressure relieved after ${waitTime}ms`);
        return;
      }

      // Force garbage collection
      this.memoryOptimizer.forceGarbageCollection();
      
      await this.sleep(checkInterval);
      waitTime += checkInterval;
    }

    console.warn(`⚠️  Backpressure relief timeout after ${maxWaitTime}ms`);
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get queue status
   */
  async getQueueStatus() {
    return this.taskQueue.getQueueStatus();
  }

  /**
   * Clear completed tasks
   */
  async clearCompletedTasks(maxAge?: number) {
    return this.taskQueue.clearCompletedTasks(maxAge);
  }
}

/**
 * Utility functions for batch processing
 */
export class BatchUtils {
  /**
   * Split array into chunks of specified size
   */
  static chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Process items with rate limiting
   */
  static async processWithRateLimit<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    rateLimit: number, // requests per second
    concurrency: number = 1
  ): Promise<R[]> {
    const delay = 1000 / rateLimit; // milliseconds between requests
    const results: R[] = [];
    const semaphore = new Semaphore(concurrency);

    const processItem = async (item: T, index: number): Promise<void> => {
      await semaphore.acquire(async () => {
        // Apply rate limiting delay
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        try {
          const result = await processor(item);
          results[index] = result;
        } catch (error) {
          console.error(`Error processing item ${index}:`, error);
          throw error;
        }
      });
    };

    // Process all items
    await Promise.all(items.map(processItem));
    
    return results;
  }

  /**
   * Calculate optimal batch size based on item size and memory constraints
   */
  static calculateOptimalBatchSize(
    itemSizeBytes: number,
    memoryLimitMB: number,
    safetyFactor: number = 0.5
  ): number {
    const memoryLimitBytes = memoryLimitMB * 1024 * 1024;
    const availableMemory = memoryLimitBytes * safetyFactor;
    const optimalBatchSize = Math.floor(availableMemory / itemSizeBytes);
    
    // Ensure minimum batch size of 1 and maximum of 100
    return Math.max(1, Math.min(100, optimalBatchSize));
  }

  /**
   * Estimate processing time based on historical data
   */
  static estimateProcessingTime(
    itemCount: number,
    averageItemTimeMs: number,
    batchSize: number,
    concurrency: number
  ): number {
    const totalBatches = Math.ceil(itemCount / batchSize);
    const batchesPerConcurrentGroup = Math.ceil(totalBatches / concurrency);
    const estimatedTime = batchesPerConcurrentGroup * averageItemTimeMs * batchSize;
    
    return estimatedTime;
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

/**
 * Advanced Queue with backpressure support
 */
class AdvancedQueue<T> {
  private items: T[] = [];
  private waitingConsumers: Array<{
    resolve: (item: T | null) => void;
    timeout: NodeJS.Timeout;
  }> = [];
  private closed = false;
  private maxSize: number;

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
  }

  async enqueue(item: T): Promise<void> {
    if (this.closed) {
      throw new Error('Queue is closed');
    }

    // Apply backpressure if queue is full
    while (this.items.length >= this.maxSize) {
      await this.sleep(10); // Wait 10ms before retrying
    }

    // If there are waiting consumers, serve them directly
    if (this.waitingConsumers.length > 0) {
      const consumer = this.waitingConsumers.shift()!;
      clearTimeout(consumer.timeout);
      consumer.resolve(item);
      return;
    }

    this.items.push(item);
  }

  async dequeue(timeoutMs: number = 0): Promise<T | null> {
    // If items are available, return immediately
    if (this.items.length > 0) {
      return this.items.shift()!;
    }

    // If queue is closed and empty, return null
    if (this.closed) {
      return null;
    }

    // Wait for an item with optional timeout
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        // Remove from waiting list
        const index = this.waitingConsumers.findIndex(c => c.resolve === resolve);
        if (index >= 0) {
          this.waitingConsumers.splice(index, 1);
        }
        resolve(null);
      }, timeoutMs);

      this.waitingConsumers.push({ resolve, timeout });
    });
  }

  size(): number {
    return this.items.length;
  }

  isClosed(): boolean {
    return this.closed;
  }

  close(): void {
    this.closed = true;
    
    // Resolve all waiting consumers with null
    while (this.waitingConsumers.length > 0) {
      const consumer = this.waitingConsumers.shift()!;
      clearTimeout(consumer.timeout);
      consumer.resolve(null);
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const batchProcessor = new BatchProcessor();