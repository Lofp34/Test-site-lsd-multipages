/**
 * Analyseur de questions récurrentes pour le chat Gemini
 * Identifie les patterns et sujets les plus fréquents
 */

interface QuestionPattern {
  id: string;
  pattern: string;
  category: string;
  frequency: number;
  examples: string[];
  suggestedResponse?: string;
  lastSeen: Date;
  confidence: number;
}

interface QuestionCategory {
  name: string;
  description: string;
  keywords: string[];
  patterns: string[];
  color: string;
}

interface AnalysisResult {
  topPatterns: QuestionPattern[];
  categories: Record<string, number>;
  trends: Array<{
    date: string;
    category: string;
    count: number;
  }>;
  suggestions: Array<{
    pattern: string;
    suggestedImprovement: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

class QuestionAnalyzer {
  private patterns: Map<string, QuestionPattern> = new Map();
  private messageHistory: Array<{
    message: string;
    timestamp: Date;
    sessionId: string;
  }> = [];

  // Catégories prédéfinies pour Laurent Serre
  private readonly CATEGORIES: QuestionCategory[] = [
    {
      name: 'Développement Commercial',
      description: 'Questions sur les stratégies et techniques de développement commercial',
      keywords: ['commercial', 'vente', 'prospection', 'client', 'business', 'développement'],
      patterns: [
        'comment développer.*commercial',
        'stratégie.*vente',
        'prospection.*client',
        'augmenter.*chiffre.*affaires'
      ],
      color: '#00BDA4'
    },
    {
      name: 'Formation & Coaching',
      description: 'Questions sur les formations et services de coaching',
      keywords: ['formation', 'coaching', 'bootcamp', 'accompagnement', 'conseil'],
      patterns: [
        'formation.*commercial',
        'coaching.*vente',
        'bootcamp.*développement',
        'accompagnement.*équipe'
      ],
      color: '#1B365D'
    },
    {
      name: 'PME & Entreprises',
      description: 'Questions spécifiques aux PME et leur développement',
      keywords: ['pme', 'entreprise', 'équipe', 'management', 'organisation'],
      patterns: [
        'pme.*développement',
        'équipe.*commerciale',
        'management.*vente',
        'organisation.*commercial'
      ],
      color: '#FFAA5C'
    },
    {
      name: 'Négociation & Closing',
      description: 'Questions sur les techniques de négociation et de conclusion',
      keywords: ['négociation', 'closing', 'conclure', 'signature', 'accord'],
      patterns: [
        'négociation.*client',
        'closing.*vente',
        'conclure.*affaire',
        'signature.*contrat'
      ],
      color: '#414141'
    },
    {
      name: 'Outils & Méthodes',
      description: 'Questions sur les outils et méthodologies commerciales',
      keywords: ['outil', 'méthode', 'technique', 'process', 'système'],
      patterns: [
        'outil.*commercial',
        'méthode.*vente',
        'technique.*prospection',
        'système.*crm'
      ],
      color: '#F2F5F7'
    },
    {
      name: 'Tarifs & Services',
      description: 'Questions sur les tarifs et services proposés',
      keywords: ['tarif', 'prix', 'coût', 'service', 'prestation'],
      patterns: [
        'tarif.*formation',
        'prix.*coaching',
        'coût.*accompagnement',
        'service.*proposé'
      ],
      color: '#00BDA4'
    }
  ];

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Analyse un nouveau message utilisateur
   */
  analyzeMessage(message: string, sessionId: string): {
    category: string;
    confidence: number;
    matchedPatterns: string[];
    suggestions: string[];
  } {
    const timestamp = new Date();
    
    // Ajouter à l'historique
    this.messageHistory.push({
      message: message.toLowerCase(),
      timestamp,
      sessionId
    });

    // Nettoyer le message pour l'analyse
    const cleanMessage = this.cleanMessage(message);
    
    // Identifier la catégorie
    const categoryResult = this.categorizeMessage(cleanMessage);
    
    // Mettre à jour les patterns
    this.updatePatterns(cleanMessage, categoryResult.category, timestamp);
    
    // Sauvegarder
    this.saveToStorage();
    
    return {
      category: categoryResult.category,
      confidence: categoryResult.confidence,
      matchedPatterns: categoryResult.matchedPatterns,
      suggestions: this.generateSuggestions(cleanMessage, categoryResult.category)
    };
  }

  /**
   * Obtient l'analyse complète des questions récurrentes
   */
  getAnalysis(days: number = 30): AnalysisResult {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const recentMessages = this.messageHistory.filter(m => m.timestamp >= cutoffDate);
    
    // Top patterns
    const topPatterns = Array.from(this.patterns.values())
      .filter(p => p.lastSeen >= cutoffDate)
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 20);

    // Répartition par catégorie
    const categories = recentMessages.reduce((acc, message) => {
      const category = this.categorizeMessage(message.message).category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Tendances par jour
    const trends = this.calculateTrends(recentMessages, days);
    
    // Suggestions d'amélioration
    const suggestions = this.generateImprovementSuggestions(topPatterns);

    return {
      topPatterns,
      categories,
      trends,
      suggestions
    };
  }

  /**
   * Obtient les questions les plus fréquentes par catégorie
   */
  getTopQuestionsByCategory(category: string, limit: number = 10): QuestionPattern[] {
    return Array.from(this.patterns.values())
      .filter(p => p.category === category)
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, limit);
  }

  /**
   * Recherche des patterns similaires
   */
  findSimilarPatterns(query: string, threshold: number = 0.7): QuestionPattern[] {
    const cleanQuery = this.cleanMessage(query);
    const results: Array<{ pattern: QuestionPattern; similarity: number }> = [];

    for (const pattern of this.patterns.values()) {
      const similarity = this.calculateSimilarity(cleanQuery, pattern.pattern);
      if (similarity >= threshold) {
        results.push({ pattern, similarity });
      }
    }

    return results
      .sort((a, b) => b.similarity - a.similarity)
      .map(r => r.pattern)
      .slice(0, 10);
  }

  /**
   * Exporte les données d'analyse
   */
  exportAnalysisData(): {
    patterns: QuestionPattern[];
    messageHistory: typeof this.messageHistory;
    categories: QuestionCategory[];
    analysis: AnalysisResult;
  } {
    return {
      patterns: Array.from(this.patterns.values()),
      messageHistory: [...this.messageHistory],
      categories: [...this.CATEGORIES],
      analysis: this.getAnalysis()
    };
  }

  /**
   * Nettoie un message pour l'analyse
   */
  private cleanMessage(message: string): string {
    return message
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Supprimer la ponctuation
      .replace(/\s+/g, ' ') // Normaliser les espaces
      .trim();
  }

  /**
   * Catégorise un message
   */
  private categorizeMessage(message: string): {
    category: string;
    confidence: number;
    matchedPatterns: string[];
  } {
    let bestMatch = {
      category: 'Général',
      confidence: 0,
      matchedPatterns: [] as string[]
    };

    for (const category of this.CATEGORIES) {
      let score = 0;
      const matchedPatterns: string[] = [];

      // Score basé sur les mots-clés
      for (const keyword of category.keywords) {
        if (message.includes(keyword)) {
          score += 1;
          matchedPatterns.push(keyword);
        }
      }

      // Score basé sur les patterns regex
      for (const pattern of category.patterns) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(message)) {
          score += 2; // Les patterns ont plus de poids
          matchedPatterns.push(pattern);
        }
      }

      // Normaliser le score
      const confidence = Math.min(score / (category.keywords.length + category.patterns.length), 1);

      if (confidence > bestMatch.confidence) {
        bestMatch = {
          category: category.name,
          confidence,
          matchedPatterns
        };
      }
    }

    return bestMatch;
  }

