/**
 * Service de monitoring de production pour le chat Gemini
 * Gère le reporting d'erreurs, l'analytics et les alertes
 */

import { getValidatedProductionConfig } from '@/config/production';

export interface ErrorReport {
  id: string;
  timestamp: Date;
  level: 'error' | 'warn' | 'info';
  message: string;
  stack?: string;
  context: {
    userAgent?: string;
    ip?: string;
    endpoint: string;
    requestId?: string;
    userId?: string;
  };
  metadata?: Record<string, any>;
}

export interface PerformanceMetric {
  id: string;
  timestamp: Date;
  metric: string;
  value: number;
  unit: string;
  context: {
    endpoint: string;
    userAgent?: string;
    ip?: string;
  };
}

export interface AlertConfig {
  name: string;
  condition: (metrics: PerformanceMetric[], errors: ErrorReport[]) => boolean;
  threshold: number;
  timeWindow: number; // en millisecondes
  cooldown: number; // temps minimum entre alertes
  severity: 'low' | 'medium' | 'high' | 'critical';
  channels: ('email' | 'webhook' | 'console')[];
}

class ProductionMonitoringService {
  private static instance: ProductionMonitoringService;
  private config = getValidatedProductionConfig();
  private errors: ErrorReport[] = [];
  private metrics: PerformanceMetric[] = [];
  private alerts: Map<string, { lastTriggered: Date; count: number }> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  private constructor() {
    // Nettoyage périodique des anciennes données
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 60 * 1000); // Toutes les heures
  }

  static getInstance(): ProductionMonitoringService {
    if (!ProductionMonitoringService.instance) {
      ProductionMonitoringService.instance = new ProductionMonitoringService();
    }
    return ProductionMonitoringService.instance;
  }

  /**
   * Enregistre une erreur
   */
  async reportError(error: Omit<ErrorReport, 'id' | 'timestamp'>): Promise<void> {
    if (!this.config.monitoring.enableErrorReporting) {
      return;
    }

    const errorReport: ErrorReport = {
      id: this.generateId(),
      timestamp: new Date(),
      ...error
    };

    this.errors.push(errorReport);

    // Log selon le niveau configuré
    if (this.shouldLog(error.level)) {
      console.error(`[${error.level.toUpperCase()}] ${error.message}`, {
        context: error.context,
        stack: error.stack,
        metadata: error.metadata
      });
    }

    // Vérifier les alertes
    await this.checkAlerts();

    // Envoyer à un service externe en production
    if (process.env.NODE_ENV === 'production') {
      await this.sendToExternalService(errorReport);
    }
  }

  /**
   * Enregistre une métrique de performance
   */
  async recordMetric(metric: Omit<PerformanceMetric, 'id' | 'timestamp'>): Promise<void> {
    if (!this.config.monitoring.enablePerformanceTracking) {
      return;
    }

    const performanceMetric: PerformanceMetric = {
      id: this.generateId(),
      timestamp: new Date(),
      ...metric
    };

    this.metrics.push(performanceMetric);

    // Log des métriques importantes
    if (this.shouldLog('info')) {
      console.log(`[METRIC] ${metric.metric}: ${metric.value}${metric.unit}`, {
        context: metric.context
      });
    }
  }

  /**
   * Enregistre le temps de réponse d'une requête
   */
  async recordResponseTime(endpoint: string, duration: number, context?: any): Promise<void> {
    await this.recordMetric({
      metric: 'response_time',
      value: duration,
      unit: 'ms',
      context: {
        endpoint,
        ...context
      }
    });

    // Alerte si le temps de réponse est trop élevé
    if (duration > 5000) { // Plus de 5 secondes
      await this.reportError({
        level: 'warn',
        message: `Temps de réponse élevé: ${duration}ms`,
        context: {
          endpoint,
          ...context
        },
        metadata: { duration }
      });
    }
  }

  /**
   * Enregistre l'utilisation de tokens
   */
  async recordTokenUsage(tokens: number, context?: any): Promise<void> {
    await this.recordMetric({
      metric: 'tokens_used',
      value: tokens,
      unit: 'tokens',
      context: {
        endpoint: '/api/chat/gemini',
        ...context
      }
    });
  }

  /**
   * Enregistre une erreur API Gemini
   */
  async recordGeminiError(error: any, context?: any): Promise<void> {
    let level: 'error' | 'warn' | 'info' = 'error';
    let message = 'Erreur API Gemini';

    // Classifier l'erreur
    if (error.message?.includes('quota')) {
      level = 'warn';
      message = 'Quota API Gemini dépassé';
    } else if (error.message?.includes('rate')) {
      level = 'warn';
      message = 'Rate limit API Gemini atteint';
    } else if (error.message?.includes('safety')) {
      level = 'info';
      message = 'Contenu bloqué par les filtres de sécurité';
    }

    await this.reportError({
      level,
      message,
      stack: error.stack,
      context: {
        endpoint: '/api/chat/gemini',
        ...context
      },
      metadata: {
        originalError: error.message,
        errorCode: error.code
      }
    });
  }

  /**
   * Obtient les statistiques de monitoring
   */
  getStats(): {
    errors: { total: number; byLevel: Record<string, number>; recent: number };
    metrics: { total: number; recent: number };
    performance: { avgResponseTime: number; maxResponseTime: number };
    alerts: { active: number; total: number };
  } {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);

    // Statistiques des erreurs
    const recentErrors = this.errors.filter(e => e.timestamp.getTime() > oneHourAgo);
    const errorsByLevel = this.errors.reduce((acc, error) => {
      acc[error.level] = (acc[error.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Statistiques des métriques
    const recentMetrics = this.metrics.filter(m => m.timestamp.getTime() > oneHourAgo);

    // Statistiques de performance
    const responseTimeMetrics = this.metrics.filter(m => m.metric === 'response_time');
    const avgResponseTime = responseTimeMetrics.length > 0 
      ? responseTimeMetrics.reduce((sum, m) => sum + m.value, 0) / responseTimeMetrics.length
      : 0;
    const maxResponseTime = responseTimeMetrics.length > 0
      ? Math.max(...responseTimeMetrics.map(m => m.value))
      : 0;

    return {
      errors: {
        total: this.errors.length,
        byLevel: errorsByLevel,
        recent: recentErrors.length
      },
      metrics: {
        total: this.metrics.length,
        recent: recentMetrics.length
      },
      performance: {
        avgResponseTime,
        maxResponseTime
      },
      alerts: {
        active: this.alerts.size,
        total: Array.from(this.alerts.values()).reduce((sum, alert) => sum + alert.count, 0)
      }
    };
  }

  /**
   * Obtient les erreurs récentes
   */
  getRecentErrors(limit: number = 50): ErrorReport[] {
    return this.errors
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Obtient les métriques récentes
   */
  getRecentMetrics(metric?: string, limit: number = 100): PerformanceMetric[] {
    let filteredMetrics = this.metrics;
    
    if (metric) {
      filteredMetrics = this.metrics.filter(m => m.metric === metric);
    }

    return filteredMetrics
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Configuration des alertes par défaut
   */
  private getDefaultAlerts(): AlertConfig[] {
    return [
      {
        name: 'high_error_rate',
        condition: (metrics, errors) => {
          const recentErrors = errors.filter(e => 
            Date.now() - e.timestamp.getTime() < 5 * 60 * 1000 // 5 minutes
          );
          return recentErrors.length > 10;
        },
        threshold: 10,
        timeWindow: 5 * 60 * 1000,
        cooldown: 15 * 60 * 1000,
        severity: 'high',
        channels: ['email', 'console']
      },
      {
        name: 'slow_response_time',
        condition: (metrics, errors) => {
          const recentResponseTimes = metrics.filter(m => 
            m.metric === 'response_time' && 
            Date.now() - m.timestamp.getTime() < 10 * 60 * 1000 // 10 minutes
          );
          const avgTime = recentResponseTimes.length > 0
            ? recentResponseTimes.reduce((sum, m) => sum + m.value, 0) / recentResponseTimes.length
            : 0;
          return avgTime > 3000; // Plus de 3 secondes
        },
        threshold: 3000,
        timeWindow: 10 * 60 * 1000,
        cooldown: 30 * 60 * 1000,
        severity: 'medium',
        channels: ['console']
      },
      {
        name: 'gemini_quota_exceeded',
        condition: (metrics, errors) => {
          const quotaErrors = errors.filter(e => 
            e.message.includes('quota') &&
            Date.now() - e.timestamp.getTime() < 60 * 1000 // 1 minute
          );
          return quotaErrors.length > 0;
        },
        threshold: 1,
        timeWindow: 60 * 1000,
        cooldown: 60 * 60 * 1000, // 1 heure
        severity: 'critical',
        channels: ['email', 'webhook', 'console']
      }
    ];
  }

  /**
   * Vérifie et déclenche les alertes si nécessaire
   */
  private async checkAlerts(): Promise<void> {
    const alerts = this.getDefaultAlerts();
    const now = new Date();

    for (const alert of alerts) {
      const alertState = this.alerts.get(alert.name);
      
      // Vérifier le cooldown
      if (alertState && (now.getTime() - alertState.lastTriggered.getTime()) < alert.cooldown) {
        continue;
      }

      // Vérifier la condition
      if (alert.condition(this.metrics, this.errors)) {
        await this.triggerAlert(alert);
        
        this.alerts.set(alert.name, {
          lastTriggered: now,
          count: (alertState?.count || 0) + 1
        });
      }
    }
  }

  /**
   * Déclenche une alerte
   */
  private async triggerAlert(alert: AlertConfig): Promise<void> {
    const message = `[${alert.severity.toUpperCase()}] Alerte: ${alert.name}`;
    
    for (const channel of alert.channels) {
      switch (channel) {
        case 'console':
          console.warn(message, { alert });
          break;
        case 'email':
          await this.sendEmailAlert(alert);
          break;
        case 'webhook':
          await this.sendWebhookAlert(alert);
          break;
      }
    }
  }

  /**
   * Envoie une alerte par email
   */
  private async sendEmailAlert(alert: AlertConfig): Promise<void> {
    // Implémentation simplifiée - en production, utiliser un service d'email
    console.log(`Email alert would be sent for: ${alert.name}`);
  }

  /**
   * Envoie une alerte par webhook
   */
  private async sendWebhookAlert(alert: AlertConfig): Promise<void> {
    // Implémentation simplifiée - en production, utiliser un webhook
    console.log(`Webhook alert would be sent for: ${alert.name}`);
  }

  /**
   * Envoie les données à un service externe
   */
  private async sendToExternalService(error: ErrorReport): Promise<void> {
    // Implémentation pour services comme Sentry, LogRocket, etc.
    // En production, remplacer par l'intégration réelle
    if (process.env.SENTRY_DSN) {
      // Exemple d'intégration Sentry
      console.log('Would send to Sentry:', error);
    }
  }

  /**
   * Détermine si on doit logger selon le niveau configuré
   */
  private shouldLog(level: 'error' | 'warn' | 'info'): boolean {
    const levels = ['error', 'warn', 'info', 'debug'];
    const configLevel = this.config.monitoring.logLevel;
    
    return levels.indexOf(level) <= levels.indexOf(configLevel);
  }

  /**
   * Génère un ID unique
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Nettoie les anciennes données
   */
  private cleanup(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 heures

    // Nettoyer les erreurs anciennes
    this.errors = this.errors.filter(error => 
      now - error.timestamp.getTime() < maxAge
    );

    // Nettoyer les métriques anciennes
    this.metrics = this.metrics.filter(metric => 
      now - metric.timestamp.getTime() < maxAge
    );

    // Nettoyer les alertes anciennes
    for (const [name, alert] of this.alerts.entries()) {
      if (now - alert.lastTriggered.getTime() > maxAge) {
        this.alerts.delete(name);
      }
    }
  }

  /**
   * Détruit le service et nettoie les ressources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.errors = [];
    this.metrics = [];
    this.alerts.clear();
  }
}

// Instance singleton
export const productionMonitoring = ProductionMonitoringService.getInstance();

// Utilitaires pour l'intégration
export const withMonitoring = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context: { endpoint: string; operation: string }
): T => {
  return (async (...args: any[]) => {
    const startTime = Date.now();
    
    try {
      const result = await fn(...args);
      
      // Enregistrer le succès
      await productionMonitoring.recordResponseTime(
        context.endpoint,
        Date.now() - startTime,
        { operation: context.operation }
      );
      
      return result;
    } catch (error) {
      // Enregistrer l'erreur
      await productionMonitoring.reportError({
        level: 'error',
        message: `Erreur dans ${context.operation}`,
        stack: error instanceof Error ? error.stack : undefined,
        context: {
          endpoint: context.endpoint,
          operation: context.operation
        },
        metadata: {
          args: args.length,
          duration: Date.now() - startTime
        }
      });
      
      throw error;
    }
  }) as T;
};

export default productionMonitoring;