'use client';

import React, { useState } from 'react';
import { useMultimodalChat } from '@/hooks/useMultimodalChat';
import FileUploader from './FileUploader';
import FilePreview from './FilePreview';
import { UploadedFile } from '@/lib/gemini/types';

interface MultimodalChatExampleProps {
  apiKey: string;
  onSendMessage?: (message: string, files?: UploadedFile[]) => Promise<void>;
}

export default function MultimodalChatExample({ 
  apiKey, 
  onSendMessage 
}: MultimodalChatExampleProps) {
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const {
    messages,
    isUploading,
    uploadError,
    pendingFiles,
    uploadedFiles,
    addFiles,
    removeFile,
    removePendingFile,
    clearFiles,
    sendMultimodalMessage,
    clearUploadError,
    hasFiles,
    canSendMessage
  } = useMultimodalChat(apiKey, onSendMessage);

  const handleSendMessage = async () => {
    if (!inputText.trim() && uploadedFiles.length === 0) return;
    if (!canSendMessage) return;

    setIsSending(true);
    try {
      await sendMultimodalMessage(inputText);
      setInputText('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-ink mb-6">
        Chat Multimodal Gemini
      </h2>

      {/* Zone de messages */}
      <div className="mb-6 max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Commencez une conversation en tapant un message ou en ajoutant des fichiers...
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-mint-green text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.files && message.files.length > 0 && (
                    <div className="mt-2">
                      <FilePreview 
                        files={message.files} 
                        showRemoveButton={false}
                        maxPreviewSize={3}
                      />
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Zone d'upload de fichiers */}
      <div className="mb-4">
        <FileUploader
          onFileSelect={addFiles}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024} // 10MB
          maxFiles={5}
          disabled={isUploading}
        />
      </div>

      {/* Erreur d'upload */}
      {uploadError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center justify-between">
            <p className="text-sm text-red-600">{uploadError}</p>
            <button
              onClick={clearUploadError}
              className="text-red-400 hover:text-red-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Fichiers en attente */}
      {pendingFiles.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800 mb-2">
            Fichiers en attente d'upload:
          </p>
          <div className="space-y-1">
            {pendingFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-yellow-700">{file.name}</span>
                <button
                  onClick={() => removePendingFile(index)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fichiers uploadés */}
      {uploadedFiles.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">
              Fichiers prêts à envoyer:
            </p>
            <button
              onClick={clearFiles}
              className="text-sm text-gray-500 hover:text-red-500"
            >
              Tout supprimer
            </button>
          </div>
          <FilePreview 
            files={uploadedFiles} 
            onRemove={removeFile}
            showRemoveButton={true}
          />
        </div>
      )}

      {/* Zone de saisie */}
      <div className="flex space-x-2">
        <div className="flex-1">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message... (Entrée pour envoyer, Shift+Entrée pour nouvelle ligne)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent resize-none"
            rows={3}
            disabled={isSending}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={(!inputText.trim() && uploadedFiles.length === 0) || !canSendMessage || isSending}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            (!inputText.trim() && uploadedFiles.length === 0) || !canSendMessage || isSending
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-mint-green text-white hover:bg-mint-green/90'
          }`}
        >
          {isSending ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Envoi...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Envoyer</span>
            </div>
          )}
        </button>
      </div>

      {/* Indicateurs d'état */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          {isUploading && (
            <span className="flex items-center space-x-1">
              <div className="w-3 h-3 border border-mint-green border-t-transparent rounded-full animate-spin" />
              <span>Upload en cours...</span>
            </span>
          )}
          {hasFiles && (
            <span>
              {uploadedFiles.length} fichier{uploadedFiles.length > 1 ? 's' : ''} prêt{uploadedFiles.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div>
          {inputText.length}/2000 caractères
        </div>
      </div>
    </div>
  );
}