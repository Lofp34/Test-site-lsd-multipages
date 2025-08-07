/**
 * Factory pattern pour la sélection automatique du service de fichiers
 * Détecte l'environnement et charge le service approprié avec fallback et lazy loading
 */

import type { 
  IFileService, 
  IFileServiceFactory, 
  FileServiceType, 
  FileServiceConfig,
  EnvironmentInfo
} from './file-service-interface';
import { isClientEnvironment, isServerEnvironment } from './file-service-interface';

/**
 * Erreurs spécifiques au factory
 */
export class FileServiceFactoryError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'FileServiceFactoryError';
  }
}

/**
 * Options pour la création du service
 */
export interface CreateServiceOptions extends FileServiceConfig {
  /** Force l'utilisation d'un service spécifique même si non optimal */
  forceType?: FileServiceType;
  /** Désactive le lazy loading */
  disableLazyLoading?: boolean;
  /** Timeout pour le chargement des modules (ms) */
  loadTimeout?: number;
}

/**
 * Cache des instances de services pour éviter les rechargements
 */
class ServiceCache {
  private static instances = new Map<string, IFileService>();
  
  static get(key: string): IFileService | undefined {
    return this.instances.get(key);
  }
  
  static set(key: string, service: IFileService): void {
    this.instances.set(key, service);
  }
  
  static clear(): void {
    this.instances.clear();
  }
  
  static has(key: string): boolean {
    return this.instances.has(key);
  }
}

/**
 * Factory principal pour la création de services de fichiers
 */
export class FileServiceFactory implements IFileServiceFactory {
  private static instance: FileServiceFactory;
  private loadingPromises = new Map<string, Promise<IFileService>>();

  /**
   * Singleton pattern pour éviter les instances multiples
   */
  static getInstance(): FileServiceFactory {
    if (!FileServiceFactory.instance) {
      FileServiceFactory.instance = new FileServiceFactory();
    }
    return FileServiceFactory.instance;
  }

  /**
   * Détecte automatiquement le type de service à utiliser
   */
  detectServiceType(): FileServiceType {
    if (isClientEnvironment()) {
      return 'client';
    } else if (isServerEnvironment()) {
      return 'server';
    } else {
      // Environnement indéterminé, on privilégie le client par sécurité
      return 'client';
    }
  }

  /**
   * Crée une instance du service approprié avec gestion des erreurs et fallback
   */
  createService(
    type: FileServiceType = 'auto', 
    config: FileServiceConfig = {}
  ): IFileService {
    const resolvedType = type === 'auto' ? this.detectServiceType() : type;
    
    try {
      if (resolvedType === 'client') {
        return this.createClientService(config);
      } else if (resolvedType === 'server') {
        return this.createServerService(config);
      } else {
        // Fallback vers client par défaut
        return this.createClientService(config);
      }
    } catch (error) {
      // En cas d'erreur, essayer le fallback
      try {
        return this.createClientService(config);
      } catch (fallbackError) {
        throw new FileServiceFactoryError(
          `Impossible de créer le service de fichiers: ${error}`,
          'SERVICE_CREATION_FAILED'
        );
      }
    }
  }

  /**
   * Crée une instance du service client
   */
  private createClientService(config: FileServiceConfig): IFileService {
    // Import synchrone du service client
    const { ClientFileService } = require('./file-service-client');
    return new ClientFileService(config);
  }

  /**
   * Crée une instance du service serveur
   */
  private createServerService(config: FileServiceConfig): IFileService {
    try {
      // Import synchrone du service serveur
      const { FileService } = require('./file-service');
      return new FileService(config);
    } catch (error) {
      // Si le service serveur n'est pas disponible, fallback vers client
      return this.createClientService(config);
    }
  }

