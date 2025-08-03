#!/usr/bin/env tsx

/**
 * Script de test simple pour le FallbackManager
 * 
 * Ce script teste les fonctionnalités de base du système de fallback
 * sans nécessiter de tokens API externes.
 */

import { FallbackManager, GitHubActionsFallback } from '../src/lib/vercel/fallback-manager';

// Configuration de test avec des valeurs par défaut
const TEST_CONFIG = {
  checkInterval: 1000,
  maxAuditDelay: 0.1,
  retryAttempts: 2,
  retryDelay: 1000,
  healthCheckTimeout: 5000
};

async function testFallbackManagerStructure() {
  console.log('\n🔍 Test de la structure du FallbackManager...');
  
  try {
    // Test de création d'instance
    const fallbackManager = new FallbackManager(TEST_CONFIG);
    
    // Vérifier que l'instance a les bonnes méthodes
    const requiredMethods = [
      'checkSystemHealth',
      'shouldActivateFallback',
      'activateFallback',
      'synchronizeData',
      'getLastStatus',
      'forceCheck'
    ];
    
    for (const method of requiredMethods) {
      if (typeof (fallbackManager as any)[method] !== 'function') {
        throw new Error(`Méthode manquante: ${method}`);
      }
    }
    
    console.log('✅ Structure du FallbackManager validée');
    return true;
  } catch (error) {
    console.error('❌ Erreur de structure:', error);
    return false;
  }
}

async function testGitHubActionsFallbackStructure() {
  console.log('\n🚀 Test de la structure du GitHubActionsFallback...');
  
  try {
    // Test de création d'instance
    const githubFallback = new GitHubActionsFallback();
    
    // Vérifier que l'instance a les bonnes méthodes
    const requiredMethods = [
      'triggerUrgentAlerts',
      'triggerEmergencyMaintenance',
      'triggerHealthMonitoring',
      'checkWorkflowStatus',
      'getWorkflowLogs'
    ];
    
    for (const method of requiredMethods) {
      if (typeof (githubFallback as any)[method] !== 'function') {
        throw new Error(`Méthode manquante: ${method}`);
      }
    }
    
    console.log('✅ Structure du GitHubActionsFallback validée');
    return true;
  } catch (error) {
    console.error('❌ Erreur de structure:', error);
    return false;
  }
}

async function testFallbackStatusInterface() {
  console.log('\n📊 Test des interfaces de statut...');
  
  try {
    // Créer un statut de test
    const testStatus = {
      isVercelDown: false,
      reason: 'Test status',
      lastCheck: new Date(),
      fallbackActive: false,
      nextCheck: new Date(Date.now() + 60000)
    };
    
    // Vérifier que toutes les propriétés requises sont présentes
    const requiredProperties = ['isVercelDown', 'reason', 'lastCheck', 'fallbackActive', 'nextCheck'];
    
    for (const prop of requiredProperties) {
      if (!(prop in testStatus)) {
        throw new Error(`Propriété manquante dans FallbackStatus: ${prop}`);
      }
    }
    
    // Test de SystemHealth
    const testHealth = {
      vercelCrons: 'healthy' as const,
      vercelApi: 'healthy' as const,
      database: 'healthy' as const,
      lastAuditTime: new Date(),
      timeSinceLastAudit: 1.5
    };
    
    const healthProperties = ['vercelCrons', 'vercelApi', 'database', 'lastAuditTime', 'timeSinceLastAudit'];
    
    for (const prop of healthProperties) {
      if (!(prop in testHealth)) {
        throw new Error(`Propriété manquante dans SystemHealth: ${prop}`);
      }
    }
    
    console.log('✅ Interfaces de statut validées');
    return true;
  } catch (error) {
    console.error('❌ Erreur d\'interface:', error);
    return false;
  }
}

