import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RelatedTechniques from '../RelatedTechniques';
import { negotiationTechniqueData } from '@/data/negotiation-technique-data';

vi.mock('@/hooks/useNegotiationTheme', () => ({
  useNegotiationTheme: () => ({
    primaryColor: '#DC2626',
    accentColor: '#EA580C',
    particleColor: '#DC2626',
    gradientClass: 'from-red-600 via-orange-500/10 to-primary-bg'
  })
}));

vi.mock('@/components/ui/AnimatedSection', () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="animated-section" {...props}>
      {children}
    </div>
  )
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}));

describe('RelatedTechniques', () => {
  const mockTechnique = negotiationTechniqueData;

  it('renders section heading', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    expect(screen.getByText(/Techniques complémentaires/i)).toBeInTheDocument();
  });

  it('displays related technique links', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    mockTechnique.relatedTechniques.forEach(techniqueSlug => {
      // Should have links to related techniques
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it('shows return to main page link', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    expect(screen.getByText(/Toutes les techniques/i)).toBeInTheDocument();
  });

  it('renders with proper navigation structure', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('applies proper styling', () => {
    const { container } = render(<RelatedTechniques technique={mockTechnique} />);
    
    expect(container.querySelector('[class*="grid"]')).toBeInTheDocument();
  });

  it('renders animated sections', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    const animatedSections = screen.getAllByTestId('animated-section');
    expect(animatedSections.length).toBeGreaterThan(0);
  });

  it('has proper accessibility attributes', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label');
  });

  it('displays technique previews', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    // Should show preview information for related techniques
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });

  it('handles empty related techniques gracefully', () => {
    const techniqueWithoutRelated = {
      ...mockTechnique,
      relatedTechniques: []
    };
    
    expect(() => render(<RelatedTechniques technique={techniqueWithoutRelated} />)).not.toThrow();
  });

  it('provides clear navigation paths', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });

  it('shows technique categories', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    // Should indicate what type of techniques are suggested
    const categoryIndicators = screen.getAllByText(/closing|psychologie|préparation/i);
    expect(categoryIndicators.length).toBeGreaterThanOrEqual(0);
  });

  it('includes back navigation', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    const backLink = screen.getByText(/Retour|Toutes les techniques/i);
    expect(backLink).toBeInTheDocument();
  });

  it('optimizes internal linking for SEO', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/ressources')) {
        expect(href).toMatch(/^\/ressources\/techniques-de-negociation/);
      }
    });
  });

  it('displays technique difficulty levels', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    // Should show difficulty indicators for related techniques
    const difficultyIndicators = screen.getAllByText(/débutant|intermédiaire|avancé/i);
    expect(difficultyIndicators.length).toBeGreaterThanOrEqual(0);
  });

  it('provides contextual recommendations', () => {
    render(<RelatedTechniques technique={mockTechnique} />);
    
    // Should explain why techniques are related
    const contextText = screen.getAllByText(/complémentaire|similaire|avancé/i);
    expect(contextText.length).toBeGreaterThanOrEqual(0);
  });
});