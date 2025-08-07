/**
 * Chat Metrics Collection System
 * 
 * This module handles the collection, aggregation, and reporting of metrics
 * for the enhanced chat features. It tracks usage, performance, and errors.
 */

interface MetricEvent {
  type: string;
  category: 'usage' | 'performance' | 'error' | 'feature';
  data: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count' | 'percentage';
  timestamp: number;
  context?: Record<string, any>;
}

interface UsageMetric {
  feature: string;
  action: string;
  count: number;
  sessionId: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface ErrorMetric {
  type: string;
  message: string;
  stack?: string;
  feature: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
  sessionId: string;
  context?: Record<string, any>;
}

interface MetricsConfig {
  enabled: boolean;
  batchSize: number;
  flushInterval: number; // milliseconds
  maxRetries: number;
  enablePerformanceTracking: boolean;
  enableUsageTracking: boolean;
  enableErrorTracking: boolean;
  enableRealTimeAlerts: boolean;
  alertThresholds: {
    errorRate: number;
    responseTime: number;
    memoryUsage: number;
  };
}

class ChatMetricsCollector {
  private events: MetricEvent[] = [];
  private performanceMetrics: PerformanceMetric[] = [];
  private usageMetrics: UsageMetric[] = [];
  private errorMetrics: ErrorMetric[] = [];
  private flushTimer: NodeJS.Timeout | null = null;
  private sessionId: string;
  private config: MetricsConfig;

  constructor(config: Partial<MetricsConfig> = {}) {
    this.sessionId = this.generateSessionId();
    this.config = {
      enabled: true,
      batchSize: 50,
      flushInterval: 30000, // 30 seconds
      maxRetries: 3,
      enablePerformanceTracking: true,
      enableUsageTracking: true,
      enableErrorTracking: true,
      enableRealTimeAlerts: true,
      alertThresholds: {
        errorRate: 0.05, // 5%
        responseTime: 1000, // 1 second
        memoryUsage: 100 * 1024 * 1024, // 100MB
      },
      ...config,
    };

    if (this.config.enabled) {
      this.startFlushTimer();
      this.setupPerformanceObserver();
    }
  }

