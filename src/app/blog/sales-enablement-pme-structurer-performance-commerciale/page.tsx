import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const heroImage = '/images/blog/sales-enablement-pme/sales-enablement-pme-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/sales-enablement-pme/sales-enablement-pme-hero.webp';

export const metadata: Metadata = {
  title: 'Sales enablement PME : structurer la performance commerciale sans se ruiner | Laurent Serre',
  description:
    'Sales enablement pour PME : comment structurer concrètement la performance d\'une équipe de 5 à 50 commerciaux sans logiciel coûteux ni usine à gaz.',
  keywords:
    'sales enablement PME, structurer équipe commerciale, mise en place sales enablement, activation commerciale PME, dispositif de vente PME, performance commerciale PME',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/sales-enablement-pme-structurer-performance-commerciale',
  },
  openGraph: {
    title: 'Sales enablement PME : structurer la performance commerciale sans se ruiner',
    description:
      'Le sales enablement n\'est pas un outil, un département ou un budget. C\'est une discipline de dirigeant de PME.',
    url: 'https://www.laurentserre.com/blog/sales-enablement-pme-structurer-performance-commerciale',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: 'Un dirigeant présente une stratégie commerciale à son équipe autour d\'un tableau blanc dans une PME',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales enablement PME : structurer la performance commerciale sans se ruiner',
    description:
      'Le sales enablement n\'est pas un outil, un département ou un budget. C\'est une discipline de dirigeant de PME.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/carrousel-sales-enablement-pme';

const carouselImages = [
  { src: `${carouselPrefix}/01-cover.webp`, alt: 'Cover : Sales enablement PME', index: 0 },
  { src: `${carouselPrefix}/02-scene.webp`, alt: 'Le dirigeant et son commercial analysent les performances', index: 1 },
  { src: `${carouselPrefix}/03-declic.webp`, alt: 'Prise de conscience : désordre organisé dans l\'équipe', index: 2 },
  { src: `${carouselPrefix}/04-supports-trop.webp`, alt: 'Trop de supports inutilisables', index: 3 },
  { src: `${carouselPrefix}/05-supports-disperses.webp`, alt: 'Supports dispersés, message pas clair', index: 4 },
  { src: `${carouselPrefix}/06-mauvais-support.webp`, alt: 'Mauvais support qui dessert le commercial', index: 5 },
  { src: `${carouselPrefix}/07-debrief.webp`, alt: 'Débrief hebdomadaire structuré', index: 6 },
  { src: `${carouselPrefix}/08-fiche-terrain.webp`, alt: 'Fiche terrain prête à l\'emploi', index: 7 },
  { src: `${carouselPrefix}/09-avant-rdv.webp`, alt: 'Préparation de rendez-vous', index: 8 },
  { src: `${carouselPrefix}/10-rdv-cadre.webp`, alt: 'Rendez-vous commercial cadré', index: 9 },
  { src: `${carouselPrefix}/11-retour-rdv.webp`, alt: 'Retour sur le rendez-vous', index: 10 },
  { src: `${carouselPrefix}/12-structuration.webp`, alt: 'Structuration de l\'approche commerciale', index: 11 },
];

export default function SalesEnablementPMEPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Sales enablement PME : structurer la performance commerciale sans se ruiner',
    description:
      'Le sales enablement n\'est pas un outil, un département ou un budget. C\'est une discipline de dirigeant de PME. Voici comment structurer concrètement la performance d\'une équipe de 5 à 50 commerciaux.',
    image: heroImageAbsolute,
    datePublished: '2026-06-02',
    dateModified: '2026-06-02',
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
      '@id': 'https://www.laurentserre.com/blog/sales-enablement-pme-structurer-performance-commerciale',
    },
    articleSection: 'Performance commerciale / Structuration équipe',
    keywords: [
      'sales enablement PME',
      'structurer équipe commerciale',
      'performance commerciale',
      'dispositif de vente PME',
      'accompagnement commercial',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'C\'est quoi le sales enablement ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'C\'est l\'ensemble des moyens qu\'on donne à une équipe commerciale pour vendre mieux : message, supports, outils, méthodes, rythme de progrès.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelle différence entre sales enablement et formation ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La formation apporte des connaissances. Le sales enablement construit l\'environnement pour que les connaissances soient appliquées. On peut former les gens pendant des années, si le cadre ne suit pas, ça ne sert à rien.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment mettre en place un sales enablement en PME ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En commençant par le plus simple : clarifier le message commercial, créer quelques vrais supports terrain, instaurer un rythme de débrief hebdomadaire, et mesurer qui utilise quoi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quels sont les outils de sales enablement ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Des outils gratuits comme HubSpot CRM, Google Docs, Trello, Notion ou Canva suffisent pour commencer. Le plus important n\'est pas l\'outil, c\'est la discipline de l\'équipe.',
        },
      },
      {
        '@type': 'Question',
        name: 'Le sales enablement est-il réservé aux grands comptes ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non. C\'est même plus utile en PME, parce qu\'on n\'a pas de département marketing pour compenser les incohérences. Chaque euro dépensé en vente compte.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel budget pour un sales enablement ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Presque zéro pour commencer. Les outils gratuits, le temps du manager pour clarifier le message, une heure par semaine de débrief. L\'investissement, c\'est le temps, pas l\'argent.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment mesurer le ROI du sales enablement ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Regardez le ressenti des commerciaux, le temps de cycle, le taux de transformation, et la confiance de l\'équipe en rendez-vous. Le ROI est visible sur le chiffre, mais il passe d\'abord par des gestes qui changent.',
        },
      },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
              <li className="text-blue-ink font-medium" aria-current="page">Sales enablement PME</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Performance commerciale / Structuration équipe</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Sales enablement PME : structurer la performance commerciale sans se ruiner
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-06-02">2 juin 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un dirigeant présente une stratégie commerciale à son équipe autour d'un tableau blanc dans une PME"
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
          {/* AuthorCard top */}
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">✨ Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Le sales enablement n&apos;est pas un département de grand compte ou un logiciel à 50 000 euros. C&apos;est une discipline simple : clarifier le message, outiller les commerciaux, ritualiser les débriefs. Cet article vous montre comment faire, sans budget, avec des outils gratuits, et par où commencer dès demain.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Sales enablement PME en action
            </p>
            <p className="text-sm text-amber-700 mb-5">
              12 planches illustrées, du constat à la structuration.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Sales enablement PME"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-sales-enablement-pme.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (12 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA diagnostic */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vous ne savez pas par où commencer pour structurer votre équipe ? Faites un diagnostic offert →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#probleme" className="text-mint-green hover:underline">Le vrai problème : un désordre organisé</a></li>
              <li><a href="#ce-que-change" className="text-mint-green hover:underline">Ce que le sales enablement change concrètement</a></li>
              <li><a href="#piege" className="text-mint-green hover:underline">Le piège à éviter</a></li>
              <li><a href="#outils" className="text-mint-green hover:underline">Et les outils gratuits ?</a></li>
              <li><a href="#mesure" className="text-mint-green hover:underline">Comment mesurer que ça marche ?</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">FAQ Sales Enablement PME</a></li>
            </ul>
          </div>

          {/* Contenu */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Je suis dans le bureau de Marc, dirigeant d&apos;une PME de 35 personnes. Il me dit :
          </p>

          <p className="mb-8">
            « Mes commerciaux travaillent. Ils enchaînent les rendez-vous. Mais le chiffre ne suit pas. Je ne sais pas ce qui cloche. »
          </p>

          <p className="mb-8">
            Je lui demande : « Qu&apos;est-ce que tu leur donnes pour vendre ? »
          </p>

          <p className="mb-8">
            Il me regarde, un peu gêné. « Ben... le catalogue. Et le PPT qu&apos;on a fait en trois heures l&apos;année dernière. »
          </p>

          <p className="mb-8">
            Marc me dit ça et il a raison de s&apos;inquiéter. Il a une équipe de huit commerciaux, huit personnes qui font du chiffre, mais huit visions différentes de ce qu&apos;il faut dire au client. Huit manières de se présenter. Huit façons de répondre aux objections.
          </p>

          <p className="mb-8">
            C&apos;est ce qu&apos;on appelle le sales enablement, même si le nom fait peur. Le principe est simple : donner à une équipe commerciale ce dont elle a vraiment besoin pour vendre. Pas un catalogue. Pas une présentation PowerPoint bricolée. Un vrai système qui structure la performance.
          </p>

          <p className="mb-8">
            Et ça n&apos;a rien à voir avec un département de grands comptes ou un logiciel à 50 000 euros.
          </p>

          {/* Le vrai problème */}
          <h2 id="probleme" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Le vrai problème : un désordre organisé</h2>

          <p className="mb-8">
            Dans une PME, le fondateur a construit son offre tout seul. Il sait la vendre parce qu&apos;il l&apos;a créée. Mais la transmettre, c&apos;est autre chose.
          </p>

          <p className="mb-8">
            Résultat : chaque commercial improvise sa version. L&apos;un parle technique. L&apos;autre parle prix. Le troisième raconte sa vie.
          </p>

          <p className="mb-8">
            Le client, lui, entend trois messages différents pour la même entreprise.
          </p>

          <p className="mb-8">
            Le problème n&apos;est pas que les commerciaux ne sont pas bons. Le problème est qu&apos;ils n&apos;ont pas de base commune. Pas de message. Pas de support qui tienne la route. Pas de méthode pour avancer dans la vente.
          </p>

          {/* Ce que ça change */}
          <h2 id="ce-que-change" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que le sales enablement change concrètement</h2>

          <p className="mb-8">
            Je ne parle pas d&apos;installer un CRM sophistiqué ou d&apos;embaucher un directeur du revenue operations. Je parle de choses simples, qui coûtent peu et qui rapportent vite.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Un message commercial clarifié.</p>
          <p className="mb-8">
            Le premier travail, c&apos;est de mettre tout le monde d&apos;accord sur ce qu&apos;on vend et pourquoi c&apos;est différent. Pas dans un discours corporate. Dans une phrase qu&apos;un commercial peut dire sans la réciter.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Des supports qui servent vraiment.</p>
          <p className="mb-8">
            Pas une présentation de cinquante slides. Quelques pages : qui sont nos clients, quel problème on résout, comment on le résout, combien ça coûte, pourquoi nous plutôt qu&apos;un autre.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Des outils qui aident à vendre.</p>
          <p className="mb-8">
            Des fiches objections. Des questions de découverte. Un canevas de qualification. Rien de sophistiqué. Des documents qu&apos;un commercial peut ouvrir dans sa voiture avant un rendez-vous.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Un rythme de débrief qui tient.</p>
          <p className="mb-8">
            Une heure par semaine pour regarder ce qui marche, ce qui coince, ce qu&apos;on ajuste. Pas de réunion five stars. Un vrai temps pour progresser ensemble.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Une mesure de ce qui est utilisé.</p>
          <p className="mb-8">
            Pas besoin de Salesforce. Un simple tableau : qui utilise les supports, qui progresse, qui décroche.
          </p>

          {/* Mid-article CTA Diagnostic */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              🎯 Vous voulez savoir si votre équipe est prête ?
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Un diagnostic offert d&apos;une demi-journée permet d&apos;identifier les vrais freins. Pas de méthode toute faite, pas de promesses en l&apos;air.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Demander un diagnostic offert →
            </Link>
          </div>

          {/* Le piège */}
          <h2 id="piege" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Le piège à éviter</h2>

          <p className="mb-8">
            Le piège, c&apos;est de croire que le sales enablement, c&apos;est faire plus de formations. On envoie les commerciaux en stage. Ils reviennent enthousiastes. Trois semaines plus tard, tout est oublié.
          </p>

          <p className="mb-8">
            Parce que le problème n&apos;est pas ce qu&apos;ils savent. C&apos;est ce qu&apos;ils font. Et ce qu&apos;ils font dépend de l&apos;environnement qu&apos;on leur crée.
          </p>

          <p className="mb-8">
            Si vous voulez que vos commerciaux vendent mieux, ne leur donnez pas un cours. Donnez-leur un cadre, des outils, un rythme. Et arrêtez de les laisser improviser seuls face au client.
          </p>

          {/* Outils gratuits */}
          <h2 id="outils" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Et les outils gratuits ?</h2>

          <p className="mb-8">
            Oui, il existe des outils gratuits qui peuvent aider. HubSpot CRM en version gratuite pour le suivi. Google Docs pour les fiches. Trello ou Notion pour organiser les contenus. Canva pour des visuels propres sans designer.
          </p>

          <p className="mb-8">
            Mais l&apos;outil n&apos;est jamais le problème. Le problème, c&apos;est la discipline de l&apos;équipe à utiliser ce qu&apos;on met en place. Vous pouvez avoir le meilleur CRM du monde, si personne ne le remplit, vous revenez au désordre organisé.
          </p>

          {/* Mesure */}
          <h2 id="mesure" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Comment mesurer que ça marche ?</h2>

          <p className="mb-8">
            Franchement, le premier indicateur, c&apos;est le ressenti des commerciaux. Si vos vendeurs vous disent qu&apos;ils ont plus de munitions en entrant chez un client, que les objections les déstabilisent moins, qu&apos;ils savent quoi dire après la question &laquo; c&apos;est combien ? &raquo;, vous êtes sur la bonne voie.
          </p>

          <p className="mb-8">
            Après, vous regardez des choses simples : le temps de cycle baisse ? Le taux de transformation monte ? Les commerciaux gagnent en confiance ?
          </p>

          <p className="mb-8">
            Le ROI du sales enablement en PME n&apos;est pas un calcul à quatre chiffres après la virgule. C&apos;est une équipe qui vend mieux avec les mêmes ressources.
          </p>

          {/* Articles liés */}
          <div className="mt-12 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📖 Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/playbook-commercial-guide-pratique-terrain" className="text-mint-green hover:underline font-medium">
                  Playbook commercial : le guide pratique pour créer celui qui va vraiment être utilisé
                </Link>
                <span className="block text-gray-500 mt-0.5">Comment construire des supports de vente que les commerciaux utiliseront.</span>
              </li>
              <li>
                <Link href="/blog/kpis-commerciaux-pme-indicateurs-vous-cachent" className="text-mint-green hover:underline font-medium">
                  Les KPIs commerciaux en PME : ce que vos indicateurs vous cachent
                </Link>
                <span className="block text-gray-500 mt-0.5">Mesurer ce qui compte vraiment dans la performance d&apos;une équipe.</span>
              </li>
              <li>
                <Link href="/blog/performance-commerciale-pme-5-leviers-dirigeant" className="text-mint-green hover:underline font-medium">
                  Performance commerciale en PME : les 5 leviers que les dirigeants négligent
                </Link>
                <span className="block text-gray-500 mt-0.5">Les vrais leviers de la performance commerciale.</span>
              </li>
              <li>
                <Link href="/blog/coaching-commercial-terrain-methode-equipe" className="text-mint-green hover:underline font-medium">
                  Coaching commercial terrain : la méthode qui transforme vraiment les pratiques de votre équipe
                </Link>
                <span className="block text-gray-500 mt-0.5">Le coaching terrain comme levier de structuration.</span>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">FAQ Sales Enablement PME</h2>

          <div className="space-y-6 mb-8">
            <div>
              <p className="font-semibold text-blue-ink mb-1">C&apos;est quoi le sales enablement ?</p>
              <p className="text-gray-700">C&apos;est l&apos;ensemble des moyens qu&apos;on donne à une équipe commerciale pour vendre mieux : message, supports, outils, méthodes, rythme de progrès.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Quelle différence entre sales enablement et formation ?</p>
              <p className="text-gray-700">La formation apporte des connaissances. Le sales enablement construit l&apos;environnement pour que les connaissances soient appliquées. On peut former les gens pendant des années, si le cadre ne suit pas, ça ne sert à rien.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Comment mettre en place un sales enablement en PME ?</p>
              <p className="text-gray-700">En commençant par le plus simple : clarifier le message commercial, créer quelques vrais supports terrain, instaurer un rythme de débrief hebdomadaire, et mesurer qui utilise quoi.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Quels sont les outils de sales enablement ?</p>
              <p className="text-gray-700">Des outils gratuits comme HubSpot CRM, Google Docs, Trello, Notion ou Canva suffisent pour commencer. Le plus important n&apos;est pas l&apos;outil, c&apos;est la discipline de l&apos;équipe.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Le sales enablement est-il réservé aux grands comptes ?</p>
              <p className="text-gray-700">Non. C&apos;est même plus utile en PME, parce qu&apos;on n&apos;a pas de département marketing pour compenser les incohérences. Chaque euro dépensé en vente compte.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Quel budget pour un sales enablement ?</p>
              <p className="text-gray-700">Presque zéro pour commencer. Les outils gratuits, le temps du manager pour clarifier le message, une heure par semaine de débrief. L&apos;investissement, c&apos;est le temps, pas l&apos;argent.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Comment mesurer le ROI du sales enablement ?</p>
              <p className="text-gray-700">Regardez le ressenti des commerciaux, le temps de cycle, le taux de transformation, et la confiance de l&apos;équipe en rendez-vous. Le ROI est visible sur le chiffre, mais il passe d&apos;abord par des gestes qui changent.</p>
            </div>
          </div>

          {/* CTA gradient final */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez structurer la performance de votre équipe commerciale ?</h3>
            <p className="mb-6">
              Beaucoup de dirigeants pensent qu&apos;il faut un logiciel coûteux ou un département dédié. La réalité est plus simple : commencer par clarifier le message, outiller les commerciaux et ritualiser les débriefs. Un diagnostic offert permet de voir où ça coince vraiment.
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
            Le sales enablement en PME n&apos;est pas un département, un logiciel ou un budget. C&apos;est une discipline : clarifier, outiller, ritualiser, mesurer. Et ça commence par un diagnostic offert pour voir où ça coince vraiment.
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
            Besoin d&apos;en parler plus directement ?
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
            ← Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
