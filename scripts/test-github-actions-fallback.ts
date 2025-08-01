#!/usr/bin/env tsx

/**
 * Test Script - GitHub Actions Fallback Integration
 * 
 * Ce script teste l'intégration complète avec l'API GitHub Actions :
 * - Déclenchement des workflows
 * - Monitoring du statut
 * - Récupération des logs
 * - Gestion des erreurs
 */

import { GitHubActionsFallback } from '../src/lib/vercel/github-actions-fallback';
import { FallbackManager } from '../src/lib/vercel/fallback-manager';

interface TestResult {
  name: string;
  success: boolean;
  duration: number;
  details?: any;
  error?: string;
}

class GitHubActionsFallbackTester {
  private githubFallback: GitHubActionsFallback;
  private fallbackManager: FallbackManager;
  private results: TestResult[] = [];

  constructor() {
    this.githubFallback = new GitHubActionsFallback();
    this.fallbackManager = new FallbackManager();
  }

  /**
   * Lance tous les tests
   */
  async runAllTests(): Promise<void> {
    console.log('🧪 === TEST GITHUB ACTIONS FALLBACK INTEGRATION ===\n');

    // Tests de configuration
    await this.testConfiguration();
    
    // Tests de base
    await this.testWorkflowListing();
    await this.testWorkflowHistory();
    
    // Tests de déclenchement (seulement si configuré)
    if (this.githubFallback.isConfigured()) {
      await this.testWorkflowTrigger();
      await this.testWorkflowMonitoring();
      await this.testLogRetrieval();
    } else {
      console.log('⚠️ Configuration GitHub incomplète - Tests de déclenchement ignorés\n');
    }

    // Tests d'intégration avec FallbackManager
    await this.testFallbackManagerIntegration();

    // Afficher le résumé
    this.displaySummary();
  }

