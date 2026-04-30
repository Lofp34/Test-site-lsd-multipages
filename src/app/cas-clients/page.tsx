import dynamic from 'next/dynamic';
import type { Metadata, Viewport } from 'next';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const TestimonialVideoSection = dynamic(() => import('@/components/sections/TestimonialVideoSection'));

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Cas clients & transformations commerciales PME | Laurent Serre',
  description:
    'Découvrez comment Laurent Serre accompagne les PME B2B dans la structuration commerciale : cas clients, témoignages, transformations terrain, formation et management commercial.',
  alternates: {
    canonical: 'https://www.laurentserre.com/cas-clients',
  },
};

const clientCases = [
  {
    name: 'OVEA',
    title: 'Structurer l’effort commercial d’un acteur du cloud souverain',
    body: [
      'OVEA est un acteur du cloud souverain. Comme beaucoup d’entreprises techniques solides, sa valeur métier est forte. Mais une valeur technique ne suffit pas toujours à construire une dynamique commerciale lisible.',
      'L’accompagnement a porté sur trois mois de bootcamp et de structuration vente intensive : clarifier les fondations, organiser l’effort de vente, renforcer la cohérence de l’équipe et rendre l’action commerciale plus humaine, plus lisible et plus performante.',
      'Le travail ne consistait pas à ajouter une couche de discours commercial. Il s’agissait de transformer une expertise réelle en système de vente plus clair : qui cible-t-on, avec quel discours, sur quels enjeux, avec quelles étapes, et comment l’équipe garde le cap dans la durée.',
    ],
    quote: 'Merci Laurent Serre pour ton accompagnement et pour tout le travail réalisé ensemble 💪',
    quoteAuthor: 'Benjamin Bernabeu, OVEA',
    illustrates:
      'Structuration commerciale B2B, vente de valeur, cloud souverain, équipe commerciale, passage de l’expertise métier à une méthode partagée.',
    links: [
      { href: '/transformation-commerciale', label: 'Transformation commerciale' },
      { href: '/diagnostic', label: 'Diagnostic commercial' },
    ],
  },
  {
    name: 'Septeo',
    title: 'Closing, objectifs ambitieux et entraînement terrain',
    body: [
      'Avec les équipes Septeo, l’enjeu n’était pas de faire une formation commerciale de plus.',
      'Une équipe mature n’a pas besoin d’un discours motivant plaqué. Elle a besoin d’exigence, de repères communs, de situations rejouées, de gestes commerciaux plus précis et d’un entraînement qui colle au terrain.',
      'Le travail a porté sur le closing, la préparation des entretiens, l’alignement des objectifs et la capacité à transformer l’ambition commerciale en actions concrètes. Sur la période fin 2025 / début 2026, Septeo Hospitality a atteint X10 sur les objectifs.',
      'Ce chiffre doit être lu pour ce qu’il est : le résultat d’un contexte, d’une équipe, d’une ambition et d’un travail mené dans la durée. Pas une recette magique.',
    ],
    quote: 'Merci Laurent pour cet accompagnement top niveau toujours aligné sur nos enjeux business…',
    quoteAuthor: 'Tony Grippon, Septeo',
    illustrates:
      'Closing B2B, équipe commerciale mature, objectifs ambitieux, entraînement terrain, progression sur plusieurs mois.',
    links: [
      { href: '/formation-commerciale-pme', label: 'Formation commerciale PME' },
      { href: '/transformation-commerciale', label: 'Transformation commerciale' },
    ],
  },
  {
    name: 'Bernafon',
    title: 'Relier méthode commerciale et chiffre d’affaires',
    body: [
      'Chez Bernafon, le signal fort est mesurable : +25% de chiffre d’affaires en 2025.',
      'Benoît Arnaudin, Directeur de marque Bernafon France, fait partie des preuves nominatives associées à ce cas. Le post source indique que Benoît raconte concrètement ce que l’accompagnement a changé.',
      'Ce résultat n’est pas à présenter comme une promesse automatique. C’est à présenter comme un cas concret où méthode commerciale, entraînement terrain, suivi régulier et pilotage des progrès ont contribué à une progression nette.',
      'La performance commerciale ne vient pas seulement d’un bon produit ou d’une équipe motivée. Elle vient aussi de la capacité à travailler les fondamentaux dans la durée : mieux préparer les rendez-vous, mieux lire les enjeux clients, mieux traiter les points de blocage, mieux piloter l’activité, et installer des gestes qui restent après l’accompagnement.',
      'Dans un contexte de performance mesurable, l’intérêt du cas Bernafon est de montrer que la méthode commerciale peut se relier à un résultat business clair, à condition de rester précis sur le périmètre et la période.',
    ],
    illustrates:
      'Progression de chiffre d’affaires, méthode commerciale, entraînement terrain, suivi des résultats, pilotage dans la durée, témoignage client nominatif.',
    links: [
      { href: '/formation-commerciale-pme', label: 'Formation commerciale PME' },
      { href: '/diagnostic', label: 'Diagnostic commercial' },
    ],
  },
  {
    name: 'IPO Technologie',
    title: 'Transformer une expertise industrielle en discours commercial lisible',
    body: [
      'IPO Technologie illustre un cas fréquent dans les entreprises industrielles et techniques : la valeur est réelle, mais elle peut rester trop enfermée dans le produit, la technologie ou les caractéristiques métier.',
      'IPO Technologie fabrique des PC durcis en France. Le sujet touche à la souveraineté industrielle, à la fiabilité, à la robustesse, à des usages exigeants. Commercialement, le risque est de rester trop technique et de ne pas rendre immédiatement visible ce que cette expertise change pour le client.',
      'L’accompagnement a porté sur l’efficacité commerciale : prospection, discours, structuration de l’approche et capacité à transformer une expertise technique en arguments compréhensibles, utiles et actionnables pour les prospects.',
      'Le travail commercial consiste souvent à sortir la tête du moteur. Non pas pour renier la technique, mais pour la traduire en enjeux clients : sécurité, continuité, fiabilité, souveraineté, coût de l’erreur, choix d’un partenaire industriel solide.',
    ],
    illustrates:
      'Vente technique, industrie française, souveraineté, prospection, passage de l’expertise produit à un discours commercial clair.',
    links: [{ href: '/expert-developpement-commercial-pme', label: 'Expert développement commercial PME' }],
  },
  {
    name: 'Les Compagnons du Devoir',
    title: 'Développer les compétences entrepreneuriales',
    body: [
      'Avec Les Compagnons du Devoir, l’enjeu est différent d’un accompagnement commercial classique.',
      'Il ne s’agit pas seulement d’aider une équipe commerciale à mieux vendre. Il s’agit de transmettre des fondamentaux entrepreneuriaux à des jeunes déjà engagés dans un métier, avec une vraie exigence professionnelle, mais qui devront aussi comprendre leur marché, défendre leur valeur et structurer leur activité.',
      'Finance, gestion, management et développement commercial deviennent alors des compétences de solidité. Pas des matières annexes. Un entrepreneur qui ne sait pas parler de son offre, écouter un client, mesurer un enjeu ou construire une relation commerciale risque de subir la vente au lieu de la piloter.',
      'L’intérêt de ce cas tient à la transmission : rendre le développement commercial accessible, concret et utile à des profils qui ne se définissent pas d’abord comme commerciaux, mais qui devront vendre leur valeur.',
    ],
    illustrates:
      'Formation entrepreneuriale, transmission, fondamentaux commerciaux, montée en compétences, pédagogie terrain.',
    links: [{ href: '/formation-commerciale-pme', label: 'Formation commerciale PME' }],
  },
  {
    name: 'Mon Coach Brico',
    title: 'Faire monter une équipe entière en compétence commerciale',
    body: [
      'Le témoignage de Dimitri de Cruz illustre un cas très concret : une entreprise où la progression commerciale ne dépend pas uniquement d’un commercial identifié, mais de la capacité de toute l’équipe à mieux comprendre le business, les conversions et les actions qui font avancer l’activité.',
      'L’accompagnement a servi à structurer une promotion interne commerciale : donner un cadre, des outils, des repères de pilotage et une dynamique collective à une petite équipe où chacun doit contribuer au développement.',
      'Après l’accompagnement, Mon Coach Brico observe +15% sur le premier quadrimestre. Ce résultat n’est pas présenté comme une causalité magique ou isolée : Dimitri précise que la formation fait partie d’un ensemble plus large, avec la dynamique créée dans l’entreprise et le travail de l’équipe.',
      'C’est précisément ce qui rend le témoignage crédible : la méthode ne remplace pas les personnes, elle crée les conditions pour que l’équipe transforme son potentiel en résultats mesurables.',
    ],
    quote:
      'Aujourd’hui, l’entreprise fait +15% sur le premier quadrimestre… ce n’est pas lié à la formation seule, mais ça en fait partie.',
    quoteAuthor: 'Dimitri de Cruz, Mon Coach Brico',
    illustrates:
      'Promotion interne commerciale, montée en compétence d’une équipe PME, pilotage commercial, outils de suivi, dynamique collective et progression mesurable avec attribution nuancée.',
    links: [
      { href: '/formation-commerciale-pme', label: 'Formation commerciale PME' },
      { href: '/management-equipe-commerciale', label: 'Management commercial' },
    ],
    video: {
      href: 'https://www.youtube.com/watch?v=jwY2-aKRBac',
      label: 'Voir le témoignage complet de Dimitri sur YouTube',
    },
  },
];

