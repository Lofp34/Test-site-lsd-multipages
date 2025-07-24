import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blue Ocean Strategy : résumé complet | Sales Management & Leadership | Laurent Serre',
  description: 'Résumé détaillé, matrice ERAC, innovation-valeur et avis terrain de Blue Ocean Strategy (Kim & Mauborgne). Créer de nouveaux espaces stratégiques et sortir de la concurrence.',
  keywords: [
    'blue ocean strategy',
    'kim mauborgne',
    'innovation valeur',
    'matrice erac',
    'stratégie océan bleu',
    'management commercial',
    'laurent serre'
  ],
  openGraph: {
    title: 'Blue Ocean Strategy : résumé complet | Sales Management & Leadership',
    description: 'Résumé détaillé, matrice ERAC, innovation-valeur et avis terrain de Blue Ocean Strategy (Kim & Mauborgne). Créer de nouveaux espaces stratégiques.',
    type: 'article',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/blue-ocean-strategy',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/blue-ocean-strategy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blue Ocean Strategy : résumé complet | Sales Management & Leadership',
    description: 'Résumé détaillé, matrice ERAC, innovation-valeur et avis terrain de Blue Ocean Strategy (Kim & Mauborgne).',
  }
};

// Données structurées Schema.org
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Blue Ocean Strategy",
  "author": [
    {
      "@type": "Person",
      "name": "W. Chan Kim"
    },
    {
      "@type": "Person",
      "name": "Renée Mauborgne"
    }
  ],
  "datePublished": "2005",
  "description": "Un livre de stratégie d'entreprise au retentissement mondial, qui prône de quitter les 'océans rouges' saturés de concurrence pour créer son propre 'océan bleu' de marché incontesté.",
  "genre": "Strategy",
  "inLanguage": "en",
  "numberOfPages": "256",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.3",
    "ratingCount": "800",
    "bestRating": "5"
  }
};

const reviewStructuredData = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Book",
    "name": "Blue Ocean Strategy",
    "author": [
      {
        "@type": "Person",
        "name": "W. Chan Kim"
      },
      {
        "@type": "Person",
        "name": "Renée Mauborgne"
      }
    ]
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.3",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Laurent Serre"
  },
  "reviewBody": "Un livre qui change la façon de voir la stratégie commerciale. Fini la guerre des prix, place à l'innovation-valeur. Particulièrement pertinent pour les PME qui ne peuvent pas rivaliser sur les coûts avec les gros."
};

