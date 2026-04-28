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

  if (typeof window === 'undefined' || !(window as any).gtag) {
    return;
  }

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest('a');

    if (!link) {
      return;
    }

    const href = link.getAttribute('href') || '';
    const linkText = link.textContent?.trim().slice(0, 120) || '';

    if (href.startsWith('tel:')) {
      (window as any).gtag('event', 'phone_click', {
        event_category: 'lead_generation',
        event_label: linkText || href,
        link_url: href,
      });
    }

    if (href.startsWith('mailto:')) {
      (window as any).gtag('event', 'email_click', {
        event_category: 'lead_generation',
        event_label: linkText || href,
        link_url: href,
      });
    }

    if (href === '/contact' || href === '/diagnostic' || href.includes('/contact') || href.includes('/diagnostic')) {
      (window as any).gtag('event', 'cta_clicked', {
        event_category: 'lead_generation',
        event_label: linkText || href,
        link_url: href,
      });
    }
  });
}

export function setupConversionGoals() {
  console.log('Conversion goals setup');
}

export function trackSectionView(sectionId: string, sectionName: string) {
  console.log('Section view tracked:', { sectionId, sectionName });
  
  // Simple analytics tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'section_view', {
      section_id: sectionId,
      section_name: sectionName
    });
  }
}