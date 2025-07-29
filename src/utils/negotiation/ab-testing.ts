// Système de tests A/B pour l'optimisation des conversions
// Gestion des expériences, collecte de données et analyse des résultats

import { NegotiationTechnique } from '@/types/negotiation-technique';

export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  weight: number; // Pourcentage de trafic (0-100)
  changes: {
    selector: string;
    modifications: Record<string, any>;
  }[];
  isControl: boolean;
}

export interface ABTestMetric {
  id: string;
  name: string;
  type: 'conversion' | 'engagement' | 'revenue' | 'custom';
  goal: 'increase' | 'decrease';
  baseline: number;
  target: number;
  isPrimary: boolean;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  techniqueId: string;
  status: 'draft' | 'running' | 'paused' | 'completed' | 'archived';
  hypothesis: string;
  variants: ABTestVariant[];
  metrics: ABTestMetric[];
  targeting: {
    devices: ('desktop' | 'mobile' | 'tablet')[];
    sources: string[];
    countries: string[];
    customRules: Array<{
      condition: string;
      value: any;
    }>;
  };
  schedule: {
    startDate: Date;
    endDate?: Date;
    minDuration: number; // en jours
    minSampleSize: number;
  };
  results?: ABTestResults;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface ABTestResults {
  status: 'running' | 'completed' | 'inconclusive';
  duration: number; // en jours
  totalParticipants: number;
  variants: Record<string, {
    participants: number;
    conversions: number;
    conversionRate: number;
    revenue: number;
    metrics: Record<string, number>;
    confidence: number;
    improvement: number;
    isWinner: boolean;
    isStatisticallySignificant: boolean;
  }>;
  winner?: {
    variantId: string;
    confidence: number;
    improvement: number;
    recommendedAction: 'implement' | 'test_further' | 'abandon';
  };
  insights: Array<{
    type: 'success' | 'warning' | 'info';
    title: string;
    description: string;
    data?: Record<string, any>;
  }>;
  recommendations: string[];
}

export interface ABTestParticipant {
  sessionId: string;
  testId: string;
  variantId: string;
  assignedAt: Date;
  converted: boolean;
  conversionValue: number;
  events: Array<{
    type: string;
    timestamp: Date;
    data: Record<string, any>;
  }>;
}

/**
 * Gestionnaire de tests A/B
 */
export class ABTestManager {
  private activeTests: Map<string, ABTest> = new Map();
  private participants: Map<string, ABTestParticipant> = new Map();
  private storage: ABTestStorage;

  constructor(storage?: ABTestStorage) {
    this.storage = storage || new LocalStorageABTestStorage();
    this.loadActiveTests();
  }

