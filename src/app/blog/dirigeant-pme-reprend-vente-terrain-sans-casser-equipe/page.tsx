import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/dirigeant-pme-reprend-vente-terrain-sans-casser-equipe';
const heroImage = '/images/blog/dirigeant-pme-reprend-vente-terrain-sans-casser-equipe/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/dirigeant-pme-reprend-vente-terrain-sans-casser-equipe/hero.webp';

export const metadata: Metadata = {
  title: 'Le dirigeant PME qui reprend la vente en main sans casser son équipe',
  description:
    '3 moments où le dirigeant DOIT intervenir sur un deal et 3 où il ne le doit SURTOUT pas. La méthode pour reprendre la main terrain sans démotiver.',
  keywords: [
    'dirigeant PME vente terrain',
    'reprendre rendez-vous commercial',
    'intervention dirigeant deal important',
    'dirigeant commercial terrain',
    'vente dirigeant PME',
    'commercial et dirigeant',
    'manager commercial terrain',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-29',
  },
  openGraph: {
    title: 'Le dirigeant PME qui reprend la vente en main sans casser son équipe',
    description:
      '3 moments où le dirigeant DOIT intervenir et 3 où il ne le doit SURTOUT pas. La méthode pour reprendre la main terrain sans démotiver.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Le dirigeant PME qui reprend la vente en main sans casser son équipe — Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le dirigeant PME qui reprend la vente en main sans casser son équipe',
    description:
      '3 moments où le dirigeant DOIT intervenir sur un deal et 3 où il ne le doit SURTOUT pas.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/dirigeant-pme-reprend-vente-terrain-sans-casser-equipe';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover — Le dirigeant qui reprend la vente en main', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-deal-bloque.webp`, alt: 'Un deal bloqué que le commercial n arrive pas à décoincer', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-presentation.webp`, alt: 'Le dirigeant présente la vision stratégique au client', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-relation.webp`, alt: 'Relation personnelle à haut niveau entre dirigeants qui débloque la décision', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-piege.webp`, alt: 'Piège : le dirigeant qui reprend tous les rendez-vous par habitude', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-reunion-interne.webp`, alt: 'Le dirigeant en réunion interne qui court-circuite son commercial', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-negociation.webp`, alt: 'Le dirigeant qui cède sur les conditions sans consulter son commercial', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-methode.webp`, alt: 'La méthode pour intervenir sans casser : préparer ensemble, debriefer après', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-lecon.webp`, alt: 'Lecon : ne fais pas à la place de ton commercial ce qu il peut faire seul', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-cta.webp`, alt: 'CTA — Diagnostic offert sur laurentserre.com', index: 9 },
];

const faqItems = [
  {
    question: 'Quand le dirigeant doit-il intervenir sur un deal ?',
    answer:
      'Dans 3 cas précis : (1) quand le deal bloque sur une question stratégique que seul le dirigeant peut trancher, (2) quand une relation personnelle avec le client dirigeant peut débloquer la décision, (3) quand le deal dépasse un seuil critique pour l\'entreprise. Jamais en dessous, jamais par habitude.',
  },
  {
    question: 'Quand le dirigeant ne doit surtout pas intervenir ?',
    answer:
      'Dans 3 cas : (1) pour un premier rendez-vous standard, (2) pour négocier un prix que le commercial aurait pu gérer, (3) pour faire de la présence sans objectif clair. Ces interventions affaiblissent l\'autorité du commercial et lui apprennent à compter sur vous plutôt que sur lui-même.',
  },
  {
    question: 'Comment le dirigeant peut-il intervenir sans démotiver son commercial ?',
    answer:
      'La règle d\'or : préparer ensemble avant, debriefer ensemble après. Le commercial doit comprendre pourquoi vous intervenez, quel est votre rôle dans ce rendez-vous précis, et ce que vous attendez de lui. Après le rendez-vous, faites un débrief à chaud : ce que vous avez vu, ce qu\'il a bien fait, ce qu\'il peut améliorer.',
  },
  {
    question: 'Pourquoi un dirigeant devrait-il éviter de reprendre les rendez-vous ?',
    answer:
      'Parce que chaque fois que le dirigeant reprend un rendez-vous, le commercial apprend qu\'il peut compter sur quelqu\'un d\'autre pour débloquer ses deals. À terme, le dirigeant forme une équipe qui ne sait plus vendre sans lui. C\'est le piège du dirigeant commercial : il devient le meilleur vendeur de son entreprise, et le seul.',
  },
  {
    question: 'Quel est le bon équilibre entre intervention et délégation ?',
    answer:
      'Le ratio que je conseille aux dirigeants que j\'accompagne : intervenir sur 1 deal sur 10 maximum. Si vous intervenez plus, votre équipe ne se développe pas. Votre job n\'est pas de vendre. Votre job est de faire en sorte que votre équipe vende sans vous.',
  },
];

export default function DirigeantReprendVentePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Le dirigeant PME qui reprend la vente en main sans casser son équipe',
        description:
          '3 moments où le dirigeant DOIT intervenir sur un deal et 3 où il ne le doit SURTOUT pas.',
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
        articleSection: 'Management / Dirigeant',
        keywords: [
          'dirigeant PME vente terrain',
          'reprendre rendez-vous commercial',
          'intervention dirigeant deal important',
          'dirigeant commercial terrain',
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
          { '@type': 'ListItem', position: 3, name: 'Le dirigeant PME qui reprend la vente', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Le dirigeant PME qui reprend la vente</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Management / Dirigeant
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Le dirigeant PME qui reprend la vente en main sans casser son équipe
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
              alt="Le dirigeant PME qui reprend la vente en main sans casser son équipe"
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
              3 moments où le dirigeant DOIT intervenir sur un deal. 3 où il ne le doit SURTOUT pas. La méthode pour intervenir sans démotiver l&apos;équipe. Et le ratio d&apos;or : 1 deal sur 10 maximum.
            </p>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vous reprenez trop de rendez-vous ? Diagnostic offert
            </Link>
          </div>

          {/* BD Carrousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Le dirigeant qui reprend la main
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire d&apos;un dirigeant qui avait pris l&apos;habitude de reprendre tous les deals importants. Jusqu&apos;à ce qu&apos;il réalise que son équipe ne savait plus vendre sans lui.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Le dirigeant qui reprend la vente"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-dirigeant-vente-terrain.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (10 planches)
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 3 moments où vous devez intervenir
          </h2>

          <p className="mb-8">
            Marc dirige une PME de 30 personnes dans l&apos;édition de logiciels. Il était son meilleur commercial. Pendant des années, il reprenait les deals importants personnellement. Résultat : son équipe ne savait plus vendre sans lui.
          </p>

          <p className="mb-8">
            Je vois ce schéma dans la plupart des PME que j&apos;accompagne. Le dirigeant a construit l&apos;entreprise sur son carnet d&apos;adresses et sa capacité à vendre. Puis il a recruté des commerciaux. Mais il n&apos;a jamais vraiment lâché les manettes. Il reprend les rendez-vous, il valide les propositions, il appelle les clients importants. Sans le dire, son équipe apprend qu&apos;elle peut compter sur lui pour débloquer les situations difficiles.
          </p>

          <p className="mb-8">
            Le résultat, je le vois dans le regard des commerciaux quand ils m&apos;appellent : ils n&apos;ont plus confiance en eux. Et le dirigeant non plus.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Les 3 moments où vous devez intervenir
          </h3>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-3">
              <strong>1. Le deal bloque sur une question stratégique.</strong> Votre commercial est bloqué parce que le client demande un engagement que seul vous pouvez prendre. Un changement de périmètre, un investissement supplémentaire, une garantie exceptionnelle. Ne laissez pas votre commercial improviser sur ces sujets. Intervenez, mais avec lui, pas à sa place.
            </p>
            <p className="mb-3">
              <strong>2. Une relation personnelle de dirigeant à dirigeant peut débloquer la décision.</strong> Parfois, votre vis-à-vis chez le client attend de parler à son pair. Pas à un commercial. À un dirigeant qui prendra les mêmes risques que lui. Si vous sentez que la décision est suspendue à ce lien, intervenez. Mais préparez le rendez-vous avec votre commercial, ne le prenez pas seul.
            </p>
            <p className="text-slate-700">
              <strong>3. Le deal dépasse un seuil critique pour l&apos;entreprise.</strong> Si ce deal représente plus de 20% de votre chiffre d&apos;affaires annuel, ou s&apos;il conditionne un investissement structurant, vous devez être dans la boucle. Pas pour vendre à la place de votre équipe, mais pour montrer l&apos;engagement de l&apos;entreprise.
            </p>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 3 moments où vous ne devez SURTOUT pas intervenir
          </h2>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-3">
              <strong>1. Sur un premier rendez-vous standard.</strong> Le piège classique : le commercial a un premier rendez-vous, il est nerveux, il demande au dirigeant de l&apos;accompagner. Le dirigeant accepte. Le commercial n&apos;apprend jamais à gérer un premier rendez-vous seul. Et le client comprend que c&apos;est le dirigeant le vrai décideur.
            </p>
            <p className="mb-3">
              <strong>2. Pour négocier un prix que le commercial aurait pu gérer.</strong> Le dirigeant intervient pour accorder une remise que le commercial n&apos;avait pas l&apos;autorisation de donner. Résultat : le dirigeant devient le « sauveur » et le commercial perd toute crédibilité de négociation. Pour tous les deals suivants, le client saura qu&apos;il doit parler au dirigeant pour obtenir un meilleur prix.
            </p>
            <p className="text-slate-700">
              <strong>3. Pour faire de la présence sans objectif clair.</strong> « Je vais passer une tête au rendez-vous. » C&apos;est la pire des interventions. Vous êtes là, mais vous ne savez pas pourquoi. Vous prenez la parole sans préparation. Vous créez de la confusion. Et le commercial ne sait pas quel était votre rôle. Si vous intervenez, ayez un objectif précis, préparez-le avec votre équipe, et quittez la salle dès que l&apos;objectif est atteint.
            </p>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Comment intervenir sans démotiver
          </h2>

          <p className="mb-8">
            La méthode que j&apos;applique avec les dirigeants que je coache tient en trois règles.
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-3">
              <strong>Règle 1 : Préparer ensemble avant.</strong> Avant chaque rendez-vous où vous intervenez, passez 15 minutes à définir qui fait quoi. Vous n&apos;êtes pas là pour vendre. Vous êtes là pour un objectif précis : valider un point stratégique, répondre à une question, montrer l&apos;engagement de l&apos;entreprise. Votre commercial garde la main sur le déroulé. Vous intervenez sur votre point, puis vous passez la main.
            </p>
            <p className="mb-3">
              <strong>Règle 2 : Débriefer à chaud après.</strong> Dans l&apos;heure qui suit le rendez-vous, faites un débrief de 10 minutes. Trois questions : qu&apos;est-ce qui a bien fonctionné ? Qu&apos;est-ce que tu ferais différemment ? Qu&apos;est-ce que tu retiens pour le prochain ? Ne donnez pas votre version avant d&apos;avoir écouté la sienne.
            </p>
            <p className="text-slate-700">
              <strong>Règle 3 : Tenir le ratio d&apos;or.</strong> Un deal sur dix maximum. Au-delà, vous prenez la place de votre équipe. Votre job n&apos;est pas de vendre. Votre job est de faire en sorte que votre équipe vende sans vous. Si vous intervenez sur plus d&apos;un deal sur dix, le problème n&apos;est pas le deal. Le problème est votre recrutement, votre formation ou votre délégation.
            </p>
          </div>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Développer votre équipe sans tout reprendre
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente intègre un module dirco terrain : quand intervenir, comment déléguer, et quel accompagnement mettre en place.
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
              Vous reprenez trop de rendez-vous ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic commercial identifie les situations où votre intervention est nécessaire et celles où elle affaiblit votre équipe. 5 minutes pour savoir si vous formez ou vous remplacez vos commerciaux.
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
                <Link href="/blog/blocages-dirigeant-performance-commerciale" className="text-mint-green hover:underline">
                  → Les vrais blocages du dirigeant face à la performance commerciale
                </Link>
              </li>
              <li>
                <Link href="/blog/performance-commerciale-pme-5-leviers-dirigeant" className="text-mint-green hover:underline">
                  → Performance commerciale PME : les 5 leviers que le dirigeant peut actionner
                </Link>
              </li>
              <li>
                <Link href="/blog/pourquoi-un-manager-commercial-reprend-trop-souvent-les-rendez-vous-a-la-place-de-lequipe" className="text-mint-green hover:underline">
                  → Pourquoi un manager reprend trop souvent les rendez-vous à la place de l&apos;équipe
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
