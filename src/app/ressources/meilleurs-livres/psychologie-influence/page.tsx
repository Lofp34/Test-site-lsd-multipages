import { psychologyInfluenceCategoryExtended } from '@/data/books-enriched';
import { psychologyImplementationRoadmap } from '@/data/psychology-influence-content';
import Link from 'next/link';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ComparisonTable from '@/components/ui/ComparisonTable';
import BookCard from '@/components/ui/BookCard';
import CategoryBreadcrumb from '@/components/ui/CategoryBreadcrumb';
import ParticleBackground from '@/components/ui/ParticleBackground';
import DomainInsight from '@/components/ui/DomainInsight';
import CaseStudyGrid from '@/components/ui/CaseStudyGrid';
import ImplementationRoadmap from '@/components/ui/ImplementationRoadmap';
import DomainStats from '@/components/ui/DomainStats';
import { categoryBreadcrumbSuggestions } from '@/utils/cross-category-suggestions';
import React from 'react';

// Données structurées Schema.org pour la page catégorie
const categoryStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Psychologie & Influence - Meilleurs Livres",
  "description": "Les meilleurs livres sur la psychologie de la vente et l'influence éthique. Influence de Cialdini, Comment se faire des amis, Thinking Fast and Slow. Résumés détaillés et conseils terrain de Laurent Serre.",
  "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/psychologie-influence",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Meilleurs livres Psychologie & Influence",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "Influence: The Psychology of Persuasion",
        "author": "Robert Cialdini",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/psychologie-influence/influence-psychology-persuasion"
      },
      {
        "@type": "Book", 
        "position": 2,
        "name": "Comment se faire des amis",
        "author": "Dale Carnegie",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/psychologie-influence/comment-se-faire-des-amis"
      },
      {
        "@type": "Book",
        "position": 3, 
        "name": "Thinking, Fast and Slow",
        "author": "Daniel Kahneman",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/psychologie-influence/thinking-fast-slow"
      },
      {
        "@type": "Book",
        "position": 4,
        "name": "Predictably Irrational", 
        "author": "Dan Ariely",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/psychologie-influence/predictably-irrational"
      },
      {
        "@type": "Book",
        "position": 5,
        "name": "Pré-Suasion",
        "author": "Robert Cialdini", 
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/psychologie-influence/pre-suasion"
      }
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://laurent-serre-developpement.fr"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Ressources",
        "item": "https://laurent-serre-developpement.fr/ressources"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Meilleurs Livres",
        "item": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Psychologie & Influence"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Psychologie & Influence | Meilleurs Livres | Laurent Serre',
  description: 'Les meilleurs livres sur la psychologie de la vente et l\'influence éthique. Influence de Cialdini, Comment se faire des amis, Thinking Fast and Slow. Résumés détaillés et conseils terrain de Laurent Serre.',
  keywords: [
    'psychologie vente',
    'influence cialdini', 
    'persuasion',
    'biais cognitifs',
    'psychologie commerciale',
    'comment se faire des amis',
    'thinking fast slow',
    'pre-suasion',
    'laurent serre'
  ],
  openGraph: {
    title: 'Psychologie & Influence | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur la psychologie de la vente et l\'influence éthique. Influence de Cialdini, Comment se faire des amis, Thinking Fast and Slow. Résumés détaillés et conseils terrain.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/psychologie-influence',
    images: [
      {
        url: 'https://laurent-serre-developpement.fr/images/og-psychologie-influence.jpg',
        width: 1200,
        height: 630,
        alt: 'Psychologie & Influence - Meilleurs Livres par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre Développement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psychologie & Influence | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur la psychologie de la vente et l\'influence éthique. Influence de Cialdini, Comment se faire des amis, Thinking Fast and Slow.',
    images: ['https://laurent-serre-developpement.fr/images/og-psychologie-influence.jpg'],
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/psychologie-influence',
  },
  other: {
    'preload': '/ressources/meilleurs-livres/psychologie-influence/influence-psychology-persuasion as document',
  },
};

export default function PsychologieInfluencePage() {
  const category = psychologyInfluenceCategoryExtended;
  
  // Debug: Check if category and its properties exist
  if (!category) {
    return <div>Category not found</div>;
  }
  
  if (!category.books) {
    return <div>Books not found in category</div>;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      
      <main className="relative bg-gradient-to-br from-primary-bg via-purple-500/10 to-background min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Particle background for psychology atmosphere */}
        <ParticleBackground 
          density={30}
          speed={0.3}
          color="#8B5CF6"
          opacity={0.4}
          className="absolute inset-0"
        />
        
        {/* Breadcrumb navigation */}
        <CategoryBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: 'Psychologie & Influence', href: '/ressources/meilleurs-livres/psychologie-influence', current: true }
          ]}
          relatedCategories={categoryBreadcrumbSuggestions['psychologie-influence']}
        />

        {/* Hero section avec présentation de la psychologie commerciale */}
        <section className="max-w-4xl mx-auto text-center mb-12 px-4" aria-labelledby="hero-title">
          <AnimatedSection animation="fade-in" delay={0}>
            <span 
              className="inline-block bg-purple-500/20 text-purple-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
              role="status"
              aria-label={`Catégorie ${category.title}`}
            >
              <span aria-hidden="true">{category.icon}</span> Catégorie
            </span>
            <h1 id="hero-title" className="text-4xl md:text-5xl font-bold text-primary-title mb-4 drop-shadow-lg">
              {category.title}
            </h1>
            <p className="text-lg md:text-xl text-primary-secondary/90 mb-6 leading-relaxed">
              {category.description}
            </p>
            
            {/* Message spécifique sur la psychologie commerciale avec effets visuels */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-purple-400/20 overflow-hidden group hover:bg-white/15 transition-all duration-500">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              {/* Floating psychology icons */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <span className="text-2xl animate-pulse">🧠</span>
              </div>
              <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <span className="text-xl animate-bounce">💡</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h2 className="text-xl font-semibold text-purple-400">
                    La psychologie révolutionne la vente moderne
                  </h2>
                </div>
                <p className="text-primary-secondary/90 leading-relaxed mb-4">
                  95% des décisions d'achat sont émotionnelles, puis rationalisées. Comprendre les biais cognitifs, 
                  les mécanismes d'influence et les leviers psychologiques de vos prospects, c'est détenir les clés 
                  d'une vente éthique et efficace. Ces 5 livres vous révèlent les secrets de l'influence authentique.
                </p>
                
                {/* Laurent Serre positioning */}
                <div className="bg-white/10 rounded-lg p-4 mb-4 border border-purple-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-blue-ink font-bold text-sm">LS</span>
                    </div>
                    <span className="text-purple-300 font-semibold">Vision Laurent Serre</span>
                  </div>
                  <p className="text-primary-secondary/90 text-sm italic">
                    "La vente, c'est 20% de technique et 80% de psychologie. Comprendre les biais cognitifs de vos prospects, 
                    c'est comme avoir les réponses avant l'examen. Mes clients qui maîtrisent ces principes doublent leur taux de conversion. 
                    Mais attention : il y a une différence fondamentale entre influence et manipulation. L'influence éthique crée de la valeur pour les deux parties."
                  </p>
                </div>
                
                {/* Psychology stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-purple-400/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">95%</div>
                    <div className="text-xs text-primary-secondary/70">décisions émotionnelles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">6</div>
                    <div className="text-xs text-primary-secondary/70">principes universels</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">2x</div>
                    <div className="text-xs text-primary-secondary/70">plus de conversions</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Tableau comparatif avec critères spécifiques Psychologie */}
        <section aria-labelledby="comparison-title">
          <AnimatedSection delay={100}>
            <div className="max-w-6xl mx-auto px-4">
              <h2 id="comparison-title" className="sr-only">
                Tableau comparatif des livres Psychologie & Influence
              </h2>
              <ComparisonTable 
                books={category.books} 
                category="psychologie-influence" 
              />
            </div>
          </AnimatedSection>
        </section>

        {/* Grid de livres avec BookCard adaptée */}
        <section aria-labelledby="books-grid-title">
          <AnimatedSection delay={200}>
            <div className="max-w-6xl mx-auto mb-12 px-4">
              <h2 id="books-grid-title" className="sr-only">
                Liste des livres recommandés sur Psychologie & Influence
              </h2>
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
                aria-label="Livres recommandés sur Psychologie & Influence"
              >
                {category.books.map((book, index) => (
                  <AnimatedSection key={book.slug} delay={300 + index * 100}>
                    <div role="listitem">
                      <BookCard 
                        book={book} 
                        variant="grid"
                        showRating={true}
                        showDifficulty={true}
                        showReadingTime={true}
                      />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Section Domain Insights - Principes psychologiques */}
        <AnimatedSection delay={350}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="text-center mb-8">
              <span className="inline-block bg-pink-500/20 text-pink-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <span className="inline mr-2">🎯</span>
                Principes fondamentaux
              </span>
              <h3 className="text-2xl font-bold text-primary-title mb-4">
                Les 4 piliers de l'influence éthique en vente B2B
              </h3>
              <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Découvrez les mécanismes psychologiques qui influencent les décisions d'achat et apprenez à les utiliser 
                de manière éthique pour créer de la valeur mutuelle avec vos clients
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedSection delay={400}>
                <DomainInsight 
                  title="Réciprocité : Le Pouvoir du Don"
                  description="Le principe de réciprocité est l'un des plus puissants en vente B2B. Quand vous donnez quelque chose de valeur en premier (conseil, audit, contenu expert), vous créez un sentiment de dette psychologique qui pousse naturellement à la réciprocité."
                  businessImpact="Augmentation de 180% du taux de réponse en prospection et amélioration de 65% de la qualité des premiers rendez-vous"
                  implementationLevel="Débutant"
                  keyElements={[
                    "Audit gratuit personnalisé",
                    "Conseils experts sans contrepartie immédiate", 
                    "Contenu exclusif adapté aux enjeux client",
                    "Mise en relation avec des partenaires utiles"
                  ]}
                  trend="rising"
                  domainTheme={{
                    primaryColor: "#8B5CF6",
                    secondaryColor: "#EC4899",
                    accentColor: "#F59E0B"
                  }}
                />
              </AnimatedSection>
              
              <AnimatedSection delay={500}>
                <DomainInsight 
                  title="Preuve Sociale : L'Influence des Pairs"
                  description="Nous imitons naturellement les comportements de nos pairs, surtout en situation d'incertitude. En B2B, les témoignages d'entreprises similaires (même secteur, même taille) sont infiniment plus persuasifs que les arguments produit."
                  businessImpact="Multiplication par 3 du taux de conversion et réduction de 45% du cycle de vente moyen"
                  implementationLevel="Débutant"
                  keyElements={[
                    "Témoignages clients du même secteur",
                    "Études de cas avec métriques précises",
                    "Références d'entreprises de taille similaire",
                    "Logos clients visibles et pertinents"
                  ]}
                  trend="stable"
                  domainTheme={{
                    primaryColor: "#8B5CF6",
                    secondaryColor: "#EC4899",
                    accentColor: "#F59E0B"
                  }}
                />
              </AnimatedSection>
              
              <AnimatedSection delay={600}>
                <DomainInsight 
                  title="Autorité : La Crédibilité qui Influence"
                  description="Nous obéissons naturellement aux figures d'autorité légitimes. En vente B2B, établir son expertise et sa crédibilité influence positivement les décisions d'achat. L'autorité se construit par l'expertise démontrée."
                  businessImpact="Augmentation de 120% de la confiance client et réduction de 50% des objections sur la crédibilité"
                  implementationLevel="Intermédiaire"
                  keyElements={[
                    "Expertise sectorielle reconnue",
                    "Certifications et formations",
                    "Publications et interventions",
                    "Recommandations LinkedIn"
                  ]}
                  trend="rising"
                  domainTheme={{
                    primaryColor: "#8B5CF6",
                    secondaryColor: "#EC4899",
                    accentColor: "#F59E0B"
                  }}
                />
              </AnimatedSection>
              
              <AnimatedSection delay={700}>
                <DomainInsight 
                  title="Rareté : L'Urgence qui Décide"
                  description="Nous valorisons davantage ce qui est rare ou limité dans le temps. En B2B, créer une urgence légitime (places limitées, offre temporaire, fenêtre d'opportunité) accélère la prise de décision."
                  businessImpact="Accélération de 60% de la prise de décision et augmentation de 35% du taux de signature"
                  implementationLevel="Avancé"
                  keyElements={[
                    "Offres à durée limitée authentiques",
                    "Places limitées en formation",
                    "Fenêtres d'opportunité business",
                    "Exclusivité sectorielle ou géographique"
                  ]}
                  trend="stable"
                  domainTheme={{
                    primaryColor: "#8B5CF6",
                    secondaryColor: "#EC4899",
                    accentColor: "#F59E0B"
                  }}
                />
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

        {/* Section : Exemples concrets PME */}
        <AnimatedSection delay={450}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-purple-400/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🏢 Cas clients PME
                </span>
                <h3 className="text-2xl font-bold text-primary-title mb-4">
                  Exemples concrets d'influence éthique en PME
                </h3>
                <p className="text-primary-secondary mb-6">
                  Découvrez comment mes clients PME appliquent concrètement les principes psychologiques pour doubler leurs performances
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">E-C</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-600">E-commerce B2B - 35 salariés</h4>
                        <p className="text-sm text-primary-secondary/70">Plateforme de vente en ligne</p>
                      </div>
                    </div>
                    <p className="text-primary-secondary mb-3 text-sm">
                      <strong>Défi :</strong> Taux de conversion très faible (2,1%) malgré un trafic qualifié. 
                      Les visiteurs consultent mais n'achètent pas.
                    </p>
                    <p className="text-primary-secondary mb-3 text-sm">
                      <strong>Solution :</strong> Implémentation massive de la preuve sociale : témoignages clients visibles, 
                      compteurs d'achat en temps réel, logos d'entreprises clientes.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        📈 Résultats : +120% de conversion (2,1% → 4,6%), +45% de satisfaction client, 
                        -25% de cycle de vente
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">FOR</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-600">Formation Pro - 28 salariés</h4>
                        <p className="text-sm text-primary-secondary/70">Organisme de formation</p>
                      </div>
                    </div>
                    <p className="text-primary-secondary mb-3 text-sm">
                      <strong>Défi :</strong> Excellente réputation mais difficultyés à convertir les prospects 
                      en inscriptions (12% de conversion).
                    </p>
                    <p className="text-primary-secondary mb-3 text-sm">
                      <strong>Solution :</strong> Développement de l'autorité expertise : publications LinkedIn, 
                      interventions en conférences, certifications visibles.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        📈 Résultats : +80% de conversion (12% → 21,6%), +55% de satisfaction, 
                        -40% de cycle de vente
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CON</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-600">Conseil Management - 18 salariés</h4>
                        <p className="text-sm text-primary-secondary/70">Cabinet de conseil</p>
                      </div>
                    </div>
                    <p className="text-primary-secondary mb-3 text-sm">
                      <strong>Défi :</strong> Approche très technique mais taux de réponse en prospection 
                      de seulement 3%. Difficultyés à créer le premier contact.
                    </p>
                    <p className="text-primary-secondary mb-3 text-sm">
                      <strong>Solution :</strong> Application du principe de réciprocité : audits gratuits personnalisés, 
                      partage d'insights sectoriels exclusifs.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        📈 Résultats : +200% de réponse (3% → 9%), +70% de satisfaction, 
                        -30% de cycle de vente
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">TEC</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-600">Solutions Tech - 52 salariés</h4>
                        <p className="text-sm text-primary-secondary/70">Éditeur de logiciel</p>
                      </div>
                    </div>
                    <p className="text-primary-secondary mb-3 text-sm">
                      <strong>Défi :</strong> Cycles de vente très longs (8 mois) et taux de signature de 18%. 
                      Les prospects traînent dans la décision.
                    </p>
                    <p className="text-primary-secondary mb-3 text-sm">
                      <strong>Solution :</strong> Utilisation éthique du principe de rareté : offres à durée limitée 
                      authentiques, places limitées en formation.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        📈 Résultats : +45% de conversion (18% → 26%), +35% de satisfaction, 
                        -60% de cycle (8 → 3,2 mois)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LS</span>
                  </div>
                  <h4 className="text-xl font-bold text-purple-600">Retour d'expérience Laurent Serre</h4>
                </div>
                <p className="text-primary-secondary mb-4">
                  "La psychologie commerciale, c'est comme apprendre une langue : il faut d'abord maîtriser les bases avant de faire des phrases complexes. 
                  Mes clients qui réussissent le mieux commencent par un principe (souvent la réciprocité), le testent pendant 2 semaines, 
                  mesurent l'impact, puis passent au suivant. L'erreur classique ? Vouloir tout appliquer en même temps."
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">2x</div>
                    <div className="text-xs text-primary-secondary/70">Amélioration moyenne des conversions</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">6</div>
                    <div className="text-xs text-primary-secondary/70">Principes universels d'influence</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">95%</div>
                    <div className="text-xs text-primary-secondary/70">Satisfaction clients maintenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section : Feuille de route d'implémentation */}
        <AnimatedSection delay={475}>
          <ImplementationRoadmap 
            phases={psychologyImplementationRoadmap}
            categoryTheme={{
              primaryColor: "#8B5CF6",
              secondaryColor: "#EC4899", 
              accentColor: "#F59E0B"
            }}
            domainTitle="l'influence éthique"
          />
        </AnimatedSection>

        {/* Section : Suggestions cross-catégories */}
        <AnimatedSection delay={500}>
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-purple-400/20 backdrop-blur-sm">
              <div className="text-center mb-6">
                <span className="inline-block bg-orange-500/20 text-orange-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🔗 Complémentaire
                </span>
                <h3 className="text-2xl font-bold text-primary-title mb-4">
                  Complétez votre expertise
                </h3>
                <p className="text-primary-secondary mb-6">
                  Ces domaines complémentaires enrichiront votre maîtrise de l'influence éthique
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/ressources/meilleurs-livres/negociation-closing"
                  className="group p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🤝</span>
                    <h4 className="font-bold text-red-600 group-hover:text-red-700">Négociation & Closing</h4>
                  </div>
                  <p className="text-sm text-primary-secondary">
                    Appliquez vos connaissances psychologiques dans des négociations concrètes. 
                    L'influence éthique est la base de toute négociation collaborative réussie.
                  </p>
                </Link>
                
                <Link 
                  href="/ressources/meilleurs-livres/prospection-sdr"
                  className="group p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📞</span>
                    <h4 className="font-bold text-blue-600 group-hover:text-blue-700">Prospection & SDR</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Utilisez les principes psychologiques pour améliorer vos taux de réponse en prospection. 
                    La réciprocité et la preuve sociale transforment vos approches.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTAs multiples */}
        <AnimatedSection delay={550}>
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 rounded-2xl shadow-2xl p-6 border border-purple-400/20 backdrop-blur-sm">
                <div className="inline-block bg-purple-500/20 text-purple-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🧠 Formation
                </div>
                <h4 className="text-xl font-bold text-blue-ink mb-3">
                  Bootcamp Psychologie Commerciale
                </h4>
                <p className="text-gray-700 mb-4 text-sm">
                  Maîtrisez les 6 principes de Cialdini et les biais cognitifs avec une formation pratique 
                  adaptée aux enjeux PME. Influence éthique, persuasion authentique, psychologie de la décision.
                </p>
                <Link 
                  href="/bootcamp-commercial-intensif" 
                  className="inline-block bg-purple-500 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-purple-600 transition-colors duration-300"
                >
                  Découvrir le Bootcamp
                </Link>
              </div>
              
              <div className="bg-white/70 rounded-2xl shadow-2xl p-6 border border-pink-400/20 backdrop-blur-sm">
                <div className="inline-block bg-pink-500/20 text-pink-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  💡 Accompagnement
                </div>
                <h4 className="text-xl font-bold text-blue-ink mb-3">
                  Coaching Influence Personnalisé
                </h4>
                <p className="text-gray-700 mb-4 text-sm">
                  Accompagnement individuel pour développer votre expertise en psychologie commerciale. 
                  Analyse de vos interactions, techniques avancées, développement de votre influence naturelle.
                </p>
                <Link 
                  href="/coach-commercial-entreprise" 
                  className="inline-block bg-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-pink-600 transition-colors duration-300"
                >
                  Découvrir le Coaching
                </Link>
              </div>
            </div>
            
            <div className="mt-6">
              <Link 
                href="/ressources/meilleurs-livres" 
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                <span>←</span>
                <span>Retour aux catégories de livres</span>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}

  