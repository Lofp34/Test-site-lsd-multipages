/**
 * Service de gestion des fichiers côté client pour l'API Gemini
 * Version allégée compatible navigateur sans dépendances externes
 * Utilise uniquement les APIs navigateur (FileReader, Blob, etc.)
 */

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

export interface FileValidationResults {
  valid: File[];
  invalid: Array<{ file: File; error: string; errorCode?: FileErrorCode }>;
}

export interface FileLimits {
  maxFileSize: number;
  maxFileSizeFormatted: string;
  supportedTypes: string[];
  supportedTypesForInput: string;
}

export enum FileErrorCode {
  FILE_TOO_LARGE = 'file_too_large',
  UNSUPPORTED_TYPE = 'unsupported_type',
  INVALID_FILE = 'invalid_file',
  UPLOAD_FAILED = 'upload_failed',
  BROWSER_NOT_SUPPORTED = 'browser_not_supported'
}

/**
 * Service de fichiers optimisé pour le client
 * Ne dépend d'aucun module externe, utilise uniquement les APIs navigateur
 */
export class ClientFileService {
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly SUPPORTED_TYPES = [
    // Images
    'image/jpeg',
    'image/jpg',
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
    'video/ogg',
    // Audio
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'audio/mp4',
    'audio/webm',
    'audio/aac'
  ];

  constructor() {
    // Vérification de la compatibilité navigateur
    this.checkBrowserSupport();
  }

  /**
   * Vérifie si le navigateur supporte les APIs nécessaires
   */
  private checkBrowserSupport(): void {
    if (typeof window === 'undefined') {
      throw new Error('ClientFileService ne peut être utilisé que côté client');
    }

    if (!window.FileReader) {
      throw new Error('FileReader API non supportée par ce navigateur');
    }

    if (!window.Blob) {
      throw new Error('Blob API non supportée par ce navigateur');
    }
  }

