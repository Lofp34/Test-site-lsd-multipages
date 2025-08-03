/**
 * Intégration du service d'analytics avec les composants de chat existants
 */

import { chatAnalyticsService, ChatError } from './analytics-service';

/**
 * Wrapper pour intégrer l'analytics dans le GeminiService
 */
export class AnalyticsIntegratedGeminiService {
  private sessionId: string;
  private conversationId?: string;
  private startTime: number = 0;

  constructor(sessionId: string, conversationId?: string) {
    this.sessionId = sessionId;
    this.conversationId = conversationId;
    
    // Démarrer la session d'analytics
    chatAnalyticsService.startSession(sessionId, conversationId);
  }

  /**
   * Wrapper pour l'envoi de message avec analytics
   */
  async sendMessageWithAnalytics(
    originalSendMessage: Function,
    message: string,
    files?: File[]
  ): Promise<any> {
    const messageId = this.generateMessageId();
    this.startTime = Date.now();

    try {
      // Tracker le message utilisateur
      chatAnalyticsService.trackMessage(
        this.sessionId,
        messageId + '_user',
        'user',
        message.length,
        {
          hasFiles: files && files.length > 0,
          fileTypes: files?.map(f => f.type)
        }
      );

      // Exécuter l'envoi original
      const result = await originalSendMessage(message, files);
      
      // Calculer le temps de traitement
      const processingTime = Date.now() - this.startTime;
      
      // Tracker la performance
      chatAnalyticsService.trackPerformance(
        this.sessionId,
        'response_time',
        processingTime,
        'ms',
        {
          messageLength: message.length,
          hasFiles: files && files.length > 0,
          fileCount: files?.length || 0
        }
      );

      // Tracker le message de l'assistant
      if (result && result.text) {
        chatAnalyticsService.trackMessage(
          this.sessionId,
          messageId + '_assistant',
          'assistant',
          result.text.length,
          {
            processingTime,
            tokenCount: this.estimateTokenCount(result.text),
            errorOccurred: false
          }
        );
      }

      return result;

    } catch (error) {
      // Tracker l'erreur
      this.trackError('api_error', error);
      throw error;
    }
  }

  /**
   * Wrapper pour l'upload de fichier avec analytics
   */
  async uploadFileWithAnalytics(
    originalUploadFile: Function,
    file: File
  ): Promise<any> {
    const startTime = Date.now();

    try {
      const result = await originalUploadFile(file);
      
      const uploadTime = Date.now() - startTime;
      
      // Tracker la performance d'upload
      chatAnalyticsService.trackPerformance(
        this.sessionId,
        'file_upload_time',
        uploadTime,
        'ms',
        {
          fileSize: file.size,
          fileType: file.type,
          fileName: file.name
        }
      );

      return result;

    } catch (error) {
      // Tracker l'erreur d'upload
      this.trackError('file_upload_error', error, {
        fileSize: file.size,
        fileType: file.type,
        fileName: file.name
      });
      throw error;
    }
  }

  /**
   * Wrapper pour le streaming avec analytics
   */
  async* streamWithAnalytics(
    originalStream: AsyncIterable<any>
  ): AsyncIterable<any> {
    const streamStartTime = Date.now();
    let chunkCount = 0;
    let totalChars = 0;

    try {
      for await (const chunk of originalStream) {
        chunkCount++;
        if (chunk.text) {
          totalChars += chunk.text.length;
        }

        // Tracker la latence de streaming périodiquement
        if (chunkCount % 10 === 0) {
          const currentLatency = Date.now() - streamStartTime;
          chatAnalyticsService.trackPerformance(
            this.sessionId,
            'streaming_latency',
            currentLatency / chunkCount,
            'ms',
            {
              chunkCount,
              totalChars,
              avgCharsPerChunk: totalChars / chunkCount
            }
          );
        }

        yield chunk;
      }

      // Tracker les métriques finales de streaming
      const totalStreamTime = Date.now() - streamStartTime;
      if (totalChars > 0) {
        chatAnalyticsService.trackPerformance(
          this.sessionId,
          'token_processing_rate',
          totalChars / (totalStreamTime / 1000),
          'tokens_per_second',
          {
            totalChars,
            totalStreamTime,
            chunkCount
          }
        );
      }

    } catch (error) {
      this.trackError('api_error', error, {
        streamingContext: true,
        chunkCount,
        totalChars
      });
      throw error;
    }
  }

  /**
   * Tracker une erreur
   */
  trackError(
    errorType: ChatError['errorType'],
    error: any,
    context?: Record<string, any>
  ): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = error?.code || error?.status;

