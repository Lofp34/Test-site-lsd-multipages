import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/prochain-million-portefeuille-clients-expansion';
const heroImage = '/images/blog/expansion-portefeuille-client/expansion-portefeuille-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/expansion-portefeuille-client/expansion-portefeuille-hero.webp';
const carouselPrefix = '/images/blog/expansion-portefeuille-client';

export const metadata: Metadata = {
  title: 'Votre prochain million est dans votre portefeuille clients | Laurent Serre',
  description:
    '5 leviers concrets pour developper votre chiffre d affaires sans prospecter un seul nouveau client. Exploitez le gisement de votre portefeuille existant. Retour d experience terrain.',
  keywords:
    'developper portefeuille client, expansion compte PME, upsell PME, cross-sell B2B, augmenter CA clients existants, comptes dormants, client existant, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-12',
  },
  openGraph: {
    title: 'Votre prochain million est dans votre portefeuille clients',
    description:
      '5 leviers concrets pour developper votre chiffre d affaires sans prospecter un seul nouveau client. Exploitez le gisement de votre portefeuille existant.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: 'Votre prochain million est dans votre portefeuille clients - illustration hero',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Votre prochain million est dans votre portefeuille clients | Laurent Serre',
    description:
      '5 leviers concrets pour developper votre chiffre d affaires sans prospecter un seul nouveau client.',
    images: [heroImageAbsolute],
  },
};

export default function ExpansionPortefeuillePage() {
  const carouselImages = [
    { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Couverture - Le prochain million dans votre portefeuille clients', index: 0 },
    { src: `${carouselPrefix}/bd-slide-02-frenesie.webp`, alt: 'La frenesie de prospection', index: 1 },
    { src: `${carouselPrefix}/bd-slide-03-question.webp`, alt: 'La question qui derange', index: 2 },
    { src: `${carouselPrefix}/bd-slide-04-revelation.webp`, alt: 'La revelation du potentiel client existant', index: 3 },
    { src: `${carouselPrefix}/bd-slide-05-peur.webp`, alt: 'La peur de deranger', index: 4 },
    { src: `${carouselPrefix}/bd-slide-06-observer.webp`, alt: 'Observer sans intervenir', index: 5 },
    { src: `${carouselPrefix}/bd-slide-07-levier1.webp`, alt: 'Levier 1 - Revitaliser les comptes dormants', index: 6 },
    { src: `${carouselPrefix}/bd-slide-08-surprise.webp`, alt: 'La surprise du dormant', index: 7 },
    { src: `${carouselPrefix}/bd-slide-09-levier2.webp`, alt: 'Levier 2 - Diagnostiquer avant de proposer', index: 8 },
    { src: `${carouselPrefix}/bd-slide-10-levier3.webp`, alt: 'Levier 3 - La recommandation naturelle', index: 9 },
    { src: `${carouselPrefix}/bd-slide-11-levier4.webp`, alt: 'Levier 4 - Le service complementaire simple', index: 10 },
    { src: `${carouselPrefix}/bd-slide-12-levier5.webp`, alt: 'Levier 5 - Le pilotage dedie', index: 11 },
    { src: `${carouselPrefix}/bd-slide-13-resultat.webp`, alt: 'Le resultat visible', index: 12 },
    { src: `${carouselPrefix}/bd-slide-14-cta.webp`, alt: 'CTA - Commencez par un diagnostic offert', index: 13 },
  ];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: 'Votre prochain million est dans votre portefeuille clients',
        description:
          '5 leviers concrets pour developper votre chiffre d affaires sans prospecter un seul nouveau client. Exploitez le gisement de votre portefeuille existant.',
        image: heroImageAbsolute,
        datePublished: '2026-06-12',
        dateModified: '2026-06-12',
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
            name: 'Comment developper son portefeuille client sans prospecter ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pour developper votre portefeuille client sans prospecter, activez 5 leviers concrets : 1) revitaliser les comptes dormants (clients sans contact depuis plus de 12 mois), 2) diagnostiquer avant de proposer en realisant des revues de compte sans intention de vente, 3) activer le reseau de recommandations naturelles, 4) proposer un service complementaire simple lie a ce que le client a deja achete, 5) mettre en place un rituel de pilotage dedie au portefeuille existant avec une revue mensuelle.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les leviers pour augmenter le CA des clients existants en PME ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les 5 leviers pour augmenter le chiffre d affaires des clients existants en PME sont : la revitalisation des comptes dormants par une simple prise de contact sans intention de vente, le diagnostic des nouveaux besoins par une revue de compte trimestrielle, l activation du reseau de recommandations naturelles, le cross-sell de services complementaires simples, et la mise en place d un pilotage mensuel dedie au portefeuille client.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi les PME n exploitent-elles pas leur portefeuille client existant ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les dirigeants de PME consacrent 80% de leur energie a chercher de nouveaux prospects car la prospection a un gout d aventure et de conquete. Pendant ce temps, 70% du CA potentiel est dans le portefeuille existant. Les raisons invoquees sont souvent le manque de temps, la peur de deranger le client, ou l absence de levier simple pour le recontacter. Mais en realite, le plus gros gisement commercial dort dans le fichier clients, et il suffit d une prise de contact reguliere pour le reveiller.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Votre prochain million est dans votre portefeuille clients', 'item': 'https://www.laurentserre.com/blog/prochain-million-portefeuille-clients-expansion' },
        ],
      },
    ],
  };

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
          <span className="text-gray-700">Votre prochain million est dans votre portefeuille clients</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          Votre prochain million est dans votre portefeuille clients
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span>12 juin 2026</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full" />
          <span>~7 min de lecture</span>
        </div>

        {/* AuthorCard */}
        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial : 15 ans de terrain PME',
            image: '/images/blog/Laurent-Serre-avatar.webp',
          }}
        />

        {/* Hero Image */}
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-10 shadow-lg">
          <Image
            src={heroImage}
            alt="Votre prochain million est dans votre portefeuille clients - illustration hero"
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
            <p className="text-sm font-semibold text-mint-green mb-2">TL;DR</p>
            <p className="text-gray-700 leading-relaxed">
              Les dirigeants de PME consacrent 80% de leur energie a chercher de nouveaux prospects. Pourtant, 70% du chiffre d&apos;affaires potentiel dort dans leur portefeuille existant. Voici 5 leviers concrets pour developper votre CA sans prospecter un seul nouveau client. Avec des resultats terrain.
            </p>
          </div>

