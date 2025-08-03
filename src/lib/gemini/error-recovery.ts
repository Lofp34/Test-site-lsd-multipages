/**
 * Service de récupération automatique après erreurs
 * Gère les fallbacks et la récupération réseau
 */

import { ChatError, ChatErrorType } from './types';
import { chatErrorHandler, ErrorContext } from './error-handler';
import { chatAnalyticsService } from './analytics-service';

export interface RecoveryStrategy {
  name: string;
  condition: (error: ChatError, context: ErrorContext) => boolean;
  execute: (error: ChatError, context: ErrorContext) => Promise<RecoveryResult>;
  priority: number;
}

export interface RecoveryResult {
  success: boolean;
  message?: string;
  data?: any;
  shouldRetry?: boolean;
  fallbackUsed?: boolean;
}

export interface FallbackResponse {
  type: 'cached' | 'template' | 'redirect' | 'offline';
  content: string;
  metadata?: {
    source: string;
    timestamp: Date;
    confidence: number;
  };
}

class ChatErrorRecoveryService {
  private strategies: RecoveryStrategy[] = [];
  private fallbackCache: Map<string, FallbackResponse> = new Map();
  private offlineQueue: Array<{
    operation: string;
    data: any;
    timestamp: Date;
    retries: number;
  }> = [];
  
  private readonly MAX_OFFLINE_QUEUE_SIZE = 50;
  private readonly CACHE_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

  constructor() {
    this.initializeStrategies();
    this.initializeOfflineHandling();
  }

  /**
   * Initialise les stratégies de récupération
   */
  private initializeStrategies(): void {
    // Stratégie de récupération réseau
    this.strategies.push({
      name: 'network_recovery',
      priority: 1,
      condition: (error) => error.type === ChatErrorType.NETWORK_ERROR,
      execute: async (error, context) => {
        const recovered = await chatErrorHandler.attemptNetworkRecovery(context);
        if (recovered) {
          return {
            success: true,
            message: 'Connexion rétablie',
            shouldRetry: true
          };
        }
        
        // Utiliser le cache ou une réponse hors ligne
        const fallback = await this.getFallbackResponse(context);
        return {
          success: false,
          message: fallback.content,
          fallbackUsed: true,
          data: fallback
        };
      }
    });

    // Stratégie de cache intelligent
    this.strategies.push({
      name: 'cache_fallback',
      priority: 2,
      condition: (error) => 
        error.type === ChatErrorType.API_UNAVAILABLE || 
        error.type === ChatErrorType.QUOTA_EXCEEDED,
      execute: async (error, context) => {
        const cachedResponse = await this.getCachedResponse(context);
        if (cachedResponse) {
          return {
            success: true,
            message: cachedResponse.content,
            data: cachedResponse,
            fallbackUsed: true
          };
        }

        // Générer une réponse template
        const templateResponse = this.generateTemplateResponse(context);
        return {
          success: false,
          message: templateResponse.content,
          data: templateResponse,
          fallbackUsed: true
        };
      }
    });

    // Stratégie de retry intelligent
    this.strategies.push({
      name: 'intelligent_retry',
      priority: 3,
      condition: (error, context) => 
        error.retryable && context.retryCount < 3,
      execute: async (error, context) => {
        const delay = this.calculateAdaptiveDelay(error, context);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return {
          success: false,
          shouldRetry: true,
          message: `Nouvelle tentative dans ${delay}ms...`
        };
      }
    });

    // Stratégie de dégradation gracieuse
    this.strategies.push({
      name: 'graceful_degradation',
      priority: 4,
      condition: () => true, // Stratégie de dernier recours
      execute: async (error, context) => {
        const degradedResponse = this.generateDegradedResponse(error, context);
        
        return {
          success: false,
          message: degradedResponse.content,
          data: degradedResponse,
          fallbackUsed: true
        };
      }
    });
  }

  /**
   * Exécute la récupération d'erreur
   */
  async executeRecovery(error: ChatError, context: ErrorContext): Promise<RecoveryResult> {
    // Trier les stratégies par priorité
    const applicableStrategies = this.strategies
      .filter(strategy => strategy.condition(error, context))
      .sort((a, b) => a.priority - b.priority);

    for (const strategy of applicableStrategies) {
      try {
        console.log(`Tentative de récupération avec la stratégie: ${strategy.name}`);
        
        const result = await strategy.execute(error, context);
        
        // Enregistrer le résultat de la récupération
        chatAnalyticsService.trackPerformance(
          context.sessionId,
          'response_time',
          Date.now() - context.timestamp.getTime(),
          'ms',
          {
            recoveryStrategy: strategy.name,
            success: result.success,
            fallbackUsed: result.fallbackUsed
          }
        );

        if (result.success || result.fallbackUsed) {
          return result;
        }
      } catch (recoveryError) {
        console.error(`Erreur dans la stratégie ${strategy.name}:`, recoveryError);
        continue;
      }
    }

    // Aucune stratégie n'a fonctionné
    return {
      success: false,
      message: 'Impossible de récupérer de l\'erreur',
      fallbackUsed: false
    };
  }

