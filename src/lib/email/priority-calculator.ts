/**
 * Système de calcul de priorité pour les demandes de ressources
 * 
 * Ce système calcule automatiquement la priorité des demandes basée sur :
 * - Fréquence des demandes
 * - Ancienneté de la première demande
 * - Type de ressource
 * - Source de la demande
 */

export interface PriorityFactors {
  requestCount: number;
  daysSinceFirstRequest: number;
  resourceType: ResourceType;
  sourceType: SourceType;
  userType?: UserType;
}

export enum ResourceType {
  GUIDE = 'guide',
  FORMATION = 'formation', 
  TEMPLATE = 'template',
  TOOL = 'tool',
  VIDEO = 'video',
  WEBINAR = 'webinar',
  OTHER = 'other'
}

export enum SourceType {
  HOMEPAGE = 'homepage',
  RESOURCE_PAGE = 'resource_page',
  BLOG_POST = 'blog_post',
  FORMATION_PAGE = 'formation_page',
  CONTACT_PAGE = 'contact_page',
  OTHER = 'other'
}

export enum UserType {
  FIRST_TIME = 'first_time',
  RETURNING = 'returning',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise'
}

export interface PriorityResult {
  score: number;
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
  factors: {
    frequency: number;
    urgency: number;
    type: number;
    source: number;
    user: number;
  };
  reasoning: string[];
}

/**
 * Calculateur de priorité principal
 */
export class PriorityCalculator {
  
  /**
   * Calculer la priorité d'une demande de ressource
   */
  static calculatePriority(factors: PriorityFactors): PriorityResult {
    const scores = {
      frequency: this.calculateFrequencyScore(factors.requestCount),
      urgency: this.calculateUrgencyScore(factors.daysSinceFirstRequest),
      type: this.calculateTypeScore(factors.resourceType),
      source: this.calculateSourceScore(factors.sourceType),
      user: this.calculateUserScore(factors.userType)
    };

    // Calcul du score total avec pondération
    const totalScore = (
      scores.frequency * 0.35 +  // 35% - Fréquence des demandes
      scores.urgency * 0.25 +    // 25% - Urgence temporelle
      scores.type * 0.20 +       // 20% - Type de ressource
      scores.source * 0.15 +     // 15% - Source de la demande
      scores.user * 0.05         // 5% - Type d'utilisateur
    );

    const level = this.scoreToLevel(totalScore);
    const label = this.levelToLabel(level);
    const reasoning = this.generateReasoning(factors, scores, totalScore);

    return {
      score: Math.round(totalScore * 100) / 100,
      level,
      label,
      factors: scores,
      reasoning
    };
  }

  /**
   * Score basé sur la fréquence des demandes
   */
  private static calculateFrequencyScore(requestCount: number): number {
    if (requestCount >= 20) return 5.0;  // Très demandé
    if (requestCount >= 10) return 4.0;  // Très populaire
    if (requestCount >= 5) return 3.0;   // Populaire
    if (requestCount >= 2) return 2.0;   // Quelques demandes
    return 1.0; // Première demande
  }

  /**
   * Score basé sur l'ancienneté de la première demande
   */
  private static calculateUrgencyScore(daysSinceFirstRequest: number): number {
    if (daysSinceFirstRequest >= 90) return 5.0;  // Très ancien
    if (daysSinceFirstRequest >= 60) return 4.0;  // Ancien
    if (daysSinceFirstRequest >= 30) return 3.0;  // Un mois
    if (daysSinceFirstRequest >= 14) return 2.0;  // Deux semaines
    return 1.0; // Récent
  }

