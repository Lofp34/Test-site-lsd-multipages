/**
 * Exemple d'utilisation de FileServiceErrorBoundary
 * Montre comment intégrer l'error boundary avec le FileUploader
 */

import React from 'react';
import FileServiceErrorBoundary, { 
  SimpleFileServiceErrorBoundary,
  withFileServiceErrorBoundary 
} from './FileServiceErrorBoundary';
import FileUploader from './FileUploader';

// ===== EXEMPLE 1: UTILISATION BASIQUE =====

/**
 * Exemple d'utilisation basique avec FileUploader
 */
export function BasicFileUploaderWithErrorBoundary() {
  const handleFileSelect = (files: File[]) => {
    console.log('Fichiers sélectionnés:', files);
  };

  return (
    <FileServiceErrorBoundary
      onError={(error, errorInfo, errorType) => {
        console.error('Erreur FileService capturée:', { error, errorInfo, errorType });
        // Ici vous pourriez envoyer l'erreur à un service de monitoring
      }}
      onRetry={() => {
        console.log('Tentative de récupération du FileService');
        // Ici vous pourriez déclencher une action de récupération
      }}
    >
      <FileUploader
        onFileSelect={handleFileSelect}
        acceptedTypes={['image/*', 'video/*', 'audio/*']}
        maxFileSize={10 * 1024 * 1024} // 10MB
        maxFiles={5}
      />
    </FileServiceErrorBoundary>
  );
}

// ===== EXEMPLE 2: UTILISATION SIMPLIFIÉE =====

/**
 * Exemple avec le wrapper simplifié
 */
export function SimpleFileUploaderWithErrorBoundary() {
  const handleFileSelect = (files: File[]) => {
    console.log('Fichiers sélectionnés:', files);
  };

  const handleError = (error: Error) => {
    console.error('Erreur simple capturée:', error);
  };

  return (
    <SimpleFileServiceErrorBoundary onError={handleError}>
      <FileUploader
        onFileSelect={handleFileSelect}
        acceptedTypes={['image/*', 'video/*']}
        maxFileSize={5 * 1024 * 1024} // 5MB
        maxFiles={3}
      />
    </SimpleFileServiceErrorBoundary>
  );
}

// ===== EXEMPLE 3: UTILISATION AVEC HOC =====

/**
 * Composant FileUploader protégé automatiquement
 */
const ProtectedFileUploader = withFileServiceErrorBoundary(FileUploader, {
  customErrorMessage: 'Le service d\'upload de fichiers est temporairement indisponible.',
  maxAutoRetries: 2,
  retryDelay: 3000,
  onError: (error, errorInfo, errorType) => {
    // Logging personnalisé
    console.error(`Erreur ${errorType} dans FileUploader:`, error);
  }
});

export function HOCFileUploaderExample() {
  const handleFileSelect = (files: File[]) => {
    console.log('Fichiers sélectionnés via HOC:', files);
  };

  return (
    <ProtectedFileUploader
      onFileSelect={handleFileSelect}
      acceptedTypes={['image/*']}
      maxFileSize={2 * 1024 * 1024} // 2MB
      maxFiles={1}
    />
  );
}

// ===== EXEMPLE 4: CONFIGURATION AVANCÉE =====

/**
 * Exemple avec configuration avancée pour un environnement de production
 */
export function AdvancedFileUploaderWithErrorBoundary() {
  const handleFileSelect = (files: File[]) => {
    console.log('Fichiers sélectionnés (avancé):', files);
  };

  const handleError = (error: Error, errorInfo: React.ErrorInfo, errorType: string) => {
    // Envoi vers un service de monitoring (ex: Sentry, LogRocket, etc.)
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        tags: {
          component: 'FileService',
          errorType: errorType
        },
        extra: {
          componentStack: errorInfo.componentStack
        }
      });
    }

    // Analytics personnalisées
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: `FileService ${errorType}: ${error.message}`,
        fatal: false
      });
    }
  };

  const handleRetry = () => {
    // Logique de retry personnalisée
    console.log('Tentative de récupération avancée');
    
    // Vous pourriez ici:
    // - Recharger des modules spécifiques
    // - Réinitialiser des états globaux
    // - Déclencher des actions de récupération
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Upload de fichiers (Mode avancé)</h3>
      
      <FileServiceErrorBoundary
        onError={handleError}
        onRetry={handleRetry}
        maxAutoRetries={3}
        retryDelay={2000}
        showTechnicalDetails={process.env.NODE_ENV === 'development'}
        customErrorMessage="Notre service d'upload rencontre des difficultés. Nos équipes travaillent à résoudre le problème."
      >
        <div className="p-4 border border-gray-200 rounded-lg">
          <FileUploader
            onFileSelect={handleFileSelect}
            acceptedTypes={['image/*', 'video/*', 'audio/*']}
            maxFileSize={20 * 1024 * 1024} // 20MB
            maxFiles={10}
          />
        </div>
      </FileServiceErrorBoundary>
      
      <div className="text-sm text-gray-600">
        <p>💡 <strong>Fonctionnalités de récupération:</strong></p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Retry automatique pour les erreurs de réseau</li>
          <li>Mode fallback pour les erreurs de modules</li>
          <li>Monitoring et analytics intégrés</li>
          <li>Messages d'erreur personnalisés</li>
        </ul>
      </div>
    </div>
  );
}

