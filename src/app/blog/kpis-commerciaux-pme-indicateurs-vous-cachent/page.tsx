import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'KPIs commerciaux PME : ce que vos 25 indicateurs vous cachent | Laurent Serre',
  description:
    'Vingt-cinq indicateurs, des graphiques partout, des jolies couleurs. Mais au fond, lequel regardez-vous le lundi matin ? Le problème des KPIs en PME n\'est pas le manque de données, c\'est l\'abondance.',
  keywords:
    'KPIs commerciaux PME, indicateurs commerciaux, pilotage commercial, tableau de bord commercial, pipeline pondéré, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/kpis-commerciaux-pme-indicateurs-vous-cachent',
  },
  other: {
    'dateModified': '2026-05-13',
  },
  openGraph: {
    title: 'KPIs commerciaux PME : ce que vos 25 indicateurs vous cachent',
    description:
      'Un tableau de bord, ce n\'est pas un tableau d\'honneur. C\'est un outil de diagnostic. Et un bon diagnostic, ça se fait avec cinq ou six questions, pas vingt-cinq.',
    url: 'https://www.laurentserre.com/blog/kpis-commerciaux-pme-indicateurs-vous-cachent',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-13-kpis-commerciaux-indicateurs-hero.webp',
        width: 1264,
        height: 848,
        alt: 'KPIs commerciaux PME — ne vous noyez pas dans les indicateurs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KPIs commerciaux PME : ce que vos 25 indicateurs vous cachent | Laurent Serre',
    description:
      'Un tableau de bord, ce n\'est pas un tableau d\'honneur. C\'est un outil de diagnostic. Et un bon diagnostic, ça se fait avec cinq ou six questions, pas vingt-cinq.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-13-kpis-commerciaux-indicateurs-hero.webp'],
  },
};

