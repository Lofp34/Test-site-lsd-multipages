'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, GeminiConfig, UploadedFile, ChatError, ChatErrorType } from '@/lib/gemini/types';

interface UseGeminiChatSimpleConfig {
  apiKey: string;
  systemInstruction: string;
  config?: Partial<GeminiConfig>;
  conversationId?: string;
}

interface UseGeminiChatSimpleReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  streamingMessage: string;
  error: ChatError | null;
  isInitialized: boolean;
  isLoading: boolean;
  sendMessage: (message: string, files?: File[]) => Promise<void>;
  uploadFile: (file: File) => Promise<UploadedFile>;
  clearError: () => void;
  clearMessages: () => void;
  startNewConversation: () => Promise<string>;
  getConversationHistory: () => Promise<ChatMessage[]>;
  retryLastOperation: () => Promise<void>;
  isRecovering: boolean;
  recoveryAction: any;
}

// Helper function pour convertir un fichier en base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Enlever le préfixe data:type/subtype;base64,
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}

export function useGeminiChatSimple({
  apiKey,
  systemInstruction,
  config,
  conversationId
}: UseGeminiChatSimpleConfig): UseGeminiChatSimpleReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [error, setError] = useState<ChatError | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovering] = useState(false);
  const [recoveryAction] = useState<any>(null);

  const aiRef = useRef<GoogleGenAI | null>(null);
  const chatRef = useRef<any>(null);
  const conversationIdRef = useRef<string>(conversationId || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const initializationAttempted = useRef<boolean>(false);

  // Initialisation du service Gemini - une seule fois
  useEffect(() => {
    if (initializationAttempted.current || !apiKey) {
      return;
    }

    initializationAttempted.current = true;

    const initializeService = async () => {
      setIsLoading(true);
      
      try {
        // Initialiser l'API Gemini avec la clé API
        aiRef.current = new GoogleGenAI({ apiKey });

        // Configuration par défaut
        const geminiConfig: GeminiConfig = {
          model: 'gemini-2.5-flash',
          temperature: 0.7,
          thinkingBudget: 0, // Désactivé pour la performance selon la doc
          systemInstruction,
          maxTokens: 2048,
          ...config
        };

        // Créer le chat selon la documentation officielle
        chatRef.current = aiRef.current.chats.create({
          model: geminiConfig.model,
          history: []
        });

        // Charger l'historique existant depuis localStorage
        try {
          const storedHistory = localStorage.getItem(`chat_history_${conversationIdRef.current}`);
          if (storedHistory) {
            const history = JSON.parse(storedHistory);
            setMessages(history);
          }
        } catch (e) {
          console.warn('Erreur lors du chargement de l\'historique:', e);
        }
        
        setIsInitialized(true);
        setIsLoading(false);
        setError(null);
        
      } catch (error) {
        console.error('Erreur lors de l\'initialisation du service Gemini:', error);
        setError({
          type: ChatErrorType.API_UNAVAILABLE,
          message: error instanceof Error ? error.message : 'Unknown error',
          userMessage: 'Impossible d\'initialiser le chat',
          retryable: true
        });
        setIsLoading(false);
      }
    };

    initializeService();
  }, [apiKey]); // Dépendance sur apiKey pour réinitialiser si elle change

  // Gestion centralisée des erreurs
  const handleError = useCallback((error: unknown, userMessage: string) => {
    let errorType = ChatErrorType.API_UNAVAILABLE;
    let message = 'Unknown error';
    let retryable = true;

    if (error instanceof Error) {
      message = error.message;
      
      // Déterminer le type d'erreur basé sur le message
      if (message.includes('rate limit') || message.includes('quota')) {
        errorType = ChatErrorType.RATE_LIMIT;
      } else if (message.includes('too large') || message.includes('size')) {
        errorType = ChatErrorType.FILE_TOO_LARGE;
        retryable = false;
      } else if (message.includes('not supported') || message.includes('type')) {
        errorType = ChatErrorType.UNSUPPORTED_FILE;
        retryable = false;
      } else if (message.includes('network') || message.includes('connection')) {
        errorType = ChatErrorType.NETWORK_ERROR;
      } else if (message.includes('quota') || message.includes('exceeded')) {
        errorType = ChatErrorType.QUOTA_EXCEEDED;
        retryable = false;
      }
    }

    setError({
      type: errorType,
      message,
      userMessage,
      retryable
    });
    setIsLoading(false);
    setIsStreaming(false);
  }, []);

  // Upload d'un fichier
  const uploadFile = useCallback(async (file: File): Promise<UploadedFile> => {
    if (!aiRef.current) {
      throw new Error('Service Gemini non initialisé');
    }

    try {
      // Validation du fichier
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['image/', 'video/', 'audio/'];

      if (file.size > maxSize) {
        throw new Error(`Fichier trop volumineux. Taille maximum : ${maxSize / 1024 / 1024}MB`);
      }

      const isAllowedType = allowedTypes.some(type => file.type.startsWith(type));
      if (!isAllowedType) {
        throw new Error(`Type de fichier non supporté. Types autorisés : ${allowedTypes.join(', ')}`);
      }

      // Pour l'instant, on simule l'upload (l'API Files n'est pas encore disponible dans cette version)
      const uploadedFile = {
        name: `file_${Date.now()}`,
        uri: URL.createObjectURL(file),
        mimeType: file.type
      };

      const result: UploadedFile = {
        id: uploadedFile.name || `file_${Date.now()}`,
        name: file.name,
        uri: uploadedFile.uri,
        mimeType: uploadedFile.mimeType || file.type,
        size: file.size,
        uploadedAt: new Date()
      };

      return result;
    } catch (error) {
      console.error('Erreur lors de l\'upload du fichier:', error);
      handleError(error, 'Impossible d\'uploader le fichier');
      throw error;
    }
  }, [handleError]);

  // Envoyer un message
  const sendMessage = useCallback(async (message: string, files?: File[]) => {
    if (!chatRef.current) {
      handleError(new Error('Service not initialized'), 'Chat non initialisé');
      return;
    }

    if (!message.trim() && (!files || files.length === 0)) {
      return;
    }

    setIsStreaming(true);
    setStreamingMessage('');
    setError(null);
    setIsLoading(true);

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      // Upload des fichiers si nécessaire
      let uploadedFiles: UploadedFile[] | undefined;
      if (files && files.length > 0) {
        uploadedFiles = await Promise.all(files.map(file => uploadFile(file)));
      }

      // Préparer le message selon la documentation Gemini
      let messageContent: any;
      
      if (uploadedFiles && uploadedFiles.length > 0) {
        // Message multimodal avec fichiers
        const parts = [{ text: message }];
        
        for (const file of uploadedFiles) {
          parts.push({
            inlineData: {
              mimeType: file.mimeType,
              data: await fileToBase64(file)
            }
          });
        }

        messageContent = parts;
      } else {
        // Message texte simple
        messageContent = message;
      }

      // Ajouter le message utilisateur à l'état
      const userMessage: ChatMessage = {
        id: messageId,
        role: 'user',
        content: message,
        timestamp: new Date(),
        files: uploadedFiles
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(false);

      // Utiliser le streaming selon la documentation officielle
      const stream = await chatRef.current.sendMessageStream({
        message: messageContent
      });

      let assistantContent = '';

      // Traiter le stream
      for await (const chunk of stream) {
        if (chunk.text) {
          assistantContent += chunk.text;
          setStreamingMessage(assistantContent);
        }
      }

      // Ajouter le message assistant final
      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_assistant`,
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date()
      };

      setMessages(prev => {
        const updatedMessages = [...prev, assistantMessage];
        
        // Sauvegarder l'historique
        try {
          localStorage.setItem(`chat_history_${conversationIdRef.current}`, JSON.stringify(updatedMessages));
        } catch (e) {
          console.warn('Erreur lors de la sauvegarde:', e);
        }
        
        return updatedMessages;
      });

      setIsStreaming(false);
      setStreamingMessage('');
      setError(null);

    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      handleError(error, 'Impossible d\'envoyer le message');
    }
  }, [uploadFile, handleError]);

  // Démarrer une nouvelle conversation
  const startNewConversation = useCallback(async (): Promise<string> => {
    try {
      // Générer un nouvel ID de conversation
      const newConversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      conversationIdRef.current = newConversationId;
      
      // Nettoyer l'historique local
      try {
        localStorage.removeItem(`chat_history_${newConversationId}`);
      } catch (e) {
        console.warn('Erreur lors du nettoyage:', e);
      }
      
      // Réinitialiser l'état
      setMessages([]);
      setStreamingMessage('');
      setError(null);

      return newConversationId;
    } catch (error) {
      console.error('Erreur lors du démarrage d\'une nouvelle conversation:', error);
      throw error;
    }
  }, []);

  // Récupérer l'historique de la conversation
  const getConversationHistory = useCallback(async (): Promise<ChatMessage[]> => {
    try {
      const stored = localStorage.getItem(`chat_history_${conversationIdRef.current}`);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      return [];
    }
  }, []);

  // Effacer l'erreur
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Effacer les messages
  const clearMessages = useCallback(async () => {
    try {
      localStorage.removeItem(`chat_history_${conversationIdRef.current}`);
      setMessages([]);
      setStreamingMessage('');
      setError(null);
    } catch (error) {
      console.error('Erreur lors de l\'effacement des messages:', error);
    }
  }, []);

  // Retry de la dernière opération
  const retryLastOperation = useCallback(async () => {
    // Réinitialiser le service
    initializationAttempted.current = false;
    setIsInitialized(false);
    window.location.reload();
  }, []);

  return {
    messages,
    isStreaming,
    streamingMessage,
    error,
    isInitialized,
    isLoading,
    sendMessage,
    uploadFile,
    clearError,
    clearMessages,
    startNewConversation,
    getConversationHistory,
    retryLastOperation,
    isRecovering,
    recoveryAction
  };
}