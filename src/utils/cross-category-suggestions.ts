import { Book } from '@/data/books-enriched';
import { digitalAISalesCategory, salesManagementCategory, mindsetPerformanceCategory } from '@/data/books-enriched';

// Type pour les suggestions cross-catégories
export interface CrossCategorySuggestion {
  book: Book;
  category: string;
  categoryTitle: string;
  reason: string;
}

// Mapping des catégories disponibles
const categoryMap = {
  'digital-ai': {
    data: digitalAISalesCategory,
    title: 'Digital & AI Sales'
  },
  'sales-management': {
    data: salesManagementCategory,
    title: 'Sales Management & Leadership'
  },
  'mindset-performance': {
    data: mindsetPerformanceCategory,
    title: 'Mindset & Performance'
  }
};

// Configuration des suggestions pour CategoryBreadcrumb
export const categoryBreadcrumbSuggestions: Record<string, Array<{
  title: string;
  href: string;
  icon: string;
  description: string;
}>> = {
  'mindset-performance': [
    {
      title: 'Sales Management & Leadership',
      href: '/ressources/meilleurs-livres/sales-management',
      icon: '👥',
      description: 'Développer son leadership et manager efficacement son équipe commerciale'
    },
    {
      title: 'Digital & AI Sales',
      href: '/ressources/meilleurs-livres/digital-ai',
      icon: '🤖',
      description: 'Cultiver le mindset d\'adaptation nécessaire à la transformation digitale'
    }
  ],
  'sales-management': [
    {
      title: 'Mindset & Performance',
      href: '/ressources/meilleurs-livres/mindset-performance',
      icon: '💪',
      description: 'Développer l\'état d\'esprit et les habitudes du leader performant'
    },
    {
      title: 'Digital & AI Sales',
      href: '/ressources/meilleurs-livres/digital-ai',
      icon: '🤖',
      description: 'Manager la transformation digitale de son équipe commerciale'
    }
  ],
  'digital-ai': [
    {
      title: 'Sales Management & Leadership',
      href: '/ressources/meilleurs-livres/sales-management',
      icon: '👥',
      description: 'Diriger efficacement la transformation digitale de son équipe'
    },
    {
      title: 'Mindset & Performance',
      href: '/ressources/meilleurs-livres/mindset-performance',
      icon: '💪',
      description: 'Développer le mindset d\'adaptation aux nouvelles technologies'
    }
  ]
};

// Règles de suggestions cross-catégories basées sur les thèmes et complémentarités
const crossCategorySuggestionRules: Record<string, Record<string, string[]>> = {
  'digital-ai': {
    'sales-management': [
      'good-to-great', // Leadership pour transformation digitale
      'high-output-management', // Gestion d'équipe dans l'ère digitale
      'blue-ocean-strategy' // Innovation et disruption
    ],
    'mindset-performance': [
      'atomic-habits', // Habitudes pour l'adoption des outils digitaux
      'mindset' // Mindset de croissance pour s'adapter aux nouvelles technologies
    ]
  },
  'sales-management': {
    'digital-ai': [
      'human-machine', // Collaboration homme-IA en management
      'the-second-machine-age', // Impact du digital sur l'organisation
      'lean-startup' // Agilité et innovation managériale
    ],
    'mindset-performance': [
      'the-7-habits', // Leadership personnel pour manager efficacement
      'atomic-habits' // Construire des habitudes de management performantes
    ]
  },
  'mindset-performance': {
    'sales-management': [
      'good-to-great', // Leadership de niveau 5 et mindset de croissance
      'leaders-eat-last' // Leadership bienveillant et développement personnel
    ],
    'digital-ai': [
      'human-machine', // Adaptation au changement et collaboration avec l'IA
      'the-second-machine-age' // Mindset pour naviguer la transformation digitale
    ]
  }
};

