'use client';

import React, { useState, useEffect } from 'react';
import { ChatError, ChatErrorType } from '@/lib/gemini/types';
import { ErrorRecoveryAction } from '@/lib/gemini/error-handler';

interface ErrorMessageProps {
  error: ChatError;
  recoveryAction?: ErrorRecoveryAction;
  onRetry?: () => void;
  onDismiss?: () => void;
  onContactRedirect?: () => void;
  className?: string;
}

interface ErrorUIConfig {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  showRetry: boolean;
  showContact: boolean;
  autoHide: boolean;
  hideDelay: number;
}

const ERROR_CONFIGS: Record<ChatErrorType, ErrorUIConfig> = {
  [ChatErrorType.NETWORK_ERROR]: {
    icon: '🌐',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    showRetry: true,
    showContact: false,
    autoHide: false,
    hideDelay: 0
  },
  [ChatErrorType.API_UNAVAILABLE]: {
    icon: '⚠️',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    showRetry: true,
    showContact: true,
    autoHide: false,
    hideDelay: 0
  },
  [ChatErrorType.RATE_LIMIT]: {
    icon: '⏱️',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    showRetry: false,
    showContact: false,
    autoHide: true,
    hideDelay: 5000
  },
  [ChatErrorType.QUOTA_EXCEEDED]: {
    icon: '📊',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    showRetry: false,
    showContact: true,
    autoHide: false,
    hideDelay: 0
  },
  [ChatErrorType.FILE_TOO_LARGE]: {
    icon: '📁',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    showRetry: false,
    showContact: false,
    autoHide: true,
    hideDelay: 4000
  },
  [ChatErrorType.UNSUPPORTED_FILE]: {
    icon: '🚫',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    showRetry: false,
    showContact: false,
    autoHide: true,
    hideDelay: 4000
  },
  [ChatErrorType.UPLOAD_FAILED]: {
    icon: '📤',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    showRetry: true,
    showContact: false,
    autoHide: false,
    hideDelay: 0
  }
};

export default function ErrorMessage({
  error,
  recoveryAction,
  onRetry,
  onDismiss,
  onContactRedirect,
  className = ''
}: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const config = ERROR_CONFIGS[error.type];

  // Gestion de l'auto-hide
  useEffect(() => {
    if (config.autoHide && config.hideDelay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, config.hideDelay);

      return () => clearTimeout(timer);
    }
  }, [config.autoHide, config.hideDelay, onDismiss]);

  // Gestion du countdown pour retry
  useEffect(() => {
    if (recoveryAction?.type === 'retry' && recoveryAction.delay) {
      const totalSeconds = Math.ceil(recoveryAction.delay / 1000);
      setCountdown(totalSeconds);

      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [recoveryAction]);

  const handleRetry = async () => {
    if (isRetrying || !onRetry) return;

    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  const handleContactRedirect = () => {
    if (recoveryAction?.redirectUrl) {
      window.open(recoveryAction.redirectUrl, '_blank');
    } else {
      window.open('/contact', '_blank');
    }
    onContactRedirect?.();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`
        relative rounded-lg border p-4 mb-4 shadow-sm transition-all duration-300
        ${config.bgColor} ${config.borderColor} ${config.color}
        ${className}
      `}
      role="alert"
      aria-live="polite"
    >
      {/* Header avec icône et titre */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg" role="img" aria-label="Error icon">
            {config.icon}
          </span>
          <h4 className="font-semibold text-sm">
            {getErrorTitle(error.type)}
          </h4>
        </div>
        
        <button
          onClick={handleDismiss}
          className={`
            text-gray-400 hover:text-gray-600 transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
            rounded-full p-1
          `}
          aria-label="Fermer le message d'erreur"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Message d'erreur */}
      <p className="text-sm mb-3 leading-relaxed">
        {error.userMessage}
      </p>

      {/* Informations de récupération */}
      {recoveryAction && (
        <div className="mb-3">
          {recoveryAction.type === 'retry' && recoveryAction.delay && countdown && (
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
              <span>Nouvelle tentative dans {countdown}s...</span>
            </div>
          )}
          
          {recoveryAction.fallbackMessage && (
            <div className="text-xs text-gray-600 bg-white/50 rounded p-2 border border-gray-200">
              <span className="font-medium">Alternative :</span> {recoveryAction.fallbackMessage}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {config.showRetry && onRetry && (
          <button
            onClick={handleRetry}
            disabled={isRetrying || (countdown !== null && countdown > 0)}
            className={`
              inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isRetrying || (countdown !== null && countdown > 0)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : `bg-white ${config.color} border ${config.borderColor} hover:bg-gray-50 focus:ring-gray-500`
              }
            `}
            aria-label={isRetrying ? 'Tentative en cours...' : 'Réessayer'}
          >
            {isRetrying ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                <span>Tentative...</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Réessayer</span>
              </>
            )}
          </button>
        )}

        {config.showContact && (
          <button
            onClick={handleContactRedirect}
            className={`
              inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md
              bg-primary-accent text-white hover:bg-primary-accent/90
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-accent
            `}
            aria-label="Contacter Laurent Serre"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contacter</span>
          </button>
        )}

        {recoveryAction?.userAction && (
          <div className="text-xs text-gray-600 italic">
            {recoveryAction.userAction}
          </div>
        )}
      </div>

      {/* Barre de progression pour auto-hide */}
      {config.autoHide && config.hideDelay > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
          <div
            className={`h-full bg-current transition-all duration-100 ease-linear`}
            style={{
              width: '100%',
              animation: `shrink ${config.hideDelay}ms linear forwards`
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

/**
 * Obtient le titre approprié pour chaque type d'erreur
 */
function getErrorTitle(errorType: ChatErrorType): string {
  const titles = {
    [ChatErrorType.NETWORK_ERROR]: 'Problème de connexion',
    [ChatErrorType.API_UNAVAILABLE]: 'Service indisponible',
    [ChatErrorType.RATE_LIMIT]: 'Limite atteinte',
    [ChatErrorType.QUOTA_EXCEEDED]: 'Quota dépassé',
    [ChatErrorType.FILE_TOO_LARGE]: 'Fichier trop volumineux',
    [ChatErrorType.UNSUPPORTED_FILE]: 'Format non supporté',
    [ChatErrorType.UPLOAD_FAILED]: 'Échec de l\'upload'
  };

  return titles[errorType] || 'Erreur';
}

/**
 * Hook pour gérer les messages d'erreur
 */
export function useErrorMessage() {
  const [currentError, setCurrentError] = useState<{
    error: ChatError;
    recoveryAction?: ErrorRecoveryAction;
  } | null>(null);

  const showError = (error: ChatError, recoveryAction?: ErrorRecoveryAction) => {
    setCurrentError({ error, recoveryAction });
  };

  const hideError = () => {
    setCurrentError(null);
  };

  return {
    currentError,
    showError,
    hideError
  };
}