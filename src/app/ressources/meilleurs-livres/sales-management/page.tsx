import { salesManagementCategory } from '@/data/books-enriched';
import Link from 'next/link';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ComparisonTable from '@/components/ui/ComparisonTable';
import BookCard from '@/components/ui/BookCard';
import CategoryBreadcrumb from '@/components/ui/CategoryBreadcrumb';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { categoryBreadcrumbSuggestions } from '@/utils/cross-category-suggestions';
import React from 'react';

// Données structurées Schema.org pour la page catégorie
const categoryStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Sales Management & Leadership - Meilleurs Livres",
  "description": "Management et leadership commercial : les références pour diriger, motiver et développer des équipes commerciales performantes.",
  "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Meilleurs livres Sales Management & Leadership",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "Good to Great",
        "author": "Jim Collins",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/good-to-great"
      },
      {
        "@type": "Book", 
        "position": 2,
        "name": "High Output Management",
        "author": "Andy Grove",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/high-output-management"
      },
      {
        "@type": "Book",
        "position": 3, 
        "name": "Blue Ocean Strategy",
        "author": "W. Chan Kim & Renée Mauborgne",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/blue-ocean-strategy"
      },
      {
        "@type": "Book",
        "position": 4,
        "name": "The Innovator's Dilemma", 
        "author": "Clayton Christensen",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/innovators-dilemma"
      },
      {
        "@type": "Book",
        "position": 5,
        "name": "Leaders Eat Last",
        "author": "Simon Sinek", 
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/leaders-eat-last"
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
        "name": "Sales Management & Leadership"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Sales Management & Leadership | Meilleurs Livres | Laurent Serre',
  description: 'Les meilleurs livres de management et leadership commercial. Good to Great, High Output Management, Blue Ocean Strategy. Résumés détaillés et avis terrain de Laurent Serre.',
  keywords: [
    'management commercial',
    'leadership vente', 
    'manager équipe commerciale',
    'good to great',
    'high output management',
    'blue ocean strategy',
    'leaders eat last',
    'innovators dilemma',
    'laurent serre'
  ],
  openGraph: {
    title: 'Sales Management & Leadership | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres de management et leadership commercial. Good to Great, High Output Management, Blue Ocean Strategy. Résumés détaillés et avis terrain.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Management & Leadership | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres de management et leadership commercial. Good to Great, High Output Management, Blue Ocean Strategy.',
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management',
  },
  other: {
    'preload': '/ressources/meilleurs-livres/sales-management/good-to-great as document',
  },
};

