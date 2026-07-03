import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import BDCarousel from '@/components/BDCarousel';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

const articleUrl = 'https://www.laurentserre.com/blog/ia-generative-commercial-b2b-demander-mieux';
const heroImage = '/images/blog/ia-generative-commercial-b2b-demander-mieux/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/ia-generative-commercial-b2b-demander-mieux/hero.webp';

export const metadata: Metadata = {
  title: 'IA commercial B2B : pourquoi l\'IA aide surtout ceux qui savent quoi demander',
  description:
    'L\'IA générative ne donne pas du jugement commercial. Elle le révèle. Pourquoi les commerciaux qui clarifient leur raisonnement en tirent 10x plus.',
  keywords: [
    'IA commercial B2B',
    'IA générative commercial',
    'comment utiliser l\'IA en vente B2B',
    'prompts IA commercial',
    'IA et discipline commerciale',
    'IA révélateur compétences',
    'commercial augmenté IA',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-07-03',
  },
  openGraph: {
    title: 'IA commercial B2B : pourquoi l\'IA aide surtout ceux qui savent quoi demander',
    description:
      'L\'IA générative ne donne pas du jugement commercial. Elle le révèle. Pourquoi les commerciaux qui clarifient leur raisonnement en tirent 10x plus.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'IA commercial B2B : un commercial face à son écran, l\'IA comme révélateur de discipline commerciale',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IA commercial B2B : pourquoi l\'IA aide surtout ceux qui savent quoi demander',
    description:
      'L\'IA générative ne donne pas du jugement commercial. Elle le révèle.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/ia-generative-commercial-b2b-demander-mieux';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Couverture : IA commerciale B2B, un commercial face à son écran', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-depart.webp`, alt: 'Un commercial sort d\'un rendez-vous avec trois pages de notes éparpillées', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-mauvais-reflexe.webp`, alt: 'Le mauvais réflexe : demander une synthèse à l\'IA sans avoir clarifié ses notes', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-consequence.webp`, alt: 'Conséquence : une synthèse molle parce que les notes étaient déjà floues', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-lecture-juste.webp`, alt: 'La lecture juste : l\'IA révèle le flou, elle ne le crée pas', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-reflexion.webp`, alt: 'Le commercial prend du recul et clarifie son raisonnement avant de solliciter l\'IA', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-declic.webp`, alt: 'Le déclic : bien utiliser l\'IA, c\'est d\'abord savoir ce qu\'on cherche', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-cta.webp`, alt: 'Diagnostic offert : vos commerciaux savent-ils quoi demander à l\'IA ?', index: 7 },
];

const faqItems = [
  {
    question: 'Comment l\'IA transforme-t-elle la vente B2B ?',
    answer:
      'L\'IA transforme la vente B2B en automatisant ce qui est automatisable : la recherche d\'informations, la préparation des rendez-vous, la rédaction de premiers jets, la mise à jour CRM. Mais elle ne change pas ce qui fait le cœur de la vente : comprendre la situation du client, lire ses signaux, construire une décision. Le vrai changement, c\'est que l\'IA force le commercial à clarifier ce qu\'il cherche. Si ses notes sont floues, sa synthèse IA sera molle. La qualité de l\'outil révèle la qualité du raisonnement.',
  },
  {
    question: 'L\'IA va-t-elle remplacer les commerciaux ?',
    answer:
      'Non. L\'IA peut remplacer des tâches, pas la fonction commerciale. Elle peut écrire une relance, suggérer des objections, rédiger un premier jet de proposition. Mais elle ne peut pas savoir si cette relance fait avancer l\'affaire, quelle objection cache le vrai problème, ni si la proposition repose sur une vente solide ou fragile. L\'IA devient utile quand elle oblige le commercial à clarifier ce qu\'il cherche. Un commercial qui utilise l\'IA seulement pour écrire plus vite envoie surtout plus vite des messages moyens.',
  },
  {
    question: 'Comment utiliser ChatGPT dans la vente B2B ?',
    answer:
      'ChatGPT en vente B2B est utile pour préparer un rendez-vous, structurer des notes, relire un message, suggérer des objections possibles, ou rédiger un premier jet de proposition. Mais l\'usage le plus puissant n\'est pas la production : c\'est le diagnostic inversé. Au lieu de demander "Rédige-moi un email", demander "Voici mes notes. Qu\'est-ce qui reste flou ?", "Quelle prochaine étape est vraiment engagée ?", "Qu\'est-ce que j\'interprète trop vite ?". L\'IA devient alors un miroir de son propre raisonnement, pas un simple outil de productivité.',
  },
  {
    question: 'Quels outils IA pour commerciaux B2B ?',
    answer:
      'Les outils IA utiles aux commerciaux B2B se divisent en trois familles : la préparation (recherche d\'informations, synthèse de données prospect), la production (premiers jets de messages, propositions, relances), et l\'analyse (suggestions d\'objections, revue de deal, détection de signaux faibles). L\'important n\'est pas l\'outil : c\'est l\'usage qu\'on en fait. Un bon prompt sur un outil gratuit vaut mieux qu\'une suite IA sans discipline commerciale derrière. Le critère décisif reste la capacité du commercial à poser les bonnes questions, à l\'IA comme au client.',
  },
];

