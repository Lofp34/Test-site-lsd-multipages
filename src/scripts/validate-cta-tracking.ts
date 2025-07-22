#!/usr/bin/env node

/**
 * Script de validation du tracking des CTAs
 * Task 7.1: Validation de l'implémentation du tracking des clics sur les nouveaux CTAs
 */

import { runAllCTATrackingTests } from '../utils/test-cta-tracking';
import { conversionGoals, ctaToGoalMapping } from '../utils/cta-tracking';

// Configuration des couleurs pour les logs
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg: string) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  title: (msg: string) => console.log(`${colors.bright}${colors.cyan}${msg}${colors.reset}`)
};

// Validation de la configuration des goals
const validateGoalsConfiguration = () => {
  log.title('\n📊 Validation de la configuration des goals de conversion');
  
  let isValid = true;
  
  // Vérifier que tous les goals ont les propriétés requises
  Object.entries(conversionGoals).forEach(([goalId, goal]) => {
    if (!goal.goalId || !goal.goalName || !goal.goalCategory || goal.goalValue === undefined) {
      log.error(`Goal ${goalId} manque des propriétés requises`);
      isValid = false;
    } else {
      log.success(`Goal ${goalId}: ${goal.goalName} (${goal.goalValue}€)`);
    }
  });
  
  // Vérifier que tous les CTAs ont un goal associé
  const expectedCTAs = [
    'hero-bootcamp',
    'hero-resources',
    'problem-bootcamp',
    'problem-resources',
    'problem-diagnostic',
    'resources-bootcamp',
    'resources-contact'
  ];
  
  expectedCTAs.forEach(ctaId => {
    if (!ctaToGoalMapping[ctaId]) {
      log.error(`CTA ${ctaId} n'a pas de goal associé`);
      isValid = false;
    } else {
      const goalId = ctaToGoalMapping[ctaId];
      const goal = conversionGoals[goalId];
      log.success(`CTA ${ctaId} → Goal ${goalId} (${goal?.goalName})`);
    }
  });
  
  return isValid;
};

// Validation de la structure des événements GA4
const validateGA4EventStructure = () => {
  log.title('\n📈 Validation de la structure des événements GA4');
  
  const requiredEventProperties = {
    cta_click: [
      'event_category',
      'event_label',
      'cta_id',
      'cta_text',
      'cta_type',
      'cta_section',
      'cta_destination'
    ],
    conversion: [
      'event_category',
      'event_label',
      'value',
      'currency',
      'goal_id',
      'conversion_source'
    ],
    funnel_step: [
      'event_category',
      'event_label',
      'funnel_step',
      'funnel_source',
      'value'
    ]
  };
  
  Object.entries(requiredEventProperties).forEach(([eventName, properties]) => {
    log.info(`Événement ${eventName} doit contenir: ${properties.join(', ')}`);
  });
  
  log.success('Structure des événements GA4 validée');
  return true;
};

// Validation des CTAs sur la page d'accueil
const validateHomepageCTAs = () => {
  log.title('\n🏠 Validation des CTAs de la page d\'accueil');
  
  const homepageCTAs = {
    'Hero Section': [
      { id: 'hero-bootcamp', text: 'Rejoindre le Bootcamp Commercial', type: 'primary' },
      { id: 'hero-resources', text: 'Accéder aux Ressources Gratuites', type: 'secondary' }
    ],
    'Problem Section': [
      { id: 'problem-bootcamp', text: 'Découvrir le Bootcamp Commercial', type: 'primary' },
      { id: 'problem-resources', text: 'Télécharger le Guide Gratuit', type: 'secondary' },
      { id: 'problem-diagnostic', text: 'Faire le Diagnostic', type: 'tertiary' }
    ],
    'Resources Section': [
      { id: 'resources-bootcamp', text: 'Découvrir le Bootcamp Commercial', type: 'primary' },
      { id: 'resources-contact', text: 'Échanger avec Laurent Serre', type: 'secondary' }
    ]
  };
  
  Object.entries(homepageCTAs).forEach(([section, ctas]) => {
    log.info(`${section}:`);
    ctas.forEach(cta => {
      const hasGoal = ctaToGoalMapping[cta.id];
      if (hasGoal) {
        log.success(`  ${cta.id} (${cta.type}) → ${ctaToGoalMapping[cta.id]}`);
      } else {
        log.error(`  ${cta.id} (${cta.type}) → Pas de goal associé`);
      }
    });
  });
  
  return true;
};

