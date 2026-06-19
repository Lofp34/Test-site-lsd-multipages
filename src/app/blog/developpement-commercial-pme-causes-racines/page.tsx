import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/developpement-commercial-pme-causes-racines';
const heroImage = '/images/blog/2026-06-08-causes-racines/2026-06-08-causes-racines-hero.webp';
const heroImageAbsolute = 'https://raw.githubusercontent.com/Lofp34/Test-site-lsd-multipages/main/public/images/blog/2026-06-08-causes-racines/2026-06-08-causes-racines-hero.webp';
const carouselPrefix = '/images/blog/2026-06-08-causes-racines/carrousel';

export const metadata: Metadata = {
  title: "Développement commercial PME : pourquoi ça patine",
  description:
    "Segmenter, aligner marketing et commercial, cartographier la décision. Trois déséquilibres qui plombent le développement des PME même quand elles font tout bien. Par Laurent Serre.",
  keywords:
    "développement commercial PME, causes échec développement commercial, alignement commercial marketing, segmentation client B2B, cycle décision B2B, coaching commercial, Laurent Serre",
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-08',
  },
  openGraph: {
    title: "Pourquoi le développement commercial des PME patine (et ce qu'il faut regarder à la place)",
    description:
      'Segmenter, aligner, cartographier la décision. Les trois vrais déséquilibres qui plombent le développement commercial des PME.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: 'Développement commercial PME - les causes racines qui font patiner les équipes',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pourquoi le développement commercial des PME patine | Laurent Serre",
    description:
      'Les trois déséquilibres qui plombent le développement commercial des PME et ce qu\'il faut regarder à la place.',
    images: [heroImageAbsolute],
  },
};

