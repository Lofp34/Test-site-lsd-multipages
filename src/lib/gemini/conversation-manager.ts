/**
 * Gestionnaire de conversations avec persistance et nettoyage automatique
 */

import { ChatMessage } from '@/types/chat';
import { ChatHistoryService, ConversationHistory } from './chat-history';

export interface ConversationSummary {
  id: string;
  title: string;
  lastMessage: string;
  messageCount: number;
  exchangeCount: number;
  createdAt: Date;
  lastUpdated: Date;
  isActive: boolean;
}

export interface ConversationCleanupOptions {
  maxAge?: number; // Age maximum en millisecondes
  maxConversations?: number; // Nombre maximum de conversations à garder
  autoCleanup?: boolean; // Nettoyage automatique activé
  cleanupInterval?: number; // Intervalle de nettoyage en millisecondes
}

export class ConversationManager {
  private static readonly DEFAULT_CLEANUP_OPTIONS: ConversationCleanupOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    maxConversations: 10,
    autoCleanup: true,
    cleanupInterval: 60 * 60 * 1000, // 1 heure
  };

  private cleanupOptions: ConversationCleanupOptions;
  private cleanupTimer?: NodeJS.Timeout;

  constructor(options: ConversationCleanupOptions = {}) {
    this.cleanupOptions = {
      ...ConversationManager.DEFAULT_CLEANUP_OPTIONS,
      ...options,
    };

    // Démarrer le nettoyage automatique si activé
    if (this.cleanupOptions.autoCleanup) {
      this.startAutoCleanup();
    }
  }

  /**
   * Récupère toutes les conversations avec résumé
   */
  getAllConversations(): ConversationSummary[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem('gemini_chat_history');
      if (!stored) return [];

      const conversations: ConversationHistory[] = JSON.parse(stored, this.dateReviver);
      
      return conversations.map(conv => this.createConversationSummary(conv));
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations:', error);
      return [];
    }
  }

  /**
   * Récupère une conversation spécifique
   */
  getConversation(conversationId: string): ConversationHistory | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem('gemini_chat_history');
      if (!stored) return null;

      const conversations: ConversationHistory[] = JSON.parse(stored, this.dateReviver);
      return conversations.find(conv => conv.id === conversationId) || null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la conversation:', error);
      return null;
    }
  }

  /**
   * Sauvegarde une conversation
   */
  saveConversation(conversation: ConversationHistory): void {
    if (typeof window === 'undefined') return;

    try {
      const conversations = this.getAllConversationsRaw();
      const existingIndex = conversations.findIndex(conv => conv.id === conversation.id);

      if (existingIndex >= 0) {
        conversations[existingIndex] = conversation;
      } else {
        conversations.push(conversation);
      }

      // Appliquer les limites avant sauvegarde
      const limitedConversations = this.applyLimits(conversations);

      localStorage.setItem(
        'gemini_chat_history',
        JSON.stringify(limitedConversations, this.dateReplacer)
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la conversation:', error);
    }
  }

  /**
   * Supprime une conversation
   */
  deleteConversation(conversationId: string): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const conversations = this.getAllConversationsRaw();
      const filteredConversations = conversations.filter(conv => conv.id !== conversationId);

      if (filteredConversations.length === conversations.length) {
        return false; // Conversation non trouvée
      }

      localStorage.setItem(
        'gemini_chat_history',
        JSON.stringify(filteredConversations, this.dateReplacer)
      );

      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la conversation:', error);
      return false;
    }
  }

  /**
   * Nettoie les conversations selon les critères définis
   */
  cleanupConversations(): {
    deletedCount: number;
    remainingCount: number;
    deletedIds: string[];
  } {
    if (typeof window === 'undefined') {
      return { deletedCount: 0, remainingCount: 0, deletedIds: [] };
    }

    try {
      const conversations = this.getAllConversationsRaw();
      const now = new Date();
      const maxAge = this.cleanupOptions.maxAge!;
      const maxConversations = this.cleanupOptions.maxConversations!;

      // Filtrer par âge
      const recentConversations = conversations.filter(conv => {
        const age = now.getTime() - new Date(conv.lastUpdated).getTime();
        return age <= maxAge;
      });

      // Trier par date de dernière mise à jour (plus récent en premier)
      recentConversations.sort((a, b) => 
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      );

      // Limiter le nombre de conversations
      const limitedConversations = recentConversations.slice(0, maxConversations);

      // Calculer les suppressions
      const deletedConversations = conversations.filter(conv => 
        !limitedConversations.some(limited => limited.id === conv.id)
      );

      // Sauvegarder les conversations nettoyées
      localStorage.setItem(
        'gemini_chat_history',
        JSON.stringify(limitedConversations, this.dateReplacer)
      );

      return {
        deletedCount: deletedConversations.length,
        remainingCount: limitedConversations.length,
        deletedIds: deletedConversations.map(conv => conv.id),
      };
    } catch (error) {
      console.error('Erreur lors du nettoyage des conversations:', error);
      return { deletedCount: 0, remainingCount: 0, deletedIds: [] };
    }
  }

  /**
   * Nettoie automatiquement les conversations qui ont atteint la limite
   */
  cleanupLimitedConversations(): {
    processedCount: number;
    cleanedIds: string[];
  } {
    if (typeof window === 'undefined') {
      return { processedCount: 0, cleanedIds: [] };
    }

    try {
      const conversations = this.getAllConversationsRaw();
      const cleanedIds: string[] = [];

      const processedConversations = conversations.map(conv => {
        const exchangeCount = this.calculateExchangeCount(conv.messages);
        
        // Si la conversation a atteint 10 échanges, proposer un résumé
        if (exchangeCount >= 10) {
          const summarizedConversation = this.summarizeConversation(conv);
          cleanedIds.push(conv.id);
          return summarizedConversation;
        }
        
        return conv;
      });

      // Sauvegarder les conversations traitées
      if (cleanedIds.length > 0) {
        localStorage.setItem(
          'gemini_chat_history',
          JSON.stringify(processedConversations, this.dateReplacer)
        );
      }

      return {
        processedCount: cleanedIds.length,
        cleanedIds,
      };
    } catch (error) {
      console.error('Erreur lors du nettoyage des conversations limitées:', error);
      return { processedCount: 0, cleanedIds: [] };
    }
  }

  /**
   * Exporte toutes les conversations
   */
  exportConversations(): string {
    const conversations = this.getAllConversations();
    return JSON.stringify(conversations, null, 2);
  }

  /**
   * Importe des conversations depuis un export
   */
  importConversations(exportData: string): {
    importedCount: number;
    errors: string[];
  } {
    try {
      const importedConversations = JSON.parse(exportData);
      let importedCount = 0;
      const errors: string[] = [];

      if (!Array.isArray(importedConversations)) {
        throw new Error('Format d\'export invalide');
      }

      for (const conv of importedConversations) {
        try {
          // Valider la structure de la conversation
          if (this.validateConversationStructure(conv)) {
            this.saveConversation(conv);
            importedCount++;
          } else {
            errors.push(`Conversation ${conv.id || 'inconnue'}: structure invalide`);
          }
        } catch (error) {
          errors.push(`Conversation ${conv.id || 'inconnue'}: ${error}`);
        }
      }

      return { importedCount, errors };
    } catch (error) {
      return {
        importedCount: 0,
        errors: [`Erreur d'import: ${error}`],
      };
    }
  }

  /**
   * Obtient les statistiques globales
   */
  getGlobalStats() {
    const conversations = this.getAllConversations();
    const totalMessages = conversations.reduce((sum, conv) => sum + conv.messageCount, 0);
    const totalExchanges = conversations.reduce((sum, conv) => sum + conv.exchangeCount, 0);
    const activeConversations = conversations.filter(conv => conv.isActive).length;

    return {
      totalConversations: conversations.length,
      activeConversations,
      totalMessages,
      totalExchanges,
      averageMessagesPerConversation: conversations.length > 0 ? totalMessages / conversations.length : 0,
      oldestConversation: conversations.length > 0 
        ? Math.min(...conversations.map(conv => conv.createdAt.getTime()))
        : null,
      newestConversation: conversations.length > 0
        ? Math.max(...conversations.map(conv => conv.lastUpdated.getTime()))
        : null,
    };
  }

  /**
   * Démarre le nettoyage automatique
   */
  private startAutoCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanupConversations();
      this.cleanupLimitedConversations();
    }, this.cleanupOptions.cleanupInterval!);
  }

  /**
   * Arrête le nettoyage automatique
   */
  stopAutoCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = undefined;
    }
  }

  /**
   * Applique les limites aux conversations
   */
  private applyLimits(conversations: ConversationHistory[]): ConversationHistory[] {
    const now = new Date();
    const maxAge = this.cleanupOptions.maxAge!;
    const maxConversations = this.cleanupOptions.maxConversations!;

    // Filtrer par âge
    const recentConversations = conversations.filter(conv => {
      const age = now.getTime() - new Date(conv.lastUpdated).getTime();
      return age <= maxAge;
    });

    // Trier et limiter
    return recentConversations
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, maxConversations);
  }

  /**
   * Crée un résumé de conversation
   */
  private createConversationSummary(conversation: ConversationHistory): ConversationSummary {
    const lastMessage = conversation.messages.length > 0 
      ? conversation.messages[conversation.messages.length - 1].content
      : '';

    const title = this.generateConversationTitle(conversation);
    const exchangeCount = this.calculateExchangeCount(conversation.messages);
    const isActive = this.isConversationActive(conversation);

    return {
      id: conversation.id,
      title,
      lastMessage: lastMessage.substring(0, 100) + (lastMessage.length > 100 ? '...' : ''),
      messageCount: conversation.messageCount,
      exchangeCount,
      createdAt: conversation.createdAt,
      lastUpdated: conversation.lastUpdated,
      isActive,
    };
  }

  /**
   * Génère un titre pour une conversation
   */
  private generateConversationTitle(conversation: ConversationHistory): string {
    if (conversation.messages.length === 0) {
      return 'Conversation vide';
    }

    const firstUserMessage = conversation.messages.find(msg => msg.role === 'user');
    if (firstUserMessage) {
      const title = firstUserMessage.content.substring(0, 50);
      return title + (firstUserMessage.content.length > 50 ? '...' : '');
    }

    return `Conversation du ${conversation.createdAt.toLocaleDateString()}`;
  }

  /**
   * Calcule le nombre d'échanges dans une conversation
   */
  private calculateExchangeCount(messages: ChatMessage[]): number {
    return messages.filter(msg => msg.role === 'user').length;
  }

  /**
   * Détermine si une conversation est active
   */
  private isConversationActive(conversation: ConversationHistory): boolean {
    const now = new Date();
    const lastUpdate = new Date(conversation.lastUpdated);
    const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
    
    return hoursSinceUpdate < 24; // Active si mise à jour dans les dernières 24h
  }

  /**
   * Résume une conversation qui a atteint la limite
   */
  private summarizeConversation(conversation: ConversationHistory): ConversationHistory {
    // Garder seulement les 4 derniers messages (2 échanges)
    const recentMessages = conversation.messages.slice(-4);
    
    // Ajouter un message de résumé
    const summaryMessage: ChatMessage = {
      id: `summary_${Date.now()}`,
      role: 'assistant',
      content: `[Résumé automatique: Cette conversation contenait ${conversation.messages.length} messages. Les messages précédents ont été archivés pour optimiser les performances.]`,
      timestamp: new Date(),
      metadata: {
        confidence: 1,
        processingTime: 0,
      },
    };

    return {
      ...conversation,
      messages: [summaryMessage, ...recentMessages],
      messageCount: recentMessages.length + 1,
      lastUpdated: new Date(),
    };
  }

  /**
   * Valide la structure d'une conversation
   */
  private validateConversationStructure(conversation: any): boolean {
    return (
      conversation &&
      typeof conversation.id === 'string' &&
      Array.isArray(conversation.messages) &&
      conversation.createdAt &&
      conversation.lastUpdated
    );
  }

  /**
   * Récupère les conversations brutes
   */
  private getAllConversationsRaw(): ConversationHistory[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem('gemini_chat_history');
      if (!stored) return [];

      return JSON.parse(stored, this.dateReviver);
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations brutes:', error);
      return [];
    }
  }

  /**
   * Replacer pour JSON.stringify qui gère les dates
   */
  private dateReplacer(key: string, value: any): any {
    if (value instanceof Date) {
      return { __type: 'Date', value: value.toISOString() };
    }
    return value;
  }

  /**
   * Reviver pour JSON.parse qui gère les dates
   */
  private dateReviver(key: string, value: any): any {
    if (value && typeof value === 'object' && value.__type === 'Date') {
      return new Date(value.value);
    }
    return value;
  }

  /**
   * Nettoie les ressources
   */
  destroy(): void {
    this.stopAutoCleanup();
  }
}