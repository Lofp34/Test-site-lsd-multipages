// Optimisations de performance avancées pour les techniques de négociation
// Code splitting, lazy loading, compression et Core Web Vitals

import { NegotiationTechnique } from '@/types/negotiation-technique';

export interface PerformanceConfig {
  enableCodeSplitting: boolean;
  enableImageOptimization: boolean;
  enableFontOptimization: boolean;
  enableCacheOptimization: boolean;
  enableCriticalCSS: boolean;
  enableServiceWorker: boolean;
}

export interface CoreWebVitals {
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  FCP: number; // First Contentful Paint
  TTFB: number; // Time to First Byte
}

export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  bundleSize: number;
  cacheHitRate: number;
  coreWebVitals: CoreWebVitals;
}

/**
 * Gestionnaire principal d'optimisation des performances
 */
export class PerformanceOptimizer {
  private config: PerformanceConfig;
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor(config: PerformanceConfig) {
    this.config = config;
    this.initializePerformanceMonitoring();
  }

  /**
   * Initialise le monitoring des performances
   */
  private initializePerformanceMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Observer pour les Core Web Vitals
    this.initializeCoreWebVitalsMonitoring();
    
    // Observer pour les métriques de navigation
    this.initializeNavigationMetrics();
    
    // Observer pour les ressources
    this.initializeResourceMetrics();
  }

  /**
   * Initialise le monitoring des Core Web Vitals
   */
  private initializeCoreWebVitalsMonitoring(): void {
    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
      this.metrics.coreWebVitals = {
        ...this.metrics.coreWebVitals,
        LCP: lastEntry.startTime
      } as CoreWebVitals;
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);
    } catch (e) {
      console.warn('LCP observer not supported');
    }

    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.metrics.coreWebVitals = {
          ...this.metrics.coreWebVitals,
          FID: entry.processingStart - entry.startTime
        } as CoreWebVitals;
      });
    });
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);
    } catch (e) {
      console.warn('FID observer not supported');
    }

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.metrics.coreWebVitals = {
            ...this.metrics.coreWebVitals,
            CLS: clsValue
          } as CoreWebVitals;
        }
      });
    });
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);
    } catch (e) {
      console.warn('CLS observer not supported');
    }
  }

  /**
   * Initialise les métriques de navigation
   */
  private initializeNavigationMetrics(): void {
    const navigationObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.metrics.coreWebVitals = {
          ...this.metrics.coreWebVitals,
          FCP: entry.firstContentfulPaint,
          TTFB: entry.responseStart - entry.requestStart
        } as CoreWebVitals;
        
        this.metrics.loadTime = entry.loadEventEnd - entry.loadEventStart;
      });
    });
    
    try {
      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.set('navigation', navigationObserver);
    } catch (e) {
      console.warn('Navigation observer not supported');
    }
  }

  /**
   * Initialise les métriques de ressources
   */
  private initializeResourceMetrics(): void {
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let totalSize = 0;
      let cacheHits = 0;
      
      entries.forEach((entry: any) => {
        totalSize += entry.transferSize || 0;
        if (entry.transferSize === 0 && entry.decodedBodySize > 0) {
          cacheHits++;
        }
      });
      
      this.metrics.bundleSize = totalSize;
      this.metrics.cacheHitRate = entries.length > 0 ? (cacheHits / entries.length) * 100 : 0;
    });
    
    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.set('resource', resourceObserver);
    } catch (e) {
      console.warn('Resource observer not supported');
    }
  }

  /**
   * Optimise le chargement d'une technique spécifique
   */
  public optimizeTechniqueLoading(technique: NegotiationTechnique): void {
    if (this.config.enableCodeSplitting) {
      this.implementCodeSplitting(technique);
    }
    
    if (this.config.enableImageOptimization) {
      this.optimizeImages(technique);
    }
    
    if (this.config.enableFontOptimization) {
      this.optimizeFonts();
    }
    
    if (this.config.enableCacheOptimization) {
      this.optimizeCache(technique);
    }
    
    if (this.config.enableCriticalCSS) {
      this.inlineCriticalCSS(technique);
    }
  }

  /**
   * Implémente le code splitting par technique
   */
  private implementCodeSplitting(technique: NegotiationTechnique): void {
    // Précharger seulement les composants critiques
    const criticalSections = ['hero', 'expertise'];
    const nonCriticalSections = ['case-studies', 'common-mistakes', 'interactive-tools', 'conversion-ctas', 'related-techniques'];

    // Précharger les sections critiques
    criticalSections.forEach(sectionId => {
      this.preloadSection(sectionId);
    });

    // Lazy load les sections non-critiques
    nonCriticalSections.forEach(sectionId => {
      this.lazyLoadSection(sectionId);
    });
  }

  /**
   * Précharge une section critique
   */
  private preloadSection(sectionId: string): void {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = `/components/sections/negotiation/${this.getSectionFileName(sectionId)}.js`;
    document.head.appendChild(link);
  }

  /**
   * Lazy load une section non-critique
   */
  private lazyLoadSection(sectionId: string): void {
    // Utiliser l'Intersection Observer pour charger quand nécessaire
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          import(`@/components/sections/negotiation/${this.getSectionFileName(sectionId)}`)
            .then(() => {
              observer.unobserve(entry.target);
            })
            .catch(console.error);
        }
      });
    }, { rootMargin: '100px' });

    // Observer sera attaché aux éléments de section dans le template
    (window as any).sectionObserver = observer;
  }

  /**
   * Obtient le nom de fichier d'une section
   */
  private getSectionFileName(sectionId: string): string {
    const fileNames: Record<string, string> = {
      'hero': 'HeroSection',
      'expertise': 'ExpertiseSection',
      'practical-guide': 'PracticalGuide',
      'case-studies': 'CaseStudies',
      'common-mistakes': 'CommonMistakes',
      'interactive-tools': 'InteractiveTools',
      'conversion-ctas': 'ConversionCTAs',
      'related-techniques': 'RelatedTechniques'
    };
    
    return fileNames[sectionId] || sectionId;
  }

  /**
   * Optimise les images pour une technique
   */
  private optimizeImages(technique: NegotiationTechnique): void {
    // Précharger l'image hero en WebP/AVIF
    this.preloadOptimizedImage(`/images/techniques/${technique.slug}/hero-${technique.slug}`, {
      formats: ['avif', 'webp', 'jpeg'],
      sizes: [
        { width: 1200, media: '(min-width: 1024px)' },
        { width: 768, media: '(min-width: 768px)' },
        { width: 480, media: '(max-width: 767px)' }
      ]
    });

    // Lazy load les autres images
    this.setupImageLazyLoading();
  }

  /**
   * Précharge une image optimisée
   */
  private preloadOptimizedImage(basePath: string, options: {
    formats: string[];
    sizes: Array<{ width: number; media: string }>;
  }): void {
    options.formats.forEach(format => {
      options.sizes.forEach(size => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = `${basePath}.${format}?w=${size.width}&q=85`;
        link.media = size.media;
        document.head.appendChild(link);
      });
    });
  }

  /**
   * Configure le lazy loading des images
   */
  private setupImageLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            const srcset = img.dataset.srcset;
            
            if (src) {
              img.src = src;
            }
            if (srcset) {
              img.srcset = srcset;
            }
            
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      // Observer sera attaché aux images lazy dans les composants
      (window as any).imageObserver = imageObserver;
    }
  }

  /**
   * Optimise les polices
   */
  private optimizeFonts(): void {
    const fonts = [
      { family: 'Inter', weights: [400, 500, 600, 700], display: 'swap' },
      { family: 'Roboto Slab', weights: [400, 700], display: 'swap' },
      { family: 'Open Sans', weights: [400, 600], display: 'swap' }
    ];

    fonts.forEach(font => {
      font.weights.forEach(weight => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = `/fonts/${font.family.toLowerCase().replace(' ', '-')}-${weight}.woff2`;
        document.head.appendChild(link);
      });
    });

    // Ajouter font-display: swap via CSS
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
      @font-face {
        font-family: 'Roboto Slab';
        font-display: swap;
      }
      @font-face {
        font-family: 'Open Sans';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Optimise le cache pour une technique
   */
  private optimizeCache(technique: NegotiationTechnique): void {
    // Service Worker pour le cache des ressources
    if ('serviceWorker' in navigator && this.config.enableServiceWorker) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    }

    // Cache des données de technique
    if ('caches' in window) {
      caches.open('technique-data-v1').then(cache => {
        cache.add(`/api/techniques/${technique.id}`);
      });
    }
  }

  /**
   * Inline le CSS critique pour une technique
   */
  private inlineCriticalCSS(technique: NegotiationTechnique): void {
    const criticalCSS = this.generateCriticalCSS(technique);
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);

    // Lazy load le CSS non-critique
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = '/styles/negotiation/technique-themes.css';
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }

  /**
   * Génère le CSS critique pour une technique
   */
  private generateCriticalCSS(technique: NegotiationTechnique): string {
    const theme = this.getTechniqueTheme(technique.id);
    
    return `
      .technique-page.${theme.className} {
        background: linear-gradient(135deg, ${theme.colors.primary}10, ${theme.colors.secondary}05);
      }
      
      .technique-hero {
        background-color: ${theme.colors.primary};
        color: white;
      }
      
      .technique-particles {
        --particle-color: ${theme.colors.particle};
      }
      
      /* Critical layout styles */
      .technique-page {
        min-height: 100vh;
        padding-top: 6rem;
      }
      
      /* Above-the-fold content */
      .hero-section {
        padding: 2rem 0 4rem;
      }
      
      @media (max-width: 768px) {
        .technique-page {
          padding-top: 4rem;
        }
        .hero-section {
          padding: 1rem 0 2rem;
        }
      }
    `;
  }

  /**
   * Obtient le thème d'une technique (simplifié)
   */
  private getTechniqueTheme(techniqueId: string): any {
    // Retourner un thème par défaut - sera remplacé par le vrai thème manager
    return {
      className: `theme-${techniqueId}`,
      colors: {
        primary: '#4F46E5',
        secondary: '#6366F1',
        particle: '#4F46E5'
      }
    };
  }

  /**
   * Mesure et retourne les métriques de performance
   */
  public getPerformanceMetrics(): PerformanceMetrics {
    return {
      loadTime: this.metrics.loadTime || 0,
      renderTime: this.metrics.renderTime || 0,
      interactionTime: this.metrics.interactionTime || 0,
      bundleSize: this.metrics.bundleSize || 0,
      cacheHitRate: this.metrics.cacheHitRate || 0,
      coreWebVitals: this.metrics.coreWebVitals || {
        LCP: 0,
        FID: 0,
        CLS: 0,
        FCP: 0,
        TTFB: 0
      }
    };
  }

  /**
   * Valide les Core Web Vitals
   */
  public validateCoreWebVitals(): {
    isGood: boolean;
    scores: Record<string, 'good' | 'needs-improvement' | 'poor'>;
    recommendations: string[];
  } {
    const vitals = this.metrics.coreWebVitals;
    if (!vitals) {
      return {
        isGood: false,
        scores: {},
        recommendations: ['Métriques non disponibles']
      };
    }

    const scores = {
      LCP: vitals.LCP <= 2500 ? 'good' : vitals.LCP <= 4000 ? 'needs-improvement' : 'poor',
      FID: vitals.FID <= 100 ? 'good' : vitals.FID <= 300 ? 'needs-improvement' : 'poor',
      CLS: vitals.CLS <= 0.1 ? 'good' : vitals.CLS <= 0.25 ? 'needs-improvement' : 'poor',
      FCP: vitals.FCP <= 1800 ? 'good' : vitals.FCP <= 3000 ? 'needs-improvement' : 'poor',
      TTFB: vitals.TTFB <= 800 ? 'good' : vitals.TTFB <= 1800 ? 'needs-improvement' : 'poor'
    } as Record<string, 'good' | 'needs-improvement' | 'poor'>;

    const recommendations: string[] = [];
    
    if (scores.LCP !== 'good') {
      recommendations.push('Optimiser le Largest Contentful Paint: réduire la taille des images hero, utiliser un CDN');
    }
    if (scores.FID !== 'good') {
      recommendations.push('Améliorer le First Input Delay: réduire le JavaScript bloquant, utiliser le code splitting');
    }
    if (scores.CLS !== 'good') {
      recommendations.push('Réduire le Cumulative Layout Shift: définir les dimensions des images, éviter les insertions dynamiques');
    }
    if (scores.FCP !== 'good') {
      recommendations.push('Accélérer le First Contentful Paint: optimiser le CSS critique, réduire le TTFB');
    }
    if (scores.TTFB !== 'good') {
      recommendations.push('Améliorer le Time to First Byte: optimiser le serveur, utiliser un CDN, améliorer le cache');
    }

    const isGood = Object.values(scores).every(score => score === 'good');

    return { isGood, scores, recommendations };
  }

  /**
   * Nettoie les observers
   */
  public cleanup(): void {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}

