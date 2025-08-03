'use client';

import React, { useState, useEffect } from 'react';
import { PrivacyManager } from '@/lib/gemini/privacy-manager';

interface PrivacyNoticeProps {
  onAccept: (settings: PrivacySettings) => void;
  onDecline: () => void;
  isVisible: boolean;
  isMobile?: boolean;
}

interface PrivacySettings {
  allowDataCollection: boolean;
  allowAnalytics: boolean;
  allowCookies: boolean;
  autoDeleteAfterDays: number;
}

export default function PrivacyNotice({ 
  onAccept, 
  onDecline, 
  isVisible, 
  isMobile = false 
}: PrivacyNoticeProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [settings, setSettings] = useState<PrivacySettings>({
    allowDataCollection: false,
    allowAnalytics: false,
    allowCookies: false,
    autoDeleteAfterDays: 7,
  });

  if (!isVisible) return null;

  const handleAccept = () => {
    onAccept(settings);
  };

  const handleDecline = () => {
    onDecline();
  };

  const toggleSetting = (key: keyof PrivacySettings) => {
    if (key === 'autoDeleteAfterDays') return; // Géré séparément
    
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof Omit<PrivacySettings, 'autoDeleteAfterDays'>]
    }));
  };

  const handleDeleteDaysChange = (days: number) => {
    setSettings(prev => ({
      ...prev,
      autoDeleteAfterDays: days
    }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`
        bg-white rounded-2xl shadow-2xl border border-gray-200 
        max-h-[90vh] overflow-y-auto
        ${isMobile ? 'mx-4 w-full max-w-sm' : 'mx-8 w-full max-w-lg'}
      `}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-ink to-mint-green text-white p-6 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Confidentialité et données</h2>
              <p className="text-sm opacity-90">Votre vie privée est importante</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Notice principale */}
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-ink rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-xs">LS</span>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="font-medium text-blue-ink mb-2">
                    Bienvenue sur l'assistant IA de Laurent Serre !
                  </p>
                  <p>
                    Cet assistant utilise l'IA Gemini pour vous aider avec vos questions sur le développement commercial. 
                    Vos conversations peuvent être temporairement stockées pour améliorer votre expérience.
                  </p>
                </div>
              </div>
            </div>

            {/* Informations essentielles */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-mint-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-600">
                  <strong>Données traitées :</strong> Vos messages et fichiers partagés sont envoyés à l'API Gemini de Google
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-mint-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-600">
                  <strong>Stockage local :</strong> L'historique est sauvegardé dans votre navigateur uniquement
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-mint-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-600">
                  <strong>Suppression :</strong> Vous pouvez supprimer vos données à tout moment
                </p>
              </div>
            </div>
          </div>

          {/* Paramètres détaillés */}
          <div className="space-y-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-700">Paramètres avancés</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDetails && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                {/* Collecte de données */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-700">Collecte de données</p>
                    <p className="text-xs text-gray-500">Stocker l'historique des conversations</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('allowDataCollection')}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${settings.allowDataCollection ? 'bg-mint-green' : 'bg-gray-300'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${settings.allowDataCollection ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-700">Analytics anonymes</p>
                    <p className="text-xs text-gray-500">Améliorer l'assistant (données anonymisées)</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('allowAnalytics')}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${settings.allowAnalytics ? 'bg-mint-green' : 'bg-gray-300'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${settings.allowAnalytics ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>

                {/* Cookies */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-700">Cookies de préférences</p>
                    <p className="text-xs text-gray-500">Mémoriser vos paramètres</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('allowCookies')}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${settings.allowCookies ? 'bg-mint-green' : 'bg-gray-300'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${settings.allowCookies ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>

                {/* Suppression automatique */}
                <div className="space-y-2">
                  <p className="font-medium text-sm text-gray-700">Suppression automatique</p>
                  <p className="text-xs text-gray-500">Supprimer automatiquement les anciennes conversations</p>
                  <div className="flex space-x-2">
                    {[1, 7, 30, 90].map(days => (
                      <button
                        key={days}
                        onClick={() => handleDeleteDaysChange(days)}
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium transition-colors
                          ${settings.autoDeleteAfterDays === days 
                            ? 'bg-mint-green text-white' 
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }
                        `}
                      >
                        {days === 1 ? '1 jour' : `${days} jours`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Liens utiles */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              En utilisant cet assistant, vous acceptez nos{' '}
              <a href="/confidentialite" className="text-mint-green hover:underline" target="_blank">
                conditions d'utilisation
              </a>
              {' '}et notre{' '}
              <a href="/confidentialite" className="text-mint-green hover:underline" target="_blank">
                politique de confidentialité
              </a>.
            </p>
            <p>
              Vos données sont traitées conformément au RGPD. 
              Vous pouvez exercer vos droits à tout moment.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 rounded-b-2xl">
          <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'space-x-3'}`}>
            <button
              onClick={handleDecline}
              className={`
                px-6 py-3 border border-gray-300 text-gray-700 rounded-lg
                hover:bg-gray-100 transition-colors font-medium
                ${isMobile ? 'w-full' : 'flex-1'}
              `}
            >
              Refuser
            </button>
            <button
              onClick={handleAccept}
              className={`
                px-6 py-3 bg-gradient-to-r from-mint-green to-blue-ink text-white rounded-lg
                hover:shadow-lg transition-all font-medium
                ${isMobile ? 'w-full' : 'flex-1'}
              `}
            >
              Accepter et continuer
            </button>
          </div>
          
          {isMobile && (
            <p className="text-xs text-gray-500 text-center mt-3">
              Vous pouvez modifier ces paramètres à tout moment dans les options du chat
            </p>
          )}
        </div>
      </div>
    </div>
  );
}