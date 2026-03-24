import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

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
        url: 'https://www.laurentserre.com/images/blog/2026-03-24-systeme-90-jours-hero.png',
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
    images: ['https://www.laurentserre.com/images/blog/2026-03-24-systeme-90-jours-hero.png'],
  },
};

export default function Systeme90JoursPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">Exécution commerciale</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Système commercial 90 jours : le plan anti yo-yo du chiffre d&apos;affaires
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-03-24">24 mars 2026</time>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-03-24-systeme-90-jours-hero.png"
              alt="Système commercial 90 jours pour sécuriser le chiffre d'affaires"
              width={1600}
              height={900}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={72}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Beaucoup d&apos;entreprises ont un problème qu&apos;elles n&apos;osent pas nommer : un chiffre d&apos;affaires en dents de scie.
            Un mois très fort, un mois trop faible, puis une pression qui remonte partout. Ce n&apos;est pas un problème de motivation.
            C&apos;est un problème de système.
          </p>

          <p className="mb-8">
            Si vous êtes dirigeant, DG ou directeur commercial, votre priorité n&apos;est pas de “faire plus”.
            Votre priorité est de <strong>mettre votre machine commerciale sous contrôle</strong>.
            Voici le cadre 90 jours que j&apos;utilise pour stabiliser la performance sans épuiser les équipes.
          </p>

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
