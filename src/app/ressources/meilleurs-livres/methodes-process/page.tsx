import { methodsProcessCategory } from '@/data/books-enriched';
import Link from 'next/link';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ComparisonTable from '@/components/ui/ComparisonTable';
import BookCard from '@/components/ui/BookCard';
import CategoryBreadcrumb from '@/components/ui/CategoryBreadcrumb';
import ParticleBackground from '@/components/ui/ParticleBackground';
import DomainInsight from '@/components/ui/DomainInsight';
import PMECaseStudy from '@/components/ui/PMECaseStudy';
import ImplementationRoadmap from '@/components/ui/ImplementationRoadmap';
import DomainStats from '@/components/ui/DomainStats';
import { categoryBreadcrumbSuggestions } from '@/utils/cross-category-suggestions';
import { 
  methodsProcessesCaseStudies, 
  methodsProcessesInsights, 
  methodsProcessesRoadmap,
  methodsProcessesStats,
  methodsProcessesLaurentVision
} from '@/data/methods-processes-content';
import React from 'react';

// Données structurées Schema.org pour la page catégorie
const categoryStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Méthodes & Process - Meilleurs Livres",
  "description": "Les meilleures méthodes de vente structurées : SPIN Selling, Challenger Sale, Solution Selling, Gap Selling. Frameworks éprouvés pour transformer votre approche commerciale.",
  "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/methodes-process",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Meilleurs livres Méthodes & Process",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "SPIN Selling",
        "author": "Neil Rackham",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/methodes-process/spin-selling"
      },
      {
        "@type": "Book", 
        "position": 2,
        "name": "The Challenger Sale",
        "author": "Matthew Dixon & Brent Adamson",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/methodes-process/the-challenger-sale"
      },
      {
        "@type": "Book",
        "position": 3, 
        "name": "Solution Selling",
        "author": "Michael Bosworth",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/methodes-process/solution-selling"
      },
      {
        "@type": "Book",
        "position": 4,
        "name": "Gap Selling", 
        "author": "Keenan",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/methodes-process/gap-selling"
      },
      {
        "@type": "Book",
        "position": 5,
        "name": "Strategic Selling",
        "author": "Robert Miller & Stephen Heiman", 
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/methodes-process/strategic-selling"
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
        "name": "Méthodes & Process"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Méthodes & Process | Meilleurs Livres | Laurent Serre',
  description: 'Les meilleures méthodes de vente structurées. SPIN Selling, Challenger Sale, Solution Selling, Gap Selling. Frameworks éprouvés et conseils terrain de Laurent Serre.',
  keywords: [
    'méthodes de vente',
    'spin selling', 
    'challenger sale',
    'solution selling',
    'gap selling',
    'processus commercial',
    'frameworks de vente',
    'vente structurée',
    'laurent serre'
  ],
  openGraph: {
    title: 'Méthodes & Process | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleures méthodes de vente structurées. SPIN Selling, Challenger Sale, Solution Selling, Gap Selling. Frameworks éprouvés et conseils terrain.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/methodes-process',
    images: [
      {
        url: 'https://laurent-serre-developpement.fr/images/og-methodes-process.jpg',
        width: 1200,
        height: 630,
        alt: 'Méthodes & Process - Meilleurs Livres par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre Développement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Méthodes & Process | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleures méthodes de vente structurées. SPIN Selling, Challenger Sale, Solution Selling, Gap Selling.',
    images: ['https://laurent-serre-developpement.fr/images/og-methodes-process.jpg'],
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/methodes-process',
  },
  other: {
    'preload': '/ressources/meilleurs-livres/methodes-process/spin-selling as document',
  },
};

export default function MethodesProcessPage() {
  const category = methodsProcessCategory;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      
      <main className="relative bg-gradient-to-br from-blue-600 via-cyan-500/10 to-primary-bg min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Particle background for methodical atmosphere */}
        <ParticleBackground 
          density={30}
          speed={0.3}
          color="#3B82F6"
          opacity={0.4}
          className="absolute inset-0"
        />
        
        {/* Breadcrumb navigation */}
        <CategoryBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: 'Méthodes & Process', href: '/ressources/meilleurs-livres/methodes-process', current: true }
          ]}
          relatedCategories={categoryBreadcrumbSuggestions['methodes-process']}
        />

        {/* Hero section avec présentation des frameworks de vente */}
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
            
            {/* Message spécifique sur les frameworks de vente avec effets visuels */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-blue-400/20 overflow-hidden group hover:bg-white/15 transition-all duration-500">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h2 className="text-xl font-semibold text-blue-400">
                    Des processus qui transforment les résultats
                  </h2>
                </div>
                <p className="text-primary-secondary/90 leading-relaxed mb-4">
                  SPIN pour la découverte structurée, Challenger pour la différenciation, Solution Selling pour les ventes complexes, Gap Selling pour l'analyse rigoureuse... 
                  Ces frameworks éprouvés transforment l'intuition commerciale en processus reproductibles et mesurables.
                </p>
                
                {/* Vision Laurent Serre */}
                <div className="bg-white/10 rounded-lg p-4 mb-4 border border-blue-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-blue-ink font-bold text-sm">LS</span>
                    </div>
                    <span className="text-blue-300 font-semibold">Vision Laurent Serre</span>
                  </div>
                  <p className="text-primary-secondary/90 text-sm italic">
                    "{methodsProcessesLaurentVision}"
                  </p>
                </div>
                
                {/* Stats spécifiques aux méthodes */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-blue-400/20">
                  {methodsProcessesStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                      <div className="text-xs text-primary-secondary/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Tableau comparatif avec critères spécifiques méthodes */}
        <section aria-labelledby="comparison-title">
          <AnimatedSection delay={100}>
            <div className="max-w-6xl mx-auto px-4">
              <h2 id="comparison-title" className="sr-only">
                Tableau comparatif des livres Méthodes & Process
              </h2>
              <ComparisonTable 
                books={category.books} 
                category="methodes-process" 
              />
            </div>
          </AnimatedSection>
        </section>

        {/* Grid de livres avec BookCard adaptée */}
        <section aria-labelledby="books-grid-title">
          <AnimatedSection delay={200}>
            <div className="max-w-6xl mx-auto mb-12 px-4">
              <h2 id="books-grid-title" className="sr-only">
                Liste des livres recommandés sur Méthodes & Process
              </h2>
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
                aria-label="Livres recommandés sur Méthodes & Process"
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

        {/* Section Domain Insights - Frameworks de vente */}
        <AnimatedSection delay={350}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="text-center mb-8">
              <span className="inline-block bg-cyan-500/20 text-cyan-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <span className="inline mr-2">🎯</span>
                Concepts fondamentaux
              </span>
              <h3 className="text-2xl font-bold text-primary-title mb-4">
                Les frameworks qui font la différence
              </h3>
              <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Découvrez les méthodes de vente les plus efficaces, testées et approuvées par des milliers de commerciaux dans le monde
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {methodsProcessesInsights.map((insight, index) => (
                <AnimatedSection key={index} delay={400 + index * 100}>
                  <DomainInsight {...insight} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Section : Exemples concrets PME */}
        <AnimatedSection delay={450}>
          <PMECaseStudy 
            caseStudies={methodsProcessesCaseStudies}
            title="Cas clients PME"
            subtitle="Découvrez comment mes clients PME appliquent concrètement ces frameworks de vente"
            domainColor="#3B82F6"
            domainIcon="🛠️"
            laurentExperienceQuote="Ces transformations méthodologiques ne se font pas du jour au lendemain. Mes clients qui réussissent le mieux choisissent d'abord UNE méthode, la maîtrisent parfaitement, puis l'adaptent à leur contexte. L'erreur classique est de vouloir mixer toutes les approches dès le départ."
            domainStats={[
              { value: "3 mois", label: "Durée moyenne d'adoption", description: "Pour maîtriser une méthode" },
              { value: "+40%", label: "Amélioration taux de closing", description: "Avec méthodes structurées" },
              { value: "85%", label: "Commerciaux plus confiants", description: "Avec processus clairs" }
            ]}
          />
        </AnimatedSection>

        {/* Section : Feuille de route d'implémentation */}
        <AnimatedSection delay={475}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-blue-400/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="inline-block bg-orange-soft/20 text-orange-soft font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🚀 Implémentation
                </span>
                <h3 className="text-2xl font-bold text-blue-ink dark:text-blue-400 mb-4">
                  Feuille de route pour transformer vos processus commerciaux
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-6">
                  Un plan progressif en 4 phases pour ancrer durablement les meilleures pratiques méthodologiques
                </p>
              </div>
              
              <ImplementationRoadmap 
                title="Feuille de route pour transformer vos processus commerciaux"
                subtitle="Un plan progressif en 4 phases pour ancrer durablement les meilleures pratiques méthodologiques"
                phases={methodsProcessesRoadmap}
                tips={[
                  "Commencez par UNE méthode et maîtrisez-la parfaitement avant d'en ajouter d'autres",
                  "Impliquez vos meilleurs commerciaux dans la conception du processus pour faciliter l'adoption",
                  "Mesurez systématiquement l'impact de chaque changement pour ajuster rapidement",
                  "Formez vos managers au coaching processus pour assurer la pérennité"
                ]}
                domainColor="#3B82F6"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Section : Suggestions cross-catégorie */}
        <AnimatedSection delay={500}>
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-blue-400/20 backdrop-blur-sm">
              <div className="text-center mb-6">
                <span className="inline-block bg-purple-500/20 text-purple-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🔗 Compléments recommandés
                </span>
                <h3 className="text-2xl font-bold text-blue-ink dark:text-blue-400 mb-4">
                  Enrichissez votre approche méthodologique
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200/50">
                  <h4 className="font-bold text-green-600 mb-2">🧠 Psychologie & Influence</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    Complétez vos frameworks avec la compréhension des mécanismes psychologiques de la décision
                  </p>
                  <Link href="/ressources/meilleurs-livres/psychologie-influence" className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Découvrir les livres →
                  </Link>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl border border-red-200/50">
                  <h4 className="font-bold text-red-600 mb-2">🤝 Négociation & Closing</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    Intégrez les techniques de closing dans vos processus de vente formalisés
                  </p>
                  <Link href="/ressources/meilleurs-livres/negociation-closing" className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Découvrir les livres →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTAs multiples - Méthodes & Process */}
        <AnimatedSection delay={525}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* CTA Principal - Bootcamp Méthodes de Vente */}
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Formation spécialisée</div>
                    <h4 className="text-xl font-bold">Bootcamp Méthodes de Vente</h4>
                  </div>
                </div>
                <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                  Maîtrisez SPIN Selling, Challenger Sale, Solution Selling et Gap Selling avec des cas pratiques adaptés aux PME françaises.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href="/bootcamp-commercial-intensif" 
                    className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition text-center"
                  >
                    Voir le programme
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-block border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition text-center"
                  >
                    Coaching individuel
                  </Link>
                </div>
              </div>

              {/* CTA Secondaire - Audit Processus */}
              <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl p-6 border border-blue-200/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Évaluation gratuite</div>
                    <h4 className="text-xl font-bold text-blue-ink dark:text-blue-400">Audit Processus Commercial</h4>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  Analysez vos processus commerciaux actuels et identifiez quelle méthode structurée adopter en priorité.
                </p>
                <Link 
                  href="/diagnostic" 
                  className="inline-block bg-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition w-full text-center"
                >
                  Faire l'audit
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8 px-4">
          <Link href="/ressources/meilleurs-livres" className="text-blue-400 hover:text-blue-300 text-lg transition-colors">
            ← Retour à la rubrique Meilleurs livres
          </Link>
        </div>
      </main>
    </>
  );
} 