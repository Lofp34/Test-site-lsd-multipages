'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { X, ArrowDown } from 'lucide-react';

const STORAGE_KEY = 'leadmagnet-banner-dismissed';
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24h

function isDismissExpired(timestamp: string | null): boolean {
  if (!timestamp) return true;
  const elapsed = Date.now() - parseInt(timestamp, 10);
  return isNaN(elapsed) || elapsed >= DISMISS_DURATION_MS;
}

export default function LeadMagnetBanner() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Ne pas afficher sur les landing pages elles-mêmes
    const path = window.location.pathname;
    if (path === '/guide-acheteurs-b2b' || path === '/guide-psychologie-decision-b2b') {
      return;
    }

    const dismissedTs = localStorage.getItem(STORAGE_KEY);
    if (isDismissExpired(dismissedTs)) {
      setVisible(true);
    }
  }, []);

  // Détection scroll → micro-animation (ombre portée + léger fondu)
  useEffect(() => {
    if (!visible) return;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 8;
      setScrolled(isScrolled);
    };

    // Utiliser un throttle manuel pour les perfs
    const onScroll = () => {
      if (timerRef.current) return;
      timerRef.current = setTimeout(() => {
        handleScroll();
        timerRef.current = null;
      }, 80);
    };

    // État initial
    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible]);

  const trackBannerClick = useCallback((guideName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'banner_click', {
        event_category: 'lead_magnet',
        event_label: guideName,
        guide_name: guideName,
        source: 'sitewide_banner',
      });
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'banner_dismiss', {
        event_category: 'lead_magnet',
        event_label: 'dismiss',
      });
    }
  };

  if (!visible) return null;

  const stickyClasses = 'sticky top-0 z-50 transition-shadow duration-300' +
    (scrolled ? ' shadow-md shadow-indigo-200/50' : ' shadow-none');

  return (
    <div className={`${stickyClasses} bg-gradient-to-r from-indigo-50 via-slate-50 to-indigo-50 border-b border-indigo-100 relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-sm text-blue-ink/80 flex-1 min-w-0">
          <span className={`hidden sm:inline font-medium text-xs uppercase tracking-wider mr-1 transition-all duration-700 ${scrolled ? 'text-mint-green/90' : 'text-blue-ink/60'}`}>
            Guides gratuits&nbsp;:
          </span>
          <Link
            href="/guide-acheteurs-b2b"
            onClick={() => trackBannerClick('guide-acheteurs-b2b')}
            className="whitespace-nowrap text-xs sm:text-sm font-medium text-mint-green hover:text-mint-green/80 transition-colors underline underline-offset-2 decoration-indigo-200 hover:decoration-mint-green"
          >
            12 questions à poser avant d&apos;acheter un coaching
          </Link>
          <span className="text-indigo-300 hidden sm:inline">·</span>
          <Link
            href="/guide-psychologie-decision-b2b"
            onClick={() => trackBannerClick('guide-psychologie-decision-b2b')}
            className="hidden sm:inline whitespace-nowrap text-sm font-medium text-mint-green hover:text-mint-green/80 transition-colors underline underline-offset-2 decoration-indigo-200 hover:decoration-mint-green"
          >
            Psychologie de la décision B2B
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* Micro-indicateur visuel au scroll : petite flèche avec fondu */}
          <span className={`text-xs text-indigo-300 transition-all duration-500 ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </span>
          <button
            onClick={dismiss}
            className="flex-shrink-0 p-1 rounded-full hover:bg-indigo-100 transition-colors text-indigo-400 hover:text-indigo-600"
            aria-label="Fermer — ne plus afficher pendant 24h"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
