import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/remuneration-variable-commerciale-pme-5-erreurs';
const heroImage = '/images/blog/remuneration-variable/remuneration-variable-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/remuneration-variable/remuneration-variable-hero.webp';
const ogImage = 'https://www.laurentserre.com/images/blog/remuneration-variable/remuneration-variable-og.jpg';
const carouselPrefix = '/images/blog/remuneration-variable';

export const metadata: Metadata = {
  title: 'Votre plan de commission démotive vos commerciaux (et vous ne le savez pas) | Laurent Serre',
  description:
    '5 erreurs qui detruisent la motivation des commerciaux et le cadre en 4 parametres pour batir un plan de commission adapte a une PME B2B. De la grille salariale au taux de commission.',
  keywords:
    'remuneration variable commercial, plan de commission PME, structure commission commerciale B2B, OTE commercial France, grille salariale commercial 2026, motivation commerciale, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-17',
  },
  openGraph: {
    title: 'Votre plan de commission démotive vos commerciaux (et vous ne le savez pas)',
    description:
      '5 erreurs qui detruisent la motivation des commerciaux et le cadre en 4 parametres pour batir un plan de commission adapte a une PME B2B.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Plan de commission PME - illustration hero',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Votre plan de commission démotive vos commerciaux (et vous ne le savez pas) | Laurent Serre',
    description:
      '5 erreurs qui detruisent la motivation des commerciaux et le cadre en 4 parametres pour batir un plan de commission adapte a une PME B2B.',
    images: [ogImage],
  },
};