  private generateSessionId(): string {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private startFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }

    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  private setupPerformanceObserver(): void {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name.includes('chat') || entry.name.includes('markdown')) {
              this.recordPerformance(entry.name, entry.duration, 'ms', {
                entryType: entry.entryType,
                startTime: entry.startTime,
              });
            }
          }
        });

        observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
      } catch (error) {
        console.warn('Performance Observer not supported:', error);
      }
    }
  }

  /**
   * Record a generic metric event
   */
  public recordEvent(
    type: string,
    category: MetricEvent['category'],
    data: Record<string, any> = {}
  ): void {
    if (!this.config.enabled) return;

    const event: MetricEvent = {
      type,
      category,
      data,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.events.push(event);
    this.checkFlushConditions();
  }

  /**
   * Record performance metrics
   */
  public recordPerformance(
    name: string,
    value: number,
    unit: PerformanceMetric['unit'] = 'ms',
    context?: Record<string, any>
  ): void {
    if (!this.config.enabled || !this.config.enablePerformanceTracking) return;

    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      context,
    };

    this.performanceMetrics.push(metric);

    // Check for performance alerts
    if (this.config.enableRealTimeAlerts) {
      this.checkPerformanceAlerts(metric);
    }

    this.checkFlushConditions();
  }

  /**
   * Record usage metrics
   */
  public recordUsage(
    feature: string,
    action: string,
    metadata?: Record<string, any>
  ): void {
    if (!this.config.enabled || !this.config.enableUsageTracking) return;

    // Find existing metric for this feature/action combination
    const existingMetric = this.usageMetrics.find(
      m => m.feature === feature && m.action === action && m.sessionId === this.sessionId
    );

    if (existingMetric) {
      existingMetric.count++;
      existingMetric.timestamp = Date.now();
      if (metadata) {
        existingMetric.metadata = { ...existingMetric.metadata, ...metadata };
      }
    } else {
      const metric: UsageMetric = {
        feature,
        action,
        count: 1,
        sessionId: this.sessionId,
        timestamp: Date.now(),
        metadata,
      };

      this.usageMetrics.push(metric);
    }

    this.checkFlushConditions();
  }

  /**
   * Record error metrics
   */
  public recordError(
    type: string,
    message: string,
    feature: string,
    severity: ErrorMetric['severity'] = 'medium',
    stack?: string,
    context?: Record<string, any>
  ): void {
    if (!this.config.enabled || !this.config.enableErrorTracking) return;

    const metric: ErrorMetric = {
      type,
      message,
      stack,
      feature,
      severity,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      context,
    };

    this.errorMetrics.push(metric);

    // Immediate alert for critical errors
    if (severity === 'critical' && this.config.enableRealTimeAlerts) {
      this.sendAlert('critical_error', metric);
    }

    this.checkFlushConditions();
  }

  /**
   * Record specific chat enhancement metrics
   */
  public recordMarkdownRender(renderTime: number, contentLength: number, hasCode: boolean): void {
    this.recordPerformance('markdown_render_time', renderTime, 'ms', {
      contentLength,
      hasCode,
    });

    this.recordUsage('markdown', 'render', {
      contentLength,
      hasCode,
      renderTime,
    });
  }

  public recordScrollEvent(
    eventType: 'auto_scroll' | 'manual_scroll' | 'scroll_to_bottom',
    responseTime?: number
  ): void {
    if (responseTime) {
      this.recordPerformance('scroll_response_time', responseTime, 'ms');
    }

    this.recordUsage('scroll_control', eventType, {
      responseTime,
    });
  }

  public recordChatControlAction(
    action: 'close' | 'minimize' | 'fullscreen' | 'keyboard_shortcut',
    shortcut?: string
  ): void {
    this.recordUsage('chat_controls', action, {
      shortcut,
    });
  }

  public recordMobileInteraction(
    interactionType: 'touch' | 'gesture' | 'keyboard',
    details?: Record<string, any>
  ): void {
    this.recordUsage('mobile_optimizations', interactionType, details);
  }

  public recordAccessibilityUsage(
    feature: 'screen_reader' | 'keyboard_navigation' | 'high_contrast' | 'focus_management',
    details?: Record<string, any>
  ): void {
    this.recordUsage('accessibility', feature, details);
  }

  /**
   * Record memory usage
   */
  public recordMemoryUsage(): void {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as any)) {
      const memory = (window.performance as any).memory;
      
      this.recordPerformance('memory_used', memory.usedJSHeapSize, 'bytes');
      this.recordPerformance('memory_total', memory.totalJSHeapSize, 'bytes');
      this.recordPerformance('memory_limit', memory.jsHeapSizeLimit, 'bytes');

      // Check memory alerts
      if (this.config.enableRealTimeAlerts && memory.usedJSHeapSize > this.config.alertThresholds.memoryUsage) {
        this.sendAlert('high_memory_usage', {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
        });
      }
    }
  }

  /**
   * Start a performance measurement
   */
  public startMeasurement(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      this.recordPerformance(name, duration, 'ms');
    };
  }

  /**
   * Measure async operation
   */
  public async measureAsync<T>(name: string, operation: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await operation();
      const endTime = performance.now();
      this.recordPerformance(name, endTime - startTime, 'ms');
      return result;
    } catch (error) {
      const endTime = performance.now();
      this.recordPerformance(name, endTime - startTime, 'ms', { error: true });
      this.recordError(
        'async_operation_error',
        error instanceof Error ? error.message : 'Unknown error',
        name,
        'medium',
        error instanceof Error ? error.stack : undefined
      );
      throw error;
    }
  }

  private checkFlushConditions(): void {
    const totalMetrics = this.events.length + this.performanceMetrics.length + 
                        this.usageMetrics.length + this.errorMetrics.length;

    if (totalMetrics >= this.config.batchSize) {
      this.flush();
    }
  }

  private checkPerformanceAlerts(metric: PerformanceMetric): void {
    if (metric.name.includes('response_time') && metric.value > this.config.alertThresholds.responseTime) {
      this.sendAlert('slow_response_time', metric);
    }
  }

  private sendAlert(type: string, data: any): void {
    // In a real implementation, this would send alerts to monitoring systems
    console.warn(`Chat Metrics Alert [${type}]:`, data);
    
    // Send to API for processing
    fetch('/api/admin/chat-alerts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        timestamp: Date.now(),
        sessionId: this.sessionId,
      }),
    }).catch(error => {
      console.error('Failed to send alert:', error);
    });
  }

  /**
   * Flush all collected metrics to the server
   */
  public async flush(): Promise<void> {
    if (!this.config.enabled) return;

    const payload = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      events: [...this.events],
      performanceMetrics: [...this.performanceMetrics],
      usageMetrics: [...this.usageMetrics],
      errorMetrics: [...this.errorMetrics],
    };

    // Clear local arrays
    this.events = [];
    this.performanceMetrics = [];
    this.usageMetrics = [];
    this.errorMetrics = [];

    if (payload.events.length === 0 && payload.performanceMetrics.length === 0 && 
        payload.usageMetrics.length === 0 && payload.errorMetrics.length === 0) {
      return;
    }

    try {
      await this.sendMetrics(payload);
    } catch (error) {
      console.error('Failed to flush metrics:', error);
      // Re-add metrics for retry (with limit)
      if (payload.events.length + payload.performanceMetrics.length + 
          payload.usageMetrics.length + payload.errorMetrics.length < this.config.batchSize) {
        this.events.push(...payload.events);
        this.performanceMetrics.push(...payload.performanceMetrics);
        this.usageMetrics.push(...payload.usageMetrics);
        this.errorMetrics.push(...payload.errorMetrics);
      }
    }
  }

  private async sendMetrics(payload: any, retryCount = 0): Promise<void> {
    try {
      const response = await fetch('/api/admin/chat-metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'batch_record',
          data: payload,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      if (retryCount < this.config.maxRetries) {
        // Exponential backoff
        const delay = Math.pow(2, retryCount) * 1000;
        setTimeout(() => {
          this.sendMetrics(payload, retryCount + 1);
        }, delay);
      } else {
        throw error;
      }
    }
  }

  /**
   * Get current session statistics
   */
  public getSessionStats(): {
    sessionId: string;
    eventsCount: number;
    performanceMetricsCount: number;
    usageMetricsCount: number;
    errorMetricsCount: number;
    sessionDuration: number;
  } {
    return {
      sessionId: this.sessionId,
      eventsCount: this.events.length,
      performanceMetricsCount: this.performanceMetrics.length,
      usageMetricsCount: this.usageMetrics.length,
      errorMetricsCount: this.errorMetrics.length,
      sessionDuration: Date.now() - parseInt(this.sessionId.split('_')[1]),
    };
  }

  /**
   * Update configuration
   */
  public updateConfig(newConfig: Partial<MetricsConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (this.config.enabled && !this.flushTimer) {
      this.startFlushTimer();
    } else if (!this.config.enabled && this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
  }

  /**
   * Cleanup resources
   */
  public destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }

    // Flush remaining metrics
    this.flush().catch(error => {
      console.error('Failed to flush metrics on destroy:', error);
    });
  }
}

