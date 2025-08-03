// CPU Optimizer for Vercel Functions
// Implements CPU usage monitoring, optimization techniques, and performance profiling

export interface CPUStats {
  cpuUsage: number; // Percentage
  userTime: number; // Microseconds
  systemTime: number; // Microseconds
  totalTime: number; // Microseconds
  timestamp: Date;
}

export interface CPUOptimizerConfig {
  enableProfiling: boolean;
  enableOptimizations: boolean;
  maxCPUUsagePercent: number;
  profilingIntervalMs: number;
  optimizationThresholdPercent: number;
  enableCaching: boolean;
  enableMemoization: boolean;
}

export interface PerformanceProfile {
  functionName: string;
  executionTime: number;
  cpuTime: number;
  callCount: number;
  averageTime: number;
  lastExecuted: Date;
  optimizationApplied: boolean;
}

export class CPUOptimizer {
  private config: CPUOptimizerConfig;
  private profiles = new Map<string, PerformanceProfile>();
  private memoCache = new Map<string, { result: any; timestamp: number; ttl: number }>();
  private cpuHistory: CPUStats[] = [];
  private profilingTimer: NodeJS.Timer | null = null;
  private isMonitoring = false;

  constructor(config?: Partial<CPUOptimizerConfig>) {
    this.config = {
      enableProfiling: true,
      enableOptimizations: true,
      maxCPUUsagePercent: 80,
      profilingIntervalMs: 1000,
      optimizationThresholdPercent: 70,
      enableCaching: true,
      enableMemoization: true,
      ...config
    };
  }

  /**
   * Get current CPU usage statistics
   */
  getCurrentCPUStats(): CPUStats {
    const usage = process.cpuUsage();
    const totalTime = usage.user + usage.system;
    const cpuUsage = this.calculateCPUPercentage(usage);

    return {
      cpuUsage,
      userTime: usage.user,
      systemTime: usage.system,
      totalTime,
      timestamp: new Date()
    };
  }

  /**
   * Start CPU monitoring
   */
  startMonitoring(): void {
    if (this.isMonitoring) {
      return;
    }

    this.isMonitoring = true;
    this.profilingTimer = setInterval(() => {
      const stats = this.getCurrentCPUStats();
      this.addToHistory(stats);
      this.checkCPUThresholds(stats);
    }, this.config.profilingIntervalMs);

    console.log(`🔍 CPU monitoring started (max usage: ${this.config.maxCPUUsagePercent}%)`);
  }

  /**
   * Stop CPU monitoring
   */
  stopMonitoring(): void {
    if (this.profilingTimer) {
      clearInterval(this.profilingTimer);
      this.profilingTimer = null;
    }
    this.isMonitoring = false;
    console.log('🔍 CPU monitoring stopped');
  }

  /**
   * Profile function execution
   */
  async profileFunction<T>(
    functionName: string,
    fn: () => Promise<T> | T,
    options?: {
      enableMemoization?: boolean;
      memoTTL?: number;
      enableOptimization?: boolean;
    }
  ): Promise<T> {
    const {
      enableMemoization = this.config.enableMemoization,
      memoTTL = 300000, // 5 minutes
      enableOptimization = this.config.enableOptimizations
    } = options || {};

    // Check memoization cache first
    if (enableMemoization) {
      const cached = this.getMemoizedResult(functionName);
      if (cached) {
        console.log(`💾 Using memoized result for ${functionName}`);
        return cached;
      }
    }

    const startTime = Date.now();
    const startCPU = process.cpuUsage();

    try {
      // Apply CPU optimizations if enabled
      if (enableOptimization) {
        await this.applyCPUOptimizations();
      }

      const result = await fn();
      const executionTime = Date.now() - startTime;
      const cpuUsage = process.cpuUsage(startCPU);
      const cpuTime = cpuUsage.user + cpuUsage.system;

      // Update performance profile
      this.updateProfile(functionName, executionTime, cpuTime);

      // Cache result if memoization is enabled
      if (enableMemoization) {
        this.memoizeResult(functionName, result, memoTTL);
      }

      console.log(`⚡ ${functionName} executed in ${executionTime}ms (CPU: ${(cpuTime / 1000).toFixed(2)}ms)`);
      return result;

    } catch (error) {
      console.error(`❌ Error profiling function ${functionName}:`, error);
      throw error;
    }
  }

