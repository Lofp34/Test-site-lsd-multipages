import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/good-to-great-equipe-commerciale-pme';
const heroImage = 'https://www.laurentserre.com/images/blog/good-to-great-equipe-commerciale-pme/hero.webp';

export const metadata: Metadata = {
  title: 'Good to Great équipe commerciale : 5 concepts pour PME | Laurent Serre',
  description:
    'Les 5 concepts de Jim Collins appliqués à votre équipe commerciale PME. Leadership, recrutement, focalisation et discipline pour transformer une équipe bonne en excellente.',
  keywords: [
    'Good to Great équipe commerciale',
    'Good to Great résumé français',
    'Jim Collins management commercial',
    'leadership niveau 5',
    'concept du hérisson commercial',
    'volant d\'inertie commercial PME',
    'management équipe commerciale',
    'Laurent Serre',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-27',
  },
  openGraph: {
    title: 'Good to Great appliqué à l\'équipe commerciale : 5 concepts de Jim Collins pour transformer une équipe PME',
    description:
      'Découvrez comment les 5 concepts de Jim Collins traduits en décisions terrain de dirigeant PME transforment une équipe commerciale bonne en équipe excellente.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 1024,
        alt: 'Good to Great appliqué à l\'équipe commerciale PME',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Good to Great équipe commerciale : 5 concepts pour PME | Laurent Serre',
    description:
      'Leadership niveau 5, concept du hérisson, volant d\'inertie — les 5 concepts de Jim Collins appliqués au terrain commercial PME.',
    images: [heroImage],
  },
};

const carouselPrefix = '/images/blog/good-to-great-equipe-commerciale-pme';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Couverture : Good to Great équipe commerciale — les 5 concepts Jim Collins pour PME', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-constat.webp`, alt: 'Un dirigeant réalise que son équipe commerciale stagne, bonne mais pas excellente', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-refus-choisir.webp`, alt: 'Il refuse de choisir entre plusieurs marchés pour ne perdre aucune opportunité', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-dispersion.webp`, alt: 'L\'équipe court dans toutes les directions sans priorité claire', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-laurent-coaching.webp`, alt: 'Laurent Serre pose la question du leadership niveau 5 : humilité et volonté', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-dabord-qui.webp`, alt: 'Concept : d\'abord qui, ensuite quoi — les bonnes personnes dans le bus', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-herisson.webp`, alt: 'Le concept du hérisson : une seule chose dans laquelle vous êtes le meilleur', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-discipline-dire-non.webp`, alt: 'Discipline de la pensée : savoir dire non à ce qui disperse l\'équipe', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-volant-inertie.webp`, alt: 'Le volant d\'inertie : chaque petit effort qui accumule de la puissance', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-transformation.webp`, alt: 'L\'équipe passe de bonne à excellente en appliquant les 5 concepts', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-resultats.webp`, alt: 'Résultats : pipeline clair, marge préservée, équipe focalisée', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-cta.webp`, alt: 'Commencez par un diagnostic offert sur laurentserre.com', index: 11 },
];

