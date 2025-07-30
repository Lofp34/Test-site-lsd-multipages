/**
 * Script de test pour le système de pages temporaires
 * 
 * Ce script teste la création, la gestion et la détection automatique
 * des pages temporaires pour ressources manquantes.
 */

import { temporaryPageGenerator, TemporaryPageConfig } from '../src/lib/temporary-pages/generator';
import { autoDetector, defaultDetectionConfig } from '../src/lib/temporary-pages/auto-detector';

/**
 * Tester la création manuelle de pages temporaires
 */
async function testManualPageCreation() {
  console.log('\n🧪 Test de création manuelle de pages temporaires');
  console.log('=' .repeat(60));
  
  try {
    // Configuration de test
    const testConfigs: TemporaryPageConfig[] = [
      {
        resourceUrl: '/ressources/guide-prospection-avancee.pdf',
        sourceUrl: '/ressources',
        resourceType: 'download',
        title: 'Guide de Prospection Avancée',
        description: 'Guide complet sur les techniques de prospection modernes',
        estimatedDate: 'Mars 2025',
        priority: 'high',
        developmentStatus: 'in_progress',
        progress: 60,
        alternatives: [
          {
            title: 'Guide de base de la prospection',
            url: '/ressources/prospection-base',
            description: 'Version simplifiée du guide',
            type: 'internal'
          }
        ]
      },
      {
        resourceUrl: '/outils/calculateur-roi-commercial',
        sourceUrl: '/outils',
        resourceType: 'tool',
        title: 'Calculateur ROI Commercial',
        description: 'Outil pour calculer le retour sur investissement des actions commerciales',
        priority: 'medium',
        developmentStatus: 'planned'
      },
      {
        resourceUrl: '/templates/email-prospection-b2b.docx',
        sourceUrl: '/ressources/templates',
        resourceType: 'template',
        title: 'Templates d\'emails de prospection B2B',
        description: 'Collection de templates d\'emails pour la prospection B2B',
        estimatedDate: 'Février 2025',
        priority: 'high'
      }
    ];
    
    // Créer les pages temporaires
    for (const config of testConfigs) {
      try {
        console.log(`\n📄 Création de la page temporaire pour: ${config.resourceUrl}`);
        
        const temporaryUrl = await temporaryPageGenerator.createTemporaryPage(config);
        
        console.log(`✅ Page temporaire créée: ${temporaryUrl}`);
        console.log(`   Type: ${config.resourceType}`);
        console.log(`   Priorité: ${config.priority}`);
        console.log(`   Statut: ${config.developmentStatus}`);
        
      } catch (error) {
        console.error(`❌ Erreur lors de la création de ${config.resourceUrl}:`, error);
      }
    }
    
    // Afficher les statistiques
    console.log('\n📊 Statistiques des pages temporaires:');
    const stats = await temporaryPageGenerator.getStats();
    console.log(`   Total: ${stats.total}`);
    console.log(`   Par type:`, stats.byType);
    console.log(`   Par priorité:`, stats.byPriority);
    console.log(`   Par statut:`, stats.byStatus);
    
  } catch (error) {
    console.error('❌ Erreur lors du test de création manuelle:', error);
  }
}

/**
 * Tester la mise à jour des pages temporaires
 */
