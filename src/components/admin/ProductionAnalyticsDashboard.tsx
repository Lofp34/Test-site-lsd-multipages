'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Settings,
  Zap,
  Target
} from 'lucide-react';
import { ProductionAnalytics, AnalysisReport, OptimizationRecommendation } from '@/lib/analytics/production-analytics';

interface ProductionAnalyticsDashboardProps {
  supabaseClient: any;
}

export default function ProductionAnalyticsDashboard({ supabaseClient }: ProductionAnalyticsDashboardProps) {
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [applyingOptimizations, setApplyingOptimizations] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const analytics = new ProductionAnalytics(supabaseClient);

  useEffect(() => {
    loadAnalyticsReport();
  }, []);

  const loadAnalyticsReport = async () => {
    try {
      setLoading(true);
      const analysisReport = await analytics.generateAnalysisReport();
      setReport(analysisReport);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading analytics report:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyOptimizations = async () => {
    if (!report) return;
    
    try {
      setApplyingOptimizations(true);
      await analytics.applyOptimizations(report.recommendations);
      await loadAnalyticsReport(); // Refresh data
    } catch (error) {
      console.error('Error applying optimizations:', error);
    } finally {
      setApplyingOptimizations(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      default: return 'text-green-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Analyse des données de production...</span>
      </div>
    );
  }

  if (!report) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Impossible de charger le rapport d'analyse. Veuillez réessayer.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics de Production</h2>
          <p className="text-gray-600">
            Analyse basée sur {report.period} • 
            Dernière mise à jour: {lastUpdated?.toLocaleString('fr-FR')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadAnalyticsReport} variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          {report.recommendations.some(r => r.riskLevel === 'low') && (
            <Button 
              onClick={applyOptimizations}
              disabled={applyingOptimizations}
              className="bg-green-600 hover:bg-green-700"
            >
              <Zap className="h-4 w-4 mr-2" />
              {applyingOptimizations ? 'Application...' : 'Appliquer Optimisations'}
            </Button>
          )}
        </div>
      </div>

      {/* Upgrade Recommendation */}
      {report.upgradeRecommendation?.recommended && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Upgrade Vercel Pro Recommandé</strong>
            <p className="mt-1">{report.upgradeRecommendation.reason}</p>
            <p className="mt-1"><strong>ROI:</strong> {report.upgradeRecommendation.roi}</p>
            <p className="mt-1"><strong>Timeline:</strong> {report.upgradeRecommendation.timeline}</p>
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Usage Vercel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {report.metrics.vercelUsage.percentageOfLimit.toFixed(1)}%
            </div>
            <div className="flex items-center text-sm text-gray-600">
              {getTrendIcon(report.trends.usageTrend)}
              <span className="ml-1">
                {report.metrics.vercelUsage.projectedMonthly.toLocaleString()} inv/mois
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(report.metrics.performance.auditDuration / 1000).toFixed(1)}s
            </div>
            <div className="flex items-center text-sm text-gray-600">
              {getTrendIcon(report.trends.performanceTrend)}
              <span className="ml-1">
                {report.metrics.performance.linksProcessed} liens
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Disponibilité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {report.metrics.systemHealth.availability.toFixed(2)}%
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="ml-1">
                {report.metrics.systemHealth.fallbackActivations} fallbacks
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taux d'erreur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {report.metrics.performance.errorRate.toFixed(1)}%
            </div>
            <div className="flex items-center text-sm text-gray-600">
              {getTrendIcon(report.trends.errorTrend)}
              <span className="ml-1">
                Cache: {report.metrics.performance.cacheHitRate.toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Métriques Détaillées
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Mémoire moyenne</div>
                <div className="text-lg font-semibold">
                  {report.metrics.performance.memoryUsage.toFixed(0)}MB
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Temps réponse</div>
                <div className="text-lg font-semibold">
                  {(report.metrics.performance.averageResponseTime / 1000).toFixed(1)}s
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Liens cassés détectés</div>
                <div className="text-lg font-semibold">
                  {report.metrics.business.brokenLinksDetected}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Corrections auto</div>
                <div className="text-lg font-semibold">
                  {report.metrics.business.autoCorrections}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Objectifs vs Réalité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Usage Vercel (&lt;80%)</span>
              <Badge variant={report.metrics.vercelUsage.percentageOfLimit < 80 ? "default" : "destructive"}>
                {report.metrics.vercelUsage.percentageOfLimit.toFixed(1)}%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Audit (&lt;3min)</span>
              <Badge variant={report.metrics.performance.auditDuration < 180000 ? "default" : "destructive"}>
                {(report.metrics.performance.auditDuration / 1000).toFixed(1)}s
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Mémoire (&lt;512MB)</span>
              <Badge variant={report.metrics.performance.memoryUsage < 512 ? "default" : "destructive"}>
                {report.metrics.performance.memoryUsage.toFixed(0)}MB
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Disponibilité (&gt;99.5%)</span>
              <Badge variant={report.metrics.systemHealth.availability > 99.5 ? "default" : "destructive"}>
                {report.metrics.systemHealth.availability.toFixed(2)}%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Faux positifs (&lt;5%)</span>
              <Badge variant={report.metrics.systemHealth.falsePositiveRate < 5 ? "default" : "destructive"}>
                {report.metrics.systemHealth.falsePositiveRate.toFixed(1)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Recommandations d'Optimisation ({report.recommendations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {report.recommendations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p>Aucune optimisation recommandée. Le système fonctionne de manière optimale !</p>
            </div>
          ) : (
            <div className="space-y-4">
              {report.recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(rec.priority)} mr-3`}></div>
                      <h4 className="font-semibold">{rec.title}</h4>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {rec.category}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getRiskColor(rec.riskLevel)}`}>
                        Risque {rec.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Impact:</strong> {rec.impact}
                    </div>
                    <div>
                      <strong>Amélioration estimée:</strong> {rec.estimatedImprovement}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <strong>Implémentation:</strong> {rec.implementation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}