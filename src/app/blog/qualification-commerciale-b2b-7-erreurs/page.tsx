import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/qualification-commerciale-b2b-7-erreurs';
const heroImage = '/images/blog/qualification-commerciale-b2b-7-erreurs/qualification-7-erreurs-hero.webp';
const heroImageAbsolute = 'https://raw.githubusercontent.com/Lofp34/Test-site-lsd-multipages/main/public/images/blog/qualification-commerciale-b2b-7-erreurs/qualification-7-erreurs-hero.webp';
const carouselPrefix = '/images/blog/qualification-commerciale-b2b-7-erreurs/carrousel';

export const metadata: Metadata = {
  title: "Qualification commerciale B2B : les 7 erreurs qui font fuir vos prospects | Laurent Serre",
  description:
    "Vous perdez des deals sans comprendre pourquoi ? Ces 7 erreurs de qualification commerciale B2B sont la raison. Découvrez la checklist pour ne plus jamais les commettre.",
  keywords:
    "qualification commerciale B2B, erreurs qualification prospects, comment qualifier un prospect, qualification leads B2B, sales qualification PME, coaching commercial, Laurent Serre",
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-09',
  },
  openGraph: {
    title: "Qualification commerciale B2B : les 7 erreurs qui font fuir vos prospects | Laurent Serre",
    description:
      'Vous perdez des deals sans comprendre pourquoi ? Ces 7 erreurs de qualification sont la raison. La checklist pour ne plus jamais les commettre.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: 'Qualification commerciale B2B - les 7 erreurs qui font fuir vos prospects',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Qualification commerciale B2B : les 7 erreurs qui font fuir vos prospects",
    description:
      'Ces 7 erreurs de qualification sont la raison pour laquelle vous perdez des deals sans comprendre pourquoi. La checklist à connaître.',
    images: [heroImageAbsolute],
  },
};

