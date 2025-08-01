import { AlertManager } from '@/lib/audit/alert-manager';

/**
 * Performance alert thresholds and configuration
 */
export interface PerformanceThresholds {
  /** Function execution time threshold in seconds */
  slowFunctionThreshold: number;
  /** Memory usage threshold in MB */
  highMemoryThreshold: number;
  /** Error rate threshold as percentage */
  highErrorRateThreshold: number;
  /** Response time threshold in milliseconds */
  responseTimeThreshold: number;
}

/**
 * Performance metrics for monitoring
 */
export interface PerformanceMetrics {
  /** Function execution time in seconds */
  executionTime: number;
  /** Memory usage in MB */
  memoryUsage: number;
  /** Error rate as percentage */
  errorRate: number;
  /** Response time in milliseconds */
  responseTime: number;
  /** Function name */
  functionName: string;
  /** Timestamp of measurement */
  timestamp: Date;
  /** Request count in the measurement period */
  requestCount: number;
}

/**
 * Performance alert data
 */
export interface PerformanceAlert {
  /** Alert type */
  type: 'slow_function' | 'high_memory' | 'high_error_rate' | 'slow_response';
  /** Alert severity */
  severity: 'warning' | 'error' | 'critical';
  /** Alert message */
  message: string;
  /** Function or endpoint name */
  target: string;
  /** Current metric value */
  currentValue: number;
  /** Threshold that was exceeded */
  threshold: number;
  /** Timestamp when alert was triggered */
  timestamp: Date;
  /** Recommended actions */
  recommendations: string[];
}

/**
 * Performance monitoring and alerting system
 */
export class PerformanceAlerts {
  private alertManager: AlertManager;
  private thresholds: PerformanceThresholds;
  private metricsHistory: Map<string, PerformanceMetrics[]> = new Map();
  private lastAlerts: Map<string, Date> = new Map();
  private alertCooldownMs: number = 15 * 60 * 1000; // 15 minutes

  constructor(alertManager: AlertManager, thresholds?: PerformanceThresholds) {
    this.alertManager = alertManager;
    this.thresholds = thresholds || {
      slowFunctionThreshold: 10, // 10 seconds
      highMemoryThreshold: 400, // 400 MB
      highErrorRateThreshold: 5, // 5%
      responseTimeThreshold: 5000, // 5 seconds
    };
  }

  /**
   * Record performance metrics and check for alerts
   */
  async recordMetrics(metrics: PerformanceMetrics): Promise<void> {
    // Store metrics in history
    const key = metrics.functionName;
    if (!this.metricsHistory.has(key)) {
      this.metricsHistory.set(key, []);
    }
    
    const history = this.metricsHistory.get(key)!;
    history.push(metrics);
    
    // Keep only last 100 measurements per function
    if (history.length > 100) {
      history.splice(0, history.length - 100);
    }

    // Check for performance issues
    await this.checkSlowFunction(metrics);
    await this.checkHighMemoryUsage(metrics);
    await this.checkHighErrorRate(metrics);
    await this.checkSlowResponse(metrics);
  }

  /**
   * Check for slow function execution
   */
  private async checkSlowFunction(metrics: PerformanceMetrics): Promise<void> {
    if (metrics.executionTime <= this.thresholds.slowFunctionThreshold) {
      return;
    }

    const alertKey = `slow_function_${metrics.functionName}`;
    if (this.isInCooldown(alertKey)) {
      return;
    }

    const severity = this.getSeverity(
      metrics.executionTime,
      this.thresholds.slowFunctionThreshold,
      [15, 30] // warning at 15s, critical at 30s
    );

    const alert: PerformanceAlert = {
      type: 'slow_function',
      severity,
      message: `Function ${metrics.functionName} is executing slowly (${metrics.executionTime.toFixed(1)}s)`,
      target: metrics.functionName,
      currentValue: metrics.executionTime,
      threshold: this.thresholds.slowFunctionThreshold,
      timestamp: new Date(),
      recommendations: [
        'Optimize database queries and reduce external API calls',
        'Implement caching for frequently accessed data',
        'Consider breaking down the function into smaller parts',
        'Review and optimize algorithm complexity',
        'Enable function timeout monitoring'
      ]
    };

    await this.sendAlert(alert);
    this.lastAlerts.set(alertKey, new Date());
  }

