import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Coaching Développement Commercial : Guide PME (2026)',
  description:
    'Coaching développement commercial : définition, méthodes, coûts réels, résultats concrets. Un guide terrain pour dirigeants de PME qui hésitent à investir — par Laurent Serre, 20 ans d\'expertise.',
  keywords:
    'coaching développement commercial, coaching commercial, coaching équipe commerciale, développement commercial PME, accompagner équipe commerciale, coaching vente',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/coaching-developpement-commercial-guide-complet-pme',
  },
  openGraph: {
    title: 'Coaching développement commercial : le guide complet pour dirigeants PME',
    description:
      'Ce que personne ne vous dit avant d\'investir dans un coaching commercial : méthodes, coûts réels, résultats concrets. Guide terrain pour dirigeants de PME.',
    url: 'https://www.laurentserre.com/blog/coaching-developpement-commercial-guide-complet-pme',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-28-coaching-developpement-commercial-hero.webp',
        width: 1536,
        height: 1024,
        alt: 'Un dirigeant de PME en conversation avec Laurent Serre dans un bureau lumineux, planifiant une transformation de l\'équipe commerciale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching développement commercial : le guide complet pour dirigeants PME',
    description:
      'Ce que personne ne vous dit avant d\'investir dans un coaching commercial : méthodes, coûts réels, résultats concrets.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-28-coaching-developpement-commercial-hero.webp'],
  },
};

const carouselPrefix = '/images/blog/carrousel-coaching-developpement-commercial';

const carouselImages = [
  { src: `${carouselPrefix}/01-cover.webp`, alt: 'Cover : Coaching développement commercial', index: 0 },
  { src: `${carouselPrefix}/02-scene-depart.webp`, alt: 'Dirigeant constate : les formations sans résultat', index: 1 },
  { src: `${carouselPrefix}/03-mauvais-reflexe.webp`, alt: 'Confondre coaching, formation et conseil', index: 2 },
  { src: `${carouselPrefix}/04-consequence.webp`, alt: 'Rien ne change vraiment sur le terrain', index: 3 },
  { src: `${carouselPrefix}/05-lecture-juste.webp`, alt: 'Coaching = transformation des pratiques', index: 4 },
  { src: `${carouselPrefix}/06-terrain.webp`, alt: 'Coach observe et débriefe après le vrai rendez-vous', index: 5 },
  { src: `${carouselPrefix}/07-signal.webp`, alt: 'Les signaux qui disent qu\'il faut agir', index: 6 },
  { src: `${carouselPrefix}/08-resultats.webp`, alt: 'Résultats concrets : ce que ça change et ne change pas', index: 7 },
  { src: `${carouselPrefix}/09-choisir.webp`, alt: 'Comment choisir son coach : les vrais critères', index: 8 },
  { src: `${carouselPrefix}/10-cta.webp`, alt: 'CTA : prêt à transformer votre équipe commerciale ?', index: 9 },
];