  /**
   * Met à jour les patterns détectés
   */
  private updatePatterns(message: string, category: string, timestamp: Date): void {
    // Extraire des n-grammes (2-4 mots)
    const ngrams = this.extractNgrams(message, 2, 4);
    
    for (const ngram of ngrams) {
      if (ngram.length < 10) continue; // Ignorer les n-grammes trop courts
      
      const patternId = this.generatePatternId(ngram);
      
      if (this.patterns.has(patternId)) {
        const pattern = this.patterns.get(patternId)!;
        pattern.frequency++;
        pattern.lastSeen = timestamp;
        
        // Ajouter l'exemple s'il n'existe pas déjà
        if (!pattern.examples.includes(message) && pattern.examples.length < 5) {
          pattern.examples.push(message);
        }
      } else {
        // Nouveau pattern
        const newPattern: QuestionPattern = {
          id: patternId,
          pattern: ngram,
          category,
          frequency: 1,
          examples: [message],
          lastSeen: timestamp,
          confidence: 0.5
        };
        
        this.patterns.set(patternId, newPattern);
      }
    }
  }

  /**
   * Extrait des n-grammes d'un texte
   */
  private extractNgrams(text: string, minN: number, maxN: number): string[] {
    const words = text.split(' ').filter(w => w.length > 2);
    const ngrams: string[] = [];

    for (let n = minN; n <= maxN; n++) {
      for (let i = 0; i <= words.length - n; i++) {
        const ngram = words.slice(i, i + n).join(' ');
        if (ngram.length >= 10) { // Minimum 10 caractères
          ngrams.push(ngram);
        }
      }
    }

    return ngrams;
  }

  /**
   * Génère un ID unique pour un pattern
   */
  private generatePatternId(pattern: string): string {
    return pattern.replace(/\s+/g, '_').substring(0, 50);
  }

