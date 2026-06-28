import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/pipeline-trop-plein-tue-performance-commerciale';
const heroImage = '/images/blog/pipeline-trop-plein-tue-performance-commerciale/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/pipeline-trop-plein-tue-performance-commerciale/hero.webp';

export const metadata: Metadata = {
  title: 'Pipeline trop plein : pourquoi ça tue votre performance',
  description:
    'Un pipeline commercial trop plein fait plus de mal qu\'un pipeline vide. La méthode pour qualifier out sans culpabilité et retrouver un pipeline sain de 15-20 deals.',
  keywords: [
    'pipeline commercial trop plein',
    'nettoyer pipeline commercial',
    'pipeline gonflé performance B2B',
    'qualifier out',
    'deals stagnants pipeline PME',
    'pipeline bloat vente B2B',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-28',
  },
  openGraph: {
    title: 'Pipeline trop plein : pourquoi vos 62 deals ouverts tuent votre performance',
    description:
      'Un pipeline commercial trop plein coûte plus cher qu\'un pipeline vide. Chaque deal mort consomme l\'attention que vos vraies opportunités méritent.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Pipeline trop plein : pourquoi vos 62 deals ouverts tuent votre performance',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pipeline trop plein : pourquoi vos 62 deals ouverts tuent votre performance',
    description:
      'Un commercial avec 62 deals ouverts ferme moins de deals qu\'un commercial avec 14. La méthode pour qualifier out sans culpabilité.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/pipeline-trop-plein-tue-performance-commerciale';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Cover — Le commercial qui voulait sauver tous ses deals', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-constat.webp`, alt: 'Stéphane et ses 62 deals ouverts dans le CRM', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-piege.webp`, alt: 'Le piège du pipeline rassurant qui endort le commercial', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-cout.webp`, alt: 'Le coût caché d\'un deal mort : 30 minutes par semaine', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-revelation.webp`, alt: 'Le manager montre les chiffres : 62 deals, 58% du quota', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-nettoyage.webp`, alt: 'Le grand nettoyage du pipeline : une affaire après l\'autre', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-3questions.webp`, alt: 'Les 3 questions pour qualifier out sans culpabilité', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-apres.webp`, alt: 'Après le nettoyage : 14 deals qui méritent vraiment l\'attention', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-resultats.webp`, alt: '3 deals closés en 1 mois, le meilleur mois de l\'année', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-regle.webp`, alt: 'La règle du pipeline sain : 15 à 20 deals maximum par commercial', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-lecon.webp`, alt: 'La leçon de Stéphane : le vrai luxe, c\'est de savoir quels deals méritent votre temps', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-cta.webp`, alt: 'CTA — Diagnostic offert sur laurentserre.com', index: 11 },
];

const faqItems = [
  {
    question: 'C\'est quoi un pipeline commercial trop plein ?',
    answer:
      'Un pipeline contenant plus de 20-25 deals actifs par commercial, dont la majorité n\'a pas de prochaine étape datée dans les 14 jours. Au-delà, la qualité de suivi s\'effondre et les vraies opportunités sont négligées.',
  },
  {
    question: 'Pourquoi un pipeline plein est-il dangereux ?',
    answer:
      'Parce qu\'il crée une fausse sensation de sécurité. Chaque deal mort consomme de l\'attention, des relances, du reporting, qui devraient être investis sur les vrais deals. Un commercial avec 62 deals ouverts performe presque toujours moins bien qu\'avec 15-20 bien qualifiés.',
  },
  {
    question: 'Comment qualifier out un deal sans le perdre ?',
    answer:
      'En posant 3 questions : le client sait-il qu\'il a un problème ? Y a-t-il une prochaine étape datée dans les 14 jours ? Si j\'arrête de relancer, que se passe-t-il ? Si les réponses sont non, le deal n\'est pas perdu, il n\'a jamais existé. Archivez et revenez dans 90 jours.',
  },
  {
    question: 'Combien de deals un commercial B2B peut-il gérer efficacement ?',
    answer:
      'Au-delà de 20-25 deals actifs, la qualité de suivi s\'effondre. La zone optimale est de 15-20 deals segmentés : 5 en closing, 5-10 en avancement, 5 en qualification active.',
  },
  {
    question: 'À quelle fréquence nettoyer son pipeline commercial ?',
    answer:
      'Chaque semaine, 30 minutes lors de la revue de pipeline, et en profondeur une fois par mois. Tout deal sans activité depuis 30 jours ou sans prochaine étape datée doit être qualifié out ou archivé.',
  },
  {
    question: 'Le pipeline bloat est-il un problème spécifique aux PME ?',
    answer:
      'Non, il touche toutes les tailles d\'entreprise. Mais en PME, l\'impact est plus brutal car le commercial gère souvent seul tout son cycle de vente, sans SDR pour pré-qualifier. La discipline de qualification out est donc encore plus critique.',
  },
];

