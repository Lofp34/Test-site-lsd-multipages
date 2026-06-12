import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/erreurs-developpement-commercial-pme';
const heroImage = '/images/blog/2026-06-07-erreurs-developpement-commercial-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/2026-06-07-erreurs-developpement-commercial-hero.webp';
const carouselPrefix = '/images/blog/carrousel-erreurs-developpement-commercial';

export const metadata: Metadata = {
  title: 'Développement commercial PME : les 6 erreurs qui coûtent cher (et comment les éviter) | Laurent Serre',
  description:
    'Recrutement d\'un commercial star, CRM avant le processus, dispersion sur tous les canaux : les 6 erreurs terrain qui sabotent le développement commercial des PME et les corrections immédiates.',
  keywords:
    'développement commercial PME, erreurs développement commercial PME, pièges développement commercial PME, développement commercial PME échec, développer activité PME, coach développement commercial, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-07',
  },
  openGraph: {
    title: 'Développement commercial PME : les 6 erreurs qui coûtent cher (et comment les éviter)',
    description:
      'Recrutement d\'un commercial star, dispersion multicanal, CRM sans processus : les 6 pièges qui sabotent votre développement commercial et les correctifs immédiats.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: 'Développement commercial PME - les 6 erreurs qui coûtent cher - guide terrain',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Développement commercial PME : les 6 erreurs qui coûtent cher | Laurent Serre',
    description:
      'Les 6 erreurs terrain qui sabotent le développement commercial des PME et comment les corriger immédiatement.',
    images: [heroImageAbsolute],
  },
};

export default function ErreursDeveloppementCommercialPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: 'Développement commercial PME : les 6 erreurs qui coûtent cher (et comment les éviter)',
        description:
          'Les 6 erreurs terrain qui sabotent le développement commercial des PME et les corrections immédiates pour en sortir.',
        image: heroImageAbsolute,
        datePublished: '2026-06-07',
        dateModified: '2026-06-07',
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
        '@type': 'FAQPage',
        '@id': articleUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre développement commercial et prospection ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le développement commercial est un système structuré qui agit sur le ciblage, les processus, les compétences de l\'équipe et les outils de pilotage pour accroître durablement le chiffre d\'affaires. La prospection n\'en est qu\'un levier, pas l\'ensemble. Confondre les deux est l\'erreur n°1 des dirigeants de PME. Une équipe qui prospecte sans cadre stratégique s\'épuise sur des cibles non qualifiées et signe des petits deals non rentables.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelles sont les erreurs de développement commercial les plus fréquentes en PME ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les 6 erreurs les plus fréquentes sont : 1) confondre développement commercial et prospection intensive, 2) recruter un commercial star comme sauveur, 3) se disperser sur tous les canaux en même temps, 4) investir dans un CRM avant d\'avoir un processus, 5) piloter au chiffre d\'affaires au lieu de piloter les leviers, 6) former en salle sans coacher sur le terrain.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment structurer le développement commercial d\'une PME ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pour structurer son développement commercial, une PME doit : définir son processus de vente sur papier (étapes, critères de passage), choisir un canal unique pendant 90 jours, mettre en place une revue hebdomadaire de pipeline de 30 minutes, et prévoir un coaching terrain systématique après chaque formation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi le développement commercial des PME échoue-t-il ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le développement commercial des PME échoue pour six raisons récurrentes : absence de processus structuré, recrutement de profils stars sans intégration, dispersion multicanal, outillage sans méthode, pilotage au rétroviseur (CA au lieu des leviers), et formations sans application terrain. La clé est d\'identifier l\'erreur la plus urgente et de la corriger pendant 30 jours avant de passer à la suivante.',
            },
          },
        ],
      },
    
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Développement commercial PME', 'item': 'https://www.laurentserre.com/blog/erreurs-developpement-commercial-pme' },
        ],
      }
],
  };

  const carouselImages = [
    { src: `${carouselPrefix}/01-couverture.webp`, alt: 'Couverture - Developpement commercial PME les 6 erreurs qui coutent cher', index: 0 },
    { src: `${carouselPrefix}/02-erreur-1-prospecter-sans-ciblage.webp`, alt: 'Erreur 1 - Prospecter sans ciblage', index: 1 },
    { src: `${carouselPrefix}/03-erreur-1-prise-de-conscience.webp`, alt: 'Erreur 1 - La prise de conscience', index: 2 },
    { src: `${carouselPrefix}/04-erreur-2-le-commercial-star.webp`, alt: 'Erreur 2 - Le recrutement du commercial star', index: 3 },
    { src: `${carouselPrefix}/05-erreur-2-prise-de-conscience.webp`, alt: 'Erreur 2 - La prise de conscience', index: 4 },
    { src: `${carouselPrefix}/06-erreur-3-la-dispersion.webp`, alt: 'Erreur 3 - La dispersion multicanal', index: 5 },
    { src: `${carouselPrefix}/07-erreur-3-prise-de-conscience.webp`, alt: 'Erreur 3 - La prise de conscience', index: 6 },
    { src: `${carouselPrefix}/08-erreur-4-crm-sans-processus.webp`, alt: 'Erreur 4 - CRM sans processus', index: 7 },
    { src: `${carouselPrefix}/09-erreur-4-prise-de-conscience.webp`, alt: 'Erreur 4 - La prise de conscience', index: 8 },
    { src: `${carouselPrefix}/10-erreur-5-piloter-au-ca.webp`, alt: 'Erreur 5 - Piloter au CA au lieu des leviers', index: 9 },
    { src: `${carouselPrefix}/11-erreur-5-prise-de-conscience.webp`, alt: 'Erreur 5 - La prise de conscience', index: 10 },
    { src: `${carouselPrefix}/12-erreur-6-formation-sans-coaching.webp`, alt: 'Erreur 6 - Formation sans coaching terrain', index: 11 },
    { src: `${carouselPrefix}/13-erreur-6-prise-de-conscience.webp`, alt: 'Erreur 6 - La prise de conscience', index: 12 },
    { src: `${carouselPrefix}/14-cta-ce-qui-a-change.webp`, alt: 'CTA - Ce qui a change', index: 13 },
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
          <span className="text-gray-700">Développement commercial PME : les 6 erreurs qui coûtent cher</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          Développement commercial PME : les 6 erreurs qui coûtent cher (et comment les éviter)
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span>7 juin 2026</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full" />
          <span>~10 min de lecture</span>
        </div>

        {/* AuthorCard */}
        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial  :  15 ans de terrain PME',
            image: '/images/blog/Laurent-Serre-avatar.jpg',
          }}
        />

        {/* Hero Image */}
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-10 shadow-lg">
          <Image
            src={heroImage}
            alt="Développement commercial PME - les 6 erreurs qui coûtent cher"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {/* Article body */}
        <div className="prose prose-gray max-w-none">
          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2"> Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Le développement commercial d&apos;une PME, c&apos;est l&apos;ensemble des actions structurées qui visent à accroître durablement le chiffre d&apos;affaires en agissant sur le ciblage, les processus, les compétences de l&apos;équipe et les outils de pilotage. Mais beaucoup de dirigeants le sabotent sans le savoir. Voici les 6 erreurs les plus fréquentes, leur coût réel, et la correction immédiate pour chacune. Pas de théorie. Du terrain.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD  :  Les 6 erreurs du développement commercial PME
            </p>
            <p className="text-sm text-amber-700 mb-5">
              8 planches illustrées  :  cliquez sur une vignette pour feuilleter la BD dans le lecteur intégré.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD  :  Les 6 erreurs du développement commercial PME"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/images/blog/carrousel-erreurs-developpement-commercial/carrousel-erreurs-developpement-commercial-pme.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (14 planches)
              </Link>
            </div>
          </div>

          {/* CTA rapide après carrousel */}
          <div className="bg-mint-green/5 border border-mint-green/20 rounded-2xl p-5 my-10 text-center">
            <p className="text-gray-700 font-medium">
              Vous vous reconnaissez dans une de ces erreurs ?{' '}
              <Link href="/diagnostic" className="text-mint-green hover:text-mint-green/80 font-semibold underline underline-offset-2">
                Découvrez par quelle erreur commencer →
              </Link>
            </p>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#intro" className="text-mint-green hover:underline">Avant de lister les erreurs, une mise au point</a></li>
              <li><a href="#erreur1" className="text-mint-green hover:underline">Erreur 1  :  Confondre développement commercial et prospection</a></li>
              <li><a href="#erreur2" className="text-mint-green hover:underline">Erreur 2  :  Recruter un commercial star comme sauveur</a></li>
              <li><a href="#erreur3" className="text-mint-green hover:underline">Erreur 3  :  Se disperser sur tous les canaux en même temps</a></li>
              <li><a href="#erreur4" className="text-mint-green hover:underline">Erreur 4  :  Investir dans un CRM avant d&apos;avoir un processus</a></li>
              <li><a href="#erreur5" className="text-mint-green hover:underline">Erreur 5  :  Piloter au chiffre d&apos;affaires au lieu de piloter les leviers</a></li>
              <li><a href="#erreur6" className="text-mint-green hover:underline">Erreur 6  :  Former en salle sans coacher sur le terrain</a></li>
              <li><a href="#conclusion" className="text-mint-green hover:underline">Le vrai coût de ne rien changer</a></li>
            </ul>
          </div>

          {/* ════════ INTRODUCTION ════════ */}
          <h2 id="intro" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Avant de lister les erreurs, une mise au point
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            <strong>Le développement commercial d&apos;une PME, c&apos;est l&apos;ensemble des actions structurées qui visent à accroître durablement le chiffre d&apos;affaires d&apos;une entreprise de taille moyenne ou petite, en agissant sur son ciblage, son processus de vente, les compétences de son équipe et ses outils de pilotage.</strong> Ce n&apos;est ni un coup de boost ponctuel, ni une campagne de prospection musclée. C&apos;est un système.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Je vois des dirigeants commettre les mêmes erreurs depuis quinze ans. Pas par incompétence. Par manque de recul, par urgence, par mimétisme avec ce qui se dit sur LinkedIn ou dans les conférences. Chaque erreur a un coût. Pas seulement le temps perdu et l&apos;argent brûlé. Mais souvent la perte d&apos;un commercial qu&apos;on aurait pu garder, ou d&apos;un marché qu&apos;on aurait pu prendre.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Voici les six erreurs que je vois le plus souvent. Avec pour chacune le signal d&apos;alerte, le coût réel, et la correction immédiate.
          </p>

          {/* ════════ ERREUR 1 ════════ */}
          <h2 id="erreur1" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 1  :  Confondre développement commercial et prospection intensive
          </h2>

          <p className="mb-4 font-semibold text-gray-700">Signal d&apos;alerte</p>
          <p className="mb-6">
            Vous entendez des phrases comme « il faut qu&apos;on sorte et qu&apos;on aille chercher des clients », « le problème c&apos;est qu&apos;on ne prospecte pas assez », « si on doublait le nombre d&apos;appels, on doublerait le chiffre ». Vous recrutez des commerciaux sur leur capacité à enchaîner les rendez-vous, sans leur donner de cadre stratégique.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Coût réel</p>
          <p className="mb-6">
            Une équipe qui court sans carte. Les commerciaux s&apos;épuisent à prospecter large plutôt que bien. Ils signent des petits deals qui ne rapportent pas assez pour couvrir leur salaire. Et au bout de six mois, ils partent en disant que « le produit ne se vend pas », alors que le problème était l&apos;absence de ciblage et de processus.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Correction immédiate</p>
          <p className="mb-6">
            Arrêtez de mesurer le nombre d&apos;appels ou de mails. Mesurez la qualité des opportunités entrantes dans le pipeline. Pendant 30 jours, chaque nouveau contact doit passer un filtre : secteur défini, taille d&apos;entreprise cible, décideur identifié, besoin exprimé. Si le prospect ne coche pas trois cases sur quatre, ce n&apos;est pas une piste à creuser. C&apos;est une distraction.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-amber-800 mb-2">Le test du prospect valable</p>
            <p className="text-amber-700">Prenez les 5 derniers deals signés. Combien d&apos;entre eux viennent d&apos;un prospect qui correspondait à votre cible idéale au moment du premier contact ? Si la réponse est « 2 ou 3 », votre prospection n&apos;est pas assez cadrée. Si c&apos;est « 1 ou 0 », vous n&apos;avez pas de prospection, vous avez du hasard.</p>
          </div>

          {/* ════════ ERREUR 2 ════════ */}
          <h2 id="erreur2" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 2  :  Recruter un commercial star en pensant qu&apos;il va tout sauver
          </h2>

          <p className="mb-4 font-semibold text-gray-700">Signal d&apos;alerte</p>
          <p className="mb-6">
            Vous lisez des profils LinkedIn qui claquent : « top performer », « 200% du quota », « X années d&apos;expérience dans le secteur ». Vous les recrutez avec un package motivant. Et vous attendez.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Coût réel</p>
          <p className="mb-6">
            Six à douze mois de salaire + prime + commission avant de réaliser que le profil ne s&apos;intègre pas. Parce que vous n&apos;avez pas de processus d&apos;intégration. Parce que votre équipe existante n&apos;a pas les mêmes méthodes. Parce que le star system crée des tensions, pas de la performance collective. J&apos;ai vu un dirigeant embaucher un « top performer » à 90K€ fixe + variable. Il est parti au bout de cinq mois. Il n&apos;avait signé qu&apos;un seul deal, sur un prospect que l&apos;équipe avait déjà qualifié avant son arrivée.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Correction immédiate</p>
          <p className="mb-6">
            Remplacez la fiche de poste « commercial confirmé » par un cadre d&apos;intégration en 90 jours. Jour 1 à 30 : apprendre le produit, le marché, le ciblage de l&apos;entreprise. Jour 31 à 60 : accompagner les commerciaux existants sur le terrain. Jour 61 à 90 : commencer à prospecter en autonomie, avec debrief hebdomadaire. Le commercial qui accepte ce cadre est probablement le bon profil. Celui qui le refuse ne voulait pas rejoindre une équipe. Il voulait un terrain de jeu individuel.
          </p>

          {/* ════════ ERREUR 3 ════════ */}
          <h2 id="erreur3" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 3  :  Se disperser sur tous les canaux en même temps
          </h2>

          <p className="mb-4 font-semibold text-gray-700">Signal d&apos;alerte</p>
          <p className="mb-6">
            Vous lancez LinkedIn en janvier, le phoning en février, les salons en mars, l&apos;emailing en avril, les partenariats en mai, et en juin vous ne savez toujours pas ce qui marche. Vous regardez le tableau de bord du CRM, vous voyez quinze sources de prospects différentes, toutes avec des taux de conversion médiocres.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Coût réel</p>
          <p className="mb-6">
            Aucun canal n&apos;atteint la masse critique pour devenir rentable. Chaque commercial improvise sa méthode. Certains jurent par LinkedIn, d&apos;autres par le téléphone. Vous ne pouvez pas comparer les résultats parce que les efforts ne sont pas calibrés de la même manière. Résultat : vous dépensez sur cinq canaux pour un résultat qu&apos;un seul canal bien maîtrisé aurait pu produire.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Correction immédiate</p>
          <p className="mb-6">
            Choisissez un canal unique pour les 90 prochains jours. Un seul. Celui qui a déjà montré le meilleur retour sur les six derniers mois. Mettez-y toute l&apos;énergie de l&apos;équipe. Définissez un volume d&apos;action quotidien, un script, un suivi. Quand vous atteignez 30 opportunités qualifiées par mois sur ce canal, là vous ouvrez le suivant. Pas avant.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-amber-800 mb-2">Règle des 90 jours</p>
            <p className="text-amber-700">Un seul canal, une seule priorité, un seul indicateur. Le développement commercial d&apos;une PME se construit en concentrant les forces, pas en les dispersant. La dispersion est un confort psychologique : elle donne l&apos;impression d&apos;avancer partout. En réalité, on n&apos;avance nulle part.</p>
          </div>

          {/* CTA mi-article après erreur 3 */}
          <div className="bg-gradient-to-r from-blue-ink/5 to-blue-ink/10 border border-blue-ink/15 rounded-2xl p-6 my-10">
            <p className="text-sm font-semibold text-blue-ink mb-2">💡 Vous en êtes déjà à 3 erreurs identifiées ?</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              C&apos;est le signe que votre développement commercial a besoin d&apos;une vraie remise à plat. Je propose un diagnostic gratuit de 45 minutes pour prioriser les actions qui auront le plus d&apos;impact sur votre équipe.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-mint-green text-white text-sm font-medium rounded-full hover:bg-mint-green/90 transition-colors"
            >
              Réserver mon diagnostic gratuit →
            </Link>
          </div>

          {/* ════════ ERREUR 4 ════════ */}
          <h2 id="erreur4" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 4  :  Investir dans un CRM avant d&apos;avoir un processus
          </h2>

          <p className="mb-4 font-semibold text-gray-700">Signal d&apos;alerte</p>
          <p className="mb-6">
            Vous cherchez « le bon outil » depuis trois mois. Vous avez testé cinq CRM en démo. Vous pensez que le problème de votre équipe commerciale, c&apos;est qu&apos;elle n&apos;a pas de logiciel pour suivre ses affaires. Alors que le vrai problème, c&apos;est qu&apos;elle n&apos;a pas de méthode pour les gagner.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Coût réel</p>
          <p className="mb-6">
            Le CRM devient un cimetière de données. Les commercaires le remplissent en début de mois pour faire plaisir au dirigeant, puis l&apos;abandonnent parce qu&apos;il ne les aide pas à vendre. Vous payez un abonnement annuel pour un tableau de bord qui ne reflète pas la réalité. Et vous continuez à piloter au feeling.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Correction immédiate</p>
          <p className="mb-6">
            Posez le processus sur papier d&apos;abord. Dessinez les étapes commerciales : premier contact, découverte, démo/proposition, devis, signature, suivi. Définissez pour chaque étape ce qui fait passer au suivant. Installez le rituel de revue hebdomadaire de 30 minutes. Quand ces trois choses tiennent depuis 30 jours, achetez l&apos;outil le plus simple qui suit ce processus. Pas un CRM sophistiqué. Un tableau partagé suffit souvent pour commencer.
          </p>

          <p className="mb-6">
            Pour aller plus loin sur la construction d&apos;un pipeline fiable, j&apos;ai dédié un article à ce sujet : <Link href="/blog/developpement-commercial-pme-plan-action-5-etapes" className="text-mint-green hover:underline font-medium">le plan d&apos;action en 5 étapes pour développer votre commercial</Link>.
          </p>

          {/* ════════ ERREUR 5 ════════ */}
          <h2 id="erreur5" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 5  :  Piloter au chiffre d&apos;affaires au lieu de piloter les leviers
          </h2>

          <p className="mb-4 font-semibold text-gray-700">Signal d&apos;alerte</p>
          <p className="mb-6">
            Votre réunion commerciale mensuelle commence toujours par la même phrase : « alors, quel est le CA du mois ? » On commente le chiffre. On compare au budget. On s&apos;inquiète ou on se félicite. Et on repart sans avoir rien décidé.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Coût réel</p>
          <p className="mb-6">
            Le chiffre d&apos;affaires est un indicateur retardé. Quand il est mauvais, il est déjà trop tard pour agir. Vous découvrez en fin de mois que le pipeline était vide depuis trois semaines, ou que trois deals importants ont été perdus sans que personne n&apos;ait rien fait pour les sauver. Piloter au CA, c&apos;est conduire en regardant le rétroviseur.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Correction immédiate</p>
          <p className="mb-6">
            Remplacez la réunion mensuelle par une revue hebdomadaire de 30 minutes. Trois questions : qu&apos;est-ce qui est entré dans le pipeline cette semaine, qu&apos;est-ce qui est sorti, qu&apos;est-ce qui bloque les deals importants ? Suivez trois indicateurs d&apos;avancement : le nombre de nouvelles opportunités qualifiées, le taux de transformation par étape, la vitesse du cycle. Le CA, vous le regarderez une fois par mois pour confirmer la tendance. Pas pour décider.
          </p>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-2">L&apos;exercice de la semaine</p>
            <p className="text-gray-700">Quelle est la réunion qui a le plus d&apos;impact sur votre CA cette semaine ? Si la réponse est « la réunion mensuelle de suivi budgétaire », votre pilotage est décalé. La réunion qui compte, c&apos;est celle où on regarde ce qui va se passer, pas ce qui s&apos;est passé.</p>
          </div>

          {/* ════════ ERREUR 6 ════════ */}
          <h2 id="erreur6" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 6  :  Former en salle sans coacher sur le terrain
          </h2>

          <p className="mb-4 font-semibold text-gray-700">Signal d&apos;alerte</p>
          <p className="mb-6">
            Vous avez budgété X jours de formation cette année. Vous envoyez vos commerciaux en stage, ils reviennent avec un classeur et des fiches pratiques. Quinze jours plus tard, tout est oublié. Vous vous dites que la prochaine formation sera la bonne.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Coût réel</p>
          <p className="mb-6">
            La formation descendante seule ne transforme aucun comportement. C&apos;est bien documenté, mais sur le terrain c&apos;est simple : un commercial peut apprendre une technique de closing en deux heures et l&apos;oublier en deux rendez-vous parce que personne n&apos;était là pour le coacher sur sa situation réelle. La formation coûte de l&apos;argent. Son absence de résultat coûte du chiffre d&apos;affaires.
          </p>

          <p className="mb-4 font-semibold text-gray-700">Correction immédiate</p>
          <p className="mb-6">
            Pour chaque jour de formation, prévoyez trois jours de coaching terrain dans les quatre semaines qui suivent. Le protocole est simple : accompagner un commercial sur un vrai rendez-vous, observer sans intervenir, debriefer en deux temps. On retient un seul point d&apos;amélioration par rendez-vous, et on le retravaille la semaine suivante. La formation pose les bases. Le coaching transforme les pratiques.
          </p>

          <p className="mb-6">
            J&apos;ai écrit un article dédié au <Link href="/blog/coaching-commercial-terrain-methode-equipe" className="text-mint-green hover:underline font-medium">coaching commercial terrain</Link> pour ceux qui veulent mettre en place cette méthode dans leur équipe.
          </p>

          {/* ════════ CONCLUSION ════════ */}
          <h2 id="conclusion" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Le vrai coût de ne rien changer
          </h2>

          <p className="mb-6">
            Chacune de ces six erreurs est banale. Les dirigeants que je rencontre les commettent tous, à un moment ou à un autre. La différence entre ceux qui finissent par sortir la tête de l&apos;eau et les autres, ce n&apos;est pas le budget, le secteur ou la taille de l&apos;équipe.
          </p>

          <p className="mb-6">
            C&apos;est le moment où ils décident de regarder le problème en face.
          </p>

          <p className="mb-6">
            Si vous vous reconnaissez dans une de ces six erreurs, ne cherchez pas à tout corriger en même temps. Prenez la correction la plus urgente pour votre situation aujourd&apos;hui. Appliquez-la pendant 30 jours. Mesurez ce qui change. Et passez à la suivante.
          </p>

          <p className="text-xl font-title font-semibold text-blue-ink my-8 text-center">
            Le développement commercial d&apos;une PME ne se joue pas sur un coup de génie. Il se joue sur une seule décision : arrêter de faire ce qui ne marche pas.
          </p>

          {/* ════════ CTA FINAL ════════ */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h2 className="text-2xl font-title font-bold mb-4">
              Vous voulez savoir par quelle erreur commencer pour votre équipe ?
            </h2>
            <p className="mb-6">
              Je propose un diagnostic commercial gratuit de 45 minutes. On regarde ensemble votre situation, on identifie l&apos;erreur prioritaire à corriger, et on construit un plan d&apos;action simple pour les 30 prochains jours. Pas de vente, pas de méthode générique. Du sur-mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors text-center"
              >
                🔍 Faire un diagnostic commercial gratuit →
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
