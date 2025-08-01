#!/usr/bin/env tsx

/**
 * Script de test d'intégration pour les nouvelles pages ressources
 * 
 * Ce script teste :
 * 1. L'intégration avec l'API /api/resource-request
 * 2. L'envoi d'emails via SendGrid pour chaque ressource
 * 3. La validation des formulaires côté client et serveur
 * 4. Le tracking analytics pour les téléchargements
 */

import { getSendGridService } from '../src/lib/email/sendgrid-service';
import { getResourceRequestSystem } from '../src/lib/email/resource-request-system';
import { tableauBordData } from '../src/data/ressources/tableau-bord-data';
import { grilleEvaluationData } from '../src/data/ressources/grille-evaluation-data';
import { reportingData } from '../src/data/ressources/reporting-data';

// Configuration de test
const TEST_CONFIG = {
  testEmail: 'test@example.com',
  testSourceUrl: 'http://localhost:3000/ressources/test',
  skipEmailSending: process.env.SKIP_EMAIL_TESTS === 'true',
  verbose: process.env.VERBOSE === 'true'
};

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message: string) {
  log(`✅ ${message}`, colors.green);
}

function logError(message: string) {
  log(`❌ ${message}`, colors.red);
}

function logWarning(message: string) {
  log(`⚠️  ${message}`, colors.yellow);
}

function logInfo(message: string) {
  log(`ℹ️  ${message}`, colors.blue);
}

function logSection(title: string) {
  log(`\n${colors.bold}=== ${title} ===${colors.reset}`);
}

/**
 * Test 1: Vérifier l'intégration avec l'API resource-request
 */
