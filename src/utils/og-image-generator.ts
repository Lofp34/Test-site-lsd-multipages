import { NegotiationTechnique } from '@/types/negotiation-technique';

export interface OGImageConfig {
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  logoUrl?: string;
  backgroundPattern?: string;
}

export const defaultOGConfig: OGImageConfig = {
  width: 1200,
  height: 630,
  backgroundColor: '#1B365D', // blue-ink
  textColor: '#FFFFFF',
  accentColor: '#DC2626', // red-600 pour négociation
  logoUrl: '/images/logo-laurent-serre.png',
  backgroundPattern: 'negotiation'
};

// Configuration spécifique par section
export const sectionOGConfigs: Record<string, Partial<OGImageConfig>> = {
  hero: {
    accentColor: '#DC2626',
    backgroundPattern: 'hero-gradient'
  },
  expertise: {
    accentColor: '#EA580C', // orange-600
    backgroundPattern: 'expertise-pattern'
  },
  guide: {
    accentColor: '#F59E0B', // amber-500
    backgroundPattern: 'guide-steps'
  },
  cases: {
    accentColor: '#10B981', // emerald-500
    backgroundPattern: 'success-metrics'
  },
  tools: {
    accentColor: '#8B5CF6', // violet-500
    backgroundPattern: 'tools-grid'
  },
  mistakes: {
    accentColor: '#EF4444', // red-500
    backgroundPattern: 'warning-pattern'
  }
};

export class OGImageGenerator {
  private technique: NegotiationTechnique;
  private baseUrl: string;

  constructor(technique: NegotiationTechnique, baseUrl: string = 'https://laurent-serre-developpement.fr') {
    this.technique = technique;
    this.baseUrl = baseUrl;
  }

  // Génère l'URL de l'image OG pour une section donnée
  generateOGImageUrl(section?: string): string {
    const baseImagePath = `/images/og-technique-${this.technique.slug}`;
    const sectionSuffix = section ? `-${section}` : '';
    const extension = '.jpg';
    
    return `${this.baseUrl}${baseImagePath}${sectionSuffix}${extension}`;
  }

  // Génère les paramètres pour l'API de génération d'images dynamiques
  generateDynamicOGParams(section?: string): URLSearchParams {
    const config = section 
      ? { ...defaultOGConfig, ...sectionOGConfigs[section] }
      : defaultOGConfig;

    const sectionTitles: Record<string, string> = {
      hero: 'Principe Fondamental FBI',
      expertise: 'Vision Laurent Serre',
      guide: 'Guide Pratique Étape par Étape',
      cases: 'Cas Clients PME & Résultats',
      tools: 'Outils & Ressources',
      mistakes: 'Pièges à Éviter'
    };

    const title = section && sectionTitles[section]
      ? sectionTitles[section]
      : this.technique.title;

    const subtitle = section && sectionTitles[section]
      ? `${this.technique.title} | ${this.technique.author}`
      : `Technique FBI de ${this.technique.author}`;

    const params = new URLSearchParams({
      title: title,
      subtitle: subtitle,
      author: 'Laurent Serre',
      category: 'Technique de Négociation',
      width: config.width.toString(),
      height: config.height.toString(),
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      accentColor: config.accentColor,
      pattern: config.backgroundPattern || 'default'
    });

    if (config.logoUrl) {
      params.set('logo', config.logoUrl);
    }

    // Ajout de métriques spécifiques selon la section
    if (section === 'cases') {
      params.set('metric1', '85%');
      params.set('metric1Label', 'Préservation marges');
      params.set('metric2', '92%');
      params.set('metric2Label', 'Satisfaction client');
    } else if (section === 'expertise') {
      params.set('experience', '20 ans');
      params.set('clients', '500+ PME');
    }

    return params;
  }

  // Génère l'URL complète pour l'API de génération d'images
  generateDynamicOGUrl(section?: string): string {
    const params = this.generateDynamicOGParams(section);
    return `${this.baseUrl}/api/og?${params.toString()}`;
  }

