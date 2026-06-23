import Link from 'next/link';
import { Metadata } from 'next';
import CrossCategoryBookSuggestions from '@/components/ui/CrossCategoryBookSuggestions';
import ContextualCTAs from '@/components/ui/ContextualCTAs';
import ParticleBackground from '@/components/ui/ParticleBackground';
import AIIcon from '@/components/ui/AIIcon';
import AIInsight from '@/components/ui/AIInsight';
import { generateCrossCategorySuggestions, generateContextualCTAs } from '@/utils/cross-category-suggestions';

export const metadata: Metadata = {
  title: 'Second Machine Age : résumé et impact sur la vente',
  description: 'Résumé détaillé, concepts clés, conseils terrain et avis de The Second Machine Age (Brynjolfsson & McAfee). Comprendre l\'impact économique des technologies numériques sur la vente.',
  keywords: [
    'the second machine age',
    'brynjolfsson mcafee',
    'transformation digitale',
    'automatisation commerciale',
    'technologies numériques',
    'digital sales',
    'laurent serre'
  ],
  openGraph: {
    title: 'The Second Machine Age : résumé complet | Digital & AI Sales',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de The Second Machine Age (Brynjolfsson & McAfee). L\'impact des technologies numériques sur la vente.',
    type: 'article',
    url: 'https://www.laurentserre.com/ressources/meilleurs-livres/digital-ai/the-second-machine-age',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/og-second-machine-age.jpg',
        width: 1200,
        height: 630,
        alt: 'The Second Machine Age - Résumé par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre',
  },
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/meilleurs-livres/digital-ai/the-second-machine-age',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Second Machine Age : résumé complet | Digital & AI Sales',
    description: 'Résumé détaillé, concepts clés, conseils terrain et avis de The Second Machine Age (Brynjolfsson & McAfee).',
    images: ['https://www.laurentserre.com/images/og-second-machine-age.jpg'],
  }
};

