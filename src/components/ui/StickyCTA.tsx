'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TrackedButton from './TrackedButton';
import { trackCTAClick, trackMicroConversion } from '@/utils/cta-tracking';
import { useABTest } from '@/utils/ab-testing';

interface StickyCTAProps {
  isVisible: boolean;
  techniqueName: string;
  className?: string;
}

const StickyCTA: React.FC<StickyCTAProps> = ({
  isVisible,
  techniqueName,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { variant, config } = useABTest('cta_placement_test');

  // Ne pas afficher si le test A/B désactive le sticky CTA
  const stickyEnabled = config.stickyCtaEnabled !== false;

  useEffect(() => {
    if (isVisible && !isDismissed) {
      trackMicroConversion('sticky_cta_view', 'sticky-cta', 'sticky_navigation');
    }
  }, [isVisible, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    trackMicroConversion('sticky_cta_dismiss', 'sticky-cta', 'sticky_navigation');
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    trackMicroConversion(
      isExpanded ? 'sticky_cta_collapse' : 'sticky_cta_expand', 
      'sticky-cta', 
      'sticky_navigation'
    );
  };

  if (!stickyEnabled || !isVisible || isDismissed) {
    return null;
  }

  return (
    <div className={`
      fixed bottom-0 left-0 right-0 z-50 
      transform transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      ${className}
    `}>
      {/* Mobile Sticky CTA */}
      <div className="md:hidden">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                Maîtrisez "{techniqueName}"
              </p>
              {isExpanded && (
                <p className="text-xs opacity-90 mt-1">
                  Diagnostic gratuit + formation personnalisée
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={handleExpand}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label={isExpanded ? 'Réduire' : 'Développer'}
              >
                <svg 
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              <button
                onClick={handleDismiss}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {isExpanded && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link href="/diagnostic" className="block">
                <TrackedButton
                  variant="outline"
                  size="sm"
                  ctaId="sticky-diagnostic-mobile"
                  ctaText="Diagnostic gratuit"
                  ctaType="primary"
                  section="sticky_navigation"
                  destination="/diagnostic"
                  position={1}
                  className="w-full text-xs"
                >
                  📊 Diagnostic
                </TrackedButton>
              </Link>
              
              <Link href="/bootcamp-commercial-intensif" className="block">
                <TrackedButton
                  variant="secondary"
                  size="sm"
                  ctaId="sticky-bootcamp-mobile"
                  ctaText="Bootcamp commercial"
                  ctaType="primary"
                  section="sticky_navigation"
                  destination="/bootcamp-commercial-intensif"
                  position={2}
                  className="w-full text-xs bg-white text-red-600 hover:bg-gray-100"
                >
                  🚀 Bootcamp
                </TrackedButton>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sticky CTA */}
      <div className="hidden md:block">
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white shadow-2xl">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Prêt à maîtriser "{techniqueName}" ?
                  </h3>
                  <p className="text-sm opacity-90">
                    Diagnostic gratuit + accompagnement personnalisé avec Laurent Serre
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Link href="/diagnostic">
                  <TrackedButton
                    variant="outline"
                    size="md"
                    ctaId="sticky-diagnostic-desktop"
                    ctaText="Diagnostic gratuit"
                    ctaType="primary"
                    section="sticky_navigation"
                    destination="/diagnostic"
                    position={1}
                    className="border-white text-white hover:bg-white hover:text-red-600"
                  >
                    📊 Diagnostic gratuit
                  </TrackedButton>
                </Link>
                
                <Link href="/bootcamp-commercial-intensif">
                  <TrackedButton
                    variant="secondary"
                    size="md"
                    ctaId="sticky-bootcamp-desktop"
                    ctaText="Bootcamp commercial"
                    ctaType="primary"
                    section="sticky_navigation"
                    destination="/bootcamp-commercial-intensif"
                    position={2}
                    className="bg-white text-red-600 hover:bg-gray-100"
                  >
                    🚀 Bootcamp commercial
                  </TrackedButton>
                </Link>
                
                <button
                  onClick={handleDismiss}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors ml-2"
                  aria-label="Fermer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;