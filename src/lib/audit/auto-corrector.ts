import { ScannedLink, CorrectionSuggestion, CorrectionResult } from './types';
import { promises as fs } from 'fs';
import path from 'path';
import { existsSync } from 'fs';
import { createHash } from 'crypto';

/**
 * Auto-corrector system for detecting and applying simple link corrections
 */
export class AutoCorrector {
  private baseUrl: string;
  private projectRoot: string;

  constructor(baseUrl: string = 'https://laurentserre.com', projectRoot: string = process.cwd()) {
    this.baseUrl = baseUrl;
    this.projectRoot = projectRoot;
  }

  /**
   * Suggest corrections for broken links
   */
  async suggestCorrections(brokenLinks: ScannedLink[]): Promise<CorrectionSuggestion[]> {
    const suggestions: CorrectionSuggestion[] = [];

    for (const link of brokenLinks) {
      // Skip external links for now
      if (link.linkType === 'external') {
        continue;
      }

      const linkSuggestions = await this.detectCorrectionsForLink(link);
      suggestions.push(...linkSuggestions);
    }

    return suggestions.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Detect possible corrections for a single link
   */
  private async detectCorrectionsForLink(link: ScannedLink): Promise<CorrectionSuggestion[]> {
    const suggestions: CorrectionSuggestion[] = [];
    const url = link.url;

    // 1. Detect typos in URLs
    const typoSuggestions = await this.detectTypoCorrections(url);
    suggestions.push(...typoSuggestions);

    // 2. Find files with different extensions
    const extensionSuggestions = await this.detectExtensionCorrections(url);
    suggestions.push(...extensionSuggestions);

    // 3. Detect moved pages via redirections
    const redirectSuggestions = await this.detectRedirectCorrections(url);
    suggestions.push(...redirectSuggestions);

    // 4. Find similar URLs
    const similarSuggestions = await this.findSimilarUrls(url);
    suggestions.push(...similarSuggestions);

    return suggestions;
  }

  /**
   * Detect typo corrections in URLs
   */
  private async detectTypoCorrections(url: string): Promise<CorrectionSuggestion[]> {
    const suggestions: CorrectionSuggestion[] = [];
    
    // Common typos in French URLs
    const commonTypos = [
      { from: 'developement', to: 'developpement' },
      { from: 'developper', to: 'developper' },
      { from: 'comercial', to: 'commercial' },
      { from: 'comerciale', to: 'commerciale' },
      { from: 'negociation', to: 'negociation' },
      { from: 'ressource', to: 'ressources' },
      { from: 'technique', to: 'techniques' },
      { from: 'formation', to: 'formations' },
      { from: 'bootcamps', to: 'bootcamp' },
      { from: 'a-propos', to: 'a-propos' },
      { from: 'contact', to: 'contact' },
      // Double slashes
      { from: '//', to: '/' },
      // Missing trailing slash for directories
      { from: /\/([^/.?]+)$/, to: '/$1/' },
    ];

    for (const typo of commonTypos) {
      let correctedUrl = url;
      let hasCorrection = false;

      if (typeof typo.from === 'string') {
        if (url.includes(typo.from)) {
          correctedUrl = url.replace(new RegExp(typo.from, 'g'), typo.to);
          hasCorrection = true;
        }
      } else {
        // RegExp case
        if (typo.from.test(url)) {
          correctedUrl = url.replace(typo.from, typo.to);
          hasCorrection = true;
        }
      }

      if (hasCorrection && correctedUrl !== url) {
        // Check if corrected URL exists
        const exists = await this.checkUrlExists(correctedUrl);
        if (exists) {
          suggestions.push({
            originalUrl: url,
            suggestedUrl: correctedUrl,
            confidence: 0.8,
            correctionType: 'typo',
            reasoning: `Detected common typo: "${typo.from}" → "${typo.to}"`
          });
        }
      }
    }

    return suggestions;
  }

  /**
   * Detect files with different extensions
   */
  private async detectExtensionCorrections(url: string): Promise<CorrectionSuggestion[]> {
    const suggestions: CorrectionSuggestion[] = [];

    // Only process download links
    if (!url.includes('/ressources/') && !url.includes('/downloads/')) {
      return suggestions;
    }

    const urlPath = new URL(url, this.baseUrl).pathname;
    const filePath = path.join(this.projectRoot, 'public', urlPath);
    const dir = path.dirname(filePath);
    const basename = path.basename(filePath, path.extname(filePath));
    const currentExt = path.extname(filePath);

    // Common file extensions to try
    const extensions = ['.pdf', '.docx', '.doc', '.xlsx', '.xls', '.pptx', '.ppt', '.zip', '.png', '.jpg', '.jpeg'];

    try {
      if (existsSync(dir)) {
        const files = await fs.readdir(dir);
        
        for (const file of files) {
          const fileBasename = path.basename(file, path.extname(file));
          const fileExt = path.extname(file);
          
          // Check if it's the same file with different extension
          if (fileBasename === basename && fileExt !== currentExt) {
            const newUrl = url.replace(currentExt, fileExt);
            
            suggestions.push({
              originalUrl: url,
              suggestedUrl: newUrl,
              confidence: 0.9,
              correctionType: 'extension',
              reasoning: `Found same file with different extension: ${currentExt} → ${fileExt}`
            });
          }
        }
      }
    } catch (error) {
      console.warn(`Could not read directory ${dir}:`, error);
    }

    return suggestions;
  }

  /**
   * Detect moved pages via redirections
   */
  private async detectRedirectCorrections(url: string): Promise<CorrectionSuggestion[]> {
    const suggestions: CorrectionSuggestion[] = [];

    // Common page moves in the Laurent Serre site
    const commonMoves = [
      { from: '/services/', to: '/ressources/' },
      { from: '/blog/', to: '/ressources/' },
      { from: '/formations/', to: '/formation-commerciale-pme/' },
      { from: '/coaching/', to: '/coach-commercial-entreprise/' },
      { from: '/consultant/', to: '/consultant-commercial-montpellier/' },
      { from: '/bootcamp/', to: '/bootcamp-commercial-intensif/' },
      { from: '/management/', to: '/management-equipe-commerciale/' },
      { from: '/transformation/', to: '/transformation-commerciale/' },
      { from: '/expert/', to: '/expert-developpement-commercial-pme/' },
      { from: '/formateur/', to: '/formateur-vente-pme/' },
    ];

    for (const move of commonMoves) {
      if (url.includes(move.from)) {
        const correctedUrl = url.replace(move.from, move.to);
        const exists = await this.checkUrlExists(correctedUrl);
        
        if (exists) {
          suggestions.push({
            originalUrl: url,
            suggestedUrl: correctedUrl,
            confidence: 0.7,
            correctionType: 'moved',
            reasoning: `Page moved from ${move.from} to ${move.to}`
          });
        }
      }
    }

    return suggestions;
  }

  /**
   * Find similar URLs that might be the intended target
   */
  async findSimilarUrls(brokenUrl: string): Promise<CorrectionSuggestion[]> {
    const suggestions: CorrectionSuggestion[] = [];

    try {
      // Get all existing pages from sitemap or file system
      const existingUrls = await this.getExistingUrls();
      
      for (const existingUrl of existingUrls) {
        const similarity = this.calculateUrlSimilarity(brokenUrl, existingUrl);
        
        if (similarity > 0.7) {
          suggestions.push({
            originalUrl: brokenUrl,
            suggestedUrl: existingUrl,
            confidence: similarity,
            correctionType: 'similar',
            reasoning: `Found similar URL with ${Math.round(similarity * 100)}% similarity`
          });
        }
      }
    } catch (error) {
      console.warn('Could not find similar URLs:', error);
    }

    return suggestions.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
  }

  /**
   * Calculate similarity between two URLs using Levenshtein distance
   */
  private calculateUrlSimilarity(url1: string, url2: string): number {
    const distance = this.levenshteinDistance(url1, url2);
    const maxLength = Math.max(url1.length, url2.length);
    return 1 - (distance / maxLength);
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Get all existing URLs from the site
   */
  private async getExistingUrls(): Promise<string[]> {
    const urls: string[] = [];

    try {
      // Read from sitemap if available
      const sitemapPath = path.join(this.projectRoot, 'public', 'sitemap.xml');
      if (existsSync(sitemapPath)) {
        const sitemapContent = await fs.readFile(sitemapPath, 'utf-8');
        const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
        if (urlMatches) {
          urls.push(...urlMatches.map(match => match.replace(/<\/?loc>/g, '')));
        }
      }

      // Also scan the app directory for pages
      const appDir = path.join(this.projectRoot, 'src', 'app');
      if (existsSync(appDir)) {
        const pageUrls = await this.scanAppDirectory(appDir);
        urls.push(...pageUrls);
      }
    } catch (error) {
      console.warn('Could not get existing URLs:', error);
    }

    return [...new Set(urls)]; // Remove duplicates
  }

  /**
   * Scan app directory for page routes
   */
  private async scanAppDirectory(dir: string, basePath: string = ''): Promise<string[]> {
    const urls: string[] = [];

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith('(') && !entry.name.startsWith('_')) {
          const subPath = path.join(basePath, entry.name);
          const fullPath = path.join(dir, entry.name);
          
          // Check if this directory has a page.tsx
          const pagePath = path.join(fullPath, 'page.tsx');
          if (existsSync(pagePath)) {
            urls.push(`${this.baseUrl}${subPath}`);
          }

          // Recursively scan subdirectories
          const subUrls = await this.scanAppDirectory(fullPath, subPath);
          urls.push(...subUrls);
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory ${dir}:`, error);
    }

    return urls;
  }

  /**
   * Check if a URL exists (simplified check)
   */
  private async checkUrlExists(url: string): Promise<boolean> {
    try {
      // For internal URLs, check if the file/page exists
      if (url.startsWith(this.baseUrl) || url.startsWith('/')) {
        const urlPath = url.startsWith('/') ? url : new URL(url).pathname;
        
        // Check if it's a static file
        const filePath = path.join(this.projectRoot, 'public', urlPath);
        if (existsSync(filePath)) {
          return true;
        }

        // Check if it's a Next.js page
        const appPath = path.join(this.projectRoot, 'src', 'app', urlPath, 'page.tsx');
        if (existsSync(appPath)) {
          return true;
        }

        // Check without trailing slash
        const appPathNoSlash = path.join(this.projectRoot, 'src', 'app', urlPath.replace(/\/$/, ''), 'page.tsx');
        if (existsSync(appPathNoSlash)) {
          return true;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Apply a correction suggestion to the source files
   */
  async applyCorrection(suggestion: CorrectionSuggestion, sourceFiles: string[]): Promise<CorrectionResult> {
    const rollbackId = this.generateRollbackId();
    let backupCreated = false;
    let applied = false;

    try {
      // Create backups for all affected files
      const backupData: { [filePath: string]: string } = {};
      
      for (const filePath of sourceFiles) {
        const fullPath = path.resolve(this.projectRoot, filePath);
        if (existsSync(fullPath)) {
          const originalContent = await fs.readFile(fullPath, 'utf-8');
          backupData[filePath] = originalContent;
          
          // Create physical backup
          await this.createBackup(fullPath, rollbackId);
        }
      }
      
      backupCreated = Object.keys(backupData).length > 0;

      // Apply corrections to each file
      for (const filePath of sourceFiles) {
        const fullPath = path.resolve(this.projectRoot, filePath);
        if (existsSync(fullPath)) {
          const success = await this.applyCorrectionsToFile(
            fullPath, 
            suggestion.originalUrl, 
            suggestion.suggestedUrl
          );
          if (success) {
            applied = true;
          }
        }
      }

      // Log the correction
      await this.logCorrection(suggestion, sourceFiles, rollbackId, applied);

      return {
        applied,
        originalUrl: suggestion.originalUrl,
        newUrl: suggestion.suggestedUrl,
        filePath: sourceFiles.join(', '),
        backupCreated,
        rollbackId
      };

    } catch (error) {
      console.error('Error applying correction:', error);
      
      // If something went wrong and we created backups, try to restore
      if (backupCreated) {
        try {
          await this.rollbackCorrection(rollbackId);
        } catch (rollbackError) {
          console.error('Error during rollback:', rollbackError);
        }
      }

      return {
        applied: false,
        originalUrl: suggestion.originalUrl,
        newUrl: suggestion.suggestedUrl,
        filePath: sourceFiles.join(', '),
        backupCreated,
        rollbackId
      };
    }
  }

  /**
   * Create a backup of a file
   */
  async createBackup(filePath: string, rollbackId: string): Promise<string> {
    const backupDir = path.join(this.projectRoot, '.audit-backups', rollbackId);
    await fs.mkdir(backupDir, { recursive: true });

    const relativePath = path.relative(this.projectRoot, filePath);
    const backupPath = path.join(backupDir, relativePath);
    
    // Ensure backup directory structure exists
    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    
    // Copy the original file
    await fs.copyFile(filePath, backupPath);
    
    return backupPath;
  }

  /**
   * Apply corrections to a single file while preserving formatting
   */
  private async applyCorrectionsToFile(
    filePath: string, 
    originalUrl: string, 
    newUrl: string
  ): Promise<boolean> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      let modified = false;
      let newContent = content;

      // Different replacement strategies based on file type
      const ext = path.extname(filePath).toLowerCase();

      if (ext === '.tsx' || ext === '.ts' || ext === '.jsx' || ext === '.js') {
        // Handle React/TypeScript files
        newContent = this.replaceInCodeFile(content, originalUrl, newUrl);
      } else if (ext === '.md' || ext === '.mdx') {
        // Handle Markdown files
        newContent = this.replaceInMarkdownFile(content, originalUrl, newUrl);
      } else if (ext === '.json') {
        // Handle JSON files
        newContent = this.replaceInJsonFile(content, originalUrl, newUrl);
      } else {
        // Generic text replacement
        newContent = content.replace(new RegExp(this.escapeRegExp(originalUrl), 'g'), newUrl);
      }

      if (newContent !== content) {
        await fs.writeFile(filePath, newContent, 'utf-8');
        modified = true;
      }

      return modified;
    } catch (error) {
      console.error(`Error applying correction to ${filePath}:`, error);
      return false;
    }
  }

  /**
   * Replace URLs in code files (TypeScript/JavaScript/React)
   */
  private replaceInCodeFile(content: string, originalUrl: string, newUrl: string): string {
    let newContent = content;

    // Replace in string literals (single and double quotes)
    newContent = newContent.replace(
      new RegExp(`(['"])(${this.escapeRegExp(originalUrl)})(['"])`, 'g'),
      `$1${newUrl}$3`
    );

    // Replace in template literals
    newContent = newContent.replace(
      new RegExp('(`[^`]*?)(' + this.escapeRegExp(originalUrl) + ')([^`]*`)', 'g'),
      `$1${newUrl}$3`
    );

    // Replace in href attributes
    newContent = newContent.replace(
      new RegExp(`(href\\s*=\\s*['"])(${this.escapeRegExp(originalUrl)})(['"])`, 'g'),
      `$1${newUrl}$3`
    );

    // Replace in src attributes
    newContent = newContent.replace(
      new RegExp(`(src\\s*=\\s*['"])(${this.escapeRegExp(originalUrl)})(['"])`, 'g'),
      `$1${newUrl}$3`
    );

    return newContent;
  }

  /**
   * Replace URLs in Markdown files
   */
  private replaceInMarkdownFile(content: string, originalUrl: string, newUrl: string): string {
    let newContent = content;

    // Replace in markdown links [text](url)
    newContent = newContent.replace(
      new RegExp(`(\\[.*?\\]\\()(${this.escapeRegExp(originalUrl)})(\\))`, 'g'),
      `$1${newUrl}$3`
    );

    // Replace in markdown reference links [text]: url
    newContent = newContent.replace(
      new RegExp(`(\\[.*?\\]:\\s*)(${this.escapeRegExp(originalUrl)})`, 'g'),
      `$1${newUrl}`
    );

    // Replace in HTML tags within markdown
    newContent = newContent.replace(
      new RegExp(`(href\\s*=\\s*['"])(${this.escapeRegExp(originalUrl)})(['"])`, 'g'),
      `$1${newUrl}$3`
    );

    return newContent;
  }

  /**
   * Replace URLs in JSON files
   */
  private replaceInJsonFile(content: string, originalUrl: string, newUrl: string): string {
    try {
      const data = JSON.parse(content);
      const updatedData = this.replaceInObject(data, originalUrl, newUrl);
      return JSON.stringify(updatedData, null, 2);
    } catch (error) {
      // If JSON parsing fails, fall back to string replacement
      return content.replace(new RegExp(this.escapeRegExp(originalUrl), 'g'), newUrl);
    }
  }

  /**
   * Recursively replace URLs in an object
   */
  private replaceInObject(obj: any, originalUrl: string, newUrl: string): any {
    if (typeof obj === 'string') {
      return obj.replace(new RegExp(this.escapeRegExp(originalUrl), 'g'), newUrl);
    } else if (Array.isArray(obj)) {
      return obj.map(item => this.replaceInObject(item, originalUrl, newUrl));
    } else if (obj && typeof obj === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = this.replaceInObject(value, originalUrl, newUrl);
      }
      return result;
    }
    return obj;
  }

  /**
   * Escape special regex characters
   */
  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Generate a unique rollback ID
   */
  private generateRollbackId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return `rollback_${timestamp}_${random}`;
  }

  /**
   * Log a correction to the database and file system
   */
  private async logCorrection(
    suggestion: CorrectionSuggestion,
    sourceFiles: string[],
    rollbackId: string,
    applied: boolean
  ): Promise<void> {
    const logEntry = {
      timestamp: new Date().toISOString(),
      originalUrl: suggestion.originalUrl,
      correctedUrl: suggestion.suggestedUrl,
      correctionType: suggestion.correctionType,
      confidence: suggestion.confidence,
      reasoning: suggestion.reasoning,
      sourceFiles,
      rollbackId,
      applied
    };

    // Log to file
    const logDir = path.join(this.projectRoot, '.audit-logs');
    await fs.mkdir(logDir, { recursive: true });
    
    const logFile = path.join(logDir, 'corrections.jsonl');
    const logLine = JSON.stringify(logEntry) + '\n';
    
    await fs.appendFile(logFile, logLine, 'utf-8');

    // TODO: Also log to database when database integration is ready
    console.log(`Correction logged: ${suggestion.originalUrl} → ${suggestion.suggestedUrl} (${applied ? 'applied' : 'failed'})`);
  }

  /**
   * Rollback a correction using the rollback ID
   */
  async rollbackCorrection(rollbackId: string): Promise<boolean> {
    try {
      const backupDir = path.join(this.projectRoot, '.audit-backups', rollbackId);
      
      if (!existsSync(backupDir)) {
        console.error(`Backup directory not found: ${backupDir}`);
        return false;
      }

      // Get the correction log entry
      const logEntry = await this.getCorrectionLogEntry(rollbackId);
      if (!logEntry) {
        console.error(`Correction log entry not found for rollback ID: ${rollbackId}`);
        return false;
      }

      // Restore all backed up files
      const restoredFiles: string[] = [];
      
      for (const sourceFile of logEntry.sourceFiles) {
        const originalPath = path.resolve(this.projectRoot, sourceFile);
        const backupPath = path.join(backupDir, sourceFile);
        
        if (existsSync(backupPath)) {
          // Ensure the target directory exists
          await fs.mkdir(path.dirname(originalPath), { recursive: true });
          
          // Restore the file
          await fs.copyFile(backupPath, originalPath);
          restoredFiles.push(sourceFile);
          
          console.log(`Restored: ${sourceFile}`);
        } else {
          console.warn(`Backup file not found: ${backupPath}`);
        }
      }

      // Log the rollback
      await this.logRollback(rollbackId, restoredFiles);

      // Clean up backup directory
      await fs.rm(backupDir, { recursive: true, force: true });

      console.log(`Rollback completed for ${rollbackId}. Restored ${restoredFiles.length} files.`);
      return true;

    } catch (error) {
      console.error(`Error during rollback of ${rollbackId}:`, error);
      return false;
    }
  }

  /**
   * Get all applied corrections that can be rolled back
   */
  async getAppliedCorrections(): Promise<CorrectionLogEntry[]> {
    try {
      const logFile = path.join(this.projectRoot, '.audit-logs', 'corrections.jsonl');
      
      if (!existsSync(logFile)) {
        return [];
      }

      const content = await fs.readFile(logFile, 'utf-8');
      const lines = content.trim().split('\n').filter(line => line.trim());
      
      const corrections: CorrectionLogEntry[] = [];
      
      for (const line of lines) {
        try {
          const entry = JSON.parse(line) as CorrectionLogEntry;
          if (entry.applied) {
            corrections.push(entry);
          }
        } catch (error) {
          console.warn('Invalid log entry:', line);
        }
      }

      return corrections.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    } catch (error) {
      console.error('Error reading correction logs:', error);
      return [];
    }
  }

  /**
   * Get a specific correction log entry by rollback ID
   */
  private async getCorrectionLogEntry(rollbackId: string): Promise<CorrectionLogEntry | null> {
    try {
      const logFile = path.join(this.projectRoot, '.audit-logs', 'corrections.jsonl');
      
      if (!existsSync(logFile)) {
        return null;
      }

      const content = await fs.readFile(logFile, 'utf-8');
      const lines = content.trim().split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        try {
          const entry = JSON.parse(line) as CorrectionLogEntry;
          if (entry.rollbackId === rollbackId) {
            return entry;
          }
        } catch (error) {
          console.warn('Invalid log entry:', line);
        }
      }

      return null;
    } catch (error) {
      console.error('Error reading correction log:', error);
      return null;
    }
  }

