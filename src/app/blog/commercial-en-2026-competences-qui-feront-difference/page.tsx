import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const heroImage = '/images/blog/commercial-en-2026-competences-qui-feront-difference/commercial-2026-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/commercial-en-2026-competences-qui-feront-difference/commercial-2026-hero.webp';

export const metadata: Metadata = {
  title: 'Commercial en 2026 : les compétences clés',
  description:
    'Les commerciaux qui cartonnent en 2026 ne sont pas ceux qui maîtrisent 50 techniques. Ce sont ceux qui savent préparer avec l\'IA, diagnostiquer avant de pitcher, gérer l\'indécision, prioriser avec les données et résister au bruit.',
  keywords:
    'compétences commerciales 2026, commercial en 2026, métier commercial évolution, ia prospection commerciale, vendeur b2b compétences, closing b2b 2026, acheteur b2b comportement 2026',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/commercial-en-2026-competences-qui-feront-difference',
  },
  openGraph: {
    title: 'Être commercial en 2026 : les compétences qui feront la différence',
    description:
      'Les commerciaux qui cartonnent en 2026 ne sont pas ceux qui maîtrisent 50 techniques. Ce sont ceux qui savent préparer, diagnostiquer, gérer l\'indécision et prioriser avec les données.',
    url: 'https://www.laurentserre.com/blog/commercial-en-2026-competences-qui-feront-difference',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Être commercial en 2026 : orientation et nouvelles compétences - Laurent Serre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Être commercial en 2026 : les compétences qui feront la différence',
    description:
      'Les commerciaux qui cartonnent en 2026 ne sont pas ceux qui maîtrisent 50 techniques.',
    images: [heroImageAbsolute],
  },
};

