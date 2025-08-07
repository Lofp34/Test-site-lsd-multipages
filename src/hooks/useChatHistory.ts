/**
 * Hook React pour la gestion de l'historique des conversations
 * Gère la persistance locale, les limites de messages et la sauvegarde/restauration
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage } from '@/lib/gemini/types';
import { ChatHistoryService, ConversationHistory } from '@/lib/gemini/chat-history';

export interface UseChatHistoryReturn {
  // État
  messages: ChatMessage[];
  conversationId: string;
  exchangeCount: number;
  isLimitReached: boolean;
  remainingExchanges: number;
  isLoading: boolean;
  
  // Actions
  addMessage: (message: ChatMessage) => void;
  clearConversation: () => void;
  startNewConversation: () => string;
  loadConversation: (conversationId: string) => void;
  
  // Enhanced actions (backward compatible)
  updateMessageMetadata?: (messageId: string, metadata: any) => void;
  markMessageAsRendered?: (messageId: string, renderTime: number) => void;
  
  // Sauvegarde/Restauration
  saveConversationBackup: () => string | null;
  restoreConversationBackup: (backupKey: string) => boolean;
  listAvailableBackups: () => Array<{key: string, id: string, date: Date, messageCount: number}>;
  
  // Utilitaires
  getUsageStats: () => any;
  canSendMessage: () => boolean;
  exportConversation: () => string;
  importConversation: (data: string) => boolean;
  
  // Enhanced utilities (backward compatible)
  searchMessages?: (query: string) => ChatMessage[];
  getConversationAnalytics?: () => any;
}

export function useChatHistory(
  initialConversationId?: string,
  enhancedMode: boolean = false
): UseChatHistoryReturn {
  const [historyService] = useState(() => new ChatHistoryService(initialConversationId));
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>('');
  const [exchangeCount, setExchangeCount] = useState<number>(0);
  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);
  const [remainingExchanges, setRemainingExchanges] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour mettre à jour l'état depuis le service
  const updateStateFromService = useCallback(() => {
    const currentMessages = historyService.getMessages();
    const stats = historyService.getUsageStats();
    
    setMessages(currentMessages);
    setConversationId(stats.currentConversationId);
    setExchangeCount(stats.exchangeCount);
    setIsLimitReached(stats.isLimitReached);
    setRemainingExchanges(stats.remainingExchanges);
  }, [historyService]);

  // Initialiser l'état au montage
  useEffect(() => {
    setIsLoading(true);
    updateStateFromService();
    setIsLoading(false);
  }, [updateStateFromService]);

  // Auto-sauvegarde périodique
  useEffect(() => {
    if (messages.length > 0) {
      // Annuler la sauvegarde précédente
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      // Programmer une nouvelle sauvegarde dans 5 secondes
      autoSaveTimeoutRef.current = setTimeout(() => {
        historyService.saveConversationBackup();
      }, 5000);
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [messages, historyService]);

  // Ajouter un message
  const addMessage = useCallback((message: ChatMessage) => {
    historyService.addMessage(message);
    updateStateFromService();
  }, [historyService, updateStateFromService]);

  // Effacer la conversation courante
  const clearConversation = useCallback(() => {
    historyService.clearCurrentConversation();
    updateStateFromService();
  }, [historyService, updateStateFromService]);

  // Démarrer une nouvelle conversation
  const startNewConversation = useCallback(() => {
    const newId = historyService.startNewConversation();
    updateStateFromService();
    return newId;
  }, [historyService, updateStateFromService]);

  // Charger une conversation existante
  const loadConversation = useCallback(async (newConversationId: string) => {
    setIsLoading(true);
    try {
      // Créer un nouveau service avec l'ID de conversation
      const newService = new ChatHistoryService(newConversationId);
      // Note: Dans une implémentation complète, on remplacerait le service actuel
      // Pour cette version, on se contente de mettre à jour l'état
      updateStateFromService();
    } catch (error) {
      console.error('Erreur lors du chargement de la conversation:', error);
    } finally {
      setIsLoading(false);
    }
  }, [updateStateFromService]);

  // Sauvegarder la conversation
  const saveConversationBackup = useCallback(() => {
    try {
      return historyService.saveConversationBackup();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return null;
    }
  }, [historyService]);

  // Restaurer une conversation depuis un backup
  const restoreConversationBackup = useCallback((backupKey: string) => {
    setIsLoading(true);
    try {
      const success = historyService.restoreConversationBackup(backupKey);
      if (success) {
        updateStateFromService();
      }
      return success;
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [historyService, updateStateFromService]);

  // Lister les backups disponibles
  const listAvailableBackups = useCallback(() => {
    return historyService.listAvailableBackups();
  }, [historyService]);

  // Exporter la conversation au format JSON
  const exportConversation = useCallback(() => {
    try {
      const conversationData = {
        id: conversationId,
        messages: messages,
        exportDate: new Date().toISOString(),
        stats: historyService.getUsageStats()
      };
      return JSON.stringify(conversationData, null, 2);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      return '';
    }
  }, [conversationId, messages, historyService]);

  // Importer une conversation depuis JSON
  const importConversation = useCallback((data: string) => {
    setIsLoading(true);
    try {
      const conversationData = JSON.parse(data);
      
      if (!conversationData.messages || !Array.isArray(conversationData.messages)) {
        throw new Error('Format de données invalide');
      }

      // Valider les messages
      const validMessages = conversationData.messages.filter((msg: any) => 
        msg.id && msg.role && msg.content && msg.timestamp
      );

      if (validMessages.length === 0) {
        throw new Error('Aucun message valide trouvé');
      }

      // Créer une nouvelle conversation avec les données importées
      const newConversationId = historyService.startNewConversation();
      
      // Ajouter les messages un par un
      validMessages.forEach((msg: ChatMessage) => {
        historyService.addMessage({
          ...msg,
          timestamp: new Date(msg.timestamp)
        });
      });

      updateStateFromService();
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [historyService, updateStateFromService]);

  // Enhanced functionality (only available in enhanced mode)
  const updateMessageMetadata = enhancedMode ? useCallback((messageId: string, metadata: any) => {
    // This would be implemented with enhanced message storage
    console.log('Enhanced mode: updating message metadata', messageId, metadata);
  }, []) : undefined;

  const markMessageAsRendered = enhancedMode ? useCallback((messageId: string, renderTime: number) => {
    // This would be implemented with enhanced message storage
    console.log('Enhanced mode: marking message as rendered', messageId, renderTime);
  }, []) : undefined;

  const searchMessages = enhancedMode ? useCallback((query: string): ChatMessage[] => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return messages.filter(message => 
      message.content.toLowerCase().includes(searchTerm)
    );
  }, [messages]) : undefined;

  const getConversationAnalytics = enhancedMode ? useCallback(() => {
    const userMessages = messages.filter(msg => msg.role === 'user');
    const assistantMessages = messages.filter(msg => msg.role === 'assistant');

    return {
      totalMessages: messages.length,
      userMessages: userMessages.length,
      assistantMessages: assistantMessages.length,
      averageMessageLength: messages.length > 0 
        ? messages.reduce((sum, msg) => sum + msg.content.length, 0) / messages.length 
        : 0,
      conversationDuration: messages.length > 1 
        ? messages[messages.length - 1].timestamp.getTime() - messages[0].timestamp.getTime()
        : 0
    };
  }, [messages]) : undefined;

  // Obtenir les statistiques d'utilisation
  const getUsageStats = useCallback(() => {
    return historyService.getUsageStats();
  }, [historyService]);

  // Vérifier si on peut envoyer un message
  const canSendMessage = useCallback(() => {
    return !historyService.isLimitReached();
  }, [historyService]);

  return {
    // État
    messages,
    conversationId,
    exchangeCount,
    isLimitReached,
    remainingExchanges,
    isLoading,
    
    // Actions
    addMessage,
    clearConversation,
    startNewConversation,
    loadConversation,
    
    // Enhanced actions (only in enhanced mode)
    ...(enhancedMode && {
      updateMessageMetadata,
      markMessageAsRendered
    }),
    
    // Sauvegarde/Restauration
    saveConversationBackup,
    restoreConversationBackup,
    listAvailableBackups,
    
    // Utilitaires
    getUsageStats,
    canSendMessage,
    exportConversation,
    importConversation,
    
    // Enhanced utilities (only in enhanced mode)
    ...(enhancedMode && {
      searchMessages,
      getConversationAnalytics
    })
  };
}

/**
 * Hook pour gérer la persistance automatique
 */
