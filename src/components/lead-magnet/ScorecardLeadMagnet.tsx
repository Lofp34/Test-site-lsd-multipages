'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import HubSpotForm from '@/components/HubSpotForm';

const axes = [
  {
    title: '1) Temps & Priorisation',
    items: [
      'ICP et priorités hebdo clairement définis',
      'Rituels de planification (revue pipeline 30’)',
      'Temps protégé pour prospection et follow-up',
    ],
  },
  {
    title: '2) Prospection',
    items: [
      'ICP documenté, messages différenciés par segment',
      'Taux de réponse > 12% en outbound',
      'Cadence multi-canale (email, téléphone, LinkedIn) maîtrisée',
    ],
  },
  {
    title: '3) Structure d’entretien',
    items: [
      'Discovery standardisée (problème → impact → next step)',
      'Scripts d’objections documentés et pratiqués',
      'Recadrage et qualification claire avant démo/offre',
    ],
  },
  {
    title: '4) Pipeline & Prévisions',
    items: [
      'Stades clairs (Commit / Best Case / Next Step)',
      'Revue hebdo orientée plan d’action, non récit',
      'Prévisions fiables et partagées (visuel + métriques)',
    ],
  },
  {
    title: '5) Outillage IA',
    items: [
      'Agent d’auto-coaching relié au playbook',
      'Prompts standardisés par étape du cycle',
      'Assistance IA pour prospection et préparation d’entretiens',
    ],
  },
];

const interpretations = [
  {
    label: 'Chaotique',
    description: '≤ 8 par axe : dépendance aux individus, résultats imprévisibles.'
  },
  {
    label: 'En transition',
    description: '9 – 11 : bases posées, manque de constance et d’outillage.'
  },
  {
    label: 'Structuré',
    description: '12 – 14 : pratiques en place, gains à aller chercher par finesse.'
  },
  {
    label: 'Haute performance',
    description: '≥ 15 : prévisibilité, itération continue, coaching cadencé.'
  },
];

const quickWins = [
  {
    title: 'Rituel pipeline 30’',
    description: 'Revue hebdo par opportunité → next step datée + propriétaire.'
  },
  {
    title: 'Script d’ouverture',
    description: '“Bonjour {Prénom}, 30 secondes pour valider si ça vaut le coup de poursuivre…”'
  },
  {
    title: 'Qualification standardisée',
    description: 'SPICED/NEPQ allégée, 6 questions à cocher avant démo.'
  },
];

const roadmap = [
  'S1 : Audit individuel (1h/commercial) — temps, structure, mindset.',
  'S2 : Analyse collective (4h) — prospection, entretiens, frictions.',
  'S3 : Playbook + agent IA (16h async) — scripts et prompts.',
  'S4 : Déploiement (4h) — revue plan d’action et adoption.',
];

const kpis = [
  'Appels/emails qualifiés par semaine',
  'Taux conversion RDV → opportunités',
  'Durée du cycle (jours)',
  'Taux de closing',
];

const defaultCtaUrl = '#';
const utmParams = 'utm_source=leadmagnet&utm_medium=pdf&utm_campaign=bootcamp';

