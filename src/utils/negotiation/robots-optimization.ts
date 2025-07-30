// Optimisation du fichier robots.txt pour les techniques de négociation
// Gestion des directives de crawl et indexation

import { NegotiationTechnique } from '@/types/negotiation-technique';

export interface RobotsConfig {
  baseUrl: string;
  techniques: NegotiationTechnique[];
  allowedBots: string[];
  disallowedPaths: string[];
}

/**
 * Générateur de robots.txt optimisé pour les techniques de négociation
 */
export class RobotsOptimizer {
  /**
   * Génère le contenu du robots.txt
   */
  static generateRobotsTxt(config: RobotsConfig): string {
    const { baseUrl, techniques, allowedBots, disallowedPaths } = config;
    
    let robotsContent = '';

    // Directives pour les bots autorisés
    allowedBots.forEach(bot => {
      robotsContent += `User-agent: ${bot}\n`;
      robotsContent += 'Allow: /\n';
      
      // Disallow des chemins spécifiques
      disallowedPaths.forEach(path => {
        robotsContent += `Disallow: ${path}\n`;
      });
      
      robotsContent += '\n';
    });

    // Directives générales
    robotsContent += 'User-agent: *\n';
    robotsContent += 'Allow: /\n';
    
    // Disallow des chemins sensibles
    const defaultDisallowedPaths = [
      '/api/',
      '/admin/',
      '/_next/',
      '/test/',
      '/debug/',
      '/*.json$',
      '/private/'
    ];
    
    [...disallowedPaths, ...defaultDisallowedPaths].forEach(path => {
      robotsContent += `Disallow: ${path}\n`;
    });

    // Crawl-delay pour éviter la surcharge
    robotsContent += 'Crawl-delay: 1\n\n';

    // Sitemap
    robotsContent += `Sitemap: ${baseUrl}/sitemap.xml\n`;
    
    // Sitemaps spécialisés
    robotsContent += `Sitemap: ${baseUrl}/sitemap-techniques.xml\n`;
    robotsContent += `Sitemap: ${baseUrl}/sitemap-images.xml\n`;

    return robotsContent;
  }

  /**
   * Génère un sitemap spécialisé pour les techniques
   */
  static generateTechniquesSitemap(techniques: NegotiationTechnique[], baseUrl: string): string {
    const currentDate = new Date().toISOString();
    
    let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    sitemapContent += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
    sitemapContent += 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';

    techniques.forEach(technique => {
      const url = `${baseUrl}/ressources/techniques-de-negociation/${technique.slug}`;
      
      sitemapContent += '  <url>\n';
      sitemapContent += `    <loc>${url}</loc>\n`;
      sitemapContent += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemapContent += '    <changefreq>monthly</changefreq>\n';
      sitemapContent += '    <priority>0.8</priority>\n';
      
      // Images associées
      const images = this.getTechniqueImages(technique, baseUrl);
      images.forEach(image => {
        sitemapContent += '    <image:image>\n';
        sitemapContent += `      <image:loc>${image.url}</image:loc>\n`;
        sitemapContent += `      <image:caption>${image.caption}</image:caption>\n`;
        sitemapContent += `      <image:title>${image.title}</image:title>\n`;
        sitemapContent += '    </image:image>\n';
      });
      
      sitemapContent += '  </url>\n';
    });

    sitemapContent += '</urlset>';
    return sitemapContent;
  }

  /**
   * Génère un sitemap pour les images
   */
  static generateImagesSitemap(techniques: NegotiationTechnique[], baseUrl: string): string {
    let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    sitemapContent += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    techniques.forEach(technique => {
      const pageUrl = `${baseUrl}/ressources/techniques-de-negociation/${technique.slug}`;
      const images = this.getTechniqueImages(technique, baseUrl);
      
      if (images.length > 0) {
        sitemapContent += '  <url>\n';
        sitemapContent += `    <loc>${pageUrl}</loc>\n`;
        
        images.forEach(image => {
          sitemapContent += '    <image:image>\n';
          sitemapContent += `      <image:loc>${image.url}</image:loc>\n`;
          sitemapContent += `      <image:caption>${image.caption}</image:caption>\n`;
          sitemapContent += `      <image:title>${image.title}</image:title>\n`;
          sitemapContent += '    </image:image>\n';
        });
        
        sitemapContent += '  </url>\n';
      }
    });

    sitemapContent += '</urlset>';
    return sitemapContent;
  }

