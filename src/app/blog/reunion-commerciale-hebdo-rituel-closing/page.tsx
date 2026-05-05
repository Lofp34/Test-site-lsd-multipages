import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Réunion commerciale hebdo : rituel 45 min pour le closing | Laurent Serre',
  description: 'Le rituel hebdomadaire qu’utilisent les dirigeants et directeurs commerciaux pour assainir le pipeline, coacher sans micro-manager et faire remonter le taux de conversion.',
  keywords: 'réunion commerciale, revue pipeline, closing B2B, directeur commercial, management commercial, rituel commercial, bootcamp commercial',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/reunion-commerciale-hebdo-rituel-closing',
  },
  openGraph: {
    title: 'Réunion commerciale hebdo : le rituel de 45 minutes qui fait remonter le closing',
    description: 'Un cadre simple et exigeant pour transformer une réunion commerciale en levier de conversion.',
    url: 'https://www.laurentserre.com/blog/reunion-commerciale-hebdo-rituel-closing',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-03-25-revue-pipeline-rituel.svg',
        width: 1600,
        height: 900,
        alt: 'Rituel hebdomadaire de revue pipeline et de closing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Réunion commerciale hebdo : le rituel de 45 minutes qui fait remonter le closing',
    description: 'Le cadre de pilotage simple pour assainir le pipeline et mieux convertir.',
    images: ['https://www.laurentserre.com/images/blog/2026-03-25-revue-pipeline-rituel.svg'],
  },
};

