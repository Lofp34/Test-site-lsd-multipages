import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: "Stratégie commerciale PME : un cadre qui tient sur une page",
  description:
    '47 slides, budget, SWOT, objectifs à 3 ans. Puis quatre questions qu\'il ne peut pas honorer. Le vrai problème des PME n\'est pas l\'absence de stratégie : c\'est l\'incapacité à choisir.',
  keywords:
    'stratégie commerciale PME, plan stratégique, cadre commercial, pilotage PME, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/strategie-commerciale-pme-cadre-une-page',
  },
  other: {
    dateModified: '2026-05-14',
  },
  openGraph: {
    title: "Vous n'avez pas besoin d'un plan stratégique. Vous avez besoin d'un cadre qui tient dans une page.",
    description:
      'Un cadre qui tient sur une page vaut mieux que 47 slides que personne ne relit. Quatre questions, dans l\'ordre, pour choisir ce qui compte vraiment.',
    url: 'https://www.laurentserre.com/blog/strategie-commerciale-pme-cadre-une-page',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-14-strategie-commerciale-pme-cadre-hero.webp',
        width: 1200,
        height: 800,
        alt: 'Stratégie commerciale PME — un cadre qui tient sur une page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Stratégie commerciale PME : un cadre qui tient sur une page",
    description:
      'Un cadre qui tient sur une page vaut mieux que 47 slides que personne ne relit. Quatre questions, dans l\'ordre, pour choisir ce qui compte vraiment.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-14-strategie-commerciale-pme-cadre-hero.webp'],
  },
};