const faqItems = [
  {
    question: 'Qu\'est-ce que le leadership de niveau 5 dans Good to Great ?',
    answer:
      'Le leadership niveau 5 est un concept de Jim Collins qui décrit un dirigeant alliant une humilité personnelle profonde et une volonté professionnelle farouche. En équipe commerciale PME, ça se traduit par un manager qui met le succès de ses commerciaux avant sa propre lumière, mais qui tient un cap exigeant sur les résultats. Il ne cherche pas à être le meilleur vendeur, il construit la meilleure équipe.',
  },
  {
    question: 'Comment appliquer Good to Great à une équipe commerciale PME ?',
    answer:
      'Concrètement, cinq leviers : 1) Un leadership niveau 5 qui construit l\'équipe plutôt que de tout porter. 2) Placer les bons profils aux bons postes avant de définir la stratégie. 3) Focaliser toute l\'énergie sur un segment de marché où l\'équipe peut être la meilleure. 4) Dire non systématiquement à tout ce qui disperse la force commerciale hors de ce cœur. 5) Créer un volant d\'inertie où chaque cycle de vente renforce le suivant.',
  },
  {
    question: 'Qu\'est-ce que le concept du hérisson en vente B2B ?',
    answer:
      'Le concept du hérisson appliqué à la vente B2B consiste à trouver l\'intersection entre trois cercles : ce qui fait la meilleure marge, ce que l\'équipe fait de mieux, et ce qui génère le plus de valeur pour vos clients types. Une fois ce cœur identifié, tout l\'effort commercial s\'y concentre. Pas de dispersion sur des marchés adjacents, pas de vente de solutions sur mesure qui sortent du cadre.',
  },
  {
    question: 'Le volant d\'inertie de Collins fonctionne-t-il pour le pipeline commercial ?',
    answer:
      'Oui, et c\'est même une des applications les plus puissantes. Le volant d\'inertie en vente B2B signifie que chaque deal bien mené nourrit le suivant : une qualification rigoureuse donne un meilleur closing, un closing réussi donne une meilleure référence, une meilleure référence donne un meilleur lead. L\'énergie s\'accumule. Le piège inverse, c\'est de repartir de zéro à chaque nouveau cycle parce qu\'on n\'a pas construit le système qui capitalise.',
  },
  {
    question: 'Good to Great est-il pertinent pour une PME française en 2026 ?',
    answer:
      'Plus que jamais. Dans un contexte où les cycles de vente s\'allongent, où les acheteurs sont plus exigeants et où la marge se resserre, la focalisation et la discipline sont des avantages concurrentiels décisifs. Une PME qui ne peut pas rivaliser par la taille peut gagner par la concentration, la constance et la qualité d\'exécution — c\'est précisément ce que décrit Good to Great. Le livre date de 2001, mais les mécanismes humains qu\'il décrit sont structurels.',
  },
  {
    question: 'Combien de temps pour transformer une équipe commerciale bonne en excellente ?',
    answer:
      'Collins a observé que les entreprises de son étude mettaient en moyenne 4 à 6 ans pour franchir le cap. En PME, le temps réel dépend de trois facteurs : la maturité de l\'équipe en place, la clarté du leadership, et la capacité à dire non aux fausses urgences. Ce qui est accessible en 12 à 18 mois : un cap clair, une équipe recentrée, des rituels de pilotage solides. La transformation complète prend 2 à 3 ans si l\'équipe tient le cap.',
  },
];

