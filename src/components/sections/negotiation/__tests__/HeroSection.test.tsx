import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import HeroSection from '../HeroSection';
import { NegotiationTechnique } from '@/types/negotiation-technique';
import { TechniqueTheme } from '@/utils/negotiation/theme-manager';

// Mock des composants UI
vi.mock('@/components/ui/AnimatedSection', () => ({
  default: ({ children, delay, animation }: any) => (
    <div data-testid="animated-section" data-delay={delay} data-animation={animation}>
      {children}
    </div>
  )
}));

vi.mock('@/components/ui/ParticleBackground', () => ({
  default: ({ density, speed, color, opacity, className }: any) => (
    <div 
      data-testid="particle-background" 
      data-density={density}
      data-speed={speed}
      data-color={color}
      data-opacity={opacity}
      className={className}
    />
  )
}));

vi.mock('@/components/ui/Badge', () => ({
  default: ({ children, variant, size, className }: any) => (
    <span data-testid="badge" data-variant={variant} data-size={size} className={className}>
      {children}
    </span>
  )
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, variant, size, onClick, className, icon }: any) => (
    <button 
      data-testid="button" 
      data-variant={variant} 
      data-size={size}
      onClick={onClick}
      className={className}
    >
      {icon && <span data-testid="button-icon">{icon}</span>}
      {children}
    </button>
  )
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
  description: 'Technique d\'empathie tactique pour créer une connexion instantanée avec l\'interlocuteur.',
  psychologyPrinciples: ['Réciprocité conversationnelle'],
  businessApplications: ['Découverte des besoins clients'],
  laurentVision: 'En 20 ans de négociations PME, l\'effet miroir est l\'outil le plus puissant.',
  pmeAdaptation: 'Dans le contexte PME français, l\'effet miroir doit être appliqué avec subtilité.',
  successMetrics: [
    {
      metric: 'Découverte d\'informations cachées',
      value: '78%',
      context: 'Des négociations révèlent de nouveaux éléments'
    },
    {
      metric: 'Amélioration relation client',
      value: '85%',
      context: 'Des clients rapportent une meilleure relation'
    },
    {
      metric: 'Réduction temps négociation',
      value: '32%',
      context: 'Temps moyen de négociation réduit'
    }
  ],
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
  trackingEvents: []
};

const mockTheme: TechniqueTheme = {
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
};