export function useAutoPersistence() {
  useEffect(() => {
    // Nettoyer les anciennes conversations au démarrage
    ChatHistoryService.cleanupOldConversations();

    // Nettoyer périodiquement (toutes les heures)
    const cleanupInterval = setInterval(() => {
      ChatHistoryService.cleanupOldConversations();
    }, 60 * 60 * 1000); // 1 heure

    return () => clearInterval(cleanupInterval);
  }, []);
}

/**
 * Hook pour les notifications de limite atteinte
 */
export function useLimitNotifications(exchangeCount: number, isLimitReached: boolean) {
  const [hasShownWarning, setHasShownWarning] = useState(false);
  const [hasShownLimit, setHasShownLimit] = useState(false);

  useEffect(() => {
    // Avertissement à 8 échanges
    if (exchangeCount >= 8 && !hasShownWarning && !isLimitReached) {
      setHasShownWarning(true);
      // Ici on pourrait déclencher une notification
      console.warn('Attention: Vous approchez de la limite de 10 échanges');
    }

    // Notification de limite atteinte
    if (isLimitReached && !hasShownLimit) {
      setHasShownLimit(true);
      console.warn('Limite de 10 échanges atteinte. Démarrez une nouvelle conversation.');
    }

    // Reset des notifications si on démarre une nouvelle conversation
    if (exchangeCount === 0) {
      setHasShownWarning(false);
      setHasShownLimit(false);
    }
  }, [exchangeCount, isLimitReached, hasShownWarning, hasShownLimit]);

  return {
    shouldShowWarning: exchangeCount >= 8 && !isLimitReached,
    shouldShowLimit: isLimitReached,
    remainingExchanges: Math.max(0, 10 - exchangeCount)
  };
}

