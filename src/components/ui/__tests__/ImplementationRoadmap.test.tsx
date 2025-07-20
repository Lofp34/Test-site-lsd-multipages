import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementationRoadmap, { ImplementationPhaseProps, ImplementationRoadmapProps } from '../ImplementationRoadmap'

describe('ImplementationRoadmap Component', () => {
  const mockPhases: ImplementationPhaseProps[] = [
    {
      phase: 1,
      title: 'Fondamentaux',
      duration: '1-2 semaines',
      description: 'Mise en place des bases méthodologiques',
      actions: ['Formation équipe', 'Définition processus', 'Outils de base'],
      deliverables: ['Guide méthodologique', 'Templates de qualification'],
      expectedResults: 'Équipe formée et processus défini',
      laurentSerreTip: 'Commencez simple, la complexité viendra naturellement',
      success_metrics: 'Taux d\'adoption > 80%'
    },
    {
      phase: 2,
      title: 'Mise en pratique',
      duration: '1 mois',
      description: 'Application concrète sur le terrain',
      keyActions: ['Accompagnement terrain', 'Ajustements processus', 'Mesure résultats'],
      laurentAdvice: 'La théorie sans pratique ne sert à rien',
      expectedResults: 'Premiers résultats mesurables'
    }
  ]

  const mockTips = [
    'Impliquez toute l\'équipe dès le début',
    'Mesurez régulièrement les progrès',
    'Adaptez la méthode à votre contexte'
  ]

  const defaultProps: ImplementationRoadmapProps = {
    title: 'Feuille de route d\'implémentation',
    subtitle: 'Un plan progressif pour transformer votre approche commerciale',
    phases: mockPhases,
    tips: mockTips,
    domainColor: '#3B82F6'
  }

  describe('Basic Rendering', () => {
    it('renders with all required props', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Feuille de route d\'implémentation')).toBeInTheDocument()
      expect(screen.getByText('Un plan progressif pour transformer votre approche commerciale')).toBeInTheDocument()
    })

    it('displays implementation icon in header', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText(/🚀/)).toBeInTheDocument()
    })

    it('renders all phases', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Fondamentaux')).toBeInTheDocument()
      expect(screen.getByText('Mise en pratique')).toBeInTheDocument()
    })
  })

  describe('Phase Rendering', () => {
    it('displays phase numbers correctly', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('shows phase titles and durations', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Fondamentaux')).toBeInTheDocument()
      expect(screen.getByText('1-2 semaines')).toBeInTheDocument()
      expect(screen.getByText('Mise en pratique')).toBeInTheDocument()
      expect(screen.getByText('1 mois')).toBeInTheDocument()
    })

    it('displays phase descriptions', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Mise en place des bases méthodologiques')).toBeInTheDocument()
      expect(screen.getByText('Application concrète sur le terrain')).toBeInTheDocument()
    })
  })

  describe('Actions and Key Actions', () => {
    it('displays regular actions when provided', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Actions')).toBeInTheDocument()
      expect(screen.getByText('Formation équipe')).toBeInTheDocument()
      expect(screen.getByText('Définition processus')).toBeInTheDocument()
    })

    it('displays key actions when provided', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Actions clés')).toBeInTheDocument()
      expect(screen.getByText('Accompagnement terrain')).toBeInTheDocument()
      expect(screen.getByText('Ajustements processus')).toBeInTheDocument()
    })

    it('shows actions icon', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getAllByText('✅')).toHaveLength(2) // One for each phase
    })
  })

  describe('Deliverables and Expected Results', () => {
    it('displays deliverables when provided', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Livrables')).toBeInTheDocument()
      expect(screen.getByText('Guide méthodologique')).toBeInTheDocument()
      expect(screen.getByText('Templates de qualification')).toBeInTheDocument()
    })

    it('displays expected results when provided', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Résultats attendus')).toBeInTheDocument()
      expect(screen.getByText('Premiers résultats mesurables')).toBeInTheDocument()
    })

    it('shows deliverables icon', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getAllByText('📦')).toHaveLength(2) // One for each phase with deliverables/results
    })
  })

  describe('Laurent Serre Advice', () => {
    it('displays Laurent Serre tip when provided', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getAllByText('Conseil Laurent Serre')).toHaveLength(2) // One for each phase with advice
      expect(screen.getByText('"Commencez simple, la complexité viendra naturellement"')).toBeInTheDocument()
    })

    it('displays Laurent advice when provided', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('"La théorie sans pratique ne sert à rien"')).toBeInTheDocument()
    })

    it('shows advice icon', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getAllByText('💡')).toHaveLength(2) // One for each phase with advice
    })
  })

  describe('Success Metrics', () => {
    it('displays success metrics when provided', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Critère de succès')).toBeInTheDocument()
      expect(screen.getByText('Taux d\'adoption > 80%')).toBeInTheDocument()
    })

    it('shows success metrics icon', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('📊')).toBeInTheDocument()
    })
  })

  describe('Tips Section', () => {
    it('displays tips section when tips provided', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Conseils d\'implémentation Laurent Serre')).toBeInTheDocument()
      expect(screen.getByText('LS')).toBeInTheDocument()
    })

    it('renders all tips with numbering', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('#1')).toBeInTheDocument()
      expect(screen.getByText('#2')).toBeInTheDocument()
      expect(screen.getByText('#3')).toBeInTheDocument()
      
      expect(screen.getByText('Impliquez toute l\'équipe dès le début')).toBeInTheDocument()
      expect(screen.getByText('Mesurez régulièrement les progrès')).toBeInTheDocument()
      expect(screen.getByText('Adaptez la méthode à votre contexte')).toBeInTheDocument()
    })

    it('hides tips section when no tips provided', () => {
      const propsWithoutTips = { ...defaultProps, tips: [] }
      render(<ImplementationRoadmap {...propsWithoutTips} />)
      
      expect(screen.queryByText('Conseils d\'implémentation Laurent Serre')).not.toBeInTheDocument()
    })
  })

  describe('Phase Numbering', () => {
    it('uses provided phase numbers', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('falls back to index-based numbering when phase number not provided', () => {
      const phasesWithoutNumbers = mockPhases.map(phase => ({ ...phase, phase: undefined }))
      const props = { ...defaultProps, phases: phasesWithoutNumbers }
      
      render(<ImplementationRoadmap {...props} />)
      
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  describe('Domain Color Theming', () => {
    it('applies domain color to phase numbers', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      // Phase numbers should use the domain color
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('uses default color when not provided', () => {
      const propsWithoutColor = { ...defaultProps, domainColor: undefined }
      render(<ImplementationRoadmap {...propsWithoutColor} />)
      
      expect(screen.getByText('Fondamentaux')).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive classes for mobile and desktop', () => {
      const { container } = render(<ImplementationRoadmap {...defaultProps} />)
      
      const title = screen.getByText('Feuille de route d\'implémentation')
      expect(title).toHaveClass('text-xl', 'sm:text-2xl')
    })

    it('has responsive grid layout for tips', () => {
      const { container } = render(<ImplementationRoadmap {...defaultProps} />)
      
      const tipsGrid = container.querySelector('.sm\\:grid-cols-2')
      expect(tipsGrid).toBeInTheDocument()
    })

    it('has responsive padding and spacing', () => {
      const { container } = render(<ImplementationRoadmap {...defaultProps} />)
      
      const mainContainer = container.querySelector('.p-4.sm\\:p-6.lg\\:p-8')
      expect(mainContainer).toBeInTheDocument()
    })
  })

  describe('Timeline Visual Elements', () => {
    it('includes timeline visual elements for desktop', () => {
      const { container } = render(<ImplementationRoadmap {...defaultProps} />)
      
      // Should have vertical line for timeline
      const timelineLine = container.querySelector('.absolute.left-6.sm\\:left-8')
      expect(timelineLine).toBeInTheDocument()
    })

    it('hides timeline line on mobile', () => {
      const { container } = render(<ImplementationRoadmap {...defaultProps} />)
      
      const timelineLine = container.querySelector('.hidden.sm\\:block')
      expect(timelineLine).toBeInTheDocument()
    })
  })

  describe('Hover Effects and Animations', () => {
    it('applies hover effects to phase cards', () => {
      const { container } = render(<ImplementationRoadmap {...defaultProps} />)
      
      const phaseCards = container.querySelectorAll('.hover\\:shadow-xl')
      expect(phaseCards.length).toBeGreaterThan(0)
    })

    it('has transition classes for smooth animations', () => {
      const { container } = render(<ImplementationRoadmap {...defaultProps} />)
      
      const animatedElements = container.querySelectorAll('.transition-all')
      expect(animatedElements.length).toBeGreaterThan(0)
    })

    it('includes scale hover effects', () => {
      const { container } = render(<ImplementationRoadmap {...defaultProps} />)
      
      const scaleElements = container.querySelectorAll('.hover\\:scale-\\[1\\.01\\]')
      expect(scaleElements.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument() // Main title
      expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(3) // Phase titles + tips section title
    })

    it('provides meaningful text content', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      expect(screen.getByText('Feuille de route d\'implémentation')).toBeInTheDocument()
      expect(screen.getByText('Actions')).toBeInTheDocument()
      expect(screen.getByText('Livrables')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty phases array', () => {
      const propsWithEmptyPhases = { ...defaultProps, phases: [] }
      render(<ImplementationRoadmap {...propsWithEmptyPhases} />)
      
      expect(screen.getByText('Feuille de route d\'implémentation')).toBeInTheDocument()
      expect(screen.queryByText('Fondamentaux')).not.toBeInTheDocument()
    })

    it('handles phases without actions', () => {
      const phasesWithoutActions = [
        { ...mockPhases[0], actions: [], keyActions: undefined }
      ]
      const props = { ...defaultProps, phases: phasesWithoutActions }
      
      render(<ImplementationRoadmap {...props} />)
      
      expect(screen.getByText('Fondamentaux')).toBeInTheDocument()
    })

    it('handles very long phase titles', () => {
      const phasesWithLongTitles = [
        { ...mockPhases[0], title: 'Very Long Phase Title That Should Wrap Properly' }
      ]
      const props = { ...defaultProps, phases: phasesWithLongTitles }
      
      render(<ImplementationRoadmap {...props} />)
      
      expect(screen.getByText('Very Long Phase Title That Should Wrap Properly')).toBeInTheDocument()
    })
  })

  describe('Dark Mode Support', () => {
    it('includes dark mode classes', () => {
      const { container } = render(<ImplementationRoadmap {...defaultProps} />)
      
      const darkModeElements = container.querySelectorAll('[class*="dark:"]')
      expect(darkModeElements.length).toBeGreaterThan(0)
    })

    it('has dark mode text colors', () => {
      render(<ImplementationRoadmap {...defaultProps} />)
      
      const title = screen.getByText('Feuille de route d\'implémentation')
      expect(title).toHaveClass('dark:text-white')
    })
  })
})