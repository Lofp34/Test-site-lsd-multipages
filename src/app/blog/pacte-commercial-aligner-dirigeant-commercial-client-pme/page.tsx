import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/pacte-commercial-aligner-dirigeant-commercial-client-pme';
const heroImage = '/images/blog/pacte-commercial/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/pacte-commercial/hero.webp';

export const metadata: Metadata = {
  title: 'Le pacte commercial : aligner dirigeant, commercial et client sur les mêmes promesses',
  description:
    'Ce que le dirigeant promet, ce que le commercial dit sur le terrain, et ce que le client reçoit sont trois choses différentes. La méthode pour aligner les trois promesses.',
  keywords: [
    'pacte commercial PME',
    'alignement commercial dirigeant',
    'promesse client PME',
    'cohérence vente',
    'alignement force de vente',
    'vente B2B PME',
    'méthode commerciale terrain',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-29',
  },
  openGraph: {
    title: 'Le pacte commercial : aligner dirigeant, commercial et client sur les mêmes promesses',
    description:
      'Ce que le dirigeant promet, ce que le commercial dit sur le terrain, et ce que le client reçoit sont trois choses différentes. La méthode pour aligner les trois promesses.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Le pacte commercial : aligner dirigeant, commercial et client sur les mêmes promesses — Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le pacte commercial : aligner dirigeant, commercial et client sur les mêmes promesses',
    description:
      'Ce que le dirigeant promet, ce que le commercial dit sur le terrain, et ce que le client reçoit sont trois choses différentes. La méthode pour réaligner.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/pacte-commercial';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover — Le pacte commercial : trois promesses qui tournent en rond dans la même PME', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-client-parti.webp`, alt: 'Un dirigeant accablé : ses clients sont partis sans prévenir', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-trois-versions.webp`, alt: 'Trois versions différentes de la même promesse : dirigeant, commercial, client', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-chacun-sa-lecture.webp`, alt: 'Julien a dit ce que le client voulait entendre sans vérifier la promesse du dirigeant', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-trois-promesses.webp`, alt: 'Les trois promesses à aligner : ce que le dirigeant vend, ce que le commercial dit, ce que le client reçoit', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-methode.webp`, alt: 'La méthode : écrire les trois phrases pour chaque deal et les comparer', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-point-verite.webp`, alt: 'Le point de vérité : dirigeant et commercial découvrent leurs promesses respectives', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-resultat.webp`, alt: 'Un deal perdu sur trois, mais les deux autres tiennent et le client parti a recommandé', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-lecon.webp`, alt: 'Le pacte commercial ne se signe pas, il se construit à chaque deal', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-conclusion.webp`, alt: 'Trois promesses, un seul client. L une d elles ment sans le savoir', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-cta.webp`, alt: 'CTA — Diagnostic offert sur laurentserre.com', index: 10 },
];

const faqItems = [
  {
    question: 'Qu\'est-ce que le pacte commercial ?',
    answer:
      'Le pacte commercial, c\'est l\'alignement entre trois promesses : ce que le dirigeant vend à ses clients (la vision et l\'offre), ce que le commercial dit sur le terrain (les promesses opérationnelles), et ce que le client reçoit (la réalité livrée). Quand ces trois promesses ne sont pas alignées, le client perçoit un décalage, les deals stagnent ou se perdent, et la confiance s\'érode.',
  },
  {
    question: 'Pourquoi les promesses du dirigeant, du commercial et du client sont-elles différentes ?',
    answer:
      'Parce que personne ne compare les trois. Le dirigeant construit une offre avec sa vision. Le commercial adapte son discours pour rassurer le client. Et le client interprète ce qu\'il entend à travers ses propres besoins. Aucun des trois n\'a la vue d\'ensemble. Le résultat : trois versions différentes de la même promesse, et personne ne s\'en rend compte avant que ça coince.',
  },
  {
    question: 'Comment aligner les trois promesses commerciales ?',
    answer:
      'La méthode tient en une phrase : pour chaque deal au-dessus d\'un certain seuil, écrire trois phrases. Une pour ce que le dirigeant a promis (ou prometrait), une pour ce que le commercial a dit au client, une pour ce que le client a compris. Puis les comparer. Si elles ne correspondent pas, il faut ajuster avant de signer.',
  },
  {
    question: 'Quels sont les signes que les promesses sont désalignées ?',
    answer:
      'Cinq signes : (1) le client dit une chose et le commercial en rapporte une autre en réunion, (2) le commercial promet des délais ou des fonctionnalités que le dirigeant n\'a pas validés, (3) le client a compris un périmètre différent de ce qui est dans la proposition, (4) le dirigeant découvre des engagements pris sur le terrain dont il n\'avait pas connaissance, (5) le deal se perd sans raison claire.',
  },
  {
    question: 'Le pacte commercial s\'applique-t-il aussi aux petites PME ?',
    answer:
      'Encore plus. Dans une petite structure, le dirigeant est souvent le seul à connaître la stratégie. Le commercial est sur le terrain sans filet. Le client parle au commercial, pas au dirigeant. Le décalage entre les trois visions peut être énorme sans que personne ne le voie, faute de réunion d\'alignement.',
  },
  {
    question: 'Quelle est la différence entre le pacte commercial et un contrat ?',
    answer:
      'Un contrat est un document juridique. Le pacte commercial est un accord implicite entre dirigeant, commercial et client sur ce qui est vraiment promis. Le contrat dit ce qui est écrit. Le pacte dit ce qui est compris. Et souvent, ce qui est compris est très différent de ce qui est écrit. Le pacte ne se signe pas. Il se construit à chaque deal.',
  },
];

export default function PacteCommercialPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Le pacte commercial : aligner dirigeant, commercial et client sur les mêmes promesses',
        description:
          'Ce que le dirigeant promet, ce que le commercial dit sur le terrain, et ce que le client reçoit sont trois choses différentes. La méthode pour aligner les trois promesses.',
        image: heroImageAbsolute,
        datePublished: '2026-06-29',
        dateModified: '2026-06-29',
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
          '@id': articleUrl,
        },
        articleSection: 'Management / Stratégie',
        keywords: [
          'pacte commercial PME',
          'alignement commercial dirigeant',
          'promesse client PME',
          'cohérence vente',
          'vente B2B PME',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${articleUrl}#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Le pacte commercial', item: articleUrl },
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

      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Le pacte commercial</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Management / Stratégie
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Le pacte commercial : aligner dirigeant, commercial et client sur les mêmes promesses
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
              <time dateTime="2026-06-29">29 juin 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Le pacte commercial : aligner dirigeant, commercial et client sur les mêmes promesses"
              width={1200}
              height={630}
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
              Ce que le dirigeant promet, ce que le commercial dit sur le terrain, et ce que le client reçoit sont trois choses différentes. Le pacte commercial aligne les trois promesses. La méthode : écrire chaque version, les comparer, ajuster avant de signer.
            </p>
          </div>

          {/* BD Carrousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Le pacte commercial
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire du dirigeant qui perd ses clients sans comprendre pourquoi. Jusqu&apos;à ce qu&apos;il découvre que son commercial, son client et lui-même tenaient trois promesses différentes. Et que personne n&apos;avait jamais comparé les trois.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Le pacte commercial"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-pacte-commercial.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (11 planches)
              </Link>
            </div>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vos promesses commerciales tiennent la route ? Diagnostic offert
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le problème des trois promesses qui ne se connaissent pas
          </h2>

          <p className="mb-8">
            Philippe dirige une PME de 40 personnes dans l&apos;agroéquipement. En réunion de comité, il m&apos;a dit : « Je perds des clients sans comprendre pourquoi. Ils ne sont pas mécontents. Ils partent. »
          </p>

          <p className="mb-8">
            On a passé une heure à dérouler ses trois derniers dossiers perdus. Et on a vu le motif. Philippe avait une vision claire de son offre — des machines robustes, un service après-vente réactif, des contrats de maintenance longs. Son commercial, Julien, promettait sur le terrain des délais d&apos;intervention que la maintenance ne pouvait pas tenir, des fonctionnalités qui n&apos;étaient pas encore au catalogue, et des conditions commerciales que Philippe n&apos;avait jamais validées.
          </p>

          <p className="mb-8">
            Julien ne mentait pas. Il voulait rassurer, convaincre, signer. Mais ce qu&apos;il promettait n&apos;était pas ce que Philippe vendait. Et ce que le client comprenait n&apos;était ni ce que Philippe vendait ni ce que Julien promettait.
          </p>

          <p className="mb-8">
            Trois versions de la même promesse. Aucune des trois ne correspondait aux autres.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 3 promesses à aligner
          </h2>

          <p className="mb-8">
            Le pacte commercial, c&apos;est l&apos;alignement de ces trois promesses. Pas un contrat. Un accord implicite qui passe par trois regards différents sur la même vente.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Promesse 1 — Ce que le dirigeant vend
          </h3>

          <p className="mb-8">
            Le dirigeant construit son offre avec sa vision, son histoire, ses priorités. Il sait ce que son entreprise sait vraiment faire. Il connaît les limites, les délais réels, ce qui est inclus et ce qui ne l&apos;est pas. Mais cette vision, il ne la partage pas assez. Les commerciaux l&apos;apprennent par morceaux, entre deux réunions, sans cadre.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Promesse 2 — Ce que le commercial dit
          </h3>

          <p className="mb-8">
            Le commercial est au contact du client. Il adapte, il module, il promet ce qu&apos;il faut pour avancer. Pas par malhonnêteté. Par nécessité. Le client demande un délai, le commercial dit « oui on peut ». Le client évoque une fonction, le commercial dit « on a ça ». Il veut garder la main, ne pas perdre le deal, rassurer. Sans savoir si l&apos;entreprise peut vraiment tenir.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Promesse 3 — Ce que le client reçoit
          </h3>

          <p className="mb-8">
            Le client, lui, n&apos;entend pas la promesse du dirigeant. Il entend ce que le commercial lui raconte. Et il interprète à travers ses propres attentes, ses urgences, ses craintes. Ce qu&apos;il croit acheter est souvent très différent de ce qu&apos;on lui livre. Et quand l&apos;écart devient visible, il perd confiance. Sans toujours savoir pourquoi.
          </p>

          <p className="mb-8">
            Je vois ce schéma dans presque toutes les PME que j&apos;accompagne. Des gens compétents, de bonne foi, qui promettent des choses différentes sans s&apos;en rendre compte. Et qui perdent des ventes sans comprendre le vrai motif.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le point de vérité : la méthode pour réaligner
          </h2>

          <p className="mb-8">
            La correction est simple. Pas facile, mais simple.
          </p>

          <p className="mb-8">
            Un point de vérité par deal. Pas de revue commerciale générale. Pas de réunion d&apos;équipe abstraite. Un moment dédié où le dirigeant, le commercial — et parfois le client — mettent leurs promesses sur la table.
          </p>

          <p className="mb-8">
            Le rituel que je mets en place avec les équipes que je coache : pour chaque deal au-dessus d&apos;un seuil défini, le commercial écrit trois phrases. Une qui dit ce que le dirigeant promet. Une qui dit ce qu&apos;il a promis au client. Une qui dit ce que le client a compris. Et on compare.
          </p>

          <p className="mb-8">
            La première fois, c&apos;est toujours le choc. Le dirigeant découvre des promesses qu&apos;il n&apos;a jamais faites. Le commercial découvre des contraintes qu&apos;il ignorait. Et le client, quand on l&apos;appelle, raconte une version de la promesse que personne n&apos;avait anticipée.
          </p>

          <p className="mb-8">
            Ce moment inconfortable est exactement ce qui fait gagner du temps. On ajuste avant de signer, pas après avoir perdu.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 5 signes que vos promesses sont désalignées
          </h2>

          <p className="mb-8">
            Vous n&apos;avez pas besoin d&apos;attendre la prochaine réunion comité pour savoir si votre pacte commercial tient. Cinq signes qui ne trompent pas :
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <ol className="space-y-4 text-slate-700 list-decimal pl-5">
              <li><strong>Le client dit une chose et le commercial en rapporte une autre en réunion.</strong> Si votre commercial minimise ou amplifie ce que le client a dit, c&apos;est que sa version de la promesse n&apos;est pas la même que la vôtre.</li>
              <li><strong>Le commercial promet des délais que vous ne pouvez pas tenir.</strong> Le classique. Le dirigeant l&apos;apprend après signature. À ce moment-là, le mal est fait. Le client a une promesse, vous ne pouvez pas la tenir.</li>
              <li><strong>Le client a compris un périmètre différent de ce qui est dans la proposition.</strong> Quand vous envoyez le contrat et que le client dit « ce n&apos;est pas ce que j&apos;avais compris », le désalignement est déjà consommé.</li>
              <li><strong>Vous découvrez des engagements pris sur le terrain dont vous n&apos;aviez pas connaissance.</strong> Votre commercial a dit « oui » sans vous consulter. Vous ne le saurez que quand le client réclamera.</li>
              <li><strong>Le deal se perd sans raison claire.</strong> Le client ne donne pas d&apos;explication précise. « On a changé de priorité. » Dans la majorité des cas, c&apos;est que la promesse qu&apos;il avait comprise n&apos;était pas celle que vous pensiez vendre.</li>
            </ol>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le pacte commercial en pratique
          </h2>

          <p className="mb-8">
            La méthode se tient en quatre étapes. Elle prend vingt minutes par deal.
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-3">
              <strong>1. Écrire les trois promesses.</strong> Le commercial écrit sur une feuille : ce que le dirigeant a promis (ou promettait), ce qu&apos;il a promis au client, ce que le client a compris. Pas de jugement. Juste des faits.
            </p>
            <p className="mb-3">
              <strong>2. Comparer les trois versions.</strong> Dirigeant et commercial lisent les trois phrases ensemble. L&apos;exercice n&apos;est pas de trouver un coupable. C&apos;est de voir où le décalage est le plus grand.
            </p>
            <p className="mb-3">
              <strong>3. Ajuster la promesse commune.</strong> Une fois le décalage identifié, on décide de la promesse unique à faire au client. Parfois c&apos;est le dirigeant qui ajuste son offre. Parfois c&apos;est le commercial qui doit rappeler le client pour recadrer.
            </p>
            <p className="text-slate-700">
              <strong>4. Vérifier en direct.</strong> Avant d&apos;envoyer la proposition, le dirigeant ou le commercial reprend contact avec le client pour valider que la promesse est bien comprise. Pas d&apos;ambiguïté. Pas de sous-entendu.
            </p>
          </div>

          <p className="mb-8">
            Cette méthode, je l&apos;applique avec les équipes que j&apos;accompagne. Elle fonctionne parce qu&apos;elle force ce qui n&apos;arrive jamais : mettre les trois promesses sur la table et les regarder ensemble.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Approfondir le pacte commercial
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente intègre un module pacte commercial : aligner les trois promesses, poser un point de vérité par deal, et tenir le cadre dans la durée.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vos promesses tiennent-elles la route ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic commercial identifie les désalignements de promesses dans votre équipe. 5 minutes pour savoir si votre pacte commercial est solide ou si vos promesses partent dans trois directions différentes.
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

          {/* Liens internes */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/blog/strategie-commerciale-pme-cadre-une-page" className="text-mint-green hover:underline">
                  → Stratégie commerciale PME : comment construire un cadre qui tient en une page
                </Link>
              </li>
              <li>
                <Link href="/blog/blocages-dirigeant-performance-commerciale" className="text-mint-green hover:underline">
                  → Les vrais blocages du dirigeant face à la performance commerciale (ce n&apos;est pas ce que vous croyez)
                </Link>
              </li>
              <li>
                <Link href="/blog/performance-commerciale-pme-5-leviers-dirigeant" className="text-mint-green hover:underline">
                  → Performance commerciale PME : les 5 leviers que le dirigeant peut actionner dès cette semaine
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8" id="faq">
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

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-mint-green hover:underline text-sm">
              ← Retour au blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
