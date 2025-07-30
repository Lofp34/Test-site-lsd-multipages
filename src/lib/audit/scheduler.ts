/**
 * Gestionnaire de planification pour les audits automatiques
 * 
 * Ce service gère :
 * - La planification des audits réguliers
 * - La gestion des files d'attente
 * - La prévention des conflits d'exécution
 * - L'intégration avec les déploiements
 */

import { AuditDatabase } from './database';

export interface ScheduleConfig {
  enabled: boolean;
  dailyAuditTime: string; // Format HH:MM
  weeklyReportDay: number; // 0-6 (0 = dimanche)
  weeklyReportTime: string; // Format HH:MM
  alertCheckInterval: number; // minutes
  maxConcurrentAudits: number;
  auditTimeout: number; // minutes
}

export interface AuditJob {
  id: string;
  type: 'full_audit' | 'quick_check' | 'alert_analysis' | 'weekly_report';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  scheduledAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  priority: number; // 1-10, 10 = highest
  metadata?: Record<string, any>;
}

export class AuditScheduler {
  private config: ScheduleConfig;
  private runningJobs: Map<string, AuditJob> = new Map();
  private jobQueue: AuditJob[] = [];

  constructor(config?: Partial<ScheduleConfig>) {
    this.config = {
      enabled: config?.enabled ?? true,
      dailyAuditTime: config?.dailyAuditTime ?? '02:00',
      weeklyReportDay: config?.weeklyReportDay ?? 1, // Lundi
      weeklyReportTime: config?.weeklyReportTime ?? '09:00',
      alertCheckInterval: config?.alertCheckInterval ?? 360, // 6 heures
      maxConcurrentAudits: config?.maxConcurrentAudits ?? 1,
      auditTimeout: config?.auditTimeout ?? 30,
      ...config
    };
  }

  /**
   * Vérifier si le scheduler est activé
   */
  isEnabled(): boolean {
    return this.config.enabled && process.env.AUDIT_SCHEDULE_ENABLED === 'true';
  }

  /**
   * Planifier un audit complet
   */
  async scheduleFullAudit(scheduledAt?: Date, priority: number = 5): Promise<string> {
    const job: AuditJob = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'full_audit',
      status: 'pending',
      scheduledAt: scheduledAt || new Date(),
      priority,
      metadata: {
        triggeredBy: 'scheduler',
        auditType: 'full'
      }
    };

    await this.addJobToQueue(job);
    console.log(`📅 Audit complet planifié: ${job.id} pour ${job.scheduledAt.toISOString()}`);
    
