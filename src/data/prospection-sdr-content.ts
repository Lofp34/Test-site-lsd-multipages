// Contenu spécialisé pour la catégorie Prospection & SDR
// Basé sur l'expertise terrain de Laurent Serre et les meilleures pratiques

export interface ProspectionInsight {
  title: string;
  description: string;
  businessImpact: string;
  implementationLevel: 'Débutant' | 'Intermédiaire' | 'Avancé';
  keyElements: string[];
  trend: 'rising' | 'stable' | 'declining';
  expertTip: string;
}

export interface ProspectionCaseStudy {
  industry: string;
  companySize: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: {
    leadIncrease: string;
    conversionRate: string;
    roi: string;
    timeframe: string;
  };
  testimonial: string;
}

export interface ProspectionPhase {
  phase: number;
  title: string;
  duration: string;
  description: string;
  keyActions: string[];
  expectedResults: string[];
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  laurentTip: string;
}

export interface ProspectionStatistic {
  label: string;
  value: string;
  context: string;
  source: string;
}

// Insights spécifiques à la prospection
export const prospectionInsights: ProspectionInsight[] = [
  {
    title: "Automatisation Intelligente de la Prospection",
    description: "L'automatisation moderne ne remplace pas l'humain mais démultiplie son efficacité. Les séquences automatisées permettent de maintenir un contact régulier avec des centaines de prospects tout en personnalisant chaque interaction.",
    businessImpact: "Multiplication par 5 du nombre de prospects contactés avec un taux de réponse maintenu à 15-20%",
    implementationLevel: "Intermédiaire",
    keyElements: [
      "Séquences multi-canaux (email, LinkedIn, téléphone)",
      "Personnalisation à l'échelle avec variables dynamiques",
      "Scoring automatique des prospects",
      "Déclencheurs comportementaux"
    ],
    trend: "rising",
    expertTip: "L'erreur classique : automatiser sans personnaliser. Chaque séquence doit inclure au minimum 3 éléments personnalisés par prospect."
  },
  {
    title: "Social Selling Stratégique",
    description: "Le social selling moderne va au-delà du simple contact LinkedIn. Il s'agit de construire une présence d'expert, d'engager des conversations de valeur et de transformer sa visibilité en opportunités commerciales concrètes.",
    businessImpact: "Augmentation de 40% du taux d'acceptation des demandes de connexion et 25% de meetings obtenus",
    implementationLevel: "Avancé",
    keyElements: [
      "Stratégie de contenu expert sur LinkedIn",
      "Engagement authentique sur les publications prospects",
      "Utilisation des Sales Navigator pour le ciblage",
      "Approche consultative dans les messages"
    ],
    trend: "rising",
    expertTip: "Règle des 3C : Connecter, Contribuer, Convertir. Ne vendez jamais dans le premier message, apportez d'abord de la valeur."
  },
  {
    title: "Qualification Prédictive des Leads",
    description: "La qualification moderne utilise des données comportementales et des signaux d'achat pour identifier les prospects les plus susceptibles de convertir, optimisant ainsi l'allocation du temps commercial.",
    businessImpact: "Amélioration de 60% du taux de conversion des leads qualifiés en opportunités",
    implementationLevel: "Avancé",
    keyElements: [
      "Lead scoring basé sur le comportement digital",
      "Analyse des signaux d'intention d'achat",
      "Segmentation dynamique des prospects",
      "Priorisation automatique des actions"
    ],
    trend: "rising",
    expertTip: "Un lead chaud aujourd'hui peut être froid demain. La qualification doit être continue, pas ponctuelle."
  },
  {
    title: "Prospection Account-Based (ABM)",
    description: "L'Account-Based Marketing appliqué à la prospection consiste à cibler spécifiquement les comptes à fort potentiel avec des approches ultra-personnalisées et coordonnées entre marketing et vente.",
    businessImpact: "Taux de conversion 3x supérieur sur les comptes ciblés avec un cycle de vente réduit de 30%",
    implementationLevel: "Avancé",
    keyElements: [
      "Identification des comptes stratégiques",
      "Recherche approfondie des enjeux métier",
      "Approches multi-contacts coordonnées",
      "Contenu personnalisé par compte"
    ],
    trend: "rising",
    expertTip: "Mieux vaut prospecter 10 comptes parfaitement qu'100 comptes superficiellement. La qualité prime sur la quantité."
  }
];

