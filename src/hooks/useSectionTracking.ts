'use client';

import { useEffect, useRef } from 'react';
import { trackSectionView } from '@/utils/cta-tracking';

interface UseSectionTrackingOptions {
  sectionName: string;
  threshold?: number;
  trackTimeSpent?: boolean;
}

export const useSectionTracking = ({ 
  sectionName, 
  threshold = 0.5, 
  trackTimeSpent = true 
}: UseSectionTrackingOptions) => {
  const sectionRef = useRef<HTMLElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedRef.current) {
            // Section devient visible
            hasTrackedRef.current = true;
            startTimeRef.current = Date.now();
            
            // Track la vue de section immédiatement
            trackSectionView(sectionName);
          } else if (!entry.isIntersecting && startTimeRef.current && trackTimeSpent) {
            // Section n'est plus visible, calculer le temps passé
            const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
            
            if (timeSpent > 2) { // Seulement si plus de 2 secondes
              trackSectionView(sectionName, timeSpent);
            }
            
            startTimeRef.current = null;
          }
        });
      },
      {
        threshold,
        rootMargin: '-10% 0px -10% 0px' // Trigger quand 10% de la section est visible
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
      
      // Track le temps final si la section était visible au démontage
      if (startTimeRef.current && trackTimeSpent) {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
        if (timeSpent > 2) {
          trackSectionView(sectionName, timeSpent);
        }
      }
    };
  }, [sectionName, threshold, trackTimeSpent]);

  return sectionRef;
};