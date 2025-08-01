// Streaming Processor for Large Dataset Processing
// Implements memory-efficient streaming with backpressure control

import { memoryOptimizer, MemoryOptimizer } from './memory-optimizer';

export interface StreamingConfig {
  chunkSize: number;
  maxConcurrency: number;
  memoryLimitMB: number;
  enableBackpressure: boolean;
  backpressureThresholdPercent: number;
  retryAttempts: number;
  retryDelayMs: number;
}

export interface StreamingStats {
  totalItems: number;
  processedItems: number;
  failedItems: number;
  chunksProcessed: number;
  totalChunks: number;
  averageChunkTime: number;
  throughput: number; // items per second
  memoryUsage: {
    peak: number;
    average: number;
    current: number;
  };
  errors: Array<{
    chunkIndex: number;
    error: string;
    timestamp: Date;
  }>;
}

export class StreamingProcessor {
  private config: StreamingConfig;
  private memoryOptimizer: MemoryOptimizer;
  private stats: StreamingStats;
  private isProcessing = false;

  constructor(config?: Partial<StreamingConfig>) {
    this.config = {
      chunkSize: 50,
      maxConcurrency: 3,
      memoryLimitMB: 512,
      enableBackpressure: true,
      backpressureThresholdPercent: 75,
      retryAttempts: 2,
      retryDelayMs: 1000,
      ...config
    };

    this.memoryOptimizer = new MemoryOptimizer({
      memoryLimitMB: this.config.memoryLimitMB,
      enableAutoGC: true,
      enableStreaming: true,
      streamChunkSize: this.config.chunkSize
    });

    this.resetStats();
  }