  /**
   * Calcule la similarité entre deux textes (Jaccard)
   */
  private calculateSimilarity(text1: string, text2: string): number {
    const words1 = new Set(text1.split(' '));
    const words2 = new Set(text2.split(' '));
    
    const intersection = new Set([...words1].filter(w => words2.has(w)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }

  /**
   * Calcule les tendances par jour
   */
  private calculateTrends(messages: typeof this.messageHistory, days: number): Array<{
    date: string;
    category: string;
    count: number;
  }> {
    const trends: Array<{ date: string; category: string; count: number }> = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayMessages = messages.filter(m => {
        const msgDate = m.timestamp.toISOString().split('T')[0];
        return msgDate === dateStr;
      });

      const categoryCounts = dayMessages.reduce((acc, message) => {
        const category = this.categorizeMessage(message.message).category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      for (const [category, count] of Object.entries(categoryCounts)) {
        trends.push({ date: dateStr, category, count });
      }
    }

    return trends.sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Génère des suggestions d'amélioration
   */
  private generateSuggestions(message: string, category: string): string[] {
    const suggestions: string[] = [];

    // Suggestions basées sur la catégorie
    switch (category) {
      case 'Développement Commercial':
        suggestions.push(
          'Consultez notre guide sur les stratégies de développement commercial',
          'Découvrez nos formations spécialisées en développement commercial',
          'Téléchargez notre outil d\'évaluation commerciale'
        );
        break;
      case 'Formation & Coaching':
        suggestions.push(
          'Explorez notre bootcamp de développement commercial',
          'Réservez un appel découverte pour un coaching personnalisé',
          'Consultez nos témoignages clients'
        );
        break;
      case 'PME & Entreprises':
        suggestions.push(
          'Découvrez nos solutions dédiées aux PME',
          'Consultez nos cas clients PME',
          'Téléchargez notre diagnostic PME gratuit'
        );
        break;
      default:
        suggestions.push(
          'Explorez nos ressources gratuites',
          'Contactez-nous pour un conseil personnalisé',
          'Consultez notre blog pour plus d\'informations'
        );
    }

    return suggestions;
  }

  /**
   * Génère des suggestions d'amélioration du système
   */
  private generateImprovementSuggestions(topPatterns: QuestionPattern[]): Array<{
    pattern: string;
    suggestedImprovement: string;
    priority: 'high' | 'medium' | 'low';
  }> {
    const suggestions = [];

    for (const pattern of topPatterns.slice(0, 10)) {
      let priority: 'high' | 'medium' | 'low' = 'low';
      let suggestedImprovement = '';

      if (pattern.frequency > 10) {
        priority = 'high';
        suggestedImprovement = `Cette question revient très souvent (${pattern.frequency} fois). Considérez ajouter une réponse automatique ou une FAQ dédiée.`;
      } else if (pattern.frequency > 5) {
        priority = 'medium';
        suggestedImprovement = `Question récurrente (${pattern.frequency} fois). Pourrait bénéficier d'une réponse pré-formatée.`;
      } else {
        priority = 'low';
        suggestedImprovement = `Question émergente (${pattern.frequency} fois). À surveiller pour voir si elle devient récurrente.`;
      }

      suggestions.push({
        pattern: pattern.pattern,
        suggestedImprovement,
        priority
      });
    }

    return suggestions;
  }

  /**
   * Sauvegarde les données
   */
  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const data = {
        patterns: Array.from(this.patterns.entries()),
        messageHistory: this.messageHistory.slice(-1000) // Garder seulement les 1000 derniers
      };
      
      localStorage.setItem('question_analysis', JSON.stringify(data));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'analyse:', error);
    }
  }

  /**
   * Charge les données
   */
  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('question_analysis');
      if (stored) {
        const data = JSON.parse(stored);
        
        if (data.patterns) {
          this.patterns = new Map(
            data.patterns.map(([id, pattern]: [string, any]) => [
              id,
              {
                ...pattern,
                lastSeen: new Date(pattern.lastSeen)
              }
            ])
          );
        }
        
        if (data.messageHistory) {
          this.messageHistory = data.messageHistory.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'analyse:', error);
    }
  }
}

// Instance singleton
export const questionAnalyzer = new QuestionAnalyzer();

// Hook pour React
export function useQuestionAnalyzer() {
  return {
    analyzeMessage: (message: string, sessionId: string) =>
      questionAnalyzer.analyzeMessage(message, sessionId),
    getAnalysis: (days?: number) =>
      questionAnalyzer.getAnalysis(days),
    getTopQuestionsByCategory: (category: string, limit?: number) =>
      questionAnalyzer.getTopQuestionsByCategory(category, limit),
    findSimilarPatterns: (query: string, threshold?: number) =>
      questionAnalyzer.findSimilarPatterns(query, threshold),
    exportAnalysisData: () =>
      questionAnalyzer.exportAnalysisData()
  };
}

export type { QuestionPattern, QuestionCategory, AnalysisResult };