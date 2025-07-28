'use client';

import React from 'react';
import NegotiationCTA from './NegotiationCTA';
import { useABTest } from '@/utils/ab-testing';
import { trackCTAClick } from '@/utils/cta-tracking';

interface ABTestCTAProps {
  testId: string;
  baseProps: {
    variant: 'diagnostic' | 'bootcamp' | 'consultation' | 'resources';
    title: string;
    description: string;
    buttonText: string;
    href: string;
    icon?: React.ReactNode;
    className?: string;
    ctaId: string;
    section: string;
    position?: number;
  };
  variantOverrides?: Record<string, Partial<typeof baseProps>>;
}

const ABTestCTA: React.FC<ABTestCTAProps> = ({
  testId,
  baseProps,
  variantOverrides = {}
}) => {
  const { variant, isLoading, config, trackConversion } = useABTest(testId);
  
  if (isLoading) {
    return (
      <div className="animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl h-48 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-2xl"></div>
          <div className="h-6 bg-gray-300 rounded w-48"></div>
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded-full w-40"></div>
      </div>
    );
  }

  // Appliquer les overrides de variante si disponibles
  const variantProps = variant && variantOverrides[variant.id] 
    ? { ...baseProps, ...variantOverrides[variant.id] }
    : baseProps;

  // Appliquer la configuration du test A/B
  const finalProps = {
    ...variantProps,
    buttonText: config.diagnosticButtonText || variantProps.buttonText,
    // Ajouter d'autres configurations selon le type de CTA
    ...(variantProps.variant === 'bootcamp' && config.bootcampButtonText && {
      buttonText: config.bootcampButtonText
    }),
    ...(variantProps.variant === 'consultation' && config.consultationButtonText && {
      buttonText: config.consultationButtonText
    })
  };

  // Wrapper pour tracker les conversions A/B
  const handleCTAClick = () => {
    // Tracker le clic normal
    trackCTAClick({
      ctaId: finalProps.ctaId,
      ctaText: finalProps.buttonText,
      ctaType: 'primary',
      section: finalProps.section,
      destination: finalProps.href,
      variant: variant?.id,
      position: finalProps.position
    });

    // Tracker la conversion A/B
    trackConversion('cta_click', 1);
  };

  return (
    <div onClick={handleCTAClick}>
      <NegotiationCTA
        {...finalProps}
        ctaId={`${finalProps.ctaId}_${variant?.id || 'default'}`}
      />
    </div>
  );
};

export default ABTestCTA;