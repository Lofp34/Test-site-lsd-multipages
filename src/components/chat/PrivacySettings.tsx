'use client';

import React, { useState, useEffect } from 'react';
import { PrivacyManager, PrivacySettings as IPrivacySettings, PrivacyAuditResult } from '@/lib/gemini/privacy-manager';

interface PrivacySettingsProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export default function PrivacySettings({ 
  isOpen, 
  onClose, 
  isMobile = false 
}: PrivacySettingsProps) {
  const [privacyManager] = useState(() => new PrivacyManager());
  const [settings, setSettings] = useState<IPrivacySettings | null>(null);
  const [auditResult, setAuditResult] = useState<PrivacyAuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'txt' | 'csv'>('json');

  useEffect(() => {
    if (isOpen) {
      loadSettings();
      performAudit();
    }
  }, [isOpen]);

  const loadSettings = () => {
    const currentSettings = privacyManager.getSettings();
    setSettings(currentSettings);
  };

  const performAudit = () => {
    const audit = privacyManager.performPrivacyAudit();
    setAuditResult(audit);
  };

  const handleSettingChange = (key: keyof IPrivacySettings, value: any) => {
    if (!settings) return;

    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    privacyManager.updateSettings({ [key]: value });
  };

  const handleDeleteAllData = async () => {
    setIsLoading(true);
    try {
      const result = privacyManager.deleteAllUserData();
      
      if (result.errors.length > 0) {
        alert(`Erreurs lors de la suppression: ${result.errors.join(', ')}`);
      } else {
        alert(`Données supprimées avec succès:
- ${result.deletedConversations} conversations
- Paramètres: ${result.deletedSettings ? 'Oui' : 'Non'}
- Consentement: ${result.deletedConsent ? 'Oui' : 'Non'}`);
      }
      
      loadSettings();
      performAudit();
    } catch (error) {
      alert(`Erreur: ${error}`);
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleExportData = () => {
    try {
      const exportedData = privacyManager.exportUserData({
        includeMetadata: true,
        includeTimestamps: true,
        format: exportFormat
      });

      // Créer et télécharger le fichier
      const blob = new Blob([exportedData], { 
        type: exportFormat === 'json' ? 'application/json' : 'text/plain' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-data-export.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setShowExportOptions(false);
    } catch (error) {
      alert(`Erreur lors de l'export: ${error}`);
    }
  };

  const handleAnonymizeData = async () => {
    setIsLoading(true);
    try {
      const result = privacyManager.anonymizeExistingData();
      
      if (result.errors.length > 0) {
        alert(`Erreurs lors de l'anonymisation: ${result.errors.join(', ')}`);
      } else {
        alert(`Anonymisation terminée:
- ${result.processedConversations} conversations traitées
- ${result.anonymizedMessages} messages anonymisés`);
      }
      
      performAudit();
    } catch (error) {
      alert(`Erreur: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDataSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'violation': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (!isOpen || !settings) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`
        bg-white rounded-2xl shadow-2xl border border-gray-200 
        max-h-[90vh] overflow-y-auto
        ${isMobile ? 'mx-4 w-full max-w-sm' : 'mx-8 w-full max-w-2xl'}
      `}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-ink to-mint-green text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Paramètres de confidentialité</h2>
                <p className="text-sm opacity-90">Gérez vos données et votre vie privée</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Audit de confidentialité */}
          {auditResult && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">État de vos données</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{auditResult.totalConversations}</div>
                  <div className="text-sm text-gray-600">Conversations</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{auditResult.totalMessages}</div>
                  <div className="text-sm text-gray-600">Messages</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{formatDataSize(auditResult.dataSize)}</div>
                  <div className="text-sm text-gray-600">Taille</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {auditResult.oldestData ? Math.floor((Date.now() - auditResult.oldestData.getTime()) / (1000 * 60 * 60 * 24)) : 0}
                  </div>
                  <div className="text-sm text-gray-600">Jours max</div>
                </div>
              </div>

              {/* Statut de conformité */}
              <div className={`p-4 rounded-lg border ${getComplianceColor(auditResult.complianceStatus)}`}>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d={auditResult.complianceStatus === 'compliant' 
                            ? "M5 13l4 4L19 7" 
                            : auditResult.complianceStatus === 'warning'
                            ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                            : "M6 18L18 6M6 6l12 12"
                          } 
                    />
                  </svg>
                  <span className="font-medium">
                    {auditResult.complianceStatus === 'compliant' && 'Conforme RGPD'}
                    {auditResult.complianceStatus === 'warning' && 'Attention requise'}
                    {auditResult.complianceStatus === 'violation' && 'Non conforme'}
                  </span>
                </div>
                {auditResult.recommendations.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm">
                    {auditResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-current">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Paramètres de confidentialité */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Paramètres</h3>
            
            <div className="space-y-4">
              {/* Collecte de données */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-700">Collecte de données</p>
                  <p className="text-sm text-gray-500">Stocker l'historique des conversations localement</p>
                </div>
                <button
                  onClick={() => handleSettingChange('allowDataCollection', !settings.allowDataCollection)}
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
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-700">Analytics anonymes</p>
                  <p className="text-sm text-gray-500">Améliorer l'assistant avec des données anonymisées</p>
                </div>
                <button
                  onClick={() => handleSettingChange('allowAnalytics', !settings.allowAnalytics)}
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
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-700">Cookies de préférences</p>
                  <p className="text-sm text-gray-500">Mémoriser vos paramètres entre les sessions</p>
                </div>
                <button
                  onClick={() => handleSettingChange('allowCookies', !settings.allowCookies)}
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

              {/* Anonymisation */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-700">Anonymisation automatique</p>
                  <p className="text-sm text-gray-500">Masquer automatiquement les données personnelles</p>
                </div>
                <button
                  onClick={() => handleSettingChange('anonymizeData', !settings.anonymizeData)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${settings.anonymizeData ? 'bg-mint-green' : 'bg-gray-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${settings.anonymizeData ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>

              {/* Suppression automatique */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div>
                  <p className="font-medium text-gray-700">Suppression automatique</p>
                  <p className="text-sm text-gray-500">Supprimer automatiquement les anciennes conversations</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 7, 30, 90, 365].map(days => (
                    <button
                      key={days}
                      onClick={() => handleSettingChange('autoDeleteAfterDays', days)}
                      className={`
                        px-3 py-1 rounded-full text-sm font-medium transition-colors
                        ${settings.autoDeleteAfterDays === days 
                          ? 'bg-mint-green text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                        }
                      `}
                    >
                      {days === 1 ? '1 jour' : days === 365 ? '1 an' : `${days} jours`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions sur les données */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Gestion des données</h3>
            
            <div className="grid gap-4">
              {/* Export des données */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700">Exporter mes données</p>
                    <p className="text-sm text-gray-500">Télécharger toutes vos conversations</p>
                  </div>
                  <button
                    onClick={() => setShowExportOptions(!showExportOptions)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Exporter
                  </button>
                </div>
                
                {showExportOptions && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Format d'export :</p>
                    <div className="flex space-x-2 mb-3">
                      {(['json', 'txt', 'csv'] as const).map(format => (
                        <button
                          key={format}
                          onClick={() => setExportFormat(format)}
                          className={`
                            px-3 py-1 rounded text-sm font-medium transition-colors
                            ${exportFormat === format 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white text-gray-600 hover:bg-gray-100'
                            }
                          `}
                        >
                          {format.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleExportData}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Télécharger ({exportFormat.toUpperCase()})
                    </button>
                  </div>
                )}
              </div>

              {/* Anonymisation manuelle */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700">Anonymiser les données existantes</p>
                    <p className="text-sm text-gray-500">Masquer les informations personnelles dans l'historique</p>
                  </div>
                  <button
                    onClick={handleAnonymizeData}
                    disabled={isLoading}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'En cours...' : 'Anonymiser'}
                  </button>
                </div>
              </div>

              {/* Suppression complète */}
              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-700">Supprimer toutes mes données</p>
                    <p className="text-sm text-red-600">Action irréversible - supprime tout l'historique</p>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation de suppression */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 mx-4 max-w-md">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Confirmer la suppression</h3>
                <p className="text-gray-600">
                  Cette action supprimera définitivement toutes vos conversations, paramètres et données. 
                  Cette action ne peut pas être annulée.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteAllData}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Suppression...' : 'Supprimer tout'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}