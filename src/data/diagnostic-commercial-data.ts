// ============================================================
// Diagnostic Commercial 360° — Données du questionnaire
// Version B2B Premium — Zéro gamification
// ============================================================

export type QuestionType = 'choice' | 'likert' | 'truefalse';

export interface Answer {
  text: string;
  points: number;
}

export interface Question {
  id: number;
  category: CategoryId;
  type: QuestionType;
  text: string;
  answers: Answer[];
}

export type CategoryId = 'prospection' | 'processus' | 'equipe' | 'performance' | 'strategie';

export interface Category {
  id: CategoryId;
  label: string;
  shortLabel: string;
  icon: string; // lucide icon name
}

export interface Persona {
  id: string;
  name: string;
  emoji: string;
  minScore: number;
  maxScore: number;
  description: string;
  subtitle: string;
  challenge: string;
}

export interface CategoryResult {
  categoryId: CategoryId;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface DiagnosticResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  persona: Persona;
  categories: CategoryResult[];
  comparisonText: string;
  summary: string;
}

// ============================================================
// Diagnostic Analysis — retour de l'API LLM
// ============================================================

export interface CategoryAnalysis {
  categoryId: CategoryId;
  categoryLabel: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: 'critique' | 'prioritaire' | 'amelioration' | 'consolidation' | 'excellent';
  comment: string;
}

export interface DiagnosticAnalysis {
  type: 'analysis';
  persona: {
    name: string;
    emoji: string;
    title: string;
    description: string;
  };
  synthesis: string;
  categories: CategoryAnalysis[];
  signauxFaibles: string[];
  risques: string[];
  hypotheses: string[];
  questionsApprofondissement: string[];
  recommandations: string[];
  prochaineEtape: string;
}

// ============================================================
// CATÉGORIES
// ============================================================
export const categories: Category[] = [
  { id: 'prospection', label: 'Prospection & ciblage', shortLabel: 'Prospection', icon: 'Target' },
  { id: 'processus', label: 'Processus & CRM', shortLabel: 'Processus', icon: 'GitBranch' },
  { id: 'equipe', label: 'Équipe & management', shortLabel: 'Équipe', icon: 'Users' },
  { id: 'performance', label: 'Performance & pilotage', shortLabel: 'Performance', icon: 'BarChart3' },
  { id: 'strategie', label: 'Stratégie & croissance', shortLabel: 'Stratégie', icon: 'TrendingUp' },
];

// ============================================================
// QUESTIONS (20)
// ============================================================
export const questions: Question[] = [
  // Bloc 1 : Prospection
  {
    id: 1, category: 'prospection', type: 'choice',
    text: 'Combien de nouveaux prospects qualifiés entrez-vous dans votre pipeline chaque mois ?',
    answers: [
      { text: 'Moins de 5', points: 1 },
      { text: 'Entre 5 et 15', points: 2 },
      { text: 'Entre 15 et 30', points: 3 },
      { text: 'Plus de 30', points: 4 },
    ],
  },
  {
    id: 2, category: 'prospection', type: 'choice',
    text: 'Vos commerciaux connaissent-ils précisément votre client idéal ?',
    answers: [
      { text: 'Non, nous prenons ce qui vient', points: 1 },
      { text: 'Nous avons une idée générale', points: 2 },
      { text: 'C\'est documenté et partagé', points: 3 },
      { text: 'C\'est la base du scoring des leads', points: 4 },
    ],
  },
  {
    id: 3, category: 'prospection', type: 'choice',
    text: 'Sur combien de canaux prospectez-vous simultanément ?',
    answers: [
      { text: 'Un seul canal', points: 1 },
      { text: '2 à 3 canaux', points: 2 },
      { text: '4 à 5 canaux', points: 3 },
      { text: 'Je ne sais pas précisément', points: 1 },
    ],
  },
  {
    id: 4, category: 'prospection', type: 'truefalse',
    text: 'Dans votre équipe, la prospection est mesurée sur des critères de qualité, pas seulement de volume.',
    answers: [
      { text: 'Faux, seul le volume compte', points: 1 },
      { text: 'Plutôt faux', points: 2 },
      { text: 'Plutôt vrai', points: 3 },
      { text: 'Vrai, la qualité est prioritaire', points: 4 },
    ],
  },

  // Bloc 2 : Processus
  {
    id: 5, category: 'processus', type: 'choice',
    text: 'Avez-vous un processus de vente documenté que toute l\'équipe suit ?',
    answers: [
      { text: 'Non, chacun fait comme il veut', points: 1 },
      { text: 'De façon informelle', points: 2 },
      { text: 'Oui, clairement défini', points: 3 },
      { text: 'Oui, et nous l\'optimisons en continu', points: 4 },
    ],
  },
  {
    id: 6, category: 'processus', type: 'choice',
    text: 'Comment qualifieriez-vous l\'utilisation de votre CRM ?',
    answers: [
      { text: 'Pas de CRM utilisé', points: 1 },
      { text: 'Installé mais sous-utilisé', points: 1 },
      { text: 'Utilisé régulièrement', points: 3 },
      { text: 'Outil de pilotage central de l\'activité', points: 4 },
    ],
  },
  {
    id: 7, category: 'processus', type: 'choice',
    text: 'À quelle fréquence réalisez-vous une revue de pipeline ?',
    answers: [
      { text: 'Jamais', points: 1 },
      { text: 'Une fois par mois', points: 2 },
      { text: 'Chaque semaine', points: 3 },
      { text: 'En continu, c\'est un rituel d\'équipe', points: 4 },
    ],
  },
  {
    id: 8, category: 'processus', type: 'choice',
    text: 'Quel est votre taux de transformation moyen lead → client ?',
    answers: [
      { text: 'Je ne sais pas', points: 0 },
      { text: 'Moins de 5%', points: 1 },
      { text: 'Entre 5% et 15%', points: 2 },
      { text: 'Plus de 15%', points: 3 },
    ],
  },

  // Bloc 3 : Équipe
  {
    id: 9, category: 'equipe', type: 'likert',
    text: 'Quelle proportion de vos commerciaux atteint ses objectifs mensuels ?',
    answers: [
      { text: 'Moins de la moitié', points: 1 },
      { text: 'Environ la moitié', points: 2 },
      { text: '70 à 80%', points: 3 },
      { text: 'Plus de 80%', points: 4 },
    ],
  },
  {
    id: 10, category: 'equipe', type: 'choice',
    text: 'Disposez-vous d\'un programme d\'intégration structuré pour les nouveaux commerciaux ?',
    answers: [
      { text: 'Non, ils apprennent sur le terrain', points: 1 },
      { text: 'Un livret d\'accueil informel', points: 2 },
      { text: 'Un programme de 30 jours', points: 3 },
      { text: 'Un parcours de 90 jours avec coaching', points: 4 },
    ],
  },
  {
    id: 11, category: 'equipe', type: 'choice',
    text: 'À quelle fréquence vos commerciaux reçoivent-ils du coaching terrain ?',
    answers: [
      { text: 'Jamais', points: 1 },
      { text: 'Une fois par an', points: 2 },
      { text: 'Chaque mois', points: 3 },
      { text: 'Chaque semaine', points: 4 },
    ],
  },
  {
    id: 12, category: 'equipe', type: 'choice',
    text: 'Depuis combien de temps votre meilleur commercial est-il dans l\'équipe ?',
    answers: [
      { text: 'Moins d\'un an', points: 1 },
      { text: '1 à 2 ans', points: 2 },
      { text: '2 à 5 ans', points: 3 },
      { text: '5 ans ou plus', points: 4 },
    ],
  },

  // Bloc 4 : Performance
  {
    id: 13, category: 'performance', type: 'choice',
    text: 'Quels indicateurs examinez-vous chaque semaine ?',
    answers: [
      { text: 'Uniquement le chiffre d\'affaires', points: 1 },
      { text: 'CA et pipeline en cours', points: 2 },
      { text: 'KPIs complets avec tableau de bord', points: 3 },
      { text: 'Pilotage prédictif avec tendances', points: 4 },
    ],
  },
  {
    id: 14, category: 'performance', type: 'choice',
    text: 'Connaissez-vous précisément votre coût d\'acquisition client (CAC) ?',
    answers: [
      { text: 'Non', points: 1 },
      { text: 'Une approximation', points: 2 },
      { text: 'Oui, de façon précise', points: 3 },
      { text: 'Oui, et je l\'optimise activement', points: 4 },
    ],
  },
  {
    id: 15, category: 'performance', type: 'choice',
    text: 'À quelle fréquence révisez-vous vos objectifs commerciaux ?',
    answers: [
      { text: 'Annuellement', points: 1 },
      { text: 'Trimestriellement', points: 2 },
      { text: 'Mensuellement', points: 3 },
      { text: 'En continu, de façon adaptative', points: 4 },
    ],
  },
  {
    id: 16, category: 'performance', type: 'choice',
    text: 'Quel est votre principal frein à la performance commerciale ?',
    answers: [
      { text: 'Le volume de prospects qualifiés', points: 1 },
      { text: 'Le taux de transformation', points: 2 },
      { text: 'Les compétences de l\'équipe', points: 3 },
      { text: 'Les outils et processus', points: 4 },
    ],
  },

  // Bloc 5 : Stratégie
  {
    id: 17, category: 'strategie', type: 'choice',
    text: 'Disposez-vous d\'un plan de développement commercial écrit pour les 12 prochains mois ?',
    answers: [
      { text: 'Non', points: 1 },
      { text: 'Une vision informelle', points: 2 },
      { text: 'Un document structuré', points: 3 },
      { text: 'Un plan avec jalons et indicateurs', points: 4 },
    ],
  },
  {
    id: 18, category: 'strategie', type: 'choice',
    text: 'Lorsque vous perdez un deal, analysez-vous systématiquement les causes ?',
    answers: [
      { text: 'Non, je passe au suivant', points: 1 },
      { text: 'Parfois, de façon informelle', points: 2 },
      { text: 'Oui, de façon systématique', points: 3 },
      { text: 'Oui, avec un processus de débrief structuré', points: 4 },
    ],
  },
  {
    id: 19, category: 'strategie', type: 'likert',
    text: 'Votre équipe commerciale est-elle alignée avec la stratégie globale de l\'entreprise ?',
    answers: [
      { text: 'Pas du tout', points: 1 },
      { text: 'Partiellement', points: 2 },
      { text: 'Plutôt oui', points: 3 },
      { text: 'Complètement alignée', points: 4 },
    ],
  },
  {
    id: 20, category: 'strategie', type: 'choice',
    text: 'Si vous deviez changer UNE SEULE chose cette semaine pour améliorer vos résultats, ce serait quoi ?',
    answers: [
      { text: 'Mieux cibler les prospects', points: 3 },
      { text: 'Former l\'équipe commerciale', points: 4 },
      { text: 'Mettre en place un CRM', points: 2 },
      { text: 'Définir un processus de vente', points: 4 },
      { text: 'Mettre en place des indicateurs de pilotage', points: 3 },
      { text: 'Recruter un commercial', points: 1 },
    ],
  },
];