export default function CoachingDeveloppementCommercialPage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: 'Coaching développement commercial : ce que personne ne vous dit avant d\'investir',
          description:
            'Qu\'est-ce que le coaching développement commercial ? Méthodes, coûts réels, résultats concrets. Guide terrain pour dirigeants de PME par Laurent Serre, 20 ans d\'expertise.',
          image: 'https://www.laurentserre.com/images/blog/2026-05-28-coaching-developpement-commercial-hero.webp',
          datePublished: '2026-05-28',
          dateModified: '2026-05-28',
          author: {
            name: 'Laurent Serre',
            url: 'https://www.laurentserre.com/a-propos',
            sameAs: [
              'https://www.linkedin.com/in/laurentserre34/',
              'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
            ],
          },
          publisher: {
            name: 'Laurent Serre',
            url: 'https://www.laurentserre.com',
          },
          mainEntityOfPage: {
            '@id': 'https://www.laurentserre.com/blog/coaching-developpement-commercial-guide-complet-pme',
          },
          articleSection: 'Coaching commercial / Développement commercial',
          keywords: [
            'coaching développement commercial',
            'coaching commercial',
            'coaching équipe commerciale',
            'développement commercial PME',
            'accompagner équipe commerciale',
          ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.laurentserre.com/blog/coaching-developpement-commercial-guide-complet-pme"
    },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/coaching-developpement-commercial-guide-complet-pme#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'C\'est quoi le coaching développement commercial, vraiment ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Commençons par enlever ce qui encombre. Le coaching développement commercial n\'est pas une thérapie de l\'âme commerciale. On ne vient pas y « libérer son potentiel caché » ou « travailler son mindset » dans une salle aux bougies. Si c\'est ça que vous cherchez, vous n\'êtes pas au bon endroit. Ce que c\'est, concrètement : un accompagnement structuré, régulier, qui vise à améliorer les résultats commerciaux d\'une équipe ou d\'un dirigeant par le changement des pratiques de terrain. Un coach commerci',
            },
          },
          {
            '@type': 'Question',
            name: 'Coaching vs Formation vs Conseil : arrêtons la confusion',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un des plus gros problèmes que je vois sur le terrain, c\'est qu\'on confond ces trois métiers. Et qu\'on achète l\'un en espérant obtenir l\'autre. La formation : Elle apporte un savoir, une méthode, un cadre. C\'est vertical : quelqu\'un qui sait transmet à quelqu\'un qui ne sait pas. C\'est utile, c\'est nécessaire, mais ça ne change pas les habitudes toutes seules. Une formation sans suivi, c\'est un cours qu\'on oublie en rentrant au bureau. Le conseil : Il produit des livrables : un plan stratégique, ',
            },
          },
          {
            '@type': 'Question',
            name: 'Les 5 signaux qui ne trompent pas',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Quand est-ce qu\'il faut envisager un vrai coaching développement commercial ? Voici ce que je vois chez les dirigeants qui viennent me voir. 1. Vous avez l\'impression de répéter les mêmes réunions tous les trimestres Les chiffres sont les mêmes, les problèmes sont les mêmes, les plans d\'action se ressemblent. Vous avez l\'impression de refaire toujours la même réunion en changeant la date. C\'est le signe le plus clair que quelque chose ne bouge pas dans les pratiques. 2. Vous avez des commerciaux',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment se déroule un vrai coaching ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Je vais vous décrire comment je fonctionne, parce que c\'est le plus concret. Les méthodes varient d\'un coach à l\'autre, mais la trame est assez stable. Un coaching commercial complet dure entre 3 et 9 mois. Ce n\'est pas un stage d\'une semaine : c\'est une transformation progressive. Phase 1 — Le diagnostic (semaines 1-2) Je passe du temps sur le terrain avec vos équipes. J\'observe des rendez-vous, je débriefe avec les commerciaux, je regarde votre pipeline, j\'analyse vos documents de vente, je pa',
            },
          },
          {
            '@type': 'Question',
            name: 'Combien ça coûte ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Question légitime. Personne n\'investit sans savoir. Les prix du coaching développement commercial varient énormément. Pour vous donner des repères réels : Un coaching court (3 mois, sessions collectives) : 5 000 à 8 000 € Un coaching complet (6-9 mois, mix collectif + individuel + terrain) : 10 000 à 25 000 € Un coaching dirigeant sur-mesure : 15 000 à 40 000 € Ces chiffres peuvent paraître élevés comparés à une formation de deux jours à 3 000 €. Mais posez-vous la question dans l\'autre sens : C',
            },
          },
          {
            '@type': 'Question',
            name: 'Résultats attendus : ce que le coaching peut faire — et ne pas faire',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Soyons clairs. Le coaching commercial n\'est pas une baguette magique. Ce qu\'il peut apporter, quand les conditions sont réunies : Une équipe qui parle le même langage commercial. Des commerciaux qui osent creuser, confronter, demander. Un pipeline qui reflète la réalité, pas les espoirs. Un taux de transformation qui progresse. Un dirigeant qui passe moins de temps sur l\'opérationnel et plus sur la stratégie. Des réunions commerciales qui deviennent des vrais moments de pilotage. Ce qu\'il ne peu',
            },
          }
        ],
      },
  
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Coaching développement commercial', 'item': 'https://www.laurentserre.com/blog/coaching-developpement-commercial-guide-complet-pme' },
        ],
      }
],
};

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
              <li className="text-blue-ink font-medium" aria-current="page">Coaching développement commercial</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Coaching commercial / Développement commercial
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Coaching développement commercial : ce que personne ne vous dit avant d'investir
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
              <time dateTime="2026-05-28">28 mai 2026</time>
              <span>•</span>
              <span>11 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-05-28-coaching-developpement-commercial-hero.webp"
              alt="Un dirigeant de PME en conversation avec Laurent Serre dans un bureau lumineux, planifiant une transformation de l'équipe commerciale"
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
              Le coaching développement commercial n'est pas une formation de plus. C'est un accompagnement
              structuré qui transforme les pratiques de terrain. Ce guide vous donne les vrais repères :
              comment ça marche, combien ça coûte, quels résultats attendre, et surtout comment éviter les
              pièges. Un diagnostic gratuit d'une demi-journée permet de vérifier si c'est le bon moment
              pour votre équipe.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Coaching développement commercial en 10 planches
            </p>
            <p className="text-sm text-amber-700 mb-5">
              Du diagnostic jusqu'au retour sur investissement, les 10 étapes clés illustrées.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Coaching développement commercial"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-coaching-developpement-commercial.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (10 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA : sous le carrousel */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vous ne savez pas si vos équipes ont besoin de coaching ? Faites un diagnostic →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#definition" className="text-mint-green hover:underline">C'est quoi le coaching développement commercial, vraiment ?</a></li>
              <li><a href="#vs-formation-conseil" className="text-mint-green hover:underline">Coaching vs Formation vs Conseil : arrêtons la confusion</a></li>
              <li><a href="#signaux" className="text-mint-green hover:underline">Les 5 signaux qui ne trompent pas</a></li>
              <li><a href="#deroulement" className="text-mint-green hover:underline">Comment se déroule un vrai coaching ?</a></li>
              <li><a href="#cout" className="text-mint-green hover:underline">Combien ça coûte ?</a></li>
              <li><a href="#resultats" className="text-mint-green hover:underline">Résultats attendus : ce que le coaching peut faire — et ne pas faire</a></li>
              <li><a href="#choisir" className="text-mint-green hover:underline">Comment choisir le bon coach ?</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">Questions fréquentes</a></li>
            </ul>
          </div>

          {/* Accroche */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Je vais vous raconter une scène que j'ai vécue une trentaine de fois.
          </p>

          <p className="mb-8">
            Un dirigeant me reçoit dans son bureau. Il a une équipe de huit commerciaux, un chiffre d'affaires
            qui stagne depuis deux ans, et un classeur épais sur son étagère : les certificats de formation
            suivis par ses équipes. Vente consultative, closing, objection handling, prospection téléphonique.
            Chaque année, il investit. Chaque année, les résultats repartent comme ils étaient venus trois
            mois après.
          </p>

          <p className="mb-8">
            Il me regarde et il dit : « Laurent, mes gars ont eu toutes les formations du marché. Pourquoi ça
            ne marche pas ? »
          </p>

          <p className="mb-8">
            Cette question, je l'entends tout le temps. Et la réponse est rarement celle qu'on croit.
          </p>

          <p className="mb-8">
            Ce n'est pas un problème de technique. C'est un problème de transformation réelle des comportements.
            Une formation pose une couche de savoir. Le coaching la transforme en réflexe. La différence n'est
            pas subtile : elle est structurelle.
          </p>

          <p className="mb-8">
            Ce guide est écrit pour les dirigeants qui hésitent encore, qui ont déjà brûlé un budget formation
            sans résultat, et qui veulent comprendre une bonne fois pour toutes ce que le coaching développement
            commercial peut vraiment apporter — et ce qu'il ne peut pas.
          </p>

          {/* ──────────────── Définition ──────────────── */}
          <h2 id="definition" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            C'est quoi le coaching développement commercial, vraiment ?
          </h2>

          <p className="mb-4">
            Commençons par enlever ce qui encombre.
          </p>

          <p className="mb-4">
            Le coaching développement commercial n'est pas une thérapie de l'âme commerciale. On ne vient pas
            y « libérer son potentiel caché » ou « travailler son mindset » dans une salle aux bougies. Si
            c'est ça que vous cherchez, vous n'êtes pas au bon endroit.
          </p>

          <p className="mb-4">
            Ce que c'est, concrètement : un accompagnement structuré, régulier, qui vise à améliorer les
            résultats commerciaux d'une équipe ou d'un dirigeant par le changement des pratiques de terrain.
          </p>

          <p className="mb-4">
            Un coach commercial ne parle pas à votre place à vos clients. Il ne rédige pas votre plan
            d'action. Il ne fait pas le travail de votre équipe.
          </p>

          <p className="mb-8">
            Ce qu'il fait : il observe, il analyse, il confronte, il entraîne. Il est le miroir exigeant
            que vous n'avez pas en interne. Il pose les questions que personne ne pose parce que tout le
            monde est trop dedans.
          </p>

          <p className="mb-4">
            <strong>Exemple concret :</strong>
          </p>

          <p className="mb-8">
            Je travaille avec un directeur commercial qui vient de perdre un deal important sur le prix.
            Il me raconte : « Le client m'a dit que c'était trop cher, je n'ai pas pu faire bouger la
            décision. »
          </p>

          <p className="mb-8">
            Je lui demande : « À quel moment exact du cycle avez-vous présenté le prix ? »
          </p>

          <p className="mb-8">
            Réflexe classique : il me répond par le contenu de la réunion. « J'ai présenté notre
            proposition, il m'a dit que c'était 30 % au-dessus du concurrent. »
          </p>

          <p className="mb-8">
            Je repose : « Pas le contenu. Le moment. Combien de rendez-vous avant celui-là ? »
          </p>

          <p className="mb-8">
            Silence. Six rendez-vous. Le prix n'a été abordé qu'au sixième. Personne n'avait préparé le
            terrain, personne n'avait fait de diagnostic de la contrainte budgétaire, personne n'avait
            testé la perception de valeur.
          </p>

          <p className="mb-8">
            Ce n'est pas un problème de prix. C'est un problème de séquence. Le coaching, c'est ça :
            arrêter de regarder le symptôme, remonter à la mécanique, et entraîner le réflexe qui manque.
          </p>

          {/* ──────────────── Coaching vs Formation vs Conseil ──────────────── */}
          <h2 id="vs-formation-conseil" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Coaching vs Formation vs Conseil : arrêtons la confusion
          </h2>

          <p className="mb-4">
            Un des plus gros problèmes que je vois sur le terrain, c'est qu'on confond ces trois métiers.
            Et qu'on achète l'un en espérant obtenir l'autre.
          </p>

          <p className="mb-4">
            <strong>La formation :</strong> Elle apporte un savoir, une méthode, un cadre. C'est vertical :
            quelqu'un qui sait transmet à quelqu'un qui ne sait pas. C'est utile, c'est nécessaire, mais
            ça ne change pas les habitudes toutes seules. Une formation sans suivi, c'est un cours qu'on
            oublie en rentrant au bureau.
          </p>

          <p className="mb-4">
            <strong>Le conseil :</strong> Il produit des livrables : un plan stratégique, une segmentation
            client, un organigramme cible. Le consultant analyse, recommande, repart. La responsabilité
            de l'exécution reste dans vos mains. Si votre équipe n'est pas prête à encaisser le changement,
            le beau plan reste dans un classeur.
          </p>

          <p className="mb-8">
            <strong>Le coaching commercial :</strong> Il transforme les pratiques. Le coach travaille avec
            votre équipe sur le terrain. Il coache pendant les vrais rendez-vous, il débriefe après, il
            refait le geste jusqu'à ce que le geste devienne naturel. Ce n'est pas un apport de savoir :
            c'est un entraînement de compétences sur des situations réelles.
          </p>

          <p className="mb-4">Le tableau est assez simple à résumer :</p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li><strong>Formation</strong> : je vous apprends une technique → utile mais temporaire</li>
            <li><strong>Conseil</strong> : je vous fais une recommandation → utile mais indirect</li>
            <li><strong>Coaching</strong> : je vous entraîne à faire différemment → durable mais plus long</li>
          </ul>

          <p className="mb-8">
            Ce que j'observe le plus souvent : des dirigeants qui achètent de la formation en pensant
            obtenir du coaching. Puis qui s'étonnent que trois mois plus tard, rien n'ait changé.
          </p>

          {/* ──────────────── Les 5 signaux ──────────────── */}
          <h2 id="signaux" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 5 signaux qui ne trompent pas
          </h2>

          <p className="mb-6">
            Quand est-ce qu'il faut envisager un vrai coaching développement commercial ? Voici ce que je
            vois chez les dirigeants qui viennent me voir.
          </p>

          <p className="mb-4">
            <strong>1. Vous avez l'impression de répéter les mêmes réunions tous les trimestres</strong>
          </p>

          <p className="mb-4">
            Les chiffres sont les mêmes, les problèmes sont les mêmes, les plans d'action se ressemblent.
            Vous avez l'impression de refaire toujours la même réunion en changeant la date. C'est le
            signe le plus clair que quelque chose ne bouge pas dans les pratiques.
          </p>

          <p className="mb-4">
            <strong>2. Vous avez des commerciaux qui « savent » mais qui ne « font pas »</strong>
          </p>

          <p className="mb-4">
            Ils ont suivi les formations. Ils connaissent la théorie. Mais dans le vrai rendez-vous, ils
            retombent dans leurs vieux réflexes. La distance entre ce qu'ils savent et ce qu'ils font
            est le symptôme numéro un d'un besoin de coaching.
          </p>

          <p className="mb-4">
            <strong>3. Votre pipeline est rempli de dossiers qui n'avancent pas</strong>
          </p>

          <p className="mb-4">
            Des affaires qui traînent depuis six mois, des probabilités qui ne bougent pas, des contacts
            qui « réfléchissent » depuis février. Vous sentez que vos commerciaux entretiennent l'illusion
            de l'activité sans faire avancer la vraie décision.
          </p>

          <p className="mb-4">
            <strong>4. Vous n'avez pas de méthode de pilotage qui tient la route</strong>
          </p>

          <p className="mb-4">
            Vos réunions commerciales sont des tours de table où chacun raconte ce qu'il fait. Vous manquez
            d'indicateurs objectifs, de lecture commune du pipeline, de critères de qualification solides.
            Et personne dans l'équipe n'a appris à lire un dossier commercial autrement qu'à l'instinct.
          </p>

          <p className="mb-4">
            <strong>5. Vous sentez que vous êtes le seul moteur commercial de votre entreprise</strong>
          </p>

          <p className="mb-8">
            Si les deals importants ne se font que quand vous êtes personnellement impliqué, si vos
            commerciaux n'osent pas prendre de décision sans vous, si vous passez vos journées à éteindre
            des feux opérationnels, vous avez un problème de passage à l'échelle.
          </p>

          <p className="mb-8">
            Aucun de ces signaux pris isolément ne justifie forcément un coaching. Mais si vous en
            reconnaissez trois ou quatre, il est temps de regarder la question sérieusement.
          </p>

          {/* ──────────────── Comment se déroule un vrai coaching ──────────────── */}
          <h2 id="deroulement" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Comment se déroule un vrai coaching ?
          </h2>

          <p className="mb-4">
            Je vais vous décrire comment je fonctionne, parce que c'est le plus concret. Les méthodes
            varient d'un coach à l'autre, mais la trame est assez stable.
          </p>

          <p className="mb-8">
            Un coaching commercial complet dure entre 3 et 9 mois. Ce n'est pas un stage d'une semaine :
            c'est une transformation progressive.
          </p>

          <p className="mb-4">
            <strong>Phase 1 — Le diagnostic (semaines 1-2)</strong>
          </p>

          <p className="mb-4">
            Je passe du temps sur le terrain avec vos équipes. J'observe des rendez-vous, je débriefe
            avec les commerciaux, je regarde votre pipeline, j'analyse vos documents de vente, je passe
            une demi-journée à écouter des appels.
          </p>

          <p className="mb-8">
            Le diagnostic n'est pas une note que je vous envoie. C'est un échange : je vous dis ce que
            je vois, vous me dites ce que vous vivez, on confronte. Si on n'est pas d'accord sur le
            diagnostic, on ne peut pas avancer.
          </p>

          <p className="mb-4">
            <strong>Phase 2 — Les ateliers de cadrage (semaines 2-3)</strong>
          </p>

          <p className="mb-8">
            À partir du diagnostic, on construit un cadre commun :
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li>un processus commercial partagé par toute l'équipe</li>
            <li>un vocabulaire commun pour décrire un deal</li>
            <li>des critères de qualification qui font consensus</li>
            <li>un rituel de pilotage qui a du sens</li>
          </ul>

          <p className="mb-8">
            Ce n'est pas un process marketing plaqué. C'est un cadre taillé sur votre réalité : votre
            cycle de vente, vos clients types, vos marges, votre secteur.
          </p>

          <p className="mb-4">
            <strong>Phase 3 — Le coaching terrain (semaines 3-24)</strong>
          </p>

          <p className="mb-4">
            C'est le cœur du travail. Je ne coache pas en salle de réunion. Je coache dans le vrai :
            avant un rendez-vous, on prépare ; après, on débriefe. Je fais de la mise en situation, je
            joue le client, je pousse vos commerciaux dans leurs retranchements.
          </p>

          <p className="mb-4">
            Progressivement, on travaille :
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li>l'écoute active et la découverte</li>
            <li>la gestion des objections réelles</li>
            <li>la qualification des opportunités</li>
            <li>la négociation sans brader</li>
            <li>la relance intelligente</li>
          </ul>

          <p className="mb-8">
            Chaque mois, on fait un point avec vous sur les progrès et les ajustements.
          </p>

          <p className="mb-4">
            <strong>Phase 4 — La consolidation (mois 6-9)</strong>
          </p>

          <p className="mb-8">
            Les nouveaux réflexes commencent à s'ancrer. On vérifie que les pratiques tiennent sans moi,
            que les rituels sont devenus autonomes, que l'équipe sait fonctionner dans le nouveau cadre.
            Je commence à réduire ma présence.
          </p>

          <p className="mb-8">
            À la fin, ce qu'il reste, ce n'est pas un joli plan. C'est un réflexe collectif.
          </p>

          {/* Mid-article CTA : Diagnostic */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              🎯 Vous voulez savoir si un coaching est adapté à votre équipe ?
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Un diagnostic gratuit d'une demi-journée permet d'identifier les vrais leviers de
              transformation. Pas de méthode toute faite, pas de promesses en l'air.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Demander un diagnostic →
            </Link>
          </div>

          {/* ──────────────── Combien ça coûte ──────────────── */}
          <h2 id="cout" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Combien ça coûte ?
          </h2>

          <p className="mb-4">
            Question légitime. Personne n'investit sans savoir.
          </p>

          <p className="mb-4">
            Les prix du coaching développement commercial varient énormément. Pour vous donner des
            repères réels :
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li><strong>Un coaching court (3 mois, sessions collectives)</strong> : 5 000 à 8 000 €</li>
            <li><strong>Un coaching complet (6-9 mois, mix collectif + individuel + terrain)</strong> : 10 000 à 25 000 €</li>
            <li><strong>Un coaching dirigeant sur-mesure</strong> : 15 000 à 40 000 €</li>
          </ul>

          <p className="mb-4">
            Ces chiffres peuvent paraître élevés comparés à une formation de deux jours à 3 000 €. Mais
            posez-vous la question dans l'autre sens :
          </p>

          <p className="mb-8">
            Combien vous coûte l'absence de résultats ? Une équipe qui stagne, un pipeline qui fuit, des
            commerciaux qui sous-performent, du chiffre d'affaires qui ne se transforme pas. Les vrais
            coûts sont de l'autre côté.
          </p>

          <p className="mb-4">
            <strong>Les pièges à éviter :</strong>
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li>Le coach qui promet des résultats garantis. Personne ne garantit le chiffre d'affaires
              de votre équipe à votre place.</li>
            <li>Le coach qui commence sans diagnostic. S'il ne passe pas de temps à observer votre
              réalité, sa méthode sera générique.</li>
            <li>Le coach qui ne met jamais les pieds sur le terrain. Le coaching commercial à distance
              pure, ça n'existe pas sérieusement.</li>
            <li>Le coach qui n'a jamais fait de vente lui-même. Ça paraît évident, mais le marché est
              plein de gens qui n'ont jamais porté une valise et vous vendent du coaching commercial.</li>
          </ul>

          {/* ──────────────── Résultats attendus ──────────────── */}
          <h2 id="resultats" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Résultats attendus : ce que le coaching peut faire — et ne pas faire
          </h2>

          <p className="mb-4">
            Soyons clairs. Le coaching commercial n'est pas une baguette magique.
          </p>

          <p className="mb-4">
            <strong>Ce qu'il peut apporter, quand les conditions sont réunies :</strong>
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li>Une équipe qui parle le même langage commercial.</li>
            <li>Des commerciaux qui osent creuser, confronter, demander.</li>
            <li>Un pipeline qui reflète la réalité, pas les espoirs.</li>
            <li>Un taux de transformation qui progresse.</li>
            <li>Un dirigeant qui passe moins de temps sur l'opérationnel et plus sur la stratégie.</li>
            <li>Des réunions commerciales qui deviennent des vrais moments de pilotage.</li>
          </ul>

          <p className="mb-4">
            <strong>Ce qu'il ne peut pas faire :</strong>
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li>Sauver une équipe qui ne veut pas changer.</li>
            <li>Remplacer un management absent.</li>
            <li>Corriger une offre qui n'a pas de marché.</li>
            <li>Faire le travail de prospection à la place de vos équipes.</li>
          </ul>

          <p className="mb-8">
            Le coaching, c'est un catalyseur. Pas un moteur. Le moteur, c'est votre volonté de
            transformation et l'engagement de votre équipe.
          </p>

          {/* ──────────────── Comment choisir le bon coach ──────────────── */}
          <h2 id="choisir" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Comment choisir le bon coach ?
          </h2>

          <p className="mb-6">
            Quand vous rencontrez un coach potentiel, écoutez moins ce qu'il dit de sa méthode et
            regardez comment il se comporte.
          </p>

          <p className="mb-4">
            <strong>1. Sa question d'ouverture</strong>
          </p>

          <p className="mb-4">
            Un bon coach ne commence pas par vous parler de lui. Il commence par vous poser des
            questions sur votre réalité. S'il arrive avec un PowerPoint sur sa méthode, méfiez-vous.
          </p>

          <p className="mb-4">
            <strong>2. Son diagnostic</strong>
          </p>

          <p className="mb-4">
            Demandez-lui : « Concrètement, comment feriez-vous votre diagnostic chez moi ? » S'il vous
            répond par des généralités, passez votre chemin. S'il vous décrit précisément son protocole
            d'observation, vous êtes sur une piste sérieuse.
          </p>

          <p className="mb-4">
            <strong>3. Son expérience terrain</strong>
          </p>

          <p className="mb-4">
            « Combien d'années avez-vous fait de vente directe ? » La réponse doit être en années, pas
            en mois. Un coach qui n'a jamais porté une offre sur le terrain ne peut pas coacher un
            commercial sur le sien.
          </p>

          <p className="mb-4">
            <strong>4. Ses références</strong>
          </p>

          <p className="mb-4">
            Demandez trois contacts de dirigeants qu'il a accompagnés, avec le même profil que le vôtre.
            Pas des clients contents : des clients qui ont vu une transformation mesurable.
          </p>

          <p className="mb-4">
            <strong>5. Sa capacité à dire non</strong>
          </p>

          <p className="mb-4">
            Un bon coach sait dire non. Si votre situation ne correspond pas à ce qu'il fait, il doit
            pouvoir vous le dire. Quelqu'un qui accepte tout est quelqu'un qui fait du volume, pas de
            la qualité.
          </p>

          <p className="mb-4">
            <strong>6. Sa méthode de mesure</strong>
          </p>

          <p className="mb-4">
            « Comment saurez-vous qu'on a progressé au bout de 3 mois ? » S'il parle de ressenti, il n'a
            pas de cadre. S'il parle de taux de transformation, de vélocité du pipeline, de progression
            des indicateurs de comportement, il sait ce qu'il fait.
          </p>

          <p className="mb-8">
            <strong>7. Son absence de posture</strong>
          </p>

          <p className="mb-8">
            Certains coaches se prennent pour des gourous. Fuyez. Le bon coach est humble, concret,
            pragmatique. Il ne vous vend pas une révélation, il vous vend du travail régulier.
          </p>

          {/* ──────────────── CTA ──────────────── */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous voulez savoir si un coaching développement commercial est fait pour vous ?
            </h3>
            <p className="mb-6">
              Beaucoup de dirigeants pensent qu'il faut encore une formation. Le vrai levier est ailleurs :
              un accompagnement qui transforme les pratiques sur le terrain. Un diagnostic gratuit d'une
              demi-journée permet de voir où ça coince vraiment et ce qu'on peut en attendre.
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
                Quelle est la différence entre un coaching individuel et un coaching d'équipe ?
              </p>
              <p className="text-gray-700">
                Le coaching individuel travaille les compétences et la posture d'un commercial ou d'un
                dirigeant. Le coaching d'équipe vise à aligner les pratiques, le langage et les réflexes
                de toute la force de vente. Dans une PME, on commence souvent par le collectif : si
                l'équipe n'a pas de cadre commun, coacher un seul commercial crée un îlot de compétence,
                pas une transformation.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Le coaching peut-il se faire à distance ?
              </p>
              <p className="text-gray-700">
                Partiellement. Certaines séances de préparation ou de débrief peuvent être à distance.
                Mais le coaching terrain, l'observation des vrais rendez-vous, ne se fait pas par écran
                interposé. Si votre coach ne vient jamais sur le terrain, vous faites de la consultation
                à distance, pas du coaching commercial.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Combien de temps avant de voir des résultats ?
              </p>
              <p className="text-gray-700">
                Les premiers effets se voient souvent au bout de deux à trois mois : des changements
                dans les comportements, une meilleure qualification des dossiers, des commerciaux plus
                lucides. Les résultats sur le chiffre d'affaires mettent six à neuf mois, parce qu'il
                faut que les nouveaux réflexes produisent des cycles de vente complets.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Faut-il renouveler un coaching tous les ans ?
              </p>
              <p className="text-gray-700">
                Pas forcément. Un coaching complet bien mené laisse des traces durables. Beaucoup
                d'entreprises font un coaching initial, puis un coaching de consolidation un an plus
                tard. L'essentiel est d'avoir installé des rituels qui vivent sans le coach.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Le coaching peut-il échouer ?
              </p>
              <p className="text-gray-700">
                Oui. Dans deux cas : quand le dirigeant n'est pas prêt à remettre en cause son propre
                fonctionnement, ou quand l'équipe est en résistance active. Le coaching n'est pas un
                vaccin : il ne fonctionne que si les acteurs acceptent de travailler.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Faut-il préparer quelque chose avant de commencer ?
              </p>
              <p className="text-gray-700">
                Deux choses : être clair sur pourquoi vous le faites, et communiquer avec votre équipe
                avant le démarrage. Un coaching imposé par la direction sans explication part avec un
                handicap.
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
                  href="/blog/coaching-commercial-diagnostic-ecoute"
                  className="text-mint-green hover:underline font-medium"
                >
                  Coaching commercial diagnostic écoute
                </Link>
                <span className="text-gray-500">
                  {' '}: La première étape avant tout coaching : savoir écouter ce qui se joue vraiment.
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
                  {' '}: Les leviers concrets pour passer de la théorie aux résultats durables.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/bootcamp-commercial-pourquoi-formations-echouent"
                  className="text-mint-green hover:underline font-medium"
                >
                  Bootcamp commercial : pourquoi les formations échouent
                </Link>
                <span className="text-gray-500">
                  {' '}: Le format intensif qui prolonge et renforce le coaching.
                </span>
              </li>
            </ul>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            Le coaching n'est pas une dépense. C'est un investissement dans la transformation durable
            de votre équipe. Et comme tout investissement, il commence par un diagnostic honnête.
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
            Besoin d'en parler plus directement ?
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
