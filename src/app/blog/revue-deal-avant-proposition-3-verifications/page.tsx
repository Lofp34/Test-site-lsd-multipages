import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Revue deal avant proposition : 3 vérifications en 17 min | Laurent Serre',
  description: 'La méthode de revue deal en 17 minutes pour éviter les propositions B2B trop tôt, protéger la marge et augmenter le taux de signature.',
  keywords: 'proposition commerciale B2B, revue deal, directeur commercial, taux de signature, bootcamp vente, pipeline commercial',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/revue-deal-avant-proposition-3-verifications',
  },
  openGraph: {
    title: 'Avant d’envoyer une proposition : la revue deal en 17 minutes',
    description: 'Trois vérifications simples pour éviter les propositions prématurées et reprendre le contrôle sur la conversion.',
    url: 'https://www.laurentserre.com/blog/revue-deal-avant-proposition-3-verifications',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-03-28-revue-deal-hero.webp',
        width: 1376,
        height: 768,
        alt: 'Revue deal dirigeant et directeur commercial avant envoi de proposition',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avant d’envoyer une proposition : la revue deal en 17 minutes',
    description: 'Le rituel simple qui évite les propositions trop tôt et améliore la qualité du closing.',
    images: ['https://www.laurentserre.com/images/blog/2026-03-28-revue-deal-hero.webp'],
  },
};

