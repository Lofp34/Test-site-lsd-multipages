import { DomainType } from '@/types/book-domains';

// Vision Laurent Serre pour Sales Management & Leadership
export const salesManagementLaurentVision = "En 20 ans d'accompagnement PME, j'ai vu une vérité immuable : les équipes commerciales ne sont jamais meilleures que leur manager. Un commercial moyen avec un excellent manager surperforme toujours un excellent commercial avec un manager médiocre. Le leadership commercial moderne, c'est 30% de technique et 70% d'intelligence émotionnelle. Mes clients qui transforment leurs résultats sont ceux qui comprennent que manager, c'est révéler le potentiel de chacun, pas juste fixer des objectifs. Le secret ? Créer un environnement où l'échec devient apprentissage et où chaque victoire collective nourrit la motivation individuelle.";

// Sales Management Domain Insights
export const salesManagementInsights = [
  {
    title: "Leadership Transformationnel",
    description: "Le leadership moderne combine vision stratégique et accompagnement humain. Les managers performants créent un environnement où chaque commercial peut exprimer son potentiel tout en atteignant les objectifs collectifs.",
    businessImpact: "Amélioration de 40% de l'engagement des équipes et augmentation de 25% des performances commerciales",
    implementationLevel: "Intermédiaire" as const,
    keyElements: ["Vision partagée", "Coaching individuel", "Culture de performance", "Reconnaissance"],
    trend: "rising" as const,
    domainType: "management" as DomainType
  },
  {
    title: "Management par les Données",
    description: "L'utilisation intelligente des KPIs et analytics permet un pilotage précis des équipes commerciales. Les meilleurs managers combinent intuition terrain et analyse factuelle pour prendre les bonnes décisions.",
    businessImpact: "Précision des forecasts à 90% et réduction de 30% du temps de reporting",
    implementationLevel: "Avancé" as const,
    keyElements: ["Tableaux de bord", "KPIs prédictifs", "Analyse comportementale", "Reporting automatisé"],
    trend: "rising" as const,
    domainType: "management" as DomainType
  },
  {
    title: "Culture d'Innovation Commerciale",
    description: "Créer un environnement où l'expérimentation et l'amélioration continue sont encouragées. Les équipes innovantes s'adaptent plus rapidement aux changements du marché et trouvent de nouvelles opportunités.",
    businessImpact: "Augmentation de 50% des nouvelles opportunités et amélioration de 35% de l'adaptabilité",
    implementationLevel: "Avancé" as const,
    keyElements: ["Expérimentation", "Feedback loops", "Amélioration continue", "Partage de bonnes pratiques"],
    trend: "stable" as const,
    domainType: "management" as DomainType
  },
  {
    title: "Développement des Talents",
    description: "Identifier, développer et retenir les talents commerciaux est crucial. Un bon manager sait faire grandir ses équipes en adaptant son style de management à chaque profil et en créant des parcours de développement personnalisés.",
    businessImpact: "Réduction de 60% du turnover et augmentation de 45% des promotions internes",
    implementationLevel: "Intermédiaire" as const,
    keyElements: ["Évaluation des compétences", "Plans de développement", "Mentoring", "Succession planning"],
    trend: "rising" as const,
    domainType: "management" as DomainType
  }
];

