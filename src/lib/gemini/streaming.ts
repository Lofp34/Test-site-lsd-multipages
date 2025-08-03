import { ChatMessage } from './types';

/**
 * Gestionnaire de streaming pour les réponses Gemini
 */
export class StreamingManager {
  private currentStream: string = '';
  private onChunkCallback?: (chunk: string) => void;
  private onCompleteCallback?: (fullMessage: string) => void;
  private onErrorCallback?: (error: Error) => void;

  constructor(
    onChunk?: (chunk: string) => void,
    onComplete?: (fullMessage: string) => void,
    onError?: (error: Error) => void
  ) {
    this.onChunkCallback = onChunk;
    this.onCompleteCallback = onComplete;
    this.onErrorCallback = onError;
  }

  /**
   * Traite un stream de réponse Gemini
   */
  async processStream(streamGenerator: AsyncIterable<string>): Promise<string> {
    this.currentStream = '';
    
    try {
      for await (const chunk of streamGenerator) {
        this.currentStream += chunk;
        
        // Appeler le callback pour chaque chunk
        if (this.onChunkCallback) {
          this.onChunkCallback(chunk);
        }
      }

      // Appeler le callback de completion
      if (this.onCompleteCallback) {
        this.onCompleteCallback(this.currentStream);
      }

      return this.currentStream;
    } catch (error) {
      console.error('Erreur dans le streaming:', error);
      
      if (this.onErrorCallback) {
        this.onErrorCallback(error as Error);
      }
      
      throw error;
    }
  }

  /**
   * Annule le streaming en cours
   */
  cancel(): void {
    this.currentStream = '';
  }

  /**
   * Obtient le contenu actuel du stream
   */
  getCurrentContent(): string {
    return this.currentStream;
  }
}

/**
 * Utilitaires pour le streaming de messages
 */
export class StreamingUtils {
  /**
   * Crée un délai entre les chunks pour un effet de frappe
   */
  static async delayedChunk(chunk: string, delay: number = 20): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(chunk), delay);
    });
  }

  /**
   * Divise un texte en chunks pour simuler le streaming
   */
  static* createChunks(text: string, chunkSize: number = 3): Generator<string> {
    for (let i = 0; i < text.length; i += chunkSize) {
      yield text.slice(i, i + chunkSize);
    }
  }

  /**
   * Formate un message pour l'affichage en streaming
   */
  static formatStreamingMessage(content: string, isComplete: boolean = false): ChatMessage {
    return {
      id: `streaming-${Date.now()}`,
      role: 'assistant',
      content,
      timestamp: new Date(),
      metadata: {
        processingTime: 0,
        confidence: isComplete ? 1 : 0.5,
      },
    };
  }

  /**
   * Nettoie le contenu streamé (supprime les caractères indésirables)
   */
  static cleanStreamContent(content: string): string {
    return content
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim();
  }

  /**
   * Détecte si le streaming est terminé basé sur des marqueurs
   */
  static isStreamComplete(content: string): boolean {
    // Vérifier les marqueurs de fin courants
    const endMarkers = [
      '.',
      '!',
      '?',
      '\n\n',
      'Avez-vous d\'autres questions',
      'N\'hésitez pas à me contacter',
    ];

    return endMarkers.some(marker => content.trim().endsWith(marker));
  }

  /**
   * Calcule la vitesse de streaming optimale basée sur la longueur du contenu
   */
  static calculateStreamingSpeed(contentLength: number): number {
    // Plus le contenu est long, plus on peut aller vite
    if (contentLength < 50) return 30; // Lent pour les courtes réponses
    if (contentLength < 200) return 20; // Moyen
    return 15; // Rapide pour les longues réponses
  }

  /**
   * Gère les erreurs de streaming avec retry automatique
   */
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        console.warn(`Tentative ${attempt}/${maxRetries} échouée:`, error);

        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
      }
    }

    throw lastError!;
  }
}

/**
 * Hook pour gérer le streaming dans les composants React
 */
export class ReactStreamingHook {
  private streamingManager: StreamingManager;
  private updateCallback: (content: string, isComplete: boolean) => void;

  constructor(updateCallback: (content: string, isComplete: boolean) => void) {
    this.updateCallback = updateCallback;
    this.streamingManager = new StreamingManager(
      (chunk) => this.handleChunk(chunk),
      (fullMessage) => this.handleComplete(fullMessage),
      (error) => this.handleError(error)
    );
  }

  /**
   * Démarre le streaming d'une réponse
   */
  async startStreaming(streamGenerator: AsyncIterable<string>): Promise<string> {
    return this.streamingManager.processStream(streamGenerator);
  }

  /**
   * Gère la réception d'un chunk
   */
  private handleChunk(chunk: string): void {
    const currentContent = this.streamingManager.getCurrentContent();
    this.updateCallback(currentContent, false);
  }

  /**
   * Gère la completion du streaming
   */
  private handleComplete(fullMessage: string): void {
    this.updateCallback(fullMessage, true);
  }

  /**
   * Gère les erreurs de streaming
   */
  private handleError(error: Error): void {
    console.error('Erreur de streaming:', error);
    // En cas d'erreur, on affiche le contenu partiel
    const partialContent = this.streamingManager.getCurrentContent();
    if (partialContent) {
      this.updateCallback(partialContent + ' [Connexion interrompue]', true);
    }
  }

  /**
   * Annule le streaming en cours
   */
  cancel(): void {
    this.streamingManager.cancel();
  }
}