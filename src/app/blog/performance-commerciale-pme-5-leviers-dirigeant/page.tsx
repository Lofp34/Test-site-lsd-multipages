import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const heroImage = '/images/blog/performance-commerciale-5-leviers/performance-commerciale-5-leviers-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/performance-commerciale-5-leviers/performance-commerciale-5-leviers-hero.webp';

export const metadata: Metadata = {
  title: 'Performance commerciale en PME : les 5 leviers que les dirigeants négligent | Laurent Serre',
  description:
    'La plupart des dirigeants regardent le CA et le nombre d\'appels — mauvais indicateurs. Les vrais leviers : structure de qualification, rythme de débrief, revue de deal, pilotage par activité, alignement rémunération/comportement.',
  keywords:
    'performance commerciale, pilotage commercial PME, leviers performance commerciale, indicateurs commerciaux, management équipe commerciale, qualification commerciale, revue de deal, débrief commercial, rémunération commerciale',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/performance-commerciale-pme-5-leviers-dirigeant',
  },
  openGraph: {
    title: 'Performance commerciale en PME : les 5 leviers que les dirigeants négligent',
    description:
      'La plupart des dirigeants regardent le CA et le nombre d\'appels — mauvais indicateurs. Les vrais leviers : structure de qualification, rythme de débrief, revue de deal, pilotage par activité, alignement rémunération/comportement.',
    url: 'https://www.laurentserre.com/blog/performance-commerciale-pme-5-leviers-dirigeant',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: 'Un dirigeant de PME examine un tableau de bord commercial dans son bureau, ambiance réfléchie et professionnelle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance commerciale en PME : les 5 leviers que les dirigeants négligent',
    description:
      'La plupart des dirigeants regardent le CA et le nombre d\'appels. Les vrais leviers : qualification, débrief, revue de deal, pilotage par activité, rémunération.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/carrousel-performance-commerciale';

const carouselImages = [
  { src: `${carouselPrefix}/01-cover.webp`, alt: 'Cover : 5 leviers de performance commerciale que les dirigeants négligent', index: 0 },
  { src: `${carouselPrefix}/02-scene-depart.webp`, alt: 'Le dirigeant frustré devant son tableau de bord', index: 1 },
  { src: `${carouselPrefix}/03-qualification.webp`, alt: 'Structure de qualification : un commercial pose les bonnes questions', index: 2 },
  { src: `${carouselPrefix}/04-debrief.webp`, alt: 'Rythme de débrief : manager et commercial après un rendez-vous', index: 3 },
  { src: `${carouselPrefix}/05-revue-deal.webp`, alt: 'Revue de deal : l\'équipe analyse un dossier ensemble', index: 4 },
  { src: `${carouselPrefix}/06-pilotage.webp`, alt: 'Pilotage par activité vs résultat : visualiser les bons indicateurs', index: 5 },
  { src: `${carouselPrefix}/07-revenus.webp`, alt: 'Alignement rémunération et comportement', index: 6 },
  { src: `${carouselPrefix}/08-cta.webp`, alt: 'CTA : diagnostic offert sur laurentserre.com', index: 7 },
];

export default function PerformanceCommercialePMEPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@context': 'https://schema.org',
        headline: 'Performance commerciale en PME : les 5 leviers que les dirigeants négligent',
        description:
          'La plupart des dirigeants regardent le CA et le nombre d\'appels — mauvais indicateurs. Les vrais leviers : structure de qualification, rythme de débrief, revue de deal, pilotage par activité, alignement rémunération/comportement.',
        image: heroImageAbsolute,
        datePublished: '2026-06-01',
        dateModified: '2026-06-01',
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
          '@id': 'https://www.laurentserre.com/blog/performance-commerciale-pme-5-leviers-dirigeant',
        },
        articleSection: 'Performance commerciale / Pilotage d\'équipe',
        keywords: [
          'performance commerciale',
          'pilotage commercial PME',
          'leviers performance commerciale',
          'management équipe commerciale',
          'revue de deal',
          'qualification commerciale',
          'débrief commercial',
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.laurentserre.com/blog/performance-commerciale-pme-5-leviers-dirigeant',
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Les 5 leviers de performance commerciale', 'item': 'https://www.laurentserre.com/blog/performance-commerciale-pme-5-leviers-dirigeant' },
        ],
      },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Performance commerciale</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Performance commerciale / Pilotage d&apos;équipe</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Performance commerciale en PME : les 5 leviers que les dirigeants négligent
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-06-01">1 juin 2026</time>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un dirigeant de PME examine un tableau de bord commercial dans son bureau, ambiance réfléchie et professionnelle"
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

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          {/* AuthorCard top */}
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">✨ Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              La plupart des dirigeants regardent le chiffre d&apos;affaires et le nombre d&apos;appels. Ces indicateurs vous mentent. Les vrais leviers de performance commerciale en PME sont ailleurs : la structure de qualification, le rythme de débrief, la revue de deal, le pilotage par activité plutôt que par résultat, et l&apos;alignement rémunération-comportement. Cet article vous donne les cinq leviers concrets, avec des scènes de terrain.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : 5 leviers de performance commerciale
            </p>
            <p className="text-sm text-amber-700 mb-5">
              8 planches illustrées, de l&apos;erreur de pilotage classique à la mise en place des bons leviers.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Performance commerciale — les 5 leviers"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-performance-commerciale-5-leviers.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (8 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA diagnostic */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vous ne savez pas par quel levier commencer ? Faites un diagnostic offert →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#levier1" className="text-mint-green hover:underline">Levier 1 : La structure de qualification</a></li>
              <li><a href="#levier2" className="text-mint-green hover:underline">Levier 2 : Le rythme de débrief</a></li>
              <li><a href="#levier3" className="text-mint-green hover:underline">Levier 3 : La revue de deal</a></li>
              <li><a href="#levier4" className="text-mint-green hover:underline">Levier 4 : Piloter l&apos;activité, pas seulement le résultat</a></li>
              <li><a href="#levier5" className="text-mint-green hover:underline">Levier 5 : Aligner rémunération et comportement</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">Questions fréquentes</a></li>
            </ul>
          </div>

          {/* Contenu de l'article */}

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Je suis dans le bureau de Xavier, dirigeant d&apos;une PME de trente personnes. Il a son tableau de bord sous les yeux. Treize indicateurs. Quatre couleurs. Des flèches vertes, des flèches rouges.
          </p>

          <p className="mb-8">
            Il me dit : « Le CA est stable. Le nombre de rendez-vous augmente. Pourtant, je sens que ça patine. »
          </p>

          <p className="mb-8">
            Je regarde ses indicateurs. Il suit le chiffre d&apos;affaires réalisé, le nombre d&apos;appels sortants, le taux de transformation global, le nombre de propositions envoyées.
          </p>

          <p className="mb-8">
            Des indicateurs d&apos;activité et de résultat. Ceux que tout le monde suit. Ceux qui rassurent.
          </p>

          <p className="mb-8">
            « Est-ce que tu sais combien de dossiers en cours ont un vrai décideur identifié ? lui je demande. Est-ce que tu sais à quelle fréquence tes commerciaux débriefent un rendez-vous avec toi ? »
          </p>

          <p className="mb-8">
            Il marque un temps. « Non. Ça, je ne le regarde pas. »
          </p>

          <p className="mb-8">
            Voilà le problème. Xavier regarde ce qui se voit. Pas ce qui compte.
          </p>

          <p className="mb-8">
            Depuis vingt ans, je vois la même scène. Des dirigeants qui pilotent leur équipe commerciale avec des indicateurs qui disent tout sauf l&apos;essentiel. Qui regardent le rétroviseur — le CA du mois dernier — et s&apos;étonnent que la route devant soit floue.
          </p>

          <p className="mb-8">
            La performance commerciale ne se pilote pas avec des résultats passés. Elle se construit avec des leviers d&apos;action. Cinq, pour être précis. Les voici.
          </p>

          {/* Levier 1 */}
          <h2 id="levier1" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Levier 1 : La structure de qualification</h2>

          <p className="mb-8">
            Dans la plupart des équipes que je rencontre, la qualification est un exercice subjectif. Le commercial dit « il est chaud », et tout le monde acquiesce.
          </p>

          <p className="mb-8">
            Qu&apos;est-ce que ça veut dire, « chaud » ? Que le client a souri au téléphone ? Qu&apos;il a dit « oui, intéressant » ? Qu&apos;il a accepté un deuxième rendez-vous ?
          </p>

          <p className="mb-8">
            La qualification, ce n&apos;est pas une intuition. C&apos;est une grille de lecture partagée par toute l&apos;équipe. Chaque commercial doit pouvoir répondre aux mêmes questions sur chaque dossier :
          </p>

          <ul className="mb-8 space-y-3 text-gray-700">
            <li>Qui est le vrai décideur, et l&apos;avons-nous rencontré ?</li>
            <li>Quel est le problème précis que nous résolvons, et le client le formule-t-il avec ses mots à lui ?</li>
            <li>Quel est le budget en jeu, et est-il confirmé ou estimé ?</li>
            <li>Quel est le calendrier de décision, et repose-t-il sur un événement réel ou sur une intention vague ?</li>
            <li>Qu&apos;est-ce qui se passe si le client ne fait rien — est-ce que ça lui coûte vraiment quelque chose ?</li>
          </ul>

          <p className="mb-8">
            Une PME avec qui j&apos;ai travaillé l&apos;an dernier a mis en place une grille BANT revisitée : Budget, Authority, Need, Timeline. Rien de révolutionnaire en théorie. Mais ils l&apos;ont rendue obligatoire avant chaque passage en revue de deal.
          </p>

          <p className="mb-8">
            Résultat : en trois mois, le taux de conversion des opportunités qualifiées est passé de 22 % à 38 %. Pas parce qu&apos;ils vendaient mieux. Parce qu&apos;ils arrêtaient de perdre du temps sur des dossiers non qualifiés.
          </p>

          <p className="mb-8">
            Le premier levier de performance commerciale, c&apos;est de ne pas vendre à des gens qui n&apos;achèteront pas.
          </p>

          {/* Levier 2 */}
          <h2 id="levier2" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Levier 2 : Le rythme de débrief</h2>

          <p className="mb-8">
            Le débrief, tout le monde dit en faire. La réalité, c&apos;est qu&apos;on le fait mal ou pas assez souvent.
          </p>

          <p className="mb-8">
            Débriefe, ce n&apos;est pas : « Alors, ça s&apos;est bien passé ? » et le commercial répond « Oui » et on passe au dossier suivant.
          </p>

          <p className="mb-8">
            Un bon débrief suit une trame simple.
          </p>

          <ul className="mb-8 space-y-3 text-gray-700">
            <li>Qu&apos;est-ce que le client a dit exactement ? Pas ce qu&apos;on croit qu&apos;il a voulu dire. Ses mots.</li>
            <li>Qu&apos;est-ce qu&apos;on a appris qu&apos;on ne savait pas avant ?</li>
            <li>Qu&apos;est-ce qui doit se passer maintenant ? Et qui fait quoi ?</li>
          </ul>

          <p className="mb-8">
            Je travaille avec un directeur commercial qui a institué le débrief systématique dans la voiture, juste après chaque rendez-vous. Pas le lendemain. Pas en réunion d&apos;équipe. Tout de suite, à chaud, sur le parking ou sur le bas-côté.
          </p>

          <p className="mb-8">
            « Les trois premières minutes, on note les faits, dit-il. Pas les impressions. Les faits. Le client a dit quoi, exactement. Ensuite, on cherche ce qu&apos;on a raté. »
          </p>

          <p className="mb-8">
            Ce rythme de débrief quotidien change tout. Parce qu&apos;il empêche les commerciaux de se raconter des histoires. Il les force à regarder le réel en face, tout de suite, avant que la mémoire n&apos;ait commencé à arranger les choses.
          </p>

          <p className="mb-8">
            Le second levier, c&apos;est la fréquence et la qualité du débrief. Pas une fois par semaine. Chaque fois qu&apos;il y a un contact client significatif.
          </p>

          {/* Levier 3 */}
          <h2 id="levier3" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Levier 3 : La revue de deal</h2>

          <p className="mb-8">
            La revue de deal, c&apos;est le moment où l&apos;équipe regarde un dossier ensemble, pas pour décider si le commercial a bien travaillé, mais pour décider de la suite.
          </p>

          <p className="mb-8">
            Dans beaucoup de PME, la revue de deal n&apos;existe pas. On fait un point commercial le lundi matin, et chacun passe en revue ses dossiers. Le manager écoute. Il hoche la tête. Il dit « continue comme ça ». Le dossier reste dans le pipe parce que personne n&apos;a osé dire : « Là, on perd notre temps. »
          </p>

          <p className="mb-8">
            Une vraie revue de deal, ça ressemble à ça.
          </p>

          <ul className="mb-8 space-y-3 text-gray-700">
            <li>Un dossier est présenté par quelqu&apos;un d&apos;autre que le commercial qui le suit. Pas pour le piéger. Pour que quelqu&apos;un de neutre regarde les faits.</li>
            <li>L&apos;équipe challenger les informations manquantes. Pas le commercial. Le dossier.</li>
            <li>À la fin, une décision est prise : on investit plus de temps, on change d&apos;angle, ou on sort le dossier du pipe.</li>
          </ul>

          <p className="mb-8">
            Une PME de services avec qui j&apos;ai travaillé a mis en place une revue de deal hebdomadaire de quarante-cinq minutes. Pas plus. Chronométrée. Chaque dossier avait droit à sept minutes, pas une de plus.
          </p>

          <p className="mb-8">
            Les commercains ont détesté les premières semaines. Trop de pression. Trop de transparence. Puis ils ont commencé à arriver mieux préparés. Et les dossiers faibles ont cessé de traîner.
          </p>

          <p className="mb-8">
            Le troisième levier, c&apos;est une revue de deal régulière, structurée, où on prend des décisions. Pas une réunion d&apos;information. Un atelier de décision.
          </p>

          {/* Levier 4 */}
          <h2 id="levier4" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Levier 4 : Piloter l&apos;activité, pas seulement le résultat</h2>

          <p className="mb-8">
            Je vois beaucoup de tableaux de bord qui n&apos;affichent que des résultats : CA réalisé, nombre de signatures, marge dégagée.
          </p>

          <p className="mb-8">
            Le problème, c&apos;est que le résultat est toujours en retard. Quand il est mauvais, il est trop tard pour agir. Quand il est bon, on ne sait pas exactement ce qui l&apos;a provoqué.
          </p>

          <p className="mb-8">
            Piloter la performance commerciale, c&apos;est piloter ce qui produit le résultat, pas le résultat lui-même. Les indicateurs d&apos;activité sont ceux qu&apos;on peut corriger en temps réel.
          </p>

          <ul className="mb-8 space-y-3 text-gray-700">
            <li>Nombre de rendez-vous de découverte avec un vrai décideur</li>
            <li>Nombre de dossiers passés en revue de deal</li>
            <li>Taux de complétude de la grille de qualification par dossier</li>
            <li>Nombre de débriefs réalisés dans la semaine</li>
            <li>Pourcentage de dossiers avec prochaine étape claire et datée</li>
          </ul>

          <p className="mb-8">
            Un dirigeant avec qui je travaille suit ces indicateurs chaque semaine. Il ne regarde le CA qu&apos;une fois par mois, pour vérifier que la direction est bonne. Le reste du temps, il suit l&apos;activité.
          </p>

          <p className="mb-8">
            « Avant, dit-il, je m&apos;énervais tous les mois sur le CA. Depuis que je regarde l&apos;activité, je vois les problèmes arriver trois semaines avant. Et j&apos;ai le temps d&apos;agir. »
          </p>

          <p className="mb-8">
            Le quatrième levier, c&apos;est de déplacer le regard du résultat vers ce qui le produit.
          </p>

          {/* Levier 5 */}
          <h2 id="levier5" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Levier 5 : Aligner rémunération et comportement</h2>

          <p className="mb-8">
            Celui-là, c&apos;est le plus sensible. Et souvent le plus négligé.
          </p>

          <p className="mb-8">
            Beaucoup de dirigeants me disent : « On a un bon système de variable. » Quand je regarde, c&apos;est une commission sur le CA ou sur la marge. Point.
          </p>

          <p className="mb-8">
            Le problème, c&apos;est que la commission pure pousse à signer vite, pas à bien vendre. Elle pousse à fermer des dossiers même quand ils ne sont pas mûrs. Elle pousse à brader le prix pour décrocher la signature.
          </p>

          <p className="mb-8">
            Je ne suis pas contre la commission. Mais elle doit être équilibrée par des objectifs qui récompensent les bons comportements commerciaux.
          </p>

          <ul className="mb-8 space-y-3 text-gray-700">
            <li>Un bonus sur la tenue de la grille de qualification pour les dossiers clés</li>
            <li>Un bonus sur le taux de complétude des débriefs</li>
            <li>Un bonus sur la capacité à faire monter un dossier en revue de deal plutôt qu&apos;à le garder caché</li>
            <li>Un bonus collectif sur la qualité du pipe, pas seulement sur le CA signé</li>
          </ul>

          <p className="mb-8">
            Un exemple concret. Une PME avec qui j&apos;ai travaillé avait un commercial qui signait beaucoup, mais avec des remises systématiques de 15 à 20 %. Son variable était indexé sur le CA brut. Il avait tout intérêt à signer le plus vite possible, même brader.
          </p>

          <p className="mb-8">
            Nous avons modifié son variable : 50 % sur la marge, 30 % sur la tenue de ses débriefs et revues de deal, 20 % sur le CA. En quatre mois, le taux de remise moyen est passé de 18 % à 8 %. Pas parce qu&apos;il était devenu meilleur négociateur. Parce que son système de rémunération ne le poussait plus à brader.
          </p>

          <p className="mb-8">
            Le cinquième levier, c&apos;est d&apos;aligner ce que vous payez avec ce que vous voulez vraiment voir.
          </p>

          {/* Synthèse */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Par où commencer</h2>

          <p className="mb-8">
            Les cinq leviers que je viens de décrire ne sont pas un plan à déployer en une semaine. Choisissez-en un. Un seul. Celui où l&apos;écart entre ce qui se fait aujourd&apos;hui et ce qui serait possible est le plus grand.
          </p>

          <p className="mb-8">
            Pour la plupart des équipes que j&apos;accompagne, le premier levier à actionner est la qualification. Parce que tout le reste en dépend. Un pipe mal qualifié, c&apos;est du temps perdu sur des débriefs et des revues de deal qui n&apos;ont pas de sens.
          </p>

          <p className="mb-8">
            Commencez par une grille simple. Cinq questions. Appliquez-la à tous les dossiers en cours. Regardez combien tiennent debout. La réponse risque de vous surprendre.
          </p>

          <p className="mb-8 font-semibold text-blue-ink">
            La performance commerciale ne se mesure pas. Elle se construit, un levier à la fois.
          </p>

          {/* AuthorCard bottom */}
          <div className="mt-12 mb-8">
            <AuthorCard />
          </div>

          {/* Badge CTA Bootcamp */}
          <div className="mb-8 text-center">
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-blue-ink/10 text-blue-ink text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-ink/20 transition-colors"
            >
              Vous voulez un cadre structurant pour transformer votre équipe ? Découvrez le Bootcamp →
            </Link>
          </div>

          {/* CTA principal */}
          <div className="mt-8 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-blue-ink/10 text-center">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-3">
              Vous ne savez pas quel levier actionner en premier ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Je propose un diagnostic commercial pour les dirigeants de PME. On regarde ensemble où sont vos vrais leviers de progression.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green text-white font-semibold px-6 py-3 rounded-xl hover:bg-mint-green/90 transition-colors shadow-md"
            >
              Demander un diagnostic offert
            </Link>
          </div>

          {/* FAQ */}
          <div id="faq" className="mt-16">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8">Questions fréquentes</h2>

            <div itemScope itemType="https://schema.org/FAQPage" className="space-y-6">

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity" className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 itemProp="name" className="font-title font-semibold text-blue-ink mb-3">
                  Comment améliorer la performance commerciale de mon équipe ?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700">
                    Commencez par regarder autre chose que le CA. Analysez la qualité de votre pipe : chaque dossier a-t-il un vrai décideur identifié, un besoin clair, un budget confirmé, un calendrier réel ? Si la réponse est non pour plus de la moitié de vos dossiers, le premier levier est la qualification. Installez une grille partagée par toute l&apos;équipe et rendez son remplissage obligatoire avant chaque revue de deal.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity" className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 itemProp="name" className="font-title font-semibold text-blue-ink mb-3">
                  Quels sont les vrais leviers de performance commerciale ?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700">
                    Cinq leviers concrets : la structure de qualification (qui évite de perdre du temps sur des mauvais dossiers), le rythme de débrief (qui force la lucidité immédiate après chaque contact), la revue de deal (qui transforme les dossiers faibles en décisions claires), le pilotage par activité (qui permet d&apos;agir avant que le résultat ne soit mauvais), et l&apos;alignement rémunération-comportement (qui pousse aux bonnes pratiques). Un seul levier bien actionné peut changer la dynamique de toute l&apos;équipe.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity" className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 itemProp="name" className="font-title font-semibold text-blue-ink mb-3">
                  Pourquoi mes indicateurs commerciaux ne reflètent-ils pas la réalité ?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700">
                    Parce que vous regardez probablement des indicateurs de résultat (CA, nombre de signatures) qui sont toujours en retard. Quand le CA est mauvais, il est trop tard pour agir. Les vrais indicateurs sont ceux qui mesurent l&apos;activité qui produit le résultat : nombre de rendez-vous avec un vrai décideur, taux de complétude de la qualification, nombre de débriefs réalisés. Ces indicateurs-là sont des leviers d&apos;action, pas des constats.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity" className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 itemProp="name" className="font-title font-semibold text-blue-ink mb-3">
                  Quelle différence entre management commercial et pilotage commercial ?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700">
                    Le management commercial, c&apos;est l&apos;accompagnement des personnes : coacher un commercial sur sa technique, l&apos;aider à progresser sur ses points faibles, animer l&apos;équipe. Le pilotage commercial, c&apos;est la gestion du système : structurer le pipe, définir les bons indicateurs, organiser la revue de deal, ajuster la rémunération. Les deux sont nécessaires. Mais beaucoup de dirigeants font du management sans pilotage, et s&apos;étonnent que l&apos;équipe tourne sans progresser.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity" className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 itemProp="name" className="font-title font-semibold text-blue-ink mb-3">
                  Comment savoir si mon équipe est vraiment performante ?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700">
                    Posez-vous trois questions. Un : est-ce que chaque dossier dans le pipe a une prochaine étape claire et datée, avec un vrai décideur identifié ? Deux : est-ce que vos commerciaux débriefent systématiquement après chaque rendez-vous significatif ? Trois : est-ce que vous prenez des décisions pendant vos revues de deal, ou est-ce que vous écoutez des comptes rendus ? Si la réponse est non à au moins deux de ces questions, votre équipe n&apos;est pas pilotée. Elle tourne. Ce n&apos;est pas la même chose.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity" className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 itemProp="name" className="font-title font-semibold text-blue-ink mb-3">
                  Quels KPIs suivre pour une équipe commerciale en PME ?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700">
                    Suivez cinq indicateurs d&apos;activité : le nombre de rendez-vous de découverte avec un vrai décideur, le taux de complétude de la grille de qualification, le nombre de débriefs réalisés dans la semaine, le nombre de dossiers passés en revue de deal, et le pourcentage de dossiers avec une prochaine étape datée. Le CA, suivez-le une fois par mois pour vérifier la direction. Le reste du temps, pilotez ce qui produit le résultat.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity" className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 itemProp="name" className="font-title font-semibold text-blue-ink mb-3">
                  À quelle fréquence piloter la performance commerciale ?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700">
                    Le pilotage d&apos;activité se fait chaque semaine. Un point de trente minutes pour regarder les indicateurs d&apos;activité de la semaine écoulée, identifier les écarts, ajuster. La revue de deal se fait aussi chaque semaine, mais sur des dossiers précis, pas sur des volumes. Le débrief terrain se fait à chaque rendez-vous. La révision des objectifs et de la rémunération se fait trimestriellement. À aucun moment on n&apos;attend la fin du mois pour réagir.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity" className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 itemProp="name" className="font-title font-semibold text-blue-ink mb-3">
                  Comment transformer une équipe moyenne en équipe performante ?
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p itemProp="text" className="text-gray-700">
                    Choisissez un levier. Un seul. Installez-le jusqu&apos;à ce qu&apos;il devienne un réflexe, pas une contrainte. Quand la qualification est devenue naturelle, ajoutez le débrief systématique. Quand le débrief est installé, structurez la revue de deal. N&apos;essayez pas de tout changer en même temps — ça ne marche pas. La transformation d&apos;une équipe commerciale prend trois à six mois, pas trois semaines. Le piège, c&apos;est de vouloir aller trop vite.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </article>

      {/* Pour aller plus loin */}
      <section className="py-12 bg-blue-ink/5 border-t border-blue-ink/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-title font-bold text-blue-ink mb-6">Pour aller plus loin</h2>
          <p className="text-gray-600 mb-4">
            Si ces leviers vous parlent, ces articles complémentaires devraient vous intéresser :
          </p>
          <ul className="space-y-3">
            <li>
              <Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-blue-ink font-medium hover:underline">
                Construire un pipeline qui prédit vraiment votre chiffre d&apos;affaires
              </Link>
              <span className="text-gray-500 text-sm block">La structure de qualification dont parle l&apos;article, poussée à son niveau suivant.</span>
            </li>
            <li>
              <Link href="/blog/coaching-commercial-terrain-5-leviers-transformation-equipe" className="text-blue-ink font-medium hover:underline">
                Coaching commercial terrain — les 5 leviers de transformation d&apos;équipe
              </Link>
              <span className="text-gray-500 text-sm block">Quand le pilotage rencontre le terrain : comment faire vivre ces leviers au quotidien.</span>
            </li>
            <li>
              <Link href="/blog/kpis-commerciaux-pme-indicateurs-vous-cachent" className="text-blue-ink font-medium hover:underline">
                Les KPIs que vos indicateurs vous cachent
              </Link>
              <span className="text-gray-500 text-sm block">Approfondissement des indicateurs d&apos;activité mentionnés au levier 4.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Formulaire HubSpot */}
      <section className="py-16 bg-blue-ink/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-title font-bold text-blue-ink mb-4">
            Restez informé des nouveaux articles
          </h2>
          <p className="text-gray-600 mb-8">
            Recevez chaque semaine un article sur le pilotage commercial, la performance des équipes et les retours de terrain.
          </p>
          <HubSpotForm />
        </div>
      </section>

      {/* Lien retour blog */}
      <div className="py-8 text-center">
        <Link href="/blog" className="text-blue-ink font-medium hover:underline">
          ← Retour au blog
        </Link>
      </div>
    </main>
  );
}
