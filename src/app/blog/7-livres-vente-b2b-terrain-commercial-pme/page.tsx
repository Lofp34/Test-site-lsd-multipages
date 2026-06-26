import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/7-livres-vente-b2b-terrain-commercial-pme';
const heroImage = 'https://www.laurentserre.com/images/blog/7-livres-vente-b2b/livres-vente-hero.webp';
const ogImage = 'https://www.laurentserre.com/images/blog/7-livres-vente-b2b/livres-vente-og.jpg';

export const metadata: Metadata = {
  title: 'Meilleur manuel de vente : 7 livres qui changent vraiment la pratique B2B',
  description:
    "Sélection de 7 livres de vente B2B qui corrigent les erreurs terrain des commerciaux. Pas une bibliothèque idéale — chaque livre est choisi pour l'erreur concrète qu'il fait corriger.",
  keywords:
    'meilleur manuel de vente, livres vente B2B, livres développement commercial, Challenger Sale, Gap Selling, SPIN Selling, livres closing B2B, formation commerciale livres, bibliothèque commercial terrain',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-26',
  },
  openGraph: {
    title: '7 livres de vente qui changent vraiment la pratique d\'un commercial B2B',
    description:
      "Sélection de 7 livres de vente B2B qui corrigent des erreurs terrain. Pas une bibliothèque — chaque livre est choisi pour l'erreur concrète qu'il corrige.",
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: '7 livres de vente qui changent la pratique commerciale B2B',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: '7 livres de vente qui changent vraiment la pratique d\'un commercial B2B | Laurent Serre',
    description:
      "Sélection de 7 livres de vente B2B qui corrigent des erreurs terrain. Chaque livre est choisi pour l'erreur concrète qu'il corrige.",
    images: [ogImage],
  },
};

const carouselPrefix = '/images/blog/7-livres-vente-b2b';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Couverture : 7 livres de vente qui changent la pratique', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-constat.webp`, alt: 'Commercial perdu face à une bibliothèque', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-laurent-question.webp`, alt: 'Laurent demande : quels livres avez-vous vraiment lus ?', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-the-challenger-sale.webp`, alt: 'Denis et la relation pour la relation', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-gap-selling.webp`, alt: 'Marc et le pitching sans diagnostic', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-high-output-management.webp`, alt: 'Sophie confond activité et résultat', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-spin-selling.webp`, alt: 'Thomas et les questions fermées', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-innovators-dilemma.webp`, alt: 'Karim vend ce qu\'on lui demande', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-never-split.webp`, alt: 'Julien cède sur le prix pour signer', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-new-sales.webp`, alt: 'Camille attend les leads au lieu de prospecter', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-retour-table.webp`, alt: 'Retour à la table : Laurent et l\'équipe', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-cta.webp`, alt: 'CTA : diagnostic offert sur laurentserre.com', index: 11 },
];

