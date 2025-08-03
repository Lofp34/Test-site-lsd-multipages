/**
 * Mode sans cookies pour le chat Gemini
 * Gère le stockage temporaire en mémoire uniquement
 */

import { ChatMessage, ConversationSummary } from './types';

export interface CookieFreeStorage {
  conversations: Map<string, {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: Date;
    lastUpdated: Date;
  }>;
  settings: any;
  analytics: any[];
}

export class CookieFreeMode {
  private static instance: CookieFreeMode;
  private storage: CookieFreeStorage;
  private isEnabled: boolean = false;

  private constructor() {
    this.storage = {
      conversations: new Map(),
      settings: {},
      analytics: []
    };
  }

  static getInstance(): CookieFreeMode {
    if (!CookieFreeMode.instance) {
      CookieFreeMode.instance = new CookieFreeMode();
    }
    return CookieFreeMode.instance;
  }

  /**
   * Active le mode sans cookies
   */
  enable(): void {
    this.isEnabled = true;
    console.log('Mode sans cookies activé - données stockées en mémoire uniquement');
  }

  /**
   * Désactive le mode sans cookies
   */
  disable(): void {
    this.isEnabled = false;
    this.clearAllData();
    console.log('Mode sans cookies désactivé');
  }

  /**
   * Vérifie si le mode sans cookies est activé
   */
  isActive(): boolean {
    return this.isEnabled;
  }

  /**
   * Stocke une conversation en mémoire
   */
  storeConversation(conversation: {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: Date;
    lastUpdated: Date;
  }): void {
    if (!this.isEnabled) return;
    
    this.storage.conversations.set(conversation.id, {
      ...conversation,
      // Créer des copies pour éviter les références
      messages: conversation.messages.map(msg => ({ ...msg }))
    });
  }

  /**
   * Récupère une conversation depuis la mémoire
   */
  getConversation(id: string): {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: Date;
    lastUpdated: Date;
  } | null {
    if (!this.isEnabled) return null;
    
    const conversation = this.storage.conversations.get(id);
    return conversation ? {
      ...conversation,
      messages: conversation.messages.map(msg => ({ ...msg }))
    } : null;
  }

  /**
   * Récupère toutes les conversations
   */
  getAllConversations(): ConversationSummary[] {
    if (!this.isEnabled) return [];
    
    return Array.from(this.storage.conversations.values()).map(conv => ({
      id: conv.id,
      title: conv.title,
      createdAt: conv.createdAt,
      lastUpdated: conv.lastUpdated,
      messageCount: conv.messages.length
    }));
  }

  /**
   * Supprime une conversation
   */
  deleteConversation(id: string): boolean {
    if (!this.isEnabled) return false;
    
    return this.storage.conversations.delete(id);
  }

  /**
   * Stocke les paramètres en mémoire
   */
  storeSettings(settings: any): void {
    if (!this.isEnabled) return;
    
    this.storage.settings = { ...settings };
  }

  /**
   * Récupère les paramètres depuis la mémoire
   */
  getSettings(): any {
    if (!this.isEnabled) return {};
    
    return { ...this.storage.settings };
  }

  /**
   * Ajoute une entrée analytics en mémoire
   */
  addAnalytics(data: any): void {
    if (!this.isEnabled) return;
    
    this.storage.analytics.push({
      ...data,
      timestamp: new Date()
    });

    // Limiter à 1000 entrées pour éviter la surcharge mémoire
    if (this.storage.analytics.length > 1000) {
      this.storage.analytics = this.storage.analytics.slice(-1000);
    }
  }

  /**
   * Récupère les données analytics
   */
  getAnalytics(): any[] {
    if (!this.isEnabled) return [];
    
    return [...this.storage.analytics];
  }

  /**
   * Efface toutes les données en mémoire
   */
  clearAllData(): void {
    this.storage.conversations.clear();
    this.storage.settings = {};
    this.storage.analytics = [];
  }

  /**
   * Obtient des statistiques sur l'utilisation mémoire
   */
  getMemoryStats(): {
    conversationCount: number;
    totalMessages: number;
    analyticsEntries: number;
    estimatedMemoryUsage: number; // en bytes
  } {
    const conversationCount = this.storage.conversations.size;
    const totalMessages = Array.from(this.storage.conversations.values())
      .reduce((sum, conv) => sum + conv.messages.length, 0);
    const analyticsEntries = this.storage.analytics.length;

    // Estimation approximative de l'usage mémoire
    let estimatedMemoryUsage = 0;
    
    // Conversations
    for (const conv of this.storage.conversations.values()) {
      estimatedMemoryUsage += JSON.stringify(conv).length * 2; // UTF-16
    }
    
    // Settings
    estimatedMemoryUsage += JSON.stringify(this.storage.settings).length * 2;
    
    // Analytics
    estimatedMemoryUsage += JSON.stringify(this.storage.analytics).length * 2;

    return {
      conversationCount,
      totalMessages,
      analyticsEntries,
      estimatedMemoryUsage
    };
  }

  /**
   * Exporte les données en mémoire (pour sauvegarde temporaire)
   */
  exportMemoryData(): {
    conversations: any[];
    settings: any;
    analytics: any[];
    exportDate: string;
  } {
    return {
      conversations: Array.from(this.storage.conversations.values()),
      settings: this.storage.settings,
      analytics: this.storage.analytics,
      exportDate: new Date().toISOString()
    };
  }

