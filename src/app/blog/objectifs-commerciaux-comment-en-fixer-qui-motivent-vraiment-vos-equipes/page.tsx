import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Objectifs commerciaux : comment en fixer qui motivent vraiment vos équipes | Laurent Serre',
  description:
    'Fixer des objectifs commerciaux sans méthode, c\'est saboter votre performance. Découvrez comment combiner objectifs de résultats et d\'activité, calibrer l\'ambition, et construire un variable qui motive.',
  keywords:
    'objectifs commerciaux, fixer objectifs équipe commerciale, management équipe commerciale, pilotage commercial PME, plan de rémunération variable, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/objectifs-commerciaux-comment-en-fixer-qui-motivent-vraiment-vos-equipes',
  },
  openGraph: {
    title: 'Objectifs commerciaux : comment en fixer qui motivent vraiment vos équipes',
    description:
      'Des objectifs mal construits sabotent votre équipe à coup sûr. La méthode terrain pour fixer des objectifs mixtes, calibrer l\'ambition, et construire un variable qui motive vraiment.',
    url: 'https://www.laurentserre.com/blog/objectifs-commerciaux-comment-en-fixer-qui-motivent-vraiment-vos-equipes',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-07-objectifs-commerciaux-equipe-hero.webp',
        width: 1536,
        height: 864,
        alt: 'Objectifs commerciaux — comment en fixer qui motivent vraiment vos équipes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Objectifs commerciaux : comment en fixer qui motivent vraiment vos équipes | Laurent Serre',
    description:
      'Des objectifs mal construits sabotent votre équipe. La méthode terrain pour fixer des objectifs qui fonctionnent en PME.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-07-objectifs-commerciaux-equipe-hero.webp'],
  },
};

