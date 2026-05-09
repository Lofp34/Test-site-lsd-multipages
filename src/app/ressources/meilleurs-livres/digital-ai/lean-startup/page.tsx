import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Lean Startup : résumé complet | Digital & AI Sales | Laurent Serre',
  description: 'Résumé détaillé, concepts clés, conseils terrain et avis de The Lean Startup (Eric Ries). Approche test & learn pour la transformation commerciale digitale.',
  keywords: [
    'lean startup',
    'eric ries',
    'mvp',
    'build measure learn',
    'innovation commerciale',
    'test and learn',
    'laurent serre'
  ],
  openGraph: {
    title: 'The Lean Startup : résumé complet | Digital & AI Sales',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de The Lean Startup (Eric Ries). Approche test & learn pour la transformation commerciale.',
    type: 'article',
    url: 'https://www.laurentserre.com/ressources/meilleurs-livres/digital-ai/lean-startup',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/og-lean-startup.jpg',
        width: 1200,
        height: 630,
        alt: 'The Lean Startup - Résumé par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/meilleurs-livres/digital-ai/lean-startup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Lean Startup : résumé complet | Digital & AI Sales',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de The Lean Startup (Eric Ries).',
    images: ['https://www.laurentserre.com/images/og-lean-startup.jpg'],
  }
};

// Données structurées Schema.org
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "The Lean Startup",
  "author": {
    "@type": "Person",
    "name": "Eric Ries"
  },
  "datePublished": "2011",
  "description": "Lean Startup propose une méthode agile pour innover en contexte d'incertitude extrême : construire rapidement un MVP, mesurer les retours, apprendre et itérer.",
  "genre": "Business",
  "inLanguage": "en",
  "numberOfPages": "336",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.2",
    "ratingCount": "900",
    "bestRating": "5"
  }
};

const reviewStructuredData = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Book",
    "name": "The Lean Startup",
    "author": {
      "@type": "Person",
      "name": "Eric Ries"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.2",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Laurent Serre"
  },
  "reviewBody": "Un classique qui reste d'actualité ! Ries a posé les bases de l'innovation agile que j'applique avec tous mes clients dans leur transformation commerciale."
};

