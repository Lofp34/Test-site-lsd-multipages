import { ValidationResult, ScannedLink } from './types';
import { baseUrl } from './config';
import { getSupabaseAdmin } from './database';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Local File Validator - Validates local files and internal routes
 * Handles download files, Next.js routes, and anchor validation
 */
export class LocalFileValidator {
  private cache: Map<string, boolean> = new Map();

  /**
   * Validate a local file or internal route
   */
  async validateLocalLink(link: ScannedLink): Promise<ValidationResult> {
    const startTime = Date.now();
    
    try {
      let isValid = false;
      let error: string | undefined;

      switch (link.linkType) {
        case 'download':
          isValid = await this.validateDownloadFile(link.url);
          if (!isValid) {
            error = `Download file not found: ${link.url}`;
          }
          break;

        case 'internal':
          isValid = await this.validateInternalRoute(link.url);
          if (!isValid) {
            error = `Internal route not found: ${link.url}`;
          }
          break;

        case 'anchor': {
          const anchorResult = await this.validateAnchorLink(link.url);
          isValid = anchorResult.isValid;
          error = anchorResult.error;
          break;
        }

        default:
          error = `Unknown link type: ${link.linkType}`;
      }

      const result: ValidationResult = {
        url: link.url,
        status: isValid ? 'valid' : 'broken',
        error,
        responseTime: Date.now() - startTime,
        lastChecked: new Date(),
      };

      // Store result in database
      await this.storeValidationResult(result);

      return result;
    } catch (error) {
      const result: ValidationResult = {
        url: link.url,
        status: 'broken',
        error: error instanceof Error ? error.message : String(error),
        responseTime: Date.now() - startTime,
        lastChecked: new Date(),
      };

      await this.storeValidationResult(result);
      return result;
    }
  }

