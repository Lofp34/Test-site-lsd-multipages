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
    'Un client B2B ne part jamais sans prévenir. 7 signaux faibles à surveiller pour anticiper le churn en PME et le protocole de revue trimestrielle anti-churn.',
  keywords: [
    'signaux faibles churn B2B',
    'anticiper perte client PME',
    'predire depart client',
    'customer success PME',
    'retention client B2B',
    'churn B2B',
    'alertes depart client',
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
      'Un client B2B ne part jamais sans prévenir. 7 signaux faibles à surveiller pour anticiper le churn en PME et le protocole de revue trimestrielle anti-churn.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Signaux faibles churn B2B : les 7 alertes avant qu\'un client parte  :  Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signaux faibles churn B2B : les 7 alertes avant qu\'un client parte',
    description:
      'Un client B2B ne part jamais sans prévenir. 7 signaux faibles à surveiller pour anticiper le churn.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/signaux-faibles-churn-b2b-pme';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover  :  Les 7 signaux faibles churn B2B', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-client-heureux.webp`, alt: 'Un client satisfait qui cache ses vrais doutes', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-interlocuteur.webp`, alt: 'L interlocuteur change sans raison apparente', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-delais.webp`, alt: 'Les delais s allongent sans explication', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-silence.webp`, alt: 'Le silence radio apres une reunion', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-petites-demandes.webp`, alt: 'Les petites demandes inhabituelles s accumulent', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-prix.webp`, alt: 'Le client commence a parler prix sans raison', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-nouveau-fournisseur.webp`, alt: 'Un nouveau fournisseur apparaît dans le paysage', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-protocole.webp`, alt: 'Le protocole de revue anti-churn : 4 questions par trimestre', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-lecon.webp`, alt: 'Lecon : un client ne part pas sans avoir envoye 7 signaux avant', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-cta.webp`, alt: 'CTA  :  Diagnostic offert sur laurentserre.com', index: 10 },
];

