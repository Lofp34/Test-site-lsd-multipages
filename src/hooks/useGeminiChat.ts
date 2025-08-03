'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, GeminiConfig, UploadedFile, ChatError, ChatErrorType } from '@/lib/gemini/types';
import { GeminiService } from '@/lib/gemini/service';
import { chatErrorHandler, ErrorContext } from '@/lib/gemini/error-handler';
import { chatErrorRecoveryService } from '@/lib/gemini/error-recovery';
import { useChatAnalytics } from '@/lib/gemini/analytics-service';
import { useChatCache } from '@/lib/gemini/cache-service';
import { useChatMemoryManager } from '@/lib/gemini/memory-manager';

interface UseGeminiChatConfig {
  apiKey: string;
  systemInstruction: string;
  config?: Partial<GeminiConfig>;
  conversationId?: string;
}

interface UseGeminiChatState {
  messages: ChatMessage[];
  isStreaming: boolean;
  streamingMessage: string;
  error: ChatError | null;
  isInitialized: boolean;
  isLoading: boolean;
  uploadProgress: Record<string, number>;
}

interface UseGeminiChatReturn {
  messages: ChatMessage[];
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
  getConversationHistory: () => Promise<ChatMessage[]>;
  getUsageStats: () => any;
  retryLastOperation: () => Promise<void>;
  isRecovering: boolean;
  recoveryAction: any;
}

