import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ Formation Commerciale PME — 18 questions essentielles | Laurent Serre',
  description:
    'Tout savoir sur la formation commerciale pour PME : choix, financement, méthodes, durée, résultats. 18 questions/réponses par un expert terrain avec 20 ans d\'expérience.',
  keywords:
    'FAQ formation commerciale PME, questions formation vente, formation commerciale PME, financement formation OPCO, méthode commerciale, formateur PME',
  alternates: {
    canonical: 'https://www.laurentserre.com/faq-formation-commerciale-pme',
  },
  openGraph: {
    title: 'FAQ Formation Commerciale PME — 18 questions essentielles',
    description:
      'Tout savoir sur la formation commerciale pour PME : choix, financement, méthodes, durée, résultats. 18 questions/réponses par un expert terrain.',
    url: 'https://www.laurentserre.com/faq-formation-commerciale-pme',
    type: 'website',
    locale: 'fr_FR',
  },
};

const faqItems = [
  {
    q: 'Qu\'est-ce qu\'une formation commerciale adaptée aux PME ?',
    a: 'Une formation commerciale adaptée aux PME est un programme conçu spécifiquement pour les contraintes des petites et moyennes entreprises : équipes réduites, dirigeant encore très impliqué dans le commerce, cycles de vente plus courts, budget formation limité, et nécessité de résultats visibles rapidement. Contrairement aux formations catalogue conçues pour les grands groupes, une formation PME part des vrais rendez-vous, des vrais clients et des vraies difficultés de l\'équipe. Les cas pratiques sont calés sur le secteur d\'activité, les scripts sont adaptés au cycle de vente, et le rythme tient compte de l\'activité commerciale en cours.',
  },
  {
    q: 'Quelle formation commerciale choisir pour une PME ?',
    a: 'La bonne formation dépend du blocage principal de l\'entreprise. Si l\'équipe peine à générer des rendez-vous, privilégiez une formation prospection. Si les rendez-vous ont lieu mais que le taux de transformation est faible, travaillez le closing et le traitement des objections. Si l\'équipe est désorganisée et les résultats irréguliers, formez au management et au pilotage commercial. Un diagnostic commercial préalable permet d\'identifier le levier le plus rentable avant d\'investir dans la formation.',
  },
  {
    q: 'Une formation commerciale PME doit-elle être sur-mesure ?',
    a: 'Oui, car une PME n\'a pas les mêmes ressources, cycles de décision et contraintes qu\'un grand groupe. Une formation standard applique un programme identique quel que soit votre secteur. Une formation sur-mesure part de vos vrais rendez-vous, de vos vrais clients, de vos vraies objections. Les exercices, les jeux de rôles et les scripts sont calés sur votre réalité commerciale, ce qui rend l\'apprentissage immédiatement transférable sur le terrain.',
  },
  {
    q: 'Combien coûte une formation commerciale pour PME ?',
    a: 'Le coût d\'une formation commerciale varie selon la durée, le nombre de participants et le niveau de personnalisation. Une formation intra-entreprise de 2 à 3 jours pour une équipe de 5 à 10 commerciaux se situe généralement entre 2 000 € et 5 000 €. Les formations certifiantes ou les bootcamps intensifs peuvent aller au-delà. L\'important est de comparer ce coût au coût de l\'inaction : un commercial qui ne maîtrise pas ses techniques de vente coûte bien plus cher en opportunités perdues que le prix de sa formation.',
  },
  {
    q: 'Peut-on financer une formation commerciale via les OPCO ?',
    a: 'Oui, les formations commerciales sont éligibles aux financements OPCO (Opérateurs de Compétences). Selon votre convention collective et votre OPCO de rattachement (OPCO EP, OPCO 2i, Atlas, AKTO, etc.), une prise en charge partielle ou totale des coûts pédagogiques est possible. Les formations dispensées par un organisme certifié Qualiopi sont systématiquement éligibles. Nous vous accompagnons dans vos démarches de demande de financement.',
  },
  {
    q: 'La formation est-elle finançable par le CPF ?',
    a: 'Les formations commerciales certifiantes inscrites au Répertoire National des Certifications Professionnelles (RNCP) ou au Répertoire Spécifique (RS) sont éligibles au Compte Personnel de Formation (CPF). Les formations courtes non certifiantes ne sont généralement pas éligibles. Nous pouvons vous orienter vers les formations certifiantes adaptées si le financement CPF est un critère important pour vous.',
  },
  {
    q: 'Combien de temps faut-il pour voir les effets d\'une formation commerciale ?',
    a: 'Les premiers effets sur la discipline commerciale et la qualité des rendez-vous sont souvent visibles dès les premières semaines. Les commerciaux appliquent les nouvelles méthodes, les entretiens sont mieux structurés, les objections mieux traitées. Les impacts sur le chiffre d\'affaires se mesurent plutôt sur 2 à 6 mois, selon le cycle de vente de l\'entreprise. Une formation isolée sans suivi produit rarement des résultats durables — c\'est le suivi post-formation qui fait la différence.',
  },
  {
    q: 'Quelle différence entre une formation catalogue et une formation PME sur-mesure ?',
    a: 'Une formation catalogue applique un programme standard, avec des cas pratiques génériques, quel que soit votre secteur. Une formation PME sur-mesure est conçue après un diagnostic de votre équipe : les modules sont choisis en fonction de vos blocages réels, les exercices utilisent vos vrais clients, les scripts sont adaptés à votre cycle de vente. Le résultat est une formation immédiatement actionnable, sans décalage entre ce qui est appris et ce qui est pratiqué.',
  },
  {
    q: 'Faut-il former toute l\'équipe ou seulement les commerciaux en difficulté ?',
    a: 'Former uniquement les commerciaux en difficulté crée un écart visible qui peut démotiver et stigmatiser. Il est généralement plus efficace de former l\'équipe entière sur un socle commun (méthode, langage, repères), quitte à approfondir ensuite sur les points individuels en coaching. Le manager doit aussi être impliqué dans la formation pour faire vivre les nouveaux repères après : sans relais managérial, une formation perd 70% de son effet en quelques semaines.',
  },
  {
    q: 'La formation est-elle adaptée aux très petites équipes de 2 à 5 commerciaux ?',
    a: 'Oui, c\'est même une taille idéale pour une formation commerciale. L\'effectif réduit permet un travail très individualisé : chaque commercial repart avec ses propres axes de progression, des débriefs personnalisés et un plan d\'action sur-mesure. Le formateur peut passer plus de temps sur les difficultés spécifiques de chacun, ce qui accélère la montée en compétence.',
  },
  {
    q: 'Que contient un bootcamp commercial intensif ?',
    a: 'Un bootcamp commercial intensif est un programme accéléré de 3 jours qui combine prospection, techniques de closing, gestion des objections, préparation des rendez-vous et pilotage commercial. L\'approche est résolument terrain : alternance de méthode, exercices pratiques sur des cas réels, jeux de rôles filmés et débriefés, scripts actionnables, et plan d\'action individuel pour chaque participant. L\'objectif est de repartir avec des gestes commerciaux précis, pas avec un classeur de théorie.',
  },
  {
    q: 'Qu\'est-ce que le diagnostic commercial préalable ?',
    a: 'Le diagnostic commercial est une analyse préalable qui identifie les vrais blocages de votre équipe avant de choisir une formation. Il répond à des questions simples mais essentielles : où perdez-vous le plus d\'affaires ? Est-ce la prospection, la découverte, l\'argumentation, le closing ou le suivi ? Vos commerciaux ont-ils un problème de méthode ou de management ? Le diagnostic permet de ne pas se tromper de formation — et donc de ne pas gaspiller du temps et du budget.',
  },
  {
    q: 'Quelle méthode de vente enseigner à une équipe commerciale PME ?',
    a: 'Il n\'y a pas de méthode universelle. SPIN Selling est très efficace pour les ventes complexes B2B. BANT est un bon outil de qualification. BEBEDC structure l\'entretien de vente de façon simple. Le mieux est souvent de combiner : BANT pour qualifier en amont, SPIN pour découvrir les besoins, une structure type BEBEDC pour ne rien oublier. L\'important n\'est pas la pureté de la méthode, mais la cohérence de l\'équipe — tout le monde doit parler le même langage commercial.',
  },
  {
    q: 'Comment mesurer le retour sur investissement d\'une formation commerciale ?',
    a: 'Le ROI d\'une formation se mesure sur plusieurs indicateurs, pas uniquement le chiffre d\'affaires. Suivez l\'évolution du taux de transformation (rendez-vous conclus / rendez-vous réalisés), du temps moyen de cycle de vente, du panier moyen, du nombre de nouveaux prospects qualifiés par semaine, et de la régularité des résultats. Comparez ces indicateurs avant/après formation sur une période de 3 à 6 mois. Une formation réussie montre des progrès sur au moins 2 de ces indicateurs.',
  },
  {
    q: 'Que se passe-t-il après la formation ?',
    a: 'Après la formation, nous assurons un suivi terrain pour ancrer les nouveaux gestes : débriefs des premiers rendez-vous post-formation, correction des dérapages, ajustement des scripts, mesure des progrès. Sans ce suivi, les vieux réflexes reviennent en quelques semaines et l\'investissement formation est perdu. Le suivi post-formation est ce qui distingue une formation utile d\'une formation qui fait plaisir sur le moment mais ne change rien.',
  },
  {
    q: 'Un formateur externe est-il plus efficace qu\'un manager qui forme son équipe ?',
    a: 'Les deux rôles sont complémentaires. Le manager connaît l\'équipe, les clients et le métier — il est le mieux placé pour coacher au quotidien et faire vivre les méthodes. Le formateur externe apporte un regard neuf, une méthode éprouvée sur d\'autres secteurs, et la capacité à challenger les pratiques sans les biais internes. La combinaison idéale : le formateur pose les fondations et transmet la méthode, le manager assure le relais quotidien.',
  },
  {
    q: 'Peut-on former des commerciaux à distance ?',
    a: 'Oui, une partie de la formation peut se faire à distance (visio, modules e-learning, exercices en autonomie), notamment pour la théorie et la préparation. Mais la formation aux techniques de vente gagne énormément à être faite en présentiel pour les jeux de rôles, les mises en situation et les débriefs. Un format hybride — théorie à distance, pratique en présentiel — est souvent le plus efficace et le plus économique pour une PME.',
  },
  {
    q: 'À partir de quel chiffre d\'affaires une PME devrait-elle investir dans une formation commerciale ?',
    a: 'Il n\'y a pas de seuil magique. Une PME qui fait 300 k€ avec une équipe de 3 commerciaux a autant besoin de méthode qu\'une PME qui fait 3 M€ avec 15 commerciaux. La question n\'est pas le chiffre d\'affaires mais le blocage : est-ce que votre équipe convertit assez ? Est-ce que vos cycles de vente sont trop longs ? Est-ce que vos résultats sont trop irréguliers ? Si la réponse à l\'une de ces questions est oui, une formation est probablement le levier le plus rentable.',
  },
];

