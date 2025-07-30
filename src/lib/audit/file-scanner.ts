import * as fs from 'fs';
import * as path from 'path';
import { ScannedLink } from './types';

export interface FileScanResult {
  links: ScannedLink[];
  errors: string[];
}

export class FileScanner {
  private baseDir: string;
  private excludePatterns: string[];

  constructor(baseDir: string = process.cwd(), excludePatterns: string[] = []) {
    this.baseDir = baseDir;
    this.excludePatterns = excludePatterns;
  }

  /**
   * Scan TypeScript/TSX files for links
   */
  async scanTypeScriptFiles(filePaths?: string[]): Promise<FileScanResult> {
    const links: ScannedLink[] = [];
    const errors: string[] = [];

    try {
      const files = filePaths || await this.findTypeScriptFiles();
      
      for (const filePath of files) {
        try {
          const fileLinks = await this.scanTypeScriptFile(filePath);
          links.push(...fileLinks);
        } catch (error) {
          errors.push(`Error scanning ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    } catch (error) {
      errors.push(`Error finding TypeScript files: ${error instanceof Error ? error.message : String(error)}`);
    }

    return { links, errors };
  }

  /**
   * Scan a single TypeScript/TSX file for links
   */
  async scanTypeScriptFile(filePath: string): Promise<ScannedLink[]> {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const links: ScannedLink[] = [];
    const lines = content.split('\n');

    // Patterns to match different types of links in TypeScript/TSX
    const linkPatterns = [
      // Next.js Link component: <Link href="/path">
      {
        regex: /<Link\s+[^>]*href=["']([^"']+)["'][^>]*>/gi,
        type: 'internal' as const,
        context: 'Next.js Link component'
      },
      // Regular anchor tags: <a href="/path">
      {
        regex: /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi,
        type: 'mixed' as const,
        context: 'HTML anchor tag'
      },
      // TrackedLink component: <TrackedLink href="/path">
      {
        regex: /<TrackedLink\s+[^>]*href=["']([^"']+)["'][^>]*>/gi,
        type: 'internal' as const,
        context: 'TrackedLink component'
      },
      // Router.push() calls: router.push('/path')
      {
        regex: /router\.push\(["']([^"']+)["']\)/gi,
        type: 'internal' as const,
        context: 'Router.push() call'
      },
      // useRouter().push() calls: useRouter().push('/path')
      {
        regex: /useRouter\(\)\.push\(["']([^"']+)["']\)/gi,
        type: 'internal' as const,
        context: 'useRouter().push() call'
      },
      // redirect() calls: redirect('/path')
      {
        regex: /redirect\(["']([^"']+)["']\)/gi,
        type: 'internal' as const,
        context: 'redirect() call'
      },
      // Image src attributes: <Image src="/path">
      {
        regex: /<Image\s+[^>]*src=["']([^"']+)["'][^>]*>/gi,
        type: 'download' as const,
        context: 'Image src attribute'
      },
      // Regular img src: <img src="/path">
      {
        regex: /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi,
        type: 'download' as const,
        context: 'img src attribute'
      },
      // Import statements for assets: import image from '/path'
      {
        regex: /import\s+\w+\s+from\s+["']([^"']+\.(jpg|jpeg|png|gif|svg|webp|avif|pdf|doc|docx|zip))["']/gi,
        type: 'download' as const,
        context: 'Asset import statement'
      },
      // Fetch calls: fetch('/api/path')
      {
        regex: /fetch\(["']([^"']+)["']\)/gi,
        type: 'internal' as const,
        context: 'fetch() call'
      },
      // Axios calls: axios.get('/api/path')
      {
        regex: /axios\.(get|post|put|delete|patch)\(["']([^"']+)["']\)/gi,
        type: 'internal' as const,
        context: 'Axios API call'
      }
    ];

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const lineNumber = lineIndex + 1;

      for (const pattern of linkPatterns) {
        let match;
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        
        while ((match = regex.exec(line)) !== null) {
          const url = pattern.type === 'internal' && pattern.context === 'Axios API call' 
            ? match[2] // For axios, the URL is in the second capture group
            : match[1];
          
          if (url && this.isValidUrl(url)) {
            const linkType = this.determineLinkType(url, pattern.type);
            const priority = this.determinePriority(url, linkType, pattern.context);
            
            links.push({
              url: this.normalizeUrl(url),
              sourceFile: path.relative(this.baseDir, filePath),
              sourceLine: lineNumber,
              linkType,
              context: `${pattern.context}: ${line.trim()}`,
              priority
            });
          }
        }
      }
    }

    return links;
  }

  /**
   * Scan Markdown files for links
   */
  async scanMarkdownFiles(filePaths?: string[]): Promise<FileScanResult> {
    const links: ScannedLink[] = [];
    const errors: string[] = [];

    try {
      const files = filePaths || await this.findMarkdownFiles();
      
      for (const filePath of files) {
        try {
          const fileLinks = await this.scanMarkdownFile(filePath);
          links.push(...fileLinks);
        } catch (error) {
          errors.push(`Error scanning ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    } catch (error) {
      errors.push(`Error finding Markdown files: ${error instanceof Error ? error.message : String(error)}`);
    }

    return { links, errors };
  }

  /**
   * Scan a single Markdown file for links
   */
  async scanMarkdownFile(filePath: string): Promise<ScannedLink[]> {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const links: ScannedLink[] = [];
    const lines = content.split('\n');

    // Markdown link patterns
    const linkPatterns = [
      // Markdown links: [text](url)
      {
        regex: /\[([^\]]*)\]\(([^)]+)\)/g,
        context: 'Markdown link'
      },
      // Reference links: [text][ref] and [ref]: url
      {
        regex: /^\s*\[([^\]]+)\]:\s*(.+)$/gm,
        context: 'Markdown reference link'
      },
      // HTML links in markdown: <a href="url">
      {
        regex: /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi,
        context: 'HTML link in Markdown'
      },
      // Image links: ![alt](url)
      {
        regex: /!\[([^\]]*)\]\(([^)]+)\)/g,
        context: 'Markdown image'
      }
    ];

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const lineNumber = lineIndex + 1;

      for (const pattern of linkPatterns) {
        let match;
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        
        while ((match = regex.exec(line)) !== null) {
          const url = match[2] || match[1]; // Different capture groups for different patterns
          
          if (url && this.isValidUrl(url)) {
            const linkType = this.determineLinkType(url, 'mixed');
            const priority = this.determinePriority(url, linkType, pattern.context);
            
            links.push({
              url: this.normalizeUrl(url),
              sourceFile: path.relative(this.baseDir, filePath),
              sourceLine: lineNumber,
              linkType,
              context: `${pattern.context}: ${line.trim()}`,
              priority
            });
          }
        }
      }
    }

    return links;
  }

  /**
   * Scan JSON files for links (like package.json, config files)
   */
  async scanJsonFiles(filePaths?: string[]): Promise<FileScanResult> {
    const links: ScannedLink[] = [];
    const errors: string[] = [];

    try {
      const files = filePaths || await this.findJsonFiles();
      
      for (const filePath of files) {
        try {
          const fileLinks = await this.scanJsonFile(filePath);
          links.push(...fileLinks);
        } catch (error) {
          errors.push(`Error scanning ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    } catch (error) {
      errors.push(`Error finding JSON files: ${error instanceof Error ? error.message : String(error)}`);
    }

    return { links, errors };
  }

  /**
   * Scan a single JSON file for links
   */
  async scanJsonFile(filePath: string): Promise<ScannedLink[]> {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const links: ScannedLink[] = [];

    try {
      const jsonData = JSON.parse(content);
      this.extractLinksFromJson(jsonData, filePath, '', links);
    } catch (error) {
      // Invalid JSON, skip
      return [];
    }

    return links;
  }

  /**
   * Recursively extract links from JSON data
   */
  private extractLinksFromJson(
    obj: any, 
    filePath: string, 
    path: string, 
    links: ScannedLink[]
  ): void {
    if (typeof obj === 'string' && this.isValidUrl(obj)) {
      const linkType = this.determineLinkType(obj, 'mixed');
      const priority = this.determinePriority(obj, linkType, 'JSON value');
      
      links.push({
        url: this.normalizeUrl(obj),
        sourceFile: path.relative(this.baseDir, filePath),
        sourceLine: 1, // JSON doesn't have meaningful line numbers for nested values
        linkType,
        context: `JSON path: ${path}`,
        priority
      });
    } else if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          this.extractLinksFromJson(item, filePath, `${path}[${index}]`, links);
        });
      } else {
        Object.keys(obj).forEach(key => {
          const newPath = path ? `${path}.${key}` : key;
          this.extractLinksFromJson(obj[key], filePath, newPath, links);
        });
      }
    }
  }

  /**
   * Find all TypeScript/TSX files in the project
   */
  private async findTypeScriptFiles(): Promise<string[]> {
    return this.findFiles(['.ts', '.tsx'], ['src', 'pages', 'app', 'components']);
  }

  /**
   * Find all Markdown files in the project
   */
  private async findMarkdownFiles(): Promise<string[]> {
    return this.findFiles(['.md', '.mdx'], ['.']);
  }

  /**
   * Find all JSON files in the project
   */
  private async findJsonFiles(): Promise<string[]> {
    return this.findFiles(['.json'], ['.', 'src', 'public']);
  }

  /**
   * Find files with specific extensions in given directories
   */
  private async findFiles(extensions: string[], searchDirs: string[]): Promise<string[]> {
    const files: string[] = [];

    for (const searchDir of searchDirs) {
      const fullSearchDir = path.resolve(this.baseDir, searchDir);
      
      if (await this.exists(fullSearchDir)) {
        await this.walkDirectory(fullSearchDir, files, extensions);
      }
    }

    return files.filter(file => !this.isExcluded(file));
  }

  /**
   * Recursively walk directory to find files
   */
  private async walkDirectory(dir: string, files: string[], extensions: string[]): Promise<void> {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (!this.isExcluded(fullPath)) {
          await this.walkDirectory(fullPath, files, extensions);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext) && !this.isExcluded(fullPath)) {
          files.push(fullPath);
        }
      }
    }
  }

  /**
   * Check if a file/directory should be excluded
   */
  private isExcluded(filePath: string): boolean {
    const relativePath = path.relative(this.baseDir, filePath);
    
    return this.excludePatterns.some(pattern => {
      // Simple glob-like matching
      if (pattern.includes('**')) {
        const regexPattern = pattern
          .replace(/\*\*/g, '.*')
          .replace(/\*/g, '[^/]*');
        return new RegExp(regexPattern).test(relativePath);
      } else {
        return relativePath.includes(pattern.replace(/\*/g, ''));
      }
    });
  }

  /**
   * Check if a string is a valid URL to scan
   */
  private isValidUrl(url: string): boolean {
    // Skip empty strings, data URLs, javascript:, mailto:, tel:
    if (!url || 
        url.startsWith('data:') || 
        url.startsWith('javascript:') || 
        url.startsWith('mailto:') || 
        url.startsWith('tel:') ||
        url.startsWith('#') || // Skip anchor-only links for now
        url.includes('${') || // Skip template literals
        url.includes('{') || // Skip JSX expressions
        url.length > 2000) { // Skip extremely long URLs
      return false;
    }

    return true;
  }

  /**
   * Determine the type of link
   */
  private determineLinkType(
    url: string, 
    patternType: 'internal' | 'external' | 'download' | 'mixed'
  ): 'internal' | 'external' | 'download' | 'anchor' {
    // If pattern already determined it's download, keep it
    if (patternType === 'download') {
      return 'download';
    }

    // If pattern already determined it's internal, check if it's actually internal
    if (patternType === 'internal') {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        // Check if it's our domain
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://laurentserre.com';
        if (url.startsWith(baseUrl)) {
          return 'internal';
        } else {
          return 'external';
        }
      }
      return 'internal';
    }

    // For mixed type, determine based on URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://laurentserre.com';
      return url.startsWith(baseUrl) ? 'internal' : 'external';
    }

    if (url.startsWith('#')) {
      return 'anchor';
    }

    // Check if it's a download based on file extension
    const downloadExtensions = [
      '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
      '.zip', '.rar', '.tar', '.gz', '.7z',
      '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif',
      '.mp4', '.avi', '.mov', '.wmv', '.flv',
      '.mp3', '.wav', '.ogg', '.flac'
    ];

    const hasDownloadExtension = downloadExtensions.some(ext => 
      url.toLowerCase().includes(ext)
    );

    if (hasDownloadExtension) {
      return 'download';
    }

    // Default to internal for relative URLs
    return 'internal';
  }

  /**
   * Determine the priority of a link based on its characteristics
   */
  private determinePriority(
    url: string, 
    linkType: 'internal' | 'external' | 'download' | 'anchor',
    context: string
  ): 'critical' | 'high' | 'medium' | 'low' {
    // Critical: Main navigation, important pages
    if (linkType === 'internal') {
      const criticalPaths = [
        '/', '/contact', '/services', '/a-propos',
        '/formation-commerciale-pme', '/coach-commercial-entreprise',
        '/ressources', '/blog'
      ];
      
      if (criticalPaths.some(path => url === path || url.endsWith(path))) {
        return 'critical';
      }

      // High priority for API routes and important functionality
      if (url.startsWith('/api/') || context.includes('fetch') || context.includes('axios')) {
        return 'high';
      }
    }

    // High: Download resources, external references
    if (linkType === 'download') {
      return 'high';
    }

    // Medium: External links, blog posts, resource pages
    if (linkType === 'external' || url.includes('/blog/') || url.includes('/ressources/')) {
      return 'medium';
    }

    // Low: Anchors, images, other internal links
    return 'low';
  }

  /**
   * Normalize URL for consistent comparison
   */
  private normalizeUrl(url: string): string {
    // Remove trailing slashes except for root
    if (url.length > 1 && url.endsWith('/')) {
      url = url.slice(0, -1);
    }

    // Remove query parameters and fragments for internal links
    if (!url.startsWith('http')) {
      const questionIndex = url.indexOf('?');
      if (questionIndex !== -1) {
        url = url.substring(0, questionIndex);
      }
      
      const hashIndex = url.indexOf('#');
      if (hashIndex !== -1) {
        url = url.substring(0, hashIndex);
      }
    }

    return url;
  }

  /**
   * Check if file/directory exists
   */
  private async exists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}