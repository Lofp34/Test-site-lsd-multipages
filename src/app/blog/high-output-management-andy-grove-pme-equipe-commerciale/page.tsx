import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const slug = 'high-output-management-andy-grove-pme-equipe-commerciale';
const baseUrl = 'https://www.laurentserre.com';

export const metadata: Metadata = {
  title: 'High Output Management : 5 leçons d\'Andy Grove pour la PME',
  description:
    'Les 5 leçons du livre High Output Management d\'Andy Grove appliquées à la gestion d\'une équipe commerciale en PME : réunion, indicateurs, objectifs, management différencié, délégation — par Laurent Serre, 20 ans de terrain.',
  keywords:
    'high output management PME, high output management application pratique, andy grove management équipe commerciale, high output management résumé, management équipe commerciale PME',
  alternates: {
    canonical: `${baseUrl}/blog/${slug}`,
  },
  openGraph: {
    title: 'High Output Management appliqué à la PME : 5 leçons d\'Andy Grove',
    description:
      'Le livre de management le plus utile jamais écrit date de 1983. Voici 5 leçons d\'Andy Grove appliquées au pilotage de votre équipe commerciale en PME.',
    url: `${baseUrl}/blog/${slug}`,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: `${baseUrl}/images/blog/high-output-management-hero.webp`,
        width: 1536,
        height: 1024,
        alt: 'Laurent Serre à son bureau avec le livre High Output Management d\'Andy Grove et un tableau blanc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High Output Management appliqué à la PME : 5 leçons d\'Andy Grove',
    description:
      'Le livre de management le plus utile jamais écrit date de 1983. 5 leçons d\'Andy Grove pour piloter votre équipe commerciale en PME.',
    images: [`${baseUrl}/images/blog/high-output-management-hero.webp`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HighOutputManagementArticle() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">High Output Management</li>
            </ol>
          </nav>

          {/* Capsule catégorie */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Management Commercial
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              High Output Management appliqué à la PME : 5 leçons d'Andy Grove pour piloter votre équipe commerciale
            </h1>

            {/* Infos auteur inline */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32}
                  className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-05-29">29 mai 2026</time>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>

            {/* Hero image */}
            <div className="relative mb-12">
              <Image
                src="/images/blog/high-output-management-hero.webp"
                alt="Laurent Serre à son bureau avec le livre High Output Management d'Andy Grove et un tableau blanc concepts"
                width={1536}
                height={1024}
                className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
                quality={78}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          {/* AuthorCard (haut) */}
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              ✨ Ce que vous allez retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Pourquoi votre réunion d'équipe ne sert à rien, la différence entre activité et résultat que vos commerciaux confondent, comment fixer des objectifs qui alignent sans plomber, pourquoi manager tout le monde pareil nivelle par le bas, et qui doit vraiment prendre les décisions dans votre boîte. Cinq leçons du livre High Output Management d'Andy Grove, appliquées sur le terrain chez des PME françaises.
            </p>
          </div>

          {/* BDCarousel */}
          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link href="/blog/5-signes-structurer-equipe-commerciale" className="text-mint-green hover:underline font-medium">5 signes pour structurer votre équipe</Link></li>
              <li><Link href="/blog/coaching-commercial-terrain-methode-equipe" className="text-mint-green hover:underline font-medium">Coaching commercial terrain</Link></li>
              <li><Link href="/blog/accompagnement-equipes-commerciales-6-leviers-2025" className="text-mint-green hover:underline font-medium">Accompagnement équipes commerciales</Link></li>
            </ul>
          </div>

                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : High Output Management — 5 leçons d'Andy Grove
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L'histoire de Stéphane, dirigeant de PME, racontée en 16 planches BD. De la réunion qui n'en finit pas au déclic grâce aux leçons d'Andy Grove. Idéal à partager avec votre équipe.
            </p>
            <BDCarousel
              images={[
                { src: '/images/blog/hom-carrousel-slide1.webp', alt: "Slide 1 : Aujourd'hui, l'histoire de Stéphane" },
                { src: '/images/blog/hom-carrousel-slide2.webp', alt: 'Slide 2 : Stéphane dirige une PME de 12 personnes' },
                { src: '/images/blog/hom-carrousel-slide3.webp', alt: 'Slide 3 : 1983, un ingénieur hongrois change tout' },
                { src: '/images/blog/hom-carrousel-slide4.webp', alt: "Slide 4 : La réunion d'équipe qui ne sert à rien" },
                { src: '/images/blog/hom-carrousel-slide5.webp', alt: "Slide 5 : Le breakfast meeting d'Andy Grove" },
                { src: '/images/blog/hom-carrousel-slide6.webp', alt: 'Slide 6 : Les 3 questions qui changent tout' },
                { src: '/images/blog/hom-carrousel-slide7.webp', alt: "Slide 7 : Activité ne veut pas dire résultat" },
                { src: '/images/blog/hom-carrousel-slide8.webp', alt: "Slide 8 : L'output indicator qui a tout changé" },
                { src: '/images/blog/hom-carrousel-slide9.webp', alt: 'Slide 9 : Les objectifs ne sont pas des listes de souhaits' },
                { src: '/images/blog/hom-carrousel-slide10.webp', alt: 'Slide 10 : 3 objectifs max, avec 2 résultats clés' },
                { src: '/images/blog/hom-carrousel-slide11.webp', alt: 'Slide 11 : Manager tout le monde pareil nivelle par le bas' },
                { src: '/images/blog/hom-carrousel-slide12.webp', alt: 'Slide 12 : La maturité liée à la tâche' },
                { src: '/images/blog/hom-carrousel-slide13.webp', alt: 'Slide 13 : Laissez les décisions à ceux qui savent' },
                { src: '/images/blog/hom-carrousel-slide14.webp', alt: "Slide 14 : Le cadre stratégique c'est vous, la décision c'est lui" },
                { src: '/images/blog/hom-carrousel-slide15.webp', alt: 'Slide 15 : Stéphane un mois plus tard' },
                { src: '/images/blog/hom-carrousel-slide16.webp', alt: 'Slide 16 : Faites votre diagnostic sur LaurentSerre.com' },
              ]}
              title="High Output Management — 5 leçons d'Andy Grove"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-high-output-management-pme.pdf"
                className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors text-sm font-medium"
                target="_blank"
              >
                📥 Télécharger le PDF (16 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA */}
          <div className="mb-8 text-center">
            <Link href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors">
              🔍 Vos indicateurs sont-ils les bons ? Faites un diagnostic gratuit →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#lecon-1" className="text-mint-green hover:underline">Leçon 1 : Le breakfast meeting — votre réunion d'équipe n'est pas une réunion</a></li>
              <li><a href="#lecon-2" className="text-mint-green hover:underline">Leçon 2 : Les output indicators — l'activité n'est pas le résultat</a></li>
              <li><a href="#lecon-3" className="text-mint-green hover:underline">Leçon 3 : Le management par objectifs (MBO) — 3 max, pas 15</a></li>
              <li><a href="#lecon-4" className="text-mint-green hover:underline">Leçon 4 : La maturité liée à la tâche — arrêtez de manager tout le monde pareil</a></li>
              <li><a href="#lecon-5" className="text-mint-green hover:underline">Leçon 5 : La prise de décision — laissez les décisions à ceux qui savent</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">FAQ : High Output Management en PME</a></li>
            </ul>
          </div>

          {/* Intro */}
          <p className="lead mt-10">
            Je vais vous surprendre : le livre de management le plus utile que j'aie jamais lu a été écrit en 1983 par un ingénieur d'Intel.
          </p>

          <p>
            Pas un gourou du leadership. Pas un consultant paré de concepts. Un ingénieur hongrois qui a transformé une start-up en l'une des plus grandes entreprises technologiques du monde.
          </p>

          <p>
            Andy Grove, CEO d'Intel pendant 11 ans, a écrit <em>High Output Management</em>. Et ce bouquin de plus de 40 ans est, en 2026, le cadre que j'utilise encore le plus souvent quand un dirigeant me demande : « Comment je peux mieux piloter mon équipe commerciale ? »
          </p>

          <p>
            Voici les 5 leçons que j'ai appliquées sur le terrain, chez des PME françaises, avec des résultats concrets.
          </p>

          {/* Leçon 1 */}
          <h2 id="lecon-1" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-4">
            Leçon 1 : Le breakfast meeting — votre réunion d'équipe n'est pas une réunion
          </h2>

          <p>
            Grove organisait des « breakfast meetings ». Des réunions de 45 minutes, le matin, avec un ordre du jour identique chaque semaine. Trois questions :
          </p>

          <ul>
            <li>Qu'est-ce qui s'est bien passé ?</li>
            <li>Qu'est-ce qui aurait pu mieux se passer ?</li>
            <li>Qu'est-ce qu'on fait la semaine prochaine ?</li>
          </ul>

          <p>
            J'ai importé ce format dans une PME de services B2B, 5 commerciaux. Avant, leur réunion hebdomadaire durait 1h30. Chacun racontait sa semaine et on finissait sans décision. Après, 45 minutes chrono, les trois questions, des décisions concrètes notées dans le CRM avant la fin de la séance.
          </p>

          <p>
            Le résultat ne s'est pas fait attendre : le nombre d'affaires bloquées depuis plus de 30 jours a baissé de 40% en 6 semaines. Pas parce qu'ils étaient plus motivés. Parce qu'ils savaient exactement ce qu'ils devaient traiter ensemble, et qu'ils le faisaient dans un format qui ne laissait rien en suspens.
          </p>

          <p>
            Le format compte autant que le contenu. Une réunion qu'on tient depuis 2 ans dans le même cadre, c'est une réunion où l'équipe sait à quoi s'attendre et arrive préparée.
          </p>

          {/* Leçon 2 */}
          <h2 id="lecon-2" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-4">
            Leçon 2 : Les output indicators — l'activité n'est pas le résultat
          </h2>

          <p>
            Grove distingue l'activité de l'output. Un commercial peut passer 80 heures par semaine à prospecter. C'est de l'activité. Si aucun rendez-vous qualifié n'en sort, l'output est nul.
          </p>

          <p>
            Regardez votre pipeline ce matin. Combien d'affaires sont dans la colonne « devis envoyé » depuis trois semaines sans nouvelle ? C'est de l'activité. Le seul output qui compte : les affaires qui avancent vers une décision chez le client.
          </p>

          <p>
            J'ai appliqué ce principe avec un éditeur de logiciels en Occitanie. Leurs commerciaux passaient 60% de leur temps à enchaîner des démos. Résultat : volume de démos impressionnant, taux de closing anémique. On a remplacé l'indicateur « nombre de démos » par « nombre de démos qualifiées » : une démo qui coche 3 critères précis avant d'être programmée. En 3 mois, le taux de conversion démo → signature est passé de 8% à 22%.
          </p>

          <p>
            Leçon : ce que vous mesurez change ce que votre équipe fait. Mesurez l'output, pas l'agitation.
          </p>

          {/* Mid-article CTA */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-10">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-3">
              🚀 Vous voulez déployer ces méthodes avec votre équipe ?
            </h3>
            <p className="text-gray-700 mb-4">
              Le Bootcamp Commercial Intensif vous donne 3 mois de cadre opérationnel pour transformer votre pilotage d'équipe : indicateurs, rituels, objectifs.
            </p>
            <Link href="/bootcamp"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-mint-green to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              Découvrir le Bootcamp →
            </Link>
          </div>

          {/* Leçon 3 */}
          <h2 id="lecon-3" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-4">
            Leçon 3 : Le management par objectifs (MBO) — 3 max, pas 15
          </h2>

          <p>
            Grove a inventé les OKR avant que Google ne les popularise. Mais le vrai sujet, ce n'est pas le format à la mode. C'est la question que Grove pose : « Que voulez-vous accomplir, et comment saurez-vous que c'est fait ? »
          </p>

          <p>
            En PME, je vois trop d'objectifs qui sont des listes de souhaits sans réalité. « Augmenter le CA de 20% » : c'est un rêve, pas un objectif. Le résultat clé qui prouve qu'on est en train d'y arriver, c'est quoi ? Le nombre de rendez-vous par semaine ? Le taux de transformation ? La durée moyenne du cycle de vente ?
          </p>

          <p>
            La règle de Grove : 3 objectifs max. Avec 2 résultats clés chacun. Et une revue mensuelle, pas trimestrielle. Parce que si vous attendez 3 mois pour corriger le cap, vous avez déjà perdu un trimestre.
          </p>

          <p>
            Dans une PME industrielle que j'accompagne, on a réduit de 15 à 4 le nombre d'objectifs pour l'équipe commerciale. Résultat : les commerciaux savaient enfin sur quoi se concentrer. Le CA du semestre a augmenté de 18% sans recrutement.
          </p>

          {/* Leçon 4 */}
          <h2 id="lecon-4" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-4">
            Leçon 4 : La maturité liée à la tâche — arrêtez de manager tout le monde pareil
          </h2>

          <p>
            Grove a introduit un concept que je trouve sous-estimé : le niveau de maturité d'un commercial dépend de la tâche, pas de la personne. Un commercial peut être excellent en closing et nul en qualification. Ça ne fait pas de lui un mauvais commercial. Ça veut dire que vous devez l'accompagner différemment sur la qualification.
          </p>

          <p>
            Le manager qui traite tout le monde pareil nivelle par le bas. Le nouveau a besoin de cadre serré : un script, des critères de validation, un debrief après chaque appel important. L'ancien a besoin d'autonomie et de challenges : des objectifs plus hauts, des responsabilités de mentor, un regard sur la stratégie.
          </p>

          <p>
            Concrètement : votre one-to-one ne doit pas avoir le même format avec votre commercial de 3 mois et avec celui de 5 ans. Adaptez votre regard.
          </p>

          <p>
            J'ai vu un dirco passer 2 mois à coacher son commercial le plus expérimenté comme un junior. Au bout de 8 semaines, le commercial avait perdu toute autonomie et attendait les instructions pour chaque décision. Le dirco s'énervait de ne pas voir de résultat. Ce n'était pas un problème de commercial. C'était un problème de management indifférencié.
          </p>

          {/* Leçon 5 */}
          <h2 id="lecon-5" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-4">
            Leçon 5 : La prise de décision — laissez les décisions à ceux qui savent
          </h2>

          <p>
            Grove dit : « Le débat doit être le plus libre possible, la décision la plus ferme possible. »
          </p>

          <p>
            En PME, c'est l'inverse qu'on voit. Le dirigeant ou le dirco centralise tout, ralentit tout, puis s'étonne que son équipe n'avance pas. Les commerciaux passent leur temps à attendre une validation sur des sujets qu'ils maîtrisent mieux que leur manager.
          </p>

          <p>
            La règle de Grove : une décision doit être prise par la personne qui a la meilleure connaissance du sujet, pas par celle qui a le plus haut titre.
          </p>

          <p>
            Un commercial connaît son client mieux que son dirco. À vous de fixer le cadre stratégique. À lui de décider comment il gère la relation, quel argument il sort en premier, comment il temporise. Si votre commercial doit vous demander l'autorisation pour ajuster un délai, vous avez un problème de délégation, pas un problème de process.
          </p>

          <p>
            La seule question à vous poser : est-ce que mon équipe peut prendre 80% des décisions commerciales sans moi ? Si la réponse est non, vous êtes le goulot d'étranglement.
          </p>

          {/* FAQ */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            FAQ : High Output Management en PME
          </h2>

          <div className="space-y-6">
            <div>
              <p className="font-bold text-blue-ink mb-1">1. High Output Management est-il encore pertinent en 2026 ?</p>
              <p className="text-gray-700">Oui, plus que jamais. Les concepts de Grove (output indicators, one-to-one structurés, OKR) sont devenus des standards parce qu'ils marchent, pas parce qu'ils sont récents. Le livre a 40 ans, mais les problèmes de management qu'il traite n'ont pas changé.</p>
            </div>
            <div>
              <p className="font-bold text-blue-ink mb-1">2. Par quoi commencer si je n'ai pas le temps de lire tout le livre ?</p>
              <p className="text-gray-700">Les leçons 2 et 3 de cet article : output indicators et objectifs. Ce sont les deux leviers qui transforment le plus vite un pilotage commercial en PME. Le chapitre 2 sur la production managériale est le cœur de la pensée Grove.</p>
            </div>
            <div>
              <p className="font-bold text-blue-ink mb-1">3. Les OKR de Grove sont-ils les mêmes que ceux de Google ?</p>
              <p className="text-gray-700">Oui. Google a directement repris le framework de Grove. Mais Grove insiste davantage sur la revue mensuelle que sur la simple fixation d'objectifs. Le suivi compte autant que la définition.</p>
            </div>
            <div>
              <p className="font-bold text-blue-ink mb-1">4. Le breakfast meeting, c'est pour les grandes structures ou ça marche en PME ?</p>
              <p className="text-gray-700">Ça marche mieux en PME. Moins de monde, donc plus de temps pour creuser les vrais sujets. J'ai vu des équipes de 4 commerciaux doubler l'efficacité de leur réunion hebdomadaire en adoptant ce format.</p>
            </div>
            <div>
              <p className="font-bold text-blue-ink mb-1">5. Combien de temps pour voir les premiers effets de ces leçons ?</p>
              <p className="text-gray-700">Comptez 4 à 6 semaines pour les deux premières leçons (réunion + indicateurs). Les objectifs et la délégation prennent plutôt un trimestre. La maturité liée à la tâche, c'est du long terme : vous la verrez dans la qualité des one-to-one.</p>
            </div>
            <div>
              <p className="font-bold text-blue-ink mb-1">6. Quel chapitre lire en priorité si je n'en lis qu'un ?</p>
              <p className="text-gray-700">Le chapitre 2 : « La production managériale ». C'est l'ADN du livre. Grove pose que tout ce qu'un manager fait doit être mesuré à l'output de son équipe, pas à son activité personnelle. Cette seule idée change la façon dont on regarde son rôle.</p>
            </div>
          </div>

          {/* FAQPage JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'High Output Management est-il encore pertinent en 2026 ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Oui, plus que jamais. Les concepts de Grove (output indicators, one-to-one structurés, OKR) sont devenus des standards parce qu\'ils marchent, pas parce qu\'ils sont récents. Le livre a 40 ans, mais les problèmes de management qu\'il traite n\'ont pas changé.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Par quoi commencer si je n\'ai pas le temps de lire tout le livre ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Les leçons 2 et 3 de cet article : output indicators et objectifs. Ce sont les deux leviers qui transforment le plus vite un pilotage commercial en PME. Le chapitre 2 sur la production managériale est le cœur de la pensée Grove.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Les OKR de Grove sont-ils les mêmes que ceux de Google ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Oui. Google a directement repris le framework de Grove. Mais Grove insiste davantage sur la revue mensuelle que sur la simple fixation d\'objectifs. Le suivi compte autant que la définition.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Le breakfast meeting, c\'est pour les grandes structures ou ça marche en PME ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Ça marche mieux en PME. Moins de monde, donc plus de temps pour creuser les vrais sujets.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Combien de temps pour voir les premiers effets de ces leçons ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Comptez 4 à 6 semaines pour les deux premières leçons (réunion + indicateurs). Les objectifs et la délégation prennent plutôt un trimestre. La maturité liée à la tâche, c\'est du long terme.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Quel chapitre lire en priorité si je n\'en lis qu\'un ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Le chapitre 2 : « La production managériale ». C\'est l\'ADN du livre. Grove pose que tout ce qu\'un manager fait doit être mesuré à l\'output de son équipe.',
                    },
                  },
                ],
              }),
            }}
          />

          {/* BreadcrumbList JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
                  { '@type': 'ListItem', 'position': 3, 'name': "High Output Management appliqué à la PME", 'item': 'https://www.laurentserre.com/blog/high-output-management-andy-grove-pme-equipe-commerciale' },
                ],
              }),
            }}
          />

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/reunion-commerciale-hebdo-rituel-closing" className="text-mint-green hover:underline font-medium">Réunion commerciale hebdomadaire : le rituel qui fait remonter le closing</Link>
                <span className="text-gray-500">{' '}: le format de réunion inspiré de Grove, appliqué au terrain PME</span>
              </li>
              <li>
                <Link href="/blog/objectifs-commerciaux-comment-en-fixer-qui-motivent-vraiment-vos-equipes" className="text-mint-green hover:underline font-medium">Objectifs commerciaux : comment en fixer qui motivent vraiment vos équipes</Link>
                <span className="text-gray-500">{' '}: la méthode pour construire des OKR qui tiennent dans la vraie vie</span>
              </li>
              <li>
                <Link href="/ressources/meilleurs-livres/sales-management/high-output-management" className="text-mint-green hover:underline font-medium">La page ressource High Output Management</Link>
                <span className="text-gray-500">{' '}: résumé complet, avis terrain et livres complémentaires</span>
              </li>
            </ul>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            Un livre écrit il y a 40 ans par un ingénieur d'Intel est peut-être ce qui manque à votre pilotage d'équipe cette année. La question n'est pas de savoir si les leçons sont encore actuelles — elles le sont. La question, c'est : par laquelle vous allez commencer lundi ?
          </p>

          {/* CTA gradient */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Et si vous mettiez ces leçons en pratique dès cette semaine ?</h3>
            <p className="mb-6">
              Je vous propose un diagnostic commercial gratuit de 45 minutes. On regarde ensemble vos indicateurs, votre réunion hebdomadaire et la structure de vos objectifs. Pas de vente, juste un regard extérieur — et des pistes concrètes pour commencer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Découvrir le Bootcamp commercial
              </Link>
            </div>
          </div>
        </div>

        {/* AuthorCard (bas) */}
        <div className="mt-10 pt-6 border-t border-gray-200 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuthorCard />
        </div>
      </article>

      {/* HubSpotForm */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d'en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre situation mérite un échange direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>

      {/* Lien retour blog */}
      <section className="py-8 bg-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors font-medium">
            ← Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
