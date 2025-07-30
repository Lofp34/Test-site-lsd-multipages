// Utilitaires d'optimisation SEO avancée pour les techniques de négociation
// Gestion des images, alt text, et optimisations techniques

import { NegotiationTechnique } from '@/types/negotiation-technique';

export interface ImageOptimizationConfig {
  technique: NegotiationTechnique;
  baseUrl: string;
  sizes: {
    og: { width: number; height: number };
    hero: { width: number; height: number };
    thumbnail: { width: number; height: number };
  };
}

export interface SEOValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

/**
 * Générateur d'alt text descriptifs pour les images
 */
export class ImageSEOOptimizer {
  /**
   * Génère l'alt text pour l'image hero d'une technique
   */
  static generateHeroAltText(technique: NegotiationTechnique): string {
    return `${technique.title} - Technique de négociation ${technique.author} expliquée par Laurent Serre, expert développement commercial PME`;
  }

  /**
   * Génère l'alt text pour l'image Open Graph
   */
  static generateOGAltText(technique: NegotiationTechnique): string {
    return `Guide complet ${technique.title} par Laurent Serre - Technique ${technique.author} adaptée aux PME françaises`;
  }

  /**
   * Génère l'alt text pour les images d'étapes du guide pratique
   */
  static generateStepAltText(technique: NegotiationTechnique, stepNumber: number, stepTitle: string): string {
    return `Étape ${stepNumber} - ${stepTitle} - Guide pratique ${technique.title} par Laurent Serre`;
  }

  /**
   * Génère l'alt text pour les images de cas clients
   */
  static generateCaseStudyAltText(technique: NegotiationTechnique, industry: string): string {
    return `Cas client ${industry} - Application ${technique.title} en PME - Résultats mesurés par Laurent Serre`;
  }

  /**
   * Génère l'alt text pour l'avatar Laurent Serre
   */
  static generateAuthorAltText(): string {
    return 'Laurent Serre - Expert développement commercial PME, formateur techniques de négociation avancées';
  }

  /**
   * Génère les URLs d'images optimisées
   */
  static generateOptimizedImageUrls(config: ImageOptimizationConfig): {
    og: string;
    hero: string;
    thumbnail: string;
    webp: {
      og: string;
      hero: string;
      thumbnail: string;
    };
    avif: {
      og: string;
      hero: string;
      thumbnail: string;
    };
  } {
    const { technique, baseUrl } = config;
    const baseImagePath = `/images/techniques/${technique.slug}`;

    return {
      og: `${baseUrl}${baseImagePath}/og-${technique.slug}.jpg`,
      hero: `${baseUrl}${baseImagePath}/hero-${technique.slug}.jpg`,
      thumbnail: `${baseUrl}${baseImagePath}/thumb-${technique.slug}.jpg`,
      webp: {
        og: `${baseUrl}${baseImagePath}/og-${technique.slug}.webp`,
        hero: `${baseUrl}${baseImagePath}/hero-${technique.slug}.webp`,
        thumbnail: `${baseUrl}${baseImagePath}/thumb-${technique.slug}.webp`,
      },
      avif: {
        og: `${baseUrl}${baseImagePath}/og-${technique.slug}.avif`,
        hero: `${baseUrl}${baseImagePath}/hero-${technique.slug}.avif`,
        thumbnail: `${baseUrl}${baseImagePath}/thumb-${technique.slug}.avif`,
      }
    };
  }

  /**
   * Génère le srcSet pour les images responsives
   */
  static generateResponsiveSrcSet(baseUrl: string, imagePath: string, sizes: number[]): string {
    return sizes
      .map(size => `${baseUrl}${imagePath}?w=${size} ${size}w`)
      .join(', ');
  }
}

/**
 * Validateur SEO pour les techniques de négociation
 */
export class SEOValidator {
  private static readonly TITLE_MIN_LENGTH = 30;
  private static readonly TITLE_MAX_LENGTH = 60;
  private static readonly DESCRIPTION_MIN_LENGTH = 120;
  private static readonly DESCRIPTION_MAX_LENGTH = 160;
  private static readonly KEYWORDS_MIN_COUNT = 5;
  private static readonly KEYWORDS_MAX_COUNT = 10;

  /**
   * Valide la configuration SEO d'une technique
   */
  static validateTechniqueSEO(technique: NegotiationTechnique): SEOValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let score = 100;

