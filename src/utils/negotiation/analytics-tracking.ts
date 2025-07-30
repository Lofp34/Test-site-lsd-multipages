// Système de tracking analytics avancé pour les techniques de négociation
// Suivi des événements, conversions et parcours utilisateur

import { NegotiationTechnique } from '@/types/negotiation-technique';

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface ConversionGoal {
  id: string;
  name: string;
  description: string;
  trigger: 'download' | 'cta_click' | 'time_spent' | 'scroll_depth' | 'form_submit';
  threshold?: number;
  value?: number;
}

export interface UserJourney {
  session_id: string;
  technique_id: string;
  events: Array<{
    timestamp: number;
    event_type: string;
    data: Record<string, any>;
  }>;
  entry_point: string;
  exit_point?: string;
  total_time: number;
  conversion_achieved: boolean;
}

/**
 * Gestionnaire de tracking analytics pour les techniques de négociation
 */
export class TechniqueAnalyticsTracker {
  private technique: NegotiationTechnique;
  private sessionId: string;
  private startTime: number;
  private events: Array<{ timestamp: number; event_type: string; data: Record<string, any> }> = [];
  private scrollDepth: number = 0;
  private maxScrollDepth: number = 0;
  private readingSections: Set<string> = new Set();

  constructor(technique: NegotiationTechnique) {
    this.technique = technique;
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.initializeTracking();
  }

  /**
   * Initialise le tracking pour la technique
   */
  private initializeTracking(): void {
    // Tracking de la vue de page
    this.trackPageView();
    
    // Tracking du scroll
    this.initializeScrollTracking();
    
    // Tracking du temps de lecture
    this.initializeReadingTimeTracking();
    
    // Tracking des interactions
    this.initializeInteractionTracking();
    
    // Tracking de sortie de page
    this.initializeExitTracking();
  }

  /**
   * Track la vue de page initiale
   */
  private trackPageView(): void {
    const event: AnalyticsEvent = {
      event: 'technique_page_view',
      category: 'Negotiation',
      action: 'View Page',
      label: this.technique.title,
      custom_parameters: {
        technique_id: this.technique.id,
        technique_author: this.technique.author,
        technique_category: this.technique.category,
        technique_difficulty: this.technique.difficultyLevel,
        session_id: this.sessionId,
        page_url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
      }
    };

    this.sendEvent(event);
    this.addToJourney('page_view', event.custom_parameters);
  }

  /**
   * Initialise le tracking du scroll
   */
  private initializeScrollTracking(): void {
    let ticking = false;

    const updateScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollDepth = Math.round((scrollTop / documentHeight) * 100);
      
      if (this.scrollDepth > this.maxScrollDepth) {
        this.maxScrollDepth = this.scrollDepth;
        
        // Tracking des jalons de scroll
        const milestones = [25, 50, 75, 90, 100];
        const milestone = milestones.find(m => this.maxScrollDepth >= m && this.maxScrollDepth < m + 5);
        
        if (milestone) {
          this.trackScrollMilestone(milestone);
        }
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDepth);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /**
   * Track les jalons de scroll
   */
  private trackScrollMilestone(percentage: number): void {
    const event: AnalyticsEvent = {
      event: 'technique_scroll_depth',
      category: 'Engagement',
      action: 'Scroll Depth',
      label: `${percentage}%`,
      value: percentage,
      custom_parameters: {
        technique_id: this.technique.id,
        session_id: this.sessionId,
        scroll_percentage: percentage,
        time_to_scroll: Date.now() - this.startTime
      }
    };

    this.sendEvent(event);
    this.addToJourney('scroll_milestone', { percentage, time_elapsed: Date.now() - this.startTime });
  }

  /**
   * Initialise le tracking du temps de lecture
   */
  private initializeReadingTimeTracking(): void {
    // Observer pour détecter les sections visibles
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section') || 'unknown';
            if (!this.readingSections.has(sectionId)) {
              this.readingSections.add(sectionId);
              this.trackSectionRead(sectionId);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px -50px 0px' }
    );

    // Observer toutes les sections
    setTimeout(() => {
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => observer.observe(section));
    }, 1000);
  }

  /**
   * Track la lecture d'une section
   */
  private trackSectionRead(sectionId: string): void {
    const event: AnalyticsEvent = {
      event: 'technique_section_read',
      category: 'Engagement',
      action: 'Section Read',
      label: sectionId,
      custom_parameters: {
        technique_id: this.technique.id,
        session_id: this.sessionId,
        section_id: sectionId,
        time_to_section: Date.now() - this.startTime,
        sections_read_count: this.readingSections.size
      }
    };

    this.sendEvent(event);
    this.addToJourney('section_read', { section_id: sectionId, time_elapsed: Date.now() - this.startTime });
  }