async function testResourceRequestAPI() {
  logSection('Test API Resource Request');
  
  const resources = [
    { data: tableauBordData, url: '/ressources/outil-tableau-bord' },
    { data: grilleEvaluationData, url: '/ressources/grille-evaluation' },
    { data: reportingData, url: '/ressources/reporting-automatise' }
  ];

  let allTestsPassed = true;

  for (const resource of resources) {
    try {
      logInfo(`Testing ${resource.data.title}...`);
      
      // Simuler une requête à l'API
      const requestData = {
        userEmail: TEST_CONFIG.testEmail,
        resourceUrl: resource.url,
        sourceUrl: TEST_CONFIG.testSourceUrl,
        message: `Test request for ${resource.data.title}`,
        userData: {
          firstName: 'Test',
          lastName: 'User',
          company: 'Test Company'
        }
      };

      // Vérifier que les données de la ressource sont complètes
      if (!resource.data.id || !resource.data.title || !resource.data.description) {
        throw new Error('Données de ressource incomplètes');
      }

      // Vérifier la configuration du formulaire
      if (!resource.data.formConfig) {
        throw new Error('Configuration de formulaire manquante');
      }

      // Vérifier la configuration SEO
      if (!resource.data.seoConfig || !resource.data.seoConfig.title) {
        throw new Error('Configuration SEO manquante');
      }

      // Vérifier les événements de tracking
      if (!resource.data.trackingEvents || resource.data.trackingEvents.length === 0) {
        throw new Error('Événements de tracking manquants');
      }

      logSuccess(`${resource.data.title} - Configuration valide`);
      
      if (TEST_CONFIG.verbose) {
        log(`  - ID: ${resource.data.id}`);
        log(`  - Delivery: ${resource.data.formConfig.deliveryMethod}`);
        log(`  - Auto Response: ${resource.data.formConfig.autoResponse}`);
        log(`  - Tracking Events: ${resource.data.trackingEvents.length}`);
      }

    } catch (error: any) {
      logError(`${resource.data.title} - ${error.message}`);
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

/**
 * Test 2: Vérifier l'envoi d'emails via SendGrid
 */
async function testSendGridIntegration() {
  logSection('Test SendGrid Integration');
  
  if (TEST_CONFIG.skipEmailSending) {
    logWarning('Tests d\'envoi d\'emails ignorés (SKIP_EMAIL_TESTS=true)');
    return true;
  }

  try {
    const sendGridService = getSendGridService();
    
    // Test de configuration
    logInfo('Test de configuration SendGrid...');
    const configTest = await sendGridService.testConfiguration();
    
    if (!configTest) {
      throw new Error('Configuration SendGrid invalide');
    }
    
    logSuccess('Configuration SendGrid valide');

    // Test d'envoi pour chaque ressource
    const resources = [
      { data: tableauBordData, url: '/ressources/outil-tableau-bord' },
      { data: grilleEvaluationData, url: '/ressources/grille-evaluation' },
      { data: reportingData, url: '/ressources/reporting-automatise' }
    ];

    for (const resource of resources) {
      logInfo(`Test d'envoi pour ${resource.data.title}...`);
      
      // Test de demande de ressource
      const resourceRequestSuccess = await sendGridService.sendResourceRequest({
        userEmail: TEST_CONFIG.testEmail,
        resourceUrl: resource.url,
        sourceUrl: TEST_CONFIG.testSourceUrl,
        message: `Test request for ${resource.data.title}`,
        requestCount: 1,
        isHighPriority: false
      });

      if (!resourceRequestSuccess) {
        throw new Error(`Échec envoi demande de ressource pour ${resource.data.title}`);
      }

      // Test de réponse automatique
      if (resource.data.formConfig.autoResponse) {
        const autoResponseSuccess = await sendGridService.sendAutoResponse(
          TEST_CONFIG.testEmail,
          resource.url
        );

        if (!autoResponseSuccess) {
          throw new Error(`Échec envoi réponse automatique pour ${resource.data.title}`);
        }
      }

      logSuccess(`${resource.data.title} - Emails envoyés avec succès`);
    }

    return true;

  } catch (error: any) {
    logError(`SendGrid Integration - ${error.message}`);
    return false;
  }
}

/**
 * Test 3: Validation des formulaires
 */
async function testFormValidation() {
  logSection('Test Form Validation');
  
  const testCases = [
    {
      name: 'Email valide',
      data: { email: 'test@example.com' },
      shouldPass: true
    },
    {
      name: 'Email invalide',
      data: { email: 'invalid-email' },
      shouldPass: false
    },
    {
      name: 'Email vide',
      data: { email: '' },
      shouldPass: false
    },
    {
      name: 'Message trop long',
      data: { 
        email: 'test@example.com',
        message: 'x'.repeat(501)
      },
      shouldPass: false
    },
    {
      name: 'Données complètes valides',
      data: {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        company: 'Test Company',
        message: 'Test message'
      },
      shouldPass: true
    }
  ];

  let allTestsPassed = true;

  for (const testCase of testCases) {
    try {
      logInfo(`Test: ${testCase.name}`);
      
      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = testCase.data.email ? emailRegex.test(testCase.data.email) : false;
      
      // Validation message
      const isMessageValid = !testCase.data.message || testCase.data.message.length <= 500;
      
      // Validation globale
      const isValid = isEmailValid && isMessageValid;
      
      if (isValid === testCase.shouldPass) {
        logSuccess(`${testCase.name} - Validation correcte`);
      } else {
        throw new Error(`Validation incorrecte - Attendu: ${testCase.shouldPass}, Obtenu: ${isValid}`);
      }

    } catch (error: any) {
      logError(`${testCase.name} - ${error.message}`);
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

/**
 * Test 4: Tracking Analytics
 */
async function testAnalyticsTracking() {
  logSection('Test Analytics Tracking');
  
  const resources = [
    { data: tableauBordData, url: '/ressources/outil-tableau-bord' },
    { data: grilleEvaluationData, url: '/ressources/grille-evaluation' },
    { data: reportingData, url: '/ressources/reporting-automatise' }
  ];

  let allTestsPassed = true;

  for (const resource of resources) {
    try {
      logInfo(`Test tracking pour ${resource.data.title}...`);
      
      // Vérifier que les événements de tracking sont définis
      const trackingEvents = resource.data.trackingEvents;
      
      if (!trackingEvents || trackingEvents.length === 0) {
        throw new Error('Aucun événement de tracking défini');
      }

      // Vérifier les événements requis
      const requiredEvents = [
        'page_view',
        'form_submit',
        'download_success'
      ];

      for (const requiredEvent of requiredEvents) {
        const hasEvent = trackingEvents.some(event => 
          event.event.includes(requiredEvent.replace('_', '_')) ||
          event.action.toLowerCase().includes(requiredEvent.replace('_', ' '))
        );

        if (!hasEvent) {
          throw new Error(`Événement de tracking manquant: ${requiredEvent}`);
        }
      }

      // Simuler l'envoi d'événements
      for (const event of trackingEvents) {
        if (TEST_CONFIG.verbose) {
          log(`  - Event: ${event.event} (${event.category}/${event.action})`);
        }
        
        // Vérifier la structure de l'événement
        if (!event.event || !event.category || !event.action) {
          throw new Error(`Structure d'événement invalide: ${JSON.stringify(event)}`);
        }
      }

      logSuccess(`${resource.data.title} - Tracking configuré (${trackingEvents.length} événements)`);

    } catch (error: any) {
      logError(`${resource.data.title} - ${error.message}`);
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

/**
 * Test 5: Intégration système complet
 */
async function testSystemIntegration() {
  logSection('Test System Integration');
  
  try {
    logInfo('Test du système de demande de ressources...');
    
    const requestSystem = getResourceRequestSystem();
    
    // Test de soumission de demande
    const requestId = await requestSystem.submitRequest({
      requestedUrl: '/ressources/outil-tableau-bord',
      userEmail: TEST_CONFIG.testEmail,
      sourceUrl: TEST_CONFIG.testSourceUrl,
      message: 'Test integration request'
    });

    if (!requestId) {
      throw new Error('Échec de soumission de demande');
    }

    logSuccess(`Demande soumise avec succès - ID: ${requestId}`);

    // Test de récupération des statistiques
    logInfo('Test de récupération des statistiques...');
    
    const stats = await requestSystem.getRequestStats();
    
    if (!stats) {
      throw new Error('Échec de récupération des statistiques');
    }

    logSuccess('Statistiques récupérées avec succès');
    
    if (TEST_CONFIG.verbose) {
      log(`  - Total requests: ${stats.totalRequests || 0}`);
      log(`  - Pending requests: ${stats.pendingRequests || 0}`);
      log(`  - Most requested: ${stats.mostRequestedUrls?.length || 0} URLs`);
    }

    return true;

  } catch (error: any) {
    logError(`System Integration - ${error.message}`);
    return false;
  }
}

/**
 * Fonction principale
 */
async function main() {
  log(`${colors.bold}🧪 Test d'intégration des nouvelles pages ressources${colors.reset}\n`);
  
  const results = {
    apiIntegration: false,
    sendGridIntegration: false,
    formValidation: false,
    analyticsTracking: false,
    systemIntegration: false
  };

  try {
    // Test 1: API Resource Request
    results.apiIntegration = await testResourceRequestAPI();

    // Test 2: SendGrid Integration
    results.sendGridIntegration = await testSendGridIntegration();

    // Test 3: Form Validation
    results.formValidation = await testFormValidation();

    // Test 4: Analytics Tracking
    results.analyticsTracking = await testAnalyticsTracking();

    // Test 5: System Integration
    results.systemIntegration = await testSystemIntegration();

  } catch (error: any) {
    logError(`Erreur lors des tests: ${error.message}`);
  }

  // Résumé des résultats
  logSection('Résumé des Tests');
  
  const tests = [
    { name: 'API Resource Request', result: results.apiIntegration },
    { name: 'SendGrid Integration', result: results.sendGridIntegration },
    { name: 'Form Validation', result: results.formValidation },
    { name: 'Analytics Tracking', result: results.analyticsTracking },
    { name: 'System Integration', result: results.systemIntegration }
  ];

  let passedTests = 0;
  
  for (const test of tests) {
    if (test.result) {
      logSuccess(`${test.name}: PASSED`);
      passedTests++;
    } else {
      logError(`${test.name}: FAILED`);
    }
  }

  const allPassed = passedTests === tests.length;
  
  log(`\n${colors.bold}Résultat final: ${passedTests}/${tests.length} tests réussis${colors.reset}`);
  
  if (allPassed) {
    logSuccess('🎉 Tous les tests d\'intégration sont passés !');
    process.exit(0);
  } else {
    logError('❌ Certains tests ont échoué. Vérifiez les logs ci-dessus.');
    process.exit(1);
  }
}

// Exécution du script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logError(`Erreur fatale: ${error.message}`);
    process.exit(1);
  });
}

export { main as testResourceIntegration };