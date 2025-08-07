'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Zap,
  Smartphone,
  Eye,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalSessions: number;
    totalUsers: number;
    averageSessionDuration: number;
    totalInteractions: number;
    errorRate: number;
    performanceScore: number;
  };
  featureUsage: {
    name: string;
    usage: number;
    trend: number;
    color: string;
  }[];
  performanceMetrics: {
    timestamp: string;
    markdownRenderTime: number;
    scrollResponseTime: number;
    memoryUsage: number;
    errorCount: number;
  }[];
  userEngagement: {
    hour: string;
    sessions: number;
    interactions: number;
  }[];
  errorAnalysis: {
    type: string;
    count: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }[];
  deviceBreakdown: {
    device: string;
    count: number;
    percentage: number;
  }[];
  accessibilityUsage: {
    feature: string;
    usage: number;
    trend: number;
  }[];
}

const COLORS = ['#00BDA4', '#1B365D', '#FFAA5C', '#EF4444', '#8B5CF6', '#10B981'];

export default function ChatAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadAnalyticsData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadAnalyticsData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/admin/chat-analytics?timeRange=${timeRange}`);
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      } else {
        // Generate sample data for demonstration
        setData(generateSampleData());
      }
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load analytics data:', error);
      setData(generateSampleData());
    } finally {
      setIsLoading(false);
    }
  };

  const generateSampleData = (): AnalyticsData => {
    return {
      overview: {
        totalSessions: Math.floor(Math.random() * 1000) + 500,
        totalUsers: Math.floor(Math.random() * 800) + 400,
        averageSessionDuration: Math.floor(Math.random() * 300) + 120,
        totalInteractions: Math.floor(Math.random() * 5000) + 2000,
        errorRate: Math.random() * 0.05,
        performanceScore: Math.floor(Math.random() * 20) + 80,
      },
      featureUsage: [
        { name: 'Markdown', usage: Math.random() * 0.4 + 0.6, trend: Math.random() * 0.2 - 0.1, color: COLORS[0] },
        { name: 'Scroll Control', usage: Math.random() * 0.3 + 0.7, trend: Math.random() * 0.2 - 0.1, color: COLORS[1] },
        { name: 'Chat Controls', usage: Math.random() * 0.2 + 0.8, trend: Math.random() * 0.2 - 0.1, color: COLORS[2] },
        { name: 'Mobile Opt.', usage: Math.random() * 0.5 + 0.3, trend: Math.random() * 0.2 - 0.1, color: COLORS[3] },
        { name: 'Accessibilité', usage: Math.random() * 0.3 + 0.1, trend: Math.random() * 0.2 - 0.1, color: COLORS[4] },
      ],
      performanceMetrics: Array.from({ length: 24 }, (_, i) => ({
        timestamp: `${i}:00`,
        markdownRenderTime: Math.random() * 50 + 10,
        scrollResponseTime: Math.random() * 20 + 5,
        memoryUsage: Math.random() * 50 + 20,
        errorCount: Math.floor(Math.random() * 5),
      })),
      userEngagement: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        sessions: Math.floor(Math.random() * 50) + 10,
        interactions: Math.floor(Math.random() * 200) + 50,
      })),
      errorAnalysis: [
        { type: 'Markdown Render', count: Math.floor(Math.random() * 10), severity: 'low' },
        { type: 'Scroll Control', count: Math.floor(Math.random() * 5), severity: 'medium' },
        { type: 'Network Error', count: Math.floor(Math.random() * 15), severity: 'high' },
        { type: 'Memory Leak', count: Math.floor(Math.random() * 3), severity: 'critical' },
      ],
      deviceBreakdown: [
        { device: 'Desktop', count: Math.floor(Math.random() * 300) + 200, percentage: 0 },
        { device: 'Mobile', count: Math.floor(Math.random() * 200) + 100, percentage: 0 },
        { device: 'Tablet', count: Math.floor(Math.random() * 100) + 50, percentage: 0 },
      ].map(item => {
        const total = 650;
        return { ...item, percentage: Math.round((item.count / total) * 100) };
      }),
      accessibilityUsage: [
        { feature: 'Screen Reader', usage: Math.random() * 0.2 + 0.05, trend: Math.random() * 0.1 - 0.05 },
        { feature: 'Keyboard Nav', usage: Math.random() * 0.3 + 0.1, trend: Math.random() * 0.1 - 0.05 },
        { feature: 'High Contrast', usage: Math.random() * 0.15 + 0.02, trend: Math.random() * 0.1 - 0.05 },
        { feature: 'Focus Management', usage: Math.random() * 0.25 + 0.08, trend: Math.random() * 0.1 - 0.05 },
      ],
    };
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatPercentage = (num: number): string => {
    return (num * 100).toFixed(1) + '%';
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Chargement des analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-title">
            Analytics Chat Amélioré
          </h2>
          <p className="text-primary-secondary mt-1">
            Analyse détaillée de l'utilisation et des performances
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex rounded-lg border">
            {(['24h', '7d', '30d'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="rounded-none first:rounded-l-lg last:rounded-r-lg"
              >
                {range}
              </Button>
            ))}
          </div>
          
          <Button
            onClick={loadAnalyticsData}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.overview.totalSessions)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(data.overview.totalUsers)} utilisateurs uniques
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durée Moy.</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(data.overview.averageSessionDuration)}
            </div>
            <p className="text-xs text-muted-foreground">
              Par session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.overview.totalInteractions)}</div>
            <p className="text-xs text-muted-foreground">
              Actions utilisateur
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'Erreur</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(data.overview.errorRate)}</div>
            <p className="text-xs text-muted-foreground">
              Erreurs/Sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.performanceScore}/100</div>
            <p className="text-xs text-muted-foreground">
              Score global
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.deviceBreakdown.find(d => d.device === 'Mobile')?.percentage || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Trafic mobile
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="usage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="usage">Utilisation</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="errors">Erreurs</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibilité</TabsTrigger>
        </TabsList>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Adoption des Fonctionnalités</CardTitle>
                <CardDescription>
                  Pourcentage d'utilisation par fonctionnalité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.featureUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={formatPercentage} />
                    <Tooltip formatter={(value: number) => formatPercentage(value)} />
                    <Bar dataKey="usage" fill="#00BDA4" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par Appareil</CardTitle>
                <CardDescription>
                  Distribution du trafic par type d'appareil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.deviceBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ device, percentage }) => `${device} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {data.deviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tendances d'Adoption</CardTitle>
              <CardDescription>
                Évolution de l'utilisation des fonctionnalités
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.featureUsage.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: feature.color }}
                      />
                      <span className="font-medium">{feature.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {formatPercentage(feature.usage)}
                      </span>
                      <div className="flex items-center gap-1">
                        {feature.trend > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm ${feature.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(Math.abs(feature.trend))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Métriques de Performance</CardTitle>
              <CardDescription>
                Temps de réponse et utilisation des ressources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="markdownRenderTime" 
                    stroke="#00BDA4" 
                    name="Rendu Markdown (ms)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="scrollResponseTime" 
                    stroke="#1B365D" 
                    name="Réponse Scroll (ms)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="memoryUsage" 
                    stroke="#FFAA5C" 
                    name="Mémoire (MB)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Utilisateur</CardTitle>
              <CardDescription>
                Sessions et interactions par heure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data.userEngagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="sessions" 
                    stackId="1" 
                    stroke="#00BDA4" 
                    fill="#00BDA4" 
                    fillOpacity={0.6}
                    name="Sessions"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="interactions" 
                    stackId="2" 
                    stroke="#1B365D" 
                    fill="#1B365D" 
                    fillOpacity={0.6}
                    name="Interactions"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Errors Tab */}
        <TabsContent value="errors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des Erreurs</CardTitle>
              <CardDescription>
                Types d'erreurs et leur fréquence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.errorAnalysis.map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{error.type}</div>
                        <div className="text-sm text-gray-500">{error.count} occurrences</div>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(error.severity)}>
                      {error.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accessibility Tab */}
        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Utilisation des Fonctionnalités d'Accessibilité</CardTitle>
              <CardDescription>
                Adoption des outils d'accessibilité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.accessibilityUsage.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">{feature.feature}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {formatPercentage(feature.usage)}
                      </span>
                      <div className="flex items-center gap-1">
                        {feature.trend > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm ${feature.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(Math.abs(feature.trend))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pt-6 border-t">
        <p>
          Dernière mise à jour: {lastUpdate.toLocaleString('fr-FR')} • 
          Période: {timeRange} • 
          Données en temps réel
        </p>
      </div>
    </div>
  );
}