const faqItems = [
  {
    question: 'Qu\'est-ce qu\'un signal faible en churn B2B ?',
    answer:
      'Un signal faible, c\'est un changement discret dans le comportement du client qui précède son départ. Ce n\'est pas une plainte ou une résiliation. C\'est un ralentissement, un glissement, une absence. Quelque chose qui n\'est pas anormal en soi, mais qui devient significatif quand il se répète ou s\'accumule avec d\'autres signaux.',
  },
  {
    question: 'Combien de signaux faibles faut-il cumuler avant qu\'un client parte ?',
    answer:
      'En moyenne, j\'observe que 3 à 4 signaux cumulés sur un trimestre précèdent un départ dans les 2 à 3 mois suivants. Un signal seul peut être un contretemps. Deux signaux méritent qu\'on vérifie. Trois signaux exigent une action. Quatre signaux, c\'est une urgence.',
  },
  {
    question: 'Quel est le signal le plus fiable pour prédire un départ client ?',
    answer:
      'Le changement d\'interlocuteur. Quand la personne qui suit le dossier change, c\'est le signal le plus fort. Le nouveau n\'a pas construit la relation, il n\'a pas d\'attachement à votre entreprise, et il va souvent reconsidérer vos services avec un regard neuf. C\'est le moment le plus critique du cycle client.',
  },
  {
    question: 'Comment différencier un signal faible d\'un contretemps normal ?',
    answer:
      'Un contretemps est ponctuel et s\'accompagne d\'une explication. Un retard sur un paiement avec un coup de fil pour prévenir est un contretemps. Un retard sans nouvelle est un signal. Un silence après une réunion parce que le client est en déplacement est normal. Un silence de deux semaines sans raison est un signal.',
  },
  {
    question: 'Comment mettre en place une revue trimestrielle anti-churn ?',
    answer:
      'Une revue trimestrielle anti-churn est un rituel de 30 minutes par client prioritaire. On pose 4 questions : (1) Combien de signaux faibles cumulés ce trimestre ? (2) Qui sont les interlocuteurs actuels ? (3) Quelle est la tendance de consommation ? (4) Quel est le niveau de satisfaction réel, pas déclaré ?',
  },
  {
    question: 'Faut-il agir sur chaque signal faible immédiatement ?',
    answer:
      'Non. Agir sur chaque signal faible épuiserait vos équipes et créerait de la panique. La règle que j\'applique avec les équipes que j\'accompagne : un signal seul = on note. Deux signaux = on vérifie. Trois signaux = on appelle le client. Quatre signaux = on programme une revue de compte d\'urgence.',
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
          'Un client B2B ne part jamais sans prévenir. 7 signaux faibles à surveiller pour anticiper le churn en PME.',
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
        articleSection: 'Retention / Customer Success',
        keywords: [
          'signaux faibles churn B2B',
          'anticiper perte client PME',
          'retention client B2B',
          'customer success PME',
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
                Rétention / Customer Success
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
              <span>8 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Signaux faibles churn B2B : tableau de bord avec indicateurs et alertes"
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
              Un client B2B ne part jamais sans prévenir. Il envoie en moyenne 3 à 4 signaux faibles avant de résilier. Les 7 signaux à surveiller, la règle des seuils (1/2/3/4), et le protocole de revue trimestrielle anti-churn.
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
              L&apos;histoire de Sophie, responsable clientèle, qui voyait des signaux depuis trois mois sans savoir les lire. Jusqu&apos;à ce que le client parte. Et qu&apos;on réalise que tout était écrit depuis le premier signal.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Signaux faibles churn B2B"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-signaux-faibles-churn.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (11 planches)
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le churn B2B ne prévient pas. Ou si, justement.
          </h2>

          <p className="mb-8">
            Sophie était responsable clientèle dans une PME de services informatiques. Elle gérait une cinquantaine de comptes. Son plus gros client, 80 000 euros de chiffre d&apos;affaires annuel, a résilié son contrat en novembre. Sans préavis. « On a changé de stratégie », a dit le client.
          </p>

          <p className="mb-8">
            Sophie était effondrée. Mais en revenant sur les six derniers mois avec elle, on a vu les signaux. En juin, le contact principal avait changé. En juillet, le client avait repoussé la réunion trimestrielle. En août, un nouveau prestataire était apparu sur un petit projet. En septembre, le client avait commencé à poser des questions sur les tarifs. Cinq signaux. Cinq occasions de réagir. Cinq rendez-vous manqués.
          </p>

          <p className="mb-8">
            Sophie n&apos;avait pas ignoré ces signaux. Elle ne savait pas les lire. Personne ne lui avait appris à distinguer un contretemps normal d&apos;un signal de départ annoncé.
          </p>

          <p className="mb-8">
            Le churn B2B ne frappe jamais sans prévenir. Il s&apos;annonce. Mais il s&apos;annonce bas. Un paiement en retard. Un silence qui s&apos;allonge. Un changement de contact. Rien d&apos;alarmant pris isolément. Mais mis bout à bout, ces signaux racontent une histoire que trop d&apos;équipes découvrent après coup.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 7 signaux faibles à surveiller
          </h2>

          <p className="mb-8">
            Avec les équipes que j&apos;accompagne, j&apos;ai formalisé une liste de 7 signaux. Elle ne remplace pas l&apos;intuition terrain. Elle la structure.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            1. Le changement d&apos;interlocuteur
          </h3>

          <p className="mb-8">
            C&apos;est le signal le plus fiable. Quand la personne qui suit le dossier change, le lien de confiance est à reconstruire. Le nouvel interlocuteur n&apos;a pas d&apos;histoire avec vous. Il va reconsidérer votre service, interroger le rapport qualité-prix, comparer. Dans les PME que je vois, un changement d&apos;interlocuteur précède un départ dans 60% des cas, s&apos;il n&apos;y a pas de visite de réassurance dans les 30 jours.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            2. La baisse de fréquence des contacts
          </h3>

          <p className="mb-8">
            Le client vous appelait toutes les semaines. Puis toutes les deux semaines. Puis plus rien depuis un mois. Ce n&apos;est pas un bon signe de sérénité. C&apos;est un désengagement progressif. Un client qui ne vous contacte plus a soit résolu son problème, soit confié la relation à quelqu&apos;un d&apos;autre. Les deux sont des signaux.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            3. Les délais qui s&apos;allongent
          </h3>

          <p className="mb-8">
            Le client met plus de temps à répondre à vos relances. Les réunions sont repoussées. Les décisions sont reportées. Le client qui répondait en 24 heures met désormais une semaine. Chaque allongement de délai est un pas vers la sortie. Signe particulier : le prétexte est presque toujours le même. « Je suis débordé. »
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            4. Les questions sur les tarifs
          </h3>

          <p className="mb-8">
            Un client qui commence à vous questionner sur les prix, les conditions, la facturation, sans qu&apos;il y ait eu de changement dans l&apos;offre, c&apos;est un signal. Il prépare une comparaison. Il teste votre marge de manœuvre. Ou il cherche à justifier son départ auprès de sa direction.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            5. L&apos;apparition d&apos;un nouveau fournisseur
          </h3>

          <p className="mb-8">
            Un concurrent fait son apparition dans le paysage. Le client le mentionne, ou vous le découvrez par hasard. Parfois le client ne le dit pas directement, mais vous voyez des demandes de devis, des appels d&apos;offres, des mises en concurrence. Le moment où vous l&apos;apprenez est déjà tardif. Le moment où le client compare, c&apos;est le moment où il est déjà à moitié parti.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            6. La baisse de la consommation
          </h3>

          <p className="mb-8">
            Pour les services facturés à l&apos;usage, c&apos;est le signal le plus objectif. Le client utilise moins votre service, commande moins, sollicite moins vos équipes. Souvent la baisse est progressive. 10% par mois pendant trois mois. C&apos;est rarement un hasard. C&apos;est une désaffection mesurable.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            7. Les petites plaintes qui s&apos;accumulent
          </h3>

          <p className="mb-8">
            Le client ne fait pas de réclamation officielle. Mais il émet des réserves, des « oui mais », des petites insatisfactions qu&apos;il ne pousse pas. Un commercial ou un chef de projet qui les entend les minimise souvent. « Il râle mais ça va. » Non. Une plainte non suivie d&apos;action est un signal de départ programmé, surtout si elle s&apos;ajoute à d&apos;autres signaux.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le protocole de revue trimestrielle anti-churn
          </h2>

          <p className="mb-8">
            Surveiller les signaux ne suffit pas. Il faut un rituel qui oblige à les traiter. C&apos;est le protocole que je pose avec les équipes que j&apos;accompagne : la revue trimestrielle anti-churn.
          </p>

          <p className="mb-8">
            Une revue par trimestre, 30 minutes, par client prioritaire (les 20% qui font 80% du CA). Quatre questions à se poser systématiquement :
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-3">
              <strong>Question 1 : Combien de signaux faibles cumulés ce trimestre ?</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Passez en revue les 7 signaux. Notez objectivement combien se sont manifestés. Si le total atteint 3 ou plus, le client est dans la zone de risque. Il faut agir dans les 15 jours.
            </p>
            <p className="mb-3">
              <strong>Question 2 : Qui sont les interlocuteurs actuels ?</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Vérifiez si le contact principal est le même qu&apos;il y a six mois. Si oui, demandez-vous s&apos;il est toujours impliqué. Si non, planifiez une visite de réassurance avec le nouveau dans les 30 jours.
            </p>
            <p className="mb-3">
              <strong>Question 3 : Quelle est la tendance de consommation ?</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Comparez le volume du trimestre avec le même trimestre de l&apos;année précédente. Une baisse de plus de 15% sans explication commerciale claire est un signal qui devrait déclencher une action.
            </p>
            <p className="mb-3">
              <strong>Question 4 : Quel est le vrai niveau de satisfaction ?</strong>
            </p>
            <p className="text-slate-700">
              Pas celui déclaré en réunion. Le vrai. Celui qui se mesure aux actes : le client recommande-t-il votre service à d&apos;autres ? Participe-t-il à vos événements ? Répond-il aux sondages ? Un client qui ne s&apos;engage plus est un client qui s&apos;éloigne.
            </p>
          </div>

          <p className="mb-8">
            La règle est simple : un signal seul = on note. Deux signaux = on vérifie. Trois signaux = on appelle le client, on programme un point physique. Quatre signaux ou plus = on fait une revue de compte d&apos;urgence avec le dirigeant ou le commercial.
          </p>

          <p className="mb-8">
            Et la règle la plus importante : on agit dans les 15 jours. Pas dans le mois. Pas au prochain trimestre. Un signal faible a une date de péremption. Passé quinze jours, il devient juste une mémoire de départ.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Approfondir la rétention client
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente intègre un module rétention client : signaux faibles, protocole de revue trimestrielle, plan de réassurance.
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
              Le diagnostic commercial identifie les signaux faibles que votre équipe ne voit pas. 5 minutes pour savoir si vos clients vous envoient des alertes que vous ne lisez pas.
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
                  → Rétention client B2B en PME : pourquoi vos clients partent sans vous le dire
                </Link>
              </li>
              <li>
                <Link href="/blog/prochain-million-portefeuille-clients-expansion" className="text-mint-green hover:underline">
                  → Décrocher le prochain million : développez votre portefeuille clients existants
                </Link>
              </li>
              <li>
                <Link href="/blog/coaching-commercial-diagnostic-ecoute" className="text-mint-green hover:underline">
                  → Coaching commercial : le diagnostic qui change tout
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
