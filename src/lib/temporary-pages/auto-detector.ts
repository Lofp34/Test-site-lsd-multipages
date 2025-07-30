/**
 * Détecteur automatique de ressources manquantes
 * 
 * Ce module scanne automatiquement le site pour détecter les liens
 * vers des ressources manquantes et génère des pages temporaires.
 */

import { temporaryPageGenerator, TemporaryPageConfig } from './generator';
import { LinkScanner } from '../audit/link-scanner';
import { LinkValidator } from '../audit/link-validator';
import { ScannedLink, ValidationResult } from '../audit/types';

export interface DetectionConfig {
  /** URL de base du site */
  baseUrl: string;
  /** Profondeur maximale de scan */
  maxDepth: number;
  /** Patterns à exclure */
  excludePatterns: string[];
  /** Inclure les liens externes */
  includeExternal: boolean;
  /** Timeout pour la validation */
  timeout: number;
  /** Nombre de tentatives */
  retryAttempts: number;
}

export interface DetectionResult {
  /** Nombre total de liens scannés */
  totalLinks: number;
  /** Nombre de liens morts détectés */
  brokenLinks: number;
  /** Nombre de pages temporaires créées */
  temporaryPagesCreated: number;
  /** Détails des liens morts */
  brokenLinkDetails: Array<{
    url: string;
    sourceFiles: string[];
    linkType: string;
    error: string;
    temporaryPageCreated: boolean;
    temporaryPageUrl?: string;
  }>;
  /** Erreurs rencontrées */
  errors: string[];
}

/**
 * Classe pour la détection automatique
 */
export class AutoDetector {
  private scanner: LinkScanner;
  private validator: LinkValidator;
  
  constructor() {
    this.scanner = new LinkScanner();
    this.validator = new LinkValidator();
  }
  
  /**
   * Détecter et créer automatiquement les pages temporaires
   */
  async detectAndCreateTemporaryPages(config: DetectionConfig): Promise<DetectionResult> {
    const result: DetectionResult = {
      totalLinks: 0,
      brokenLinks: 0,
      temporaryPagesCreated: 0,
      brokenLinkDetails: [],
      errors: []
    };
    
    try {
      console.log('🔍 Début du scan des liens...');
      
      // 1. Scanner tous les liens du site
      const scannedLinks = await this.scanner.scanSite({
        baseUrl: config.baseUrl,
        maxDepth: config.maxDepth,
        includeExternal: config.includeExternal,
        excludePatterns: config.excludePatterns,
        followRedirects: true
      });
      
      result.totalLinks = scannedLinks.length;
      console.log(`📊 ${result.totalLinks} liens trouvés`);
      
      // 2. Valider les liens
      console.log('🔍 Validation des liens...');
      const validationResults = await this.validator.validateBatch(
        scannedLinks.map(link => link.url),
        {
          timeout: config.timeout,
          retryAttempts: config.retryAttempts,
          userAgent: 'Laurent-Serre-Link-Checker/1.0',
          followRedirects: true,
          checkAnchors: false,
          batchSize: 10,
          rateLimitDelay: 100
        }
      );
      
      // 3. Identifier les liens morts
      const brokenLinks = validationResults.filter(result => 
        result.status === 'broken' || result.status === 'timeout'
      );
      
      result.brokenLinks = brokenLinks.length;
      console.log(`❌ ${result.brokenLinks} liens morts détectés`);
      
      // 4. Créer les pages temporaires pour les liens internes morts
      for (const brokenLink of brokenLinks) {
        try {
          const scannedLink = scannedLinks.find(link => link.url === brokenLink.url);
          if (!scannedLink) continue;
          
          // Ne créer des pages temporaires que pour les liens internes
          if (scannedLink.linkType !== 'internal' && scannedLink.linkType !== 'download') {
            result.brokenLinkDetails.push({
              url: brokenLink.url,
              sourceFiles: [scannedLink.sourceFile],
              linkType: scannedLink.linkType,
              error: brokenLink.error || 'Lien externe inaccessible',
              temporaryPageCreated: false
            });
            continue;
          }
          
          // Créer la page temporaire
          const temporaryPageConfig: TemporaryPageConfig = {
            resourceUrl: brokenLink.url,
            sourceUrl: this.findBestSourceUrl(scannedLink, scannedLinks),
            resourceType: this.mapLinkTypeToResourceType(scannedLink.linkType),
            priority: this.calculatePriority(scannedLink, scannedLinks),
            developmentStatus: 'planned'
          };
          
          const temporaryPageUrl = await temporaryPageGenerator.createTemporaryPage(temporaryPageConfig);
          
          result.brokenLinkDetails.push({
            url: brokenLink.url,
            sourceFiles: [scannedLink.sourceFile],
            linkType: scannedLink.linkType,
            error: brokenLink.error || 'Ressource non trouvée',
            temporaryPageCreated: true,
            temporaryPageUrl
          });
          
          result.temporaryPagesCreated++;
          console.log(`✅ Page temporaire créée pour: ${brokenLink.url}`);
          
        } catch (error) {
          const errorMsg = `Erreur lors de la création de la page temporaire pour ${brokenLink.url}: ${error}`;
          result.errors.push(errorMsg);
          console.error(errorMsg);
          
          result.brokenLinkDetails.push({
            url: brokenLink.url,
            sourceFiles: [scannedLinks.find(link => link.url === brokenLink.url)?.sourceFile || 'unknown'],
            linkType: scannedLinks.find(link => link.url === brokenLink.url)?.linkType || 'unknown',
            error: brokenLink.error || 'Erreur inconnue',
            temporaryPageCreated: false
          });
        }
      }
      
      console.log(`🎉 Détection terminée: ${result.temporaryPagesCreated} pages temporaires créées`);
      
    } catch (error) {
      const errorMsg = `Erreur lors de la détection automatique: ${error}`;
      result.errors.push(errorMsg);
      console.error(errorMsg);
    }
    
    return result;
  }
  
