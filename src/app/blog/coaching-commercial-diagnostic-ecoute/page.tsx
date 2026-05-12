import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Ce n\'est pas un problème de motivation — c\'est un problème de diagnostic | Laurent Serre',
  description:
    'Le coaching commercial ne commence pas par un plan. Il commence par une conversation. Avant de préparer votre diagnostic, allez écouter votre commercial.',
  keywords:
    'coaching commercial, diagnostic commercial, management équipe commerciale, sous-performance commerciale, accompagnement commercial, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/coaching-commercial-diagnostic-ecoute',
  },
  other: {
    'dateModified': '2026-05-12',
  },
  openGraph: {
    title: 'Ce n\'est pas un problème de motivation — c\'est un problème de diagnostic',
    description:
      'Un manager qui veut « réparer » avant d\'écouter. Un diagnostic posé sur un tableau Excel, pas sur une conversation. Le coaching commercial, c\'est d\'abord un exercice d\'écoute.',
    url: 'https://www.laurentserre.com/blog/coaching-commercial-diagnostic-ecoute',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-12-coaching-commercial-hero.jpg',
        width: 2048,
        height: 1152,
        alt: 'Coaching commercial — l\'écoute avant le diagnostic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ce n\'est pas un problème de motivation — c\'est un problème de diagnostic | Laurent Serre',
    description:
      'Un manager qui veut « réparer » avant d\'écouter. Un diagnostic posé sur un tableau Excel, pas sur une conversation. Le coaching commercial, c\'est d\'abord un exercice d\'écoute.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-12-coaching-commercial-hero.jpg'],
  },
};

