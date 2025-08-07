'use client';

/**
 * Service Gemini simplifié pour éviter les erreurs d'import
 * Version de fallback qui fonctionne sans dépendances externes
 */

export interface SimpleUploadedFile {
  id: string;
  name: string;
  uri: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

export interface SimpleChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: SimpleUploadedFile[];
}

export class SimpleGeminiService {
  private apiKey: string;
  private conversationHistory: SimpleChatMessage[] = [];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Envoie un message (version simplifiée pour éviter les erreurs)
   */
  async sendMessage(message: string, files?: SimpleUploadedFile[]): Promise<string> {
    try {
      // Pour l'instant, on retourne une réponse simulée
      // En production, ceci ferait appel à l'API Gemini réelle
      
      const userMessage: SimpleChatMessage = {
        id: `msg_${Date.now()}_user`,
        role: 'user',
        content: message,
        timestamp: new Date(),
        files
      };

      this.conversationHistory.push(userMessage);

      // Simulation d'une réponse de l'assistant
      const assistantResponse = this.generateMockResponse(message, files);
      
      const assistantMessage: SimpleChatMessage = {
        id: `msg_${Date.now()}_assistant`,
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      };

      this.conversationHistory.push(assistantMessage);

      return assistantResponse;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      throw new Error('Impossible d\'envoyer le message. Veuillez réessayer.');
    }
  }

  /**
   * Génère une réponse simulée (à remplacer par l'API réelle)
   */
  private generateMockResponse(message: string, files?: SimpleUploadedFile[]): string {
    const responses = [
      "Je comprends votre question. Pouvez-vous me donner plus de détails ?",
      "C'est une excellente question ! Laissez-moi vous expliquer...",
      "Basé sur votre demande, voici ce que je peux vous suggérer...",
      "Merci pour votre message. Voici ma réponse...",
      "Je vais vous aider avec cela. Voici quelques informations utiles..."
    ];

    if (files && files.length > 0) {
      return `J'ai bien reçu votre message avec ${files.length} fichier(s). ${responses[Math.floor(Math.random() * responses.length)]}`;
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Upload un fichier (version simplifiée)
   */
  async uploadFile(file: File): Promise<SimpleUploadedFile> {
    try {
      // Validation basique
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Fichier trop volumineux (max 10MB)');
      }

      // Simulation d'upload
      const uploadedFile: SimpleUploadedFile = {
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        uri: URL.createObjectURL(file), // URL temporaire pour l'aperçu
        mimeType: file.type,
        size: file.size,
        uploadedAt: new Date()
      };

      return uploadedFile;
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      throw error;
    }
  }

  /**
   * Récupère l'historique de la conversation
   */
  getConversationHistory(): SimpleChatMessage[] {
    return [...this.conversationHistory];
  }

  /**
   * Efface l'historique de la conversation
   */
  clearConversation(): void {
    this.conversationHistory = [];
  }

  /**
   * Démarre une nouvelle conversation
   */
  startNewConversation(): void {
    this.clearConversation();
  }
}

// Export par défaut pour compatibilité
export default SimpleGeminiService;