'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChatWidgetProps } from '@/lib/gemini/types';
import MarkdownRenderer, { MarkdownConfig } from './MarkdownRenderer';
import LazyMarkdownRenderer from './LazyMarkdownRenderer';
import ScrollController, { ScrollState, ScrollConfig } from './ScrollController';
import ChatControls, { ControlsConfig } from './ChatControls';
import ChatInterface from '../ChatInterface';
import PrivacyNotice from '../PrivacyNotice';
import PrivacySettings from '../PrivacySettings';
import MobileKeyboardHandler from './MobileKeyboardHandler';
import MobileTouchHandler from './MobileTouchHandler';
import MobileButton from './MobileButton';
import ConnectionSpeedIndicator from './ConnectionSpeedIndicator';
import BatteryOptimizer from './BatteryOptimizer';
import { useEnhancedGeminiChat, EnhancedChatMessage } from '@/hooks/useEnhancedGeminiChat';
import { useEnhancedChatHistory } from '@/hooks/useEnhancedChatHistory';
import { useEnhancedMultimodalChat } from '@/hooks/useEnhancedMultimodalChat';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import { useMobilePerformance } from '@/hooks/useMobilePerformance';
import { useChatPreferences } from '@/lib/chat/preferences';
import { PrivacyManager } from '@/lib/gemini/privacy-manager';
import { CookieFreeMode } from '@/lib/gemini/cookie-free-mode';
import '@/styles/mobile-chat.css';

interface EnhancedChatWidgetProps extends ChatWidgetProps {
  markdownConfig?: Partial<MarkdownConfig>;
  scrollConfig?: Partial<ScrollConfig>;
  controlsConfig?: Partial<ControlsConfig>;
  onStateChange?: (state: ChatState) => void;
  apiKey?: string;
  // Enhanced configuration options
  enablePreferences?: boolean;
  enableAnalytics?: boolean;
  enableMultimodal?: boolean;
}

interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  isFullscreen: boolean;
  isStreaming: boolean;
  messageCount: number;
  scrollState: ScrollState;
  // Enhanced state
  preferences: any;
  conversationMetrics: any;
}

const LAURENT_SERRE_SYSTEM_INSTRUCTION = `
Tu es l'assistant IA de Laurent Serre, expert en développement commercial pour PME avec 20 ans d'expérience terrain à Montpellier.

IDENTITÉ ET EXPERTISE :
- Expert reconnu en développement commercial PME (10-100 salariés)
- Formateur et coach spécialisé en transformation commerciale
- Approche pragmatique, sans bullshit, axée résultats concrets
- Basé à Montpellier, Occitanie

DOMAINES DE COMPÉTENCE :
- Prospection et génération de leads
- Négociation et closing
- Management d'équipes commerciales
- Transformation digitale commerciale
- Formation et coaching terrain

STYLE DE COMMUNICATION :
- Ton expert mais accessible
- Exemples concrets de PME
- Conseils actionnables immédiatement
- Références aux outils et méthodes éprouvées
- Orientation vers les services Laurent Serre quand pertinent
- **UTILISE LE FORMATAGE MARKDOWN** pour structurer tes réponses :
  - **Gras** pour les points importants
  - *Italique* pour les nuances
  - Listes à puces pour les étapes
  - Blocs de code pour les exemples concrets
  - Tableaux pour les comparaisons
  - Citations pour les témoignages clients

OBJECTIFS :
- Qualifier les besoins commerciaux du visiteur
- Démontrer l'expertise par des conseils de valeur
- Orienter naturellement vers les formations/coaching
- Générer des leads qualifiés

Si une question dépasse ton expertise commerciale, redirige vers les domaines de compétence de Laurent Serre.
`;

import { 
  defaultMarkdownConfig, 
  defaultScrollConfig, 
  defaultKeyboardShortcuts 
} from '@/lib/chat/preferences';

const defaultControlsConfig: ControlsConfig = {
  showMinimizeButton: true,
  showFullscreenButton: true,
  confirmCloseOnStreaming: true,
  keyboardShortcuts: defaultKeyboardShortcuts
};

