// ============================================================
// Diagnostic Commercial 360° — Données du questionnaire
// 20 questions • 5 catégories • Scoring • Badges • Personas
// ============================================================

export type QuestionType = 'choice' | 'likert' | 'truefalse' | 'ranking';

export interface Answer {
  text: string;
  points: number;
  emoji?: string;
}

export interface Question {
  id: number;
  category: CategoryId;
  type: QuestionType;
  text: string;
  answers: Answer[];
  /** Texte de la barre de progression pour cette question */
  progressText?: string;
}

export type CategoryId = 'prospection' | 'processus' | 'equipe' | 'performance' | 'strategie';

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
  badgeName: string;
  questions: number[]; // question ids
}

export interface BadgeLevel {
  stars: 1 | 2 | 3;
  label: string;
  minScore: number; // score / max possible de la catégorie
}

export interface Persona {
  id: string;
  name: string;
  emoji: string;
  minScore: number;
  maxScore: number;
  description: string;
  subtitle: string;
  color: string; // tailwind color class
  challenge: string;
}

export interface CategoryResult {
  categoryId: CategoryId;
  score: number;
  maxScore: number;
  percentage: number; // 0-100
  stars: 1 | 2 | 3;
}

export interface DiagnosticResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  persona: Persona;
  categories: CategoryResult[];
  comparisonText: string;
}

// ============================================================
// CATÉGORIES
// ============================================================
export const categories: Category[] = [
  {
    id: 'prospection',
    name: 'Prospection & ciblage',
    emoji: '🎯',
    badgeName: 'Œil de lynx',
    questions: [1, 2, 3, 4],
  },
  {
    id: 'processus',
    name: 'Processus & CRM',
    emoji: '⚙️',
    badgeName: 'Ingénieur commercial',
    questions: [5, 6, 7, 8],
  },
  {
    id: 'equipe',
    name: 'Équipe & management',
    emoji: '👥',
    badgeName: 'Coach né',
    questions: [9, 10, 11, 12],
  },
  {
    id: 'performance',
    name: 'Performance & pilotage',
    emoji: '📊',
    badgeName: 'Pilote d\'élite',
    questions: [13, 14, 15, 16],
  },
  {
    id: 'strategie',
    name: 'Stratégie & croissance',
    emoji: '🚀',
    badgeName: 'Visionnaire',
    questions: [17, 18, 19, 20],
  },
];

