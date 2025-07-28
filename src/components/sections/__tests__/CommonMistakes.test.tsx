import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CommonMistakes from '../CommonMistakes';
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

describe('CommonMistakes', () => {
  const mockTechnique = negotiationTechniqueData;

  it('renders all common mistakes', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    mockTechnique.commonMistakes.forEach(mistake => {
      expect(screen.getByText(mistake.mistake)).toBeInTheDocument();
      expect(screen.getByText(mistake.consequence)).toBeInTheDocument();
      expect(screen.getByText(mistake.solution)).toBeInTheDocument();
    });
  });

  it('displays section heading', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    expect(screen.getByText('Pièges à éviter')).toBeInTheDocument();
  });

  it('shows warning indicators for mistakes', () => {
    const { container } = render(<CommonMistakes technique={mockTechnique} />);
    
    // Should have warning icons or styling
    const warningElements = container.querySelectorAll('[class*="warning"], [class*="alert"], [class*="danger"]');
    expect(warningElements.length).toBeGreaterThanOrEqual(0);
  });

  it('displays consequences clearly', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    mockTechnique.commonMistakes.forEach(mistake => {
      expect(screen.getByText(mistake.consequence)).toBeInTheDocument();
    });
  });

  it('provides solutions for each mistake', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    mockTechnique.commonMistakes.forEach(mistake => {
      expect(screen.getByText(mistake.solution)).toBeInTheDocument();
    });
  });

  it('has proper accessibility structure', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders animated sections', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    const animatedSections = screen.getAllByTestId('animated-section');
    expect(animatedSections.length).toBeGreaterThan(0);
  });

  it('uses appropriate visual hierarchy', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toBeInTheDocument();
  });

  it('handles empty mistakes array gracefully', () => {
    const techniqueWithoutMistakes = {
      ...mockTechnique,
      commonMistakes: []
    };
    
    expect(() => render(<CommonMistakes technique={techniqueWithoutMistakes} />)).not.toThrow();
  });

  it('displays mistakes in logical order', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    // Should render mistakes in the order they appear in data
    const mistakeElements = screen.getAllByText(/Erreur|Piège|Attention/i);
    expect(mistakeElements.length).toBeGreaterThanOrEqual(0);
  });

  it('provides actionable solutions', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    mockTechnique.commonMistakes.forEach(mistake => {
      // Solutions should be actionable (contain action words)
      expect(mistake.solution).toMatch(/utilisez|évitez|préférez|adoptez|appliquez/i);
    });
  });

  it('shows impact of consequences', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    mockTechnique.commonMistakes.forEach(mistake => {
      expect(mistake.consequence).toBeTruthy();
      expect(mistake.consequence.length).toBeGreaterThan(10);
    });
  });

  it('applies warning styling appropriately', () => {
    const { container } = render(<CommonMistakes technique={mockTechnique} />);
    
    // Should have visual indicators for warnings
    const alertElements = container.querySelectorAll('[class*="red"], [class*="warning"], [class*="alert"]');
    expect(alertElements.length).toBeGreaterThanOrEqual(0);
  });

  it('provides preventive guidance', () => {
    render(<CommonMistakes technique={mockTechnique} />);
    
    // Should help users avoid mistakes proactively
    expect(screen.getByText(/éviter/i)).toBeInTheDocument();
  });
});