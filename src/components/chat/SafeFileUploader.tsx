/**
 * FileUploader sécurisé avec FileServiceErrorBoundary intégré
 * Wrapper qui combine FileUploader avec la gestion d'erreurs
 * 
 * Requirements: 1.1, 4.1
 * - Intègre FileServiceErrorBoundary pour capturer les erreurs webpack
 * - Fournit une interface cohérente pour l'upload de fichiers
 * - Gère les fallbacks gracieux en cas d'erreur de service
 */

import React from 'react';
import FileServiceErrorBoundary from './FileServiceErrorBoundary';
import FileUploader from './FileUploader';
import type { FileUploaderProps } from '@/lib/gemini/file-service-interface';

// ===== TYPES ET INTERFACES =====

/**
 * Props pour le SafeFileUploader
 * Étend les props du FileUploader avec des options d'error boundary
 */
export interface SafeFileUploaderProps extends FileUploaderProps {
  /** Callback appelé quand une erreur de service est capturée */
  onServiceError?: (error: Error, errorType: string) => void;
  /** Message d'erreur personnalisé pour les problèmes de service */
  customErrorMessage?: string;
  /** Nombre maximum de tentatives de récupération automatique */
  maxRetries?: number;
  /** Délai entre les tentatives de récupération (ms) */
  retryDelay?: number;
  /** Désactive le mode fallback */
  disableFallback?: boolean;
  /** Affiche les détails techniques (développement) */
  showTechnicalDetails?: boolean;
  /** Classe CSS personnalisée pour le conteneur */
  containerClassName?: string;
}

// ===== COMPOSANT PRINCIPAL =====

/**
 * FileUploader sécurisé avec gestion d'erreurs intégrée
 */
export default function SafeFileUploader({
  onServiceError,
  customErrorMessage,
  maxRetries = 2,
  retryDelay = 2000,
  disableFallback = false,
  showTechnicalDetails = false,
  containerClassName = '',
  ...fileUploaderProps
}: SafeFileUploaderProps) {

  // ===== GESTIONNAIRES D'ÉVÉNEMENTS =====

  /**
   * Gère les erreurs capturées par l'error boundary
   */
  const handleServiceError = React.useCallback((
    error: Error, 
    errorInfo: React.ErrorInfo, 
    errorType: string
  ) => {
    console.error('SafeFileUploader - Erreur de service capturée:', {
      error: error.message,
      errorType,
      componentStack: errorInfo.componentStack
    });

    // Appeler le callback personnalisé si fourni
    onServiceError?.(error, errorType);

    // Envoyer à un service de monitoring si disponible
    if (typeof window !== 'undefined') {
      // Sentry
      if ((window as any).Sentry) {
        (window as any).Sentry.captureException(error, {
          tags: {
            component: 'SafeFileUploader',
            errorType: errorType
          },
          extra: {
            componentStack: errorInfo.componentStack,
            fileUploaderProps: JSON.stringify(fileUploaderProps, null, 2)
          }
        });
      }

      // Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: `FileUploader ${errorType}: ${error.message}`,
          fatal: false,
          custom_map: {
            component: 'SafeFileUploader'
          }
        });
      }
    }
  }, [onServiceError, fileUploaderProps]);

  /**
   * Gère les tentatives de récupération
   */
  const handleRetry = React.useCallback(() => {
    console.log('SafeFileUploader - Tentative de récupération du service');
    
    // Vous pourriez ici déclencher des actions spécifiques :
    // - Recharger des modules
    // - Réinitialiser des états
    // - Notifier d'autres composants
  }, []);

  // ===== RENDU =====

  return (
    <div className={`safe-file-uploader ${containerClassName}`.trim()}>
      <FileServiceErrorBoundary
        onError={handleServiceError}
        onRetry={handleRetry}
        maxAutoRetries={maxRetries}
        retryDelay={retryDelay}
        disableFallback={disableFallback}
        customErrorMessage={customErrorMessage}
        showTechnicalDetails={showTechnicalDetails}
      >
        <FileUploader {...fileUploaderProps} />
      </FileServiceErrorBoundary>
    </div>
  );
}

// ===== COMPOSANTS SPÉCIALISÉS =====

/**
 * SafeFileUploader optimisé pour le chat
 */
