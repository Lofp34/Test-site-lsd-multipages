import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CrossCategoryNavigation } from '../CrossCategoryNavigation'

describe('CrossCategoryNavigation', () => {
  const mockCurrentCategory = 'mindset-performance'
  const mockSuggestions = [
    {
      category: 'sales-management',
      title: 'Sales Management & Leadership',
      description: 'Développez vos compétences de management commercial',
      relevanceScore: 0.85,
      connectionReason: 'Complément naturel pour développer votre leadership'
    },
    {
      category: 'negotiation-closing',
      title: 'Négociation & Closing',
      description: 'Maîtrisez l\'art de la négociation commerciale',
      relevanceScore: 0.75,
      connectionReason: 'Le mindset influence directement vos performances en négociation'
    },
    {
      category: 'prospection-sdr',
      title: 'Prospection & SDR',
      description: 'Techniques modernes de prospection commerciale',
      relevanceScore: 0.65,
      connectionReason: 'Un bon mindset améliore votre efficacité en prospection'
    }
  ]

  it('renders current category correctly', () => {
    render(
      <CrossCategoryNavigation 
        currentCategory={mockCurrentCategory}
        suggestions={mockSuggestions}
      />
    )
    
    expect(screen.getByText(/Mindset & Performance/)).toBeInTheDocument()
  })

  it('displays all suggestions', () => {
    render(
      <CrossCategoryNavigation 
        currentCategory={mockCurrentCategory}
        suggestions={mockSuggestions}
      />
    )
    
    expect(screen.getByText('Sales Management & Leadership')).toBeInTheDocument()
    expect(screen.getByText('Négociation & Closing')).toBeInTheDocument()
    expect(screen.getByText('Prospection & SDR')).toBeInTheDocument()
  })

  it('shows connection reasons', () => {
    render(
      <CrossCategoryNavigation 
        currentCategory={mockCurrentCategory}
        suggestions={mockSuggestions}
      />
    )
    
    expect(screen.getByText('Complément naturel pour développer votre leadership')).toBeInTheDocument()
    expect(screen.getByText('Le mindset influence directement vos performances en négociation')).toBeInTheDocument()
  })

  it('displays relevance scores', () => {
    render(
      <CrossCategoryNavigation 
        currentCategory={mockCurrentCategory}
        suggestions={mockSuggestions}
      />
    )
    
    // Should show relevance indicators (stars, percentages, etc.)
    expect(screen.getByText(/85%|★★★★★/)).toBeInTheDocument()
  })

  it('orders suggestions by relevance score', () => {
    render(
      <CrossCategoryNavigation 
        currentCategory={mockCurrentCategory}
        suggestions={mockSuggestions}
      />
    )
    
    const suggestionElements = screen.getAllByTestId(/suggestion-/)
    
    // First suggestion should be the highest scored (sales-management with 0.85)
    expect(suggestionElements[0]).toHaveTextContent('Sales Management & Leadership')
  })

  it('handles click on suggestions', async () => {
    const user = userEvent.setup()
    
    render(
      <CrossCategoryNavigation 
        currentCategory={mockCurrentCategory}
        suggestions={mockSuggestions}
      />
    )
    
    const firstSuggestion = screen.getByText('Sales Management & Leadership')
    await user.click(firstSuggestion)
    
    // Should navigate (in real app, would check router.push)
    expect(firstSuggestion.closest('a')).toHaveAttribute('href', '/ressources/meilleurs-livres/sales-management')
  })

  it('handles empty suggestions array', () => {
    render(
      <CrossCategoryNavigation 
        currentCategory={mockCurrentCategory}
        suggestions={[]}
      />
    )
    
    expect(screen.queryByText('Sales Management & Leadership')).not.toBeInTheDocument()
    // Should show empty state or hide component
  })

  it('applies correct styling for different relevance scores', () => {
    render(
      <CrossCategoryNavigation 
        currentCategory={mockCurrentCategory}
        suggestions={mockSuggestions}
      />
    )
    
    // High relevance should have different styling than low relevance
    const highRelevanceElement = screen.getByTestId('suggestion-sales-management')
    const lowRelevanceElement = screen.getByTestId('suggestion-prospection-sdr')
    
    expect(highRelevanceElement).toHaveClass('border-green-200')
    expect(lowRelevanceElement).toHaveClass('border-gray-200')
  })

  it('is accessible', () => {
    render(
      <CrossCategoryNavigation 
        currentCategory={mockCurrentCategory}
        suggestions={mockSuggestions}
      />
    )
    
    // Should have proper navigation structure
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    
    // Should have proper link structure
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
    
    // Links should have proper accessibility attributes
    links.forEach(link => {
      expect(link).toHaveAttribute('href')
    })
  })

  it('shows category descriptions', () => {
    render(
      <CrossCategoryNavigation 
        currentCategory={mockCurrentCategory}
        suggestions={mockSuggestions}
      />
    )
    
    expect(screen.getByText('Développez vos compétences de management commercial')).toBeInTheDocument()
    expect(screen.getByText('Maîtrisez l\'art de la négociation commerciale')).toBeInTheDocument()
  })

  it('handles different current categories', () => {
    const { rerender } = render(
      <CrossCategoryNavigation 
        currentCategory="sales-management"
        suggestions={mockSuggestions}
      />
    )
    
    expect(screen.getByText(/Sales Management/)).toBeInTheDocument()
    
    rerender(
      <CrossCategoryNavigation 
        currentCategory="digital-ai"
        suggestions={mockSuggestions}
      />
    )
    
    expect(screen.getByText(/Digital & AI/)).toBeInTheDocument()
  })
})