export default function ArticlePage() {
  const articleUrl = 'https://www.laurentserre.com/blog/coaching-commercial-diagnostic-ecoute';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Ce n\'est pas un problème de motivation — c\'est un problème de diagnostic',
        description:
          'Le coaching commercial ne commence pas par un plan. Il commence par une conversation. Avant de préparer votre diagnostic, allez écouter votre commercial.',
        image: 'https://www.laurentserre.com/images/blog/2026-05-12-coaching-commercial-hero.jpg',
        datePublished: '2026-05-12',
        dateModified: '2026-05-12',
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
        <nav className="mb-8 text-sm">
          <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors">
            Blog
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500">Coaching commercial</span>
        </nav>

        {/* Image hero */}
        <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/blog/2026-05-12-coaching-commercial-hero.jpg"
            alt="Coaching commercial — l'écoute avant le diagnostic"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <time dateTime="2026-05-12">12 mai 2026</time>
          <span aria-hidden="true">·</span>
          <span>Management / coaching commercial</span>
        </div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          Ce n'est pas un problème de motivation — c'est un problème de diagnostic
        </h1>

        {/* Auteur */}
        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial',
            image: '/images/blog/Laurent-Serre-avatar.jpg',
          }}
        />

        {/* TL;DR */}
        <div className="mt-8 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
          <p className="text-sm font-semibold text-blue-ink mb-2">À retenir</p>
          <p className="text-gray-700 leading-relaxed">
            La sous-performance commerciale a quatre causes possibles. Une seule d'entre elles est un
            vrai problème de motivation. Pourtant, la plupart des managers atterrissent directement sur
            cette case. Avant de préparer un plan, prenez le temps de la conversation. Posez des
            questions ouvertes. Taisez-vous après les avoir posées.
          </p>
        </div>

        {/* Sommaire */}
        <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Sommaire</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#causes" className="text-mint-green hover:underline">
                Les quatre causes de sous-performance commerciale
              </a>
            </li>
            <li>
              <a href="#vrai-coaching" className="text-mint-green hover:underline">
                Ça donne quoi, un vrai coaching ?
              </a>
            </li>
            <li>
              <a href="#appris" className="text-mint-green hover:underline">
                Ce que j'ai appris en vingt ans
              </a>
            </li>
          </ul>
        </div>

        {/* Contenu */}
        <div className="mt-10 prose prose-lg max-w-none prose-a:text-mint-green prose-a:no-underline hover:prose-a:underline prose-strong:text-blue-ink">
          <p>
            Je me souviens d'un dirco qui m'a dit un jour : « Je sais ce qu'il lui faut. De la
            discipline. Je vais lui mettre un plan d'action. »
          </p>

          <p>
            Il n'avait pas encore parlé au commercial concerné. Il avait regardé les chiffres, décidé du
            diagnostic, et préparé des actions de prospection directes. Le commercial est arrivé dans la
            réunion. Le manager a ouvert son plan. Et le commercial a dit : « En fait, depuis deux mois,
            mon secteur a perdu trois clients historiques à cause d'une fusion. Personne ne m'a demandé
            ce qui se passait. »
          </p>

          <p>
            J'ai vu cette scène des dizaines de fois. Un manager qui veut « réparer » avant d'écouter.
            Un diagnostic posé sur un tableau Excel, pas sur une conversation. Et un plan qui ne tient
            pas parce qu'il répond à un problème qui n'est pas le bon.
          </p>

          <p className="font-semibold text-blue-ink text-xl">
            Le coaching commercial, c'est d'abord un exercice d'écoute. Pas un exercice de prescription.
          </p>

          <h2 id="causes" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les quatre causes de sous-performance commerciale
          </h2>

          <p>
            Dans mon expérience, la sous-performance commerciale a quatre causes possibles. Et une seule
            d'entre elles est vraiment fréquente dans ce qu'on appelle un « problème de motivation ».
          </p>

          <p>
            <strong>La première</strong>, c'est un manque de compétence : le commercial ne sait pas
            faire. Il faut le former.
          </p>

          <p>
            <strong>La deuxième</strong>, c'est un manque de méthode : il sait faire mais n'applique pas
            de façon systématique. Il faut structurer.
          </p>

          <p>
            <strong>La troisième</strong>, c'est un problème de contexte : marché qui change, portefeuille
            qui se dégrade, situation personnelle. Il faut comprendre avant d'agir.
          </p>

          <p>
            <strong>Et la quatrième seulement</strong>, c'est un vrai problème de motivation au sens où
            on l'entend.
          </p>

          <p>
            Le problème, c'est que la plupart des managers atterrissent directement sur la case
            « motivation » sans passer par les autres. Parce que c'est la plus simple à formuler. « Il
            n'a pas la flamme. » « Il s'en fiche. » Mais c'est rarement vrai, et quand c'est vrai,
            c'est rarement la cause première.
          </p>

          <h2 id="vrai-coaching" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Alors concrètement, ça donne quoi, un vrai coaching ?
          </h2>

          <p>
            Un point par semaine pendant six semaines. Pas un plan en douze actions. Pas un suivi
            quotidien. Un seul levier travaillé, choisi ensemble.
          </p>

          <p>
            <strong>Les deux premières semaines</strong>, vous n'êtes même pas sur le terrain avec lui.
            Vous préparez le bon diagnostic.
          </p>

          <p>
            <strong>Les deux semaines suivantes</strong>, vous l'accompagnez sur deux ou trois rendez-vous.
            Vous observez. Vous ne prenez pas le relais. Ensuite, vous debriefez avec une règle simple :
            une chose qui a bien fonctionné, une chose à améliorer, une action pour la prochaine fois.
          </p>

          <p>
            <strong>Les deux dernières semaines</strong>, vous faites le point. Est-ce que ça a changé
            quelque chose ? Est-ce que c'est le bon levier ? Est-ce qu'il faut changer d'angle ?
          </p>

          {/* Bloc chiffre clé */}
          <div className="not-prose my-10 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-mint-green/20 text-center">
            <p className="text-4xl font-bold text-blue-ink mb-2">6 semaines. 1 levier.</p>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Un point par semaine. Un seul levier travaillé, choisi ensemble. Pas un plan en douze actions.
              Pas un suivi quotidien.
            </p>
          </div>

          <h2 id="appris" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que j'ai appris en vingt ans de management commercial
          </h2>

          <p>
            Le coaching est un investissement incroyablement rentable — à condition de ne pas se tromper
            de diagnostic.
          </p>

          <p>
            Prenez le temps de la première conversation. Posez des questions ouvertes. Taisez-vous après
            les avoir posées.
          </p>

          <p>
            Et si vous avez un commercial qui stagne depuis trois mois, ne préparez pas son plan de
            coaching tout seul dans votre bureau.
          </p>

          <p className="font-semibold text-xl text-blue-ink">
            Allez le voir. Demandez-lui ce qui se passe. Vous serez surpris de ce que vous apprendrez.
          </p>
        </div>

        {/* Pour aller plus loin */}
        <div className="mt-12 p-8 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
          <p className="text-lg font-title font-bold text-blue-ink mb-4">📖 Pour aller plus loin</p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <Link href="/blog/reunion-commerciale-hebdomadaire-format-performance" className="text-mint-green hover:underline font-medium">
                Quinze ans à animer des réunions commerciales — et pourquoi j'ai fini par tout changer
              </Link>
              <span className="block text-gray-500 mt-0.5">Le format de réunion qui fait monter l'équipe, pas le reporting.</span>
            </li>
            <li>
              <Link href="/blog/pourquoi-un-manager-commercial-reprend-trop-souvent-les-rendez-vous-a-la-place-de-lequipe" className="text-mint-green hover:underline font-medium">
                Manager commercial : à force de sauver les rendez-vous, vous affaiblissez l'équipe
              </Link>
              <span className="block text-gray-500 mt-0.5">Quand le manager reprend la main au lieu d'accompagner.</span>
            </li>
            <li>
              <Link href="/blog/pourquoi-la-motivation-ne-regle-presque-jamais-le-probleme-commercial" className="text-mint-green hover:underline font-medium">
                Le vrai problème de votre équipe n'est presque jamais la motivation
              </Link>
              <span className="block text-gray-500 mt-0.5">L'article complémentaire sur ce qui bloque vraiment les équipes.</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-mint-green/20">
          <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
            🎯 Vous avez un commercial qui stagne ?
          </h3>
          <p className="text-gray-600 mb-6">
            Je peux vous aider à comprendre ce qui se passe vraiment dans votre équipe — avant de
            construire un plan qui ne tient pas. Commencez par un diagnostic commercial.
          </p>
          <Link
            href="/diagnostic?utm_source=blog&utm_medium=organic&utm_campaign=coaching-commercial&utm_content=coaching-diagnostic-ecoute"
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
