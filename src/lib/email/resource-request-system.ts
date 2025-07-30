/**
 * Système de gestion des demandes de ressources
 * 
 * Ce système gère :
 * - L'enregistrement des demandes de ressources en base de données
 * - L'envoi d'emails via SendGrid
 * - Le comptage et la priorisation des demandes
 * - Les statistiques des ressources les plus demandées
 */

import { createClient } from '@supabase/supabase-js';
import { SendGridEmailService, ResourceRequestEmail } from './sendgrid-service';

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export interface ResourceRequest {
  id?: string;
  requestedUrl: string;
  userEmail: string;
  message?: string;
  sourceUrl: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  priority: number;
  requestCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResourceRequestConfig {
  adminEmail: string;
  maxRequestsPerDay: number;
  enableAutoResponse: boolean;
  highPriorityThreshold: number; // Nombre de demandes pour considérer comme priorité élevée
}

export interface ResourceRequestStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  rejected: number;
  mostRequested: Array<{ url: string; count: number }>;
}

/**
 * Système principal de gestion des demandes de ressources
 */
export class ResourceRequestSystem {
  private supabase;
  private emailService: SendGridEmailService;
  private config: ResourceRequestConfig;

  constructor(config?: Partial<ResourceRequestConfig>) {
    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
    this.emailService = new SendGridEmailService();
    
    this.config = {
      adminEmail: config?.adminEmail || process.env.ADMIN_EMAIL || 'ls@laurentserre.com',
      maxRequestsPerDay: config?.maxRequestsPerDay || parseInt(process.env.AUDIT_MAX_REQUESTS_PER_DAY || '100'),
      enableAutoResponse: config?.enableAutoResponse || process.env.AUDIT_ENABLE_AUTO_RESPONSE === 'true',
      highPriorityThreshold: config?.highPriorityThreshold || 3
    };
  }

  /**
   * Soumettre une nouvelle demande de ressource
   */
  async submitRequest(request: Omit<ResourceRequest, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'priority' | 'requestCount'>): Promise<string> {
    try {
      // Vérifier si l'utilisateur n'a pas dépassé la limite quotidienne
      const dailyCount = await this.getDailyRequestCount(request.userEmail);
      if (dailyCount >= this.config.maxRequestsPerDay) {
        throw new Error(`Limite quotidienne de ${this.config.maxRequestsPerDay} demandes atteinte`);
      }

      // Vérifier si cette ressource a déjà été demandée
      const existingRequestCount = await this.getRequestCount(request.requestedUrl);
      
      // Calculer la priorité basée sur le nombre de demandes et autres facteurs
      const priority = await this.calculatePriority(request.requestedUrl, request.sourceUrl, existingRequestCount + 1);

      // Insérer la demande en base de données
      const { data, error } = await this.supabase
        .from('resource_requests')
        .insert({
          requested_url: request.requestedUrl,
          user_email: request.userEmail,
          message: request.message,
          source_url: request.sourceUrl,
          status: 'pending',
          priority,
          request_count: 1
        })
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de l\'insertion de la demande:', error);
        throw new Error('Erreur lors de l\'enregistrement de la demande');
      }

      const requestId = data.id;

      // Mettre à jour le compteur global pour cette ressource
      await this.updateGlobalRequestCount(request.requestedUrl);

      // Envoyer l'email de notification à l'administrateur
      const emailData: ResourceRequestEmail = {
        userEmail: request.userEmail,
        resourceUrl: request.requestedUrl,
        sourceUrl: request.sourceUrl,
        message: request.message,
        requestCount: existingRequestCount + 1,
        isHighPriority: (existingRequestCount + 1) >= this.config.highPriorityThreshold
      };

      const emailSent = await this.emailService.sendResourceRequest(emailData);
      if (!emailSent) {
        console.warn('⚠️ Email de notification non envoyé, mais demande enregistrée');
      }

      // Envoyer la réponse automatique à l'utilisateur si activée
      if (this.config.enableAutoResponse) {
        const autoResponseSent = await this.emailService.sendAutoResponse(
          request.userEmail,
          request.requestedUrl
        );
        if (!autoResponseSent) {
          console.warn('⚠️ Réponse automatique non envoyée');
        }
      }

