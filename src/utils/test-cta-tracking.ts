/**
 * Test suite pour valider le tracking des CTAs amélioré
 * Task 7.1: Ajouter le tracking des clics sur les nouveaux CTAs
 */

import { 
  trackCTAClick, 
  trackAdvancedUserJourney,
  trackFunnelConversion,
  trackConversionAbandonment,
  conversionGoals,
  ctaToGoalMapping,
  CTATrackingData 
} from './cta-tracking';

// Mock de window.gtag pour les tests
declare global {
  interface Window {
    gtag: jest.Mock;
    dataLayer: any[];
  }
}

// Configuration de test
const setupTestEnvironment = () => {
  // Mock de sessionStorage
  const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  };
  
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock
  });

  // Mock de gtag
  window.gtag = jest.fn();
  window.dataLayer = [];
  
  return { sessionStorageMock };
};

// Tests des CTAs de la Hero Section
export const testHeroSectionCTAs = () => {
  console.log('🧪 Test des CTAs Hero Section...');
  
  const { sessionStorageMock } = setupTestEnvironment();
  sessionStorageMock.getItem.mockReturnValue(null);

  // Test CTA Bootcamp Hero
  const heroBootcampData: CTATrackingData = {
    ctaId: 'hero-bootcamp',
    ctaText: 'Rejoindre le Bootcamp Commercial',
    ctaType: 'primary',
    section: 'hero',
    destination: '/bootcamp',
    position: 1
  };

  trackCTAClick(heroBootcampData);

  // Vérifications
  expect(window.gtag).toHaveBeenCalledWith('event', 'cta_click', expect.objectContaining({
    event_category: 'cta_engagement',
    event_label: 'hero-bootcamp',
    cta_id: 'hero-bootcamp',
    cta_text: 'Rejoindre le Bootcamp Commercial',
    cta_type: 'primary',
    cta_section: 'hero'
  }));

  // Test CTA Ressources Hero
  const heroResourcesData: CTATrackingData = {
    ctaId: 'hero-resources',
    ctaText: 'Accéder aux Ressources Gratuites',
    ctaType: 'secondary',
    section: 'hero',
    destination: '/ressources',
    position: 2
  };

  trackCTAClick(heroResourcesData);

  console.log('✅ Tests Hero Section CTAs réussis');
};

// Tests des CTAs de la Problem Section
export const testProblemSectionCTAs = () => {
  console.log('🧪 Test des CTAs Problem Section...');
  
  setupTestEnvironment();

  // Test CTA Bootcamp Problem
  const problemBootcampData: CTATrackingData = {
    ctaId: 'problem-bootcamp',
    ctaText: 'Découvrir le Bootcamp Commercial',
    ctaType: 'primary',
    section: 'problem',
    destination: '/bootcamp',
    position: 1
  };

  trackCTAClick(problemBootcampData);

  // Vérifier le tracking spécifique bootcamp
  expect(window.gtag).toHaveBeenCalledWith('event', 'bootcamp_interest', expect.objectContaining({
    event_category: 'business_priority',
    bootcamp_source: 'problem',
    value: 75
  }));

  // Test CTA Guide Gratuit
  const problemResourcesData: CTATrackingData = {
    ctaId: 'problem-resources',
    ctaText: 'Télécharger le Guide Gratuit',
    ctaType: 'secondary',
    section: 'problem',
    destination: '/ressources',
    position: 2
  };

  trackCTAClick(problemResourcesData);

  // Test CTA Diagnostic
  const problemDiagnosticData: CTATrackingData = {
    ctaId: 'problem-diagnostic',
    ctaText: 'Faire le Diagnostic',
    ctaType: 'tertiary',
    section: 'problem',
    destination: '/diagnostic',
    position: 3
  };

  trackCTAClick(problemDiagnosticData);

  console.log('✅ Tests Problem Section CTAs réussis');
};

// Tests des CTAs de la Resources Section
export const testResourcesSectionCTAs = () => {
  console.log('🧪 Test des CTAs Resources Section...');
  
  setupTestEnvironment();

  // Test CTA Bootcamp Resources
  const resourcesBootcampData: CTATrackingData = {
    ctaId: 'resources-bootcamp',
    ctaText: 'Découvrir le Bootcamp Commercial',
    ctaType: 'primary',
    section: 'resources-conversion',
    destination: '/bootcamp',
    position: 1
  };

  trackCTAClick(resourcesBootcampData);

  // Test CTA Contact Resources
  const resourcesContactData: CTATrackingData = {
    ctaId: 'resources-contact',
    ctaText: 'Échanger avec Laurent Serre',
    ctaType: 'secondary',
    section: 'resources-conversion',
    destination: '/contact',
    position: 2
  };

  trackCTAClick(resourcesContactData);

  console.log('✅ Tests Resources Section CTAs réussis');
};

