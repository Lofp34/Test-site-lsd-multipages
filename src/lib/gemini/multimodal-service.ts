/**
 * Service d'intégration des contenus multimodaux dans les messages Gemini
 * Utilise createUserContent et createPartFromUri pour gérer les fichiers
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { UploadedFile, ChatMessage } from './types';

export interface MultimodalMessage {
  text: string;
  files?: UploadedFile[];
}

export interface ProcessedContent {
  content: any; // Type Gemini content
  hasFiles: boolean;
  fileCount: number;
}

export class MultimodalService {
  private ai: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Crée un contenu utilisateur multimodal pour l'API Gemini
   */
  createMultimodalContent(message: MultimodalMessage): ProcessedContent {
    const parts: any[] = [];
    
    // Ajouter le texte s'il existe
    if (message.text.trim()) {
      parts.push({ text: message.text });
    }

    // Ajouter les fichiers s'ils existent
    if (message.files && message.files.length > 0) {
      message.files.forEach(file => {
        if (file.uri.startsWith('data:')) {
          // Pour les fichiers en base64
          const [mimeType, data] = file.uri.replace('data:', '').split(';base64,');
          parts.push({
            inlineData: {
              mimeType: file.mimeType,
              data: data
            }
          });
        } else {
          // Pour les URIs de fichiers uploadés
          parts.push({
            fileData: {
              mimeType: file.mimeType,
              fileUri: file.uri
            }
          });
        }
      });
    }

    const content = {
      role: 'user',
      parts: parts
    };

    return {
      content,
      hasFiles: Boolean(message.files && message.files.length > 0),
      fileCount: message.files?.length || 0
    };
  }

  /**
   * Prépare un message pour l'envoi à l'API Gemini
   */
  prepareMessageForGemini(text: string, files?: UploadedFile[]): ProcessedContent {
    return this.createMultimodalContent({ text, files });
  }

  /**
   * Crée un message de chat à partir d'un contenu multimodal
   */
  createChatMessage(
    text: string, 
    files?: UploadedFile[], 
    role: 'user' | 'assistant' = 'user'
  ): ChatMessage {
    return {
      id: this.generateMessageId(),
      role,
      content: text,
      timestamp: new Date(),
      files: files || [],
      metadata: {
        processingTime: 0
      }
    };
  }

  /**
   * Valide qu'un message multimodal est correct
   */
  validateMultimodalMessage(message: MultimodalMessage): {
    isValid: boolean;
    error?: string;
  } {
    // Un message doit avoir au moins du texte ou des fichiers
    if (!message.text.trim() && (!message.files || message.files.length === 0)) {
      return {
        isValid: false,
        error: 'Le message doit contenir du texte ou des fichiers'
      };
    }

    // Vérifier que les fichiers ont des URIs valides
    if (message.files) {
      for (const file of message.files) {
        if (!file.uri || !file.mimeType) {
          return {
            isValid: false,
            error: `Fichier invalide: ${file.name} - URI ou type MIME manquant`
          };
        }
      }
    }

    return { isValid: true };
  }

  /**
   * Extrait les informations des fichiers d'un message
   */
  extractFileInfo(message: ChatMessage): {
    hasFiles: boolean;
    fileCount: number;
    fileTypes: string[];
    totalSize: number;
  } {
    if (!message.files || message.files.length === 0) {
      return {
        hasFiles: false,
        fileCount: 0,
        fileTypes: [],
        totalSize: 0
      };
    }

    const fileTypes = message.files.map(file => file.mimeType);
    const totalSize = message.files.reduce((sum, file) => sum + file.size, 0);

    return {
      hasFiles: true,
      fileCount: message.files.length,
      fileTypes: [...new Set(fileTypes)], // Types uniques
      totalSize
    };
  }

  /**
   * Formate un message pour l'affichage avec informations sur les fichiers
   */
  formatMessageForDisplay(message: ChatMessage): {
    text: string;
    files: Array<{
      name: string;
      type: string;
      size: string;
      preview?: string;
    }>;
  } {
    const files = message.files?.map(file => ({
      name: file.name,
      type: this.getFileTypeLabel(file.mimeType),
      size: this.formatFileSize(file.size),
      preview: this.shouldShowPreview(file.mimeType) ? file.uri : undefined
    })) || [];

    return {
      text: message.content,
      files
    };
  }

  /**
   * Détermine si un fichier doit avoir une prévisualisation
   */
  private shouldShowPreview(mimeType: string): boolean {
    return mimeType.startsWith('image/');
  }

  /**
   * Obtient un label lisible pour un type de fichier
   */
  private getFileTypeLabel(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'Image';
    if (mimeType.startsWith('video/')) return 'Vidéo';
    if (mimeType.startsWith('audio/')) return 'Audio';
    return 'Fichier';
  }

  /**
   * Formate la taille d'un fichier
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Génère un ID unique pour un message
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Crée un historique de conversation compatible avec l'API Gemini
   */
  createConversationHistory(messages: ChatMessage[]): Array<{
    role: 'user' | 'model';
    parts: any[];
  }> {
    return messages.map(message => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: this.createPartsFromMessage(message)
    }));
  }

  /**
   * Crée les parts d'un message pour l'historique
   */
  private createPartsFromMessage(message: ChatMessage): any[] {
    const parts: any[] = [];

    // Ajouter le texte
    if (message.content.trim()) {
      parts.push({ text: message.content });
    }

    // Ajouter les fichiers pour les messages utilisateur
    if (message.role === 'user' && message.files) {
      message.files.forEach(file => {
        if (file.uri.startsWith('data:')) {
          // Pour les fichiers en base64
          const [mimeType, data] = file.uri.replace('data:', '').split(';base64,');
          parts.push({
            inlineData: {
              mimeType: file.mimeType,
              data: data
            }
          });
        } else {
          // Pour les URIs de fichiers uploadés
          parts.push({
            fileData: {
              mimeType: file.mimeType,
              fileUri: file.uri
            }
          });
        }
      });
    }

    return parts;
  }

  /**
   * Optimise l'historique en supprimant les anciens fichiers
   */
  optimizeHistory(messages: ChatMessage[], maxMessages: number = 20): ChatMessage[] {
    if (messages.length <= maxMessages) {
      return messages;
    }

    // Garder les messages récents et supprimer les fichiers des anciens messages
    const recentMessages = messages.slice(-maxMessages);
    const olderMessages = messages.slice(0, -maxMessages);

    // Supprimer les fichiers des anciens messages pour économiser la mémoire
    const optimizedOlderMessages = olderMessages.map(msg => ({
      ...msg,
      files: msg.role === 'user' ? [] : msg.files // Garder les fichiers des réponses assistant
    }));

    return [...optimizedOlderMessages, ...recentMessages];
  }
}