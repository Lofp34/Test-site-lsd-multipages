import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Superpowers : résumé complet | Digital & AI Sales | Laurent Serre',
  description: 'Résumé détaillé, concepts clés, conseils terrain et avis de AI Superpowers (Kai-Fu Lee). Anticiper l\'évolution des métiers commerciaux à l\'ère de l\'IA.',
  keywords: [
    'ai superpowers',
    'kai-fu lee',
    'intelligence artificielle',
    'métiers commerciaux',
    'transformation ia',
    'vente consultative',
    'laurent serre'
  ],
  openGraph: {
    title: 'AI Superpowers : résumé complet | Digital & AI Sales',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de AI Superpowers (Kai-Fu Lee). Anticiper l\'évolution des métiers commerciaux à l\'ère de l\'IA.',
    type: 'article',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai/ai-superpowers',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurent-serre-developpement.fr/images/og-ai-superpowers.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Superpowers - Résumé par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre Développement',
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/digital-ai/ai-superpowers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Superpowers : résumé complet | Digital & AI Sales',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de AI Superpowers (Kai-Fu Lee).',
    images: ['https://laurent-serre-developpement.fr/images/og-ai-superpowers.jpg'],
  }
};

// Données structurées Schema.org
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "AI Superpowers",
  "author": {
    "@type": "Person",
    "name": "Kai-Fu Lee"
  },
  "datePublished": "2018",
  "description": "Un livre passionnant écrit par un pionnier de l'IA sino-américain, qui compare l'avancée de l'intelligence artificielle aux États-Unis et en Chine et analyse ses implications géopolitiques et socio-économiques.",
  "genre": "Technology",
  "inLanguage": "en",
  "numberOfPages": "272",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.4",
    "ratingCount": "800",
    "bestRating": "5"
  }
};

const reviewStructuredData = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Book",
    "name": "AI Superpowers",
    "author": {
      "@type": "Person",
      "name": "Kai-Fu Lee"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.4",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Laurent Serre"
  },
  "reviewBody": "Un livre qui fait réfléchir sans tomber dans la panique ou l'utopie. Lee a une vision équilibrée : l'IA va transformer le métier, pas le supprimer."
};

