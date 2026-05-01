import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, CheckCircle, MessageSquare, ShieldAlert, Target, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IA commerciale PME : usages utiles, méthode et garde-fous | Laurent Serre',
  description:
    'Comment utiliser l’IA commerciale en PME sans lisser la voix des commerciaux ni masquer le flou : préparation, CRM, relance, management et méthode terrain.',
  keywords:
    'IA commercial PME, IA commerciale PME, intelligence artificielle commerciale, IA vente B2B, CRM IA, management commercial IA, Laurent Serre',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://www.laurentserre.com/ia-commercial-pme',
  },
  openGraph: {
    title: 'IA commerciale PME : rendre vos ventes plus claires, pas plus génériques',
    description:
      'Une méthode terrain pour utiliser l’IA dans la vente B2B sans remplacer le discernement commercial ni lisser la voix de l’équipe.',
    url: 'https://www.laurentserre.com/ia-commercial-pme',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const usefulUses = [
  {
    title: 'Préparer les rendez-vous',
    text: 'L’IA peut aider à relire le contexte, structurer les questions et identifier ce qui reste à vérifier avant de parler solution.',
  },
  {
    title: 'Synthétiser sans appauvrir',
    text: 'Une transcription ou une note CRM devient utile si elle conserve les mots du client, les signaux faibles et les vrais points de décision.',
  },
  {
    title: 'Relancer avec justesse',
    text: 'L’IA peut proposer une relance claire, mais le commercial doit garder la responsabilité du ton, du timing et de l’intention commerciale.',
  },
  {
    title: 'Aider le manager à questionner les affaires en cours',
    text: 'Les comptes-rendus peuvent faire ressortir les affaires floues, les prochaines étapes faibles et les décisions non vérifiées.',
  },
];

const methodSteps = [
  ['Diagnostiquer la matière commerciale', 'Avant de choisir un outil IA, il faut regarder ce que l’équipe capture vraiment après les rendez-vous : besoin, enjeu, décideur, urgence, objections et prochaine étape.'],
  ['Choisir quelques cas d’usage utiles', 'Préparation de rendez-vous, reformulation d’un compte-rendu, analyse d’une proposition, relance ou débrief manager : mieux vaut commencer petit et concret.'],
  ['Garder une voix humaine', 'L’IA doit aider à clarifier, pas à produire des messages interchangeables. Laurent insiste sur ce point : l’IA facilite la communication, mais elle peut lisser les voix.'],
  ['Installer des rituels managériaux', 'Un bon usage IA tient quand le manager s’en sert pour améliorer les conversations commerciales, pas pour ajouter une couche de reporting.'],
  ['Mesurer ce qui change sur le terrain', 'Le bon indicateur n’est pas le nombre de textes générés. C’est la qualité des rendez-vous, des relances, des décisions et des affaires en cours.'],
];

const comparisonRows = [
  {
    use: 'Compte-rendu de rendez-vous',
    risk: 'Produire un résumé propre mais trop vague.',
    guardrail: 'Conserver les mots du client, les objections, le décideur et la prochaine étape datée.',
  },
  {
    use: 'Relance commerciale',
    risk: 'Envoyer un message poli, long et générique.',
    guardrail: 'Partir du vrai enjeu client et garder un ton direct, humain et situé.',
  },
  {
    use: 'Préparation de proposition',
    risk: 'Rendre plus élégante une offre construite sur un besoin mal compris.',
    guardrail: 'Vérifier d’abord le problème, le coût de l’inaction et les critères de décision.',
  },
  {
    use: 'Management des affaires en cours',
    risk: 'Masquer les affaires faibles derrière des notes mieux rédigées.',
    guardrail: 'Faire ressortir les zones floues et décider quoi requalifier, accélérer ou sortir du portefeuille commercial.',
  },
];

const faqItems = [
  {
    question: 'Qu’est-ce que l’IA commerciale pour une PME ?',
    answer:
      'L’IA commerciale désigne les usages de l’intelligence artificielle qui aident une équipe de vente à préparer ses rendez-vous, mieux exploiter ses notes CRM, relancer plus justement, structurer ses propositions et piloter ses affaires en cours. En PME, elle doit rester très concrète et reliée au terrain.'
  },
  {
    question: 'L’IA peut-elle remplacer un commercial ?',
    answer:
      'Non. L’IA peut aider à lire, structurer et reformuler la matière commerciale, mais elle ne remplace pas le jugement du commercial, la relation client, l’écoute en rendez-vous ni la responsabilité de décider quoi faire ensuite.',
  },
  {
    question: 'Pourquoi l’IA produit-elle parfois des messages commerciaux génériques ?',
    answer:
      'Parce qu’elle travaille souvent à partir d’une matière trop pauvre : notes CRM vagues, enjeux clients mal captés, décideurs non identifiés, objections mal comprises. Si l’entrée est floue, la sortie sera plus propre, mais pas forcément plus juste.',
  },
  {
    question: 'Par où commencer avec l’IA commerciale dans une PME ?',
    answer:
      'Il faut commencer par un diagnostic des pratiques commerciales réelles : qualité des comptes-rendus, préparation des rendez-vous, relances, propositions et rituels de management. Ensuite seulement, on choisit quelques usages IA simples et mesurables.',
  },
  {
    question: 'Quel lien entre CRM et IA commerciale ?',
    answer:
      'Le CRM garde la mémoire commerciale. L’IA peut activer cette mémoire si les informations sont précises. Si le CRM est vide ou rempli de notes génériques, l’IA risque surtout d’industrialiser le flou.',
  },
];

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'IA commerciale PME : usages utiles, méthode et garde-fous',
    description: metadata.description,
    url: 'https://www.laurentserre.com/ia-commercial-pme',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Laurent Serre',
      url: 'https://www.laurentserre.com',
    },
    about: [
      'IA commerciale PME',
      'Intelligence artificielle commerciale',
      'CRM commercial',
      'Management commercial',
      'Développement commercial PME',
    ],
    author: {
      '@type': 'Person',
      name: 'Laurent Serre',
      url: 'https://www.laurentserre.com',
    },
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
        name: 'IA commerciale PME',
        item: 'https://www.laurentserre.com/ia-commercial-pme',
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

