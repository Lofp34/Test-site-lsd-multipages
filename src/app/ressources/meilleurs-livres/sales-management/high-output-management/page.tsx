import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'High Output Management : résumé complet | Sales Management & Leadership | Laurent Serre',
  description: 'Résumé détaillé, concepts clés, conseils terrain et avis de High Output Management (Andy Grove). La bible du manager : productivité, OKR et management opérationnel.',
  keywords: [
    'high output management',
    'andy grove',
    'OKR',
    'management opérationnel',
    'productivité équipe',
    'one on one',
    'laurent serre'
  ],
  openGraph: {
    title: 'High Output Management : résumé complet | Sales Management & Leadership',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de High Output Management (Andy Grove). La bible du manager opérationnel.',
    type: 'article',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/high-output-management',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/high-output-management',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High Output Management : résumé complet | Sales Management & Leadership',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de High Output Management (Andy Grove).',
  }
};

// Données structurées Schema.org
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "High Output Management",
  "author": {
    "@type": "Person",
    "name": "Andy Grove"
  },
  "datePublished": "1983",
  "description": "Écrit par le légendaire CEO d'Intel, ce livre est considéré dans la Silicon Valley comme la bible du manager.",
  "genre": "Management",
  "inLanguage": "en",
  "numberOfPages": "272",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1000",
    "bestRating": "5"
  }
};

const reviewStructuredData = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Book",
    "name": "High Output Management",
    "author": {
      "@type": "Person",
      "name": "Andy Grove"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.8",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Laurent Serre"
  },
  "reviewBody": "LE livre de management opérationnel. Grove a une approche d'ingénieur appliquée au management - du concret, du mesurable, de l'efficace. Parfait pour les managers commerciaux qui veulent des résultats."
};

