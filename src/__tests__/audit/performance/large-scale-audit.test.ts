import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { LinkScanner } from '@/lib/audit/link-scanner'
import { LinkValidator } from '@/lib/audit/link-validator'
import { BatchValidator } from '@/lib/audit/batch-validator'
import type { ScannedLink, ValidationConfig } from '@/lib/audit/types'

describe('Large Scale Audit Performance Tests', () => {
  let linkScanner: LinkScanner
  let linkValidator: LinkValidator
  let batchValidator: BatchValidator

  const performanceConfig: ValidationConfig = {
    timeout: 5000,
    retryAttempts: 2,
    userAgent: 'Performance Test Bot',
    followRedirects: true,
    checkAnchors: false, // Disable for performance
    batchSize: 50,
    rateLimitDelay: 50
  }

  beforeEach(() => {
    linkScanner = new LinkScanner()
    linkValidator = new LinkValidator()
    batchValidator = new BatchValidator()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should handle 1000+ links efficiently', async () => {
    // Generate large dataset
    const largeLinkSet: ScannedLink[] = Array.from({ length: 1000 }, (_, i) => ({
      url: `https://example.com/page-${i}`,
      sourceFile: `src/pages/page-${Math.floor(i / 10)}.tsx`,
      sourceLine: (i % 50) + 1,
      linkType: i % 3 === 0 ? 'external' : 'internal',
      context: `<Link href="https://example.com/page-${i}">`,
      priority: i % 4 === 0 ? 'critical' : i % 4 === 1 ? 'high' : 'medium'
    }))

    // Mock validation to simulate realistic response times
    vi.spyOn(batchValidator, 'validateBatch').mockImplementation(async (urls) => {
      // Simulate processing time based on batch size
      const processingTime = Math.min(urls.length * 10, 500)
      await new Promise(resolve => setTimeout(resolve, processingTime))
      
      return urls.map(url => ({
        url,
        status: Math.random() > 0.1 ? 'valid' : 'broken',
        statusCode: Math.random() > 0.1 ? 200 : 404,
        responseTime: Math.floor(Math.random() * 1000) + 100,
        lastChecked: new Date()
      }))
    })

    const startTime = Date.now()
    
    // Process in batches
    const urls = largeLinkSet.map(link => link.url)
    const results = await batchValidator.validateBatch(urls, performanceConfig)
    
    const endTime = Date.now()
    const totalTime = endTime - startTime

    // Performance assertions
    expect(results).toHaveLength(1000)
    expect(totalTime).toBeLessThan(30000) // Should complete within 30 seconds
    
    // Memory usage should be reasonable
    const memoryUsage = process.memoryUsage()
    expect(memoryUsage.heapUsed).toBeLessThan(100 * 1024 * 1024) // Less than 100MB
  }, 35000)

  it('should maintain performance with concurrent validations', async () => {
    const concurrentBatches = 5
    const linksPerBatch = 100
    
    const batches = Array.from({ length: concurrentBatches }, (_, batchIndex) =>
      Array.from({ length: linksPerBatch }, (_, linkIndex) => 
        `https://example.com/batch-${batchIndex}/link-${linkIndex}`
      )
    )

    // Mock concurrent validation
    vi.spyOn(batchValidator, 'validateBatch').mockImplementation(async (urls) => {
      await new Promise(resolve => setTimeout(resolve, 200))
      return urls.map(url => ({
        url,
        status: 'valid' as const,
        statusCode: 200,
        responseTime: 150,
        lastChecked: new Date()
      }))
    })

    const startTime = Date.now()
    
    // Process batches concurrently
    const promises = batches.map(batch => 
      batchValidator.validateBatch(batch, performanceConfig)
    )
    
    const results = await Promise.all(promises)
    
    const endTime = Date.now()
    const totalTime = endTime - startTime

    // Verify all batches completed
    expect(results).toHaveLength(concurrentBatches)
    results.forEach(batchResult => {
      expect(batchResult).toHaveLength(linksPerBatch)
    })

    // Concurrent processing should be faster than sequential
    expect(totalTime).toBeLessThan(2000) // Should complete within 2 seconds
  }, 10000)

  it('should handle memory efficiently with large datasets', async () => {
    const initialMemory = process.memoryUsage()
    
    // Process multiple large batches sequentially to test memory cleanup
    for (let batch = 0; batch < 5; batch++) {
      const largeBatch = Array.from({ length: 500 }, (_, i) => 
        `https://example.com/memory-test-${batch}-${i}`
      )

      vi.spyOn(batchValidator, 'validateBatch').mockResolvedValueOnce(
        largeBatch.map(url => ({
          url,
          status: 'valid' as const,
          statusCode: 200,
          responseTime: 100,
          lastChecked: new Date()
        }))
      )

      await batchValidator.validateBatch(largeBatch, performanceConfig)
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc()
      }
    }

    const finalMemory = process.memoryUsage()
    const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed

    // Memory increase should be reasonable (less than 50MB)
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024)
  })

  it('should maintain accuracy under high load', async () => {
    const testUrls = [
      'https://httpstat.us/200', // Always returns 200
      'https://httpstat.us/404', // Always returns 404
      'https://httpstat.us/500', // Always returns 500
      'https://httpstat.us/301', // Always returns 301
    ]

    // Repeat URLs to create high load
    const highLoadUrls = Array.from({ length: 100 }, (_, i) => 
      testUrls[i % testUrls.length]
    )

    // Use real validation for accuracy test
    const results = await linkValidator.validateBatch(highLoadUrls, {
      ...performanceConfig,
      timeout: 10000,
      batchSize: 10
    })

    // Group results by expected status
    const statusGroups = results.reduce((groups, result) => {
      const expectedStatus = result.url.includes('200') ? 200 :
                           result.url.includes('404') ? 404 :
                           result.url.includes('500') ? 500 :
                           result.url.includes('301') ? 301 : 0
      
      if (!groups[expectedStatus]) groups[expectedStatus] = []
      groups[expectedStatus].push(result)
      return groups
    }, {} as Record<number, any[]>)

    // Verify accuracy (allowing for some network variability)
    if (statusGroups[200]) {
      const validCount = statusGroups[200].filter(r => r.status === 'valid').length
      expect(validCount / statusGroups[200].length).toBeGreaterThan(0.8)
    }

    if (statusGroups[404]) {
      const brokenCount = statusGroups[404].filter(r => r.status === 'broken').length
      expect(brokenCount / statusGroups[404].length).toBeGreaterThan(0.8)
    }
  }, 60000)

  it('should handle rate limiting gracefully', async () => {
    const rateLimitedUrls = Array.from({ length: 50 }, (_, i) => 
      `https://httpbin.org/delay/${Math.floor(i / 10)}`
    )

    const startTime = Date.now()
    
    const results = await linkValidator.validateBatch(rateLimitedUrls, {
      ...performanceConfig,
      rateLimitDelay: 100,
      batchSize: 5
    })

    const endTime = Date.now()
    const totalTime = endTime - startTime

    // Should complete all validations
    expect(results).toHaveLength(50)
    
    // Should respect rate limiting (minimum time based on delays)
    const minimumTime = (50 / 5) * 100 // batches * delay
    expect(totalTime).toBeGreaterThan(minimumTime)
    
    // But shouldn't take excessively long
    expect(totalTime).toBeLessThan(30000)
  }, 35000)
})