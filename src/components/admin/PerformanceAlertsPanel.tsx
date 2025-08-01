'use client';

import React, { useState, useEffect } from 'react';
import { PerformanceAlerts, PerformanceAlert, PerformanceMetrics, PerformanceThresholds } from '@/lib/vercel/performance-alerts';
import { AlertManager } from '@/lib/audit/alert-manager';

interface PerformanceAlertsPanelProps {
  className?: string;
}

interface FunctionStats {
  name: string;
  averageExecutionTime: number;
  averageMemoryUsage: number;
  averageErrorRate: number;
  averageResponseTime: number;
  measurementCount: number;
  trend: 'improving' | 'degrading' | 'stable';
}

export function PerformanceAlertsPanel({ className = '' }: PerformanceAlertsPanelProps) {
  const [performanceAlerts] = useState(() => new PerformanceAlerts(new AlertManager()));
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [functionStats, setFunctionStats] = useState<FunctionStats[]>([]);
  const [thresholds, setThresholds] = useState<PerformanceThresholds>({
    slowFunctionThreshold: 10,
    highMemoryThreshold: 400,
    highErrorRateThreshold: 5,
    responseTimeThreshold: 5000,
  });
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const fetchPerformanceData = async () => {
    try {
      const response = await fetch('/api/admin/performance-metrics');
      if (!response.ok) {
        throw new Error('Failed to fetch performance metrics');
      }
      
      const data = await response.json();
      if (data.success) {
        setFunctionStats(data.data.functionStats);
        setAlerts(data.data.activeAlerts);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
      
      // Fallback to mock data if API fails
      const mockStats: FunctionStats[] = [
        {
          name: '/api/audit-complete',
          averageExecutionTime: 8.5,
          averageMemoryUsage: 380,
          averageErrorRate: 2.1,
          averageResponseTime: 4200,
          measurementCount: 45,
          trend: 'stable'
        },
        {
          name: '/api/maintenance-weekly',
          averageExecutionTime: 12.3,
          averageMemoryUsage: 420,
          averageErrorRate: 1.8,
          averageResponseTime: 6800,
          measurementCount: 12,
          trend: 'degrading'
        },
        {
          name: '/api/admin/audit-metrics',
          averageExecutionTime: 2.1,
          averageMemoryUsage: 180,
          averageErrorRate: 0.5,
          averageResponseTime: 1200,
          measurementCount: 156,
          trend: 'improving'
        }
      ];

      setFunctionStats(mockStats);
      setAlerts([]);
      setLoading(false);
    }
  };

  const updateThresholds = async (newThresholds: Partial<PerformanceThresholds>) => {
    const updated = { ...thresholds, ...newThresholds };
    setThresholds(updated);
    
    try {
      const response = await fetch('/api/admin/performance-metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thresholds: updated }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update thresholds');
      }
      
      // Update local instance as well
      performanceAlerts.updateThresholds(updated);
    } catch (error) {
      console.error('Failed to update thresholds:', error);
      // Revert on error
      setThresholds(thresholds);
    }
  };

  const getStatusColor = (value: number, threshold: number, type: 'execution' | 'memory' | 'error' | 'response') => {
    let isHigh = false;
    
    switch (type) {
      case 'execution':
        isHigh = value > threshold;
        break;
      case 'memory':
        isHigh = value > threshold;
        break;
      case 'error':
        isHigh = value > threshold;
        break;
      case 'response':
        isHigh = value > threshold;
        break;
    }
    
    if (isHigh) {
      return value > threshold * 1.5 ? 'text-red-600 bg-red-50' : 'text-orange-600 bg-orange-50';
    }
    return 'text-green-600 bg-green-50';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <span className="text-green-500">📈</span>;
      case 'degrading':
        return <span className="text-red-500">📉</span>;
      default:
        return <span className="text-gray-500">➡️</span>;
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`;
    return `${seconds.toFixed(1)}s`;
  };

  const formatMemory = (mb: number) => {
    return `${mb.toFixed(0)}MB`;
  };

  useEffect(() => {
    fetchPerformanceData();
    
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchPerformanceData, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-blue-ink mb-1">
            🚀 Alertes de Performance
          </h2>
          <p className="text-gray-600 text-sm">
            Surveillance des fonctions lentes, mémoire et erreurs
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Seuils
          </button>
          
          <button
            onClick={fetchPerformanceData}
            className="flex items-center gap-2 bg-mint-green text-white px-3 py-1 rounded-lg hover:bg-mint-green/90 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualiser
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-ink mb-3">
            ⚙️ Configuration des Seuils
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fonction lente (secondes)
              </label>
              <input
                type="number"
                value={thresholds.slowFunctionThreshold}
                onChange={(e) => updateThresholds({ slowFunctionThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                min="1"
                max="60"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mémoire élevée (MB)
              </label>
              <input
                type="number"
                value={thresholds.highMemoryThreshold}
                onChange={(e) => updateThresholds({ highMemoryThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                min="100"
                max="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taux d'erreur (%)
              </label>
              <input
                type="number"
                value={thresholds.highErrorRateThreshold}
                onChange={(e) => updateThresholds({ highErrorRateThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                min="1"
                max="50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temps de réponse (ms)
              </label>
              <input
                type="number"
                value={thresholds.responseTimeThreshold}
                onChange={(e) => updateThresholds({ responseTimeThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                min="1000"
                max="30000"
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-600 mb-3">
            🚨 Alertes Actives
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'error' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {alert.target}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                {alert.recommendations.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-600 mb-1">Recommandations:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {alert.recommendations.slice(0, 2).map((rec, i) => (
                        <li key={i}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Function Performance Stats */}
      <div>
        <h3 className="text-lg font-semibold text-blue-ink mb-3">
          📊 Statistiques des Fonctions
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-700">Fonction</th>
                <th className="text-center py-3 px-2 font-medium text-gray-700">Exécution</th>
                <th className="text-center py-3 px-2 font-medium text-gray-700">Mémoire</th>
                <th className="text-center py-3 px-2 font-medium text-gray-700">Erreurs</th>
                <th className="text-center py-3 px-2 font-medium text-gray-700">Réponse</th>
                <th className="text-center py-3 px-2 font-medium text-gray-700">Mesures</th>
                <th className="text-center py-3 px-2 font-medium text-gray-700">Tendance</th>
              </tr>
            </thead>
            <tbody>
              {functionStats.map((stat, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <div className="font-medium text-gray-900">{stat.name}</div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(stat.averageExecutionTime, thresholds.slowFunctionThreshold, 'execution')
                    }`}>
                      {formatDuration(stat.averageExecutionTime)}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(stat.averageMemoryUsage, thresholds.highMemoryThreshold, 'memory')
                    }`}>
                      {formatMemory(stat.averageMemoryUsage)}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(stat.averageErrorRate, thresholds.highErrorRateThreshold, 'error')
                    }`}>
                      {stat.averageErrorRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(stat.averageResponseTime, thresholds.responseTimeThreshold, 'response')
                    }`}>
                      {stat.averageResponseTime.toFixed(0)}ms
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center text-gray-600">
                    {stat.measurementCount}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {getTrendIcon(stat.trend)}
                      <span className="text-xs text-gray-600 capitalize">
                        {stat.trend === 'improving' ? 'Amélioration' :
                         stat.trend === 'degrading' ? 'Dégradation' :
                         'Stable'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">
          💡 Résumé des Performances
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-700 font-medium">Fonctions surveillées:</span>
            <span className="ml-2 text-blue-600">{functionStats.length}</span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Alertes actives:</span>
            <span className="ml-2 text-blue-600">{alerts.length}</span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Fonctions en dégradation:</span>
            <span className="ml-2 text-blue-600">
              {functionStats.filter(s => s.trend === 'degrading').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}