export default function RevueDealAvantPropositionPage() {
    const articleJsonLd = {
    '@context': \'https://schema.org',
    '@graph': [
      {
        '@type': \'BlogPosting',
        '@id': \'https://www.laurentserre.com/blog/revue-deal-avant-proposition-3-verifications#posting',
        headline: \'Avant d\'envoyer une proposition : la revue deal en 17 minutes',
        description: \'La méthode de revue deal en 17 minutes pour éviter les propositions B2B trop tôt, protéger la marge et augmenter le taux de signature.',
        image: \'https://www.laurentserre.com/images/blog/2026-03-28-revue-deal-hero.webp',
        datePublished: '2026-03-28',
        dateModified: '2026-05-05',
        author: {
          '@type': \'Person',
          name: \'Laurent Serre',
          url: \'https://www.laurentserre.com/a-propos',
          sameAs: [\'https://www.linkedin.com/in/laurentserre34/', \'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/'],
        },
        publisher: { '@type': \'Organization', name: \'Laurent Serre Développement', url: \'https://www.laurentserre.com' },
        mainEntityOfPage: { '@type': \'WebPage', '@id': \'https://www.laurentserre.com/blog/revue-deal-avant-proposition-3-verifications' },
        keywords: [
    "proposition commerciale B2B",
    "revue deal",
    "directeur commercial",
    "taux de signature",
    "bootcamp vente",
    "pipeline commercial"
  ],
      },
      {
        '@type': \'FAQPage',
        '@id': \'https://www.laurentserre.com/blog/revue-deal-avant-proposition-3-verifications#faq',
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
              <span className="font-title font-semibold text-orange-soft text-sm">Closing B2B</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Avant d&apos;envoyer une proposition : la revue deal en 17 minutes
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.webp" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-03-28">28 mars 2026</time>
              <span>•</span>
              <span>11 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-03-28-revue-deal-hero.webp"
              alt="Revue deal dirigeant et directeur commercial avant envoi de proposition"
              width={1376}
              height={768}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={76}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Dans beaucoup d&apos;équipes commerciales, la proposition part trop tôt. Le prospect semble intéressé, le commercial veut garder la main,
            le manager pousse pour “faire avancer” et, en quelques heures, un PDF bien présenté part dans la nature. Ensuite commencent les relances,
            les silences et les négociations de remise. Le problème n&apos;est pas la qualité du document. Le problème, c&apos;est le <strong>timing de décision</strong>.
          </p>

          <p className="mb-8">
            Une proposition envoyée avant que le deal soit réellement mûr devient souvent un substitut de vente : on espère que le document compensera ce qui n&apos;a pas été clarifié
            dans la conversation. En pratique, il fige les zones floues, affaiblit votre position et ouvre la porte à une comparaison par les prix.
          </p>

          <p className="mb-8">
            C&apos;est pour cela que je recommande une <strong>revue deal en 17 minutes</strong> avant chaque proposition significative. Pas une réunion de plus. Un rituel court, exigeant,
            qui permet de décider si le deal mérite une proposition, s&apos;il faut encore cadrer, ou s&apos;il faut ralentir pour mieux sécuriser la signature.
          </p>

          <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
              <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">🎯 Ce que vous allez retenir</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Réunion de 30 minutes</strong> pour protéger simultanément pipeline, marge et lucidité managériale.</li>
                <li><strong>3 piliers</strong> : ce qui est réel / ce qui est fragile / où intervenir maintenant.</li>
                <li><strong>Un rituel qui décide</strong> — pas une réunion qui commente, mais un format court qui oblige à trancher.</li>
              </ul>
            </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi 17 minutes ? Parce qu&apos;au-delà, on recommence à raconter l&apos;histoire du deal</h2>
          <p className="mb-4">
            Une bonne revue deal n&apos;est pas un debrief littéraire. Elle sert à trancher. Dix-sept minutes suffisent pour faire apparaître l&apos;essentiel si les questions sont bonnes.
            En dessous, on survole. Au-dessus, on retombe dans le commentaire, les détails décoratifs et l&apos;optimisme CRM.
          </p>
          <p className="mb-8">
            Le format est simple : <strong>5 minutes sur l&apos;enjeu, 6 minutes sur la mécanique de décision, 6 minutes sur le risque commercial</strong>. Si le deal ne tient pas dans ce cadre,
            il n&apos;est probablement pas prêt pour une proposition engageante.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Vérification n°1 : l&apos;enjeu client est-il assez précis pour justifier une décision maintenant ?</h2>
          <p className="mb-4">
            Beaucoup de propositions partent avec un diagnostic trop vague : “améliorer la prospection”, “structurer l&apos;équipe”, “booster le chiffre d&apos;affaires”. C&apos;est trop large pour créer une tension de décision.
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Quel problème prioritaire le client veut-il résoudre dans les 90 prochains jours ?</li>
            <li>Quel coût du statu quo a-t-il reconnu : perte de marge, allongement des cycles, forecast peu fiable, désalignement managérial ?</li>
            <li>Qu&apos;est-ce qui rend le sujet prioritaire maintenant et pas “plus tard dans l&apos;année” ?</li>
          </ul>
          <p className="mb-6">
            Si l&apos;urgence reste abstraite, votre proposition sera lue comme une option parmi d&apos;autres. Pas comme une réponse à une contrainte réelle. C&apos;est exactement le terrain sur lequel se forment
            les faux deals que j&apos;analyse dans
            {' '}
            <Link href="/blog/pipeline-fantome-lundi-matin-test-9-minutes" className="text-blue-ink font-semibold underline hover:text-mint-green">
              le test des 9 minutes du lundi matin
            </Link>
            .
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Vérification n°2 : la mécanique de décision est-elle claire, ou êtes-vous seulement bien reçu ?</h2>
          <p className="mb-4">
            Un deal peut sembler avancer alors qu&apos;il repose uniquement sur une relation confortable. Le contact est engagé, les échanges sont agréables, le commercial se sent “dans le coup”.
            Mais qui arbitre réellement ? Qui porte le risque interne ? Qui dira oui, et sur quelle base ?
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Le sponsor interne a-t-il un intérêt personnel à faire aboutir le projet ?</li>
            <li>Le décideur final est-il identifié, accessible, ou au moins influent dans le calendrier ?</li>
            <li>La prochaine étape est-elle bilatérale, datée et explicitement reliée à une décision ?</li>
          </ul>
          <p className="mb-6">
            Quand cette mécanique n&apos;est pas claire, la proposition ne fait pas progresser le deal : elle occupe le vide. Elle donne l&apos;illusion d&apos;une avancée, mais crée en réalité un objet facile à différer.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Vérification n°3 : êtes-vous en position de valeur, ou déjà en position de justification ?</h2>
          <p className="mb-4">
            Avant d&apos;envoyer quoi que ce soit, posez une question très simple : <strong>si le client challenge le prix demain matin, sur quoi repose ma défense de valeur ?</strong>
            Si la seule réponse est “la qualité de notre accompagnement”, vous êtes trop tôt.
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Les résultats attendus sont-ils formulés avec un avant/après crédible ?</li>
            <li>Le périmètre de transformation est-il compris par le client, pas seulement par vous ?</li>
            <li>Le coût d&apos;inaction est-il plus visible que le prix de votre proposition ?</li>
          </ul>
          <p className="mb-6">
            C&apos;est ici que se joue la marge. Une proposition envoyée quand la valeur n&apos;est pas encore solidement installée devient un document à défendre. Une proposition envoyée au bon moment devient une formalisation attendue.
            Si vous voulez muscler cette phase, lisez aussi
            {' '}
            <Link href="/blog/closing-b2b-7-techniques" className="text-blue-ink font-semibold underline hover:text-mint-green">
              les 7 techniques de closing B2B qui marchent vraiment
            </Link>
            .
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Règle pratique :</strong> si l&apos;une des trois vérifications reste floue, ne compensez pas par un document plus long. Retardez la proposition, reprenez la conversation et sécurisez la décision.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que change ce rituel en 30 jours</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>Moins de propositions “pour voir” et donc moins de relances stériles</li>
            <li>Un meilleur taux de signature parce que les conditions de décision sont validées avant l&apos;envoi</li>
            <li>Des managers qui coachent les deals au lieu de commenter les opportunités</li>
            <li>Une meilleure protection de marge, car la valeur est clarifiée avant toute discussion de prix</li>
            <li>Un pipeline plus crédible, car les propositions deviennent un signal de maturité réelle</li>
          </ul>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le vrai sujet : arrêter de confondre activité commerciale et progrès de décision</h2>
          <p className="mb-8">
            Envoyer une proposition donne souvent une sensation d&apos;avancement. C&apos;est confortable pour le commercial, rassurant pour le manager et visible dans le CRM. Mais la vraie question n&apos;est pas “avons-nous envoyé quelque chose ?”.
            La vraie question est : <strong>avons-nous créé les conditions d&apos;une décision ?</strong>
          </p>
          <p className="mb-8">
            Les équipes qui performent durablement n&apos;envoient pas plus de propositions. Elles envoient moins de propositions prématurées. Et ce détail change tout : conversion, marge, crédibilité et qualité de pilotage.
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
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez faire progresser le closing sans transformer votre équipe en usine à devis ?</h3>
            <p className="mb-6">
              Le Bootcamp aide vos managers et commerciaux à structurer les revues de deals, poser les bonnes questions avant proposition et convertir avec plus de contrôle.
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
