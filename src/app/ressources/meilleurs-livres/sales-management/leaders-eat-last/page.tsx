import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leaders Eat Last : résumé complet | Sales Management & Leadership | Laurent Serre',
  description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Leaders Eat Last (Simon Sinek). Leadership bienveillant, cercle de sécurité et management d\'équipes commerciales.',
  keywords: [
    'leaders eat last',
    'simon sinek',
    'leadership bienveillant',
    'cercle de sécurité',
    'management commercial',
    'confiance équipe',
    'laurent serre'
  ],
  openGraph: {
    title: 'Leaders Eat Last : résumé complet | Sales Management & Leadership',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Leaders Eat Last (Simon Sinek). Leadership bienveillant et cercle de sécurité.',
    type: 'article',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/leaders-eat-last',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/leaders-eat-last',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leaders Eat Last : résumé complet | Sales Management & Leadership',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de Leaders Eat Last (Simon Sinek).',
  }
};

// Données structurées Schema.org
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Leaders Eat Last",
  "author": {
    "@type": "Person",
    "name": "Simon Sinek"
  },
  "datePublished": "2014",
  "description": "Simon Sinek explore le rôle du leader sous l'angle de la confiance et de la sécurité qu'il crée pour son équipe. Il développe l'idée d'un Cercle de sécurité pour créer un environnement de confiance et de loyauté.",
  "genre": "Management",
  "inLanguage": "en",
  "numberOfPages": "368",
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
    "name": "Leaders Eat Last",
    "author": {
      "@type": "Person",
      "name": "Simon Sinek"
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
  "reviewBody": "Un livre qui remet l'humain au centre du leadership. Sinek a raison : dans un monde de plus en plus digitalisé, c'est la qualité relationnelle qui fait la différence."
};