const faqItems = [
  {
    question: 'Quel est le meilleur livre pour apprendre à vendre ?',
    answer:
      "Il n'y a pas un seul meilleur livre, parce que la vente n'est pas une compétence unique. The Challenger Sale est le meilleur si votre équipe vend en mode 'relation' sans challenger. Gap Selling est le meilleur si vos commerciaux pitchent avant d'avoir trouvé le problème. SPIN Selling reste la référence si vos commerciaux posent des questions fermées. Le bon livre dépend de l'erreur dominante dans votre équipe.",
  },
  {
    question: 'Quels livres lire pour le closing en B2B ?',
    answer:
      "Deux livres changent vraiment le closing en B2B : Never Split the Difference (Chris Voss) pour apprendre à tenir le prix sans casser la relation, et Gap Selling (Keenan) pour comprendre que le closing n'est pas une étape mais la conclusion logique d'un diagnostic bien posé. Le closing B2B se gagne avant la négociation.",
  },
  {
    question: 'SPIN Selling est-il encore pertinent en 2026 ?',
    answer:
      "Oui, mais pas comme méthode fermée. Le SPIN (Situation, Problème, Implication, Need-payoff) est une structure de questionnement qui reste la base. En 2026, le vrai problème n'est pas la méthode en soi — c'est que beaucoup de commerciaux restent sur les questions de Situation et de Problème sans aller jusqu'à l'Implication. Et avec l'IA qui pré-remplit les diagnostics, le risque est de sauter l'étape Need-payoff, qui est la seule qui fait vendre.",
  },
  {
    question: 'Faut-il lire The Challenger Sale avant de vendre ?',
    answer:
      "Avant de vendre, non. Avant de manager une équipe commerciale, oui. The Challenger Sale est moins un livre de technique individuelle qu'un livre de stratégie d'équipe. Il corrige une erreur de management : laisser les commerciaux croire que la relation client suffit. Lisez-le en équipe, débattez-le en réunion, ne le donnez pas à lire individuellement.",
  },
  {
    question: 'Combien de livres de vente faut-il lire par an ?',
    answer:
      "Un seul, bien lu, bien appliqué, vaut mieux que dix livres survolés. Si je devais donner un rythme : un livre par trimestre, en équipe, avec un débrief collectif après chaque lecture. Pas de lecture solo sans mise en pratique. L'objectif n'est pas d'accumuler des concepts — c'est de changer un comportement concret par livre.",
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      headline: '7 livres de vente qui changent vraiment la pratique d\'un commercial B2B',
      description:
        "Sélection de 7 livres de vente B2B qui corrigent les erreurs terrain des commerciaux. Chaque livre est choisi pour l'erreur concrète qu'il fait corriger.",
      image: heroImage,
      datePublished: '2026-06-26',
      dateModified: '2026-06-26',
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
        '@type': 'Person',
        name: 'Laurent Serre',
        url: 'https://www.laurentserre.com',
      },
      mainEntityOfPage: {
        '@id': articleUrl,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
        { '@type': 'ListItem', position: 3, name: '7 livres de vente B2B' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
};

export default function SeptLivresVenteB2BPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      {/* HERO */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">7 livres vente B2B</li>
            </ol>
          </nav>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Développement commercial / culture vente
              </span>
            </div>
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              7 livres de vente qui changent vraiment la pratique d&apos;un commercial B2B
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32}
                className="rounded-full" quality={60} sizes="32px" loading="lazy" />
              <span>Laurent Serre</span>
            </div>
            <span>•</span>
            <time dateTime="2026-06-26">26 juin 2026</time>
            <span>•</span>
            <span>9 min de lecture</span>
          </div>
          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un commercial entouré de livres de vente, en pleine réflexion, bureau vivant avec carnets et post-it"
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

      {/* ARTICLE */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              ✨ Ce que vous allez retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Une sélection de 7 livres de vente B2B, choisis non pas pour leur popularité
              mais pour l&apos;erreur concrète qu&apos;ils corrigent sur le terrain.
              Chaque livre est associé à une faute commerciale récurrente que j&apos;observe
              en mission. À la fin, vous saurez quel livre correspond à l&apos;erreur
              dominante de votre équipe.
            </p>
          </div>

          {/* BD CARROUSEL */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : 7 livres de vente qui changent la pratique
            </p>
            <p className="text-sm text-amber-700 mb-5">
              Un commercial qui empile les livres sans changer sa pratique, une équipe
              qui découvre que chaque livre corrige une erreur précise — et un diagnostic
              qui fait la différence.
            </p>
            <BDCarousel images={carouselImages} title="7 livres de vente B2B" maxPreview={2} />
            <div className="mt-4 text-center">
              <Link href="/downloads/carrousel-7-livres-vente-b2b.pdf"
                className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors text-sm font-medium">
                📥 Télécharger le PDF (12 planches)
              </Link>
            </div>
          </div>

          {/* BADGE CTA SOFT */}
          <div className="mb-8 text-center">
            <Link href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors">
              🔍 Vos commerciaux lisent-ils les bons livres ? Faites un diagnostic
            </Link>
          </div>

          {/* SOMMAIRE */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#challenger-sale" className="text-mint-green hover:underline">1. The Challenger Sale — la relation ne suffit pas</a></li>
              <li><a href="#gap-selling" className="text-mint-green hover:underline">2. Gap Selling — pitcher n&apos;est pas vendre</a></li>
              <li><a href="#high-output-management" className="text-mint-green hover:underline">3. High Output Management — l&apos;activité n&apos;est pas le résultat</a></li>
              <li><a href="#spin-selling" className="text-mint-green hover:underline">4. SPIN Selling — les questions fermées tuent les deals</a></li>
              <li><a href="#innovators-dilemma" className="text-mint-green hover:underline">5. The Innovator&apos;s Dilemma — vendre ce qu&apos;on vous demande n&apos;est pas vendre</a></li>
              <li><a href="#never-split" className="text-mint-green hover:underline">6. Never Split the Difference — céder sur le prix n&apos;est pas une solution</a></li>
              <li><a href="#new-sales" className="text-mint-green hover:underline">7. New Sales. Simplified. — les leads ne tombent pas du ciel</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">FAQ — les questions qu&apos;on me pose sur les livres de vente</a></li>
            </ul>
          </div>

          {/* INTRO */}
          <p className="lead mt-8">
            Je vois trop de dirigeants de PME constituer des bibliothèques commerciales sans jamais
            regarder si les livres qu&apos;ils donnent à leurs équipes corrigent vraiment une erreur terrain.
          </p>
          <p>
            Un commercial lit pour se rassurer, pas pour changer. Il empile les concepts, et six mois plus tard,
            il vend exactement comme avant : il parle trop tôt des solutions, il cède sur le prix,
            il confond relation et avancement.
          </p>
          <p>
            J&apos;ai sélectionné <strong>7 livres que j&apos;ai vus faire la différence sur le terrain</strong>.
            Pas une bibliothèque idéale. Chaque livre est ici parce qu&apos;il corrige une erreur précise
            que je retrouve systématiquement dans les équipes que j&apos;accompagne.
          </p>
          <p>
            Si vous donnez un seul livre à votre équipe cette année, commencez par celui qui correspond
            à l&apos;erreur dominante. Les six autres viendront après.
          </p>

          {/* 1. THE CHALLENGER SALE */}
          <h2 id="challenger-sale" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            1. The Challenger Sale — « On a une super relation avec le client. Il signe chez le concurrent. »
          </h2>
          <p>
            <strong>L&apos;erreur :</strong> croire que la qualité relationnelle suffit à faire du chiffre.
          </p>
          <p>
            Je vois des équipes entières fonctionner à la relation. Le commercial est sympa, le client
            l&apos;apprécie, les échanges sont fluides. Et le deal part chez un concurrent qui a posé
            une question dérangeante que personne n&apos;avait posée.
          </p>
          <p>
            <strong>Ce que corrige ce livre :</strong> la distinction entre « bien s&apos;entendre avec le client »
            et « faire avancer une décision ». Les auteurs montrent que les meilleurs commerciaux ne sont pas
            ceux qui construisent la meilleure relation — ce sont ceux qui <strong>challengent la pensée
            du client</strong> sur son propre problème.
          </p>
          <p>
            <strong>À donner si :</strong> vos commerciaux disent « bon contact » en réunion commerciale
            sans pouvoir montrer une décision qui a avancé.
          </p>

          {/* 2. GAP SELLING */}
          <h2 id="gap-selling" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            2. Gap Selling — « J&apos;ai présenté notre solution en détail. Le client n&apos;a pas donné suite. »
          </h2>
          <p>
            <strong>L&apos;erreur :</strong> pitcher avant d&apos;avoir trouvé le problème.
          </p>
          <p>
            La tentation est enorme : le client accepte le rendez-vous, on prépare une belle demo,
            on montre nos fonctionnalités, on insiste sur nos avantages. Et on repart sans aucune
            certitude sur ce qui le fait vraiment hésiter.
          </p>
          <p>
            <strong>Ce que corrige ce livre :</strong> Keenan pose une règle simple : <strong>on ne vend pas
            une solution, on vend l&apos;écart entre où le client est et où il veut être</strong> (the gap).
            Tant qu&apos;on n&apos;a pas mesuré cet écart avec le client, toute proposition est une
            projection aveugle.
          </p>
          <p>
            <strong>À donner si :</strong> vos commerciaux passent plus de temps à préparer leur présentation
            qu&apos;à creuser la situation du client.
          </p>

          {/* 3. HIGH OUTPUT MANAGEMENT */}
          <h2 id="high-output-management" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            3. High Output Management — « On fait 50 appels par jour. Pourquoi le pipeline est vide ? »
          </h2>
          <p>
            <strong>L&apos;erreur :</strong> confondre activité et résultat.
          </p>
          <p>
            C&apos;est l&apos;erreur la plus coûteuse en management commercial. Un commercial peut passer
            50 appels, faire 3 démos, envoyer 20 devis — et produire zéro closing. Parce qu&apos;il
            mesure son travail à ce qu&apos;il fait, pas à ce qu&apos;il produit.
          </p>
          <p>
            <strong>Ce que corrige ce livre :</strong> Andy Grove était le patron d&apos;Intel, pas un consultant
            commercial. Son livre parle de <strong>management par la production, pas par les activités</strong>.
            Il pose la question qui tue : « Quelle est la production réelle de votre équipe ? »
            Si la réponse est un nombre d&apos;appels ou de devis, vous mesurez mal.
          </p>
          <p>
            <strong>À donner si :</strong> vos réunions commerciales commentent le volume d&apos;activité
            sans regarder le taux de conversion réel.
          </p>

          {/* 4. SPIN SELLING */}
          <h2 id="spin-selling" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            4. SPIN Selling — « J&apos;ai posé toutes mes questions. Le client n&apos;a rien révélé. »
          </h2>
          <p>
            <strong>L&apos;erreur :</strong> poser des questions fermées qui n&apos;avancent pas la vente.
          </p>
          <p>
            Le piège est connu mais tout le monde tombe dedans : des questions qui appellent des réponses
            par oui ou par non, des diagnostics faits en surface, des problèmes supposés sans jamais
            mesurer l&apos;impact réel. Et derrière, une proposition envoyée sans conviction.
          </p>
          <p>
            <strong>Ce que corrige ce livre :</strong> Rackham a passé 12 ans à observer des appels de vente
            pour construire une grille de questionnement en quatre étapes : <strong>Situation, Problème,
            Implication, Need-payoff</strong>. Les deux dernières sont les plus oubliées — et les seules
            qui construisent une vraie urgence à acheter.
          </p>
          <p>
            <strong>À donner si :</strong> vos commerciaux enchaînent les questions sans jamais faire
            ressentir au client les conséquences de son problème.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-2">
              Vous voulez des méthodes qui marchent sur le terrain ?
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Les livres sont une base. La mise en pratique demande un cadre, du suivi et des
              situations réelles. Le Bootcamp commercial transforme ces concepts en réflexes d&apos;équipe.
            </p>
            <div className="text-center">
              <Link href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 bg-mint-green text-white font-medium rounded-full hover:bg-mint-green/90 transition-colors">
                Découvrir le Bootcamp commercial →
              </Link>
            </div>
          </div>

          {/* 5. THE INNOVATOR'S DILEMMA */}
          <h2 id="innovators-dilemma" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            5. The Innovator&apos;s Dilemma — « Le marché nous demande ça. Alors on vend ça. »
          </h2>
          <p>
            <strong>L&apos;erreur :</strong> vendre ce qu&apos;on vous demande, pas ce dont le client a besoin.
          </p>
          <p>
            C&apos;est l&apos;erreur la plus subtile de cette liste. Le client exprime un besoin, votre
            équipe s&apos;aligne, prépare une réponse, et pourtant le deal n&apos;avance pas.
            Parce que le client vous a demandé ce qu&apos;il connaît — pas ce qui réglerait
            vraiment son problème.
          </p>
          <p>
            <strong>Ce que corrige ce livre :</strong> Christensen montre pourquoi les meilleures entreprises
            échouent en faisant exactement ce que leurs clients leur demandent. C&apos;est la même mécanique
            en vente B2B : <strong>un commercial qui répond à la demande exprimée sans remonter au besoin
            réel construit une proposition qui rassure mais ne décide pas</strong>. Il faut parfois
            décevoir sur la réponse pour gagner sur le problème.
          </p>
          <p>
            <strong>À donner si :</strong> vos commerciaux envoient des propositions alignées sur le brief
            client... et perdent le deal sans comprendre pourquoi.
          </p>

          {/* 6. NEVER SPLIT THE DIFFERENCE */}
          <h2 id="never-split" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            6. Never Split the Difference — « On a baissé le prix de 15%. Le client veut encore 5%. »
          </h2>
          <p>
            <strong>L&apos;erreur :</strong> céder sur le prix pour signer.
          </p>
          <p>
            C&apos;est le réflexe le plus dur à tuer chez un commercial. Le client dit « c&apos;est trop cher »,
            le commercial baisse. Le client sent la faiblesse et redemande. Et le deal signé à -25%
            devient une corvée de rentabilité pour l&apos;année.
          </p>
          <p>
            <strong>Ce que corrige ce livre :</strong> Chris Voss était négociateur au FBI. Il apporte
            des techniques de négociation qui ont été testées dans des situations où l&apos;enjeu n&apos;est pas
            10% de remise mais une vie humaine. L&apos;idée centrale : <strong>le prix n&apos;est pas la variable
            à négocier. La perception de la valeur, oui.</strong> Ses techniques d&apos;écoute active,
            de mirroring et de calibrated questions donnent des leviers concrets pour tenir le prix
            sans casser la relation.
          </p>
          <p>
            <strong>À donner si :</strong> vos commerciaux reviennent de négociation avec des marges
            qui fondent.
          </p>

          {/* 7. NEW SALES. SIMPLIFIED. */}
          <h2 id="new-sales" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            7. New Sales. Simplified. — « On attend que les leads arrivent. »
          </h2>
          <p>
            <strong>L&apos;erreur :</strong> attendre les leads au lieu de prospecter.
          </p>
          <p>
            C&apos;est l&apos;erreur que je vois le plus souvent dans les PME qui ont investi dans le marketing
            digital. Le site génère des leads, l&apos;équipe les traite, et le pipeline se vide parce que
            personne n&apos;est allé chercher du nouveau business ailleurs.
          </p>
          <p>
            <strong>Ce que corrige ce livre :</strong> Mike Weinberg remet la prospection au centre de la
            vente B2B. Pas de méthode miracle, pas d&apos;outil magique : <strong>un cadre discipliné pour
            que le commercial reprenne le contrôle de son pipeline</strong>. Il donne des structures
            de prospection hebdomadaire, des scripts qui ne sentent pas le forcing, et une vérité
            inconfortable : si vous attendez les leads, vous n&apos;avez pas d&apos;équipe commerciale,
            vous avez une équipe de traitement de commandes.
          </p>
          <p>
            <strong>À donner si :</strong> vos commerciaux disent « je n&apos;ai pas le temps de prospecter,
            je suis trop occupé à répondre aux demandes entrantes ».
          </p>

          {/* POUR ALLER PLUS LOIN */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/challenger-sales-methode-terrain-b2b" className="text-mint-green hover:underline font-medium">
                  Challenger Sale : la méthode terrain B2B
                </Link>
                <span className="text-gray-500">{' '}: l&apos;article qui détaille comment appliquer le challenger sur le terrain, pas en théorie.</span>
              </li>
              <li>
                <Link href="/blog/gap-selling-methode-terrain-b2b" className="text-mint-green hover:underline font-medium">
                  Gap Selling : mode d&apos;emploi terrain
                </Link>
                <span className="text-gray-500">{' '}: les cas concrets d&apos;application de la méthode Keenan en PME.</span>
              </li>
              <li>
                <Link href="/blog/dilemme-innovateur-vente-b2b" className="text-mint-green hover:underline font-medium">
                  Le dilemme de l&apos;innovateur en vente B2B
                </Link>
                <span className="text-gray-500">{' '}: comment le livre de Christensen s&apos;applique à la stratégie commerciale.</span>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            FAQ : les questions qu&apos;on me pose sur les livres de vente
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index}>
                <p className="font-bold text-blue-ink mb-1">{item.question}</p>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>

          {/* CHUTE */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            La vente ne s&apos;apprend pas dans les livres. Mais les erreurs qu&apos;on continue
            de faire faute de les avoir lus, si.
          </p>

          {/* CTA FINAL GRADIENT */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous ne savez pas par quel livre commencer avec votre équipe ?
            </h3>
            <p className="mb-6">
              Le diagnostic commercial identifie l&apos;erreur dominante de votre équipe.
              Une fois l&apos;erreur identifiée, le bon livre devient évident —
              et surtout, la mise en pratique devient possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Découvrir le Bootcamp commercial
              </Link>
            </div>
          </div>

          {/* AUTHOR CARD BAS */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <AuthorCard />
          </div>
        </div>
      </article>

      {/* HUBSPOT FORM */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Une équipe commerciale qui lit seule n&apos;avance pas seule
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si vous voulez qu&apos;on échange sur les livres qui pourraient faire la différence
            dans votre équipe, laissez un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>

      {/* RETOUR BLOG */}
      <section className="py-8 bg-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors font-medium">
            ← Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
