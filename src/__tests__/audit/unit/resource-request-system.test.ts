import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ResourceRequestSystem } from '@/lib/email/resource-request-system'
import { SendGridEmailService } from '@/lib/email/sendgrid-service'
import type { ResourceRequest } from '@/lib/audit/types'

// Mock dependencies
vi.mock('@/lib/email/sendgrid-service')
vi.mock('@/lib/audit/database')

describe('ResourceRequestSystem', () => {
  let resourceRequestSystem: ResourceRequestSystem
  let mockEmailService: any
  let mockDatabase: any

  const mockConfig = {
    adminEmail: 'admin@example.com',
    maxRequestsPerDay: 100,
    enableAutoResponse: true,
    sendGridConfig: {
      apiKey: 'test-key',
      fromEmail: 'noreply@example.com',
      fromName: 'Test System',
      adminEmail: 'admin@example.com'
    }
  }

  beforeEach(() => {
    mockEmailService = {
      sendResourceRequest: vi.fn(),
      sendAutoResponse: vi.fn()
    }
    mockDatabase = {
      insertResourceRequest: vi.fn(),
      getRequestCount: vi.fn(),
      getRequestStats: vi.fn(),
      getMostRequestedResources: vi.fn()
    }

    vi.mocked(SendGridEmailService).mockImplementation(() => mockEmailService)
    
    resourceRequestSystem = new ResourceRequestSystem(mockConfig)
    ;(resourceRequestSystem as any).database = mockDatabase
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('submitRequest', () => {
    it('should submit resource request successfully', async () => {
      const requestData = {
        userEmail: 'user@example.com',
        requestedUrl: '/downloads/guide.pdf',
        sourceUrl: 'https://example.com/page',
        message: 'I need this resource'
      }

      mockDatabase.insertResourceRequest.mockResolvedValue('req_123')
      mockDatabase.getRequestCount.mockResolvedValue(5)
      mockEmailService.sendResourceRequest.mockResolvedValue(true)
      mockEmailService.sendAutoResponse.mockResolvedValue(true)

      const requestId = await resourceRequestSystem.submitRequest(requestData)

      expect(requestId).toBe('req_123')
      expect(mockDatabase.insertResourceRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          ...requestData,
          status: 'pending',
          priority: expect.any(Number)
        })
      )
      expect(mockEmailService.sendResourceRequest).toHaveBeenCalled()
      expect(mockEmailService.sendAutoResponse).toHaveBeenCalledWith(
        'user@example.com',
        '/downloads/guide.pdf'
      )
    })
  })
})