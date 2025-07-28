'use client';

// Types pour l'attribution des leads
export interface LeadSource {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  page: string;
  section: string;
  ctaId: string;
  timestamp: number;
  sessionId: string;
  userId: string;
}

export interface LeadAttribution {
  leadId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  source: LeadSource;
  touchpoints: TouchPoint[];
  value: number;
  status: 'new' | 'qualified' | 'opportunity' | 'customer' | 'lost';
  createdAt: number;
  updatedAt: number;
}

export interface TouchPoint {
  page: string;
  section: string;
  action: string;
  ctaId?: string;
  timestamp: number;
  timeSpent: number;
  scrollDepth: number;
  sessionId: string;
}

// Configuration des valeurs par type de lead
export const leadValues: Record<string, number> = {
  diagnostic_start: 30,
  diagnostic_complete: 50,
  bootcamp_interest: 75,
  bootcamp_signup: 150,
  consultation_request: 100,
  contact_form: 40,
  resource_download: 15,
  newsletter_signup: 10,
  phone_call_request: 80,
  demo_request: 120
};

// Stockage local des touchpoints pour attribution
class TouchPointTracker {
  private touchpoints: TouchPoint[] = [];
  private sessionStartTime: number = Date.now();
  private currentPage: string = '';
  private scrollDepth: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.currentPage = window.location.pathname;
      this.loadTouchpoints();
      this.setupScrollTracking();
      this.setupPageTracking();
    }
  }

  private loadTouchpoints() {
    const stored = sessionStorage.getItem('ls_touchpoints');
    if (stored) {
      try {
        this.touchpoints = JSON.parse(stored);
      } catch (e) {
        console.warn('Erreur lors du chargement des touchpoints:', e);
        this.touchpoints = [];
      }
    }
  }

  private saveTouchpoints() {
    sessionStorage.setItem('ls_touchpoints', JSON.stringify(this.touchpoints));
  }

  private setupScrollTracking() {
    let maxScroll = 0;
    const updateScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.scrollDepth = Math.min(maxScroll, 100);
      }
    };

    window.addEventListener('scroll', updateScrollDepth, { passive: true });
  }

  private setupPageTracking() {
    // Tracker le changement de page (pour les SPAs)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      window.dispatchEvent(new Event('locationchange'));
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      window.dispatchEvent(new Event('locationchange'));
    };

    window.addEventListener('popstate', () => {
      window.dispatchEvent(new Event('locationchange'));
    });

    window.addEventListener('locationchange', () => {
      this.trackPageChange();
    });
  }

  private trackPageChange() {
    const newPage = window.location.pathname;
    if (newPage !== this.currentPage) {
      // Enregistrer le temps passé sur la page précédente
      const timeSpent = Date.now() - this.sessionStartTime;
      
      this.addTouchpoint({
        page: this.currentPage,
        section: 'page_exit',
        action: 'page_view_complete',
        timestamp: Date.now(),
        timeSpent,
        scrollDepth: this.scrollDepth,
        sessionId: this.getSessionId()
      });

      this.currentPage = newPage;
      this.sessionStartTime = Date.now();
      this.scrollDepth = 0;
    }
  }

  addTouchpoint(touchpoint: Omit<TouchPoint, 'sessionId'>) {
    const fullTouchpoint: TouchPoint = {
      ...touchpoint,
      sessionId: this.getSessionId()
    };

    this.touchpoints.push(fullTouchpoint);
    this.saveTouchpoints();

    // Limiter à 50 touchpoints pour éviter le stockage excessif
    if (this.touchpoints.length > 50) {
      this.touchpoints = this.touchpoints.slice(-50);
      this.saveTouchpoints();
    }
  }

  getTouchpoints(): TouchPoint[] {
    return [...this.touchpoints];
  }

  clearTouchpoints() {
    this.touchpoints = [];
    sessionStorage.removeItem('ls_touchpoints');
  }

  private getSessionId(): string {
    return sessionStorage.getItem('ls_session_id') || 'unknown';
  }
}

// Instance globale du tracker
let touchPointTracker: TouchPointTracker | null = null;