  /**
   * Test de la configuration GitHub Actions
   */
  private async testConfiguration(): Promise<void> {
    const startTime = Date.now();
    
    try {
      console.log('🔧 Test de la configuration GitHub Actions...');
      
      const config = this.githubFallback.getConfiguration();
      const isConfigured = this.githubFallback.isConfigured();
      
      console.log(`   Token GitHub: ${config.hasToken ? '✅ Configuré' : '❌ Manquant'}`);
      console.log(`   Repository: ${config.owner}/${config.repo}`);
      console.log(`   Base URL: ${config.baseUrl}`);
      console.log(`   Configuration complète: ${isConfigured ? '✅' : '❌'}`);
      
      this.results.push({
        name: 'Configuration GitHub Actions',
        success: true,
        duration: Date.now() - startTime,
        details: { config, isConfigured }
      });
      
      console.log('✅ Test de configuration terminé\n');
    } catch (error) {
      this.results.push({
        name: 'Configuration GitHub Actions',
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
      
      console.error('❌ Erreur lors du test de configuration:', error);
      console.log('');
    }
  }

  /**
   * Test de la liste des workflows disponibles
   */
  private async testWorkflowListing(): Promise<void> {
    const startTime = Date.now();
    
    try {
      console.log('📋 Test de la liste des workflows...');
      
      const workflows = await this.githubFallback.listAvailableWorkflows();
      
      console.log(`   Workflows trouvés: ${workflows.length}`);
      workflows.forEach(workflow => {
        console.log(`   - ${workflow.name} (${workflow.path})`);
      });
      
      this.results.push({
        name: 'Liste des workflows',
        success: true,
        duration: Date.now() - startTime,
        details: { workflowCount: workflows.length, workflows }
      });
      
      console.log('✅ Test de liste des workflows terminé\n');
    } catch (error) {
      this.results.push({
        name: 'Liste des workflows',
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
      
      console.error('❌ Erreur lors du test de liste des workflows:', error);
      console.log('');
    }
  }

  /**
   * Test de l'historique des workflows
   */
  private async testWorkflowHistory(): Promise<void> {
    const startTime = Date.now();
    
    try {
      console.log('📊 Test de l\'historique des workflows...');
      
      const workflowFile = 'fallback-health-monitoring.yml';
      const history = await this.githubFallback.getRecentWorkflowRuns(workflowFile, 5);
      
      console.log(`   Runs récents pour ${workflowFile}: ${history.length}`);
      history.forEach((run, index) => {
        console.log(`   ${index + 1}. Run ${run.id}: ${run.status} (${run.conclusion || 'en cours'})`);
        console.log(`      Créé: ${new Date(run.created_at).toLocaleString('fr-FR')}`);
      });
      
      this.results.push({
        name: 'Historique des workflows',
        success: true,
        duration: Date.now() - startTime,
        details: { historyCount: history.length, workflowFile }
      });
      
      console.log('✅ Test d\'historique des workflows terminé\n');
    } catch (error) {
      this.results.push({
        name: 'Historique des workflows',
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
      
      console.error('❌ Erreur lors du test d\'historique des workflows:', error);
      console.log('');
    }
  }

  /**
   * Test de déclenchement de workflow (mode test)
   */
  private async testWorkflowTrigger(): Promise<void> {
    const startTime = Date.now();
    
    try {
      console.log('🚀 Test de déclenchement de workflow (monitoring de santé)...');
      
      // Déclencher le workflow de monitoring de santé avec un check détaillé
      const result = await this.githubFallback.triggerHealthMonitoring(true);
      
      console.log(`   Déclenchement: ${result.success ? '✅ Réussi' : '❌ Échoué'}`);
      if (result.success) {
        console.log(`   Run ID: ${result.runId}`);
        console.log(`   URL: ${result.workflowUrl}`);
        console.log(`   Durée estimée: ${result.estimatedDuration}s`);
      } else {
        console.log(`   Erreur: ${result.error}`);
      }
      
      this.results.push({
        name: 'Déclenchement de workflow',
        success: result.success,
        duration: Date.now() - startTime,
        details: result
      });
      
      console.log('✅ Test de déclenchement terminé\n');
    } catch (error) {
      this.results.push({
        name: 'Déclenchement de workflow',
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
      
      console.error('❌ Erreur lors du test de déclenchement:', error);
      console.log('');
    }
  }

  /**
   * Test de monitoring de workflow
   */
  private async testWorkflowMonitoring(): Promise<void> {
    const startTime = Date.now();
    
    try {
      console.log('👀 Test de monitoring de workflow...');
      
      // Récupérer le dernier run du workflow de monitoring
      const recentRuns = await this.githubFallback.getRecentWorkflowRuns('fallback-health-monitoring.yml', 1);
      
      if (recentRuns.length === 0) {
        console.log('   Aucun run récent trouvé pour le monitoring');
        this.results.push({
          name: 'Monitoring de workflow',
          success: true,
          duration: Date.now() - startTime,
          details: { message: 'Aucun run récent à monitorer' }
        });
        console.log('✅ Test de monitoring terminé (aucun run à monitorer)\n');
        return;
      }

      const runId = recentRuns[0].id;
      console.log(`   Monitoring du run ${runId}...`);
      
      // Vérifier le statut du workflow
      const status = await this.githubFallback.checkWorkflowStatus(runId);
      
      if (status) {
        console.log(`   Statut: ${status.status}`);
        console.log(`   Conclusion: ${status.conclusion || 'En cours'}`);
        console.log(`   Créé: ${new Date(status.created_at).toLocaleString('fr-FR')}`);
        console.log(`   Mis à jour: ${new Date(status.updated_at).toLocaleString('fr-FR')}`);
        
        // Récupérer les détails complets si le workflow est terminé
        if (status.status === 'completed') {
          const workflowRun = await this.githubFallback.getWorkflowRun(runId);
          if (workflowRun) {
            console.log(`   Jobs: ${workflowRun.jobs.length}`);
            workflowRun.jobs.forEach(job => {
              console.log(`     - ${job.name}: ${job.status} (${job.conclusion || 'en cours'})`);
            });
          }
        }
      } else {
        console.log('   ❌ Impossible de récupérer le statut du workflow');
      }
      
      this.results.push({
        name: 'Monitoring de workflow',
        success: !!status,
        duration: Date.now() - startTime,
        details: { runId, status }
      });
      
      console.log('✅ Test de monitoring terminé\n');
    } catch (error) {
      this.results.push({
        name: 'Monitoring de workflow',
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
      
      console.error('❌ Erreur lors du test de monitoring:', error);
      console.log('');
    }
  }

  /**
   * Test de récupération des logs
   */
  private async testLogRetrieval(): Promise<void> {
    const startTime = Date.now();
    
    try {
      console.log('📋 Test de récupération des logs...');
      
      // Récupérer le dernier run terminé
      const recentRuns = await this.githubFallback.getRecentWorkflowRuns('fallback-health-monitoring.yml', 5);
      const completedRun = recentRuns.find(run => run.status === 'completed');
      
      if (!completedRun) {
        console.log('   Aucun run terminé trouvé pour récupérer les logs');
        this.results.push({
          name: 'Récupération des logs',
          success: true,
          duration: Date.now() - startTime,
          details: { message: 'Aucun run terminé trouvé' }
        });
        console.log('✅ Test de récupération des logs terminé (aucun run terminé)\n');
        return;
      }

      const runId = completedRun.id;
      console.log(`   Récupération des logs du run ${runId}...`);
      
      // Récupérer les logs formatés
      const logs = await this.githubFallback.getFormattedWorkflowLogs(runId);
      
      console.log(`   Logs récupérés: ${logs.length} lignes`);
      if (logs.length > 0) {
        console.log('   Aperçu des logs:');
        logs.slice(0, 5).forEach(line => {
          console.log(`     ${line.substring(0, 100)}${line.length > 100 ? '...' : ''}`);
        });
        if (logs.length > 5) {
          console.log(`     ... et ${logs.length - 5} lignes supplémentaires`);
        }
      }
      
      // Récupérer les logs détaillés
      const detailedLogs = await this.githubFallback.getWorkflowLogs(runId);
      if (detailedLogs) {
        console.log(`   Jobs avec logs: ${detailedLogs.jobs.length}`);
        console.log(`   Taille totale: ${detailedLogs.totalSize} caractères`);
      }
      
      this.results.push({
        name: 'Récupération des logs',
        success: logs.length > 0,
        duration: Date.now() - startTime,
        details: { 
          runId, 
          logLines: logs.length, 
          totalSize: detailedLogs?.totalSize || 0,
          jobCount: detailedLogs?.jobs.length || 0
        }
      });
      
      console.log('✅ Test de récupération des logs terminé\n');
    } catch (error) {
      this.results.push({
        name: 'Récupération des logs',
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
      
      console.error('❌ Erreur lors du test de récupération des logs:', error);
      console.log('');
    }
  }

  /**
   * Test d'intégration avec FallbackManager
   */
  private async testFallbackManagerIntegration(): Promise<void> {
    const startTime = Date.now();
    
    try {
      console.log('🔗 Test d\'intégration avec FallbackManager...');
      
      // Tester la configuration GitHub Actions via FallbackManager
      const isConfigured = this.fallbackManager.isGitHubActionsConfigured();
      const config = this.fallbackManager.getGitHubActionsConfiguration();
      
      console.log(`   Configuration via FallbackManager: ${isConfigured ? '✅' : '❌'}`);
      console.log(`   Repository: ${config.owner}/${config.repo}`);
      
      // Tester la liste des workflows via FallbackManager
      const workflows = await this.fallbackManager.listAvailableWorkflows();
      console.log(`   Workflows disponibles: ${workflows.length}`);
      
      // Tester l'historique via FallbackManager
      const history = await this.fallbackManager.getWorkflowHistory('fallback-health-monitoring.yml', 3);
      console.log(`   Historique récent: ${history.length} runs`);
      
      this.results.push({
        name: 'Intégration FallbackManager',
        success: true,
        duration: Date.now() - startTime,
        details: { 
          isConfigured, 
          workflowCount: workflows.length, 
          historyCount: history.length 
        }
      });
      
      console.log('✅ Test d\'intégration FallbackManager terminé\n');
    } catch (error) {
      this.results.push({
        name: 'Intégration FallbackManager',
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
      
      console.error('❌ Erreur lors du test d\'intégration FallbackManager:', error);
      console.log('');
    }
  }

  /**
   * Affiche le résumé des tests
   */
  private displaySummary(): void {
    console.log('📊 === RÉSUMÉ DES TESTS ===\n');
    
    const totalTests = this.results.length;
    const successfulTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - successfulTests;
    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);
    
    console.log(`Total des tests: ${totalTests}`);
    console.log(`Réussis: ${successfulTests} ✅`);
    console.log(`Échoués: ${failedTests} ❌`);
    console.log(`Durée totale: ${totalDuration}ms`);
    console.log(`Taux de réussite: ${((successfulTests / totalTests) * 100).toFixed(1)}%\n`);
    
    // Détails des tests échoués
    const failedResults = this.results.filter(r => !r.success);
    if (failedResults.length > 0) {
      console.log('❌ Tests échoués:');
      failedResults.forEach(result => {
        console.log(`   - ${result.name}: ${result.error}`);
      });
      console.log('');
    }
    
    // Détails des tests réussis
    console.log('✅ Tests réussis:');
    this.results.filter(r => r.success).forEach(result => {
      console.log(`   - ${result.name} (${result.duration}ms)`);
    });
    
    console.log('\n🎯 Tests GitHub Actions Fallback terminés!');
    
    if (failedTests === 0) {
      console.log('🎉 Tous les tests sont passés avec succès!');
    } else {
      console.log('⚠️ Certains tests ont échoué - Vérifiez la configuration et les logs ci-dessus.');
    }
  }
}

// Exécution des tests
async function main() {
  const tester = new GitHubActionsFallbackTester();
  await tester.runAllTests();
}

// Lancer les tests si ce script est exécuté directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Erreur fatale lors des tests:', error);
    process.exit(1);
  });
}

export { GitHubActionsFallbackTester };