import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/friction-vente-b2b';
const heroImage = 'https://www.laurentserre.com/images/blog/friction-vente-b2b/hero.png';
const ogImage = 'https://www.laurentserre.com/images/blog/friction-vente-b2b/hero.png';

export const metadata: Metadata = {
  title: 'Friction dans le processus de vente B2B : pourquoi vos deals stagnent',
  description:
    'Le problème n\'est ni votre offre, ni votre prix, ni vos commerciaux. C\'est la friction invisible à chaque étape du cycle. Déconstruction des 5 points de friction qui tuent les deals B2B en 2026.',
  keywords:
    'friction vente B2B, deals stagnent, cycle de vente trop long, simplifier processus vente PME, deal rooms sales, shared docs B2B, onboarding friction churn, réduire friction achat B2B, processus de vente B2B, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-22',
  },
  openGraph: {
    title: 'Friction dans le processus de vente B2B : pourquoi vos deals stagnent',
    description:
      'Le problème n\'est ni votre offre, ni votre prix. C\'est la friction invisible à chaque étape du cycle. Déconstruction des 5 points de friction qui tuent les deals.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImage,
        width: 1536,
        height: 1024,
        alt: 'Friction dans le processus de vente B2B',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Friction dans le processus de vente B2B : pourquoi vos deals stagnent | Laurent Serre',
    description:
      'Le problème n\'est ni votre offre, ni votre prix. C\'est la friction invisible à chaque étape du cycle.',
    images: [ogImage],
  },
};

const carouselPrefix = '/images/blog/friction-vente-b2b';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.png`, alt: 'Couverture', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-constat.png`, alt: 'Le constat', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-retard.png`, alt: 'Première friction', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-prospect-fatigue.png`, alt: 'Le prospect se fatigue', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-laurent-entre.png`, alt: 'Laurent entre en scène', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-laurent-observe.png`, alt: 'Laurent observe', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-visibilite.png`, alt: 'Deuxième friction', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-documents-disperses.png`, alt: 'Troisième friction', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-pas-deal-room.png`, alt: 'Quatrième friction', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-onboarding-flou.png`, alt: 'Cinquième friction', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-diagnostic.png`, alt: 'Laurent fait le diagnostic', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-5-frictions.png`, alt: 'Les 5 points de friction', index: 11 },
  { src: `${carouselPrefix}/bd-slide-13-tracer-mesurer.png`, alt: 'Tracer et mesurer', index: 12 },
  { src: `${carouselPrefix}/bd-slide-14-deal-room.png`, alt: 'Deal Room unique', index: 13 },
  { src: `${carouselPrefix}/bd-slide-15-resultats.png`, alt: 'Résultats', index: 14 },
  { src: `${carouselPrefix}/bd-slide-16-cta.png`, alt: 'CTA', index: 15 },
];

