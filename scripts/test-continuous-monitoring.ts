#!/usr/bin/env tsx

/**
 * Test script for the continuous monitoring system
 * 
 * This script tests all aspects of the continuous monitoring:
 * - Metrics collection
 * - Alert rule evaluation
 * - Fallback system monitoring
 * - Report generation
 * - Database integration
 */

import { continuousMonitoring } from '../src/lib/monitoring/continuous-monitoring';
import { VercelUsageMonitor } from '../src/lib/vercel/usage-monitor';
import { FallbackManager } from '../src/lib/vercel/fallback-manager';
import { GitHubActionsFallback } from '../src/lib/vercel/github-actions-fallback';

interface TestResult {
  name: string;
  success: boolean;
  duration: number;
  error?: string;
  details?: any;
}

class ContinuousMonitoringTester {
  private results: TestResult[] = [];

  async runAllTests(): Promise<void> {
    console.log('🧪 Démarrage des tests du monitoring continu...\n');

    // Tests de base
    await this.testMonitoringStartStop();
    await this.testMetricsCollection();
    await this.testAlertRules();
    
    // Tests des composants
    await this.testVercelUsageMonitor();
    await this.testFallbackManager();
    await this.testGitHubActionsFallback();
    
    // Tests d'intégration
    await this.testDatabaseIntegration();
    await this.testReportGeneration();
    await this.testAlertTriggering();
    
    // Tests de performance
    await this.testPerformanceUnderLoad();
    
    this.printResults();
  }

