/**
 * Service de monitoring des coûts API Gemini
 * Surveille l'usage et envoie des alertes en cas de dépassement
 */

interface CostConfig {
  // Coûts par modèle (en USD pour 1M tokens)
  modelCosts: {
    'gemini-2.5-flash': {
      input: number;
      output: number;
    };
    'gemini-2.5-pro': {
      input: number;
      output: number;
    };
  };
  
  // Seuils d'alerte (en USD)
  alertThresholds: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  
  // Configuration des notifications
  notifications: {
    email?: string;
    webhook?: string;
    enabled: boolean;
  };
}

interface UsageRecord {
  timestamp: Date;
  model: string;
  inputTokens: number;
  outputTokens: number;
  estimatedCost: number;
  sessionId: string;
  messageId: string;
}

interface CostSummary {
  period: 'daily' | 'weekly' | 'monthly';
  totalCost: number;
  totalTokens: number;
  requestCount: number;
  averageCostPerRequest: number;
  breakdown: {
    model: string;
    cost: number;
    tokens: number;
    requests: number;
  }[];
}

class GeminiCostMonitor {
  private config: CostConfig;
  private usageRecords: UsageRecord[] = [];
  private lastAlertSent: Map<string, Date> = new Map();
  
  // Coûts par défaut (à jour au moment de l'implémentation)
  private readonly DEFAULT_CONFIG: CostConfig = {
    modelCosts: {
      'gemini-2.5-flash': {
        input: 0.075,  // $0.075 per 1M input tokens
        output: 0.30   // $0.30 per 1M output tokens
      },
      'gemini-2.5-pro': {
        input: 1.25,   // $1.25 per 1M input tokens
        output: 5.00   // $5.00 per 1M output tokens
      }
    },
    alertThresholds: {
      daily: 10,     // $10 par jour
      weekly: 50,    // $50 par semaine
      monthly: 200   // $200 par mois
    },
    notifications: {
      email: process.env.ADMIN_EMAIL,
      webhook: process.env.COST_ALERT_WEBHOOK,
      enabled: true
    }
  };

  constructor(config?: Partial<CostConfig>) {
    this.config = { ...this.DEFAULT_CONFIG, ...config };
    this.loadUsageFromStorage();
    
    // Nettoyage périodique des anciennes données
    setInterval(() => this.cleanupOldRecords(), 24 * 60 * 60 * 1000); // Tous les jours
  }

  /**
   * Enregistre l'usage d'une requête API
   */
  recordUsage(
    model: string,
    inputTokens: number,
    outputTokens: number,
    sessionId: string,
    messageId: string
  ): number {
    const modelKey = model as keyof typeof this.config.modelCosts;
    const costs = this.config.modelCosts[modelKey];
    
    if (!costs) {
      console.warn(`Modèle inconnu pour le calcul des coûts: ${model}`);
      return 0;
    }

    // Calcul du coût (conversion de tokens en millions)
    const inputCost = (inputTokens / 1_000_000) * costs.input;
    const outputCost = (outputTokens / 1_000_000) * costs.output;
    const totalCost = inputCost + outputCost;

    const record: UsageRecord = {
      timestamp: new Date(),
      model,
      inputTokens,
      outputTokens,
      estimatedCost: totalCost,
      sessionId,
      messageId
    };

    this.usageRecords.push(record);
    this.saveUsageToStorage();
    
    // Vérifier les seuils d'alerte
    this.checkAlertThresholds();
    
    return totalCost;
  }

  /**
   * Obtient le résumé des coûts pour une période donnée
   */
  getCostSummary(period: 'daily' | 'weekly' | 'monthly'): CostSummary {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'weekly':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    const periodRecords = this.usageRecords.filter(
      record => record.timestamp >= startDate
    );

    const totalCost = periodRecords.reduce((sum, record) => sum + record.estimatedCost, 0);
    const totalTokens = periodRecords.reduce(
      (sum, record) => sum + record.inputTokens + record.outputTokens, 
      0
    );
    const requestCount = periodRecords.length;
    const averageCostPerRequest = requestCount > 0 ? totalCost / requestCount : 0;

    // Breakdown par modèle
    const modelBreakdown = periodRecords.reduce((acc, record) => {
      if (!acc[record.model]) {
        acc[record.model] = {
          cost: 0,
          tokens: 0,
          requests: 0
        };
      }
      
      acc[record.model].cost += record.estimatedCost;
      acc[record.model].tokens += record.inputTokens + record.outputTokens;
      acc[record.model].requests += 1;
      
      return acc;
    }, {} as Record<string, { cost: number; tokens: number; requests: number }>);

    const breakdown = Object.entries(modelBreakdown).map(([model, data]) => ({
      model,
      ...data
    }));

    return {
      period,
      totalCost,
      totalTokens,
      requestCount,
      averageCostPerRequest,
      breakdown
    };
  }

