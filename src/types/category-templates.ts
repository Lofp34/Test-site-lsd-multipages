// Types pour les templates de catégories et livres optimisés
import { Book } from '@/data/books-enriched';

// Thème visuel par catégorie
export interface CategoryTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  particleColor: string;
  gradientFrom: string;
  gradientTo: string;
  gradientVia: string;
  icon: string;
  name: string;
}

// Insight spécialisé par domaine
export interface DomainInsight {
  title: string;
  description: string;
  businessImpact: string;
  implementationLevel: 'Débutant' | 'Intermédiaire' | 'Avancé';
  technologies?: string[];
  trend?: 'rising' | 'stable' | 'declining';
  metrics?: {
    label: string;
    value: string;
  }[];
}

// Cas client PME structuré
export interface PMECaseStudy {
  industry: string;
  companySize: string;
  sector: string;
  challenge: string;
  solutionApplied: string;
  results: string;
  metrics: {
    [key: string]: string;
  };
  timeline: string;
  businessImpact: string;
  laurentQuote?: string;
  icon: string;
  themeColor: string;
}

// Phase d'implémentation progressive
export interface ImplementationPhase {
  phase: number;
  title: string;
  duration: string;
  description: string;
  keyActions: string[];
  expectedResults: string[];
  laurentTip: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  prerequisites?: string[];
}

// Statistiques de catégorie
export interface CategoryStats {
  value: string;
  label: string;
  description?: string;
}

// Suggestion cross-catégorie
export interface CategorySuggestion {
  slug: string;
  title: string;
  description: string;
  icon: string;
  relationshipType: 'complementary' | 'prerequisite' | 'advanced';
  suggestedBooks?: string[]; // slugs des livres recommandés
}

// Contenu complet d'une catégorie
export interface CategoryContent {
  // Vision Laurent Serre spécifique au domaine
  laurentVision: string;
  
  // Insights spécialisés (4 par catégorie)
  insights: DomainInsight[];
  
  // Cas clients PME (4 par catégorie)
  caseStudies: PMECaseStudy[];
  
  // Feuille de route d'implémentation (4 phases)
  roadmap: ImplementationPhase[];
  
  // Statistiques de performance
  stats: CategoryStats[];
  
  // Suggestions cross-catégories
  crossCategorySuggestions: CategorySuggestion[];
  
  // Message spécifique au domaine
  domainMessage: {
    title: string;
    description: string;
    icon: string;
  };
}

// Props pour le template CategoryPage
export interface CategoryPageProps {
  category: {
    slug: string;
    title: string;
    description: string;
    icon: string;
    books: Book[];
    seoKeywords?: string[];
  };
  theme: CategoryTheme;
  content: CategoryContent;
}

// Contenu détaillé d'un livre individuel
export interface BookContent {
  detailedSummary: string;
  keyTakeaways: string[];
  laurentRecommendations: string[];
  pmeUseCase: PMEUseCase;
  applicationTips: string[];
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  readingTime: string;
  targetProfiles: string[];
  complementaryBooks: string[];
}

// Cas d'usage PME pour un livre spécifique
export interface PMEUseCase {
  title: string;
  context: string;
  application: string;
  results: string;
  laurentComment: string;
  industry: string;
  companySize: string;
}

// Props pour le template BookPage
export interface BookPageProps {
  book: Book & {
    content: BookContent;
  };
  category: {
    slug: string;
    title: string;
    theme: CategoryTheme;
  };
  relatedBooks: Book[];
  crossCategorySuggestions: CategorySuggestion[];
}

// Métadonnées SEO pour les pages
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  twitter: {
    title: string;
    description: string;
    image: string;
  };
  canonical: string;
  structuredData: any;
}