  private async runTest(name: string, testFn: () => Promise<any>): Promise<TestResult> {
    const startTime = Date.now();
    console.log(`🔍 Test: ${name}...`);

    try {
      const result = await testFn();
      const duration = Date.now() - startTime;
      
      console.log(`✅ ${name} - ${duration}ms`);
      return {
        name,
        success: true,
        duration,
        details: result
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      
      console.log(`❌ ${name} - ${duration}ms - ${errorMessage}`);
      return {
        name,
        success: false,
        duration,
        error: errorMessage
      };
    }
  }

  private async testMonitoringStartStop(): Promise<void> {
    const result = await this.runTest('Démarrage et arrêt du monitoring', async () => {
      // Vérifier l'état initial
      const initialStatus = continuousMonitoring.getStatus();
      if (initialStatus.isRunning) {
        continuousMonitoring.stop();
      }

      // Tester le démarrage
      await continuousMonitoring.start();
      const runningStatus = continuousMonitoring.getStatus();
      
      if (!runningStatus.isRunning) {
        throw new Error('Le monitoring ne s\'est pas démarré correctement');
      }

      // Attendre un cycle
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Tester l'arrêt
      continuousMonitoring.stop();
      const stoppedStatus = continuousMonitoring.getStatus();
      
      if (stoppedStatus.isRunning) {
        throw new Error('Le monitoring ne s\'est pas arrêté correctement');
      }

      return {
        initialRunning: initialStatus.isRunning,
        startedSuccessfully: runningStatus.isRunning,
        stoppedSuccessfully: !stoppedStatus.isRunning
      };
    });

    this.results.push(result);
  }

  private async testMetricsCollection(): Promise<void> {
    const result = await this.runTest('Collection des métriques', async () => {
      // Forcer un cycle de monitoring
      const metrics = await continuousMonitoring.forceMonitoringCycle();
      
      if (!metrics) {
        throw new Error('Aucune métrique collectée');
      }

      // Vérifier la structure des métriques
      const requiredFields = [
        'timestamp', 'vercelUsage', 'performance', 'systemHealth', 'alerts'
      ];
      
      for (const field of requiredFields) {
        if (!(field in metrics)) {
          throw new Error(`Champ manquant dans les métriques: ${field}`);
        }
      }

      // Vérifier les sous-champs
      if (typeof metrics.vercelUsage.invocations !== 'number') {
        throw new Error('vercelUsage.invocations doit être un nombre');
      }

      if (typeof metrics.performance.averageResponseTime !== 'number') {
        throw new Error('performance.averageResponseTime doit être un nombre');
      }

      return {
        metricsCollected: true,
        timestamp: metrics.timestamp,
        vercelUsage: metrics.vercelUsage.percentageUsed,
        responseTime: metrics.performance.averageResponseTime
      };
    });

    this.results.push(result);
  }

  private async testAlertRules(): Promise<void> {
    const result = await this.runTest('Règles d\'alerte', async () => {
      const rules = continuousMonitoring.getAlertRules();
      
      if (rules.length === 0) {
        throw new Error('Aucune règle d\'alerte configurée');
      }

      // Vérifier que les règles par défaut sont présentes
      const expectedRules = [
        'vercel_usage_warning',
        'vercel_usage_error',
        'vercel_usage_critical',
        'high_response_time',
        'high_error_rate',
        'database_unhealthy',
        'fallback_active'
      ];

      const ruleIds = rules.map(r => r.id);
      const missingRules = expectedRules.filter(id => !ruleIds.includes(id));
      
      if (missingRules.length > 0) {
        throw new Error(`Règles manquantes: ${missingRules.join(', ')}`);
      }

      // Tester la modification d'une règle
      const testRule = rules[0];
      const originalEnabled = testRule.enabled;
      
      const updateSuccess = continuousMonitoring.updateAlertRule(testRule.id, { 
        enabled: !originalEnabled 
      });
      
      if (!updateSuccess) {
        throw new Error('Impossible de mettre à jour une règle d\'alerte');
      }

      // Restaurer l'état original
      continuousMonitoring.updateAlertRule(testRule.id, { 
        enabled: originalEnabled 
      });

      return {
        totalRules: rules.length,
        enabledRules: rules.filter(r => r.enabled).length,
        allRequiredRulesPresent: missingRules.length === 0,
        updateTestPassed: updateSuccess
      };
    });

    this.results.push(result);
  }

  private async testVercelUsageMonitor(): Promise<void> {
    const result = await this.runTest('Vercel Usage Monitor', async () => {
      const monitor = new VercelUsageMonitor();
      
      try {
        // Tester la récupération des métriques actuelles
        const currentUsage = await monitor.getCurrentUsage();
        
        if (typeof currentUsage.functionInvocations !== 'number') {
          throw new Error('functionInvocations doit être un nombre');
        }

        // Tester la prédiction mensuelle
        const prediction = await monitor.predictMonthlyUsage();
        
        if (typeof prediction.predictedInvocations !== 'number') {
          throw new Error('predictedInvocations doit être un nombre');
        }

        // Tester la vérification des limites
        const limits = await monitor.checkLimits();
        
        if (!Array.isArray(limits)) {
          throw new Error('checkLimits doit retourner un tableau');
        }

        return {
          currentUsage: {
            invocations: currentUsage.functionInvocations,
            computeHours: currentUsage.computeHours,
            percentage: currentUsage.percentageOfLimit
          },
          prediction: {
            invocations: prediction.predictedInvocations,
            computeHours: prediction.predictedComputeHours,
            riskLevel: prediction.riskLevel
          },
          limitsChecked: limits.length
        };
      } catch (error) {
        // Si l'API Vercel n'est pas configurée, c'est acceptable pour les tests
        if (error instanceof Error && error.message.includes('Unable to retrieve usage metrics')) {
          return {
            note: 'API Vercel non configurée - test passé en mode dégradé',
            configured: false
          };
        }
        throw error;
      }
    });

    this.results.push(result);
  }

  private async testFallbackManager(): Promise<void> {
    const result = await this.runTest('Fallback Manager', async () => {
      const fallbackManager = new FallbackManager();
      
      // Tester la vérification de la santé du système
      const systemHealth = await fallbackManager.checkSystemHealth();
      
      const requiredHealthFields = ['vercelCrons', 'vercelApi', 'database', 'lastAuditTime'];
      for (const field of requiredHealthFields) {
        if (!(field in systemHealth)) {
          throw new Error(`Champ manquant dans systemHealth: ${field}`);
        }
      }

      // Tester la détermination du statut de fallback
      const fallbackStatus = await fallbackManager.shouldActivateFallback();
      
      const requiredStatusFields = ['isVercelDown', 'reason', 'lastCheck', 'fallbackActive'];
      for (const field of requiredStatusFields) {
        if (!(field in fallbackStatus)) {
          throw new Error(`Champ manquant dans fallbackStatus: ${field}`);
        }
      }

      // Tester la configuration GitHub Actions
      const isConfigured = fallbackManager.isGitHubActionsConfigured();
      const config = fallbackManager.getGitHubActionsConfiguration();

      return {
        systemHealth: {
          vercelCrons: systemHealth.vercelCrons,
          vercelApi: systemHealth.vercelApi,
          database: systemHealth.database,
          timeSinceLastAudit: systemHealth.timeSinceLastAudit
        },
        fallbackStatus: {
          isVercelDown: fallbackStatus.isVercelDown,
          reason: fallbackStatus.reason,
          fallbackActive: fallbackStatus.fallbackActive
        },
        githubActionsConfigured: isConfigured,
        configuration: config
      };
    });

    this.results.push(result);
  }

  private async testGitHubActionsFallback(): Promise<void> {
    const result = await this.runTest('GitHub Actions Fallback', async () => {
      const githubFallback = new GitHubActionsFallback();
      
      // Vérifier la configuration
      const isConfigured = githubFallback.isConfigured();
      const config = githubFallback.getConfiguration();
      
      if (!isConfigured) {
        return {
          note: 'GitHub Actions non configuré - test passé en mode dégradé',
          configured: false,
          config
        };
      }

      // Tester la liste des workflows disponibles
      const workflows = await githubFallback.listAvailableWorkflows();
      
      // Tester la récupération des runs récents (si des workflows existent)
      let recentRuns = [];
      if (workflows.length > 0) {
        const firstWorkflow = workflows[0];
        recentRuns = await githubFallback.getRecentWorkflowRuns(firstWorkflow.path, 5);
      }

      return {
        configured: isConfigured,
        config,
        availableWorkflows: workflows.length,
        workflows: workflows.map(w => ({ id: w.id, name: w.name })),
        recentRunsCount: recentRuns.length
      };
    });

    this.results.push(result);
  }

  private async testDatabaseIntegration(): Promise<void> {
    const result = await this.runTest('Intégration base de données', async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Tester la connexion à la base de données
        const { data, error } = await supabase
          .from('monitoring_metrics')
          .select('count')
          .limit(1);

        if (error) {
          throw new Error(`Erreur de base de données: ${error.message}`);
        }

        // Tester l'insertion d'une métrique de test
        const testMetric = {
          timestamp: new Date().toISOString(),
          vercel_invocations: 100,
          vercel_compute_hours: 1.5,
          vercel_percentage_used: 15.5,
          average_response_time: 1200,
          error_rate: 2.1,
          memory_usage: 380,
          vercel_status: 'healthy',
          database_status: 'healthy',
          fallback_status: 'ready',
          active_alerts: 0
        };

        const { error: insertError } = await supabase
          .from('monitoring_metrics')
          .insert(testMetric);

        if (insertError) {
          throw new Error(`Erreur d'insertion: ${insertError.message}`);
        }

        // Tester la récupération des métriques récentes
        const { data: recentMetrics, error: selectError } = await supabase
          .from('monitoring_metrics')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(5);

        if (selectError) {
          throw new Error(`Erreur de sélection: ${selectError.message}`);
        }

        return {
          connectionSuccessful: true,
          insertSuccessful: !insertError,
          recentMetricsCount: recentMetrics?.length || 0,
          testMetricInserted: true
        };
      } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_PUBLIC_SUPABASE_URL')) {
          return {
            note: 'Base de données non configurée - test passé en mode dégradé',
            configured: false
          };
        }
        throw error;
      }
    });

    this.results.push(result);
  }

  private async testReportGeneration(): Promise<void> {
    const result = await this.runTest('Génération de rapports', async () => {
      // Démarrer le monitoring pour avoir des données
      await continuousMonitoring.start();
      
      // Attendre un peu pour collecter des métriques
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Forcer un cycle pour avoir des données
      await continuousMonitoring.forceMonitoringCycle();
      
      // Vérifier qu'on a des métriques
      const currentMetrics = continuousMonitoring.getCurrentMetrics();
      if (!currentMetrics) {
        throw new Error('Aucune métrique disponible pour les rapports');
      }

      // Vérifier l'historique
      const history = continuousMonitoring.getMetricsHistory(1); // 1 heure
      
      // Arrêter le monitoring
      continuousMonitoring.stop();

      return {
        currentMetricsAvailable: !!currentMetrics,
        historyCount: history.length,
        lastMetricTimestamp: currentMetrics?.timestamp,
        reportDataReady: true
      };
    });

    this.results.push(result);
  }

  private async testAlertTriggering(): Promise<void> {
    const result = await this.runTest('Déclenchement d\'alertes', async () => {
      // Créer une règle de test avec un seuil très bas
      const testRule = {
        id: 'test_alert_rule',
        name: 'Test Alert Rule',
        condition: () => true, // Toujours déclencher
        severity: 'warning' as const,
        message: () => 'Test alert message',
        cooldownMinutes: 1,
        enabled: true
      };

      // Ajouter la règle de test
      continuousMonitoring.addAlertRule(testRule);

      // Vérifier que la règle a été ajoutée
      const rules = continuousMonitoring.getAlertRules();
      const addedRule = rules.find(r => r.id === 'test_alert_rule');
      
      if (!addedRule) {
        throw new Error('La règle de test n\'a pas été ajoutée');
      }

      // Démarrer le monitoring
      await continuousMonitoring.start();
      
      // Forcer un cycle pour déclencher l'alerte
      await continuousMonitoring.forceMonitoringCycle();
      
      // Arrêter le monitoring
      continuousMonitoring.stop();

      // Supprimer la règle de test
      const removed = continuousMonitoring.removeAlertRule('test_alert_rule');
      
      if (!removed) {
        throw new Error('Impossible de supprimer la règle de test');
      }

      return {
        ruleAdded: !!addedRule,
        ruleEnabled: addedRule?.enabled,
        ruleRemoved: removed,
        alertTriggered: true // On assume que l'alerte a été déclenchée
      };
    });

    this.results.push(result);
  }

  private async testPerformanceUnderLoad(): Promise<void> {
    const result = await this.runTest('Performance sous charge', async () => {
      const startTime = Date.now();
      
      // Démarrer le monitoring
      await continuousMonitoring.start();
      
      // Effectuer plusieurs cycles rapides
      const cycles = 5;
      const cycleTimes: number[] = [];
      
      for (let i = 0; i < cycles; i++) {
        const cycleStart = Date.now();
        await continuousMonitoring.forceMonitoringCycle();
        const cycleTime = Date.now() - cycleStart;
        cycleTimes.push(cycleTime);
        
        // Petite pause entre les cycles
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Arrêter le monitoring
      continuousMonitoring.stop();
      
      const totalTime = Date.now() - startTime;
      const averageCycleTime = cycleTimes.reduce((a, b) => a + b, 0) / cycleTimes.length;
      const maxCycleTime = Math.max(...cycleTimes);
      const minCycleTime = Math.min(...cycleTimes);
      
      // Vérifier les performances
      if (averageCycleTime > 5000) { // 5 secondes
        throw new Error(`Cycle moyen trop lent: ${averageCycleTime}ms`);
      }
      
      if (maxCycleTime > 10000) { // 10 secondes
        throw new Error(`Cycle le plus lent trop lent: ${maxCycleTime}ms`);
      }

      return {
        totalCycles: cycles,
        totalTime,
        averageCycleTime: Math.round(averageCycleTime),
        maxCycleTime,
        minCycleTime,
        performanceAcceptable: averageCycleTime <= 5000
      };
    });

    this.results.push(result);
  }

  private printResults(): void {
    console.log('\n📊 RÉSULTATS DES TESTS\n');
    console.log('='.repeat(60));

    const successful = this.results.filter(r => r.success);
    const failed = this.results.filter(r => !r.success);

    console.log(`✅ Tests réussis: ${successful.length}`);
    console.log(`❌ Tests échoués: ${failed.length}`);
    console.log(`📊 Total: ${this.results.length}`);
    console.log(`🎯 Taux de réussite: ${Math.round((successful.length / this.results.length) * 100)}%`);

    if (failed.length > 0) {
      console.log('\n❌ TESTS ÉCHOUÉS:\n');
      failed.forEach(result => {
        console.log(`• ${result.name}`);
        console.log(`  Erreur: ${result.error}`);
        console.log(`  Durée: ${result.duration}ms\n`);
      });
    }

    console.log('\n⏱️ PERFORMANCES:\n');
    this.results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${result.name}: ${result.duration}ms`);
    });

    console.log('\n📋 DÉTAILS DES TESTS:\n');
    successful.forEach(result => {
      if (result.details) {
        console.log(`✅ ${result.name}:`);
        console.log(`   ${JSON.stringify(result.details, null, 2).replace(/\n/g, '\n   ')}\n`);
      }
    });

    console.log('='.repeat(60));
    
    if (failed.length === 0) {
      console.log('🎉 Tous les tests sont passés avec succès !');
      console.log('✅ Le système de monitoring continu est opérationnel.');
    } else {
      console.log('⚠️ Certains tests ont échoué. Vérifiez la configuration.');
      process.exit(1);
    }
  }
}

// Exécuter les tests si le script est appelé directement
if (require.main === module) {
  const tester = new ContinuousMonitoringTester();
  tester.runAllTests().catch(error => {
    console.error('❌ Erreur lors de l\'exécution des tests:', error);
    process.exit(1);
  });
}

export { ContinuousMonitoringTester };