export default function ScorecardLeadMagnet() {
  const ctaUrl = useMemo(() => {
    const rawUrl = process.env.NEXT_PUBLIC_SCORECARD_CTA_URL || defaultCtaUrl;
    if (!rawUrl || rawUrl === '#') {
      return '#';
    }
    const separator = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${separator}${utmParams}`;
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-blue-ink">
      <header className="relative overflow-hidden bg-blue-ink text-white">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-mint-green blur-3xl" />
          <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-orange-soft blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:py-20">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-mint-green backdrop-blur">
              Nouveau lead magnet • Scorecard + Playbook IA
            </span>
            <h1 className="font-title text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Scorecard de structuration commerciale + mini-playbook IA
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Diagnostiquez vos 5 leviers en 12 minutes et repartez avec 3 actions à fort impact à déployer cette semaine. 20 ans d’expérience terrain augmentés par l’IA, sans blabla motivation.
            </p>
            <div className="flex flex-wrap gap-4">
              {ctaUrl !== '#' ? (
                <Link
                  href={ctaUrl}
                  className="rounded-xl bg-mint-green px-5 py-3 text-base font-semibold text-blue-ink shadow-lg transition hover:scale-[1.02]"
                >
                  Réserver l’audit express (30 min)
                </Link>
              ) : null}
              <button
                type="button"
                onClick={handlePrint}
                className="rounded-xl border border-white/30 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Exporter en PDF
              </button>
              <Link
                href="/lead-magnet-scorecard.pdf"
                className="rounded-xl border border-white/30 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Télécharger la version statique
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur">
              <h2 className="mb-4 text-xl font-semibold">Recevez aussi la version email</h2>
              <p className="mb-6 text-sm text-white/80">
                Remplissez ce formulaire HubSpot pour recevoir le PDF, la feuille de route 30 jours et des bonus exclusifs.
              </p>
              <HubSpotForm formId="884e2971-2d90-4ca1-86ee-eb824f43f074" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <section className="mb-10 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="font-title text-2xl font-bold text-blue-ink">Comment utiliser cette scorecard</h2>
          <ul className="mt-4 list-disc space-y-3 text-base text-gray-700 marker:text-mint-green">
            <li>Imprimez ou utilisez en PDF. Cochez/entourez les notes (1 à 5) pour chaque item.</li>
            <li>Totalisez par axe. Identifiez votre niveau global : Chaotique / Transition / Structuré / Haute performance.</li>
            <li>Appliquez les 3 Quick Wins dès cette semaine. Réservez un audit express si vous voulez le plan complet adapté à votre équipe.</li>
          </ul>
        </section>

        <section className="mb-10 space-y-8">
          <h2 className="font-title text-2xl font-bold text-blue-ink">Scorecard — vos 5 leviers</h2>
          <div className="space-y-6">
            {axes.map((axis) => (
              <div key={axis.title} className="rounded-2xl bg-white p-6 shadow">
                <h3 className="text-xl font-semibold text-blue-ink">{axis.title}</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <th className="px-3 py-2">Item</th>
                        {[1, 2, 3, 4, 5].map((score) => (
                          <th key={score} className="w-16 px-3 py-2 text-center">{score}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {axis.items.map((item) => (
                        <tr key={item} className="border-b border-slate-100 last:border-none">
                          <td className="px-3 py-3 text-sm text-slate-700">{item}</td>
                          {[1, 2, 3, 4, 5].map((score) => (
                            <td key={score} className="h-12 w-16 border-l border-slate-100" />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500">Notez chaque item de 1 (pas en place) à 5 (maîtrisé). Totalisez par axe.</p>
        </section>

        <section className="mb-10 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="font-title text-2xl font-bold text-blue-ink">Résultats & interprétation</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {interpretations.map((level) => (
              <div key={level.label} className="rounded-2xl border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-blue-ink">{level.label}</h3>
                <p className="mt-2 text-sm text-slate-600">{level.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Indicateurs cibles : taux de conversion RDV → opportunités, durée du cycle, taux de closing.
          </p>
        </section>

        <section className="mb-10 rounded-3xl bg-gradient-to-br from-white via-white to-mint-green/10 p-8 shadow-lg">
          <h2 className="font-title text-2xl font-bold text-blue-ink">3 Quick Wins — 7 jours</h2>
          <ol className="mt-6 space-y-5">
            {quickWins.map((win, index) => (
              <li key={win.title} className="flex gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-green text-base font-bold text-blue-ink">{index + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold text-blue-ink">{win.title}</h3>
                  <p className="text-sm text-slate-600">{win.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-10 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="font-title text-2xl font-bold text-blue-ink">Mini-playbook IA</h2>
          <div className="mt-6 space-y-6 text-sm text-slate-700">
            <div>
              <h3 className="text-lg font-semibold text-blue-ink">Script prospection — email court</h3>
              <p className="mt-2 leading-relaxed">
                <strong>Objet :</strong> Idée rapide pour votre équipe<br />
                Bonjour {'{Prénom}'},<br />
                30 secondes pour valider si ça vaut le coup de poursuivre : j’aide des équipes comme la vôtre à structurer prospection et entretiens afin d’augmenter taux de réponse et closing en {'<'} 60 jours. Si vous êtes partant, j’envoie 3 questions et un exemple de plan d’action. Ça vous va ?
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-ink">Script objection — “trop cher”</h3>
              <p className="mt-2 leading-relaxed">
                “Quand vous dites ‘trop cher’, c’est par rapport à X (budget) ou au résultat attendu Y (impact) ? Si on obtenait Y en Z semaines, que deviendrait X ?”
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-ink">Prompt d’auto-coaching IA</h3>
              <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-xs leading-relaxed text-slate-700">
Tu es mon coach de vente. À partir de cet échange (notes ci-dessous), génère:
- 3 hypothèses de problème latent et leurs impacts
- 5 questions de creusement orientées “next step”
- un plan d’action en 3 étapes avant notre prochain point
Notes : …
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="font-title text-2xl font-bold text-blue-ink">Feuille de route — 30 jours</h2>
          <ul className="mt-4 list-decimal space-y-3 pl-6 text-sm text-slate-700">
            {roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-10 rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="font-title text-2xl font-bold text-blue-ink">KPIs — activité × compétence</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-700">
            {kpis.map((kpi) => (
              <li key={kpi}>{kpi}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-blue-ink p-8 text-white shadow-xl">
          <h2 className="font-title text-2xl font-bold">Audit express gratuit (30 min)</h2>
          <p className="mt-4 text-sm text-white/80">
            Nous analysons votre score, vos priorités et vous repartez avec un plan d’action personnalisé.
          </p>
          {ctaUrl !== '#' ? (
            <Link
              href={ctaUrl}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-mint-green px-6 py-3 text-base font-semibold text-blue-ink transition hover:scale-[1.02]"
            >
              Réserver mon audit express
            </Link>
          ) : null}
        </section>
      </main>
    </div>
  );
}