// Raisons spécifiques pour chaque suggestion
const suggestionReasons: Record<string, Record<string, string>> = {
  'digital-ai': {
    'good-to-great': 'Pour maîtriser le leadership nécessaire à la transformation digitale de votre équipe commerciale.',
    'high-output-management': 'Pour optimiser la productivité de votre équipe dans un environnement digital.',
    'blue-ocean-strategy': 'Pour créer de nouveaux espaces de marché grâce aux technologies digitales.',
    'atomic-habits': 'Pour développer les habitudes nécessaires à l\'adoption efficace des outils digitaux.',
    'mindset': 'Pour cultiver le mindset de croissance nécessaire à l\'adaptation aux nouvelles technologies.'
  },
  'sales-management': {
    'human-machine': 'Pour comprendre comment l\'IA peut augmenter les capacités de management de votre équipe.',
    'the-second-machine-age': 'Pour anticiper l\'impact des technologies numériques sur votre organisation commerciale.',
    'lean-startup': 'Pour adopter une approche agile et innovante dans le management de vos équipes.',
    'the-7-habits': 'Pour développer un leadership personnel solide, base de tout management efficace.',
    'atomic-habits': 'Pour construire des habitudes de management qui transforment durablement vos équipes.'
  },
  'mindset-performance': {
    'good-to-great': 'Pour comprendre comment le mindset de croissance s\'articule avec le leadership de niveau 5.',
    'leaders-eat-last': 'Pour allier développement personnel et leadership bienveillant au service de l\'équipe.',
    'human-machine': 'Pour développer le mindset nécessaire à la collaboration efficace avec l\'intelligence artificielle.',
    'the-second-machine-age': 'Pour cultiver l\'état d\'esprit d\'adaptation continue face aux transformations digitales.'
  }
};

/**
 * Génère des suggestions de livres d'autres catégories
 * @param currentBook - Le livre actuellement consulté
 * @param currentCategory - La catégorie actuelle
 * @param maxSuggestions - Nombre maximum de suggestions (défaut: 2)
 * @returns Array de suggestions cross-catégories
 */
export function generateCrossCategorySuggestions(
  currentBook: Book,
  currentCategory: string,
  maxSuggestions: number = 2
): CrossCategorySuggestion[] {
  const suggestions: CrossCategorySuggestion[] = [];
  
  // Récupérer les règles pour la catégorie actuelle
  const categoryRules = crossCategorySuggestionRules[currentCategory];
  if (!categoryRules) return suggestions;

  // Pour chaque catégorie cible
  Object.entries(categoryRules).forEach(([targetCategory, bookSlugs]) => {
    const targetCategoryData = categoryMap[targetCategory as keyof typeof categoryMap];
    if (!targetCategoryData) return;

    // Pour chaque livre suggéré dans cette catégorie
    bookSlugs.slice(0, maxSuggestions).forEach(bookSlug => {
      const book = targetCategoryData.data.books.find(b => b.slug === bookSlug);
      if (!book) return;

      const reason = suggestionReasons[currentCategory]?.[bookSlug] || 
        `Complément idéal pour approfondir les concepts de ${currentBook.title}.`;

      suggestions.push({
        book,
        category: targetCategory,
        categoryTitle: targetCategoryData.title,
        reason
      });
    });
  });

  return suggestions.slice(0, maxSuggestions);
}

/**
 * Génère des CTAs contextuels basés sur la catégorie et le livre
 * @param currentBook - Le livre actuellement consulté
 * @param currentCategory - La catégorie actuelle
 * @returns Array de CTAs contextuels
 */