export default function LeadersEatLastPage() {
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
              Leaders Eat Last
            </h1>
            <p className="text-xl text-mint-green font-semibold mb-2">
              Simon Sinek <span className="text-white/60 font-normal">— 2014</span>
            </p>
            <p className="text-lg text-white/90 italic mb-6 max-w-2xl mx-auto">
              Pourquoi certaines équipes se serrent les coudes et d'autres non
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                Débutant
              </span>
              <span className="bg-blue-ink/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                6h de lecture
              </span>
              <div className="flex items-center bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">⭐</span>
                <span>4.4/5</span>
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
                Simon Sinek révèle les secrets du leadership qui inspire la loyauté et la performance exceptionnelle. S'appuyant sur la biologie, l'anthropologie et des exemples concrets d'organisations performantes, il démontre que les meilleurs leaders créent un environnement de sécurité psychologique.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Le Cercle de Sécurité</h3>
              <p className="mb-6">
                Concept central du livre : les leaders efficaces créent un "cercle de sécurité" autour de leur équipe. À l'intérieur de ce cercle, les membres se sentent protégés des dangers externes et peuvent se concentrer sur la coopération plutôt que sur la compétition interne. Cette sécurité psychologique libère la créativité, l'innovation et l'engagement.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Les 4 hormones du leadership</h3>
              
              <h4 className="text-xl font-semibold text-blue-ink mb-3">Endorphine</h4>
              <p className="mb-4">
                Hormone du plaisir et de la persévérance. Libérée lors d'efforts soutenus, elle permet de surmonter les difficultés. Les leaders doivent créer des défis stimulants qui poussent l'équipe à se dépasser.
              </p>

              <h4 className="text-xl font-semibold text-blue-ink mb-3">Dopamine</h4>
              <p className="mb-4">
                Hormone de la récompense et de l'accomplissement. Motivante mais addictive si mal utilisée (focus sur les résultats court terme). Les bons leaders célèbrent les progrès, pas seulement les résultats finaux.
              </p>

              <h4 className="text-xl font-semibold text-blue-ink mb-3">Sérotonine</h4>
              <p className="mb-4">
                Hormone du statut et de la fierté. Libérée quand on se sent respecté et reconnu. Les leaders doivent valoriser publiquement leurs équipes et créer un sentiment d'appartenance.
              </p>

              <h4 className="text-xl font-semibold text-blue-ink mb-3">Ocytocine</h4>
              <p className="mb-6">
                Hormone de la confiance et de l'empathie. Libérée lors d'interactions humaines authentiques. C'est l'hormone clé du leadership : elle crée des liens durables et inspire la loyauté inconditionnelle.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Le danger du cortisol</h3>
              <p className="mb-6">
                Hormone du stress et de la peur. Inhibe la créativité et la coopération. Les mauvais leaders créent un environnement de cortisol permanent, où la peur paralyse l'innovation et détruit la cohésion d'équipe.
              </p>

              <h3 className="text-2xl font-bold text-mint-green mb-4">Principes du leadership bienveillant</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li><strong>Servir d'abord :</strong> Le leader mange en dernier, prend les risques, assume les responsabilités</li>
                <li><strong>Créer la sécurité :</strong> Protéger son équipe des dangers externes et internes</li>
                <li><strong>Développer les autres :</strong> Investir dans la croissance de ses collaborateurs</li>
                <li><strong>Communiquer le pourquoi :</strong> Donner du sens au travail de chacun</li>
                <li><strong>Montrer l'exemple :</strong> Incarner les valeurs qu'on prône</li>
              </ul>
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
                "Concept du Cercle de Sécurité pour créer la confiance d'équipe",
                "Les 4 hormones du leadership : endorphine, dopamine, sérotonine, ocytocine",
                "Importance de la sécurité psychologique pour la performance",
                "Leadership bienveillant : servir son équipe avant soi-même",
                "Impact des hormones de stress (cortisol) sur la créativité et coopération",
                "Méthodes pour créer un environnement de confiance et de loyauté"
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
                "Managers d'équipes",
                "Dirigeants bienveillants",
                "Team leaders",
                "Responsables RH",
                "Coaches en leadership"
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
                Un livre qui remet l'humain au centre du leadership. Sinek a raison : dans un monde de plus en plus digitalisé, c'est la qualité relationnelle qui fait la différence.
              </p>
              
              <h3 className="text-xl font-bold text-mint-green mb-4">Ce qui marche en management commercial :</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>Créer un vrai cercle de sécurité (fini la peur de l'erreur)</li>
                <li>Valoriser publiquement ses commerciaux (sérotonine ++)</li>
                <li>Prendre les responsabilités en cas d'échec (ocytocine de confiance)</li>
                <li>Investir dans le développement de son équipe</li>
                <li>Communiquer le "pourquoi" de chaque action commerciale</li>
              </ul>
              
              <div className="bg-orange-soft/20 border-l-4 border-orange-soft p-4 rounded-r-lg">
                <p className="font-semibold text-orange-soft mb-2">⚠️ Attention :</p>
                <p>
                  Ne tombez pas dans le leadership bisounours. Bienveillant ne veut pas dire laxiste. Les meilleurs leaders que je connais sont exigeants sur les résultats ET protecteurs avec leurs équipes.
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4.4 ? "text-yellow-400" : "text-gray-300"}>⭐</span>
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
                href="/ressources/meilleurs-livres/sales-management/good-to-great"
                className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-mint-green transition-colors">
                  Good to Great
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour les fondamentaux du leadership de niveau 5
                </p>
                <span className="text-mint-green font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
              
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
            </div>
          </div>
        </section>

        {/* CTA Bootcamp */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-mint-green/20 to-blue-ink/20 rounded-2xl shadow-xl p-8 text-center border border-mint-green/30">
            <div className="inline-block bg-mint-green/30 text-mint-green font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
              Passez du livre au terrain
            </div>
            <h3 className="text-3xl font-bold text-blue-ink mb-4">
              Découvrez le Bootcamp Commercial Intensif
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Appliquez les principes du leadership bienveillant à votre équipe commerciale. Formation intensive pour créer un cercle de sécurité et booster la performance collective.
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