'use client';

import React, { useState, useEffect } from 'react';

interface SEOImpactData {
  criticalIssues: number;
  estimatedTrafficLoss: number;
  affectedPages: string[];
  priorityActions: string[];
  linkHealthScore: number;
  trends: {
    healthScoreChange: number;
    criticalIssuesChange: number;
    trafficLossChange: number;
  };
}

export function SEOImpactPanel() {
  const [data, setData] = useState<SEOImpactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/seo-impact');
        if (response.ok) {
          const impactData = await response.json();
          setData(impactData);
        }
      } catch (error) {
        console.error('Failed to fetch SEO impact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center text-gray-500">
          <p>Impossible de charger les données d'impact SEO</p>
        </div>
      </div>
    );
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return (
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      );
    } else if (change < 0) {
      return (
        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-blue-ink">
          Impact SEO des Liens Morts
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Analyse en temps réel
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Link Health Score */}
        <div className={`p-4 rounded-lg border ${getHealthScoreColor(data.linkHealthScore)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Score de Santé</span>
            {getTrendIcon(data.trends.healthScoreChange)}
          </div>
          <div className="text-2xl font-bold">
            {data.linkHealthScore}%
          </div>
          <div className="text-xs opacity-75">
            {data.trends.healthScoreChange > 0 ? '+' : ''}{data.trends.healthScoreChange.toFixed(1)}% ce mois
          </div>
        </div>

        {/* Critical Issues */}
        <div className="p-4 rounded-lg border bg-red-50 text-red-800 border-red-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Problèmes Critiques</span>
            {getTrendIcon(-data.trends.criticalIssuesChange)}
          </div>
          <div className="text-2xl font-bold">
            {data.criticalIssues}
          </div>
          <div className="text-xs opacity-75">
            {data.trends.criticalIssuesChange > 0 ? '+' : ''}{data.trends.criticalIssuesChange} ce mois
          </div>
        </div>

        {/* Estimated Traffic Loss */}
        <div className="p-4 rounded-lg border bg-orange-50 text-orange-800 border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Perte de Trafic</span>
            {getTrendIcon(-data.trends.trafficLossChange)}
          </div>
          <div className="text-2xl font-bold">
            {data.estimatedTrafficLoss}%
          </div>
          <div className="text-xs opacity-75">
            {data.trends.trafficLossChange > 0 ? '+' : ''}{data.trends.trafficLossChange.toFixed(1)}% ce mois
          </div>
        </div>

        {/* Affected Pages */}
        <div className="p-4 rounded-lg border bg-blue-50 text-blue-800 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Pages Affectées</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="text-2xl font-bold">
            {data.affectedPages.length}
          </div>
          <div className="text-xs opacity-75">
            pages avec liens morts
          </div>
        </div>
      </div>

      {/* Priority Actions */}
      {data.priorityActions.length > 0 && (
        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Actions Prioritaires
          </h4>
          <div className="space-y-2">
            {data.priorityActions.slice(0, 3).map((action, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <div className="text-sm text-orange-800">
                  {action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Most Affected Pages */}
      {data.affectedPages.length > 0 && (
        <div className="border-t pt-6 mt-6">
          <h4 className="font-medium text-gray-700 mb-3">Pages les Plus Affectées</h4>
          <div className="space-y-2">
            {data.affectedPages.slice(0, 5).map((page, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="text-sm text-gray-700 truncate flex-1" title={page}>
                  {page}
                </div>
              </div>
            ))}
            {data.affectedPages.length > 5 && (
              <div className="text-sm text-gray-500 text-center pt-2">
                +{data.affectedPages.length - 5} autres pages
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}