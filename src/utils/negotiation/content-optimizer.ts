// Optimiseur de contenu pour les techniques de négociation
// Maintenance, enrichissement et amélioration continue du contenu

import { NegotiationTechnique } from '@/types/negotiation-technique';

export interface ContentAnalysis {
  techniqueId: string;
  lastAnalyzed: Date;
  quality: {
    score: number; // 0-100
    category: 'excellent' | 'good' | 'needs_improvement' | 'poor';
    factors: {
      readability: number;
      completeness: number;
      accuracy: number;
      engagement: number;
      seoOptimization: number;
    };
  };
  issues: Array<{
    type: 'error' | 'warning' | 'suggestion';
    category: 'content' | 'seo' | 'structure' | 'accessibility';
    title: string;
    description: string;
    location: string;
    priority: 'high' | 'medium' | 'low';
    autoFixable: boolean;
  }>;
  opportunities: Array<{
    type: 'enhancement' | 'expansion' | 'update';
    title: string;
    description: string;
    expectedImpact: string;
    effort: 'low' | 'medium' | 'high';
    priority: 'high' | 'medium' | 'low';
  }>;
  metrics: {
    wordCount: number;
    readingTime: number;
    keywordDensity: Record<string, number>;
    internalLinks: number;
    externalLinks: number;
    images: number;
    headings: Record<string, number>;
  };
  trends: {
    userEngagement: 'increasing' | 'stable' | 'decreasing';
    searchRankings: 'improving' | 'stable' | 'declining';
    conversionRate: 'increasing' | 'stable' | 'decreasing';
  };
}

export interface ContentUpdatePlan {
  techniqueId: string;
  version: string;
  plannedDate: Date;
  type: 'major' | 'minor' | 'patch';
  changes: Array<{
    section: string;
    type: 'add' | 'update' | 'remove' | 'restructure';
    description: string;
    content?: string;
    rationale: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  newFeatures: Array<{
    name: string;
    description: string;
    implementation: string;
  }>;
  improvements: Array<{
    area: string;
    description: string;
    expectedBenefit: string;
  }>;
  resources: {
    timeEstimate: string;
    requiredSkills: string[];
    dependencies: string[];
  };
}

/**
 * Optimiseur de contenu pour les techniques de négociation
 */
export class ContentOptimizer {
  private analysisCache: Map<string, ContentAnalysis> = new Map();

  constructor() {
    // Initialisation
  }

  /**
   * Analyse la qualité du contenu d'une technique
   */
  async analyzeContent(technique: NegotiationTechnique): Promise<ContentAnalysis> {
    const analysis: ContentAnalysis = {
      techniqueId: technique.id,
      lastAnalyzed: new Date(),
      quality: await this.assessContentQuality(technique),
      issues: await this.identifyIssues(technique),
      opportunities: await this.identifyOpportunities(technique),
      metrics: await this.calculateContentMetrics(technique),
      trends: await this.analyzeTrends(technique)
    };

    this.analysisCache.set(technique.id, analysis);
    return analysis;
  }

  /**
   * Génère un plan de mise à jour du contenu
   */
  async generateUpdatePlan(
    technique: NegotiationTechnique,
    analysis: ContentAnalysis,
    targetImprovements: string[]
  ): Promise<ContentUpdatePlan> {
    const changes = await this.planContentChanges(technique, analysis, targetImprovements);
    const newFeatures = await this.identifyNewFeatures(technique, analysis);
    const improvements = await this.planImprovements(technique, analysis);

    return {
      techniqueId: technique.id,
      version: this.generateVersionNumber(technique),
      plannedDate: this.calculateOptimalUpdateDate(analysis),
      type: this.determineUpdateType(changes),
      changes,
      newFeatures,
      improvements,
      resources: this.estimateResources(changes, newFeatures, improvements)
    };
  }

