'use client';

import React from 'react';
import Link from 'next/link';
import { trackCTAClick, trackMicroConversion, CTATrackingData } from '@/utils/cta-tracking';
import { useABTest, trackABTestConversion } from '@/utils/ab-testing';

interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  // Propriétés de tracking
  ctaId: string;
  ctaText: string;
  ctaType: 'primary' | 'secondary' | 'tertiary';
  section: string;
  variant_name?: string;
  position?: number;
  // A/B Testing
  enableABTest?: boolean;
  abTestId?: string;
  // Props Link standard
  target?: string;
  rel?: string;
  prefetch?: boolean;
}

const TrackedLink: React.FC<TrackedLinkProps> = ({
  href,
  children,
  className = '',
  ctaId,
  ctaText,
  ctaType,
  section,
  variant_name,
  position,
  enableABTest = false,
  abTestId,
  target,
  rel,
  prefetch
}) => {
  // A/B Testing hook
  const { variant, trackConversion } = useABTest(enableABTest && abTestId ? abTestId : '');
  
  // Déterminer le texte et les propriétés finales basées sur l'A/B test
  const finalText = enableABTest && variant ? variant.text : ctaText;
  const finalVariantName = enableABTest && variant ? variant.id : variant_name;
  
  const handleClick = () => {
    // Tracking du clic CTA standard
    const trackingData: CTATrackingData = {
      ctaId,
      ctaText: finalText,
      ctaType,
      section,
      destination: href,
      variant: finalVariantName,
      position
    };

    trackCTAClick(trackingData);
    
    // Tracking spécifique A/B test si activé
    if (enableABTest && abTestId && variant) {
      trackConversion();
    }
  };

  const handleMouseEnter = () => {
    // Tracking du hover pour mesurer l'engagement
    trackMicroConversion('hover', ctaId, section);
    
    // Tracking hover A/B test
    if (enableABTest && abTestId && variant) {
      trackMicroConversion('ab_hover', `${abTestId}_${variant.id}`, section);
    }
  };

  const handleFocus = () => {
    // Tracking du focus pour l'accessibilité
    trackMicroConversion('focus', ctaId, section);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      className={className}
      target={target}
      rel={rel}
      prefetch={prefetch}
      data-cta-id={ctaId}
      data-cta-section={section}
      data-cta-type={ctaType}
      data-ab-test={enableABTest && abTestId ? abTestId : undefined}
      data-ab-variant={enableABTest && variant ? variant.id : undefined}
    >
      {children}
    </Link>
  );
};

export default TrackedLink;