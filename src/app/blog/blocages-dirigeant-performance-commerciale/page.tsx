import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const carouselPrefix = '/images/blog/blocages-dirigeant-performance-commerciale';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover : les blocages de dirigeant qui sabotent la performance commerciale', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-constat.webp`, alt: 'Un dirigeant frustr\u00e9 : mes commerciaux ne performent pas', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-micro-management.webp`, alt: 'Micro-management d\u00e9guis\u00e9 en accompagnement', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-schizophrenie.webp`, alt: 'Schizophr\u00e9nie strat\u00e9gique : contradictions dirigeant', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-feedbacks.webp`, alt: 'La peur des feedbacks difficiles', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-systeme-prime.webp`, alt: 'R\u00e9compenser les mauvais comportements', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-modele.webp`, alt: 'L\'absence de mod\u00e8le personnel', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-confronation.webp`, alt: 'Confrontation : le diagnostic qui d\u00e9range', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-declic.webp`, alt: 'Le d\u00e9clic : prendre conscience des blocages', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-premiers-changements.webp`, alt: 'Les premiers changements de comportement', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-feedback.webp`, alt: 'Apprendre \u00e0 donner du feedback', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-resultats.webp`, alt: 'Les r\u00e9sultats suivent quand le dirigeant change', index: 11 },
  { src: `${carouselPrefix}/bd-slide-13-cta.webp`, alt: 'CTA : pr\u00eat \u00e0 regarder vos propres blocages ?', index: 12 },
];

const heroImage = '/images/blog/blocages-dirigeant-performance-commerciale/blocages-dirigeant-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/blocages-dirigeant-performance-commerciale/blocages-dirigeant-hero.webp';

export const metadata: Metadata = {
  title: 'Performance commerciale : 5 blocages du dirigeant',
  description:
    'Vous pensez que vos commerciaux sont le problème ? Et si le vrai blocage était dans votre propre comportement ? Laurent Serre décrypte les 5 blocages de dirigeant qui plombent la performance.',
  keywords:
    'performance commerciale, blocages dirigeant, management commercial, coaching dirigeant PME, micro-management commercial, pilotage commercial, feedback equipe commerciale, comportement dirigeant',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/blocages-dirigeant-performance-commerciale',
  },
  openGraph: {
    title: 'Performance commerciale : 5 blocages de dirigeant qui sabotent vos résultats',
    description:
      'Micro-management, contradictions, peur des feedbacks : les 5 comportements de dirigeant qui cassent la performance de votre équipe commerciale.',
    url: 'https://www.laurentserre.com/blog/blocages-dirigeant-performance-commerciale',
    type: 'article',
    locale: 'fr_FR',
    images: [{ url: heroImageAbsolute, width: 1200, height: 630, alt: 'Blocages dirigeant performance commerciale' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance commerciale : 5 blocages de dirigeant qui sabotent vos résultats',
    description:
      'Micro-management, contradictions, peur des feedbacks : les 5 comportements de dirigeant qui cassent la performance de votre équipe commerciale.',
    images: [heroImageAbsolute],
  },
};

export default function BlocagesDirigeantPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Performance commerciale : 5 blocages de dirigeant qui sabotent vos résultats',
    description:
      'Les 5 blocages comportementaux de dirigeant qui sabotent la performance commerciale sans que personne ose le dire. Laurent Serre partage son expérience terrain.',
    image: heroImageAbsolute,
    datePublished: '2026-06-05',
    dateModified: '2026-06-05',
    author: {
      '@type': 'Person',
      name: 'Laurent Serre',
      url: 'https://www.laurentserre.com/a-propos',
      sameAs: ['https://www.linkedin.com/in/laurentserre34/', 'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/'],
    },
    publisher: { '@type': 'Organization', name: 'Laurent Serre', url: 'https://www.laurentserre.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.laurentserre.com/blog/blocages-dirigeant-performance-commerciale' },
    articleSection: 'Management commercial / Performance',
    keywords: ['performance commerciale', 'blocages dirigeant', 'management commercial', 'coaching dirigeant PME'],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Pourquoi la performance commerciale de mon entreprise stagne-t-elle malgr\u00e9 mes efforts ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Parce que le premier blocage est souvent comportemental, pas structurel. Les process de vente ne peuvent pas compenser un dirigeant qui micro-manage, change de cap tous les mois, ou évite les feedbacks difficiles. Avant de chercher un nouveau commercial ou une nouvelle méthode, regardez vos propres comportements.' }
      },
      {
        '@type': 'Question',
        name: 'Comment savoir si c\'est moi le probl\u00e8me ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Quelques signes : vous reprenez les rendez-vous de vos commerciaux, vous regardez le CA du mois sans suivre les indicateurs d\'activité, vous évitez les conversations inconfortables avec vos vendeurs, vous récompensez les gros vendeurs quelle que soit leur méthode, et personne dans votre équipe n\'ose vous dire la vérité.' }
      },
      {
        '@type': 'Question',
        name: 'Quels sont les blocages de dirigeant les plus frequents en performance commerciale ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Cinq blocages reviennent systématiquement : le micro-management déguisé en accompagnement, la schizophrénie stratégique entre court et long terme, la peur des feedbacks difficiles, le fait de récompenser les mauvais comportements, et l absence de modèle personnel.' }
      },
      {
        '@type': 'Question',
        name: 'Comment un coach commercial peut-il aider un dirigeant ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Un bon coach commercial ne vous donnera pas une checklist. Il va vous confronter à vos angles morts : pourquoi vous reprenez le RDV, pourquoi vous évitez ce feedback, pourquoi vous regardez le mauvais indicateur. Le travail est sur le comportement, pas sur le process.' }
      },
      {
        '@type': 'Question',
        name: 'Peut-on am\u00e9liorer sa performance commerciale sans changer d\'\u00e9quipe ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, dans la plupart des cas. Le problème est rarement l équipe en place. C est souvent le cadre dans lequel elle évolue : des objectifs contradictoires, aucun modèle, des feedbacks absents, une vision qui change tous les mois. Corrigez le cadre, et l équipe suit.' }
      },
      {
        '@type': 'Question',
        name: 'Quelle est la difference entre pilotage commercial et micro-management ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le pilotage regarde des indicateurs d\'activité et ajuste le cadre. Le micro-management regarde chaque geste du commercial et le corrige. Le premier construit l\'autonomie, le second la détruit. Si vos commerciaux vous appellent avant chaque décision, vous êtes dans le micro-management.' }
      },
    ]
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Dirigeant, le vrai problème de votre performance…', 'item': 'https://www.laurentserre.com/blog/blocages-dirigeant-performance-commerciale' },
    ],
  };


  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />


      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">Management commercial / Performance</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Dirigeant, le vrai problème de votre performance commerciale, c'est peut-être vous
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-06-05">5 juin 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image src={heroImage} alt="Blocages dirigeant performance commerciale" width={1536} height={1024} className="w-full h-80 object-cover object-top rounded-2xl shadow-lg" quality={60} priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw" />
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
              Vous avez tout essayé : recruter, former, motiver, restructurer. Et pourtant la performance ne décolle pas. Et si le problème n'était pas votre équipe, mais le miroir dans lequel vous refusez de vous regarder ? Voici les 5 blocages de dirigeant que je vois tous les jours sur le terrain.
            </p>
          </div>

          {/* Carrousel BD */}
          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link href="/blog/performance-commerciale-pme-5-leviers-dirigeant" className="text-mint-green hover:underline font-medium">Les 5 leviers de performance commerciale</Link></li>
              <li><Link href="/blog/comite-commercial-mensuel-decisions-dirigeant" className="text-mint-green hover:underline font-medium">Comité commercial mensuel : le rituel du dirigeant</Link></li>
              <li><Link href="/blog/pourquoi-manager-commercial-suit-sans-coacher-plombe-equipe" className="text-mint-green hover:underline font-medium">Manager qui suit sans coacher plombe l'équipe</Link></li>
            </ul>
          </div>

                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Les blocages du dirigeant
            </p>
            <p className="text-sm text-amber-700 mb-5">
              13 planches pour découvrir l'histoire d'un dirigeant qui croyait que le problème était son équipe — avant de comprendre que le vrai blocage, c'était lui.
            </p>
            <BDCarousel images={carouselImages} />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-blocages-dirigeant.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (13 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA diagnostic */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vous vous reconnaissez ? Faites un diagnostic offert →
            </Link>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Je vais vous raconter une histoire qui revient dans presque tous mes accompagnements. Celle d'un dirigeant qui m'appelle, désabusé, pour me dire : « Laurent, mes commerciaux ne performent pas. Il faut que tu m'aides à les remettre dans le droit chemin. »
          </p>

          <p className="mb-4">
            Neuf fois sur dix, le problème n'est pas là où il croit.
          </p>

          <p className="mb-8">
            Il me montre ses indicateurs, il me décrit ses réunions, il me raconte ses frustrations. Et progressivement, je commence à voir le vrai problème. Ce n'est pas son équipe. C'est lui.
          </p>

          <h2 id="blocage1" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Blocage 1 : Le micro-management déguisé en « accompagnement »
          </h2>

          <p className="mb-4">
            Le dirigeant type appelle ça de l'accompagnement terrain. En réalité, il reprend les rendez-vous de ses commerciaux parce qu'il ne leur fait pas confiance.
          </p>

          <p className="mb-4">
            Je l'ai vu chez un client du secteur des services : le dirigeant passait la moitié de son temps en rendez-vous clients avec ses vendeurs. Il croyait montrer l'exemple. En réalité, il court-circuitait leur autonomie et ils ne prenaient plus aucune initiative sans lui.
          </p>

          <p className="mb-4">
            Le signal d'alarme : quand vos commerciaux vous appellent avant chaque décision. Pas parce qu'ils sont incompétents. Parce que vous leur avez appris que vous étiez le seul décideur valable.
          </p>

          <p className="mb-8">
            La question à vous poser : à votre avis, qu'est-ce que vos commerciaux ne font pas quand vous êtes là ?
          </p>

          <h2 id="blocage2" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Blocage 2 : La schizophrénie stratégique
          </h2>

          <p className="mb-4">
            En réunion de direction, le dirigeant annonce : « Cette année, on construit des relations durables. Pas de forcing. » Une semaine plus tard, il regarde le pipeline et demande : « Pourquoi vous n'avez pas clôturé ces trois deals ? Il faut les pousser. »
          </p>

          <p className="mb-4">
            Ce genre de contradiction tue la performance commerciale plus sûrement qu'aucun concurrent. Parce qu'elle rend l'équipe schizophrène : elle ne sait plus quel comportement est attendu.
          </p>

          <p className="mb-8">
            Les commerciaux ont une capacité remarquable à détecter les contradictions entre ce que vous dites et ce que vous regardez. Et ils s'alignent toujours sur ce que vous regardez.
          </p>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
            <p className="text-gray-700 leading-relaxed italic">
              « Ce que vous inspectez, pas ce que vous espérez, détermine ce que votre équipe fait. »
            </p>
          </div>

          <h2 id="blocage3" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Blocage 3 : La peur des feedbacks difficiles
          </h2>

          <p className="mb-4">
            C'est le blocage le plus répandu et le moins avoué. Un commercial ne qualifie pas ses prospects, accumule des opportunités qui n'aboutissent jamais, et le dirigeant le sait. Mais il n'en parle pas.
          </p>

          <p className="mb-4">
            Pourquoi ? Parce que le feedback difficile est inconfortable. Parce que le dirigeant a peur de la confrontation, peur de démotiver, peur que le commercial claque.
          </p>

          <p className="mb-4">
            Alors il laisse pourrir. Pendant des mois. Pendant que le commercial continue à perder son temps sur des deals non qualifiés, à créer du bruit dans le pipeline, à donner l'illusion d'une activité intense sans résultat.
          </p>

          <p className="mb-8">
            Le vrai coût n'est pas le salaire du commercial. C'est le coût d'opportunité : tout ce qu'il aurait pu faire s'il avait été recadré ou orienté trois mois plus tôt.
          </p>

          <h2 id="blocage4" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Blocage 4 : Récompenser les mauvais comportements
          </h2>

          <p className="mb-4">
            Regardez vos primes. Sont-elles basées uniquement sur le chiffre d'affaires signé ? Si oui, vous récompensez celui qui brade vos marges pour signer vite, qui sur-promet au client, qui ne qualifie pas et qui laisse les problèmes à son successeur.
          </p>

          <p className="mb-4">
            Un système de rémunération aligné sur le seul CA, c'est un système qui récompense l'urgence, pas la performance durable. Vous obtenez exactement ce que vous payez.
          </p>

          <p className="mb-4">
            Le dirigeant qui garde un système inadapté parce que « c'est comme ça dans le secteur » bloque la performance de toute son équipe sans même s'en rendre compte.
          </p>

          <p className="mb-8">
            La question : est-ce que vos commerciaux gagnent plus en faisant ce qui est bon pour votre entreprise à long terme, ou en faisant ce qui est rapide et facile aujourd'hui ?
          </p>

          <h2 id="blocage5" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Blocage 5 : L'absence de modèle
          </h2>

          <p className="mb-4">
            Vous demandez à vos commerciaux de prospecter, mais vous ne le faites pas. Vous leur demandez d'être rigoureux dans leur suivi, mais vous ne répondez pas à vos emails dans les délais. Vous leur demandez de se former, mais vous n'ouvrez jamais un livre.
          </p>

          <p className="mb-4">
            L'absence de modèle est le plus silencieux des blocages. Parce qu'il ne se voit pas dans un tableau de bord. Mais il se sent dans l'ambiance de l'équipe. Les commerciaux ne font pas ce que vous dites. Ils font ce que vous faites.
          </p>

          <p className="mb-8">
            Et si vous voulez une équipe qui apprend, qui s'améliore, qui se challenge : commencez par le faire vous-même.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Votre équipe sait déjà ce qui ne va pas. Elle attend que vous fassiez le premier pas.
            </h3>
            <p className="mb-6">
              Les dirigeants avec qui je travaille le découvrent souvent avec surprise : leurs commerciaux voient très bien les blocages. Mais ils n'osent pas le dire. Parce que c'est inconfortable. Parce que le dirigeant est le chef.
            </p>
            <p className="mb-6">
              La performance commerciale ne se décrète pas. Elle se construit dans l'alignement entre ce que vous êtes, ce que vous dites, et ce que vous faites.
            </p>
            <p className="font-semibold">
              Et ça, aucun commercial ne pourra le faire à votre place.
            </p>
          </div>


          {/* Articles liés (maillage) */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-8 my-12">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">Pour aller plus loin</h2>
            <ul className="space-y-3">
              <li><Link href="/blog/performance-commerciale-pme-5-leviers-dirigeant" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">→ Les 5 leviers de performance commerciale que les dirigeants négligent</Link></li>
              <li><Link href="/blog/coaching-commercial-terrain-5-leviers-transformation-equipe" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">→ Coaching commercial terrain : les 5 leviers</Link></li>
              <li><Link href="/blog/recrutement-commercial-en-pme-arretez-de-recruter-a-l-instinct" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">→ Recrutement commercial : arrêtez de recruter à l'instinct</Link></li>
              <li><Link href="/blog/developpement-commercial-pme-plan-action-5-etapes" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">→ Plan de développement commercial PME en 5 étapes</Link></li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="my-12">
            <h2 id="faq" className="text-3xl font-title font-bold text-blue-ink mb-6">Questions fréquentes sur les blocages de dirigeant</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Pourquoi la performance commerciale de mon entreprise stagne-t-elle malgré mes efforts ?</h3>
                <p className="text-gray-600">Parce que le premier blocage est souvent comportemental, pas structurel. Les process de vente ne peuvent pas compenser un dirigeant qui micro-manage, change de cap tous les mois, ou évite les feedbacks difficiles.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Comment savoir si c'est moi le problème ?</h3>
                <p className="text-gray-600">Signes révélateurs : vous reprenez les rendez-vous de vos commerciaux, vous regardez uniquement le CA du mois sans suivre les indicateurs d'activité, vous évitez les conversations inconfortables, et personne dans votre équipe n'ose vous dire la vérité.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Peut-on améliorer sa performance commerciale sans changer d'équipe ?</h3>
                <p className="text-gray-600">Oui, dans la plupart des cas. Le problème est rarement l'équipe en place. C'est souvent le cadre dans lequel elle évolue : objectifs contradictoires, pas de modèle, feedbacks absents, vision qui change tous les mois. Corrigez le cadre, et l'équipe suit.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Quels sont les signes d'un micro-management toxique ?</h3>
                <p className="text-gray-600">Si vos commerciaux vous appellent avant chaque petite décision, si vous passez plus de temps en rendez-vous avec eux que seul, si vous validez leurs devis un par un : vous êtes dans le micro-management. Le signal d'alarme c'est l'absence d'autonomie.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Comment un coach peut-il aider un dirigeant sur ces blocages ?</h3>
                <p className="text-gray-600">Un bon coach commercial ne donne pas une checklist. Il confronte le dirigeant à ses angles morts : pourquoi vous reprenez ce RDV, pourquoi vous évitez ce feedback, pourquoi vous regardez le mauvais indicateur. Le travail est sur le comportement, pas sur le process. C'est inconfortable, mais c'est ce qui marche.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
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

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">Prendre contact avec Laurent Serre</h2>
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
          ← Retour au blog
        </Link>
      </div>
    </main>
  );
}