export function ChatSafeFileUploader(props: SafeFileUploaderProps) {
  return (
    <SafeFileUploader
      {...props}
      customErrorMessage="L'upload de fichiers est temporairement indisponible, mais vous pouvez continuer à envoyer des messages texte."
      maxRetries={3}
      retryDelay={1500}
      containerClassName="chat-file-uploader"
    />
  );
}

/**
 * SafeFileUploader pour les formulaires
 */
export function FormSafeFileUploader(props: SafeFileUploaderProps) {
  return (
    <SafeFileUploader
      {...props}
      customErrorMessage="Le service d'upload rencontre des difficultés. Veuillez réessayer ou contacter le support."
      maxRetries={2}
      retryDelay={3000}
      disableFallback={false}
      containerClassName="form-file-uploader"
    />
  );
}

/**
 * SafeFileUploader pour les médias (images/vidéos)
 */
export function MediaSafeFileUploader(props: SafeFileUploaderProps) {
  return (
    <SafeFileUploader
      {...props}
      acceptedTypes={props.acceptedTypes || ['image/*', 'video/*']}
      customErrorMessage="L'upload de médias est temporairement indisponible. Nos équipes travaillent à résoudre le problème."
      maxRetries={3}
      retryDelay={2000}
      containerClassName="media-file-uploader"
    />
  );
}

// ===== HOOKS UTILITAIRES =====

/**
 * Hook pour utiliser SafeFileUploader avec état
 */
export function useSafeFileUploader() {
  const [uploadState, setUploadState] = React.useState<{
    isUploading: boolean;
    hasError: boolean;
    errorMessage: string | null;
    uploadedFiles: File[];
  }>({
    isUploading: false,
    hasError: false,
    errorMessage: null,
    uploadedFiles: []
  });

  const handleFileSelect = React.useCallback((files: File[]) => {
    setUploadState(prev => ({
      ...prev,
      isUploading: true,
      hasError: false,
      errorMessage: null
    }));

    // Simuler l'upload (remplacez par votre logique réelle)
    setTimeout(() => {
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        uploadedFiles: files
      }));
    }, 1000);
  }, []);

  const handleServiceError = React.useCallback((error: Error, errorType: string) => {
    setUploadState(prev => ({
      ...prev,
      isUploading: false,
      hasError: true,
      errorMessage: `Erreur ${errorType}: ${error.message}`
    }));
  }, []);

  const clearError = React.useCallback(() => {
    setUploadState(prev => ({
      ...prev,
      hasError: false,
      errorMessage: null
    }));
  }, []);

  const reset = React.useCallback(() => {
    setUploadState({
      isUploading: false,
      hasError: false,
      errorMessage: null,
      uploadedFiles: []
    });
  }, []);

  return {
    uploadState,
    handleFileSelect,
    handleServiceError,
    clearError,
    reset
  };
}

// ===== EXEMPLE D'UTILISATION =====

/**
 * Exemple d'utilisation complète
 */
export function SafeFileUploaderExample() {
  const {
    uploadState,
    handleFileSelect,
    handleServiceError,
    clearError,
    reset
  } = useSafeFileUploader();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Upload sécurisé de fichiers</h3>
      
      {/* Affichage de l'état */}
      {uploadState.hasError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-red-700 text-sm">{uploadState.errorMessage}</p>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {uploadState.isUploading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm">Upload en cours...</p>
        </div>
      )}

      {uploadState.uploadedFiles.length > 0 && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">
            {uploadState.uploadedFiles.length} fichier(s) uploadé(s) avec succès
          </p>
        </div>
      )}

      {/* Composant SafeFileUploader */}
      <SafeFileUploader
        onFileSelect={handleFileSelect}
        onServiceError={handleServiceError}
        acceptedTypes={['image/*', 'video/*', 'audio/*']}
        maxFileSize={10 * 1024 * 1024} // 10MB
        maxFiles={5}
        maxRetries={3}
        retryDelay={2000}
        customErrorMessage="Notre service d'upload rencontre des difficultés techniques."
      />

      {/* Actions */}
      {(uploadState.uploadedFiles.length > 0 || uploadState.hasError) && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
            type="button"
          >
            Réinitialiser
          </button>
        </div>
      )}
    </div>
  );
}

// Export des composants
export {
  SafeFileUploader as default,
  ChatSafeFileUploader,
  FormSafeFileUploader,
  MediaSafeFileUploader,
  SafeFileUploaderExample
};