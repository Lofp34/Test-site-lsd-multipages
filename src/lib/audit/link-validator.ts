import { ValidationResult, ValidationConfig, ScannedLink } from './types';
import { validationConfig } from './config';
import { getSupabaseAdmin } from './database';

/**
 * Link Validator - Validates HTTP links and local files
 * Implements retry logic, rate limiting, and caching
 */
export class LinkValidator {
  private config: ValidationConfig;
  private cache: Map<string, ValidationResult> = new Map();
  private rateLimitQueue: Array<() => Promise<void>> = [];
  private isProcessingQueue = false;

  constructor(config?: Partial<ValidationConfig>) {
    this.config = { ...validationConfig(), ...config };
  }

  /**
   * Validate a single link with retry logic and exponential backoff
   */
  async validateLink(url: string, config?: Partial<ValidationConfig>): Promise<ValidationResult> {
    const finalConfig = { ...this.config, ...config };
    
    // Check cache first
    const cached = this.cache.get(url);
    if (cached && this.isCacheValid(cached)) {
      return cached;
    }

    const startTime = Date.now();
    let lastError: string | undefined;

    for (let attempt = 1; attempt <= finalConfig.retryAttempts; attempt++) {
      try {
        const result = await this.performValidation(url, finalConfig);
        
        // Cache successful results
        this.cache.set(url, result);
        
        // Store in database
        await this.storeValidationResult(result);
        
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error);
        
        // Don't retry on certain errors
        if (this.isNonRetryableError(error)) {
          break;
        }

        // Exponential backoff: wait 2^attempt seconds
        if (attempt < finalConfig.retryAttempts) {
          const delay = Math.pow(2, attempt) * 1000;
          await this.sleep(delay);
        }
      }
    }

    // All attempts failed
    const failedResult: ValidationResult = {
      url,
      status: 'broken',
      error: lastError,
      responseTime: Date.now() - startTime,
      lastChecked: new Date(),
    };

    this.cache.set(url, failedResult);
    await this.storeValidationResult(failedResult);
    
