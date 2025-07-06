'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_TRACKING_ID = 'G-1YMSHSSQKJ';

export default function GoogleAnalytics() {
  useEffect(() => {
    // Éviter le chargement si Google Analytics est déjà initialisé
    if (typeof window.gtag === 'function') {
      return;
    }

    // Charger Google Analytics de manière optimisée
    const loadGA = () => {
      // Initialiser dataLayer
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      // Configuration initiale
      window.gtag('js', new Date());
      window.gtag('config', GA_TRACKING_ID, {
        // Optimisations pour éviter le layout thrashing
        page_title: document.title,
        page_location: window.location.href,
        // Désactiver les mesures automatiques qui causent des recalculs
        send_page_view: false,
        // Optimiser les performances
        transport_type: 'beacon',
        // Réduire l'impact sur les performances
        custom_map: {},
      });

      // Envoyer la page view manuellement pour plus de contrôle
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
      });

      // Charger le script de manière asynchrone après l'initialisation
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      
      // Ajouter le script au head de manière non-bloquante
      script.onload = () => {
        // Script chargé avec succès
        console.log('Google Analytics chargé');
      };
      
      script.onerror = () => {
        // Gestion d'erreur silencieuse
        console.warn('Erreur de chargement Google Analytics');
      };

      document.head.appendChild(script);
    };

    // Utiliser requestIdleCallback pour charger GA quand le navigateur est libre
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadGA, { timeout: 2000 });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas requestIdleCallback
      setTimeout(loadGA, 1000);
    }

  }, []);

  return null;
}

// Fonction utilitaire pour tracker des événements
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Fonction pour tracker les pages vues (pour les SPA)
export const trackPageView = (url: string, title?: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }
};

// Tracker les conversions spécifiques à votre business
export const trackBusinessEvents = {
  // Diagnostic complété
  diagnosticCompleted: (score: string) => {
    trackEvent('diagnostic_completed', 'lead_generation', undefined, 1);
  },

  // Formulaire de contact soumis
  contactFormSubmitted: (source: string) => {
    trackEvent('contact_form_submitted', 'conversion', source, 5);
  },

  // Section visitée
  sectionViewed: (sectionName: string) => {
    trackEvent('section_viewed', 'engagement', sectionName);
  },

  // CTA cliqué
  ctaClicked: (ctaName: string, location: string) => {
    trackEvent('cta_clicked', 'engagement', ctaName, undefined);
  },

  // Cas client consulté
  caseStudyViewed: (clientName: string) => {
    trackEvent('case_study_viewed', 'engagement', clientName);
  },
}; 