  /**
   * Score basé sur le type de ressource
   */
  private static calculateTypeScore(resourceType: ResourceType): number {
    const typeScores = {
      [ResourceType.FORMATION]: 5.0,  // Formations = priorité max
      [ResourceType.GUIDE]: 4.0,     // Guides = haute priorité
      [ResourceType.TOOL]: 4.0,      // Outils = haute priorité
      [ResourceType.TEMPLATE]: 3.0,  // Templates = priorité moyenne
      [ResourceType.WEBINAR]: 3.0,   // Webinars = priorité moyenne
      [ResourceType.VIDEO]: 2.0,     // Vidéos = priorité basse
      [ResourceType.OTHER]: 1.0      // Autres = priorité minimale
    };

    return typeScores[resourceType] || 1.0;
  }

  /**
   * Score basé sur la source de la demande
   */
  private static calculateSourceScore(sourceType: SourceType): number {
    const sourceScores = {
      [SourceType.FORMATION_PAGE]: 5.0,   // Page formation = max
      [SourceType.RESOURCE_PAGE]: 4.0,    // Page ressources = haute
      [SourceType.HOMEPAGE]: 3.0,         // Homepage = moyenne
      [SourceType.BLOG_POST]: 2.0,        // Blog = basse
      [SourceType.CONTACT_PAGE]: 2.0,     // Contact = basse
      [SourceType.OTHER]: 1.0             // Autres = minimale
    };

    return sourceScores[sourceType] || 1.0;
  }

  /**
   * Score basé sur le type d'utilisateur
   */
  private static calculateUserScore(userType?: UserType): number {
    if (!userType) return 1.0;

    const userScores = {
      [UserType.ENTERPRISE]: 5.0,   // Entreprise = max
      [UserType.PREMIUM]: 4.0,      // Premium = haute
      [UserType.RETURNING]: 3.0,    // Récurrent = moyenne
      [UserType.FIRST_TIME]: 2.0    // Nouveau = basse
    };

    return userScores[userType] || 1.0;
  }

  /**
   * Convertir le score en niveau de priorité
   */
  private static scoreToLevel(score: number): 1 | 2 | 3 | 4 | 5 {
    if (score >= 4.5) return 5;  // Critique
    if (score >= 3.5) return 4;  // Haute
    if (score >= 2.5) return 3;  // Moyenne
    if (score >= 1.5) return 2;  // Basse
    return 1; // Minimale
  }

  /**
   * Convertir le niveau en label
   */
  private static levelToLabel(level: number): string {
    const labels = {
      5: 'Critique',
      4: 'Haute',
      3: 'Moyenne',
      2: 'Basse',
      1: 'Minimale'
    };

    return labels[level as keyof typeof labels] || 'Inconnue';
  }

  /**
   * Générer les raisons de la priorité
   */
  private static generateReasoning(
    factors: PriorityFactors, 
    scores: PriorityResult['factors'], 
    totalScore: number
  ): string[] {
    const reasoning: string[] = [];

    // Fréquence
    if (factors.requestCount >= 10) {
      reasoning.push(`Très demandé (${factors.requestCount} demandes)`);
    } else if (factors.requestCount >= 5) {
      reasoning.push(`Populaire (${factors.requestCount} demandes)`);
    } else if (factors.requestCount >= 2) {
      reasoning.push(`Plusieurs demandes (${factors.requestCount})`);
    }

    // Urgence temporelle
    if (factors.daysSinceFirstRequest >= 60) {
      reasoning.push(`Demande ancienne (${factors.daysSinceFirstRequest} jours)`);
    } else if (factors.daysSinceFirstRequest >= 30) {
      reasoning.push(`En attente depuis un mois`);
    }

    // Type de ressource
    if (factors.resourceType === ResourceType.FORMATION) {
      reasoning.push('Formation = priorité élevée');
    } else if (factors.resourceType === ResourceType.GUIDE || factors.resourceType === ResourceType.TOOL) {
      reasoning.push('Guide/Outil = priorité importante');
    }

    // Source
    if (factors.sourceType === SourceType.FORMATION_PAGE) {
      reasoning.push('Demandé depuis page formation');
    } else if (factors.sourceType === SourceType.RESOURCE_PAGE) {
      reasoning.push('Demandé depuis page ressources');
    }

    // Type utilisateur
    if (factors.userType === UserType.ENTERPRISE) {
      reasoning.push('Utilisateur entreprise');
    } else if (factors.userType === UserType.PREMIUM) {
      reasoning.push('Utilisateur premium');
    }

    // Score global
    if (totalScore >= 4.5) {
      reasoning.push('Score global très élevé');
    } else if (totalScore >= 3.5) {
      reasoning.push('Score global élevé');
    }

    return reasoning;
  }

