#!/usr/bin/env tsx

/**
 * Simple test script for the continuous monitoring system
 * This version works without external API dependencies
 */

console.log('🧪 Test simple du système de monitoring continu...\n');

// Test 1: Vérifier que les modules se chargent correctement
console.log('🔍 Test 1: Chargement des modules...');
try {
  // Test des imports sans instanciation
  const continuousMonitoringModule = await import('../src/lib/monitoring/continuous-monitoring');
  console.log('✅ Module continuous-monitoring chargé');
  
  const vercelUsageModule = await import('../src/lib/vercel/usage-monitor');
  console.log('✅ Module usage-monitor chargé');
  
  const performanceAlertsModule = await import('../src/lib/vercel/performance-alerts');
  console.log('✅ Module performance-alerts chargé');
  
  const fallbackManagerModule = await import('../src/lib/vercel/fallback-manager');
  console.log('✅ Module fallback-manager chargé');
  
  console.log('✅ Test 1 réussi - Tous les modules se chargent correctement\n');
} catch (error) {
  console.log('❌ Test 1 échoué:', error instanceof Error ? error.message : 'Erreur inconnue');
  process.exit(1);
}

// Test 2: Vérifier la structure des types
console.log('🔍 Test 2: Vérification des types...');
try {
  const { continuousMonitoring } = await import('../src/lib/monitoring/continuous-monitoring');
  
  // Vérifier que l'instance existe
  if (!continuousMonitoring) {
    throw new Error('Instance continuousMonitoring non disponible');
  }
  
  // Vérifier les méthodes principales
  const methods = ['start', 'stop', 'getStatus', 'getCurrentMetrics', 'getAlertRules'];
  for (const method of methods) {
    if (typeof (continuousMonitoring as any)[method] !== 'function') {
      throw new Error(`Méthode manquante: ${method}`);
    }
  }
  
  console.log('✅ Test 2 réussi - Structure des types correcte\n');
} catch (error) {
  console.log('❌ Test 2 échoué:', error instanceof Error ? error.message : 'Erreur inconnue');
  process.exit(1);
}

// Test 3: Vérifier le statut initial
console.log('🔍 Test 3: Statut initial...');
try {
  const { continuousMonitoring } = await import('../src/lib/monitoring/continuous-monitoring');
  
  const status = continuousMonitoring.getStatus();
  
  if (typeof status.isRunning !== 'boolean') {
    throw new Error('status.isRunning doit être un boolean');
  }
  
  if (typeof status.metricsCount !== 'number') {
    throw new Error('status.metricsCount doit être un nombre');
  }
  
  console.log('📊 Statut initial:', {
    isRunning: status.isRunning,
    metricsCount: status.metricsCount,
    activeRules: status.activeRules
  });
  
  console.log('✅ Test 3 réussi - Statut initial correct\n');
} catch (error) {
  console.log('❌ Test 3 échoué:', error instanceof Error ? error.message : 'Erreur inconnue');
  process.exit(1);
}

// Test 4: Vérifier les règles d'alerte par défaut
console.log('🔍 Test 4: Règles d\'alerte par défaut...');
try {
  const { continuousMonitoring } = await import('../src/lib/monitoring/continuous-monitoring');
  
  const rules = continuousMonitoring.getAlertRules();
  
  if (!Array.isArray(rules)) {
    throw new Error('getAlertRules doit retourner un tableau');
  }
  
  if (rules.length === 0) {
    throw new Error('Aucune règle d\'alerte par défaut trouvée');
  }
  
  // Vérifier la structure des règles
  const firstRule = rules[0];
  const requiredFields = ['id', 'name', 'severity', 'enabled', 'cooldownMinutes'];
  
  for (const field of requiredFields) {
    if (!(field in firstRule)) {
      throw new Error(`Champ manquant dans la règle: ${field}`);
    }
  }
  
  console.log('📋 Règles d\'alerte trouvées:', rules.length);
  console.log('📋 Règles actives:', rules.filter(r => r.enabled).length);
  
  console.log('✅ Test 4 réussi - Règles d\'alerte configurées\n');
} catch (error) {
  console.log('❌ Test 4 échoué:', error instanceof Error ? error.message : 'Erreur inconnue');
  process.exit(1);
}

