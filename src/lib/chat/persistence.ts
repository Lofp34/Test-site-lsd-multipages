/**
 * Chat Persistence Service
 * Handles saving and restoring chat state, preferences, and conversation history
 */

import { EnhancedChatMessage } from '@/hooks/useEnhancedGeminiChat';
import { ChatPreferences } from './preferences';

export interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  isFullscreen: boolean;
  position: 'bottom-left' | 'bottom-right' | 'center';
  size: { width: number; height: number };
  lastActivity: Date;
}

export interface ConversationSession {
  id: string;
  messages: EnhancedChatMessage[];
  startTime: Date;
  lastActivity: Date;
  messageCount: number;
  preferences: ChatPreferences;
  state: ChatState;
  metrics: {
    totalRenderTime: number;
    averageResponseTime: number;
    markdownUsage: number;
    errorCount: number;
    cacheHitRate: number;
  };
}

export interface PersistenceConfig {
  enableLocalStorage: boolean;
  enableSessionStorage: boolean;
  enableIndexedDB: boolean;
  maxStorageSize: number; // MB
  sessionTimeout: number; // minutes
  autoCleanup: boolean;
  encryptData: boolean;
}

const defaultPersistenceConfig: PersistenceConfig = {
  enableLocalStorage: true,
  enableSessionStorage: true,
  enableIndexedDB: false,
  maxStorageSize: 50, // 50MB
  sessionTimeout: 60, // 1 hour
  autoCleanup: true,
  encryptData: false
};

export class ChatPersistenceService {
  private static instance: ChatPersistenceService;
  private config: PersistenceConfig;
  private storageKeys = {
    preferences: 'enhanced_chat_preferences',
    state: 'enhanced_chat_state',
    sessions: 'enhanced_chat_sessions',
    metrics: 'enhanced_chat_metrics',
    backups: 'enhanced_chat_backups'
  };

  private constructor(config: Partial<PersistenceConfig> = {}) {
    this.config = { ...defaultPersistenceConfig, ...config };
    this.initializeStorage();
  }

  public static getInstance(config?: Partial<PersistenceConfig>): ChatPersistenceService {
    if (!ChatPersistenceService.instance) {
      ChatPersistenceService.instance = new ChatPersistenceService(config);
    }
    return ChatPersistenceService.instance;
  }

  private initializeStorage(): void {
    if (typeof window === 'undefined') return;

    // Check storage availability
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
    } catch (error) {
      console.warn('localStorage not available, disabling persistence');
      this.config.enableLocalStorage = false;
    }

