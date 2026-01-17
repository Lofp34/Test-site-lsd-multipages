'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChatWidgetProps, ChatWidgetState } from '@/lib/gemini/types';
import ChatInterface from './ChatInterface';
import PrivacyNotice from './PrivacyNotice';
import PrivacySettings from './PrivacySettings';
import { useGeminiChatSimple } from '@/hooks/useGeminiChatSimple';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import { PrivacyManager } from '@/lib/gemini/privacy-manager';
import { CookieFreeMode } from '@/lib/gemini/cookie-free-mode';
import { LAURENT_SERRE_SYSTEM_INSTRUCTION } from '@/lib/gemini/config';
import '@/styles/mobile-chat.css';

interface ChatWidgetComponentProps extends ChatWidgetProps {
  apiKey?: string;
}

export default function ChatWidget({
  position = 'bottom-right',
  theme = 'auto',
  initialMessage,
  expertiseContext,
  apiKey
}: ChatWidgetComponentProps) {
  const [state, setState] = useState<ChatWidgetState>({
    isOpen: false,
    isLoading: false,
    hasError: false,
    conversationId: `chat_${Date.now()}`,
    messageCount: 0
  });

  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [privacyManager] = useState(() => new PrivacyManager());
  const [cookieFreeMode] = useState(() => CookieFreeMode.getInstance());
  const chatRef = useRef<HTMLDivElement>(null);

  // Hook d'optimisation mobile
  const {
    isMobile,
    isTablet,
    orientation,
    isKeyboardVisible,
    touchGesture,
    getChatPosition,
    getChatSize,
    getMobileClasses,
    onSwipeDown,
    onSwipeUp,
    onSwipeLeft,
    onSwipeRight
  } = useMobileOptimization();

  // Hook pour gérer le chat Gemini
  const {
    messages,
    isStreaming,
    streamingMessage,
    sendMessage,
    error,
    clearError,
    retryLastOperation,
    isRecovering,
    recoveryAction
  } = useGeminiChatSimple({
    apiKey: apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    systemInstruction: LAURENT_SERRE_SYSTEM_INSTRUCTION,
    config: {
      model: 'gemini-3-pro-preview',
      temperature: 0.7,
      thinkingBudget: 0, // Désactivé pour la performance
      maxTokens: 2048
    }
  });

  // Vérification du consentement au démarrage
  useEffect(() => {
    const hasConsent = privacyManager.hasUserConsent();
    if (!hasConsent) {
      setShowPrivacyNotice(true);
    }
  }, [privacyManager]);

  // Gestion des erreurs
  useEffect(() => {
    if (error) {
      setState(prev => ({ ...prev, hasError: true }));
    }
  }, [error]);

  // Notification de nouveaux messages
  useEffect(() => {
    if (messages.length > 0 && !state.isOpen) {
      setHasNewMessage(true);
    }
  }, [messages.length, state.isOpen]);

  // Gestion du clic extérieur pour fermer (desktop uniquement)
  useEffect(() => {
    if (isMobile) return; // Pas de fermeture automatique sur mobile

    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        if (state.isOpen && !isMinimized) {
          handleMinimize();
        }
      }
    };

    if (state.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [state.isOpen, isMinimized, isMobile]);

  // Gestion des gestes tactiles
  useEffect(() => {
    if (!isMobile || !state.isOpen) return;

    // Swipe vers le bas pour minimiser
    onSwipeDown(() => {
      if (!isMinimized) {
        handleMinimize();
      }
    });

    // Swipe vers le haut pour maximiser
    onSwipeUp(() => {
      if (isMinimized) {
        handleMaximize();
      }
    });

    // Swipe vers la droite pour fermer
    onSwipeRight(() => {
      handleClose();
    });
  }, [isMobile, state.isOpen, isMinimized, onSwipeDown, onSwipeUp, onSwipeRight]);

  // Gestion de l'ouverture/fermeture
  const handleToggle = () => {
    // Vérifier le consentement avant d'ouvrir
    if (!state.isOpen && !privacyManager.hasUserConsent()) {
      setShowPrivacyNotice(true);
      return;
    }

    setState(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));
    setHasNewMessage(false);
    
    if (!state.isOpen && isMinimized) {
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

  const handleClose = () => {
    setState(prev => ({
      ...prev,
      isOpen: false
    }));
    setIsMinimized(false);
  };

  // Gestion de la notice de confidentialité
  const handlePrivacyAccept = (settings: any) => {
    privacyManager.recordUserConsent(true, settings);
    privacyManager.updateSettings(settings);
    
    // Configurer le mode sans cookies si nécessaire
    if (!settings.allowCookies) {
      cookieFreeMode.enable();
    } else {
      cookieFreeMode.disable();
    }
    
    setShowPrivacyNotice(false);
  };

  const handlePrivacyDecline = () => {
    privacyManager.recordUserConsent(false);
    cookieFreeMode.enable(); // Forcer le mode sans cookies
    setShowPrivacyNotice(false);
    
    // Optionnel: fermer le chat ou afficher un message
    setState(prev => ({ ...prev, isOpen: false }));
  };

  const handleOpenPrivacySettings = () => {
    setShowPrivacySettings(true);
  };

  // Gestion de l'envoi de messages
  const handleSendMessage = async (message: string, files?: File[]) => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      messageCount: prev.messageCount + 1
    }));

    try {
      await sendMessage(message, files);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setState(prev => ({ ...prev, hasError: true }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Positionnement adaptatif
  const getPositionStyle = () => {
    if (isMobile) {
      return getChatPosition();
    }
    
    // Position desktop classique
    switch (position) {
      case 'bottom-left':
        return { bottom: '1rem', left: '1rem' };
      case 'center':
        return { 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)' 
        };
      case 'bottom-right':
      default:
        return { bottom: '1rem', right: '1rem' };
    }
  };

  // Classes CSS pour le thème
  const getThemeClasses = () => {
    return 'bg-white border border-gray-200 shadow-2xl';
  };

  return (
    <div 
      className="fixed z-50" 
      style={getPositionStyle()}
      ref={chatRef}
    >
      {/* Widget fermé - Bouton flottant */}
      {!state.isOpen && (
        <button
          onClick={handleToggle}
          className={getMobileClasses(
            `relative w-16 h-16 rounded-full bg-gradient-to-br from-mint-green to-blue-ink
            text-white shadow-2xl hover:shadow-mint-green/30 
            transform hover:scale-110 active:scale-95
            transition-all duration-300 ease-out
            flex items-center justify-center
            ${hasNewMessage ? 'animate-bounce' : ''}`,
            'w-14 h-14 shadow-lg active:scale-90'
          )}
          aria-label="Ouvrir le chat Laurent Serre"
        >
          {/* Icône de chat */}
          <svg 
            className={getMobileClasses('w-8 h-8', 'w-6 h-6')} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>

          {/* Badge de notification */}
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-soft rounded-full border-2 border-white animate-pulse" />
          )}

          {/* Indicateur Laurent Serre */}
          <div className={getMobileClasses(
            'absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-mint-green flex items-center justify-center',
            'w-5 h-5'
          )}>
            <span className={getMobileClasses('text-xs font-bold text-blue-ink', 'text-[10px]')}>LS</span>
          </div>
        </button>
      )}

      {/* Widget ouvert - Interface de chat */}
      {state.isOpen && (
        <div 
          className={`
            ${getThemeClasses()}
            rounded-2xl overflow-hidden
            transition-all duration-300 ease-out
            animate-scale-in
          `}
          style={{
            ...getChatSize(),
            ...(isMinimized && {
              height: isMobile ? '60px' : '64px',
              width: isMobile ? '280px' : '320px'
            })
          }}
        >
          {/* Header du chat */}
          <div className={getMobileClasses(
            'bg-gradient-to-r from-blue-ink to-mint-green text-white p-4 flex items-center justify-between',
            'p-3'
          )}>
            <div className={getMobileClasses('flex items-center space-x-3', 'space-x-2')}>
              {/* Avatar Laurent Serre */}
              <div className={getMobileClasses(
                'w-10 h-10 bg-white rounded-full flex items-center justify-center',
                'w-8 h-8'
              )}>
                <span className={getMobileClasses('text-blue-ink font-bold text-sm', 'text-xs')}>LS</span>
              </div>
              
              <div>
                <h3 className={getMobileClasses('font-semibold text-sm', 'text-xs')}>Laurent Serre</h3>
                <p className={getMobileClasses('text-xs opacity-90', 'text-[10px]')}>
                  {isStreaming ? 'En train d\'écrire...' : 'Expert développement commercial'}
                </p>
              </div>
            </div>

            {/* Contrôles du header */}
            <div className={getMobileClasses('flex items-center space-x-2', 'space-x-1')}>
              {/* Indicateur de gestes mobiles */}
              {isMobile && !isMinimized && (
                <div className="flex flex-col items-center mr-2">
                  <div className="w-6 h-1 bg-white/30 rounded-full mb-1"></div>
                  <span className="text-[8px] opacity-60">Swipe</span>
                </div>
              )}
              
              {/* Bouton paramètres de confidentialité */}
              {!isMinimized && (
                <button
                  onClick={handleOpenPrivacySettings}
                  className={getMobileClasses(
                    'w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors',
                    'w-7 h-7 active:bg-white/40'
                  )}
                  aria-label="Paramètres de confidentialité"
                  title="Paramètres de confidentialité"
                >
                  <svg className={getMobileClasses('w-4 h-4', 'w-3 h-3')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </button>
              )}
              
              {!isMinimized && (
                <button
                  onClick={handleMinimize}
                  className={getMobileClasses(
                    'w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors',
                    'w-7 h-7 active:bg-white/40'
                  )}
                  aria-label="Réduire"
                >
                  <svg className={getMobileClasses('w-4 h-4', 'w-3 h-3')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
              )}
              
              {isMinimized && (
                <button
                  onClick={handleMaximize}
                  className={getMobileClasses(
                    'w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors',
                    'w-7 h-7 active:bg-white/40'
                  )}
                  aria-label="Agrandir"
                >
                  <svg className={getMobileClasses('w-4 h-4', 'w-3 h-3')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              )}

              <button
                onClick={handleClose}
                className={getMobileClasses(
                  'w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors',
                  'w-7 h-7 active:bg-white/40'
                )}
                aria-label="Fermer"
              >
                <svg className={getMobileClasses('w-4 h-4', 'w-3 h-3')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Interface de chat */}
          {!isMinimized && (
            <div className="h-full flex flex-col">
              {/* Message d'erreur */}
              {state.hasError && error && (
                <div className="p-3 bg-red-50 border-b border-red-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-red-600">{error.userMessage}</p>
                    <button
                      onClick={clearError}
                      className="text-red-400 hover:text-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Interface de chat principale */}
              <ChatInterface
                onSendMessage={handleSendMessage}
                messages={messages}
                isStreaming={isStreaming}
                streamingMessage={streamingMessage}
                isLoading={state.isLoading}
                initialMessage={initialMessage}
                expertiseContext={expertiseContext}
                isMobile={isMobile}
                isKeyboardVisible={isKeyboardVisible}
                orientation={orientation}
                error={error}
                recoveryAction={recoveryAction}
                onRetry={retryLastOperation}
                onClearError={clearError}
              />
            </div>
          )}
        </div>
      )}

      {/* Notice de confidentialité */}
      <PrivacyNotice
        isVisible={showPrivacyNotice}
        onAccept={handlePrivacyAccept}
        onDecline={handlePrivacyDecline}
        isMobile={isMobile}
      />

      {/* Paramètres de confidentialité */}
      <PrivacySettings
        isOpen={showPrivacySettings}
        onClose={() => setShowPrivacySettings(false)}
        isMobile={isMobile}
      />
    </div>
  );
}
