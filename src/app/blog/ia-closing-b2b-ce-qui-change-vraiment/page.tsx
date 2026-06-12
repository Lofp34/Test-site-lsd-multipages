import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';
interface BDImage {
  src: string;
  alt: string;
  index: number;
}

const heroImage = '/images/blog/ia-closing-b2b-ce-qui-change-vraiment/ia-closing-b2b-hero.webp';

const carouselPrefix = '/images/blog/ia-closing-b2b-ce-qui-change-vraiment';

const carouselImages: BDImage[] = [
  { src: `${carouselPrefix}/bd-slide-01-cover.png`, alt: 'Couverture - L\'IA au closing B2B', index: 1 },
  { src: `${carouselPrefix}/bd-slide-02-constat.png`, alt: 'Le constat terrain', index: 2 },
  { src: `${carouselPrefix}/bd-slide-03-temps-gagne.png`, alt: 'Le temps gagné', index: 3 },
  { src: `${carouselPrefix}/bd-slide-04-piege-ecriture.png`, alt: 'Le piège de l\'écriture déléguée', index: 4 },
  { src: `${carouselPrefix}/bd-slide-05-paire-analyseuse.png`, alt: 'La paire analyseuse', index: 5 },
  { src: `${carouselPrefix}/bd-slide-06-automatisation.png`, alt: 'La dérive automatisée', index: 6 },
  { src: `${carouselPrefix}/bd-slide-07-regard-exterieur.png`, alt: 'Le regard extérieur', index: 7 },
  { src: `${carouselPrefix}/bd-slide-08-bonne-utilisation.png`, alt: 'La bonne utilisation de l\'IA', index: 8 },
  { src: `${carouselPrefix}/bd-slide-09-regles.png`, alt: 'Les trois règles simples', index: 9 },
  { src: `${carouselPrefix}/bd-slide-10-ce-que-ia-ne-fait-pas.png`, alt: 'Ce que l\'IA ne fait pas', index: 10 },
  { src: `${carouselPrefix}/bd-slide-11-resultat.png`, alt: 'Le résultat', index: 11 },
  { src: `${carouselPrefix}/bd-slide-12-cta.png`, alt: 'Diagnostic offert', index: 12 },
];
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/ia-closing-b2b-ce-qui-change-vraiment/ia-closing-b2b-hero.webp';

export const metadata: Metadata = {
  title: "L'IA au closing B2B : ce qui change vraiment en 2026 | Laurent Serre",
  description:
    "L'IA peut-elle vraiment aider à signer plus de ventes ? Laurent Serre partage ce qu'il voit sur le terrain : les outils qui marchent, les pièges à éviter, et ce que l'IA ne remplacera jamais dans le closing B2B.",
  keywords:
    'IA closing B2B, IA vente B2B, outils IA pour commerciaux, closing et intelligence artificielle, IA coaching commercial, IA closing B2B PME, IA sans remplacer humain vente',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/ia-closing-b2b-ce-qui-change-vraiment',
  },
  openGraph: {
    title: "L'IA au closing B2B : ce qui change vraiment en 2026",
    description:
      "L'IA ne remplace pas le closing, elle le rend plus efficace. Les outils, les pièges et ce que Laurent voit sur le terrain.",
    url: 'https://www.laurentserre.com/blog/ia-closing-b2b-ce-qui-change-vraiment',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: "IA au closing B2B - nouvelles pratiques terrain Laurent Serre",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "L'IA au closing B2B : ce qui change vraiment en 2026",
    description:
      "L'IA ne remplace pas le closing, elle le rend plus efficace. Ce que Laurent voit sur le terrain : outils, pièges, limites.",
    images: [heroImageAbsolute],
  },
};