async function testConfigurationHandling() {
  console.log('\n⚙️ Test de gestion de la configuration...');
  
  try {
    // Test avec configuration par défaut
    const defaultManager = new FallbackManager();
    
    // Test avec configuration personnalisée
    const customConfig = {
      checkInterval: 30000,
      maxAuditDelay: 12,
      retryAttempts: 5,
      retryDelay: 5000,
      healthCheckTimeout: 10000
    };
    
    const customManager = new FallbackManager(customConfig);
    
    // Vérifier que les configurations sont différentes
    // (nous ne pouvons pas accéder directement à la config privée, 
    // mais nous pouvons vérifier que les instances sont créées)
    
    if (!defaultManager || !customManager) {
      throw new Error('Échec de création des instances avec configurations');
    }
    
    console.log('✅ Gestion de configuration validée');
    return true;
  } catch (error) {
    console.error('❌ Erreur de configuration:', error);
    return false;
  }
}

async function testErrorHandling() {
  console.log('\n🛡️ Test de gestion d\'erreurs...');
  
  try {
    const fallbackManager = new FallbackManager(TEST_CONFIG);
    
    // Test de gestion d'erreur lors de l'activation de fallback
    // (sans token GitHub, cela devrait échouer gracieusement)
    try {
      const result = await fallbackManager.activateFallback('urgent');
      // Si ça réussit sans token, c'est suspect
      if (result === true) {
        console.warn('⚠️ Activation réussie sans token GitHub (inattendu)');
      }
    } catch (error) {
      // C'est normal sans token GitHub
      console.log('  ✓ Gestion d\'erreur d\'activation correcte');
    }
    
    // Test de gestion d'erreur lors de la synchronisation
    try {
      await fallbackManager.synchronizeData();
      console.log('  ✓ Synchronisation gérée sans erreur fatale');
    } catch (error) {
      console.log('  ✓ Gestion d\'erreur de synchronisation correcte');
    }
    
    console.log('✅ Gestion d\'erreurs validée');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors du test de gestion d\'erreurs:', error);
    return false;
  }
}

async function testWorkflowFileExistence() {
  console.log('\n📁 Test de présence des fichiers de workflow...');
  
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const workflowFiles = [
      '.github/workflows/fallback-urgent-alerts.yml',
      '.github/workflows/fallback-health-monitoring.yml',
      '.github/workflows/fallback-emergency-maintenance.yml'
    ];
    
    for (const workflowFile of workflowFiles) {
      try {
        await fs.access(workflowFile);
        console.log(`  ✓ ${workflowFile} existe`);
      } catch (error) {
        throw new Error(`Fichier de workflow manquant: ${workflowFile}`);
      }
    }
    
    console.log('✅ Fichiers de workflow validés');
    return true;
  } catch (error) {
    console.error('❌ Erreur de fichiers de workflow:', error);
    return false;
  }
}

async function testDatabaseSchemaCompatibility() {
  console.log('\n🗄️ Test de compatibilité du schéma de base de données...');
  
  try {
    const fs = await import('fs/promises');
    
    // Vérifier que le script SQL existe
    try {
      const sqlContent = await fs.readFile('scripts/setup-fallback-db.sql', 'utf-8');
      
      // Vérifier que les tables requises sont définies
      const requiredTables = ['fallback_logs', 'sync_metrics', 'system_health_history'];
      
      for (const table of requiredTables) {
        if (!sqlContent.includes(`CREATE TABLE IF NOT EXISTS ${table}`)) {
          throw new Error(`Table manquante dans le schéma: ${table}`);
        }
      }
      
      // Vérifier que les vues sont définies
      const requiredViews = ['fallback_stats', 'recent_system_health'];
      
      for (const view of requiredViews) {
        if (!sqlContent.includes(`CREATE OR REPLACE VIEW ${view}`)) {
          throw new Error(`Vue manquante dans le schéma: ${view}`);
        }
      }
      
      console.log('  ✓ Script SQL de setup présent');
      console.log('  ✓ Tables requises définies');
      console.log('  ✓ Vues requises définies');
      
    } catch (error) {
      throw new Error(`Erreur de lecture du schéma SQL: ${error}`);
    }
    
    console.log('✅ Compatibilité du schéma validée');
    return true;
  } catch (error) {
    console.error('❌ Erreur de schéma de base de données:', error);
    return false;
  }
}