const faqItems = [
  {
    question: 'Qu\'est-ce que la friction dans le processus de vente B2B ?',
    answer:
      'La friction en vente B2B représente tous les obstacles, attentes et complications qui ralentissent ou bloquent chaque étape du cycle de vente. Ce peut être un délai entre les étapes, un manque de visibilité sur les prochaines actions, des documents dispersés, l\'absence de Deal Room ou un onboarding flou après la signature. Contrairement aux objections explicites comme le prix, la friction est invisible mais tue les deals silencieusement en épuisant le prospect et en créant du doute sur votre capacité à livrer proprement.',
  },
  {
    question: 'Pourquoi mes deals B2B stagnent-ils malgré une bonne offre ?',
    answer:
      'Un deal stagne rarement parce que l\'offre n\'est pas assez bonne ou le prix trop élevé. La cause principale est la friction invisible à chaque étape : le prospect doit faire trop d\'efforts pour avancer, il ne sait jamais exactement où il en est, les documents s\'égarent dans des chaînes d\'emails, et après la signature rien ne se passe pendant quinze jours. Chaque friction érode son énergie et sa confiance. À un moment, il se dit que ce n\'est pas une priorité ou que ce sera compliqué à mettre en œuvre, et le deal s\'arrête sans même une objection explicite.',
  },
  {
    question: 'Comment réduire la friction dans le processus de vente B2B ?',
    answer:
      'Quatre actions concrètes : tracer vos 5 étapes de cycle et mesurer le temps réel entre chacune pour identifier les points de blocage ; donner au prospect dès le premier rendez-vous la feuille de route complète avec toutes les étapes et dates ; créer une Deal Room unique par deal où tous les documents, toutes les versions et tout l\'historique des échanges sont centralisés ; préparer l\'onboarding avant la signature avec comptes créés, docs d\'intégration prêts et calendrier de mise en route verrouillé dans les 48h suivant la signature.',
  },
  {
    question: 'Qu\'est-ce qu\'une Deal Room en vente B2B ?',
    answer:
      'Une Deal Room est un espace partagé en ligne centralisé par deal ou par prospect. Elle contient tous les documents (devis, contrats, présentations), toutes les versions, tout l\'istorique des échanges et une visibilité totale sur les prochaines étapes. Contrairement aux emails dispersés, la Deal Room est une source unique de vérité qui permet au prospect de trouver rapidement ce qu\'il cherche et à votre équipe de suivre en temps réel l\'état de l\'avancement. Les outils modernes comme Google Workspace, Notion ou les plateformes de sales enablement permettent de créer des Deal Rooms en quelques minutes.',
  },
  {
    question: 'L\'onboarding post-signature est-il vraiment une cause de churn ?',
    answer:
      'Oui, c\'est la cause numéro 1 de churn précoce en B2B. Quand un prospect signe avec enthousiasme puis ne reçoit rien pendant quinze jours, son énergie retombe, le doute s\'installe et la compétition revient en force. Le prospect se demande s\'il a fait le bon choix et commence à regarder ailleurs. La solution : préparer l\'onboarding avant même la signature. Comptes créés, documents d\'intégration prêts, calendrier de mise en route verrouillé. Le client doit sentir qu\'il passe immédiatement de la signature à l\'action, sans lacune de temps.',
  },
];