// Configuration des thèmes par catégorie
export const categoryThemes: Record<string, CategoryTheme> = {
  'negociation-closing': {
    primaryColor: '#EF4444',
    secondaryColor: '#F97316',
    accentColor: '#FEF3C7',
    particleColor: '#EF4444',
    gradientFrom: 'from-red-600',
    gradientTo: 'to-primary-bg',
    gradientVia: 'via-orange-500/10',
    icon: '🤝',
    name: 'Négociation & Closing'
  },
  'psychologie-influence': {
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    accentColor: '#F3E8FF',
    particleColor: '#8B5CF6',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-primary-bg',
    gradientVia: 'via-pink-500/10',
    icon: '🧠',
    name: 'Psychologie & Influence'
  },
  'methodes-process': {
    primaryColor: '#3B82F6',
    secondaryColor: '#06B6D4',
    accentColor: '#DBEAFE',
    particleColor: '#3B82F6',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-primary-bg',
    gradientVia: 'via-cyan-500/10',
    icon: '🛠️',
    name: 'Méthodes & Process'
  },
  'enterprise-account': {
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    accentColor: '#D1FAE5',
    particleColor: '#10B981',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-primary-bg',
    gradientVia: 'via-green-500/10',
    icon: '🏢',
    name: 'Enterprise Account'
  },
  'sales-management': {
    primaryColor: '#4F46E5',
    secondaryColor: '#3B82F6',
    accentColor: '#E0E7FF',
    particleColor: '#4F46E5',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-primary-bg',
    gradientVia: 'via-blue-500/10',
    icon: '👥',
    name: 'Sales Management'
  },
  'mindset-performance': {
    primaryColor: '#F59E0B',
    secondaryColor: '#EF4444',
    accentColor: '#FEF3C7',
    particleColor: '#F59E0B',
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-primary-bg',
    gradientVia: 'via-red-500/10',
    icon: '🎯',
    name: 'Mindset & Performance'
  },
  'digital-ai': {
    primaryColor: '#00BDA4',
    secondaryColor: '#06B6D4',
    accentColor: '#CCFBF1',
    particleColor: '#00BDA4',
    gradientFrom: 'from-blue-ink',
    gradientTo: 'to-primary-bg',
    gradientVia: 'via-cyan-500/10',
    icon: '🤖',
    name: 'Digital & AI Sales'
  },
  'prospection-sdr': {
    primaryColor: '#7C3AED',
    secondaryColor: '#A855F7',
    accentColor: '#F3E8FF',
    particleColor: '#7C3AED',
    gradientFrom: 'from-violet-600',
    gradientTo: 'to-primary-bg',
    gradientVia: 'via-purple-500/10',
    icon: '🎯',
    name: 'Prospection SDR'
  }
};

// Fonction utilitaire pour obtenir le thème d'une catégorie
export function getCategoryTheme(categorySlug: string): CategoryTheme {
  return categoryThemes[categorySlug] || categoryThemes['digital-ai'];
}

// Fonction pour générer les métadonnées SEO
export function generateCategoryMetadata(
  category: CategoryPageProps['category'],
  theme: CategoryTheme
): SEOMetadata {
  const baseUrl = 'https://www.laurentserre.com';
  const pageUrl = `${baseUrl}/ressources/meilleurs-livres/${category.slug}`;
  
  return {
    title: `${theme.name} | Meilleurs Livres | Laurent Serre`,
    description: `Les meilleurs livres sur ${theme.name.toLowerCase()}. ${category.books.map(b => b.title).join(', ')}. Résumés détaillés et conseils terrain de Laurent Serre.`,
    keywords: [
      ...(category.seoKeywords || []),
      'laurent serre',
      'meilleurs livres',
      'développement commercial',
      'formation vente'
    ],
    openGraph: {
      title: `${theme.name} | Meilleurs Livres | Laurent Serre`,
      description: category.description || `Découvrez les meilleurs livres sur ${theme.name.toLowerCase()} sélectionnés par Laurent Serre.`,
      image: `${baseUrl}/images/og-${category.slug}.jpg`,
      url: pageUrl
    },
    twitter: {
      title: `${theme.name} | Meilleurs Livres | Laurent Serre`,
      description: category.description || `Les meilleurs livres sur ${theme.name.toLowerCase()} par Laurent Serre.`,
      image: `${baseUrl}/images/og-${category.slug}.jpg`
    },
    canonical: pageUrl,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `${theme.name} - Meilleurs Livres`,
      "description": category.description,
      "url": pageUrl,
      "mainEntity": {
        "@type": "ItemList",
        "name": `Meilleurs livres ${theme.name}`,
        "numberOfItems": category.books.length,
        "itemListElement": category.books.map((book, index) => ({
          "@type": "Book",
          "position": index + 1,
          "name": book.title,
          "author": book.author,
          "url": `${pageUrl}/${book.slug}`
        }))
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
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
            "name": "Meilleurs Livres",
            "item": `${baseUrl}/ressources/meilleurs-livres`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": theme.name
          }
        ]
      }
    }
  };
}