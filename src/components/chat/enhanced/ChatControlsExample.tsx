'use client';

import React, { useState } from 'react';
import ChatControls from './ChatControls';

/**
 * Example component demonstrating the enhanced ChatControls functionality
 * This shows all the features implemented in task 4.1:
 * - Close button with site-consistent design
 * - State preservation logic
 * - Reopening indicator when closed
 * - Mobile-optimized touch targets
 * - Confirmation dialog when streaming
 * - Keyboard shortcuts
 */
const ChatControlsExample: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(true);

  const handleClose = () => {
    console.log('Chat fermé - état préservé');
    setIsClosed(true);
  };

  const handleReopen = () => {
    console.log('Chat rouvert - état restauré');
    setIsClosed(false);
  };

  const handleMinimize = () => {
    console.log('Chat minimisé/maximisé');
    setIsMinimized(!isMinimized);
  };

  const handleFullscreen = () => {
    console.log('Mode plein écran basculé');
    setIsFullscreen(!isFullscreen);
  };

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
  };

  const toggleConfirmation = () => {
    setShowCloseConfirmation(!showCloseConfirmation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-bg via-mint-green/10 to-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-ink mb-8 text-center">
          ChatControls - Démonstration des améliorations
        </h1>

        {/* Controls Demo */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-blue-ink mb-6">
            Contrôles du Chat Améliorés
          </h2>

          {/* Demo Controls */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={toggleStreaming}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isStreaming
                  ? 'bg-mint-green text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isStreaming ? 'Arrêter le streaming' : 'Démarrer le streaming'}
            </button>

            <button
              onClick={toggleConfirmation}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showCloseConfirmation
                  ? 'bg-blue-ink text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Confirmation: {showCloseConfirmation ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => setIsClosed(false)}
              className="px-4 py-2 bg-orange-soft text-white rounded-lg font-medium hover:bg-orange-soft/90 transition-colors"
            >
              Réinitialiser
            </button>
          </div>

          {/* Chat Controls Container */}
          <div className="relative bg-gradient-to-br from-blue-ink to-mint-green rounded-2xl p-6 min-h-[200px] flex items-center justify-center">
            <div className="text-white text-center mb-8">
              <h3 className="text-lg font-semibold mb-2">Interface de Chat Laurent Serre</h3>
              <p className="text-sm opacity-90">
                {isClosed 
                  ? 'Chat fermé - Cliquez sur l\'indicateur pour rouvrir'
                  : isMinimized 
                    ? 'Chat minimisé'
                    : isFullscreen 
                      ? 'Mode plein écran'
                      : 'Mode normal'
                }
              </p>
              {isStreaming && !isClosed && (
                <p className="text-xs mt-2 opacity-75">
                  ⚠️ Streaming en cours - La fermeture nécessitera une confirmation
                </p>
              )}
            </div>

            {/* Chat Controls */}
            <div className="absolute top-4 right-4">
              <ChatControls
                onClose={handleClose}
                onMinimize={handleMinimize}
                onFullscreen={handleFullscreen}
                onReopen={handleReopen}
                isMinimized={isMinimized}
                isFullscreen={isFullscreen}
                isStreaming={isStreaming}
                isClosed={isClosed}
                showCloseConfirmation={showCloseConfirmation}
              />
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-blue-ink mb-6">
            Fonctionnalités Implémentées (Tâche 4.1)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-mint-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-ink">Design cohérent au site</h3>
                  <p className="text-sm text-gray-600">Utilise les couleurs de la charte graphique (blue-ink, mint-green, orange-soft)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-mint-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-ink">Préservation d'état</h3>
                  <p className="text-sm text-gray-600">L'historique de conversation est préservé lors de la fermeture</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-mint-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-ink">Indicateur de réouverture</h3>
                  <p className="text-sm text-gray-600">Bouton flottant avec notification pour rouvrir le chat</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-mint-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-ink">Optimisation mobile</h3>
                  <p className="text-sm text-gray-600">Boutons 44px minimum pour usage tactile</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-mint-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-ink">Confirmation intelligente</h3>
                  <p className="text-sm text-gray-600">Demande confirmation avant fermeture si streaming en cours</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-mint-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-ink">Raccourcis clavier</h3>
                  <p className="text-sm text-gray-600">Échap pour fermer, Ctrl+M pour minimiser, F11 pour plein écran</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-ink/5 rounded-lg border border-blue-ink/20">
            <h4 className="font-semibold text-blue-ink mb-2">Instructions de test :</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Activez le streaming et essayez de fermer → Confirmation requise</li>
              <li>• Utilisez Échap pour fermer le chat → Indicateur de réouverture apparaît</li>
              <li>• Testez les raccourcis : Ctrl+M (minimiser), F11 (plein écran)</li>
              <li>• Vérifiez la responsivité sur mobile (boutons 44px minimum)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatControlsExample;