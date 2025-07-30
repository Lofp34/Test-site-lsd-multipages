#!/usr/bin/env tsx

/**
 * Script de test pour le service SendGrid complet
 * Teste toutes les fonctionnalités du SendGridEmailService
 */

import { SendGridEmailService, ResourceRequestEmail, AuditAlertData, WeeklyReportData } from '../src/lib/email/sendgrid-service';
import { ResourceRequestSystem } from '../src/lib/email/resource-request-system';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

/**
 * Test du service SendGrid complet
 */
async function testSendGridService() {
  console.log('🚀 Test du service SendGrid complet...\n');

  const emailService = new SendGridEmailService();

  // Test 1: Configuration
  console.log('🔧 Test 1: Configuration du service...');
  const configTest = await emailService.testConfiguration();
  console.log('Résultat:', configTest ? '✅' : '❌');

  // Test 2: Email de demande de ressource
  console.log('\n📧 Test 2: Email de demande de ressource...');
  const resourceRequest: ResourceRequestEmail = {
    userEmail: 'test.user@example.com',
    resourceUrl: '/ressources/guide-prospection-avancee.pdf',
    sourceUrl: 'https://laurentserre.com/ressources/meilleurs-livres/prospection-sdr',
    message: 'Bonjour Laurent, je suis très intéressé par ce guide sur la prospection avancée. J\'aimerais l\'avoir pour améliorer mes techniques de prospection B2B. Merci beaucoup !',
    requestCount: 7,
    isHighPriority: true
  };

  const resourceRequestTest = await emailService.sendResourceRequest(resourceRequest);
  console.log('Résultat:', resourceRequestTest ? '✅' : '❌');

  // Test 3: Alerte liens morts
  console.log('\n🚨 Test 3: Alerte liens morts...');
  const alertData: AuditAlertData = {
    brokenLinksCount: 15,
    totalLinks: 234,
    healthScore: 87,
    timestamp: new Date().toLocaleString('fr-FR'),
    criticalLinks: [
      {
        url: '/ressources/guide-negociation-avancee.pdf',
        error: 'Fichier non trouvé (404)',
        seoImpact: 'Élevé',
        sourceFiles: 'page-negociation.tsx, blog-article-1.md',
        priority: 'critical'
      },
      {
        url: '/formation/module-prospection-digitale',
        error: 'Page non accessible (500)',
        seoImpact: 'Critique',
        sourceFiles: 'formation-page.tsx',
        priority: 'critical'
      },
      {
        url: '/ressources/checklist-closing.xlsx',
        error: 'Lien cassé (404)',
        seoImpact: 'Moyen',
        sourceFiles: 'closing-techniques.tsx',
        priority: 'critical'
      }
    ],
    reportUrl: 'https://laurentserre.com/admin/audit-report-2025-01-27'
  };

  const alertTest = await emailService.sendAuditAlert(alertData);
  console.log('Résultat:', alertTest ? '✅' : '❌');

  // Test 4: Réponse automatique
  console.log('\n📬 Test 4: Réponse automatique...');
  const autoResponseTest = await emailService.sendAutoResponse(
    'test.user@example.com',
    '/ressources/guide-prospection-avancee.pdf'
  );
  console.log('Résultat:', autoResponseTest ? '✅' : '❌');

  // Test 5: Rapport hebdomadaire
  console.log('\n📊 Test 5: Rapport hebdomadaire...');
  const weeklyReportData: WeeklyReportData = {
    period: '20-27 Janvier 2025',
    totalAudits: 14,
    averageHealthScore: 94,
    totalBrokenLinks: 23,
    totalCorrections: 18,
    mostRequestedResources: [
      { url: '/ressources/guide-prospection-avancee.pdf', count: 12 },
      { url: '/ressources/templates-emails-prospection.zip', count: 8 },
      { url: '/formation/module-negociation-avancee', count: 6 }
    ],
    trends: {
      healthScoreChange: 3,
      brokenLinksChange: -5
    }
  };

  const weeklyReportTest = await emailService.sendWeeklyReport(weeklyReportData);
  console.log('Résultat:', weeklyReportTest ? '✅' : '❌');

  return {
    config: configTest,
    resourceRequest: resourceRequestTest,
    alert: alertTest,
    autoResponse: autoResponseTest,
    weeklyReport: weeklyReportTest
  };
}

/**
 * Test du système de demandes de ressources
 */
