import { Book } from '@/data/books-enriched';
import { digitalAISalesCategory, salesManagementCategory } from '@/data/books-enriched';

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
  }
};

// Règles de suggestions cross-catégories basées sur les thèmes et complémentarités
const crossCategorySuggestionRules: Record<string, Record<string, string[]>> = {
  'digital-ai': {
    'sales-management': [
      'good-to-great', // Leadership pour transformation digitale
      'high-output-management', // Gestion d'équipe dans l'ère digitale
      'blue-ocean-strategy' // Innovation et disruption
    ]
  },
  'sales-management': {
    'digital-ai': [
      'human-machine', // Collaboration homme-IA en management
      'the-second-machine-age', // Impact du digital sur l'organisation
      'lean-startup' // Agilité et innovation managériale
    ]
  }
};

// Raisons spécifiques pour chaque suggestion
const suggestionReasons: Record<string, Record<string, string>> = {
  'digital-ai': {
    'good-to-great': 'Pour maîtriser le leadership nécessaire à la transformation digitale de votre équipe commerciale.',
    'high-output-management': 'Pour optimiser la productivité de votre équipe dans un environnement digital.',
    'blue-ocean-strategy': 'Pour créer de nouveaux espaces de marché grâce aux technologies digitales.'
  },
  'sales-management': {
    'human-machine': 'Pour comprendre comment l\'IA peut augmenter les capacités de management de votre équipe.',
    'the-second-machine-age': 'Pour anticiper l\'impact des technologies numériques sur votre organisation commerciale.',
    'lean-startup': 'Pour adopter une approche agile et innovante dans le management de vos équipes.'
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
  }

  return toolLinks;
}