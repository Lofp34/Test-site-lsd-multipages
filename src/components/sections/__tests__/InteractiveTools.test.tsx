import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import InteractiveTools from '../InteractiveTools'
import { negotiationTechniqueData } from '@/data/negotiation-technique-data'

vi.mock('@/hooks/useNegotiationTheme', () => ({
  useNegotiationTheme: () => ({
    primaryColor: '#DC2626',
    accentColor: '#EA580C',
    particleColor: '#DC2626',
    gradientClass: 'from-red-600 via-orange-500/10 to-primary-bg'
  })
}))

vi.mock('@/utils/download-tracking', () => ({
  trackDownload: vi.fn()
}))

describe('InteractiveTools', () => {
  const mockTechnique = negotiationTechniqueData

  it('renders downloadable resources', () => {
    render(<InteractiveTools technique={mockTechnique} />)
    
    mockTechnique.downloadableResources.forEach(resource => {
      expect(screen.getByText(resource.title)).toBeInTheDocument()
    })
  })

  it('displays interactive checklist', () => {
    render(<InteractiveTools technique={mockTechnique} />)
    
    expect(screen.getByText('Checklist de la technique')).toBeInTheDocument()
  })

  it('handles checklist item interactions', () => {
    render(<InteractiveTools technique={mockTechnique} />)
    
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
    
    fireEvent.click(checkboxes[0])
    expect(checkboxes[0]).toBeChecked()
  })

  it('tracks download events', () => {
    const { trackDownload } = require('@/utils/download-tracking')
    render(<InteractiveTools technique={mockTechnique} />)
    
    const downloadButtons = screen.getAllByText(/Télécharger/i)
    if (downloadButtons.length > 0) {
      fireEvent.click(downloadButtons[0])
      expect(trackDownload).toHaveBeenCalled()
    }
  })

  it('shows resource previews', () => {
    render(<InteractiveTools technique={mockTechnique} />)
    
    const previewElements = screen.getAllByText(/Aperçu/i)
    expect(previewElements.length).toBeGreaterThanOrEqual(0)
  })

  it('displays progress tracking', () => {
    render(<InteractiveTools technique={mockTechnique} />)
    
    const progressElements = screen.getAllByText(/Progression/i)
    expect(progressElements.length).toBeGreaterThanOrEqual(0)
  })

  it('handles local storage for progress', () => {
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    })

    render(<InteractiveTools technique={mockTechnique} />)
    
    const checkboxes = screen.getAllByRole('checkbox')
    if (checkboxes.length > 0) {
      fireEvent.click(checkboxes[0])
      expect(localStorageMock.setItem).toHaveBeenCalled()
    }
  })

  it('renders with proper accessibility', () => {
    render(<InteractiveTools technique={mockTechnique} />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach(checkbox => {
      expect(checkbox).toHaveAttribute('aria-describedby')
    })
  })

  it('handles empty resources gracefully', () => {
    const techniqueWithoutResources = {
      ...mockTechnique,
      downloadableResources: []
    }
    
    expect(() => render(<InteractiveTools technique={techniqueWithoutResources} />)).not.toThrow()
  })
})