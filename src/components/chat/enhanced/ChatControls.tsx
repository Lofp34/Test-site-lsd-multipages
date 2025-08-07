'use client';

import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import MobileButton from './MobileButton';
import { AriaHelper, KeyboardNavigationManager, AccessibilityConfig, defaultAccessibilityConfig } from '@/lib/chat/accessibility';

interface ChatControlsProps {
  onClose: () => void;
  onMinimize?: () => void;
  onFullscreen?: () => void;
  isMinimized: boolean;
  isFullscreen: boolean;
  isStreaming?: boolean;
  showCloseConfirmation?: boolean;
  className?: string;
  isClosed?: boolean;
  onReopen?: () => void;
  accessibilityConfig?: AccessibilityConfig;
}

interface ControlsConfig {
  showMinimizeButton: boolean;
  showFullscreenButton: boolean;
  confirmCloseOnStreaming: boolean;
  keyboardShortcuts: KeyboardShortcuts;
}

interface KeyboardShortcuts {
  close: string; // 'Escape'
  minimize: string; // 'Ctrl+M'
  fullscreen: string; // 'F11'
  scrollToTop: string; // 'Ctrl+Home'
  scrollToBottom: string; // 'Ctrl+End'
}

const defaultConfig: ControlsConfig = {
  showMinimizeButton: true,
  showFullscreenButton: true,
  confirmCloseOnStreaming: true,
  keyboardShortcuts: {
    close: 'Escape',
    minimize: 'Ctrl+M',
    fullscreen: 'F11',
    scrollToTop: 'Ctrl+Home',
    scrollToBottom: 'Ctrl+End'
  }
};