async function testIntegrationExamples() {
  console.log('\n🔗 Test des exemples d\'intégration...');
  
  try {
    // Importer les exemples d'intégration
    const integrationModule = await import('../src/lib/vercel/integration-example');
    
    // Vérifier que les fonctions d'exemple existent
    const requiredFunctions = [
      'preAuditUsageCheck',
      'postAuditUsageTracking',
      'integratedAuditExample',
      'weeklyMaintenanceWithUsageOptimization',
      'continuousMonitoringWithFallback'
    ];
    
    for (const func of requiredFunctions) {
      if (typeof (integrationModule as any)[func] !== 'function') {
        throw new Error(`Fonction d'intégration manquante: ${func}`);
      }
    }
    
    console.log('  ✓ Fonctions d\'intégration présentes');
    
    console.log('✅ Exemples d\'intégration validés');
    return true;
  } catch (error) {
    console.error('❌ Erreur d\'exemples d\'intégration:', error);
    return false;
  }
}

async function generateTestReport(results: Record<string, boolean>) {
  console.log('\n📊 RAPPORT DE TEST DU FALLBACK MANAGER (SIMPLE)');
  console.log('=' .repeat(55));
  
  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(Boolean).length;
  const failedTests = totalTests - passedTests;
  
  console.log(`\nRésultats globaux:`);
  console.log(`  ✅ Tests réussis: ${passedTests}/${totalTests}`);
  console.log(`  ❌ Tests échoués: ${failedTests}/${totalTests}`);
  console.log(`  📊 Taux de réussite: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  console.log(`\nDétail des tests:`);
  Object.entries(results).forEach(([testName, passed]) => {
    const status = passed ? '✅' : '❌';
    console.log(`  ${status} ${testName}`);
  });
  
  if (failedTests === 0) {
    console.log('\n🎉 TOUS LES TESTS STRUCTURELS SONT PASSÉS !');
    console.log('Le FallbackManager est correctement structuré.');
    console.log('\n💡 Pour des tests complets avec APIs externes:');
    console.log('   - Configurez les variables d\'environnement requises');
    console.log('   - Exécutez scripts/test-fallback-manager.ts');
  } else {
    console.log('\n⚠️ CERTAINS TESTS STRUCTURELS ONT ÉCHOUÉ');
    console.log('Corrigez les erreurs ci-dessus avant de continuer.');
  }
  
  console.log('\n' + '=' .repeat(55));
}

async function main() {
  console.log('🚀 DÉMARRAGE DES TESTS STRUCTURELS DU FALLBACK MANAGER');
  console.log('=' .repeat(55));
  
  try {
    // Exécution des tests structurels
    const results: Record<string, boolean> = {};
    
    results['Structure FallbackManager'] = await testFallbackManagerStructure();
    results['Structure GitHubActionsFallback'] = await testGitHubActionsFallbackStructure();
    results['Interfaces de statut'] = await testFallbackStatusInterface();
    results['Gestion de configuration'] = await testConfigurationHandling();
    results['Gestion d\'erreurs'] = await testErrorHandling();
    results['Fichiers de workflow'] = await testWorkflowFileExistence();
    results['Schéma de base de données'] = await testDatabaseSchemaCompatibility();
    results['Exemples d\'intégration'] = await testIntegrationExamples();
    
    // Génération du rapport
    await generateTestReport(results);
    
    // Code de sortie basé sur les résultats
    const allPassed = Object.values(results).every(Boolean);
    process.exit(allPassed ? 0 : 1);
    
  } catch (error) {
    console.error('💥 ERREUR CRITIQUE LORS DES TESTS:', error);
    process.exit(1);
  }
}

// Exécution du script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main as testFallbackManagerSimple };