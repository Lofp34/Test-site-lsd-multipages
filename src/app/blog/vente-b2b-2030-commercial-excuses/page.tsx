import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

const articleUrl = 'https://www.laurentserre.com/blog/vente-b2b-2030-commercial-excuses';
const heroImage = '/images/blog/vente-b2b-2030-commercial-excuses/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/vente-b2b-2030-commercial-excuses/hero.webp';

export const metadata: Metadata = {
  title: 'En 2030, le commercial moyen n&rsquo;aura plus beaucoup d&rsquo;excuses | Laurent Serre',
  description:
    'L’IA ne va pas remplacer les commerciaux. Elle va révéler ceux qui confondent activité et impact. La question pour un dirigeant de PME : si j’enlève les tâches de confort, que reste-t-il comme vraie compétence commerciale ?',
  keywords: [
    'avenir vente B2B 2030',
    'commercial 2030 compétences',
    'IA révélation commercial',
    'activité vs impact commercial',
    'vente B2B futur',
    'compétences commerciales 2030',
    'dirigeant PME vente',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-07-04',
  },
  openGraph: {
    title: 'En 2030, le commercial moyen n’aura plus beaucoup d’excuses',
    description:
      'L’IA ne va pas remplacer les commerciaux. Elle va révéler ceux qui confondent activité et impact.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Un dirigeant de PME interroge son équipe commerciale : que reste-t-il quand l’IA fait la mécanique ?',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'En 2030, le commercial moyen n’aura plus beaucoup d’excuses',
    description:
      'L’IA ne va pas remplacer les commerciaux. Elle va révéler ceux qui confondent activité et impact.',
    images: [heroImageAbsolute],
  },
};

const faqItems = [
  {
    question: 'L’IA va-t-elle remplacer les commerciaux en 2030 ?',
    answer:
      'Non. L’IA ne va pas remplacer les commerciaux, elle va rendre les commerciaux faibles plus visibles. En automatisant les tâches mécaniques (recherche, CRM, relances, comptes-rendus), elle enlève une protection confortable : l’excuse de l’activité. Le commercial qui sait écouter, qualifier, comprendre qui décide et conduire une vraie conversation restera plus précieux que jamais. La vente B2B de 2030 sera moins indulgente avec ceux qui confondent activité et impact, mais elle ne sera pas moins humaine.',
  },
  {
    question: 'Quelles compétences pour les commerciaux en 2030 ?',
    answer:
      'Les compétences qui compteront en 2030 sont celles que l’IA ne peut pas automatiser : écouter les mots exacts du client, qualifier une situation sans se fier aux apparences, comprendre qui décide vraiment dans une organisation, défendre un prix sans se réfugier dans la remise, faire parler un client sur ce qui bloque vraiment, construire une prochaine étape qui engage. L’IA peut préparer le dossier et rédiger la proposition. Elle ne peut pas porter une décision difficile avec des humains autour de la table.',
  },
  {
    question: 'Comment l’IA change-t-elle la vente B2B ?',
    answer:
      'L’IA change la vente B2B en automatisant ce qui était chronophage et à faible valeur ajoutée : recherche d’informations sur les prospects, mise à jour CRM, résumé de rendez-vous, première version de propositions standards. Mais ce n’est pas le cœur du changement. Le vrai changement, c’est que le commercial n’aura bientôt plus d’excuse pour arriver mal préparé. Et donc que le vrai niveau de chaque commercial deviendra visible. La question ne sera plus « As-tu eu le temps de préparer ? » mais « Qu’as-tu compris de tout ça ? »',
  },
  {
    question: 'Comment préparer son équipe commerciale à l’IA ?',
    answer:
      'La première chose à faire n’est pas d’équiper l’équipe d’outils d’IA. C’est de vérifier le niveau de compétence commerciale de fond. Posez-vous la question : si toutes les tâches de confort disparaissaient demain, que sauraient faire vos commerciaux de vraiment différenciant ? Savent-ils qualifier proprement ? Savent-ils comprendre les vrais blocages ? Savent-ils écrire un message qui ne ressemble pas à un modèle maquillé ? Si la réponse est fragile, commencez par là, pas par l’outil. Former sur les fondamentaux, puis ajouter l’IA comme amplificateur.',
  },
  {
    question: 'L’activité commerciale va-t-elle diminuer avec l’IA ?',
    answer:
      'L’activité va surtout changer de nature. Les tâches administratives et de recherche vont diminuer, libérant du temps. Mais le piège est de croire que ce temps libéré se transforme automatiquement en ventes. Ce n’est pas le volume d’activité qui fait la performance, c’est la qualité des interactions. Un commercial qui appelle trois fois plus parce que l’IA a généré ses listes ne vendra pas nécessairement mieux. Celui qui utilise ce temps pour mieux comprendre chaque situation, mieux préparer chaque conversation, oui. L’IA ne récompense pas l’activité. Elle récompense le jugement.',
  },
];

