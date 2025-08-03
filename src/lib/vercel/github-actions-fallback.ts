/**
 * GitHubActionsFallback - Interface complète pour déclencher et monitorer les workflows GitHub Actions
 * 
 * Ce module fournit une interface complète pour :
 * - Déclencher les workflows GitHub Actions de fallback
 * - Monitorer le statut des workflows en cours
 * - Récupérer les logs d'exécution
 * - Gérer les erreurs et retry automatiques
 */

export interface WorkflowTriggerOptions {
  workflowFile: string;
  inputs: Record<string, any>;
  ref?: string;
  timeout?: number;
}

export interface WorkflowStatus {
  id: number;
  status: 'queued' | 'in_progress' | 'completed' | 'cancelled' | 'failure' | 'skipped' | 'timed_out';
  conclusion: 'success' | 'failure' | 'neutral' | 'cancelled' | 'skipped' | 'timed_out' | 'action_required' | null;
  created_at: string;
  updated_at: string;
  run_started_at: string | null;
  url: string;
  html_url: string;
  workflow_id: number;
  head_branch: string;
  head_sha: string;
}

export interface WorkflowRun {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  created_at: string;
  updated_at: string;
  url: string;
  html_url: string;
  jobs: WorkflowJob[];
}

export interface WorkflowJob {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  started_at: string;
  completed_at: string | null;
  url: string;
  html_url: string;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  name: string;
  status: string;
  conclusion: string | null;
  number: number;
  started_at: string;
  completed_at: string | null;
}

export interface WorkflowLogs {
  runId: number;
  jobs: Array<{
    jobId: number;
    jobName: string;
    logs: string[];
    downloadUrl?: string;
  }>;
  totalSize: number;
  retrievedAt: string;
}

export interface FallbackTriggerResult {
  success: boolean;
  runId?: number;
  error?: string;
  workflowUrl?: string;
  estimatedDuration?: number;
}

export class GitHubActionsFallback {
  private githubToken: string;
  private owner: string;
  private repo: string;
  private baseUrl: string;
  private defaultTimeout: number;

  constructor() {
    this.githubToken = process.env.GITHUB_TOKEN || '';
    this.owner = process.env.GITHUB_REPOSITORY?.split('/')[0] || '';
    this.repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
    this.baseUrl = 'https://api.github.com';
    this.defaultTimeout = 30000; // 30 secondes

    if (!this.githubToken) {
      console.warn('⚠️ GITHUB_TOKEN non configuré - GitHubActionsFallback en mode dégradé');
    }

    if (!this.owner || !this.repo) {
      console.warn('⚠️ GITHUB_REPOSITORY non configuré - GitHubActionsFallback en mode dégradé');
    }
  }

  /**
   * Déclenche le workflow d'alertes urgentes
   */
  async triggerUrgentAlerts(forceCheck: boolean = false): Promise<FallbackTriggerResult> {
    console.log('🚨 Déclenchement du workflow d\'alertes urgentes...');
    
    return await this.triggerWorkflow({
      workflowFile: 'fallback-urgent-alerts.yml',
      inputs: {
        force_check: forceCheck.toString()
      }
    });
  }

  /**
   * Déclenche le workflow de maintenance d'urgence
   */
  async triggerEmergencyMaintenance(
    type: 'database_cleanup' | 'cache_reset' | 'link_correction' | 'system_recovery' | 'full_maintenance' = 'system_recovery',
    severity: 'low' | 'medium' | 'high' | 'critical' = 'high',
    notifyAdmin: boolean = true
  ): Promise<FallbackTriggerResult> {
    console.log(`🔧 Déclenchement de la maintenance d'urgence (${type})...`);
    
    return await this.triggerWorkflow({
      workflowFile: 'fallback-emergency-maintenance.yml',
      inputs: {
        maintenance_type: type,
        severity: severity,
        notify_admin: notifyAdmin.toString()
      }
    });
  }

  /**
   * Déclenche le workflow de monitoring de santé
   */
  async triggerHealthMonitoring(detailedCheck: boolean = false): Promise<FallbackTriggerResult> {
    console.log('🏥 Déclenchement du monitoring de santé...');
    
    return await this.triggerWorkflow({
      workflowFile: 'fallback-health-monitoring.yml',
      inputs: {
        detailed_check: detailedCheck.toString()
      }
    });
  }

