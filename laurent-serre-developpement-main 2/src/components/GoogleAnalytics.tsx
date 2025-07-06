'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  measurementId: string;
}

declare global {
  interface Window {
    gtag: (...args: (string | Date | Record<string, unknown>)[]) => void;
    dataLayer: (string | Date | Record<string, unknown>)[][];
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Initialiser dataLayer si pas déjà fait
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      
      // Fonction gtag
      window.gtag = function(...args: (string | Date | Record<string, unknown>)[]) {
        window.dataLayer.push(args);
      };
      
      // Configuration initiale
      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [measurementId]);

  return (
    <>
      {/* Script Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}

// Hook pour tracker des événements personnalisés
export const trackEvent = (eventName: string, parameters?: Record<string, string | number | undefined>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: eventName,
      ...parameters,
    });
  }
};

// Tracker les conversions spécifiques à votre business
export const trackBusinessEvents = {
  // Diagnostic complété
  diagnosticCompleted: (score: string) => {
    trackEvent('diagnostic_completed', {
      event_category: 'lead_generation',
      diagnostic_score: score,
      value: 1,
    });
  },

  // Formulaire de contact soumis
  contactFormSubmitted: (source: string) => {
    trackEvent('contact_form_submitted', {
      event_category: 'conversion',
      form_source: source,
      value: 5, // Valeur estimée d'un lead
    });
  },

  // Section visitée
  sectionViewed: (sectionName: string) => {
    trackEvent('section_viewed', {
      event_category: 'engagement',
      section_name: sectionName,
    });
  },

  // CTA cliqué
  ctaClicked: (ctaName: string, location: string) => {
    trackEvent('cta_clicked', {
      event_category: 'engagement',
      cta_name: ctaName,
      cta_location: location,
    });
  },

  // Cas client consulté
  caseStudyViewed: (clientName: string) => {
    trackEvent('case_study_viewed', {
      event_category: 'engagement',
      client_name: clientName,
    });
  },
}; 