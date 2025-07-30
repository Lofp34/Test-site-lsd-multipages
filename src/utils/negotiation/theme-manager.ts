// Système de gestion des thèmes pour les techniques de négociation
// Chaque technique a son identité visuelle unique tout en maintenant la cohérence

export interface TechniqueTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    particle: string;
  };
  gradient: {
    from: string;
    via: string;
    to: string;
  };
  icon: string;
  className: string;
  category: 'closing' | 'psychology' | 'preparation' | 'objection-handling';
}

// Définition des 7 thèmes visuels pour les techniques de négociation
export const techniqueThemes: Record<string, TechniqueTheme> = {
  'effet-miroir': {
    id: 'effet-miroir',
    name: 'L\'effet miroir',
    colors: {
      primary: '#4F46E5',    // Bleu empathie
      secondary: '#6366F1',   // Bleu clair
      accent: '#8B5CF6',      // Violet accent
      particle: '#4F46E5'
    },
    gradient: {
      from: 'from-indigo-600',
      via: 'via-blue-500/10',
      to: 'to-primary-bg'
    },
    icon: '🪞',
    className: 'theme-effet-miroir',
    category: 'psychology'
  },
  'silence-strategique': {
    id: 'silence-strategique',
    name: 'Le silence stratégique',
    colors: {
      primary: '#6B7280',    // Gris mystère
      secondary: '#9CA3AF',   // Gris clair
      accent: '#374151',      // Gris foncé
      particle: '#6B7280'
    },
    gradient: {
      from: 'from-gray-600',
      via: 'via-slate-500/10',
      to: 'to-primary-bg'
    },
    icon: '🤫',
    className: 'theme-silence-strategique',
    category: 'psychology'
  },
  'negociation-raisonnee': {
    id: 'negociation-raisonnee',
    name: 'La négociation raisonnée',
    colors: {
      primary: '#10B981',    // Vert équilibre
      secondary: '#34D399',   // Vert clair
      accent: '#059669',      // Vert foncé
      particle: '#10B981'
    },
    gradient: {
      from: 'from-emerald-600',
      via: 'via-green-500/10',
      to: 'to-primary-bg'
    },
    icon: '⚖️',
    className: 'theme-negociation-raisonnee',
    category: 'preparation'
  },
  'ancrage-tactique': {
    id: 'ancrage-tactique',
    name: 'L\'ancrage tactique',
    colors: {
      primary: '#F59E0B',    // Orange influence
      secondary: '#FBBF24',   // Orange clair
      accent: '#D97706',      // Orange foncé
      particle: '#F59E0B'
    },
    gradient: {
      from: 'from-amber-600',
      via: 'via-yellow-500/10',
      to: 'to-primary-bg'
    },
    icon: '⚓',
    className: 'theme-ancrage-tactique',
    category: 'psychology'
  },
  'oui-progressif': {
    id: 'oui-progressif',
    name: 'La technique du "Oui" progressif',
    colors: {
      primary: '#8B5CF6',    // Violet persuasion
      secondary: '#A78BFA',   // Violet clair
      accent: '#7C3AED',      // Violet foncé
      particle: '#8B5CF6'
    },
    gradient: {
      from: 'from-violet-600',
      via: 'via-purple-500/10',
      to: 'to-primary-bg'
    },
    icon: '✅',
    className: 'theme-oui-progressif',
    category: 'closing'
  },
  'recadrage-valeur': {
    id: 'recadrage-valeur',
    name: 'Le recadrage de valeur',
    colors: {
      primary: '#14B8A6',    // Teal transformation
      secondary: '#5EEAD4',   // Teal clair
      accent: '#0F766E',      // Teal foncé
      particle: '#14B8A6'
    },
    gradient: {
      from: 'from-teal-600',
      via: 'via-cyan-500/10',
      to: 'to-primary-bg'
    },
    icon: '🔄',
    className: 'theme-recadrage-valeur',
    category: 'objection-handling'
  },
  'concession-calculee': {
    id: 'concession-calculee',
    name: 'La concession calculée',
    colors: {
      primary: '#EF4444',    // Rouge stratégie
      secondary: '#F87171',   // Rouge clair
      accent: '#DC2626',      // Rouge foncé
      particle: '#EF4444'
    },
    gradient: {
      from: 'from-red-600',
      via: 'via-rose-500/10',
      to: 'to-primary-bg'
    },
    icon: '🎯',
    className: 'theme-concession-calculee',
    category: 'closing'
  }
};