  /**
   * Applique automatiquement les corrections mineures
   */
  async autoFixContent(technique: NegotiationTechnique): Promise<{
    applied: Array<{
      type: string;
      description: string;
      location: string;
    }>;
    skipped: Array<{
      type: string;
      reason: string;
      location: string;
    }>;
  }> {
    const analysis = await this.analyzeContent(technique);
    const applied = [];
    const skipped = [];

    for (const issue of analysis.issues) {
      if (issue.autoFixable && issue.priority === 'high') {
        try {
          const fixed = await this.applyAutoFix(technique, issue);
          if (fixed) {
            applied.push({
              type: issue.type,
              description: issue.description,
              location: issue.location
            });
          } else {
            skipped.push({
              type: issue.type,
              reason: 'Échec de l\'application automatique',
              location: issue.location
            });
          }
        } catch (error) {
          skipped.push({
            type: issue.type,
            reason: error instanceof Error ? error.message : 'Erreur inconnue',
            location: issue.location
          });
        }
      } else {
        skipped.push({
          type: issue.type,
          reason: issue.autoFixable ? 'Priorité faible' : 'Correction manuelle requise',
          location: issue.location
        });
      }
    }

    return { applied, skipped };
  }

  /**
   * Enrichit le contenu avec de nouveaux éléments
   */
  async enrichContent(
    technique: NegotiationTechnique,
    enrichmentType: 'case_studies' | 'testimonials' | 'resources' | 'examples',
    count: number = 1
  ): Promise<Array<{
    type: string;
    content: any;
    placement: string;
    rationale: string;
  }>> {
    const enrichments = [];

    switch (enrichmentType) {
      case 'case_studies':
        const newCaseStudies = await this.generateCaseStudies(technique, count);
        enrichments.push(...newCaseStudies.map(cs => ({
          type: 'case_study',
          content: cs,
          placement: 'caseStudies',
          rationale: 'Ajouter des exemples concrets pour améliorer la crédibilité'
        })));
        break;

      case 'testimonials':
        const newTestimonials = await this.generateTestimonials(technique, count);
        enrichments.push(...newTestimonials.map(t => ({
          type: 'testimonial',
          content: t,
          placement: 'testimonials',
          rationale: 'Renforcer la preuve sociale et la confiance'
        })));
        break;

      case 'resources':
        const newResources = await this.generateResources(technique, count);
        enrichments.push(...newResources.map(r => ({
          type: 'resource',
          content: r,
          placement: 'downloadableResources',
          rationale: 'Augmenter la valeur perçue et les conversions'
        })));
        break;

      case 'examples':
        const newExamples = await this.generateExamples(technique, count);
        enrichments.push(...newExamples.map(e => ({
          type: 'example',
          content: e,
          placement: 'stepByStepGuide',
          rationale: 'Améliorer la compréhension pratique'
        })));
        break;
    }

    return enrichments;
  }

  // Méthodes privées pour l'analyse de qualité

  private async assessContentQuality(technique: NegotiationTechnique): Promise<ContentAnalysis['quality']> {
    const factors = {
      readability: await this.assessReadability(technique),
      completeness: await this.assessCompleteness(technique),
      accuracy: await this.assessAccuracy(technique),
      engagement: await this.assessEngagement(technique),
      seoOptimization: await this.assessSEOOptimization(technique)
    };

    const weights = {
      readability: 0.2,
      completeness: 0.25,
      accuracy: 0.2,
      engagement: 0.2,
      seoOptimization: 0.15
    };

    const score = Object.entries(factors).reduce(
      (sum, [key, value]) => sum + value * weights[key as keyof typeof weights], 0
    );

    let category: 'excellent' | 'good' | 'needs_improvement' | 'poor';
    if (score >= 85) category = 'excellent';
    else if (score >= 70) category = 'good';
    else if (score >= 50) category = 'needs_improvement';
    else category = 'poor';

    return { score: Math.round(score), category, factors };
  }

