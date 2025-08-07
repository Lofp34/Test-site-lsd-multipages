/**
 * Exemple d'utilisation du FileServiceFactory
 * Démontre comment utiliser le factory pattern pour résoudre l'erreur webpack
 */

import { createFileService, detectServiceType, getEnvironmentInfo } from './file-service-factory';
import type { IFileService } from './file-service-interface';

/**
 * Exemple d'utilisation basique du factory
 */
export async function basicFactoryUsage(): Promise<IFileService> {
  try {
    // Détection automatique de l'environnement et création du service approprié
    const service = await createFileService('auto');
    
    console.log('Service créé avec succès:', {
      type: detectServiceType(),
      environment: getEnvironmentInfo()
    });
    
    return service;
  } catch (error) {
    console.error('Erreur lors de la création du service:', error);
    throw error;
  }
}

/**
 * Exemple d'utilisation avec options personnalisées
 */
export async function advancedFactoryUsage(): Promise<IFileService> {
  try {
    // Création avec options spécifiques
    const service = await createFileService('auto', {
      maxFileSize: 5 * 1024 * 1024, // 5MB
      debug: true,
      loadTimeout: 5000 // 5 secondes
    });
    
    return service;
  } catch (error) {
    console.error('Erreur lors de la création du service avancé:', error);
    throw error;
  }
}

/**
 * Exemple d'utilisation dans un composant React (pattern recommandé)
 */
export class FileServiceManager {
  private static instance: IFileService | null = null;
  private static loadingPromise: Promise<IFileService> | null = null;

  /**
   * Obtient une instance du service (singleton pattern)
   */
  static async getInstance(): Promise<IFileService> {
    if (this.instance) {
      return this.instance;
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = this.createService();
    
    try {
      this.instance = await this.loadingPromise;
      return this.instance;
    } finally {
      this.loadingPromise = null;
    }
  }

  /**
   * Crée le service avec gestion d'erreurs
   */
  private static async createService(): Promise<IFileService> {
    try {
      return await createFileService('auto', {
        debug: process.env.NODE_ENV === 'development'
      });
    } catch (error) {
      console.error('Impossible de créer le service de fichiers:', error);
      
      // Fallback vers un service minimal si tout échoue
      throw new Error('Service de fichiers indisponible');
    }
  }

  /**
   * Réinitialise l'instance (utile pour les tests)
   */
  static reset(): void {
    this.instance = null;
    this.loadingPromise = null;
  }
}

/**
 * Hook React pour utiliser le FileService (exemple pour la prochaine tâche)
 */
export function useFileServiceExample() {
  // Cette fonction sera implémentée dans la tâche 4
  // Elle utilisera le FileServiceManager pour obtenir le service
  
  return {
    getService: () => FileServiceManager.getInstance(),
    isLoading: false, // À implémenter
    error: null // À implémenter
  };
}