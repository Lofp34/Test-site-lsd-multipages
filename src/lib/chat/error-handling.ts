/**
 * Comprehensive error handling and monitoring system for enhanced chat
 * Implements error boundaries, fallback mechanisms, and performance monitoring
 */

import React from 'react';

export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  eventType?: string;
}

export interface ChatError {
  id: string;
  timestamp: Date;
  type: 'markdown' | 'scroll' | 'controls' | 'security' | 'network' | 'general';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  stack?: string;
  context?: any;
  userAgent?: string;
  url?: string;
  userId?: string;
  sessionId?: string;
  retryCount?: number;
  resolved?: boolean;
}

export interface PerformanceMetrics {
  markdownRenderTime: number;
  scrollResponseTime: number;
  memoryUsage: number;
  componentMountTime: number;
  firstInteraction: number;
  cumulativeLayoutShift: number;
  errorCount: number;
  recoveryTime: number;
}

export interface FallbackState {
  hasError: boolean;
  errorType: string;
  fallbackMode: boolean;
  retryCount: number;
  lastError?: ChatError;
}

/**
 * Error reporting and analytics service
 */
export class ErrorReporter {
  private static instance: ErrorReporter;
  private errors: ChatError[] = [];
  private maxErrors = 100;
  private reportingEndpoint?: string;

  static getInstance(): ErrorReporter {
    if (!ErrorReporter.instance) {
      ErrorReporter.instance = new ErrorReporter();
    }
    return ErrorReporter.instance;
  }

  constructor() {
    this.reportingEndpoint = process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT;
    this.setupGlobalErrorHandlers();
  }

