// Contenu spécialisé pour la catégorie Méthodes & Process

export interface MethodsInsight {
  title: string;
  description: string;
  businessImpact: string;
  implementationLevel: 'Débutant' | 'Intermédiaire' | 'Avancé';
  keyElements: string[];
  trend: 'rising' | 'stable' | 'declining';
  methodologyType: string;
}

export interface MethodsCaseStudy {
  industry: string;
  companySize: string;
  challenge: string;
  methodologyApplied: string;
  results: string;
  metrics: {
    conversionRate?: string;
    cycleReduction?: string;
    dealQuality?: string;
    teamPerformance?: string;
  };
  timeline: string;
  businessImpact: string;
}

export interface MethodsImplementationPhase {
  phase: number;
  title: string;
  duration: string;
  description: string;
  keyActions: string[];
  expectedResults: string[];
  laurentAdvice: string;
}

// Vision Laurent Serre sur les méthodes de vente
export const methodsProcessesLaurentVision = "Une méthode de vente, c'est comme un GPS : ça vous évite de vous perdre et ça vous fait arriver plus vite à destination. Après 20 ans de terrain, j'ai vu trop de commerciaux improviser leurs entretiens et perdre des deals par manque de structure. Les méthodes comme SPIN, Challenger ou Gap Selling ne sont pas de la théorie : ce sont des frameworks éprouvés qui transforment vos conversations commerciales en processus prévisibles et reproductibles. Mes clients PME qui appliquent ces méthodes augmentent leur taux de closing de 60% en moyenne. Le secret ? Choisir LA méthode qui correspond à votre contexte et la maîtriser parfaitement plutôt que de papillonner entre plusieurs approches.";

// Insights spécifiques aux méthodes de vente
export const methodsProcessesInsights: MethodsInsight[] = [
  {
    title: "SPIN Selling : La Méthode de Questionnement Structuré",
    description: "SPIN (Situation, Problem, Implication, Need-payoff) révolutionne l'approche commerciale en remplaçant l'argumentaire par le questionnement intelligent. Cette méthode transforme le commercial en consultant qui guide le client vers la prise de conscience de ses besoins réels.",
    businessImpact: "Augmentation de 70% du taux de closing et amélioration de 85% de la qualité des découvertes client",
    implementationLevel: "Intermédiaire",
    keyElements: [
      "Questions de Situation pour comprendre le contexte",
      "Questions de Problème pour identifier les difficultés",
      "Questions d'Implication pour amplifier la douleur",
      "Questions Need-payoff pour faire exprimer la valeur"
    ],
    trend: "stable",
    methodologyType: "Questionnement structuré"
  },
  {
    title: "Challenger Sale : Enseigner, Personnaliser, Contrôler",
    description: "La méthode Challenger transforme le commercial en expert qui apporte des insights inédits au client. Plutôt que de s'adapter aux demandes, le Challenger éduque le client sur des opportunités qu'il n'avait pas identifiées, créant ainsi de la valeur unique.",
    businessImpact: "Multiplication par 2,3 des performances commerciales et positionnement premium sur 90% des deals",
    implementationLevel: "Avancé",
    keyElements: [
      "Teach : Apporter des insights business inédits",
      "Tailor : Personnaliser selon les enjeux spécifiques",
      "Take Control : Diriger la conversation commerciale",
      "Commercial Insight : Révéler des angles morts"
    ],
    trend: "rising",
    methodologyType: "Vente consultative avancée"
  },
  {
    title: "Gap Selling : Combler l'Écart Actuel-Futur",
    description: "Gap Selling se concentre sur l'identification précise de l'écart entre la situation actuelle du client et sa situation idéale. Cette méthode approfondit la découverte pour créer une urgence authentique basée sur la quantification des enjeux business.",
    businessImpact: "Réduction de 50% des objections de prix et amélioration de 65% de la justification ROI",
    implementationLevel: "Intermédiaire",
    keyElements: [
      "Current State : Diagnostic exhaustif de l'existant",
      "Future State : Vision claire de l'objectif",
      "Gap Analysis : Quantification de l'écart",
      "Impact Assessment : Coût de l'inaction"
    ],
    trend: "rising",
    methodologyType: "Diagnostic business"
  },
  {
    title: "Solution Selling : De la Douleur à la Solution",
    description: "Solution Selling structure l'approche commerciale autour de la résolution de problèmes business. Cette méthode transforme le commercial en médecin qui diagnostique avant de prescrire, créant une relation de confiance basée sur l'expertise.",
    businessImpact: "Amélioration de 80% de la satisfaction client et augmentation de 45% des ventes additionnelles",
    implementationLevel: "Débutant",
    keyElements: [
      "Pain Discovery : Identification des douleurs business",
      "Solution Development : Co-construction de la réponse",
      "Value Proposition : Quantification des bénéfices",
      "Proof of Concept : Validation de la solution"
    ],
    trend: "stable",
    methodologyType: "Résolution de problèmes"
  }
];

