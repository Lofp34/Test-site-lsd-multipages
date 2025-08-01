#!/usr/bin/env tsx

/**
 * Test script pour le DegradationManager
 * 
 * Ce script teste toutes les fonctionnalités du système de dégradation gracieuse :
 * - Évaluation de la charge système
 * - Changement automatique de niveau de service
 * - Circuit breakers
 * - Notifications de dégradation
 */

import { DegradationManager, ServiceLevel } from '../src/lib/vercel/degradation-manager';

async function testDegradationManager() {
  console.log('🧪 Test du DegradationManager');
  console.log('================================\n');

  // 1. Initialisation
  console.log('1️⃣ Initialisation du DegradationManager...');
  const degradationManager = new DegradationManager({
    checkInterval: 5000, // 5 secondes pour les tests
    stabilityPeriod: 10000, // 10 secondes pour les tests
    notificationCooldown: 15000, // 15 secondes pour les tests
  });

  console.log('✅ DegradationManager initialisé');
  console.log('📊 État initial:', degradationManager.getCurrentStatus());
  console.log();

  // 2. Test d'évaluation de la charge système
  console.log('2️⃣ Test d\'évaluation de la charge système...');
  try {
    const systemLoad = await degradationManager.assessSystemLoad();
    console.log('✅ Charge système évaluée:', systemLoad);
  } catch (error) {
    console.error('❌ Erreur lors de l\'évaluation:', error);
  }
  console.log();

  // 3. Test des circuit breakers
  console.log('3️⃣ Test des circuit breakers...');
  
  // Test d'une opération qui réussit
  try {
    const result = await degradationManager.executeWithCircuitBreaker(
      'test_service',
      async () => {
        console.log('  🔄 Exécution d\'une opération qui réussit...');
        await new Promise(resolve => setTimeout(resolve, 100));
        return 'success';
      },
      { threshold: 3, timeout: 5000 }
    );
    console.log('  ✅ Opération réussie:', result);
  } catch (error) {
    console.error('  ❌ Erreur inattendue:', error);
  }

  // Test d'une opération qui échoue
  console.log('  🔄 Test d\'opérations qui échouent...');
  for (let i = 1; i <= 4; i++) {
    try {
      await degradationManager.executeWithCircuitBreaker(
        'failing_service',
        async () => {
          throw new Error(`Échec simulé ${i}`);
        },
        { threshold: 3, timeout: 5000 }
      );
    } catch (error) {
      console.log(`  ❌ Échec ${i}/3:`, error.message);
    }
  }

  // Vérifier l'état du circuit breaker
  const circuitBreakerState = degradationManager.getCircuitBreakerStatus('failing_service');
  console.log('  🔍 État du circuit breaker:', circuitBreakerState);
  console.log();

  // 4. Test de changement forcé de niveau de service
  console.log('4️⃣ Test de changement de niveau de service...');
  
  const levels = [ServiceLevel.ESSENTIAL, ServiceLevel.MINIMAL, ServiceLevel.FALLBACK, ServiceLevel.FULL];
  
  for (const level of levels) {
    try {
      console.log(`  🔄 Changement vers ${level}...`);
      const changed = await degradationManager.forceServiceLevel(level, `Test de changement vers ${level}`);
      
      if (changed) {
        console.log(`  ✅ Changement effectué vers ${level}`);
      } else {
        console.log(`  ⏳ Changement en attente (période de stabilité)`);
      }
      
      const status = degradationManager.getCurrentStatus();
      console.log(`  📊 État actuel: ${status.currentLevel} (raison: ${status.reason})`);
      
      // Attendre un peu entre les changements
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`  ❌ Erreur lors du changement vers ${level}:`, error);
    }
  }
  console.log();

  // 5. Test du monitoring automatique
  console.log('5️⃣ Test du monitoring automatique...');
  console.log('  🔄 Démarrage du monitoring (10 secondes)...');
  
  degradationManager.startMonitoring();
  
  // Attendre 10 secondes pour voir le monitoring en action
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  degradationManager.stopMonitoring();
  console.log('  ⏹️ Monitoring arrêté');
  console.log();

  // 6. Test de vérification forcée
  console.log('6️⃣ Test de vérification forcée...');
  try {
    const status = await degradationManager.forceCheck();
    console.log('✅ Vérification forcée terminée');
    console.log('📊 État final:', {
      niveau: status.currentLevel,
      raison: status.reason,
      charge: status.systemLoad,
      prochaine_verification: status.nextCheck,
    });
  } catch (error) {
    console.error('❌ Erreur lors de la vérification forcée:', error);
  }
  console.log();

  // 7. Test des métriques et historique
  console.log('7️⃣ Test des métriques et historique...');
  
  const metricsHistory = degradationManager.getSystemMetricsHistory();
  console.log(`📈 Historique des métriques: ${metricsHistory.length} entrées`);
  
  if (metricsHistory.length > 0) {
    const latest = metricsHistory[metricsHistory.length - 1];
    console.log('📊 Dernières métriques:', {
      cpu: `${latest.cpuUsage.toFixed(1)}%`,
      memory: `${latest.memoryUsage.toFixed(1)}%`,
      vercel: `${latest.vercelUsage.toFixed(1)}%`,
      errors: `${latest.errorRate.toFixed(1)}%`,
      responseTime: `${latest.responseTime.toFixed(0)}ms`,
    });
  }

  const allCircuitBreakers = degradationManager.getAllCircuitBreakers();
  console.log(`🛡️ Circuit breakers actifs: ${allCircuitBreakers.length}`);
  
  for (const breaker of allCircuitBreakers) {
    console.log(`  - ${breaker.name}: ${breaker.state} (échecs: ${breaker.failureCount}/${breaker.threshold})`);
  }
  console.log();

  // 8. Test de réinitialisation des circuit breakers
  console.log('8️⃣ Test de réinitialisation des circuit breakers...');
  
  const resetResult = degradationManager.resetCircuitBreaker('failing_service');
  console.log(`🔄 Réinitialisation du circuit breaker: ${resetResult ? 'succès' : 'échec'}`);
  
  const resetState = degradationManager.getCircuitBreakerStatus('failing_service');
  console.log('🔍 État après réinitialisation:', resetState);
  console.log();

  // 9. Résumé final
  console.log('9️⃣ Résumé final');
  console.log('================');
  
  const finalStatus = degradationManager.getCurrentStatus();
  console.log('📊 État final du système:');
  console.log(`  - Niveau de service: ${finalStatus.currentLevel}`);
  console.log(`  - Niveau précédent: ${finalStatus.previousLevel}`);
  console.log(`  - Dernière modification: ${finalStatus.changedAt.toISOString()}`);
  console.log(`  - Raison: ${finalStatus.reason}`);
  console.log(`  - Prochaine vérification: ${finalStatus.nextCheck.toISOString()}`);
  
  if (finalStatus.stabilityCountdown > 0) {
    console.log(`  - Période de stabilité: ${Math.round(finalStatus.stabilityCountdown / 1000)}s restantes`);
  }

  console.log('\n✅ Test du DegradationManager terminé avec succès!');
}

