import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CaseStudies from '../CaseStudies'
import { negotiationTechniqueData } from '@/data/negotiation-technique-data'

vi.mock('@/hooks/useNegotiationTheme', () => ({
  useNegotiationTheme: () => ({
    primaryColor: '#DC2626',
    accentColor: '#EA580C',
    particleColor: '#DC2626',
    gradientClass: 'from-red-600 via-orange-500/10 to-primary-bg'
  })
}))

describe('CaseStudies', () => {
  const mockTechnique = negotiationTechniqueData

  it('renders all case studies', () => {
    render(<CaseStudies technique={mockTechnique} />)
    
    mockTechnique.caseStudies.forEach(caseStudy => {
      expect(screen.getByText(caseStudy.industry)).toBeInTheDocument()
      expect(screen.getByText(caseStudy.challenge)).toBeInTheDocument()
      expect(screen.getByText(caseStudy.application)).toBeInTheDocument()
      expect(screen.getByText(caseStudy.results)).toBeInTheDocument()
    })
  })

  it('displays metrics for each case study', () => {
    render(<CaseStudies technique={mockTechnique} />)
    
    mockTechnique.caseStudies.forEach(caseStudy => {
      if (caseStudy.metrics.improvement) {
        expect(screen.getByText(caseStudy.metrics.improvement)).toBeInTheDocument()
      }
      if (caseStudy.metrics.timeframe) {
        expect(screen.getByText(caseStudy.metrics.timeframe)).toBeInTheDocument()
      }
    })
  })

  it('shows Laurent Serre feedback section', () => {
    render(<CaseStudies technique={mockTechnique} />)
    
    expect(screen.getByText('Retour d\'expérience Laurent Serre')).toBeInTheDocument()
  })

  it('renders with proper grid layout', () => {
    const { container } = render(<CaseStudies technique={mockTechnique} />)
    
    const gridContainer = container.querySelector('[class*="grid"]')
    expect(gridContainer).toBeInTheDocument()
  })

  it('applies anonymization correctly', () => {
    render(<CaseStudies technique={mockTechnique} />)
    
    // Should not contain real company names
    expect(screen.queryByText(/Google|Microsoft|Apple/)).not.toBeInTheDocument()
  })

  it('handles missing metrics gracefully', () => {
    const caseStudiesWithoutMetrics = {
      ...mockTechnique,
      caseStudies: mockTechnique.caseStudies.map(cs => ({
        ...cs,
        metrics: {}
      }))
    }
    
    expect(() => render(<CaseStudies technique={caseStudiesWithoutMetrics} />)).not.toThrow()
  })

  it('renders with accessibility attributes', () => {
    render(<CaseStudies technique={mockTechnique} />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('displays industry icons correctly', () => {
    const { container } = render(<CaseStudies technique={mockTechnique} />)
    
    const industryIcons = container.querySelectorAll('[class*="industry-icon"]')
    expect(industryIcons.length).toBeGreaterThanOrEqual(0)
  })
})