  /**
   * Importe des données en mémoire
   */
  importMemoryData(data: {
    conversations?: any[];
    settings?: any;
    analytics?: any[];
  }): void {
    if (!this.isEnabled) return;

    if (data.conversations) {
      this.storage.conversations.clear();
      for (const conv of data.conversations) {
        this.storage.conversations.set(conv.id, conv);
      }
    }

    if (data.settings) {
      this.storage.settings = { ...data.settings };
    }

    if (data.analytics) {
      this.storage.analytics = [...data.analytics];
    }
  }

  /**
   * Nettoie automatiquement les anciennes données pour économiser la mémoire
   */
  performMemoryCleanup(maxAgeMinutes: number = 60): {
    deletedConversations: number;
    deletedAnalytics: number;
  } {
    if (!this.isEnabled) return { deletedConversations: 0, deletedAnalytics: 0 };

    const cutoffTime = new Date(Date.now() - maxAgeMinutes * 60 * 1000);
    let deletedConversations = 0;
    let deletedAnalytics = 0;

    // Nettoyer les conversations anciennes
    for (const [id, conv] of this.storage.conversations.entries()) {
      if (conv.lastUpdated < cutoffTime) {
        this.storage.conversations.delete(id);
        deletedConversations++;
      }
    }

    // Nettoyer les analytics anciennes
    const originalAnalyticsLength = this.storage.analytics.length;
    this.storage.analytics = this.storage.analytics.filter(
      entry => new Date(entry.timestamp) >= cutoffTime
    );
    deletedAnalytics = originalAnalyticsLength - this.storage.analytics.length;

    return { deletedConversations, deletedAnalytics };
  }

  /**
   * Vérifie si la limite mémoire est atteinte
   */
  isMemoryLimitReached(maxMemoryMB: number = 10): boolean {
    const stats = this.getMemoryStats();
    const memoryMB = stats.estimatedMemoryUsage / (1024 * 1024);
    return memoryMB > maxMemoryMB;
  }

  /**
   * Affiche un avertissement si la mémoire est pleine
   */
  checkMemoryWarning(): {
    warning: boolean;
    message?: string;
    stats: ReturnType<typeof this.getMemoryStats>;
  } {
    const stats = this.getMemoryStats();
    const memoryMB = stats.estimatedMemoryUsage / (1024 * 1024);

    if (memoryMB > 8) {
      return {
        warning: true,
        message: `Utilisation mémoire élevée (${memoryMB.toFixed(1)} MB). Considérez supprimer des conversations anciennes.`,
        stats
      };
    }

    if (stats.conversationCount > 50) {
      return {
        warning: true,
        message: `Nombre élevé de conversations (${stats.conversationCount}). Considérez un nettoyage.`,
        stats
      };
    }

    return {
      warning: false,
      stats
    };
  }
}

/**
 * Adaptateur pour utiliser le mode sans cookies avec les services existants
 */
export class CookieFreeStorageAdapter {
  private cookieFreeMode: CookieFreeMode;

  constructor() {
    this.cookieFreeMode = CookieFreeMode.getInstance();
  }

  /**
   * Simule localStorage.setItem
   */
  setItem(key: string, value: string): void {
    if (this.cookieFreeMode.isActive()) {
      // Stocker dans la mémoire selon le type de clé
      if (key.startsWith('chat_conversation_')) {
        try {
          const conversation = JSON.parse(value);
          this.cookieFreeMode.storeConversation(conversation);
        } catch (error) {
          console.warn('Erreur lors du stockage de la conversation:', error);
        }
      } else if (key.startsWith('gemini_') || key.startsWith('chat_')) {
        try {
          const data = JSON.parse(value);
          this.cookieFreeMode.storeSettings({ [key]: data });
        } catch (error) {
          this.cookieFreeMode.storeSettings({ [key]: value });
        }
      }
    } else {
      // Utiliser localStorage normal
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    }
  }

  /**
   * Simule localStorage.getItem
   */
  getItem(key: string): string | null {
    if (this.cookieFreeMode.isActive()) {
      if (key.startsWith('chat_conversation_')) {
        const conversationId = key.replace('chat_conversation_', '');
        const conversation = this.cookieFreeMode.getConversation(conversationId);
        return conversation ? JSON.stringify(conversation) : null;
      } else {
        const settings = this.cookieFreeMode.getSettings();
        const value = settings[key];
        return value ? (typeof value === 'string' ? value : JSON.stringify(value)) : null;
      }
    } else {
      // Utiliser localStorage normal
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
    }
    return null;
  }

  /**
   * Simule localStorage.removeItem
   */
  removeItem(key: string): void {
    if (this.cookieFreeMode.isActive()) {
      if (key.startsWith('chat_conversation_')) {
        const conversationId = key.replace('chat_conversation_', '');
        this.cookieFreeMode.deleteConversation(conversationId);
      } else {
        const settings = this.cookieFreeMode.getSettings();
        delete settings[key];
        this.cookieFreeMode.storeSettings(settings);
      }
    } else {
      // Utiliser localStorage normal
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    }
  }

  /**
   * Simule localStorage.clear
   */
  clear(): void {
    if (this.cookieFreeMode.isActive()) {
      this.cookieFreeMode.clearAllData();
    } else {
      // Utiliser localStorage normal
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
    }
  }
}