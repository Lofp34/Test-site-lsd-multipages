import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import BDCarousel from '@/components/BDCarousel';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'BD — Fixer des objectifs efficaces : les fondamentaux de la vente | Laurent Serre',
  description:
    'Une bande dessinée qui résume les fondamentaux pour fixer des objectifs commerciaux qui motivent vraiment vos équipes. 11 planches illustrées par Laurent Serre.',
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/bandes-dessinees',
  },
  openGraph: {
    title: 'BD — Fixer des objectifs efficaces en vente',
    description:
      '11 planches de BD pour comprendre comment fixer des objectifs commerciaux qui marchent.',
    url: 'https://www.laurentserre.com/ressources/bandes-dessinees',
    type: 'website',
    locale: 'fr_FR',
    images: ['https://www.laurentserre.com/images/bandes-dessinees/objectifs/planche-01.webp'],
  },
};

const planches = Array.from({ length: 11 }, (_, i) => ({
  src: `/images/bandes-dessinees/objectifs/planche-${(i + 1).toString().padStart(2, '0')}.webp`,
  alt: `Planche ${i + 1} — Fixer des objectifs efficaces`,
  index: i,
}));

export default function BDPage() {
  return (
    <main className="bg-primary-bg text-gray-dark min-h-screen">
      {/* Header */}
      <section className="py-24 sm:py-32 pb-14 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">🎨 Bande dessinée</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Fixer des objectifs efficaces
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Les fondamentaux de la vente en BD — une série pour retenir l&apos;essentiel en un coup d&apos;œil.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <span>11 planches</span>
              <span>•</span>
              <Link href="/ressources" className="text-mint-green hover:underline">Ressources</Link>
            </div>

            {/* Download PDF */}
            <a
              href="/images/bandes-dessinees/objectifs/fixer-objectifs-efficaces-bd.pdf"
              download
              className="inline-flex items-center gap-2 bg-blue-ink text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-ink/90 transition-colors"
            >
              📥 Télécharger les 11 planches en PDF
            </a>
          </div>
        </div>
      </section>

      {/* BD Gallery */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <BDCarousel images={planches} title="Fixer des objectifs efficaces" />

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Vous voulez approfondir ? L&apos;article détaillé reprend chaque point de la BD
            avec des exemples concrets, la méthode SMART revisitée et des cas terrain.
          </p>
          <Link
            href="/blog/objectifs-commerciaux-comment-en-fixer-qui-motivent-vraiment-vos-equipes"
            className="inline-flex items-center gap-2 bg-mint-green text-blue-ink px-6 py-3 rounded-xl font-semibold hover:bg-mint-green/90 transition-colors"
          >
            📖 Lire l&apos;article complet sur les objectifs
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Publié à l&apos;origine sur{' '}
            <a
              href="https://www.linkedin.com/posts/laurentserre34_fixer-des-objectifs-efficaces-activity-7458159290504089600-7RjK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mint-green hover:underline"
            >
              LinkedIn
            </a>
            {' '}· Tous droits réservés Laurent Serre
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <p className="text-center text-gray-600 mb-8">
            Une question sur la fixation d&apos;objectifs ou le pilotage d&apos;équipe commerciale ?
          </p>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
