import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SEOGenerator } from '../seo-generator';
import { NegotiationTechnique } from '@/types/negotiation-technique';

// Mock technique data pour les tests SEO
const mockTechnique: NegotiationTechnique = {
  id: 'effet-miroir',
  slug: 'effet-miroir',
  title: 'L\'effet miroir',
  author: 'Chris Voss',
  origin: 'FBI - Négociation d\'otages',
  category: 'psychology',
  difficultyLevel: 'intermediate',
  description: 'Technique d\'empathie tactique pour créer une connexion instantanée avec l\'interlocuteur.',
  psychologyPrinciples: ['Réciprocité conversationnelle'],
  businessApplications: ['Découverte des besoins clients'],
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
      tips: ['Attendez 2-3 secondes']
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
  trackingEvents: []
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

describe('SEO Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Metadata Generation Integration', () => {
    it('should generate complete metadata for all technique categories', () => {
      const categories = ['psychology', 'closing', 'preparation', 'objection-handling'];
      
      categories.forEach(category => {
        const techniqueWithCategory = {
          ...mockTechnique,
          category: category as any,
          id: `test-${category}`
        };
        
        const config = { ...mockSEOConfig, technique: techniqueWithCategory };
        const metadata = SEOGenerator.generateMetadata(config);
        
        expect(metadata.title).toBeDefined();
        expect(metadata.description).toBeDefined();
        expect(metadata.keywords).toContain(category === 'psychology' ? 'psychologie vente' : 'négociation commerciale');
        expect(metadata.openGraph).toBeDefined();
        expect(metadata.twitter).toBeDefined();
      });
    });

    it('should generate consistent URLs across metadata fields', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      const expectedUrl = 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir';
      
      expect(metadata.alternates?.canonical).toBe(expectedUrl);
      expect(metadata.openGraph?.url).toBe(expectedUrl);
      
      // Vérifier que l'image OG utilise la même base URL
      const ogImage = metadata.openGraph?.images?.[0];
      expect(ogImage?.url).toBe('https://laurent-serre-developpement.fr/images/og-effet-miroir.jpg');
    });

    it('should include success metrics in description when available', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      expect(metadata.description).toContain('78% de réussite mesurée');
    });

    it('should handle techniques without success metrics', () => {
      const techniqueWithoutMetrics = {
        ...mockTechnique,
        successMetrics: []
      };
      
      const config = { ...mockSEOConfig, technique: techniqueWithoutMetrics };
      const metadata = SEOGenerator.generateMetadata(config);
      
      expect(metadata.description).toBeDefined();
      expect(metadata.description).not.toContain('% de réussite');
    });
  });

  describe('Structured Data Integration', () => {
    it('should generate valid Schema.org structured data', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      
      expect(structuredData).toHaveProperty('@context', 'https://schema.org');
      expect(structuredData).toHaveProperty('@graph');
      
      const graph = (structuredData as any)['@graph'];
      expect(Array.isArray(graph)).toBe(true);
      expect(graph).toHaveLength(5); // Article, HowTo, FAQ, Breadcrumb, Course
    });

    it('should include all required schema types', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      const graph = (structuredData as any)['@graph'];
      
      const schemaTypes = graph.map((item: any) => item['@type']);
      expect(schemaTypes).toContain('Article');
      expect(schemaTypes).toContain('HowTo');
      expect(schemaTypes).toContain('FAQPage');
      expect(schemaTypes).toContain('BreadcrumbList');
      expect(schemaTypes).toContain('Course');
    });

    it('should link schemas with consistent URLs', () => {
      const structuredData = SEOGenerator.generateStructuredData(mockSEOConfig);
      const graph = (structuredData as any)['@graph'];
      const baseUrl = 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir';
      
      // Vérifier que tous les schémas utilisent des URLs cohérentes
      graph.forEach((schema: any) => {
        if (schema['@id']) {
          expect(schema['@id']).toContain(baseUrl);
        }
      });
    });
  });

  describe('Mobile-First and Accessibility Compliance', () => {
    it('should generate mobile-optimized metadata', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      // Vérifier les métadonnées viewport (implicites dans Next.js)
      expect(metadata.robots?.googleBot?.['max-image-preview']).toBe('large');
      expect(metadata.robots?.googleBot?.['max-video-preview']).toBe(-1);
    });

    it('should include accessibility-friendly image alt texts', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      const ogImage = metadata.openGraph?.images?.[0];
      expect(ogImage?.alt).toBe('L\'effet miroir - Guide complet par Laurent Serre');
      expect(ogImage?.alt).not.toContain('image'); // Éviter les alt texts redondants
    });
  });

  describe('Social Media Integration', () => {
    it('should generate valid Open Graph metadata', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      const og = metadata.openGraph;
      
      expect(og?.type).toBe('article');
      expect(og?.locale).toBe('fr_FR');
      expect(og?.siteName).toBe('Laurent Serre Développement');
      expect(og?.images).toHaveLength(1);
      
      const image = og?.images?.[0];
      expect(image?.width).toBe(1200);
      expect(image?.height).toBe(630);
      expect(image?.type).toBe('image/jpeg');
    });

    it('should generate valid Twitter Cards metadata', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      const twitter = metadata.twitter;
      
      expect(twitter?.card).toBe('summary_large_image');
      expect(twitter?.creator).toBe('@laurentserre');
      expect(twitter?.site).toBe('@laurentserre');
      expect(twitter?.images).toHaveLength(1);
    });
  });

  describe('Performance and Indexing', () => {
    it('should generate robots directives for optimal crawling', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      expect(metadata.robots?.index).toBe(true);
      expect(metadata.robots?.follow).toBe(true);
      expect(metadata.robots?.googleBot?.index).toBe(true);
      expect(metadata.robots?.googleBot?.follow).toBe(true);
    });

    it('should include canonical URLs to prevent duplicate content', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      expect(metadata.alternates?.canonical).toBeDefined();
      expect(metadata.alternates?.canonical).toMatch(/^https:\/\//);
      expect(metadata.alternates?.canonical).not.toContain('?'); // Pas de paramètres
    });
  });

  describe('Error Handling and Validation', () => {
    it('should handle missing optional fields gracefully', () => {
      const minimalTechnique = {
        ...mockTechnique,
        successMetrics: [],
        stepByStepGuide: [],
        caseStudies: [],
        commonMistakes: []
      };
      
      const config = { ...mockSEOConfig, technique: minimalTechnique };
      
      expect(() => {
        const metadata = SEOGenerator.generateMetadata(config);
        const structuredData = SEOGenerator.generateStructuredData(config);
        
        expect(metadata).toBeDefined();
        expect(structuredData).toBeDefined();
      }).not.toThrow();
    });

    it('should validate generated URLs', () => {
      const metadata = SEOGenerator.generateMetadata(mockSEOConfig);
      
      const urls = [
        metadata.alternates?.canonical,
        metadata.openGraph?.url,
        metadata.openGraph?.images?.[0]?.url
      ].filter(Boolean);
      
      urls.forEach(url => {
        expect(() => new URL(url!)).not.toThrow();
        expect(url).toMatch(/^https:\/\//);
      });
    });
  });
});