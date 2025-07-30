/**
 * Intégration middleware pour les pages temporaires
 * 
 * Ce module gère les redirections automatiques vers les pages temporaires
 * quand une ressource n'est pas trouvée.
 */

import { NextRequest, NextResponse } from 'next/server';
import { temporaryPageGenerator } from './generator';

export interface MiddlewareConfig {
  /** Patterns d'URLs à exclure de la redirection automatique */
  excludePatterns: string[];
  /** Activer les redirections automatiques */
  enableAutoRedirect: boolean;
  /** Créer automatiquement des pages temporaires pour les 404 */
  autoCreateTemporaryPages: boolean;
  /** Types de fichiers à traiter */
  handleFileTypes: string[];
}

/**
 * Configuration par défaut du middleware
 */
export const defaultMiddlewareConfig: MiddlewareConfig = {
  excludePatterns: [
    '/api/',
    '/_next/',
    '/admin/',
    '/temporary-resource',
    '/.well-known/',
    '/robots.txt',
    '/sitemap.xml',
    '/favicon.ico'
  ],
  enableAutoRedirect: true,
  autoCreateTemporaryPages: true,
  handleFileTypes: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.rar', '.ppt', '.pptx']
};

/**
 * Classe pour gérer l'intégration middleware
 */
export class MiddlewareIntegration {
  private config: MiddlewareConfig;
  
  constructor(config: MiddlewareConfig = defaultMiddlewareConfig) {
    this.config = config;
  }
  
  /**
   * Traiter une requête et rediriger si nécessaire
   */
  async handleRequest(request: NextRequest): Promise<NextResponse | null> {
    const { pathname } = request.nextUrl;
    
    // Vérifier si l'URL doit être exclue
    if (this.shouldExclude(pathname)) {
      return null; // Laisser passer la requête
    }
    
    try {
      // Vérifier si une page temporaire existe déjà pour cette URL
      const temporaryPages = await temporaryPageGenerator.getAllTemporaryPages();
      const existingPage = Object.values(temporaryPages).find(
        page => page.resourceUrl === pathname
      );
      
      if (existingPage) {
        // Rediriger vers la page temporaire existante
        return this.createTemporaryPageRedirect(request, existingPage.resourceUrl);
      }
      
      // Si la création automatique est activée et que c'est un type de fichier géré
      if (this.config.autoCreateTemporaryPages && this.shouldCreateTemporaryPage(pathname)) {
        // Créer une nouvelle page temporaire
        const temporaryUrl = await this.createTemporaryPageForUrl(pathname, request);
        if (temporaryUrl) {
          return NextResponse.redirect(new URL(temporaryUrl, request.url));
        }
      }
      
    } catch (error) {
      console.error('Erreur dans le middleware des pages temporaires:', error);
    }
    
    return null; // Laisser passer la requête
  }
  
  /**
   * Vérifier si une URL doit être exclue
   */
  private shouldExclude(pathname: string): boolean {
    return this.config.excludePatterns.some(pattern => {
      if (pattern.endsWith('/')) {
        return pathname.startsWith(pattern);
      }
      return pathname === pattern || pathname.startsWith(pattern + '/');
    });
  }
  
  /**
   * Vérifier si une page temporaire doit être créée pour cette URL
   */
  private shouldCreateTemporaryPage(pathname: string): boolean {
    // Vérifier si c'est un type de fichier géré
    const hasHandledExtension = this.config.handleFileTypes.some(ext => 
      pathname.toLowerCase().endsWith(ext)
    );
    
    // Ou si c'est dans un dossier de ressources
    const isResourcePath = pathname.includes('/ressources/') || 
                          pathname.includes('/guides/') || 
                          pathname.includes('/outils/') || 
                          pathname.includes('/templates/');
    
    return hasHandledExtension || isResourcePath;
  }
  
  /**
   * Créer une redirection vers une page temporaire
   */
  private createTemporaryPageRedirect(request: NextRequest, resourceUrl: string): NextResponse {
    const temporaryUrl = `/temporary-resource?${new URLSearchParams({
      url: resourceUrl,
      source: request.headers.get('referer') || '/',
      type: this.detectResourceType(resourceUrl)
    }).toString()}`;
    
    return NextResponse.redirect(new URL(temporaryUrl, request.url));
  }
  
  /**
   * Créer automatiquement une page temporaire pour une URL
   */
  private async createTemporaryPageForUrl(
    pathname: string, 
    request: NextRequest
  ): Promise<string | null> {
    try {
      const resourceType = this.detectResourceType(pathname);
      const sourceUrl = request.headers.get('referer') || '/';
      
      const config = {
        resourceUrl: pathname,
        sourceUrl,
        resourceType,
        priority: 'medium' as const,
        developmentStatus: 'planned' as const
      };
      
      const temporaryUrl = await temporaryPageGenerator.createTemporaryPage(config);
      
      console.log(`🔄 Page temporaire créée automatiquement: ${pathname} -> ${temporaryUrl}`);
      
      return temporaryUrl;
      
    } catch (error) {
      console.error(`Erreur lors de la création automatique de page temporaire pour ${pathname}:`, error);
      return null;
    }
  }
  
  /**
   * Détecter le type de ressource basé sur l'URL
   */
  private detectResourceType(url: string): string {
    const lowerUrl = url.toLowerCase();
    
    if (lowerUrl.includes('/download') || lowerUrl.match(/\.(pdf|doc|docx|xls|xlsx|zip|rar|ppt|pptx)$/)) {
      return 'download';
    }
    
    if (lowerUrl.includes('/guide') || lowerUrl.includes('/guides')) {
      return 'guide';
    }
    
    if (lowerUrl.includes('/outil') || lowerUrl.includes('/outils') || lowerUrl.includes('/tool')) {
      return 'tool';
    }
    
    if (lowerUrl.includes('/template') || lowerUrl.includes('/modele')) {
      return 'template';
    }
    
    return 'page';
  }
  
  /**
   * Mettre à jour la configuration
   */
  updateConfig(newConfig: Partial<MiddlewareConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
  
  /**
   * Obtenir la configuration actuelle
   */
  getConfig(): MiddlewareConfig {
    return { ...this.config };
  }
}

/**
 * Instance singleton de l'intégration middleware
 */
export const middlewareIntegration = new MiddlewareIntegration();

/**
 * Fonction utilitaire pour traiter une requête middleware
 */
export async function handleTemporaryPageMiddleware(
  request: NextRequest,
  config?: Partial<MiddlewareConfig>
): Promise<NextResponse | null> {
  if (config) {
    middlewareIntegration.updateConfig(config);
  }
  
  return middlewareIntegration.handleRequest(request);
}

/**
 * Fonction pour créer un middleware Next.js
 */
export function createTemporaryPageMiddleware(config?: Partial<MiddlewareConfig>) {
  return async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
    const response = await handleTemporaryPageMiddleware(request, config);
    return response || undefined;
  };
}