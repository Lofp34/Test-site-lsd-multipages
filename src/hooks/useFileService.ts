/**
 * Hook React pour gérer l'état du FileService
 * Gère le chargement, les erreurs et optimise les performances
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { 
  IFileService, 
  FileServiceType, 
  FileValidationResult,
  FileValidationResults,
  UploadedFile,
  FileLimits
} from '../lib/gemini/file-service-interface';
import { 
  createFileService, 
  detectServiceType
} from '../lib/gemini/file-service-factory-simple';
import type { FileServiceConfig, EnvironmentInfo } from '../lib/gemini/file-service-interface';
import { isClientEnvironment, isServerEnvironment } from '../lib/gemini/file-service-interface';

/**
 * Obtient les informations sur l'environnement d'exécution
 */
function getEnvironmentInfo(): EnvironmentInfo {
  return {
    isClient: isClientEnvironment(),
    isServer: isServerEnvironment(),
    hasFileReader: typeof FileReader !== 'undefined',
    hasBlob: typeof Blob !== 'undefined'
  };
}

// ===== TYPES ET INTERFACES =====

/**
 * État du hook useFileService
 */
export interface FileServiceState {
  /** Instance du service de fichiers (null si pas encore chargé) */
  service: IFileService | null;
  /** Indique si le service est en cours de chargement */
  isLoading: boolean;
  /** Erreur de chargement du service */
  error: Error | null;
  /** Type de service détecté/utilisé */
  serviceType: FileServiceType;
  /** Informations sur l'environnement */
  environmentInfo: EnvironmentInfo;
  /** Indique si le service est prêt à être utilisé */
  isReady: boolean;
}

/**
 * Options de configuration du hook
 */
export interface UseFileServiceOptions extends FileServiceConfig {
  /** Type de service à utiliser ('auto' par défaut) */
  serviceType?: FileServiceType;
  /** Désactive le chargement automatique au montage */
  disableAutoLoad?: boolean;
  /** Callback appelé quand le service est chargé avec succès */
  onServiceLoaded?: (service: IFileService) => void;
  /** Callback appelé en cas d'erreur de chargement */
  onLoadError?: (error: Error) => void;
  /** Nombre de tentatives de rechargement en cas d'erreur */
  retryAttempts?: number;
  /** Délai entre les tentatives de rechargement (ms) */
  retryDelay?: number;
}

/**
 * Valeur de retour du hook useFileService
 */
export interface UseFileServiceReturn extends FileServiceState {
  // ===== MÉTHODES DE CONTRÔLE =====
  
  /** Recharge le service manuellement */
  reloadService: () => Promise<void>;
  /** Nettoie l'état et libère les ressources */
  cleanup: () => void;
  /** Réessaie le chargement en cas d'erreur */
  retry: () => Promise<void>;

  // ===== MÉTHODES DE VALIDATION =====
  
  /** Valide un fichier (wrapper optimisé) */
  validateFile: (file: File) => FileValidationResult | null;
  /** Valide plusieurs fichiers (wrapper optimisé) */
  validateFiles: (files: File[]) => FileValidationResults | null;
  /** Vérifie si un type MIME est supporté */
  isFileTypeSupported: (mimeType: string) => boolean;

  // ===== MÉTHODES D'UPLOAD =====
  
  /** Upload un fichier avec gestion d'état */
  uploadFile: (file: File) => Promise<UploadedFile | null>;
  /** Upload plusieurs fichiers avec gestion d'état */
  uploadFiles: (files: File[]) => Promise<UploadedFile[] | null>;

  // ===== MÉTHODES D'INFORMATION =====
  
  /** Obtient les types de fichiers supportés */
  getSupportedFileTypes: () => string;
  /** Obtient les limites de fichiers */
  getFileLimits: () => FileLimits | null;
}

// ===== HOOK PRINCIPAL =====

/**
 * Hook pour gérer le FileService avec état, erreurs et optimisations
 */
