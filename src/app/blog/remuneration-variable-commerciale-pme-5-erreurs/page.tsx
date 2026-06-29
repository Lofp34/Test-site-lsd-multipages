import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/remuneration-variable-commerciale-pme-5-erreurs';
const heroImage = 'https://www.laurentserre.com/images/blog/remuneration-variable/remuneration-variable-hero.webp';
const ogImage = 'https://www.laurentserre.com/images/blog/remuneration-variable/remuneration-variable-og.jpg';

export const metadata: Metadata = {
  title: 'Plan de Commission PME : 5 Erreurs qui Démotivent (2026)',
  description:
    '5 erreurs qui détruisent la motivation des commerciaux et le cadre en 4 paramètres pour bâtir un plan de commission adapté à une PME B2B. De la grille salariale au taux de commission.',
  keywords:
    'rémunération variable commercial, plan de commission PME, structure commission commerciale B2B, OTE commercial France, grille salariale commercial 2026, motivation commerciale, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-17',
  },
  openGraph: {
    title: 'Votre plan de commission démotive vos commerciaux (et vous ne le savez pas)',
    description:
      '5 erreurs qui détruisent la motivation des commerciaux et le cadre en 4 paramètres pour bâtir un plan de commission adapté à une PME B2B.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Plan de commission PME — illustration hero',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Votre plan de commission démotive vos commerciaux (et vous ne le savez pas) | Laurent Serre',
    description:
      '5 erreurs qui détruisent la motivation des commerciaux et le cadre en 4 paramètres pour bâtir un plan de commission adapté à une PME B2B.',
    images: [ogImage],
  },
};

const carouselPrefix = '/images/blog/remuneration-variable';

const carouselImages = [
  { src: `${carouselPrefix}/remuneration-variable-slide-cover.webp`, alt: 'Couverture — Rémunération variable : les 5 erreurs qui détruisent la motivation', index: 0 },
  { src: `${carouselPrefix}/remuneration-variable-slide-01-plafond.webp`, alt: 'Erreur 1 — Plafonner les commissions', index: 1 },
  { src: `${carouselPrefix}/remuneration-variable-slide-02-regles.webp`, alt: 'Erreur 2 — Changer les règles en cours d\'année', index: 2 },
  { src: `${carouselPrefix}/remuneration-variable-slide-03-ca.webp`, alt: 'Erreur 3 — Indexer sur le CA seulement', index: 3 },
  { src: `${carouselPrefix}/remuneration-variable-slide-04-copie.webp`, alt: 'Erreur 4 — Copier le plan d\'une boîte corporate', index: 4 },
  { src: `${carouselPrefix}/remuneration-variable-slide-05-chasseur.webp`, alt: 'Erreur 5 — Ne pas distinguer chasseurs et farmers', index: 5 },
  { src: `${carouselPrefix}/remuneration-variable-slide-06-cadre.webp`, alt: 'Le cadre en 4 paramètres', index: 6 },
  { src: `${carouselPrefix}/remuneration-variable-slide-07-accelerateur.webp`, alt: 'Accélérateurs et périodicité', index: 7 },
  { src: `${carouselPrefix}/remuneration-variable-slide-08-synthese.webp`, alt: 'Synthèse et application PME', index: 8 },
  { src: `${carouselPrefix}/remuneration-variable-slide-09-cta.webp`, alt: 'CTA — Commencez par un diagnostic', index: 9 },
];