  /**
   * Crée un nouveau test A/B
   */
  async createTest(testConfig: Omit<ABTest, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<ABTest> {
    const test: ABTest = {
      ...testConfig,
      id: this.generateTestId(),
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Valider la configuration
    this.validateTestConfig(test);

    // Calculer la taille d'échantillon minimale
    test.schedule.minSampleSize = this.calculateMinSampleSize(test);

    // Sauvegarder
    await this.storage.saveTest(test);

    return test;
  }

  /**
   * Démarre un test A/B
   */
  async startTest(testId: string): Promise<void> {
    const test = await this.storage.getTest(testId);
    if (!test) {
      throw new Error(`Test non trouvé: ${testId}`);
    }

    if (test.status !== 'draft') {
      throw new Error(`Le test doit être en statut 'draft' pour être démarré`);
    }

    test.status = 'running';
    test.schedule.startDate = new Date();
    test.updatedAt = new Date();

    await this.storage.saveTest(test);
    this.activeTests.set(testId, test);

    // Initialiser le tracking
    this.initializeTestTracking(test);

    console.log(`Test A/B démarré: ${testId}`);
  }

  /**
   * Met en pause un test A/B
   */
  async pauseTest(testId: string): Promise<void> {
    const test = await this.storage.getTest(testId);
    if (!test) {
      throw new Error(`Test non trouvé: ${testId}`);
    }

    test.status = 'paused';
    test.updatedAt = new Date();

    await this.storage.saveTest(test);
    this.activeTests.delete(testId);

    console.log(`Test A/B mis en pause: ${testId}`);
  }

  /**
   * Arrête un test A/B et calcule les résultats
   */
  async stopTest(testId: string): Promise<ABTestResults> {
    const test = await this.storage.getTest(testId);
    if (!test) {
      throw new Error(`Test non trouvé: ${testId}`);
    }

    test.status = 'completed';
    test.schedule.endDate = new Date();
    test.updatedAt = new Date();

    // Calculer les résultats
    const results = await this.calculateResults(test);
    test.results = results;

    await this.storage.saveTest(test);
    this.activeTests.delete(testId);

    console.log(`Test A/B terminé: ${testId}`, results);
    return results;
  }

  /**
   * Assigne un utilisateur à une variante de test
   */
  assignToVariant(sessionId: string, testId: string): ABTestVariant | null {
    const test = this.activeTests.get(testId);
    if (!test || test.status !== 'running') {
      return null;
    }

    // Vérifier si l'utilisateur est éligible
    if (!this.isUserEligible(sessionId, test)) {
      return null;
    }

    // Vérifier si déjà assigné
    const existingParticipant = this.participants.get(`${sessionId}_${testId}`);
    if (existingParticipant) {
      return test.variants.find(v => v.id === existingParticipant.variantId) || null;
    }

    // Assigner à une variante
    const variant = this.selectVariant(test.variants);
    
    // Créer le participant
    const participant: ABTestParticipant = {
      sessionId,
      testId,
      variantId: variant.id,
      assignedAt: new Date(),
      converted: false,
      conversionValue: 0,
      events: []
    };

    this.participants.set(`${sessionId}_${testId}`, participant);
    this.storage.saveParticipant(participant);

    // Appliquer les modifications de la variante
    this.applyVariantChanges(variant);

    // Tracker l'assignation
    this.trackEvent(sessionId, testId, 'variant_assigned', {
      variantId: variant.id,
      variantName: variant.name
    });

    return variant;
  }

  /**
   * Enregistre une conversion pour un participant
   */
  recordConversion(
    sessionId: string,
    testId: string,
    conversionType: string,
    value: number = 0,
    metadata?: Record<string, any>
  ): void {
    const participantKey = `${sessionId}_${testId}`;
    const participant = this.participants.get(participantKey);
    
    if (!participant) {
      console.warn(`Participant non trouvé: ${participantKey}`);
      return;
    }

    // Éviter les conversions multiples
    if (participant.converted) {
      return;
    }

    participant.converted = true;
    participant.conversionValue = value;

    // Enregistrer l'événement
    this.trackEvent(sessionId, testId, 'conversion', {
      conversionType,
      value,
      ...metadata
    });

    // Sauvegarder
    this.storage.saveParticipant(participant);

    console.log(`Conversion enregistrée: ${sessionId} -> ${testId} (${conversionType})`);
  }

  /**
   * Enregistre un événement personnalisé
   */
  trackEvent(
    sessionId: string,
    testId: string,
    eventType: string,
    data: Record<string, any>
  ): void {
    const participantKey = `${sessionId}_${testId}`;
    const participant = this.participants.get(participantKey);
    
    if (!participant) {
      return;
    }

    participant.events.push({
      type: eventType,
      timestamp: new Date(),
      data
    });

    // Envoyer vers Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_event', {
        test_id: testId,
        variant_id: participant.variantId,
        event_type: eventType,
        session_id: sessionId,
        ...data
      });
    }
  }

