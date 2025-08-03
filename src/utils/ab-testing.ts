'use client';

/**
 * Système A/B Testing pour les CTAs
 * Task 7.2: Mettre en place l'A/B testing des CTAs
 */

// Types pour l'A/B testing
export interface ABTestVariant {
  id: string;
  name: string;
  text: string;
  weight: number; // Pourcentage de trafic (0-100)
  isControl: boolean;
  metadata?: Record<string, any>;
}

export interface ABTest {
  testId: string;
  testName: string;
  description: string;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  variants: ABTestVariant[];
  targetElement: string; // CTA ID ciblé
  conversionGoal: string;
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
  'hero-bootcamp-text': {
    testId: 'hero-bootcamp-text',
    testName: 'Hero Bootcamp CTA Text',
    description: 'Test de différents libellés pour le CTA bootcamp de la hero section',
    isActive: true,
    startDate: '2025-01-19',
    endDate: '2025-02-19',
    targetElement: 'hero-bootcamp',
    conversionGoal: 'bootcamp_signup',
    variants: [
      {
        id: 'control',
        name: 'Contrôle',
        text: 'Rejoindre le Bootcamp Commercial',
        weight: 50,
        isControl: true
      },
      {
        id: 'variant-a',
        name: 'Urgence',
        text: 'Rejoindre le Bootcamp (Places Limitées)',
        weight: 25,
        isControl: false
      },
      {
        id: 'variant-b',
        name: 'Bénéfice',
        text: 'Booster Mes Ventes Maintenant',
        weight: 25,
        isControl: false
      }
    ]
  },
  'problem-resources-text': {
    testId: 'problem-resources-text',
    testName: 'Problem Section Resources CTA',
    description: 'Test de libellés pour le CTA ressources de la section problème',
    isActive: true,
    startDate: '2025-01-19',
    endDate: '2025-02-19',
    targetElement: 'problem-resources',
    conversionGoal: 'guide_download',
    variants: [
      {
        id: 'control',
        name: 'Contrôle',
        text: 'Télécharger le Guide Gratuit',
        weight: 50,
        isControl: true
      },
      {
        id: 'variant-a',
        name: 'Action Immédiate',
        text: 'Obtenir le Guide Maintenant',
        weight: 50,
        isControl: false
      }
    ]
  },
  'resources-bootcamp-color': {
    testId: 'resources-bootcamp-color',
    testName: 'Resources Bootcamp CTA Color',
    description: 'Test de couleurs pour le CTA bootcamp de la section ressources',
    isActive: true,
    startDate: '2025-01-19',
    endDate: '2025-02-19',
    targetElement: 'resources-bootcamp',
    conversionGoal: 'bootcamp_discovery',
    variants: [
      {
        id: 'control',
        name: 'Vert Menthe (Contrôle)',
        text: 'Découvrir le Bootcamp Commercial',
        weight: 50,
        isControl: true,
        metadata: { 
          colorClass: 'bg-mint-green hover:bg-mint-green/90 text-blue-ink',
          variant_type: 'color'
        }
      },
      {
        id: 'variant-orange',
        name: 'Orange Dynamique',
        text: 'Découvrir le Bootcamp Commercial',
        weight: 50,
        isControl: false,
        metadata: { 
          colorClass: 'bg-orange-soft hover:bg-orange-soft/90 text-white',
          variant_type: 'color'
        }
      }
    ]
  }
};

// Fonction pour générer un ID utilisateur persistant
const getUserId = (): string => {
  if (typeof window === 'undefined') return 'server-side';
  
  const userIdKey = 'ls_user_id';
  let userId = localStorage.getItem(userIdKey);
  
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(userIdKey, userId);
  }
  
  return userId;
};

// Fonction pour générer un ID de session
const getSessionId = (): string => {
  if (typeof window === 'undefined') return 'server-side';
  
  const sessionKey = 'ls_session_id';
  let sessionId = sessionStorage.getItem(sessionKey);
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(sessionKey, sessionId);
  }
  
  return sessionId;
};

// Fonction de hachage simple pour la distribution des variants
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Fonction pour assigner un variant à un utilisateur
export const getVariantForUser = (testId: string): ABTestVariant | null => {
  const test = activeABTests[testId];
  
  if (!test || !test.isActive) {
    return null;
  }
  
  // Vérifier si le test est dans la période active
  const now = new Date();
  const startDate = new Date(test.startDate);
  const endDate = test.endDate ? new Date(test.endDate) : null;
  
  if (now < startDate || (endDate && now > endDate)) {
    return null;
  }
  
  const userId = getUserId();
  const hash = hashString(`${testId}_${userId}`);
  const percentage = hash % 100;
  
  // Distribution basée sur les poids des variants
  let cumulativeWeight = 0;
  for (const variant of test.variants) {
    cumulativeWeight += variant.weight;
    if (percentage < cumulativeWeight) {
      // Enregistrer l'assignation
      recordVariantAssignment(testId, variant.id, userId);
      return variant;
    }
  }
  
  // Fallback vers le contrôle
  const controlVariant = test.variants.find(v => v.isControl);
  if (controlVariant) {
    recordVariantAssignment(testId, controlVariant.id, userId);
    return controlVariant;
  }
  
  return null;
};

