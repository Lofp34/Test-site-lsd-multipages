import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NegotiationBadge from '../NegotiationBadge';

vi.mock('@/hooks/useNegotiationTheme', () => ({
  useNegotiationTheme: () => ({
    theme: {
      primary: '#DC2626',
      accent: '#EA580C',
      particle: '#DC2626'
    },
    utils: {},
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    shouldDisableHoverEffects: false,
    shouldReduceAnimations: false
  }),
  useNegotiationClasses: () => ({
    getConditionalClasses: (base: string, hover?: string, animation?: string) => {
      const variants = {
        'primary': 'bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold',
        'secondary': 'bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold',
        'outline': 'border border-red-600 text-red-600 px-2 py-1 rounded-full text-xs font-semibold'
      };
      return base in variants ? variants[base as keyof typeof variants] : base;
    }
  })
}));

describe('NegotiationBadge', () => {
  it('renders with default props', () => {
    render(<NegotiationBadge>Test Badge</NegotiationBadge>);
    
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies primary variant styling', () => {
    render(<NegotiationBadge variant="primary">Primary Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Primary Badge');
    expect(badge).toHaveClass('bg-red-600', 'text-white');
  });

  it('applies secondary variant styling', () => {
    render(<NegotiationBadge variant="secondary">Secondary Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass('bg-orange-500', 'text-white');
  });

  it('applies outline variant styling', () => {
    render(<NegotiationBadge variant="outline">Outline Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Outline Badge');
    expect(badge).toHaveClass('border', 'border-red-600', 'text-red-600');
  });

  it('handles different sizes', () => {
    render(<NegotiationBadge size="sm">Small Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Small Badge');
    expect(badge).toHaveClass('px-1.5', 'py-0.5', 'text-xs');
  });

  it('handles large size', () => {
    render(<NegotiationBadge size="lg">Large Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Large Badge');
    expect(badge).toHaveClass('px-3', 'py-1.5', 'text-sm');
  });

  it('renders with custom className', () => {
    render(<NegotiationBadge className="custom-class">Custom Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('applies rounded styling', () => {
    render(<NegotiationBadge>Rounded Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Rounded Badge');
    expect(badge).toHaveClass('rounded-full');
  });

  it('has proper font weight', () => {
    render(<NegotiationBadge>Bold Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Bold Badge');
    expect(badge).toHaveClass('font-semibold');
  });

  it('renders with icon', () => {
    const Icon = () => <span data-testid="icon">🎯</span>;
    render(<NegotiationBadge icon={<Icon />}>Badge with Icon</NegotiationBadge>);
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Badge with Icon')).toBeInTheDocument();
  });

  it('handles icon-only badge', () => {
    const Icon = () => <span data-testid="icon">🎯</span>;
    render(<NegotiationBadge icon={<Icon />} />);
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies negotiation theme colors', () => {
    render(<NegotiationBadge variant="primary">Themed Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Themed Badge');
    // Should use red color scheme from negotiation theme
    expect(badge.className).toContain('red');
  });

  it('has proper accessibility role', () => {
    render(<NegotiationBadge>Status Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Status Badge');
    expect(badge).toHaveAttribute('role', 'status');
  });

  it('supports custom aria-label', () => {
    render(<NegotiationBadge aria-label="Custom label">Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Badge');
    expect(badge).toHaveAttribute('aria-label', 'Custom label');
  });

  it('handles empty content gracefully', () => {
    render(<NegotiationBadge />);
    
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
  });

  it('applies hover effects when interactive', () => {
    render(<NegotiationBadge interactive>Interactive Badge</NegotiationBadge>);
    
    const badge = screen.getByText('Interactive Badge');
    expect(badge).toHaveClass('hover:opacity-80', 'cursor-pointer');
  });

  it('supports click events when interactive', () => {
    const handleClick = vi.fn();
    render(
      <NegotiationBadge interactive onClick={handleClick}>
        Clickable Badge
      </NegotiationBadge>
    );
    
    const badge = screen.getByText('Clickable Badge');
    badge.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies proper spacing with icon and text', () => {
    const Icon = () => <span data-testid="icon">🎯</span>;
    render(<NegotiationBadge icon={<Icon />}>Badge Text</NegotiationBadge>);
    
    const badge = screen.getByText('Badge Text').parentElement;
    expect(badge).toHaveClass('gap-1');
  });
});