/**
 * Configuration par défaut pour l'optimisation des performances
 */
export const DEFAULT_PERFORMANCE_CONFIG: PerformanceConfig = {
  enableCodeSplitting: true,
  enableImageOptimization: true,
  enableFontOptimization: true,
  enableCacheOptimization: true,
  enableCriticalCSS: true,
  enableServiceWorker: true
};

/**
 * Utilitaires pour l'optimisation des bundles
 */
export class BundleOptimizer {
  /**
   * Analyse la taille des bundles par technique
   */
  static analyzeBundleSize(techniqueId: string): Promise<{
    totalSize: number;
    jsSize: number;
    cssSize: number;
    imageSize: number;
    recommendations: string[];
  }> {
    return new Promise((resolve) => {
      // Simuler l'analyse des bundles
      setTimeout(() => {
        const mockData = {
          totalSize: Math.random() * 500 + 200, // 200-700 KB
          jsSize: Math.random() * 200 + 100,    // 100-300 KB
          cssSize: Math.random() * 50 + 20,     // 20-70 KB
          imageSize: Math.random() * 300 + 50,  // 50-350 KB
          recommendations: [
            'Utiliser le code splitting pour réduire le bundle initial',
            'Optimiser les images avec WebP/AVIF',
            'Minifier et compresser le CSS',
            'Utiliser tree shaking pour éliminer le code mort'
          ]
        };
        
        resolve(mockData);
      }, 100);
    });
  }

  /**
   * Optimise automatiquement les bundles
   */
  static optimizeBundles(techniques: NegotiationTechnique[]): Promise<{
    optimized: boolean;
    sizeBefore: number;
    sizeAfter: number;
    savings: number;
  }> {
    return new Promise((resolve) => {
      // Simuler l'optimisation
      setTimeout(() => {
        const sizeBefore = techniques.length * 300; // 300 KB par technique
        const sizeAfter = techniques.length * 180;  // 180 KB après optimisation
        
        resolve({
          optimized: true,
          sizeBefore,
          sizeAfter,
          savings: ((sizeBefore - sizeAfter) / sizeBefore) * 100
        });
      }, 1000);
    });
  }
}

// Types pour TypeScript
declare global {
  interface Window {
    sectionObserver: IntersectionObserver;
    imageObserver: IntersectionObserver;
  }
}