export default function FAQFormationCommercialePME() {
  const pageUrl = 'https://www.laurentserre.com/faq-formation-commerciale-pme';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' },
      { '@type': 'ListItem', position: 2, name: 'FAQ Formation Commerciale PME', item: pageUrl },
    ],
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
            <span className="font-title font-semibold text-white text-sm">Questions fréquentes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-extrabold text-white leading-tight mb-6">
            FAQ Formation Commerciale
            <span className="block text-mint-green">PME</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Tout ce que vous devez savoir avant de choisir une formation commerciale pour votre PME. 18 questions essentielles, réponses d&apos;expert terrain.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-lg text-gray-anthracite leading-relaxed">
              Choisir une formation commerciale pour sa PME soulève beaucoup de questions : quelle méthode, quel budget, quel format, pour quels résultats ? Ces 18 réponses vous donnent les repères pour décider en connaissance de cause, sans jargon et sans promesses irréalistes.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <details key={i} className="group bg-slate-50 rounded-xl border border-gray-200 hover:border-mint-green/30 transition-colors">
                <summary className="p-5 cursor-pointer font-title font-bold text-blue-ink text-lg group-hover:text-mint-green transition-colors list-none [&::-webkit-details-marker]:hidden flex items-center gap-3">
                  <span className="text-mint-green text-sm w-6 shrink-0">{i + 1}.</span>
                  {item.q}
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-gray-anthracite leading-relaxed border-t border-gray-200 pt-4">{item.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 bg-blue-ink rounded-2xl p-8 text-center text-white">
            <p className="text-xl font-title font-bold mb-4">
              Vous avez une question qui n&apos;est pas dans cette FAQ ?
            </p>
            <p className="text-white/80 mb-6">
              Un diagnostic commercial gratuit de 30 minutes permet de répondre précisément à votre situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 bg-mint-green text-blue-ink font-semibold rounded-full hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic gratuit
              </Link>
              <Link href="/formation-commerciale-pme" className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                Voir les formations PME
              </Link>
            </div>
          </div>

          <p className="mt-10 text-sm text-gray-500 text-center">
            Dernière mise à jour : mai 2026 ·{' '}
            <Link href="/contact" className="text-mint-green hover:underline">Contactez-nous</Link> pour toute question spécifique.
          </p>
        </div>
      </section>
    </main>
  );
}