export default function PipelineTropPleinPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Pipeline trop plein : pourquoi vos 62 deals ouverts tuent votre performance',
        description:
          'Un pipeline commercial trop plein coûte plus cher qu\'un pipeline vide. La méthode pour qualifier out sans culpabilité et retrouver un pipeline sain.',
        image: heroImageAbsolute,
        datePublished: '2026-06-28',
        dateModified: '2026-06-28',
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
        articleSection: 'Pilotage commercial / Pipeline',
        keywords: [
          'pipeline commercial',
          'pipeline trop plein',
          'qualifier out',
          'nettoyer pipeline',
          'deals stagnants',
          'performance commerciale PME',
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
          { '@type': 'ListItem', position: 3, name: 'Pipeline trop plein : pourquoi ça tue votre performance', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Pipeline trop plein : pourquoi ça tue votre performance</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Pilotage commercial / Pipeline
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Pipeline trop plein : pourquoi vos 62 deals ouverts tuent votre performance
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
              <time dateTime="2026-06-28">28 juin 2026</time>
              <span>•</span>
              <span>8 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Pipeline commercial trop plein : un dirigeant de PME face à son CRM saturé de deals stagnants"
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
              Un pipeline commercial trop plein coûte plus cher qu&apos;un pipeline vide. Chaque deal mort consomme l&apos;attention que vos vraies opportunités méritent. Qualifier out n&apos;est pas un échec, c&apos;est une décision de performance. 15-20 deals bien qualifiés valent mieux que 62 illusions.
            </p>
          </div>

          {/* BD Carrousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Le commercial qui voulait sauver tous ses deals
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire vraie de Stéphane, un commercial avec 62 deals ouverts et 58% de son quota. 48 deals morts qui lui coûtaient 24 heures par mois. Le jour où il a tout nettoyé, il a signé 3 deals en un mois. Son meilleur mois de l&apos;année.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Pipeline trop plein, le nettoyage"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-pipeline-trop-plein.pdf"
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
              Votre pipeline est-il plein de deals morts ? Diagnostic offert
            </Link>
          </div>

          {/* Introduction */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le piège du pipeline rassurant
          </h2>

          <p className="mb-8">
            Stéphane gère un portefeuille de 62 affaires en cours. Il est à 58% de son objectif trimestriel.
            Chaque lundi matin, il ouvre son CRM, voit les 62 lignes, et se dit que ça va finir par signer.
            Trois mois plus tard, il est à 51%.
          </p>

          <p className="mb-8">
            Le problème n&apos;est pas sa motivation. Le problème n&apos;est pas le marché.
            Le problème, c&apos;est qu&apos;il passe ses journées à nourrir des affaires qui n&apos;existent pas.
            Et pendant ce temps, les 5 vrais deals de son portefeuille reçoivent un suivi de surface.
          </p>

          <p className="mb-8">
            J&apos;ai vu ce scénario des dizaines de fois dans les PME que j&apos;accompagne.
            Un commercial qui a beaucoup de deals ouverts se sent en sécurité.
            Son cerveau lui dit : plus j&apos;ai d&apos;affaires en cours, plus j&apos;ai de chances d&apos;en signer.
            C&apos;est faux. Et c&apos;est le mensonge le plus coûteux de la vente B2B.
          </p>

          <p className="mb-8">
            La réalité, c&apos;est qu&apos;un pipeline chargé divise l&apos;attention.
            Chaque affaire demande un minimum de suivi : une relance, un mail, un point en réunion commerciale.
            Quand vous avez 60 dossiers, vous donnez 5 minutes à chacun.
            Quand vous en avez 15, vous donnez 30 minutes à chacun.
            Les vraies affaires, celles qui peuvent vraiment signer, ont besoin de ces 30 minutes.
            Pas de votre présence fantôme sur 60 lignes.
          </p>

          <p className="mb-8">
            C&apos;est exactement ce que je décris dans mon test du{' '}
            <Link href="/blog/pipeline-fantome-lundi-matin-test-9-minutes" className="text-mint-green hover:underline">
              pipeline fantôme du lundi matin
            </Link>.
            Mais il y a une nuance importante. Le pipeline fantôme, ce sont les affaires imaginaires, celles qui n&apos;ont jamais existé.
            Ici, on parle d&apos;autre chose. Des affaires réelles, qui ont commencé vraiment, mais qui sont mortes en route sans que personne ne le dise.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le coût caché d&apos;un deal mort
          </h2>

          <p className="mb-8">
            Prenons le calcul. Une affaire sans prochaine étape datée consomme environ 30 minutes par semaine.
            Un mail de relance, un passage en revue de pipeline, une ligne dans le reporting, une pensée pendant la nuit.
            30 minutes multipliées par 48 affaires mortes, ça fait 24 heures par mois.
            Trois journées complètes passées à entretenir des illusions.
          </p>

          <p className="mb-8">
            Et ce n&apos;est pas le pire. Le pire, c&apos;est l&apos;effet sur l&apos;acheteur.
            Plus un deal reste longtemps sans avancer, moins l&apos;acheteur est motivé.
            L&apos;enthousiasme du début s&apos;éteint. La décision recule.
            Un deal qui stagne pendant trois mois a beaucoup moins de chances de signer qu&apos;un deal traité en trois semaines.
            En gardant vos affaires mortes, vous ne les sauvez pas. Vous les enterrez plus lentement.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Apprendre à qualifier sans détruire
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente inclut le module pipeline chirurgie : les 3 questions de qualification out, le rituel hebdo de nettoyage, et la segmentation en 3 niveaux (closing, avancement, qualification). Vos commerciaux repartent avec un pipeline sain.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le cas réel : 62 deals, 58% de quota, puis 14 deals et 3 signés en un mois
          </h2>

          <p className="mb-8">
            Un commercial que j&apos;ai accompagné l&apos;an dernier m&apos;a dit une phrase qui résume tout.
            Il avait 62 affaires ouvertes, était à 58% de son objectif, et se sentait débordé.
            On a pris chaque affaire, une par une, et on a posé une seule question :
            quel est le coût de l&apos;inaction pour ce client ?
          </p>

          <p className="mb-8">
            Sur 62 affaires, 48 n&apos;avaient pas de réponse claire.
            Pas de coût de l&apos;inaction identifiable, pas de prochaine étape datée, pas de vrai décideur impliqué.
            On les a sorties du pipeline. Archivées. Pas supprimées, juste mises de côté pour 90 jours.
          </p>

          <p className="mb-8">
            Il lui restait 14 affaires. La semaine suivante, il a fermé 3 deals.
            Un mois plus tard, 4 autres avaient avancé concrètement.
            Les 48 affaires éliminées n&apos;étaient pas des pertes. C&apos;étaient des illusions.
            Des dossiers qui occupaient de la place dans son CRM et dans sa tête, sans aucune intention d&apos;achat réelle derrière.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Comment qualifier out sans culpabilité : 3 questions
          </h2>

          <p className="mb-8">
            La culpabilité, c&apos;est ce qui retient la plupart des commerciaux.
            Sortir un deal du pipeline, ça ressemble à un échec. Ça fait mal à l&apos;ego.
            Mais garder une affaire morte n&apos;est pas de la persévérance. C&apos;est de l&apos;évitement.
          </p>

          <p className="mb-8">
            Voici les trois questions que j&apos;utilise en coaching pour aider les commerciaux à qualifier out sans se tromper :
          </p>

          <div className="bg-slate-50 rounded-lg p-6 my-6 border border-slate-200">
            <p className="mb-3">
              <strong>1. Est-ce que le client sait qu&apos;il a un problème ?</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Si le client ne ressent pas de problème, vous ne vendez pas. Vous faites du marketing.
              Et le marketing ne devrait pas être dans votre pipeline commercial.
            </p>

            <p className="mb-3">
              <strong>2. Est-ce qu&apos;il y a une prochaine étape datée dans les 14 jours ?</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Pas « après les vacances », pas « on se recontacte la semaine prochaine ».
              Une date précise, dans un calendrier, avec un objet.
              Si cette date n&apos;existe pas, l&apos;affaire est morte. Elle ne le sait pas encore.
            </p>

            <p className="mb-3">
              <strong>3. Si j&apos;arrête de relancer, que se passe-t-il ?</strong>
            </p>
            <p className="text-slate-700">
              Si la réponse est « rien », le deal n&apos;existe pas.
              Vous êtes le seul à le faire vivre. C&apos;est vous qui poussez, pas le client qui tire.
              Et en vente B2B, si le client ne tire pas, il n&apos;y a pas de vente.
            </p>
          </div>

          <p className="mb-8">
            Ces trois questions viennent directement du travail que je fais sur la{' '}
            <Link href="/blog/qualification-commerciale-b2b-7-erreurs" className="text-mint-green hover:underline">
              qualification commerciale en B2B
            </Link>.
            La qualification n&apos;est pas un formulaire à remplir au début de la vente.
            C&apos;est un réflexe permanent. À chaque étape, vous devez savoir si l&apos;affaire mérite votre temps.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La règle du pipeline sain : 15 à 20 deals maximum par commercial
          </h2>

          <p className="mb-8">
            Au-delà de 20 affaires actives, la qualité de suivi s&apos;effondre. C&apos;est un fait, pas une opinion.
            La zone optimale, celle que je vois fonctionner dans toutes les PME performantes que j&apos;accompagne, c&apos;est 15 à 20 deals segmentés en trois niveaux :
          </p>

          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>5 affaires en closing : le travail prioritaire, celles qui peuvent signer ce mois-ci</li>
            <li>5 à 10 affaires en avancement : le travail de fond, celles qui avancent vers une décision</li>
            <li>5 affaires en qualification active : le futur, celles où vous testez la réalité de l&apos;opportunité</li>
          </ul>

          <p className="mb-8">
            Tout ce qui dépasse ce chiffre doit avoir une date d&apos;expiration automatique.
            Pas d&apos;exception. Pas de « oui mais celle-là, c&apos;est différent ».
            Parce qu&apos;elles sont toutes différentes, et c&apos;est comme ça qu&apos;on se retrouve à 62.
          </p>

          <p className="mb-8">
            C&apos;est aussi l&apos;un des principes clés du{' '}
            <Link href="/blog/systeme-90-jours-anti-yo-yo-ca" className="text-mint-green hover:underline">
              système 90 jours anti-yo-yo
            </Link>.
            Un pipeline sain n&apos;est pas un pipeline plein. C&apos;est un pipeline où chaque affaire a une probabilité réelle de signer, un prochain pas daté, et toute l&apos;attention qu&apos;elle mérite.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que vous devez faire lundi matin
          </h2>

          <p className="mb-8">
            Ouvrez votre pipeline. Comptez vos affaires en cours.
            Si vous êtes au-delà de 25, vous avez un problème.
            Prenez chaque affaire et posez les trois questions.
            Celles qui n&apos;ont pas de réponse claire, sortez-les. Archivez-les pour 90 jours.
          </p>

          <p className="mb-8">
            Vous allez ressentir de la peur. C&apos;est normal.
            Votre cerveau va vous dire que vous perdez des opportunités.
            Mais un pipeline sain fait peur au début et rassure à la fin.
            Un pipeline trop plein rassure au début et fait mal à la fin.
          </p>

          <p className="mb-8">
            Stéphane l&apos;a fait. Il est passé de 62 deals à 14.
            Le mois suivant, il a signé 3 affaires. Son meilleur mois de l&apos;année.
            Pas parce qu&apos;il travaillait plus. Parce qu&apos;il travaillait les bonnes affaires.
          </p>

          <p className="mb-8 text-lg font-semibold text-blue-ink">
            Le vrai luxe en vente, ce n&apos;est pas d&apos;avoir beaucoup de deals.
            C&apos;est de savoir lesquels méritent votre temps.
          </p>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Votre pipeline a besoin d&apos;un vrai diagnostic
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic commercial identifie les deals morts qui encombrent votre pipeline
              et les vraies opportunités que vous négligez. 5 minutes pour changer votre trimestre.
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

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/blog/pipeline-fantome-lundi-matin-test-9-minutes" className="text-mint-green hover:underline">
                  → Pipeline fantôme : le test 9 minutes du lundi matin
                </Link>
              </li>
              <li>
                <Link href="/blog/qualification-commerciale-b2b-7-erreurs" className="text-mint-green hover:underline">
                  → Qualification commerciale B2B : 7 erreurs qui tuent vos ventes
                </Link>
              </li>
              <li>
                <Link href="/blog/pourquoi-vos-commerciaux-confondent-interet-et-decision" className="text-mint-green hover:underline">
                  → Pourquoi vos commerciaux confondent intérêt et décision
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
