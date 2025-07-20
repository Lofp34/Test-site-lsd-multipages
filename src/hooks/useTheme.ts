import { useState, useEffect, useCallback } from 'react';
import { CategoryTheme, getCategoryTheme } from '@/types/category-templates';

// Hook pour gérer le thème actuel
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

// Hook spécialisé pour les catégories
export function useCategoryTheme(categorySlug: string) {
  const theme = getCategoryTheme(categorySlug);
  
  // Génère les classes CSS dynamiques pour le thème
  const getThemeClasses = useCallback(() => {
    return {
      gradient: `bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientVia} ${theme.gradientTo}`,
      primaryText: `text-[${theme.primaryColor}]`,
      secondaryText: `text-[${theme.secondaryColor}]`,
      primaryBg: `bg-[${theme.primaryColor}]`,
      secondaryBg: `bg-[${theme.secondaryColor}]`,
      accentBg: `bg-[${theme.accentColor}]`,
      border: `border-[${theme.primaryColor}]`,
      borderSecondary: `border-[${theme.secondaryColor}]`,
      shadow: `shadow-[${theme.primaryColor}]/20`,
      ring: `ring-[${theme.primaryColor}]/30`
    };
  }, [theme]);

  // Génère les styles inline pour les propriétés CSS personnalisées
  const getThemeStyles = useCallback(() => {
    return {
      '--theme-primary': theme.primaryColor,
      '--theme-secondary': theme.secondaryColor,
      '--theme-accent': theme.accentColor,
      '--theme-particle': theme.particleColor
    } as React.CSSProperties;
  }, [theme]);

  // Génère les props pour ParticleBackground
  const getParticleProps = useCallback(() => {
    return {
      color: theme.particleColor,
      density: 30,
      speed: 0.3,
      opacity: 0.4
    };
  }, [theme]);

  return {
    theme,
    getThemeClasses,
    getThemeStyles,
    getParticleProps
  };
}

// Hook pour les transitions de thème lors de la navigation
export function useThemeTransition() {
  const [previousTheme, setPreviousTheme] = useState<CategoryTheme | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback((fromSlug: string, toSlug: string) => {
    const fromTheme = getCategoryTheme(fromSlug);
    const toTheme = getCategoryTheme(toSlug);
    
    if (fromTheme.name !== toTheme.name) {
      setPreviousTheme(fromTheme);
      setIsTransitioning(true);
      
      // Transition automatique après 300ms
      setTimeout(() => {
        setPreviousTheme(null);
        setIsTransitioning(false);
      }, 300);
    }
  }, []);

  return {
    previousTheme,
    isTransitioning,
    startTransition
  };
}