export function useFileService(options: UseFileServiceOptions = {}): UseFileServiceReturn {
  const {
    serviceType = 'auto',
    disableAutoLoad = false,
    onServiceLoaded,
    onLoadError,
    retryAttempts = 3,
    retryDelay = 1000,
    ...serviceOptions
  } = options;

  // ===== ÉTAT LOCAL =====
  
  const [state, setState] = useState<FileServiceState>(() => ({
    service: null,
    isLoading: false,
    error: null,
    serviceType: serviceType === 'auto' ? detectServiceType() : serviceType,
    environmentInfo: getEnvironmentInfo(),
    isReady: false
  }));

  // Refs pour éviter les re-renders inutiles
  const retryCountRef = useRef(0);
  const loadingPromiseRef = useRef<Promise<void> | null>(null);
  const mountedRef = useRef(true);

  // ===== FONCTIONS DE CHARGEMENT =====

  /**
   * Charge le service de fichiers
   */
  const loadService = useCallback(async (): Promise<void> => {
    // Éviter les chargements multiples simultanés
    if (loadingPromiseRef.current) {
      return loadingPromiseRef.current;
    }

    const loadPromise = (async () => {
      if (!mountedRef.current) return;

      setState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        isReady: false
      }));

      try {
        const service = await createFileService(state.serviceType, serviceOptions);
        
        if (!mountedRef.current) return;

        setState(prev => ({
          ...prev,
          service,
          isLoading: false,
          error: null,
          isReady: true
        }));

        // Reset retry count on success
        retryCountRef.current = 0;

        // Callback de succès
        onServiceLoaded?.(service);

      } catch (error) {
        if (!mountedRef.current) return;

        const errorObj = error instanceof Error ? error : new Error('Erreur de chargement du service');
        
        setState(prev => ({
          ...prev,
          service: null,
          isLoading: false,
          error: errorObj,
          isReady: false
        }));

        // Callback d'erreur
        onLoadError?.(errorObj);

        console.error('Erreur lors du chargement du FileService:', errorObj);
      } finally {
        loadingPromiseRef.current = null;
      }
    })();

    loadingPromiseRef.current = loadPromise;
    return loadPromise;
  }, [state.serviceType, serviceOptions, onServiceLoaded, onLoadError]);

  /**
   * Recharge le service manuellement
   */
  const reloadService = useCallback(async (): Promise<void> => {
    retryCountRef.current = 0;
    loadingPromiseRef.current = null;
    await loadService();
  }, [loadService]);

  /**
   * Réessaie le chargement avec backoff exponentiel
   */
  const retry = useCallback(async (): Promise<void> => {
    if (retryCountRef.current >= retryAttempts) {
      console.warn(`Nombre maximum de tentatives atteint (${retryAttempts})`);
      return;
    }

    retryCountRef.current++;
    const delay = retryDelay * Math.pow(2, retryCountRef.current - 1); // Backoff exponentiel

    console.log(`Tentative de rechargement ${retryCountRef.current}/${retryAttempts} dans ${delay}ms`);

    await new Promise(resolve => setTimeout(resolve, delay));
    await loadService();
  }, [loadService, retryAttempts, retryDelay]);

  /**
   * Nettoie l'état et libère les ressources
   */
  const cleanup = useCallback((): void => {
    loadingPromiseRef.current = null;
    retryCountRef.current = 0;
    
    setState(prev => ({
      ...prev,
      service: null,
      isLoading: false,
      error: null,
      isReady: false
    }));
  }, []);

  // ===== MÉTHODES DE SERVICE OPTIMISÉES =====

  /**
   * Valide un fichier (wrapper optimisé avec memoization)
   */
  const validateFile = useCallback((file: File): FileValidationResult | null => {
    if (!state.service || !state.isReady) {
      return null;
    }

    try {
      return state.service.validateFile(file);
    } catch (error) {
      console.error('Erreur lors de la validation du fichier:', error);
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Erreur de validation'
      };
    }
  }, [state.service, state.isReady]);

  /**
   * Valide plusieurs fichiers (wrapper optimisé)
   */
  const validateFiles = useCallback((files: File[]): FileValidationResults | null => {
    if (!state.service || !state.isReady) {
      return null;
    }

    try {
      return state.service.validateFiles(files);
    } catch (error) {
      console.error('Erreur lors de la validation des fichiers:', error);
      return {
        valid: [],
        invalid: files.map(file => ({
          file,
          error: error instanceof Error ? error.message : 'Erreur de validation'
        }))
      };
    }
  }, [state.service, state.isReady]);

  /**
   * Vérifie si un type MIME est supporté
   */
  const isFileTypeSupported = useCallback((mimeType: string): boolean => {
    if (!state.service || !state.isReady) {
      return false;
    }

    try {
      return state.service.isFileTypeSupported(mimeType);
    } catch (error) {
      console.error('Erreur lors de la vérification du type MIME:', error);
      return false;
    }
  }, [state.service, state.isReady]);

  /**
   * Upload un fichier avec gestion d'état
   */
  const uploadFile = useCallback(async (file: File): Promise<UploadedFile | null> => {
    if (!state.service || !state.isReady) {
      console.warn('Service non disponible pour l\'upload');
      return null;
    }

    try {
      return await state.service.uploadFile(file);
    } catch (error) {
      console.error('Erreur lors de l\'upload du fichier:', error);
      throw error; // Re-throw pour que le composant puisse gérer l'erreur
    }
  }, [state.service, state.isReady]);

  /**
   * Upload plusieurs fichiers avec gestion d'état
   */
  const uploadFiles = useCallback(async (files: File[]): Promise<UploadedFile[] | null> => {
    if (!state.service || !state.isReady) {
      console.warn('Service non disponible pour l\'upload');
      return null;
    }

    try {
      return await state.service.uploadFiles(files);
    } catch (error) {
      console.error('Erreur lors de l\'upload des fichiers:', error);
      throw error; // Re-throw pour que le composant puisse gérer l'erreur
    }
  }, [state.service, state.isReady]);

  /**
   * Obtient les types de fichiers supportés (memoized)
   */
  const getSupportedFileTypes = useCallback((): string => {
    if (!state.service || !state.isReady) {
      return '';
    }

    try {
      return state.service.getSupportedFileTypes();
    } catch (error) {
      console.error('Erreur lors de la récupération des types supportés:', error);
      return '';
    }
  }, [state.service, state.isReady]);

  /**
   * Obtient les limites de fichiers (memoized)
   */
  const getFileLimits = useCallback((): FileLimits | null => {
    if (!state.service || !state.isReady) {
      return null;
    }

    try {
      return state.service.getFileLimits();
    } catch (error) {
      console.error('Erreur lors de la récupération des limites:', error);
      return null;
    }
  }, [state.service, state.isReady]);

  // ===== EFFETS =====

  /**
   * Chargement automatique au montage
   */
  useEffect(() => {
    if (!disableAutoLoad) {
      loadService();
    }

    // Cleanup au démontage
    return () => {
      mountedRef.current = false;
    };
  }, [disableAutoLoad, loadService]);

  /**
   * Mise à jour des informations d'environnement si nécessaire
   */
  useEffect(() => {
    const currentEnvInfo = getEnvironmentInfo();
    if (JSON.stringify(currentEnvInfo) !== JSON.stringify(state.environmentInfo)) {
      setState(prev => ({
        ...prev,
        environmentInfo: currentEnvInfo
      }));
    }
  }, [state.environmentInfo]);

  // ===== VALEUR DE RETOUR =====

  return useMemo(() => ({
    // État
    ...state,
    
    // Méthodes de contrôle
    reloadService,
    cleanup,
    retry,
    
    // Méthodes de validation
    validateFile,
    validateFiles,
    isFileTypeSupported,
    
    // Méthodes d'upload
    uploadFile,
    uploadFiles,
    
    // Méthodes d'information
    getSupportedFileTypes,
    getFileLimits
  }), [
    state,
    reloadService,
    cleanup,
    retry,
    validateFile,
    validateFiles,
    isFileTypeSupported,
    uploadFile,
    uploadFiles,
    getSupportedFileTypes,
    getFileLimits
  ]);
}

