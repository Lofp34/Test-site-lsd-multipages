import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const heroImage = '/images/blog/reactif-anticipatif-plan-commercial-pme-2026/reactif-anticipatif-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/reactif-anticipatif-plan-commercial-pme-2026/reactif-anticipatif-hero.webp';

export const metadata: Metadata = {
  title: 'Re\\u0301actif vs Anticipatif — Plan commercial PME 2026',
  description:
    "La plupart des dirigeants PME ge\\u0300rent leur de\\u0301veloppement commercial en re\\u0301action : un mois creux = panique, un mois de boom = goulet d'e\\u0301tranglement. Voici un plan commercial a\\u0300 3 horizons pour anticiper les fluctuations.",
  keywords:
    'plan commercial anticipatif PME, gestion anticipative développement commercial, pilotage commercial anticipatif, indicateurs alerte précoce vente, rituels pilotage commercial, plan commercial 3 horizons, développement commercial PME 2026',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/reactif-anticipatif-plan-commercial-pme-2026',
  },
  openGraph: {
    title: 'Réactif vs Anticipatif — Comment arrêter de gérer votre développement commercial en mode pompier',
    description:
      "La plupart des dirigeants PME gèrent leur développement commercial en réaction. Un plan commercial à 3 horizons change la donne. Indicateurs d'alerte précoce et rituels de pilotage inclus.",
    url: 'https://www.laurentserre.com/blog/reactif-anticipatif-plan-commercial-pme-2026',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: "Illustration plan commercial anticipatif PME - Laurent Serre",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Réactif vs Anticipatif — Comment arrêter de gérer votre développement commercial en mode pompier',
    description:
      "Un plan commercial à 3 horizons pour anticiper les fluctuations de votre CA. Indicateurs d'alerte précoce et rituels de pilotage inclus.",
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/carrousel-reactif-anticipatif';

const carouselImages = [
  { src: `${carouselPrefix}/01-cover.webp`, alt: 'Cover : Réactif vs Anticipatif', index: 0 },
  { src: `${carouselPrefix}/02-constat.webp`, alt: 'Constat : le tableau de bord en yoyo', index: 1 },
  { src: `${carouselPrefix}/03-piege-reductif.webp`, alt: 'Le piège du réactif : on brade', index: 2 },
  { src: `${carouselPrefix}/04-boom-coince.webp`, alt: 'Le boom qui coince : deals ratés', index: 3 },
  { src: `${carouselPrefix}/05-diagnostic.webp`, alt: 'Laurent pose le diagnostic', index: 4 },
  { src: `${carouselPrefix}/06-horizon1.webp`, alt: 'Horizon 1 : le pipeline 30 jours', index: 5 },
  { src: `${carouselPrefix}/07-indicateurs.webp`, alt: 'Les indicateurs d\'alerte en action', index: 6 },
  { src: `${carouselPrefix}/08-horizon2.webp`, alt: 'Horizon 2 : la marge 6-12 mois', index: 7 },
  { src: `${carouselPrefix}/09-horizon3.webp`, alt: 'Horizon 3 : l\'équipe 18+ mois', index: 8 },
  { src: `${carouselPrefix}/10-rituel-hebdo.webp`, alt: 'Rituel hebdo : 30 minutes de pilotage', index: 9 },
  { src: `${carouselPrefix}/11-rituel-mensuel.webp`, alt: 'Rituel mensuel : la revue de portefeuille', index: 10 },
  { src: `${carouselPrefix}/12-deploiement.webp`, alt: 'Déploiement en 4 semaines', index: 11 },
  { src: `${carouselPrefix}/13-cta.webp`, alt: 'CTA : Diagnostic offert sur laurentserre.com', index: 12 },
];

export default function ReactifAnticipatifPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Réactif vs Anticipatif — Comment arrêter de gérer votre développement commercial en mode pompier',
    description:
      "Un plan commercial à 3 horizons pour anticiper les fluctuations de votre CA. Indicateurs d'alerte précoce et rituels de pilotage pour les dirigeants PME.",
    image: heroImageAbsolute,
    datePublished: '2026-06-23',
    dateModified: '2026-06-23',
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
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.laurentserre.com/blog/reactif-anticipatif-plan-commercial-pme-2026',
    },
    articleSection: 'Performance commerciale / Gestion du développement commercial',
    keywords: [
      'plan commercial anticipatif PME',
      'gestion anticipative développement commercial',
      'pilotage commercial anticipatif',
      'indicateurs alerte précoce vente',
      'rituels pilotage commercial',
      'développement commercial PME',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Qu'est-ce qu'un plan commercial anticipatif ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Un plan commercial anticipatif est un cadre de pilotage qui organise le développement commercial sur trois horizons temporels : le pipeline court terme (30 jours), la marge moyen terme (6 à 12 mois) et l'équipe long terme (18 mois et plus). Il repose sur des indicateurs d'alerte précoce plutôt que sur la simple lecture du chiffre du mois.",
        },
      },
      {
        '@type': 'Question',
        name: "Comment passer d'une gestion réactive à anticipative ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "En mettant en place trois choses : un rituel hebdomadaire de 30 minutes sur les indicateurs d'alerte du pipeline, un rituel mensuel d'1 heure sur le portefeuille clients et la marge, et un plan de recrutement ou de développement des compétences sur 18 à 24 mois. Le déploiement se fait en 4 semaines.",
        },
      },
      {
        '@type': 'Question',
        name: "Quels sont les indicateurs d'alerte en développement commercial ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Les trois indicateurs d'alerte précoce : le nombre d'opportunités en phase de qualification (trop peu de deals entrants), le taux de transformation entre les étapes (un décrochage révèle un problème de méthode ou de priorité), et l'âge moyen des opportunités (des deals qui vieillissent sont des deals qui ne se décideront pas).",
        },
      },
      {
        '@type': 'Question',
        name: "Comment construire un plan commercial à 3 horizons ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Horizon 1 (30 jours) : suivre le pipeline en temps réel avec les indicateurs d'alerte. Horizon 2 (6 à 12 mois) : segmenter vos clients par rentabilité, pas seulement par CA. Horizon 3 (18+ mois) : planifier vos recrutements et vos compétences en function des tendances, pas des urgences du moment.",
        },
      },
      {
        '@type': 'Question',
        name: "Pourquoi les dirigeants PME restent-ils en mode réactif ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Parce que le réactif donne l'illusion de l'action. Un mois de creux, on lance une promo. Un mois de boom, on recrute en urgence. Ça occupe, ça rassure, mais ça ne construit rien. Le passage à l'anticipatif demande de la discipline et un cadre : la plupart des dirigeants n'ont ni l'un ni l'autre parce qu'ils n'ont jamais formalisé leur plan de pilotage commercial.",
        },
      },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com/' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
              { '@type': 'ListItem', position: 3, name: 'Réactif vs Anticipatif', item: 'https://www.laurentserre.com/blog/reactif-anticipatif-plan-commercial-pme-2026' },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Réactif vs Anticipatif</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Performance commerciale / Gestion du développement commercial</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Réactif vs Anticipatif — Comment arrêter de gérer votre développement commercial en mode pompier
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-06-23">23 juin 2026</time>
              <span>•</span>
              <span>8 min de lecture</span>
            </div>
          </div>

          <div className="mb-8">
            <AuthorCard />
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Plan commercial anticipatif PME - illustration Laurent Serre"
              width={1536}
              height={1024}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={78}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              La gestion réactive de votre développement commercial vous coûte des marges et de l'énergie. Un mois de creux : vous bradez. Un mois de boom : vous manquez de monde et vous ratez des deals. Ce cycle s'arrête avec un plan commercial à 3 horizons, des indicateurs d'alerte précoce, et des rituels de pilotage hebdomadaires et mensuels. Voici comment le construire en 4 semaines sans perturber votre activité.
            </p>
          </div>

          {/* Carrousel BD — accroche visuelle */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Réactif vs Anticipatif en action
            </p>
            <p className="text-sm text-amber-700 mb-5">
              13 planches illustrées du constat à la solution, en passant par les 3 horizons.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Plan commercial anticipatif"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-reactif-anticipatif.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (13 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA diagnostic */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vous ne savez pas par où commencer pour passer en mode anticipatif ? Faites un diagnostic offert →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#pourquoi-reactif" className="text-mint-green hover:underline">Pourquoi 90% des dirigeants PME restent en mode réactif (et comment en sortir)</a></li>
              <li><a href="#horizon-1" className="text-mint-green hover:underline">Horizon 1 : le pipeline court terme (30 jours)</a></li>
              <li><a href="#horizon-2" className="text-mint-green hover:underline">Horizon 2 : la marge moyen terme (6 à 12 mois)</a></li>
              <li><a href="#horizon-3" className="text-mint-green hover:underline">Horizon 3 : l'équipe long terme (18+ mois)</a></li>
              <li><a href="#rituels" className="text-mint-green hover:underline">Les 7 rituels de pilotage : hebdo + mensuel</a></li>
              <li><a href="#deploiement" className="text-mint-green hover:underline">Comment déployer ce plan en 4 semaines</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">FAQ Plan commercial anticipatif</a></li>
            </ul>
          </div>

          {/* Introduction */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Il y a deux semaines, je suis dans le bureau de Marc, dirigeant d'une PME de 35 personnes. Il sort son tableau de bord du mois.
          </p>

          <p className="mb-8">
            « En janvier, on a fait 80 000 euros. En février, 42 000. En mars, 95 000. En avril, 38 000. »
          </p>

          <p className="mb-8">
            Il me regarde. « Franchement, Laurent, je ne sais jamais à quoi m'attendre le mois prochain. »
          </p>

          <p className="mb-8">
            Marc n'est pas un mauvais dirigeant. Il est juste dans le pilotage à l'humeur. Quand le CA monte, il embauche dans l'urgence. Quand ça baisse, il serre les freins, il brade, il presse ses commerciaux de signer n'importe quoi, n'importe comment.
          </p>

          <p className="mb-8">
            Je lui dis : « Tu ne peux pas piloter le développement commercial d'une PME en regardant le rétroviseur tous les 30 jours. »
          </p>

          <p className="mb-8">
            Le problème de Marc, c'est celui de 9 dirigeants sur 10 que je rencontre. Ils n'ont pas de cadre anticipatif. Ils gèrent les conséquences au lieu de piloter les causes.
          </p>

          {/* H2 : Pourquoi 90% des dirigeants PME restent en mode reactif */}
          <h2 id="pourquoi-reactif" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi 90% des dirigeants PME restent en mode réactif (et comment en sortir)</h2>

          <p className="mb-8">
            Le mode réactif a un avantage pervers : il donne l'impression d'agir. Un mois de creux, on lance une opération commerciale. On appelle les clients dormants. On baisse les prix. On recrute en catastrophe. Ça occupe, ça rassure, ça fait manager.
          </p>

          <p className="mb-8">
            Mais concrètement, qu'est-ce qui s'est construit ? Rien. Le mois suivant, le cycle recommence.
          </p>

          <p className="mb-8">
            Je vois trois mécanismes qui maintiennent les dirigeants dans ce mode :
          </p>

          <p className="mb-4 font-semibold text-blue-ink">1. L'absence de visibilité au-delà de 30 jours.</p>
          <p className="mb-8">
            La plupart des dirigeants que j'accompagne connaissent leur chiffre du mois. Beaucoup connaissent leur pipeline. Presque aucun ne connaît la rentabilité par client, par segment, par typologie d'affaire. Sans cette donnée, impossible d'anticiper : on pilote les volumes, pas la performance réelle.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">2. La confusion entre activité et pilotage.</p>
          <p className="mb-8">
            Faire 50 appels par jour, c'est de l'activité. Suivre un taux de transformation, c'est du pilotage. La plupart des équipes commerciales PME mesurent l'activité. Très peu mesurent ce qui transforme. Résultat : on est très occupé, mais on n'avance pas sur les leviers qui comptent.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">3. La peur de ralentir pour structurer.</p>
          <p className="mb-8">
            « Si je m'arrête pour mettre en place des indicateurs, je perds du chiffre. » C'est ce qu'on m'a dit des dizaines de fois. La vérité, c'est l'inverse : le temps qu'on croit perdre à structurer est du temps qu'on gagne sur les décisions erronées, les recrutements ratés, les remises inutiles.
          </p>

          <p className="mb-8">
            Le passage à l'anticipatif ne demande pas un mois de travaux. Il demande 4 semaines pour installer des rituels qui, ensuite, tournent tous seuls.
          </p>

          {/* H2 : Horizon 1 */}
          <h2 id="horizon-1" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Horizon 1 : le pipeline court terme (30 jours)</h2>

          <p className="mb-8">
            Le premier horizon, c'est le plus évident. C'est celui que tout le monde regarde : le pipeline des 30 prochains jours. Sauf que la plupart des équipes le regardent mal.
          </p>

          <p className="mb-8">
            Un pipeline à 30 jours ne sert pas à prévoir le chiffre exact du mois prochain. Il sert à détecter les signaux faibles suffisamment tôt pour agir.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Les 3 indicateurs d'alerte à suivre</p>

          <p className="mb-4 font-semibold text-blue-ink">Indicateur 1 : le nombre d'opportunités en phase de qualification.</p>
          <p className="mb-8">
            Combien de deals sont entrés dans le pipeline cette semaine ? Si le chiffre baisse deux semaines de suite, vous avez un problème de génération de leads ou de qualification. Pas besoin d'attendre la fin du mois pour le voir.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Indicateur 2 : le taux de transformation entre les étapes.</p>
          <p className="mb-8">
            Combien de rendez-vous deviennent des devis ? Combien de devis deviennent des signatures ? Si un taux décroche, il révèle soit un problème de méthode (les commerciaux ne vendent pas assez bien l'étape), soit un problème de priorité (ils qualifient mal en amont).
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Indicateur 3 : l'âge moyen des opportunités.</p>
          <p className="mb-8">
            Un deal qui traîne depuis 4 mois n'est pas un deal prometteur. C'est un deal que personne n'a eu le courage de sortir du pipe. Un bon indicateur d'alerte, c'est le nombre d'opportunités de plus de 90 jours dans le pipeline. Si ce nombre augmente, vos commerciaux entretiennent des illusions au lieu de qualifier.
          </p>

          <p className="mb-8">
            Ces trois indicateurs se lisent en 5 minutes. Pas besoin de CRM sophistiqué. Un tableur partagé mis à jour chaque vendredi suffit pour commencer.
          </p>

          {/* H2 : Horizon 2 */}
          <h2 id="horizon-2" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Horizon 2 : la marge moyen terme (6 à 12 mois)</h2>

          <p className="mb-8">
            Le deuxième horizon est celui que la plupart des dirigeants PME ne regardent pas. Ils regardent le CA. Mais le CA ne dit rien sur la santé réelle de l'entreprise.
          </p>

          <p className="mb-8">
            Un client qui vous rapporte 100 000 euros par an mais qui vous coûte 80 000 euros en service après-vente, en remises, en gestion d'impayés, ce n'est pas un bon client. C'est un client qui pompe votre énergie et votre trésorerie.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Segmenter par rentabilité, pas par chiffre</p>
          <p className="mb-8">
            Le premier travail sur l'horizon 2, c'est de segmenter votre portefeuille clients par rentabilité réelle, pas par CA. Je vois trop de PME chouchouter des clients historiques qui ne sont plus rentables depuis deux ans, parce que personne n'a pris le temps de calculer le vrai coût de service.
          </p>

          <p className="mb-8">
            Une segmentation simple en trois catégories suffit :
          </p>

          <p className="mb-4 font-semibold text-blue-ink">A. Les clients rentables et stratégiques.</p>
          <p className="mb-8">
            Ceux sur lesquels vous devez concentrer vos efforts de développement : upsell, referral, prescription.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">B. Les clients rentables mais non stratégiques.</p>
          <p className="mb-8">
            Ceux qui rapportent de l'argent sans nécessiter d'attention particulière. À maintenir en pilotage automatique.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">C. Les clients non rentables.</p>
          <p className="mb-8">
            Deux options : renégocier les conditions (prix, volume, service) ou les laisser partir. Un client qui vous coûte plus qu'il ne rapporte n'est pas un client. C'est une charge déguisée en chiffre d'affaires.
          </p>

          <p className="mb-8">
            Ce travail de segmentation se fait en une après-midi. Il change radicalement la manière dont vous allouez vos ressources commerciales sur les 6 à 12 mois qui viennent.
          </p>

          {/* Mid-article CTA */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Vous voulez construire votre plan commercial à 3 horizons ?
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp commercial intensif de Laurent Serre vous accompagne pas à pas pour structurer votre pilotage, vos indicateurs et vos rituels.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/diagnostic"
                className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
              >
                Faire un diagnostic offert →
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center gap-2 text-teal-600 text-sm font-medium px-5 py-2.5 hover:bg-teal-50 rounded-full transition-colors"
              >
                Découvrir le Bootcamp →
              </Link>
            </div>
          </div>

          {/* H2 : Horizon 3 */}
          <h2 id="horizon-3" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Horizon 3 : l'équipe long terme (18+ mois)</h2>

          <p className="mb-8">
            Le troisième horizon est celui qu'on remet toujours au lendemain. Parce qu'il ne produit pas d'effet immédiat.
          </p>

          <p className="mb-8">
            Je vois des dirigeants recruter des commerciaux en trois jours parce qu'un client a signé un gros contrat et qu'il faut quelqu'un pour le suivre. Résultat : ils recrutent le premier CV passable, l'intègrent en une semaine, et se demandent pourquoi le nouveau ne tient pas la route six mois plus tard.
          </p>

          <p className="mb-8">
            L'horizon 3, c'est le plan de recrutement et de développement des compétences sur 18 à 24 mois. Ce n'est pas une liste de postes à pourvoir. C'est une projection : quelles compétences commerciales allez-vous avoir besoin dans 18 mois ? Quels profils ? Quelle charge ?
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Ce que ça change concrètement</p>

          <p className="mb-8">
            Au lieu de recruter en urgence un commercial pour remplacer un départ, vous anticipez. Vous savez que dans 12 mois, votre commercial le plus ancien part à la retraite. Vous avez déjà rencontré trois candidats. Vous avez un process d'intégration rodé. Le nouveau est opérationnel le jour du départ.
          </p>

          <p className="mb-8">
            Au lieu de former dans la panique parce que votre taux de transformation s'effondre, vous avez programmé des ateliers de mise en situation tous les deux mois. Quand le taux baisse, ce n'est pas une crise. C'est un ajustement.
          </p>

          <p className="mb-8">
            L'horizon 3, c'est la différence entre une équipe qui subit son développement et une équipe qui le construit.
          </p>

          {/* H2 : Les 7 rituels de pilotage */}
          <h2 id="rituels" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les 7 rituels de pilotage : hebdo (30 min) + mensuel (1 heure)</h2>

          <p className="mb-8">
            Un plan commercial sans rituel de pilotage, c'est une carte qu'on range dans le tiroir. Voici les 7 rituels que je mets en place systématiquement avec les équipes que j'accompagne.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Rituels hebdomadaires (30 minutes)</p>

          <p className="mb-4 font-semibold text-blue-ink">1. Le point pipeline du lundi matin (10 min).</p>
          <p className="mb-8">
            Chaque commercial passe en revue ses 5 deals les plus importants de la semaine. Pas son pipeline entier. Les 5 où il doit faire avancer la décision cette semaine. Le manager note les blocages et les actions de déblocage.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">2. Les indicateurs d'alerte (5 min).</p>
          <p className="mb-8">
            Le responsable lit les trois indicateurs : nouvelles opportunités en qualification, taux de transformation, âge moyen des deals. Si un indicateur est dans le rouge, on décide une action corrective immédiate.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">3. Le débrief d'un rendez-vous marquant (15 min).</p>
          <p className="mb-8">
            Un commercial raconte un rendez-vous récent, réussi ou raté. L'équipe commente, propose, apprend. Pas de jugement. Juste de l'analyse terrain.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Rituels mensuels (1 heure)</p>

          <p className="mb-4 font-semibold text-blue-ink">4. La revue de portefeuille.</p>
          <p className="mb-8">
            Une fois par mois, le dirigeant et son DirCo passent en revue le portefeuille clients. Pas les deals, les clients. Qui est en catégorie A (rentable et stratégique) ? Qu'avons-nous fait pour les développer ce mois-ci ? Qui est en catégorie C ? Avons-nous renégocié ou laissé partir ?
          </p>

          <p className="mb-4 font-semibold text-blue-ink">5. La vérification de la marge.</p>
          <p className="mb-8">
            Combien de remises ont été accordées ce mois-ci ? Sur quels segments ? Avec quel impact sur la marge ? Si les remises augmentent, c'est un signal que les commerciaux cèdent trop vite sur le prix. Une heure pour le corriger vaut mieux qu'un trimestre de marges érodées.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">6. Le point sur le plan de recrutement.</p>
          <p className="mb-8">
            Où en est le recrutement prévu pour les 18 prochains mois ? A-t-on avancé sur les profils identifiés ? Les formations programmées ? C'est le rituel qu'on oublie le plus souvent, parce qu'il n'y a pas d'urgence immédiate. C'est pour ça qu'il doit être dans le calendrier.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">7. La décision d'arrêt ou de poursuite.</p>
          <p className="mb-8">
            Le rituel le plus important : regarder les deals qui traînent depuis plus de 90 jours et décider collectivement. On continue d'investir du temps, ou on sort du pipe ? Ce rituel force l'honnêteté. Il empêche les illusions collectives.
          </p>

          <p className="mb-8">
            Sept rituels. 30 minutes par semaine, 1 heure par mois. Ça représente moins de 1% du temps de travail. Et ça change tout.
          </p>

          {/* H2 : Deploiement 4 semaines */}
          <h2 id="deploiement" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Comment déployer ce plan en 4 semaines sans perturber votre activité</h2>

          <p className="mb-8">
            Le piège, ce serait de vouloir tout mettre en place en même temps. Ça ne marche pas. Voici le calendrier que j'utilise avec les équipes que j'accompagne.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Semaine 1 : posez les fondations.</p>
          <p className="mb-8">
            Une demi-journée avec le dirigeant et le DirCo pour définir les 3 horizons, les indicateurs, et le format des rituels. On ne touche pas à l'équipe cette semaine. On construit le cadre.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Semaine 2 : préparez l'équipe.</p>
          <p className="mb-8">
            Une réunion d'1h30 avec l'équipe commerciale pour présenter le nouveau cadre. Pas de grande annonce. On leur explique pourquoi, on leur montre les indicateurs, on leur demande ce qu'ils en pensent. Le cadre est ajusté avec leurs retours.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Semaine 3 : lancez les rituels.</p>
          <p className="mb-8">
            Premier rituel hebdo le lundi. Premier rituel mensuel en fin de semaine. On accepte que ce soit imparfait. L'important, c'est que ça tourne.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Semaine 4 : ajustez et stabilisez.</p>
          <p className="mb-8">
            On fait le bilan des 3 premières semaines. Qu'est-ce qui a fonctionné ? Qu'est-ce qui bloque ? On ajuste les indicateurs si besoin. On corrige le format des rituels. Et ensuite, on tient.
          </p>

          <p className="mb-8">
            En 4 semaines, le cadre est en place. En 3 mois, il est dans les habitudes. En 6 mois, il fait gagner du temps, de la marge et de la sérénité.
          </p>

          {/* FAQ */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">FAQ Plan commercial anticipatif</h2>

          <div className="space-y-6 mb-8">
            <div>
              <p className="font-semibold text-blue-ink mb-1">Qu'est-ce qu'un plan commercial anticipatif ?</p>
              <p className="text-gray-700">Un plan commercial anticipatif est un cadre de pilotage qui organise le développement commercial sur trois horizons temporels : le pipeline court terme (30 jours), la marge moyen terme (6 à 12 mois) et l'équipe long terme (18 mois et plus). Il repose sur des indicateurs d'alerte précoce plutôt que sur la simple lecture du chiffre du mois.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Comment passer d'une gestion réactive à anticipative ?</p>
              <p className="text-gray-700">En mettant en place trois choses : un rituel hebdomadaire de 30 minutes sur les indicateurs d'alerte du pipeline, un rituel mensuel d'1 heure sur le portefeuille clients et la marge, et un plan de recrutement ou de développement des compétences sur 18 à 24 mois. Le déploiement se fait en 4 semaines.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Quels sont les indicateurs d'alerte en développement commercial ?</p>
              <p className="text-gray-700">Les trois indicateurs d'alerte précoce : le nombre d'opportunités en phase de qualification (trop peu de deals entrants), le taux de transformation entre les étapes (un décrochage révèle un problème de méthode ou de priorité), et l'âge moyen des opportunités (des deals qui vieillissent sont des deals qui ne se décideront pas).</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Comment construire un plan commercial à 3 horizons ?</p>
              <p className="text-gray-700">Horizon 1 (30 jours) : suivre le pipeline en temps réel avec les indicateurs d'alerte. Horizon 2 (6 à 12 mois) : segmenter vos clients par rentabilité, pas seulement par CA. Horizon 3 (18+ mois) : planifier vos recrutements et vos compétences en fonction des tendances, pas des urgences du moment.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Pourquoi les dirigeants PME restent-ils en mode réactif ?</p>
              <p className="text-gray-700">Parce que le réactif donne l'illusion de l'action. Un mois de creux : on lance une promo. Un mois de boom : on recrute en urgence. Ça occupe, ça rassure, mais ça ne construit rien. Le passage à l'anticipatif demande de la discipline et un cadre que la plupart des dirigeants n'ont jamais formalisé.</p>
            </div>
          </div>

          {/* Pour aller plus loin */}
          <div className="mt-12 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/strategie-commerciale-pme-cadre-une-page" className="text-mint-green hover:underline font-medium">
                  Stratégie commerciale PME : le cadre en une page
                </Link>
                <span className="block text-gray-500 mt-0.5">Poser le cadre stratégique avant de structurer le pilotage.</span>
              </li>
              <li>
                <Link href="/blog/kpis-commerciaux-pme-indicateurs-vous-cachent" className="text-mint-green hover:underline font-medium">
                  KPIs commerciaux PME : ce que vos indicateurs vous cachent
                </Link>
                <span className="block text-gray-500 mt-0.5">Les vrais indicateurs de performance, au-delà du chiffre d'affaires.</span>
              </li>
              <li>
                <Link href="/blog/reunion-commerciale-hebdo-rituel-closing" className="text-mint-green hover:underline font-medium">
                  Réunion commerciale hebdo : le rituel qui transforme le closing
                </Link>
                <span className="block text-gray-500 mt-0.5">Structurer le rituel hebdomadaire qui fait la différence.</span>
              </li>
            </ul>
          </div>

          {/* CTA gradient final */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous pilotez votre développement commercial au doigt mouillé ?</h3>
            <p className="mb-6">
              La plupart des dirigeants de PME gèrent leur activité en réaction : un mois de creux et on brade, un mois de boom et on recrute dans l'urgence. Ce cycle s'arrête quand on pose un cadre. Un diagnostic offert d'une demi-journée permet de voir où se situent vos vrais leviers d'anticipation. Pas de théorie, juste une lecture terrain de votre situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic offert
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
              >
                Découvrir le Bootcamp commercial
              </Link>
            </div>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            Le choix n'est pas entre réactif et anticipatif. C'est entre subir son développement commercial et le construire. Les outils sont simples. Les rituels sont courts. La seule vraie question, c'est : est-ce que vous êtes prêt à tenir les 4 semaines pour que ça devienne une habitude ?
          </p>
        </div>

        {/* AuthorCard bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <AuthorCard />
        </div>
      </article>

      {/* HubSpot Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d'en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre cas mérite un échange plus direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>

      {/* Retour blog */}
      <section className="py-8 bg-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors font-medium"
          >
            Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
