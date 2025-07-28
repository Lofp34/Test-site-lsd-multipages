'use client';

import { setupCustomEvents, setupConversionGoals } from './cta-tracking';
import { getTouchPointTracker } from './lead-attribution';

// Configuration des événements personnalisés pour la page technique
export const initializeTechniquePageAnalytics = (techniqueName: string) => {
  if (typeof window === 'undefined') return;

  // Initialiser le tracking de base
  setupCustomEvents();
  setupConversionGoals();

  // Initialiser le tracker de touchpoints
  getTouchPointTracker();

  // Configurer les événements spécifiques à la page technique
  setupTechniquePageEvents(techniqueName);

  // Configurer le tracking de performance
  setupPerformanceTracking();

  // Configurer le tracking d'engagement
  setupEngagementTracking();

  // Configurer le tracking de scroll
  setupScrollTracking();

  // Configurer le tracking de temps passé
  setupTimeTracking();
};

// Configuration des événements spécifiques à la page technique
const setupTechniquePageEvents = (techniqueName: string) => {
  // Tracker l'arrivée sur la page
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'technique_page_view', {
      event_category: 'technique_engagement',
      event_label: techniqueName,
      technique_name: techniqueName,
      page_path: window.location.pathname,
      session_id: sessionStorage.getItem('ls_session_id'),
      timestamp: Date.now()
    });
  }

  // Tracker les interactions avec les sections
  const sections = [
    'hero',
    'expertise',
    'credibility', 
    'practical-guide',
    'common-mistakes',
    'case-studies',
    'interactive-tools',
    'conversion-ctas'
  ];

  sections.forEach(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (typeof window.gtag === 'function') {
                window.gtag('event', 'section_view', {
                  event_category: 'technique_engagement',
                  event_label: `${techniqueName}_${sectionId}`,
                  technique_name: techniqueName,
                  section_id: sectionId,
                  session_id: sessionStorage.getItem('ls_session_id')
                });
              }
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(element);
    }
  });
};

// Configuration du tracking de performance
const setupPerformanceTracking = () => {
  // Tracker les Core Web Vitals
  if ('web-vital' in window) {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'web_vital', {
            event_category: 'performance',
            event_label: 'LCP',
            value: Math.round(entry.startTime),
            metric_name: 'largest_contentful_paint',
            page_path: window.location.pathname
          });
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'web_vital', {
            event_category: 'performance',
            event_label: 'FID',
            value: Math.round(entry.processingStart - entry.startTime),
            metric_name: 'first_input_delay',
            page_path: window.location.pathname
          });
        }
      }
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'web_vital', {
          event_category: 'performance',
          event_label: 'CLS',
          value: Math.round(clsValue * 1000),
          metric_name: 'cumulative_layout_shift',
          page_path: window.location.pathname
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Tracker le temps de chargement de la page
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_load_time', {
        event_category: 'performance',
        event_label: 'full_page_load',
        value: loadTime,
        page_path: window.location.pathname
      });
    }
  });
};

// Configuration du tracking d'engagement
const setupEngagementTracking = () => {
  let engagementScore = 0;
  let lastActivity = Date.now();
  let isActive = true;

  // Tracker l'activité utilisateur
  const trackActivity = () => {
    lastActivity = Date.now();
    if (!isActive) {
      isActive = true;
      engagementScore += 1;
    }
  };

  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, trackActivity, { passive: true });
  });

  // Vérifier l'inactivité toutes les 5 secondes
  setInterval(() => {
    const timeSinceLastActivity = Date.now() - lastActivity;
    
    if (timeSinceLastActivity > 5000 && isActive) {
      isActive = false;
    }
    
    if (timeSinceLastActivity > 30000) {
      // Utilisateur inactif depuis 30 secondes
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'user_inactive', {
          event_category: 'engagement',
          event_label: 'inactive_30s',
          engagement_score: engagementScore,
          page_path: window.location.pathname
        });
      }
    }
  }, 5000);

  // Tracker l'engagement au départ de la page
  window.addEventListener('beforeunload', () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_engagement', {
        event_category: 'engagement',
        event_label: 'page_exit',
        engagement_score: engagementScore,
        time_on_page: Date.now() - (window as any).pageStartTime,
        page_path: window.location.pathname
      });
    }
  });
};

