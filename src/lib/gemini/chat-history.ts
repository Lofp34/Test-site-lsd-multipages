/**
 * Service de gestion de l'historique des conversations
 * Gère la persistance en localStorage avec limite de 10 échanges
 */

import { ChatMessage } from './types';
import { ConversationManager } from './conversation-manager';

export interface ConversationHistory {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastUpdated: Date;
  messageCount: number;
}

export class ChatHistoryService {
  private static readonly STORAGE_KEY = 'gemini_chat_history';
  private static readonly MAX_MESSAGES = 10; // Limite de 10 échanges (20 messages total)
  private static readonly MAX_CONVERSATIONS = 5; // Garder max 5 conversations

  private conversationId: string;
  private messages: ChatMessage[] = [];
  private conversationManager: ConversationManager;

  constructor(conversationId?: string) {
    this.conversationId = conversationId || this.generateConversationId();
    this.conversationManager = new ConversationManager({
      maxConversations: ChatHistoryService.MAX_CONVERSATIONS,
      autoCleanup: true,
    });
    this.loadFromStorage();
  }

  /**
   * Ajoute un message à l'historique
   */
  addMessage(message: ChatMessage): void {
    this.messages.push(message);
    
    // Appliquer la limite de messages (10 échanges = 20 messages max)
    const maxMessages = ChatHistoryService.MAX_MESSAGES * 2;
    if (this.messages.length > maxMessages) {
      // Garder les messages les plus récents
      this.messages = this.messages.slice(-maxMessages);
    }
    
    this.saveToStorage();

    // Déclencher le nettoyage automatique si la limite est atteinte
    if (this.isLimitReached()) {
      this.triggerAutoCleanup();
    }
  }

  /**
   * Récupère tous les messages de la conversation
   */
  getMessages(): ChatMessage[] {
    return [...this.messages];
  }

  /**
   * Récupère le nombre d'échanges (paires user/assistant)
   */
  getExchangeCount(): number {
    // Compter les messages utilisateur (chaque message utilisateur = 1 échange)
    return this.messages.filter(msg => msg.role === 'user').length;
  }

  /**
   * Vérifie si la limite d'échanges est atteinte
   */
  isLimitReached(): boolean {
    return this.getExchangeCount() >= ChatHistoryService.MAX_MESSAGES;
  }

  /**
   * Efface l'historique de la conversation courante
   */
  clearCurrentConversation(): void {
    this.messages = [];
    this.saveToStorage();
  }

  /**
   * Démarre une nouvelle conversation
   */
  startNewConversation(): string {
    // Sauvegarder la conversation actuelle si elle contient des messages
    if (this.messages.length > 0) {
      this.saveToStorage();
    }

    // Créer une nouvelle conversation
    this.conversationId = this.generateConversationId();
    this.messages = [];
    
    return this.conversationId;
  }

  /**
   * Récupère l'ID de la conversation courante
   */
  getCurrentConversationId(): string {
    return this.conversationId;
  }

  /**
   * Récupère l'historique formaté pour l'API Gemini
   */
  getGeminiHistory(): Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> {
    return this.messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
  }

  /**
   * Sauvegarde en localStorage
   */
  private saveToStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      const allConversations = this.getAllConversations();
      
      // Mettre à jour ou ajouter la conversation courante
      const conversationIndex = allConversations.findIndex(
        conv => conv.id === this.conversationId
      );

      const currentConversation: ConversationHistory = {
        id: this.conversationId,
        messages: this.messages,
        createdAt: conversationIndex === -1 ? new Date() : allConversations[conversationIndex].createdAt,
        lastUpdated: new Date(),
        messageCount: this.messages.length
      };

      if (conversationIndex === -1) {
        allConversations.push(currentConversation);
      } else {
        allConversations[conversationIndex] = currentConversation;
      }

      // Limiter le nombre de conversations stockées
      const limitedConversations = allConversations
        .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
        .slice(0, ChatHistoryService.MAX_CONVERSATIONS);

