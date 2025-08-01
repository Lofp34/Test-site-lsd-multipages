// Memory Optimizer for Vercel Functions
// Implements streaming processing, garbage collection, and memory monitoring

export interface MemoryStats {
  heapUsed: number;
  heapTotal: number;
  external: number;
  rss: number;
  arrayBuffers: number;
  percentageUsed: number;
}

export interface MemoryOptimizerConfig {
  memoryLimitMB: number;
  warningThresholdPercent: number;
  criticalThresholdPercent: number;
  gcThresholdPercent: number;
  monitoringIntervalMs: number;
  enableAutoGC: boolean;
  enableStreaming: boolean;
  streamChunkSize: number;
}

export class MemoryOptimizer {
  private config: MemoryOptimizerConfig;
  private monitoringTimer: NodeJS.Timer | null = null;
  private memoryHistory: MemoryStats[] = [];
  private maxHistorySize = 100;
  private isMonitoring = false;

  constructor(config?: Partial<MemoryOptimizerConfig>) {
    this.config = {
      memoryLimitMB: 512,
      warningThresholdPercent: 70,
      criticalThresholdPercent: 85,
      gcThresholdPercent: 80,
      monitoringIntervalMs: 5000,
      enableAutoGC: true,
      enableStreaming: true,
      streamChunkSize: 1000,
      ...config
    };
  }

  /**
   * Get current memory statistics
   */
  getCurrentMemoryStats(): MemoryStats {
    const usage = process.memoryUsage();
    const heapUsedMB = usage.heapUsed / 1024 / 1024;
    const percentageUsed = (heapUsedMB / this.config.memoryLimitMB) * 100;

    return {
      heapUsed: Math.round(heapUsedMB),
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
      external: Math.round(usage.external / 1024 / 1024),
      rss: Math.round(usage.rss / 1024 / 1024),
      arrayBuffers: Math.round(usage.arrayBuffers / 1024 / 1024),
      percentageUsed: Math.round(percentageUsed * 100) / 100
    };
  }

  /**
   * Start memory monitoring
   */
  startMonitoring(): void {
    if (this.isMonitoring) {
      return;
    }

    this.isMonitoring = true;
    this.monitoringTimer = setInterval(() => {
      const stats = this.getCurrentMemoryStats();
      this.addToHistory(stats);
      this.checkMemoryThresholds(stats);
    }, this.config.monitoringIntervalMs);

    console.log(`🔍 Memory monitoring started (limit: ${this.config.memoryLimitMB}MB)`);
  }

  /**
   * Stop memory monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
      this.monitoringTimer = null;
    }
    this.isMonitoring = false;
    console.log('🔍 Memory monitoring stopped');
  }

  /**
   * Force garbage collection if available
   */
  forceGarbageCollection(): boolean {
    if (global.gc) {
      const beforeStats = this.getCurrentMemoryStats();
      global.gc();
      const afterStats = this.getCurrentMemoryStats();
      
      const memoryFreed = beforeStats.heapUsed - afterStats.heapUsed;
      console.log(`🗑️  Garbage collection: freed ${memoryFreed}MB (${beforeStats.heapUsed}MB → ${afterStats.heapUsed}MB)`);
      
      return memoryFreed > 0;
    }
    
    console.warn('⚠️  Garbage collection not available (run with --expose-gc flag)');
    return false;
  }

  /**
   * Check if memory usage is within safe limits
   */
  isMemorySafe(): boolean {
    const stats = this.getCurrentMemoryStats();
    return stats.percentageUsed < this.config.criticalThresholdPercent;
  }

