// Système de tracking des conversions pour les techniques de négociation
// Suivi des objectifs, attribution et optimisation des conversions

import { NegotiationTechnique } from '@/types/negotiation-technique';
import { ConversionGoal, CONVERSION_GOALS } from './analytics-tracking';

export interface ConversionEvent {
  id: string;
  techniqueId: string;
  sessionId: string;
  userId?: string;
  type: 'download' | 'cta_click' | 'form_submit' | 'email_signup' | 'phone_call' | 'meeting_booked';
  goalId: string;
  value: number;
  timestamp: number;
  metadata: {
    source: string;
    medium: string;
    campaign?: string;
    content?: string;
    term?: string;
    position: string;
    elementText: string;
    pageUrl: string;
    referrer: string;
    userAgent: string;
    deviceType: 'desktop' | 'mobile' | 'tablet';
    timeOnPageBeforeConversion: number;
    scrollDepthAtConversion: number;
    sectionsReadBeforeConversion: string[];
  };
}

export interface AttributionModel {
  type: 'first-click' | 'last-click' | 'linear' | 'time-decay' | 'position-based';
  windowDays: number;
}

export interface ConversionFunnel {
  name: string;
  steps: Array<{
    name: string;
    condition: (event: ConversionEvent) => boolean;
    expectedConversionRate: number;
  }>;
}

export interface ConversionReport {
  period: {
    start: Date;
    end: Date;
  };
  totalConversions: number;
  totalValue: number;
  conversionRate: number;
  byGoal: Record<string, {
    count: number;
    value: number;
    rate: number;
  }>;
  bySource: Record<string, {
    count: number;
    value: number;
    rate: number;
  }>;
  byTechnique: Record<string, {
    count: number;
    value: number;
    rate: number;
  }>;
  funnelAnalysis: Array<{
    step: string;
    visitors: number;
    conversions: number;
    rate: number;
    dropOff: number;
  }>;
  attribution: Record<string, {
    conversions: number;
    value: number;
    percentage: number;
  }>;
  trends: Array<{
    date: string;
    conversions: number;
    value: number;
    rate: number;
  }>;
}

/**
 * Gestionnaire de tracking des conversions
 */
export class ConversionTracker {
  private technique: NegotiationTechnique;
  private sessionId: string;
  private userId?: string;
  private conversions: ConversionEvent[] = [];
  private goals: ConversionGoal[];
  private attributionModel: AttributionModel;

  constructor(
    technique: NegotiationTechnique,
    sessionId: string,
    userId?: string,
    attributionModel: AttributionModel = { type: 'last-click', windowDays: 30 }
  ) {
    this.technique = technique;
    this.sessionId = sessionId;
    this.userId = userId;
    this.goals = CONVERSION_GOALS;
    this.attributionModel = attributionModel;
    
    this.initializeTracking();
  }

  /**
   * Initialise le tracking des conversions
   */
  private initializeTracking(): void {
    // Écouter les événements de conversion
    this.setupConversionListeners();
    
    // Configurer le tracking des formulaires
    this.setupFormTracking();
    
    // Configurer le tracking des téléchargements
    this.setupDownloadTracking();
    
    // Configurer le tracking des appels téléphoniques
    this.setupPhoneTracking();
  }