// ===== EXEMPLE 5: INTÉGRATION DANS UN CHAT =====

/**
 * Exemple d'intégration dans un composant de chat complet
 */
interface ChatWithFileUploadProps {
  onSendMessage: (message: string, files?: File[]) => void;
}

export function ChatWithFileUpload({ onSendMessage }: ChatWithFileUploadProps) {
  const [message, setMessage] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleSend = () => {
    if (message.trim() || selectedFiles.length > 0) {
      onSendMessage(message, selectedFiles);
      setMessage('');
      setSelectedFiles([]);
    }
  };

  const handleFileServiceError = (error: Error, errorInfo: React.ErrorInfo, errorType: string) => {
    console.error('Erreur dans le chat FileService:', { error, errorInfo, errorType });
    
    // Notifier l'utilisateur que l'upload de fichiers est temporairement indisponible
    // mais que le chat texte fonctionne toujours
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat avec upload de fichiers</h2>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Zone de saisie de message */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez votre message..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none"
          rows={3}
        />
        
        {/* Zone d'upload de fichiers avec error boundary */}
        <FileServiceErrorBoundary
          onError={handleFileServiceError}
          customErrorMessage="L'upload de fichiers est temporairement indisponible, mais vous pouvez continuer à envoyer des messages texte."
          disableFallback={false}
        >
          <FileUploader
            onFileSelect={handleFileSelect}
            acceptedTypes={['image/*', 'video/*', 'audio/*']}
            maxFileSize={10 * 1024 * 1024}
            maxFiles={3}
          />
        </FileServiceErrorBoundary>
        
        {/* Affichage des fichiers sélectionnés */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Fichiers sélectionnés ({selectedFiles.length}):
            </p>
            <div className="space-y-1">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600 truncate">
                    {file.name}
                  </span>
                  <button
                    onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700 text-sm"
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Bouton d'envoi */}
        <button
          onClick={handleSend}
          disabled={!message.trim() && selectedFiles.length === 0}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
          type="button"
        >
          Envoyer {selectedFiles.length > 0 && `(${selectedFiles.length} fichier${selectedFiles.length > 1 ? 's' : ''})`}
        </button>
      </div>
    </div>
  );
}

// ===== EXEMPLE 6: TESTS ET DEBUGGING =====

/**
 * Composant pour tester différents types d'erreurs
 * Utile pour le développement et les tests
 */
export function ErrorBoundaryTestComponent() {
  const [errorType, setErrorType] = React.useState<'none' | 'webpack' | 'module' | 'service'>('none');

  const ErrorComponent = () => {
    switch (errorType) {
      case 'webpack':
        throw new Error("Cannot read properties of undefined (reading 'call')");
      case 'module':
        throw new Error("Loading chunk 1 failed");
      case 'service':
        throw new Error("FileService initialization failed");
      default:
        return <div className="p-4 bg-green-100 rounded">✅ Aucune erreur - Composant fonctionnel</div>;
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Ne pas afficher en production
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Test FileServiceErrorBoundary</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type d'erreur à simuler:
          </label>
          <select
            value={errorType}
            onChange={(e) => setErrorType(e.target.value as any)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="none">Aucune erreur</option>
            <option value="webpack">Erreur Webpack</option>
            <option value="module">Erreur de chargement de module</option>
            <option value="service">Erreur d'initialisation de service</option>
          </select>
        </div>
        
        <FileServiceErrorBoundary
          onError={(error, errorInfo, type) => {
            console.log('Test - Erreur capturée:', { error, errorInfo, type });
          }}
          showTechnicalDetails={true}
        >
          <ErrorComponent />
        </FileServiceErrorBoundary>
      </div>
    </div>
  );
}

// Export par défaut
export default {
  BasicFileUploaderWithErrorBoundary,
  SimpleFileUploaderWithErrorBoundary,
  HOCFileUploaderExample,
  AdvancedFileUploaderWithErrorBoundary,
  ChatWithFileUpload,
  ErrorBoundaryTestComponent
};