const evidenceMetrics = [
  {
    value: '+15%',
    label: 'sur le premier quadrimestre',
    context:
      'Témoignage Dimitri de Cruz / Mon Coach Brico, avec attribution nuancée : la formation fait partie de la dynamique créée.',
  },
  {
    value: '+25%',
    label: 'de croissance sur un marché à 8,5%',
    context:
      'Preuve issue de la compilation vidéo, à garder en preuve transversale tant que le témoin et le périmètre ne sont pas confirmés.',
  },
  {
    value: '+35%',
    label: 'de chiffre d’affaires',
    context:
      'Témoignage vidéo identifié comme preuve globale, à contextualiser avant attribution nominative.',
  },
  {
    value: '+39%',
    label: 'de chiffre d’affaires par rapport à l’objectif',
    context:
      'Preuve vidéo forte, à relier au cas client exact avant d’en faire un bloc nominatif.',
  },
  {
    value: '+50%',
    label: 'sur un semestre ou un chiffre d’affaires selon les témoignages',
    context:
      'Plusieurs verbatims de la compilation évoquent une progression forte après structuration commerciale.',
  },
  {
    value: '+90%',
    label: 'sur deux mois',
    context:
      'Signal très fort à présenter avec prudence, comme preuve globale tant que la période et le contexte ne sont pas validés.',
  },
];