  /**
   * Log a rollback operation
   */
  private async logRollback(rollbackId: string, restoredFiles: string[]): Promise<void> {
    const rollbackEntry = {
      timestamp: new Date().toISOString(),
      rollbackId,
      restoredFiles,
      action: 'rollback'
    };

    const logDir = path.join(this.projectRoot, '.audit-logs');
    await fs.mkdir(logDir, { recursive: true });
    
    const rollbackLogFile = path.join(logDir, 'rollbacks.jsonl');
    const logLine = JSON.stringify(rollbackEntry) + '\n';
    
    await fs.appendFile(rollbackLogFile, logLine, 'utf-8');
  }

  /**
   * Validate that corrections were applied correctly
   */
  async validateCorrections(rollbackId: string): Promise<ValidationReport> {
    const report: ValidationReport = {
      rollbackId,
      timestamp: new Date(),
      validatedFiles: [],
      errors: [],
      success: true
    };

    try {
      const logEntry = await this.getCorrectionLogEntry(rollbackId);
      if (!logEntry) {
        report.errors.push(`Correction log entry not found for ${rollbackId}`);
        report.success = false;
        return report;
      }

      // Check each source file
      for (const sourceFile of logEntry.sourceFiles) {
        const filePath = path.resolve(this.projectRoot, sourceFile);
        
        try {
          if (!existsSync(filePath)) {
            report.errors.push(`File not found: ${sourceFile}`);
            report.success = false;
            continue;
          }

          const content = await fs.readFile(filePath, 'utf-8');
          
          // Check if the correction was applied
          const hasOldUrl = content.includes(logEntry.originalUrl);
          const hasNewUrl = content.includes(logEntry.correctedUrl);

          if (hasOldUrl) {
            report.errors.push(`Original URL still found in ${sourceFile}: ${logEntry.originalUrl}`);
            report.success = false;
          }

          if (!hasNewUrl) {
            report.errors.push(`Corrected URL not found in ${sourceFile}: ${logEntry.correctedUrl}`);
            report.success = false;
          }

          report.validatedFiles.push({
            filePath: sourceFile,
            hasOldUrl,
            hasNewUrl,
            valid: !hasOldUrl && hasNewUrl
          });

        } catch (error) {
          report.errors.push(`Error validating ${sourceFile}: ${error}`);
          report.success = false;
        }
      }

    } catch (error) {
      report.errors.push(`Validation error: ${error}`);
      report.success = false;
    }

    return report;
  }

