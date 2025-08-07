/**
 * Specialized error boundary components for enhanced chat
 * Provides graceful fallbacks and error recovery for each component type
 */

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { errorReporter, performanceMonitor, FallbackProvider, ChatError } from '@/lib/chat/error-handling';

interface ErrorBoundaryState {
  hasError: boolean;
  errorType: string;
  errorId?: string;
  retryCount: number;
  fallbackMode: boolean;
  lastError?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  componentName: string;
  fallbackComponent?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
  enableFallback?: boolean;
}

/**
 * Base error boundary with common functionality
 */
class BaseErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId?: NodeJS.Timeout;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorType: 'general',
      retryCount: 0,
      fallbackMode: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      lastError: error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = errorReporter.reportError(
      this.getErrorType(),
      this.getErrorSeverity(error),
      error.message,
      {
        componentName: this.props.componentName,
        componentStack: errorInfo.componentStack,
        retryCount: this.state.retryCount
      },
      error.stack
    );

    this.setState({
      errorId,
      errorType: this.getErrorType()
    });

    // Record performance impact
    performanceMonitor.recordMetrics({
      errorCount: 1,
      recoveryTime: 0
    });

    // Call custom error handler
    this.props.onError?.(error, errorInfo);

    // Auto-retry for recoverable errors
    if (this.isRecoverableError(error) && this.state.retryCount < (this.props.maxRetries || 3)) {
      this.scheduleRetry();
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  private getErrorType(): ChatError['type'] {
    const componentName = this.props.componentName.toLowerCase();
    if (componentName.includes('markdown')) return 'markdown';
    if (componentName.includes('scroll')) return 'scroll';
    if (componentName.includes('control')) return 'controls';
    if (componentName.includes('security')) return 'security';
    return 'general';
  }

  private getErrorSeverity(error: Error): ChatError['severity'] {
    // Network errors are usually recoverable
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return 'medium';
    }
    
    // Security errors are critical
    if (error.message.includes('security') || error.message.includes('XSS')) {
      return 'critical';
    }
    
    // Rendering errors are usually medium severity
    if (error.message.includes('render') || error.message.includes('component')) {
      return 'medium';
    }
    
    return 'high';
  }

  private isRecoverableError(error: Error): boolean {
    const recoverablePatterns = [
      'network',
      'fetch',
      'timeout',
      'temporary',
      'rate limit'
    ];
    
    return recoverablePatterns.some(pattern => 
      error.message.toLowerCase().includes(pattern)
    );
  }

  private scheduleRetry = () => {
    const delay = Math.min(1000 * Math.pow(2, this.state.retryCount), 10000); // Max 10s delay
    
    this.retryTimeoutId = setTimeout(() => {
      this.handleRetry();
    }, delay);
  };

  private handleRetry = () => {
    const startTime = performance.now();
    
    this.setState(prevState => ({
      hasError: false,
      retryCount: prevState.retryCount + 1,
      fallbackMode: false,
      lastError: undefined
    }), () => {
      // Record recovery time
      const recoveryTime = performance.now() - startTime;
      performanceMonitor.recordMetrics({ recoveryTime });
      
      // Mark error as resolved if retry succeeds
      if (this.state.errorId) {
        errorReporter.resolveError(this.state.errorId);
      }
    });
  };

  private handleFallbackMode = () => {
    this.setState({
      fallbackMode: true,
      hasError: false
    });
  };

  render() {
    if (this.state.hasError) {
      // Show custom fallback if provided
      if (this.props.fallbackComponent) {
        return this.props.fallbackComponent;
      }

      // Show retry/fallback options
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl">⚠️</span>
            <h3 className="font-semibold text-red-800 dark:text-red-200">
              Erreur dans {this.props.componentName}
            </h3>
          </div>
          
          <p className="text-red-700 dark:text-red-300 mb-4">
            {this.state.lastError?.message || 'Une erreur inattendue s\'est produite.'}
          </p>
          
          <div className="flex space-x-2">
            {this.state.retryCount < (this.props.maxRetries || 3) && (
              <button
                onClick={this.handleRetry}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                type="button"
              >
                🔄 Réessayer ({this.state.retryCount + 1}/{this.props.maxRetries || 3})
              </button>
            )}
            
            {this.props.enableFallback && (
              <button
                onClick={this.handleFallbackMode}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
                type="button"
              >
                🛠️ Mode simplifié
              </button>
            )}
          </div>
          
          {process.env.NODE_ENV === 'development' && this.state.lastError && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-red-600 dark:text-red-400">
                Détails techniques
              </summary>
              <pre className="mt-2 p-2 bg-red-100 dark:bg-red-900/40 rounded text-xs overflow-auto">
                {this.state.lastError.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    if (this.state.fallbackMode) {
      return FallbackProvider.createFallbackComponent(
        this.props.componentName,
        this.state.lastError,
        () => this.setState({ fallbackMode: false, hasError: false })
      );
    }

    return this.props.children;
  }
}

/**
 * Specialized error boundary for MarkdownRenderer
 */
export class MarkdownErrorBoundary extends Component<
  Omit<ErrorBoundaryProps, 'componentName'> & { content?: string },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      errorType: 'markdown',
      retryCount: 0,
      fallbackMode: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      lastError: error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    errorReporter.reportError(
      'markdown',
      'medium',
      `Markdown rendering failed: ${error.message}`,
      {
        content: this.props.content?.substring(0, 200),
        componentStack: errorInfo.componentStack
      },
      error.stack
    );

    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      retryCount: this.state.retryCount + 1
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xl">📝</span>
            <span className="font-semibold text-yellow-800 dark:text-yellow-200">
              Erreur de rendu Markdown
            </span>
          </div>
          
          <p className="text-yellow-700 dark:text-yellow-300 mb-3">
            Le contenu n'a pas pu être rendu correctement. Affichage en texte brut.
          </p>
          
          {this.props.content && (
            <div className="bg-white dark:bg-gray-800 p-3 rounded border">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                {this.props.content}
              </pre>
            </div>
          )}
          
          <button
            onClick={this.handleRetry}
            className="mt-3 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm transition-colors"
            type="button"
          >
            🔄 Réessayer le rendu
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Specialized error boundary for ScrollController
 */
export class ScrollErrorBoundary extends Component<
  Omit<ErrorBoundaryProps, 'componentName'>,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      errorType: 'scroll',
      retryCount: 0,
      fallbackMode: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      lastError: error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    errorReporter.reportError(
      'scroll',
      'medium',
      `Scroll controller failed: ${error.message}`,
      {
        componentStack: errorInfo.componentStack
      },
      error.stack
    );

    this.props.onError?.(error, errorInfo);
  }

  private handleFallbackMode = () => {
    this.setState({
      hasError: false,
      fallbackMode: true
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative">
          <div className="absolute top-2 right-2 z-10 p-2 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded text-sm">
            <span className="text-orange-700 dark:text-orange-300">
              📜 Défilement manuel activé
            </span>
          </div>
          {this.props.children}
        </div>
      );
    }

    if (this.state.fallbackMode) {
      return (
        <div className="relative">
          <div className="absolute top-2 right-2 z-10 p-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
            <span className="text-blue-700 dark:text-blue-300">
              🛠️ Mode défilement simplifié
            </span>
          </div>
          {this.props.children}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Specialized error boundary for ChatControls
 */
export class ControlsErrorBoundary extends Component<
  Omit<ErrorBoundaryProps, 'componentName'>,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      errorType: 'controls',
      retryCount: 0,
      fallbackMode: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      lastError: error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    errorReporter.reportError(
      'controls',
      'high',
      `Chat controls failed: ${error.message}`,
      {
        componentStack: errorInfo.componentStack
      },
      error.stack
    );

    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Provide basic fallback controls
      return (
        <div className="flex items-center space-x-2">
          <div className="px-2 py-1 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs text-red-700 dark:text-red-300">
            ⚠️ Contrôles limités
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
            type="button"
            title="Actualiser la page"
          >
            🔄
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Main chat error boundary that wraps the entire chat widget
 */
export class ChatErrorBoundary extends BaseErrorBoundary {
  constructor(props: ErrorBoundaryProps) {
    super({ ...props, componentName: 'ChatWidget' });
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    super.componentDidCatch(error, errorInfo);

    // Additional chat-specific error handling
    if (error.message.includes('WebSocket') || error.message.includes('connection')) {
      // Handle connection errors
      this.handleConnectionError();
    }
  }

  private handleConnectionError() {
    // Show connection status
    const connectionStatus = document.createElement('div');
    connectionStatus.className = 'fixed bottom-4 left-4 p-3 bg-red-500 text-white rounded-lg shadow-lg z-50';
    connectionStatus.innerHTML = '📡 Connexion interrompue - Tentative de reconnexion...';
    document.body.appendChild(connectionStatus);

    // Remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(connectionStatus)) {
        document.body.removeChild(connectionStatus);
      }
    }, 5000);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bottom-4 right-4 w-96 max-w-[90vw] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">🤖</span>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              Chat temporairement indisponible
            </h3>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Une erreur technique empêche le fonctionnement du chat. Nos équipes travaillent à résoudre le problème.
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              type="button"
            >
              🔄 Actualiser
            </button>
            
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              type="button"
            >
              ✖️ Fermer
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              💡 <strong>Alternatives :</strong>
            </p>
            <ul className="mt-1 text-gray-600 dark:text-gray-400 text-xs space-y-1">
              <li>• Contactez-nous par email : contact@laurent-serre-developpement.fr</li>
              <li>• Consultez notre FAQ dans la section ressources</li>
              <li>• Revenez dans quelques minutes</li>
            </ul>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default BaseErrorBoundary;