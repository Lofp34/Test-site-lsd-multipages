import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Éditeurs logiciels : pourquoi vos démos SaaS échouent',
  description:
    '70% des démos SaaS n\'aboutissent pas à une vente. Non pas parce que le produit est mauvais, mais parce que le commercial le montre trop tôt. Les 3 erreurs des éditeurs de logiciels et comment les corriger.',
  keywords:
    'éditeur logiciel, SaaS, conversion démo, vente logiciel B2B, commercial SaaS, démo produit, Gap Selling, découverte commerciale, cycle vente logiciel',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/editeurs-logiciels-pourquoi-demos-ne-convertissent-pas',
  },
  openGraph: {
    title: 'Éditeurs logiciels : pourquoi vos démos SaaS échouent',
    description:
      '70% des démos SaaS n\'aboutissent pas à une vente. Non pas parce que le produit est mauvais, mais parce que le commercial le montre trop tôt.',
    url: 'https://www.laurentserre.com/blog/editeurs-logiciels-pourquoi-demos-ne-convertissent-pas',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-28-editeurs-logiciels-demos-hero.webp',
        width: 1536,
        height: 1024,
        alt: 'Composition graphique éditoriale avec Laurent Serre : Vos démos ne convertissent pas ? Ce n\'est pas votre produit le problème.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Éditeurs logiciels : pourquoi vos démos SaaS échouent',
    description:
      '70% des démos SaaS n\'aboutissent pas à une vente. Non pas parce que le produit est mauvais, mais parce que le commercial le montre trop tôt.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-28-editeurs-logiciels-demos-hero.webp'],
  },
};

export default function EditeursLogicielsDemosPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline:
      'Éditeurs logiciels : pourquoi vos démos SaaS échouent',
    description:
      '70% des démos SaaS n\'aboutissent pas à une vente. Non pas parce que le produit est mauvais, mais parce que le commercial le montre trop tôt. Analyse terrain par Laurent Serre.',
    author: {
      '@type': 'Person',
      name: 'Laurent Serre',
      url: 'https://www.laurentserre.com',
      sameAs: [
        'https://www.linkedin.com/in/laurentserre34/',
        'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/'
      ],
    },
    datePublished: '2026-05-28',
    dateModified: '2026-06-02',
    image: 'https://www.laurentserre.com/images/blog/2026-05-28-editeurs-logiciels-demos-hero.webp',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.laurentserre.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.laurentserre.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Éditeurs de logiciels : pourquoi vos démos ne convertissent pas',
        item: 'https://www.laurentserre.com/blog/editeurs-logiciels-pourquoi-demos-ne-convertissent-pas',
      },
    ],
  };

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Laurent Serre',
    url: 'https://www.laurentserre.com',
    jobTitle: 'Consultant commercial B2B',
    sameAs: [
      'https://www.linkedin.com/in/laurentserre34/',
      'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Pourquoi les démos SaaS ne convertissent-elles pas ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Parce que le commercial montre le produit trop tôt, sans avoir diagnostiqué le vrai problème du prospect. 67% des acheteurs B2B préfèrent éviter les commerciaux. Quand la démo arrive sans découverte préalable, elle conforte ce choix.'
        }
      },
      {
        '@type': 'Question',
        name: 'Combien de décideurs sont impliqués dans un achat SaaS B2B ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En moyenne 11 personnes pour un achat de plus de 10 000 euros par an. Les 4 rôles clés sont : le sponsor métier, le CTO/DSI, les achats, et le DG/COMEX. Un oui technique du CTO n\'est pas un oui budgétaire du DG.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quelle est la durée d\'un cycle de vente SaaS B2B ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le cycle médian est de 84 jours pour une vente SaaS B2B standard. Pour les grands comptes, le cycle peut aller de 9 à 18 mois. Un POC non cadré peut représenter la moitié de ce cycle sans garantie de conversion.'
        }
      },
      {
        '@type': 'Question',
        name: 'Comment cadrer un POC pour éviter qu\'il s\'éternise ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un POC doit avoir 4 choses : une durée fixe et courte (2 à 4 semaines max), un critère de succès mesurable défini à l\'avance, un engagement clair sur la prochaine étape après le POC, et un point d\'arrêt si le critère n\'est pas atteint.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quel est le taux de conversion démo vers signature dans le SaaS ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le taux de conversion démo vers signature est en moyenne de 30% dans le SaaS, contre 25% toutes industries confondues. Mais le vrai indicateur est le taux visiteur vers démo vers signature, qui tombe à 3,8%. Le problème n\'est pas la démo elle-même mais ce qui se passe avant.'
        }
      }
    ]
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Éditeurs de logiciels</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Vente SaaS / Éditeurs logiciels
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Éditeurs de logiciels : pourquoi vos démos ne convertissent pas
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
              <time dateTime="2026-05-28">28 mai 2026</time>
              <span>•</span>
              <span>9 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-05-28-editeurs-logiciels-demos-hero.webp"
              alt="Laurent Serre, expert en coaching commercial pour éditeurs de logiciels"
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

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          {/* AuthorCard : top */}
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              ✨ Ce que vous allez retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Les éditeurs de logiciels SaaS montrent leur produit trop tôt, sans diagnostiquer le vrai problème du prospect. Résultat : des cycles de vente qui s'étirent, des POC interminables, et des dossiers qui disparaissent. 11 décideurs en moyenne pour un achat &gt;10K€ : si vous ne parlez qu'au sponsor métier, vous vendez à la mauvaise personne. La solution : structurer la découverte avant la démo avec 3 questions clés : problème réel, urgence, et cartographie des décideurs.
            </p>
          </div>

          {/* Pas de BD carrousel (brief) */}

          {/* Badge CTA : sous le TL;DR */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vous ne savez pas pourquoi vos démos ne convertissent pas ? Faites un diagnostic
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#piege-demo" className="text-mint-green hover:underline">Le piège numéro un : montrer le produit avant de comprendre le problème</a></li>
              <li><a href="#4-decideurs" className="text-mint-green hover:underline">Les 4 décideurs : celui qui valide la technique n'est pas celui qui signe le chèque</a></li>
              <li><a href="#poc-interminable" className="text-mint-green hover:underline">Le POC qui n'en finit pas : quand le client teste mais n'achète pas</a></li>
              <li><a href="#commercial-expert" className="text-mint-green hover:underline">Le syndrome du commercial-expert</a></li>
              <li><a href="#decouverte-avant-demo" className="text-mint-green hover:underline">Structurer la découverte avant la démo</a></li>
              <li><a href="#cas-concret" className="text-mint-green hover:underline">Ce que ça change concrètement</a></li>
            </ul>
          </div>

          {/* Accroche */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Je vais vous raconter une scène que j'ai vue au moins cinquante fois chez des éditeurs de logiciels.
          </p>

        <p className="mb-6">
          Le commercial ouvre la réunion. Trois slides sur l'entreprise. Puis il lance la démo. Il montre l'interface, les fonctionnalités, le tableau de bord. Tout est fluide, le produit est beau, le prospect semble intéressé. Le commercial sent que ça se passe bien.
        </p>

        <p className="mb-6">
          Trois mois plus tard, le dossier est toujours en cours. Le prospect teste, compare, fait remonter des demandes techniques. La décision n'arrive pas. Et un jour, le CRM affiche « perdu face au concurrent ».
        </p>

        <p className="mb-6">
          Le problème n'est pas le produit. C'est le moment où on l'a montré. On a sauté le diagnostic. On a vendu une solution sans savoir quel était le vrai problème.
        </p>

        <h2 id="piege-demo" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
          Le piège numéro un : montrer le produit avant de comprendre le problème
        </h2>

        <p className="mb-6">
          C'est le réflexe le plus partagé chez les commerciaux d'éditeurs de logiciels. Et c'est le plus dangereux.
        </p>

        <p className="mb-6">
          Un commercial SaaS qui lance sa démo sans avoir fait une vraie découverte arrive en réunion avec une solution. Le problème, c'est qu'il ne sait pas encore quel est le problème. Il va présenter son produit comme la réponse à une question que le prospect ne s'est peut-être jamais posée.
        </p>

        <p className="mb-6">
          Ce que j'observe :
        </p>

        <p className="mb-6">
          D'un côté, le prospect laisse faire. Il regarde la démo poliment, pose des questions techniques, prend des notes. Il se dit qu'il verra bien à l'usage si l'outil correspond à ses besoins.
        </p>

        <p className="mb-6">
          De l'autre côté, le commercial interprète l'intérêt poli comme un engagement. Il note le dossier à 60% dans le CRM. Mais il n'a pas validé une seule fois que le problème du prospect était suffisamment urgent pour justifier un achat.
        </p>

        <p className="mb-6">
          Le résultat : des cycles de vente qui s'allongent, des POC qui s'éternisent, des dossiers qui disparaissent sans qu'on sache pourquoi. 67% des acheteurs B2B préfèrent aujourd'hui ne pas passer par un commercial pour s'informer. Quand la démo arrive trop tôt, elle conforte ce choix : le prospect repart avec une image incomplète et le sentiment d'avoir perdu son temps.
        </p>

        <p className="mb-6">
          La règle est simple : on ne montre pas une solution avant d'avoir fait le tour complet du problème. C'est du Gap Selling appliqué au terrain. Creuser, diagnostiquer, mesurer la douleur. Ensuite seulement, aligner la démo sur les vrais points de blocage.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 my-10 rounded-r-lg">
          <p className="font-semibold text-blue-900 mb-2">Bonne pratique vs erreur</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <p className="font-bold text-red-600 mb-2">Erreur fréquente</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Présenter l'entreprise dès l'ouverture</li>
                <li>Lancer la démo au premier rendez-vous</li>
                <li>Montrer toutes les fonctionnalités</li>
                <li>Interpréter l'intérêt poli comme un engagement</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <p className="font-bold text-green-600 mb-2">Bonne pratique</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Diagnostiquer le problème avant toute démo</li>
                <li>Cartographier les décideurs dès le premier échange</li>
                <li>Ne montrer que ce qui résout le blocage identifié</li>
                <li>Valider l'urgence et le budget avant de démontrer</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 id="4-decideurs" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
          Les 4 décideurs : celui qui valide la technique n'est pas celui qui signe le chèque
        </h2>

        <p className="mb-6">
          Une autre erreur classique dans la vente de logiciels : on croit avoir convaincu un décideur, mais on a juste convaincu un utilisateur.
        </p>

        <p className="mb-6">
          Dans un achat SaaS B2B de plus de 10 000 euros par an, il y a en moyenne 11 personnes impliquées dans la décision. Mais dans les faits, quatre rôles sont presque toujours présents :
        </p>

        <ol className="mb-8 space-y-3 list-decimal ml-6">
          <li>
            <strong>Le sponsor métier</strong> : celui qui va utiliser le logiciel au quotidien. Il veut que ça marche, que ça lui simplifie la vie. C'est votre allié naturel, mais il ne décide pas seul.
          </li>
          <li>
            <strong>Le CTO ou DSI</strong> : il valide la sécurité, l'intégration, la maintenabilité. Sans son aval technique, rien ne passe. Mais un oui technique n'est pas un oui budgétaire.
          </li>
          <li>
            <strong>Les achats</strong> : ils comparent les prix, négocient, vérifient que l'investissement est justifié. Ils arrivent souvent tard dans le processus et peuvent tout faire dérailler.
          </li>
          <li>
            <strong>Le DG ou COMEX</strong> : celui qui tranche sur les gros budgets. Il veut savoir quel problème stratégique vous résolvez et en combien de temps. Pas le détail des fonctionnalités.
          </li>
        </ol>

        <p className="mb-6">
          Le piège, c'est de passer tout le cycle à parler au sponsor métier et au CTO, puis de découvrir au moment de signer que le DG n'a jamais été briefé sur le sujet.
        </p>

        <p className="mb-6">
          La correction : cartographier les décideurs dès le premier rendez-vous. Identifier qui décide quoi. Et s'assurer que la démo parle le langage de chacun. La démo qui convertit n'est pas celle qui montre tout. C'est celle qui répond à la question que chaque interlocuteur se pose.
        </p>

        <h2 id="poc-interminable" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
          Le POC qui n'en finit pas : quand le client teste mais n'achète pas
        </h2>

        <p className="mb-6">
          C'est le cauchemar des éditeurs de logiciels. Le prospect demande un POC. Il veut « tester l'outil sur un cas concret ». Le commercial accepte, ravi de prouver la valeur du produit.
        </p>

        <p className="mb-6">
          Le POC dure deux semaines. Puis quatre. Puis deux mois. Le client fait des retours, demande des ajustements, compare avec un concurrent en test chez lui. L'équipe technique passe du temps à configurer, à paramétrer. Et à la fin, le client dit : « On n'est pas encore prêts. On a besoin de plus de temps. » Ou pire : « Finalement, on a trouvé une solution interne. »
        </p>

        <p className="mb-6">
          Le POC est un piège quand il n'est pas cadré. Le cycle de vente SaaS médian est de 84 jours. Un POC non cadré peut facilement en représenter la moitié, sans garantie de conversion.
        </p>

        <p className="mb-6 font-semibold">
          Un POC doit avoir :
        </p>

        <ul className="space-y-2 text-sm text-gray-700">
          <li>une durée fixe et courte (2 à 4 semaines maximum)</li>
          <li>un critère de succès mesurable défini à l'avance</li>
          <li>un engagement clair sur la prochaine étape après le POC</li>
          <li>un point d'arrêt : si le critère n'est pas atteint, on arrête proprement</li>
        </ul>

        <p className="mb-6">
          Sans ces quatre conditions, un POC est une façon polie pour un prospect de reporter sa décision. Et pour un commercial, de perdre son temps sur un dossier qui n'aboutira pas.
        </p>

        <h2 id="commercial-expert" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
          Le syndrome du commercial-expert
        </h2>

        <p className="mb-6">
          Chez les éditeurs de logiciels, beaucoup de commerciaux viennent de la technique. Anciens ingénieurs, anciens consultants, ils connaissent le produit sur le bout des doigts. Et c'est à la fois leur force et leur faiblesse.
        </p>

        <p className="mb-6">
          Leur force : ils peuvent répondre à toutes les questions. Ils inspirent confiance par leur expertise.
        </p>

        <p className="mb-6">
          Leur faiblesse : ils passent leur temps à démontrer au lieu de diagnostiquer. Leur premier réflexe, c'est d'ouvrir l'interface. Leur second, c'est d'expliquer comment ça marche. Mais pendant ce temps, ils ne posent pas les questions qui permettraient de comprendre le vrai problème du prospect.
        </p>

        <p className="mb-6">
          Un commercial-expert typique :
        </p>

        <ul className="space-y-2 text-sm text-gray-700">
          <li>répond à toutes les objections techniques</li>
          <li>personnalise la démo en direct</li>
          <li>mais n'a pas validé que le problème est prioritaire</li>
          <li>et n'a pas identifié qui décide vraiment</li>
        </ul>

        <p className="mb-6">
          La difficulté, c'est que ça marche sur les petites ventes. Pour un abonnement à 200 euros par mois, la démo directe peut suffire. Mais dès qu'on monte en budget et en complexité, le défaut de diagnostic se paie cash. En cycles longs qui dépassent les 84 jours médians, en POC interminables, en pertes inexplicables.
        </p>

        {/* Mid-article CTA */}
        <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
          <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
            Vous voulez que vos équipes structurent leur découverte avant la démo ?
          </p>
          <p className="text-sm text-teal-700 mb-4">
            Le Bootcamp commercial vous donne les outils pour passer de la démo systématique au diagnostic structuré, avec des grilles de questionnement et des exercices terrain.
          </p>
          <Link
            href="/bootcamp"
            className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
          >
            Découvrir le Bootcamp →
          </Link>
        </div>

        <h2 id="decouverte-avant-demo" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
          Structurer la découverte avant la démo
        </h2>

        <p className="mb-6">
          La solution est simple dans son principe, exigeante dans son exécution.
        </p>

        <p className="mb-6">
          Avant toute démo, le commercial doit pouvoir répondre à trois questions :
        </p>

        <div className="bg-gray-50 border-l-4 border-blue-500 p-5 my-6 rounded-r-lg">
          <p className="font-semibold text-blue-900 mb-3">Les 3 questions à valider avant toute démo</p>
          <ol className="mb-8 space-y-3 list-decimal ml-6">
            <li>
              <strong>Quel est le vrai problème que vous résolvez pour ce prospect ?</strong>
              <p className="ml-6 mt-1 text-sm text-gray-600">Pas le problème général. Le problème spécifique, situé, incarné : « Votre équipe support perd 12 heures par semaine à ressaisir les données client entre votre CRM et votre outil de ticketing. »</p>
            </li>
            <li>
              <strong>Pourquoi maintenant ? Quelle est l'urgence ?</strong>
              <p className="ml-6 mt-1 text-sm text-gray-600">Si rien ne presse, la signature n'arrivera jamais. Il faut un déclencheur : un audit qui arrive, une embauche qui change l'équipe, une perte de client qui alerte la direction.</p>
            </li>
            <li>
              <strong>Qui décide et sur quels critères ?</strong>
              <p className="ml-6 mt-1 text-sm text-gray-600">Cartographie des parties prenantes. Critères objectifs de sélection. Budget alloué ou à dégager.</p>
            </li>
          </ol>
        </div>

        <p className="mb-6">
          Si le commercial ne peut pas répondre à ces trois questions avec précision, la démo est prématurée. Il faut un rendez-vous de découverte avant.
        </p>

        <p className="mb-6">
          Et quand la démo arrive enfin, elle ne doit pas être une visite guidée du produit. Elle doit être une réponse sur mesure aux problèmes identifiés. On ne montre pas tout. On montre ce qui résout le point de blocage numéro un. On s'arrête là. On valide. On passe à l'étape suivante.
        </p>

        <h2 id="cas-concret" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
          Ce que ça change concrètement
        </h2>

        <p className="mb-6">
          J'accompagne un éditeur de logiciels RH qui faisait face à ce problème. L'équipe commerciale montrait la solution au premier rendez-vous. Le cycle moyen était de 120 jours. Les POC duraient en moyenne 6 semaines. Le taux de conversion démo vers signature était autour de 22%.
        </p>

        <p className="mb-6">
          En trois mois de travail sur la structuration de la découverte :
        </p>

        <div className="bg-gray-50 p-5 my-6 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Cycle de vente</p>
              <p className="text-2xl font-bold text-green-600">120j → 75j</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Conversion démo → signature</p>
              <p className="text-2xl font-bold text-green-600">22% → 34%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Durée POC</p>
              <p className="text-2xl font-bold text-green-600">6 sem. → 3 sem.</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Démos non qualifiées</p>
              <p className="text-2xl font-bold text-green-600">En baisse</p>
            </div>
          </div>
        </div>

        <p className="mb-6">
          Ce n'est pas un résultat exceptionnel. C'est le résultat normal quand on arrête de montrer le produit trop tôt.
        </p>

        <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
          Ce qu'il faut retenir
        </h2>

        <p className="mb-6">
          Si vous êtes dirigeant d'un éditeur de logiciels, regardez honnêtement votre cycle de vente. Regardez le nombre de démos qui ne mènent à rien. Regardez la durée de vos POC. Et posez-vous une seule question :
        </p>

        <p className="mb-8 text-lg font-semibold text-gray-800 italic">
          Est-ce que vos commerciaux passent plus de temps à montrer le produit qu'à comprendre le problème du client ?
        </p>

        <p className="mb-6">
          Si la réponse est oui, le levier d'amélioration n'est pas dans votre produit. Il est dans votre méthode de vente.
        </p>

        {/* FAQ */}
        <div className="my-12">
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Questions fréquentes sur la conversion des démos SaaS
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-bold text-blue-ink mb-2">Pourquoi les démos SaaS ne convertissent-elles pas ?</p>
              <p className="text-gray-700">Parce que le commercial montre le produit trop tôt, sans avoir diagnostiqué le vrai problème du prospect. 67% des acheteurs B2B préfèrent éviter les commerciaux. Quand la démo arrive sans découverte préalable, elle conforte ce choix.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-bold text-blue-ink mb-2">Combien de décideurs sont impliqués dans un achat SaaS B2B ?</p>
              <p className="text-gray-700">En moyenne 11 personnes pour un achat de plus de 10 000 euros par an. Les 4 rôles clés sont : le sponsor métier, le CTO/DSI, les achats, et le DG/COMEX. Un oui technique du CTO n'est pas un oui budgétaire du DG.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-bold text-blue-ink mb-2">Quelle est la durée d'un cycle de vente SaaS B2B ?</p>
              <p className="text-gray-700">Le cycle médian est de 84 jours pour une vente SaaS B2B standard. Pour les grands comptes, le cycle peut aller de 9 à 18 mois. Un POC non cadré peut représenter la moitié de ce cycle sans garantie de conversion.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-bold text-blue-ink mb-2">Comment cadrer un POC pour éviter qu'il s'éternise ?</p>
              <p className="text-gray-700">Un POC doit avoir : une durée fixe et courte (2 à 4 semaines max), un critère de succès mesurable défini à l'avance, un engagement clair sur la prochaine étape après le POC, et un point d'arrêt si le critère n'est pas atteint.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-bold text-blue-ink mb-2">Quel est le taux de conversion démo vers signature dans le SaaS ?</p>
              <p className="text-gray-700">Le taux de conversion démo vers signature est en moyenne de 30% dans le SaaS, contre 25% toutes industries confondues. Mais le vrai indicateur est le taux visiteur vers démo vers signature, qui tombe à 3,8%. Le problème n'est pas la démo elle-même mais ce qui se passe avant.</p>
            </div>
          </div>
        </div>

        {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link
                  href="/blog/gap-selling-methode-b2b"
                  className="text-mint-green hover:underline font-medium"
                >
                  Gap Selling : la méthode B2B qui a changé ma façon de vendre
                </Link>
                <span className="text-gray-500">
                  {' '}: La méthode pour diagnostiquer le problème avant de montrer la solution.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre"
                  className="text-mint-green hover:underline font-medium"
                >
                  Vente consultative B2B : devenir le conseiller que vos clients ne veulent pas perdre
                </Link>
                <span className="text-gray-500">
                  {' '}: La posture conseil qui remplace la démo systématique.
                </span>
              </li>
              <li>
                <Link
                  href="/expert-developpement-commercial-pme"
                  className="text-mint-green hover:underline font-medium"
                >
                  Expertise en développement commercial PME
                </Link>
                <span className="text-gray-500">
                  {' '}: L'approche globale de transformation commerciale.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/septeo-swot-analyse-logiciel-cabinet"
                  className="text-mint-green hover:underline font-medium"
                >
                  Analyse SWOT de Septeo : forces, faiblesses, verdict
                </Link>
                <span className="text-gray-500">
                  {' '}: Étude de cas d'un éditeur logiciel pour cabinets.
                </span>
              </li>
            </ul>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            Le problème n'est pas votre produit. C'est le moment où vous le montrez. Un diagnostic honnête de votre cycle de vente est le premier pas vers des démos qui convertissent vraiment.
          </p>
        </div>

        {/* AuthorCard : bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <AuthorCard />
        </div>
      </article>

      {/* HubSpotForm */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d'en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre situation mérite un échange direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>

      {/* Lien retour blog */}
      <section className="py-8 bg-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors font-medium"
          >
            ← Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