export default function HighOutputManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewStructuredData) }}
      />
      
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-12">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-2 text-sm shadow-md backdrop-blur mb-2">
              Sales Management & Leadership
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              High Output Management
            </h1>
            <p className="text-xl text-mint-green font-semibold mb-2">
              Andy Grove <span className="text-white/60 font-normal">— 1983</span>
            </p>
            <p className="text-lg text-white/90 italic mb-6 max-w-2xl mx-auto">
              La bible du manager : productivité, OKR et management opérationnel
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                Avancé
              </span>
              <span className="bg-blue-ink/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                7h de lecture
              </span>
              <div className="flex items-center bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">⭐</span>
                <span>4.8/5</span>
              </div>
            </div>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-mint-green mb-6">
              Résumé détaillé
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
              <p className="text-lg leading-relaxed mb-6">
                Andy Grove, ancien CEO d'Intel, livre dans cet ouvrage fondateur sa philosophie du management opérationnel. Sa vision : un manager est un multiplicateur de force dont la productivité se mesure à l'output de son organisation, pas à ses performances individuelles.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Management comme production</h3>
              <p className="mb-6">
                Grove applique les principes de l'ingénierie industrielle au management. Chaque manager doit optimiser l'output de son "usine" (son équipe) en identifiant les goulots d'étranglement et en améliorant les processus.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Levier managérial</h3>
              <p className="mb-6">
                Un manager efficace maximise son impact en se concentrant sur les activités à fort levier : formation, amélioration des processus, prise de décisions stratégiques. Une heure de formation peut économiser des centaines d'heures d'inefficacité.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">OKR (Objectives and Key Results)</h3>
              <p className="mb-6">
                Grove est l'inventeur de cette méthode de fixation d'objectifs adoptée par Google, Intel et des milliers d'entreprises. Les OKR alignent l'organisation sur des objectifs ambitieux et mesurables.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">One-on-One meetings</h3>
              <p className="mb-6">
                Grove insiste sur l'importance des entretiens individuels réguliers avec chaque collaborateur. Ces réunions, dirigées par l'employé, permettent de détecter les problèmes tôt et de coacher efficacement.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Gestion du temps managérial</h3>
              <p className="mb-6">
                Comment structurer son agenda pour maximiser l'impact : blocs de temps pour la réflexion stratégique, réunions productives, interruptions contrôlées.
              </p>
            </div>
          </div>
        </article>

        {/* Points clés à retenir */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-mint-green mb-6">
              Points clés à retenir
            </h2>
            
            <ul className="space-y-4">
              {[
                "Management comme fonction de multiplication de l'output d'équipe",
                "Concept de levier managérial : maximiser l'impact par les bonnes activités",
                "Méthode OKR pour fixer et suivre des objectifs ambitieux",
                "Importance des one-on-one réguliers pour le coaching individuel",
                "Gestion optimisée du temps et des priorités managériales",
                "Approche systémique pour identifier et résoudre les goulots d'étranglement"
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-mint-green text-xl mr-3 mt-1">✓</span>
                  <span className="text-gray-800 dark:text-gray-200 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pour qui ce livre ? */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-mint-green mb-6">
              Pour qui ce livre ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Managers opérationnels",
                "Directeurs commerciaux",
                "Team leaders",
                "Responsables de production",
                "Entrepreneurs en croissance"
              ].map((profile, index) => (
                <div key={index} className="flex items-center p-3 bg-mint-green/10 rounded-lg">
                  <span className="text-mint-green text-lg mr-3">👤</span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{profile}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mon avis terrain */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-2xl shadow-xl p-8 border border-mint-green/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-mint-green rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-ink font-bold text-lg">LS</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green">
                  Mon avis terrain
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Laurent Serre</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
              <p className="text-lg leading-relaxed mb-6">
                LE livre de management opérationnel. Grove a une approche d'ingénieur appliquée au management - du concret, du mesurable, de l'efficace. Parfait pour les managers commerciaux qui veulent des résultats.
              </p>
              
              <h3 className="text-xl font-bold text-mint-green mb-4">Ce qui transforme vraiment :</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>Les OKR appliqués aux équipes commerciales (alignement et focus)</li>
                <li>Les one-on-one structurés (coaching individuel efficace)</li>
                <li>La notion de levier managérial (faire plus avec moins)</li>
              </ul>
              
              <div className="bg-orange-soft/20 border-l-4 border-orange-soft p-4 rounded-r-lg">
                <p className="font-semibold text-orange-soft mb-2">⚠️ Attention :</p>
                <p>
                  C'est dense et exigeant. Grove ne fait pas dans le feel-good management. Mais si vous voulez une équipe performante, c'est LA méthode. À coupler avec Good to Great pour l'aspect humain.
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4.8 ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">4.8/5</span>
              </div>
            </div>
          </div>
        </section>

        {/* Livres complémentaires */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-mint-green mb-6">
              Livres complémentaires
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/ressources/meilleurs-livres/sales-management/good-to-great"
                className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink dark:text-mint-green mb-3 group-hover:text-mint-green transition-colors">
                  Good to Great
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Pour l'aspect stratégique et humain du leadership
                </p>
                <span className="text-mint-green font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/sales-management/the-hard-thing-about-hard-things"
                className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink dark:text-mint-green mb-3 group-hover:text-mint-green transition-colors">
                  The Hard Thing About Hard Things
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Pour gérer les situations difficiles en management
                </p>
                <span className="text-mint-green font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Bootcamp */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-mint-green/20 to-blue-ink/20 rounded-2xl shadow-xl p-8 text-center border border-mint-green/30">
            <div className="inline-block bg-mint-green/30 text-mint-green font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
              Passez du livre au terrain
            </div>
            <h3 className="text-3xl font-bold text-blue-ink dark:text-mint-green mb-4">
              Découvrez le Bootcamp Commercial Intensif
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
              Appliquez les principes de High Output Management à votre équipe commerciale. Formation intensive pour managers qui veulent des résultats mesurables.
            </p>
            <Link 
              href="/bootcamp-commercial-intensif" 
              className="inline-block bg-mint-green text-blue-ink font-bold px-8 py-4 rounded-full shadow-lg hover:bg-mint-green/90 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              Voir le Bootcamp
            </Link>
          </div>
        </section>

        {/* Navigation retour */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link 
            href="/ressources/meilleurs-livres/sales-management" 
            className="inline-flex items-center text-mint-green hover:text-mint-green/80 text-lg font-medium transition-colors"
          >
            <span className="mr-2">←</span>
            Retour à Sales Management & Leadership
          </Link>
        </div>
      </main>
    </>
  );
}