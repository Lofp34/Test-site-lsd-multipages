import Link from 'next/link';
import { Metadata } from 'next';
import CrossCategoryBookSuggestions from '@/components/ui/CrossCategoryBookSuggestions';
import ContextualCTAs from '@/components/ui/ContextualCTAs';
import { generateCrossCategorySuggestions, generateContextualCTAs } from '@/utils/cross-category-suggestions';

export const metadata: Metadata = {
  title: 'Good to Great : résumé et leçons de leadership',
  description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Good to Great (Jim Collins). Les facteurs durables de la réussite organisationnelle et du leadership de niveau 5.',
  keywords: [
    'good to great',
    'jim collins',
    'leadership niveau 5',
    'management commercial',
    'transformation entreprise',
    'hedgehog concept',
    'laurent serre'
  ],
  openGraph: {
    title: 'Good to Great : résumé complet | Sales Management & Leadership',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Good to Great (Jim Collins). Les facteurs durables de la réussite organisationnelle.',
    type: 'article',
    url: 'https://www.laurentserre.com/ressources/meilleurs-livres/sales-management/good-to-great',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/meilleurs-livres/sales-management/good-to-great',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Good to Great : résumé complet | Sales Management & Leadership',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Good to Great (Jim Collins).',
  }
};

// Données structurées Schema.org
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Good to Great",
  "author": {
    "@type": "Person",
    "name": "Jim Collins"
  },
  "datePublished": "2001",
  "description": "Résultat d'une étude approfondie sur des entreprises ayant fait le saut de 'bonnes' à 'excellentes', ce livre identifie les facteurs durables de la réussite organisationnelle.",
  "genre": "Management",
  "inLanguage": "en",
  "numberOfPages": "320",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "ratingCount": "1000",
    "bestRating": "5"
  }
};

const reviewStructuredData = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Book",
    "name": "Good to Great",
    "author": {
      "@type": "Person",
      "name": "Jim Collins"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.6",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Laurent Serre"
  },
  "reviewBody": "Un classique absolu que je recommande à tous les managers commerciaux. Collins a fait un boulot de recherche exceptionnel - du concret, pas du blabla de consultant."
};