  /**
   * Récupère les images d'une technique pour le sitemap
   */
  private static getTechniqueImages(technique: NegotiationTechnique, baseUrl: string): Array<{
    url: string;
    caption: string;
    title: string;
  }> {
    const images: Array<{ url: string; caption: string; title: string }> = [];
    
    // Image hero
    images.push({
      url: `${baseUrl}/images/techniques/${technique.slug}/hero-${technique.slug}.jpg`,
      caption: `${technique.title} - Technique de négociation ${technique.author}`,
      title: `Guide ${technique.title} par Laurent Serre`
    });

    // Image Open Graph
    images.push({
      url: `${baseUrl}/images/techniques/${technique.slug}/og-${technique.slug}.jpg`,
      caption: `${technique.title} - Guide complet par Laurent Serre`,
      title: `${technique.title} | Technique ${technique.author} | Laurent Serre`
    });

    // Images des étapes
    technique.stepByStepGuide.forEach((step, index) => {
      images.push({
        url: `${baseUrl}/images/techniques/${technique.slug}/step-${step.step}.jpg`,
        caption: `Étape ${step.step}: ${step.title} - ${technique.title}`,
        title: `${step.title} - Guide pratique ${technique.title}`
      });
    });

    // Images des cas clients
    technique.caseStudies.forEach((caseStudy, index) => {
      images.push({
        url: `${baseUrl}/images/techniques/${technique.slug}/case-${index + 1}.jpg`,
        caption: `Cas client ${caseStudy.industry} - Application ${technique.title}`,
        title: `Cas client ${caseStudy.industry} - ${technique.title} en PME`
      });
    });

    return images;
  }

  /**
   * Valide la configuration robots.txt
   */
  static validateRobotsConfig(config: RobotsConfig): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Vérifier l'URL de base
    try {
      new URL(config.baseUrl);
    } catch {
      errors.push('URL de base invalide');
    }

    // Vérifier les bots autorisés
    if (!config.allowedBots || config.allowedBots.length === 0) {
      warnings.push('Aucun bot spécifiquement autorisé');
    }

    // Vérifier les techniques
    if (!config.techniques || config.techniques.length === 0) {
      warnings.push('Aucune technique fournie pour le sitemap');
    }

    // Vérifier les chemins interdits
    if (config.disallowedPaths) {
      config.disallowedPaths.forEach(path => {
        if (!path.startsWith('/')) {
          warnings.push(`Chemin interdit mal formaté: ${path} (doit commencer par /)`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Génère les directives meta robots pour une technique
   */
  static generateMetaRobots(technique: NegotiationTechnique): string {
    const directives = [
      'index',
      'follow',
      'max-image-preview:large',
      'max-snippet:-1',
      'max-video-preview:-1'
    ];

    // Directives spéciales selon la technique
    if (technique.difficultyLevel === 'advanced') {
      directives.push('noimageindex'); // Éviter l'indexation des images pour le contenu avancé
    }

    return directives.join(', ');
  }

  /**
   * Génère les directives de cache pour les robots
   */
  static generateRobotsCacheHeaders(): Record<string, string> {
    return {
      'Cache-Control': 'public, max-age=86400', // 24 heures
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow' // Le robots.txt lui-même ne doit pas être indexé
    };
  }
}

/**
 * Configuration par défaut pour les robots
 */
export const DEFAULT_ROBOTS_CONFIG: Partial<RobotsConfig> = {
  allowedBots: [
    'Googlebot',
    'Bingbot',
    'Slurp', // Yahoo
    'DuckDuckBot',
    'Baiduspider',
    'YandexBot',
    'facebookexternalhit', // Facebook
    'Twitterbot',
    'LinkedInBot'
  ],
  disallowedPaths: [
    '/api/',
    '/admin/',
    '/_next/',
    '/test/',
    '/debug/',
    '/private/',
    '/*.json$',
    '/temp/',
    '/cache/'
  ]
};