  /**
   * Report an error with context
   */
  reportError(
    type: ChatError['type'],
    severity: ChatError['severity'],
    message: string,
    context?: any,
    stack?: string
  ): string {
    const error: ChatError = {
      id: this.generateErrorId(),
      timestamp: new Date(),
      type,
      severity,
      message,
      stack,
      context,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      retryCount: 0,
      resolved: false
    };

    this.errors.push(error);

    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${severity.toUpperCase()}] ${type}:`, message, context);
      if (stack) {
        console.error('Stack:', stack);
      }
    }

    // Send to external service in production
    if (process.env.NODE_ENV === 'production' && severity === 'critical') {
      this.sendToExternalService(error);
    }

    return error.id;
  }

  /**
   * Mark error as resolved
   */
  resolveError(errorId: string): void {
    const error = this.errors.find(e => e.id === errorId);
    if (error) {
      error.resolved = true;
    }
  }

  /**
   * Get recent errors
   */
  getRecentErrors(limit: number = 10, type?: ChatError['type']): ChatError[] {
    let filteredErrors = this.errors;
    
    if (type) {
      filteredErrors = this.errors.filter(e => e.type === type);
    }

    return filteredErrors
      .slice(-limit)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Get error statistics
   */
  getErrorStats(): {
    total: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
    resolved: number;
    unresolved: number;
  } {
    const stats = {
      total: this.errors.length,
      byType: {} as Record<string, number>,
      bySeverity: {} as Record<string, number>,
      resolved: 0,
      unresolved: 0
    };

    this.errors.forEach(error => {
      // Count by type
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
      
      // Count by severity
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
      
      // Count resolved/unresolved
      if (error.resolved) {
        stats.resolved++;
      } else {
        stats.unresolved++;
      }
    });

    return stats;
  }

  /**
   * Clear all errors
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Private methods
   */

  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUserId(): string {
    // In a real app, get from auth context
    if (typeof window !== 'undefined') {
      let userId = localStorage.getItem('chat_user_id');
      if (!userId) {
        userId = `user_${Math.random().toString(36).substr(2, 15)}`;
        localStorage.setItem('chat_user_id', userId);
      }
      return userId;
    }
    return 'anonymous';
  }

  private getSessionId(): string {
    if (typeof window !== 'undefined') {
      let sessionId = sessionStorage.getItem('chat_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('chat_session_id', sessionId);
      }
      return sessionId;
    }
    return 'no-session';
  }

  private setupGlobalErrorHandlers(): void {
    if (typeof window === 'undefined') return;

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError(
        'general',
        'high',
        'Unhandled promise rejection',
        { reason: event.reason },
        event.reason?.stack
      );
    });

    // Handle global errors
    window.addEventListener('error', (event) => {
      this.reportError(
        'general',
        'high',
        event.message,
        {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        },
        event.error?.stack
      );
    });
  }

  private async sendToExternalService(error: ChatError): Promise<void> {
    if (!this.reportingEndpoint) return;

    try {
      await fetch(this.reportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(error)
      });
    } catch (err) {
      console.error('Failed to send error to external service:', err);
    }
  }
}

/**
 * Performance monitoring service
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private maxMetrics = 50;
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  constructor() {
    this.setupPerformanceObservers();
  }

  /**
   * Record performance metrics
   */
  recordMetrics(metrics: Partial<PerformanceMetrics>): void {
    const fullMetrics: PerformanceMetrics = {
      markdownRenderTime: 0,
      scrollResponseTime: 0,
      memoryUsage: this.getMemoryUsage(),
      componentMountTime: 0,
      firstInteraction: 0,
      cumulativeLayoutShift: 0,
      errorCount: 0,
      recoveryTime: 0,
      ...metrics,
      timestamp: Date.now()
    } as PerformanceMetrics & { timestamp: number };

    this.metrics.push(fullMetrics);

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // Log performance issues
    this.checkPerformanceThresholds(fullMetrics);
  }

  /**
   * Measure function execution time
   */
  measureExecutionTime<T>(
    name: string,
    fn: () => T | Promise<T>
  ): T | Promise<T> {
    const start = performance.now();
    
    try {
      const result = fn();
      
      if (result instanceof Promise) {
        return result.finally(() => {
          const duration = performance.now() - start;
          this.recordExecutionTime(name, duration);
        });
      } else {
        const duration = performance.now() - start;
        this.recordExecutionTime(name, duration);
        return result;
      }
    } catch (error) {
      const duration = performance.now() - start;
      this.recordExecutionTime(name, duration, error);
      throw error;
    }
  }

  /**
   * Get performance statistics
   */
  getPerformanceStats(): {
    averageRenderTime: number;
    averageScrollTime: number;
    averageMemoryUsage: number;
    totalErrors: number;
    performanceScore: number;
  } {
    if (this.metrics.length === 0) {
      return {
        averageRenderTime: 0,
        averageScrollTime: 0,
        averageMemoryUsage: 0,
        totalErrors: 0,
        performanceScore: 100
      };
    }

    const totals = this.metrics.reduce((acc, metric) => ({
      renderTime: acc.renderTime + metric.markdownRenderTime,
      scrollTime: acc.scrollTime + metric.scrollResponseTime,
      memoryUsage: acc.memoryUsage + metric.memoryUsage,
      errors: acc.errors + metric.errorCount
    }), { renderTime: 0, scrollTime: 0, memoryUsage: 0, errors: 0 });

    const count = this.metrics.length;
    const averageRenderTime = totals.renderTime / count;
    const averageScrollTime = totals.scrollTime / count;
    const averageMemoryUsage = totals.memoryUsage / count;

    // Calculate performance score (0-100)
    let score = 100;
    if (averageRenderTime > 100) score -= 20; // Slow rendering
    if (averageScrollTime > 16) score -= 15; // Slow scrolling (60fps = 16ms)
    if (averageMemoryUsage > 50) score -= 15; // High memory usage
    if (totals.errors > 0) score -= 25; // Errors present
    if (this.getCumulativeLayoutShift() > 0.1) score -= 25; // Layout shifts

    return {
      averageRenderTime,
      averageScrollTime,
      averageMemoryUsage,
      totalErrors: totals.errors,
      performanceScore: Math.max(0, score)
    };
  }

  /**
   * Clear performance metrics
   */
  clearMetrics(): void {
    this.metrics = [];
  }

  /**
   * Private methods
   */

  private setupPerformanceObservers(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      // Observe layout shifts
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            this.recordMetrics({
              cumulativeLayoutShift: (entry as any).value
            });
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);

      // Observe long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            ErrorReporter.getInstance().reportError(
              'general',
              'medium',
              'Long task detected',
              { duration: entry.duration, name: entry.name }
            );
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      this.observers.push(longTaskObserver);

    } catch (error) {
      console.warn('Failed to setup performance observers:', error);
    }
  }

  private recordExecutionTime(name: string, duration: number, error?: any): void {
    const metrics: Partial<PerformanceMetrics> = {};

    if (name.includes('markdown')) {
      metrics.markdownRenderTime = duration;
    } else if (name.includes('scroll')) {
      metrics.scrollResponseTime = duration;
    } else if (name.includes('mount')) {
      metrics.componentMountTime = duration;
    }

    if (error) {
      metrics.errorCount = 1;
    }

    this.recordMetrics(metrics);
  }

  private getMemoryUsage(): number {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as any)) {
      const memory = (window.performance as any).memory;
      return memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return 0;
  }

  private getCumulativeLayoutShift(): number {
    const latestMetric = this.metrics[this.metrics.length - 1];
    return latestMetric?.cumulativeLayoutShift || 0;
  }

  private checkPerformanceThresholds(metrics: PerformanceMetrics): void {
    const errorReporter = ErrorReporter.getInstance();

    if (metrics.markdownRenderTime > 200) {
      errorReporter.reportError(
        'markdown',
        'medium',
        'Slow markdown rendering detected',
        { renderTime: metrics.markdownRenderTime }
      );
    }

    if (metrics.scrollResponseTime > 32) { // 30fps threshold
      errorReporter.reportError(
        'scroll',
        'medium',
        'Slow scroll response detected',
        { responseTime: metrics.scrollResponseTime }
      );
    }

    if (metrics.memoryUsage > 100) { // 100MB threshold
      errorReporter.reportError(
        'general',
        'high',
        'High memory usage detected',
        { memoryUsage: metrics.memoryUsage }
      );
    }

    if (metrics.cumulativeLayoutShift > 0.25) {
      errorReporter.reportError(
        'general',
        'medium',
        'High cumulative layout shift detected',
        { cls: metrics.cumulativeLayoutShift }
      );
    }
  }

  /**
   * Cleanup observers
   */
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

/**
 * Retry mechanism for failed operations
 */
export class RetryManager {
  private static instance: RetryManager;
  private retryAttempts: Map<string, number> = new Map();
  private maxRetries = 3;
  private baseDelay = 1000; // 1 second

  static getInstance(): RetryManager {
    if (!RetryManager.instance) {
      RetryManager.instance = new RetryManager();
    }
    return RetryManager.instance;
  }

  /**
   * Execute operation with retry logic
   */
  async executeWithRetry<T>(
    operationId: string,
    operation: () => Promise<T>,
    options?: {
      maxRetries?: number;
      baseDelay?: number;
      exponentialBackoff?: boolean;
    }
  ): Promise<T> {
    const maxRetries = options?.maxRetries || this.maxRetries;
    const baseDelay = options?.baseDelay || this.baseDelay;
    const exponentialBackoff = options?.exponentialBackoff !== false;

    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation();
        
        // Success - reset retry count
        this.retryAttempts.delete(operationId);
        return result;
        
      } catch (error) {
        lastError = error as Error;
        
        // Update retry count
        this.retryAttempts.set(operationId, attempt + 1);
        
        // Don't retry on last attempt
        if (attempt === maxRetries) {
          break;
        }

        // Calculate delay
        const delay = exponentialBackoff 
          ? baseDelay * Math.pow(2, attempt)
          : baseDelay;

        // Add jitter to prevent thundering herd
        const jitteredDelay = delay + Math.random() * 1000;

        // Log retry attempt
        ErrorReporter.getInstance().reportError(
          'general',
          'low',
          `Retry attempt ${attempt + 1} for operation ${operationId}`,
          { error: error.message, delay: jitteredDelay }
        );

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, jitteredDelay));
      }
    }

    // All retries failed
    ErrorReporter.getInstance().reportError(
      'general',
      'high',
      `Operation ${operationId} failed after ${maxRetries} retries`,
      { finalError: lastError.message }
    );

    throw lastError;
  }

  /**
   * Get retry count for operation
   */
  getRetryCount(operationId: string): number {
    return this.retryAttempts.get(operationId) || 0;
  }

  /**
   * Reset retry count for operation
   */
  resetRetryCount(operationId: string): void {
    this.retryAttempts.delete(operationId);
  }

  /**
   * Clear all retry counts
   */
  clearAllRetries(): void {
    this.retryAttempts.clear();
  }
}

/**
 * Fallback content provider
 */
export class FallbackProvider {
  private static fallbackContent = {
    markdown: {
      error: '⚠️ Une erreur est survenue lors du rendu du contenu. Le contenu original est affiché ci-dessous.',
      loading: '⏳ Chargement du contenu...',
      empty: '📝 Aucun contenu à afficher.'
    },
    scroll: {
      error: '⚠️ Le défilement automatique est temporairement désactivé.',
      disabled: '📜 Défilement manuel activé.'
    },
    controls: {
      error: '⚠️ Certains contrôles sont temporairement indisponibles.',
      fallback: '🔧 Mode de contrôle simplifié activé.'
    },
    general: {
      error: '⚠️ Une erreur inattendue s\'est produite. Veuillez actualiser la page.',
      retry: '🔄 Nouvelle tentative en cours...',
      offline: '📡 Connexion interrompue. Vérifiez votre connexion internet.'
    }
  };

  static getFallbackContent(type: keyof typeof FallbackProvider.fallbackContent, subtype: string): string {
    return FallbackProvider.fallbackContent[type]?.[subtype as keyof typeof FallbackProvider.fallbackContent[typeof type]] || 
           FallbackProvider.fallbackContent.general.error;
  }

  static createFallbackComponent(
    type: string,
    error?: Error,
    onRetry?: () => void
  ): React.ReactElement {
    return React.createElement('div', {
      className: 'p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg',
      role: 'alert'
    }, [
      React.createElement('div', {
        key: 'icon',
        className: 'flex items-center space-x-2 mb-2'
      }, [
        React.createElement('span', { key: 'emoji', className: 'text-xl' }, '⚠️'),
        React.createElement('span', { 
          key: 'title',
          className: 'font-semibold text-yellow-800 dark:text-yellow-200' 
        }, 'Erreur temporaire')
      ]),
      React.createElement('p', {
        key: 'message',
        className: 'text-yellow-700 dark:text-yellow-300 mb-3'
      }, `Une erreur est survenue dans le composant ${type}. ${error?.message || 'Erreur inconnue'}`),
      onRetry && React.createElement('button', {
        key: 'retry',
        onClick: onRetry,
        className: 'px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm transition-colors',
        type: 'button'
      }, '🔄 Réessayer')
    ]);
  }
}

// Export singleton instances
export const errorReporter = ErrorReporter.getInstance();
export const performanceMonitor = PerformanceMonitor.getInstance();
export const retryManager = RetryManager.getInstance();