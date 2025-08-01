/**
 * Exemple d'utilisation de l'intégration GitHub Actions Fallback
 * 
 * Ce fichier montre comment utiliser le système de fallback GitHub Actions
 * dans différents scénarios d'usage.
 */

import { GitHubActionsFallback } from './github-actions-fallback';
import { FallbackManager } from './fallback-manager';

/**
 * Exemple 1: Déclenchement manuel d'une alerte urgente
 */
export async function triggerUrgentAlert() {
  console.log('🚨 Déclenchement d\'une alerte urgente...');
  
  const fallback = new GitHubActionsFallback();
  
  // Déclencher le workflow d'alertes urgentes
  const result = await fallback.triggerUrgentAlerts(true);
  
  if (result.success) {
    console.log(`✅ Workflow déclenché avec succès!`);
    console.log(`🔗 URL: ${result.workflowUrl}`);
    console.log(`⏱️ Durée estimée: ${result.estimatedDuration}s`);
    
    // Surveiller le workflow si on a un run ID
    if (result.runId) {
      console.log(`👀 Surveillance du workflow ${result.runId}...`);
      
      const finalStatus = await fallback.monitorWorkflow(result.runId, {
        maxWaitTime: 5 * 60 * 1000, // 5 minutes max
        checkInterval: 15 * 1000,   // Vérifier toutes les 15 secondes
        onStatusChange: (status) => {
          console.log(`📊 Statut: ${status.status} (${status.conclusion || 'en cours'})`);
        }
      });
      
      if (finalStatus) {
        console.log(`🏁 Workflow terminé: ${finalStatus.conclusion}`);
        
        // Récupérer les logs si le workflow est terminé
        if (finalStatus.status === 'completed') {
          const logs = await fallback.getFormattedWorkflowLogs(result.runId);
          console.log(`📋 Logs récupérés: ${logs.length} lignes`);
        }
      }
    }
  } else {
    console.error(`❌ Échec du déclenchement: ${result.error}`);
  }
}

/**
 * Exemple 2: Maintenance d'urgence avec monitoring complet
 */
export async function performEmergencyMaintenance() {
  console.log('🔧 Lancement de la maintenance d\'urgence...');
  
  const fallback = new GitHubActionsFallback();
  
  // Déclencher une maintenance complète
  const result = await fallback.triggerEmergencyMaintenance(
    'full_maintenance',  // Type de maintenance
    'high',             // Sévérité
    true                // Notifier l'admin
  );
  
  if (result.success && result.runId) {
    console.log(`🚀 Maintenance démarrée - Run ID: ${result.runId}`);
    
    // Surveiller avec callback détaillé
    const status = await fallback.monitorWorkflow(result.runId, {
      maxWaitTime: 15 * 60 * 1000, // 15 minutes pour une maintenance complète
      checkInterval: 30 * 1000,    // Vérifier toutes les 30 secondes
      onStatusChange: (status) => {
        const timestamp = new Date().toLocaleTimeString('fr-FR');
        console.log(`[${timestamp}] 📊 Maintenance: ${status.status}`);
        
        if (status.conclusion) {
          console.log(`[${timestamp}] 🎯 Résultat: ${status.conclusion}`);
        }
      }
    });
    
    // Récupérer les détails complets du workflow
    if (status) {
      const workflowRun = await fallback.getWorkflowRun(result.runId);
      if (workflowRun) {
        console.log(`\n📊 Résumé de la maintenance:`);
        console.log(`   Nom: ${workflowRun.name}`);
        console.log(`   Statut: ${workflowRun.status}`);
        console.log(`   Conclusion: ${workflowRun.conclusion || 'N/A'}`);
        console.log(`   Jobs exécutés: ${workflowRun.jobs.length}`);
        
        // Détails des jobs
        workflowRun.jobs.forEach((job, index) => {
          console.log(`   Job ${index + 1}: ${job.name} - ${job.status} (${job.conclusion || 'en cours'})`);
        });
      }
      
      // Récupérer et afficher les logs importants
      const logs = await fallback.getWorkflowLogs(result.runId);
      if (logs) {
        console.log(`\n📋 Logs de maintenance (${logs.totalSize} caractères):`);
        
        // Afficher les logs de chaque job
        logs.jobs.forEach(job => {
          console.log(`\n--- ${job.jobName} ---`);
          const importantLogs = job.logs.filter(line => 
            line.includes('✅') || 
            line.includes('❌') || 
            line.includes('⚠️') ||
            line.includes('ERROR') ||
            line.includes('SUCCESS')
          );
          
          importantLogs.slice(0, 5).forEach(line => {
            console.log(`   ${line}`);
          });
          
          if (importantLogs.length > 5) {
            console.log(`   ... et ${importantLogs.length - 5} autres messages importants`);
          }
        });
      }
    }
  } else {
    console.error(`❌ Échec du lancement de la maintenance: ${result.error}`);
  }
}

