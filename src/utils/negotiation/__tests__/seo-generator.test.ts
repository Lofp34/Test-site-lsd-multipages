import { describe, it, expect } from 'vitest';
import { SEOGenerator } from '../seo-generator';
import { NegotiationTechnique } from '@/types/negotiation-technique';

// Mock technique data for testing
const mockTechnique: NegotiationTechnique = {
  id: 'effet-miroir',
  slug: 'effet-miroir',
  title: 'L\'effet miroir',
  author: 'Chris Voss',
  origin: 'FBI - Négociation d\'otages',
  category: 'psychology',
  difficultyLevel: 'intermediate',
  description: 'Technique d\'empathie tactique pour créer une connexion instantanée avec l\'interlocuteur.',
  psychologyPrinciples: ['Réciprocité conversationnelle', 'Activation du système de récompense'],
  businessApplications: ['Découverte des besoins clients', 'Gestion des objections'],
  laurentVision: 'En 20 ans de négociations PME, l\'effet miroir est l\'outil le plus puissant.',
  pmeAdaptation: 'Dans le contexte PME français, l\'effet miroir doit être appliqué avec subtilité.',
  successMetrics: [
    {
      metric: 'Découverte d\'informations cachées',
      value: '78%',
      context: 'Des négociations révèlent de nouveaux éléments'
    }
  ],
  stepByStepGuide: [
    {
      step: 1,
      title: 'Écoute active',
      description: 'Identifiez le moment précis où votre interlocuteur exprime une émotion.',
      script: 'Client: "C\'est trop cher." Vous: "Trop cher ?"',
      example: 'Au lieu de justifier, vous reflétez l\'émotion.',
      tips: ['Attendez 2-3 secondes', 'Répétez les mots chargés émotionnellement']
    }
  ],
  caseStudies: [
    {
      industry: 'PME Services',
      challenge: 'Négociation logiciel 25K€',
      application: 'Effet miroir sur objection budget',
      results: 'Signature à 23K€ avec formation incluse',
      metrics: {
        finalPrice: '23K€',
        clientSatisfaction: '9.2/10'
      }
    }
  ],
  commonMistakes: [
    {
      mistake: 'Répéter mécaniquement sans empathie',
      consequence: 'Vous paraissez robotique et agaçant',
      solution: 'Un seul miroir par idée, avec empathie'
    }
  ],
  relatedTechniques: ['silence-strategique'],
  downloadableResources: [
    {
      title: 'Guide de l\'effet miroir',
      type: 'PDF',
      url: '/ressources/downloads/guide-effet-miroir.pdf'
    }
  ],
  seoMetadata: {
    title: 'L\'effet miroir | Technique FBI Chris Voss | Laurent Serre',
    description: 'Maîtrisez l\'effet miroir de Chris Voss pour vos négociations PME.',
    keywords: ['effet miroir', 'chris voss', 'négociation'],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir'
  },
  trackingEvents: [
    {
      event: 'technique_page_view',
      category: 'Negotiation',
      action: 'View Effet Miroir'
    }
  ]
};

const mockSEOConfig = {
  technique: mockTechnique,
  baseUrl: 'https://laurent-serre-developpement.fr',
  authorInfo: {
    name: 'Laurent Serre',
    url: 'https://laurent-serre-developpement.fr/a-propos',
    image: 'https://laurent-serre-developpement.fr/images/laurent-serre.jpg',
    description: 'Expert en développement commercial PME'
  },
  organizationInfo: {
    name: 'Laurent Serre Développement',
    url: 'https://laurent-serre-developpement.fr',
    logo: 'https://laurent-serre-developpement.fr/images/logo.png',
    description: 'Formation et coaching commercial pour PME'
  }
};

