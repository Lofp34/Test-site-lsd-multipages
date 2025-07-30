import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { SendGridEmailService } from '@/lib/email/sendgrid-service'
import type { ResourceRequestEmail, BrokenLinkDetail, AuditReport } from '@/lib/audit/types'
import sgMail from '@sendgrid/mail'

// Mock SendGrid
vi.mock('@sendgrid/mail', () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn()
  }
}))

describe('SendGridEmailService', () => {
  let emailService: SendGridEmailService
  let mockSgMail: any

  const mockConfig = {
    apiKey: 'test-api-key',
    fromEmail: 'noreply@example.com',
    fromName: 'Test System',
    adminEmail: 'admin@example.com'
  }

  beforeEach(() => {
    mockSgMail = vi.mocked(sgMail)
    emailService = new SendGridEmailService(mockConfig)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('constructor', () => {
    it('should initialize SendGrid with API key', () => {
      expect(mockSgMail.setApiKey).toHaveBeenCalledWith('test-api-key')
    })
  })

  describe('sendResourceRequest', () => {
    it('should send resource request email successfully', async () => {
      const request: ResourceRequestEmail = {
        userEmail: 'user@example.com',
        resourceUrl: '/downloads/guide.pdf',
        sourceUrl: 'https://example.com/page',
        message: 'I need this resource for my project',
        requestCount: 3
      }

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      const result = await emailService.sendResourceRequest(request)

      expect(result).toBe(true)
      expect(mockSgMail.send).toHaveBeenCalledWith({
        to: 'admin@example.com',
        from: {
          email: 'noreply@example.com',
          name: 'Test System'
        },
        subject: 'Nouvelle demande de ressource - /downloads/guide.pdf',
        html: expect.stringContaining('user@example.com'),
        text: expect.stringContaining('user@example.com')
      })
    })

    it('should handle SendGrid errors', async () => {
      const request: ResourceRequestEmail = {
        userEmail: 'user@example.com',
        resourceUrl: '/downloads/guide.pdf',
        sourceUrl: 'https://example.com/page',
        requestCount: 1
      }

      mockSgMail.send.mockRejectedValue(new Error('SendGrid API error'))

      const result = await emailService.sendResourceRequest(request)

      expect(result).toBe(false)
    })

    it('should include request count in email', async () => {
      const request: ResourceRequestEmail = {
        userEmail: 'user@example.com',
        resourceUrl: '/popular-resource.pdf',
        sourceUrl: 'https://example.com/page',
        requestCount: 15
      }

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      await emailService.sendResourceRequest(request)

      const emailCall = mockSgMail.send.mock.calls[0][0]
      expect(emailCall.html).toContain('15 fois')
      expect(emailCall.subject).toContain('popular-resource.pdf')
    })
  })

  describe('sendAuditAlert', () => {
    it('should send audit alert for broken links', async () => {
      const brokenLinks: BrokenLinkDetail[] = [
        {
          url: 'https://example.com/broken1',
          sourceFiles: ['page.tsx'],
          linkType: 'external',
          priority: 'critical',
          error: 'Not Found',
          suggestedActions: ['Fix URL'],
          seoImpact: 9
        },
        {
          url: '/internal-broken',
          sourceFiles: ['component.tsx'],
          linkType: 'internal',
          priority: 'high',
          error: 'Page not found',
          suggestedActions: ['Create page'],
          seoImpact: 7
        }
      ]

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      const result = await emailService.sendAuditAlert(brokenLinks)

      expect(result).toBe(true)
      expect(mockSgMail.send).toHaveBeenCalledWith({
        to: 'admin@example.com',
        from: {
          email: 'noreply@example.com',
          name: 'Test System'
        },
        subject: '🚨 Alerte : 2 liens morts détectés',
        html: expect.stringContaining('liens morts'),
        text: expect.stringContaining('liens morts')
      })
    })

    it('should not send alert for empty broken links', async () => {
      const result = await emailService.sendAuditAlert([])

      expect(result).toBe(true)
      expect(mockSgMail.send).not.toHaveBeenCalled()
    })

    it('should prioritize critical links in alert', async () => {
      const brokenLinks: BrokenLinkDetail[] = [
        {
          url: '/critical-page',
          sourceFiles: ['homepage.tsx'],
          linkType: 'internal',
          priority: 'critical',
          error: 'Not Found',
          suggestedActions: ['Urgent fix needed'],
          seoImpact: 10
        },
        {
          url: '/minor-page',
          sourceFiles: ['footer.tsx'],
          linkType: 'internal',
          priority: 'low',
          error: 'Not Found',
          suggestedActions: ['Can be removed'],
          seoImpact: 1
        }
      ]

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      await emailService.sendAuditAlert(brokenLinks)

      const emailCall = mockSgMail.send.mock.calls[0][0]
      const htmlContent = emailCall.html
      
      // Critical link should appear first
      const criticalIndex = htmlContent.indexOf('/critical-page')
      const minorIndex = htmlContent.indexOf('/minor-page')
      expect(criticalIndex).toBeLessThan(minorIndex)
    })
  })

  describe('sendAutoResponse', () => {
    it('should send auto-response to user', async () => {
      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      const result = await emailService.sendAutoResponse(
        'user@example.com',
        '/downloads/guide.pdf'
      )

      expect(result).toBe(true)
      expect(mockSgMail.send).toHaveBeenCalledWith({
        to: 'user@example.com',
        from: {
          email: 'noreply@example.com',
          name: 'Test System'
        },
        subject: 'Confirmation de votre demande de ressource',
        html: expect.stringContaining('guide.pdf'),
        text: expect.stringContaining('guide.pdf')
      })
    })

    it('should handle auto-response errors gracefully', async () => {
      mockSgMail.send.mockRejectedValue(new Error('Invalid email'))

      const result = await emailService.sendAutoResponse(
        'invalid-email',
        '/resource.pdf'
      )

      expect(result).toBe(false)
    })
  })

  describe('sendWeeklyReport', () => {
    it('should send weekly audit report', async () => {
      const report: AuditReport = {
        timestamp: new Date('2024-01-07T10:00:00Z'),
        summary: {
          totalLinks: 100,
          validLinks: 95,
          brokenLinks: 5,
          correctedLinks: 2,
          pendingLinks: 0,
          seoHealthScore: 95
        },
        brokenLinks: [],
        corrections: [],
        recommendations: ['Fix remaining broken links'],
        seoImpact: {
          criticalIssues: 1,
          estimatedTrafficLoss: 5,
          affectedPages: ['page1.tsx'],
          priorityActions: ['Fix critical link'],
          linkHealthScore: 95
        },
        resourceRequests: {
          totalRequests: 12,
          mostRequested: [
            { url: '/guide.pdf', count: 5 },
            { url: '/template.docx', count: 3 }
          ]
        }
      }

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      const result = await emailService.sendWeeklyReport(report)

      expect(result).toBe(true)
      expect(mockSgMail.send).toHaveBeenCalledWith({
        to: 'admin@example.com',
        from: {
          email: 'noreply@example.com',
          name: 'Test System'
        },
        subject: 'Rapport hebdomadaire - Audit des liens',
        html: expect.stringContaining('95%'),
        text: expect.stringContaining('95%')
      })
    })

    it('should include resource request statistics', async () => {
      const report: AuditReport = {
        timestamp: new Date(),
        summary: {
          totalLinks: 50,
          validLinks: 50,
          brokenLinks: 0,
          correctedLinks: 0,
          pendingLinks: 0,
          seoHealthScore: 100
        },
        brokenLinks: [],
        corrections: [],
        recommendations: [],
        seoImpact: {
          criticalIssues: 0,
          estimatedTrafficLoss: 0,
          affectedPages: [],
          priorityActions: [],
          linkHealthScore: 100
        },
        resourceRequests: {
          totalRequests: 25,
          mostRequested: [
            { url: '/popular-guide.pdf', count: 10 },
            { url: '/checklist.docx', count: 8 }
          ]
        }
      }

      mockSgMail.send.mockResolvedValue([{ statusCode: 202 }])

      await emailService.sendWeeklyReport(report)

      const emailCall = mockSgMail.send.mock.calls[0][0]
      expect(emailCall.html).toContain('25 demandes')
      expect(emailCall.html).toContain('popular-guide.pdf')
      expect(emailCall.html).toContain('10 fois')
    })
  })

  describe('template generation', () => {
    it('should generate resource request template correctly', () => {
      const request: ResourceRequestEmail = {
        userEmail: 'test@example.com',
        resourceUrl: '/test-resource.pdf',
        sourceUrl: 'https://example.com/source',
        message: 'Test message',
        requestCount: 5
      }

      const template = (emailService as any).generateResourceRequestTemplate(request)

      expect(template.subject).toBe('Nouvelle demande de ressource - /test-resource.pdf')
      expect(template.htmlContent).toContain('test@example.com')
      expect(template.htmlContent).toContain('/test-resource.pdf')
      expect(template.htmlContent).toContain('5 fois')
      expect(template.htmlContent).toContain('Test message')
      expect(template.textContent).toContain('test@example.com')
    })

    it('should generate alert template correctly', () => {
      const brokenLinks: BrokenLinkDetail[] = [
        {
          url: '/broken-link',
          sourceFiles: ['test.tsx'],
          linkType: 'internal',
          priority: 'critical',
          error: 'Not Found',
          suggestedActions: ['Fix immediately'],
          seoImpact: 9
        }
      ]

      const template = (emailService as any).generateAlertTemplate(brokenLinks)

      expect(template.subject).toBe('🚨 Alerte : 1 liens morts détectés')
      expect(template.htmlContent).toContain('/broken-link')
      expect(template.htmlContent).toContain('Not Found')
      expect(template.htmlContent).toContain('critical')
      expect(template.textContent).toContain('/broken-link')
    })
  })

  describe('error handling', () => {
    it('should handle network errors', async () => {
      const request: ResourceRequestEmail = {
        userEmail: 'user@example.com',
        resourceUrl: '/resource.pdf',
        sourceUrl: 'https://example.com',
        requestCount: 1
      }

      mockSgMail.send.mockRejectedValue(new Error('Network timeout'))

      const result = await emailService.sendResourceRequest(request)

      expect(result).toBe(false)
    })

    it('should handle SendGrid API errors', async () => {
      const brokenLinks: BrokenLinkDetail[] = [
        {
          url: '/test',
          sourceFiles: ['test.tsx'],
          linkType: 'internal',
          priority: 'high',
          error: 'Error',
          suggestedActions: [],
          seoImpact: 5
        }
      ]

      mockSgMail.send.mockRejectedValue({
        response: {
          body: {
            errors: [{ message: 'Invalid API key' }]
          }
        }
      })

      const result = await emailService.sendAuditAlert(brokenLinks)

      expect(result).toBe(false)
    })
  })
})