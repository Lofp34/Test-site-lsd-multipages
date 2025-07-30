// Générateur SEO automatique pour les techniques de négociation
// Génère métadonnées, données structurées et optimisations SEO

import { Metadata } from 'next';
import { NegotiationTechnique } from '@/types/negotiation-technique';

export interface SEOConfig {
  technique: NegotiationTechnique;
  baseUrl: string;
  authorInfo: {
    name: string;
    url: string;
    image: string;
    description: string;
  };
  organizationInfo: {
    name: string;
    url: string;
    logo: string;
    description: string;
  };
}

export interface StructuredDataConfig {
  technique: NegotiationTechnique;
  baseUrl: string;
  authorInfo: SEOConfig['authorInfo'];
  organizationInfo: SEOConfig['organizationInfo'];
}

/**
 * Générateur principal de métadonnées SEO
 */
export class SEOGenerator {
  private static readonly MAX_TITLE_LENGTH = 60;
  private static readonly MAX_DESCRIPTION_LENGTH = 160;
  private static readonly MAX_KEYWORDS = 10;

  /**
   * Génère les métadonnées Next.js complètes pour une technique
   */
  static generateMetadata(config: SEOConfig): Metadata {
    const { technique, baseUrl, authorInfo } = config;
    
    const title = this.generateTitle(technique);
    const description = this.generateDescription(technique);
    const keywords = this.generateKeywords(technique);
    const canonicalUrl = `${baseUrl}/ressources/techniques-de-negociation/${technique.slug}`;

    return {
      title,
      description,
      keywords: keywords.join(', '),
      authors: [{ name: authorInfo.name, url: authorInfo.url }],
      creator: authorInfo.name,
      publisher: config.organizationInfo.name,
      
      alternates: {
        canonical: canonicalUrl
      },
      
      openGraph: this.generateOpenGraph(technique, baseUrl, authorInfo),
      twitter: this.generateTwitterCards(technique, baseUrl, authorInfo),
      
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      
      other: {
        'article:author': authorInfo.name,
        'article:publisher': config.organizationInfo.name,
        'article:section': 'Techniques de négociation',
        'article:tag': keywords.slice(0, 5).join(','),
        'preload': `${canonicalUrl} as document`,
      },
    };
  }

  /**
   * Génère le titre SEO optimisé
   */
  private static generateTitle(technique: NegotiationTechnique): string {
    const baseTitle = `${technique.title} | Technique ${technique.author} | Laurent Serre`;
    
    if (baseTitle.length <= this.MAX_TITLE_LENGTH) {
      return baseTitle;
    }
    
    // Version courte si trop long
    const shortTitle = `${technique.title} | ${technique.author} | Laurent Serre`;
    if (shortTitle.length <= this.MAX_TITLE_LENGTH) {
      return shortTitle;
    }
    
    // Version très courte si encore trop long
    const veryShortTitle = `${technique.title} | Laurent Serre`;
    if (veryShortTitle.length <= this.MAX_TITLE_LENGTH) {
      return veryShortTitle;
    }
    
    // Tronquer si nécessaire
    return `${technique.title.substring(0, this.MAX_TITLE_LENGTH - 15)} | Laurent Serre`;
  }

  /**
   * Génère la description SEO optimisée
   */
  private static generateDescription(technique: NegotiationTechnique): string {
    const successMetric = technique.successMetrics[0];
    const successText = successMetric ? ` ${successMetric.value} de réussite mesurée.` : '';
    
    const baseDescription = `Maîtrisez ${technique.title} de ${technique.author}. Guide complet avec cas PME, scripts et conseils terrain de Laurent Serre.${successText}`;
    
    if (baseDescription.length <= this.MAX_DESCRIPTION_LENGTH) {
      return baseDescription;
    }
    
    // Version courte
    return `${technique.title} de ${technique.author}. Guide pratique avec cas PME et conseils Laurent Serre.${successText}`.substring(0, this.MAX_DESCRIPTION_LENGTH - 3) + '...';
  }

