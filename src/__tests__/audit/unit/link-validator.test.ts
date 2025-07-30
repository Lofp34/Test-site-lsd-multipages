import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { LinkValidator } from '@/lib/audit/link-validator'
import { LocalFileValidator } from '@/lib/audit/local-file-validator'
import { BatchValidator } from '@/lib/audit/batch-validator'
import type { ValidationResult, ValidationConfig } from '@/lib/audit/types'
import axios from 'axios'

// Mock dependencies
vi.mock('axios')
vi.mock('@/lib/audit/local-file-validator')
vi.mock('@/lib/audit/batch-validator')

describe('LinkValidator', () => {
  let linkValidator: LinkValidator
  let mockLocalFileValidator: any
  let mockBatchValidator: any
  let mockAxios: any

  const mockConfig: ValidationConfig = {
    timeout: 5000,
    retryAttempts: 3,
    userAgent: 'Test Bot',
    followRedirects: true,
    checkAnchors: true,
    batchSize: 10,
    rateLimitDelay: 100
  }

  beforeEach(() => {
    mockLocalFileValidator = {
      validateFile: vi.fn(),
      validateInternalRoute: vi.fn()
    }
    mockBatchValidator = {
      validateBatch: vi.fn()
    }
    mockAxios = vi.mocked(axios)

    vi.mocked(LocalFileValidator).mockImplementation(() => mockLocalFileValidator)
    vi.mocked(BatchValidator).mockImplementation(() => mockBatchValidator)

    linkValidator = new LinkValidator()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('validateLink', () => {
    it('should validate external HTTP link successfully', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'text/html' }
      }
      mockAxios.get.mockResolvedValue(mockResponse)

      const result = await linkValidator.validateLink('https://example.com', mockConfig)

      expect(result).toEqual({
        url: 'https://example.com',
        status: 'valid',
        statusCode: 200,
        responseTime: expect.any(Number),
        lastChecked: expect.any(Date)
      })
    })

    it('should handle 404 errors', async () => {
      const mockError = {
        response: {
          status: 404,
          statusText: 'Not Found'
        }
      }
      mockAxios.get.mockRejectedValue(mockError)

      const result = await linkValidator.validateLink('https://example.com/404', mockConfig)

      expect(result).toEqual({
        url: 'https://example.com/404',
        status: 'broken',
        statusCode: 404,
        error: 'Not Found',
        responseTime: expect.any(Number),
        lastChecked: expect.any(Date)
      })
    })

    it('should handle redirects', async () => {
      const mockResponse = {
        status: 301,
        statusText: 'Moved Permanently',
        headers: { location: 'https://example.com/new-url' }
      }
      mockAxios.get.mockResolvedValue(mockResponse)

      const result = await linkValidator.validateLink('https://example.com/old-url', mockConfig)

      expect(result).toEqual({
        url: 'https://example.com/old-url',
        status: 'redirect',
        statusCode: 301,
        redirectUrl: 'https://example.com/new-url',
        responseTime: expect.any(Number),
        lastChecked: expect.any(Date)
      })
    })

    it('should handle timeout errors', async () => {
      mockAxios.get.mockRejectedValue({ code: 'ECONNABORTED' })

      const result = await linkValidator.validateLink('https://slow-site.com', mockConfig)

      expect(result.status).toBe('timeout')
      expect(result.error).toContain('timeout')
    })

    it('should validate internal routes', async () => {
      mockLocalFileValidator.validateInternalRoute.mockResolvedValue(true)

      const result = await linkValidator.validateLink('/internal-page', mockConfig)

      expect(mockLocalFileValidator.validateInternalRoute).toHaveBeenCalledWith('/internal-page')
      expect(result.status).toBe('valid')
    })

    it('should validate local files', async () => {
      mockLocalFileValidator.validateFile.mockResolvedValue(true)

      const result = await linkValidator.validateLink('/downloads/file.pdf', mockConfig)

      expect(mockLocalFileValidator.validateFile).toHaveBeenCalledWith('/downloads/file.pdf')
      expect(result.status).toBe('valid')
    })
  })

  describe('validateBatch', () => {
    it('should validate multiple links in batches', async () => {
      const urls = [
        'https://example.com/1',
        'https://example.com/2',
        'https://example.com/3'
      ]

      const mockResults: ValidationResult[] = urls.map(url => ({
        url,
        status: 'valid',
        statusCode: 200,
        responseTime: 100,
        lastChecked: new Date()
      }))

      mockBatchValidator.validateBatch.mockResolvedValue(mockResults)

      const results = await linkValidator.validateBatch(urls, mockConfig)

      expect(mockBatchValidator.validateBatch).toHaveBeenCalledWith(urls, mockConfig)
      expect(results).toEqual(mockResults)
    })

    it('should handle batch validation errors', async () => {
      const urls = ['https://example.com/error']
      mockBatchValidator.validateBatch.mockRejectedValue(new Error('Batch failed'))

      const results = await linkValidator.validateBatch(urls, mockConfig)

      expect(results).toEqual([])
    })
  })

  describe('checkFileExists', () => {
    it('should check if local file exists', async () => {
      mockLocalFileValidator.validateFile.mockResolvedValue(true)

      const exists = await linkValidator.checkFileExists('/public/image.jpg')

      expect(mockLocalFileValidator.validateFile).toHaveBeenCalledWith('/public/image.jpg')
      expect(exists).toBe(true)
    })

    it('should return false for non-existent files', async () => {
      mockLocalFileValidator.validateFile.mockResolvedValue(false)

      const exists = await linkValidator.checkFileExists('/public/missing.jpg')

      expect(exists).toBe(false)
    })
  })

  describe('validateInternalRoute', () => {
    it('should validate Next.js routes', async () => {
      mockLocalFileValidator.validateInternalRoute.mockResolvedValue(true)

      const isValid = await linkValidator.validateInternalRoute('/about')

      expect(mockLocalFileValidator.validateInternalRoute).toHaveBeenCalledWith('/about')
      expect(isValid).toBe(true)
    })

    it('should return false for invalid routes', async () => {
      mockLocalFileValidator.validateInternalRoute.mockResolvedValue(false)

      const isValid = await linkValidator.validateInternalRoute('/non-existent')

      expect(isValid).toBe(false)
    })
  })

  describe('retry mechanism', () => {
    it('should retry failed requests', async () => {
      mockAxios.get
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({ status: 200, statusText: 'OK' })

      const result = await linkValidator.validateLink('https://flaky-site.com', mockConfig)

      expect(mockAxios.get).toHaveBeenCalledTimes(3)
      expect(result.status).toBe('valid')
    })

    it('should fail after max retries', async () => {
      mockAxios.get.mockRejectedValue(new Error('Persistent error'))

      const result = await linkValidator.validateLink('https://broken-site.com', mockConfig)

      expect(mockAxios.get).toHaveBeenCalledTimes(mockConfig.retryAttempts)
      expect(result.status).toBe('broken')
    })
  })
})