export function useGeminiChat({
  apiKey,
  systemInstruction,
  config,
  conversationId
}: UseGeminiChatConfig): UseGeminiChatReturn {
  const [state, setState] = useState<UseGeminiChatState>({
    messages: [],
    isStreaming: false,
    streamingMessage: '',
    error: null,
    isInitialized: false,
    isLoading: false,
    uploadProgress: {}
  });

  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryAction, setRecoveryAction] = useState<any>(null);
  const [lastOperation, setLastOperation] = useState<{
    type: 'send_message' | 'upload_file' | 'initialize_chat';
    params: any;
  } | null>(null);

  const geminiServiceRef = useRef<GeminiService | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionIdRef = useRef<string>(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  const analytics = useChatAnalytics();
  const cache = useChatCache();
  const memoryManager = useChatMemoryManager();

  // Initialisation du service Gemini
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
      
      // Démarrer la session analytics
      analytics.startSession(sessionIdRef.current, conversationId);
      
      try {
        const geminiConfig: GeminiConfig = {
          model: 'gemini-2.5-flash',
          temperature: 0.7,
          thinkingBudget: 0,
          systemInstruction,
          maxTokens: 2048,
          ...config
        };

        geminiServiceRef.current = new GeminiService(apiKey, geminiConfig, conversationId);
        await geminiServiceRef.current.initializeChat();
        
        // Charger l'historique existant
        const history = await geminiServiceRef.current.getConversationHistory();
        
        setState(prev => ({
          ...prev,
          messages: history,
          isInitialized: true,
          isLoading: false,
          error: null
        }));

        // Enregistrer l'opération pour retry
        setLastOperation({
          type: 'initialize_chat',
          params: { apiKey, systemInstruction, config, conversationId }
        });

        // Réinitialiser le compteur de retry
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
  }, [apiKey, systemInstruction, config, conversationId]);

  // Gestion centralisée des erreurs
  const handleError = useCallback(async (error: unknown, context: ErrorContext) => {
    setIsRecovering(true);
    
    try {
      const { chatError, recoveryAction: action, shouldRetry } = await chatErrorHandler.handleError(error, context);
      
      setState(prev => ({
        ...prev,
        error: chatError,
        isLoading: false,
        isStreaming: false
      }));

      setRecoveryAction(action);

      // Tentative de récupération automatique
      if (shouldRetry && action.type === 'retry') {
        const recoveryResult = await chatErrorRecoveryService.executeRecovery(chatError, context);
        
        if (recoveryResult.success) {
          // Récupération réussie, retry l'opération
          setTimeout(() => {
            retryLastOperation();
          }, action.delay || 1000);
        } else if (recoveryResult.fallbackUsed) {
          // Utiliser la réponse de fallback
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

  // Upload d'un fichier
  const uploadFile = useCallback(async (file: File): Promise<UploadedFile> => {
    if (!geminiServiceRef.current) {
      throw new Error('Service Gemini non initialisé');
    }

    const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Initialiser le progress
      setState(prev => ({
        ...prev,
        uploadProgress: { ...prev.uploadProgress, [fileId]: 0 }
      }));

      // Simuler le progress (l'API Gemini ne fournit pas de progress réel)
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
      
      // Finaliser le progress
      setState(prev => ({
        ...prev,
        uploadProgress: { ...prev.uploadProgress, [fileId]: 100 }
      }));

      // Enregistrer les métriques de performance
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

      // Nettoyer le progress après un délai
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

      // Gestion d'erreur avec contexte
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
  }, []);

  // Envoyer un message
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

    // Enregistrer l'opération pour retry
    setLastOperation({
      type: 'send_message',
      params: { message, files }
    });

    // Annuler toute requête en cours
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
      // Vérifier le cache d'abord (seulement pour les messages texte sans fichiers)
      if (!files || files.length === 0) {
        const cachedResponse = cache.get(message);
        if (cachedResponse) {
          // Utiliser la réponse en cache
          const updatedMessages = [...state.messages, 
            {
              id: messageId,
              role: 'user' as const,
              content: message,
              timestamp: new Date()
            },
            {
              id: `msg_${Date.now()}_cached`,
              role: 'assistant' as const,
              content: cachedResponse,
              timestamp: new Date(),
              metadata: { cached: true }
            }
          ];

          setState(prev => ({
            ...prev,
            messages: updatedMessages,
            isStreaming: false,
            streamingMessage: '',
            isLoading: false,
            error: null
          }));

          // Enregistrer les métriques
          analytics.trackMessage(sessionIdRef.current, messageId, 'user', message.length);
          analytics.trackMessage(sessionIdRef.current, `${messageId}_cached`, 'assistant', cachedResponse.length, {
            processingTime: 50,
            cached: true
          });

          return;
        }
      }

      // Upload des fichiers si nécessaire
      let uploadedFiles: UploadedFile[] | undefined;
      if (files && files.length > 0) {
        uploadedFiles = await Promise.all(files.map(file => uploadFile(file)));
      }

      // Enregistrer le message utilisateur
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

      // Utiliser le streaming pour la réponse
      const stream = await geminiServiceRef.current.sendMessageStream(message, uploadedFiles);

      let assistantContent = '';
      let chunkCount = 0;

      // Traiter le stream
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

        // Enregistrer la latence de streaming
        if (chunkCount === 1) {
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

      // Récupérer l'historique mis à jour
      const updatedHistory = await geminiServiceRef.current.getConversationHistory();

      // Optimiser la mémoire si nécessaire
      const { optimizedMessages } = memoryManager.optimizeConversation(
        sessionIdRef.current,
        updatedHistory
      );

      // Mettre en cache la réponse (seulement pour les messages texte)
      if (!files || files.length === 0) {
        cache.set(message, assistantContent, undefined, {
          tokens: assistantContent.length,
          confidence: 0.8,
          source: 'gemini'
        });
      }

      setState(prev => ({
        ...prev,
        messages: optimizedMessages,
        isStreaming: false,
        streamingMessage: '',
        isLoading: false,
        error: null
      }));

      // Enregistrer le message assistant et les métriques
      const assistantMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      analytics.trackMessage(
        sessionIdRef.current,
        assistantMessageId,
        'assistant',
        assistantContent.length,
        {
          processingTime: totalTime,
          tokenCount: assistantContent.length // Approximation
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

      // Réinitialiser le compteur de retry
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
  }, [uploadFile, handleError]);

  // Démarrer une nouvelle conversation
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
        error: null
      }));

      return newConversationId;
    } catch (error) {
      console.error('Erreur lors du démarrage d\'une nouvelle conversation:', error);
      throw error;
    }
  }, []);

  // Récupérer l'historique de la conversation
  const getConversationHistory = useCallback(async (): Promise<ChatMessage[]> => {
    if (!geminiServiceRef.current) {
      return [];
    }

    try {
      return await geminiServiceRef.current.getConversationHistory();
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      return [];
    }
  }, []);

  // Récupérer les statistiques d'utilisation
  const getUsageStats = useCallback(() => {
    if (!geminiServiceRef.current) {
      return null;
    }

    return geminiServiceRef.current.getUsageStats();
  }, []);

  // Effacer l'erreur
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  // Effacer les messages
  const clearMessages = useCallback(async () => {
    if (geminiServiceRef.current) {
      try {
        await geminiServiceRef.current.clearConversation();
        setState(prev => ({
          ...prev,
          messages: [],
          streamingMessage: '',
          error: null
        }));
      } catch (error) {
        console.error('Erreur lors de l\'effacement des messages:', error);
      }
    } else {
      setState(prev => ({
        ...prev,
        messages: [],
        streamingMessage: '',
        error: null
      }));
    }
  }, []);

  // Retry de la dernière opération
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
          // Réinitialiser le service
          const { apiKey, systemInstruction, config, conversationId } = lastOperation.params;
          const geminiConfig: GeminiConfig = {
            model: 'gemini-2.5-flash',
            temperature: 0.7,
            thinkingBudget: 0,
            systemInstruction,
            maxTokens: 2048,
            ...config
          };
          geminiServiceRef.current = new GeminiService(apiKey, geminiConfig, conversationId);
          await geminiServiceRef.current.initializeChat();
          
          const history = await geminiServiceRef.current.getConversationHistory();
          setState(prev => ({
            ...prev,
            messages: history,
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
      // L'erreur sera gérée par la fonction appelée
    }
  }, [lastOperation, sendMessage, uploadFile]);

  // Nettoyage lors du démontage
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Terminer la session analytics
      analytics.endSession(sessionIdRef.current);
    };
  }, [analytics]);

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
    recoveryAction
  };
}