'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const SESSION_KEY = 'exit_intent_shown';
const GUIDE_KEY = 'exit_intent_last_guide';

interface Guide {
  slug: string;
  label: string;
  headline: string;
  description: string;
  cta: string;
}

const guides: Guide[] = [
  {
    slug: '/guide-acheteurs-b2b',
    label: 'guide-acheteurs-b2b',
    headline: 'Les 12 questions avant d\'acheter un coaching',
    description: 'Évaluez un coach, un formateur ou un consultant B2B avec les bonnes questions — avant d\'investir.',
    cta: 'Télécharger le guide →',
  },
  {
    slug: '/guide-psychologie-decision-b2b',
    label: 'guide-psychologie-decision-b2b',
    headline: 'Psychologie de la décision B2B',
    description: 'Les 7 ressorts psychologiques qui poussent un prospect à signer — ou à trouver une raison de dire non.',
    cta: 'Télécharger le guide →',
  },
];

function pickGuide(): Guide {
  // Alterner via sessionStorage pour ne pas montrer 2× le même
  try {
    const lastIdx = parseInt(sessionStorage.getItem(GUIDE_KEY) ?? '-1', 10);
    const idx = lastIdx === 0 ? 1 : 0;
    sessionStorage.setItem(GUIDE_KEY, String(idx));
    return guides[idx];
  } catch {
    return guides[Math.floor(Math.random() * guides.length)];
  }
}

export default function ExitIntentPopup() {
  const [shown, setShown] = useState(false);
  const [guide, setGuide] = useState<Guide | null>(null);

  useEffect(() => {
    // Ne s'affiche que sur les articles de blog (pas la page index)
    const path = window.location.pathname;
    if (!path.startsWith('/blog/') || path === '/blog') return;

    // Déjà montré dans cette session ?
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // sessionStorage indisponible → laisser passer
    }

    setGuide(pickGuide());

    let armed = true;

    const handleMouseLeave = (e: MouseEvent) => {
      if (!armed) return;
      // Détection de sortie par le haut du viewport
      if (e.clientY > 0) return;

      armed = false;

      setShown(true);

      // Marquer la session
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch { /* ignore */ }

      // GA4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exit_intent_trigger', {
          event_category: 'lead_magnet',
          event_label: guide?.label ?? 'unknown',
          guide_name: guide?.label ?? 'unknown',
        });
      }
    };

    // Petit délai avant d'armer l'exit intent (éviter faux positif au premier hover)
    const armTimeout = setTimeout(() => {
      document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    }, 2000);

    return () => {
      clearTimeout(armTimeout);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trackGuideClick = useCallback((guideLabel: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'guide_offer_click', {
        event_category: 'lead_magnet',
        event_label: guideLabel,
        guide_name: guideLabel,
        source: 'exit_intent_popup',
      });
    }
  }, []);

  const close = useCallback(() => {
    setShown(false);
  }, []);

  if (!shown || !guide) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Offre de guide gratuit"
    >
      {/* Overlay semi-transparent */}
      <div
        className="absolute inset-0 bg-blue-ink/60 backdrop-blur-sm"
        onClick={close}
        onKeyDown={(e) => e.key === 'Escape' && close()}
        tabIndex={-1}
      />

      {/* Carte centrée */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-in slide-in-from-bottom-4 duration-300 border border-indigo-100">
        {/* Bouton fermer */}
        <button
          onClick={close}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-indigo-50 transition-colors text-indigo-400 hover:text-indigo-600"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Contenu */}
        <div className="text-center">
          <div className="w-12 h-12 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-mint-green" aria-hidden="true">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 19.5Z" />
              <path d="M8 7h8" />
              <path d="M8 11h6" />
            </svg>
          </div>

          <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2">
            Guide gratuit
          </p>

          <h3 className="text-xl sm:text-2xl font-title font-bold text-blue-ink mb-3">
            {guide.headline}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {guide.description}
          </p>

          <Link
            href={guide.slug}
            onClick={() => trackGuideClick(guide.label)}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mint-green to-mint-green/90 text-blue-ink font-semibold text-sm px-6 py-3 rounded-xl hover:from-mint-green/90 hover:to-mint-green/80 transition-all w-full sm:w-auto"
          >
            {guide.cta}
          </Link>

          <p className="text-xs text-gray-400 mt-4">
            Gratuit — téléchargement immédiat
          </p>
        </div>
      </div>
    </div>
  );
}
