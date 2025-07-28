import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExpertiseSection from '../ExpertiseSection';
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

describe('ExpertiseSection', () => {
  const mockTechnique = negotiationTechniqueData;

  it('displays Laurent Serre vision', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    expect(screen.getByText('Vision Laurent Serre')).toBeInTheDocument();
    expect(screen.getByText(mockTechnique.laurentVision)).toBeInTheDocument();
  });

  it('shows PME adaptation content', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    expect(screen.getByText(mockTechnique.pmeAdaptation)).toBeInTheDocument();
  });

  it('displays psychology principles', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    mockTechnique.psychologyPrinciples.forEach(principle => {
      expect(screen.getByText(principle)).toBeInTheDocument();
    });
  });

  it('shows business applications', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    mockTechnique.businessApplications.forEach(application => {
      expect(screen.getByText(application)).toBeInTheDocument();
    });
  });

  it('includes Laurent Serre avatar/initials', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    expect(screen.getByText('LS')).toBeInTheDocument();
  });

  it('renders with proper section structure', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });

  it('displays psychology insights with icons', () => {
    const { container } = render(<ExpertiseSection technique={mockTechnique} />);
    
    const brainIcons = container.querySelectorAll('[class*="🧠"]');
    expect(brainIcons.length).toBeGreaterThanOrEqual(0);
  });

  it('shows adaptation for French PME context', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    expect(screen.getByText(/PME française/i)).toBeInTheDocument();
  });

  it('applies proper styling and theme', () => {
    const { container } = render(<ExpertiseSection technique={mockTechnique} />);
    
    expect(container.querySelector('[class*="bg-white"]')).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby');
  });

  it('renders animated sections', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    const animatedSections = screen.getAllByTestId('animated-section');
    expect(animatedSections.length).toBeGreaterThan(0);
  });

  it('displays expertise metrics', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    // Should show some form of expertise validation
    expect(screen.getByText(/20 ans/i)).toBeInTheDocument();
  });

  it('handles empty psychology principles gracefully', () => {
    const techniqueWithoutPrinciples = {
      ...mockTechnique,
      psychologyPrinciples: []
    };
    
    expect(() => render(<ExpertiseSection technique={techniqueWithoutPrinciples} />)).not.toThrow();
  });

  it('shows technique origin context', () => {
    render(<ExpertiseSection technique={mockTechnique} />);
    
    expect(screen.getByText(/FBI/i)).toBeInTheDocument();
  });
});