  private async identifyIssues(technique: NegotiationTechnique): Promise<ContentAnalysis['issues']> {
    const issues = [];

    // Vérifier la longueur du contenu
    if (technique.description.length < 100) {
      issues.push({
        type: 'warning' as const,
        category: 'content' as const,
        title: 'Description trop courte',
        description: 'La description devrait faire au moins 100 caractères',
        location: 'description',
        priority: 'medium' as const,
        autoFixable: false
      });
    }

    // Vérifier les étapes du guide
    if (technique.stepByStepGuide.length < 4) {
      issues.push({
        type: 'error' as const,
        category: 'content' as const,
        title: 'Guide incomplet',
        description: 'Le guide pratique devrait avoir au moins 4 étapes',
        location: 'stepByStepGuide',
        priority: 'high' as const,
        autoFixable: false
      });
    }

    // Vérifier les cas clients
    if (technique.caseStudies.length < 2) {
      issues.push({
        type: 'warning' as const,
        category: 'content' as const,
        title: 'Pas assez de cas clients',
        description: 'Il devrait y avoir au moins 2 cas clients pour la crédibilité',
        location: 'caseStudies',
        priority: 'medium' as const,
        autoFixable: false
      });
    }

    // Vérifier les mots-clés SEO
    if (!technique.seoMetadata?.keywords || technique.seoMetadata.keywords.length < 5) {
      issues.push({
        type: 'warning' as const,
        category: 'seo' as const,
        title: 'Mots-clés SEO insuffisants',
        description: 'Il devrait y avoir au moins 5 mots-clés pour le SEO',
        location: 'seoMetadata.keywords',
        priority: 'medium' as const,
        autoFixable: true
      });
    }

    return issues;
  }

  private async identifyOpportunities(technique: NegotiationTechnique): Promise<ContentAnalysis['opportunities']> {
    const opportunities = [];

    // Opportunité d'ajouter des témoignages
    if (!technique.testimonials || technique.testimonials.length < 2) {
      opportunities.push({
        type: 'enhancement' as const,
        title: 'Ajouter des témoignages clients',
        description: 'Les témoignages renforcent la crédibilité et la confiance',
        expectedImpact: '+15-25% de conversions',
        effort: 'medium' as const,
        priority: 'high' as const
      });
    }

    // Opportunité d'ajouter des outils interactifs
    if (!technique.interactiveChecklist || technique.interactiveChecklist.length === 0) {
      opportunities.push({
        type: 'enhancement' as const,
        title: 'Créer des outils interactifs',
        description: 'Checklists et calculateurs augmentent l\'engagement',
        expectedImpact: '+20-30% temps sur page',
        effort: 'high' as const,
        priority: 'medium' as const
      });
    }

    // Opportunité d'enrichir les ressources
    if (technique.downloadableResources.length < 2) {
      opportunities.push({
        type: 'expansion' as const,
        title: 'Enrichir les ressources téléchargeables',
        description: 'Plus de ressources = plus de leads qualifiés',
        expectedImpact: '+30-40% téléchargements',
        effort: 'medium' as const,
        priority: 'high' as const
      });
    }

    return opportunities;
  }

  private async calculateContentMetrics(technique: NegotiationTechnique): Promise<ContentAnalysis['metrics']> {
    const content = this.extractTextContent(technique);
    
    return {
      wordCount: content.split(/\s+/).length,
      readingTime: Math.ceil(content.split(/\s+/).length / 200), // 200 mots/minute
      keywordDensity: this.calculateKeywordDensity(content, technique.seoMetadata?.keywords || []),
      internalLinks: this.countInternalLinks(technique),
      externalLinks: this.countExternalLinks(technique),
      images: this.countImages(technique),
      headings: this.countHeadings(technique)
    };
  }

  private async analyzeTrends(technique: NegotiationTechnique): Promise<ContentAnalysis['trends']> {
    // En production, analyser les vraies données de performance
    return {
      userEngagement: 'stable',
      searchRankings: 'improving',
      conversionRate: 'increasing'
    };
  }

