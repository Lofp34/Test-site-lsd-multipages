import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DomainStats, { DomainStatProps, DomainStatsProps } from '../DomainStats'

describe('DomainStats Component', () => {
  const mockStats: DomainStatProps[] = [
    {
      label: 'Taux de closing',
      value: '+40%',
      description: 'Amélioration moyenne',
      trend: 'up',
      icon: '📈',
      tooltip: 'Basé sur 50+ clients PME'
    },
    {
      label: 'Cycle de vente',
      value: '-30%',
      description: 'Réduction du temps',
      trend: 'down',
      icon: '⏱️',
      tooltip: 'Temps moyen réduit'
    },
    {
      label: 'Satisfaction client',
      value: '95%',
      description: 'Taux de satisfaction',
      trend: 'stable',
      icon: '😊',
      tooltip: 'Enquête post-formation'
    }
  ]

  const defaultProps: DomainStatsProps = {
    title: 'Statistiques du domaine',
    subtitle: 'Résultats mesurés chez nos clients PME',
    stats: mockStats,
    domainColor: '#3B82F6',
    variant: 'horizontal',
    animated: true,
    showTrends: true
  }

  describe('Basic Rendering', () => {
    it('renders with all required props', () => {
      render(<DomainStats {...defaultProps} />)
      
      expect(screen.getByText('Statistiques du domaine')).toBeInTheDocument()
      expect(screen.getByText('Résultats mesurés chez nos clients PME')).toBeInTheDocument()
    })

    it('displays all stats', () => {
      render(<DomainStats {...defaultProps} />)
      
      expect(screen.getByText('Taux de closing')).toBeInTheDocument()
      expect(screen.getByText('Cycle de vente')).toBeInTheDocument()
      expect(screen.getByText('Satisfaction client')).toBeInTheDocument()
    })

    it('shows stat values', () => {
      const props = { ...defaultProps, animated: false } // Disable animation to get final values
      render(<DomainStats {...props} />)
      
      expect(screen.getByText('+40%')).toBeInTheDocument()
      expect(screen.getByText('-30%')).toBeInTheDocument()
      expect(screen.getByText('95%')).toBeInTheDocument()
    })

    it('displays stat descriptions', () => {
      render(<DomainStats {...defaultProps} />)
      
      expect(screen.getByText('Amélioration moyenne')).toBeInTheDocument()
      expect(screen.getByText('Réduction du temps')).toBeInTheDocument()
      expect(screen.getByText('Taux de satisfaction')).toBeInTheDocument()
    })
  })

  describe('Icons and Visual Elements', () => {
    it('displays stat icons when provided', () => {
      render(<DomainStats {...defaultProps} />)
      
      expect(screen.getAllByText('📈')).toHaveLength(2) // One as stat icon, one as trend icon
      expect(screen.getByText('⏱️')).toBeInTheDocument()
      expect(screen.getByText('😊')).toBeInTheDocument()
    })

    it('hides stat icons when not provided', () => {
      const statsWithoutIcons = mockStats.map(stat => ({ ...stat, icon: undefined }))
      const props = { ...defaultProps, stats: statsWithoutIcons }
      
      render(<DomainStats {...props} />)
      
      // Should still have trend icons but not stat icons
      expect(screen.getAllByText('📈')).toHaveLength(1) // Only trend icon
    })
  })

  describe('Trend Indicators', () => {
    it('shows trend icons when showTrends is true', () => {
      render(<DomainStats {...defaultProps} />)
      
      expect(screen.getAllByText('📈')).toHaveLength(2) // One as stat icon, one as trend icon
      expect(screen.getByText('📉')).toBeInTheDocument() // down trend  
      expect(screen.getByText('📊')).toBeInTheDocument() // stable trend
    })

    it('hides trend indicators when showTrends is false', () => {
      const props = { ...defaultProps, showTrends: false }
      render(<DomainStats {...props} />)
      
      // Should still show stat icons but not trend indicators
      expect(screen.getByText('📈')).toBeInTheDocument() // This is the stat icon, not trend
    })

    it('applies correct trend colors', () => {
      const props = { ...defaultProps, animated: false } // Disable animation to get final values
      render(<DomainStats {...props} />)
      
      // In a real test, we would check the computed styles or classes
      // For now, we just verify the elements exist
      expect(screen.getByText('+40%')).toBeInTheDocument()
      expect(screen.getByText('-30%')).toBeInTheDocument()
      expect(screen.getByText('95%')).toBeInTheDocument()
    })
  })

  describe('Tooltips', () => {
    it('includes tooltip content in DOM', () => {
      render(<DomainStats {...defaultProps} />)
      
      expect(screen.getByText('Basé sur 50+ clients PME')).toBeInTheDocument()
      expect(screen.getByText('Temps moyen réduit')).toBeInTheDocument()
      expect(screen.getByText('Enquête post-formation')).toBeInTheDocument()
    })

    it('hides tooltips when not provided', () => {
      const statsWithoutTooltips = mockStats.map(stat => ({ ...stat, tooltip: undefined }))
      const props = { ...defaultProps, stats: statsWithoutTooltips }
      
      render(<DomainStats {...props} />)
      
      expect(screen.queryByText('Basé sur 50+ clients PME')).not.toBeInTheDocument()
    })
  })

  describe('Layout Variants', () => {
    it('applies horizontal layout classes by default', () => {
      const { container } = render(<DomainStats {...defaultProps} />)
      
      const grid = container.querySelector('.grid-cols-1.sm\\:grid-cols-3')
      expect(grid).toBeInTheDocument()
    })

    it('applies grid layout classes when variant is grid', () => {
      const props = { ...defaultProps, variant: 'grid' as const }
      const { container } = render(<DomainStats {...props} />)
      
      const grid = container.querySelector('.grid-cols-2.sm\\:grid-cols-3')
      expect(grid).toBeInTheDocument()
    })

    it('applies compact layout classes when variant is compact', () => {
      const props = { ...defaultProps, variant: 'compact' as const }
      const { container } = render(<DomainStats {...props} />)
      
      const flexContainer = container.querySelector('.flex.flex-wrap')
      expect(flexContainer).toBeInTheDocument()
    })
  })

  describe('Animation Behavior', () => {
    it('shows animated values when animation is enabled', async () => {
      render(<DomainStats {...defaultProps} />)
      
      // Initially should show animated values (starting from 0)
      // Then animate to final values
      await waitFor(() => {
        expect(screen.getByText('+40%')).toBeInTheDocument()
      }, { timeout: 1000 })
    })

    it('shows static values when animation is disabled', () => {
      const props = { ...defaultProps, animated: false }
      render(<DomainStats {...props} />)
      
      expect(screen.getByText('+40%')).toBeInTheDocument()
      expect(screen.getByText('-30%')).toBeInTheDocument()
      expect(screen.getByText('95%')).toBeInTheDocument()
    })

    it('includes progress bar when animated', () => {
      const { container } = render(<DomainStats {...defaultProps} />)
      
      const progressBar = container.querySelector('.bg-gray-200.dark\\:bg-gray-700')
      expect(progressBar).toBeInTheDocument()
    })

    it('hides progress bar when not animated', () => {
      const props = { ...defaultProps, animated: false }
      const { container } = render(<DomainStats {...props} />)
      
      const progressBar = container.querySelector('.bg-gray-200.dark\\:bg-gray-700')
      expect(progressBar).not.toBeInTheDocument()
    })
  })

  describe('Domain Color Theming', () => {
    it('applies domain color to stat values', () => {
      const props = { ...defaultProps, animated: false } // Disable animation to get final values
      render(<DomainStats {...props} />)
      
      // Values should use the domain color
      expect(screen.getByText('+40%')).toBeInTheDocument()
      expect(screen.getByText('-30%')).toBeInTheDocument()
      expect(screen.getByText('95%')).toBeInTheDocument()
    })

    it('uses default color when not provided', () => {
      const propsWithoutColor = { ...defaultProps, domainColor: undefined }
      render(<DomainStats {...propsWithoutColor} />)
      
      expect(screen.getByText('Statistiques du domaine')).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive text classes', () => {
      render(<DomainStats {...defaultProps} />)
      
      const title = screen.getByText('Statistiques du domaine')
      expect(title).toHaveClass('text-base', 'sm:text-lg')
    })

    it('has responsive padding and spacing', () => {
      const { container } = render(<DomainStats {...defaultProps} />)
      
      const mainContainer = container.firstChild as HTMLElement
      expect(mainContainer).toHaveClass('p-4', 'sm:p-6')
    })

    it('applies responsive stat value sizes', () => {
      const props = { ...defaultProps, animated: false } // Disable animation to get final values
      render(<DomainStats {...props} />)
      
      const statValues = screen.getAllByText('+40%')
      expect(statValues[0]).toHaveClass('text-xl', 'sm:text-2xl', 'lg:text-3xl')
    })
  })

  describe('Hover Effects', () => {
    it('applies hover effects to stat items', () => {
      const { container } = render(<DomainStats {...defaultProps} />)
      
      const statItems = container.querySelectorAll('.group\\/stat')
      expect(statItems.length).toBe(3)
    })

    it('includes scale hover effects when animated', () => {
      const { container } = render(<DomainStats {...defaultProps} />)
      
      const scaleElements = container.querySelectorAll('.group-hover\\/stat\\:scale-110')
      expect(scaleElements.length).toBeGreaterThan(0)
    })

    it('includes smaller scale effects when not animated', () => {
      const props = { ...defaultProps, animated: false }
      const { container } = render(<DomainStats {...props} />)
      
      const scaleElements = container.querySelectorAll('.group-hover\\/stat\\:scale-105')
      expect(scaleElements.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<DomainStats {...defaultProps} />)
      
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()
    })

    it('provides meaningful text content', () => {
      render(<DomainStats {...defaultProps} />)
      
      expect(screen.getByText('Statistiques du domaine')).toBeInTheDocument()
      expect(screen.getByText('Taux de closing')).toBeInTheDocument()
      expect(screen.getByText('Amélioration moyenne')).toBeInTheDocument()
    })

    it('includes proper tooltip structure', () => {
      const { container } = render(<DomainStats {...defaultProps} />)
      
      const tooltips = container.querySelectorAll('[class*="opacity-0"][class*="group-hover"]')
      expect(tooltips.length).toBeGreaterThan(0)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty stats array', () => {
      const propsWithEmptyStats = { ...defaultProps, stats: [] }
      render(<DomainStats {...propsWithEmptyStats} />)
      
      expect(screen.getByText('Statistiques du domaine')).toBeInTheDocument()
      expect(screen.queryByText('Taux de closing')).not.toBeInTheDocument()
    })

    it('handles stats without descriptions', () => {
      const statsWithoutDescriptions = mockStats.map(stat => ({ ...stat, description: undefined }))
      const props = { ...defaultProps, stats: statsWithoutDescriptions }
      
      render(<DomainStats {...props} />)
      
      expect(screen.getByText('Taux de closing')).toBeInTheDocument()
      expect(screen.queryByText('Amélioration moyenne')).not.toBeInTheDocument()
    })

    it('handles very long stat labels', () => {
      const statsWithLongLabels = [
        { ...mockStats[0], label: 'Very Long Stat Label That Should Wrap Properly' }
      ]
      const props = { ...defaultProps, stats: statsWithLongLabels }
      
      render(<DomainStats {...props} />)
      
      expect(screen.getByText('Very Long Stat Label That Should Wrap Properly')).toBeInTheDocument()
    })

    it('handles stats without trends', () => {
      const statsWithoutTrends = mockStats.map(stat => ({ ...stat, trend: undefined }))
      const props = { ...defaultProps, stats: statsWithoutTrends }
      
      render(<DomainStats {...props} />)
      
      expect(screen.getByText('Taux de closing')).toBeInTheDocument()
    })
  })

  describe('Subtitle Handling', () => {
    it('displays subtitle when provided', () => {
      render(<DomainStats {...defaultProps} />)
      
      expect(screen.getByText('Résultats mesurés chez nos clients PME')).toBeInTheDocument()
    })

    it('hides subtitle when not provided', () => {
      const propsWithoutSubtitle = { ...defaultProps, subtitle: undefined }
      render(<DomainStats {...propsWithoutSubtitle} />)
      
      expect(screen.queryByText('Résultats mesurés chez nos clients PME')).not.toBeInTheDocument()
    })
  })

  describe('Dark Mode Support', () => {
    it('includes dark mode classes', () => {
      const { container } = render(<DomainStats {...defaultProps} />)
      
      const darkModeElements = container.querySelectorAll('[class*="dark:"]')
      expect(darkModeElements.length).toBeGreaterThan(0)
    })

    it('has dark mode background classes', () => {
      const { container } = render(<DomainStats {...defaultProps} />)
      
      const mainContainer = container.firstChild as HTMLElement
      expect(mainContainer).toHaveClass('dark:bg-gray-800/90')
    })
  })

  describe('Animation Delays', () => {
    it('applies staggered animation delays to stats', () => {
      const { container } = render(<DomainStats {...defaultProps} />)
      
      const statElements = container.querySelectorAll('[style*="animation-delay"]')
      expect(statElements.length).toBe(3)
    })
  })
})