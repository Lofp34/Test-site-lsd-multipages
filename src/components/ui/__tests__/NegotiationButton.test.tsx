import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NegotiationButton from '../NegotiationButton';

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
    getCTAClasses: (variant: string) => {
      const variants = {
        primary: 'bg-red-600 hover:bg-red-700 text-white',
        secondary: 'border-red-600 text-red-600 hover:bg-red-50',
        outline: 'border-2 border-red-600 text-red-600'
      };
      return variants[variant as keyof typeof variants] || variants.primary;
    },
    getConditionalClasses: (base: string, hover?: string, animation?: string) => {
      return [base, hover, animation].filter(Boolean).join(' ');
    }
  })
}));

describe('NegotiationButton', () => {
  it('renders with default props', () => {
    render(<NegotiationButton>Test Button</NegotiationButton>);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies primary variant styling', () => {
    render(<NegotiationButton variant="primary">Primary Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-600');
  });

  it('applies secondary variant styling', () => {
    render(<NegotiationButton variant="secondary">Secondary Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-red-600');
  });

  it('applies outline variant styling', () => {
    render(<NegotiationButton variant="outline">Outline Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-2');
  });

  it('handles different sizes', () => {
    render(<NegotiationButton size="sm">Small Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
  });

  it('handles large size', () => {
    render(<NegotiationButton size="lg">Large Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-8', 'py-4', 'text-lg');
  });

  it('handles disabled state', () => {
    render(<NegotiationButton disabled>Disabled Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('handles loading state', () => {
    render(<NegotiationButton loading>Loading Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<NegotiationButton onClick={handleClick}>Clickable Button</NegotiationButton>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents click when disabled', () => {
    const handleClick = vi.fn();
    render(<NegotiationButton onClick={handleClick} disabled>Disabled Button</NegotiationButton>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('prevents click when loading', () => {
    const handleClick = vi.fn();
    render(<NegotiationButton onClick={handleClick} loading>Loading Button</NegotiationButton>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(<NegotiationButton className="custom-class">Custom Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<NegotiationButton ref={ref}>Ref Button</NegotiationButton>);
    
    expect(ref).toHaveBeenCalled();
  });

  it('supports button type attribute', () => {
    render(<NegotiationButton type="submit">Submit Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('has proper accessibility attributes', () => {
    render(<NegotiationButton aria-label="Custom label">Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
  });

  it('applies hover effects', () => {
    render(<NegotiationButton variant="primary">Hover Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-red-700');
  });

  it('applies focus styles', () => {
    render(<NegotiationButton>Focus Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
  });

  it('handles full width prop', () => {
    render(<NegotiationButton fullWidth>Full Width Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('renders with icon', () => {
    const Icon = () => <span data-testid="icon">🎯</span>;
    render(<NegotiationButton icon={<Icon />}>Button with Icon</NegotiationButton>);
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Button with Icon')).toBeInTheDocument();
  });

  it('applies negotiation theme colors', () => {
    render(<NegotiationButton variant="primary">Themed Button</NegotiationButton>);
    
    const button = screen.getByRole('button');
    // Should use red color scheme from negotiation theme
    expect(button.className).toContain('red');
  });
});