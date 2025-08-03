/**
 * Système de gestion d'erreurs robuste pour le chat Gemini
 * Gère les erreurs contextuelles, récupération automatique et fallbacks
 */

import { ChatError, ChatErrorType } from './types';
import { chatAnalyticsService } from './analytics-service';

export interface ErrorRecoveryAction {
  type: 'retry' | 'fallback' | 'redirect' | 'manual';
  delay?: number;
  maxRetries?: number;
  fallbackMessage?: string;
  redirectUrl?: string;
  userAction?: string;
}

export interface ErrorContext {
  sessionId: string;
  messageId?: string;
  operation: 'send_message' | 'upload_file' | 'initialize_chat' | 'stream_response';
  userAgent: string;
  timestamp: Date;
  retryCount: number;
  lastError?: Error;
}

export interface ErrorHandlerConfig {
  maxRetries: number;
  retryDelays: number[]; // Délais progressifs en ms
  enableAutoRecovery: boolean;
  enableFallbackMessages: boolean;
  enableNetworkRecovery: boolean;
  logErrors: boolean;
  sendErrorReports: boolean;
}

class ChatErrorHandler {
  private config: ErrorHandlerConfig;
  private retryAttempts: Map<string, number> = new Map();
  private lastErrors: Map<string, Error> = new Map();
  private networkStatus: 'online' | 'offline' | 'unstable' = 'online';
  private recoveryCallbacks: Map<string, () => Promise<void>> = new Map();

  constructor(config: Partial<ErrorHandlerConfig> = {}) {
    this.config = {
      maxRetries: 3,
      retryDelays: [1000, 3000, 5000], // 1s, 3s, 5s
      enableAutoRecovery: true,
      enableFallbackMessages: true,
      enableNetworkRecovery: true,
      logErrors: true,
      sendErrorReports: true,
      ...config
    };

    this.initializeNetworkMonitoring();
  }

  /**
   * Gère une erreur et détermine l'action de récupération
   */
  async handleError(error: unknown, context: ErrorContext): Promise<{
    chatError: ChatError;
    recoveryAction: ErrorRecoveryAction;
    shouldRetry: boolean;
  }> {
    const chatError = this.convertToChatError(error, context);
    const recoveryAction = this.determineRecoveryAction(chatError, context);
    const shouldRetry = this.shouldRetry(chatError, context);

    // Enregistrer l'erreur dans les analytics
    if (this.config.logErrors) {
      chatAnalyticsService.trackError(
        context.sessionId,
        chatError.type,
        chatError.message,
        {
          errorCode: this.extractErrorCode(error),
          context: {
            operation: context.operation,
            retryCount: context.retryCount,
            userAgent: context.userAgent,
            networkStatus: this.networkStatus
          },
          retryAttempted: shouldRetry
        }
      );
    }

    // Incrémenter le compteur de tentatives
    const retryKey = `${context.sessionId}_${context.operation}`;
    this.retryAttempts.set(retryKey, context.retryCount + 1);
    this.lastErrors.set(retryKey, error instanceof Error ? error : new Error(String(error)));

    // Envoyer un rapport d'erreur si configuré
    if (this.config.sendErrorReports && this.shouldSendErrorReport(chatError)) {
      this.sendErrorReport(chatError, context);
    }

    return {
      chatError,
      recoveryAction,
      shouldRetry
    };
  }

  /**
   * Convertit une erreur générique en ChatError
   */
  private convertToChatError(error: unknown, context: ErrorContext): ChatError {
    if (error && typeof error === 'object' && 'type' in error) {
      return error as ChatError;
    }

    const errorMessage = error instanceof Error ? error.message : String(error);
    const lowerMessage = errorMessage.toLowerCase();

    // Détection du type d'erreur basée sur le message
    if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
      return {
        type: ChatErrorType.NETWORK_ERROR,
        message: errorMessage,
        userMessage: this.getNetworkErrorMessage(),
        retryable: true,
        retryAfter: this.calculateRetryDelay(context.retryCount)
      };
    }

