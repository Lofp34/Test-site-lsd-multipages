'use client';

import { useState, useCallback, useRef } from 'react';
import { SimpleGeminiService, SimpleChatMessage, SimpleUploadedFile } from '@/lib/gemini/simple-service';

interface UseSimpleGeminiChatProps {
  apiKey?: string;
  systemInstruction?: string;
}

export function useSimpleGeminiChat({ 
  apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'demo-key',
  systemInstruction = 'Vous êtes un assistant IA utile et bienveillant.'
}: UseSimpleGeminiChatProps = {}) {
  const [messages, setMessages] = useState<SimpleChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const serviceRef = useRef<SimpleGeminiService | null>(null);

  // Initialiser le service si nécessaire
  if (!serviceRef.current) {
    serviceRef.current = new SimpleGeminiService(apiKey);
  }

  const sendMessage = useCallback(async (
    content: string, 
    files?: SimpleUploadedFile[]
  ): Promise<void> => {
    if (!serviceRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Ajouter le message utilisateur immédiatement
      const userMessage: SimpleChatMessage = {
        id: `msg_${Date.now()}_user`,
        role: 'user',
        content,
        timestamp: new Date(),
        files
      };

      setMessages(prev => [...prev, userMessage]);

      // Envoyer le message au service
      const response = await serviceRef.current.sendMessage(content, files);

      // Ajouter la réponse de l'assistant
      const assistantMessage: SimpleChatMessage = {
        id: `msg_${Date.now()}_assistant`,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      console.error('Erreur lors de l\'envoi du message:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<SimpleUploadedFile | null> => {
    if (!serviceRef.current) return null;

    try {
      setError(null);
      return await serviceRef.current.uploadFile(file);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'upload';
      setError(errorMessage);
      console.error('Erreur lors de l\'upload:', err);
      return null;
    }
  }, []);

  const clearConversation = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.clearConversation();
    }
    setMessages([]);
    setError(null);
  }, []);

  const startNewConversation = useCallback(() => {
    clearConversation();
  }, [clearConversation]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    uploadFile,
    clearConversation,
    startNewConversation,
    hasMessages: messages.length > 0
  };
}