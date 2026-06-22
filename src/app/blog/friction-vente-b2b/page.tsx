import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/friction-vente-b2b';
const heroImage = 'https://www.laurentserre.com/images/blog/friction-vente-b2b/friction-vente-b2b-hero.webp';

export const metadata: Metadata = {
  title: 'Friction processus de vente B2B : 5 points qui tuent vos deals',
  description:
    'Le problème n\'est pas votre offre, ni votre prix, ni vos commerciaux. C\'est la friction invisible que vous infligez à vos acheteurs à chaque étape du cycle. Diagnostic des 5 points de friction qui tuent les deals B2B en 2026.',
  keywords: [
    'friction vente B2B',
    'processus de vente PME',
    'cycle de vente B2B trop long',
    'deal stalling B2B',
    'deal room B2B',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-22',
  },
  openGraph: {
    title: 'Friction processus de vente B2B : 5 points qui tuent vos deals',
    description:
      'Découvrez les 5 frictions invisibles dans votre processus de vente B2B qui font perdre des deals à votre PME.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 1024,
        alt: 'Friction processus de vente B2B',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Friction processus de vente B2B : 5 points qui tuent vos deals',
    description:
      'Découvrez les 5 frictions invisibles dans votre processus de vente B2B qui font perdre des deals à votre PME.',
    images: [heroImage],
  },
};

const carouselPrefix = '/images/blog/friction-vente-b2b';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp?v=20260622`, alt: 'Couverture : Friction processus de vente B2B, un deal perdu sur la ligne d\'arrivée', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-constat.webp?v=20260622`, alt: 'Le constat : un dirigeant de PME perd un deal après 3 mois de travail', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-retard.webp?v=20260622`, alt: 'Première friction : les retards entre étapes du cycle de vente', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-prospect-fatigue.webp?v=20260622`, alt: 'Le prospect perd de l\'énergie à chaque délai sans justification', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-laurent-entre.webp?v=20260622`, alt: 'Laurent Serre intervient pour diagnostiquer le processus de vente', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-laurent-observe.webp?v=20260622`, alt: 'Observation du processus : chaque étape analysed comme un point de friction', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-visibilite.webp?v=20260622`, alt: 'Deuxième friction : le prospect ne sait pas ce qui vient après le devis', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-documents-disperses.webp?v=20260622`, alt: 'Troisième friction : documents dispersés entre emails, PDF et présentations', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-pas-deal-room.webp?v=20260622`, alt: 'Quatrième friction : absence de Deal Room, tout passe par email', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-onboarding-flou.webp?v=20260622`, alt: 'Cinquième friction : onboarding flou après signature, cause n°1 de churn', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-diagnostic.webp?v=20260622`, alt: 'Le diagnostic : 5 frictions identified dans le processus de vente', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-5-frictions.webp?v=20260622`, alt: 'Synthèse visuelle des 5 frictions qui tuent les deals B2B', index: 11 },
  { src: `${carouselPrefix}/bd-slide-13-tracer-mesurer.webp?v=20260622`, alt: 'Solution 1 : tracer les 5 étapes et mesurer le temps réel entre chacune', index: 12 },
  { src: `${carouselPrefix}/bd-slide-14-deal-room.webp?v=20260622`, alt: 'Solution 2 : mettre en place une Deal Room unique par deal', index: 13 },
  { src: `${carouselPrefix}/bd-slide-15-resultats.webp?v=20260622`, alt: 'Résultats : 30% de temps gagné par vente et des deals qui ne s\'égarent plus', index: 14 },
  { src: `${carouselPrefix}/bd-slide-16-cta.webp?v=20260622`, alt: 'Appel à l\'action : diagnostiquez votre processus de vente', index: 15 },
];

const faqItems = [
  {
    question: 'Qu\'est-ce que la friction dans la vente B2B ?',
    answer:
      'La friction en vente B2B désigne tous les obstacles invisibles qui ralentissent ou bloquent le parcours d\'achat de votre prospect : délais entre étapes, manque de visibilité, documents dispersés, absence d\'espace partagé, onboarding flou. Chaque friction épuise l\'énergie du prospect et augmente le risque qu\'il abandonne.',
  },
  {
    question: 'Pourquoi mes deals B2B stagnent-ils en fin de cycle ?',
    answer:
      'Les deals stagnent en fin de cycle quand le prospect perd confiance dans la fluidité du processus. Si chaque étape demande un effort (relances, recherches de documents, validations multiples), le prospect reporte sa décision. La friction cumulée transforme un oui enthousiaste en indécision chronique.',
  },
  {
    question: 'Comment réduire le cycle de vente B2B ?',
    answer:
      'Pour réduire le cycle de vente : tracez chaque étape et mesurez le temps réel, donnez la feuille de route complète dès le premier rendez-vous, centralisez tous les documents dans une Deal Room, et préparez l\'onboarding avant la signature. L\'objectif est zéro friction inutile.',
  },
  {
    question: 'Qu\'est-ce qu\'une Deal Room en B2B ?',
    answer:
      'Une Deal Room est un espace partagé unique par deal qui contient tous les documents, toutes les versions et tout l\'historique des échanges. C\'est une seule source de vérité qui rassure le prospect et fait gagner du temps à l\'équipe commerciale.',
  },
  {
    question: 'Pourquoi l\'onboarding flou est-il une cause de churn précoce ?',
    answer:
      'Un onboarding flou après la signature est la cause numéro 1 de churn précoce. Le prospect signe enthousiaste, mais si rien ne se passe pendant quinze jours ou si l\'information est vague, l\'énergie retombe, le doute s\'installe et la compétition peut revenir en force.',
  },
];

