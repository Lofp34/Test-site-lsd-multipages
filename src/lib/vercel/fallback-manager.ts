/**
 * FallbackManager - Système de détection et bascule vers GitHub Actions
 * 
 * Ce module gère la détection automatique des pannes Vercel et la bascule
 * vers les workflows GitHub Actions de secours.
 */

import { VercelUsageMonitor } from './usage-monitor';

export interface FallbackStatus {
  isVercelDown: boolean;
  reason: string;
  lastCheck: Date;
  fallbackActive: boolean;
  nextCheck: Date;
}

export interface SystemHealth {
  vercelCrons: 'healthy' | 'warning' | 'unhealthy' | 'unknown';
  vercelApi: 'healthy' | 'unhealthy' | 'unknown';
  database: 'healthy' | 'slow' | 'unhealthy' | 'unknown';
  lastAuditTime: Date | null;
  timeSinceLastAudit: number; // en heures
}

export interface FallbackConfig {
  checkInterval: number; // en millisecondes
  maxAuditDelay: number; // en heures avant de considérer le système en panne
  retryAttempts: number;
  retryDelay: number; // en millisecondes
  healthCheckTimeout: number; // en millisecondes
}

export class FallbackManager {
  private config: FallbackConfig;
  private usageMonitor: VercelUsageMonitor | null = null;
  private lastStatus: FallbackStatus | null = null;

  constructor(config?: Partial<FallbackConfig>) {
    this.config = {
      checkInterval: 5 * 60 * 1000, // 5 minutes
      maxAuditDelay: 8, // 8 heures
      retryAttempts: 3,
      retryDelay: 30 * 1000, // 30 secondes
      healthCheckTimeout: 30 * 1000, // 30 secondes
      ...config
    };
    
    // Initialize VercelUsageMonitor only if environment is properly configured
    try {
      this.usageMonitor = new VercelUsageMonitor();
    } catch (error) {
      console.warn('⚠️ VercelUsageMonitor not available - fallback will work with limited monitoring');
      this.usageMonitor = null;
    }
  }

  /**
   * Vérifie l'état du système Vercel et détermine si le fallback est nécessaire
   */
  async checkSystemHealth(): Promise<SystemHealth> {
    console.log('🔍 Vérification de la santé du système Vercel...');

    const health: SystemHealth = {
      vercelCrons: 'unknown',
      vercelApi: 'unknown',
      database: 'unknown',
      lastAuditTime: null,
      timeSinceLastAudit: 0
    };

    try {
      // 1. Vérifier l'API Vercel
      health.vercelApi = await this.checkVercelApi();

      // 2. Vérifier l'état des cron jobs
      const auditStatus = await this.checkLastAuditTime();
      health.lastAuditTime = auditStatus.lastAuditTime;
      health.timeSinceLastAudit = auditStatus.timeSinceLastAudit;
      health.vercelCrons = auditStatus.status;

      // 3. Vérifier la base de données
      health.database = await this.checkDatabaseHealth();

      console.log('✅ Vérification de santé terminée:', health);
      return health;

    } catch (error) {
      console.error('❌ Erreur lors de la vérification de santé:', error);
      return health;
    }
  }

  /**
   * Détermine si le système Vercel est en panne et si le fallback doit être activé
   */
  async shouldActivateFallback(): Promise<FallbackStatus> {
    const health = await this.checkSystemHealth();
    const now = new Date();

    const isVercelDown = this.evaluateSystemStatus(health);
    const reason = this.generateFailureReason(health);

    const status: FallbackStatus = {
      isVercelDown,
      reason,
      lastCheck: now,
      fallbackActive: isVercelDown,
      nextCheck: new Date(now.getTime() + this.config.checkInterval)
    };

    this.lastStatus = status;

    if (isVercelDown) {
      console.warn('⚠️ Système Vercel détecté comme défaillant:', reason);
      await this.logFallbackActivation(status);
    } else {
      console.log('✅ Système Vercel opérationnel');
    }

    return status;
  }

