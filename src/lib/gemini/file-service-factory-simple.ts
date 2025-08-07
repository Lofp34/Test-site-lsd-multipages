/**
 * Factory pattern simplifié pour la sélection automatique du service de fichiers
 * Version synchrone pour éviter les problèmes webpack
 */

import type { 
  IFileService, 
  IFileServiceFactory, 
  FileServiceType, 
  FileServiceConfig
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
 * Factory simplifié pour créer les services de fichiers
 */
export class SimpleFileServiceFactory implements IFileServiceFactory {
  private static instance: SimpleFileServiceFactory;

  private constructor() {}

  /**
   * Singleton pattern
   */
  static getInstance(): SimpleFileServiceFactory {
    if (!SimpleFileServiceFactory.instance) {
      SimpleFileServiceFactory.instance = new SimpleFileServiceFactory();
    }
    return SimpleFileServiceFactory.instance;
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
      // Fallback vers client par défaut
      return 'client';
    }
  }

  /**
   * Crée une instance du service approprié
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
    try {
      // Import synchrone du service client
      const { ClientFileService } = require('./file-service-client');
      return new ClientFileService(config);
    } catch (error) {
      throw new FileServiceFactoryError(
        `Impossible de charger le service client: ${error}`,
        'CLIENT_SERVICE_LOAD_FAILED'
      );
    }
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
      console.warn('Service serveur non disponible, fallback vers client:', error);
      return this.createClientService(config);
    }
  }
}

// ===== FONCTIONS UTILITAIRES =====

/**
 * Crée un service de fichiers (version synchrone)
 */
export function createFileService(
  type: FileServiceType = 'auto',
  config: FileServiceConfig = {}
): IFileService {
  const factory = SimpleFileServiceFactory.getInstance();
  return factory.createService(type, config);
}

/**
 * Détecte le type de service recommandé pour l'environnement actuel
 */
export function detectServiceType(): FileServiceType {
  const factory = SimpleFileServiceFactory.getInstance();
  return factory.detectServiceType();
}

/**
 * Vérifie si un type de service est disponible
 */
export function isServiceTypeAvailable(type: FileServiceType): boolean {
  try {
    const factory = SimpleFileServiceFactory.getInstance();
    const service = factory.createService(type);
    return service !== null;
  } catch {
    return false;
  }
}

// Export par défaut
export default SimpleFileServiceFactory;