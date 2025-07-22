/**
 * Link Validation Service
 * Validates internal links and provides redirect mapping for broken links
 */

import { 
  LinkValidationResult, 
  RedirectMapping, 
  LinkValidationConfig, 
  ValidationReport 
} from '@/types/link-validation';

export class LinkValidationService {
  private config: LinkValidationConfig;
  private redirectMapping: RedirectMapping;

  constructor(config?: Partial<LinkValidationConfig>) {
    this.config = {
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      timeout: 5000,
      retryAttempts: 2,
      fallbackUrl: '/ressources',
      enableLogging: process.env.NODE_ENV === 'development',
      ...config
    };

    // Initialize redirect mapping based on design document
    this.redirectMapping = this.createDefaultRedirectMapping();
  }

  /**
   * Validates a list of internal links
   */
  async validateInternalLinks(links: string[]): Promise<LinkValidationResult[]> {
    const results: LinkValidationResult[] = [];
    
    for (const link of links) {
      try {
        const result = await this.validateSingleLink(link);
        results.push(result);
        
        if (this.config.enableLogging) {
          console.log(`Validated ${link}: ${result.isValid ? 'OK' : 'BROKEN'}`);
        }
      } catch (error) {
        results.push({
          url: link,
          isValid: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  /**
   * Validates a single link
   */
  private async validateSingleLink(url: string): Promise<LinkValidationResult> {
    // Handle relative URLs
    const fullUrl = url.startsWith('http') ? url : `${this.config.baseUrl}${url}`;
    
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(fullUrl, {
          method: 'HEAD',
          signal: controller.signal,
          headers: {
            'User-Agent': 'LinkValidator/1.0'
          }
        });
        
        clearTimeout(timeoutId);
        
        const result: LinkValidationResult = {
          url,
          isValid: response.ok,
          statusCode: response.status
        };

        // If link is broken, suggest a redirect
        if (!response.ok) {
          const suggestedRedirect = this.getSuggestedRedirect(url);
          if (suggestedRedirect) {
            result.suggestedRedirect = suggestedRedirect.redirectTo;
            result.redirectReason = suggestedRedirect.reason;
          }
        }

        return result;
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt < this.config.retryAttempts) {
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
      }
    }

    // All attempts failed
    const result: LinkValidationResult = {
      url,
      isValid: false,
      error: lastError?.message || 'Failed to validate link'
    };

    // Suggest redirect for broken link
    const suggestedRedirect = this.getSuggestedRedirect(url);
    if (suggestedRedirect) {
      result.suggestedRedirect = suggestedRedirect.redirectTo;
      result.redirectReason = suggestedRedirect.reason;
    }

    return result;
  }

  /**
   * Creates default redirect mapping based on design document
   */
  private createDefaultRedirectMapping(): RedirectMapping {
    return {
      '/ressources/scripts-prospection': {
        redirectTo: '/ressources/guide-recrutement-commercial',
        reason: 'Page créée avec contenu scripts IMPACT et AIDA+',
        statusCode: 301
      },
      '/ressources/linkedin-prospection': {
        redirectTo: '/ressources/linkedin-prospection',
        reason: 'Page créée avec guide LinkedIn et réseaux sociaux',
        statusCode: 301
      },
      '/ressources/systeme-suivi-prospects': {
        redirectTo: '/ressources/systeme-suivi-prospects',
        reason: 'Page créée avec outil de suivi des prospects',
        statusCode: 301
      },
      '/ressources/techniques-motivation-equipe': {
        redirectTo: '/ressources/techniques-motivation-equipe',
        reason: 'Page créée avec guide motivation et coaching',
        statusCode: 301
      },
      '/ressources/guide-recrutement-commercial': {
        redirectTo: '/ressources/guide-recrutement-commercial',
        reason: 'Page créée avec guide recrutement commercial',
        statusCode: 301
      },
      // Fallback patterns
      '/ressources/scripts-impact': {
        redirectTo: '/ressources/scripts-prospection',
        reason: 'Redirection vers page scripts de prospection',
        statusCode: 301
      },
      '/ressources/aida-scripts': {
        redirectTo: '/ressources/scripts-prospection',
        reason: 'Redirection vers page scripts de prospection',
        statusCode: 301
      },
      '/ressources/linkedin-guide': {
        redirectTo: '/ressources/linkedin-prospection',
        reason: 'Redirection vers guide LinkedIn',
        statusCode: 301
      },
      '/ressources/suivi-prospects': {
        redirectTo: '/ressources/systeme-suivi-prospects',
        reason: 'Redirection vers système de suivi',
        statusCode: 301
      },
      '/ressources/motivation-coaching': {
        redirectTo: '/ressources/techniques-motivation-equipe',
        reason: 'Redirection vers guide motivation',
        statusCode: 301
      },
      '/ressources/recrutement': {
        redirectTo: '/ressources/guide-recrutement-commercial',
        reason: 'Redirection vers guide recrutement',
        statusCode: 301
      }
    };
  }

  /**
   * Gets suggested redirect for a broken link
   */
  private getSuggestedRedirect(url: string): RedirectMapping[string] | null {
    // Direct mapping
    if (this.redirectMapping[url]) {
      return this.redirectMapping[url];
    }

    // Pattern matching for similar URLs
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('script') || urlLower.includes('impact') || urlLower.includes('aida')) {
      return {
        redirectTo: '/ressources/scripts-prospection',
        reason: 'Contenu lié aux scripts de prospection',
        statusCode: 301
      };
    }
    
    if (urlLower.includes('linkedin') || urlLower.includes('reseau')) {
      return {
        redirectTo: '/ressources/linkedin-prospection',
        reason: 'Contenu lié à LinkedIn et réseaux sociaux',
        statusCode: 301
      };
    }
    
    if (urlLower.includes('suivi') || urlLower.includes('prospect')) {
      return {
        redirectTo: '/ressources/systeme-suivi-prospects',
        reason: 'Contenu lié au suivi des prospects',
        statusCode: 301
      };
    }
    
    if (urlLower.includes('motivation') || urlLower.includes('coaching') || urlLower.includes('equipe')) {
      return {
        redirectTo: '/ressources/techniques-motivation-equipe',
        reason: 'Contenu lié à la motivation et coaching',
        statusCode: 301
      };
    }
    
    if (urlLower.includes('recrutement') || urlLower.includes('commercial')) {
      return {
        redirectTo: '/ressources/guide-recrutement-commercial',
        reason: 'Contenu lié au recrutement commercial',
        statusCode: 301
      };
    }

    // Default fallback
    return {
      redirectTo: this.config.fallbackUrl,
      reason: 'Redirection vers page ressources principale',
      statusCode: 301
    };
  }

  /**
   * Updates links in content based on redirect mapping
   */
  updateLinksInContent(content: string, customMapping?: RedirectMapping): string {
    const mapping = customMapping || this.redirectMapping;
    let updatedContent = content;

    Object.entries(mapping).forEach(([originalUrl, redirect]) => {
      // Replace href attributes
      const hrefPattern = new RegExp(`href=["']${originalUrl}["']`, 'g');
      updatedContent = updatedContent.replace(hrefPattern, `href="${redirect.redirectTo}"`);
      
      // Replace Link components
      const linkPattern = new RegExp(`<Link[^>]*href=["']${originalUrl}["'][^>]*>`, 'g');
      updatedContent = updatedContent.replace(linkPattern, (match) => {
        return match.replace(originalUrl, redirect.redirectTo);
      });
    });

    return updatedContent;
  }

  /**
   * Generates a validation report
   */
  async generateValidationReport(links: string[]): Promise<ValidationReport> {
    const results = await this.validateInternalLinks(links);
    
    const validLinks = results.filter(r => r.isValid).length;
    const brokenLinks = results.filter(r => !r.isValid).length;
    const redirectedLinks = results.filter(r => r.suggestedRedirect).length;

    return {
      totalLinks: results.length,
      validLinks,
      brokenLinks,
      redirectedLinks,
      results,
      generatedAt: new Date()
    };
  }

  /**
   * Gets the current redirect mapping
   */
  getRedirectMapping(): RedirectMapping {
    return { ...this.redirectMapping };
  }

  /**
   * Updates the redirect mapping
   */
  updateRedirectMapping(newMapping: Partial<RedirectMapping>): void {
    this.redirectMapping = { ...this.redirectMapping, ...newMapping };
  }

  /**
   * Logs validation results
   */
  private logValidationResult(result: LinkValidationResult): void {
    if (!this.config.enableLogging) return;

    if (result.isValid) {
      console.log(`✅ ${result.url} - OK (${result.statusCode})`);
    } else {
      console.log(`❌ ${result.url} - BROKEN${result.statusCode ? ` (${result.statusCode})` : ''}`);
      if (result.suggestedRedirect) {
        console.log(`   → Suggested redirect: ${result.suggestedRedirect}`);
      }
    }
  }
}

// Export singleton instance
export const linkValidator = new LinkValidationService();

// Export utility functions
export const validateLinks = (links: string[]) => linkValidator.validateInternalLinks(links);
export const getRedirectMapping = () => linkValidator.getRedirectMapping();
export const updateLinksInContent = (content: string, mapping?: RedirectMapping) => 
  linkValidator.updateLinksInContent(content, mapping);