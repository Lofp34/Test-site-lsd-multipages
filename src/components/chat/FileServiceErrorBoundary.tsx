/**
 * Error Boundary spécialisé pour le FileService
 * Capture les erreurs de chargement de modules et fournit des fallbacks gracieux
 * 
 * Requirements: 1.1, 4.1
 * - Capture les erreurs webpack de chargement de modules
 * - Fournit des fallbacks gracieux pour les erreurs
 * - Permet la récupération et le retry des services
 */

import React, { Component, ReactNode, ErrorInfo } from 'react';
import type { FileServiceType } from '@/lib/gemini/file-service-interface';

// ===== TYPES ET INTERFACES =====

/**
 * État de l'Error Boundary pour le FileService
 */
interface FileServiceErrorBoundaryState {
  /** Indique si une erreur s'est produite */
  hasError: boolean;
  /** Type d'erreur détecté */
  errorType: 'module_loading' | 'service_initialization' | 'webpack' | 'runtime' | 'unknown';
  /** Message d'erreur */
  errorMessage: string;
  /** Stack trace de l'erreur */
  errorStack?: string;
  /** Nombre de tentatives de récupération */
  retryCount: number;
  /** Indique si on est en mode fallback */
  fallbackMode: boolean;
  /** Type de service qui a échoué */
  failedServiceType?: FileServiceType;
  /** Timestamp de la dernière erreur */
  lastErrorTime: number;
}

/**
 * Props de l'Error Boundary
 */
interface FileServiceErrorBoundaryProps {
  /** Composants enfants à protéger */
  children: ReactNode;
  /** Callback appelé quand une erreur est capturée */
  onError?: (error: Error, errorInfo: ErrorInfo, errorType: string) => void;
  /** Callback appelé quand l'utilisateur demande un retry */
  onRetry?: () => void;
  /** Nombre maximum de tentatives automatiques */
  maxAutoRetries?: number;
  /** Délai entre les tentatives automatiques (ms) */
  retryDelay?: number;
  /** Désactive le mode fallback */
  disableFallback?: boolean;
  /** Message personnalisé pour l'utilisateur */
  customErrorMessage?: string;
  /** Affiche les détails techniques en développement */
  showTechnicalDetails?: boolean;
}

// ===== COMPOSANT PRINCIPAL =====

/**
 * Error Boundary spécialisé pour capturer les erreurs du FileService
 */
export class FileServiceErrorBoundary extends Component<
  FileServiceErrorBoundaryProps,
  FileServiceErrorBoundaryState
