import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/developpement-commercial-pme-plan-action-5-etapes';
const heroImage = '/images/blog/2026-05-24-developpement-commercial-pme-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/2026-05-24-developpement-commercial-pme-hero.webp';
const carouselPrefix = '/images/blog/carrousel-developpement-commercial';

export const metadata: Metadata = {
  title: 'Développement commercial PME : le plan d\'action en 5 étapes terrain (2026) | Laurent Serre',
  description:
    'Un cadre d\'action concret en 5 étapes pour développer votre commercial PME. Pas de théorie, des méthodes testées sur le terrain par un expert avec 20 ans d\'expérience.',
  keywords:
    'développement commercial PME, plan développement commercial PME, stratégie développement commercial, coaching développement commercial, accompagnement commercial PME, transformation commerciale PME, plan action commercial PME, structurer équipe commerciale, indicateurs performance commerciale, pipeline commercial PME, méthode développement commercial, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-05-24',
  },
  openGraph: {
    title: 'Développement commercial PME : le plan d\'action en 5 étapes qui marche sur le terrain',
    description:
      'Diagnostic, stratégie, pipeline, compétences, pilotage. Les 5 étapes concrètes pour développer votre commercial sans bullshit consulting.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: 'Plan de développement commercial PME en 5 étapes - feuille de route terrain',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Développement commercial PME : le plan d\'action en 5 étapes terrain | Laurent Serre',
    description:
      'Diagnostic, stratégie, pipeline, compétences, pilotage. Les 5 étapes concrètes pour développer votre commercial PME sans bullshit.',
    images: [heroImageAbsolute],
  },
};