/**
 * Exemple 3: Monitoring de santé avec FallbackManager
 */
export async function monitorSystemHealth() {
  console.log('🏥 Monitoring de la santé du système...');
  
  const manager = new FallbackManager();
  
  // Vérifier la santé du système
  const health = await manager.checkSystemHealth();
  
  console.log('📊 État du système:');
  console.log(`   Cron Jobs Vercel: ${health.vercelCrons}`);
  console.log(`   API Vercel: ${health.vercelApi}`);
  console.log(`   Base de données: ${health.database}`);
  console.log(`   Dernier audit: ${health.timeSinceLastAudit.toFixed(1)}h`);
  
  // Décider si un fallback est nécessaire
  const fallbackStatus = await manager.shouldActivateFallback();
  
  if (fallbackStatus.isVercelDown) {
    console.log(`⚠️ Système Vercel défaillant: ${fallbackStatus.reason}`);
    console.log('🔄 Activation du fallback GitHub Actions...');
    
    // Activer le fallback de monitoring de santé
    const success = await manager.activateFallback('health');
    
    if (success) {
      console.log('✅ Fallback activé avec succès');
      
      // Récupérer l'historique des workflows de santé
      const history = await manager.getWorkflowHistory('fallback-health-monitoring.yml', 5);
      
      console.log(`📊 Historique récent (${history.length} runs):`);
      history.forEach((run, index) => {
        const date = new Date(run.created_at).toLocaleString('fr-FR');
        console.log(`   ${index + 1}. ${date}: ${run.status} (${run.conclusion || 'en cours'})`);
      });
    } else {
      console.error('❌ Échec de l\'activation du fallback');
    }
  } else {
    console.log('✅ Système Vercel opérationnel - Aucun fallback nécessaire');
    
    // Déclencher quand même un monitoring de santé pour vérification
    const fallback = new GitHubActionsFallback();
    const result = await fallback.triggerHealthMonitoring(true);
    
    if (result.success) {
      console.log('🔍 Monitoring de santé préventif déclenché');
    }
  }
}

/**
 * Exemple 4: Gestion des workflows avec retry et gestion d'erreurs
 */
