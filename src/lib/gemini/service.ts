'use client';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage, GeminiConfig, UploadedFile, ChatError, ChatErrorType } from './types';

export class GeminiService {
  private ai: GoogleGenerativeAI;
  private chat: any = null;
  private config: GeminiConfig;
  private conversationId: string;
  private usageStats = {
    messagesCount: 0,
    tokensUsed: 0,
    filesUploaded: 0,
    errors: 0
  };

  constructor(apiKey: string, config: GeminiConfig, conversationId?: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }

    this.ai = new GoogleGenerativeAI(config.apiKey);
    this.config = config;
    this.conversationId = conversationId || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Initialise le chat avec les instructions système
   */
  async initializeChat(): Promise<void> {
    try {
      // Créer le chat avec l'historique vide et les instructions système
      this.chat = this.ai.chats.create({
        model: this.config.model,
        history: [],
        config: {
          systemInstruction: this.config.systemInstruction,
          temperature: this.config.temperature,
          thinkingConfig: {
            thinkingBudget: this.config.thinkingBudget || 0 // Désactivé par défaut pour la performance
          }
        }
      });

      console.log('Chat Gemini initialisé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du chat:', error);
      this.usageStats.errors++;
      throw this.createChatError(error, 'Impossible d\'initialiser le chat');
    }
  }

  /**
   * Envoie un message avec streaming
   */
  async *sendMessageStream(message: string, files?: UploadedFile[]): AsyncIterable<string> {
    if (!this.chat) {
      throw new Error('Chat not initialized. Call initializeChat() first.');
    }

    try {
      let messageContent: any;

      if (files && files.length > 0) {
        // Message multimodal avec fichiers
        const parts = [message];

        for (const file of files) {
          parts.push(createPartFromUri(file.uri, file.mimeType));
        }

        messageContent = createUserContent(parts);
      } else {
        // Message texte simple
        messageContent = message;
      }

      // Utiliser sendMessageStream pour le streaming
      const stream = await this.chat.sendMessageStream({
        message: messageContent
      });

      this.usageStats.messagesCount++;

      // Traiter le stream
      for await (const chunk of stream) {
        if (chunk.text) {
          yield chunk.text;
        }
      }

    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      this.usageStats.errors++;
      throw this.createChatError(error, 'Impossible d\'envoyer le message');
    }
  }

  /**
   * Envoie un message sans streaming (pour compatibilité)
   */
  async sendMessage(message: string, files?: UploadedFile[]): Promise<string> {
    const chunks: string[] = [];

    for await (const chunk of this.sendMessageStream(message, files)) {
      chunks.push(chunk);
    }

    return chunks.join('');
  }

  /**
   * Upload un fichier via l'API Files de Gemini
   */
  async uploadFile(file: File): Promise<UploadedFile> {
    try {
      // Validation du fichier
      this.validateFile(file);

      // Upload via l'API Files
      const uploadedFile = await this.ai.files.upload({
        file: file
      });

      this.usageStats.filesUploaded++;

      const result: UploadedFile = {
        id: uploadedFile.name || `file_${Date.now()}`,
        name: file.name,
        uri: uploadedFile.uri,
        mimeType: uploadedFile.mimeType || file.type,
        size: file.size,
        uploadedAt: new Date()
      };

      console.log('Fichier uploadé avec succès:', result);
      return result;

    } catch (error) {
      console.error('Erreur lors de l\'upload du fichier:', error);
      this.usageStats.errors++;
      throw this.createChatError(error, 'Impossible d\'uploader le fichier');
    }
  }

  /**
   * Récupère l'historique de la conversation
   */
  async getConversationHistory(): Promise<ChatMessage[]> {
    if (!this.chat) {
      return [];
    }

    try {
      // L'historique est maintenu automatiquement par le chat
      // On peut le récupérer depuis le localStorage ou une autre source
      const stored = localStorage.getItem(`chat_history_${this.conversationId}`);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      return [];
    }
  }

  /**
   * Sauvegarde l'historique de la conversation
   */
  async saveConversationHistory(messages: ChatMessage[]): Promise<void> {
    try {
      localStorage.setItem(`chat_history_${this.conversationId}`, JSON.stringify(messages));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'historique:', error);
    }
  }

  /**
   * Démarre une nouvelle conversation
   */
  async startNewConversation(): Promise<string> {
    try {
      // Générer un nouvel ID de conversation
      this.conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Réinitialiser le chat
      await this.initializeChat();

      // Nettoyer l'historique local
      localStorage.removeItem(`chat_history_${this.conversationId}`);

      return this.conversationId;
    } catch (error) {
      console.error('Erreur lors du démarrage d\'une nouvelle conversation:', error);
      throw this.createChatError(error, 'Impossible de démarrer une nouvelle conversation');
    }
  }

  /**
   * Efface la conversation actuelle
   */
  async clearConversation(): Promise<void> {
    try {
      // Nettoyer l'historique local
      localStorage.removeItem(`chat_history_${this.conversationId}`);

      // Réinitialiser le chat
      await this.initializeChat();
    } catch (error) {
      console.error('Erreur lors de l\'effacement de la conversation:', error);
      throw this.createChatError(error, 'Impossible d\'effacer la conversation');
    }
  }

  /**
   * Récupère les statistiques d'utilisation
   */
  getUsageStats() {
    return { ...this.usageStats };
  }

  /**
   * Valide un fichier avant upload
   */
  private validateFile(file: File): void {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/', 'video/', 'audio/'];

    if (file.size > maxSize) {
      throw new Error(`File too large. Maximum size is ${maxSize / 1024 / 1024}MB`);
    }

    const isAllowedType = allowedTypes.some(type => file.type.startsWith(type));
    if (!isAllowedType) {
      throw new Error(`File type not supported. Allowed types: ${allowedTypes.join(', ')}`);
    }
  }

  /**
   * Crée une erreur de chat standardisée
   */
  private createChatError(error: unknown, userMessage: string): ChatError {
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

    return {
      type: errorType,
      message,
      userMessage,
      retryable
    };
  }
}