  /**
   * Déclenche un workflow GitHub Actions spécifique
   */
  async triggerWorkflow(options: WorkflowTriggerOptions): Promise<FallbackTriggerResult> {
    const { workflowFile, inputs, ref = 'main', timeout = this.defaultTimeout } = options;

    if (!this.githubToken || !this.owner || !this.repo) {
      return {
        success: false,
        error: 'Configuration GitHub incomplète (token, owner, repo manquants)'
      };
    }

    try {
      console.log(`🚀 Déclenchement du workflow: ${workflowFile}`);
      console.log(`📝 Inputs:`, inputs);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/actions/workflows/${workflowFile}/dispatches`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'GitHubActionsFallback/1.0'
          },
          body: JSON.stringify({
            ref,
            inputs
          }),
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log(`✅ Workflow ${workflowFile} déclenché avec succès`);
        
        // Attendre un peu puis récupérer l'ID du run
        await new Promise(resolve => setTimeout(resolve, 2000));
        const runId = await this.getLatestWorkflowRunId(workflowFile);
        
        return {
          success: true,
          runId,
          workflowUrl: runId ? `https://github.com/${this.owner}/${this.repo}/actions/runs/${runId}` : undefined,
          estimatedDuration: this.getEstimatedDuration(workflowFile)
        };
      } else {
        const errorText = await response.text();
        console.error(`❌ Erreur lors du déclenchement de ${workflowFile}:`, response.status, response.statusText, errorText);
        
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText} - ${errorText}`
        };
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error(`⏱️ Timeout lors du déclenchement de ${workflowFile}`);
        return {
          success: false,
          error: `Timeout après ${timeout}ms`
        };
      }
      
      console.error(`❌ Erreur lors du déclenchement de ${workflowFile}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Vérifie le statut d'un workflow run spécifique
   */
  async checkWorkflowStatus(runId: number): Promise<WorkflowStatus | null> {
    if (!this.githubToken || !this.owner || !this.repo) {
      console.warn('⚠️ Configuration GitHub incomplète pour vérifier le statut');
      return null;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/actions/runs/${runId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitHubActionsFallback/1.0'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
          id: data.id,
          status: data.status,
          conclusion: data.conclusion,
          created_at: data.created_at,
          updated_at: data.updated_at,
          run_started_at: data.run_started_at,
          url: data.url,
          html_url: data.html_url,
          workflow_id: data.workflow_id,
          head_branch: data.head_branch,
          head_sha: data.head_sha
        };
      } else {
        console.error(`❌ Erreur lors de la vérification du statut du run ${runId}:`, response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error(`❌ Erreur lors de la vérification du statut du run ${runId}:`, error);
      return null;
    }
  }

  /**
   * Récupère les détails complets d'un workflow run avec ses jobs
   */
  async getWorkflowRun(runId: number): Promise<WorkflowRun | null> {
    if (!this.githubToken || !this.owner || !this.repo) {
      console.warn('⚠️ Configuration GitHub incomplète pour récupérer les détails du workflow');
      return null;
    }

    try {
      // Récupérer les informations du run
      const runResponse = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/actions/runs/${runId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitHubActionsFallback/1.0'
          }
        }
      );

      if (!runResponse.ok) {
        console.error(`❌ Erreur lors de la récupération du run ${runId}:`, runResponse.status);
        return null;
      }

      const runData = await runResponse.json();

      // Récupérer les jobs du run
      const jobsResponse = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/actions/runs/${runId}/jobs`,
        {
          headers: {
            'Authorization': `Bearer ${this.githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitHubActionsFallback/1.0'
          }
        }
      );

      let jobs: WorkflowJob[] = [];
      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json();
        jobs = jobsData.jobs.map((job: any) => ({
          id: job.id,
          name: job.name,
          status: job.status,
          conclusion: job.conclusion,
          started_at: job.started_at,
          completed_at: job.completed_at,
          url: job.url,
          html_url: job.html_url,
          steps: job.steps?.map((step: any) => ({
            name: step.name,
            status: step.status,
            conclusion: step.conclusion,
            number: step.number,
            started_at: step.started_at,
            completed_at: step.completed_at
          })) || []
        }));
      }

      return {
        id: runData.id,
        name: runData.name,
        status: runData.status,
        conclusion: runData.conclusion,
        created_at: runData.created_at,
        updated_at: runData.updated_at,
        url: runData.url,
        html_url: runData.html_url,
        jobs
      };
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des détails du run ${runId}:`, error);
      return null;
    }
  }

  /**
   * Récupère les logs d'un workflow run
   */
  async getWorkflowLogs(runId: number): Promise<WorkflowLogs | null> {
    if (!this.githubToken || !this.owner || !this.repo) {
      console.warn('⚠️ Configuration GitHub incomplète pour récupérer les logs');
      return null;
    }

    try {
      console.log(`📋 Récupération des logs du workflow run ${runId}...`);

      // Récupérer les jobs du run
      const workflowRun = await this.getWorkflowRun(runId);
      if (!workflowRun) {
        return null;
      }

      const logs: WorkflowLogs = {
        runId,
        jobs: [],
        totalSize: 0,
        retrievedAt: new Date().toISOString()
      };

      // Récupérer les logs de chaque job
      for (const job of workflowRun.jobs) {
        try {
          const jobLogsResponse = await fetch(
            `${this.baseUrl}/repos/${this.owner}/${this.repo}/actions/jobs/${job.id}/logs`,
            {
              headers: {
                'Authorization': `Bearer ${this.githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'GitHubActionsFallback/1.0'
              }
            }
          );

          if (jobLogsResponse.ok) {
            const logsText = await jobLogsResponse.text();
            const logLines = logsText.split('\n').filter(line => line.trim());
            
            logs.jobs.push({
              jobId: job.id,
              jobName: job.name,
              logs: logLines,
              downloadUrl: jobLogsResponse.url
            });

            logs.totalSize += logsText.length;
          } else {
            console.warn(`⚠️ Impossible de récupérer les logs du job ${job.id}: ${jobLogsResponse.status}`);
            logs.jobs.push({
              jobId: job.id,
              jobName: job.name,
              logs: [`Erreur lors de la récupération des logs: HTTP ${jobLogsResponse.status}`]
            });
          }
        } catch (error) {
          console.error(`❌ Erreur lors de la récupération des logs du job ${job.id}:`, error);
          logs.jobs.push({
            jobId: job.id,
            jobName: job.name,
            logs: [`Erreur lors de la récupération des logs: ${error instanceof Error ? error.message : 'Erreur inconnue'}`]
          });
        }
      }

      console.log(`✅ Logs récupérés: ${logs.jobs.length} jobs, ${logs.totalSize} caractères`);
      return logs;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des logs du run ${runId}:`, error);
      return null;
    }
  }

  /**
   * Récupère les logs formatés d'un workflow run
   */
  async getFormattedWorkflowLogs(runId: number): Promise<string[]> {
    const logs = await this.getWorkflowLogs(runId);
    if (!logs) {
      return ['Impossible de récupérer les logs du workflow'];
    }

    const formattedLogs: string[] = [];
    formattedLogs.push(`=== LOGS DU WORKFLOW RUN ${runId} ===`);
    formattedLogs.push(`Récupéré le: ${new Date(logs.retrievedAt).toLocaleString('fr-FR')}`);
    formattedLogs.push(`Nombre de jobs: ${logs.jobs.length}`);
    formattedLogs.push(`Taille totale: ${logs.totalSize} caractères`);
    formattedLogs.push('');

    for (const job of logs.jobs) {
      formattedLogs.push(`--- JOB: ${job.jobName} (ID: ${job.jobId}) ---`);
      formattedLogs.push(...job.logs);
      formattedLogs.push('');
    }

    return formattedLogs;
  }

  /**
   * Surveille un workflow jusqu'à sa completion
   */
  async monitorWorkflow(
    runId: number, 
    options: {
      maxWaitTime?: number;
      checkInterval?: number;
      onStatusChange?: (status: WorkflowStatus) => void;
    } = {}
  ): Promise<WorkflowStatus | null> {
    const { 
      maxWaitTime = 10 * 60 * 1000, // 10 minutes par défaut
      checkInterval = 30 * 1000,    // 30 secondes par défaut
      onStatusChange 
    } = options;

    console.log(`👀 Surveillance du workflow run ${runId} (max ${maxWaitTime/1000}s)...`);

    const startTime = Date.now();
    let lastStatus: string | null = null;

    while (Date.now() - startTime < maxWaitTime) {
      const status = await this.checkWorkflowStatus(runId);
      
      if (!status) {
        console.error(`❌ Impossible de récupérer le statut du run ${runId}`);
        return null;
      }

      // Notifier du changement de statut
      if (status.status !== lastStatus) {
        console.log(`📊 Workflow ${runId}: ${lastStatus || 'unknown'} → ${status.status}`);
        lastStatus = status.status;
        onStatusChange?.(status);
      }

      // Vérifier si le workflow est terminé
      if (status.status === 'completed') {
        console.log(`✅ Workflow ${runId} terminé avec conclusion: ${status.conclusion}`);
        return status;
      }

      if (status.status === 'cancelled' || status.status === 'failure' || status.status === 'timed_out') {
        console.log(`❌ Workflow ${runId} terminé avec statut: ${status.status}`);
        return status;
      }

      // Attendre avant la prochaine vérification
      await new Promise(resolve => setTimeout(resolve, checkInterval));
    }

    console.warn(`⏱️ Timeout lors de la surveillance du workflow ${runId}`);
    return await this.checkWorkflowStatus(runId);
  }

  /**
   * Récupère l'ID du dernier run d'un workflow spécifique
   */
  private async getLatestWorkflowRunId(workflowFile: string): Promise<number | undefined> {
    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/actions/workflows/${workflowFile}/runs?per_page=1`,
        {
          headers: {
            'Authorization': `Bearer ${this.githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitHubActionsFallback/1.0'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.workflow_runs?.[0]?.id;
      }
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération du dernier run de ${workflowFile}:`, error);
    }
    
    return undefined;
  }

  /**
   * Estime la durée d'exécution d'un workflow
   */
  private getEstimatedDuration(workflowFile: string): number {
    const durations: Record<string, number> = {
      'fallback-urgent-alerts.yml': 5 * 60,        // 5 minutes
      'fallback-health-monitoring.yml': 3 * 60,    // 3 minutes
      'fallback-emergency-maintenance.yml': 15 * 60 // 15 minutes
    };

    return durations[workflowFile] || 10 * 60; // 10 minutes par défaut
  }

  /**
   * Liste tous les workflows disponibles
   */
  async listAvailableWorkflows(): Promise<Array<{id: number, name: string, path: string}>> {
    if (!this.githubToken || !this.owner || !this.repo) {
      return [];
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/actions/workflows`,
        {
          headers: {
            'Authorization': `Bearer ${this.githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitHubActionsFallback/1.0'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.workflows
          .filter((workflow: any) => workflow.path.includes('fallback-'))
          .map((workflow: any) => ({
            id: workflow.id,
            name: workflow.name,
            path: workflow.path
          }));
      }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des workflows:', error);
    }

    return [];
  }

  /**
   * Récupère les runs récents d'un workflow
   */
  async getRecentWorkflowRuns(workflowFile: string, limit: number = 10): Promise<WorkflowStatus[]> {
    if (!this.githubToken || !this.owner || !this.repo) {
      return [];
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.owner}/${this.repo}/actions/workflows/${workflowFile}/runs?per_page=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${this.githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitHubActionsFallback/1.0'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.workflow_runs.map((run: any) => ({
          id: run.id,
          status: run.status,
          conclusion: run.conclusion,
          created_at: run.created_at,
          updated_at: run.updated_at,
          run_started_at: run.run_started_at,
          url: run.url,
          html_url: run.html_url,
          workflow_id: run.workflow_id,
          head_branch: run.head_branch,
          head_sha: run.head_sha
        }));
      }
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des runs de ${workflowFile}:`, error);
    }

    return [];
  }

  /**
   * Vérifie si la configuration GitHub est valide
   */
  isConfigured(): boolean {
    return !!(this.githubToken && this.owner && this.repo);
  }

  /**
   * Obtient les informations de configuration
   */
  getConfiguration(): {
    hasToken: boolean;
    owner: string;
    repo: string;
    baseUrl: string;
  } {
    return {
      hasToken: !!this.githubToken,
      owner: this.owner,
      repo: this.repo,
      baseUrl: this.baseUrl
    };
  }
}

// Instance singleton pour l'utilisation globale
export const githubActionsFallback = new GitHubActionsFallback();