  // Méthodes utilitaires

  private extractTextContent(technique: NegotiationTechnique): string {
    let content = '';
    content += technique.title + ' ';
    content += technique.description + ' ';
    content += technique.laurentVision + ' ';
    content += technique.pmeAdaptation + ' ';
    
    technique.stepByStepGuide.forEach(step => {
      content += step.title + ' ';
      content += step.description + ' ';
      content += step.script + ' ';
      content += step.example + ' ';
    });
    
    technique.caseStudies.forEach(cs => {
      content += cs.challenge + ' ';
      content += cs.application + ' ';
      content += cs.results + ' ';
    });
    
    return content;
  }

  private calculateKeywordDensity(content: string, keywords: string[]): Record<string, number> {
    const words = content.toLowerCase().split(/\s+/);
    const totalWords = words.length;
    const density: Record<string, number> = {};
    
    keywords.forEach(keyword => {
      const keywordWords = keyword.toLowerCase().split(/\s+/);
      let count = 0;
      
      for (let i = 0; i <= words.length - keywordWords.length; i++) {
        const phrase = words.slice(i, i + keywordWords.length).join(' ');
        if (phrase === keyword.toLowerCase()) {
          count++;
        }
      }
      
      density[keyword] = (count / totalWords) * 100;
    });
    
    return density;
  }

  private countInternalLinks(technique: NegotiationTechnique): number {
    return (technique.relatedTechniques?.length || 0) + 
           (technique.downloadableResources?.length || 0);
  }

  private countExternalLinks(technique: NegotiationTechnique): number {
    // Compter les liens externes dans le contenu
    let count = 0;
    
    // Vérifier dans les ressources téléchargeables
    technique.downloadableResources.forEach(resource => {
      if (resource.url.startsWith('http')) count++;
    });
    
    return count;
  }

  private countImages(technique: NegotiationTechnique): number {
    // Compter les images référencées
    let count = 0;
    
    // Images dans les témoignages
    if (technique.testimonials) {
      count += technique.testimonials.length;
    }
    
    // Images dans les badges de crédibilité
    if (technique.credibilityBadges) {
      count += technique.credibilityBadges.length;
    }
    
    return count;
  }

  private countHeadings(technique: NegotiationTechnique): Record<string, number> {
    const headings = { h1: 1, h2: 0, h3: 0, h4: 0 }; // h1 = titre principal
    
    // h2 pour les sections principales
    headings.h2 += 6; // Hero, Expertise, Guide, Cas, Erreurs, Outils
    
    // h3 pour les sous-sections
    headings.h3 += technique.stepByStepGuide.length; // Chaque étape
    headings.h3 += technique.caseStudies.length; // Chaque cas client
    headings.h3 += technique.commonMistakes.length; // Chaque erreur
    
    return headings;
  }

  // Méthodes de génération de contenu

  private async generateCaseStudies(technique: NegotiationTechnique, count: number): Promise<any[]> {
    const industries = ['Services IT', 'Conseil RH', 'E-commerce', 'Manufacturing', 'Santé'];
    const caseStudies = [];

    for (let i = 0; i < count; i++) {
      const industry = industries[Math.floor(Math.random() * industries.length)];
      caseStudies.push({
        industry: `PME ${industry} (${Math.floor(Math.random() * 50) + 20} salariés)`,
        challenge: `Défi spécifique lié à ${technique.title.toLowerCase()}`,
        application: `Application de ${technique.title} dans le contexte ${industry}`,
        results: `Résultats mesurables avec amélioration de ${Math.floor(Math.random() * 30) + 20}%`,
        metrics: {
          improvement: `+${Math.floor(Math.random() * 40) + 20}%`,
          satisfaction: `${Math.floor(Math.random() * 2) + 8.5}/10`,
          roi: `+${Math.floor(Math.random() * 50) + 25}% ROI`
        }
      });
    }

    return caseStudies;
  }

