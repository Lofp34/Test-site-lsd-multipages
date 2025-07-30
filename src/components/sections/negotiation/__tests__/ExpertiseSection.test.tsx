import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExpertiseSection from '../ExpertiseSection';
import { NegotiationTechnique } from '@/types/negotiation-technique';

// Mock des composants UI
vi.mock('@/components/ui/AnimatedSection', () => ({
  default: ({ children, delay, animation }: any) => (
    <div data-testid="animated-section" data-delay={delay} data-animation={animation}>
      {children}
    </div>
  )
}));

vi.mock('@/components/ui/Badge', () => ({
  default: ({ children, variant, size, className }: any) => (
    <span data-testid="badge" data-variant={variant} data-size={size} className={className}>
      {children}
    </span>
  )
}));

// Mock technique data complète
const mockTechnique: NegotiationTechnique = {
  id: 'effet-miroir',
  slug: 'effet-miroir',
  title: 'L\'effet miroir',
  author: 'Chris Voss',
  origin: 'FBI - Négociation d\'otages',
  category: 'psychology',
  difficultyLevel: 'intermediate',
  description: 'Technique d\'empathie tactique pour créer une connexion instantanée.',
  psychologyPrinciples: [
    'Réciprocité conversationnelle - Quand vous reflétez les mots de votre interlocuteur, il se sent écouté',
    'Activation du système de récompense - Le cerveau libère de la dopamine quand on se sent compris',
    'Réduction de la résistance cognitive - L\'effet miroir diminue les défenses naturelles'
  ],
  businessApplications: ['Découverte des besoins clients', 'Gestion des objections'],
  laurentVision: 'En 20 ans de négociations PME, l\'effet miroir est l\'outil le plus puissant que j\'ai découvert. Il transforme instantanément la dynamique d\'une négociation en créant une connexion authentique.',
  pmeAdaptation: 'Dans le contexte PME français, l\'effet miroir doit être appliqué avec subtilité. Les dirigeants français apprécient la finesse et détestent se sentir manipulés. Il faut doser avec intelligence.',
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
  testimonials: [
    {
      name: 'Marie Dubois',
      company: 'TechStart PME',
      role: 'Directrice Commerciale',
      quote: 'L\'effet miroir a révolutionné mes négociations. Mes clients se sentent vraiment écoutés maintenant.',
      result: '+45% de taux de closing',
      avatar: 'MD'
    },
    {
      name: 'Pierre Martin',
      company: 'Solutions Industrielles',
      role: 'CEO',
      quote: 'Technique redoutable pour découvrir les vrais enjeux cachés de mes prospects.',
      result: 'Cycle de vente réduit de 30%',
      avatar: 'PM'
    }
  ],
  credibilityBadges: [
    {
      title: '20 ans d\'expérience',
      description: 'Plus de 2000 négociations PME réussies',
      icon: '🏆',
      color: '#F59E0B'
    },
    {
      title: 'Méthode éprouvée',
      description: 'Testée sur 500+ entreprises françaises',
      icon: '✅',
      color: '#10B981'
    },
    {
      title: 'Résultats mesurés',
      description: 'ROI moyen de 340% sur les formations',
      icon: '📊',
      color: '#3B82F6'
    }
  ],
  businessApplications: [
    'Découverte approfondie des besoins clients',
    'Gestion des objections prix et délais',
    'Négociation de contrats complexes',
    'Résolution de conflits commerciaux'
  ]
};

