import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/playbook-commercial-guide-pratique-terrain';
const heroImage = 'https://www.laurentserre.com/images/blog/2026-05-20-playbook-commercial-hero.webp';

export const metadata: Metadata = {
  title: 'Playbook commercial PME : créer un guide terrain qui sert',
  description:
    'La plupart des playbooks finissent oubliés dans un Drive. Voici comment construire un guide de terrain que votre équipe consultera en situation de vente.',
  keywords:
    'playbook commercial, guide pratique vente, méthode de vente, sales playbook PME, processus de vente, playbook de vente, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-05-20',
  },
  openGraph: {
    title: 'Playbook commercial : construire celui qui sert vraiment sur le terrain',
    description:
      'Un playbook utile n\'est pas un roman de 80 pages. C\'est un outil de terrain consultable en 3 clics. Voici comment le construire avec votre équipe.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 1024,
        alt: 'Playbook commercial - construire un outil de terrain qui sert vraiment',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Playbook commercial : le guide pratique pour créer celui qui va vraiment être utilisé',
    description:
      'Playbook de vente : 7 sections clés, 2 semaines suffisent pour une V1. Un guide terrain consultable en 3 clics.',
    images: [heroImage],
  },
};

export default function PlaybookCommercialGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: 'Playbook commercial : le guide pratique pour créer celui qui va vraiment être utilisé',
        description:
          'La plupart des playbooks finissent oubliés dans un Google Drive. Voici comment construire un vrai guide de terrain que vos commerciaux consulteront.',
        image: heroImage,
        datePublished: '2026-05-20',
        dateModified: '2026-05-20',
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
        articleSection: 'Méthode de vente / outils terrain',
        keywords: [
          'playbook commercial',
          'guide pratique vente',
          'méthode de vente',
          'sales playbook PME',
          'processus de vente',
          'outils commerciaux terrain',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': articleUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Un playbook commercial, c\'est quoi concrètement ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'C\'est un guide de terrain qui documente les meilleures pratiques commerciales : ICP, processus de vente, scripts, objections, questions de découverte, arguments concurrentiels. Il se lit en situation, pas en théorie.',
            },
          },
          {
            '@type': 'Question',
            name: 'Combien de temps faut-il pour créer un playbook qui serve vraiment ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Deux semaines pour une V1 utilisable. L\'essentiel est de commencer par les situations terrain qui coûtent le plus cher, pas de vouloir tout documenter du premier coup.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment faire en sorte que l\'équipe utilise le playbook ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Trois conditions : 1) il est construit avec l\'équipe, pas par un consultant isolé 2) il est accessible en 3 clics depuis le terrain 3) il est référencé en réunion et mis à jour trimestriellement avec l\'équipe.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': articleUrl + '#howto',
        name: 'Comment créer un playbook commercial utilisable en 2 semaines',
        description: 'Un sprint de 2 semaines pour construire un playbook de vente que votre équipe utilisera vraiment sur le terrain.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Définir votre ICP et votre processus de vente',
            text: 'Jour 1-2 : documentez votre client idéal (secteur, taille, poste du décideur, signaux déclencheurs) et schématisez votre processus de vente étape par étape avec critères d\'entrée et de sortie.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Rassembler vos meilleurs scripts',
            text: 'Jour 3-4 : collectez les 5 scripts qui fonctionnent déjà dans votre équipe : téléphone, email, LinkedIn, découverte, closing.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Lister les objections les plus fréquentes',
            text: 'Jour 5 : identifiez les 10 objections les plus fréquentes. Pour chacune, rédigez une réponse en 4 étapes : accueillir, creuser, reformuler, répondre.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Finaliser la bibliothèque d\'objections avec l\'équipe',
            text: 'Semaine 2, jour 1-2 : passez en revue les objections avec vos commerciaux. Validez les formulations et ajoutez les objections manquantes.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Ajouter les questions de découverte et la section concurrence',
            text: 'Jour 3-4 : documentez 15 à 20 questions de découverte organisées par thème, puis vos arguments concurrentiels.',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Review collective et déploiement',
            text: 'Jour 5 : organisez une revue collective avec l\'équipe. Choisissez le format et planifiez une mise à jour trimestrielle.',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': articleUrl + '#breadcrumb',
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
            name: 'Playbook commercial',
            item: articleUrl,
          },
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

      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/2026-05-20-playbook-commercial-hero.webp"
            alt="Playbook commercial — construire un outil de terrain qui sert vraiment"
            fill
            className="object-cover object-top brightness-[0.3]"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-mint-green text-white">
              Méthode de vente / outils terrain
            </span>
            <span className="text-white/60 text-sm">• 20 mai 2026</span>
            <span className="text-white/60 text-sm">• 7 min</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold mb-6 leading-tight">
            Playbook commercial : le guide pratique pour créer celui qui va vraiment être utilisé
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            La plupart des playbooks ont le même destin : créés avec enthousiasme, partagés avec l'équipe, puis oubliés dans un dossier que personne ne rouvrira jamais.
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="prose prose-lg max-w-none">
          <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">Ce que vous allez retenir</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Un playbook n'est pas un document</strong> — c'est un outil de terrain consultable en situation.</li>
              <li><strong>7 sections clés</strong> pour couvrir l'essentiel sans faire 80 pages.</li>
              <li><strong>2 semaines suffisent</strong> pour une V1 utilisable, si on commence par l'essentiel.</li>
              <li><strong>L'usage dépend du terrain</strong> : construire avec l'équipe, pas depuis un bureau.</li>
            </ul>
          </div>

          {/* Carrousel BD — viewer interactif */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD — Playbook Commercial
            </p>
            <p className="text-sm text-amber-700 mb-5">
              12 planches illustrées — cliquez sur une vignette pour feuilleter la BD dans le lecteur intégré.
            </p>
            <BDCarousel
              images={[
                { src: '/images/blog/carrousel-playbook-commercial/01-cover.webp', alt: 'Couverture — Playbook Commercial', index: 1 },
                { src: '/images/blog/carrousel-playbook-commercial/02-dirigeant-use.webp', alt: 'Le dirigeant submergé', index: 2 },
                { src: '/images/blog/carrousel-playbook-commercial/03-lundi-sans-methode.webp', alt: 'Lundi sans méthode', index: 3 },
                { src: '/images/blog/carrousel-playbook-commercial/04-mauvaise-prospection.webp', alt: 'Mauvaise prospection', index: 4 },
                { src: '/images/blog/carrousel-playbook-commercial/05-objection-prix.webp', alt: 'Objection prix', index: 5 },
                { src: '/images/blog/carrousel-playbook-commercial/06-diagnostic-dirigeant.webp', alt: 'Diagnostic dirigeant', index: 6 },
                { src: '/images/blog/carrousel-playbook-commercial/07-faux-playbook.webp', alt: 'Le faux playbook', index: 7 },
                { src: '/images/blog/carrousel-playbook-commercial/08-laurent-terrain.webp', alt: 'Laurent sur le terrain', index: 8 },
                { src: '/images/blog/carrousel-playbook-commercial/09-construction-playbook.webp', alt: 'Construction du playbook', index: 9 },
                { src: '/images/blog/carrousel-playbook-commercial/10-accompagnement-terrain.webp', alt: 'Accompagnement terrain', index: 10 },
                { src: '/images/blog/carrousel-playbook-commercial/11-playbook-utilise.webp', alt: 'Playbook utilisé', index: 11 },
                { src: '/images/blog/carrousel-playbook-commercial/12-chute.webp', alt: 'Chute — la clé du succès', index: 12 },
              ]}
              title="Carrousel BD — Playbook Commercial"
              maxPreview={2}
            />
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-semibold text-sm rounded-full hover:bg-amber-700 transition-colors shadow-sm"
              >
                🔍 Évaluez votre équipe — Diagnostic gratuit
              </Link>
              <a
                href="/downloads/carrousel-playbook-commercial-terrain.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (12 planches)
              </a>
            </div>
          </div>

          <nav className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 mb-10" aria-label="Sommaire">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">Sommaire</p>
            <ul className="space-y-1.5 text-sm">
              <li><a href="#mauvais-reflexe" className="text-mint-green hover:underline">1. Le mauvais réflexe du playbook de 80 pages</a></li>
              <li><a href="#qu-est-ce-qu-un-bon-playbook" className="text-mint-green hover:underline">2. Qu'est-ce qu'un bon playbook commercial ?</a></li>
              <li><a href="#contenu-cles" className="text-mint-green hover:underline">3. Les contenus qui servent vraiment</a></li>
              <li><a href="#methode-de-construction" className="text-mint-green hover:underline">4. Le sprint de construction en 2 semaines</a></li>
              <li><a href="#faire-utiliser" className="text-mint-green hover:underline">5. Faire en sorte qu'il soit vraiment utilisé</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">6. FAQ playbook commercial</a></li>
            </ul>
          </nav>

          <h2 id="mauvais-reflexe" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le mauvais réflexe du playbook de 80 pages
          </h2>

          <p className="mb-8">
            La plupart des équipes de vente n'ont pas vraiment de méthode de travail structurée.
          </p>
          <p className="mb-8">
            Jusqu'au jour où le directeur commercial en a marre des pratiques dispersées, épuisantes et peu productives.
          </p>
          <p className="mb-8">
            Et il fait ce qui semble logique : il écrit ou commande un « sales playbook ».
          </p>
          <p className="mb-8">
            Le problème, c'est que dans huit cas sur dix, ce playbook finit au fond d'un Google Drive que personne ne rouvre jamais.
          </p>
          <p className="mb-8">
            Pourquoi ? Parce qu'on a construit un document, pas un outil de terrain.
          </p>
          <p className="mb-8">
            Je vois régulièrement des PME investir des semaines à produire des playbooks exhaustifs, beaux, complets, bien organisés et découvrir trois mois plus tard que personne ne les a ouverts.
          </p>
          <p className="mb-8">
            Le piège, c'est de croire que l'effort de production garantit l'utilité.
          </p>
          <p className="mb-8">
            Un playbook de 80 pages qui dort vaut zéro. Une fiche de 3 pages consultée chaque semaine change la performance de l'équipe.
          </p>

          <h2 id="qu-est-ce-qu-un-bon-playbook" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Qu'est-ce qu'un bon playbook commercial ?
          </h2>

          <p className="mb-8">
            Un playbook commercial, c'est le manuel de terrain de votre équipe de vente.
          </p>
          <p className="mb-8">
            Il documente et standardise les meilleures pratiques pour votre contexte spécifique.
          </p>
          <p className="mb-8">
            Il répond à ces questions :
          </p>
          <ul className="mb-8 space-y-2 list-disc list-inside">
            <li>Qui sont nos clients idéaux et comment les reconnaître ?</li>
            <li>Quel est notre processus de vente étape par étape ?</li>
            <li>Quels messages fonctionnent pour chaque profil de prospect ?</li>
            <li>Comment répondre aux objections les plus fréquentes ?</li>
            <li>Quels outils utiliser à chaque étape ?</li>
          </ul>
          <p className="mb-8">
            L'objectif : permettre à un nouveau commercial d'être opérationnel trois fois plus vite, et à un commercial expérimenté d'avoir toujours accès au meilleur de l'intelligence collective de l'équipe.
          </p>
          <p className="mb-8">
            Mais attention : un playbook n'est pas une bible qu'on lit une fois. C'est un guide qu'on consulte en situation de vente.
          </p>

          <h2 id="contenu-cles" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les contenus qui servent vraiment
          </h2>

          <p className="mb-8">
            Un playbook qui sert sur le terrain couvre sept zones.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            1. ICP et qualification
          </h3>
          <p className="mb-8">
            Décrivez votre client idéal avec précision : secteur, taille, poste du décideur, signaux déclencheurs, points de douleur typiques. Ajoutez votre grille de qualification : quels critères doivent être réunis pour qu'une opportunité mérite d'avancer dans le pipeline ? Une matrice BANT adaptée à votre contexte fait très bien l'affaire.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            2. Le processus de vente
          </h3>
          <p className="mb-8">
            Chaque étape de votre cycle de vente doit avoir : un critère d'entrée, des actions clés, des questions à poser, des livrables attendus et un critère de passage à l'étape suivante. Ce schéma rend le processus reproductible. Il permet aussi d'identifier précisément où les affaires stagnent dans le pipeline.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            3. Les scripts et messages par canal
          </h3>
          <p className="mb-8">
            Téléphone : script d'accroche, script de découverte, guide de gestion des gardiens.<br />
            Email : templates de prise de contact, de relance, de suivi après rendez-vous, de proposition, de break-up.<br />
            LinkedIn : messages de connexion, de premier contact, de relance.
          </p>
          <p className="mb-8">
            Important : ce sont des guides, pas des textes à réciter mot à mot. L'équilibre est entre cadre et personnalisation.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            4. Les questions de découverte
          </h3>
          <p className="mb-8">
            Les 15 à 20 meilleures questions, organisées par thème : enjeux business, contexte actuel, problèmes existants, tentatives passées, critères de décision, budget, décideurs. Cette section est souvent la colonne vertébrale du playbook.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            5. La bibliothèque des objections
          </h3>
          <p className="mb-8">
            Les 10 à 15 objections les plus fréquentes, avec pour chacune : ce que l'objection signifie vraiment, la réponse recommandée (méthode en 4 étapes : réception, creuser, reformuler, répondre), des exemples de formulations qui fonctionnent. C'est souvent la section la plus consultée du playbook.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            6. Arguments concurrentiels
          </h3>
          <p className="mb-8">
            Pour chacun de vos 3 à 5 principaux concurrents : leurs points forts réels, leurs faiblesses réelles, votre positionnement face à eux. Règle d'or : ne dénigrez jamais un concurrent. Différenciez-vous positivement.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            7. Outils et ressources
          </h3>
          <p className="mb-8">
            La liste des outils de l'équipe, des guides de prise en main rapide, des ressources de formation, des templates de propositions, des études de cas clients par secteur.
          </p>

          {/* CTA mi-article — bootcamp */}
          <div className="bg-gradient-to-r from-mint-green/20 to-teal-50 border border-mint-green/30 rounded-2xl p-6 my-10 text-center">
            <p className="text-lg font-title font-bold text-blue-ink mb-2">
              Vous avez reconnu votre &eacute;quipe dans ces 7 concepts&nbsp;?
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

          <h2 id="methode-de-construction" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le sprint de construction en 2 semaines
          </h2>

          <p className="mb-8">
            Le playbook parfait est l'ennemi du playbook utilisable. Commencez simple.
          </p>

          <p className="mb-8">
            <strong>Semaine 1 :</strong><br />
            Jour 1-2 : ICP et processus de vente (sections 1 et 2).<br />
            Jour 3-4 : les 5 meilleurs scripts que vous utilisez déjà (section 3).<br />
            Jour 5 : les 10 objections les plus fréquentes (section 5, ébauche).
          </p>

          <p className="mb-8">
            <strong>Semaine 2 :</strong><br />
            Jour 1-2 : finaliser la bibliothèque des objections avec l'équipe.<br />
            Jour 3 : ajouter les questions de découverte (section 4).<br />
            Jour 4 : section concurrence (section 6).<br />
            Jour 5 : review collective avec l'équipe, ajustements.
          </p>

          <p className="mb-8">
            Vous avez un playbook V1 en 2 semaines. Il sera imparfait. C'est normal. Il s'améliorera dans l'utilisation.
          </p>

          <h2 id="faire-utiliser" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Faire en sorte qu'il soit vraiment utilisé
          </h2>

          <p className="mb-8">
            C'est là que la plupart des playbooks meurent : après la création.
          </p>

          <p className="mb-8">
            <strong>Règle 1 : accessible en 3 clics maximum.</strong> Google Slides, Notion, un PDF bien structuré, le format importe moins que l'accessibilité immédiate depuis le terrain.
          </p>

          <p className="mb-8">
            <strong>Règle 2 : intégré dans l'onboarding.</strong> Tout nouveau commercial doit passer par le playbook dans ses premières semaines. C'est le premier outil de formation.
          </p>

          <p className="mb-8">
            <strong>Règle 3 : référencé en réunion commerciale.</strong> « On a une bonne pratique sur ce sujet dans le playbook, section objections. » Chaque référence crée un réflexe de consultation.
          </p>

          <p className="mb-8">
            <strong>Règle 4 : mis à jour trimestriellement avec l'équipe.</strong> Un playbook obsolète devient vite caduc. Bloquez une heure par trimestre pour l'enrichir des nouvelles pratiques et objections rencontrées.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-amber-800 mb-4">L'essentiel en 3 actions cette semaine</p>
            <ul className="space-y-3 text-sm text-amber-700">
              <li><strong>1.</strong> Créez votre ICP en une page : secteur, taille, poste du décideur, 3 problèmes principaux, 3 signaux déclencheurs. Une heure de travail.</li>
              <li><strong>2.</strong> Listez les 10 objections les plus fréquentes de votre équipe. Pour chacune, rédigez votre meilleure réponse actuelle.</li>
              <li><strong>3.</strong> Choisissez un format (Notion, Google Slides, PDF). Créez la structure vide avec les 7 sections et commencez à la remplir.</li>
            </ul>
          </div>

          <p className="text-lg font-title font-semibold text-blue-ink my-8">
            Un playbook V1 imparfait qui est utilisé vaut infiniment plus qu'un playbook parfait qui reste en brouillon.
          </p>

          <p className="text-xs text-gray-400 mb-8">
            Cet article s'appuie sur mon expérience d'accompagnement d'équipes commerciales PME depuis 2016. Les références méthodologiques incluent les travaux de Neil Rackham (SPIN Selling) et les retours de terrain de plusieurs centaines d'entreprises accompagnées sur la structuration de leur force de vente. Pour aller plus loin sur la démarche de structuration des équipes de vente, consulter les travaux de <a href="https://hbr.org/2012/07/sales-management-that-works" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">Harvard Business Review sur le management des forces de vente</a>.
          </p>

          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            FAQ playbook commercial
          </h2>
          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                Un playbook commercial, c'est quoi concrètement ?
              </h3>
              <p className="mb-0">
                C'est un guide de terrain qui documente les meilleures pratiques commerciales : ICP, processus de vente, scripts, objections, questions de découverte, arguments concurrentiels. Il se lit en situation, pas en théorie.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                Combien de temps faut-il pour créer un playbook qui serve vraiment ?
              </h3>
              <p className="mb-0">
                Deux semaines pour une V1 utilisable. L'essentiel est de commencer par les situations terrain qui coûtent le plus cher, pas de vouloir tout documenter du premier coup.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                Comment faire en sorte que l'équipe utilise le playbook ?
              </h3>
              <p className="mb-0">
                Trois conditions : 1) il est construit avec l'équipe, pas par un consultant isolé 2) il est accessible en 3 clics depuis le terrain 3) il est référencé en réunion et mis à jour trimestriellement avec l'équipe.
              </p>
            </div>
          </div>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/methodes-vente-comparees-spin-bant-bebedc" className="text-mint-green hover:underline font-medium">
                  Méthodes de vente comparées : SPIN, BANT, BEBEDC
                </Link>
                <span className="text-gray-500"> — Pour choisir la méthode qui structurera votre playbook.</span>
              </li>
              <li>
                <Link href="/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite" className="text-mint-green hover:underline font-medium">
                  Gestion des objections commerciales
                </Link>
                <span className="text-gray-500"> — La section la plus consultée de tout playbook, en détail.</span>
              </li>
              <li>
                <Link href="/blog/plan-prospection-commerciale-machine-leads-annee" className="text-mint-green hover:underline font-medium">
                  Plan de prospection commerciale
                </Link>
                <span className="text-gray-500"> — Pour intégrer la prospection dans votre playbook.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h2 className="text-2xl font-title font-bold mb-4">
              Vous sentez que votre équipe commerciale manque de méthode commune ?
            </h2>
            <p className="mb-6">
              Un accompagnement terrain permet de construire un playbook qui part du réel de votre équipe, pas d'un template générique. Je travaille avec vos commerciaux sur les situations qui font la différence : qualification, objections, découverte, closing.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
              Faire un diagnostic commercial →
            </Link>
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