    // Validation du titre
    const titleValidation = this.validateTitle(technique.title);
    if (!titleValidation.isValid) {
      errors.push(...titleValidation.errors);
      warnings.push(...titleValidation.warnings);
      score -= titleValidation.penalty;
    }

    // Validation de la description
    const descriptionValidation = this.validateDescription(technique.description);
    if (!descriptionValidation.isValid) {
      errors.push(...descriptionValidation.errors);
      warnings.push(...descriptionValidation.warnings);
      score -= descriptionValidation.penalty;
    }

    // Validation du contenu
    const contentValidation = this.validateContent(technique);
    if (!contentValidation.isValid) {
      errors.push(...contentValidation.errors);
      warnings.push(...contentValidation.warnings);
      score -= contentValidation.penalty;
    }

    // Validation des métadonnées
    const metadataValidation = this.validateMetadata(technique);
    if (!metadataValidation.isValid) {
      errors.push(...metadataValidation.errors);
      warnings.push(...metadataValidation.warnings);
      score -= metadataValidation.penalty;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score)
    };
  }

  /**
   * Valide le titre SEO
   */
  private static validateTitle(title: string): { isValid: boolean; errors: string[]; warnings: string[]; penalty: number } {
    const errors: string[] = [];
    const warnings: string[] = [];
    let penalty = 0;

    if (!title || title.trim().length === 0) {
      errors.push('Le titre est requis');
      penalty += 30;
    } else {
      const titleLength = title.length;
      
      if (titleLength < this.TITLE_MIN_LENGTH) {
        warnings.push(`Titre trop court (${titleLength} caractères). Recommandé: ${this.TITLE_MIN_LENGTH}-${this.TITLE_MAX_LENGTH}`);
        penalty += 10;
      }
      
      if (titleLength > this.TITLE_MAX_LENGTH) {
        warnings.push(`Titre trop long (${titleLength} caractères). Recommandé: ${this.TITLE_MIN_LENGTH}-${this.TITLE_MAX_LENGTH}`);
        penalty += 15;
      }

      // Vérifier la présence de mots-clés importants
      const importantKeywords = ['négociation', 'technique', 'laurent serre'];
      const titleLower = title.toLowerCase();
      const missingKeywords = importantKeywords.filter(keyword => !titleLower.includes(keyword));
      
      if (missingKeywords.length > 0) {
        warnings.push(`Mots-clés manquants dans le titre: ${missingKeywords.join(', ')}`);
        penalty += missingKeywords.length * 5;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      penalty
    };
  }

  /**
   * Valide la description SEO
   */
  private static validateDescription(description: string): { isValid: boolean; errors: string[]; warnings: string[]; penalty: number } {
    const errors: string[] = [];
    const warnings: string[] = [];
    let penalty = 0;

    if (!description || description.trim().length === 0) {
      errors.push('La description est requise');
      penalty += 25;
    } else {
      const descriptionLength = description.length;
      
      if (descriptionLength < this.DESCRIPTION_MIN_LENGTH) {
        warnings.push(`Description trop courte (${descriptionLength} caractères). Recommandé: ${this.DESCRIPTION_MIN_LENGTH}-${this.DESCRIPTION_MAX_LENGTH}`);
        penalty += 10;
      }
      
      if (descriptionLength > this.DESCRIPTION_MAX_LENGTH) {
        warnings.push(`Description trop longue (${descriptionLength} caractères). Recommandé: ${this.DESCRIPTION_MIN_LENGTH}-${this.DESCRIPTION_MAX_LENGTH}`);
        penalty += 15;
      }

      // Vérifier la présence d'un call-to-action
      const ctaKeywords = ['guide', 'apprenez', 'maîtrisez', 'découvrez', 'formation'];
      const descriptionLower = description.toLowerCase();
      const hasCTA = ctaKeywords.some(keyword => descriptionLower.includes(keyword));
      
      if (!hasCTA) {
        warnings.push('Aucun call-to-action détecté dans la description');
        penalty += 5;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      penalty
    };
  }

  /**
   * Valide le contenu de la technique
   */
  private static validateContent(technique: NegotiationTechnique): { isValid: boolean; errors: string[]; warnings: string[]; penalty: number } {
    const errors: string[] = [];
    const warnings: string[] = [];
    let penalty = 0;

    // Vérifier la présence des sections essentielles
    if (!technique.stepByStepGuide || technique.stepByStepGuide.length === 0) {
      errors.push('Guide étape par étape manquant');
      penalty += 20;
    } else if (technique.stepByStepGuide.length < 3) {
      warnings.push('Guide étape par étape trop court (moins de 3 étapes)');
      penalty += 10;
    }

    if (!technique.caseStudies || technique.caseStudies.length === 0) {
      errors.push('Cas clients manquants');
      penalty += 15;
    } else if (technique.caseStudies.length < 2) {
      warnings.push('Pas assez de cas clients (moins de 2)');
      penalty += 5;
    }

    if (!technique.commonMistakes || technique.commonMistakes.length === 0) {
      warnings.push('Erreurs courantes manquantes');
      penalty += 10;
    }

    if (!technique.laurentVision || technique.laurentVision.trim().length === 0) {
      errors.push('Vision Laurent Serre manquante');
      penalty += 15;
    }

    if (!technique.pmeAdaptation || technique.pmeAdaptation.trim().length === 0) {
      warnings.push('Adaptation PME manquante');
      penalty += 10;
    }

    // Vérifier la longueur du contenu total
    const totalWordCount = this.estimateWordCount(technique);
    if (totalWordCount < 1500) {
      warnings.push(`Contenu trop court (${totalWordCount} mots estimés). Recommandé: 1500+ mots`);
      penalty += 15;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      penalty
    };
  }

  /**
   * Valide les métadonnées
   */
  private static validateMetadata(technique: NegotiationTechnique): { isValid: boolean; errors: string[]; warnings: string[]; penalty: number } {
    const errors: string[] = [];
    const warnings: string[] = [];
    let penalty = 0;

    if (!technique.seoMetadata) {
      errors.push('Métadonnées SEO manquantes');
      penalty += 25;
      return { isValid: false, errors, warnings, penalty };
    }

    const { seoMetadata } = technique;

    // Vérifier les mots-clés
    if (!seoMetadata.keywords || seoMetadata.keywords.length === 0) {
      errors.push('Mots-clés manquants');
      penalty += 20;
    } else {
      if (seoMetadata.keywords.length < this.KEYWORDS_MIN_COUNT) {
        warnings.push(`Pas assez de mots-clés (${seoMetadata.keywords.length}). Recommandé: ${this.KEYWORDS_MIN_COUNT}-${this.KEYWORDS_MAX_COUNT}`);
        penalty += 10;
      }
      
      if (seoMetadata.keywords.length > this.KEYWORDS_MAX_COUNT) {
        warnings.push(`Trop de mots-clés (${seoMetadata.keywords.length}). Recommandé: ${this.KEYWORDS_MIN_COUNT}-${this.KEYWORDS_MAX_COUNT}`);
        penalty += 5;
      }
    }

    // Vérifier l'URL canonique
    if (!seoMetadata.canonicalUrl) {
      errors.push('URL canonique manquante');
      penalty += 15;
    } else {
      try {
        new URL(seoMetadata.canonicalUrl);
      } catch {
        errors.push('URL canonique invalide');
        penalty += 15;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      penalty
    };
  }

  /**
   * Estime le nombre de mots du contenu
   */
  private static estimateWordCount(technique: NegotiationTechnique): number {
    const content = [
      technique.description,
      technique.laurentVision || '',
      technique.pmeAdaptation || '',
      ...(technique.stepByStepGuide || []).map(s => `${s.description} ${s.script || ''} ${s.example || ''}`),
      ...(technique.caseStudies || []).map(c => `${c.challenge} ${c.application} ${c.results}`),
      ...(technique.commonMistakes || []).map(m => `${m.mistake} ${m.consequence} ${m.solution}`)
    ].join(' ');
    
    return content.split(/\s+/).filter(word => word.length > 0).length;
  }
}

/**
 * Générateur de liens internes optimisés
 */
export class InternalLinkOptimizer {
  /**
   * Génère les liens internes recommandés pour une technique
   */
  static generateInternalLinks(technique: NegotiationTechnique, baseUrl: string): {
    relatedTechniques: Array<{ url: string; anchor: string; context: string }>;
    relatedResources: Array<{ url: string; anchor: string; context: string }>;
    relatedPages: Array<{ url: string; anchor: string; context: string }>;
  } {
    return {
      relatedTechniques: this.generateRelatedTechniqueLinks(technique, baseUrl),
      relatedResources: this.generateRelatedResourceLinks(technique, baseUrl),
      relatedPages: this.generateRelatedPageLinks(technique, baseUrl)
    };
  }

  /**
   * Génère les liens vers les techniques liées
   */
  private static generateRelatedTechniqueLinks(technique: NegotiationTechnique, baseUrl: string): Array<{ url: string; anchor: string; context: string }> {
    const links: Array<{ url: string; anchor: string; context: string }> = [];

    // Liens vers les techniques liées
    if (technique.relatedTechniques) {
      technique.relatedTechniques.forEach(relatedId => {
        const relatedTechniqueNames: Record<string, string> = {
          'ne-jamais-couper-la-poire-en-deux': 'Ne jamais couper la poire en deux',
          'effet-miroir': 'L\'effet miroir',
          'silence-strategique': 'Le silence stratégique',
          'negociation-raisonnee': 'La négociation raisonnée',
          'ancrage-tactique': 'L\'ancrage tactique',
          'oui-progressif': 'La technique du Oui progressif',
          'recadrage-valeur': 'Le recadrage de valeur',
          'concession-calculee': 'La concession calculée'
        };

        const techniqueName = relatedTechniqueNames[relatedId];
        if (techniqueName) {
          links.push({
            url: `${baseUrl}/ressources/techniques-de-negociation/${relatedId}`,
            anchor: techniqueName,
            context: `Technique complémentaire à ${technique.title}`
          });
        }
      });
    }

    return links;
  }

  /**
   * Génère les liens vers les ressources liées
   */
  private static generateRelatedResourceLinks(technique: NegotiationTechnique, baseUrl: string): Array<{ url: string; anchor: string; context: string }> {
    const links: Array<{ url: string; anchor: string; context: string }> = [];

    // Liens vers les guides de prospection et closing
    if (technique.category === 'psychology' || technique.id === 'effet-miroir') {
      links.push({
        url: `${baseUrl}/ressources/guide-prospection`,
        anchor: 'Guide de prospection commerciale',
        context: 'Pour approfondir vos techniques de découverte client'
      });
    }

    if (technique.category === 'closing' || technique.id === 'concession-calculee') {
      links.push({
        url: `${baseUrl}/ressources/guide-closing`,
        anchor: 'Guide du closing commercial',
        context: 'Pour maîtriser l\'art de conclure vos négociations'
      });
    }

    // Liens vers les formations
    links.push({
      url: `${baseUrl}/formation-commerciale-pme`,
      anchor: 'Formation commerciale PME',
      context: `Approfondissez ${technique.title} en formation personnalisée`
    });

    return links;
  }

  /**
   * Génère les liens vers les pages liées
   */
  private static generateRelatedPageLinks(technique: NegotiationTechnique, baseUrl: string): Array<{ url: string; anchor: string; context: string }> {
    const links: Array<{ url: string; anchor: string; context: string }> = [];

    // Lien vers la page principale des techniques
    links.push({
      url: `${baseUrl}/ressources/techniques-de-negociation`,
      anchor: 'Toutes les techniques de négociation',
      context: 'Découvrez notre collection complète de techniques'
    });

    // Liens vers les pages de service
    links.push({
      url: `${baseUrl}/expert-developpement-commercial-pme`,
      anchor: 'Expert développement commercial PME',
      context: 'Accompagnement personnalisé pour votre équipe commerciale'
    });

    links.push({
      url: `${baseUrl}/diagnostic`,
      anchor: 'Diagnostic commercial gratuit',
      context: 'Évaluez vos besoins en techniques de négociation'
    });

    return links;
  }
}

/**
 * Utilitaires de performance SEO
 */
export class SEOPerformanceOptimizer {
  /**
   * Génère les directives de cache pour les ressources SEO
   */
  static generateCacheHeaders(): Record<string, string> {
    return {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Expires': new Date(Date.now() + 31536000 * 1000).toUTCString(),
      'ETag': `"${Date.now()}"`,
      'Last-Modified': new Date().toUTCString()
    };
  }

  /**
   * Génère les directives de préchargement
   */
  static generatePreloadDirectives(technique: NegotiationTechnique, baseUrl: string): Array<{ href: string; as: string; type?: string }> {
    return [
      {
        href: `${baseUrl}/ressources/techniques-de-negociation/${technique.slug}`,
        as: 'document'
      },
      {
        href: `${baseUrl}/images/techniques/${technique.slug}/hero-${technique.slug}.webp`,
        as: 'image',
        type: 'image/webp'
      },
      {
        href: `${baseUrl}/styles/negotiation/technique-themes.css`,
        as: 'style'
      }
    ];
  }

  /**
   * Génère les directives de préconnexion
   */
  static generatePreconnectDirectives(): string[] {
    return [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ];
  }
}