<div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Le prochain million dans votre portefeuille clients
            </p>
            <p className="text-sm text-amber-700 mb-5">
              Découvrez l'histoire vraie d'un dirigeant de PME qui a arrêté de prospecter pour gagner son prochain million… en regardant dans son propre fichier clients.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Le prochain million dans votre portefeuille clients"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/images/blog/expansion-portefeuille-client/carrousel-expansion-portefeuille-client.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Telecharger le PDF (14 planches)
              </Link>
            </div>
          </div>

          {/* CTA SOFT apres carrousel */}
          <div className="text-center my-8">
            <Link href="/diagnostic" className="text-mint-green hover:text-mint-green/80 font-medium underline underline-offset-2">
              Découvrez par quel levier commencer selon votre profil client →
            </Link>
          </div>

          {/* ════════ LA SCENE ════════ */}
          <h2 id="scene" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            La scène qui m&apos;a fait changer de regard
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Je suis chez un client depuis trois heures. Il dirige une PME de 40 personnes, plutot bonne sante. Il me montre son plan d&apos;action commercial pour le semestre. Objectif : +25% de chiffre d&apos;affaires. Moyen : 200 nouveaux prospects par mois, LinkedIn, phoning, salon, mailing.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Je lui demande combien de clients actifs il a aujourd&apos;hui. Il sort son CRM. 87 comptes. Je les parcours avec lui : des clients qu&apos;il suit depuis cinq ans, des dossiers qui paient tous les mois, quelques grands comptes, et surtout une trentaine de clients historiques qu&apos;il n&apos;a pas contactes depuis plus d&apos;un an.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Je lui pose une question simple : et si tu arretais de chercher de nouveaux prospects pendant trois mois, et que tu passais ce temps a recontacter ceux qui te paient deja ?
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Il me regarde comme si je venais de lui proposer d&apos;arreter de respirer.
          </p>

          {/* ════════ LE PARADOXE ════════ */}
          <h2 id="paradoxe" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Le paradoxe du dirigeant de PME
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Ce que j&apos;ai vu chez ce client, je le vois partout. Les dirigeants de PME consacrent 80% de leur energie commerciale a chercher de nouveaux prospects. C&apos;est comprehensible : la prospection, ca a un gout d&apos;aventure, de conquete. C&apos;est gratifiant. On raconte des histoires de nouveaux clients gagnes, ca fait bien en reunion.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Pendant ce temps, 70% du chiffre d&apos;affaires potentiel est dans le portefeuille existant. Et personne ne le touche.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Ce n&apos;est pas de la mauvaise volonte. C&apos;est une habitude de pensee. On croit que le developpement commercial, c&apos;est aller chercher du nouveau. Alors que le plus gros gisement est deja dans la maison. Il dort. Il paie. Il attend qu&apos;on s&apos;occupe de lui.
          </p>

          {/* ════════ POURQUOI ════════ */}
          <h2 id="pourquoi" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Pourquoi les PME n&apos;exploitent pas leur portefeuille
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            J&apos;entends toujours les memes raisons : &laquo; on n&apos;a pas le temps &raquo;, &laquo; ils nous appellent s&apos;ils ont besoin &raquo;, &laquo; on ne veut pas les embeter &raquo;, &laquo; on ne sait pas quoi leur proposer de plus &raquo;.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Derriere ces phrases, il y a quelque chose de plus profond : une peur de deranger. Un reflexe d&apos;humilite mal place. Un dirigeant qui pense que son client, s&apos;il n&apos;appelle pas, c&apos;est qu&apos;il n&apos;a pas besoin de lui.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            C&apos;est faux. La plupart du temps, le client ne rappelle pas parce qu&apos;il n&apos;a pas de probleme urgent aujourd&apos;hui. Mais il en aura demain. Et il n&apos;appellera pas forcement chez vous a ce moment-la. Il prendra le commercial qui s&apos;est manifeste au bon moment.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Ce n&apos;est pas de l&apos;importunite, c&apos;est de la presence commerciale.
          </p>

          {/* ════════ 5 LEVIERS ════════ */}
          <h2 id="5-leviers" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Les 5 leviers pour developper votre portefeuille client sans prospecter
          </h2>

          {/* Levier 1 */}
          <h3 className="text-xl font-title font-bold text-blue-ink mt-10 mb-4">
            1. Revitaliser les comptes dormants
          </h3>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Prenez votre CRM. Filtrez les comptes sans interaction depuis 12 mois. Vous allez trouver entre 20 et 40% de votre base. Des clients qui vous ont deja fait confiance, qui connaissent votre offre, qui vous ont paye.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Le scenario n&apos;est pas &laquo; je vous vends quelque chose en plus &raquo;. C&apos;est : &laquo; bonjour, cela fait un moment, je voulais savoir comment allait votre equipe, si tout fonctionne bien de votre cote, si de nouveaux sujets emergent. &raquo;
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Pas de script de vente. Une prise de temperature. Vous seriez surpris du nombre de rendez-vous que ca genere.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-8">
            <p className="text-lg font-title font-bold text-amber-800 mb-2">Resultat terrain</p>
            <p className="text-amber-700">Un client dans la formation a relance 22 comptes dormants en un mois. 12 ont accepte un rendez-vous. 4 ont signe un nouveau contrat. Sans un seul appel de prospection.</p>
          </div>

          {/* Levier 2 */}
          <h3 className="text-xl font-title font-bold text-blue-ink mt-10 mb-4">
            2. Diagnostiquer avant de proposer
          </h3>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Le reflexe de l&apos;upsell, c&apos;est de lister ce qu&apos;on pourrait vendre en plus. Mauvaise approche. Le bon reflexe, c&apos;est de repartir du besoin actuel du client. Aller le voir, comprendre comment son marche a evolue depuis la derniere commande, ce qui a change dans sa propre organisation.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            C&apos;est en comprenant son nouveau contexte qu&apos;on detecte le besoin non exprime. Pas en sortant une grille tarifaire.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-8">
            <p className="text-lg font-title font-bold text-amber-800 mb-2">Exemple concret</p>
            <p className="text-amber-700">Un editeur de logiciel que j&apos;accompagne a forme ses commerciaux a faire une revue de compte trimestrielle sans aucune intention de vente. Juste un point d&apos;etape. Resultat : le taux d&apos;upsell est passe de 8% a 22% en deux trimestres. Parce que les clients se sont mis a dire spontanement ce dont ils avaient besoin.</p>
          </div>

          {/* Levier 3 */}
          <h3 className="text-xl font-title font-bold text-blue-ink mt-10 mb-4">
            3. Activer le reseau de recommandations
          </h3>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Le parrainage classique ne marche presque jamais en B2B. Personne ne veut paraitre vendre son reseau.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Mais la recommandation naturelle, elle, fonctionne. La difference : au lieu de demander &laquo; qui connaissez-vous qui pourrait etre interesse ? &raquo;, vous demandez &laquo; avec qui travaillez-vous en ce moment et avec qui un rapprochement aurait du sens ? &raquo;
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Le client ne recommande pas un prospect. Il identifie un acteur de son ecosysteme ou votre offre aurait une utilite reciproque. C&apos;est plus precis, plus credible, et ca genere des introductions chaudes.
          </p>

          {/* Levier 4 */}
          <h3 className="text-xl font-title font-bold text-blue-ink mt-10 mb-4">
          {/* CTA MEDIUM entre leviers 3 et 4 */}
          <div className="bg-orange-soft/10 border border-orange-soft/20 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-orange-soft mb-2">Vous avez identifié vos 3 premiers leviers ?</p>
            <p className="text-sm text-gray-600 mb-4">
              Je vous propose un diagnostic gratuit de 45 min pour passer en revue votre portefeuille client et prioriser les actions à fort impact.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 bg-mint-green text-white font-medium rounded-full hover:bg-mint-green/90 transition-colors">
              Je veux savoir par où commencer →
            </Link>
          </div>

            4. Proposer un service complementaire simple
          </h3>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Le cross-sell le plus efficace n&apos;est pas spectaculaire. C&apos;est le complement naturel de ce que vous vendez deja. Si vous vendez du logiciel, proposez l&apos;accompagnement au deploiement. Si vous vendez des formations, proposez le coaching individuel. Si vous vendez du conseil, proposez le diagnostic annuel.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Regle simple : le client doit comprendre immediatement pourquoi ce service va avec ce qu&apos;il a deja achete. Si vous devez expliquer plus de trente secondes, ce n&apos;est pas un cross-sell naturel.
          </p>

          {/* Levier 5 */}
          <h3 className="text-xl font-title font-bold text-blue-ink mt-10 mb-4">
            5. Mettre en place un rituel de pilotage dedie
          </h3>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Sans suivi, l&apos;expansion de compte reste une intention. Mettez en place une revue mensuelle du portefeuille existant. Trois questions : quels comptes ont ete contactes ce mois-ci, quels comptes ont montre un signal d&apos;evolution (croissance, nouveau projet, nouveau decideur), quelles actions concretes pour le mois suivant.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Pas besoin d&apos;outil sophistique. Une feuille de calcul partagee suffit. L&apos;important, c&apos;est le rythme et la discipline.
          </p>

          {/* ════════ TEST 30 JOURS ════════ */}
          <h2 id="test" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Et si vous testiez pendant 30 jours ?
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Je ne vous demande pas d&apos;arreter de prospecter. C&apos;est trop contre-intuitif. Mais prenez 20% de votre temps commercial ce mois-ci. Consacrez-le a vos clients existants.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Pas pour leur vendre quelque chose. Pour reprendre contact, comprendre leur situation actuelle, voir si tout va bien.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Dans trente jours, regardez combien de rendez-vous ca a genere, combien de nouvelles demandes, combien de ventes simples. Et comparez avec ce que 20% de temps de prospection en plus aurait produit.
          </p>

          <p className="text-xl font-title font-semibold text-blue-ink my-8 text-center">
            Je parie que vous serez surpris.
          </p>

          {/* Pour aller plus loin */}
          
<div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link href="/blog/developpement-commercial-pme-plan-action-5-etapes" className="text-mint-green hover:underline font-medium">Plan d&apos;action developpement commercial</Link></li>
              <li><Link href="/blog/coaching-commercial-terrain-methode-equipe" className="text-mint-green hover:underline font-medium">Coaching commercial terrain</Link></li>
              <li><Link href="/blog/strategie-commerciale-pme-cadre-une-page" className="text-mint-green hover:underline font-medium">Strategie commerciale PME : le cadre en une page</Link></li>
            </ul>
          </div>

<div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h2 className="text-2xl font-title font-bold mb-4">
              Vous voulez savoir quel levier activer en priorite dans votre portefeuille ?
            </h2>
            <p className="mb-6">
              Je propose un diagnostic commercial gratuit de 45 minutes. On regarde ensemble votre portefeuille client, on identifie les comptes dormants et les leviers d&apos;expansion les plus prometteurs, et on construit un plan d&apos;action simple pour les 30 prochains jours. Pas de vente, pas de methode generique. Du sur-mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors text-center"
              >
                Faire un diagnostic commercial gratuit →
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors text-center"
              >
                Decouvrir le bootcamp →
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