  /**
   * Charge le service avec mécanisme de fallback
   */
  private async loadServiceWithFallback(
    type: FileServiceType, 
    options: CreateServiceOptions
  ): Promise<IFileService> {
    const timeout = options.loadTimeout || 10000; // 10 secondes par défaut

    try {
      // Tentative de chargement du service principal
      return await this.loadServiceWithTimeout(type, options, timeout);
    } catch (primaryError) {
      console.warn(`Échec du chargement du service ${type}:`, primaryError);

      // Tentative de fallback
      const fallbackType = this.getFallbackType(type);
      if (fallbackType && fallbackType !== type) {
        try {
          console.log(`Tentative de fallback vers ${fallbackType}`);
          return await this.loadServiceWithTimeout(fallbackType, options, timeout);
        } catch (fallbackError) {
          console.error(`Échec du fallback vers ${fallbackType}:`, fallbackError);
        }
      }

      // Si tout échoue, on lance une erreur détaillée
      throw new FileServiceFactoryError(
        `Impossible de charger le service de fichiers. Type demandé: ${type}, Erreur: ${primaryError instanceof Error ? primaryError.message : 'Erreur inconnue'}`,
        'SERVICE_LOAD_FAILED'
      );
    }
  }

  /**
   * Charge un service avec timeout
   */
  private async loadServiceWithTimeout(
    type: FileServiceType, 
    options: CreateServiceOptions, 
    timeout: number
  ): Promise<IFileService> {
    return new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new FileServiceFactoryError(
          `Timeout lors du chargement du service ${type} (${timeout}ms)`,
          'LOAD_TIMEOUT'
        ));
      }, timeout);

      try {
        const service = await this.loadService(type, options);
        clearTimeout(timeoutId);
        resolve(service);
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  /**
   * Charge le service spécifique selon le type
   */
  private async loadService(type: FileServiceType, options: CreateServiceOptions): Promise<IFileService> {
    switch (type) {
      case 'client':
        return this.loadClientService(options);
      
      case 'server':
        return this.loadServerService(options);
      
      default:
        throw new FileServiceFactoryError(
          `Type de service non supporté: ${type}`,
          'UNSUPPORTED_SERVICE_TYPE'
        );
    }
  }

  /**
   * Charge le service client avec lazy loading
   */
  private async loadClientService(options: CreateServiceOptions): Promise<IFileService> {
    try {
      // Vérification de l'environnement
      if (!isClientEnvironment()) {
        throw new Error('Service client demandé mais environnement serveur détecté');
      }

      // Import dynamique du service client
      const { ClientFileService } = await import('./file-service-client');
      
      // Création et validation de l'instance
      const service = new ClientFileService();
      
      // Vérification que le service implémente bien l'interface
      if (!this.validateServiceInterface(service)) {
        throw new Error('Le service client ne respecte pas l\'interface IFileService');
      }

      return service;
    } catch (error) {
      throw new FileServiceFactoryError(
        `Impossible de charger le service client: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        'CLIENT_SERVICE_LOAD_FAILED'
      );
    }
  }

  /**
   * Charge le service serveur avec lazy loading
   */
  private async loadServerService(options: CreateServiceOptions): Promise<IFileService> {
    try {
      // Vérification de l'environnement
      if (!isServerEnvironment()) {
        throw new Error('Service serveur demandé mais environnement client détecté');
      }

      // Vérification de la clé API
      const apiKey = options.apiKey || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Clé API Gemini requise pour le service serveur');
      }

      // Import dynamique du service serveur
      const { FileService } = await import('./file-service');
      
      // Création et validation de l'instance
      const service = new FileService(apiKey);
      
      // Vérification que le service implémente bien l'interface
      if (!this.validateServiceInterface(service)) {
        throw new Error('Le service serveur ne respecte pas l\'interface IFileService');
      }

      return service;
    } catch (error) {
      throw new FileServiceFactoryError(
        `Impossible de charger le service serveur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        'SERVER_SERVICE_LOAD_FAILED'
      );
    }
  }

  /**
   * Détermine le type de fallback approprié
   */
  private getFallbackType(originalType: FileServiceType): FileServiceType | null {
    switch (originalType) {
      case 'server':
        // Si le serveur échoue, on peut essayer le client
        return isClientEnvironment() ? 'client' : null;
      
      case 'client':
        // Si le client échoue et qu'on est sur serveur, on peut essayer le serveur
        return isServerEnvironment() ? 'server' : null;
      
      default:
        return null;
    }
  }

  /**
   * Valide qu'un service implémente correctement l'interface IFileService
   */
  private validateServiceInterface(service: any): service is IFileService {
    const requiredMethods = [
      'validateFile',
      'uploadFile', 
      'uploadFiles',
      'isFileTypeSupported',
      'getSupportedFileTypes',
      'getFileLimits',
      'validateFiles'
    ];

    return requiredMethods.every(method => typeof service[method] === 'function');
  }

  /**
   * Génère une clé de cache unique pour un service
   */
  private generateCacheKey(type: FileServiceType, options: CreateServiceOptions): string {
    const keyParts = [
      type,
      options.apiKey ? 'with-api-key' : 'no-api-key',
      options.maxFileSize || 'default-size',
      JSON.stringify(options.additionalTypes || [])
    ];
    
    return keyParts.join('|');
  }

  /**
   * Obtient des informations sur l'environnement d'exécution
   */
  getEnvironmentInfo(): EnvironmentInfo {
    return {
      isClient: isClientEnvironment(),
      isServer: isServerEnvironment(),
      hasFileReader: typeof window !== 'undefined' && !!window.FileReader,
      hasBlob: typeof window !== 'undefined' && !!window.Blob
    };
  }

  /**
   * Nettoie le cache des services (utile pour les tests)
   */
  clearCache(): void {
    ServiceCache.clear();
    this.loadingPromises.clear();
  }

  /**
   * Vérifie si un service est disponible dans le cache
   */
  isServiceCached(type: FileServiceType, options: CreateServiceOptions = {}): boolean {
    const cacheKey = this.generateCacheKey(type, options);
    return ServiceCache.has(cacheKey);
  }

  /**
   * Précharge un service pour améliorer les performances
   */
  async preloadService(type: FileServiceType, options: CreateServiceOptions = {}): Promise<void> {
    try {
      await this.createService(type, options);
    } catch (error) {
      console.warn(`Échec du préchargement du service ${type}:`, error);
    }
  }
}