// Sales Management Case Studies
export const salesManagementCaseStudies = [
  {
    industry: "SaaS",
    companySize: "45 salariés",
    challenge: "Équipe commerciale démotivée, turnover élevé (40%), objectifs non atteints depuis 6 mois, manque de cohésion d'équipe.",
    solution: "Mise en place d'un leadership transformationnel : vision partagée, coaching individuel hebdomadaire, système de reconnaissance, culture de feedback constructif.",
    results: "Turnover réduit à 8%, dépassement des objectifs de 15%, engagement équipe +65%",
    domainFocus: "management" as DomainType,
    metrics: [
      { metric: "Turnover", value: "-80%", improvement: "De 40% à 8%" },
      { metric: "Objectifs", value: "+15%", improvement: "Dépassement constant" },
      { metric: "Engagement", value: "+65%", improvement: "Score NPS interne" }
    ],
    timeline: "6 mois",
    testimonial: "Laurent a transformé notre culture managériale. Nos commerciaux sont maintenant acteurs de leur réussite.",
    clientName: "Directeur Commercial, SaaS B2B"
  },
  {
    industry: "Services",
    companySize: "30 salariés",
    challenge: "Manque de visibilité sur les performances, décisions basées sur l'intuition, forecasts imprécis, équipe en silo.",
    solution: "Implémentation d'un management par les données : tableaux de bord temps réel, KPIs prédictifs, rituels de pilotage, formation à l'analyse.",
    results: "Précision forecasts +70%, temps de reporting -50%, collaboration +40%",
    domainFocus: "management" as DomainType,
    metrics: [
      { metric: "Forecasts", value: "90%", improvement: "Précision atteinte" },
      { metric: "Reporting", value: "-50%", improvement: "Temps économisé" },
      { metric: "Collaboration", value: "+40%", improvement: "Score équipe" }
    ],
    timeline: "4 mois",
    testimonial: "Nous pilotons enfin avec des données fiables. Nos décisions sont plus rapides et plus justes.",
    clientName: "CEO, Cabinet de conseil"
  },
  {
    industry: "Industrie",
    companySize: "120 salariés",
    challenge: "Résistance au changement, processus figés, innovation commerciale faible, concurrence agressive.",
    solution: "Création d'une culture d'innovation : labs commerciaux, expérimentations contrôlées, partage de bonnes pratiques, reconnaissance de l'innovation.",
    results: "Nouvelles opportunités +60%, adaptabilité +45%, satisfaction client +30%",
    domainFocus: "management" as DomainType,
    metrics: [
      { metric: "Innovation", value: "+60%", improvement: "Nouvelles opportunités" },
      { metric: "Adaptabilité", value: "+45%", improvement: "Réactivité marché" },
      { metric: "Satisfaction", value: "+30%", improvement: "NPS client" }
    ],
    timeline: "8 mois",
    testimonial: "Nos équipes proposent maintenant des solutions que nos concurrents n'imaginent même pas.",
    clientName: "Directeur Général, Équipementier industriel"
  },
  {
    industry: "Distribution",
    companySize: "60 salariés",
    challenge: "Talents commerciaux non identifiés, pas de plan de développement, promotions externes systématiques, démotivation.",
    solution: "Programme de développement des talents : évaluation 360°, plans individuels, mentoring interne, parcours de carrière formalisés.",
    results: "Promotions internes +80%, performance individuelle +35%, rétention +70%",
    domainFocus: "management" as DomainType,
    metrics: [
      { metric: "Promotions", value: "80%", improvement: "Internes vs externes" },
      { metric: "Performance", value: "+35%", improvement: "Moyenne équipe" },
      { metric: "Rétention", value: "+70%", improvement: "Talents clés" }
    ],
    timeline: "12 mois",
    testimonial: "Nos meilleurs éléments restent et grandissent chez nous. C'est un cercle vertueux.",
    clientName: "DRH, Distributeur spécialisé"
  }
];

