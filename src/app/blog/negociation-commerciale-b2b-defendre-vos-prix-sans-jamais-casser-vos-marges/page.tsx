import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

export const metadata: Metadata = {
  title: 'Négociation B2B : défendre ses prix sans jamais casser ses marges',
  description:
    '« C\'est trop cher » n\'est presque jamais une objection de prix. C\'est une objection de clarté. Découvrez pourquoi la vraie compétence est de rendre la négociation inutile.',
  keywords:
    'négociation commerciale B2B, défendre ses prix, objection prix, découverte commerciale, conviction avant prix, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/negociation-commerciale-b2b-defendre-vos-prix-sans-jamais-casser-vos-marges',
  },
  other: {
    'datePublished': '2026-05-15',
    'dateModified': '2026-05-15',
  },
  openGraph: {
    title: 'Négociation B2B : défendre ses prix sans jamais casser ses marges',
    description:
      'La vraie compétence, ce n\'est pas de bien négocier. C\'est de rendre la négociation inutile.',
    url: 'https://www.laurentserre.com/blog/negociation-commerciale-b2b-defendre-vos-prix-sans-jamais-casser-vos-marges',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-15-negociation-commerciale-b2b-hero.webp',
        width: 1264,
        height: 848,
        alt: 'Négociation B2B — la vraie compétence est de rendre la négociation inutile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Négociation B2B : défendre ses prix sans jamais casser ses marges',
    description:
      'La vraie compétence, ce n\'est pas de bien négocier. C\'est de rendre la négociation inutile.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-15-negociation-commerciale-b2b-hero.webp'],
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
        'headline': 'Négociation B2B : défendre ses prix sans jamais casser ses marges',
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
          'url': 'https://www.laurentserre.com/images/blog/2026-05-15-negociation-commerciale-b2b-hero.webp',
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
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Pourquoi « c\'est trop cher » n\'est-il pas une objection de prix ?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Parce que c\'est une objection de clarté. Le client ne voit pas assez la différence entre ce que vous apportez et ce qu\'il a aujourd\'hui. Il compare sur le seul critère visible : le montant. Le vrai travail est en amont, dans la découverte et la construction de la conviction.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Comment réduire le taux de remise sans former ses commerciaux à la négociation ?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'En travaillant la phase amont : poser le cadre dès le premier rendez-vous, faire toucher le problème du doigt, montrer ce que le client perd vraiment à attendre. Un client qui a compris ce que vous changez pour lui ne demande pas une remise, il demande comment on commence.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Quel est le vrai problème quand un commercial ne tient pas ses prix ?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Le problème n\'est pas la technique de négociation mais le travail de découverte en amont. Un commercial qui ne sait pas faire exister la valeur de sa solution avant la discussion prix se retrouve à défendre un montant, pas un investissement.',
            },
          },
        ],
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
            src="/images/blog/2026-05-15-negociation-commerciale-b2b-hero.webp"
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
          {/* TL;DR — Ce que vous allez retenir */}
          <div className="bg-mint-green/10 border border-mint-green/20 rounded-2xl p-6 mb-12">
            <p className="text-sm font-bold text-mint-green uppercase tracking-wider mb-2">
              ⚡ Ce que vous allez retenir
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-mint-green mt-1 shrink-0">✓</span>
                <span>« C&#39;est trop cher » n&#39;est presque jamais une objection de prix — c&#39;est une objection de clarté</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mint-green mt-1 shrink-0">✓</span>
                <span>Quand vous arrivez à la discussion prix, la partie est souvent déjà perdue depuis longtemps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mint-green mt-1 shrink-0">✓</span>
                <span>La vraie compétence n&#39;est pas de bien négocier — c&#39;est de rendre la négociation inutile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mint-green mt-1 shrink-0">✓</span>
                <span>Passer de 18 % à 8 % de taux de remise en travaillant la phase amont (résultat terrain)</span>
              </li>
            </ul>
          </div>

          {/* Carrousel BD — viewer interactif */}
          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link href="/blog/la-peur-du-prix-le-vrai-probleme-nest-presque-jamais-le-tarif" className="text-mint-green hover:underline font-medium">La peur du prix : le vrai problème</Link></li>
              <li><Link href="/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite" className="text-mint-green hover:underline font-medium">Gestion des objections commerciales</Link></li>
              <li><Link href="/blog/pourquoi-meme-des-commerciaux-experimentes-se-font-encore-bananer-sur-lobjection-prix" className="text-mint-green hover:underline font-medium">Pourquoi les pros se font avoir sur le prix</Link></li>
              <li><Link href="/blog/largent-nest-pas-le-probleme-cest-la-mesure-objective-de-la-valeur" className="text-mint-green hover:underline font-medium">L'argent n'est pas le problème, c'est la mesure de la valeur</Link></li>
            </ul>
          </div>

                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD — Négociation B2B
            </p>
            <p className="text-sm text-amber-700 mb-5">
              11 planches illustrées — cliquez sur une vignette pour feuilleter la BD dans le lecteur intégré.
            </p>
            <BDCarousel
              images={[
                { src: '/images/blog/carrousel-negociation-b2b/01-commercial-preparation.webp', alt: 'Le commercial prépare sa négociation comme un examen', index: 1 },
                { src: '/images/blog/carrousel-negociation-b2b/02-objection-trop-cher.webp', alt: 'Objection « c\'est trop cher »', index: 2 },
                { src: '/images/blog/carrousel-negociation-b2b/03-mur-ceder-15.webp', alt: 'Le mur — céder 15 %', index: 3 },
                { src: '/images/blog/carrousel-negociation-b2b/04-declic-laurent.webp', alt: 'Le déclic avec Laurent', index: 4 },
                { src: '/images/blog/carrousel-negociation-b2b/05-balance-mauvais-combat.webp', alt: 'La balance du mauvais combat', index: 5 },
                { src: '/images/blog/carrousel-negociation-b2b/06-clarte-pas-prix.webp', alt: 'Clarté, pas prix', index: 6 },
                { src: '/images/blog/carrousel-negociation-b2b/07-tableau-negociation-inutile.webp', alt: 'La négociation rendue inutile', index: 7 },
                { src: '/images/blog/carrousel-negociation-b2b/08-vrai-travail-decouverte.webp', alt: 'Le vrai travail : la découverte', index: 8 },
                { src: '/images/blog/carrousel-negociation-b2b/09-montrer-perte.webp', alt: 'Montrer ce que le client perd vraiment', index: 9 },
                { src: '/images/blog/carrousel-negociation-b2b/10-resultat-remise.webp', alt: 'Le résultat : taux de remise divisé', index: 10 },
                { src: '/images/blog/carrousel-negociation-b2b/11-CTA-diagnostic.webp', alt: 'CTA — demande de diagnostic', index: 11 },
              ]}
              title="Carrousel BD — Négociation B2B"
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
                href="/downloads/carrousel-negociation-b2b-016.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (11 planches)
              </a>
            </div>
          </div>

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

            <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Le vrai problème n&#39;est pas la négociation</h2>

            <p>
              Le problème n&apos;était pas sa technique. Le problème, c&apos;est qu&apos;il avait commencé à négocier bien trop tard.
            </p>

            <blockquote>
              <p>
                <strong>Quand vous arrivez à la discussion prix, la partie est déjà perdue depuis longtemps.</strong> Pas parce que vous défendez mal votre tarif. Parce que vous n&apos;avez pas assez construit la conviction avant.
              </p>
            </blockquote>

            <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">80 % d&#39;énergie sur la négociation, 20 % sur la découverte ? C&#39;est l&#39;inverse</h2>

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

            <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Un cas concret : de 18 % à 8 % de remise</h2>

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

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 mt-16">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">📖 Pour aller plus loin</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="/blog/la-peur-du-prix-le-vrai-probleme-nest-presque-jamais-le-tarif" className="text-blue-ink underline hover:text-mint-green transition-colors">
                  La peur du prix : le vrai problème n&#39;est presque jamais le tarif
                </Link>
              </li>
              <li>
                <Link href="/blog/pourquoi-meme-des-commerciaux-experimentes-se-font-encore-bananer-sur-lobjection-prix" className="text-blue-ink underline hover:text-mint-green transition-colors">
                  Pourquoi des commerciaux expérimentés se font encore avoir sur l&#39;objection prix
                </Link>
              </li>
              <li>
                <Link href="/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite" className="text-blue-ink underline hover:text-mint-green transition-colors">
                  Gestion des objections : transformer le non en opportunité
                </Link>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-4 border-t border-blue-ink/10 pt-3">
              Source externe : <a href="https://hbr.org/topic/subject/pricing-strategy" target="_blank" rel="noopener noreferrer" className="underline hover:text-mint-green">Pricing Strategy — Harvard Business Review</a>
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