  /**
   * Récupère les résultats en temps réel d'un test
   */
  async getTestResults(testId: string): Promise<ABTestResults | null> {
    const test = await this.storage.getTest(testId);
    if (!test) {
      return null;
    }

    // Si le test est terminé, retourner les résultats sauvegardés
    if (test.status === 'completed' && test.results) {
      return test.results;
    }

    // Sinon, calculer les résultats actuels
    return this.calculateResults(test);
  }

  /**
   * Liste tous les tests pour une technique
   */
  async getTestsForTechnique(techniqueId: string): Promise<ABTest[]> {
    return this.storage.getTestsByTechnique(techniqueId);
  }

  /**
   * Génère un rapport de performance des tests A/B
   */
  async generateTestReport(testId: string): Promise<{
    summary: {
      testName: string;
      duration: number;
      participants: number;
      winner: string | null;
      improvement: number;
      confidence: number;
    };
    variantPerformance: Array<{
      name: string;
      participants: number;
      conversionRate: number;
      improvement: number;
      confidence: number;
    }>;
    timeline: Array<{
      date: string;
      participants: number;
      conversions: number;
    }>;
    insights: string[];
    recommendations: string[];
  }> {
    const test = await this.storage.getTest(testId);
    if (!test) {
      throw new Error(`Test non trouvé: ${testId}`);
    }

    const results = await this.getTestResults(testId);
    if (!results) {
      throw new Error(`Résultats non disponibles pour le test: ${testId}`);
    }

    const winner = results.winner;
    const winnerVariant = winner ? test.variants.find(v => v.id === winner.variantId) : null;

    return {
      summary: {
        testName: test.name,
        duration: results.duration,
        participants: results.totalParticipants,
        winner: winnerVariant?.name || null,
        improvement: winner?.improvement || 0,
        confidence: winner?.confidence || 0
      },
      variantPerformance: test.variants.map(variant => {
        const variantResults = results.variants[variant.id];
        return {
          name: variant.name,
          participants: variantResults?.participants || 0,
          conversionRate: variantResults?.conversionRate || 0,
          improvement: variantResults?.improvement || 0,
          confidence: variantResults?.confidence || 0
        };
      }),
      timeline: this.generateTimeline(test, results),
      insights: results.insights.map(i => i.description),
      recommendations: results.recommendations
    };
  }

  // Méthodes privées

  private async loadActiveTests(): Promise<void> {
    const allTests = await this.storage.getAllTests();
    const activeTests = allTests.filter(test => test.status === 'running');
    
    for (const test of activeTests) {
      this.activeTests.set(test.id, test);
      this.initializeTestTracking(test);
    }
  }

  private validateTestConfig(test: ABTest): void {
    // Vérifier les variantes
    if (test.variants.length < 2) {
      throw new Error('Un test A/B doit avoir au moins 2 variantes');
    }

    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
    if (Math.abs(totalWeight - 100) > 0.01) {
      throw new Error('Le poids total des variantes doit être de 100%');
    }

    const controlVariants = test.variants.filter(v => v.isControl);
    if (controlVariants.length !== 1) {
      throw new Error('Il doit y avoir exactement une variante de contrôle');
    }

    // Vérifier les métriques
    if (test.metrics.length === 0) {
      throw new Error('Au moins une métrique doit être définie');
    }

    const primaryMetrics = test.metrics.filter(m => m.isPrimary);
    if (primaryMetrics.length !== 1) {
      throw new Error('Il doit y avoir exactement une métrique primaire');
    }
  }

  private calculateMinSampleSize(test: ABTest): number {
    const primaryMetric = test.metrics.find(m => m.isPrimary);
    if (!primaryMetric) return 1000;

    const baseline = primaryMetric.baseline / 100; // Convertir en décimal
    const target = primaryMetric.target / 100;
    const effect = Math.abs(target - baseline) / baseline;
    
    // Formule simplifiée pour la taille d'échantillon
    // En production, utiliser une librairie statistique appropriée
    const alpha = 0.05; // Niveau de signification
    const beta = 0.2;   // Puissance statistique (80%)
    const z_alpha = 1.96; // Valeur critique pour alpha = 0.05
    const z_beta = 0.84;  // Valeur critique pour beta = 0.2
    
    const numerator = Math.pow(z_alpha + z_beta, 2) * 2 * baseline * (1 - baseline);
    const denominator = Math.pow(effect * baseline, 2);
    
    return Math.ceil(numerator / denominator);
  }

