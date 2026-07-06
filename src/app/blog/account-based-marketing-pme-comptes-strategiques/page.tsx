import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Account-Based Marketing PME : 3 comptes avant 50, la discipline qui change tout | Laurent Serre',
  description:
    "L'ABM pour une PME n'est pas une machine marketing. C'est la discipline de traiter quelques comptes stratégiques autrement que des prospects de plus. Le guide pragmatique.",
  keywords:
    'account based marketing PME, ABM PME, comptes stratégiques, marketing B2B PME, prospection ciblée, développement commercial comptes clés',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/account-based-marketing-pme-comptes-strategiques',
  },
  openGraph: {
    title: 'Account-Based Marketing PME : 3 comptes avant 50, la discipline qui change tout',
    description:
      "L'ABM pour une PME n'est pas une machine marketing. C'est la discipline de traiter quelques comptes stratégiques autrement que des prospects de plus.",
    url: 'https://www.laurentserre.com/blog/account-based-marketing-pme-comptes-strategiques',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/account-based-marketing-pme-comptes-strategiques/hero.webp',
        width: 1536,
        height: 1024,
        alt: "Un dirigeant de PME devant un tableau blanc avec trois comptes stratégiques ciblés, planifiant une approche commerciale personnalisée",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Account-Based Marketing PME : 3 comptes avant 50, la discipline qui change tout',
    description:
      "L'ABM pour une PME n'est pas une machine marketing. C'est la discipline de traiter quelques comptes stratégiques autrement que des prospects de plus.",
    images: ['https://www.laurentserre.com/images/blog/account-based-marketing-pme-comptes-strategiques/hero.webp'],
  },
};

export default function AccountBasedMarketingPMEPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline:
          "Account-Based Marketing PME : 3 comptes avant 50, la discipline qui change tout",
        description:
          "L'ABM pour une PME n'est pas une machine marketing. C'est la discipline de traiter quelques comptes stratégiques autrement que des prospects de plus.",
        image:
          'https://www.laurentserre.com/images/blog/account-based-marketing-pme-comptes-strategiques/hero.webp',
        datePublished: '2026-07-06',
        dateModified: '2026-07-06',
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
            'https://www.laurentserre.com/blog/account-based-marketing-pme-comptes-strategiques',
        },
        articleSection: 'Stratégie & Croissance / ABM',
        keywords: [
          'account based marketing PME',
          'ABM PME',
          'comptes stratégiques',
          'marketing B2B PME',
          'prospection ciblée',
        ],
      },
      {
        '@type': 'WebPage',
        '@id':
          'https://www.laurentserre.com/blog/account-based-marketing-pme-comptes-strategiques',
      },
      {
        '@type': 'FAQPage',
        '@id':
          'https://www.laurentserre.com/blog/account-based-marketing-pme-comptes-strategiques#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: "C'est quoi l'Account-Based Marketing pour une PME, concrètement ?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "L'ABM pour une PME, ce n'est pas une machine marketing sophistiquée. C'est la discipline de traiter quelques comptes stratégiques , pas plus de trois au départ , avec une approche personnalisée : comprendre l'entreprise, cartographier ses décideurs, trouver un angle d'entrée légitime, et assurer un suivi cohérent dans la durée. Pas de campagne de masse, pas d'outil coûteux : du travail commercial structuré.",
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre une liste de comptes et un vrai travail ABM ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Avoir vingt comptes dans un fichier CRM ne veut pas dire qu'on les travaille. Une liste, c'est du ciblage. Le travail de compte, c'est décider qui porte chaque compte, quelle raison d'approche est crédible, quel sujet mérite une prise de parole, et quelle prochaine étape on cherche vraiment. Pas « envoyer quelque chose » ou « relancer dans quinze jours » : une vraie raison d'entrer en relation, construite à partir d'une lecture du compte.",
            },
          },
          {
            '@type': 'Question',
            name: 'Peut-on faire de l\'ABM dans une PME sans budget marketing ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Oui, et c'est même le plus souvent comme ça que ça commence. Un tableur partagé, LinkedIn pour la recherche de signaux, une réunion hebdomadaire entre le commercial et le responsable marketing. L'ABM « scrappy » , avec les moyens du bord , est plus solide que l'ABM plaqué avec une plateforme enterprise qu'on n'utilise pas. Le vrai investissement n'est pas dans l'outil : il est dans le temps de compréhension du compte.",
            },
          },
          {
            '@type': 'Question',
            name: 'Combien de comptes faut-il cibler au lancement ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Trois. Pas cinquante. Trois comptes sur lesquels l'équipe accepte de faire le travail correctement : comprendre, cartographier, trouver un angle légitime, produire une approche utile, suivre dans la durée. Si l'exercice est trop lourd sur trois comptes, il sera faux sur trente. Le test des 3 comptes est un révélateur impitoyable de votre discipline commerciale réelle.",
            },
          },
          {
            '@type': 'Question',
            name: 'Comment savoir si un compte mérite une approche ABM ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "La question à se poser est simple : est-ce que ce compte, si on arrivait à entrer chez lui proprement, changerait vraiment quelque chose pour nous ? Pas en termes de vanity metrics, mais en impact réel sur le chiffre d'affaires, la référence, ou l'accès à un marché. Un compte stratégique se reconnaît à ça : il ne peut pas être traité comme tout le monde sans laisser passer une opportunité.",
            },
          },
          {
            '@type': 'Question',
            name: "L'ABM remplace-t-il la prospection classique ?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Non. L'ABM et la prospection volume sont deux outils différents. La prospection classique reste nécessaire pour remplir le haut du funnel et générer des opportunités. L'ABM vient sur les comptes stratégiques, ceux qui méritent un traitement différent. Le piège serait de vouloir faire de l'ABM sur tous vos prospects : vous finirez par ne plus faire ni l'un ni l'autre correctement.",
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
            name: 'Account-Based Marketing PME',
            item: 'https://www.laurentserre.com/blog/account-based-marketing-pme-comptes-strategiques',
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
              <li className="text-blue-ink font-medium" aria-current="page">Account-Based Marketing PME</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Stratégie & Croissance / ABM
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Un compte stratégique ne se travaille pas comme un prospect de plus
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
              <time dateTime="2026-07-06">6 juillet 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/account-based-marketing-pme-comptes-strategiques/hero.webp"
              alt="Un dirigeant de PME devant un tableau blanc avec trois comptes stratégiques ciblés, planifiant une approche commerciale personnalisée"
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
              L'Account-Based Marketing pour une PME n'a rien à voir avec une machine marketing sophistiquée.
              C'est une discipline commerciale simple : identifier les comptes qui comptent vraiment, arrêter
              de les traiter comme des prospects ordinaires, et accepter de ralentir pour construire une vraie
              approche. Ce guide vous donne le cadre pour commencer avec trois comptes, sans outil coûteux,
              et vérifier que votre équipe est prête à faire le travail.
            </p>
          </div>

          {/* Badge CTA */}
          <div className="mb-8 text-center mt-8">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vous ne savez pas quels comptes méritent une approche ABM ? Faites un diagnostic →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#constat" className="text-mint-green hover:underline">Le constat qui ne devrait pas vous surprendre</a></li>
              <li><a href="#confusion" className="text-mint-green hover:underline">La confusion : liste de noms ne veut pas dire travail de compte</a></li>
              <li><a href="#travailler" className="text-mint-green hover:underline">Ce que travailler un compte veut dire</a></li>
              <li><a href="#abm-pme" className="text-mint-green hover:underline">L'ABM pour PME sans machine marketing</a></li>
              <li><a href="#test-3-comptes" className="text-mint-green hover:underline">Le test des 3 comptes</a></li>
              <li><a href="#vraie-question" className="text-mint-green hover:underline">La vraie question à se poser</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">Questions fréquentes</a></li>
            </ul>
          </div>

          {/* ──────────────── Constat ──────────────── */}
          <h2 id="constat" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le constat qui ne devrait pas vous surprendre
          </h2>

          <p className="mb-4">
            C'est une conversation que j'ai eue des dizaines de fois.
          </p>

          <p className="mb-4">
            Un dirigeant regarde son marché et dit : « Ces dix entreprises-là, si on arrivait à entrer chez elles proprement, ça changerait vraiment quelque chose. »
          </p>

          <p className="mb-4">
            Puis, dans les faits, rien ne change vraiment.
          </p>

          <p className="mb-4">
            Ces comptes sont dans le CRM. Ils sont dans une liste. Ils ressortent en réunion commerciale de temps en temps. Un commercial a peut-être envoyé un message LinkedIn. Quelqu'un connaît peut-être quelqu'un. On se dit qu'il faudrait les travailler.
          </p>

          <p className="mb-8">
            Mais ils restent traités comme des prospects ordinaires.
          </p>

          <p className="mb-4">
            Le mot ABM donne parfois l'impression qu'il faut une grosse machine marketing. Des outils, des campagnes, des tableaux de ciblage, des séquences, des contenus personnalisés à grande échelle.
          </p>

          <p className="mb-8">
            Dans une PME, ce n'est pas comme ça que le sujet commence.
          </p>

          <p className="mb-8">
            Il commence par une insatisfaction silencieuse : celle de voir des comptes qui devraient être gagnés rester dans le statu quo, traités par le même processus standardisé que tous les autres.
          </p>

          {/* ──────────────── Confusion ──────────────── */}
          <h2 id="confusion" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La confusion : liste de noms ne veut pas dire travail de compte
          </h2>

          <p className="mb-4">
            C'est là que la confusion commence.
          </p>

          <p className="mb-4">
            Un compte stratégique ne se travaille pas avec la même logique qu'un prospect de plus dans une campagne.
          </p>

          <p className="mb-8">
            Si l'entreprise compte vraiment, il faut accepter de ralentir au départ. Comprendre pourquoi ce compte est prioritaire. Ce qui se joue chez lui. Qui influence vraiment la décision. Ce qui a déjà été tenté. Pourquoi ça n'a pas pris. Quel signal rend le moment plus intéressant aujourd'hui qu'il y a six mois.
          </p>

          <p className="mb-4">
            Ce travail paraît moins spectaculaire qu'une campagne. Mais c'est souvent lui qui évite de griller l'entrée.
          </p>

          <p className="mb-8">
            Dans beaucoup de PME, on confond ciblage et liste de noms. Avoir vingt comptes dans un fichier ne veut pas dire qu'on les travaille.
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li><strong>Faire une liste</strong> : exporter 50 noms du CRM, les donner à un commercial, attendre.</li>
            <li><strong>Travailler un compte</strong> : comprendre son organisation, cartographier ses décideurs, trouver un angle d'entrée crédible, produire une approche qui a du sens pour eux, suivre dans la durée.</li>
          </ul>

          <p className="mb-8">
            La différence n'est pas subtile : elle est structurelle. Et elle sépare ceux qui font du vrai ABM de ceux qui changent juste le nom de leur prospection.
          </p>

          {/* ──────────────── Ce que travailler un compte veut dire ──────────────── */}
          <h2 id="travailler" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que travailler un compte veut dire
          </h2>

          <p className="mb-4">
            Les travailler, c'est décider qui porte chaque compte, quelle raison d'approche est crédible, quel sujet mérite une prise de parole, et quelle prochaine étape on cherche vraiment.
          </p>

          <p className="mb-4">
            Pas « envoyer quelque chose ».
          </p>

          <p className="mb-4">
            Pas « relancer dans quinze jours ».
          </p>

          <p className="mb-8">
            Une vraie raison d'entrer en relation.
          </p>

          <p className="mb-4">
            Concrètement, ça veut dire quatre choses :
          </p>

          <p className="mb-4">
            <strong>1. Comprendre le compte.</strong> Pas son chiffre d'affaires sur LinkedIn. Son modèle économique, ses contraintes, ses priorités du moment. Qu'est-ce qui fait qu'aujourd'hui, il pourrait être plus réceptif qu'il y a six mois ? Quel signal externe (recrutement, levée de fonds, restructuration, nouveau produit) crée une fenêtre ?
          </p>

          <p className="mb-4">
            <strong>2. Cartographier les décideurs.</strong> Qui décide vraiment ? Qui influence sans décider ? Qui bloque sans le dire ? Une organisation ne prend pas une décision : des personnes la prennent, chacune avec ses critères. Les connaître séparément, c'est la base du travail de compte.
          </p>

          <p className="mb-4">
            <strong>3. Trouver un angle légitime.</strong> Quelle est la raison pour laquelle ce contact accepterait de prendre du temps avec vous ? Pas « je voudrais vous présenter notre offre » , ça, ils l'entendent dix fois par jour. Mais « j'ai observé X chez vous, je pense que Y peut vous être utile, je vous propose 20 minutes pour vérifier ensemble ».
          </p>

          <p className="mb-4">
            <strong>4. Produire une approche utile.</strong> Un contenu, un point de vue, une analyse qui apporte quelque chose au compte. Pas une brochure. Pas une démo. Quelque chose qui fait dire au décideur : « Cette personne a pris le temps de comprendre mon univers. »
          </p>

          <p className="mb-8">
            Ce n'est pas de la séduction. C'est du travail commercial de fond. Et ça ne se fait pas à la chaîne.
          </p>

          {/* ──────────────── ABM pour PME ──────────────── */}
          <h2 id="abm-pme" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L'ABM pour PME sans machine marketing
          </h2>

          <p className="mb-4">
            L'Account-Based Marketing, pour une PME, n'a pas besoin de ressembler à ce que font les grands groupes.
          </p>

          <p className="mb-4">
            Il doit surtout obliger marketing et commercial à arrêter de fonctionner chacun de son côté.
          </p>

          <p className="mb-8">
            Le marketing ne produit pas du contenu « pour le marché ». Il aide à ouvrir un sujet utile pour quelques comptes précis.
          </p>

          <p className="mb-8">
            Le commercial ne part pas seul avec son instinct. Il arrive avec une lecture du compte, des signaux, des personnes à comprendre, et une hypothèse commerciale à vérifier.
          </p>

          <p className="mb-4">
            C'est moins volumique. Mais souvent beaucoup plus sérieux.
          </p>

          <p className="mb-4">
            Concrètement, dans une PME, ça peut ressembler à ça :
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li>Un tableur partagé entre le responsable marketing et les commerciaux, avec les 3 à 5 comptes prioritaires</li>
            <li>Une réunion hebdomadaire de 30 minutes pour suivre les signaux (recrutements, actualités, mouvements) sur chaque compte</li>
            <li>Un contenu personnalisé par compte , pas une campagne automation</li>
            <li>Un suivi des interactions dans le CRM, mais pas pour le reporting : pour la cohérence de la relation</li>
            <li>LinkedIn comme source de signaux, pas comme canal de spam</li>
          </ul>

          <p className="mb-8">
            Pas besoin de plateforme à 30 000 € par an. Besoin de discipline et de régularité.
          </p>

          <p className="mb-4">
            Le piège serait de transformer l'ABM en nouvelle méthode à la mode. On change le vocabulaire, on garde les mêmes réflexes : une liste, une séquence, trois messages, un peu de personnalisation, puis on passe au suivant.
          </p>

          <p className="mb-8">
            Ce n'est pas du travail de compte. C'est de la prospection classique avec un nom plus élégant.
          </p>

          <p className="mb-8">
            Un compte stratégique demande une autre exigence : de la patience, de la cohérence, et une présence qui ne dépend pas seulement de l'humeur commerciale du mois.
          </p>

          {/* ──────────────── Test des 3 comptes ──────────────── */}
          <h2 id="test-3-comptes" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le test des 3 comptes
          </h2>

          <p className="mb-4">
            On peut très bien commencer petit.
          </p>

          <p className="mb-4">
            Trois comptes.
          </p>

          <p className="mb-4">
            Pas cinquante.
          </p>

          <p className="mb-8">
            Trois comptes sur lesquels l'équipe accepte de faire le travail correctement : comprendre, cartographier, trouver un angle légitime, produire une approche utile, suivre dans la durée.
          </p>

          <p className="mb-4">
            Si l'exercice est trop lourd sur trois comptes, il sera faux sur trente.
          </p>

          <p className="mb-8">
            C'est le test le plus simple et le plus honnête de la maturité ABM d'une équipe. Si vous n'arrivez pas à faire le travail sur trois comptes pendant trois mois, vous n'avez pas un problème d'outil : vous avez un problème de discipline commerciale.
          </p>

          <p className="mb-4">
            Les questions à se poser avant de passer à l'échelle :
          </p>

          <ul className="space-y-2 mb-8 text-gray-700">
            <li>Est-ce que chaque compte a un porteur identifié ?</li>
            <li>Est-ce que le marketing peut produire du contenu utile pour ces comptes précis ?</li>
            <li>Est-ce que les réunions de suivi sont régulières, ou est-ce qu'elles disparaissent dès que ça presse ailleurs ?</li>
            <li>Est-ce que l'équipe sait identifier un vrai signal sur un compte, ou est-ce qu'elle reste dans la recherche d'information superficielle ?</li>
            <li>Est-ce que les décideurs des comptes cibles pourraient dire, au bout de trois mois, que votre approche était différente ?</li>
          </ul>

          <p className="mb-8">
            Si la réponse à ces questions n'est pas clairement positive, continuer à ajouter des comptes ne fera qu'amplifier le problème.
          </p>

          {/* Mid-article CTA */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              🎯 Vous voulez structurer votre approche des comptes stratégiques ?
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp commercial de Laurent Serre vous donne le cadre pour passer de l'intuition à une discipline commerciale structurée. Trois jours pour transformer votre approche des comptes clés.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp commercial →
            </Link>
          </div>

          {/* ──────────────── La vraie question ──────────────── */}
          <h2 id="vraie-question" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La vraie question à se poser
          </h2>

          <p className="mb-4">
            La vraie question n'est pas : avons-nous un dispositif ABM ?
          </p>

          <p className="mb-8">
            La vraie question est plus simple :
          </p>

          <p className="mb-4 text-xl font-semibold text-blue-ink">
            « Quels comptes méritent vraiment qu'on arrête de les traiter comme tout le monde ? »
          </p>

          <p className="mb-8">
            Et : « Sommes-nous prêts à faire le travail commercial que cette réponse exige ? »
          </p>

          <p className="mb-4">
            L'ABM n'est pas un programme qu'on lance. C'est une discipline qu'on choisit d'appliquer à quelques comptes, ceux qui en valent vraiment la peine.
          </p>

          <p className="mb-4">
            Et comme toute discipline, elle se prouve par l'exécution, pas par l'intention.
          </p>

          <p className="mb-8">
            Commencez par trois comptes. Faites le travail. Regardez ce qui se passe. Et si le test est concluant, alors seulement, posez-vous la question de l'échelle.
          </p>

          {/* ──────────────── CTA final ──────────────── */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Quels comptes méritent vraiment qu'on arrête de les traiter comme tout le monde ?
            </h3>
            <p className="mb-6">
              Beaucoup de dirigeants pensent qu'il faut un outil ou une campagne. La vraie clé est ailleurs :
              un diagnostic commercial permet d'identifier les 3 à 5 comptes stratégiques qui méritent une
              approche différenciée. Pas de méthode plaquée, pas de promesses en l'air : un regard terrain
              sur votre portefeuille.
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
                C'est quoi l'Account-Based Marketing pour une PME, concrètement ?
              </p>
              <p className="text-gray-700">
                L'ABM pour une PME, ce n'est pas une machine marketing sophistiquée. C'est la discipline
                de traiter quelques comptes stratégiques , pas plus de trois au départ , avec une approche
                personnalisée : comprendre l'entreprise, cartographier ses décideurs, trouver un angle
                d'entrée légitime, et assurer un suivi cohérent dans la durée. Pas de campagne de masse,
                pas d'outil coûteux : du travail commercial structuré.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Quelle est la différence entre une liste de comptes et un vrai travail ABM ?
              </p>
              <p className="text-gray-700">
                Avoir vingt comptes dans un fichier CRM ne veut pas dire qu'on les travaille. Une liste,
                c'est du ciblage. Le travail de compte, c'est décider qui porte chaque compte, quelle
                raison d'approche est crédible, quel sujet mérite une prise de parole, et quelle prochaine
                étape on cherche vraiment. Pas « envoyer quelque chose » ou « relancer dans quinze jours » :
                une vraie raison d'entrer en relation, construite à partir d'une lecture du compte.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Peut-on faire de l'ABM dans une PME sans budget marketing ?
              </p>
              <p className="text-gray-700">
                Oui, et c'est même le plus souvent comme ça que ça commence. Un tableur partagé, LinkedIn
                pour la recherche de signaux, une réunion hebdomadaire entre le commercial et le responsable
                marketing. L'ABM « scrappy » , avec les moyens du bord , est plus solide que l'ABM plaqué
                avec une plateforme enterprise qu'on n'utilise pas. Le vrai investissement n'est pas dans
                l'outil : il est dans le temps de compréhension du compte.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Combien de comptes faut-il cibler au lancement ?
              </p>
              <p className="text-gray-700">
                Trois. Pas cinquante. Trois comptes sur lesquels l'équipe accepte de faire le travail
                correctement : comprendre, cartographier, trouver un angle légitime, produire une approche
                utile, suivre dans la durée. Si l'exercice est trop lourd sur trois comptes, il sera faux
                sur trente. Le test des 3 comptes est un révélateur impitoyable de votre discipline
                commerciale réelle.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                Comment savoir si un compte mérite une approche ABM ?
              </p>
              <p className="text-gray-700">
                La question à se poser est simple : est-ce que ce compte, si on arrivait à entrer chez lui
                proprement, changerait vraiment quelque chose pour nous ? Pas en termes de vanity metrics,
                mais en impact réel sur le chiffre d'affaires, la référence, ou l'accès à un marché. Un
                compte stratégique se reconnaît à ça : il ne peut pas être traité comme tout le monde sans
                laisser passer une opportunité.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-ink mb-1">
                L'ABM remplace-t-il la prospection classique ?
              </p>
              <p className="text-gray-700">
                Non. L'ABM et la prospection volume sont deux outils différents. La prospection classique
                reste nécessaire pour remplir le haut du funnel et générer des opportunités. L'ABM vient
                sur les comptes stratégiques, ceux qui méritent un traitement différent. Le piège serait
                de vouloir faire de l'ABM sur tous vos prospects : vous finirez par ne plus faire ni l'un
                ni l'autre correctement.
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
                  href="/blog/comptes-strategiques-dormants-relance-dirigeant"
                  className="text-mint-green hover:underline font-medium"
                >
                  Comptes stratégiques dormants : relance dirigeant
                </Link>
                <span className="text-gray-500">
                  {' '}: Vos comptes dormants sont les premiers candidats à une approche ABM structurée.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/strategie-commerciale-pme-cadre-une-page"
                  className="text-mint-green hover:underline font-medium"
                >
                  Stratégie commerciale PME : le cadre en une page
                </Link>
                <span className="text-gray-500">
                  {' '}: L'ABM est une décision stratégique qui mérite un cadre clair avant de commencer.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre"
                  className="text-mint-green hover:underline font-medium"
                >
                  Pipeline commercial PME : construire un outil qui prédit vraiment votre chiffre
                </Link>
                <span className="text-gray-500">
                  {' '}: L'ABM change la lecture du pipeline , chaque compte stratégique devient une ligne à part entière.
                </span>
              </li>
            </ul>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            L'ABM n'est pas un programme qu'on lance. C'est une discipline qu'on choisit d'appliquer à quelques comptes, ceux qui en valent vraiment la peine. Et comme toute discipline, elle se prouve par l'exécution, pas par l'intention.
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
