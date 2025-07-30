/**
 * Script de test pour la génération automatique de pages temporaires
 * 
 * Ce script teste la détection automatique, la génération de pages temporaires,
 * et l'intégration avec le sitemap.
 */

import { autoDetector, defaultDetectionConfig } from '../src/lib/temporary-pages/auto-detector';
import { sitemapIntegration } from '../src/lib/temporary-pages/sitemap-integration';
import { temporaryPageGenerator } from '../src/lib/temporary-pages/generator';
import { middlewareIntegration } from '../src/lib/temporary-pages/middleware-integration';

/**
 * Tester la génération automatique de pages temporaires
 */
async function testAutoGeneration() {
  console.log('\n🤖 Test de génération automatique de pages temporaires');
  console.log('=' .repeat(70));
  
  try {
    // Créer quelques pages temporaires de test
    console.log('\n📄 Création de pages temporaires de test...');
    
    const testPages = [
      {
        resourceUrl: '/ressources/guide-test-auto.pdf',
        sourceUrl: '/ressources',
        resourceType: 'download' as const,
        title: 'Guide Test Auto',
        priority: 'high' as const
      },
      {
        resourceUrl: '/outils/calculateur-test',
        sourceUrl: '/outils',
        resourceType: 'tool' as const,
        title: 'Calculateur Test',
        priority: 'medium' as const
      }
    ];
    
    for (const page of testPages) {
      const temporaryUrl = await temporaryPageGenerator.createTemporaryPage(page);
      console.log(`✅ Page créée: ${page.resourceUrl} -> ${temporaryUrl}`);
    }
    
    // Afficher les statistiques
    const stats = await temporaryPageGenerator.getStats();
    console.log(`\n📊 Statistiques: ${stats.total} pages temporaires actives`);
    
  } catch (error) {
    console.error('❌ Erreur lors du test de génération automatique:', error);
  }
}

/**
 * Tester l'intégration du sitemap
 */
async function testSitemapIntegration() {
  console.log('\n🗺️  Test d\'intégration du sitemap');
  console.log('=' .repeat(70));
  
  try {
    console.log('\n📄 Mise à jour du sitemap avec les pages temporaires...');
    
    // Mettre à jour le sitemap
    await sitemapIntegration.updateSitemapWithTemporaryPages();
    console.log('✅ Sitemap mis à jour');
    
    // Valider le sitemap
    console.log('\n🔍 Validation du sitemap...');
    const validation = await sitemapIntegration.validateSitemap();
    
    console.log(`📊 Résultats de validation:`);
    console.log(`   Valide: ${validation.isValid ? '✅' : '❌'}`);
    console.log(`   Erreurs: ${validation.errors.length}`);
    console.log(`   Avertissements: ${validation.warnings.length}`);
    
    if (validation.errors.length > 0) {
      console.log('\n❌ Erreurs détectées:');
      validation.errors.forEach(error => console.log(`   - ${error}`));
    }
    
    if (validation.warnings.length > 0) {
      console.log('\n⚠️  Avertissements:');
      validation.warnings.forEach(warning => console.log(`   - ${warning}`));
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test d\'intégration du sitemap:', error);
  }
}

/**
 * Tester le middleware d'intégration
 */
