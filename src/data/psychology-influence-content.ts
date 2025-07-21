// Contenu spécialisé pour la catégorie Psychologie & Influence

export interface PsychologyInsight {
  title: string;
  description: string;
  businessImpact: string;
  implementationLevel: 'Débutant' | 'Intermédiaire' | 'Avancé';
  keyElements: string[];
  trend: 'rising' | 'stable' | 'declining';
  psychologyPrinciples: string[];
}

export interface PsychologyCaseStudy {
  industry: string;
  companySize: string;
  challenge: string;
  psychologyApproach: string;
  results: string;
  metrics: {
    conversionRate?: string;
    customerSatisfaction?: string;
    salesCycleReduction?: string;
    teamPerformance?: string;
  };
}

export interface PsychologyImplementationPhase {
  phase: number;
  title: string;
  duration: string;
  description: string;
  keyActions: string[];
  expectedResults: string[];
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  laurentTip: string;
}

// Vision Laurent Serre sur la psychologie commerciale
export const laurentSerreVision = "La vente, c'est 20% de technique et 80% de psychologie. Comprendre les biais cognitifs de vos prospects, c'est comme avoir les réponses avant l'examen. Mes clients qui maîtrisent ces principes doublent leur taux de conversion. Mais attention : il y a une différence fondamentale entre influence et manipulation. L'influence éthique crée de la valeur pour les deux parties, la manipulation ne profite qu'à une seule. Après 20 ans de terrain, je peux vous dire que les techniques psychologiques les plus puissantes sont aussi les plus simples : écouter vraiment, comprendre les motivations profondes, et adapter son discours aux modes de pensée de chacun.";

// Insights spécifiques à la psychologie commerciale
export const psychologyInsights: PsychologyInsight[] = [
  {
    title: "Réciprocité : Le Pouvoir du Don",
    description: "Le principe de réciprocité est l'un des plus puissants en vente B2B. Quand vous donnez quelque chose de valeur en premier (conseil, audit, contenu expert), vous créez un sentiment de dette psychologique qui pousse naturellement à la réciprocité. En PME, cela se traduit par des audits gratuits, des conseils personnalisés ou du contenu exclusif.",
    businessImpact: "Augmentation de 180% du taux de réponse en prospection et amélioration de 65% de la qualité des premiers rendez-vous",
    implementationLevel: "Débutant",
    keyElements: [
      "Audit gratuit personnalisé",
      "Conseils experts sans contrepartie immédiate",
      "Contenu exclusif adapté aux enjeux client",
      "Mise en relation avec des partenaires utiles",
      "Partage d'insights sectoriels"
    ],
    trend: "rising",
    psychologyPrinciples: ["Obligation de réciprocité", "Dette psychologique", "Échange social"]
  },
  {
    title: "Preuve Sociale : L'Influence des Pairs",
    description: "Nous imitons naturellement les comportements de nos pairs, surtout en situation d'incertitude. En B2B, les témoignages d'entreprises similaires (même secteur, même taille) sont infiniment plus persuasifs que les arguments produit. La preuve sociale réduit le risque perçu et accélère la prise de décision.",
    businessImpact: "Multiplication par 3 du taux de conversion et réduction de 45% du cycle de vente moyen",
    implementationLevel: "Débutant",
    keyElements: [
      "Témoignages clients du même secteur",
      "Études de cas avec métriques précises",
      "Références d'entreprises de taille similaire",
      "Logos clients visibles et pertinents",
      "Statistiques d'adoption par les pairs"
    ],
    trend: "stable",
    psychologyPrinciples: ["Conformité sociale", "Réduction d'incertitude", "Validation par les pairs"]
  },
  {
    title: "Autorité : La Crédibilité qui Influence",
    description: "Nous obéissons naturellement aux figures d'autorité légitimes. En vente B2B, établir son expertise et sa crédibilité influence positivement les décisions d'achat. L'autorité se construit par l'expertise démontrée, les références, les certifications, et la reconnaissance sectorielle.",
    businessImpact: "Augmentation de 120% de la confiance client et réduction de 50% des objections sur la crédibilité",
    implementationLevel: "Intermédiaire",
    keyElements: [
      "Expertise sectorielle reconnue",
      "Certifications et formations",
      "Publications et interventions",
      "Recommandations LinkedIn",
      "Témoignages de leaders d'opinion"
    ],
    trend: "rising",
    psychologyPrinciples: ["Soumission à l'autorité", "Heuristique d'expertise", "Transfert de crédibilité"]
  },
  {
    title: "Rareté : L'Urgence qui Décide",
    description: "Nous valorisons davantage ce qui est rare ou limité dans le temps. En B2B, créer une urgence légitime (places limitées, offre temporaire, fenêtre d'opportunité) accélère la prise de décision. Attention : la rareté doit être authentique pour rester éthique.",
    businessImpact: "Accélération de 60% de la prise de décision et augmentation de 35% du taux de signature",
    implementationLevel: "Avancé",
    keyElements: [
      "Offres à durée limitée authentiques",
      "Places limitées en formation",
      "Fenêtres d'opportunité business",
      "Exclusivité sectorielle ou géographique",
      "Conditions tarifaires temporaires"
    ],
    trend: "stable",
    psychologyPrinciples: ["Aversion à la perte", "FOMO (Fear of Missing Out)", "Valeur perçue"]
  }
];

