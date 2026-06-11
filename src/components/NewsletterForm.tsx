'use client';

import { useState, FormEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed || !isValidEmail(trimmed)) {
      setErrorMsg('Email invalide');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    // GA4 tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'newsletter_signup', {
        event_category: 'lead_generation',
        event_label: 'footer_newsletter',
        source: 'footer',
      });
    }

    try {
      // Envoyer vers HubSpot via un proxy API route
      const resp = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erreur réseau');
    }
  };

  return (
    <div className="max-w-lg">
      <h4 className="font-title font-semibold text-primary-bg mb-3">
        Restez informé
      </h4>
      <p className="text-sm text-white/70 mb-4 leading-relaxed">
        Recevez les nouveaux articles et conseils développement commercial une fois par semaine.
      </p>

      {status === 'success' ? (
        <div className="bg-mint-green/10 border border-mint-green/30 rounded-xl p-4 text-center">
          <p className="text-sm text-mint-green font-medium">
            ✅ Merci ! Vous êtes inscrit.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
            placeholder="votre@email.com"
            disabled={status === 'loading'}
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent disabled:opacity-60 transition-all"
            aria-label="Votre adresse email"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 bg-mint-green text-blue-ink font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-mint-green/90 transition-colors disabled:opacity-60"
          >
            {status === 'loading' ? '…' : 'S\'inscrire'}
          </button>
        </form>
      )}

      {status === 'error' && errorMsg && (
        <p className="text-xs text-red-400 mt-2">{errorMsg}</p>
      )}

      <p className="text-xs text-white/40 mt-3">
        Pas de spam — désinscription en 1 clic.
      </p>
    </div>
  );
}
