#!/usr/bin/env tsx

/**
 * Script pour exécuter les tests fonctionnels de navigation de la page d'accueil
 * Task 8.1: Tests fonctionnels de navigation
 * 
 * Usage: npm run test:homepage-navigation
 */

import { runHomepageNavigationTests } from '../utils/homepage-navigation-tests';

async function main() {
  console.log('🏠 Tests Fonctionnels de Navigation - Page d\'Accueil');
  console.log('=' .repeat(60));
  console.log('Task 8.1: Tester tous les liens, redirections et parcours de conversion\n');

  try {
    const startTime = Date.now();
    
    // Exécuter tous les tests de navigation
    const testResults = await runHomepageNavigationTests();
    
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    console.log('\n' + '='.repeat(60));
    console.log('📋 RAPPORT FINAL DES TESTS DE NAVIGATION');
    console.log('='.repeat(60));
    
    console.log(`⏱️  Durée d'exécution: ${duration}s`);
    console.log(`🎯 Résultat global: ${testResults.success ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
    console.log(`📊 Résumé: ${testResults.summary}\n`);

    // Détail des résultats
    console.log('📝 Détail des tests:');
    testResults.results.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      console.log(`   ${index + 1}. ${status} ${result.testName}`);
      console.log(`      ${result.details}`);
      
      if (!result.success && result.errors && result.errors.length > 0) {
        console.log('      Erreurs détectées:');
        result.errors.forEach(error => {
          console.log(`        • ${error}`);
        });
      }
      console.log('');
    });

    // Recommandations
    const failedTests = testResults.results.filter(r => !r.success);
    if (failedTests.length > 0) {
      console.log('🔧 RECOMMANDATIONS:');
      
      failedTests.forEach(test => {
        console.log(`\n   ${test.testName}:`);
        
        if (test.testName.includes('Links Validation')) {
          console.log('   • Vérifier que toutes les pages de destination existent');
          console.log('   • Créer les pages manquantes ou configurer les redirections');
          console.log('   • Mettre à jour les liens dans les composants');
        }
        
        if (test.testName.includes('Redirections')) {
          console.log('   • Configurer les redirections 301 dans next.config.ts');
          console.log('   • Vérifier le fichier src/config/redirects.ts');
          console.log('   • Tester les redirections en local et en production');
        }
        
        if (test.testName.includes('Conversion Paths')) {
          console.log('   • Vérifier que toutes les pages de destination des CTAs existent');
          console.log('   • Tester les formulaires et pages de conversion');
          console.log('   • Valider le tracking des conversions');
        }
        
        if (test.testName.includes('CTA Consistency')) {
          console.log('   • Vérifier la cohérence des destinations des CTAs');
          console.log('   • Mettre à jour les composants TrackedLink');
          console.log('   • Valider les libellés et icônes des CTAs');
        }
      });
    } else {
      console.log('🎉 FÉLICITATIONS!');
      console.log('   Tous les tests de navigation sont réussis.');
      console.log('   La page d\'accueil est prête pour la production.');
    }

    // Métriques de performance
    console.log('\n📈 MÉTRIQUES DE PERFORMANCE:');
    const totalLinks = testResults.results
      .find(r => r.testName.includes('Links Validation'))
      ?.details.match(/(\d+)\/(\d+)/);
    
    if (totalLinks) {
      const [, valid, total] = totalLinks;
      const linkSuccessRate = Math.round((parseInt(valid) / parseInt(total)) * 100);
      console.log(`   • Taux de réussite des liens: ${linkSuccessRate}%`);
    }

    const overallSuccessRate = Math.round((testResults.results.filter(r => r.success).length / testResults.results.length) * 100);
    console.log(`   • Taux de réussite global: ${overallSuccessRate}%`);
    console.log(`   • Tests exécutés: ${testResults.results.length}`);
    console.log(`   • Temps moyen par test: ${Math.round(duration / testResults.results.length)}s`);

    // Status de la task
    console.log('\n🎯 STATUS TASK 8.1:');
    if (testResults.success) {
      console.log('   ✅ Task 8.1 - Tests fonctionnels de navigation: COMPLÉTÉE');
      console.log('   • Tous les liens de la page d\'accueil sont fonctionnels');
      console.log('   • Les redirections sont correctement configurées');
      console.log('   • Les parcours de conversion sont validés');
      console.log('   • Requirements 3.3 et 4.3 satisfaits');
    } else {
      console.log('   ⚠️  Task 8.1 - Tests fonctionnels de navigation: EN COURS');
      console.log('   • Corrections nécessaires avant validation finale');
      console.log('   • Voir les recommandations ci-dessus');
    }

    // Code de sortie
    process.exit(testResults.success ? 0 : 1);

  } catch (error) {
    console.error('\n❌ ERREUR CRITIQUE lors des tests de navigation:');
    console.error(error);
    
    console.log('\n🔧 ACTIONS CORRECTIVES:');
    console.log('   • Vérifier que le serveur de développement est démarré');
    console.log('   • Contrôler la configuration des URLs de base');
    console.log('   • Vérifier les permissions réseau');
    console.log('   • Consulter les logs détaillés ci-dessus');
    
    process.exit(1);
  }
}

// Gestion des signaux pour un arrêt propre
process.on('SIGINT', () => {
  console.log('\n⚠️  Tests interrompus par l\'utilisateur');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Tests interrompus par le système');
  process.exit(1);
});

// Exécution du script
main().catch(error => {
  console.error('Erreur fatale:', error);
  process.exit(1);
});