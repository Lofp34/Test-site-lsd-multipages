import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Ce qui fait gagner vos commerciaux tuera vos ventes demain | Laurent Serre',
  description:
    'Le dilemme de l\'innovateur de Christensen expliqué aux dirigeants de PME : pourquoi vos méthodes commerciales qui marchent aujourd\'hui préparent l\'échec de demain.',
  keywords:
    'dilemme de l\'innovateur, vente B2B, innovation commerciale, transformation équipe commerciale, Christensen commerciale, piège du succès commercial',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/dilemme-innovateur-vente-b2b',
  },
  openGraph: {
    title: 'Ce qui fait gagner vos commerciaux tuera vos ventes demain',
    description:
      'Le dilemme de l\'innovateur de Christensen expliqué aux dirigeants de PME : pourquoi vos méthodes commerciales qui marchent aujourd\'hui préparent l\'échec de demain.',
    url: 'https://www.laurentserre.com/blog/dilemme-innovateur-vente-b2b',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-06-01-dilemme-innovateur-vente-b2b-hero.webp',
        width: 1536,
        height: 1024,
        alt: 'Dirigeant commercial devant des graphiques verts, expression préoccupée — le succès qui cache une inquiétude',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ce qui fait gagner vos commerciaux tuera vos ventes demain',
    description:
      'Le dilemme de l\'innovateur de Christensen expliqué aux dirigeants de PME : pourquoi vos méthodes commerciales qui marchent aujourd\'hui préparent l\'échec de demain.',
    images: ['https://www.laurentserre.com/images/blog/2026-06-01-dilemme-innovateur-vente-b2b-hero.webp'],
  },
};

