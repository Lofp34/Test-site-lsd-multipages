import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const carouselPrefix = '/images/blog/ia-commercial-b2b-revelateur-competences';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover : L\'IA ne fera pas le travail du commercial, elle révèle qui sait vendre', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-excuse.webp`, alt: 'L\'IA retire les excuses du commercial en automatisant la préparation', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-realite.webp`, alt: 'La réalité du terrain : sans l\'IA, le commercial moyen passe des heures sur des tâches automatisables', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-question.webp`, alt: 'La question n\'est pas de savoir si l\'IA remplacera le commercial mais ce qu\'elle révélera', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-info-jugement.webp`, alt: 'Quand l\'information est partout, le jugement devient la vraie compétence commerciale', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-signal.webp`, alt: 'Le signal faible que personne ne repère : le commercial qui résiste à l\'IA', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-lecture.webp`, alt: 'La lecture du client : l\'IA donne les données mais pas l\'interprétation', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-revelation.webp`, alt: 'La révélation : l\'IA expose le vrai niveau de préparation de chaque commercial', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-illusion.webp`, alt: 'L\'illusion de la productivité : faire plus vite sans faire mieux', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-formation.webp`, alt: 'La formation commerciale doit pivoter vers le jugement et la stratégie', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-competence.webp`, alt: 'La compétence qui compte : poser les bonnes questions, pas avoir les bonnes réponses', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-test.webp`, alt: 'Le test : comment évaluer si votre équipe est prête pour l\'ère de l\'IA', index: 11 },
  { src: `${carouselPrefix}/bd-slide-13-evidence.webp`, alt: 'L\'évidence : les meilleurs commerciaux welcoming l\'IA, les autres la craignent', index: 12 },
  { src: `${carouselPrefix}/bd-slide-14-cta.webp`, alt: 'Call to action : évaluez la maturité IA de votre équipe commerciale', index: 13 },
];

const articleUrl = 'https://www.laurentserre.com/blog/ia-commercial-b2b-revelateur-competences';
const heroImage = '/images/blog/ia-commercial-b2b-revelateur-competences/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/ia-commercial-b2b-revelateur-competences/hero.webp';

export const metadata: Metadata = {
  title: 'L\'IA ne fera pas le travail du commercial. Elle montrera s\'il sait vendre.',
  description:
    'L\'IA retire les excuses du commercial. Sans la préparation automatique, le vrai jugement devient visible. Les meilleurs vendeurs B2B survivront, les autres révéleront leur vrai niveau.',
  keywords: [
    'IA remplacement commercial B2B',
    'compétences commercial 2026',
    'IA transformation vente B2B',
    'commercial augmenté par IA',
    'avenir métier commercial B2B',
    'jugement commercial',
    'commercial B2B 2028',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-07-02',
  },
  openGraph: {
    title: 'L\'IA ne fera pas le travail du commercial. Elle montrera s\'il sait vendre.',
    description:
      'L\'IA retire les excuses du commercial. Sans la préparation automatique, le vrai jugement devient visible.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'L\'IA ne fera pas le travail du commercial : elle révèle qui sait vraiment vendre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L\'IA ne fera pas le travail du commercial. Elle montrera s\'il sait vendre.',
    description:
      'L\'IA retire les excuses du commercial. Sans la préparation automatique, le vrai jugement devient visible.',
    images: [heroImageAbsolute],
  },
};

const faqItems = [
  {
    question: 'L\'IA va-t-elle remplacer les commerciaux B2B ?',
    answer:
      'Non. L\'IA ne remplace pas le commercial, elle retire une partie de ses excuses. En automatisant la préparation, la recherche d\'informations et les tâches CRM, elle rend le vrai niveau commercial plus visible. La compétence qui reste décisive, c\'est le jugement : comprendre une situation, décider du bon angle, lire les signaux humains en rendez-vous, et construire une prochaine étape qui engage. L\'IA peut préparer le dossier. Elle ne peut pas vendre à la place du commercial.',
  },
  {
    question: 'Quelles compétences pour un commercial en 2026 ?',
    answer:
      'Les compétences qui feront la différence en 2026 sont celles que l\'IA ne peut pas automatiser : poser de meilleures questions, écouter les mots exacts du client, comprendre qui décide vraiment, faire dire ce qui coince, construire une prochaine étape qui engage, savoir arrêter une affaire qui n\'existe pas. En parallèle, le commercial doit savoir utiliser l\'IA comme amplificateur : préparer plus vite, personnaliser mieux, et gagner du temps sur les tâches à faible valeur pour le consacrer aux interactions à haute valeur.',
  },
  {
    'question': 'Comment l\'IA transforme-t-elle la vente B2B ?',
    'answer':
      'L\'IA transforme la vente B2B d\'abord en automatisant ce qui est automatisable : la recherche d\'informations sur les prospects, la mise à jour CRM, la génération de propositions standards, la priorisation des leads. Ce changement rend plus visible ce qui reste humain : la découverte des besoins complexes, la lecture des signaux implicites en rendez-vous, la construction de la confiance, la négociation. Le rôle du commercial évolue : il passe de l\'exécution d\'un process à l\'exercice d\'un jugement commercial.',
  },
  {
    'question': 'Qu\'est-ce qu\'un commercial augmenté par l\'IA ?',
    'answer':
      'Un commercial augmenté par l\'IA est un commercial qui utilise l\'intelligence artificielle pour amplifier son efficacité sans perdre son jugement. Il prépare ses rendez-vous plus vite, personnalise ses messages avec plus de pertinence, suit ses dossiers avec moins d\'effort administratif. Mais il garde la main sur ce qui décide de la vente : la relation, la lecture de la situation, le moment d\'avancer ou de reculer. L\'IA est un copilote, pas un pilote automatique. Le commercial qui comprend cette nuance garde un avantage décisif.',
  },
];

export default function IaCommercialB2bRevelateurCompetencesPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'L\'IA ne fera pas le travail du commercial. Elle montrera s\'il sait vendre.',
        description:
          'L\'IA retire les excuses du commercial. Sans la préparation automatique, le vrai jugement devient visible. Les meilleurs vendeurs B2B survivront, les autres révéleront leur vrai niveau.',
        image: heroImageAbsolute,
        datePublished: '2026-07-02',
        dateModified: '2026-07-02',
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
        articleSection: 'Vente B2B / IA',
        keywords: [
          'IA remplacement commercial B2B',
          'compétences commercial 2026',
          'commercial augmenté par IA',
          'avenir métier commercial B2B',
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
          { '@type': 'ListItem', position: 3, name: 'L\'IA ne fera pas le travail du commercial. Elle montrera s\'il sait vendre.', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">L&apos;IA ne fera pas le travail du commercial. Elle montrera s&apos;il sait vendre.</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Vente B2B / IA
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              L&apos;IA ne fera pas le travail du commercial. Elle montrera s&apos;il sait vendre.
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
              <time dateTime="2026-07-02">2 juillet 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>
          </div>

          <div className="mb-8">
            <AuthorCard />
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un directeur commercial expérimenté dans son bureau, laptop ouvert avec des données analytiques, lumière naturelle, regard confiant et réfléchi"
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

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              Ce qu&apos;il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              L&apos;IA ne remplace pas le commercial, elle retire ses excuses et révèle son vrai niveau.
              Quand la préparation, la recherche et les relances deviennent automatiques, le jugement commercial devient la compétence décisive.
              Les équipes qui ne forment pas leurs commerciaux sur ce que l&apos;IA ne règle pas perdront leur avantage.
            </p>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vos commerciaux sont-ils prêts pour l&apos;ère de l&apos;IA ? Diagnostic flash offert
            </Link>
          </div>

          {/* Carrousel BD */}
          <div className="mb-12">
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : L'IA, révélateur de compétences commerciales"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-ia-revelateur-competences.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                📥 Télécharger le carrousel PDF
              </Link>
            </div>
          </div>

          <p className="mb-8">
            On présente souvent l&apos;IA comme une menace pour les commerciaux.
          </p>

          <p className="mb-8">
            Je crois que le sujet est mal posé.
          </p>

          <p className="mb-8">
            Dans beaucoup de PME, l&apos;IA ne va pas d&apos;abord remplacer le commercial. Elle va lui retirer une partie de ses excuses.
          </p>

          <p className="mb-8">
            Aujourd&apos;hui, un commercial peut encore passer beaucoup de temps à préparer un rendez-vous, chercher des informations, remettre à jour son CRM, écrire une proposition, relancer proprement, retrouver l&apos;historique d&apos;un échange.
          </p>

          <p className="mb-8">
            Demain, une bonne partie de ce travail sera plus rapide, mieux rangée, parfois même faite automatiquement.
          </p>

          <p className="mb-8">
            Et c&apos;est justement là que le vrai niveau commercial va apparaître.
          </p>

          <p className="mb-8">
            Parce que si l&apos;IA prépare le rendez-vous, le commercial n&apos;aura plus l&apos;excuse de ne pas connaître le client.
          </p>

          <p className="mb-8">
            S&apos;il obtient en quelques minutes les derniers signaux sur l&apos;entreprise, les personnes clés, les priorités probables, les sujets de tension, alors la question ne sera plus : « As-tu eu le temps de préparer ? »
          </p>

          <p className="mb-8">
            La question sera : « Qu&apos;as-tu compris de tout ça ? »
          </p>

          <p className="mb-8">
            Ce n&apos;est pas la même chose.
          </p>

          <p className="mb-8">
            C&apos;est exactement ce que nous observons déjà avec la transformation des métiers commerciaux, que j&apos;explore dans l&apos;article sur{' '}
            <Link href="/blog/ia-transforme-developpement-commercial-2025" className="text-mint-green hover:underline">
              comment l&apos;IA transforme le développement commercial
            </Link>
            . L&apos;outil ne change pas la nature du travail : il change ce qu&apos;on attend de celui qui le fait.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L&apos;IA peut donner de l&apos;information. Elle ne donne pas du jugement.
          </h2>

          <p className="mb-8">
            Une synthèse peut dire qu&apos;une entreprise recrute, change d&apos;organisation, lance une nouvelle offre ou traverse une phase de croissance.
          </p>

          <p className="mb-8">
            Mais elle ne dit pas toujours ce que cela change dans la vente.
          </p>

          <p className="mb-8">
            Faut-il appeler maintenant ? Avec quel angle ? Faut-il parler au dirigeant, au directeur commercial, au responsable opérationnel ? Est-ce un vrai signal d&apos;achat ou seulement du bruit ?
          </p>

          <p className="mb-8">
            C&apos;est là que le commercial reste décisif.
          </p>

          <p className="mb-8">
            Pas parce qu&apos;il sait faire une recherche LinkedIn plus vite qu&apos;un outil.
          </p>

          <p className="mb-8">
            Parce qu&apos;il sait relier une information à une situation commerciale réelle.
          </p>

          <p className="mb-8">
            Dans un rendez-vous, l&apos;IA peut aider à préparer de bonnes questions. Elle peut même suggérer une trame.
          </p>

          <p className="mb-8">
            Mais elle ne voit pas toujours le moment où le client répond trop vite. Le silence après une question simple. Le dirigeant qui regarde son associé avant de répondre. Le prospect qui parle beaucoup du prix parce qu&apos;il n&apos;a pas encore compris pourquoi il devrait changer.
          </p>

          <p className="mb-8">
            Ces détails-là ne sont pas des données secondaires.
          </p>

          <p className="mb-8">
            Ce sont souvent les vrais signaux de la vente.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le commercial faible sera plus visible
          </h2>

          <p className="mb-8">
            C&apos;est peut-être cela, le changement le plus dur.
          </p>

          <p className="mb-8">
            Quand les tâches autour de la vente deviennent plus faciles, le manque de fond devient plus visible.
          </p>

          <p className="mb-8">
            Un commercial qui enchaîne des messages moyens ne pourra plus dire qu&apos;il manque de temps pour personnaliser.
          </p>

          <p className="mb-8">
            Un commercial qui sort d&apos;un rendez-vous sans prochaine étape claire ne pourra plus se cacher derrière un compte-rendu bien rempli.
          </p>

          <p className="mb-8">
            Un commercial qui confond un échange sympathique avec une affaire sérieuse sera toujours en difficulté, même avec les meilleurs outils.
          </p>

          <p className="mb-8">
            L&apos;IA peut améliorer l&apos;exécution.
          </p>

          <p className="mb-8">
            Elle ne transforme pas automatiquement le jugement commercial.
          </p>

          <p className="mb-8">
            Or c&apos;est souvent là que les ventes se gagnent ou se perdent : savoir si le problème est prioritaire, si la bonne personne est dans la discussion, si le client a vraiment intérêt à décider maintenant, si la proposition arrive trop tôt, si la relance entretient le flou ou remet de la clarté.
          </p>

          <p className="mb-8">
            C&apos;est d&apos;ailleurs ce que je développe dans l&apos;article sur{' '}
            <Link href="/blog/acheteurs-b2b-2026-client-deja-informe" className="text-mint-green hover:underline">
              les acheteurs B2B qui arrivent déjà informés en rendez-vous
            </Link>
            . Le client sait déjà tout ce qui est en ligne. Ce qu&apos;il attend du commercial, c&apos;est un jugement que l&apos;IA ne peut pas lui donner.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Le vrai problème n&apos;est pas l&apos;outil
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente entraîne vos commerciaux sur ce que l&apos;IA ne règle pas : poser les bonnes questions, écouter les vrais signaux, construire une prochaine étape qui engage. Vos équipes repartent avec des réflexes qui tiennent dans la durée.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les dirigeants devront former autrement
          </h2>

          <p className="mb-8">
            Le risque, pour une PME, serait de croire qu&apos;il suffit d&apos;équiper l&apos;équipe.
          </p>

          <p className="mb-8">
            Un nouvel outil ne rend pas une équipe plus exigeante dans ses rendez-vous. Il rend seulement plus visible ce qu&apos;elle sait déjà faire, ou ce qu&apos;elle ne sait pas faire.
          </p>

          <p className="mb-8">
            Il faudra donc former les commerciaux sur ce que l&apos;IA ne règle pas : poser de meilleures questions, écouter les mots exacts du client, comprendre qui décide vraiment, faire dire ce qui coince, construire une prochaine étape qui engage, savoir arrêter une affaire qui n&apos;existe pas.
          </p>

          <p className="mb-8">
            Ce sont des compétences moins spectaculaires qu&apos;une démo d&apos;outil.
          </p>

          <p className="mb-8">
            Mais ce sont elles qui feront la différence.
          </p>

          <p className="mb-8">
            Le commercial B2B de demain ne sera pas forcément celui qui utilise le plus d&apos;IA.
          </p>

          <p className="mb-8">
            Ce sera celui qui s&apos;en sert pour arriver mieux préparé, puis qui fait ce que l&apos;outil ne peut pas faire à sa place : comprendre, décider, cadrer, et tenir une vraie conversation commerciale.
          </p>

          <p className="mb-8">
            C&apos;est exactement la ligne que je trace dans l&apos;article sur{' '}
            <Link href="/blog/commercial-en-2026-competences-qui-feront-difference" className="text-mint-green hover:underline">
              les compétences qui feront la différence pour un commercial en 2026
            </Link>
            . Le fond du métier ne change pas. Ce qui change, c&apos;est qu&apos;on ne pourra plus le cacher.
          </p>

          <p className="mb-8">
            L&apos;IA ne supprimera pas la vente.
          </p>

          <p className="mb-8">
            Elle supprimera surtout une partie du brouillard autour de la vente.
          </p>

          <p className="mb-0 text-lg font-semibold text-blue-ink mt-8">
            Et quand le brouillard se lève, on voit mieux qui sait vraiment vendre.
          </p>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/blog/acheteurs-b2b-2026-client-deja-informe" className="text-mint-green hover:underline">
                  Acheteurs B2B 2026 : votre client arrive déjà informé en rendez-vous
                </Link>
              </li>
              <li>
                <Link href="/blog/ia-transforme-developpement-commercial-2025" className="text-mint-green hover:underline">
                  Comment l&apos;IA transforme le développement commercial
                </Link>
              </li>
              <li>
                <Link href="/blog/commercial-en-2026-competences-qui-feront-difference" className="text-mint-green hover:underline">
                  Le commercial en 2026 : les compétences qui feront la différence
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vos commerciaux sont-ils prêts pour l&apos;ère de l&apos;IA ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic flash de votre équipe commerciale évalue en 20 minutes le vrai niveau de vos commerciaux : leur capacité à juger une situation, à lire les vrais signaux, à construire une vente sans se cacher derrière les outils. Un état des lieux concret pour savoir par où commencer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 bg-mint-green text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic flash offert
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
              >
                Découvrir le Bootcamp
              </Link>
            </div>
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

          <div className="mt-16">
            <AuthorCard />
          </div>

          {/* HubSpot Form */}
          <div className="mt-8">
            <HubSpotForm />
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-mint-green hover:underline text-sm">
              Retour au blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