  /**
   * Validate download files in public directory
   */
  async validateDownloadFile(url: string): Promise<boolean> {
    try {
      // Check cache first
      const cached = this.cache.get(url);
      if (cached !== undefined) {
        return cached;
      }

      // Remove domain and leading slash to get relative path
      let filePath = url.replace(baseUrl, '').replace(/^\//, '');
      
      // Handle URLs that might already be relative
      if (url.startsWith('/')) {
        filePath = url.substring(1);
      }

      // Check in public directory
      const publicPath = path.join(process.cwd(), 'public', filePath);
      
      try {
        const stats = await fs.stat(publicPath);
        const isValid = stats.isFile();
        
        // Cache result
        this.cache.set(url, isValid);
        
        return isValid;
      } catch {
        // Try alternative paths for common download locations
        const alternativePaths = [
          path.join(process.cwd(), 'public', 'ressources', 'downloads', path.basename(filePath)),
          path.join(process.cwd(), 'public', 'downloads', path.basename(filePath)),
          path.join(process.cwd(), 'public', 'assets', path.basename(filePath)),
        ];

        for (const altPath of alternativePaths) {
          try {
            const stats = await fs.stat(altPath);
            if (stats.isFile()) {
              this.cache.set(url, true);
              return true;
            }
          } catch {
            continue;
          }
        }

        this.cache.set(url, false);
        return false;
      }
    } catch (error) {
      console.error(`Error validating download file ${url}:`, error);
      return false;
    }
  }

  /**
   * Validate internal Next.js routes
   */
  async validateInternalRoute(url: string): Promise<boolean> {
    try {
      // Check cache first
      const cached = this.cache.get(url);
      if (cached !== undefined) {
        return cached;
      }

      // Remove domain and query parameters
      let route = url.replace(baseUrl, '').split('?')[0].split('#')[0];
      
      // Handle URLs that might already be relative
      if (url.startsWith('/')) {
        route = url.split('?')[0].split('#')[0];
      }

      // Remove leading slash for file system operations
      const routePath = route.replace(/^\//, '') || 'page'; // Root route

      const isValid = await this.checkNextJSRoute(routePath);
      
      // Cache result
      this.cache.set(url, isValid);
      
      return isValid;
    } catch (error) {
      console.error(`Error validating internal route ${url}:`, error);
      return false;
    }
  }

  /**
   * Check if a Next.js route exists
   */
  private async checkNextJSRoute(routePath: string): Promise<boolean> {
    const appDir = path.join(process.cwd(), 'src', 'app');
    
    // Handle root route
    if (routePath === 'page' || routePath === '') {
      const rootPageFiles = [
        path.join(appDir, 'page.tsx'),
        path.join(appDir, 'page.ts'),
      ];

      for (const file of rootPageFiles) {
        try {
          await fs.access(file);
          return true;
        } catch {
          continue;
        }
      }
      return false;
    }

    // Check for route directory with page file
    const routeDir = path.join(appDir, routePath);
    const pageFiles = [
      path.join(routeDir, 'page.tsx'),
      path.join(routeDir, 'page.ts'),
    ];

    for (const file of pageFiles) {
      try {
        await fs.access(file);
        return true;
      } catch {
        continue;
      }
    }

    // Check for dynamic routes
    const segments = routePath.split('/');
    for (let i = segments.length - 1; i >= 0; i--) {
      const dynamicSegments = [...segments];
      dynamicSegments[i] = `[${segments[i]}]`; // Try [param] format
      
      const dynamicRoutePath = path.join(appDir, ...dynamicSegments);
      const dynamicPageFiles = [
        path.join(dynamicRoutePath, 'page.tsx'),
        path.join(dynamicRoutePath, 'page.ts'),
      ];

      for (const file of dynamicPageFiles) {
        try {
          await fs.access(file);
          return true;
        } catch {
          continue;
        }
      }

      // Try [...param] format for catch-all routes
      dynamicSegments[i] = `[...${segments[i]}]`;
      const catchAllRoutePath = path.join(appDir, ...dynamicSegments);
      const catchAllPageFiles = [
        path.join(catchAllRoutePath, 'page.tsx'),
        path.join(catchAllRoutePath, 'page.ts'),
      ];

      for (const file of catchAllPageFiles) {
        try {
          await fs.access(file);
          return true;
        } catch {
          continue;
        }
      }
    }

    return false;
  }

  /**
   * Validate anchor links within pages
   */
  async validateAnchorLink(url: string): Promise<{ isValid: boolean; error?: string }> {
    try {
      const [baseUrl, anchor] = url.split('#');
      
      if (!anchor) {
        return { isValid: false, error: 'No anchor specified' };
      }

      // First validate that the base route exists
      const baseRouteValid = await this.validateInternalRoute(baseUrl);
      if (!baseRouteValid) {
        return { isValid: false, error: 'Base route does not exist' };
      }

      // For internal routes, we need to check the actual page content
      // This is more complex as we need to render the page or parse the source
      const anchorExists = await this.checkAnchorInPage(baseUrl, anchor);
      
      if (!anchorExists) {
        return { isValid: false, error: `Anchor #${anchor} not found on page` };
      }

      return { isValid: true };
    } catch (error) {
      return { 
        isValid: false, 
        error: error instanceof Error ? error.message : String(error) 
      };
    }
  }

  /**
   * Check if an anchor exists in a page
   */
  private async checkAnchorInPage(pageUrl: string, anchor: string): Promise<boolean> {
    try {
      // Remove domain to get route path
      let route = pageUrl.replace(baseUrl, '').split('?')[0];
      if (pageUrl.startsWith('/')) {
        route = pageUrl.split('?')[0];
      }

      // Find the page file
      const pageFile = await this.findPageFile(route);
      if (!pageFile) {
        return false;
      }

      // Read and parse the page content
      const content = await fs.readFile(pageFile, 'utf-8');
      
      // Look for anchor in various formats
      const anchorPatterns = [
        new RegExp(`id=["']${anchor}["']`, 'i'),
        new RegExp(`name=["']${anchor}["']`, 'i'),
        new RegExp(`#${anchor}`, 'i'), // CSS selectors or href references
        new RegExp(`"${anchor}"`, 'i'), // String references
      ];

      return anchorPatterns.some(pattern => pattern.test(content));
    } catch (error) {
      console.error(`Error checking anchor ${anchor} in page ${pageUrl}:`, error);
      return false;
    }
  }

  /**
   * Find the actual page file for a route
   */
  private async findPageFile(route: string): Promise<string | null> {
    const appDir = path.join(process.cwd(), 'src', 'app');
    const routePath = route.replace(/^\//, '') || '';

    if (routePath === '') {
      // Root route
      const rootFiles = [
        path.join(appDir, 'page.tsx'),
        path.join(appDir, 'page.ts'),
      ];

      for (const file of rootFiles) {
        try {
          await fs.access(file);
          return file;
        } catch {
          continue;
        }
      }
    } else {
      // Regular route
      const routeDir = path.join(appDir, routePath);
      const pageFiles = [
        path.join(routeDir, 'page.tsx'),
        path.join(routeDir, 'page.ts'),
      ];

      for (const file of pageFiles) {
        try {
          await fs.access(file);
          return file;
        } catch {
          continue;
        }
      }
    }

    return null;
  }

  /**
   * Validate multiple local links
   */
  async validateLocalLinks(links: ScannedLink[]): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    // Process local links (they're fast, so we can do them in parallel)
    const promises = links.map(link => this.validateLocalLink(link));
    const batchResults = await Promise.all(promises);
    
    results.push(...batchResults);
    
    console.log(`Validated ${links.length} local links`);
    
    return results;
  }

  /**
   * Store validation result in database
   */
  private async storeValidationResult(result: ValidationResult): Promise<void> {
    try {
      const { error } = await getSupabaseAdmin()
        .from('validation_results')
        .upsert({
          url: result.url,
          status: result.status,
          status_code: result.statusCode,
          redirect_url: result.redirectUrl,
          error_message: result.error,
          response_time: result.responseTime,
          checked_at: result.lastChecked.toISOString(),
        });

      if (error) {
        console.error('Failed to store validation result:', error);
      }
    } catch (error) {
      console.error('Database error storing validation result:', error);
    }
  }

  /**
   * Clear the validation cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number } {
    return {
      size: this.cache.size,
    };
  }

  /**
   * Get suggestions for broken local links
   */
  async getSuggestionsForBrokenLink(url: string): Promise<string[]> {
    const suggestions: string[] = [];
    
    try {
      // For download files, suggest similar files
      if (url.includes('/ressources/') || url.includes('/downloads/')) {
        const fileName = path.basename(url);
        const suggestions = await this.findSimilarFiles(fileName);
        return suggestions;
      }

      // For routes, suggest similar routes
      if (url.startsWith('/')) {
        const routeSuggestions = await this.findSimilarRoutes(url);
        return routeSuggestions;
      }
    } catch (error) {
      console.error(`Error getting suggestions for ${url}:`, error);
    }

    return suggestions;
  }

  /**
   * Find similar files in the public directory
   */
  private async findSimilarFiles(fileName: string): Promise<string[]> {
    const suggestions: string[] = [];
    
    try {
      const publicDir = path.join(process.cwd(), 'public');
      const searchDirs = [
        path.join(publicDir, 'ressources', 'downloads'),
        path.join(publicDir, 'downloads'),
        path.join(publicDir, 'assets'),
        publicDir,
      ];

      for (const dir of searchDirs) {
        try {
          const files = await fs.readdir(dir);
          const similarFiles = files.filter(file => 
            this.calculateSimilarity(fileName, file) > 0.6
          );
          
          suggestions.push(...similarFiles.map(file => 
            path.relative(publicDir, path.join(dir, file))
          ));
        } catch {
          continue;
        }
      }
    } catch (error) {
      console.error('Error finding similar files:', error);
    }

    return suggestions.slice(0, 5); // Return top 5 suggestions
  }

  /**
   * Find similar routes in the app directory
   */
  private async findSimilarRoutes(route: string): Promise<string[]> {
    const suggestions: string[] = [];
    
    try {
      const appDir = path.join(process.cwd(), 'src', 'app');
      const allRoutes = await this.getAllRoutes(appDir);
      
      const similarRoutes = allRoutes.filter(existingRoute => 
        this.calculateSimilarity(route, existingRoute) > 0.6
      );

      suggestions.push(...similarRoutes);
    } catch (error) {
      console.error('Error finding similar routes:', error);
    }

    return suggestions.slice(0, 5); // Return top 5 suggestions
  }

  /**
   * Get all available routes from the app directory
   */
  private async getAllRoutes(dir: string, basePath = ''): Promise<string[]> {
    const routes: string[] = [];
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith('(')) {
          const routePath = path.join(basePath, entry.name);
          const fullPath = path.join(dir, entry.name);
          
          // Check if this directory has a page file
          const hasPage = await this.hasPageFile(fullPath);
          if (hasPage) {
            routes.push('/' + routePath.replace(/\\/g, '/'));
          }
          
          // Recursively check subdirectories
          const subRoutes = await this.getAllRoutes(fullPath, routePath);
          routes.push(...subRoutes);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }

    return routes;
  }

  /**
   * Check if a directory has a page file
   */
  private async hasPageFile(dir: string): Promise<boolean> {
    const pageFiles = ['page.tsx', 'page.ts'];
    
    for (const file of pageFiles) {
      try {
        await fs.access(path.join(dir, file));
        return true;
      } catch {
        continue;
      }
    }
    
    return false;
  }

  /**
   * Calculate similarity between two strings (simple Levenshtein-based)
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) {
      return 1.0;
    }
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => 
      Array(str1.length + 1).fill(null)
    );

    for (let i = 0; i <= str1.length; i++) {
      matrix[0][i] = i;
    }

    for (let j = 0; j <= str2.length; j++) {
      matrix[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // deletion
          matrix[j - 1][i] + 1, // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }

    return matrix[str2.length][str1.length];
  }
}

// Export singleton instance
export const localFileValidator = new LocalFileValidator();