  /**
   * Create an optimized version of a function with automatic profiling
   */
  optimize<T extends (...args: any[]) => any>(
    functionName: string,
    fn: T,
    options?: {
      enableMemoization?: boolean;
      memoTTL?: number;
      enableBatching?: boolean;
      batchSize?: number;
      batchDelayMs?: number;
    }
  ): T {
    const {
      enableMemoization = true,
      memoTTL = 300000,
      enableBatching = false,
      batchSize = 10,
      batchDelayMs = 100
    } = options || {};

    let batchQueue: Array<{ args: Parameters<T>; resolve: Function; reject: Function }> = [];
    let batchTimer: NodeJS.Timeout | null = null;

    const optimizedFunction = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      // Handle batching if enabled
      if (enableBatching) {
        return new Promise((resolve, reject) => {
          batchQueue.push({ args, resolve, reject });

          if (batchQueue.length >= batchSize) {
            this.processBatch(functionName, fn, batchQueue);
            batchQueue = [];
            if (batchTimer) {
              clearTimeout(batchTimer);
              batchTimer = null;
            }
          } else if (!batchTimer) {
            batchTimer = setTimeout(() => {
              if (batchQueue.length > 0) {
                this.processBatch(functionName, fn, batchQueue);
                batchQueue = [];
              }
              batchTimer = null;
            }, batchDelayMs);
          }
        });
      }

      // Regular optimized execution
      return this.profileFunction(
        functionName,
        () => fn(...args),
        { enableMemoization, memoTTL }
      );
    };

    return optimizedFunction as T;
  }

  /**
   * Get performance profiles for all functions
   */
  getProfiles(): PerformanceProfile[] {
    return Array.from(this.profiles.values());
  }

  /**
   * Get CPU usage trend
   */
  getCPUTrend(): {
    current: CPUStats;
    average: number;
    peak: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  } {
    const current = this.getCurrentCPUStats();

    if (this.cpuHistory.length < 2) {
      return {
        current,
        average: current.cpuUsage,
        peak: current.cpuUsage,
        trend: 'stable'
      };
    }

    const recent = this.cpuHistory.slice(-10);
    const average = recent.reduce((sum, stat) => sum + stat.cpuUsage, 0) / recent.length;
    const peak = Math.max(...this.cpuHistory.map(stat => stat.cpuUsage));

    // Determine trend
    const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
    const secondHalf = recent.slice(Math.floor(recent.length / 2));
    const firstAvg = firstHalf.reduce((sum, stat) => sum + stat.cpuUsage, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, stat) => sum + stat.cpuUsage, 0) / secondHalf.length;

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
   * Clear memoization cache
   */
  clearMemoCache(): void {
    this.memoCache.clear();
    console.log('🗑️  Memoization cache cleared');
  }

  /**
   * Get optimization recommendations
   */
  getOptimizationRecommendations(): Array<{
    functionName: string;
    issue: string;
    recommendation: string;
    priority: 'high' | 'medium' | 'low';
  }> {
    const recommendations = [];
    const profiles = this.getProfiles();

    for (const profile of profiles) {
      // Slow function detection
      if (profile.averageTime > 5000) { // 5 seconds
        recommendations.push({
          functionName: profile.functionName,
          issue: `Slow execution time: ${profile.averageTime}ms average`,
          recommendation: 'Consider breaking into smaller functions or optimizing algorithm',
          priority: 'high' as const
        });
      }

      // High CPU usage detection
      if (profile.cpuTime > profile.executionTime * 0.8) {
        recommendations.push({
          functionName: profile.functionName,
          issue: 'High CPU usage relative to execution time',
          recommendation: 'Consider caching results or reducing computational complexity',
          priority: 'medium' as const
        });
      }

      // Frequent calls detection
      if (profile.callCount > 100 && !profile.optimizationApplied) {
        recommendations.push({
          functionName: profile.functionName,
          issue: `Frequently called function: ${profile.callCount} calls`,
          recommendation: 'Consider memoization or result caching',
          priority: 'medium' as const
        });
      }
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private calculateCPUPercentage(usage: NodeJS.CpuUsage): number {
    // This is a simplified calculation
    // In a real scenario, you'd need to track over time intervals
    const totalTime = usage.user + usage.system;
    return Math.min(100, (totalTime / 1000000) * 100); // Convert to percentage
  }

  private addToHistory(stats: CPUStats): void {
    this.cpuHistory.push(stats);
    if (this.cpuHistory.length > 100) {
      this.cpuHistory.shift();
    }
  }

  private checkCPUThresholds(stats: CPUStats): void {
    if (stats.cpuUsage >= this.config.maxCPUUsagePercent) {
      console.warn(`⚠️  High CPU usage: ${stats.cpuUsage.toFixed(1)}%`);
      
      if (this.config.enableOptimizations) {
        this.applyCPUOptimizations();
      }
    }
  }

  private async applyCPUOptimizations(): Promise<void> {
    // Yield control to event loop
    await new Promise(resolve => setImmediate(resolve));
    
    // Clear old memoization entries
    this.cleanupMemoCache();
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
  }

  private updateProfile(functionName: string, executionTime: number, cpuTime: number): void {
    const existing = this.profiles.get(functionName);
    
    if (existing) {
      existing.executionTime += executionTime;
      existing.cpuTime += cpuTime;
      existing.callCount++;
      existing.averageTime = existing.executionTime / existing.callCount;
      existing.lastExecuted = new Date();
    } else {
      this.profiles.set(functionName, {
        functionName,
        executionTime,
        cpuTime,
        callCount: 1,
        averageTime: executionTime,
        lastExecuted: new Date(),
        optimizationApplied: false
      });
    }
  }

  private getMemoizedResult(key: string): any {
    const cached = this.memoCache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.result;
    }
    
    if (cached) {
      this.memoCache.delete(key);
    }
    
    return null;
  }

  private memoizeResult(key: string, result: any, ttl: number): void {
    this.memoCache.set(key, {
      result,
      timestamp: Date.now(),
      ttl
    });
  }

  private cleanupMemoCache(): void {
    const now = Date.now();
    for (const [key, cached] of this.memoCache.entries()) {
      if (now - cached.timestamp >= cached.ttl) {
        this.memoCache.delete(key);
      }
    }
  }

  private async processBatch<T extends (...args: any[]) => any>(
    functionName: string,
    fn: T,
    batch: Array<{ args: Parameters<T>; resolve: Function; reject: Function }>
  ): Promise<void> {
    console.log(`📦 Processing batch of ${batch.length} calls for ${functionName}`);
    
    try {
      // Process all items in the batch
      const results = await Promise.allSettled(
        batch.map(({ args }) => fn(...args))
      );

      // Resolve/reject each promise
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          batch[index].resolve(result.value);
        } else {
          batch[index].reject(result.reason);
        }
      });

    } catch (error) {
      // Reject all promises in case of batch failure
      batch.forEach(({ reject }) => reject(error));
    }
  }
}

