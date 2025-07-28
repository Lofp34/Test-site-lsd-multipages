'use client';

import { useState, useEffect } from 'react';
import { negotiationTheme, negotiationThemeUtils, negotiationResponsiveConfig } from '@/utils/negotiation-theme';

interface UseNegotiationThemeReturn {
  theme: typeof negotiationTheme;
  utils: typeof negotiationThemeUtils;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  shouldDisableHoverEffects: boolean;
  shouldReduceAnimations: boolean;
}

/**
 * Hook personnalisé pour gérer le thème négociation
 * Gère la responsivité et les optimisations mobile
 */
export const useNegotiationTheme = (): UseNegotiationThemeReturn => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Determine if hover effects should be disabled
  const shouldDisableHoverEffects = isMobile && negotiationResponsiveConfig.mobile.disableHoverEffects;
  
  // Determine if animations should be reduced
  const shouldReduceAnimations = isMobile && negotiationResponsiveConfig.mobile.reducedAnimations;

  return {
    theme: negotiationTheme,
    utils: negotiationThemeUtils,
    isMobile,
    isTablet,
    isDesktop,
    shouldDisableHoverEffects,
    shouldReduceAnimations,
  };
};

/**
 * Hook pour gérer les classes CSS conditionnelles basées sur le thème
 */
export const useNegotiationClasses = () => {
  const { shouldDisableHoverEffects, shouldReduceAnimations } = useNegotiationTheme();

  const getConditionalClasses = (
    baseClasses: string,
    hoverClasses?: string,
    animationClasses?: string
  ): string => {
    let classes = baseClasses;

    if (hoverClasses && !shouldDisableHoverEffects) {
      classes += ` ${hoverClasses}`;
    }

    if (animationClasses && !shouldReduceAnimations) {
      classes += ` ${animationClasses}`;
    }

    return classes;
  };

  const getCTAClasses = (variant: 'primary' | 'secondary' | 'outline' = 'primary'): string => {
    const baseClasses = negotiationThemeUtils.getCTAClasses(variant);
    const hoverClasses = shouldDisableHoverEffects ? '' : 'hover:scale-105';
    
    return getConditionalClasses(baseClasses, hoverClasses);
  };

  const getCardClasses = (enableHover: boolean = true): string => {
    const baseClasses = 'negotiation-card';
    const hoverClasses = enableHover && !shouldDisableHoverEffects ? 'negotiation-hover-lift' : '';
    
    return getConditionalClasses(baseClasses, hoverClasses);
  };

  const getInteractiveClasses = (): string => {
    const baseClasses = 'negotiation-interactive';
    const hoverClasses = shouldDisableHoverEffects ? '' : 'hover:scale-105';
    
    return getConditionalClasses(baseClasses, hoverClasses);
  };

  return {
    getConditionalClasses,
    getCTAClasses,
    getCardClasses,
    getInteractiveClasses,
  };
};

export default useNegotiationTheme;