// Fonction pour enregistrer l'assignation d'un variant
const recordVariantAssignment = (testId: string, variantId: string, userId: string) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  
  const sessionId = getSessionId();
  const timestamp = Date.now();
  
  // Enregistrer dans localStorage pour éviter les réassignations
  const assignmentKey = `ab_assignment_${testId}`;
  const assignment: ABTestResult = {
    testId,
    variantId,
    userId,
    timestamp,
    sessionId
  };
  
  localStorage.setItem(assignmentKey, JSON.stringify(assignment));
  
  // Tracker l'assignation dans Google Analytics
  window.gtag('event', 'ab_test_assignment', {
    event_category: 'ab_testing',
    event_label: `${testId}_${variantId}`,
    test_id: testId,
    variant_id: variantId,
    user_id: userId,
    session_id: sessionId,
    is_control: activeABTests[testId]?.variants.find(v => v.id === variantId)?.isControl || false
  });
  
  // Log pour debug
  if (process.env.NODE_ENV === 'development') {
    console.log('A/B Test Assignment:', {
      testId,
      variantId,
      userId,
      sessionId
    });
  }
};

// Fonction pour tracker une conversion A/B
export const trackABTestConversion = (testId: string, conversionValue?: number) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  
  const assignmentKey = `ab_assignment_${testId}`;
  const assignmentData = localStorage.getItem(assignmentKey);
  
  if (!assignmentData) {
    console.warn(`Pas d'assignation A/B trouvée pour le test ${testId}`);
    return;
  }
  
  const assignment: ABTestResult = JSON.parse(assignmentData);
  const test = activeABTests[testId];
  
  if (!test) {
    console.warn(`Test A/B ${testId} non trouvé`);
    return;
  }
  
  const variant = test.variants.find(v => v.id === assignment.variantId);
  
  // Tracker la conversion
  window.gtag('event', 'ab_test_conversion', {
    event_category: 'ab_testing',
    event_label: `${testId}_${assignment.variantId}`,
    test_id: testId,
    variant_id: assignment.variantId,
    variant_name: variant?.name || 'Unknown',
    conversion_goal: test.conversionGoal,
    value: conversionValue || 1,
    currency: 'EUR',
    user_id: assignment.userId,
    session_id: assignment.sessionId,
    is_control: variant?.isControl || false
  });
  
  // Log pour debug
  if (process.env.NODE_ENV === 'development') {
    console.log('A/B Test Conversion:', {
      testId,
      variantId: assignment.variantId,
      conversionGoal: test.conversionGoal,
      value: conversionValue
    });
  }
};

// Hook React pour utiliser l'A/B testing
export const useABTest = (testId: string) => {
  const variant = getVariantForUser(testId);
  const test = activeABTests[testId];
  
  const trackConversion = (value?: number) => {
    trackABTestConversion(testId, value);
  };
  
  return {
    variant,
    test,
    isActive: test?.isActive || false,
    trackConversion
  };
};

// Fonction pour obtenir toutes les assignations actives d'un utilisateur
export const getUserABTestAssignments = (): Record<string, ABTestResult> => {
  if (typeof window === 'undefined') return {};
  
  const assignments: Record<string, ABTestResult> = {};
  
  Object.keys(activeABTests).forEach(testId => {
    const assignmentKey = `ab_assignment_${testId}`;
    const assignmentData = localStorage.getItem(assignmentKey);
    
    if (assignmentData) {
      try {
        assignments[testId] = JSON.parse(assignmentData);
      } catch (error) {
        console.warn(`Erreur parsing assignation A/B pour ${testId}:`, error);
      }
    }
  });
  
  return assignments;
};

// Fonction pour forcer un variant (pour les tests)
export const forceVariant = (testId: string, variantId: string) => {
  if (typeof window === 'undefined') return;
  
  const test = activeABTests[testId];
  if (!test) return;
  
  const variant = test.variants.find(v => v.id === variantId);
  if (!variant) return;
  
  const userId = getUserId();
  recordVariantAssignment(testId, variantId, userId);
};

// Fonction pour nettoyer les assignations expirées
export const cleanupExpiredAssignments = () => {
  if (typeof window === 'undefined') return;
  
  Object.values(activeABTests).forEach(test => {
    if (!test.isActive || (test.endDate && new Date() > new Date(test.endDate))) {
      const assignmentKey = `ab_assignment_${test.testId}`;
      localStorage.removeItem(assignmentKey);
    }
  });
};

// Fonction pour obtenir les statistiques d'un test (côté client)
export const getTestStats = (testId: string) => {
  const test = activeABTests[testId];
  if (!test) return null;
  
  return {
    testId,
    testName: test.testName,
    isActive: test.isActive,
    variants: test.variants.map(variant => ({
      id: variant.id,
      name: variant.name,
      weight: variant.weight,
      isControl: variant.isControl
    })),
    conversionGoal: test.conversionGoal
  };
};