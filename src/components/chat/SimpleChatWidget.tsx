'use client';

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useGeminiChatSimple } from '@/hooks/useGeminiChatSimple';
import { LAURENT_SERRE_SYSTEM_INSTRUCTION } from '@/lib/gemini/config';

// Lazy loading des composants lourds pour optimiser le LCP
const ChatInterface = lazy(() => import('./ChatInterface'));
const PrivacyNotice = lazy(() => import('./PrivacyNotice'));

interface SimpleChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'center';
  theme?: 'light' | 'dark' | 'auto';
  initialMessage?: string;
  apiKey?: string;
}

export default function SimpleChatWidget({
  position = 'bottom-right',
  theme = 'auto',
  initialMessage,
  apiKey
}: SimpleChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Hook pour gérer le chat Gemini - seulement chargé quand nécessaire
  const {
    messages,
    isStreaming,
    streamingMessage,
    sendMessage,
    error,
    clearError,
    isInitialized
  } = useGeminiChatSimple({
    apiKey: apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    systemInstruction: LAURENT_SERRE_SYSTEM_INSTRUCTION,
    config: {
      model: 'gemini-2.5-flash',
      temperature: 0.7,
      thinkingBudget: 0, // Désactivé pour la performance selon la doc
      maxTokens: 2048
    }
  });

  // Préchargement conditionnel des composants
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Précharger les composants quand le navigateur est idle
        import('./ChatInterface');
        import('./PrivacyNotice');
      });
    }
  }, []);

  // Vérification du consentement
  useEffect(() => {
    const hasConsent = localStorage.getItem('chat_privacy_consent');
    if (!hasConsent) {
      setShowPrivacyNotice(true);
    }
  }, []);

  // Notification de nouveaux messages
  useEffect(() => {
    if (messages.length > 0 && !isOpen) {
      setHasNewMessage(true);
    }
  }, [messages.length, isOpen]);

  // Gestion de l'ouverture/fermeture
  const handleToggle = () => {
    // Vérifier le consentement avant d'ouvrir
    if (!isOpen && !localStorage.getItem('chat_privacy_consent')) {
      setShowPrivacyNotice(true);
      return;
    }

    setIsOpen(!isOpen);
    setHasNewMessage(false);
    
    // Charger les composants seulement quand nécessaire
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };

  // Gestion de la notice de confidentialité
  const handlePrivacyAccept = () => {
    localStorage.setItem('chat_privacy_consent', 'true');
    setShowPrivacyNotice(false);
    setIsOpen(true);
    setIsLoaded(true);
  };

  const handlePrivacyDecline = () => {
    localStorage.setItem('chat_privacy_consent', 'false');
    setShowPrivacyNotice(false);
  };

  // Gestion de l'envoi de messages
  const handleSendMessage = async (message: string, files?: File[]) => {
    try {
      await sendMessage(message, files);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  // Positionnement adaptatif
  const getPositionStyle = () => {
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

  return (
    <div 
      className="fixed z-50" 
      style={getPositionStyle()}
      ref={chatRef}
    >
      {/* Widget fermé - Bouton flottant optimisé */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className={`
            relative w-16 h-16 rounded-full bg-gradient-to-br from-mint-green to-blue-ink
            text-white shadow-2xl hover:shadow-mint-green/30 
            transform hover:scale-110 active:scale-95
            transition-all duration-300 ease-out
            flex items-center justify-center
            ${hasNewMessage ? 'animate-bounce' : ''}
          `}
          aria-label="Ouvrir le chat Laurent Serre"
          // Optimisation SEO - pas d'indexation du bouton
          data-noindex="true"
        >
          {/* Icône de chat */}
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
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
            <div 
              className="absolute -top-1 -right-1 w-4 h-4 bg-orange-soft rounded-full border-2 border-white animate-pulse"
              aria-label="Nouveau message"
            />
          )}

          {/* Indicateur Laurent Serre */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-mint-green flex items-center justify-center">
            <span className="text-xs font-bold text-blue-ink" aria-hidden="true">LS</span>
          </div>
        </button>
      )}

      {/* Widget ouvert - Interface de chat avec lazy loading */}
      {isOpen && isLoaded && (
        <div 
          className="bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ease-out animate-scale-in"
          style={{
            width: '400px',
            height: '600px',
            maxWidth: '90vw',
            maxHeight: '80vh'
          }}
          // Optimisation SEO - pas d'indexation du contenu du chat
          data-noindex="true"
        >
          {/* Header du chat */}
          <div className="bg-gradient-to-r from-blue-ink to-mint-green text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Avatar Laurent Serre */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-ink font-bold text-sm" aria-hidden="true">LS</span>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm">Laurent Serre</h3>
                <p className="text-xs opacity-90">
                  {isStreaming ? 'En train d\'écrire...' : 'Expert développement commercial'}
                </p>
              </div>
            </div>

            {/* Bouton fermer */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Fermer le chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="p-3 bg-red-50 border-b border-red-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-red-600">{error.userMessage}</p>
                <button
                  onClick={clearError}
                  className="text-red-400 hover:text-red-600"
                  aria-label="Fermer l'erreur"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Interface de chat avec Suspense pour le lazy loading */}
          <div className="h-full flex flex-col">
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-green"></div>
              </div>
            }>
              <ChatInterface
                onSendMessage={handleSendMessage}
                messages={messages}
                isStreaming={isStreaming}
                streamingMessage={streamingMessage}
                isLoading={!isInitialized}
                initialMessage={initialMessage}
                isMobile={false}
                isKeyboardVisible={false}
                orientation="portrait"
                error={error}
                recoveryAction={null}
                onRetry={() => {}}
                onClearError={clearError}
              />
            </Suspense>
          </div>
        </div>
      )}

      {/* Notice de confidentialité avec lazy loading */}
      {showPrivacyNotice && (
        <Suspense fallback={null}>
          <PrivacyNotice
            isVisible={showPrivacyNotice}
            onAccept={handlePrivacyAccept}
            onDecline={handlePrivacyDecline}
            isMobile={false}
          />
        </Suspense>
      )}
    </div>
  );
}

// Styles CSS pour l'animation scale-in
const styles = `
  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-scale-in {
    animation: scale-in 0.2s ease-out;
  }
`;

// Injecter les styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