// ===== HOOKS UTILITAIRES =====

/**
 * Hook simplifié pour la validation de fichiers uniquement
 */
export function useFileValidation(options: UseFileServiceOptions = {}) {
  const { validateFile, validateFiles, isFileTypeSupported, getSupportedFileTypes, getFileLimits, isReady } = useFileService(options);
  
  return useMemo(() => ({
    validateFile,
    validateFiles,
    isFileTypeSupported,
    getSupportedFileTypes,
    getFileLimits,
    isReady
  }), [validateFile, validateFiles, isFileTypeSupported, getSupportedFileTypes, getFileLimits, isReady]);
}

/**
 * Hook simplifié pour l'upload de fichiers uniquement
 */
export function useFileUpload(options: UseFileServiceOptions = {}) {
  const { uploadFile, uploadFiles, isReady, isLoading, error } = useFileService(options);
  
  return useMemo(() => ({
    uploadFile,
    uploadFiles,
    isReady,
    isLoading,
    error
  }), [uploadFile, uploadFiles, isReady, isLoading, error]);
}

/**
 * Hook pour obtenir uniquement les informations sur le service
 */
export function useFileServiceInfo(options: UseFileServiceOptions = {}) {
  const { serviceType, environmentInfo, getSupportedFileTypes, getFileLimits, isReady } = useFileService(options);
  
  return useMemo(() => ({
    serviceType,
    environmentInfo,
    getSupportedFileTypes,
    getFileLimits,
    isReady
  }), [serviceType, environmentInfo, getSupportedFileTypes, getFileLimits, isReady]);
}

// Export par défaut
export default useFileService;