const proofPoints = [
  {
    title: 'Une expertise métier ne suffit pas à vendre',
    text: 'Beaucoup d’entreprises savent très bien faire leur métier. Leur difficulté n’est pas le produit. Elle est souvent ailleurs : transformer cette valeur en discours commercial clair, en rendez-vous utiles, en décisions clients et en méthode partagée par l’équipe.',
  },
  {
    title: 'Une formation commerciale utile doit changer les gestes',
    text: 'Une formation qui donne de l’énergie mais ne change pas les rendez-vous ne sert pas longtemps. Ce qui compte, c’est ce qui reste après : meilleure préparation, meilleure découverte, meilleur closing, objections mieux travaillées, managers plus exigeants dans les débriefs.',
  },
  {
    title: 'Le management commercial doit rendre le réel visible',
    text: 'Un pipeline rempli ne suffit pas. Il faut savoir quelles affaires sont vraiment actives, quels clients ont un enjeu réel, quels commerciaux se racontent une histoire et quelles décisions doivent être prises maintenant.',
  },
  {
    title: 'La transformation tient quand elle devient un système',
    text: 'Un bon accompagnement ne repose pas sur un coup d’éclat. Il installe des habitudes : diagnostic, plan d’action, entraînement, rituels, suivi et corrections régulières.',
  },
];

const methodSteps = [
  ['Diagnostic commercial', 'Avant de former ou de transformer, il faut comprendre où se situe le vrai blocage : ciblage, discours commercial, découverte, closing, management, pilotage, CRM, organisation ou niveau d’exigence dans l’équipe.'],
  ['Plan de vente et priorités', 'Tout ne peut pas être corrigé en même temps. Il faut choisir les leviers qui auront le plus d’impact : discours, ciblage, qualification, rendez-vous, management, rituels ou suivi.'],
  ['Entraînement terrain', 'Les commerciaux ne progressent pas seulement parce qu’ils comprennent. Ils progressent parce qu’ils répètent, débriefent, corrigent et rejouent des situations concrètes.'],
  ['Management commercial', 'La transformation tient quand le manager sait faire vivre les nouveaux repères : débriefs, réunions utiles, requalification du pipe, suivi des actions et décisions claires.'],
  ['IA utile au commercial', 'L’IA peut renforcer la méthode si elle aide à mieux préparer, mieux synthétiser et mieux repérer le flou. Elle ne doit pas devenir un gadget de plus dans une organisation commerciale déjà confuse.'],
];