export default function FrictionVenteB2BPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Friction dans le processus de vente B2B : pourquoi vos deals stagnent',
        description:
          'Le problème n\'est ni votre offre, ni votre prix, ni vos commerciaux. C\'est la friction invisible à chaque étape du cycle. Déconstruction des 5 points de friction qui tuent les deals B2B en 2026.',
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
        articleSection: 'Processus de vente',
        keywords: [
          'friction vente B2B',
          'deals stagnent',
          'cycle de vente trop long',
          'simplifier processus vente PME',
          'deal rooms sales',
          'shared docs B2B',
          'onboarding friction churn',
          'réduire friction achat B2B',
          'processus de vente B2B',
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
          { '@type': 'ListItem', position: 3, name: 'Friction vente B2B', item: articleUrl },
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

      <article className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
        <header className="mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Friction dans le processus de vente B2B : pourquoi vos deals stagnent
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <time dateTime="2026-06-22">22 juin 2026</time>
            <span>•</span>
            <span>Laurent Serre</span>
          </div>
        </header>

        <div className="mb-8">
          <Image
            src={heroImage}
            alt="Friction dans le processus de vente B2B"
            width={1536}
            height={1024}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>

        <BDCarousel images={carouselImages} />

        <div className="prose prose-lg max-w-none mt-8">
          <p>
            Je reçois un appel d'un dirigeant de PME la semaine dernière. <em>"On a perdu un deal sur lequel on passait 90% de notre temps depuis trois mois. L'offre, c'était correct. Le prix, pareil. Le commercial était à l'aise. Ils ont signé ailleurs. Je ne comprends pas."</em>
          </p>

          <p>
            Je lui demande de me raconter ce qui s'est passé, pas ce qui devait se passer.
          </p>

          <p>
            Au début, le prospect était enthousiaste. Puis la première étape de qualification : une semaine pour obtenir un rendez-vous avec le vrai décideur. Ensuite, le premier document demandé : un jour pour le trouver, deux pour le mettre en forme. Puis une proposition revue trois fois. Puis un contrat qui a changé de version deux fois.
          </p>

          <p>
            À chaque étape, le prospect perdait un peu d'énergie. À chaque délai, il se disait <em>"ce n'est peut-être pas la priorité"</em>. À chaque nouvelle demande, il s'interrogeait sur la capacité de l'équipe à livrer proprement.
          </p>

          <p>
            Le problème n'était ni l'offre, ni le prix, ni le commercial. C'était la friction invisible à chaque étape.
          </p>

          <h2>
            Voici les 5 points de friction qui tuent les deals B2B en 2026.
          </h2>

          <h3>
            1. Perte de temps entre les étapes
          </h3>
          <p>
            Un prospect qui doit vous relancer trois fois pour avoir une date de rendez-vous se fatigue avant même de commencer. Chaque délai sans justification claire est un signal : <em>"ce n'est pas vraiment important pour eux"</em>.
          </p>

          <h3>
            2. Manque de visibilité sur les prochaines étapes
          </h3>
          <p>
            Un client qui ne sait pas ce qui vient après <em>"envoyer le devis"</em> se pose des questions. <em>"Ça veut dire qu'on avance ? Qu'on attend ? Que ce n'est pas grave ?"</em> L'incertitude crée de l'inertie.
          </p>

          <h3>
            3. Documents dispersés et mal organisés
          </h3>
          <p>
            Quand les infos du deal sont dans un email là, un PDF ailleurs, une présentation qui ne s'ouvre pas sur le troisième appareil, le prospect se demande : <em>"si c'est déjà le chaos dans la vente, qu'est-ce que ce sera dans le projet ?"</em>
          </p>

          <h3>
            4. Absence de Deal Room ou espace partagé
          </h3>
          <p>
            Tout passe par email. Les fichiers s'égarent. Les versions se mélangent. L'historique des échanges disparaît dans des fils de discussion à rallonge. Le prospect doit faire le travail de synthèse à votre place.
          </p>

          <h3>
            5. Onboarding flou après la signature
          </h3>
          <p>
            C'est la cause numéro 1 de churn précoce. Le prospect signe, enthousiaste. Ensuite ? Rien pendant quinze jours. Ou un email vague <em>"on vous recontacte"</em>. L'énergie retombe. Le doute s'installe. La compétition revient en force.
          </p>

          <h2>
            Ce qu'il faut faire, concrètement.
          </h2>

          <h3>
            Première chose : tracer les 5 étapes de votre cycle de vente actuel et mesurer le temps réel entre chacune. Si une étape prend systématiquement deux fois plus longtemps que prévu, vous avez un problème de processus, pas de commercial.
          </h3>

          <h3>
            Deuxième chose : donner à chaque prospect, dès le premier rendez-vous, la feuille de route complète. De A à Z. Ce qui va se passer, quand, qui fait quoi. Une visibilité totale réduit l'incertitude à zéro.
          </h3>

          <h3>
            Troisième chose : une Deal Room unique par deal. Tous les documents, toutes les versions, tout l'historique des échanges. Une seule source de vérité. Ça vous fait gagner des heures, et ça rassure le prospect.
          </h3>

          <h3>
            Quatrième chose : préparer l'onboarding avant la signature. Les comptes créés, les docs d'intégration prêts, un calendrier de mise en route verrouillé dans les 48h suivant la signature.
          </h3>

          <p>
            Cinq semaines plus tard, ce même dirigeant m'appelle. <em>"On a mis en place une Deal Room. On a tracé toutes les étapes. On gagne 30% de temps par vente. Et surtout, les deals ne s'égarent plus dans les mails."</em>
          </p>

          <p>
            La friction ne se voit pas sur le papier. Elle se sent dans le parcours du prospect. La réduire n'est pas un luxe. C'est une question de survie commerciale.
          </p>
        </div>

        <HubSpotForm portalId="xxx" formId="xxx" />

        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <details key={index} className="group border border-gray-200 rounded-lg">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                  <span>{item.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="text-gray-700 mt-0 px-4 pb-4">{item.answer}</div>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <AuthorCard />
        </div>
      </article>
    </main>
  );
}