export default function Commercial2026CompetencesPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Être commercial en 2026 : les compétences qui feront la différence',
    description:
      'Les commerciaux qui cartonnent en 2026 ne sont pas ceux qui maîtrisent 50 techniques. Ce sont ceux qui savent préparer avec l\'IA, diagnostiquer avant de pitcher, gérer l\'indécision des acheteurs, prioriser avec les données et résister au bruit.',
    image: heroImageAbsolute,
    datePublished: '2026-06-04',
    dateModified: '2026-06-04',
    dateCreated: '2026-06-04',
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
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.laurentserre.com/blog/commercial-en-2026-competences-qui-feront-difference',
    },
    articleSection: 'Performance commerciale / Compétences et évolution du métier',
    keywords: [
      'compétences commerciales 2026',
      'commercial en 2026',
      'métier commercial évolution',
      'ia prospection commerciale',
      'vendeur b2b compétences',
      'closing b2b 2026',
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Compétences commerciales 2026', 'item': 'https://www.laurentserre.com/blog/commercial-en-2026-competences-qui-feront-difference' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quelles sont les compétences clés d\'un commercial en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cinq compétences se démarquent : préparer chaque interaction avec l\'IA sans perdre la dimension humaine, diagnostiquer avant de pitcher, gérer l\'indécision des acheteurs, utiliser les données pour prioriser et résister au bruit. Aucune n\'est technique. Toutes s\'apprennent sur le terrain.',
        },
      },
      {
        '@type': 'Question',
        name: 'L\'IA remplace-t-elle le commercial en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non. L\'IA remplace les tâches répétitives mais pas l\'observation fine, la gestion de l\'indécision, la priorisation intuitive ni la résistance au bruit. Le commercial de 2026 est un architecte de confiance, pas un exécutant de script.',
        },
      },
      {
        '@type': 'Question',
        name: 'Pourquoi les commerciaux doivent-ils diagnostiquer avant de pitcher ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les prospects arrivent déjà informés. Ce qu\'ils n\'ont pas, c\'est un regard extérieur sur leur propre situation. Un commercial qui commence par diagnostiquer gagne la confiance bien plus vite qu\'une présentation standardisée.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment gérer l\'indécision des acheteurs B2B ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En arrêtant de forcer la décision. Le bon commercial aide l\'acheteur à construire ses arguments pour convaincre en interne. Il accompagne la décision au lieu de la forcer.',
        },
      },
      {
        '@type': 'Question',
        name: 'Les techniques de vente traditionnelles sont-elles encore utiles en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pas vraiment. Le script, le closing en trois étapes, les objections apprises par coeur : l\'IA fait ça. Ce qui fait la différence, c\'est la personnalisation, l\'intuition du vrai blocage et la capacité à prioriser.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment recruter un commercial performant pour 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cherchez quelqu\'un qui sait remettre en question son approche, diagnostiquer avant de conclure, utiliser les données pour prioriser et résister au bruit. Les fiches de poste traditionnelles sont dépassées.',
        },
      },
    ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      

      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">
                Performance commerciale
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Être commercial en 2026 : les compétences qui feront la différence
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
              <time dateTime="2026-06-04">4 juin 2026</time>
              <span>•</span>
              <span>8 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Commercial en 2026 : compétences terrain et évolution du métier"
              width={1536}
              height={1024}
              className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
              quality={60}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      {/* Carrousel BD - accroche visuelle haut d'article */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6">
          <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
            Carrousel BD : Le parcours du commercial qui devient architecte de confiance
          </p>
          <p className="text-sm text-amber-700 mb-5">
            Du vendeur scripté à l'architecte de confiance : 12 planches qui racontent le quotidien d'un commercial qui passe du réflexe à la stratégie, de l'instinct à la préparation, du bruit à la pertinence.
          </p>
          <BDCarousel
            images={[
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-01-cover.webp', alt: 'Cover - Le commercial submerge en 2026', index: 0 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-02-piege-volume.webp', alt: 'Piege IA - Le volume ne remplace pas la pertinence', index: 1 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-03-revelation-ia.webp', alt: 'Revelation - LIA ne fait que le squelette', index: 2 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-04-observer.webp', alt: 'Observer - Je me tais et jobserve', index: 3 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-05-diagnostic.webp', alt: 'Diagnostic - Quest-ce que vous avez deja essaye', index: 4 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-06-indecision.webp', alt: 'Indecision - Gerer lacheteur indecis', index: 5 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-07-donnees.webp', alt: 'Donnees - Prioriser sans se noyer', index: 6 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-08-bruit.webp', alt: 'Bruit - Resister aux distractions', index: 7 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-09-training.webp', alt: 'Training - La nuance qui change tout', index: 8 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-10-rendez-vous.webp', alt: 'Rendez-vous - Le commercial qui ecoute vraiment', index: 9 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-11-resultat.webp', alt: 'Resultat - Vendre sans avoir a forcer', index: 10 },
              { src: '/images/blog/commercial-en-2026-competences-qui-feront-difference/bd-slide-12-cta.webp', alt: 'CTA - Diagnostic offert', index: 11 },
            ]}
            title="Le parcours du commercial en 2026"
            maxPreview={2}
          />
          <div className="mt-4 text-center">
            <Link
              href="/downloads/carrousel-commercial-2026.pdf"
              className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
            >
              Télécharger le PDF (12 planches)
            </Link>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <div className="not-prose mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="bg-gradient-to-r from-amber-50 via-amber-50/80 to-transparent border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
            <p className="text-lg font-semibold text-amber-800 mb-2">Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Le métier de commercial change en profondeur. Pas parce que l'IA remplace les humains, mais parce qu'elle change ce qu'on attend d'eux. Les meilleurs commerciaux de 2026 ne seront pas ceux qui parlent le plus vite ou qui connaissent le mieux leur catalogue. Ce seront ceux qui savent préparer, diagnostiquer, gérer l'indécision, prioriser avec les données et résister au bruit. Cinq compétences. Aucune n'est technique. Toutes s'apprennent.
            </p>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            La semaine dernière, j'ai passé une matinée avec un directeur commercial de 42 ans. Belle carrière, équipe de 18 commerciaux, croissance régulière. Il m'a dit : <em>« Laurent, j'ai l'impression que tout ce que j'ai appris en vente ne sert plus à rien. »</em>
          </p>

          <p className="mb-8">
            Il n'avait pas tort. Et pas raison non plus.
          </p>

          <p className="mb-4">
            Ce qui ne sert plus, c'est le catalogue de techniques. Le script d'appel, le closing à trois pas, la relance formatée, l'enchaînement d'objections appris par coeur. Tout ça, l'IA le fait aussi bien que lui, souvent mieux, et en mille fois moins de temps.
          </p>

          <p className="mb-8">
            Ce qui sert plus que jamais, c'est ce que l'IA ne peut pas faire. Et c'est là que la conversation devient intéressante.
          </p>

          <h2 id="preparer" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Préparez chaque interaction avec l'IA, sans perdre l'humain
          </h2>

          <p className="mb-4">
            Un commercial me dit : <em>« J'utilise ChatGPT pour préparer mes appels. »</em> Je lui demande : <em>« Et tu vérifies quoi après ? »</em> Silence.
          </p>

          <p className="mb-4">
            Voilà le piège de 2026. L'IA génère un message pertinent en quinze secondes. Un argumentaire, une objection anticipée, un plan d'entretien. Tout sonne juste, tout est bien écrit. Et pourtant, rien n'est spécifique. Parce que l'IA ne connaît pas le prospect que vous avez vu hier, celui qui a hésité sur le budget, qui a lancé un regard vers son associé, qui a demandé à <em>« réfléchir »</em>.
          </p>

          <p className="mb-8">
            La compétence nouvelle, ce n'est pas d'utiliser l'IA. C'est de prendre ce qu'elle produit et d'y ajouter ce qu'elle ne voit pas : une observation, un souvenir d'échange, une intuition sur le vrai blocage. L'IA prépare le squelette. Le commercial met la chair. Ceux qui sautent cette étape envoient des messages parfaits qui ne parlent à personne.
          </p>

          <h2 id="diagnostiquer" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Diagnostiquez avant de pitcher
          </h2>

          <p className="mb-4">
            Je vois des commerciaux ouvrir leur présentation au premier rendez-vous. Pas le troisième, pas le deuxième. Le premier. PowerPoint en quinze slides, étude de cas, storytelling calibré. Le prospect écoute poliment, pose deux questions, promet d'y réfléchir.
          </p>

          <p className="mb-4">
            Le problème n'est pas la qualité de la présentation. C'est qu'elle est arrivée trop tôt. Le commercial n'a pas pris le temps de comprendre ce que le prospect avait déjà tenté, ce qui n'avait pas marché, ce qu'il redoutait vraiment.
          </p>

          <p className="mb-8">
            La vente consultative n'est pas une option en 2026. C'est la seule posture qui tienne. Parce que les prospects arrivent mieux informés que jamais. Ils ont déjà lu les comparatifs, les avis, les études. Ce qu'ils n'ont pas, c'est une lecture de leur propre situation. Un regard extérieur qui leur dit : <em>« Voilà ce que je vois de l'extérieur, et ça ressemble à ceci. »</em> Le commercial qui commence par diagnostiquer gagne un temps fou. Parce qu'il ne convainc pas. Il met le problème sur la table et il le rend tangible.
          </p>

          <h2 id="indecision" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Gérez l'indécision des acheteurs, le vrai fléau 2026
          </h2>

          <p className="mb-4">
            Les acheteurs B2B n'ont jamais été aussi indécis. Pas parce qu'ils sont mauvais. Parce qu'ils ont trop d'options, trop de pression, trop de parties prenantes à satisfaire. Leur peur n'est pas de choisir la mauvaise solution. C'est de ne pas pouvoir justifier leur choix en interne.
          </p>

          <p className="mb-4">
            Un commercial qui gère l'indécision ne pousse pas à une décision rapide. Il aide son interlocuteur à construire les arguments qui lui serviront à convaincre les autres. Il prépare le terrain de la validation avec lui. Il ne lui demande pas de signer tout de suite. Il l'aide à répondre à la question que son propre patron va poser : <em>« Pourquoi eux plutôt qu'un autre ? »</em>
          </p>

          <p className="mb-8">
            Les commerciaux qui comprennent ça ne forcent pas le closing. Ils accompagnent la décision. Et ça change tout.
          </p>

          <h2 id="donnees" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Utilisez les données pour prioriser, pas pour noyer
          </h2>

          <p className="mb-4">
            Les CRM n'ont jamais été aussi riches en données. Scores, historiques, comportements, alertes. Et pourtant, beaucoup d'équipes n'en tirent rien. Parce qu'elles regardent tout et ne priorisent rien.
          </p>

          <p className="mb-4">
            La compétence qui va séparer les bons des très bons : savoir ce qu'on ne regarde pas. Sur quels prospects on ne perd plus de temps. Quels signaux sont des vrais indicateurs de passage à l'acte et lesquels ne sont que du bruit.
          </p>

          <p className="mb-8">
            Aujourd'hui, l'IA peut qualifier des centaines de prospects par heure. Mais elle ne peut pas décider que tel compte prioritaire mérite un appel personnel plutôt qu'une séquence automatique. Elle ne peut pas sentir qu'un prospect qui a rouvert trois fois la même page est peut-être juste en train de comparer, pas d'acheter. Le tri, la nuance, l'arbitrage : ça reste du travail humain.
          </p>

          <h2 id="bruit" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Résistez au bruit
          </h2>

          <p className="mb-4">
            Dernière compétence, la plus sous-estimée : la résistance au bruit. Un commercial en 2026 reçoit plus d'informations, plus de sollicitations, plus d'outils, plus de méthodes, plus de <em>« il faut »</em> que jamais. Les nouvelles technologies arrivent chaque mois. Les process changent. Les marchés bougent.
          </p>

          <p className="mb-4">
            Ceux qui tiennent ne sont pas les plus rapides. Ce sont ceux qui gardent le cap. Qui savent dire non à une nouvelle méthode alors que la précédente n'a pas encore porté ses fruits. Qui ne changent pas de priorité chaque semaine. Qui protègent leur agenda des urgences qui n'en sont pas.
          </p>

          <p className="mb-8">
            La discipline, le focus, la constance : c'est moins glamour que l'IA générative ou la nouvelle plateforme de prospection. C'est pourtant ce qui fait la différence entre une équipe qui progresse et une équipe qui s'agite.
          </p>

          {/* CTA highlight */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Le commercial de 2026 est un architecte de confiance, pas un exécutant de script
            </h3>
            <p className="mb-6">
              Les cinq compétences que je viens de décrire ne sont pas dans les fiches de poste que je reçois. Pas une. Les annonces cherchent encore des profils qui savent <em>« pitcher, négocier, conclure »</em>. Comme si l'outil avait changé mais pas le métier.
            </p>
            <p className="mb-6">
              Le métier a changé. Profondément. Et les équipes qui l'ont compris construisent un avantage concurrentiel que les autres mettront deux à trois ans à rattraper. Parce qu'il ne s'achète pas. Il se construit, commercial par commercial, rendez-vous par rendez-vous.
            </p>
            <p className="font-semibold">
              Ce n'est pas une question de génération, de budget ou d'outils. C'est une question de lucidité sur ce que le métier est devenu.
            </p>
          </div>



          {/* FAQ */}
          <div className="bg-gradient-to-r from-blue-ink/5 to-blue-ink/10 border border-blue-ink/10 rounded-2xl p-8 my-12">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">Questions fréquentes</h2>
            <dl className="space-y-6">
              <div>
                <dt className="font-title font-semibold text-blue-ink mb-2">Quelles sont les compétences clés d'un commercial en 2026 ?</dt>
                <dd className="text-gray-600 leading-relaxed">
                  Cinq compétences se démarquent : préparer chaque interaction avec l'IA sans perdre la dimension humaine, diagnostiquer avant de pitcher, gérer l'indécision des acheteurs, utiliser les données pour prioriser et résister au bruit. Aucune n'est technique. Toutes s'apprennent sur le terrain.
                </dd>
              </div>
              <div>
                <dt className="font-title font-semibold text-blue-ink mb-2">L'IA remplace-t-elle le commercial en 2026 ?</dt>
                <dd className="text-gray-600 leading-relaxed">
                  Non. L'IA remplace les tâches répétitives : scripts d'appel, séquences de relance, qualification de masse. Mais elle ne remplace pas l'observation fine d'un prospect, la gestion de l'indécision, la priorisation intuitive, ni la résistance au bruit. Le commercial de 2026 est un <em>architecte de confiance</em>, pas un exécutant de script.
                </dd>
              </div>
              <div>
                <dt className="font-title font-semibold text-blue-ink mb-2">Pourquoi les commerciaux doivent-ils diagnostiquer avant de pitcher ?</dt>
                <dd className="text-gray-600 leading-relaxed">
                  Parce que les prospects arrivent déjà informés : comparatifs, avis, études. Ce qu'ils n'ont pas, c'est un regard extérieur sur leur propre situation. Un commercial qui commence par poser des questions, comprendre les échecs passés et clarifier le vrai besoin gagne la confiance bien plus vite qu'une présentation de 15 slides.
                </dd>
              </div>
              <div>
                <dt className="font-title font-semibold text-blue-ink mb-2">Comment gérer l'indécision des acheteurs B2B ?</dt>
                <dd className="text-gray-600 leading-relaxed">
                  En arrêtant de forcer la décision. Les acheteurs B2B ont peur de ne pas pouvoir justifier leur choix en interne. Le bon commercial les aide à construire leurs propres arguments pour convaincre leurs parties prenantes. Il ne demande pas une signature : il accompagne la décision.
                </dd>
              </div>
              <div>
                <dt className="font-title font-semibold text-blue-ink mb-2">Les techniques de vente traditionnelles sont-elles encore utiles en 2026 ?</dt>
                <dd className="text-gray-600 leading-relaxed">
                  Pas vraiment. Le script d'appel, le closing en trois étapes, les enchaînements d'objections appris par coeur : l'IA fait tout ça aussi bien. Ce qui fait la différence, c'est la capacité à préparer avec l'IA puis à personnaliser, à sentir le vrai blocage sous l'hésitation, à prioriser les bons prospects, et à garder le cap dans un environnement saturé de sollicitations.
                </dd>
              </div>
              <div>
                <dt className="font-title font-semibold text-blue-ink mb-2">Comment recruter un commercial performant pour 2026 ?</dt>
                <dd className="text-gray-600 leading-relaxed">
                  Ne cherchez pas celui qui parle le plus vite ou maîtrise 50 techniques. Cherchez celui qui sait remettre en question son approche, qui diagnostique avant de conclure, qui utilise les données pour prioriser, et qui résiste au bruit. Les fiches de poste traditionnelles ("pitcher, négocier, conclure") sont dépassées.
                </dd>
              </div>
            </dl>
          </div>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-8 my-12">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">Pour aller plus loin</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ia-et-prospection-commerciale-ce-qui-change-vraiment-pour-vos-equipes-en-2026" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  IA et prospection commerciale : ce qui change vraiment pour vos équipes en 2026
                </Link>
              </li>
              <li>
                <Link href="/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  70% des acheteurs B2B ne veulent plus parler aux commerciaux
                </Link>
              </li>
              <li>
                <Link href="/blog/sales-enablement-pme-structurer-performance-commerciale" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  Sales enablement PME : structurer la performance commerciale
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA chute */}
          <div className="flex flex-col sm:flex-row gap-4 my-12">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors text-center"
            >
              Faire un diagnostic offert
            </Link>
            <Link
              href="/coach-commercial-entreprise"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-ink text-base font-medium rounded-full text-blue-ink hover:bg-blue-ink/10 transition-colors text-center"
            >
              Découvrir le coaching terrain
            </Link>
          </div>
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

      <div className="border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuthorCard />
        </div>
      </div>

      <div className="pb-12 text-center">
        <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
          Retour au blog
        </Link>
      </div>
    </main>
  );
}
