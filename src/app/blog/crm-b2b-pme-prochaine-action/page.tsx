import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

const articleUrl = 'https://www.laurentserre.com/blog/crm-b2b-pme-prochaine-action';
const heroImage = '/images/blog/crm-b2b-pme-prochaine-action/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/crm-b2b-pme-prochaine-action/hero.webp';

export const metadata: Metadata = {
  title: "Le CRM ne sert pas à montrer que l'équipe travaille. Il sert à savoir quoi faire ensuite | Laurent Serre",
  description:
    'Votre CRM est rempli mais ne dit pas quoi faire demain ? Le probl\u00e8me n\u2019est pas le logiciel. C\u2019est la question que vous posez au CRM. Guide terrain pour PME B2B.',
  keywords: [
    'CRM B2B PME',
    'CRM pour PME',
    'CRM commercial B2B',
    'comment utiliser un CRM B2B',
    'outil CRM PME',
    'CRM pilotage commercial',
    'CRM prochaine action',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-07-09',
  },
  openGraph: {
    title: 'Le CRM ne sert pas à montrer que l\'équipe travaille. Il sert à savoir quoi faire ensuite.',
    description:
      'Votre CRM est rempli mais ne dit pas quoi faire demain ? Le problème n\'est pas le logiciel. C\'est la question que vous posez au CRM.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Un dirigeant de PME devant son CRM, perplexe face à des données qui ne disent rien sur la prochaine action à mener',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le CRM ne sert pas à montrer que l\'équipe travaille. Il sert à savoir quoi faire ensuite.',
    description:
      'Votre CRM est rempli mais ne dit pas quoi faire demain ? Le problème n\'est pas le logiciel. C\'est la question que vous posez au CRM.',
    images: [heroImageAbsolute],
  },
};

const faqItems = [
  {
    question: 'Comment choisir un CRM pour une PME B2B ?',
    answer:
      'Ne commencez pas par comparer les fonctionnalités. Commencez par la question que vous voulez que le CRM vous réponde chaque matin : quelles sont les prochaines actions à mener ? Ensuite, cherchez un outil qui oblige à renseigner une prochaine étape datée sur chaque dossier. Peu importe la marque. Si le CRM ne change pas la manière de piloter l\'action, il ne changera rien.',
  },
  {
    question: 'Pourquoi mon CRM n\'est pas utilisé par mon équipe commerciale ?',
    answer:
      'Parce qu\'il sert à contrôler l\'activité passée au lieu d\'aider à préparer la prochaine décision. Les commerciaux ne voient pas ce que le CRM leur apporte pour vendre mieux. Ils y voient une charge administrative supplémentaire. Si le CRM devenait l\'outil qui leur dit ce qu\'ils doivent faire demain avec chaque dossier, l\'adoption changerait du tout au tout.',
  },
  {
    question: 'Quelles informations saisir dans un CRM B2B ?',
    answer:
      'Quatre choses suffisent : qui est concerné par la décision, quel est le problème que le client veut régler, quelle est la prochaine étape réelle, et à quelle date elle doit avoir lieu. Le reste est secondaire. Si vous avez plus de dix champs obligatoires, vous êtes déjà dans le piège du remplissage administratif.',
  },
  {
    question: 'Faut-il un CRM gratuit ou payant pour une PME ?',
    answer:
      'Le prix n\'est pas le problème. Un CRM gratuit bien utilisé vaut mieux qu\'un CRM payant rempli de données inutiles. L\'important n\'est pas ce que l\'outil coûte, c\'est ce qu\'il provoque dans l\'équipe. Si un CRM gratuit oblige à poser une prochaine étape sur chaque dossier, il fera plus pour la performance commerciale qu\'un outil à 200 euros par mois qui sert de base de données morte.',
  },
  {
    question: 'Comment faire vivre un CRM commercial au quotidien ?',
    answer:
      'En changeant la règle : pas d\'affaire sans prochaine étape datée. En réunion commerciale, on ne commente pas les montants, on regarde les décisions à obtenir. Et surtout, on n\'attend pas le lendemain pour mettre à jour. Le CRM vit quand il sert à préparer la prochaine action, pas seulement à ranger celle qui vient d\'avoir lieu.',
  },
];

