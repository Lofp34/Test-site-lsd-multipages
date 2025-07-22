#!/usr/bin/env tsx

/**
 * Script pour exécuter les tests de performance et accessibilité de la page d'accueil
 * Task 8.2: Tests de performance et accessibilité
 * 
 * Usage: npm run test:homepage-performance
 */

import { runHomepagePerformanceAccessibilityTests } from '../utils/homepage-performance-accessibility-tests';

async function main() {
  console.log('⚡ Tests de Performance et Accessibilité - Page d\'Accueil');
  console.log('=' .repeat(65));
  console.log('Task 8.2: Core Web Vitals, accessibilité CTAs, navigation clavier\n');

  try {
    const startTime = Date.now();
    
    // Exécuter tous les tests
    const testResults = await runHomepagePerformanceAccessibilityTests();
    
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    console.log('\n' + '='.repeat(65));
    console.log('📋 RAPPORT FINAL - PERFORMANCE & ACCESSIBILITÉ');
    console.log('='.repeat(65));
    
    console.log(`⏱️  Durée d'exécution: ${duration}s`);
    console.log(`🎯 Résultat global: ${testResults.success ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
    console.log(`📊 Score global: ${testResults.overallScore}/100`);
    console.log(`📝 Résumé: ${testResults.summary}\n`);

    // Détail des tests de performance
    console.log('📊 RÉSULTATS PERFORMANCE:');
    console.log('-'.repeat(40));
    testResults.performanceResults.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      const score = result.score ? ` (${result.score}/100)` : '';
      console.log(`   ${index + 1}. ${status} ${result.testName}${score}`);
      console.log(`      ${result.details}`);
      
      if (result.recommendations && result.recommendations.length > 0) {
        console.log('      Recommandations:');
        result.recommendations.forEach(rec => {
          console.log(`        • ${rec}`);
        });
      }
      
      if (result.metrics) {
        console.log('      Métriques détaillées:');
        Object.entries(result.metrics).forEach(([key, value]) => {
          if (typeof value === 'object' && value.value !== undefined) {
            console.log(`        • ${key}: ${value.value} (Score: ${value.score}/100)`);
          }
        });
      }
      console.log('');
    });

    // Détail des tests d'accessibilité
    console.log('♿ RÉSULTATS ACCESSIBILITÉ:');
    console.log('-'.repeat(40));
    testResults.accessibilityResults.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      const score = result.score ? ` (${result.score}/100)` : '';
      console.log(`   ${index + 1}. ${status} ${result.testName}${score}`);
      
      if (result.issues.length > 0) {
        const errors = result.issues.filter(i => i.severity === 'error').length;
        const warnings = result.issues.filter(i => i.severity === 'warning').length;
        const infos = result.issues.filter(i => i.severity === 'info').length;
        
        console.log(`      Issues: ${errors} erreurs, ${warnings} avertissements, ${infos} infos`);
        
        result.issues.forEach(issue => {
          const icon = issue.severity === 'error' ? '🔴' : 
                     issue.severity === 'warning' ? '🟡' : '🔵';
          console.log(`        ${icon} ${issue.element}: ${issue.description}`);
          console.log(`           Fix: ${issue.fix}`);
        });
      } else {
        console.log('      ✅ Aucun problème détecté');
      }
      console.log('');
    });

    // Recommandations globales
    const failedPerformanceTests = testResults.performanceResults.filter(r => !r.success);
    const failedAccessibilityTests = testResults.accessibilityResults.filter(r => !r.success);
    
    if (failedPerformanceTests.length > 0 || failedAccessibilityTests.length > 0) {
      console.log('🔧 RECOMMANDATIONS PRIORITAIRES:');
      console.log('-'.repeat(40));
      
      if (failedPerformanceTests.length > 0) {
        console.log('\n   📊 Performance:');
        failedPerformanceTests.forEach(test => {
          console.log(`   • ${test.testName}:`);
          if (test.recommendations) {
            test.recommendations.forEach(rec => {
              console.log(`     - ${rec}`);
            });
          }
        });
      }
      
      if (failedAccessibilityTests.length > 0) {
        console.log('\n   ♿ Accessibilité:');
        failedAccessibilityTests.forEach(test => {
          console.log(`   • ${test.testName}:`);
          const criticalIssues = test.issues.filter(i => i.severity === 'error');
          criticalIssues.forEach(issue => {
            console.log(`     - ${issue.description}: ${issue.fix}`);
          });
        });
      }
    } else {
      console.log('🎉 EXCELLENT TRAVAIL!');
      console.log('   Tous les tests de performance et accessibilité sont réussis.');
      console.log('   La page d\'accueil respecte les standards WCAG et Core Web Vitals.');
    }

    // Métriques détaillées
    console.log('\n📈 MÉTRIQUES DÉTAILLÉES:');
    console.log('-'.repeat(40));
    
    // Core Web Vitals
    const coreWebVitalsTest = testResults.performanceResults.find(r => r.testName === 'Core Web Vitals');
    if (coreWebVitalsTest && coreWebVitalsTest.metrics) {
      console.log('   ⚡ Core Web Vitals:');
      const metrics = coreWebVitalsTest.metrics;
      console.log(`     • LCP (Largest Contentful Paint): ${metrics.lcp.value}ms (${metrics.lcp.score}/100)`);
      console.log(`     • FID (First Input Delay): ${metrics.fid.value}ms (${metrics.fid.score}/100)`);
      console.log(`     • CLS (Cumulative Layout Shift): ${metrics.cls.value} (${metrics.cls.score}/100)`);
    }
    
    // Scores d'accessibilité
    const accessibilityScores = testResults.accessibilityResults.map(r => r.score || 0);
    const avgAccessibilityScore = Math.round(accessibilityScores.reduce((a, b) => a + b, 0) / accessibilityScores.length);
    console.log(`   ♿ Score d'accessibilité moyen: ${avgAccessibilityScore}/100`);
    
    // Performance mobile
    const mobileTest = testResults.performanceResults.find(r => r.testName === 'Mobile Performance');
    if (mobileTest) {
      console.log(`   📱 Performance mobile: ${mobileTest.score}/100`);
    }

    // Conformité aux standards
    console.log('\n🏆 CONFORMITÉ AUX STANDARDS:');
    console.log('-'.repeat(40));
    
    const coreWebVitalsScore = coreWebVitalsTest?.score || 0;
    console.log(`   • Core Web Vitals: ${coreWebVitalsScore >= 80 ? '✅' : '❌'} ${coreWebVitalsScore >= 80 ? 'Conforme' : 'Non conforme'} (${coreWebVitalsScore}/100)`);
    console.log(`   • WCAG 2.1 AA: ${avgAccessibilityScore >= 80 ? '✅' : '❌'} ${avgAccessibilityScore >= 80 ? 'Conforme' : 'Non conforme'} (${avgAccessibilityScore}/100)`);
    console.log(`   • Mobile-First: ${mobileTest?.success ? '✅' : '❌'} ${mobileTest?.success ? 'Conforme' : 'Non conforme'}`);

    // Status de la task
    console.log('\n🎯 STATUS TASK 8.2:');
    console.log('-'.repeat(40));
    if (testResults.success) {
      console.log('   ✅ Task 8.2 - Tests de performance et accessibilité: COMPLÉTÉE');
      console.log('   • Core Web Vitals optimaux validés');
      console.log('   • Accessibilité des CTAs conforme WCAG');
      console.log('   • Navigation clavier et lecteurs d\'écran fonctionnelle');
      console.log('   • Requirement 5.4 satisfait');
    } else {
      console.log('   ⚠️  Task 8.2 - Tests de performance et accessibilité: EN COURS');
      console.log('   • Optimisations nécessaires avant validation finale');
      console.log('   • Voir les recommandations prioritaires ci-dessus');
    }

    // Code de sortie
    process.exit(testResults.success ? 0 : 1);

  } catch (error) {
    console.error('\n❌ ERREUR CRITIQUE lors des tests:');
    console.error(error);
    
    console.log('\n🔧 ACTIONS CORRECTIVES:');
    console.log('   • Vérifier la configuration des tests');
    console.log('   • Contrôler les dépendances installées');
    console.log('   • Vérifier la structure des composants');
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