export const getTouchPointTracker = (): TouchPointTracker => {
  if (!touchPointTracker && typeof window !== 'undefined') {
    touchPointTracker = new TouchPointTracker();
  }
  return touchPointTracker!;
};

// Fonction pour tracker une action utilisateur
export const trackUserAction = (
  section: string,
  action: string,
  ctaId?: string,
  additionalData?: Record<string, any>
) => {
  if (typeof window === 'undefined') return;

  const tracker = getTouchPointTracker();
  const timeSpent = Date.now() - (window as any).sectionStartTime || 0;

  tracker.addTouchpoint({
    page: window.location.pathname,
    section,
    action,
    ctaId,
    timestamp: Date.now(),
    timeSpent,
    scrollDepth: tracker['scrollDepth'] || 0
  });

  // Tracker aussi dans Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'user_action', {
      event_category: 'user_behavior',
      event_label: `${section}_${action}`,
      action_section: section,
      action_type: action,
      cta_id: ctaId,
      page_path: window.location.pathname,
      session_id: sessionStorage.getItem('ls_session_id'),
      ...additionalData
    });
  }
};

// Fonction pour créer un lead avec attribution complète
export const createLeadWithAttribution = async (leadData: {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  leadType: string;
  ctaId: string;
  section: string;
  additionalData?: Record<string, any>;
}): Promise<LeadAttribution> => {
  const tracker = getTouchPointTracker();
  const touchpoints = tracker.getTouchpoints();
  
  // Déterminer la source du lead
  const source: LeadSource = {
    source: getLeadSource(),
    medium: getLeadMedium(),
    campaign: getLeadCampaign(),
    content: leadData.ctaId,
    page: window.location.pathname,
    section: leadData.section,
    ctaId: leadData.ctaId,
    timestamp: Date.now(),
    sessionId: sessionStorage.getItem('ls_session_id') || 'unknown',
    userId: localStorage.getItem('ls_user_id') || 'unknown'
  };

  // Créer l'objet lead
  const lead: LeadAttribution = {
    leadId: generateLeadId(),
    email: leadData.email,
    firstName: leadData.firstName,
    lastName: leadData.lastName,
    company: leadData.company,
    phone: leadData.phone,
    source,
    touchpoints,
    value: leadValues[leadData.leadType] || 25,
    status: 'new',
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  // Sauvegarder le lead localement (en attendant l'envoi au serveur)
  saveLeadLocally(lead);

  // Envoyer au serveur (API call)
  try {
    await sendLeadToServer(lead, leadData.additionalData);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du lead:', error);
  }

  // Tracker la création du lead
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'lead_created', {
      event_category: 'lead_generation',
      event_label: leadData.leadType,
      lead_type: leadData.leadType,
      lead_source: source.source,
      lead_medium: source.medium,
      lead_value: lead.value,
      cta_id: leadData.ctaId,
      section: leadData.section,
      touchpoints_count: touchpoints.length,
      session_id: source.sessionId,
      user_id: source.userId
    });

    // Event de conversion pour Google Analytics
    window.gtag('event', 'conversion', {
      event_category: 'lead_conversion',
      event_label: leadData.leadType,
      value: lead.value,
      currency: 'EUR',
      transaction_id: lead.leadId,
      lead_source: source.source
    });
  }

  // Nettoyer les touchpoints après création du lead
  tracker.clearTouchpoints();

  return lead;
};

// Fonctions utilitaires pour déterminer la source
const getLeadSource = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  
  if (utmSource) return utmSource;
  
  const referrer = document.referrer;
  if (!referrer) return 'direct';
  
  const referrerDomain = new URL(referrer).hostname;
  
  if (referrerDomain.includes('google')) return 'google';
  if (referrerDomain.includes('linkedin')) return 'linkedin';
  if (referrerDomain.includes('facebook')) return 'facebook';
  if (referrerDomain.includes('twitter')) return 'twitter';
  
  return 'referral';
};

const getLeadMedium = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmMedium = urlParams.get('utm_medium');
  
  if (utmMedium) return utmMedium;
  
  const source = getLeadSource();
  if (source === 'direct') return 'direct';
  if (['google', 'linkedin', 'facebook', 'twitter'].includes(source)) return 'social';
  
  return 'referral';
};

