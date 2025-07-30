import { FileScanner, FileScanResult } from './file-scanner';
import { SitemapScanner, SitemapScanResult } from './sitemap-scanner';
import { LinkClassifier, LinkClassification, ClassificationStatistics } from './link-classifier';
import { ScannedLink, LinkScannerConfig } from './types';
import { defaultScannerConfig } from './config';

export interface LinkScanResult {
  links: ScannedLink[];
  classifications: Map<string, LinkClassification>;
  statistics: ClassificationStatistics;
  errors: string[];
  summary: {
    totalLinks: number;
    internalLinks: number;
    externalLinks: number;
    downloadLinks: number;
    anchorLinks: number;
    criticalLinks: number;
    highPriorityLinks: number;
    averageSeoImpact: number;
    riskScore: number;
  };
}

export class LinkScanner {
  private config: LinkScannerConfig;
  private fileScanner: FileScanner;
  private sitemapScanner: SitemapScanner;
  private linkClassifier: LinkClassifier;

  constructor(config: Partial<LinkScannerConfig> = {}) {
    this.config = { ...defaultScannerConfig, ...config };
    this.fileScanner = new FileScanner(process.cwd(), this.config.excludePatterns);
    this.sitemapScanner = new SitemapScanner(this.config.baseUrl);
    this.linkClassifier = new LinkClassifier(this.config.baseUrl);
  }

  /**
   * Run a complete scan of all links in the project
   */
  async scanAllLinks(): Promise<LinkScanResult> {
    const allLinks: ScannedLink[] = [];
    const allErrors: string[] = [];

    try {
      // 1. Scan TypeScript/TSX files
      console.log('Scanning TypeScript/TSX files...');
      const tsResult = await this.fileScanner.scanTypeScriptFiles();
      allLinks.push(...tsResult.links);
      allErrors.push(...tsResult.errors);
      console.log(`Found ${tsResult.links.length} links in TypeScript files`);

      // 2. Scan Markdown files
      console.log('Scanning Markdown files...');
      const mdResult = await this.fileScanner.scanMarkdownFiles();
      allLinks.push(...mdResult.links);
      allErrors.push(...mdResult.errors);
      console.log(`Found ${mdResult.links.length} links in Markdown files`);

      // 3. Scan JSON files
      console.log('Scanning JSON files...');
      const jsonResult = await this.fileScanner.scanJsonFiles();
      allLinks.push(...jsonResult.links);
      allErrors.push(...jsonResult.errors);
      console.log(`Found ${jsonResult.links.length} links in JSON files`);

      // 4. Scan sitemap
      console.log('Scanning sitemap...');
      const sitemapResult = await this.sitemapScanner.scanSitemap();
      allLinks.push(...sitemapResult.links);
      allErrors.push(...sitemapResult.errors);
      console.log(`Found ${sitemapResult.links.length} links in sitemap`);

      // 5. Crawl pages from sitemap
      if (sitemapResult.pages.length > 0) {
        console.log(`Crawling ${sitemapResult.pages.length} pages from sitemap...`);
        const crawlResult = await this.sitemapScanner.crawlPages(sitemapResult.pages);
        allLinks.push(...crawlResult.links);
        allErrors.push(...crawlResult.errors);
        console.log(`Found ${crawlResult.links.length} additional links from page crawling`);
      }

      // 6. Remove duplicates
      const uniqueLinks = this.deduplicateLinks(allLinks);
      console.log(`Total unique links found: ${uniqueLinks.length}`);

      // 7. Classify all links
      console.log('Classifying links...');
      const classificationResult = this.linkClassifier.classifyLinks(uniqueLinks);

      // 8. Generate summary
      const summary = this.generateSummary(uniqueLinks, classificationResult.statistics);

      return {
        links: uniqueLinks,
        classifications: classificationResult.classifications,
        statistics: classificationResult.statistics,
        errors: allErrors,
        summary
      };

    } catch (error) {
      allErrors.push(`Critical error during scan: ${error instanceof Error ? error.message : String(error)}`);
      
      // Return partial results even if there was an error
      const uniqueLinks = this.deduplicateLinks(allLinks);
      const classificationResult = this.linkClassifier.classifyLinks(uniqueLinks);
      const summary = this.generateSummary(uniqueLinks, classificationResult.statistics);

      return {
        links: uniqueLinks,
        classifications: classificationResult.classifications,
        statistics: classificationResult.statistics,
        errors: allErrors,
        summary
      };
    }
  }