  /**
   * Obtient une réponse de fallback appropriée
   */
  private async getFallbackResponse(context: ErrorContext): Promise<FallbackResponse> {
    // Vérifier le cache d'abord
    const cached = await this.getCachedResponse(context);
    if (cached) {
      return cached;
    }

    // Générer une réponse hors ligne
    return {
      type: 'offline',
      content: this.generateOfflineMessage(context),
      metadata: {
        source: 'offline_generator',
        timestamp: new Date(),
        confidence: 0.7
      }
    };
  }

  /**
   * Récupère une réponse mise en cache
   */
  private async getCachedResponse(context: ErrorContext): Promise<FallbackResponse | null> {
    // Créer une clé de cache basée sur l'opération et le contexte
    const cacheKey = this.generateCacheKey(context);
    const cached = this.fallbackCache.get(cacheKey);

    if (cached && this.isCacheValid(cached)) {
      return cached;
    }

    // Nettoyer le cache expiré
    this.cleanExpiredCache();
    return null;
  }

  /**
   * Met en cache une réponse pour utilisation future
   */
  cacheResponse(context: ErrorContext, response: FallbackResponse): void {
    const cacheKey = this.generateCacheKey(context);
    this.fallbackCache.set(cacheKey, {
      ...response,
      metadata: {
        ...response.metadata,
        timestamp: new Date()
      }
    });
  }

  /**
   * Génère une réponse template contextuelle
   */
  private generateTemplateResponse(context: ErrorContext): FallbackResponse {
    const templates = {
      send_message: [
        "Je comprends votre question sur le développement commercial. En attendant que le service soit rétabli, je peux vous dire que Laurent Serre accompagne les PME depuis 20 ans dans leur transformation commerciale.",
        "Votre demande concerne probablement l'optimisation de vos processus commerciaux. Laurent Serre propose des formations et du coaching personnalisé pour les dirigeants de PME.",
        "En tant qu'expert en développement commercial PME, Laurent Serre peut vous aider à structurer votre approche commerciale. Contactez-le directement pour un échange personnalisé."
      ],
      upload_file: [
        "L'analyse de votre document nécessite notre service IA complet. En attendant, vous pouvez envoyer votre fichier directement à Laurent Serre via le formulaire de contact.",
        "Pour une analyse détaillée de votre document, Laurent Serre peut vous proposer un audit personnalisé de vos outils commerciaux."
      ],
      initialize_chat: [
        "Bienvenue ! Je suis l'assistant de Laurent Serre, expert en développement commercial PME. Comment puis-je vous aider aujourd'hui ?",
        "Laurent Serre accompagne les dirigeants de PME dans leur croissance commerciale. Que souhaitez-vous savoir sur ses services ?"
      ]
    };

    const operationTemplates = templates[context.operation as keyof typeof templates] || templates.send_message;
    const randomTemplate = operationTemplates[Math.floor(Math.random() * operationTemplates.length)];

    return {
      type: 'template',
      content: randomTemplate,
      metadata: {
        source: 'template_generator',
        timestamp: new Date(),
        confidence: 0.8
      }
    };
  }

  /**
   * Génère une réponse dégradée
   */
  private generateDegradedResponse(error: ChatError, context: ErrorContext): FallbackResponse {
    const degradedMessages = {
      [ChatErrorType.API_UNAVAILABLE]: "Notre assistant IA est temporairement indisponible. Pour une réponse immédiate, contactez Laurent Serre directement via le formulaire de contact ou au 06.XX.XX.XX.XX.",
      [ChatErrorType.NETWORK_ERROR]: "Problème de connexion détecté. Vos questions sur le développement commercial PME peuvent être adressées directement à Laurent Serre.",
      [ChatErrorType.QUOTA_EXCEEDED]: "Service temporairement saturé. Laurent Serre reste disponible pour répondre personnellement à vos questions commerciales.",
      [ChatErrorType.RATE_LIMIT]: "Trop de messages envoyés. Prenez le temps de consulter les ressources gratuites de Laurent Serre en attendant.",
      [ChatErrorType.FILE_TOO_LARGE]: "Fichier trop volumineux pour l'analyse automatique. Envoyez-le directement à Laurent Serre pour une analyse personnalisée.",
      [ChatErrorType.UNSUPPORTED_FILE]: "Format de fichier non supporté. Laurent Serre peut analyser manuellement vos documents commerciaux.",
      [ChatErrorType.UPLOAD_FAILED]: "Échec de l'upload. Vous pouvez envoyer vos documents directement à Laurent Serre via email."
    };

    return {
      type: 'template',
      content: degradedMessages[error.type] || "Une erreur s'est produite. Contactez Laurent Serre directement pour une assistance personnalisée.",
      metadata: {
        source: 'degraded_response',
        timestamp: new Date(),
        confidence: 0.6
      }
    };
  }

  /**
   * Génère un message hors ligne
   */
  private generateOfflineMessage(context: ErrorContext): string {
    return `Vous êtes actuellement hors ligne. Vos questions sur le développement commercial PME seront traitées dès le retour de votre connexion. En attendant, vous pouvez consulter les ressources gratuites de Laurent Serre ou le contacter directement.`;
  }

