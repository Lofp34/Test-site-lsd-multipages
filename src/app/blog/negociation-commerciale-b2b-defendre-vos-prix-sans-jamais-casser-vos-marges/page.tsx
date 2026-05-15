import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Négociation commerciale B2B : défendre ses prix sans jamais casser ses marges | Laurent Serre',
  description:
    'J\'ai passé des années à apprendre à négocier. Puis j\'ai compris que je me trompais de combat. « C\'est trop cher » n\'est presque jamais une objection de prix. C\'est une objection de clarté.',
  keywords:
    'négociation commerciale B2B, défendre ses prix, objection prix, découverte commerciale, conviction avant prix, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/negociation-commerciale-b2b-defendre-vos-prix-sans-jamais-casser-vos-marges',
  },
  other: {
    'dateModified': '2026-05-15',
  },
  openGraph: {
    title: 'Négociation commerciale B2B : défendre ses prix sans jamais casser ses marges',
    description:
      'La vraie compétence, ce n\'est pas de bien négocier. C\'est de rendre la négociation inutile.',
    url: 'https://www.laurentserre.com/blog/negociation-commerciale-b2b-defendre-vos-prix-sans-jamais-casser-vos-marges',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-15-negociation-commerciale-b2b-hero.png',
        width: 1264,
        height: 848,
        alt: 'Négociation B2B — la vraie compétence est de rendre la négociation inutile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Négociation commerciale B2B : défendre ses prix sans jamais casser ses marges | Laurent Serre',
    description:
      'La vraie compétence, ce n\'est pas de bien négocier. C\'est de rendre la négociation inutile.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-15-negociation-commerciale-b2b-hero.png'],
  },
};

export default function ArticlePage() {
  const articleUrl = 'https://www.laurentserre.com/blog/negociation-commerciale-b2b-defendre-vos-prix-sans-jamais-casser-vos-marges';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${articleUrl}#article`,
        'headline': 'Négociation commerciale B2B : défendre ses prix sans jamais casser ses marges',
        'description':
          'La vraie compétence, ce n\'est pas de bien négocier. C\'est de rendre la négociation inutile.',
        'datePublished': '2026-05-15',
        'dateModified': '2026-05-15',
        'author': {
          '@type': 'Person',
          'name': 'Laurent Serre',
          'url': 'https://www.laurentserre.com',
        },
        'image': {
          '@type': 'ImageObject',
          'url': 'https://www.laurentserre.com/images/blog/2026-05-15-negociation-commerciale-b2b-hero.png',
          'width': 1264,
          'height': 848,
        },
        'publisher': {
          '@type': 'Person',
          'name': 'Laurent Serre',
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Négociation B2B', 'item': articleUrl },
        ],
      },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/2026-05-15-negociation-commerciale-b2b-hero.png"
            alt="Négociation B2B — la vraie compétence est de rendre la négociation inutile"
            fill
            className="object-cover object-top brightness-[0.3]"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-mint-green text-white">
              Négociation commerciale
            </span>
            <span className="text-white/60 text-sm">• 15 mai 2026</span>
            <span className="text-white/60 text-sm">• 4 min</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold mb-6 leading-tight">
            J&apos;ai passé des années à apprendre à négocier.<br />Puis j&apos;ai compris que je me trompais de combat.
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            « C&apos;est trop cher » n&apos;est presque jamais une objection de prix.<br />
            C&apos;est une objection de clarté.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p>
              Je me souviens d&apos;un commercial que j&apos;accompagnais. Il préparait ses entretiens de négociation comme un examen. Prix plancher, arguments de valeur, contreparties possibles, objections anticipées. Il avait tout prévu.
            </p>

            <p>
              Le client lui a dit « c&apos;est trop cher ». Il a sorti son recadrage valeur. Le client a écouté poliment. Puis il a reposé la même question.
            </p>

            <p>
              Ce commercial a fini par céder 15 %, comme la fois d&apos;avant.
            </p>

            <p>
              Le problème n&apos;était pas sa technique. Le problème, c&apos;est qu&apos;il avait commencé à négocier bien trop tard.
            </p>

            <blockquote>
              <p>
                <strong>Quand vous arrivez à la discussion prix, la partie est déjà perdue depuis longtemps.</strong> Pas parce que vous défendez mal votre tarif. Parce que vous n&apos;avez pas assez construit la conviction avant.
              </p>
            </blockquote>

            <p>
              Je vois des équipes qui passent 80 % de leur énergie à préparer la négociation et 20 % à préparer la découverte. C&apos;est l&apos;inverse qu&apos;il faudrait. Un client qui a vraiment compris ce que vous changez pour lui ne demande pas une remise. Il demande comment on commence.
            </p>

            <p>
              « C&apos;est trop cher » n&apos;est presque jamais une objection de prix. C&apos;est une objection de clarté. Le client ne voit pas assez la différence entre ce que vous apportez et ce qu&apos;il a aujourd&apos;hui. Alors il compare sur le seul critère visible : le montant.
            </p>

            <blockquote>
              <p>
                <strong>La vraie compétence, ce n&apos;est pas de bien négocier. C&apos;est de rendre la négociation inutile.</strong>
              </p>
            </blockquote>

            <p>
              Un dirigeant de PME me disait récemment : « Mes commerciaux ne savent pas tenir un prix. » Je lui ai répondu : « Vos commerciaux ne savent pas le faire exister avant. »
            </p>

            <p>
              On a travaillé la phase amont. Pas les scripts de négociation. La manière de poser le cadre dès le premier rendez-vous, de faire toucher le problème du doigt, de montrer ce que le client perd vraiment à attendre. En trois mois, le taux de remise est passé de 18 % à 8 %. Pas parce qu&apos;ils étaient devenus de meilleurs négociateurs. Parce qu&apos;ils n&apos;avaient presque plus besoin de négocier.
            </p>

            <p>
              La négociation, c&apos;est le symptôme. Le vrai travail est en amont.
            </p>

            <p>
              Alors avant de préparer votre prochain argumentaire prix, posez-vous cette question : est-ce que mon client a vraiment compris ce qu&apos;il perd à ne pas travailler avec moi ? Si la réponse est non, vous n&apos;avez pas un problème de prix. Vous avez un problème de découverte.
            </p>

            <p>
              Et ça, aucun barème de concession ne le rattrapera.
            </p>
          </div>

          {/* Author + CTA */}
          <div className="mt-16 border-t border-gray-200 pt-12">
            <AuthorCard />
          </div>

          <div className="mt-12 p-8 bg-primary-bg rounded-2xl text-center">
            <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
              Vous sentez que vos équipes perdent du temps et des marges en négociation ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Le problème n&apos;est probablement pas là où vous le cherchez. Un diagnostic gratuit de votre cycle de vente peut révéler où se perd vraiment la conviction.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-8 py-3 bg-mint-green text-white rounded-full font-semibold hover:bg-mint-green/90 transition-colors"
            >
              Demander un diagnostic gratuit
            </Link>
          </div>
        </div>
      </article>

      {/* Newsletter */}
      <section className="py-16 bg-primary-bg">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </main>
  );
}