// Test 5: Test de manipulation des règles
console.log('🔍 Test 5: Manipulation des règles...');
try {
  const { continuousMonitoring } = await import('../src/lib/monitoring/continuous-monitoring');
  
  // Ajouter une règle de test
  const testRule = {
    id: 'test_rule_simple',
    name: 'Test Rule Simple',
    condition: () => false,
    severity: 'info' as const,
    message: () => 'Test message',
    cooldownMinutes: 5,
    enabled: true
  };
  
  continuousMonitoring.addAlertRule(testRule);
  
  // Vérifier que la règle a été ajoutée
  const rules = continuousMonitoring.getAlertRules();
  const addedRule = rules.find(r => r.id === 'test_rule_simple');
  
  if (!addedRule) {
    throw new Error('Règle de test non ajoutée');
  }
  
  // Modifier la règle
  const updateSuccess = continuousMonitoring.updateAlertRule('test_rule_simple', {
    enabled: false
  });
  
  if (!updateSuccess) {
    throw new Error('Impossible de modifier la règle');
  }
  
  // Supprimer la règle
  const removeSuccess = continuousMonitoring.removeAlertRule('test_rule_simple');
  
  if (!removeSuccess) {
    throw new Error('Impossible de supprimer la règle');
  }
  
  console.log('✅ Test 5 réussi - Manipulation des règles fonctionne\n');
} catch (error) {
  console.log('❌ Test 5 échoué:', error instanceof Error ? error.message : 'Erreur inconnue');
  process.exit(1);
}

// Test 6: Vérifier la documentation
console.log('🔍 Test 6: Documentation...');
try {
  const fs = await import('fs');
  const path = await import('path');
  
  const docPath = path.join(process.cwd(), 'src/lib/monitoring/CONTINUOUS_MONITORING_DOCUMENTATION.md');
  
  if (!fs.existsSync(docPath)) {
    throw new Error('Documentation manquante');
  }
  
  const docContent = fs.readFileSync(docPath, 'utf-8');
  
  if (docContent.length < 1000) {
    throw new Error('Documentation trop courte');
  }
  
  // Vérifier que les sections principales sont présentes
  const requiredSections = [
    '## Vue d\'ensemble',
    '## Fonctionnalités Principales',
    '## Architecture Technique',
    '## Configuration et Déploiement',
    '## Utilisation'
  ];
  
  for (const section of requiredSections) {
    if (!docContent.includes(section)) {
      throw new Error(`Section manquante dans la documentation: ${section}`);
    }
  }
  
  console.log('📚 Documentation trouvée:', Math.round(docContent.length / 1000) + 'k caractères');
  console.log('✅ Test 6 réussi - Documentation complète\n');
} catch (error) {
  console.log('❌ Test 6 échoué:', error instanceof Error ? error.message : 'Erreur inconnue');
  process.exit(1);
}

// Résumé final
console.log('🎉 TOUS LES TESTS SONT PASSÉS AVEC SUCCÈS !');
console.log('✅ Le système de monitoring continu est correctement implémenté');
console.log('');
console.log('📋 Résumé des fonctionnalités validées:');
console.log('  • ✅ Chargement des modules');
console.log('  • ✅ Structure des types');
console.log('  • ✅ Statut du système');
console.log('  • ✅ Règles d\'alerte par défaut');
console.log('  • ✅ Manipulation des règles');
console.log('  • ✅ Documentation complète');
console.log('');
console.log('🚀 Le monitoring continu est prêt à être utilisé !');
console.log('');
console.log('📝 Prochaines étapes:');
console.log('  1. Configurer les variables d\'environnement (VERCEL_TOKEN, GITHUB_TOKEN)');
console.log('  2. Initialiser la base de données avec setup-continuous-monitoring-db.sql');
console.log('  3. Démarrer le monitoring via l\'interface admin ou l\'API');
console.log('  4. Tester les alertes avec des seuils réels');
console.log('');
console.log('🔗 Documentation: src/lib/monitoring/CONTINUOUS_MONITORING_DOCUMENTATION.md');
console.log('🎛️ Dashboard: /admin/continuous-monitoring');
console.log('🔌 API: /api/admin/continuous-monitoring');