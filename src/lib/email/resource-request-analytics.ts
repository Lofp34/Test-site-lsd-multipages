/**
 * Service d'analytics pour les demandes de ressources
 * 
 * Fournit des statistiques avancées et des insights sur les demandes de ressources
 */

import { createClient } from '@supabase/supabase-js';
import { ResourceType, SourceType, PriorityCalculator } from './priority-calculator';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export interface ResourceRequestAnalytics {
  overview: {
    totalRequests: number;
    uniqueResources: number;
    uniqueUsers: number;
    averageRequestsPerResource: number;
    completionRate: number;
  };
  trends: {
    dailyRequests: Array<{ date: string; count: number }>;
    weeklyGrowth: number;
    monthlyGrowth: number;
  };
  topResources: Array<{
    url: string;
    count: number;
    type: ResourceType;
    averagePriority: number;
    completionStatus: 'pending' | 'in_progress' | 'completed' | 'rejected';
  }>;
  userInsights: {
    topRequesters: Array<{ email: string; count: number }>;
    domainAnalysis: Array<{ domain: string; count: number }>;
    userTypes: Record<string, number>;
  };
  priorityDistribution: Record<number, number>;
  sourceAnalysis: Array<{
    source: SourceType;
    count: number;
    conversionRate: number;
  }>;
  timeAnalysis: {
    averageResponseTime: number; // en heures
    peakRequestHours: Array<{ hour: number; count: number }>;
    peakRequestDays: Array<{ day: string; count: number }>;
  };
}

export interface ResourceRequestTrend {
  period: string;
  requests: number;
  completions: number;
  averagePriority: number;
  topResource: string;
}

/**
 * Service principal d'analytics
 */
export class ResourceRequestAnalyticsService {
  private supabase;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  /**
   * Obtenir les analytics complètes
   */
  async getAnalytics(dateRange?: { start: Date; end: Date }): Promise<ResourceRequestAnalytics> {
    try {
      const [
        overview,
        trends,
        topResources,
        userInsights,
        priorityDistribution,
        sourceAnalysis,
        timeAnalysis
      ] = await Promise.all([
        this.getOverview(dateRange),
        this.getTrends(dateRange),
        this.getTopResources(dateRange),
        this.getUserInsights(dateRange),
        this.getPriorityDistribution(dateRange),
        this.getSourceAnalysis(dateRange),
        this.getTimeAnalysis(dateRange)
      ]);

      return {
        overview,
        trends,
        topResources,
        userInsights,
        priorityDistribution,
        sourceAnalysis,
        timeAnalysis
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des analytics:', error);
      throw error;
    }
  }

  /**
   * Vue d'ensemble générale
   */
  private async getOverview(dateRange?: { start: Date; end: Date }) {
    let query = this.supabase.from('resource_requests').select('*');
    
    if (dateRange) {
      query = query
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());
    }

    const { data: requests, error } = await query;
    if (error) throw error;

    const uniqueResources = new Set(requests?.map(r => r.requested_url) || []).size;
    const uniqueUsers = new Set(requests?.map(r => r.user_email) || []).size;
    const completedRequests = requests?.filter(r => r.status === 'completed').length || 0;

    return {
      totalRequests: requests?.length || 0,
      uniqueResources,
      uniqueUsers,
      averageRequestsPerResource: uniqueResources > 0 ? (requests?.length || 0) / uniqueResources : 0,
      completionRate: requests?.length ? (completedRequests / requests.length) * 100 : 0
    };
  }

  /**
   * Tendances temporelles
   */
  private async getTrends(dateRange?: { start: Date; end: Date }) {
    const endDate = dateRange?.end || new Date();
    const startDate = dateRange?.start || new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 jours

    const { data: requests, error } = await this.supabase
      .from('resource_requests')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Grouper par jour
    const dailyRequests: Record<string, number> = {};
    requests?.forEach(request => {
      const date = new Date(request.created_at).toISOString().split('T')[0];
      dailyRequests[date] = (dailyRequests[date] || 0) + 1;
    });

    const dailyRequestsArray = Object.entries(dailyRequests).map(([date, count]) => ({
      date,
      count
    }));

    // Calculer la croissance
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const thisWeekRequests = requests?.filter(r => new Date(r.created_at) >= oneWeekAgo).length || 0;
    const lastWeekRequests = requests?.filter(r => 
      new Date(r.created_at) >= twoWeeksAgo && new Date(r.created_at) < oneWeekAgo
    ).length || 0;

    const thisMonthRequests = requests?.filter(r => new Date(r.created_at) >= oneMonthAgo).length || 0;
    const lastMonthRequests = requests?.filter(r => 
      new Date(r.created_at) >= twoMonthsAgo && new Date(r.created_at) < oneMonthAgo
    ).length || 0;

    const weeklyGrowth = lastWeekRequests > 0 
      ? ((thisWeekRequests - lastWeekRequests) / lastWeekRequests) * 100 
      : 0;

    const monthlyGrowth = lastMonthRequests > 0 
      ? ((thisMonthRequests - lastMonthRequests) / lastMonthRequests) * 100 
      : 0;

    return {
      dailyRequests: dailyRequestsArray,
      weeklyGrowth,
      monthlyGrowth
    };
  }

