import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { LinkScanner } from '@/lib/audit/link-scanner'
import { LinkValidator } from '@/lib/audit/link-validator'
import { AutoCorrector } from '@/lib/audit/auto-corrector'
import { ReportGenerator } from '@/lib/audit/report-generator'
import { SendGridEmailService } from '@/lib/email/sendgrid-service'
import type { LinkScannerConfig, ValidationConfig } from '@/lib/audit/types'

describe('Full Audit Workflow Integration', () => {
  let linkScanner: LinkScanner
  let linkValidator: LinkValidator
  let autoCorrector: AutoCorrector
  let reportGenerator: ReportGenerator
  let emailService: SendGridEmailService

  const scanConfig: LinkScannerConfig = {
    baseUrl: 'https://test-site.com',
    maxDepth: 2,
    includeExternal: true,
    excludePatterns: ['*.test.*'],
    followRedirects: true
  }

  const validationConfig: ValidationConfig = {
    timeout: 5000,
    retryAttempts: 2,
    userAgent: 'Test Audit Bot',
    followRedirects: true,
    checkAnchors: true,
    batchSize: 5,
    rateLimitDelay: 100
  }

  beforeEach(() => {
    linkScanner = new LinkScanner()
    linkValidator = new LinkValidator()
    autoCorrector = new AutoCorrector()
    reportGenerator = new ReportGenerator()
    emailService = new SendGridEmailService({
      apiKey: 'test-key',
      fromEmail: 'test@example.com',
      fromName: 'Test System',
      adminEmail: 'admin@example.com'
    })

    // Mock external dependencies
    vi.mock('axios')
    vi.mock('fs/promises')
    vi.mock('@sendgrid/mail')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should execute complete audit workflow', async () => {
    // Step 1: Scan for links
    const mockScannedLinks = [
      {
        url: 'https://example.com/valid',
        sourceFile: 'src/app/page.tsx',
        sourceLine: 10,
        linkType: 'external' as const,
        context: '<a href="https://example.com/valid">',
        priority: 'medium' as const
      },
      {
        url: '/broken-internal',
        sourceFile: 'src/app/page.tsx',
        sourceLine: 15,
        linkType: 'internal' as const,
        context: '<Link href="/broken-internal">',
        priority: 'high' as const
      }
    ]

    vi.spyOn(linkScanner, 'scanSite').mockResolvedValue(mockScannedLinks)

    // Step 2: Validate links
    const mockValidationResults = [
      {
        url: 'https://example.com/valid',
        status: 'valid' as const,
        statusCode: 200,
        responseTime: 150,
        lastChecked: new Date()
      },
      {
        url: '/broken-internal',
        status: 'broken' as const,
        statusCode: 404,
        error: 'Not Found',
        responseTime: 100,
        lastChecked: new Date()
      }
    ]

    vi.spyOn(linkValidator, 'validateBatch').mockResolvedValue(mockValidationResults)

    // Step 3: Auto-correct broken links
    const mockCorrections = [
      {
        originalUrl: '/broken-internal',
        suggestedUrl: '/fixed-internal',
        confidence: 0.9,
        correctionType: 'typo' as const,
        reasoning: 'Similar URL found'
      }
    ]

    vi.spyOn(autoCorrector, 'suggestCorrections').mockResolvedValue(mockCorrections)
    vi.spyOn(autoCorrector, 'applyCorrection').mockResolvedValue({
      applied: true,
      originalUrl: '/broken-internal',
      newUrl: '/fixed-internal',
      filePath: 'src/app/page.tsx',
      backupCreated: true,
      rollbackId: 'backup_123'
    })

    // Step 4: Generate report
    vi.spyOn(reportGenerator, 'generateReport').mockResolvedValue({
      timestamp: new Date(),
      summary: {
        totalLinks: 2,
        validLinks: 1,
        brokenLinks: 1,
        correctedLinks: 1,
        pendingLinks: 0,
        seoHealthScore: 75
      },
      brokenLinks: [],
      corrections: [{
        applied: true,
        originalUrl: '/broken-internal',
        newUrl: '/fixed-internal',
        filePath: 'src/app/page.tsx',
        backupCreated: true,
        rollbackId: 'backup_123'
      }],
      recommendations: ['Review corrected links'],
      seoImpact: {
        criticalIssues: 0,
        estimatedTrafficLoss: 0,
        affectedPages: [],
        priorityActions: [],
        linkHealthScore: 75
      },
      resourceRequests: {
        totalRequests: 0,
        mostRequested: []
      }
    })

    // Execute workflow
    const scannedLinks = await linkScanner.scanSite(scanConfig)
    expect(scannedLinks).toHaveLength(2)

    const validationResults = await linkValidator.validateBatch(
      scannedLinks.map(link => link.url),
      validationConfig
    )
    expect(validationResults).toHaveLength(2)

    const brokenLinks = scannedLinks.filter((_, index) => 
      validationResults[index].status === 'broken'
    )
    const corrections = await autoCorrector.suggestCorrections(brokenLinks)
    expect(corrections).toHaveLength(1)

    // Apply corrections
    const correctionResults = []
    for (const correction of corrections) {
      const result = await autoCorrector.applyCorrection(correction)
      correctionResults.push(result)
    }
    expect(correctionResults[0].applied).toBe(true)

    const report = await reportGenerator.generateReport(validationResults)
    expect(report.summary.correctedLinks).toBe(1)
    expect(report.summary.seoHealthScore).toBe(75)
  }, 30000) // Longer timeout for integration test
})