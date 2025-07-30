// Tableau de bord analytics pour les techniques de négociation
// Métriques de performance, conversions et parcours utilisateur

import { NegotiationTechnique } from '@/types/negotiation-technique';
import { UserJourney, ConversionGoal, CONVERSION_GOALS } from './analytics-tracking';

export interface TechniqueDashboardData {
  techniqueId: string;
  techniqueName: string;
  period: {
    start: Date;
    end: Date;
  };
  metrics: {
    pageViews: number;
    uniqueVisitors: number;
    averageTimeOnPage: number;
    bounceRate: number;
    scrollDepth: {
      average: number;
      distribution: Record<string, number>; // 25%, 50%, 75%, 100%
    };
    sectionsRead: {
      hero: number;
      expertise: number;
      practicalGuide: number;
      caseStudies: number;
      commonMistakes: number;
      interactiveTools: number;
      conversionCTAs: number;
      relatedTechniques: number;
    };
    conversions: {
      total: number;
      byType: Record<string, number>;
      rate: number;
      value: number;
    };
    userJourneys: UserJourney[];
    topExitPoints: Array<{
      section: string;
      percentage: number;
    }>;
    deviceBreakdown: {
      desktop: number;
      mobile: number;
      tablet: number;
    };
    trafficSources: {
      organic: number;
      direct: number;
      referral: number;
      social: number;
      email: number;
    };
  };
  comparisons: {
    previousPeriod: {
      pageViews: number;
      conversions: number;
      averageTime: number;
      changePercentage: {
        pageViews: number;
        conversions: number;
        averageTime: number;
      };
    };
    otherTechniques: Array<{
      techniqueId: string;
      techniqueName: string;
      pageViews: number;
      conversionRate: number;
      averageTime: number;
    }>;
  };
  recommendations: Array<{
    type: 'performance' | 'content' | 'conversion' | 'ux';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    expectedImpact: string;
    actionItems: string[];
  }>;
}

export interface GlobalDashboardData {
  period: {
    start: Date;
    end: Date;
  };
  overview: {
    totalPageViews: number;
    totalConversions: number;
    averageConversionRate: number;
    totalRevenue: number;
    topPerformingTechniques: Array<{
      techniqueId: string;
      techniqueName: string;
      pageViews: number;
      conversionRate: number;
      revenue: number;
    }>;
  };
  trends: {
    daily: Array<{
      date: string;
      pageViews: number;
      conversions: number;
      revenue: number;
    }>;
    weekly: Array<{
      week: string;
      pageViews: number;
      conversions: number;
      revenue: number;
    }>;
    monthly: Array<{
      month: string;
      pageViews: number;
      conversions: number;
      revenue: number;
    }>;
  };
  funnelAnalysis: {
    stages: Array<{
      name: string;
      visitors: number;
      conversionRate: number;
      dropOffRate: number;
    }>;
  };
  cohortAnalysis: {
    cohorts: Array<{
      period: string;
      size: number;
      retention: Record<string, number>; // week1, week2, etc.
    }>;
  };
}

/**
 * Gestionnaire du tableau de bord analytics
 */
export class AnalyticsDashboard {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Récupère les données du tableau de bord pour une technique
   */
  async getTechniqueDashboard(
    techniqueId: string,
    startDate: Date,
    endDate: Date
  ): Promise<TechniqueDashboardData> {
    try {
      // En production, ceci ferait un appel API réel
      // const response = await fetch(`${this.baseUrl}/api/analytics/technique/${techniqueId}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${this.apiKey}`
      //   },
      //   body: JSON.stringify({ startDate, endDate })
      // });
      // return response.json();

      // Pour le développement, retourner des données simulées
      return this.generateMockTechniqueData(techniqueId, startDate, endDate);
    } catch (error) {
      console.error('Error fetching technique dashboard:', error);
      throw error;
    }
  }

  /**
   * Récupère les données du tableau de bord global
   */
  async getGlobalDashboard(
    startDate: Date,
    endDate: Date
  ): Promise<GlobalDashboardData> {
    try {
      // En production, ceci ferait un appel API réel
      return this.generateMockGlobalData(startDate, endDate);
    } catch (error) {
      console.error('Error fetching global dashboard:', error);
      throw error;
    }
  }

