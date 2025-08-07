/**
 * Compatibility wrapper for chat hooks
 * Provides backward compatibility while enabling enhanced features
 */

import { useGeminiChat } from './useGeminiChat';
import { useEnhancedGeminiChat } from './useEnhancedGeminiChat';
import { useChatHistory } from './useChatHistory';
import { useEnhancedChatHistory } from './useEnhancedChatHistory';
import { useMultimodalChat } from './useMultimodalChat';
import { useEnhancedMultimodalChat } from './useEnhancedMultimodalChat';

interface CompatibleChatConfig {
  apiKey: string;
  systemInstruction: string;
  config?: any;
  conversationId?: string;
  // Enhanced options
  enhancedMode?: boolean;
  markdownEnabled?: boolean;
  autoScrollEnabled?: boolean;
  keyboardShortcutsEnabled?: boolean;
  persistenceEnabled?: boolean;
  analyticsEnabled?: boolean;
}

/**
 * Unified chat hook that provides backward compatibility
 * while enabling enhanced features when requested
 */
export function useCompatibleChat(config: CompatibleChatConfig) {
  const {
    enhancedMode = false,
    markdownEnabled = false,
    autoScrollEnabled = false,
    keyboardShortcutsEnabled = false,
    persistenceEnabled = true,
    analyticsEnabled = true,
    ...baseConfig
  } = config;

  // Use enhanced hook if enhanced mode is enabled
  if (enhancedMode) {
    return useEnhancedGeminiChat({
      ...baseConfig,
      markdownEnabled,
      autoScrollEnabled,
      keyboardShortcutsEnabled,
      persistenceEnabled,
      analyticsEnabled
    });
  }

  // Use base hook with enhanced features disabled
  return useGeminiChat({
    ...baseConfig,
    enhancedMode: false,
    markdownEnabled,
    autoScrollEnabled
  });
}

/**
 * Unified chat history hook with backward compatibility
 */
export function useCompatibleChatHistory(
  initialConversationId?: string,
  enhancedMode: boolean = false
) {
  if (enhancedMode) {
    return useEnhancedChatHistory(initialConversationId);
  }

  return useChatHistory(initialConversationId, false);
}

/**
 * Unified multimodal chat hook with backward compatibility
 */
export function useCompatibleMultimodalChat(
  apiKey: string,
  onSendMessage?: (message: string, files?: any[]) => Promise<void>,
  enhancedMode: boolean = false
) {
  if (enhancedMode) {
    return useEnhancedMultimodalChat(apiKey, onSendMessage);
  }

  return useMultimodalChat(apiKey, onSendMessage, false);
}

/**
 * Hook to detect if enhanced features are available
 */
export function useEnhancedFeaturesAvailable() {
  return {
    markdownRendering: true,
    scrollControl: true,
    chatControls: true,
    preferences: true,
    analytics: true,
    multimodal: true,
    keyboardShortcuts: true,
    exportImport: true
  };
}

/**
 * Migration helper to upgrade from base to enhanced hooks
 */
export function useChatMigration() {
  const migrateToEnhanced = (existingData: any) => {
    try {
      // Convert existing chat data to enhanced format
      const enhancedData = {
        version: '2.0',
        type: 'enhanced_conversation',
        ...existingData,
        messages: existingData.messages?.map((msg: any) => ({
          ...msg,
          isMarkdown: msg.role === 'assistant',
          renderingState: 'complete',
          metadata: {
            hasCode: /```/.test(msg.content),
            hasTables: /\|.*\|/.test(msg.content),
            hasLinks: /\[.*\]\(.*\)/.test(msg.content),
            renderTime: 0,
            ...msg.metadata
          }
        })) || [],
        settings: {
          markdownEnabled: true,
          autoScrollEnabled: true,
          keyboardShortcutsEnabled: true
        },
        migrationDate: new Date().toISOString()
      };

      return JSON.stringify(enhancedData, null, 2);
    } catch (error) {
      console.error('Erreur lors de la migration:', error);
      return null;
    }
  };

  const checkCompatibility = (data: string) => {
    try {
      const parsed = JSON.parse(data);
      return {
        isEnhanced: parsed.type === 'enhanced_conversation',
        version: parsed.version || '1.0',
        canMigrate: parsed.messages && Array.isArray(parsed.messages)
      };
    } catch (error) {
      return {
        isEnhanced: false,
        version: 'unknown',
        canMigrate: false
      };
    }
  };

  return {
    migrateToEnhanced,
    checkCompatibility
  };
}

/**
 * Feature detection hook
 */
export function useChatFeatureDetection() {
  const detectFeatures = (chatData: any) => {
    const features = {
      hasMarkdown: false,
      hasCodeBlocks: false,
      hasTables: false,
      hasLinks: false,
      hasFiles: false,
      hasLongConversations: false,
      hasFrequentUse: false
    };

    if (chatData.messages) {
      const messages = chatData.messages;
      const assistantMessages = messages.filter((msg: any) => msg.role === 'assistant');
      
      features.hasMarkdown = assistantMessages.some((msg: any) => 
        /[*_`#\[\]|]/.test(msg.content)
      );
      
      features.hasCodeBlocks = assistantMessages.some((msg: any) => 
        /```/.test(msg.content)
      );
      
      features.hasTables = assistantMessages.some((msg: any) => 
        /\|.*\|/.test(msg.content)
      );
      
      features.hasLinks = assistantMessages.some((msg: any) => 
        /\[.*\]\(.*\)/.test(msg.content)
      );
      
      features.hasFiles = messages.some((msg: any) => 
        msg.files && msg.files.length > 0
      );
      
      features.hasLongConversations = messages.length > 20;
      
      // Check if user has multiple conversations or frequent usage
      features.hasFrequentUse = chatData.conversationCount > 5 || 
        messages.length > 50;
    }

    return features;
  };

  const recommendEnhancedMode = (features: any) => {
    const score = Object.values(features).filter(Boolean).length;
    return {
      recommended: score >= 3,
      score,
      reasons: [
        features.hasMarkdown && 'Contenu formaté détecté',
        features.hasCodeBlocks && 'Blocs de code fréquents',
        features.hasTables && 'Tableaux utilisés',
        features.hasFiles && 'Fichiers partagés',
        features.hasLongConversations && 'Conversations longues',
        features.hasFrequentUse && 'Usage fréquent'
      ].filter(Boolean)
    };
  };

  return {
    detectFeatures,
    recommendEnhancedMode
  };
}

export type { CompatibleChatConfig };