  /**
   * Scan specific file types only
   */
  async scanFileType(type: 'typescript' | 'markdown' | 'json'): Promise<FileScanResult> {
    switch (type) {
      case 'typescript':
        return await this.fileScanner.scanTypeScriptFiles();
      case 'markdown':
        return await this.fileScanner.scanMarkdownFiles();
      case 'json':
        return await this.fileScanner.scanJsonFiles();
      default:
        throw new Error(`Unknown file type: ${type}`);
    }
  }

  /**
   * Scan sitemap only
   */
  async scanSitemap(): Promise<SitemapScanResult> {
    return await this.sitemapScanner.scanSitemap();
  }

  /**
   * Scan specific files
   */
  async scanSpecificFiles(filePaths: string[]): Promise<LinkScanResult> {
    const allLinks: ScannedLink[] = [];
    const allErrors: string[] = [];

    for (const filePath of filePaths) {
      try {
        if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
          const result = await this.fileScanner.scanTypeScriptFiles([filePath]);
          allLinks.push(...result.links);
          allErrors.push(...result.errors);
        } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
          const result = await this.fileScanner.scanMarkdownFiles([filePath]);
          allLinks.push(...result.links);
          allErrors.push(...result.errors);
        } else if (filePath.endsWith('.json')) {
          const result = await this.fileScanner.scanJsonFiles([filePath]);
          allLinks.push(...result.links);
          allErrors.push(...result.errors);
        }
      } catch (error) {
        allErrors.push(`Error scanning ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    const uniqueLinks = this.deduplicateLinks(allLinks);
    const classificationResult = this.linkClassifier.classifyLinks(uniqueLinks);
    const summary = this.generateSummary(uniqueLinks, classificationResult.statistics);

    return {
      links: uniqueLinks,
      classifications: classificationResult.classifications,
      statistics: classificationResult.statistics,
      errors: allErrors,
      summary
    };
  }

  /**
   * Get links by priority
   */
  getLinksbyPriority(
    result: LinkScanResult, 
    priority: 'critical' | 'high' | 'medium' | 'low'
  ): ScannedLink[] {
    return result.links.filter(link => {
      const linkKey = `${link.url}|${link.sourceFile}|${link.sourceLine}`;
      const classification = result.classifications.get(linkKey);
      return classification?.priority === priority;
    });
  }

  /**
   * Get links by type
   */
  getLinksByType(
    result: LinkScanResult, 
    type: 'internal' | 'external' | 'download' | 'anchor'
  ): ScannedLink[] {
    return result.links.filter(link => {
      const linkKey = `${link.url}|${link.sourceFile}|${link.sourceLine}`;
      const classification = result.classifications.get(linkKey);
      return classification?.type === type;
    });
  }

  /**
   * Get links by category
   */
  getLinksByCategory(result: LinkScanResult, category: string): ScannedLink[] {
    return result.links.filter(link => {
      const linkKey = `${link.url}|${link.sourceFile}|${link.sourceLine}`;
      const classification = result.classifications.get(linkKey);
      return classification?.category === category;
    });
  }

  /**
   * Get high SEO impact links
   */
  getHighSeoImpactLinks(result: LinkScanResult, minImpact: number = 7): ScannedLink[] {
    return result.links.filter(link => {
      const linkKey = `${link.url}|${link.sourceFile}|${link.sourceLine}`;
      const classification = result.classifications.get(linkKey);
      return classification && classification.seoImpact >= minImpact;
    });
  }

  /**
   * Remove duplicate links (same URL from same source)
   */
  private deduplicateLinks(links: ScannedLink[]): ScannedLink[] {
    const seen = new Set<string>();
    const unique: ScannedLink[] = [];

    for (const link of links) {
      const key = `${link.url}|${link.sourceFile}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(link);
      }
    }

    return unique;
  }

  /**
   * Generate summary statistics
   */
  private generateSummary(
    links: ScannedLink[], 
    statistics: ClassificationStatistics
  ): LinkScanResult['summary'] {
    return {
      totalLinks: statistics.total,
      internalLinks: statistics.byType.internal,
      externalLinks: statistics.byType.external,
      downloadLinks: statistics.byType.download,
      anchorLinks: statistics.byType.anchor,
      criticalLinks: statistics.byPriority.critical,
      highPriorityLinks: statistics.byPriority.high,
      averageSeoImpact: statistics.averageSeoImpact,
      riskScore: statistics.riskScore
    };
  }

  /**
   * Update scanner configuration
   */
  updateConfig(newConfig: Partial<LinkScannerConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.fileScanner = new FileScanner(process.cwd(), this.config.excludePatterns);
    this.sitemapScanner = new SitemapScanner(this.config.baseUrl);
    this.linkClassifier = new LinkClassifier(this.config.baseUrl);
  }

  /**
   * Get current configuration
   */
  getConfig(): LinkScannerConfig {
    return { ...this.config };
  }
}