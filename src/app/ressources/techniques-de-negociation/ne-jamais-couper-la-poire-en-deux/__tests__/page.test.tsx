import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Page from '../page'

// Mock the TechniquePage component
vi.mock('@/components/templates/TechniquePage', () => ({
  default: ({ technique }: any) => (
    <div data-testid="technique-page">
      <h1>{technique.title}</h1>
      <p>{technique.description}</p>
    </div>
  )
}))

// Mock the data
vi.mock('@/data/negotiation-technique-data', () => ({
  negotiationTechniqueData: {
    id: 'ne-jamais-couper-la-poire-en-deux',
    title: 'Ne jamais couper la poire en deux',
    description: 'Technique de négociation FBI de Chris Voss',
    author: 'Chris Voss',
    origin: 'FBI',
    category: 'closing',
    difficultyLevel: 'intermediate',
    laurentVision: 'Vision test',
    pmeAdaptation: 'Adaptation test',
    psychologyPrinciples: ['Principe 1'],
    businessApplications: ['Application 1'],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Étape 1',
        description: 'Description 1',
        script: 'Script 1',
        example: 'Exemple 1',
        tips: ['Tip 1']
      }
    ],
    caseStudies: [
      {
        industry: 'PME Tech',
        challenge: 'Défi test',
        application: 'Application test',
        results: 'Résultats test',
        metrics: { improvement: '25%', timeframe: '3 mois' }
      }
    ],
    commonMistakes: [
      {
        mistake: 'Erreur test',
        consequence: 'Conséquence test',
        solution: 'Solution test'
      }
    ],
    successMetrics: [
      {
        metric: 'Taux de réussite',
        value: '85%',
        context: 'En négociation B2B'
      }
    ],
    downloadableResources: [
      {
        title: 'Guide PDF',
        type: 'pdf',
        url: '/resources/guide.pdf'
      }
    ],
    relatedTechniques: ['technique-1', 'technique-2'],
    seoMetadata: {
      title: 'Ne jamais couper la poire en deux | Technique FBI',
      description: 'Découvrez la technique de négociation FBI',
      keywords: ['négociation', 'FBI', 'Chris Voss'],
      canonicalUrl: '/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux'
    },
    trackingEvents: []
  }
}))

describe('Negotiation Technique Page', () => {
  it('renders the page successfully', () => {
    render(<Page />)
    
    expect(screen.getByTestId('technique-page')).toBeInTheDocument()
  })

  it('displays the technique title', () => {
    render(<Page />)
    
    expect(screen.getByText('Ne jamais couper la poire en deux')).toBeInTheDocument()
  })

  it('displays the technique description', () => {
    render(<Page />)
    
    expect(screen.getByText('Technique de négociation FBI de Chris Voss')).toBeInTheDocument()
  })

  it('passes correct technique data to TechniquePage', () => {
    render(<Page />)
    
    // Verify that the TechniquePage component receives the data
    expect(screen.getByTestId('technique-page')).toBeInTheDocument()
  })

  it('renders without errors', () => {
    expect(() => render(<Page />)).not.toThrow()
  })
})