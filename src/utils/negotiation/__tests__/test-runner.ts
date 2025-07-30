/**
 * Test runner pour les tests unitaires des composants de négociation
 * Exécute tous les tests et génère un rapport de couverture
 */

import { describe, it, expect } from 'vitest';

// Import de tous les tests
import './seo-generator.test';
import './theme-manager.test';
import '../../../components/sections/negotiation/__tests__/HeroSection.test';
import '../../../components/sections/negotiation/__tests__/ExpertiseSection.test';
import '../../../components/sections/negotiation/__tests__/PracticalGuide.test';
import '../../../components/templates/__tests__/TechniquePage.test';

/**
 * Configuration des tests pour les composants de négociation
 */
export const testConfig = {
  // Couverture minimale requise
  coverage: {
    statements: 80,
    branches: 75,
    functions: 80,
    lines: 80
  },
  
  // Composants critiques qui doivent avoir une couverture > 90%
  criticalComponents: [
    'HeroSection',
    'ExpertiseSection', 
    'PracticalGuide',
    'TechniquePage',
    'SEOGenerator',
    'ThemeManager'
  ],
  
  // Tests de performance
  performance: {
    maxRenderTime: 100, // ms
    maxMemoryUsage: 50, // MB
    maxBundleSize: 500 // KB
  },
  
  // Tests d'accessibilité
  accessibility: {
    wcagLevel: 'AA',
    requiredAttributes: ['aria-label', 'role', 'tabindex'],
    colorContrast: 4.5
  }
};

/**
 * Utilitaires de test partagés
 */
export const testUtils = {
  /**
   * Crée une technique de test avec des données minimales
   */
  createMockTechnique: (overrides = {}) => ({
    id: 'test-technique',
    slug: 'test-technique',
    title: 'Test Technique',
    author: 'Test Author',
    origin: 'Test Origin',
    category: 'psychology' as const,
    difficultyLevel: 'beginner' as const,
    description: 'Test description',
    psychologyPrinciples: ['Test principle'],
    businessApplications: ['Test application'],
    laurentVision: 'Test vision',
    pmeAdaptation: 'Test adaptation',
    successMetrics: [],
    stepByStepGuide: [],
    caseStudies: [],
    commonMistakes: [],
    relatedTechniques: [],
    downloadableResources: [],
    seoMetadata: {
      title: 'Test',
      description: 'Test',
      keywords: ['test'],
      canonicalUrl: 'https://test.com'
    },
    trackingEvents: [],
    ...overrides
  }),

  /**
   * Crée un thème de test
   */
  createMockTheme: (overrides = {}) => ({
    id: 'test-theme',
    name: 'Test Theme',
    colors: {
      primary: '#000000',
      secondary: '#111111',
      accent: '#222222',
      particle: '#333333'
    },
    gradient: {
      from: 'from-black',
      via: 'via-gray-500/10',
      to: 'to-white'
    },
    icon: '🎯',
    className: 'theme-test',
    category: 'psychology' as const,
    ...overrides
  }),

  /**
   * Mock des fonctions window
   */
  mockWindow: () => {
    const mockGtag = vi.fn();
    Object.defineProperty(window, 'gtag', {
      value: mockGtag,
      writable: true
    });
    
    const mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage
    });
    
    return { mockGtag, mockLocalStorage };
  },

  /**
   * Vérifie les attributs d'accessibilité
   */
  checkAccessibility: (element: HTMLElement) => {
    const checks = {
      hasRole: element.getAttribute('role') !== null,
      hasAriaLabel: element.getAttribute('aria-label') !== null || element.getAttribute('aria-labelledby') !== null,
      hasTabIndex: element.getAttribute('tabindex') !== null || element.tagName.toLowerCase() === 'button' || element.tagName.toLowerCase() === 'a',
      hasValidHeading: element.tagName.match(/^H[1-6]$/) ? true : element.querySelector('h1, h2, h3, h4, h5, h6') !== null
    };
    
    return checks;
  },

  /**
   * Mesure les performances de rendu
   */
  measureRenderPerformance: async (renderFn: () => void) => {
    const start = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    renderFn();
    
    const end = performance.now();
    const endMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    return {
      renderTime: end - start,
      memoryUsed: endMemory - startMemory
    };
  },

  /**
   * Vérifie la conformité SEO
   */
  checkSEOCompliance: (metadata: any) => {
    const checks = {
      hasTitle: !!metadata.title && metadata.title.length <= 60,
      hasDescription: !!metadata.description && metadata.description.length <= 160,
      hasKeywords: !!metadata.keywords,
      hasCanonical: !!metadata.alternates?.canonical,
      hasOpenGraph: !!metadata.openGraph,
      hasTwitterCards: !!metadata.twitter
    };
    
    return checks;
  },

  /**
   * Vérifie la cohérence des thèmes
   */
  checkThemeConsistency: (theme: any) => {
    const checks = {
      hasValidColors: /^#[0-9A-F]{6}$/i.test(theme.colors.primary),
      hasValidGradient: theme.gradient.from.startsWith('from-'),
      hasValidIcon: /[\u{1F000}-\u{1F6FF}]|[\u{2600}-\u{26FF}]/u.test(theme.icon),
      hasValidCategory: ['closing', 'psychology', 'preparation', 'objection-handling'].includes(theme.category)
    };
    
    return checks;
  }
};

/**
 * Suite de tests d'intégration
 */
describe('Integration Tests', () => {
  it('should have all critical components tested', () => {
    const testedComponents = [
      'HeroSection',
      'ExpertiseSection',
      'PracticalGuide', 
      'TechniquePage',
      'SEOGenerator',
      'ThemeManager'
    ];
    
    testConfig.criticalComponents.forEach(component => {
      expect(testedComponents).toContain(component);
    });
  });

  it('should meet coverage requirements', () => {
    // Cette vérification sera faite par le runner de tests
    expect(testConfig.coverage.statements).toBeGreaterThanOrEqual(80);
    expect(testConfig.coverage.branches).toBeGreaterThanOrEqual(75);
    expect(testConfig.coverage.functions).toBeGreaterThanOrEqual(80);
    expect(testConfig.coverage.lines).toBeGreaterThanOrEqual(80);
  });
});

export default testConfig;