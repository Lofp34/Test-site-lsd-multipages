'use client';

import React from 'react';

// Types pour les tests A/B
export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // Pourcentage de trafic (0-100)
  config: Record<string, any>;
}

export interface ABTest {
  testId: string;
  testName: string;
  isActive: boolean;
  variants: ABTestVariant[];
  startDate: string;
  endDate?: string;
  targetMetric: string;
  description: string;
}

export interface ABTestResult {
  testId: string;
  variantId: string;
  userId: string;
  timestamp: number;
  sessionId: string;
}

// Configuration des tests A/B actifs
export const activeABTests: Record<string, ABTest> = {
  cta_conversion_optimization: {
    testId: 'cta_conversion_optimization',
    testName: 'Optimisation CTAs de Conversion',
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Version Contrôle',
        weight: 50,
        config: {
          diagnosticButtonText: 'Démarrer mon diagnostic',
          bootcampButtonText: 'Découvrir le bootcamp',
          consultationButtonText: 'Réserver ma consultation',
          urgencyMessage: 'Offre Limitée - Janvier 2025',
          socialProofStyle: 'stats'
        }
      },
      {
        id: 'variant_a',
        name: 'Version Action Immédiate',
        weight: 50,
        config: {
          diagnosticButtonText: 'Diagnostic gratuit maintenant',
          bootcampButtonText: 'Je veux le bootcamp',
          consultationButtonText: 'Consultation immédiate',
          urgencyMessage: '⚡ Places limitées - Réservez maintenant',
          socialProofStyle: 'testimonials'
        }
      }
    ],
    startDate: '2025-01-27',
    endDate: '2025-02-27',
    targetMetric: 'cta_click_rate',
    description: 'Test de différentes formulations de CTAs pour améliorer le taux de conversion'
  },
  
  cta_placement_test: {
    testId: 'cta_placement_test',
    testName: 'Test Placement CTAs',
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Placement Standard',
        weight: 50,
        config: {
          ctaPlacement: 'bottom',
          stickyCtaEnabled: false,
          inlineCtaFrequency: 'low'
        }
      },
      {
        id: 'variant_b',
        name: 'Placement Optimisé',
        weight: 50,
        config: {
          ctaPlacement: 'multiple',
          stickyCtaEnabled: true,
          inlineCtaFrequency: 'high'
        }
      }
    ],
    startDate: '2025-01-27',
    endDate: '2025-03-27',
    targetMetric: 'conversion_rate',
    description: 'Test de différents placements de CTAs pour maximiser la visibilité et les conversions'
  }
};

// Fonction pour obtenir la variante d'un test pour un utilisateur
export const getABTestVariant = (testId: string): ABTestVariant | null => {
  if (typeof window === 'undefined') return null;
  
  const test = activeABTests[testId];
  if (!test || !test.isActive) return null;

  // Vérifier si l'utilisateur a déjà une variante assignée
  const storageKey = `ab_test_${testId}`;
  const existingVariant = localStorage.getItem(storageKey);
  
  if (existingVariant) {
    const variant = test.variants.find(v => v.id === existingVariant);
    if (variant) return variant;
  }

  // Assigner une nouvelle variante basée sur les poids
  const userId = getUserId();
  const hash = simpleHash(userId + testId);
  const randomValue = hash % 100;
  
  let cumulativeWeight = 0;
  for (const variant of test.variants) {
    cumulativeWeight += variant.weight;
    if (randomValue < cumulativeWeight) {
      // Sauvegarder l'assignation
      localStorage.setItem(storageKey, variant.id);
      
      // Tracker l'assignation
      trackABTestAssignment(testId, variant.id, userId);
      
      return variant;
    }
  }
  
  // Fallback sur la première variante
  const fallbackVariant = test.variants[0];
  localStorage.setItem(storageKey, fallbackVariant.id);
  return fallbackVariant;
};

// Fonction pour tracker l'assignation d'une variante
const trackABTestAssignment = (testId: string, variantId: string, userId: string) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const sessionId = getOrCreateSessionId();
  
  window.gtag('event', 'ab_test_assignment', {
    event_category: 'ab_testing',
    event_label: `${testId}_${variantId}`,
    test_id: testId,
    variant_id: variantId,
    user_id: userId,
    session_id: sessionId,
    timestamp: Date.now()
  });

  // Log pour debug
  if (process.env.NODE_ENV === 'development') {
    console.log('AB Test Assignment:', {
      testId,
      variantId,
      userId,
      sessionId
    });
  }
};