  /**
   * Active le fallback en déclenchant les workflows GitHub Actions
   */
  async activateFallback(type: 'urgent' | 'maintenance' | 'health'): Promise<boolean> {
    console.log(`🔄 Activation du fallback GitHub Actions (${type})...`);

    try {
      const githubFallback = new GitHubActionsFallback();
      
      let result;
      switch (type) {
        case 'urgent':
          result = await githubFallback.triggerUrgentAlerts(true);
          break;
        case 'maintenance':
          result = await githubFallback.triggerEmergencyMaintenance();
          break;
        case 'health':
          result = await githubFallback.triggerHealthMonitoring(true);
          break;
        default:
          throw new Error(`Type de fallback non supporté: ${type}`);
      }

      if (result.success && result.runId) {
        console.log(`✅ Fallback ${type} activé - Run ID: ${result.runId}`);
        console.log(`🔗 URL: ${result.workflowUrl}`);
        
        // Enregistrer l'activation du fallback avec l'ID du run
        await this.logFallbackActivation({
          isVercelDown: true,
          reason: `Fallback ${type} activé`,
          lastCheck: new Date(),
          fallbackActive: true,
          nextCheck: new Date(Date.now() + this.config.checkInterval)
        }, result.runId);
      }

      return result.success;
    } catch (error) {
      console.error(`❌ Erreur lors de l'activation du fallback ${type}:`, error);
      return false;
    }
  }

  /**
   * Synchronise les données entre Vercel et GitHub Actions
   */
  async synchronizeData(): Promise<void> {
    console.log('🔄 Synchronisation des données entre systèmes...');

    try {
      // 1. Récupérer les dernières données d'audit
      const auditData = await this.getLatestAuditData();
      
      // 2. Sauvegarder dans un format accessible aux GitHub Actions
      await this.saveDataForGitHubActions(auditData);
      
      // 3. Mettre à jour les métriques de synchronisation
      await this.updateSyncMetrics();

      console.log('✅ Synchronisation terminée');
    } catch (error) {
      console.error('❌ Erreur lors de la synchronisation:', error);
      throw error;
    }
  }

