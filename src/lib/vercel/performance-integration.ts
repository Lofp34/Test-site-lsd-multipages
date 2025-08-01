import { NextRequest, NextResponse } from 'next/server';
import { PerformanceAlerts, PerformanceMetrics } from './performance-alerts';
import { AlertManager } from '@/lib/audit/alert-manager';

/**
 * Global performance monitoring instance
 */
let globalPerformanceAlerts: PerformanceAlerts | null = null;

/**
 * Get or create the global performance alerts instance
 */
export function getPerformanceAlerts(): PerformanceAlerts {
  if (!globalPerformanceAlerts) {
    globalPerformanceAlerts = new PerformanceAlerts(new AlertManager());
  }
  return globalPerformanceAlerts;
}

/**
 * Performance monitoring wrapper for API routes
 */
export function withPerformanceMonitoring<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>,
  functionName: string
) {
  return async (...args: T): Promise<NextResponse> => {
    const performanceAlerts = getPerformanceAlerts();
    const startTime = Date.now();
    const startMemory = process.memoryUsage().heapUsed / 1024 / 1024; // MB
    
    let errorOccurred = false;
    let response: NextResponse;
    
    try {
      response = await handler(...args);
      
      // Check if response indicates an error
      if (response.status >= 400) {
        errorOccurred = true;
      }
      
      return response;
    } catch (error) {
      errorOccurred = true;
      throw error;
    } finally {
      const endTime = Date.now();
      const endMemory = process.memoryUsage().heapUsed / 1024 / 1024; // MB
      
      const metrics: PerformanceMetrics = {
        executionTime: (endTime - startTime) / 1000, // seconds
        memoryUsage: Math.max(startMemory, endMemory),
        errorRate: errorOccurred ? 100 : 0, // Binary for single request
        responseTime: endTime - startTime,
        functionName,
        timestamp: new Date(),
        requestCount: 1,
      };
      
      // Record metrics asynchronously
      performanceAlerts.recordMetrics(metrics).catch(console.error);
    }
  };
}

/**
 * Middleware for automatic performance monitoring
 */
export function createPerformanceMiddleware() {
  return function performanceMiddleware(
    request: NextRequest,
    response: NextResponse,
    functionName?: string
  ) {
    const startTime = Date.now();
    const startMemory = process.memoryUsage().heapUsed / 1024 / 1024;
    
    // Extract function name from URL if not provided
    const name = functionName || request.nextUrl.pathname;
    
    // Add response listener to capture metrics when response is sent
    const originalJson = response.json;
    response.json = function(body: any) {
      const endTime = Date.now();
      const endMemory = process.memoryUsage().heapUsed / 1024 / 1024;
      
      const metrics: PerformanceMetrics = {
        executionTime: (endTime - startTime) / 1000,
        memoryUsage: Math.max(startMemory, endMemory),
        errorRate: response.status >= 400 ? 100 : 0,
        responseTime: endTime - startTime,
        functionName: name,
        timestamp: new Date(),
        requestCount: 1,
      };
      
      // Record metrics
      const performanceAlerts = getPerformanceAlerts();
      performanceAlerts.recordMetrics(metrics).catch(console.error);
      
      return originalJson.call(this, body);
    };
    
    return response;
  };
}

/**
 * Utility to manually record performance metrics
 */
export async function recordPerformanceMetrics(
  functionName: string,
  executionTime: number,
  memoryUsage: number,
  errorRate: number = 0,
  responseTime?: number
): Promise<void> {
  const performanceAlerts = getPerformanceAlerts();
  
  const metrics: PerformanceMetrics = {
    executionTime,
    memoryUsage,
    errorRate,
    responseTime: responseTime || executionTime * 1000,
    functionName,
    timestamp: new Date(),
    requestCount: 1,
  };
  
  await performanceAlerts.recordMetrics(metrics);
}

/**
 * Get performance statistics for all monitored functions
 */
export function getAllPerformanceStats(): Record<string, any> {
  const performanceAlerts = getPerformanceAlerts();
  const stats: Record<string, any> = {};
  
  // This would typically get all function names from a registry
  // For now, we'll use common API routes
  const commonFunctions = [
    '/api/audit-complete',
    '/api/maintenance-weekly',
    '/api/admin/audit-metrics',
    '/api/admin/audit-activities',
    '/api/admin/trigger-audit',
  ];
  
  for (const functionName of commonFunctions) {
    const stat = performanceAlerts.getPerformanceStats(functionName);
    if (stat) {
      stats[functionName] = stat;
    }
  }
  
  return stats;
}