export default function ArticlePage() {
  const articleUrl = 'https://www.laurentserre.com/blog/objectifs-commerciaux-comment-en-fixer-qui-motivent-vraiment-vos-equipes';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Objectifs commerciaux : comment en fixer qui motivent vraiment vos équipes',
        description:
          'Fixer des objectifs commerciaux sans méthode, c\'est saboter votre performance. Découvrez comment combiner objectifs de résultats et d\'activité, calibrer l\'ambition, et construire un variable qui motive.',
        image: 'https://www.laurentserre.com/images/blog/2026-05-07-objectifs-commerciaux-equipe-hero.webp',
        datePublished: '2026-05-07',
        dateModified: '2026-05-07',
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
          name: 'Laurent Serre Développement',
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
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Pourquoi combiner objectifs de résultats et objectifs d\'activité ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les objectifs de résultats (CA, marge) définissent la destination, mais seuls ils ne suffisent pas. Un commercial ne contrôle pas son CA directement — il contrôle ses actions quotidiennes. Les objectifs d\'activité (appels, rendez-vous, propositions) sont le levier sur les résultats. La bonne pratique : combinez les deux pour chaque commercial.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment calibrer le bon niveau d\'ambition pour un objectif commercial ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Trois règles : 1) L\'objectif doit être atteint par 60 à 70% de l\'équipe en conditions normales, 2) Basez-vous sur les données réelles des 3 dernières années, pas sur vos espoirs, 3) Différenciez les objectifs selon les profils (un commercial en 1ère année vs un en poste depuis 3 ans).',
            },
          },
          {
            '@type': 'Question',
            name: 'Quand faut-il ajuster les objectifs commerciaux en cours d\'année ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ajustez si le marché a radicalement changé, votre offre a évolué significativement, ou des événements imprévus ont affecté le commercial (maladie, perte d\'un client majeur hors de son contrôle). Ne cédez pas si le commercial n\'a pas fourni l\'effort attendu ou si l\'objectif était bien calibré mais non atteint par manque de méthode. Tout ajustement doit être documenté et expliqué par écrit.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'Comment fixer des objectifs commerciaux qui motivent',
        description: 'Une méthode en 3 étapes pour construire des objectifs commerciaux efficaces basés sur l\'analyse des données, l\'activité terrain et la co-construction avec les équipes.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Analyser les 3 dernières années de performance par commercial',
            text: 'Avant de fixer vos objectifs annuels, analysez les tendances réelles de chaque commercial. Identifiez la progression naturelle et construisez sur des données, pas des ambitions.',
          },
          {
            '@type': 'HowToStep',
            name: 'Ajouter des objectifs d\'activité aux objectifs de résultats',
            text: 'Pour chaque commercial, définissez 2 ou 3 indicateurs d\'activité hebdomadaires mesurables. Les objectifs de résultats donnent la destination, les objectifs d\'activité donnent le chemin.',
          },
          {
            '@type': 'HowToStep',
            name: 'Co-construire les objectifs avec chaque commercial',
            text: 'Organisez une session d\'une heure avec chaque commercial avant de finaliser leurs objectifs. Ce qu\'ils s\'approprient, ils le défendent. Ce qu\'on leur impose, ils le subissent.',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Objectifs commerciaux', item: articleUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <main className="bg-primary-bg text-gray-dark">
        {/* Header */}
        <section className="py-24 sm:py-32 pb-14 sm:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
                <span className="font-title font-semibold text-mint-green text-sm">Pilotage commercial / gestion d&apos;équipe</span>
              </div>

              <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
                Objectifs commerciaux : comment en fixer qui motivent vraiment vos équipes
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                &laquo;Cette année, vous faites +20%.&raquo; Annonce faite en janvier. En mars, les commerciaux ont décroché. En juin, le dirigeant s&apos;interroge.
                Je l&apos;ai vu se répéter dans des dizaines de PME. Fixer des objectifs qui marchent, ce n&apos;est pas de la magie. C&apos;est une méthode. Voici la mienne.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                  <span>Laurent Serre</span>
                </div>
                <span>&bull;</span>
                <time dateTime="2026-05-07">7 mai 2026</time>
                <span>&bull;</span>
                <span>9 min de lecture</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/blog/2026-05-07-objectifs-commerciaux-equipe-hero.webp"
              alt="Objectifs commerciaux — comment en fixer qui motivent vraiment vos équipes"
              width={1536}
              height={864}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* Sommaire */}
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Sommaire">
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 mb-8">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">📋 Au sommaire</p>
            <ol className="space-y-2 text-sm">
              <li><a href="#erreur-base" className="text-blue-ink hover:text-mint-green transition-colors">L&apos;erreur de base : objectifs de résultat sans objectifs d&apos;activité</a></li>
              <li><a href="#smart-revisitee" className="text-blue-ink hover:text-mint-green transition-colors">La méthode SMART revisitée pour le terrain</a></li>
              <li><a href="#calibrer" className="text-blue-ink hover:text-mint-green transition-colors">Comment calibrer le bon niveau d&apos;ambition</a></li>
              <li><a href="#variable" className="text-blue-ink hover:text-mint-green transition-colors">Le rôle du variable : aligner les incentives</a></li>
              <li><a href="#revue" className="text-blue-ink hover:text-mint-green transition-colors">La revue d&apos;objectifs en cours d&apos;année</a></li>
              <li><a href="#exemple-concret" className="text-blue-ink hover:text-mint-green transition-colors">Un exemple concret : PME industrielle dans la Loire</a></li>
              <li><a href="#conclusion" className="text-blue-ink hover:text-mint-green transition-colors">Conclusion : 3 actions pour vos prochains objectifs</a></li>
            </ol>
          </div>
        </nav>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="prose prose-lg max-w-none">

            {/* TL;DR */}
            <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
              <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">🎯 Ce que vous allez retenir</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Objectifs de résultat seuls = sabotage</strong> : un commercial qui ne sait pas quoi faire le lundi matin pour atteindre son CA ne fait rien de différent.</li>
                <li><strong>La méthode SMART ne suffit pas</strong> : ajoutez E (expliqué) et C (co-construit) pour que l&apos;objectif soit approprié.</li>
                <li><strong>60 à 70% de l&apos;équipe</strong> devrait atteindre l&apos;objectif en conditions normales. Moins de 30% = objectif déconnecté.</li>
                <li><strong>Un variable simple et linéaire</strong> : le commercial doit pouvoir calculer sa rémunération en 2 minutes.</li>
                <li><strong>Revue trimestrielle obligatoire</strong> : les objectifs ne sont pas gravés dans le marbre, mais un ajustement doit être documenté et expliqué.</li>
              </ul>
            </div>

            <p className="lead text-xl text-gray-600 leading-relaxed mb-8">
              &laquo;Cette année, vous faites +20%.&raquo; Annonce faite en janvier. En mars, les commerciaux ont décroché. En juin, le dirigeant s&apos;interroge. En décembre, l&apos;objectif n&apos;est pas atteint et personne ne comprend vraiment pourquoi.
            </p>

            <p>
              Ce scénario, je l&apos;ai vu se répéter dans des dizaines de PME. Des objectifs fixés sans méthode, sans dialogue, sans cohérence &mdash; et qui produisent l&apos;effet inverse de ce qu&apos;on espérait.
            </p>

            <p>
              Fixer des objectifs commerciaux efficaces, ce n&apos;est pas de la magie. C&apos;est une méthode. Voici la mienne.
            </p>

            <h2 id="erreur-base" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">L&apos;erreur de base : fixer des objectifs de résultats sans objectifs d&apos;activité</h2>

            <p>
              Un objectif de résultat, c&apos;est : &laquo;Vous signez 800 000€ de CA cette année.&raquo;
            </p>

            <p>
              Un objectif d&apos;activité, c&apos;est : &laquo;Vous passez 25 appels de prospection par semaine, obtenez 8 rendez-vous qualifiés, et envoyez 4 propositions.&raquo;
            </p>

            <p>
              Lequel votre commercial contrôle-t-il vraiment ?
            </p>

            <p>
              Les objectifs de résultats sont nécessaires. Ils définissent la destination. Mais seuls, ils ne suffisent pas à guider l&apos;action quotidienne. Un commercial à qui on fixe uniquement un objectif de CA ne sait pas quoi faire différemment le lundi matin pour l&apos;atteindre.
            </p>

            <p>
              La bonne pratique : combinez objectifs de résultats ET objectifs d&apos;activité. Les seconds sont le levier sur les premiers.
            </p>

            <h2 id="smart-revisitee" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">La méthode SMART revisitée pour le commercial terrain</h2>

            <p>
              Vous connaissez SMART (Spécifique, Mesurable, Atteignable, Réaliste, Temporel). C&apos;est un bon cadre de départ, mais il manque deux dimensions cruciales pour les équipes commerciales.
            </p>

            <p><strong>S &mdash; Spécifique</strong> : l&apos;objectif doit être précis et sans ambiguïté. &laquo;Améliorer la prospection&raquo; n&apos;est pas un objectif. &laquo;Générer 15 rendez-vous qualifiés par mois sur le segment industrie&raquo; en est un.</p>

            <p><strong>M &mdash; Mesurable</strong> : définissez exactement comment vous allez mesurer. Quel outil &thinsp;? Quelle fréquence de mesure &thinsp;? Qui est responsable de la saisie &thinsp;?</p>

            <p><strong>A &mdash; Atteignable</strong> : basez-vous sur les historiques réels, pas sur vos espoirs. Si votre meilleur commercial a fait 650 000€ l&apos;an dernier, fixer 900 000€ cette année sans changement de contexte est destructeur.</p>

            <p><strong>R &mdash; Réaliste et challengeant</strong> : il y a une zone optimale entre &laquo;trop facile&raquo; (démotivant) et &laquo;inaccessible&raquo; (démotivant aussi). Visez l&apos;objectif qui demande un effort réel mais qui reste crédible.</p>

            <p><strong>T &mdash; Temporel</strong> : un objectif annuel sans jalons intermédiaires ne pilote rien. Découpez en objectifs trimestriels, voire mensuels.</p>

            <p><strong>+E &mdash; Expliqué</strong> : votre commercial comprend le raisonnement derrière l&apos;objectif. Pourquoi ce chiffre &thinsp;? Quelle est la logique commerciale &thinsp;? Quels sont les enjeux pour l&apos;entreprise &thinsp;?</p>

            <p><strong>+C &mdash; Co-construit</strong> : idéalement, le commercial a participé à la fixation de son objectif. Pas pour le réduire à sa guise &mdash; pour qu&apos;il se l&apos;approprie.</p>

            <h2 id="calibrer" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Comment calibrer le bon niveau d&apos;ambition</h2>

            <p>
              C&apos;est la question que me posent le plus souvent les dirigeants : &laquo;Comment je sais si mon objectif est bon &thinsp;?&raquo;
            </p>

            <p>Voici trois règles pratiques.</p>

            <p><strong>Règle 1 : L&apos;objectif doit être atteint par 60 à 70% de l&apos;équipe en conditions normales</strong></p>

            <p>
              Si 90% de l&apos;équipe l&apos;atteint facilement, l&apos;objectif est trop bas. Si moins de 30% l&apos;atteint, il est déconnecté de la réalité. La zone cible : 60 à 70% d&apos;atteinte sur l&apos;équipe.
            </p>

            <p><strong>Règle 2 : Basez-vous sur des données, pas sur des ambitions</strong></p>

            <p>
              Analysez les 3 dernières années. Quelle est la progression naturelle &thinsp;? Quel est l&apos;impact attendu des nouvelles actions (recrutement, formation, nouveaux marchés) &thinsp;? Construisez un objectif sur cette base.
            </p>

            <p><strong>Règle 3 : Différenciez selon les profils</strong></p>

            <p>
              Un commercial en poste depuis 3 ans avec un portefeuille établi n&apos;a pas le même profil d&apos;objectif qu&apos;un commercial en première année de démarrage. Un objectif identique pour les deux est injuste &mdash; et inefficace.
            </p>

            <h2 id="variable" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Le rôle du variable : aligner les incentives</h2>

            <p>
              Le plan de rémunération variable est l&apos;outil de pilotage le plus puissant que vous ayez. Et le plus souvent mal construit.
            </p>

            <p><strong>Principes d&apos;un bon variable commercial :</strong></p>

            <ol className="mb-6 space-y-3 list-decimal ml-6">
              <li><strong>Simplicité</strong> : votre commercial doit pouvoir calculer sa rémunération lui-même en 2 minutes. Un plan de variable avec 7 critères et des coefficients multiplicateurs, personne ne le comprend &mdash; donc personne n&apos;est incentivé.</li>
              <li><strong>Linéarité</strong> : le variable doit progresser proportionnellement aux résultats. Évitez les paliers brutaux où quelques milliers d&apos;euros de CA font basculer de 0% à 15% de variable.</li>
              <li><strong>Cohérence avec les priorités</strong> : si votre priorité est de conquérir de nouveaux clients, votre variable doit surpondérer les nouveaux clients vs les renouvellements.</li>
              <li><strong>Accessibilité</strong> : si votre plan de variable nécessite d&apos;atteindre 80% de l&apos;objectif avant de déclencher quoi que ce soit, c&apos;est un plan de variable qui ne motive pas les commerciaux en difficulté &mdash; ceux qui en auraient le plus besoin.</li>
            </ol>

            <h2 id="revue" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">La revue d&apos;objectifs en cours d&apos;année</h2>

            <p>
              Les objectifs fixés en janvier ne sont pas gravés dans le marbre. Le contexte change. Voici comment gérer les ajustements.
            </p>

            <p><strong>Revue trimestrielle obligatoire</strong></p>

            <p>
              Tous les 3 mois, analysez avec chaque commercial son avancement par rapport à ses objectifs. S&apos;il est en retard, comprenez pourquoi. S&apos;il est en avance, réfléchissez à ce que vous pouvez faire pour capitaliser.
            </p>

            <p><strong>Quand ajuster (et quand tenir ferme)</strong></p>

            <p>
              Ajustez si : le marché a radicalement changé, votre offre a évolué significativement, des événements imprévus ont affecté le commercial (maladie, perte d&apos;un client majeur en dehors de son contrôle).
            </p>

            <p>
              Ne cédez pas si : le commercial n&apos;a pas fourni l&apos;effort attendu, l&apos;objectif était bien calibré mais non atteint par manque de méthode ou d&apos;activité.
            </p>

            <p><strong>L&apos;objectif ajusté doit être documenté et expliqué</strong></p>

            <p>
              Un ajustement perçu comme arbitraire génère plus de démotivation que l&apos;objectif initial difficile. Si vous ajustez, expliquez le raisonnement. Par écrit.
            </p>

            <h2 id="exemple-concret" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Un exemple concret : restructuration des objectifs dans une PME industrielle</h2>

            <p>
              J&apos;ai accompagné une PME de 12 personnes (5 commerciaux) dans la Loire qui avait le même problème depuis 3 ans : des objectifs fixés unilatéralement en janvier, jamais atteints, et une équipe démotivée.
            </p>

            <p>On a travaillé ensemble sur 4 changements :</p>
            <ol className="mb-6 space-y-2 list-decimal ml-6">
              <li>Passage à des objectifs mixtes (résultats + activité)</li>
              <li>Co-construction des objectifs avec chaque commercial</li>
              <li>Simplification du plan de variable (2 critères au lieu de 6)</li>
              <li>Revues mensuelles de 30 minutes par commercial</li>
            </ol>

            <p>
              Résultat 12 mois plus tard : 3 commerciaux sur 5 ont dépassé leurs objectifs pour la première fois depuis des années. L&apos;un d&apos;eux a fait +42% par rapport à l&apos;année précédente.
            </p>

            <p>
              La structure a changé les comportements. Pas une nouvelle formation, pas un nouveau produit. La structure.
            </p>

            <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-5 my-8">
              <p className="text-sm text-blue-ink mb-0">
                <strong>🔗 Pour aller plus loin :</strong> avant de fixer vos objectifs, un <Link href="/diagnostic" className="text-mint-green hover:underline">diagnostic commercial</Link> vous permet de savoir si le problème vient des objectifs &hellip; ou d&apos;ailleurs. Et pour que votre équipe tienne la distance, le <Link href="/management-equipe-commerciale" className="text-mint-green hover:underline">management d&apos;équipe commerciale</Link> est le cadre qui transforme des objectifs bien fixés en résultats réels.
              </p>
            </div>

            <h2 id="conclusion" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Conclusion : 3 actions pour vos prochains objectifs</h2>

            <ol className="mb-8 space-y-3 list-decimal ml-6">
              <li><strong>Avant de fixer vos objectifs annuels</strong>, analysez les 3 dernières années de performance par commercial. Identifiez les tendances réelles. Construisez sur des données.</li>
              <li><strong>Ajoutez des objectifs d&apos;activité</strong> à vos objectifs de résultats. Pour chaque commercial, définissez 2 ou 3 indicateurs d&apos;activité hebdomadaires mesurables.</li>
              <li><strong>Organisez une session de co-construction</strong> d&apos;une heure avec chaque commercial avant de finaliser leurs objectifs. Ce qu&apos;ils s&apos;approprient, ils le défendent. Ce qu&apos;on leur impose, ils le subissent.</li>
            </ol>

            <p className="text-lg font-semibold text-blue-ink mt-8">
              Des objectifs bien construits ne garantissent pas la performance. Mais des objectifs mal construits la sabotent à coup sûr.
            </p>

            {/* Pour aller plus loin */}
            <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
              <p className="text-lg font-title font-bold text-blue-ink mb-4">📚 Pour aller plus loin sur le pilotage commercial</p>
              <ul className="space-y-3 text-sm">
                <li><Link href="/blog/pipeline-commercial-pme-comment-construire-un-outil-qui-predit-vraiment-votre-chiffre" className="text-mint-green hover:underline font-medium">Pipeline commercial PME : comment construire un outil qui prédit vraiment votre chiffre</Link> &mdash; Des objectifs sans pipeline fiable, c&apos;est naviguer sans boussole.</li>
                <li><Link href="/blog/recrutement-commercial-en-pme-arretez-de-recruter-a-l-instinct" className="text-mint-green hover:underline font-medium">Recrutement commercial en PME : arrêtez de recruter à l&apos;instinct</Link> &mdash; Avant de fixer des objectifs, assurez-vous d&apos;avoir les bons profils.</li>
                <li><Link href="/management-equipe-commerciale" className="text-mint-green hover:underline font-medium">Management d&apos;équipe commerciale</Link> &mdash; Le cadre qui transforme des objectifs bien fixés en résultats durables.</li>
              </ul>
            </div>

            {/* E-E-A-T note */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-gray-600 italic mb-4">
                Les principes présentés ici s&apos;appuient sur 20 ans d&apos;accompagnement terrain de PME industrielles et de services B2B, et sont alignés sur les travaux de Locke &amp; Latham en fixation d&apos;objectifs. Voir aussi le <a href="https://hbr.org/2023/01/the-best-way-to-set-and-track-goals" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">guide Harvard Business Review sur la fixation d&apos;objectifs</a>.
              </p>
              <p className="text-gray-600">
                Pour un diagnostic complet de votre système d&apos;objectifs, venez <Link href="/diagnostic" className="text-mint-green hover:underline">parler de votre situation</Link>.
              </p>
            </div>
          </div>
        </article>

        {/* BD Bonus */}
        <section className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">🎨 La BD qui résume tout</span>
            </div>

            <h2 className="text-3xl font-title font-bold text-blue-ink mb-4">Fixer des objectifs efficaces en BD</h2>

            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Cette BD de 11 planches illustre les points clés de l&apos;article. Idéale pour
              partager avec votre équipe ou garder en mémoire les fondamentaux.
            </p>

            {/* Preview grid — first 3 planches */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
              <div className="aspect-[9/16] relative overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/images/bandes-dessinees/objectifs/planche-01.webp"
                  alt="Planche 1 — Fixer des objectifs efficaces"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 200px"
                />
              </div>
              <div className="aspect-[9/16] relative overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/images/bandes-dessinees/objectifs/planche-02.webp"
                  alt="Planche 2 — Fixer des objectifs efficaces"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 200px"
                />
              </div>
              <div className="aspect-[9/16] relative overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/images/bandes-dessinees/objectifs/planche-03.webp"
                  alt="Planche 3 — Fixer des objectifs efficaces"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 200px"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/ressources/bandes-dessinees"
                className="inline-flex items-center gap-2 bg-blue-ink text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-ink/90 transition-colors"
              >
                🎨 Voir les 11 planches
              </Link>
              <a
                href="/images/bandes-dessinees/objectifs/fixer-objectifs-efficaces-bd.pdf"
                download
                className="inline-flex items-center gap-2 border border-blue-ink text-blue-ink px-6 py-3 rounded-xl font-semibold hover:bg-blue-ink/5 transition-colors"
              >
                📥 Télécharger le PDF
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
              Besoin d&apos;en parler plus directement &thinsp;?
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Si votre situation mérite un échange plus direct, vous pouvez aussi laisser un message ici.
            </p>
            <HubSpotForm />
          </div>
        </section>
      </main>
    </>
  );
}
