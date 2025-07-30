#!/usr/bin/env tsx

/**
 * Script de test pour le système de planification des audits
 */

import { getAuditScheduler } from '../src/lib/audit/scheduler';

async function testScheduler() {
  console.log('🧪 Test du système de planification...\n');

  try {
    const scheduler = getAuditScheduler();

    // Test 1: Vérifier la configuration
    console.log('1. Configuration du scheduler:');
    const config = scheduler.getConfig();
    console.log('   - Activé:', scheduler.isEnabled());
    console.log('   - Audit quotidien:', config.dailyAuditTime);
    console.log('   - Rapport hebdomadaire:', `${config.weeklyReportDay} à ${config.weeklyReportTime}`);
    console.log('   - Limite concurrente:', config.maxConcurrentAudits);
    console.log('   - Timeout:', config.auditTimeout, 'minutes\n');

    // Test 2: Planifier différents types de jobs
    console.log('2. Planification de jobs de test:');
    
    const auditJobId = await scheduler.scheduleFullAudit(undefined, 5);
    console.log('   ✅ Audit complet planifié:', auditJobId);
    
    const quickJobId = await scheduler.scheduleQuickCheck(3);
    console.log('   ✅ Vérification rapide planifiée:', quickJobId);
    
    const alertJobId = await scheduler.scheduleAlertAnalysis(7);
    console.log('   ✅ Analyse d\'alertes planifiée:', alertJobId);
    
    const reportJobId = await scheduler.scheduleWeeklyReport();
    console.log('   ✅ Rapport hebdomadaire planifié:', reportJobId);

    // Test 3: Vérifier le statut de la file d'attente
    console.log('\n3. Statut de la file d\'attente:');
    const status = scheduler.getQueueStatus();
    console.log('   - Jobs en attente:', status.pending);
    console.log('   - Jobs en cours:', status.running);
    console.log('   - File d\'attente:');
    
    status.queue.forEach((job, index) => {
      console.log(`     ${index + 1}. ${job.type} (${job.status}) - Priorité: ${job.priority}`);
    });

    // Test 4: Traiter la file d'attente (simulation)
    console.log('\n4. Traitement de la file d\'attente:');
    console.log('   ⚠️ Traitement simulé (pas d\'exécution réelle)');
    
    // Dans un vrai test, on appellerait:
    // await scheduler.processQueue();

    // Test 5: Annuler un job
    console.log('\n5. Test d\'annulation de job:');
    const cancelled = await scheduler.cancelJob(quickJobId);
    console.log('   - Job annulé:', cancelled ? '✅' : '❌');

    // Test 6: Statut final
    console.log('\n6. Statut final:');
    const finalStatus = scheduler.getQueueStatus();
    console.log('   - Jobs restants en attente:', finalStatus.pending);
    console.log('   - Jobs en cours:', finalStatus.running);

    console.log('\n✅ Test du scheduler terminé avec succès!');

  } catch (error) {
    console.error('❌ Erreur lors du test du scheduler:', error);
    process.exit(1);
  }
}

// Exécuter le test si le script est appelé directement
if (require.main === module) {
  testScheduler().catch(console.error);
}

export { testScheduler };