export default function RemunerationVariablePage() {
  const carouselImages = [
    { src: `${carouselPrefix}/remuneration-variable-slide-cover.webp`, alt: 'Couverture - Rémunération variable : les 5 erreurs qui detruisent la motivation', index: 0 },
    { src: `${carouselPrefix}/remuneration-variable-slide-01-plafond.webp`, alt: 'Erreur 1 - Plafonner les commissions', index: 1 },
    { src: `${carouselPrefix}/remuneration-variable-slide-02-regles.webp`, alt: 'Erreur 2 - Changer les regles en cours d\'annee', index: 2 },
    { src: `${carouselPrefix}/remuneration-variable-slide-03-ca.webp`, alt: 'Erreur 3 - Indexer sur le CA seulement', index: 3 },
    { src: `${carouselPrefix}/remuneration-variable-slide-04-copie.webp`, alt: 'Erreur 4 - Copier le plan d\'une boite corporate', index: 4 },
    { src: `${carouselPrefix}/remuneration-variable-slide-05-chasseur.webp`, alt: 'Erreur 5 - Ne pas distinguer chasseurs et farmers', index: 5 },
    { src: `${carouselPrefix}/remuneration-variable-slide-06-cadre.webp`, alt: 'Le cadre en 4 parametres', index: 6 },
    { src: `${carouselPrefix}/remuneration-variable-slide-07-accelerateur.webp`, alt: 'Accelerateurs et periodicite', index: 7 },
    { src: `${carouselPrefix}/remuneration-variable-slide-08-synthese.webp`, alt: 'Synthese et application PME', index: 8 },
    { src: `${carouselPrefix}/remuneration-variable-slide-09-cta.webp`, alt: 'CTA - Commencez par un diagnostic', index: 9 },
  ];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: 'Votre plan de commission démotive vos commerciaux (et vous ne le savez pas)',
        description:
          '5 erreurs qui detruisent la motivation des commerciaux et le cadre en 4 parametres pour batir un plan de commission adapte a une PME B2B.',
        image: heroImageAbsolute,
        datePublished: '2026-06-17',
        dateModified: '2026-06-17',
        author: {
          '@type': 'Person',
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com',
        },
        publisher: {
          '@type': 'Person',
          name: 'Laurent Serre',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': articleUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Comment calculer la part variable d\'un commercial ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La part variable se calcule en appliquant un taux de commission (5 a 15% du CA ou 15 a 25% de la marge) au chiffre d\'affaires genere par le commercial. Le split fixe/variable recommande pour une PME B2B est de 70/30 ou 60/40 selon l\'anciennete et le poste. Exemple : un commercial confirme a 59 000 euros brut annuel avec un split 70/30 aura une partie variable de 17 700 euros par an, soit environ 1 475 euros par mois.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quel pourcentage de variable pour un commercial B2B ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pour un commercial B2B en PME, le pourcentage de variable recommande se situe entre 30% et 40% de la remuneration totale (OTE). En dessous de 30%, la part variable ne cree pas d\'incitation suffisante. Au-dessus de 40%, le risque de stress et de turn-over augmente. Le bon equilibre depend du cycle de vente : plus le cycle est long, plus la part variable doit etre securisee par des paliers intermediaires.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment motiver ses commerciaux avec la remuneration ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La remuneration motive quand elle remplit quatre conditions : un fixe qui securise (70/30 ou 60/40), un taux de commission simple et transparent, des accelerateurs qui recompensent le depassement sans plafond, et une periodicite de versement adaptee au cycle de vente (mensuel ou trimestriel). Le premier levier de motivation n\'est pas le montant mais la clarte et la stabilite des regles.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la difference entre OTE et salaire fixe ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'L\'OTE (On Target Earnings) designe la remuneration totale qu\'un commercial peut atteindre en atteignant ses objectifs : c\'est la somme du fixe et du variable cible. Le salaire fixe est la part garantie, versee chaque mois quoi qu\'il arrive. Exemple pour un commercial confirme en PME : OTE de 59 000 euros brut annuel dont 41 300 euros de fixe (70%) et 17 700 euros de variable cible (30%).',
            },
          },
          {
            '@type': 'Question',
            name: 'Faut-il plafonner les commissions des commerciaux ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Non. Plafonner les commissions est l\'erreur la plus frequente et la plus destructrice de motivation. Un commercial qui depasse ses objectifs doit etre recompense sans limite : c\'est le meilleur signal que vous pouvez envoyer a votre equipe. Si le plafond est justifie par un probleme de marge, corrigez la structure de commission (indexez sur la marge pas sur le CA), ne plafonnez pas le resultat.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': articleUrl + '#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, item: { '@id': 'https://www.laurentserre.com', name: 'Accueil' } },
          { '@type': 'ListItem', position: 2, item: { '@id': 'https://www.laurentserre.com/blog', name: 'Blog' } },
          { '@type': 'ListItem', position: 3, item: { '@id': articleUrl, name: 'Rémunération variable commerciale PME' } },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Hero image */}
        <div className="relative w-full aspect-[3/2] mb-8 rounded-xl overflow-hidden">
          <Image
            src={heroImage}
            alt="Remuneration variable commerciale PME - plan de commission"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Category + date */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
            Management commercial / RH
          </span>
          <span>17 juin 2026</span>
          <span>7 min de lecture</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Votre plan de commission démotive vos commerciaux (et vous ne le savez pas)
        </h1>

        <AuthorCard />

        {/* TL;DR */}
        <div className="bg-gray-50 border-l-4 border-blue-600 p-5 my-8 rounded-r-xl">
          <p className="text-sm font-semibold text-blue-800 mb-1">A RETENIR</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            La plupart des PME conçoivent leur plan de commission à l&apos;envers : elles copient un modèle corporate, plafonnent les commissions, changent les règles en cours d&apos;année. Résultat : démotivation, turnover, comportements anti-business. Voici les 5 erreurs que je vois le plus souvent sur le terrain, et le cadre simple pour construire un plan de commission qui tient la route en PME.
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none text-gray-800">
          <p>
            J&apos;ai vu un dirigeant perdre son meilleur commercial un mardi matin de janvier.
          </p>
          <p>
            Ce n&apos;était pas à cause du salaire. Ce n&apos;était pas non plus parce qu&apos;un concurrent lui avait proposé mieux. Il est parti parce que la direction avait changé les règles de commission en décembre, sans le prévenir. Son variable avait fondu de 40% du jour au lendemain.
          </p>
          <p>
            Le dirigeant ne comprenait pas : « On a juste ajusté les marges, c&apos;est pareil pour tout le monde. »
          </p>
          <p>
            Non. Ce n&apos;est pas pareil. Le plan de commission n&apos;est pas un outil comptable que l&apos;on ajuste au fil de l&apos;eau. C&apos;est le contrat de confiance le plus direct entre un dirigeant et son équipe commerciale. Quand on y touche sans préparation, on ne touche pas à un tableau Excel. On touche à l&apos;envie.
          </p>
          <p>
            Voici les erreurs que je vois le plus souvent, et ce qu&apos;il faut regarder à la place.
          </p>

          {/* Erreur 1 */}
          <h2 id="erreur-1">Erreur 1 : Plafonner les commissions</h2>
          <p>
            Rien ne tue plus vite la motivation qu&apos;un plafond de commission. Un commercial qui atteint son objectif en octobre et sait qu&apos;il ne gagnera rien de plus sur les ventes supplémentaires a un choix très simple : il reporte ses deals sur janvier.
          </p>
          <p>
            J&apos;ai vu une PME perdre 300 000 euros de CA sur un trimestre parce que ses trois meilleurs vendeurs avaient volontairement ralenti après avoir atteint le plafond. Le dirigeant était fier de son plan de commission « maîtrisé ». Il avait juste créé un plafond de verre sur son propre chiffre d&apos;affaires.
          </p>
          <p>
            <strong>Ce qu&apos;il faut faire :</strong> pas de plafond. Si vous avez peur de la marge, indexez la commission sur la marge plutôt que sur le CA. Mais ne dites jamais à un commercial : « au-delà de ce montant, votre travail ne vaut plus rien. »
          </p>

          {/* Erreur 2 */}
          <h2 id="erreur-2">Erreur 2 : Changer les règles en cours d&apos;année</h2>
          <p>
            C&apos;est l&apos;erreur qui coûte le plus cher en confiance. Un commercial construit ses prévisions, ses efforts, ses choix de prospection sur la base d&apos;une règle stable. Si vous changez la règle en juillet parce que « les commissions coûtent trop cher », vous venez de dire à votre équipe : votre travail ne nous engage à rien.
          </p>
          <p>
            La conséquence n&apos;est pas immédiate. Mais elle arrive au moment où vous avez le plus besoin de vos commerciaux : sur une grosse fin de mois, un trimestre tendu, un objectif annuel serré. Le commercial qui n&apos;a plus confiance ne force pas. Il attend.
          </p>
          <p>
            <strong>Ce qu&apos;il faut faire :</strong> figer les règles pour au moins un an. Si une correction est nécessaire, elle s&apos;applique à l&apos;année suivante, avec une communication écrite et un temps d&apos;appropriation. Pas de rétroactivité, jamais.
          </p>

          {/* Erreur 3 */}
          <h2 id="erreur-3">Erreur 3 : Indexer la variable uniquement sur le CA</h2>
          <p>
            La commission sur le chiffre d&apos;affaires est simple, claire, facile à calculer. C&apos;est aussi un piège. Un commercial peut générer un gros CA sur des produits ou services à faible marge, voire à perte, juste pour gonfler son variable.
          </p>
          <p>
            Je vois des équipes vendre des prestations sous-traitées avec une marge de 5% pendant que le coeur de métier de la boîte est délaissé. Pourquoi ? Parce que le plan de commission ne distingue pas une vente rentable d&apos;une vente qui l&apos;est moins.
          </p>
          <p>
            <strong>Ce qu&apos;il faut faire :</strong> indexer la commission sur la marge brute (15 à 25%) ou utiliser des taux différenciés par gamme de produits. Le commercial doit gagner plus quand l&apos;entreprise gagne plus.
          </p>

          {/* Erreur 4 */}
          <h2 id="erreur-4">Erreur 4 : Copier le plan d&apos;une boîte corporate</h2>
          <p>
            Un dirigeant de PME me dit souvent : « J&apos;ai regardé ce que fait Untel dans le CAC 40, je me suis dit que c&apos;était la référence. »
          </p>
          <p>
            Le problème, c&apos;est qu&apos;une PME de 30 personnes n&apos;a ni les mêmes marges, ni les mêmes cycles de vente, ni les mêmes profils de commerciaux qu&apos;une entreprise du CAC 40. Le plan de commission corporate est conçu pour des équipes de 200 vendeurs avec des territoires, des supports marketing et des cycles de décision longs. Copier ce modèle dans une PME, c&apos;est créer un usine à gaz incompréhensible qui motive moins qu&apos;un simple pourcentage clair.
          </p>
          <p>
            <strong>Ce qu&apos;il faut faire :</strong> un plan simple, trois lignes maximum dans le contrat. Taux de commission clair. Périodicité fixe. Règle de déclenchement connue. Pas de coefficients, de multiplicateurs ou de paliers invisibles.
          </p>

          {/* Erreur 5 */}
          <h2 id="erreur-5">Erreur 5 : Ne pas distinguer chasseurs et farmers</h2>
          <p>
            Une erreur que je vois partout : le même plan de commission pour tous les profils. Un chasseur qui ouvre des comptes et un farmer qui développe le portefeuille existant n&apos;ont ni les mêmes cycles ni les mêmes efforts. Les traiter de la même façon garantit que l&apos;un des deux va s&apos;éteindre.
          </p>
          <p>
            Le chasseur a besoin d&apos;un taux de commission élevé sur les premières ventes et d&apos;un accélérateur sur les nouveaux comptes. Le farmer a besoin d&apos;une part variable indexée sur la progression du portefeuille, pas sur le volume absolu.
          </p>
          <p>
            <strong>Ce qu&apos;il faut faire :</strong> deux structures distinctes, ou au minimum des objectifs dimensionnés différemment. Le même manteau ne va pas à tout le monde.
          </p>

          {/* Le cadre */}
          <h2 id="cadre-4-parametres">Le cadre en 4 paramètres qui marche en PME</h2>
          <p>
            Un plan de commission pour PME B2B tient en quatre paramètres. Si vous contrôlez ces quatre leviers, vous êtes déjà au-dessus de 80% des entreprises.
          </p>

          <h3>1. La base fixe</h3>
          <p>
            En France en 2026, la grille salariale d&apos;une PME B2B se situe autour de ces fourchettes : commercial junior 41 000 euros, confirmé 59 000 euros, senior 84 000 euros, directeur commercial 110 000 à 130 000 euros brut annuel. Le split fixe/variable recommandé pour un commercial B2B est de 70/30 ou 60/40. En dessous de 30% de variable, l&apos;incitation est trop faible. Au-dessus de 40%, le stress et le turnover augmentent.
          </p>

          <h3>2. Le taux de commission</h3>
          <p>
            Les taux typiques en PME B2B : 5 à 15% du chiffre d&apos;affaires, ou 15 à 25% de la marge brute. Plus le produit est technique ou le cycle long, plus le taux doit être élevé pour compenser l&apos;effort. Ce qui compte, ce n&apos;est pas le taux en lui-même, c&apos;est la cohérence entre le taux, la marge de l&apos;entreprise et le temps moyen de conclusion.
          </p>

          <h3>3. Les accélérateurs</h3>
          <p>
            Au lieu d&apos;un plafond, mettez un accélérateur. Au-delà de 100% d&apos;objectif, le taux de commission augmente. C&apos;est le meilleur levier pour encourager le dépassement sans créer de frustration. Exemple : 8% jusqu&apos;à l&apos;objectif, 12% au-delà. Simple, immédiat, motivant.
          </p>

          <h3>4. La périodicité</h3>
          <p>
            En PME B2B, la tendance est à la commission mensuelle plutôt que trimestrielle. Un commercial a besoin d&apos;un retour concret et régulier sur son effort. Si le cycle de vente est long (plus de 4 à 6 mois), prévoyez des paliers intermédiaires : commission sur le rendez-vous qualifié, sur la proposition envoyée, puis sur la signature.
          </p>

          {/* Conclusion */}
          <h2 id="a-retenir">Ce qu&apos;il faut retenir</h2>
          <p>
            Un plan de commission ne motive pas un commercial qui n&apos;a pas envie. Mais un mauvais plan démolit la motivation de ceux qui en ont.
          </p>
          <p>
            Les cinq erreurs que je vois le plus souvent se résument à une seule : avoir conçu le plan de commission pour protéger l&apos;entreprise au lieu de récompenser le résultat. Un bon plan de commission est simple, stable, sans plafond, indexé sur la marge, et adapté au profil de chaque commercial.
          </p>
          <p>
            Et si vous avez un doute sur le vôtre, posez-vous une question : est-ce que je montrerais ce plan à mon meilleur commercial en lui disant « voilà comment on va gagner de l&apos;argent ensemble » ?
          </p>
          <p>
            Si la réponse n&apos;est pas un oui immédiat, il est temps de le reprendre à zéro.
          </p>
        </div>

        {/* BD Carousel */}
        {carouselImages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">En BD : les 5 erreurs qui tuent la motivation de vos commerciaux</h2>
            <p className="text-gray-600 mb-6">L&apos;histoire de Marc, commercial confirmé dans une PME B2B, qui voit son plan de commission changer en cours d&apos;année. Illustration des 5 erreurs et du cadre qui redonne envie.</p>
            <BDCarousel images={carouselImages} />
          </div>
        )}

        {/* CTA - Diagnostic */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-10 text-white">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Vous doutez de votre plan de commission ?
            </h2>
            <p className="text-blue-100 mb-6 text-lg leading-relaxed">
              Je propose un diagnostic gratuit de votre structure de rémunération commerciale. 45 minutes pour regarder vos paramètres clés et identifier ce qui coince. Sans engagement.
            </p>
            <HubSpotForm
              formId="diagnostic-remuneration-variable"
              buttonText="Je demande mon diagnostic gratuit"
              placeholder="Votre email professionnel"
              buttonClassName="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg text-base shadow-lg"
            />
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-16 border-t pt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Pour aller plus loin</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/blog/sales-enablement-pme-structurer-performance-commerciale"
              className="block p-5 border rounded-xl hover:border-blue-300 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Structurer la performance commerciale sans se ruiner</h3>
              <p className="text-sm text-gray-600">Le sales enablement pour PME, sans logiciel coûteux ni usine à gaz.</p>
            </Link>
            <Link
              href="/blog/qualification-commerciale-b2b-7-erreurs"
              className="block p-5 border rounded-xl hover:border-blue-300 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Qualification commerciale : les erreurs qui font fuir vos prospects</h3>
              <p className="text-sm text-gray-600">7 erreurs de qualification qui tuent vos deals avant le closing.</p>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
