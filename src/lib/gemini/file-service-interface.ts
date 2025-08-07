/**
 * Interface commune pour les services de gestion de fichiers Gemini
 * Compatible avec les implémentations client et serveur
 */

// ===== TYPES ET INTERFACES =====

/**
 * Représente un fichier uploadé avec ses métadonnées
 */
export interface UploadedFile {
  /** Identifiant unique du fichier */
  id: string;
  /** Nom original du fichier */
  name: string;
  /** URI d'accès au fichier (peut être une URL ou data URI) */
  uri: string;
  /** Type MIME du fichier */
  mimeType: string;
  /** Taille du fichier en octets */
  size: number;
  /** Date et heure d'upload */
  uploadedAt: Date;
}

/**
 * Résultat de validation d'un fichier
 */
export interface FileValidationResult {
  /** Indique si le fichier est valide */
  isValid: boolean;
  /** Message d'erreur si le fichier n'est pas valide */
  error?: string;
  /** Code d'erreur spécifique */
  errorCode?: FileErrorCode;
}

/**
 * Résultat de validation de plusieurs fichiers
 */
export interface FileValidationResults {
  /** Fichiers valides */
  valid: File[];
  /** Fichiers invalides avec leurs erreurs */
  invalid: Array<{
    file: File;
    error: string;
    errorCode?: FileErrorCode;
  }>;
}

/**
 * Type de retour alternatif pour la compatibilité avec l'implémentation serveur
 * @deprecated Utilisez FileValidationResults à la place
 */
export type LegacyFileValidationResults = {
  valid: File[];
  invalid: Array<{ file: File; error: string }>;
};

/**
 * Informations sur les limites et contraintes des fichiers
 */
export interface FileLimits {
  /** Taille maximum autorisée en octets */
  maxFileSize: number;
  /** Taille maximum formatée pour affichage */
  maxFileSizeFormatted: string;
  /** Liste des types MIME supportés */
  supportedTypes: string[];
  /** Types supportés au format input file HTML */
  supportedTypesForInput: string;
}

/**
 * Informations sur l'environnement d'exécution
 */
export interface EnvironmentInfo {
  /** Indique si on est côté client */
  isClient: boolean;
  /** Indique si on est côté serveur */
  isServer: boolean;
  /** Indique si FileReader est disponible */
  hasFileReader: boolean;
  /** Indique si Blob est disponible */
  hasBlob: boolean;
}

/**
 * Codes d'erreur standardisés pour la gestion des fichiers
 */
export enum FileErrorCode {
  /** Fichier trop volumineux */
  FILE_TOO_LARGE = 'file_too_large',
  /** Type de fichier non supporté */
  UNSUPPORTED_TYPE = 'unsupported_type',
  /** Fichier invalide ou corrompu */
  INVALID_FILE = 'invalid_file',
  /** Échec de l'upload */
  UPLOAD_FAILED = 'upload_failed',
  /** Navigateur non supporté (spécifique client) */
  BROWSER_NOT_SUPPORTED = 'browser_not_supported',
  /** Erreur réseau (spécifique serveur) */
  NETWORK_ERROR = 'network_error',
  /** Quota dépassé */
  QUOTA_EXCEEDED = 'quota_exceeded'
}

// ===== INTERFACE PRINCIPALE =====

/**
 * Interface commune pour tous les services de gestion de fichiers
 * Doit être implémentée par ClientFileService et FileService
 */
export interface IFileService {
  // ===== MÉTHODES DE VALIDATION =====

  /**
   * Valide un fichier selon les contraintes définies
   * @param file - Le fichier à valider
   * @returns Résultat de la validation
   */
  validateFile(file: File): FileValidationResult;

  /**
   * Valide plusieurs fichiers à la fois
   * @param files - Les fichiers à valider
   * @returns Résultats de validation groupés
   */
  validateFiles(files: File[]): FileValidationResults | LegacyFileValidationResults;

  /**
   * Vérifie si un type MIME est supporté
   * @param mimeType - Le type MIME à vérifier
   * @returns true si le type est supporté
   */
  isFileTypeSupported(mimeType: string): boolean;

  // ===== MÉTHODES D'UPLOAD =====

  /**
   * Upload un fichier unique
   * @param file - Le fichier à uploader
   * @returns Promise du fichier uploadé avec ses métadonnées
   * @throws Error si l'upload échoue
   */
  uploadFile(file: File): Promise<UploadedFile>;

  /**
   * Upload plusieurs fichiers
   * @param files - Les fichiers à uploader
   * @returns Promise des fichiers uploadés
   * @throws Error si un ou plusieurs uploads échouent
   */
  uploadFiles(files: File[]): Promise<UploadedFile[]>;

