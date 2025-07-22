/**
 * Link Extractor Utility
 * Extracts links from React components and pages for validation
 */

import fs from 'fs';
import path from 'path';

export interface ExtractedLink {
  url: string;
  source: string;
  lineNumber?: number;
  context?: string;
}

export class LinkExtractor {
  private srcPath: string;

  constructor(srcPath: string = 'src') {
    this.srcPath = srcPath;
  }

  /**
   * Extracts all internal links from the project
   */
  async extractAllLinks(): Promise<ExtractedLink[]> {
    const links: ExtractedLink[] = [];
    
    // Extract from pages
    const pageLinks = await this.extractFromDirectory(path.join(this.srcPath, 'app'));
    links.push(...pageLinks);
    
    // Extract from components
    const componentLinks = await this.extractFromDirectory(path.join(this.srcPath, 'components'));
    links.push(...componentLinks);

    return this.deduplicateLinks(links);
  }

  /**
   * Extracts links from a specific directory
   */
  private async extractFromDirectory(dirPath: string): Promise<ExtractedLink[]> {
    const links: ExtractedLink[] = [];
    
    if (!fs.existsSync(dirPath)) {
      return links;
    }

    const files = this.getAllFiles(dirPath, ['.tsx', '.ts', '.jsx', '.js']);
    
    for (const file of files) {
      const fileLinks = await this.extractFromFile(file);
      links.push(...fileLinks);
    }

    return links;
  }

  /**
   * Extracts links from a single file
   */
  private async extractFromFile(filePath: string): Promise<ExtractedLink[]> {
    const links: ExtractedLink[] = [];
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Extract href attributes
        const hrefMatches = line.match(/href=["']([^"']+)["']/g);
        if (hrefMatches) {
          hrefMatches.forEach(match => {
            const url = match.match(/href=["']([^"']+)["']/)?.[1];
            if (url && this.isInternalLink(url)) {
              links.push({
                url,
                source: filePath,
                lineNumber: index + 1,
                context: line.trim()
              });
            }
          });
        }

        // Extract Link components
        const linkMatches = line.match(/<Link[^>]*href=["']([^"']+)["'][^>]*>/g);
        if (linkMatches) {
          linkMatches.forEach(match => {
            const url = match.match(/href=["']([^"']+)["']/)?.[1];
            if (url && this.isInternalLink(url)) {
              links.push({
                url,
                source: filePath,
                lineNumber: index + 1,
                context: line.trim()
              });
            }
          });
        }

        // Extract router.push calls
        const routerMatches = line.match(/router\.push\(["']([^"']+)["']\)/g);
        if (routerMatches) {
          routerMatches.forEach(match => {
            const url = match.match(/router\.push\(["']([^"']+)["']\)/)?.[1];
            if (url && this.isInternalLink(url)) {
              links.push({
                url,
                source: filePath,
                lineNumber: index + 1,
                context: line.trim()
              });
            }
          });
        }

        // Extract redirect calls
        const redirectMatches = line.match(/redirect\(["']([^"']+)["']\)/g);
        if (redirectMatches) {
          redirectMatches.forEach(match => {
            const url = match.match(/redirect\(["']([^"']+)["']\)/)?.[1];
            if (url && this.isInternalLink(url)) {
              links.push({
                url,
                source: filePath,
                lineNumber: index + 1,
                context: line.trim()
              });
            }
          });
        }
      });
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }

    return links;
  }

  /**
   * Gets all files with specified extensions from a directory
   */
  private getAllFiles(dirPath: string, extensions: string[]): string[] {
    const files: string[] = [];
    
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and .next directories
        if (!item.startsWith('.') && item !== 'node_modules') {
          files.push(...this.getAllFiles(fullPath, extensions));
        }
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Checks if a URL is an internal link
   */
  private isInternalLink(url: string): boolean {
    // Skip external URLs
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return false;
    }
    
    // Skip mailto and tel links
    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
      return false;
    }
    
    // Skip anchors without path
    if (url.startsWith('#')) {
      return false;
    }
    
    // Skip data URLs
    if (url.startsWith('data:')) {
      return false;
    }

    return true;
  }

  /**
   * Removes duplicate links
   */
  private deduplicateLinks(links: ExtractedLink[]): ExtractedLink[] {
    const seen = new Set<string>();
    return links.filter(link => {
      const key = `${link.url}|${link.source}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  /**
   * Extracts links from specific pages that are known to have issues
   */
  async extractProblematicLinks(): Promise<ExtractedLink[]> {
    const problematicPages = [
      'src/app/page.tsx', // Homepage
      'src/app/formation-commerciale-pme/page.tsx',
      'src/components/sections/ResourcesPMESection.tsx'
    ];

    const links: ExtractedLink[] = [];
    
    for (const pagePath of problematicPages) {
      if (fs.existsSync(pagePath)) {
        const pageLinks = await this.extractFromFile(pagePath);
        links.push(...pageLinks);
      }
    }

    return this.deduplicateLinks(links);
  }

  /**
   * Gets a summary of extracted links by domain/category
   */
  getLinkSummary(links: ExtractedLink[]): Record<string, number> {
    const summary: Record<string, number> = {};
    
    links.forEach(link => {
      const category = this.categorizeLink(link.url);
      summary[category] = (summary[category] || 0) + 1;
    });

    return summary;
  }

  /**
   * Categorizes a link based on its path
   */
  private categorizeLink(url: string): string {
    if (url.startsWith('/ressources')) {
      if (url.includes('script') || url.includes('prospection')) return 'prospection';
      if (url.includes('linkedin') || url.includes('reseau')) return 'social';
      if (url.includes('suivi') || url.includes('prospect')) return 'tracking';
      if (url.includes('motivation') || url.includes('coaching')) return 'management';
      if (url.includes('recrutement')) return 'recruitment';
      return 'resources';
    }
    
    if (url.startsWith('/bootcamp')) return 'bootcamp';
    if (url.startsWith('/diagnostic')) return 'diagnostic';
    if (url.startsWith('/contact')) return 'contact';
    if (url.startsWith('/blog')) return 'blog';
    
    return 'other';
  }
}

// Export singleton instance
export const linkExtractor = new LinkExtractor();

// Export utility functions
export const extractAllLinks = () => linkExtractor.extractAllLinks();
export const extractProblematicLinks = () => linkExtractor.extractProblematicLinks();