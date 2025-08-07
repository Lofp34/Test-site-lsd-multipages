/**
 * Monitoring dashboard for chat performance and errors
 * Provides real-time insights into chat system health
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { errorReporter, performanceMonitor, ChatError, PerformanceMetrics } from '@/lib/chat/error-handling';

interface MonitoringDashboardProps {
  isVisible: boolean;
  onClose: () => void;
  className?: string;
}

interface DashboardStats {
  errors: {
    total: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
    resolved: number;
    unresolved: number;
    recent: ChatError[];
  };
  performance: {
    averageRenderTime: number;
    averageScrollTime: number;
    averageMemoryUsage: number;
    totalErrors: number;
    performanceScore: number;
  };
  system: {
    uptime: number;
    lastUpdate: Date;
    connectionStatus: 'online' | 'offline' | 'degraded';
  };
}

const MonitoringDashboard: React.FC<MonitoringDashboardProps> = ({
  isVisible,
  onClose,
  className = ''
}) => {
  const [stats, setStats] = useState<DashboardStats>({
    errors: {
      total: 0,
      byType: {},
      bySeverity: {},
      resolved: 0,
      unresolved: 0,
      recent: []
    },
    performance: {
      averageRenderTime: 0,
      averageScrollTime: 0,
      averageMemoryUsage: 0,
      totalErrors: 0,
      performanceScore: 100
    },
    system: {
      uptime: 0,
      lastUpdate: new Date(),
      connectionStatus: 'online'
    }
  });

  const [selectedTab, setSelectedTab] = useState<'overview' | 'errors' | 'performance' | 'system'>('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds

  // Update stats
  const updateStats = useCallback(() => {
    const errorStats = errorReporter.getErrorStats();
    const recentErrors = errorReporter.getRecentErrors(10);
    const performanceStats = performanceMonitor.getPerformanceStats();

    setStats(prevStats => ({
      errors: {
        ...errorStats,
        recent: recentErrors
      },
      performance: performanceStats,
      system: {
        ...prevStats.system,
        lastUpdate: new Date(),
        uptime: Date.now() - (prevStats.system.uptime || Date.now())
      }
    }));
  }, []);

  // Auto-refresh effect
  useEffect(() => {
    if (!isVisible || !autoRefresh) return;

    const interval = setInterval(updateStats, refreshInterval);
    return () => clearInterval(interval);
  }, [isVisible, autoRefresh, refreshInterval, updateStats]);

  // Initial load
  useEffect(() => {
    if (isVisible) {
      updateStats();
    }
  }, [isVisible, updateStats]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key >= '1' && event.key <= '4') {
        const tabs = ['overview', 'errors', 'performance', 'system'] as const;
        setSelectedTab(tabs[parseInt(event.key) - 1]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatUptime = (uptime: number) => {
    const seconds = Math.floor(uptime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">📊</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Monitoring Chat
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dernière mise à jour : {stats.system.lastUpdate.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                autoRefresh 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={autoRefresh ? 'Désactiver le rafraîchissement automatique' : 'Activer le rafraîchissement automatique'}
            >
              {autoRefresh ? '⏸️' : '▶️'} Auto
            </button>
            
            <button
              onClick={updateStats}
              className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded text-sm transition-colors"
              title="Actualiser maintenant"
            >
              🔄 Actualiser
            </button>
            
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded text-sm transition-colors"
              title="Fermer (Échap)"
            >
              ✖️ Fermer
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { key: 'overview', label: 'Vue d\'ensemble', shortcut: '1' },
            { key: 'errors', label: 'Erreurs', shortcut: '2' },
            { key: 'performance', label: 'Performance', shortcut: '3' },
            { key: 'system', label: 'Système', shortcut: '4' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                selectedTab === tab.key
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
              <span className="ml-1 text-xs opacity-60">({tab.shortcut})</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Score Performance</p>
                      <p className={`text-2xl font-bold ${getPerformanceColor(stats.performance.performanceScore)}`}>
                        {stats.performance.performanceScore}%
                      </p>
                    </div>
                    <span className="text-2xl">⚡</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400">Erreurs Résolues</p>
                      <p className="text-2xl font-bold text-green-600">
                        {stats.errors.resolved}/{stats.errors.total}
                      </p>
                    </div>
                    <span className="text-2xl">✅</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Mémoire</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {stats.performance.averageMemoryUsage.toFixed(1)}MB
                      </p>
                    </div>
                    <span className="text-2xl">🧠</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Uptime</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {formatUptime(stats.system.uptime)}
                      </p>
                    </div>
                    <span className="text-2xl">⏱️</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Activité Récente
                </h3>
                
                {stats.errors.recent.length > 0 ? (
                  <div className="space-y-2">
                    {stats.errors.recent.slice(0, 5).map(error => (
                      <div key={error.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(error.severity)}`}>
                            {error.severity}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {error.type}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {error.message}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {error.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    Aucune erreur récente 🎉
                  </p>
                )}
              </div>
            </div>
          )}

          {selectedTab === 'errors' && (
            <div className="space-y-6">
              {/* Error Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{stats.errors.total}</p>
                  <p className="text-sm text-red-600">Total</p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{stats.errors.unresolved}</p>
                  <p className="text-sm text-orange-600">Non résolues</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{stats.errors.resolved}</p>
                  <p className="text-sm text-green-600">Résolues</p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.errors.total > 0 ? Math.round((stats.errors.resolved / stats.errors.total) * 100) : 100}%
                  </p>
                  <p className="text-sm text-blue-600">Taux résolution</p>
                </div>
              </div>

              {/* Error Details */}
              <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Détail des Erreurs
                  </h3>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {stats.errors.recent.map(error => (
                    <div key={error.id} className="p-4 border-b border-gray-100 dark:border-gray-600 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(error.severity)}`}>
                              {error.severity}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs">
                              {error.type}
                            </span>
                            {error.resolved && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                ✅ Résolu
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                            {error.message}
                          </p>
                          
                          {error.context && (
                            <details className="text-xs text-gray-500 dark:text-gray-400">
                              <summary className="cursor-pointer">Contexte</summary>
                              <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-600 rounded overflow-auto">
                                {JSON.stringify(error.context, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                        
                        <div className="text-right text-xs text-gray-400">
                          <p>{error.timestamp.toLocaleString()}</p>
                          {error.retryCount && error.retryCount > 0 && (
                            <p>Tentatives: {error.retryCount}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'performance' && (
            <div className="space-y-6">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    Rendu Markdown
                  </h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.performance.averageRenderTime.toFixed(1)}ms
                  </p>
                  <p className="text-xs text-blue-500">
                    {stats.performance.averageRenderTime < 100 ? '✅ Excellent' : 
                     stats.performance.averageRenderTime < 200 ? '⚠️ Acceptable' : '❌ Lent'}
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                    Réponse Scroll
                  </h4>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.performance.averageScrollTime.toFixed(1)}ms
                  </p>
                  <p className="text-xs text-green-500">
                    {stats.performance.averageScrollTime < 16 ? '✅ 60fps' : 
                     stats.performance.averageScrollTime < 32 ? '⚠️ 30fps' : '❌ Saccadé'}
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    Utilisation Mémoire
                  </h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.performance.averageMemoryUsage.toFixed(1)}MB
                  </p>
                  <p className="text-xs text-purple-500">
                    {stats.performance.averageMemoryUsage < 50 ? '✅ Optimal' : 
                     stats.performance.averageMemoryUsage < 100 ? '⚠️ Élevé' : '❌ Critique'}
                  </p>
                </div>
              </div>

              {/* Performance Actions */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Actions de Performance
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      performanceMonitor.clearMetrics();
                      updateStats();
                    }}
                    className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold">🧹 Nettoyer les métriques</div>
                    <div className="text-sm opacity-75">Réinitialiser les données de performance</div>
                  </button>
                  
                  <button
                    onClick={() => {
                      if ('gc' in window && typeof (window as any).gc === 'function') {
                        (window as any).gc();
                      }
                      updateStats();
                    }}
                    className="p-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold">🗑️ Garbage Collection</div>
                    <div className="text-sm opacity-75">Forcer le nettoyage mémoire</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'system' && (
            <div className="space-y-6">
              {/* System Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Informations Système
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Uptime:</span>
                      <span className="font-mono">{formatUptime(stats.system.uptime)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Statut:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        stats.system.connectionStatus === 'online' ? 'bg-green-100 text-green-700' :
                        stats.system.connectionStatus === 'degraded' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {stats.system.connectionStatus === 'online' ? '🟢 En ligne' :
                         stats.system.connectionStatus === 'degraded' ? '🟡 Dégradé' :
                         '🔴 Hors ligne'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">User Agent:</span>
                      <span className="text-xs font-mono truncate max-w-xs" title={navigator.userAgent}>
                        {navigator.userAgent.split(' ')[0]}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">URL:</span>
                      <span className="text-xs font-mono truncate max-w-xs">
                        {window.location.pathname}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Actions Système
                  </h3>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        errorReporter.clearErrors();
                        performanceMonitor.clearMetrics();
                        updateStats();
                      }}
                      className="w-full p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors text-left"
                    >
                      🧹 Nettoyer toutes les données
                    </button>
                    
                    <button
                      onClick={() => {
                        const data = {
                          errors: errorReporter.getRecentErrors(50),
                          performance: performanceMonitor.getPerformanceStats(),
                          timestamp: new Date().toISOString()
                        };
                        
                        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `chat-monitoring-${Date.now()}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="w-full p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors text-left"
                    >
                      💾 Exporter les données
                    </button>
                    
                    <button
                      onClick={() => window.location.reload()}
                      className="w-full p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors text-left"
                    >
                      🔄 Redémarrer l'application
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;