async function testMiddlewareIntegration() {
  console.log('\n🔄 Test d\'intégration du middleware');
  console.log('=' .repeat(70));
  
  try {
    console.log('\n⚙️  Configuration du middleware...');
    
    const config = middlewareIntegration.getConfig();
    console.log(`   Redirection automatique: ${config.enableAutoRedirect ? '✅' : '❌'}`);
    console.log(`   Création automatique: ${config.autoCreateTemporaryPages ? '✅' : '❌'}`);
    console.log(`   Patterns exclus: ${config.excludePatterns.length}`);
    console.log(`   Types de fichiers gérés: ${config.handleFileTypes.length}`);
    
    // Simuler quelques requêtes
    console.log('\n🧪 Simulation de requêtes...');
    
    const testUrls = [
      '/ressources/guide-inexistant.pdf',
      '/outils/calculateur-inexistant',
      '/api/test', // Doit être exclu
      '/_next/static/test.js', // Doit être exclu
      '/temporary-resource?url=test' // Doit être exclu
    ];
    
    for (const url of testUrls) {
      // Simuler une requête Next.js
      const mockRequest = {
        nextUrl: { pathname: url },
        url: `http://localhost:3000${url}`,
        headers: new Map([['referer', 'http://localhost:3000/']])
      } as any;
      
      console.log(`\n🔍 Test de: ${url}`);
      
      // Note: En réalité, cette fonction nécessite un vrai objet NextRequest
      // Ici on simule juste la logique de décision
      const shouldExclude = config.excludePatterns.some(pattern => {
        if (pattern.endsWith('/')) {
          return url.startsWith(pattern);
        }
        return url === pattern || url.startsWith(pattern + '/');
      });
      
      if (shouldExclude) {
        console.log('   ⏭️  Exclu (pattern correspondant)');
      } else {
        console.log('   ✅ Traité par le middleware');
        
        // Vérifier si c'est un type de fichier géré
        const isHandled = config.handleFileTypes.some(ext => 
          url.toLowerCase().endsWith(ext)
        ) || url.includes('/ressources/') || url.includes('/outils/');
        
        if (isHandled) {
          console.log('   🔄 Redirection vers page temporaire recommandée');
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test d\'intégration du middleware:', error);
  }
}

/**
 * Tester le nettoyage automatique
 */
async function testAutoCleanup() {
  console.log('\n🧹 Test de nettoyage automatique');
  console.log('=' .repeat(70));
  
  try {
    console.log('\n🚀 Lancement du nettoyage automatique...');
    
    // Simuler le nettoyage (la vraie fonction nécessite des requêtes réseau)
    console.log('⚠️  Simulation du nettoyage (requêtes réseau requises pour test réel)');
    
    const simulatedResult = {
      removed: 0,
      errors: [] as string[]
    };
    
    // En réalité, on appellerait:
    // const result = await autoDetector.cleanupObsoletePages();
    
    console.log(`📊 Résultats du nettoyage (simulés):`);
    console.log(`   Pages supprimées: ${simulatedResult.removed}`);
    console.log(`   Erreurs: ${simulatedResult.errors.length}`);
    
    if (simulatedResult.errors.length > 0) {
      console.log('\n❌ Erreurs rencontrées:');
      simulatedResult.errors.forEach(error => console.log(`   - ${error}`));
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test de nettoyage automatique:', error);
  }
}

/**
 * Tester la maintenance complète
 */
async function testMaintenanceWorkflow() {
  console.log('\n🔧 Test du workflow de maintenance complet');
  console.log('=' .repeat(70));
  
  try {
    console.log('\n📊 État initial...');
    const initialStats = await temporaryPageGenerator.getStats();
    console.log(`   Pages temporaires: ${initialStats.total}`);
    
    console.log('\n🧹 1. Nettoyage des pages obsolètes...');
    // Simulation du nettoyage
    console.log('   ⚠️  Simulation (requêtes réseau requises)');
    
    console.log('\n🔍 2. Détection de nouvelles ressources...');
    // Simulation de la détection
    console.log('   ⚠️  Simulation (serveur web requis)');
    
    console.log('\n🗺️  3. Mise à jour du sitemap...');
    try {
      await sitemapIntegration.updateSitemapWithTemporaryPages();
      console.log('   ✅ Sitemap mis à jour');
    } catch (error) {
      console.log(`   ❌ Erreur: ${error}`);
    }
    
    console.log('\n📊 4. Collecte des statistiques finales...');
    const finalStats = await temporaryPageGenerator.getStats();
    console.log(`   Pages temporaires: ${finalStats.total}`);
    console.log(`   Par type:`, finalStats.byType);
    console.log(`   Par priorité:`, finalStats.byPriority);
    
    console.log('\n✅ Workflow de maintenance simulé avec succès');
    
  } catch (error) {
    console.error('❌ Erreur lors du test de maintenance:', error);
  }
}

/**
 * Nettoyer les données de test
 */
async function cleanupTestData() {
  console.log('\n🧽 Nettoyage des données de test');
  console.log('=' .repeat(70));
  
  try {
    const testUrls = [
      '/ressources/guide-test-auto.pdf',
      '/outils/calculateur-test'
    ];
    
    for (const url of testUrls) {
      try {
        await temporaryPageGenerator.removeTemporaryPage(url);
        console.log(`✅ Page supprimée: ${url}`);
      } catch (error) {
        console.log(`⚠️  Page non trouvée: ${url}`);
      }
    }
    
    // Nettoyer le sitemap
    try {
      await sitemapIntegration.removeTemporaryPagesFromSitemap();
      console.log('✅ Pages temporaires supprimées du sitemap');
    } catch (error) {
      console.log(`⚠️  Erreur lors du nettoyage du sitemap: ${error}`);
    }
    
    console.log('\n🎉 Nettoyage terminé');
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
  }
}

/**
 * Fonction principale de test
 */
async function runAutoGenerationTests() {
  console.log('🚀 Démarrage des tests de génération automatique');
  console.log('=' .repeat(80));
  
  try {
    await testAutoGeneration();
    await testSitemapIntegration();
    await testMiddlewareIntegration();
    await testAutoCleanup();
    await testMaintenanceWorkflow();
    await cleanupTestData();
    
    console.log('\n🎉 Tous les tests de génération automatique sont terminés !');
    console.log('=' .repeat(80));
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution des tests:', error);
    process.exit(1);
  }
}

// Exécuter les tests si le script est appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  runAutoGenerationTests().catch(console.error);
}

export { runAutoGenerationTests };