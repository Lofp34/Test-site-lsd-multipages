'use client';

import React, { useState, useEffect } from 'react';

interface AuditHistoryPoint {
  date: string;
  totalLinks: number;
  brokenLinks: number;
  correctedLinks: number;
  seoScore: number;
  executionTime: number;
}

export function AuditHistoryChart() {
  const [data, setData] = useState<AuditHistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'seoScore' | 'brokenLinks' | 'executionTime'>('seoScore');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/audit-history');
        if (response.ok) {
          const historyData = await response.json();
          setData(historyData);
        }
      } catch (error) {
        console.error('Failed to fetch audit history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-green"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p>Aucun historique d'audit</p>
          <p className="text-sm">Lancez votre premier audit</p>
        </div>
      </div>
    );
  }

  const getMetricValue = (point: AuditHistoryPoint) => {
    switch (selectedMetric) {
      case 'seoScore':
        return point.seoScore;
      case 'brokenLinks':
        return point.brokenLinks;
      case 'executionTime':
        return point.executionTime;
      default:
        return point.seoScore;
    }
  };

  const getMetricColor = () => {
    switch (selectedMetric) {
      case 'seoScore':
        return '#10B981';
      case 'brokenLinks':
        return '#EF4444';
      case 'executionTime':
        return '#3B82F6';
      default:
        return '#10B981';
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'seoScore':
        return 'Score SEO (%)';
      case 'brokenLinks':
        return 'Liens morts';
      case 'executionTime':
        return 'Temps d\'exécution (s)';
      default:
        return 'Score SEO (%)';
    }
  };

  const maxValue = Math.max(...data.map(getMetricValue));
  const minValue = Math.min(...data.map(getMetricValue));

  return (
    <div className="space-y-4">
      {/* Metric selector */}
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-700">Métriques d'audit</h4>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value as any)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
        >
          <option value="seoScore">Score SEO</option>
          <option value="brokenLinks">Liens morts</option>
          <option value="executionTime">Temps d'exécution</option>
        </select>
      </div>

      {/* Chart */}
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="40"
              y1={160 - (y * 1.2)}
              x2="380"
              y2={160 - (y * 1.2)}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((y) => {
            const value = selectedMetric === 'seoScore' 
              ? y 
              : Math.round((y / 100) * maxValue);
            return (
              <text
                key={y}
                x="35"
                y={165 - (y * 1.2)}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {value}{selectedMetric === 'seoScore' ? '%' : selectedMetric === 'executionTime' ? 's' : ''}
              </text>
            );
          })}

          {/* Line chart */}
          {data.length > 1 && (
            <polyline
              points={data
                .map((point, index) => {
                  const x = 40 + (index * (340 / (data.length - 1)));
                  const normalizedValue = maxValue > 0 ? (getMetricValue(point) / maxValue) * 100 : 0;
                  const y = 160 - (normalizedValue * 1.2);
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke={getMetricColor()}
              strokeWidth="2"
              className="drop-shadow-sm"
            />
          )}

          {/* Data points */}
          {data.map((point, index) => {
            const x = 40 + (index * (340 / Math.max(data.length - 1, 1)));
            const normalizedValue = maxValue > 0 ? (getMetricValue(point) / maxValue) * 100 : 0;
            const y = 160 - (normalizedValue * 1.2);
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill={getMetricColor()}
                  className="drop-shadow-sm"
                />
                
                {/* Tooltip */}
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill="transparent"
                  className="cursor-pointer"
                >
                  <title>
                    {new Date(point.date).toLocaleDateString('fr-FR')}
                    {'\n'}{getMetricLabel()}: {getMetricValue(point)}{selectedMetric === 'seoScore' ? '%' : selectedMetric === 'executionTime' ? 's' : ''}
                    {'\n'}Total liens: {point.totalLinks}
                    {'\n'}Corrections: {point.correctedLinks}
                  </title>
                </circle>
              </g>
            );
          })}

          {/* X-axis labels */}
          {data.map((point, index) => {
            if (index % Math.ceil(data.length / 5) === 0) {
              const x = 40 + (index * (340 / Math.max(data.length - 1, 1)));
              return (
                <text
                  key={index}
                  x={x}
                  y="185"
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {new Date(point.date).toLocaleDateString('fr-FR', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </text>
              );
            }
            return null;
          })}
        </svg>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="font-semibold text-gray-900">
            {data[data.length - 1] ? getMetricValue(data[data.length - 1]) : 0}
            {selectedMetric === 'seoScore' ? '%' : selectedMetric === 'executionTime' ? 's' : ''}
          </div>
          <div className="text-gray-500">Actuel</div>
        </div>
        
        <div className="text-center">
          <div className="font-semibold text-gray-900">
            {Math.round(data.reduce((sum, point) => sum + getMetricValue(point), 0) / data.length)}
            {selectedMetric === 'seoScore' ? '%' : selectedMetric === 'executionTime' ? 's' : ''}
          </div>
          <div className="text-gray-500">Moyenne</div>
        </div>
        
        <div className="text-center">
          <div className={`font-semibold ${
            data.length > 1 && getMetricValue(data[data.length - 1]) > getMetricValue(data[data.length - 2])
              ? selectedMetric === 'brokenLinks' ? 'text-red-600' : 'text-green-600'
              : data.length > 1 && getMetricValue(data[data.length - 1]) < getMetricValue(data[data.length - 2])
              ? selectedMetric === 'brokenLinks' ? 'text-green-600' : 'text-red-600'
              : 'text-gray-900'
          }`}>
            {data.length > 1 
              ? `${getMetricValue(data[data.length - 1]) - getMetricValue(data[data.length - 2]) > 0 ? '+' : ''}${(getMetricValue(data[data.length - 1]) - getMetricValue(data[data.length - 2])).toFixed(selectedMetric === 'seoScore' ? 1 : 0)}`
              : '0'
            }{selectedMetric === 'seoScore' ? '%' : selectedMetric === 'executionTime' ? 's' : ''}
          </div>
          <div className="text-gray-500">Évolution</div>
        </div>
      </div>
    </div>
  );
}