// Données structurées Schema.org
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "The Second Machine Age",
  "author": [
    {
      "@type": "Person",
      "name": "Erik Brynjolfsson"
    },
    {
      "@type": "Person", 
      "name": "Andrew McAfee"
    }
  ],
  "datePublished": "2014",
  "description": "Un ouvrage de référence sur l'impact économique des technologies numériques. Les auteurs argumentent que nous vivons une 'seconde révolution industrielle', où les machines augmentent nos capacités mentales avec l'informatique et l'IA.",
  "genre": "Business Technology",
  "inLanguage": "en",
  "numberOfPages": "336",
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
    "name": "The Second Machine Age",
    "author": [
      {
        "@type": "Person",
        "name": "Erik Brynjolfsson"
      },
      {
        "@type": "Person",
        "name": "Andrew McAfee"
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
  "reviewBody": "Un livre fondamental pour comprendre où va le monde commercial. Brynjolfsson et McAfee ne font pas dans la science-fiction, ils analysent des tendances déjà à l'œuvre."
};

export default function TheSecondMachineAgePage() {
  // Données du livre actuel
  const currentBook = {
    slug: "the-second-machine-age",
    title: "The Second Machine Age",
    author: "Erik Brynjolfsson & Andrew McAfee",
    year: 2014,
    cover: "/covers/the-second-machine-age.jpg",
    tagline: "Comprendre l'impact économique des technologies numériques sur la vente",
    summary: "Un ouvrage de référence sur l'impact économique des technologies numériques.",
    difficulty: "Intermédiaire" as const,
    readingTime: "7h",
    rating: 4.3,
    category: "digital-ai"
  };

  // Générer les suggestions cross-catégories
  const crossCategorySuggestions = generateCrossCategorySuggestions(currentBook, 'digital-ai', 2);
  
  // Générer les CTAs contextuels
  const contextualCTAs = generateContextualCTAs(currentBook, 'digital-ai');

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
      
      <main className="relative bg-gradient-to-br from-blue-600 via-purple-600/20 to-primary-bg min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Particle background for technological atmosphere */}
        <ParticleBackground 
          density={25}
          speed={0.2}
          color="#00BDA4"
          opacity={0.3}
          className="absolute inset-0"
        />
        {/* Hero section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-12">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-blue-500/20 text-blue-300 font-semibold rounded-full px-4 py-2 text-sm shadow-md backdrop-blur mb-2">
              Digital & AI Sales
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              The Second Machine Age
            </h1>
            <p className="text-xl text-blue-300 font-semibold mb-2">
              Erik Brynjolfsson & Andrew McAfee <span className="text-white/60 font-normal">— 2014</span>
            </p>
            <p className="text-lg text-white/90 italic mb-6 max-w-2xl mx-auto">
              Comprendre l'impact économique des technologies numériques sur la vente
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-orange-soft/20 text-orange-soft px-3 py-1 rounded-full text-sm font-medium">
                Intermédiaire
              </span>
              <span className="bg-blue-ink/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                7h de lecture
              </span>
              <div className="flex items-center bg-yellow-400/20 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                <span className="mr-1">⭐</span>
                <span>4.3/5</span>
              </div>
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                🤖 Digital
              </span>
            </div>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-blue-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Résumé détaillé
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="text-lg leading-relaxed mb-6">
                Brynjolfsson et McAfee nous plongent dans la "Seconde Ère des Machines", une révolution aussi profonde que celle de la vapeur au 19ème siècle. Mais cette fois, ce ne sont plus nos muscles qui sont augmentés, mais notre cerveau.
              </p>

              <h3 className="text-2xl font-bold text-blue-500 mb-4">Les trois caractéristiques révolutionnaires du numérique</h3>
              
              <h4 className="text-xl font-bold text-blue-400 mb-3">1. Croissance exponentielle</h4>
              <p className="mb-4">
                La loi de Moore (doublement de la puissance tous les 18 mois) crée des progressions soudaines et spectaculaires. Ce qui semblait impossible hier devient banal aujourd'hui.
              </p>

              <h4 className="text-xl font-bold text-blue-400 mb-3">2. Nature digitale</h4>
              <p className="mb-4">
                Une fois créé, un produit numérique peut être reproduit et distribué à coût marginal quasi nul. Cette économie de l'abondance transforme les modèles business traditionnels.
              </p>

              <h4 className="text-xl font-bold text-blue-400 mb-3">3. Caractère combinatoire</h4>
              <p className="mb-6">
                Les technologies se combinent pour créer des innovations exponentielles. L'IA + Big Data + Cloud = nouvelles possibilités infinies.
              </p>

              <h3 className="text-2xl font-bold text-blue-500 mb-4">Impact sur le monde commercial</h3>
              
              <h4 className="text-xl font-bold text-blue-400 mb-3">Automatisation intelligente</h4>
              <p className="mb-4">
                Les tâches commerciales répétitives (qualification de leads, suivi de pipeline, reporting) sont progressivement automatisées, libérant du temps pour les activités à forte valeur ajoutée.
              </p>

              <h4 className="text-xl font-bold text-blue-400 mb-3">Personnalisation de masse</h4>
              <p className="mb-4">
                Les outils digitaux permettent d'adapter l'approche commerciale à chaque prospect à grande échelle, combinant efficacité et personnalisation.
              </p>

              <h4 className="text-xl font-bold text-blue-400 mb-3">Nouveaux modèles économiques</h4>
              <p className="mb-4">
                Freemium, abonnements, plateformes... les modèles traditionnels de vente sont bousculés par des approches digitales.
              </p>

              <h4 className="text-xl font-bold text-blue-400 mb-3">Données comme avantage concurrentiel</h4>
              <p className="mb-6">
                Les entreprises qui maîtrisent leurs données clients obtiennent un avantage décisif en prédiction des besoins et optimisation des processus.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                <h4 className="text-xl font-bold text-blue-600 mb-3">Le paradoxe de la productivité</h4>
                <p>
                  Malgré ces avancées technologiques, la productivité globale stagne. Les auteurs expliquent ce décalage par les temps d'adaptation nécessaires et l'importance de repenser les organisations.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* AI Insights - Applications concrètes avec nouveaux composants */}
        <section className="max-w-6xl mx-auto px-6 mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AIIcon type="digital" size="lg" color="#00BDA4" animated />
              <h2 className="text-3xl font-bold text-white">
                Applications commerciales concrètes
              </h2>
            </div>
            <p className="text-white/80 max-w-2xl mx-auto">
              Comment les concepts du livre se traduisent en outils et processus concrets pour votre équipe commerciale
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <AIInsight
              title="Automatisation Intelligente du Pipeline"
              description="Mise en œuvre des concepts d'automatisation décrits dans le livre pour transformer votre processus commercial. L'IA prend en charge les tâches répétitives pour libérer du temps sur la relation client."
              businessImpact="Réduction de 60% du temps administratif et augmentation de 40% du temps client"
              implementationLevel="Intermédiaire"
              technologies={['CRM Automation', 'Lead Scoring', 'Workflow AI']}
              trend="rising"
            />
            
            <AIInsight
              title="Personnalisation de Masse"
              description="Application directe du caractère 'combinatoire' du numérique : combiner données clients, IA et automatisation pour personnaliser chaque interaction à grande échelle."
              businessImpact="Taux de conversion multiplié par 2.5 grâce à la personnalisation automatisée"
              implementationLevel="Avancé"
              technologies={['Dynamic Content', 'Behavioral Analytics', 'ML Personalization']}
              trend="rising"
            />
            
            <AIInsight
              title="Analyse Prédictive des Opportunités"
              description="Exploitation de la 'croissance exponentielle' des données pour prédire les comportements d'achat et optimiser les efforts commerciaux selon les concepts du livre."
              businessImpact="Amélioration de 35% de la précision des forecasts et priorisation optimale des prospects"
              implementationLevel="Débutant"
              technologies={['Predictive Analytics', 'Sales Forecasting', 'Opportunity Scoring']}
              trend="stable"
            />
            
            <AIInsight
              title="Nouveaux Modèles Économiques Digitaux"
              description="Mise en pratique de l'économie de l'abondance décrite par les auteurs : freemium, SaaS, plateformes qui transforment la vente traditionnelle."
              businessImpact="Revenus récurrents représentant 70% du CA et réduction de 50% du coût d'acquisition"
              implementationLevel="Intermédiaire"
              technologies={['Subscription Management', 'Usage Analytics', 'Value-based Pricing']}
              trend="rising"
            />
          </div>
        </section>

        {/* Points clés à retenir */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-blue-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Points clés à retenir
            </h2>
            
            <ul className="space-y-4">
              {[
                "Trois caractéristiques du numérique : exponentiel, digital, combinatoire",
                "Automatisation progressive des tâches commerciales répétitives",
                "Personnalisation de masse grâce aux outils digitaux",
                "Émergence de nouveaux modèles économiques (freemium, SaaS, plateformes)",
                "Les données comme nouvel avantage concurrentiel",
                "Nécessité de repenser l'organisation commerciale",
                "Impact sur les compétences et métiers commerciaux"
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 text-xl mr-3 mt-1">✓</span>
                  <span className="text-gray-800 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pour qui ce livre ? */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-blue-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              Pour qui ce livre ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Dirigeants PME",
                "Directeurs commerciaux",
                "Managers d'équipes commerciales",
                "Consultants en transformation",
                "Entrepreneurs tech"
              ].map((profile, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-500 text-lg mr-3">👤</span>
                  <span className="text-gray-800 font-medium">{profile}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mon avis terrain */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl shadow-xl p-8 border border-blue-300/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
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
                Un livre fondamental pour comprendre où va le monde commercial. Brynjolfsson et McAfee ne font pas dans la science-fiction, ils analysent des tendances déjà à l'œuvre.
              </p>
              
              <h3 className="text-xl font-bold text-blue-500 mb-4">Ce qui m'a le plus marqué pour mes clients PME :</h3>
              <ul className="list-disc ml-6 mb-6 space-y-2">
                <li>L'automatisation ne remplace pas le commercial, elle le libère des tâches à faible valeur</li>
                <li>Les données deviennent l'or noir du commercial (CRM, analytics, prédictif)</li>
                <li>Il faut repenser ses processus, pas juste ajouter des outils</li>
                <li>La personnalisation de masse devient accessible aux PME grâce au digital</li>
                <li>Les nouveaux modèles économiques (SaaS, freemium) transforment la vente</li>
              </ul>
              
              <h3 className="text-xl font-bold text-blue-500 mb-4">Exemples concrets de mes accompagnements :</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">PME Industrie (45 salariés)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Automatisation du scoring des opportunités selon les concepts du livre
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Résultat : +35% de précision des forecasts, -2h/jour de reporting
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-600 mb-2">SaaS B2B (20 salariés)</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Mise en place de la personnalisation de masse via IA
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Résultat : Taux de conversion x2.5, 60% de temps gagné sur la création de contenu
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-blue-600 mb-2">💡 Conseil pratique :</p>
                <p>
                  Commencez par identifier dans votre équipe ce qui peut être automatisé (reporting, qualification, suivi) pour libérer du temps sur la relation client. 
                  Puis investissez dans la formation aux compétences relationnelles que l'IA ne peut pas remplacer.
                </p>
              </div>
              
              <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-r-lg mb-6">
                <p className="font-semibold text-orange-600 mb-2">⚠️ Erreur à éviter :</p>
                <p>
                  Ne tombez pas dans le piège de la "technologie pour la technologie". Chaque outil digital doit résoudre un problème concret et mesurable. 
                  Mes clients qui échouent sont ceux qui digitalisent sans repenser leurs processus.
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4.3 ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800">4.3/5</span>
                <span className="text-sm text-gray-600 ml-4">
                  Recommandé par 95% de mes clients PME
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Livres complémentaires de la même catégorie */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-blue-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              📖 Livres complémentaires de la catégorie
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/human-machine"
                className="group p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-blue-500 transition-colors">
                  Human + Machine
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour comprendre la collaboration homme-IA
                </p>
                <span className="text-blue-500 font-medium group-hover:underline">
                  Lire le résumé →
                </span>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/ai-superpowers"
                className="group p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-ink mb-3 group-hover:text-blue-500 transition-colors">
                  AI Superpowers
                </h3>
                <p className="text-gray-700 mb-3">
                  Pour anticiper l'évolution des métiers commerciaux
                </p>
                <span className="text-blue-500 font-medium group-hover:underline">
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
          title="Transformez vos connaissances en résultats"
          subtitle="Découvrez comment appliquer concrètement les concepts de The Second Machine Age à votre équipe commerciale"
        />

        {/* Outils digitaux recommandés */}
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-blue-300/20">
            <h2 className="text-3xl font-bold text-blue-ink mb-6">
              🛠️ Outils digitaux recommandés
            </h2>
            
            <p className="text-gray-700 mb-6">
              Pour mettre en pratique les concepts de transformation digitale abordés dans le livre
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/ressources/outil-strategie-commerciale"
                className="group p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">⚙️</span>
                  <h3 className="text-xl font-bold text-blue-ink group-hover:text-blue-500 transition-colors">
                    Framework Stratégie Commerciale
                  </h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Outil complet pour digitaliser et optimiser votre stratégie commerciale
                </p>
                <span className="text-blue-500 font-medium group-hover:underline">
                  Découvrir l'outil →
                </span>
              </Link>
              
              <Link 
                href="/ressources/techniques-de-vente"
                className="group p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">🤖</span>
                  <h3 className="text-xl font-bold text-blue-ink group-hover:text-blue-500 transition-colors">
                    Guide Techniques de Vente Digitales
                  </h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Méthodes et outils pour intégrer l'IA dans vos processus de vente
                </p>
                <span className="text-blue-500 font-medium group-hover:underline">
                  Télécharger le guide →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation retour */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link 
            href="/ressources/meilleurs-livres/digital-ai" 
            className="inline-flex items-center text-blue-300 hover:text-blue-200 text-lg font-medium transition-colors"
          >
            <span className="mr-2">←</span>
            Retour à Digital & AI Sales
          </Link>
        </div>
      </main>
    </>
  );
}