  /**
   * Génère les mots-clés SEO spécifiques à la technique
   */
  private static generateKeywords(technique: NegotiationTechnique): string[] {
    const baseKeywords = [
      technique.title.toLowerCase(),
      technique.author.toLowerCase(),
      'négociation commerciale',
      'laurent serre expert',
      'formation négociation',
      'technique négociation pme',
      'closing commercial b2b'
    ];
    
    // Ajouter des mots-clés spécifiques selon la catégorie
    const categoryKeywords = this.getCategoryKeywords(technique.category);
    
    // Ajouter des mots-clés spécifiques à la technique
    const specificKeywords = this.getSpecificKeywords(technique.id);
    
    const allKeywords = [...baseKeywords, ...categoryKeywords, ...specificKeywords];
    
    // Retourner les premiers mots-clés uniques
    return [...new Set(allKeywords)].slice(0, this.MAX_KEYWORDS);
  }

  /**
   * Génère les mots-clés par catégorie
   */
  private static getCategoryKeywords(category: string): string[] {
    const categoryMap: Record<string, string[]> = {
      'psychology': ['psychologie vente', 'influence commerciale', 'empathie tactique'],
      'closing': ['closing technique', 'conclure vente', 'signature contrat'],
      'preparation': ['préparation négociation', 'stratégie commerciale', 'méthode harvard'],
      'objection-handling': ['traiter objections', 'réponse objection', 'objection prix']
    };
    
    return categoryMap[category] || [];
  }

  /**
   * Génère les mots-clés spécifiques par technique
   */
  private static getSpecificKeywords(techniqueId: string): string[] {
    const specificMap: Record<string, string[]> = {
      'effet-miroir': ['chris voss fbi', 'empathie tactique', 'écoute active'],
      'silence-strategique': ['silence négociation', 'pause stratégique', 'tension commerciale'],
      'negociation-raisonnee': ['négociation raisonnée', 'harvard business', 'batna', 'gagnant gagnant'],
      'ancrage-tactique': ['ancrage prix', 'kahneman', 'biais cognitifs', 'influence cognitive'],
      'oui-progressif': ['oui progressif', 'cialdini', 'engagement cohérence', 'micro engagements'],
      'recadrage-valeur': ['recadrage objection', 'transformation objection', 'valeur perçue'],
      'concession-calculee': ['concession stratégique', 'échange valeur', 'négociation win win']
    };
    
    return specificMap[techniqueId] || [];
  }