// Singleton instance
let metricsCollector: ChatMetricsCollector | null = null;

export function getChatMetricsCollector(config?: Partial<MetricsConfig>): ChatMetricsCollector {
  if (!metricsCollector) {
    metricsCollector = new ChatMetricsCollector(config);
  }
  return metricsCollector;
}

export function destroyChatMetricsCollector(): void {
  if (metricsCollector) {
    metricsCollector.destroy();
    metricsCollector = null;
  }
}

// Convenience functions
export const chatMetrics = {
  recordMarkdownRender: (renderTime: number, contentLength: number, hasCode: boolean) => {
    getChatMetricsCollector().recordMarkdownRender(renderTime, contentLength, hasCode);
  },
  
  recordScrollEvent: (eventType: 'auto_scroll' | 'manual_scroll' | 'scroll_to_bottom', responseTime?: number) => {
    getChatMetricsCollector().recordScrollEvent(eventType, responseTime);
  },
  
  recordChatControlAction: (action: 'close' | 'minimize' | 'fullscreen' | 'keyboard_shortcut', shortcut?: string) => {
    getChatMetricsCollector().recordChatControlAction(action, shortcut);
  },
  
  recordMobileInteraction: (interactionType: 'touch' | 'gesture' | 'keyboard', details?: Record<string, any>) => {
    getChatMetricsCollector().recordMobileInteraction(interactionType, details);
  },
  
  recordAccessibilityUsage: (feature: 'screen_reader' | 'keyboard_navigation' | 'high_contrast' | 'focus_management', details?: Record<string, any>) => {
    getChatMetricsCollector().recordAccessibilityUsage(feature, details);
  },
  
  recordError: (type: string, message: string, feature: string, severity: ErrorMetric['severity'] = 'medium', stack?: string, context?: Record<string, any>) => {
    getChatMetricsCollector().recordError(type, message, feature, severity, stack, context);
  },
  
  recordMemoryUsage: () => {
    getChatMetricsCollector().recordMemoryUsage();
  },
  
  startMeasurement: (name: string) => {
    return getChatMetricsCollector().startMeasurement(name);
  },
  
  measureAsync: <T>(name: string, operation: () => Promise<T>) => {
    return getChatMetricsCollector().measureAsync(name, operation);
  },
};

export type { MetricEvent, PerformanceMetric, UsageMetric, ErrorMetric, MetricsConfig };