  /**
   * Détecter le type de ressource depuis l'URL
   */
  static detectResourceType(resourceUrl: string): ResourceType {
    const url = resourceUrl.toLowerCase();
    
    if (url.includes('formation') || url.includes('cours')) {
      return ResourceType.FORMATION;
    }
    if (url.includes('guide') || url.includes('manuel')) {
      return ResourceType.GUIDE;
    }
    if (url.includes('template') || url.includes('modele')) {
      return ResourceType.TEMPLATE;
    }
    if (url.includes('outil') || url.includes('calculateur') || url.includes('.xlsx') || url.includes('.xls')) {
      return ResourceType.TOOL;
    }
    if (url.includes('video') || url.includes('.mp4') || url.includes('.avi')) {
      return ResourceType.VIDEO;
    }
    if (url.includes('webinar') || url.includes('conference')) {
      return ResourceType.WEBINAR;
    }
    
    return ResourceType.OTHER;
  }

  /**
   * Détecter le type de source depuis l'URL
   */
  static detectSourceType(sourceUrl: string): SourceType {
    const url = sourceUrl.toLowerCase();
    
    if (url.includes('/formation') || url.includes('/bootcamp')) {
      return SourceType.FORMATION_PAGE;
    }
    if (url.includes('/ressources')) {
      return SourceType.RESOURCE_PAGE;
    }
    if (url.includes('/blog') || url.includes('/article')) {
      return SourceType.BLOG_POST;
    }
    if (url.includes('/contact')) {
      return SourceType.CONTACT_PAGE;
    }
    if (url === '/' || url.includes('laurentserre.com') && url.split('/').length <= 4) {
      return SourceType.HOMEPAGE;
    }
    
    return SourceType.OTHER;
  }

  /**
   * Calculer la priorité avec détection automatique
   */
  static calculateAutoPriority(
    requestCount: number,
    daysSinceFirstRequest: number,
    resourceUrl: string,
    sourceUrl: string,
    userType?: UserType
  ): PriorityResult {
    const factors: PriorityFactors = {
      requestCount,
      daysSinceFirstRequest,
      resourceType: this.detectResourceType(resourceUrl),
      sourceType: this.detectSourceType(sourceUrl),
      userType
    };

    return this.calculatePriority(factors);
  }
}

/**
 * Utilitaires pour l'affichage des priorités
 */
export class PriorityDisplayUtils {
  
  /**
   * Obtenir la couleur CSS pour un niveau de priorité
   */
  static getPriorityColor(level: number): string {
    const colors = {
      5: 'text-red-600 bg-red-100 dark:bg-red-900/20',      // Critique
      4: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20', // Haute
      3: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20', // Moyenne
      2: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',       // Basse
      1: 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'        // Minimale
    };

    return colors[level as keyof typeof colors] || colors[1];
  }

  /**
   * Obtenir l'icône pour un niveau de priorité
   */
  static getPriorityIcon(level: number): string {
    const icons = {
      5: '🔥', // Critique
      4: '⚡', // Haute
      3: '⚠️', // Moyenne
      2: '📋', // Basse
      1: '📝'  // Minimale
    };

    return icons[level as keyof typeof icons] || icons[1];
  }

  /**
   * Formater l'affichage d'une priorité
   */
  static formatPriority(priority: PriorityResult): string {
    const icon = this.getPriorityIcon(priority.level);
    return `${icon} ${priority.label} (${priority.score})`;
  }
}