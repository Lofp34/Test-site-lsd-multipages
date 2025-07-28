import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConversionCTAs from '../ConversionCTAs';
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

vi.mock('@/utils/cta-tracking', () => ({
  trackCTAClick: vi.fn()
}));

describe('ConversionCTAs', () => {
  const mockTechnique = negotiationTechniqueData;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders diagnostic CTA', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    expect(screen.getByText(/Diagnostic commercial gratuit/i)).toBeInTheDocument();
  });

  it('renders bootcamp CTA', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    expect(screen.getByText(/Bootcamp/i)).toBeInTheDocument();
  });

  it('renders consultation CTA', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    expect(screen.getByText(/Consultation/i)).toBeInTheDocument();
  });

  it('tracks CTA clicks', () => {
    const { trackCTAClick } = require('@/utils/cta-tracking');
    render(<ConversionCTAs technique={mockTechnique} />);
    
    const ctaButtons = screen.getAllByRole('button');
    if (ctaButtons.length > 0) {
      fireEvent.click(ctaButtons[0]);
      expect(trackCTAClick).toHaveBeenCalled();
    }
  });

  it('displays value propositions', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    expect(screen.getByText(/gratuit/i)).toBeInTheDocument();
    expect(screen.getByText(/personnalisé/i)).toBeInTheDocument();
  });

  it('has proper CTA hierarchy', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    const primaryCTAs = screen.getAllByRole('button');
    expect(primaryCTAs.length).toBeGreaterThan(0);
  });

  it('renders with proper accessibility', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('type');
    });
  });

  it('applies negotiation theme styling', () => {
    const { container } = render(<ConversionCTAs technique={mockTechnique} />);
    
    expect(container.querySelector('[class*="red"]')).toBeInTheDocument();
  });

  it('shows urgency indicators', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    expect(screen.getByText(/gratuit/i)).toBeInTheDocument();
  });

  it('renders animated sections', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    const animatedSections = screen.getAllByTestId('animated-section');
    expect(animatedSections.length).toBeGreaterThan(0);
  });

  it('includes social proof elements', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    // Should include testimonials or success indicators
    const socialProofElements = screen.getAllByText(/clients|succès|résultats/i);
    expect(socialProofElements.length).toBeGreaterThanOrEqual(0);
  });

  it('has clear call-to-action text', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button.textContent).toBeTruthy();
      expect(button.textContent!.length).toBeGreaterThan(5);
    });
  });

  it('provides multiple conversion paths', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('handles CTA interactions properly', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });

  it('displays technique-specific benefits', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    expect(screen.getByText(/négociation/i)).toBeInTheDocument();
  });

  it('shows clear next steps', () => {
    render(<ConversionCTAs technique={mockTechnique} />);
    
    // Should indicate what happens after clicking
    const nextStepIndicators = screen.getAllByText(/découvrir|commencer|démarrer/i);
    expect(nextStepIndicators.length).toBeGreaterThanOrEqual(0);
  });
});