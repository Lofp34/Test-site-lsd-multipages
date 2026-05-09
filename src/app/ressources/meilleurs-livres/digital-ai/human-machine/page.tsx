import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Human + Machine : résumé complet | Digital & AI Sales | Laurent Serre',
  description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Human + Machine (Daugherty & Wilson). Collaboration homme-machine en vente.',
  keywords: [
    'human machine',
    'paul daugherty',
    'james wilson',
    'collaboration homme machine',
    'ia commercial',
    'nouveaux rôles commerciaux',
    'laurent serre'
  ],
  openGraph: {
    title: 'Human + Machine : résumé complet | Digital & AI Sales',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Human + Machine (Daugherty & Wilson). Collaboration homme-machine en vente.',
    type: 'article',
    url: 'https://www.laurentserre.com/ressources/meilleurs-livres/digital-ai/human-machine',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/og-human-machine.jpg',
        width: 1200,
        height: 630,
        alt: 'Human + Machine - Résumé par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/meilleurs-livres/digital-ai/human-machine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Human + Machine : résumé complet | Digital & AI Sales',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Human + Machine (Daugherty & Wilson).',
    images: ['https://www.laurentserre.com/images/og-human-machine.jpg'],
  }
};

// Données structurées Schema.org
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Human + Machine",
  "author": [
    {
      "@type": "Person",
      "name": "Paul Daugherty"
    },
    {
      "@type": "Person", 
      "name": "James Wilson"
    }
  ],
  "datePublished": "2018",
  "description": "Ce livre se concentre sur la transformation concrète du travail par l'IA et propose le concept de fusion homme-machine. Plutôt que de voir l'IA comme une automatisation pure remplaçant l'humain, les auteurs décrivent comment l'IA peut augmenter les humains dans leurs tâches.",
  "genre": "Technology",
  "inLanguage": "en",
  "numberOfPages": "304",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "650",
    "bestRating": "5"
  }
};

const reviewStructuredData = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Book",
    "name": "Human + Machine",
    "author": [
      {
        "@type": "Person",
        "name": "Paul Daugherty"
      },
      {
        "@type": "Person",
        "name": "James Wilson"
      }
    ]
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Laurent Serre"
  },
  "reviewBody": "Enfin un livre qui ne tombe ni dans la panique ni dans l'utopie. Daugherty et Wilson montrent la voie du milieu : la collaboration intelligente."
};

