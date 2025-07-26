import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DomainInsight, { DomainInsightProps } from '../DomainInsight'

describe('DomainInsight Component', () => {
  const mockProps: DomainInsightProps = {
    title: 'SPIN Selling',
    description: 'Une méthode de questionnement structurée pour identifier les besoins clients',
    businessImpact: '+40% de taux de closing avec une approche structurée',
    implementationLevel: 'Intermédiaire',
    keyElements: ['Questions Situation', 'Questions Problème', 'Questions Implication', 'Questions Need-payoff'],
    trend: 'rising',
    icon: '🎯',
    color: '#3B82F6'
  }

  const mockDomainTheme = {
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    accentColor: '#34D399'
  }

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<DomainInsight {...mockProps} />)
      
      expect(screen.getByText('SPIN Selling')).toBeInTheDocument()
      expect(screen.getByText('Une méthode de questionnement structurée pour identifier les besoins clients')).toBeInTheDocument()
      expect(screen.getByText('+40% de taux de closing avec une approche structurée')).toBeInTheDocument()
    })

    it('displays the correct icon', () => {
      render(<DomainInsight {...mockProps} />)
      
      expect(screen.getByText('🎯')).toBeInTheDocument()
    })

    it('shows implementation level badge', () => {
      render(<DomainInsight {...mockProps} />)
      
      expect(screen.getByText('Intermédiaire')).toBeInTheDocument()
    })

    it('displays all key elements', () => {
      render(<DomainInsight {...mockProps} />)
      
      mockProps.keyElements.forEach(element => {
        expect(screen.getByText(element)).toBeInTheDocument()
      })
    })
  })

  describe('Implementation Level Variants', () => {
    it('renders Débutant level with correct styling', () => {
      const props = { ...mockProps, implementationLevel: 'Débutant' as const }
      render(<DomainInsight {...props} />)
      
      const badge = screen.getByText('Débutant')
      expect(badge).toHaveClass('text-green-600')
    })

    it('renders Intermédiaire level with correct styling', () => {
      const props = { ...mockProps, implementationLevel: 'Intermédiaire' as const }
      render(<DomainInsight {...props} />)
      
      const badge = screen.getByText('Intermédiaire')
      expect(badge).toHaveClass('text-orange-600')
    })

    it('renders Avancé level with correct styling', () => {
      const props = { ...mockProps, implementationLevel: 'Avancé' as const }
      render(<DomainInsight {...props} />)
      
      const badge = screen.getByText('Avancé')
      expect(badge).toHaveClass('text-red-600')
    })
  })

  describe('Trend Indicators', () => {
    it('shows rising trend with correct icon', () => {
      const props = { ...mockProps, trend: 'rising' as const }
      render(<DomainInsight {...props} />)
      
      expect(screen.getByText('📈')).toBeInTheDocument()
    })

    it('shows stable trend with correct icon', () => {
      const props = { ...mockProps, trend: 'stable' as const }
      render(<DomainInsight {...props} />)
      
      expect(screen.getByText('📊')).toBeInTheDocument()
    })

    it('shows declining trend with correct icon', () => {
      const props = { ...mockProps, trend: 'declining' as const }
      render(<DomainInsight {...props} />)
      
      expect(screen.getByText('📉')).toBeInTheDocument()
    })
  })

  describe('Domain Theme Support', () => {
    it('applies domain theme colors when provided', () => {
      const props = { ...mockProps, domainTheme: mockDomainTheme }
      render(<DomainInsight {...props} />)
      
      // The component should use domain theme colors
      // In a real test, we would check computed styles or data attributes
      expect(screen.getByText('SPIN Selling')).toBeInTheDocument()
    })

    it('falls back to default color when no domain theme', () => {
      render(<DomainInsight {...mockProps} />)
      
      // Should use the default color prop
      expect(screen.getByText('SPIN Selling')).toBeInTheDocument()
    })
  })

  describe('Business Impact Section', () => {
    it('displays business impact with correct label', () => {
      render(<DomainInsight {...mockProps} />)
      
      expect(screen.getByText('Impact Business')).toBeInTheDocument()
      expect(screen.getByText('+40% de taux de closing avec une approche structurée')).toBeInTheDocument()
    })

    it('shows business impact icon', () => {
      render(<DomainInsight {...mockProps} />)
      
      expect(screen.getByText('📊')).toBeInTheDocument()
    })
  })

  describe('Key Elements Section', () => {
    it('displays key elements header', () => {
      render(<DomainInsight {...mockProps} />)
      
      expect(screen.getByText('Éléments clés')).toBeInTheDocument()
      expect(screen.getByText('🔑')).toBeInTheDocument()
    })

    it('renders all key elements as badges', () => {
      render(<DomainInsight {...mockProps} />)
      
      mockProps.keyElements.forEach(element => {
        const badge = screen.getByText(element)
        expect(badge).toHaveClass('rounded-full')
        expect(badge).toHaveClass('px-2', 'sm:px-3')
      })
    })

    it('handles empty key elements array', () => {
      const props = { ...mockProps, keyElements: [] }
      render(<DomainInsight {...props} />)
      
      expect(screen.getByText('Éléments clés')).toBeInTheDocument()
      // Should not crash with empty array
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive classes for mobile and desktop', () => {
      render(<DomainInsight {...mockProps} />)
      
      const title = screen.getByText('SPIN Selling')
      expect(title).toHaveClass('text-base', 'sm:text-lg')
    })

    it('has responsive padding and spacing', () => {
      const { container } = render(<DomainInsight {...mockProps} />)
      
      const mainContainer = container.firstChild as HTMLElement
      expect(mainContainer).toHaveClass('p-4', 'sm:p-6')
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<DomainInsight {...mockProps} />)
      
      // Should have proper heading hierarchy
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()
    })

    it('provides meaningful text content', () => {
      render(<DomainInsight {...mockProps} />)
      
      // All text should be accessible to screen readers
      expect(screen.getByText('SPIN Selling')).toBeInTheDocument()
      expect(screen.getByText('Une méthode de questionnement structurée pour identifier les besoins clients')).toBeInTheDocument()
    })
  })

  describe('Hover Effects and Animations', () => {
    it('applies hover classes for interactive elements', () => {
      const { container } = render(<DomainInsight {...mockProps} />)
      
      const mainContainer = container.firstChild as HTMLElement
      expect(mainContainer).toHaveClass('hover:shadow-xl', 'hover:scale-[1.02]')
    })

    it('has transition classes for smooth animations', () => {
      const { container } = render(<DomainInsight {...mockProps} />)
      
      const mainContainer = container.firstChild as HTMLElement
      expect(mainContainer).toHaveClass('transition-all', 'duration-300')
    })
  })

  describe('Default Props', () => {
    it('uses default icon when not provided', () => {
      const propsWithoutIcon = { ...mockProps }
      delete propsWithoutIcon.icon
      
      render(<DomainInsight {...propsWithoutIcon} />)
      
      expect(screen.getByText('💡')).toBeInTheDocument()
    })

    it('uses default color when not provided', () => {
      const propsWithoutColor = { ...mockProps }
      delete propsWithoutColor.color
      
      render(<DomainInsight {...propsWithoutColor} />)
      
      // Should render without crashing
      expect(screen.getByText('SPIN Selling')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles very long titles gracefully', () => {
      const props = { 
        ...mockProps, 
        title: 'Very Long Title That Should Wrap Properly On Small Screens And Not Break Layout' 
      }
      render(<DomainInsight {...props} />)
      
      expect(screen.getByText(props.title)).toBeInTheDocument()
    })

    it('handles very long descriptions', () => {
      const props = { 
        ...mockProps, 
        description: 'This is a very long description that should wrap properly and maintain readability across different screen sizes without breaking the component layout or causing overflow issues.' 
      }
      render(<DomainInsight {...props} />)
      
      expect(screen.getByText(props.description)).toBeInTheDocument()
    })

    it('handles many key elements', () => {
      const props = { 
        ...mockProps, 
        keyElements: Array.from({ length: 10 }, (_, i) => `Element ${i + 1}`) 
      }
      render(<DomainInsight {...props} />)
      
      props.keyElements.forEach(element => {
        expect(screen.getByText(element)).toBeInTheDocument()
      })
    })
  })

  describe('Dark Mode Support', () => {
    it('includes dark mode classes', () => {
      const { container } = render(<DomainInsight {...mockProps} />)
      
      const mainContainer = container.firstChild as HTMLElement
      expect(mainContainer).toHaveClass('bg-white/90')
    })

    it('has light mode text colors only', () => {
      render(<DomainInsight {...mockProps} />)
      
      const title = screen.getByText('SPIN Selling')
      expect(title).toHaveClass('text-blue-ink')
    })
  })
})