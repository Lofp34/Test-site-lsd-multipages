/**
 * Service de gestion des fichiers pour l'API Gemini
 * Gère l'upload, la validation et la gestion des fichiers multimodaux
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

export interface UploadedFile {
  id: string;
  name: string;
  uri: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  errorCode?: FileErrorCode;
}

export enum FileErrorCode {
  FILE_TOO_LARGE = 'file_too_large',
  UNSUPPORTED_TYPE = 'unsupported_type',
  INVALID_FILE = 'invalid_file',
  UPLOAD_FAILED = 'upload_failed'
}

export class FileService {
  private ai: GoogleGenerativeAI;
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
    this.ai = new GoogleGenerativeAI(apiKey);
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
   * Upload un fichier vers l'API Gemini Files
   * Note: Cette implémentation est simplifiée car l'API réelle peut différer
   */
  async uploadFile(file: File): Promise<UploadedFile> {
    // Validation préalable
    const validation = this.validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    try {
      // Pour l'instant, on simule l'upload car l'API Files peut ne pas être disponible
      // dans cette version du SDK
      const mockUploadedFile: UploadedFile = {
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        uri: `data:${file.type};base64,${await this.fileToBase64(file)}`,
        mimeType: file.type,
        size: file.size,
        uploadedAt: new Date()
      };

      return mockUploadedFile;
    } catch (error) {
      console.error('Erreur lors de l\'upload du fichier:', error);
      throw new Error(`Échec de l'upload: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Convertit un fichier en base64 pour l'utilisation avec l'API
   */
  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Enlever le préfixe data:type;base64,
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
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
  getFileLimits() {
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
  validateFiles(files: File[]): { valid: File[]; invalid: Array<{ file: File; error: string }> } {
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