// ============================================================
// QUESTIONS (20)
// ============================================================
export const questions: Question[] = [
  // === BLOC 1 : Prospection & ciblage (Q1-Q4) ===
  {
    id: 1,
    category: 'prospection',
    type: 'choice',
    text: 'Combien de nouveaux prospects qualifiés entrez-vous dans votre pipeline chaque mois ?',
    progressText: 'C\'est parti →',
    answers: [
      { text: 'Moins de 5', points: 1, emoji: '😰' },
      { text: 'Entre 5 et 15', points: 2, emoji: '🙂' },
      { text: 'Entre 15 et 30', points: 3, emoji: '😎' },
      { text: 'Plus de 30', points: 4, emoji: '🚀' },
    ],
  },
  {
    id: 2,
    category: 'prospection',
    type: 'choice',
    text: 'Vos commerciaux connaissent-ils précisément votre client idéal ?',
    answers: [
      { text: 'Non, on prend ce qui vient', points: 1, emoji: '🎲' },
      { text: 'On a une idée, mais c\'est flou', points: 2, emoji: '🤔' },
      { text: 'C\'est documenté et partagé', points: 3, emoji: '📝' },
      { text: 'C\'est la base de notre scoring', points: 4, emoji: '🎯' },
    ],
  },
  {
    id: 3,
    category: 'prospection',
    type: 'choice',
    text: 'Sur combien de canaux prospectez-vous en même temps ?',
    answers: [
      { text: 'Un seul canal', points: 1, emoji: '🔴' },
      { text: '2-3 canaux', points: 2, emoji: '🟡' },
      { text: '4-5 canaux', points: 3, emoji: '🟢' },
      { text: 'Je ne sais pas exactement', points: 1, emoji: '🤷' },
    ],
  },
  {
    id: 4,
    category: 'prospection',
    type: 'truefalse',
    text: 'Dans votre équipe, la prospection est mesurée autrement qu\'au nombre d\'appels.',
    answers: [
      { text: 'Faux — Seul le volume compte', points: 1, emoji: '📞' },
      { text: 'Plutôt faux', points: 2, emoji: '📋' },
      { text: 'Plutôt vrai', points: 3, emoji: '📊' },
      { text: 'Vrai — On mesure la qualité', points: 4, emoji: '🎯' },
    ],
  },

  // === BLOC 2 : Processus & CRM (Q5-Q8) ===
  {
    id: 5,
    category: 'processus',
    type: 'choice',
    text: 'Avez-vous un processus de vente documenté que toute l\'équipe suit ?',
    progressText: 'Vous êtes au chaud 🔥',
    answers: [
      { text: 'Non, chacun fait comme il veut', points: 1, emoji: '🎭' },
      { text: 'À peu près, mais c\'est informel', points: 2, emoji: '📄' },
      { text: 'Oui, clairement défini', points: 3, emoji: '📑' },
      { text: 'Oui, et on l\'optimise en continu', points: 4, emoji: '⚡' },
    ],
  },
  {
    id: 6,
    category: 'processus',
    type: 'choice',
    text: 'Utilisez-vous un CRM ?',
    answers: [
      { text: 'Non', points: 1, emoji: '❌' },
      { text: 'Oui mais personne ne s\'en sert', points: 1, emoji: '😬' },
      { text: 'Oui, suivi régulier', points: 3, emoji: '✅' },
      { text: 'Oui, c\'est notre outil de pilotage central', points: 4, emoji: '🏆' },
    ],
  },
  {
    id: 7,
    category: 'processus',
    type: 'choice',
    text: 'À quelle fréquence faites-vous une revue de pipeline ?',
    answers: [
      { text: 'Jamais', points: 1, emoji: '💀' },
      { text: 'Une fois par mois', points: 2, emoji: '📅' },
      { text: 'Chaque semaine', points: 3, emoji: '📆' },
      { text: 'En continu, c\'est un réflexe', points: 4, emoji: '🔄' },
    ],
  },
  {
    id: 8,
    category: 'processus',
    type: 'choice',
    text: 'Quel est votre taux de transformation moyen lead → client ?',
    answers: [
      { text: 'Je ne sais pas', points: 0, emoji: '🤷' },
      { text: 'Moins de 5%', points: 1, emoji: '📉' },
      { text: 'Entre 5% et 15%', points: 2, emoji: '📈' },
      { text: 'Plus de 15%', points: 3, emoji: '📊' },
    ],
  },

  // === BLOC 3 : Équipe & management (Q9-Q12) ===
  {
    id: 9,
    category: 'equipe',
    type: 'likert',
    text: 'Combien de vos commerciaux atteignent leurs objectifs chaque mois ?',
    progressText: 'Mi-parcours ! Vous gérez 💪',
    answers: [
      { text: 'Moins de la moitié', points: 1, emoji: '😰' },
      { text: 'Environ la moitié', points: 2, emoji: '😐' },
      { text: '70-80%', points: 3, emoji: '💪' },
      { text: 'Plus de 80%', points: 4, emoji: '🏅' },
    ],
  },
  {
    id: 10,
    category: 'equipe',
    type: 'choice',
    text: 'Avez-vous un programme d\'intégration structuré pour les nouveaux commerciaux ?',
    answers: [
      { text: 'Non, ils apprennent sur le tas', points: 1, emoji: '🏊' },
      { text: 'Un livret et on verra', points: 2, emoji: '📕' },
      { text: 'Oui, 30 jours structurés', points: 3, emoji: '📋' },
      { text: 'Oui, 90 jours avec coaching', points: 4, emoji: '🎓' },
    ],
  },
  {
    id: 11,
    category: 'equipe',
    type: 'choice',
    text: 'Vos commerciaux reçoivent-ils du coaching terrain ?',
    answers: [
      { text: 'Jamais', points: 1, emoji: '🚫' },
      { text: 'Une fois par an', points: 2, emoji: '📅' },
      { text: 'Tous les mois', points: 3, emoji: '📆' },
      { text: 'Chaque semaine', points: 4, emoji: '🎯' },
    ],
  },
  {
    id: 12,
    category: 'equipe',
    type: 'choice',
    text: 'Depuis combien de temps votre meilleur commercial est-il dans l\'équipe ?',
    answers: [
      { text: 'Moins d\'un an', points: 1, emoji: '🆕' },
      { text: '1-2 ans', points: 2, emoji: '📈' },
      { text: '2-5 ans', points: 3, emoji: '🌟' },
      { text: '5 ans et plus', points: 4, emoji: '🏛️' },
    ],
  },

  // === BLOC 4 : Performance & pilotage (Q13-Q16) ===
  {
    id: 13,
    category: 'performance',
    type: 'choice',
    text: 'Quels indicateurs regardez-vous chaque semaine ?',
    progressText: 'Dernière ligne droite ⚡',
    answers: [
      { text: 'Uniquement le CA réalisé', points: 1, emoji: '💰' },
      { text: 'CA + pipeline', points: 2, emoji: '📊' },
      { text: 'KPIs complets avec tableau de bord', points: 3, emoji: '📋' },
      { text: 'Pilotage prédictif avec tendances', points: 4, emoji: '🔮' },
    ],
  },
  {
    id: 14,
    category: 'performance',
    type: 'choice',
    text: 'Savez-vous exactement combien coûte l\'acquisition d\'un client (CAC) ?',
    answers: [
      { text: 'Non, pas du tout', points: 1, emoji: '🙈' },
      { text: 'Une approximation', points: 2, emoji: '🤔' },
      { text: 'Oui, précisément', points: 3, emoji: '🎯' },
      { text: 'Oui, et je l\'optimise', points: 4, emoji: '📉' },
    ],
  },
  {
    id: 15,
    category: 'performance',
    type: 'choice',
    text: 'À quelle fréquence révisez-vous vos objectifs commerciaux ?',
    answers: [
      { text: 'Annuellement', points: 1, emoji: '📆' },
      { text: 'Trimestriellement', points: 2, emoji: '📅' },
      { text: 'Mensuellement', points: 3, emoji: '📋' },
      { text: 'En continu, adaptatif', points: 4, emoji: '🔄' },
    ],
  },
  {
    id: 16,
    category: 'performance',
    type: 'ranking',
    text: 'Qu\'est-ce qui vous manque le plus en priorité ?',
    answers: [
      { text: 'Plus de prospects qualifiés', points: 1, emoji: '🎯' },
      { text: 'Un meilleur closing', points: 2, emoji: '🤝' },
      { text: 'Une équipe plus compétente', points: 3, emoji: '👥' },
      { text: 'De meilleurs outils', points: 4, emoji: '🛠️' },
    ],
  },

  // === BLOC 5 : Stratégie & croissance (Q17-Q20) ===
  {
    id: 17,
    category: 'strategie',
    type: 'choice',
    text: 'Avez-vous un plan de développement commercial écrit pour les 12 prochains mois ?',
    progressText: 'Presque fini… 🏁',
    answers: [
      { text: 'Non', points: 1, emoji: '📭' },
      { text: 'Une idée en tête', points: 2, emoji: '💭' },
      { text: 'Un document formalisé', points: 3, emoji: '📄' },
      { text: 'Un plan avec jalons précis', points: 4, emoji: '🗺️' },
    ],
  },
  {
    id: 18,
    category: 'strategie',
    type: 'choice',
    text: 'Quand vous perdez un deal, savez-vous pourquoi ?',
    answers: [
      { text: 'Non, je passe à autre chose', points: 1, emoji: '🏃' },
      { text: 'Parfois, j\'ai une idée', points: 2, emoji: '🤷' },
      { text: 'Oui, j\'analyse systématiquement', points: 3, emoji: '🔍' },
      { text: 'J\'ai un processus de débrief complet', points: 4, emoji: '📋' },
    ],
  },
  {
    id: 19,
    category: 'strategie',
    type: 'likert',
    text: 'Votre équipe commerciale est-elle alignée avec votre stratégie d\'entreprise ?',
    answers: [
      { text: 'Pas du tout', points: 1, emoji: '💥' },
      { text: 'Plus ou moins', points: 2, emoji: '🤨' },
      { text: 'Plutôt oui', points: 3, emoji: '👍' },
      { text: 'Complètement alignée', points: 4, emoji: '🎯' },
    ],
  },
  {
    id: 20,
    category: 'strategie',
    type: 'choice',
    text: 'Si vous deviez changer UNE SEULE CHOSE cette semaine pour améliorer vos résultats, ce serait quoi ?',
    progressText: 'Calcul de votre profil… 🔮',
    answers: [
      { text: 'Mieux cibler mes prospects', points: 3, emoji: '🎯' },
      { text: 'Former mon équipe', points: 4, emoji: '📚' },
      { text: 'Mettre en place un CRM', points: 2, emoji: '⚙️' },
      { text: 'Définir un processus de vente', points: 4, emoji: '📋' },
      { text: 'Piloter des KPIs', points: 3, emoji: '📊' },
      { text: 'Recruter un commercial', points: 1, emoji: '👥' },
    ],
  },
];