// ============================================================
// PERSONAS
// ============================================================
export const personas: Persona[] = [
  {
    id: 'strategie', name: 'Le Stratège', emoji: '🏆',
    minScore: 80, maxScore: 100,
    description: 'Votre organisation commerciale est mature et performante. L\'enjeu est désormais de maintenir cette excellence tout en innovant.',
    subtitle: 'Top 15% des PME françaises',
    challenge: 'Maintenez votre avantage compétitif en challengeant vos équipes pour viser les 100%.',
  },
  {
    id: 'batisseur', name: 'Le Bâtisseur', emoji: '📈',
    minScore: 60, maxScore: 79,
    description: 'Les fondations sont solides mais quelques fragilités structurelles vous empêchent de passer à l\'échelle. Vous êtes sur la bonne voie.',
    subtitle: 'Au-dessus de la moyenne des PME (65e percentile)',
    challenge: 'Consolidez vos processus critiques avant qu\'ils ne limitent votre croissance.',
  },
  {
    id: 'bricoleur', name: 'Le Bricoleur', emoji: '🔧',
    minScore: 40, maxScore: 59,
    description: 'Vous compensez par l\'énergie ce qui manque en structure. Beaucoup de potentiel inexploité faute d\'organisation systématique.',
    subtitle: 'Dans la moyenne des PME françaises',
    challenge: 'Arrêtez de colmater : structurez votre organisation commerciale pour transformer votre énergie en résultats.',
  },
  {
    id: 'pompier', name: 'Le Pompier', emoji: '🔥',
    minScore: 20, maxScore: 39,
    description: 'Vous passez l\'essentiel de votre temps à éteindre des crises commerciales. Une approche préventive changerait radicalement la donne.',
    subtitle: 'En dessous de la moyenne des PME',
    challenge: 'Passez de la réaction à la prévention : un diagnostic approfondi est la première priorité.',
  },
  {
    id: 'survivant', name: 'Le Survivant', emoji: '💀',
    minScore: 0, maxScore: 19,
    description: 'Votre organisation commerciale est en situation de fragilité. Mais chaque transformation commence par une prise de conscience.',
    subtitle: 'Urgence commerciale détectée',
    challenge: 'La bonne nouvelle : vous ne pouvez que progresser. Commençons par poser les fondamentaux.',
  },
];

