import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/vendre-comite-achat-multi-decideurs-pme';
const heroImage = '/images/blog/vendre-comite-achat-multi-decideurs-pme/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/vendre-comite-achat-multi-decideurs-pme/hero.webp';

export const metadata: Metadata = {
  title: 'Vendre à un comité d\'achat multi-décideurs en PME : méthode terrain',
  description:
    'Un champion unique ne suffit plus. 6 à 11 décideurs par deal B2B, cycles +30%, 79% d\'implication CFO. La méthode terrain pour cartographier, orchestrer et conclure.',
  keywords: [
    'comité d\'achat B2B',
    'multi-décideurs PME',
    'vendre à plusieurs décideurs',
    'buying committee B2B',
    'cycle de vente allongé',
    'hidden buyers',
    'cartographier comité d\'achat',
    'orchestrer vente complexe PME',
    'multi-threading commercial',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-29',
  },
  openGraph: {
    title: 'Vendre à un comité d\'achat multi-décideurs en PME : méthode terrain',
    description:
      'Un champion unique ne suffit plus. 6 à 11 décideurs par deal, cycles +30%, 79% d\'implication CFO. La méthode terrain pour cartographier, orchestrer et conclure.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Vendre à un comité d\'achat multi-décideurs en PME : méthode terrain de Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendre à un comité d\'achat multi-décideurs en PME : méthode terrain',
    description:
      'Un champion unique ne suffit plus. 6 à 11 décideurs par deal. La méthode terrain pour cartographier, orchestrer et conclure avec un comité d\'achat.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/vendre-comite-achat-multi-decideurs-pme';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover — Le piège du champion unique dans un comité d\'achat multi-décideurs', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-constat.webp`, alt: 'Un commercial enthousiaste avec son contact qui ne peut pas décider seul', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-piege.webp`, alt: 'Le piège : un champion enthousiaste mais sans pouvoir de décision', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-carte.webp`, alt: 'Cartographier les rôles de chaque décideur dans le comité d\'achat', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-multithread.webp`, alt: 'Multi-threading : toucher chaque décideur avec le bon argument', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-hidden.webp`, alt: 'Les hidden buyers : procurement, legal, IT — ceux qu\'on oublie', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-consensus.webp`, alt: 'Orchestrer le consensus sans forcer la décision', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-cfo.webp`, alt: 'Impliquer le CFO : l\'argument qui change la donne', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-lecon.webp`, alt: 'La leçon : un deal multi-décideurs ne se gagne pas sur un seul rendez-vous', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-conclusion.webp`, alt: 'Le champion ne suffit pas, il faut orchestrer tout le comité', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-cta.webp`, alt: 'CTA — Diagnostic offert sur laurentserre.com', index: 10 },
];

const faqItems = [
  {
    question: 'Qu\'est-ce qu\'un comité d\'achat en B2B ?',
    answer:
      'Un comité d\'achat B2B est l\'ensemble des personnes qui influencent ou décident un achat professionnel. En 2026, il réunit en moyenne 6 à 11 personnes par deal dans une PME : le dirigeant ou le directeur général, le directeur commercial, le directeur financier, parfois le responsable IT ou juridique, et jusqu\'à 3 utilisateurs métier. Chacun a des critères et des préoccupations différents.',
  },
  {
    question: 'Combien de personnes composent un comité d\'achat en PME ?',
    answer:
      'Entre 6 et 11 personnes en moyenne. C\'est un chiffre qui a doublé en cinq ans. Même dans une PME de 30 personnes, un achat structurant peut impliquer 4 à 6 décideurs. Le dirigeant ne décide plus seul. Il consulte, il arbitre, il valide — mais il ne tranche plus sans avoir aligné les parties prenantes clés.',
  },
  {
    question: 'Comment cartographier un comité d\'achat ?',
    answer:
      'En posant quatre questions : (1) Qui va utiliser notre solution au quotidien ? (2) Qui va devoir changer ses habitudes ? (3) Qui va devoir valider le budget ? (4) Qui va bloquer si on ne le convainc pas ? Pour chaque nom, vous notez son rôle, son enjeu personnel et son poids dans la décision. Cette carte vous dit où concentrer vos efforts.',
  },
  {
    question: 'Pourquoi mon deal stagne alors que mon contact est enthousiaste ?',
    answer:
      'Parce qu\'un champion enthousiaste ne suffit pas. Votre contact peut aimer votre solution, la défendre en interne, croire en vous. Mais si les autres décideurs du comité n\'ont pas été touchés, ils freineront, demanderont des délais ou imposeront des conditions. L\'enthousiasme d\'un seul ne remplace jamais l\'alignement de tous.',
  },
  {
    question: 'Qu\'est-ce que le multi-threading commercial ?',
    answer:
      'Le multi-threading, c\'est la capacité à créer une relation directe avec chaque membre du comité d\'achat, pas seulement avec votre interlocuteur principal. Concrètement : un démo pour le responsable métier, une réunion financière pour le CFO, un call technique pour l\'IT, un déjeuner pour le dirigeant. Chaque fil est indépendant, mais tous convergent vers la même décision.',
  },
  {
    question: 'Comment impliquer le CFO dans une décision d\'achat B2B ?',
    answer:
      'Le CFO n\'achète pas une solution, il achète un impact financier. Il veut savoir ce que ça coûte, ce que ça rapporte, et surtout quel est le risque de ne pas faire le projet. Pour l\'impliquer : préparez un cas économique simple (investissement, économies, délai de retour), montrez comment le projet réduit un coût ou sécurise un revenu, et ne cachez pas les risques.',
  },
];

export default function VendreComiteAchatMultiDecideursPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Vendre à un comité d\'achat multi-décideurs en PME : méthode terrain',
        description:
          'Un champion unique ne suffit plus. 6 à 11 décideurs par deal B2B, cycles +30%, 79% d\'implication CFO. La méthode terrain pour cartographier, orchestrer et conclure.',
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
        articleSection: 'Vente B2B / Comité d\'achat',
        keywords: [
          'comité d\'achat B2B',
          'multi-décideurs PME',
          'vendre à plusieurs décideurs',
          'buying committee',
          'cycle vente B2B',
          'multi-threading commercial',
          'hidden buyers',
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
          { '@type': 'ListItem', position: 3, name: 'Vendre à un comité d\'achat multi-décideurs en PME', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Vendre à un comité d'achat multi-décideurs en PME</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Vente B2B / Comité d&apos;achat
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Vendre à un comité d'achat multi-décideurs en PME : cartographier, orchestrer, conclure
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
              <span>10 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Vendre à un comité d'achat multi-décideurs en PME : un dirigeant face à une table de décision avec plusieurs profils"
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
              En 2026, un deal B2B en PME implique 6 à 11 décideurs. Un champion unique ne suffit plus. L&apos;erreur la plus fréquente : s&apos;arrêter à un contact enthousiaste sans cartographier le vrai comité de décision. La méthode terrain : cartographier les rôles, multi-threader chaque interlocuteur, anticiper les hidden buyers, orchestrer le consensus.
            </p>
          </div>

          {/* BD Carrousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Le piège du champion unique
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire de Julien, commercial confirmé, qui croyait tenir son deal grâce à Marc, son contact enthousiaste. Mais Marc n&apos;était pas le vrai décideur. Personne n&apos;avait parlé au directeur financier ni au responsable IT. Le deal a stagné trois mois. Jusqu&apos;à ce qu&apos;on cartographie le vrai comité d&apos;achat.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Vendre à un comité d'achat multi-décideurs"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-comite-achat-multi-decideurs.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (11 planches)
              </Link>
            </div>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vos deals stagnent à cause d'un comité d'achat invisible ? Diagnostic offert
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Vous avez un champion enthousiaste. Le deal stagne quand même. Pourquoi ?
          </h2>

          <p className="mb-8">
            Julien est commercial depuis douze ans. Il maîtrise son produit, tient bien un rendez-vous, relance sans agressivité. Il a rencontré Marc, le responsable production d'une PME de 80 personnes. Marc était emballé. « Ta solution me change la vie », il a dit. Trois réunions plus tard, le deal est au point mort depuis huit semaines.
          </p>

          <p className="mb-8">
            Julien m'a appelé : « Je ne comprends pas. Marc adore. Mais ça ne signe pas. »
          </p>

          <p className="mb-8">
            En dix minutes de questions, on a trouvé. Marc était enthousiaste, oui. Mais Marc n'était pas le décideur. Marc n'était pas le seul utilisateur. Et surtout, personne n'avait parlé au directeur financier, ni au responsable IT, ni au dirigeant. Six personnes étaient impliquées dans la décision. Julien n'en avait rencontré qu'une.
          </p>

          <p className="mb-8">
            Ce scénario, je le vois en moyenne une fois par mission. Un commercial compétent, un bon contact, un deal qui stagne. Et systématiquement, la même cause : le champion unique. Un seul allié dans un jeu qui en demande six.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La réalité 2026 : le comité d'achat s'est élargi, pas rétréci
          </h2>

          <p className="mb-8">
            Les chiffres sont connus. En 2026, un achat B2B implique entre 6 et 11 personnes en moyenne. Le directeur financier intervient dans 79% des décisions. Les cycles de vente ont allongé de 30% en cinq ans.
          </p>

          <p className="mb-8">
            Ce n'est pas une tendance. C'est une nouvelle structure de décision. Et elle ne va pas revenir en arrière. Plus les outils sont interconnectés, plus les données sont partagées, plus les décisions d'achat deviennent collectives — même dans une PME de 40 personnes.
          </p>

          <p className="mb-8">
            Un de mes clients dirige une PME de 35 personnes dans le logiciel. Son cycle de vente moyen est passé de 45 à 75 jours en deux ans. Pas parce que son produit est moins bon. Parce que ses prospects ont désormais besoin d'un alignement entre le métier, la finance, l'IT et la direction générale avant de signer. Quatre univers qui ne parlent pas le même langage.
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="text-blue-ink font-semibold mb-2">Chiffres clés 2026</p>
            <ul className="space-y-2 text-slate-700 list-disc pl-5">
              <li>6 à 11 décideurs par achat B2B en moyenne</li>
              <li>79% des décisions impliquent le directeur financier</li>
              <li>Cycles de vente allongés de +30% en cinq ans</li>
              <li>3 à 5 réunions supplémentaires par rapport à 2020</li>
              <li>67% des deals échouent par manque d'alignement interne du prospect</li>
            </ul>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le piège du champion unique
          </h2>

          <p className="mb-8">
            Le champion unique, c'est cette personne emballée par votre solution, qui vous ouvre des portes, vous donne des informations internes, vous dit « je vais défendre votre dossier ». C'est précieux. Mais c'est insuffisant.
          </p>

          <p className="mb-8">
            Le problème n'est pas votre contact. Le problème, c'est que vous arrêtez de chercher. Vous avez une personne qui vous aime, vous vous sentez en sécurité, et vous ne creusez plus la carte des décideurs.
          </p>

          <p className="mb-8">
            En coaching, je vois des commerciaux compétents tomber dans ce piège tous les jours. Ils confondent{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-confondent-interet-et-decision" className="text-mint-green hover:underline">
              intérêt et décision
            </Link>. Votre contact peut être sincèrement intéressé, sincèrement convaincu. Mais si les autres membres du comité ne le sont pas, votre deal n'existe pas encore.
          </p>

          <p className="mb-8">
            Les signes qui ne trompent pas : votre contact ne peut pas citer le nom des autres décideurs, il ne sait pas ce que chacun attend, il ne connaît pas le budget réel ni le processus de validation. Si c'est le cas, vous n'avez pas un champion. Vous avez un allié isolé.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Maîtriser la cartographie des décideurs
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente inclut le module comité d'achat : cartographie des rôles, techniques de multi-threading, gestion des objections multiples, orchestration du consensus. Vos commerciaux repartent avec une méthode qui fonctionne sur les deals à 6 décideurs comme sur les deals à 1.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Cartographier le comité : les 4 questions qui changent tout
          </h2>

          <p className="mb-8">
            La première étape, c'est de savoir qui est vraiment dans le jeu. Pas les noms qu'on vous donne, pas les titres approximatifs. Les vrais rôles de décision.
          </p>

          <p className="mb-8">
            Voici les quatre questions que j'apprends aux commerciaux que je coache. Elles se posent dès le premier rendez-vous, et elles se reposent à chaque étape :
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-3">
              <strong>1. Qui va utiliser notre solution au quotidien ?</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Si ce n'est pas votre interlocuteur, vous devez rencontrer les utilisateurs. Ce sont eux qui valideront l'ergonomie, la simplicité, l'utilité réelle. Un dirigeant peut adorer votre solution. Si ses équipes la trouvent trop complexe, le deal meurt après la signature.
            </p>

            <p className="mb-3">
              <strong>2. Qui va devoir changer ses habitudes ?</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Une solution qui change un process existant crée toujours des résistances. Les personnes concernées ont un droit de veto implicite. Il faut les rencontrer, comprendre leurs craintes, leur montrer ce que ça va leur apporter à elles — pas seulement à l'entreprise.
            </p>

            <p className="mb-3">
              <strong>3. Qui valide le budget ?</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Ce n'est pas toujours le dirigeant. Dans beaucoup de PME, le directeur financier a un droit de veto délégué. Parfois c'est le directeur commercial qui arbitre entre plusieurs priorités. Savoir qui tient les cordons de la bourse est la première urgence.
            </p>

            <p className="mb-3">
              <strong>4. Qui peut bloquer sans être convaincu ?</strong>
            </p>
            <p className="text-slate-700">
              C'est la question la plus importante. Il y a toujours un bloqueur potentiel. Parfois c'est le responsable IT qui doit valider la compatibilité technique. Parfois c'est un associé silencieux. Parfois c'est quelqu'un que votre contact ne veut pas nommer. Cette question doit être posée de façon directe : « Qui pourrait dire non, même si tout le monde dit oui ? »
            </p>
          </div>

          <p className="mb-8">
            Avec ces quatre réponses, vous dessinez une carte. Au centre, votre contact. Autour, les utilisateurs, les influenceurs, les décideurs, les bloqueurs. Chaque nom a un rôle, un enjeu, et un degré d'accès.
          </p>

          <p className="mb-8">
            C'est exactement ce que je développe dans mon travail sur la{' '}
            <Link href="/blog/psychologie-decision-b2b-7-ressorts-guide" className="text-mint-green hover:underline">
              psychologie de décision B2B
            </Link>. Comprendre qui décide, et pourquoi, est le préalable à toute méthode de vente.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Multi-threading : ne pas mettre tous ses œufs dans le même panier
          </h2>

          <p className="mb-8">
            Une fois la carte dessinée, il faut tisser une relation directe avec chaque personne. Pas par contact interposé. Pas « Marc vous parlera de nous ». Vous, directement.
          </p>

          <p className="mb-8">
            Le multi-threading, c'est ça. Créer plusieurs fils de discussion indépendants. Un démo pour le responsable métier. Une réunion financière pour le CFO. Un call technique pour l'IT. Un café pour le dirigeant. Chaque fil avance à son rythme, avec son langage, avec ses arguments.
          </p>

          <p className="mb-8">
            Pourquoi c'est critique ? Parce que si vous ne dépendez que d'un seul interlocuteur, vous êtes vulnérable. Si ce contact change de poste, part en vacances, perd son influence, ou tout simplement ne relaie pas bien votre message — vous perdez le deal.
          </p>

          <p className="mb-8">
            En coaching, je vois des commerciaux qui hésitent à contacter directement d'autres décideurs. « Marc va se sentir court-circuité. » Ma réponse est toujours la même : « Proposez à Marc de l'aider. Dites-lui que vous voulez faciliter son travail de plaidoyer interne. » Un bon champion n'est pas menacé par votre accès aux autres. Il est soulagé.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les hidden buyers : ceux qu'on oublie systématiquement
          </h2>

          <p className="mb-8">
            Il y a des décideurs qu'on ne voit pas venir. Ils ne participent pas aux réunions, ils ne sont pas cités dans l'organigramme, ils n'apparaissent pas dans le process de validation officiel. Mais ils ont un droit de veto réel.
          </p>

          <p className="mb-8">
            Les trois plus fréquents dans les PME que j'accompagne :
          </p>

          <p className="mb-3">
            <strong>Le procurement ou acheteur.</strong> Même dans une PME, il peut y avoir une fonction achats, même à temps partiel. Cette personne compare, met en concurrence, négocie les conditions. Si vous ne l'avez pas rencontrée, elle peut bloquer ou allonger le cycle de trois mois.
          </p>

          <p className="mb-3">
            <strong>Le responsable juridique.</strong> Sur les contrats, les CGV, la conformité. Il est souvent consulté en fin de processus, et c'est là qu'il peut tout faire capoter parce qu'une clause ne lui convient pas. Mieux vaut l'identifier tôt et lui envoyer les documents en amont.
          </p>

          <p className="mb-8">
            <strong>L'IT ou le DSI.</strong> Même dans une PME de 50 personnes avec un informaticien externalisé. Si votre solution est SaaS, connectée au SI, hébergée sur des serveurs, l'IT aura son mot à dire. Et il peut dire non pour des raisons que personne n'avait anticipées.
          </p>

          <p className="mb-8">
            L'astuce que j'utilise avec les commerciaux que je coache : à chaque étape du deal, je leur demande de citer les trois personnes qui pourraient dire non sans être dans le process. Si la réponse est « je ne sais pas », on creuse.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Orchestrer le consensus
          </h2>

          <p className="mb-8">
            À ce stade, vous avez la carte. Vous avez ouvert des fils de discussion avec chaque membre du comité. Il reste une étape : faire converger tout ça vers une décision.
          </p>

          <p className="mb-8">
            L'orchestration du consensus, ce n'est pas de la manipulation. C'est de l'alignement. Faire en sorte que chaque personne arrive à la même conclusion par son propre chemin. Le responsable métier parce que ça simplifie son quotidien. Le CFO parce que le retour sur investissement est visible. Le dirigeant parce que ça sert une priorité stratégique.
          </p>

          <p className="mb-8">
            La technique que je vois le mieux marcher : une réunion de synthèse avec l'ensemble des parties prenantes. Pas une réunion de vente. Une réunion de travail. Vous mettez tout le monde autour de la table, vous montrez comment votre solution répond au problème de chacun, et vous laissez le groupe construire sa propre conviction.
          </p>

          <p className="mb-8">
            C'est là que je vois la différence entre un bon commercial et un excellent{' '}
            <Link href="/blog/vente-perdue-avant-non-b2b" className="text-mint-green hover:underline">
              orchestrateur de vente complexe
            </Link>. Le bon commercial vend à une personne. L'excellent fait en sorte qu'un groupe se vende la solution à lui-même.
          </p>

          <p className="mb-8">
            Et quand ça ne marche pas, quand le comité reste divisé ou que le deal gèle, c'est souvent qu'on a mal évalué un des facteurs de la{' '}
            <Link href="/blog/psychologie-decision-b2b-7-ressorts-guide" className="text-mint-green hover:underline">
              psychologie de la décision B2B
            </Link>. La peur du risque d'un décideur peut bloquer tout l'alignement.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Impliquer le CFO : l'argument qui change la donne
          </h2>

          <p className="mb-8">
            Le directeur financier est présent dans 79% des décisions. Pourtant, dans les deals que je vois, c'est souvent la personne la moins sollicitée. Les commerciaux laissent le champion gérer le volet financier. Grave erreur.
          </p>

          <p className="mb-8">
            Le CFO n'achète pas une solution. Il achète une optimisation financière. Il veut savoir : combien ça coûte, combien ça rapporte, et quel est le risque de ne pas le faire. Si votre discours reste technique ou métier, vous ne parlerez jamais à ses vrais critères.
          </p>

          <p className="mb-8">
            L'approche qui marche : un document simple — investissement, économies attendues, délai de retour. Pas de slide marketing. Un tableur ou une page. Et surtout, soyez honnête sur les risques. Rien n'agace plus un directeur financier qu'un commercial qui cache les vrais coûts.
          </p>

          <p className="mb-8">
            Je l'ai vu fonctionner avec un client qui vend des solutions logicielles à des PME. Il a gagné un deal de 80 000 euros parce qu'il a préparé un cas économique crédible, qu'il a présenté lui-même au CFO, et que la réunion a duré 22 minutes. Le champion seul n'aurait jamais réussi à convaincre sans cette réunion directe.
          </p>

          <p className="mb-8 text-lg font-semibold text-blue-ink">
            Vendre à un comité d'achat, ce n'est pas plus compliqué que vendre à une personne. C'est différent. Ça demande une carte, plusieurs fils, et une orchestration. Mais ça s'apprend.
          </p>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vos deals multi-décideurs stagnent ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic commercial identifie les deals qui bloquent à cause d'un comité d'achat mal cartographié. 5 minutes pour savoir si vous vendez à un champion isolé ou à un vrai comité de décision.
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
                <Link href="/blog/psychologie-decision-b2b-7-ressorts-guide" className="text-mint-green hover:underline">
                  → Psychologie de décision B2B : les 7 ressorts qui poussent un prospect à signer
                </Link>
              </li>
              <li>
                <Link href="/blog/pourquoi-vos-commerciaux-confondent-interet-et-decision" className="text-mint-green hover:underline">
                  → Pourquoi vos commerciaux confondent intérêt et décision
                </Link>
              </li>
              <li>
                <Link href="/blog/closing-b2b-budget-gele-pme" className="text-mint-green hover:underline">
                  → Budget gelé en PME : comment débloquer un deal B2B bloqué par le financement
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