// ============================================================
// BADGE LEVELS
// ============================================================
export function getBadgeStars(percentage: number): 1 | 2 | 3 {
  if (percentage >= 75) return 3;
  if (percentage >= 40) return 2;
  return 1;
}

export function getBadgeLabel(percentage: number): string {
  if (percentage >= 75) return 'Expert';
  if (percentage >= 40) return 'Intermédiaire';
  return 'Débutant';
}

// ============================================================
// PERSONAS
// ============================================================
export const personas: Persona[] = [
  {
    id: 'strategie',
    name: 'Le Stratège',
    emoji: '🏆',
    minScore: 80,
    maxScore: 100,
    description: 'Vous avez construit une machine commerciale qui roule. Votre défi : ne pas vous endormir.',
    subtitle: 'Vous faites mieux que 85% des PME françaises',
    color: 'from-yellow-400 to-amber-600',
    challenge: 'Maintenez votre excellence — challengez vos équipes pour atteindre les 100%',
  },
  {
    id: 'batisseur',
    name: 'Le Bâtisseur',
    emoji: '📈',
    minScore: 60,
    maxScore: 79,
    description: 'Les fondations sont solides, mais quelques poutres menacent de craquer. On les consolide ensemble.',
    subtitle: 'Vous faites mieux que 65% des PME françaises',
    color: 'from-blue-500 to-blue-700',
    challenge: 'Consolidez vos processus avant qu\'ils ne deviennent des freins à votre croissance',
  },
  {
    id: 'bricoleur',
    name: 'Le Bricoleur',
    emoji: '🔧',
    minScore: 40,
    maxScore: 59,
    description: 'Vous comblez les trous avec ce que vous avez sous la main. Imaginez si vous aviez les bons outils…',
    subtitle: 'Vous êtes dans la moyenne des PME françaises',
    color: 'from-orange-400 to-orange-600',
    challenge: 'Arrêtez de colmater — structurez votre organisation commerciale',
  },
  {
    id: 'pompier',
    name: 'Le Pompier',
    emoji: '🔥',
    minScore: 20,
    maxScore: 39,
    description: 'Vous passez votre temps à éteindre des incendies. Et si on installait un détecteur de fumée ?',
    subtitle: 'Vous êtes en dessous de la moyenne des PME françaises',
    color: 'from-red-500 to-red-700',
    challenge: 'Priorisez la prévention sur la réaction — un diagnostic s\'impose',
  },
  {
    id: 'survivant',
    name: 'Le Survivant',
    emoji: '💀',
    minScore: 0,
    maxScore: 19,
    description: 'Vous survivez. Mais vous n\'êtes pas obligé de rester là.',
    subtitle: 'Urgence commerciale détectée',
    color: 'from-gray-600 to-gray-900',
    challenge: 'La bonne nouvelle : vous ne pouvez que progresser. Commençons par les bases.',
  },
];

