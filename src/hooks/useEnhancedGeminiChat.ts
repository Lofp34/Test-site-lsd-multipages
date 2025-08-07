'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, GeminiConfig, UploadedFile, ChatError, ChatErrorType } from '@/lib/gemini/types';
import { GeminiService } from '@/lib/gemini/service';
import { chatErrorHandler, ErrorContext } from '@/lib/gemini/error-handler';
import { chatErrorRecoveryService } from '@/lib/gemini/error-recovery';
import { useChatAnalytics } from '@/lib/gemini/analytics-service';
import { useChatCache } from '@/lib/gemini/cache-service';
import { useChatMemoryManager } from '@/lib/gemini/memory-manager';

interface UseEnhancedGeminiChatConfig {
  apiKey: string;
  systemInstruction: string;
  config?: Partial<GeminiConfig>;
  conversationId?: string;
  // Enhanced configuration options
  markdownEnabled?: boolean;
  autoScrollEnabled?: boolean;
  keyboardShortcutsEnabled?: boolean;
  persistenceEnabled?: boolean;
  analyticsEnabled?: boolean;
}

interface EnhancedChatMessage extends ChatMessage {
  // Enhanced metadata for markdown rendering
  isMarkdown?: boolean;
  renderingState?: 'pending' | 'rendering' | 'complete' | 'error';
  metadata?: {
    hasCode?: boolean;
    hasTables?: boolean;
    hasLinks?: boolean;
    renderTime?: number;
    cached?: boolean;
    [key: string]: any;
  };
}

interface UseEnhancedGeminiChatState {
  messages: EnhancedChatMessage[];
  isStreaming: boolean;
  streamingMessage: string;
  error: ChatError | null;
  isInitialized: boolean;
  isLoading: boolean;
  uploadProgress: Record<string, number>;
  // Enhanced state
  markdownEnabled: boolean;
  autoScrollEnabled: boolean;
  keyboardShortcutsEnabled: boolean;
  conversationMetrics: {
    totalMessages: number;
    averageResponseTime: number;
    markdownUsage: number;
    errorCount: number;
  };
}

interface UseEnhancedGeminiChatReturn {
  messages: EnhancedChatMessage[];
  isStreaming: boolean;
  streamingMessage: string;
  error: ChatError | null;
  isInitialized: boolean;
  isLoading: boolean;
  uploadProgress: Record<string, number>;
  sendMessage: (message: string, files?: File[]) => Promise<void>;
  uploadFile: (file: File) => Promise<UploadedFile>;
  clearError: () => void;
  clearMessages: () => void;
  startNewConversation: () => Promise<string>;
  getConversationHistory: () => Promise<EnhancedChatMessage[]>;
  getUsageStats: () => any;
  retryLastOperation: () => Promise<void>;
  isRecovering: boolean;
  recoveryAction: any;
  // Enhanced methods
  toggleMarkdown: () => void;
  toggleAutoScroll: () => void;
  toggleKeyboardShortcuts: () => void;
  getConversationMetrics: () => any;
  exportConversation: () => string;
  importConversation: (data: string) => Promise<boolean>;
}

