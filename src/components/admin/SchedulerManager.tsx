'use client';

import React, { useState, useEffect } from 'react';

interface ScheduleConfig {
  enabled: boolean;
  dailyAuditTime: string;
  weeklyReportDay: number;
  weeklyReportTime: string;
  alertCheckInterval: number;
  maxConcurrentAudits: number;
  auditTimeout: number;
}

interface AuditJob {
  id: string;
  type: 'full_audit' | 'quick_check' | 'alert_analysis' | 'weekly_report';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  scheduledAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  priority: number;
}

interface SchedulerStatus {
  enabled: boolean;
  config: ScheduleConfig;
  status: {
    pending: number;
    running: number;
    queue: AuditJob[];
    runningJobs: AuditJob[];
  };
}

const dayNames = [
  'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
];

const jobTypeNames = {
  full_audit: 'Audit complet',
  quick_check: 'Vérification rapide',
  alert_analysis: 'Analyse d\'alertes',
  weekly_report: 'Rapport hebdomadaire'
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  running: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  failed: 'bg-red-100 text-red-800 border-red-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
};

export function SchedulerManager() {
  const [schedulerStatus, setSchedulerStatus] = useState<SchedulerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSchedulerStatus();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchSchedulerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchSchedulerStatus = async () => {
    try {
      const response = await fetch('/api/admin/scheduler');
      if (response.ok) {
        const data = await response.json();
        setSchedulerStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch scheduler status:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (newConfig: Partial<ScheduleConfig>) => {
    if (!schedulerStatus) return;

    try {
      setSaving(true);
      const response = await fetch('/api/admin/scheduler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_config',
          config: newConfig,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Configuration mise à jour' });
        await fetchSchedulerStatus();
      } else {
        throw new Error('Failed to update config');
      }
    } catch (error) {
      console.error('Failed to update config:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' });
    } finally {
      setSaving(false);
    }
  };

  const scheduleAudit = async (type: 'audit' | 'quick_check') => {
    try {
      const response = await fetch('/api/admin/scheduler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: type === 'audit' ? 'schedule_audit' : 'schedule_quick_check',
          priority: type === 'audit' ? 7 : 5,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ 
          type: 'success', 
          text: `${type === 'audit' ? 'Audit' : 'Vérification'} planifié: ${result.jobId}` 
        });
        await fetchSchedulerStatus();
      } else {
        throw new Error('Failed to schedule');
      }
    } catch (error) {
      console.error('Failed to schedule:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la planification' });
    }
  };

  const cancelJob = async (jobId: string) => {
    try {
      const response = await fetch('/api/admin/scheduler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'cancel_job',
          jobId,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Job annulé' });
        await fetchSchedulerStatus();
      } else {
        throw new Error('Failed to cancel job');
      }
    } catch (error) {
      console.error('Failed to cancel job:', error);
      setMessage({ type: 'error', text: 'Erreur lors de l\'annulation' });
    }
  };

  const processQueue = async () => {
    try {
      const response = await fetch('/api/admin/scheduler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'process_queue',
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'File d\'attente traitée' });
        await fetchSchedulerStatus();
      } else {
        throw new Error('Failed to process queue');
      }
    } catch (error) {
      console.error('Failed to process queue:', error);
      setMessage({ type: 'error', text: 'Erreur lors du traitement' });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!schedulerStatus) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center text-red-600">
          Impossible de charger le statut du scheduler
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-blue-ink">
          Planificateur d'Audits
        </h3>
        
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            schedulerStatus.enabled 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {schedulerStatus.enabled ? '🟢 Actif' : '🔴 Inactif'}
          </div>
          
          <button
            onClick={processQueue}
            className="flex items-center gap-2 bg-mint-green text-white px-3 py-1 rounded text-sm hover:bg-mint-green/90"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Traiter File
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Statut de la file d'attente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-800">
            {schedulerStatus.status.pending}
          </div>
          <div className="text-sm text-yellow-600">Jobs en attente</div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-800">
            {schedulerStatus.status.running}
          </div>
          <div className="text-sm text-blue-600">Jobs en cours</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-800">
            {schedulerStatus.config.maxConcurrentAudits}
          </div>
          <div className="text-sm text-gray-600">Limite concurrente</div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b">
        <button
          onClick={() => scheduleAudit('audit')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Planifier Audit
        </button>
        
        <button
          onClick={() => scheduleAudit('quick_check')}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Vérification Rapide
        </button>
      </div>

      {/* Configuration */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-700">Configuration</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heure audit quotidien
            </label>
            <input
              type="time"
              value={schedulerStatus.config.dailyAuditTime}
              onChange={(e) => updateConfig({ dailyAuditTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jour rapport hebdomadaire
            </label>
            <select
              value={schedulerStatus.config.weeklyReportDay}
              onChange={(e) => updateConfig({ weeklyReportDay: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
            >
              {dayNames.map((day, index) => (
                <option key={index} value={index}>{day}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heure rapport hebdomadaire
            </label>
            <input
              type="time"
              value={schedulerStatus.config.weeklyReportTime}
              onChange={(e) => updateConfig({ weeklyReportTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timeout audit (minutes)
            </label>
            <input
              type="number"
              min="5"
              max="120"
              value={schedulerStatus.config.auditTimeout}
              onChange={(e) => updateConfig({ auditTimeout: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* File d'attente */}
      {(schedulerStatus.status.queue.length > 0 || schedulerStatus.status.runningJobs.length > 0) && (
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Jobs Actifs</h4>
          
          <div className="space-y-2">
            {/* Jobs en cours */}
            {schedulerStatus.status.runningJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}>
                      {job.status === 'running' ? '🔄' : '⏸️'} {job.status}
                    </span>
                    <span className="font-medium">{jobTypeNames[job.type]}</span>
                    <span className="text-sm text-gray-500">Priorité: {job.priority}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ID: {job.id} • Démarré: {job.startedAt ? new Date(job.startedAt).toLocaleString('fr-FR') : 'N/A'}
                  </div>
                </div>
                
                <button
                  onClick={() => cancelJob(job.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Annuler
                </button>
              </div>
            ))}
            
            {/* Jobs en attente */}
            {schedulerStatus.status.queue.slice(0, 5).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}>
                      ⏳ {job.status}
                    </span>
                    <span className="font-medium">{jobTypeNames[job.type]}</span>
                    <span className="text-sm text-gray-500">Priorité: {job.priority}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ID: {job.id} • Planifié: {new Date(job.scheduledAt).toLocaleString('fr-FR')}
                  </div>
                </div>
                
                <button
                  onClick={() => cancelJob(job.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Annuler
                </button>
              </div>
            ))}
            
            {schedulerStatus.status.queue.length > 5 && (
              <div className="text-center text-sm text-gray-500 py-2">
                +{schedulerStatus.status.queue.length - 5} autres jobs en attente
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}