// ============================================================
// COMPARAISON SOCIALE (textes fictifs mais crédibles)
// ============================================================
const comparisonTexts = [
  { minScore: 0, text: 'Seulement 12% des dirigeants de PME ont un score inférieur au vôtre. Vous n\'êtes pas seul.' },
  { minScore: 20, text: 'Près de 40% des dirigeants de PME sont dans la même situation que vous.' },
  { minScore: 40, text: 'Vous êtes dans la moyenne des PME françaises. Mais la moyenne n\'est pas une ambition.' },
  { minScore: 60, text: 'Vous faites mieux que 65% des PME de votre taille. Une belle base à optimiser.' },
  { minScore: 80, text: 'Vous faites partie du top 15% des PME françaises. Vous pouvez viser le top 5%.' },
];

export function getComparisonText(score: number): string {
  let best = comparisonTexts[0];
  for (const ct of comparisonTexts) {
    if (score >= ct.minScore) best = ct;
  }
  return best.text;
}

// ============================================================
// RECOMMANDATIONS PAR CATÉGORIE
// ============================================================
export interface Recommendation {
  category: CategoryId;
  score: number;
  maxScore: number;
  level: 'urgent' | 'amelioration' | 'consolidation' | 'excellent';
  title: string;
  actions: string[];
  articleSlug?: string;
}

