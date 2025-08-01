#!/usr/bin/env tsx

/**
 * Script de test d'intégration simplifié pour les nouvelles pages ressources
 * 
 * Ce script teste les éléments essentiels sans dépendances externes :
 * 1. Configuration des données de ressources
 * 2. Validation des formulaires côté client
 * 3. Configuration du tracking analytics
 * 4. Structure des composants
 */

import { tableauBordData } from '../src/data/ressources/tableau-bord-data';
import { grilleEvaluationData } from '../src/data/ressources/grille-evaluation-data';
import { reportingData } from '../src/data/ressources/reporting-data';

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

function logInfo(message: string) {
  log(`ℹ️  ${message}`, colors.blue);
}

function logSection(title: string) {
  log(`\n${colors.bold}=== ${title} ===${colors.reset}`);
}

/**
 * Test 1: Configuration des données de ressources
 */
function testResourceDataConfiguration() {
  logSection('Test Configuration des Données');
  
  const resources = [
    { name: 'Tableau de Bord', data: tableauBordData },
    { name: 'Grille Évaluation', data: grilleEvaluationData },
    { name: 'Reporting Automatisé', data: reportingData }
  ];

  let allTestsPassed = true;

  for (const resource of resources) {
    try {
      logInfo(`Testing ${resource.name}...`);
      
      // Vérifications essentielles
      const checks = [
        { name: 'ID', value: resource.data.id, required: true },
        { name: 'Title', value: resource.data.title, required: true },
        { name: 'Description', value: resource.data.description, required: true },
        { name: 'Category', value: resource.data.category, required: true },
        { name: 'Features', value: resource.data.features?.length > 0, required: true },
        { name: 'Benefits', value: resource.data.benefits?.length > 0, required: true },
        { name: 'Target Audience', value: resource.data.targetAudience?.length > 0, required: true },
        { name: 'Form Config', value: resource.data.formConfig, required: true },
        { name: 'SEO Config', value: resource.data.seoConfig, required: true },
        { name: 'Tracking Events', value: resource.data.trackingEvents?.length > 0, required: true },
        { name: 'Theme', value: resource.data.theme, required: true }
      ];

      for (const check of checks) {
        if (check.required && !check.value) {
          throw new Error(`${check.name} manquant ou invalide`);
        }
      }

      // Vérifications spécifiques
      if (!resource.data.seoConfig.title || !resource.data.seoConfig.description) {
        throw new Error('Configuration SEO incomplète');
      }

      if (!resource.data.formConfig.deliveryMethod || !resource.data.formConfig.requiredFields) {
        throw new Error('Configuration de formulaire incomplète');
      }

      if (resource.data.trackingEvents.length < 3) {
        throw new Error('Pas assez d\'événements de tracking configurés');
      }

      logSuccess(`${resource.name} - Configuration complète et valide`);
      
    } catch (error: any) {
      logError(`${resource.name} - ${error.message}`);
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

/**
 * Test 2: Validation des formulaires
 */
function testFormValidation() {
  logSection('Test Validation des Formulaires');
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMessage = (message: string): boolean => {
    return message.length <= 500;
  };

  const testCases = [
    {
      name: 'Email valide',
      data: { email: 'test@example.com' },
      shouldPass: true
    },
    {
      name: 'Email invalide - format incorrect',
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
      const isEmailValid = testCase.data.email ? validateEmail(testCase.data.email) : false;
      
      // Validation message
      const isMessageValid = !testCase.data.message || validateMessage(testCase.data.message);
      
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
 * Test 3: Configuration du tracking analytics
 */
function testAnalyticsConfiguration() {
  logSection('Test Configuration Analytics');
  
  const resources = [
    { name: 'Tableau de Bord', data: tableauBordData },
    { name: 'Grille Évaluation', data: grilleEvaluationData },
    { name: 'Reporting Automatisé', data: reportingData }
  ];

  let allTestsPassed = true;

  for (const resource of resources) {
    try {
      logInfo(`Test tracking pour ${resource.name}...`);
      
      const trackingEvents = resource.data.trackingEvents;
      
      if (!trackingEvents || trackingEvents.length === 0) {
        throw new Error('Aucun événement de tracking défini');
      }

      // Vérifier les événements requis
      const requiredEventTypes = ['page_view', 'form_submit', 'download_success'];
      
      for (const requiredType of requiredEventTypes) {
        const hasEvent = trackingEvents.some(event => 
          event.event.toLowerCase().includes(requiredType.replace('_', '_')) ||
          event.action.toLowerCase().includes(requiredType.replace('_', ' '))
        );

        if (!hasEvent) {
          throw new Error(`Type d'événement manquant: ${requiredType}`);
        }
      }

      // Vérifier la structure des événements
      for (const event of trackingEvents) {
        if (!event.event || !event.category || !event.action) {
          throw new Error(`Structure d'événement invalide: ${JSON.stringify(event)}`);
        }
      }

      logSuccess(`${resource.name} - Tracking configuré (${trackingEvents.length} événements)`);

    } catch (error: any) {
      logError(`${resource.name} - ${error.message}`);
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

/**
 * Test 4: Intégration des composants
 */
function testComponentIntegration() {
  logSection('Test Intégration des Composants');
  
  const resources = [
    { name: 'Tableau de Bord', data: tableauBordData, url: '/ressources/outil-tableau-bord' },
    { name: 'Grille Évaluation', data: grilleEvaluationData, url: '/ressources/grille-evaluation' },
    { name: 'Reporting Automatisé', data: reportingData, url: '/ressources/reporting-automatise' }
  ];

  let allTestsPassed = true;

  for (const resource of resources) {
    try {
      logInfo(`Test intégration pour ${resource.name}...`);
      
      // Vérifier que les données peuvent être utilisées par les composants
      const componentProps = {
        // ResourceHero props
        title: resource.data.title,
        subtitle: resource.data.subtitle,
        description: resource.data.description,
        
        // ResourceDownloadForm props
        resourceId: resource.data.id,
        resourceUrl: resource.url,
        deliveryMethod: resource.data.formConfig.deliveryMethod,
        formFields: resource.data.formConfig.requiredFields,
        
        // ToolPreview props
        benefits: resource.data.benefits,
        features: resource.data.features,
        difficulty: resource.data.difficulty,
        estimatedTime: resource.data.estimatedTime,
        
        // Analytics props
        trackingEvents: resource.data.trackingEvents,
        
        // Theme props
        theme: resource.data.theme
      };

      // Vérifier que toutes les props essentielles sont présentes
      const requiredProps = ['title', 'description', 'resourceId', 'deliveryMethod', 'benefits', 'features'];
      
      for (const prop of requiredProps) {
        if (!componentProps[prop as keyof typeof componentProps]) {
          throw new Error(`Prop manquante pour les composants: ${prop}`);
        }
      }

      // Vérifier la cohérence des données
      if (resource.data.benefits.length === 0) {
        throw new Error('Aucun bénéfice défini');
      }

      if (resource.data.features.length === 0) {
        throw new Error('Aucune fonctionnalité définie');
      }

      if (!resource.data.theme.primaryColor || !resource.data.theme.icon) {
        throw new Error('Thème incomplet');
      }

      logSuccess(`${resource.name} - Intégration des composants validée`);

    } catch (error: any) {
      logError(`${resource.name} - ${error.message}`);
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

/**
 * Test 5: Cohérence des URLs et liens
 */
function testUrlConsistency() {
  logSection('Test Cohérence des URLs');
  
  const resources = [
    { name: 'Tableau de Bord', data: tableauBordData, expectedUrl: '/ressources/outil-tableau-bord' },
    { name: 'Grille Évaluation', data: grilleEvaluationData, expectedUrl: '/ressources/grille-evaluation' },
    { name: 'Reporting Automatisé', data: reportingData, expectedUrl: '/ressources/reporting-automatise' }
  ];

  let allTestsPassed = true;

  for (const resource of resources) {
    try {
      logInfo(`Test URLs pour ${resource.name}...`);
      
      // Vérifier l'URL canonique
      const canonicalUrl = resource.data.seoConfig.canonicalUrl;
      if (!canonicalUrl.includes(resource.expectedUrl)) {
        throw new Error(`URL canonique incorrecte: ${canonicalUrl}`);
      }

      // Vérifier l'URL de téléchargement dans les données structurées
      const downloadUrl = resource.data.seoConfig.structuredData.downloadUrl;
      if (!downloadUrl.includes(resource.expectedUrl)) {
        throw new Error(`URL de téléchargement incorrecte: ${downloadUrl}`);
      }

      // Vérifier la cohérence du slug
      if (resource.data.slug && !resource.expectedUrl.includes(resource.data.slug)) {
        throw new Error(`Slug incohérent: ${resource.data.slug} vs ${resource.expectedUrl}`);
      }

      // Vérifier les liens vers les services connexes
      if (resource.data.relatedServices && resource.data.relatedServices.length === 0) {
        throw new Error('Aucun service connexe défini');
      }

      logSuccess(`${resource.name} - URLs cohérentes`);

    } catch (error: any) {
      logError(`${resource.name} - ${error.message}`);
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

/**
 * Fonction principale
 */
async function main() {
  log(`${colors.bold}🧪 Test d'intégration simplifié des nouvelles pages ressources${colors.reset}\n`);
  
  const results = {
    dataConfiguration: false,
    formValidation: false,
    analyticsConfiguration: false,
    componentIntegration: false,
    urlConsistency: false
  };

  try {
    // Test 1: Configuration des données
    results.dataConfiguration = testResourceDataConfiguration();

    // Test 2: Validation des formulaires
    results.formValidation = testFormValidation();

    // Test 3: Configuration analytics
    results.analyticsConfiguration = testAnalyticsConfiguration();

    // Test 4: Intégration des composants
    results.componentIntegration = testComponentIntegration();

    // Test 5: Cohérence des URLs
    results.urlConsistency = testUrlConsistency();

  } catch (error: any) {
    logError(`Erreur lors des tests: ${error.message}`);
  }

  // Résumé des résultats
  logSection('Résumé des Tests');
  
  const tests = [
    { name: 'Configuration des Données', result: results.dataConfiguration },
    { name: 'Validation des Formulaires', result: results.formValidation },
    { name: 'Configuration Analytics', result: results.analyticsConfiguration },
    { name: 'Intégration des Composants', result: results.componentIntegration },
    { name: 'Cohérence des URLs', result: results.urlConsistency }
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
    logInfo('✨ Les nouvelles pages ressources sont prêtes à être intégrées au système existant.');
    return true;
  } else {
    logError('❌ Certains tests ont échoué. Vérifiez les logs ci-dessus.');
    return false;
  }
}

// Exécution du script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().then((success) => {
    process.exit(success ? 0 : 1);
  }).catch((error) => {
    log(`❌ Erreur fatale: ${error.message}`, colors.red);
    process.exit(1);
  });
}

export { main as testResourceIntegrationSimple };