  // Génère les métadonnées Open Graph complètes
  generateOpenGraphMetadata(section?: string): Record<string, string> {
    const sectionTitles: Record<string, string> = {
      hero: 'Introduction et Principe Fondamental',
      expertise: 'Vision Laurent Serre et Adaptation PME',
      guide: 'Guide Pratique Étape par Étape',
      cases: 'Cas Clients PME et Résultats Concrets',
      tools: 'Outils Interactifs et Ressources',
      mistakes: 'Pièges à Éviter et Solutions'
    };

    const baseUrl = `${this.baseUrl}/ressources/techniques-de-negociation/${this.technique.slug}`;
    const sectionUrl = section ? `${baseUrl}#${section}` : baseUrl;
    
    const title = section && sectionTitles[section] 
      ? `${sectionTitles[section]} | ${this.technique.title}`
      : `${this.technique.title} | Technique FBI de ${this.technique.author}`;

    const description = this.generateSectionDescription(section);
    const imageUrl = this.generateOGImageUrl(section);

    return {
      'og:title': title,
      'og:description': description,
      'og:url': sectionUrl,
      'og:type': 'article',
      'og:image': imageUrl,
      'og:image:secure_url': imageUrl,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': `${title} - Laurent Serre Expert Négociation`,
      'og:image:type': 'image/jpeg',
      'og:site_name': 'Laurent Serre Développement',
      'og:locale': 'fr_FR',
      'og:locale:alternate': 'en_US',
      'article:author': 'Laurent Serre',
      'article:section': 'Techniques de Négociation',
      'article:tag': this.generateTags(section).join(', '),
      'article:published_time': '2025-01-27T10:00:00+01:00',
      'article:modified_time': new Date().toISOString(),
      'article:reading_time': this.estimateReadingTime(section).toString(),
      'fb:app_id': process.env.FACEBOOK_APP_ID || '',
      'og:see_also': this.generateRelatedUrls().join(',')
    };
  }

  // Génère les métadonnées Twitter Card complètes
  generateTwitterCardMetadata(section?: string): Record<string, string> {
    const title = section 
      ? `${section} | ${this.technique.title} | Laurent Serre`
      : `${this.technique.title} | Technique FBI | Laurent Serre`;

    const description = this.generateSectionDescription(section, 160); // Twitter limit
    const imageUrl = this.generateOGImageUrl(section);
    const sectionUrl = section 
      ? `${this.baseUrl}/ressources/techniques-de-negociation/${this.technique.slug}#${section}`
      : `${this.baseUrl}/ressources/techniques-de-negociation/${this.technique.slug}`;

    return {
      'twitter:card': 'summary_large_image',
      'twitter:site': '@laurent_serre',
      'twitter:creator': '@laurent_serre',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': imageUrl,
      'twitter:image:alt': `${title} - Expert Négociation`,
      'twitter:url': sectionUrl,
      'twitter:domain': 'laurent-serre-developpement.fr',
      'twitter:label1': 'Durée de lecture',
      'twitter:data1': `${this.estimateReadingTime(section)} min`,
      'twitter:label2': 'Catégorie',
      'twitter:data2': 'Technique FBI'
    };
  }

  // Génère une description optimisée pour une section
  private generateSectionDescription(section?: string, maxLength: number = 300): string {
    const sectionDescriptions: Record<string, string> = {
      hero: `Découvrez le principe fondamental de la technique FBI "${this.technique.title}" : pourquoi un bon accord ne peut jamais naître d'un mauvais compromis. Origine, psychologie et application pratique.`,
      expertise: `Vision terrain de Laurent Serre sur la technique "${this.technique.title}". 20 ans d'expérience PME, adaptation française et retours d'expérience concrets sur 500+ négociations.`,
      guide: `Guide pratique étape par étape pour maîtriser "${this.technique.title}". Scripts, formulations et exemples concrets pour appliquer cette technique FBI en contexte PME français.`,
      cases: `Cas clients PME réels utilisant "${this.technique.title}". Résultats mesurés : 85% de préservation des marges, 92% de satisfaction client maintenue. Métriques et retours d'expérience.`,
      tools: `Outils interactifs et ressources téléchargeables pour "${this.technique.title}". Checklist, templates, guides PDF et exercices pratiques pour maîtriser cette technique FBI.`,
      mistakes: `Pièges courants et erreurs à éviter avec "${this.technique.title}". Solutions concrètes et conseils préventifs basés sur l'expérience terrain de Laurent Serre.`
    };

    const baseDescription = `Maîtrisez la technique de négociation FBI "${this.technique.title}" avec les conseils terrain de Laurent Serre. 85% de préservation des marges, cas PME concrets et scripts inclus.`;
    
    const description = section && sectionDescriptions[section] 
      ? sectionDescriptions[section]
      : baseDescription;

    return description.length > maxLength 
      ? description.substring(0, maxLength - 3) + '...'
      : description;
  }