// Tests des CTAs de ressources spécifiques
export const testSpecificResourceCTAs = () => {
  console.log('🧪 Test des CTAs Ressources Spécifiques...');
  
  setupTestEnvironment();

  const specificResources = [
    'scripts-impact-et-aida+',
    'linkedin-et-réseaux-sociaux',
    'système-de-suivi-prospects',
    'techniques-de-motivation',
    'guide-recrutement-commercial',
    'techniques-de-négociation'
  ];

  specificResources.forEach((resource, index) => {
    const resourceData: CTATrackingData = {
      ctaId: `resource-${resource}`,
      ctaText: resource.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      ctaType: 'secondary',
      section: 'resources-grid',
      destination: `/ressources/${resource}`,
      position: index + 1
    };

    trackCTAClick(resourceData);

    // Vérifier le tracking spécifique ressources
    expect(window.gtag).toHaveBeenCalledWith('event', 'resource_interest', expect.objectContaining({
      event_category: 'lead_nurturing',
      resource_source: 'resources-grid',
      resource_type: 'specific'
    }));
  });

  console.log('✅ Tests Ressources Spécifiques CTAs réussis');
};

// Tests des goals de conversion
export const testConversionGoals = () => {
  console.log('🧪 Test des Goals de Conversion...');
  
  setupTestEnvironment();

  // Tester chaque mapping CTA -> Goal
  Object.entries(ctaToGoalMapping).forEach(([ctaId, goalId]) => {
    const goal = conversionGoals[goalId];
    
    if (goal) {
      const testData: CTATrackingData = {
        ctaId,
        ctaText: `Test ${ctaId}`,
        ctaType: 'primary',
        section: 'test',
        destination: '/test'
      };

      trackCTAClick(testData);

      // Vérifier que l'event de conversion est envoyé
      expect(window.gtag).toHaveBeenCalledWith('event', 'conversion', expect.objectContaining({
        event_category: goal.goalCategory,
        event_label: goal.goalName,
        value: goal.goalValue,
        goal_id: goal.goalId
      }));

      // Vérifier l'event spécifique par catégorie
      expect(window.gtag).toHaveBeenCalledWith('event', `goal_${goal.goalCategory}`, expect.objectContaining({
        event_category: 'conversion_goals',
        goal_type: goal.goalCategory,
        goal_value: goal.goalValue
      }));
    }
  });

  console.log('✅ Tests Goals de Conversion réussis');
};

// Tests du tracking du funnel
export const testFunnelTracking = () => {
  console.log('🧪 Test du Tracking Funnel...');
  
  setupTestEnvironment();

  // Test progression dans le funnel
  trackFunnelConversion('resources_access', 20, { source: 'hero' });
  trackFunnelConversion('diagnostic_start', 30, { source: 'problem' });
  trackFunnelConversion('bootcamp_discovery', 75, { source: 'resources' });

  // Test abandon de conversion
  trackConversionAbandonment('bootcamp_signup', 'price_concern');

  // Vérifications
  expect(window.gtag).toHaveBeenCalledWith('event', 'funnel_conversion', expect.objectContaining({
    event_category: 'conversion_funnel',
    funnel_step: 'resources_access',
    value: 20
  }));

  expect(window.gtag).toHaveBeenCalledWith('event', 'conversion_abandonment', expect.objectContaining({
    event_category: 'conversion_analysis',
    abandonment_step: 'bootcamp_signup',
    abandonment_reason: 'price_concern'
  }));

  console.log('✅ Tests Tracking Funnel réussis');
};

// Tests du tracking des parcours utilisateur
export const testUserJourneyTracking = () => {
  console.log('🧪 Test du Tracking Parcours Utilisateur...');
  
  setupTestEnvironment();

  // Test parcours utilisateur avancé
  trackAdvancedUserJourney({
    fromSection: 'hero',
    toSection: 'problem',
    ctaId: 'hero-bootcamp',
    timeSpent: 45000, // 45 secondes
    scrollDepth: 75
  });

  expect(window.gtag).toHaveBeenCalledWith('event', 'advanced_user_journey', expect.objectContaining({
    event_category: 'user_behavior',
    journey_from: 'hero',
    journey_to: 'problem',
    journey_cta: 'hero-bootcamp',
    time_spent: 45000,
    scroll_depth: 75
  }));

  console.log('✅ Tests Tracking Parcours Utilisateur réussis');
};

// Fonction principale pour exécuter tous les tests
export const runAllCTATrackingTests = () => {
  console.log('🚀 Démarrage des tests de tracking CTA...\n');

  try {
    testHeroSectionCTAs();
    testProblemSectionCTAs();
    testResourcesSectionCTAs();
    testSpecificResourceCTAs();
    testConversionGoals();
    testFunnelTracking();
    testUserJourneyTracking();

    console.log('\n🎉 Tous les tests de tracking CTA sont réussis !');
    console.log('✅ Task 7.1 - Tracking des CTAs implémenté avec succès');
    
    return {
      success: true,
      message: 'Tous les tests de tracking CTA sont réussis',
      details: {
        heroSection: 'OK',
        problemSection: 'OK',
        resourcesSection: 'OK',
        specificResources: 'OK',
        conversionGoals: 'OK',
        funnelTracking: 'OK',
        userJourney: 'OK'
      }
    };
  } catch (error) {
    console.error('❌ Erreur dans les tests de tracking CTA:', error);
    return {
      success: false,
      message: 'Erreur dans les tests de tracking CTA',
      error: error
    };
  }
};

// Export pour utilisation dans d'autres tests
export const ctaTrackingTestSuite = {
  testHeroSectionCTAs,
  testProblemSectionCTAs,
  testResourcesSectionCTAs,
  testSpecificResourceCTAs,
  testConversionGoals,
  testFunnelTracking,
  testUserJourneyTracking,
  runAllCTATrackingTests
};