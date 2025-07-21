import { Book } from '@/data/books-enriched';
import { 
  digitalAISalesCategory, 
  salesManagementCategory, 
  mindsetPerformanceCategory, 
  methodsProcessCategory,
  enterpriseAccountCategory,
  psychologyInfluenceCategory,
  negotiationClosingCategory,
  prospectionSDRCategoryExtended
} from '@/data/books-enriched';

// Type pour les suggestions cross-catégories
export interface CrossCategorySuggestion {
  book: Book;
  category: string;
  categoryTitle: string;
  reason: string;
}

// Type pour les recommandations intelligentes
export interface IntelligentRecommendation {
  targetCategory: string;
  targetCategoryTitle: string;
  bookSlugs: string[];
  complementarityReason: string;
  businessValue: string;
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
  },
  'prospection-sdr': {
    data: prospectionSDRCategoryExtended,
    title: 'Prospection & SDR'
  },
  'negociation-closing': {
    data: negotiationClosingCategory,
    title: 'Négociation & Closing'
  },
  'psychologie-influence': {
    data: psychologyInfluenceCategory,
    title: 'Psychologie & Influence'
  },
  'methodes-process': {
    data: methodsProcessCategory,
    title: 'Méthodes & Process'
  },
  'enterprise-account': {
    data: enterpriseAccountCategory,
    title: 'Enterprise & Accounts'
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
      title: 'Psychologie & Influence',
      href: '/ressources/meilleurs-livres/psychologie-influence',
      icon: '🧠',
      description: 'Comprendre les mécanismes psychologiques pour optimiser sa performance'
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
      description: 'Intégrer les outils digitaux dans votre management commercial'
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
  ],
  'prospection-sdr': [
    {
      title: 'Négociation & Closing',
      href: '/ressources/meilleurs-livres/negociation-closing',
      icon: '🤝',
      description: 'Transformer vos prospects qualifiés en clients avec les meilleures techniques'
    },
    {
      title: 'Psychologie & Influence',
      href: '/ressources/meilleurs-livres/psychologie-influence',
      icon: '🧠',
      description: 'Comprendre les leviers psychologiques pour une prospection plus efficace'
    }
  ],
  'negociation-closing': [
    {
      title: 'Prospection & SDR',
      href: '/ressources/meilleurs-livres/prospection-sdr',
      icon: '🎯',
      description: 'Alimenter votre pipeline avec des prospects qualifiés prêts à négocier'
    },
    {
      title: 'Psychologie & Influence',
      href: '/ressources/meilleurs-livres/psychologie-influence',
      icon: '🧠',
      description: 'Maîtriser les biais cognitifs et techniques d\'influence en négociation'
    },
    {
      title: 'Enterprise Account',
      href: '/ressources/meilleurs-livres/enterprise-account',
      icon: '🏢',
      description: 'Appliquer les techniques de négociation aux comptes stratégiques'
    }
  ],
  'psychologie-influence': [
    {
      title: 'Négociation & Closing',
      href: '/ressources/meilleurs-livres/negociation-closing',
      icon: '🤝',
      description: 'Appliquer les principes psychologiques aux techniques de closing'
    },
    {
      title: 'Mindset & Performance',
      href: '/ressources/meilleurs-livres/mindset-performance',
      icon: '💪',
      description: 'Développer le mindset et les habitudes pour optimiser votre influence'
    },
    {
      title: 'Méthodes & Process',
      href: '/ressources/meilleurs-livres/methodes-process',
      icon: '🛠️',
      description: 'Intégrer les principes psychologiques dans vos processus de vente'
    }
  ],
  'methodes-process': [
    {
      title: 'Sales Management & Leadership',
      href: '/ressources/meilleurs-livres/sales-management',
      icon: '👥',
      description: 'Implémenter et faire adopter vos processus par votre équipe'
    },
    {
      title: 'Enterprise & Accounts',
      href: '/ressources/meilleurs-livres/enterprise-account',
      icon: '🏢',
      description: 'Appliquer vos méthodes à la gestion des comptes stratégiques'
    },
    {
      title: 'Psychologie & Influence',
      href: '/ressources/meilleurs-livres/psychologie-influence',
      icon: '🧠',
      description: 'Intégrer la psychologie dans vos processus de vente structurés'
    }
  ],
  'enterprise-account': [
    {
      title: 'Sales Management & Leadership',
      href: '/ressources/meilleurs-livres/sales-management',
      icon: '👥',
      description: 'Développer le leadership nécessaire à la gestion des comptes stratégiques'
    },
    {
      title: 'Méthodes & Process',
      href: '/ressources/meilleurs-livres/methodes-process',
      icon: '🛠️',
      description: 'Structurer vos processus de gestion des grands comptes'
    },
    {
      title: 'Négociation & Closing',
      href: '/ressources/meilleurs-livres/negociation-closing',
      icon: '🤝',
      description: 'Maîtriser les techniques de négociation pour vos comptes stratégiques'
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
  },
  'prospection-sdr': {
    'negociation-closing': [
      'never-split-the-difference', // Négociation pour convertir les prospects
      'spin-selling', // Techniques de questionnement pour qualifier
      'the-challenger-sale' // Approche challenger pour convaincre
    ],
    'psychologie-influence': [
      'influence', // Principes de persuasion en prospection
      'predictably-irrational', // Comprendre les biais des prospects
      'pre-suasion' // Préparer mentalement avant l'approche
    ]
  },
  'methodes-process': {
    'sales-management': [
      'high-output-management', // Processus et systèmes de management
      'good-to-great', // Discipline et processus d'excellence
      'blue-ocean-strategy' // Méthodologie stratégique
    ],
    'digital-ai': [
      'lean-startup', // Méthodologie agile et itérative
      'human-machine', // Processus homme-machine optimisés
      'the-second-machine-age' // Impact des processus digitaux
    ],
    'enterprise-account': [
      'strategic-selling', // Méthodologie structurée pour grands comptes
      'mastering-the-complex-sale', // Processus de vente complexe
      'key-account-management' // Processus de gestion des comptes clés
    ],
    'negociation-closing': [
      'spin-selling', // Méthodologie de questionnement structuré
      'solution-selling', // Processus de vente consultative
      'gap-selling' // Méthodologie de découverte des besoins
    ],
    'psychologie-influence': [
      'influence', // Méthodologie d'application des principes psychologiques
      'pre-suasion', // Processus de préparation mentale
      'thinking-fast-slow' // Méthodologie de compréhension des décisions
    ]
  },
  'enterprise-account': {
    'sales-management': [
      'good-to-great', // Leadership pour gérer les comptes stratégiques
      'high-output-management', // Gestion efficace des équipes grands comptes
      'leaders-eat-last' // Leadership bienveillant pour la relation client
    ],
    'methodes-process': [
      'strategic-selling', // Méthodologie de vente grands comptes
      'mastering-the-complex-sale', // Processus de vente complexe
      'key-account-management' // Gestion structurée des comptes clés
    ],
    'negociation-closing': [
      'never-split-the-difference', // Négociation pour comptes stratégiques
      'getting-to-yes', // Négociation collaborative grands comptes
      'the-challenger-sale' // Approche challenger pour comptes complexes
    ],
    'psychologie-influence': [
      'influence', // Leviers psychologiques en account management
      'how-to-win-friends', // Relations durables avec les comptes clés
      'thinking-fast-slow' // Comprendre les processus de décision complexes
    ]
  },
  'negociation-closing': {
    'prospection-sdr': [
      'fanatical-prospecting', // Alimenter le pipeline pour négocier plus
      'predictable-revenue', // Processus prévisible de génération de leads
      'new-sales-simplified' // Techniques d'ouverture et de qualification
    ],
    'psychologie-influence': [
      'influence', // Leviers psychologiques en négociation
      'thinking-fast-slow', // Comprendre les processus de décision
      'getting-to-yes' // Négociation raisonnée et gagnant-gagnant
    ],
    'enterprise-account': [
      'the-challenger-customer', // Négociation avec comités d'achat complexes
      'mastering-the-complex-sale', // Négociation dans les ventes complexes
      'strategic-selling' // Négociation stratégique grands comptes
    ],
    'methodes-process': [
      'spin-selling', // Méthodologie de questionnement en négociation
      'solution-selling', // Processus structuré de négociation
      'gap-selling' // Identifier les gaps pour mieux négocier
    ]
  },
  'psychologie-influence': {
    'negociation-closing': [
      'never-split-the-difference', // Application pratique des principes psychologiques
      'getting-to-yes', // Négociation basée sur les intérêts psychologiques
      'the-challenger-sale' // Influence par le challenge et l'insight
    ],
    'sales-management': [
      'leaders-eat-last', // Leadership par l'influence et la bienveillance
      'how-to-win-friends', // Relations humaines en management
      'good-to-great' // Influence du leader de niveau 5
    ],
    'enterprise-account': [
      'the-challenger-customer', // Influence dans les comités d'achat
      'mastering-the-complex-sale', // Psychologie des ventes complexes
      'key-account-management' // Relations psychologiques durables
    ],
    'methodes-process': [
      'spin-selling', // Psychologie du questionnement
      'solution-selling', // Influence consultative
      'gap-selling' // Psychologie de la découverte des besoins
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
  },
  'prospection-sdr': {
    'never-split-the-difference': 'Pour transformer vos prospects qualifiés en clients grâce aux techniques de négociation du FBI.',
    'spin-selling': 'Pour maîtriser l\'art du questionnement et qualifier efficacement vos prospects.',
    'challenger-sale': 'Pour adopter une approche challenger qui différencie votre prospection.',
    'influence': 'Pour comprendre les leviers psychologiques qui rendent votre prospection irrésistible.',
    'predictably-irrational': 'Pour anticiper et utiliser les biais cognitifs de vos prospects.',
    'pre-suasion': 'Pour préparer mentalement vos prospects avant même de les contacter.'
  },
  'negotiation-closing': {
    'fanatical-prospecting': 'Pour alimenter constamment votre pipeline et négocier en position de force.',
    'predictable-revenue': 'Pour créer un système prévisible de génération de leads qualifiés.',
    'new-sales-simplified': 'Pour maîtriser les techniques d\'ouverture qui mènent à la négociation.',
    'influence': 'Pour utiliser les 6 principes de persuasion dans vos négociations.',
    'thinking-fast-slow': 'Pour comprendre comment vos clients prennent leurs décisions d\'achat.',
    'getting-to-yes': 'Pour négocier des accords gagnant-gagnant durables.'
  },
  'psychology-influence': {
    'never-split-the-difference': 'Pour appliquer concrètement les principes psychologiques en négociation.',
    'getting-to-yes': 'Pour comprendre la psychologie des intérêts dans la négociation raisonnée.',
    'challenger-sale': 'Pour utiliser l\'influence par l\'insight et le challenge constructif.',
    'leaders-eat-last': 'Pour développer un leadership basé sur l\'influence bienveillante.',
    'how-to-win-friends': 'Pour maîtriser les fondamentaux des relations humaines en business.',
    'good-to-great': 'Pour comprendre l\'influence subtile du leader de niveau 5.'
  },
  'methodes-process': {
    'high-output-management': 'Pour implémenter des processus qui maximisent la productivité de votre équipe.',
    'good-to-great': 'Pour comprendre la discipline nécessaire à l\'excellence opérationnelle.',
    'blue-ocean-strategy': 'Pour appliquer une méthodologie stratégique rigoureuse.',
    'lean-startup': 'Pour adopter une approche méthodologique agile et itérative.',
    'human-machine': 'Pour optimiser les processus de collaboration homme-machine.',
    'the-second-machine-age': 'Pour comprendre l\'impact des processus digitaux sur la performance.',
    'strategic-selling': 'Pour appliquer une méthodologie structurée à la gestion des grands comptes.',
    'mastering-the-complex-sale': 'Pour maîtriser les processus de vente complexe étape par étape.',
    'key-account-management': 'Pour structurer vos processus de gestion des comptes stratégiques.',
    'spin-selling': 'Pour intégrer une méthodologie de questionnement structuré dans vos processus.',
    'solution-selling': 'Pour adopter un processus de vente consultative méthodique.',
    'gap-selling': 'Pour structurer votre méthodologie de découverte des besoins clients.',
    'influence': 'Pour intégrer les principes psychologiques dans vos processus de vente.',
    'pre-suasion': 'Pour structurer votre processus de préparation mentale des prospects.',
    'thinking-fast-slow': 'Pour comprendre les processus de décision et les intégrer dans vos méthodes.'
  },
  'enterprise-account': {
    'good-to-great': 'Pour développer le leadership de niveau 5 nécessaire à la gestion des comptes stratégiques.',
    'high-output-management': 'Pour optimiser la gestion et la productivité de vos équipes grands comptes.',
    'leaders-eat-last': 'Pour cultiver un leadership bienveillant qui renforce la relation client.',
    'strategic-selling': 'Pour maîtriser la méthodologie de vente spécifique aux grands comptes.',
    'mastering-the-complex-sale': 'Pour naviguer efficacement dans les processus de vente complexes.',
    'key-account-management': 'Pour structurer et optimiser la gestion de vos comptes clés.',
    'never-split-the-difference': 'Pour maîtriser les techniques de négociation avancées avec vos comptes stratégiques.',
    'getting-to-yes': 'Pour développer une approche collaborative dans la négociation grands comptes.',
    'the-challenger-sale': 'Pour adopter une posture de challenger avec vos comptes complexes.',
    'influence': 'Pour comprendre les leviers psychologiques dans la gestion des relations clients.',
    'how-to-win-friends': 'Pour développer des relations durables et authentiques avec vos comptes clés.',
    'thinking-fast-slow': 'Pour comprendre les processus de décision complexes en entreprise.'
  },
  'negociation-closing': {
    'fanatical-prospecting': 'Pour alimenter constamment votre pipeline et négocier en position de force.',
    'predictable-revenue': 'Pour créer un système prévisible de génération de leads qualifiés.',
    'new-sales-simplified': 'Pour maîtriser les techniques d\'ouverture qui mènent à la négociation.',
    'influence': 'Pour utiliser les 6 principes de persuasion dans vos négociations.',
    'thinking-fast-slow': 'Pour comprendre comment vos clients prennent leurs décisions d\'achat.',
    'getting-to-yes': 'Pour négocier des accords gagnant-gagnant durables.',
    'the-challenger-customer': 'Pour maîtriser la négociation avec des comités d\'achat complexes.',
    'mastering-the-complex-sale': 'Pour structurer vos négociations dans les ventes complexes.',
    'strategic-selling': 'Pour adopter une approche stratégique dans vos négociations grands comptes.',
    'spin-selling': 'Pour intégrer le questionnement structuré dans vos négociations.',
    'solution-selling': 'Pour adopter une approche consultative en négociation.',
    'gap-selling': 'Pour identifier les gaps et créer l\'urgence en négociation.'
  },
  'psychologie-influence': {
    'never-split-the-difference': 'Pour appliquer concrètement les principes psychologiques en négociation.',
    'getting-to-yes': 'Pour comprendre la psychologie des intérêts dans la négociation raisonnée.',
    'the-challenger-sale': 'Pour utiliser l\'influence par l\'insight et le challenge constructif.',
    'leaders-eat-last': 'Pour développer un leadership basé sur l\'influence bienveillante.',
    'how-to-win-friends': 'Pour maîtriser les fondamentaux des relations humaines en business.',
    'good-to-great': 'Pour comprendre l\'influence subtile du leader de niveau 5.',
    'the-challenger-customer': 'Pour comprendre la psychologie des comités d\'achat complexes.',
    'mastering-the-complex-sale': 'Pour appliquer la psychologie dans les processus de vente complexes.',
    'key-account-management': 'Pour développer des relations psychologiques durables avec vos comptes clés.',
    'spin-selling': 'Pour comprendre la psychologie du questionnement et de la découverte.',
    'solution-selling': 'Pour maîtriser l\'influence consultative et la psychologie du conseil.',
    'gap-selling': 'Pour utiliser la psychologie dans la découverte des besoins et motivations.'
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
    if (!targetCategoryData || !targetCategoryData.data) return;

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

    case 'enterprise-account':
      baseCTAs.push({
        title: 'Coaching Gestion Grands Comptes',
        description: 'Accompagnement spécialisé pour développer et optimiser vos comptes stratégiques avec des méthodes éprouvées.',
        buttonText: 'Découvrir le coaching',
        buttonLink: '/coach-commercial-entreprise',
        icon: '🏢',
        variant: 'primary' as const,
        category: 'Accompagnement'
      });
      
      baseCTAs.push({
        title: 'Formation Account Management',
        description: 'Maîtrisez les techniques de gestion des grands comptes et développez vos comptes stratégiques.',
        buttonText: 'Voir la formation',
        buttonLink: '/bootcamp-commercial-intensif',
        icon: '📈',
        variant: 'accent' as const,
        category: 'Formation'
      });
      break;

    case 'methodes-process':
      baseCTAs.push({
        title: 'Audit Processus Commercial',
        description: 'Analysez et optimisez vos processus commerciaux avec des méthodes structurées et éprouvées.',
        buttonText: 'Faire l\'audit',
        buttonLink: '/diagnostic',
        icon: '🛠️',
        variant: 'primary' as const,
        category: 'Évaluation'
      });
      
      baseCTAs.push({
        title: 'Formation Méthodes de Vente',
        description: 'Maîtrisez les frameworks de vente les plus efficaces : SPIN, Challenger, Solution Selling.',
        buttonText: 'Voir la formation',
        buttonLink: '/bootcamp-commercial-intensif',
        icon: '⚙️',
        variant: 'accent' as const,
        category: 'Formation'
      });
      break;

    case 'psychologie-influence':
      baseCTAs.push({
        title: 'Coaching Influence Commerciale',
        description: 'Développez votre capacité d\'influence et de persuasion avec des techniques psychologiques éthiques.',
        buttonText: 'Découvrir le coaching',
        buttonLink: '/coach-commercial-entreprise',
        icon: '🧠',
        variant: 'primary' as const,
        category: 'Développement Personnel'
      });
      
      baseCTAs.push({
        title: 'Formation Psychologie de la Vente',
        description: 'Apprenez à utiliser les biais cognitifs et les principes d\'influence pour améliorer vos résultats.',
        buttonText: 'Voir la formation',
        buttonLink: '/bootcamp-commercial-intensif',
        icon: '🎯',
        variant: 'accent' as const,
        category: 'Formation'
      });
      break;

    case 'prospection-sdr':
      baseCTAs.push({
        title: 'Coaching Prospection Moderne',
        description: 'Développez une stratégie de prospection automatisée et personnalisée qui génère un flux constant d\'opportunités.',
        buttonText: 'Découvrir le coaching',
        buttonLink: '/coach-commercial-entreprise',
        icon: '🎯',
        variant: 'primary' as const,
        category: 'Accompagnement'
      });
      
      baseCTAs.push({
        title: 'Formation Prospection & SDR',
        description: 'Maîtrisez les techniques modernes de prospection : automatisation, social selling, qualification prédictive.',
        buttonText: 'Voir la formation',
        buttonLink: '/bootcamp-commercial-intensif',
        icon: '📞',
        variant: 'accent' as const,
        category: 'Formation'
      });
      break;

    case 'negociation-closing':
      baseCTAs.push({
        title: 'Coaching Négociation Avancée',
        description: 'Maîtrisez les techniques de négociation collaborative et de closing sans pression.',
        buttonText: 'Découvrir le coaching',
        buttonLink: '/coach-commercial-entreprise',
        icon: '🤝',
        variant: 'primary' as const,
        category: 'Accompagnement'
      });
      
      baseCTAs.push({
        title: 'Formation Négociation & Closing',
        description: 'Transformez vos prospects en clients avec les meilleures techniques de négociation et de closing.',
        buttonText: 'Voir la formation',
        buttonLink: '/bootcamp-commercial-intensif',
        icon: '💼',
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

    case 'prospection-sdr':
      toolLinks.push(
        {
          title: 'Guide de Prospection',
          description: 'Techniques et stratégies pour une prospection efficace',
          link: '/ressources/guide-prospection',
          icon: '🎯'
        },
        {
          title: 'Outil Préparation RDV',
          description: 'Framework pour optimiser vos rendez-vous de prospection',
          link: '/ressources/outil-preparation-rdv',
          icon: '📋'
        }
      );
      break;

    case 'negociation-closing':
      toolLinks.push(
        {
          title: 'Guide de Closing',
          description: 'Techniques avancées de négociation et de closing',
          link: '/ressources/guide-closing',
          icon: '🤝'
        },
        {
          title: 'Techniques de Négociation',
          description: 'Méthodes éprouvées pour négocier avec succès',
          link: '/ressources/techniques-de-negociation',
          icon: '💼'
        }
      );
      break;

    case 'psychologie-influence':
      toolLinks.push(
        {
          title: 'Techniques de Vente',
          description: 'Appliquer la psychologie aux techniques de vente',
          link: '/ressources/techniques-de-vente',
          icon: '🧠'
        },
        {
          title: 'Guide de Closing',
          description: 'Utiliser l\'influence pour conclure efficacement',
          link: '/ressources/guide-closing',
          icon: '🎯'
        }
      );
      break;

    case 'methodes-process':
      toolLinks.push(
        {
          title: 'Outil Stratégie Commerciale',
          description: 'Framework méthodologique pour votre stratégie',
          link: '/ressources/outil-strategie-commerciale',
          icon: '📈'
        },
        {
          title: 'Kit Gestion Grands Comptes',
          description: 'Processus structurés pour la gestion de comptes',
          link: '/ressources/kit-gestion-grands-comptes',
          icon: '🏢'
        }
      );
      break;

    case 'enterprise-account':
      toolLinks.push(
        {
          title: 'Kit Gestion Grands Comptes',
          description: 'Outils et templates spécialisés pour la gestion des comptes stratégiques',
          link: '/ressources/kit-gestion-grands-comptes',
          icon: '🏢'
        },
        {
          title: 'Outil Stratégie Commerciale',
          description: 'Framework pour développer votre stratégie grands comptes',
          link: '/ressources/outil-strategie-commerciale',
          icon: '📈'
        }
      );
      break;
  }

  return toolLinks;
}

/**
 * Génère des recommandations intelligentes basées sur les complémentarités métier
 * @param currentCategory - La catégorie actuelle
 * @param userProfile - Profil utilisateur (optionnel)
 * @returns Array de recommandations intelligentes
 */
export function generateIntelligentRecommendations(
  currentCategory: string,
  userProfile?: 'Commercial' | 'Manager' | 'Dirigeant' | 'SDR'
): IntelligentRecommendation[] {
  const recommendations: IntelligentRecommendation[] = [];

  // Recommandations basées sur les complémentarités métier
  const complementarityMap: Record<string, IntelligentRecommendation[]> = {
    'prospection-sdr': [
      {
        targetCategory: 'negotiation-closing',
        targetCategoryTitle: 'Négociation & Closing',
        bookSlugs: ['never-split-the-difference', 'spin-selling'],
        complementarityReason: 'La prospection génère des leads, la négociation les convertit',
        businessValue: 'Augmentez votre taux de conversion de 40% en maîtrisant toute la chaîne commerciale'
      },
      {
        targetCategory: 'psychology-influence',
        targetCategoryTitle: 'Psychologie & Influence',
        bookSlugs: ['influence', 'predictably-irrational'],
        complementarityReason: 'Comprendre la psychologie améliore l\'efficacité de la prospection',
        businessValue: 'Multipliez par 3 votre taux de réponse en appliquant les biais cognitifs'
      }
    ],
    'negotiation-closing': [
      {
        targetCategory: 'prospection-sdr',
        targetCategoryTitle: 'Prospection & SDR',
        bookSlugs: ['fanatical-prospecting', 'predictable-revenue'],
        complementarityReason: 'Plus de prospects qualifiés = plus d\'opportunités de négociation',
        businessValue: 'Négociez en position de force avec un pipeline constamment alimenté'
      },
      {
        targetCategory: 'psychology-influence',
        targetCategoryTitle: 'Psychologie & Influence',
        bookSlugs: ['influence', 'thinking-fast-slow'],
        complementarityReason: 'La négociation est avant tout un jeu psychologique',
        businessValue: 'Augmentez vos marges de 25% en maîtrisant les leviers psychologiques'
      }
    ],
    'psychology-influence': [
      {
        targetCategory: 'sales-management',
        targetCategoryTitle: 'Sales Management & Leadership',
        bookSlugs: ['leaders-eat-last', 'good-to-great'],
        complementarityReason: 'L\'influence est la base du leadership efficace',
        businessValue: 'Développez une équipe 2x plus performante grâce au leadership par l\'influence'
      }
    ],
    'sales-management': [
      {
        targetCategory: 'methods-processes',
        targetCategoryTitle: 'Méthodes & Processus',
        bookSlugs: ['high-output-management', 'blue-ocean-strategy'],
        complementarityReason: 'Le management efficace repose sur des processus structurés',
        businessValue: 'Augmentez la productivité de votre équipe de 60% avec des processus optimisés'
      }
    ],
    'methodes-process': [
      {
        targetCategory: 'digital-ai',
        targetCategoryTitle: 'Digital & AI Sales',
        bookSlugs: ['lean-startup', 'human-machine'],
        complementarityReason: 'Les processus modernes intègrent les outils digitaux',
        businessValue: 'Automatisez 70% de vos tâches répétitives et focalisez sur la valeur ajoutée'
      }
    ],
    'digital-ai': [
      {
        targetCategory: 'mindset-performance',
        targetCategoryTitle: 'Mindset & Performance',
        bookSlugs: ['atomic-habits', 'mindset'],
        complementarityReason: 'L\'adoption des outils digitaux nécessite un changement de mindset',
        businessValue: 'Accélérez votre transformation digitale en développant les bonnes habitudes'
      }
    ],
    'mindset-performance': [
      {
        targetCategory: 'psychology-influence',
        targetCategoryTitle: 'Psychologie & Influence',
        bookSlugs: ['influence', 'how-to-win-friends'],
        complementarityReason: 'La performance personnelle s\'appuie sur la compréhension des autres',
        businessValue: 'Développez votre charisme et votre influence pour booster vos résultats'
      }
    ]
  };

  return complementarityMap[currentCategory] || [];
}

/**
 * Génère des liens contextuels pour la navigation entre pages
 * @param currentCategory - La catégorie actuelle
 * @param currentBook - Le livre actuellement consulté (optionnel)
 * @returns Array de liens contextuels
 */
export function generateContextualLinks(
  currentCategory: string,
  currentBook?: Book
) {
  const contextualLinks = [];

  // Liens vers les pages principales du site
  const mainLinks = [
    {
      title: 'Diagnostic Commercial Gratuit',
      href: '/diagnostic',
      description: 'Évaluez vos compétences et identifiez vos axes d\'amélioration',
      icon: '📊',
      category: 'Évaluation'
    },
    {
      title: 'Bootcamp Commercial Intensif',
      href: '/bootcamp-commercial-intensif',
      description: 'Formation complète basée sur ces livres de référence',
      icon: '🎯',
      category: 'Formation'
    },
    {
      title: 'Coaching Personnalisé',
      href: '/coach-commercial-entreprise',
      description: 'Accompagnement individuel avec Laurent Serre',
      icon: '👨‍💼',
      category: 'Accompagnement'
    }
  ];

  // Liens spécifiques par catégorie
  const categorySpecificLinks: Record<string, any[]> = {
    'digital-ai': [
      {
        title: 'Transformation Commerciale',
        href: '/transformation-commerciale',
        description: 'Accompagnement dans votre transformation digitale',
        icon: '🚀',
        category: 'Transformation'
      }
    ],
    'sales-management': [
      {
        title: 'Management Équipe Commerciale',
        href: '/management-equipe-commerciale',
        description: 'Expertise spécialisée en management commercial',
        icon: '👥',
        category: 'Management'
      }
    ],
    'prospection-sdr': [
      {
        title: 'Formation Prospection',
        href: '/bootcamp-commercial-intensif',
        description: 'Module spécialisé en techniques de prospection',
        icon: '🎯',
        category: 'Formation'
      }
    ]
  };

  // Combiner les liens principaux et spécifiques
  contextualLinks.push(...mainLinks);
  if (categorySpecificLinks[currentCategory]) {
    contextualLinks.push(...categorySpecificLinks[currentCategory]);
  }

  return contextualLinks;
}

/**
 * Teste la cohérence de l'expérience de navigation
 * @param categories - Liste des catégories à tester
 * @returns Rapport de cohérence
 */
export function testNavigationCoherence(categories: string[]) {
  const report = {
    totalCategories: categories.length,
    categoriesWithSuggestions: 0,
    categoriesWithRules: 0,
    missingBreadcrumbs: [] as string[],
    missingRules: [] as string[],
    coherenceScore: 0
  };

  categories.forEach(category => {
    // Vérifier les breadcrumbs
    if (categoryBreadcrumbSuggestions[category]) {
      report.categoriesWithSuggestions++;
    } else {
      report.missingBreadcrumbs.push(category);
    }

    // Vérifier les règles de suggestions
    if (crossCategorySuggestionRules[category]) {
      report.categoriesWithRules++;
    } else {
      report.missingRules.push(category);
    }
  });

  // Calculer le score de cohérence
  report.coherenceScore = Math.round(
    ((report.categoriesWithSuggestions + report.categoriesWithRules) / (categories.length * 2)) * 100
  );

  return report;
}