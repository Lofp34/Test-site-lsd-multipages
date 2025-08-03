/**
 * Service d'analytics pour le chat Gemini
 * Collecte des métriques anonymisées, erreurs API et performances
 */

export interface ChatSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  messageCount: number;
  userAgent: string;
  referrer?: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  conversationId?: string;
}

export interface ChatMessage {
  sessionId: string;
  messageId: string;
  timestamp: Date;
  role: 'user' | 'assistant';
  messageLength: number;
  hasFiles: boolean;
  fileTypes?: string[];
  processingTime?: number;
  tokenCount?: number;
  errorOccurred: boolean;
}

export interface ChatError {
  sessionId: string;
  timestamp: Date;
  errorType: 'api_error' | 'network_error' | 'file_upload_error' | 'validation_error';
  errorCode?: string;
  errorMessage: string;
  context?: Record<string, any>;
  userAgent: string;
  retryAttempted: boolean;
}

export interface PerformanceMetric {
  sessionId: string;
  timestamp: Date;
  metricType: 'response_time' | 'file_upload_time' | 'streaming_latency' | 'token_processing_rate';
  value: number;
  unit: 'ms' | 'seconds' | 'tokens_per_second' | 'bytes_per_second';
  context?: Record<string, any>;
}

export interface ConversationAnalytics {
  sessionId: string;
  totalMessages: number;
  averageResponseTime: number;
  totalTokensUsed: number;
  filesUploaded: number;
  conversationDuration: number;
  topicsDiscussed: string[];
  conversionIntent: 'high' | 'medium' | 'low';
  userSatisfaction?: number;
  bounced: boolean;
}

class ChatAnalyticsService {
  private sessions: Map<string, ChatSession> = new Map();
  private messages: ChatMessage[] = [];
  private errors: ChatError[] = [];
  private performanceMetrics: PerformanceMetric[] = [];
  private conversationAnalytics: ConversationAnalytics[] = [];
  
  // Configuration
  private readonly MAX_STORAGE_ITEMS = 1000;
  private readonly ANALYTICS_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_ANALYTICS_ENDPOINT;
  private readonly BATCH_SIZE = 50;
  private readonly FLUSH_INTERVAL = 30000; // 30 secondes
  
  private flushTimer?: NodeJS.Timeout;

  constructor() {
    this.initializePeriodicFlush();
    this.loadFromStorage();
  }

  /**
   * Démarre une nouvelle session de chat
   */
  startSession(sessionId: string, conversationId?: string): ChatSession {
    const session: ChatSession = {
      id: sessionId,
      startTime: new Date(),
      messageCount: 0,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      deviceType: this.detectDeviceType(),
      conversationId
    };

    this.sessions.set(sessionId, session);
    this.saveToStorage();
    
    return session;
  }

