import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Quinze ans à animer des réunions commerciales — et pourquoi j\'ai fini par tout changer | Laurent Serre',
  description:
    'Des réunions commerciales qui tournent en rond, des équipes qui regardent leurs chaussures. J\'ai testé des formats pendant 15 ans. Voici celui qui tient : 4 blocs, 60 minutes, 80% sur le futur.',
  keywords:
    'réunion commerciale hebdomadaire, animer réunion commerciale, format réunion commerciale, management équipe commerciale, pilotage commercial, rituel équipe commerciale, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/reunion-commerciale-hebdomadaire-format-performance',
  },
  openGraph: {
    title: 'Quinze ans à animer des réunions commerciales — et pourquoi j\'ai fini par tout changer',
    description:
      'Des réunions commerciales qui tournent en rond. Le meilleur format que j\'ai trouvé en 15 ans : 4 blocs, 60 minutes, et une seule question qui compte en sortie.',
    url: 'https://www.laurentserre.com/blog/reunion-commerciale-hebdomadaire-format-performance',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-09-reunion-commerciale-hebdo-hero.webp',
        width: 1536,
        height: 864,
        alt: 'Réunion commerciale — le format pare-brise, pas rétroviseur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quinze ans à animer des réunions commerciales — et pourquoi j\'ai tout changé | Laurent Serre',
    description:
      'Le meilleur format de réunion commerciale que j\'ai trouvé en 15 ans : 4 blocs, 60 minutes, 80% sur le futur.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-09-reunion-commerciale-hebdo-hero.webp'],
  },
};

