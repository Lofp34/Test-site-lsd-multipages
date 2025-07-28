/**
 * Configuration du thème négociation
 * Centralise toutes les couleurs, gradients et styles pour les techniques de négociation
 */

export interface NegotiationTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  shadows: {
    primary: string;
    secondary: string;
    card: string;
  };
  animations: {
    hover: string;
    focus: string;
    active: string;
  };
}

export const negotiationTheme: NegotiationTheme = {
  colors: {
    primary: '#DC2626',      // Rouge principal
    secondary: '#EA580C',    // Orange accent
    accent: '#F59E0B',       // Ambre highlight
    background: '#FAFAFA',   // Fond légèrement teinté
    surface: '#FFFFFF',      // Surface blanche
    text: {
      primary: '#DC2626',    // Texte rouge pour les titres
      secondary: '#EA580C',  // Texte orange pour les accents
      accent: '#F59E0B',     // Texte ambre pour les highlights
    },
  },
  gradients: {
    primary: 'bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg',
    secondary: 'bg-gradient-to-br from-orange-500 via-red-400/10 to-primary-bg',
    accent: 'bg-gradient-to-br from-amber-500 via-orange-400/10 to-primary-bg',
    background: 'bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg',
  },
  shadows: {
    primary: 'shadow-lg hover:shadow-red-500/30',
    secondary: 'shadow-lg hover:shadow-orange-500/30',
    card: 'shadow-xl hover:shadow-2xl',
  },
  animations: {
    hover: 'hover:scale-105 transition-all duration-300',
    focus: 'focus:ring-2 focus:ring-red-500/50',
    active: 'active:scale-95',
  },
};

/**
 * Utilitaires pour générer les classes CSS du thème négociation
 */
export const negotiationThemeUtils = {
  /**
   * Retourne les classes CSS pour un bouton CTA négociation
   */
  getCTAClasses: (variant: 'primary' | 'secondary' | 'outline' = 'primary'): string => {
    const baseClasses = 'font-semibold rounded-full transition-all duration-300 focus:outline-none';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} negotiation-cta-primary`;
      case 'secondary':
        return `${baseClasses} negotiation-cta-secondary`;
      case 'outline':
        return `${baseClasses} negotiation-cta-outline`;
      default:
        return `${baseClasses} negotiation-cta-primary`;
    }
  },

  /**
   * Retourne les classes CSS pour une carte négociation
   */
  getCardClasses: (hover: boolean = true): string => {
    const baseClasses = 'negotiation-card';
    return hover ? `${baseClasses} negotiation-hover-lift` : baseClasses;
  },

  /**
   * Retourne les classes CSS pour un badge négociation
   */
  getBadgeClasses: (variant: 'primary' | 'secondary' | 'accent' = 'primary'): string => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} negotiation-badge-primary`;
      case 'secondary':
        return `${baseClasses} negotiation-badge-secondary`;
      case 'accent':
        return `${baseClasses} negotiation-badge-accent`;
      default:
        return `${baseClasses} negotiation-badge-primary`;
    }
  },

  /**
   * Retourne les classes CSS pour un gradient de fond
   */
  getBackgroundGradient: (variant: 'primary' | 'secondary' | 'accent' = 'primary'): string => {
    switch (variant) {
      case 'primary':
        return 'negotiation-gradient-primary';
      case 'secondary':
        return 'negotiation-gradient-secondary';
      case 'accent':
        return 'negotiation-gradient-accent';
      default:
        return 'negotiation-gradient-primary';
    }
  },

  /**
   * Retourne les classes CSS pour les particules de fond
   */
  getParticleBackgroundClasses: (): string => {
    return 'negotiation-particles absolute inset-0 pointer-events-none';
  },

  /**
   * Retourne les classes CSS pour une section négociation
   */
  getSectionClasses: (): string => {
    return 'negotiation-section relative overflow-hidden';
  },

  /**
   * Retourne les classes CSS pour un élément interactif
   */
  getInteractiveClasses: (): string => {
    return 'negotiation-interactive';
  },

  /**
   * Retourne les classes CSS pour un texte avec gradient
   */
  getTextGradientClasses: (): string => {
    return 'negotiation-text-gradient font-bold';
  },
};

/**
 * Configuration des couleurs pour ParticleBackground
 */
export const negotiationParticleConfig = {
  density: 30,
  speed: 0.3,
  color: negotiationTheme.colors.primary,
  opacity: 0.4,
};

/**
 * Configuration des animations pour AnimatedSection
 */
export const negotiationAnimationConfig = {
  defaultAnimation: 'fade-in' as const,
  defaultDelay: 0,
  defaultDuration: 700,
  staggerDelay: 100, // Délai entre les éléments pour un effet de cascade
};

/**
 * Mapping des icônes par catégorie de technique
 */
export const negotiationTechniqueIcons = {
  closing: '🤝',
  psychology: '🧠',
  preparation: '🎯',
  'objection-handling': '💬',
  influence: '🎭',
  rapport: '🤝',
  questioning: '❓',
  listening: '👂',
} as const;

/**
 * Configuration responsive pour mobile
 */
export const negotiationResponsiveConfig = {
  mobile: {
    disableHoverEffects: true,
    reducedAnimations: true,
    simplifiedGradients: false,
  },
  tablet: {
    disableHoverEffects: false,
    reducedAnimations: false,
    simplifiedGradients: false,
  },
  desktop: {
    disableHoverEffects: false,
    reducedAnimations: false,
    simplifiedGradients: false,
  },
};

export default negotiationTheme;