export default function DeveloppementCommercialPme() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: 'Développement commercial PME : le plan d\'action en 5 étapes qui marche vraiment sur le terrain',
        description:
          'Un cadre d\'action concret en 5 étapes pour développer votre commercial PME. Pas de théorie, des méthodes testées sur le terrain.',
        image: heroImageAbsolute,
        datePublished: '2026-05-24',
        dateModified: '2026-05-24',
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
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.laurentserre.com/logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
      },
      {
        '@type': 'HowTo',
        '@id': articleUrl + '#howto',
        name: 'Plan d\'action développement commercial PME en 5 étapes',
        description: 'Méthode terrain en 5 étapes pour développer le commercial d\'une PME : du diagnostic au pilotage.',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'EUR',
          value: '0',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Étape 1 — Faire un diagnostic commercial honnête',
            text: 'Auditer les 5 piliers : ciblage, pipeline, processus, compétences, pilotage. Mesurer où en est vraiment l\'équipe avant de décider ce qu\'il faut améliorer.',
            url: articleUrl + '#diagnostic',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Étape 2 — Définir une stratégie en une page',
            text: 'Choisir ses combats pour les 90 prochains jours. Un seul objectif prioritaire, un ciblage resserré, un plan d\'exécution simple.',
            url: articleUrl + '#strategie',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Étape 3 — Installer un pipeline et des processus qui tiennent',
            text: 'CRM minimal, rituel de revue de pipeline chaque semaine, système de qualification solide pour sortir les illusions du pipe.',
            url: articleUrl + '#pipeline',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Étape 4 — Développer les compétences terrain',
            text: 'Coaching en situation réelle plutôt que formation descendante. Objections, closing, découverte : le vrai travail se fait sur le terrain.',
            url: articleUrl + '#competences',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Étape 5 — Piloter avec les 3 indicateurs qui comptent',
            text: 'Suivre ce qui prédit vraiment le chiffre : taux de conversion par étape, vitesse du cycle, valeur moyenne des deals signés. Ajuster en continu.',
            url: articleUrl + '#pilotage',
          },
        ],
      },
    ],
  };

  const carouselImages = [
    { src: `${carouselPrefix}/01-diagnostic.webp`, alt: 'Étape 1 - Le diagnostic commercial qui tue les illusions', index: 0 },
    { src: `${carouselPrefix}/02-strategie.webp`, alt: 'Étape 2 - Arrêtez de courir après 15 priorités', index: 1 },
    { src: `${carouselPrefix}/03-pipeline.webp`, alt: 'Étape 3 - Votre pipeline ne ment pas', index: 2 },
    { src: `${carouselPrefix}/04-competences.webp`, alt: 'Étape 4 - Le vrai travail c\'est sur le terrain', index: 3 },
    { src: `${carouselPrefix}/05-pilotage.webp`, alt: 'Étape 5 - Mesurez ce qui compte', index: 4 },
  ];

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Développement commercial PME : le plan d'action en 5 étapes</span>
        </nav>

        {/* Badge CTA */}
        <div className="mb-6">
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
          >
            🔍 Vous ne savez pas par où commencer ? Faites un diagnostic commercial gratuit →
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          Développement commercial PME : le plan d'action en 5 étapes qui marche vraiment sur le terrain
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span>24 mai 2026</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full" />
          <span>~15 min de lecture</span>
        </div>

        {/* AuthorCard */}
        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial — 15 ans de terrain PME',
            image: '/images/blog/Laurent-Serre-avatar.jpg',
          }}
        />

        {/* Hero Image */}
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-10 shadow-lg">
          <Image
            src={heroImage}
            alt="Plan de développement commercial PME en 5 étapes - feuille de route terrain"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {/* Article body */}
        <div className="prose prose-gray max-w-none">
          {/* TL;DR — Ce que vous allez retenir */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">✨ Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Le développement commercial d'une PME ne se décrète pas. Il se construit en 5 étapes : diagnostiquer honnêtement où vous en êtes, choisir une priorité unique pour 90 jours, installer un pipeline fiable, coacher votre équipe sur le terrain, et piloter avec 3 indicateurs qui comptent. Pas de théorie. Des méthodes testées par 20 ans d'expérience terrain.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD — Les 5 étapes du développement commercial
            </p>
            <p className="text-sm text-amber-700 mb-5">
              5 planches illustrées — cliquez sur une vignette pour feuilleter la BD dans le lecteur intégré.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD — Les 5 étapes du développement commercial PME"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/images/blog/carrousel-developpement-commercial/carrousel-developpement-commercial-pme.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (5 planches)
              </Link>
            </div>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#diagnostic" className="text-mint-green hover:underline">Étape 1 — Le diagnostic qui tue les illusions</a></li>
              <li><a href="#strategie" className="text-mint-green hover:underline">Étape 2 — Arrêtez de courir après 15 priorités</a></li>
              <li><a href="#pipeline" className="text-mint-green hover:underline">Étape 3 — Votre pipeline ne ment pas</a></li>
              <li><a href="#competences" className="text-mint-green hover:underline">Étape 4 — Le vrai travail, c'est sur le terrain</a></li>
              <li><a href="#pilotage" className="text-mint-green hover:underline">Étape 5 — Mesurez ce qui compte</a></li>
            </ul>
          </div>

          {/* ════════ INTRO DÉTAILLÉE ════════ */}
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            <strong>Le développement commercial d'une PME, c'est un mot qu'on entend partout.</strong> Dans les conférences, sur LinkedIn, dans les offres des consultants. Tout le monde dit qu'il faut « passer à l'étape supérieure », « structurer la force de vente », « professionnaliser la démarche commerciale ».
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Mais personne ne dit concrètement quoi faire quand on est dirigeant d'une PME de 15 à 150 personnes, avec trois commerciaux, un CRM mal rempli, et zéro processus.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            <strong>Développement commercial PME : c'est l'ensemble des actions structurées qui visent à accroître durablement le chiffre d'affaires d'une entreprise de taille moyenne ou petite, en agissant sur son ciblage, son processus de vente, les compétences de son équipe et ses outils de pilotage.</strong> Ce n'est pas un coup de boost ponctuel. C'est un cycle qui s'installe.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Je vois des dirigeants de PME faire la même erreur tous les jours : ils cherchent LA solution magique. Un nouveau CRM. Un commercial star. Une méthode miracle. Mais le développement commercial, ça ne marche pas comme ça. Pas dans une PME en tout cas.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Voici le cadre que j'utilise sur le terrain avec les équipes que j'accompagne. 5 étapes. Testées. Qui marchent quand on les exécute dans l'ordre.
          </p>

          {/* ════════ ÉTAPE 1 ════════ */}
          <h2 id="diagnostic" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Étape 1 — Le diagnostic qui tue les illusions
          </h2>

          <p className="mb-6">
            Avant de décider ce qu'il faut améliorer, il faut savoir où on en est vraiment. Et c'est déjà plus difficile qu'il n'y paraît.
          </p>

          <p className="mb-6">
            Je pose toujours les mêmes cinq questions à un dirigeant lors d'un premier diagnostic :
          </p>

          <ul className="space-y-4 mb-8">
            <li><strong>1. Ciblage :</strong> Est-ce que toute l'équipe sait exactement quel client démarcher, sans ambiguïté ? Ou chacun prospecte dans son coin ce qui lui tombe sous la main ?</li>
            <li><strong>2. Pipeline :</strong> Est-ce que votre pipeline reflète la réalité — ou il est rempli d'affaires qui traînent depuis huit mois et que personne n'ose sortir ?</li>
            <li><strong>3. Processus :</strong> Est-ce qu'il y a une manière commune de qualifier, de traiter une objection, de faire une proposition — ou c'est chacun son style ?</li>
            <li><strong>4. Compétences :</strong> Est-ce que vos commerciaux savent vraiment mener une découverte, créer de la tension commerciale, défendre un prix ? Ou ils improvisent ?</li>
            <li><strong>5. Pilotage :</strong> Est-ce que vous regardez les bons indicateurs chaque semaine — ou vous commentez le chiffre du mois en espérant que ça passe ?</li>
          </ul>

          <p className="mb-6">
            Un client m'a appelé l'année dernière : « Mon équipe ne vend pas assez, il faut les former. » Je lui ai demandé de me montrer son pipeline. Sur 40 affaires en cours, 32 n'avaient pas bougé depuis trois mois. Le problème n'était pas les compétences — c'était l'illusion d'activité. On a passé les deux premières semaines à nettoyer le pipe avant même de parler de formation.
          </p>

          <p className="mb-6">
            Le diagnostic, c'est l'étape qu'on saute le plus souvent. Parce qu'elle oblige à regarder le réel en face. Mais sans elle, tout ce qu'on construit après repose sur du sable.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-amber-800 mb-2">La question à vous poser cette semaine</p>
            <p className="text-amber-700">Si je devais être totalement honnête, quel est le vrai frein aujourd'hui dans mon équipe commerciale : le ciblage, le processus, les compétences, le pilotage — ou la qualité de ce qu'on vend ?</p>
          </div>

          {/* ════════ ÉTAPE 2 ════════ */}
          <h2 id="strategie" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Étape 2 — Arrêtez de courir après 15 priorités
          </h2>

          <p className="mb-6">
            La plus grande erreur des PME en développement commercial, c'est la dispersion. On attaque trois segments. On lance quatre actions. On change tout en même temps. Et trois mois plus tard, rien n'a avancé.
          </p>

          <p className="mb-6">
            Le cadre que j'utilise avec les équipes que j'accompagne, c'est la <strong>stratégie en une page</strong>. Un document A4 qui tient sur un bureau. Pas un PowerPoint de 40 slides. Pas un plan annuel qu'on range dans un tiroir.
          </p>

          <p className="mb-6">
            Voici ce qu'elle contient :
          </p>

          <ul className="space-y-4 mb-8">
            <li><strong>Un seul objectif prioritaire pour les 90 jours.</strong> Pas cinq. Un. Par exemple : « signer 3 nouveaux clients sur notre segment prioritaire » ou « augmenter le taux de transformation de 20% ». Un objectif tellement clair que toute l'équipe peut dire s'il est atteint ou non.</li>
            <li><strong>Le ciblage resserré.</strong> Qui on appelle, qui on rencontre, qui on laisse tomber. Les meilleures équipes que j'ai vues gagnent parce qu'elles savent dire non à 80% des opportunités.</li>
            <li><strong>Un plan d'exécution simple.</strong> Chaque commercial sait ce qu'il doit faire cette semaine, cette quinzaine, ce mois. Pas de flou. Pas de « on verra en réunion ».</li>
          </ul>

          <p className="mb-6">
            Un dirigeant me disait récemment : « On a réduit notre ciblage de 5 segments à 1. J'avais peur de perdre du chiffre. En fait, on a doublé notre taux de signature en trois mois. » Ce n'est pas un hasard. La concentration est le premier levier du développement commercial en PME.
          </p>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-2">L'exercice des 90 jours</p>
            <p className="text-gray-700">Prenez un A4. Écrivez l'objectif prioritaire du trimestre en haut. Notez en dessous les trois actions qui auront le plus d'impact pour l'atteindre. Et ce que vous arrêtez de faire. Collez-le au mur de la salle de réunion. Et tenez-vous-y.</p>
          </div>

          {/* ════════ ÉTAPE 3 ════════ */}
          <h2 id="pipeline" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Étape 3 — Votre pipeline ne ment pas
          </h2>

          <p className="mb-6">
            Le pipeline commercial est l'outil le plus mal utilisé des PME. On y met des affaires au hasard, on met des probabilités au doigt mouillé, et on regarde le montant total en se disant que le mois sera bon. Et le 28 du mois, on découvre que 80% des deals étaient des illusions.
          </p>

          <p className="mb-6">
            Un pipeline utile, ça ressemble à ça :
          </p>

          <ul className="space-y-4 mb-8">
            <li><strong>Des étapes claires et objectives.</strong> Pas « en négociation » ou « intéressé ». Mais « découverte faite », « démo réalisée », « proposition envoyée », « devis signé ». Chaque étape correspond à une action vérifiable, pas à une impression.</li>
            <li><strong>Un système de qualification.</strong> Avant qu'une affaire entre dans le pipeline, elle doit passer un filtre : décideur identifié, budget cadré, besoin prioritaire, calendrier défini. C'est tout. Si une case manque, ce n'est pas un deal, c'est une conversation.</li>
            <li><strong>Une revue hebdomadaire.</strong> 30 minutes, toute l'équipe, debout. Chacun passe ses 3 deals les plus importants : qu'est-ce qui a avancé, qu'est-ce qui bloque, quelle est la prochaine étape concrète. Si une affaire n'a pas bougé depuis 3 semaines, on se demande si elle est vraiment réelle.</li>
          </ul>

          <p className="mb-6">
            J'ai accompagné une équipe qui ne jurait que par son CRM. Tout était dedans, bien rangé. Mais personne ne regardait le pipeline en réunion. On commentait les chiffres du mois passé. Le pipeline, on l'ouvrait une fois par mois pour ajuster les prévisions. Résultat : ils découvraient les problèmes trop tard, quand il n'y avait plus le temps d'agir.
          </p>

          <p className="mb-6">
            Je leur ai proposé un rituel simple : chaque lundi matin, 30 minutes, debout. Pas de Powerpoint, pas de projection. Chacun dit où en sont ses 3 deals clés, ce qu'il a appris la semaine précédente, ce qu'il va faire cette semaine. En trois semaines, le nombre d'affaires bloquées a baissé de moitié. Parce que le fait de les nommer devant l'équipe oblige à les regarder en face.
          </p>

          <p className="mb-6">
            Pour aller plus loin sur la construction d'un pipeline qui prédit vraiment votre chiffre, j'ai écrit un article dédié : <Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-mint-green hover:underline font-medium">Pipeline commercial PME : comment construire un outil qui prédit vraiment votre chiffre</Link>.
          </p>

          {/* ════════ ÉTAPE 4 ════════ */}
          <h2 id="competences" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Étape 4 — Le vrai travail, c'est sur le terrain
          </h2>

          <p className="mb-6">
            Beaucoup de PME confondent formation et développement des compétences. On envoie les commerciaux en stage deux jours, on leur distribue des fiches, et on pense que le problème est réglé. Mais les vrais progrès ne se font pas en salle de formation. Ils se font dans la voiture, sur le parking, au débrief du rendez-vous.
          </p>

          <p className="mb-6">
            <strong>Le coaching terrain, c'est le levier le plus sous-estimé du développement commercial PME.</strong> Pourquoi ? Parce qu'il travaille sur la situation réelle, pas sur un cas idéal. Le commercial qui vient de se prendre une objection qu'il n'avait pas préparée. L'échange qui a dérapé parce qu'il est tombé sur un décideur qui lui a retourné toutes ses questions. La proposition qu'il n'a pas osé défendre jusqu'au bout.
          </p>

          <p className="mb-6">
            Voici le seul protocole de coaching qui a fait ses preuves sur le terrain :
          </p>

          <ul className="space-y-4 mb-8">
            <li><strong>Observer sans intervenir.</strong> Le manager ou le coach accompagne sur un vrai rendez-vous. Il ne coupe pas la parole, ne sauve pas la vente. Il regarde, il écoute, il prend des notes.</li>
            <li><strong>Débrefer en deux temps.</strong> D'abord, ce que le commercial en pense lui-même. Ensuite, ce que le coach a observé. Pas de jugement. Juste une lecture à deux voix.</li>
            <li><strong>Travailler un seul point à la fois.</strong> Pas une liste de 15 choses à améliorer. Un seul réflexe à changer : « la prochaine fois, avant de répondre à l'objection, prends le temps de faire répéter le client pour comprendre ce qu'il veut vraiment dire. »</li>
          </ul>

          <p className="mb-6">
            Un client du secteur du logiciel m'a demandé de coacher son équipe sur les objections. En deux jours de terrain — quatre commerciaux, huit rendez-vous vécus — on a identifié les trois schémas qui leur faisaient perdre des ventes. Pas une théorie. Des scènes réelles, répétées, qu'on a retravaillées une par une.
          </p>

          <p className="mb-6">
            Pour approfondir les techniques qui fonctionnent en situation réelle, j'ai aussi écrit sur <Link href="/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader" className="text-mint-green hover:underline font-medium">les techniques de closing B2B</Link> et sur la construction d'un <Link href="/blog/playbook-commercial-guide-pratique-terrain" className="text-mint-green hover:underline font-medium">playbook commercial qui sert vraiment sur le terrain</Link>.
          </p>

          {/* ════════ ÉTAPE 5 ════════ */}
          <h2 id="pilotage" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Étape 5 — Mesurez ce qui compte (et arrêtez de regarder le reste)
          </h2>

          <p className="mb-6">
            Les PME que je vois sont noyées sous les indicateurs. Taux d'activité, nombre d'appels, emails envoyés, réunions réalisées, propositions en cours, panier moyen, marge par affaire, taux de rétention… La liste est longue. Et la plupart de ces chiffres ne servent à rien.
          </p>

          <p className="mb-6">
            <strong>Les 3 indicateurs qui comptent vraiment pour le développement commercial d'une PME :</strong>
          </p>

          <ul className="space-y-4 mb-8">
            <li><strong>1. Le taux de conversion par étape.</strong> Combien de vos propositions aboutissent à une signature ? Combien de vos découvertes aboutissent à une proposition ? Si vous ne suivez pas ça, vous pilotez à l'instinct. Et l'instinct ment.</li>
            <li><strong>2. La vitesse du cycle.</strong> Combien de jours entre le premier contact et la signature ? Si le cycle s'allonge, ce n'est pas un problème de prospection — c'est un problème de processus ou de qualification.</li>
            <li><strong>3. La valeur moyenne des deals signés.</strong> Si elle baisse, vous vendez peut-être à des clients trop petits, ou vous bradez vos prix pour signer. Les deux sont des signaux à prendre au sérieux.</li>
          </ul>

          <p className="mb-6">
            J'ai vu des directions commerciales passer des heures à analyser des tableaux de bord magnifiques — 25 indicateurs en couleur, des graphiques, des tendances — sans jamais prendre une décision. Le pilotage, ce n'est pas regarder des chiffres. C'est poser des questions : « Qu'est-ce qu'on fait la semaine prochaine de différent par rapport à ce qu'on a appris cette semaine ? »
          </p>

          <p className="mb-6">
            La réunion hebdomadaire de 30 minutes que je décrivais à l'étape 3, c'est là que se joue le vrai pilotage. Pas dans le rapport mensuel qu'on envoie au comité.
          </p>



          {/* ════════ CONCLUSION ════════ */}
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Le développement commercial, ce n'est pas un projet — c'est un cycle
          </h2>

          <p className="mb-6">
            Beaucoup de dirigeants abordent le développement commercial comme un projet ponctuel. On embauche un commercial. On achète un CRM. On fait une formation. Et on espère que ça va marcher.
          </p>

          <p className="mb-6">
            Mais le développement commercial d'une PME, ça se pilote comme un cycle : on diagnostique, on stratégise, on exécute, on mesure, on ajuste. Puis on recommence. Chaque trimestre.
          </p>

          <p className="mb-6">
            Les équipes qui progressent vraiment ne sont pas celles qui ont la meilleure méthode ou le plus gros budget. Ce sont celles qui ont le rythme : un diagnostic franc, une priorité claire, un pipeline tenu, un coaching régulier, et trois indicateurs suivis chaque semaine.
          </p>

          <p className="text-xl font-title font-semibold text-blue-ink my-8 text-center">
            Le développement commercial d'une PME, ça ne se décrète pas. Ça se construit étape par étape, en regardant le réel en face.
          </p>

          {/* ════════ FAQ ════════ */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-14 mb-6">
            FAQ développement commercial PME
          </h2>

          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                Qu'est-ce que le développement commercial d'une PME ?
              </h3>
              <p className="mb-0">
                Le développement commercial d'une PME, c'est l'ensemble des actions structurées qui visent à accroître durablement le chiffre d'affaires d'une entreprise de taille moyenne ou petite : ciblage, prospection, processus de vente, compétences de l'équipe, outils de pilotage. Ce n'est pas un coup de boost, c'est une démarche continue.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                Par où commencer le développement commercial de ma PME ?
              </h3>
              <p className="mb-0">
                Par un diagnostic honnête. Avant de décider ce qu'il faut améliorer, il faut savoir où on en est vraiment : ciblage, pipeline, processus, compétences, pilotage. Sans ce premier regard lucide, tous les efforts risquent de porter à côté du vrai problème.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                Combien de temps faut-il pour voir des résultats ?
              </h3>
              <p className="mb-0">
                Les premiers résultats visibles arrivent généralement sous 90 jours si on suit le cycle complet. Le diagnostic prend une à deux semaines. La stratégie en une page se pose en une réunion. Le pipeline se nettoie en une revue. Les vrais progrès sur les compétences terrain demandent deux à trois cycles de coaching.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                Faut-il un CRM pour développer mon commercial ?
              </h3>
              <p className="mb-0">
                Oui et non. Un CRM est utile si et seulement si vous avez déjà un processus clair. Sinon, c'est un outil qui viendra habiller le désordre. Commencez par définir vos étapes, votre système de qualification et votre rituel de revue. Ensuite seulement, choisissez un outil qui suit ce processus, pas l'inverse.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                Le coaching commercial est-il vraiment nécessaire ?
              </h3>
              <p className="mb-0">
                C'est le levier le plus sous-estimé du développement commercial. La formation donne des connaissances. Le coaching transforme des comportements. Et c'est le changement de comportement — pas le savoir — qui fait la différence dans un rendez-vous client.
              </p>
            </div>
          </div>

          {/* ════════ POUR ALLER PLUS LOIN ════════ */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/playbook-commercial-guide-pratique-terrain" className="text-mint-green hover:underline font-medium">
                  Playbook commercial : le guide pratique terrain
                </Link>
                <span className="text-gray-500"> — Pour outiller votre équipe commerciale.</span>
              </li>
              <li>
                <Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-mint-green hover:underline font-medium">
                  Pipeline commercial PME : comment construire un outil fiable
                </Link>
                <span className="text-gray-500"> — Pour approfondir l'étape 3.</span>
              </li>
              <li>
                <Link href="/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader" className="text-mint-green hover:underline font-medium">
                  Techniques de closing B2B
                </Link>
                <span className="text-gray-500"> — Pour travailler les compétences terrain de l'étape 4.</span>
              </li>
            </ul>
          </div>

          {/* ════════ CTA FINAL ════════ */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h2 className="text-2xl font-title font-bold mb-4">
              Vous voulez appliquer ces 5 étapes dans votre entreprise ?
            </h2>
            <p className="mb-6">
              Je propose deux manières de travailler ensemble : un diagnostic commercial gratuit pour identifier vos vrais leviers de croissance, ou un accompagnement terrain pour déployer la méthode complète avec votre équipe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors text-center"
              >
                🔍 Faire un diagnostic commercial →
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors text-center"
              >
                Découvrir le bootcamp →
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <AuthorCard />
          </div>

          <section className="mt-12 pt-10 border-t border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
              Prendre contact avec Laurent Serre
            </h2>
            <HubSpotForm />
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
              ← Tous les articles du blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