/**
 * Hook pour la sauvegarde/restauration des conversations
 */
export function useConversationBackup() {
  // Sauvegarder une conversation
  const backupConversation = useCallback((conversationId: string) => {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem('gemini_chat_history');
      if (!stored) return null;

      const conversations: ConversationHistory[] = JSON.parse(stored);
      const conversation = conversations.find(conv => conv.id === conversationId);
      
      if (conversation) {
        // Créer un backup avec timestamp
        const backup = {
          ...conversation,
          backupDate: new Date().toISOString()
        };
        
        // Sauvegarder dans une clé séparée
        localStorage.setItem(`chat_backup_${conversationId}`, JSON.stringify(backup));
        return backup;
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
    
    return null;
  }, []);

  // Restaurer une conversation
  const restoreConversation = useCallback((conversationId: string) => {
    if (typeof window === 'undefined') return null;
    
    try {
      const backup = localStorage.getItem(`chat_backup_${conversationId}`);
      if (!backup) return null;

      const parsedBackup = JSON.parse(backup);
      
      // Restaurer dans l'historique principal
      const stored = localStorage.getItem('gemini_chat_history') || '[]';
      const conversations: ConversationHistory[] = JSON.parse(stored);
      
      // Remplacer ou ajouter la conversation restaurée
      const existingIndex = conversations.findIndex(conv => conv.id === conversationId);
      if (existingIndex >= 0) {
        conversations[existingIndex] = parsedBackup;
      } else {
        conversations.push(parsedBackup);
      }
      
      localStorage.setItem('gemini_chat_history', JSON.stringify(conversations));
      return parsedBackup;
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
    }
    
    return null;
  }, []);

  // Lister les backups disponibles
  const listBackups = useCallback(() => {
    if (typeof window === 'undefined') return [];
    
    const backups = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('chat_backup_')) {
        try {
          const backup = JSON.parse(localStorage.getItem(key) || '{}');
          backups.push({
            id: key.replace('chat_backup_', ''),
            ...backup
          });
        } catch (error) {
          console.error('Erreur lors de la lecture du backup:', error);
        }
      }
    }
    
    return backups.sort((a, b) => 
      new Date(b.backupDate).getTime() - a.backupDate.getTime()
    );
  }, []);

  return {
    backupConversation,
    restoreConversation,
    listBackups
  };
}

