// Utilitaires pour le lazy loading et l'optimisation des performances
// des pages de techniques de négociation

import { lazy, ComponentType } from 'react';

// Types pour les composants de sections
type SectionComponent = ComponentType<any>;

/**
 * Configuration du lazy loading pour les composants de sections
 */
export const lazySectionComponents = {
  // Ces imports seront activés quand les composants seront créés
  // HeroSection: lazy(() => import('@/components/sections/negotiation/HeroSection')),
  // ExpertiseSection: lazy(() => import('@/components/sections/negotiation/ExpertiseSection')),
  // PracticalGuide: lazy(() => import('@/components/sections/negotiation/PracticalGuide')),
  // CaseStudies: lazy(() => import('@/components/sections/negotiation/CaseStudies')),
  // CommonMistakes: lazy(() => import('@/components/sections/negotiation/CommonMistakes')),
  // InteractiveTools: lazy(() => import('@/components/sections/negotiation/InteractiveTools')),
  // ConversionCTAs: lazy(() => import('@/components/sections/negotiation/ConversionCTAs')),
  // RelatedTechniques: lazy(() => import('@/components/sections/negotiation/RelatedTechniques'))
};

/**
 * Charge dynamiquement un composant de section
 */
export async function loadSectionComponent(sectionId: string): Promise<SectionComponent | null> {
  try {
    switch (sectionId) {
      case 'hero':
        return (await import('@/components/sections/negotiation/HeroSection')).default;
      // case 'expertise':
      //   return (await import('@/components/sections/negotiation/ExpertiseSection')).default;
      // case 'practical-guide':
      //   return (await import('@/components/sections/negotiation/PracticalGuide')).default;
      // case 'case-studies':
      //   return (await import('@/components/sections/negotiation/CaseStudies')).default;
      // case 'common-mistakes':
      //   return (await import('@/components/sections/negotiation/CommonMistakes')).default;
      // case 'interactive-tools':
      //   return (await import('@/components/sections/negotiation/InteractiveTools')).default;
      // case 'conversion-ctas':
      //   return (await import('@/components/sections/negotiation/ConversionCTAs')).default;
      // case 'related-techniques':
      //   return (await import('@/components/sections/negotiation/RelatedTechniques')).default;
      default:
        console.warn(`Section component not found: ${sectionId}`);
        return null;
    }
  } catch (error) {
    console.error(`Error loading section component ${sectionId}:`, error);
    return null;
  }
}

/**
 * Précharge les composants critiques
 */
export function preloadCriticalSections(): void {
  // Précharger les sections above-the-fold
  const criticalSections = ['hero', 'expertise'];
  
  criticalSections.forEach(sectionId => {
    loadSectionComponent(sectionId).catch(error => {
      console.warn(`Failed to preload section ${sectionId}:`, error);
    });
  });
}

/**
 * Configuration de l'intersection observer pour le lazy loading
 */
export const intersectionObserverConfig: IntersectionObserverInit = {
  root: null,
  rootMargin: '50px 0px', // Commencer à charger 50px avant que l'élément soit visible
  threshold: 0.1
};

/**
 * Hook personnalisé pour le lazy loading basé sur l'intersection observer
 */
export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = intersectionObserverConfig
) {
  const observer = typeof window !== 'undefined' 
    ? new IntersectionObserver(callback, options)
    : null;

  const observe = (element: Element) => {
    if (observer) {
      observer.observe(element);
    }
  };

  const unobserve = (element: Element) => {
    if (observer) {
      observer.unobserve(element);
    }
  };

  const disconnect = () => {
    if (observer) {
      observer.disconnect();
    }
  };

  return { observe, unobserve, disconnect };
}

/**
 * Composant wrapper pour le lazy loading des sections
 */
export interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  onLoad?: () => void;
}

export const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({
  children,
  fallback = <div className="animate-pulse bg-gray-200 h-32 rounded"></div>,
  className = '',
  onLoad
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  const { observe, disconnect } = useIntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          if (onLoad) {
            onLoad();
          }
        }
      });
    }
  );

  React.useEffect(() => {
    const element = elementRef.current;
    if (element) {
      observe(element);
    }

    return () => {
      disconnect();
    };
  }, [observe, disconnect]);

  React.useEffect(() => {
    if (isVisible && !isLoaded) {
      // Simuler le chargement du contenu
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible && isLoaded ? children : fallback}
    </div>
  );
};

/**
 * Utilitaires pour l'optimisation des images
 */
export interface ImageOptimizationConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  loading?: 'lazy' | 'eager';
}

export function generateOptimizedImageUrl(
  src: string, 
  config: ImageOptimizationConfig = {}
): string {
  const {
    width,
    height,
    quality = 85,
    format = 'webp',
    loading = 'lazy'
  } = config;

  // Si c'est une image Next.js, utiliser les paramètres d'optimisation
  if (src.startsWith('/') && typeof window !== 'undefined') {
    const params = new URLSearchParams();
    
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());
    params.set('f', format);
    
    return `${src}?${params.toString()}`;
  }

  return src;
}

/**
 * Précharge les ressources critiques pour une technique
 */
export function preloadTechniqueResources(techniqueId: string): void {
  if (typeof window === 'undefined') return;

  // Précharger l'image OG
  const ogImage = new Image();
  ogImage.src = `/images/og-${techniqueId}.jpg`;

  // Précharger les images des étapes si elles existent
  for (let i = 1; i <= 5; i++) {
    const stepImage = new Image();
    stepImage.src = `/images/step-${techniqueId}-${i}.jpg`;
  }

  // Précharger les ressources CSS spécifiques au thème
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = '/styles/negotiation/technique-themes.css';
  document.head.appendChild(link);
}

/**
 * Mesure les performances de chargement
 */
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

export function measureSectionPerformance(sectionId: string): PerformanceMetrics {
  const startTime = performance.now();
  
  return {
    loadTime: 0, // Sera mis à jour lors du chargement
    renderTime: 0, // Sera mis à jour lors du rendu
    interactionTime: 0, // Sera mis à jour lors de l'interaction
  };
}

/**
 * Optimise le chargement des polices
 */
export function preloadFonts(): void {
  if (typeof window === 'undefined') return;

  const fonts = [
    'Inter',
    'Roboto Slab',
    'Open Sans',
    'Nunito'
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = `/fonts/${font.replace(' ', '-').toLowerCase()}.woff2`;
    document.head.appendChild(link);
  });
}