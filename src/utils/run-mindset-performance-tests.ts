#!/usr/bin/env node

/**
 * Script pour exécuter les tests de la section Mindset & Performance
 * Usage: npx tsx src/utils/run-mindset-performance-tests.ts
 */

import { runMindsetPerformanceTests, testSpecificPage, runCompleteTests, runGlobalSectionTests } from './mindset-performance-tests';

function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    const command = args[0];
    
    switch (command) {
      case '--page':
        // Test d'une page spécifique
        const url = args[1];
        if (!url) {
          console.error('❌ Veuillez spécifier une URL avec --page');
          console.log('Exemple: npx tsx src/utils/run-mindset-performance-tests.ts --page /ressources/meilleurs-livres/mindset-performance');
          process.exit(1);
        }
        testSpecificPage(url);
        break;
        
      case '--global':
        // Tests globaux uniquement
        runGlobalSectionTests();
        break;
        
      case '--complete':
        // Tests complets (pages + globaux)
        runCompleteTests();
        break;
        
      case '--help':
        console.log('🧪 Tests Mindset & Performance - Options disponibles:');
        console.log('');
        console.log('  --page <url>     Teste une page spécifique');
        console.log('  --global         Lance uniquement les tests globaux');
        console.log('  --complete       Lance tous les tests (pages + globaux)');
        console.log('  --help           Affiche cette aide');
        console.log('  (aucun)          Lance les tests de pages uniquement');
        console.log('');
        console.log('Exemples:');
        console.log('  npx tsx src/utils/run-mindset-performance-tests.ts');
        console.log('  npx tsx src/utils/run-mindset-performance-tests.ts --complete');
        console.log('  npx tsx src/utils/run-mindset-performance-tests.ts --page /ressources/meilleurs-livres/mindset-performance');
        break;
        
      default:
        console.error(`❌ Option inconnue: ${command}`);
        console.log('Utilisez --help pour voir les options disponibles');
        process.exit(1);
    }
  } else {
    // Tests de pages par défaut
    runMindsetPerformanceTests();
  }
}

// Gestion des erreurs
try {
  main();
} catch (error) {
  console.error('❌ Erreur lors de l\'exécution des tests:', error);
  process.exit(1);
}