/**
 * Performance monitoring decorator for class methods
 */
export function MonitorPerformance(functionName?: string) {
  return function <T extends (...args: any[]) => Promise<any>>(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    const originalMethod = descriptor.value!;
    const name = functionName || `${target.constructor.name}.${propertyKey}`;
    
    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      const startMemory = process.memoryUsage().heapUsed / 1024 / 1024;
      let errorOccurred = false;
      
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        errorOccurred = true;
        throw error;
      } finally {
        const endTime = Date.now();
        const endMemory = process.memoryUsage().heapUsed / 1024 / 1024;
        
        const metrics: PerformanceMetrics = {
          executionTime: (endTime - startTime) / 1000,
          memoryUsage: Math.max(startMemory, endMemory),
          errorRate: errorOccurred ? 100 : 0,
          responseTime: endTime - startTime,
          functionName: name,
          timestamp: new Date(),
          requestCount: 1,
        };
        
        const performanceAlerts = getPerformanceAlerts();
        performanceAlerts.recordMetrics(metrics).catch(console.error);
      }
    } as T;
  };
}

/**
 * Batch performance metrics recording for high-frequency operations
 */
export class BatchPerformanceRecorder {
  private batch: PerformanceMetrics[] = [];
  private batchSize: number;
  private flushInterval: number;
  private timer: NodeJS.Timeout | null = null;

  constructor(batchSize: number = 10, flushIntervalMs: number = 30000) {
    this.batchSize = batchSize;
    this.flushInterval = flushIntervalMs;
    this.startFlushTimer();
  }

  /**
   * Add metrics to batch
   */
  record(metrics: PerformanceMetrics): void {
    this.batch.push(metrics);
    
    if (this.batch.length >= this.batchSize) {
      this.flush();
    }
  }

  /**
   * Flush all batched metrics
   */
  async flush(): Promise<void> {
    if (this.batch.length === 0) return;
    
    const performanceAlerts = getPerformanceAlerts();
    const metricsToFlush = [...this.batch];
    this.batch = [];
    
    // Process batch
    for (const metrics of metricsToFlush) {
      try {
        await performanceAlerts.recordMetrics(metrics);
      } catch (error) {
        console.error('Failed to record batched metrics:', error);
      }
    }
  }

  /**
   * Start automatic flush timer
   */
  private startFlushTimer(): void {
    this.timer = setInterval(() => {
      this.flush().catch(console.error);
    }, this.flushInterval);
  }

  /**
   * Stop the batch recorder
   */
  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.flush().catch(console.error);
  }
}

/**
 * Create a performance monitoring hook for React components
 */
export function usePerformanceMonitoring(componentName: string) {
  const recordRender = (renderTime: number, errorOccurred: boolean = false) => {
    const metrics: PerformanceMetrics = {
      executionTime: renderTime / 1000,
      memoryUsage: 0, // Not available in browser
      errorRate: errorOccurred ? 100 : 0,
      responseTime: renderTime,
      functionName: `Component:${componentName}`,
      timestamp: new Date(),
      requestCount: 1,
    };
    
    recordPerformanceMetrics(
      metrics.functionName,
      metrics.executionTime,
      metrics.memoryUsage,
      metrics.errorRate,
      metrics.responseTime
    ).catch(console.error);
  };

  return { recordRender };
}

/**
 * Performance monitoring configuration
 */
export interface PerformanceConfig {
  enabled: boolean;
  batchSize: number;
  flushInterval: number;
  thresholds: {
    slowFunction: number;
    highMemory: number;
    highErrorRate: number;
    slowResponse: number;
  };
}

/**
 * Default performance configuration
 */
export const defaultPerformanceConfig: PerformanceConfig = {
  enabled: true,
  batchSize: 10,
  flushInterval: 30000,
  thresholds: {
    slowFunction: 10,
    highMemory: 400,
    highErrorRate: 5,
    slowResponse: 5000,
  },
};

/**
 * Initialize performance monitoring with configuration
 */
export function initializePerformanceMonitoring(config: Partial<PerformanceConfig> = {}) {
  const finalConfig = { ...defaultPerformanceConfig, ...config };
  
  if (!finalConfig.enabled) {
    return null;
  }
  
  const performanceAlerts = getPerformanceAlerts();
  performanceAlerts.updateThresholds(finalConfig.thresholds);
  
  return new BatchPerformanceRecorder(finalConfig.batchSize, finalConfig.flushInterval);
}