      console.log(`✅ Demande de ressource enregistrée avec l'ID: ${requestId}`);
      return requestId;

    } catch (error: any) {
      console.error('❌ Erreur lors de la soumission de la demande:', error.message);
      throw error;
    }
  }

  /**
   * Calculer la priorité basée sur le nombre de demandes et autres facteurs
   */
  private async calculatePriority(requestedUrl: string, sourceUrl: string, requestCount: number): Promise<number> {
    try {
      // Importer le calculateur de priorité
      const { PriorityCalculator } = await import('./priority-calculator');
      
      // Calculer les jours depuis la première demande
      const { data: firstRequest } = await this.supabase
        .from('resource_requests')
        .select('created_at')
        .eq('requested_url', requestedUrl)
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      const daysSinceFirstRequest = firstRequest 
        ? Math.floor((Date.now() - new Date(firstRequest.created_at).getTime()) / (1000 * 60 * 60 * 24))
        : 0;

      // Calculer la priorité avec le système avancé
      const priorityResult = PriorityCalculator.calculateAutoPriority(
        requestCount,
        daysSinceFirstRequest,
        requestedUrl,
        sourceUrl
      );

      return priorityResult.level;
    } catch (error) {
      console.error('Erreur lors du calcul de priorité:', error);
      // Fallback vers l'ancien système
      if (requestCount >= 10) return 5;
      if (requestCount >= 5) return 4;
      if (requestCount >= 3) return 3;
      if (requestCount >= 2) return 2;
      return 1;
    }
  }

  /**
   * Obtenir le nombre de demandes quotidiennes pour un utilisateur
   */
  async getDailyRequestCount(userEmail: string): Promise<number> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count, error } = await this.supabase
        .from('resource_requests')
        .select('*', { count: 'exact', head: true })
        .eq('user_email', userEmail)
        .gte('created_at', today.toISOString());

      if (error) {
        console.error('Erreur lors du comptage des demandes quotidiennes:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Erreur lors du comptage des demandes quotidiennes:', error);
      return 0;
    }
  }

  /**
   * Obtenir le nombre total de demandes pour une ressource
   */
  async getRequestCount(resourceUrl: string): Promise<number> {
    try {
      const { count, error } = await this.supabase
        .from('resource_requests')
        .select('*', { count: 'exact', head: true })
        .eq('requested_url', resourceUrl);

      if (error) {
        console.error('Erreur lors du comptage des demandes pour la ressource:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Erreur lors du comptage des demandes pour la ressource:', error);
      return 0;
    }
  }

  /**
   * Mettre à jour le compteur global pour une ressource
   */
  private async updateGlobalRequestCount(resourceUrl: string): Promise<void> {
    try {
      // Utiliser une fonction PostgreSQL pour incrémenter atomiquement
      const { error } = await this.supabase.rpc('increment_resource_request_count', {
        resource_url: resourceUrl
      });

      if (error) {
        console.error('Erreur lors de la mise à jour du compteur global:', error);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du compteur global:', error);
    }
  }

  /**
   * Obtenir les statistiques des demandes de ressources
   */
  async getRequestStats(): Promise<ResourceRequestStats> {
    try {
      // Compter par statut
      const { data: statusCounts, error: statusError } = await this.supabase
        .from('resource_requests')
        .select('status')
        .then(result => {
          if (result.error) throw result.error;
          
          const counts = {
            total: result.data.length,
            pending: 0,
            inProgress: 0,
            completed: 0,
            rejected: 0
          };

          result.data.forEach(row => {
            switch (row.status) {
              case 'pending': counts.pending++; break;
              case 'in_progress': counts.inProgress++; break;
              case 'completed': counts.completed++; break;
              case 'rejected': counts.rejected++; break;
            }
          });

          return { data: counts, error: null };
        });

      if (statusError) {
        throw statusError;
      }

      // Obtenir les ressources les plus demandées
      const { data: mostRequested, error: mostRequestedError } = await this.supabase
        .from('resource_requests')
        .select('requested_url')
        .then(result => {
          if (result.error) throw result.error;
          
          const urlCounts: Record<string, number> = {};
          result.data.forEach(row => {
            urlCounts[row.requested_url] = (urlCounts[row.requested_url] || 0) + 1;
          });

          const sorted = Object.entries(urlCounts)
            .map(([url, count]) => ({ url, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

          return { data: sorted, error: null };
        });

      if (mostRequestedError) {
        throw mostRequestedError;
      }

      return {
        ...statusCounts,
        mostRequested: mostRequested
      };

    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        rejected: 0,
        mostRequested: []
      };
    }
  }

  /**
   * Obtenir les ressources les plus demandées
   */
  async getMostRequestedResources(limit: number = 10): Promise<Array<{ url: string; count: number }>> {
    try {
      const { data, error } = await this.supabase
        .from('resource_requests')
        .select('requested_url')
        .then(result => {
          if (result.error) throw result.error;
          
          const urlCounts: Record<string, number> = {};
          result.data.forEach(row => {
            urlCounts[row.requested_url] = (urlCounts[row.requested_url] || 0) + 1;
          });

          const sorted = Object.entries(urlCounts)
            .map(([url, count]) => ({ url, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);

          return { data: sorted, error: null };
        });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des ressources les plus demandées:', error);
      return [];
    }
  }

  /**
   * Mettre à jour le statut d'une demande
   */
  async updateRequestStatus(requestId: string, status: ResourceRequest['status']): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('resource_requests')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        return false;
      }

      console.log(`✅ Statut de la demande ${requestId} mis à jour: ${status}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      return false;
    }
  }

  /**
   * Obtenir les demandes en attente
   */
  async getPendingRequests(limit: number = 50): Promise<ResourceRequest[]> {
    try {
      const { data, error } = await this.supabase
        .from('resource_requests')
        .select('*')
        .eq('status', 'pending')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) {
        throw error;
      }

      return data.map(row => ({
        id: row.id,
        requestedUrl: row.requested_url,
        userEmail: row.user_email,
        message: row.message,
        sourceUrl: row.source_url,
        status: row.status,
        priority: row.priority,
        requestCount: row.request_count,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at)
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes en attente:', error);
      return [];
    }
  }

  /**
   * Nettoyer les anciennes demandes (plus de 30 jours)
   */
  async cleanupOldRequests(): Promise<number> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await this.supabase
        .from('resource_requests')
        .delete()
        .lt('created_at', thirtyDaysAgo.toISOString())
        .select();

      if (error) {
        throw error;
      }

      const deletedCount = data?.length || 0;
      console.log(`🧹 ${deletedCount} anciennes demandes supprimées`);
      return deletedCount;
    } catch (error) {
      console.error('Erreur lors du nettoyage des anciennes demandes:', error);
      return 0;
    }
  }
}

/**
 * Instance singleton du système de demandes de ressources (lazy-loaded)
 */
let _resourceRequestSystemInstance: ResourceRequestSystem | null = null;

export function getResourceRequestSystem(): ResourceRequestSystem {
  if (!_resourceRequestSystemInstance) {
    _resourceRequestSystemInstance = new ResourceRequestSystem();
  }
  return _resourceRequestSystemInstance;
}