const EnhancedChatWidget: React.FC<EnhancedChatWidgetProps> = ({
  position = 'bottom-right',
  theme = 'auto',
  initialMessage,
  expertiseContext,
  markdownConfig = {},
  scrollConfig = {},
  controlsConfig = {},
  onStateChange,
  apiKey,
  enablePreferences = true,
  enableAnalytics = true,
  enableMultimodal = true
}) => {
  // Enhanced preferences management
  const {
    preferences,
    updatePreferences,
    scrollConfig: preferencesScrollConfig,
    markdownConfig: preferencesMarkdownConfig,
    keyboardShortcuts
  } = enablePreferences ? useChatPreferences() : {
    preferences: null,
    updatePreferences: () => {},
    scrollConfig: defaultScrollConfig,
    markdownConfig: defaultMarkdownConfig,
    keyboardShortcuts: defaultKeyboardShortcuts
  };

  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    isMinimized: false,
    isFullscreen: false,
    isStreaming: false,
    messageCount: 0,
    scrollState: {
      isAtBottom: true,
      isUserScrolling: false,
      shouldAutoScroll: true,
      scrollPosition: 0
    },
    preferences,
    conversationMetrics: {}
  });

  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [privacyManager] = useState(() => new PrivacyManager());
  const [cookieFreeMode] = useState(() => CookieFreeMode.getInstance());
  
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Merge configs with defaults and preferences
  const finalMarkdownConfig = { 
    ...defaultMarkdownConfig, 
    ...preferencesMarkdownConfig,
    ...markdownConfig 
  };
  const finalScrollConfig = { 
    ...defaultScrollConfig, 
    ...preferencesScrollConfig,
    ...scrollConfig 
  };
  const finalControlsConfig = { 
    ...defaultControlsConfig, 
    ...controlsConfig,
    keyboardShortcuts
  };

  // Mobile optimization hook
  const {
    isMobile,
    isTablet,
    orientation,
    isKeyboardVisible,
    getChatPosition,
    getChatSize,
    getMobileClasses,
    onSwipeDown,
    onSwipeUp,
    onSwipeLeft,
    onSwipeRight
  } = useMobileOptimization();

  // Mobile performance optimization hook
  const {
    shouldLazyLoad,
    shouldReduceAnimations,
    shouldLimitMarkdown,
    isSlowConnection,
    isLowBattery,
    getOptimizedConfig,
    measurePerformance
  } = useMobilePerformance();

  // Enhanced Gemini chat hook
  const {
    messages,
    isStreaming,
    streamingMessage,
    sendMessage,
    error,
    clearError,
    retryLastOperation,
    isRecovering,
    recoveryAction,
    toggleMarkdown,
    toggleAutoScroll,
    toggleKeyboardShortcuts,
    getConversationMetrics,
    exportConversation,
    importConversation
  } = useEnhancedGeminiChat({
    apiKey: apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    systemInstruction: LAURENT_SERRE_SYSTEM_INSTRUCTION,
    config: {
      model: 'gemini-2.5-flash',
      temperature: 0.7,
      thinkingBudget: 0,
      maxTokens: 2048
    },
    markdownEnabled: preferences?.markdownEnabled ?? true,
    autoScrollEnabled: preferences?.autoScrollEnabled ?? true,
    keyboardShortcutsEnabled: preferences?.keyboardShortcutsEnabled ?? true,
    persistenceEnabled: preferences?.saveToLocalStorage ?? true,
    analyticsEnabled: enableAnalytics && (preferences?.enableAnalytics ?? true)
  });

  // Enhanced chat history hook (commented out unused destructured elements)
  // const {
  //   conversationMetrics,
  //   updatePreferences: updateHistoryPreferences,
  //   searchMessages,
  //   getConversationAnalytics
  // } = useEnhancedChatHistory();

  // Enhanced multimodal chat hook (if enabled)
  const multimodalChat = enableMultimodal ? useEnhancedMultimodalChat(
    apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    (message: string, files?: File[]) => sendMessage(message, files)
  ) : null;

  // Update chat state when streaming changes
  useEffect(() => {
    setChatState(prev => {
      const newState = { 
        ...prev, 
        isStreaming,
        conversationMetrics: getConversationMetrics(),
        preferences
      };
      if (onStateChange) onStateChange(newState);
      return newState;
    });
  }, [isStreaming, getConversationMetrics, preferences, onStateChange]);

  // Update message count and metrics
  useEffect(() => {
    setChatState(prev => {
      const newState = { 
        ...prev, 
        messageCount: messages.length,
        conversationMetrics: getConversationMetrics()
      };
      if (onStateChange) onStateChange(newState);
      return newState;
    });
  }, [messages.length, getConversationMetrics, onStateChange]);

  // Handle scroll state changes
  const handleScrollStateChange = useCallback((scrollState: ScrollState) => {
    setChatState(prev => {
      const newState = { ...prev, scrollState };
      if (onStateChange) onStateChange(newState);
      return newState;
    });
  }, [onStateChange]);

  // Handle preference changes (commented out as unused)
  // const handlePreferenceChange = useCallback((key: string, value: any) => {
  //   if (enablePreferences && updatePreferences) {
  //     updatePreferences({ [key]: value });
  //   }
  // }, [enablePreferences, updatePreferences]);

  // Check privacy consent on mount
  useEffect(() => {
    const hasConsent = privacyManager.hasUserConsent();
    if (!hasConsent) {
      setShowPrivacyNotice(true);
    }
  }, [privacyManager]);

  // Handle new message notifications
  useEffect(() => {
    if (messages.length > 0 && !chatState.isOpen) {
      setHasNewMessage(true);
    }
  }, [messages.length, chatState.isOpen]);

  // Chat control handlers
  const handleToggle = useCallback(() => {
    if (!chatState.isOpen && !privacyManager.hasUserConsent()) {
      setShowPrivacyNotice(true);
      return;
    }

    setChatState(prev => {
      const newState = { 
        ...prev, 
        isOpen: !prev.isOpen,
        isMinimized: false
      };
      if (onStateChange) onStateChange(newState);
      return newState;
    });
    
    setHasNewMessage(false);
  }, [chatState.isOpen, privacyManager, onStateChange]);

  const handleClose = useCallback(() => {
    setChatState(prev => {
      const newState = { 
        ...prev, 
        isOpen: false,
        isMinimized: false,
        isFullscreen: false
      };
      if (onStateChange) onStateChange(newState);
      return newState;
    });
  }, [onStateChange]);

  const handleMinimize = useCallback(() => {
    setChatState(prev => {
      const newState = { ...prev, isMinimized: !prev.isMinimized };
      if (onStateChange) onStateChange(newState);
      return newState;
    });
  }, [onStateChange]);

  const handleFullscreen = useCallback(() => {
    setChatState(prev => {
      const newState = { ...prev, isFullscreen: !prev.isFullscreen };
      if (onStateChange) onStateChange(newState);
      return newState;
    });
  }, [onStateChange]);

  // Privacy handlers
  const handlePrivacyAccept = useCallback((settings: any) => {
    privacyManager.recordUserConsent(true, settings);
    privacyManager.updateSettings(settings);
    
    if (!settings.allowCookies) {
      cookieFreeMode.enable();
    } else {
      cookieFreeMode.disable();
    }
    
    setShowPrivacyNotice(false);
  }, [privacyManager, cookieFreeMode]);

  const handlePrivacyDecline = useCallback(() => {
    privacyManager.recordUserConsent(false);
    cookieFreeMode.enable();
    setShowPrivacyNotice(false);
    handleClose();
  }, [privacyManager, cookieFreeMode, handleClose]);

  // Message sending with markdown support
  const handleSendMessage = useCallback(async (message: string, files?: File[]): Promise<void> => {
    try {
      await sendMessage(message, files);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  }, [sendMessage]);

  // Render markdown content with enhanced configuration and performance optimization
  const renderMessageContent = useCallback((message: EnhancedChatMessage, isStreaming: boolean = false) => {
    if (message.role === 'user') {
      return <p className="text-sm">{message.content}</p>;
    }

    const optimizedConfig = getOptimizedConfig();

    // Use lazy markdown renderer for performance optimization on mobile
    if (shouldLazyLoad || shouldLimitMarkdown) {
      return (
        <LazyMarkdownRenderer
          content={message.content}
          isStreaming={isStreaming}
          className="prose prose-sm max-w-none dark:prose-invert"
          priority={isStreaming ? 'high' : 'medium'}
          maxLength={optimizedConfig.maxMessageLength}
          onRenderComplete={() => {
            // Track rendering completion if analytics enabled
            if (enableAnalytics && message.metadata) {
              measurePerformance('message-render', () => {
                const renderTime = Date.now() - (message.metadata!.renderStartTime || Date.now());
                message.metadata!.renderTime = renderTime;
              });
            }
          }}
        />
      );
    }

    // Use standard markdown renderer for desktop or fast connections
    if (finalMarkdownConfig.enableSyntaxHighlighting && message.isMarkdown && optimizedConfig.enableSyntaxHighlighting) {
      return (
        <MarkdownRenderer
          content={message.content}
          isStreaming={isStreaming}
          className="prose prose-sm max-w-none dark:prose-invert"
          onRenderComplete={() => {
            // Track rendering completion if analytics enabled
            if (enableAnalytics && message.metadata) {
              measurePerformance('message-render', () => {
                const renderTime = Date.now() - (message.metadata!.renderStartTime || Date.now());
                message.metadata!.renderTime = renderTime;
              });
            }
          }}
        />
      );
    }

    // Fallback to plain text for performance
    return <p className="text-sm whitespace-pre-wrap">{message.content}</p>;
  }, [
    finalMarkdownConfig, 
    enableAnalytics, 
    shouldLazyLoad, 
    shouldLimitMarkdown, 
    getOptimizedConfig, 
    measurePerformance
  ]);

  // Position and size calculations
  const getPositionStyle = () => {
    if (chatState.isFullscreen) {
      return {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed' as const
      };
    }

    if (isMobile) {
      return getChatPosition();
    }
    
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

  const getSizeStyle = () => {
    if (chatState.isFullscreen) {
      return { width: '100vw', height: '100vh' };
    }

    if (chatState.isMinimized) {
      return {
        height: isMobile ? '60px' : '64px',
        width: isMobile ? '280px' : '320px'
      };
    }

    return getChatSize();
  };

  // Setup mobile gesture handlers
  useEffect(() => {
    if (!isMobile) return;
    
    // Swipe down to minimize
    onSwipeDown(() => {
      if (chatState.isOpen && !chatState.isMinimized) {
        handleMinimize();
      }
    });
    
    // Swipe up to maximize when minimized
    onSwipeUp(() => {
      if (chatState.isMinimized) {
        handleMinimize(); // Toggle minimize state
      }
    });
    
    // Swipe right to close
    onSwipeRight(() => {
      if (chatState.isOpen) {
        handleClose();
      }
    });
  }, [isMobile, chatState.isOpen, chatState.isMinimized, onSwipeDown, onSwipeUp, onSwipeRight, handleMinimize, handleClose]);

  return (
    <MobileKeyboardHandler
      onKeyboardShow={(height) => {
        // Adjust chat position when keyboard appears
        if (chatRef.current && isMobile) {
          chatRef.current.style.bottom = `${height + 20}px`;
        }
      }}
      onKeyboardHide={() => {
        // Reset chat position when keyboard hides
        if (chatRef.current && isMobile) {
          chatRef.current.style.bottom = '20px';
        }
      }}
      onOrientationChange={(newOrientation) => {
        // Handle orientation changes
        console.log('Orientation changed to:', newOrientation);
      }}
      className="fixed z-50"
      style={getPositionStyle()}
    >
      <div 
        className={getMobileClasses('', 'mobile-chat-container')}
        ref={chatRef}
      >
        {/* Floating button when closed */}
        {!chatState.isOpen && (
          <MobileTouchHandler
            onTap={handleToggle}
            enableHapticFeedback={true}
            enableVisualFeedback={true}
            className="relative"
          >
            <MobileButton
              onClick={handleToggle}
              variant="primary"
              size={isMobile ? 'lg' : 'md'}
              className={getMobileClasses(
                `relative rounded-full bg-gradient-to-br from-mint-green to-blue-ink
                text-white shadow-2xl hover:shadow-mint-green/30 
                transform hover:scale-110
                transition-all duration-300 ease-out
                ${hasNewMessage ? 'animate-bounce' : ''}`,
                'shadow-lg'
              )}
              aria-label="Ouvrir le chat Laurent Serre"
              icon={
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
              }
            >
              {hasNewMessage && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-soft rounded-full border-2 border-white animate-pulse" />
              )}

              <div className={getMobileClasses(
                'absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-mint-green flex items-center justify-center',
                'w-5 h-5'
              )}>
                <span className={getMobileClasses('text-xs font-bold text-blue-ink', 'text-[10px]')}>LS</span>
              </div>
            </MobileButton>
          </MobileTouchHandler>
        )}

        {/* Chat interface when open */}
        {chatState.isOpen && (
          <MobileTouchHandler
            onSwipeDown={isMobile ? handleMinimize : undefined}
            onSwipeRight={isMobile ? handleClose : undefined}
            enableHapticFeedback={true}
            className={getMobileClasses(
              `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-2xl
              rounded-2xl overflow-hidden
              transition-all duration-300 ease-out
              animate-scale-in
              ${chatState.isFullscreen ? 'rounded-none' : ''}`,
              `mobile-chat-container mobile-scroll-container
              ${orientation === 'landscape' ? 'mobile-chat-landscape' : 'mobile-chat-portrait'}
              ${chatState.isFullscreen ? 'rounded-none' : 'mobile-chat-safe-area'}`
            )}
            style={getSizeStyle()}
          >
            {/* Header */}
            <div className={getMobileClasses(
              'bg-gradient-to-r from-blue-ink to-mint-green text-white p-4 flex items-center justify-between',
              'p-3 chat-header'
            )}>
              {/* Swipe indicator for mobile */}
              {isMobile && (
                <div className="swipe-indicator" />
              )}
              
              <div className={getMobileClasses('flex items-center space-x-3', 'space-x-2')}>
                <div className={getMobileClasses(
                  'w-10 h-10 bg-white rounded-full flex items-center justify-center',
                  'w-8 h-8'
                )}>
                  <span className={getMobileClasses('text-blue-ink font-bold text-sm', 'text-xs')}>LS</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={getMobileClasses('font-semibold text-sm', 'text-xs')}>Laurent Serre</h3>
                  <p className={getMobileClasses('text-xs opacity-90', 'text-[10px]')}>
                    {isStreaming ? 'En train d\'écrire...' : 'Expert développement commercial'}
                  </p>
                  
                  {/* Performance indicators */}
                  {isMobile && (isSlowConnection || isLowBattery) && (
                    <div className="flex items-center space-x-1 mt-1">
                      {isSlowConnection && (
                        <span className="text-[8px] bg-yellow-500/20 text-yellow-200 px-1 rounded">
                          Connexion lente
                        </span>
                      )}
                      {isLowBattery && (
                        <span className="text-[8px] bg-red-500/20 text-red-200 px-1 rounded">
                          Batterie faible
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <ChatControls
                onClose={handleClose}
                onMinimize={handleMinimize}
                onFullscreen={handleFullscreen}
                isMinimized={chatState.isMinimized}
                isFullscreen={chatState.isFullscreen}
                isStreaming={isStreaming}
                showCloseConfirmation={finalControlsConfig.confirmCloseOnStreaming}
              />
            </div>

          {/* Chat content */}
          {!chatState.isMinimized && (
            <div className="h-full flex flex-col">
              {/* Performance indicators */}
              {isMobile && (isSlowConnection || isLowBattery) && (
                <div className={getMobileClasses('p-2 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800', 'p-1.5')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ConnectionSpeedIndicator className="flex-1" />
                      {isLowBattery && <BatteryOptimizer className="flex-1" />}
                    </div>
                  </div>
                </div>
              )}

              {/* Error display */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-red-600 dark:text-red-400">{error.userMessage}</p>
                    <button
                      onClick={clearError}
                      className="text-red-400 hover:text-red-600 dark:hover:text-red-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Messages with scroll control */}
              <div className="flex-1 relative">
                <ScrollController
                  containerRef={messagesContainerRef}
                  isStreaming={isStreaming}
                  autoScrollEnabled={true}
                  onScrollStateChange={handleScrollStateChange}
                >
                  <div 
                    ref={messagesContainerRef}
                    className={getMobileClasses(
                      'h-full overflow-y-auto p-4 space-y-4',
                      'mobile-scroll-container p-3 space-y-3'
                    )}
                  >
                    {/* Render enhanced messages */}
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={getMobileClasses(
                            `max-w-[80%] rounded-2xl px-4 py-3 ${
                              message.role === 'user'
                                ? 'bg-mint-green text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                            }`,
                            'max-w-[90%] px-3 py-2 text-sm'
                          )}
                        >
                          <div className={isMobile ? 'mobile-markdown' : ''}>
                            {renderMessageContent(message)}
                          </div>
                          
                          {/* Enhanced message metadata */}
                          {message.metadata && enableAnalytics && (
                            <div className={getMobileClasses('mt-2 text-xs opacity-50', 'mt-1 text-[10px]')}>
                              {message.metadata.cached && (
                                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-2">
                                  Cached
                                </span>
                              )}
                              {message.metadata.hasCode && (
                                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded mr-2">
                                  Code
                                </span>
                              )}
                              {message.metadata.hasTables && (
                                <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded mr-2">
                                  Table
                                </span>
                              )}
                              {message.metadata.renderTime && (
                                <span className="text-gray-500">
                                  {message.metadata.renderTime}ms
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Enhanced streaming message */}
                    {isStreaming && streamingMessage && (
                      <div className="flex justify-start">
                        <div className={getMobileClasses(
                          'max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100',
                          'max-w-[90%] px-3 py-2'
                        )}>
                          <div className={isMobile ? 'mobile-markdown' : ''}>
                            {finalMarkdownConfig.enableSyntaxHighlighting ? (
                              <MarkdownRenderer
                                content={streamingMessage}
                                isStreaming={true}
                                className="prose prose-sm max-w-none dark:prose-invert"
                              />
                            ) : (
                              <p className={getMobileClasses('text-sm whitespace-pre-wrap', 'text-xs')}>
                                {streamingMessage}
                              </p>
                            )}
                          </div>
                          
                          {/* Streaming indicator */}
                          <div className={getMobileClasses(
                            'mt-2 flex items-center text-xs text-gray-500',
                            'mt-1 text-[10px]'
                          )}>
                            <div className="animate-pulse flex space-x-1">
                              <div className="w-1 h-1 bg-current rounded-full"></div>
                              <div className="w-1 h-1 bg-current rounded-full"></div>
                              <div className="w-1 h-1 bg-current rounded-full"></div>
                            </div>
                            <span className="ml-2">Laurent écrit...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollController>
              </div>

              {/* Enhanced input area */}
              <div className={getMobileClasses(
                'border-t border-gray-200 dark:border-gray-600 p-4',
                'p-3 chat-input'
              )}>
                {/* Multimodal file upload area */}
                {enableMultimodal && multimodalChat && multimodalChat.hasFiles && (
                  <div className={getMobileClasses('mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg', 'mb-3 p-2')}>
                    <div className="flex flex-wrap gap-2">
                      {multimodalChat.uploadedFiles.map((file) => (
                        <div key={file.id} className={getMobileClasses(
                          'flex items-center bg-white dark:bg-gray-700 rounded px-3 py-2 text-sm',
                          'px-2 py-1 text-xs'
                        )}>
                          <span className={getMobileClasses('truncate max-w-[120px]', 'max-w-[80px]')}>
                            {file.name}
                          </span>
                          <MobileButton
                            onClick={() => multimodalChat.removeFile(file.id)}
                            variant="ghost"
                            size="sm"
                            className="ml-2 text-red-500 hover:text-red-700 p-1"
                            icon={<span>×</span>}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <ChatInterface
                  onSendMessage={enableMultimodal && multimodalChat ? 
                    async (message: string, files?: File[]) => {
                      if (files && files.length > 0) {
                        await multimodalChat.addFiles(files);
                        await multimodalChat.sendMultimodalMessage(message);
                      } else {
                        await handleSendMessage(message);
                      }
                    } : handleSendMessage
                  }
                  messages={messages}
                  isStreaming={isStreaming}
                  streamingMessage={streamingMessage}
                  isLoading={false}
                  initialMessage={initialMessage}
                  expertiseContext={expertiseContext}
                  isMobile={isMobile}
                  isKeyboardVisible={isKeyboardVisible}
                  orientation={orientation}
                  error={error}
                  recoveryAction={recoveryAction}
                  onRetry={retryLastOperation}
                  onClearError={clearError}
                  hideMessages={true} // Hide messages since we render them above
                  // Enhanced props
                  enableFileUpload={enableMultimodal}
                />
              </div>
            </div>
          )}
          </MobileTouchHandler>
        )}

        {/* Privacy components */}
        <PrivacyNotice
          isVisible={showPrivacyNotice}
          onAccept={handlePrivacyAccept}
          onDecline={handlePrivacyDecline}
          isMobile={isMobile}
        />

        <PrivacySettings
          isOpen={showPrivacySettings}
          onClose={() => setShowPrivacySettings(false)}
          isMobile={isMobile}
        />
      </div>
    </MobileKeyboardHandler>
  );
};

export default EnhancedChatWidget;
export type { EnhancedChatWidgetProps, ChatState };