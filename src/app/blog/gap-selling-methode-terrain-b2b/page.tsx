import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Gap Selling appliqué au terrain : vendre en creusant le vrai problème | Laurent Serre',
  description:
    'La méthode Gap Selling adaptée au terrain PME français. Découvrez comment creuser le vrai problème du client, quantifier le fossé, et ne plus pitcher trop tôt. Avec cas client et erreurs à éviter.',
  keywords:
    'gap selling, gap selling méthode, gap selling français, technique vente B2B, diagnostic commercial, vente consultative, Keenan',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/gap-selling-methode-terrain-b2b',
  },
  openGraph: {
    title: 'Gap Selling appliqué au terrain : vendre en creusant le vrai problème',
    description:
      '80% des cycles de vente échouent parce que le commercial parle de sa solution avant d\'avoir compris le vrai problème. La méthode Gap Selling, racontée par le terrain.',
    url: 'https://www.laurentserre.com/blog/gap-selling-methode-terrain-b2b',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-27-gap-selling-hero.webp',
        width: 1536,
        height: 1024,
        alt: 'Un commercial en rendez-vous client, penché sur un tableau où il schématise le fossé entre la situation actuelle et l\'objectif visé',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gap Selling appliqué au terrain : vendre en creusant le vrai problème',
    description:
      '80% des cycles de vente échouent parce que le commercial parle de sa solution avant d\'avoir compris le vrai problème.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-27-gap-selling-hero.webp'],
  },
};

const carouselPrefix = '/images/blog/carrousel-gap-selling-webp';

const carouselImages = [
  { src: `${carouselPrefix}/01-cover.webp`, alt: 'Cover : Gap Selling sur le terrain', index: 0 },
  { src: `${carouselPrefix}/02-piege-prix.webp`, alt: 'Le piège : baisser le prix', index: 1 },
  { src: `${carouselPrefix}/03-fosse.webp`, alt: 'Personne n\'achète un produit, on achète la réduction d\'un écart', index: 2 },
  { src: `${carouselPrefix}/04-decouverte.webp`, alt: 'Étape 1 : Découverte : creuser le vrai problème', index: 3 },
  { src: `${carouselPrefix}/05-quantification.webp`, alt: 'Étape 2 : Quantification : 140 000 €', index: 4 },
  { src: `${carouselPrefix}/06-amplification.webp`, alt: 'Étape 3 : Amplification : les conséquences de l\'inaction', index: 5 },
  { src: `${carouselPrefix}/07-alignement.webp`, alt: 'Étape 4 : Alignement : la poignée de main', index: 6 },
  { src: `${carouselPrefix}/08-erreur-pitcher-tot.webp`, alt: 'Erreur fatale : pitcher trop tôt', index: 7 },
  { src: `${carouselPrefix}/09-erreur-non-quantifier.webp`, alt: 'Erreur fatale : ne pas quantifier', index: 8 },
  { src: `${carouselPrefix}/10-closing.webp`, alt: 'Posez trois questions de plus', index: 9 },
];