export function getRecommendations(categories: CategoryResult[]): Recommendation[] {
  return categories.map(cat => {
    if (cat.percentage < 25) {
      return {
        category: cat.categoryId,
        score: cat.score,
        maxScore: cat.maxScore,
        level: 'urgent',
        title: 'Action prioritaire requise',
        actions: [
          `Diagnostic approfondi de votre ${categories.find(c => c.categoryId === cat.categoryId)?.categoryId}`,
          'Mise en place des fondamentaux dès cette semaine',
          'Plan d\'action 30 jours avec jalons précis',
        ],
      };
    }
    if (cat.percentage < 50) {
      return {
        category: cat.categoryId,
        score: cat.score,
        maxScore: cat.maxScore,
        level: 'amelioration',
        title: 'Améliorations ciblées possibles',
        actions: [
          'Optimisation des processus existants',
          'Formation ciblée de votre équipe',
          'Mise en place d\'indicateurs de suivi',
        ],
      };
    }
    if (cat.percentage < 75) {
      return {
        category: cat.categoryId,
        score: cat.score,
        maxScore: cat.maxScore,
        level: 'consolidation',
        title: 'Consolider pour passer au niveau supérieur',
        actions: [
          'Audit des points de friction résiduels',
          'Automatisation des tâches répétitives',
          'Passage à une approche prédictive',
        ],
      };
    }
    return {
      category: cat.categoryId,
      score: cat.score,
      maxScore: cat.maxScore,
      level: 'excellent',
      title: 'Maintien de l\'excellence',
      actions: [
        'Partage des bonnes pratiques avec l\'équipe',
        'Benchmark sectoriel pour identifier les marges',
        'Innovation continue des méthodes',
      ],
    };
  });
}

// ============================================================
// SCORING — max possible
// ============================================================
export function getCategoryMaxScore(categoryId: CategoryId): number {
  const cat = categories.find(c => c.id === categoryId)!;
  return cat.questions.reduce((sum, qId) => {
    const q = questions.find(q => q.id === qId)!;
    return sum + Math.max(...q.answers.map(a => a.points));
  }, 0);
}

export function getMaxTotalScore(): number {
  let total = 0;
  for (const cat of categories) {
    total += getCategoryMaxScore(cat.id);
  }
  return total;
}

// ============================================================
// MICRO-CÉLÉBRATIONS — Textes entre blocs
// ============================================================
export interface CelebrationText {
  categoryName: string;
  stars: number;
  message: string;
  comparison: string;
}

export function getCelebration(result: CategoryResult): CelebrationText {
  const cat = categories.find(c => c.id === result.categoryId)!;
  const comparisons: Record<string, string> = {
    1: 'La majorité des PME françaises est à ce niveau. Vous avez une marge de progression.',
    2: 'Vous êtes au-dessus de la moyenne des PME françaises. Continuez !',
    3: 'Vous êtes dans le top 20% des PME françaises pour cette catégorie.',
  };
  
  return {
    categoryName: cat.name,
    stars: result.stars,
    message: `Vous ciblez mieux que ${result.stars === 1 ? '40' : result.stars === 2 ? '65' : '85'}% des PME de votre taille.`,
    comparison: comparisons[result.stars] || '',
  };
}