// Cas clients PME spécifiques aux méthodes de vente
export const methodsProcessesCaseStudies: MethodsCaseStudy[] = [
  {
    industry: "PME Services IT",
    companySize: "42 salariés",
    challenge: "Équipe commerciale qui présentait trop vite ses solutions sans comprendre les vrais enjeux clients. Taux de closing de 15% malgré des produits de qualité. Cycles de vente longs et imprévisibles.",
    methodologyApplied: "Implémentation complète de SPIN Selling avec formation intensive de l'équipe aux 4 types de questions. Création de guides de questionnement par persona client et mise en place d'un processus de découverte structuré.",
    results: "Transformation radicale de l'approche commerciale avec focus sur la découverte avant la présentation. L'équipe maîtrise maintenant l'art du questionnement et guide naturellement les clients vers la prise de conscience de leurs besoins.",
    metrics: {
      conversionRate: "+120% (15% → 33%)",
      cycleReduction: "-35% (4 mois → 2,6 mois)",
      dealQuality: "+90% (satisfaction client)",
      teamPerformance: "+85% d'atteinte des objectifs"
    },
    timeline: "3 mois de transformation",
    businessImpact: "Augmentation de 450k€ du CA annuel avec la même équipe"
  },
  {
    industry: "PME Industrie",
    companySize: "68 salariés",
    challenge: "Concurrence prix agressive sur un marché mature. Difficultés à justifier la valeur ajoutée face à des clients focalisés sur le coût. Positionnement 'me-too' sans différenciation claire.",
    methodologyApplied: "Adoption de la méthode Challenger avec développement d'insights sectoriels uniques. Formation de l'équipe à challenger les idées reçues des clients et à apporter une vision business différenciante.",
    results: "Repositionnement complet en tant qu'expert conseil avec des insights business qui transforment la perception client. L'équipe apporte maintenant de la valeur dès le premier contact et se différencie clairement de la concurrence.",
    metrics: {
      conversionRate: "+95% (18% → 35%)",
      cycleReduction: "-25% (6 mois → 4,5 mois)",
      dealQuality: "+150% (marges préservées)",
      teamPerformance: "+110% d'atteinte des objectifs"
    },
    timeline: "4 mois de transformation",
    businessImpact: "Préservation de 320k€ de marge annuelle et positionnement premium"
  },
  {
    industry: "PME Conseil",
    companySize: "25 salariés",
    challenge: "Prestations intellectuelles difficiles à valoriser. Clients qui ne comprennent pas toujours la valeur des recommandations. Justification ROI complexe sur des missions de conseil.",
    methodologyApplied: "Mise en place de Gap Selling avec quantification systématique de l'écart entre situation actuelle et objectifs client. Développement d'outils de mesure d'impact et de ROI prévisionnels.",
    results: "Capacité à quantifier précisément la valeur des missions de conseil et à créer une urgence authentique basée sur le coût de l'inaction. Les clients comprennent maintenant parfaitement l'enjeu business.",
    metrics: {
      conversionRate: "+75% (22% → 38,5%)",
      cycleReduction: "-40% (3 mois → 1,8 mois)",
      dealQuality: "+65% (taille moyenne des missions)",
      teamPerformance: "+95% d'atteinte des objectifs"
    },
    timeline: "2,5 mois de transformation",
    businessImpact: "Augmentation de 280k€ du CA annuel et amélioration de la rentabilité"
  },
  {
    industry: "PME Distribution",
    companySize: "35 salariés",
    challenge: "Approche commerciale trop produit-centrée. Équipe qui connaît parfaitement les caractéristiques techniques mais peine à créer le lien avec les enjeux business des clients.",
    methodologyApplied: "Formation complète à Solution Selling avec focus sur l'identification des douleurs business avant la présentation produit. Développement d'une approche consultative structurée.",
    results: "Transformation de l'équipe technique en consultants business qui comprennent les enjeux clients avant de proposer des solutions. Amélioration significative de la relation client et de la satisfaction.",
    metrics: {
      conversionRate: "+60% (20% → 32%)",
      cycleReduction: "-30% (2,5 mois → 1,75 mois)",
      dealQuality: "+85% (satisfaction et fidélisation)",
      teamPerformance: "+75% d'atteinte des objectifs"
    },
    timeline: "3 mois de transformation",
    businessImpact: "Augmentation de 380k€ du CA annuel et amélioration de la fidélisation"
  }
];

