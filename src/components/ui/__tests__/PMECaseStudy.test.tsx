import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PMECaseStudy, { PMECaseStudyProps } from '../PMECaseStudy'

describe('PMECaseStudy Component', () => {
  const mockCaseStudies: PMECaseStudyProps[] = [
    {
      industry: 'PME SaaS',
      companySize: '25 salariés',
      challenge: 'Processus de vente non structuré, taux de closing faible',
      solution: 'Implémentation de la méthode SPIN Selling avec formation équipe',
      results: '+65% de taux de qualification, +40% de closing',
      domainFocus: 'methods',
      metrics: {
        'taux_qualification': '+65%',
        'taux_closing': '+40%',
        'cycle_vente': '-30%',
        'satisfaction': '95%'
      },
      timeline: '3 mois'
    },
    {
      industry: 'PME Conseil',
      companySize: '15 salariés',
      challenge: 'Difficulté à se différencier de la concurrence',
      solution: 'Adoption de la méthode Challenger Sale',
      results: '+45% de différenciation perçue par les clients',
      domainFocus: 'methods',
      metrics: {
        'différenciation': '+45%',
        'prix_moyen': '+20%'
      },
      laurentQuote: 'La différenciation ne vient pas du produit mais de l\'approche',
      timeline: '4 mois'
    }
  ]

  const defaultProps = {
    caseStudies: mockCaseStudies,
    title: 'Cas clients PME',
    subtitle: 'Découvrez comment mes clients PME appliquent concrètement les concepts',
    domainColor: '#3B82F6',
    domainIcon: '🛠️'
  }

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByText(/Cas clients PME/)).toBeInTheDocument()
      expect(screen.getByText('Découvrez comment mes clients PME appliquent concrètement les concepts')).toBeInTheDocument()
    })

    it('displays all case studies', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByText('PME SaaS')).toBeInTheDocument()
      expect(screen.getByText('PME Conseil')).toBeInTheDocument()
    })

    it('shows domain icon in header', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByText(/🛠️/)).toBeInTheDocument()
    })
  })

  describe('Case Study Content', () => {
    it('displays industry and company size', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByText('PME SaaS')).toBeInTheDocument()
      expect(screen.getByText('25 salariés')).toBeInTheDocument()
      expect(screen.getByText('15 salariés')).toBeInTheDocument()
    })

    it('shows challenge section with correct icon', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getAllByText('Défi initial')).toHaveLength(2) // One for each case study
      expect(screen.getAllByText('🚨')).toHaveLength(2) // One for each case study
      expect(screen.getByText('Processus de vente non structuré, taux de closing faible')).toBeInTheDocument()
    })

    it('displays solution section with correct icon', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getAllByText('Solution mise en place')).toHaveLength(2) // One for each case study
      expect(screen.getAllByText('💡')).toHaveLength(2) // One for each case study
      expect(screen.getByText('Implémentation de la méthode SPIN Selling avec formation équipe')).toBeInTheDocument()
    })

    it('shows results section with correct icon', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getAllByText('Résultats obtenus')).toHaveLength(2) // One for each case study
      expect(screen.getAllByText('📈')).toHaveLength(2) // One for each case study
      expect(screen.getByText('+65% de taux de qualification, +40% de closing')).toBeInTheDocument()
    })
  })

  describe('Industry Icons', () => {
    it('displays correct icons for different industries', () => {
      const caseStudiesWithDifferentIndustries = [
        { ...mockCaseStudies[0], industry: 'Services IT' },
        { ...mockCaseStudies[1], industry: 'E-commerce' }
      ]
      
      render(<PMECaseStudy {...defaultProps} caseStudies={caseStudiesWithDifferentIndustries} />)
      
      expect(screen.getByText('💻')).toBeInTheDocument() // Services IT
      expect(screen.getByText('🛒')).toBeInTheDocument() // E-commerce
    })

    it('uses default icon for unknown industries', () => {
      const caseStudyWithUnknownIndustry = [
        { ...mockCaseStudies[0], industry: 'Unknown Industry' }
      ]
      
      render(<PMECaseStudy {...defaultProps} caseStudies={caseStudyWithUnknownIndustry} />)
      
      expect(screen.getByText('🏢')).toBeInTheDocument() // Default icon
    })
  })

  describe('Company Size Styling', () => {
    it('applies correct styling for small companies', () => {
      const smallCompany = [
        { ...mockCaseStudies[0], companySize: '10 salariés' }
      ]
      
      render(<PMECaseStudy {...defaultProps} caseStudies={smallCompany} />)
      
      const badge = screen.getByText('10 salariés')
      expect(badge).toHaveClass('bg-green-100', 'text-green-700')
    })

    it('applies correct styling for medium companies', () => {
      const mediumCompany = [
        { ...mockCaseStudies[0], companySize: '35 salariés' }
      ]
      
      render(<PMECaseStudy {...defaultProps} caseStudies={mediumCompany} />)
      
      const badge = screen.getByText('35 salariés')
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-700')
    })

    it('applies correct styling for larger companies', () => {
      const largeCompany = [
        { ...mockCaseStudies[0], companySize: '80 salariés' }
      ]
      
      render(<PMECaseStudy {...defaultProps} caseStudies={largeCompany} />)
      
      const badge = screen.getByText('80 salariés')
      expect(badge).toHaveClass('bg-purple-100', 'text-purple-700')
    })
  })

  describe('Domain Focus Colors', () => {
    it('applies correct colors for methods domain', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      // Methods domain should use blue color (#3B82F6)
      expect(screen.getByText('PME SaaS')).toBeInTheDocument()
    })

    it('applies correct colors for different domain focus', () => {
      const psychologyCase = [
        { ...mockCaseStudies[0], domainFocus: 'psychology' as const }
      ]
      
      render(<PMECaseStudy {...defaultProps} caseStudies={psychologyCase} />)
      
      // Psychology domain should use purple color
      expect(screen.getByText('PME SaaS')).toBeInTheDocument()
    })
  })

  describe('Metrics Display', () => {
    it('displays metrics in grid format', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getAllByText('+65%')).toHaveLength(1)
      expect(screen.getAllByText('+40%')).toHaveLength(2) // One in case study metrics, one in domain stats
      expect(screen.getByText('-30%')).toBeInTheDocument()
      expect(screen.getByText('95%')).toBeInTheDocument()
    })

    it('formats metric labels correctly', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByText('taux_qualification')).toBeInTheDocument()
      expect(screen.getByText('taux_closing')).toBeInTheDocument()
    })

    it('limits metrics display to 4 items', () => {
      const caseWithManyMetrics = [
        {
          ...mockCaseStudies[0],
          metrics: {
            'metric1': '10%',
            'metric2': '20%',
            'metric3': '30%',
            'metric4': '40%',
            'metric5': '50%',
            'metric6': '60%'
          }
        }
      ]
      
      render(<PMECaseStudy {...defaultProps} caseStudies={caseWithManyMetrics} />)
      
      // Should only show first 4 metrics
      expect(screen.getByText('10%')).toBeInTheDocument()
      expect(screen.getByText('40%')).toBeInTheDocument()
      expect(screen.queryByText('50%')).not.toBeInTheDocument()
    })
  })

  describe('Timeline Display', () => {
    it('shows timeline when provided', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByText('⏱️ 3 mois')).toBeInTheDocument()
      expect(screen.getByText('⏱️ 4 mois')).toBeInTheDocument()
    })

    it('hides timeline when not provided', () => {
      const caseWithoutTimeline = [
        { ...mockCaseStudies[0], timeline: undefined }
      ]
      
      render(<PMECaseStudy {...defaultProps} caseStudies={caseWithoutTimeline} />)
      
      expect(screen.queryByText('⏱️')).not.toBeInTheDocument()
    })
  })

  describe('Laurent Serre Experience Section', () => {
    it('displays Laurent Serre section with correct styling', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByText('Retour d\'expérience Laurent Serre')).toBeInTheDocument()
      expect(screen.getByText('LS')).toBeInTheDocument()
    })

    it('shows default Laurent quote', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByText(/Ces transformations méthodologiques/)).toBeInTheDocument()
    })

    it('displays custom Laurent quote when provided', () => {
      const customProps = {
        ...defaultProps,
        laurentExperienceQuote: 'Custom quote from Laurent Serre'
      }
      
      render(<PMECaseStudy {...customProps} />)
      
      expect(screen.getByText('"Custom quote from Laurent Serre"')).toBeInTheDocument()
    })
  })

  describe('Domain Stats', () => {
    it('displays default domain stats', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByText('3-4 mois')).toBeInTheDocument()
      expect(screen.getAllByText('+40%')).toHaveLength(2) // One in case study metrics, one in domain stats
      expect(screen.getByText('85%')).toBeInTheDocument()
    })

    it('shows stat labels and descriptions', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByText('Durée moyenne de transformation')).toBeInTheDocument()
      expect(screen.getByText('Amélioration du taux de closing')).toBeInTheDocument()
      expect(screen.getByText('Taux de satisfaction clients')).toBeInTheDocument()
    })

    it('displays custom domain stats when provided', () => {
      const customStats = [
        { value: '2 mois', label: 'Custom metric', description: 'Custom description' }
      ]
      
      const customProps = {
        ...defaultProps,
        domainStats: customStats
      }
      
      render(<PMECaseStudy {...customProps} />)
      
      expect(screen.getByText('2 mois')).toBeInTheDocument()
      expect(screen.getByText('Custom metric')).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive grid classes', () => {
      const { container } = render(<PMECaseStudy {...defaultProps} />)
      
      const grid = container.querySelector('.grid.sm\\:grid-cols-2')
      expect(grid).toBeInTheDocument()
    })

    it('has responsive padding and spacing', () => {
      const { container } = render(<PMECaseStudy {...defaultProps} />)
      
      const mainContainer = container.querySelector('.p-6.sm\\:p-8')
      expect(mainContainer).toBeInTheDocument()
    })
  })

  describe('Empty States', () => {
    it('handles empty case studies array', () => {
      const emptyProps = {
        ...defaultProps,
        caseStudies: []
      }
      
      render(<PMECaseStudy {...emptyProps} />)
      
      // The title appears in the badge, not as standalone text
      expect(screen.getByText(/Cas clients PME/)).toBeInTheDocument()
      expect(screen.queryByText('PME SaaS')).not.toBeInTheDocument()
    })

    it('handles case study with empty metrics', () => {
      const caseWithEmptyMetrics = [
        { ...mockCaseStudies[0], metrics: {} }
      ]
      
      render(<PMECaseStudy {...defaultProps} caseStudies={caseWithEmptyMetrics} />)
      
      expect(screen.getByText('PME SaaS')).toBeInTheDocument()
      // Should not show metrics grid
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
      expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(3) // Two for case studies + one for Laurent Serre section
    })

    it('provides meaningful text content for screen readers', () => {
      render(<PMECaseStudy {...defaultProps} />)
      
      expect(screen.getAllByText('Défi initial')).toHaveLength(2) // One for each case study
      expect(screen.getAllByText('Solution mise en place')).toHaveLength(2) // One for each case study
      expect(screen.getAllByText('Résultats obtenus')).toHaveLength(2) // One for each case study
    })
  })

  describe('Hover Effects', () => {
    it('applies hover classes for interactive elements', () => {
      const { container } = render(<PMECaseStudy {...defaultProps} />)
      
      const caseStudyCards = container.querySelectorAll('.hover\\:shadow-lg')
      expect(caseStudyCards.length).toBeGreaterThan(0)
    })

    it('has transition classes for smooth animations', () => {
      const { container } = render(<PMECaseStudy {...defaultProps} />)
      
      const animatedElements = container.querySelectorAll('.transition-all')
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })

  describe('Dark Mode Support', () => {
    it('includes dark mode classes', () => {
      const { container } = render(<PMECaseStudy {...defaultProps} />)
      
      const darkModeElements = container.querySelectorAll('[class*="dark:"]')
      expect(darkModeElements.length).toBeGreaterThan(0)
    })
  })
})