  /**
   * Vérifie l'état de l'API Vercel
   */
  private async checkVercelApi(): Promise<'healthy' | 'unhealthy' | 'unknown'> {
    try {
      const response = await fetch('https://api.vercel.com/v1/user', {
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`
        },
        signal: AbortSignal.timeout(this.config.healthCheckTimeout)
      });

      return response.ok ? 'healthy' : 'unhealthy';
    } catch (error) {
      console.error('Erreur API Vercel:', error);
      return 'unknown';
    }
  }

  /**
   * Vérifie le temps écoulé depuis le dernier audit
   */
  private async checkLastAuditTime(): Promise<{
    lastAuditTime: Date | null;
    timeSinceLastAudit: number;
    status: 'healthy' | 'warning' | 'unhealthy' | 'unknown';
  }> {
    try {
      // Récupérer le timestamp du dernier audit depuis la base de données
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const { data, error } = await supabase
        .from('audit_logs')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error || !data || data.length === 0) {
        return {
          lastAuditTime: null,
          timeSinceLastAudit: 0,
          status: 'unknown'
        };
      }

      const lastAuditTime = new Date(data[0].created_at);
      const now = new Date();
      const timeSinceLastAudit = (now.getTime() - lastAuditTime.getTime()) / (1000 * 60 * 60); // en heures

      let status: 'healthy' | 'warning' | 'unhealthy' | 'unknown';
      if (timeSinceLastAudit < 2) {
        status = 'healthy';
      } else if (timeSinceLastAudit < this.config.maxAuditDelay) {
        status = 'warning';
      } else {
        status = 'unhealthy';
      }

      return {
        lastAuditTime,
        timeSinceLastAudit,
        status
      };
    } catch (error) {
      console.error('Erreur lors de la vérification du dernier audit:', error);
      return {
        lastAuditTime: null,
        timeSinceLastAudit: 0,
        status: 'unknown'
      };
    }
  }

  /**
   * Vérifie la santé de la base de données
   */
  private async checkDatabaseHealth(): Promise<'healthy' | 'slow' | 'unhealthy' | 'unknown'> {
    try {
      const startTime = Date.now();
      
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const { error } = await supabase
        .from('audit_logs')
        .select('count')
        .limit(1);

      const responseTime = Date.now() - startTime;

      if (error) {
        return 'unhealthy';
      }

      if (responseTime < 1000) {
        return 'healthy';
      } else if (responseTime < 5000) {
        return 'slow';
      } else {
        return 'unhealthy';
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de la base de données:', error);
      return 'unknown';
    }
  }

  /**
   * Évalue si le système doit être considéré comme en panne
   */
  private evaluateSystemStatus(health: SystemHealth): boolean {
    // Le système est considéré en panne si :
    // 1. L'API Vercel est inaccessible ET les crons sont en panne
    // 2. Ou si les crons n'ont pas tourné depuis plus de maxAuditDelay heures
    // 3. Ou si la base de données est inaccessible

    if (health.database === 'unhealthy') {
      return true;
    }

    if (health.vercelApi === 'unhealthy' && health.vercelCrons === 'unhealthy') {
      return true;
    }

    if (health.vercelCrons === 'unhealthy') {
      return true;
    }

    return false;
  }

  /**
   * Génère une raison explicative pour l'activation du fallback
   */
  private generateFailureReason(health: SystemHealth): string {
    const reasons: string[] = [];

    if (health.vercelApi === 'unhealthy') {
      reasons.push('API Vercel inaccessible');
    }

    if (health.vercelCrons === 'unhealthy') {
      reasons.push(`Cron jobs inactifs depuis ${health.timeSinceLastAudit.toFixed(1)}h`);
    } else if (health.vercelCrons === 'warning') {
      reasons.push(`Cron jobs en retard (${health.timeSinceLastAudit.toFixed(1)}h)`);
    }

    if (health.database === 'unhealthy') {
      reasons.push('Base de données inaccessible');
    } else if (health.database === 'slow') {
      reasons.push('Base de données lente');
    }

    return reasons.length > 0 ? reasons.join(', ') : 'Système opérationnel';
  }

  /**
   * Enregistre l'activation du fallback
   */
  private async logFallbackActivation(status: FallbackStatus, runId?: number): Promise<void> {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      await supabase
        .from('fallback_logs')
        .insert({
          activated_at: status.lastCheck.toISOString(),
          reason: status.reason,
          fallback_type: 'github_actions',
          status: 'activated',
          github_run_id: runId,
          metadata: runId ? { 
            github_run_id: runId,
            workflow_url: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${runId}`
          } : null
        });

      console.log('📝 Activation du fallback enregistrée', runId ? `(Run ID: ${runId})` : '');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du fallback:', error);
    }
  }

  /**
   * Récupère les dernières données d'audit
   */
  private async getLatestAuditData(): Promise<any> {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error || !data || data.length === 0) {
        return null;
      }

      return data[0];
    } catch (error) {
      console.error('Erreur lors de la récupération des données d\'audit:', error);
      return null;
    }
  }

  /**
   * Sauvegarde les données pour les GitHub Actions
   */
  private async saveDataForGitHubActions(auditData: any): Promise<void> {
    // Cette méthode pourrait sauvegarder les données dans un format
    // accessible aux GitHub Actions (par exemple, dans un artifact ou un cache)
    console.log('💾 Sauvegarde des données pour GitHub Actions...');
    
    // Pour l'instant, on log les données importantes
    if (auditData) {
      console.log('Dernières données d\'audit disponibles pour le fallback');
    } else {
      console.log('Aucune donnée d\'audit récente disponible');
    }
  }

  /**
   * Met à jour les métriques de synchronisation
   */
  private async updateSyncMetrics(): Promise<void> {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      await supabase
        .from('sync_metrics')
        .upsert({
          id: 'fallback_sync',
          last_sync: new Date().toISOString(),
          status: 'completed'
        });

      console.log('📊 Métriques de synchronisation mises à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des métriques:', error);
    }
  }

  /**
   * Obtient le statut actuel du fallback
   */
  getLastStatus(): FallbackStatus | null {
    return this.lastStatus;
  }

  /**
   * Force la vérification du système (pour les tests)
   */
  async forceCheck(): Promise<FallbackStatus> {
    console.log('🔄 Vérification forcée du système...');
    return await this.shouldActivateFallback();
  }

  /**
   * Surveille un workflow GitHub Actions en cours
   */
  async monitorWorkflow(runId: number, maxWaitTime: number = 10 * 60 * 1000): Promise<any> {
    console.log(`👀 Surveillance du workflow GitHub Actions ${runId}...`);
    
    try {
      const githubFallback = new GitHubActionsFallback();
      
      return await githubFallback.monitorWorkflow(runId, {
        maxWaitTime,
        checkInterval: 30 * 1000, // Vérifier toutes les 30 secondes
        onStatusChange: (status) => {
          console.log(`📊 Workflow ${runId}: ${status.status} (${status.conclusion || 'en cours'})`);
        }
      });
    } catch (error) {
      console.error(`❌ Erreur lors de la surveillance du workflow ${runId}:`, error);
      return null;
    }
  }

  /**
   * Récupère les logs d'un workflow GitHub Actions
   */
  async getWorkflowLogs(runId: number): Promise<string[]> {
    console.log(`📋 Récupération des logs du workflow ${runId}...`);
    
    try {
      const githubFallback = new GitHubActionsFallback();
      return await githubFallback.getFormattedWorkflowLogs(runId);
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des logs du workflow ${runId}:`, error);
      return [`Erreur lors de la récupération des logs: ${error instanceof Error ? error.message : 'Erreur inconnue'}`];
    }
  }

  /**
   * Vérifie le statut d'un workflow GitHub Actions
   */
  async checkWorkflowStatus(runId: number): Promise<any> {
    try {
      const githubFallback = new GitHubActionsFallback();
      return await githubFallback.checkWorkflowStatus(runId);
    } catch (error) {
      console.error(`❌ Erreur lors de la vérification du statut du workflow ${runId}:`, error);
      return null;
    }
  }

  /**
   * Liste les workflows de fallback disponibles
   */
  async listAvailableWorkflows(): Promise<Array<{id: number, name: string, path: string}>> {
    try {
      const githubFallback = new GitHubActionsFallback();
      return await githubFallback.listAvailableWorkflows();
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des workflows disponibles:', error);
      return [];
    }
  }

  /**
   * Récupère l'historique des runs récents d'un workflow
   */
  async getWorkflowHistory(workflowFile: string, limit: number = 10): Promise<any[]> {
    try {
      const githubFallback = new GitHubActionsFallback();
      return await githubFallback.getRecentWorkflowRuns(workflowFile, limit);
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération de l'historique de ${workflowFile}:`, error);
      return [];
    }
  }

  /**
   * Vérifie si la configuration GitHub Actions est valide
   */
  isGitHubActionsConfigured(): boolean {
    const githubFallback = new GitHubActionsFallback();
    return githubFallback.isConfigured();
  }

  /**
   * Obtient les informations de configuration GitHub Actions
   */
  getGitHubActionsConfiguration(): any {
    const githubFallback = new GitHubActionsFallback();
    return githubFallback.getConfiguration();
  }
}

// Import the enhanced GitHubActionsFallback from the dedicated module
import { GitHubActionsFallback } from './github-actions-fallback';

// Instance singleton pour l'utilisation globale
export const fallbackManager = new FallbackManager();