  /**
   * Wait for memory to be freed up
   */
  async waitForMemoryRelease(timeoutMs: number = 10000): Promise<boolean> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeoutMs) {
      if (this.isMemorySafe()) {
        return true;
      }
      
      // Try garbage collection
      if (this.config.enableAutoGC) {
        this.forceGarbageCollection();
      }
      
      // Wait a bit before checking again
      await this.sleep(1000);
    }
    
    return false;
  }

  /**
   * Process large dataset with streaming to minimize memory usage
   */
  async *streamProcess<T, R>(
    items: T[],
    processor: (chunk: T[]) => Promise<R[]>,
    chunkSize?: number
  ): AsyncGenerator<R[], void, unknown> {
    const actualChunkSize = chunkSize || this.config.streamChunkSize;
    
    for (let i = 0; i < items.length; i += actualChunkSize) {
      // Check memory before processing chunk
      if (!this.isMemorySafe()) {
        console.log('⚠️  Memory threshold reached, waiting for release...');
        const released = await this.waitForMemoryRelease();
        if (!released) {
          throw new Error('Memory limit exceeded and could not be released');
        }
      }
      
      const chunk = items.slice(i, i + actualChunkSize);
      console.log(`📦 Processing chunk ${Math.floor(i / actualChunkSize) + 1}/${Math.ceil(items.length / actualChunkSize)} (${chunk.length} items)`);
      
      try {
        const results = await processor(chunk);
        yield results;
        
        // Force GC after each chunk if enabled
        if (this.config.enableAutoGC && this.getCurrentMemoryStats().percentageUsed > this.config.gcThresholdPercent) {
          this.forceGarbageCollection();
        }
        
      } catch (error) {
        console.error(`❌ Error processing chunk starting at index ${i}:`, error);
        throw error;
      }
    }
  }

  /**
   * Process items with memory-aware batching
   */
  async processWithMemoryControl<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    options?: {
      maxConcurrency?: number;
      memoryCheckInterval?: number;
    }
  ): Promise<R[]> {
    const { maxConcurrency = 3, memoryCheckInterval = 10 } = options || {};
    const results: R[] = [];
    let processed = 0;
    
    // Process items in controlled batches
    for (let i = 0; i < items.length; i += maxConcurrency) {
      // Memory check every N items
      if (processed % memoryCheckInterval === 0) {
        if (!this.isMemorySafe()) {
          console.log('⚠️  Memory threshold reached, applying backpressure...');
          const released = await this.waitForMemoryRelease();
          if (!released) {
            throw new Error('Memory limit exceeded during processing');
          }
        }
      }
      
      const batch = items.slice(i, i + maxConcurrency);
      const batchPromises = batch.map(processor);
      
      try {
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        processed += batch.length;
        
        console.log(`✅ Processed ${processed}/${items.length} items (${Math.round((processed / items.length) * 100)}%)`);
        
      } catch (error) {
        console.error(`❌ Error processing batch starting at index ${i}:`, error);
        throw error;
      }
    }
    
    return results;
  }

  /**
   * Get memory usage trend
   */
  getMemoryTrend(): {
    current: MemoryStats;
    average: number;
    peak: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  } {
    const current = this.getCurrentMemoryStats();
    
    if (this.memoryHistory.length < 2) {
      return {
        current,
        average: current.percentageUsed,
        peak: current.percentageUsed,
        trend: 'stable'
      };
    }
    
    const recent = this.memoryHistory.slice(-10);
    const average = recent.reduce((sum, stat) => sum + stat.percentageUsed, 0) / recent.length;
    const peak = Math.max(...this.memoryHistory.map(stat => stat.percentageUsed));
    
    // Determine trend
    const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
    const secondHalf = recent.slice(Math.floor(recent.length / 2));
    const firstAvg = firstHalf.reduce((sum, stat) => sum + stat.percentageUsed, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, stat) => sum + stat.percentageUsed, 0) / secondHalf.length;
    
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    const difference = secondAvg - firstAvg;
    if (Math.abs(difference) > 5) {
      trend = difference > 0 ? 'increasing' : 'decreasing';
    }
    
    return {
      current,
      average: Math.round(average * 100) / 100,
      peak: Math.round(peak * 100) / 100,
      trend
    };
  }

  /**
   * Create memory-optimized buffer for large data processing
   */
  createOptimizedBuffer<T>(
    data: T[],
    options?: {
      maxBufferSize?: number;
      preloadSize?: number;
    }
  ): OptimizedBuffer<T> {
    return new OptimizedBuffer(data, {
      maxBufferSize: options?.maxBufferSize || 100,
      preloadSize: options?.preloadSize || 10,
      memoryOptimizer: this
    });
  }

  private addToHistory(stats: MemoryStats): void {
    this.memoryHistory.push(stats);
    if (this.memoryHistory.length > this.maxHistorySize) {
      this.memoryHistory.shift();
    }
  }

  private checkMemoryThresholds(stats: MemoryStats): void {
    if (stats.percentageUsed >= this.config.criticalThresholdPercent) {
      console.error(`🚨 CRITICAL: Memory usage at ${stats.percentageUsed}% (${stats.heapUsed}MB/${this.config.memoryLimitMB}MB)`);
      
      if (this.config.enableAutoGC) {
        this.forceGarbageCollection();
      }
      
    } else if (stats.percentageUsed >= this.config.warningThresholdPercent) {
      console.warn(`⚠️  WARNING: Memory usage at ${stats.percentageUsed}% (${stats.heapUsed}MB/${this.config.memoryLimitMB}MB)`);
      
      if (this.config.enableAutoGC && stats.percentageUsed >= this.config.gcThresholdPercent) {
        this.forceGarbageCollection();
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Optimized buffer for processing large datasets with memory constraints
 */
class OptimizedBuffer<T> {
  private data: T[];
  private currentIndex = 0;
  private buffer: T[] = [];
  private config: {
    maxBufferSize: number;
    preloadSize: number;
    memoryOptimizer: MemoryOptimizer;
  };

  constructor(data: T[], config: {
    maxBufferSize: number;
    preloadSize: number;
    memoryOptimizer: MemoryOptimizer;
  }) {
    this.data = data;
    this.config = config;
    this.preloadBuffer();
  }

  /**
   * Get next batch of items
   */
  async getNext(count: number = 1): Promise<T[]> {
    // Check if we need to preload more data
    if (this.buffer.length < count && this.hasMore()) {
      await this.preloadBuffer();
    }
    
    const items = this.buffer.splice(0, count);
    return items;
  }

  /**
   * Check if there are more items available
   */
  hasMore(): boolean {
    return this.currentIndex < this.data.length || this.buffer.length > 0;
  }

  /**
   * Get remaining item count
   */
  getRemainingCount(): number {
    return (this.data.length - this.currentIndex) + this.buffer.length;
  }

  /**
   * Get progress percentage
   */
  getProgress(): number {
    const processed = this.currentIndex - this.buffer.length;
    return Math.round((processed / this.data.length) * 100);
  }

  private async preloadBuffer(): Promise<void> {
    // Check memory before preloading
    if (!this.config.memoryOptimizer.isMemorySafe()) {
      console.log('⚠️  Memory threshold reached, waiting before preloading buffer...');
      await this.config.memoryOptimizer.waitForMemoryRelease();
    }
    
    const itemsToLoad = Math.min(
      this.config.preloadSize,
      this.data.length - this.currentIndex,
      this.config.maxBufferSize - this.buffer.length
    );
    
    if (itemsToLoad > 0) {
      const newItems = this.data.slice(this.currentIndex, this.currentIndex + itemsToLoad);
      this.buffer.push(...newItems);
      this.currentIndex += itemsToLoad;
    }
  }
}

// Export singleton instance
export const memoryOptimizer = new MemoryOptimizer();

// Utility functions
export const MemoryUtils = {
  /**
   * Calculate memory usage of an object (approximate)
   */
  calculateObjectSize(obj: any): number {
    const jsonString = JSON.stringify(obj);
    return new Blob([jsonString]).size;
  },

  /**
   * Create memory-efficient iterator for large arrays
   */
  createMemoryEfficientIterator<T>(
    array: T[],
    chunkSize: number = 100
  ): AsyncGenerator<T[], void, unknown> {
    return memoryOptimizer.streamProcess(
      array,
      async (chunk) => chunk,
      chunkSize
    );
  },

  /**
   * Monitor function execution memory usage
   */
  async monitorExecution<T>(
    fn: () => Promise<T>,
    label: string = 'Function'
  ): Promise<{ result: T; memoryDelta: number; peakMemory: number }> {
    const startStats = memoryOptimizer.getCurrentMemoryStats();
    let peakMemory = startStats.heapUsed;
    
    // Monitor memory during execution
    const monitor = setInterval(() => {
      const currentMemory = memoryOptimizer.getCurrentMemoryStats().heapUsed;
      if (currentMemory > peakMemory) {
        peakMemory = currentMemory;
      }
    }, 100);
    
    try {
      const result = await fn();
      const endStats = memoryOptimizer.getCurrentMemoryStats();
      const memoryDelta = endStats.heapUsed - startStats.heapUsed;
      
      console.log(`📊 ${label} memory usage: ${memoryDelta > 0 ? '+' : ''}${memoryDelta}MB (peak: ${peakMemory}MB)`);
      
      return {
        result,
        memoryDelta,
        peakMemory
      };
      
    } finally {
      clearInterval(monitor);
    }
  }
};