const carouselPrefix = '/images/blog/carrousel-dilemme-innovateur';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover : Le dilemme de l\'innovateur en vente B2B', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-equipe.webp`, alt: 'Réunion commerciale : +18%, satisfecit général', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-declic.webp`, alt: 'Lecture de Christensen le soir', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-dossier-perdu.webp`, alt: 'Dossier perdu face à un petit nouveau', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-prise-de-conscience.webp`, alt: 'Prise de conscience à la fenêtre', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-observation.webp`, alt: 'Commercial argumente, client regarde son téléphone', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-trois-pieges.webp`, alt: 'Tableau blanc : Recrutement — Process — Indicateurs', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-maxime.webp`, alt: 'Maxime : « Je ne sors pas le script tout de suite »', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-decision.webp`, alt: 'Post-it « 20% », calme déterminé', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-annonce.webp`, alt: 'Annonce à l\'équipe : 20% temps libre', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-diagnostic.webp`, alt: 'Rendez-vous diagnostic, pas de demo', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-resultats.webp`, alt: 'Résultats modestes : -2 mais +3', index: 11 },
  { src: `${carouselPrefix}/bd-slide-13-lecon.webp`, alt: 'Leçon : poser le script au bon moment', index: 12 },
  { src: `${carouselPrefix}/bd-slide-14-cta.webp`, alt: 'CTA : diagnostic offert sur laurentserre.com', index: 13 },
];

export default function DilemmeInnovateurVenteB2BPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Ce qui fait gagner vos commerciaux tuera vos ventes demain',
    description:
      'Le dilemme de l\'innovateur de Christensen expliqué aux dirigeants de PME : pourquoi vos méthodes commerciales qui marchent aujourd\'hui préparent l\'échec de demain.',
    image: 'https://www.laurentserre.com/images/blog/2026-06-01-dilemme-innovateur-vente-b2b-hero.webp',
    datePublished: '2026-06-01',
    dateModified: '2026-06-01',
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
      '@id': 'https://www.laurentserre.com/blog/dilemme-innovateur-vente-b2b',
    },
    articleSection: 'Vente B2B / Innovation commerciale',
    keywords: [
      'dilemme de l\'innovateur',
      'vente B2B',
      'innovation commerciale',
      'transformation équipe commerciale',
      'Christensen',
      'piège du succès commercial',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qu\'est-ce que le dilemme de l\'innovateur appliqué à la vente ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le dilemme de l\'innovateur, théorisé par Clayton Christensen, explique pourquoi les entreprises les mieux gérées se font dépasser par des concurrents inattendus. Appliqué à la vente, cela signifie que vos méthodes commerciales qui marchent aujourd\'hui vous rendent vulnérable demain : vous optimisez ce qui fonctionne pendant que le comportement des acheteurs change, et un concurrent construit une approche sur les nouvelles attentes que vous n\'avez pas vues venir.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment savoir si mon équipe commerciale est piégée par son succès ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Trois signes sont révélateurs : vous recrutez vos commerciaux à l\'image de vos meilleurs vendeurs actuels (vous préparez l\'équipe d\'hier), votre process commercial est verrouillé depuis plus de deux ans sans évolution significative, et vos indicateurs de performance vous rassurent sur le passé sans mesurer votre capacité d\'innovation commerciale.',
        },
      },
      {
        '@type': 'Question',
        name: 'Faut-il tout changer dans mon équipe commerciale pour sortir du dilemme ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non. La sortie du dilemme ne consiste pas à tout jeter. Il s\'agit de conserver ce qui marche encore tout en libérant de l\'espace — du temps, des ressources, des essais — pour construire des approches adaptées aux nouveaux comportements acheteurs. La règle des 20% de temps consacré à des méthodes nouvelles est un bon point de départ.',
        },
      },
      {
        '@type': 'Question',
        name: 'Est-ce que le dilemme de l\'innovateur concerne aussi les petites PME ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, et même davantage. Les PME ont moins de ressources pour expérimenter en parallèle de leur activité principale. Le piège est donc plus dangereux : optimiser ce qui marche aujourd\'hui consomme toute l\'énergie, et il ne reste rien pour préparer demain. Mais la taille réduite est aussi un avantage : une PME peut pivoter plus vite qu\'une grande organisation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Combien de temps faut-il pour sortir du dilemme commercial ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La transformation ne se fait pas en un trimestre. Les premières décisions — règle des 20%, nouveau profil d\'acheteur, changement des réunions — peuvent être mises en place en quelques semaines. Mais voir les résultats sur le chiffre d\'affaires prend six à neuf mois, le temps que les nouvelles approches produisent des cycles de vente complets.',
        },
      },
      {
        '@type': 'Question',
        name: 'Par quel piège commencer si je reconnais les trois dans mon équipe ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Commencez par le changement des réunions commerciales. C\'est le levier le plus rapide et le moins coûteux. Au lieu de passer la revue de pipeline à vérifier que tout roule, cherchez ce qui ne colle plus, ce qui change dans les comportements acheteurs, ce que vos commerciaux voient arriver. Le signal faible vaut plus que le chiffre rassurant.',
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Dilemme de l\'innovateur en vente B2B',
        item: 'https://www.laurentserre.com/blog/dilemme-innovateur-vente-b2b',
      },
    ],
  };

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Laurent Serre',
    url: 'https://www.laurentserre.com',
    image: 'https://www.laurentserre.com/laurent.jpg',
    sameAs: [
      'https://www.linkedin.com/in/laurentserre34/',
      'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
    ],
    jobTitle: 'Coach commercial',
    knowsAbout: ['Vente B2B', 'Développement commercial', 'Coaching équipe commerciale', 'Innovation commerciale'],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
              <li className="text-blue-ink font-medium" aria-current="page">Dilemme de l&apos;innovateur</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Vente B2B / Innovation commerciale
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Ce qui fait gagner vos commerciaux tuera vos ventes demain
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/laurent.jpg"
                  alt="Laurent Serre"
                  width={32}
                  height={32}
                  className="rounded-full"
                  quality={60}
                  sizes="32px"
                  loading="lazy"
                />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-06-01">1 juin 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-06-01-dilemme-innovateur-vente-b2b-hero.webp"
              alt="Dirigeant commercial devant des graphiques verts, expression préoccupée — le succès qui cache une inquiétude"
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
          {/* AuthorCard : top */}
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              ✨ Ce que vous allez retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le dilemme de l&apos;innovateur de Christensen appliqué à la vente B2B : pourquoi les méthodes qui
              marchent aujourd&apos;hui préparent silencieusement l&apos;échec de demain. Trois pièges identifiés
              sur le terrain et cinq décisions concrètes pour en sortir sans tout casser.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Le dilemme de l&apos;innovateur en vente B2B — 14 planches
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire de Stéphane, directeur commercial pris dans le piège du succès : du dossier perdu
              face à un petit nouveau jusqu&apos;aux décisions qui changent tout.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Le dilemme de l'innovateur en vente B2B"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-dilemme-innovateur-vente-b2b.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (14 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA : sous le carrousel */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vous reconnaissez ces pièges dans votre équipe ? Faites un diagnostic →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#christensen" className="text-mint-green hover:underline">Ce que Christensen a vraiment dit</a></li>
              <li><a href="#traduit" className="text-mint-green hover:underline">Traduit pour une équipe commerciale</a></li>
              <li><a href="#pieges" className="text-mint-green hover:underline">Les trois pièges visibles sur le terrain</a></li>
              <li><a href="#decisions" className="text-mint-green hover:underline">Cinq décisions pour sortir du piège</a></li>
              <li><a href="#concret" className="text-mint-green hover:underline">Ce que ça change concrètement</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">Questions fréquentes</a></li>
            </ul>
          </div>

          {/* Accroche */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Je les vois arriver avec leur tableau de bord. Les chiffres sont bons. Le pipeline est plein.
            Les commerciaux tiennent leurs objectifs. Tout va bien.
          </p>

          <p className="mb-8">
            Sauf que dans six mois, tout ça peut s&apos;écrouler.
          </p>

          <p className="mb-8">
            Ce n&apos;est pas une intuition. C&apos;est la seule théorie qui tienne la route depuis trente ans,
            et elle s&apos;appelle le dilemme de l&apos;innovateur. Clayton Christensen l&apos;a posée en 1997. Elle
            expliquait pourquoi des entreprises bien gérées, avec des clients fidèles et des produits
            solides, se faisaient laminer par des petits nouveaux. Pas parce qu&apos;elles faisaient n&apos;importe
            quoi. Parce qu&apos;elles écoutaient trop leurs bons clients et optimisaient ce qui marchait déjà.
          </p>

          <p className="mb-8">
            Christensen s&apos;intéressait aux produits. Moi, je regarde les équipes commerciales. Et le
            parallèle est frappant.
          </p>

          {/* ──────────────── Christensen ──────────────── */}
          <h2 id="christensen" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que Christensen a vraiment dit
          </h2>

          <p className="mb-4">
            Christensen montrait une chose simple : les entreprises qui réussissent sont piégées par
            leur propre succès. Elles continuent à améliorer ce que leurs clients leur demandent. C&apos;est
            logique. Mais pendant ce temps, un concurrent arrive par en bas, avec une offre moins bonne
            sur le papier, et construit un marché que personne n&apos;avait vu venir.
          </p>

          <p className="mb-8">
            Les leaders ne le voient pas arriver. Pas par aveuglement volontaire. Parce que leur radar
            pointe dans la bonne direction : celle de leurs clients actuels.
          </p>

          {/* ──────────────── Traduit pour une équipe ──────────────── */}
          <h2 id="traduit" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Traduit pour une équipe commerciale
          </h2>

          <p className="mb-4">
            Prenez votre équipe commerciale aujourd&apos;hui.
          </p>

          <p className="mb-4">
            Vous avez des méthodes qui marchent. Une certaine manière de prospecter. Un script qui passe
            bien au téléphone. Un argumentaire qui répond aux objections que vous connaissez par coeur.
            Vos commerciaux sont rodés.
          </p>

          <p className="mb-4">
            C&apos;est exactement là que le piège se referme.
          </p>

          <p className="mb-4">
            Les clients que vous avez aujourd&apos;hui vous demandent de faire comme avant, mais mieux, plus
            vite, moins cher. Vos concurrents historiques jouent la même partie. Et vous optimisez :
            vous formez vos équipes à mieux caller, à mieux closer, à mieux gérer leur pipeline. Rien de
            mal là-dedans.
          </p>

          <p className="mb-4">
            Mais les acheteurs, eux, ont changé.
          </p>

          <p className="mb-4">
            Ils arrivent mieux informés. Ils ne veulent plus qu&apos;on les appelle. Ils veulent qu&apos;on les
            comprenne avant d&apos;avoir parlé. Ils ne veulent pas d&apos;une demo, ils veulent un diagnostic. Et
            vos concurrents — pas ceux que vous connaissez, les autres — construisent leur approche autour
            de ce nouveau comportement.
          </p>

          <p className="mb-8">
            Vous continuez à améliorer ce qui marche. Eux inventent ce qui va marcher.
          </p>

          {/* ──────────────── Les trois pièges ──────────────── */}
          <h2 id="pieges" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les trois pièges visibles sur le terrain
          </h2>

          <p className="mb-8">
            J&apos;accompagne des équipes commerciales de PME depuis vingt ans. Voici les trois signes que
            votre équipe est prise dans le dilemme sans le savoir.
          </p>

          <p className="mb-4">
            <strong>Premier piège : vous recrutez vos commerciaux à l&apos;image de vos meilleurs vendeurs.</strong>
          </p>

          <p className="mb-4">
            C&apos;est le piège numéro un. Vous cherchez des profils qui ressemblent à ceux qui performent
            aujourd&apos;hui. Sauf que le marché a déjà commencé à bouger. Vous recrutez pour le monde
            d&apos;hier. Le bon commercial de demain ne ressemblera pas à celui d&apos;aujourd&apos;hui. Il saura
            écouter avant de parler. Il saura diagnostiquer avant de proposer. Il saura travailler avec
            les données. Votre grille de recrutement actuelle ne cherche rien de tout ça.
          </p>

          <p className="mb-4">
            <strong>Deuxième piège : votre process commercial est verrouillé.</strong>
          </p>

          <p className="mb-4">
            Vous avez un cycle de vente défini. Des étapes. Des critères. Des templates. C&apos;est bien.
            Mais si votre process est le même depuis deux ans sans évolution significative, vous vous
            êtes arrêté à la dernière version qui marchait. Les acheteurs, eux, n&apos;ont pas arrêté de
            changer.
          </p>

          <p className="mb-4">
            <strong>Troisième piège : vos indicateurs de performance vous rassurent.</strong>
          </p>

          <p className="mb-8">
            Volume d&apos;appels, taux de transformation, chiffre d&apos;affaires réalisé. Vos commerciaux les
            tiennent, donc tout va bien. Sauf que ces indicateurs mesurent le passé. Ils vous disent ce
            qui a marché, pas ce qui va cesser de marcher. L&apos;indicateur qui manque, c&apos;est le taux
            d&apos;innovation commerciale. Combien de nouvelles approches votre équipe a-t-elle testées ce
            mois-ci ?
          </p>

          {/* ──────────────── Cinq décisions ──────────────── */}
          <h2 id="decisions" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Cinq décisions pour sortir du piège
          </h2>

          <p className="mb-8">
            Sortir du dilemme, ça ne se fait pas en un trimestre. Mais voici les décisions que j&apos;ai
            vues fonctionner chez mes clients.
          </p>

          <p className="mb-4">
            <strong>1. Creuser un nouvel acheteur type.</strong>
          </p>

          <p className="mb-4">
            Prenez les dossiers que vous avez gagnés contre des concurrents inattendus. Ou ceux où
            l&apos;acheteur ne ressemblait pas à votre cible habituelle. Décrivez-le. Vous allez voir
            apparaître un profil d&apos;acheteur que vos équipes ne savent pas encore traiter correctement.
          </p>

          <p className="mb-4">
            <strong>2. Introduire une règle des 20%.</strong>
          </p>

          <p className="mb-4">
            Vingt pour cent du temps commercial doit être consacré à des approches nouvelles : un
            nouveau canal, un nouveau message, une nouvelle séquence. Pas en option, pas quand le
            planning le permet. Une règle.
          </p>

          <p className="mb-4">
            <strong>3. Changer le sujet des réunions commerciales.</strong>
          </p>

          <p className="mb-4">
            Ne passez pas votre revue de pipeline à vérifier que tout roule. Passez-la à chercher ce
            qui ne colle plus, ce qui change dans les comportements acheteurs, ce que vos commerciaux
            voient arriver. Le signal faible vaut plus que le chiffre rassurant.
          </p>

          <p className="mb-4">
            <strong>4. Recruter un profil asymétrique.</strong>
          </p>

          <p className="mb-4">
            À votre prochain recrutement, prenez quelqu&apos;un qui ne ressemble pas à vos meilleurs
            vendeurs. Un commercial qui vient d&apos;un autre secteur. Un profil plus analytique. Un ancien
            acheteur. Quelqu&apos;un qui ne maîtrise pas encore votre code, mais qui peut en inventer un
            autre.
          </p>

          <p className="mb-4">
            <strong>5. Arrêter une pratique une fois par an.</strong>
          </p>

          <p className="mb-8">
            Tous les ans, supprimez une méthode commerciale que vous utilisiez systématiquement. Un
            type de relance. Un argument. Un script. Non pas parce qu&apos;elle ne marche plus. Mais parce
            que sa présence empêche d&apos;en inventer une nouvelle.
          </p>

          {/* Mid-article CTA : Diagnostic */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              🎯 Un diagnostic pour sortir du piège ?
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Si vous reconnaissez un ou plusieurs de ces pièges dans votre équipe, un diagnostic
              commercial permet d&apos;identifier les vrais leviers de transformation. Pas de méthode toute
              faite, pas de promesses en l&apos;air.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Demander un diagnostic →
            </Link>
          </div>

          {/* ──────────────── Ce que ça change ──────────────── */}
          <h2 id="concret" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que ça change concrètement
          </h2>

          <p className="mb-4">
            Un dirigeant de PME avec qui je travaille m&apos;a dit un jour : &quot;J&apos;ai passé dix ans à optimiser
            mon équipe pour faire ce qu&apos;elle faisait bien. Je viens de comprendre que c&apos;est exactement
            ce qui m&apos;a rendu vulnérable.&quot;
          </p>

          <p className="mb-4">
            Il n&apos;a pas tout changé du jour au lendemain. Il a conservé ce qui marchait encore. Mais il
            a libéré de l&apos;espace et du temps pour construire autre chose à côté.
          </p>

          <p className="mb-8">
            Aujourd&apos;hui, ses meilleurs commerciaux ne sont pas ceux qui tiennent le mieux leur script.
            Ce sont ceux qui savent poser le script quand le client ne ressemble plus au client d&apos;hier.
          </p>

          <p className="mb-8">
            C&apos;est ça, la sortie du dilemme. Pas tout jeter. Mais arrêter de croire que ce qui a marché
            va marcher éternellement.
          </p>

          {/* ──────────────── CTA final ──────────────── */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous reconnaissez un de ces trois pièges dans votre équipe ?
            </h3>
            <p className="mb-6">
              Beaucoup de dirigeants continuent à optimiser ce qui marche sans voir que le marché
              bouge. La première étape, c&apos;est un diagnostic honnête de votre situation commerciale.
              Pas de méthode toute faite, pas de promesses. Un regard extérieur sur ce qui coince
              vraiment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic commercial
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
              >
                Découvrir le Bootcamp commercial
              </Link>
            </div>
          </div>

          {/* ──────────────── FAQ ──────────────── */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Questions fréquentes
          </h2>

          <div className="space-y-6 mt-6 mb-10">
            <div>
              <p className="font-bold text-blue-ink mb-1">
                Qu&apos;est-ce que le dilemme de l&apos;innovateur appliqué à la vente ?
              </p>
              <p className="text-gray-700">
                Le dilemme de l&apos;innovateur, théorisé par Clayton Christensen, explique pourquoi les
                entreprises les mieux gérées se font dépasser par des concurrents inattendus. Appliqué
                à la vente, cela signifie que vos méthodes commerciales qui marchent aujourd&apos;hui vous
                rendent vulnérable demain : vous optimisez ce qui fonctionne pendant que le comportement
                des acheteurs change, et un concurrent construit une approche sur les nouvelles attentes
                que vous n&apos;avez pas vues venir.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Comment savoir si mon équipe commerciale est piégée par son succès ?
              </p>
              <p className="text-gray-700">
                Trois signes sont révélateurs : vous recrutez vos commerciaux à l&apos;image de vos meilleurs
                vendeurs actuels (vous préparez l&apos;équipe d&apos;hier), votre process commercial est verrouillé
                depuis plus de deux ans sans évolution significative, et vos indicateurs de performance
                vous rassurent sur le passé sans mesurer votre capacité d&apos;innovation commerciale.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Faut-il tout changer dans mon équipe commerciale pour sortir du dilemme ?
              </p>
              <p className="text-gray-700">
                Non. La sortie du dilemme ne consiste pas à tout jeter. Il s&apos;agit de conserver ce qui
                marche encore tout en libérant de l&apos;espace — du temps, des ressources, des essais —
                pour construire des approches adaptées aux nouveaux comportements acheteurs. La règle
                des 20% de temps consacré à des méthodes nouvelles est un bon point de départ.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Est-ce que le dilemme de l&apos;innovateur concerne aussi les petites PME ?
              </p>
              <p className="text-gray-700">
                Oui, et même davantage. Les PME ont moins de ressources pour expérimenter en parallèle
                de leur activité principale. Le piège est donc plus dangereux : optimiser ce qui marche
                aujourd&apos;hui consomme toute l&apos;énergie, et il ne reste rien pour préparer demain. Mais la
                taille réduite est aussi un avantage : une PME peut pivoter plus vite qu&apos;une grande
                organisation.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Combien de temps faut-il pour sortir du dilemme commercial ?
              </p>
              <p className="text-gray-700">
                La transformation ne se fait pas en un trimestre. Les premières décisions — règle des
                20%, nouveau profil d&apos;acheteur, changement des réunions — peuvent être mises en place
                en quelques semaines. Mais voir les résultats sur le chiffre d&apos;affaires prend six à neuf
                mois, le temps que les nouvelles approches produisent des cycles de vente complets.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Par quel piège commencer si je reconnais les trois dans mon équipe ?
              </p>
              <p className="text-gray-700">
                Commencez par le changement des réunions commerciales. C&apos;est le levier le plus rapide
                et le moins coûteux. Au lieu de passer la revue de pipeline à vérifier que tout roule,
                cherchez ce qui ne colle plus, ce qui change dans les comportements acheteurs, ce que
                vos commerciaux voient arriver. Le signal faible vaut plus que le chiffre rassurant.
              </p>
            </div>
          </div>

          {/* ──────────────── Ressources ──────────────── */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link
                  href="/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux"
                  className="text-mint-green hover:underline font-medium"
                >
                  Les acheteurs B2B ne veulent plus parler aux commerciaux
                </Link>
                <span className="text-gray-500">
                  {' '}: Pourquoi les acheteurs ont changé leur comportement et ce que ça implique pour vos équipes.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/coaching-commercial-terrain-5-leviers-transformation-equipe"
                  className="text-mint-green hover:underline font-medium"
                >
                  Coaching commercial terrain : les 5 leviers qui transforment durablement une équipe
                </Link>
                <span className="text-gray-500">
                  {' '}: Les leviers concrets pour transformer les pratiques de votre équipe.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/gap-selling-methode-b2b"
                  className="text-mint-green hover:underline font-medium"
                >
                  Gap Selling : la méthode B2B qui a changé ma façon de vendre
                </Link>
                <span className="text-gray-500">
                  {' '}: Une approche qui privilégie le diagnostic à la démonstration produit.
                </span>
              </li>
            </ul>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            C&apos;est ça, la sortie du dilemme. Pas tout jeter. Mais arrêter de croire que ce qui a
            marché va marcher éternellement.
          </p>
        </div>

        {/* AuthorCard : bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <AuthorCard />
        </div>
      </article>

      {/* HubSpotForm */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d&apos;en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre situation mérite un échange direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>

      {/* Lien retour blog */}
      <section className="py-8 bg-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors font-medium"
          >
            ← Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
