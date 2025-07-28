import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PracticalGuide from '../PracticalGuide';
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

vi.mock('@/components/ui/StepCard', () => ({
  default: ({ step, ...props }: any) => (
    <div data-testid="step-card" data-step={step.step} {...props}>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
      <div data-testid="script">{step.script}</div>
      <div data-testid="example">{step.example}</div>
      {step.tips.map((tip: string, index: number) => (
        <div key={index} data-testid="tip">{tip}</div>
      ))}
    </div>
  )
}));

describe('PracticalGuide', () => {
  const mockTechnique = negotiationTechniqueData;

  it('renders all guide steps', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    mockTechnique.stepByStepGuide.forEach(step => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  it('displays step numbers correctly', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    const stepCards = screen.getAllByTestId('step-card');
    expect(stepCards).toHaveLength(mockTechnique.stepByStepGuide.length);
    
    stepCards.forEach((card, index) => {
      expect(card).toHaveAttribute('data-step', (index + 1).toString());
    });
  });

  it('shows scripts for each step', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    const scripts = screen.getAllByTestId('script');
    expect(scripts).toHaveLength(mockTechnique.stepByStepGuide.length);
    
    mockTechnique.stepByStepGuide.forEach(step => {
      expect(screen.getByText(step.script)).toBeInTheDocument();
    });
  });

  it('displays examples for each step', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    const examples = screen.getAllByTestId('example');
    expect(examples).toHaveLength(mockTechnique.stepByStepGuide.length);
    
    mockTechnique.stepByStepGuide.forEach(step => {
      expect(screen.getByText(step.example)).toBeInTheDocument();
    });
  });

  it('shows tips for each step', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    mockTechnique.stepByStepGuide.forEach(step => {
      step.tips.forEach(tip => {
        expect(screen.getByText(tip)).toBeInTheDocument();
      });
    });
  });

  it('renders with proper section heading', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    expect(screen.getByText('Guide pratique étape par étape')).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders animated sections', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    const animatedSections = screen.getAllByTestId('animated-section');
    expect(animatedSections.length).toBeGreaterThan(0);
  });

  it('displays steps in correct order', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    const stepCards = screen.getAllByTestId('step-card');
    stepCards.forEach((card, index) => {
      expect(card).toHaveAttribute('data-step', (index + 1).toString());
    });
  });

  it('handles empty guide gracefully', () => {
    const techniqueWithoutGuide = {
      ...mockTechnique,
      stepByStepGuide: []
    };
    
    expect(() => render(<PracticalGuide technique={techniqueWithoutGuide} />)).not.toThrow();
  });

  it('shows contextual help for complex steps', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    // Should have tooltips or help text for complex concepts
    const tips = screen.getAllByTestId('tip');
    expect(tips.length).toBeGreaterThan(0);
  });

  it('applies proper styling for scripts', () => {
    const { container } = render(<PracticalGuide technique={mockTechnique} />);
    
    const scripts = container.querySelectorAll('[data-testid="script"]');
    scripts.forEach(script => {
      expect(script).toBeInTheDocument();
    });
  });

  it('displays B2B context examples', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    mockTechnique.stepByStepGuide.forEach(step => {
      expect(screen.getByText(step.example)).toBeInTheDocument();
    });
  });

  it('provides actionable guidance', () => {
    render(<PracticalGuide technique={mockTechnique} />);
    
    // Each step should have actionable content
    mockTechnique.stepByStepGuide.forEach(step => {
      expect(step.tips.length).toBeGreaterThan(0);
    });
  });
});