  /**
   * Calcule un délai adaptatif pour les retry
   */
  private calculateAdaptiveDelay(error: ChatError, context: ErrorContext): number {
    const baseDelay = 1000; // 1 seconde
    const maxDelay = 30000; // 30 secondes
    
    // Facteur basé sur le type d'erreur
    const errorFactors = {
      [ChatErrorType.NETWORK_ERROR]: 2,
      [ChatErrorType.API_UNAVAILABLE]: 3,
      [ChatErrorType.RATE_LIMIT]: 5,
      [ChatErrorType.QUOTA_EXCEEDED]: 10,
      [ChatErrorType.UPLOAD_FAILED]: 1.5
    };

    const factor = errorFactors[error.type] || 2;
    const exponentialDelay = baseDelay * Math.pow(factor, context.retryCount);
    
    // Ajouter un jitter pour éviter les thundering herds
    const jitter = Math.random() * 0.3 + 0.85; // 85-115% du délai
    
    return Math.min(exponentialDelay * jitter, maxDelay);
  }

  /**
   * Initialise la gestion hors ligne
   */
  private initializeOfflineHandling(): void {
    if (typeof window === 'undefined') {
      return;
    }

    // Écouter les changements de connexion
    window.addEventListener('online', () => {
      this.processOfflineQueue();
    });

    window.addEventListener('offline', () => {
      console.log('Mode hors ligne activé');
    });
  }

  /**
   * Ajoute une opération à la queue hors ligne
   */
  addToOfflineQueue(operation: string, data: any): void {
    if (this.offlineQueue.length >= this.MAX_OFFLINE_QUEUE_SIZE) {
      // Supprimer les plus anciennes
      this.offlineQueue.shift();
    }

    this.offlineQueue.push({
      operation,
      data,
      timestamp: new Date(),
      retries: 0
    });
  }

  /**
   * Traite la queue hors ligne quand la connexion revient
   */
  private async processOfflineQueue(): Promise<void> {
    console.log(`Traitement de ${this.offlineQueue.length} opérations en attente`);

    const queue = [...this.offlineQueue];
    this.offlineQueue = [];

    for (const item of queue) {
      try {
        // Réessayer l'opération
        await this.retryOfflineOperation(item);
      } catch (error) {
        console.error('Erreur lors du traitement de la queue hors ligne:', error);
        
        // Remettre en queue si pas trop de tentatives
        if (item.retries < 3) {
          item.retries++;
          this.offlineQueue.push(item);
        }
      }
    }
  }

  /**
   * Réessaie une opération hors ligne
   */
  private async retryOfflineOperation(item: any): Promise<void> {
    // Implémentation dépendante du type d'opération
    switch (item.operation) {
      case 'send_message':
        // Réessayer l'envoi du message
        break;
      case 'upload_file':
        // Réessayer l'upload
        break;
      default:
        console.warn(`Opération inconnue dans la queue: ${item.operation}`);
    }
  }

  /**
   * Génère une clé de cache
   */
  private generateCacheKey(context: ErrorContext): string {
    return `${context.operation}_${context.sessionId}_${context.messageId || 'no_message'}`;
  }

  /**
   * Vérifie si le cache est valide
   */
  private isCacheValid(cached: FallbackResponse): boolean {
    if (!cached.metadata?.timestamp) {
      return false;
    }

    const age = Date.now() - cached.metadata.timestamp.getTime();
    return age < this.CACHE_EXPIRY_MS;
  }

  /**
   * Nettoie le cache expiré
   */
  private cleanExpiredCache(): void {
    for (const [key, cached] of this.fallbackCache.entries()) {
      if (!this.isCacheValid(cached)) {
        this.fallbackCache.delete(key);
      }
    }
  }

  /**
   * Obtient les statistiques de récupération
   */
  getRecoveryStats(): {
    totalRecoveries: number;
    successfulRecoveries: number;
    fallbacksUsed: number;
    cacheHits: number;
    offlineQueueSize: number;
  } {
    return {
      totalRecoveries: 0, // À implémenter avec un compteur
      successfulRecoveries: 0,
      fallbacksUsed: 0,
      cacheHits: this.fallbackCache.size,
      offlineQueueSize: this.offlineQueue.length
    };
  }

  /**
   * Nettoie les ressources
   */
  cleanup(): void {
    this.fallbackCache.clear();
    this.offlineQueue = [];
  }
}

// Instance singleton
export const chatErrorRecoveryService = new ChatErrorRecoveryService();

// Hook pour React
export function useChatErrorRecovery() {
  return {
    executeRecovery: (error: ChatError, context: ErrorContext) =>
      chatErrorRecoveryService.executeRecovery(error, context),
    cacheResponse: (context: ErrorContext, response: FallbackResponse) =>
      chatErrorRecoveryService.cacheResponse(context, response),
    addToOfflineQueue: (operation: string, data: any) =>
      chatErrorRecoveryService.addToOfflineQueue(operation, data),
    getRecoveryStats: () =>
      chatErrorRecoveryService.getRecoveryStats(),
    cleanup: () =>
      chatErrorRecoveryService.cleanup()
  };
}