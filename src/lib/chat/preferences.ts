/**
 * Chat Preferences Management System
 * Handles user preferences for the enhanced chat interface
 */

export interface ChatPreferences {
  // Core features
  markdownEnabled: boolean;
  autoScrollEnabled: boolean;
  keyboardShortcutsEnabled: boolean;
  
  // Appearance
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  
  // Behavior
  saveToLocalStorage: boolean;
  sessionTimeout: number; // minutes
  confirmCloseOnStreaming: boolean;
  
  // Accessibility
  highContrastMode: boolean;
  screenReaderOptimized: boolean;
  announceNewMessages: boolean;
  
  // Performance
  enableCaching: boolean;
  enableAnalytics: boolean;
  maxHistorySize: number;
  
  // Privacy
  allowCookies: boolean;
  shareUsageData: boolean;
  retainConversations: boolean;
}

export interface ScrollConfig {
  bottomThreshold: number; // pixels from bottom to consider "at bottom"
  autoScrollDelay: number; // ms before suggesting return to bottom
  smoothScrollDuration: number; // ms for smooth scroll animations
}

export interface MarkdownConfig {
  enableSyntaxHighlighting: boolean;
  enableTables: boolean;
  enableLinks: boolean;
  customComponents?: Record<string, React.ComponentType>;
}

export interface KeyboardShortcuts {
  close: string; // 'Escape'
  minimize: string; // 'Ctrl+M'
  fullscreen: string; // 'F11'
  scrollToTop: string; // 'Ctrl+Home'
  scrollToBottom: string; // 'Ctrl+End'
  newConversation: string; // 'Ctrl+N'
  exportConversation: string; // 'Ctrl+E'
  toggleMarkdown: string; // 'Ctrl+Shift+M'
}

export const defaultPreferences: ChatPreferences = {
  // Core features
  markdownEnabled: true,
  autoScrollEnabled: true,
  keyboardShortcutsEnabled: true,
  
  // Appearance
  theme: 'auto',
  fontSize: 'medium',
  reducedMotion: false,
  
  // Behavior
  saveToLocalStorage: true,
  sessionTimeout: 60, // 1 hour
  confirmCloseOnStreaming: true,
  
  // Accessibility
  highContrastMode: false,
  screenReaderOptimized: false,
  announceNewMessages: false,
  
  // Performance
  enableCaching: true,
  enableAnalytics: true,
  maxHistorySize: 100,
  
  // Privacy
  allowCookies: true,
  shareUsageData: false,
  retainConversations: true
};

export const defaultScrollConfig: ScrollConfig = {
  bottomThreshold: 50,
  autoScrollDelay: 3000,
  smoothScrollDuration: 300
};

export const defaultMarkdownConfig: MarkdownConfig = {
  enableSyntaxHighlighting: true,
  enableTables: true,
  enableLinks: true
};

export const defaultKeyboardShortcuts: KeyboardShortcuts = {
  close: 'Escape',
  minimize: 'Ctrl+M',
  fullscreen: 'F11',
  scrollToTop: 'Ctrl+Home',
  scrollToBottom: 'Ctrl+End',
  newConversation: 'Ctrl+N',
  exportConversation: 'Ctrl+E',
  toggleMarkdown: 'Ctrl+Shift+M'
};

export class ChatPreferencesManager {
  private static instance: ChatPreferencesManager;
  private preferences: ChatPreferences;
  private listeners: Array<(preferences: ChatPreferences) => void> = [];
  private storageKey = 'enhanced_chat_preferences';

  private constructor() {
    this.preferences = this.loadPreferences();
  }

  public static getInstance(): ChatPreferencesManager {
    if (!ChatPreferencesManager.instance) {
      ChatPreferencesManager.instance = new ChatPreferencesManager();
    }
    return ChatPreferencesManager.instance;
  }

