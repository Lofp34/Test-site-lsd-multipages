'use client';

import React from 'react';

interface AuditActivity {
  id: string;
  type: 'audit' | 'correction' | 'resource_request' | 'alert';
  message: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
  details?: {
    linksScanned?: number;
    brokenLinksFound?: number;
    correctionsApplied?: number;
    resourceUrl?: string;
    userEmail?: string;
  };
}

interface RecentActivityProps {
  activities: AuditActivity[];
}

const activityIcons = {
  audit: '🔍',
  correction: '🔧',
  resource_request: '📄',
  alert: '🚨',
};

const statusColors = {
  success: 'text-green-600 bg-green-50 border-green-200',
  warning: 'text-orange-600 bg-orange-50 border-orange-200',
  error: 'text-red-600 bg-red-50 border-red-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200',
};

const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'À l\'instant';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  }
};

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>Aucune activité récente</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className={`p-3 rounded-lg border ${statusColors[activity.status]} transition-all hover:shadow-sm`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-lg">
              {activityIcons[activity.type]}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {getRelativeTime(activity.timestamp)}
                </span>
              </div>
              
              {activity.details && (
                <div className="text-xs text-gray-600 space-y-1">
                  {activity.details.linksScanned && (
                    <div>📊 {activity.details.linksScanned} liens scannés</div>
                  )}
                  {activity.details.brokenLinksFound !== undefined && (
                    <div>❌ {activity.details.brokenLinksFound} liens morts trouvés</div>
                  )}
                  {activity.details.correctionsApplied && (
                    <div>✅ {activity.details.correctionsApplied} corrections appliquées</div>
                  )}
                  {activity.details.resourceUrl && (
                    <div className="truncate" title={activity.details.resourceUrl}>
                      📄 {activity.details.resourceUrl}
                    </div>
                  )}
                  {activity.details.userEmail && (
                    <div>👤 {activity.details.userEmail}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {activities.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <p>Aucune activité récente</p>
        </div>
      )}
    </div>
  );
}