export default function GapSellingMethodeTerrainB2bPage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: 'Gap Selling appliqué au terrain : vendre en creusant le vrai problème',
          description:
            '80% des cycles de vente échouent parce que le commercial parle de sa solution avant d\'avoir compris le vrai problème. La méthode Gap Selling, racontée par le terrain PME français.',
          image: 'https://www.laurentserre.com/images/blog/2026-05-27-gap-selling-hero.webp',
          datePublished: '2026-05-27',
          dateModified: '2026-05-27',
          author: {
            name: 'Laurent Serre',
            url: 'https://www.laurentserre.com/a-propos',
            sameAs: [
              'https://www.linkedin.com/in/laurentserre34/',
              'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
            ],
          },
          publisher: {
            name: 'Laurent Serre',
            url: 'https://www.laurentserre.com',
          },
          mainEntityOfPage: {
            '@id': 'https://www.laurentserre.com/blog/gap-selling-methode-terrain-b2b',
          },
          articleSection: 'Méthode de vente / diagnostic commercial',
          keywords: [
            'gap selling',
            'méthode gap selling',
            'diagnostic commercial',
            'vente B2B',
            'vente consultative',
          ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.laurentserre.com/blog/gap-selling-methode-terrain-b2b"
    },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/gap-selling-methode-terrain-b2b#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Gap Selling en trois principes : version terrain',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Avant d\'aller dans le détail, voici les trois idées qui tiennent la méthode : 1. Le client n\'a pas toujours conscience de son vrai problème. Il ressent un symptôme : un chiffre qui baisse, une équipe qui fatigue, un processus qui bloque, mais il n\'a pas mis de mot sur la cause réelle. Votre travail n\'est pas de confirmer ce qu\'il croit savoir. C\'est de creuser jusqu\'à ce que le vrai problème apparaisse. 2. Ce n\'est pas le problème qui fait vendre, c\'est l\'écart. Un problème peut exister depuis d',
            },
          },
          {
            '@type': 'Question',
            name: 'Ce que Gap Selling change vraiment dans la pratique',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La différence n\'est pas dans les questions que vous posez. La différence est dans ce que vous faites des réponses. Un commercial classique pose des questions pour savoir s\'il peut placer son produit. Il écoute, il prend des notes, et dès qu\'il entend un mot qui ressemble à son offre, il lance sa démo ou sa proposition. Un commercial qui applique Gap Selling pose des questions pour mesurer un écart. Il ne cherche pas une porte d\'entrée pour sa solution. Il cherche à comprendre où le client en est',
            },
          },
          {
            '@type': 'Question',
            name: 'Les erreurs qui tuent Gap Selling sur le terrain',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'J\'ai vu des équipes adopter la méthode avec enthousiasme, puis revenir trois mois plus tard en disant « ça ne marche pas ». Dans neuf cas sur dix, ce n\'est pas la méthode le problème. Ce sont des erreurs d\'application. Erreur 1 : creuser pour faire joli, puis pitcher pareil. Le commercial fait une belle phase de découverte, prend des notes, hoche la tête : puis sort exactement la même proposition qu\'il avait préparée avant le rendez-vous. Le client sent le décalage. La confiance est cassée. Erre',
            },
          },
          {
            '@type': 'Question',
            name: 'Un cas concret : la PME de services qui recrutait au hasard',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Une PME de services de 40 personnes en région. Le dirigeant me contacte parce que son équipe commerciale plafonne. Il pense qu\'il faut les former à la prospection. C\'est sa lecture. On creuse. Le problème n\'est pas la prospection. L\'équipe passe son temps à gérer des dossiers mal qualifiés. Les deux dernières recrues commerciales n\'étaient pas adaptées. Le turnover a coûté cher en temps de management et en clients perdus. On quantifie. Le coût des deux mauvais recrutements sur 18 mois : salaires',
            },
          },
          {
            '@type': 'Question',
            name: 'Questions fréquentes',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gap Selling, c\'est différent de SPIN Selling ? Oui et non. Les deux méthodes reposent sur une découverte profonde. SPIN structure les questions par type (Situation, Problème, Implication, Nécessité). Gap Selling met davantage l\'accent sur la quantification de l\'écart et l\'amplification des conséquences. Dans la pratique, elles se complètent bien. J\'utilise parfois SPIN pour la trame des questions et Gap Selling pour le cadrage global du cycle. Est-ce que Gap Selling marche pour tous les types de',
            },
          }
        ],
      },
  
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Gap Selling appliqué au terrain', 'item': 'https://www.laurentserre.com/blog/gap-selling-methode-terrain-b2b' },
        ],
      }
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
              <li className="text-blue-ink font-medium" aria-current="page">Gap Selling terrain</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Méthode de vente / diagnostic commercial
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Gap Selling appliqué au terrain : vendre en creusant le vrai problème
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
              <time dateTime="2026-05-27">27 mai 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-05-27-gap-selling-hero.webp"
              alt="Un commercial en rendez-vous client, qui schématise sur un tableau le fossé entre la situation actuelle et l'objectif visé par le client"
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
              Gap Selling repose sur une idée simple : le client n'achète pas une solution, il achète la
              réduction du fossé entre où il est et où il veut être. Cet article raconte comment appliquer
              cette méthode sur le terrain PME français : sans jargon, sans résumé de livre.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Les 10 planches Gap Selling
            </p>
            <p className="text-sm text-amber-700 mb-5">
              10 planches illustrées : du piège du prix jusqu'à la conclusion, en passant par les 4 étapes terrain.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Gap Selling sur le terrain"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-gap-selling.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (10 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA : sous le carrousel */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vous ne savez pas si vos équipes creusent vraiment le problème ? Faites un diagnostic →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#principes" className="text-mint-green hover:underline">Gap Selling en trois principes : version terrain</a></li>
              <li><a href="#changement" className="text-mint-green hover:underline">Ce que Gap Selling change vraiment dans la pratique</a></li>
              <li><a href="#etapes" className="text-mint-green hover:underline">Les quatre étapes sur le terrain</a></li>
              <li><a href="#erreurs" className="text-mint-green hover:underline">Les erreurs qui tuent Gap Selling sur le terrain</a></li>
              <li><a href="#cas-pme" className="text-mint-green hover:underline">Un cas concret : la PME de services qui recrutait au hasard</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">Questions fréquentes</a></li>
            </ul>
          </div>

          {/* Accroche */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Il arrive dans mon bureau avec un dossier qu'il sent fragile. Le client lui a dit « on verra » trois fois.
            Le commercial me dit : « je pense qu'il faut qu'on baisse le prix ». Il est déjà dans la solution, alors
            qu'il n'a même pas encore compris quel problème le client cherche vraiment à résoudre.
          </p>

          <p className="mb-8">
            Je vois cette scène tous les mois. Un commercial qui a bien préparé sa réunion, qui connaît son produit,
            qui a fait de bonnes questions, et qui pourtant passe à côté de la vraie mécanique de décision. Parce
            qu'il présente sa solution avant d'avoir mesuré le fossé. Le gap.
          </p>

          <p className="mb-8">
            La méthode Gap Selling, popularisée par Keenan, dit une chose que tout le monde comprend vite mais que
            peu appliquent vraiment : personne n'achète un produit. On achète la réduction d'un écart entre une
            situation qui coince et une situation meilleure. Si vous ne mesurez pas cet écart avec le client,
            vous vendez dans le vide.
          </p>

          {/* ──────────────── Gap Selling en 3 principes ──────────────── */}
          <h2 id="principes" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Gap Selling en trois principes : version terrain
          </h2>

          <p className="mb-4">
            Avant d'aller dans le détail, voici les trois idées qui tiennent la méthode :
          </p>

          <p className="mb-4">
            <strong>1. Le client n'a pas toujours conscience de son vrai problème.</strong> Il ressent un
            symptôme : un chiffre qui baisse, une équipe qui fatigue, un processus qui bloque, mais il n'a
            pas mis de mot sur la cause réelle. Votre travail n'est pas de confirmer ce qu'il croit savoir.
            C'est de creuser jusqu'à ce que le vrai problème apparaisse.
          </p>

          <p className="mb-4">
            <strong>2. Ce n'est pas le problème qui fait vendre, c'est l'écart.</strong> Un problème peut
            exister depuis des années sans que personne ne bouge. Ce qui déclenche une décision, c'est la
            prise de conscience de l'écart entre le coût de l'inaction et l'état souhaité. Plus cet écart
            est large, plus la décision devient urgente.
          </p>

          <p className="mb-8">
            <strong>3. On ne propose rien tant que le fossé n'est pas mesuré.</strong> La discipline la plus
            dure : ne pas pitcher. Ne pas parler de votre offre. Ne pas envoyer le devis. Rester dans la
            découverte jusqu'à ce que le client lui-même dise « il faut qu'on fasse quelque chose ».
          </p>

          {/* ──────────────── Ce que Gap Selling change concrètement ──────────────── */}
          <h2 id="changement" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que Gap Selling change vraiment dans la pratique
          </h2>

          <p className="mb-8">
            La différence n'est pas dans les questions que vous posez. La différence est dans ce que vous
            faites des réponses.
          </p>

          <p className="mb-8">
            Un commercial classique pose des questions pour savoir s'il peut placer son produit. Il écoute,
            il prend des notes, et dès qu'il entend un mot qui ressemble à son offre, il lance sa démo ou
            sa proposition.
          </p>

          <p className="mb-8">
            Un commercial qui applique Gap Selling pose des questions pour mesurer un écart. Il ne cherche
            pas une porte d'entrée pour sa solution. Il cherche à comprendre où le client en est, où il veut
            aller, et surtout ce qui le sépare de cet objectif.
          </p>

          <p className="mb-8">
            Concrètement, dans mes ateliers avec des équipes PME, je vois la bascule arriver au bout de deux
            ou trois rendez-vous d'application. Le commercial qui passait ses réunions à parler de son offre
            se met à parler du problème du client, en profondeur, sans sortir son catalogue. Et il signe
            plus : parce que le client a compris avant lui qu'il avait besoin d'agir.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>
                La vente ne commence pas quand vous présentez votre solution. Elle commence quand le client
                mesure lui-même l'écart entre son quotidien et ce qu'il pourrait gagner.
              </strong>
            </p>
          </div>

          {/* ──────────────── Les 4 étapes terrain ──────────────── */}
          <h2 id="etapes" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les quatre étapes sur le terrain
          </h2>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            1. Découverte : creuser le vrai problème
          </h3>

          <p className="mb-8">
            Je commence toujours par une question simple : « Qu'est-ce qui vous a poussé à me recevoir ? »
            La première réponse est rarement la bonne. Le client donne un motif officiel. Il faut creuser
            trois, quatre, cinq questions pour arriver à la raison réelle.
          </p>

          <p className="mb-8">
            Dans une PME industrielle que j'accompagnais, le dirigeant disait qu'il voulait « améliorer la
            performance commerciale ». Après une heure à creuser, le vrai problème est apparu : son meilleur
            commercial partait dans six mois, et il n'avait personne pour reprendre ses comptes. Le sujet
            n'était pas la performance. C'était la transmission et le risque de perte de chiffre. Tout le
            reste découlait de ça.
          </p>

          <p className="mb-8">
            Si j'étais resté sur « améliorer la performance », j'aurais proposé de la formation ou du
            coaching. Rien de faux, mais à côté de la cible. Le vrai besoin était ailleurs.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            2. Quantification : mesurer l'écart avec des chiffres
          </h3>

          <p className="mb-8">
            Une fois le vrai problème identifié, il faut le chiffrer. Combien coûte ce problème au client
            chaque mois ? Combien de chiffre d'affaires perdu ? Combien d'heures passées à éteindre des
            incendies ?
          </p>

          <p className="mb-8">
            C'est l'étape la plus négligée par les commerciaux. Ils creusent le problème, ils le comprennent,
            mais ils ne le mesurent pas. Or sans chiffres, le problème reste une impression. Avec des
            chiffres, il devient une évidence que le client ne peut plus ignorer.
          </p>

          <p className="mb-8">
            Dans l'exemple de la PME industrielle, on a chiffré le coût du départ du commercial : perte
            estimée sur les comptes clés, temps du dirigeant pour gérer la transition, risque de perdre
            deux clients stratégiques. Quand le dirigeant a vu le chiffre, il a dit : « OK, on ne peut pas
            se permettre d'attendre. »
          </p>

          {/* Mid-article CTA : Quantification → Bootcamp */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              🎯 Vous voulez que vos équipes maîtrisent la quantification du gap ?
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente vous donne les outils pour passer de l'intuition à la mesure
              concrète, avec des grilles de quantification et des exercices terrain.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp →
            </Link>
          </div>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            3. Amplification : faire ressentir l'urgence
          </h3>

          <p className="mb-8">
            Amplifier, ce n'est pas faire peur. C'est aider le client à visualiser les conséquences de
            l'inaction dans le temps. Qu'est-ce qui se passe si on ne fait rien dans trois mois ? Dans six
            mois ? Quel est le coût réel de l'attente ?
          </p>

          <p className="mb-8">
            Cette étape est délicate parce qu'elle demande du tact. Si vous forcez trop, vous devenez un
            vendeur qui met la pression. Si vous ne forcez pas assez, le client repart dans son confort et
            le dossier s'endort.
          </p>

          <p className="mb-8">
            Le bon niveau, c'est de poser la question et de laisser le client répondre. « Si on ne fait rien
            dans les six mois qui viennent, qu'est-ce que ça change pour vous ? » C'est lui qui doit dire
            ce qu'il risque. Pas vous.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            4. Alignement : montrer que votre solution comble le fossé
          </h3>

          <p className="mb-8">
            C'est seulement maintenant qu'on parle de solution. Et on ne parle pas de toutes les
            fonctionnalités. On montre précisément comment ce qu'on propose comble chaque partie du
            fossé qu'on a mesuré ensemble.
          </p>

          <p className="mb-8">
            L'alignement, c'est le moment où le client ne se demande pas « est-ce que ça vaut le coup ? »
            parce qu'il a déjà répondu tout seul à cette question pendant les trois étapes précédentes. Il
            sait combien le problème lui coûte. Il sait ce qu'il perd à ne rien faire. Il n'attend plus de
            vous que la confirmation que votre solution tient la route.
          </p>

          {/* ──────────────── Erreurs fatales ──────────────── */}
          <h2 id="erreurs" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les erreurs qui tuent Gap Selling sur le terrain
          </h2>

          <p className="mb-8">
            J'ai vu des équipes adopter la méthode avec enthousiasme, puis revenir trois mois plus tard en
            disant « ça ne marche pas ». Dans neuf cas sur dix, ce n'est pas la méthode le problème. Ce
            sont des erreurs d'application.
          </p>

          <p className="mb-4">
            <strong>Erreur 1 : creuser pour faire joli, puis pitcher pareil.</strong>
            Le commercial fait une belle phase de découverte, prend des notes, hoche la tête : puis sort
            exactement la même proposition qu'il avait préparée avant le rendez-vous. Le client sent le
            décalage. La confiance est cassée.
          </p>

          <p className="mb-4">
            <strong>Erreur 2 : ne pas quantifier.</strong>
            Sans chiffres, le gap reste une idée. Un problème vague ne déclenche pas une décision. C'est
            la différence entre « on perd du temps sur la saisie des commandes » et « on perd 12 heures
            par semaine, soit l'équivalent de 30 000 euros par an ». Le premier se discute. Le second se
            décide.
          </p>

          <p className="mb-4">
            <strong>Erreur 3 : amplifier sans avoir la légitimité.</strong>
            Si vous arrivez chez le client et que vous lui dites tout de suite « votre problème est grave,
            vous perdez de l'argent », vous passez pour un commercial qui force. L'amplification ne marche
            que si elle vient après une découverte réelle, où le client a lui-même exposé son problème.
          </p>

          <p className="mb-4">
            <strong>Erreur 4 : aligner trop tôt.</strong>
            On a hâte de montrer qu'on a la solution. C'est humain. Mais si le client n'a pas encore
            pleinement conscience de son gap, votre solution arrive trop tôt. Elle tombe à côté. Laissez
            le client arriver seul à la conclusion qu'il doit agir.
          </p>

          <p className="mb-8">
            <strong>Erreur 5 : ne pas vérifier le vrai décideur.</strong>
            Vous pouvez creuser le plus beau gap du monde avec un interlocuteur qui n'a pas le pouvoir de
            décider. Vous formez quelqu'un qui devra convaincre quelqu'un d'autre. Ça peut marcher, mais
            c'est beaucoup plus dur. Dès la phase de découverte, identifiez qui tranche vraiment.
          </p>

          {/* ──────────────── Cas PME ──────────────── */}
          <h2 id="cas-pme" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Un cas concret : la PME de services qui recrutait au hasard
          </h2>

          <p className="mb-8">
            Une PME de services de 40 personnes en région. Le dirigeant me contacte parce que son équipe
            commerciale plafonne. Il pense qu'il faut les former à la prospection. C'est sa lecture.
          </p>

          <p className="mb-8">
            On creuse. Le problème n'est pas la prospection. L'équipe passe son temps à gérer des dossiers
            mal qualifiés. Les deux dernières recrues commerciales n'étaient pas adaptées. Le turnover a
            coûté cher en temps de management et en clients perdus.
          </p>

          <p className="mb-8">
            On quantifie. Le coût des deux mauvais recrutements sur 18 mois : salaires + temps manager +
            clients perdus = environ 140 000 euros. Le dirigeant ne l'avait jamais calculé. Il pensait que
            « ça arrive ».
          </p>

          <p className="mb-8">
            On amplifie : si on continue comme ça, dans deux ans, c'est la même chose, avec des équipes
            qui tournent et un dirigeant qui passe son temps à recrutter au lieu de développer l'activité.
          </p>

          <p className="mb-8">
            L'alignement : ce qu'on a mis en place, un process de recrutement commercial structuré, des
            grilles d'évaluation, un onboarding cadré. Pas de formation à la prospection. Le vrai problème
            n'était pas là.
          </p>

          <p className="mb-8">
            Résultat : l'équipe stabilisée, les bonnes recrues, et une croissance de 25% du chiffre d'affaires
            sur les 12 mois suivants. Le dirigeant m'a dit : « On aurait dû creuser ça il y a deux ans. »
          </p>

          {/* ──────────────── CTA ──────────────── */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous voulez savoir si vos équipes creusent vraiment le problème : ou si elles vendent dans le vide ?
            </h3>
            <p className="mb-6">
              Beaucoup de dirigeants pensent que leurs commerciaux doivent mieux connaître le produit ou être plus
              persuasifs. Le vrai frein est souvent ailleurs : ils ne savent pas creuser le problème en profondeur,
              mesurer l'écart et créer l'urgence. Un diagnostic permet de voir où ça coince vraiment dans votre cycle.
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
                Découvrir le Bootcamp Méthodes de vente
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
                Gap Selling, c'est différent de SPIN Selling ?
              </p>
              <p className="text-gray-700">
                Oui et non. Les deux méthodes reposent sur une découverte profonde. SPIN structure les
                questions par type (Situation, Problème, Implication, Nécessité). Gap Selling met davantage
                l'accent sur la quantification de l'écart et l'amplification des conséquences. Dans la
                pratique, elles se complètent bien. J'utilise parfois SPIN pour la trame des questions et
                Gap Selling pour le cadrage global du cycle.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Est-ce que Gap Selling marche pour tous les types de vente ?
              </p>
              <p className="text-gray-700">
                C'est le plus pertinent pour les cycles longs, les décisions impliquant plusieurs parties
                prenantes, et les solutions à forte valeur ajoutée. Sur une vente simple en one-shot, la
                méthode peut être trop lourde. Mais dans 80% des contextes B2B où j'interviens, elle est
                parfaitement adaptée.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Combien de temps faut-il pour former une équipe à Gap Selling ?
              </p>
              <p className="text-gray-700">
                La compréhension prend une journée. L'application réelle prend trois à six mois, avec du
                coaching terrain. Le plus dur n'est pas de comprendre la méthode : c'est de désapprendre
                le réflexe de pitcher trop tôt.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Comment éviter que la méthode sonne comme une manipulation ?
              </p>
              <p className="text-gray-700">
                La différence entre une méthode et une manipulation, c'est l'intention. Si vous creusez
                pour vendre, le client le sent. Si vous creusez pour comprendre vraiment, le client le
                sent aussi. Et il achète plus volontiers à quelqu'un qui a pris le temps de comprendre
                avant de proposer.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Où trouver le livre Gap Selling de Keenan ?
              </p>
              <p className="text-gray-700">
                Vous pouvez consulter{' '}
                <Link
                  href="/ressources/meilleurs-livres/methodes-process/gap-selling"
                  className="text-blue-ink font-semibold underline hover:text-mint-green"
                >
                  la fiche dédiée au livre Gap Selling
                </Link>{' '}
                sur le site, avec le résumé complet et les points clés.
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
                  href="/ressources/meilleurs-livres/methodes-process/gap-selling"
                  className="text-mint-green hover:underline font-medium"
                >
                  Gap Selling : la fiche livre complète
                </Link>
                <span className="text-gray-500">
                  {' '}: Pour creuser le concept et accéder à la bibliographie.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/challenger-sales-methode-terrain-b2b"
                  className="text-mint-green hover:underline font-medium"
                >
                  Challenger Sales appliqué au terrain B2B
                </Link>
                <span className="text-gray-500">
                  {' '}: La méthode complémentaire pour oser la tension constructive.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/dilemme-innovateur-vente-b2b"
                  className="text-mint-green hover:underline font-medium"
                >
                  Le dilemme de l&apos;innovateur en vente B2B
                </Link>
                <span className="text-gray-500">
                  {' '}: Pourquoi le diagnostic commence par accepter que vos méthodes actuelles vous rendent vulnérable.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre"
                  className="text-mint-green hover:underline font-medium"
                >
                  Vente consultative B2B : devenir le conseiller qu'on ne veut pas perdre
                </Link>
                <span className="text-gray-500">
                  {' '}: Le socle de la posture de diagnosticien.
                </span>
              </li>
            </ul>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            Le problème que vous vendez n'est probablement pas le bon. Posez trois questions de plus. Le vrai
            fossé est juste derrière.
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
            Si votre cas mérite un échange plus direct, vous pouvez aussi laisser un message ici.
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
