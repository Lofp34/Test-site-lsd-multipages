import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Life 3.0 : résumé complet | Digital & AI Sales | Laurent Serre',
  description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Life 3.0 (Max Tegmark). Vision long terme de l\'IA en entreprise et implications pour les dirigeants.',
  keywords: [
    'life 3.0',
    'max tegmark',
    'superintelligence',
    'ia générale',
    'futur intelligence artificielle',
    'stratégie ia',
    'laurent serre'
  ],
  openGraph: {
    title: 'Life 3.0 : résumé complet | Digital & AI Sales',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Life 3.0 (Max Tegmark). Vision long terme de l\'IA en entreprise.',
    type: 'article',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai/life-3-0',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurent-serre-developpement.fr/images/og-life-3-0.jpg',
        width: 1200,
        height: 630,
        alt: 'Life 3.0 - Résumé par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre Développement',
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai/life-3-0',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life 3.0 : résumé complet | Digital & AI Sales',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Life 3.0 (Max Tegmark).',
    images: ['https://laurent-serre-developpement.fr/images/og-life-3-0.jpg'],
  }
};

// Données structurées Schema.org
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Life 3.0",
  "author": {
    "@type": "Person",
    "name": "Max Tegmark"
  },
  "datePublished": "2017",
  "description": "Un livre visionnaire qui traite du futur de l'intelligence artificielle et de son impact potentiel sur l'humanité à long terme. Tegmark explore les scénarios d'IA générale et de superintelligence.",
  "genre": "Science",
  "inLanguage": "en",
  "numberOfPages": "364",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.1",
    "ratingCount": "600",
    "bestRating": "5"
  }
};

const reviewStructuredData = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Book",
    "name": "Life 3.0",
    "author": {
      "@type": "Person",
      "name": "Max Tegmark"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.1",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Laurent Serre"
  },
  "reviewBody": "Un livre dense mais fascinant. Tegmark ne fait pas de la science-fiction, il analyse sérieusement les enjeux long terme de l'IA."
};

