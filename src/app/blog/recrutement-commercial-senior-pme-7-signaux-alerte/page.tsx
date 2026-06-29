import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/recrutement-commercial-senior-pme-7-signaux-alerte';
const heroImage = '/images/blog/recrutement-commercial-senior-pme-7-signaux-alerte/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/recrutement-commercial-senior-pme-7-signaux-alerte/hero.webp';

export const metadata: Metadata = {
  title: 'Recruter un commercial senior en PME : 7 signaux d\'alerte à ne pas manquer',
  description:
    'Un mauvais recrutement commercial senior coûte 150 000€ à une PME. Les 7 signaux d\'alerte à vérifier en entretien et les 3 questions qui révèlent un faux profil senior.',
  keywords: [
    'recrutement commercial senior PME',
    'intégration commercial expérimenté',
    'signaux alerte entretien commercial',
    'pièges recrutement vendeur senior',
    'recrutement force de vente PME',
    'faux profil senior commercial',
    'questions entretien commercial',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-29',
  },
  openGraph: {
    title: 'Recruter un commercial senior en PME : 7 signaux d\'alerte à ne pas manquer',
    description:
      'Un mauvais recrutement commercial senior coûte 150 000€. Les 7 signaux d\'alerte à vérifier en entretien et les 3 questions qui révèlent un faux profil senior.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Recruter un commercial senior en PME : 7 signaux d\'alerte à ne pas manquer — Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recruter un commercial senior en PME : 7 signaux d\'alerte à ne pas manquer',
    description:
      'Un mauvais recrutement commercial senior coûte 150 000€. Les 7 signaux d\'alerte et les 3 questions qui révèlent un faux profil senior.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/recrutement-commercial-senior-pme-7-signaux-alerte';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover — Recruter un commercial senior en PME : 7 signaux d alerte', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-dilemme.webp`, alt: 'Le dilemme du dirigeant : un CV parfait mais une question qui dérange', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-cv-parfait.webp`, alt: 'Un candidat au CV parfait qui évite les questions gênantes', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-evaporation.webp`, alt: 'Premier signal : l évaporation des résultats, aucun échec racontable', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-pas-echec.webp`, alt: 'Un commercial senior sans échec n a pas appris, il a masqué', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-questions.webp`, alt: 'Les trois questions qui révèlent un vrai profil senior', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-onze-mois.webp`, alt: 'Un senior ne prend pas six mois pour prendre ses marques', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-integration.webp`, alt: 'Les 90 premiers jours : la seule vraie période de test', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-sept-signaux.webp`, alt: 'Les 7 signaux d alerte pour un recrutement commercial senior', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-bon-profil.webp`, alt: 'Le bon profil : celui qui parle de ses échecs avant ses succès', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-lecon.webp`, alt: 'Leçon : un mauvais recrutement coûte 150 000 euros', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-cta.webp`, alt: 'CTA — Diagnostic offert sur laurentserre.com', index: 11 },
];

const faqItems = [
  {
    question: 'Qu\'est-ce qu\'un commercial senior en PME ?',
    answer:
      'Un commercial senior en PME, c\'est un vendeur expérimenté capable d\'apporter immédiatement un portefeuille, une méthode de vente et une autonomie complète sur le terrain. Il ne demande pas d\'accompagnement quotidien. Il sait pitcher, qualifier, négocier et clore. En PME, on attend de lui qu\'il tienne son budget seul dès le troisième mois.',
  },
  {
    question: 'Combien coûte un mauvais recrutement commercial senior ?',
    answer:
      'Entre 100 000 et 150 000 euros en année 1. Entre le salaire, les charges, le temps du manager, la perte de chiffre d\'affaires sur les comptes qu\'il aurait dû développer, les clients mal traités, et le coût de recommencer le recrutement. Sans compter l\'impact sur l\'équipe et la perte de crédibilité auprès des prospects.',
  },
  {
    question: 'Quels signaux d\'alerte vérifier en entretien d\'embauche ?',
    answer:
      'Sept signaux : (1) impossible de décrire un échec, (2) qualification par chiffre d\'affaires uniquement, (3) parcours sans progression claire, (4) références qui ne répondent pas, (5) il a passé plus de six mois sans rapporter dans son dernier poste, (6) le salaire est son seul critère de choix, (7) il n\'a pas de méthode de vente structurée.',
  },
  {
    question: 'Les 3 questions qui révèlent un faux profil senior ?',
    answer:
      'Première question : « Décris ta pire année, jour par jour. » Le faux senior élude ou généralise. Le vrai raconte précisément ce qui n\'a pas marché. Deuxième question : « Comment qualifies-tu un prospect ? » Si la réponse est « par le CA potentiel », le candidat n\'a pas de méthode structurée. Troisième question : « Qu\'as-tu fait les six premiers mois de ton dernier poste ? » Le vrai senior a déjà ramené des résultats en trois mois.',
  },
  {
    question: 'Comment intégrer un commercial senior en PME ?',
    answer:
      'Planifier les 90 premiers jours avant la signature. Mois 1 : découverte des comptes, premiers rendez-vous, qualification du portefeuille. Mois 2 : premiers deals, méthode de reporting, ajustement des cibles. Mois 3 : objectifs tenus, autonomie complète. Si au bout du premier mois le senior n\'a pas rencontré ses trois premiers prospects, le process d\'intégration a un problème.',
  },
  {
    question: 'Quelle différence entre un commercial senior et un commercial confirmé ?',
    answer:
      'Le commercial confirmé sait vendre. Le senior sait vendre, qualifier, prioriser, former les autres, structurer un plan de compte et anticiper les objections du dirigeant. Le senior apporte une méthode, pas seulement un carnet d\'adresses. Il ne demande pas qu\'on lui fixe des objectifs réalistes : il les pose lui-même, et il les tient.',
  },
];

export default function RecrutementCommercialSeniorPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Recruter un commercial senior en PME : 7 signaux d\'alerte à ne pas manquer',
        description:
          'Un mauvais recrutement commercial senior coûte 150 000€ à une PME. Les 7 signaux d\'alerte à vérifier en entretien et les 3 questions qui révèlent un faux profil senior.',
        image: heroImageAbsolute,
        datePublished: '2026-06-29',
        dateModified: '2026-06-29',
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
        articleSection: 'Recrutement / Management',
        keywords: [
          'recrutement commercial senior PME',
          'intégration commercial expérimenté',
          'signaux alerte entretien commercial',
          'pièges recrutement vendeur senior',
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
          { '@type': 'ListItem', position: 3, name: 'Recruter un commercial senior en PME', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Recruter un commercial senior en PME</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Recrutement / Management
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Recruter un commercial senior en PME : 7 signaux d&apos;alerte à ne pas manquer
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
              <time dateTime="2026-06-29">29 juin 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Recruter un commercial senior en PME : 7 signaux d'alerte à ne pas manquer"
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
              Ce qu&apos;il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Un mauvais recrutement commercial senior coûte 100 à 150 000€ à une PME en année 1. Les 7 signaux d&apos;alerte à vérifier en entretien et les 3 questions qui révèlent un faux profil senior. La méthode pour intégrer son nouveau senior en 90 jours.
            </p>
          </div>

          {/* BD Carrousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Les 7 signaux d&apos;alerte
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire d&apos;un dirigeant de PME qui pensait avoir trouvé le candidat idéal. CV parfait, parcours impressionnant, sourire professionnel. Mais trois questions ont tout changé.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Recruter un commercial senior en PME"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-recrutement-senior.pdf"
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
              Vous recrutez un commercial senior ? Testez votre process avant de signer
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Pourquoi le recrutement d&apos;un senior en PME est un pari différent
          </h2>

          <p className="mb-8">
            Franck dirige une PME de 25 personnes dans les services industriels. Il y a six mois, il a recruté un commercial senior. CV solide, vingt ans de terrain, un carnet d&apos;adresses qui faisait rêver. Six mois plus tard, le commercial est parti. Franck a perdu 85 000 euros de salaire et charges, trois clients mécontents, et quatre semaines de son temps.
          </p>

          <p className="mb-8">
            Franck m&apos;a appelé après. « Je ne comprends pas. Le gars avait tout pour réussir. »
          </p>

          <p className="mb-8">
            En déroulant l&apos;entretien d&apos;embauche avec lui, on a vu les signaux. Franck les avait vus, mais il ne savait pas les lire. Le candidat ne décrivait aucun échec. Il qualifiait ses prospects uniquement par leur chiffre d&apos;affaires potentiel. Il avait pris six mois pour « prendre ses marques » dans son dernier poste. Autant de signaux que j&apos;apprends à repérer aux dirigeants que j&apos;accompagne.
          </p>

          <p className="mb-8">
            Recruter un commercial senior en PME, ce n&apos;est pas recruter un commercial. C&apos;est un pari sur quelqu&apos;un qui doit rapporter tout de suite. Pas de période d&apos;adaptation. Pas d&apos;accompagnement quotidien. Le dirigeant n&apos;a pas le temps d&apos;attendre six mois pour savoir si le nouveau tient la route.
          </p>

          <p className="mb-8">
            Le coût d&apos;erreur est massif. Entre le salaire, les charges, le temps du dirigeant passé à superviser, les clients mal traités pendant la période d&apos;essai, et le coût de recommencer le recrutement, on arrive vite à 150 000 euros pour un an.
          </p>

          <p className="mb-8">
            C&apos;est pour ça que j&apos;ai formalisé les signaux que je vérifie systématiquement avec les dirigeants que je coache. Et les trois questions qui font tomber les masques.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 7 signaux d&apos;alerte
          </h2>

          <p className="mb-8">
            Chaque dirigeant que j&apos;accompagne reçoit cette liste avant de recruter. Elle ne remplace pas l&apos;intuition. Elle la muscle.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            1. Les résultats s&apos;évaporent quand on gratte
          </h3>

          <p className="mb-8">
            Le candidat annonce des chiffres impressionnants. « J&apos;ai multiplié le portefeuille par trois. » Mais dès qu&apos;on lui demande le détail — combien de clients, sur quelle période, avec quelle marge — le flou s&apos;installe. Un vrai senior donne des chiffres précis parce qu&apos;il les connaît.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            2. Aucune perte racontable
          </h3>

          <p className="mb-8">
            Le candidat n&apos;a jamais perdu un deal. Il n&apos;a jamais raté un objectif. Il n&apos;a jamais été viré. Vingt ans de carrière sans un échec : ça n&apos;existe pas. Ou alors le candidat n&apos;a jamais pris de risque. Les deux sont des signaux très clairs.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            3. Qualification par chiffre d&apos;affaires uniquement
          </h3>

          <p className="mb-8">
            Sa seule méthode pour qualifier un prospect, c&apos;est le potentiel de CA. Il ne parle pas de critères de décision, de cycle d&apos;achat, de processus interne, de maturité du besoin. Un senior a une méthode de qualification structurée. Un commercial qui qualifie uniquement par le CA n&apos;a pas de méthode. Il va perdre du temps sur des comptes sans issue.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            4. Parcours sans progression claire
          </h3>

          <p className="mb-8">
            Le CV montre des changements de poste fréquents, mais pas de progression. Même secteur, même périmètre, même niveau de responsabilité. Pendant quinze ans. Un senior qui n&apos;a pas évolué n&apos;a peut-être pas la maturité pour gérer un portefeuille complexe en autonomie.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            5. Six mois &laquo; pour prendre ses marques &raquo;
          </h3>

          <p className="mb-8">
            Quand on lui demande ce qu&apos;il a fait les six premiers mois de son dernier poste, la réponse est vague. « J&apos;ai pris mes marques », « j&apos;ai appris le produit », « j&apos;ai rencontré l&apos;équipe ». Un senior digne de ce nom a déjà amené ses premiers résultats en trois mois. Pas en six.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            6. Les références ne rappellent pas
          </h3>

          <p className="mb-8">
            Les anciens employeurs contactés mettent du temps à répondre, ou répondent de façon évasive. C&apos;est le signal le plus sous-estimé. Si une référence met plus de trois jours à rappeler, il y a une raison. Il faut creuser ou passer.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            7. Le salaire est le seul critère
          </h3>

          <p className="mb-8">
            Le candidat pose des questions sur le salaire, le variable, les avantages, la voiture de fonction. Mais il n&apos;a pas de questions sur la stratégie, l&apos;équipe, le produit, les clients. Un senior qui ne s&apos;intéresse qu&apos;à sa rémunération est un mercenaire. Et un mercenaire part dès qu&apos;on lui propose 5 000 euros de plus ailleurs.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 3 questions qui révèlent un faux profil senior
          </h2>

          <p className="mb-8">
            Au-delà des signaux, il y a les questions qui font le tri immédiatement. Je les ai testées sur le terrain des dizaines de fois. Elles fonctionnent systématiquement.
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-4">
              <strong>Question 1 : &laquo; Décris ta pire année, jour par jour. &raquo;</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Le faux senior élude. « J&apos;ai eu des années difficiles mais j&apos;ai toujours rebondi. » Le vrai senior raconte précisément ce qui n&apos;a pas marché : le produit qui n&apos;était pas adapté, le marché qui s&apos;est retourné, le manager qui n&apos;a pas accompagné. Il nomme les causes. Il montre qu&apos;il a compris pourquoi ça n&apos;a pas fonctionné.
            </p>

            <p className="mb-4">
              <strong>Question 2 : &laquo; Comment qualifies-tu un prospect ? &raquo;</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Si la réponse est « par le chiffre d&apos;affaires potentiel », le candidat n&apos;a pas de méthode de qualification structurée. Un vrai senior énumère des critères : le besoin réel, le budget, le processus de décision, le timing, l&apos;accès aux décideurs, la maturité du projet.
            </p>

            <p className="mb-4">
              <strong>Question 3 : &laquo; Qu&apos;as-tu fait les six premiers mois de ton dernier poste ? &raquo;</strong>
            </p>
            <p className="text-slate-700">
              Le faux senior dit « j&apos;ai pris mes marques » ou « j&apos;ai appris le produit ». Le vrai senior décrit des actions concrètes : « j&apos;ai rencontré mes 30 plus gros comptes en deux semaines », « j&apos;ai qualifié le portefeuille en un mois », « j&apos;ai déjà signé trois deals en mois 3 ».
            </p>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L&apos;intégration des 90 premiers jours
          </h2>

          <p className="mb-8">
            Si les signaux sont passés et que les trois questions ont tenu, il reste une étape cruciale : l&apos;intégration. Je vois trop de dirigeants signer un bon candidat, puis le laisser seul sur le terrain sans cadre ni suivi.
          </p>

          <p className="mb-8">
            Avec les équipes que j&apos;accompagne, je planifie les 90 premiers jours avant la signature du contrat. Le plan est simple :
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-3">
              <strong>Mois 1 : Découverte et qualification.</strong> Le nouveau senior rencontre ses comptes, qualifie le portefeuille, identifie les deals existants, pose ses premiers rendez-vous. À la fin du mois 1, il doit être capable de présenter son plan de comptes priorisé.
            </p>
            <p className="mb-3">
              <strong>Mois 2 : Premiers deals et ajustement.</strong> Il signe ses premiers deals, ajuste ses cibles en fonction de la réalité du terrain, met en place son reporting. Le dirigeant vérifie que la méthode de vente est la bonne et que les prévisions tiennent.
            </p>
            <p className="text-slate-700">
              <strong>Mois 3 : Autonomie complète.</strong> Le senior tient ses objectifs sans accompagnement quotidien. Il propose des ajustements stratégiques. Le dirigeant peut se concentrer sur autre chose.
            </p>
          </div>

          <p className="mb-8">
            Je pose une règle simple aux dirigeants que je coache : si au bout du premier mois le nouveau senior n&apos;a pas rencontré ses trois premiers prospects en rendez-vous physique, quelque chose cloche. Pas dans le senior. Dans le process d&apos;intégration.
          </p>

          <p className="mb-8">
            Et si ça ne marche pas, la période d&apos;essai existe pour ça. Je vois des dirigeants hésiter à l&apos;utiliser. Ils gardent quelqu&apos;un qui ne convient pas parce qu&apos;ils ont peur de se tromper. Résultat : ils perdent six mois et 80 000 euros au lieu d&apos;un mois et 10 000.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Maîtriser le recrutement commercial
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente inclut un module recrutement commercial : grille d&apos;entretien senior, 3 questions clés, plan d&apos;intégration 90 jours.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous recrutez un commercial senior ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Testez votre process de recrutement avec le diagnostic commercial. 5 minutes pour savoir quels signaux vous risquez de manquer et comment sécuriser votre prochain recrutement.
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

          {/* Liens internes */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/blog/recrutement-commercial-en-pme-arretez-de-recruter-a-l-instinct" className="text-mint-green hover:underline">
                  → Recrutement commercial en PME : arrêtez de recruter à l&apos;instinct
                </Link>
              </li>
              <li>
                <Link href="/blog/les-erreurs-onboarding-commercial-qui-plombent-performance-nouveau" className="text-mint-green hover:underline">
                  → Les erreurs d&apos;onboarding commercial qui plombent la performance d&apos;un nouveau
                </Link>
              </li>
              <li>
                <Link href="/blog/objectifs-commerciaux-comment-en-fixer-qui-motivent-vraiment-vos-equipes" className="text-mint-green hover:underline">
                  → Objectifs commerciaux : comment en fixer qui motivent vraiment vos équipes
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
