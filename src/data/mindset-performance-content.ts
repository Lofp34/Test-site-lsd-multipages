import { DomainInsightProps } from '@/components/ui/DomainInsight';

// Insights spécifiques au domaine Mindset & Performance
export const mindsetPerformanceInsights: DomainInsightProps[] = [
  {
    title: "État d'esprit de croissance",
    description: "Développer la conviction que les capacités commerciales peuvent s'améliorer par l'effort et l'expérience. Transformer chaque échec en opportunité d'apprentissage et voir les défis comme des occasions de progresser.",
    businessImpact: "Augmentation de 40% de la résilience face aux refus et amélioration de 60% des performances après formation",
    implementationLevel: "Débutant",
    keyElements: ["Mindset fixe vs croissance", "Apprentissage continu", "Résilience aux échecs", "Feedback constructif"],
    trend: "rising",
    icon: "🧠",
    color: "#FF6B35"
  },
  {
    title: "Habitudes de performance",
    description: "Construire des routines quotidiennes qui automatisent les comportements de succès. Créer des systèmes reproductibles pour la prospection, le suivi client et le développement personnel.",
    businessImpact: "Amélioration de 300% de la constance dans l'activité commerciale et gain de 2h/jour de productivité",
    implementationLevel: "Intermédiaire",
    keyElements: ["Atomic Habits", "Routines matinales", "Systèmes vs objectifs", "Environnement optimisé"],
    trend: "rising",
    icon: "⚡",
    color: "#FFB84D"
  },
  {
    title: "Gestion du stress et présence",
    description: "Développer la capacité à rester calme et concentré sous pression. Cultiver la présence authentique en rendez-vous client pour créer des connexions plus profondes et détecter les besoins non exprimés.",
    businessImpact: "Réduction de 50% du stress commercial et amélioration de 35% de la qualité des relations client",
    implementationLevel: "Intermédiaire",
    keyElements: ["Mindfulness", "Gestion émotionnelle", "Présence authentique", "Techniques de respiration"],
    trend: "stable",
    icon: "🧘",
    color: "#4ECDC4"
  },
  {
    title: "Discipline et persévérance",
    description: "Développer la ténacité nécessaire pour maintenir l'effort sur le long terme. Cultiver la passion pour ses objectifs et la persévérance face aux obstacles, essentielles pour réussir en prospection.",
    businessImpact: "Multiplication par 5 de la persistance en prospection et augmentation de 80% du taux de conversion long terme",
    implementationLevel: "Avancé",
    keyElements: ["Grit", "Objectifs long terme", "Résistance mentale", "Dépassement de soi"],
    trend: "rising",
    icon: "💪",
    color: "#FF4757"
  }
];

// Cas clients PME spécifiques au mindset et performance
export const mindsetPerformanceCaseStudies = [
  {
    industry: "Services B2B",
    companySize: "12 salariés",
    challenge: "Équipe commerciale découragée par les refus, turnover élevé (40%), manque de constance dans la prospection.",
    solution: "Programme mindset en 3 mois : formation état d'esprit de croissance + mise en place d'habitudes de prospection quotidiennes + coaching individuel sur la gestion des émotions.",
    results: "Réduction du turnover à 10%, augmentation de 180% de l'activité de prospection, amélioration de 45% du moral d'équipe",
    metrics: {
      before: "40% turnover, 2 appels/jour/commercial",
      after: "10% turnover, 8 appels/jour/commercial",
      timeline: "3 mois"
    }
  },
  {
    industry: "Distribution spécialisée",
    companySize: "28 salariés",
    challenge: "Commerciaux expérimentés en perte de motivation, résistance au changement, performance en baisse depuis 2 ans.",
    solution: "Transformation mindset senior : redéfinition du 'pourquoi' professionnel + développement d'habitudes d'excellence + programme de mentorat interne.",
    results: "Remotivation de 85% de l'équipe, augmentation de 25% du CA, création d'une culture de performance durable",
    metrics: {
      before: "CA en baisse -8%/an, satisfaction équipe 4/10",
      after: "CA +25%, satisfaction équipe 8/10",
      timeline: "6 mois"
    }
  },
  {
    industry: "Technologie",
    companySize: "45 salariés",
    challenge: "Burn-out commercial généralisé, pression des objectifs, manque d'équilibre vie pro/perso, stress chronique.",
    solution: "Programme bien-être et performance : techniques de gestion du stress + optimisation des habitudes de travail + formation à la présence en RDV client.",
    results: "Réduction de 60% des arrêts maladie, amélioration de 40% de la satisfaction client, augmentation de 30% de la productivité",
    metrics: {
      before: "15 jours d'arrêt/mois équipe, NPS client 6/10",
      after: "6 jours d'arrêt/mois équipe, NPS client 8.5/10",
      timeline: "4 mois"
    }
  },
  {
    industry: "Industrie",
    companySize: "65 salariés",
    challenge: "Cycles de vente longs (18 mois), découragement face aux échecs, manque de persévérance, abandon prématuré des prospects.",
    solution: "Développement du 'grit' commercial : formation à la persévérance + techniques de motivation long terme + système de célébration des petites victoires.",
    results: "Augmentation de 120% de la persistance commerciale, réduction de 30% des cycles de vente, amélioration de 50% du taux de closing",
    metrics: {
      before: "Abandon après 3 relances, cycle 18 mois",
      after: "Persistance 8+ relances, cycle 12 mois",
      timeline: "8 mois"
    }
  }
];