export default function ReunionCommercialeHebdoPage() {
    const articleJsonLd = {
    '@context': \'https://schema.org',
    '@graph': [
      {
        '@type': \'BlogPosting',
        '@id': \'https://www.laurentserre.com/blog/reunion-commerciale-hebdo-rituel-closing#posting',
        headline: \'Réunion commerciale hebdo : le rituel de 45 minutes qui fait remonter le closing',
        description: \'Le rituel hebdomadaire qu’utilisent les dirigeants et directeurs commerciaux pour assainir le pipeline, coacher sans micro-manager et faire remonter le taux de conversion.',
        image: \'https://www.laurentserre.com/images/blog/2026-03-25-revue-pipeline-rituel.svg',
        datePublished: '2026-03-25',
        dateModified: '2026-05-05',
        author: {
          '@type': \'Person',
          name: \'Laurent Serre',
          url: \'https://www.laurentserre.com/a-propos',
          sameAs: [\'https://www.linkedin.com/in/laurentserre34/', \'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/'],
        },
        publisher: { '@type': \'Organization', name: \'Laurent Serre Développement', url: \'https://www.laurentserre.com' },
        mainEntityOfPage: { '@type': \'WebPage', '@id': \'https://www.laurentserre.com/blog/reunion-commerciale-hebdo-rituel-closing' },
        keywords: [
    "réunion commerciale",
    "revue pipeline",
    "closing B2B",
    "directeur commercial",
    "management commercial",
    "rituel commercial",
    "bootcamp commercial"
  ],
      },
      {
        '@type': \'FAQPage',
        '@id': \'https://www.laurentserre.com/blog/reunion-commerciale-hebdo-rituel-closing#faq',
        mainEntity: [
          {
            '@type': \'Question',
            name: \'Comment protéger son pipeline et sa marge en début de trimestre ?',
            acceptedAnswer: { '@type': \'Answer', text: \'En instaurant une réunion hebdomadaire de 30 minutes dédiée à trois actifs critiques : la qualité du pipeline, la marge et la lucidité managériale. Pas une réunion qui commente tout, mais un rituel qui décide.' }
          },
          {
            '@type': \'Question',
            name: \'Pourquoi une réunion courte est-elle plus efficace qu\'une réunion longue en période de tension ?',
            acceptedAnswer: { '@type': \'Answer', text: \'Une réunion de 30 minutes bien conçue oblige à trancher : qu\'est-ce qui est réel, qu\'est-ce qui est fragile, où faut-il intervenir, et où faut-il arrêter d\'investir du temps. C\'est le contraire d\'une réunion qui commente tout.' }
          },
        ]
      }
    ]
  };

  return (
<main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">Management commercial</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Réunion commerciale hebdo : le rituel de 45 minutes qui fait remonter le closing
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-03-25">25 mars 2026</time>
              <span>•</span>
              <span>9 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-03-25-revue-pipeline-rituel.svg"
              alt="Rituel hebdomadaire de revue pipeline et de closing"
              width={1600}
              height={900}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Dans beaucoup d’équipes, la réunion commerciale hebdomadaire sert surtout à réciter des chiffres, commenter des retards et distribuer un peu de pression.
            Résultat : tout le monde sort avec plus de tension, mais pas avec plus de décisions.
            Une bonne revue pipeline doit produire l’inverse : de la clarté, du coaching et des arbitrages qui font progresser le closing.
          </p>

          <p className="mb-8">
            Le rituel que je recommande tient en <strong>45 minutes</strong>. Il fonctionne particulièrement bien pour les dirigeants, directeurs commerciaux et managers de PME qui veulent reprendre la main sans tomber dans le micro-management.
          </p>

          <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
              <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">🎯 Ce que vous allez retenir</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Réunion de 30 minutes</strong> pour protéger simultanément pipeline, marge et lucidité managériale.</li>
                <li><strong>3 piliers</strong> : ce qui est réel / ce qui est fragile / où intervenir maintenant.</li>
                <li><strong>Un rituel qui décide</strong> — pas une réunion qui commente, mais un format court qui oblige à trancher.</li>
              </ul>
            </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi la plupart des réunions commerciales échouent</h2>
          <p className="mb-4">
            Elles confondent activité et pilotage. On regarde le nombre d’appels, le nombre d’emails envoyés, parfois même le nombre de devis… mais on évite les vraies questions : qu’est-ce qui est vraiment gagnable, qu’est-ce qui bloque, et quelle décision doit être prise maintenant ?
          </p>
          <ul className="list-disc pl-6 mb-8">
            <li>Trop d’opportunités passées en revue, pas assez de profondeur</li>
            <li>Des managers qui commentent au lieu de coacher</li>
            <li>Aucune date ferme pour la prochaine étape</li>
            <li>Un pipeline gonflé qui rassure artificiellement</li>
          </ul>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Règle simple :</strong> si votre réunion commerciale ne fait pas monter la qualité des prochaines étapes, ce n’est pas une réunion de pilotage. C’est un reporting collectif.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le format 45 minutes qui change le niveau de l’équipe</h2>
          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">1. 10 minutes — vérité pipeline</h3>
          <p className="mb-6">
            Commencez par un balayage très court des opportunités du trimestre : celles qui n’ont pas de sponsor identifié, de next step datée ou de décision claire sortent immédiatement de la prévision. Cela évite le “forecast d’espoir”.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">2. 20 minutes — 2 deals, pas 12</h3>
          <p className="mb-6">
            Choisissez seulement deux affaires à fort enjeu. Pour chacune, posez trois questions :
          </p>
          <ul className="list-disc pl-6 mb-8">
            <li>Quelle décision doit prendre le prospect ?</li>
            <li>Qu’est-ce qui manque pour rendre cette décision confortable ?</li>
            <li>Quelle est la prochaine étape exacte, datée, avec qui ?</li>
          </ul>

          <p className="mb-6">
            Si vos commerciaux ont besoin d’un cadre plus structuré sur cette phase critique, je vous recommande aussi
            {' '}
            <Link href="/blog/closing-b2b-7-techniques" className="text-blue-ink font-semibold underline hover:text-mint-green">
              l’article sur les 7 techniques de closing B2B qui fonctionnent réellement
            </Link>
            .
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">3. 10 minutes — coaching managérial</h3>
          <p className="mb-6">
            Le manager ne doit pas “reprendre le deal”. Il doit aider le commercial à mieux penser le deal. Reformulation, angle de recadrage, scénario de relance, message à tester : le rôle du management est de faire gagner en lucidité, pas de se substituer.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">4. 5 minutes — engagements visibles</h3>
          <p className="mb-8">
            Terminez systématiquement par une liste d’engagements concrets : qui fait quoi, avant quand, et avec quel objectif. Sans cet atterrissage, la réunion ne laisse aucune trace opérationnelle.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Les 4 KPI à afficher, pas 25</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>Montant de pipeline réellement défendable</li>
            <li>Taux d’opportunités avec next step datée</li>
            <li>Taux de transformation proposition → décision</li>
            <li>Délai médian entre découverte et signature</li>
          </ul>

          <p className="mb-6">
            Ce cadrage prolonge très bien une logique de pilotage plus large. Si votre sujet est d’abord la fiabilité du trimestre, lisez aussi
            {' '}
            <Link href="/blog/pipeline-commercial-q2-2026-5-decisions-dirigeant" className="text-blue-ink font-semibold underline hover:text-mint-green">
              les 5 décisions de dirigeant pour sécuriser le chiffre d’affaires
            </Link>
            .
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que le dirigeant doit surveiller</h2>
          <p className="mb-4">
            Une réunion commerciale saine se reconnaît vite : le pipeline devient moins flatteur, mais plus vrai ; les managers parlent moins, les commerciaux s’approprient davantage leurs décisions ; la pression émotionnelle baisse, mais l’exigence monte.
          </p>
          <p className="mb-8">
            C’est souvent contre-intuitif : quand vous réduisez le bruit et augmentez la qualité des arbitrages, le closing remonte. Pas parce que l’équipe travaille plus, mais parce qu’elle travaille sur les bons sujets au bon moment.
          </p>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
              <p className="text-lg font-title font-bold text-blue-ink mb-4">📚 Pour aller plus loin sur le pilotage de pipeline</p>
              <ul className="space-y-3 text-sm">
                <li><Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-mint-green hover:underline font-medium">Construction d\'un pipeline commercial PME fiable</Link> — Les fondamentaux pour bâtir un outil de pilotage solide.</li>
                <li><Link href="/blog/pipeline-fantome-lundi-matin-test-9-minutes" className="text-mint-green hover:underline font-medium">Pipeline fantôme : test des 9 minutes</Link> — Identifier les faux deals avant qu\'ils ne faussent le forecast.</li>
              </ul>
              <p className="text-xs text-gray-400 mt-3">
                Voir aussi les <a href="https://www.salesforce.com/sales/pipeline/management/" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">meilleures pratiques Salesforce</a>.
              </p>
            </div>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez installer ce rituel dans votre équipe ?</h3>
            <p className="mb-6">
              Le Bootcamp aide vos managers et commerciaux à structurer leurs revues pipeline, à mieux coacher les deals et à convertir plus régulièrement sans pression stérile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Découvrir le Bootcamp
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Faire un diagnostic commercial
              </Link>
            </div>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Checklist de mise en place dès lundi</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>Bloquez 45 minutes, toujours au même moment</li>
            <li>Limitez la revue détaillée à 2 deals stratégiques</li>
            <li>Supprimez du forecast toute opportunité sans next step datée</li>
            <li>Clôturez chaque réunion avec des engagements écrits</li>
          </ul>

          <p className="mb-6">
            Si vous voulez un regard extérieur pour savoir où votre équipe perd aujourd’hui de la conversion, commencez par
            {' '}
            <Link href="/diagnostic" className="text-blue-ink font-semibold underline hover:text-mint-green">
              un diagnostic commercial
            </Link>
            , puis utilisez le Bootcamp pour installer un vrai rythme de progression.
          </p>
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