// Cas clients PME spécifiques à la prospection
export const prospectionCaseStudies: ProspectionCaseStudy[] = [
  {
    industry: "Services IT",
    companySize: "25 salariés",
    challenge: "Équipe commerciale de 2 personnes générant seulement 5 leads qualifiés par mois, principalement par bouche-à-oreille. Croissance stagnante et dépendance excessive aux clients existants.",
    solution: "Mise en place d'une stratégie de prospection digitale combinant automatisation email, social selling LinkedIn et qualification prédictive. Formation de l'équipe aux nouvelles techniques de prospection.",
    results: "Passage de 5 à 35 leads qualifiés par mois en 4 mois. Signature de 8 nouveaux clients représentant 180K€ de CA additionnel annuel.",
    metrics: {
      leadIncrease: "+600%",
      conversionRate: "22%",
      roi: "450%",
      timeframe: "4 mois"
    },
    testimonial: "Laurent nous a aidés à structurer notre prospection. Nous générons maintenant plus de leads en une semaine qu'avant en un mois !"
  },
  {
    industry: "Conseil RH",
    companySize: "12 salariés",
    challenge: "Dirigeante seule sur la prospection, submergée par les tâches opérationnelles. Aucun processus structuré, prospection sporadique et inefficace. Carnet de commandes à 2 mois.",
    solution: "Création d'un système de prospection automatisé avec séquences email personnalisées et stratégie LinkedIn. Délégation progressive à une assistante commerciale formée.",
    results: "Pipeline commercial multiplié par 4. Carnet de commandes sécurisé à 6 mois. Libération de 15h/semaine pour la dirigeante.",
    metrics: {
      leadIncrease: "+300%",
      conversionRate: "18%",
      roi: "280%",
      timeframe: "3 mois"
    },
    testimonial: "J'ai enfin un système qui fonctionne sans moi. Ma prospection tourne en automatique et je peux me concentrer sur mes clients."
  },
  {
    industry: "Industrie manufacturière",
    companySize: "45 salariés",
    challenge: "Équipe commerciale de 3 personnes avec des méthodes traditionnelles (salons, appels à froid). Taux de réponse en chute libre, coût d'acquisition client en hausse constante.",
    solution: "Transformation digitale de la prospection avec approche Account-Based Marketing. Ciblage précis des comptes stratégiques et approches ultra-personnalisées.",
    results: "Réduction de 40% du coût d'acquisition client. Signature de 3 comptes majeurs représentant 500K€ de CA. Taux de réponse multiplié par 3.",
    metrics: {
      leadIncrease: "+150%",
      conversionRate: "35%",
      roi: "320%",
      timeframe: "6 mois"
    },
    testimonial: "Nous avons abandonné les méthodes d'un autre siècle. Notre approche ciblée nous permet de décrocher des contrats qu'on n'osait même pas imaginer."
  },
  {
    industry: "Services financiers",
    companySize: "18 salariés",
    challenge: "Réglementation stricte limitant les approches commerciales traditionnelles. Difficulté à générer de la confiance à distance. Cycle de vente très long (12 mois).",
    solution: "Stratégie de social selling axée sur l'expertise et la création de contenu de valeur. Approche consultative avec qualification prédictive pour identifier les moments d'achat.",
    results: "Réduction du cycle de vente à 8 mois. Augmentation de 200% des demandes entrantes. Positionnement d'expert reconnu dans le secteur.",
    metrics: {
      leadIncrease: "+200%",
      conversionRate: "28%",
      roi: "380%",
      timeframe: "5 mois"
    },
    testimonial: "Notre expertise est maintenant reconnue. Les prospects nous contactent directement après avoir suivi nos contenus LinkedIn."
  }
];