  /**
   * Valide un fichier avant upload
   */
  validateFile(file: File): FileValidationResult {
    // Vérification de base du fichier
    if (!file || !file.name || file.size === 0) {
      return {
        isValid: false,
        error: 'Fichier invalide ou vide',
        errorCode: FileErrorCode.INVALID_FILE
      };
    }

    // Vérification de la taille
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: `Le fichier est trop volumineux (${this.formatFileSize(file.size)}). Taille maximum autorisée: ${this.formatFileSize(this.MAX_FILE_SIZE)}`,
        errorCode: FileErrorCode.FILE_TOO_LARGE
      };
    }

    // Vérification du type MIME - si vide ou générique, on vérifie l'extension
    if (file.type === 'application/octet-stream' || !file.type) {
      const extension = this.getFileExtension(file.name);
      if (!this.isExtensionSupported(extension)) {
        return {
          isValid: false,
          error: `Extension de fichier non supportée: ${extension}`,
          errorCode: FileErrorCode.UNSUPPORTED_TYPE
        };
      }
    } else if (!this.isFileTypeSupported(file.type)) {
      return {
        isValid: false,
        error: `Type de fichier non supporté: ${file.type}. Types acceptés: images, vidéos, audio`,
        errorCode: FileErrorCode.UNSUPPORTED_TYPE
      };
    }

    return { isValid: true };
  }

  /**
   * Upload un fichier (simulation côté client avec conversion base64)
   */
  async uploadFile(file: File): Promise<UploadedFile> {
    // Validation préalable
    const validation = this.validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    try {
      // Conversion du fichier en base64 pour utilisation côté client
      const base64Data = await this.fileToBase64(file);
      
      // Création de l'objet UploadedFile
      const uploadedFile: UploadedFile = {
        id: this.generateFileId(),
        name: file.name,
        uri: `data:${file.type};base64,${base64Data}`,
        mimeType: file.type || this.getMimeTypeFromExtension(file.name),
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
   * Upload multiple fichiers
   */
  async uploadFiles(files: File[]): Promise<UploadedFile[]> {
    if (!files || files.length === 0) {
      return [];
    }

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
    if (!mimeType) return false;
    return this.SUPPORTED_TYPES.includes(mimeType.toLowerCase());
  }

  /**
   * Retourne les types de fichiers supportés pour l'input file
   */
  getSupportedFileTypes(): string {
    return 'image/*,video/*,audio/*';
  }

  /**
   * Obtient des informations sur les limites de fichiers
   */
  getFileLimits(): FileLimits {
    return {
      maxFileSize: this.MAX_FILE_SIZE,
      maxFileSizeFormatted: this.formatFileSize(this.MAX_FILE_SIZE),
      supportedTypes: [...this.SUPPORTED_TYPES],
      supportedTypesForInput: this.getSupportedFileTypes()
    };
  }

  /**
   * Valide plusieurs fichiers à la fois
   */
  validateFiles(files: File[]): FileValidationResults {
    const valid: File[] = [];
    const invalid: Array<{ file: File; error: string; errorCode?: FileErrorCode }> = [];

    files.forEach(file => {
      const validation = this.validateFile(file);
      if (validation.isValid) {
        valid.push(file);
      } else {
        invalid.push({ 
          file, 
          error: validation.error || 'Erreur de validation',
          errorCode: validation.errorCode
        });
      }
    });

    return { valid, invalid };
  }

  /**
   * Convertit un fichier en base64 en utilisant FileReader
   */
  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const result = reader.result as string;
          // Enlever le préfixe data:type;base64,
          const base64 = result.split(',')[1];
          if (!base64) {
            reject(new Error('Impossible de convertir le fichier en base64'));
            return;
          }
          resolve(base64);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Erreur lors de la lecture du fichier'));
      };
      
      reader.onabort = () => {
        reject(new Error('Lecture du fichier interrompue'));
      };
      
      reader.readAsDataURL(file);
    });
  }

  /**
   * Génère un ID unique pour un fichier
   */
  private generateFileId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `file_${timestamp}_${random}`;
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
   * Extrait l'extension d'un nom de fichier
   */
  private getFileExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) return '';
    return filename.slice(lastDotIndex + 1).toLowerCase();
  }

  /**
   * Vérifie si une extension de fichier est supportée
   */
  private isExtensionSupported(extension: string): boolean {
    const supportedExtensions = [
      // Images
      'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg',
      // Vidéos
      'mp4', 'mpeg', 'mpg', 'mov', 'webm', 'avi', 'ogv',
      // Audio
      'mp3', 'wav', 'ogg', 'aac', 'm4a', 'weba'
    ];
    
    return supportedExtensions.includes(extension.toLowerCase());
  }

  /**
   * Détermine le type MIME à partir de l'extension de fichier
   */
  private getMimeTypeFromExtension(filename: string): string {
    const extension = this.getFileExtension(filename);
    
    const mimeMap: Record<string, string> = {
      // Images
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'bmp': 'image/bmp',
      'svg': 'image/svg+xml',
      // Vidéos
      'mp4': 'video/mp4',
      'mpeg': 'video/mpeg',
      'mpg': 'video/mpeg',
      'mov': 'video/quicktime',
      'webm': 'video/webm',
      'avi': 'video/x-msvideo',
      'ogv': 'video/ogg',
      // Audio
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',
      'aac': 'audio/aac',
      'm4a': 'audio/mp4',
      'weba': 'audio/webm'
    };
    
    return mimeMap[extension] || 'application/octet-stream';
  }

  /**
   * Vérifie si le service est disponible (toujours true pour la version client)
   */
  isAvailable(): boolean {
    try {
      this.checkBrowserSupport();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Obtient des informations sur l'environnement d'exécution
   */
  getEnvironmentInfo(): { 
    isClient: boolean; 
    isServer: boolean; 
    hasFileReader: boolean; 
    hasBlob: boolean; 
  } {
    return {
      isClient: typeof window !== 'undefined',
      isServer: typeof window === 'undefined',
      hasFileReader: typeof window !== 'undefined' && !!window.FileReader,
      hasBlob: typeof window !== 'undefined' && !!window.Blob
    };
  }
}