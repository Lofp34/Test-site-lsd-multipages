'use client';

import React, { useState, useEffect } from 'react';

interface AlertThresholds {
  criticalLinksThreshold: number;
  healthScoreThreshold: number;
  brokenLinksIncreaseThreshold: number;
  responseTimeThreshold: number;
}

interface AlertConfig {
  enabled: boolean;
  thresholds: AlertThresholds;
  cooldownPeriod: number;
  adminEmail: string;
}

export function AlertSettings() {
  const [config, setConfig] = useState<AlertConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/alert-config');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Failed to fetch alert config:', error);
      setMessage({ type: 'error', text: 'Erreur lors du chargement de la configuration' });
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async () => {
    if (!config) return;

    try {
      setSaving(true);
      const response = await fetch('/api/admin/alert-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Configuration sauvegardée avec succès' });
      } else {
        throw new Error('Failed to save config');
      }
    } catch (error) {
      console.error('Failed to save alert config:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  const testAlerts = async () => {
    try {
      setTesting(true);
      const response = await fetch('/api/admin/test-alerts', {
        method: 'POST',
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Email de test envoyé avec succès' });
      } else {
        setMessage({ type: 'error', text: 'Échec de l\'envoi du test' });
      }
    } catch (error) {
      console.error('Failed to test alerts:', error);
      setMessage({ type: 'error', text: 'Erreur lors du test' });
    } finally {
      setTesting(false);
    }
  };

  const sendWeeklyReport = async () => {
    try {
      const response = await fetch('/api/weekly-report');
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Rapport hebdomadaire envoyé' });
      } else {
        setMessage({ type: 'error', text: 'Échec de l\'envoi du rapport' });
      }
    } catch (error) {
      console.error('Failed to send weekly report:', error);
      setMessage({ type: 'error', text: 'Erreur lors de l\'envoi du rapport' });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center text-red-600">
          Impossible de charger la configuration des alertes
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-blue-ink">
          Configuration des Alertes
        </h3>
        
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
              className="rounded border-gray-300 text-mint-green focus:ring-mint-green"
            />
            Alertes activées
          </label>
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Seuils d'alerte */}
        <div>
          <h4 className="font-medium text-gray-700 mb-4">Seuils d'Alerte</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Liens critiques (seuil)
              </label>
              <input
                type="number"
                min="1"
                value={config.thresholds.criticalLinksThreshold}
                onChange={(e) => setConfig({
                  ...config,
                  thresholds: {
                    ...config.thresholds,
                    criticalLinksThreshold: parseInt(e.target.value) || 1
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Alerte si ≥ ce nombre de liens critiques
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Score de santé minimum (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={config.thresholds.healthScoreThreshold}
                onChange={(e) => setConfig({
                  ...config,
                  thresholds: {
                    ...config.thresholds,
                    healthScoreThreshold: parseInt(e.target.value) || 0
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Alerte si score &lt; ce pourcentage
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Augmentation liens morts
              </label>
              <input
                type="number"
                min="1"
                value={config.thresholds.brokenLinksIncreaseThreshold}
                onChange={(e) => setConfig({
                  ...config,
                  thresholds: {
                    ...config.thresholds,
                    brokenLinksIncreaseThreshold: parseInt(e.target.value) || 1
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Alerte si augmentation ≥ ce nombre
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temps de réponse max (ms)
              </label>
              <input
                type="number"
                min="1000"
                value={config.thresholds.responseTimeThreshold}
                onChange={(e) => setConfig({
                  ...config,
                  thresholds: {
                    ...config.thresholds,
                    responseTimeThreshold: parseInt(e.target.value) || 1000
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Alerte si temps de réponse &gt; cette valeur
              </p>
            </div>
          </div>
        </div>

        {/* Configuration générale */}
        <div>
          <h4 className="font-medium text-gray-700 mb-4">Configuration Générale</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Période de cooldown (minutes)
              </label>
              <input
                type="number"
                min="5"
                value={config.cooldownPeriod}
                onChange={(e) => setConfig({
                  ...config,
                  cooldownPeriod: parseInt(e.target.value) || 5
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Délai minimum entre deux alertes du même type
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email administrateur
              </label>
              <input
                type="email"
                value={config.adminEmail}
                onChange={(e) => setConfig({
                  ...config,
                  adminEmail: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Adresse de réception des alertes
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <button
            onClick={saveConfig}
            disabled={saving}
            className="flex items-center gap-2 bg-mint-green text-white px-4 py-2 rounded-lg hover:bg-mint-green/90 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            Sauvegarder
          </button>

          <button
            onClick={testAlerts}
            disabled={testing}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {testing ? (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            Tester Alerte
          </button>

          <button
            onClick={sendWeeklyReport}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Rapport Hebdo
          </button>
        </div>
      </div>
    </div>
  );
}