  /**
   * Analyse les parcours utilisateur pour une technique
   */
  async analyzeUserJourneys(techniqueId: string): Promise<{
    commonPaths: Array<{
      path: string[];
      frequency: number;
      conversionRate: number;
      averageTime: number;
    }>;
    dropOffPoints: Array<{
      section: string;
      dropOffRate: number;
      reasons: string[];
    }>;
    conversionPaths: Array<{
      path: string[];
      conversionType: string;
      frequency: number;
      averageTime: number;
    }>;
  }> {
    // Analyser les données de localStorage pour les parcours
    const journeys = this.getStoredJourneys(techniqueId);
    
    return {
      commonPaths: this.analyzeCommonPaths(journeys),
      dropOffPoints: this.analyzeDropOffPoints(journeys),
      conversionPaths: this.analyzeConversionPaths(journeys)
    };
  }

  /**
   * Génère des recommandations d'optimisation
   */
  async generateOptimizationRecommendations(
    techniqueId: string,
    dashboardData: TechniqueDashboardData
  ): Promise<Array<{
    type: 'performance' | 'content' | 'conversion' | 'ux';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    expectedImpact: string;
    actionItems: string[];
  }>> {
    const recommendations = [];
    const { metrics } = dashboardData;

    // Recommandations basées sur le taux de rebond
    if (metrics.bounceRate > 70) {
      recommendations.push({
        type: 'content' as const,
        priority: 'high' as const,
        title: 'Réduire le taux de rebond élevé',
        description: `Le taux de rebond de ${metrics.bounceRate}% est supérieur à la moyenne. Les visiteurs quittent rapidement la page.`,
        expectedImpact: 'Augmentation de 15-25% du temps passé sur la page',
        actionItems: [
          'Améliorer l\'accroche de la section hero',
          'Ajouter plus de contenu visuel engageant',
          'Optimiser la vitesse de chargement',
          'Améliorer la navigation interne'
        ]
      });
    }

    // Recommandations basées sur la profondeur de scroll
    if (metrics.scrollDepth.average < 50) {
      recommendations.push({
        type: 'ux' as const,
        priority: 'high' as const,
        title: 'Améliorer l\'engagement du contenu',
        description: `La profondeur de scroll moyenne de ${metrics.scrollDepth.average}% indique que les visiteurs ne lisent pas tout le contenu.`,
        expectedImpact: 'Augmentation de 20-30% de la profondeur de scroll',
        actionItems: [
          'Restructurer le contenu avec plus de sous-titres',
          'Ajouter des éléments interactifs',
          'Améliorer la lisibilité du texte',
          'Créer un sommaire cliquable'
        ]
      });
    }

    // Recommandations basées sur les conversions
    if (metrics.conversions.rate < 5) {
      recommendations.push({
        type: 'conversion' as const,
        priority: 'high' as const,
        title: 'Optimiser le taux de conversion',
        description: `Le taux de conversion de ${metrics.conversions.rate}% est en dessous des objectifs.`,
        expectedImpact: 'Augmentation de 30-50% du taux de conversion',
        actionItems: [
          'Repositionner les CTAs principaux',
          'Améliorer les propositions de valeur',
          'Simplifier les formulaires de téléchargement',
          'Ajouter des preuves sociales et témoignages'
        ]
      });
    }

    // Recommandations basées sur le temps passé
    if (metrics.averageTimeOnPage < 180) { // moins de 3 minutes
      recommendations.push({
        type: 'content' as const,
        priority: 'medium' as const,
        title: 'Augmenter le temps d\'engagement',
        description: `Le temps moyen de ${Math.round(metrics.averageTimeOnPage / 60)} minutes est insuffisant pour une lecture complète.`,
        expectedImpact: 'Augmentation de 25-40% du temps passé',
        actionItems: [
          'Ajouter du contenu interactif (quiz, calculateurs)',
          'Intégrer des vidéos explicatives courtes',
          'Créer des liens vers du contenu complémentaire',
          'Améliorer la structure narrative du contenu'
        ]
      });
    }

    // Recommandations basées sur les sections les moins lues
    const sectionsReadData = Object.entries(metrics.sectionsRead);
    const leastReadSection = sectionsReadData.reduce((min, current) => 
      current[1] < min[1] ? current : min
    );

    if (leastReadSection[1] < metrics.pageViews * 0.3) {
      recommendations.push({
        type: 'ux' as const,
        priority: 'medium' as const,
        title: `Optimiser la section "${leastReadSection[0]}"`,
        description: `La section "${leastReadSection[0]}" n'est lue que par ${Math.round((leastReadSection[1] / metrics.pageViews) * 100)}% des visiteurs.`,
        expectedImpact: 'Augmentation de 15-25% de la lecture de cette section',
        actionItems: [
          'Repositionner la section plus haut dans la page',
          'Améliorer le titre et l\'introduction de la section',
          'Ajouter des éléments visuels attractifs',
          'Créer des liens internes vers cette section'
        ]
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * Exporte les données du tableau de bord
   */
  async exportDashboardData(
    techniqueId: string,
    format: 'csv' | 'json' | 'pdf',
    startDate: Date,
    endDate: Date
  ): Promise<Blob> {
    const data = await this.getTechniqueDashboard(techniqueId, startDate, endDate);
    
    switch (format) {
      case 'csv':
        return this.exportToCSV(data);
      case 'json':
        return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      case 'pdf':
        return this.exportToPDF(data);
      default:
        throw new Error(`Format d'export non supporté: ${format}`);
    }
  }

  /**
   * Configure les alertes automatiques
   */
  async setupAlerts(techniqueId: string, alerts: Array<{
    metric: string;
    condition: 'above' | 'below';
    threshold: number;
    email: string;
  }>): Promise<void> {
    // En production, ceci configurerait des alertes réelles
    console.log('Alerts configured for technique:', techniqueId, alerts);
  }

  // Méthodes privées pour la génération de données simulées

  private generateMockTechniqueData(
    techniqueId: string,
    startDate: Date,
    endDate: Date
  ): TechniqueDashboardData {
    const techniqueNames: Record<string, string> = {
      'effet-miroir': 'L\'effet miroir',
      'silence-strategique': 'Le silence stratégique',
      'negociation-raisonnee': 'La négociation raisonnée',
      'ancrage-tactique': 'L\'ancrage tactique',
      'oui-progressif': 'La technique du Oui progressif',
      'recadrage-valeur': 'Le recadrage de valeur',
      'concession-calculee': 'La concession calculée'
    };

    const baseViews = Math.floor(Math.random() * 1000) + 500;
    const conversionRate = Math.random() * 0.08 + 0.02; // 2-10%
    const conversions = Math.floor(baseViews * conversionRate);

    return {
      techniqueId,
      techniqueName: techniqueNames[techniqueId] || techniqueId,
      period: { start: startDate, end: endDate },
      metrics: {
        pageViews: baseViews,
        uniqueVisitors: Math.floor(baseViews * 0.8),
        averageTimeOnPage: Math.floor(Math.random() * 300) + 120, // 2-7 minutes
        bounceRate: Math.floor(Math.random() * 40) + 40, // 40-80%
        scrollDepth: {
          average: Math.floor(Math.random() * 40) + 40, // 40-80%
          distribution: {
            '25%': Math.floor(baseViews * 0.8),
            '50%': Math.floor(baseViews * 0.6),
            '75%': Math.floor(baseViews * 0.4),
            '100%': Math.floor(baseViews * 0.2)
          }
        },
        sectionsRead: {
          hero: Math.floor(baseViews * 0.95),
          expertise: Math.floor(baseViews * 0.75),
          practicalGuide: Math.floor(baseViews * 0.65),
          caseStudies: Math.floor(baseViews * 0.55),
          commonMistakes: Math.floor(baseViews * 0.45),
          interactiveTools: Math.floor(baseViews * 0.35),
          conversionCTAs: Math.floor(baseViews * 0.25),
          relatedTechniques: Math.floor(baseViews * 0.20)
        },
        conversions: {
          total: conversions,
          byType: {
            'resource_download': Math.floor(conversions * 0.6),
            'formation_cta': Math.floor(conversions * 0.25),
            'diagnostic_cta': Math.floor(conversions * 0.15)
          },
          rate: conversionRate * 100,
          value: conversions * 25 // 25€ par conversion moyenne
        },
        userJourneys: [],
        topExitPoints: [
          { section: 'hero', percentage: 35 },
          { section: 'practical-guide', percentage: 25 },
          { section: 'case-studies', percentage: 20 },
          { section: 'common-mistakes', percentage: 20 }
        ],
        deviceBreakdown: {
          desktop: Math.floor(Math.random() * 30) + 50, // 50-80%
          mobile: Math.floor(Math.random() * 30) + 15,  // 15-45%
          tablet: Math.floor(Math.random() * 10) + 5    // 5-15%
        },
        trafficSources: {
          organic: Math.floor(Math.random() * 30) + 40,  // 40-70%
          direct: Math.floor(Math.random() * 20) + 15,   // 15-35%
          referral: Math.floor(Math.random() * 15) + 10, // 10-25%
          social: Math.floor(Math.random() * 10) + 5,    // 5-15%
          email: Math.floor(Math.random() * 10) + 5      // 5-15%
        }
      },
      comparisons: {
        previousPeriod: {
          pageViews: Math.floor(baseViews * (0.8 + Math.random() * 0.4)),
          conversions: Math.floor(conversions * (0.8 + Math.random() * 0.4)),
          averageTime: Math.floor((Math.random() * 300 + 120) * (0.8 + Math.random() * 0.4)),
          changePercentage: {
            pageViews: Math.floor((Math.random() - 0.5) * 40), // -20% à +20%
            conversions: Math.floor((Math.random() - 0.5) * 60), // -30% à +30%
            averageTime: Math.floor((Math.random() - 0.5) * 30) // -15% à +15%
          }
        },
        otherTechniques: [
          {
            techniqueId: 'effet-miroir',
            techniqueName: 'L\'effet miroir',
            pageViews: Math.floor(Math.random() * 800) + 400,
            conversionRate: Math.random() * 0.06 + 0.03,
            averageTime: Math.floor(Math.random() * 200) + 150
          },
          {
            techniqueId: 'silence-strategique',
            techniqueName: 'Le silence stratégique',
            pageViews: Math.floor(Math.random() * 600) + 300,
            conversionRate: Math.random() * 0.05 + 0.025,
            averageTime: Math.floor(Math.random() * 180) + 120
          }
        ]
      },
      recommendations: []
    };
  }

  private generateMockGlobalData(startDate: Date, endDate: Date): GlobalDashboardData {
    const totalViews = Math.floor(Math.random() * 5000) + 3000;
    const totalConversions = Math.floor(totalViews * 0.05);

    return {
      period: { start: startDate, end: endDate },
      overview: {
        totalPageViews: totalViews,
        totalConversions,
        averageConversionRate: (totalConversions / totalViews) * 100,
        totalRevenue: totalConversions * 25,
        topPerformingTechniques: [
          {
            techniqueId: 'effet-miroir',
            techniqueName: 'L\'effet miroir',
            pageViews: Math.floor(totalViews * 0.25),
            conversionRate: 6.5,
            revenue: Math.floor(totalConversions * 0.3) * 25
          },
          {
            techniqueId: 'negociation-raisonnee',
            techniqueName: 'La négociation raisonnée',
            pageViews: Math.floor(totalViews * 0.20),
            conversionRate: 5.8,
            revenue: Math.floor(totalConversions * 0.25) * 25
          }
        ]
      },
      trends: {
        daily: this.generateTrendData('daily', 30),
        weekly: this.generateTrendData('weekly', 12),
        monthly: this.generateTrendData('monthly', 6)
      },
      funnelAnalysis: {
        stages: [
          { name: 'Page View', visitors: totalViews, conversionRate: 100, dropOffRate: 0 },
          { name: 'Scroll 50%', visitors: Math.floor(totalViews * 0.6), conversionRate: 60, dropOffRate: 40 },
          { name: 'Section Read', visitors: Math.floor(totalViews * 0.4), conversionRate: 40, dropOffRate: 20 },
          { name: 'CTA Click', visitors: Math.floor(totalViews * 0.15), conversionRate: 15, dropOffRate: 25 },
          { name: 'Conversion', visitors: totalConversions, conversionRate: 5, dropOffRate: 10 }
        ]
      },
      cohortAnalysis: {
        cohorts: this.generateCohortData()
      }
    };
  }

  private generateTrendData(period: 'daily' | 'weekly' | 'monthly', count: number) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        [period === 'daily' ? 'date' : period === 'weekly' ? 'week' : 'month']: 
          period === 'daily' ? `2024-01-${String(i + 1).padStart(2, '0')}` :
          period === 'weekly' ? `2024-W${String(i + 1).padStart(2, '0')}` :
          `2024-${String(i + 1).padStart(2, '0')}`,
        pageViews: Math.floor(Math.random() * 200) + 100,
        conversions: Math.floor(Math.random() * 20) + 5,
        revenue: Math.floor((Math.random() * 20 + 5) * 25)
      });
    }
    return data;
  }

