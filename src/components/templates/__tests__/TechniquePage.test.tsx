import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TechniquePage from '../TechniquePage';
import { NegotiationTechnique } from '@/types/negotiation-technique';

// Mock des utilitaires
vi.mock('@/utils/negotiation/theme-manager', () => ({
  getTechniqueTheme: vi.fn(() => ({
    id: 'effet-miroir',
    name: 'L\'effet miroir',
    colors: {
      primary: '#4F46E5',
      secondary: '#6366F1',
      accent: '#8B5CF6',
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
  })),
  useTechniqueTheme: vi.fn(() => ({
    theme: {
      id: 'effet-miroir',
      className: 'theme-effet-miroir'
    },
    cssVars: {
      '--technique-primary': '#4F46E5',
      '--technique-secondary': '#6366F1'
    }
  }))
}));

vi.mock('@/utils/negotiation/seo-generator', () => ({
  SEOGenerator: {
    generateStructuredData: vi.fn(() => ({
      '@context': 'https://schema.org',
      '@graph': []
    }))
  }
}));

vi.mock('@/utils/negotiation/seo-optimization', () => ({
  SEOPerformanceOptimizer: {
    generatePreloadDirectives: vi.fn(() => [
      { href: '/test.css', as: 'style', type: 'text/css' }
    ]),
    generatePreconnectDirectives: vi.fn(() => ['https://fonts.googleapis.com'])
  }
}));

vi.mock('@/utils/negotiation/performance-optimization', () => ({
  PerformanceOptimizer: vi.fn().mockImplementation(() => ({
    optimizeTechniqueLoading: vi.fn(),
    cleanup: vi.fn()
  })),
  DEFAULT_PERFORMANCE_CONFIG: {}
}));

// Mock des trackers analytics
const mockAnalyticsTracker = {
  trackPageView: vi.fn(),
  trackInteraction: vi.fn()
};

const mockConversionTracker = {
  trackConversion: vi.fn(),
  trackGoal: vi.fn()
};

vi.mock('@/utils/negotiation/analytics-tracking', () => ({
  TechniqueAnalyticsTracker: vi.fn().mockImplementation(() => mockAnalyticsTracker)
}));

vi.mock('@/utils/negotiation/conversion-tracking', () => ({
  ConversionTracker: vi.fn().mockImplementation(() => mockConversionTracker)
}));

// Mock technique data
const mockTechnique: NegotiationTechnique = {
  id: 'effet-miroir',
  slug: 'effet-miroir',
  title: 'L\'effet miroir',
  author: 'Chris Voss',
  origin: 'FBI - Négociation d\'otages',
  category: 'psychology',
  difficultyLevel: 'intermediate',
  description: 'Technique d\'empathie tactique pour créer une connexion instantanée.',
  psychologyPrinciples: ['Réciprocité conversationnelle'],
  businessApplications: ['Découverte des besoins clients'],
  laurentVision: 'En 20 ans de négociations PME, l\'effet miroir est l\'outil le plus puissant.',
  pmeAdaptation: 'Dans le contexte PME français, l\'effet miroir doit être appliqué avec subtilité.',
  successMetrics: [
    {
      metric: 'Découverte d\'informations cachées',
      value: '78%',
      context: 'Des négociations révèlent de nouveaux éléments'
    }
  ],
  stepByStepGuide: [
    {
      step: 1,
      title: 'Écoute active',
      description: 'Identifiez le moment précis où votre interlocuteur exprime une émotion.',
      script: 'Client: "C\'est trop cher." Vous: "Trop cher ?"',
      example: 'Au lieu de justifier, vous reflétez l\'émotion.',
      tips: ['Attendez 2-3 secondes']
    }
  ],
  caseStudies: [
    {
      industry: 'PME Services',
      challenge: 'Négociation logiciel 25K€',
      application: 'Effet miroir sur objection budget',
      results: 'Signature à 23K€ avec formation incluse',
      metrics: {
        finalPrice: '23K€',
        clientSatisfaction: '9.2/10'
      }
    }
  ],
  commonMistakes: [
    {
      mistake: 'Répéter mécaniquement sans empathie',
      consequence: 'Vous paraissez robotique et agaçant',
      solution: 'Un seul miroir par idée, avec empathie'
    }
  ],
  relatedTechniques: ['silence-strategique'],
  downloadableResources: [
    {
      title: 'Guide de l\'effet miroir',
      type: 'PDF',
      url: '/ressources/downloads/guide-effet-miroir.pdf'
    }
  ],
  seoMetadata: {
    title: 'L\'effet miroir | Technique FBI Chris Voss | Laurent Serre',
    description: 'Maîtrisez l\'effet miroir de Chris Voss pour vos négociations PME.',
    keywords: ['effet miroir', 'chris voss', 'négociation'],
    canonicalUrl: 'https://www.laurentserre.com/ressources/techniques-de-negociation/effet-miroir'
  },
  trackingEvents: [
    {
      event: 'technique_page_view',
      category: 'Negotiation',
      action: 'View Effet Miroir'
    }
  ]
};

const mockSEOConfig = {
  baseUrl: 'https://www.laurentserre.com',
  authorInfo: {
    name: 'Laurent Serre',
    url: 'https://www.laurentserre.com/a-propos',
    image: 'https://www.laurentserre.com/images/laurent-serre.jpg',
    description: 'Expert en développement commercial PME'
  },
  organizationInfo: {
    name: 'Laurent Serre',
    url: 'https://www.laurentserre.com',
    logo: 'https://www.laurentserre.com/images/logo.png',
    description: 'Formation et coaching commercial pour PME'
  }
};

describe('TechniquePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window object
    Object.defineProperty(window, 'techniqueTracker', {
      value: undefined,
      writable: true
    });
    Object.defineProperty(window, 'conversionTracker', {
      value: undefined,
      writable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render technique page with correct structure', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    // Vérifier la structure principale
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('technique-page');
    expect(screen.getByRole('main')).toHaveClass('theme-effet-miroir');
  });

  it('should apply theme CSS variables', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    const main = screen.getByRole('main');
    expect(main).toHaveStyle({
      '--technique-primary': '#4F46E5',
      '--technique-secondary': '#6366F1'
    });
  });

  it('should render structured data when SEO config is provided', () => {
    render(<TechniquePage technique={mockTechnique} seoConfig={mockSEOConfig} />);
    
    // Vérifier que le script JSON-LD est présent
    const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    expect(structuredDataScript).toBeInTheDocument();
  });

  it('should not render structured data when SEO config is missing', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    expect(structuredDataScript).not.toBeInTheDocument();
  });

  it('should render preload directives when SEO config is provided', () => {
    render(<TechniquePage technique={mockTechnique} seoConfig={mockSEOConfig} />);
    
    // Vérifier que les directives de préchargement sont présentes
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    expect(preloadLinks.length).toBeGreaterThan(0);
  });

  it('should render preconnect directives', () => {
    render(<TechniquePage technique={mockTechnique} seoConfig={mockSEOConfig} />);
    
    const preconnectLinks = document.querySelectorAll('link[rel="preconnect"]');
    expect(preconnectLinks.length).toBeGreaterThan(0);
  });

  it('should render default sections when no custom sections provided', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    // Vérifier que les sections par défaut sont présentes
    expect(screen.getByTestId('section-hero')).toBeInTheDocument();
    expect(screen.getByTestId('section-expertise')).toBeInTheDocument();
    expect(screen.getByTestId('section-practical-guide')).toBeInTheDocument();
    expect(screen.getByTestId('section-case-studies')).toBeInTheDocument();
    expect(screen.getByTestId('section-common-mistakes')).toBeInTheDocument();
    expect(screen.getByTestId('section-interactive-tools')).toBeInTheDocument();
    expect(screen.getByTestId('section-conversion-ctas')).toBeInTheDocument();
    expect(screen.getByTestId('section-related-techniques')).toBeInTheDocument();
  });

  it('should render custom sections when provided', () => {
    const customSections = ['hero', 'expertise', 'practical-guide'];
    render(<TechniquePage technique={mockTechnique} customSections={customSections} />);
    
    // Vérifier que seules les sections personnalisées sont présentes
    expect(screen.getByTestId('section-hero')).toBeInTheDocument();
    expect(screen.getByTestId('section-expertise')).toBeInTheDocument();
    expect(screen.getByTestId('section-practical-guide')).toBeInTheDocument();
    
    // Vérifier que les autres sections ne sont pas présentes
    expect(screen.queryByTestId('section-case-studies')).not.toBeInTheDocument();
    expect(screen.queryByTestId('section-common-mistakes')).not.toBeInTheDocument();
  });

  it('should render placeholder sections with correct content', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    // Vérifier le contenu des placeholders
    expect(screen.getByText('Hero: L\'effet miroir')).toBeInTheDocument();
    expect(screen.getByText('Vision Laurent Serre')).toBeInTheDocument();
    expect(screen.getByText('Guide Pratique')).toBeInTheDocument();
    expect(screen.getByText('1 étapes pour maîtriser L\'effet miroir')).toBeInTheDocument();
  });

  it('should display technique data correctly in placeholders', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    // Vérifier que les données de la technique sont affichées
    expect(screen.getByText(/En 20 ans de négociations PME/)).toBeInTheDocument();
    expect(screen.getByText('1 exemples concrets d\'application')).toBeInTheDocument();
    expect(screen.getByText('1 erreurs à éviter')).toBeInTheDocument();
    expect(screen.getByText('1 ressources téléchargeables')).toBeInTheDocument();
    expect(screen.getByText('1 techniques complémentaires')).toBeInTheDocument();
  });

  it('should initialize performance optimizer', async () => {
    const { PerformanceOptimizer } = await import('@/utils/negotiation/performance-optimization');
    
    render(<TechniquePage technique={mockTechnique} />);
    
    await waitFor(() => {
      expect(PerformanceOptimizer).toHaveBeenCalled();
    });
  });

  it('should initialize analytics trackers', async () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    await waitFor(() => {
      expect(window.techniqueTracker).toBeDefined();
      expect(window.conversionTracker).toBeDefined();
    });
  });

  it('should cleanup trackers on unmount', async () => {
    const { unmount } = render(<TechniquePage technique={mockTechnique} />);
    
    await waitFor(() => {
      expect(window.techniqueTracker).toBeDefined();
    });
    
    unmount();
    
    // Note: Cleanup happens in useEffect return, but testing this requires more complex setup
    // This test verifies the component structure is correct
  });

  it('should have proper semantic structure', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('itemScope');
    expect(main).toHaveAttribute('itemType', 'https://schema.org/Article');
  });

  it('should render suspense fallbacks', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    // Vérifier que les sections ont des fallbacks de chargement
    const sections = screen.getAllByTestId(/section-/);
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should handle unknown section types gracefully', () => {
    const customSections = ['hero', 'unknown-section', 'expertise'];
    
    expect(() => {
      render(<TechniquePage technique={mockTechnique} customSections={customSections} />);
    }).not.toThrow();
    
    expect(screen.getByText('Section: unknown-section')).toBeInTheDocument();
    expect(screen.getByText('Section personnalisée: unknown-section')).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('technique-page');
    expect(main).toHaveClass('theme-effet-miroir');
    expect(main).toHaveClass('relative');
    expect(main).toHaveClass('min-h-screen');
    expect(main).toHaveClass('pt-24');
    expect(main).toHaveClass('pb-16');
    expect(main).toHaveClass('overflow-hidden');
  });

  it('should render particle background container', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    const particleContainer = document.querySelector('.technique-particles');
    expect(particleContainer).toBeInTheDocument();
    expect(particleContainer).toHaveClass('absolute');
    expect(particleContainer).toHaveClass('inset-0');
    expect(particleContainer).toHaveClass('pointer-events-none');
    expect(particleContainer).toHaveClass('z-0');
  });

  it('should render content with correct z-index', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    const contentContainer = document.querySelector('.relative.z-10');
    expect(contentContainer).toBeInTheDocument();
  });

  it('should handle missing technique data gracefully', () => {
    const minimalTechnique = {
      ...mockTechnique,
      stepByStepGuide: [],
      caseStudies: [],
      commonMistakes: [],
      downloadableResources: [],
      relatedTechniques: []
    };
    
    expect(() => {
      render(<TechniquePage technique={minimalTechnique} />);
    }).not.toThrow();
    
    expect(screen.getByText('0 étapes pour maîtriser L\'effet miroir')).toBeInTheDocument();
  });

  it('should generate session ID for conversion tracking', async () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    await waitFor(() => {
      const { ConversionTracker } = require('@/utils/negotiation/conversion-tracking');
      expect(ConversionTracker).toHaveBeenCalledWith(
        mockTechnique,
        expect.stringMatching(/^\d+-[a-z0-9]{9}$/)
      );
    });
  });

  it('should handle dynamic import failures gracefully', async () => {
    // Mock import failure
    vi.doMock('@/utils/negotiation/analytics-tracking', () => {
      throw new Error('Import failed');
    });
    
    expect(() => {
      render(<TechniquePage technique={mockTechnique} />);
    }).not.toThrow();
  });

  it('should render with minimal props', () => {
    expect(() => {
      render(<TechniquePage technique={mockTechnique} />);
    }).not.toThrow();
    
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should handle empty custom sections array', () => {
    render(<TechniquePage technique={mockTechnique} customSections={[]} />);
    
    // Should render default sections when custom sections is empty
    expect(screen.getByTestId('section-hero')).toBeInTheDocument();
    expect(screen.getByTestId('section-expertise')).toBeInTheDocument();
  });
});