'use client';

// Simple CTA tracking utility - fallback version
export interface CTATrackingData {
  ctaId: string;
  ctaText: string;
  ctaType: 'primary' | 'secondary' | 'tertiary';
  section: string;
  destination: string;
  variant?: string;
  position?: number;
}

export function trackCTAClick(data: CTATrackingData) {
  console.log('CTA Click tracked:', data);
  
  // Simple analytics tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_click', {
      cta_id: data.ctaId,
      cta_text: data.ctaText,
      cta_type: data.ctaType,
      section: data.section,
      destination: data.destination
    });
  }
}

export function trackMicroConversion(type: string, ctaId: string, section: string) {
  console.log('Micro conversion tracked:', { type, ctaId, section });
  
  // Simple analytics tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'micro_conversion', {
      conversion_type: type,
      cta_id: ctaId,
      section: section
    });
  }
}

// Additional exports for GoogleAnalytics component
export function setupCustomEvents() {
  console.log('Custom events setup');
}

export function setupConversionGoals() {
  console.log('Conversion goals setup');
}

export function trackSectionView(sectionName: string, options?: { sectionId?: string; timeSpent?: number }) {
  const { sectionId, timeSpent } = options || {};
  console.log('Section view tracked:', { sectionName, sectionId, timeSpent });
  
  // Simple analytics tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'section_view', {
      section_name: sectionName,
      section_id: sectionId,
      time_spent: timeSpent
    });
  }
}