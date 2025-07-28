import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TechniquePage from '../TechniquePage';
import { negotiationTechniqueData } from '@/data/negotiation-technique-data';

// Mock all section components
vi.mock('@/components/sections/HeroSection', () => ({
  default: ({ technique }: any) => (
    <div data-testid="hero-section">Hero: {technique.title}</div>
  )
}));

vi.mock('@/components/sections/ExpertiseSection', () => ({
  default: ({ technique }: any) => (
    <div data-testid="expertise-section">Expertise: {technique.author}</div>
  )
}));

vi.mock('@/components/sections/PracticalGuide', () => ({
  default: ({ technique }: any) => (
    <div data-testid="practical-guide">Guide: {technique.stepByStepGuide.length} steps</div>
  )
}));

vi.mock('@/components/sections/CaseStudies', () => ({
  default: ({ technique }: any) => (
    <div data-testid="case-studies">Cases: {technique.caseStudies.length}</div>
  )
}));

vi.mock('@/components/sections/CommonMistakes', () => ({
  default: ({ technique }: any) => (
    <div data-testid="common-mistakes">Mistakes: {technique.commonMistakes.length}</div>
  )
}));

vi.mock('@/components/sections/InteractiveTools', () => ({
  default: ({ technique }: any) => (
    <div data-testid="interactive-tools">Tools: {technique.downloadableResources.length}</div>
  )
}));

vi.mock('@/components/sections/ConversionCTAs', () => ({
  default: ({ technique }: any) => (
    <div data-testid="conversion-ctas">CTAs for: {technique.id}</div>
  )
}));

vi.mock('@/components/sections/RelatedTechniques', () => ({
  default: ({ technique }: any) => (
    <div data-testid="related-techniques">Related: {technique.relatedTechniques.length}</div>
  )
}));

vi.mock('@/components/ui/CategoryBreadcrumb', () => ({
  default: ({ items }: any) => (
    <nav data-testid="breadcrumb">
      {items.map((item: any, index: number) => (
        <span key={index}>{item.label}</span>
      ))}
    </nav>
  )
}));

vi.mock('@/components/ui/ParticleBackground', () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="particle-background" {...props}>
      {children}
    </div>
  )
}));

vi.mock('@/hooks/useNegotiationTheme', () => ({
  useNegotiationTheme: () => ({
    primaryColor: '#DC2626',
    accentColor: '#EA580C',
    particleColor: '#DC2626',
    gradientClass: 'from-red-600 via-orange-500/10 to-primary-bg'
  })
}));

describe('TechniquePage', () => {
  const mockTechnique = negotiationTechniqueData;

  it('renders all main sections', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('expertise-section')).toBeInTheDocument();
    expect(screen.getByTestId('practical-guide')).toBeInTheDocument();
    expect(screen.getByTestId('case-studies')).toBeInTheDocument();
    expect(screen.getByTestId('common-mistakes')).toBeInTheDocument();
    expect(screen.getByTestId('interactive-tools')).toBeInTheDocument();
    expect(screen.getByTestId('conversion-ctas')).toBeInTheDocument();
    expect(screen.getByTestId('related-techniques')).toBeInTheDocument();
  });

  it('renders breadcrumb navigation', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Ressources')).toBeInTheDocument();
    expect(screen.getByText('Techniques de Négociation')).toBeInTheDocument();
  });

  it('includes particle background', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    expect(screen.getByTestId('particle-background')).toBeInTheDocument();
  });

  it('passes technique data to all sections', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    expect(screen.getByText(`Hero: ${mockTechnique.title}`)).toBeInTheDocument();
    expect(screen.getByText(`Expertise: ${mockTechnique.author}`)).toBeInTheDocument();
    expect(screen.getByText(`Guide: ${mockTechnique.stepByStepGuide.length} steps`)).toBeInTheDocument();
    expect(screen.getByText(`Cases: ${mockTechnique.caseStudies.length}`)).toBeInTheDocument();
  });

  it('applies proper page structure', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('applies negotiation theme styling', () => {
    const { container } = render(<TechniquePage technique={mockTechnique} />);
    
    expect(container.querySelector('[class*="from-red-600"]')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    const main = screen.getByRole('main');
    const nav = screen.getByRole('navigation');
    
    expect(main).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });

  it('renders sections in correct order', () => {
    const { container } = render(<TechniquePage technique={mockTechnique} />);
    
    const sections = container.querySelectorAll('[data-testid*="section"], [data-testid*="guide"], [data-testid*="cases"], [data-testid*="mistakes"], [data-testid*="tools"], [data-testid*="ctas"], [data-testid*="related"]');
    
    expect(sections[0]).toHaveAttribute('data-testid', 'hero-section');
    expect(sections[1]).toHaveAttribute('data-testid', 'expertise-section');
    expect(sections[2]).toHaveAttribute('data-testid', 'practical-guide');
  });

  it('handles missing technique data gracefully', () => {
    const incompleteTechnique = {
      ...mockTechnique,
      stepByStepGuide: [],
      caseStudies: [],
      commonMistakes: []
    };
    
    expect(() => render(<TechniquePage technique={incompleteTechnique} />)).not.toThrow();
  });

  it('applies responsive design classes', () => {
    const { container } = render(<TechniquePage technique={mockTechnique} />);
    
    expect(container.querySelector('[class*="min-h-screen"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="pt-24"]')).toBeInTheDocument();
  });

  it('includes proper meta information', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    // Should include technique title and description somewhere
    expect(screen.getByText(mockTechnique.title)).toBeInTheDocument();
  });

  it('provides proper navigation context', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toContainHTML('Techniques de Négociation');
  });

  it('applies overflow handling', () => {
    const { container } = render(<TechniquePage technique={mockTechnique} />);
    
    expect(container.querySelector('[class*="overflow-hidden"]')).toBeInTheDocument();
  });

  it('includes background gradient', () => {
    const { container } = render(<TechniquePage technique={mockTechnique} />);
    
    expect(container.querySelector('[class*="bg-gradient"]')).toBeInTheDocument();
  });

  it('renders without errors', () => {
    expect(() => render(<TechniquePage technique={mockTechnique} />)).not.toThrow();
  });

  it('has proper accessibility landmarks', () => {
    render(<TechniquePage technique={mockTechnique} />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});