export default function LeanStartupPage() {
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
      
      <main className="bg-gradient-to-br from-emerald-600 via-lime-500/20 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-12">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-emerald-500/20 text-emerald-300 font-semibold rounded-full px-4 py-2 text-sm shadow-md backdrop-blur mb-2">
              Digital & AI Sales
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              The Lean Startup
            </h1>
            <p className="text-xl text-emerald-300 font-semibold mb-2">
              Eric Ries <span className="text-white/60 font-normal">— 2011</span>
            </p>
            <p className="text-lg text-white/90 italic mb-6 max-w-2xl mx-auto">
              Approche test & learn pour la transformation commerciale digitale
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                Facile
              </span>
              <span className="bg-blue-ink/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                6h de lecture
              </span>
              <div className="flex items-center bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">⭐</span>
                <span>4.2/5</span>
              </div>
              <span className="bg-lime-500/20 text-lime-300 px-3 py-1 rounded-full text-sm font-medium">
                Impact Opérationnel
              </span>
            </div>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-emerald-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Résumé détaillé
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="text-lg leading-relaxed mb-6">
                Eric Ries révolutionne l'approche de l'innovation avec sa méthodologie Lean Startup, particulièrement pertinente pour les équipes commerciales qui naviguent dans la transformation digitale.
              </p>

              <h3 className="text-2xl font-bold text-emerald-500 mb-4">Les 5 principes fondamentaux</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
                  <h4 className="text-xl font-bold text-emerald-600 mb-3">🚀 1. Les entrepreneurs sont partout</h4>
                  <p className="text-gray-700">
                    Pas besoin d'être dans une startup. Tout commercial qui teste de nouvelles approches est un entrepreneur.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-green-50 to-lime-50 rounded-xl border border-green-200/50">
                  <h4 className="text-xl font-bold text-green-600 mb-3">⚙️ 2. L'entrepreneuriat est du management</h4>
                  <p className="text-gray-700">
                    Il faut une discipline et des processus pour gérer l'innovation dans l'incertitude.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-lime-50 to-yellow-50 rounded-xl border border-lime-200/50">
                  <h4 className="text-xl font-bold text-lime-600 mb-3">📊 3. Validated Learning</h4>
                  <p className="text-gray-700">
                    Apprendre ce que veulent vraiment les clients avec des données réelles, pas des opinions.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50">
                  <h4 className="text-xl font-bold text-yellow-600 mb-3">🔄 4. Build-Measure-Learn</h4>
                  <p className="text-gray-700">
                    Le cycle fondamental d'innovation rapide.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200/50 mb-8">
                <h4 className="text-xl font-bold text-orange-600 mb-3">📈 5. Innovation Accounting</h4>
                <p className="text-gray-700">
                  Mesurer les progrès dans un contexte d'incertitude avec des métriques actionnables.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-emerald-500 mb-4">Le cycle Build-Measure-Learn appliqué au commercial</h3>
              
              <div className="space-y-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-200/50">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">🔨 Build (Construire)</h4>
                  <p className="text-gray-700 mb-3">
                    Créer un MVP de votre nouvelle approche commerciale
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tester un nouveau script de prospection sur 50 appels</li>
                    <li>• Lancer un pilote d'automatisation sur une partie du pipeline</li>
                    <li>• Créer un chatbot simple pour qualifier les leads</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
                  <h4 className="text-xl font-bold text-emerald-600 mb-3">📏 Measure (Mesurer)</h4>
                  <p className="text-gray-700 mb-3">
                    Définir des métriques d'apprentissage (pas juste de vanité)
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Taux de réponse, qualité des leads générés</li>
                    <li>• Temps gagné, satisfaction client</li>
                    <li>• Focus sur les métriques actionnables</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-green-50 to-lime-50 rounded-xl border border-green-200/50">
                  <h4 className="text-xl font-bold text-green-600 mb-3">🧠 Learn (Apprendre)</h4>
                  <p className="text-gray-700 mb-3">
                    Analyser les résultats pour valider ou invalider les hypothèses
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Décider : persévérer ou pivoter ?</li>
                    <li>• Identifier les conditions de succès</li>
                    <li>• Ajuster la stratégie selon les apprentissages</li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg mb-6">
                <h4 className="text-lg font-bold text-emerald-600 mb-3">🎯 Principe clé</h4>
                <p>
                  L'objectif n'est pas de construire le produit parfait, mais d'apprendre le plus rapidement possible ce qui fonctionne vraiment avec vos clients. Échouez vite, échouez peu cher, apprenez beaucoup.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Cas d'usage en développement commercial */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-emerald-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Cas d'usage en développement commercial
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-200/50">
                <h3 className="text-xl font-bold text-blue-600 mb-3">🤖 Test d'outils IA</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-blue-500">Hypothèse :</span>
                    <span className="text-gray-700 ml-2">"Un chatbot peut qualifier 30% de nos leads entrants"</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-500">MVP :</span>
                    <span className="text-gray-700 ml-2">Chatbot simple sur une landing page</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-500">Mesure :</span>
                    <span className="text-gray-700 ml-2">Taux de qualification, satisfaction client</span>
                  </div>
                  <div>
                    <span className="font-semibold text-lime-500">Apprentissage :</span>
                    <span className="text-gray-700 ml-2">Ajuster ou abandonner selon les résultats</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
                <h3 className="text-xl font-bold text-emerald-600 mb-3">📹 Nouvelle approche de prospection</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-blue-500">Hypothèse :</span>
                    <span className="text-gray-700 ml-2">"La prospection vidéo augmente le taux de réponse"</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-500">MVP :</span>
                    <span className="text-gray-700 ml-2">100 vidéos personnalisées vs 100 emails classiques</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-500">Mesure :</span>
                    <span className="text-gray-700 ml-2">Taux d'ouverture, de réponse, de RDV obtenus</span>
                  </div>
                  <div>
                    <span className="font-semibold text-lime-500">Apprentissage :</span>
                    <span className="text-gray-700 ml-2">Valider l'efficacité et les conditions de succès</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-green-50 to-lime-50 rounded-xl border border-green-200/50">
                <h3 className="text-xl font-bold text-green-600 mb-3">🔍 Innovation dans le processus de vente</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-blue-500">Hypothèse :</span>
                    <span className="text-gray-700 ml-2">"Un diagnostic digital améliore la conversion"</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-500">MVP :</span>
                    <span className="text-gray-700 ml-2">Outil de diagnostic simple pour 20 prospects</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-500">Mesure :</span>
                    <span className="text-gray-700 ml-2">Engagement, temps de cycle, taux de closing</span>
                  </div>
                  <div>
                    <span className="font-semibold text-lime-500">Apprentissage :</span>
                    <span className="text-gray-700 ml-2">Identifier les améliorations nécessaires</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pièges à éviter */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-emerald-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Pièges à éviter
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-red-50 rounded-xl border border-red-200/50">
                <h3 className="text-xl font-bold text-red-600 mb-3">📊 Vanity Metrics</h3>
                <p className="text-gray-700 mb-3">
                  Se concentrer sur des chiffres flatteurs mais non actionnables
                </p>
                <div className="text-sm text-red-500">
                  <p><strong>Exemple :</strong> Nombre de vues vs taux de conversion</p>
                </div>
              </div>
              
              <div className="p-6 bg-orange-50 rounded-xl border border-orange-200/50">
                <h3 className="text-xl font-bold text-orange-600 mb-3">🔧 Feature Creep</h3>
                <p className="text-gray-700 mb-3">
                  Ajouter des fonctionnalités sans valider leur utilité
                </p>
                <div className="text-sm text-orange-500">
                  <p><strong>Exemple :</strong> Complexifier un outil avant de tester sa base</p>
                </div>
              </div>
              
              <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200/50">
                <h3 className="text-xl font-bold text-yellow-600 mb-3">✨ Perfect Product Syndrome</h3>
                <p className="text-gray-700 mb-3">
                  Attendre la perfection avant de tester
                </p>
                <div className="text-sm text-yellow-500">
                  <p><strong>Exemple :</strong> Développer 6 mois avant le premier test client</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Points clés à retenir */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-emerald-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Points clés à retenir
            </h2>
            
            <ul className="space-y-4">
              {[
                "Cycle Build-Measure-Learn pour l'innovation commerciale",
                "Validated Learning : apprendre avec des données réelles",
                "MVP (Minimum Viable Product) appliqué aux processus commerciaux",
                "Innovation Accounting : mesurer les progrès dans l'incertitude",
                "Culture d'expérimentation et d'itération rapide",
                "Distinction entre métriques actionnables et vanity metrics",
                "Décision persévérer vs pivoter basée sur l'apprentissage"
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-500 text-xl mr-3 mt-1">✓</span>
                  <span className="text-gray-800 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pour qui ce livre ? */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-emerald-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Pour qui ce livre ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Équipes commerciales en transformation",
                "Managers innovants",
                "Responsables digitalisation",
                "Entrepreneurs commerciaux",
                "Consultants en innovation"
              ].map((profile, index) => (
                <div key={index} className="flex items-center p-3 bg-emerald-500/10 rounded-lg">
                  <span className="text-emerald-500 text-lg mr-3">👤</span>
                  <span className="text-gray-800 font-medium">{profile}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mon avis terrain */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-emerald-500/10 to-lime-500/10 rounded-2xl shadow-xl p-8 border border-emerald-300/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-ink">
                  Mon avis terrain
                </h2>
                <p className="text-gray-600">Laurent Serre - Expert développement commercial PME</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="text-lg leading-relaxed mb-6">
                Un classique qui reste d'actualité ! Ries a posé les bases de l'innovation agile que j'applique avec tous mes clients dans leur transformation commerciale.
              </p>
              
              <h3 className="text-xl font-bold text-emerald-500 mb-4">Ce qui marche en pratique avec mes clients :</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>Tester petit avant d'investir gros (MVP commercial)</li>
                <li>Mesurer ce qui compte vraiment (pas les vanity metrics)</li>
                <li>Accepter l'échec rapide pour apprendre vite</li>
                <li>Itérer sur les processus commerciaux comme sur un produit</li>
                <li>Impliquer les équipes dans l'expérimentation</li>
              </ul>
              
              <h3 className="text-xl font-bold text-emerald-500 mb-4">Succès concrets d'application :</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <h4 className="font-semibold text-emerald-600 mb-2">PME SaaS (22 salariés)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Application Build-Measure-Learn pour tester une nouvelle approche de prospection
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Résultat : +150% de taux de réponse, validation en 3 semaines au lieu de 6 mois
                  </p>
                </div>
                <div className="p-4 bg-lime-50 rounded-lg">
                  <h4 className="font-semibold text-lime-600 mb-2">Industrie (65 salariés)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    MVP d'un processus de vente consultative avant déploiement complet
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Résultat : Validation du concept, évitement d'un investissement de 50k€ inadapté
                  </p>
                </div>
              </div>
              
              <div className="bg-emerald-100/50 border-l-4 border-emerald-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-emerald-600 mb-2">💡 Exemple concret :</p>
                <p>
                  Avant d'équiper toute l'équipe d'un CRM IA, testez sur 3 commerciaux pendant 1 mois. Mesurez l'impact réel, ajustez, puis déployez. 
                  La méthode Lean Startup évite les gros ratés coûteux dans la digitalisation commerciale.
                </p>
              </div>
              
              <div className="bg-orange-100/50 border-l-4 border-orange-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-orange-600 mb-2">⚠️ Piège classique :</p>
                <p>
                  Mes clients tombent souvent dans le perfectionnisme : "On va d'abord tout préparer parfaitement". 
                  Non ! Lancez imparfait, apprenez vite, ajustez. L'excellence vient de l'itération, pas de la planification.
                </p>
              </div>
              
              <div className="bg-green-100/50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-green-600 mb-2">🎯 Action immédiate :</p>
                <p>
                  Identifiez une innovation commerciale que vous voulez tester (nouveau script, outil, processus). 
                  Définissez votre hypothèse, créez un MVP en 1 semaine, testez sur 2 semaines, mesurez et décidez.
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4.2 ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800">4.2/5</span>
                <span className="text-sm text-gray-600 ml-4">
                  Méthodologie appliquée par 100% de mes clients en transformation
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Livres complémentaires */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-emerald-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Livres complémentaires
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/human-machine"
                className="group p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-300/20 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-emerald-500 transition-colors">
                  Human + Machine
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour l'implémentation opérationnelle de l'IA
                </p>
                <span className="text-emerald-500 font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/the-second-machine-age"
                className="group p-6 bg-gradient-to-r from-green-500/10 to-lime-500/10 rounded-xl border border-green-300/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-green-500 transition-colors">
                  The Second Machine Age
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour comprendre le contexte de la transformation
                </p>
                <span className="text-green-500 font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Innovation */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-emerald-500/20 to-lime-500/20 rounded-2xl shadow-xl p-8 text-center border border-emerald-300/30">
            <div className="inline-block bg-emerald-500/30 text-emerald-300 font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
              Appliquez la méthode Lean Startup
            </div>
            <h3 className="text-3xl font-bold text-blue-ink mb-4">
              Accompagnement Innovation Commerciale
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Mise en place de la culture test & learn dans votre équipe commerciale. Méthodologie, outils et accompagnement pour innover sans risque.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-emerald-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              Lancer mon innovation commerciale
            </Link>
          </div>
        </section>

        {/* Navigation retour */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link 
            href="/ressources/meilleurs-livres/digital-ai" 
            className="inline-flex items-center text-emerald-300 hover:text-emerald-200 text-lg font-medium transition-colors"
          >
            <span className="mr-2">←</span>
            Retour à Digital & AI Sales
          </Link>
        </div>
      </main>
    </>
  );
}