  // ===== MÉTHODES D'INFORMATION =====

  /**
   * Retourne les types de fichiers supportés au format HTML input
   * @returns Chaîne de types pour l'attribut accept
   */
  getSupportedFileTypes(): string;

  /**
   * Retourne les informations sur les limites de fichiers
   * @returns Objet contenant les limites et contraintes
   */
  getFileLimits(): FileLimits;

  // ===== MÉTHODES DE STATUT (OPTIONNELLES) =====

  /**
   * Vérifie si le service est disponible et fonctionnel
   * @returns true si le service peut être utilisé
   * @optional Méthode optionnelle pour la compatibilité
   */
  isAvailable?(): boolean;

  /**
   * Retourne des informations sur l'environnement d'exécution
   * @returns Informations sur les capacités disponibles
   * @optional Méthode optionnelle pour la compatibilité
   */
  getEnvironmentInfo?(): EnvironmentInfo;
}

// ===== TYPES UTILITAIRES =====

/**
 * Configuration pour l'initialisation d'un service de fichiers
 */
export interface FileServiceConfig {
  /** Clé API (optionnelle pour le client) */
  apiKey?: string;
  /** Taille maximum des fichiers en octets */
  maxFileSize?: number;
  /** Types MIME supplémentaires à supporter */
  additionalTypes?: string[];
  /** Mode debug pour les logs */
  debug?: boolean;
}

/**
 * Statistiques d'utilisation du service
 */
export interface FileServiceStats {
  /** Nombre total de fichiers uploadés */
  totalUploads: number;
  /** Taille totale des fichiers uploadés */
  totalSize: number;
  /** Nombre d'erreurs rencontrées */
  errorCount: number;
  /** Dernière activité */
  lastActivity: Date;
}

/**
 * Options pour l'upload de fichiers
 */
export interface UploadOptions {
  /** Valider le fichier avant upload */
  validate?: boolean;
  /** Timeout en millisecondes */
  timeout?: number;
  /** Callback de progression (si supporté) */
  onProgress?: (progress: number) => void;
  /** Métadonnées supplémentaires */
  metadata?: Record<string, any>;
}

// ===== FACTORY TYPES =====

/**
 * Type pour identifier le type de service à créer
 */
export type FileServiceType = 'client' | 'server' | 'auto';

/**
 * Interface pour le factory pattern
 */
export interface IFileServiceFactory {
  /**
   * Crée une instance du service approprié
   * @param type - Type de service à créer
   * @param config - Configuration optionnelle
   * @returns Instance du service
   */
  createService(type: FileServiceType, config?: FileServiceConfig): IFileService;

  /**
   * Détecte automatiquement le type de service à utiliser
   * @returns Type de service recommandé
   */
  detectServiceType(): FileServiceType;
}

// ===== CONSTANTES =====

/**
 * Constantes par défaut pour les services de fichiers
 */
export const FILE_SERVICE_DEFAULTS = {
  /** Taille maximum par défaut (10MB) */
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  
  /** Types MIME supportés par défaut */
  SUPPORTED_TYPES: [
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
    'video/x-msvideo',
    'video/ogg',
    // Audio
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'audio/mp4',
    'audio/webm',
    'audio/aac'
  ] as const,
  
  /** Types pour input HTML */
  INPUT_ACCEPT: 'image/*,video/*,audio/*',
  
  /** Timeout par défaut pour les uploads */
  UPLOAD_TIMEOUT: 30000, // 30 secondes
} as const;

// ===== GUARDS ET UTILITAIRES =====

/**
 * Vérifie si un objet implémente l'interface IFileService
 * @param obj - L'objet à vérifier
 * @returns true si l'objet implémente IFileService
 */
export function isFileService(obj: any): obj is IFileService {
  return obj &&
    typeof obj.validateFile === 'function' &&
    typeof obj.uploadFile === 'function' &&
    typeof obj.uploadFiles === 'function' &&
    typeof obj.isFileTypeSupported === 'function' &&
    typeof obj.getSupportedFileTypes === 'function' &&
    typeof obj.getFileLimits === 'function';
    // isAvailable et getEnvironmentInfo sont optionnelles
}

/**
 * Vérifie si on est dans un environnement client
 * @returns true si on est côté client
 */
export function isClientEnvironment(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Vérifie si on est dans un environnement serveur
 * @returns true si on est côté serveur
 */
export function isServerEnvironment(): boolean {
  return typeof window === 'undefined';
}

/**
 * Formate une taille de fichier en format lisible
 * @param bytes - Taille en octets
 * @returns Taille formatée
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Génère un ID unique pour un fichier
 * @returns ID unique
 */
export function generateFileId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `file_${timestamp}_${random}`;
}