// Cas clients PME spécifiques à la psychologie
export const psychologyCaseStudies: PsychologyCaseStudy[] = [
  {
    industry: "E-commerce B2B",
    companySize: "PME - 35 salariés",
    challenge: "Plateforme e-commerce avec un taux de conversion très faible (2,1%) malgré un trafic qualifié important. Les visiteurs consultent mais n'achètent pas. Équipe commerciale démunie face aux objections 'je vais réfléchir'.",
    psychologyApproach: "Implémentation massive de la preuve sociale : témoignages clients visibles, compteurs d'achat en temps réel, logos d'entreprises clientes, avis détaillés avec photos. Formation de l'équipe aux techniques de Cialdini pour créer l'urgence légitime.",
    results: "Transformation complète de l'expérience utilisateur avec focus sur la réassurance sociale et la réduction du risque perçu. Mise en place d'un système de témoignages automatisé et d'indicateurs de popularité.",
    metrics: {
      conversionRate: "+120% (2,1% → 4,6%)",
      customerSatisfaction: "+45% (NPS: 28 → 41)",
      salesCycleReduction: "-25% (3 semaines → 2,2 semaines)",
      teamPerformance: "+85% d'atteinte des objectifs"
    }
  },
  {
    industry: "Formation Professionnelle",
    companySize: "PME - 28 salariés",
    challenge: "Organisme de formation avec une excellente réputation mais des difficultés à convertir les prospects en inscriptions. Taux de conversion de 12% malgré des contenus de qualité. Concurrence prix agressive.",
    psychologyApproach: "Développement de l'autorité expertise : publications LinkedIn, interventions en conférences, certifications visibles. Application du principe d'autorité de Cialdini avec mise en avant des credentials et témoignages de leaders d'opinion.",
    results: "Positionnement expert renforcé avec création d'un écosystème de crédibilité. Les prospects arrivent déjà convaincus de l'expertise, la vente devient une formalité.",
    metrics: {
      conversionRate: "+80% (12% → 21,6%)",
      customerSatisfaction: "+55% (NPS: 35 → 54)",
      salesCycleReduction: "-40% (6 semaines → 3,6 semaines)",
      teamPerformance: "+95% d'atteinte des objectifs"
    }
  },
  {
    industry: "Conseil en Management",
    companySize: "PME - 18 salariés",
    challenge: "Cabinet de conseil avec une approche très technique mais un taux de réponse en prospection de seulement 3%. Difficultés à créer le premier contact et à obtenir des rendez-vous qualifiés.",
    psychologyApproach: "Application massive du principe de réciprocité : création d'audits gratuits personnalisés, partage d'insights sectoriels exclusifs, mise en relation avec des partenaires utiles. Formation de l'équipe aux techniques de Carnegie pour créer des relations authentiques.",
    results: "Transformation de l'approche prospection avec focus sur le don avant la demande. Création d'un système d'audits gratuits qui génère naturellement des opportunités commerciales.",
    metrics: {
      conversionRate: "+200% (3% → 9%)",
      customerSatisfaction: "+70% (NPS: 25 → 43)",
      salesCycleReduction: "-30% (4 mois → 2,8 mois)",
      teamPerformance: "+120% d'atteinte des objectifs"
    }
  },
  {
    industry: "Solutions Tech B2B",
    companySize: "PME - 52 salariés",
    challenge: "Éditeur de logiciel avec des cycles de vente très longs (8 mois) et un taux de signature de 18%. Les prospects traînent dans la décision malgré un besoin identifié. Concurrence forte sur un marché mature.",
    psychologyApproach: "Utilisation éthique du principe de rareté : création d'offres à durée limitée authentiques, places limitées en formation, conditions tarifaires temporaires liées aux budgets annuels. Formation aux techniques d'urgence légitime.",
    results: "Accélération significative des prises de décision avec création d'un sentiment d'urgence authentique. Les prospects passent à l'action plus rapidement sans pression agressive.",
    metrics: {
      conversionRate: "+45% (18% → 26%)",
      customerSatisfaction: "+35% (NPS: 42 → 57)",
      salesCycleReduction: "-60% (8 mois → 3,2 mois)",
      teamPerformance: "+75% d'atteinte des objectifs"
    }
  }
];