  private initializeTestTracking(test: ABTest): void {
    // Initialiser le tracking pour le test
    console.log(`Initializing tracking for test: ${test.id}`);
    
    // En production, ceci configurerait le tracking côté client
    if (typeof window !== 'undefined') {
      // Ajouter le test à la liste des tests actifs côté client
      (window as any).activeABTests = (window as any).activeABTests || {};
      (window as any).activeABTests[test.id] = test;
    }
  }

  private isUserEligible(sessionId: string, test: ABTest): boolean {
    // Vérifier l'éligibilité de l'utilisateur
    // En production, ceci vérifierait les critères de ciblage
    
    // Vérifier les règles de ciblage personnalisées
    for (const rule of test.targeting.customRules) {
      if (!this.evaluateTargetingRule(sessionId, rule)) {
        return false;
      }
    }

    return true;
  }

  private evaluateTargetingRule(sessionId: string, rule: { condition: string; value: any }): boolean {
    // Évaluer une règle de ciblage
    // En production, ceci évaluerait les conditions complexes
    switch (rule.condition) {
      case 'device_type':
        return this.getUserDeviceType(sessionId) === rule.value;
      case 'traffic_source':
        return this.getUserTrafficSource(sessionId) === rule.value;
      case 'returning_visitor':
        return this.isReturningVisitor(sessionId) === rule.value;
      default:
        return true;
    }
  }

  private selectVariant(variants: ABTestVariant[]): ABTestVariant {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const variant of variants) {
      cumulative += variant.weight;
      if (random <= cumulative) {
        return variant;
      }
    }
    