export function generateContextualCTAs(currentBook: Book, currentCategory: string) {
  const baseCTAs = [];

  // CTAs spécifiques par catégorie
  switch (currentCategory) {
    case 'digital-ai':
      baseCTAs.push({
        title: 'Diagnostic Commercial Digital Gratuit',
        description: 'Évaluez le potentiel de digitalisation de votre équipe commerciale. Identifiez les opportunités d\'automatisation et de performance.',
        buttonText: 'Faire le diagnostic',
        buttonLink: '/diagnostic',
        icon: '🔍',
        variant: 'primary' as const,
        category: 'Évaluation'
      });
      
      baseCTAs.push({
        title: 'Formation IA & Vente',
        description: 'Maîtrisez les outils d\'IA commerciale et transformez votre approche de la vente. Formation pratique avec cas d\'usage concrets.',
        buttonText: 'Découvrir la formation',
        buttonLink: '/bootcamp-commercial-intensif',
        icon: '🤖',
        variant: 'accent' as const,
        category: 'Formation'
      });
      break;

    case 'sales-management':
      baseCTAs.push({
        title: 'Bootcamp Commercial Intensif',
        description: 'Formez-vous avec les meilleures méthodes de management commercial issues de ces livres de référence, adaptées aux enjeux des PME françaises.',
        buttonText: 'Voir le Bootcamp',
        buttonLink: '/bootcamp-commercial-intensif',
        icon: '🎯',
        variant: 'secondary' as const,
        category: 'Formation'
      });
      
      baseCTAs.push({
        title: 'Coaching Management Commercial',
        description: 'Accompagnement personnalisé pour transformer votre leadership et développer une équipe commerciale d\'excellence.',
        buttonText: 'Découvrir le coaching',
        buttonLink: '/coach-commercial-entreprise',
        icon: '👥',
        variant: 'primary' as const,
        category: 'Accompagnement'
      });
      break;

    case 'mindset-performance':
      baseCTAs.push({
        title: 'Coaching Performance Commerciale',
        description: 'Développez votre mindset de croissance et vos habitudes de performance avec un accompagnement personnalisé.',
        buttonText: 'Découvrir le coaching',
        buttonLink: '/coach-commercial-entreprise',
        icon: '🧠',
        variant: 'primary' as const,
        category: 'Développement Personnel'
      });
      
      baseCTAs.push({
        title: 'Formation Mindset Commercial',
        description: 'Transformez votre état d\'esprit et développez la résilience nécessaire à l\'excellence commerciale.',
        buttonText: 'Voir la formation',
        buttonLink: '/bootcamp-commercial-intensif',
        icon: '💪',
        variant: 'accent' as const,
        category: 'Formation'
      });
      break;

    default:
      // CTAs génériques
      baseCTAs.push({
        title: 'Diagnostic Commercial Gratuit',
        description: 'Identifiez vos axes d\'amélioration et obtenez un plan d\'action personnalisé pour booster vos performances commerciales.',
        buttonText: 'Faire le diagnostic',
        buttonLink: '/diagnostic',
        icon: '📊',
        variant: 'primary' as const,
        category: 'Évaluation'
      });
  }

  return baseCTAs;
}

/**
 * Génère des liens vers des outils digitaux basés sur le contenu du livre
 * @param currentBook - Le livre actuellement consulté
 * @param currentCategory - La catégorie actuelle
 * @returns Array de liens vers des outils
 */
export function generateToolLinks(currentBook: Book, currentCategory: string) {
  const toolLinks = [];

  // Outils spécifiques par catégorie
  switch (currentCategory) {
    case 'digital-ai':
      toolLinks.push(
        {
          title: 'CRM & Automation',
          description: 'Découvrez les meilleurs outils CRM et d\'automatisation commerciale',
          link: '/ressources/outil-strategie-commerciale',
          icon: '⚙️'
        },
        {
          title: 'Outils IA pour la Vente',
          description: 'Sélection d\'outils d\'intelligence artificielle pour commerciaux',
          link: '/ressources/techniques-de-vente',
          icon: '🤖'
        }
      );
      break;

    case 'sales-management':
      toolLinks.push(
        {
          title: 'Kit Gestion Grands Comptes',
          description: 'Outils et templates pour gérer efficacement vos comptes stratégiques',
          link: '/ressources/kit-gestion-grands-comptes',
          icon: '🏢'
        },
        {
          title: 'Outil Stratégie Commerciale',
          description: 'Framework complet pour définir et piloter votre stratégie commerciale',
          link: '/ressources/outil-strategie-commerciale',
          icon: '📈'
        }
      );
      break;

    case 'mindset-performance':
      toolLinks.push(
        {
          title: 'Guide des Techniques de Vente',
          description: 'Méthodes et techniques pour développer votre performance commerciale',
          link: '/ressources/techniques-de-vente',
          icon: '🎯'
        },
        {
          title: 'Outil Préparation RDV',
          description: 'Framework pour optimiser votre préparation et performance en rendez-vous',
          link: '/ressources/outil-preparation-rdv',
          icon: '📋'
        }
      );
      break;
  }

  return toolLinks;
}