const ChatControls: React.FC<ChatControlsProps> = ({
  onClose,
  onMinimize,
  onFullscreen,
  isMinimized,
  isFullscreen,
  isStreaming = false,
  showCloseConfirmation = true,
  className = '',
  isClosed = false,
  onReopen,
  accessibilityConfig = defaultAccessibilityConfig
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<'close' | 'minimize' | null>(null);
  const { isMobile, getMobileClasses } = useMobileOptimization();
  const controlsRef = useRef<HTMLDivElement>(null);
  const keyboardManagerRef = useRef<KeyboardNavigationManager | null>(null);

  // Handle close with confirmation if streaming
  const handleClose = useCallback(() => {
    if (isStreaming && showCloseConfirmation && defaultConfig.confirmCloseOnStreaming) {
      setShowConfirmDialog(true);
      setPendingAction('close');
    } else {
      onClose();
    }
  }, [isStreaming, showCloseConfirmation, onClose]);

  // Handle minimize with confirmation if streaming
  const handleMinimize = useCallback(() => {
    if (!onMinimize) return;
    
    if (isStreaming && showCloseConfirmation && defaultConfig.confirmCloseOnStreaming) {
      setShowConfirmDialog(true);
      setPendingAction('minimize');
    } else {
      onMinimize();
    }
  }, [isStreaming, showCloseConfirmation, onMinimize]);

  // Handle fullscreen toggle
  const handleFullscreen = useCallback(() => {
    if (onFullscreen) {
      onFullscreen();
    }
  }, [onFullscreen]);

  // Confirm action
  const confirmAction = useCallback(() => {
    if (pendingAction === 'close') {
      onClose();
    } else if (pendingAction === 'minimize' && onMinimize) {
      onMinimize();
    }
    setShowConfirmDialog(false);
    setPendingAction(null);
  }, [pendingAction, onClose, onMinimize]);

  // Cancel action
  const cancelAction = useCallback(() => {
    setShowConfirmDialog(false);
    setPendingAction(null);
  }, []);

  // Initialize keyboard navigation manager
  useEffect(() => {
    if (controlsRef.current && accessibilityConfig.keyboardNavigationEnabled) {
      keyboardManagerRef.current = new KeyboardNavigationManager(controlsRef.current);
    }

    return () => {
      keyboardManagerRef.current?.destroy();
    };
  }, [accessibilityConfig.keyboardNavigationEnabled]);

  // Keyboard shortcuts handler
  useEffect(() => {
    if (!accessibilityConfig.keyboardNavigationEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle confirmation dialog shortcuts first (higher priority)
      if (showConfirmDialog) {
        if (event.key === 'Enter') {
          event.preventDefault();
          confirmAction();
          return;
        } else if (event.key === 'Escape') {
          event.preventDefault();
          cancelAction();
          return;
        }
      }

      // Escape key to close (only if no dialog is shown)
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      // Ctrl/Cmd + M to minimize
      if ((event.ctrlKey || event.metaKey) && event.key === 'm') {
        event.preventDefault();
        handleMinimize();
        return;
      }

      // F11 for fullscreen (let browser handle it, but track state)
      if (event.key === 'F11') {
        // Don't prevent default - let browser handle fullscreen
        handleFullscreen();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, handleMinimize, handleFullscreen, showConfirmDialog, confirmAction, cancelAction]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      // This would be handled by parent component
      // Just for tracking purposes here
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // If chat is closed, show reopening indicator
  if (isClosed && onReopen) {
    return (
      <div className={getMobileClasses(
        `fixed bottom-6 right-6 z-50 ${className}`,
        'bottom-4 right-4'
      )}>
        <MobileButton
          onClick={onReopen}
          variant="primary"
          size={isMobile ? 'lg' : 'md'}
          className="group relative bg-gradient-to-br from-blue-ink to-mint-green rounded-full shadow-lg hover:shadow-xl"
          aria-label="Rouvrir le chat"
          title="Rouvrir le chat Laurent Serre"
          icon={
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          }
        >
          {/* Notification dot for new messages */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-soft rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          
          {/* Tooltip - only show on desktop */}
          {!isMobile && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Chat Laurent Serre
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </MobileButton>
      </div>
    );
  }

  return (
    <>
      {/* Main controls */}
      <div 
        ref={controlsRef}
        className={getMobileClasses(
          `flex items-center space-x-2 ${className}`,
          'space-x-1'
        )}
        role="toolbar"
        aria-label="Contrôles du chat"
        aria-orientation="horizontal"
      >
        {/* Fullscreen button - Enhanced for mobile touch */}
        {defaultConfig.showFullscreenButton && onFullscreen && (
          <MobileButton
            onClick={handleFullscreen}
            variant="ghost"
            size="sm"
            className="rounded-full bg-white/20 hover:bg-blue-ink/20"
            aria-label={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
            title={!isMobile ? (isFullscreen ? "Quitter le plein écran (F11)" : "Plein écran (F11)") : undefined}
            icon={
              isFullscreen ? (
                <svg className="w-5 h-5 text-blue-ink group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M15 9h4.5M15 9V4.5M15 9l5.25-5.25M9 15H4.5M9 15v4.5M9 15l-5.25 5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-blue-ink group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              )
            }
          />
        )}

        {/* Minimize button - Enhanced for mobile touch */}
        {defaultConfig.showMinimizeButton && onMinimize && !isMinimized && (
          <MobileButton
            onClick={handleMinimize}
            variant="ghost"
            size="sm"
            className="rounded-full bg-white/20 hover:bg-mint-green/20"
            aria-label="Réduire"
            title={!isMobile ? "Réduire (Ctrl+M)" : undefined}
            icon={
              <svg className="w-5 h-5 text-mint-green group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            }
          />
        )}

        {/* Maximize button (when minimized) - Enhanced for mobile touch */}
        {isMinimized && onMinimize && (
          <MobileButton
            onClick={() => onMinimize()}
            variant="ghost"
            size="sm"
            className="rounded-full bg-white/20 hover:bg-mint-green/20"
            aria-label="Agrandir"
            title={!isMobile ? "Agrandir" : undefined}
            icon={
              <svg className="w-5 h-5 text-mint-green group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            }
          />
        )}

        {/* Close button - Enhanced design with site colors */}
        <MobileButton
          onClick={handleClose}
          variant="ghost"
          size="sm"
          className="rounded-full bg-white/20 hover:bg-orange-soft/20"
          aria-label="Fermer le chat"
          title={!isMobile ? "Fermer le chat (Échap)" : undefined}
          icon={
            <svg className="w-5 h-5 text-orange-soft group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        />

        {/* Streaming indicator - Enhanced design */}
        {isStreaming && (
          <div className={getMobileClasses(
            'flex items-center space-x-2 ml-3 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-mint-green/20',
            'ml-2 px-2 py-1 text-xs'
          )}>
            <div className="relative">
              <div className="w-2 h-2 bg-mint-green rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-2 h-2 bg-mint-green rounded-full animate-ping opacity-75"></div>
            </div>
            <span className={getMobileClasses(
              'text-xs font-medium text-mint-green',
              'text-[10px]'
            )}>
              {isMobile ? 'Répond...' : 'Laurent répond...'}
            </span>
          </div>
        )}
      </div>

      {/* Confirmation dialog - Enhanced design with site colors */}
      {showConfirmDialog && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-scale-in border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-offset-2"
            tabIndex={-1}
          >
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-soft to-orange-soft/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 
                  id="confirm-dialog-title"
                  className="text-lg font-semibold text-blue-ink mb-1"
                >
                  Confirmer l'action
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-mint-green rounded-full animate-pulse"></div>
                  <p className="text-sm text-primary-secondary">
                    Laurent Serre est en train de répondre
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-orange-soft/5 rounded-lg border border-orange-soft/20">
              <p 
                id="confirm-dialog-description"
                className="text-primary-secondary leading-relaxed"
              >
                {pendingAction === 'close' 
                  ? "Êtes-vous sûr de vouloir fermer le chat ? La réponse en cours sera interrompue et vous perdrez le contexte de la conversation."
                  : "Êtes-vous sûr de vouloir réduire le chat ? La réponse en cours continuera en arrière-plan et vous pourrez la retrouver en rouvrant le chat."
                }
              </p>
            </div>
            
            <div className={getMobileClasses('flex space-x-3', 'flex-col space-y-3 space-x-0')}>
              <MobileButton
                onClick={cancelAction}
                variant="secondary"
                size={isMobile ? 'lg' : 'md'}
                className="flex-1"
              >
                Annuler
              </MobileButton>
              <MobileButton
                onClick={confirmAction}
                variant={pendingAction === 'close' ? 'danger' : 'primary'}
                size={isMobile ? 'lg' : 'md'}
                className="flex-1"
              >
                {pendingAction === 'close' ? 'Fermer le chat' : 'Réduire le chat'}
              </MobileButton>
            </div>
            
            <div className="mt-4 text-xs text-primary-secondary/70 text-center bg-gray-50 rounded-lg p-2">
              <span className="font-medium">Raccourcis :</span> Entrée pour confirmer • Échap pour annuler
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatControls;
export type { ChatControlsProps, ControlsConfig, KeyboardShortcuts };