export default function ArticlePage() {
  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-[700px] mx-auto px-4 py-12">
        {/* Meta hidden */}
        <div itemScope itemType="https://schema.org/BlogPosting" className="hidden">
          <span itemProp="headline">Good to Great appliqué à l&apos;équipe commerciale : 5 concepts de Jim Collins pour transformer une équipe PME</span>
          <span itemProp="description">Les 5 concepts de Jim Collins appliqués à votre équipe commerciale PME. Leadership, recrutement, focalisation et discipline pour transformer une équipe bonne en excellente.</span>
          <span itemProp="datePublished">2026-06-27</span>
          <span itemProp="dateModified">2026-06-27</span>
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Laurent Serre</span>
            <span itemProp="url" content="https://www.laurentserre.com" />
            <meta itemProp="sameAs" content="https://www.linkedin.com/in/laurentserre34/" />
            <meta itemProp="sameAs" content="https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/" />
          </span>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Hero image */}
          <Image
            src={heroImage}
            alt="Good to Great équipe commerciale PME"
            width={1536}
            height={1024}
            className="rounded-xl mb-8 w-full"
            priority
          />

          {/* En-tête */}
          <p className="text-sm text-mint-green font-semibold uppercase tracking-wider mb-2">
            Management / Leadership
          </p>
          <h1 className="text-3xl md:text-4xl font-title font-bold text-blue-ink leading-tight mb-4">
            Good to Great appliqué à l&apos;équipe commerciale : 5 concepts de Jim Collins pour transformer une équipe PME
          </h1>
          <p className="text-gray-500 text-sm mb-8">Par Laurent Serre — 27 juin 2026 • 8 min de lecture</p>

          {/* TL;DR */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 mb-8">
            <p className="text-sm font-bold text-blue-ink uppercase tracking-wider mb-2">TL;DR</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Jim Collins a passé 5 ans à comprendre pourquoi certaines entreprises passent de bonnes à excellentes pendant que d&apos;autres stagnent. Ses 5 concepts (leadership niveau 5, les bonnes personnes dans le bus, le concept du hérisson, la discipline de la pensée, le volant d&apos;inertie) s&apos;appliquent remarquablement à une équipe commerciale PME. Pas besoin d&apos;être un grand groupe pour les utiliser. Le terrain les rend même plus puissants.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="mb-10">
            <BDCarousel
              title="Good to Great équipe commerciale : le dirigeant qui refusait de choisir"
              images={carouselImages}
              pdfUrl="/images/blog/good-to-great-equipe-commerciale-pme/carrousel.pdf"
            />
          </div>

          {/* Intro */}
          <p className="lead text-lg text-gray-700 leading-relaxed mb-6">
            L&apos;histoire commence toujours de la même façon. Un dirigeant me dit : « Mon équipe est bonne. Mais elle plafonne. Les deals avancent, le pipeline tient, mais on n&apos;arrive pas à passer un cap. »
          </p>
          <p className="mb-6">
            Bonne nouvelle : être bon n&apos;est pas un problème en soi. Le problème, c&apos;est quand personne ne sait pourquoi l&apos;équipe n&apos;est pas meilleure. Quand on se contente d&apos;un « ça va » mou sans identifier ce qui bloque la progression réelle.
          </p>
          <p className="mb-6">
            Jim Collins a passé cinq ans à étudier ce passage de bon à excellent dans des entreprises. Ses conclusions ne sont pas des concepts théoriques. Ce sont des mécanismes humains et organisationnels qui marchent aussi sur un terrain de vente PME.
          </p>
          <p className="mb-8">
            Voici les cinq, traduits en décisions de dirigeant.
          </p>

          {/* CTA SOFT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous sentez que votre équipe commerciale plafonne ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Un diagnostic commercial offert d&apos;une demi-journée vous donne une photographie claire de là où se situe le vrai blocage. Pas de théorie. Du terrain.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 bg-mint-green text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-mint-green/90 transition-colors"
            >
              Demander un diagnostic offert
            </Link>
          </div>

          {/* Concept 1 */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-4">
            1. Leadership niveau 5 : l&apos;humilité qui performe
          </h2>
          <p className="mb-6">
            Le dirigeant niveau 5 est celui qui ne cherche pas la lumière. Il met ses commerciaux en avant. Il construit le système qui fait réussir l&apos;équipe, pas celui qui le rend indispensable.
          </p>
          <p className="mb-6">
            Concrètement, ça veut dire quoi en PME ? Le dirigeant qui arrête de reprendre les rendez-vous à la place de ses commerciaux. Celui qui forme, qui lâche, qui recadre, mais qui ne confisque pas le client. Celui qui célèbre une victoire en disant « c&apos;est l&apos;équipe » et assume un échec en disant « c&apos;est de ma responsabilité ».
          </p>
          <p className="mb-8">
            Collins l&apos;a observé dans les entreprises passées de bonnes à excellentes. En PME, c&apos;est le premier levier : un dirigeant qui accepte de ne pas être le héros pour que l&apos;équipe le devienne.
          </p>

          {/* Concept 2 */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-4">
            2. D&apos;abord qui, ensuite quoi : les bonnes personnes dans le bus
          </h2>
          <p className="mb-6">
            La plupart des dirigeants PME font l&apos;inverse : ils définissent la stratégie, puis cherchent qui va l&apos;exécuter. Collins dit : mettez les bonnes personnes dans le bus d&apos;abord. Ensuite, décidez où aller.
          </p>
          <p className="mb-6">
            En équipe commerciale, ça se traduit par une règle simple : un commercial excellent sur un mauvais marché fera toujours mieux qu&apos;un commercial moyen sur un bon marché. La qualité des personnes prime sur la stratégie.
          </p>
          <p className="mb-8">
            Si vous gardez un commercial qui plafonne depuis deux ans parce qu&apos;il est sympa ou parce qu&apos;il était là au début, vous ne passerez jamais de bon à excellent. La question n&apos;est pas « est-ce que je peux le garder ? », mais « est-ce que cette personne rend l&apos;équipe meilleure ou l&apos;empêche de progresser ? »
          </p>

          {/* Concept 3 */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-4">
            3. Le concept du hérisson : une seule chose dans laquelle vous êtes le meilleur
          </h2>
          <p className="mb-6">
            Collins oppose le renard (qui connaît beaucoup de choses) au hérisson (qui connaît une grande chose). Les entreprises excellentes sont des hérissons : elles savent exactement ce qu&apos;elles peuvent faire de mieux que quiconque, et elles s&apos;y tiennent.
          </p>
          <p className="mb-8">
            Pour une équipe commerciale PME, le concept du hérisson consiste à trouver l&apos;intersection entre trois cercles : le segment de marché qui vous rapporte le plus, le type de vente que vos commerciaux maîtrisent le mieux, et le problème client que vous résolvez le mieux. Tout le reste, vous le laissez. Même si c&apos;est tentant.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous voulez construire une équipe commerciale qui tient le cap ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le Bootcamp vous donne le cadre opérationnel pour recruter, former et piloter une équipe commerciale qui ne dévie pas de son cœur de marché.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center gap-2 bg-mint-green text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-mint-green/90 transition-colors"
            >
              Découvrir le Bootcamp
            </Link>
          </div>

          {/* Concept 4 */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-4">
            4. La discipline de la pensée : savoir dire non
          </h2>
          <p className="mb-6">
            Le quatrième concept de Collins est peut-être le plus dur pour un dirigeant de PME : la discipline de dire non à ce qui ne correspond pas au concept du hérisson. Pas « plus tard », pas « on verra ». Non.
          </p>
          <p className="mb-6">
            En pratique, ça signifie refuser un marché adjacent qui rapporterait vite mais vous éloignerait de votre cœur. Refuser de lancer une nouvelle gamme parce que l&apos;équipe commerciale n&apos;est pas taillée pour la vendre. Refuser de faire du sur-mesure pour un client qui vous ferait sortir de votre zone d&apos;excellence.
          </p>
          <p className="mb-8">
            La discipline de la pensée, c&apos;est aussi la discipline du pipeline : ne pas laisser monter des deals qui ne correspondent pas à votre cible idéale sous prétexte que « ça peut toujours servir ». Chaque deal hors cible est un deal qui vole de l&apos;énergie aux deals qui comptent vraiment.
          </p>

          {/* Concept 5 */}
          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-4">
            5. Le volant d&apos;inertie : chaque tour rend le suivant plus facile
          </h2>
          <p className="mb-6">
            Collins compare la transformation à un volant d&apos;inertie : au début, chaque poussée demande un effort énorme pour un résultat presque invisible. Mais à force de pousser dans la même direction, le volant accumule de l&apos;énergie. Chaque tour devient plus facile.
          </p>
          <p className="mb-6">
            En équipe commerciale, ça veut dire que les premiers mois d&apos;une transformation sont durs. On change les processus, on recrute, on vire, on recadre, on forme. Et on n&apos;en voit pas encore les résultats. C&apos;est le moment où la plupart des dirigeants lâchent et changent de cap.
          </p>
          <p className="mb-8">
            Ce qui fait la différence, c&apos;est la constance. Chaque cycle de vente bien mené renforce le suivant. Une qualification rigoureuse aujourd&apos;hui donne un meilleur closing demain. Un closing réussi donne une meilleure référence après-demain. L&apos;énergie s&apos;accumule. À condition de ne pas dévier à chaque nouveau trimestre.
          </p>

          {/* PAL */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                → <Link href="/blog/pourquoi-un-manager-commercial-reprend-trop-souvent-les-rendez-vous-a-la-place-de-lequipe" className="text-mint-green hover:underline">
                  Pourquoi le manager reprend les rendez-vous à la place de l&apos;équipe
                </Link>
              </li>
              <li>
                → <Link href="/blog/recrutement-commercial-en-pme-arretez-de-recruter-a-l-instinct" className="text-mint-green hover:underline">
                  Recrutement commercial : arrêtez de recruter à l&apos;instinct
                </Link>
              </li>
              <li>
                → <Link href="/blog/strategie-commerciale-pme-cadre-une-page" className="text-mint-green hover:underline">
                  Stratégie commerciale PME en une page
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Votre équipe est bonne. Mais est-elle excellente ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le passage de bon à excellent ne se fait pas par hasard. Il demande un diagnostic clair, un cap tenu et une discipline d&apos;exécution. Si vous voulez savoir où votre équipe se situe vraiment, je vous propose deux portes d&apos;entrée concrètes.
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

          {/* Author Card */}
          <div className="my-12">
            <AuthorCard />
            <p className="text-xs text-gray-400 mt-4">
              Ce article s\'appuie sur <em>Good to Great</em> de Jim Collins, recherche menée sur 1 435 entreprises publiées aux Etats-Unis. {' '}<a href="https://www.jimcollins.com/books.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Site officiel de Jim Collins</a>.
            </p>
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
