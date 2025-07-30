import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';
import { ScannedLink } from './types';

export interface SitemapScanResult {
  links: ScannedLink[];
  errors: string[];
  pages: string[];
}

export class SitemapScanner {
  private baseUrl: string;
  private baseDir: string;

  constructor(baseUrl: string, baseDir: string = process.cwd()) {
    this.baseUrl = baseUrl;
    this.baseDir = baseDir;
  }

  /**
   * Scan sitemap.ts file to extract all pages
   */
  async scanSitemap(): Promise<SitemapScanResult> {
    const links: ScannedLink[] = [];
    const errors: string[] = [];
    const pages: string[] = [];

    try {
      // Try to import the sitemap function dynamically
      const sitemapPath = path.join(this.baseDir, 'src/app/sitemap.ts');
      
      if (await this.exists(sitemapPath)) {
        const sitemapContent = await fs.promises.readFile(sitemapPath, 'utf-8');
        
        // Extract URLs from the sitemap content using regex
        const urlMatches = sitemapContent.match(/url:\s*[`"']([^`"']+)[`"']/g);
        
        if (urlMatches) {
          for (const match of urlMatches) {
            const urlMatch = match.match(/url:\s*[`"']([^`"']+)[`"']/);
            if (urlMatch && urlMatch[1]) {
              const fullUrl = urlMatch[1];
              const relativePath = fullUrl.replace(this.baseUrl, '') || '/';
              pages.push(relativePath);
              
              // Add the sitemap entry as a scanned link
              links.push({
                url: relativePath,
                sourceFile: 'src/app/sitemap.ts',
                sourceLine: this.getLineNumber(sitemapContent, match),
                linkType: 'internal',
                context: `Sitemap entry: ${match.trim()}`,
                priority: this.determineSitemapPriority(relativePath)
              });
            }
          }
        }
      } else {
        errors.push('Sitemap file not found at src/app/sitemap.ts');
      }
    } catch (error) {
      errors.push(`Error scanning sitemap: ${error instanceof Error ? error.message : String(error)}`);
    }

    return { links, errors, pages };
  }

  /**
   * Crawl pages and extract links from rendered HTML
   */
  async crawlPages(pages: string[]): Promise<SitemapScanResult> {
    const links: ScannedLink[] = [];
    const errors: string[] = [];
    const discoveredPages: string[] = [];

    for (const page of pages) {
      try {
        const pageLinks = await this.crawlPage(page);
        links.push(...pageLinks);
        
        // Extract unique internal pages discovered
        const internalPages = pageLinks
          .filter(link => link.linkType === 'internal')
          .map(link => link.url)
          .filter(url => !pages.includes(url) && !discoveredPages.includes(url));
        
        discoveredPages.push(...internalPages);
      } catch (error) {
        errors.push(`Error crawling page ${page}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return { links, errors, pages: discoveredPages };
  }

  /**
   * Crawl a single page and extract links
   */
  async crawlPage(pagePath: string): Promise<ScannedLink[]> {
    const links: ScannedLink[] = [];

    try {
      // For Next.js, we need to check if there's a corresponding page file
      const pageFile = await this.findPageFile(pagePath);
      
      if (pageFile) {
        // If we have the source file, scan it directly
        const fileContent = await fs.promises.readFile(pageFile, 'utf-8');
        const fileLinks = await this.extractLinksFromPageContent(fileContent, pageFile, pagePath);
        links.push(...fileLinks);
      } else {
        // If no source file found, we could potentially make HTTP requests
        // to the actual page, but for now we'll just note it
        links.push({
          url: pagePath,
          sourceFile: 'sitemap.ts',
          sourceLine: 1,
          linkType: 'internal',
          context: 'Page discovered from sitemap but no source file found',
          priority: 'medium'
        });
      }
    } catch (error) {
      // Skip pages that can't be processed
    }

    return links;
  }

  /**
   * Extract links from page content (TSX/JSX)
   */
  private async extractLinksFromPageContent(
    content: string, 
    sourceFile: string, 
    pagePath: string
  ): Promise<ScannedLink[]> {
    const links: ScannedLink[] = [];
    const lines = content.split('\n');

    // Patterns to match different types of links in page components
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
      // API routes in fetch calls
      {
        regex: /fetch\(["']([^"']+)["']\)/gi,
        type: 'internal' as const,
        context: 'fetch() API call'
      },
      // Router.push() calls
      {
        regex: /router\.push\(["']([^"']+)["']\)/gi,
        type: 'internal' as const,
        context: 'Router.push() call'
      },
      // redirect() calls
      {
        regex: /redirect\(["']([^"']+)["']\)/gi,
        type: 'internal' as const,
        context: 'redirect() call'
      }
    ];

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const lineNumber = lineIndex + 1;

      for (const pattern of linkPatterns) {
        let match;
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        
        while ((match = regex.exec(line)) !== null) {
          const url = match[1];
          
          if (url && this.isValidUrl(url)) {
            const linkType = this.determineLinkType(url, pattern.type);
            const priority = this.determinePriority(url, linkType, pattern.context, pagePath);
            
            links.push({
              url: this.normalizeUrl(url),
              sourceFile: path.relative(this.baseDir, sourceFile),
              sourceLine: lineNumber,
              linkType,
              context: `${pattern.context} in page ${pagePath}: ${line.trim()}`,
              priority
            });
          }
        }
      }
    }

    return links;
  }

  /**
   * Find the source file for a given page path
   */
  private async findPageFile(pagePath: string): Promise<string | null> {
    // Next.js App Router structure
    const possiblePaths = [
      // App router: app/path/page.tsx
      path.join(this.baseDir, 'src/app', pagePath === '/' ? '' : pagePath, 'page.tsx'),
      path.join(this.baseDir, 'src/app', pagePath === '/' ? '' : pagePath, 'page.ts'),
      path.join(this.baseDir, 'src/app', pagePath === '/' ? '' : pagePath, 'page.jsx'),
      path.join(this.baseDir, 'src/app', pagePath === '/' ? '' : pagePath, 'page.js'),
      
      // App router without src: app/path/page.tsx
      path.join(this.baseDir, 'app', pagePath === '/' ? '' : pagePath, 'page.tsx'),
      path.join(this.baseDir, 'app', pagePath === '/' ? '' : pagePath, 'page.ts'),
      
      // Pages router: pages/path.tsx
      path.join(this.baseDir, 'pages', pagePath === '/' ? 'index.tsx' : `${pagePath}.tsx`),
      path.join(this.baseDir, 'pages', pagePath === '/' ? 'index.ts' : `${pagePath}.ts`),
      path.join(this.baseDir, 'pages', pagePath === '/' ? 'index.jsx' : `${pagePath}.jsx`),
      path.join(this.baseDir, 'pages', pagePath === '/' ? 'index.js' : `${pagePath}.js`),
    ];

    for (const possiblePath of possiblePaths) {
      if (await this.exists(possiblePath)) {
        return possiblePath;
      }
    }

    return null;
  }

  /**
   * Extract links from rendered HTML (if we were to fetch pages)
   */
  private extractLinksFromHTML(html: string, sourceUrl: string): ScannedLink[] {
    const links: ScannedLink[] = [];
    
    try {
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Extract all anchor tags
      const anchors = document.querySelectorAll('a[href]');
      anchors.forEach((anchor, index) => {
        const href = anchor.getAttribute('href');
        if (href && this.isValidUrl(href)) {
          const linkType = this.determineLinkType(href, 'mixed');
          const priority = this.determinePriority(href, linkType, 'HTML anchor', sourceUrl);
          
          links.push({
            url: this.normalizeUrl(href),
            sourceFile: `rendered:${sourceUrl}`,
            sourceLine: index + 1, // Approximate line number
            linkType,
            context: `HTML anchor in rendered page: ${anchor.textContent?.trim() || 'No text'}`,
            priority
          });
        }
      });

      // Extract all images
      const images = document.querySelectorAll('img[src]');
      images.forEach((img, index) => {
        const src = img.getAttribute('src');
        if (src && this.isValidUrl(src)) {
          links.push({
            url: this.normalizeUrl(src),
            sourceFile: `rendered:${sourceUrl}`,
            sourceLine: index + 1,
            linkType: 'download',
            context: `Image in rendered page: ${img.getAttribute('alt') || 'No alt text'}`,
            priority: 'medium'
          });
        }
      });

      // Extract all links (stylesheets, scripts, etc.)
      const linkElements = document.querySelectorAll('link[href]');
      linkElements.forEach((link, index) => {
        const href = link.getAttribute('href');
        if (href && this.isValidUrl(href)) {
          const linkType = this.determineLinkType(href, 'mixed');
          
          links.push({
            url: this.normalizeUrl(href),
            sourceFile: `rendered:${sourceUrl}`,
            sourceLine: index + 1,
            linkType,
            context: `Link element in rendered page: ${link.getAttribute('rel') || 'unknown'}`,
            priority: 'low'
          });
        }
      });

    } catch (error) {
      // Skip HTML parsing errors
    }

    return links;
  }

  /**
   * Get line number of a match in content
   */
  private getLineNumber(content: string, match: string): number {
    const beforeMatch = content.substring(0, content.indexOf(match));
    return beforeMatch.split('\n').length;
  }

  /**
   * Determine priority for sitemap entries
   */
  private determineSitemapPriority(path: string): 'critical' | 'high' | 'medium' | 'low' {
    // Critical pages
    if (path === '/' || 
        path === '/contact' || 
        path === '/expert-developpement-commercial-pme' ||
        path === '/formation-commerciale-pme') {
      return 'critical';
    }

    // High priority pages
    if (path.startsWith('/ressources') || 
        path.startsWith('/blog') ||
        path === '/bootcamp' ||
        path === '/diagnostic') {
      return 'high';
    }

    // Medium priority
    if (path.startsWith('/management') || 
        path.includes('commercial') ||
        path.includes('formation')) {
      return 'medium';
    }

    // Low priority (legal pages, etc.)
    return 'low';
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
        if (url.startsWith(this.baseUrl)) {
          return 'internal';
        } else {
          return 'external';
        }
      }
      return 'internal';
    }

    // For mixed type, determine based on URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url.startsWith(this.baseUrl) ? 'internal' : 'external';
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
    context: string,
    sourcePage: string
  ): 'critical' | 'high' | 'medium' | 'low' {
    // Critical: Main navigation, important pages
    if (linkType === 'internal') {
      const criticalPaths = [
        '/', '/contact', '/services', '/a-propos',
        '/formation-commerciale-pme', '/coach-commercial-entreprise',
        '/ressources', '/blog', '/expert-developpement-commercial-pme'
      ];
      
      if (criticalPaths.some(path => url === path || url.endsWith(path))) {
        return 'critical';
      }

      // High priority for API routes and important functionality
      if (url.startsWith('/api/') || context.includes('fetch') || context.includes('axios')) {
        return 'high';
      }

      // High priority if linked from critical pages
      if (sourcePage === '/' || sourcePage === '/expert-developpement-commercial-pme') {
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