  /**
   * Obtient les tendances de coût
   */
  getCostTrends(days: number = 30): Array<{
    date: string;
    cost: number;
    requests: number;
    tokens: number;
  }> {
    const now = new Date();
    const trends = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

      const dayRecords = this.usageRecords.filter(
        record => record.timestamp >= dayStart && record.timestamp < dayEnd
      );

      const cost = dayRecords.reduce((sum, record) => sum + record.estimatedCost, 0);
      const requests = dayRecords.length;
      const tokens = dayRecords.reduce(
        (sum, record) => sum + record.inputTokens + record.outputTokens,
        0
      );

      trends.push({
        date: date.toISOString().split('T')[0],
        cost,
        requests,
        tokens
      });
    }

    return trends;
  }

  /**
   * Obtient les prédictions de coût basées sur l'usage actuel
   */
  getCostPredictions(): {
    dailyProjection: number;
    weeklyProjection: number;
    monthlyProjection: number;
    yearlyProjection: number;
  } {
    const dailySummary = this.getCostSummary('daily');
    const weeklySummary = this.getCostSummary('weekly');
    
    // Projection basée sur la moyenne des 7 derniers jours
    const avgDailyCost = weeklySummary.totalCost / 7;
    
    return {
      dailyProjection: avgDailyCost,
      weeklyProjection: avgDailyCost * 7,
      monthlyProjection: avgDailyCost * 30,
      yearlyProjection: avgDailyCost * 365
    };
  }

  /**
   * Vérifie les seuils d'alerte et envoie des notifications si nécessaire
   */
  private async checkAlertThresholds(): Promise<void> {
    if (!this.config.notifications.enabled) return;

    const dailySummary = this.getCostSummary('daily');
    const weeklySummary = this.getCostSummary('weekly');
    const monthlySummary = this.getCostSummary('monthly');

    const alerts = [];

    // Vérifier les seuils
    if (dailySummary.totalCost > this.config.alertThresholds.daily) {
      if (!this.wasAlertSentRecently('daily')) {
        alerts.push({
          type: 'daily',
          threshold: this.config.alertThresholds.daily,
          actual: dailySummary.totalCost,
          message: `Coût quotidien dépassé: $${dailySummary.totalCost.toFixed(2)} > $${this.config.alertThresholds.daily}`
        });
        this.lastAlertSent.set('daily', new Date());
      }
    }

    if (weeklySummary.totalCost > this.config.alertThresholds.weekly) {
      if (!this.wasAlertSentRecently('weekly')) {
        alerts.push({
          type: 'weekly',
          threshold: this.config.alertThresholds.weekly,
          actual: weeklySummary.totalCost,
          message: `Coût hebdomadaire dépassé: $${weeklySummary.totalCost.toFixed(2)} > $${this.config.alertThresholds.weekly}`
        });
        this.lastAlertSent.set('weekly', new Date());
      }
    }

    if (monthlySummary.totalCost > this.config.alertThresholds.monthly) {
      if (!this.wasAlertSentRecently('monthly')) {
        alerts.push({
          type: 'monthly',
          threshold: this.config.alertThresholds.monthly,
          actual: monthlySummary.totalCost,
          message: `Coût mensuel dépassé: $${monthlySummary.totalCost.toFixed(2)} > $${this.config.alertThresholds.monthly}`
        });
        this.lastAlertSent.set('monthly', new Date());
      }
    }

    // Envoyer les alertes
    for (const alert of alerts) {
      await this.sendAlert(alert);
    }
  }

  /**
   * Vérifie si une alerte a été envoyée récemment pour éviter le spam
   */
  private wasAlertSentRecently(type: string): boolean {
    const lastSent = this.lastAlertSent.get(type);
    if (!lastSent) return false;

    const hoursSinceLastAlert = (Date.now() - lastSent.getTime()) / (1000 * 60 * 60);
    return hoursSinceLastAlert < 4; // Pas plus d'une alerte toutes les 4 heures
  }

  /**
   * Envoie une alerte de coût
   */
  private async sendAlert(alert: any): Promise<void> {
    try {
      // Email
      if (this.config.notifications.email) {
        await this.sendEmailAlert(alert);
      }

      // Webhook
      if (this.config.notifications.webhook) {
        await this.sendWebhookAlert(alert);
      }

      console.warn(`Alerte de coût envoyée: ${alert.message}`);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'alerte:', error);
    }
  }

  /**
   * Envoie une alerte par email
   */
  private async sendEmailAlert(alert: any): Promise<void> {
    // Implémentation simplifiée - en production, utiliser un service d'email
    const emailData = {
      to: this.config.notifications.email,
      subject: `🚨 Alerte coût API Gemini - ${alert.type}`,
      body: `
        Alerte de dépassement de coût détectée:
        
        Type: ${alert.type}
        Seuil configuré: $${alert.threshold}
        Coût actuel: $${alert.actual.toFixed(2)}
        
        Veuillez vérifier votre usage API et ajuster si nécessaire.
        
        Dashboard: ${process.env.NEXT_PUBLIC_BASE_URL}/admin/chat-analytics
      `
    };

    // En production, intégrer avec SendGrid, AWS SES, etc.
    console.log('Email alert would be sent:', emailData);
  }

  /**
   * Envoie une alerte via webhook
   */
  private async sendWebhookAlert(alert: any): Promise<void> {
    if (!this.config.notifications.webhook) return;

    const payload = {
      type: 'cost_alert',
      alert,
      timestamp: new Date().toISOString(),
      summary: this.getCostSummary(alert.type as any)
    };

    await fetch(this.config.notifications.webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  }

  /**
   * Met à jour la configuration des seuils
   */
  updateThresholds(thresholds: Partial<CostConfig['alertThresholds']>): void {
    this.config.alertThresholds = { ...this.config.alertThresholds, ...thresholds };
    this.saveConfigToStorage();
  }

  /**
   * Met à jour la configuration des notifications
   */
  updateNotifications(notifications: Partial<CostConfig['notifications']>): void {
    this.config.notifications = { ...this.config.notifications, ...notifications };
    this.saveConfigToStorage();
  }

  /**
   * Obtient la configuration actuelle
   */
  getConfig(): CostConfig {
    return { ...this.config };
  }

  /**
   * Exporte les données d'usage
   */
  exportUsageData(): {
    records: UsageRecord[];
    summary: {
      daily: CostSummary;
      weekly: CostSummary;
      monthly: CostSummary;
    };
    trends: ReturnType<typeof this.getCostTrends>;
    predictions: ReturnType<typeof this.getCostPredictions>;
  } {
    return {
      records: [...this.usageRecords],
      summary: {
        daily: this.getCostSummary('daily'),
        weekly: this.getCostSummary('weekly'),
        monthly: this.getCostSummary('monthly')
      },
      trends: this.getCostTrends(),
      predictions: this.getCostPredictions()
    };
  }

  /**
   * Nettoie les anciens enregistrements
   */
  private cleanupOldRecords(): void {
    const cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // 90 jours
    this.usageRecords = this.usageRecords.filter(record => record.timestamp > cutoffDate);
    this.saveUsageToStorage();
  }

  /**
   * Sauvegarde les données d'usage
   */
  private saveUsageToStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const data = {
        records: this.usageRecords.slice(-1000), // Garder seulement les 1000 derniers
        lastAlertSent: Array.from(this.lastAlertSent.entries())
      };
      localStorage.setItem('gemini_cost_usage', JSON.stringify(data));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données de coût:', error);
    }
  }

  /**
   * Charge les données d'usage
   */
  private loadUsageFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('gemini_cost_usage');
      if (stored) {
        const data = JSON.parse(stored);
        
        if (data.records) {
          this.usageRecords = data.records.map((record: any) => ({
            ...record,
            timestamp: new Date(record.timestamp)
          }));
        }
        
        if (data.lastAlertSent) {
          this.lastAlertSent = new Map(
            data.lastAlertSent.map(([key, value]: [string, string]) => [key, new Date(value)])
          );
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données de coût:', error);
    }
  }

  /**
   * Sauvegarde la configuration
   */
  private saveConfigToStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('gemini_cost_config', JSON.stringify(this.config));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la configuration:', error);
    }
  }
}

// Instance singleton
export const geminiCostMonitor = new GeminiCostMonitor();

// Hook pour React
export function useCostMonitor() {
  return {
    recordUsage: (model: string, inputTokens: number, outputTokens: number, sessionId: string, messageId: string) =>
      geminiCostMonitor.recordUsage(model, inputTokens, outputTokens, sessionId, messageId),
    getCostSummary: (period: 'daily' | 'weekly' | 'monthly') =>
      geminiCostMonitor.getCostSummary(period),
    getCostTrends: (days?: number) =>
      geminiCostMonitor.getCostTrends(days),
    getCostPredictions: () =>
      geminiCostMonitor.getCostPredictions(),
    updateThresholds: (thresholds: any) =>
      geminiCostMonitor.updateThresholds(thresholds),
    updateNotifications: (notifications: any) =>
      geminiCostMonitor.updateNotifications(notifications),
    getConfig: () =>
      geminiCostMonitor.getConfig(),
    exportUsageData: () =>
      geminiCostMonitor.exportUsageData()
  };
}

export type { CostConfig, UsageRecord, CostSummary };