describe('ExpertiseSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render expertise section with correct structure', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    // Vérifier la structure principale
    expect(screen.getByRole('region')).toBeInTheDocument();
    
    // Vérifier l'en-tête de section
    expect(screen.getByText('Expertise Laurent Serre')).toBeInTheDocument();
    expect(screen.getByText('Vision Expert & Adaptation PME')).toBeInTheDocument();
  });

  it('should display Laurent vision correctly', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    // Vérifier la présence de la vision Laurent Serre
    expect(screen.getByText('Vision Laurent Serre')).toBeInTheDocument();
    expect(screen.getByText(/En 20 ans de négociations PME/)).toBeInTheDocument();
    
    // Vérifier les informations d'expertise
    expect(screen.getByText('Expert développement commercial PME • 20 ans d\'expérience')).toBeInTheDocument();
    
    // Vérifier le badge "Approche PME"
    expect(screen.getByText('Approche PME')).toBeInTheDocument();
  });

  it('should display PME adaptation section', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    expect(screen.getByText('Adaptation PME Française')).toBeInTheDocument();
    expect(screen.getByText(/Dans le contexte PME français/)).toBeInTheDocument();
    
    // Vérifier les badges PME
    expect(screen.getByText('PME 10-100 salariés')).toBeInTheDocument();
    expect(screen.getByText('Contexte français')).toBeInTheDocument();
    expect(screen.getByText('Approche relationnelle')).toBeInTheDocument();
  });

  it('should render psychology principles correctly', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    expect(screen.getByText('Principes Psychologiques')).toBeInTheDocument();
    expect(screen.getByText(/Les mécanismes scientifiques derrière/)).toBeInTheDocument();
    
    // Vérifier que les 3 principes sont affichés
    expect(screen.getByText(/Réciprocité conversationnelle/)).toBeInTheDocument();
    expect(screen.getByText(/Activation du système de récompense/)).toBeInTheDocument();
    expect(screen.getByText(/Réduction de la résistance cognitive/)).toBeInTheDocument();
    
    // Vérifier la numérotation
    const numberedElements = screen.getAllByText(/^[1-3]$/);
    expect(numberedElements).toHaveLength(3);
  });

  it('should display testimonials when available', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    expect(screen.getByText('Retours d\'expérience clients')).toBeInTheDocument();
    
    // Vérifier les témoignages (limités à 2)
    expect(screen.getByText('Marie Dubois')).toBeInTheDocument();
    expect(screen.getByText('Pierre Martin')).toBeInTheDocument();
    expect(screen.getByText('TechStart PME')).toBeInTheDocument();
    expect(screen.getByText('Solutions Industrielles')).toBeInTheDocument();
    
    // Vérifier les résultats
    expect(screen.getByText('Résultat: +45% de taux de closing')).toBeInTheDocument();
    expect(screen.getByText('Résultat: Cycle de vente réduit de 30%')).toBeInTheDocument();
    
    // Vérifier les avatars
    expect(screen.getByText('MD')).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('should not render testimonials section when empty', () => {
    const techniqueWithoutTestimonials = { ...mockTechnique, testimonials: undefined };
    render(<ExpertiseSection technique={techniqueWithoutTestimonials} />);
    
    expect(screen.queryByText('Retours d\'expérience clients')).not.toBeInTheDocument();
  });

  it('should display credibility badges when available', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    // Vérifier les 3 badges de crédibilité
    expect(screen.getByText('20 ans d\'expérience')).toBeInTheDocument();
    expect(screen.getByText('Méthode éprouvée')).toBeInTheDocument();
    expect(screen.getByText('Résultats mesurés')).toBeInTheDocument();
    
    // Vérifier les descriptions
    expect(screen.getByText('Plus de 2000 négociations PME réussies')).toBeInTheDocument();
    expect(screen.getByText('Testée sur 500+ entreprises françaises')).toBeInTheDocument();
    expect(screen.getByText('ROI moyen de 340% sur les formations')).toBeInTheDocument();
    
    // Vérifier les icônes
    expect(screen.getByText('🏆')).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();
    expect(screen.getByText('📊')).toBeInTheDocument();
  });

  it('should not render credibility badges when empty', () => {
    const techniqueWithoutBadges = { ...mockTechnique, credibilityBadges: undefined };
    render(<ExpertiseSection technique={techniqueWithoutBadges} />);
    
    expect(screen.queryByText('20 ans d\'expérience')).not.toBeInTheDocument();
  });

  it('should display business applications when available', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    expect(screen.getByText('Applications Business Concrètes')).toBeInTheDocument();
    
    // Vérifier les applications
    expect(screen.getByText('Découverte approfondie des besoins clients')).toBeInTheDocument();
    expect(screen.getByText('Gestion des objections prix et délais')).toBeInTheDocument();
    expect(screen.getByText('Négociation de contrats complexes')).toBeInTheDocument();
    expect(screen.getByText('Résolution de conflits commerciaux')).toBeInTheDocument();
    
    // Vérifier les coches de validation
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks).toHaveLength(4);
  });

  it('should not render business applications when empty', () => {
    const techniqueWithoutApplications = { ...mockTechnique, businessApplications: [] };
    render(<ExpertiseSection technique={techniqueWithoutApplications} />);
    
    expect(screen.queryByText('Applications Business Concrètes')).not.toBeInTheDocument();
  });

  it('should render animated sections with correct delays', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    const animatedSections = screen.getAllByTestId('animated-section');
    expect(animatedSections.length).toBeGreaterThan(0);
    
    // Vérifier les délais d'animation
    const delays = animatedSections.map(section => section.getAttribute('data-delay'));
    expect(delays).toContain('0');
    expect(delays).toContain('100');
    expect(delays).toContain('200');
  });

  it('should handle missing optional fields gracefully', () => {
    const minimalTechnique = {
      id: 'test',
      slug: 'test',
      title: 'Test Technique',
      author: 'Test Author',
      origin: 'Test Origin',
      category: 'psychology' as const,
      difficultyLevel: 'beginner' as const,
      description: 'Test description',
      psychologyPrinciples: ['Test principle'],
      businessApplications: [],
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
      trackingEvents: []
    };
    
    expect(() => {
      render(<ExpertiseSection technique={minimalTechnique} />);
    }).not.toThrow();
    
    expect(screen.getByText('Test Technique')).toBeInTheDocument();
  });

  it('should limit testimonials to 2 items', () => {
    const techniqueWithManyTestimonials = {
      ...mockTechnique,
      testimonials: [
        ...mockTechnique.testimonials!,
        {
          name: 'Jean Dupont',
          company: 'Autre PME',
          role: 'Directeur',
          quote: 'Excellent',
          result: 'Super résultat',
          avatar: 'JD'
        }
      ]
    };
    
    render(<ExpertiseSection technique={techniqueWithManyTestimonials} />);
    
    // Vérifier que seuls 2 témoignages sont affichés
    expect(screen.getByText('Marie Dubois')).toBeInTheDocument();
    expect(screen.getByText('Pierre Martin')).toBeInTheDocument();
    expect(screen.queryByText('Jean Dupont')).not.toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    // Vérifier la structure sémantique
    expect(screen.getByRole('region')).toBeInTheDocument();
    
    // Vérifier les headings
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    
    // Vérifier les blockquotes pour les témoignages
    const quotes = screen.getAllByRole('blockquote');
    expect(quotes.length).toBeGreaterThan(0);
  });

  it('should apply correct CSS classes for styling', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass('py-16');
    
    // Vérifier les classes de gradient
    const gradientElements = section.querySelectorAll('.bg-gradient-to-r, .bg-gradient-to-br');
    expect(gradientElements.length).toBeGreaterThan(0);
  });
});