    // Setup auto-cleanup if enabled
    if (this.config.autoCleanup) {
      this.scheduleCleanup();
    }
  }

  private scheduleCleanup(): void {
    // Clean up expired sessions every hour
    setInterval(() => {
      this.cleanupExpiredSessions();
    }, 60 * 60 * 1000);

    // Initial cleanup
    setTimeout(() => {
      this.cleanupExpiredSessions();
    }, 1000);
  }

  private isStorageAvailable(): boolean {
    return typeof window !== 'undefined' && this.config.enableLocalStorage;
  }

  private encryptData(data: string): string {
    if (!this.config.encryptData) return data;
    
    // Simple base64 encoding (in production, use proper encryption)
    try {
      return btoa(data);
    } catch (error) {
      console.warn('Encryption failed, storing unencrypted');
      return data;
    }
  }

  private decryptData(data: string): string {
    if (!this.config.encryptData) return data;
    
    try {
      return atob(data);
    } catch (error) {
      console.warn('Decryption failed, returning raw data');
      return data;
    }
  }

  private setItem(key: string, value: any): boolean {
    if (!this.isStorageAvailable()) return false;

    try {
      const serialized = JSON.stringify(value);
      const encrypted = this.encryptData(serialized);
      localStorage.setItem(key, encrypted);
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }

  private getItem<T>(key: string): T | null {
    if (!this.isStorageAvailable()) return null;

    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      const decrypted = this.decryptData(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return null;
    }
  }

  private removeItem(key: string): boolean {
    if (!this.isStorageAvailable()) return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
      return false;
    }
  }

  // Preferences persistence
  public savePreferences(preferences: ChatPreferences): boolean {
    return this.setItem(this.storageKeys.preferences, {
      ...preferences,
      lastUpdated: new Date().toISOString()
    });
  }

  public loadPreferences(): ChatPreferences | null {
    const data = this.getItem<any>(this.storageKeys.preferences);
    if (!data) return null;

    // Remove metadata
    const { lastUpdated, ...preferences } = data;
    return preferences;
  }

  // Chat state persistence
  public saveChatState(state: ChatState): boolean {
    return this.setItem(this.storageKeys.state, {
      ...state,
      lastActivity: new Date().toISOString()
    });
  }

  public loadChatState(): ChatState | null {
    const data = this.getItem<any>(this.storageKeys.state);
    if (!data) return null;

    return {
      ...data,
      lastActivity: new Date(data.lastActivity)
    };
  }

  // Session persistence
  public saveSession(session: ConversationSession): boolean {
    const sessions = this.loadAllSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }

    // Limit number of sessions
    const maxSessions = 50;
    if (sessions.length > maxSessions) {
      sessions.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
      sessions.splice(maxSessions);
    }

    return this.setItem(this.storageKeys.sessions, sessions);
  }

  public loadSession(sessionId: string): ConversationSession | null {
    const sessions = this.loadAllSessions();
    const session = sessions.find(s => s.id === sessionId);
    
    if (session) {
      // Update last activity
      session.lastActivity = new Date();
      this.saveSession(session);
    }
    
    return session || null;
  }

  public loadAllSessions(): ConversationSession[] {
    const data = this.getItem<any[]>(this.storageKeys.sessions);
    if (!data) return [];

    return data.map(session => ({
      ...session,
      startTime: new Date(session.startTime),
      lastActivity: new Date(session.lastActivity),
      messages: session.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }));
  }

  public deleteSession(sessionId: string): boolean {
    const sessions = this.loadAllSessions();
    const filteredSessions = sessions.filter(s => s.id !== sessionId);
    
    if (filteredSessions.length === sessions.length) {
      return false; // Session not found
    }

    return this.setItem(this.storageKeys.sessions, filteredSessions);
  }

  // Metrics persistence
  public saveMetrics(sessionId: string, metrics: any): boolean {
    const allMetrics = this.getItem<Record<string, any>>(this.storageKeys.metrics) || {};
    allMetrics[sessionId] = {
      ...metrics,
      timestamp: new Date().toISOString()
    };

    return this.setItem(this.storageKeys.metrics, allMetrics);
  }

  public loadMetrics(sessionId?: string): any {
    const allMetrics = this.getItem<Record<string, any>>(this.storageKeys.metrics) || {};
    
    if (sessionId) {
      return allMetrics[sessionId] || null;
    }

    return allMetrics;
  }

  public getAggregatedMetrics(): any {
    const allMetrics = this.loadMetrics();
    const sessions = Object.values(allMetrics);
    
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        totalMessages: 0,
        averageSessionLength: 0,
        totalRenderTime: 0,
        averageResponseTime: 0,
        markdownUsage: 0,
        errorRate: 0,
        cacheHitRate: 0
      };
    }

    const totals = sessions.reduce((acc: any, session: any) => {
      acc.totalMessages += session.messageCount || 0;
      acc.totalRenderTime += session.totalRenderTime || 0;
      acc.totalResponseTime += session.averageResponseTime || 0;
      acc.markdownUsage += session.markdownUsage || 0;
      acc.errorCount += session.errorCount || 0;
      acc.cacheHits += session.cacheHitRate || 0;
      return acc;
    }, {
      totalMessages: 0,
      totalRenderTime: 0,
      totalResponseTime: 0,
      markdownUsage: 0,
      errorCount: 0,
      cacheHits: 0
    });

    return {
      totalSessions: sessions.length,
      totalMessages: totals.totalMessages,
      averageSessionLength: totals.totalMessages / sessions.length,
      totalRenderTime: totals.totalRenderTime,
      averageResponseTime: totals.totalResponseTime / sessions.length,
      markdownUsage: totals.markdownUsage / sessions.length,
      errorRate: totals.errorCount / totals.totalMessages,
      cacheHitRate: totals.cacheHits / sessions.length
    };
  }

  // Backup and restore
  public createBackup(): string | null {
    try {
      const backup = {
        version: '2.0',
        type: 'enhanced_chat_backup',
        timestamp: new Date().toISOString(),
        preferences: this.loadPreferences(),
        state: this.loadChatState(),
        sessions: this.loadAllSessions(),
        metrics: this.loadMetrics(),
        config: this.config
      };

      const backupString = JSON.stringify(backup, null, 2);
      
      // Save backup to storage
      const backupKey = `backup_${Date.now()}`;
      this.setItem(`${this.storageKeys.backups}_${backupKey}`, backup);
      
      return backupString;
    } catch (error) {
      console.error('Failed to create backup:', error);
      return null;
    }
  }

  public restoreBackup(backupData: string): boolean {
    try {
      const backup = JSON.parse(backupData);
      
      if (backup.type !== 'enhanced_chat_backup') {
        throw new Error('Invalid backup format');
      }

      // Restore preferences
      if (backup.preferences) {
        this.savePreferences(backup.preferences);
      }

      // Restore state
      if (backup.state) {
        this.saveChatState(backup.state);
      }

      // Restore sessions
      if (backup.sessions && Array.isArray(backup.sessions)) {
        backup.sessions.forEach((session: ConversationSession) => {
          this.saveSession(session);
        });
      }

      // Restore metrics
      if (backup.metrics) {
        this.setItem(this.storageKeys.metrics, backup.metrics);
      }

      return true;
    } catch (error) {
      console.error('Failed to restore backup:', error);
      return false;
    }
  }

  public listBackups(): Array<{ key: string; date: Date; size: number }> {
    if (!this.isStorageAvailable()) return [];

    const backups = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${this.storageKeys.backups}_backup_`)) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const backup = JSON.parse(this.decryptData(data));
            backups.push({
              key,
              date: new Date(backup.timestamp),
              size: data.length
            });
          }
        } catch (error) {
          console.error('Failed to read backup:', error);
        }
      }
    }

    return backups.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  public deleteBackup(backupKey: string): boolean {
    return this.removeItem(backupKey);
  }

  // Cleanup operations
  public cleanupExpiredSessions(): number {
    const sessions = this.loadAllSessions();
    const now = new Date();
    const timeoutMs = this.config.sessionTimeout * 60 * 1000;
    
    const activeSessions = sessions.filter(session => {
      const timeSinceActivity = now.getTime() - session.lastActivity.getTime();
      return timeSinceActivity < timeoutMs;
    });

    const removedCount = sessions.length - activeSessions.length;
    
    if (removedCount > 0) {
      this.setItem(this.storageKeys.sessions, activeSessions);
      console.log(`Cleaned up ${removedCount} expired sessions`);
    }

    return removedCount;
  }

  public getStorageUsage(): { used: number; available: number; percentage: number } {
    if (!this.isStorageAvailable()) {
      return { used: 0, available: 0, percentage: 0 };
    }

    let used = 0;
    
    // Calculate used storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('enhanced_chat_')) {
        const value = localStorage.getItem(key);
        if (value) {
          used += key.length + value.length;
        }
      }
    }

    // Convert to MB
    const usedMB = used / (1024 * 1024);
    const availableMB = this.config.maxStorageSize;
    const percentage = (usedMB / availableMB) * 100;

    return {
      used: usedMB,
      available: availableMB,
      percentage: Math.min(percentage, 100)
    };
  }

  public clearAllData(): boolean {
    if (!this.isStorageAvailable()) return false;

    try {
      const keysToRemove = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('enhanced_chat_')) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      console.log(`Cleared ${keysToRemove.length} chat data items`);
      return true;
    } catch (error) {
      console.error('Failed to clear chat data:', error);
      return false;
    }
  }

  // Configuration
  public updateConfig(newConfig: Partial<PersistenceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): PersistenceConfig {
    return { ...this.config };
  }
}

// React hook for using persistence service
export function useChatPersistence(config?: Partial<PersistenceConfig>) {
  const [service] = React.useState(() => ChatPersistenceService.getInstance(config));

  const savePreferences = React.useCallback((preferences: ChatPreferences) => {
    return service.savePreferences(preferences);
  }, [service]);

  const loadPreferences = React.useCallback(() => {
    return service.loadPreferences();
  }, [service]);

  const saveChatState = React.useCallback((state: ChatState) => {
    return service.saveChatState(state);
  }, [service]);

  const loadChatState = React.useCallback(() => {
    return service.loadChatState();
  }, [service]);

  const saveSession = React.useCallback((session: ConversationSession) => {
    return service.saveSession(session);
  }, [service]);

  const loadSession = React.useCallback((sessionId: string) => {
    return service.loadSession(sessionId);
  }, [service]);

  const createBackup = React.useCallback(() => {
    return service.createBackup();
  }, [service]);

  const restoreBackup = React.useCallback((backupData: string) => {
    return service.restoreBackup(backupData);
  }, [service]);

  const getStorageUsage = React.useCallback(() => {
    return service.getStorageUsage();
  }, [service]);

  const clearAllData = React.useCallback(() => {
    return service.clearAllData();
  }, [service]);

  return {
    savePreferences,
    loadPreferences,
    saveChatState,
    loadChatState,
    saveSession,
    loadSession,
    createBackup,
    restoreBackup,
    getStorageUsage,
    clearAllData,
    service
  };
}

// Import React for the hook
import React from 'react';

export type { PersistenceConfig, ConversationSession, ChatState };