> {
  private retryTimeoutId?: NodeJS.Timeout;
  private readonly maxRetries: number;
  private readonly retryDelay: number;

  constructor(props: FileServiceErrorBoundaryProps) {
    super(props);
    
    this.maxRetries = props.maxAutoRetries ?? 2;
    this.retryDelay = props.retryDelay ?? 2000;
    
    this.state = {
      hasError: false,
      errorType: 'unknown',
      errorMessage: '',
      retryCount: 0,
      fallbackMode: false,
      lastErrorTime: 0
    };
  }

  /**
   * Méthode statique pour dériver l'état à partir d'une erreur
   */
  static getDerivedStateFromError(error: Error): Partial<FileServiceErrorBoundaryState> {
    const errorType = FileServiceErrorBoundary.classifyError(error);
    
    return {
      hasError: true,
      errorType,
      errorMessage: error.message,
      errorStack: error.stack,
      lastErrorTime: Date.now()
    };
  }

  /**
   * Classifie le type d'erreur pour un traitement approprié
   */
  private static classifyError(error: Error): FileServiceErrorBoundaryState['errorType'] {
    const message = error.message.toLowerCase();
    const stack = error.stack?.toLowerCase() || '';

    // Erreurs webpack spécifiques
    if (
      message.includes('cannot read properties of undefined (reading \'call\')') ||
      message.includes('module not found') ||
      message.includes('failed to resolve module') ||
      stack.includes('webpack')
    ) {
      return 'webpack';
    }

    // Erreurs de chargement de modules
    if (
      message.includes('loading chunk') ||
      message.includes('import') ||
      message.includes('dynamic import') ||
      message.includes('module')
    ) {
      return 'module_loading';
    }

    // Erreurs d'initialisation du service
    if (
      message.includes('fileservice') ||
      message.includes('service') ||
      message.includes('initialization') ||
      message.includes('constructor')
    ) {
      return 'service_initialization';
    }

    // Erreurs runtime
    if (
      message.includes('runtime') ||
      message.includes('execution') ||
      message.includes('function')
    ) {
      return 'runtime';
    }

    return 'unknown';
  }

  /**
   * Gère l'erreur capturée
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { errorType } = this.state;
    
    // Log détaillé pour le debugging
    console.group('🚨 FileService Error Boundary - Erreur capturée');
    console.error('Type d\'erreur:', errorType);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    console.error('Component Stack:', errorInfo.componentStack);
    console.groupEnd();

    // Appeler le callback d'erreur si fourni
    this.props.onError?.(error, errorInfo, errorType);

    // Tentative de récupération automatique pour certains types d'erreurs
    if (this.shouldAttemptAutoRecovery(errorType) && this.state.retryCount < this.maxRetries) {
      this.scheduleAutoRetry();
    }
  }

  /**
   * Détermine si une récupération automatique doit être tentée
   */
  private shouldAttemptAutoRecovery(errorType: FileServiceErrorBoundaryState['errorType']): boolean {
    // Tentative de récupération pour les erreurs de chargement de modules
    return errorType === 'module_loading' || errorType === 'webpack';
  }

  /**
   * Programme une tentative de récupération automatique
   */
  private scheduleAutoRetry = (): void => {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }

    this.retryTimeoutId = setTimeout(() => {
      this.handleAutoRetry();
    }, this.retryDelay);
  };

  /**
   * Gère la tentative de récupération automatique
   */
  private handleAutoRetry = (): void => {
    console.log(`🔄 Tentative de récupération automatique ${this.state.retryCount + 1}/${this.maxRetries}`);
    
    this.setState(prevState => ({
      hasError: false,
      retryCount: prevState.retryCount + 1,
      fallbackMode: false,
      errorMessage: '',
      errorStack: undefined
    }));
  };

  /**
   * Gère la tentative de récupération manuelle
   */
  private handleManualRetry = (): void => {
    console.log('🔄 Tentative de récupération manuelle');
    
    this.setState({
      hasError: false,
      retryCount: 0, // Reset le compteur pour les tentatives manuelles
      fallbackMode: false,
      errorMessage: '',
      errorStack: undefined
    });

    // Appeler le callback de retry si fourni
    this.props.onRetry?.();
  };

  /**
   * Active le mode fallback
   */
  private handleFallbackMode = (): void => {
    console.log('🛠️ Activation du mode fallback');
    
    this.setState({
      hasError: false,
      fallbackMode: true
    });
  };

  /**
   * Nettoie les timeouts au démontage
   */
  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  /**
   * Génère le message d'erreur approprié selon le type
   */
  private getErrorMessage(): string {
    const { errorType, errorMessage } = this.state;
    const { customErrorMessage } = this.props;

    if (customErrorMessage) {
      return customErrorMessage;
    }

    switch (errorType) {
      case 'webpack':
        return 'Erreur de chargement des modules. Le service de fichiers ne peut pas être initialisé correctement.';
      
      case 'module_loading':
        return 'Impossible de charger les composants nécessaires. Vérifiez votre connexion internet.';
      
      case 'service_initialization':
        return 'Le service de gestion des fichiers n\'a pas pu démarrer. Certaines fonctionnalités peuvent être limitées.';
      
      case 'runtime':
        return 'Une erreur s\'est produite pendant l\'exécution. Le service peut être temporairement indisponible.';
      
      default:
        return errorMessage || 'Une erreur inattendue s\'est produite avec le service de fichiers.';
    }
  }

  /**
   * Génère les suggestions de résolution selon le type d'erreur
   */
  private getResolutionSuggestions(): string[] {
    const { errorType } = this.state;

    switch (errorType) {
      case 'webpack':
        return [
          'Actualisez la page pour recharger les modules',
          'Vérifiez que JavaScript est activé dans votre navigateur',
          'Essayez de vider le cache de votre navigateur'
        ];
      
      case 'module_loading':
        return [
          'Vérifiez votre connexion internet',
          'Réessayez dans quelques instants',
          'Actualisez la page si le problème persiste'
        ];
      
      case 'service_initialization':
        return [
          'Utilisez le mode simplifié en attendant',
          'Contactez le support si le problème persiste',
          'Vérifiez les paramètres de votre navigateur'
        ];
      
      default:
        return [
          'Réessayez l\'opération',
          'Actualisez la page si nécessaire',
          'Contactez le support technique'
        ];
    }
  }

  /**
   * Rendu du composant fallback simple
   */
  private renderSimpleFallback(): ReactNode {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">📁</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Mode simplifié
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Le service de fichiers fonctionne en mode limité. Certaines fonctionnalités avancées peuvent ne pas être disponibles.
        </p>
        <button
          onClick={this.handleManualRetry}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
          type="button"
        >
          🔄 Réessayer le mode complet
        </button>
      </div>
    );
  }

  /**
   * Rendu principal du composant
   */
  render(): ReactNode {
    const { children, disableFallback, showTechnicalDetails } = this.props;
    const { hasError, errorType, errorMessage, errorStack, retryCount, fallbackMode } = this.state;

    // Mode fallback actif
    if (fallbackMode && !disableFallback) {
      return (
        <>
          {this.renderSimpleFallback()}
          {children}
        </>
      );
    }

    // Pas d'erreur, rendu normal
    if (!hasError) {
      return children;
    }

    // Rendu de l'erreur
    const userMessage = this.getErrorMessage();
    const suggestions = this.getResolutionSuggestions();
    const canRetry = retryCount < this.maxRetries;
    const isDevelopment = process.env.NODE_ENV === 'development';

    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        {/* En-tête de l'erreur */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-shrink-0">
            <span className="text-2xl">⚠️</span>
          </div>
          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-200">
              Service de fichiers indisponible
            </h3>
            <p className="text-sm text-red-600 dark:text-red-300">
              Type d'erreur: {errorType.replace('_', ' ')}
            </p>
          </div>
        </div>

        {/* Message utilisateur */}
        <div className="mb-4">
          <p className="text-red-700 dark:text-red-300 mb-3">
            {userMessage}
          </p>

          {/* Suggestions de résolution */}
          <div className="bg-red-100 dark:bg-red-900/40 rounded-lg p-3">
            <p className="font-medium text-red-800 dark:text-red-200 mb-2">
              💡 Solutions suggérées:
            </p>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions utilisateur */}
        <div className="flex flex-wrap gap-2 mb-4">
          {canRetry && (
            <button
              onClick={this.handleManualRetry}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              type="button"
            >
              🔄 Réessayer ({retryCount}/{this.maxRetries})
            </button>
          )}

          {!disableFallback && (
            <button
              onClick={this.handleFallbackMode}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              type="button"
            >
              🛠️ Mode simplifié
            </button>
          )}

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            type="button"
          >
            🔄 Actualiser la page
          </button>
        </div>

        {/* Détails techniques (développement) */}
        {(isDevelopment || showTechnicalDetails) && errorStack && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
              🔧 Détails techniques
            </summary>
            <div className="mt-2 p-3 bg-red-100 dark:bg-red-900/40 rounded border">
              <div className="mb-2">
                <span className="font-medium text-red-800 dark:text-red-200">Message:</span>
                <p className="text-sm text-red-700 dark:text-red-300 font-mono">
                  {errorMessage}
                </p>
              </div>
              <div>
                <span className="font-medium text-red-800 dark:text-red-200">Stack trace:</span>
                <pre className="text-xs text-red-700 dark:text-red-300 font-mono overflow-auto max-h-40 mt-1 p-2 bg-red-50 dark:bg-red-900/60 rounded">
                  {errorStack}
                </pre>
              </div>
            </div>
          </details>
        )}

        {/* Informations de contact */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Besoin d'aide ?</strong> Si le problème persiste, contactez-nous :
          </p>
          <ul className="text-xs text-gray-500 dark:text-gray-500 mt-1 space-y-1">
            <li>📧 Email: contact@laurent-serre-developpement.fr</li>
            <li>🌐 Support: Section FAQ du site</li>
            <li>⏰ Délai de réponse: 24h en moyenne</li>
          </ul>
        </div>
      </div>
    );
  }
}

// ===== COMPOSANT WRAPPER SIMPLIFIÉ =====

/**
 * Wrapper simplifié pour une utilisation facile
 */
interface SimpleFileServiceErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error) => void;
}

export function SimpleFileServiceErrorBoundary({ 
  children, 
  onError 
}: SimpleFileServiceErrorBoundaryProps) {
  return (
    <FileServiceErrorBoundary
      onError={onError ? (error) => onError(error) : undefined}
      maxAutoRetries={1}
      retryDelay={1500}
    >
      {children}
    </FileServiceErrorBoundary>
  );
}

// ===== HOC POUR PROTECTION AUTOMATIQUE =====

/**
 * HOC pour protéger automatiquement un composant avec FileServiceErrorBoundary
 */
export function withFileServiceErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Partial<FileServiceErrorBoundaryProps>
) {
  const WithErrorBoundary = (props: P) => (
    <FileServiceErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </FileServiceErrorBoundary>
  );

  WithErrorBoundary.displayName = `withFileServiceErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithErrorBoundary;
}

// Export par défaut
export default FileServiceErrorBoundary;