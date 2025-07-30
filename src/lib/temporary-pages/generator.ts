/**
 * Générateur de pages temporaires pour ressources manquantes
 * 
 * Ce module gère la création automatique de pages temporaires
 * et les redirections vers ces pages.
 */

import { writeFile, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export interface TemporaryPageConfig {
  /** URL de la ressource manquante */
  resourceUrl: string;
  /** URL de la page source */
  sourceUrl: string;
  /** Type de ressource */
  resourceType: 'download' | 'page' | 'guide' | 'tool' | 'template' | 'other';
  /** Titre de la ressource */
  title?: string;
  /** Description de la ressource */
  description?: string;
  /** Date estimée de disponibilité */
  estimatedDate?: string;
  /** Priorité de développement */
  priority?: 'high' | 'medium' | 'low';
  /** Statut de développement */
  developmentStatus?: 'planned' | 'in_progress' | 'review' | 'testing';
  /** Progression (0-100) */
  progress?: number;
  /** Alternatives suggérées */
  alternatives?: Array<{
    title: string;
    url: string;
    description: string;
    type: 'internal' | 'external';
  }>;
}

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}

/**
 * Classe pour gérer les pages temporaires
 */
export class TemporaryPageGenerator {
  private configPath: string;
  private redirectsPath: string;
  
  constructor() {
    this.configPath = join(process.cwd(), 'src/lib/temporary-pages/config.json');
    this.redirectsPath = join(process.cwd(), 'src/lib/temporary-pages/redirects.json');
  }
  
  /**
   * Charger la configuration existante
   */
  async loadConfig(): Promise<Record<string, TemporaryPageConfig>> {
    try {
      if (existsSync(this.configPath)) {
        const content = await readFile(this.configPath, 'utf-8');
        return JSON.parse(content);
      }
    } catch (error) {
      console.warn('Erreur lors du chargement de la configuration:', error);
    }
    return {};
  }
  
  /**
   * Sauvegarder la configuration
   */
  async saveConfig(config: Record<string, TemporaryPageConfig>): Promise<void> {
    try {
      // Créer le dossier si nécessaire
      await mkdir(join(process.cwd(), 'src/lib/temporary-pages'), { recursive: true });
      
      await writeFile(this.configPath, JSON.stringify(config, null, 2), 'utf-8');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la configuration:', error);
      throw error;
    }
  }
  
  /**
   * Charger les redirections existantes
   */
  async loadRedirects(): Promise<RedirectRule[]> {
    try {
      if (existsSync(this.redirectsPath)) {
        const content = await readFile(this.redirectsPath, 'utf-8');
        return JSON.parse(content);
      }
    } catch (error) {
      console.warn('Erreur lors du chargement des redirections:', error);
    }
    return [];
  }
  
  /**
   * Sauvegarder les redirections
   */
  async saveRedirects(redirects: RedirectRule[]): Promise<void> {
    try {
      await writeFile(this.redirectsPath, JSON.stringify(redirects, null, 2), 'utf-8');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des redirections:', error);
      throw error;
    }
  }
  
  /**
   * Créer une page temporaire
   */
  async createTemporaryPage(config: TemporaryPageConfig): Promise<string> {
    const configs = await this.loadConfig();
    const redirects = await this.loadRedirects();
    
    // Générer un ID unique pour cette ressource
    const resourceId = this.generateResourceId(config.resourceUrl);
    
    // Ajouter la configuration
    configs[resourceId] = {
      ...config,
      // Valeurs par défaut
      priority: config.priority || 'medium',
      resourceType: config.resourceType || this.detectResourceType(config.resourceUrl),
      title: config.title || this.generateTitle(config.resourceUrl, config.resourceType),
      description: config.description || this.generateDescription(config.resourceType),
      alternatives: config.alternatives || this.getDefaultAlternatives()
    };
    
    // Créer la redirection
    const temporaryUrl = `/temporary-resource?${new URLSearchParams({
      url: config.resourceUrl,
      source: config.sourceUrl,
      type: configs[resourceId].resourceType,
      title: configs[resourceId].title!,
      description: configs[resourceId].description!,
      ...(config.estimatedDate && { estimated: config.estimatedDate }),
      ...(config.priority && { priority: config.priority })
    }).toString()}`;
    
    // Ajouter la redirection si elle n'existe pas déjà
    const existingRedirect = redirects.find(r => r.source === config.resourceUrl);
    if (!existingRedirect) {
      redirects.push({
        source: config.resourceUrl,
        destination: temporaryUrl,
        permanent: false
      });
    }
    
    // Sauvegarder
    await this.saveConfig(configs);
    await this.saveRedirects(redirects);
    
    return temporaryUrl;
  }
  