// Fonction utilitaire pour simuler une charge système élevée
async function simulateHighLoad() {
  console.log('⚡ Simulation d\'une charge système élevée...');
  
  // Simuler une charge CPU élevée
  const startTime = Date.now();
  while (Date.now() - startTime < 1000) {
    Math.random() * Math.random();
  }
  
  console.log('✅ Simulation de charge terminée');
}

// Fonction utilitaire pour tester la résilience
async function testResilience() {
  console.log('🛡️ Test de résilience du système...');
  
  const degradationManager = new DegradationManager();
  
  // Simuler plusieurs services qui échouent simultanément
  const services = ['database', 'vercel_api', 'link_validation', 'email_service'];
  
  for (const service of services) {
    try {
      await degradationManager.executeWithCircuitBreaker(
        service,
        async () => {
          throw new Error(`Service ${service} indisponible`);
        }
      );
    } catch (error) {
      console.log(`❌ ${service}: ${error.message}`);
    }
  }
  
  // Vérifier l'état de tous les circuit breakers
  const allBreakers = degradationManager.getAllCircuitBreakers();
  console.log('🔍 État des circuit breakers après échecs:');
  
  for (const breaker of allBreakers) {
    console.log(`  - ${breaker.name}: ${breaker.state} (${breaker.failureCount} échecs)`);
  }
  
  console.log('✅ Test de résilience terminé');
}

// Exécution du script
if (import.meta.url === `file://${process.argv[1]}`) {
  testDegradationManager()
    .then(() => {
      console.log('\n🎉 Tous les tests sont terminés!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Erreur lors des tests:', error);
      process.exit(1);
    });
}

export { testDegradationManager, simulateHighLoad, testResilience };