import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Méthodes de vente comparées : SPIN, BANT, BEBEDC | Laurent Serre',
  description:
    'SPIN, BANT, BEBEDC : quelle méthode de vente choisir pour votre PME ? Comparatif complet, avantages, limites et guide de choix par contexte commercial.',
  keywords:
    'méthodes de vente, SPIN selling, BANT, BEBEDC, comparatif méthodes vente, techniques vente B2B, méthode commerciale PME, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/methodes-vente-comparees-spin-bant-bebedc',
  },
  openGraph: {
    title: 'Méthodes de vente comparées : SPIN, BANT, BEBEDC — laquelle pour votre PME ?',
    description:
      'Comparatif complet des 3 méthodes de vente B2B les plus utilisées. Avantages, limites, cas d\'usage et guide de choix pour dirigeant de PME.',
    url: 'https://www.laurentserre.com/blog/methodes-vente-comparees-spin-bant-bebedc',
    type: 'article',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPIN vs BANT vs BEBEDC : quelle méthode de vente choisir ?',
    description:
      'Comparatif complet des 3 méthodes de vente B2B. Guide de choix pour PME.',
  },
};

export default function MethodesVenteComparees() {
  const articleUrl = 'https://www.laurentserre.com/blog/methodes-vente-comparees-spin-bant-bebedc';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Méthodes de vente comparées : SPIN, BANT, BEBEDC — laquelle choisir pour votre PME ?',
    description:
      'Comparatif complet des 3 méthodes de vente B2B les plus utilisées. Avantages, limites, cas d\'usage et guide de choix pour dirigeant de PME.',
    image: 'https://www.laurentserre.com/images/blog/2026-05-03-methodes-vente-comparees-hero.jpg',
    datePublished: '2026-05-03',
    dateModified: '2026-05-03',
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
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: 'Méthodes de vente',
    keywords: ['méthodes de vente', 'SPIN selling', 'BANT', 'BEBEDC', 'comparatif méthodes vente', 'techniques vente B2B'],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quelle est la meilleure méthode de vente pour une PME B2B ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Il n\'y a pas de méthode universelle. SPIN est idéale pour les ventes complexes à fort enjeu. BANT est utile pour qualifier rapidement des leads. BEBEDC, plus franco-française, structure l\'entretien de vente de bout en bout. Le mieux est souvent de combiner les approches : BANT pour qualifier, SPIN pour découvrir, BEBEDC pour structurer l\'entretien.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelle différence entre SPIN et BANT ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BANT est une grille de qualification (le prospect a-t-il le budget, l\'autorité, le besoin et le timing ?). SPIN est une méthode de découverte et de vente (poser les bonnes questions pour faire émerger le besoin et l\'urgence). BANT dit "ce prospect vaut-il la peine d\'être travaillé ?". SPIN dit "comment je fais émerger la valeur pour ce prospect ?".',
        },
      },
      {
        '@type': 'Question',
        name: 'Faut-il former ses commerciaux à une seule méthode ou à plusieurs ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Il est préférable de donner un socle commun (une méthode principale) et d\'y ajouter des outils complémentaires selon les situations. Un commercial qui maîtrise bien SPIN saura utiliser BANT en phase de qualification sans avoir besoin d\'une formation dédiée. L\'important est la cohérence de l\'équipe : tout le monde doit parler le même langage commercial.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="bg-primary-bg text-gray-dark">
        <section className="py-24 sm:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
                <span className="font-title font-semibold text-mint-green text-sm">Méthodes de vente</span>
              </div>

              <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
                Méthodes de vente comparées : SPIN, BANT, BEBEDC
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Laquelle choisir pour votre PME ? Comparatif complet, avantages, limites et guide de choix par contexte.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                  <span>Laurent Serre</span>
                </div>
                <span>•</span>
                <time dateTime="2026-05-03">3 mai 2026</time>
                <span>•</span>
                <span>8 min de lecture</span>
              </div>
            </div>
          </div>
        </section>

        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Sommaire">
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 mb-8">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">📋 Au sommaire</p>
            <ol className="space-y-2 text-sm">
              <li><a href="#pourquoi-comparer" className="text-blue-ink hover:text-mint-green transition-colors">Pourquoi comparer les méthodes de vente ?</a></li>
              <li><a href="#spin" className="text-blue-ink hover:text-mint-green transition-colors">SPIN Selling : la méthode des questions puissantes</a></li>
              <li><a href="#bant" className="text-blue-ink hover:text-mint-green transition-colors">BANT : la grille de qualification rapide</a></li>
              <li><a href="#bebedc" className="text-blue-ink hover:text-mint-green transition-colors">BEBEDC : structurer l&apos;entretien à la française</a></li>
              <li><a href="#tableau-comparatif" className="text-blue-ink hover:text-mint-green transition-colors">Tableau comparatif</a></li>
              <li><a href="#quelle-methode" className="text-blue-ink hover:text-mint-green transition-colors">Quelle méthode pour quel contexte PME ?</a></li>
              <li><a href="#faq" className="text-blue-ink hover:text-mint-green transition-colors">FAQ</a></li>
            </ol>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="prose prose-lg max-w-none">
            <h2 id="pourquoi-comparer" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi comparer les méthodes de vente ?</h2>

            <p className="mb-8">Beaucoup de dirigeants de PME cherchent « la » méthode de vente. Celle qui va résoudre tous leurs problèmes commerciaux. La réalité, c&apos;est qu&apos;il n&apos;y a pas de méthode magique. Mais il y a des méthodes qui correspondent mieux que d&apos;autres à votre contexte : votre cycle de vente, votre type de client, la maturité de votre équipe.</p>

            <p className="mb-8">Choisir la bonne méthode, c&apos;est déjà résoudre une partie du problème. Une méthode inadaptée — par exemple, imposer SPIN à une équipe qui fait de la vente transactionnelle — crée de la confusion et de la résistance. Une méthode bien choisie donne un langage commun, des repères clairs et une progression mesurable.</p>

            <p className="mb-8">Voici les trois méthodes les plus utilisées en vente B2B, décortiquées pour que vous puissiez choisir en connaissance de cause.</p>

            <h2 id="spin" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">SPIN Selling : la méthode des questions puissantes</h2>

            <p className="mb-4"><strong>Créée par :</strong> Neil Rackham (Huthwaite), années 80. Basée sur l&apos;analyse de 35 000 appels de vente.</p>
            <p className="mb-4"><strong>Principe :</strong> poser 4 types de questions dans l&apos;ordre pour faire émerger le besoin et l&apos;urgence chez le prospect.</p>

            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <p className="font-semibold mb-3">Les 4 types de questions SPIN :</p>
              <ul className="space-y-3">
                <li><strong>S — Situation :</strong> « Combien de commerciaux avez-vous ? Quel est votre cycle de vente actuel ? »<br /><span className="text-sm text-gray-500">Objectif : comprendre le contexte. À utiliser avec parcimonie.</span></li>
                <li><strong>P — Problem :</strong> « Qu&apos;est-ce qui vous freine dans votre prospection aujourd&apos;hui ? »<br /><span className="text-sm text-gray-500">Objectif : identifier les difficultés.</span></li>
                <li><strong>I — Implication :</strong> « Si vos commerciaux continuent à ce rythme, quel impact sur votre objectif trimestriel ? »<br /><span className="text-sm text-gray-500">Objectif : faire prendre conscience des conséquences. La question la plus puissante.</span></li>
                <li><strong>N — Need-payoff :</strong> « Si vous pouviez réduire votre cycle de vente de 30%, qu&apos;est-ce que ça changerait pour votre trésorerie ? »<br /><span className="text-sm text-gray-500">Objectif : faire visualiser le bénéfice de la solution.</span></li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-mint-green/5 border border-mint-green/20 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">✅ Avantages</p>
                <ul className="text-sm space-y-1">
                  <li>Très efficace en vente complexe B2B</li>
                  <li>Le prospect découvre lui-même son besoin</li>
                  <li>Réduit les objections (le besoin vient du client)</li>
                  <li>Basée sur des données (35 000 appels analysés)</li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">⚠️ Limites</p>
                <ul className="text-sm space-y-1">
                  <li>Nécessite une vraie formation et de la pratique</li>
                  <li>Peut sembler artificiel si mal maîtrisé</li>
                  <li>Peu adapté à la vente transactionnelle</li>
                  <li>Demande du temps par entretien</li>
                </ul>
              </div>
            </div>

            <h2 id="bant" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">BANT : la grille de qualification rapide</h2>

            <p className="mb-4"><strong>Créée par :</strong> IBM, années 60. Popularisée par le monde du logiciel B2B.</p>
            <p className="mb-4"><strong>Principe :</strong> vérifier 4 critères pour déterminer si un prospect mérite d&apos;être travaillé.</p>

            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                <li><strong>B — Budget :</strong> Le prospect a-t-il les moyens de payer ?</li>
                <li><strong>A — Authority :</strong> La personne en face a-t-elle le pouvoir de décider ?</li>
                <li><strong>N — Need :</strong> Le besoin est-il identifié et reconnu ?</li>
                <li><strong>T — Timeline :</strong> Quel est le calendrier de décision ?</li>
              </ul>
            </div>

            <p className="mb-8">BANT n&apos;est pas une méthode de vente à proprement parler — c&apos;est une grille de qualification. Elle vous dit si ça vaut le coup d&apos;investir du temps sur ce prospect. Utilisée seule, elle peut donner une approche trop mécanique. Couplée à SPIN, elle devient très puissante : BANT pour filtrer, SPIN pour convaincre.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-mint-green/5 border border-mint-green/20 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">✅ Avantages</p>
                <ul className="text-sm space-y-1">
                  <li>Simple à comprendre et à appliquer</li>
                  <li>Idéal pour qualifier rapidement un portefeuille</li>
                  <li>Évite de perdre du temps sur des leads froids</li>
                  <li>Parfait pour les SDR et la prospection entrante</li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">⚠️ Limites</p>
                <ul className="text-sm space-y-1">
                  <li>Ne crée pas de valeur : c&apos;est un filtre, pas un outil de vente</li>
                  <li>Peut éliminer trop tôt des prospects qui n&apos;ont pas encore conscience de leur besoin</li>
                  <li>Trop rigide pour les ventes complexes</li>
                  <li>Risque de passer à côté d&apos;opportunités si le budget n&apos;est pas encore alloué</li>
                </ul>
              </div>
            </div>

            <h2 id="bebedc" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">BEBEDC : structurer l&apos;entretien de vente à la française</h2>

            <p className="mb-4"><strong>Origine :</strong> méthode française classique, enseignée dans de nombreuses formations commerciales.</p>
            <p className="mb-4"><strong>Principe :</strong> structurer l&apos;entretien de vente en 6 étapes logiques, de l&apos;accueil à la conclusion.</p>

            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                <li><strong>B — Bonjour :</strong> Accueillir, créer un climat de confiance.</li>
                <li><strong>E — Écoute / Environnement :</strong> Découvrir le contexte, les enjeux, les besoins.</li>
                <li><strong>B — Besoin :</strong> Reformuler et faire préciser le besoin identifié.</li>
                <li><strong>E — Engagement / Envie :</strong> Présenter la solution en lien avec le besoin exprimé.</li>
                <li><strong>D — Décision :</strong> Traiter les objections et proposer de conclure.</li>
                <li><strong>C — Conclusion :</strong> Formaliser l&apos;accord et définir les prochaines étapes.</li>
              </ul>
            </div>

            <p className="mb-8">BEBEDC a l&apos;avantage d&apos;être simple et structurante. C&apos;est une excellente méthode pour des commerciaux débutants ou pour homogénéiser une équipe qui fonctionne « à l&apos;instinct ». Sa limite : elle peut devenir un carcan si on l&apos;applique de façon trop mécanique, sans s&apos;adapter au prospect.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-mint-green/5 border border-mint-green/20 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">✅ Avantages</p>
                <ul className="text-sm space-y-1">
                  <li>Très facile à mémoriser et à enseigner</li>
                  <li>Structure rassurante pour les débutants</li>
                  <li>Garantit qu&apos;on ne saute pas d&apos;étape</li>
                  <li>Bon pour homogénéiser une équipe</li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">⚠️ Limites</p>
                <ul className="text-sm space-y-1">
                  <li>Peut sembler trop « scolaire »</li>
                  <li>Moins adapté aux ventes complexes multi-acteurs</li>
                  <li>La phase « Écoute » est souvent trop superficielle</li>
                  <li>Risque de rigidité si appliqué sans souplesse</li>
                </ul>
              </div>
            </div>

            <h2 id="tableau-comparatif" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Tableau comparatif</h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-ink text-white">
                    <th className="p-3 text-left rounded-tl-lg">Critère</th>
                    <th className="p-3 text-left">SPIN</th>
                    <th className="p-3 text-left">BANT</th>
                    <th className="p-3 text-left rounded-tr-lg">BEBEDC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-3 font-medium">Type</td><td className="p-3">Méthode de découverte et vente</td><td className="p-3">Grille de qualification</td><td className="p-3">Structure d&apos;entretien</td></tr>
                  <tr className="border-b bg-slate-50"><td className="p-3 font-medium">Complexité</td><td className="p-3">Élevée</td><td className="p-3">Faible</td><td className="p-3">Faible</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Temps par entretien</td><td className="p-3">45-90 min</td><td className="p-3">5-15 min</td><td className="p-3">30-60 min</td></tr>
                  <tr className="border-b bg-slate-50"><td className="p-3 font-medium">Cycle de vente cible</td><td className="p-3">Long (3-12 mois)</td><td className="p-3">Court à moyen</td><td className="p-3">Court à moyen</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Vente complexe</td><td className="p-3">⭐⭐⭐⭐⭐</td><td className="p-3">⭐⭐</td><td className="p-3">⭐⭐⭐</td></tr>
                  <tr className="border-b bg-slate-50"><td className="p-3 font-medium">Vente transactionnelle</td><td className="p-3">⭐</td><td className="p-3">⭐⭐⭐⭐</td><td className="p-3">⭐⭐⭐⭐</td></tr>
                  <tr className="border-b"><td className="p-3 font-medium">Formation nécessaire</td><td className="p-3">2-3 jours + pratique</td><td className="p-3">1h</td><td className="p-3">1 journée</td></tr>
                  <tr className="border-b bg-slate-50"><td className="p-3 font-medium rounded-bl-lg">Idéal pour</td><td className="p-3">Commerciaux expérimentés, vente à fort enjeu</td><td className="p-3">SDR, qualification, prospection</td><td className="p-3 rounded-br-lg">Équipes débutantes, homogénéisation</td></tr>
                </tbody>
              </table>
            </div>

            <h2 id="quelle-methode" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Quelle méthode pour quel contexte PME ?</h2>

            <p className="mb-4"><strong>Vous vendez des solutions complexes à fort ticket ?</strong> → SPIN. Vos cycles sont longs, vos enjeux élevés, vos interlocuteurs multiples. SPIN vous aide à faire émerger un besoin que le prospect n&apos;avait pas formulé.</p>

            <p className="mb-4"><strong>Vous faites de la prospection entrante ou sortante avec beaucoup de leads ?</strong> → BANT. Vous devez trier vite pour concentrer votre énergie sur les bons prospects. BANT vous donne un cadre simple.</p>

            <p className="mb-4"><strong>Vous montez une équipe commerciale ou formez des débutants ?</strong> → BEBEDC. Donnez-leur une structure claire, étape par étape, pour qu&apos;ils ne se perdent pas en entretien.</p>

            <p className="mb-4"><strong>Vous voulez le meilleur des trois mondes ?</strong> → Combinez. Beaucoup d&apos;équipes PME performantes utilisent <strong>BANT pour qualifier</strong> en amont, <strong>SPIN pour découvrir</strong> pendant l&apos;entretien, et une structure type <strong>BEBEDC pour ne rien oublier</strong>. L&apos;important n&apos;est pas la pureté de la méthode — c&apos;est la cohérence de l&apos;équipe.</p>

            <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
              <p className="text-xl font-title font-bold mb-4">Vous ne savez pas quelle méthode correspond à votre équipe ?</p>
              <p className="mb-6 text-white/90">
                Un diagnostic commercial permet d&apos;identifier vos vrais blocages et de choisir la méthode la plus rentable pour votre contexte. On en parle ?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                  Demander un diagnostic commercial
                </Link>
                <Link href="/formation-commerciale-pme" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                  Voir les formations PME
                </Link>
              </div>
            </div>

            <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">FAQ — Méthodes de vente</h2>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">Quelle est la meilleure méthode de vente pour une PME B2B ?</p>
                <p className="text-gray-600">Il n&apos;y a pas de méthode universelle. SPIN est idéale pour les ventes complexes à fort enjeu. BANT est utile pour qualifier rapidement des leads. BEBEDC structure l&apos;entretien. Le mieux est souvent de combiner les approches.</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">Quelle différence entre SPIN et BANT ?</p>
                <p className="text-gray-600">BANT qualifie (ce prospect vaut-il la peine ?). SPIN vend (comment je fais émerger le besoin ?). L&apos;un filtre, l&apos;autre convainc. Ils sont complémentaires.</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">Faut-il former ses commerciaux à une seule méthode ou à plusieurs ?</p>
                <p className="text-gray-600">Donnez un socle commun et ajoutez des outils complémentaires. Un commercial qui maîtrise SPIN utilisera BANT naturellement. L&apos;important est que l&apos;équipe parle le même langage commercial.</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <p className="font-title font-bold text-blue-ink mb-2">Peut-on mélanger SPIN, BANT et BEBEDC ?</p>
                <p className="text-gray-600">Oui, et c&apos;est même recommandé. BANT en amont pour qualifier, SPIN pendant la découverte, et une trame type BEBEDC pour structurer l&apos;entretien. L&apos;objectif est la fluidité, pas la pureté méthodologique.</p>
              </div>
            </div>

            <p className="mt-12">Vous voulez aller plus loin ? Consultez notre guide sur les{' '}
              <Link href="/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader" className="text-mint-green hover:underline">
                techniques de closing B2B
              </Link> ou découvrez comment nous accompagnons les PME dans la{' '}
              <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline">
                formation commerciale sur-mesure
              </Link>.
            </p>
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
      </main>
    </>
  );
}