  /**
   * Supprimer une page temporaire
   */
  async removeTemporaryPage(resourceUrl: string): Promise<void> {
    const configs = await this.loadConfig();
    const redirects = await this.loadRedirects();
    
    const resourceId = this.generateResourceId(resourceUrl);
    
    // Supprimer la configuration
    delete configs[resourceId];
    
    // Supprimer la redirection
    const updatedRedirects = redirects.filter(r => r.source !== resourceUrl);
    
    // Sauvegarder
    await this.saveConfig(configs);
    await this.saveRedirects(updatedRedirects);
  }
  
  /**
   * Mettre à jour une page temporaire
   */
  async updateTemporaryPage(resourceUrl: string, updates: Partial<TemporaryPageConfig>): Promise<void> {
    const configs = await this.loadConfig();
    const resourceId = this.generateResourceId(resourceUrl);
    
    if (configs[resourceId]) {
      configs[resourceId] = { ...configs[resourceId], ...updates };
      await this.saveConfig(configs);
    }
  }
  
  /**
   * Obtenir toutes les pages temporaires
   */
  async getAllTemporaryPages(): Promise<Record<string, TemporaryPageConfig>> {
    return this.loadConfig();
  }
  
  /**
   * Obtenir les statistiques des pages temporaires
   */
  async getStats(): Promise<{
    total: number;
    byType: Record<string, number>;
    byPriority: Record<string, number>;
    byStatus: Record<string, number>;
  }> {
    const configs = await this.loadConfig();
    const pages = Object.values(configs);
    
    const stats = {
      total: pages.length,
      byType: {} as Record<string, number>,
      byPriority: {} as Record<string, number>,
      byStatus: {} as Record<string, number>
    };
    
    pages.forEach(page => {
      // Par type
      stats.byType[page.resourceType] = (stats.byType[page.resourceType] || 0) + 1;
      
      // Par priorité
      const priority = page.priority || 'medium';
      stats.byPriority[priority] = (stats.byPriority[priority] || 0) + 1;
      
      // Par statut
      const status = page.developmentStatus || 'planned';
      stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
    });
    
    return stats;
  }
  
  /**
   * Générer un ID unique pour une ressource
   */
  private generateResourceId(url: string): string {
    return Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
  }
  
  /**
   * Détecter le type de ressource basé sur l'URL
   */
  private detectResourceType(url: string): TemporaryPageConfig['resourceType'] {
    const lowerUrl = url.toLowerCase();
    
    if (lowerUrl.includes('/download') || lowerUrl.match(/\.(pdf|doc|docx|xls|xlsx|zip|rar)$/)) {
      return 'download';
    }
    
    if (lowerUrl.includes('/guide') || lowerUrl.includes('/guides')) {
      return 'guide';
    }
    
    if (lowerUrl.includes('/tool') || lowerUrl.includes('/outils')) {
      return 'tool';
    }
    
    if (lowerUrl.includes('/template') || lowerUrl.includes('/modele')) {
      return 'template';
    }
    
    if (lowerUrl.includes('/page') || lowerUrl.startsWith('/')) {
      return 'page';
    }
    
    return 'other';
  }
  
  /**
   * Générer un titre basé sur l'URL et le type
   */
  private generateTitle(url: string, type?: string): string {
    const segments = url.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'ressource';
    
    // Nettoyer et formater le nom
    const cleanName = lastSegment
      .replace(/[-_]/g, ' ')
      .replace(/\.(pdf|doc|docx|xls|xlsx|zip|rar)$/i, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const typeLabels = {
      download: 'Téléchargement',
      page: 'Page',
      guide: 'Guide',
      tool: 'Outil',
      template: 'Template',
      other: 'Ressource'
    };
    
    const typeLabel = typeLabels[type as keyof typeof typeLabels] || 'Ressource';
    return `${typeLabel} : ${cleanName}`;
  }
  
  /**
   * Générer une description basée sur le type
   */
  private generateDescription(type: string): string {
    const descriptions = {
      download: 'Ce fichier est actuellement en cours de création et sera disponible prochainement.',
      page: 'Cette page est actuellement en cours de développement et sera disponible prochainement.',
      guide: 'Ce guide est actuellement en cours de rédaction et sera disponible prochainement.',
      tool: 'Cet outil est actuellement en cours de développement et sera disponible prochainement.',
      template: 'Ce template est actuellement en cours de création et sera disponible prochainement.',
      other: 'Cette ressource est actuellement en cours de développement et sera disponible prochainement.'
    };
    
    return descriptions[type as keyof typeof descriptions] || descriptions.other;
  }
  
  /**
   * Obtenir les alternatives par défaut
   */
  private getDefaultAlternatives(): TemporaryPageConfig['alternatives'] {
    return [
      {
        title: 'Ressources disponibles',
        url: '/ressources',
        description: 'Découvrez toutes nos ressources actuellement disponibles',
        type: 'internal'
      },
      {
        title: 'Nous contacter',
        url: '/contact',
        description: 'Contactez-nous pour des besoins spécifiques',
        type: 'internal'
      }
    ];
  }
}

/**
 * Instance singleton du générateur
 */
export const temporaryPageGenerator = new TemporaryPageGenerator();