export default function BlueOceanStrategyPage() {
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
              Blue Ocean Strategy
            </h1>
            <p className="text-xl text-mint-green font-semibold mb-2">
              W. Chan Kim & Renée Mauborgne <span className="text-white/60 font-normal">— 2005</span>
            </p>
            <p className="text-lg text-white/90 italic mb-6 max-w-2xl mx-auto">
              Créer de nouveaux espaces stratégiques et sortir de la concurrence
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
                <span>4.3/5</span>
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
            
            <div className="prose prose-lg max-w-none text-gray-800
              <p className="text-lg leading-relaxed mb-6">
                Kim et Mauborgne révolutionnent la pensée stratégique avec leur concept d'océan bleu. Leur recherche sur plus de 150 mouvements stratégiques dans 30 industries révèle que les entreprises les plus performantes ne battent pas la concurrence, elles la rendent obsolète.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Océan Rouge vs Océan Bleu</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200
                  <h4 className="font-bold text-red-600 mb-2">🔴 Océan Rouge</h4>
                  <p className="text-sm">
                    Marché existant saturé de concurrents qui se battent pour des parts de marché limitées. La concurrence rend l'eau rouge de sang. <strong>Stratégie : battre la concurrence.</strong>
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200
                  <h4 className="font-bold text-blue-600 mb-2">🔵 Océan Bleu</h4>
                  <p className="text-sm">
                    Espace stratégique inexploré où la demande est créée plutôt que disputée. Pas de concurrence car les règles du jeu n'existent pas encore. <strong>Stratégie : rendre la concurrence non pertinente.</strong>
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Innovation-Valeur : Le Cœur de la Stratégie</h3>
              <p className="mb-6">
                Au lieu de choisir entre différenciation (plus de valeur, coût plus élevé) ou domination par les coûts (moins de valeur, coût plus bas), l'innovation-valeur vise simultanément la différenciation ET la réduction des coûts. C'est la clé pour créer un océan bleu.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">La Matrice ERAC : L'Outil Révolutionnaire</h3>
              <div className="bg-mint-green/10 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-red-600 mb-2">🗑️ ÉLIMINER</h4>
                    <p className="text-sm mb-4">Quels facteurs tenus pour acquis par l'industrie doivent être éliminés ?</p>
                    
                    <h4 className="font-bold text-orange-600 mb-2">📉 RÉDUIRE</h4>
                    <p className="text-sm">Quels facteurs doivent être réduits bien en-dessous du standard de l'industrie ?</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-600 mb-2">📈 AUGMENTER</h4>
                    <p className="text-sm mb-4">Quels facteurs doivent être augmentés bien au-dessus du standard de l'industrie ?</p>
                    
                    <h4 className="font-bold text-blue-600 mb-2">✨ CRÉER</h4>
                    <p className="text-sm">Quels facteurs jamais offerts par l'industrie doivent être créés ?</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Exemples Iconiques d'Océans Bleus</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li><strong>Cirque du Soleil</strong> : Réinvention du cirque en éliminant les animaux, réduisant les coûts, augmentant l'artistique et créant une expérience théâtrale</li>
                <li><strong>Southwest Airlines</strong> : Aviation accessible en éliminant les repas, réduisant les services, augmentant la fréquence et créant la convivialité</li>
                <li><strong>Nintendo Wii</strong> : Gaming familial en éliminant la complexité, réduisant les graphismes, augmentant l'interactivité et créant le mouvement</li>
              </ul>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Les 6 Principes de la Stratégie Océan Bleu</h3>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Reconstruire les frontières du marché</li>
                <li>Se focaliser sur la vision d'ensemble, pas sur les chiffres</li>
                <li>Aller au-delà de la demande existante</li>
                <li>Bien séquencer la stratégie</li>
                <li>Surmonter les obstacles organisationnels</li>
                <li>Intégrer l'exécution dans la stratégie</li>
              </ol>
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
                "Distinction océan rouge (concurrence) vs océan bleu (innovation)",
                "Concept d'innovation-valeur : différenciation + réduction des coûts",
                "Matrice ERAC pour repenser son offre (Éliminer, Réduire, Augmenter, Créer)",
                "Canevas stratégique pour visualiser les opportunités",
                "6 principes pour formuler et exécuter une stratégie océan bleu",
                "Méthodes pour reconstruire les frontières du marché"
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-mint-green text-xl mr-3 mt-1">✓</span>
                  <span className="text-gray-800 text-lg">{point}</span>
                </li>
              ))}
            </ul>
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
                "Directeurs stratégie",
                "Managers innovation",
                "Consultants en stratégie",
                "Entrepreneurs disruptifs"
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
                <h2 className="text-2xl font-bold text-blue-ink
                  Mon avis terrain
                </h2>
                <p className="text-gray-600 Serre</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-800
              <p className="text-lg leading-relaxed mb-6">
                Un livre qui change la façon de voir la stratégie commerciale. Fini la guerre des prix, place à l'innovation-valeur. Particulièrement pertinent pour les PME qui ne peuvent pas rivaliser sur les coûts avec les gros.
              </p>
              
              <h3 className="text-xl font-bold text-mint-green mb-4">Ce qui marche en développement commercial :</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>La matrice ERAC appliquée à son offre (révélateur !)</li>
                <li>L'approche pour sortir de la concurrence frontale</li>
                <li>La création de nouveaux segments de marché</li>
                <li>L'innovation-valeur pour les PME : différencier sans exploser les coûts</li>
              </ul>
              
              <h3 className="text-xl font-bold text-mint-green mb-4">Application concrète pour les PME :</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="mb-3">
                  <strong>Exemple :</strong> Une PME de services informatiques face aux gros intégrateurs
                </p>
                <ul className="text-sm space-y-1">
                  <li><strong>ÉLIMINER :</strong> Les process lourds, la bureaucratie</li>
                  <li><strong>RÉDUIRE :</strong> Les délais de mise en œuvre</li>
                  <li><strong>AUGMENTER :</strong> La proximité client, la réactivité</li>
                  <li><strong>CRÉER :</strong> Un service de formation utilisateur inclus</li>
                </ul>
              </div>
              
              <div className="bg-orange-soft/20 border-l-4 border-orange-soft p-4 rounded-r-lg">
                <p className="font-semibold text-orange-soft mb-2">⚠️ Erreur classique :</p>
                <p>
                  Vouloir créer un océan bleu sans maîtriser son océan rouge. Commencez par exceller sur votre marché actuel, puis innovez. Et attention : un océan bleu attire vite les requins !
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4.3 ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800
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
                href="/ressources/meilleurs-livres/sales-management/innovators-dilemma"
                className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-mint-green transition-colors">
                  The Innovator's Dilemma
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour comprendre les mécanismes de l'innovation disruptive
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
                  Pour l'excellence opérationnelle avant l'innovation
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
              Créez votre océan bleu commercial
            </div>
            <h3 className="text-3xl font-bold text-blue-ink mb-4">
              Découvrez le Bootcamp Commercial Intensif
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Appliquez les principes de Blue Ocean Strategy à votre développement commercial. Sortez de la concurrence et créez votre propre espace de marché.
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