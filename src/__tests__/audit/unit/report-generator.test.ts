import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ReportGenerator } from '@/lib/audit/report-generator'
import { HtmlReportGenerator } from '@/lib/audit/html-report-generator'
import { CsvExportGenerator } from '@/lib/audit/csv-export-generator'
import type { ValidationResult, AuditReport, BrokenLinkDetail } from '@/lib/audit/types'

// Mock dependencies
vi.mock('@/lib/audit/html-report-generator')
vi.mock('@/lib/audit/csv-export-generator')

describe('ReportGenerator', () => {
  let reportGenerator: ReportGenerator
  let mockHtmlGenerator: any
  let mockCsvGenerator: any

  beforeEach(() => {
    mockHtmlGenerator = {
      generateReport: vi.fn()
    }
    mockCsvGenerator = {
      exportToCSV: vi.fn()
    }

    vi.mocked(HtmlReportGenerator).mockImplementation(() => mockHtmlGenerator)
    vi.mocked(CsvExportGenerator).mockImplementation(() => mockCsvGenerator)

    reportGenerator = new ReportGenerator()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('generateReport', () => {
    it('should generate comprehensive audit report', async () => {
      const mockValidationResults: ValidationResult[] = [
        {
          url: 'https://example.com/valid',
          status: 'valid',
          statusCode: 200,
          responseTime: 150,
          lastChecked: new Date('2024-01-01T10:00:00Z')
        },
        {
          url: 'https://example.com/broken',
          status: 'broken',
          statusCode: 404,
          error: 'Not Found',
          responseTime: 100,
          lastChecked: new Date('2024-01-01T10:01:00Z')
        },
        {
          url: 'https://example.com/redirect',
          status: 'redirect',
          statusCode: 301,
          redirectUrl: 'https://example.com/new-url',
          responseTime: 200,
          lastChecked: new Date('2024-01-01T10:02:00Z')
        }
      ]

      const report = await reportGenerator.generateReport(mockValidationResults)

      expect(report).toEqual({
        timestamp: expect.any(Date),
        summary: {
          totalLinks: 3,
          validLinks: 1,
          brokenLinks: 1,
          correctedLinks: 0,
          pendingLinks: 1, // redirect
          seoHealthScore: expect.any(Number)
        },
        brokenLinks: expect.arrayContaining([
          expect.objectContaining({
            url: 'https://example.com/broken',
            error: 'Not Found',
            priority: expect.any(String)
          })
        ]),
        corrections: [],
        recommendations: expect.any(Array),
        seoImpact: expect.objectContaining({
          criticalIssues: expect.any(Number),
          estimatedTrafficLoss: expect.any(Number),
          affectedPages: expect.any(Array),
          priorityActions: expect.any(Array),
          linkHealthScore: expect.any(Number)
        }),
        resourceRequests: {
          totalRequests: 0,
          mostRequested: []
        }
      })
    })

    it('should calculate SEO health score correctly', async () => {
      const allValidResults: ValidationResult[] = [
        {
          url: 'https://example.com/page1',
          status: 'valid',
          statusCode: 200,
          responseTime: 100,
          lastChecked: new Date()
        },
        {
          url: 'https://example.com/page2',
          status: 'valid',
          statusCode: 200,
          responseTime: 150,
          lastChecked: new Date()
        }
      ]

      const report = await reportGenerator.generateReport(allValidResults)

      expect(report.summary.seoHealthScore).toBe(100)
    })

    it('should handle empty results', async () => {
      const report = await reportGenerator.generateReport([])

      expect(report.summary.totalLinks).toBe(0)
      expect(report.summary.seoHealthScore).toBe(100) // No links = perfect score
      expect(report.brokenLinks).toEqual([])
    })
  })

  describe('exportToJSON', () => {
    it('should export report as JSON string', async () => {
      const mockReport: AuditReport = {
        timestamp: new Date('2024-01-01T10:00:00Z'),
        summary: {
          totalLinks: 1,
          validLinks: 1,
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
          totalRequests: 0,
          mostRequested: []
        }
      }

      const jsonString = await reportGenerator.exportToJSON(mockReport)
      const parsedReport = JSON.parse(jsonString)

      expect(parsedReport.summary.totalLinks).toBe(1)
      expect(parsedReport.summary.seoHealthScore).toBe(100)
    })
  })

  describe('exportToHTML', () => {
    it('should generate HTML report', async () => {
      const mockReport: AuditReport = {
        timestamp: new Date(),
        summary: {
          totalLinks: 5,
          validLinks: 3,
          brokenLinks: 2,
          correctedLinks: 0,
          pendingLinks: 0,
          seoHealthScore: 60
        },
        brokenLinks: [],
        corrections: [],
        recommendations: [],
        seoImpact: {
          criticalIssues: 2,
          estimatedTrafficLoss: 15,
          affectedPages: [],
          priorityActions: [],
          linkHealthScore: 60
        },
        resourceRequests: {
          totalRequests: 0,
          mostRequested: []
        }
      }

      const expectedHtml = '<html>Mock HTML Report</html>'
      mockHtmlGenerator.generateReport.mockResolvedValue(expectedHtml)

      const htmlReport = await reportGenerator.exportToHTML(mockReport)

      expect(mockHtmlGenerator.generateReport).toHaveBeenCalledWith(mockReport)
      expect(htmlReport).toBe(expectedHtml)
    })
  })

  describe('exportToCSV', () => {
    it('should generate CSV export', async () => {
      const mockReport: AuditReport = {
        timestamp: new Date(),
        summary: {
          totalLinks: 2,
          validLinks: 1,
          brokenLinks: 1,
          correctedLinks: 0,
          pendingLinks: 0,
          seoHealthScore: 50
        },
        brokenLinks: [
          {
            url: 'https://example.com/broken',
            sourceFiles: ['page.tsx'],
            linkType: 'external',
            priority: 'high',
            error: 'Not Found',
            suggestedActions: ['Fix URL'],
            seoImpact: 8
          }
        ],
        corrections: [],
        recommendations: [],
        seoImpact: {
          criticalIssues: 1,
          estimatedTrafficLoss: 10,
          affectedPages: ['page.tsx'],
          priorityActions: ['Fix broken link'],
          linkHealthScore: 50
        },
        resourceRequests: {
          totalRequests: 0,
          mostRequested: []
        }
      }

      const expectedCsv = 'URL,Status,Error,Priority\nhttps://example.com/broken,broken,Not Found,high'
      mockCsvGenerator.exportToCSV.mockResolvedValue(expectedCsv)

      const csvReport = await reportGenerator.exportToCSV(mockReport)

      expect(mockCsvGenerator.exportToCSV).toHaveBeenCalledWith(mockReport)
      expect(csvReport).toBe(expectedCsv)
    })
  })

  describe('calculateSEOImpact', () => {
    it('should calculate SEO impact for broken links', async () => {
      const brokenLinks: BrokenLinkDetail[] = [
        {
          url: '/important-page',
          sourceFiles: ['homepage.tsx', 'navigation.tsx'],
          linkType: 'internal',
          priority: 'critical',
          error: 'Page not found',
          suggestedActions: ['Create page or redirect'],
          seoImpact: 9
        },
        {
          url: '/minor-page',
          sourceFiles: ['footer.tsx'],
          linkType: 'internal',
          priority: 'low',
          error: 'Page not found',
          suggestedActions: ['Remove link'],
          seoImpact: 2
        }
      ]

      const seoImpact = await reportGenerator.calculateSEOImpact(brokenLinks)

      expect(seoImpact).toEqual({
        criticalIssues: 1,
        estimatedTrafficLoss: expect.any(Number),
        affectedPages: expect.arrayContaining(['homepage.tsx', 'navigation.tsx', 'footer.tsx']),
        priorityActions: expect.arrayContaining([
          'Create page or redirect',
          'Remove link'
        ]),
        linkHealthScore: expect.any(Number)
      })

      expect(seoImpact.linkHealthScore).toBeLessThan(100)
      expect(seoImpact.estimatedTrafficLoss).toBeGreaterThan(0)
    })

    it('should return perfect score for no broken links', async () => {
      const seoImpact = await reportGenerator.calculateSEOImpact([])

      expect(seoImpact).toEqual({
        criticalIssues: 0,
        estimatedTrafficLoss: 0,
        affectedPages: [],
        priorityActions: [],
        linkHealthScore: 100
      })
    })
  })

  describe('recommendations generation', () => {
    it('should generate actionable recommendations', async () => {
      const validationResults: ValidationResult[] = [
        {
          url: 'https://slow-site.com',
          status: 'valid',
          statusCode: 200,
          responseTime: 5000, // Very slow
          lastChecked: new Date()
        },
        {
          url: 'https://example.com/broken',
          status: 'broken',
          statusCode: 404,
          error: 'Not Found',
          responseTime: 100,
          lastChecked: new Date()
        }
      ]

      const report = await reportGenerator.generateReport(validationResults)

      expect(report.recommendations).toContain(
        expect.stringContaining('slow response')
      )
      expect(report.recommendations).toContain(
        expect.stringContaining('broken link')
      )
    })
  })
})