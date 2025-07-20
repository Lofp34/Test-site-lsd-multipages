import { render, screen } from '@testing-library/react'
import CaseStudyGrid from '../CaseStudyGrid'

describe('CaseStudyGrid', () => {
  const mockCaseStudies = [
    {
      industry: 'Technologie',
      companySize: '50 salariés',
      challenge: 'Faible taux de conversion',
      solution: 'Mise en place de processus structurés',
      results: '+45% de taux de conversion',
      metrics: {
        before: '15% conversion',
        after: '60% conversion',
        timeline: '6 mois'
      }
    },
    {
      industry: 'Services B2B',
      companySize: '25 salariés',
      challenge: 'Équipe commerciale désorganisée',
      solution: 'Formation et coaching intensif',
      results: '+60% de performance équipe',
      metrics: {
        before: '2 deals/mois',
        after: '8 deals/mois',
        timeline: '4 mois'
      }
    }
  ]

  it('renders all case studies', () => {
    render(<CaseStudyGrid caseStudies={mockCaseStudies} />)
    
    expect(screen.getByText('Technologie')).toBeInTheDocument()
    expect(screen.getByText('Services B2B')).toBeInTheDocument()
  })

  it('displays case study details correctly', () => {
    render(<CaseStudyGrid caseStudies={mockCaseStudies} />)
    
    // Check first case study details
    expect(screen.getByText('Technologie')).toBeInTheDocument()
    expect(screen.getByText('50 salariés')).toBeInTheDocument()
    expect(screen.getByText('Faible taux de conversion')).toBeInTheDocument()
    expect(screen.getByText('Mise en place de processus structurés')).toBeInTheDocument()
    expect(screen.getByText('+45% de taux de conversion')).toBeInTheDocument()
  })

  it('displays metrics correctly', () => {
    render(<CaseStudyGrid caseStudies={mockCaseStudies} />)
    
    expect(screen.getByText('+150K€')).toBeInTheDocument()
    expect(screen.getByText('+45%')).toBeInTheDocument()
    expect(screen.getByText('+30%')).toBeInTheDocument()
  })

  it('handles empty case studies array', () => {
    render(<CaseStudyGrid caseStudies={[]} />)
    
    // Should render empty state or nothing
    expect(screen.queryByText('TechCorp PME')).not.toBeInTheDocument()
  })

  it('applies correct grid layout', () => {
    render(<CaseStudyGrid caseStudies={mockCaseStudies} />)
    
    const gridContainer = screen.getByTestId('case-study-grid')
    expect(gridContainer).toHaveClass('grid')
  })

  it('is accessible', () => {
    render(<CaseStudyGrid caseStudies={mockCaseStudies} />)
    
    // Should have proper heading structure
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(2)
    
    // Should have proper structure for metrics
    expect(screen.getAllByRole('list')).toHaveLength(2)
  })

  it('handles long text content gracefully', () => {
    const longTextCaseStudy = [{
      ...mockCaseStudies[0],
      challenge: 'Very long challenge description that should be handled gracefully without breaking the layout or causing overflow issues',
      solution: 'Very long solution description that should also be handled properly'
    }]
    
    render(<CaseStudyGrid caseStudies={longTextCaseStudy} />)
    
    expect(screen.getByText(/Very long challenge description/)).toBeInTheDocument()
    expect(screen.getByText(/Very long solution description/)).toBeInTheDocument()
  })
})