      localStorage.setItem(
        ChatHistoryService.STORAGE_KEY,
        JSON.stringify(limitedConversations, this.dateReplacer)
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'historique:', error);
    }
  }

  /**
   * Charge depuis localStorage
   */
  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(ChatHistoryService.STORAGE_KEY);
      if (!stored) return;

      const allConversations: ConversationHistory[] = JSON.parse(stored, this.dateReviver);
      const currentConversation = allConversations.find(
        conv => conv.id === this.conversationId
      );

      if (currentConversation) {
        this.messages = currentConversation.messages || [];
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
      // En cas d'erreur, commencer avec un historique vide
      this.messages = [];
    }
  }

  /**
   * Récupère toutes les conversations stockées
   */
  private getAllConversations(): ConversationHistory[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(ChatHistoryService.STORAGE_KEY);
      if (!stored) return [];

      return JSON.parse(stored, this.dateReviver);
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations:', error);
      return [];
    }
  }

  /**
   * Génère un ID unique pour une conversation
   */
  private generateConversationId(): string {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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
   * Nettoie les anciennes conversations (utilitaire)
   */
  static cleanupOldConversations(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(ChatHistoryService.STORAGE_KEY);
      if (!stored) return;

      const allConversations: ConversationHistory[] = JSON.parse(stored);
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      // Garder seulement les conversations de moins d'une semaine
      const recentConversations = allConversations.filter(
        conv => new Date(conv.lastUpdated) > oneWeekAgo
      );

      localStorage.setItem(
        ChatHistoryService.STORAGE_KEY,
        JSON.stringify(recentConversations)
      );
    } catch (error) {
      console.error('Erreur lors du nettoyage des conversations:', error);
    }
  }

  /**
   * Supprime toutes les conversations stockées
   */
  static clearAllConversations(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ChatHistoryService.STORAGE_KEY);
  }

  /**
   * Récupère les statistiques d'utilisation
   */
  getUsageStats() {
    return {
      currentConversationId: this.conversationId,
      messageCount: this.messages.length,
      exchangeCount: this.getExchangeCount(),
      isLimitReached: this.isLimitReached(),
      remainingExchanges: Math.max(0, ChatHistoryService.MAX_MESSAGES - this.getExchangeCount())
    };
  }

  /**
   * Déclenche le nettoyage automatique après 10 échanges
   */
  private triggerAutoCleanup(): void {
    console.log('Limite de 10 échanges atteinte - Déclenchement du nettoyage automatique');
    
    // Proposer de démarrer une nouvelle conversation
    if (typeof window !== 'undefined') {
      const shouldStartNew = window.confirm(
        'Vous avez atteint la limite de 10 échanges pour cette conversation. ' +
        'Souhaitez-vous démarrer une nouvelle conversation ? ' +
        '(Les messages précédents seront sauvegardés)'
      );

      if (shouldStartNew) {
        this.startNewConversation();
      }
    }

    // Nettoyer les conversations limitées via le manager
    this.conversationManager.cleanupLimitedConversations();
  }

  /**
   * Sauvegarde/restauration des conversations
   */
  saveConversationBackup(): string | null {
    try {
      const conversationData: ConversationHistory = {
        id: this.conversationId,
        messages: this.messages,
        createdAt: new Date(),
        lastUpdated: new Date(),
        messageCount: this.messages.length
      };

      this.conversationManager.saveConversation(conversationData);
      
      // Créer un backup supplémentaire
      const backupKey = `chat_backup_${this.conversationId}_${Date.now()}`;
      if (typeof window !== 'undefined') {
        localStorage.setItem(backupKey, JSON.stringify(conversationData, this.dateReplacer));
      }
      
      return backupKey;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du backup:', error);
      return null;
    }
  }

  /**
   * Restaure une conversation depuis un backup
   */
  restoreConversationBackup(backupKey: string): boolean {
    try {
      if (typeof window === 'undefined') return false;
      
      const backup = localStorage.getItem(backupKey);
      if (!backup) return false;

      const conversationData: ConversationHistory = JSON.parse(backup, this.dateReviver);
      
      // Restaurer les messages
      this.messages = conversationData.messages || [];
      this.conversationId = conversationData.id;
      
      // Sauvegarder dans l'historique principal
      this.saveToStorage();
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la restauration du backup:', error);
      return false;
    }
  }

  /**
   * Liste les backups disponibles
   */
  listAvailableBackups(): Array<{key: string, id: string, date: Date, messageCount: number}> {
    if (typeof window === 'undefined') return [];
    
    const backups = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('chat_backup_')) {
        try {
          const backup = JSON.parse(localStorage.getItem(key) || '{}', this.dateReviver);
          backups.push({
            key,
            id: backup.id || 'unknown',
            date: backup.lastUpdated || new Date(),
            messageCount: backup.messageCount || 0
          });
        } catch (error) {
          console.error('Erreur lors de la lecture du backup:', error);
        }
      }
    }
    
    return backups.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}