  /**
   * Génère les métadonnées Open Graph
   */
  private static generateOpenGraph(technique: NegotiationTechnique, baseUrl: string, authorInfo: SEOConfig['authorInfo']): Metadata['openGraph'] {
    const url = `${baseUrl}/ressources/techniques-de-negociation/${technique.slug}`;
    const imageUrl = `${baseUrl}/images/og-${technique.slug}.jpg`;
    
    return {
      title: this.generateTitle(technique),
      description: this.generateDescription(technique),
      type: 'article',
      locale: 'fr_FR',
      url,
      siteName: 'Laurent Serre Développement',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${technique.title} - Guide complet par Laurent Serre`,
          type: 'image/jpeg',
        },
      ],
      authors: [authorInfo.name],
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      section: 'Techniques de négociation',
      tags: this.generateKeywords(technique).slice(0, 5),
    };
  }

  /**
   * Génère les métadonnées Twitter Cards
   */
  private static generateTwitterCards(technique: NegotiationTechnique, baseUrl: string, authorInfo: SEOConfig['authorInfo']): Metadata['twitter'] {
    const imageUrl = `${baseUrl}/images/og-${technique.slug}.jpg`;
    
    return {
      card: 'summary_large_image',
      title: this.generateTitle(technique),
      description: this.generateDescription(technique),
      images: [imageUrl],
      creator: '@laurentserre',
      site: '@laurentserre',
    };
  }

  /**
   * Génère les données structurées Schema.org
   */
  static generateStructuredData(config: StructuredDataConfig): object {
    const { technique, baseUrl, authorInfo, organizationInfo } = config;
    const url = `${baseUrl}/ressources/techniques-de-negociation/${technique.slug}`;
    
    return {
      "@context": "https://schema.org",
      "@graph": [
        this.generateArticleSchema(technique, url, authorInfo, organizationInfo),
        this.generateHowToSchema(technique, url, authorInfo),
        this.generateFAQSchema(technique, url),
        this.generateBreadcrumbSchema(technique, baseUrl),
        this.generateCourseSchema(technique, url, authorInfo, organizationInfo)
      ]
    };
  }

  /**
   * Génère le schéma Article
   */
  private static generateArticleSchema(technique: NegotiationTechnique, url: string, authorInfo: SEOConfig['authorInfo'], organizationInfo: SEOConfig['organizationInfo']): object {
    return {
      "@type": "Article",
      "@id": `${url}#article`,
      "headline": technique.title,
      "description": technique.description,
      "image": `${url.split('/').slice(0, 3).join('/')}/images/og-${technique.slug}.jpg`,
      "author": {
        "@type": "Person",
        "name": authorInfo.name,
        "url": authorInfo.url,
        "image": authorInfo.image,
        "description": authorInfo.description,
        "sameAs": [
          "https://www.linkedin.com/in/laurent-serre-developpement/",
          "https://twitter.com/laurentserre"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": organizationInfo.name,
        "url": organizationInfo.url,
        "logo": {
          "@type": "ImageObject",
          "url": organizationInfo.logo
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "articleSection": "Techniques de négociation",
      "keywords": this.generateKeywords(technique).join(', '),
      "wordCount": this.estimateWordCount(technique),
      "timeRequired": this.estimateReadingTime(technique),
      "audience": {
        "@type": "Audience",
        "audienceType": "Dirigeants PME, Commerciaux, Entrepreneurs"
      }
    };
  }

  /**
   * Génère le schéma HowTo
   */
  private static generateHowToSchema(technique: NegotiationTechnique, url: string, authorInfo: SEOConfig['authorInfo']): object {
    return {
      "@type": "HowTo",
      "@id": `${url}#howto`,
      "name": `Comment appliquer ${technique.title}`,
      "description": `Guide étape par étape pour maîtriser ${technique.title} en négociation commerciale`,
      "image": `${url.split('/').slice(0, 3).join('/')}/images/og-${technique.slug}.jpg`,
      "author": {
        "@type": "Person",
        "name": authorInfo.name,
        "url": authorInfo.url
      },
      "totalTime": this.estimateImplementationTime(technique),
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "EUR",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Guide pratique téléchargeable"
        },
        {
          "@type": "HowToSupply", 
          "name": "Scripts de négociation"
        }
      ],
      "step": technique.stepByStepGuide.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.title,
        "text": step.description,
        "image": `${url.split('/').slice(0, 3).join('/')}/images/step-${technique.slug}-${step.step}.jpg`
      }))
    };
  }

  /**
   * Génère le schéma FAQ
   */
  private static generateFAQSchema(technique: NegotiationTechnique, url: string): object {
    const faqs = [
      {
        question: `Qu'est-ce que ${technique.title} ?`,
        answer: technique.description
      },
      {
        question: `Comment appliquer ${technique.title} en PME ?`,
        answer: technique.pmeAdaptation
      },
      {
        question: `Quels sont les résultats de ${technique.title} ?`,
        answer: technique.successMetrics.map(m => `${m.metric}: ${m.value} ${m.context}`).join('. ')
      },
      {
        question: `Quelles sont les erreurs à éviter avec ${technique.title} ?`,
        answer: technique.commonMistakes.slice(0, 2).map(m => m.mistake).join('. ')
      }
    ];

    return {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  /**
   * Génère le schéma Breadcrumb
   */
  private static generateBreadcrumbSchema(technique: NegotiationTechnique, baseUrl: string): object {
    return {
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/ressources/techniques-de-negociation/${technique.slug}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Ressources",
          "item": `${baseUrl}/ressources`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Techniques de négociation",
          "item": `${baseUrl}/ressources/techniques-de-negociation`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": technique.title,
          "item": `${baseUrl}/ressources/techniques-de-negociation/${technique.slug}`
        }
      ]
    };
  }

  /**
   * Génère le schéma Course
   */
  private static generateCourseSchema(technique: NegotiationTechnique, url: string, authorInfo: SEOConfig['authorInfo'], organizationInfo: SEOConfig['organizationInfo']): object {
    return {
      "@type": "Course",
      "@id": `${url}#course`,
      "name": `Formation ${technique.title}`,
      "description": `Apprenez à maîtriser ${technique.title} avec Laurent Serre`,
      "provider": {
        "@type": "Organization",
        "name": organizationInfo.name,
        "url": organizationInfo.url
      },
      "instructor": {
        "@type": "Person",
        "name": authorInfo.name,
        "url": authorInfo.url,
        "image": authorInfo.image
      },
      "courseCode": technique.id.toUpperCase(),
      "educationalLevel": this.mapDifficultyToEducationalLevel(technique.difficultyLevel),
      "teaches": technique.businessApplications.join(', '),
      "timeRequired": this.estimateImplementationTime(technique),
      "coursePrerequisites": "Expérience en vente ou négociation commerciale recommandée",
      "educationalCredentialAwarded": "Certificat de maîtrise de la technique",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": this.estimateImplementationTime(technique),
        "instructor": {
          "@type": "Person",
          "name": authorInfo.name
        }
      }
    };
  }

  /**
   * Utilitaires pour les estimations
   */
  private static estimateWordCount(technique: NegotiationTechnique): number {
    const content = [
      technique.description,
      technique.laurentVision,
      technique.pmeAdaptation,
      ...technique.stepByStepGuide.map(s => s.description + s.script + s.example),
      ...technique.caseStudies.map(c => c.challenge + c.application + c.results),
      ...technique.commonMistakes.map(m => m.mistake + m.consequence + m.solution)
    ].join(' ');
    
    return content.split(' ').length;
  }

  private static estimateReadingTime(technique: NegotiationTechnique): string {
    const wordCount = this.estimateWordCount(technique);
    const readingTimeMinutes = Math.ceil(wordCount / 200); // 200 mots par minute
    return `PT${readingTimeMinutes}M`;
  }

  private static estimateImplementationTime(technique: NegotiationTechnique): string {
    const steps = technique.stepByStepGuide.length;
    const implementationHours = Math.max(2, steps * 0.5); // Minimum 2h, 30min par étape
    return `PT${implementationHours}H`;
  }

  private static mapDifficultyToEducationalLevel(difficulty: string): string {
    const levelMap: Record<string, string> = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };
    
    return levelMap[difficulty] || 'Intermediate';
  }

  /**
   * Valide la configuration SEO
   */
  static validateSEOConfig(config: SEOConfig): boolean {
    const requiredFields = ['technique', 'baseUrl', 'authorInfo', 'organizationInfo'];
    
    for (const field of requiredFields) {
      if (!(field in config)) {
        console.error(`SEO validation failed: missing field "${field}"`);
        return false;
      }
    }
    
    // Valider les URLs
    try {
      new URL(config.baseUrl);
      new URL(config.authorInfo.url);
      new URL(config.organizationInfo.url);
    } catch (error) {
      console.error('SEO validation failed: invalid URL format');
      return false;
    }
    
    return true;
  }

  /**
   * Génère un sitemap entry pour une technique
   */
  static generateSitemapEntry(technique: NegotiationTechnique, baseUrl: string): object {
    return {
      url: `${baseUrl}/ressources/techniques-de-negociation/${technique.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  }
}