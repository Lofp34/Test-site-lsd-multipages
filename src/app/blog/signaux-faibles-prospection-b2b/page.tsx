import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/signaux-faibles-prospection-b2b';
const heroImage = '/images/blog/signaux-faibles-prospection-b2b/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/signaux-faibles-prospection-b2b/hero.webp';

export const metadata: Metadata = {
  title: 'Signaux faibles en prospection B2B : la méthode pour devancer',
  description:
    'Les meilleurs commerciaux ne prospectent pas plus, ils prospectent mieux. La méthode des signaux faibles pour détecter les opportunités B2B avant vos concurrents.',
  keywords: [
    'signaux faibles prospection B2B',
    'signal based selling',
    'signaux d\'affaires B2B',
    'détecter opportunités commerciales',
    'prospection intelligente',
    'triggers commerciaux',
    'signaux faibles vente',
    'prospection B2B PME',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-30',
  },
  openGraph: {
    title: 'Signaux faibles en prospection B2B : la méthode pour devancer',
    description:
      'Les meilleurs commerciaux ne prospectent pas plus, ils prospectent mieux. La méthode des signaux faibles pour détecter les opportunités B2B avant vos concurrents.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Signaux faibles en prospection B2B : détecter les opportunités avant vos concurrents',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signaux faibles en prospection B2B : la méthode pour devancer',
    description:
      'Les meilleurs commerciaux ne prospectent pas plus, ils prospectent mieux. La méthode des signaux faibles pour détecter les opportunités B2B avant vos concurrents.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/signaux-faibles-prospection-b2b';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover : Le commercial qui prospectait à l\'aveugle découvre les signaux faibles', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-constat.webp`, alt: 'Un commercial qui passe 40 appels par jour sans résultat', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-signal.webp`, alt: 'Le signal qui passe inaperçu : recrutement CFO publié sur LinkedIn', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-declencheur.webp`, alt: 'Le déclic : comprendre que les signaux sont partout autour de nous', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-erreur.webp`, alt: 'L\'erreur classique : voir le signal et ne rien en faire', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-methode.webp`, alt: 'La méthode en 3 étapes : Voir, Trier, Agir', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-scoring.webp`, alt: 'Scoring simple en moins de 24h pour prioriser les signaux', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-message.webp`, alt: 'Message contextualisé : répondre au signal, pas lancer un argumentaire générique', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-resultats.webp`, alt: 'Les résultats : 3 à 5 fois plus de chances de décrocher un rendez-vous', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-coldcall.webp`, alt: 'Le cold calling de masse est mort, place au signal-based selling', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-lecon.webp`, alt: 'La leçon : prospecter moins, écouter mieux', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-cta.webp`, alt: 'CTA - Diagnostic offert sur laurentserre.com', index: 11 },
];

const faqItems = [
  {
    question: 'Qu\'est-ce qu\'un signal faible en prospection B2B ?',
    answer:
      'Un signal faible en prospection B2B est un indice d\'opportunité commerciale qui n\'est pas encore visible par tous. Ce n\'est pas un appel d\'offres, une demande de devis ou un contact entrant. C\'est un déclic publié sur LinkedIn, un mouvement de direction annoncé, un recrutement clé, une levée de fonds, un changement d\'outil. Quelque chose qui dit « cette entreprise est en train de bouger » avant que le besoin soit formalisé.',
  },
  {
    question: 'Comment utiliser les signaux faibles en prospection B2B ?',
    answer:
      'La méthode tient en trois étapes. Voir : s\'abonner aux bons canaux (LinkedIn, presse pros, alertes Google, sites légaux) et noter les signaux quotidiens. Trier : attribuer un score simple en moins de 24h selon trois critères (urgence, adéquation, accessibilité). Agir : envoyer un message contextualisé qui montre que vous avez vu le signal et que vous comprenez ce qu\'il implique. Un commercial qui applique cette méthode a 3 à 5 fois plus de chances de décrocher un rendez-vous.',
  },
  {
    question: 'Quels sont les signaux faibles les plus rentables en B2B ?',
    answer:
      'Les sept signaux les plus rentables sont : (1) changement de direction ou de gouvernance, (2) recrutement d\'un poste clé, (3) levée de fonds ou changement d\'actionnariat, (4) déménagement ou nouveau siège, (5) lancement de produit ou nouveau marché, (6) création d\'un poste qui n\'existait pas avant, (7) publication d\'une offre d\'emploi structurante. Chacun de ces signaux indique une phase de transformation où une entreprise a besoin de nouveaux partenaires.',
  },
  {
    question: 'Quelle est la différence entre prospecter à l\'aveugle et le signal-based selling ?',
    answer:
      'La prospection à l\'aveugle, c\'est appeler des entreprises au hasard avec un script générique. Vous passez 40 appels, vous espérez que quelqu\'un ait besoin de vous au moment où vous appelez. Le signal-based selling, c\'est l\'inverse : vous repérez d\'abord les entreprises qui montrent des signes de besoin ou de transformation, et vous contactez celles-là avec un message qui correspond à leur situation réelle. Vous ne dérangez pas. Vous apportez une réponse à un mouvement que vous avez vu.',
  },
  {
    question: 'Pourquoi les commerciaux voient les signaux mais n\'agissent pas ?',
    answer:
      'C\'est le piège le plus fréquent que je vois en coaching. Le commercial repère un signal, se dit « faudrait que je contacte cette boîte », et passe à autre chose. Pas par paresse. Par surcharge mentale, par manque de méthode, ou parce que son CRM ne l\'aide pas à prioriser. Le cerveau commercial est formaté pour traiter les demandes entrantes, pas pour transformer une observation en action. La solution : un rituel quotidien de 10 minutes pour trier ses signaux et décider lequel mérite un message aujourd\'hui.',
  },
  {
    question: 'Comment la loi Cazenave change-t-elle la prospection B2B en 2026 ?',
    answer:
      'La loi Cazenave interdit le démarchage téléphonique non consenti des particuliers à partir du 11 août 2026. Concrètement, elle réduit massivement les volumes de cold calling B2C. Mais pour le B2B, l\'effet est indirect : les pratiques de prospection de masse vont reculer dans toutes les cultures commerciales. Les entreprises vont devoir miser sur une prospection plus ciblée, plus contextualisée. C\'est exactement ce que permet le signal-based selling. Une prospection qui repose sur des signaux réels plutôt que sur des listes achetées.',
  },
  {
    question: 'Le signal-based selling est-il réservé aux grands comptes ?',
    answer:
      'Non, c\'est une idée reçue. En PME, les signaux faibles sont même plus faciles à repérer parce que les mouvements y sont plus visibles et plus rapides. Un changement de directeur commercial dans une PME de 50 personnes a un impact bien plus immédiat que dans une entreprise de 5000. Un recrutement clé dans une PME signifie souvent un vrai changement de cap. Et comme il y a moins de commerciaux sur le coup, celui qui voit le signal en premier a une vraie longueur d\'avance.',
  },
];

export default function SignauxFaiblesProspectionB2bPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Signaux faibles en prospection B2B : la méthode pour devancer',
        description:
          'Les meilleurs commerciaux ne prospectent pas plus, ils prospectent mieux. La méthode des signaux faibles pour détecter les opportunités B2B avant vos concurrents.',
        image: heroImageAbsolute,
        datePublished: '2026-06-30',
        dateModified: '2026-06-30',
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
          '@id': articleUrl,
        },
        articleSection: 'Prospection B2B / Signaux faibles',
        keywords: [
          'signaux faibles prospection B2B',
          'signal based selling',
          'détecter opportunités commerciales',
          'prospection intelligente',
          'triggers commerciaux',
          'signaux d\'affaires B2B',
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
          { '@type': 'ListItem', position: 3, name: 'Signaux faibles en prospection B2B', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Signaux faibles en prospection B2B</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Prospection B2B / Signaux faibles
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Signaux faibles en prospection B2B : la méthode pour devancer
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
              <time dateTime="2026-06-30">30 juin 2026</time>
              <span>•</span>
              <span>9 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un commercial assis à son bureau, regard concentré devant trois écrans, repérant des signaux faibles sur LinkedIn et la presse professionnelle, vue naturelle avec lumière de bureau"
              width={1200}
              height={630}
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
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              Ce qu'il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Un commercial qui utilise les signaux faibles a 3 à 5 fois plus de chances de décrocher un rendez-vous. La méthode : voir les signaux de transformation (recrutement, levée de fonds, changement de direction), les trier en moins de 24h, et agir avec un message contextualisé. Le cold calling de masse est en train de mourir. Ceux qui prospecteront intelligemment prendront l'avantage.
            </p>
          </div>

          {/* BD Carrousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Le commercial qui prospectait à l'aveugle
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L'histoire de Jérémie, commercial dans une PME, qui passait 40 appels par jour et signait trois deals par an. Laurent lui a montré que des signaux faibles passaient tous les jours sous ses yeux. Recrutements, levées de fonds, changements de direction. Il ne les voyait pas. Quand il a appris à les repérer, sa prospection a changé du tout au tout.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Le commercial qui prospectait à l'aveugle"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-signaux-faibles-prospection-b2b.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (12 planches)
              </Link>
            </div>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vous prospectez encore à l'aveugle ? Diagnostic offert
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La scène qui m'a fait comprendre que quelque chose clochait
          </h2>

          <p className="mb-8">
            Jérémie est commercial dans une PME de services. Il bosse dur. 40 appels par jour, des relances, des mails. Il signe trois, parfois quatre deals par an. Pas mal pour quelqu'un sans méthode structurée. Mais pas assez pour une équipe qui doit doubler son chiffre.
          </p>

          <p className="mb-8">
            Quand il m'a demandé un coaching, j'ai fait ce que je fais toujours : j'ai passé une matinée avec lui à regarder son pipeline et sa façon de prospecter.
          </p>

          <p className="mb-8">
            En milieu de matinée, il scrollait LinkedIn entre deux appels. Il est tombé sur une publication : une PME de 60 personnes venait de recruter un nouveau directeur commercial. Jérémie a levé les yeux : « Tiens, ils recrutent. » Et il a continué à scroller. Il n'a noté nulle part. Il n'a pas écrit un message. Il n'a même pas ouvert le profil.
          </p>

          <p className="mb-8">
            Je lui ai demandé pourquoi. Il m'a regardé, un peu surpris : « Bah, je sais pas quoi lui dire. »
          </p>

          <p className="mb-8">
            Cette scène, je la vois partout. Un signal d'opportunité passe sous les yeux d'un commercial compétent. Il le voit. Il le comprend. Il ne fait rien.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce qu'est vraiment un signal faible
          </h2>

          <p className="mb-8">
            On croit souvent qu'un signal faible est une information difficile à trouver. C'est faux. La plupart des signaux faibles sont sous vos yeux. Sur LinkedIn, dans la presse professionnelle, dans les alertes Google, sur les sites d'offres d'emploi.
          </p>

          <p className="mb-8">
            Ce qui est difficile, ce n'est pas de trouver le signal. C'est de lui donner de l'importance. Le bruit de fond est tellement fort qu'on ne s'arrête plus sur rien.
          </p>

          <p className="mb-8">
            Un signal faible, c'est un mouvement qui dit « cette entreprise est en train de changer ». Et une entreprise qui change a besoin de nouveaux partenaires, de nouveaux outils, de nouvelles compétences. Le rôle du commercial n'est pas de deviner son besoin. C'est d'arriver au moment où ce besoin devient visible.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 7 signaux faibles les plus rentables en B2B
          </h2>

          <p className="mb-8">
            Il y en a des dizaines. Mais dans mon expérience de coaching, sept reviennent tout le temps. Ce sont ceux qui ouvrent le plus de portes en PME :
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-4">
              <strong>1. Changement de direction ou de gouvernance.</strong> Nouveau PDG, nouveau directeur commercial, nouveau directeur financier. Un nouveau dirigeant, c'est une nouvelle stratégie. Et une nouvelle stratégie, c'est potentiellement de nouveaux fournisseurs.
            </p>

            <p className="mb-4">
              <strong>2. Recrutement d'un poste clé.</strong> Si une PME recrute un responsable marketing pour la première fois, c'est qu'elle veut structurer sa génération de leads. Si elle recrute un directeur des ventes, c'est qu'elle veut muscler sa force commerciale. Chaque recrutement structurant est une fenêtre.
            </p>

            <p className="mb-4">
              <strong>3. Levée de fonds ou changement d'actionnariat.</strong> Une PME qui lève des fonds a des projets. Des projets ambitieux. Et souvent besoin de partenaires pour les réaliser.
            </p>

            <p className="mb-4">
              <strong>4. Déménagement ou nouveau siège.</strong> Pas toujours évident à repérer, mais un déménagement coûte cher, prend du temps, et signale une phase de croissance ou de restructuration.
            </p>

            <p className="mb-4">
              <strong>5. Lancement de produit ou attaque d'un nouveau marché.</strong> Quand une PME lance quelque chose de nouveau, elle découvre des problématiques qu'elle n'avait pas avant. Et elle a besoin de gens qui les comprennent.
            </p>

            <p className="mb-4">
              <strong>6. Création d'un poste qui n'existait pas.</strong> Un poste de chef de produit, de responsable RSE, de data analyst. Ça veut dire que l'entreprise entre dans une nouvelle dimension. Et qu'elle va acheter des choses qu'elle n'achetait pas avant.
            </p>

            <p className="text-slate-700">
              <strong>7. Publication d'une offre d'emploi structurante.</strong> Même sans recrutement finalisé, le fait qu'une entreprise cherche un profil précis dit beaucoup de ses priorités. Si elle cherche un commercial senior, c'est qu'elle veut accélérer.
            </p>
          </div>

          <p className="mb-8">
            La bonne nouvelle : ces signaux sont gratuits et accessibles. La mauvaise : tout le monde les voit, presque personne n'agit. C'est là que se joue la différence.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le piège du signal vu mais pas exploité
          </h2>

          <p className="mb-8">
            C'est l'erreur numéro un que je vois en coaching. Le commercial repère un signal, et il passe à autre chose. Pas par manque de motivation. Par manque de réflexe.
          </p>

          <p className="mb-8">
            Le cerveau commercial est formaté pour réagir aux demandes entrantes. Un prospect appelle, un devis est demandé, un email arrive. Le signal, lui, est silencieux. Personne ne vous a demandé quoi que ce soit. Vous devez décider seul que cette information mérite une action.
          </p>

          <p className="mb-8">
            Et c'est là que ça coince. Parce que transformer une observation en action, ça demande une discipline que peu de commerciaux ont installée. Surtout quand le CRM ne les aide pas et que le manager ne demande pas de comptes sur ce sujet.
          </p>

          <p className="mb-8">
            J'ai vu des commerciaux perdre des deals qu'ils auraient pu gagner parce qu'ils sont arrivés trois semaines trop tard. Le signal était là. Le concurrent a été plus rapide. La différence n'était pas le produit. C'était le temps de réaction.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Structurer une prospection qui ne laisse plus passer les signaux
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente inclut un module complet de prospection intelligente : repérage des signaux, scoring en moins de 24h, message contextualisé, rituel quotidien. Vos commerciaux repartent avec une méthode qui transforme l'observation en action.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La méthode en 3 étapes : Voir, Trier, Agir
          </h2>

          <p className="mb-8">
            La méthode que j'utilise avec les équipes que je coache tient en trois mots. Elle se met en place en une semaine. Les résultats arrivent dans le mois.
          </p>

          <p className="mb-3">
            <strong>Voir : s'abonner aux bons canaux.</strong>
          </p>
          <p className="mb-4 text-slate-700">
            LinkedIn est la source numéro un. Suivez les comptes des dirigeants, des directeurs commerciaux, des responsables RH des entreprises de votre secteur. Ajoutez des alertes Google sur vos mots-clés et les noms de vos cibles. Scrutez les sites d'offres d'emploi. Le matin, 10 minutes de veille. Pas plus. L'important n'est pas de tout voir, c'est de créer une habitude.
          </p>

          <p className="mb-3">
            <strong>Trier : attribuer un score simple en moins de 24h.</strong>
          </p>
          <p className="mb-4 text-slate-700">
            Trois critères : urgence (est-ce que ce signal va perdre de la valeur si j'attends ?), adéquation (est-ce que mon offre répond à un vrai besoin dans cette situation ?), accessibilité (est-ce que j'ai un moyen d'entrer en contact ?). Score sur 10. Si c'est 7 ou plus, on agit aujourd'hui. En dessous, on note et on revient dans une semaine. Le scoring ne doit pas être compliqué. Il doit exister.
          </p>

          <p className="mb-3">
            <strong>Agir : envoyer un message contextualisé.</strong>
          </p>
          <p className="text-slate-700">
            Pas de proposition commerciale. Pas de catalogue. Un message qui montre que vous avez vu le signal et que vous comprenez ce qu'il implique. « J'ai vu que vous recrutiez un directeur commercial. Nous accompagnons des PME qui traversent cette phase de structuration. Voulez-vous qu'on échange 15 minutes sur les pièges à éviter ? » Le signal est votre porte d'entrée. La contextualisation est votre crédibilité.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le cold calling de masse est mort
          </h2>

          <p className="mb-8">
            La loi Cazenave entre en application le 11 août 2026. Le démarchage téléphonique non consenti des particuliers est interdit. Pour le B2B, les lignes bougent moins vite sur le plan légal, mais l'effet culturel est massif.
          </p>

          <p className="mb-8">
            Les pratiques de prospection de masse reculent partout. Les listes achetées, les campagnes de 500 appels par jour, les emails non sollicités en rafale : tout ça devient non seulement inefficace, mais contre-productif. Les prospects sont saturés. Ils ne répondent plus. Et quand ils répondent, c'est pour dire « arrêtez de m'appeler ».
          </p>

          <p className="mb-8">
            Le signal-based selling n'est pas une option. C'est la direction dans laquelle tout le monde va devoir aller. Les équipes qui l'auront installé avant les autres auront une longueur d'avance significative. Celles qui continueront à prospecter à l'aveugle verront leurs taux de conversion s'effondrer.
          </p>

          <p className="mb-8">
            Je le vois déjà dans les équipes que j'accompagne. Celles qui ont basculé sur une prospection par signaux faibles ont divisé leur nombre d'appels par trois et multiplié leur taux de rendez-vous par deux. La prospection n'est pas une question de volume. C'est une question de{' '}
            <Link href="/blog/plan-prospection-commerciale-machine-leads-annee" className="text-mint-green hover:underline">
              plan de prospection
            </Link>. Savoir qui contacter, quand, et pourquoi.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le rituel qui change tout
          </h2>

          <p className="mb-8">
            La différence entre un commercial qui fait du signal-based selling et celui qui en parle seulement, c'est le rituel.
          </p>

          <p className="mb-8">
            Tous les matins, 10 minutes. Pas plus. Un carnet, un tableau, une colonne dans le CRM. Vous notez les signaux repérés la veille. Vous les scorez. Vous décidez une action pour le meilleur. Et vous passez à autre chose.
          </p>

          <p className="mb-8">
            Le piège, c'est d'en faire une usine à gaz. Des outils, des alertes, des automatismes, des scores complexes. Non. Le signal-based selling, c'est d'abord un réflexe. Voir un signal. Se poser une question. Envoyer un message.
          </p>

          <p className="mb-8">
            C'est exactement ce que j'explique aux commerciaux en coaching :{' '}
            <Link href="/blog/prospection-b2b-cold-outreach-2026" className="text-mint-green hover:underline">
              la prospection B2B en 2026
            </Link>, c'est moins d'appels, plus d'écoute. Et la{' '}
            <Link href="/blog/minute-verite-60-secondes-avant-call-commercial" className="text-mint-green hover:underline">
              minute de vérité
            </Link> d'un commercial, ce n'est pas son pitch. C'est sa capacité à poser la bonne question au bon moment.
          </p>

          <p className="mb-8 text-lg font-semibold text-blue-ink">
            Les signaux sont partout. Ce qui manque, ce n'est pas l'information. C'est le geste.
          </p>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vos commerciaux prospectent encore à l'aveugle ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic commercial identifie les gaps de méthode dans votre prospection : signaux manqués, scoring absent, messages génériques. 5 minutes pour savoir si votre équipe prospecte intelligemment ou dans le vide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 bg-mint-green text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic offert
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
              >
                Découvrir le Bootcamp
              </Link>
            </div>
          </div>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/blog/plan-prospection-commerciale-machine-leads-annee" className="text-mint-green hover:underline">
                  → Plan de prospection commerciale : construire une machine à leads pour l'année
                </Link>
              </li>
              <li>
                <Link href="/blog/prospection-b2b-cold-outreach-2026" className="text-mint-green hover:underline">
                  → Prospection B2B : le cold outreach en 2026
                </Link>
              </li>
              <li>
                <Link href="/blog/minute-verite-60-secondes-avant-call-commercial" className="text-mint-green hover:underline">
                  → La minute de vérité : les 60 secondes avant un call commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8" id="faq">
              Questions fréquentes
            </h2>
            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-title font-semibold text-blue-ink mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* HubSpot Form */}
          <div className="mt-16">
            <HubSpotForm />
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-mint-green hover:underline text-sm">
              ← Retour au blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