const faqItems = [
  {
    question: 'Comment calculer la part variable d\'un commercial ?',
    answer:
      'La part variable se calcule en appliquant un taux de commission (5 à 15 % du CA ou 15 à 25 % de la marge) au chiffre d\'affaires généré par le commercial. Le split fixe/variable recommandé pour une PME B2B est de 70/30 ou 60/40 selon l\'ancienneté et le poste. Exemple : un commercial confirmé à 59 000 euros brut annuel avec un split 70/30 aura une partie variable de 17 700 euros par an, soit environ 1 475 euros par mois.',
  },
  {
    question: 'Quel pourcentage de variable pour un commercial B2B ?',
    answer:
      'Pour un commercial B2B en PME, le pourcentage de variable recommandé se situe entre 30 % et 40 % de la rémunération totale (OTE). En dessous de 30 %, la part variable ne crée pas d\'incitation suffisante. Au-dessus de 40 %, le risque de stress et de turn-over augmente. Le bon équilibre dépend du cycle de vente : plus le cycle est long, plus la part variable doit être sécurisée par des paliers intermédiaires.',
  },
  {
    question: 'Comment motiver ses commerciaux avec la rémunération ?',
    answer:
      'La rémunération motive quand elle remplit quatre conditions : un fixe qui sécurise (70/30 ou 60/40), un taux de commission simple et transparent, des accélérateurs qui récompensent le dépassement sans plafond, et une périodicité de versement adaptée au cycle de vente (mensuel ou trimestriel). Le premier levier de motivation n\'est pas le montant mais la clarté et la stabilité des règles.',
  },
  {
    question: 'Quelle est la différence entre OTE et salaire fixe ?',
    answer:
      'L\'OTE (On Target Earnings) désigne la rémunération totale qu\'un commercial peut atteindre en atteignant ses objectifs : c\'est la somme du fixe et du variable cible. Le salaire fixe est la part garantie, versée chaque mois quoi qu\'il arrive. Exemple pour un commercial confirmé en PME : OTE de 59 000 euros brut annuel dont 41 300 euros de fixe (70 %) et 17 700 euros de variable cible (30 %).',
  },
  {
    question: 'Faut-il plafonner les commissions des commerciaux ?',
    answer:
      'Non. Plafonner les commissions est l\'erreur la plus fréquente et la plus destructrice de motivation. Un commercial qui dépasse ses objectifs doit être récompensé sans limite : c\'est le meilleur signal que vous pouvez envoyer à votre équipe. Si le plafond est justifié par un problème de marge, corrigez la structure de commission (indexez sur la marge pas sur le CA), ne plafonnez pas le résultat.',
  },
];