// Mock window.gtag
const mockGtag = vi.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true
});

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render hero section with correct structure', () => {
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    // Vérifier la structure principale
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByLabelledBy('hero-title')).toBeInTheDocument();
    
    // Vérifier le ParticleBackground
    expect(screen.getByTestId('particle-background')).toBeInTheDocument();
    expect(screen.getByTestId('particle-background')).toHaveAttribute('data-color', '#4F46E5');
    expect(screen.getByTestId('particle-background')).toHaveAttribute('data-density', '30');
  });

  it('should display technique information correctly', () => {
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    // Vérifier le titre
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('L\'effet miroir');
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('id', 'hero-title');
    
    // Vérifier la description
    expect(screen.getByText(/Technique d'empathie tactique/)).toBeInTheDocument();
    
    // Vérifier les badges
    const badges = screen.getAllByTestId('badge');
    expect(badges).toHaveLength(2);
    expect(screen.getByText(/Technique Chris Voss/)).toBeInTheDocument();
    expect(screen.getByText('FBI - Négociation d\'otages')).toBeInTheDocument();
  });

  it('should render success metrics when available', () => {
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    // Vérifier que les 3 premières métriques sont affichées
    expect(screen.getByText('78%')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('32%')).toBeInTheDocument();
    
    expect(screen.getByText('Découverte d\'informations cachées')).toBeInTheDocument();
    expect(screen.getByText('Amélioration relation client')).toBeInTheDocument();
    expect(screen.getByText('Réduction temps négociation')).toBeInTheDocument();
  });

  it('should not render success metrics when empty', () => {
    const techniqueWithoutMetrics = { ...mockTechnique, successMetrics: [] };
    render(<HeroSection technique={techniqueWithoutMetrics} theme={mockTheme} />);
    
    // Vérifier qu'aucune métrique n'est affichée
    expect(screen.queryByText('78%')).not.toBeInTheDocument();
  });

  it('should render CTA buttons with correct props', () => {
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(2);
    
    // Vérifier le bouton diagnostic
    const diagnosticButton = screen.getByText('Diagnostic gratuit');
    expect(diagnosticButton).toBeInTheDocument();
    expect(diagnosticButton.closest('[data-testid="button"]')).toHaveAttribute('data-variant', 'primary');
    expect(diagnosticButton.closest('[data-testid="button"]')).toHaveAttribute('data-size', 'lg');
    
    // Vérifier le bouton formation
    const formationButton = screen.getByText(/Formation/);
    expect(formationButton).toBeInTheDocument();
    expect(formationButton.closest('[data-testid="button"]')).toHaveAttribute('data-variant', 'outline');
  });

  it('should adapt formation button text based on category', () => {
    // Test avec catégorie closing
    const closingTechnique = { ...mockTechnique, category: 'closing' as const };
    const { rerender } = render(<HeroSection technique={closingTechnique} theme={mockTheme} />);
    expect(screen.getByText('Formation Closing')).toBeInTheDocument();
    
    // Test avec autre catégorie
    rerender(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    expect(screen.getByText('Formation Négociation')).toBeInTheDocument();
  });

  it('should track CTA clicks with gtag', async () => {
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    // Cliquer sur le bouton diagnostic
    const diagnosticButton = screen.getByText('Diagnostic gratuit');
    fireEvent.click(diagnosticButton);
    
    await waitFor(() => {
      expect(mockGtag).toHaveBeenCalledWith('event', 'cta_click', {
        event_category: 'Negotiation',
        event_label: 'Hero Diagnostic - L\'effet miroir',
        technique_id: 'effet-miroir'
      });
    });
    
    // Cliquer sur le bouton formation
    const formationButton = screen.getByText(/Formation/);
    fireEvent.click(formationButton);
    
    await waitFor(() => {
      expect(mockGtag).toHaveBeenCalledWith('event', 'cta_click', {
        event_category: 'Negotiation',
        event_label: 'Hero Formation - L\'effet miroir',
        technique_id: 'effet-miroir'
      });
    });
  });

  it('should handle missing gtag gracefully', () => {
    // Supprimer gtag temporairement
    delete (window as any).gtag;
    
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    const diagnosticButton = screen.getByText('Diagnostic gratuit');
    
    // Ne devrait pas lever d'erreur
    expect(() => fireEvent.click(diagnosticButton)).not.toThrow();
    
    // Restaurer gtag
    (window as any).gtag = mockGtag;
  });

  it('should apply theme styles correctly', () => {
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    const section = screen.getByRole('main');
    expect(section).toHaveClass('theme-effet-miroir');
    
    // Vérifier que le style inline est appliqué avec le gradient
    expect(section).toHaveStyle({
      background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #8B5CF6 100%)'
    });
  });

  it('should render animated sections with correct delays', () => {
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    const animatedSections = screen.getAllByTestId('animated-section');
    expect(animatedSections.length).toBeGreaterThan(0);
    
    // Vérifier les délais d'animation
    const delays = animatedSections.map(section => section.getAttribute('data-delay'));
    expect(delays).toContain('0');
    expect(delays).toContain('100');
    expect(delays).toContain('200');
  });

  it('should render scroll indicator', () => {
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    expect(screen.getByText('Découvrir la technique')).toBeInTheDocument();
    
    // Vérifier la présence de l'indicateur animé
    const scrollIndicator = screen.getByText('Découvrir la technique').closest('div');
    expect(scrollIndicator).toBeInTheDocument();
  });

  it('should render decorative elements', () => {
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    const section = screen.getByRole('main');
    
    // Vérifier la présence des éléments décoratifs (cercles)
    const decorativeElements = section.querySelectorAll('.absolute.rounded-full');
    expect(decorativeElements.length).toBeGreaterThan(0);
  });

  it('should have proper accessibility attributes', () => {
    render(<HeroSection technique={mockTechnique} theme={mockTheme} />);
    
    // Vérifier les attributs ARIA
    expect(screen.getByRole('main')).toHaveAttribute('aria-labelledby', 'hero-title');
    
    // Vérifier que les éléments décoratifs ont aria-hidden
    const badges = screen.getAllByTestId('badge');
    badges.forEach(badge => {
      const hiddenElements = badge.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenElements.length).toBeGreaterThan(0);
    });
  });

  it('should handle long technique titles gracefully', () => {
    const longTitleTechnique = {
      ...mockTechnique,
      title: 'Une technique de négociation avec un titre extrêmement long qui pourrait poser des problèmes de mise en page'
    };
    
    render(<HeroSection technique={longTitleTechnique} theme={mockTheme} />);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(longTitleTechnique.title);
  });

  it('should render with minimum required props', () => {
    const minimalTechnique = {
      ...mockTechnique,
      successMetrics: []
    };
    
    expect(() => {
      render(<HeroSection technique={minimalTechnique} theme={mockTheme} />);
    }).not.toThrow();
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});