describe('SEO Generator', () => {
  describe('generateMetadata', () => {
    it('should generate complete metadata', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      expect(metadata.title).toBe('L\'effet miroir | Technique Chris Voss | Laurent Serre');
      expect(metadata.description).toContain('Maîtrisez L\'effet miroir de Chris Voss');
      expect(metadata.keywords).toContain('effet miroir');
      expect(metadata.authors).toEqual([{ name: 'Laurent Serre', url: 'https://laurent-serre-developpement.fr/a-propos' }]);
    });

    it('should generate canonical URL', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      expect(metadata.alternates?.canonical).toBe(
        'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir'
      );
    });

    it('should include success metrics in description when available', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      expect(metadata.description).toContain('78% de réussite mesurée');
    });

    it('should handle long titles by truncating', () => {
      const longTitleTechnique = {
        ...mockTechnique,
        title: 'Une technique de négociation extrêmement longue qui dépasse vraiment la limite de caractères autorisés',
        author: 'Un auteur avec un nom très très long qui dépasse aussi'
      };
      
      const config = { ...mockSEOConfig, technique: longTitleTechnique };
      const metadata = SEOGenerator.generateMetadata(config);
      
      expect(metadata.title!.length).toBeLessThanOrEqual(70); // More realistic limit
    });
  });

  describe('generateStructuredData', () => {
    it('should generate complete structured data', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      
      expect(structuredData).toHaveProperty('@context', 'https://schema.org');
      expect(structuredData).toHaveProperty('@graph');
      
      const graph = (structuredData as any)['@graph'];
      expect(graph).toHaveLength(5); // Article, HowTo, FAQ, Breadcrumb, Course
    });

    it('should include Article schema', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      const graph = (structuredData as any)['@graph'];
      
      const articleSchema = graph.find((item: any) => item['@type'] === 'Article');
      expect(articleSchema).toBeDefined();
      expect(articleSchema.headline).toBe('L\'effet miroir');
      expect(articleSchema.author.name).toBe('Laurent Serre');
    });

    it('should include HowTo schema with steps', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      const graph = (structuredData as any)['@graph'];
      
      const howToSchema = graph.find((item: any) => item['@type'] === 'HowTo');
      expect(howToSchema).toBeDefined();
      expect(howToSchema.step).toHaveLength(1);
      expect(howToSchema.step[0].name).toBe('Écoute active');
    });

    it('should include FAQ schema', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      const graph = (structuredData as any)['@graph'];
      
      const faqSchema = graph.find((item: any) => item['@type'] === 'FAQPage');
      expect(faqSchema).toBeDefined();
      expect(faqSchema.mainEntity).toHaveLength(4);
    });

    it('should include Breadcrumb schema', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      const graph = (structuredData as any)['@graph'];
      
      const breadcrumbSchema = graph.find((item: any) => item['@type'] === 'BreadcrumbList');
      expect(breadcrumbSchema).toBeDefined();
      expect(breadcrumbSchema.itemListElement).toHaveLength(4);
    });

    it('should include Course schema', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      const graph = (structuredData as any)['@graph'];
      
      const courseSchema = graph.find((item: any) => item['@type'] === 'Course');
      expect(courseSchema).toBeDefined();
      expect(courseSchema.name).toBe('Formation L\'effet miroir');
      expect(courseSchema.instructor.name).toBe('Laurent Serre');
    });
  });

  describe('OpenGraph generation', () => {
    it('should generate OpenGraph metadata', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph!.title).toBe('L\'effet miroir | Technique Chris Voss | Laurent Serre');
      expect(metadata.openGraph!.type).toBe('article');
      expect(metadata.openGraph!.locale).toBe('fr_FR');
      expect(metadata.openGraph!.url).toBe(
        'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir'
      );
    });

    it('should include OpenGraph images', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      expect(metadata.openGraph!.images).toHaveLength(1);
      expect(metadata.openGraph!.images![0]).toMatchObject({
        url: 'https://laurent-serre-developpement.fr/images/og-effet-miroir.jpg',
        width: 1200,
        height: 630,
        alt: 'L\'effet miroir - Guide complet par Laurent Serre'
      });
    });
  });

  describe('Twitter Cards generation', () => {
    it('should generate Twitter Cards metadata', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter!.card).toBe('summary_large_image');
      expect(metadata.twitter!.title).toBe('L\'effet miroir | Technique Chris Voss | Laurent Serre');
      expect(metadata.twitter!.creator).toBe('@laurentserre');
    });
  });

  describe('Keywords generation', () => {
    it('should generate relevant keywords', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      const keywords = metadata.keywords as string;
      
      expect(keywords).toContain('effet miroir');
      expect(keywords).toContain('chris voss');
      expect(keywords).toContain('négociation commerciale');
      expect(keywords).toContain('laurent serre expert');
    });

    it('should include category-specific keywords', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      const keywords = metadata.keywords as string;
      
      // Psychology category keywords
      expect(keywords).toContain('psychologie vente');
    });

    it('should include technique-specific keywords', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      const keywords = metadata.keywords as string;
      
      expect(keywords).toContain('empathie tactique');
      expect(keywords).toContain('l\'effet miroir');
    });

    it('should limit keywords to maximum count', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      const keywords = (metadata.keywords as string).split(', ');
      
      expect(keywords.length).toBeLessThanOrEqual(10);
    });
  });

  describe('Validation', () => {
    it('should validate correct SEO config', () => {
      const isValid = SEOGenerator.validateSEOConfig(mockSEOConfig);
      expect(isValid).toBe(true);
    });

    it('should reject config with missing fields', () => {
      const invalidConfig = {
        technique: mockTechnique,
        baseUrl: 'https://example.com'
        // Missing authorInfo and organizationInfo
      } as any;
      
      const isValid = SEOGenerator.validateSEOConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject config with invalid URLs', () => {
      const invalidConfig = {
        ...mockSEOConfig,
        baseUrl: 'not-a-valid-url'
      };
      
      const isValid = SEOGenerator.validateSEOConfig(invalidConfig);
      expect(isValid).toBe(false);
    });
  });

  describe('Sitemap generation', () => {
    it('should generate sitemap entry', () => {
      const sitemapEntry = SEOGenerator.generateSitemapEntry(
        mockTechnique,
        'https://laurent-serre-developpement.fr'
      );
      
      expect(sitemapEntry).toMatchObject({
        url: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir',
        changeFrequency: 'monthly',
        priority: 0.8
      });
      expect(sitemapEntry).toHaveProperty('lastModified');
    });
  });

  describe('Utility functions', () => {
    it('should estimate word count correctly', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      const graph = (structuredData as any)['@graph'];
      const articleSchema = graph.find((item: any) => item['@type'] === 'Article');
      
      expect(articleSchema.wordCount).toBeGreaterThan(0);
      expect(typeof articleSchema.wordCount).toBe('number');
    });

    it('should estimate reading time in ISO format', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      const graph = (structuredData as any)['@graph'];
      const articleSchema = graph.find((item: any) => item['@type'] === 'Article');
      
      expect(articleSchema.timeRequired).toMatch(/^PT\d+M$/);
    });

    it('should estimate implementation time in ISO format', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      const graph = (structuredData as any)['@graph'];
      const howToSchema = graph.find((item: any) => item['@type'] === 'HowTo');
      
      expect(howToSchema.totalTime).toMatch(/^PT\d+H$/);
    });
  });
});