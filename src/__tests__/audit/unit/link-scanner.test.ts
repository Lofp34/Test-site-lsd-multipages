import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { LinkScanner } from '@/lib/audit/link-scanner'
import { FileScanner } from '@/lib/audit/file-scanner'
import { SitemapScanner } from '@/lib/audit/sitemap-scanner'
import { LinkClassifier } from '@/lib/audit/link-classifier'
import type { ScannedLink, LinkScannerConfig } from '@/lib/audit/types'

// Mock dependencies
vi.mock('@/lib/audit/file-scanner')
vi.mock('@/lib/audit/sitemap-scanner')
vi.mock('@/lib/audit/link-classifier')

describe('LinkScanner', () => {
  let linkScanner: LinkScanner
  let mockFileScanner: any
  let mockSitemapScanner: any
  let mockLinkClassifier: any

  const mockConfig: LinkScannerConfig = {
    baseUrl: 'https://example.com',
    maxDepth: 2,
    includeExternal: true,
    excludePatterns: ['*.test.*', 'node_modules/**'],
    followRedirects: true
  }

  beforeEach(() => {
    mockFileScanner = {
      scanDirectory: vi.fn(),
      scanFile: vi.fn()
    }
    mockSitemapScanner = {
      scanSitemap: vi.fn(),
      scanPage: vi.fn()
    }
    mockLinkClassifier = {
      classifyLink: vi.fn(),
      calculatePriority: vi.fn()
    }

    vi.mocked(FileScanner).mockImplementation(() => mockFileScanner)
    vi.mocked(SitemapScanner).mockImplementation(() => mockSitemapScanner)
    vi.mocked(LinkClassifier).mockImplementation(() => mockLinkClassifier)

    linkScanner = new LinkScanner()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('scanSite', () => {
    it('should scan all files and sitemap', async () => {
      const mockFileLinks: ScannedLink[] = [
        {
          url: '/internal-page',
          sourceFile: 'src/app/page.tsx',
          sourceLine: 10,
          linkType: 'internal',
          context: '<Link href="/internal-page">',
          priority: 'high'
        }
      ]

      const mockSitemapLinks: ScannedLink[] = [
        {
          url: 'https://example.com/sitemap-page',
          sourceFile: 'sitemap.ts',
          sourceLine: 1,
          linkType: 'internal',
          context: 'sitemap entry',
          priority: 'medium'
        }
      ]

      mockFileScanner.scanDirectory.mockResolvedValue(mockFileLinks)
      mockSitemapScanner.scanSitemap.mockResolvedValue(mockSitemapLinks)

      const result = await linkScanner.scanSite(mockConfig)

      expect(mockFileScanner.scanDirectory).toHaveBeenCalledWith(
        expect.any(String),
        mockConfig.excludePatterns
      )
      expect(mockSitemapScanner.scanSitemap).toHaveBeenCalled()
      expect(result).toEqual([...mockFileLinks, ...mockSitemapLinks])
    })

    it('should handle scanning errors gracefully', async () => {
      mockFileScanner.scanDirectory.mockRejectedValue(new Error('File scan failed'))
      mockSitemapScanner.scanSitemap.mockResolvedValue([])

      const result = await linkScanner.scanSite(mockConfig)

      expect(result).toEqual([])
    })

    it('should filter out excluded patterns', async () => {
      const mockLinks: ScannedLink[] = [
        {
          url: '/valid-page',
          sourceFile: 'src/app/page.tsx',
          sourceLine: 10,
          linkType: 'internal',
          context: '<Link href="/valid-page">',
          priority: 'high'
        },
        {
          url: '/test-page',
          sourceFile: 'src/app/test.test.tsx',
          sourceLine: 5,
          linkType: 'internal',
          context: '<Link href="/test-page">',
          priority: 'low'
        }
      ]

      mockFileScanner.scanDirectory.mockResolvedValue(mockLinks)
      mockSitemapScanner.scanSitemap.mockResolvedValue([])

      const result = await linkScanner.scanSite(mockConfig)

      // Should exclude test files based on excludePatterns
      expect(result).toHaveLength(1)
      expect(result[0].url).toBe('/valid-page')
    })
  })

  describe('scanFile', () => {
    it('should scan a single file', async () => {
      const mockLinks: ScannedLink[] = [
        {
          url: '/single-file-link',
          sourceFile: 'src/components/Header.tsx',
          sourceLine: 15,
          linkType: 'internal',
          context: '<Link href="/single-file-link">',
          priority: 'medium'
        }
      ]

      mockFileScanner.scanFile.mockResolvedValue(mockLinks)

      const result = await linkScanner.scanFile('src/components/Header.tsx')

      expect(mockFileScanner.scanFile).toHaveBeenCalledWith('src/components/Header.tsx')
      expect(result).toEqual(mockLinks)
    })

    it('should handle file not found', async () => {
      mockFileScanner.scanFile.mockRejectedValue(new Error('File not found'))

      const result = await linkScanner.scanFile('non-existent.tsx')

      expect(result).toEqual([])
    })
  })

  describe('scanComponent', () => {
    it('should scan React component files', async () => {
      const mockLinks: ScannedLink[] = [
        {
          url: '/component-link',
          sourceFile: 'src/components/Navigation.tsx',
          sourceLine: 20,
          linkType: 'internal',
          context: '<Link href="/component-link">',
          priority: 'high'
        }
      ]

      mockFileScanner.scanFile.mockResolvedValue(mockLinks)

      const result = await linkScanner.scanComponent('src/components/Navigation.tsx')

      expect(mockFileScanner.scanFile).toHaveBeenCalledWith('src/components/Navigation.tsx')
      expect(result).toEqual(mockLinks)
    })
  })

  describe('scanSitemap', () => {
    it('should scan sitemap for links', async () => {
      const mockLinks: ScannedLink[] = [
        {
          url: 'https://example.com/sitemap-url',
          sourceFile: 'sitemap.ts',
          sourceLine: 1,
          linkType: 'internal',
          context: 'sitemap generation',
          priority: 'medium'
        }
      ]

      mockSitemapScanner.scanSitemap.mockResolvedValue(mockLinks)

      const result = await linkScanner.scanSitemap()

      expect(mockSitemapScanner.scanSitemap).toHaveBeenCalled()
      expect(result).toEqual(mockLinks)
    })
  })
})