  /**
   * Ressources les plus demandées
   */
  private async getTopResources(dateRange?: { start: Date; end: Date }, limit: number = 10) {
    let query = this.supabase.from('resource_requests').select('*');
    
    if (dateRange) {
      query = query
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());
    }

    const { data: requests, error } = await query;
    if (error) throw error;

    // Grouper par ressource
    const resourceStats: Record<string, {
      count: number;
      priorities: number[];
      statuses: string[];
    }> = {};

    requests?.forEach(request => {
      if (!resourceStats[request.requested_url]) {
        resourceStats[request.requested_url] = {
          count: 0,
          priorities: [],
          statuses: []
        };
      }
      resourceStats[request.requested_url].count++;
      resourceStats[request.requested_url].priorities.push(request.priority || 1);
      resourceStats[request.requested_url].statuses.push(request.status);
    });

    // Convertir en array et trier
    const topResources = Object.entries(resourceStats)
      .map(([url, stats]) => {
        const averagePriority = stats.priorities.reduce((a, b) => a + b, 0) / stats.priorities.length;
        const completedCount = stats.statuses.filter(s => s === 'completed').length;
        const inProgressCount = stats.statuses.filter(s => s === 'in_progress').length;
        const pendingCount = stats.statuses.filter(s => s === 'pending').length;
        
        let completionStatus: 'pending' | 'in_progress' | 'completed' | 'rejected' = 'pending';
        if (completedCount > 0) completionStatus = 'completed';
        else if (inProgressCount > 0) completionStatus = 'in_progress';

        return {
          url,
          count: stats.count,
          type: PriorityCalculator.detectResourceType(url),
          averagePriority,
          completionStatus
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return topResources;
  }

  /**
   * Insights utilisateurs
   */
  private async getUserInsights(dateRange?: { start: Date; end: Date }) {
    let query = this.supabase.from('resource_requests').select('user_email');
    
    if (dateRange) {
      query = query
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());
    }

    const { data: requests, error } = await query;
    if (error) throw error;

    // Top demandeurs
    const userCounts: Record<string, number> = {};
    const domainCounts: Record<string, number> = {};

    requests?.forEach(request => {
      const email = request.user_email;
      userCounts[email] = (userCounts[email] || 0) + 1;
      
      const domain = email.split('@')[1];
      if (domain) {
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
      }
    });

    const topRequesters = Object.entries(userCounts)
      .map(([email, count]) => ({ email, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const domainAnalysis = Object.entries(domainCounts)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Analyse des types d'utilisateurs (basée sur le domaine)
    const userTypes: Record<string, number> = {
      'Entreprise': 0,
      'Gmail/Personnel': 0,
      'Outlook/Hotmail': 0,
      'Autres': 0
    };

    Object.entries(domainCounts).forEach(([domain, count]) => {
      if (domain.includes('gmail')) {
        userTypes['Gmail/Personnel'] += count;
      } else if (domain.includes('outlook') || domain.includes('hotmail')) {
        userTypes['Outlook/Hotmail'] += count;
      } else if (domain.includes('.com') || domain.includes('.fr') || domain.includes('.org')) {
        userTypes['Entreprise'] += count;
      } else {
        userTypes['Autres'] += count;
      }
    });

    return {
      topRequesters,
      domainAnalysis,
      userTypes
    };
  }

  /**
   * Distribution des priorités
   */
  private async getPriorityDistribution(dateRange?: { start: Date; end: Date }) {
    let query = this.supabase.from('resource_requests').select('priority');
    
    if (dateRange) {
      query = query
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());
    }

    const { data: requests, error } = await query;
    if (error) throw error;

    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    requests?.forEach(request => {
      const priority = request.priority || 1;
      distribution[priority] = (distribution[priority] || 0) + 1;
    });

    return distribution;
  }

  /**
   * Analyse des sources
   */
  private async getSourceAnalysis(dateRange?: { start: Date; end: Date }) {
    let query = this.supabase.from('resource_requests').select('source_url, status');
    
    if (dateRange) {
      query = query
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());
    }

    const { data: requests, error } = await query;
    if (error) throw error;

    const sourceStats: Record<SourceType, { total: number; completed: number }> = {
      [SourceType.HOMEPAGE]: { total: 0, completed: 0 },
      [SourceType.RESOURCE_PAGE]: { total: 0, completed: 0 },
      [SourceType.BLOG_POST]: { total: 0, completed: 0 },
      [SourceType.FORMATION_PAGE]: { total: 0, completed: 0 },
      [SourceType.CONTACT_PAGE]: { total: 0, completed: 0 },
      [SourceType.OTHER]: { total: 0, completed: 0 }
    };

    requests?.forEach(request => {
      const sourceType = PriorityCalculator.detectSourceType(request.source_url);
      sourceStats[sourceType].total++;
      if (request.status === 'completed') {
        sourceStats[sourceType].completed++;
      }
    });

    return Object.entries(sourceStats).map(([source, stats]) => ({
      source: source as SourceType,
      count: stats.total,
      conversionRate: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0
    }));
  }

  /**
   * Analyse temporelle
   */
  private async getTimeAnalysis(dateRange?: { start: Date; end: Date }) {
    let query = this.supabase.from('resource_requests').select('created_at, updated_at, status');
    
    if (dateRange) {
      query = query
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());
    }

    const { data: requests, error } = await query;
    if (error) throw error;

    // Temps de réponse moyen
    const completedRequests = requests?.filter(r => r.status === 'completed') || [];
    const responseTimes = completedRequests.map(request => {
      const created = new Date(request.created_at);
      const updated = new Date(request.updated_at);
      return (updated.getTime() - created.getTime()) / (1000 * 60 * 60); // en heures
    });

    const averageResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
      : 0;

    // Heures de pointe
    const hourCounts: Record<number, number> = {};
    const dayCounts: Record<string, number> = {};

    requests?.forEach(request => {
      const date = new Date(request.created_at);
      const hour = date.getHours();
      const day = date.toLocaleDateString('fr-FR', { weekday: 'long' });

      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });

    const peakRequestHours = Object.entries(hourCounts)
      .map(([hour, count]) => ({ hour: parseInt(hour), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const peakRequestDays = Object.entries(dayCounts)
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => b.count - a.count);

    return {
      averageResponseTime,
      peakRequestHours,
      peakRequestDays
    };
  }

  /**
   * Obtenir les tendances par période
   */
  async getTrendsByPeriod(period: 'week' | 'month' | 'quarter'): Promise<ResourceRequestTrend[]> {
    const now = new Date();
    const periods: Date[] = [];

    // Générer les périodes
    for (let i = 0; i < 12; i++) {
      const date = new Date(now);
      if (period === 'week') {
        date.setDate(date.getDate() - (i * 7));
      } else if (period === 'month') {
        date.setMonth(date.getMonth() - i);
      } else {
        date.setMonth(date.getMonth() - (i * 3));
      }
      periods.push(date);
    }

    const trends: ResourceRequestTrend[] = [];

    for (const periodStart of periods) {
      const periodEnd = new Date(periodStart);
      if (period === 'week') {
        periodEnd.setDate(periodEnd.getDate() + 7);
      } else if (period === 'month') {
        periodEnd.setMonth(periodEnd.getMonth() + 1);
      } else {
        periodEnd.setMonth(periodEnd.getMonth() + 3);
      }

      const { data: requests } = await this.supabase
        .from('resource_requests')
        .select('*')
        .gte('created_at', periodStart.toISOString())
        .lt('created_at', periodEnd.toISOString());

      const completions = requests?.filter(r => r.status === 'completed').length || 0;
      const priorities = requests?.map(r => r.priority || 1) || [];
      const averagePriority = priorities.length > 0 
        ? priorities.reduce((a, b) => a + b, 0) / priorities.length 
        : 0;

      // Ressource la plus demandée
      const resourceCounts: Record<string, number> = {};
      requests?.forEach(r => {
        resourceCounts[r.requested_url] = (resourceCounts[r.requested_url] || 0) + 1;
      });
      const topResource = Object.entries(resourceCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

      trends.push({
        period: periodStart.toLocaleDateString('fr-FR'),
        requests: requests?.length || 0,
        completions,
        averagePriority,
        topResource
      });
    }

    return trends.reverse();
  }

  /**
   * Exporter les données en CSV
   */
  async exportToCSV(dateRange?: { start: Date; end: Date }): Promise<string> {
    let query = this.supabase.from('resource_requests').select('*');
    
    if (dateRange) {
      query = query
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());
    }

    const { data: requests, error } = await query;
    if (error) throw error;

    if (!requests || requests.length === 0) {
      return 'Aucune donnée à exporter';
    }

    // Headers CSV
    const headers = [
      'ID',
      'URL Ressource',
      'Email Utilisateur',
      'Message',
      'URL Source',
      'Statut',
      'Priorité',
      'Nombre Demandes',
      'Date Création',
      'Date Mise à Jour'
    ];

    // Données CSV
    const rows = requests.map(request => [
      request.id,
      request.requested_url,
      request.user_email,
      request.message || '',
      request.source_url,
      request.status,
      request.priority,
      request.request_count,
      new Date(request.created_at).toLocaleDateString('fr-FR'),
      new Date(request.updated_at).toLocaleDateString('fr-FR')
    ]);

    // Construire le CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
  }
}