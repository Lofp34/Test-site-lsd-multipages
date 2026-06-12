import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Plan de prospection commerciale : générer des leads toute l\'année | Laurent Serre',
  description:
    'La prospection ne se fait pas quand on a le temps. Voici comment construire un plan de prospection commerciale simple, suivi et réellement tenu dans une PME.',
  keywords:
    'plan de prospection commerciale, prospection B2B, prospection commerciale PME, génération de leads, stratégie commerciale, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/plan-prospection-commerciale-machine-leads-annee',
  },
  other: {
    'dateModified': '2026-05-16',
  },
  openGraph: {
    title: 'Plan de prospection commerciale : construire la machine qui génère des leads toute l\'année',
    description:
      'La prospection ne manque pas toujours d\'énergie. Elle manque souvent de rendez-vous dans l\'agenda, de ciblage clair et de rythme tenu.',
    url: 'https://www.laurentserre.com/blog/plan-prospection-commerciale-machine-leads-annee',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-16-plan-prospection-commerciale-hero.webp',
        width: 1536,
        height: 1024,
        alt: 'Réunion de prospection commerciale en PME autour d\'un tableau blanc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plan de prospection commerciale : générer des leads toute l\'année | Laurent Serre',
    description:
      'Un plan de prospection utile dit clairement qui prospecte, qui on cherche à toucher, avec quel message, à quel rythme, et comment on voit si ça avance.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-16-plan-prospection-commerciale-hero.webp'],
  },
};

