import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Innovator\'s Dilemma — résumé et leçons pour commerciaux',
  description: 'Le dilemme de l\'innovateur expliqué aux commerciaux et managers : disruption, sustaining innovation, et comment anticiper le changement sans tout casser.',
  keywords: [
    'innovators dilemma',
    'clayton christensen',
    'innovation disruptive',
    'disruption technologique',
    'management innovation',
    'transformation entreprise',
    'laurent serre'
  ],
  openGraph: {
    title: 'The Innovator\'s Dilemma : résumé complet | Sales Management & Leadership',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de The Innovator\'s Dilemma (Clayton Christensen). Innovation disruptive vs sustaining.',
    type: 'article',
    url: 'https://www.laurentserre.com/ressources/meilleurs-livres/sales-management/innovators-dilemma',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/meilleurs-livres/sales-management/innovators-dilemma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Innovator\'s Dilemma — résumé et leçons pour commerciaux',
    description: 'Le dilemme de l\'innovateur expliqué aux commerciaux : disruption et anticipation du changement.',
  }
};

// Données structurées Schema.org
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "The Innovator's Dilemma",
  "author": {
    "@type": "Person",
    "name": "Clayton Christensen"
  },
  "datePublished": "1997",
  "description": "Un livre culte en gestion de l'innovation, qui explique pourquoi les entreprises leaders échouent parfois en dépit de décisions apparemment excellentes.",
  "genre": "Management",
  "inLanguage": "en",
  "numberOfPages": "286",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "800",
    "bestRating": "5"
  }
};

const reviewStructuredData = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Book",
    "name": "The Innovator's Dilemma",
    "author": {
      "@type": "Person",
      "name": "Clayton Christensen"
    }
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
  "reviewBody": "Un livre prophétique qui explique pourquoi tant d'entreprises leaders disparaissent. Christensen a vu juste : Kodak, Nokia, Blockbuster... tous victimes du dilemme de l'innovateur."
};

