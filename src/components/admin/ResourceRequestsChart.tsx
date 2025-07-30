'use client';

import React, { useState, useEffect } from 'react';

interface ResourceRequestData {
  date: string;
  requests: number;
  completed: number;
  pending: number;
}

interface MostRequestedResource {
  url: string;
  count: number;
  status: 'pending' | 'in_progress' | 'completed';
}

export function ResourceRequestsChart() {
  const [data, setData] = useState<ResourceRequestData[]>([]);
  const [mostRequested, setMostRequested] = useState<MostRequestedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('30d');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch chart data
        const chartResponse = await fetch(`/api/admin/resource-requests-chart?range=${timeRange}`);
        if (chartResponse.ok) {
          const chartData = await chartResponse.json();
          setData(chartData);
        }
        
        // Fetch most requested resources
        const topResponse = await fetch('/api/admin/most-requested-resources');
        if (topResponse.ok) {
          const topData = await topResponse.json();
          setMostRequested(topData);
        }
      } catch (error) {
        console.error('Failed to fetch resource requests data:', error);
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>Aucune demande de ressource</p>
        </div>
      </div>
    );
  }

  const maxRequests = Math.max(...data.map(d => d.requests));

  return (
    <div className="space-y-6">
      {/* Time range selector */}
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-700">Évolution des demandes</h4>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-white text-blue-ink shadow-sm'
                  : 'text-gray-600 hover:text-blue-ink'
              }`}
            >
              {range === '7d' ? '7 jours' : '30 jours'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-32">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="40"
              y1={100 - (y * 0.6)}
              x2="380"
              y2={100 - (y * 0.6)}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Bars */}
          {data.map((point, index) => {
            const x = 40 + (index * (340 / data.length));
            const barWidth = Math.max(340 / data.length - 4, 8);
            const totalHeight = (point.requests / Math.max(maxRequests, 1)) * 60;
            const completedHeight = (point.completed / Math.max(maxRequests, 1)) * 60;
            
            return (
              <g key={index}>
                {/* Total requests bar */}
                <rect
                  x={x}
                  y={100 - totalHeight}
                  width={barWidth}
                  height={totalHeight}
                  fill="#E5E7EB"
                  className="hover:fill-gray-400 transition-colors"
                >
                  <title>
                    {new Date(point.date).toLocaleDateString('fr-FR')}
                    {'\n'}Total: {point.requests}
                    {'\n'}Complétées: {point.completed}
                    {'\n'}En attente: {point.pending}
                  </title>
                </rect>
                
                {/* Completed requests bar */}
                <rect
                  x={x}
                  y={100 - completedHeight}
                  width={barWidth}
                  height={completedHeight}
                  fill="#10B981"
                  className="hover:fill-green-600 transition-colors"
                />
              </g>
            );
          })}

          {/* X-axis labels */}
          {data.map((point, index) => {
            if (index % Math.ceil(data.length / 5) === 0) {
              const x = 40 + (index * (340 / data.length)) + (340 / data.length) / 2;
              return (
                <text
                  key={index}
                  x={x}
                  y="115"
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

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-300 rounded"></div>
          <span>Total demandes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Complétées</span>
        </div>
      </div>

      {/* Most requested resources */}
      {mostRequested.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-700 mb-3">Ressources les plus demandées</h4>
          <div className="space-y-2">
            {mostRequested.slice(0, 5).map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate" title={resource.url}>
                    {resource.url.split('/').pop() || resource.url}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {resource.url}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-sm font-semibold text-gray-700">
                    {resource.count}
                  </span>
                  
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    resource.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : resource.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {resource.status === 'completed' ? 'Complété' :
                     resource.status === 'in_progress' ? 'En cours' : 'En attente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}