    chatAnalyticsService.trackError(
      this.sessionId,
      errorType,
      errorMessage,
      {
        errorCode,
        context,
        retryAttempted: false
      }
    );
  }

  /**
   * Tracker une tentative de retry
   */
  trackRetry(
    errorType: ChatError['errorType'],
    error: any,
    context?: Record<string, any>
  ): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = error?.code || error?.status;

    chatAnalyticsService.trackError(
      this.sessionId,
      errorType,
      errorMessage,
      {
        errorCode,
        context,
        retryAttempted: true
      }
    );
  }

  /**
   * Terminer la session
   */
  endSession(): void {
    chatAnalyticsService.endSession(this.sessionId);
  }

  /**
   * Générer un ID de message unique
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Estimer le nombre de tokens (approximation)
   */
  private estimateTokenCount(text: string): number {
    // Approximation simple : ~4 caractères par token en moyenne
    return Math.ceil(text.length / 4);
  }
}

/**
 * Hook pour utiliser l'analytics dans les composants React
 */
export function useAnalyticsIntegration(sessionId: string, conversationId?: string) {
  const analyticsService = new AnalyticsIntegratedGeminiService(sessionId, conversationId);

  return {
    // Méthodes wrappées avec analytics
    sendMessageWithAnalytics: analyticsService.sendMessageWithAnalytics.bind(analyticsService),
    uploadFileWithAnalytics: analyticsService.uploadFileWithAnalytics.bind(analyticsService),
    streamWithAnalytics: analyticsService.streamWithAnalytics.bind(analyticsService),
    
    // Méthodes de tracking direct
    trackError: analyticsService.trackError.bind(analyticsService),
    trackRetry: analyticsService.trackRetry.bind(analyticsService),
    endSession: analyticsService.endSession.bind(analyticsService),
    
    // Accès au service d'analytics global
    getGlobalStats: () => chatAnalyticsService.getGlobalStats(),
    getPerformanceStats: () => chatAnalyticsService.getPerformanceStats(),
    getConversationAnalytics: () => chatAnalyticsService.getConversationAnalytics()
  };
}

/**
 * Utilitaires pour l'intégration avec les composants existants
 */
export const AnalyticsUtils = {
  /**
   * Créer un ID de session unique
   */
  createSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Créer un ID de conversation unique
   */
  createConversationId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Détecter si l'utilisateur est sur mobile
   */
  isMobileDevice(): boolean {
    if (typeof navigator === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * Obtenir des informations sur la session utilisateur
   */
  getSessionInfo(): {
    userAgent: string;
    referrer: string;
    timestamp: Date;
    timezone: string;
    language: string;
  } {
    return {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      referrer: typeof document !== 'undefined' ? document.referrer : 'unknown',
      timestamp: new Date(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: typeof navigator !== 'undefined' ? navigator.language : 'unknown'
    };
  },

  /**
   * Calculer des métriques de performance
   */
  calculatePerformanceMetrics(startTime: number, endTime: number, dataSize?: number): {
    duration: number;
    throughput?: number;
    efficiency: 'excellent' | 'good' | 'average' | 'poor';
  } {
    const duration = endTime - startTime;
    const throughput = dataSize ? dataSize / (duration / 1000) : undefined;
    
    let efficiency: 'excellent' | 'good' | 'average' | 'poor';
    if (duration < 1000) efficiency = 'excellent';
    else if (duration < 3000) efficiency = 'good';
    else if (duration < 5000) efficiency = 'average';
    else efficiency = 'poor';

    return {
      duration,
      throughput,
      efficiency
    };
  },

  /**
   * Formater les données pour l'export
   */
  formatDataForExport(data: any): string {
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error formatting data for export:', error);
      return 'Error formatting data';
    }
  },

  /**
   * Valider les données d'analytics avant envoi
   */
  validateAnalyticsData(data: any): boolean {
    if (!data || typeof data !== 'object') return false;
    if (!data.sessionId || typeof data.sessionId !== 'string') return false;
    if (!data.timestamp || !(data.timestamp instanceof Date)) return false;
    return true;
  }
};

/**
 * Configuration par défaut pour l'analytics
 */
export const ANALYTICS_CONFIG = {
  // Intervalles de flush
  FLUSH_INTERVAL: 30000, // 30 secondes
  BATCH_SIZE: 50,
  
  // Limites de stockage
  MAX_STORAGE_ITEMS: 1000,
  MAX_SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 heures
  
  // Seuils de performance
  PERFORMANCE_THRESHOLDS: {
    EXCELLENT_RESPONSE_TIME: 1000, // 1 seconde
    GOOD_RESPONSE_TIME: 3000, // 3 secondes
    ACCEPTABLE_RESPONSE_TIME: 5000, // 5 secondes
    
    EXCELLENT_UPLOAD_TIME: 2000, // 2 secondes
    GOOD_UPLOAD_TIME: 5000, // 5 secondes
    ACCEPTABLE_UPLOAD_TIME: 10000, // 10 secondes
  },
  
  // Configuration des erreurs
  ERROR_RETRY_ATTEMPTS: 3,
  ERROR_RETRY_DELAY: 1000, // 1 seconde
  
  // Privacy settings
  ANONYMIZE_DATA: true,
  STORE_USER_CONTENT: false, // Ne pas stocker le contenu des messages
  DATA_RETENTION_DAYS: 30
};