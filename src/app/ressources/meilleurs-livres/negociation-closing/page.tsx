import { negotiationClosingCategory } from '@/data/books-enriched';
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
import { categoryBreadcrumbSuggestions } from '@/utils/cross-category-suggestions';
import { 
  negotiationInsights, 
  negotiationCaseStudies, 
  negotiationImplementationRoadmap,
  negotiationStats,
  laurentSerreVision
} from '@/data/negotiation-closing-content';
import React from 'react';

// Données structurées Schema.org pour la page catégorie
const categoryStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Négociation & Closing - Meilleurs Livres",
  "description": "Les meilleurs livres sur la négociation commerciale et les techniques de closing. Never Split the Difference, Getting to Yes, SPIN Selling. Résumés détaillés et conseils terrain de Laurent Serre.",
  "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/negociation-closing",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Meilleurs livres Négociation & Closing",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "Never Split the Difference",
        "author": "Chris Voss",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/negociation-closing/never-split-the-difference"
      },
      {
        "@type": "Book", 
        "position": 2,
        "name": "Getting to Yes",
        "author": "Roger Fisher & William Ury",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/negociation-closing/getting-to-yes"
      },
      {
        "@type": "Book",
        "position": 3, 
        "name": "SPIN Selling",
        "author": "Neil Rackham",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/negociation-closing/spin-selling"
      },
      {
        "@type": "Book",
        "position": 4,
        "name": "The Challenger Sale", 
        "author": "Matthew Dixon & Brent Adamson",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/negociation-closing/the-challenger-sale"
      },
      {
        "@type": "Book",
        "position": 5,
        "name": "The Lost Art of Closing",
        "author": "Anthony Iannarino", 
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/negociation-closing/the-lost-art-of-closing"
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
        "name": "Négociation & Closing"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Négociation & Closing | Meilleurs Livres | Laurent Serre',
  description: 'Les meilleurs livres sur la négociation commerciale et les techniques de closing. Never Split the Difference, Getting to Yes, SPIN Selling. Résumés détaillés et conseils terrain de Laurent Serre.',
  keywords: [
    'négociation commerciale',
    'techniques closing', 
    'never split difference',
    'getting to yes',
    'spin selling',
    'challenger sale',
    'négociation B2B',
    'closing vente',
    'laurent serre'
  ],
  openGraph: {
    title: 'Négociation & Closing | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur la négociation commerciale et les techniques de closing. Never Split the Difference, Getting to Yes, SPIN Selling. Résumés détaillés et conseils terrain.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/negociation-closing',
    images: [
      {
        url: 'https://laurent-serre-developpement.fr/images/og-negociation-closing.jpg',
        width: 1200,
        height: 630,
        alt: 'Négociation & Closing - Meilleurs Livres par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre Développement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Négociation & Closing | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur la négociation commerciale et les techniques de closing. Never Split the Difference, Getting to Yes, SPIN Selling.',
    images: ['https://laurent-serre-developpement.fr/images/og-negociation-closing.jpg'],
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/negociation-closing',
  },
  other: {
    'preload': '/ressources/meilleurs-livres/negociation-closing/never-split-the-difference as document',
  },
};

export default function NegociationClosingPage() {
  const category = negotiationClosingCategory;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      
      <main className="relative bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Particle background for negotiation atmosphere */}
        <ParticleBackground 
          density={30}
          speed={0.3}
          color="#EF4444"
          opacity={0.4}
          className="absolute inset-0"
        />
        
        {/* Breadcrumb navigation */}
        <CategoryBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: 'Négociation & Closing', href: '/ressources/meilleurs-livres/negociation-closing', current: true }
          ]}
          relatedCategories={categoryBreadcrumbSuggestions['negociation-closing']}
        />

        {/* Hero section avec présentation de la négociation collaborative */}
        <section className="max-w-4xl mx-auto text-center mb-12 px-4" aria-labelledby="hero-title">
          <AnimatedSection animation="fade-in" delay={0}>
            <span 
              className="inline-block bg-red-500/20 text-red-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
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
            
            {/* Message spécifique sur la négociation collaborative avec effets visuels */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-red-400/20 overflow-hidden group hover:bg-white/15 transition-all duration-500">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400/20 to-orange-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              {/* Floating negotiation icons */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <span className="text-2xl animate-pulse">🤝</span>
              </div>
              <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <span className="text-xl animate-bounce">💼</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h2 className="text-xl font-semibold text-red-400">
                    La négociation collaborative transforme les deals
                  </h2>
                </div>
                <p className="text-primary-secondary/90 leading-relaxed mb-4">
                  Fini le temps des négociations agressives et des compromis perdant-perdant. 
                  Les techniques modernes de négociation créent de la valeur mutuelle et transforment 
                  chaque deal en opportunité de partenariat durable. Ces 5 livres vous donnent les clés 
                  pour négocier avec élégance et efficacité.
                </p>
                
                {/* Laurent Serre positioning */}
                <div className="bg-white/10 rounded-lg p-4 mb-4 border border-red-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                      <span className="text-blue-ink font-bold text-sm">LS</span>
                    </div>
                    <span className="text-red-300 font-semibold">Vision Laurent Serre</span>
                  </div>
                  <p className="text-primary-secondary/90 text-sm italic">
                    "{laurentSerreVision}"
                  </p>
                </div>
                
                {/* Negotiation stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-red-400/20">
                  {negotiationStats.slice(0, 3).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-red-400">{stat.value}</div>
                      <div className="text-xs text-primary-secondary/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Tableau comparatif avec critères spécifiques Négociation */}
        <section aria-labelledby="comparison-title">
          <AnimatedSection delay={100}>
            <div className="max-w-6xl mx-auto px-4">
              <h2 id="comparison-title" className="sr-only">
                Tableau comparatif des livres Négociation & Closing
              </h2>
              <ComparisonTable 
                books={category.books} 
                category="negociation-closing" 
              />
            </div>
          </AnimatedSection>
        </section>

        {/* Grid de livres avec BookCard adaptée */}
        <section aria-labelledby="books-grid-title">
          <AnimatedSection delay={200}>
            <div className="max-w-6xl mx-auto mb-12 px-4">
              <h2 id="books-grid-title" className="sr-only">
                Liste des livres recommandés sur Négociation & Closing
              </h2>
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
                aria-label="Livres recommandés sur Négociation & Closing"
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

        {/* Section Domain Insights - Techniques de négociation */}
        <AnimatedSection delay={350}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="text-center mb-8">
              <span className="inline-block bg-orange-500/20 text-orange-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <span className="inline mr-2">🎯</span>
                Techniques fondamentales
              </span>
              <h3 className="text-2xl font-bold text-primary-title mb-4">
                Les piliers de la négociation moderne et du closing
              </h3>
              <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Découvrez les techniques qui transforment vos négociations en opportunités de création de valeur mutuelle, 
                avec des méthodes de closing modernes qui accompagnent naturellement le client vers la décision
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {negotiationInsights.map((insight, index) => (
                <AnimatedSection key={index} delay={400 + index * 100}>
                  <DomainInsight 
                    {...insight}
                    domainTheme={{
                      primaryColor: "#EF4444",
                      secondaryColor: "#F97316",
                      accentColor: "#F59E0B"
                    }}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Section spécifique : Impact négociation sur les résultats commerciaux */}
        <AnimatedSection delay={400}>
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-red-400/20 backdrop-blur-sm">
              <div className="text-center mb-6">
                <span className="inline-block bg-red-500/20 text-red-600 dark:text-red-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🎯 Focus métier
                </span>
                <h3 className="text-2xl font-bold text-blue-ink dark:text-red-400 mb-4">
                  Comment la négociation transforme vos résultats
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                    ✅ Négociation collaborative
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>• Création de valeur mutuelle</li>
                    <li>• Relations client durables</li>
                    <li>• Préservation des marges</li>
                    <li>• Satisfaction client élevée</li>
                    <li>• Recommandations et fidélisation</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                    ⚠️ Négociation traditionnelle
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>• Guerre des prix systématique</li>
                    <li>• Relations tendues post-signature</li>
                    <li>• Érosion des marges</li>
                    <li>• Clients insatisfaits</li>
                    <li>• Cycles de renouvellement difficiles</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-200 italic">
                  💡 <strong>Conseil Laurent Serre :</strong> La négociation collaborative n'est pas de la naïveté, 
                  c'est de l'intelligence business. Mes clients qui l'appliquent augmentent leurs marges de 25% 
                  tout en améliorant leur satisfaction client. Le secret ? Chercher toujours le gagnant-gagnant authentique.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section : Exemples concrets PME avec CaseStudyGrid */}
        <AnimatedSection delay={450}>
          <CaseStudyGrid 
            caseStudies={negotiationCaseStudies.map(study => ({
              industry: study.industry,
              companySize: study.companySize,
              challenge: study.challenge,
              solution: study.solution,
              results: study.results,
              metrics: study.metrics ? {
                before: study.metrics.marginIncrease || study.metrics.clientSatisfaction || "Situation initiale",
                after: study.metrics.dealQuality || study.metrics.signatureRate || "Après transformation", 
                timeline: study.timeline || "3 mois"
              } : undefined
            }))}
            title="Cas clients PME"
            subtitle="Découvrez comment mes clients PME appliquent concrètement les concepts de négociation collaborative"
            domainColor="#EF4444"
          />
        </AnimatedSection>

        {/* Section : Feuille de route d'implémentation avec ImplementationRoadmap */}
        <AnimatedSection delay={475}>
          <ImplementationRoadmap 
            title="Feuille de route pour maîtriser la négociation collaborative"
            subtitle="Un plan progressif en 4 phases pour transformer votre approche de la négociation"
            phases={negotiationImplementationRoadmap.map(phase => ({
              phase: phase.phase,
              title: phase.title,
              duration: phase.duration,
              description: phase.description,
              actions: phase.keyActions || [],
              expectedResults: phase.expectedResults,
              laurentAdvice: phase.laurentAdvice
            }))}
            tips={[
              "Commencez par analyser vos négociations perdues pour identifier les patterns récurrents",
              "Pratiquez les techniques sur des négociations à faible enjeu avant les gros deals",
              "Enregistrez vos négociations (avec accord) pour analyser votre progression",
              "Créez un kit de négociation avec vos meilleures preuves de valeur",
              "Développez votre BATNA avant chaque négociation importante"
            ]}
            domainColor="#EF4444"
          />
        </AnimatedSection>

        {/* Section : Suggestions cross-catégories */}
        <AnimatedSection delay={500}>
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-red-400/20 backdrop-blur-sm">
              <div className="text-center mb-6">
                <span className="inline-block bg-purple-500/20 text-purple-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🔗 Complémentaire
                </span>
                <h3 className="text-2xl font-bold text-blue-ink dark:text-red-400 mb-4">
                  Complétez votre expertise
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-6">
                  Ces domaines complémentaires enrichiront votre maîtrise de la négociation
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/ressources/meilleurs-livres/prospection-sdr"
                  className="group p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🎯</span>
                    <h4 className="font-bold text-blue-600 group-hover:text-blue-700">Prospection & SDR</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Alimentez votre pipeline avec des prospects qualifiés prêts à négocier. 
                    Plus vous avez d'opportunités, plus vous négociez en position de force.
                  </p>
                </Link>
                
                <Link 
                  href="/ressources/meilleurs-livres/psychologie-influence"
                  className="group p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🧠</span>
                    <h4 className="font-bold text-purple-600 group-hover:text-purple-700">Psychologie & Influence</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Maîtrisez les biais cognitifs et techniques d'influence pour négocier 
                    avec une compréhension profonde des mécanismes de décision.
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
              <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-6 border border-red-400/20 backdrop-blur-sm">
                <div className="inline-block bg-red-500/20 text-red-600 dark:text-red-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🎯 Formation
                </div>
                <h4 className="text-xl font-bold text-blue-ink dark:text-red-400 mb-3">
                  Bootcamp Négociation
                </h4>
                <p className="text-gray-700 dark:text-gray-200 mb-4 text-sm">
                  Maîtrisez les techniques de ces livres avec une formation pratique adaptée aux enjeux PME. 
                  Négociation collaborative, closing consultatif, gestion des objections.
                </p>
                <Link 
                  href="/bootcamp-commercial-intensif" 
                  className="inline-block bg-red-500 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-600 transition-colors duration-300"
                >
                  Découvrir le Bootcamp
                </Link>
              </div>
              
              <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-6 border border-orange-400/20 backdrop-blur-sm">
                <div className="inline-block bg-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🤝 Accompagnement
                </div>
                <h4 className="text-xl font-bold text-blue-ink dark:text-orange-400 mb-3">
                  Coaching Négociation Personnalisé
                </h4>
                <p className="text-gray-700 dark:text-gray-200 mb-4 text-sm">
                  Accompagnement individuel pour transformer votre approche de la négociation. 
                  Débriefing de vos négociations réelles, techniques avancées, mindset gagnant.
                </p>
                <Link 
                  href="/coach-commercial-entreprise" 
                  className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-orange-600 transition-colors duration-300"
                >
                  Découvrir le Coaching
                </Link>
              </div>
            </div>
            
            <div className="mt-6">
              <Link 
                href="/ressources/meilleurs-livres" 
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-300"
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