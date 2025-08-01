'use client';

/**
 * Dashboard de monitoring des corrections déployées
 * 
 * Ce composant affiche :
 * - L'état des liens corrigés
 * - Les métriques des nouvelles pages ressources
 * - Les alertes de formulaires
 * - L'historique des déploiements
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  ExternalLink,
  Mail,
  FileText,
  Activity
} from 'lucide-react';

interface LinkStatus {
  url: string;
  status: 'working' | 'broken' | 'checking';
  lastChecked: string;
  responseTime?: number;
  statusCode?: number;
}

interface ResourcePageMetrics {
  url: string;
  title: string;
  visits: number;
  formSubmissions: number;
  conversionRate: number;
  avgTimeOnPage: number;
  bounceRate: number;
}

interface FormAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
}

interface DeploymentHistory {
  id: string;
  version: string;
  date: string;
  success: boolean;
  changes: string[];
  deploymentUrl?: string;
}

export default function CorrectionsMonitoringDashboard() {
  const [correctedLinks, setCorrectedLinks] = useState<LinkStatus[]>([]);
  const [resourceMetrics, setResourceMetrics] = useState<ResourcePageMetrics[]>([]);
  const [formAlerts, setFormAlerts] = useState<FormAlert[]>([]);
  const [deploymentHistory, setDeploymentHistory] = useState<DeploymentHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    loadDashboardData();
    
    // Actualiser toutes les 5 minutes
    const interval = setInterval(loadDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadCorrectedLinksStatus(),
        loadResourceMetrics(),
        loadFormAlerts(),
        loadDeploymentHistory()
      ]);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCorrectedLinksStatus = async () => {
    // Simuler le chargement des liens corrigés
    // En production, ceci ferait appel à l'API d'audit
    const mockLinks: LinkStatus[] = [
      {
        url: '/coach-commercial-entreprise',
        status: 'working',
        lastChecked: new Date().toISOString(),
        responseTime: 245,
        statusCode: 200
      },
      {
        url: '/bootcamp-commercial-intensif',
        status: 'working',
        lastChecked: new Date().toISOString(),
        responseTime: 189,
        statusCode: 200
      }
    ];
    setCorrectedLinks(mockLinks);
  };

  const loadResourceMetrics = async () => {
    // Simuler le chargement des métriques des pages ressources
    const mockMetrics: ResourcePageMetrics[] = [
      {
        url: '/ressources/outil-tableau-bord',
        title: 'Outil Tableau de Bord',
        visits: 156,
        formSubmissions: 23,
        conversionRate: 14.7,
        avgTimeOnPage: 245,
        bounceRate: 32.1
      },
      {
        url: '/ressources/grille-evaluation',
        title: 'Grille d\'Évaluation',
        visits: 89,
        formSubmissions: 12,
        conversionRate: 13.5,
        avgTimeOnPage: 198,
        bounceRate: 28.9
      },
      {
        url: '/ressources/reporting-automatise',
        title: 'Reporting Automatisé',
        visits: 134,
        formSubmissions: 19,
        conversionRate: 14.2,
        avgTimeOnPage: 267,
        avgTimeOnPage: 35.6
      }
    ];
    setResourceMetrics(mockMetrics);
  };

  const loadFormAlerts = async () => {
    // Simuler le chargement des alertes de formulaires
    const mockAlerts: FormAlert[] = [
      {
        id: '1',
        type: 'info',
        message: 'Nouveau pic de soumissions sur la grille d\'évaluation (+45% cette semaine)',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        resolved: false
      },
      {
        id: '2',
        type: 'warning',
        message: 'Temps de réponse élevé sur l\'API resource-request (>3s)',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        resolved: true
      }
    ];
    setFormAlerts(mockAlerts);
  };

  const loadDeploymentHistory = async () => {
    // Simuler l'historique des déploiements
    const mockHistory: DeploymentHistory[] = [
      {
        id: '1',
        version: '1.2.1',
        date: new Date().toISOString(),
        success: true,
        changes: [
          'Correction des liens CTA',
          'Création des pages ressources',
          'Configuration du monitoring'
        ],
        deploymentUrl: 'https://laurent-serre-developpement.vercel.app'
      }
    ];
    setDeploymentHistory(mockHistory);
  };

  const refreshData = () => {
    loadDashboardData();
  };

  const resolveAlert = async (alertId: string) => {
    setFormAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, resolved: true }
          : alert
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'working':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'broken':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'checking':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-title">
            Monitoring des Corrections
          </h1>
          <p className="text-primary-secondary mt-1">
            Surveillance des liens corrigés et des nouvelles pages ressources
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-primary-secondary">
            Dernière actualisation: {lastRefresh.toLocaleTimeString('fr-FR')}
          </span>
          <Button 
            onClick={refreshData} 
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Liens Corrigés */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Liens CTA Corrigés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {correctedLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(link.status)}
                  <div>
                    <p className="font-medium">{link.url}</p>
                    <p className="text-sm text-primary-secondary">
                      Dernière vérification: {new Date(link.lastChecked).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {link.responseTime && (
                    <Badge variant="outline">
                      {link.responseTime}ms
                    </Badge>
                  )}
                  {link.statusCode && (
                    <Badge variant={link.statusCode === 200 ? 'default' : 'destructive'}>
                      {link.statusCode}
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métriques des Pages Ressources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Performances des Pages Ressources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {resourceMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{metric.title}</h3>
                    <p className="text-sm text-primary-secondary">{metric.url}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={metric.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{metric.visits}</p>
                    <p className="text-xs text-primary-secondary">Visites</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{metric.formSubmissions}</p>
                    <p className="text-xs text-primary-secondary">Soumissions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{metric.conversionRate}%</p>
                    <p className="text-xs text-primary-secondary">Conversion</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {formatDuration(metric.avgTimeOnPage)}
                    </p>
                    <p className="text-xs text-primary-secondary">Temps moyen</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{metric.bounceRate}%</p>
                    <p className="text-xs text-primary-secondary">Rebond</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertes Formulaires */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-yellow-500" />
            Alertes Formulaires
            {formAlerts.filter(alert => !alert.resolved).length > 0 && (
              <Badge variant="destructive">
                {formAlerts.filter(alert => !alert.resolved).length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {formAlerts.length === 0 ? (
              <p className="text-primary-secondary text-center py-4">
                Aucune alerte active
              </p>
            ) : (
              formAlerts.map((alert) => (
                <Alert key={alert.id} className={alert.resolved ? 'opacity-60' : ''}>
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <AlertDescription>
                        {alert.message}
                      </AlertDescription>
                      <p className="text-xs text-primary-secondary mt-1">
                        {new Date(alert.timestamp).toLocaleString('fr-FR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.resolved ? (
                        <Badge variant="outline">Résolu</Badge>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => resolveAlert(alert.id)}
                        >
                          Marquer résolu
                        </Button>
                      )}
                    </div>
                  </div>
                </Alert>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Historique des Déploiements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-500" />
            Historique des Déploiements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deploymentHistory.map((deployment) => (
              <div key={deployment.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">Version {deployment.version}</h3>
                      <Badge variant={deployment.success ? 'default' : 'destructive'}>
                        {deployment.success ? 'Succès' : 'Échec'}
                      </Badge>
                    </div>
                    <p className="text-sm text-primary-secondary">
                      {new Date(deployment.date).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  {deployment.deploymentUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={deployment.deploymentUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Changements déployés:</p>
                  <ul className="text-sm text-primary-secondary space-y-1">
                    {deployment.changes.map((change, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}