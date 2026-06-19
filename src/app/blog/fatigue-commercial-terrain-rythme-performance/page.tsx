import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/fatigue-commercial-terrain-rythme-performance';
const heroImage = '/images/blog/fatigue-commercial-terrain/fatigue-commercial-hero.webp';
const ogImage = 'https://www.laurentserre.com/images/blog/fatigue-commercial-terrain/fatigue-commercial-og.jpg';

export const metadata: Metadata = {
  title: 'Fatigue du commercial terrain : comment tenir la distance sans s\'épuiser | Laurent Serre',
  description:
    'Comment éviter l\'épuisement quand on est commercial terrain ? 4 piliers pour tenir la distance : le bon ratio rendez-vous/préparation, les 3 types de journées, le protocole de décompression et l\'indicateur prédictif d\'épuisement.',
  keywords:
    'fatigue commercial terrain solutions, comment tenir la distance en commercial terrain, rythme commercial endurance performance, éviter épuisement vendeur terrain, burnout commercial prévention, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-19',
  },
  openGraph: {
    title: 'Fatigue du commercial terrain : comment tenir la distance sans s\'épuiser',
    description:
      '4 piliers terrain pour éviter l\'épuisement du commercial terrain : ratio rendez-vous/préparation, 3 types de journées, protocole de décompression, indicateur prédictif.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Fatigue du commercial terrain — illustration hero',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fatigue du commercial terrain : comment tenir la distance sans s\'épuiser | Laurent Serre',
    description:
      '4 piliers terrain pour éviter l\'épuisement du commercial terrain et tenir la distance sans s\'épuiser.',
    images: [ogImage],
  },
};

const carouselPrefix = '/images/blog/fatigue-commercial-terrain';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Couverture — Fatigue commercial terrain : retrouver son rythme', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-epuisement.webp`, alt: 'Le constat de l\'épuisement', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-reunion.webp`, alt: 'La réunion commerciale qui tourne en rond', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-questions.webp`, alt: 'Les questions qui dérangent', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-bon-ratio.webp`, alt: 'Le bon ratio rendez-vous / préparation', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-methode-3-journees.webp`, alt: 'La méthode des 3 types de journées', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-journee-offensive.webp`, alt: 'Journée offensive', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-journee-build.webp`, alt: 'Journée build', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-journee-recuperation.webp`, alt: 'Journée récupération', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-decompression.webp`, alt: 'Le protocole de décompression entre deux rendez-vous', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-indicateur.webp`, alt: 'L\'indicateur prédictif d\'épuisement', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-rituel.webp`, alt: 'Le rituel qui change tout', index: 11 },
  { src: `${carouselPrefix}/bd-slide-13-resultat.webp`, alt: 'Les résultats visibles', index: 12 },
  { src: `${carouselPrefix}/bd-slide-14-cta.webp`, alt: 'CTA — Commencez par un diagnostic offert', index: 13 },
];

const faqItems = [
  {
    question: 'Comment éviter l\'épuisement quand on est commercial terrain ?',
    answer:
      'Pour éviter l\'épuisement en tant que commercial terrain, adoptez 4 piliers : 1) respectez un ratio rendez-vous/préparation de 2/1 (deux heures de terrain pour une heure de préparation et débrief), 2) alternez vos journées entre offensive (prospection/rendez-vous), build (préparation/formation) et récupération (administratif/allégé), 3) appliquez un protocole de décompression de 10 minutes entre chaque rendez-vous (pause silencieuse, notes à froid, respiration), 4) surveillez un indicateur prédictif simple : la perte de plaisir à préparer un rendez-vous est le premier signe avant-coureur.',
  },
  {
    question: 'Quel est le bon rythme pour un commercial terrain ?',
    answer:
      'Le bon rythme pour un commercial terrain repose sur l\'alternance de 3 types de journées : offensive (rendez-vous clients et prospection terrain), build (préparation de rendez-vous, formation, mise à jour CRM, veille concurrentielle) et récupération (tâches administratives allégées, débriefs). Ne jamais enchaîner plus de 2 journées offensives de suite sans une journée build ou récupération. Les commerciaux qui tiennent sur la durée ne sont pas ceux qui enchaînent le plus de rendez-vous, mais ceux qui savent alterner les intensités.',
  },
  {
    question: 'Comment gérer la fatigue mentale du commercial terrain ?',
    answer:
      'La fatigue mentale du commercial terrain se gère avec des micro-rituels de décompression entre chaque rendez-vous : 10 minutes de pause sans écran, noter à froid ce qui s\'est vraiment passé dans l\'entretien (pas dans le CRM), fermer les yeux ou marcher 5 minutes. Le piège est d\'enchaîner : un commercial qui sort d\'un rendez-vous et attaque immédiatement le suivant transporte la charge émotionnelle du précédent. Ces 10 minutes ne sont pas du temps perdu, ce sont des minutes de récupération qui préservent l\'acuité commerciale.',
  },
  {
    question: 'Quels sont les signes annonciateurs du burn-out commercial ?',
    answer:
      'Le premier signe prédictif d\'épuisement chez un commercial terrain n\'est pas la baisse de résultats mais la perte de plaisir à préparer un rendez-vous. Un commercial qui « bâcle » sa préparation, qui arrive en retard, qui répète les mêmes arguments sans les adapter, est déjà en zone de fatigue. Le second signe est l\'évitement : le commercial trouve des excuses pour ne pas prendre la route, il préfère un appel plutôt qu\'un déplacement, il « oublie » de relancer. Ces signes précèdent de 3 à 4 semaines la baisse de chiffre.',
  },
  {
    question: 'Que peut faire un manager pour éviter l\'épuisement de ses commerciaux terrain ?',
    answer:
      'Le manager peut agir sur 3 leviers : 1) ajuster les objectifs à la réalité du terrain plutôt que de les maintenir coûte que coûte quand un commercial montre des signes de fatigue, 2) instaurer un rituel de check-in de 10 minutes chaque matin pour détecter les signes avant-coureurs, 3) protéger les journées build et récupération dans l\'agenda — ne pas les sacrifier au premier imprévu. Ce que le manager ne doit pas faire : mettre de la pression supplémentaire, multiplier les réunions internes, ou confondre fatigue passagère et baisse de motivation.',
  },
];

export default function FatigueCommercialTerrainPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Fatigue du commercial terrain : comment tenir la distance sans s\'épuiser',
        description:
          'Comment éviter l\'épuisement quand on est commercial terrain ? 4 piliers pour tenir la distance : le bon ratio rendez-vous/préparation, les 3 types de journées, le protocole de décompression et l\'indicateur prédictif d\'épuisement.',
        image: heroImage,
        datePublished: '2026-06-19',
        dateModified: '2026-06-19',
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
          '@id': articleUrl,
        },
        articleSection: 'Performance commerciale / Management terrain',
        keywords: [
          'fatigue commercial terrain solutions',
          'comment tenir la distance en commercial terrain',
          'rythme commercial endurance performance',
          'éviter épuisement vendeur terrain',
          'burnout commercial prévention',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${articleUrl}#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Fatigue commercial terrain', item: articleUrl },
        ],
      },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Fatigue commercial terrain</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Performance commerciale / Management terrain
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Fatigue du commercial terrain : comment tenir la distance sans s&apos;épuiser
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
              <time dateTime="2026-06-19">19 juin 2026</time>
              <span>•</span>
              <span>8 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Fatigue du commercial terrain — illustration hero"
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              Ce qu&apos;il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Un commercial terrain ne tient pas sur son énergie, il tient sur son rythme. 4 piliers testés sur le terrain pour durer sans s&apos;user : ratio rendez-vous/préparation, 3 types de journées, protocole de décompression, indicateur prédictif d&apos;épuisement.
            </p>
          </div>

          {/* BD Carousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Le commercial à bout de souffle
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire de Julien, commercial terrain depuis 7 ans, qui sent qu&apos;il fatigue et ne sait plus comment reprendre pied. De l&apos;épuisement au rythme qui tient sur la durée.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Fatigue du commercial terrain — retrouver son rythme"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-fatigue-commercial-terrain.pdf"
                className="inline-flex items-center gap-2 text-sm font-medium text-mint-green hover:text-mint-green/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Télécharger le carrousel PDF
              </Link>
            </div>
          </div>

          {/* CTA SOFT — après carrousel */}
          <div className="mb-6 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vos commerciaux fatiguent sans que les chiffres ne le montrent encore ? Faites un diagnostic →
            </Link>
          </div>

          <p className="lead text-xl text-gray-700 leading-relaxed mb-8">
            Le yoga et la méditation ne sauveront pas votre équipe commerciale. Voici ce qui marche vraiment sur le terrain.
          </p>

          <p>
            Je vois souvent des directeurs commerciaux qui découvrent l&apos;épuisement de leurs meilleurs éléments comme une surprise. &laquo; Il tenait tellement bien le rythme &raquo;, &laquo; Je ne l&apos;ai pas vu venir &raquo;. La vérité, c&apos;est que les signes étaient là depuis des semaines. On ne les a pas regardés.
          </p>

          <p>
            Un commercial terrain, c&apos;est 15 à 25 rendez-vous par semaine. Des déplacements. Des relances. Des appels. Des clients qui annulent. Des objectifs qui montent. Et personne pour dire &laquo; tu devrais peut-être lever le pied &raquo;.
          </p>

          <p>
            J&apos;ai accompagné des équipes commerciales entières sur ce sujet. Pas avec des exercices de respiration. Avec des changements de rythme concrets, qui s&apos;appliquent dans l&apos;agenda du lundi matin. Voilà ce qui tient.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pilier 1 : le bon ratio rendez-vous / préparation</h2>

          <p>
            Le piège numéro un du commercial terrain, c&apos;est de croire que &laquo; plus de rendez-vous = plus de ventes &raquo;. C&apos;est faux. Au-delà de 4 rendez-vous par jour, la qualité de l&apos;écoute chute, la préparation devient inexistante, et le débrief se limite à trois lignes dans le CRM.
          </p>

          <p>
            Le ratio que j&apos;applique avec mes clients : <strong>2 heures de rendez-vous pour 1 heure de préparation et 1 heure de débrief</strong>. Pas du temps perdu. Du temps qui construit la vente.
          </p>

          <p>
            Un commercial qui prépare 30 minutes un rendez-vous identifie l&apos;enjeu, le vrai décideur attendu, le point de blocage probable. Un commercial qui enchaîne arrive avec ses arguments génériques et repart sans avoir avancé. La différence, c&apos;est 30 minutes.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pilier 2 : la méthode des 3 types de journées</h2>

          <p>
            Le problème des commerciaux terrain, c&apos;est que toutes leurs journées se ressemblent : départ tôt, rendez-vous, route, rendez-vous, appel, route, retour. Même intensité, même pression, tous les jours.
          </p>

          <p>
            Une équipe que j&apos;ai coachée a testé la segmentation en 3 profils de journée :
          </p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>Journée offensive</strong> : rendez-vous clients, prospection terrain. Pas plus de 2 par semaine.</li>
            <li><strong>Journée build</strong> : préparation de rendez-vous, formation, CRM, veille concurrentielle. 1 à 2 par semaine.</li>
            <li><strong>Journée récupération</strong> : administratif allégé, débriefs, point avec le manager. 1 par semaine.</li>
          </ul>

          <p>
            Résultat après 3 mois : les commerciaux étaient plus performants sur leurs journées offensives parce qu&apos;ils arrivaient préparés. Et ils tenaient mieux la distance parce qu&apos;ils n&apos;enchaînaient pas 5 jours d&apos;affilée au même régime.
          </p>

          <p>
            La règle : <strong>ne jamais enchaîner plus de 2 journées offensives sans une journée build ou récupération</strong>.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pilier 3 : le protocole de décompression entre deux rendez-vous</h2>

          <p>
            Le geste qui use le plus un commercial terrain, ce n&apos;est pas la route ni le rendez-vous difficile. C&apos;est l&apos;enchaînement. Le cerveau n&apos;a pas le temps de &laquo; déposer &raquo; l&apos;entretien précédent qu&apos;il est déjà dans le suivant.
          </p>

          <p>
            Mon protocole est simple et prend 10 minutes :
          </p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li>sortir de la voiture et marcher 3 minutes sans téléphone</li>
            <li>noter à froid 3 choses : ce qui s&apos;est vraiment passé, ce qui a coincé, ce qu&apos;il faut retenir pour le prochain échange</li>
            <li>respirer 10 secondes avant d&apos;entrer chez le client suivant</li>
          </ul>

          <p>
            Ces 10 minutes ne sont pas du temps perdu. Ce sont des minutes de récupération qui préservent l&apos;acuité commerciale. Un commercial qui arrive à son 4e rendez-vous de la journée avec la même fraîcheur qu&apos;au premier, c&apos;est ça qui fait la différence.
          </p>

          {/* CTA MEDIUM — entre piliers 3 et 4 */}
          <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/5 border border-mint-green/20 rounded-2xl p-6 my-10 text-center">
            <p className="text-lg font-title font-bold text-blue-ink mb-3">
              Vous voulez savoir si le rythme de votre équipe est tenable ?
            </p>
            <p className="text-gray-600 mb-5 max-w-xl mx-auto">
              Un diagnostic terrain de 2 heures suffit pour identifier les ajustements qui redonneront de l&apos;air sans perdre en performance.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-ink hover:bg-blue-ink/90 transition-colors"
            >
              Demander un diagnostic offert
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pilier 4 : l&apos;indicateur prédictif d&apos;épuisement</h2>

          <p>
            Les managers attendent souvent la baisse de chiffre pour réagir. Trop tard. Le vrai signal arrive 3 à 4 semaines avant, et il est simple à repérer : <strong>la perte de plaisir à préparer un rendez-vous</strong>.
          </p>

          <p>
            Un commercial qui bâcle sa préparation, qui arrive en retard, qui répète les mêmes arguments sans les adapter à son client, n&apos;est pas feignant. Il est fatigué. La fatigue commerciale ne se manifeste pas par des plaintes. Elle se manifeste par une mécanique qui s&apos;use discrètement.
          </p>

          <p>
            Le second signe, c&apos;est l&apos;évitement : le commercial trouve une raison pour ne pas prendre la route, propose un appel plutôt qu&apos;un déplacement, &laquo; oublie &raquo; de relancer. Ce n&apos;est pas de la démotivation. C&apos;est du carburant qui n&apos;a pas été renouvelé.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que le manager peut faire (et ne doit pas faire)</h2>

          <p>
            Ce que le manager ne doit pas faire : mettre de la pression supplémentaire, multiplier les réunions internes, confondre fatigue passagère et baisse de motivation, ou pire : lancer un challenge commercial quand son meilleur élément est en zone rouge.
          </p>

          <p>
            Ce que le manager peut faire :
          </p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li>ajuster les objectifs à la réalité du terrain</li>
            <li>instaurer un check-in de 10 minutes chaque matin : &laquo; Comment tu te sens aujourd&apos;hui ? &raquo; pas &laquo; Combien de rendez-vous aujourd&apos;hui ? &raquo;</li>
            <li>protéger les journées build et récupération dans l&apos;agenda</li>
            <li>accompagner un commercial fatigué sur une demi-journée terrain pour observer sans juger</li>
          </ul>

          <p>
            Un commercial qui tient la distance ne court pas plus vite. Il court mieux. Il alterne les intensités, il se prépare, il décompresse, et il sait reconnaître les signes avant de tomber.
          </p>

          <p>
            La question que je pose à chaque manager avec qui je travaille : <strong>&laquo; À quand remonte la dernière fois où vous avez demandé à votre meilleur commercial comment il va, vraiment, sans parler de chiffre ? &raquo;</strong>
          </p>

          {/* ════════ POUR ALLER PLUS LOIN ════════ */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/coaching-commercial-terrain-5-leviers-transformation-equipe" className="text-mint-green hover:underline font-medium">
                  Coaching commercial terrain : 5 leviers de transformation d&apos;équipe
                </Link>
                <span className="text-gray-500"> — Les leviers concrets pour transformer une équipe essoufflée en équipe performante.</span>
              </li>
              <li>
                <Link href="/blog/coaching-commercial-terrain-methode-equipe" className="text-mint-green hover:underline font-medium">
                  Coaching commercial terrain : la méthode pour structurer votre équipe
                </Link>
                <span className="text-gray-500"> — Comment structurer durablement une équipe commerciale terrain.</span>
              </li>
              <li>
                <Link href="/blog/blocages-dirigeant-performance-commerciale" className="text-mint-green hover:underline font-medium">
                  Blocages du dirigeant et performance commerciale
                </Link>
                <span className="text-gray-500"> — Identifier les blocages du dirigeant qui freinent la performance de l&apos;équipe.</span>
              </li>
              <li>
                <Link href="/blog/si-vous-pensez-encore-au-boulot-le-week-end-vous-ne-recuperez-pas" className="text-mint-green hover:underline font-medium">
                  Si vous pensez encore au boulot le week-end, vous ne récupérez pas
                </Link>
                <span className="text-gray-500"> — La récupération du dirigeant comme condition de la performance durable.</span>
              </li>
            </ul>
          </div>

          {/* CTA FORT — bloc gradient, 2 boutons */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous sentez que vos commerciaux fatiguent ?</h3>
            <p className="mb-6">
              Beaucoup de dirigeants découvrent l&apos;épuisement de leurs équipes quand les chiffres chutent. Un diagnostic permet de voir où le rythme coince, avant que la performance ne s&apos;effondre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Découvrir le Bootcamp Méthodes de vente
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8">
              Questions fréquentes sur la fatigue du commercial terrain
            </h2>
            <div className="space-y-8">
              {faqItems.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AuthorCard + CTA secondaire */}
          <div className="mt-12">
            <AuthorCard />
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Coach commercial terrain depuis 15 ans. J&apos;accompagne les équipes commerciales de PME B2B à tenir la distance et à performer sans s&apos;épuiser.{' '}
              <Link href="/contact" className="text-mint-green hover:text-mint-green/80 font-medium transition-colors">
                Contactez-moi
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
