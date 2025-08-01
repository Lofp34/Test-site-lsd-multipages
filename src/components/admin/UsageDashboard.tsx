'use client';

import React, { useState, useEffect } from 'react';
import { MetricCard } from './MetricCard';
import { PerformanceAlertsPanel } from './PerformanceAlertsPanel';
import { UsageMetrics, UsagePrediction, LimitStatus, UsageRecommendation } from '@/lib/vercel/types';
import { VercelUsageMonitor } from '@/lib/vercel/usage-monitor';

interface UsageDashboardProps {
  className?: string;
}

interface AlertLevel {
  level: 'success' | 'warning' | 'error' | 'critical';
  message: string;
  threshold: number;
}

export function UsageDashboard({ className = '' }: UsageDashboardProps) {
  const [metrics, setMetrics] = useState<UsageMetrics | null>(null);
  const [prediction, setPrediction] = useState<UsagePrediction | null>(null);
  const [limitStatuses, setLimitStatuses] = useState<LimitStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [usageMonitor] = useState(() => new VercelUsageMonitor());

  const fetchUsageData = async () => {
    try {
      setRefreshing(true);
      
      // Fetch current usage metrics
      const currentMetrics = await usageMonitor.getCurrentUsage();
      setMetrics(currentMetrics);

      // Fetch monthly predictions
      const monthlyPrediction = await usageMonitor.predictMonthlyUsage();
      setPrediction(monthlyPrediction);

      // Check limit statuses
      const limits = await usageMonitor.checkLimits();
      setLimitStatuses(limits);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des métriques Vercel');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getAlertLevel = (percentage: number): AlertLevel => {
    if (percentage >= 90) {
      return { level: 'critical', message: 'Limite critique atteinte', threshold: 90 };
    } else if (percentage >= 80) {
      return { level: 'error', message: 'Limite élevée', threshold: 80 };
    } else if (percentage >= 70) {
      return { level: 'warning', message: 'Attention aux limites', threshold: 70 };
    } else {
      return { level: 'success', message: 'Usage normal', threshold: 0 };
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-blue-600 bg-blue-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  useEffect(() => {
    fetchUsageData();
    
    // Auto-refresh every 10 minutes
    const interval = setInterval(fetchUsageData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Erreur de monitoring Vercel
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchUsageData}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const currentAlert = metrics ? getAlertLevel(metrics.percentageOfLimit) : null;

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-blue-ink mb-1">
            Monitoring Vercel - Plan Hobby
          </h2>
          <p className="text-gray-600 text-sm">
            Surveillance des ressources et limites en temps réel
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {currentAlert && (
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentAlert.level === 'success' ? 'bg-green-100 text-green-800' :
              currentAlert.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              currentAlert.level === 'error' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentAlert.message}
            </div>
          )}
          
          <button
            onClick={fetchUsageData}
            disabled={refreshing}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
          >
            <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualiser
          </button>
        </div>
      </div>

      {/* Métriques temps réel */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MetricCard
            title="Invocations"
            value={formatNumber(metrics.functionInvocations)}
            trend={metrics.percentageOfLimit > 70 ? 'warning' : 'stable'}
            color={metrics.percentageOfLimit > 80 ? 'red' : metrics.percentageOfLimit > 70 ? 'orange' : 'green'}
            subtitle={`${metrics.percentageOfLimit.toFixed(1)}% de la limite`}
            icon="⚡"
          />
          
          <MetricCard
            title="Compute Hours"
            value={`${metrics.computeHours.toFixed(1)} GB-h`}
            trend={metrics.computeHours > 60 ? 'warning' : 'stable'}
            color={metrics.computeHours > 80 ? 'red' : metrics.computeHours > 60 ? 'orange' : 'green'}
            subtitle="Consommation actuelle"
            icon="🖥️"
          />
          
          <MetricCard
            title="Projection Mensuelle"
            value={formatNumber(metrics.projectedMonthly)}
            trend={metrics.projectedMonthly > 80000 ? 'warning' : 'stable'}
            color={metrics.projectedMonthly > 90000 ? 'red' : metrics.projectedMonthly > 80000 ? 'orange' : 'green'}
            subtitle="Invocations prévues"
            icon="📊"
          />
        </div>
      )}

      {/* Projections mensuelles et recommandations */}
      {prediction && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Projections */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-ink mb-3 flex items-center gap-2">
              📈 Projections Mensuelles
              <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(prediction.riskLevel)}`}>
                {prediction.riskLevel.toUpperCase()}
              </span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Invocations prévues:</span>
                <span className="font-semibold">{formatNumber(prediction.predictedInvocations)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Compute hours prévues:</span>
                <span className="font-semibold">{prediction.predictedComputeHours.toFixed(1)} GB-h</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Confiance:</span>
                <span className="font-semibold">{(prediction.confidence * 100).toFixed(0)}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jours restants:</span>
                <span className="font-semibold">{prediction.daysRemaining} jours</span>
              </div>
            </div>

            {/* Barres de progression */}
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Invocations (limite: 100K)</span>
                  <span>{((prediction.predictedInvocations / 100000) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      prediction.predictedInvocations > 90000 ? 'bg-red-500' :
                      prediction.predictedInvocations > 80000 ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((prediction.predictedInvocations / 100000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Compute Hours (limite: 100 GB-h)</span>
                  <span>{((prediction.predictedComputeHours / 100) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      prediction.predictedComputeHours > 90 ? 'bg-red-500' :
                      prediction.predictedComputeHours > 80 ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((prediction.predictedComputeHours / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommandations */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-ink mb-3">
              💡 Recommandations
            </h3>
            
            {prediction.recommendations.length > 0 ? (
              <div className="space-y-3">
                {prediction.recommendations.map((rec, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {rec.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{rec.message}</p>
                    {rec.action && (
                      <p className="text-xs text-gray-600 italic">
                        Action: {rec.action}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Aucune recommandation</p>
                <p className="text-xs">L'usage est dans les limites normales</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Alertes visuelles pour les seuils */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-ink mb-3">
          🚨 Alertes de Seuils
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[70, 80, 90].map(threshold => {
            const isExceeded = metrics && metrics.percentageOfLimit >= threshold;
            const willExceed = prediction && (
              (prediction.predictedInvocations / 100000) * 100 >= threshold ||
              (prediction.predictedComputeHours / 100) * 100 >= threshold
            );
            
            return (
              <div key={threshold} className={`p-3 rounded-lg border-2 ${
                isExceeded ? 'border-red-500 bg-red-50' :
                willExceed ? 'border-orange-500 bg-orange-50' :
                'border-green-500 bg-green-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">Seuil {threshold}%</span>
                  <div className={`w-3 h-3 rounded-full ${
                    isExceeded ? 'bg-red-500' :
                    willExceed ? 'bg-orange-500' :
                    'bg-green-500'
                  }`}></div>
                </div>
                <p className="text-xs text-gray-600">
                  {isExceeded ? 'Dépassé actuellement' :
                   willExceed ? 'Risque de dépassement' :
                   'Dans les limites'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upgrade recommendation */}
      {prediction && prediction.riskLevel === 'critical' && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                💎 Recommandation d'Upgrade
              </h4>
              <p className="text-blue-700 mb-3">
                Votre usage approche les limites du plan Hobby. Considérez un upgrade vers Vercel Pro pour:
              </p>
              <ul className="text-sm text-blue-600 space-y-1 mb-4">
                <li>• 1M invocations/mois (vs 100K)</li>
                <li>• 1000 GB-heures/mois (vs 100)</li>
                <li>• 20 cron jobs (vs 2)</li>
                <li>• Support prioritaire</li>
              </ul>
              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Calculer le ROI
                </button>
                <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Alerts Panel */}
      <div className="mt-8">
        <PerformanceAlertsPanel />
      </div>
    </div>
  );
}