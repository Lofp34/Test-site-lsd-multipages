import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const carouselPrefix = '/images/blog/script-prospection-telephonique-b2b-2026/carrousel';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01.webp`, alt: 'Dirigeant au téléphone lisant un script générique, air fatigué', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02.webp`, alt: 'Prospect raccrochant, regard agacé, le script mort est rejeté en 5 secondes', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03.webp`, alt: 'Laurent expliquant que le script doit ressembler à une conversation entre professionnels', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04.webp`, alt: 'Phase 1 : ouverture personnalisée de 30 secondes avec observation pertinente', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05.webp`, alt: 'Phase 2 : accroche valeur centrée sur l\'enjeu du prospect', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06.webp`, alt: 'Phase 3 : découverte rapide, questions qui creusent la situation', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07.webp`, alt: 'Phase 4 : pivot vers le rendez-vous avec deux créneaux précis', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08.webp`, alt: 'Commercial gérant l\'objection envoyez-moi une documentation', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09.webp`, alt: 'Gestion de l\'objection je ne suis pas intéressé', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10.webp`, alt: 'Gestion de l\'objection on a déjà quelqu\'un pour ça', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11.webp`, alt: 'Préparation 5 minutes avant l\'appel : LinkedIn, actualités, angle personnalisé', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12.webp`, alt: 'Laurent face caméra : un script bien construit sonne naturel, pas récité', index: 11 },
];

export const metadata: Metadata = {
  title: 'Script de prospection téléphonique B2B : méthode 2026 | Laurent Serre',
  description:
    'Comment structurer un script de prospection téléphonique B2B en 2026. Preparation, ouverture, decouverte, gestion d objections. Methode terrain pour PME.',
  keywords:
    'script prospection téléphonique B2B, cold call B2B 2026, script appel commercial, prospection téléphonique B2B, comment froid appeler en B2B, gestion objections téléphone',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/script-prospection-telephonique-b2b-2026',
  },
  openGraph: {
    title: 'Script de prospection téléphonique B2B : méthode 2026',
    description:
      'Comment structurer un script de prospection téléphonique B2B en 2026. Preparation, ouverture, decouverte, gestion d objections. Methode terrain pour PME.',
    url: 'https://www.laurentserre.com/blog/script-prospection-telephonique-b2b-2026',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/script-prospection-telephonique-b2b-2026/hero.webp',
        width: 1536,
        height: 1024,
        alt: "Un commercial au téléphone avec un script personnalisé devant lui, regard concentré, espace de travail professionnel",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Script de prospection téléphonique B2B : méthode 2026',
    description:
      'Comment structurer un script de prospection téléphonique B2B en 2026. Preparation, ouverture, decouverte, gestion d objections. Methode terrain pour PME.',
    images: ['https://www.laurentserre.com/images/blog/script-prospection-telephonique-b2b-2026/hero.webp'],
  },
};

export default function ScriptProspectionTelephoniquePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline:
          'Ce que votre script de prospection telephonique devrait vraiment dire',
        description:
          'Comment structurer un script de prospection telephonique B2B en 2026. Preparation, ouverture, decouverte, gestion d objections. Methode terrain pour PME.',
        image:
          'https://www.laurentserre.com/images/blog/script-prospection-telephonique-b2b-2026/hero.webp',
        datePublished: '2026-07-08',
        dateModified: '2026-07-08',
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
          '@id':
            'https://www.laurentserre.com/blog/script-prospection-telephonique-b2b-2026',
        },
        articleSection: 'Prospection / Telephone',
        keywords: [
          'script prospection telephonique B2B',
          'cold call B2B 2026',
          'script appel commercial',
          'prospection telephonique B2B',
          'gestion objections telephone',
        ],
      },
      {
        '@type': 'WebPage',
        '@id':
          'https://www.laurentserre.com/blog/script-prospection-telephonique-b2b-2026',
      },
      {
        '@type': 'FAQPage',
        '@id':
          'https://www.laurentserre.com/blog/script-prospection-telephonique-b2b-2026#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Comment faire un script de prospection telephonique B2B ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un script de prospection telephonique B2B efficace en 2026 suit une structure en 4 phases : ouverture personnalisee (30s), accroche valeur centree sur lenjeu (30 a 45s), decouverte rapide (2 a 3 min), pivot vers un rendez-vous. L objectif nest pas de vendre au telephone mais de decrocher un RDV qualifie.',
            },
          },
          {
            '@type': 'Question',
            name: 'Est-ce que le cold calling fonctionne encore en 2026 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, le cold calling fonctionne encore en 2026, mais plus sous sa forme generique. Les appels cibles et prepares convertissent a 5 a 15 pour cent contre 1 a 2 pour cent pour les appels generiques. La cle est la personalisation : preparation 5 minutes, angle adapte, et structure conversationnelle.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la structure d un appel de prospection efficace ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La structure d un appel de prospection efficace comprend 4 phases : 1. Ouverture personnalisee de 30 secondes qui montre que vous avez prepare lappel. 2. Accroche valeur centree sur lenjeu du prospect. 3. Decouverte rapide avec des questions qui creusent la situation. 4. Pivot vers le rendez-vous avec deux creneaux precis.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment gerer l objection envoyez-moi une documentation ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Face a envoyez-moi une documentation, ne renvoyez pas un catalogue. Reformulez ainsi : Je prefere ne pas vous noyer de documents sans savoir si cest pertinent. Donnez-moi 2 minutes de plus et je saurai si ca vaut la peine de creuser. Ainsi vous restez maître de la conversation.",
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle reglementation pour la prospection telephonique en France en 2026 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depuis juillet 2025, le numero masque est obligatoire pour la prospection telephonique depuis la France. Les appels doivent respecter les plages horaires autorisees et Bloctel. En B2B, les regles sont moins restrictives qu en B2C, mais le professionnalisme et le respect du prospect restent la regle de base.',
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
            name: 'Script de prospection telephonique B2B',
            item: 'https://www.laurentserre.com/blog/script-prospection-telephonique-b2b-2026',
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
              <li className="text-blue-ink font-medium" aria-current="page">Script de prospection telephonique B2B</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Prospection / Telephone
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Ce que votre script de prospection telephonique devrait vraiment dire
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
              <time dateTime="2026-07-08">8 juillet 2026</time>
              <span>•</span>
              <span>8 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/script-prospection-telephonique-b2b-2026/hero.webp"
              alt="Un commercial au telephone avec un script personnalise devant lui, regard concentre"
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
              Un script de prospection telephonique B2B efficace en 2026 suit une structure en 4 phases :
              ouverture personnalisee, accroche valeur centree sur lenjeu, decouverte rapide, pivot vers un rendez-vous.
              Le script ne se recite pas. Il se construit comme une structure de conversation.
            </p>
          </div>

          {/* 🎬 Carrousel BD */}
          <div className="bg-gradient-to-br from-blue-ink/5 to-mint-green/10 border border-blue-ink/10 rounded-2xl p-6 mt-10 mb-8">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Avant Apres, le script mort contre le script vivant
            </p>
            <p className="text-sm text-gray-600 mb-5">
              Le dirigeant Marc pensait avoir un bon script. Sauf que ses prospects raccrochent en 5 secondes.
              Suivez sa transformation en 12 planches, du script recite a la conversation qui decroche des rendez-vous.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Avant Apres le script de prospection telephonique"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href={`${carouselPrefix}/carrousel-073-script-prospection-telephonique.pdf`}
                className="inline-flex items-center gap-2 text-blue-ink text-xs hover:text-mint-green transition-colors underline underline-offset-2"
              >
                Telecharger le PDF (12 planches)
              </Link>
            </div>
          </div>

          {/* CTA soft apres carrousel */}
          <div className="bg-mint-green/5 border border-mint-green/20 rounded-2xl p-5 my-8 text-center">
            <p className="text-gray-700 font-medium">
              Vous vous reconnaissez dans la situation de Marc ?{' '}
              <Link href="/diagnostic" className="text-mint-green hover:text-mint-green/80 font-semibold underline underline-offset-2">
                Decouvrez ce qui bloque vraiment votre prospection →
              </Link>
            </p>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#script-mort" className="text-mint-green hover:underline">Le script mort que vos prospects identifient en 5 secondes</a></li>
              <li><a href="#ce-qui-a-change" className="text-mint-green hover:underline">Ce qui a change en prospection telephonique</a></li>
              <li><a href="#structure" className="text-mint-green hover:underline">La structure d un appel de prospection efficace</a></li>
              <li><a href="#objections" className="text-mint-green hover:underline">Gerer les objections courantes</a></li>
              <li><a href="#preparation" className="text-mint-green hover:underline">La preparation : ce qui se passe avant l appel</a></li>
              <li><a href="#conclusion" className="text-mint-green hover:underline">3 actions concretes</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">Questions frequentes</a></li>
            </ul>
          </div>

          {/* ──────────────── Script mort ──────────────── */}
          <h2 id="script-mort" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le script mort que vos prospects identifient en 5 secondes
          </h2>

          <p className="mb-4">
            « Bonjour, je suis Pierre de SocieteGenerale. Nous sommes specialises dans les solutions de pilotage d activite. Est-ce que vous avez 30 minutes cette semaine pour qu on se presente ? »
          </p>

          <p className="mb-4">
            Resultat : « Non merci, envoyez-moi une documentation. » Et la conversation s arrete.
          </p>

          <p className="mb-4">
            Ce script est mort. Il a trop ete utilise. Vos prospects l identifient en 5 secondes et passent en mode rejet automatique. Vous ne les ecoutez pas. Vous recitez un catalogue.
          </p>

          <p className="mb-8">
            Je vois ca toutes les semaines. Des commerciaux qui lisent leur script sans le voir. Des equipes qui se demandent pourquoi le telephone ne marche plus. La reponse est simple : votre prospect n attend pas que vous ayez fini votre presentation. Il attend le premier blanc pour raccrocher.
          </p>

          <p className="mb-4">
            Un bon script de prospection telephonique en 2026 ne ressemble pas a un script. Il ressemble a une conversation entre deux professionnels. La difference n est pas dans les mots. Elle est dans la structure et l intention.
          </p>

          {/* ──────────────── Ce qui a change ──────────────── */}
          <h2 id="ce-qui-a-change" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce qui a change en prospection telephonique
          </h2>

          <p className="mb-4">
            Le contexte a evolue. Les prospects sont sollicites en permanence, par telephone, email, LinkedIn. Leur tolerance aux approches generiques est nulle.
          </p>

          <p className="mb-4">
            En meme temps, le telephone reste le canal le plus direct et le plus humain. Un appel bien prepare, avec un angle pertinent, sur la bonne personne, au bon moment, ca fonctionne encore tres bien.
          </p>

          <p className="mb-8">
            La difference, c est la preparation et la personnalisation. Les etudes recentes le confirment : le taux de conversion du cold calling cible atteint 5 a 15 pour cent avec une bonne preparation, contre 1 a 2 pour cent pour les appels generiques. Et la duree moyenne d un appel efficace est de 93 secondes. Pas 30 minutes.
          </p>

          <p className="mb-8">
            La question n est donc pas : est-ce que le telephone marche encore ? Elle est : est-ce que votre maniere de telephoner est adaptee a ce que les prospects attendent aujourd hui ?
          </p>

          <p className="mb-4">
            La reponse est souvent non. Et c est une bonne nouvelle : parce que ca se corrige.
          </p>

          {/* ──────────────── Structure appel ──────────────── */}
          <h2 id="structure" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La structure d un appel de prospection efficace
          </h2>

          {/* Phase 1 */}
          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Phase 1 : l ouverture
          </h3>

          <p className="mb-4">
            Objectif : ne pas perdre le prospect dans les 30 premieres secondes.
          </p>

          <p className="mb-4">
            <strong>Ce qui ne fonctionne pas :</strong> se presenter longuement, annoncer que vous etes commercial, demander si c est le bon moment.
          </p>

          <p className="mb-4">
            <strong>Ce qui fonctionne :</strong> une ouverture directe et personnalisee qui montre que vous avez fait votre travail.
          </p>

          <div className="bg-blue-ink/5 rounded-xl p-4 mb-8 border border-blue-ink/10">
            <p className="text-sm text-blue-ink font-medium mb-1">🔑 Exemple d ouverture qui marche :</p>
            <p className="text-gray-700 italic text-sm">
              « Bonjour Marc, c est Pierre de SocieteGenerale. Je vous appelle parce que j ai vu que vous avez recrute deux commerciaux ce trimestre. Vous avez deux minutes ? »
            </p>
          </div>

          <p className="mb-4">
            Cette ouverture montre que vous n appelez pas au hasard. Vous avez vu quelque chose. Vous avez une raison d etre la. Elle pique la curiosite.
          </p>

          <p className="mb-8">
            Le « vous avez deux minutes ? » est important. Il demande une micro-autorisation. Le prospect peut dire oui. Il se sent respecte. Il est plus attentif.
          </p>

          {/* Phase 2 */}
          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Phase 2 : l accroche valeur
          </h3>

          <p className="mb-4">
            Pas de presentation de votre entreprise maintenant. Une accroche centree sur l enjeu probable du prospect.
          </p>

          <div className="bg-blue-ink/5 rounded-xl p-4 mb-8 border border-blue-ink/10">
            <p className="text-sm text-blue-ink font-medium mb-1">🔑 Exemple d accroche :</p>
            <p className="text-gray-700 italic text-sm">
              « Je travaille avec des directeurs commerciaux du secteur industriel qui font face a un probleme : leurs nouveaux commerciaux mettent 6 mois a etre operationnels. Vous voyez ce que je veux dire ? »
            </p>
          </div>

          <p className="mb-4">
            Cette question ouverte invite le prospect a parler. Si vous avez bien cible, la reponse est souvent « oui, effectivement ». A ce stade, vous n avez pas parle de votre offre. Vous avez parle de son probleme.
          </p>

          {/* Phase 3 */}
          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Phase 3 : la decouverte rapide
          </h3>

          <p className="mb-4">
            Vous avez son attention. Ne pitchez pas. Creusez. Vous avez entre 2 et 3 minutes pour qualifier la situation.
          </p>

          <p className="mb-4">
            Questions cles :
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li>« Comment vous gerez ca en ce moment ? »</li>
            <li>« Quel est l impact pour votre equipe ? »</li>
            <li>« Qu avez-vous essaye jusqu ici ? »</li>
            <li>« Qu est-ce qui vous freine vraiment ? »</li>
          </ul>

          <p className="mb-8">
            Ces questions qualifient le prospect et montrent que vous etes la pour comprendre, pas pour vendre. Un prospect qui parle est un prospect qui s engage. Un commercial qui ecoute est un commercial qui gagne.
          </p>

          {/* Phase 4 */}
          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Phase 4 : le pivot vers le rendez-vous
          </h3>

          <p className="mb-4">
            Si la decouverte revele un enjeu reel, proposez la prochaine etape. Le telephone ne sert pas a vendre. Il sert a decrocher un RDV qualifie.
          </p>

          <div className="bg-blue-ink/5 rounded-xl p-4 mb-8 border border-blue-ink/10">
            <p className="text-sm text-blue-ink font-medium mb-1">🔑 Exemple de pivot :</p>
            <p className="text-gray-700 italic text-sm">
              « Sur la base de ce que vous m avez dit, je pense qu on aurait des choses interessantes a explorer ensemble. Je pourrais vous montrer comment on a aide une entreprise comme la votre a reduire ce temps d integration de 6 a 2 mois. Est-ce que vous auriez 45 minutes mardi ou jeudi prochain ? »
            </p>
          </div>

          <p className="mb-4">
            Proposez deux creneaux specifiques. Ne demandez pas « quand etes-vous disponible ? ». Ca renvoie la decision au prospect et cree de la friction. Un choix ferme aide a dire oui.
          </p>

          {/* ──────────────── Objections ──────────────── */}
          <h2 id="objections" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Gerer les objections courantes
          </h2>

          <p className="mb-8">
            L objection n est pas un refus. C est une question mal posee ou un besoin non exprime. La facon dont vous la recevez change tout.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Objection 1 : « Envoyez-moi une documentation »
          </h3>

          <p className="mb-4">
            C est l objection la plus frequente et la plus dangereuse. Si vous envoyez un catalogue, le prospect le lit ou ne le lit pas, et vous perdez la main.
          </p>

          <p className="mb-4">
            <strong>Ce qui marche :</strong>
          </p>

          <div className="bg-blue-ink/5 rounded-xl p-4 mb-8 border border-blue-ink/10">
            <p className="text-gray-700 italic text-sm">
              « Je prefere ne pas vous noyer de documents sans savoir si c est pertinent. Donnez-moi deux minutes de plus et je saurai si ca vaut la peine de creuser, sinon je ne vous derange plus. »
            </p>
          </div>

          <p className="mb-8">
            Cette reponse garde la main. Vous ne refusez pas. Vous reportez l envoi apres un echange plus qualifie. Et vous montrez du respect pour son temps.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Objection 2 : « Je ne suis pas interesse »
          </h3>

          <p className="mb-4">
            Beaucoup de commerciaux encaissent et raccrochent. C est une erreur.
          </p>

          <div className="bg-blue-ink/5 rounded-xl p-4 mb-8 border border-blue-ink/10">
            <p className="text-gray-700 italic text-sm">
              « Je comprends. Si je vous pose une question : qu est-ce qui vous fait dire ca ? C est le timing ou le sujet lui-meme qui n est pas d actualite ? »
            </p>
          </div>

          <p className="mb-8">
            Cette question neutre distingue le « pas maintenant » du « vraiment non ». Elle revele souvent un enjeu sous-jacent. Un prospect qui dit « pas interesse » par reflexe merite qu on gratte un peu. Parfois il suffit de poser la bonne question.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            Objection 3 : « On a deja quelqu un pour ca »
          </h3>

          <div className="bg-blue-ink/5 rounded-xl p-4 mb-8 border border-blue-ink/10">
            <p className="text-gray-700 italic text-sm">
              « C est souvent le cas de nos clients avant de travailler avec nous. Ce qui les a amenes a nous contacter, c est que leur prestataire actuel ne repondait plus a un enjeu precis. Est-ce que vous avez ce type de situation aussi ? »
            </p>
          </div>

          <p className="mb-8">
            Vous ne critiquez pas le concurrent. Vous ouvrez une porte sur un enjeu que le prestataire actuel ne resout peut-etre pas. Si le prospect est satisfait, il le dira et vous passerez a autre chose. Si pas, la conversation continue.
          </p>

          {/* ──────────────── Preparation ──────────────── */}
          <h2 id="preparation" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La preparation : ce qui se passe avant l appel
          </h2>

          <p className="mb-4">
            Un bon appel se prepare en 5 minutes. Pas plus. Mais ces 5 minutes changent tout.
          </p>

          <p className="mb-4">
            Voici ce qu il faut faire avant chaque appel cible :
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li><strong>Consulter le profil LinkedIn du prospect.</strong> Poste actuel, publications recentes, parcours. Cherchez un point d accroche : un changement recent, une prise de parole, un evenement professionnel.</li>
            <li><strong>Verifier les actualites de l entreprise.</strong> Communiques, croissance, offres d emploi, lancement produit. Ca vous donne le contexte dans lequel le prospect evolue.</li>
            <li><strong>Identifier un angle d entree personnalise.</strong> La raison pour laquelle vous l appelez AUJOURD HUI, pas la semaine derniere. Un recrutement, une levee de fonds, un nouveau marche : ce qui justifie votre appel maintenant.</li>
          </ul>

          <p className="mb-8">
            Cette preparation change completement la qualite de l appel. Un commercial qui a fait ses devoirs parle differemment. Il est plus sur. Il pose de meilleures questions. Et le prospect le sent.
          </p>

          <p className="mb-4">
            Un appel prepare prend 5 minutes de plus. Il convertit 3 fois mieux. Le calcul est vite fait.
          </p>

          {/* Mid-article CTA */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              🎯 Vous voulez que vos equipes maitrisent vraiment la prospection telephonique ?
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp commercial de Laurent Serre vous donne le cadre pour transformer la prospection de vos equipes. Trois jours pour passer de l appel generique a la conversation qui decroche des rendez-vous.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Decouvrir le Bootcamp commercial →
            </Link>
          </div>

          {/* ──────────────── Conclusion ──────────────── */}
          <h2 id="conclusion" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            3 actions concretes
          </h2>

          <p className="mb-8">
            Un article de plus sur la prospection telephonique ne sert a rien si vous ne faites rien apres l avoir lu. Alors voici trois actions, avec des echeances, pour que ce texte ait un impact reel.
          </p>

          <p className="mb-4">
            <strong>1. Cette semaine :</strong> redigez votre script en suivant la structure en 4 phases. Entrainez-vous a voix haute 5 fois avant de decrocher le telephone. Le script doit sonner naturel, pas recite. Si ca sonne faux a l oral, c est qu il faut le retravailler.
          </p>

          <p className="mb-4">
            <strong>2. Ce mois-ci :</strong> testez 3 variantes d accroche valeur sur vos 30 prochains appels. Mesurez laquelle genere le plus d engagement, celle ou la conversation continue au-dela de l ouverture. Gardez la meilleure.
          </p>

          <p className="mb-8">
            <strong>3. Ce trimestre :</strong> integrez dans votre process la regle des 5 minutes de preparation avant chaque appel cible. Pas de exception. Un commercial qui prepare 5 minutes convertit 3 fois mieux. Faites le calcul sur votre pipeline.
          </p>

          <p className="mb-4">
            Le script de prospection n est pas un texte a reciter. C est une structure de conversation. Elle se construit, se teste, s ajuste. Et elle ne remplace jamais l ecoute.
          </p>

          {/* ──────────────── CTA final ──────────────── */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vos commerciaux improvisent au telephone ?
            </h3>
            <p className="mb-6">
              Beaucoup de dirigeants pensent qu il faut un meilleur script. Parfois, le vrai probleme est ailleurs :
              ecoute, qualification, gestion du temps. Un diagnostic commercial identifie les veritables freins de votre prospection.
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
                Decouvrir le Bootcamp commercial
              </Link>
            </div>
          </div>

          {/* ──────────────── FAQ ──────────────── */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Questions frequentes
          </h2>

          <div className="space-y-6 mt-6 mb-10">
            <div>
              <p className="font-bold text-blue-ink mb-1">
                Comment faire un script de prospection telephonique B2B ?
              </p>
              <p className="text-gray-700">
                Un script de prospection telephonique B2B efficace en 2026 suit une structure en 4 phases :
                ouverture personnalisee (30 secondes), accroche valeur centree sur l enjeu du prospect
                (30 a 45 secondes), decouverte rapide (2 a 3 minutes), pivot vers un rendez-vous.
                L objectif n est pas de vendre au telephone. Il est de decrocher un RDV qualifie.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Est-ce que le cold calling fonctionne encore en 2026 ?
              </p>
              <p className="text-gray-700">
                Oui, mais plus sous sa forme generique. Les appels cibles et prepares convertissent
                a 5 a 15 pour cent contre 1 a 2 pour cent pour les appels generiques. La cle est la
                personnalisation : preparation 5 minutes, angle adapte, structure conversationnelle.
                Le telephone reste le canal le plus direct quand il est bien utilise.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Quelle est la structure d un appel de prospection efficace ?
              </p>
              <p className="text-gray-700">
                La structure comprend 4 phases. Phase 1 : ouverture personnalisee de 30 secondes qui
                montre que vous avez prepare l appel. Phase 2 : accroche valeur centree sur l enjeu
                du prospect, pas sur votre offre. Phase 3 : decouverte rapide avec des questions qui
                creusent la situation reelle. Phase 4 : pivot vers le rendez-vous avec deux creneaux
                precis proposes.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Comment gerer l objection « envoyez-moi une documentation » ?
              </p>
              <p className="text-gray-700">
                Ne renvoyez pas un catalogue. Reformulez ainsi : « Je prefere ne pas vous noyer de
                documents sans savoir si c est pertinent pour vous. Donnez-moi deux minutes de plus
                et je saurai si ca vaut la peine de creuser. » Vous restez maitre de la conversation
                et vous montrez du respect pour son temps. Si le besoin est reel, la personne accepte.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Quelle reglementation pour la prospection telephonique en France en 2026 ?
              </p>
              <p className="text-gray-700">
                Depuis juillet 2025, le numero masque est obligatoire pour la prospection telephonique
                depuis la France. Les appels doivent respecter les plages horaires autorisees et la
                liste Bloctel. En B2B, les regles sont moins restrictives qu en B2C, mais le
                professionnalisme et le respect du prospect restent la regle de base. Un appel prepare
                et personnalise evite de tomber dans le spam telephonique.
              </p>
            </div>
          </div>

          {/* ──────────────── Ressources ──────────────── */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link
                  href="/blog/prospection-b2b-cold-outreach-2026"
                  className="text-mint-green hover:underline font-medium"
                >
                  Prospection B2B : la methode cold outreach 2026
                </Link>
                <span className="text-gray-500">
                  {' '}: Le telephone est un canal parmi d autres. La methode globale de cold outreach pour comprendre le cadre complet.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/prospection-b2b-2026-methode-4-blocs-rdv-qualifies"
                  className="text-mint-green hover:underline font-medium"
                >
                  Methode 4 blocs pour decrocher des RDV qualifies
                </Link>
                <span className="text-gray-500">
                  {' '}: Le telephone ne fait pas tout. La methode complete du premier contact au rendez-vous.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/linkedin-prospection-b2b-50-messages-par-jour"
                  className="text-mint-green hover:underline font-medium"
                >
                  Sequence multicanal : LinkedIn, email, telephone
                </Link>
                <span className="text-gray-500">
                  {' '}: Le script de prospection telephonique s integre dans une sequence plus large. Le telephone seul ne suffit pas.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/signaux-faibles-prospection-b2b"
                  className="text-mint-green hover:underline font-medium"
                >
                  Signaux d achat pour personnaliser votre approche
                </Link>
                <span className="text-gray-500">
                  {' '}: Ce qui fait qu un appel est pertinent aujourd hui plutot que la semaine derniere. Les signaux qui justifient votre appel.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/le-telephone-nest-pas-mort-mais-lappel-au-hasard-lest"
                  className="text-mint-green hover:underline font-medium"
                >
                  Le telephone n est pas mort. L appel au hasard, si.
                </Link>
                <span className="text-gray-500">
                  {' '}: L article fondateur sur la pertinence du telephone en prospection B2B. A lire en complement.
                </span>
              </li>
            </ul>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            Le script de prospection n est pas un texte a reciter. C est une structure de conversation. Elle se construit, se teste, s ajuste. Et elle ne remplace jamais l ecoute.
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
            Vous voulez voir si votre equipe utilise un script mort ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Un echange rapide pour faire le point sur votre prospection telephonique.
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