// Feuille de route d'implémentation progressive
export const methodsProcessesRoadmap: MethodsImplementationPhase[] = [
  {
    phase: 1,
    title: "Diagnostic - Choix de la Méthode",
    duration: "1-2 semaines",
    description: "Analyse de votre contexte commercial actuel et sélection de la méthode la plus adaptée à votre marché, vos clients et votre équipe. Audit des pratiques existantes et identification des axes d'amélioration prioritaires.",
    keyActions: [
      "Audit complet des pratiques commerciales actuelles (enregistrements d'appels, analyse des deals perdus)",
      "Analyse des profils clients et de la complexité des cycles de vente",
      "Évaluation du niveau de maturité de l'équipe commerciale",
      "Sélection de la méthode principale (SPIN, Challenger, Gap, Solution) selon le contexte",
      "Définition des objectifs de transformation et des indicateurs de succès"
    ],
    expectedResults: [
      "Diagnostic précis des forces et faiblesses actuelles",
      "Choix éclairé de la méthode la plus adaptée à votre contexte",
      "Plan de transformation personnalisé avec objectifs chiffrés",
      "Adhésion de l'équipe au projet de transformation"
    ],
    laurentAdvice: "Ne tombez pas dans le piège du 'tout-méthode' ! Chaque méthode a ses forces selon le contexte. SPIN excelle pour les ventes complexes, Challenger pour se différencier, Gap pour quantifier la valeur, Solution pour les approches consultatives. Choisissez UNE méthode et maîtrisez-la parfaitement avant d'en explorer d'autres."
  },
  {
    phase: 2,
    title: "Formation - Maîtrise des Fondamentaux",
    duration: "3-4 semaines",
    description: "Formation intensive de l'équipe à la méthode sélectionnée avec focus sur la pratique et la mise en situation. Développement des outils et supports nécessaires à l'application terrain.",
    keyActions: [
      "Formation théorique approfondie à la méthode choisie (concepts, frameworks, outils)",
      "Ateliers pratiques avec jeux de rôle et mise en situation réelle",
      "Création des outils d'aide à la vente (guides de questionnement, grilles d'analyse)",
      "Développement de scripts et d'argumentaires adaptés à la méthode",
      "Mise en place d'un système de coaching et de feedback continu"
    ],
    expectedResults: [
      "Maîtrise théorique et pratique de la méthode par 100% de l'équipe",
      "Outils opérationnels prêts à l'emploi sur le terrain",
      "Premiers résultats mesurables sur les nouvelles approches",
      "Confiance renforcée de l'équipe dans la nouvelle méthode"
    ],
    laurentAdvice: "La formation, c'est comme apprendre à conduire : il faut de la théorie ET de la pratique. Mes clients qui réussissent le mieux organisent des sessions de jeux de rôle hebdomadaires pendant cette phase. N'hésitez pas à enregistrer (avec accord) quelques entretiens pour analyser l'application de la méthode."
  },
  {
    phase: 3,
    title: "Déploiement - Application Terrain",
    duration: "2-3 mois",
    description: "Mise en application progressive de la méthode sur le terrain avec accompagnement rapproché et ajustements en temps réel. Mesure des résultats et optimisation continue des pratiques.",
    keyActions: [
      "Application progressive de la méthode sur les nouveaux prospects",
      "Coaching individuel avec débriefing systématique des entretiens",
      "Ajustement des outils et processus selon les retours terrain",
      "Mesure hebdomadaire des indicateurs de performance (taux de closing, qualité des découvertes)",
      "Partage des bonnes pratiques et des success stories en équipe"
    ],
    expectedResults: [
      "Application autonome de la méthode par 80% de l'équipe",
      "Amélioration mesurable des performances commerciales",
      "Processus commercial standardisé et reproductible",
      "Culture d'amélioration continue installée"
    ],
    laurentAdvice: "C'est la phase critique ! Beaucoup d'équipes abandonnent ici parce que les premiers résultats ne sont pas immédiats. Soyez patient : il faut 6-8 semaines pour qu'une nouvelle méthode devienne naturelle. Mesurez tout, célébrez les petites victoires, et restez focus sur la progression plutôt que sur la perfection."
  },
  {
    phase: 4,
    title: "Optimisation - Excellence Opérationnelle",
    duration: "6 mois et plus",
    description: "Perfectionnement continu de la méthode avec personnalisation avancée par type de client et situation. Développement d'une expertise interne reconnue et formation des nouveaux arrivants.",
    keyActions: [
      "Personnalisation avancée de la méthode par segment client et situation",
      "Développement d'une expertise interne avec création de contenus et formations",
      "Mise en place d'un programme de mentorat pour les nouveaux commerciaux",
      "Veille continue sur les évolutions des méthodes et adaptation aux nouveaux enjeux",
      "Partage d'expérience avec d'autres entreprises et positionnement expert"
    ],
    expectedResults: [
      "Expertise reconnue en méthodes de vente avec avantage concurrentiel durable",
      "Équipe autonome capable de former et coacher les nouveaux arrivants",
      "Processus commercial optimisé et adaptatif selon les évolutions marché",
      "Positionnement d'expert qui attire les talents et les clients"
    ],
    laurentAdvice: "À ce niveau, vous ne suivez plus une méthode : vous l'avez adaptée et personnalisée pour en faire VOTRE méthode. C'est votre signature commerciale ! Mes clients les plus avancés développent même leurs propres frameworks en s'inspirant des méthodes classiques. C'est là que vous créez un véritable avantage concurrentiel."
  }
];

// Statistiques et métriques spécifiques aux méthodes de vente
export const methodsProcessesStats = [
  {
    label: "Amélioration taux de closing",
    value: "+65%",
    description: "Moyenne constatée après implémentation méthode structurée"
  },
  {
    label: "Réduction cycle de vente",
    value: "35%",
    description: "Grâce à la structuration des entretiens"
  },
  {
    label: "Amélioration qualité découverte",
    value: "90%",
    description: "Des besoins clients mieux identifiés et qualifiés"
  },
  {
    label: "Satisfaction équipe commerciale",
    value: "88%",
    description: "Confiance renforcée grâce aux méthodes structurées"
  }
];

// Thème visuel spécifique aux méthodes
export const methodsProcessesTheme = {
  primaryColor: "#3B82F6", // Bleu
  secondaryColor: "#06B6D4", // Cyan
  accentColor: "#F59E0B", // Orange pour les highlights
  particleColor: "#3B82F6",
  gradientFrom: "#3B82F6",
  gradientTo: "#06B6D4"
};