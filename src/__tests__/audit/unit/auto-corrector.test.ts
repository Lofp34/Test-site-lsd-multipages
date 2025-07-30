import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { AutoCorrector } from '@/lib/audit/auto-corrector'
import type { ScannedLink, CorrectionSuggestion, CorrectionResult } from '@/lib/audit/types'
import fs from 'fs/promises'
import path from 'path'

// Mock file system operations
vi.mock('fs/promises')

describe('AutoCorrector', () => {
  let autoCorrector: AutoCorrector
  let mockFs: any

  beforeEach(() => {
    mockFs = vi.mocked(fs)
    autoCorrector = new AutoCorrector()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('suggestCorrections', () => {
    it('should suggest typo corrections', async () => {
      const brokenLinks: ScannedLink[] = [
        {
          url: '/abotu', // typo in "about"
          sourceFile: 'src/app/page.tsx',
          sourceLine: 10,
          linkType: 'internal',
          context: '<Link href="/abotu">',
          priority: 'high'
        }
      ]

      // Mock file system to simulate existing files
      mockFs.access.mockImplementation((filePath: string) => {
        if (filePath.includes('/about')) {
          return Promise.resolve()
        }
        return Promise.reject(new Error('File not found'))
      })

      const suggestions = await autoCorrector.suggestCorrections(brokenLinks)

      expect(suggestions).toHaveLength(1)
      expect(suggestions[0]).toEqual({
        originalUrl: '/abotu',
        suggestedUrl: '/about',
        confidence: expect.any(Number),
        correctionType: 'typo',
        reasoning: expect.stringContaining('typo')
      })
    })

    it('should suggest extension corrections', async () => {
      const brokenLinks: ScannedLink[] = [
        {
          url: '/downloads/file.pdf',
          sourceFile: 'src/app/page.tsx',
          sourceLine: 15,
          linkType: 'download',
          context: '<a href="/downloads/file.pdf">',
          priority: 'medium'
        }
      ]

      // Mock file system to simulate file with different extension
      mockFs.access.mockImplementation((filePath: string) => {
        if (filePath.includes('file.docx')) {
          return Promise.resolve()
        }
        return Promise.reject(new Error('File not found'))
      })

      mockFs.readdir.mockResolvedValue(['file.docx', 'other.txt'])

      const suggestions = await autoCorrector.suggestCorrections(brokenLinks)

      expect(suggestions).toHaveLength(1)
      expect(suggestions[0]).toEqual({
        originalUrl: '/downloads/file.pdf',
        suggestedUrl: '/downloads/file.docx',
        confidence: expect.any(Number),
        correctionType: 'extension',
        reasoning: expect.stringContaining('extension')
      })
    })

    it('should suggest moved page corrections', async () => {
      const brokenLinks: ScannedLink[] = [
        {
          url: '/old-page',
          sourceFile: 'src/app/page.tsx',
          sourceLine: 20,
          linkType: 'internal',
          context: '<Link href="/old-page">',
          priority: 'high'
        }
      ]

      // Mock redirect detection
      vi.spyOn(autoCorrector as any, 'checkForRedirect').mockResolvedValue('/new-page')

      const suggestions = await autoCorrector.suggestCorrections(brokenLinks)

      expect(suggestions).toHaveLength(1)
      expect(suggestions[0]).toEqual({
        originalUrl: '/old-page',
        suggestedUrl: '/new-page',
        confidence: expect.any(Number),
        correctionType: 'moved',
        reasoning: expect.stringContaining('redirect')
      })
    })

    it('should find similar URLs', async () => {
      const brokenLinks: ScannedLink[] = [
        {
          url: '/contact-us',
          sourceFile: 'src/app/page.tsx',
          sourceLine: 25,
          linkType: 'internal',
          context: '<Link href="/contact-us">',
          priority: 'medium'
        }
      ]

      vi.spyOn(autoCorrector, 'findSimilarUrls').mockResolvedValue(['/contact', '/contact-form'])

      const suggestions = await autoCorrector.suggestCorrections(brokenLinks)

      expect(suggestions).toHaveLength(2)
      expect(suggestions[0].correctionType).toBe('similar')
      expect(suggestions[1].correctionType).toBe('similar')
    })
  })

  describe('applyCorrection', () => {
    it('should apply correction to file', async () => {
      const suggestion: CorrectionSuggestion = {
        originalUrl: '/abotu',
        suggestedUrl: '/about',
        confidence: 0.9,
        correctionType: 'typo',
        reasoning: 'Typo correction'
      }

      const originalContent = `
        import Link from 'next/link'
        
        export default function Page() {
          return <Link href="/abotu">About</Link>
        }
      `

      const expectedContent = `
        import Link from 'next/link'
        
        export default function Page() {
          return <Link href="/about">About</Link>
        }
      `

      mockFs.readFile.mockResolvedValue(originalContent)
      mockFs.writeFile.mockResolvedValue(undefined)
      mockFs.copyFile.mockResolvedValue(undefined)

      const result = await autoCorrector.applyCorrection(suggestion)

      expect(result).toEqual({
        applied: true,
        originalUrl: '/abotu',
        newUrl: '/about',
        filePath: expect.any(String),
        backupCreated: true,
        rollbackId: expect.any(String)
      })

      expect(mockFs.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        expectedContent,
        'utf-8'
      )
    })

    it('should handle correction failures', async () => {
      const suggestion: CorrectionSuggestion = {
        originalUrl: '/test',
        suggestedUrl: '/new-test',
        confidence: 0.8,
        correctionType: 'typo',
        reasoning: 'Test correction'
      }

      mockFs.readFile.mockRejectedValue(new Error('File not found'))

      const result = await autoCorrector.applyCorrection(suggestion)

      expect(result.applied).toBe(false)
    })
  })

  describe('createBackup', () => {
    it('should create backup file', async () => {
      const filePath = 'src/app/page.tsx'
      mockFs.copyFile.mockResolvedValue(undefined)

      const backupId = await autoCorrector.createBackup(filePath)

      expect(backupId).toMatch(/^backup_\d+_/)
      expect(mockFs.copyFile).toHaveBeenCalledWith(
        filePath,
        expect.stringContaining('.backup')
      )
    })

    it('should handle backup creation errors', async () => {
      const filePath = 'non-existent.tsx'
      mockFs.copyFile.mockRejectedValue(new Error('Source file not found'))

      await expect(autoCorrector.createBackup(filePath)).rejects.toThrow()
    })
  })

  describe('rollbackCorrection', () => {
    it('should rollback correction from backup', async () => {
      const rollbackId = 'backup_123_page.tsx'
      const originalPath = 'src/app/page.tsx'
      const backupPath = `src/app/page.tsx.${rollbackId}.backup`

      mockFs.copyFile.mockResolvedValue(undefined)
      mockFs.unlink.mockResolvedValue(undefined)

      const success = await autoCorrector.rollbackCorrection(rollbackId)

      expect(success).toBe(true)
      expect(mockFs.copyFile).toHaveBeenCalledWith(backupPath, originalPath)
      expect(mockFs.unlink).toHaveBeenCalledWith(backupPath)
    })

    it('should handle rollback failures', async () => {
      const rollbackId = 'invalid_backup'
      mockFs.copyFile.mockRejectedValue(new Error('Backup not found'))

      const success = await autoCorrector.rollbackCorrection(rollbackId)

      expect(success).toBe(false)
    })
  })

  describe('findSimilarUrls', () => {
    it('should find URLs with similar patterns', async () => {
      const brokenUrl = '/contact-us'
      
      // Mock sitemap or route discovery
      vi.spyOn(autoCorrector as any, 'getAllKnownUrls').mockResolvedValue([
        '/contact',
        '/contact-form',
        '/about',
        '/services'
      ])

      const similarUrls = await autoCorrector.findSimilarUrls(brokenUrl)

      expect(similarUrls).toContain('/contact')
      expect(similarUrls).toContain('/contact-form')
      expect(similarUrls).not.toContain('/about')
    })

    it('should return empty array when no similar URLs found', async () => {
      const brokenUrl = '/very-unique-url'
      
      vi.spyOn(autoCorrector as any, 'getAllKnownUrls').mockResolvedValue([
        '/about',
        '/services',
        '/contact'
      ])

      const similarUrls = await autoCorrector.findSimilarUrls(brokenUrl)

      expect(similarUrls).toEqual([])
    })
  })

  describe('confidence scoring', () => {
    it('should assign high confidence to exact typo matches', () => {
      const confidence = (autoCorrector as any).calculateConfidence(
        '/abotu',
        '/about',
        'typo'
      )

      expect(confidence).toBeGreaterThan(0.8)
    })

    it('should assign medium confidence to extension changes', () => {
      const confidence = (autoCorrector as any).calculateConfidence(
        '/file.pdf',
        '/file.docx',
        'extension'
      )

      expect(confidence).toBeGreaterThan(0.6)
      expect(confidence).toBeLessThan(0.8)
    })

    it('should assign lower confidence to similar matches', () => {
      const confidence = (autoCorrector as any).calculateConfidence(
        '/contact-us',
        '/contact',
        'similar'
      )

      expect(confidence).toBeLessThan(0.7)
    })
  })
})