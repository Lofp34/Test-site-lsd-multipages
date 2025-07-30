import { ScannedLink } from './types';

export interface LinkClassification {
  type: 'internal' | 'external' | 'download' | 'anchor';
  priority: 'critical' | 'high' | 'medium' | 'low';
  seoImpact: number; // 1-10 scale
  category: string;
  reasoning: string;
  context: LinkContext;
}

export interface LinkContext {
  sourceType: 'page' | 'component' | 'config' | 'markdown' | 'sitemap';
  sourceImportance: 'critical' | 'high' | 'medium' | 'low';
  linkPosition: 'navigation' | 'content' | 'footer' | 'sidebar' | 'api' | 'asset';
  userJourney: 'primary' | 'secondary' | 'tertiary' | 'utility';
}

export class LinkClassifier {
  private baseUrl: string;
  private criticalPages: Set<string>;
  private downloadExtensions: Set<string>;
  private apiPaths: Set<string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.initializeCriticalPages();
    this.initializeDownloadExtensions();
    this.initializeApiPaths();
  }

  /**
   * Classify a single link
   */
  classifyLink(link: ScannedLink): LinkClassification {
    const type = this.determineLinkType(link.url);
    const context = this.analyzeContext(link);
    const priority = this.determinePriority(link, type, context);
    const seoImpact = this.calculateSeoImpact(link, type, priority, context);
    const category = this.categorizeLink(link, type, context);
    const reasoning = this.generateReasoning(link, type, priority, context);

    return {
      type,
      priority,
      seoImpact,
      category,
      reasoning,
      context
    };
  }

  /**
   * Classify multiple links and group them
   */
  classifyLinks(links: ScannedLink[]): {
    classifications: Map<string, LinkClassification>;
    groupedByType: Map<string, ScannedLink[]>;
    groupedByPriority: Map<string, ScannedLink[]>;
    groupedByCategory: Map<string, ScannedLink[]>;
    statistics: ClassificationStatistics;
  } {
    const classifications = new Map<string, LinkClassification>();
    const groupedByType = new Map<string, ScannedLink[]>();
    const groupedByPriority = new Map<string, ScannedLink[]>();
    const groupedByCategory = new Map<string, ScannedLink[]>();

    // Initialize groups
    ['internal', 'external', 'download', 'anchor'].forEach(type => {
      groupedByType.set(type, []);
    });
    ['critical', 'high', 'medium', 'low'].forEach(priority => {
      groupedByPriority.set(priority, []);
    });

    // Classify each link
    for (const link of links) {
      const classification = this.classifyLink(link);
      const linkKey = `${link.url}|${link.sourceFile}|${link.sourceLine}`;
      
      classifications.set(linkKey, classification);
      
      // Group by type
      groupedByType.get(classification.type)?.push(link);
      
      // Group by priority
      groupedByPriority.get(classification.priority)?.push(link);
      
      // Group by category
      if (!groupedByCategory.has(classification.category)) {
        groupedByCategory.set(classification.category, []);
      }
      groupedByCategory.get(classification.category)?.push(link);
    }

    const statistics = this.calculateStatistics(links, classifications);

    return {
      classifications,
      groupedByType,
      groupedByPriority,
      groupedByCategory,
      statistics
    };
  }

  /**
   * Determine the type of link
   */
  private determineLinkType(url: string): 'internal' | 'external' | 'download' | 'anchor' {
    // Anchor links
    if (url.startsWith('#')) {
      return 'anchor';
    }

    // External links
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url.startsWith(this.baseUrl) ? 'internal' : 'external';
    }

    // Check for download files by extension
    const urlLower = url.toLowerCase();
    for (const ext of this.downloadExtensions) {
      if (urlLower.includes(ext)) {
        return 'download';
      }
    }

    // Default to internal for relative URLs
    return 'internal';
  }

  /**
   * Analyze the context of a link
   */
  private analyzeContext(link: ScannedLink): LinkContext {
    const sourceType = this.determineSourceType(link.sourceFile);
    const sourceImportance = this.determineSourceImportance(link.sourceFile, link.url);
    const linkPosition = this.determineLinkPosition(link.context, link.url);
    const userJourney = this.determineUserJourney(link.url, sourceType, linkPosition);

    return {
      sourceType,
      sourceImportance,
      linkPosition,
      userJourney
    };
  }

  /**
   * Determine source type based on file path
   */
  private determineSourceType(sourceFile: string): 'page' | 'component' | 'config' | 'markdown' | 'sitemap' {
    if (sourceFile.includes('sitemap')) return 'sitemap';
    if (sourceFile.endsWith('.md') || sourceFile.endsWith('.mdx')) return 'markdown';
    if (sourceFile.includes('/pages/') || sourceFile.includes('/app/') && sourceFile.includes('page.')) return 'page';
    if (sourceFile.includes('/components/')) return 'component';
    if (sourceFile.endsWith('.json') || sourceFile.includes('config')) return 'config';
    return 'component'; // default
  }

  /**
   * Determine source importance
   */
  private determineSourceImportance(sourceFile: string, url: string): 'critical' | 'high' | 'medium' | 'low' {
    // Critical pages
    if (sourceFile.includes('page.tsx') || sourceFile.includes('page.ts')) {
      const pagePath = this.extractPagePath(sourceFile);
      if (this.criticalPages.has(pagePath)) {
        return 'critical';
      }
    }

    // High importance components
    if (sourceFile.includes('layout') || 
        sourceFile.includes('navigation') || 
        sourceFile.includes('header') || 
        sourceFile.includes('footer')) {
      return 'high';
    }

    // Medium importance
    if (sourceFile.includes('/components/sections/') || 
        sourceFile.includes('sitemap')) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Determine link position in the page/component
   */
  private determineLinkPosition(context: string, url: string): 'navigation' | 'content' | 'footer' | 'sidebar' | 'api' | 'asset' {
    const contextLower = context.toLowerCase();

    if (url.startsWith('/api/') || contextLower.includes('fetch') || contextLower.includes('axios')) {
      return 'api';
    }

    if (contextLower.includes('image') || contextLower.includes('img') || contextLower.includes('asset')) {
      return 'asset';
    }

    if (contextLower.includes('nav') || contextLower.includes('menu') || contextLower.includes('header')) {
      return 'navigation';
    }

    if (contextLower.includes('footer')) {
      return 'footer';
    }

    if (contextLower.includes('sidebar') || contextLower.includes('aside')) {
      return 'sidebar';
    }

    return 'content'; // default
  }

  /**
   * Determine user journey importance
   */
  private determineUserJourney(
    url: string, 
    sourceType: LinkContext['sourceType'], 
    linkPosition: LinkContext['linkPosition']
  ): 'primary' | 'secondary' | 'tertiary' | 'utility' {
    // Primary journey: critical pages and main navigation
    if (this.criticalPages.has(url) || linkPosition === 'navigation') {
      return 'primary';
    }

    // Secondary: important content and resources
    if (url.includes('/ressources') || 
        url.includes('/blog') || 
        url.includes('/formation') ||
        linkPosition === 'content') {
      return 'secondary';
    }

    // Tertiary: supporting content
    if (url.includes('/cas-clients') || 
        url.includes('/management') ||
        linkPosition === 'sidebar') {
      return 'tertiary';
    }

    // Utility: legal pages, assets, API
    return 'utility';
  }

  /**
   * Determine priority based on multiple factors
   */
  private determinePriority(
    link: ScannedLink, 
    type: LinkClassification['type'], 
    context: LinkContext
  ): 'critical' | 'high' | 'medium' | 'low' {
    // Critical: Essential pages from critical sources
    if (context.sourceImportance === 'critical' && 
        context.userJourney === 'primary' && 
        type === 'internal') {
      return 'critical';
    }

    // High: Important functionality and resources
    if ((type === 'internal' && (context.linkPosition === 'navigation' || context.linkPosition === 'api')) ||
        (type === 'download' && context.userJourney !== 'utility') ||
        (context.sourceImportance === 'high' && context.userJourney === 'primary')) {
      return 'high';
    }

    // Medium: Regular content and external references
    if ((type === 'external' && context.userJourney === 'secondary') ||
        (type === 'internal' && context.userJourney === 'secondary') ||
        (type === 'download' && context.userJourney === 'utility')) {
      return 'medium';
    }

    // Low: Assets, anchors, utility links
    return 'low';
  }

  /**
   * Calculate SEO impact score (1-10)
   */
  private calculateSeoImpact(
    link: ScannedLink, 
    type: LinkClassification['type'], 
    priority: LinkClassification['priority'], 
    context: LinkContext
  ): number {
    let score = 1;

    // Base score by type
    switch (type) {
      case 'internal':
        score = 7; // Internal links are important for SEO
        break;
      case 'external':
        score = 5; // External links have moderate impact
        break;
      case 'download':
        score = 6; // Download links affect user experience
        break;
      case 'anchor':
        score = 3; // Anchor links have lower SEO impact
        break;
    }

    // Adjust by priority
    switch (priority) {
      case 'critical':
        score += 3;
        break;
      case 'high':
        score += 2;
        break;
      case 'medium':
        score += 1;
        break;
      case 'low':
        score += 0;
        break;
    }

    // Adjust by context
    if (context.linkPosition === 'navigation') score += 2;
    if (context.linkPosition === 'api') score += 1;
    if (context.userJourney === 'primary') score += 1;
    if (context.sourceImportance === 'critical') score += 1;

    // Cap at 10
    return Math.min(score, 10);
  }

  /**
   * Categorize link for better organization
   */
  private categorizeLink(
    link: ScannedLink, 
    type: LinkClassification['type'], 
    context: LinkContext
  ): string {
    if (type === 'internal') {
      if (link.url.startsWith('/api/')) return 'API Routes';
      if (link.url.includes('/blog/')) return 'Blog Content';
      if (link.url.includes('/ressources/')) return 'Resources';
      if (link.url.includes('/formation')) return 'Training Pages';
      if (link.url.includes('/management')) return 'Management Content';
      if (this.criticalPages.has(link.url)) return 'Critical Pages';
      if (context.linkPosition === 'navigation') return 'Navigation Links';
      return 'Internal Pages';
    }

    if (type === 'external') {
      if (link.url.includes('linkedin.com')) return 'LinkedIn';
      if (link.url.includes('youtube.com')) return 'YouTube';
      if (link.url.includes('google.com')) return 'Google Services';
      return 'External References';
    }

    if (type === 'download') {
      if (link.url.includes('.pdf')) return 'PDF Documents';
      if (link.url.includes('.jpg') || link.url.includes('.png') || link.url.includes('.svg')) return 'Images';
      if (link.url.includes('.zip') || link.url.includes('.rar')) return 'Archives';
      return 'Downloads';
    }

    if (type === 'anchor') {
      return 'Page Anchors';
    }

    return 'Uncategorized';
  }

  /**
   * Generate reasoning for the classification
   */
  private generateReasoning(
    link: ScannedLink, 
    type: LinkClassification['type'], 
    priority: LinkClassification['priority'], 
    context: LinkContext
  ): string {
    const reasons: string[] = [];

    // Type reasoning
    switch (type) {
      case 'internal':
        reasons.push('Internal link within the site');
        break;
      case 'external':
        reasons.push('External link to another domain');
        break;
      case 'download':
        reasons.push('Download link for file resource');
        break;
      case 'anchor':
        reasons.push('Anchor link within the same page');
        break;
    }

    // Priority reasoning
    switch (priority) {
      case 'critical':
        reasons.push('Critical for site functionality and SEO');
        break;
      case 'high':
        reasons.push('High importance for user experience');
        break;
      case 'medium':
        reasons.push('Moderate impact on site performance');
        break;
      case 'low':
        reasons.push('Low priority, minimal impact if broken');
        break;
    }

    // Context reasoning
    if (context.sourceImportance === 'critical') {
      reasons.push('Found in critical page/component');
    }
    if (context.linkPosition === 'navigation') {
      reasons.push('Part of site navigation');
    }
    if (context.linkPosition === 'api') {
      reasons.push('API endpoint for functionality');
    }
    if (context.userJourney === 'primary') {
      reasons.push('Part of primary user journey');
    }

    return reasons.join('; ');
  }

  /**
   * Calculate classification statistics
   */
  private calculateStatistics(
    links: ScannedLink[], 
    classifications: Map<string, LinkClassification>
  ): ClassificationStatistics {
    const stats: ClassificationStatistics = {
      total: links.length,
      byType: { internal: 0, external: 0, download: 0, anchor: 0 },
      byPriority: { critical: 0, high: 0, medium: 0, low: 0 },
      averageSeoImpact: 0,
      topCategories: [],
      riskScore: 0
    };

    let totalSeoImpact = 0;
    const categoryCount = new Map<string, number>();

    for (const classification of classifications.values()) {
      stats.byType[classification.type]++;
      stats.byPriority[classification.priority]++;
      totalSeoImpact += classification.seoImpact;

      const count = categoryCount.get(classification.category) || 0;
      categoryCount.set(classification.category, count + 1);
    }

    stats.averageSeoImpact = totalSeoImpact / links.length;

    // Top categories
    stats.topCategories = Array.from(categoryCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }));

    // Risk score (higher = more risk if links are broken)
    stats.riskScore = (
      stats.byPriority.critical * 4 +
      stats.byPriority.high * 3 +
      stats.byPriority.medium * 2 +
      stats.byPriority.low * 1
    ) / stats.total;

    return stats;
  }

  /**
   * Extract page path from file path
   */
  private extractPagePath(sourceFile: string): string {
    // Extract page path from Next.js file structure
    if (sourceFile.includes('/app/')) {
      const appIndex = sourceFile.indexOf('/app/');
      const afterApp = sourceFile.substring(appIndex + 5);
      const pathParts = afterApp.split('/');
      
      // Remove 'page.tsx' and join the rest
      if (pathParts[pathParts.length - 1].startsWith('page.')) {
        pathParts.pop();
      }
      
      const path = '/' + pathParts.join('/');
      return path === '/' ? '/' : path.replace(/\/$/, '');
    }

    return '/';
  }

  /**
   * Initialize critical pages set
   */
  private initializeCriticalPages(): void {
    this.criticalPages = new Set([
      '/',
      '/contact',
      '/expert-developpement-commercial-pme',
      '/formation-commerciale-pme',
      '/transformation-commerciale',
      '/diagnostic',
      '/bootcamp',
      '/ressources',
      '/blog',
      '/a-propos'
    ]);
  }

  /**
   * Initialize download extensions set
   */
  private initializeDownloadExtensions(): void {
    this.downloadExtensions = new Set([
      '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
      '.zip', '.rar', '.tar', '.gz', '.7z',
      '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif',
      '.mp4', '.avi', '.mov', '.wmv', '.flv',
      '.mp3', '.wav', '.ogg', '.flac'
    ]);
  }

  /**
   * Initialize API paths set
   */
  private initializeApiPaths(): void {
    this.apiPaths = new Set([
      '/api/',
      '/api/contact',
      '/api/resource-request',
      '/api/audit-links',
      '/api/hubspot'
    ]);
  }
}

export interface ClassificationStatistics {
  total: number;
  byType: {
    internal: number;
    external: number;
    download: number;
    anchor: number;
  };
  byPriority: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  averageSeoImpact: number;
  topCategories: Array<{ category: string; count: number }>;
  riskScore: number; // 1-4 scale
}