export default function HumanMachinePage() {
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
      
      <main className="bg-gradient-to-br from-cyan-600 via-blue-500/20 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-12">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-cyan-500/20 text-cyan-300 font-semibold rounded-full px-4 py-2 text-sm shadow-md backdrop-blur mb-2">
              Digital & AI Sales
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Human + Machine
            </h1>
            <p className="text-xl text-cyan-300 font-semibold mb-2">
              Paul Daugherty & James Wilson <span className="text-white/60 font-normal">— 2018</span>
            </p>
            <p className="text-lg text-white/90 italic mb-6 max-w-2xl mx-auto">
              Réinventer les processus commerciaux avec l'IA : collaboration homme-machine
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-orange-soft/20 text-orange-soft px-3 py-1 rounded-full text-sm font-medium">
                Intermédiaire
              </span>
              <span className="bg-blue-ink/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                5h de lecture
              </span>
              <div className="flex items-center bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">⭐</span>
                <span>4.5/5</span>
              </div>
              <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                Pertinence Future: 4.7/5
              </span>
            </div>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-cyan-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Résumé détaillé
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="text-lg leading-relaxed mb-6">
                Daugherty et Wilson, dirigeants d'Accenture, proposent une vision révolutionnaire : l'avenir n'est ni à l'automatisation totale ni au statu quo, mais à la collaboration intelligente entre humains et machines.
              </p>

              <h3 className="text-2xl font-bold text-cyan-500 mb-4">Le "Missing Middle" : la zone de collaboration</h3>
              
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-8 border border-cyan-200/50">
                <p className="text-gray-700 mb-4">
                  Entre les tâches purement humaines et celles entièrement automatisées existe une zone hybride où la collaboration homme-machine crée le plus de valeur. C'est dans ce "Missing Middle" que se trouvent les plus grandes opportunités commerciales.
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-l-lg">Humain seul</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 font-bold">MISSING MIDDLE</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-cyan-500 text-white px-4 py-2 rounded-r-lg">IA seule</div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-cyan-500 mb-4">Les nouveaux rôles humains avec l'IA</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                  <h4 className="text-xl font-bold text-green-600 mb-3">🎯 1. Entraîneur (Trainer)</h4>
                  <p className="text-gray-700 mb-3">
                    Enseigner aux systèmes IA comment se comporter
                  </p>
                  <div className="text-sm text-green-600 font-medium">
                    Exemple : Former l'IA à reconnaître les signaux d'achat, entraîner un chatbot à qualifier les leads
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">💡 2. Explicateur (Explainer)</h4>
                  <p className="text-gray-700 mb-3">
                    Rendre les décisions IA compréhensibles
                  </p>
                  <div className="text-sm text-blue-600 font-medium">
                    Exemple : Expliquer pourquoi l'IA recommande tel prospect, justifier un score de lead
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                  <h4 className="text-xl font-bold text-purple-600 mb-3">🛡️ 3. Mainteneur (Sustainer)</h4>
                  <p className="text-gray-700 mb-3">
                    S'assurer que l'IA fonctionne de manière responsable
                  </p>
                  <div className="text-sm text-purple-600 font-medium">
                    Exemple : Vérifier que l'IA ne discrimine pas, auditer les algorithmes de scoring
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-cyan-500 mb-4">Les nouveaux rôles IA pour augmenter l'humain</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200/50">
                  <h4 className="text-xl font-bold text-orange-600 mb-3">🚀 Amplificateur</h4>
                  <p className="text-gray-700 mb-3">
                    L'IA amplifie les capacités humaines
                  </p>
                  <div className="text-sm text-orange-600 font-medium">
                    Assistant IA qui prépare les RDV en analysant le profil client
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200/50">
                  <h4 className="text-xl font-bold text-teal-600 mb-3">🤝 Interacteur</h4>
                  <p className="text-gray-700 mb-3">
                    L'IA facilite les interactions humaines
                  </p>
                  <div className="text-sm text-teal-600 font-medium">
                    Traduction en temps réel lors de négociations internationales
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200/50">
                  <h4 className="text-xl font-bold text-indigo-600 mb-3">✨ Incarnateur</h4>
                  <p className="text-gray-700 mb-3">
                    L'IA donne corps aux idées humaines
                  </p>
                  <div className="text-sm text-indigo-600 font-medium">
                    Génération automatique de propositions commerciales personnalisées
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Applications concrètes en vente */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-cyan-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Applications concrètes en vente
            </h2>
            
            <div className="space-y-8">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">🎯 Prospection augmentée</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white/50 rounded-lg">
                    <h4 className="font-bold text-blue-600 mb-2">🤖 Rôle de l'IA</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Identifie et score les prospects</li>
                      <li>• Analyse les signaux d'achat</li>
                      <li>• Optimise les moments de contact</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg">
                    <h4 className="font-bold text-cyan-600 mb-2">👤 Rôle de l'humain</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Personnalise l'approche</li>
                      <li>• Crée la relation de confiance</li>
                      <li>• Adapte le message au contexte</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">🤝 Négociation hybride</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white/50 rounded-lg">
                    <h4 className="font-bold text-purple-600 mb-2">🤖 Rôle de l'IA</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Analyse en temps réel les signaux</li>
                      <li>• Suggère des arguments</li>
                      <li>• Calcule les marges de manœuvre</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg">
                    <h4 className="font-bold text-pink-600 mb-2">👤 Rôle de l'humain</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Adapte sa stratégie</li>
                      <li>• Gère l'émotion et l'empathie</li>
                      <li>• Prend les décisions finales</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                <h3 className="text-2xl font-bold text-green-600 mb-4">📊 Suivi client intelligent</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white/50 rounded-lg">
                    <h4 className="font-bold text-green-600 mb-2">🤖 Rôle de l'IA</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Détecte les signaux de satisfaction</li>
                      <li>• Identifie les risques de churn</li>
                      <li>• Propose des actions correctives</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg">
                    <h4 className="font-bold text-emerald-600 mb-2">👤 Rôle de l'humain</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Intervient au bon moment</li>
                      <li>• Apporte la bonne approche</li>
                      <li>• Résout les problèmes complexes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exemples concrets d'implémentation */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-cyan-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Exemples concrets d'implémentation
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                <h3 className="text-xl font-bold text-blue-600 mb-3">🏦 Secteur Bancaire</h3>
                <p className="text-gray-700 mb-3">
                  L'IA prépare des analyses de risque que l'expert humain vérifie et adapte selon le contexte client et les enjeux relationnels.
                </p>
                <div className="flex items-center text-sm text-blue-500 font-medium">
                  <span className="mr-2">📈</span>
                  Résultat : +40% de précision dans l'évaluation, +25% de satisfaction client
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                <h3 className="text-xl font-bold text-purple-600 mb-3">🛒 E-commerce B2B</h3>
                <p className="text-gray-700 mb-3">
                  L'IA gère la recommandation de base et l'optimisation des prix, tandis que les humains conçoivent le contenu créatif et les expériences client personnalisées.
                </p>
                <div className="flex items-center text-sm text-purple-500 font-medium">
                  <span className="mr-2">🎯</span>
                  Résultat : +60% de taux de conversion, +35% de panier moyen
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                <h3 className="text-xl font-bold text-green-600 mb-3">🏭 Industrie Manufacturing</h3>
                <p className="text-gray-700 mb-3">
                  L'IA analyse les données de production pour identifier les opportunités de vente additionnelle, que les commerciaux transforment en propositions sur-mesure.
                </p>
                <div className="flex items-center text-sm text-green-500 font-medium">
                  <span className="mr-2">⚡</span>
                  Résultat : +50% d'upselling, +30% de fidélisation client
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Points clés à retenir */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-cyan-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Points clés à retenir
            </h2>
            
            <ul className="space-y-4">
              {[
                "Concept du 'Missing Middle' : zone de collaboration homme-machine optimale",
                "6 nouveaux rôles : 3 humains (trainer, explainer, sustainer) + 3 IA (amplifier, interact, embody)",
                "L'IA augmente l'humain plutôt que de le remplacer",
                "Nécessité de repenser les processus métier pour intégrer l'IA",
                "Importance de la formation des équipes à la collaboration avec l'IA",
                "Création de nouveaux indicateurs de performance hybrides",
                "Exemples concrets d'implémentation dans différents secteurs"
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-cyan-500 text-xl mr-3 mt-1">✓</span>
                  <span className="text-gray-800 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pour qui ce livre ? */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-cyan-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Pour qui ce livre ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Managers commerciaux",
                "Directeurs des ventes",
                "Responsables transformation digitale",
                "Consultants en organisation",
                "Équipes commerciales en transition IA"
              ].map((profile, index) => (
                <div key={index} className="flex items-center p-3 bg-cyan-500/10 rounded-lg">
                  <span className="text-cyan-500 text-lg mr-3">👤</span>
                  <span className="text-gray-800 font-medium">{profile}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mon avis terrain */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl shadow-xl p-8 border border-cyan-300/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mr-4">
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
                Enfin un livre qui ne tombe ni dans la panique ("l'IA va nous remplacer") ni dans l'utopie ("l'IA va tout résoudre"). Daugherty et Wilson montrent la voie du milieu : la collaboration intelligente.
              </p>
              
              <h3 className="text-xl font-bold text-cyan-500 mb-4">Ce qui marche concrètement avec mes clients :</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>Identifier dans votre processus commercial où l'IA peut assister (pas remplacer)</li>
                <li>Former vos commerciaux à "entraîner" les outils IA</li>
                <li>Créer des binômes homme-machine sur les tâches complexes</li>
                <li>Développer les nouveaux rôles : trainer, explainer, sustainer</li>
                <li>Mesurer l'impact de la collaboration, pas juste l'automatisation</li>
              </ul>
              
              <h3 className="text-xl font-bold text-cyan-500 mb-4">Exemples de mise en œuvre réussie :</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-cyan-50 rounded-lg">
                  <h4 className="font-semibold text-cyan-600 mb-2">PME Tech (40 salariés)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Mise en place du "Missing Middle" : IA + commercial sur la qualification
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Résultat : +70% de leads qualifiés, satisfaction commerciaux +45%
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Services B2B (18 salariés)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Formation équipe aux rôles "trainer" et "explainer" d'IA
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Résultat : Adoption IA 95%, performance équipe +35%
                  </p>
                </div>
              </div>
              
              <div className="bg-cyan-100/50 border-l-4 border-cyan-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-cyan-600 mb-2">⚠️ Erreur à éviter :</p>
                <p>
                  Vouloir automatiser tout d'un coup. Commencez par une tâche, maîtrisez la collaboration, puis étendez progressivement. 
                  L'IA n'est pas un remplaçant mais un super-assistant. Mes clients qui échouent sont ceux qui négligent la formation humaine.
                </p>
              </div>
              
              <div className="bg-green-100/50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-green-600 mb-2">🎯 Conseil stratégique :</p>
                <p>
                  Investissez dans la formation de vos équipes aux nouveaux rôles. Le commercial de demain sera celui qui sait orchestrer l'IA pour créer plus de valeur client. 
                  C'est un changement de posture, pas juste d'outils. Commencez par identifier vos "amplificateurs" naturels dans l'équipe.
                </p>
              </div>
              
              <div className="bg-orange-100/50 border-l-4 border-orange-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-orange-600 mb-2">💡 Action immédiate :</p>
                <p>
                  Cartographiez vos processus commerciaux et identifiez 3 zones de "Missing Middle" où humain + IA créeraient plus de valeur que chacun séparément. 
                  Testez sur une zone pendant 1 mois avant d'étendre.
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4.5 ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800">4.5/5</span>
                <span className="text-sm text-gray-600 ml-4">
                  Le guide pratique de référence pour la collaboration IA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Livres complémentaires */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-cyan-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Livres complémentaires
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/ai-superpowers"
                className="group p-6 bg-gradient-to-r from-purple-500/10 to-red-500/10 rounded-xl border border-purple-300/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-purple-500 transition-colors">
                  AI Superpowers
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour comprendre l'évolution géopolitique de l'IA
                </p>
                <span className="text-purple-500 font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/the-second-machine-age"
                className="group p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-300/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-blue-500 transition-colors">
                  The Second Machine Age
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour comprendre l'impact économique du numérique
                </p>
                <span className="text-blue-500 font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Formation */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl shadow-xl p-8 text-center border border-cyan-300/30">
            <div className="inline-block bg-cyan-500/30 text-cyan-300 font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
              Transformez votre équipe avec l'IA
            </div>
            <h3 className="text-3xl font-bold text-blue-ink mb-4">
              Formation : Collaboration Homme-Machine en Vente
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Accompagnement personnalisé pour développer les nouveaux rôles commerciaux et maîtriser la collaboration avec l'IA. Formation pratique avec cas d'usage concrets.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-cyan-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              Demander un accompagnement
            </Link>
          </div>
        </section>

        {/* Navigation retour */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link 
            href="/ressources/meilleurs-livres/digital-ai" 
            className="inline-flex items-center text-cyan-300 hover:text-cyan-200 text-lg font-medium transition-colors"
          >
            <span className="mr-2">←</span>
            Retour à Digital & AI Sales
          </Link>
        </div>
      </main>
    </>
  );
}