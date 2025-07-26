import { enterpriseAccountCategory } from '@/data/books-enriched';
import Link from 'next/link';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ComparisonTable from '@/components/ui/ComparisonTable';
import BookCard from '@/components/ui/BookCard';
import CategoryBreadcrumb from '@/components/ui/CategoryBreadcrumb';
import ParticleBackground from '@/components/ui/ParticleBackground';
import DomainInsight from '@/components/ui/DomainInsight';
import ImplementationRoadmap from '@/components/ui/ImplementationRoadmap';
import CaseStudyGrid from '@/components/ui/CaseStudyGrid';

import { categoryBreadcrumbSuggestions } from '@/utils/cross-category-suggestions';
import { 
  enterpriseAccountInsights, 
  enterpriseAccountCaseStudies, 
  enterpriseAccountRoadmap,
  enterpriseAccountStats,
  laurentSerreVision
} from '@/data/enterprise-account-content';
import React from 'react';

// Données structurées Schema.org pour la page catégorie
const categoryStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Enterprise Account Management - Meilleurs Livres",
  "description": "Les meilleurs livres sur la gestion des comptes stratégiques et grands comptes. Strategic Selling, Key Account Management, The Challenger Customer. Résumés détaillés et conseils terrain.",
  "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/enterprise-account",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Meilleurs livres Enterprise Account Management",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "The Challenger Customer",
        "author": "Brent Adamson et al.",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/enterprise-account/the-challenger-customer"
      },
      {
        "@type": "Book", 
        "position": 2,
        "name": "Mastering the Complex Sale",
        "author": "Jeff Thull",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/enterprise-account/mastering-the-complex-sale"
      },
      {
        "@type": "Book",
        "position": 3, 
        "name": "Key Account Management: The Definitive Guide",
        "author": "Diana Woodburn & Malcolm McDonald",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/enterprise-account/key-account-management-definitive-guide"
      },
      {
        "@type": "Book",
        "position": 4,
        "name": "The New Successful Large Account Management (LAMP)", 
        "author": "Robert Miller, Stephen Heiman, Tad Tuleja",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/enterprise-account/the-new-successful-large-account-management"
      },
      {
        "@type": "Book",
        "position": 5,
        "name": "Selling to Big Companies",
        "author": "Jill Konrath", 
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/enterprise-account/selling-to-big-companies"
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
        "name": "Enterprise Account Management"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Gestion des Grands Comptes | Meilleurs Livres | Laurent Serre',
  description: 'Les meilleurs livres sur la gestion des comptes stratégiques. Strategic Selling, Key Account Management, The Challenger Customer. Résumés détaillés et conseils terrain de Laurent Serre.',
  keywords: [
    'gestion grands comptes',
    'key account management',
    'comptes stratégiques',
    'strategic selling',
    'account management',
    'challenger customer',
    'vente grands comptes',
    'laurent serre'
  ],
  openGraph: {
    title: 'Gestion des Grands Comptes | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur la gestion des comptes stratégiques. Strategic Selling, Key Account Management, The Challenger Customer. Résumés détaillés et conseils terrain.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/enterprise-account',
    images: [
      {
        url: 'https://laurent-serre-developpement.fr/images/og-enterprise-account.jpg',
        width: 1200,
        height: 630,
        alt: 'Gestion des Grands Comptes - Meilleurs Livres par Laurent Serre',
      },
    ],
    siteName: 'Laurent Serre Développement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gestion des Grands Comptes | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres sur la gestion des comptes stratégiques. Strategic Selling, Key Account Management, The Challenger Customer.',
    images: ['https://laurent-serre-developpement.fr/images/og-enterprise-account.jpg'],
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/enterprise-account',
  },
  other: {
    'preload': '/ressources/meilleurs-livres/enterprise-account/the-challenger-customer as document',
  },
};