/**
 * Hook pour la gestion de la vie privée et des données
 */
export function usePrivacyManager() {
  // Effacer toutes les données de chat
  const clearAllChatData = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Effacer l'historique principal
      localStorage.removeItem('gemini_chat_history');
      
      // Effacer tous les backups
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('chat_backup_')) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      console.log('Toutes les données de chat ont été effacées');
    } catch (error) {
      console.error('Erreur lors de l\'effacement des données:', error);
    }
  }, []);

  // Obtenir la taille des données stockées
  const getStorageSize = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    
    let totalSize = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('gemini_chat') || key.startsWith('chat_backup_'))) {
          const value = localStorage.getItem(key) || '';
          totalSize += key.length + value.length;
        }
      }
    } catch (error) {
      console.error('Erreur lors du calcul de la taille:', error);
    }
    
    return totalSize;
  }, []);

  // Vérifier si les données sont stockées
  const hasStoredData = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    return localStorage.getItem('gemini_chat_history') !== null;
  }, []);

  // Exporter toutes les données pour GDPR
  const exportAllData = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    try {
      const allData = {
        conversations: [],
        backups: [],
        exportDate: new Date().toISOString(),
        version: '1.0'
      };

      // Récupérer les conversations principales
      const stored = localStorage.getItem('gemini_chat_history');
      if (stored) {
        allData.conversations = JSON.parse(stored);
      }

      // Récupérer les backups
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('chat_backup_')) {
          try {
            const backup = JSON.parse(localStorage.getItem(key) || '{}');
            allData.backups.push({
              key,
              ...backup
            });
          } catch (error) {
            console.error('Erreur lors de la lecture du backup:', error);
          }
        }
      }

      return JSON.stringify(allData, null, 2);
    } catch (error) {
      console.error('Erreur lors de l\'export des données:', error);
      return null;
    }
  }, []);

  return {
    clearAllChatData,
    getStorageSize,
    hasStoredData,
    exportAllData
  };
}

/**
 * Hook pour les analytics et métriques de conversation
 */
export function useConversationAnalytics(messages: ChatMessage[]) {
  const [analytics, setAnalytics] = useState({
    totalMessages: 0,
    userMessages: 0,
    assistantMessages: 0,
    averageMessageLength: 0,
    conversationDuration: 0,
    topicsDiscussed: [] as string[],
    filesShared: 0,
    lastActivity: null as Date | null
  });

  useEffect(() => {
    if (messages.length === 0) {
      setAnalytics({
        totalMessages: 0,
        userMessages: 0,
        assistantMessages: 0,
        averageMessageLength: 0,
        conversationDuration: 0,
        topicsDiscussed: [],
        filesShared: 0,
        lastActivity: null
      });
      return;
    }

    const userMessages = messages.filter(msg => msg.role === 'user');
    const assistantMessages = messages.filter(msg => msg.role === 'assistant');
    
    const totalLength = messages.reduce((sum, msg) => sum + msg.content.length, 0);
    const averageLength = messages.length > 0 ? Math.round(totalLength / messages.length) : 0;
    
    const firstMessage = messages[0];
    const lastMessage = messages[messages.length - 1];
    const duration = firstMessage && lastMessage 
      ? lastMessage.timestamp.getTime() - firstMessage.timestamp.getTime()
      : 0;

    const filesCount = messages.reduce((count, msg) => 
      count + (msg.files ? msg.files.length : 0), 0
    );

    // Analyse simple des sujets (mots-clés fréquents)
    const allText = messages.map(msg => msg.content).join(' ').toLowerCase();
    const words = allText.match(/\b\w{4,}\b/g) || [];
    const wordCount: Record<string, number> = {};
    
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    const topTopics = Object.entries(wordCount)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([word]) => word);

    setAnalytics({
      totalMessages: messages.length,
      userMessages: userMessages.length,
      assistantMessages: assistantMessages.length,
      averageMessageLength: averageLength,
      conversationDuration: duration,
      topicsDiscussed: topTopics,
      filesShared: filesCount,
      lastActivity: lastMessage ? lastMessage.timestamp : null
    });
  }, [messages]);

  return analytics;
}