    return variants[0]; // Fallback
  }

  private applyVariantChanges(variant: ABTestVariant): void {
    // Appliquer les modifications de la variante
    if (typeof window === 'undefined') return;

    for (const change of variant.changes) {
      const elements = document.querySelectorAll(change.selector);
      
      elements.forEach(element => {
        Object.entries(change.modifications).forEach(([property, value]) => {
          if (property === 'textContent') {
            element.textContent = value as string;
          } else if (property === 'innerHTML') {
            element.innerHTML = value as string;
          } else if (property === 'style') {
            Object.assign((element as HTMLElement).style, value);
          } else if (property === 'className') {
            element.className = value as string;
          } else if (property === 'attribute') {
            const [attrName, attrValue] = value as [string, string];
            element.setAttribute(attrName, attrValue);
          } else {
            (element as any)[property] = value;
          }
        });
      });
    }
  }

  private async calculateResults(test: ABTest): Promise<ABTestResults> {
    const participants = await this.storage.getParticipantsByTest(test.id);
    const variantResults: Record<string, any> = {};
    
    // Calculer les résultats pour chaque variante
    for (const variant of test.variants) {
      const variantParticipants = participants.filter(p => p.variantId === variant.id);
      const conversions = variantParticipants.filter(p => p.converted);
      
      const conversionRate = variantParticipants.length > 0 
        ? (conversions.length / variantParticipants.length) * 100 
        : 0;
      
      const revenue = conversions.reduce((sum, p) => sum + p.conversionValue, 0);
      
      variantResults[variant.id] = {
        participants: variantParticipants.length,
        conversions: conversions.length,
        conversionRate,
        revenue,
        metrics: this.calculateVariantMetrics(variantParticipants, test.metrics),
        confidence: 0, // Sera calculé plus tard
        improvement: 0, // Sera calculé plus tard
        isWinner: false,
        isStatisticallySignificant: false
      };
    }

    // Calculer la signification statistique et déterminer le gagnant
    const controlVariant = test.variants.find(v => v.isControl);
    if (controlVariant) {
      const controlResults = variantResults[controlVariant.id];
      
      for (const variant of test.variants) {
        if (variant.isControl) continue;
        
        const variantResult = variantResults[variant.id];
        const significance = this.calculateStatisticalSignificance(
          controlResults,
          variantResult
        );
        
        variantResult.confidence = significance.confidence;
        variantResult.improvement = significance.improvement;
        variantResult.isStatisticallySignificant = significance.isSignificant;
      }
    }

    // Déterminer le gagnant
    const winner = this.determineWinner(test.variants, variantResults);
    
    // Générer des insights
    const insights = this.generateInsights(test, variantResults);
    
    // Générer des recommandations
    const recommendations = this.generateRecommendations(test, variantResults, winner);

    const totalParticipants = Object.values(variantResults).reduce(
      (sum: number, result: any) => sum + result.participants, 0
    );

    const duration = test.schedule.endDate 
      ? Math.ceil((test.schedule.endDate.getTime() - test.schedule.startDate.getTime()) / (1000 * 60 * 60 * 24))
      : Math.ceil((Date.now() - test.schedule.startDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
      status: test.status === 'completed' ? 'completed' : 'running',
      duration,
      totalParticipants,
      variants: variantResults,
      winner,
      insights,
      recommendations
    };
  }

  private calculateVariantMetrics(participants: ABTestParticipant[], metrics: ABTestMetric[]): Record<string, number> {
    const results: Record<string, number> = {};
    
    for (const metric of metrics) {
      switch (metric.type) {
        case 'conversion':
          results[metric.id] = (participants.filter(p => p.converted).length / participants.length) * 100;
          break;
        case 'revenue':
          results[metric.id] = participants.reduce((sum, p) => sum + p.conversionValue, 0);
          break;
        case 'engagement':
          // Calculer l'engagement basé sur les événements
          results[metric.id] = participants.reduce((sum, p) => sum + p.events.length, 0) / participants.length;
          break;
        default:
          results[metric.id] = 0;
      }
    }
    
    return results;
  }

  private calculateStatisticalSignificance(
    controlResults: any,
    variantResults: any
  ): { confidence: number; improvement: number; isSignificant: boolean } {
    // Calcul simplifié de la signification statistique
    // En production, utiliser une librairie statistique appropriée
    
    const controlRate = controlResults.conversionRate / 100;
    const variantRate = variantResults.conversionRate / 100;
    const controlSize = controlResults.participants;
    const variantSize = variantResults.participants;
    
    if (controlSize === 0 || variantSize === 0) {
      return { confidence: 0, improvement: 0, isSignificant: false };
    }
    
    // Calcul de l'amélioration
    const improvement = controlRate > 0 ? ((variantRate - controlRate) / controlRate) * 100 : 0;
    
    // Calcul simplifié de la confiance (en réalité, utiliser un test z ou t)
    const pooledRate = (controlResults.conversions + variantResults.conversions) / (controlSize + variantSize);
    const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * (1/controlSize + 1/variantSize));
    const zScore = Math.abs(variantRate - controlRate) / standardError;
    
    // Convertir le z-score en niveau de confiance (approximation)
    const confidence = Math.min(95, Math.max(0, (1 - 2 * (1 - this.normalCDF(Math.abs(zScore)))) * 100));
    const isSignificant = confidence >= 95;
    
    return { confidence, improvement, isSignificant };
  }

  private normalCDF(x: number): number {
    // Approximation de la fonction de répartition normale
    return 0.5 * (1 + this.erf(x / Math.sqrt(2)));
  }

  private erf(x: number): number {
    // Approximation de la fonction d'erreur
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
    
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
    return sign * y;
  }

  private determineWinner(
    variants: ABTestVariant[],
    results: Record<string, any>
  ): ABTestResults['winner'] | undefined {
    const controlVariant = variants.find(v => v.isControl);
    if (!controlVariant) return undefined;
    
    const controlResults = results[controlVariant.id];
    let bestVariant = controlVariant;
    let bestImprovement = 0;
    let bestConfidence = 0;
    
    for (const variant of variants) {
      if (variant.isControl) continue;
      
      const variantResults = results[variant.id];
      if (variantResults.improvement > bestImprovement && variantResults.isStatisticallySignificant) {
        bestVariant = variant;
        bestImprovement = variantResults.improvement;
        bestConfidence = variantResults.confidence;
      }
    }
    
    if (bestVariant.isControl) {
      return undefined; // Pas de gagnant clair
    }
    
    // Déterminer l'action recommandée
    let recommendedAction: 'implement' | 'test_further' | 'abandon';
    if (bestConfidence >= 95 && bestImprovement >= 10) {
      recommendedAction = 'implement';
    } else if (bestConfidence >= 80 && bestImprovement >= 5) {
      recommendedAction = 'test_further';
    } else {
      recommendedAction = 'abandon';
    }
    
    return {
      variantId: bestVariant.id,
      confidence: bestConfidence,
      improvement: bestImprovement,
      recommendedAction
    };
  }

  private generateInsights(test: ABTest, results: Record<string, any>): ABTestResults['insights'] {
    const insights = [];
    
    // Insight sur la taille d'échantillon
    const totalParticipants = Object.values(results).reduce(
      (sum: number, result: any) => sum + result.participants, 0
    );
    
    if (totalParticipants < test.schedule.minSampleSize) {
      insights.push({
        type: 'warning' as const,
        title: 'Taille d\'échantillon insuffisante',
        description: `${totalParticipants} participants vs ${test.schedule.minSampleSize} requis. Les résultats peuvent ne pas être fiables.`
      });
    }
    
    // Insight sur les performances
    const controlVariant = test.variants.find(v => v.isControl);
    if (controlVariant) {
      const controlResults = results[controlVariant.id];
      const bestVariant = Object.entries(results).reduce((best, [id, result]: [string, any]) => 
        result.conversionRate > best.result.conversionRate ? { id, result } : best
      , { id: controlVariant.id, result: controlResults });
      
      if (bestVariant.id !== controlVariant.id) {
        const improvement = bestVariant.result.improvement;
        insights.push({
          type: 'success' as const,
          title: 'Amélioration détectée',
          description: `La variante gagnante montre une amélioration de ${improvement.toFixed(1)}% par rapport au contrôle.`,
          data: { improvement, variantId: bestVariant.id }
        });
      }
    }
    
    return insights;
  }

  private generateRecommendations(
    test: ABTest,
    results: Record<string, any>,
    winner?: ABTestResults['winner']
  ): string[] {
    const recommendations = [];
    
    if (winner) {
      switch (winner.recommendedAction) {
        case 'implement':
          recommendations.push(`Implémenter la variante gagnante (amélioration de ${winner.improvement.toFixed(1)}% avec ${winner.confidence.toFixed(1)}% de confiance)`);
          break;
        case 'test_further':
          recommendations.push('Prolonger le test pour obtenir plus de données avant de prendre une décision');
          break;
        case 'abandon':
          recommendations.push('Aucune amélioration significative détectée. Considérer d\'autres approches d\'optimisation');
          break;
      }
    } else {
      recommendations.push('Aucun gagnant clair. Analyser les résultats par segment ou prolonger le test');
    }
    
    // Recommandations basées sur les métriques
    const primaryMetric = test.metrics.find(m => m.isPrimary);
    if (primaryMetric) {
      const allResults = Object.values(results) as any[];
      const avgPerformance = allResults.reduce((sum, r) => sum + r.conversionRate, 0) / allResults.length;
      
      if (avgPerformance < primaryMetric.baseline) {
        recommendations.push('Performance globalement en dessous de la baseline. Revoir la stratégie de test');
      }
    }
    
    return recommendations;
  }

  private generateTimeline(test: ABTest, results: ABTestResults): Array<{ date: string; participants: number; conversions: number }> {
    // Générer une timeline simplifiée
    const timeline = [];
    const startDate = test.schedule.startDate;
    const endDate = test.schedule.endDate || new Date();
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i < Math.min(days, 30); i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      timeline.push({
        date: date.toISOString().split('T')[0],
        participants: Math.floor(results.totalParticipants * (i + 1) / days),
        conversions: Math.floor(Object.values(results.variants).reduce(
          (sum: number, variant: any) => sum + variant.conversions, 0
        ) * (i + 1) / days)
      });
    }
    
    return timeline;
  }

  private generateTestId(): string {
    return `abtest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUserDeviceType(sessionId: string): string {
    // En production, récupérer le type d'appareil depuis les données de session
    return 'desktop'; // Simulé
  }

  private getUserTrafficSource(sessionId: string): string {
    // En production, récupérer la source de trafic depuis les données de session
    return 'organic'; // Simulé
  }

  private isReturningVisitor(sessionId: string): boolean {
    // En production, vérifier si c'est un visiteur récurrent
    return false; // Simulé
  }
}

/**
 * Interface pour le stockage des tests A/B
 */
export interface ABTestStorage {
  saveTest(test: ABTest): Promise<void>;
  getTest(testId: string): Promise<ABTest | null>;
  getAllTests(): Promise<ABTest[]>;
  getTestsByTechnique(techniqueId: string): Promise<ABTest[]>;
  saveParticipant(participant: ABTestParticipant): Promise<void>;
  getParticipantsByTest(testId: string): Promise<ABTestParticipant[]>;
}

/**
 * Implémentation du stockage en localStorage (pour le développement)
 */
export class LocalStorageABTestStorage implements ABTestStorage {
  private readonly TESTS_KEY = 'ab_tests';
  private readonly PARTICIPANTS_KEY = 'ab_participants';

  async saveTest(test: ABTest): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const tests = this.getStoredTests();
    tests[test.id] = test;
    localStorage.setItem(this.TESTS_KEY, JSON.stringify(tests));
  }

  async getTest(testId: string): Promise<ABTest | null> {
    if (typeof window === 'undefined') return null;
    
    const tests = this.getStoredTests();
    return tests[testId] || null;
  }

  async getAllTests(): Promise<ABTest[]> {
    if (typeof window === 'undefined') return [];
    
    const tests = this.getStoredTests();
    return Object.values(tests);
  }

  async getTestsByTechnique(techniqueId: string): Promise<ABTest[]> {
    const allTests = await this.getAllTests();
    return allTests.filter(test => test.techniqueId === techniqueId);
  }

  async saveParticipant(participant: ABTestParticipant): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const participants = this.getStoredParticipants();
    const key = `${participant.sessionId}_${participant.testId}`;
    participants[key] = participant;
    localStorage.setItem(this.PARTICIPANTS_KEY, JSON.stringify(participants));
  }

  async getParticipantsByTest(testId: string): Promise<ABTestParticipant[]> {
    if (typeof window === 'undefined') return [];
    
    const participants = this.getStoredParticipants();
    return Object.values(participants).filter(p => p.testId === testId);
  }

  private getStoredTests(): Record<string, ABTest> {
    try {
      return JSON.parse(localStorage.getItem(this.TESTS_KEY) || '{}');
    } catch {
      return {};
    }
  }

  private getStoredParticipants(): Record<string, ABTestParticipant> {
    try {
      return JSON.parse(localStorage.getItem(this.PARTICIPANTS_KEY) || '{}');
    } catch {
      return {};
    }
  }
}

// Types pour TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    activeABTests: Record<string, ABTest>;
  }
}