export default function InnovatorsDilemmaPage() {
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
              The Innovator's Dilemma
            </h1>
            <p className="text-xl text-mint-green font-semibold mb-2">
              Clayton Christensen <span className="text-white/60 font-normal">— 1997</span>
            </p>
            <p className="text-lg text-white/90 italic mb-6 max-w-2xl mx-auto">
              Pourquoi les entreprises leaders échouent face à l'innovation disruptive
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
                <span>4.5/5</span>
              </div>
            </div>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Résumé détaillé
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="text-lg leading-relaxed mb-6">
                Clayton Christensen révolutionne la compréhension de l'innovation avec sa théorie de la disruption. Son analyse de secteurs comme le disque dur, l'acier, ou les ordinateurs révèle un paradoxe troublant : les entreprises les mieux gérées échouent précisément parce qu'elles font ce qu'elles sont censées faire.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Innovation de maintien vs Innovation disruptive</h3>
              
              <div className="bg-mint-green/10 p-6 rounded-lg mb-6">
                <h4 className="text-xl font-bold text-blue-ink mb-3">Innovation de maintien (Sustaining)</h4>
                <p className="mb-4">
                  Améliore les performances des produits existants selon les critères valorisés par les clients actuels. Les leaders du marché excellent dans ce domaine car ils ont les ressources et la motivation pour satisfaire leurs meilleurs clients.
                </p>
                
                <h4 className="text-xl font-bold text-blue-ink mb-3">Innovation disruptive</h4>
                <p>
                  Introduit des produits initialement moins performants selon les critères traditionnels, mais avec de nouveaux attributs (simplicité, accessibilité, coût). Ces innovations créent de nouveaux marchés ou transforment radicalement les marchés existants.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Le dilemme de l'innovateur</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <span className="bg-red-500/20 text-red-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</span>
                  <div>
                    <h4 className="font-bold text-blue-ink mb-2">Écouter les clients</h4>
                    <p>Les entreprises leaders écoutent leurs meilleurs clients qui demandent des améliorations incrémentales, pas des ruptures.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-red-500/20 text-red-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</span>
                  <div>
                    <h4 className="font-bold text-blue-ink mb-2">Maximiser les marges</h4>
                    <p>Les innovations disruptives offrent initialement des marges plus faibles, donc moins attractives.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-red-500/20 text-red-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</span>
                  <div>
                    <h4 className="font-bold text-blue-ink mb-2">Allouer les ressources</h4>
                    <p>Les processus internes favorisent les projets à fort potentiel (marché existant) au détriment des paris incertains.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-red-500/20 text-red-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</span>
                  <div>
                    <h4 className="font-bold text-blue-ink mb-2">Capacités organisationnelles</h4>
                    <p>Les compétences qui font le succès sur le marché actuel peuvent devenir des handicaps face à la disruption.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Solutions proposées</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li><strong>Organisations autonomes :</strong> Créer des entités séparées pour développer les innovations disruptives</li>
                <li><strong>Nouveaux marchés :</strong> Viser des segments non-consommateurs plutôt que concurrencer frontalement</li>
                <li><strong>Critères différents :</strong> Accepter des performances moindres sur les critères traditionnels</li>
                <li><strong>Apprentissage rapide :</strong> Itérer vite pour découvrir ce que veulent les nouveaux clients</li>
              </ul>

              <div className="bg-blue-ink/10 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-blue-ink mb-3">Exemples classiques de disruption</h4>
                <p>
                  Christensen illustre sa théorie avec des exemples devenus classiques : comment les mini-ordinateurs ont tué les mainframes, comment les disques durs 5,25" ont supplanté les 8", comment l'acier mini-mill a révolutionné la sidérurgie.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Points clés à retenir */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Points clés à retenir
            </h2>
            
            <ul className="space-y-4">
              {[
                "Distinction innovation de maintien vs innovation disruptive",
                "Le dilemme : écouter ses clients peut mener à l'échec",
                "Pourquoi les leaders du marché ratent les ruptures technologiques",
                "Stratégies pour gérer l'innovation disruptive en interne",
                "Importance de créer de nouveaux marchés vs améliorer l'existant",
                "Framework pour identifier et réagir aux menaces disruptives"
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-mint-green text-xl mr-3 mt-1">✓</span>
                  <span className="text-gray-800 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Exemples terrain PME françaises */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Exemples terrain adaptés aux PME françaises
            </h2>
            
            <div className="space-y-6">
              <div className="bg-mint-green/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-ink mb-3">🏪 Commerce de proximité vs E-commerce</h3>
                <p className="text-gray-800 mb-3">
                  <strong>Innovation de maintien :</strong> Améliorer l'accueil, agrandir les surfaces, diversifier l'offre
                </p>
                <p className="text-gray-800">
                  <strong>Disruption :</strong> Amazon, initialement "moins bien" (pas de contact physique, délais de livraison) mais avec de nouveaux attributs (choix infini, prix, commodité). Beaucoup de commerces ont ignoré cette menace jusqu'à ce qu'il soit trop tard.
                </p>
              </div>

              <div className="bg-blue-ink/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-ink mb-3">🚗 Taxis vs VTC/Uber</h3>
                <p className="text-gray-800 mb-3">
                  <strong>Innovation de maintien :</strong> Améliorer le service, former les chauffeurs, moderniser les véhicules
                </p>
                <p className="text-gray-800">
                  <strong>Disruption :</strong> Uber, initialement "moins bien" (chauffeurs non professionnels, véhicules personnels) mais avec de nouveaux attributs (géolocalisation, paiement automatique, notation). Les taxis ont résisté au lieu de s'adapter.
                </p>
              </div>

              <div className="bg-orange-soft/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-ink mb-3">🏦 Banques traditionnelles vs Fintech</h3>
                <p className="text-gray-800 mb-3">
                  <strong>Innovation de maintien :</strong> Améliorer l'accueil en agence, créer de nouveaux produits financiers complexes
                </p>
                <p className="text-gray-800">
                  <strong>Disruption :</strong> Revolut, N26, initialement "moins bien" (pas d'agences, services limités) mais avec de nouveaux attributs (100% mobile, frais réduits, simplicité). Beaucoup de banques traditionnelles ont sous-estimé cette menace.
                </p>
              </div>

              <div className="bg-red-500/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-ink mb-3">📚 Formation traditionnelle vs E-learning</h3>
                <p className="text-gray-800 mb-3">
                  <strong>Innovation de maintien :</strong> Améliorer les salles, recruter de meilleurs formateurs, créer des supports plus beaux
                </p>
                <p className="text-gray-800">
                  <strong>Disruption :</strong> Formations en ligne, initialement "moins bien" (pas d'interaction directe, moins de networking) mais avec de nouveaux attributs (accessibilité, coût, flexibilité). Beaucoup d'organismes de formation traditionnels peinent à s'adapter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pour qui ce livre ? */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Pour qui ce livre ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Dirigeants d'entreprise",
                "Directeurs innovation",
                "Managers stratégiques",
                "Entrepreneurs tech",
                "Consultants en transformation"
              ].map((profile, index) => (
                <div key={index} className="flex items-center p-3 bg-mint-green/10 rounded-lg">
                  <span className="text-mint-green text-lg mr-3">👤</span>
                  <span className="text-gray-800 font-medium">{profile}</span>
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
                <h2 className="text-2xl font-bold text-blue-ink">
                  Mon avis terrain
                </h2>
                <p className="text-gray-600">Laurent Serre</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="text-lg leading-relaxed mb-6">
                Un livre prophétique qui explique pourquoi tant d'entreprises leaders disparaissent. Christensen a vu juste : Kodak, Nokia, Blockbuster... tous victimes du dilemme de l'innovateur.
              </p>
              
              <h3 className="text-xl font-bold text-mint-green mb-4">Ce qui compte pour les managers commerciaux :</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>Identifier les signaux faibles de disruption dans son secteur</li>
                <li>Ne pas ignorer les solutions "moins bonnes" qui séduisent de nouveaux clients</li>
                <li>Créer des espaces d'expérimentation séparés</li>
                <li>Surveiller les non-consommateurs autant que les clients actuels</li>
              </ul>
              
              <div className="bg-red-500/20 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-red-600 mb-2">🎯 Leçon clé :</p>
                <p>
                  Vos meilleurs clients peuvent vous mener à l'échec s'ils vous empêchent d'innover. Gardez toujours un œil sur les non-consommateurs et les solutions "inférieures" qui progressent vite.
                </p>
              </div>
              
              <div className="bg-mint-green/20 border-l-4 border-mint-green p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-mint-green mb-2">💡 Application pratique :</p>
                <p>
                  Dans mes accompagnements, j'aide les dirigeants à créer des "labs d'innovation" séparés de leur activité principale. L'objectif : expérimenter sans cannibaliser, explorer sans paralyser.
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4.5 ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800">4.5/5</span>
              </div>
            </div>
          </div>
        </section>

        {/* Livres complémentaires */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Livres complémentaires
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/ressources/meilleurs-livres/sales-management/blue-ocean-strategy"
                className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-mint-green transition-colors">
                  Blue Ocean Strategy
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour créer de nouveaux marchés plutôt que subir la disruption
                </p>
                <span className="text-mint-green font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/sales-management/good-to-great"
                className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-mint-green transition-colors">
                  Good to Great
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour construire une organisation capable de s'adapter aux disruptions
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
              Anticipez les disruptions
            </div>
            <h3 className="text-3xl font-bold text-blue-ink mb-4">
              Découvrez le Bootcamp Commercial Intensif
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Apprenez à identifier les signaux faibles, créer des stratégies d'innovation et transformer votre approche commerciale avant que la concurrence ne vous disrupts.
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