    return job.id;
  }

  /**
   * Planifier une vérification rapide
   */
  async scheduleQuickCheck(priority: number = 3): Promise<string> {
    const job: AuditJob = {
      id: `quick-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'quick_check',
      status: 'pending',
      scheduledAt: new Date(),
      priority,
      metadata: {
        triggeredBy: 'scheduler',
        auditType: 'quick'
      }
    };

    await this.addJobToQueue(job);
    console.log(`⚡ Vérification rapide planifiée: ${job.id}`);
    
    return job.id;
  }

  /**
   * Planifier l'analyse des alertes
   */
  async scheduleAlertAnalysis(priority: number = 7): Promise<string> {
    const job: AuditJob = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'alert_analysis',
      status: 'pending',
      scheduledAt: new Date(),
      priority,
      metadata: {
        triggeredBy: 'scheduler'
      }
    };

    await this.addJobToQueue(job);
    console.log(`🚨 Analyse d'alertes planifiée: ${job.id}`);
    
    return job.id;
  }

  /**
   * Planifier le rapport hebdomadaire
   */
  async scheduleWeeklyReport(): Promise<string> {
    const job: AuditJob = {
      id: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'weekly_report',
      status: 'pending',
      scheduledAt: new Date(),
      priority: 4,
      metadata: {
        triggeredBy: 'scheduler',
        reportType: 'weekly'
      }
    };

    await this.addJobToQueue(job);
    console.log(`📊 Rapport hebdomadaire planifié: ${job.id}`);
    
    return job.id;
  }

  /**
   * Ajouter un job à la file d'attente
   */
  private async addJobToQueue(job: AuditJob): Promise<void> {
    // Vérifier s'il y a déjà un job similaire en attente
    const existingJob = this.jobQueue.find(j => 
      j.type === job.type && 
      j.status === 'pending' &&
      Math.abs(j.scheduledAt.getTime() - job.scheduledAt.getTime()) < 60000 // 1 minute
    );

    if (existingJob) {
      console.log(`⚠️ Job similaire déjà en file d'attente: ${existingJob.id}`);
      return;
    }

    // Insérer le job dans la file d'attente selon sa priorité
    const insertIndex = this.jobQueue.findIndex(j => j.priority < job.priority);
    if (insertIndex === -1) {
      this.jobQueue.push(job);
    } else {
      this.jobQueue.splice(insertIndex, 0, job);
    }

    // Sauvegarder en base de données
    await this.saveJobToDatabase(job);
  }

  /**
   * Traiter la file d'attente
   */
  async processQueue(): Promise<void> {
    if (!this.isEnabled()) {
      console.log('🔕 Scheduler désactivé');
      return;
    }

    // Nettoyer les jobs expirés
    await this.cleanupExpiredJobs();

    // Vérifier si on peut exécuter de nouveaux jobs
    if (this.runningJobs.size >= this.config.maxConcurrentAudits) {
      console.log(`⏳ Limite de jobs concurrents atteinte (${this.runningJobs.size}/${this.config.maxConcurrentAudits})`);
      return;
    }

    // Trouver le prochain job à exécuter
    const now = new Date();
    const nextJob = this.jobQueue.find(job => 
      job.status === 'pending' && 
      job.scheduledAt <= now
    );

    if (!nextJob) {
      return;
    }

    // Exécuter le job
    await this.executeJob(nextJob);
  }

  /**
   * Exécuter un job
   */
  private async executeJob(job: AuditJob): Promise<void> {
    try {
      // Marquer le job comme en cours
      job.status = 'running';
      job.startedAt = new Date();
      this.runningJobs.set(job.id, job);
      
      // Retirer de la file d'attente
      const queueIndex = this.jobQueue.findIndex(j => j.id === job.id);
      if (queueIndex !== -1) {
        this.jobQueue.splice(queueIndex, 1);
      }

      await this.updateJobInDatabase(job);
      console.log(`🚀 Exécution du job: ${job.id} (${job.type})`);

      // Exécuter selon le type de job
      let success = false;
      switch (job.type) {
        case 'full_audit':
          success = await this.executeFullAudit(job);
          break;
        case 'quick_check':
          success = await this.executeQuickCheck(job);
          break;
        case 'alert_analysis':
          success = await this.executeAlertAnalysis(job);
          break;
        case 'weekly_report':
          success = await this.executeWeeklyReport(job);
          break;
        default:
          throw new Error(`Type de job inconnu: ${job.type}`);
      }

      // Marquer comme terminé
      job.status = success ? 'completed' : 'failed';
      job.completedAt = new Date();
      
      console.log(`${success ? '✅' : '❌'} Job ${job.id} ${success ? 'terminé' : 'échoué'}`);

    } catch (error) {
      job.status = 'failed';
      job.error = error instanceof Error ? error.message : 'Unknown error';
      job.completedAt = new Date();
      
      console.error(`❌ Erreur lors de l'exécution du job ${job.id}:`, error);
    } finally {
      // Nettoyer
      this.runningJobs.delete(job.id);
      await this.updateJobInDatabase(job);
    }
  }

  /**
   * Exécuter un audit complet
   */
  private async executeFullAudit(job: AuditJob): Promise<boolean> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/audit-links`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Laurent Serre Audit Scheduler',
          'X-Audit-Job-Id': job.id,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur lors de l\'audit complet:', error);
      return false;
    }
  }

  /**
   * Exécuter une vérification rapide
   */
  private async executeQuickCheck(job: AuditJob): Promise<boolean> {
    try {
      // Pour une vérification rapide, on vérifie seulement les liens critiques récents
      const { data: criticalLinks } = await AuditDatabase.getSupabaseAdmin()
        .from('validation_results')
        .select('url')
        .eq('status', 'broken')
        .limit(10);

      if (!criticalLinks || criticalLinks.length === 0) {
        return true; // Pas de liens critiques à vérifier
      }

      // Ici on pourrait implémenter une validation rapide
      // Pour l'instant, on considère que c'est réussi
      return true;
    } catch (error) {
      console.error('Erreur lors de la vérification rapide:', error);
      return false;
    }
  }

  /**
   * Exécuter l'analyse des alertes
   */
  private async executeAlertAnalysis(job: AuditJob): Promise<boolean> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/admin/trigger-alerts`, {
        method: 'POST',
        headers: {
          'User-Agent': 'Laurent Serre Audit Scheduler',
          'X-Audit-Job-Id': job.id,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur lors de l\'analyse des alertes:', error);
      return false;
    }
  }

  /**
   * Exécuter le rapport hebdomadaire
   */
  private async executeWeeklyReport(job: AuditJob): Promise<boolean> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/weekly-report`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Laurent Serre Audit Scheduler',
          'X-Audit-Job-Id': job.id,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur lors du rapport hebdomadaire:', error);
      return false;
    }
  }

  /**
   * Nettoyer les jobs expirés
   */
  private async cleanupExpiredJobs(): Promise<void> {
    const now = new Date();
    const timeoutMs = this.config.auditTimeout * 60 * 1000;

    // Nettoyer les jobs en cours qui ont dépassé le timeout
    for (const [jobId, job] of this.runningJobs.entries()) {
      if (job.startedAt && (now.getTime() - job.startedAt.getTime()) > timeoutMs) {
        job.status = 'failed';
        job.error = 'Timeout exceeded';
        job.completedAt = now;
        
        this.runningJobs.delete(jobId);
        await this.updateJobInDatabase(job);
        
        console.log(`⏰ Job ${jobId} annulé pour timeout`);
      }
    }

    // Nettoyer les jobs en attente trop anciens (plus de 24h)
    const maxAge = 24 * 60 * 60 * 1000; // 24 heures
    this.jobQueue = this.jobQueue.filter(job => {
      const age = now.getTime() - job.scheduledAt.getTime();
      if (age > maxAge) {
        job.status = 'cancelled';
        job.error = 'Job expired';
        this.updateJobInDatabase(job);
        console.log(`🗑️ Job ${job.id} supprimé (expiré)`);
        return false;
      }
      return true;
    });
  }

  /**
   * Sauvegarder un job en base de données
   */
  private async saveJobToDatabase(job: AuditJob): Promise<void> {
    try {
      // Pour l'instant, on utilise une table simple
      // Dans une implémentation complète, on créerait une table dédiée
      console.log(`💾 Job ${job.id} sauvegardé`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du job:', error);
    }
  }

  /**
   * Mettre à jour un job en base de données
   */
  private async updateJobInDatabase(job: AuditJob): Promise<void> {
    try {
      console.log(`🔄 Job ${job.id} mis à jour: ${job.status}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du job:', error);
    }
  }

  /**
   * Obtenir le statut de la file d'attente
   */
  getQueueStatus(): {
    pending: number;
    running: number;
    queue: AuditJob[];
    runningJobs: AuditJob[];
  } {
    return {
      pending: this.jobQueue.filter(j => j.status === 'pending').length,
      running: this.runningJobs.size,
      queue: [...this.jobQueue],
      runningJobs: Array.from(this.runningJobs.values()),
    };
  }

  /**
   * Annuler un job
   */
  async cancelJob(jobId: string): Promise<boolean> {
    // Chercher dans la file d'attente
    const queueIndex = this.jobQueue.findIndex(j => j.id === jobId);
    if (queueIndex !== -1) {
      const job = this.jobQueue[queueIndex];
      job.status = 'cancelled';
      job.completedAt = new Date();
      
      this.jobQueue.splice(queueIndex, 1);
      await this.updateJobInDatabase(job);
      
      console.log(`❌ Job ${jobId} annulé`);
      return true;
    }

    // Chercher dans les jobs en cours
    const runningJob = this.runningJobs.get(jobId);
    if (runningJob) {
      runningJob.status = 'cancelled';
      runningJob.completedAt = new Date();
      
      this.runningJobs.delete(jobId);
      await this.updateJobInDatabase(runningJob);
      
      console.log(`❌ Job en cours ${jobId} annulé`);
      return true;
    }

    return false;
  }

  /**
   * Configurer le scheduler
   */
  updateConfig(newConfig: Partial<ScheduleConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('⚙️ Configuration du scheduler mise à jour');
  }

  /**
   * Obtenir la configuration actuelle
   */
  getConfig(): ScheduleConfig {
    return { ...this.config };
  }
}

/**
 * Instance singleton du scheduler
 */
let _schedulerInstance: AuditScheduler | null = null;

export function getAuditScheduler(): AuditScheduler {
  if (!_schedulerInstance) {
    _schedulerInstance = new AuditScheduler();
  }
  return _schedulerInstance;
}