  /**
   * Check for high memory usage
   */
  private async checkHighMemoryUsage(metrics: PerformanceMetrics): Promise<void> {
    if (metrics.memoryUsage <= this.thresholds.highMemoryThreshold) {
      return;
    }

    const alertKey = `high_memory_${metrics.functionName}`;
    if (this.isInCooldown(alertKey)) {
      return;
    }

    const severity = this.getSeverity(
      metrics.memoryUsage,
      this.thresholds.highMemoryThreshold,
      [450, 500] // warning at 450MB, critical at 500MB
    );

    const alert: PerformanceAlert = {
      type: 'high_memory',
      severity,
      message: `Function ${metrics.functionName} is using high memory (${metrics.memoryUsage}MB)`,
      target: metrics.functionName,
      currentValue: metrics.memoryUsage,
      threshold: this.thresholds.highMemoryThreshold,
      timestamp: new Date(),
      recommendations: [
        'Implement streaming processing for large datasets',
        'Force garbage collection after processing batches',
        'Reduce in-memory data structures and use lazy loading',
        'Optimize object creation and reuse instances',
        'Consider splitting processing into smaller chunks'
      ]
    };

    await this.sendAlert(alert);
    this.lastAlerts.set(alertKey, new Date());
  }

  /**
   * Check for high error rate
   */
  private async checkHighErrorRate(metrics: PerformanceMetrics): Promise<void> {
    if (metrics.errorRate <= this.thresholds.highErrorRateThreshold) {
      return;
    }

    const alertKey = `high_error_rate_${metrics.functionName}`;
    if (this.isInCooldown(alertKey)) {
      return;
    }

    const severity = this.getSeverity(
      metrics.errorRate,
      this.thresholds.highErrorRateThreshold,
      [10, 20] // warning at 10%, critical at 20%
    );

    const alert: PerformanceAlert = {
      type: 'high_error_rate',
      severity,
      message: `Function ${metrics.functionName} has high error rate (${metrics.errorRate.toFixed(1)}%)`,
      target: metrics.functionName,
      currentValue: metrics.errorRate,
      threshold: this.thresholds.highErrorRateThreshold,
      timestamp: new Date(),
      recommendations: [
        'Review error logs to identify common failure patterns',
        'Implement better error handling and retry logic',
        'Add input validation and sanitization',
        'Check external service dependencies and timeouts',
        'Consider implementing circuit breaker pattern'
      ]
    };

    await this.sendAlert(alert);
    this.lastAlerts.set(alertKey, new Date());
  }

  /**
   * Check for slow response times
   */
  private async checkSlowResponse(metrics: PerformanceMetrics): Promise<void> {
    if (metrics.responseTime <= this.thresholds.responseTimeThreshold) {
      return;
    }

    const alertKey = `slow_response_${metrics.functionName}`;
    if (this.isInCooldown(alertKey)) {
      return;
    }

    const severity = this.getSeverity(
      metrics.responseTime,
      this.thresholds.responseTimeThreshold,
      [8000, 15000] // warning at 8s, critical at 15s
    );

    const alert: PerformanceAlert = {
      type: 'slow_response',
      severity,
      message: `Function ${metrics.functionName} has slow response time (${metrics.responseTime}ms)`,
      target: metrics.functionName,
      currentValue: metrics.responseTime,
      threshold: this.thresholds.responseTimeThreshold,
      timestamp: new Date(),
      recommendations: [
        'Optimize database queries and add proper indexing',
        'Implement response caching for frequently requested data',
        'Reduce payload size and use compression',
        'Optimize network calls and use connection pooling',
        'Consider using CDN for static assets'
      ]
    };

    await this.sendAlert(alert);
    this.lastAlerts.set(alertKey, new Date());
  }

