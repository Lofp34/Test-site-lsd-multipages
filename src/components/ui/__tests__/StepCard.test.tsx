import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StepCard from '../StepCard';

describe('StepCard', () => {
  const mockProps = {
    stepNumber: 1,
    title: 'Première étape',
    description: 'Description de la première étape',
    script: 'Script exemple pour cette étape',
    example: 'Exemple concret d\'application',
    tips: ['Conseil 1', 'Conseil 2', 'Conseil 3']
  };

  it('renders step number correctly', () => {
    render(<StepCard {...mockProps} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('displays step title', () => {
    render(<StepCard {...mockProps} />);
    
    expect(screen.getByText('Première étape')).toBeInTheDocument();
  });

  it('shows step description', () => {
    render(<StepCard {...mockProps} />);
    
    expect(screen.getByText('Description de la première étape')).toBeInTheDocument();
  });

  it('displays script section', () => {
    render(<StepCard {...mockProps} />);
    
    expect(screen.getByText('Script exemple pour cette étape', { exact: false })).toBeInTheDocument();
  });

  it('shows example section', () => {
    render(<StepCard {...mockProps} />);
    
    expect(screen.getByText('Exemple concret d\'application')).toBeInTheDocument();
  });

  it('renders all tips', () => {
    render(<StepCard {...mockProps} />);
    
    mockProps.tips.forEach(tip => {
      expect(screen.getByText(tip)).toBeInTheDocument();
    });
  });

  it('applies proper visual hierarchy', () => {
    render(<StepCard {...mockProps} />);
    
    const title = screen.getByText('Première étape');
    expect(title.tagName).toBe('H3');
  });

  it('has proper step number styling', () => {
    render(<StepCard {...mockProps} />);
    
    const stepNumber = screen.getByText('1');
    expect(stepNumber).toHaveClass('bg-gradient-to-br');
  });

  it('applies negotiation theme styling', () => {
    const { container } = render(<StepCard {...mockProps} />);
    
    expect(container.querySelector('[class*="red"]')).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<StepCard {...mockProps} />);
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
  });

  it('handles missing tips gracefully', () => {
    const propsWithoutTips = { ...mockProps, tips: [] };
    
    expect(() => render(<StepCard {...propsWithoutTips} />)).not.toThrow();
  });

  it('displays script in special formatting', () => {
    const { container } = render(<StepCard {...mockProps} />);
    
    const scriptSection = container.querySelector('[class*="red-50"]');
    expect(scriptSection).toBeInTheDocument();
  });

  it('shows example with proper styling', () => {
    const { container } = render(<StepCard {...mockProps} />);
    
    const exampleSection = container.querySelector('[class*="orange-50"]');
    expect(exampleSection).toBeInTheDocument();
  });

  it('renders tips as a list', () => {
    render(<StepCard {...mockProps} />);
    
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockProps.tips.length);
  });

  it('handles large step numbers', () => {
    const propsWithLargeNumber = { ...mockProps, stepNumber: 99 };
    render(<StepCard {...propsWithLargeNumber} />);
    
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('applies hover effects', () => {
    const { container } = render(<StepCard {...mockProps} />);
    
    const card = container.firstChild;
    expect(card).toHaveClass('hover:shadow-2xl');
  });

  it('has proper card structure', () => {
    const { container } = render(<StepCard {...mockProps} />);
    
    const card = container.firstChild;
    expect(card).toHaveClass('bg-white/80', 'rounded-2xl', 'shadow-xl');
  });

  it('displays content in logical order', () => {
    const { container } = render(<StepCard {...mockProps} />);
    
    const textContent = container.textContent;
    const titleIndex = textContent!.indexOf('Première étape');
    const descriptionIndex = textContent!.indexOf('Description de la première étape');
    const scriptIndex = textContent!.indexOf('Script exemple');
    
    expect(titleIndex).toBeLessThan(descriptionIndex);
    expect(descriptionIndex).toBeLessThan(scriptIndex);
  });

  it('shows completion state', () => {
    render(<StepCard {...mockProps} isCompleted={true} />);
    
    expect(screen.getAllByText('✓')).toHaveLength(2); // One in indicator, one in step number
    expect(screen.getByText('Étape complétée')).toBeInTheDocument();
  });

  it('handles missing optional props', () => {
    const minimalProps = {
      stepNumber: 1,
      title: 'Test',
      description: 'Test description'
    };
    
    expect(() => render(<StepCard {...minimalProps} />)).not.toThrow();
  });
});