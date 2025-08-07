/**
 * Enhanced hook for chat history management with markdown metadata support
 * Extends the base useChatHistory with enhanced features for the improved chat interface
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage } from '@/lib/gemini/types';
import { ChatHistoryService, ConversationHistory } from '@/lib/gemini/chat-history';
import { EnhancedChatMessage } from './useEnhancedGeminiChat';

interface EnhancedConversationHistory extends ConversationHistory {
  // Enhanced metadata
  markdownUsage: number;
  averageRenderTime: number;
  hasCodeBlocks: boolean;
  hasTables: boolean;
  hasLinks: boolean;
  settings: {
    markdownEnabled: boolean;
    autoScrollEnabled: boolean;
    keyboardShortcutsEnabled: boolean;
  };
}

interface ChatPreferences {
  markdownEnabled: boolean;
  autoScrollEnabled: boolean;
  keyboardShortcutsEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  saveToLocalStorage: boolean;
  sessionTimeout: number; // minutes
}

interface UseEnhancedChatHistoryReturn {
  // Base functionality
  messages: EnhancedChatMessage[];
  conversationId: string;
  exchangeCount: number;
  isLimitReached: boolean;
  remainingExchanges: number;
  isLoading: boolean;
  
  // Enhanced functionality
  preferences: ChatPreferences;
  conversationMetrics: {
    markdownUsage: number;
    averageRenderTime: number;
    totalRenderTime: number;
    errorCount: number;
    cacheHitRate: number;
  };
  
  // Actions
  addMessage: (message: EnhancedChatMessage) => void;
  clearConversation: () => void;
  startNewConversation: () => string;
  loadConversation: (conversationId: string) => void;
  
  // Enhanced actions
  updateMessageMetadata: (messageId: string, metadata: any) => void;
  markMessageAsRendered: (messageId: string, renderTime: number) => void;
  updatePreferences: (preferences: Partial<ChatPreferences>) => void;
  
  // Sauvegarde/Restauration
  saveConversationBackup: () => string | null;
  restoreConversationBackup: (backupKey: string) => boolean;
  listAvailableBackups: () => Array<{key: string, id: string, date: Date, messageCount: number, enhanced: boolean}>;
  
  // Enhanced utilities
  getUsageStats: () => any;
  canSendMessage: () => boolean;
  exportConversation: () => string;
  importConversation: (data: string) => boolean;
  getConversationAnalytics: () => any;
  searchMessages: (query: string) => EnhancedChatMessage[];
}

const defaultPreferences: ChatPreferences = {
  markdownEnabled: true,
  autoScrollEnabled: true,
  keyboardShortcutsEnabled: true,
  theme: 'auto',
  fontSize: 'medium',
  reducedMotion: false,
  saveToLocalStorage: true,
  sessionTimeout: 60 // 1 hour
};

export function useEnhancedChatHistory(initialConversationId?: string): UseEnhancedChatHistoryReturn {
  const [historyService] = useState(() => new ChatHistoryService(initialConversationId));
  const [messages, setMessages] = useState<EnhancedChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>('');
  const [exchangeCount, setExchangeCount] = useState<number>(0);
  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);
  const [remainingExchanges, setRemainingExchanges] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<ChatPreferences>(defaultPreferences);
  const [conversationMetrics, setConversationMetrics] = useState({
    markdownUsage: 0,
    averageRenderTime: 0,
    totalRenderTime: 0,
    errorCount: 0,
    cacheHitRate: 0
  });
  
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const renderTimesRef = useRef<number[]>([]);

  // Load preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedPreferences = localStorage.getItem('enhanced_chat_preferences');
        if (savedPreferences) {
          const parsed = JSON.parse(savedPreferences);
          setPreferences({ ...defaultPreferences, ...parsed });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des préférences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage
  const updatePreferences = useCallback((newPreferences: Partial<ChatPreferences>) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    
    if (typeof window !== 'undefined' && updatedPreferences.saveToLocalStorage) {
      try {
        localStorage.setItem('enhanced_chat_preferences', JSON.stringify(updatedPreferences));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des préférences:', error);
      }
    }
  }, [preferences]);

  // Enhanced message enhancement with metadata
  const enhanceMessage = useCallback((message: ChatMessage): EnhancedChatMessage => {
    const enhanced: EnhancedChatMessage = {
      ...message,
      isMarkdown: preferences.markdownEnabled && message.role === 'assistant',
      renderingState: 'complete',
      metadata: {
        hasCode: /```/.test(message.content),
        hasTables: /\|.*\|/.test(message.content),
        hasLinks: /\[.*\]\(.*\)/.test(message.content),
        renderTime: 0,
        cached: false,
        ...message.metadata
      }
    };

    return enhanced;
  }, [preferences.markdownEnabled]);

  // Update state from service with enhanced data
  const updateStateFromService = useCallback(() => {
    const currentMessages = historyService.getMessages().map(msg => enhanceMessage(msg));
    const stats = historyService.getUsageStats();
    
    setMessages(currentMessages);
    setConversationId(stats.currentConversationId);
    setExchangeCount(stats.exchangeCount);
    setIsLimitReached(stats.isLimitReached);
    setRemainingExchanges(stats.remainingExchanges);

    // Calculate enhanced metrics
    const markdownMessages = currentMessages.filter(msg => msg.isMarkdown);
    const markdownUsage = currentMessages.length > 0 ? markdownMessages.length / currentMessages.length : 0;
    const averageRenderTime = renderTimesRef.current.length > 0 
      ? renderTimesRef.current.reduce((a, b) => a + b, 0) / renderTimesRef.current.length 
      : 0;
    const totalRenderTime = renderTimesRef.current.reduce((a, b) => a + b, 0);
    const errorMessages = currentMessages.filter(msg => msg.renderingState === 'error');
    const cachedMessages = currentMessages.filter(msg => msg.metadata?.cached);
    const cacheHitRate = currentMessages.length > 0 ? cachedMessages.length / currentMessages.length : 0;

    setConversationMetrics({
      markdownUsage,
      averageRenderTime,
      totalRenderTime,
      errorCount: errorMessages.length,
      cacheHitRate
    });
  }, [historyService, enhanceMessage]);

  // Initialize state
  useEffect(() => {
    setIsLoading(true);
    updateStateFromService();
    setIsLoading(false);
  }, [updateStateFromService]);

  // Auto-save with enhanced data
  useEffect(() => {
    if (messages.length > 0 && preferences.saveToLocalStorage) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveEnhancedConversationBackup();
      }, 5000);
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [messages, preferences.saveToLocalStorage]);

  // Enhanced message addition
  const addMessage = useCallback((message: EnhancedChatMessage) => {
    const enhancedMessage = enhanceMessage(message);
    historyService.addMessage(enhancedMessage);
    updateStateFromService();
  }, [historyService, updateStateFromService, enhanceMessage]);

  // Update message metadata
  const updateMessageMetadata = useCallback((messageId: string, metadata: any) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, metadata: { ...msg.metadata, ...metadata } }
        : msg
    ));
  }, []);

  // Mark message as rendered with timing
  const markMessageAsRendered = useCallback((messageId: string, renderTime: number) => {
    renderTimesRef.current.push(renderTime);
    
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            renderingState: 'complete' as const,
            metadata: { ...msg.metadata, renderTime }
          }
        : msg
    ));

    // Update metrics
    updateStateFromService();
  }, [updateStateFromService]);

  // Enhanced conversation backup
  const saveEnhancedConversationBackup = useCallback(() => {
    try {
      const backupData: EnhancedConversationHistory = {
        id: conversationId,
        messages: messages,
        createdAt: new Date(),
        lastActivity: new Date(),
        messageCount: messages.length,
        // Enhanced fields
        markdownUsage: conversationMetrics.markdownUsage,
        averageRenderTime: conversationMetrics.averageRenderTime,
        hasCodeBlocks: messages.some(msg => msg.metadata?.hasCode),
        hasTables: messages.some(msg => msg.metadata?.hasTables),
        hasLinks: messages.some(msg => msg.metadata?.hasLinks),
        settings: {
          markdownEnabled: preferences.markdownEnabled,
          autoScrollEnabled: preferences.autoScrollEnabled,
          keyboardShortcutsEnabled: preferences.keyboardShortcutsEnabled
        }
      };

      if (typeof window !== 'undefined') {
        const backupKey = `enhanced_chat_backup_${conversationId}_${Date.now()}`;
        localStorage.setItem(backupKey, JSON.stringify(backupData));
        return backupKey;
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde améliorée:', error);
      return null;
    }
  }, [conversationId, messages, conversationMetrics, preferences]);

  // Enhanced backup listing
  const listAvailableBackups = useCallback(() => {
    const backups = historyService.listAvailableBackups();
    
    if (typeof window === 'undefined') return backups.map(b => ({ ...b, enhanced: false }));
    
    const enhancedBackups = [];
    
    // Add enhanced backups
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('enhanced_chat_backup_')) {
        try {
          const backup = JSON.parse(localStorage.getItem(key) || '{}');
          enhancedBackups.push({
            key,
            id: backup.id,
            date: new Date(backup.lastActivity),
            messageCount: backup.messageCount,
            enhanced: true,
            markdownUsage: backup.markdownUsage,
            settings: backup.settings
          });
        } catch (error) {
          console.error('Erreur lors de la lecture du backup amélioré:', error);
        }
      }
    }
    
    // Combine and sort
    const allBackups = [
      ...backups.map(b => ({ ...b, enhanced: false })),
      ...enhancedBackups
    ].sort((a, b) => b.date.getTime() - a.date.getTime());
    
    return allBackups;
  }, [historyService]);

  // Enhanced search functionality
  const searchMessages = useCallback((query: string): EnhancedChatMessage[] => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return messages.filter(message => 
      message.content.toLowerCase().includes(searchTerm) ||
      (message.metadata?.hasCode && searchTerm.includes('code')) ||
      (message.metadata?.hasTables && searchTerm.includes('table')) ||
      (message.metadata?.hasLinks && searchTerm.includes('link'))
    );
  }, [messages]);

  // Enhanced analytics
  const getConversationAnalytics = useCallback(() => {
    const userMessages = messages.filter(msg => msg.role === 'user');
    const assistantMessages = messages.filter(msg => msg.role === 'assistant');
    const markdownMessages = messages.filter(msg => msg.isMarkdown);
    const codeMessages = messages.filter(msg => msg.metadata?.hasCode);
    const tableMessages = messages.filter(msg => msg.metadata?.hasTables);
    const linkMessages = messages.filter(msg => msg.metadata?.hasLinks);
    const cachedMessages = messages.filter(msg => msg.metadata?.cached);
    const errorMessages = messages.filter(msg => msg.renderingState === 'error');

    return {
      basic: {
        totalMessages: messages.length,
        userMessages: userMessages.length,
        assistantMessages: assistantMessages.length,
        averageMessageLength: messages.length > 0 
          ? messages.reduce((sum, msg) => sum + msg.content.length, 0) / messages.length 
          : 0
      },
      enhanced: {
        markdownMessages: markdownMessages.length,
        markdownUsage: conversationMetrics.markdownUsage,
        codeBlocks: codeMessages.length,
        tables: tableMessages.length,
        links: linkMessages.length,
        cachedResponses: cachedMessages.length,
        cacheHitRate: conversationMetrics.cacheHitRate,
        errors: errorMessages.length,
        averageRenderTime: conversationMetrics.averageRenderTime,
        totalRenderTime: conversationMetrics.totalRenderTime
      },
      preferences: preferences,
      session: {
        conversationId,
        exchangeCount,
        remainingExchanges,
        isLimitReached
      }
    };
  }, [messages, conversationMetrics, preferences, conversationId, exchangeCount, remainingExchanges, isLimitReached]);

  // Enhanced export
  const exportConversation = useCallback(() => {
    try {
      const exportData = {
        version: '2.0',
        type: 'enhanced_conversation',
        conversationId,
        messages,
        preferences,
        metrics: conversationMetrics,
        analytics: getConversationAnalytics(),
        exportDate: new Date().toISOString()
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Erreur lors de l\'export amélioré:', error);
      return '';
    }
  }, [conversationId, messages, preferences, conversationMetrics, getConversationAnalytics]);

  // Enhanced import
  const importConversation = useCallback((data: string) => {
    setIsLoading(true);
    try {
      const importData = JSON.parse(data);
      
      if (!importData.messages || !Array.isArray(importData.messages)) {
        throw new Error('Format de données invalide');
      }

      // Validate and enhance messages
      const validMessages = importData.messages.filter((msg: any) => 
        msg.id && msg.role && msg.content && msg.timestamp
      ).map((msg: any) => enhanceMessage({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));

      if (validMessages.length === 0) {
        throw new Error('Aucun message valide trouvé');
      }

      // Start new conversation and add messages
      const newConversationId = historyService.startNewConversation();
      
      validMessages.forEach((msg: EnhancedChatMessage) => {
        historyService.addMessage(msg);
      });

      // Import preferences if available
      if (importData.preferences) {
        updatePreferences(importData.preferences);
      }

      updateStateFromService();
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'import amélioré:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [historyService, enhanceMessage, updatePreferences, updateStateFromService]);

  // Standard methods with enhanced functionality
  const clearConversation = useCallback(() => {
    historyService.clearCurrentConversation();
    renderTimesRef.current = [];
    updateStateFromService();
  }, [historyService, updateStateFromService]);

  const startNewConversation = useCallback(() => {
    const newId = historyService.startNewConversation();
    renderTimesRef.current = [];
    updateStateFromService();
    return newId;
  }, [historyService, updateStateFromService]);

  const loadConversation = useCallback(async (newConversationId: string) => {
    setIsLoading(true);
    try {
      // In a complete implementation, we would load the specific conversation
      updateStateFromService();
    } catch (error) {
      console.error('Erreur lors du chargement de la conversation:', error);
    } finally {
      setIsLoading(false);
    }
  }, [updateStateFromService]);

  const saveConversationBackup = useCallback(() => {
    return saveEnhancedConversationBackup();
  }, [saveEnhancedConversationBackup]);

  const restoreConversationBackup = useCallback((backupKey: string) => {
    setIsLoading(true);
    try {
      // Try enhanced backup first
      if (backupKey.startsWith('enhanced_chat_backup_')) {
        if (typeof window !== 'undefined') {
          const backup = localStorage.getItem(backupKey);
          if (backup) {
            const parsedBackup = JSON.parse(backup);
            
            // Restore messages
            const newConversationId = historyService.startNewConversation();
            parsedBackup.messages.forEach((msg: EnhancedChatMessage) => {
              historyService.addMessage(msg);
            });

            // Restore preferences
            if (parsedBackup.settings) {
              updatePreferences(parsedBackup.settings);
            }

            updateStateFromService();
            return true;
          }
        }
      } else {
        // Fall back to standard backup
        const success = historyService.restoreConversationBackup(backupKey);
        if (success) {
          updateStateFromService();
        }
        return success;
      }
      
      return false;
    } catch (error) {
      console.error('Erreur lors de la restauration améliorée:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [historyService, updatePreferences, updateStateFromService]);

  const getUsageStats = useCallback(() => {
    const baseStats = historyService.getUsageStats();
    return {
      ...baseStats,
      enhanced: {
        ...conversationMetrics,
        preferences,
        analytics: getConversationAnalytics()
      }
    };
  }, [historyService, conversationMetrics, preferences, getConversationAnalytics]);

  const canSendMessage = useCallback(() => {
    return !historyService.isLimitReached();
  }, [historyService]);

  return {
    // Base functionality
    messages,
    conversationId,
    exchangeCount,
    isLimitReached,
    remainingExchanges,
    isLoading,
    
    // Enhanced functionality
    preferences,
    conversationMetrics,
    
    // Actions
    addMessage,
    clearConversation,
    startNewConversation,
    loadConversation,
    
    // Enhanced actions
    updateMessageMetadata,
    markMessageAsRendered,
    updatePreferences,
    
    // Sauvegarde/Restauration
    saveConversationBackup,
    restoreConversationBackup,
    listAvailableBackups,
    
    // Enhanced utilities
    getUsageStats,
    canSendMessage,
    exportConversation,
    importConversation,
    getConversationAnalytics,
    searchMessages
  };
}

/**
 * Hook for enhanced privacy management with preferences
 */