// Feuille de route d'implémentation progressive
export const psychologyImplementationRoadmap: PsychologyImplementationPhase[] = [
  {
    phase: 1,
    title: "Fondamentaux - Bases Psychologiques",
    duration: "1-2 semaines",
    description: "Acquisition des bases théoriques et identification des leviers psychologiques les plus pertinents pour votre contexte PME. Focus sur la compréhension des 6 principes de Cialdini et des biais cognitifs majeurs.",
    keyActions: [
      "Formation équipe aux 6 principes de Cialdini (réciprocité, cohérence, preuve sociale, autorité, sympathie, rareté)",
      "Audit des pratiques commerciales actuelles sous l'angle psychologique",
      "Identification des biais cognitifs récurrents de vos clients types",
      "Création d'un référentiel de témoignages et preuves sociales",
      "Mise en place d'indicateurs de mesure de l'influence"
    ],
    practicalTips: [
      "Commencez par lire 'Influence' de Cialdini en équipe (1 chapitre/semaine)",
      "Observez vos clients actuels : quels sont leurs déclencheurs d'achat ?",
      "Collectez systématiquement les témoignages et success stories",
      "Créez une 'bibliothèque d'influence' avec vos meilleures preuves sociales"
    ],
    pitfallsToAvoid: [
      "Vouloir manipuler plutôt qu'influencer de manière éthique",
      "Appliquer les techniques sans comprendre la psychologie sous-jacente",
      "Négliger l'importance de l'authenticité dans l'influence",
      "Oublier que l'influence doit créer de la valeur mutuelle"
    ],
    expectedResults: [
      "Compréhension claire des mécanismes d'influence",
      "Diagnostic des forces/faiblesses actuelles",
      "Référentiel de témoignages constitué",
      "Plan d'action personnalisé validé"
    ],
    successMetrics: [
      "100% de l'équipe formée aux 6 principes de Cialdini",
      "Audit psychologique des pratiques actuelles réalisé",
      "Référentiel de 20+ témoignages clients constitué",
      "Plan d'action personnalisé par principe validé"
    ],
    difficulty: "Débutant",
    laurentTip: "Ne brûlez pas les étapes ! La psychologie commerciale, c'est comme apprendre une langue : il faut d'abord maîtriser les bases avant de vouloir faire des phrases complexes. Commencez par observer vos clients actuels : quels sont leurs biais récurrents ? Leurs motivations cachées ? Cette phase d'observation est cruciale pour la suite."
  },
  {
    phase: 2,
    title: "Mise en pratique - Application Ciblée",
    duration: "1 mois",
    description: "Application progressive des techniques psychologiques dans vos interactions commerciales quotidiennes. Expérimentation contrôlée avec mesure des résultats pour identifier ce qui fonctionne le mieux dans votre contexte.",
    keyActions: [
      "Implémentation systématique du principe de réciprocité en prospection",
      "Développement et déploiement de la preuve sociale (témoignages, références)",
      "Renforcement de l'autorité expertise (contenu, certifications, publications)",
      "Tests A/B sur les techniques d'influence par canal (email, téléphone, face-à-face)",
      "Formation pratique avec jeux de rôle et mise en situation"
    ],
    practicalTips: [
      "Testez une technique à la fois pendant 1 semaine avant de passer à la suivante",
      "Créez des templates d'emails intégrant les principes psychologiques",
      "Mesurez systématiquement les taux de réponse et de conversion",
      "Partagez les succès en équipe pour maintenir la motivation"
    ],
    pitfallsToAvoid: [
      "Vouloir tout appliquer en même temps sans mesurer les résultats",
      "Forcer l'application des techniques sans adaptation au contexte",
      "Négliger le feedback des clients sur votre nouvelle approche",
      "Abandonner une technique après un premier échec"
    ],
    expectedResults: [
      "Amélioration mesurable des performances commerciales",
      "Maîtrise des techniques psychologiques de base",
      "Augmentation du taux de réponse en prospection",
      "Réduction des objections classiques"
    ],
    successMetrics: [
      "Amélioration de 40% du taux de réponse en prospection",
      "Augmentation de 25% de la qualité des premiers RDV",
      "Réduction de 20% des objections classiques",
      "80% de l'équipe applique au moins 3 principes de façon autonome"
    ],
    difficulty: "Intermédiaire",
    laurentTip: "C'est là que ça devient concret ! Mes clients qui réussissent le mieux sont ceux qui testent une technique à la fois. Par exemple, commencez par la réciprocité : offrez un audit gratuit pendant 2 semaines et mesurez l'impact. Puis passez à la preuve sociale. L'erreur classique, c'est de vouloir tout appliquer en même temps."
  },
  {
    phase: 3,
    title: "Optimisation - Personnalisation Avancée",
    duration: "2-3 mois",
    description: "Affinage des techniques en fonction des retours terrain et personnalisation par type de client. Développement d'une approche psychologique sophistiquée adaptée aux spécificités de votre marché et de vos personas.",
    keyActions: [
      "Segmentation psychologique fine de votre clientèle par persona",
      "Personnalisation des approches d'influence par type de décideur",
      "Développement d'outils d'aide à la vente psychologique (guides, checklists)",
      "Formation avancée aux biais cognitifs de Kahneman et Tversky",
      "Mise en place de processus d'amélioration continue et de partage d'expériences"
    ],
    practicalTips: [
      "Créez des 'profils psychologiques' pour vos 3-5 personas principales",
      "Développez des scripts adaptés à chaque profil psychologique",
      "Formez vos commerciaux à identifier rapidement le profil de leur interlocuteur",
      "Organisez des sessions de retour d'expérience hebdomadaires"
    ],
    pitfallsToAvoid: [
      "Créer des profils trop complexes et inapplicables sur le terrain",
      "Stéréotyper les clients sans tenir compte de leur individualité",
      "Négliger la formation continue de l'équipe aux nouvelles techniques",
      "Oublier de mesurer l'impact sur la satisfaction client"
    ],
    expectedResults: [
      "Approche psychologique sophistiquée et personnalisée",
      "Impact business significatif mesurable",
      "Segmentation client optimisée",
      "Processus d'amélioration continue établi"
    ],
    successMetrics: [
      "Doublement du taux de conversion moyen",
      "Réduction de 35% du cycle de vente",
      "Amélioration de 50% de la satisfaction client (NPS)",
      "Équipe capable d'adapter son approche à 90% des profils clients"
    ],
    difficulty: "Avancé",
    laurentTip: "Ici, on passe au niveau expert. Vous devez comprendre que chaque client a ses propres biais cognitifs. Un dirigeant de PME industrielle ne fonctionne pas comme un DG de startup tech. Créez des 'profils psychologiques' de vos personas et adaptez votre approche. C'est ce qui fait la différence entre un bon commercial et un expert en influence."
  },
  {
    phase: 4,
    title: "Maîtrise - Leadership d'Influence",
    duration: "6 mois et plus",
    description: "Développement d'une expertise reconnue en psychologie commerciale. Capacité à former d'autres commerciaux et à créer une culture d'entreprise basée sur l'influence éthique. Positionnement en tant qu'expert du secteur.",
    keyActions: [
      "Création de contenus experts sur la psychologie commerciale (articles, vidéos, conférences)",
      "Formation d'autres commerciaux et entreprises aux techniques avancées",
      "Développement de partenariats stratégiques basés sur l'expertise psychologique",
      "Mise en place d'un système de mentorat interne et externe",
      "Publication et partage d'expériences sectorielles pour asseoir son autorité"
    ],
    practicalTips: [
      "Publiez régulièrement sur LinkedIn vos insights en psychologie commerciale",
      "Proposez des formations ou conférences à vos partenaires/clients",
      "Créez un programme de certification interne en influence éthique",
      "Développez des études de cas détaillées de vos succès"
    ],
    pitfallsToAvoid: [
      "Devenir arrogant ou manipulateur avec l'expertise acquise",
      "Négliger l'éthique au profit de l'efficacité",
      "Oublier de continuer à apprendre et se renouveler",
      "Ne pas partager ses connaissances avec son équipe"
    ],
    expectedResults: [
      "Expertise reconnue et avantage concurrentiel durable",
      "Positionnement en tant qu'expert du secteur",
      "Culture d'entreprise basée sur l'influence éthique",
      "Capacité à former d'autres commerciaux"
    ],
    successMetrics: [
      "Reconnaissance en tant qu'expert sectoriel (invitations, publications)",
      "Multiplication par 3 des opportunités inbound qualifiées",
      "Création d'un avantage concurrentiel durable et défendable",
      "Équipe devenue référence en influence éthique sur son marché"
    ],
    difficulty: "Avancé",
    laurentTip: "À ce niveau, vous ne vendez plus : vous influencez. Vos prospects viennent à vous parce qu'ils reconnaissent votre expertise. C'est le Graal ! Mais attention : avec le pouvoir vient la responsabilité. Utilisez toujours ces techniques de manière éthique. Votre réputation est votre plus grand actif. En PME, cette expertise en influence peut devenir votre signature distinctive."
  }
];

// Statistiques et métriques spécifiques à la psychologie commerciale
export const psychologyStats = {
  adoptionRate: "2x",
  adoptionDescription: "plus de conversions avec psychologie appliquée",
  performanceGain: "95%",
  performanceDescription: "des décisions sont émotionnelles",
  satisfactionImprovement: "6",
  satisfactionDescription: "principes universels d'influence",
  cycleReduction: "65%",
  cycleDescription: "d'amélioration de la satisfaction client"
};

// Thème visuel spécifique à la psychologie
export const psychologyTheme = {
  primaryColor: "#8B5CF6", // Violet
  secondaryColor: "#EC4899", // Rose
  accentColor: "#F59E0B", // Orange pour les highlights
  particleColor: "#8B5CF6",
  gradientFrom: "#8B5CF6",
  gradientTo: "#EC4899"
};