export default function EnterpriseAccountPage() {
  const category = enterpriseAccountCategory;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      
      <main className="relative bg-gradient-to-br from-emerald-600 via-green-500/10 to-primary-bg min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Particle background for enterprise atmosphere */}
        <ParticleBackground 
          density={30}
          speed={0.3}
          color="#10B981"
          opacity={0.4}
          className="absolute inset-0"
        />
        
        {/* Breadcrumb navigation */}
        <CategoryBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: 'Enterprise Account', href: '/ressources/meilleurs-livres/enterprise-account', current: true }
          ]}
          relatedCategories={categoryBreadcrumbSuggestions ? categoryBreadcrumbSuggestions['enterprise-account'] : []}
        />

        {/* Hero section avec présentation des comptes stratégiques */}
        <section className="max-w-4xl mx-auto text-center mb-12 px-4" aria-labelledby="hero-title">
          <AnimatedSection animation="fade-in" delay={0}>
            <span 
              className="inline-block bg-emerald-500/20 text-emerald-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
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
            
            {/* Message spécifique sur les comptes stratégiques avec effets visuels */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-emerald-400/20 overflow-hidden group hover:bg-white/15 transition-all duration-500">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h2 className="text-xl font-semibold text-emerald-400">
                    Les comptes stratégiques, clé de la croissance PME
                  </h2>
                </div>
                <p className="text-primary-secondary/90 leading-relaxed mb-4">
                  En PME, 80% du chiffre d'affaires provient souvent de 20% des clients. Maîtriser la gestion des comptes stratégiques 
                  n'est pas un luxe de grande entreprise, c'est une nécessité de survie et de croissance pour les PME ambitieuses.
                </p>
                
                {/* Vision Laurent Serre OBLIGATOIRE */}
                <div className="bg-white/10 rounded-lg p-4 mb-4 border border-emerald-400/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-blue-ink font-bold text-sm">LS</span>
                    </div>
                    <span className="text-emerald-300 font-semibold">Vision Laurent Serre</span>
                  </div>
                  <p className="text-primary-secondary/90 text-sm italic">
                    "{laurentSerreVision}"
                  </p>
                </div>
                
                {/* Stats spécifiques au domaine */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-emerald-400/20">
                  {enterpriseAccountStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                      <div className="text-xs text-primary-secondary/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Tableau comparatif avec critères spécifiques Enterprise */}
        <section aria-labelledby="comparison-title">
          <AnimatedSection delay={100}>
            <div className="max-w-6xl mx-auto px-4">
              <h2 id="comparison-title" className="sr-only">
                Tableau comparatif des livres Enterprise Account Management
              </h2>
              <ComparisonTable 
                books={category.books} 
                category="enterprise-account" 
              />
            </div>
          </AnimatedSection>
        </section>

        {/* Grid de livres avec BookCard adaptée */}
        <section aria-labelledby="books-grid-title">
          <AnimatedSection delay={200}>
            <div className="max-w-6xl mx-auto mb-12 px-4">
              <h2 id="books-grid-title" className="sr-only">
                Liste des livres recommandés sur Enterprise Account Management
              </h2>
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
                aria-label="Livres recommandés sur Enterprise Account Management"
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

        {/* Section Domain Insights - Concepts fondamentaux */}
        <AnimatedSection delay={350}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="text-center mb-8">
              <span className="inline-block bg-green-500/20 text-green-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <span className="inline mr-2">🏢</span>
                Concepts fondamentaux
              </span>
              <h3 className="text-2xl font-bold text-primary-title mb-4">
                Les piliers de l'Account Management
              </h3>
              <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Découvrez les concepts clés qui transforment la gestion de vos comptes stratégiques et multiplient votre impact business
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {enterpriseAccountInsights.map((insight, index) => (
                <AnimatedSection key={index} delay={400 + index * 100}>
                  <DomainInsight 
                    {...insight}
                    icon="🏢"
                    domainTheme={{
                      primaryColor: "#10B981",
                      secondaryColor: "#059669",
                      accentColor: "#34D399"
                    }}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Section : Exemples concrets PME avec CaseStudyGrid component */}
        <AnimatedSection delay={450}>
          <CaseStudyGrid 
            caseStudies={enterpriseAccountCaseStudies.map(caseStudy => ({
              industry: caseStudy.industry,
              companySize: caseStudy.companySize,
              challenge: caseStudy.challenge,
              solution: caseStudy.solution,
              results: caseStudy.results,
              metrics: caseStudy.metrics ? {
                before: caseStudy.metrics.revenueGrowth || caseStudy.metrics.cycleReduction || "Situation initiale",
                after: caseStudy.metrics.accountDiversification || caseStudy.metrics.lostDealsReduction || "Après transformation",
                timeline: caseStudy.timeline || "6 mois"
              } : undefined
            }))}
            title="Cas clients PME"
            subtitle="Découvrez comment mes clients PME appliquent concrètement les concepts de ces livres"
            domainColor="#10B981"
          />
        </AnimatedSection>

        {/* Section : Feuille de route d'implémentation avec ImplementationRoadmap component */}
        <AnimatedSection delay={475}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <ImplementationRoadmap 
              phases={enterpriseAccountRoadmap.map(phase => ({
                phase: phase.phase,
                title: phase.title,
                duration: phase.duration,
                description: phase.description,
                keyActions: phase.keyActions || [],
                expectedResults: [phase.expectedResults || "Amélioration des compétences d'account management"],
                laurentTip: phase.laurentAdvice || "",
                difficulty: "Avancé" as const,
                prerequisites: []
              }))}
              categoryTheme={{
                primaryColor: "#10B981",
                secondaryColor: "#059669",
                accentColor: "#D1FAE5",
                particleColor: "#10B981",
                gradientFrom: "from-emerald-600",
                gradientTo: "to-primary-bg",
                gradientVia: "via-green-500/10",
                icon: "🏢",
                name: "Enterprise Account"
              }}
              domainTitle="l'account management"
            />
          </div>
        </AnimatedSection>

        {/* Suggestions cross-catégories */}
        <AnimatedSection delay={500}>
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-emerald-400/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="inline-block bg-emerald-500/20 text-emerald-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  📚 Élargissez vos compétences
                </span>
                <h3 className="text-2xl font-bold text-blue-ink mb-4">
                  Livres complémentaires d'autres catégories
                </h3>
                <p className="text-gray-700 mb-6">
                  Pour maîtriser pleinement la gestion des comptes stratégiques, combinez account management et leadership d'équipe
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/ressources/meilleurs-livres/sales-management/good-to-great"
                  className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="inline-block bg-mint-green/20 text-mint-green text-xs font-medium px-2 py-1 rounded-full mb-2">
                        Sales Management & Leadership
                      </span>
                      <h4 className="text-xl font-bold text-blue-ink mb-2 group-hover:text-mint-green transition-colors">
                        Good to Great
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Jim Collins • 2001
                      </p>
                    </div>
                    <span className="text-mint-green text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm">
                    Pour développer le leadership de niveau 5 nécessaire à la gestion des comptes stratégiques
                  </p>
                  <span className="text-mint-green font-medium group-hover:underline text-sm">
                    Découvrir ce livre
                  </span>
                </Link>
                
                <Link 
                  href="/ressources/meilleurs-livres/methodes-process/strategic-selling"
                  className="group p-6 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:border-mint-green/40 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="inline-block bg-mint-green/20 text-mint-green text-xs font-medium px-2 py-1 rounded-full mb-2">
                        Méthodes & Process
                      </span>
                      <h4 className="text-xl font-bold text-blue-ink mb-2 group-hover:text-mint-green transition-colors">
                        Strategic Selling
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Robert Miller & Stephen Heiman • 1985
                      </p>
                    </div>
                    <span className="text-mint-green text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm">
                    Pour maîtriser la méthodologie de vente spécifique aux grands comptes
                  </p>
                  <span className="text-mint-green font-medium group-hover:underline text-sm">
                    Découvrir ce livre
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Bootcamp Grands Comptes */}
        <AnimatedSection delay={600}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* CTA Principal - Bootcamp Grands Comptes */}
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Formation spécialisée</div>
                    <h4 className="text-xl font-bold">Bootcamp Grands Comptes</h4>
                  </div>
                </div>
                <p className="text-emerald-100 mb-4 text-sm leading-relaxed">
                  Maîtrisez Strategic Selling, Key Account Management et les techniques de ces livres avec un accompagnement terrain personnalisé adapté aux enjeux PME. Développez vos comptes stratégiques avec méthode et résultats mesurables.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href="/bootcamp-commercial-intensif" 
                    className="inline-block bg-white text-emerald-600 font-semibold px-6 py-3 rounded-full hover:bg-emerald-50 transition text-center"
                  >
                    Découvrir le programme
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-block border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition text-center"
                  >
                    Coaching individuel
                  </Link>
                </div>
              </div>

              {/* CTA Secondaire - Diagnostic */}
              <div className="bg-white/70 rounded-2xl p-6 border border-emerald-200/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Évaluation gratuite</div>
                    <h4 className="text-xl font-bold text-blue-ink">Audit Grands Comptes</h4>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  Évaluez votre maturité en gestion des comptes stratégiques et identifiez vos axes d'amélioration prioritaires.
                </p>
                <Link 
                  href="/diagnostic" 
                  className="inline-block bg-emerald-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-emerald-600 transition w-full text-center"
                >
                  Faire le diagnostic
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8 px-4">
          <Link href="/ressources/meilleurs-livres" className="text-emerald-400 underline hover:text-emerald-300 text-lg">← Retour à la rubrique Meilleurs livres</Link>
        </div>
      </main>
    </>
  );
} 