export default function CrmB2bPmeProchaineActionPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Le CRM ne sert pas à montrer que l\'équipe travaille. Il sert à savoir quoi faire ensuite.',
        description:
          'Votre CRM est rempli mais ne dit pas quoi faire demain ? Le problème n\'est pas le logiciel. C\'est la question que vous posez au CRM. Guide terrain pour PME B2B.',
        image: heroImageAbsolute,
        datePublished: '2026-07-09',
        dateModified: '2026-07-09',
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
        articleSection: 'CRM & Pilotage commercial',
        keywords: [
          'CRM B2B PME',
          'CRM pour PME',
          'CRM commercial B2B',
          'comment utiliser un CRM B2B',
          'outil CRM PME',
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
          { '@type': 'ListItem', position: 3, name: 'Le CRM ne sert pas à montrer que l\'équipe travaille. Il sert à savoir quoi faire ensuite.', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Le CRM ne sert pas &agrave; montrer que l&rsquo;&eacute;quipe travaille. Il sert &agrave; savoir quoi faire ensuite.</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                CRM &amp; Pilotage commercial
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Le CRM ne sert pas &agrave; montrer que l&rsquo;&eacute;quipe travaille. Il sert &agrave; savoir quoi faire ensuite.
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
              <time dateTime="2026-07-09">9 juillet 2026</time>
              <span>&bull;</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="mb-8">
            <AuthorCard />
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un dirigeant de PME devant son CRM, perplexe, realize que les donnees ne disent rien sur la prochaine action a mener"
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
              Le CRM n&rsquo;est pas un outil de reporting. C&rsquo;est un outil de d&eacute;cision. S&rsquo;il ne dit pas &agrave; chaque commercial quoi faire demain, c&rsquo;est un fichier mort. Le vrai test d&rsquo;un CRM n&rsquo;est pas ce qu&rsquo;il stocke, c&rsquo;est ce qu&rsquo;il provoque comme action.
            </p>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Votre CRM pilote-t-il vraiment l&rsquo;action ? Faites un diagnostic
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#scene" className="text-mint-green hover:underline">Le rituel du lundi matin</a></li>
              <li><a href="#test" className="text-mint-green hover:underline">Le test des trois questions</a></li>
              <li><a href="#cimetiere" className="text-mint-green hover:underline">Le cimetière de données</a></li>
              <li><a href="#action" className="text-mint-green hover:underline">Ce que change un CRM pensé pour l&rsquo;action</a></li>
              <li><a href="#4-infos" className="text-mint-green hover:underline">Les quatre infos qui font vivre un CRM</a></li>
              <li><a href="#erreur" className="text-mint-green hover:underline">L&rsquo;erreur classique : confondre traçabilité et pilotage</a></li>
              <li><a href="#audit" className="text-mint-green hover:underline">Auditer votre CRM en 15 minutes</a></li>
            </ul>
          </div>

          {/* Article body */}

          <h2 id="scene" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le rituel du lundi matin
          </h2>

          <p className="mb-8">
            Je suis dans une PME de trente personnes. On regarde le CRM en réunion commerciale. L&rsquo;écran est projeté. Il y a des fiches clients, des opportunités, des étapes, des montants, un pipeline très propre.
          </p>

          <p className="mb-8">
            Et ça dure trois minutes avant que quelqu&rsquo;un pose la question que tout le monde a en tête :
          </p>

          <p className="mb-8 font-semibold">
            &laquo; Oui mais, on en est où avec ce prospect ? &raquo;
          </p>

          <p className="mb-8">
            Le commercial regarde sa fiche. Il lit ce qu&rsquo;il a écrit la semaine dernière. Il hésite. Personne ne sait vraiment quelle est la prochaine action.
          </p>

          <p className="mb-8">
            Dans beaucoup de PME B2B, le problème n&rsquo;est pas l&rsquo;outil. C&rsquo;est la question qu&rsquo;on lui pose. On a rempli le CRM comme un journal de bord. On y range l&rsquo;activité après coup. Mais quand il faut décider quoi faire maintenant, le CRM ne dit rien.
          </p>

          <h2 id="test" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le test des trois questions
          </h2>

          <p className="mb-8">
            Je propose un test simple. Ouvrez votre CRM et regardez trois dossiers pris au hasard.
          </p>

          <p className="mb-8">
            Première question &agrave; quoi sert ce CRM dans l&rsquo;&eacute;quipe ? Faire du reporting, garder une m&eacute;moire, ou piloter l&rsquo;action ?
          </p>

          <p className="mb-8">
            Deuxi&egrave;me question est-ce que chaque dossier a une prochaine &eacute;tape dat&eacute;e, avec une vraie d&eacute;cision &agrave; obtenir ?
          </p>

          <p className="mb-8">
            Troisi&egrave;me question si vous retirez le CRM demain, l&rsquo;&eacute;quipe commerciale perd-elle un outil d&rsquo;action ou juste une m&eacute;moire ?
          </p>

          <p className="mb-8">
            Si la r&eacute;ponse &agrave; la troisi&egrave;me question vous g&ecirc;ne, le probl&egrave;me n&rsquo;est pas le logiciel.
          </p>

          <h2 id="cimetiere" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le cimetière de données
          </h2>

          <p className="mb-8">
            Un CRM rempli peut donner une impression de maîtrise. Mais regardez de près.
          </p>

          <p className="mb-8">
            Un compte-rendu de rendez-vous écrit trois jours plus tard, avec deux phrases vagues, ne prépare pas la suite. Une opportunité placée en &laquo; proposition envoyée &raquo; depuis des semaines ne dit pas si le client avance, compare, attend un arbitrage ou a déjà décroché. Un montant dans un pipeline ne vaut pas grand-chose si personne ne sait quelle décision doit être obtenue maintenant.
          </p>

          <p className="mb-8">
            C&rsquo;est ce que j&rsquo;appelle le cimetière de données. Le CRM ressemble à un tableau de bord, mais c&rsquo;est une base de données morte. Elle stocke du passé et ne dit rien sur la prochaine action.
          </p>

          <p className="mb-8">
            Je l&rsquo;ai déjà exploré en parlant de{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-remplissent-mal-le-crm-et-utilisent-mal-lia" className="text-mint-green hover:underline">
              pourquoi les commerciaux remplissent mal le CRM
            </Link>
            . Le problème de remplissage n&rsquo;est qu&rsquo;un symptôme. Le vrai problème est en amont : le CRM ne sert pas à vendre, il sert à justifier.
          </p>

          <h2 id="action" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que change un CRM pensé pour l&rsquo;action
          </h2>

          <p className="mb-8">
            Dans une équipe qui utilise vraiment son CRM, le regard change.
          </p>

          <p className="mb-8">
            On voit les affaires qui n&rsquo;ont plus de prochaine étape. On voit les propositions qui dorment. On voit les prospects intéressants mais qui ne décident jamais. On voit les commerciaux qui remplissent le pipe mais n&rsquo;obtiennent pas d&rsquo;engagement clair.
          </p>

          <p className="mb-8">
            Ce n&rsquo;est pas agréable à regarder. Mais c&rsquo;est utile.
          </p>

          <p className="mb-8">
            Un bon CRM ne rend pas une équipe meilleure par magie. Il rend visibles ses habitudes commerciales. Et c&rsquo;est déjà beaucoup.
          </p>

          <p className="mb-8">
            Le CRM est aussi ce qui alimente le{' '}
            <Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-mint-green hover:underline">
              pipeline commercial
            </Link>
            . Si le pipeline est rempli de brouillard, les prévisions ne valent rien. Si le CRM oblige à avoir une prochaine étape claire, le pipeline devient un vrai outil de décision. Et la{' '}
            <Link href="/blog/reunion-commerciale-hebdo-rituel-closing" className="text-mint-green hover:underline">
              réunion commerciale
            </Link>
            change de nature : on n&rsquo;y commente plus des montants, on y regarde des décisions à obtenir.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Le CRM n&rsquo;est pas une solution technique. C&rsquo;est une discipline commerciale.
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente entraîne vos commerciaux sur ce qui fait vivre un CRM : qualifier, savoir qui décide, construire une prochaine étape qui engage. Un programme terrain qui transforme l&rsquo;outil en levier de performance.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          <h2 id="4-infos" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les quatre infos qui font vivre un CRM
          </h2>

          <p className="mb-8">
            Dans une PME, on n&rsquo;a pas besoin de cinquante champs. On a besoin de quatre choses.
          </p>

          <p className="mb-8">
            Qui est concerné par la décision ? Quel problème le client veut-il régler ? Quelle est la prochaine étape réelle ? À quelle date doit-elle avoir lieu ?
          </p>

          <p className="mb-8">
            Et une cinquième, qui vient en bonus : que fera-t-on si cette étape n&rsquo;a pas lieu ?
          </p>

          <p className="mb-8">
            Ce n&rsquo;est pas de l&rsquo;administration. C&rsquo;est de la discipline commerciale. Et ça change tout.
          </p>

          <h2 id="erreur" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L&rsquo;erreur classique : confondre traçabilité et pilotage
          </h2>

          <p className="mb-8">
            Beaucoup d&rsquo;équipes confondent deux choses : tracer ce qui a été fait et décider ce qu&rsquo;on va faire.
          </p>

          <p className="mb-8">
            La traçabilité, c&rsquo;est ranger le passé. Le pilotage, c&rsquo;est éclairer la prochaine action. Un CRM peut faire les deux, mais la plupart des équipes s&rsquo;arrêtent à la première fonction.
          </p>

          <p className="mb-8">
            Le symptôme est facile à repérer. En réunion commerciale, on commence par commenter ce qui s&rsquo;est passé la semaine dernière. On regarde des tableaux de bord qui disent combien d&rsquo;appels, combien de rendez-vous, combien de propositions. Puis on arrive à la question qui fâche : qu&rsquo;est-ce qu&rsquo;on fait de tout ça ?
          </p>

          <p className="mb-8">
            Si la réponse est vague, le CRM ne pilote rien. Il enregistre.
          </p>

          <h2 id="audit" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Auditer votre CRM en 15 minutes
          </h2>

          <p className="mb-8">
            Ouvrez votre CRM. Prenez quinze minutes. Regardez trois choses.
          </p>

          <p className="mb-8">
            Combien d&rsquo;affaires n&rsquo;ont pas de prochaine étape datée ? Combien de propositions envoyées depuis plus de deux semaines sans décision obtenue ? Combien d&rsquo;opportunités dans le pipe sans vraie qualification du problème client ?
          </p>

          <p className="mb-8">
            Si le total dépasse la moitié de vos dossiers, vous n&rsquo;avez pas un problème de CRM. Vous avez un problème de processus commercial. Et changer d&rsquo;outil n&rsquo;y changera rien.
          </p>

          <p className="mb-8">
            Avant de demander au CRM de produire de meilleurs tableaux, demandez-lui de porter les bonnes exigences. Pas une affaire sans prochaine étape datée. Pas une proposition sans décision attendue. Pas une opportunité qui reste vivante parce que personne n&rsquo;a osé la sortir.
          </p>

          <p className="mb-8">
            Le CRM n&rsquo;est pas là pour surveiller les commerciaux. Il est là pour éviter que l&rsquo;équipe vende dans le brouillard. Et dans une PME, c&rsquo;est souvent là que se fait la différence : moins de théâtre dans le pipeline, plus de réalité dans les prochaines actions.
          </p>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/blog/pourquoi-vos-commerciaux-remplissent-mal-le-crm-et-utilisent-mal-lia" className="text-mint-green hover:underline">
                  Pourquoi vos commerciaux remplissent mal le CRM
                </Link>
                <span className="text-gray-500">{' '}: le symptôme du mauvais remplissage, son vrai diagnostic en amont</span>
              </li>
              <li>
                <Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-mint-green hover:underline">
                  Comment construire un pipeline qui prédit vraiment votre chiffre
                </Link>
                <span className="text-gray-500">{' '}: le CRM alimente le pipeline, les deux ne valent rien si l&rsquo;action n&rsquo;y est pas claire</span>
              </li>
              <li>
                <Link href="/blog/reunion-commerciale-hebdo-rituel-closing" className="text-mint-green hover:underline">
                  La réunion commerciale qui change la donne
                </Link>
                <span className="text-gray-500">{' '}: le CRM nourrit la réunion, la réunion oblige à mettre le CRM à jour</span>
              </li>
            </ul>
          </div>

          {/* CTA FORT */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Votre CRM est-il un outil d&rsquo;action ou un cimetière de données ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic commercial évalue en 45 minutes comment votre équipe utilise vraiment le CRM : prochaines actions, qualification des dossiers, discipline de pilotage. Un état des lieux concret pour savoir par où commencer, sans vendre d&rsquo;outil.
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
            Un CRM ne sert pas &agrave; montrer que l&rsquo;&eacute;quipe travaille. Il sert &agrave; savoir quoi faire ensuite. Si le v&ocirc;tre ne r&eacute;pond pas &agrave; cette question, ce n&rsquo;est pas un probl&egrave;me de logiciel.
          </p>

          {/* FAQ */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8" id="faq">
              Questions fr&eacute;quentes sur le CRM B2B en PME
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