export function useEnhancedPrivacyManager() {
  const clearAllEnhancedChatData = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Clear standard chat data
      localStorage.removeItem('gemini_chat_history');
      localStorage.removeItem('enhanced_chat_preferences');
      
      // Clear enhanced backups
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('chat_backup_') || key.startsWith('enhanced_chat_backup_'))) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      console.log('Toutes les données de chat améliorées ont été effacées');
    } catch (error) {
      console.error('Erreur lors de l\'effacement des données améliorées:', error);
    }
  }, []);

  const getEnhancedStorageSize = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    
    let totalSize = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.startsWith('gemini_chat') || 
          key.startsWith('chat_backup_') ||
          key.startsWith('enhanced_chat_backup_') ||
          key.startsWith('enhanced_chat_preferences')
        )) {
          const value = localStorage.getItem(key) || '';
          totalSize += key.length + value.length;
        }
      }
    } catch (error) {
      console.error('Erreur lors du calcul de la taille améliorée:', error);
    }
    
    return totalSize;
  }, []);

  const exportAllEnhancedData = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    try {
      const allData = {
        conversations: [],
        backups: [],
        enhancedBackups: [],
        preferences: null,
        exportDate: new Date().toISOString(),
        version: '2.0',
        type: 'enhanced_chat_export'
      };

      // Get standard conversations
      const stored = localStorage.getItem('gemini_chat_history');
      if (stored) {
        allData.conversations = JSON.parse(stored);
      }

      // Get preferences
      const preferences = localStorage.getItem('enhanced_chat_preferences');
      if (preferences) {
        allData.preferences = JSON.parse(preferences);
      }

      // Get all backups
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          try {
            if (key.startsWith('chat_backup_')) {
              const backup = JSON.parse(localStorage.getItem(key) || '{}');
              allData.backups.push({ key, ...backup });
            } else if (key.startsWith('enhanced_chat_backup_')) {
              const backup = JSON.parse(localStorage.getItem(key) || '{}');
              allData.enhancedBackups.push({ key, ...backup });
            }
          } catch (error) {
            console.error('Erreur lors de la lecture du backup:', error);
          }
        }
      }

      return JSON.stringify(allData, null, 2);
    } catch (error) {
      console.error('Erreur lors de l\'export des données améliorées:', error);
      return null;
    }
  }, []);

  return {
    clearAllEnhancedChatData,
    getEnhancedStorageSize,
    exportAllEnhancedData
  };
}

export type { 
  ChatPreferences, 
  EnhancedConversationHistory, 
  UseEnhancedChatHistoryReturn 
};