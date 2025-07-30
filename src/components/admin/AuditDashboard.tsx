'use client';

import React, { useState, useEffect } from 'react';
import { MetricCard } from './MetricCard';
import { LinkHealthChart } from './LinkHealthChart';
import { BrokenLinksTable } from './BrokenLinksTable';
import { ResourceRequestsChart } from './ResourceRequestsChart';
import { RecentActivity } from './RecentActivity';
import { AuditHistoryChart } from './AuditHistoryChart';
import { SEOImpactPanel } from './SEOImpactPanel';
import { AlertSettings } from './AlertSettings';
import { SchedulerManager } from './SchedulerManager';

interface DashboardMetrics {
  linkHealth: {
    score: number;
    trend: string;
    totalLinks: number;
    brokenLinks: number;
    validLinks: number;
  };
  resourceRequests: {
    total: number;
    pending: number;
    completed: number;
    trend: string;
  };
  corrections: {
    autoCorrections: number;
    manualCorrections: number;
    trend: string;
  };
  performance: {
    avgResponseTime: number;
    lastAuditDuration: number;
    trend: string;
  };
}

interface AuditActivity {
  id: string;
  type: 'audit' | 'correction' | 'resource_request' | 'alert';
  message: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
}

export function AuditDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [activities, setActivities] = useState<AuditActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      
      // Fetch metrics
      const metricsResponse = await fetch('/api/admin/audit-metrics');
      if (!metricsResponse.ok) {
        throw new Error('Failed to fetch metrics');
      }
      const metricsData = await metricsResponse.json();
      setMetrics(metricsData);

      // Fetch recent activities
      const activitiesResponse = await fetch('/api/admin/audit-activities');
      if (!activitiesResponse.ok) {
        throw new Error('Failed to fetch activities');
      }
      const activitiesData = await activitiesResponse.json();
      setActivities(activitiesData);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const triggerManualAudit = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/admin/trigger-audit', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to trigger audit');
      }
      
      // Refresh data after audit
      setTimeout(() => {
        fetchDashboardData();
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du déclenchement de l\'audit');
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Erreur de chargement
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-ink mb-2">
            Audit des Liens - Dashboard
          </h1>
          <p className="text-gray-600">
            Surveillance en temps réel de la santé des liens du site
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={refreshing}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualiser
          </button>
          
          <button
            onClick={triggerManualAudit}
            disabled={refreshing}
            className="flex items-center gap-2 bg-mint-green text-white px-4 py-2 rounded-lg hover:bg-mint-green/90 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Lancer Audit
          </button>
        </div>
      </div>

      {/* Métriques principales */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Santé des Liens"
            value={`${metrics.linkHealth.score}%`}
            trend={metrics.linkHealth.trend}
            color="green"
            subtitle={`${metrics.linkHealth.validLinks}/${metrics.linkHealth.totalLinks} liens valides`}
            icon="🔗"
          />
          
          <MetricCard
            title="Liens Morts"
            value={metrics.linkHealth.brokenLinks.toString()}
            trend={metrics.linkHealth.brokenLinks > 0 ? 'warning' : 'stable'}
            color="red"
            subtitle="À corriger"
            icon="❌"
          />
          
          <MetricCard
            title="Demandes Ressources"
            value={metrics.resourceRequests.total.toString()}
            trend={metrics.resourceRequests.trend}
            color="blue"
            subtitle={`${metrics.resourceRequests.pending} en attente`}
            icon="📄"
          />
          
          <MetricCard
            title="Corrections Auto"
            value={metrics.corrections.autoCorrections.toString()}
            trend={metrics.corrections.trend}
            color="mint"
            subtitle="Ce mois-ci"
            icon="🔧"
          />
        </div>
      )}

      {/* SEO Impact Panel */}
      <div className="mb-8">
        <SEOImpactPanel />
      </div>

      {/* Graphiques et tableaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-blue-ink mb-4">
            Évolution de la Santé des Liens
          </h3>
          <LinkHealthChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-blue-ink mb-4">
            Historique des Audits
          </h3>
          <AuditHistoryChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-blue-ink mb-4">
            Demandes de Ressources
          </h3>
          <ResourceRequestsChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-blue-ink mb-4">
            Activité Récente
          </h3>
          <RecentActivity activities={activities} />
        </div>
      </div>

      {/* Configuration des alertes */}
      <div className="mb-8">
        <AlertSettings />
      </div>

      {/* Gestionnaire de planification */}
      <div className="mb-8">
        <SchedulerManager />
      </div>

      {/* Tableau des liens morts */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-blue-ink mb-4">
          Liens Morts à Corriger
        </h3>
        <BrokenLinksTable />
      </div>
    </div>
  );
}