export default function AISuperPowersPage() {
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
      
      <main className="bg-gradient-to-br from-purple-600 via-red-500/20 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-12">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-purple-500/20 text-purple-300 font-semibold rounded-full px-4 py-2 text-sm shadow-md backdrop-blur mb-2">
              Digital & AI Sales
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              AI Superpowers
            </h1>
            <p className="text-xl text-purple-300 font-semibold mb-2">
              Kai-Fu Lee <span className="text-white/60 font-normal">— 2018</span>
            </p>
            <p className="text-lg text-white/90 italic mb-6 max-w-2xl mx-auto">
              Anticiper l'évolution des métiers commerciaux à l'ère de l'IA
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-orange-soft/20 text-orange-soft px-3 py-1 rounded-full text-sm font-medium">
                Intermédiaire
              </span>
              <span className="bg-blue-ink/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                6h de lecture
              </span>
              <div className="flex items-center bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">⭐</span>
                <span>4.4/5</span>
              </div>
              <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                Pertinence Future: 5/5
              </span>
            </div>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-purple-300/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-purple-300 mb-6">
              Résumé détaillé
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
              <p className="text-lg leading-relaxed mb-6">
                Kai-Fu Lee, figure emblématique de l'IA mondiale (ancien dirigeant de Google Chine, Microsoft, Apple), livre une analyse géopolitique et économique saisissante de la révolution IA en cours.
              </p>

              <h3 className="text-2xl font-bold text-purple-500 mb-4">Les quatre vagues de l'IA</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200/50">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">🌐 1. IA Internet</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Algorithmes de recommandation, publicité ciblée, e-commerce personnalisé. Cette vague transforme déjà la prospection digitale et le marketing commercial.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200/50">
                  <h4 className="text-xl font-bold text-purple-600 mb-3">💼 2. IA Business</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Automatisation des processus métier, analyse prédictive, optimisation des opérations. Impact direct sur les CRM, la qualification de leads et le pilotage commercial.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl border border-green-200/50">
                  <h4 className="text-xl font-bold text-green-600 mb-3">👁️ 3. IA Perception</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Reconnaissance vocale, visuelle, traitement du langage naturel. Révolutionne l'interface client (chatbots, assistants virtuels, analyse de sentiment).
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl border border-orange-200/50">
                  <h4 className="text-xl font-bold text-orange-600 mb-3">🤖 4. IA Autonome</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Véhicules autonomes, robots, systèmes entièrement automatisés. Impact à plus long terme sur la logistique et la livraison.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-purple-500 mb-4">Impact sur les métiers commerciaux</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200/50">
                  <h4 className="text-xl font-bold text-red-600 mb-4">⚠️ Métiers menacés</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Téléprospection basique (IA conversationnelle)</li>
                    <li>• Qualification de leads simple (scoring automatique)</li>
                    <li>• Reporting et administration des ventes</li>
                    <li>• Vente transactionnelle répétitive</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200/50">
                  <h4 className="text-xl font-bold text-green-600 mb-4">✅ Métiers renforcés</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Vente consultative complexe</li>
                    <li>• Négociation stratégique</li>
                    <li>• Gestion de comptes clés</li>
                    <li>• Innovation commerciale</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-purple-500 mb-4">La course géopolitique USA-Chine</h3>
              <p className="mb-6">
                Lee analyse comment les deux superpuissances développent des approches différentes de l'IA : les États-Unis misent sur l'innovation breakthrough, la Chine sur l'implémentation massive et l'exploitation des données. Cette course a des implications directes pour les entreprises occidentales qui doivent choisir leurs partenaires technologiques.
              </p>

              <div className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
                <h4 className="text-lg font-bold text-purple-600 mb-3">Vision humaniste de Kai-Fu Lee</h4>
                <p>
                  L'auteur propose un nouveau contrat social où l'IA libère l'humain pour se concentrer sur ce qu'il fait de mieux : créer du lien, de l'empathie et du sens. Les commerciaux doivent cultiver ces compétences "IA-proof".
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Stratégies d'adaptation pour dirigeants PME */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-purple-300/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-purple-300 mb-6">
              Stratégies d'adaptation pour dirigeants PME
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200/50">
                <h3 className="text-xl font-bold text-blue-600 mb-3">🎯 1. Développer les compétences relationnelles</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Investir massivement dans la formation aux soft skills : empathie, écoute active, intelligence émotionnelle. Ces compétences deviennent votre avantage concurrentiel face à l'IA.
                </p>
                <span className="text-sm text-blue-500 font-medium">Priorité immédiate</span>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200/50">
                <h3 className="text-xl font-bold text-purple-600 mb-3">🧠 2. Se spécialiser dans la vente consultative</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Transformer vos commerciaux en consultants experts. Plus la vente est complexe et personnalisée, moins elle est automatisable.
                </p>
                <span className="text-sm text-purple-500 font-medium">Transformation métier</span>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl border border-green-200/50">
                <h3 className="text-xl font-bold text-green-600 mb-3">🤝 3. Maîtriser l'IA comme assistant</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Former vos équipes à utiliser l'IA pour automatiser les tâches répétitives et se concentrer sur la valeur ajoutée humaine.
                </p>
                <span className="text-sm text-green-500 font-medium">Formation continue</span>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl border border-orange-200/50">
                <h3 className="text-xl font-bold text-orange-600 mb-3">🚀 4. Cultiver la créativité et l'adaptabilité</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Encourager l'innovation commerciale, l'expérimentation et la capacité à s'adapter rapidement aux changements du marché.
                </p>
                <span className="text-sm text-orange-500 font-medium">Culture d'entreprise</span>
              </div>
            </div>
          </div>
        </section>

        {/* Points clés à retenir */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-purple-300/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-purple-300 mb-6">
              Points clés à retenir
            </h2>
            
            <ul className="space-y-4">
              {[
                "Quatre vagues de l'IA : Internet, Business, Perception, Autonome",
                "40-50% des emplois affectés dans les 15 prochaines années",
                "Métiers commerciaux menacés vs métiers renforcés par l'IA",
                "Importance croissante des compétences relationnelles et émotionnelles",
                "L'IA comme assistant, pas comme remplaçant du commercial",
                "Nécessité de se spécialiser dans la vente consultative",
                "Course géopolitique USA-Chine et implications business"
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-500 text-xl mr-3 mt-1">✓</span>
                  <span className="text-gray-800 dark:text-gray-200 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pour qui ce livre ? */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-purple-300/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-purple-300 mb-6">
              Pour qui ce livre ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Commerciaux inquiets de l'IA",
                "Dirigeants planifiant la transformation",
                "Managers d'équipes commerciales",
                "Consultants en évolution des métiers",
                "Professionnels en reconversion"
              ].map((profile, index) => (
                <div key={index} className="flex items-center p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-purple-500 text-lg mr-3">👤</span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{profile}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mon avis terrain */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-purple-500/10 to-red-500/10 rounded-2xl shadow-xl p-8 border border-purple-300/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-ink dark:text-purple-300">
                  Mon avis terrain
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Laurent Serre - Expert développement commercial PME</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
              <p className="text-lg leading-relaxed mb-6">
                Un livre qui fait réfléchir sans tomber dans la panique ou l'utopie. Lee a une vision équilibrée : l'IA va transformer le métier, pas le supprimer.
              </p>
              
              <h3 className="text-xl font-bold text-purple-500 mb-4">Ce qui rassure mes clients PME :</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>Les ventes complexes B2B restent humaines (relation, confiance, conseil)</li>
                <li>L'IA devient un super-assistant pour les tâches répétitives</li>
                <li>Les meilleurs commerciaux seront ceux qui sauront allier IA et intelligence émotionnelle</li>
                <li>Les PME peuvent tirer parti de l'IA sans investissements massifs</li>
                <li>La transformation se fait progressivement, pas du jour au lendemain</li>
              </ul>
              
              <h3 className="text-xl font-bold text-purple-500 mb-4">Retours d'expérience concrets :</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <h4 className="font-semibold text-purple-600 mb-2">PME Services (30 salariés)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Formation équipe aux "métiers renforcés par l'IA" selon le livre
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Résultat : +40% de confiance équipe, -25% de résistance au changement
                  </p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                  <h4 className="font-semibold text-red-600 mb-2">Industrie (60 salariés)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Repositionnement commercial vers la vente consultative
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Résultat : +60% de valeur moyenne des deals, satisfaction client +30%
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-100/50 dark:bg-purple-900/30 border-l-4 border-purple-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-purple-600 mb-2">🎯 Conseil stratégique :</p>
                <p>
                  Investissez dès maintenant dans vos compétences relationnelles et consultatives. C'est votre assurance-vie face à l'automatisation. 
                  Les commerciaux qui survivront sont ceux qui créent de la valeur humaine irremplaçable.
                </p>
              </div>
              
              <div className="bg-orange-100/50 dark:bg-orange-900/30 border-l-4 border-orange-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-orange-600 mb-2">⚡ Action immédiate :</p>
                <p>
                  Faites l'audit de vos tâches commerciales : lesquelles peuvent être automatisées (qualification, reporting) ? 
                  Lesquelles nécessitent l'humain (négociation complexe, conseil stratégique) ? 
                  Réorganisez votre temps en conséquence.
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4.4 ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">4.4/5</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                  Livre de référence pour 90% de mes clients en transformation IA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Livres complémentaires */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-purple-300/20">
            <h2 className="text-3xl font-bold text-blue-ink dark:text-purple-300 mb-6">
              Livres complémentaires
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/human-machine"
                className="group p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-300/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink dark:text-purple-300 mb-3 group-hover:text-purple-500 transition-colors">
                  Human + Machine
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Pour comprendre la collaboration homme-IA
                </p>
                <span className="text-purple-500 font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/the-second-machine-age"
                className="group p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-300/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink dark:text-purple-300 mb-3 group-hover:text-blue-500 transition-colors">
                  The Second Machine Age
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
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
          <div className="bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-2xl shadow-xl p-8 text-center border border-purple-300/30">
            <div className="inline-block bg-purple-500/30 text-purple-300 font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
              Préparez votre équipe à l'ère de l'IA
            </div>
            <h3 className="text-3xl font-bold text-blue-ink dark:text-purple-300 mb-4">
              Formation : Vendre à l'ère de l'IA
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
              Accompagnement personnalisé pour transformer votre équipe commerciale et développer les compétences IA-proof. Stratégie, formation et mise en œuvre.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-purple-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              Demander un accompagnement
            </Link>
          </div>
        </section>

        {/* Navigation retour */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link 
            href="/ressources/meilleurs-livres/digital-ai" 
            className="inline-flex items-center text-purple-300 hover:text-purple-200 text-lg font-medium transition-colors"
          >
            <span className="mr-2">←</span>
            Retour à Digital & AI Sales
          </Link>
        </div>
      </main>
    </>
  );
}