export default function IaGenerativeCommercialB2bPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'L\'IA aide surtout les commerciaux qui savent quoi lui demander',
        description:
          'L\'IA générative ne donne pas du jugement commercial. Elle le révèle. Pourquoi les commerciaux qui clarifient leur raisonnement en tirent 10x plus. Article terrain par Laurent Serre.',
        image: heroImageAbsolute,
        datePublished: '2026-07-03',
        dateModified: '2026-07-03',
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
        articleSection: 'Vente B2B / IA',
        keywords: [
          'IA commercial B2B',
          'IA générative commercial',
          'comment utiliser l\'IA en vente B2B',
          'prompts IA commercial',
          'IA et discipline commerciale',
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
          { '@type': 'ListItem', position: 3, name: 'L\'IA aide surtout les commerciaux qui savent quoi lui demander', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">L&apos;IA aide surtout les commerciaux qui savent quoi lui demander</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Vente B2B / IA
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              L&apos;IA aide surtout les commerciaux qui savent quoi lui demander
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
              <time dateTime="2026-07-03">3 juillet 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>
          </div>

          <div className="mb-8">
            <AuthorCard />
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un commercial concentré devant son écran, des notes manuscrites étalées sur le bureau, un carnet ouvert, la lumière naturelle du matin"
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

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              Ce qu&apos;il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              L&rsquo;IA ne donne pas du jugement commercial. Elle le r&eacute;v&egrave;le. Bien utilis&eacute;e, elle oblige le commercial &agrave; clarifier ce qu&rsquo;il cherche. La qualit&eacute; du prompt r&eacute;v&egrave;le la qualit&eacute; du raisonnement.
            </p>
          </div>

          {/* BD CAROUSEL */}
          <div className="mt-10 mb-8">
            <p className="text-sm text-amber-700 mb-5">
              Un commercial qui croit que l&rsquo;IA va vendre &agrave; sa place, des notes floues qui produisent une synth&egrave;se molle — et le d&eacute;clic qui change l&rsquo;usage de l&rsquo;outil.
            </p>
            <BDCarousel images={carouselImages} title="IA commerciale B2B" maxPreview={2} />
            <div className="mt-4 text-center">
              <Link href="/downloads/carrousel-ia-commercial-b2b-demander-mieux.pdf"
                className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors text-sm font-medium">
                📥 T&eacute;l&eacute;charger le PDF (8 planches)
              </Link>
            </div>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vos commerciaux savent-ils vraiment quoi demander &agrave; l&rsquo;IA ? Diagnostic offert
            </Link>
          </div>

          {/* Introduction */}
          <p className="mb-8">
            Dans beaucoup d&rsquo;&eacute;quipes commerciales, l&rsquo;IA est arriv&eacute;e par la mauvaise porte.
          </p>

          <p className="mb-8">
            On l&rsquo;a pr&eacute;sent&eacute;e comme un moyen d&rsquo;aller plus vite. &Eacute;crire plus vite. Pr&eacute;parer plus vite. R&eacute;sumer plus vite. Relancer plus vite.
          </p>

          <p className="mb-8">
            C&rsquo;est vrai, en partie. Mais ce n&rsquo;est pas l&agrave; que l&rsquo;IA change le plus le quotidien d&rsquo;un commercial B2B.
          </p>

          <p className="mb-8">
            Elle devient vraiment utile quand elle oblige le commercial &agrave; clarifier ce qu&rsquo;il cherche.
          </p>

          {/* H2: La scène typique */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Un rendez-vous et trois pages de notes
          </h2>

          <p className="mb-8">
            Je vois souvent la m&ecirc;me sc&egrave;ne. Un commercial sort d&rsquo;un rendez-vous avec trois pages de notes, quelques phrases du client, une impression plut&ocirc;t positive, et une prochaine &eacute;tape encore floue.
          </p>

          <p className="mb-8">
            Avant, il pouvait ranger &ccedil;a dans le CRM, ajouter une date de relance, puis passer &agrave; autre chose.
          </p>

          <p className="mb-8">
            Avec l&rsquo;IA, il peut demander une synth&egrave;se.
          </p>

          <p className="mb-8">
            Mais si la synth&egrave;se est molle, ce n&rsquo;est pas seulement la faute de l&rsquo;outil. C&rsquo;est souvent que le rendez-vous &eacute;tait d&eacute;j&agrave; flou.
          </p>

          <p className="mb-8 font-semibold text-blue-ink">
            L&rsquo;IA peut reformuler des notes. Elle ne peut pas inventer une d&eacute;cision qui n&rsquo;a jamais &eacute;t&eacute; obtenue.
          </p>

          <p className="mb-8">
            C&rsquo;est exactement le m&ecirc;me ph&eacute;nom&egrave;ne que ce que nous observons dans les &eacute;quipes qui utilisent l&rsquo;IA pour la pr&eacute;paration automatique, comme je le d&eacute;crivais dans l&rsquo;article sur{' '}
            <Link href="/blog/ia-commercial-b2b-revelateur-competences" className="text-mint-green hover:underline">
              l&rsquo;IA comme r&eacute;v&eacute;lateur de comp&eacute;tences
            </Link>
            . Quand l&rsquo;outil retire les excuses du commercial, le vrai niveau devient visible. Ici, c&rsquo;est la m&ecirc;me logique : l&rsquo;IA ne peut pas donner de la clart&eacute; &agrave; un esprit qui ne l&rsquo;est pas.
          </p>

          {/* H2: Ce que l'IA peut faire et ce qu'elle ne fait pas */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que l&rsquo;IA peut faire, et ce qu&rsquo;elle ne fait pas
          </h2>

          <p className="mb-8">
            Pour &ecirc;tre clair : l&rsquo;IA est utile. Tr&egrave;s utile m&ecirc;me. Mais il faut savoir o&ugrave; elle sert vraiment.
          </p>

          <div className="mb-8 grid gap-4">
            <div className="p-4 border-l-4 border-mint-green bg-mint-green/5 rounded-r-xl">
              <p className="font-semibold text-blue-ink mb-1">Aider &agrave; pr&eacute;parer un rendez-vous</p>
              <p className="text-gray-600 text-sm">Oui. Synth&egrave;se d&rsquo;informations, identification des interlocuteurs cl&eacute;s, rapide analyse du contexte. L&rsquo;IA est redoutable sur ce terrain.</p>
            </div>
            <div className="p-4 border-l-4 border-amber-400 bg-amber-50 rounded-r-xl">
              <p className="font-semibold text-blue-ink mb-1">Remplacer la question de fond &laquo;&nbsp;qu&rsquo;est-ce que je dois comprendre ?&nbsp;&raquo;</p>
              <p className="text-gray-600 text-sm">Non. L&rsquo;IA peut compiler des donn&eacute;es, mais elle ne peut pas savoir quelle information est d&eacute;cisive pour faire avancer cette vente-l&agrave;.</p>
            </div>
            <div className="p-4 border-l-4 border-mint-green bg-mint-green/5 rounded-r-xl">
              <p className="font-semibold text-blue-ink mb-1">Sugg&eacute;rer des objections possibles</p>
              <p className="text-gray-600 text-sm">Oui. L&rsquo;IA conna&icirc;t les objections classiques d&rsquo;un secteur, d&rsquo;une typologie d&rsquo;acheteur, d&rsquo;une situation.</p>
            </div>
            <div className="p-4 border-l-4 border-amber-400 bg-amber-50 rounded-r-xl">
              <p className="font-semibold text-blue-ink mb-1">Savoir quelle objection cache le vrai probl&egrave;me</p>
              <p className="text-gray-600 text-sm">Pas toujours. L&rsquo;IA ne peut pas sentir la g&ecirc;ne dans la voix du client au t&eacute;l&eacute;phone ni lire l&rsquo;h&eacute;sitation qui dit autre chose que les mots prononc&eacute;s.</p>
            </div>
            <div className="p-4 border-l-4 border-mint-green bg-mint-green/5 rounded-r-xl">
              <p className="font-semibold text-blue-ink mb-1">&Eacute;crire une relance propre</p>
              <p className="text-gray-600 text-sm">Oui. L&rsquo;IA produit un texte correct, bien tourn&eacute;, sans faute.</p>
            </div>
            <div className="p-4 border-l-4 border-amber-400 bg-amber-50 rounded-r-xl">
              <p className="font-semibold text-blue-ink mb-1">Savoir si cette relance fait avancer l&rsquo;affaire</p>
              <p className="text-gray-600 text-sm">Non. Un message peut &ecirc;tre parfaitement &eacute;crit et entretenir juste le silence. L&rsquo;IA ne peut pas savoir si la vente progresse ou si elle stagne poliment.</p>
            </div>
            <div className="p-4 border-l-4 border-mint-green bg-mint-green/5 rounded-r-xl">
              <p className="font-semibold text-blue-ink mb-1">R&eacute;diger une proposition</p>
              <p className="text-gray-600 text-sm">Oui. Premier jet, mise en forme, structuration. L&rsquo;IA est tr&egrave;s efficace pour &ccedil;a.</p>
            </div>
            <div className="p-4 border-l-4 border-amber-400 bg-amber-50 rounded-r-xl">
              <p className="font-semibold text-blue-ink mb-1">R&eacute;diger une proposition solide sur une vente fragile</p>
              <p className="text-gray-600 text-sm">&Ccedil;a produit surtout une belle proposition sur du sable. Si le besoin r&eacute;el n&rsquo;a pas &eacute;t&eacute; assez travaill&eacute;, l&rsquo;IA ne peut pas compenser.</p>
            </div>
          </div>

          <p className="mb-8">
            Ce tableau n&rsquo;est pas un r&eacute;quisitoire contre l&rsquo;IA. C&rsquo;est une clarification de ce qu&rsquo;elle apporte vraiment. Et cette clarification rejoint directement ce que j&rsquo;ai observ&eacute; sur l&rsquo;&eacute;volution du comportement des acheteurs B2B, d&eacute;crite dans{' '}
            <Link href="/blog/acheteurs-b2b-2026-client-deja-informe" className="text-mint-green hover:underline">
              l&rsquo;article sur le client d&eacute;j&agrave; inform&eacute;
            </Link>
            . Le client arrive pr&eacute;par&eacute;. Si le commercial aussi l&rsquo;est, la discussion peut monter d&rsquo;un cran. Mais si la pr&eacute;paration est molle, la rencontre n&rsquo;avance pas.
          </p>

          {/* H2: Le révélateur de discipline */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L&rsquo;IA est d&rsquo;abord un r&eacute;v&eacute;lateur de discipline
          </h2>

          <p className="mb-8">
            C&rsquo;est pour cela que l&rsquo;IA n&rsquo;est pas seulement un outil de production. C&rsquo;est un r&eacute;v&eacute;lateur de discipline commerciale.
          </p>

          <p className="mb-8">
            Un bon usage ne commence presque jamais par : &laquo;&nbsp;R&eacute;dige-moi un email.&nbsp;&raquo;
          </p>

          <p className="mb-8">
            Il commence par des questions comme :
          </p>

          <ul className="mb-8 list-disc pl-6 space-y-2 text-gray-700">
            <li>&laquo;&nbsp;Voici mes notes. Qu&rsquo;est-ce qui reste flou ?&nbsp;&raquo;</li>
            <li>&laquo;&nbsp;Quelle prochaine &eacute;tape est vraiment engag&eacute;e ?&nbsp;&raquo;</li>
            <li>&laquo;&nbsp;Qu&rsquo;est-ce que le client a dit pr&eacute;cis&eacute;ment, et qu&rsquo;est-ce que j&rsquo;interpr&egrave;te trop vite ?&nbsp;&raquo;</li>
            <li>&laquo;&nbsp;Quelle question aurais-je d&ucirc; poser avant d&rsquo;envoyer cette proposition ?&nbsp;&raquo;</li>
          </ul>

          <p className="mb-8">
            L&agrave;, l&rsquo;IA devient int&eacute;ressante. Pas parce qu&rsquo;elle vend &agrave; la place du commercial, mais parce qu&rsquo;elle l&rsquo;aide &agrave; relire son propre travail.
          </p>

          <p className="mb-8">
            Dans une PME, c&rsquo;est souvent plus utile qu&rsquo;une biblioth&egrave;que de prompts parfaite.
          </p>

          <p className="mb-8">
            Parce que le v&eacute;ritable probl&egrave;me de beaucoup d&rsquo;&eacute;quipes commerciales, ce n&rsquo;est pas le manque d&rsquo;outils. C&rsquo;est le flou dans la lecture des affaires. Un commercial qui ne sait pas vraiment o&ugrave; il en est avec un client aura du mal &agrave; le formuler, &agrave; l&rsquo;&eacute;crire dans son CRM, et &agrave; demander la bonne chose &agrave; l&rsquo;IA.
          </p>

          <p className="mb-8">
            L&rsquo;IA ne peut pas deviner ce que le commercial n&rsquo;arrive pas &agrave; formuler.
          </p>

          {/* H2: Le vrai gain n'est pas la vitesse */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le vrai gain n&rsquo;est pas la vitesse
          </h2>

          <p className="mb-8">
            Le vrai gain n&rsquo;est pas de produire dix messages en dix minutes.
          </p>

          <p className="mb-8">
            Le vrai gain, c&rsquo;est de mieux voir l&rsquo;affaire avant de continuer &agrave; avancer.
          </p>

          <p className="mb-8">
            Un commercial qui utilise l&rsquo;IA seulement pour &eacute;crire plus vite risque surtout d&rsquo;envoyer plus vite des messages moyens. Il industrialise le flou. Il gagne du temps sur la forme pour &ecirc;tre encore plus vague sur le fond.
          </p>

          <p className="mb-8">
            Un commercial qui utilise l&rsquo;IA pour mieux pr&eacute;parer, mieux relire et mieux d&eacute;cider peut, lui, devenir plus solide. Il ne gagne pas vingt minutes par jour : il gagne en qualit&eacute; de lecture de ses dossiers.
          </p>

          <p className="mb-8">
            C&rsquo;est un d&eacute;placement d&rsquo;&eacute;nergie significatif. Et c&rsquo;est l&agrave; que la diffusion de l&rsquo;IA dans les &eacute;quipes rejoint les comp&eacute;tences fondamentales que j&rsquo;ai list&eacute;es dans{' '}
            <Link href="/blog/commercial-en-2026-competences-qui-feront-difference" className="text-mint-green hover:underline">
              les comp&eacute;tences qui feront la diff&eacute;rence pour un commercial en 2026
            </Link>
            . Savoir pr&eacute;parer avec l&rsquo;IA, diagnostiquer avant de pitcher, prioriser avec les donn&eacute;es : tout cela suppose une discipline que l&rsquo;outil ne peut pas remplacer.
          </p>

          {/* Conclusion */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L&rsquo;IA ne donne pas du jugement. Elle le r&eacute;v&egrave;le.
          </h2>

          <p className="mb-8">
            La diff&eacute;rence est l&agrave;.
          </p>

          <p className="mb-8">
            L&rsquo;IA ne donne pas automatiquement du jugement commercial. Mais bien utilis&eacute;e, elle force une question simple : est-ce que je sais vraiment ce que je suis en train de faire avancer ?
          </p>

          <p className="mb-8">
            Si la r&eacute;ponse est oui, l&rsquo;IA devient un acc&eacute;l&eacute;rateur puissant. Si la r&eacute;ponse est non, elle ne fera que r&eacute;v&eacute;ler plus vite le flou.
          </p>

          <p className="mb-8">
            Avant d&rsquo;investir dans des outils, la question n&rsquo;est pas &laquo;&nbsp;quelle IA choisir&nbsp;&raquo;. La question est &laquo;&nbsp;mon &eacute;quipe sait-elle assez ce qu&rsquo;elle cherche pour que l&rsquo;IA l&rsquo;aide vraiment ?&nbsp;&raquo;
          </p>

          <p className="mb-8">
            Et cette question-l&agrave;, aucune IA ne peut y r&eacute;pondre &agrave; votre place.
          </p>

          {/* CTA MEDIUM */}
          <div className="my-12 text-center bg-gradient-to-r from-mint-green/10 to-blue-ink/5 rounded-2xl p-8 border border-mint-green/20">
            <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
              Vos commerciaux savent-ils quoi demander &agrave; l&rsquo;IA ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Avant d&rsquo;&eacute;quiper votre &eacute;quipe en outils, v&eacute;rifions ensemble la base : est-ce que vos commerciaux clarifient assez leur lecture des dossiers pour que l&rsquo;IA les aide r&eacute;ellement ?
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green text-blue-ink font-semibold px-8 py-3 rounded-full hover:bg-mint-green/90 transition-colors shadow-md"
            >
              Faire un diagnostic offert &rarr;
            </Link>
          </div>

          {/* FAQ */}
          <section className="my-12" id="faq">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8">
              Questions fr&eacute;quentes sur l&rsquo;IA commerciale B2B
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="group border border-gray-200 rounded-xl overflow-hidden bg-white"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-mint-green/5 transition-colors font-medium text-blue-ink">
                    <span>{item.question}</span>
                    <svg
                      className="w-5 h-5 text-mint-green group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-100 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* POUR ALLER PLUS LOIN */}
          <div className="mt-12 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/ia-commercial-b2b-revelateur-competences" className="text-mint-green hover:underline font-medium">
                  IA commerciale B2B : le r&eacute;v&eacute;lateur de comp&eacute;tences
                </Link>
                <span className="text-gray-500">{' '}: comment l&rsquo;IA expose le vrai niveau des commerciaux en supprimant leurs excuses.</span>
              </li>
              <li>
                <Link href="/blog/acheteurs-b2b-2026-client-deja-informe" className="text-mint-green hover:underline font-medium">
                  Acheteurs B2B 2026 : le client arrive d&eacute;j&agrave; inform&eacute;
                </Link>
                <span className="text-gray-500">{' '}: pourquoi la pr&eacute;paration commerciale est devenue non n&eacute;gociable face &agrave; un acheteur qui a tout lu.</span>
              </li>
              <li>
                <Link href="/blog/commercial-en-2026-competences-qui-feront-difference" className="text-mint-green hover:underline font-medium">
                  Commercial en 2026 : les comp&eacute;tences qui feront la diff&eacute;rence
                </Link>
                <span className="text-gray-500">{' '}: les cinq comp&eacute;tences qui s&eacute;pareront les commerciaux augment&eacute;s des autres.</span>
              </li>
            </ul>
          </div>

          {/* CTA FORT */}
          <div className="my-12 text-center bg-gradient-to-r from-blue-ink to-blue-ink/90 rounded-2xl p-10">
            <h3 className="text-2xl font-title font-bold text-white mb-4">
              La discipline avant les outils
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              L&rsquo;IA ne remplacera pas vos commerciaux. Mais elle r&eacute;v&eacute;lera ceux qui savent vraiment ce qu&rsquo;ils cherchent. Si vous voulez &eacute;valuer la discipline commerciale de votre &eacute;quipe avant d&rsquo;investir dans l&rsquo;IA, commen&ccedil;ons par un diagnostic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors shadow-md"
              >
                Diagnostic offert
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
              >
                D&eacute;couvrir le bootcamp
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <AuthorCard />
          </div>
        </div>
      </article>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Ne manquez pas les prochains articles
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Recevez chaque article directement par email. Pas de spam, du contenu terrain.
          </p>
          <HubSpotForm />
        </div>
      </section>

      {/* Retour au blog */}
      <section className="py-8 bg-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors font-medium">
            &larr; Tous les articles du blog
          </Link>
        </div>
      </section>

      {/* CTA Section globale */}
      <section className="py-16 bg-gradient-to-r from-blue-ink to-blue-ink/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-title font-bold text-white mb-4">
            Pr&ecirc;t &agrave; transformer votre &eacute;quipe commerciale ?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            D&eacute;couvrez comment notre approche peut am&eacute;liorer durablement
            les performances commerciales de votre entreprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
            >
              Diagnostic offert
            </Link>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
            >
              D&eacute;couvrir le bootcamp
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
