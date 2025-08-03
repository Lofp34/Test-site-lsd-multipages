/**
 * Gestionnaire de mémoire pour les longues conversations
 * Optimise l'usage mémoire et gère la limite de messages
 */

import { ChatMessage } from './types';

interface MemoryConfig {
  maxMessages: number;
  maxMemoryMB: number;
  compressionThreshold: number;
  summarizationThreshold: number;
}

interface ConversationSummary {
  id: string;
  messageCount: number;
  summary: string;
  keyTopics: string[];
  timestamp: Date;
  originalSize: number;
  compressedSize: number;
}

class ChatMemoryManager {
  private config: MemoryConfig;
  private summaries: Map<string, ConversationSummary> = new Map();
  private memoryUsage = 0;

  constructor(config: Partial<MemoryConfig> = {}) {
    this.config = {
      maxMessages: 50,
      maxMemoryMB: 100,
      compressionThreshold: 30, // Compresser après 30 messages
      summarizationThreshold: 20, // Résumer après 20 messages
      ...config
    };
  }

  /**
   * Optimise une conversation en gérant la mémoire
   */
  optimizeConversation(
    conversationId: string,
    messages: ChatMessage[]
  ): {
    optimizedMessages: ChatMessage[];
    summary?: ConversationSummary;
    memoryFreed: number;
  } {
    const originalSize = this.calculateMemoryUsage(messages);
    let optimizedMessages = [...messages];
    let summary: ConversationSummary | undefined;
    let memoryFreed = 0;

    // Si on dépasse la limite de messages
    if (messages.length > this.config.maxMessages) {
      const result = this.trimMessages(conversationId, messages);
      optimizedMessages = result.trimmedMessages;
      summary = result.summary;
      memoryFreed = originalSize - this.calculateMemoryUsage(optimizedMessages);
    }

    // Si on dépasse la limite de mémoire
    const currentMemory = this.calculateMemoryUsage(optimizedMessages);
    if (currentMemory > this.config.maxMemoryMB * 1024 * 1024) {
      const compressed = this.compressMessages(optimizedMessages);
      optimizedMessages = compressed.messages;
      memoryFreed += compressed.memoryFreed;
    }

    return {
      optimizedMessages,
      summary,
      memoryFreed
    };
  }

  /**
   * Réduit le nombre de messages en gardant les plus importants
   */
  private trimMessages(
    conversationId: string,
    messages: ChatMessage[]
  ): {
    trimmedMessages: ChatMessage[];
    summary?: ConversationSummary;
  } {
    const keepCount = Math.floor(this.config.maxMessages * 0.7); // Garder 70%
    const toSummarize = messages.slice(0, messages.length - keepCount);
    const toKeep = messages.slice(-keepCount);

    // Créer un résumé des messages supprimés
    const summary = this.createSummary(conversationId, toSummarize);
    
    if (summary) {
      this.summaries.set(conversationId, summary);
    }

    return {
      trimmedMessages: toKeep,
      summary
    };
  }

  /**
   * Compresse les messages longs
   */
  private compressMessages(messages: ChatMessage[]): {
    messages: ChatMessage[];
    memoryFreed: number;
  } {
    let memoryFreed = 0;
    const compressedMessages = messages.map(message => {
      if (message.content.length > 1000) {
        const originalSize = message.content.length;
        const compressed = this.compressText(message.content);
        memoryFreed += originalSize - compressed.length;
        
        return {
          ...message,
          content: compressed,
          metadata: {
            ...message.metadata,
            compressed: true,
            originalLength: originalSize
          }
        };
      }
      return message;
    });

    return {
      messages: compressedMessages,
      memoryFreed
    };
  }

  /**
   * Compression simple de texte
   */
  private compressText(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Normaliser les espaces
      .replace(/\n\s*\n/g, '\n') // Supprimer les lignes vides multiples
      .trim();
  }

  /**
   * Crée un résumé des messages
   */
  private createSummary(
    conversationId: string,
    messages: ChatMessage[]
  ): ConversationSummary | null {
    if (messages.length === 0) return null;

    const originalSize = this.calculateMemoryUsage(messages);
    
    // Extraire les sujets clés
    const keyTopics = this.extractKeyTopics(messages);
    
    // Créer un résumé textuel
    const summary = this.generateTextSummary(messages, keyTopics);

    return {
      id: `summary_${conversationId}_${Date.now()}`,
      messageCount: messages.length,
      summary,
      keyTopics,
      timestamp: new Date(),
      originalSize,
      compressedSize: summary.length
    };
  }