  private loadPreferences(): ChatPreferences {
    if (typeof window === 'undefined') {
      return { ...defaultPreferences };
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all properties exist
        return { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.error('Erreur lors du chargement des préférences:', error);
    }

    return { ...defaultPreferences };
  }

  private savePreferences(): void {
    if (typeof window === 'undefined' || !this.preferences.saveToLocalStorage) {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
    }
  }

  public getPreferences(): ChatPreferences {
    return { ...this.preferences };
  }

  public updatePreferences(updates: Partial<ChatPreferences>): void {
    const oldPreferences = { ...this.preferences };
    this.preferences = { ...this.preferences, ...updates };
    
    // Save to localStorage if enabled
    this.savePreferences();
    
    // Notify listeners
    this.listeners.forEach(listener => {
      try {
        listener(this.preferences);
      } catch (error) {
        console.error('Erreur dans le listener de préférences:', error);
      }
    });

    // Handle special cases
    this.handlePreferenceChanges(oldPreferences, this.preferences);
  }

  private handlePreferenceChanges(
    oldPreferences: ChatPreferences, 
    newPreferences: ChatPreferences
  ): void {
    // Handle localStorage toggle
    if (oldPreferences.saveToLocalStorage !== newPreferences.saveToLocalStorage) {
      if (!newPreferences.saveToLocalStorage) {
        // Clear stored preferences if disabled
        try {
          localStorage.removeItem(this.storageKey);
        } catch (error) {
          console.error('Erreur lors de la suppression des préférences:', error);
        }
      } else {
        // Save current preferences if enabled
        this.savePreferences();
      }
    }

    // Handle theme changes
    if (oldPreferences.theme !== newPreferences.theme) {
      this.applyTheme(newPreferences.theme);
    }

    // Handle accessibility changes
    if (oldPreferences.reducedMotion !== newPreferences.reducedMotion) {
      this.applyReducedMotion(newPreferences.reducedMotion);
    }

    // Handle high contrast mode
    if (oldPreferences.highContrastMode !== newPreferences.highContrastMode) {
      this.applyHighContrastMode(newPreferences.highContrastMode);
    }
  }

  private applyTheme(theme: 'light' | 'dark' | 'auto'): void {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    switch (theme) {
      case 'light':
        root.classList.remove('dark');
        break;
      case 'dark':
        root.classList.add('dark');
        break;
      case 'auto':
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        break;
    }
  }

  private applyReducedMotion(enabled: boolean): void {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    if (enabled) {
      root.style.setProperty('--animation-duration', '0s');
      root.style.setProperty('--transition-duration', '0s');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }
  }

  private applyHighContrastMode(enabled: boolean): void {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    if (enabled) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }

  public subscribe(listener: (preferences: ChatPreferences) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public resetToDefaults(): void {
    this.updatePreferences(defaultPreferences);
  }

  public exportPreferences(): string {
    try {
      const exportData = {
        version: '1.0',
        type: 'chat_preferences',
        preferences: this.preferences,
        exportDate: new Date().toISOString()
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Erreur lors de l\'export des préférences:', error);
      return '';
    }
  }

  public importPreferences(data: string): boolean {
    try {
      const importData = JSON.parse(data);
      
      if (importData.type !== 'chat_preferences' || !importData.preferences) {
        throw new Error('Format de données invalide');
      }

      // Validate preferences structure
      const validPreferences: Partial<ChatPreferences> = {};
      const defaultKeys = Object.keys(defaultPreferences) as Array<keyof ChatPreferences>;
      
      defaultKeys.forEach(key => {
        if (key in importData.preferences) {
          validPreferences[key] = importData.preferences[key];
        }
      });

      this.updatePreferences(validPreferences);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'import des préférences:', error);
      return false;
    }
  }

  public getScrollConfig(): ScrollConfig {
    return {
      bottomThreshold: defaultScrollConfig.bottomThreshold,
      autoScrollDelay: defaultScrollConfig.autoScrollDelay,
      smoothScrollDuration: this.preferences.reducedMotion ? 0 : defaultScrollConfig.smoothScrollDuration
    };
  }

  public getMarkdownConfig(): MarkdownConfig {
    return {
      enableSyntaxHighlighting: this.preferences.markdownEnabled && defaultMarkdownConfig.enableSyntaxHighlighting,
      enableTables: this.preferences.markdownEnabled && defaultMarkdownConfig.enableTables,
      enableLinks: this.preferences.markdownEnabled && defaultMarkdownConfig.enableLinks
    };
  }

  public getKeyboardShortcuts(): KeyboardShortcuts {
    if (!this.preferences.keyboardShortcutsEnabled) {
      // Return empty shortcuts if disabled
      return Object.keys(defaultKeyboardShortcuts).reduce((acc, key) => {
        acc[key as keyof KeyboardShortcuts] = '';
        return acc;
      }, {} as KeyboardShortcuts);
    }
    
    return { ...defaultKeyboardShortcuts };
  }

  public isFeatureEnabled(feature: keyof ChatPreferences): boolean {
    return Boolean(this.preferences[feature]);
  }

  public getAccessibilitySettings() {
    return {
      highContrastMode: this.preferences.highContrastMode,
      screenReaderOptimized: this.preferences.screenReaderOptimized,
      announceNewMessages: this.preferences.announceNewMessages,
      reducedMotion: this.preferences.reducedMotion,
      fontSize: this.preferences.fontSize
    };
  }

  public getPrivacySettings() {
    return {
      allowCookies: this.preferences.allowCookies,
      shareUsageData: this.preferences.shareUsageData,
      retainConversations: this.preferences.retainConversations,
      saveToLocalStorage: this.preferences.saveToLocalStorage
    };
  }

  public getPerformanceSettings() {
    return {
      enableCaching: this.preferences.enableCaching,
      enableAnalytics: this.preferences.enableAnalytics,
      maxHistorySize: this.preferences.maxHistorySize
    };
  }

  // Utility methods for common preference checks
  public shouldShowAnimations(): boolean {
    return !this.preferences.reducedMotion;
  }

  public shouldAutoScroll(): boolean {
    return this.preferences.autoScrollEnabled;
  }

  public shouldRenderMarkdown(): boolean {
    return this.preferences.markdownEnabled;
  }

  public shouldConfirmClose(): boolean {
    return this.preferences.confirmCloseOnStreaming;
  }

  public getSessionTimeout(): number {
    return this.preferences.sessionTimeout * 60 * 1000; // Convert to milliseconds
  }
}

// React hook for using preferences
export function useChatPreferences() {
  const [preferences, setPreferences] = React.useState<ChatPreferences>(() => 
    ChatPreferencesManager.getInstance().getPreferences()
  );

  React.useEffect(() => {
    const manager = ChatPreferencesManager.getInstance();
    const unsubscribe = manager.subscribe(setPreferences);
    
    return unsubscribe;
  }, []);

  const updatePreferences = React.useCallback((updates: Partial<ChatPreferences>) => {
    ChatPreferencesManager.getInstance().updatePreferences(updates);
  }, []);

  const resetPreferences = React.useCallback(() => {
    ChatPreferencesManager.getInstance().resetToDefaults();
  }, []);

  const exportPreferences = React.useCallback(() => {
    return ChatPreferencesManager.getInstance().exportPreferences();
  }, []);

  const importPreferences = React.useCallback((data: string) => {
    return ChatPreferencesManager.getInstance().importPreferences(data);
  }, []);

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    exportPreferences,
    importPreferences,
    // Convenience getters
    scrollConfig: ChatPreferencesManager.getInstance().getScrollConfig(),
    markdownConfig: ChatPreferencesManager.getInstance().getMarkdownConfig(),
    keyboardShortcuts: ChatPreferencesManager.getInstance().getKeyboardShortcuts(),
    accessibilitySettings: ChatPreferencesManager.getInstance().getAccessibilitySettings(),
    privacySettings: ChatPreferencesManager.getInstance().getPrivacySettings(),
    performanceSettings: ChatPreferencesManager.getInstance().getPerformanceSettings()
  };
}

// Import React for the hook
import React from 'react';