  /**
   * Configure les écouteurs d'événements de conversion
   */
  private setupConversionListeners(): void {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      // Tracking des CTAs
      if (target.matches('[data-conversion-goal]') || target.closest('[data-conversion-goal]')) {
        const element = target.matches('[data-conversion-goal]') ? target : target.closest('[data-conversion-goal]') as HTMLElement;
        const goalId = element.getAttribute('data-conversion-goal') || '';
        const conversionType = element.getAttribute('data-conversion-type') as ConversionEvent['type'] || 'cta_click';
        
        this.trackConversion(goalId, conversionType, element);
      }
      
      // Tracking des liens de téléchargement
      if (target.matches('a[download]') || target.closest('a[download]')) {
        const element = target.matches('a[download]') ? target : target.closest('a[download]') as HTMLAnchorElement;
        this.trackDownload(element);
      }
      
      // Tracking des numéros de téléphone
      if (target.matches('a[href^="tel:"]') || target.closest('a[href^="tel:"]')) {
        const element = target.matches('a[href^="tel:"]') ? target : target.closest('a[href^="tel:"]') as HTMLAnchorElement;
        this.trackPhoneCall(element);
      }
    });
  }

  /**
   * Configure le tracking des formulaires
   */
  private setupFormTracking(): void {
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      
      if (form.matches('[data-conversion-form]')) {
        const goalId = form.getAttribute('data-conversion-goal') || 'form_submit';
        this.trackFormSubmission(form, goalId);
      }
    });
  }

  /**
   * Configure le tracking des téléchargements
   */
  private setupDownloadTracking(): void {
    // Observer les clics sur les liens de téléchargement
    const downloadLinks = document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".zip"]');
    
    downloadLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.trackDownload(link as HTMLAnchorElement);
      });
    });
  }

  /**
   * Configure le tracking des appels téléphoniques
   */
  private setupPhoneTracking(): void {
    // Tracking des clics sur les numéros de téléphone
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.trackPhoneCall(link as HTMLAnchorElement);
      });
    });
  }

  /**
   * Track une conversion générique
   */
  public trackConversion(
    goalId: string,
    type: ConversionEvent['type'],
    element: HTMLElement,
    customValue?: number
  ): void {
    const goal = this.goals.find(g => g.id === goalId);
    if (!goal) {
      console.warn(`Conversion goal not found: ${goalId}`);
      return;
    }

    const conversion: ConversionEvent = {
      id: this.generateConversionId(),
      techniqueId: this.technique.id,
      sessionId: this.sessionId,
      userId: this.userId,
      type,
      goalId,
      value: customValue || goal.value || 0,
      timestamp: Date.now(),
      metadata: {
        source: this.getTrafficSource(),
        medium: this.getTrafficMedium(),
        campaign: this.getUrlParameter('utm_campaign'),
        content: this.getUrlParameter('utm_content'),
        term: this.getUrlParameter('utm_term'),
        position: this.getElementPosition(element),
        elementText: element.textContent?.trim() || '',
        pageUrl: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        deviceType: this.getDeviceType(),
        timeOnPageBeforeConversion: this.getTimeOnPage(),
        scrollDepthAtConversion: this.getScrollDepth(),
        sectionsReadBeforeConversion: this.getSectionsRead()
      }
    };

    this.conversions.push(conversion);
    this.sendConversionEvent(conversion);
    this.storeConversion(conversion);
    
    console.log('Conversion tracked:', conversion);
  }

  /**
   * Track un téléchargement
   */
  private trackDownload(element: HTMLAnchorElement): void {
    const fileName = element.href.split('/').pop() || 'unknown';
    const goalId = 'resource_download';
    
    this.trackConversion(goalId, 'download', element);
    
    // Tracking spécifique au téléchargement
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'file_download', {
        file_name: fileName,
        file_extension: fileName.split('.').pop(),
        technique_id: this.technique.id,
        session_id: this.sessionId
      });
    }
  }

  /**
   * Track une soumission de formulaire
   */
  private trackFormSubmission(form: HTMLFormElement, goalId: string): void {
    const formData = new FormData(form);
    const formFields = Array.from(formData.keys());
    
    this.trackConversion(goalId, 'form_submit', form);
    
    // Tracking spécifique au formulaire
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        currency: 'EUR',
        value: this.goals.find(g => g.id === goalId)?.value || 0,
        technique_id: this.technique.id,
        form_fields: formFields.join(','),
        session_id: this.sessionId
      });
    }
  }

  /**
   * Track un appel téléphonique
   */
  private trackPhoneCall(element: HTMLAnchorElement): void {
    const phoneNumber = element.href.replace('tel:', '');
    const goalId = 'phone_call';
    
    this.trackConversion(goalId, 'phone_call', element, 50); // Valeur élevée pour les appels
    
    // Tracking spécifique à l'appel
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'phone_call', {
        phone_number: phoneNumber,
        technique_id: this.technique.id,
        session_id: this.sessionId
      });
    }
  }

  /**
   * Génère un rapport de conversions
   */
  public generateConversionReport(startDate: Date, endDate: Date): ConversionReport {
    const conversionsInPeriod = this.conversions.filter(c => 
      c.timestamp >= startDate.getTime() && c.timestamp <= endDate.getTime()
    );

    const totalConversions = conversionsInPeriod.length;
    const totalValue = conversionsInPeriod.reduce((sum, c) => sum + c.value, 0);
    
    // Calculer le taux de conversion (nécessite les données de trafic)
    const conversionRate = this.calculateConversionRate(conversionsInPeriod);

    return {
      period: { start: startDate, end: endDate },
      totalConversions,
      totalValue,
      conversionRate,
      byGoal: this.groupConversionsByGoal(conversionsInPeriod),
      bySource: this.groupConversionsBySource(conversionsInPeriod),
      byTechnique: this.groupConversionsByTechnique(conversionsInPeriod),
      funnelAnalysis: this.analyzeFunnel(conversionsInPeriod),
      attribution: this.calculateAttribution(conversionsInPeriod),
      trends: this.calculateTrends(conversionsInPeriod, startDate, endDate)
    };
  }

  /**
   * Configure des tests A/B pour les conversions
   */
  public setupABTest(testName: string, variants: Array<{
    name: string;
    weight: number;
    changes: Record<string, any>;
  }>): void {
    const selectedVariant = this.selectABVariant(variants);
    
    // Appliquer les changements de la variante
    this.applyABVariant(selectedVariant);
    
    // Tracker la participation au test
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_participation', {
        test_name: testName,
        variant: selectedVariant.name,
        technique_id: this.technique.id,
        session_id: this.sessionId
      });
    }
  }

  /**
   * Optimise automatiquement les conversions
   */
  public optimizeConversions(): Array<{
    type: 'cta_position' | 'cta_text' | 'form_fields' | 'value_proposition';
    recommendation: string;
    expectedImpact: string;
    implementation: string;
  }> {
    const recommendations = [];
    const conversionData = this.analyzeConversionPatterns();

    // Recommandations basées sur les positions des CTAs
    if (conversionData.lowPerformingPositions.length > 0) {
      recommendations.push({
        type: 'cta_position' as const,
        recommendation: `Repositionner les CTAs aux positions ${conversionData.highPerformingPositions.join(', ')}`,
        expectedImpact: '+15-25% de conversions',
        implementation: 'Déplacer les boutons vers les zones de forte conversion'
      });
    }

    // Recommandations basées sur les textes des CTAs
    if (conversionData.bestPerformingTexts.length > 0) {
      recommendations.push({
        type: 'cta_text' as const,
        recommendation: `Utiliser des textes similaires à "${conversionData.bestPerformingTexts[0]}"`,
        expectedImpact: '+10-20% de conversions',
        implementation: 'Modifier les textes des CTAs selon les meilleures performances'
      });
    }

    return recommendations;
  }

  // Méthodes utilitaires privées

  private generateConversionId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getTrafficSource(): string {
    const utmSource = this.getUrlParameter('utm_source');
    if (utmSource) return utmSource;
    
    const referrer = document.referrer;
    if (!referrer) return 'direct';
    
    const referrerDomain = new URL(referrer).hostname;
    if (referrerDomain.includes('google')) return 'google';
    if (referrerDomain.includes('facebook')) return 'facebook';
    if (referrerDomain.includes('linkedin')) return 'linkedin';
    
    return 'referral';
  }

  private getTrafficMedium(): string {
    const utmMedium = this.getUrlParameter('utm_medium');
    if (utmMedium) return utmMedium;
    
    const source = this.getTrafficSource();
    if (source === 'direct') return 'direct';
    if (['google', 'bing', 'yahoo'].includes(source)) return 'organic';
    if (['facebook', 'linkedin', 'twitter'].includes(source)) return 'social';
    
    return 'referral';
  }

  private getUrlParameter(param: string): string | undefined {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || undefined;
  }

  private getElementPosition(element: HTMLElement): string {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    const positionPercentage = Math.round((elementTop / documentHeight) * 100);
    
    return `${positionPercentage}%`;
  }

  private getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getTimeOnPage(): number {
    return Date.now() - (performance.timing.navigationStart || Date.now());
  }

  private getScrollDepth(): number {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    return Math.round((scrollTop / documentHeight) * 100);
  }

  private getSectionsRead(): string[] {
    // Récupérer les sections lues depuis le tracker principal
    const tracker = (window as any).techniqueTracker;
    if (tracker && tracker.getSessionStats) {
      return Array.from(tracker.readingSections || []);
    }
    return [];
  }

  private sendConversionEvent(conversion: ConversionEvent): void {
    // Envoyer vers Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // À configurer
        value: conversion.value,
        currency: 'EUR',
        transaction_id: conversion.id,
        technique_id: conversion.techniqueId,
        goal_id: conversion.goalId
      });
    }

    // Envoyer vers Facebook Pixel (si configuré)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        value: conversion.value,
        currency: 'EUR',
        content_name: this.technique.title,
        content_category: 'Technique Négociation'
      });
    }
  }

  private storeConversion(conversion: ConversionEvent): void {
    // Stocker localement
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = JSON.parse(localStorage.getItem('conversions') || '[]');
      stored.push(conversion);
      
      // Garder seulement les 100 dernières conversions
      if (stored.length > 100) {
        stored.splice(0, stored.length - 100);
      }
      
      localStorage.setItem('conversions', JSON.stringify(stored));
    }
  }

  private calculateConversionRate(conversions: ConversionEvent[]): number {
    // Simuler le calcul du taux de conversion
    // En production, ceci utiliserait les vraies données de trafic
    const estimatedTraffic = 1000; // À remplacer par les vraies données
    return (conversions.length / estimatedTraffic) * 100;
  }

  private groupConversionsByGoal(conversions: ConversionEvent[]): Record<string, { count: number; value: number; rate: number }> {
    const grouped: Record<string, { count: number; value: number; rate: number }> = {};
    
    conversions.forEach(conversion => {
      if (!grouped[conversion.goalId]) {
        grouped[conversion.goalId] = { count: 0, value: 0, rate: 0 };
      }
      grouped[conversion.goalId].count++;
      grouped[conversion.goalId].value += conversion.value;
    });

    // Calculer les taux (simplifié)
    Object.keys(grouped).forEach(goalId => {
      grouped[goalId].rate = (grouped[goalId].count / conversions.length) * 100;
    });

    return grouped;
  }

  private groupConversionsBySource(conversions: ConversionEvent[]): Record<string, { count: number; value: number; rate: number }> {
    const grouped: Record<string, { count: number; value: number; rate: number }> = {};
    
    conversions.forEach(conversion => {
      const source = conversion.metadata.source;
      if (!grouped[source]) {
        grouped[source] = { count: 0, value: 0, rate: 0 };
      }
      grouped[source].count++;
      grouped[source].value += conversion.value;
    });

    Object.keys(grouped).forEach(source => {
      grouped[source].rate = (grouped[source].count / conversions.length) * 100;
    });

    return grouped;
  }

  private groupConversionsByTechnique(conversions: ConversionEvent[]): Record<string, { count: number; value: number; rate: number }> {
    const grouped: Record<string, { count: number; value: number; rate: number }> = {};
    
    conversions.forEach(conversion => {
      const techniqueId = conversion.techniqueId;
      if (!grouped[techniqueId]) {
        grouped[techniqueId] = { count: 0, value: 0, rate: 0 };
      }
      grouped[techniqueId].count++;
      grouped[techniqueId].value += conversion.value;
    });

    Object.keys(grouped).forEach(techniqueId => {
      grouped[techniqueId].rate = (grouped[techniqueId].count / conversions.length) * 100;
    });

    return grouped;
  }

  private analyzeFunnel(conversions: ConversionEvent[]): Array<{ step: string; visitors: number; conversions: number; rate: number; dropOff: number }> {
    // Analyser l'entonnoir de conversion (simplifié)
    const totalVisitors = 1000; // À remplacer par les vraies données
    
    return [
      {
        step: 'Page View',
        visitors: totalVisitors,
        conversions: totalVisitors,
        rate: 100,
        dropOff: 0
      },
      {
        step: 'Scroll 50%',
        visitors: Math.floor(totalVisitors * 0.6),
        conversions: Math.floor(totalVisitors * 0.6),
        rate: 60,
        dropOff: 40
      },
      {
        step: 'CTA View',
        visitors: Math.floor(totalVisitors * 0.4),
        conversions: Math.floor(totalVisitors * 0.4),
        rate: 40,
        dropOff: 20
      },
      {
        step: 'Conversion',
        visitors: conversions.length,
        conversions: conversions.length,
        rate: (conversions.length / totalVisitors) * 100,
        dropOff: 40 - (conversions.length / totalVisitors) * 100
      }
    ];
  }

  private calculateAttribution(conversions: ConversionEvent[]): Record<string, { conversions: number; value: number; percentage: number }> {
    // Calculer l'attribution selon le modèle choisi
    const attribution: Record<string, { conversions: number; value: number; percentage: number }> = {};
    
    conversions.forEach(conversion => {
      const source = conversion.metadata.source;
      if (!attribution[source]) {
        attribution[source] = { conversions: 0, value: 0, percentage: 0 };
      }
      attribution[source].conversions++;
      attribution[source].value += conversion.value;
    });

    const totalConversions = conversions.length;
    Object.keys(attribution).forEach(source => {
      attribution[source].percentage = (attribution[source].conversions / totalConversions) * 100;
    });

    return attribution;
  }

  private calculateTrends(conversions: ConversionEvent[], startDate: Date, endDate: Date): Array<{ date: string; conversions: number; value: number; rate: number }> {
    // Calculer les tendances par jour
    const trends: Array<{ date: string; conversions: number; value: number; rate: number }> = [];
    const dayMs = 24 * 60 * 60 * 1000;
    
    for (let date = new Date(startDate); date <= endDate; date.setTime(date.getTime() + dayMs)) {
      const dayStart = new Date(date).setHours(0, 0, 0, 0);
      const dayEnd = new Date(date).setHours(23, 59, 59, 999);
      
      const dayConversions = conversions.filter(c => 
        c.timestamp >= dayStart && c.timestamp <= dayEnd
      );
      
      trends.push({
        date: date.toISOString().split('T')[0],
        conversions: dayConversions.length,
        value: dayConversions.reduce((sum, c) => sum + c.value, 0),
        rate: dayConversions.length > 0 ? (dayConversions.length / 100) * 100 : 0 // Simplifié
      });
    }
    
    return trends;
  }

  private analyzeConversionPatterns(): {
    highPerformingPositions: string[];
    lowPerformingPositions: string[];
    bestPerformingTexts: string[];
    worstPerformingTexts: string[];
  } {
    // Analyser les patterns de conversion
    const positionPerformance: Record<string, number> = {};
    const textPerformance: Record<string, number> = {};
    
    this.conversions.forEach(conversion => {
      const position = conversion.metadata.position;
      const text = conversion.metadata.elementText;
      
      positionPerformance[position] = (positionPerformance[position] || 0) + 1;
      textPerformance[text] = (textPerformance[text] || 0) + 1;
    });
    
    const sortedPositions = Object.entries(positionPerformance)
      .sort(([,a], [,b]) => b - a);
    const sortedTexts = Object.entries(textPerformance)
      .sort(([,a], [,b]) => b - a);
    
    return {
      highPerformingPositions: sortedPositions.slice(0, 3).map(([pos]) => pos),
      lowPerformingPositions: sortedPositions.slice(-3).map(([pos]) => pos),
      bestPerformingTexts: sortedTexts.slice(0, 3).map(([text]) => text),
      worstPerformingTexts: sortedTexts.slice(-3).map(([text]) => text)
    };
  }

  private selectABVariant(variants: Array<{ name: string; weight: number; changes: Record<string, any> }>): { name: string; weight: number; changes: Record<string, any> } {
    const random = Math.random();
    let cumulativeWeight = 0;
    
    for (const variant of variants) {
      cumulativeWeight += variant.weight;
      if (random <= cumulativeWeight) {
        return variant;
      }
    }
    
    return variants[0]; // Fallback
  }

  private applyABVariant(variant: { name: string; weight: number; changes: Record<string, any> }): void {
    // Appliquer les changements de la variante A/B
    Object.entries(variant.changes).forEach(([selector, changes]) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        Object.entries(changes).forEach(([property, value]) => {
          if (property === 'textContent') {
            element.textContent = value as string;
          } else if (property === 'style') {
            Object.assign((element as HTMLElement).style, value);
          } else {
            (element as any)[property] = value;
          }
        });
      });
    });
  }
}

// Types pour TypeScript
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}