export default function ArticlePage() {
  const articleUrl = 'https://www.laurentserre.com/blog/kpis-commerciaux-pme-indicateurs-vous-cachent';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'KPIs commerciaux PME : ce que vos 25 indicateurs vous cachent',
        description:
          'Vingt-cinq indicateurs, des graphiques partout, des jolies couleurs. Mais au fond, lequel regardez-vous le lundi matin ?',
        image: 'https://www.laurentserre.com/images/blog/2026-05-13-kpis-commerciaux-indicateurs-hero.webp',
        datePublished: '2026-05-13',
        dateModified: '2026-05-13',
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
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: 'https://www.laurentserre.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://www.laurentserre.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'KPIs commerciaux PME',
            item: articleUrl,
          },
        ],
      },
    ,
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/kpis-commerciaux-pme-indicateurs-vous-cachent#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Les seuls KPIs qui comptent',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dans une PME B2B, il y a trois types d\'indicateurs. Et honnêtement, la plupart des équipes que j\'accompagne n\'ont besoin que de deux par catégorie. Ce qui se passe maintenant — les indicateurs d\'activité. Combien de nouveaux contacts cette semaine. Combien de rendez-vous de découverte. Pas en théorie, en réel. Si le nombre de rendez-vous baisse deux semaines de suite, vous avez un problème aujourd\'hui, pas dans trois mois. Ce qui transforme — les taux de conversion. Rendez-vous → proposition. Pr',
            },
          },
          {
            '@type': 'Question',
            name: 'Ce que je vois sur le terrain',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dans les équipes qui performent, le directeur commercial regarde son tableau de bord trente minutes le vendredi après-midi. Pas trois heures le lundi matin. Il pose deux questions : « Qu\'est-ce qui est en rouge ? » et « Qu\'est-ce qu\'on fait pour le remettre en vert ? » Pas de réunion sur les tendances. Pas de benchmarking interne. Pas de dashboard qui compare Pierre et Paul. Un KPI, ça sert à décider. Pas à décorer. Si vous passez plus de temps à mettre à jour votre tableau de bord qu\'à agir sur',
            },
          }
        ],
      },
],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Fil d'Ariane */}
        <nav className="mb-8 text-sm" aria-label="Fil d'Ariane">
          <Link href="/" className="text-mint-green hover:text-mint-green/80 transition-colors">
            Accueil
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors">
            Blog
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500" aria-current="page">KPIs commerciaux</span>
        </nav>

        {/* Image hero */}
        <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/blog/2026-05-13-kpis-commerciaux-indicateurs-hero.webp"
            alt="KPIs commerciaux PME — ne vous noyez pas dans les indicateurs"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <time dateTime="2026-05-13">13 mai 2026</time>
          <span aria-hidden="true">·</span>
          <span>Pilotage commercial / indicateurs</span>
        </div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          KPIs commerciaux PME : ce que vos 25 indicateurs vous cachent
        </h1>

        {/* Auteur */}
        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial',
            image: '/images/blog/Laurent-Serre-avatar.webp',
          }}
        />

        {/* TL;DR */}
        <div className="mt-8 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
          <p className="text-sm font-semibold text-blue-ink mb-2">À retenir</p>
          <p className="text-gray-700 leading-relaxed">
            Le problème des KPIs en PME, ce n'est pas le manque de données. C'est l'abondance.
            Quand tout est vert, rien n'est vert. Un tableau de bord est un outil de diagnostic —
            pas un tableau d'honneur. Trois types d'indicateurs suffisent : activité, conversion, pipeline.
            Le reste, c'est du bruit.
          </p>
        </div>

        {/* Contenu */}
        <div className="mt-10 prose prose-lg max-w-none prose-a:text-mint-green prose-a:no-underline hover:prose-a:underline prose-strong:text-blue-ink">
          <p>
            J'arrive dans une PME la semaine dernière. Le directeur commercial m'installe devant son écran.
            Vingt-cinq indicateurs. Des graphiques partout. Des jolies couleurs. Un tableau de bord qui a coûté
            trois jours de travail à son assistant commercial.
          </p>

          <p>
            Je regarde.
          </p>

          <p>
            — Lequel vous regardez le lundi matin ?
          </p>

          <p>
            Il réfléchit.
          </p>

          <p>
            — Le pipeline. Et parfois le closing rate.
          </p>

          <p>
            — Et les vingt-trois autres ?
          </p>

          <p>
            Il hausse les épaules.
          </p>

          <p className="font-semibold text-blue-ink text-xl">
            C'est ça, le problème des KPIs en PME. Pas le manque de données. L'abondance.
          </p>

          <p>
            On croit qu'avoir plus d'indicateurs, c'est piloter mieux. En réalité, c'est piloter rien du tout.
            Parce que quand tout est vert, rien n'est vert. Et quand tout clignote, on ne sait pas par où
            commencer.
          </p>

          <p>
            Un tableau de bord, ce n'est pas un tableau d'honneur. Ce n'est pas un écran de contrôle aérien.
            C'est un outil de diagnostic. Et un bon diagnostic, ça se fait avec cinq ou six questions,
            pas vingt-cinq.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les seuls KPIs qui comptent
          </h2>

          <p>
            Dans une PME B2B, il y a trois types d'indicateurs. Et honnêtement, la plupart des équipes
            que j'accompagne n'ont besoin que de deux par catégorie.
          </p>

          <p>
            <strong>Ce qui se passe maintenant</strong> — les indicateurs d'activité. Combien de nouveaux
            contacts cette semaine. Combien de rendez-vous de découverte. Pas en théorie, en réel. Si le
            nombre de rendez-vous baisse deux semaines de suite, vous avez un problème aujourd'hui,
            pas dans trois mois.
          </p>

          <p>
            <strong>Ce qui transforme</strong> — les taux de conversion. Rendez-vous → proposition.
            Proposition → signature. C'est là que se joue la vraie performance. Mais personne ne les calcule
            honnêtement, parce que ça oblige à regarder en face ses faiblesses.
          </p>

          <p>
            <strong>Ce qui arrive</strong> — le pipeline pondéré. C'est le seul indicateur qui mérite
            un écran entier. Parce qu'il vous dit, semaine après semaine, si vous aurez à manger dans 90 jours.
          </p>

          <p>
            Le reste ? C'est du bruit.
          </p>

          {/* Bloc chiffre clé */}
          <div className="not-prose my-10 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-mint-green/20 text-center">
            <p className="text-4xl font-bold text-blue-ink mb-2">30 minutes.</p>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Le temps que passe un directeur commercial qui performe à regarder son tableau de bord le vendredi après-midi. Pas trois heures le lundi matin.
            </p>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que je vois sur le terrain
          </h2>

          <p>
            Dans les équipes qui performent, le directeur commercial regarde son tableau de bord trente minutes
            le vendredi après-midi. Pas trois heures le lundi matin. Il pose deux questions : « Qu'est-ce qui
            est en rouge ? » et « Qu'est-ce qu'on fait pour le remettre en vert ? »
          </p>

          <p>
            Pas de réunion sur les tendances. Pas de benchmarking interne. Pas de dashboard qui compare
            Pierre et Paul.
          </p>

          <p className="font-semibold text-xl text-blue-ink">
            Un KPI, ça sert à décider. Pas à décorer.
          </p>

          <p>
            Si vous passez plus de temps à mettre à jour votre tableau de bord qu'à agir sur ce qu'il vous
            montre, vous n'avez pas un problème d'indicateurs. Vous avez un problème de pilotage.
          </p>

          <p>
            Et ça, aucun KPI ne le mesure.
          </p>
        </div>

        {/* Pour aller plus loin */}
        <div className="mt-12 p-8 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
          <p className="text-lg font-title font-bold text-blue-ink mb-4">📖 Pour aller plus loin</p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-mint-green hover:underline font-medium">
                Pipeline commercial PME : comment construire un outil qui prédit vraiment votre chiffre
              </Link>
              <span className="block text-gray-500 mt-0.5">Le pipeline pondéré, seul indicateur qui mérite un écran entier.</span>
            </li>
            <li>
              <Link href="/blog/reunion-commerciale-hebdomadaire-format-performance" className="text-mint-green hover:underline font-medium">
                Quinze ans à animer des réunions commerciales — et pourquoi j'ai fini par tout changer
              </Link>
              <span className="block text-gray-500 mt-0.5">Le format de réunion qui passe du commentaire à la décision.</span>
            </li>
            <li>
              <Link href="/blog/le-28-du-mois-il-est-trop-tard-pour-sauver-vos-ventes" className="text-mint-green hover:underline font-medium">
                Le 28 du mois, il est trop tard pour sauver vos ventes
              </Link>
              <span className="block text-gray-500 mt-0.5">Ce qui arrive quand on pilote dans l'urgence faute de vrais indicateurs.</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-mint-green/20">
          <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
            🎯 Vous noyez-vous aussi dans vos indicateurs ?
          </h3>
          <p className="text-gray-600 mb-6">
            Je peux vous aider à construire un tableau de bord qui sert vraiment à décider — pas à décorer.
            Commencez par un diagnostic commercial.
          </p>
          <Link
            href="/diagnostic?utm_source=blog&utm_medium=organic&utm_campaign=kpis-commerciaux-pme&utm_content=kpis-indicateurs-vous-cachent"
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