export default function FrictionVenteB2BPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Friction processus de vente B2B : 5 points qui tuent vos deals',
        description:
          'Le problème n\'est pas votre offre, ni votre prix, ni vos commerciaux. C\'est la friction invisible que vous infligez à vos acheteurs à chaque étape du cycle.',
        image: heroImage,
        datePublished: '2026-06-22',
        dateModified: '2026-06-22',
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
        articleSection: 'Processus de vente / Sales ops',
        keywords: [
          'friction vente B2B',
          'processus de vente PME',
          'deal stalling B2B',
          'deal room B2B',
          'cycle de vente B2B',
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
          { '@type': 'ListItem', position: 3, name: 'Friction processus de vente B2B', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Friction processus de vente B2B</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Processus de vente / Sales ops
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Friction processus de vente B2B : 5 points qui tuent vos deals
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
              <time dateTime="2026-06-22">22 juin 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/friction-vente-b2b/friction-vente-b2b-hero.webp"
              alt="Friction processus de vente B2B"
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
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              Ce qu&apos;il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Vos deals B2B ne stagnent pas à cause de l&apos;offre, du prix ou des commerciaux. Ils stagnent à cause de la friction invisible à chaque étape du parcours acheteur. Délais, manque de visibilité, documents dispersés : chaque obstacle épuise l&apos;énergie du prospect. Diagnostiquez et supprimez ces 5 frictions pour signer plus vite.
            </p>
          </div>

          {/* BD Carrousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Friction en vente B2B, le diagnostic
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire vraie d&apos;un dirigeant de PME qui a perdu un deal après 3 mois de travail. Pas à cause du prix ni du commercial. À cause de la friction invisible dans son processus de vente. Du premier retard à la Deal Room qui a tout changé.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Friction processus de vente B2B"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/friction-vente-b2b-carrousel.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (16 planches)
              </Link>
            </div>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Votre processus de vente contient-il des points de friction cachés ? Diagnostic offert
            </Link>
          </div>

          {/* Introduction */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le deal parfait qui s&apos;est effondré tout seul
          </h2>
          <p className="mb-8">
            Je reçois un appel d&apos;un dirigeant de PME la semaine dernière. « On a perdu un deal sur lequel on passait 90% de notre temps depuis trois mois. L&apos;offre, c&apos;était correct. Le prix, pareil. Le commercial était à l&apos;aise. Ils ont signé ailleurs. Je ne comprends pas. »
          </p>
          <p className="mb-8">
            Je lui demande de me raconter ce qui s&apos;est passé, pas ce qui devait se passer.
          </p>
          <p className="mb-8">
            Au début, le prospect était enthousiaste. Puis la première étape de qualification : une semaine pour obtenir un rendez-vous avec le vrai décideur. Ensuite, le premier document demandé : un jour pour le trouver, deux pour le mettre en forme. Puis une proposition revue trois fois. Puis un contrat qui a changé de version deux fois.
          </p>
          <p className="mb-8">
            À chaque étape, le prospect perdait un peu d&apos;énergie. À chaque délai, il se disait « ce n&apos;est peut-être pas la priorité ». À chaque nouvelle demande, il s&apos;interrogeait sur la capacité de l&apos;équipe à livrer proprement.
          </p>
          <p className="mb-8">
            Le problème n&apos;était ni l&apos;offre, ni le prix, ni le commercial. C&apos;était la friction invisible à chaque étape.
          </p>
          <p className="mb-8 text-lg font-semibold text-blue-ink">
            Voici les 5 points de friction qui tuent les deals B2B en 2026.
          </p>

          {/* Les 5 frictions */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 5 frictions qui tuent vos deals
          </h2>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            1. Perte de temps entre les étapes
          </h3>
          <p className="mb-8">
            Un prospect qui doit vous relancer trois fois pour avoir une date de rendez-vous se fatigue avant même de commencer. Chaque délai sans justification claire est un signal : « ce n&apos;est pas vraiment important pour eux ». Le prospect interprète votre lenteur comme un manque d&apos;intérêt, même si vous êtes submergé de travail. Le temps entre deux étapes est un message. S&apos;il est long, le prospect entend : « je ne suis pas prioritaire ».
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            2. Manque de visibilité sur les prochaines étapes
          </h3>
          <p className="mb-8">
            Un client qui ne sait pas ce qui vient après « envoyer le devis » se pose des questions. « Ça veut dire qu&apos;on avance ? Qu&apos;on attend ? Que ce n&apos;est pas grave ? » L&apos;incertitude crée de l&apos;inertie. Le prospect gèle sa propre décision parce qu&apos;il ne voit pas la ligne d&apos;arrivée. Donnez-lui la carte complète du parcours et il avancera tout seul.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Pour former vos commerciaux à un processus de vente sans friction
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente travaille la fluidité du parcours acheteur : étapes claires, next steps verrouillées, Deal Room, onboarding préparé en amont. Vos commerciaux repartent avec un processus que le prospect peut suivre les yeux fermés.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            3. Documents dispersés et mal organisés
          </h3>
          <p className="mb-8">
            Quand les infos du deal sont dans un email là, un PDF ailleurs, une présentation qui ne s&apos;ouvre pas sur le troisième appareil, le prospect se demande : « si c&apos;est déjà le chaos dans la vente, qu&apos;est-ce que ce sera dans le projet ? » La dispersion des documents n&apos;est pas un détail organisationnel. C&apos;est un signal de compétence qui joue contre vous à chaque fois que le prospect ne trouve pas ce qu&apos;il cherche.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            4. Absence de Deal Room ou espace partagé
          </h3>
          <p className="mb-8">
            Tout passe par email. Les fichiers s&apos;égarent. Les versions se mélangent. L&apos;historique des échanges disparaît dans des fils de discussion à rallonge. Le prospect doit faire le travail de synthèse à votre place. Et ça, il ne le dit pas. Il le note mentalement. Et le jour où il compare deux fournisseurs, c&apos;est celui qui a rendu la vie simple qui gagne.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            5. Onboarding flou après la signature
          </h3>
          <p className="mb-8">
            C&apos;est la cause numéro 1 de churn précoce. Le prospect signe, enthousiaste. Ensuite ? Rien pendant quinze jours. Ou un email vague « on vous recontacte ». L&apos;énergie retombe. Le doute s&apos;installe. La compétition revient en force. Le client qui se sent abandonné juste après avoir signé cherchera une raison de partir avant même d&apos;avoir utilisé votre solution.
          </p>

          {/* Solutions */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce qu&apos;il faut faire, concrètement
          </h2>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Tracer les 5 étapes et mesurer le temps réel
          </h3>
          <p className="mb-8">
            Tracez les 5 étapes de votre cycle de vente actuel et mesurez le temps réel entre chacune. Si une étape prend systématiquement deux fois plus longtemps que prévu, vous avez un problème de processus, pas de commercial. Le problème n&apos;est jamais le commercial. C&apos;est le processus qui le laisse seul face à la friction.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Donner la feuille de route complète dès le premier rendez-vous
          </h3>
          <p className="mb-8">
            De A à Z. Ce qui va se passer, quand, qui fait quoi. Une visibilité totale réduit l&apos;incertitude à zéro. Le prospect sait où il va. Il n&apos;est plus en train de deviner. Il est en train d&apos;avancer.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Créer une Deal Room unique par deal
          </h3>
          <p className="mb-8">
            Tous les documents, toutes les versions, tout l&apos;historique des échanges. Une seule source de vérité. Ça vous fait gagner des heures, et ça rassure le prospect. Il n&apos;a plus à chercher. Il n&apos;a plus à relancer. Il trouve.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Préparer l&apos;onboarding avant la signature
          </h3>
          <p className="mb-8">
            Les comptes créés, les docs d&apos;intégration prêts, un calendrier de mise en route verrouillé dans les 48h suivant la signature. Le prospect signe et sent immédiatement que le projet démarre. Aucun vide. Aucune ambiguïté. L&apos;énergie de l&apos;achat se transforme en énergie de déploiement.
          </p>

          {/* Résultat */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce qui change quand vous supprimez la friction
          </h2>
          <p className="mb-8">
            Cinq semaines plus tard, ce même dirigeant m&apos;appelle. « On a mis en place une Deal Room. On a tracé toutes les étapes. On gagne 30% de temps par vente. Et surtout, les deals ne s&apos;égarent plus dans les mails. »
          </p>
          <p className="mb-8 text-lg font-semibold text-blue-ink">
            La friction ne se voit pas sur le papier. Elle se sent dans le parcours du prospect. La réduire n&apos;est pas un luxe. C&apos;est une question de survie commerciale.
          </p>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vos deals stagnent et vous ne savez pas pourquoi ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              La plupart des équipes que j&apos;accompagne ne souffrent pas d&apos;un problème commercial. Elles souffrent d&apos;un problème de processus. Les deals s&apos;égarent dans des emails, les étapes s&apos;étirent sans raison, les prospects perdent leur énergie. Le diagnostic commercial offert vous donne une photographie nette de là où votre processus crée de la friction.
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
                <Link href="/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux" className="text-mint-green hover:underline">
                  → Vos acheteurs B2B ne veulent plus parler à vos commerciaux
                </Link>
              </li>
              <li>
                <Link href="/blog/closing-b2b-7-techniques" className="text-mint-green hover:underline">
                  → Les 7 techniques de closing B2B qui marchent en 2026
                </Link>
              </li>
              <li>
                <Link href="/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite" className="text-mint-green hover:underline">
                  → Gestion des objections : transformer le non en opportunité
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8">
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