const getLeadCampaign = (): string | undefined => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('utm_campaign') || undefined;
};

// Génération d'ID unique pour le lead
const generateLeadId = (): string => {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Sauvegarde locale du lead
const saveLeadLocally = (lead: LeadAttribution) => {
  const leads = getLocalLeads();
  leads.push(lead);
  localStorage.setItem('ls_leads', JSON.stringify(leads));
};

// Récupération des leads locaux
export const getLocalLeads = (): LeadAttribution[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('ls_leads');
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.warn('Erreur lors du chargement des leads locaux:', e);
    return [];
  }
};

// Envoi du lead au serveur
const sendLeadToServer = async (lead: LeadAttribution, additionalData?: Record<string, any>) => {
  const payload = {
    ...lead,
    additionalData,
    userAgent: navigator.userAgent,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language
  };

  // En production, remplacer par votre endpoint API
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
};

// Hook React pour utiliser l'attribution des leads
export const useLeadAttribution = () => {
  const trackAction = (section: string, action: string, ctaId?: string) => {
    trackUserAction(section, action, ctaId);
  };

  const createLead = async (leadData: Parameters<typeof createLeadWithAttribution>[0]) => {
    return createLeadWithAttribution(leadData);
  };

  const getTouchpoints = () => {
    const tracker = getTouchPointTracker();
    return tracker.getTouchpoints();
  };

  return {
    trackAction,
    createLead,
    getTouchpoints,
    getLocalLeads
  };
};

// Fonction pour analyser les performances d'attribution
export const analyzeLeadAttribution = (leads: LeadAttribution[]) => {
  const analysis = {
    totalLeads: leads.length,
    totalValue: leads.reduce((sum, lead) => sum + lead.value, 0),
    sourceBreakdown: {} as Record<string, { count: number; value: number; rate: number }>,
    ctaPerformance: {} as Record<string, { count: number; value: number; conversionRate: number }>,
    touchpointAnalysis: {
      averageTouchpoints: 0,
      mostCommonPages: {} as Record<string, number>,
      mostCommonSections: {} as Record<string, number>
    }
  };

  // Analyse par source
  leads.forEach(lead => {
    const source = lead.source.source;
    if (!analysis.sourceBreakdown[source]) {
      analysis.sourceBreakdown[source] = { count: 0, value: 0, rate: 0 };
    }
    analysis.sourceBreakdown[source].count++;
    analysis.sourceBreakdown[source].value += lead.value;
  });

  // Calcul des taux de conversion par source
  Object.keys(analysis.sourceBreakdown).forEach(source => {
    const sourceData = analysis.sourceBreakdown[source];
    sourceData.rate = (sourceData.count / analysis.totalLeads) * 100;
  });

  // Analyse par CTA
  leads.forEach(lead => {
    const ctaId = lead.source.ctaId;
    if (!analysis.ctaPerformance[ctaId]) {
      analysis.ctaPerformance[ctaId] = { count: 0, value: 0, conversionRate: 0 };
    }
    analysis.ctaPerformance[ctaId].count++;
    analysis.ctaPerformance[ctaId].value += lead.value;
  });

  // Analyse des touchpoints
  const allTouchpoints = leads.flatMap(lead => lead.touchpoints);
  analysis.touchpointAnalysis.averageTouchpoints = allTouchpoints.length / leads.length;

  allTouchpoints.forEach(tp => {
    // Pages les plus visitées
    if (!analysis.touchpointAnalysis.mostCommonPages[tp.page]) {
      analysis.touchpointAnalysis.mostCommonPages[tp.page] = 0;
    }
    analysis.touchpointAnalysis.mostCommonPages[tp.page]++;

    // Sections les plus engageantes
    if (!analysis.touchpointAnalysis.mostCommonSections[tp.section]) {
      analysis.touchpointAnalysis.mostCommonSections[tp.section] = 0;
    }
    analysis.touchpointAnalysis.mostCommonSections[tp.section]++;
  });

  return analysis;
};