import { prospectionSDRCategoryExtended } from '@/data/books-enriched';
import { prospectionRoadmap } from '@/data/prospection-sdr-content';
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
  "name": "Prospection & SDR - Meilleurs Livres",
  "description": "Les meilleurs livres sur la prospection commerciale et le Sales Development. Fanatical Prospecting, Predictable Revenue, Sales Development Playbook. Résumés détaillés et conseils terrain de Laurent Serre.",
  "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/prospection-sdr",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Meilleurs livres Prospection & SDR",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "Fanatical Prospecting",
        "author": "Jeb Blount",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/prospection-sdr/fanatical-prospecting"
      },
      {
        "@type": "Book", 
        "position": 2,
        "name": "Predictable Revenue",
        "author": "Aaron Ross & Marylou Tyler",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/prospection-sdr/predictable-revenue"
      },
      {
        "@type": "Book",
        "position": 3, 
        "name": "The Sales Development Playbook",
        "author": "Trish Bertuzzi",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/prospection-sdr/sales-development-playbook"
      },
      {
        "@type": "Book",
        "position": 4,
        "name": "New Sales. Simplified.", 
        "author": "Mike Weinberg",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/prospection-sdr/new-sales-simplified"
      },
      {
        "@type": "Book",
        "position": 5,
        "name": "Sales Development: Cracking the Code",
        "author": "Cory Bray & Hilmon Sorey", 
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/prospection-sdr/sales-development-cracking-code"
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
        "name": "Prospection & SDR"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Prospection & SDR | Meilleurs Livres | Laurent Serre',
  description: 'Les meilleurs livres sur la prospection commerciale et le Sales Development. Fanatical Prospecting, Predictable Revenue, Sales Development Playbook. Résumés détaillés et conseils terrain de Laurent Serre.',
  keywords: [
    'prospection commerciale',
    'SDR',
    'sales development', 
    'social selling',
    'automatisation prospection',
    'lead generation',
    'fanatical prospecting',
    'predictable revenue',
    'laurent serre'
  ],
  openGraph: {
    title: 'Prospection & SDR | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur la prospection commerciale et le Sales Development. Fanatical Prospecting, Predictable Revenue, Sales Development Playbook. Résumés détaillés et conseils terrain.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/prospection-sdr',
    images: [
      {
        url: 'https://laurent-serre-developpement.fr/images/og-prospection-sdr.jpg',
        width: 1200,
        height: 630,
        alt: 'Prospection & SDR - Meilleurs Livres par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre Développement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prospection & SDR | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur la prospection commerciale et le Sales Development. Fanatical Prospecting, Predictable Revenue, Sales Development Playbook.',
    images: ['https://laurent-serre-developpement.fr/images/og-prospection-sdr.jpg'],
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/prospection-sdr',
  },
  other: {
    'preload': '/ressources/meilleurs-livres/prospection-sdr/fanatical-prospecting as document',
  },
};

export default function ProspectionSDRPage() {
  const category = prospectionSDRCategoryExtended;
  
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
      
      <main className="relative bg-gradient-to-br from-primary-bg via-cyan-500/10 to-background min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Particle background for prospection atmosphere */}
        <ParticleBackground 
          density={30}
          speed={0.3}
          color="#0066CC"
          opacity={0.4}
          className="absolute inset-0"
        />
        
        {/* Breadcrumb navigation */}
        <CategoryBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: 'Prospection & SDR', href: '/ressources/meilleurs-livres/prospection-sdr', current: true }
          ]}
          relatedCategories={categoryBreadcrumbSuggestions['prospection-sdr']}
        />

        {/* Hero section avec présentation de la prospection moderne */}
        <section className="max-w-4xl mx-auto text-center mb-12 px-4" aria-labelledby="hero-title">
          <AnimatedSection animation="fade-in" delay={0}>
            <span 
              className="inline-block bg-blue-500/20 text-blue-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
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
            
            {/* Message spécifique sur la prospection moderne avec effets visuels */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-blue-400/20 overflow-hidden group hover:bg-white/15 transition-all duration-500">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              {/* Floating prospection icons */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <span className="text-2xl animate-pulse">🎯</span>
              </div>
              <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <span className="text-xl animate-bounce">📞</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h2 className="text-xl font-semibold text-blue-400">
                    La prospection révolutionne la croissance des PME
                  </h2>
                </div>
                <p className="text-primary-secondary/90 leading-relaxed mb-4">
                  78% des entreprises qui structurent leur prospection doublent leur croissance en 18 mois. 
                  Automatisation intelligente, social selling et qualification prédictive : découvrez les méthodes 
                  qui transforment votre pipeline commercial et génèrent un flux constant d'opportunités.
                </p>
                
                {/* Laurent Serre positioning */}
                <div className="bg-white/10 rounded-lg p-4 mb-4 border border-blue-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-blue-ink font-bold text-sm">LS</span>
                    </div>
                    <span className="text-blue-300 font-semibold">Vision Laurent Serre</span>
                  </div>
                  <p className="text-primary-secondary/90 text-sm italic">
                    "La prospection moderne, c'est 80% de stratégie et 20% d'exécution. Mes clients qui réussissent le mieux ont compris qu'il faut arrêter de prospecter 'plus' pour prospecter 'mieux'. Une prospection ciblée, personnalisée et automatisée intelligemment génère 5x plus de résultats qu'une approche en mode 'spray and pray'. Le secret ? Combiner la technologie avec l'authenticité humaine."
                  </p>
                </div>
                
                {/* Prospection stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-blue-400/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">5x</div>
                    <div className="text-xs text-primary-secondary/70">plus de prospects contactés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">78%</div>
                    <div className="text-xs text-primary-secondary/70">des PME doublent leur croissance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">15-25%</div>
                    <div className="text-xs text-primary-secondary/70">taux de réponse moyen</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Tableau comparatif avec critères spécifiques Prospection */}
        <section aria-labelledby="comparison-title">
          <AnimatedSection delay={100}>
            <div className="max-w-6xl mx-auto px-4">
              <h2 id="comparison-title" className="sr-only">
                Tableau comparatif des livres Prospection & SDR
              </h2>
              <ComparisonTable 
                books={category.books} 
                category="prospection-sdr" 
              />
            </div>
          </AnimatedSection>
        </section>

        {/* Grid de livres avec BookCard adaptée */}
        <section aria-labelledby="books-grid-title">
          <AnimatedSection delay={200}>
            <div className="max-w-6xl mx-auto mb-12 px-4">
              <h2 id="books-grid-title" className="sr-only">
                Liste des livres recommandés sur Prospection & SDR
              </h2>
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
                aria-label="Livres recommandés sur Prospection & SDR"
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

        {/* Section Domain Insights - Techniques de prospection */}
        <AnimatedSection delay={350}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="text-center mb-8">
              <span className="inline-block bg-cyan-500/20 text-cyan-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <span className="inline mr-2">🎯</span>
                Techniques fondamentales
              </span>
              <h3 className="text-2xl font-bold text-primary-title mb-4">
                Les 4 piliers de la prospection moderne en PME
              </h3>
              <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Découvrez les techniques qui révolutionnent la prospection commerciale et permettent de générer 
                un flux constant d'opportunités qualifiées avec un ROI mesurable
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedSection delay={400}>
                <DomainInsight 
                  title="Automatisation Intelligente de la Prospection"
                  description="L'automatisation moderne ne remplace pas l'humain mais démultiplie son efficacité. Les séquences automatisées permettent de maintenir un contact régulier avec des centaines de prospects tout en personnalisant chaque interaction."
                  businessImpact="Multiplication par 5 du nombre de prospects contactés avec un taux de réponse maintenu à 15-20%"
                  implementationLevel="Intermédiaire"
                  keyElements={[
                    "Séquences multi-canaux (email, LinkedIn, téléphone)",
                    "Personnalisation à l'échelle avec variables dynamiques",
                    "Scoring automatique des prospects",
                    "Déclencheurs comportementaux"
                  ]}
                  trend="rising"
                  domainTheme={{
                    primaryColor: "#0066CC",
                    secondaryColor: "#00A86B",
                    accentColor: "#FF6B35"
                  }}
                />
              </AnimatedSection>
              
              <AnimatedSection delay={500}>
                <DomainInsight 
                  title="Social Selling Stratégique"
                  description="Le social selling moderne va au-delà du simple contact LinkedIn. Il s'agit de construire une présence d'expert, d'engager des conversations de valeur et de transformer sa visibilité en opportunités commerciales concrètes."
                  businessImpact="Augmentation de 40% du taux d'acceptation des demandes de connexion et 25% de meetings obtenus"
                  implementationLevel="Avancé"
                  keyElements={[
                    "Stratégie de contenu expert sur LinkedIn",
                    "Engagement authentique sur les publications prospects",
                    "Utilisation des Sales Navigator pour le ciblage",
                    "Approche consultative dans les messages"
                  ]}
                  trend="rising"
                  domainTheme={{
                    primaryColor: "#0066CC",
                    secondaryColor: "#00A86B",
                    accentColor: "#FF6B35"
                  }}
                />
              </AnimatedSection>
              
              <AnimatedSection delay={600}>
                <DomainInsight 
                  title="Qualification Prédictive des Leads"
                  description="La qualification moderne utilise des données comportementales et des signaux d'achat pour identifier les prospects les plus susceptibles de convertir, optimisant ainsi l'allocation du temps commercial."
                  businessImpact="Amélioration de 60% du taux de conversion des leads qualifiés en opportunités"
                  implementationLevel="Avancé"
                  keyElements={[
                    "Lead scoring basé sur le comportement digital",
                    "Analyse des signaux d'intention d'achat",
                    "Segmentation dynamique des prospects",
                    "Priorisation automatique des actions"
                  ]}
                  trend="rising"
                  domainTheme={{
                    primaryColor: "#0066CC",
                    secondaryColor: "#00A86B",
                    accentColor: "#FF6B35"
                  }}
                />
              </AnimatedSection>
              
              <AnimatedSection delay={700}>
                <DomainInsight 
                  title="Prospection Account-Based (ABM)"
                  description="L'Account-Based Marketing appliqué à la prospection consiste à cibler spécifiquement les comptes à fort potentiel avec des approches ultra-personnalisées et coordonnées entre marketing et vente."
                  businessImpact="Taux de conversion 3x supérieur sur les comptes ciblés avec un cycle de vente réduit de 30%"
                  implementationLevel="Avancé"
                  keyElements={[
                    "Identification des comptes stratégiques",
                    "Recherche approfondie des enjeux métier",
                    "Approches multi-contacts coordonnées",
                    "Contenu personnalisé par compte"
                  ]}
                  trend="rising"
                  domainTheme={{
                    primaryColor: "#0066CC",
                    secondaryColor: "#00A86B",
                    accentColor: "#FF6B35"
                  }}
                />
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

        {/* Section : Exemples concrets PME */}
        <AnimatedSection delay={450}>
          <CaseStudyGrid 
            caseStudies={category.caseStudies}
            title="Exemples concrets de prospection en PME"
            subtitle="Découvrez comment mes clients PME appliquent concrètement les techniques de ces livres pour multiplier leurs résultats"
            laurentQuote="La prospection moderne, c'est de l'amélioration continue. Testez, mesurez, ajustez. Les petites optimisations font les grandes différences. Mes clients qui réussissent le mieux sont ceux qui combinent automatisation et personnalisation."
            themeColor="#0066CC"
          />
        </AnimatedSection>

        {/* Section : Feuille de route d'implémentation */}
        <AnimatedSection delay={475}>
          <ImplementationRoadmap 
            phases={prospectionRoadmap}
            categoryTheme={{
              primaryColor: "#0066CC",
              secondaryColor: "#00A86B", 
              accentColor: "#FF6B35"
            }}
            domainTitle="la prospection moderne"
          />
        </AnimatedSection>

        {/* Section : Suggestions cross-catégories */}
        <AnimatedSection delay={500}>
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-blue-400/20 backdrop-blur-sm">
              <div className="text-center mb-6">
                <span className="inline-block bg-orange-500/20 text-orange-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🔗 Complémentaire
                </span>
                <h3 className="text-2xl font-bold text-primary-title mb-4">
                  Complétez votre expertise en prospection
                </h3>
                <p className="text-primary-secondary mb-6">
                  Ces domaines complémentaires enrichiront votre maîtrise de la prospection moderne
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/ressources/meilleurs-livres/psychologie-influence"
                  className="group p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🧠</span>
                    <h4 className="font-bold text-purple-600 group-hover:text-purple-700">Psychologie & Influence</h4>
                  </div>
                  <p className="text-sm text-primary-secondary">
                    Appliquez les principes psychologiques pour améliorer vos taux de réponse en prospection. 
                    L'influence éthique est la base de toute prospection authentique et efficace.
                  </p>
                </Link>
                
                <Link 
                  href="/ressources/meilleurs-livres/negociation-closing"
                  className="group p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🤝</span>
                    <h4 className="font-bold text-red-600 group-hover:text-red-700">Négociation & Closing</h4>
                  </div>
                  <p className="text-sm text-primary-secondary">
                    Transformez vos prospects qualifiés en clients avec les meilleures techniques de closing. 
                    La prospection sans closing, c'est comme un moteur sans transmission.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTAs Multiples */}
        <AnimatedSection delay={525}>
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            {/* CTA Bootcamp spécifique prospection */}
            <div className="text-center bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-400/20">
              <span className="inline-block bg-blue-500/20 text-blue-400 font-semibold rounded-full px-4 py-1 text-sm mb-4">
                🚀 Formation intensive
              </span>
              <h4 className="text-2xl font-bold text-primary-title mb-4">
                Bootcamp Prospection Moderne
              </h4>
              <p className="text-primary-secondary mb-6 max-w-2xl mx-auto">
                Transformez votre approche prospection avec les méthodes issues de ces livres, 
                adaptées à la réalité PME française. Automatisation, social selling et qualification prédictive.
              </p>
              <Link 
                href="/bootcamp-commercial-intensif"
                className="inline-block bg-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
              >
                Découvrir le Bootcamp
              </Link>
            </div>

            {/* CTA Diagnostic gratuit */}
            <div className="text-center bg-gradient-to-r from-mint-green/10 to-blue-500/10 rounded-2xl p-8 border border-mint-green/20">
              <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4">
                🎯 Diagnostic gratuit
              </span>
              <h4 className="text-2xl font-bold text-primary-title mb-4">
                Auditez votre prospection actuelle
              </h4>
              <p className="text-primary-secondary mb-6 max-w-2xl mx-auto">
                Découvrez les axes d'amélioration de votre prospection avec un diagnostic personnalisé. 
                Identifiez vos points forts et les opportunités d'optimisation.
              </p>
              <Link 
                href="/diagnostic"
                className="inline-block bg-mint-green text-blue-ink font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-mint-green/90 transition-all duration-300"
              >
                Diagnostic gratuit
              </Link>
            </div>

            {/* Navigation retour */}
            <div className="text-center">
              <Link 
                href="/ressources/meilleurs-livres"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                ← Retour aux catégories de livres
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}