import { useState, useCallback, useMemo } from 'react';
import { CategoryTheme, getCategoryTheme } from '@/types/category-templates';

// Hook optimisé pour gérer le thème actuel (mode clair uniquement)
export function useTheme(initialCategorySlug?: string) {
  const [currentTheme, setCurrentTheme] = useState<CategoryTheme>(() => 
    initialCategorySlug ? getCategoryTheme(initialCategorySlug) : getCategoryTheme('digital-ai')
  );
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeTheme = useCallback((categorySlug: string) => {
    const newTheme = getCategoryTheme(categorySlug);
    
    if (newTheme.name !== currentTheme.name) {
      setIsTransitioning(true);
      
      // Délai pour permettre une transition fluide
      setTimeout(() => {
        setCurrentTheme(newTheme);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentTheme.name]);

  return {
    theme: currentTheme,
    isTransitioning,
    changeTheme
  };
}

// Hook spécialisé optimisé pour les catégories (mode clair uniquement)
export function useCategoryTheme(categorySlug: string) {
  const theme = getCategoryTheme(categorySlug);
  
  // Génère les classes CSS optimisées pour le mode clair
  const themeClasses = useMemo(() => ({
    gradient: `bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientVia} ${theme.gradientTo}`,
    primaryText: `text-[${theme.primaryColor}]`,
    secondaryText: `text-[${theme.secondaryColor}]`,
    primaryBg: `bg-[${theme.primaryColor}]`,
    secondaryBg: `bg-[${theme.secondaryColor}]`,
    accentBg: `bg-[${theme.accentColor}]`,
    border: `border-[${theme.primaryColor}]`,
    borderSecondary: `border-[${theme.secondaryColor}]`,
    shadow: `shadow-[${theme.primaryColor}]/20`,
    ring: `ring-[${theme.primaryColor}]/30`,
    // Classes optimisées pour les composants courants
    cardBg: 'bg-white/70 backdrop-blur-sm',
    textPrimary: 'text-primary-title',
    textSecondary: 'text-primary-secondary/90',
    buttonPrimary: `bg-[${theme.primaryColor}] text-white hover:bg-[${theme.primaryColor}]/90`,
    buttonSecondary: `bg-white/20 text-[${theme.primaryColor}] hover:bg-white/30`
  }), [theme]);

  // Génère les styles CSS personnalisés optimisés
  const themeStyles = useMemo(() => ({
    '--theme-primary': theme.primaryColor,
    '--theme-secondary': theme.secondaryColor,
    '--theme-accent': theme.accentColor,
    '--theme-particle': theme.particleColor,
    // Variables CSS pour une meilleure performance
    '--theme-gradient': `linear-gradient(to bottom right, ${theme.gradientFrom.replace('from-', '')}, ${theme.gradientVia.replace('via-', '')}, ${theme.gradientTo.replace('to-', '')})`
  } as React.CSSProperties), [theme]);

  // Props optimisées pour ParticleBackground
  const particleProps = useMemo(() => ({
    color: theme.particleColor,
    density: 30,
    speed: 0.3,
    opacity: 0.4
  }), [theme]);

  return {
    theme,
    themeClasses,
    themeStyles,
    particleProps,
    // Fonctions utilitaires pour des cas spécifiques
    getThemeClass: useCallback((type: keyof typeof themeClasses) => themeClasses[type], [themeClasses]),
    getThemeVariable: useCallback((variable: string) => `var(--theme-${variable})`, [])
  };
}

// Hook optimisé pour les transitions de thème (mode clair uniquement)
export function useThemeTransition() {
  const [previousTheme, setPreviousTheme] = useState<CategoryTheme | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback((fromSlug: string, toSlug: string) => {
    const fromTheme = getCategoryTheme(fromSlug);
    const toTheme = getCategoryTheme(toSlug);
    
    if (fromTheme.name !== toTheme.name) {
      setPreviousTheme(fromTheme);
      setIsTransitioning(true);
      
      // Transition optimisée pour le mode clair
      setTimeout(() => {
        setPreviousTheme(null);
        setIsTransitioning(false);
      }, 300);
    }
  }, []);

  // Classes de transition optimisées pour le mode clair
  const transitionClasses = useMemo(() => ({
    container: 'transition-all duration-300 ease-in-out',
    fadeIn: 'opacity-0 animate-fade-in',
    fadeOut: 'opacity-100 animate-fade-out',
    slideIn: 'transform translate-x-full animate-slide-in',
    slideOut: 'transform translate-x-0 animate-slide-out'
  }), []);

  return {
    previousTheme,
    isTransitioning,
    startTransition,
    transitionClasses
  };
}