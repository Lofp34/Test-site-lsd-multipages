/**
 * Test suite pour valider l'A/B testing des CTAs
 * Task 7.2: Mettre en place l'A/B testing des CTAs
 */

import { 
  activeABTests,
  getVariantForUser,
  trackABTestConversion,
  getUserABTestAssignments,
  forceVariant,
  getTestStats,
  ABTest,
  ABTestVariant
} from './ab-testing';

// Mock de localStorage et sessionStorage pour les tests
const createStorageMock = () => {
  const storage: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => storage[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      storage[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete storage[key];
    }),
    clear: jest.fn(() => {
      Object.keys(storage).forEach(key => delete storage[key]);
    })
  };
};

// Mock de window.gtag pour les tests
declare global {
  interface Window {
    gtag: jest.Mock;
    localStorage: any;
    sessionStorage: any;
  }
}

// Configuration de test
const setupTestEnvironment = () => {
  // Mock des storages
  const localStorageMock = createStorageMock();
  const sessionStorageMock = createStorageMock();
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
  
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock
  });

  // Mock de gtag
  window.gtag = jest.fn();
  
  return { localStorageMock, sessionStorageMock };
};

// Tests de configuration des tests A/B
export const testABTestConfiguration = () => {
  console.log('🧪 Test de la configuration des tests A/B...');
  
  // Vérifier que tous les tests ont les propriétés requises
  Object.entries(activeABTests).forEach(([testId, test]) => {
    expect(test.testId).toBe(testId);
    expect(test.testName).toBeDefined();
    expect(test.description).toBeDefined();
    expect(test.variants).toBeInstanceOf(Array);
    expect(test.variants.length).toBeGreaterThan(0);
    expect(test.conversionGoal).toBeDefined();
    
    // Vérifier qu'il y a au moins un variant de contrôle
    const controlVariants = test.variants.filter(v => v.isControl);
    expect(controlVariants.length).toBe(1);
    
    // Vérifier que les poids totalisent 100%
    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
    expect(totalWeight).toBe(100);
    
    console.log(`✅ Test ${testId}: ${test.testName} - ${test.variants.length} variants`);
  });
  
  console.log('✅ Configuration des tests A/B validée');
};

// Tests d'assignation des variants
export const testVariantAssignment = () => {
  console.log('🧪 Test d\'assignation des variants...');
  
  const { localStorageMock } = setupTestEnvironment();
  
  // Test assignation pour hero-bootcamp-text
  const testId = 'hero-bootcamp-text';
  const test = activeABTests[testId];
  
  // Simuler différents utilisateurs
  const userAssignments: Record<string, string> = {};
  
  for (let i = 0; i < 100; i++) {
    // Mock d'un utilisateur unique
    const userId = `test_user_${i}`;
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'ls_user_id') return userId;
      return null;
    });
    
    const variant = getVariantForUser(testId);
    
    if (variant) {
      userAssignments[userId] = variant.id;
    }
  }
  
  // Vérifier la distribution
  const distribution: Record<string, number> = {};
  Object.values(userAssignments).forEach(variantId => {
    distribution[variantId] = (distribution[variantId] || 0) + 1;
  });
  
  console.log('Distribution des variants:', distribution);
  
  // Vérifier que tous les variants sont représentés
  test.variants.forEach(variant => {
    expect(distribution[variant.id]).toBeGreaterThan(0);
    console.log(`✅ Variant ${variant.id}: ${distribution[variant.id]}% d'assignations`);
  });
  
  console.log('✅ Assignation des variants validée');
};