export default function Qualification7ErreursPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: "Qualification commerciale B2B : les 7 erreurs qui font fuir vos prospects",
        description:
          'Vous perdez des deals sans comprendre pourquoi ? Ces 7 erreurs de qualification commerciale B2B sont la raison. Découvrez la checklist pour ne plus jamais les commettre.',
        image: heroImageAbsolute,
        datePublished: '2026-06-09',
        dateModified: '2026-06-09',
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
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.laurentserre.com/logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': articleUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelles sont les erreurs de qualification commerciale les plus fréquentes ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les 7 erreurs les plus fréquentes sont : 1) parler solution avant d\'avoir compris le besoin, 2) vendre à un seul contact sans vérifier qui décide vraiment, 3) qualifier le budget trop tôt, 4) pitcher le closing avant d\'avoir cartographié la décision, 5) ignorer le processus d\'achat du client, 6) ne pas vérifier l\'urgence réelle, 7) qualifier uniquement ce que le client dit sans creuser ce qu\'il ne dit pas.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment qualifier un prospect B2B efficacement ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La qualification B2B repose sur 4 piliers : 1) le besoin réel (pas celui que le client annonce, mais celui que vous identifiez), 2) le budget (avec qui il est construit et quand), 3) le processus de décision (qui sont les parties prenantes et comment elles décident), 4) l\'urgence (ce qui se passe si le problème n\'est pas résolu). Un prospect est qualifié quand vous pouvez répondre aux 4 simultanément.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre qualification commerciale et closing ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La qualification intervient en amont de la vente : c\'est l\'étape qui vérifie que le prospect correspond à votre cible, que son problème est réel, qu\'il a le pouvoir et le budget de décider. Le closing est la dernière étape : la conclusion de la vente après avoir démontré la solution. L\'erreur la plus coûteuse est de clore avant d\'avoir qualifié : on signe des deals qui ne tiennent pas.',
            },
          },
          {
            '@type': 'Question',
            name: 'Les erreurs de qualification peuvent-elles faire perdre des deals ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, et c\'est la cause n°1 de perte de deals en B2B. Un deal non qualifié est un deal que vous n\'auriez jamais dû ouvrir. Les signes avant-coureurs sont : des rendez-vous qui s\'enchaînent sans avancer, des prospects qui disparaissent après le devis, des négociations qui s\'éternisent sur le prix parce que la valeur n\'a pas été établie en amont.',
            },
          },
        ],
      },
    
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Qualification commerciale B2B', 'item': 'https://www.laurentserre.com/blog/qualification-commerciale-b2b-7-erreurs' },
        ],
      }
],
  };

  const carouselImages = [
    { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Couverture - Les 7 erreurs de qualification commerciale B2B', index: 0 },
    { src: `${carouselPrefix}/bd-slide-02-constat.webp`, alt: 'Le constat - des rendez-vous mais pas de signatures', index: 1 },
    { src: `${carouselPrefix}/bd-slide-03-pipeline.webp`, alt: 'Le pipeline - 80% des deals ne sont pas qualifiés', index: 2 },
    { src: `${carouselPrefix}/bd-slide-04-erreur1.webp`, alt: 'Erreur 1 - Parler solution avant de comprendre le besoin', index: 3 },
    { src: `${carouselPrefix}/bd-slide-05-erreur2.webp`, alt: 'Erreur 2 - Vendre à un seul contact sans vérifier qui décide', index: 4 },
    { src: `${carouselPrefix}/bd-slide-06-erreur3.webp`, alt: 'Erreur 3 - Accepter un je vais réfléchir comme une réponse', index: 5 },
    { src: `${carouselPrefix}/bd-slide-07-erreur4.webp`, alt: 'Erreur 4 - Confondre intérêt poli et intention d\'achat', index: 6 },
    { src: `${carouselPrefix}/bd-slide-08-erreur5.webp`, alt: 'Erreur 5 - Ne pas creuser le budget assez tôt', index: 7 },
    { src: `${carouselPrefix}/bd-slide-09-erreur6.webp`, alt: 'Erreur 6 - Négliger les autres parties prenantes', index: 8 },
    { src: `${carouselPrefix}/bd-slide-10-erreur7.webp`, alt: 'Erreur 7 - Ignorer l\'urgence réelle du prospect', index: 9 },
    { src: `${carouselPrefix}/bd-slide-11-checklist.webp`, alt: 'La checklist - 5 questions de qualification', index: 10 },
    { src: `${carouselPrefix}/bd-slide-12-resultat.webp`, alt: 'Le résultat - des deals solides et du temps gagné', index: 11 },
    { src: `${carouselPrefix}/bd-slide-13-synthese.webp`, alt: 'Synthèse - qualifier avant de proposer', index: 12 },
    { src: `${carouselPrefix}/bd-slide-14-cta.webp`, alt: 'CTA - Commencez par un diagnostic offert sur laurentserre.com', index: 13 },
  ];

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Qualification commerciale B2B : les 7 erreurs</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          Qualification commerciale B2B : les 7 erreurs qui font fuir vos prospects
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span>9 juin 2026</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full" />
          <span>~7 min de lecture</span>
        </div>

        {/* AuthorCard */}
        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial : 15 ans de terrain PME',
            image: '/images/blog/Laurent-Serre-avatar.webp',
          }}
        />

        {/* Hero Image */}
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-10 shadow-lg">
          <Image
            src={heroImage}
            alt="Qualification commerciale B2B - les 7 erreurs qui font fuir vos prospects"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {/* Article body */}
        <div className="prose prose-gray max-w-none">
          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Vous perdez des ventes sans comprendre pourquoi. Ce n'est pas le prix. Ce n'est pas le concurrent. Ce sont sept erreurs de qualification qui tuent vos deals bien avant le closing. Chacune est racontée à travers une scène que vous avez probablement vécue. Avec une checklist de 5 questions pour ne plus jamais les commettre.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : les 7 erreurs de qualification en scènes
            </p>
            <p className="text-sm text-amber-700 mb-5">
              14 planches illustrées. Cliquez sur une vignette pour feuilleter dans le lecteur int&eacute;gr&eacute;.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : les 7 erreurs de qualification qui tuent vos deals"
              maxPreview={3}
            />
            <div className="mt-4 text-center">
              <Link
                href={`${carouselPrefix}/carrousel-qualification-7-erreurs.pdf`}
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (14 planches)
              </Link>
            </div>
          </div>

          {/* CTA inline sous le carrousel */}
          <div className="mb-6 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vous ne savez pas par o&ugrave; commencer ? Faites un diagnostic commercial offert &rarr;
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#constat" className="text-mint-green hover:underline">Le constat : des rendez-vous, des devis, mais rien ne signe</a></li>
              <li><a href="#erreur1" className="text-mint-green hover:underline">Erreur 1 : parler solution avant de comprendre le besoin</a></li>
              <li><a href="#erreur2" className="text-mint-green hover:underline">Erreur 2 : vendre à un seul contact</a></li>
              <li><a href="#erreur3" className="text-mint-green hover:underline">Erreur 3 : accepter un &laquo; je vais r&eacute;fl&eacute;chir &raquo;</a></li>
              <li><a href="#erreur4" className="text-mint-green hover:underline">Erreur 4 : confondre int&eacute;r&ecirc;t poli et intention d'achat</a></li>
              <li><a href="#erreur5" className="text-mint-green hover:underline">Erreur 5 : ne pas creuser le budget assez t&ocirc;t</a></li>
              <li><a href="#erreur6" className="text-mint-green hover:underline">Erreur 6 : n&eacute;gliger les parties prenantes</a></li>
              <li><a href="#erreur7" className="text-mint-green hover:underline">Erreur 7 : ignorer l'urgence r&eacute;elle</a></li>
              <li><a href="#checklist" className="text-mint-green hover:underline">La checklist de qualification en 5 questions</a></li>
            </ul>
          </div>

          {/* ========== CONSTAT ========== */}
          <h2 id="constat" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Le constat : des rendez-vous, des devis, mais rien ne signe
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Je vois des commerciaux qui encha&icirc;nent les rendez-vous, qui envoient des propositions bien construites, qui relancent comme il faut. Et qui ne signent pas. Pas un manque de volume. Pas un manque d'effort. Juste un pipeline rempli d'affaires qu'ils n'auraient jamais d&ucirc;lancer.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Le probl&egrave;me n'est pas dans la vente. Il est en amont, dans la qualification. Ces commerciaux sont pass&eacute;s trop vite &agrave; la solution sans v&eacute;rifier les fondamentaux. Et une fois que le dossier est lanc&eacute;, il est trop tard pour rattraper une qualification bancale.
          </p>

          {/* ========== ERREUR 1 ========== */}
          <h2 id="erreur1" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 1 : parler solution avant de comprendre le besoin
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Un commercial d&eacute;croche un rendez-vous. Au bout de cinq minutes, il montre sa plateforme, ses cas clients, son catalogue. Le prospect hoche la t&ecirc;te, pose deux questions polies. Le commercial repart avec un &laquo; je vous redis &raquo;. Trois semaines plus tard, le dossier est froid.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Ce n'est pas que le client n'&eacute;tait pas int&eacute;ress&eacute;. C'est que le commercial n'a pas pris le temps de comprendre ce qui le ferait vraiment bouger. Il a vendu avant de savoir &agrave; qui, pourquoi et pour quoi. R&eacute;sultat : une proposition qui ne r&eacute;pond &agrave; rien de pr&eacute;cis.
          </p>

          {/* ========== ERREUR 2 ========== */}
          <h2 id="erreur2" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 2 : vendre à un seul contact sans vérifier qui décide vraiment
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            C'est le classique : le responsable commercial vous &eacute;coute, valide l'int&eacute;r&ecirc;t, vous demande un devis. Deux semaines plus tard, il vous annonce que le dossier est bloqu&eacute; parce que le dirigeant a d'autres priorit&eacute;s.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Vous n'avez pas perdu face &agrave; un concurrent. Vous avez perdu parce que vous avez qualifi&eacute; un utilisateur, pas un d&eacute;cideur. La personne qui dit oui n'est pas toujours celle qui peut dire oui pour de vrai. Avant d'envoyer une proposition, sachez exactement qui &ndash; et combien de personnes &ndash; vont trancher.
          </p>

          {/* ========== ERREUR 3 ========== */}
          <h2 id="erreur3" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 3 : accepter un &laquo; je vais r&eacute;fl&eacute;chir &raquo; comme une r&eacute;ponse
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            &laquo; Je vais r&eacute;fl&eacute;chir &raquo; n'est pas une objection. C'est une porte ouverte vers le nulle part. Le commercial note le &laquo; oui probable &raquo;, met le dossier en opportunit&eacute; et attend. Le prospect n'y pense d&eacute;j&agrave; plus.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Un vrai prospect ne vous dit pas &laquo; je vais r&eacute;fl&eacute;chir &raquo;. Il vous dit &laquo; j'ai besoin de valider avec X &raquo; ou &laquo; on compare avec Y &raquo;. Tout le reste, c'est du &laquo; non poli &raquo; d&eacute;guis&eacute;. Si vous n'avez pas une vraie prochaine &eacute;tape, vous n'avez pas un deal.
          </p>

          {/* ========== ERREUR 4 ========== */}
          <h2 id="erreur4" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 4 : confondre l'int&eacute;r&ecirc;t poli avec l'intention d'achat
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Un prospect qui pose des questions, qui prend des notes, qui dit &laquo; c'est int&eacute;ressant &raquo; &ndash; ce n'est pas un prospect chaud. C'est simplement quelqu'un de curieux, de bien &eacute;lev&eacute;, ou les deux. La politesse n'est pas un signal d'achat.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Beaucoup de commerciaux confondent un &eacute;change agréable et un dossier solide. Un vrai int&eacute;r&ecirc;t se mesure &agrave; ce que le prospect fait apr&egrave;s l'&eacute;change : accepte-t-il un deuxi&egrave;me rendez-vous avec un d&eacute;cideur ? Donne-t-il acc&egrave;s &agrave; des informations sensibles ? Pose-t-il des dates ? Si rien de tout &ccedil;a, le dossier est encore au stade de la d&eacute;couverte, pas du closing.
          </p>

          {/* ========== ERREUR 5 ========== */}
          <h2 id="erreur5" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 5 : ne pas creuser le budget assez t&ocirc;t
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            &laquo; On verra le budget plus tard. &raquo; C'est la phrase qui transforme un deal en devis gratuit. Sans cadre financier, vous vendez dans le vide. Soit vous &ecirc;tes trop cher et vous le d&eacute;couvrez apr&egrave;s avoir pass&eacute; trois semaines &agrave; pr&eacute;parer une proposition. Soit vous &ecirc;tes trop bas et vous passez &agrave; c&ocirc;t&eacute; du vrai budget.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Creuser le budget, ce n'est pas demander &laquo; combien vous avez &raquo;. C'est comprendre comment le prospect d&eacute;pense, ce qu'il a d&eacute;j&agrave; budg&eacute;tis&eacute;, &agrave; quelle p&eacute;riode, et sous quelle forme. Si le budget n'est pas pos&eacute; avant la proposition, la proposition est un devis dans le vide.
          </p>

          {/* ========== ERREUR 6 ========== */}
          <h2 id="erreur6" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 6 : n&eacute;gliger les autres parties prenantes
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Un directeur commercial valide. Son adjoint est perplexe. Le responsable m&eacute;tier n'a pas &eacute;t&eacute; consult&eacute;. Le DAF veut un comparatif. Le deal ralentit, l'&eacute;lan retombe, et le concurrent qui a parl&eacute; aux cinq personnes prend l'avantage sans m&eacute;rite particulier.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Une d&eacute;cision B2B, aujourd'hui, c'est rarement une personne. C'est un collectif avec des int&eacute;r&ecirc;ts diff&eacute;rents. Si vous ne cartographiez pas ce collectif d&egrave;s le d&eacute;but, vous vendez &agrave; une seule t&ecirc;te d'un corps qui en a plusieurs. Et le corps finit par ne pas bouger.
          </p>

          {/* ========== ERREUR 7 ========== */}
          <h2 id="erreur7" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            Erreur 7 : ignorer l'urgence r&eacute;elle du prospect
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            &laquo; On a besoin de vous, mais pas tout de suite. &raquo; Traduction : on n'a pas vraiment besoin de vous. Un prospect sans &eacute;ch&eacute;ance, sans cons&eacute;quence &agrave; l'inaction, sans date butoir &ndash; c'est un projet. Pas un deal.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            L'urgence n'est pas une pression artificielle. Elle existe ou elle n'existe pas. Votre travail n'est pas de la cr&eacute;er, c'est de la v&eacute;rifier. &laquo; Qu'est-ce qui se passe si vous ne faites rien d'ici trois mois ? &raquo; Si la r&eacute;ponse est &laquo; rien &raquo;, le dossier est en veille. Et il y restera.
          </p>

          {/* ========== CHECKLIST ========== */}
          <h2 id="checklist" className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-14 mb-6">
            La checklist de qualification en 5 questions
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Avant monter un devis ou pr&eacute;parer une proposition, posez-vous ces cinq questions. Si l'une d'elles reste sans r&eacute;ponse claire, retenez le dossier.
          </p>

          <div className="mt-8 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10 mb-8">
            <ol className="space-y-4 text-gray-700 list-decimal list-inside">
              <li className="leading-relaxed">
                <strong>Qui d&eacute;cide vraiment ?</strong> Pas &laquo; qui est int&eacute;ress&eacute; &raquo;. Le nom, le statut, le pouvoir de dire oui.
              </li>
              <li className="leading-relaxed">
                <strong>Quel est le vrai besoin ?</strong> Pas l'envie exprim&eacute;e en surface. Le probl&egrave;me qui le pousse &agrave; agir.
              </li>
              <li className="leading-relaxed">
                <strong>Y a-t-il un budget identifiable ?</strong> Pas un ordre d'id&eacute;e. Une ligne, une p&eacute;riode, une autorisation.
              </li>
              <li className="leading-relaxed">
                <strong>Quelle est l'urgence r&eacute;elle ?</strong> Pas &laquo; bient&ocirc;t &raquo;. Qu'est-ce qui change concr&egrave;tement si rien ne se fait avant une &eacute;ch&eacute;ance donn&eacute;e ?
              </li>
              <li className="leading-relaxed">
                <strong>Qui d'autre va peser sur la d&eacute;cision ?</strong> Pas juste le contact direct. Les invisibles, les influenceurs, les validateurs.
              </li>
            </ol>
          </div>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Ces cinq questions prennent dix minutes. Les rattraper apr&egrave;s une proposition partie trop t&ocirc;t peut prendre deux mois.
          </p>

          {/* Bloc lié vers article connexe */}
          <div className="mt-12 p-6 bg-mint-green/5 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-blue-ink mb-2">En compl&eacute;ment</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Vous voulez aller plus loin sur la m&eacute;thode de qualification ? J'ai compar&eacute; les frameworks BANT, MEDDIC et d'autres approches dans un
              <Link href="/blog/methodes-vente-comparees-spin-bant-bebedc" className="text-mint-green hover:underline">
                {' '}article sur les m&eacute;thodes de vente compar&eacute;es{' '}
              </Link>
              . Les deux se compl&egrave;tent : les erreurs d'abord, le cadre ensuite.
            </p>
          </div>
        </div>

        {/* CTA Bloc final */}
        <div className="mt-12 bg-gradient-to-br from-blue-ink to-blue-ink/95 text-white rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-title font-bold mb-4">
            Vous voulez savoir si votre équipe qualifie bien ses prospects ?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Je vous propose un diagnostic offert d'une demi-journée pour analyser votre pipeline, repérer les erreurs de qualification et remettre du solide dans votre cycle de vente. Pas de pitch. Du terrain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-xl hover:bg-mint-green/90 transition-colors"
            >
              Prendre rendez-vous pour un diagnostic offert →
            </Link>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Découvrir le Bootcamp commercial
            </Link>
          </div>
        </div>

        {/* HubSpot Form */}
        <div className="mt-12">
          <HubSpotForm
            formId="blog-contact-form"
            title="Vous avez une question ?"
            description="Parlons de votre situation."
          />
        </div>

      </article>
    </main>
  );
}
