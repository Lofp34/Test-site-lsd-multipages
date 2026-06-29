import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/signaux-faibles-churn-b2b-pme';
const heroImage = '/images/blog/signaux-faibles-churn-b2b-pme/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/signaux-faibles-churn-b2b-pme/hero.webp';

export const metadata: Metadata = {
  title: 'Signaux faibles churn B2B : les 7 alertes avant qu\'un client parte',
  description:
    'Le client ne prévient pas avant de partir. Il envoie des signaux. Les 7 signaux faibles qui précèdent un départ client B2B et le protocole de revue trimestrielle anti-churn.',
  keywords: [
    'signaux faibles churn B2B',
    'anticiper perte client PME',
    'prédire départ client',
    'customer success PME',
    'rétention client B2B',
    'churn rate prévention',
    'revue trimestrielle client',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-29',
  },
  openGraph: {
    title: 'Signaux faibles churn B2B : les 7 alertes avant qu\'un client parte',
    description:
      'Le client ne prévient pas avant de partir. Il envoie des signaux. Les 7 signaux faibles qui précèdent un départ client B2B et le protocole de revue trimestrielle.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Signaux faibles churn B2B : les 7 alertes avant qu\'un client parte — Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signaux faibles churn B2B : les 7 alertes avant qu\'un client parte',
    description:
      'Les 7 signaux faibles qui précèdent un départ client B2B et le protocole de revue trimestrielle anti-churn.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/signaux-faibles-churn-b2b-pme';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover — Signaux faibles churn B2B', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-surprise.webp`, alt: 'Le client parti sans prévenir, les signaux étaient là', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-signal1.webp`, alt: 'Signal 1 : le client ne pose plus de questions', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-signal2.webp`, alt: 'Signal 2 : les mails restent sans réponse', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-signaux34.webp`, alt: 'Signaux 3 et 4 : plus de recommandations, factures contestées', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-signaux567.webp`, alt: 'Signaux 5-6-7 : périmètre réduit, rabais, concurrent invité', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-revue.webp`, alt: 'La revue trimestrielle, le seul vrai filet de sécurité', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-lecon.webp`, alt: 'Le churn ne prévient pas mais il signale', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-cta.webp`, alt: 'CTA — Diagnostic offert sur laurentserre.com', index: 8 },
];

const faqItems = [
  {
    question: 'Qu\'est-ce qu\'un signal faible de churn B2B ?',
    answer:
      'Un signal faible de churn B2B est un changement de comportement du client qui précède son départ. Ce n\'est pas une réclamation brutale. C\'est une baisse progressive : moins de questions, des réponses plus courtes, une présence moindre en réunion. Ces signaux sont souvent invisibles pour l\'équipe commerciale parce qu\'ils sont noyés dans le bruit du quotidien.',
  },
  {
    question: 'Quels sont les 7 signaux faibles de départ client ?',
    answer:
      '1. Le client ne pose plus de questions sur les fonctionnalités, la roadmap ou les tarifs. 2. Les mails restent sans réponse ou raccourcissent. 3. Il ne recommande plus votre entreprise en interne ou en externe. 4. Il conteste les factures pour la première fois. 5. Il réduit son périmètre d\'achat. 6. Il négocie un rabais commercial inhabituel. 7. Il invite un concurrent à un rendez-vous de suivi.',
  },
  {
    question: 'Quand agir sur un signal faible de churn ?',
    answer:
      'Dès que vous voyez un signal, vous avez environ 30 jours pour agir avant que la décision de départ ne soit prise. Passé ce délai, le client a déjà pris sa décision, souvent sans la communiquer. La revue trimestrielle est le moment idéal pour détecter et traiter ces signaux avant qu\'ils ne deviennent irréversibles.',
  },
  {
    question: 'Qu\'est-ce qu\'une revue trimestrielle anti-churn ?',
    answer:
      'Une revue trimestrielle anti-churn est un rendez-vous dédié entre le commercial ou le customer success manager et chaque client. Pas un point de suivi administratif. Un moment où on pose des questions précises : « Qu\'est-ce qui vous a freiné ce trimestre ? Où voyez-vous la valeur de notre solution ? Qu\'est-ce qu\'on pourrait améliorer ? » Le but n\'est pas de vendre plus, mais de détecter les signaux avant qu\'ils ne s\'aggravent.',
  },
  {
    question: 'Quelle est la différence entre churn B2B et B2C ?',
    answer:
      'Le churn B2B est plus lent et plus coûteux. Un client B2C peut partir en un clic. Un client B2B met trois à six mois à partir. Pendant cette période, il envoie des signaux faibles. L\'enjeu en B2B n\'est pas de réagir vite. C\'est de lire les signaux tôt. Chaque signal faible ignoré coûte en moyenne 12 mois de chiffre d\'affaires récurrent.',
  },
  {
    question: 'Comment former ses commerciaux aux signaux faibles ?',
    answer:
      'En leur donnant une grille de lecture simple. Pas de framework complexe. Cinq questions à poser après chaque rendez-vous client : le client a-t-il posé des questions sur l\'avenir ? A-t-il parlé de son budget ? A-t-il cité un concurrent ? A-t-il proposé de nous recommander ? Avait-il l\'air pressé de terminer la réunion ? Si deux réponses sont négatives, un signal est activé.',
  },
];

export default function SignauxFaiblesChurnPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Signaux faibles churn B2B : les 7 alertes avant qu\'un client parte',
        description:
          'Le client ne prévient pas avant de partir. Il envoie des signaux. Les 7 signaux faibles qui précèdent un départ client B2B et le protocole de revue trimestrielle anti-churn.',
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
        articleSection: 'Stratégie client / Customer Success',
        keywords: [
          'signaux faibles churn B2B',
          'anticiper perte client PME',
          'customer success PME',
          'rétention client B2B',
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
          { '@type': 'ListItem', position: 3, name: 'Signaux faibles churn B2B', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Signaux faibles churn B2B</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Stratégie client / Customer Success
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Signaux faibles churn B2B : les 7 alertes avant qu&apos;un client parte
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
              alt="Signaux faibles churn B2B : les 7 alertes avant qu'un client parte"
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
              Le client ne prévient pas avant de partir. Mais il envoie des signaux : il ne pose plus de questions, ses mails raccourcissent, il conteste ses factures. Les 7 signaux faibles à détecter et le protocole de revue trimestrielle pour agir dans les 30 jours.
            </p>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vous perdez des clients sans comprendre pourquoi ? Diagnostic offert
            </Link>
          </div>

          {/* BD Carrousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Les 7 signaux faibles
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire d&apos;un dirigeant dont le plus gros client est parti sans prévenir. Puis en remontant les douze derniers mois, il a vu les signaux. Tous.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Signaux faibles churn B2B"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-churn-b2b.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (9 planches)
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le churn B2B ne prévient pas. Ou si, justement.
          </h2>

          <p className="mb-8">
            L&apos;année dernière, j&apos;ai reçu un appel d&apos;un dirigeant que j&apos;accompagne depuis deux ans. Il venait de perdre son plus gros client. C&apos;était 18% de son chiffre d&apos;affaires. Parti du jour au lendemain. En apparence.
          </p>

          <p className="mb-8">
            « Il m&apos;a appelé la semaine dernière pour me dire qu&apos;il arrêtait. Aucun signe avant-coureur. »
          </p>

          <p className="mb-8">
            On a passé une heure à remonter les douze derniers mois. Et les signaux étaient là, alignés comme des dominos. Le client avait arrêté de poser des questions sur les nouvelles fonctionnalités. Ses mails étaient passés de trois paragraphes à une ligne. Il avait contesté une facture pour la première fois en cinq ans de relation. Il n&apos;avait pas recommandé l&apos;entreprise lors d&apos;une réunion inter-entreprises alors que c&apos;était la norme avant.
          </p>

          <p className="mb-8">
            Le dirigeant ne les avait pas vus. Pas parce qu&apos;il était incompétent. Parce qu&apos;il n&apos;avait pas une grille pour les lire.
          </p>

          <p className="mb-8">
            Le churn B2B ne frappe jamais soudainement. Il s&apos;installe. Le problème, c&apos;est que les équipes commerciales et customer success sont trop occupées par l&apos;urgence du quotidien pour remarquer les micro-changements de comportement.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 7 signaux faibles
          </h2>

          <p className="mb-8">
            Voici les sept signaux que je vérifie avec les équipes que j&apos;accompagne. Si votre client en cumule trois, vous avez trente jours pour agir.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            1. Le client ne pose plus de questions
          </h3>

          <p className="mb-8">
            Le client demande moins de choses : fonctionnalités, tarifs, roadmap, nouveautés. Il arrête de s&apos;intéresser à ce que vous développez. Signe qu&apos;il n&apos;envisage plus un avenir avec vous. Pas de questions sur l&apos;avenir signifie pas d&apos;avenir envisagé.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            2. Les mails raccourcissent
          </h3>

          <p className="mb-8">
            Ses emails passent de détails à des réponses courtes. Puis à des « ok merci ». Puis à rien. Ce n&apos;est pas de l&apos;indifférence. C&apos;est du détachement. Le client prend ses distances progressivement.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            3. Il ne recommande plus
          </h3>

          <p className="mb-8">
            Votre client était un promoteur en interne. Il proposait votre nom aux collègues, aux partenaires, dans les réseaux professionnels. Il arrête. Pas de raison particulière. Juste, il ne le fait plus. C&apos;est le signal le plus précoce — et le plus souvent ignoré.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            4. Il conteste les factures
          </h3>

          <p className="mb-8">
            Il n&apos;avait jamais contesté le moindre montant. Maintenant, une ligne de facture le gêne. Ce n&apos;est pas une question de trésorerie. C&apos;est une manière de dire : « Je ne suis plus sûr que ça vaille ce prix. »
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            5. Il réduit son périmètre
          </h3>

          <p className="mb-8">
            Le client diminue le nombre de licences, de modules, de jours de consulting. Il teste un retrait progressif. Si personne ne réagit, il continue.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            6. Il négocie un rabais
          </h3>

          <p className="mb-8">
            Pour la première fois, il demande un geste commercial significatif. Pas un petit ajustement. Un vrai rabais. Habituellement, c&apos;est le signal que la décision de départ est déjà prise, et que le client cherche à minimiser le coût de la période de transition.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            7. Il invite un concurrent en rendez-vous
          </h3>

          <p className="mb-8">
            Le client planifie une réunion avec vos concurrents. S&apos;il le fait sans vous en parler, le signal est critique. S&apos;il vous le dit, c&apos;est peut-être encore rattrapable.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le protocole de revue trimestrielle anti-churn
          </h2>

          <p className="mb-8">
            Détecter les signaux ne suffit pas. Il faut un cadre pour agir.
          </p>

          <p className="mb-8">
            Le protocole que je mets en place avec les équipes que j&apos;accompagne est simple. Une revue trimestrielle avec chaque client. Pas un point commercial. Un temps dédié où on pose les questions qui détectent les signaux.
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-4">
              <strong>Les 5 questions de la revue trimestrielle :</strong>
            </p>
            <ul className="space-y-3 text-slate-700 list-disc pl-5">
              <li>« Qu&apos;est-ce qui vous a freiné ce trimestre dans l&apos;utilisation de notre solution ? »</li>
              <li>« Où voyez-vous la valeur de ce qu&apos;on vous apporte aujourd&apos;hui ? »</li>
              <li>« Qu&apos;est-ce qu&apos;on pourrait améliorer ou ajouter pour vous servir mieux ? »</li>
              <li>« Y a-t-il des choses que vous n&apos;utilisez plus ou moins ? »</li>
              <li>« Recommanderiez-vous notre entreprise à un confrère aujourd&apos;hui ? »</li>
            </ul>
          </div>

          <p className="mb-8">
            La dernière question est la plus importante. Si la réponse est hésitante, vous avez un signal actif. Si la réponse est « non », le client est déjà en train de partir.
          </p>

          <p className="mb-8">
            Chaque trimestre, les réponses sont notées. Si un signal se répète ou si trois signaux différents apparaissent sur la même période, une action est déclenchée : appel du dirigeant, visite terrain, ajustement de l&apos;offre, ou recadrage de la relation.
          </p>

          <p className="mb-8">
            Ce protocole ne rattrape pas tous les départs. Mais il permet de réagir dans les 30 jours, ce qui est la seule fenêtre utile. Passé ce délai, le client a déjà pris sa décision — qu&apos;il vous l&apos;ait dit ou non.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Approfondir la rétention client
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente intègre un module rétention B2B : détection des signaux faibles, revue trimestrielle anti-churn, plan de reconquête.
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
              Vous perdez des clients sans comprendre pourquoi ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic commercial identifie les signaux faibles que vous pourriez manquer. 5 minutes pour savoir si vos clients vous envoient des alertes que personne ne lit.
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
                <Link href="/blog/retention-client-b2b-pme" className="text-mint-green hover:underline">
                  → Rétention client B2B en PME : 5 leviers pour arrêter de perdre vos clients
                </Link>
              </li>
              <li>
                <Link href="/blog/prochain-million-portefeuille-clients-expansion" className="text-mint-green hover:underline">
                  → Où trouver votre prochain million dans votre portefeuille clients existant
                </Link>
              </li>
              <li>
                <Link href="/blog/coaching-commercial-diagnostic-ecoute" className="text-mint-green hover:underline">
                  → Coaching commercial : les 3 diagnostics qui changent la donne
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
