'use client';

import React, { useState, useEffect } from 'react';

interface HealthDataPoint {
  date: string;
  healthScore: number;
  totalLinks: number;
  brokenLinks: number;
  validLinks: number;
}

export function LinkHealthChart() {
  const [data, setData] = useState<HealthDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/link-health-history?range=${timeRange}`);
        if (response.ok) {
          const healthData = await response.json();
          setData(healthData);
        }
      } catch (error) {
        console.error('Failed to fetch link health data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

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
          <p>Aucune donnée disponible</p>
          <p className="text-sm">Lancez un audit pour commencer</p>
        </div>
      </div>
    );
  }

  const maxScore = Math.max(...data.map(d => d.healthScore));
  const minScore = Math.min(...data.map(d => d.healthScore));
  const maxLinks = Math.max(...data.map(d => d.totalLinks));

  return (
    <div className="space-y-4">
      {/* Time range selector */}
      <div className="flex justify-end">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-white text-blue-ink shadow-sm'
                  : 'text-gray-600 hover:text-blue-ink'
              }`}
            >
              {range === '7d' ? '7 jours' : range === '30d' ? '30 jours' : '90 jours'}
            </button>
          ))}
        </div>
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
          {[0, 25, 50, 75, 100].map((y) => (
            <text
              key={y}
              x="35"
              y={165 - (y * 1.2)}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              {y}%
            </text>
          ))}

          {/* Health score line */}
          {data.length > 1 && (
            <polyline
              points={data
                .map((point, index) => {
                  const x = 40 + (index * (340 / (data.length - 1)));
                  const y = 160 - (point.healthScore * 1.2);
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
          )}

          {/* Data points */}
          {data.map((point, index) => {
            const x = 40 + (index * (340 / Math.max(data.length - 1, 1)));
            const y = 160 - (point.healthScore * 1.2);
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#10B981"
                  className="drop-shadow-sm"
                />
                
                {/* Tooltip on hover */}
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill="transparent"
                  className="cursor-pointer"
                >
                  <title>
                    {new Date(point.date).toLocaleDateString('fr-FR')}
                    {'\n'}Score: {point.healthScore}%
                    {'\n'}Liens valides: {point.validLinks}/{point.totalLinks}
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

      {/* Legend and stats */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Score de santé</span>
          </div>
        </div>
        
        <div className="text-right">
          <div>Score actuel: <span className="font-semibold text-green-600">{data[data.length - 1]?.healthScore || 0}%</span></div>
          <div>Évolution: <span className={`font-semibold ${
            data.length > 1 && data[data.length - 1].healthScore > data[data.length - 2].healthScore
              ? 'text-green-600' 
              : data.length > 1 && data[data.length - 1].healthScore < data[data.length - 2].healthScore
              ? 'text-red-600'
              : 'text-gray-600'
          }`}>
            {data.length > 1 
              ? `${data[data.length - 1].healthScore - data[data.length - 2].healthScore > 0 ? '+' : ''}${(data[data.length - 1].healthScore - data[data.length - 2].healthScore).toFixed(1)}%`
              : 'N/A'
            }
          </span></div>
        </div>
      </div>
    </div>
  );
}