  private async generateTestimonials(technique: NegotiationTechnique, count: number): Promise<any[]> {
    const names = ['Marie D.', 'Pierre L.', 'Sophie M.', 'Jean-Paul R.', 'Isabelle T.'];
    const companies = ['Conseil Marketing', 'Solutions Tech', 'Services Pro', 'Expertise Plus', 'Business Conseil'];
    const roles = ['Directrice', 'CEO', 'Responsable Commercial', 'Consultant Senior', 'Manager'];
    
    const testimonials = [];

    for (let i = 0; i < count; i++) {
      testimonials.push({
        name: names[Math.floor(Math.random() * names.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        role: roles[Math.floor(Math.random() * roles.length)],
        quote: `${technique.title} a transformé ma façon de négocier. Les résultats sont impressionnants et mes clients apprécient cette approche professionnelle.`,
        result: `+${Math.floor(Math.random() * 40) + 20}% de réussite en négociation`,
        avatar: names[i]?.split(' ')[0]?.charAt(0) + names[i]?.split(' ')[1]?.charAt(0) || 'XX'
      });
    }

    return testimonials;
  }

  private async generateResources(technique: NegotiationTechnique, count: number): Promise<any[]> {
    const resourceTypes = [
      { type: 'Guide PDF', description: 'guide complet avec exemples pratiques' },
      { type: 'Checklist', description: 'checklist des points clés à retenir' },
      { type: 'Template', description: 'modèle de script prêt à utiliser' },
      { type: 'Calculateur', description: 'outil de calcul pour optimiser la technique' }
    ];

    const resources = [];

    for (let i = 0; i < count; i++) {
      const resourceType = resourceTypes[i % resourceTypes.length];
      resources.push({
        title: `${resourceType.type} - ${technique.title}`,
        description: `${resourceType.description} pour maîtriser ${technique.title.toLowerCase()}`,
        type: 'PDF',
        url: `/ressources/downloads/${technique.slug}-${resourceType.type.toLowerCase().replace(' ', '-')}.pdf`
      });
    }

    return resources;
  }

  private async generateExamples(technique: NegotiationTechnique, count: number): Promise<any[]> {
    const contexts = ['Vente B2B', 'Négociation salariale', 'Achat fournisseur', 'Partenariat commercial'];
    const examples = [];

    for (let i = 0; i < count; i++) {
      const context = contexts[i % contexts.length];
      examples.push({
        context,
        situation: `Situation typique en ${context.toLowerCase()}`,
        application: `Comment appliquer ${technique.title} dans ce contexte`,
        script: `Script exemple adapté au ${context.toLowerCase()}`,
        outcome: `Résultat attendu avec cette approche`
      });
    }

    return examples;
  }

  // Méthodes d'évaluation

  private async assessReadability(technique: NegotiationTechnique): Promise<number> {
    const text = this.extractTextContent(technique);
    const sentences = text.split(/[.!?]+/).length;
    const words = text.split(/\s+/).length;
    const avgWordsPerSentence = words / sentences;
    
    if (avgWordsPerSentence <= 15) return 90;
    if (avgWordsPerSentence <= 20) return 75;
    if (avgWordsPerSentence <= 25) return 60;
    return 40;
  }

  private async assessCompleteness(technique: NegotiationTechnique): Promise<number> {
    let score = 0;
    
    if (technique.title) score += 10;
    if (technique.description && technique.description.length > 100) score += 15;
    if (technique.stepByStepGuide && technique.stepByStepGuide.length >= 4) score += 20;
    if (technique.caseStudies && technique.caseStudies.length >= 2) score += 15;
    if (technique.commonMistakes && technique.commonMistakes.length >= 3) score += 10;
    if (technique.downloadableResources && technique.downloadableResources.length >= 1) score += 10;
    if (technique.psychologyPrinciples && technique.psychologyPrinciples.length >= 3) score += 10;
    if (technique.laurentVision) score += 10;
    
    return Math.min(100, score);
  }

  private async assessAccuracy(technique: NegotiationTechnique): Promise<number> {
    let score = 85;
    
    if (technique.author && technique.origin) {
      score += 10;
    }
    
    const casesWithMetrics = technique.caseStudies.filter(cs => 
      cs.metrics && Object.keys(cs.metrics).length > 0
    );
    if (casesWithMetrics.length === technique.caseStudies.length) {
      score += 5;
    }
    
    return Math.min(100, score);
  }

  private async assessEngagement(technique: NegotiationTechnique): Promise<number> {
    let score = 0;
    
    if (technique.testimonials && technique.testimonials.length > 0) score += 20;
    if (technique.interactiveChecklist && technique.interactiveChecklist.length > 0) score += 15;
    if (technique.credibilityBadges && technique.credibilityBadges.length > 0) score += 10;
    if (technique.downloadableResources && technique.downloadableResources.length > 1) score += 15;
    
    const hasRichContent = technique.stepByStepGuide.some(step => 
      step.script && step.example && step.tips && step.tips.length > 0
    );
    if (hasRichContent) score += 25;
    
    if (technique.laurentVision && technique.pmeAdaptation) score += 15;
    
    return Math.min(100, score);
  }

  private async assessSEOOptimization(technique: NegotiationTechnique): Promise<number> {
    let score = 0;
    
    if (technique.seoMetadata) {
      if (technique.seoMetadata.title) score += 20;
      if (technique.seoMetadata.description) score += 20;
      if (technique.seoMetadata.keywords && technique.seoMetadata.keywords.length >= 5) score += 20;
      if (technique.seoMetadata.canonicalUrl) score += 10;
    }
    
    if (technique.stepByStepGuide.every(step => step.title)) score += 15;
    
    if (technique.relatedTechniques && technique.relatedTechniques.length > 0) score += 15;
    
    return Math.min(100, score);
  }

  // Méthodes de planification

  private async planContentChanges(
    technique: NegotiationTechnique,
    analysis: ContentAnalysis,
    targetImprovements: string[]
  ): Promise<ContentUpdatePlan['changes']> {
    const changes = [];

    for (const issue of analysis.issues.filter(i => i.priority === 'high')) {
      changes.push({
        section: issue.location,
        type: 'update' as const,
        description: `Corriger: ${issue.title}`,
        rationale: issue.description,
        impact: 'high' as const
      });
    }

    for (const improvement of targetImprovements) {
      const change = await this.planSpecificImprovement(technique, improvement);
      if (change) {
        changes.push(change);
      }
    }

    return changes;
  }

  private async identifyNewFeatures(
    technique: NegotiationTechnique,
    analysis: ContentAnalysis
  ): Promise<ContentUpdatePlan['newFeatures']> {
    const features = [];

    for (const opportunity of analysis.opportunities.filter(o => o.priority === 'high')) {
      if (opportunity.title.includes('interactifs')) {
        features.push({
          name: 'Calculateur de négociation',
          description: 'Outil interactif pour calculer les concessions optimales',
          implementation: 'Composant React avec logique de calcul'
        });
      }
      
      if (opportunity.title.includes('témoignages')) {
        features.push({
          name: 'Section témoignages vidéo',
          description: 'Intégration de témoignages clients en vidéo',
          implementation: 'Composant vidéo avec lazy loading'
        });
      }
    }

    return features;
  }

  private async planImprovements(
    technique: NegotiationTechnique,
    analysis: ContentAnalysis
  ): Promise<ContentUpdatePlan['improvements']> {
    const improvements = [];

    if (analysis.quality.factors.readability < 70) {
      improvements.push({
        area: 'Lisibilité',
        description: 'Simplifier le vocabulaire et raccourcir les phrases',
        expectedBenefit: 'Meilleure compréhension et engagement'
      });
    }

    if (analysis.quality.factors.seoOptimization < 70) {
      improvements.push({
        area: 'SEO',
        description: 'Optimiser les mots-clés et la structure des titres',
        expectedBenefit: 'Amélioration du référencement naturel'
      });
    }

    return improvements;
  }

  private async applyAutoFix(
    technique: NegotiationTechnique,
    issue: ContentAnalysis['issues'][0]
  ): Promise<boolean> {
    switch (issue.category) {
      case 'seo':
        if (issue.location === 'seoMetadata.keywords') {
          return await this.autoGenerateKeywords(technique);
        }
        break;
      
      case 'structure':
        if (issue.title.includes('titre')) {
          return await this.autoOptimizeTitle(technique);
        }
        break;
    }

    return false;
  }

  private async planSpecificImprovement(
    technique: NegotiationTechnique,
    improvement: string
  ): Promise<ContentUpdatePlan['changes'][0] | null> {
    switch (improvement.toLowerCase()) {
      case 'seo':
        return {
          section: 'seoMetadata',
          type: 'update',
          description: 'Optimiser les métadonnées SEO',
          rationale: 'Améliorer le référencement naturel',
          impact: 'medium'
        };
      case 'readability':
        return {
          section: 'description',
          type: 'update',
          description: 'Simplifier le langage et la structure',
          rationale: 'Améliorer la compréhension',
          impact: 'medium'
        };
      default:
        return null;
    }
  }

  private async autoGenerateKeywords(technique: NegotiationTechnique): Promise<boolean> {
    try {
      const keywords = [
        technique.title.toLowerCase(),
        `${technique.author?.toLowerCase()} technique`,
        'négociation commerciale',
        'formation négociation',
        'laurent serre expert'
      ];
      
      console.log('Auto-generated keywords:', keywords);
      return true;
    } catch (error) {
      console.error('Failed to auto-generate keywords:', error);
      return false;
    }
  }

  private async autoOptimizeTitle(technique: NegotiationTechnique): Promise<boolean> {
    try {
      const optimizedTitle = `${technique.title} | Technique ${technique.author} | Laurent Serre`;
      console.log('Auto-optimized title:', optimizedTitle);
      return true;
    } catch (error) {
      console.error('Failed to auto-optimize title:', error);
      return false;
    }
  }

  // Méthodes utilitaires

  private generateVersionNumber(technique: NegotiationTechnique): string {
    const now = new Date();
    return `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
  }

  private calculateOptimalUpdateDate(analysis: ContentAnalysis): Date {
    const now = new Date();
    
    if (analysis.quality.score < 50) {
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 semaine
    }
    
    if (analysis.quality.score < 70) {
      return new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 2 semaines
    }
    
    return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 1 mois
  }

  private determineUpdateType(changes: ContentUpdatePlan['changes']): 'major' | 'minor' | 'patch' {
    const majorChanges = changes.filter(c => c.impact === 'high').length;
    const minorChanges = changes.filter(c => c.impact === 'medium').length;
    
    if (majorChanges > 2) return 'major';
    if (majorChanges > 0 || minorChanges > 3) return 'minor';
    return 'patch';
  }

  private estimateResources(
    changes: ContentUpdatePlan['changes'],
    newFeatures: ContentUpdatePlan['newFeatures'],
    improvements: ContentUpdatePlan['improvements']
  ): ContentUpdatePlan['resources'] {
    const totalWork = changes.length + newFeatures.length + improvements.length;
    
    let timeEstimate: string;
    if (totalWork <= 3) timeEstimate = '1-2 jours';
    else if (totalWork <= 6) timeEstimate = '3-5 jours';
    else timeEstimate = '1-2 semaines';

    const requiredSkills = ['Rédacteur web', 'Expert SEO'];
    if (newFeatures.length > 0) requiredSkills.push('Développeur');
    if (changes.some(c => c.type === 'restructure')) requiredSkills.push('UX Designer');

    return {
      timeEstimate,
      requiredSkills,
      dependencies: ['Validation expert métier', 'Révision qualité']
    };
  }
}