const faqItems = [
  {
    question: 'Quels types de PME peuvent bénéficier d’un accompagnement commercial ?',
    answer:
      'Les PME B2B qui ont déjà une vraie activité, une offre solide et un enjeu de structuration commerciale. Cela concerne souvent les entreprises avec une équipe de vente existante ou en construction, un dirigeant encore très impliqué dans le commerce, et un besoin de rendre la performance plus régulière.',
  },
  {
    question: 'Combien de temps faut-il pour observer une transformation commerciale ?',
    answer:
      'On peut voir des changements rapidement si le diagnostic est juste et si l’équipe s’implique. Mais une transformation commerciale sérieuse se construit dans la durée : clarification du discours, entraînement, management, suivi et ajustements réguliers.',
  },
  {
    question: 'Quelle différence entre formation commerciale et transformation commerciale ?',
    answer:
      'Une formation transmet des méthodes et entraîne des gestes. Une transformation commerciale va plus loin : elle touche l’organisation, le management, les rituels, les critères de qualification, le pilotage et la manière dont l’équipe lit réellement ses opportunités.',
  },
  {
    question: 'Comment les résultats commerciaux sont-ils mesurés ?',
    answer:
      'Les résultats peuvent se mesurer par le chiffre d’affaires, les taux de conversion, la qualité du pipeline, la régularité commerciale, la capacité à mieux qualifier, la progression des commerciaux, la qualité des rendez-vous ou la clarté des décisions prises en management commercial.',
  },
  {
    question: 'Le diagnostic commercial est-il adapté à une équipe de 5 à 20 commerciaux ?',
    answer:
      'Oui. C’est même une taille où les problèmes sont souvent très visibles : assez de commerciaux pour avoir besoin de structure, mais pas toujours assez de management ou de méthode pour rendre la performance vraiment prévisible.',
  },
  {
    question: 'Peut-on intégrer l’IA sans complexifier le travail des commerciaux ?',
    answer:
      'Oui, à condition de partir des usages réels. L’IA doit aider à préparer, écouter, synthétiser, relancer ou repérer les zones floues. Si elle ajoute du reporting ou de la complexité, elle devient un problème de plus.',
  },
];

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cas clients & transformations commerciales PME',
    description: metadata.description,
    url: 'https://www.laurentserre.com/cas-clients',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Laurent Serre',
      url: 'https://www.laurentserre.com',
    },
    about: [
      'Développement commercial PME',
      'Formation commerciale',
      'Transformation commerciale',
      'Management commercial',
      'Témoignages clients vidéo',
      'Preuves commerciales mesurables',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.laurentserre.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cas clients',
        item: 'https://www.laurentserre.com/cas-clients',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
];