export default function ArticlePage() {
  const articleUrl = 'https://www.laurentserre.com/blog/strategie-commerciale-pme-cadre-une-page';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: "Vous n'avez pas besoin d'un plan stratégique. Vous avez besoin d'un cadre qui tient dans une page.",
        description:
          '47 slides, budget, SWOT, objectifs à 3 ans. Puis quatre questions qu\'il ne peut pas honorer. Le vrai problème des PME n\'est pas l\'absence de stratégie : c\'est l\'incapacité à choisir.',
        image: 'https://www.laurentserre.com/images/blog/2026-05-14-strategie-commerciale-pme-cadre-hero.webp',
        datePublished: '2026-05-14',
        dateModified: '2026-05-14',
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
        '@type': 'HowTo',
        name: 'Construire un cadre commercial qui tient sur une page',
        description: '4 questions pour passer d\'un plan stratégique de 47 slides à un cadre opérationnel qui pilote vraiment votre PME.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Identifier précisément à qui vous vendez',
            text: 'Définissez les trois secteurs précis où vous gagnez le plus, la taille d\'entreprise où vous êtes rentable, et le problème déclencheur qui fait qu\'ils vous appellent. Sans ça, vous passez la moitié de votre temps à qualifier des prospects qui ne valent pas le coup.',
          },
          {
            '@type': 'HowToStep',
            name: 'Définir votre vraie différence',
            text: 'Interrogez vos trois meilleurs clients : "Pourquoi vous restez ?" La réponse n\'est pas "on est réactifs" mais quelque chose d\'ancré dans une vraie spécificité de votre entreprise.',
          },
          {
            '@type': 'HowToStep',
            name: 'Choisir un seul canal pour le trimestre',
            text: 'Un seul nouveau canal par trimestre. Pas trois. Maîtrisez-le avant d\'en ajouter un second. La dispersion tue les PME plus sûrement que la concurrence.',
          },
          {
            '@type': 'HowToStep',
            name: 'Calculer le volume nécessaire par mois',
            text: 'Combien de rendez-vous pour une proposition, combien de propositions pour un client, combien de clients pour votre objectif de CA. Si vous ne pouvez pas faire ce calcul en 30 secondes, vous n\'avez pas un plan — vous avez un espoir.',
          },
        ],
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
            name: 'Stratégie commerciale PME',
            item: articleUrl,
          },
        ],
      },
    ,
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/strategie-commerciale-pme-cadre-une-page#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: '1. À qui tu vends ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pas "aux PME du BTP." Les trois secteurs précis où tu gagnes le plus, la taille d\'entreprise où tu es rentable, le problème déclencheur qui fait qu\'ils t\'appellent. Si tu n\'as pas ça en tête, tu passes la moitié de ton temps à qualifier des prospects qui ne valent pas le coup.',
            },
          },
          {
            '@type': 'Question',
            name: '2. Qu\'est-ce que tu leur apportes de vraiment différent ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La réponse n\'est pas "on est réactifs." C\'est la réponse que personne d\'autre ne peut donner parce qu\'elle est ancrée dans une vraie spécificité de ton entreprise. Pour la trouver, pose la question à tes trois meilleurs clients : "Pourquoi vous restez ?"',
            },
          },
          {
            '@type': 'Question',
            name: '3. Par quel canal tu les cherches ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un seul nouveau canal ce trimestre. Pas trois. Un seul, que tu maîtrises avant d\'en ajouter un second. La dispersion tue les PME plus sûrement que la concurrence.',
            },
          },
          {
            '@type': 'Question',
            name: '4. Combien tu dois en convaincre par mois ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'C\'est le calcul le plus utile que tu puisses faire avec ton équipe : combien de rdv pour une proposition, combien de propositions pour un client, combien de clients pour ton objectif de CA. Si tu ne peux pas faire ce calcul en 30 secondes, tu n\'as pas un plan — tu as un espoir. 3 heures. Le temps qu\'un dirigeant a mis à répondre aux deux premières questions. Pas parce qu\'il ne sait pas — parce qu\'il n\'a jamais pris le temps de choisir. 📖 Pour aller plus loin KPIs commerciaux PME : ce que vos 25 ',
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
          <span className="text-gray-500" aria-current="page">Stratégie commerciale</span>
        </nav>

        {/* Image hero */}
        <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/blog/2026-05-14-strategie-commerciale-pme-cadre-hero.webp"
            alt="Stratégie commerciale PME — un cadre qui tient sur une page"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <time dateTime="2026-05-14">14 mai 2026</time>
          <span aria-hidden="true">·</span>
          <span>Stratégie commerciale</span>
        </div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          Vous n'avez pas besoin d'un plan stratégique. Vous avez besoin d'un cadre qui tient dans une page.
        </h1>

        {/* Auteur */}
        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial',
            image: '/images/blog/Laurent-Serre-avatar.webp',
          }}
        />

        {/* Sommaire */}
        <nav className="mb-10" aria-label="Sommaire">
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">📋 Au sommaire</p>
            <ol className="space-y-2 text-sm">
              <li><a href="#a-qui-tu-vends" className="text-blue-ink hover:text-mint-green transition-colors">1. À qui tu vends ?</a></li>
              <li><a href="#vraie-difference" className="text-blue-ink hover:text-mint-green transition-colors">2. Qu&apos;est-ce que tu leur apportes de vraiment différent ?</a></li>
              <li><a href="#canal-unique" className="text-blue-ink hover:text-mint-green transition-colors">3. Par quel canal tu les cherches ?</a></li>
              <li><a href="#volume-mensuel" className="text-blue-ink hover:text-mint-green transition-colors">4. Combien tu dois en convaincre par mois ?</a></li>
            </ol>
          </div>
        </nav>

        {/* TL;DR */}
        <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
          <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">🎯 Ce que vous allez retenir</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>Un cadre de 4 questions</strong> remplace 47 slides de plan stratégique que personne ne relit.</li>
            <li><strong>Choisir, c&apos;est renoncer</strong> — le vrai problème des PME n&apos;est pas l&apos;absence de stratégie, c&apos;est l&apos;incapacité à choisir.</li>
            <li><strong>4 questions dans l&apos;ordre</strong> : cible, différenciation, canal, volume. Si vous ne pouvez pas y répondre, vous n&apos;avez pas un plan — vous avez un espoir.</li>
          </ul>
        </div>

        {/* Contenu */}
        <div className="mt-10 prose prose-lg max-w-none prose-a:text-mint-green prose-a:no-underline hover:prose-a:underline prose-strong:text-blue-ink">
          <p>
            — Alors Laurent, tu veux voir mon plan stratégique ?
          </p>

          <p>
            Il ouvre son laptop, fier. 47 slides. Budget, organigramme cible, matrice SWOT, objectifs à 3 ans. Un beau document.
          </p>

          <p>
            — Tu vas jeter les 45 premières pages, je lui dis.
          </p>

          <p>
            Il me regarde comme si j'avais insulté sa mère.
          </p>

          <p>
            — Les deux qui restent, c'est celles où tu réponds à quatre questions. À qui tu vends exactement ? Qu'est-ce que tu leur apportes que personne d'autre ne peut apporter ? Par quel canal tu vas les chercher ? Et combien tu dois en convaincre chaque mois pour que ton chiffre tienne ?
          </p>

          <p>
            Il a mis trois heures à répondre aux deux premières.
          </p>

          <p className="font-semibold text-blue-ink text-xl">
            C'est ça, le vrai problème des PME. Pas l'absence de stratégie. L'incapacité à choisir.
          </p>

          <p>
            Parce que choisir, ça veut dire renoncer. Renoncer à ce prospect qui n'est pas tout à fait ton client idéal mais qui pourrait rapporter. Renoncer à ce canal où tu n'es pas encore bon mais qui fait rêver. Renoncer à ce service annexe que tu défends parce que "c'est historique."
          </p>

          <p>
            Et un dirigeant de PME, il déteste renoncer. Il s'est construit en disant oui à tout.
          </p>

          <p className="font-semibold text-xl text-blue-ink">
            Alors voici ce que j'ai appris en accompagnant des dizaines de PME : un cadre qui tient sur une page vaut mieux que 47 slides que personne ne relit.
          </p>

          <p>
            Le cadre, il est simple. Il répond à quatre questions, dans l'ordre.
          </p>

          <h2 id="a-qui-tu-vends" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            1. À qui tu vends ?
          </h2>

          <p>
            Pas "aux PME du BTP." Les trois secteurs précis où tu gagnes le plus, la taille d'entreprise où tu es rentable, le problème déclencheur qui fait qu'ils t'appellent. Si tu n'as pas ça en tête, tu passes la moitié de ton temps à qualifier des prospects qui ne valent pas le coup.
          </p>

          <h2 id="vraie-difference" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            2. Qu'est-ce que tu leur apportes de vraiment différent ?
          </h2>

          <p>
            La réponse n'est pas "on est réactifs." C'est la réponse que personne d'autre ne peut donner parce qu'elle est ancrée dans une vraie spécificité de ton entreprise. Pour la trouver, pose la question à tes trois meilleurs clients : "Pourquoi vous restez ?"
          </p>

          <h2 id="canal-unique" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            3. Par quel canal tu les cherches ?
          </h2>

          <p>
            Un seul nouveau canal ce trimestre. Pas trois. Un seul, que tu maîtrises avant d'en ajouter un second. La dispersion tue les PME plus sûrement que la concurrence.
          </p>

          <h2 id="volume-mensuel" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            4. Combien tu dois en convaincre par mois ?
          </h2>

          <p>
            C'est le calcul le plus utile que tu puisses faire avec ton équipe : combien de rdv pour une proposition, combien de propositions pour un client, combien de clients pour ton objectif de CA. Si tu ne peux pas faire ce calcul en 30 secondes, tu n'as pas un plan — tu as un espoir.
          </p>

          {/* Bloc chiffre clé */}
          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link href="/blog/developpement-commercial-pme-plan-action-5-etapes" className="text-mint-green hover:underline font-medium">Plan d'action développement commercial en 5 étapes</Link></li>
              <li><Link href="/blog/coaching-developpement-commercial-guide-complet-pme" className="text-mint-green hover:underline font-medium">Guide complet du développement commercial PME</Link></li>
              <li><Link href="/blog/erreurs-developpement-commercial-pme" className="text-mint-green hover:underline font-medium">Les 6 erreurs du développement commercial PME</Link></li>
            </ul>
          </div>

                    <div className="not-prose my-10 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-mint-green/20 text-center">
            <p className="text-4xl font-bold text-blue-ink mb-2">3 heures.</p>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Le temps qu'un dirigeant a mis à répondre aux deux premières questions. Pas parce qu'il ne sait pas — parce qu'il n'a jamais pris le temps de choisir.
            </p>
          </div>
        </div>

        {/* Pour aller plus loin */}
        <div className="mt-12 p-8 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
          <p className="text-lg font-title font-bold text-blue-ink mb-4">📖 Pour aller plus loin</p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <Link href="/blog/kpis-commerciaux-pme-indicateurs-vous-cachent" className="text-mint-green hover:underline font-medium">
                KPIs commerciaux PME : ce que vos 25 indicateurs vous cachent
              </Link>
              <span className="block text-gray-500 mt-0.5">Pour répondre à la question n°4 — le calcul de volume qui transforme un espoir en plan.</span>
            </li>
            <li>
              <Link href="/blog/prospection-telephonique-b2b-verite-terrain" className="text-mint-green hover:underline font-medium">
                Prospection téléphonique B2B : la vérité du terrain
              </Link>
              <span className="block text-gray-500 mt-0.5">Quand le canal choisi est le téléphone — comment tenir le rythme sans s'épuiser.</span>
            </li>
            <li>
              <Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-mint-green hover:underline font-medium">
                Pipeline commercial PME : comment construire un outil qui prédit vraiment votre chiffre
              </Link>
              <span className="block text-gray-500 mt-0.5">Quand on a les quatre réponses, le pipeline devient un vrai outil de pilotage — pas une formalité.</span>
            </li>
          </ul>

          {/* E-E-A-T note */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <p className="text-xs text-gray-500 leading-relaxed">
              Ce cadre s&apos;appuie sur 20 ans d&apos;accompagnement de PME industrielles et de services B2B. Le principe du plan d&apos;affaires en une page (OPS — One-Page Strategic Plan) a été popularisé par Verne Harnish dans <em>Scaling Up</em> (2014, Gazelles). Voir aussi <a href="https://hbr.org/2018/12/how-to-create-a-one-page-strategic-plan" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">le guide Harvard Business Review sur le plan stratégique en une page</a>.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-mint-green/20">
          <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
            🎯 Vous aussi vous avez 47 slides qui ne répondent pas aux vraies questions ?
          </h3>
          <p className="text-gray-600 mb-6">
            Je peux vous aider à construire le cadre qui tient en une page — et qui fait vraiment la différence sur votre chiffre. Commencez par un diagnostic commercial.
          </p>
          <Link
            href="/diagnostic?utm_source=blog&utm_medium=organic&utm_campaign=strategie-commerciale-pme&utm_content=cadre-une-page"
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