    return failedResult;
  }

  /**
   * Validate multiple links in batches with rate limiting
   */
  async validateBatch(urls: string[], config?: Partial<ValidationConfig>): Promise<ValidationResult[]> {
    const finalConfig = { ...this.config, ...config };
    const results: ValidationResult[] = [];
    
    // Process in batches
    for (let i = 0; i < urls.length; i += finalConfig.batchSize) {
      const batch = urls.slice(i, i + finalConfig.batchSize);
      
      // Process batch with rate limiting
      const batchPromises = batch.map(url => 
        this.addToRateLimitQueue(() => this.validateLink(url, config))
      );
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Log progress
      console.log(`Validated ${Math.min(i + finalConfig.batchSize, urls.length)}/${urls.length} links`);
    }

    return results;
  }

  /**
   * Perform the actual HTTP validation
   */
  private async performValidation(url: string, config: ValidationConfig): Promise<ValidationResult> {
    const startTime = Date.now();
    
    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      const response = await fetch(url, {
        method: 'HEAD', // Use HEAD to avoid downloading content
        headers: {
          'User-Agent': config.userAgent,
          'Accept': '*/*',
          'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        },
        redirect: config.followRedirects ? 'follow' : 'manual',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseTime = Date.now() - startTime;
      const result: ValidationResult = {
        url,
        status: this.getStatusFromResponse(response),
        statusCode: response.status,
        responseTime,
        lastChecked: new Date(),
      };

      // Handle redirects
      if (response.redirected && response.url !== url) {
        result.redirectUrl = response.url;
        result.status = 'redirect';
      }

      // Check for anchor links if enabled
      if (config.checkAnchors && url.includes('#')) {
        await this.validateAnchor(url, result);
      }

      return result;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            url,
            status: 'timeout',
            error: 'Request timeout',
            responseTime,
            lastChecked: new Date(),
          };
        }
        
        return {
          url,
          status: 'broken',
          error: error.message,
          responseTime,
          lastChecked: new Date(),
        };
      }

      throw error;
    }
  }

  /**
   * Validate anchor links by checking if the element exists
   */
  private async validateAnchor(url: string, result: ValidationResult): Promise<void> {
    const [baseUrl, anchor] = url.split('#');
    
    if (!anchor || result.status === 'broken') {
      return;
    }

    try {
      // Fetch the full page content to check for anchor
      const response = await fetch(baseUrl, {
        headers: { 'User-Agent': this.config.userAgent },
      });

      if (!response.ok) {
        return;
      }

      const html = await response.text();
      
      // Check for anchor existence (id or name attribute)
      const anchorRegex = new RegExp(`(id|name)=["']${anchor}["']`, 'i');
      
      if (!anchorRegex.test(html)) {
        result.status = 'broken';
        result.error = `Anchor #${anchor} not found on page`;
      }
    } catch (error) {
      // Don't fail the whole validation if anchor check fails
      console.warn(`Failed to validate anchor for ${url}:`, error);
    }
  }

  /**
   * Check if a file exists locally
   */
  async checkFileExists(filePath: string): Promise<boolean> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // Handle relative paths from public directory
      let fullPath = filePath;
      if (!path.isAbsolute(filePath)) {
        fullPath = path.join(process.cwd(), 'public', filePath);
      }

      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate internal Next.js routes
   */
  async validateInternalRoute(route: string): Promise<boolean> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // Check if route exists in app directory
      const appDir = path.join(process.cwd(), 'src', 'app');
      const routePath = path.join(appDir, route);
      
      // Check for page.tsx, page.ts, or directory with page file
      const possibleFiles = [
        path.join(routePath, 'page.tsx'),
        path.join(routePath, 'page.ts'),
        `${routePath}.tsx`,
        `${routePath}.ts`,
      ];

      for (const file of possibleFiles) {
        try {
          await fs.access(file);
          return true;
        } catch {
          continue;
        }
      }

      return false;
    } catch {
      return false;
    }
  }

  /**
   * Add task to rate limit queue
   */
  private async addToRateLimitQueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.rateLimitQueue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.processQueue();
    });
  }

  /**
   * Process the rate limit queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.rateLimitQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    while (this.rateLimitQueue.length > 0) {
      const task = this.rateLimitQueue.shift();
      if (task) {
        await task();
        
        // Rate limiting delay
        if (this.rateLimitQueue.length > 0) {
          await this.sleep(this.config.rateLimitDelay);
        }
      }
    }

    this.isProcessingQueue = false;
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
   * Determine status from HTTP response
   */
  private getStatusFromResponse(response: Response): ValidationResult['status'] {
    if (response.ok) {
      return 'valid';
    }

    if (response.status >= 300 && response.status < 400) {
      return 'redirect';
    }

    return 'broken';
  }

  /**
   * Check if cache entry is still valid (1 hour TTL)
   */
  private isCacheValid(result: ValidationResult): boolean {
    const now = new Date();
    const cacheAge = now.getTime() - result.lastChecked.getTime();
    const maxAge = 60 * 60 * 1000; // 1 hour
    
    return cacheAge < maxAge;
  }

  /**
   * Check if error should not be retried
   */
  private isNonRetryableError(error: unknown): boolean {
    if (error instanceof Error) {
      // Don't retry on DNS errors, invalid URLs, etc.
      const nonRetryableMessages = [
        'Invalid URL',
        'ENOTFOUND',
        'ECONNREFUSED',
        'certificate',
        'SSL',
      ];

      return nonRetryableMessages.some(msg => 
        error.message.toLowerCase().includes(msg.toLowerCase())
      );
    }

    return false;
  }

  /**
   * Sleep utility for delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
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
  getCacheStats(): { size: number; hitRate: number } {
    return {
      size: this.cache.size,
      hitRate: 0, // TODO: Implement hit rate tracking
    };
  }
}

// Export singleton instance
export const linkValidator = new LinkValidator();