  /**
   * Nettoyer les pages temporaires obsolètes
   */
  async cleanupObsoletePages(): Promise<{
    removed: number;
    errors: string[];
  }> {
    const result = {
      removed: 0,
      errors: []
    };
    
    try {
      const temporaryPages = await temporaryPageGenerator.getAllTemporaryPages();
      
      for (const [resourceId, config] of Object.entries(temporaryPages)) {
        try {
          // Vérifier si la ressource existe maintenant
          const validationResult = await this.validator.validateLink(config.resourceUrl, {
            timeout: 5000,
            retryAttempts: 1,
            userAgent: 'Laurent-Serre-Link-Checker/1.0',
            followRedirects: true,
            checkAnchors: false,
            batchSize: 1,
            rateLimitDelay: 0
          });
          
          // Si la ressource existe maintenant, supprimer la page temporaire
          if (validationResult.status === 'valid') {
            await temporaryPageGenerator.removeTemporaryPage(config.resourceUrl);
            result.removed++;
            console.log(`🗑️ Page temporaire supprimée (ressource disponible): ${config.resourceUrl}`);
          }
          
        } catch (error) {
          const errorMsg = `Erreur lors de la vérification de ${config.resourceUrl}: ${error}`;
          result.errors.push(errorMsg);
          console.error(errorMsg);
        }
      }
      
    } catch (error) {
      const errorMsg = `Erreur lors du nettoyage: ${error}`;
      result.errors.push(errorMsg);
      console.error(errorMsg);
    }
    
    return result;
  }
  
  /**
   * Mettre à jour le sitemap avec les pages temporaires
   */
  async updateSitemap(): Promise<void> {
    try {
      const { sitemapIntegration } = await import('./sitemap-integration');
      await sitemapIntegration.updateSitemapWithTemporaryPages();
      console.log('📄 Sitemap mis à jour avec les pages temporaires');
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du sitemap:', error);
      throw error;
    }
  }
  
  /**
   * Trouver la meilleure URL source pour une ressource
   */
  private findBestSourceUrl(scannedLink: ScannedLink, allLinks: ScannedLink[]): string {
    // Chercher une page qui référence cette ressource
    const referencingPages = allLinks
      .filter(link => link.sourceFile !== scannedLink.sourceFile)
      .map(link => link.sourceFile)
      .filter((file, index, arr) => arr.indexOf(file) === index);
    
    if (referencingPages.length > 0) {
      // Convertir le chemin de fichier en URL
      const sourcePage = referencingPages[0]
        .replace(/^src\/app/, '')
        .replace(/\/page\.(tsx?|jsx?)$/, '')
        .replace(/\/index\.(tsx?|jsx?)$/, '')
        || '/';
      
      return sourcePage;
    }
    
    return '/';
  }
  
  /**
   * Mapper le type de lien vers le type de ressource
   */
  private mapLinkTypeToResourceType(linkType: string): TemporaryPageConfig['resourceType'] {
    switch (linkType) {
      case 'download':
        return 'download';
      case 'internal':
        return 'page';
      default:
        return 'other';
    }
  }
  
  /**
   * Calculer la priorité basée sur l'usage
   */
  private calculatePriority(scannedLink: ScannedLink, allLinks: ScannedLink[]): 'high' | 'medium' | 'low' {
    // Compter combien de fois cette ressource est référencée
    const referenceCount = allLinks.filter(link => link.url === scannedLink.url).length;
    
    if (referenceCount >= 5) return 'high';
    if (referenceCount >= 2) return 'medium';
    return 'low';
  }
}

/**
 * Instance singleton du détecteur
 */
export const autoDetector = new AutoDetector();

/**
 * Configuration par défaut pour la détection
 */
export const defaultDetectionConfig: DetectionConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  maxDepth: 3,
  excludePatterns: [
    '/api/*',
    '/_next/*',
    '/admin/*',
    '*.css',
    '*.js',
    '*.json',
    '/temporary-resource*'
  ],
  includeExternal: false,
  timeout: 10000,
  retryAttempts: 2
};