// Thème par défaut pour les techniques non spécifiées
export const defaultTechniqueTheme: TechniqueTheme = {
  id: 'default',
  name: 'Technique de négociation',
  colors: {
    primary: '#DC2626',    // Rouge négociation standard
    secondary: '#EA580C',   // Orange accent
    accent: '#F59E0B',      // Ambre highlight
    particle: '#DC2626'
  },
  gradient: {
    from: 'from-red-600',
    via: 'via-orange-500/10',
    to: 'to-primary-bg'
  },
  icon: '🤝',
  className: 'theme-negotiation-default',
  category: 'closing'
};

/**
 * Récupère le thème d'une technique spécifique
 */
export function getTechniqueTheme(techniqueId: string): TechniqueTheme {
  return techniqueThemes[techniqueId] || defaultTechniqueTheme;
}

/**
 * Récupère tous les thèmes disponibles
 */
export function getAllTechniqueThemes(): TechniqueTheme[] {
  return Object.values(techniqueThemes);
}

/**
 * Récupère les thèmes par catégorie
 */
export function getThemesByCategory(category: TechniqueTheme['category']): TechniqueTheme[] {
  return Object.values(techniqueThemes).filter(theme => theme.category === category);
}

/**
 * Génère les variables CSS pour un thème donné
 */
export function generateThemeCSS(theme: TechniqueTheme): Record<string, string> {
  return {
    '--technique-primary': theme.colors.primary,
    '--technique-secondary': theme.colors.secondary,
    '--technique-accent': theme.colors.accent,
    '--technique-particle': theme.colors.particle,
    '--technique-gradient-from': theme.gradient.from,
    '--technique-gradient-via': theme.gradient.via,
    '--technique-gradient-to': theme.gradient.to,
  };
}

/**
 * Applique dynamiquement un thème à un élément DOM
 */
export function applyThemeToElement(element: HTMLElement, theme: TechniqueTheme): void {
  const cssVars = generateThemeCSS(theme);
  
  Object.entries(cssVars).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
  
  // Ajouter la classe CSS du thème
  element.classList.add(theme.className);
}

/**
 * Retire un thème d'un élément DOM
 */
export function removeThemeFromElement(element: HTMLElement, theme: TechniqueTheme): void {
  const cssVars = generateThemeCSS(theme);
  
  Object.keys(cssVars).forEach(property => {
    element.style.removeProperty(property);
  });
  
  element.classList.remove(theme.className);
}

/**
 * Hook React pour utiliser un thème de technique
 */
export function useTechniqueTheme(techniqueId: string) {
  const theme = getTechniqueTheme(techniqueId);
  
  return {
    theme,
    cssVars: generateThemeCSS(theme),
    applyTheme: (element: HTMLElement) => applyThemeToElement(element, theme),
    removeTheme: (element: HTMLElement) => removeThemeFromElement(element, theme)
  };
}

/**
 * Valide qu'un thème est correctement configuré
 */
export function validateTheme(theme: TechniqueTheme): boolean {
  const requiredFields = ['id', 'name', 'colors', 'gradient', 'icon', 'className', 'category'];
  const requiredColors = ['primary', 'secondary', 'accent', 'particle'];
  const requiredGradient = ['from', 'via', 'to'];
  
  // Vérifier les champs principaux
  for (const field of requiredFields) {
    if (!(field in theme)) {
      console.error(`Theme validation failed: missing field "${field}"`);
      return false;
    }
  }
  
  // Vérifier les couleurs
  for (const color of requiredColors) {
    if (!(color in theme.colors)) {
      console.error(`Theme validation failed: missing color "${color}"`);
      return false;
    }
  }
  
  // Vérifier le gradient
  for (const gradientPart of requiredGradient) {
    if (!(gradientPart in theme.gradient)) {
      console.error(`Theme validation failed: missing gradient "${gradientPart}"`);
      return false;
    }
  }
  
  return true;
}

/**
 * Valide tous les thèmes configurés
 */
export function validateAllThemes(): boolean {
  let allValid = true;
  
  Object.entries(techniqueThemes).forEach(([id, theme]) => {
    if (!validateTheme(theme)) {
      console.error(`Theme validation failed for technique: ${id}`);
      allValid = false;
    }
  });
  
  return allValid;
}