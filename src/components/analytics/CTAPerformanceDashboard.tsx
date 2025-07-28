'use client';

import React, { useState, useEffect } from 'react';
import { getABTestResults } from '@/utils/ab-testing';
import { conversionGoals } from '@/utils/cta-tracking';

interface CTAMetrics {
  ctaId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  clickRate: number;
  conversionRate: number;
  value: number;
  trend: 'up' | 'down' | 'stable';
}

interface FunnelStep {
  step: string;
  visitors: number;
  conversions: number;
  rate: number;
  dropOff: number;
}

interface CTAPerformanceDashboardProps {
  pageId: string;
  className?: string;
}

const CTAPerformanceDashboard: React.FC<CTAPerformanceDashboardProps> = ({
  pageId,
  className = ''
}) => {
  const [metrics, setMetrics] = useState<CTAMetrics[]>([]);
  const [funnelData, setFunnelData] = useState<FunnelStep[]>([]);
  const [abTestResults, setABTestResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    loadAnalyticsData();
  }, [pageId, selectedPeriod]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    
    try {
      // Simuler le chargement des données analytics
      // En production, ceci ferait appel à votre API analytics
      const mockMetrics: CTAMetrics[] = [
        {
          ctaId: 'conversion-diagnostic',
          impressions: 2847,
          clicks: 142,
          conversions: 23,
          clickRate: 4.99,
          conversionRate: 16.2,
          value: 690,
          trend: 'up'
        },
        {
          ctaId: 'conversion-bootcamp',
          impressions: 2847,
          clicks: 89,
          conversions: 12,
          clickRate: 3.13,
          conversionRate: 13.5,
          value: 900,
          trend: 'up'
        },
        {
          ctaId: 'conversion-consultation',
          impressions: 2847,
          clicks: 67,
          conversions: 8,
          clickRate: 2.35,
          conversionRate: 11.9,
          value: 480,
          trend: 'stable'
        },
        {
          ctaId: 'sticky-diagnostic-desktop',
          impressions: 1523,
          clicks: 76,
          conversions: 11,
          clickRate: 4.99,
          conversionRate: 14.5,
          value: 330,
          trend: 'up'
        },
        {
          ctaId: 'inline-diagnostic-after-case-studies',
          impressions: 1892,
          clicks: 94,
          conversions: 15,
          clickRate: 4.97,
          conversionRate: 16.0,
          value: 450,
          trend: 'up'
        }
      ];

      const mockFunnelData: FunnelStep[] = [
        { step: 'Page View', visitors: 2847, conversions: 2847, rate: 100, dropOff: 0 },
        { step: 'Section Engagement', visitors: 2847, conversions: 1982, rate: 69.6, dropOff: 30.4 },
        { step: 'CTA Click', visitors: 1982, conversions: 468, rate: 23.6, dropOff: 76.4 },
        { step: 'Landing Page', visitors: 468, conversions: 387, rate: 82.7, dropOff: 17.3 },
        { step: 'Form Start', visitors: 387, conversions: 298, rate: 77.0, dropOff: 23.0 },
        { step: 'Conversion', visitors: 298, conversions: 69, rate: 23.2, dropOff: 76.8 }
      ];

      // Charger les résultats des tests A/B
      const abResults = await getABTestResults('cta_conversion_optimization');

      setMetrics(mockMetrics);
      setFunnelData(mockFunnelData);
      setABTestResults(abResults);
    } catch (error) {
      console.error('Erreur lors du chargement des analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↗️</span>;
      case 'down':
        return <span className="text-red-500">↘️</span>;
      default:
        return <span className="text-gray-500">➡️</span>;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(num);
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Performance des CTAs - {pageId}
        </h2>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Métriques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Impressions totales</p>
              <p className="text-2xl font-bold text-blue-900">
                {formatNumber(metrics.reduce((sum, m) => sum + m.impressions, 0))}
              </p>
            </div>
            <div className="text-2xl">👁️</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Clics totaux</p>
              <p className="text-2xl font-bold text-green-900">
                {formatNumber(metrics.reduce((sum, m) => sum + m.clicks, 0))}
              </p>
            </div>
            <div className="text-2xl">👆</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Conversions</p>
              <p className="text-2xl font-bold text-purple-900">
                {formatNumber(metrics.reduce((sum, m) => sum + m.conversions, 0))}
              </p>
            </div>
            <div className="text-2xl">🎯</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Valeur générée</p>
              <p className="text-2xl font-bold text-orange-900">
                {formatCurrency(metrics.reduce((sum, m) => sum + m.value, 0))}
              </p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>
      </div>

      {/* Performance par CTA */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance par CTA</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">CTA</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Impressions</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Clics</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Taux de clic</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Conversions</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Taux conversion</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Valeur</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Tendance</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, index) => (
                <tr key={metric.ctaId} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {metric.ctaId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {formatNumber(metric.impressions)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {formatNumber(metric.clicks)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {formatPercentage(metric.clickRate)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {formatNumber(metric.conversions)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {formatPercentage(metric.conversionRate)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-600">
                    {formatCurrency(metric.value)}
                  </td>
                  <td className="text-center py-3 px-4">
                    {getTrendIcon(metric.trend)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Funnel de conversion */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Funnel de conversion</h3>
        <div className="space-y-2">
          {funnelData.map((step, index) => (
            <div key={step.step} className="relative">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{step.step}</p>
                    <p className="text-sm text-gray-600">
                      {formatNumber(step.conversions)} / {formatNumber(step.visitors)} visiteurs
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {formatPercentage(step.rate)}
                  </p>
                  {step.dropOff > 0 && (
                    <p className="text-sm text-red-600">
                      -{formatPercentage(step.dropOff)} abandon
                    </p>
                  )}
                </div>
              </div>
              
              {/* Barre de progression */}
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-500"
                  style={{ width: `${step.rate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Résultats des tests A/B */}
      {abTestResults && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tests A/B en cours</h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">Test: Optimisation CTAs de Conversion</h4>
                <p className="text-sm text-gray-600">
                  {abTestResults.participants} participants • Confiance: {(abTestResults.significance * 100).toFixed(1)}%
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                abTestResults.status === 'running' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {abTestResults.status === 'running' ? 'En cours' : 'Terminé'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Version Contrôle</h5>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPercentage(abTestResults.conversions.control.rate)}
                </p>
                <p className="text-sm text-gray-600">
                  {abTestResults.conversions.control.count} conversions
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Variante A</h5>
                <p className="text-2xl font-bold text-green-600">
                  {formatPercentage(abTestResults.conversions.variant_a.rate)}
                </p>
                <p className="text-sm text-gray-600">
                  {abTestResults.conversions.variant_a.count} conversions
                </p>
                <p className="text-xs text-green-600 font-medium">
                  +{((abTestResults.conversions.variant_a.rate / abTestResults.conversions.control.rate - 1) * 100).toFixed(1)}% amélioration
                </p>
              </div>
            </div>
            
            {abTestResults.winner && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <p className="text-sm text-green-800">
                  🏆 Gagnant: {abTestResults.winner === 'variant_a' ? 'Variante A' : 'Version Contrôle'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommandations */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Recommandations</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>Le CTA diagnostic après les cas clients performe très bien (16% de conversion)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-1">⚠️</span>
            <span>Le CTA consultation a un taux de clic faible - tester une formulation plus directe</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">💡</span>
            <span>Considérer ajouter plus de CTAs inline dans les sections à fort engagement</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">🎯</span>
            <span>Le sticky CTA desktop génère de bons résultats - déployer sur mobile</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CTAPerformanceDashboard;