// ============================================================
// COMPARAISON SOCIALE
// ============================================================
const comparisonTexts = [
  { minScore: 0, text: '12% des dirigeants de PME ont un score inférieur au vôtre. Vous n\'êtes pas seul.' },
  { minScore: 20, text: '40% des dirigeants de PME sont dans une situation comparable à la vôtre.' },
  { minScore: 40, text: 'Vous êtes dans la moyenne des PME françaises. La moyenne n\'est pas une fatalité.' },
  { minScore: 60, text: 'Vous faites mieux que 65% des PME de votre taille.' },
  { minScore: 80, text: 'Vous êtes dans le top 15% des PME françaises. Objectif : le top 5%.' },
];

export function getComparisonText(score: number): string {
  let best = comparisonTexts[0];
  for (const ct of comparisonTexts) {
    if (score >= ct.minScore) best = ct;
  }
  return best.text;
}

// ============================================================
// UTILS
// ============================================================
export function getCategoryMaxScore(categoryId: CategoryId): number {
  const cat = categories.find(c => c.id === categoryId)!;
  return cat.id === 'prospection' || cat.id === 'performance'
    ? 12 // 4 questions × 3 max (certaines ont 0-3)
    : 16; // 4 × 4
}

export function getMaxTotalScore(): number {
  return categories.reduce((sum, cat) => sum + getCategoryMaxScore(cat.id), 0);
}

// ============================================================
// RECOMMANDATIONS PAR CATÉGORIE
// ============================================================
export interface Recommendation {
  categoryId: CategoryId;
  score: number;
  maxScore: number;
  level: 'critique' | 'prioritaire' | 'amelioration' | 'consolidation' | 'excellent';
  title: string;
  actions: string[];
}

export function getRecommendations(categories: CategoryResult[]): Recommendation[] {
  return categories.map(cat => {
    if (cat.percentage < 20) {
      return {
        categoryId: cat.categoryId,
        score: cat.score,
        maxScore: cat.maxScore,
        level: 'critique',
        title: 'Situation critique',
        actions: ['Diagnostic approfondi obligatoire', 'Mise en place des fondamentaux sous 7 jours', 'Accompagnement prioritaire recommandé'],
      };
    }
    if (cat.percentage < 40) {
      return {
        categoryId: cat.categoryId,
        score: cat.score,
        maxScore: cat.maxScore,
        level: 'prioritaire',
        title: 'Priorité d\'action',
        actions: ['Plan d\'action correctif 30 jours', 'Formation ciblée de l\'équipe', 'Mise en place d\'indicateurs de suivi'],
      };
    }
    if (cat.percentage < 60) {
      return {
        categoryId: cat.categoryId,
        score: cat.score,
        maxScore: cat.maxScore,
        level: 'amelioration',
        title: 'Marge de progression',
        actions: ['Optimisation des processus existants', 'Automatisation des tâches répétitives', 'Renforcement des compétences clés'],
      };
    }
    if (cat.percentage < 80) {
      return {
        categoryId: cat.categoryId,
        score: cat.score,
        maxScore: cat.maxScore,
        level: 'consolidation',
        title: 'À consolider',
        actions: ['Audit des points de friction résiduels', 'Passage à une approche prédictive', 'Professionnalisation avancée'],
      };
    }
    return {
      categoryId: cat.categoryId,
      score: cat.score,
      maxScore: cat.maxScore,
      level: 'excellent',
      title: 'Point fort',
      actions: ['Partager les bonnes pratiques avec l\'équipe', 'Benchmark sectoriel', 'Maintenir et innover'],
    };
  });
}