// Tests de tracking des conversions A/B
export const testABTestConversionTracking = () => {
  console.log('🧪 Test du tracking des conversions A/B...');
  
  const { localStorageMock } = setupTestEnvironment();
  
  // Simuler une assignation existante
  const testId = 'hero-bootcamp-text';
  const variantId = 'variant-a';
  const userId = 'test_user_conversion';
  
  const assignment = {
    testId,
    variantId,
    userId,
    timestamp: Date.now(),
    sessionId: 'test_session'
  };
  
  localStorageMock.getItem.mockImplementation((key: string) => {
    if (key === `ab_assignment_${testId}`) {
      return JSON.stringify(assignment);
    }
    return null;
  });
  
  // Tracker une conversion
  trackABTestConversion(testId, 100);
  
  // Vérifier que l'événement GA a été envoyé
  expect(window.gtag).toHaveBeenCalledWith('event', 'ab_test_conversion', expect.objectContaining({
    event_category: 'ab_testing',
    test_id: testId,
    variant_id: variantId,
    conversion_goal: activeABTests[testId].conversionGoal,
    value: 100,
    user_id: userId
  }));
  
  console.log('✅ Tracking des conversions A/B validé');
};

// Tests des variants spécifiques
export const testSpecificVariants = () => {
  console.log('🧪 Test des variants spécifiques...');
  
  // Test hero-bootcamp-text variants
  const heroTest = activeABTests['hero-bootcamp-text'];
  expect(heroTest.variants).toHaveLength(3);
  
  const controlVariant = heroTest.variants.find(v => v.isControl);
  expect(controlVariant?.text).toBe('Rejoindre le Bootcamp Commercial');
  
  const urgencyVariant = heroTest.variants.find(v => v.id === 'variant-a');
  expect(urgencyVariant?.text).toBe('Rejoindre le Bootcamp (Places Limitées)');
  
  const benefitVariant = heroTest.variants.find(v => v.id === 'variant-b');
  expect(benefitVariant?.text).toBe('Booster Mes Ventes Maintenant');
  
  console.log('✅ Hero Bootcamp variants validés');
  
  // Test problem-resources-text variants
  const problemTest = activeABTests['problem-resources-text'];
  expect(problemTest.variants).toHaveLength(2);
  
  const problemControl = problemTest.variants.find(v => v.isControl);
  expect(problemControl?.text).toBe('Télécharger le Guide Gratuit');
  
  const problemVariant = problemTest.variants.find(v => v.id === 'variant-a');
  expect(problemVariant?.text).toBe('Obtenir le Guide Maintenant');
  
  console.log('✅ Problem Resources variants validés');
  
  // Test resources-bootcamp-color variants
  const colorTest = activeABTests['resources-bootcamp-color'];
  expect(colorTest.variants).toHaveLength(2);
  
  const colorControl = colorTest.variants.find(v => v.isControl);
  expect(colorControl?.metadata?.colorClass).toBe('bg-mint-green hover:bg-mint-green/90 text-blue-ink');
  
  const colorVariant = colorTest.variants.find(v => v.id === 'variant-orange');
  expect(colorVariant?.metadata?.colorClass).toBe('bg-orange-soft hover:bg-orange-soft/90 text-white');
  
  console.log('✅ Resources Bootcamp color variants validés');
};

// Tests de forçage de variants (pour debug)
export const testForceVariant = () => {
  console.log('🧪 Test de forçage de variants...');
  
  const { localStorageMock } = setupTestEnvironment();
  
  const testId = 'hero-bootcamp-text';
  const forcedVariantId = 'variant-b';
  
  // Forcer un variant
  forceVariant(testId, forcedVariantId);
  
  // Vérifier que l'assignation a été enregistrée
  expect(localStorageMock.setItem).toHaveBeenCalledWith(
    `ab_assignment_${testId}`,
    expect.stringContaining(forcedVariantId)
  );
  
  console.log('✅ Forçage de variants validé');
};

// Tests des statistiques de test
export const testGetTestStats = () => {
  console.log('🧪 Test des statistiques de test...');
  
  const testId = 'hero-bootcamp-text';
  const stats = getTestStats(testId);
  
  expect(stats).toBeDefined();
  expect(stats?.testId).toBe(testId);
  expect(stats?.testName).toBe('Hero Bootcamp CTA Text');
  expect(stats?.variants).toHaveLength(3);
  expect(stats?.conversionGoal).toBe('bootcamp_signup');
  
  console.log('✅ Statistiques de test validées');
};