export default function RemunerationVariablePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Votre plan de commission démotive vos commerciaux (et vous ne le savez pas)',
        description:
          '5 erreurs qui détruisent la motivation des commerciaux et le cadre en 4 paramètres pour bâtir un plan de commission adapté à une PME B2B.',
        image: heroImage,
        datePublished: '2026-06-17',
        dateModified: '2026-06-17',
        author: {
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com/a-propos',
          sameAs: [
            'https://www.linkedin.com/in/laurentserre34/',
            'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
          ],
        },
        publisher: {
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com',
        },
        mainEntityOfPage: {
          '@id': articleUrl,
        },
        articleSection: 'Management commercial / RH',
        keywords: [
          'rémunération variable commercial',
          'plan de commission PME',
          'structure commission commerciale B2B',
          'OTE commercial France',
          'grille salariale commercial 2026',
          'motivation commerciale',
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
          { '@type': 'ListItem', position: 3, name: 'Rémunération variable commerciale PME', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Rémunération variable</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Management commercial / RH
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Votre plan de commission démotive vos commerciaux (et vous ne le savez pas)
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
              <time dateTime="2026-06-17">17 juin 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/remuneration-variable/remuneration-variable-hero.webp"
              alt="Rémunération variable commerciale PME — plan de commission"
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
              La plupart des PME conçoivent leur plan de commission à l&apos;envers : elles copient un modèle corporate, plafonnent les commissions, changent les règles en cours d&apos;année. Résultat : démotivation, turnover, comportements anti-business. Voici les 5 erreurs les plus fréquentes sur le terrain, et le cadre simple pour construire un plan de commission qui tient la route en PME.
            </p>
          </div>

          {/* BD Carousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Les 5 erreurs de rémunération variable
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire de Marc, commercial confirmé dans une PME B2B, qui voit son plan de commission changer en cours d&apos;année. De la frustration au cadre qui redonne envie.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Rémunération variable — les 5 erreurs"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-remuneration-variable.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (10 planches)
              </Link>
            </div>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Votre plan de commission est-il bien construit ? Diagnostic gratuit
            </Link>
          </div>

          {/* Introduction */}
          <p className="mb-8">
            J&apos;ai vu un dirigeant perdre son meilleur commercial un mardi matin de janvier.
          </p>
          <p className="mb-8">
            Ce n&apos;était pas à cause du salaire. Ce n&apos;était pas non plus parce qu&apos;un concurrent lui avait proposé mieux. Il est parti parce que la direction avait changé les règles de commission en décembre, sans le prévenir. Son variable avait fondu de 40 % du jour au lendemain.
          </p>
          <p className="mb-8">
            Le dirigeant ne comprenait pas : « On a juste ajusté les marges, c&apos;est pareil pour tout le monde. »
          </p>
          <p className="mb-8">
            Non. Ce n&apos;est pas pareil. Le plan de commission n&apos;est pas un outil comptable que l&apos;on ajuste au fil de l&apos;eau. C&apos;est le contrat de confiance le plus direct entre un dirigeant et son équipe commerciale. Quand on y touche sans préparation, on ne touche pas à un tableau Excel. On touche à l&apos;envie.
          </p>
          <p className="mb-8">
            Voici les erreurs que je vois le plus souvent, et ce qu&apos;il faut regarder à la place.
          </p>

          {/* Erreur 1 */}
          <h2 id="erreur-1" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Erreur 1 : Plafonner les commissions
          </h2>
          <p className="mb-8">
            Rien ne tue plus vite la motivation qu&apos;un plafond de commission. Un commercial qui atteint son objectif en octobre et sait qu&apos;il ne gagnera rien de plus sur les ventes supplémentaires a un choix très simple : il reporte ses deals sur janvier.
          </p>
          <p className="mb-8">
            J&apos;ai vu une PME perdre 300 000 euros de CA sur un trimestre parce que ses trois meilleurs vendeurs avaient volontairement ralenti après avoir atteint le plafond. Le dirigeant était fier de son plan de commission « maîtrisé ». Il avait juste créé un plafond de verre sur son propre chiffre d&apos;affaires.
          </p>
          <p className="mb-8">
            <strong>Ce qu&apos;il faut faire :</strong> pas de plafond. Si vous avez peur de la marge, indexez la commission sur la marge plutôt que sur le CA. Mais ne dites jamais à un commercial : « au-delà de ce montant, votre travail ne vaut plus rien. »
          </p>

          {/* Erreur 2 */}
          <h2 id="erreur-2" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Erreur 2 : Changer les règles en cours d&apos;année
          </h2>
          <p className="mb-8">
            C&apos;est l&apos;erreur qui coûte le plus cher en confiance. Un commercial construit ses prévisions, ses efforts, ses choix de prospection sur la base d&apos;une règle stable. Si vous changez la règle en juillet parce que « les commissions coûtent trop cher », vous venez de dire à votre équipe : votre travail ne nous engage à rien.
          </p>
          <p className="mb-8">
            La conséquence n&apos;est pas immédiate. Mais elle arrive au moment où vous avez le plus besoin de vos commerciaux : sur une grosse fin de mois, un trimestre tendu, un objectif annuel serré. Le commercial qui n&apos;a plus confiance ne force pas. Il attend.
          </p>
          <p className="mb-8">
            <strong>Ce qu&apos;il faut faire :</strong> figer les règles pour au moins un an. Si une correction est nécessaire, elle s&apos;applique à l&apos;année suivante, avec une communication écrite et un temps d&apos;appropriation. Pas de rétroactivité, jamais.
          </p>

          {/* Erreur 3 */}
          <h2 id="erreur-3" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Erreur 3 : Indexer la variable uniquement sur le CA
          </h2>
          <p className="mb-8">
            La commission sur le chiffre d&apos;affaires est simple, claire, facile à calculer. C&apos;est aussi un piège. Un commercial peut générer un gros CA sur des produits ou services à faible marge, voire à perte, juste pour gonfler son variable.
          </p>
          <p className="mb-8">
            Je vois des équipes vendre des prestations sous-traitées avec une marge de 5 % pendant que le cœur de métier de la boîte est délaissé. Pourquoi ? Parce que le plan de commission ne distingue pas une vente rentable d&apos;une vente qui l&apos;est moins.
          </p>
          <p className="mb-8">
            <strong>Ce qu&apos;il faut faire :</strong> indexer la commission sur la marge brute (15 à 25 %) ou utiliser des taux différenciés par gamme de produits. Le commercial doit gagner plus quand l&apos;entreprise gagne plus.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Pour structurer la rémunération de votre équipe
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente travaille la construction d&apos;un plan de commission aligné sur votre stratégie, pas sur un modèle standard. Fixe, variable, accélérateurs : repartez avec un cadre qui tient la route.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          {/* Erreur 4 */}
          <h2 id="erreur-4" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Erreur 4 : Copier le plan d&apos;une boîte corporate
          </h2>
          <p className="mb-8">
            Un dirigeant de PME me dit souvent : « J&apos;ai regardé ce que fait Untel dans le CAC 40, je me suis dit que c&apos;était la référence. »
          </p>
          <p className="mb-8">
            Le problème, c&apos;est qu&apos;une PME de 30 personnes n&apos;a ni les mêmes marges, ni les mêmes cycles de vente, ni les mêmes profils de commerciaux qu&apos;une entreprise du CAC 40. Le plan de commission corporate est conçu pour des équipes de 200 vendeurs avec des territoires, des supports marketing et des cycles de décision longs. Copier ce modèle dans une PME, c&apos;est créer une usine à gaz incompréhensible qui motive moins qu&apos;un simple pourcentage clair.
          </p>
          <p className="mb-8">
            <strong>Ce qu&apos;il faut faire :</strong> un plan simple, trois lignes maximum dans le contrat. Taux de commission clair. Périodicité fixe. Règle de déclenchement connue. Pas de coefficients, de multiplicateurs ou de paliers invisibles.
          </p>

          {/* Erreur 5 */}
          <h2 id="erreur-5" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Erreur 5 : Ne pas distinguer chasseurs et farmers
          </h2>
          <p className="mb-8">
            Une erreur que je vois partout : le même plan de commission pour tous les profils. Un chasseur qui ouvre des comptes et un farmer qui développe le portefeuille existant n&apos;ont ni les mêmes cycles ni les mêmes efforts. Les traiter de la même façon garantit que l&apos;un des deux va s&apos;éteindre.
          </p>
          <p className="mb-8">
            Le chasseur a besoin d&apos;un taux de commission élevé sur les premières ventes et d&apos;un accélérateur sur les nouveaux comptes. Le farmer a besoin d&apos;une part variable indexée sur la progression du portefeuille, pas sur le volume absolu.
          </p>
          <p className="mb-8">
            <strong>Ce qu&apos;il faut faire :</strong> deux structures distinctes, ou au minimum des objectifs dimensionnés différemment. Le même manteau ne va pas à tout le monde.
          </p>

          {/* Le cadre */}
          <h2 id="cadre-4-parametres" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le cadre en 4 paramètres qui marche en PME
          </h2>
          <p className="mb-8">
            Un plan de commission pour PME B2B tient en quatre paramètres. Si vous contrôlez ces quatre leviers, vous êtes déjà au-dessus de 80 % des entreprises.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            1. La base fixe
          </h3>
          <p className="mb-8">
            En France en 2026, la grille salariale d&apos;une PME B2B se situe autour de ces fourchettes : commercial junior 41 000 euros, confirmé 59 000 euros, senior 84 000 euros, directeur commercial 110 000 à 130 000 euros brut annuel. Le split fixe/variable recommandé pour un commercial B2B est de 70/30 ou 60/40. En dessous de 30 % de variable, l&apos;incitation est trop faible. Au-dessus de 40 %, le stress et le turnover augmentent.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            2. Le taux de commission
          </h3>
          <p className="mb-8">
            Les taux typiques en PME B2B : 5 à 15 % du chiffre d&apos;affaires, ou 15 à 25 % de la marge brute. Plus le produit est technique ou le cycle long, plus le taux doit être élevé pour compenser l&apos;effort. Ce qui compte, ce n&apos;est pas le taux en lui-même, c&apos;est la cohérence entre le taux, la marge de l&apos;entreprise et le temps moyen de conclusion.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            3. Les accélérateurs
          </h3>
          <p className="mb-8">
            Au lieu d&apos;un plafond, mettez un accélérateur. Au-delà de 100 % d&apos;objectif, le taux de commission augmente. C&apos;est le meilleur levier pour encourager le dépassement sans créer de frustration. Exemple : 8 % jusqu&apos;à l&apos;objectif, 12 % au-delà. Simple, immédiat, motivant.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            4. La périodicité
          </h3>
          <p className="mb-8">
            En PME B2B, la tendance est à la commission mensuelle plutôt que trimestrielle. Un commercial a besoin d&apos;un retour concret et régulier sur son effort. Si le cycle de vente est long (plus de 4 à 6 mois), prévoyez des paliers intermédiaires : commission sur le rendez-vous qualifié, sur la proposition envoyée, puis sur la signature.
          </p>

          {/* Conclusion */}
          <h2 id="a-retenir" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce qu&apos;il faut retenir
          </h2>
          <p className="mb-8">
            Un plan de commission ne motive pas un commercial qui n&apos;a pas envie. Mais un mauvais plan démolit la motivation de ceux qui en ont.
          </p>
          <p className="mb-8">
            Les cinq erreurs que je vois le plus souvent se résument à une seule : avoir conçu le plan de commission pour protéger l&apos;entreprise au lieu de récompenser le résultat. Un bon plan de commission est simple, stable, sans plafond, indexé sur la marge, et adapté au profil de chaque commercial.
          </p>
          <p className="mb-8">
            Et si vous avez un doute sur le vôtre, posez-vous une question : est-ce que je montrerais ce plan à mon meilleur commercial en lui disant « voilà comment on va gagner de l&apos;argent ensemble » ?
          </p>
          <p className="mb-8">
            Si la réponse n&apos;est pas un oui immédiat, il est temps de le reprendre à zéro.
          </p>

          {/* FAQ */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Questions fréquentes
          </h2>
          <div className="space-y-6 mt-6 mb-10">
            {faqItems.map((item) => (
              <div key={item.question}>
                <p className="font-bold text-blue-ink mb-1">
                  {item.question}
                </p>
                <p className="text-gray-700">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link
                  href="/blog/sales-enablement-pme-structurer-performance-commerciale"
                  className="text-mint-green hover:underline font-medium"
                >
                  Structurer la performance commerciale sans se ruiner
                </Link>
                <span className="text-gray-500">
                  {' '}: Le sales enablement pour PME, sans logiciel coûteux ni usine à gaz.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/qualification-commerciale-b2b-7-erreurs"
                  className="text-mint-green hover:underline font-medium"
                >
                  Qualification commerciale : les erreurs qui font fuir vos prospects
                </Link>
                <span className="text-gray-500">
                  {' '}: 7 erreurs de qualification qui tuent vos deals avant le closing.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/performance-commerciale-pme-5-leviers-dirigeant"
                  className="text-mint-green hover:underline font-medium"
                >
                  Performance commerciale PME : les 5 leviers du dirigeant
                </Link>
                <span className="text-gray-500">
                  {' '}: Pour aligner stratégie, équipe et résultats sans disperser vos efforts.
                </span>
              </li>
            </ul>
          </div>

          {/* CTA FORT */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Votre plan de commission pousse-t-il vos commerciaux à vendre plus ou à vendre moins ?
            </h3>
            <p className="mb-6">
              Un diagnostic de votre structure de rémunération permet d&apos;identifier ce qui coince : plafond caché, règles instables, mauvais indicateurs. 45 minutes pour regarder vos paramètres clés et repartir avec un cadre actionnable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic commercial
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
              >
                Découvrir le Bootcamp Méthodes de vente
              </Link>
            </div>
          </div>

          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            Le plan de commission n&apos;est pas un tableau Excel. C&apos;est le contrat de confiance le plus direct entre un dirigeant et son équipe commerciale.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <AuthorCard />
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d&apos;en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre cas mérite un échange plus direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>

      <section className="py-8 bg-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors font-medium"
          >
            ← Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
