import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';

export const metadata: Metadata = {
  title: 'Système commercial 90 jours : le plan anti yo-yo du chiffre d\'affaires | Laurent Serre',
  description: 'Le framework 90 jours pour dirigeants et directeurs commerciaux qui veulent stabiliser le CA, accélérer les cycles et convertir plus proprement.',
  keywords: 'système commercial, plan 90 jours, directeur commercial, dirigeant PME, conversion B2B, bootcamp vente',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/systeme-90-jours-anti-yo-yo-ca',
  },
  openGraph: {
    title: 'Système commercial 90 jours : le plan anti yo-yo du CA',
    description: 'Un plan d\'exécution en 3 sprints pour fiabiliser pipeline, conversion et rythme managérial.',
    url: 'https://www.laurentserre.com/blog/systeme-90-jours-anti-yo-yo-ca',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-03-24-systeme-90-jours-hero.webp',
        width: 1600,
        height: 900,
        alt: 'Système commercial 90 jours anti yo-yo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Système commercial 90 jours : anti yo-yo du CA',
    description: 'Le cadre opérationnel pour sécuriser les revenus sans surcharger les équipes.',
    images: ['https://www.laurentserre.com/images/blog/2026-03-24-systeme-90-jours-hero.webp'],
  },
};

export default function Systeme90JoursPage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Système commercial 90 jours : le plan anti yo-yo du chiffre d&apos;affaires",
  "description": "Le framework 90 jours pour dirigeants et directeurs commerciaux qui veulent stabiliser le CA, accélérer les cycles et convertir plus proprement.",
  "image": "https://www.laurentserre.com/images/blog/2026-03-24-systeme-90-jours-hero.webp",
  "datePublished": "2026-03-24",
  "dateModified": "2026-03-24",
  "author": {
    "@type": "Person",
    "name": "Laurent Serre",
    "url": "https://www.laurentserre.com/a-propos",
    "sameAs": [
      "https://www.linkedin.com/in/laurentserre34/",
      "https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Laurent Serre",
    "url": "https://www.laurentserre.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.laurentserre.com/blog/systeme-90-jours-anti-yo-yo-ca"
  },
  "keywords": [
    "système commercial",
    "plan 90 jours",
    "directeur commercial",
    "dirigeant PME",
    "conversion B2B",
    "bootcamp vente"
  ]
};

  return (
<main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/2026-03-24-systeme-90-jours-hero.webp"
            alt="Système commercial 90 jours pour sécuriser le chiffre d'affaires"
            fill
            className="object-cover object-top brightness-[0.3]"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-mint-green text-white">
              Exécution commerciale
            </span>
            <span className="text-white/60 text-sm">• 24 mars 2026</span>
            <span className="text-white/60 text-sm">• 10 min</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold mb-6 leading-tight">
            Système commercial 90 jours : le plan anti yo-yo du chiffre d&apos;affaires
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Beaucoup d'entreprises ont un problème qu'elles n'osent pas nommer : un chiffre d'affaires en dents de scie. Ce n'est pas un problème de motivation. C'est un problème de système.
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="mb-8">
            Si vous êtes dirigeant, DG ou directeur commercial, votre priorité n&apos;est pas de “faire plus”.
            Votre priorité est de <strong>mettre votre machine commerciale sous contrôle</strong>.
            Voici le cadre 90 jours que j&apos;utilise pour stabiliser la performance sans épuiser les équipes.
          </p>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD — Onboarding 90 jours
            </p>
            <p className="text-sm text-amber-700 mb-5">
              26 planches illustrées — cliquez sur une vignette pour feuilleter la BD dans le lecteur intégré.
            </p>
            <BDCarousel
              images={[
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-01.webp', alt: 'Accueil du nouveau', index: 1 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-02.webp', alt: 'Semaine 1 — découverte', index: 2 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-03.webp', alt: 'Les premiers rendez-vous', index: 3 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-04.webp', alt: 'Le diagnostic terrain', index: 4 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-05.webp', alt: 'Structurer le pipeline', index: 5 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-06.webp', alt: 'Le coaching du manager', index: 6 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-07.webp', alt: 'Objectifs 30 jours', index: 7 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-08.webp', alt: 'Revue de mi-parcours', index: 8 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-09.webp', alt: 'Ajustements semaine 5', index: 9 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-10.webp', alt: 'Les outils CRM', index: 10 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-11.webp', alt: 'Les objections terrain', index: 11 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-12.webp', alt: 'Semaine 7 — accélération', index: 12 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-13.webp', alt: 'Les premiers deals', index: 13 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-14.webp', alt: 'La confiance s installe', index: 14 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-15.webp', alt: 'Palier 60 jours', index: 15 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-16.webp', alt: 'Revue de portefeuille', index: 16 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-17.webp', alt: 'Autonomie progressive', index: 17 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-18.webp', alt: 'Les indicateurs clés', index: 18 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-19.webp', alt: 'Semaine 9 — cap', index: 19 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-20.webp', alt: 'Les dernières semaines', index: 20 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-21.webp', alt: 'Objectif ligne d arrivée', index: 21 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-22.webp', alt: 'Revue finale 90 jours', index: 22 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-23.webp', alt: 'Bilan onboarding', index: 23 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-24.webp', alt: 'Prochaines étapes', index: 24 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-25.webp', alt: 'Les pièges à éviter', index: 25 },
                { src: '/images/blog/carrousel-onboarding-90-jours/V5-26.webp', alt: 'Conclusion — embarquer l équipe', index: 26 },
              ]}
              title="Carrousel BD — Onboarding 90 jours"
              maxPreview={2}
            />
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-semibold text-sm rounded-full hover:bg-amber-700 transition-colors shadow-sm"
              >
                🔍 Évaluez votre équipe — Diagnostic gratuit
              </Link>
              <a
                href="/downloads/carrousel-onboarding-90-jours-018.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (26 planches)
              </a>
            </div>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Sprint 1 (Jours 1 à 30) : assainir le pipeline pour retrouver la vérité</h2>
          <p className="mb-4">
            Tant que votre pipeline mélange opportunités solides et opportunités fantômes, vos décisions sont biaisées.
            Le premier sprint consiste à reconstruire un forecast défendable.
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Sortir les deals sans étape datée ni sponsor identifié</li>
            <li>Noter chaque opportunité sur 3 risques : délai, politique, concurrence</li>
            <li>Définir un “committed forecast” réellement soutenable</li>
          </ul>
          <p className="mb-6">
            Pour compléter cette étape, je vous conseille aussi de lire
            {' '}
            <Link href="/blog/pipeline-commercial-q2-2026-5-decisions-dirigeant" className="text-blue-ink font-semibold underline hover:text-mint-green">
              l&apos;article sur les 5 décisions de pilotage pipeline
            </Link>
            .
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Sprint 2 (Jours 31 à 60) : augmenter le taux de conversion sans pression toxique</h2>
          <p className="mb-4">
            Le deuxième sprint vise un seul objectif : transformer mieux, pas juste vendre plus fort.
            On standardise les moments clés de découverte, proposition et décision.
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Qualification renforcée (enjeu, impact, sponsor, timing)</li>
            <li>Propositions orientées décision business, pas catalogue</li>
            <li>Rituels de coaching sur les deals critiques</li>
          </ul>
          <p className="mb-6">
            Si votre sujet principal est le closing, cet approfondissement est utile :
            {' '}
            <Link href="/blog/closing-b2b-7-techniques" className="text-blue-ink font-semibold underline hover:text-mint-green">
              7 techniques de closing B2B qui fonctionnent vraiment
            </Link>
            .
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Sprint 3 (Jours 61 à 90) : installer un rythme de management durable</h2>
          <p className="mb-4">
            C&apos;est là que se joue la différence entre un “coup de fouet” et une transformation durable.
            Vous installez une cadence de pilotage qui sécurise le trimestre suivant.
          </p>
          <ul className="list-disc pl-6 mb-8">
            <li>Revue hebdo orientée arbitrage (pas reporting passif)</li>
            <li>3 KPI cœur : qualification, conversion proposition, délai de cycle</li>
            <li>Plan de couverture du pipeline à 90 jours</li>
          </ul>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Point clé dirigeant :</strong> quand vos managers tiennent un rythme simple, stable et lisible,
              la performance devient prévisible — et la pression diminue mécaniquement.
            </p>
          </div>

          {/* CTA mi-article — bootcamp */}
          <div className="bg-gradient-to-r from-mint-green/20 to-teal-50 border border-mint-green/30 rounded-2xl p-6 my-10 text-center">
            <p className="text-lg font-title font-bold text-blue-ink mb-2">
              Vous avez reconnu votre &eacute;quipe dans ces 3 &eacute;tapes&nbsp;?
            </p>
            <p className="text-sm text-gray-600 mb-4">
              La plupart des PME stagnent entre l&rsquo;&eacute;tape 1 et 2. Le
              bootcamp commercial acc&eacute;l&egrave;re cette transformation en
              8 semaines avec un coaching terrain personnalis&eacute;.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-ink text-white font-semibold text-sm rounded-full hover:bg-blue-ink/90 transition-colors shadow-sm"
            >
              D&eacute;couvrir le bootcamp
            </Link>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que vous devez viser à J+90</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>Un pipeline crédible que vous pouvez défendre en CODIR</li>
            <li>Des conversions plus régulières sur les deals stratégiques</li>
            <li>Une équipe qui exécute avec méthode, pas au talent individuel</li>
            <li>Un plan clair pour nourrir le trimestre suivant</li>
          </ul>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez installer ce système dans votre équipe ?</h3>
            <p className="mb-6">
              Le Bootcamp vous donne le cadre 90 jours, les scripts de management commercial et les rituels
              d&apos;exécution pour convertir plus régulièrement dès ce trimestre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Découvrir le Bootcamp
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Réserver un diagnostic commercial
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