export default function IAClosingB2BPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: "L'IA au closing B2B : ce qui change vraiment en 2026",
    description:
      "L'IA peut-elle vraiment aider à signer plus de ventes ? Laurent Serre partage ce qu'il voit sur le terrain : les outils qui marchent, les pièges à éviter, et ce que l'IA ne remplacera jamais.",
    image: heroImageAbsolute,
    datePublished: '2026-06-06',
    dateModified: '2026-06-06',
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
      '@id': 'https://www.laurentserre.com/blog/ia-closing-b2b-ce-qui-change-vraiment',
    },
    articleSection: 'IA commerciale / Closing B2B',
    keywords: [
      'IA closing B2B',
      'IA et vente',
      'outils IA commerciaux',
      'closing B2B 2026',
      'intelligence artificielle vente',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "L'IA peut-elle remplacer un commercial pour le closing ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Non. L'IA ne remplace pas le commercial dans le closing, elle l'outille. La décision d'achat reste une affaire humaine : relation, contexte, confiance. L'IA peut préparer, analyser, suggérer, mais elle ne peut pas incarner la relation commerciale, sentir le bon moment pour se taire ou pour insister."
        }
      },
      {
        '@type': 'Question',
        name: "Quels outils IA pour améliorer son taux de closing ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Les outils les plus efficaces sur le terrain sont ceux qui aident à analyser le pipeline (score de maturité, signaux faibles), préparer les rendez-vous (analyse de l'interlocuteur, synthèse des échanges passés) et structurer le suivi. Des outils comme les CRM augmentés par l'IA, les analyseurs de sentiment, les générateurs de synthèse d'appels sont en forte progression en 2026. Mais aucun ne décide à la place du commercial."
        }
      },
      {
        '@type': 'Question',
        name: "Comment utiliser l'IA sans perdre la relation client ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "La clé : utiliser l'IA pour la préparation et l'analyse, pas pour l'interaction directe. Ne jamais envoyer un message généré par IA sans relecture humaine. Ne pas automatiser la relation. L'IA doit rester un assistant invisible : elle prépare la réunion, mais c'est le commercial qui la mène."
        }
      },
      {
        '@type': 'Question',
        name: "L'IA améliore-t-elle vraiment les performances commerciales ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Oui, mais avec des conditions. Les données 2026 montrent que les équipes qui utilisent bien l'IA gagnent en efficacité : préparation plus rapide, meilleure qualification des prospects, suivi plus systématique. L'IA améliore le volume et la qualité du travail préparatoire, mais le taux de conversion final dépend toujours de la compétence humaine du commercial."
        }
      },
      {
        '@type': 'Question',
        name: "Quels sont les risques de l'IA dans la vente B2B ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Les trois risques principaux sont : la standardisation excessive (60 commerciaux qui envoient le même mail IA = perte de singularité), la paire analyseuse (l'IA devient une béquille qui empêche le commercial de développer son instinct), et la froideur relationnelle (trop d'automatisation tue la confiance). Le pire scénario : un commercial remplacé non par l'IA, mais par un concurrent qui utilise l'IA sans perdre l'humain."
        }
      }
    ]
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
      { '@type': 'ListItem', 'position': 3, 'name': 'L\'IA au closing B2B', 'item': 'https://www.laurentserre.com/blog/ia-closing-b2b-ce-qui-change-vraiment' },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />


      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">
                IA commerciale / Closing B2B
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              L'IA au closing B2B : ce qui change vraiment en 2026
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
              <time dateTime="2026-06-06">6 juin 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="IA au closing B2B - nouvelles pratiques terrain"
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <div className="not-prose mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="bg-gradient-to-r from-blue-ink/5 via-blue-ink/5 to-transparent border-l-4 border-orange-soft p-6 rounded-r-xl mb-8">
            <p className="text-lg font-semibold text-blue-ink mb-2">✨ Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              L'IA ne remplace pas le closing, elle le rend plus efficace. Entre CRM augmenté, analyse de pipeline et suivi automatisé, les outils existent. Mais trois pièges guettent les équipes qui se précipitent : écrire par IA sans relire, perdre son instinct, et refroidir la relation. Voici ce que Laurent voit sur le terrain.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : L'IA au closing B2B
            </p>
            <p className="text-sm text-amber-700 mb-5">
              12 planches pour découvrir l'histoire de Stéphane, commercial terrain, qui apprend à utiliser l'IA sans perdre le lien humain.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : L'IA au closing B2B"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/pdf/carrousels/ia-closing-b2b-carrousel.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (12 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA diagnostic */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vous ne savez pas par où commencer avec l'IA ? Faites un diagnostic offert →
            </Link>
          </div>

          <p className="lead">
            La question revient dans tous mes débriefs avec des dirigeants : « Est-ce que l'IA peut vraiment 
            m'aider à conclure plus de ventes ? » Derrière, j'entends souvent une inquiétude : est-ce que l'IA 
            va remplacer mes commerciaux sur le closing ? Ou au contraire, est-ce que je passe à côté d'une révolution ?
          </p>

          <p>
            Alors voilà ce que je vois sur le terrain. Pas de théorie, pas de prédiction à 5 ans. Ce qui se passe 
            chez les équipes que j'accompagne, avec des outils réels, et ce qui marche vraiment.
          </p>

          <h2>Ce que l'IA change concrètement en 2026</h2>

          <p>
            La semaine dernière, je débriefais avec un directeur commercial. Son équipe utilise un CRM augmenté 
            par IA depuis trois mois. Premier constat : le temps de préparation des rendez-vous a été divisé par 
            trois. L'IA sort une synthèse des échanges passés, une analyse du profil de l'interlocuteur, et 
            trois angles de relance possibles.
          </p>

          <p>
            Ce n'est pas magique. Le commercial passe toujours 20 minutes à vérifier, ajuster, personnaliser. 
            Mais avant, il passait une heure à tout reconstituer manuellement. La différence, c'est qu'il 
            arrive au rendez-vous mieux préparé et moins fatigué.
          </p>

          <p>
            Deuxième changement visible : le suivi systématique. L'IA ne laisse plus tomber des prospects 
            parce que le commercial était débordé. Elle rappelle qu'il faut relancer, propose un timing, 
            reformule l'objet. Les meilleurs commerciaux que je suis utilisent ça comme filet de sécurité, 
            pas comme pilote automatique.
          </p>

          <div className="bg-blue-50 border-l-4 border-orange-soft p-6 my-8 rounded-r-xl">
            <p className="text-lg font-semibold text-blue-ink mb-2">
              Le vrai gain terrain
            </p>
            <p>
              L'IA ne signe pas à votre place. Mais elle libère du temps pour faire ce qui compte : 
              écouter, observer, adapter son discours en live. Le temps gagné sur la préparation, 
              c'est du temps en plus sur la relation.
            </p>
          </div>

          <h2>Les trois pièges que je vois partout</h2>

          <p>
            Parce que ce n'est pas tout rose non plus. J'accompagne aussi des équipes qui se sont 
            précipitées sur l'IA et qui paient le prix fort.
          </p>

          <h3>Piège numéro 1 : l'écriture déléguée</h3>
          <p>
            Le plus répandu. Un commercial qui fait rédiger ses mails de relance, ses propositions, 
            ses comptes rendus par l'IA sans les relire. Résultat : des messages qui sonnent creux, 
            une voix uniforme dans toute l'équipe, et des clients qui sentent le copier-coller. 
            Sur un closing, ça tue la confiance immédiatement. Le client se demande : « Est-ce que 
            je parle à un humain ou à un chatbot ? »
          </p>

          <h3>Piège numéro 2 : la paire analyseuse</h3>
          <p>
            Certains commerciaux deviennent dépendants. Ils ne lancent plus un appel sans avoir 
            scanné les 10 pages d'analyse IA. Ils perdent leur instinct, leur lecture personnelle 
            de la situation. Quand l'IA dit « bon signal, passer en phase 3 », ils y vont sans 
            questionner. Je vois des ventes se perdre parce que le commercial a suivi la suggestion 
            IA au lieu de sentir un malaise que la machine ne captait pas.
          </p>

          <h3>Piège numéro 3 : l'automatisation qui refroidit</h3>
          <p>
            J'ai vu un commercial envoyer une relance IA à un prospect avec qui il avait passé 
            deux heures la veille. Le prospect, froissé, a répondu : « On pourrait peut-être en 
            parler de vive voix, comme l'autre jour ? » L'IA est pratique, mais elle ne remplace 
            pas le bon sens relationnel. Une relance personnalisée vaut mieux que 200 relances 
            automatisées et vides.
          </p>

          <h2>Ce que l'IA ne fera jamais</h2>

          <p>
            Et c'est peut-être le plus important à retenir. L'IA peut analyser, synthétiser, 
            suggérer, mémoriser. Mais elle ne peut pas :
          </p>

          <ul>
            <li>Sentir le moment où le prospect a besoin qu'on ralentisse</li>
            <li>Instaurer une vraie relation de confiance dans la durée</li>
            <li>Adapter son ton à une tension imprévue en réunion</li>
            <li>Prendre le risque de perdre une vente en disant une vérité qui dérange</li>
            <li>Lire les silences, les hésitations, les non-dits</li>
          </ul>

          <p>
            Ce sont ces compétences qui font un bon closer en 2026. L'IA peut les soutenir, 
            elle ne peut pas les remplacer. Les commerciaux qui cartonnent aujourd'hui sont 
            ceux qui utilisent l'IA en coulisses et gardent la main sur la relation.
          </p>

          <h2>Comment bien utiliser l'IA sur le closing</h2>

          <p>
            Dans les équipes qui performent le mieux avec l'IA, j'observe trois disciplines communes :
          </p>

          <p>
            <strong>1. L'IA en amont du rendez-vous.</strong> Analyse du compte, synthèse des 
            échanges, identification des points de blocage potentiels. Tout ce qui permet d'arriver 
            préparé sans remplacer la lecture personnelle du dossier.
          </p>

          <p>
            <strong>2. L'IA pour la mémoire, pas pour la décision.</strong> Le CRM augmenté rappelle 
            les éléments clés, les dates, les promesses. Mais la décision de quoi dire, comment le 
            dire, et à quel moment, reste humaine.
          </p>

          <p>
            <strong>3. L'IA comme second regard.</strong> Avant d'envoyer une proposition, certains 
            commerciaux la font analyser par l'IA pour détecter les incohérences ou les angles morts. 
            Pas pour l'écrire à leur place.
          </p>

          <div className="bg-amber-50 border-l-4 border-orange-soft p-6 my-8 rounded-r-xl">
            <p className="text-lg font-semibold text-blue-ink mb-2">
              La règle d'or
            </p>
            <p>
              L'IA doit rester un assistant invisible. Si le client sent que l'IA est intervenue 
              dans la relation, c'est que vous en avez trop fait. La meilleure utilisation de l'IA, 
              c'est celle qu'on ne voit pas.
            </p>
          </div>

          <h2>Alors, concrètement ?</h2>

          <p>
            Je ne crois pas à l'IA qui remplace le commercial. Je vois surtout des équipes qui 
            gagnent un avantage compétitif en utilisant bien l'IA, et d'autres qui perdent du 
            terrain en l'utilisant mal. La différence, ce n'est pas l'outil. C'est la discipline 
            avec laquelle on l'emploie.
          </p>

          <p>
            Si vous voulez voir où vous en êtes sur le closing, il existe une façon plus fiable 
            que les indicateurs classiques. Un diagnostic terrain de 90 minutes peut déjà vous 
            donner une lecture précise de ce qui bloque vraiment dans votre cycle de vente.
          </p>

          <p>
            <strong>
              L'IA au closing en 2026, ce n'est pas un sujet technologique. C'est un sujet 
              d'organisation et de discipline.
            </strong>
          </p>

          {/* FAQ */}
          <div className="my-12">
            <h2 id="faq" className="text-3xl font-title font-bold text-blue-ink mb-6">Questions fréquentes sur l'IA et le closing B2B</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">L'IA peut-elle remplacer un commercial pour le closing ?</h3>
                <p className="text-gray-600">Non. L'IA ne remplace pas le commercial dans le closing, elle l'outille. La décision d'achat reste une affaire humaine : relation, contexte, confiance. L'IA peut préparer, analyser, suggérer, mais elle ne peut pas incarner la relation commerciale.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Quels outils IA pour améliorer son taux de closing ?</h3>
                <p className="text-gray-600">Les plus efficaces sont les CRM augmentés par l'IA (score de maturité, signaux faibles), les analyseurs de sentiment, les générateurs de synthèse d'appels. Mais aucun outil ne décide à la place du commercial.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Comment utiliser l'IA sans perdre la relation client ?</h3>
                <p className="text-gray-600">La clé : utiliser l'IA pour la préparation et l'analyse, pas pour l'interaction directe. Ne jamais envoyer un message généré par IA sans relecture humaine. L'IA prépare, le commercial mène.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">L'IA améliore-t-elle vraiment les performances commerciales ?</h3>
                <p className="text-gray-600">Oui, avec des conditions. Les équipes qui utilisent bien l'IA gagnent en efficacité sur la préparation, la qualification et le suivi. Mais le taux de conversion final dépend toujours de la compétence humaine.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Quels sont les risques de l'IA dans la vente B2B ?</h3>
                <p className="text-gray-600">Standardisation excessive, dépendance analyseuse, froideur relationnelle. Le pire scénario : un commercial remplacé non par l'IA, mais par un concurrent qui utilise l'IA sans perdre l'humain.</p>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 my-12">
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors text-center">
              Faire un diagnostic offert
            </Link>
            <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-blue-ink text-base font-medium rounded-full text-blue-ink hover:bg-blue-ink/10 transition-colors text-center">
              Découvrir le Bootcamp
            </Link>
          </div>
        </div>
      </article>

      {/* Navigation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center text-orange-soft hover:text-orange-soft-hover font-semibold transition-colors"
            >
              ← Retour au blog
            </Link>
            <Link
              href="/blog/commercial-en-2026-competences-qui-feront-difference"
              className="inline-flex items-center text-orange-soft hover:text-orange-soft-hover font-semibold transition-colors"
            >
              Article suivant →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