export default function ArticlePage() {
  const articleUrl = 'https://www.laurentserre.com/blog/plan-prospection-commerciale-machine-leads-annee';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Plan de prospection commerciale : construire la machine qui génère des leads toute l\'année',
        description:
          'La prospection ne se fait pas quand on a le temps. Elle se fait parce qu\'on a décidé qu\'elle faisait partie du système commercial.',
        image: 'https://www.laurentserre.com/images/blog/2026-05-16-plan-prospection-commerciale-hero.webp',
        datePublished: '2026-05-16',
        dateModified: '2026-05-16',
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
            name: 'Plan de prospection commerciale',
            item: articleUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Qui est votre prospect idéal ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pas « tout le monde ». Un profil précis : secteur, taille d\'entreprise, poste du décideur, contexte déclencheur. Sans ICP clair, vos commerciaux prospectent dans tous les sens et convertissent très peu.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment calculer ses objectifs de prospection ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le calcul en cascade transforme un objectif de chiffre d\'affaires en activité concrète. Exemple : pour 12 nouveaux clients avec un taux de closing à 25 %, il faut 48 propositions, environ 80 rendez-vous et 400 contacts initiaux, soit 33 contacts par mois par commercial.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi ne faut-il pas prospecter seulement quand le pipeline est vide ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'C\'est le syndrome du flux tendu commercial. Quand l\'activité est forte on ne prospecte plus, et quand elle ralentit on relance en urgence. Mais une première conversation ne devient pas une opportunité sérieuse du jour au lendemain. La prospection doit être une activité permanente, pas une activité de crise.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels indicateurs de prospection suivre chaque semaine ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Six indicateurs simples : nombre de nouveaux contacts initiés, nombre de conversations réelles, nombre de rendez-vous de découverte, nombre de propositions envoyées, taux de réponse par canal et qualité des rendez-vous obtenus.',
            },
          },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <nav className="mb-8 text-sm" aria-label="Fil d'Ariane">
          <Link href="/" className="text-mint-green hover:text-mint-green/80 transition-colors">
            Accueil
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors">
            Blog
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500" aria-current="page">Plan de prospection commerciale</span>
        </nav>

        <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/blog/2026-05-16-plan-prospection-commerciale-hero.webp"
            alt="Réunion de prospection commerciale en PME autour d'un tableau blanc"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <time dateTime="2026-05-16">16 mai 2026</time>
          <span aria-hidden="true">·</span>
          <span>Prospection commerciale</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          Plan de prospection commerciale : construire la machine qui génère des leads toute l'année
        </h1>

        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial',
            image: '/images/blog/Laurent-Serre-avatar.webp',
          }}
        />

        <div className="mt-8 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
          <p className="text-sm font-semibold text-blue-ink mb-2">À retenir</p>
          <p className="text-gray-700 leading-relaxed">
            La prospection ne se fait pas « quand on a le temps ». Elle se tient parce qu'elle est organisée.
            Un bon plan de prospection dit qui prospecte, qui on cherche à toucher, avec quel message,
            à quel rythme, et comment on voit si ça avance vraiment.
          </p>
        </div>

        <nav className="mt-8 mb-8 p-5 bg-blue-ink/5 rounded-xl border border-blue-ink/10" aria-label="Sommaire">
          <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
          <ul className="space-y-1.5 text-sm">
            <li><a href="#fondations-plan-prospection" className="text-mint-green hover:underline">Les 5 fondations du plan de prospection</a></li>
            <li><a href="#calendrier-annuel-prospection" className="text-mint-green hover:underline">Construire le calendrier annuel</a></li>
            <li><a href="#outils-plan-prospection" className="text-mint-green hover:underline">Les outils du plan de prospection</a></li>
            <li><a href="#suivi-plan-prospection" className="text-mint-green hover:underline">Suivre et piloter le plan en cours d'année</a></li>
            <li><a href="#erreur-pipeline-vide" className="text-mint-green hover:underline">L'erreur fréquente : prospecter seulement quand le pipeline est vide</a></li>
            <li><a href="#conclusion-plan-prospection" className="text-mint-green hover:underline">Conclusion : votre plan de prospection en 5 questions</a></li>
          </ul>
        </nav>

        <div className="mt-10 prose prose-lg max-w-none prose-a:text-mint-green prose-a:no-underline hover:prose-a:underline prose-strong:text-blue-ink">
          <p>
            Janvier. Tout le monde repart avec de bonnes résolutions. « Cette année, on prospecte vraiment. »
            Et en mars, la prospection a déjà disparu dans le fond des priorités, écrasée par les urgences du quotidien.
          </p>

          <p>
            Le problème n'est pas le manque de volonté. C'est l'absence de plan.
          </p>

          <p>
            Un plan de prospection commerciale n'est pas un vœu pieux. C'est un système documenté qui dit clairement :
            qui prospecte, qui, comment, avec quels outils, à quelle fréquence, et avec quels objectifs. Construit une fois,
            il tourne toute l'année — même quand les urgences s'accumulent.
          </p>

          <p>
            Voici comment le construire.
          </p>

          <h2 id="fondations-plan-prospection" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 5 fondations du plan de prospection
          </h2>

          <p>
            Avant de parler de calendrier ou d'outils, posez les fondations. Sans elles, votre plan sera une belle coquille vide.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Fondation 1 : votre ICP
          </h3>

          <p>
            Qui est votre prospect idéal ? Pas « tout le monde ». Un profil précis : secteur, taille d'entreprise,
            poste du décideur, contexte déclencheur.
          </p>

          <p>
            Si vous ne savez pas exactement qui vous prospectez, vos commerciaux prospectent dans tous les sens
            et convertissent très peu.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Fondation 2 : votre proposition de valeur pour ce profil
          </h3>

          <p>
            Pourquoi ce prospect devrait-il vous écouter ? Quel problème spécifique résolvez-vous pour lui ? Avec quelle preuve ?
          </p>

          <p>
            Une proposition de valeur générique donne des résultats génériques. Adaptez votre message au profil.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Fondation 3 : vos objectifs de prospection
          </h3>

          <p>
            Combien de nouveaux clients visez-vous cette année ? Avec votre taux de conversion actuel, combien de propositions
            faut-il envoyer ? Combien de rendez-vous ? Combien de contacts initiaux ?
          </p>

          <p>
            Ce calcul en cascade transforme un objectif de chiffre d'affaires abstrait en objectif d'activité concret.
          </p>

          <p>
            Exemple : objectif = 12 nouveaux clients. Taux de closing = 25 %. Il faut donc 48 propositions.
            Si 60 % des rendez-vous donnent une proposition, il faut environ 80 rendez-vous. Si 20 % des contacts
            deviennent des rendez-vous, il faut environ 400 contacts. Soit 33 contacts par mois, ou 8 par semaine par commercial.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Fondation 4 : vos canaux de prospection sélectionnés
          </h3>

          <p>
            Choisissez 2 à 3 canaux maximum.
          </p>

          <p>
            Les plus courants en PME B2B : téléphone, email, LinkedIn, événements sectoriels, recommandations.
          </p>

          <p>
            Chaque canal a ses règles, ses outils et ses métriques. Se disperser sur 6 canaux à la fois donne
            des résultats médiocres partout.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Fondation 5 : l'organisation et la responsabilité
          </h3>

          <p>
            Qui prospecte ? Combien de temps par semaine ? Quand dans la semaine ? Qui suit les indicateurs ?
            Qui fait les comptes rendus ?
          </p>

          <p>
            Sans organisation explicite, « tout le monde est responsable de la prospection » signifie souvent que personne
            ne l'est vraiment.
          </p>

          <h2 id="calendrier-annuel-prospection" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Construire le calendrier annuel
          </h2>

          <p>
            Un plan de prospection s'inscrit dans la réalité du calendrier commercial. Certaines périodes sont meilleures
            que d'autres pour prospecter.
          </p>

          <p>
            La plupart des secteurs B2B ont des périodes creuses : été, fêtes de fin d'année, ponts, fins de trimestre saturées.
          </p>

          <p>
            Ils ont aussi des périodes plus propices : rentrée de septembre, début d'année, moments de préparation budgétaire,
            lancement de projets.
          </p>

          <p>
            Il faut adapter l'intensité de prospection à ces cycles.
          </p>

          <p>
            Ne lâchez pas complètement en août, mais ne lancez pas forcément votre plus gros push non plus.
          </p>

          <p>
            Une structure mensuelle simple peut ressembler à ça :
          </p>

          <ul>
            <li>Semaine 1 : prospection intensive de nouveaux contacts.</li>
            <li>Semaine 2 : relances des contacts initiés + nouveaux contacts.</li>
            <li>Semaine 3 : rendez-vous, qualification, propositions + prospection maintenue.</li>
            <li>Semaine 4 : closing, analyse des indicateurs, ajustement du mois suivant.</li>
          </ul>

          <p>
            Cette structure crée un rythme régulier et évite les à-coups.
          </p>

          <h2 id="outils-plan-prospection" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les outils du plan de prospection
          </h2>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Le CRM : votre colonne vertébrale
          </h3>

          <p>
            Pas besoin d'un outil hors de prix. HubSpot Free, Pipedrive ou même un Google Sheets bien structuré peuvent suffire
            pour une petite équipe.
          </p>

          <p>
            L'important n'est pas l'outil. L'important, c'est que tous les contacts, toutes les activités et tous les statuts
            soient documentés en temps réel.
          </p>

          <p className="font-semibold text-blue-ink text-xl">
            Un CRM mal alimenté vaut moins qu'un carnet de notes bien tenu.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Les outils selon les canaux
          </h3>

          <p>
            Pour la prospection téléphonique : un outil de téléphonie ou de VOIP peut aider à suivre les appels et les relances.
          </p>

          <p>
            Pour l'email : un outil de séquençage peut automatiser certaines relances et mesurer les taux de réponse.
          </p>

          <p>
            Pour LinkedIn : Sales Navigator peut aider au ciblage, à condition de ne pas transformer LinkedIn en usine
            à messages impersonnels.
          </p>

          <p>
            Mais attention : les outils ne remplacent pas le ciblage, le message et le rythme.
          </p>

          <p>
            Ils accélèrent ce qui existe déjà.
          </p>

          <p>
            S'il y a du flou, ils accélèrent le flou.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Le playbook de prospection
          </h3>

          <p>
            Le playbook est le document central du plan.
          </p>

          <p>
            Il contient :
          </p>

          <ul>
            <li>les scripts d'appel,</li>
            <li>les modèles d'emails,</li>
            <li>les messages LinkedIn types,</li>
            <li>les objections fréquentes,</li>
            <li>les réponses possibles,</li>
            <li>les critères de qualification,</li>
            <li>les exemples de bonnes conversations,</li>
            <li>les erreurs à éviter.</li>
          </ul>

          <p>
            Il permet à un nouveau commercial d'être opérationnel plus vite. Il permet aussi de capitaliser sur ce qui marche
            vraiment sur le terrain.
          </p>

          <p>
            Un bon playbook n'est pas figé. Il évolue chaque trimestre avec les retours de l'équipe.
          </p>

          <h2 id="suivi-plan-prospection" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Suivre et piloter le plan en cours d'année
          </h2>

          <p>
            Un plan sans suivi devient vite une intention oubliée.
          </p>

          <p>
            Chaque semaine, il faut regarder quelques indicateurs simples :
          </p>

          <ul>
            <li>nombre de nouveaux contacts initiés,</li>
            <li>nombre de conversations réelles,</li>
            <li>nombre de rendez-vous de découverte,</li>
            <li>nombre de propositions envoyées,</li>
            <li>taux de réponse par canal,</li>
            <li>qualité des rendez-vous obtenus.</li>
          </ul>

          <p>
            La revue mensuelle peut tenir en 30 minutes :
          </p>

          <ul>
            <li>objectifs vs réalisé,</li>
            <li>canal le plus performant,</li>
            <li>cause principale des non-conversions,</li>
            <li>ajustement du message,</li>
            <li>ajustement du ciblage,</li>
            <li>points de blocage côté équipe.</li>
          </ul>

          <p>
            Tous les trimestres, il faut reprendre les fondations :
          </p>

          <ul>
            <li>L'ICP est-il toujours le bon ?</li>
            <li>La proposition de valeur résonne-t-elle encore ?</li>
            <li>Le canal principal fonctionne-t-il toujours ?</li>
            <li>Le message déclenche-t-il de vraies conversations ?</li>
            <li>Le rythme est-il tenu ?</li>
          </ul>

          <p>
            Un plan de prospection n'est pas un document qu'on range. C'est un système qu'on ajuste.
          </p>

          {/* CTA mi-article — bootcamp */}
          <div className="bg-gradient-to-r from-mint-green/20 to-teal-50 border border-mint-green/30 rounded-2xl p-6 my-10 text-center">
            <p className="text-lg font-title font-bold text-blue-ink mb-2">
              Vous avez reconnu votre &eacute;quipe dans ces 6 concepts&nbsp;?
            </p>
            <p className="text-sm text-gray-600 mb-4">
              La plupart des PME stagnent entre l&rsquo;&eacute;tape 1 et 2. Le
              bootcamp commercial acc&eacute;l&egrave;re cette transformation en
              8 semaines avec un coaching terrain personnalis&eacute;.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-ink text-white font-semibold text-sm rounded-full hover:bg-blue-ink/90 transition-colors shadow-sm"
            >
              D&eacute;couvrir le bootcamp
            </Link>
          </div>

          <h2 id="erreur-pipeline-vide" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L'erreur fréquente : prospecter seulement quand le pipeline est vide
          </h2>

          <p>
            C'est le syndrome du flux tendu commercial.
          </p>

          <p>
            Quand l'activité est forte, on ne prospecte plus.
          </p>

          <p>
            Quand elle ralentit, on relance la prospection en urgence.
          </p>

          <p>
            Et comme une première conversation ne devient pas une opportunité sérieuse du jour au lendemain,
            l'entreprise subit un creux trois mois plus tard.
          </p>

          <p className="font-semibold text-blue-ink text-xl">
            La prospection doit être une activité permanente, pas une activité de crise.
          </p>

          <p>
            Il faut travailler sur trois horizons en même temps :
          </p>

          <ul>
            <li>Horizon 1 : fermer les affaires en cours.</li>
            <li>Horizon 2 : développer les opportunités déjà ouvertes.</li>
            <li>Horizon 3 : alimenter le pipeline avec de nouveaux prospects.</li>
          </ul>

          <p>
            C'est la seule façon de garder un chiffre d'affaires régulier.
          </p>

          <h2 id="conclusion-plan-prospection" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Conclusion : votre plan de prospection en 5 questions
          </h2>

          <p>
            Répondez à ces 5 questions et vous avez déjà les bases :
          </p>

          <ol>
            <li>Qui est votre prospect idéal ?</li>
            <li>Quelle est votre proposition de valeur pour ce profil ?</li>
            <li>Combien de contacts par semaine sont nécessaires pour atteindre vos objectifs ?</li>
            <li>Quels 2 ou 3 canaux priorisez-vous ?</li>
            <li>Qui prospecte, quand, et comment mesurez-vous les résultats ?</li>
          </ol>

          <p>
            Trois actions concrètes à faire cette semaine :
          </p>

          <ol>
            <li>
              Faites le calcul en cascade : objectif de CA → nombre de clients → nombre de propositions → nombre de rendez-vous → nombre de contacts.
            </li>
            <li>
              Bloquez des créneaux de prospection dans les agendas pour les 4 prochaines semaines.
            </li>
            <li>
              Créez un playbook minimal : un script d'appel, un modèle email, quelques réponses aux objections fréquentes.
            </li>
          </ol>

          <p>
            La prospection ne se fait pas « quand on a le temps ».
          </p>

          <p>
            Elle se fait parce qu'on a décidé qu'elle faisait partie du système commercial.
          </p>

          <p>
            Et ce système commence par un plan.
          </p>
        </div>

        <div className="mt-12 p-8 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
          <p className="text-lg font-title font-bold text-blue-ink mb-4">📖 Pour aller plus loin</p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <Link href="/blog/linkedin-prospection-b2b-50-messages-par-jour" className="text-mint-green hover:underline font-medium">
                Je reçois 50 messages LinkedIn par jour — et j'en lis à peine 3
              </Link>
              <span className="block text-gray-500 mt-0.5">Pour éviter que la prospection LinkedIn devienne une usine à messages impersonnels.</span>
            </li>
            <li>
              <Link href="/blog/ia-et-prospection-commerciale-ce-qui-change-vraiment-pour-vos-equipes-en-2026" className="text-mint-green hover:underline font-medium">
                IA et prospection commerciale : ce qui change vraiment pour vos équipes en 2026
              </Link>
              <span className="block text-gray-500 mt-0.5">L'IA peut accélérer la prospection, à condition que le ciblage et le message soient déjà clairs.</span>
            </li>
            <li>
              <Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-mint-green hover:underline font-medium">
                Pipeline commercial PME : comment construire un outil qui prédit vraiment votre chiffre
              </Link>
              <span className="block text-gray-500 mt-0.5">Parce que prospecter régulièrement sert d'abord à éviter les trous d'air commerciaux.</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-400">
            Source externe :{' '}
            <a href="https://www.hubspot.com/sales/pipeline-management" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">
              HubSpot — Pipeline Management Guide
            </a>
          </p>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-mint-green/20">
          <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
            🎯 Votre prospection tient-elle vraiment dans l'agenda ?
          </h3>
          <p className="text-gray-600 mb-6">
            Si votre prospection dépend encore des semaines calmes, elle finira toujours par disparaître.
            Un diagnostic commercial permet de voir où le système bloque : ciblage, message, rythme ou pilotage.
          </p>
          <Link
            href="/diagnostic?utm_source=blog&utm_medium=organic&utm_campaign=blog-prospection-commerciale&utm_content=plan-prospection-pas-en-crise"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
          >
            Diagnostic gratuit →
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="text-mint-green hover:text-mint-green/80 transition-colors font-medium"
          >
            ← Tous les articles du blog
          </Link>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
