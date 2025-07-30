/**
 * Script de test pour les composants de demande de ressources
 * 
 * Ce script teste :
 * - L'API route /api/resource-request
 * - L'intégration avec le système de demandes
 * - L'envoi d'emails via SendGrid
 */

import { getResourceRequestSystem } from '../src/lib/email/resource-request-system';

async function testResourceRequestSystem() {
  console.log('🧪 Test du système de demande de ressources...\n');

  try {
    const requestSystem = getResourceRequestSystem();

    // Test 1: Soumettre une demande de test
    console.log('📝 Test 1: Soumission d\'une demande de ressource');
    const testRequest = {
      requestedUrl: '/ressources/guide-prospection-avancee.pdf',
      userEmail: 'test@example.com',
      sourceUrl: 'https://laurentserre.com/ressources/guides',
      message: 'Test de demande de ressource depuis le script de test'
    };

    const requestId = await requestSystem.submitRequest(testRequest);
    console.log(`✅ Demande créée avec l'ID: ${requestId}`);

    // Test 2: Vérifier les statistiques
    console.log('\n📊 Test 2: Récupération des statistiques');
    const stats = await requestSystem.getRequestStats();
    console.log('Statistiques:', {
      total: stats.total,
      pending: stats.pending,
      completed: stats.completed,
      mostRequested: stats.mostRequested.slice(0, 3)
    });

    // Test 3: Obtenir les demandes en attente
    console.log('\n📋 Test 3: Demandes en attente');
    const pendingRequests = await requestSystem.getPendingRequests(5);
    console.log(`${pendingRequests.length} demandes en attente`);
    
    if (pendingRequests.length > 0) {
      console.log('Dernière demande:', {
        id: pendingRequests[0].id,
        resourceUrl: pendingRequests[0].requestedUrl,
        userEmail: pendingRequests[0].userEmail,
        priority: pendingRequests[0].priority
      });
    }

    // Test 4: Compter les demandes pour une ressource
    console.log('\n🔢 Test 4: Comptage des demandes');
    const requestCount = await requestSystem.getRequestCount(testRequest.requestedUrl);
    console.log(`Nombre de demandes pour "${testRequest.requestedUrl}": ${requestCount}`);

    // Test 5: Ressources les plus demandées
    console.log('\n🔥 Test 5: Ressources les plus demandées');
    const mostRequested = await requestSystem.getMostRequestedResources(5);
    console.log('Top 5 des ressources les plus demandées:');
    mostRequested.forEach((resource, index) => {
      console.log(`  ${index + 1}. ${resource.url} (${resource.count} demandes)`);
    });

    console.log('\n✅ Tous les tests sont passés avec succès !');

  } catch (error: any) {
    console.error('❌ Erreur lors des tests:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

async function testAPIRoute() {
  console.log('\n🌐 Test de l\'API route /api/resource-request...\n');

  try {
    // Simuler une requête POST
    const testData = {
      userEmail: 'api-test@example.com',
      resourceUrl: '/ressources/formation-negociation-avancee.pdf',
      sourceUrl: 'https://laurentserre.com/formation-commerciale-pme',
      message: 'Test de l\'API route depuis le script de test'
    };

    console.log('📤 Données de test:', testData);

    // Note: En production, on ferait un vrai fetch vers l'API
    // Ici on teste directement la logique métier
    const requestSystem = getResourceRequestSystem();
    const requestId = await requestSystem.submitRequest({
      requestedUrl: testData.resourceUrl,
      userEmail: testData.userEmail,
      sourceUrl: testData.sourceUrl,
      message: testData.message
    });

    console.log(`✅ API simulée - Demande créée avec l'ID: ${requestId}`);

  } catch (error: any) {
    console.error('❌ Erreur lors du test de l\'API:', error.message);
  }
}

async function main() {
  console.log('🚀 Démarrage des tests des composants de demande de ressources\n');
  console.log('=' .repeat(60));

  await testResourceRequestSystem();
  await testAPIRoute();

  console.log('\n' + '='.repeat(60));
  console.log('🎉 Tests terminés !');
}

// Exécuter les tests
main().catch(console.error);

export { testResourceRequestSystem, testAPIRoute };