export default function ArticlePage() {
  const articleUrl = 'https://www.laurentserre.com/blog/reunion-commerciale-hebdomadaire-format-performance';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Quinze ans à animer des réunions commerciales — et pourquoi j\'ai fini par tout changer',
        description:
          'Des réunions qui tournent en rond, des équipes qui regardent leurs chaussures. Le meilleur format que j\'ai trouvé en 15 ans : 4 blocs, 60 minutes, 80% sur le futur.',
        image: 'https://www.laurentserre.com/images/blog/2026-05-09-reunion-commerciale-hebdo-hero.webp',
        datePublished: '2026-05-09',
        dateModified: '2026-05-09',
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
      // HowTo schema — article 010 présente un process en 4 étapes claires
      {
        '@type': 'HowTo',
        name: 'Animer une réunion commerciale hebdomadaire qui sert vraiment votre équipe',
        description:
          'Un format en quatre blocs, soixante minutes, pour passer d\'une réunion rétroviseur à une réunion pare-brise.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Le constat',
            text: 'Dix minutes. Le manager présente les chiffres de la semaine (CA, rendez-vous, affaires engagées) sans commenter les personnes. Objectif : mettre tout le monde sur la même photo factuelle.',
            url: articleUrl + '#constat',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Le partage terrain',
            text: 'Quinze minutes. Chaque commercial raconte une chose concrète de sa semaine : objection non gérée, argument qui a marché, info concurrentielle. Le manager pose des questions, ne critique pas.',
            url: articleUrl + '#partage-terrain',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Décortiquer deux ou trois affaires',
            text: 'Quinze minutes. Le groupe analyse les dossiers qui méritent un regard collectif : grosse opportunité, deal qui stagne, client complexe. Le commercial repart avec des idées à tester.',
            url: articleUrl + '#debrief-affaires',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Les priorités de la semaine',
            text: 'Quinze minutes. Chaque commercial annonce ses trois actions clés. Le manager les note et vérifie la semaine suivante. Crée une responsabilité simple et concrète.',
            url: articleUrl + '#priorites-semaine',
          },
        ],
        totalTime: 'PT60M',
      },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <Link href="/blog" className="hover:text-mint-green transition-colors">
              ← Retour au blog
            </Link>
            <span>•</span>
            <time dateTime="2026-05-09">9 mai 2026</time>
            <span>•</span>
            <span>6 min de lecture</span>
          </div>

          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-mint-green text-white mb-4">
            Management commercial
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-extrabold text-blue-ink leading-tight mb-6">
            Quinze ans à animer des réunions commerciales — et pourquoi j&apos;ai fini par tout changer
          </h1>

          <AuthorCard />
        </header>

        {/* Hero image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12">
          <Image
            src="/images/blog/2026-05-09-reunion-commerciale-hebdo-hero.webp"
            alt="Réunion commerciale — le format qui regarde vers l'avant"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* TL;DR — Ce que vous allez retenir */}
        <div className="mb-10 p-6 rounded-xl bg-mint-green/10 border border-mint-green/20">
          <h2 className="text-lg font-title font-bold text-blue-ink mb-2">🎯 Ce que vous allez retenir</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ <strong>80 % du temps de réunion</strong> doit porter sur le futur, pas sur le rétroviseur</li>
            <li>✅ Un format en <strong>4 blocs</strong> (constat, partage terrain, débrief affaires, priorités) qui tient en 60 minutes</li>
            <li>✅ Le partage terrain est le bloc le plus souvent absent — et le plus important</li>
            <li>✅ Chaque commercial repart avec <strong>3 actions clés</strong> vérifiées la semaine suivante</li>
          </ul>
        </div>

        {/* Sommaire avec ancres */}
        <nav className="mb-10 p-6 rounded-xl bg-blue-ink/5 border border-blue-ink/10">
          <h2 className="text-lg font-title font-bold text-blue-ink mb-3">📋 Sommaire</h2>
          <ul className="space-y-1.5 text-sm">
            <li>
              <a href="#constat" className="text-mint-green hover:underline">1. Le premier bloc : le constat</a>
            </li>
            <li>
              <a href="#partage-terrain" className="text-mint-green hover:underline">2. Le deuxième bloc : le partage terrain</a>
            </li>
            <li>
              <a href="#debrief-affaires" className="text-mint-green hover:underline">3. Le troisième bloc : décortiquer les affaires</a>
            </li>
            <li>
              <a href="#priorites-semaine" className="text-mint-green hover:underline">4. Le quatrième bloc : les priorités de la semaine</a>
            </li>
          </ul>
        </nav>

        {/* Article content */}
        <div className="prose prose-lg max-w-none prose-headings:font-title prose-headings:text-blue-ink prose-a:text-mint-green prose-a:no-underline hover:prose-a:underline prose-strong:text-blue-ink prose-blockquote:border-mint-green prose-blockquote:text-gray-600">
          <p className="lead text-xl text-gray-700 leading-relaxed mb-8 font-medium">
            Je me souviens d&apos;un directeur commercial chez un client. Il passait quarante-cinq minutes à lire des chiffres de la semaine d&apos;avant. Devant son équipe. Les commerciaux regardaient leurs chaussures.
          </p>

          <p>
            À la fin, il a dit : « Bon, il faut faire mieux la semaine prochaine. » Tout le monde a hoché la tête. Et la semaine suivante, exactement la même scène.
          </p>

          <p>
            Je l&apos;ai vu chez des dizaines de clients. Des réunions de pilotage qui ressemblent à des comptes rendus. Des managers fatigués qui parlent tout seuls. Des équipes qui viennent parce qu&apos;il faut venir.
          </p>

          <p>
            J&apos;ai passé quinze ans à animer ces réunions — et à les observer. Voici ce que j&apos;ai fini par comprendre : ce n&apos;est pas ce que vous dites qui compte le plus. C&apos;est le format.
          </p>

          <blockquote>
            <p>Une réunion commerciale, c&apos;est un accélérateur ou un frein. Il n&apos;y a pas de neutre.</p>
          </blockquote>

          <p>
            Quand elle fonctionne, elle aligne, elle motive, elle fait avancer le vrai travail. Quand elle ne fonctionne pas, elle devient un rituel qui coûte une heure par semaine à chaque commercial, sans que rien ne bouge.
          </p>

          <p>
            J&apos;ai testé pas mal de formats. Celui qui tient depuis le plus longtemps tient en quatre blocs — et il dure soixante minutes, pas plus.
          </p>

          <h2 id="constat">Le premier bloc, c&apos;est le constat</h2>
          <p>
            Dix minutes. Les chiffres de la semaine : CA, rendez-vous, affaires engagées. Le manager présente, mais il ne commente pas les personnes. Si un commercial est en retard, on le voit en one-to-one, pas en public. Le but, c&apos;est de mettre tout le monde sur la même photo, factuelle, sans procès.
          </p>

          <h2 id="partage-terrain">Le deuxième bloc, le plus souvent absent : le partage terrain</h2>
          <p>
            Quinze minutes. Chaque commercial raconte une chose concrète de sa semaine. Une objection qu&apos;il n&apos;a pas su gérer. Un argument qui a marché. Une info sur un concurrent. Le manager pose des questions, ne critique pas. Si quelqu&apos;un se fait recadrer parce qu&apos;il partage une difficulté, plus personne ne partagera rien.
          </p>

          <h2 id="debrief-affaires">Le troisième bloc : deux ou trois affaires à décortiquer</h2>
          <p>
            Pas tout le pipeline. Juste celles qui méritent un regard collectif : une grosse opportunité proche de signer, un deal qui stagne depuis trois mois, un client complexe. Quinze minutes. Le commercial décrit. Le groupe propose. Il repart avec une ou deux idées à tester dans la semaine.
          </p>

          <h2 id="priorites-semaine">Le quatrième bloc, le plus sous-estimé : les priorités de la semaine</h2>
          <p>
            Chaque commercial annonce ses trois actions clés. Pas sa to-do list complète. Trois choses qui feront la différence. Le manager les note. La semaine suivante, il commence par vérifier si elles ont été faites. Ça crée une responsabilité simple et concrète.
          </p>

          <p>
            Soixante minutes. Vingt pour cent sur le passé, quatre-vingts sur le futur.
          </p>

          <blockquote>
            <p>La plupart des réunions commerciales sont des réunions de rétroviseur. Les meilleures sont des réunions de pare-brise.</p>
          </blockquote>

          <p>
            J&apos;ai changé mon format il y a plusieurs années, après avoir vu trop d&apos;équipes s&apos;éteindre sous les chiffres. Depuis, je propose ce cadre à mes clients. Ceux qui le tiennent ne reviennent pas en arrière. Pas parce que c&apos;est parfait. Mais parce que la question à la sortie n&apos;est plus « il fait beau sur les chiffres ? ». Elle devient : « Qu&apos;est-ce qu&apos;on fait, concrètement, cette semaine ? »
          </p>

          <p>
            Et c&apos;est la seule question qui compte quand on manage des commerciaux.
          </p>
        </div>

        {/* Pour aller plus loin */}
        <div className="mt-12 p-6 rounded-xl bg-blue-ink/5 border border-blue-ink/10">
          <h2 className="text-xl font-title font-bold text-blue-ink mb-4">📖 Pour aller plus loin</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <Link href="/blog/reunion-commerciale-hebdo-rituel-closing" className="text-mint-green hover:underline font-medium">
                Le rituel de réunion hebdo qui transforme vos commerciaux en closing machines
              </Link>
              <span className="text-gray-500"> — Un autre angle sur le rituel hebdomadaire et son impact direct sur le closing.</span>
            </li>
            <li>
              <Link href="/blog/reunion-30-minutes-proteger-marge-pipeline-avril" className="text-mint-green hover:underline font-medium">
                Réunion 30 minutes : protéger sa marge et reprendre la main sur le pipeline en avril
              </Link>
              <span className="text-gray-500"> — Quand le temps est compté, un format ultra-court pour des décisions rapides.</span>
            </li>
            <li>
              <Link href="/blog/objectifs-commerciaux-comment-en-fixer-qui-motivent-vraiment-vos-equipes" className="text-mint-green hover:underline font-medium">
                Objectifs commerciaux : comment en fixer qui motivent vraiment vos équipes
              </Link>
              <span className="text-gray-500"> — Le prolongement naturel : des objectifs clairs pour donner du sens aux réunions.</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-400">
            Source E-E-A-T : <a href="https://hbr.org/2016/07/how-to-run-a-meeting-that-doesnt-suck" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">How to Run a Meeting That Doesn&apos;t Suck — Harvard Business Review</a>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-mint-green/20">
          <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
            🗓 Vous voulez construire une réunion qui sert vraiment votre équipe ?
          </h3>
          <p className="text-gray-600 mb-6">
            Je peux vous aider à poser le cadre avec un diagnostic commercial personnalisé. En 90 minutes, on identifie ce qui freine votre équipe et on construit un plan d&apos;action concret.
          </p>
          <Link
            href="/diagnostic"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
          >
            Diagnostic gratuit →
          </Link>
        </div>

        {/* Navigation articles */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="text-mint-green hover:text-mint-green/80 transition-colors font-medium"
          >
            ← Tous les articles du blog
          </Link>
        </div>
      </article>

      {/* HubSpot form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
