/**
 * Intégration du sitemap pour les pages temporaires
 * 
 * Ce module gère l'ajout et la suppression automatique des pages temporaires
 * dans le sitemap du site.
 */

import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { temporaryPageGenerator } from './generator';

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Classe pour gérer l'intégration du sitemap
 */
export class SitemapIntegration {
  private sitemapPath: string;
  private baseUrl: string;
  
  constructor(baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.laurentserre.com') {
    this.sitemapPath = join(process.cwd(), 'public/sitemap.xml');
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Supprimer le slash final
  }
  
  /**
   * Mettre à jour le sitemap avec les pages temporaires
   */
  async updateSitemapWithTemporaryPages(): Promise<void> {
    try {
      console.log('🗺️  Mise à jour du sitemap avec les pages temporaires...');
      
      // Récupérer les pages temporaires actives
      const temporaryPages = await temporaryPageGenerator.getAllTemporaryPages();
      
      // Créer les entrées de sitemap pour les pages temporaires
      const temporaryEntries: SitemapEntry[] = Object.values(temporaryPages).map(page => ({
        url: `${this.baseUrl}/temporary-resource?${new URLSearchParams({
          url: page.resourceUrl,
          source: page.sourceUrl,
          type: page.resourceType,
          title: page.title || '',
          description: page.description || ''
        }).toString()}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: this.getPriorityValue(page.priority || 'medium')
      }));
      
      // Lire le sitemap existant ou créer un nouveau
      let existingSitemap = '';
      if (existsSync(this.sitemapPath)) {
        existingSitemap = await readFile(this.sitemapPath, 'utf-8');
      }
      
      // Générer le nouveau sitemap
      const updatedSitemap = await this.generateSitemapWithTemporaryPages(
        existingSitemap,
        temporaryEntries
      );
      
      // Écrire le sitemap mis à jour
      await writeFile(this.sitemapPath, updatedSitemap, 'utf-8');
      
      console.log(`✅ Sitemap mis à jour avec ${temporaryEntries.length} pages temporaires`);
      
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du sitemap:', error);
      throw error;
    }
  }
  
  /**
   * Supprimer les pages temporaires du sitemap
   */
  async removeTemporaryPagesFromSitemap(): Promise<void> {
    try {
      console.log('🗑️  Suppression des pages temporaires du sitemap...');
      
      if (!existsSync(this.sitemapPath)) {
        console.log('⚠️  Aucun sitemap trouvé');
        return;
      }
      
      const existingSitemap = await readFile(this.sitemapPath, 'utf-8');
      
      // Supprimer toutes les entrées de pages temporaires
      const cleanedSitemap = this.removeSitemapEntries(
        existingSitemap,
        '/temporary-resource'
      );
      
      await writeFile(this.sitemapPath, cleanedSitemap, 'utf-8');
      
      console.log('✅ Pages temporaires supprimées du sitemap');
      
    } catch (error) {
      console.error('❌ Erreur lors de la suppression des pages temporaires du sitemap:', error);
      throw error;
    }
  }
  
  /**
   * Générer un sitemap avec les pages temporaires
   */
  private async generateSitemapWithTemporaryPages(
    existingSitemap: string,
    temporaryEntries: SitemapEntry[]
  ): Promise<string> {
    // Si pas de sitemap existant, créer un nouveau
    if (!existingSitemap) {
      return this.createNewSitemap(temporaryEntries);
    }
    
    // Supprimer les anciennes entrées temporaires
    const cleanedSitemap = this.removeSitemapEntries(existingSitemap, '/temporary-resource');
    
    // Ajouter les nouvelles entrées temporaires
    return this.addSitemapEntries(cleanedSitemap, temporaryEntries);
  }
  
  /**
   * Créer un nouveau sitemap
   */
  private createNewSitemap(temporaryEntries: SitemapEntry[]): string {
    const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    const footer = `</urlset>`;
    
    const entries = temporaryEntries.map(entry => this.createSitemapEntry(entry)).join('\n');
    
    return `${header}\n${entries}\n${footer}`;
  }
  
  /**
   * Ajouter des entrées au sitemap
   */
  private addSitemapEntries(sitemap: string, entries: SitemapEntry[]): string {
    if (entries.length === 0) {
      return sitemap;
    }
    
    const newEntries = entries.map(entry => this.createSitemapEntry(entry)).join('\n');
    
    // Insérer avant la balise de fermeture </urlset>
    return sitemap.replace('</urlset>', `${newEntries}\n</urlset>`);
  }
  
  /**
   * Supprimer des entrées du sitemap
   */
  private removeSitemapEntries(sitemap: string, urlPattern: string): string {
    // Regex pour supprimer les entrées contenant le pattern
    const entryRegex = new RegExp(
      `\\s*<url>\\s*<loc>[^<]*${urlPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^<]*</loc>.*?</url>\\s*`,
      'gs'
    );
    
    return sitemap.replace(entryRegex, '');
  }
  
  /**
   * Créer une entrée de sitemap
   */
  private createSitemapEntry(entry: SitemapEntry): string {
    return `  <url>
    <loc>${this.escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  }
  
  /**
   * Échapper les caractères XML
   */
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  
  /**
   * Convertir la priorité en valeur numérique
   */
  private getPriorityValue(priority: string): number {
    switch (priority) {
      case 'high':
        return 0.8;
      case 'medium':
        return 0.6;
      case 'low':
        return 0.4;
      default:
        return 0.5;
    }
  }
  
  /**
   * Valider le sitemap généré
   */
  async validateSitemap(): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const result = {
      isValid: true,
      errors: [] as string[],
      warnings: [] as string[]
    };
    
    try {
      if (!existsSync(this.sitemapPath)) {
        result.isValid = false;
        result.errors.push('Sitemap file not found');
        return result;
      }
      
      const sitemapContent = await readFile(this.sitemapPath, 'utf-8');
      
      // Vérifications basiques
      if (!sitemapContent.includes('<?xml')) {
        result.errors.push('Missing XML declaration');
        result.isValid = false;
      }
      
      if (!sitemapContent.includes('<urlset')) {
        result.errors.push('Missing urlset element');
        result.isValid = false;
      }
      
      // Compter les URLs
      const urlCount = (sitemapContent.match(/<url>/g) || []).length;
      if (urlCount === 0) {
        result.warnings.push('No URLs found in sitemap');
      }
      
      if (urlCount > 50000) {
        result.warnings.push('Sitemap contains more than 50,000 URLs');
      }
      
      // Vérifier les pages temporaires
      const temporaryUrlCount = (sitemapContent.match(/temporary-resource/g) || []).length;
      if (temporaryUrlCount > 0) {
        result.warnings.push(`${temporaryUrlCount} temporary pages found in sitemap`);
      }
      
      console.log(`📊 Validation du sitemap: ${urlCount} URLs, ${temporaryUrlCount} pages temporaires`);
      
    } catch (error) {
      result.isValid = false;
      result.errors.push(`Validation error: ${error}`);
    }
    
    return result;
  }
}

/**
 * Instance singleton de l'intégration sitemap
 */
export const sitemapIntegration = new SitemapIntegration();

/**
 * Fonction utilitaire pour mettre à jour le sitemap
 */
export async function updateSitemapWithTemporaryPages(): Promise<void> {
  await sitemapIntegration.updateSitemapWithTemporaryPages();
}

/**
 * Fonction utilitaire pour nettoyer le sitemap
 */
export async function cleanSitemapFromTemporaryPages(): Promise<void> {
  await sitemapIntegration.removeTemporaryPagesFromSitemap();
}