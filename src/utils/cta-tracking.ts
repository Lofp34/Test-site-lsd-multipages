'use client';

// Types pour le tracking des CTAs
export interface CTATrackingData {
  ctaId: string;
  ctaText: string;
  ctaType: 'primary' | 'secondary' | 'tertiary';
  section: string;
  destination: string;
  variant?: string;
  position?: number;
}

export interface ConversionGoal {
  goalId: string;
  goalName: string;
  goalValue: number;
  goalCategory: 'lead_generation' | 'engagement' | 'conversion' | 'navigation';
}

// Configuration des goals de conversion - Optimisée pour les nouveaux CTAs
export const conversionGoals: Record<string, ConversionGoal> = {
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

// Mapping des CTAs vers les goals - Mis à jour pour tous les nouveaux CTAs
export const ctaToGoalMapping: Record<string, string> = {
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

// Fonction principale de tracking des CTAs - Améliorée pour les nouveaux CTAs
export const trackCTAClick = (data: CTATrackingData) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    console.warn('Google Analytics non disponible pour le tracking CTA');
    return;
  }

  const timestamp = Date.now();
  const sessionId = getOrCreateSessionId();

  // Event de base pour le clic CTA - Structure améliorée
  window.gtag('event', 'cta_click', {
    event_category: 'cta_engagement',
    event_label: data.ctaId,
    cta_id: data.ctaId,
    cta_text: data.ctaText,
    cta_type: data.ctaType,
    cta_section: data.section,
    cta_destination: data.destination,
    cta_variant: data.variant || 'default',
    cta_position: data.position || 1,
    session_id: sessionId,
    timestamp: timestamp,
    custom_parameter_1: `${data.section}_${data.ctaType}`,
    custom_parameter_2: data.destination
  });

  // Tracking du goal de conversion associé
  const goalId = ctaToGoalMapping[data.ctaId];
  if (goalId && conversionGoals[goalId]) {
    const goal = conversionGoals[goalId];
    
    // Event de conversion principal
    window.gtag('event', 'conversion', {
      event_category: goal.goalCategory,
      event_label: goal.goalName,
      value: goal.goalValue,
      currency: 'EUR',
      goal_id: goal.goalId,
      conversion_source: data.section,
      conversion_medium: 'cta_click',
      conversion_timestamp: timestamp,
      session_id: sessionId
    });

    // Event spécifique par type de goal
    window.gtag('event', `goal_${goal.goalCategory}`, {
      event_category: 'conversion_goals',
      event_label: goal.goalName,
      goal_type: goal.goalCategory,
      goal_value: goal.goalValue,
      source_section: data.section,
      source_cta: data.ctaId
    });
  }

  // Event spécifique pour le funnel de conversion
  window.gtag('event', 'funnel_step', {
    event_category: 'conversion_funnel',
    event_label: `${data.section}_to_${data.destination}`,
    funnel_step: getFunnelStep(data.destination),
    funnel_source: data.section,
    funnel_destination: data.destination,
    funnel_cta_type: data.ctaType,
    value: getFunnelValue(data.destination),
    session_id: sessionId
  });

  // Tracking spécifique pour les CTAs bootcamp (priorité business)
  if (data.ctaId.includes('bootcamp')) {
    window.gtag('event', 'bootcamp_interest', {
      event_category: 'business_priority',
      event_label: `bootcamp_cta_${data.section}`,
      bootcamp_source: data.section,
      bootcamp_cta_type: data.ctaType,
      bootcamp_position: data.position,
      value: 75
    });
  }

  // Tracking spécifique pour les CTAs ressources
  if (data.ctaId.includes('resources') || data.ctaId.includes('resource')) {
    window.gtag('event', 'resource_interest', {
      event_category: 'lead_nurturing',
      event_label: `resource_cta_${data.section}`,
      resource_source: data.section,
      resource_type: data.ctaId.includes('specific') ? 'specific' : 'general',
      value: 20
    });
  }

  // Log pour debug en développement
  if (process.env.NODE_ENV === 'development') {
    console.log('CTA Tracking Enhanced:', {
      event: 'cta_click',
      data,
      goal: goalId ? conversionGoals[goalId] : null,
      sessionId,
      timestamp
    });
  }
};

// Fonction pour déterminer l'étape du funnel
const getFunnelStep = (destination: string): number => {
  const funnelSteps: Record<string, number> = {
    '/ressources': 1,
    '/diagnostic': 2,
    '/bootcamp': 3,
    '/contact': 4
  };
  
  return funnelSteps[destination] || 1;
};