// Fonction pour tracker les conversions dans le contexte A/B
export const trackABTestConversion = (testId: string, conversionType: string, value?: number) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const variant = getABTestVariant(testId);
  if (!variant) return;

  const userId = getUserId();
  const sessionId = getOrCreateSessionId();

  window.gtag('event', 'ab_test_conversion', {
    event_category: 'ab_testing',
    event_label: `${testId}_${variant.id}_${conversionType}`,
    test_id: testId,
    variant_id: variant.id,
    conversion_type: conversionType,
    user_id: userId,
    session_id: sessionId,
    value: value || 0,
    timestamp: Date.now()
  });

  // Event spécifique pour l'analyse des performances par variante
  window.gtag('event', `ab_${testId}_conversion`, {
    event_category: 'ab_test_performance',
    event_label: variant.id,
    variant_name: variant.name,
    conversion_type: conversionType,
    value: value || 0
  });
};

// Hook React pour utiliser les tests A/B
export const useABTest = (testId: string) => {
  const [variant, setVariant] = React.useState<ABTestVariant | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const assignedVariant = getABTestVariant(testId);
    setVariant(assignedVariant);
    setIsLoading(false);
  }, [testId]);

  const trackConversion = (conversionType: string, value?: number) => {
    trackABTestConversion(testId, conversionType, value);
  };

  return {
    variant,
    isLoading,
    trackConversion,
    config: variant?.config || {}
  };
};

// Fonction utilitaire pour générer un hash simple
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Fonction pour obtenir ou créer un ID utilisateur
const getUserId = (): string => {
  if (typeof window === 'undefined') return 'server-side';
  
  const userKey = 'ls_user_id';
  let userId = localStorage.getItem(userKey);
  
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(userKey, userId);
  }
  
  return userId;
};

// Fonction pour obtenir l'ID de session (réutilisée du cta-tracking)
const getOrCreateSessionId = (): string => {
  if (typeof window === 'undefined') return 'server-side';
  
  const sessionKey = 'ls_session_id';
  let sessionId = sessionStorage.getItem(sessionKey);
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(sessionKey, sessionId);
  }
  
  return sessionId;
};

// Fonction pour obtenir les résultats d'un test A/B
export const getABTestResults = (testId: string): Promise<any> => {
  // Cette fonction serait connectée à votre backend analytics
  // Pour l'instant, on retourne une promesse mock
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        testId,
        status: 'running',
        participants: 1247,
        conversions: {
          control: { rate: 3.2, count: 20 },
          variant_a: { rate: 4.1, count: 26 }
        },
        significance: 0.85,
        winner: 'variant_a'
      });
    }, 1000);
  });
};

// Fonction pour arrêter un test A/B
export const stopABTest = (testId: string, winnerVariantId: string) => {
  if (activeABTests[testId]) {
    activeABTests[testId].isActive = false;
    activeABTests[testId].endDate = new Date().toISOString().split('T')[0];
    
    // Tracker l'arrêt du test
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'ab_test_ended', {
        event_category: 'ab_testing',
        event_label: testId,
        test_id: testId,
        winner_variant: winnerVariantId,
        end_date: new Date().toISOString()
      });
    }
  }
};

// Fonction pour créer un nouveau test A/B
export const createABTest = (test: ABTest) => {
  activeABTests[test.testId] = test;
  
  // Tracker la création du test
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'ab_test_created', {
      event_category: 'ab_testing',
      event_label: test.testId,
      test_name: test.testName,
      variants_count: test.variants.length,
      start_date: test.startDate
    });
  }
};

// Composant wrapper pour les tests A/B
export const ABTestWrapper: React.FC<{
  testId: string;
  children: (variant: ABTestVariant | null, config: Record<string, any>) => React.ReactNode;
}> = ({ testId, children }) => {
  const { variant, isLoading, config } = useABTest(testId);
  
  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-20 rounded"></div>;
  }
  
  return <>{children(variant, config)}</>;
};