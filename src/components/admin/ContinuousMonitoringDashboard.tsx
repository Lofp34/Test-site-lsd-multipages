'use client';

import React, { useState, useEffect } from 'react';
import { continuousMonitoring, MonitoringMetrics, AlertRule } from '@/lib/monitoring/continuous-monitoring';

interface ContinuousMonitoringDashboardProps {
  className?: string;
}

type TabType = 'overview' | 'metrics' | 'alerts' | 'fallbacks' | 'reports';

export function ContinuousMonitoringDashboard({ className = '' }: ContinuousMonitoringDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [currentMetrics, setCurrentMetrics] = useState<MonitoringMetrics | null>(null);
  const [metricsHistory, setMetricsHistory] = useState<MonitoringMetrics[]>([]);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [monitoringStatus, setMonitoringStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données initiales
  useEffect(() => {
    loadMonitoringData();
    
    // Actualiser les données toutes les 30 secondes
    const interval = setInterval(loadMonitoringData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadMonitoringData = async () => {
    try {
      setIsLoading(true);
      
      // Charger les métriques actuelles
      const metrics = continuousMonitoring.getCurrentMetrics();
      setCurrentMetrics(metrics);
      
      // Charger l'historique des 24 dernières heures
      const history = continuousMonitoring.getMetricsHistory(24);
      setMetricsHistory(history);
      
      // Charger les règles d'alerte
      const rules = continuousMonitoring.getAlertRules();
      setAlertRules(rules);
      
      // Charger le statut du monitoring
      const status = continuousMonitoring.getStatus();
      setMonitoringStatus(status);
      
    } catch (error) {
      console.error('Erreur lors du chargement des données de monitoring:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartMonitoring = async () => {
    try {
      await continuousMonitoring.start();
      await loadMonitoringData();
    } catch (error) {
      console.error('Erreur lors du démarrage du monitoring:', error);
    }
  };

  const handleStopMonitoring = () => {
    continuousMonitoring.stop();
    loadMonitoringData();
  };

  const handleForceCheck = async () => {
    try {
      await continuousMonitoring.forceMonitoringCycle();
      await loadMonitoringData();
    } catch (error) {
      console.error('Erreur lors de la vérification forcée:', error);
    }
  };

  const toggleAlertRule = (ruleId: string, enabled: boolean) => {
    continuousMonitoring.updateAlertRule(ruleId, { enabled });
    loadMonitoringData();
  };

  const tabs = [
    {
      id: 'overview' as TabType,
      label: 'Vue d\'ensemble',
      icon: '📊',
      description: 'Statut global du monitoring continu'
    },
    {
      id: 'metrics' as TabType,
      label: 'Métriques',
      icon: '📈',
      description: 'Métriques temps réel et historique'
    },
    {
      id: 'alerts' as TabType,
      label: 'Alertes',
      icon: '🚨',
      description: 'Configuration et historique des alertes'
    },
    {
      id: 'fallbacks' as TabType,
      label: 'Fallbacks',
      icon: '🔄',
      description: 'Monitoring des systèmes de fallback'
    },
    {
      id: 'reports' as TabType,
      label: 'Rapports',
      icon: '📋',
      description: 'Rapports automatiques et planifiés'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return '✅';
      case 'warning': return '⚠️';
      case 'critical': return '🚨';
      default: return '❓';
    }
  };

  if (isLoading && !currentMetrics) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-8 text-center ${className}`}>
        <div className="animate-spin w-8 h-8 border-4 border-mint-green border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement du monitoring continu...</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-ink mb-2">
                🔍 Monitoring Continu - Optimisation Vercel
              </h1>
              <p className="text-gray-600">
                Surveillance 24/7 des ressources, performances et systèmes de fallback
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Statut du monitoring */}
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                monitoringStatus?.isRunning 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {monitoringStatus?.isRunning ? '🟢 Actif' : '🔴 Arrêté'}
              </div>
              
              {/* Boutons de contrôle */}
              <div className="flex gap-2">
                {!monitoringStatus?.isRunning ? (
                  <button
                    onClick={handleStartMonitoring}
                    className="px-4 py-2 bg-mint-green text-white rounded-lg hover:bg-mint-green/90 transition-colors text-sm font-medium"
                  >
                    ▶️ Démarrer
                  </button>
                ) : (
                  <button
                    onClick={handleStopMonitoring}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    ⏹️ Arrêter
                  </button>
                )}
                
                <button
                  onClick={handleForceCheck}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  🔄 Vérifier
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-mint-green text-mint-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    currentMetrics ? getStatusColor(currentMetrics.systemHealth.vercelStatus) : 'bg-gray-100 text-gray-600'
                  }`}>
                    {currentMetrics ? getStatusIcon(currentMetrics.systemHealth.vercelStatus) : '❓'} Vercel
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Usage Vercel</h3>
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {currentMetrics ? `${currentMetrics.vercelUsage.percentageUsed.toFixed(1)}%` : 'N/A'}
                </div>
                <div className="text-sm text-blue-600">
                  {currentMetrics ? `${currentMetrics.vercelUsage.invocations} invocations` : 'Aucune donnée'}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                    Performance
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Temps de Réponse</h3>
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {currentMetrics ? `${currentMetrics.performance.averageResponseTime}ms` : 'N/A'}
                </div>
                <div className="text-sm text-green-600">
                  Erreurs: {currentMetrics ? `${currentMetrics.performance.errorRate.toFixed(1)}%` : 'N/A'}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    currentMetrics ? getStatusColor(currentMetrics.systemHealth.fallbackStatus === 'ready' ? 'healthy' : 'warning') : 'bg-gray-100 text-gray-600'
                  }`}>
                    {currentMetrics ? (currentMetrics.systemHealth.fallbackStatus === 'ready' ? '✅' : '🔄') : '❓'} Fallback
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Système de Fallback</h3>
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {currentMetrics ? (currentMetrics.systemHealth.fallbackStatus === 'ready' ? 'Prêt' : 'Actif') : 'N/A'}
                </div>
                <div className="text-sm text-purple-600">GitHub Actions</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚨</span>
                  </div>
                  <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                    Alertes
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Alertes Actives</h3>
                <div className="text-2xl font-bold text-orange-900 mb-1">
                  {currentMetrics ? currentMetrics.alerts.activeAlerts : 0}
                </div>
                <div className="text-sm text-orange-600">
                  Critiques: {currentMetrics ? currentMetrics.alerts.criticalAlerts : 0}
                </div>
              </div>
            </div>

            {/* System Health Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-ink mb-4">📊 Résumé de la Santé du Système</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    currentMetrics?.systemHealth.vercelStatus === 'healthy' ? 'text-green-600' :
                    currentMetrics?.systemHealth.vercelStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {currentMetrics ? getStatusIcon(currentMetrics.systemHealth.vercelStatus) : '❓'}
                  </div>
                  <div className="text-sm font-medium text-gray-700">Vercel</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {currentMetrics?.systemHealth.vercelStatus || 'unknown'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    currentMetrics?.systemHealth.databaseStatus === 'healthy' ? 'text-green-600' :
                    currentMetrics?.systemHealth.databaseStatus === 'slow' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {currentMetrics?.systemHealth.databaseStatus === 'healthy' ? '✅' :
                     currentMetrics?.systemHealth.databaseStatus === 'slow' ? '⚠️' : '🚨'}
                  </div>
                  <div className="text-sm font-medium text-gray-700">Base de Données</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {currentMetrics?.systemHealth.databaseStatus || 'unknown'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-mint-green mb-2">
                    {monitoringStatus?.isRunning ? '🟢' : '🔴'}
                  </div>
                  <div className="text-sm font-medium text-gray-700">Monitoring</div>
                  <div className="text-xs text-gray-500">
                    {monitoringStatus?.isRunning ? 'Actif' : 'Arrêté'}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-ink mb-4">📈 Activité Récente</h3>
              <div className="space-y-3">
                {monitoringStatus?.lastCheck && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-600">Dernière vérification:</span>
                    <span className="font-medium">
                      {new Date(monitoringStatus.lastCheck).toLocaleString('fr-FR')}
                    </span>
                  </div>
                )}
                
                {monitoringStatus?.nextCheck && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-gray-600">Prochaine vérification:</span>
                    <span className="font-medium">
                      {new Date(monitoringStatus.nextCheck).toLocaleString('fr-FR')}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-600">Métriques collectées:</span>
                  <span className="font-medium">{monitoringStatus?.metricsCount || 0}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-600">Règles d'alerte actives:</span>
                  <span className="font-medium">{monitoringStatus?.activeRules || 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-ink">📈 Métriques en Temps Réel</h3>
            
            {currentMetrics ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Usage Vercel</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Invocations:</span>
                      <span className="font-medium">{currentMetrics.vercelUsage.invocations.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Compute Hours:</span>
                      <span className="font-medium">{currentMetrics.vercelUsage.computeHours.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pourcentage utilisé:</span>
                      <span className={`font-medium ${
                        currentMetrics.vercelUsage.percentageUsed >= 90 ? 'text-red-600' :
                        currentMetrics.vercelUsage.percentageUsed >= 70 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {currentMetrics.vercelUsage.percentageUsed.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projection mensuelle:</span>
                      <span className="font-medium">{currentMetrics.vercelUsage.projectedMonthly.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temps de réponse moyen:</span>
                      <span className="font-medium">{currentMetrics.performance.averageResponseTime}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taux d'erreur:</span>
                      <span className={`font-medium ${
                        currentMetrics.performance.errorRate > 5 ? 'text-red-600' :
                        currentMetrics.performance.errorRate > 2 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {currentMetrics.performance.errorRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usage mémoire:</span>
                      <span className="font-medium">{currentMetrics.performance.memoryUsage}MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fonctions lentes:</span>
                      <span className="font-medium">{currentMetrics.performance.slowFunctions}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucune métrique disponible. Le monitoring doit être démarré.
              </div>
            )}

            {/* Historique des métriques */}
            {metricsHistory.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Historique (24h)</h4>
                <div className="text-sm text-gray-600">
                  {metricsHistory.length} points de données collectés
                </div>
                {/* Ici on pourrait ajouter un graphique avec une librairie comme Chart.js */}
              </div>
            )}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-blue-ink">🚨 Configuration des Alertes</h3>
              <div className="text-sm text-gray-600">
                {alertRules.filter(r => r.enabled).length} / {alertRules.length} règles actives
              </div>
            </div>

            <div className="space-y-4">
              {alertRules.map((rule) => (
                <div key={rule.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        rule.severity === 'critical' ? 'bg-red-500' :
                        rule.severity === 'error' ? 'bg-orange-500' :
                        rule.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <h4 className="font-semibold text-gray-800">{rule.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rule.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        rule.severity === 'error' ? 'bg-orange-100 text-orange-800' :
                        rule.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {rule.severity.toUpperCase()}
                      </span>
                    </div>
                    
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={(e) => toggleAlertRule(rule.id, e.target.checked)}
                        className="rounded border-gray-300 text-mint-green focus:ring-mint-green"
                      />
                      <span className="text-sm text-gray-600">Activée</span>
                    </label>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    Cooldown: {rule.cooldownMinutes} minutes
                  </div>
                  
                  {rule.lastTriggered && (
                    <div className="text-xs text-gray-500">
                      Dernière activation: {rule.lastTriggered.toLocaleString('fr-FR')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fallbacks' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-ink">🔄 Monitoring des Fallbacks</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Statut des Systèmes de Fallback</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">🔄</div>
                  <div className="font-medium text-gray-800">GitHub Actions</div>
                  <div className={`text-sm mt-1 ${
                    currentMetrics?.systemHealth.fallbackStatus === 'ready' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {currentMetrics?.systemHealth.fallbackStatus === 'ready' ? 'Prêt' : 'Actif'}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="font-medium text-gray-800">Vercel Crons</div>
                  <div className={`text-sm mt-1 ${
                    currentMetrics?.systemHealth.vercelStatus === 'healthy' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {currentMetrics?.systemHealth.vercelStatus === 'healthy' ? 'Opérationnel' : 'Problème détecté'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Configuration du Fallback</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monitoring activé:</span>
                  <span className="font-medium text-green-600">✅ Oui</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Intervalle de vérification:</span>
                  <span className="font-medium">10 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seuil d'activation:</span>
                  <span className="font-medium">3 échecs consécutifs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Workflows disponibles:</span>
                  <span className="font-medium">3 (Alertes, Maintenance, Santé)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-ink">📋 Rapports Automatiques</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Rapport Quotidien</h4>
                    <div className="text-sm text-gray-600">Chaque jour à 9h</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut:</span>
                    <span className="text-green-600 font-medium">✅ Activé</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dernier envoi:</span>
                    <span className="font-medium">Aujourd'hui</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">📈</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Rapport Hebdomadaire</h4>
                    <div className="text-sm text-gray-600">Lundi à 10h</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut:</span>
                    <span className="text-green-600 font-medium">✅ Activé</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dernier envoi:</span>
                    <span className="font-medium">Cette semaine</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">📋</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Rapport Mensuel</h4>
                    <div className="text-sm text-gray-600">1er du mois à 11h</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut:</span>
                    <span className="text-green-600 font-medium">✅ Activé</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dernier envoi:</span>
                    <span className="font-medium">Ce mois</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Configuration des Rapports</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">Email de destination</div>
                    <div className="text-sm text-gray-600">ls@laurentserre.com</div>
                  </div>
                  <button className="text-mint-green hover:text-mint-green/80 text-sm font-medium">
                    Modifier
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">Format des rapports</div>
                    <div className="text-sm text-gray-600">HTML avec métriques détaillées</div>
                  </div>
                  <button className="text-mint-green hover:text-mint-green/80 text-sm font-medium">
                    Configurer
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