async function testResourceRequestSystem() {
  console.log('\n🗃️ Test du système de demandes de ressources...\n');

  const requestSystem = new ResourceRequestSystem();

  // Test 1: Soumission d'une demande
  console.log('📝 Test 1: Soumission d\'une demande...');
  try {
    const requestId = await requestSystem.submitRequest({
      requestedUrl: '/ressources/guide-test-prospection.pdf',
      userEmail: 'test.user@example.com',
      sourceUrl: 'https://laurentserre.com/ressources/meilleurs-livres/prospection-sdr',
      message: 'Test de demande de ressource via le système automatisé'
    });
    console.log('✅ Demande soumise avec l\'ID:', requestId);
  } catch (error: any) {
    console.log('❌ Erreur lors de la soumission:', error.message);
  }

  // Test 2: Statistiques
  console.log('\n📊 Test 2: Récupération des statistiques...');
  try {
    const stats = await requestSystem.getRequestStats();
    console.log('✅ Statistiques récupérées:');
    console.log('  - Total:', stats.total);
    console.log('  - En attente:', stats.pending);
    console.log('  - En cours:', stats.inProgress);
    console.log('  - Terminées:', stats.completed);
    console.log('  - Plus demandées:', stats.mostRequested.slice(0, 3));
  } catch (error: any) {
    console.log('❌ Erreur lors de la récupération des statistiques:', error.message);
  }

  // Test 3: Ressources les plus demandées
  console.log('\n🔥 Test 3: Ressources les plus demandées...');
  try {
    const mostRequested = await requestSystem.getMostRequestedResources(5);
    console.log('✅ Ressources les plus demandées:');
    mostRequested.forEach((resource, index) => {
      console.log(`  ${index + 1}. ${resource.url} (${resource.count} demandes)`);
    });
  } catch (error: any) {
    console.log('❌ Erreur lors de la récupération:', error.message);
  }

  // Test 4: Demandes en attente
  console.log('\n⏳ Test 4: Demandes en attente...');
  try {
    const pendingRequests = await requestSystem.getPendingRequests(5);
    console.log(`✅ ${pendingRequests.length} demandes en attente trouvées`);
    pendingRequests.forEach((request, index) => {
      console.log(`  ${index + 1}. ${request.requestedUrl} (priorité: ${request.priority})`);
    });
  } catch (error: any) {
    console.log('❌ Erreur lors de la récupération:', error.message);
  }

  return true;
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🧪 Tests complets du système SendGrid et demandes de ressources\n');
  console.log('📧 Emails de test envoyés vers:', process.env.ADMIN_EMAIL || 'ls@laurentserre.com');
  console.log('=' .repeat(60));

  // Tests du service SendGrid
  const emailResults = await testSendGridService();

  console.log('\n' + '=' .repeat(60));

  // Tests du système de demandes
  const requestSystemResult = await testResourceRequestSystem();

  // Résumé final
  console.log('\n' + '=' .repeat(60));
  console.log('📋 RÉSUMÉ DES TESTS');
  console.log('=' .repeat(60));
  
  console.log('\n📧 Service SendGrid:');
  console.log('  - Configuration:', emailResults.config ? '✅' : '❌');
  console.log('  - Demande de ressource:', emailResults.resourceRequest ? '✅' : '❌');
  console.log('  - Alerte liens morts:', emailResults.alert ? '✅' : '❌');
  console.log('  - Réponse automatique:', emailResults.autoResponse ? '✅' : '❌');
  console.log('  - Rapport hebdomadaire:', emailResults.weeklyReport ? '✅' : '❌');

  console.log('\n🗃️ Système de demandes:');
  console.log('  - Fonctionnement général:', requestSystemResult ? '✅' : '❌');

  const allEmailTestsPassed = Object.values(emailResults).every(result => result);
  const allTestsPassed = allEmailTestsPassed && requestSystemResult;

  if (allTestsPassed) {
    console.log('\n🎉 TOUS LES TESTS ONT RÉUSSI !');
    console.log('📧 Vérifiez votre boîte email pour voir les emails de test.');
    console.log('🗃️ Le système de demandes de ressources est opérationnel.');
  } else {
    console.log('\n❌ CERTAINS TESTS ONT ÉCHOUÉ');
    console.log('Vérifiez la configuration et les logs d\'erreur ci-dessus.');
    process.exit(1);
  }
}

// Exécuter les tests
main().catch(console.error);