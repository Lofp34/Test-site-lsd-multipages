'use client';

import React, { useState } from 'react';
import { UsageDashboard } from './UsageDashboard';
import { PerformanceAlertsPanel } from './PerformanceAlertsPanel';

interface VercelMonitoringDashboardProps {
  className?: string;
}

type TabType = 'usage' | 'performance' | 'overview';

export function VercelMonitoringDashboard({ className = '' }: VercelMonitoringDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    {
      id: 'overview' as TabType,
      label: 'Vue d\'ensemble',
      icon: '📊',
      description: 'Monitoring global des ressources Vercel'
    },
    {
      id: 'usage' as TabType,
      label: 'Usage Vercel',
      icon: '⚡',
      description: 'Limites et projections du plan Hobby'
    },
    {
      id: 'performance' as TabType,
      label: 'Performance',
      icon: '🚀',
      description: 'Alertes de performance des fonctions'
    }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header with tabs */}
      <div className="border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-ink mb-2">
            🔍 Monitoring Vercel - Optimisation Plan Gratuit
          </h1>
          <p className="text-gray-600">
            Surveillance complète des ressources, performances et limites du plan Hobby
          </p>
        </div>
        
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

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                    Plan Hobby
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Usage Vercel
                </h3>
                <p className="text-blue-600 text-sm mb-3">
                  Surveillance des limites d'invocations et compute hours
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">Limite invocations:</span>
                  <span className="font-semibold text-blue-800">100K/mois</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">Limite compute:</span>
                  <span className="font-semibold text-blue-800">100 GB-h/mois</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                    Temps réel
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Performance
                </h3>
                <p className="text-green-600 text-sm mb-3">
                  Alertes pour fonctions lentes et usage mémoire élevé
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Seuil fonction lente:</span>
                  <span className="font-semibold text-green-800">&gt;10s</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Seuil mémoire:</span>
                  <span className="font-semibold text-green-800">&gt;400MB</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                    Optimisé
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  Système Consolidé
                </h3>
                <p className="text-purple-600 text-sm mb-3">
                  2 cron jobs au lieu de 4 pour respecter les limites
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-700">Cron jobs utilisés:</span>
                  <span className="font-semibold text-purple-800">2/2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-700">Fallback:</span>
                  <span className="font-semibold text-purple-800">GitHub Actions</span>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-ink mb-4">
                📈 Résumé de l'Optimisation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-mint-green mb-1">2</div>
                  <div className="text-sm text-gray-600">Cron Jobs Actifs</div>
                  <div className="text-xs text-gray-500">vs 4 précédemment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">80%</div>
                  <div className="text-sm text-gray-600">Limite Sécurisée</div>
                  <div className="text-xs text-gray-500">des ressources Vercel</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">3</div>
                  <div className="text-sm text-gray-600">Seuils d'Alerte</div>
                  <div className="text-xs text-gray-500">70%, 80%, 90%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Monitoring</div>
                  <div className="text-xs text-gray-500">avec fallbacks</div>
                </div>
              </div>
            </div>

            {/* Key features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-ink mb-3 flex items-center gap-2">
                  ⚡ Optimisations Implémentées
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Cache intelligent (6h liens, 24h sitemap, 7j rapports)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Traitement par batch (10 liens simultanés)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Timeouts réduits (5s par requête vs 30s)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Lazy loading des modules non-critiques
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Garbage collection forcé après chaque batch
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-ink mb-3 flex items-center gap-2">
                  🛡️ Systèmes de Fallback
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    GitHub Actions pour alertes urgentes (6h)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Monitoring de santé automatique (1h)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Dégradation gracieuse par niveaux de service
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Circuit breakers pour éviter les cascading failures
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Bascule automatique en cas de panne Vercel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <UsageDashboard className="border-0 shadow-none p-0" />
        )}

        {activeTab === 'performance' && (
          <PerformanceAlertsPanel className="border-0 shadow-none p-0" />
        )}
      </div>
    </div>
  );
}