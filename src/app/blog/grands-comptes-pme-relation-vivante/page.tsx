import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const carouselPrefix = '/images/blog/grands-comptes-pme-relation-vivante/carrousel';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01.webp`, alt: 'Un dirigeant de PME dans son bureau, regardant avec satisfaction le logo d\'un grand client affiché au mur', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02.webp`, alt: 'Le commercial sur le terrain, souriant au téléphone avec le grand compte, relation bien huilée', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03.webp`, alt: 'Le dirigeant concentre son attention sur de nouveaux prospects, le grand compte est en arrière-plan', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04.webp`, alt: 'Les échanges avec le grand compte deviennent purement opérationnels : livraison, délai, problème', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05.webp`, alt: 'Un nouveau décideur arrive chez le client, personne ne le connaît dans la PME', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06.webp`, alt: 'Un concurrent est reçu dans les bureaux du client, discret mais bien installé', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07.webp`, alt: 'Le dirigeant de PME réalise que la relation s\'est fragilisée sans qu\'il ait rien vu venir', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08.webp`, alt: 'Le dirigeant pointe un tableau : présence ne veut pas dire sécurité', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09.webp`, alt: 'Cartographie des contacts du grand compte : décideur, utilisateur, sponsor, bloqueur potentiel', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10.webp`, alt: 'Mise en place d\'un rythme de suivi : point opérationnel, échange stratégique, moment de recul', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11.webp`, alt: 'Le dirigeant apporte une idée utile au client sans attendre le renouvellement, regard surpris du client', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12.webp`, alt: 'La relation redevient vivante : plusieurs interlocuteurs connectés des deux côtés', index: 11 },
  { src: `${carouselPrefix}/bd-slide-13.webp`, alt: 'Laurent face caméra : si la décision se reprenait demain, seriez-vous encore évidents ?', index: 12 },
];

export const metadata: Metadata = {
  title: 'Gestion grands comptes PME : la présence ne suffit pas | Laurent Serre',
  description:
    "Un grand compte n'est jamais acquis. Le piège des PME : confondre présence et sécurité. Apprenez à piloter vos clients stratégiques avec une lecture vivante de la relation.",
  keywords:
    'gestion grands comptes PME, relation client stratégique, fidélisation grand compte B2B, pilotage compte clé, perte client B2B',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/grands-comptes-pme-relation-vivante',
  },
  openGraph: {
    title: 'Gestion grands comptes PME : la présence ne suffit pas',
    description:
      "Un grand compte n'est jamais acquis. Le piège des PME : confondre présence et sécurité. Apprenez à piloter vos clients stratégiques avec une lecture vivante de la relation.",
    url: 'https://www.laurentserre.com/blog/grands-comptes-pme-relation-vivante',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/grands-comptes-pme-relation-vivante/hero.webp',
        width: 1536,
        height: 1024,
        alt: 'Un dirigeant de PME face à ses relations clients stratégiques, entre sécurité apparente et vigilance nécessaire',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gestion grands comptes PME : la présence ne suffit pas',
    description:
      "Un grand compte n'est jamais acquis. Confondre présence et sécurité est le piège classique des PME.",
    images: ['https://www.laurentserre.com/images/blog/grands-comptes-pme-relation-vivante/hero.webp'],
  },
};

export default function GrandsComptesPMERelationVivantePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Gestion grands comptes PME : la présence ne suffit pas',
        description:
          "Un grand compte n'est jamais acquis. Le piège des PME : confondre présence et sécurité. Apprenez à piloter vos clients stratégiques avec une lecture vivante de la relation.",
        image:
          'https://www.laurentserre.com/images/blog/grands-comptes-pme-relation-vivante/hero.webp',
        datePublished: '2026-07-07',
        dateModified: '2026-07-07',
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
          '@type': 'Person',
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com',
        },
        mainEntityOfPage: {
          '@id': 'https://www.laurentserre.com/blog/grands-comptes-pme-relation-vivante',
        },
        articleSection: 'Vente complexe / Grands comptes',
        keywords: [
          'gestion grands comptes PME',
          'relation client stratégique',
          'fidélisation grand compte B2B',
          'pilotage compte clé',
          'perte client B2B',
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.laurentserre.com/blog/grands-comptes-pme-relation-vivante',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/grands-comptes-pme-relation-vivante#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Pourquoi une PME peut-elle perdre un grand compte alors qu\'elle pensait être bien installée ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Parce que la présence ne veut pas dire sécurité. Un grand compte devient fragile quand la relation n\'est plus travaillée : elle descend au niveau opérationnel, personne ne surveille les changements internes chez le client (nouveau décideur, priorité qui change, concurrent qui s\'infiltre). Le jour où la PME s\'en aperçoit, la décision est parfois déjà prise ailleurs.",
            },
          },
          {
            '@type': 'Question',
            name: 'Qu\'est-ce qu\'une lecture vivante de la relation avec un grand compte ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "C\'est savoir en permanence qui porte le sujet côté client, qui utilise la solution, qui décide du budget, qui pourrait bloquer. C\'est entretenir plusieurs points de contact à différents niveaux de l\'organisation cliente, pas un seul lien opérationnel. C\'est repérer les signaux faibles avant qu\'ils deviennent un problème.",
            },
          },
          {
            '@type': 'Question',
            name: 'Quel rythme de suivi pour un grand compte en PME ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Un grand compte a besoin d\'un rythme clair, pas forcément lourd : des points opérationnels pour traiter ce qui coince, des échanges plus hauts pour comprendre les priorités qui arrivent, et des moments de recul pour évaluer ce qui a changé grâce à la collaboration. Sans ce rythme, la relation se réduit à l\'exécution et devient interchangeable.",
            },
          },
          {
            '@type': 'Question',
            name: 'Comment développer un grand compte sans avoir l\'air de vouloir vendre plus ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Le développement d\'un grand compte vient rarement d\'un coup commercial brillant. Il vient d\'une attention régulière : repérer un enjeu avant qu\'il ne soit formulé, faire parler plusieurs interlocuteurs, comprendre ce qui change dans l\'organisation, apporter une idée utile sans attendre le renouvellement. C\'est ce qui transforme un fournisseur installé en partenaire difficile à remplacer.",
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Gestion grands comptes PME',
            item: 'https://www.laurentserre.com/blog/grands-comptes-pme-relation-vivante',
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
              <li className="text-blue-ink font-medium" aria-current="page">Gestion grands comptes PME</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Vente complexe / Grands comptes
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Gestion grands comptes PME : la présence ne suffit pas
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
              <time dateTime="2026-07-07">7 juillet 2026</time>
              <span>•</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/grands-comptes-pme-relation-vivante/hero.webp"
              alt="Un dirigeant de PME face à ses relations clients stratégiques, entre sécurité apparente et vigilance nécessaire"
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
              Un grand compte n\'est jamais acquis. Confondre présence et sécurité est le piège
              classique des PME. La solution : garder une lecture vivante de la relation, à plusieurs
              niveaux, dans la durée.
            </p>
          </div>

          {/* 🎬 Carrousel BD */}
          <div className="bg-gradient-to-br from-blue-ink/5 to-mint-green/10 border border-blue-ink/10 rounded-2xl p-6 mt-10 mb-8">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Quand le grand compte devient une habitude
            </p>
            <p className="text-sm text-gray-600 mb-5">
              Un dirigeant de PME pensait être solidement installé chez son plus gros client. Les commandes arrivaient, les équipes se parlaient. Jusqu\'au jour où le sol s\'est dérobé. Suivez ce qui se passe quand la présence remplace la vigilance, en 13 planches.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Quand le grand compte devient une habitude"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href={`${carouselPrefix}/carrousel-039-grands-comptes-pme.pdf`}
                className="inline-flex items-center gap-2 text-blue-ink text-xs hover:text-mint-green transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (13 planches)
              </Link>
            </div>
          </div>

          {/* CTA soft après carrousel */}
          <div className="bg-mint-green/5 border border-mint-green/20 rounded-2xl p-5 my-8 text-center">
            <p className="text-gray-700 font-medium">
              Vous avez un grand compte qui s\'est mis en pilote automatique ?{' '}
              <Link href="/diagnostic" className="text-mint-green hover:text-mint-green/80 font-semibold underline underline-offset-2">
                Découvrez par où reprendre la main →
              </Link>
            </p>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#habitude" className="text-mint-green hover:underline">Le grand compte devient une habitude</a></li>
              <li><a href="#piege" className="text-mint-green hover:underline">Le piège : confondre présence et sécurité</a></li>
              <li><a href="#lecture-vivante" className="text-mint-green hover:underline">Garder une lecture vivante de la relation</a></li>
              <li><a href="#rythme" className="text-mint-green hover:underline">Un grand compte a besoin d\'un rythme</a></li>
              <li><a href="#developpement" className="text-mint-green hover:underline">Le développement vient de l\'attention</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">Questions fréquentes</a></li>
            </ul>
          </div>

          {/* ──────────────── Habitude ──────────────── */}
          <h2 id="habitude" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le grand compte devient une habitude
          </h2>

          <p className="mb-4">
            Un grand compte finit par devenir une habitude.
          </p>

          <p className="mb-4">
            On le connaît depuis longtemps. Il commande régulièrement. Les équipes se parlent. Il y a eu des hauts, des bas, mais globalement la relation tient.
          </p>

          <p className="mb-4">
            Alors on le surveille moins.
          </p>

          <p className="mb-4">
            Le commercial passe plus de temps à chercher de nouveaux dossiers. Le dirigeant intervient seulement quand il y a un sujet sensible. Les points avec le client deviennent plus opérationnels. On parle livraison, délai, problème en cours, prochaine commande.
          </p>

          <p className="mb-8">
            Et petit à petit, la relation descend d\'un étage.
          </p>

          <p className="mb-4">
            Elle existe toujours. Mais elle n\'est plus vraiment travaillée.
          </p>

          <p className="mb-8">
            C\'est souvent là qu\'un grand compte devient fragile.
          </p>

          <p className="mb-4">
            Pas parce qu\'il est mécontent de façon spectaculaire. Pas parce qu\'il menace de partir. Pas parce qu\'un concurrent a déjà gagné.
          </p>

          <p className="mb-8">
            Mais parce que personne ne sait vraiment ce qui bouge chez lui.
          </p>

          <p className="mb-8">
            Un nouveau décideur arrive. Une priorité change. Un autre service cherche une solution proche. Un concurrent commence à discuter avec une filiale. Un sponsor interne perd de l\'influence. Le client continue de travailler avec vous, mais la relation n\'est plus aussi solide qu\'elle en a l\'air.
          </p>

          {/* ──────────────── Le piège ──────────────── */}
          <h2 id="piege" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le piège : confondre présence et sécurité
          </h2>

          <p className="mb-4">
            Le danger, avec les grands comptes, c\'est de confondre présence et sécurité.
          </p>

          <ul className="mb-8 space-y-2 text-sm text-gray-700">
            <li>Voir un client souvent ne veut pas dire le comprendre encore.</li>
            <li>Recevoir des commandes ne veut pas dire être stratégique.</li>
            <li>Avoir un bon contact ne veut pas dire avoir plusieurs appuis dans l\'organisation.</li>
          </ul>

          <p className="mb-4">
            Une PME peut perdre un grand compte alors qu\'elle pensait être très bien installée. Le jour où elle s\'en aperçoit, la décision est parfois déjà prise ailleurs.
          </p>

          {/* CTA medium mid-article */}
          <div className="bg-blue-ink/5 border border-blue-ink/15 rounded-2xl p-6 my-10 text-center">
            <p className="text-gray-700 mb-4">
              <strong className="text-blue-ink">Pilotez vos comptes stratégiques avec la même rigueur que vos prospects.</strong>
              {' '}
              Un diagnostic commercial identifie les signaux faibles avant qu\'ils ne deviennent une perte sèche.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-ink hover:bg-blue-ink/90 transition-colors"
            >
              Demander un diagnostic commercial
            </Link>
          </div>

          {/* ──────────────── Lecture vivante ──────────────── */}
          <h2 id="lecture-vivante" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Garder une lecture vivante de la relation
          </h2>

          <p className="mb-4">
            Gérer un grand compte, ce n\'est pas le harceler ni chercher à vendre plus à chaque échange.
          </p>

          <p className="mb-8">
            C\'est garder une lecture vivante de la relation.
          </p>

          <p className="mb-4">
            Qui porte vraiment le sujet côté client ? Qui utilise votre solution au quotidien ? Qui décide du budget ? Qui pourrait bloquer demain ? Quels problèmes nouveaux apparaissent dans l\'entreprise ? Où votre valeur est-elle visible ? Où est-elle devenue invisible parce qu\'elle fait partie du décor ?
          </p>

          <p className="mb-4">
            Ces questions ne sont pas administratives.
          </p>

          <p className="mb-8">
            Elles évitent de piloter un compte important avec une vieille photo.
          </p>

          {/* ──────────────── Rythme ──────────────── */}
          <h2 id="rythme" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Un grand compte a besoin d\'un rythme
          </h2>

          <p className="mb-4">
            Un grand compte a besoin d\'un rythme. Pas forcément lourd. Mais clair.
          </p>

          <ul className="mb-8 space-y-2 text-sm text-gray-700">
            <li>Des points opérationnels pour traiter ce qui coince.</li>
            <li>Des échanges plus hauts pour comprendre les priorités qui arrivent.</li>
            <li>Des moments de recul pour regarder ce qui a vraiment changé grâce à la collaboration, ce qui reste fragile, et ce qui pourrait être construit ensuite.</li>
          </ul>

          <p className="mb-4">
            Si tous les échanges restent au niveau des urgences, la relation se réduit à l\'exécution.
          </p>

          <p className="mb-8">
            Et quand une relation se réduit à l\'exécution, elle devient comparable.
          </p>

          <p className="mb-4">
            C\'est là que le prix revient. Que le concurrent revient. Que l\'appel d\'offres revient. Que le client commence à se demander s\'il ne pourrait pas obtenir la même chose ailleurs.
          </p>

          {/* ──────────────── Développement ──────────────── */}
          <h2 id="developpement" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le développement vient de l\'attention, pas du coup commercial
          </h2>

          <p className="mb-4">
            Le développement d\'un grand compte vient rarement d\'un coup commercial brillant.
          </p>

          <p className="mb-8">
            Il vient plutôt d\'une attention régulière : repérer un enjeu avant qu\'il ne soit formulé, faire parler plusieurs interlocuteurs, comprendre ce qui change dans l\'organisation, apporter une idée utile sans attendre le renouvellement.
          </p>

          <p className="mb-4">
            Ce n\'est pas spectaculaire.
          </p>

          <p className="mb-8">
            Mais c\'est souvent ce qui transforme un fournisseur installé en partenaire difficile à remplacer.
          </p>

          <p className="mb-8">
            Pour une PME, quelques grands comptes peuvent porter une part importante de l\'activité. Les traiter comme des clients « acquis » est donc risqué.
          </p>

          <p className="mb-4">
            Un grand compte n\'est jamais acquis.
          </p>

          <p className="mb-4">
            Il est entretenu, compris, challengé, protégé.
          </p>

          <p className="mb-8">
            Et surtout, il doit rester vivant dans le système commercial. Pas seulement dans la tête d\'un commercial historique ou dans trois habitudes de fonctionnement.
          </p>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            La vraie question n\'est pas : « Est-ce que ce client nous aime bien ? »
            <br /><br />
            La vraie question est : « Si la décision se reprenait demain, serions-nous encore évidents ? »
          </p>

          {/* ──────────────── CTA final ──────────────── */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vos grands comptes méritent-ils une vraie stratégie de pilotage ?
            </h3>
            <p className="mb-6">
              Un diagnostic commercial identifie les signaux faibles dans votre portefeuille de comptes
              stratégiques : relations fragiles, contacts uniques, valeur devenue invisible. Pas de
              méthode plaquée : un regard terrain sur ce qui se passe vraiment chez vos clients clés.
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

          {/* ──────────────── FAQ ──────────────── */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Questions fréquentes
          </h2>

          <div className="space-y-6 mt-6 mb-10">
            <div>
              <p className="font-bold text-blue-ink mb-1">
                Pourquoi une PME peut-elle perdre un grand compte alors qu\'elle pensait être bien installée ?
              </p>
              <p className="text-gray-700">
                Parce que la présence ne veut pas dire sécurité. Un grand compte devient fragile quand
                la relation n\'est plus travaillée : elle descend au niveau opérationnel, personne ne
                surveille les changements internes chez le client (nouveau décideur, priorité qui change,
                concurrent qui s\'infiltre). Le jour où la PME s\'en aperçoit, la décision est parfois
                déjà prise ailleurs.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Qu\'est-ce qu\'une lecture vivante de la relation avec un grand compte ?
              </p>
              <p className="text-gray-700">
                C\'est savoir en permanence qui porte le sujet côté client, qui utilise la solution,
                qui décide du budget, qui pourrait bloquer. C\'est entretenir plusieurs points de
                contact à différents niveaux de l\'organisation cliente, pas un seul lien
                opérationnel. C\'est repérer les signaux faibles avant qu\'ils ne deviennent un problème.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Quel rythme de suivi pour un grand compte en PME ?
              </p>
              <p className="text-gray-700">
                Un grand compte a besoin d\'un rythme clair, pas forcément lourd : des points
                opérationnels pour traiter ce qui coince, des échanges plus hauts pour comprendre les
                priorités qui arrivent, et des moments de recul pour évaluer ce qui a changé grâce à
                la collaboration. Sans ce rythme, la relation se réduit à l\'exécution et devient
                interchangeable.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Comment développer un grand compte sans avoir l\'air de vouloir vendre plus ?
              </p>
              <p className="text-gray-700">
                Le développement d\'un grand compte vient rarement d\'un coup commercial brillant. Il
                vient d\'une attention régulière : repérer un enjeu avant qu\'il ne soit formulé, faire
                parler plusieurs interlocuteurs, comprendre ce qui change dans l\'organisation, apporter
                une idée utile sans attendre le renouvellement. C\'est ce qui transforme un fournisseur
                installé en partenaire difficile à remplacer.
              </p>
            </div>
          </div>

          {/* ──────────────── Pour aller plus loin ──────────────── */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link
                  href="/blog/comptes-strategiques-dormants-relance-dirigeant"
                  className="text-mint-green hover:underline font-medium"
                >
                  Comptes stratégiques dormants : relance dirigeant
                </Link>
                <span className="text-gray-500">
                  {' '}: Vos comptes endormis sont les premiers candidats à une remise en relation structurée.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/signaux-faibles-churn-b2b-pme"
                  className="text-mint-green hover:underline font-medium"
                >
                  Signaux faibles churn B2B PME
                </Link>
                <span className="text-gray-500">
                  {' '}: Les signaux avant-coureurs d\'un départ de grand compte sont visibles bien avant la rupture.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/account-based-marketing-pme-comptes-strategiques"
                  className="text-mint-green hover:underline font-medium"
                >
                  Account-Based Marketing PME : 3 comptes avant 50
                </Link>
                <span className="text-gray-500">
                  {' '}: L\'ABM pour PME, c\'est traiter quelques comptes stratégiques autrement. Complément naturel de la gestion de grands comptes.
                </span>
              </li>
            </ul>
          </div>
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
            Besoin d\'en parler plus directement ?
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