  /**
   * Process large dataset with streaming and memory optimization
   */
  async processStream<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    options?: {
      onProgress?: (stats: StreamingStats) => void;
      onChunkComplete?: (chunkIndex: number, results: R[]) => void;
      onError?: (error: Error, chunkIndex: number) => void;
    }
  ): Promise<R[]> {
    if (this.isProcessing) {
      throw new Error('StreamingProcessor is already processing');
    }

    this.isProcessing = true;
    this.resetStats();
    this.stats.totalItems = items.length;
    this.stats.totalChunks = Math.ceil(items.length / this.config.chunkSize);

    const startTime = Date.now();
    const results: R[] = [];
    let memoryPeak = 0;
    let memorySum = 0;
    let memoryReadings = 0;

    try {
      // Start memory monitoring
      this.memoryOptimizer.startMonitoring();

      // Process items using streaming
      let chunkIndex = 0;
      for await (const chunkResults of this.memoryOptimizer.streamProcess(
        items,
        async (chunk: T[]) => this.processChunk(chunk, processor, chunkIndex++),
        this.config.chunkSize
      )) {
        results.push(...chunkResults);
        this.stats.processedItems += chunkResults.length;
        this.stats.chunksProcessed++;

        // Update memory stats
        const currentMemory = this.memoryOptimizer.getCurrentMemoryStats();
        if (currentMemory.heapUsed > memoryPeak) {
          memoryPeak = currentMemory.heapUsed;
        }
        memorySum += currentMemory.heapUsed;
        memoryReadings++;

        // Calculate progress stats
        const elapsedTime = Date.now() - startTime;
        this.stats.averageChunkTime = elapsedTime / this.stats.chunksProcessed;
        this.stats.throughput = this.stats.processedItems / (elapsedTime / 1000);

        // Update memory usage stats
        this.stats.memoryUsage = {
          peak: memoryPeak,
          average: Math.round(memorySum / memoryReadings),
          current: currentMemory.heapUsed
        };

        // Call progress callback
        if (options?.onProgress) {
          options.onProgress({ ...this.stats });
        }

        // Call chunk complete callback
        if (options?.onChunkComplete) {
          options.onChunkComplete(chunkIndex - 1, chunkResults);
        }

        // Apply backpressure if needed
        if (this.config.enableBackpressure) {
          await this.applyBackpressureIfNeeded();
        }
      }

      console.log(`✅ Streaming processing completed: ${this.stats.processedItems}/${this.stats.totalItems} items processed`);
      return results;

    } catch (error) {
      console.error('❌ Streaming processing failed:', error);
      if (options?.onError) {
        options.onError(error as Error, this.stats.chunksProcessed);
      }
      throw error;

    } finally {
      this.memoryOptimizer.stopMonitoring();
      this.isProcessing = false;
    }
  }

  /**
   * Process items with streaming and write results to a callback
   * This is memory-efficient for very large datasets where keeping all results in memory is not feasible
   */
  async processStreamWithCallback<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    resultCallback: (results: R[], chunkIndex: number) => Promise<void>,
    options?: {
      onProgress?: (stats: StreamingStats) => void;
      onError?: (error: Error, chunkIndex: number) => void;
    }
  ): Promise<StreamingStats> {
    if (this.isProcessing) {
      throw new Error('StreamingProcessor is already processing');
    }

    this.isProcessing = true;
    this.resetStats();
    this.stats.totalItems = items.length;
    this.stats.totalChunks = Math.ceil(items.length / this.config.chunkSize);

    const startTime = Date.now();
    let memoryPeak = 0;
    let memorySum = 0;
    let memoryReadings = 0;

    try {
      // Start memory monitoring
      this.memoryOptimizer.startMonitoring();

      // Process items using streaming
      let chunkIndex = 0;
      for await (const chunkResults of this.memoryOptimizer.streamProcess(
        items,
        async (chunk: T[]) => this.processChunk(chunk, processor, chunkIndex++),
        this.config.chunkSize
      )) {
        // Write results using callback instead of accumulating in memory
        await resultCallback(chunkResults, chunkIndex - 1);

        this.stats.processedItems += chunkResults.length;
        this.stats.chunksProcessed++;

        // Update memory stats
        const currentMemory = this.memoryOptimizer.getCurrentMemoryStats();
        if (currentMemory.heapUsed > memoryPeak) {
          memoryPeak = currentMemory.heapUsed;
        }
        memorySum += currentMemory.heapUsed;
        memoryReadings++;

        // Calculate progress stats
        const elapsedTime = Date.now() - startTime;
        this.stats.averageChunkTime = elapsedTime / this.stats.chunksProcessed;
        this.stats.throughput = this.stats.processedItems / (elapsedTime / 1000);

        // Update memory usage stats
        this.stats.memoryUsage = {
          peak: memoryPeak,
          average: Math.round(memorySum / memoryReadings),
          current: currentMemory.heapUsed
        };

        // Call progress callback
        if (options?.onProgress) {
          options.onProgress({ ...this.stats });
        }

        // Apply backpressure if needed
        if (this.config.enableBackpressure) {
          await this.applyBackpressureIfNeeded();
        }
      }

      console.log(`✅ Streaming processing with callback completed: ${this.stats.processedItems}/${this.stats.totalItems} items processed`);
      return { ...this.stats };

    } catch (error) {
      console.error('❌ Streaming processing with callback failed:', error);
      if (options?.onError) {
        options.onError(error as Error, this.stats.chunksProcessed);
      }
      throw error;

    } finally {
      this.memoryOptimizer.stopMonitoring();
      this.isProcessing = false;
    }
  }

  /**
   * Create a readable stream for processing large datasets
   */
  createReadableStream<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>
  ): ReadableStream<R[]> {
    let chunkIndex = 0;
    const chunks = this.chunkArray(items, this.config.chunkSize);
    
    return new ReadableStream({
      start: () => {
        this.memoryOptimizer.startMonitoring();
      },
      
      pull: async (controller) => {
        try {
          if (chunkIndex >= chunks.length) {
            controller.close();
            this.memoryOptimizer.stopMonitoring();
            return;
          }

          // Apply backpressure if needed
          if (this.config.enableBackpressure) {
            await this.applyBackpressureIfNeeded();
          }

          const chunk = chunks[chunkIndex];
          const results = await this.processChunk(chunk, processor, chunkIndex);
          
          controller.enqueue(results);
          chunkIndex++;

        } catch (error) {
          controller.error(error);
          this.memoryOptimizer.stopMonitoring();
        }
      },
      
      cancel: () => {
        this.memoryOptimizer.stopMonitoring();
      }
    });
  }

  /**
   * Get current processing statistics
   */
  getStats(): StreamingStats {
    return { ...this.stats };
  }

  /**
   * Check if processor is currently running
   */
  isRunning(): boolean {
    return this.isProcessing;
  }

  private async processChunk<T, R>(
    chunk: T[],
    processor: (item: T) => Promise<R>,
    chunkIndex: number
  ): Promise<R[]> {
    const chunkStartTime = Date.now();
    
    try {
      // Process items in the chunk with controlled concurrency
      const results = await this.processWithConcurrency(chunk, processor);
      
      const chunkTime = Date.now() - chunkStartTime;
      console.log(`📦 Chunk ${chunkIndex + 1} completed: ${chunk.length} items in ${chunkTime}ms`);
      
      return results;

    } catch (error) {
      console.error(`❌ Error processing chunk ${chunkIndex}:`, error);
      
      // Record error in stats
      this.stats.errors.push({
        chunkIndex,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date()
      });
      
      this.stats.failedItems += chunk.length;
      
      // Retry if configured
      if (this.config.retryAttempts > 0) {
        console.log(`🔄 Retrying chunk ${chunkIndex} (${this.config.retryAttempts} attempts remaining)...`);
        await this.sleep(this.config.retryDelayMs);
        
        // Recursive retry with reduced attempts
        const retryProcessor = new StreamingProcessor({
          ...this.config,
          retryAttempts: this.config.retryAttempts - 1
        });
        
        return retryProcessor.processChunk(chunk, processor, chunkIndex);
      }
      
      throw error;
    }
  }

  private async processWithConcurrency<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>
  ): Promise<R[]> {
    const results: R[] = [];
    const semaphore = new Semaphore(this.config.maxConcurrency);

    const processItem = async (item: T, index: number): Promise<void> => {
      await semaphore.acquire(async () => {
        try {
          const result = await processor(item);
          results[index] = result;
        } catch (error) {
          console.error(`Error processing item ${index}:`, error);
          throw error;
        }
      });
    };

    await Promise.all(items.map(processItem));
    return results;
  }

  private async applyBackpressureIfNeeded(): Promise<void> {
    const memoryStats = this.memoryOptimizer.getCurrentMemoryStats();
    
    if (memoryStats.percentageUsed > this.config.backpressureThresholdPercent) {
      console.log(`⏸️  Applying backpressure: memory at ${memoryStats.percentageUsed}%`);
      
      // Wait for memory to be released
      const released = await this.memoryOptimizer.waitForMemoryRelease(5000);
      if (!released) {
        console.warn('⚠️  Backpressure timeout: continuing with high memory usage');
      }
    }
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  private resetStats(): void {
    this.stats = {
      totalItems: 0,
      processedItems: 0,
      failedItems: 0,
      chunksProcessed: 0,
      totalChunks: 0,
      averageChunkTime: 0,
      throughput: 0,
      memoryUsage: {
        peak: 0,
        average: 0,
        current: 0
      },
      errors: []
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
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
export const streamingProcessor = new StreamingProcessor();

// Utility functions for streaming operations
export const StreamingUtils = {
  /**
   * Create a memory-efficient map operation for large arrays
   */
  async streamMap<T, R>(
    items: T[],
    mapper: (item: T) => Promise<R>,
    options?: {
      chunkSize?: number;
      maxConcurrency?: number;
      onProgress?: (processed: number, total: number) => void;
    }
  ): Promise<R[]> {
    const processor = new StreamingProcessor({
      chunkSize: options?.chunkSize || 50,
      maxConcurrency: options?.maxConcurrency || 3
    });

    return processor.processStream(items, mapper, {
      onProgress: (stats) => {
        if (options?.onProgress) {
          options.onProgress(stats.processedItems, stats.totalItems);
        }
      }
    });
  },

  /**
   * Create a memory-efficient filter operation for large arrays
   */
  async streamFilter<T>(
    items: T[],
    predicate: (item: T) => Promise<boolean>,
    options?: {
      chunkSize?: number;
      maxConcurrency?: number;
    }
  ): Promise<T[]> {
    const processor = new StreamingProcessor({
      chunkSize: options?.chunkSize || 100,
      maxConcurrency: options?.maxConcurrency || 3
    });

    const results: T[] = [];
    
    await processor.processStreamWithCallback(
      items,
      async (item: T) => {
        const shouldInclude = await predicate(item);
        return shouldInclude ? item : null;
      },
      async (chunkResults: (T | null)[]) => {
        const filtered = chunkResults.filter((item): item is T => item !== null);
        results.push(...filtered);
      }
    );

    return results;
  },

  /**
   * Process items and write results to a file or database to avoid memory accumulation
   */
  async streamToSink<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    sink: (results: R[]) => Promise<void>,
    options?: {
      chunkSize?: number;
      maxConcurrency?: number;
      onProgress?: (processed: number, total: number) => void;
    }
  ): Promise<void> {
    const streamProcessor = new StreamingProcessor({
      chunkSize: options?.chunkSize || 50,
      maxConcurrency: options?.maxConcurrency || 3
    });

    await streamProcessor.processStreamWithCallback(
      items,
      processor,
      sink,
      {
        onProgress: (stats) => {
          if (options?.onProgress) {
            options.onProgress(stats.processedItems, stats.totalItems);
          }
        }
      }
    );
  }
};