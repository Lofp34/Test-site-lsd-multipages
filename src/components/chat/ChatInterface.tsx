'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UploadedFile, ChatError } from '@/lib/gemini/types';
import { ErrorRecoveryAction } from '@/lib/gemini/error-handler';
import FileUploader from './FileUploader';
import FilePreview from './FilePreview';
import ErrorMessage from './ErrorMessage';

interface ChatInterfaceProps {
  onSendMessage: (message: string, files?: File[]) => Promise<void>;
  messages: ChatMessage[];
  isStreaming: boolean;
  streamingMessage?: string;
  isLoading?: boolean;
  initialMessage?: string;
  expertiseContext?: string;
  isMobile?: boolean;
  isKeyboardVisible?: boolean;
  orientation?: 'portrait' | 'landscape';
  error?: ChatError | null;
  recoveryAction?: ErrorRecoveryAction;
  onRetry?: () => Promise<void>;
  onClearError?: () => void;
}

interface MessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
  streamingContent?: string;
}

function MessageBubble({ message, isStreaming = false, streamingContent }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const displayContent = isStreaming && streamingContent ? streamingContent : message.content;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`flex items-start space-x-2 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`
          w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
          ${isUser 
            ? 'bg-mint-green text-white' 
            : 'bg-blue-ink text-white'
          }
        `}>
          {isUser ? (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ) : (
            <span className="text-[10px] font-bold">LS</span>
          )}
        </div>

        {/* Message bubble */}
        <div className={`
          rounded-2xl px-3 py-2 shadow-sm
          ${isUser 
            ? 'bg-mint-green text-white rounded-br-md' 
            : 'bg-gray-100 text-gray-800 rounded-bl-md'
          }
        `}>
          {/* Fichiers attachés */}
          {message.files && message.files.length > 0 && (
            <div className="mb-2">
              <FilePreview 
                files={message.files} 
                showRemoveButton={false}
                maxPreviewSize={3}
              />
            </div>
          )}

          {/* Contenu du message */}
          <div className="text-xs leading-relaxed">
            {displayContent.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < displayContent.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
            
            {/* Indicateur de streaming */}
            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-current opacity-75 animate-pulse ml-1" />
            )}
          </div>

          {/* Timestamp */}
          <div className={`text-[10px] mt-1 opacity-70 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatInterface({
  onSendMessage,
  messages,
  isStreaming,
  streamingMessage = '',
  isLoading = false,
  initialMessage,
  expertiseContext,
  isMobile = false,
  isKeyboardVisible = false,
  orientation = 'portrait',
  error,
  recoveryAction,
  onRetry,
  onClearError
}: ChatInterfaceProps) {
  const [inputText, setInputText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  // Auto-resize du textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  // Message initial
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      setInputText(initialMessage);
    }
  }, [initialMessage, messages.length]);

  const handleSendMessage = async () => {
    if ((!inputText.trim() && selectedFiles.length === 0) || isSending || isLoading) {
      return;
    }

    setIsSending(true);
    
    try {
      await onSendMessage(inputText, selectedFiles);
      setInputText('');
      setSelectedFiles([]);
      setShowFileUploader(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const canSendMessage = (inputText.trim() || selectedFiles.length > 0) && !isSending && !isLoading;

  // Classes adaptatives pour mobile
  const getMobileClasses = (baseClasses: string, mobileClasses: string) => {
    return isMobile ? `${baseClasses} ${mobileClasses}` : baseClasses;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Zone de messages */}
      <div className={getMobileClasses(
        'flex-1 overflow-y-auto p-4 space-y-4',
        'p-3 space-y-3'
      )}
      style={{
        // Ajustement pour le clavier virtuel sur mobile
        ...(isMobile && isKeyboardVisible && {
          paddingBottom: '0.5rem'
        })
      }}>
        {/* Message de bienvenue */}
        {messages.length === 0 && (
          <div className={getMobileClasses('text-center py-8', 'py-4')}>
            <div className={getMobileClasses(
              'w-16 h-16 bg-gradient-to-br from-mint-green to-blue-ink rounded-full flex items-center justify-center mx-auto mb-4',
              'w-12 h-12 mb-3'
            )}>
              <span className={getMobileClasses('text-white font-bold text-lg', 'text-sm')}>LS</span>
            </div>
            <h3 className={getMobileClasses(
              'text-lg font-semibold text-blue-ink mb-2',
              'text-sm mb-1'
            )}>
              Bonjour ! Je suis Laurent Serre
            </h3>
            <p className={getMobileClasses(
              'text-gray-600 text-sm mb-4',
              'text-xs mb-3'
            )}>
              Expert en développement commercial PME avec 20 ans d'expérience terrain.
            </p>
            <div className={getMobileClasses(
              'bg-gray-50 rounded-lg p-4 text-left',
              'p-3'
            )}>
              <p className={getMobileClasses(
                'text-sm text-gray-700 mb-3',
                'text-xs mb-2'
              )}>
                <strong>Je peux vous aider avec :</strong>
              </p>
              <ul className={getMobileClasses(
                'text-sm text-gray-600 space-y-1',
                'text-xs space-y-0.5'
              )}>
                <li>• Prospection et génération de leads</li>
                <li>• Techniques de négociation et closing</li>
                <li>• Management d'équipes commerciales</li>
                <li>• Transformation digitale commerciale</li>
                <li>• Formation et coaching terrain</li>
              </ul>
              <p className={getMobileClasses(
                'text-xs text-gray-500 mt-3',
                'text-[10px] mt-2'
              )}>
                {isMobile 
                  ? 'Tapez votre question ou ajoutez des fichiers !' 
                  : 'Posez-moi vos questions ou envoyez des documents pour analyse !'
                }
              </p>
            </div>
          </div>
        )}

        {/* Messages de conversation */}
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        {/* Message en cours de streaming */}
        {isStreaming && streamingMessage && (
          <MessageBubble
            message={{
              id: 'streaming',
              role: 'assistant',
              content: '',
              timestamp: new Date()
            }}
            isStreaming={true}
            streamingContent={streamingMessage}
          />
        )}

        {/* Message d'erreur */}
        {error && (
          <ErrorMessage
            error={error}
            recoveryAction={recoveryAction}
            onRetry={onRetry}
            onDismiss={onClearError}
            onContactRedirect={() => {
              // Ouvrir la page de contact
              window.open('/contact', '_blank');
            }}
            className="mx-4"
          />
        )}

        {/* Indicateur de chargement */}
        {isLoading && !isStreaming && (
          <div className="flex justify-start mb-4">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-blue-ink rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">LS</span>
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-gray-500">Laurent réfléchit...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <div className={getMobileClasses(
        'border-t border-gray-200 p-4',
        'p-3'
      )}
      style={{
        // Ajustement pour le clavier virtuel
        ...(isMobile && isKeyboardVisible && {
          paddingBottom: '0.75rem'
        })
      }}>
        {/* Fichiers sélectionnés */}
        {selectedFiles.length > 0 && (
          <div className={getMobileClasses('mb-3', 'mb-2')}>
            <div className="flex items-center justify-between mb-2">
              <span className={getMobileClasses(
                'text-sm font-medium text-gray-700',
                'text-xs'
              )}>
                Fichiers à envoyer ({selectedFiles.length})
              </span>
              <button
                onClick={() => setSelectedFiles([])}
                className={getMobileClasses(
                  'text-xs text-gray-500 hover:text-red-500',
                  'text-[10px] active:text-red-500'
                )}
              >
                Tout supprimer
              </button>
            </div>
            <div className={getMobileClasses('space-y-2', 'space-y-1')}>
              {selectedFiles.map((file, index) => (
                <div key={index} className={getMobileClasses(
                  'flex items-center justify-between bg-gray-50 rounded-lg p-2',
                  'p-1.5'
                )}>
                  <div className={getMobileClasses('flex items-center space-x-2', 'space-x-1.5')}>
                    <div className={getMobileClasses(
                      'w-8 h-8 bg-gray-200 rounded flex items-center justify-center',
                      'w-6 h-6'
                    )}>
                      <svg className={getMobileClasses('w-4 h-4 text-gray-500', 'w-3 h-3')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className={getMobileClasses('text-sm font-medium text-gray-900', 'text-xs')}>
                        {file.name.length > 20 && isMobile ? `${file.name.substring(0, 20)}...` : file.name}
                      </p>
                      <p className={getMobileClasses('text-xs text-gray-500', 'text-[10px]')}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className={getMobileClasses(
                      'text-gray-400 hover:text-red-500',
                      'active:text-red-500'
                    )}
                  >
                    <svg className={getMobileClasses('w-4 h-4', 'w-3 h-3')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uploader de fichiers */}
        {showFileUploader && (
          <div className={getMobileClasses('mb-3', 'mb-2')}>
            <FileUploader
              onFileSelect={handleFileSelect}
              acceptedTypes={['image/*', 'video/*', 'audio/*']}
              maxFileSize={10 * 1024 * 1024} // 10MB
              maxFiles={5}
              disabled={isSending}
            />
          </div>
        )}

        {/* Zone de saisie de texte */}
        <div className={getMobileClasses('flex items-end space-x-2', 'space-x-1.5')}>
          {/* Bouton d'ajout de fichiers */}
          <button
            onClick={() => setShowFileUploader(!showFileUploader)}
            className={getMobileClasses(
              `w-10 h-10 rounded-full flex items-center justify-center transition-colors
              ${showFileUploader 
                ? 'bg-mint-green text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`,
              'w-8 h-8 active:bg-gray-300'
            )}
            disabled={isSending}
            title="Ajouter des fichiers"
          >
            <svg className={getMobileClasses('w-5 h-5', 'w-4 h-4')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          {/* Textarea */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputText}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isMobile ? "Votre question..." : "Posez votre question à Laurent Serre..."}
              className={getMobileClasses(
                `w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl 
                focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent
                resize-none max-h-32 text-sm`,
                'px-3 py-2 pr-8 text-xs max-h-20'
              )}
              rows={1}
              disabled={isSending}
              style={{
                // Ajustement pour mobile
                ...(isMobile && {
                  fontSize: '16px', // Évite le zoom sur iOS
                  lineHeight: '1.2'
                })
              }}
            />
            
            {/* Compteur de caractères */}
            <div className={getMobileClasses(
              'absolute bottom-1 right-1 text-xs text-gray-400',
              'text-[10px] bottom-0.5 right-0.5'
            )}>
              {inputText.length}/2000
            </div>
          </div>

          {/* Bouton d'envoi */}
          <button
            onClick={handleSendMessage}
            disabled={!canSendMessage}
            className={getMobileClasses(
              `w-10 h-10 rounded-full flex items-center justify-center transition-all
              ${canSendMessage
                ? 'bg-mint-green text-white hover:bg-mint-green/90 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`,
              'w-8 h-8 active:scale-95'
            )}
            title="Envoyer le message"
          >
            {isSending ? (
              <div className={getMobileClasses(
                'w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin',
                'w-3 h-3'
              )} />
            ) : (
              <svg className={getMobileClasses('w-5 h-5', 'w-4 h-4')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>

        {/* Indicateurs d'état */}
        <div className={getMobileClasses(
          'flex items-center justify-between mt-2 text-xs text-gray-500',
          'mt-1.5 text-[10px]'
        )}>
          <div className={getMobileClasses('flex items-center space-x-4', 'space-x-2')}>
            {selectedFiles.length > 0 && (
              <span>
                {selectedFiles.length} fichier{selectedFiles.length > 1 ? 's' : ''}
              </span>
            )}
            {isStreaming && (
              <span className="flex items-center space-x-1">
                <div className={getMobileClasses('w-2 h-2 bg-mint-green rounded-full animate-pulse', 'w-1.5 h-1.5')} />
                <span>{isMobile ? 'Répond...' : 'Laurent répond...'}</span>
              </span>
            )}
          </div>
          {!isMobile && (
            <div className="text-right">
              <span>Entrée pour envoyer • Shift+Entrée pour nouvelle ligne</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}