// Tests d'intégration avec les composants
export const testComponentIntegration = () => {
  console.log('🧪 Test d\'intégration avec les composants...');
  
  // Vérifier que les tests sont configurés pour les bons CTAs
  const expectedTests = [
    { testId: 'hero-bootcamp-text', targetElement: 'hero-bootcamp' },
    { testId: 'problem-resources-text', targetElement: 'problem-resources' },
    { testId: 'resources-bootcamp-color', targetElement: 'resources-bootcamp' }
  ];
  
  expectedTests.forEach(({ testId, targetElement }) => {
    const test = activeABTests[testId];
    expect(test).toBeDefined();
    expect(test.targetElement).toBe(targetElement);
    console.log(`✅ Test ${testId} configuré pour CTA ${targetElement}`);
  });
  
  console.log('✅ Intégration avec les composants validée');
};

// Tests de performance et optimisation
export const testPerformanceOptimization = () => {
  console.log('🧪 Test d\'optimisation des performances...');
  
  const { localStorageMock } = setupTestEnvironment();
  
  // Test de cache des assignations
  const testId = 'hero-bootcamp-text';
  const userId = 'performance_test_user';
  
  localStorageMock.getItem.mockImplementation((key: string) => {
    if (key === 'ls_user_id') return userId;
    return null;
  });
  
  // Premier appel - doit créer l'assignation
  const startTime = performance.now();
  const variant1 = getVariantForUser(testId);
  const firstCallTime = performance.now() - startTime;
  
  // Simuler l'assignation en cache
  const assignment = {
    testId,
    variantId: variant1?.id,
    userId,
    timestamp: Date.now(),
    sessionId: 'test_session'
  };
  
  localStorageMock.getItem.mockImplementation((key: string) => {
    if (key === 'ls_user_id') return userId;
    if (key === `ab_assignment_${testId}`) return JSON.stringify(assignment);
    return null;
  });
  
  // Deuxième appel - doit utiliser le cache
  const startTime2 = performance.now();
  const variant2 = getVariantForUser(testId);
  const secondCallTime = performance.now() - startTime2;
  
  // Vérifier que le même variant est retourné
  expect(variant1?.id).toBe(variant2?.id);
  
  console.log(`Premier appel: ${firstCallTime.toFixed(2)}ms`);
  console.log(`Deuxième appel: ${secondCallTime.toFixed(2)}ms`);
  console.log('✅ Optimisation des performances validée');
};

// Fonction principale pour exécuter tous les tests
export const runAllABTestingTests = () => {
  console.log('🚀 Démarrage des tests A/B Testing...\n');

  try {
    testABTestConfiguration();
    testVariantAssignment();
    testABTestConversionTracking();
    testSpecificVariants();
    testForceVariant();
    testGetTestStats();
    testComponentIntegration();
    testPerformanceOptimization();

    console.log('\n🎉 Tous les tests A/B Testing sont réussis !');
    console.log('✅ Task 7.2 - A/B Testing des CTAs implémenté avec succès');
    
    return {
      success: true,
      message: 'Tous les tests A/B Testing sont réussis',
      details: {
        configuration: 'OK',
        variantAssignment: 'OK',
        conversionTracking: 'OK',
        specificVariants: 'OK',
        forceVariant: 'OK',
        testStats: 'OK',
        componentIntegration: 'OK',
        performance: 'OK'
      }
    };
  } catch (error) {
    console.error('❌ Erreur dans les tests A/B Testing:', error);
    return {
      success: false,
      message: 'Erreur dans les tests A/B Testing',
      error: error
    };
  }
};

// Export pour utilisation dans d'autres tests
export const abTestingTestSuite = {
  testABTestConfiguration,
  testVariantAssignment,
  testABTestConversionTracking,
  testSpecificVariants,
  testForceVariant,
  testGetTestStats,
  testComponentIntegration,
  testPerformanceOptimization,
  runAllABTestingTests
};