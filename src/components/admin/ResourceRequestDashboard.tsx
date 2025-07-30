/**
 * Dashboard d'administration pour gérer les demandes de ressources
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Mail,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface ResourceRequest {
  id: string;
  requestedUrl: string;
  userEmail: string;
  message?: string;
  sourceUrl: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  priority: number;
  requestCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ResourceRequestStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  rejected: number;
  mostRequested: Array<{ url: string; count: number }>;
}

export default function ResourceRequestDashboard() {
  const [requests, setRequests] = useState<ResourceRequest[]>([]);
  const [stats, setStats] = useState<ResourceRequestStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'count'>('date');

  // Charger les données
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // En production, ces appels seraient vers de vraies API routes
      // Pour la démo, on simule les données
      const mockStats: ResourceRequestStats = {
        total: 47,
        pending: 23,
        inProgress: 8,
        completed: 14,
        rejected: 2,
        mostRequested: [
          { url: '/ressources/guide-prospection-avancee.pdf', count: 12 },
          { url: '/ressources/formation-negociation.pdf', count: 8 },
          { url: '/ressources/templates-emails.zip', count: 6 },
          { url: '/ressources/calculateur-roi.xlsx', count: 5 },
          { url: '/ressources/webinar-ia-commercial.mp4', count: 4 }
        ]
      };

      const mockRequests: ResourceRequest[] = [
        {
          id: '1',
          requestedUrl: '/ressources/guide-prospection-avancee.pdf',
          userEmail: 'marie.dupont@entreprise.com',
          message: 'J\'aimerais avoir accès à ce guide pour améliorer notre prospection B2B',
          sourceUrl: 'https://laurentserre.com/ressources',
          status: 'pending',
          priority: 4,
          requestCount: 12,
          createdAt: new Date('2025-01-20T10:30:00'),
          updatedAt: new Date('2025-01-20T10:30:00')
        },
        {
          id: '2',
          requestedUrl: '/ressources/formation-negociation.pdf',
          userEmail: 'pierre.martin@startup.fr',
          message: 'Formation nécessaire pour notre équipe commerciale',
          sourceUrl: 'https://laurentserre.com/formation-commerciale-pme',
          status: 'in_progress',
          priority: 3,
          requestCount: 8,
          createdAt: new Date('2025-01-19T14:15:00'),
          updatedAt: new Date('2025-01-21T09:00:00')
        },
        {
          id: '3',
          requestedUrl: '/ressources/templates-emails.zip',
          userEmail: 'sophie.bernard@pme.com',
          sourceUrl: 'https://laurentserre.com/ressources/guides',
          status: 'completed',
          priority: 2,
          requestCount: 6,
          createdAt: new Date('2025-01-18T16:45:00'),
          updatedAt: new Date('2025-01-20T11:30:00')
        }
      ];

      setStats(mockStats);
      setRequests(mockRequests);
    } catch (err: any) {
      setError('Erreur lors du chargement des données');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer et trier les demandes
  const filteredRequests = requests
    .filter(request => selectedStatus === 'all' || request.status === selectedStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return b.priority - a.priority;
        case 'count':
          return b.requestCount - a.requestCount;
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  // Mettre à jour le statut d'une demande
  const updateRequestStatus = async (requestId: string, newStatus: ResourceRequest['status']) => {
    try {
      // En production: appel API
      setRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, status: newStatus, updatedAt: new Date() }
            : req
        )
      );
      
      // Recharger les stats
      if (stats) {
        const oldRequest = requests.find(r => r.id === requestId);
        if (oldRequest) {
          setStats(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              [oldRequest.status]: prev[oldRequest.status] - 1,
              [newStatus]: prev[newStatus] + 1
            };
          });
        }
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
    }
  };

  const getStatusColor = (status: ResourceRequest['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'rejected': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusLabel = (status: ResourceRequest['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return 'text-red-600';
    if (priority >= 3) return 'text-orange-600';
    if (priority >= 2) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin text-mint-green" size={32} />
        <span className="ml-2 text-gray-600 dark:text-gray-300">Chargement...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button 
          onClick={loadData}
          className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-ink dark:text-white">
            Gestion des Demandes de Ressources
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Gérez et suivez toutes les demandes de ressources des utilisateurs
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadData}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Actualiser
          </button>
          <button className="px-4 py-2 bg-mint-green text-white rounded-lg hover:bg-mint-green/90 transition-colors flex items-center gap-2">
            <Download size={16} />
            Exporter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-blue-ink rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" size={20} />
              <div>
                <p className="text-2xl font-bold text-blue-ink dark:text-white">{stats.total}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Total</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-blue-ink rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Clock className="text-yellow-600" size={20} />
              <div>
                <p className="text-2xl font-bold text-blue-ink dark:text-white">{stats.pending}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">En attente</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-blue-ink rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Users className="text-blue-600" size={20} />
              <div>
                <p className="text-2xl font-bold text-blue-ink dark:text-white">{stats.inProgress}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">En cours</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-blue-ink rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              <div>
                <p className="text-2xl font-bold text-blue-ink dark:text-white">{stats.completed}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Terminées</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-blue-ink rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <XCircle className="text-red-600" size={20} />
              <div>
                <p className="text-2xl font-bold text-blue-ink dark:text-white">{stats.rejected}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Rejetées</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Most Requested Resources */}
      {stats && stats.mostRequested.length > 0 && (
        <div className="bg-white dark:bg-blue-ink rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-mint-green" size={20} />
            <h2 className="text-lg font-semibold text-blue-ink dark:text-white">
              Ressources les plus demandées
            </h2>
          </div>
          <div className="space-y-2">
            {stats.mostRequested.map((resource, index) => (
              <div key={resource.url} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-mint-green text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-sm text-blue-ink dark:text-white font-medium">
                    {resource.url}
                  </span>
                </div>
                <span className="text-sm font-semibold text-mint-green">
                  {resource.count} demandes
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white dark:bg-blue-ink rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-600 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtres:</span>
        </div>
        
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-blue-ink dark:text-white"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="in_progress">En cours</option>
          <option value="completed">Terminées</option>
          <option value="rejected">Rejetées</option>
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'count')}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-blue-ink dark:text-white"
        >
          <option value="date">Trier par date</option>
          <option value="priority">Trier par priorité</option>
          <option value="count">Trier par popularité</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="bg-white dark:bg-blue-ink rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ressource
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Priorité
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-medium text-blue-ink dark:text-white">
                        {request.requestedUrl}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {request.requestCount} demandes
                      </p>
                      {request.message && (
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 italic">
                          "{request.message.substring(0, 50)}..."
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      <span className="text-sm text-blue-ink dark:text-white">
                        {request.userEmail}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm font-semibold ${getPriorityColor(request.priority)}`}>
                      {request.priority}/5
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {request.createdAt.toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-1">
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateRequestStatus(request.id, 'in_progress')}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          >
                            Démarrer
                          </button>
                          <button
                            onClick={() => updateRequestStatus(request.id, 'rejected')}
                            className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          >
                            Rejeter
                          </button>
                        </>
                      )}
                      {request.status === 'in_progress' && (
                        <button
                          onClick={() => updateRequestStatus(request.id, 'completed')}
                          className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        >
                          Terminer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRequests.length === 0 && (
          <div className="text-center py-8">
            <FileText className="mx-auto text-gray-400 mb-2" size={48} />
            <p className="text-gray-500 dark:text-gray-400">
              Aucune demande trouvée pour les filtres sélectionnés
            </p>
          </div>
        )}
      </div>
    </div>
  );
}