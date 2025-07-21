import { mindsetPerformanceCategory } from '@/data/books-enriched';
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
import { 
  mindsetPerformanceInsights, 
  mindsetPerformanceCaseStudies, 
  mindsetPerformanceRoadmap,
  mindsetPerformanceStats 
} from '@/data/mindset-performance-content';
import Link from 'next/link';
import React from 'react';

// Données structurées Schema.org pour la page catégorie
const categoryStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Mindset & Performance - Meilleurs Livres",
  "description": "Développer un état d'esprit de croissance et optimiser ses performances personnelles. Découvrez les références essentielles pour cultiver l'état d'esprit gagnant et maximiser votre potentiel commercial.",
  "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Meilleurs livres Mindset & Performance",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "Atomic Habits",
        "author": "James Clear",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance/atomic-habits"
      },
      {
        "@type": "Book", 
        "position": 2,
        "name": "Les 7 habitudes des gens très efficaces",
        "author": "Stephen R. Covey",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance/7-habitudes-gens-efficaces"
      },
      {
        "@type": "Book",
        "position": 3, 
        "name": "Mindset: The New Psychology of Success",
        "author": "Carol Dweck",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance/mindset-new-psychology-success"
      },
      {
        "@type": "Book",
        "position": 4,
        "name": "Grit: The Power of Passion and Perseverance", 
        "author": "Angela Duckworth",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance/grit-power-passion-perseverance"
      },
      {
        "@type": "Book",
        "position": 5,
        "name": "The Power of Now",
        "author": "Eckhart Tolle", 
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance/the-power-of-now"
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
        "name": "Mindset & Performance"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Mindset & Performance | Meilleurs Livres | Laurent Serre',
  description: 'Les meilleurs livres sur le mindset et la performance personnelle. Atomic Habits, Les 7 habitudes, Mindset de Carol Dweck, Grit. Résumés détaillés et conseils terrain de Laurent Serre.',
  keywords: [
    'mindset commercial',
    'performance personnelle', 
    'état d\'esprit gagnant',
    'développement personnel commercial',
    'habitudes performance',
    'atomic habits james clear',
    'carol dweck mindset',
    'stephen covey 7 habitudes',
    'grit angela duckworth',
    'laurent serre développement'
  ],
  openGraph: {
    title: 'Mindset & Performance | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur le mindset et la performance personnelle. Atomic Habits, Les 7 habitudes, Mindset de Carol Dweck, Grit. Résumés détaillés et conseils terrain.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance',
    images: [
      {
        url: 'https://laurent-serre-developpement.fr/images/og-mindset-performance.jpg',
        width: 1200,
        height: 630,
        alt: 'Mindset & Performance - Meilleurs Livres par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre Développement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mindset & Performance | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur le mindset et la performance personnelle. Atomic Habits, Les 7 habitudes, Mindset de Carol Dweck, Grit.',
    images: ['https://laurent-serre-developpement.fr/images/og-mindset-performance.jpg'],
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance',
  },
  other: {
    'preload': '/ressources/meilleurs-livres/mindset-performance/atomic-habits as document',
  },
};

export default function MindsetPerformancePage() {
  const category = mindsetPerformanceCategory;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      
      <main className="relative bg-gradient-to-br from-orange-soft/20 via-amber-50/30 to-orange-100/40 min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Particle background with warm orange tones for motivational atmosphere */}
        <ParticleBackground 
          density={35}
          speed={0.4}
          color="#FFAA5C"
          opacity={0.6}
          className="absolute inset-0"
        />
        
        {/* Additional warm gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-soft/5 via-transparent to-amber-200/10 pointer-events-none"></div>
        
        {/* Floating motivational elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top floating elements */}
          <div className="absolute top-32 left-10 opacity-20 animate-float" style={{ animationDelay: '0s' }}>
            <span className="text-4xl">🎯</span>
          </div>
          <div className="absolute top-48 right-16 opacity-15 animate-float" style={{ animationDelay: '1s' }}>
            <span className="text-3xl">💪</span>
          </div>
          <div className="absolute top-64 left-1/4 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
            <span className="text-2xl">🚀</span>
          </div>
          
          {/* Middle floating elements */}
          <div className="absolute top-1/2 right-8 opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>
            <span className="text-3xl">⚡</span>
          </div>
          <div className="absolute top-1/2 left-12 opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>
            <span className="text-2xl">🔥</span>
          </div>
          
          {/* Bottom floating elements */}
          <div className="absolute bottom-32 right-1/4 opacity-10 animate-float" style={{ animationDelay: '2.5s' }}>
            <span className="text-3xl">💎</span>
          </div>
          <div className="absolute bottom-48 left-8 opacity-20 animate-float" style={{ animationDelay: '3s' }}>
            <span className="text-2xl">🏆</span>
          </div>
        </div>
        
        {/* Breadcrumb navigation */}
        <CategoryBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: 'Mindset & Performance', href: '/ressources/meilleurs-livres/mindset-performance', current: true }
          ]}
          relatedCategories={categoryBreadcrumbSuggestions['mindset-performance']}
        />

        {/* Hero section avec présentation de l'importance du mindset */}
        <section className="max-w-4xl mx-auto text-center mb-12 px-4" aria-labelledby="hero-title">
          <AnimatedSection animation="fade-in" delay={0}>
            <span 
              className="inline-block bg-orange-soft/20 text-orange-soft font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
              role="status"
              aria-label={`Catégorie ${category.title}`}
            >
              <span aria-hidden="true">{category.icon}</span> Catégorie
            </span>
            <h1 id="hero-title" className="text-4xl md:text-5xl font-bold text-primary-title mb-4 drop-shadow-lg">
              {category.title}
            </h1>
            <p className="text-lg md:text-xl text-primary-secondary/90 mb-6 leading-relaxed max-w-3xl mx-auto">
              {category.description}
            </p>
            
            {/* Message spécifique sur l'importance du mindset avec effets visuels */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 mt-8 border border-orange-soft/30 overflow-hidden group hover:bg-white/95 transition-all duration-500 shadow-lg">
              {/* Animated background elements with warm tones */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-soft/30 to-amber-400/25 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-orange-400/25 to-red-300/20 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
              
              {/* Floating motivational icons with warm glow */}
              <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                <span className="text-2xl filter drop-shadow-sm">🎯</span>
              </div>
              <div className="absolute bottom-4 left-4 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                <span className="text-xl filter drop-shadow-sm">💪</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl filter drop-shadow-sm">🧠</span>
                  <h2 className="text-xl font-bold text-primary-title">
                    Le mindset, clé de la performance commerciale
                  </h2>
                </div>
                <p className="text-primary-secondary leading-relaxed mb-6">
                  Techniques de vente, méthodes de prospection, outils CRM... Tout cela ne sert à rien 
                  sans le bon état d'esprit. Ces 5 livres vous donnent les clés pour développer la mentalité, 
                  les habitudes et la discipline qui transforment un commercial moyen en top performer.
                </p>
                
                {/* Laurent Serre positioning avec design warm */}
                <div className="bg-orange-soft/10 rounded-lg p-4 mb-6 border border-orange-soft/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-soft to-amber-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-sm">LS</span>
                    </div>
                    <span className="text-orange-600 font-bold text-sm uppercase tracking-wide">Vision Laurent Serre</span>
                  </div>
                  <p className="text-primary-secondary text-sm italic leading-relaxed">
                    "En 20 ans d'accompagnement PME, j'ai vu des commerciaux techniquement parfaits échouer par manque de mental, 
                    et d'autres moins doués exploser leurs objectifs grâce à leur état d'esprit. Le mindset, c'est ce qui fait la différence 
                    entre ceux qui abandonnent au premier 'non' et ceux qui transforment chaque objection en opportunité d'apprentissage."
                  </p>
                </div>
                
                {/* Performance stats avec design warm */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-orange-soft/30">
                  <div className="text-center group/stat">
                    <div className="text-2xl font-bold text-orange-600 group-hover/stat:text-orange-500 transition-colors">80%</div>
                    <div className="text-xs text-primary-secondary/70 font-medium">du succès vient du mindset</div>
                  </div>
                  <div className="text-center group/stat">
                    <div className="text-2xl font-bold text-orange-600 group-hover/stat:text-orange-500 transition-colors">5x</div>
                    <div className="text-xs text-primary-secondary/70 font-medium">plus de résilience</div>
                  </div>
                  <div className="text-center group/stat">
                    <div className="text-2xl font-bold text-orange-600 group-hover/stat:text-orange-500 transition-colors">90%</div>
                    <div className="text-xs text-primary-secondary/70 font-medium">des top performers appliquent ces principes</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Tableau comparatif avec critères spécifiques Mindset & Performance */}
        <section aria-labelledby="comparison-title">
          <AnimatedSection delay={100}>
            <div className="max-w-6xl mx-auto px-4">
              <h2 id="comparison-title" className="sr-only">
                Tableau comparatif des livres Mindset & Performance
              </h2>
              <ComparisonTable 
                books={category.books} 
                category="mindset-performance" 
              />
            </div>
          </AnimatedSection>
        </section>

        {/* Grid de livres avec BookCard adaptée */}
        <section aria-labelledby="books-grid-title">
          <AnimatedSection delay={200}>
            <div className="max-w-6xl mx-auto mb-12 px-4">
              <h2 id="books-grid-title" className="sr-only">
                Liste des livres recommandés sur Mindset & Performance
              </h2>
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
                aria-label="Livres recommandés sur Mindset & Performance"
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

        {/* Section Domain Insights - Concepts clés du mindset */}
        <AnimatedSection delay={350}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="text-center mb-8">
              <span className="inline-block bg-orange-500/20 text-orange-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <span className="inline mr-2">🧠</span>
                Concepts fondamentaux
              </span>
              <h3 className="text-2xl font-bold text-primary-title mb-4">
                Les piliers du mindset de performance
              </h3>
              <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Découvrez les concepts essentiels qui transforment l'état d'esprit et libèrent le potentiel commercial
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {mindsetPerformanceInsights.map((insight, index) => (
                <AnimatedSection key={index} delay={400 + index * 100}>
                  <DomainInsight {...insight} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Section spécifique : Impact du mindset sur les métiers commerciaux */}
        <AnimatedSection delay={450}>
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="bg-white/70 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 border border-orange-400/20 backdrop-blur-sm">
              <div className="text-center mb-6">
                <span className="inline-block bg-orange-500/20 text-orange-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🎯 Focus métier
                </span>
                <h3 className="text-2xl font-bold text-orange-600 mb-4">
                  Comment le mindset transforme votre performance commerciale
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600 flex items-center gap-2">
                    ✅ Compétences renforcées par le bon mindset
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>• Résilience face aux refus et objections</li>
                    <li>• Constance dans l'activité de prospection</li>
                    <li>• Capacité d'apprentissage continu</li>
                    <li>• Gestion du stress et des émotions</li>
                    <li>• Motivation intrinsèque durable</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-red-600 flex items-center gap-2">
                    ⚠️ Blocages du mindset limitant
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>• Abandon rapide face aux difficultés</li>
                    <li>• Peur de l'échec et du jugement</li>
                    <li>• Procrastination et manque de discipline</li>
                    <li>• Résistance au changement et feedback</li>
                    <li>• Dépendance à la motivation externe</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-200 italic">
                  💡 <strong>Conseil Laurent Serre :</strong> Le mindset n'est pas inné, il se développe. 
                  Commencez par identifier vos croyances limitantes, puis travaillez une habitude à la fois. 
                  La transformation prend du temps, mais les résultats sont durables !
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section : Cas clients PME */}
        <AnimatedSection delay={500}>
          <CaseStudyGrid 
            caseStudies={mindsetPerformanceCaseStudies}
            title="Transformations mindset en PME"
            subtitle="Découvrez comment mes clients PME ont développé un état d'esprit de performance"
            domainColor="#FF6B35"
          />
        </AnimatedSection>

        {/* Section : Feuille de route d'implémentation */}
        <AnimatedSection delay={550}>
          <ImplementationRoadmap 
            phases={mindsetPerformanceRoadmap.phases.map((phase, index) => ({
              phase: index + 1,
              title: phase.title,
              duration: phase.duration,
              description: phase.description,
              keyActions: phase.actions || [],
              expectedResults: phase.deliverables || [],
              laurentTip: phase.success_metrics || "",
              difficulty: "Intermédiaire" as const,
              prerequisites: []
            }))}
            categoryTheme={{
              primaryColor: "#F59E0B",
              secondaryColor: "#EF4444",
              accentColor: "#FEF3C7",
              particleColor: "#F59E0B",
              gradientFrom: "from-amber-600",
              gradientTo: "to-primary-bg",
              gradientVia: "via-red-500/10",
              icon: "🎯",
              name: "Mindset & Performance"
            }}
            domainTitle="le mindset de performance"
          />
        </AnimatedSection>

        {/* Section : Suggestions cross-catégorie et CTAs */}
        <AnimatedSection delay={600}>
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="bg-white/70 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 border border-orange-400/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="inline-block bg-amber-500/20 text-amber-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🔗 Complémentarité
                </span>
                <h3 className="text-2xl font-bold text-orange-600 mb-4">
                  Combinez mindset et techniques pour maximiser vos résultats
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Le mindset seul ne suffit pas. Découvrez les autres domaines essentiels pour une performance commerciale complète.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Link 
                  href="/ressources/meilleurs-livres/prospection-sdr"
                  className="group p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📞</span>
                    <h4 className="font-bold text-blue-600 group-hover:text-blue-500">Prospection & SDR</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Appliquez votre nouveau mindset aux techniques de prospection pour générer plus d'opportunités.
                  </p>
                </Link>
                
                <Link 
                  href="/ressources/meilleurs-livres/negotiation-closing"
                  className="group p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl border border-red-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🤝</span>
                    <h4 className="font-bold text-red-600 group-hover:text-red-500">Négociation & Closing</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Utilisez votre résilience mentale pour mieux négocier et conclure vos ventes.
                  </p>
                </Link>
              </div>
              
              {/* CTA principal */}
              <div className="text-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span>🚀</span>
                  Développer le mindset de votre équipe
                  <span>→</span>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Accompagnement personnalisé pour transformer l'état d'esprit de vos commerciaux
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}