  /**
   * Termine une session de chat
   */
  endSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.endTime = new Date();
      this.generateConversationAnalytics(sessionId);
      this.saveToStorage();
    }
  }

  /**
   * Enregistre un message de chat
   */
  trackMessage(
    sessionId: string,
    messageId: string,
    role: 'user' | 'assistant',
    messageLength: number,
    options: {
      hasFiles?: boolean;
      fileTypes?: string[];
      processingTime?: number;
      tokenCount?: number;
      errorOccurred?: boolean;
    } = {}
  ): void {
    const message: ChatMessage = {
      sessionId,
      messageId,
      timestamp: new Date(),
      role,
      messageLength,
      hasFiles: options.hasFiles || false,
      fileTypes: options.fileTypes,
      processingTime: options.processingTime,
      tokenCount: options.tokenCount,
      errorOccurred: options.errorOccurred || false
    };

    this.messages.push(message);
    
    // Mettre à jour le compteur de messages de la session
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messageCount++;
    }

    this.trimStorage();
    this.saveToStorage();
  }

  /**
   * Enregistre une erreur
   */
  trackError(
    sessionId: string,
    errorType: ChatError['errorType'],
    errorMessage: string,
    options: {
      errorCode?: string;
      context?: Record<string, any>;
      retryAttempted?: boolean;
    } = {}
  ): void {
    const error: ChatError = {
      sessionId,
      timestamp: new Date(),
      errorType,
      errorCode: options.errorCode,
      errorMessage,
      context: options.context,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      retryAttempted: options.retryAttempted || false
    };

    this.errors.push(error);
    this.trimStorage();
    this.saveToStorage();
  }

  /**
   * Enregistre une métrique de performance
   */
  trackPerformance(
    sessionId: string,
    metricType: PerformanceMetric['metricType'],
    value: number,
    unit: PerformanceMetric['unit'],
    context?: Record<string, any>
  ): void {
    const metric: PerformanceMetric = {
      sessionId,
      timestamp: new Date(),
      metricType,
      value,
      unit,
      context
    };

    this.performanceMetrics.push(metric);
    this.trimStorage();
    this.saveToStorage();
  }

  /**
   * Génère les analytics de conversation
   */
  private generateConversationAnalytics(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    const sessionMessages = this.messages.filter(m => m.sessionId === sessionId);
    const sessionMetrics = this.performanceMetrics.filter(m => m.sessionId === sessionId);
    
    if (!session || sessionMessages.length === 0) return;

    const responseTimeMetrics = sessionMetrics.filter(m => m.metricType === 'response_time');
    const averageResponseTime = responseTimeMetrics.length > 0 
      ? responseTimeMetrics.reduce((sum, m) => sum + m.value, 0) / responseTimeMetrics.length 
      : 0;

    const totalTokens = sessionMessages.reduce((sum, m) => sum + (m.tokenCount || 0), 0);
    const filesUploaded = sessionMessages.filter(m => m.hasFiles).length;
    
    const conversationDuration = session.endTime && session.startTime 
      ? session.endTime.getTime() - session.startTime.getTime() 
      : 0;

    const analytics: ConversationAnalytics = {
      sessionId,
      totalMessages: sessionMessages.length,
      averageResponseTime,
      totalTokensUsed: totalTokens,
      filesUploaded,
      conversationDuration,
      topicsDiscussed: this.extractTopics(sessionMessages),
      conversionIntent: this.calculateConversionIntent(sessionMessages, conversationDuration),
      bounced: sessionMessages.length <= 2 && conversationDuration < 30000, // Moins de 30s et 2 messages max
    };

    this.conversationAnalytics.push(analytics);
  }

  /**
   * Extrait les sujets de conversation (simplifié)
   */
  private extractTopics(messages: ChatMessage[]): string[] {
    // Implémentation simplifiée - dans un vrai système, on utiliserait du NLP
    const topics = ['general_inquiry'];
    
    // Logique basique basée sur la longueur et le nombre de messages
    if (messages.length > 5) topics.push('detailed_discussion');
    if (messages.some(m => m.hasFiles)) topics.push('multimodal_interaction');
    if (messages.length > 10) topics.push('complex_consultation');
    
    return topics;
  }

  /**
   * Calcule l'intention de conversion
   */
  private calculateConversionIntent(messages: ChatMessage[], duration: number): 'high' | 'medium' | 'low' {
    const messageCount = messages.length;
    const hasFiles = messages.some(m => m.hasFiles);
    
    // Logique simplifiée
    if (messageCount > 8 && duration > 300000 && hasFiles) return 'high'; // Plus de 5 min, beaucoup de messages, fichiers
    if (messageCount > 4 && duration > 120000) return 'medium'; // Plus de 2 min, quelques messages
    return 'low';
  }

  /**
   * Détecte le type d'appareil
   */
  private detectDeviceType(): 'mobile' | 'desktop' | 'tablet' {
    if (typeof navigator === 'undefined') return 'desktop';
    
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
      return 'mobile';
    }
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet';
    }
    return 'desktop';
  }

  /**
   * Obtient les statistiques globales
   */
  getGlobalStats(): {
    totalSessions: number;
    totalMessages: number;
    totalErrors: number;
    averageSessionDuration: number;
    averageMessagesPerSession: number;
    errorRate: number;
    deviceBreakdown: Record<string, number>;
    topErrorTypes: Array<{ type: string; count: number }>;
  } {
    const completedSessions = Array.from(this.sessions.values()).filter(s => s.endTime);
    
    const totalSessionDuration = completedSessions.reduce((sum, session) => {
      return sum + (session.endTime!.getTime() - session.startTime.getTime());
    }, 0);

    const deviceBreakdown = completedSessions.reduce((acc, session) => {
      acc[session.deviceType] = (acc[session.deviceType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const errorTypeCounts = this.errors.reduce((acc, error) => {
      acc[error.errorType] = (acc[error.errorType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topErrorTypes = Object.entries(errorTypeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalSessions: this.sessions.size,
      totalMessages: this.messages.length,
      totalErrors: this.errors.length,
      averageSessionDuration: completedSessions.length > 0 ? totalSessionDuration / completedSessions.length : 0,
      averageMessagesPerSession: completedSessions.length > 0 ? this.messages.length / completedSessions.length : 0,
      errorRate: this.messages.length > 0 ? this.errors.length / this.messages.length : 0,
      deviceBreakdown,
      topErrorTypes
    };
  }

  /**
   * Obtient les métriques de performance
   */
  getPerformanceStats(): {
    averageResponseTime: number;
    averageFileUploadTime: number;
    averageStreamingLatency: number;
    tokenProcessingRate: number;
    performanceTrends: Array<{ timestamp: Date; responseTime: number }>;
  } {
    const responseTimeMetrics = this.performanceMetrics.filter(m => m.metricType === 'response_time');
    const fileUploadMetrics = this.performanceMetrics.filter(m => m.metricType === 'file_upload_time');
    const streamingMetrics = this.performanceMetrics.filter(m => m.metricType === 'streaming_latency');
    const tokenRateMetrics = this.performanceMetrics.filter(m => m.metricType === 'token_processing_rate');

    const averageResponseTime = responseTimeMetrics.length > 0
      ? responseTimeMetrics.reduce((sum, m) => sum + m.value, 0) / responseTimeMetrics.length
      : 0;

    const averageFileUploadTime = fileUploadMetrics.length > 0
      ? fileUploadMetrics.reduce((sum, m) => sum + m.value, 0) / fileUploadMetrics.length
      : 0;

    const averageStreamingLatency = streamingMetrics.length > 0
      ? streamingMetrics.reduce((sum, m) => sum + m.value, 0) / streamingMetrics.length
      : 0;

    const tokenProcessingRate = tokenRateMetrics.length > 0
      ? tokenRateMetrics.reduce((sum, m) => sum + m.value, 0) / tokenRateMetrics.length
      : 0;

    // Tendances des 24 dernières heures
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentResponseTimes = responseTimeMetrics
      .filter(m => m.timestamp > last24Hours)
      .map(m => ({ timestamp: m.timestamp, responseTime: m.value }))
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    return {
      averageResponseTime,
      averageFileUploadTime,
      averageStreamingLatency,
      tokenProcessingRate,
      performanceTrends: recentResponseTimes
    };
  }

  /**
   * Obtient les analytics de conversation
   */
  getConversationAnalytics(): ConversationAnalytics[] {
    return [...this.conversationAnalytics];
  }

  /**
   * Exporte les données pour analyse externe
   */
  exportData(): {
    sessions: ChatSession[];
    messages: ChatMessage[];
    errors: ChatError[];
    performanceMetrics: PerformanceMetric[];
    conversationAnalytics: ConversationAnalytics[];
  } {
    return {
      sessions: Array.from(this.sessions.values()),
      messages: [...this.messages],
      errors: [...this.errors],
      performanceMetrics: [...this.performanceMetrics],
      conversationAnalytics: [...this.conversationAnalytics]
    };
  }

  /**
   * Vide les données (pour les tests ou la maintenance)
   */
  clearData(): void {
    this.sessions.clear();
    this.messages = [];
    this.errors = [];
    this.performanceMetrics = [];
    this.conversationAnalytics = [];
    this.saveToStorage();
  }

  /**
   * Sauvegarde périodique des données
   */
  private initializePeriodicFlush(): void {
    if (typeof window === 'undefined') return;
    
    this.flushTimer = setInterval(() => {
      this.flushToServer();
    }, this.FLUSH_INTERVAL);
  }

  /**
   * Envoie les données au serveur d'analytics
   */
  private async flushToServer(): Promise<void> {
    if (!this.ANALYTICS_ENDPOINT || typeof window === 'undefined') return;

    try {
      const data = this.exportData();
      
      // Envoyer par batch pour éviter les requêtes trop lourdes
      const batches = this.createBatches(data);
      
      for (const batch of batches) {
        await fetch(this.ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(batch)
        });
      }
      
      // Nettoyer les données envoyées (garder seulement les plus récentes)
      this.cleanupOldData();
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi des analytics:', error);
    }
  }

  /**
   * Crée des batches de données pour l'envoi
   */
  private createBatches(data: ReturnType<typeof this.exportData>): any[] {
    const batches = [];
    const { sessions, messages, errors, performanceMetrics, conversationAnalytics } = data;
    
    // Batch des sessions
    for (let i = 0; i < sessions.length; i += this.BATCH_SIZE) {
      batches.push({
        type: 'sessions',
        data: sessions.slice(i, i + this.BATCH_SIZE)
      });
    }
    
    // Batch des messages
    for (let i = 0; i < messages.length; i += this.BATCH_SIZE) {
      batches.push({
        type: 'messages',
        data: messages.slice(i, i + this.BATCH_SIZE)
      });
    }
    
    // Batch des erreurs
    for (let i = 0; i < errors.length; i += this.BATCH_SIZE) {
      batches.push({
        type: 'errors',
        data: errors.slice(i, i + this.BATCH_SIZE)
      });
    }
    
    // Batch des métriques de performance
    for (let i = 0; i < performanceMetrics.length; i += this.BATCH_SIZE) {
      batches.push({
        type: 'performance',
        data: performanceMetrics.slice(i, i + this.BATCH_SIZE)
      });
    }
    
    // Batch des analytics de conversation
    for (let i = 0; i < conversationAnalytics.length; i += this.BATCH_SIZE) {
      batches.push({
        type: 'conversation_analytics',
        data: conversationAnalytics.slice(i, i + this.BATCH_SIZE)
      });
    }
    
    return batches;
  }

  /**
   * Nettoie les anciennes données
   */
  private cleanupOldData(): void {
    const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 jours
    
    // Garder seulement les données des 7 derniers jours
    this.messages = this.messages.filter(m => m.timestamp > cutoffDate);
    this.errors = this.errors.filter(e => e.timestamp > cutoffDate);
    this.performanceMetrics = this.performanceMetrics.filter(m => m.timestamp > cutoffDate);
    
    // Nettoyer les sessions terminées anciennes
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.endTime && session.endTime < cutoffDate) {
        this.sessions.delete(sessionId);
      }
    }
    
    this.saveToStorage();
  }

  /**
   * Limite le stockage pour éviter la surcharge mémoire
   */
  private trimStorage(): void {
    if (this.messages.length > this.MAX_STORAGE_ITEMS) {
      this.messages = this.messages.slice(-this.MAX_STORAGE_ITEMS);
    }
    
    if (this.errors.length > this.MAX_STORAGE_ITEMS) {
      this.errors = this.errors.slice(-this.MAX_STORAGE_ITEMS);
    }
    
    if (this.performanceMetrics.length > this.MAX_STORAGE_ITEMS) {
      this.performanceMetrics = this.performanceMetrics.slice(-this.MAX_STORAGE_ITEMS);
    }
  }

  /**
   * Sauvegarde en localStorage
   */
  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const data = {
        sessions: Array.from(this.sessions.entries()),
        messages: this.messages.slice(-100), // Garder seulement les 100 derniers
        errors: this.errors.slice(-50), // Garder seulement les 50 dernières
        performanceMetrics: this.performanceMetrics.slice(-100),
        conversationAnalytics: this.conversationAnalytics.slice(-50)
      };
      
      localStorage.setItem('chat_analytics', JSON.stringify(data));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des analytics:', error);
    }
  }

  /**
   * Charge depuis localStorage
   */
  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('chat_analytics');
      if (stored) {
        const data = JSON.parse(stored);
        
        // Restaurer les sessions
        if (data.sessions) {
          this.sessions = new Map(data.sessions.map(([id, session]: [string, any]) => [
            id,
            {
              ...session,
              startTime: new Date(session.startTime),
              endTime: session.endTime ? new Date(session.endTime) : undefined
            }
          ]));
        }
        
        // Restaurer les messages
        if (data.messages) {
          this.messages = data.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        }
        
        // Restaurer les erreurs
        if (data.errors) {
          this.errors = data.errors.map((error: any) => ({
            ...error,
            timestamp: new Date(error.timestamp)
          }));
        }
        
        // Restaurer les métriques de performance
        if (data.performanceMetrics) {
          this.performanceMetrics = data.performanceMetrics.map((metric: any) => ({
            ...metric,
            timestamp: new Date(metric.timestamp)
          }));
        }
        
        // Restaurer les analytics de conversation
        if (data.conversationAnalytics) {
          this.conversationAnalytics = data.conversationAnalytics;
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des analytics:', error);
    }
  }

  /**
   * Nettoyage lors de la destruction
   */
  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flushToServer(); // Dernier envoi
  }
}

// Instance singleton
export const chatAnalyticsService = new ChatAnalyticsService();

// Hook pour React
export function useChatAnalytics() {
  return {
    startSession: (sessionId: string, conversationId?: string) => 
      chatAnalyticsService.startSession(sessionId, conversationId),
    endSession: (sessionId: string) => 
      chatAnalyticsService.endSession(sessionId),
    trackMessage: (sessionId: string, messageId: string, role: 'user' | 'assistant', messageLength: number, options?: any) =>
      chatAnalyticsService.trackMessage(sessionId, messageId, role, messageLength, options),
    trackError: (sessionId: string, errorType: ChatError['errorType'], errorMessage: string, options?: any) =>
      chatAnalyticsService.trackError(sessionId, errorType, errorMessage, options),
    trackPerformance: (sessionId: string, metricType: PerformanceMetric['metricType'], value: number, unit: PerformanceMetric['unit'], context?: any) =>
      chatAnalyticsService.trackPerformance(sessionId, metricType, value, unit, context),
    getGlobalStats: () => chatAnalyticsService.getGlobalStats(),
    getPerformanceStats: () => chatAnalyticsService.getPerformanceStats(),
    getConversationAnalytics: () => chatAnalyticsService.getConversationAnalytics(),
    exportData: () => chatAnalyticsService.exportData(),
    clearData: () => chatAnalyticsService.clearData()
  };
}