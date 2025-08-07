'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Settings, 
  Activity, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Download,
  Upload,
  Database,
  Shield,
  Zap
} from 'lucide-react';
import ChatEnhancementsAdmin from './ChatEnhancementsAdmin';

interface DashboardStats {
  totalUsers: number;
  activeFeatures: number;
  errorRate: number;
  performanceScore: number;
  lastUpdate: string;
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  services: {
    api: 'online' | 'offline' | 'degraded';
    database: 'online' | 'offline' | 'degraded';
    cache: 'online' | 'offline' | 'degraded';
    monitoring: 'online' | 'offline' | 'degraded';
  };
  uptime: number;
  responseTime: number;
}

interface RecentActivity {
  id: string;
  type: 'config_change' | 'error' | 'deployment' | 'user_action';
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
  user?: string;
}

export default function ChatAdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeFeatures: 0,
    errorRate: 0,
    performanceScore: 0,
    lastUpdate: new Date().toISOString(),
  });

  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    status: 'healthy',
    services: {
      api: 'online',
      database: 'online',
      cache: 'online',
      monitoring: 'online',
    },
    uptime: 99.9,
    responseTime: 150,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    loadDashboardData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load dashboard statistics
      await Promise.all([
        loadStats(),
        loadSystemHealth(),
        loadRecentActivity(),
      ]);
      
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/chat-metrics');
      if (response.ok) {
        const metrics = await response.json();
        setStats({
          totalUsers: metrics.totalSessions || 0,
          activeFeatures: Object.values(metrics.featureAdoptionRates || {}).filter((rate: any) => rate > 0.1).length,
          errorRate: metrics.errorRate || 0,
          performanceScore: calculatePerformanceScore(metrics),
          lastUpdate: metrics.lastUpdated || new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadSystemHealth = async () => {
    try {
      const response = await fetch('/api/admin/system-health');
      if (response.ok) {
        const health = await response.json();
        setSystemHealth(health);
      } else {
        // Simulate system health for demo
        setSystemHealth({
          status: 'healthy',
          services: {
            api: 'online',
            database: 'online',
            cache: 'online',
            monitoring: 'online',
          },
          uptime: 99.9,
          responseTime: Math.floor(Math.random() * 100) + 100,
        });
      }
    } catch (error) {
      console.error('Failed to load system health:', error);
    }
  };

  const loadRecentActivity = async () => {
    try {
      const response = await fetch('/api/admin/activity-log');
      if (response.ok) {
        const activities = await response.json();
        setRecentActivity(activities);
      } else {
        // Simulate recent activity for demo
        setRecentActivity([
          {
            id: '1',
            type: 'config_change',
            message: 'Configuration mise à jour: Markdown activé',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            severity: 'info',
            user: 'admin',
          },
          {
            id: '2',
            type: 'deployment',
            message: 'Nouvelle version déployée: v1.2.0',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            severity: 'info',
          },
          {
            id: '3',
            type: 'error',
            message: 'Erreur de rendu Markdown détectée',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            severity: 'warning',
          },
        ]);
      }
    } catch (error) {
      console.error('Failed to load recent activity:', error);
    }
  };

  const calculatePerformanceScore = (metrics: any): number => {
    if (!metrics) return 0;
    
    // Calculate performance score based on various metrics
    const renderTimeScore = Math.max(0, 100 - (metrics.markdownRenderTime || 0));
    const scrollResponseScore = Math.max(0, 100 - (metrics.scrollResponseTime || 0) * 2);
    const errorRateScore = Math.max(0, 100 - (metrics.errorRate || 0) * 1000);
    
    return Math.round((renderTimeScore + scrollResponseScore + errorRateScore) / 3);
  };

  const exportConfiguration = async () => {
    try {
      const response = await fetch('/api/admin/chat-config');
      if (response.ok) {
        const config = await response.json();
        const dataStr = JSON.stringify(config, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `chat-config-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      }
    } catch (error) {
      console.error('Failed to export configuration:', error);
    }
  };

  const importConfiguration = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          const config = JSON.parse(text);
          
          const response = await fetch('/api/admin/chat-config', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(config),
          });
          
          if (response.ok) {
            await loadDashboardData();
            alert('Configuration importée avec succès');
          } else {
            alert('Erreur lors de l\'importation de la configuration');
          }
        } catch (error) {
          console.error('Failed to import configuration:', error);
          alert('Erreur lors de l\'importation: fichier invalide');
        }
      }
    };
    input.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return 'text-green-600 bg-green-100';
      case 'warning':
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
      case 'offline':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'config_change':
        return <Settings className="w-4 h-4" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      case 'deployment':
        return <Upload className="w-4 h-4" />;
      case 'user_action':
        return <Users className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-title">
            Dashboard Chat Amélioré
          </h1>
          <p className="text-primary-secondary mt-2">
            Monitoring et administration des fonctionnalités de chat
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={exportConfiguration}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exporter
          </Button>
          
          <Button
            variant="outline"
            onClick={importConfiguration}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Importer
          </Button>
          
          <Button
            onClick={loadDashboardData}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Actualiser
          </Button>
        </div>
      </div>

      {/* System Health Alert */}
      {systemHealth.status !== 'healthy' && (
        <Alert className={systemHealth.status === 'critical' ? 'border-red-500' : 'border-yellow-500'}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            {systemHealth.status === 'critical' ? 'Problème Critique' : 'Attention'}
          </AlertTitle>
          <AlertDescription>
            Le système présente des problèmes. Vérifiez l'état des services ci-dessous.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Sessions depuis le déploiement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fonctionnalités Actives</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeFeatures}/10</div>
            <p className="text-xs text-muted-foreground">
              Fonctionnalités utilisées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'Erreur</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats.errorRate * 100).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Erreurs sur 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.performanceScore}/100</div>
            <p className="text-xs text-muted-foreground">
              Performance globale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  État du Système
                </CardTitle>
                <CardDescription>
                  Statut des services et performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Statut Global</span>
                  <Badge className={getStatusColor(systemHealth.status)}>
                    {systemHealth.status === 'healthy' ? 'Sain' : 
                     systemHealth.status === 'warning' ? 'Attention' : 'Critique'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(systemHealth.services).map(([service, status]) => (
                    <div key={service} className="flex items-center justify-between">
                      <span className="capitalize">{service}</span>
                      <Badge className={getStatusColor(status)}>
                        {status === 'online' ? 'En ligne' : 
                         status === 'degraded' ? 'Dégradé' : 'Hors ligne'}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Uptime: {systemHealth.uptime}%</span>
                    <span>Réponse: {systemHealth.responseTime}ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Activité Récente
                </CardTitle>
                <CardDescription>
                  Dernières actions et événements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-1 rounded-full ${
                        activity.severity === 'error' ? 'bg-red-100 text-red-600' :
                        activity.severity === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString('fr-FR')}
                          {activity.user && ` • ${activity.user}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="configuration">
          <ChatEnhancementsAdmin />
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring en Temps Réel</CardTitle>
              <CardDescription>
                Métriques de performance et d'utilisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Interface de monitoring en cours de développement
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Graphiques et métriques détaillées seront disponibles prochainement
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logs Système</CardTitle>
              <CardDescription>
                Journaux d'événements et erreurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Interface de logs en cours de développement
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Consultation et filtrage des logs seront disponibles prochainement
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Administration Système</CardTitle>
              <CardDescription>
                Outils d'administration et maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Outils d'administration en cours de développement
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Maintenance, backup et outils système seront disponibles prochainement
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Info */}
      <div className="text-center text-sm text-gray-500 pt-6 border-t">
        <p>
          Dernière actualisation: {lastRefresh.toLocaleString('fr-FR')} • 
          Version: 1.0.0 • 
          Mise à jour des données: {new Date(stats.lastUpdate).toLocaleString('fr-FR')}
        </p>
      </div>
    </div>
  );
}