  /**
   * Clean up old backups and logs
   */
  async cleanupOldBackups(daysToKeep: number = 30): Promise<void> {
    try {
      const backupsDir = path.join(this.projectRoot, '.audit-backups');
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      if (!existsSync(backupsDir)) {
        return;
      }

      const entries = await fs.readdir(backupsDir, { withFileTypes: true });
      let cleanedCount = 0;

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const dirPath = path.join(backupsDir, entry.name);
          const stats = await fs.stat(dirPath);
          
          if (stats.mtime < cutoffDate) {
            await fs.rm(dirPath, { recursive: true, force: true });
            cleanedCount++;
            console.log(`Cleaned up old backup: ${entry.name}`);
          }
        }
      }

      console.log(`Cleanup completed. Removed ${cleanedCount} old backup directories.`);
    } catch (error) {
      console.error('Error during backup cleanup:', error);
    }
  }
}

// Additional interfaces for the rollback system
interface CorrectionLogEntry {
  timestamp: string;
  originalUrl: string;
  correctedUrl: string;
  correctionType: string;
  confidence: number;
  reasoning: string;
  sourceFiles: string[];
  rollbackId: string;
  applied: boolean;
}

interface ValidationReport {
  rollbackId: string;
  timestamp: Date;
  validatedFiles: {
    filePath: string;
    hasOldUrl: boolean;
    hasNewUrl: boolean;
    valid: boolean;
  }[];
  errors: string[];
  success: boolean;
}