export default function CausesRacinesPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: "Pourquoi le développement commercial des PME patine (et ce qu'il faut regarder à la place)",
        description:
          'Trois déséquilibres structurels qui plombent le développement commercial des PME : alignement marketing/commercial, cycle de décision B2B ignoré, segmentation insuffisante.',
        image: heroImageAbsolute,
        datePublished: '2026-06-08',
        dateModified: '2026-06-08',
        author: {
          '@type': 'Person',
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com/a-propos',
          sameAs: [
            'https://www.linkedin.com/in/laurentserre34/',
            'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
          ],
        },
        publisher: {
          '@type': 'Organization',
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.laurentserre.com/logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': articleUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre développement commercial et prospection ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le développement commercial est un système structuré qui agit sur le ciblage, les processus, les compétences et les outils pour accroître durablement le chiffre d\'affaires. La prospection n\'en est qu\'un levier. Confondre les deux est l\'erreur principale des dirigeants de PME : une équipe qui prospecte sans cadre stratégique s\'épuise sur des cibles non qualifiées.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi le développement commercial des PME patine-t-il souvent ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Parce que la plupart des PME confondent activité commerciale et développement commercial. Elles mesurent le volume d\'actions (appels, mails, rdv) sans regarder la structure : ciblage, processus, alignement marketing-vente et cartographie de la décision. Sans ces fondations, l\'équipe tourne à vide et les résultats stagnent.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les trois déséquilibres qui plombent le développement commercial ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '1) L\'alignement marketing/commercial est rompu : les contenus marketing attirent des profils que les commerciaux ne savent pas vendre. 2) Le cycle de décision B2B est ignoré : on vend à un contact comme s\'il décidait seul. 3) La segmentation est insuffisante : on traite tous les prospects de la même manière, sans adapter le discours au contexte de décision.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment aligner marketing et commercial en PME ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En construisant un ICP (Ideal Customer Profile) partagé, en définissant ensemble les critères de qualification des leads, en organisant un comité commercial mensuel où marketing et commerce confrontent leurs données, et en partageant un objectif de chiffre d\'affaires commun plutôt que des indicateurs séparés.',
            },
          },
        ],
      },
    
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Pourquoi le développement commercial des PME…', 'item': 'https://www.laurentserre.com/blog/developpement-commercial-pme-causes-racines' },
        ],
      }
],
  };

  const carouselImages = [
    { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Couverture - Pourquoi le développement commercial des PME patine', index: 0 },
    { src: `${carouselPrefix}/bd-slide-02-constat.webp`, alt: 'Le constat - on fait tout ce qu\'il faut mais ça ne décolle pas', index: 1 },
    { src: `${carouselPrefix}/bd-slide-03-symptome.webp`, alt: 'Le symptôme - ce n\'est pas un manque d\'effort, c\'est structurel', index: 2 },
    { src: `${carouselPrefix}/bd-slide-04-promesse.webp`, alt: 'Déséquilibre 1 - La promesse marketing ne tient pas dans la vente', index: 3 },
    { src: `${carouselPrefix}/bd-slide-05-cout.webp`, alt: 'Déséquilibre 1 - Le vrai coût du désalignement', index: 4 },
    { src: `${carouselPrefix}/bd-slide-06-qui-decide.webp`, alt: 'Déséquilibre 2 - Vendre à une personne qui en cache d\'autres', index: 5 },
    { src: `${carouselPrefix}/bd-slide-07-consequence.webp`, alt: 'Déséquilibre 2 - Le vrai décideur n\'était pas dans la boucle', index: 6 },
    { src: `${carouselPrefix}/bd-slide-08-tout-le-monde.webp`, alt: 'Déséquilibre 3 - Traiter tout le monde pareil', index: 7 },
    { src: `${carouselPrefix}/bd-slide-09-energie.webp`, alt: 'Déséquilibre 3 - L\'énergie perdue sur les mauvais prospects', index: 8 },
    { src: `${carouselPrefix}/bd-slide-10-ce-quil-faut.webp`, alt: 'Ce qu\'il faut regarder à la place', index: 9 },
    { src: `${carouselPrefix}/bd-slide-11-ecarts.webp`, alt: 'Les réponses sont dans les écarts', index: 10 },
    { src: `${carouselPrefix}/bd-slide-12-cta.webp`, alt: 'CTA - Commencez par un diagnostic offert', index: 11 },
  ];

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Développement commercial PME : les causes racines</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          Pourquoi le développement commercial des PME patine (et ce qu'il faut regarder à la place)
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span>8 juin 2026</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full" />
          <span>~7 min de lecture</span>
        </div>

        {/* AuthorCard */}
        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial : 15 ans de terrain PME',
            image: '/images/blog/Laurent-Serre-avatar.webp',
          }}
        />

        {/* Hero Image */}
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-10 shadow-lg">
          <Image
            src={heroImage}
            alt="Développement commercial PME - les trois questions à se poser"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {/* Article body */}
        <div className="prose prose-gray max-w-none">
          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">✨ Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              La plupart des PME qui font du développement commercial n'ont pas de vraie stratégie. Elles ont du volume, mais trois déséquilibres les plombent : un alignement marketing/commercial qui ne tient pas, un cycle de décision B2B ignoré, une segmentation insuffisante. L'article identifie ces causes racines et propose un autre regard pour en sortir.
            </p>
          </div>

          {/* Carrousel BD */}
          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link href="/blog/strategie-commerciale-pme-cadre-une-page" className="text-mint-green hover:underline font-medium">Stratégie commerciale PME : le cadre en une page</Link></li>
              <li><Link href="/blog/erreurs-developpement-commercial-pme" className="text-mint-green hover:underline font-medium">Les erreurs du développement commercial PME</Link></li>
              <li><Link href="/blog/coaching-developpement-commercial-guide-complet-pme" className="text-mint-green hover:underline font-medium">Guide complet du développement commercial</Link></li>
            </ul>
          </div>

                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : pourquoi ça patine dans votre équipe
            </p>
            <p className="text-sm text-amber-700 mb-5">
              12 planches illustrées : cliquez sur une vignette pour feuilleter la BD dans le lecteur intégré.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : pourquoi le développement commercial des PME patine"
              maxPreview={3}
            />
            <div className="mt-4 text-center">
              <Link
                href={`${carouselPrefix}/carrousel-causes-racines-developpement-commercial.pdf`}
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (12 planches)
              </Link>
            </div>
          </div>

          {/* CTA inline sous le carrousel */}
          <div className="mb-6 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vous ne savez pas par où commencer ? Faites un diagnostic commercial offert →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#constat" className="text-mint-green hover:underline">Le constat : faire tout ce qu'il faut et ne pas décoller</a></li>
              <li><a href="#desalignement" className="text-mint-green hover:underline">Le premier déséquilibre : alignement marketing/commercial</a></li>
              <li><a href="#decision" className="text-mint-green hover:underline">Le deuxième déséquilibre : le cycle de décision B2B ignoré</a></li>
              <li><a href="#segmentation" className="text-mint-green hover:underline">Le troisième déséquilibre : traiter tout le monde pareil</a></li>
              <li><a href="#regarder" className="text-mint-green hover:underline">Ce qu'il faut regarder à la place</a></li>
            </ul>
          </div>

          {/* ════════ CONSTAT ════════ */}
          <h2 id="constat" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Le constat : faire tout ce qu'il faut et ne pas décoller
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Je vois des PME qui font tout ce qu'il faut sur le papier. Un commercial dédié, un CRM paramétré, des relances planifiées, un volume de prospection régulier. Et ça ne décolle pas. Le pipeline se remplit, mais les signatures n'arrivent pas.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Quand on gratte un peu, ce n'est pas une question de mauvaise volonté ou de manque d'effort. C'est plus structurel. Il y a trois déséquilibres que je retrouve dans presque toutes les équipes qui patinent.
          </p>

          {/* ════════ DÉSÉQUILIBRE 1 ════════ */}
          <h2 id="desalignement" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Le premier déséquilibre : ce que vous vendez et ce que le marché attend
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            La plupart des PME construisent leur offre autour de ce qu'elles savent faire, pas autour de ce qui fait vraiment bouger un client aujourd'hui. Le marketing génère des leads sur une promesse. Les commerciaux vendent sur une autre. Et les deux ne se parlent pas assez pour synchroniser le message.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            R&eacute;sultat : les prospects arrivent avec une attente, repartent avec une autre proposition, et personne ne comprend pourquoi &ccedil;a ne mord pas. Ce n'est pas un probl&egrave;me de pricing ou de concurrence. C'est un probl&egrave;me de coh&eacute;rence entre la promesse et la livraison terrain.
          </p>

          {/* ════════ DÉSÉQUILIBRE 2 ════════ */}
          <h2 id="decision" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Le deuxième déséquilibre : vendre à une personne qui en cache trois autres
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Les cycles de décision B2B se sont allongés et complexifiés. Un commercial expérimenté qui ne vend qu'à son interlocuteur direct passe à côté de la moitié du chemin de vente. Aujourd'hui, derrière chaque signature, il y a une moyenne de trois à cinq personnes qui pèsent sur la décision. Certaines sont visibles, d'autres non.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Les PME qui décrochent le mieux sont celles qui ont appris à cartographier la décision avant de vendre la solution. Pas celles qui font les meilleurs démos.
          </p>

          {/* ════════ DÉSÉQUILIBRE 3 ════════ */}
          <h2 id="segmentation" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Le troisième déséquilibre : traiter tout le monde pareil
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Sans segmentation réelle, une équipe commerciale passe la moitié de son énergie sur des prospects qui n'ont ni l'urgence, ni le budget, ni le pouvoir. Et l'autre moitié sur des clients mal qualifiés qui auraient besoin d'une approche complètement différente.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Segmenter, ce n'est pas mettre des étiquettes CRM. C'est accepter qu'un prospect de 10 salariés et un groupe de 200 personnes ne s'achètent pas de la même façon, ne se vendent pas au même rythme, et ne se convainquent pas avec les mêmes arguments.
          </p>

          {/* ════════ CE QU'IL FAUT REGARDER ════════ */}
          <h2 id="regarder" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Ce qu'il faut regarder à la place
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Quand une PME plafonne sur son développement commercial, je ne regarde plus le volume d'actions. Je regarde trois choses : qui vend à qui, sur quelle promesse, et avec quelle cartographie de la décision réelle.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Souvent, les réponses sont dans les écarts entre ces trois lignes. Pas dans un plan d'actions supplémentaire.
          </p>

          {/* Bloc lié vers l'article plan d'action */}
          <div className="mt-12 p-6 bg-mint-green/5 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-blue-ink mb-2">📘 En complément</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Une fois les causes racines identifiées, la question est : par où commencer ? J'ai écrit un 
              <Link href="/blog/developpement-commercial-pme-plan-action-5-etapes" className="text-mint-green hover:underline">
                {' '}plan d'action en 5 étapes{' '}
              </Link>
              pour construire votre développement commercial pas à pas. Les deux articles se complètent : 
              le diagnostic d'abord, le plan d'exécution ensuite.
            </p>
          </div>
        </div>

        {/* CTA Bloc final */}
        <div className="mt-12 bg-gradient-to-br from-blue-ink to-blue-ink/95 text-white rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-title font-bold mb-4">
            Vous voulez un vrai diagnostic de votre développement commercial ?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Je vous propose un diagnostic offert d'une demi-journée pour identifier les causes racines qui plombent votre performance commerciale. Pas de pitch. Du terrain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-xl hover:bg-mint-green/90 transition-colors"
            >
              Prendre rendez-vous pour un diagnostic offert →
            </Link>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Découvrir le Bootcamp commercial
            </Link>
          </div>
        </div>

        {/* HubSpot Form */}
        <div className="mt-12">
          <HubSpotForm
            formId="blog-contact-form"
            title="Vous avez une question ?"
            description="Parlons de votre situation."
          />
        </div>

      </article>
    </main>
  );
}