export default function SalesManagementPage() {
  const category = salesManagementCategory;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      
      <main className="relative bg-gradient-to-br from-primary-bg via-green-500/10 to-background min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Particle background for management atmosphere */}
        <ParticleBackground 
          density={30}
          speed={0.2}
          color="#00BDA4"
          opacity={0.3}
          className="absolute inset-0"
        />
        
        {/* Breadcrumb navigation */}
        <CategoryBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: 'Sales Management & Leadership', href: '/ressources/meilleurs-livres/sales-management', current: true }
          ]}
          relatedCategories={categoryBreadcrumbSuggestions['sales-management']}
        />

        {/* Hero section avec présentation du leadership commercial */}
        <section className="max-w-4xl mx-auto text-center mb-12 px-4" aria-labelledby="hero-title">
          <AnimatedSection animation="fade-in" delay={0}>
            <span 
              className="inline-block bg-green-500/20 text-green-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
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
            
            {/* Message spécifique sur le leadership commercial avec effets visuels */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-green-400/20 overflow-hidden group hover:bg-white/15 transition-all duration-500">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-yellow-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-yellow-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">👑</span>
                  </div>
                  <h2 className="text-xl font-semibold text-green-400">
                    Le leadership commercial transforme tout
                  </h2>
                </div>
                <p className="text-primary-secondary/90 leading-relaxed mb-4">
                  Manager une équipe commerciale ne s'improvise pas. Entre motivation, coaching, pilotage et développement des talents, 
                  le leadership commercial moderne exige une approche structurée et humaine. 
                  Ces 5 livres vous donnent les clés pour devenir le manager que vos équipes méritent.
                </p>
                
                {/* Laurent Serre positioning */}
                <div className="bg-white/10 rounded-lg p-4 mb-4 border border-green-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-blue-ink font-bold text-sm">LS</span>
                    </div>
                    <span className="text-green-300 font-semibold">Vision Laurent Serre</span>
                  </div>
                  <p className="text-primary-secondary/90 text-sm italic">
                    "En 20 ans d'accompagnement, j'ai vu des équipes se transformer grâce à un leadership de qualité. 
                    Un bon manager commercial ne se contente pas de fixer des objectifs : il révèle le potentiel de chacun, 
                    crée une culture de performance et développe les talents. C'est un métier à part entière."
                  </p>
                </div>
                
                {/* Management stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-green-400/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">85%</div>
                    <div className="text-xs text-primary-secondary/70">des équipes bien managées dépassent leurs objectifs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">3x</div>
                    <div className="text-xs text-primary-secondary/70">moins de turnover</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">70%</div>
                    <div className="text-xs text-primary-secondary/70">d'amélioration de la motivation</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

      {/* Tableau comparatif */}
      <AnimatedSection delay={100}>
        <div className="max-w-6xl mx-auto px-4">
          <ComparisonTable 
            books={category.books} 
            category="sales-management" 
          />
        </div>
      </AnimatedSection>

      {/* Grid de livres */}
      <section aria-labelledby="books-grid-title">
        <AnimatedSection delay={200}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <h2 id="books-grid-title" className="sr-only">
              Liste des livres recommandés sur Sales Management & Leadership
            </h2>
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
              aria-label="Livres recommandés sur Sales Management & Leadership"
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



      {/* Section spécifique : Impact du leadership sur les équipes commerciales */}
      <AnimatedSection delay={400}>
        <div className="max-w-4xl mx-auto mb-12 px-4">
          <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-green-400/20 backdrop-blur-sm">
            <div className="text-center mb-6">
              <span className="inline-block bg-green-500/20 text-green-600 dark:text-green-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                🎯 Focus métier
              </span>
              <h3 className="text-2xl font-bold text-blue-ink dark:text-green-400 mb-4">
                Comment le leadership transforme vos équipes commerciales
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                  ✅ Équipes bien managées
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>• Dépassement régulier des objectifs</li>
                  <li>• Engagement et motivation élevés</li>
                  <li>• Développement des compétences</li>
                  <li>• Rétention des talents</li>
                  <li>• Innovation et proactivité</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                  ⚠️ Équipes mal managées
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>• Objectifs non atteints</li>
                  <li>• Turnover élevé</li>
                  <li>• Démotivation générale</li>
                  <li>• Manque de cohésion</li>
                  <li>• Résistance au changement</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-200 italic">
                💡 <strong>Conseil Laurent Serre :</strong> Le leadership commercial ne s'improvise pas. 
                C'est un savant mélange de vision stratégique, d'intelligence émotionnelle et de compétences techniques. 
                Investissez dans votre développement managérial : c'est le levier le plus puissant pour transformer vos résultats !
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>



      {/* Suggestions cross-catégories */}
      <AnimatedSection delay={400}>
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-mint-green/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                📚 Élargissez vos compétences
              </span>
              <h3 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">
                Livres complémentaires d'autres catégories
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                Pour un management moderne, combinez leadership traditionnel et transformation digitale
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/human-machine"
                className="group p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <span className="inline-block bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium px-2 py-1 rounded-full mb-2">
                      Digital & AI Sales
                    </span>
                    <h4 className="text-xl font-bold text-blue-ink dark:text-blue-300 mb-2 group-hover:text-blue-500 transition-colors">
                      Human + Machine
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Paul Daugherty & James Wilson • 2018
                    </p>
                  </div>
                  <span className="text-blue-500 text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                  Pour comprendre comment l'IA peut augmenter les capacités de management de votre équipe
                </p>
                <span className="text-blue-500 font-medium group-hover:underline text-sm">
                  Découvrir ce livre
                </span>
              </Link>
              
              <Link 
                href="/ressources/meilleurs-livres/digital-ai/the-second-machine-age"
                className="group p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <span className="inline-block bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium px-2 py-1 rounded-full mb-2">
                      Digital & AI Sales
                    </span>
                    <h4 className="text-xl font-bold text-blue-ink dark:text-blue-300 mb-2 group-hover:text-blue-500 transition-colors">
                      The Second Machine Age
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Erik Brynjolfsson & Andrew McAfee • 2014
                    </p>
                  </div>
                  <span className="text-blue-500 text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                  Pour anticiper l'impact des technologies numériques sur votre organisation commerciale
                </p>
                <span className="text-blue-500 font-medium group-hover:underline text-sm">
                  Découvrir ce livre
                </span>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTAs multiples */}
      <AnimatedSection delay={500}>
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* CTA Bootcamp */}
            <div className="bg-gradient-to-r from-mint-green/20 to-blue-ink/20 rounded-2xl shadow-xl p-8 text-center border border-mint-green/30 backdrop-blur-sm">
              <div className="inline-block bg-mint-green/30 text-mint-green font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
                🎯 Formation
              </div>
              <h4 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">
                Bootcamp Commercial Intensif
              </h4>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                Formez-vous avec les meilleures méthodes de management commercial issues de ces livres de référence
              </p>
              <Link 
                href="/bootcamp-commercial-intensif" 
                className="inline-block bg-mint-green text-blue-ink font-bold px-8 py-4 rounded-full shadow-lg hover:bg-mint-green/90 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                Voir le Bootcamp
              </Link>
            </div>

            {/* CTA Coaching */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl shadow-xl p-8 text-center border border-blue-300/30 backdrop-blur-sm">
              <div className="inline-block bg-blue-500/30 text-blue-300 font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur">
                👥 Accompagnement
              </div>
              <h4 className="text-2xl font-bold text-blue-ink dark:text-blue-300 mb-4">
                Coaching Management Commercial
              </h4>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                Accompagnement personnalisé pour transformer votre leadership et développer une équipe d'excellence
              </p>
              <Link 
                href="/coach-commercial-entreprise" 
                className="inline-block bg-blue-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                Découvrir le coaching
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Navigation retour */}
      <div className="max-w-3xl mx-auto text-center mt-8 px-4">
        <Link 
          href="/ressources/meilleurs-livres" 
          className="text-mint-green underline hover:text-mint-green/80 text-lg transition-colors"
        >
          ← Retour à la rubrique Meilleurs livres
        </Link>
      </div>
      </main>
    </>
  );
}