export default function IaCommercialPmePage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-ink via-blue-ink/95 to-mint-green/20 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,163,0.18),transparent_35%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-mint-green/30 bg-mint-green/10 px-6 py-3 backdrop-blur-sm">
              <Bot className="h-5 w-5 text-mint-green" />
              <span className="font-title text-sm font-semibold text-mint-green md:text-base">
                IA commerciale PME
              </span>
            </div>

            <h1 className="font-title text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-7xl">
              IA commerciale PME : rendre vos ventes plus claires, pas plus génériques
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/92 sm:text-xl">
              L’IA peut aider une équipe commerciale à mieux préparer, écouter, synthétiser et relancer. Mais si elle sert à masquer un CRM vide, une qualification floue ou une voix commerciale standardisée, elle accélère surtout le mauvais problème.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/diagnostic" className="inline-flex items-center justify-center rounded-full bg-mint-green px-8 py-4 font-semibold text-blue-ink transition-colors hover:bg-mint-green/90">
                Diagnostiquer vos usages IA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/blog/pourquoi-vos-commerciaux-remplissent-mal-le-crm-et-utilisent-mal-lia" className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-blue-ink">
                Lire l’article CRM & IA
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-mint-green/20 bg-mint-green/5 p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-mint-green">Réponse courte</p>
            <h2 className="mt-3 font-title text-3xl font-bold text-blue-ink">
              Une IA commerciale utile commence par une meilleure matière commerciale.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-anthracite">
              Pour une PME B2B, l’IA commerciale n’est pas d’abord un outil pour écrire plus vite. C’est un levier pour mieux exploiter les rendez-vous, les notes CRM, les objections, les relances et les décisions de management. Elle devient utile quand elle rend le réel commercial plus visible. Elle devient dangereuse quand elle rend le flou plus présentable.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-3xl">
            <h2 className="font-title text-3xl font-bold text-blue-ink md:text-4xl">
              Où l’IA aide vraiment une équipe commerciale
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-anthracite">
              Les meilleurs usages sont proches du terrain : ils renforcent la préparation, la clarté et les décisions. Ils ne remplacent pas le commercial.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {usefulUses.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
                <CheckCircle className="mb-5 h-7 w-7 text-mint-green" />
                <h3 className="font-title text-xl font-bold text-blue-ink">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-anthracite">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-red-50 px-5 py-3 text-red-700">
              <ShieldAlert className="h-5 w-5" />
              <span className="font-semibold">Le risque principal</span>
            </div>
            <h2 className="font-title text-3xl font-bold text-blue-ink md:text-4xl">
              L’IA peut lisser les voix commerciales au lieu de les rendre plus justes
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-anthracite">
              <p>
                Laurent le formule simplement : l’IA facilite la communication, mais elle peut donner l’impression que tout le monde parle pareil. Les posts, les mails et les propositions deviennent plus propres, mais parfois moins incarnés.
              </p>
              <p>
                Dans la vente B2B, ce lissage est dangereux. Un client ne cherche pas une prose parfaite. Il cherche quelqu’un qui comprend son contexte, reformule son enjeu, pose les bonnes questions et assume une recommandation.
              </p>
              <p>
                La bonne question n’est donc pas : “comment produire plus de contenu avec l’IA ?” mais “comment garder un ton réel, précis, situé, qui part de l’expérience terrain ?”
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-blue-ink p-8 text-white">
            <MessageSquare className="mb-6 h-10 w-10 text-mint-green" />
            <h3 className="font-title text-2xl font-bold">Un bon usage IA ne cache pas le flou</h3>
            <p className="mt-5 leading-relaxed text-white/85">
              Si une affaire est mal qualifiée, si le décideur n’est pas identifié, si la prochaine étape est molle, l’IA ne doit pas fabriquer une belle relance pour masquer le problème. Elle doit aider le commercial et le manager à voir ce qui reste à clarifier.
            </p>
            <Link href="/management-equipe-commerciale" className="mt-8 inline-flex items-center font-semibold text-mint-green hover:underline">
              Relier IA et management commercial <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-3xl">
            <h2 className="font-title text-3xl font-bold text-blue-ink md:text-4xl">
              Méthode PME : installer l’IA sans perdre le réel commercial
            </h2>
            <p className="mt-4 text-lg text-gray-anthracite">
              La méthode doit rester simple : partir du terrain, choisir peu d’usages, puis mesurer ce qui change vraiment dans les ventes.
            </p>
          </div>

          <div className="space-y-5">
            {methodSteps.map(([title, text], index) => (
              <div key={title} className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint-green font-bold text-blue-ink">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-title text-xl font-bold text-blue-ink">{title}</h3>
                  <p className="mt-2 leading-relaxed text-gray-anthracite">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-3xl">
            <h2 className="font-title text-3xl font-bold text-blue-ink md:text-4xl">
              Usages utiles, risques et garde-fous
            </h2>
            <p className="mt-4 text-lg text-gray-anthracite">
              L’IA commerciale doit être cadrée. Sinon, elle ajoute de la vitesse à une mécanique déjà imprécise.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid bg-blue-ink text-sm font-semibold uppercase tracking-wide text-white md:grid-cols-3">
              <div className="p-5">Usage</div>
              <div className="p-5">Risque</div>
              <div className="p-5">Garde-fou</div>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.use} className="grid border-t border-slate-200 bg-white md:grid-cols-3">
                <div className="p-5 font-semibold text-blue-ink">{row.use}</div>
                <div className="p-5 text-gray-anthracite">{row.risk}</div>
                <div className="p-5 text-gray-anthracite">{row.guardrail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-ink to-blue-ink/90 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Target className="mb-6 h-10 w-10 text-mint-green" />
            <h2 className="font-title text-3xl font-bold md:text-4xl">
              Avant d’ajouter de l’IA, regardez votre système commercial
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/85">
              Une PME peut gagner en clarté avec l’IA si les fondamentaux sont travaillés : qualification, CRM, relances, propositions, management et rituels d’équipe. Sinon, l’outil devient une couche de plus.
            </p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm">
            <Users className="mb-5 h-8 w-8 text-mint-green" />
            <h3 className="font-title text-2xl font-bold">Diagnostic commercial</h3>
            <p className="mt-4 text-white/80">
              Identifier les usages IA vraiment utiles commence par comprendre où le commerce est flou aujourd’hui.
            </p>
            <Link href="/diagnostic" className="mt-7 inline-flex items-center rounded-full bg-mint-green px-6 py-3 font-semibold text-blue-ink hover:bg-mint-green/90">
              Demander un diagnostic <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-title text-3xl font-bold text-blue-ink md:text-4xl">
            Questions fréquentes sur l’IA commerciale en PME
          </h2>
          <div className="mt-12 space-y-5">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
                <h3 className="font-title text-xl font-bold text-blue-ink">{item.question}</h3>
                <p className="mt-3 leading-relaxed text-gray-anthracite">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-mint-green/20 bg-mint-green/5 p-8 md:p-10">
            <h2 className="font-title text-3xl font-bold text-blue-ink">
              Pour aller plus loin
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Link href="/blog/pourquoi-vos-commerciaux-remplissent-mal-le-crm-et-utilisent-mal-lia" className="rounded-2xl bg-white p-5 font-semibold text-blue-ink shadow-sm ring-1 ring-slate-200 hover:text-mint-green">
                Pourquoi vos commerciaux remplissent mal le CRM… et utilisent mal l’IA
              </Link>
              <Link href="/formation-commerciale-pme" className="rounded-2xl bg-white p-5 font-semibold text-blue-ink shadow-sm ring-1 ring-slate-200 hover:text-mint-green">
                Formation commerciale PME
              </Link>
              <Link href="/transformation-commerciale" className="rounded-2xl bg-white p-5 font-semibold text-blue-ink shadow-sm ring-1 ring-slate-200 hover:text-mint-green">
                Transformation commerciale
              </Link>
              <Link href="/cas-clients" className="rounded-2xl bg-white p-5 font-semibold text-blue-ink shadow-sm ring-1 ring-slate-200 hover:text-mint-green">
                Cas clients & transformations commerciales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