// Export singleton instance
export const cpuOptimizer = new CPUOptimizer();

// Utility functions and decorators
export const CPUUtils = {
  /**
   * Decorator for automatic function optimization
   */
  optimized(options?: {
    enableMemoization?: boolean;
    memoTTL?: number;
    enableBatching?: boolean;
  }) {
    return function <T extends (...args: any[]) => any>(
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      const functionName = `${target.constructor.name}.${propertyKey}`;

      descriptor.value = cpuOptimizer.optimize(
        functionName,
        originalMethod,
        options
      );

      return descriptor;
    };
  },

  /**
   * Create a debounced version of a function
   */
  debounce<T extends (...args: any[]) => any>(
    fn: T,
    delayMs: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delayMs);
    };
  },

  /**
   * Create a throttled version of a function
   */
  throttle<T extends (...args: any[]) => any>(
    fn: T,
    limitMs: number
  ): (...args: Parameters<T>) => void {
    let lastCall = 0;
    
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= limitMs) {
        lastCall = now;
        fn(...args);
      }
    };
  },

  /**
   * Measure function execution time
   */
  async measureExecutionTime<T>(
    fn: () => Promise<T> | T,
    label?: string
  ): Promise<{ result: T; executionTime: number }> {
    const startTime = Date.now();
    const result = await fn();
    const executionTime = Date.now() - startTime;
    
    if (label) {
      console.log(`⏱️  ${label}: ${executionTime}ms`);
    }
    
    return { result, executionTime };
  },

  /**
   * Create a cached version of an async function
   */
  createCachedFunction<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options?: {
      ttl?: number;
      maxSize?: number;
      keyGenerator?: (...args: Parameters<T>) => string;
    }
  ): T {
    const {
      ttl = 300000, // 5 minutes
      maxSize = 100,
      keyGenerator = (...args) => JSON.stringify(args)
    } = options || {};

    const cache = new Map<string, { result: any; timestamp: number }>();

    return (async (...args: Parameters<T>) => {
      const key = keyGenerator(...args);
      const cached = cache.get(key);

      // Return cached result if valid
      if (cached && Date.now() - cached.timestamp < ttl) {
        return cached.result;
      }

      // Execute function and cache result
      const result = await fn(...args);
      
      // Enforce cache size limit
      if (cache.size >= maxSize) {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }

      cache.set(key, { result, timestamp: Date.now() });
      return result;

    }) as T;
  }
};