    if (lowerMessage.includes('quota') || lowerMessage.includes('limit')) {
      return {
        type: ChatErrorType.QUOTA_EXCEEDED,
        message: errorMessage,
        userMessage: 'Quota API dépassé. Veuillez réessayer dans quelques minutes.',
        retryable: true,
        retryAfter: 300 // 5 minutes
      };
    }

    if (lowerMessage.includes('rate') || lowerMessage.includes('too many')) {
      return {
        type: ChatErrorType.RATE_LIMIT,
        message: errorMessage,
        userMessage: 'Trop de messages envoyés. Veuillez patienter quelques instants.',
        retryable: true,
        retryAfter: 60 // 1 minute
      };
    }

    if (lowerMessage.includes('file') && lowerMessage.includes('size')) {
      return {
        type: ChatErrorType.FILE_TOO_LARGE,
        message: errorMessage,
        userMessage: 'Le fichier est trop volumineux. Veuillez sélectionner un fichier de moins de 10MB.',
        retryable: false
      };
    }

    if (lowerMessage.includes('file') && (lowerMessage.includes('type') || lowerMessage.includes('format'))) {
      return {
        type: ChatErrorType.UNSUPPORTED_FILE,
        message: errorMessage,
        userMessage: 'Type de fichier non supporté. Veuillez utiliser une image, vidéo ou audio.',
        retryable: false
      };
    }

    if (lowerMessage.includes('upload')) {
      return {
        type: ChatErrorType.UPLOAD_FAILED,
        message: errorMessage,
        userMessage: 'Échec de l\'upload du fichier. Veuillez réessayer.',
        retryable: true,
        retryAfter: this.calculateRetryDelay(context.retryCount)
      };
    }

