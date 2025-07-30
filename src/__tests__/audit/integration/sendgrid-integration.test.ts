import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { SendGridEmailService } from '@/lib/email/sendgrid-service'
import { ResourceRequestSystem } from '@/lib/email/resource-request-system'
import sgMail from '@sendgrid/mail'

// Mock SendGrid but allow some integration testing
vi.mock('@sendgrid/mail', () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn()
  }
}))

describe('SendGrid Integration Tests', () => {
  let emailService: SendGridEmailService
  let resourceRequestSystem: ResourceRequestSystem
  let mockSgMail: any

  const testConfig = {
    apiKey: process.env.SENDGRID_API_KEY || 'test-key',
    fromEmail: 'noreply@test.com',
    fromName: 'Test Audit System',
    adminEmail: 'admin@test.com'
  }

  beforeEach(() => {
    mockSgMail = vi.mocked(sgMail)
    emailService = new SendGridEmailService(testConfig)
    resourceRequestSystem = new ResourceRequestSystem({
      adminEmail: testConfig.adminEmail,
      maxRequestsPerDay: 100,
      enableAutoResponse: true,
      sendGridConfig: testConfig
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Email Template Rendering', () => {
    it('should render resource request email template correctly', async () => {
      const request = {
        userEmail: 'user@example.com',
        resourceUrl: '/downloads/important-guide.pdf',
        sourceUrl: 'https://example.com/resources',
        message: 'I need this for my project',
        requestCount: 7
      }

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      await emailService.sendResourceRequest(request)

      const emailCall = mockSgMail.send.mock.calls[0][0]
      
      // Verify email structure
      expect(emailCall.to).toBe(testConfig.adminEmail)
      expect(emailCall.from.email).toBe(testConfig.fromEmail)
      expect(emailCall.from.name).toBe(testConfig.fromName)
      
      // Verify subject line
      expect(emailCall.subject).toBe('Nouvelle demande de ressource - /downloads/important-guide.pdf')
      
      // Verify HTML content includes all required information
      expect(emailCall.html).toContain('user@example.com')
      expect(emailCall.html).toContain('/downloads/important-guide.pdf')
      expect(emailCall.html).toContain('https://example.com/resources')
      expect(emailCall.html).toContain('I need this for my project')
      expect(emailCall.html).toContain('7 fois')
      
      // Verify text content as fallback
      expect(emailCall.text).toContain('user@example.com')
      expect(emailCall.text).toContain('/downloads/important-guide.pdf')
    })

    it('should render audit alert email template correctly', async () => {
      const brokenLinks = [
        {
          url: 'https://external-site.com/broken',
          sourceFiles: ['homepage.tsx', 'navigation.tsx'],
          linkType: 'external' as const,
          priority: 'critical' as const,
          error: 'Connection timeout',
          suggestedActions: ['Check external site status', 'Consider alternative link'],
          seoImpact: 9
        },
        {
          url: '/internal/missing-page',
          sourceFiles: ['sidebar.tsx'],
          linkType: 'internal' as const,
          priority: 'high' as const,
          error: 'Page not found',
          suggestedActions: ['Create missing page', 'Update navigation'],
          seoImpact: 7
        }
      ]

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      await emailService.sendAuditAlert(brokenLinks)

      const emailCall = mockSgMail.send.mock.calls[0][0]
      
      // Verify alert email structure
      expect(emailCall.subject).toBe('🚨 Alerte : 2 liens morts détectés')
      expect(emailCall.html).toContain('2 liens morts')
      expect(emailCall.html).toContain('https://external-site.com/broken')
      expect(emailCall.html).toContain('/internal/missing-page')
      expect(emailCall.html).toContain('critical')
      expect(emailCall.html).toContain('Connection timeout')
    })
  })

  describe('Error Handling', () => {
    it('should handle SendGrid API errors gracefully', async () => {
      const request = {
        userEmail: 'test@example.com',
        resourceUrl: '/test-resource.pdf',
        sourceUrl: 'https://example.com',
        requestCount: 1
      }

      // Simulate SendGrid API error
      mockSgMail.send.mockRejectedValue({
        response: {
          status: 400,
          body: {
            errors: [
              {
                message: 'The from address does not match a verified Sender Identity',
                field: 'from',
                help: 'https://sendgrid.com/docs/for-developers/sending-email/sender-identity/'
              }
            ]
          }
        }
      })

      const result = await emailService.sendResourceRequest(request)

      expect(result).toBe(false)
      expect(mockSgMail.send).toHaveBeenCalledTimes(1)
    })

    it('should handle network timeouts', async () => {
      const brokenLinks = [{
        url: '/test',
        sourceFiles: ['test.tsx'],
        linkType: 'internal' as const,
        priority: 'medium' as const,
        error: 'Test error',
        suggestedActions: [],
        seoImpact: 5
      }]

      mockSgMail.send.mockRejectedValue(new Error('ETIMEDOUT'))

      const result = await emailService.sendAuditAlert(brokenLinks)

      expect(result).toBe(false)
    })
  })

  describe('Resource Request System Integration', () => {
    it('should handle complete resource request flow', async () => {
      const requestData = {
        userEmail: 'user@example.com',
        requestedUrl: '/downloads/comprehensive-guide.pdf',
        sourceUrl: 'https://example.com/resources-page',
        message: 'This looks very useful for my business'
      }

      // Mock database operations
      vi.spyOn(resourceRequestSystem as any, 'database', 'get').mockReturnValue({
        insertResourceRequest: vi.fn().mockResolvedValue('req_456'),
        getRequestCount: vi.fn().mockResolvedValue(3)
      })

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      const requestId = await resourceRequestSystem.submitRequest(requestData)

      expect(requestId).toBe('req_456')
      
      // Verify both admin notification and user auto-response were sent
      expect(mockSgMail.send).toHaveBeenCalledTimes(2)
      
      // First call should be admin notification
      const adminEmail = mockSgMail.send.mock.calls[0][0]
      expect(adminEmail.to).toBe(testConfig.adminEmail)
      expect(adminEmail.subject).toContain('Nouvelle demande de ressource')
      
      // Second call should be user auto-response
      const userEmail = mockSgMail.send.mock.calls[1][0]
      expect(userEmail.to).toBe('user@example.com')
      expect(userEmail.subject).toContain('Confirmation')
    })
  })

  describe('Email Content Validation', () => {
    it('should include proper HTML structure and styling', async () => {
      const request = {
        userEmail: 'test@example.com',
        resourceUrl: '/test.pdf',
        sourceUrl: 'https://example.com',
        requestCount: 1
      }

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      await emailService.sendResourceRequest(request)

      const emailCall = mockSgMail.send.mock.calls[0][0]
      const htmlContent = emailCall.html

      // Verify HTML structure
      expect(htmlContent).toContain('<div')
      expect(htmlContent).toContain('font-family')
      expect(htmlContent).toContain('max-width')
      
      // Verify proper encoding and special characters
      expect(htmlContent).toContain('📧') // Email emoji
      expect(htmlContent).toContain('📄') // Document emoji
      expect(htmlContent).toContain('🌐') // Globe emoji
    })

    it('should handle special characters in resource URLs', async () => {
      const request = {
        userEmail: 'test@example.com',
        resourceUrl: '/downloads/guide-français-&-spéciaux.pdf',
        sourceUrl: 'https://example.com/ressources?category=français',
        message: 'J\'ai besoin de ce guide en français',
        requestCount: 2
      }

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      await emailService.sendResourceRequest(request)

      const emailCall = mockSgMail.send.mock.calls[0][0]
      
      // Verify special characters are properly handled
      expect(emailCall.html).toContain('guide-français-&amp;-spéciaux.pdf')
      expect(emailCall.html).toContain('J&#x27;ai besoin')
      expect(emailCall.text).toContain('guide-français-&-spéciaux.pdf')
    })
  })
})