export default function GoodToGreatPage() {
  // Données du livre actuel
  const currentBook = {
    slug: "good-to-great",
    title: "Good to Great",
    author: "Jim Collins",
    year: 2001,
    cover: "/covers/good-to-great.jpg",
    tagline: "Les facteurs durables de la réussite organisationnelle",
    summary: "Résultat d'une étude approfondie sur des entreprises ayant fait le saut de 'bonnes' à 'excellentes'.",
    difficulty: "Intermédiaire" as const,
    readingTime: "8h",
    rating: 4.6,
    category: "sales-management"
  };

  // Générer les suggestions cross-catégories
  const crossCategorySuggestions = generateCrossCategorySuggestions(currentBook, 'sales-management', 2);
  
  // Générer les CTAs contextuels
  const contextualCTAs = generateContextualCTAs(currentBook, 'sales-management');

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
            <h1 className="text-4xl md:text-6xl font-bold text-primary-title mb-4 drop-shadow-lg">
              Good to Great
            </h1>
            <p className="text-xl text-primary-secondary font-semibold mb-2">
              Jim Collins <span className="text-primary-secondary/70 font-normal">— 2001</span>
            </p>
            <p className="text-lg text-primary-secondary/90 italic mb-6 max-w-2xl mx-auto">
              Les facteurs durables de la réussite organisationnelle
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-orange-soft/20 text-orange-soft px-3 py-1 rounded-full text-sm font-medium">
                Intermédiaire
              </span>
              <span className="bg-blue-ink/20 text-primary-secondary px-3 py-1 rounded-full text-sm font-medium">
                8h de lecture
              </span>
              <div className="flex items-center bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">⭐</span>
                <span>4.6/5</span>
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
                Jim Collins et son équipe ont analysé pendant 5 ans plus de 1 400 entreprises pour identifier celles qui ont réussi la transition de "bonnes" à "excellentes" et maintenu cette excellence pendant au moins 15 ans. Cette recherche rigoureuse a révélé des patterns surprenants qui défient les idées reçues sur le leadership et la performance.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Leadership de Niveau 5</h3>
              <p className="mb-6">
                Contrairement aux leaders charismatiques médiatisés, les dirigeants des entreprises excellentes combinent une humilité personnelle profonde avec une volonté professionnelle féroce. Ils canalisent leur ambition vers l'entreprise, pas vers leur ego.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Who First, Then What</h3>
              <p className="mb-6">
                Les leaders exceptionnels commencent par recruter les bonnes personnes, les placer aux bons postes, et se séparer des mauvaises personnes. Seulement après, ils définissent la direction. "Si vous avez les bonnes personnes dans le bus, le problème de la motivation disparaît."
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Le Concept du Hérisson</h3>
              <p className="mb-6">
                Se concentrer sur l'intersection de trois cercles : ce en quoi vous pouvez être le meilleur au monde, ce qui alimente votre moteur économique, et ce qui allume votre passion.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Confronter la réalité brutale</h3>
              <p className="mb-6">
                Le paradoxe de Stockdale - maintenir une foi inébranlable dans le succès final tout en confrontant honnêtement les faits les plus brutaux de la réalité actuelle.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Culture de discipline</h3>
              <p className="mb-6">
                Créer une culture où les gens disciplinés s'engagent dans une réflexion disciplinée et prennent des actions disciplinées.
              </p>
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
                "Leadership de niveau 5 : humilité + détermination",
                "Who First, Then What : constituer la bonne équipe d'abord",
                "Hedgehog Concept : intersection passion/excellence/économie",
                "Confrontation honnête de la réalité (Stockdale Paradox)",
                "Effet Flywheel : momentum par efforts cumulatifs",
                "Culture de discipline et rigueur"
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
                "Managers commerciaux",
                "Leaders d'équipe",
                "Consultants en transformation",
                "Entrepreneurs"
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
                Un classique absolu que je recommande à tous les managers commerciaux. Collins a fait un boulot de recherche exceptionnel - du concret, pas du blabla de consultant.
              </p>
              
              <h3 className="text-xl font-bold text-mint-green mb-4">Ce qui marche vraiment en management commercial :</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>Le "Who First" : recruter d'abord les bonnes personnes, former ensuite</li>
                <li>Le Concept du Hérisson appliqué à l'équipe : sur quoi peut-on être les meilleurs ?</li>
                <li>La culture de discipline : fixer des règles claires et s'y tenir</li>
              </ul>
              
              <div className="bg-orange-soft/20 border-l-4 border-orange-soft p-4 rounded-r-lg">
                <p className="font-semibold text-orange-soft mb-2">⚠️ Attention :</p>
                <p>
                  Ne tombez pas dans le piège du leadership de niveau 5 mal compris. Humilité ne veut pas dire faiblesse. Les meilleurs managers commerciaux que je connais sont exigeants ET bienveillants.
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4.6 ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800">4.6/5</span>
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
                href="/ressources/meilleurs-livres/sales-management/high-output-management"
                className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-mint-green transition-colors">
                  High Output Management
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour l'aspect opérationnel du management
                </p>
                <span className="text-mint-green font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/sales-management/leaders-eat-last"
                className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-mint-green transition-colors">
                  Leaders Eat Last
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour approfondir le leadership bienveillant
                </p>
                <span className="text-mint-green font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-category book suggestions */}
        <CrossCategoryBookSuggestions 
          currentBook={currentBook}
          suggestedBooks={crossCategorySuggestions}
        />

        {/* Contextual CTAs */}
        <ContextualCTAs 
          ctas={contextualCTAs}
          title="Transformez votre leadership"
          subtitle="Appliquez les principes de Good to Great à votre équipe commerciale avec nos formations et outils spécialisés"
        />

        {/* Outils de management recommandés */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-mint-green/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              🛠️ Outils de management recommandés
            </h2>
            
            <p className="text-gray-700 mb-6">
              Pour mettre en pratique les concepts de leadership et management abordés dans Good to Great
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/ressources/kit-gestion-grands-comptes"
                className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">🏢</span>
                  <h3 className="text-xl font-bold text-blue-ink group-hover:text-mint-green transition-colors">
                    Kit Gestion Grands Comptes
                  </h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Outils et templates pour appliquer les principes Good to Great à vos comptes stratégiques
                </p>
                <span className="text-mint-green font-medium group-hover:underline">
                  Découvrir le kit →
                </span>
              </Link>
              
              <Link 
                href="/ressources/outil-strategie-commerciale"
                className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">📈</span>
                  <h3 className="text-xl font-bold text-blue-ink group-hover:text-mint-green transition-colors">
                    Framework Stratégie Commerciale
                  </h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Définir et piloter votre Hedgehog Concept commercial avec méthode
                </p>
                <span className="text-mint-green font-medium group-hover:underline">
                  Télécharger l'outil →
                </span>
              </Link>
            </div>
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