async function testPageUpdates() {
  console.log('\n🔄 Test de mise à jour des pages temporaires');
  console.log('=' .repeat(60));
  
  try {
    const resourceUrl = '/ressources/guide-prospection-avancee.pdf';
    
    console.log(`\n📝 Mise à jour de: ${resourceUrl}`);
    
    await temporaryPageGenerator.updateTemporaryPage(resourceUrl, {
      progress: 80,
      developmentStatus: 'review',
      estimatedDate: 'Février 2025'
    });
    
    console.log('✅ Page temporaire mise à jour avec succès');
    
    // Vérifier la mise à jour
    const pages = await temporaryPageGenerator.getAllTemporaryPages();
    const updatedPage = Object.values(pages).find(page => page.resourceUrl === resourceUrl);
    
    if (updatedPage) {
      console.log(`   Nouveau progrès: ${updatedPage.progress}%`);
      console.log(`   Nouveau statut: ${updatedPage.developmentStatus}`);
      console.log(`   Nouvelle date: ${updatedPage.estimatedDate}`);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test de mise à jour:', error);
  }
}

/**
 * Tester la détection automatique (simulation)
 */
async function testAutoDetection() {
  console.log('\n🔍 Test de détection automatique (simulation)');
  console.log('=' .repeat(60));
  
  try {
    // Configuration de test avec URL locale
    const testConfig = {
      ...defaultDetectionConfig,
      baseUrl: 'http://localhost:3000',
      maxDepth: 2,
      excludePatterns: [
        ...defaultDetectionConfig.excludePatterns,
        '/test/*'
      ]
    };
    
    console.log('🚀 Lancement de la détection automatique...');
    console.log(`   URL de base: ${testConfig.baseUrl}`);
    console.log(`   Profondeur max: ${testConfig.maxDepth}`);
    console.log(`   Timeout: ${testConfig.timeout}ms`);
    
    // Note: Cette fonction nécessite que le serveur soit en cours d'exécution
    // Pour les tests, on simule le résultat
    console.log('⚠️  Simulation de la détection (serveur requis pour test réel)');
    
    const simulatedResult = {
      totalLinks: 150,
      brokenLinks: 5,
      temporaryPagesCreated: 3,
      brokenLinkDetails: [
        {
          url: '/ressources/guide-manquant.pdf',
          sourceFiles: ['src/app/ressources/page.tsx'],
          linkType: 'download',
          error: 'File not found',
          temporaryPageCreated: true,
          temporaryPageUrl: '/temporary-resource?url=%2Fressources%2Fguide-manquant.pdf'
        }
      ],
      errors: []
    };
    
    console.log('\n📊 Résultats de la détection (simulés):');
    console.log(`   Liens scannés: ${simulatedResult.totalLinks}`);
    console.log(`   Liens morts: ${simulatedResult.brokenLinks}`);
    console.log(`   Pages temporaires créées: ${simulatedResult.temporaryPagesCreated}`);
    console.log(`   Erreurs: ${simulatedResult.errors.length}`);
    
  } catch (error) {
    console.error('❌ Erreur lors du test de détection automatique:', error);
  }
}

/**
 * Tester le nettoyage des pages obsolètes
 */
async function testCleanup() {
  console.log('\n🧹 Test de nettoyage des pages obsolètes');
  console.log('=' .repeat(60));
  
  try {
    console.log('🚀 Lancement du nettoyage...');
    
    // Simulation du nettoyage
    console.log('⚠️  Simulation du nettoyage (validation réseau requise pour test réel)');
    
    const simulatedCleanup = {
      removed: 1,
      errors: []
    };
    
    console.log('\n📊 Résultats du nettoyage (simulés):');
    console.log(`   Pages supprimées: ${simulatedCleanup.removed}`);
    console.log(`   Erreurs: ${simulatedCleanup.errors.length}`);
    
  } catch (error) {
    console.error('❌ Erreur lors du test de nettoyage:', error);
  }
}

/**
 * Tester la suppression de pages temporaires
 */
async function testPageDeletion() {
  console.log('\n🗑️  Test de suppression de pages temporaires');
  console.log('=' .repeat(60));
  
  try {
    const resourceUrl = '/outils/calculateur-roi-commercial';
    
    console.log(`\n🗑️  Suppression de: ${resourceUrl}`);
    
    await temporaryPageGenerator.removeTemporaryPage(resourceUrl);
    
    console.log('✅ Page temporaire supprimée avec succès');
    
    // Vérifier la suppression
    const pages = await temporaryPageGenerator.getAllTemporaryPages();
    const deletedPage = Object.values(pages).find(page => page.resourceUrl === resourceUrl);
    
    if (!deletedPage) {
      console.log('✅ Confirmation: la page n\'existe plus dans la configuration');
    } else {
      console.log('⚠️  La page existe encore dans la configuration');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test de suppression:', error);
  }
}

/**
 * Afficher l'état final
 */
async function displayFinalState() {
  console.log('\n📋 État final du système');
  console.log('=' .repeat(60));
  
  try {
    const pages = await temporaryPageGenerator.getAllTemporaryPages();
    const stats = await temporaryPageGenerator.getStats();
    
    console.log(`\n📊 Statistiques finales:`);
    console.log(`   Total des pages: ${stats.total}`);
    console.log(`   Par type:`, stats.byType);
    console.log(`   Par priorité:`, stats.byPriority);
    console.log(`   Par statut:`, stats.byStatus);
    
    console.log(`\n📄 Pages temporaires actives:`);
    Object.values(pages).forEach((page, index) => {
      console.log(`   ${index + 1}. ${page.title || page.resourceUrl}`);
      console.log(`      URL: ${page.resourceUrl}`);
      console.log(`      Type: ${page.resourceType} | Priorité: ${page.priority}`);
      console.log(`      Statut: ${page.developmentStatus}${page.progress ? ` (${page.progress}%)` : ''}`);
      if (page.estimatedDate) {
        console.log(`      Date prévue: ${page.estimatedDate}`);
      }
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'affichage de l\'état final:', error);
  }
}

/**
 * Fonction principale de test
 */
async function runTests() {
  console.log('🚀 Démarrage des tests du système de pages temporaires');
  console.log('=' .repeat(80));
  
  try {
    await testManualPageCreation();
    await testPageUpdates();
    await testAutoDetection();
    await testCleanup();
    await testPageDeletion();
    await displayFinalState();
    
    console.log('\n🎉 Tous les tests sont terminés !');
    console.log('=' .repeat(80));
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution des tests:', error);
    process.exit(1);
  }
}

// Exécuter les tests si le script est appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { runTests };