  private generateCohortData() {
    const cohorts = [];
    for (let i = 0; i < 6; i++) {
      cohorts.push({
        period: `2024-${String(i + 1).padStart(2, '0')}`,
        size: Math.floor(Math.random() * 100) + 50,
        retention: {
          week1: Math.floor(Math.random() * 30) + 60,
          week2: Math.floor(Math.random() * 25) + 40,
          week4: Math.floor(Math.random() * 20) + 25,
          week8: Math.floor(Math.random() * 15) + 15
        }
      });
    }
    return cohorts;
  }

  private getStoredJourneys(techniqueId: string): UserJourney[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const journeys = JSON.parse(localStorage.getItem('technique_journeys') || '[]');
      return journeys.filter((journey: UserJourney) => journey.technique_id === techniqueId);
    } catch {
      return [];
    }
  }

  private analyzeCommonPaths(journeys: UserJourney[]) {
    // Analyser les chemins communs dans les parcours
    const pathCounts: Record<string, { count: number; conversions: number; totalTime: number }> = {};
    
    journeys.forEach(journey => {
      const path = journey.events.map(e => e.event_type).join(' -> ');
      if (!pathCounts[path]) {
        pathCounts[path] = { count: 0, conversions: 0, totalTime: 0 };
      }
      pathCounts[path].count++;
      pathCounts[path].totalTime += journey.total_time;
      if (journey.conversion_achieved) {
        pathCounts[path].conversions++;
      }
    });

    return Object.entries(pathCounts)
      .map(([path, data]) => ({
        path: path.split(' -> '),
        frequency: data.count,
        conversionRate: (data.conversions / data.count) * 100,
        averageTime: data.totalTime / data.count
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10);
  }

  private analyzeDropOffPoints(journeys: UserJourney[]) {
    // Analyser les points d'abandon
    const dropOffs: Record<string, number> = {};
    
    journeys.forEach(journey => {
      if (journey.events.length > 0) {
        const lastEvent = journey.events[journey.events.length - 1];
        dropOffs[lastEvent.event_type] = (dropOffs[lastEvent.event_type] || 0) + 1;
      }
    });

    const total = journeys.length;
    return Object.entries(dropOffs)
      .map(([section, count]) => ({
        section,
        dropOffRate: (count / total) * 100,
        reasons: ['Contenu pas assez engageant', 'Temps de chargement', 'Navigation confuse']
      }))
      .sort((a, b) => b.dropOffRate - a.dropOffRate);
  }

  private analyzeConversionPaths(journeys: UserJourney[]) {
    // Analyser les chemins de conversion
    const conversionJourneys = journeys.filter(j => j.conversion_achieved);
    const conversionPaths: Record<string, { count: number; totalTime: number; type: string }> = {};
    
    conversionJourneys.forEach(journey => {
      const path = journey.events.map(e => e.event_type).join(' -> ');
      const conversionEvent = journey.events.find(e => 
        e.event_type === 'resource_download' || 
        e.event_type === 'cta_click'
      );
      const conversionType = conversionEvent?.event_type || 'unknown';
      
      if (!conversionPaths[path]) {
        conversionPaths[path] = { count: 0, totalTime: 0, type: conversionType };
      }
      conversionPaths[path].count++;
      conversionPaths[path].totalTime += journey.total_time;
    });

    return Object.entries(conversionPaths)
      .map(([path, data]) => ({
        path: path.split(' -> '),
        conversionType: data.type,
        frequency: data.count,
        averageTime: data.totalTime / data.count
      }))
      .sort((a, b) => b.frequency - a.frequency);
  }

  private exportToCSV(data: TechniqueDashboardData): Blob {
    const csvContent = [
      'Metric,Value',
      `Page Views,${data.metrics.pageViews}`,
      `Unique Visitors,${data.metrics.uniqueVisitors}`,
      `Average Time on Page,${data.metrics.averageTimeOnPage}`,
      `Bounce Rate,${data.metrics.bounceRate}%`,
      `Conversion Rate,${data.metrics.conversions.rate}%`,
      `Total Conversions,${data.metrics.conversions.total}`,
      `Revenue,${data.metrics.conversions.value}€`
    ].join('\n');

    return new Blob([csvContent], { type: 'text/csv' });
  }

  private exportToPDF(data: TechniqueDashboardData): Blob {
    // Simuler la génération PDF
    const pdfContent = `PDF Report for ${data.techniqueName}\n\nPage Views: ${data.metrics.pageViews}\nConversions: ${data.metrics.conversions.total}`;
    return new Blob([pdfContent], { type: 'application/pdf' });
  }
}

/**
 * Hook React pour utiliser le tableau de bord analytics
 */
export function useAnalyticsDashboard(baseUrl: string, apiKey?: string) {
  const dashboard = React.useMemo(() => new AnalyticsDashboard(baseUrl, apiKey), [baseUrl, apiKey]);
  
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchTechniqueData = React.useCallback(async (
    techniqueId: string,
    startDate: Date,
    endDate: Date
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await dashboard.getTechniqueDashboard(techniqueId, startDate, endDate);
      const recommendations = await dashboard.generateOptimizationRecommendations(techniqueId, data);
      
      return { ...data, recommendations };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dashboard]);

  const fetchGlobalData = React.useCallback(async (
    startDate: Date,
    endDate: Date
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      return await dashboard.getGlobalDashboard(startDate, endDate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dashboard]);

  return {
    dashboard,
    loading,
    error,
    fetchTechniqueData,
    fetchGlobalData
  };
}

// Import React pour le hook
import React from 'react';