// Configuration du tracking de scroll
const setupScrollTracking = () => {
  let maxScroll = 0;
  const scrollMilestones = [25, 50, 75, 90, 100];
  const reachedMilestones = new Set<number>();

  const trackScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;

      // Tracker les jalons de scroll
      scrollMilestones.forEach(milestone => {
        if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
          reachedMilestones.add(milestone);
          
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll_milestone', {
              event_category: 'engagement',
              event_label: `scroll_${milestone}`,
              scroll_depth: milestone,
              page_path: window.location.pathname,
              session_id: sessionStorage.getItem('ls_session_id')
            });
          }
        }
      });
    }
  };

  window.addEventListener('scroll', trackScroll, { passive: true });
};

// Configuration du tracking de temps passé
const setupTimeTracking = () => {
  const startTime = Date.now();
  (window as any).pageStartTime = startTime;

  // Tracker le temps passé toutes les 30 secondes
  const timeTrackingInterval = setInterval(() => {
    const timeSpent = Date.now() - startTime;
    
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'time_on_page', {
        event_category: 'engagement',
        event_label: 'time_tracking',
        value: Math.round(timeSpent / 1000), // en secondes
        page_path: window.location.pathname,
        session_id: sessionStorage.getItem('ls_session_id')
      });
    }
  }, 30000);

  // Nettoyer l'intervalle au départ de la page
  window.addEventListener('beforeunload', () => {
    clearInterval(timeTrackingInterval);
  });
};

// Configuration du tracking des erreurs JavaScript
export const setupErrorTracking = () => {
  window.addEventListener('error', (event) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'javascript_error', {
        event_category: 'error',
        event_label: event.message,
        error_message: event.message,
        error_filename: event.filename,
        error_lineno: event.lineno,
        error_colno: event.colno,
        page_path: window.location.pathname
      });
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'promise_rejection', {
        event_category: 'error',
        event_label: 'unhandled_promise_rejection',
        error_reason: event.reason?.toString() || 'Unknown',
        page_path: window.location.pathname
      });
    }
  });
};

// Configuration du tracking des interactions avec les formulaires
export const setupFormTracking = () => {
  // Tracker le début de saisie dans les formulaires
  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      const form = target.closest('form');
      const formId = form?.id || 'unknown_form';
      
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'form_start', {
          event_category: 'form_interaction',
          event_label: formId,
          form_id: formId,
          field_name: target.getAttribute('name') || 'unknown',
          page_path: window.location.pathname
        });
      }
    }
  });

  // Tracker l'abandon de formulaire
  document.addEventListener('focusout', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      const form = target.closest('form');
      const formId = form?.id || 'unknown_form';
      
      // Vérifier si le formulaire a été abandonné (pas de soumission dans les 5 secondes)
      setTimeout(() => {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'form_field_exit', {
            event_category: 'form_interaction',
            event_label: formId,
            form_id: formId,
            field_name: target.getAttribute('name') || 'unknown',
            field_value_length: (target as HTMLInputElement).value?.length || 0,
            page_path: window.location.pathname
          });
        }
      }, 1000);
    }
  });
};

// Configuration du tracking des clics sur les liens externes
export const setupExternalLinkTracking = () => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a') as HTMLAnchorElement;
    
    if (link && link.href) {
      const isExternal = link.hostname !== window.location.hostname;
      
      if (isExternal) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'external_link_click', {
            event_category: 'outbound_link',
            event_label: link.href,
            link_url: link.href,
            link_text: link.textContent?.trim() || '',
            page_path: window.location.pathname
          });
        }
      }
    }
  });
};

// Fonction principale d'initialisation
export const initializeAdvancedAnalytics = (techniqueName: string) => {
  if (typeof window === 'undefined') return;

  // Initialiser tous les systèmes de tracking
  initializeTechniquePageAnalytics(techniqueName);
  setupErrorTracking();
  setupFormTracking();
  setupExternalLinkTracking();

  // Marquer l'initialisation comme terminée
  (window as any).analyticsInitialized = true;

  console.log('🎯 Analytics avancés initialisés pour:', techniqueName);
};