export default function VenteB2b2030CommercialExcusesPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'En 2030, le commercial moyen n’aura plus beaucoup d’excuses',
        description:
          'L’IA ne va pas remplacer les commerciaux. Elle va révéler ceux qui confondent activité et impact. La question pour un dirigeant de PME : si j’enlève les tâches de confort, que reste-t-il comme vraie compétence commerciale ?',
        image: heroImageAbsolute,
        datePublished: '2026-07-04',
        dateModified: '2026-07-04',
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
          'avenir vente B2B 2030',
          'commercial 2030 compétences',
          'IA révélation commercial',
          'activité vs impact commercial',
          'vente B2B futur',
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
          { '@type': 'ListItem', position: 3, name: 'En 2030, le commercial moyen n’aura plus beaucoup d’excuses', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">En 2030, le commercial moyen n&rsquo;aura plus beaucoup d&rsquo;excuses</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Vente B2B / IA
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              En 2030, le commercial moyen n&rsquo;aura plus beaucoup d&rsquo;excuses
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
              <span>&bull;</span>
              <time dateTime="2026-07-04">4 juillet 2026</time>
              <span>&bull;</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="mb-8">
            <AuthorCard />
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un dirigeant de PME dans son bureau, post-it et tableau blanc en fond, regard réfléchi face à l’avenir de son équipe commerciale"
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
              ✨ Ce que vous allez retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              L’IA ne va pas remplacer les commerciaux. Elle va enlever leurs excuses et révéler ceux qui confondent activité et impact.
              La question pour un dirigeant de PME n’est pas « Faut-il mettre de l’IA dans la vente ? » mais « Si j’enlève toutes les tâches de confort, que reste-t-il comme vraie compétence commerciale ? ».
            </p>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vos commerciaux savent-ils vendre sans les excuses ? Faites un diagnostic
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#merfiance" className="text-mint-green hover:underline">La méfiance envers les articles prédictifs</a></li>
              <li><a href="#activite-excuse" className="text-mint-green hover:underline">L’activité comme protection confortable</a></li>
              <li><a href="#vraie-question" className="text-mint-green hover:underline">La vraie question que l’IA pose aux équipes</a></li>
              <li><a href="#revelateur" className="text-mint-green hover:underline">L’IA comme révélateur de niveau</a></li>
              <li><a href="#ce-qui-compte" className="text-mint-green hover:underline">Ce qui devient plus important quand la machine fait la mécanique</a></li>
              <li><a href="#question-dirigeant" className="text-mint-green hover:underline">La question que tout dirigeant devrait se poser</a></li>
            </ul>
          </div>

          {/* Article body */}

          <h2 id="merfiance" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Je me méfie des articles qui expliquent à quoi ressemblera la vente dans cinq ans
          </h2>

          <p className="mb-8">
            Je les lis comme tout le monde. Certains sont bien informés. D’autres sont surtout inquiets.
          </p>

          <p className="mb-8">
            Mais presque tous ont un point commun : ils disent que tout va changer, et que le commercial doit avoir peur de l’avenir.
          </p>

          <p className="mb-8">
            Je crois que le vrai sujet est plus simple que ça.
          </p>

          <p className="mb-8">
            En 2030, beaucoup de tâches qui donnent aujourd’hui l’impression de travailler auront disparu ou seront largement assistées par l’IA. Chercher des informations sur une entreprise. Préparer un premier message. Résumer un rendez-vous. Mettre à jour le CRM. Retrouver ce qui a été dit trois semaines plus tôt. Produire une première version d’un email de relance.
          </p>

          <p className="mb-8">
            Tout cela prendra moins de temps. Et c’est une bonne nouvelle.
          </p>

          <p className="mb-8">
            Comme je le montrais dans l’article sur{' '}
            <Link href="/blog/acheteurs-b2b-2026-client-deja-informe" className="text-mint-green hover:underline">
              les acheteurs B2B qui arrivent déjà informés en rendez-vous
            </Link>
            , le client a de moins en moins besoin d’un commercial qui lui récite une plaquette. Il a besoin de quelqu’un qui l’aide à décider. L’IA ne change pas cette réalité : elle l’accélère.
          </p>

          <p className="mb-8">
            Mais en accélérant la préparation, elle enlève aussi une protection confortable à beaucoup d’équipes commerciales.
          </p>

          <h2 id="activite-excuse" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L’activité est devenue une protection
          </h2>

          <p className="mb-8">
            Regardons les choses en face.
          </p>

          <p className="mb-8">
            Aujourd’hui, un commercial peut remplir sa semaine avec des recherches, des relances, des comptes-rendus, des tableaux, des fichiers, des préparations de rendez-vous, des mises à jour CRM. À la fin de la semaine, il a beaucoup fait. Il peut montrer son volume d’activité.
          </p>

          <p className="mb-8">
            Mais il n’a pas forcément mieux vendu.
          </p>

          <p className="mb-8">
            C’est le piège que j’ai déjà exploré en parlant de{' '}
            <Link href="/blog/ia-commercial-b2b-revelateur-competences" className="text-mint-green hover:underline">
              comment l’IA révèle le vrai niveau des commerciaux
            </Link>
            . Quand la préparation devient automatique, le manque de jugement devient visible.
          </p>

          <p className="mb-8">
            Demain, si ces tâches mécaniques deviennent plus rapides ou disparaissent, la vraie question apparaîtra plus clairement : qu’est-ce que le commercial apporte quand la machine a déjà fait la partie mécanique ?
          </p>

          <p className="mb-8">
            La réponse ne sera pas dans le volume. Elle sera dans la qualité de la conversation.
          </p>

          <h2 id="vraie-question" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La vraie question que l’IA pose aux équipes
          </h2>

          <p className="mb-8">
            On parle beaucoup de ce que l’IA va apporter aux commerciaux. Moins de ce qu’elle va leur enlever.
          </p>

          <p className="mb-8">
            Je ne parle pas des emplois. Je parle des protections invisibles.
          </p>

          <p className="mb-8">
            Aujourd’hui, un commercial peut encore justifier un résultat moyen par le manque de temps. Pas assez de prospection. Pas assez de relances. Pas assez de données sur le prospect. Pas assez de suivi CRM.
          </p>

          <p className="mb-8">
            Ces excuses tiennent parce que ces tâches prennent effectivement du temps.
          </p>

          <p className="mb-8">
            Mais si l’IA les fait en cinq minutes, que reste-t-il ?
          </p>

          <p className="mb-8">
            Il reste la capacité à conduire une vraie conversation commerciale.
          </p>

          <p className="mb-8">
            Et là, les écarts deviennent plus visibles.
          </p>

          <p className="mb-8 italic text-gray-600">
            C’est exactement ce que je raconte dans l’article sur{' '}
            <Link href="/blog/ia-generative-commercial-b2b-demander-mieux" className="text-mint-green hover:underline">
              comment savoir quoi demander à l’IA
            </Link>
            . L’outil ne fait pas le travail à votre place. Il révèle si vous savez quoi lui demander.
          </p>

          <h2 id="revelateur" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L’IA comme révélateur, pas comme remplacement
          </h2>

          <p className="mb-8">
            Un acheteur B2B arrive déjà plus informé qu’avant. Il a lu, comparé, demandé autour de lui, regardé LinkedIn, parcouru le site, parfois testé plusieurs solutions.
          </p>

          <p className="mb-8">
            Il ne vient pas chercher un commercial qui récite une plaquette. Il vient chercher quelqu’un qui l’aide à comprendre ce qu’il doit vraiment décider.
          </p>

          <p className="mb-8">
            C’est là que la vente va se durcir.
          </p>

          <p className="mb-8">
            Pas parce que l’IA va remplacer tous les commerciaux. Mais parce qu’elle va rendre les commerciaux faibles plus visibles.
          </p>

          <p className="mb-8">
            Celui qui ne sait pas écouter sera moins utile.
          </p>

          <p className="mb-8">
            Celui qui pose trois questions génériques sera vite repéré.
          </p>

          <p className="mb-8">
            Celui qui envoie un message personnalisé en surface, mais vide au fond, sera noyé dans la masse.
          </p>

          <p className="mb-8">
            Celui qui ne comprend pas l’entreprise de son client restera un intermédiaire de plus.
          </p>

          <p className="mb-8">
            Ce n’est pas une question de technologie. C’est une question de niveau.
          </p>

          <p className="mb-8">
            Je l’ai écrit à plusieurs reprises, notamment en parlant des{' '}
            <Link href="/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux" className="text-mint-green hover:underline">
              acheteurs B2B qui ne veulent plus parler aux commerciaux
            </Link>
            : le client n’a pas moins besoin du commercial, mais il attend une autre valeur que la présentation de l’offre.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Le problème n’est pas l’IA. C’est le niveau des conversations.
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente entraîne vos commerciaux sur ce que l’IA ne règle pas : écouter, qualifier, comprendre qui décide, construire une prochaine étape qui engage. Un programme terrain qui renforce les fondamentaux avant d’ajouter les outils.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          <h2 id="ce-qui-compte" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce qui devient plus important quand la machine fait la mécanique
          </h2>

          <p className="mb-8">
            Contrairement à ce que racontent les articles alarmistes, tout ne change pas.
          </p>

          <p className="mb-8">
            Certaines choses deviennent plus importantes.
          </p>

          <p className="mb-8">
            Le bon commercial aura plus de place en 2030. Pas malgré l’IA. Grâce à elle.
          </p>

          <p className="mb-8">
            Parce qu’il arrivera mieux préparé. Parce qu’il passera moins de temps à recopier ce qui s’est dit. Parce qu’il pourra repérer plus vite les signaux faibles. Parce qu’il consacrera davantage d’énergie à la seule chose qui ne se délègue pas vraiment : faire avancer une décision difficile avec des humains autour de la table.
          </p>

          <p className="mb-8">
            L’IA ne supprime pas le besoin d’écoute, de jugement, de timing. Elle amplifie ceux qui les ont. Elle expose ceux qui ne les ont pas.
          </p>

          <p className="mb-8">
            Je vois déjà ce phénomène dans les équipes que j’accompagne. Les commerciaux qui étaient solides deviennent très solides parce qu’ils utilisent l’IA pour être plus présents sur ce qui compte. Ceux qui naviguaient deviennent visibles dans leur médiocrité.
          </p>

          <p className="mb-8">
            L’IA accélère le tri naturel qui était déjà en cours. Comme je l’évoquais en parlant de la{' '}
            <Link href="/blog/ia-transforme-developpement-commercial-2025" className="text-mint-green hover:underline">
              transformation du développement commercial par l’IA
            </Link>
            , l’outil ne crée pas le changement : il le rend visible plus vite.
          </p>

          <h2 id="question-dirigeant" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La question que tout dirigeant devrait se poser dès maintenant
          </h2>

          <p className="mb-8">
            Pour un dirigeant de PME, la question n’est donc pas : « Faut-il mettre de l’IA dans la vente ? »
          </p>

          <p className="mb-8 font-semibold">
            La question est : « Si j’enlève à mon équipe toutes les tâches de confort, que reste-t-il comme vraie compétence commerciale ? »
          </p>

          <p className="mb-8">
            Posez ces cinq questions à froid, avec honnêteté :
          </p>

          <ul className="space-y-2 text-sm text-gray-700 mb-8">
            <li>Est-ce que mon équipe sait qualifier proprement, ou est-ce qu’elle confond intérêt et décision ?</li>
            <li>Est-ce qu’elle sait faire parler un client sur ce qui bloque vraiment, ou est-ce qu’elle reste en surface ?</li>
            <li>Est-ce qu’elle sait comprendre qui décidera, ou est-ce qu’elle parle au mauvais interlocuteur ?</li>
            <li>Est-ce qu’elle sait défendre un prix sans se réfugier dans la remise immédiate ?</li>
            <li>Est-ce qu’elle sait écrire un message qui ressemble à autre chose qu’à un modèle un peu maquillé ?</li>
          </ul>

          <p className="mb-8">
            Si vous répondez « pas sûr » à plusieurs de ces questions, ce n’est pas un outil d’IA qu’il faut d’abord acheter.
          </p>

          <p className="mb-8">
            C’est un travail sur le fond du métier.
          </p>

          <p className="mb-8">
            Dans un autre registre mais avec le même horizon 2030, j’ai déjà montré{' '}
            <Link href="/blog/en-2030-toiture-et-compagnie-les-agents-ia-ont-change-le-rythme" className="text-mint-green hover:underline">
              comment les agents IA changent le rythme même des métiers terrain
            </Link>
            . Le constat est le même partout : ceux qui ne font que de l’exécution seront remplacés, mais ceux qui apportent un jugement seront valorisés.
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
                <span className="text-gray-500">{' '}: le constat de départ du cluster IA & Futur de la vente B2B</span>
              </li>
              <li>
                <Link href="/blog/ia-commercial-b2b-revelateur-competences" className="text-mint-green hover:underline">
                  L’IA montre le vrai niveau commercial
                </Link>
                <span className="text-gray-500">{' '}: comment l’IA révèle les écarts de compétence dans une équipe</span>
              </li>
              <li>
                <Link href="/blog/ia-generative-commercial-b2b-demander-mieux" className="text-mint-green hover:underline">
                  Savoir quoi demander à l’IA
                </Link>
                <span className="text-gray-500">{' '}: la compétence négligée qui fera la différence entre un commercial moyen et un bon</span>
              </li>
            </ul>
          </div>

          {/* CTA FORT */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Que reste-t-il de votre équipe commerciale sans les tâches de confort ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic commercial évalue en 45 minutes le vrai niveau de votre équipe : capacité à qualifier, à écouter les vrais blocages, à défendre un prix, à construire une prochaine étape qui engage. Un état des lieux concret pour savoir par où commencer — sans vendre d’outil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic commercial
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
            La vente B2B de 2030 ne sera probablement pas moins humaine. Elle sera moins indulgente avec les commerciaux qui confondent activité et impact. Et c’est peut-être ce qui fera le plus grand tri.
          </p>

          {/* FAQ */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8" id="faq">
              Questions fréquentes sur l’avenir de la vente B2B
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

          {/* AuthorCard bottom */}
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