export function useEnhancedGeminiChat({
  apiKey,
  systemInstruction,
  config,
  conversationId,
  markdownEnabled = true,
  autoScrollEnabled = true,
  keyboardShortcutsEnabled = true,
  persistenceEnabled = true,
  analyticsEnabled = true
}: UseEnhancedGeminiChatConfig): UseEnhancedGeminiChatReturn {
  const [state, setState] = useState<UseEnhancedGeminiChatState>({
    messages: [],
    isStreaming: false,
    streamingMessage: '',
    error: null,
    isInitialized: false,
    isLoading: false,
    uploadProgress: {},
    markdownEnabled,
    autoScrollEnabled,
    keyboardShortcutsEnabled,
    conversationMetrics: {
      totalMessages: 0,
      averageResponseTime: 0,
      markdownUsage: 0,
      errorCount: 0
    }
  });

  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryAction, setRecoveryAction] = useState<any>(null);
  const [lastOperation, setLastOperation] = useState<{
    type: 'send_message' | 'upload_file' | 'initialize_chat';
    params: any;
  } | null>(null);

  const geminiServiceRef = useRef<GeminiService | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionIdRef = useRef<string>(`enhanced_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const responseTimesRef = useRef<number[]>([]);
  
  const analytics = useChatAnalytics();
  const cache = useChatCache();
  const memoryManager = useChatMemoryManager();

  // Enhanced system instruction with markdown support
  const enhancedSystemInstruction = `${systemInstruction}

${markdownEnabled ? `
IMPORTANT: Format your responses using Markdown for better readability:
- Use **bold** for important points
- Use *italic* for emphasis
- Use bullet points for lists
- Use code blocks for examples
- Use tables for comparisons
- Use headers for structure
` : ''}`;

  // Initialize service with enhanced configuration
  useEffect(() => {
    if (!apiKey) {
      setState(prev => ({
        ...prev,
        error: {
          type: ChatErrorType.API_UNAVAILABLE,
          message: 'API key missing',
          userMessage: 'Clé API Gemini manquante',
          retryable: false
        },
        isInitialized: false
      }));
      return;
    }

    const initializeService = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      
      if (analyticsEnabled) {
        analytics.startSession(sessionIdRef.current, conversationId);
      }
      
      try {
        const geminiConfig: GeminiConfig = {
          model: 'gemini-2.5-flash',
          temperature: 0.7,
          thinkingBudget: 0,
          systemInstruction: enhancedSystemInstruction,
          maxTokens: 2048,
          ...config
        };

        geminiServiceRef.current = new GeminiService(apiKey, geminiConfig, conversationId);
        await geminiServiceRef.current.initializeChat();
        
        // Load existing history with enhanced metadata
        const history = await geminiServiceRef.current.getConversationHistory();
        const enhancedHistory = history.map(msg => enhanceMessage(msg));
        
        setState(prev => ({
          ...prev,
          messages: enhancedHistory,
          isInitialized: true,
          isLoading: false,
          error: null,
          conversationMetrics: {
            ...prev.conversationMetrics,
            totalMessages: enhancedHistory.length
          }
        }));

        setLastOperation({
          type: 'initialize_chat',
          params: { apiKey, systemInstruction, config, conversationId }
        });

        chatErrorHandler.resetRetryCount(sessionIdRef.current, 'initialize_chat');
        
      } catch (error) {
        console.error('Erreur lors de l\'initialisation du service Gemini:', error);
        
        const errorContext: ErrorContext = {
          sessionId: sessionIdRef.current,
          operation: 'initialize_chat',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          timestamp: new Date(),
          retryCount: chatErrorHandler.getRetryCount(sessionIdRef.current, 'initialize_chat')
        };

        handleError(error, errorContext);
      }
    };

    initializeService();
  }, [apiKey, enhancedSystemInstruction, config, conversationId, analyticsEnabled]);

  // Enhance message with markdown metadata
  const enhanceMessage = useCallback((message: ChatMessage): EnhancedChatMessage => {
    const enhanced: EnhancedChatMessage = {
      ...message,
      isMarkdown: state.markdownEnabled && message.role === 'assistant',
      renderingState: 'complete',
      metadata: {
        hasCode: /```/.test(message.content),
        hasTables: /\|.*\|/.test(message.content),
        hasLinks: /\[.*\]\(.*\)/.test(message.content),
        renderTime: 0,
        ...message.metadata
      }
    };

    return enhanced;
  }, [state.markdownEnabled]);

  // Enhanced error handling
  const handleError = useCallback(async (error: unknown, context: ErrorContext) => {
    setIsRecovering(true);
    
    try {
      const { chatError, recoveryAction: action, shouldRetry } = await chatErrorHandler.handleError(error, context);
      
      setState(prev => ({
        ...prev,
        error: chatError,
        isLoading: false,
        isStreaming: false,
        conversationMetrics: {
          ...prev.conversationMetrics,
          errorCount: prev.conversationMetrics.errorCount + 1
        }
      }));

      setRecoveryAction(action);

      if (shouldRetry && action.type === 'retry') {
        const recoveryResult = await chatErrorRecoveryService.executeRecovery(chatError, context);
        
        if (recoveryResult.success) {
          setTimeout(() => {
            retryLastOperation();
          }, action.delay || 1000);
        } else if (recoveryResult.fallbackUsed) {
          setState(prev => ({
            ...prev,
            error: null,
            streamingMessage: recoveryResult.message || '',
            isStreaming: false
          }));
        }
      }
    } finally {
      setIsRecovering(false);
    }
  }, []);

  // Enhanced file upload with progress tracking
  const uploadFile = useCallback(async (file: File): Promise<UploadedFile> => {
    if (!geminiServiceRef.current) {
      throw new Error('Service Gemini non initialisé');
    }

    const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      setState(prev => ({
        ...prev,
        uploadProgress: { ...prev.uploadProgress, [fileId]: 0 }
      }));

      const progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          uploadProgress: {
            ...prev.uploadProgress,
            [fileId]: Math.min((prev.uploadProgress[fileId] || 0) + 10, 90)
          }
        }));
      }, 100);

      const startTime = Date.now();
      const uploadedFile = await geminiServiceRef.current.uploadFile(file);
      const uploadTime = Date.now() - startTime;
      
      clearInterval(progressInterval);
      
      setState(prev => ({
        ...prev,
        uploadProgress: { ...prev.uploadProgress, [fileId]: 100 }
      }));

      if (analyticsEnabled) {
        analytics.trackPerformance(
          sessionIdRef.current,
          'file_upload_time',
          uploadTime,
          'ms',
          {
            fileSize: file.size,
            fileType: file.type,
            fileName: file.name
          }
        );
      }

      setTimeout(() => {
        setState(prev => {
          const newProgress = { ...prev.uploadProgress };
          delete newProgress[fileId];
          return { ...prev, uploadProgress: newProgress };
        });
      }, 2000);

      return uploadedFile;
    } catch (error) {
      setState(prev => {
        const newProgress = { ...prev.uploadProgress };
        delete newProgress[fileId];
        return { ...prev, uploadProgress: newProgress };
      });

      const errorContext: ErrorContext = {
        sessionId: sessionIdRef.current,
        operation: 'upload_file',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        timestamp: new Date(),
        retryCount: chatErrorHandler.getRetryCount(sessionIdRef.current, 'upload_file')
      };

      await handleError(error, errorContext);
      throw error;
    }
  }, [analyticsEnabled]);

  // Enhanced message sending with markdown support
  const sendMessage = useCallback(async (message: string, files?: File[]) => {
    if (!geminiServiceRef.current) {
      const errorContext: ErrorContext = {
        sessionId: sessionIdRef.current,
        operation: 'send_message',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        timestamp: new Date(),
        retryCount: 0
      };

      await handleError(new Error('Service not initialized'), errorContext);
      return;
    }

    if (!message.trim() && (!files || files.length === 0)) {
      return;
    }

    setLastOperation({
      type: 'send_message',
      params: { message, files }
    });

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      isStreaming: true,
      streamingMessage: '',
      error: null,
      isLoading: true
    }));

    const startTime = Date.now();
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      // Check cache for text-only messages
      if (!files || files.length === 0) {
        const cachedResponse = cache.get(message);
        if (cachedResponse) {
          const userMessage = enhanceMessage({
            id: messageId,
            role: 'user' as const,
            content: message,
            timestamp: new Date()
          });

          const assistantMessage = enhanceMessage({
            id: `msg_${Date.now()}_cached`,
            role: 'assistant' as const,
            content: cachedResponse,
            timestamp: new Date(),
            metadata: { cached: true }
          });

          const updatedMessages = [...state.messages, userMessage, assistantMessage];

          setState(prev => ({
            ...prev,
            messages: updatedMessages,
            isStreaming: false,
            streamingMessage: '',
            isLoading: false,
            error: null,
            conversationMetrics: {
              ...prev.conversationMetrics,
              totalMessages: updatedMessages.length
            }
          }));

          if (analyticsEnabled) {
            analytics.trackMessage(sessionIdRef.current, messageId, 'user', message.length);
            analytics.trackMessage(sessionIdRef.current, `${messageId}_cached`, 'assistant', cachedResponse.length, {
              processingTime: 50,
              cached: true
            });
          }

          return;
        }
      }

      // Upload files if necessary
      let uploadedFiles: UploadedFile[] | undefined;
      if (files && files.length > 0) {
        uploadedFiles = await Promise.all(files.map(file => uploadFile(file)));
      }

      if (analyticsEnabled) {
        analytics.trackMessage(
          sessionIdRef.current,
          messageId,
          'user',
          message.length,
          {
            hasFiles: !!(files && files.length > 0),
            fileTypes: files?.map(f => f.type)
          }
        );
      }

      // Stream response
      const stream = await geminiServiceRef.current.sendMessageStream(message, uploadedFiles);

      let assistantContent = '';
      let chunkCount = 0;

      for await (const chunk of stream) {
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }

        assistantContent += chunk;
        chunkCount++;
        
        setState(prev => ({
          ...prev,
          streamingMessage: assistantContent,
          isLoading: false
        }));

        if (chunkCount === 1 && analyticsEnabled) {
          const firstChunkTime = Date.now() - startTime;
          analytics.trackPerformance(
            sessionIdRef.current,
            'streaming_latency',
            firstChunkTime,
            'ms'
          );
        }
      }

      const totalTime = Date.now() - startTime;
      responseTimesRef.current.push(totalTime);

      // Get updated history
      const updatedHistory = await geminiServiceRef.current.getConversationHistory();
      const enhancedHistory = updatedHistory.map(msg => enhanceMessage(msg));

      // Optimize memory if necessary
      const { optimizedMessages } = memoryManager.optimizeConversation(
        sessionIdRef.current,
        enhancedHistory
      );

      // Cache response for text-only messages
      if (!files || files.length === 0) {
        cache.set(message, assistantContent, undefined, {
          tokens: assistantContent.length,
          confidence: 0.8,
          source: 'gemini'
        });
      }

      // Calculate metrics
      const averageResponseTime = responseTimesRef.current.reduce((a, b) => a + b, 0) / responseTimesRef.current.length;
      const markdownUsage = enhancedHistory.filter(msg => msg.isMarkdown).length / enhancedHistory.length;

      setState(prev => ({
        ...prev,
        messages: optimizedMessages,
        isStreaming: false,
        streamingMessage: '',
        isLoading: false,
        error: null,
        conversationMetrics: {
          totalMessages: optimizedMessages.length,
          averageResponseTime,
          markdownUsage,
          errorCount: prev.conversationMetrics.errorCount
        }
      }));

      if (analyticsEnabled) {
        const assistantMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        analytics.trackMessage(
          sessionIdRef.current,
          assistantMessageId,
          'assistant',
          assistantContent.length,
          {
            processingTime: totalTime,
            tokenCount: assistantContent.length,
            hasMarkdown: /[*_`#\[\]|]/.test(assistantContent)
          }
        );

        analytics.trackPerformance(
          sessionIdRef.current,
          'response_time',
          totalTime,
          'ms',
          {
            messageLength: message.length,
            responseLength: assistantContent.length,
            hasFiles: !!(files && files.length > 0)
          }
        );
      }

      chatErrorHandler.resetRetryCount(sessionIdRef.current, 'send_message');

    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      const errorContext: ErrorContext = {
        sessionId: sessionIdRef.current,
        messageId,
        operation: 'send_message',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        timestamp: new Date(),
        retryCount: chatErrorHandler.getRetryCount(sessionIdRef.current, 'send_message')
      };

      await handleError(error, errorContext);
    }
  }, [uploadFile, handleError, enhanceMessage, analyticsEnabled]);

  // Enhanced conversation management
  const startNewConversation = useCallback(async (): Promise<string> => {
    if (!geminiServiceRef.current) {
      throw new Error('Service Gemini non initialisé');
    }

    try {
      const newConversationId = await geminiServiceRef.current.startNewConversation();
      
      setState(prev => ({
        ...prev,
        messages: [],
        streamingMessage: '',
        error: null,
        conversationMetrics: {
          totalMessages: 0,
          averageResponseTime: 0,
          markdownUsage: 0,
          errorCount: 0
        }
      }));

      responseTimesRef.current = [];

      return newConversationId;
    } catch (error) {
      console.error('Erreur lors du démarrage d\'une nouvelle conversation:', error);
      throw error;
    }
  }, []);

  const getConversationHistory = useCallback(async (): Promise<EnhancedChatMessage[]> => {
    if (!geminiServiceRef.current) {
      return [];
    }

    try {
      const history = await geminiServiceRef.current.getConversationHistory();
      return history.map(msg => enhanceMessage(msg));
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      return [];
    }
  }, [enhanceMessage]);

  // Enhanced feature toggles
  const toggleMarkdown = useCallback(() => {
    setState(prev => ({
      ...prev,
      markdownEnabled: !prev.markdownEnabled
    }));
  }, []);

  const toggleAutoScroll = useCallback(() => {
    setState(prev => ({
      ...prev,
      autoScrollEnabled: !prev.autoScrollEnabled
    }));
  }, []);

  const toggleKeyboardShortcuts = useCallback(() => {
    setState(prev => ({
      ...prev,
      keyboardShortcutsEnabled: !prev.keyboardShortcutsEnabled
    }));
  }, []);

  // Enhanced metrics
  const getConversationMetrics = useCallback(() => {
    return {
      ...state.conversationMetrics,
      sessionId: sessionIdRef.current,
      conversationId,
      features: {
        markdownEnabled: state.markdownEnabled,
        autoScrollEnabled: state.autoScrollEnabled,
        keyboardShortcutsEnabled: state.keyboardShortcutsEnabled
      }
    };
  }, [state.conversationMetrics, state.markdownEnabled, state.autoScrollEnabled, state.keyboardShortcutsEnabled, conversationId]);

  // Enhanced export/import
  const exportConversation = useCallback(() => {
    try {
      const exportData = {
        version: '2.0',
        type: 'enhanced_conversation',
        conversationId,
        sessionId: sessionIdRef.current,
        messages: state.messages,
        metrics: state.conversationMetrics,
        settings: {
          markdownEnabled: state.markdownEnabled,
          autoScrollEnabled: state.autoScrollEnabled,
          keyboardShortcutsEnabled: state.keyboardShortcutsEnabled
        },
        exportDate: new Date().toISOString()
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      return '';
    }
  }, [conversationId, state]);

  const importConversation = useCallback(async (data: string): Promise<boolean> => {
    try {
      const importData = JSON.parse(data);
      
      if (importData.type !== 'enhanced_conversation' || !importData.messages) {
        throw new Error('Format de données invalide');
      }

      const enhancedMessages = importData.messages.map((msg: any) => enhanceMessage(msg));

      setState(prev => ({
        ...prev,
        messages: enhancedMessages,
        conversationMetrics: importData.metrics || prev.conversationMetrics,
        markdownEnabled: importData.settings?.markdownEnabled ?? prev.markdownEnabled,
        autoScrollEnabled: importData.settings?.autoScrollEnabled ?? prev.autoScrollEnabled,
        keyboardShortcutsEnabled: importData.settings?.keyboardShortcutsEnabled ?? prev.keyboardShortcutsEnabled
      }));

      return true;
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      return false;
    }
  }, [enhanceMessage]);

  // Standard methods
  const getUsageStats = useCallback(() => {
    if (!geminiServiceRef.current) {
      return null;
    }
    return geminiServiceRef.current.getUsageStats();
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const clearMessages = useCallback(async () => {
    if (geminiServiceRef.current) {
      try {
        await geminiServiceRef.current.clearConversation();
        setState(prev => ({
          ...prev,
          messages: [],
          streamingMessage: '',
          error: null,
          conversationMetrics: {
            totalMessages: 0,
            averageResponseTime: 0,
            markdownUsage: 0,
            errorCount: 0
          }
        }));
        responseTimesRef.current = [];
      } catch (error) {
        console.error('Erreur lors de l\'effacement des messages:', error);
      }
    }
  }, []);

  const retryLastOperation = useCallback(async () => {
    if (!lastOperation) {
      console.warn('Aucune opération à réessayer');
      return;
    }

    setState(prev => ({ ...prev, error: null }));

    try {
      switch (lastOperation.type) {
        case 'send_message':
          await sendMessage(lastOperation.params.message, lastOperation.params.files);
          break;
        case 'upload_file':
          await uploadFile(lastOperation.params.file);
          break;
        case 'initialize_chat':
          const { apiKey, systemInstruction, config, conversationId } = lastOperation.params;
          const geminiConfig: GeminiConfig = {
            model: 'gemini-2.5-flash',
            temperature: 0.7,
            thinkingBudget: 0,
            systemInstruction: enhancedSystemInstruction,
            maxTokens: 2048,
            ...config
          };
          geminiServiceRef.current = new GeminiService(apiKey, geminiConfig, conversationId);
          await geminiServiceRef.current.initializeChat();
          
          const history = await geminiServiceRef.current.getConversationHistory();
          const enhancedHistory = history.map(msg => enhanceMessage(msg));
          
          setState(prev => ({
            ...prev,
            messages: enhancedHistory,
            isInitialized: true,
            isLoading: false,
            error: null
          }));
          break;
        default:
          console.warn('Type d\'opération inconnu:', lastOperation.type);
      }
    } catch (error) {
      console.error('Erreur lors du retry:', error);
    }
  }, [lastOperation, sendMessage, uploadFile, enhancedSystemInstruction, enhanceMessage]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      if (analyticsEnabled) {
        analytics.endSession(sessionIdRef.current);
      }
    };
  }, [analytics, analyticsEnabled]);

  return {
    messages: state.messages,
    isStreaming: state.isStreaming,
    streamingMessage: state.streamingMessage,
    error: state.error,
    isInitialized: state.isInitialized,
    isLoading: state.isLoading,
    uploadProgress: state.uploadProgress,
    sendMessage,
    uploadFile,
    clearError,
    clearMessages,
    startNewConversation,
    getConversationHistory,
    getUsageStats,
    retryLastOperation,
    isRecovering,
    recoveryAction,
    // Enhanced methods
    toggleMarkdown,
    toggleAutoScroll,
    toggleKeyboardShortcuts,
    getConversationMetrics,
    exportConversation,
    importConversation
  };
}

export type { UseEnhancedGeminiChatConfig, EnhancedChatMessage, UseEnhancedGeminiChatReturn };