// ===== FONCTIONS UTILITAIRES EXPORTÉES =====

/**
 * Fonction helper pour créer rapidement un service
 */
export async function createFileService(
  type: FileServiceType = 'auto',
  options: CreateServiceOptions = {}
): Promise<IFileService> {
  const factory = FileServiceFactory.getInstance();
  return factory.createService(type, options);
}

/**
 * Fonction helper synchrone (utilise le cache)
 */
export function createFileServiceSync(
  type: FileServiceType = 'auto',
  config: FileServiceConfig = {}
): IFileService {
  const factory = FileServiceFactory.getInstance();
  return factory.createService(type, config);
}

/**
 * Détecte le type de service recommandé pour l'environnement actuel
 */
export function detectServiceType(): FileServiceType {
  const factory = FileServiceFactory.getInstance();
  return factory.detectServiceType();
}

/**
 * Obtient des informations sur l'environnement d'exécution
 */
export function getEnvironmentInfo(): EnvironmentInfo {
  const factory = FileServiceFactory.getInstance();
  return factory.getEnvironmentInfo();
}

/**
 * Nettoie le cache des services
 */
export function clearServiceCache(): void {
  const factory = FileServiceFactory.getInstance();
  factory.clearCache();
}

/**
 * Précharge un service pour de meilleures performances
 */
export async function preloadFileService(
  type: FileServiceType = 'auto',
  options: CreateServiceOptions = {}
): Promise<void> {
  const factory = FileServiceFactory.getInstance();
  return factory.preloadService(type, options);
}

// Export par défaut de la factory
export default FileServiceFactory;