  /**
   * Get performance statistics for a function
   */
  getPerformanceStats(functionName: string): {
    averageExecutionTime: number;
    averageMemoryUsage: number;
    averageErrorRate: number;
    averageResponseTime: number;
    measurementCount: number;
    trend: 'improving' | 'degrading' | 'stable';
  } | null {
    const history = this.metricsHistory.get(functionName);
    if (!history || history.length === 0) {
      return null;
    }

    const recent = history.slice(-10); // Last 10 measurements
    const older = history.slice(-20, -10); // Previous 10 measurements

    const recentAvg = {
      executionTime: recent.reduce((sum, m) => sum + m.executionTime, 0) / recent.length,
      memoryUsage: recent.reduce((sum, m) => sum + m.memoryUsage, 0) / recent.length,
      errorRate: recent.reduce((sum, m) => sum + m.errorRate, 0) / recent.length,
      responseTime: recent.reduce((sum, m) => sum + m.responseTime, 0) / recent.length,
    };

    let trend: 'improving' | 'degrading' | 'stable' = 'stable';
    
    if (older.length > 0) {
      const olderAvg = {
        executionTime: older.reduce((sum, m) => sum + m.executionTime, 0) / older.length,
        responseTime: older.reduce((sum, m) => sum + m.responseTime, 0) / older.length,
      };

      const executionChange = ((recentAvg.executionTime - olderAvg.executionTime) / olderAvg.executionTime) * 100;
      const responseChange = ((recentAvg.responseTime - olderAvg.responseTime) / olderAvg.responseTime) * 100;
      
      const avgChange = (executionChange + responseChange) / 2;
      
      if (avgChange > 10) trend = 'degrading';
      else if (avgChange < -10) trend = 'improving';
    }

    return {
      averageExecutionTime: recentAvg.executionTime,
      averageMemoryUsage: recentAvg.memoryUsage,
      averageErrorRate: recentAvg.errorRate,
      averageResponseTime: recentAvg.responseTime,
      measurementCount: history.length,
      trend
    };
  }

  /**
   * Get all active performance alerts
   */
  getActiveAlerts(): PerformanceAlert[] {
    // This would typically fetch from a database or cache
    // For now, we'll return an empty array as alerts are sent immediately
    return [];
  }

  /**
   * Update performance thresholds
   */
  updateThresholds(newThresholds: Partial<PerformanceThresholds>): void {
    this.thresholds = { ...this.thresholds, ...newThresholds };
  }

  /**
   * Clear metrics history for a function
   */
  clearHistory(functionName?: string): void {
    if (functionName) {
      this.metricsHistory.delete(functionName);
    } else {
      this.metricsHistory.clear();
    }
  }

  /**
   * Check if an alert is in cooldown period
   */
  private isInCooldown(alertKey: string): boolean {
    const lastAlert = this.lastAlerts.get(alertKey);
    if (!lastAlert) return false;
    
    return Date.now() - lastAlert.getTime() < this.alertCooldownMs;
  }

  /**
   * Determine alert severity based on value and thresholds
   */
  private getSeverity(
    value: number,
    baseThreshold: number,
    severityThresholds: [number, number]
  ): 'warning' | 'error' | 'critical' {
    const [warningThreshold, criticalThreshold] = severityThresholds;
    
    if (value >= criticalThreshold) return 'critical';
    if (value >= warningThreshold) return 'error';
    return 'warning';
  }

  /**
   * Send performance alert through alert manager
   */
  private async sendAlert(alert: PerformanceAlert): Promise<void> {
    try {
      await this.alertManager.sendAlert({
        type: 'performance',
        severity: alert.severity,
        title: `Performance Alert: ${alert.type.replace('_', ' ')}`,
        message: alert.message,
        details: {
          target: alert.target,
          currentValue: alert.currentValue,
          threshold: alert.threshold,
          recommendations: alert.recommendations,
          timestamp: alert.timestamp.toISOString(),
        },
        timestamp: alert.timestamp,
      });
    } catch (error) {
      console.error('Failed to send performance alert:', error);
    }
  }
}

/**
 * Create a performance monitoring middleware for API routes
 */
export function createPerformanceMonitor(performanceAlerts: PerformanceAlerts) {
  return function performanceMonitor(functionName: string) {
    return function <T extends (...args: any[]) => Promise<any>>(
      target: any,
      propertyKey: string,
      descriptor: TypedPropertyDescriptor<T>
    ) {
      const originalMethod = descriptor.value!;
      
      descriptor.value = async function (...args: any[]) {
        const startTime = Date.now();
        const startMemory = process.memoryUsage().heapUsed / 1024 / 1024; // MB
        let errorOccurred = false;
        
        try {
          const result = await originalMethod.apply(this, args);
          return result;
        } catch (error) {
          errorOccurred = true;
          throw error;
        } finally {
          const endTime = Date.now();
          const endMemory = process.memoryUsage().heapUsed / 1024 / 1024; // MB
          
          const metrics: PerformanceMetrics = {
            executionTime: (endTime - startTime) / 1000, // seconds
            memoryUsage: Math.max(startMemory, endMemory),
            errorRate: errorOccurred ? 100 : 0, // Simple binary for single request
            responseTime: endTime - startTime,
            functionName,
            timestamp: new Date(),
            requestCount: 1,
          };
          
          // Record metrics asynchronously to avoid blocking
          performanceAlerts.recordMetrics(metrics).catch(console.error);
        }
      } as T;
    };
  };
}