export async function robustWorkflowExecution() {
  console.log('🛡️ Exécution robuste de workflow...');
  
  const fallback = new GitHubActionsFallback();
  
  // Vérifier la configuration avant de commencer
  if (!fallback.isConfigured()) {
    console.error('❌ Configuration GitHub Actions incomplète');
    const config = fallback.getConfiguration();
    console.log('Configuration actuelle:', config);
    return;
  }
  
  // Lister les workflows disponibles
  const workflows = await fallback.listAvailableWorkflows();
  console.log(`📋 Workflows disponibles: ${workflows.length}`);
  
  workflows.forEach(workflow => {
    console.log(`   - ${workflow.name} (${workflow.path})`);
  });
  
  // Tentative de déclenchement avec retry
  let attempts = 0;
  const maxAttempts = 3;
  let result;
  
  while (attempts < maxAttempts) {
    attempts++;
    console.log(`🔄 Tentative ${attempts}/${maxAttempts}...`);
    
    result = await fallback.triggerHealthMonitoring(false);
    
    if (result.success) {
      console.log(`✅ Succès à la tentative ${attempts}`);
      break;
    } else {
      console.warn(`⚠️ Échec tentative ${attempts}: ${result.error}`);
      
      if (attempts < maxAttempts) {
        const delay = Math.pow(2, attempts) * 1000; // Backoff exponentiel
        console.log(`⏳ Attente ${delay}ms avant retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  if (!result?.success) {
    console.error('❌ Échec après toutes les tentatives');
    return;
  }
  
  // Monitoring avec timeout adaptatif
  if (result.runId) {
    console.log(`👀 Monitoring adaptatif du run ${result.runId}...`);
    
    let checkCount = 0;
    const maxChecks = 20; // Maximum 20 vérifications
    
    while (checkCount < maxChecks) {
      checkCount++;
      
      const status = await fallback.checkWorkflowStatus(result.runId);
      
      if (!status) {
        console.warn(`⚠️ Impossible de récupérer le statut (check ${checkCount})`);
        break;
      }
      
      console.log(`📊 Check ${checkCount}: ${status.status} (${status.conclusion || 'en cours'})`);
      
      // Workflow terminé
      if (status.status === 'completed' || status.status === 'cancelled' || status.status === 'failure') {
        console.log(`🏁 Workflow terminé: ${status.conclusion}`);
        
        // Récupérer les logs finaux
        const logs = await fallback.getFormattedWorkflowLogs(result.runId);
        console.log(`📋 Logs finaux: ${logs.length} lignes`);
        
        // Afficher un résumé des logs
        const errorLines = logs.filter(line => line.toLowerCase().includes('error'));
        const successLines = logs.filter(line => line.includes('✅'));
        
        console.log(`   Erreurs détectées: ${errorLines.length}`);
        console.log(`   Succès détectés: ${successLines.length}`);
        
        break;
      }
      
      // Attendre avant la prochaine vérification
      const delay = checkCount < 5 ? 10000 : 30000; // 10s puis 30s
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    if (checkCount >= maxChecks) {
      console.warn('⏱️ Timeout du monitoring - Workflow peut encore être en cours');
    }
  }
}

/**
 * Exemple 5: Dashboard simple des workflows
 */
export async function displayWorkflowDashboard() {
  console.log('📊 === DASHBOARD GITHUB ACTIONS FALLBACK ===\n');
  
  const fallback = new GitHubActionsFallback();
  const manager = new FallbackManager();
  
  // Configuration
  console.log('🔧 Configuration:');
  const config = fallback.getConfiguration();
  console.log(`   Repository: ${config.owner}/${config.repo}`);
  console.log(`   Token configuré: ${config.hasToken ? '✅' : '❌'}`);
  console.log(`   Statut: ${fallback.isConfigured() ? '✅ Opérationnel' : '❌ Configuration incomplète'}`);
  console.log('');
  
  // Workflows disponibles
  console.log('📋 Workflows disponibles:');
  const workflows = await fallback.listAvailableWorkflows();
  
  if (workflows.length === 0) {
    console.log('   Aucun workflow de fallback trouvé');
  } else {
    for (const workflow of workflows) {
      console.log(`   📄 ${workflow.name}`);
      
      // Historique récent
      const history = await fallback.getRecentWorkflowRuns(workflow.path.split('/').pop()!, 3);
      
      if (history.length > 0) {
        console.log('      Runs récents:');
        history.forEach((run, index) => {
          const date = new Date(run.created_at).toLocaleDateString('fr-FR');
          const time = new Date(run.created_at).toLocaleTimeString('fr-FR');
          const statusIcon = run.conclusion === 'success' ? '✅' : 
                           run.conclusion === 'failure' ? '❌' : 
                           run.status === 'in_progress' ? '🔄' : '⏳';
          
          console.log(`      ${index + 1}. ${statusIcon} ${date} ${time} - ${run.status}`);
        });
      } else {
        console.log('      Aucun run récent');
      }
      console.log('');
    }
  }
  
  // Santé du système
  console.log('🏥 Santé du système:');
  const health = await manager.checkSystemHealth();
  
  const healthIcons = {
    healthy: '✅',
    warning: '⚠️',
    unhealthy: '❌',
    unknown: '❓'
  };
  
  console.log(`   Cron Jobs Vercel: ${healthIcons[health.vercelCrons]} ${health.vercelCrons}`);
  console.log(`   API Vercel: ${healthIcons[health.vercelApi]} ${health.vercelApi}`);
  console.log(`   Base de données: ${healthIcons[health.database]} ${health.database}`);
  console.log(`   Dernier audit: ${health.timeSinceLastAudit.toFixed(1)}h`);
  
  // Recommandations
  console.log('\n💡 Recommandations:');
  
  if (!fallback.isConfigured()) {
    console.log('   ⚠️ Configurer les tokens GitHub pour activer le fallback');
  }
  
  if (health.vercelCrons === 'unhealthy') {
    console.log('   🚨 Activer le fallback d\'urgence - Cron jobs Vercel en panne');
  } else if (health.vercelCrons === 'warning') {
    console.log('   ⚠️ Surveiller les cron jobs Vercel - Retard détecté');
  }
  
  if (health.database === 'slow') {
    console.log('   🐌 Base de données lente - Considérer l\'optimisation');
  } else if (health.database === 'unhealthy') {
    console.log('   🚨 Base de données inaccessible - Intervention urgente requise');
  }
  
  if (workflows.length === 0) {
    console.log('   📋 Aucun workflow de fallback configuré - Vérifier les fichiers .github/workflows/');
  }
  
  console.log('\n🎯 Dashboard terminé!');
}

// Export des exemples pour utilisation
export const examples = {
  triggerUrgentAlert,
  performEmergencyMaintenance,
  monitorSystemHealth,
  robustWorkflowExecution,
  displayWorkflowDashboard
};