export default function CasClientsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-ink via-blue-ink/95 to-mint-green/20 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,163,0.18),transparent_35%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full mb-8">
            <span className="w-3 h-3 bg-mint-green rounded-full" />
            <span className="font-title font-semibold text-mint-green text-sm md:text-base">
              Preuves terrain & transformations commerciales
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
            Cas clients & transformations commerciales PME
          </h1>

          <div className="max-w-5xl mx-auto mt-8 space-y-5 text-lg sm:text-xl text-white/92 leading-relaxed">
            <p>
              Les résultats commerciaux ne se prouvent pas avec de grands discours. Ils se voient dans les équipes qui vendent mieux, dans les managers qui pilotent plus clairement, dans les commerciaux qui arrêtent d’improviser, et dans les dirigeants qui retrouvent une lecture plus fiable de leur développement commercial.
            </p>
            <p>
              Cette page rassemble des exemples d’accompagnements menés par Laurent Serre auprès d’entreprises B2B, d’équipes commerciales, d’acteurs techniques et d’organisations en transformation : structuration commerciale, formation terrain, closing, management, pilotage et montée en compétences.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row justify-center items-center pt-10">
            <Link href="/diagnostic">
              <Button variant="primary" size="lg" icon="🎯" className="w-full sm:w-auto">
                Faire le diagnostic commercial
              </Button>
            </Link>
            <Link href="/transformation-commerciale">
              <Button variant="outline" size="lg" icon="🚀" className="w-full sm:w-auto">
                Comprendre la transformation commerciale
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-mint-green/20 bg-mint-green/5 p-8 lg:p-10 shadow-sm">
            <p className="text-xl lg:text-2xl font-title font-bold text-blue-ink mb-5">
              Laurent Serre accompagne des PME B2B dans la structuration de leur performance commerciale : diagnostic, plan de vente, formation terrain, management commercial, rituels de pilotage et intégration pragmatique de l’IA.
            </p>
            <div className="space-y-4 text-lg text-gray-anthracite leading-relaxed">
              <p>
                L’objectif n’est pas de motiver une équipe pendant trois jours. L’objectif est de rendre la vente plus lisible, plus régulière et plus transmissible : mieux qualifier les opportunités, mieux préparer les rendez-vous, clarifier les enjeux clients, entraîner les commerciaux sur des situations réelles et aider les managers à challenger la réalité commerciale sans casser la dynamique de l’équipe.
              </p>
              <p>
                Les cas présentés ici montrent des contextes différents : cloud souverain, logiciel, santé auditive, industrie française, formation entrepreneuriale. Le point commun n’est pas le secteur. C’est la transformation d’une expertise en système commercial plus clair, plus exigeant et plus opérationnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl lg:text-5xl font-title font-bold text-blue-ink mb-4">
              Ce que ces cas clients démontrent
            </h2>
            <p className="text-lg text-gray-anthracite leading-relaxed">
              Ces exemples ne racontent pas une méthode magique. Ils montrent ce qui change quand le diagnostic, l’entraînement et le pilotage commercial deviennent concrets.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {proofPoints.map((point) => (
              <article key={point.title} className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-title font-bold text-blue-ink mb-3">{point.title}</h3>
                <p className="text-gray-anthracite leading-relaxed">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mb-12">
            <p className="text-sm font-title font-bold uppercase tracking-[0.2em] text-mint-green mb-3">
              Preuves vidéo analysées
            </p>
            <h2 className="text-3xl lg:text-5xl font-title font-bold text-blue-ink mb-5">
              Des progressions mesurables, présentées sans promesse magique
            </h2>
            <div className="space-y-4 text-lg text-gray-anthracite leading-relaxed">
              <p>
                Les témoignages vidéo sont conservés sur YouTube pour l’instant : c’est le support le plus stable pour l’intégration, le partage et l’indexation. Ils montrent des progressions fortes après accompagnement : +15%, +25%, +35%, +39%, +50%, +90%, objectifs dépassés ou volumes de vente franchis. Ces chiffres doivent rester attachés à leur contexte, leur période et leur périmètre.
              </p>
              <p>
                La lecture juste n’est pas “Laurent produit seul le résultat”. La lecture juste est plus solide : la méthode, l’entraînement et le pilotage créent une dynamique dans laquelle les équipes transforment enfin leur potentiel en résultats mesurables.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {evidenceMetrics.map((metric) => (
              <article key={`${metric.value}-${metric.label}`} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <p className="text-4xl font-title font-extrabold text-mint-green mb-2">{metric.value}</p>
                <h3 className="text-lg font-title font-bold text-blue-ink mb-3">{metric.label}</h3>
                <p className="text-sm text-gray-anthracite leading-relaxed">{metric.context}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-orange-soft/30 bg-orange-soft/10 p-6">
            <p className="font-title font-bold text-blue-ink mb-2">Note éditoriale</p>
            <p className="text-gray-anthracite leading-relaxed">
              Le cas Dimitri de Cruz / Mon Coach Brico peut être utilisé nommément. Les autres chiffres issus de la compilation restent, eux, en preuve transversale tant que chaque témoin n’est pas relié avec certitude à son entreprise, à sa période et à sa métrique.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl lg:text-5xl font-title font-bold text-blue-ink mb-4">Cas clients</h2>
            <p className="text-lg text-gray-anthracite leading-relaxed">
              Chaque cas est présenté avec son contexte, le travail réalisé et ce qu’il illustre. Les chiffres restent attachés à leur période et à leur périmètre : ils ne sont pas une promesse généralisée.
            </p>
          </div>

          <div className="space-y-8">
            {clientCases.map((client) => (
              <article key={client.name} className="rounded-3xl border border-gray-200 bg-white p-7 lg:p-10 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                  <div>
                    <p className="text-sm font-title font-bold uppercase tracking-[0.2em] text-mint-green mb-2">
                      {client.name}
                    </p>
                    <h3 className="text-2xl lg:text-3xl font-title font-bold text-blue-ink">
                      {client.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {client.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-full border border-mint-green/30 px-4 py-2 text-sm font-semibold text-blue-ink hover:bg-mint-green/10 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    {client.video && (
                      <a
                        href={client.video.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-orange-soft/40 px-4 py-2 text-sm font-semibold text-blue-ink hover:bg-orange-soft/10 transition-colors"
                      >
                        {client.video.label}
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-4 text-gray-anthracite leading-relaxed text-lg">
                  {client.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {client.quote && client.quoteAuthor && (
                  <blockquote className="mt-7 border-l-4 border-mint-green bg-mint-green/5 p-5 rounded-r-2xl">
                    <p className="text-lg font-italic text-blue-ink leading-relaxed">“{client.quote}”</p>
                    <footer className="mt-3 text-sm font-semibold text-gray-anthracite">— {client.quoteAuthor}</footer>
                  </blockquote>
                )}

                <div className="mt-7 rounded-2xl bg-blue-ink/5 p-5">
                  <p className="font-title font-bold text-blue-ink mb-2">Ce que ce cas illustre :</p>
                  <p className="text-gray-anthracite leading-relaxed">{client.illustrates}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-title font-bold text-blue-ink mb-5">Vidéos témoignages</h2>
          <p className="text-lg text-gray-anthracite leading-relaxed">
            Les vidéos témoignages permettent d’entendre directement les retours d’expérience. Mais une vidéo seule ne rend pas toujours la preuve lisible pour un visiteur pressé, ni pour un moteur de recherche. Chaque témoignage doit donc être accompagné d’un court contexte : problème de départ, travail réalisé, changement observé.
          </p>
        </div>
        <TestimonialVideoSection />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10">
          <div className="rounded-3xl bg-white border border-gray-200 p-7 lg:p-9 shadow-sm">
            <p className="text-lg text-gray-anthracite leading-relaxed">
              Ces témoignages ne remplacent pas un diagnostic. Ils montrent une chose : quand le problème commercial est bien lu, le travail peut devenir beaucoup plus concret. On ne parle plus seulement de motivation ou de bonnes pratiques. On parle de rendez-vous mieux préparés, de managers plus exigeants, de commerciaux mieux entraînés et d’équipes capables de lire plus clairement leurs opportunités.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl lg:text-5xl font-title font-bold text-blue-ink mb-4">
              La méthode commune derrière ces transformations
            </h2>
            <p className="text-lg text-gray-anthracite leading-relaxed">
              Les contextes changent, mais les transformations solides reposent souvent sur les mêmes fondations : regarder le réel, choisir les bons leviers, entraîner et piloter dans la durée.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodSteps.map(([title, text], index) => (
              <article key={title} className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <div className="w-10 h-10 rounded-full bg-mint-green/15 text-mint-green font-title font-bold flex items-center justify-center mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-title font-bold text-blue-ink mb-3">{title}</h3>
                <p className="text-gray-anthracite leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl lg:text-5xl font-title font-bold text-blue-ink mb-10">Questions fréquentes</h2>
          <div className="space-y-5">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-title font-bold text-blue-ink mb-3">{item.question}</h3>
                <p className="text-gray-anthracite leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-blue-ink text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl lg:text-5xl font-title font-bold mb-6">
            Vous voulez savoir ce que ces cas clients disent de votre propre organisation commerciale ?
          </h2>
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-10">
            Chaque entreprise a ses symptômes : pipeline flou, équipe trop dépendante du dirigeant, formation qui ne tient pas dans le temps, commerciaux motivés mais irréguliers, management trop pompier, CRM rempli mais peu utile. Le diagnostic permet de remettre les choses dans l’ordre : où est le vrai blocage, ce qu’il coûte, et par quoi commencer pour avancer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic">
              <Button variant="primary" size="lg" icon="🎯" className="w-full sm:w-auto">
                Faire le diagnostic commercial
              </Button>
            </Link>
            <Link href="/transformation-commerciale">
              <Button variant="outline" size="lg" icon="🚀" className="w-full sm:w-auto">
                Découvrir la transformation commerciale
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