// Fonction pour déterminer la valeur de l'étape du funnel
const getFunnelValue = (destination: string): number => {
  const funnelValues: Record<string, number> = {
    '/ressources': 10,
    '/diagnostic': 25,
    '/bootcamp': 75,
    '/contact': 50
  };
  
  return funnelValues[destination] || 5;
};

// Tracking des parcours utilisateur
export const trackUserJourney = (fromSection: string, toSection: string) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'user_journey', {
    event_category: 'navigation',
    event_label: `${fromSection}_to_${toSection}`,
    journey_from: fromSection,
    journey_to: toSection,
    journey_timestamp: Date.now()
  });
};

// Tracking des sections vues (pour mesurer l'engagement)
export const trackSectionView = (sectionName: string, timeSpent?: number) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'section_view', {
    event_category: 'engagement',
    event_label: sectionName,
    section_name: sectionName,
    time_spent: timeSpent || 0,
    engagement_type: 'section_view'
  });
};

// Tracking des micro-conversions (hover, scroll, etc.)
export const trackMicroConversion = (action: string, element: string, section: string) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'micro_conversion', {
    event_category: 'micro_engagement',
    event_label: `${action}_${element}`,
    micro_action: action,
    micro_element: element,
    micro_section: section
  });
};

// Hook pour faciliter l'utilisation dans les composants
export const useCTATracking = () => {
  const trackCTA = (ctaData: CTATrackingData) => {
    trackCTAClick(ctaData);
  };

  const trackHover = (ctaId: string, section: string) => {
    trackMicroConversion('hover', ctaId, section);
  };

  const trackView = (sectionName: string) => {
    trackSectionView(sectionName);
  };

  return {
    trackCTA,
    trackHover,
    trackView,
    trackJourney: trackUserJourney
  };
};

// Fonction pour générer ou récupérer un ID de session
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

// Tracking avancé des parcours utilisateur avec contexte
export const trackAdvancedUserJourney = (data: {
  fromSection: string;
  toSection: string;
  ctaId?: string;
  timeSpent?: number;
  scrollDepth?: number;
}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const sessionId = getOrCreateSessionId();

  window.gtag('event', 'advanced_user_journey', {
    event_category: 'user_behavior',
    event_label: `${data.fromSection}_to_${data.toSection}`,
    journey_from: data.fromSection,
    journey_to: data.toSection,
    journey_cta: data.ctaId || 'direct',
    time_spent: data.timeSpent || 0,
    scroll_depth: data.scrollDepth || 0,
    session_id: sessionId,
    timestamp: Date.now()
  });
};

// Tracking des conversions par étapes du funnel
export const trackFunnelConversion = (step: string, value: number, metadata?: Record<string, any>) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const sessionId = getOrCreateSessionId();

  window.gtag('event', 'funnel_conversion', {
    event_category: 'conversion_funnel',
    event_label: step,
    funnel_step: step,
    value: value,
    currency: 'EUR',
    session_id: sessionId,
    ...metadata
  });
};

// Tracking des abandons de conversion
export const trackConversionAbandonment = (step: string, reason?: string) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'conversion_abandonment', {
    event_category: 'conversion_analysis',
    event_label: step,
    abandonment_step: step,
    abandonment_reason: reason || 'unknown',
    session_id: getOrCreateSessionId()
  });
};

// Configuration des événements personnalisés pour Google Analytics
export const setupCustomEvents = () => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-1YMSHSSQKJ';

  // Configuration des custom dimensions et paramètres
  window.gtag('config', measurementId, {
    custom_map: {
      custom_parameter_1: 'cta_context',
      custom_parameter_2: 'cta_destination'
    },
    // Configuration pour le tracking des conversions
    send_page_view: true,
    // Paramètres pour améliorer le tracking des CTAs
    enhanced_conversions: true,
    // Configuration des événements personnalisés
    custom_parameters: {
      session_tracking: true,
      funnel_tracking: true,
      cta_enhanced_tracking: true
    }
  });

  // Initialiser le tracking de session
  const sessionId = getOrCreateSessionId();
  
  // Event de début de session si nouvelle session
  if (!sessionStorage.getItem('ls_session_started')) {
    window.gtag('event', 'session_start', {
      event_category: 'session_tracking',
      session_id: sessionId,
      timestamp: Date.now()
    });
    sessionStorage.setItem('ls_session_started', 'true');
  }
};

// Fonction pour configurer les goals de conversion dans GA4
export const setupConversionGoals = () => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  // Configurer chaque goal comme conversion dans GA4
  Object.values(conversionGoals).forEach(goal => {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-1YMSHSSQKJ', {
      custom_map: {
        [`goal_${goal.goalId}`]: goal.goalName
      }
    });
  });
};