// Feuille de route d'implémentation progressive
export const mindsetPerformanceRoadmap = {
  title: "Feuille de route transformation mindset",
  subtitle: "Programme progressif pour développer l'état d'esprit et les habitudes de performance",
  phases: [
    {
      title: "Phase 1 : Diagnostic et prise de conscience",
      duration: "2-4 semaines",
      description: "Évaluer l'état d'esprit actuel et identifier les blocages mentaux",
      actions: [
        "Auto-évaluation mindset fixe vs croissance",
        "Identification des croyances limitantes",
        "Analyse des habitudes actuelles",
        "Définition des objectifs de transformation"
      ],
      deliverables: [
        "Profil mindset individuel",
        "Plan de développement personnalisé",
        "Objectifs SMART de transformation"
      ],
      success_metrics: "Prise de conscience des blocages chez 100% de l'équipe"
    },
    {
      title: "Phase 2 : Développement des habitudes fondamentales",
      duration: "6-8 semaines",
      description: "Installer les routines de base pour la performance commerciale",
      actions: [
        "Mise en place d'une routine matinale",
        "Création d'habitudes de prospection quotidiennes",
        "Développement de l'auto-discipline",
        "Formation aux techniques de gestion du stress"
      ],
      deliverables: [
        "Routine personnalisée par commercial",
        "Système de suivi des habitudes",
        "Techniques de gestion émotionnelle"
      ],
      success_metrics: "80% d'adhésion aux nouvelles routines après 6 semaines"
    },
    {
      title: "Phase 3 : Renforcement et optimisation",
      duration: "8-12 semaines",
      description: "Consolider les acquis et développer la résilience avancée",
      actions: [
        "Approfondissement de l'état d'esprit de croissance",
        "Développement de la persévérance (grit)",
        "Optimisation des habitudes existantes",
        "Formation à la présence et à l'écoute active"
      ],
      deliverables: [
        "Niveau de grit renforcé",
        "Habitudes optimisées et automatisées",
        "Compétences relationnelles avancées"
      ],
      success_metrics: "Amélioration de 40% de la résilience face aux refus"
    },
    {
      title: "Phase 4 : Excellence et transmission",
      duration: "Continu",
      description: "Atteindre l'excellence personnelle et devenir mentor pour les autres",
      actions: [
        "Développement du leadership personnel",
        "Transmission des bonnes pratiques",
        "Innovation dans les approches mindset",
        "Maintien de l'amélioration continue"
      ],
      deliverables: [
        "Programme de mentorat interne",
        "Culture de performance durable",
        "Innovation continue des pratiques"
      ],
      success_metrics: "90% de l'équipe atteint le niveau 'performer' et 50% devient mentor"
    }
  ],
  tips: [
    "Commencer par une seule habitude et la maîtriser avant d'en ajouter d'autres",
    "Célébrer les petites victoires pour maintenir la motivation",
    "Adapter le rythme selon la personnalité de chaque commercial",
    "Mesurer les progrès régulièrement pour maintenir l'engagement",
    "Créer un environnement de soutien mutuel dans l'équipe"
  ]
};

// Statistiques et métriques spécifiques au domaine
export const mindsetPerformanceStats = {
  impact: [
    { label: "du succès commercial vient du mindset", value: "80%" },
    { label: "d'amélioration de la résilience", value: "5x" },
    { label: "des top performers ont un mindset de croissance", value: "95%" }
  ],
  transformation: [
    { label: "Réduction du turnover", value: "-60%" },
    { label: "Amélioration de la constance", value: "+300%" },
    { label: "Augmentation de la satisfaction", value: "+45%" }
  ]
};