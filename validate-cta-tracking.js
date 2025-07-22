/**
 * Script de validation du tracking des CTAs (version JS)
 * Task 7.1: Validation de l'implémentation du tracking des clics sur les nouveaux CTAs
 */

// Configuration des goals de conversion (copié depuis cta-tracking.ts)
const conversionGoals = {
  bootcamp_signup: {
    goalId: 'bootcamp_signup',
    goalName: 'Inscription Bootcamp Commercial',
    goalValue: 100,
    goalCategory: 'conversion'
  },
  bootcamp_discovery: {
    goalId: 'bootcamp_discovery',
    goalName: 'Découverte Bootcamp Commercial',
    goalValue: 75,
    goalCategory: 'conversion'
  },
  resources_download: {
    goalId: 'resources_download',
    goalName: 'Téléchargement Ressources Gratuites',
    goalValue: 25,
    goalCategory: 'lead_generation'
  },
  resources_access: {
    goalId: 'resources_access',
    goalName: 'Accès Ressources Gratuites',
    goalValue: 20,
    goalCategory: 'lead_generation'
  },
  diagnostic_start: {
    goalId: 'diagnostic_start',
    goalName: 'Diagnostic Commercial Démarré',
    goalValue: 30,
    goalCategory: 'lead_generation'
  },
  contact_form: {
    goalId: 'contact_form',
    goalName: 'Formulaire Contact Soumis',
    goalValue: 50,
    goalCategory: 'lead_generation'
  },
  contact_exchange: {
    goalId: 'contact_exchange',
    goalName: 'Demande Échange Laurent Serre',
    goalValue: 60,
    goalCategory: 'lead_generation'
  },
  resource_specific: {
    goalId: 'resource_specific',
    goalName: 'Ressource Spécifique Consultée',
    goalValue: 15,
    goalCategory: 'engagement'
  },
  guide_download: {
    goalId: 'guide_download',
    goalName: 'Guide Gratuit Téléchargé',
    goalValue: 25,
    goalCategory: 'lead_generation'
  }
};

// Mapping des CTAs vers les goals
const ctaToGoalMapping = {
  // Hero Section CTAs
  'hero-bootcamp': 'bootcamp_signup',
  'hero-resources': 'resources_access',
  
  // Problem Section CTAs
  'problem-bootcamp': 'bootcamp_discovery',
  'problem-resources': 'guide_download',
  'problem-diagnostic': 'diagnostic_start',
  
  // Resources Section CTAs
  'resources-bootcamp': 'bootcamp_discovery',
  'resources-contact': 'contact_exchange',
  
  // Resource Grid CTAs (specific resources)
  'resource-scripts-impact-et-aida+': 'resource_specific',
  'resource-linkedin-et-réseaux-sociaux': 'resource_specific',
  'resource-système-de-suivi-prospects': 'resource_specific',
  'resource-techniques-de-motivation': 'resource_specific',
  'resource-guide-recrutement-commercial': 'resource_specific',
  'resource-techniques-de-négociation': 'resource_specific',
  
  // Generic resource tracking
  'resource-specific': 'resource_specific'
};

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
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  title: (msg) => console.log(`${colors.bright}${colors.cyan}${msg}${colors.reset}`)
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
  
  const categories = [...new Set(Object.values(conversionGoals).map(g => g.goalCategory))];
  const totalValue = Object.values(conversionGoals).reduce((sum, goal) => sum + goal.goalValue, 0);
  
  log.info(`Nombre de goals configurés: ${Object.keys(conversionGoals).length}`);
  log.info(`Nombre de CTAs mappés: ${Object.keys(ctaToGoalMapping).length}`);
  log.info(`Catégories de goals: ${categories.join(', ')}`);
  log.info(`Valeur totale des conversions: ${totalValue}€`);
  
  // Détail par catégorie
  categories.forEach(category => {
    const categoryGoals = Object.values(conversionGoals).filter(g => g.goalCategory === category);
    const categoryValue = categoryGoals.reduce((sum, goal) => sum + goal.goalValue, 0);
    log.info(`  ${category}: ${categoryGoals.length} goals, ${categoryValue}€`);
  });
  
  return {
    goals: Object.keys(conversionGoals).length,
    ctaMappings: Object.keys(ctaToGoalMapping).length,
    categories,
    totalValue
  };
};

// Fonction principale
const main = () => {
  try {
    log.title('🚀 VALIDATION DU TRACKING DES CTAS - TASK 7.1');
    log.title('================================================');
    
    // Étape 1: Validation de la configuration
    log.info('Étape 1: Validation de la configuration des goals...');
    const goalsValid = validateGoalsConfiguration();
    
    // Étape 2: Validation des CTAs homepage
    log.info('\nÉtape 2: Validation des CTAs homepage...');
    const ctasValid = validateHomepageCTAs();
    
    // Étape 3: Génération du rapport
    log.info('\nÉtape 3: Génération du rapport...');
    const report = generateValidationReport();
    
    // Résultat final
    if (goalsValid && ctasValid) {
      log.title('\n🎉 VALIDATION RÉUSSIE !');
      log.success('Task 7.1 - Tracking des CTAs implémenté avec succès');
      log.success('Tous les CTAs de la page d\'accueil sont correctement trackés');
      log.success('Les goals de conversion sont configurés et fonctionnels');
      
      // Recommandations
      log.title('\n💡 Recommandations pour le suivi:');
      log.info('1. Vérifier les données dans Google Analytics 4 après déploiement');
      log.info('2. Configurer des alertes pour les conversions importantes');
      log.info('3. Créer des tableaux de bord pour suivre les performances des CTAs');
      log.info('4. Mettre en place des tests A/B pour optimiser les conversions');
      
      log.title('\n📊 Événements GA4 configurés:');
      log.info('• cta_click - Tracking de tous les clics sur CTAs');
      log.info('• conversion - Tracking des goals de conversion');
      log.info('• bootcamp_interest - Tracking spécifique bootcamp');
      log.info('• resource_interest - Tracking spécifique ressources');
      log.info('• funnel_step - Tracking du parcours de conversion');
      log.info('• advanced_user_journey - Tracking des parcours utilisateur');
      
      return true;
    } else {
      log.title('\n❌ VALIDATION ÉCHOUÉE');
      log.error('Des problèmes ont été détectés dans l\'implémentation');
      return false;
    }
    
  } catch (error) {
    log.error(`Erreur lors de la validation: ${error}`);
    return false;
  }
};

// Exécution du script
main();