  /**
   * Extrait les sujets clés d'une conversation
   */
  private extractKeyTopics(messages: ChatMessage[]): string[] {
    const allText = messages
      .map(m => m.content)
      .join(' ')
      .toLowerCase();

    // Mots-clés liés au développement commercial
    const commercialKeywords = [
      'prospection', 'négociation', 'closing', 'vente', 'commercial',
      'client', 'lead', 'formation', 'coaching', 'pme', 'entreprise',
      'développement', 'croissance', 'chiffre affaires', 'objectif',
      'stratégie', 'équipe', 'management', 'performance'
    ];

    const foundTopics = commercialKeywords.filter(keyword => 
      allText.includes(keyword)
    );

    // Ajouter des sujets basés sur la fréquence des mots
    const words = allText.match(/\b\w{4,}\b/g) || [];
    const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const frequentWords = Object.entries(wordCount)
      .filter(([word, count]) => count >= 3 && word.length > 4)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);

    return [...new Set([...foundTopics, ...frequentWords])].slice(0, 10);
  }

  /**
   * Génère un résumé textuel
   */
  private generateTextSummary(messages: ChatMessage[], keyTopics: string[]): string {
    const userMessages = messages.filter(m => m.role === 'user');
    const assistantMessages = messages.filter(m => m.role === 'assistant');

    const mainQuestions = userMessages
      .slice(0, 3)
      .map(m => m.content.substring(0, 100))
      .join('; ');

    const topicsStr = keyTopics.slice(0, 5).join(', ');

    return `Conversation de ${messages.length} messages sur ${topicsStr}. ` +
           `Principales questions: ${mainQuestions}. ` +
           `${userMessages.length} questions utilisateur, ${assistantMessages.length} réponses.`;
  }

  /**
   * Calcule l'usage mémoire approximatif
   */
  private calculateMemoryUsage(messages: ChatMessage[]): number {
    return messages.reduce((total, message) => {
      let size = 0;
      size += message.content.length * 2; // UTF-16
      size += message.id.length * 2;
      size += 100; // Overhead pour les métadonnées
      
      if (message.files) {
        size += message.files.length * 200; // Approximation pour les fichiers
      }
      
      return total + size;
    }, 0);
  }

  /**
   * Récupère le résumé d'une conversation
   */
  getSummary(conversationId: string): ConversationSummary | null {
    return this.summaries.get(conversationId) || null;
  }

  /**
   * Récupère tous les résumés
   */
  getAllSummaries(): ConversationSummary[] {
    return Array.from(this.summaries.values());
  }

  /**
   * Nettoie les anciens résumés
   */
  cleanupOldSummaries(maxAge: number = 7 * 24 * 60 * 60 * 1000): void {
    const cutoff = new Date(Date.now() - maxAge);
    
    for (const [id, summary] of this.summaries.entries()) {
      if (summary.timestamp < cutoff) {
        this.summaries.delete(id);
      }
    }
  }

  /**
   * Obtient les statistiques de mémoire
   */
  getMemoryStats(): {
    totalSummaries: number;
    totalMemorySaved: number;
    averageCompressionRatio: number;
    oldestSummary?: Date;
    newestSummary?: Date;
  } {
    const summaries = Array.from(this.summaries.values());
    
    if (summaries.length === 0) {
      return {
        totalSummaries: 0,
        totalMemorySaved: 0,
        averageCompressionRatio: 0
      };
    }

    const totalMemorySaved = summaries.reduce(
      (sum, s) => sum + (s.originalSize - s.compressedSize), 
      0
    );

    const totalOriginalSize = summaries.reduce((sum, s) => sum + s.originalSize, 0);
    const totalCompressedSize = summaries.reduce((sum, s) => sum + s.compressedSize, 0);
    
    const averageCompressionRatio = totalOriginalSize > 0 
      ? totalCompressedSize / totalOriginalSize 
      : 0;

    const timestamps = summaries.map(s => s.timestamp);
    const oldestSummary = new Date(Math.min(...timestamps.map(t => t.getTime())));
    const newestSummary = new Date(Math.max(...timestamps.map(t => t.getTime())));

    return {
      totalSummaries: summaries.length,
      totalMemorySaved,
      averageCompressionRatio,
      oldestSummary,
      newestSummary
    };
  }

  /**
   * Vide tous les résumés
   */
  clear(): void {
    this.summaries.clear();
    this.memoryUsage = 0;
  }
}

// Instance singleton
export const chatMemoryManager = new ChatMemoryManager();

// Hook pour React
export function useChatMemoryManager() {
  return {
    optimizeConversation: (conversationId: string, messages: ChatMessage[]) =>
      chatMemoryManager.optimizeConversation(conversationId, messages),
    getSummary: (conversationId: string) =>
      chatMemoryManager.getSummary(conversationId),
    getAllSummaries: () =>
      chatMemoryManager.getAllSummaries(),
    getMemoryStats: () =>
      chatMemoryManager.getMemoryStats(),
    cleanupOldSummaries: (maxAge?: number) =>
      chatMemoryManager.cleanupOldSummaries(maxAge),
    clear: () =>
      chatMemoryManager.clear()
  };
}