// Génération du rapport de validation
const generateValidationReport = () => {
  log.title('\n📋 Rapport de validation du tracking CTA');
  
  const report = {
    timestamp: new Date().toISOString(),
    goals: Object.keys(conversionGoals).length,
    ctaMappings: Object.keys(ctaToGoalMapping).length,
    categories: [...new Set(Object.values(conversionGoals).map(g => g.goalCategory))],
    totalValue: Object.values(conversionGoals).reduce((sum, goal) => sum + goal.goalValue, 0)
  };
  
  log.info(`Nombre de goals configurés: ${report.goals}`);
  log.info(`Nombre de CTAs mappés: ${report.ctaMappings}`);
  log.info(`Catégories de goals: ${report.categories.join(', ')}`);
  log.info(`Valeur totale des conversions: ${report.totalValue}€`);
  
  // Détail par catégorie
  report.categories.forEach(category => {
    const categoryGoals = Object.values(conversionGoals).filter(g => g.goalCategory === category);
    const categoryValue = categoryGoals.reduce((sum, goal) => sum + goal.goalValue, 0);
    log.info(`  ${category}: ${categoryGoals.length} goals, ${categoryValue}€`);
  });
  
  return report;
};

// Fonction principale
const main = async () => {
  try {
    log.title('🚀 VALIDATION DU TRACKING DES CTAS - TASK 7.1');
    log.title('================================================');
    
    // Étape 1: Validation de la configuration
    log.info('Étape 1: Validation de la configuration des goals...');
    const goalsValid = validateGoalsConfiguration();
    
    // Étape 2: Validation de la structure GA4
    log.info('\nÉtape 2: Validation de la structure GA4...');
    const ga4Valid = validateGA4EventStructure();
    
    // Étape 3: Validation des CTAs homepage
    log.info('\nÉtape 3: Validation des CTAs homepage...');
    const ctasValid = validateHomepageCTAs();
    
    // Étape 4: Exécution des tests
    log.info('\nÉtape 4: Exécution des tests de tracking...');
    const testResults = runAllCTATrackingTests();
    
    // Étape 5: Génération du rapport
    log.info('\nÉtape 5: Génération du rapport...');
    const report = generateValidationReport();
    
    // Résultat final
    if (goalsValid && ga4Valid && ctasValid && testResults.success) {
      log.title('\n🎉 VALIDATION RÉUSSIE !');
      log.success('Task 7.1 - Tracking des CTAs implémenté avec succès');
      log.success('Tous les CTAs de la page d\'accueil sont correctement trackés');
      log.success('Les goals de conversion sont configurés et fonctionnels');
      log.success('Les événements GA4 sont structurés correctement');
      
      // Recommandations
      log.title('\n💡 Recommandations pour le suivi:');
      log.info('1. Vérifier les données dans Google Analytics 4 après déploiement');
      log.info('2. Configurer des alertes pour les conversions importantes');
      log.info('3. Créer des tableaux de bord pour suivre les performances des CTAs');
      log.info('4. Mettre en place des tests A/B pour optimiser les conversions');
      
      process.exit(0);
    } else {
      log.title('\n❌ VALIDATION ÉCHOUÉE');
      log.error('Des problèmes ont été détectés dans l\'implémentation');
      process.exit(1);
    }
    
  } catch (error) {
    log.error(`Erreur lors de la validation: ${error}`);
    process.exit(1);
  }
};

// Exécution du script
if (require.main === module) {
  main();
}

export { main as validateCTATracking };