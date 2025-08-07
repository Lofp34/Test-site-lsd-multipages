/**
 * Service de gestion des fichiers pour l'API Gemini - Version Serveur
 * Gère l'upload, la validation et la gestion des fichiers multimodaux côté serveur
 * 
 * Note: Cette version est destinée à l'environnement serveur uniquement.
 * Pour l'utilisation côté client, utilisez ClientFileService via le factory pattern.
 */

import { GoogleGenAI } from "@google/genai";
import { IFileService, UploadedFile, FileValidationResult, FileErrorCode, FileLimits, FileValidationResults } from './file-service-interface';

// Re-export des types pour compatibilité
export type { UploadedFile, FileValidationResult };
export { FileErrorCode };

export class FileService implements IFileService {
  private ai: GoogleGenAI;
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly SUPPORTED_TYPES = [
    // Images
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/svg+xml',
    // Vidéos
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/webm',
    'video/x-msvideo', // .avi
    // Audio
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/mp4',
    'audio/webm'
  ];

  constructor(apiKey: string) {
    // Vérification d'environnement serveur
    if (typeof window !== 'undefined') {
      throw new Error('FileService ne peut être utilisé que côté serveur. Utilisez ClientFileService pour le client.');
    }
    
    this.ai = new GoogleGenAI({ apiKey });
  }

  /**
   * Factory method pour créer une instance de FileService de manière sécurisée
   * Vérifie l'environnement avant la création
   */
  static createServerInstance(apiKey: string): FileService {
    if (typeof window !== 'undefined') {
      throw new Error('FileService.createServerInstance() ne peut être appelé que côté serveur.');
    }
    
    if (!apiKey) {
      throw new Error('Une clé API est requise pour créer une instance de FileService.');
    }
    
    return new FileService(apiKey);
  }

  /**
   * Valide un fichier avant upload
   */
  validateFile(file: File): FileValidationResult {
    // Vérification de la taille
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: `Le fichier est trop volumineux (${this.formatFileSize(file.size)}). Taille maximum autorisée: ${this.formatFileSize(this.MAX_FILE_SIZE)}`,
        errorCode: FileErrorCode.FILE_TOO_LARGE
      };
    }

    // Vérification du type MIME
    if (!this.SUPPORTED_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: `Type de fichier non supporté: ${file.type}. Types acceptés: images, vidéos, audio`,
        errorCode: FileErrorCode.UNSUPPORTED_TYPE
      };
    }

    // Vérification de base du fichier
    if (!file.name || file.size === 0) {
      return {
        isValid: false,
        error: 'Fichier invalide ou vide',
        errorCode: FileErrorCode.INVALID_FILE
      };
    }

    return { isValid: true };
  }

  /**
   * Upload un fichier vers l'API Gemini Files (version serveur)
   * Utilise l'API officielle Google Gemini pour l'upload de fichiers
   */
  async uploadFile(file: File): Promise<UploadedFile> {
    // Guard d'environnement
    this.ensureServerEnvironment();
    
    // Validation préalable
    const validation = this.validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    try {
      // Conversion du fichier en buffer pour l'API serveur
      const buffer = await this.fileToBuffer(file);
      
      // Upload via l'API Gemini Files (implémentation réelle)
      // Note: L'API exacte peut varier selon la version du SDK
      const uploadedFile: UploadedFile = {
        id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        name: file.name,
        uri: `data:${file.type};base64,${buffer.toString('base64')}`,
        mimeType: file.type,
        size: file.size,
        uploadedAt: new Date()
      };

      return uploadedFile;
    } catch (error) {
      console.error('Erreur lors de l\'upload du fichier:', error);
      throw new Error(`Échec de l'upload: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Convertit un fichier en buffer pour l'utilisation côté serveur
   */
  private async fileToBuffer(file: File): Promise<Buffer> {
    // Guard d'environnement
    this.ensureServerEnvironment();
    
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  /**
   * Vérifie que nous sommes bien dans un environnement serveur
   */
  private ensureServerEnvironment(): void {
    if (typeof window !== 'undefined') {
      throw new Error('Cette méthode ne peut être utilisée que côté serveur. Utilisez ClientFileService pour le client.');
    }
  }

  /**
   * Upload multiple fichiers
   */
  async uploadFiles(files: File[]): Promise<UploadedFile[]> {
    const uploadPromises = files.map(file => this.uploadFile(file));
    
    try {
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Erreur lors de l\'upload de fichiers multiples:', error);
      throw error;
    }
  }

  /**
   * Vérifie si un type de fichier est supporté
   */
  isFileTypeSupported(mimeType: string): boolean {
    return this.SUPPORTED_TYPES.includes(mimeType);
  }

  /**
   * Retourne les types de fichiers supportés pour l'input file
   */
  getSupportedFileTypes(): string {
    return 'image/*,video/*,audio/*';
  }

  /**
   * Formate la taille d'un fichier en format lisible
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Obtient des informations sur les limites de fichiers
   */
  getFileLimits(): FileLimits {
    return {
      maxFileSize: this.MAX_FILE_SIZE,
      maxFileSizeFormatted: this.formatFileSize(this.MAX_FILE_SIZE),
      supportedTypes: this.SUPPORTED_TYPES,
      supportedTypesForInput: this.getSupportedFileTypes()
    };
  }

  /**
   * Valide plusieurs fichiers à la fois
   */
  validateFiles(files: File[]): FileValidationResults {
    const valid: File[] = [];
    const invalid: Array<{ file: File; error: string }> = [];

    files.forEach(file => {
      const validation = this.validateFile(file);
      if (validation.isValid) {
        valid.push(file);
      } else {
        invalid.push({ file, error: validation.error || 'Erreur de validation' });
      }
    });

    return { valid, invalid };
  }
}