// Roadmap d'implémentation en 4 phases
export const prospectionRoadmap: ProspectionPhase[] = [
  {
    phase: 1,
    title: "Audit et Fondations",
    duration: "2-4 semaines",
    description: "Analyse de l'existant et mise en place des bases d'une prospection moderne",
    keyActions: [
      "Audit complet du processus de prospection actuel",
      "Définition des personas et ICP (Ideal Customer Profile)",
      "Mise en place des outils de base (CRM, LinkedIn Sales Navigator)",
      "Formation initiale de l'équipe aux nouvelles méthodes"
    ],
    expectedResults: [
      "Vision claire des axes d'amélioration",
      "Outils opérationnels configurés",
      "Personas et ICP définis",
      "Équipe formée aux bases"
    ],
    difficulty: "Débutant",
    laurentTip: "Cette phase est cruciale. Beaucoup d'entreprises veulent aller trop vite et négligent les fondations. Un bon audit vous fera gagner 6 mois sur la suite."
  },
  {
    phase: 2,
    title: "Automatisation et Séquences",
    duration: "3-6 semaines",
    description: "Création des séquences automatisées et mise en place de la prospection digitale",
    keyActions: [
      "Création des séquences email multi-étapes",
      "Paramétrage des automatisations LinkedIn",
      "Développement des templates personnalisables",
      "Tests A/B sur les messages et objets"
    ],
    expectedResults: [
      "Système de prospection automatisé opérationnel",
      "Génération de 3x plus de contacts qualifiés",
      "Templates personnalisables optimisés",
      "Processus de tests A/B établi"
    ],
    difficulty: "Intermédiaire",
    laurentTip: "L'automatisation sans personnalisation, c'est du spam. Chaque message doit donner l'impression d'être écrit spécifiquement pour le prospect."
  },
  {
    phase: 3,
    title: "Social Selling et Contenu",
    duration: "4-8 semaines",
    description: "Développement de la présence digitale et de la stratégie de contenu expert",
    keyActions: [
      "Optimisation des profils LinkedIn de l'équipe",
      "Création d'un calendrier éditorial expert",
      "Formation aux techniques d'engagement social",
      "Mise en place du lead nurturing par le contenu"
    ],
    expectedResults: [
      "Positionnement d'expert établi",
      "Génération de leads entrants qualifiés",
      "Calendrier éditorial opérationnel",
      "Stratégie de lead nurturing active"
    ],
    difficulty: "Avancé",
    laurentTip: "Le social selling, c'est un marathon, pas un sprint. La régularité dans la création de contenu est plus importante que la perfection."
  },
  {
    phase: 4,
    title: "Optimisation et Scale",
    duration: "Continu",
    description: "Analyse des performances et optimisation continue du système",
    keyActions: [
      "Analyse des métriques et KPIs de prospection",
      "Optimisation des séquences basée sur les données",
      "Formation avancée et coaching individuel",
      "Expansion vers de nouveaux canaux et segments"
    ],
    expectedResults: [
      "Système de prospection mature et évolutif",
      "Flux constant de leads qualifiés généré",
      "Processus d'amélioration continue établi",
      "Expansion réussie vers nouveaux segments"
    ],
    difficulty: "Avancé",
    laurentTip: "La prospection moderne, c'est de l'amélioration continue. Testez, mesurez, ajustez. Les petites optimisations font les grandes différences."
  }
];

// Statistiques et métriques spécifiques à la prospection
export const prospectionStatistics: ProspectionStatistic[] = [
  {
    label: "Taux de réponse email à froid",
    value: "2-5%",
    context: "Moyenne industrie pour les emails de prospection non personnalisés",
    source: "HubSpot Sales Statistics 2024"
  },
  {
    label: "Taux de réponse avec personnalisation",
    value: "15-25%",
    context: "Emails avec recherche préalable et personnalisation avancée",
    source: "Expérience terrain Laurent Serre"
  },
  {
    label: "ROI du Social Selling",
    value: "5.1x",
    context: "Retour sur investissement moyen du social selling vs prospection traditionnelle",
    source: "LinkedIn State of Sales Report 2024"
  },
  {
    label: "Temps de recherche par prospect",
    value: "6-8 min",
    context: "Temps optimal pour rechercher et personnaliser une approche",
    source: "Analyse Laurent Serre"
  },
  {
    label: "Nombre de touchpoints nécessaires",
    value: "8-12",
    context: "Contacts nécessaires en moyenne pour obtenir une réponse en B2B",
    source: "Salesforce Research"
  },
  {
    label: "Taux de conversion lead to opportunity",
    value: "13-20%",
    context: "Avec qualification prédictive et scoring automatisé",
    source: "Marketo Lead Management"
  },
  {
    label: "Réduction cycle de vente",
    value: "25-40%",
    context: "Avec prospection qualifiée et approche consultative",
    source: "Retours clients Laurent Serre"
  },
  {
    label: "Coût par lead qualifié",
    value: "45-120€",
    context: "Coût moyen en B2B avec stratégie digitale optimisée",
    source: "Analyse marché français 2024"
  }
];

// Thème visuel pour la catégorie Prospection
export const prospectionTheme = {
  primaryColor: "#0066CC", // Bleu professionnel
  secondaryColor: "#00A86B", // Vert croissance
  accentColor: "#FF6B35", // Orange énergie
  particleColor: "#E6F3FF", // Bleu très clair
  gradientFrom: "#0066CC",
  gradientTo: "#00A86B"
};