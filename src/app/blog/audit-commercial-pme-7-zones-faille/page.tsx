import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/audit-commercial-pme-7-zones-faille';
const heroImage = 'https://www.laurentserre.com/images/blog/audit-commercial-7-zones/audit-commercial-hero.webp';
const ogImage = 'https://www.laurentserre.com/images/blog/audit-commercial-7-zones/audit-commercial-og.jpg';

export const metadata: Metadata = {
  title: 'Audit commercial PME : les 7 zones de faille à vérifier',
  description:
    "Un audit commercial en PME ne consiste pas à remplir un questionnaire. C'est une investigation en 7 zones qui révèle où votre chiffre d'affaires fuit vraiment. Tests pratiques de 10 minutes.",
  keywords:
    'audit commercial PME, diagnostic commercial entreprise, comment auditer son équipe commerciale, audit performance commerciale, revue commerciale structurée PME, audit process de vente B2B, audit équipe commerciale',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-25',
  },
  openGraph: {
    title: "Audit commercial PME : les 7 zones de faille que vous ne vérifiez jamais",
    description:
      "Un audit commercial en PME ne consiste pas à remplir un questionnaire. C'est une investigation en 7 zones qui révèle où votre chiffre d'affaires fuit vraiment.",
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Audit commercial PME : les 7 zones de faille à vérifier",
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Audit commercial PME : les 7 zones de faille que vous ne vérifiez jamais | Laurent Serre",
    description:
      "Un audit commercial en PME ne consiste pas à remplir un questionnaire. C'est une investigation en 7 zones qui révèle où votre chiffre d'affaires fuit vraiment.",
    images: [ogImage],
  },
};