export default function Life30Page() {
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
      
      <main className="bg-gradient-to-br from-indigo-600 via-cyan-500/20 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-12">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-indigo-500/20 text-indigo-300 font-semibold rounded-full px-4 py-2 text-sm shadow-md backdrop-blur mb-2">
              Digital & AI Sales
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Life 3.0
            </h1>
            <p className="text-xl text-indigo-300 font-semibold mb-2">
              Max Tegmark <span className="text-white/60 font-normal">— 2017</span>
            </p>
            <p className="text-lg text-white/90 italic mb-6 max-w-2xl mx-auto">
              Vision long terme de l'IA en entreprise et implications pour les dirigeants
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                Avancé
              </span>
              <span className="bg-blue-ink/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                8h de lecture
              </span>
              <div className="flex items-center bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">⭐</span>
                <span>4.1/5</span>
              </div>
              <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
                Pertinence Future: 4.8/5
              </span>
            </div>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-indigo-300/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-indigo-300 mb-6">
              Résumé détaillé
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
              <p className="text-lg leading-relaxed mb-6">
                Max Tegmark, physicien au MIT et cofondateur du Future of Life Institute, nous emmène dans une réflexion profonde sur l'avenir de l'intelligence artificielle et ses implications pour l'humanité.
              </p>

              <h3 className="text-2xl font-bold text-indigo-500 mb-4">Les trois niveaux de vie</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl border border-green-200/50">
                  <h4 className="text-xl font-bold text-green-600 mb-3">🧬 Life 1.0</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Biologique</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Vie simple où hardware et software sont figés par l'évolution. Pas d'apprentissage individuel.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200/50">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">🧠 Life 2.0</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Culturelle</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Nous, humains. Hardware figé mais software évolutif (apprentissage, culture, compétences).
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200/50">
                  <h4 className="text-xl font-bold text-purple-600 mb-3">🤖 Life 3.0</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Technologique</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    IA capable de reprogrammer hardware et software. Potentiel d'amélioration illimité.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-indigo-500 mb-4">12 scénarios d'évolution de l'IA</h3>
              <p className="mb-6">
                Tegmark explore 12 scénarios possibles, du plus optimiste au plus catastrophique, pour nous aider à comprendre les enjeux et préparer l'avenir :
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200/50">
                  <h4 className="text-lg font-bold text-green-600 mb-3">🌟 Scénarios optimistes</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• <strong>Libertarien utopique</strong> : L'IA libère l'humanité du travail</li>
                    <li>• <strong>Dirigeant bienveillant</strong> : IA superintelligente guide l'humanité</li>
                    <li>• <strong>Égalitariste</strong> : Bénéfices IA partagés équitablement</li>
                    <li>• <strong>Gardien</strong> : L'IA protège l'humanité</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200/50">
                  <h4 className="text-lg font-bold text-red-600 mb-3">⚠️ Scénarios risqués</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• <strong>Conquérant</strong> : L'IA remplace progressivement l'humanité</li>
                    <li>• <strong>Descendant</strong> : L'humanité devient obsolète</li>
                    <li>• <strong>Zookeeper</strong> : L'humanité en cage dorée</li>
                    <li>• <strong>1984</strong> : Surveillance totale par l'IA</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-indigo-500 mb-4">Implications pour les entreprises</h3>
              
              <div className="space-y-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl border border-blue-200/50">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">📅 Court terme (5-15 ans)</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Automatisation progressive des tâches cognitives</li>
                    <li>• Transformation des modèles économiques</li>
                    <li>• Nouveaux avantages concurrentiels basés sur l'IA</li>
                    <li>• Évolution des compétences et métiers</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl border border-indigo-200/50">
                  <h4 className="text-xl font-bold text-indigo-600 mb-3">📈 Moyen terme (15-50 ans)</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• IA générale surpassant l'humain dans la plupart des domaines</li>
                    <li>• Remise en question des structures organisationnelles</li>
                    <li>• Nouveaux enjeux éthiques et de gouvernance</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200/50">
                  <h4 className="text-xl font-bold text-purple-600 mb-3">🚀 Long terme (50+ ans)</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Possible émergence d'une superintelligence</li>
                    <li>• Transformation radicale de l'économie et de la société</li>
                    <li>• Questions existentielles sur le rôle de l'humanité</li>
                  </ul>
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-6">
                <h4 className="text-lg font-bold text-indigo-600 mb-3">🎯 Pour les commerciaux</h4>
                <p>
                  Comprendre que l'IA transformera profondément le métier, mais que les compétences humaines fondamentales (empathie, créativité, jugement éthique) resteront essentielles et deviendront même plus précieuses.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Conseils de préparation stratégique */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-indigo-300/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-indigo-300 mb-6">
              Conseils de préparation stratégique
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl border border-blue-200/50">
                <h3 className="text-xl font-bold text-blue-600 mb-3">🔬 1. Investir dans la recherche IA responsable</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Soutenir le développement d'IA alignée sur les valeurs humaines. Participer aux initiatives de recherche éthique et de sécurité IA.
                </p>
                <span className="text-sm text-blue-500 font-medium">Vision long terme</span>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl border border-indigo-200/50">
                <h3 className="text-xl font-bold text-indigo-600 mb-3">🔄 2. Préparer les transitions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Anticiper les transformations et accompagner les collaborateurs. Créer des programmes de formation continue et de reconversion.
                </p>
                <span className="text-sm text-indigo-500 font-medium">Gestion du changement</span>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200/50">
                <h3 className="text-xl font-bold text-purple-600 mb-3">🏛️ 3. Participer au débat public</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  S'impliquer dans les discussions sur la gouvernance de l'IA. Contribuer aux réflexions sectorielles et réglementaires.
                </p>
                <span className="text-sm text-purple-500 font-medium">Responsabilité sociétale</span>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/30 dark:to-red-900/30 rounded-xl border border-pink-200/50">
                <h3 className="text-xl font-bold text-pink-600 mb-3">🎯 4. Développer une vision long terme</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Intégrer les enjeux IA dans la stratégie d'entreprise. Créer un comité d'éthique IA et définir des principes directeurs.
                </p>
                <span className="text-sm text-pink-500 font-medium">Stratégie d'entreprise</span>
              </div>
            </div>
          </div>
        </section>

        {/* Points clés à retenir */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-indigo-300/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-indigo-300 mb-6">
              Points clés à retenir
            </h2>
            
            <ul className="space-y-4">
              {[
                "Évolution de Life 1.0 (biologique) à Life 3.0 (technologique)",
                "12 scénarios d'évolution de l'IA, du plus optimiste au plus risqué",
                "Enjeux de sécurité et d'alignement de l'IA avec les valeurs humaines",
                "Impact long terme sur l'économie et l'organisation des entreprises",
                "Importance de la gouvernance et de l'éthique de l'IA",
                "Rôle des dirigeants dans l'orientation du développement IA",
                "Préservation des compétences humaines essentielles"
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-500 text-xl mr-3 mt-1">✓</span>
                  <span className="text-gray-800 dark:text-gray-200 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pour qui ce livre ? */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-indigo-300/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-indigo-300 mb-6">
              Pour qui ce livre ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Dirigeants d'entreprise",
                "Stratèges et planificateurs",
                "Consultants en transformation",
                "Responsables innovation",
                "Leaders technologiques"
              ].map((profile, index) => (
                <div key={index} className="flex items-center p-3 bg-indigo-500/10 rounded-lg">
                  <span className="text-indigo-500 text-lg mr-3">👤</span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{profile}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mon avis terrain */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-2xl shadow-xl p-8 border border-indigo-300/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-ink dark:text-indigo-300">
                  Mon avis terrain
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Laurent Serre - Expert développement commercial PME</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
              <p className="text-lg leading-relaxed mb-6">
                Un livre dense mais fascinant. Tegmark ne fait pas de la science-fiction, il analyse sérieusement les enjeux long terme de l'IA.
              </p>
              
              <h3 className="text-xl font-bold text-indigo-500 mb-4">Ce qui m'interpelle pour mes clients dirigeants :</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>L'IA va transformer l'entreprise plus vite et plus profondément qu'on ne l'imagine</li>
                <li>Il faut commencer dès maintenant à réfléchir aux enjeux éthiques</li>
                <li>Les compétences humaines (empathie, créativité, jugement) deviennent plus précieuses, pas moins</li>
                <li>La gouvernance de l'IA devient un enjeu stratégique pour les entreprises</li>
                <li>Anticiper les transformations permet de les subir moins brutalement</li>
              </ul>
              
              <h3 className="text-xl font-bold text-indigo-500 mb-4">Applications concrètes avec mes clients :</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                  <h4 className="font-semibold text-indigo-600 mb-2">Groupe industriel (120 salariés)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Création d'un comité d'éthique IA inspiré des recommandations du livre
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Résultat : Cadre éthique clair, +50% d'adhésion équipes aux projets IA
                  </p>
                </div>
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg">
                  <h4 className="font-semibold text-cyan-600 mb-2">PME Services (25 salariés)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Réflexion stratégique long terme sur l'évolution des métiers
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Résultat : Plan de formation 3 ans, anticipation des transformations
                  </p>
                </div>
              </div>
              
              <div className="bg-indigo-100/50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-indigo-600 mb-2">⚠️ Attention :</p>
                <p>
                  Ne tombez pas dans la paralysie face à ces enjeux énormes. L'idée c'est d'avoir une vision long terme tout en agissant concrètement aujourd'hui. 
                  Commencez petit, apprenez vite, adaptez-vous. La prospective doit nourrir l'action, pas la bloquer.
                </p>
              </div>
              
              <div className="bg-green-100/50 dark:bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-green-600 mb-2">🎯 Conseil stratégique :</p>
                <p>
                  Utilisez ce livre pour sensibiliser vos équipes aux enjeux long terme, mais restez pragmatique. 
                  L'objectif n'est pas de prédire l'avenir mais de développer l'adaptabilité et l'esprit critique face aux transformations IA.
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4.1 ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">4.1/5</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                  Essentiel pour les dirigeants visionnaires
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Livres complémentaires */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-indigo-300/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-indigo-300 mb-6">
              Livres complémentaires
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/ai-superpowers"
                className="group p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-300/20 hover:border-indigo-400/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink dark:text-indigo-300 mb-3 group-hover:text-indigo-500 transition-colors">
                  AI Superpowers
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Pour comprendre les enjeux géopolitiques de l'IA
                </p>
                <span className="text-indigo-500 font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/human-machine"
                className="group p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-300/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink dark:text-indigo-300 mb-3 group-hover:text-purple-500 transition-colors">
                  Human + Machine
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Pour l'aspect opérationnel de la collaboration IA
                </p>
                <span className="text-purple-500 font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Stratégie */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-2xl shadow-xl p-8 text-center border border-indigo-300/30">
            <div className="inline-block bg-indigo-500/30 text-indigo-300 font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
              Préparez l'avenir de votre entreprise
            </div>
            <h3 className="text-3xl font-bold text-blue-ink dark:text-indigo-300 mb-4">
              Stratégie IA pour dirigeants
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
              Accompagnement stratégique pour intégrer l'IA dans votre vision d'entreprise. Définissez votre feuille de route et préparez vos équipes aux transformations à venir.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-indigo-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              Planifier ma stratégie IA
            </Link>
          </div>
        </section>

        {/* Navigation retour */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link 
            href="/ressources/meilleurs-livres/digital-ai" 
            className="inline-flex items-center text-indigo-300 hover:text-indigo-200 text-lg font-medium transition-colors"
          >
            <span className="mr-2">←</span>
            Retour à Digital & AI Sales
          </Link>
        </div>
      </main>
    </>
  );
}