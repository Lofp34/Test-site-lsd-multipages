#!/usr/bin/env tsx

/**
 * Script de test pour valider l'intégration Gemini avec les instructions Laurent Serre
 */

import dotenv from 'dotenv';
import { GeminiService } from '../src/lib/gemini/service';
import { StreamingManager } from '../src/lib/gemini/streaming';

// Charger les variables d'environnement
dotenv.config({ path: '.env' });

async function testGeminiChat() {
  console.log('🚀 Test du chat Gemini avec instructions Laurent Serre\n');

  // Pour le test, utilisons directement la clé (à ne pas faire en production)
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyC17LYQE1GQS2dPJmh9z0zi1vNX4UpnvOE';

  try {
    // Initialiser le service
    const geminiService = new GeminiService(apiKey);
    console.log('✅ Service Gemini initialisé');

    // Initialiser le chat
    await geminiService.initializeChat();
    console.log('✅ Chat initialisé avec instructions système Laurent Serre');

    // Test 1: Question générale sur le développement commercial
    console.log('\n📝 Test 1: Question sur le développement commercial');
    const question1 = "Bonjour, je suis dirigeant d'une PME de 50 salariés et j'ai des difficultés avec ma prospection. Pouvez-vous m'aider ?";
    
    console.log(`Question: ${question1}`);
    console.log('Réponse en streaming:');
    
    const streamGenerator1 = await geminiService.sendMessage(question1);
    const streamingManager1 = new StreamingManager(
      (chunk) => process.stdout.write(chunk),
      (fullMessage) => console.log('\n✅ Réponse complète reçue'),
      (error) => console.error('❌ Erreur:', error)
    );
    
    await streamingManager1.processStream(streamGenerator1);

    // Test 2: Question sur les services Laurent Serre
    console.log('\n\n📝 Test 2: Question sur les formations');
    const question2 = "Quelles formations proposez-vous pour améliorer les compétences de mon équipe commerciale ?";
    
    console.log(`Question: ${question2}`);
    console.log('Réponse en streaming:');
    
    const streamGenerator2 = await geminiService.sendMessage(question2);
    const streamingManager2 = new StreamingManager(
      (chunk) => process.stdout.write(chunk),
      (fullMessage) => console.log('\n✅ Réponse complète reçue'),
      (error) => console.error('❌ Erreur:', error)
    );
    
    await streamingManager2.processStream(streamGenerator2);

    // Test 3: Question hors expertise
    console.log('\n\n📝 Test 3: Question hors expertise (cuisine)');
    const question3 = "Quelle est la meilleure recette de tarte aux pommes ?";
    
    console.log(`Question: ${question3}`);
    console.log('Réponse en streaming:');
    
    const streamGenerator3 = await geminiService.sendMessage(question3);
    const streamingManager3 = new StreamingManager(
      (chunk) => process.stdout.write(chunk),
      (fullMessage) => console.log('\n✅ Réponse complète reçue'),
      (error) => console.error('❌ Erreur:', error)
    );
    
    await streamingManager3.processStream(streamGenerator3);

    // Afficher les statistiques
    console.log('\n\n📊 Statistiques de la session:');
    const stats = geminiService.getSessionStats();
    console.log(`- Messages échangés: ${stats.messageCount}`);
    console.log(`- Chat initialisé: ${stats.isInitialized}`);
    console.log(`- Configuration valide: ${stats.configValid}`);

    console.log('\n🎉 Tests terminés avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
    process.exit(1);
  }
}

// Fonction pour tester la gestion d'erreurs
async function testErrorHandling() {
  console.log('\n🔧 Test de la gestion d\'erreurs\n');

  try {
    // Test avec une clé API invalide
    const invalidService = new GeminiService('invalid-key');
    await invalidService.initializeChat();
    
    const streamGenerator = await invalidService.sendMessage('Test message');
    
    // Ceci devrait lever une erreur
    for await (const chunk of streamGenerator) {
      console.log(chunk);
    }
    
  } catch (error) {
    console.log('✅ Erreur correctement gérée:', error);
  }
}

// Fonction principale
async function main() {
  await testGeminiChat();
  await testErrorHandling();
}

// Exécuter les tests
main().catch(console.error);

export { testGeminiChat, testErrorHandling };