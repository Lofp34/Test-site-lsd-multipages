import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroSection from '../HeroSection';
import { negotiationTechniqueData } from '@/data/negotiation-technique-data';

vi.mock('@/hooks/useNegotiationTheme', () => ({
  useNegotiationTheme: () => ({
    primaryColor: '#DC2626',
    accentColor: '#EA580C',
    particleColor: '#DC2626',
    gradientClass: 'from-red-600 via-orange-500/10 to-primary-bg'
  })
}));

vi.mock('@/components/ui/ParticleBackground', () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="particle-background" {...props}>
      {children}
    </div>
  )
}));

vi.mock('@/components/ui/AnimatedSection', () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="animated-section" {...props}>
      {children}
    </div>
  )
}));

describe('HeroSection', () => {
  const mockTechnique = negotiationTechniqueData;

  it('renders technique title correctly', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    expect(screen.getByText('Ne jamais couper la poire en deux')).toBeInTheDocument();
  });

  it('displays FBI badge', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    expect(screen.getByText(/Technique FBI/i)).toBeInTheDocument();
  });

  it('shows technique description', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    expect(screen.getByText(mockTechnique.description)).toBeInTheDocument();
  });

  it('displays success metrics', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    mockTechnique.successMetrics.forEach(metric => {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
    });
  });

  it('includes author information', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    expect(screen.getByText(/Chris Voss/i)).toBeInTheDocument();
  });

  it('renders with proper heading hierarchy', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Ne jamais couper la poire en deux');
  });

  it('applies negotiation theme styling', () => {
    const { container } = render(<HeroSection technique={mockTechnique} />);
    
    expect(container.querySelector('[class*="from-red-600"]')).toBeInTheDocument();
  });

  it('includes particle background', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    expect(screen.getByTestId('particle-background')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    const section = screen.getByRole('banner');
    expect(section).toBeInTheDocument();
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveAttribute('id');
  });

  it('displays difficulty level', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    expect(screen.getByText(/Intermédiaire/i)).toBeInTheDocument();
  });

  it('shows key benefit prominently', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    const keyBenefit = screen.getByText(/Préservez vos marges/i);
    expect(keyBenefit).toBeInTheDocument();
  });

  it('renders animated sections', () => {
    render(<HeroSection technique={mockTechnique} />);
    
    const animatedSections = screen.getAllByTestId('animated-section');
    expect(animatedSections.length).toBeGreaterThan(0);
  });

  it('handles missing data gracefully', () => {
    const incompleteData = {
      ...mockTechnique,
      successMetrics: []
    };
    
    expect(() => render(<HeroSection technique={incompleteData} />)).not.toThrow();
  });
});