const carouselPrefix = '/images/blog/audit-commercial-7-zones';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Couverture : Les 7 zones de faille de votre audit commercial', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-kpis-verts.webp`, alt: 'Le dirigeant fier de ses KPIs au vert', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-ca-stagne.webp`, alt: 'Laurent : mais pourquoi le CA stagne ?', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-silence.webp`, alt: 'Silence gêné, le dirigeant dit "le marché"', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-deals-perdus.webp`, alt: 'Laurent ouvre les 10 derniers deals perdus', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-prix-ou-priorite.webp`, alt: '8 sur 10 : "perdu sur le prix" ou "budget gelé"', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-qualification.webp`, alt: 'Laurent : ce n\'est pas le prix, c\'est la qualification', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-carte-7-zones.webp`, alt: 'La carte des 7 zones : chaque zone avec son drapeau rouge', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-zone-pipeline.webp`, alt: 'Zone 1 : 60% des deals sans date de prochaine étape', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-zone-qualification.webp`, alt: 'Zone 3 : les deals "perdus sur le prix" sont mal qualifiés', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-dirigeant-crayon.webp`, alt: 'Le dirigeant : je peux faire ça aujourd\'hui ?', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-chute.webp`, alt: 'Chute : l\'audit n\'est pas un rapport, c\'est une décision', index: 11 },
];

const faqItems = [
  {
    question: "Qu'est-ce qu'un audit commercial en PME ?",
    answer:
      "Un audit commercial en PME est une investigation structurée qui examine sept zones clés de votre activité commerciale : le pipeline, la qualification, le process de vente, les compétences des commerciaux, les outils, le portefeuille clients et le système de pilotage. Contrairement à un simple questionnaire, il confronte les chiffres à la réalité du terrain pour identifier où se situent les vraies fuites de chiffre d'affaires.",
  },
  {
    question: "Combien de temps prend un audit commercial ?",
    answer:
      "Chaque zone se teste en moins de 10 minutes. Les 7 zones se font en une demi-journée, seul ou avec son équipe. Un audit complet mené par un consultant externe prend généralement une à deux semaines selon la taille de l'équipe et la complexité des enjeux.",
  },
  {
    question: "Comment auditer son équipe commerciale soi-même ?",
    answer:
      "Commencez par un test simple par zone : pipeline sans date d'étape, deals perdus sans diagnostic de budget, trois commerciaux qui décrivent trois process différents, CRM non mis à jour depuis plus de 48 heures, clients partis sans alerte. Chaque test est décrit dans cet article. Si plusieurs zones sont dans le rouge, un regard externe apporte un diagnostic plus franc.",
  },
  {
    question: "Quels sont les signes qu'une PME a besoin d'un audit commercial ?",
    answer:
      "Les signaux d'alerte : le CA stagne ou baisse sans cause claire, le pipeline est plein mais le forecast ne tient jamais, les commerciaux disent systématiquement 'perdu sur le prix', la réunion commerciale commente les chiffres sans décider, les bons clients partent sans prévenir, et les outils CRM sont remplis la veille de la revue.",
  },
  {
    question: "Quels outils utiliser pour un audit commercial ?",
    answer:
      "Le seul outil nécessaire pour un premier audit est un tableur. Listez vos deals avec leurs dates, étapes, montants et motifs de perte. Demandez à chaque commercial de décrire son process. Regardez la date du dernier update CRM. C'est en croisant ces données brutes que les fuites apparaissent. Pas besoin de logiciel sophistiqué pour voir qu'un pipeline sans qualification est un mirage.",
  },
];

const articleContent = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "Audit commercial PME : les 7 zones de faille que vous ne vérifiez jamais",
      description:
        "Un audit commercial en PME ne consiste pas à remplir un questionnaire. C'est une investigation en 7 zones qui révèle où votre chiffre d'affaires fuit vraiment.",
      image: heroImage,
      datePublished: "2026-06-25",
      dateModified: "2026-06-25",
      author: {
        name: "Laurent Serre",
        url: "https://www.laurentserre.com/a-propos",
        sameAs: [
          "https://www.linkedin.com/in/laurentserre34/",
          "https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/",
        ],
      },
      publisher: {
        name: "Laurent Serre",
        url: "https://www.laurentserre.com",
      },
      mainEntityOfPage: {
        "@id": articleUrl,
      },
      articleSection: "Performance commerciale / Diagnostic",
      keywords: [
        "audit commercial PME",
        "diagnostic commercial entreprise",
        "comment auditer son équipe commerciale",
        "audit performance commerciale",
        "revue commerciale structurée PME",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${articleUrl}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.laurentserre.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.laurentserre.com/blog" },
        { "@type": "ListItem", position: 3, name: "Audit commercial PME", item: articleUrl },
      ],
    },
  ],
};

export default function AuditCommercialPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleContent) }}
      />

      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Audit commercial PME</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Performance commerciale / Diagnostic
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Audit commercial PME : les 7 zones de faille que vous ne vérifiez jamais
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
              <time dateTime="2026-06-25">25 juin 2026</time>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/audit-commercial-7-zones/audit-commercial-hero.webp"
              alt="Audit commercial PME : investigation en 7 zones"
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              Ce qu&apos;il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Un audit commercial en PME ne consiste pas à remplir un questionnaire. C&apos;est une investigation en 7 zones qui révèle où votre chiffre d&apos;affaires fuit vraiment. Chaque zone a son symptôme visible, sa cause racine cachée et un test pratique à faire en moins de 10 minutes. Par où commencer ? Par le test le plus court. Si votre pipeline contient plus de 30% de deals sans date, vous savez déjà où regarder.
            </p>
          </div>

          {/* BD Carousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Audit commercial, les 7 failles
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire d&apos;un dirigeant fier de ses KPIs verts. Jusqu&apos;à ce que Laurent ouvre les 10 derniers deals perdus. Chaque zone de faille, un diagnostic. Chaque diagnostic, un test de 10 minutes.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Audit commercial PME en 7 zones"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-audit-commercial-7-zones.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (12 planches)
              </Link>
            </div>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Combien de ces 7 zones sont dans le rouge dans votre équipe ? Diagnostic offert
            </Link>
          </div>

          {/* Introduction */}
          <p className="mb-8">
            Il y a quelques semaines, je suis en rendez-vous dans une PME de 40 personnes. Le dirigeant m&apos;accueille avec un grand sourire et ouvre son tableau de bord. Tout est vert. Pipeline, taux de conversion, cycle de vente, nombre de rendez-vous. Chaque KPI est dans le vert. Il me regarde, fier.
          </p>
          <p className="mb-8">
            « Alors, Laurent, qu&apos;est-ce que vous en pensez ? »
          </p>
          <p className="mb-8">
            Je regarde les graphiques. C&apos;est beau. Vraiment. Un tableau de bord bien fait, des couleurs qui rassurent. Puis je regarde la ligne du bas, celle qui ne ment pas : le chiffre d&apos;affaires. Il stagne depuis six mois.
          </p>
          <p className="mb-8">
            « Tout est au vert, mais votre CA n&apos;a pas bougé depuis janvier. Vous avez une idée de pourquoi ? »
          </p>
          <p className="mb-8">
            Le sourire s&apos;efface. « Le marché est compliqué en ce moment. »
          </p>
          <p className="mb-8">
            C&apos;est toujours la première réponse. Pas la bonne.
          </p>
          <p className="mb-8">
            On a ouvert les dix derniers deals perdus. Huit sur dix avec la même annotation : « perdu sur le prix » ou « budget gelé ». Puis on a ouvert les dix deals gagnés. Cinq sur dix avec une remise de plus de 15%.
          </p>
          <p className="mb-8">
            Le problème n&apos;était pas le marché. Le problème n&apos;était pas le prix non plus. Le problème était la zone 3 : la qualification. Ses commerciaux présentaient avant d&apos;avoir compris. Et comme ils n&apos;avaient pas creusé le besoin, ils n&apos;avaient aucun levier pour défendre leur prix.
          </p>
          <p className="mb-8">
            Les KPIs étaient justes. Mais ils mesuraient les mauvaises choses. L&apos;activité, pas la qualité. Le volume, pas la solidité.
          </p>
          <p className="mb-8">
            Cet article est la méthode que j&apos;utilise en mission pour faire le diagnostic en une demi-journée. Sept zones. Chacune avec un symptôme, une cause racine, et un test de moins de 10 minutes. Faites-les. Vous verrez où votre CA fuit vraiment.
          </p>

          {/* Zone 1 */}
          <h2 id="zone-1-pipeline" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Zone 1 : Le pipeline
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Test : 10 minutes
          </p>
          <p className="mb-4">
            <strong>Symptôme :</strong> votre forecast est fiable à 50%. Le pipeline est plein lundi, vide mercredi. Les deals apparaissent et disparaissent sans raison.
          </p>
          <p className="mb-8">
            <strong>Cause racine :</strong> pas de règles de qualification. Les commerciaux mettent tout dans le pipe : un mail sympa devient une piste, un déjeuner devient un deal en phase 2. Le pipeline est un miroir aux alouettes.
          </p>
          <p className="mb-8">
            <strong>Le test :</strong> ouvrez votre CRM. Comptez les deals ouverts qui n&apos;ont pas de date de prochaine étape. Si c&apos;est plus de 30% du pipeline, vous n&apos;avez pas un pipeline. Vous avez une liste de souhaits.
          </p>

          {/* Zone 2 */}
          <h2 id="zone-2-qualification" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Zone 2 : La qualification
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Test : 10 minutes
          </p>
          <p className="mb-4">
            <strong>Symptôme :</strong> « perdu sur le prix » dans 60% des cas, ou « budget gelé ». Les deux sont des cache-misère.
          </p>
          <p className="mb-8">
            <strong>Cause racine :</strong> le commercial présente avant d&apos;avoir compris le problème du client. Il calcule vite un budget, propose un tarif, et se fait recaler. L&apos;objection prix n&apos;est pas une objection de chiffre, c&apos;est une objection de clarté. Le client n&apos;a pas compris pourquoi il devrait payer.
          </p>
          <p className="mb-8">
            <strong>Le test :</strong> reprenez les dix derniers deals perdus. Pour chacun, notez si le commercial avait identifié le budget du client avant la démo ou la proposition. Si moins de trois deals ont eu cette conversation, le problème n&apos;est pas le prix. C&apos;est la qualification.
          </p>

          {/* Zone 3 */}
          <h2 id="zone-3-process" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Zone 3 : Le process de vente
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Test : 10 minutes
          </p>
          <p className="mb-4">
            <strong>Symptôme :</strong> le cycle de vente est totalement irrégulier. 15 jours pour un deal, 90 jours pour un autre qui ressemble au premier. Les commerciaux passent leur temps à dire « chaque vente est différente ».
          </p>
          <p className="mb-8">
            <strong>Cause racine :</strong> pas de process défini. Chaque commercial improvise. Jean-Claude fait son truc, Karine fait le sien, et le nouveau recruté apprend en regardant. Quand il n&apos;y a pas de rails, chaque vente est un chantier.
          </p>
          <p className="mb-8">
            <strong>Le test :</strong> demandez à trois commerciaux de vous décrire les étapes d&apos;une vente typique, de la prospection à la signature. Si vous obtenez trois versions différentes, vous n&apos;avez pas de process. Et sans process, vous ne pouvez ni reproduire les succès ni corriger les échecs.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Pour creuser la qualification et le process
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Les zones 2 et 3 sont les plus fréquentes en PME. Le diagnostic commercial offert de Laurent Serre les examine en détail avec une analyse terrain de votre équipe.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Demander un diagnostic offert
            </Link>
          </div>

          {/* Zone 4 */}
          <h2 id="zone-4-commerciaux" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Zone 4 : Les commerciaux
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Test : 10 minutes
          </p>
          <p className="mb-4">
            <strong>Symptôme :</strong> 20% de l&apos;équipe fait 80% du CA. Le reste tourne à 40 ou 50% de leur objectif. « C&apos;est pas facile de recruter des bons », entend-on.
          </p>
          <p className="mb-8">
            <strong>Cause racine :</strong> recrutement à l&apos;instinct, pas d&apos;onboarding structuré, pas de coaching régulier. On engage des commerciaux sur leur discours, et on découvre six mois plus tard qu&apos;ils ne tiennent pas la route sur le terrain.
          </p>
          <p className="mb-8">
            <strong>Le test :</strong> prenez chaque commercial et notez-le sur trois axes : compétences techniques, posture terrain, utilisation du système. Le plus faible des trois détermine la performance globale. Si un commercial a une bonne posture mais des compétences faibles, il ne tiendra pas. S&apos;il a des compétences fortes mais n&apos;utilise pas le système, il fausse votre pilotage.
          </p>

          {/* Zone 5 */}
          <h2 id="zone-5-outils" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Zone 5 : Les outils
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Test : 10 minutes
          </p>
          <p className="mb-4">
            <strong>Symptôme :</strong> le CRM est rempli « à la main, la veille de la réunion ». Les données sont approximatives, les deals mal renseignés, les notes vagues.
          </p>
          <p className="mb-8">
            <strong>Cause racine :</strong> le CRM est vu comme un outil de contrôle, pas comme un outil d&apos;aide. Les commerciaux y voient une corvée administrative, pas un allié pour vendre plus. Résultat : ils le remplissent parce qu&apos;on les force, pas parce que ça les sert.
          </p>
          <p className="mb-8">
            <strong>Le test :</strong> demandez à un commercial d&apos;ouvrir le CRM et de vous montrer le dernier deal qu&apos;il a mis à jour. Si la date remonte à plus de 48 heures, le CRM est mort. Vous pilotez sur une photo du pipeline, pas sur le pipeline réel.
          </p>

          {/* Zone 6 */}
          <h2 id="zone-6-clients" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Zone 6 : Les clients
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Test : 10 minutes
          </p>
          <p className="mb-4">
            <strong>Symptôme :</strong> 80% du CA repose sur 20% des clients. Un seul client perdu et le trimestre bascule. Les meilleurs clients partent en silence.
          </p>
          <p className="mb-8">
            <strong>Cause racine :</strong> pas d&apos;account expansion, pas de rétention structurée. On vend au client, on le fidélise à l&apos;instinct, et on découvre son mécontentement quand il envoie une lettre de résiliation. La rétention est vue comme un sujet post-vente, alors qu&apos;elle est un design commercial dès le premier contrat.
          </p>
          <p className="mb-8">
            <strong>Le test :</strong> listez les dix derniers clients perdus. Pour chacun, pouvez-vous dire à quel moment exact ils ont commencé à décrocher ? Si vous ne savez pas, vous perdez des clients sans le voir. Et ce sont souvent les meilleurs qui partent les premiers.
          </p>

          {/* Zone 7 */}
          <h2 id="zone-7-pilotage" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Zone 7 : Le système de pilotage
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Test : 10 minutes
          </p>
          <p className="mb-4">
            <strong>Symptôme :</strong> la réunion commerciale est un reportage. On commente les chiffres, on regarde qui a fait le plus d&apos;appels, on valide que le mois est dur. Tout le monde acquiesce. Personne ne décide.
          </p>
          <p className="mb-8">
            <strong>Cause racine :</strong> on a confondu information et décision. Commenter est plus confortable que trancher. Tant qu&apos;on commente, personne n&apos;est responsable. Une réunion qui ne produit pas de décisions est un cercle d&apos;information, pas un comité de pilotage.
          </p>
          <p className="mb-8">
            <strong>Le test :</strong> à votre prochaine réunion commerciale, comptez le nombre de décisions prises. Pas les sujets abordés, pas les chiffres commentés. Des décisions. Si vous arrivez à moins de trois décisions concrètes en une heure, vous n&apos;avez pas piloté votre semaine commerciale. Vous avez assisté à un journal télévisé.
          </p>

          {/* Conclusion */}
          <h2 id="conclusion" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L&apos;audit n&apos;est pas un rapport. C&apos;est une décision.
          </h2>
          <p className="mb-8">
            La plupart des dirigeants que je rencontre attendent d&apos;avoir un diagnostic parfait avant d&apos;agir. Ils veulent le rapport complet, les recommandations classées par priorité, le planning détaillé. Et pendant qu&apos;ils attendent, le CA continue de stagner.
          </p>
          <p className="mb-8">
            La vérité, c&apos;est qu&apos;un seul test de 10 minutes par zone suffit pour savoir où regarder. Vous n&apos;avez pas besoin d&apos;un cabinet de conseil pour compter les deals sans date dans votre CRM. Ce n&apos;est pas compliqué. C&apos;est juste inconfortable parce que ça oblige à voir ce qu&apos;on préfère ignorer.
          </p>
          <p className="mb-8">
            Le dirigeant de l&apos;histoire du début n&apos;avait pas un problème de KPI. Il avait un problème de lucidité. Ses indicateurs étaient beaux parce qu&apos;ils mesuraient ce qui était facile à mesurer. Pas ce qui était utile à regarder.
          </p>
          <p className="mb-8 text-lg font-semibold text-blue-ink">
            Sept zones. Dix minutes chacune. Et si c&apos;est trop long, commencez par la zone 1. Le test le plus court est souvent le plus révélateur.
          </p>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-12">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-4">
              Pour aller plus loin
            </p>
            <ul className="space-y-3 list-disc pl-6 text-sm text-gray-700">
              <li>
                <Link href="/blog/kpis-commerciaux-pme-indicateurs-vous-cachent" className="text-mint-green hover:underline">
                  KPIs commerciaux PME : ce que vos 25 indicateurs vous cachent
                </Link>
                <p className="text-gray-500 mt-1">Pourquoi des KPIs au vert peuvent masquer un vrai problème de performance.</p>
              </li>
              <li>
                <Link href="/blog/pipeline-fantome-lundi-matin-test-9-minutes" className="text-mint-green hover:underline">
                  Pipeline fantôme : le test des 9 minutes du lundi matin
                </Link>
                <p className="text-gray-500 mt-1">Le test simple pour repérer les faux deals dans votre pipeline.</p>
              </li>
              <li>
                <Link href="/blog/pourquoi-bons-commerciaux-deviennent-mediocres-mauvais-systeme" className="text-mint-green hover:underline">
                  Pourquoi de bons commerciaux deviennent médiocres dans un mauvais système
                </Link>
                <p className="text-gray-500 mt-1">Quand le vrai problème n&apos;est pas l&apos;équipe mais le cadre dans lequel elle travaille.</p>
              </li>
            </ul>
          </div>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous avez reconnu votre équipe dans plusieurs zones ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Ce n&apos;est pas un hasard. Sur les PME que j&apos;accompagne, quatre zones sur sept sont systématiquement dans le rouge. La bonne nouvelle : un diagnostic clair permet de prioriser les actions et de retrouver du CA en quelques semaines. Le diagnostic commercial offert est le premier pas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 bg-mint-green text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic offert
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
              >
                Découvrir le Bootcamp
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8">
              Questions fréquentes
            </h2>
            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-title font-semibold text-blue-ink mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* HubSpot Form */}
          <div className="mt-16">
            <HubSpotForm />
          </div>
        </div>
      </article>
    </main>
  );
}
