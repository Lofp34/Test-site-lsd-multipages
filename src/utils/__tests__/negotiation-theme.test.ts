import { describe, it, expect } from 'vitest'
import { 
  getNegotiationTheme, 
  applyNegotiationTheme, 
  generateNegotiationGradient,
  getNegotiationButtonClass,
  getNegotiationBadgeClass
} from '../negotiation-theme'

describe('negotiation-theme utilities', () => {
  describe('getNegotiationTheme', () => {
    it('returns correct theme object', () => {
      const theme = getNegotiationTheme()
      
      expect(theme.primary).toBe('#DC2626')
      expect(theme.accent).toBe('#EA580C')
      expect(theme.particle).toBe('#DC2626')
      expect(theme.gradient).toBe('from-red-600 via-orange-500/10 to-primary-bg')
    })

    it('includes all required theme properties', () => {
      const theme = getNegotiationTheme()
      
      expect(theme).toHaveProperty('primary')
      expect(theme).toHaveProperty('accent')
      expect(theme).toHaveProperty('particle')
      expect(theme).toHaveProperty('gradient')
    })
  })

  describe('applyNegotiationTheme', () => {
    it('applies theme to DOM element', () => {
      const element = document.createElement('div')
      applyNegotiationTheme(element)
      
      expect(element.style.getPropertyValue('--negotiation-primary')).toBe('#DC2626')
      expect(element.style.getPropertyValue('--negotiation-accent')).toBe('#EA580C')
    })

    it('handles null element gracefully', () => {
      expect(() => applyNegotiationTheme(null)).not.toThrow()
    })
  })

  describe('generateNegotiationGradient', () => {
    it('generates correct gradient string', () => {
      const gradient = generateNegotiationGradient()
      
      expect(gradient).toContain('from-red-600')
      expect(gradient).toContain('via-orange-500/10')
      expect(gradient).toContain('to-primary-bg')
    })

    it('accepts custom direction', () => {
      const gradient = generateNegotiationGradient('to-r')
      
      expect(gradient).toContain('bg-gradient-to-r')
    })
  })

  describe('getNegotiationButtonClass', () => {
    it('returns primary button classes', () => {
      const classes = getNegotiationButtonClass('primary')
      
      expect(classes).toContain('bg-red-600')
      expect(classes).toContain('hover:bg-red-700')
      expect(classes).toContain('text-white')
    })

    it('returns secondary button classes', () => {
      const classes = getNegotiationButtonClass('secondary')
      
      expect(classes).toContain('border-red-600')
      expect(classes).toContain('text-red-600')
      expect(classes).toContain('hover:bg-red-50')
    })

    it('returns outline button classes', () => {
      const classes = getNegotiationButtonClass('outline')
      
      expect(classes).toContain('border-2')
      expect(classes).toContain('border-red-600')
    })

    it('handles invalid variant gracefully', () => {
      const classes = getNegotiationButtonClass('invalid' as any)
      
      expect(classes).toContain('bg-red-600') // defaults to primary
    })
  })

  describe('getNegotiationBadgeClass', () => {
    it('returns primary badge classes', () => {
      const classes = getNegotiationBadgeClass('primary')
      
      expect(classes).toContain('bg-red-600')
      expect(classes).toContain('text-white')
    })

    it('returns secondary badge classes', () => {
      const classes = getNegotiationBadgeClass('secondary')
      
      expect(classes).toContain('bg-orange-500')
      expect(classes).toContain('text-white')
    })

    it('returns outline badge classes', () => {
      const classes = getNegotiationBadgeClass('outline')
      
      expect(classes).toContain('border')
      expect(classes).toContain('border-red-600')
      expect(classes).toContain('text-red-600')
    })

    it('includes common badge styles', () => {
      const classes = getNegotiationBadgeClass('primary')
      
      expect(classes).toContain('px-2')
      expect(classes).toContain('py-1')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('text-xs')
      expect(classes).toContain('font-semibold')
    })
  })
})