// Sales Management Implementation Roadmap
export const salesManagementRoadmap = [
  {
    phase: 1,
    title: "Diagnostic & Fondations (Mois 1-2)",
    description: "Évaluer l'état actuel du management commercial et poser les bases d'une transformation durable.",
    duration: "2 mois",
    keyActions: [
      "Audit 360° du style de management actuel",
      "Évaluation des compétences de l'équipe",
      "Définition de la vision et des valeurs",
      "Mise en place des premiers rituels managériaux"
    ],
    successMetrics: [
      "Diagnostic complet réalisé",
      "Vision partagée définie",
      "Premiers rituels en place",
      "Adhésion équipe mesurée"
    ],
    laurentAdvice: "Ne négligez pas cette phase de diagnostic. Un bon manager doit d'abord comprendre où il en est avant de définir où il veut aller. Prenez le temps d'écouter vraiment votre équipe.",
    difficulty: "Facile" as const
  },
  {
    phase: 2,
    title: "Leadership & Communication (Mois 3-4)",
    description: "Développer son style de leadership et mettre en place une communication efficace avec l'équipe.",
    duration: "2 mois",
    keyActions: [
      "Formation au leadership situationnel",
      "Mise en place des one-to-one réguliers",
      "Développement de la communication d'équipe",
      "Création d'un système de feedback"
    ],
    successMetrics: [
      "Style de leadership adapté à chaque profil",
      "One-to-one hebdomadaires effectifs",
      "Communication d'équipe fluide",
      "Feedback régulier et constructif"
    ],
    laurentAdvice: "Le leadership ne s'improvise pas. Adaptez votre style à chaque collaborateur : certains ont besoin de cadre, d'autres d'autonomie. L'art du manager est de savoir jongler entre ces approches.",
    difficulty: "Modéré" as const,
    prerequisites: ["Diagnostic réalisé", "Vision définie"]
  },
  {
    phase: 3,
    title: "Performance & Développement (Mois 5-6)",
    description: "Optimiser les performances individuelles et collectives tout en développant les talents de l'équipe.",
    duration: "2 mois",
    keyActions: [
      "Implémentation d'un système de KPIs",
      "Création de plans de développement individuels",
      "Mise en place du coaching commercial",
      "Développement de la culture de performance"
    ],
    successMetrics: [
      "KPIs pertinents et suivis",
      "Plans de développement actifs",
      "Sessions de coaching régulières",
      "Performance équipe en progression"
    ],
    laurentAdvice: "La performance sans développement mène à l'épuisement. La clé est de créer un cercle vertueux où la montée en compétences alimente naturellement les résultats.",
    difficulty: "Modéré" as const,
    prerequisites: ["Leadership établi", "Communication fluide"]
  },
  {
    phase: 4,
    title: "Excellence & Innovation (Mois 7+)",
    description: "Atteindre l'excellence managériale et créer une culture d'innovation continue au sein de l'équipe.",
    duration: "Continu",
    keyActions: [
      "Optimisation continue des processus",
      "Développement de l'innovation commerciale",
      "Création d'une culture d'amélioration continue",
      "Partage des bonnes pratiques"
    ],
    successMetrics: [
      "Processus optimisés en continu",
      "Innovations commerciales régulières",
      "Culture d'amélioration ancrée",
      "Bonnes pratiques partagées"
    ],
    laurentAdvice: "L'excellence managériale n'est jamais acquise. Restez humble, continuez à apprendre et n'oubliez jamais que votre rôle est de révéler le potentiel de chacun de vos collaborateurs.",
    difficulty: "Difficile" as const,
    prerequisites: ["Performance établie", "Équipe développée", "Culture de feedback"]
  }
];

// Sales Management Domain Statistics
export const salesManagementStats = [
  {
    label: "des équipes bien managées",
    value: "85%",
    description: "dépassent leurs objectifs",
    trend: "up" as const,
    source: "Harvard Business Review",
    icon: "🎯"
  },
  {
    label: "d'amélioration",
    value: "40%",
    description: "de la performance avec un bon leadership",
    trend: "up" as const,
    source: "Gallup",
    icon: "📈"
  },
  {
    label: "de réduction",
    value: "60%",
    description: "du turnover avec un management de qualité",
    trend: "up" as const,
    source: "McKinsey",
    icon: "👥"
  },
  {
    label: "des commerciaux",
    value: "70%",
    description: "quittent à cause du management",
    trend: "stable" as const,
    source: "Sales Management Association",
    icon: "⚠️"
  }
];