  // Génère les tags pertinents pour une section
  private generateTags(section?: string): string[] {
    const baseTags = [
      'négociation commerciale',
      'technique FBI',
      'Chris Voss',
      'PME',
      'Laurent Serre',
      'closing commercial',
      'développement commercial'
    ];

    const sectionTags: Record<string, string[]> = {
      hero: ['principe fondamental', 'psychologie négociation'],
      expertise: ['expérience terrain', 'adaptation PME', 'consultant expert'],
      guide: ['guide pratique', 'scripts négociation', 'étapes concrètes'],
      cases: ['cas clients', 'résultats mesurés', 'ROI négociation'],
      tools: ['outils pratiques', 'ressources téléchargeables', 'checklist'],
      mistakes: ['pièges négociation', 'erreurs courantes', 'solutions préventives']
    };

    return section && sectionTags[section] 
      ? [...baseTags, ...sectionTags[section]]
      : baseTags;
  }

  // Estime le temps de lecture pour une section
  private estimateReadingTime(section?: string): number {
    const sectionWordCounts: Record<string, number> = {
      hero: 400,
      expertise: 600,
      guide: 1200,
      cases: 800,
      tools: 500,
      mistakes: 600
    };

    const totalWords = section && sectionWordCounts[section] 
      ? sectionWordCounts[section]
      : 3500; // Page complète

    return Math.ceil(totalWords / 200); // 200 mots par minute
  }

  // Génère les URLs de contenu lié
  private generateRelatedUrls(): string[] {
    return [
      `${this.baseUrl}/ressources/techniques-de-negociation`,
      `${this.baseUrl}/formation-commerciale-pme`,
      `${this.baseUrl}/expert-developpement-commercial-pme`,
      `${this.baseUrl}/ressources/meilleurs-livres/negociation-closing`
    ];
  }

  // Génère les données structurées pour les images
  generateImageStructuredData(section?: string): object {
    const imageUrl = this.generateOGImageUrl(section);
    const title = section 
      ? `${section} - ${this.technique.title}`
      : this.technique.title;

    return {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630,
      "caption": `${title} - Laurent Serre Expert Négociation`,
      "description": this.generateSectionDescription(section),
      "author": {
        "@type": "Person",
        "name": "Laurent Serre"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Laurent Serre Développement"
      },
      "license": `${this.baseUrl}/mentions-legales`,
      "acquireLicensePage": `${this.baseUrl}/contact`,
      "creditText": "Laurent Serre Développement",
      "creator": {
        "@type": "Person",
        "name": "Laurent Serre"
      },
      "datePublished": "2025-01-27T10:00:00+01:00",
      "encodingFormat": "image/jpeg",
      "contentSize": "~150KB",
      "representativeOfPage": true,
      "thumbnail": {
        "@type": "ImageObject",
        "url": `${imageUrl}?w=400&h=210`,
        "width": 400,
        "height": 210
      }
    };
  }
}

// Fonction utilitaire pour générer les métadonnées complètes
export function generateCompleteMetadata(
  technique: NegotiationTechnique,
  section?: string,
  baseUrl: string = 'https://laurent-serre-developpement.fr'
): {
  openGraph: Record<string, string>;
  twitter: Record<string, string>;
  imageStructuredData: object;
} {
  const generator = new OGImageGenerator(technique, baseUrl);
  
  return {
    openGraph: generator.generateOpenGraphMetadata(section),
    twitter: generator.generateTwitterCardMetadata(section),
    imageStructuredData: generator.generateImageStructuredData(section)
  };
}

// Fonction pour valider les URLs d'images
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch {
    return false;
  }
}

// Fonction pour optimiser les images OG
export function optimizeOGImageUrl(baseUrl: string, params: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpg' | 'png' | 'webp';
}): string {
  const searchParams = new URLSearchParams();
  
  if (params.width) searchParams.set('w', params.width.toString());
  if (params.height) searchParams.set('h', params.height.toString());
  if (params.quality) searchParams.set('q', params.quality.toString());
  if (params.format) searchParams.set('f', params.format);
  
  return `${baseUrl}?${searchParams.toString()}`;
}