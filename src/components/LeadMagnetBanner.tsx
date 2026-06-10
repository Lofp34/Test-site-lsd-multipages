'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const STORAGE_KEY = 'leadmagnet-banner-dismissed';

export default function LeadMagnetBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Ne pas afficher sur les landing pages elles-mêmes
    const path = window.location.pathname;
    if (path === '/guide-acheteurs-b2b' || path === '/guide-psychologie-decision-b2b') {
      return;
    }

    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-indigo-50 border-b border-indigo-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-sm text-blue-ink/80 flex-1 min-w-0">
          <span className="hidden sm:inline font-medium text-xs uppercase tracking-wider text-blue-ink/60 mr-1">
            Guides gratuits&nbsp;:
          </span>
          <Link
            href="/guide-acheteurs-b2b"
            className="whitespace-nowrap text-xs sm:text-sm font-medium text-mint-green hover:text-mint-green/80 transition-colors underline underline-offset-2 decoration-indigo-200 hover:decoration-mint-green"
          >
            12 questions à poser avant d&apos;acheter un coaching
          </Link>
          <span className="text-indigo-300 hidden sm:inline">·</span>
          <Link
            href="/guide-psychologie-decision-b2b"
            className="hidden sm:inline whitespace-nowrap text-sm font-medium text-mint-green hover:text-mint-green/80 transition-colors underline underline-offset-2 decoration-indigo-200 hover:decoration-mint-green"
          >
            Psychologie de la décision B2B
          </Link>
        </div>
        <button
          onClick={dismiss}
          className="flex-shrink-0 p-1 rounded-full hover:bg-indigo-100 transition-colors text-indigo-400 hover:text-indigo-600"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