  /**
   * Initialise le tracking des interactions
   */
  private initializeInteractionTracking(): void {
    // Tracking des clics sur les CTAs
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      // CTA clicks
      if (target.matches('[data-cta]') || target.closest('[data-cta]')) {
        const ctaElement = target.matches('[data-cta]') ? target : target.closest('[data-cta]') as HTMLElement;
        const ctaType = ctaElement.getAttribute('data-cta') || 'unknown';
        this.trackCTAClick(ctaType, ctaElement);
      }
      
      // Download clicks
      if (target.matches('[data-download]') || target.closest('[data-download]')) {
        const downloadElement = target.matches('[data-download]') ? target : target.closest('[data-download]') as HTMLElement;
        const resourceType = downloadElement.getAttribute('data-download') || 'unknown';
        this.trackResourceDownload(resourceType, downloadElement);
      }
      
      // Internal links
      if (target.matches('a[href^="/"]') || target.closest('a[href^="/"]')) {
        const linkElement = target.matches('a') ? target : target.closest('a') as HTMLAnchorElement;
        this.trackInternalLink(linkElement.href, linkElement.textContent || '');
      }
    });

    // Tracking des interactions avec les outils interactifs
    document.addEventListener('change', (event) => {
      const target = event.target as HTMLElement;
      
      if (target.matches('[data-interactive-tool]')) {
        const toolType = target.getAttribute('data-interactive-tool') || 'unknown';
        this.trackInteractiveToolUsage(toolType, target);
      }
    });
  }

  /**
   * Track les clics sur les CTAs
   */
  private trackCTAClick(ctaType: string, element: HTMLElement): void {
    const event: AnalyticsEvent = {
      event: 'technique_cta_click',
      category: 'Conversion',
      action: 'CTA Click',
      label: ctaType,
      custom_parameters: {
        technique_id: this.technique.id,
        session_id: this.sessionId,
        cta_type: ctaType,
        cta_text: element.textContent?.trim() || '',
        cta_position: this.getElementPosition(element),
        time_to_click: Date.now() - this.startTime,
        scroll_depth_at_click: this.scrollDepth
      }
    };

    this.sendEvent(event);
    this.addToJourney('cta_click', { cta_type: ctaType, time_elapsed: Date.now() - this.startTime });
  }

  /**
   * Track les téléchargements de ressources
   */
  private trackResourceDownload(resourceType: string, element: HTMLElement): void {
    const event: AnalyticsEvent = {
      event: 'technique_resource_download',
      category: 'Conversion',
      action: 'Resource Download',
      label: resourceType,
      value: 1,
      custom_parameters: {
        technique_id: this.technique.id,
        session_id: this.sessionId,
        resource_type: resourceType,
        resource_name: element.textContent?.trim() || '',
        download_position: this.getElementPosition(element),
        time_to_download: Date.now() - this.startTime,
        scroll_depth_at_download: this.scrollDepth
      }
    };

    this.sendEvent(event);
    this.addToJourney('resource_download', { resource_type: resourceType, time_elapsed: Date.now() - this.startTime });
  }

  /**
   * Track les clics sur les liens internes
   */
  private trackInternalLink(href: string, linkText: string): void {
    const event: AnalyticsEvent = {
      event: 'technique_internal_link',
      category: 'Navigation',
      action: 'Internal Link Click',
      label: href,
      custom_parameters: {
        technique_id: this.technique.id,
        session_id: this.sessionId,
        link_url: href,
        link_text: linkText,
        time_to_click: Date.now() - this.startTime
      }
    };

    this.sendEvent(event);
    this.addToJourney('internal_link_click', { href, link_text: linkText, time_elapsed: Date.now() - this.startTime });
  }

  /**
   * Track l'utilisation des outils interactifs
   */
  private trackInteractiveToolUsage(toolType: string, element: HTMLElement): void {
    const event: AnalyticsEvent = {
      event: 'technique_interactive_tool',
      category: 'Engagement',
      action: 'Interactive Tool Usage',
      label: toolType,
      custom_parameters: {
        technique_id: this.technique.id,
        session_id: this.sessionId,
        tool_type: toolType,
        tool_value: (element as HTMLInputElement).value || '',
        time_to_interaction: Date.now() - this.startTime
      }
    };

    this.sendEvent(event);
    this.addToJourney('interactive_tool_usage', { tool_type: toolType, time_elapsed: Date.now() - this.startTime });
  }

  /**
   * Initialise le tracking de sortie de page
   */
  private initializeExitTracking(): void {
    const trackExit = () => {
      const totalTime = Date.now() - this.startTime;
      
      const event: AnalyticsEvent = {
        event: 'technique_page_exit',
        category: 'Engagement',
        action: 'Page Exit',
        label: this.technique.title,
        value: Math.round(totalTime / 1000), // en secondes
        custom_parameters: {
          technique_id: this.technique.id,
          session_id: this.sessionId,
          total_time_seconds: Math.round(totalTime / 1000),
          max_scroll_depth: this.maxScrollDepth,
          sections_read: Array.from(this.readingSections),
          sections_read_count: this.readingSections.size,
          events_count: this.events.length
        }
      };

      this.sendEvent(event);
      this.finalizeJourney();
    };

    // Track à la fermeture de la page
    window.addEventListener('beforeunload', trackExit);
    window.addEventListener('pagehide', trackExit);
    
    // Track après un temps minimum (pour les sessions courtes)
    setTimeout(() => {
      if (Date.now() - this.startTime > 30000) { // Plus de 30 secondes
        trackExit();
      }
    }, 30000);
  }

  /**
   * Envoie un événement vers Google Analytics
   */
  private sendEvent(event: AnalyticsEvent): void {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.event, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.custom_parameters
      });
    }

    // Google Tag Manager (si disponible)
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: event.event,
        eventCategory: event.category,
        eventAction: event.action,
        eventLabel: event.label,
        eventValue: event.value,
        ...event.custom_parameters
      });
    }

    // Log pour le développement
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }

  /**
   * Ajoute un événement au parcours utilisateur
   */
  private addToJourney(eventType: string, data: Record<string, any>): void {
    this.events.push({
      timestamp: Date.now(),
      event_type: eventType,
      data
    });
  }

  /**
   * Finalise le parcours utilisateur
   */
  private finalizeJourney(): void {
    const journey: UserJourney = {
      session_id: this.sessionId,
      technique_id: this.technique.id,
      events: this.events,
      entry_point: document.referrer || 'direct',
      exit_point: window.location.href,
      total_time: Date.now() - this.startTime,
      conversion_achieved: this.hasConversionOccurred()
    };

    // Envoyer le parcours complet (peut être stocké localement ou envoyé à un service)
    this.sendJourneyData(journey);
  }

  /**
   * Vérifie si une conversion a eu lieu
   */
  private hasConversionOccurred(): boolean {
    return this.events.some(event => 
      event.event_type === 'resource_download' || 
      event.event_type === 'cta_click' ||
      (event.event_type === 'section_read' && this.readingSections.size >= 3)
    );
  }

  /**
   * Envoie les données de parcours
   */
  private sendJourneyData(journey: UserJourney): void {
    // Stocker localement pour analyse ultérieure
    if (typeof window !== 'undefined' && window.localStorage) {
      const existingJourneys = JSON.parse(localStorage.getItem('technique_journeys') || '[]');
      existingJourneys.push(journey);
      
      // Garder seulement les 10 derniers parcours
      if (existingJourneys.length > 10) {
        existingJourneys.splice(0, existingJourneys.length - 10);
      }
      
      localStorage.setItem('technique_journeys', JSON.stringify(existingJourneys));
    }

    // Envoyer à un service d'analyse (optionnel)
    if (process.env.NODE_ENV === 'production') {
      // fetch('/api/analytics/journey', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(journey)
      // }).catch(console.error);
    }
  }

  /**
   * Obtient la position d'un élément dans la page
   */
  private getElementPosition(element: HTMLElement): string {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    const positionPercentage = Math.round((elementTop / documentHeight) * 100);
    
    return `${positionPercentage}%`;
  }

  /**
   * Génère un ID de session unique
   */
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Méthodes publiques pour tracking manuel
   */
  public trackCustomEvent(eventName: string, data: Record<string, any>): void {
    const event: AnalyticsEvent = {
      event: `technique_${eventName}`,
      category: 'Custom',
      action: eventName,
      custom_parameters: {
        technique_id: this.technique.id,
        session_id: this.sessionId,
        ...data
      }
    };

    this.sendEvent(event);
    this.addToJourney(eventName, data);
  }

  public getSessionStats(): {
    sessionId: string;
    timeSpent: number;
    scrollDepth: number;
    sectionsRead: number;
    eventsCount: number;
  } {
    return {
      sessionId: this.sessionId,
      timeSpent: Date.now() - this.startTime,
      scrollDepth: this.maxScrollDepth,
      sectionsRead: this.readingSections.size,
      eventsCount: this.events.length
    };
  }
}

/**
 * Configuration des objectifs de conversion
 */
export const CONVERSION_GOALS: ConversionGoal[] = [
  {
    id: 'resource_download',
    name: 'Téléchargement de ressource',
    description: 'L\'utilisateur télécharge un guide ou outil',
    trigger: 'download',
    value: 10
  },
  {
    id: 'formation_cta',
    name: 'Clic CTA Formation',
    description: 'L\'utilisateur clique sur un CTA de formation',
    trigger: 'cta_click',
    value: 25
  },
  {
    id: 'diagnostic_cta',
    name: 'Clic CTA Diagnostic',
    description: 'L\'utilisateur clique sur le CTA diagnostic gratuit',
    trigger: 'cta_click',
    value: 20
  },
  {
    id: 'engaged_reading',
    name: 'Lecture engagée',
    description: 'L\'utilisateur lit plus de 3 sections',
    trigger: 'scroll_depth',
    threshold: 75,
    value: 5
  },
  {
    id: 'long_session',
    name: 'Session longue',
    description: 'L\'utilisateur reste plus de 5 minutes',
    trigger: 'time_spent',
    threshold: 300000, // 5 minutes en ms
    value: 15
  }
];

// Types pour TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}