    // Erreur API générique
    return {
      type: ChatErrorType.API_UNAVAILABLE,
      message: errorMessage,
      userMessage: this.getApiUnavailableMessage(),
      retryable: true,
      retryAfter: this.calculateRetryDelay(context.retryCount)
    };
  }

  /**
   * Détermine l'action de récupération appropriée
   */
  private determineRecoveryAction(chatError: ChatError, context: ErrorContext): ErrorRecoveryAction {
    switch (chatError.type) {
      case ChatErrorType.NETWORK_ERROR:
        if (this.config.enableNetworkRecovery && this.networkStatus !== 'offline') {
          return {
            type: 'retry',
            delay: this.calculateRetryDelay(context.retryCount),
            maxRetries: this.config.maxRetries,
            fallbackMessage: this.getNetworkFallbackMessage()
          };
        }
        return {
          type: 'fallback',
          fallbackMessage: this.getOfflineFallbackMessage()
        };

      case ChatErrorType.RATE_LIMIT:
        return {
          type: 'retry',
          delay: chatError.retryAfter ? chatError.retryAfter * 1000 : 60000,
          maxRetries: 1,
          fallbackMessage: 'Veuillez patienter avant d\'envoyer un nouveau message.'
        };

      case ChatErrorType.QUOTA_EXCEEDED:
        return {
          type: 'fallback',
          fallbackMessage: 'Service temporairement indisponible. Vous pouvez me contacter directement.',
          redirectUrl: '/contact'
        };

      case ChatErrorType.API_UNAVAILABLE:
        if (context.retryCount < this.config.maxRetries) {
          return {
            type: 'retry',
            delay: this.calculateRetryDelay(context.retryCount),
            maxRetries: this.config.maxRetries,
            fallbackMessage: this.getApiFallbackMessage()
          };
        }
        return {
          type: 'fallback',
          fallbackMessage: this.getApiFallbackMessage(),
          redirectUrl: '/contact'
        };

      case ChatErrorType.FILE_TOO_LARGE:
      case ChatErrorType.UNSUPPORTED_FILE:
        return {
          type: 'manual',
          userAction: 'Veuillez sélectionner un autre fichier.'
        };

      case ChatErrorType.UPLOAD_FAILED:
        if (context.retryCount < 2) {
          return {
            type: 'retry',
            delay: 2000,
            maxRetries: 2
          };
        }
        return {
          type: 'manual',
          userAction: 'Veuillez réessayer l\'upload ou utiliser un autre fichier.'
        };

      default:
        return {
          type: 'fallback',
          fallbackMessage: 'Une erreur inattendue s\'est produite. Veuillez réessayer.'
        };
    }
  }

  /**
   * Détermine si une erreur doit être retentée
   */
  private shouldRetry(chatError: ChatError, context: ErrorContext): boolean {
    if (!chatError.retryable) {
      return false;
    }

    if (context.retryCount >= this.config.maxRetries) {
      return false;
    }

    // Ne pas retry si hors ligne
    if (this.networkStatus === 'offline' && chatError.type === ChatErrorType.NETWORK_ERROR) {
      return false;
    }

    return true;
  }

  /**
   * Calcule le délai de retry avec backoff exponentiel
   */
  private calculateRetryDelay(retryCount: number): number {
    if (retryCount < this.config.retryDelays.length) {
      return this.config.retryDelays[retryCount];
    }
    
    // Backoff exponentiel pour les tentatives supplémentaires
    const baseDelay = this.config.retryDelays[this.config.retryDelays.length - 1];
    return Math.min(baseDelay * Math.pow(2, retryCount - this.config.retryDelays.length), 30000); // Max 30s
  }

  /**
   * Récupération automatique après erreur réseau
   */
  async attemptNetworkRecovery(context: ErrorContext): Promise<boolean> {
    if (!this.config.enableNetworkRecovery) {
      return false;
    }

    // Attendre que la connexion soit rétablie
    return new Promise((resolve) => {
      const checkConnection = () => {
        if (this.networkStatus === 'online') {
          resolve(true);
          return;
        }

        // Timeout après 30 secondes
        setTimeout(() => {
          if (this.networkStatus !== 'online') {
            resolve(false);
          }
        }, 30000);
      };

      // Vérifier immédiatement
      checkConnection();

      // Écouter les changements de statut réseau
      const handleNetworkChange = () => {
        if (this.networkStatus === 'online') {
          resolve(true);
          window.removeEventListener('online', handleNetworkChange);
        }
      };

      if (typeof window !== 'undefined') {
        window.addEventListener('online', handleNetworkChange);
      }
    });
  }

  /**
   * Enregistre un callback de récupération
   */
  registerRecoveryCallback(key: string, callback: () => Promise<void>): void {
    this.recoveryCallbacks.set(key, callback);
  }

  /**
   * Exécute la récupération automatique
   */
  async executeRecovery(key: string): Promise<boolean> {
    const callback = this.recoveryCallbacks.get(key);
    if (!callback) {
      return false;
    }

    try {
      await callback();
      return true;
    } catch (error) {
      console.error('Erreur lors de la récupération automatique:', error);
      return false;
    }
  }

  /**
   * Réinitialise les compteurs de retry pour une opération
   */
  resetRetryCount(sessionId: string, operation: string): void {
    const retryKey = `${sessionId}_${operation}`;
    this.retryAttempts.delete(retryKey);
    this.lastErrors.delete(retryKey);
  }

  /**
   * Obtient le nombre de tentatives pour une opération
   */
  getRetryCount(sessionId: string, operation: string): number {
    const retryKey = `${sessionId}_${operation}`;
    return this.retryAttempts.get(retryKey) || 0;
  }

  /**
   * Initialise le monitoring du réseau
   */
  private initializeNetworkMonitoring(): void {
    if (typeof window === 'undefined') {
      return;
    }

    // État initial
    this.networkStatus = navigator.onLine ? 'online' : 'offline';

    // Écouter les changements de connexion
    window.addEventListener('online', () => {
      this.networkStatus = 'online';
      this.handleNetworkRecovery();
    });

    window.addEventListener('offline', () => {
      this.networkStatus = 'offline';
    });

    // Monitoring de la qualité de connexion
    this.monitorConnectionQuality();
  }

  /**
   * Monitore la qualité de la connexion
   */
  private monitorConnectionQuality(): void {
    if (typeof navigator === 'undefined' || !('connection' in navigator)) {
      return;
    }

    const connection = (navigator as any).connection;
    
    const updateConnectionStatus = () => {
      if (!navigator.onLine) {
        this.networkStatus = 'offline';
        return;
      }

      // Connexion lente ou instable
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        this.networkStatus = 'unstable';
      } else {
        this.networkStatus = 'online';
      }
    };

    connection.addEventListener('change', updateConnectionStatus);
    updateConnectionStatus();
  }

  /**
   * Gère la récupération après retour de connexion
   */
  private handleNetworkRecovery(): void {
    // Exécuter tous les callbacks de récupération enregistrés
    this.recoveryCallbacks.forEach(async (callback, key) => {
      try {
        await callback();
      } catch (error) {
        console.error(`Erreur lors de la récupération automatique pour ${key}:`, error);
      }
    });
  }

  /**
   * Extrait le code d'erreur d'une erreur
   */
  private extractErrorCode(error: unknown): string | undefined {
    if (error && typeof error === 'object') {
      if ('code' in error) {
        return String(error.code);
      }
      if ('status' in error) {
        return String(error.status);
      }
      if ('statusCode' in error) {
        return String(error.statusCode);
      }
    }
    return undefined;
  }

  /**
   * Détermine si un rapport d'erreur doit être envoyé
   */
  private shouldSendErrorReport(chatError: ChatError): boolean {
    // Envoyer des rapports pour les erreurs critiques ou récurrentes
    return chatError.type === ChatErrorType.API_UNAVAILABLE || 
           chatError.type === ChatErrorType.QUOTA_EXCEEDED ||
           chatError.type === ChatErrorType.NETWORK_ERROR;
  }

  /**
   * Envoie un rapport d'erreur
   */
  private async sendErrorReport(chatError: ChatError, context: ErrorContext): Promise<void> {
    try {
      const report = {
        error: {
          type: chatError.type,
          message: chatError.message,
          timestamp: context.timestamp.toISOString()
        },
        context: {
          sessionId: context.sessionId,
          operation: context.operation,
          retryCount: context.retryCount,
          userAgent: context.userAgent,
          networkStatus: this.networkStatus
        },
        environment: {
          url: typeof window !== 'undefined' ? window.location.href : 'unknown',
          userAgent: context.userAgent,
          timestamp: new Date().toISOString()
        }
      };

      // Envoyer le rapport (implémentation dépendante du backend)
      if (typeof fetch !== 'undefined') {
        await fetch('/api/chat/error-report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(report)
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du rapport d\'erreur:', error);
    }
  }

  // Messages d'erreur contextuels
  private getNetworkErrorMessage(): string {
    switch (this.networkStatus) {
      case 'offline':
        return 'Vous semblez être hors ligne. Vérifiez votre connexion internet.';
      case 'unstable':
        return 'Votre connexion semble instable. La réponse peut prendre plus de temps.';
      default:
        return 'Problème de connexion détecté. Tentative de reconnexion...';
    }
  }

  private getApiUnavailableMessage(): string {
    return 'Notre assistant IA est temporairement indisponible. Vous pouvez me contacter directement via le formulaire de contact.';
  }

  private getNetworkFallbackMessage(): string {
    return 'En cas de problème persistant, vous pouvez me contacter directement pour obtenir une réponse personnalisée.';
  }

  private getOfflineFallbackMessage(): string {
    return 'Vous êtes actuellement hors ligne. Reconnectez-vous pour utiliser l\'assistant IA ou contactez-moi directement.';
  }

  private getApiFallbackMessage(): string {
    return 'Service temporairement indisponible. Pour une réponse immédiate, contactez-moi directement via le formulaire de contact.';
  }
}

// Instance singleton
export const chatErrorHandler = new ChatErrorHandler();

// Hook pour React
export function useChatErrorHandler() {
  return {
    handleError: (error: unknown, context: ErrorContext) => 
      chatErrorHandler.handleError(error, context),
    attemptNetworkRecovery: (context: ErrorContext) => 
      chatErrorHandler.attemptNetworkRecovery(context),
    registerRecoveryCallback: (key: string, callback: () => Promise<void>) => 
      chatErrorHandler.registerRecoveryCallback(key, callback),
    executeRecovery: (key: string) => 
      chatErrorHandler.executeRecovery(key),
    resetRetryCount: (sessionId: string, operation: string) => 
      chatErrorHandler.resetRetryCount(sessionId, operation),
    getRetryCount: (sessionId: string, operation: string) => 
      chatErrorHandler.getRetryCount(sessionId, operation)
  };
}