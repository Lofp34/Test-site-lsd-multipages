'use client';

import React from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ComparisonTable from '@/components/ui/ComparisonTable';
import BookCard from '@/components/ui/BookCard';
import CategoryBreadcrumb from '@/components/ui/CategoryBreadcrumb';
import ParticleBackground from '@/components/ui/ParticleBackground';
import DomainInsight from '@/components/ui/DomainInsight';
import PMECaseStudy from '@/components/ui/PMECaseStudy';
import ImplementationRoadmap from '@/components/ui/ImplementationRoadmap';
import CrossCategoryNavigation from '@/components/ui/CrossCategoryNavigation';
import { CategoryPageProps } from '@/types/category-templates';
import { useCategoryTheme } from '@/hooks/useTheme';
import { categoryBreadcrumbSuggestions } from '@/utils/cross-category-suggestions';

interface CategoryPageTemplateProps extends CategoryPageProps {
  structuredData: any;
  children?: React.ReactNode;
}

export default function CategoryPageTemplate({
  category,
  theme,
  content,
  structuredData,
  children
}: CategoryPageTemplateProps) {
  const { getThemeStyles, getParticleProps } = useCategoryTheme(category.slug);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main 
        className={`relative bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientVia} ${theme.gradientTo} min-h-screen pt-24 pb-16 overflow-hidden`}
        style={getThemeStyles()}
      >
        {/* Particle Background thématique */}
        <ParticleBackground 
          {...getParticleProps()}
          className="absolute inset-0"
        />

        {/* CategoryBreadcrumb avec suggestions */}
        <CategoryBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: category.title, href: `/ressources/meilleurs-livres/${category.slug}`, current: true }
          ]}
          relatedCategories={categoryBreadcrumbSuggestions[category.slug] || []}
        />

        {/* Hero Section avec Vision Laurent Serre */}
        <section className="max-w-4xl mx-auto text-center mb-12 px-4" aria-labelledby="hero-title">
          <AnimatedSection animation="fade-in" delay={0}>
            <span 
              className={`inline-block bg-[${theme.primaryColor}]/20 text-[${theme.primaryColor}] font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur`}
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
            
            {/* Message spécifique au domaine avec Vision Laurent Serre */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-[var(--theme-primary)]/20 overflow-hidden group hover:bg-white/15 transition-all duration-500">
              {/* Animated background elements */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to bottom right, ${theme.primaryColor}20, ${theme.secondaryColor}20)`
                }}
              ></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(to bottom right, ${theme.primaryColor}, ${theme.secondaryColor})`
                    }}
                  >
                    <span className="text-2xl">{content.domainMessage.icon}</span>
                  </div>
                  <h2 className={`text-xl font-semibold text-[${theme.primaryColor}]`}>
                    {content.domainMessage.title}
                  </h2>
                </div>
                <p className="text-primary-secondary/90 leading-relaxed mb-4">
                  {content.domainMessage.description}
                </p>
                
                {/* Vision Laurent Serre OBLIGATOIRE */}
                <div className={`bg-white/10 rounded-lg p-4 mb-4 border border-[${theme.primaryColor}]/30`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <span className="text-blue-ink font-bold text-sm">LS</span>
                    </div>
                    <span className={`text-[${theme.primaryColor}] font-semibold`}>Vision Laurent Serre</span>
                  </div>
                  <p className="text-primary-secondary/90 text-sm italic">
                    "{content.laurentVision}"
                  </p>
                </div>
                
                {/* Stats spécifiques au domaine */}
                <div className={`grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-[${theme.primaryColor}]/20`}>
                  {content.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold text-[${theme.primaryColor}]`}>{stat.value}</div>
                      <div className="text-xs text-primary-secondary/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Tableau comparatif avec critères spécifiques */}
        <section aria-labelledby="comparison-title">
          <AnimatedSection delay={100}>
            <div className="max-w-6xl mx-auto px-4">
              <h2 id="comparison-title" className="sr-only">
                Tableau comparatif des livres {category.title}
              </h2>
              <ComparisonTable 
                books={category.books} 
                category={category.slug} 
              />
            </div>
          </AnimatedSection>
        </section>

        {/* Grid de livres avec BookCard adaptée */}
        <section aria-labelledby="books-grid-title">
          <AnimatedSection delay={200}>
            <div className="max-w-6xl mx-auto mb-12 px-4">
              <h2 id="books-grid-title" className="sr-only">
                Liste des livres recommandés sur {category.title}
              </h2>
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
                aria-label={`Livres recommandés sur ${category.title}`}
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
                        categoryTheme={theme}
                      />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Section Domain Insights */}
        <AnimatedSection delay={350}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="text-center mb-8">
              <span 
                className={`inline-block bg-[${theme.secondaryColor}]/20 text-[${theme.secondaryColor}] font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur`}
              >
                <span className="inline mr-2">{content.domainMessage.icon}</span>
                Concepts fondamentaux
              </span>
              <h3 className="text-2xl font-bold text-primary-title mb-4">
                Les clés du succès en {category.title}
              </h3>
              <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Découvrez les concepts essentiels qui font la différence dans ce domaine
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {content.insights.map((insight, index) => (
                <AnimatedSection key={index} delay={400 + index * 100}>
                  <DomainInsight 
                    {...insight} 
                    domainTheme={theme}
                    adaptiveColors={true}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Section Cas Clients PME */}
        <AnimatedSection delay={450}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-[var(--theme-primary)]/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                  🏢 Cas clients PME
                </span>
                <h3 className={`text-2xl font-bold text-blue-ink dark:text-[${theme.primaryColor}] mb-4`}>
                  Exemples concrets de {category.title} en PME
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-6">
                  Découvrez comment mes clients PME appliquent concrètement les concepts de ces livres
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {content.caseStudies.map((caseStudy, index) => (
                  <AnimatedSection key={index} delay={500 + index * 100}>
                    <PMECaseStudy 
                      {...caseStudy}
                      categoryTheme={theme}
                    />
                  </AnimatedSection>
                ))}
              </div>
              
              {/* Retour d'expérience Laurent Serre */}
              <div 
                className="mt-8 p-6 rounded-xl border"
                style={{
                  background: `linear-gradient(to right, ${theme.primaryColor}10, ${theme.secondaryColor}10)`,
                  borderColor: `${theme.primaryColor}20`
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    <span className="text-white font-bold text-sm">LS</span>
                  </div>
                  <h4 className={`text-xl font-bold text-[${theme.primaryColor}]`}>
                    Retour d'expérience Laurent Serre
                  </h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "Ces transformations ne se font pas du jour au lendemain. Mes clients qui réussissent le mieux 
                  suivent une approche progressive : ils commencent par maîtriser un concept, mesurent l'impact, 
                  puis étendent progressivement. L'erreur classique est de vouloir tout appliquer d'un coup."
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-white/50 dark:bg-blue-800/30 rounded-lg">
                    <div className={`text-2xl font-bold text-[${theme.primaryColor}]`}>6 mois</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Durée moyenne de maîtrise</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-blue-800/30 rounded-lg">
                    <div className={`text-2xl font-bold text-[${theme.primaryColor}]`}>3-5x</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">ROI moyen sur l'investissement</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-blue-800/30 rounded-lg">
                    <div className={`text-2xl font-bold text-[${theme.primaryColor}]`}>95%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Taux de satisfaction clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section Implementation Roadmap */}
        <AnimatedSection delay={475}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <ImplementationRoadmap 
              phases={content.roadmap}
              categoryTheme={theme}
              domainTitle={category.title}
            />
          </div>
        </AnimatedSection>

        {/* Section Cross-Category Navigation */}
        <AnimatedSection delay={500}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <CrossCategoryNavigation 
              suggestions={content.crossCategorySuggestions}
              currentCategory={category.slug}
              currentTheme={theme}
            />
          </div>
        </AnimatedSection>

        {/* CTAs Multiples */}
        <AnimatedSection delay={525}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-[var(--theme-primary)]/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold text-blue-ink dark:text-[${theme.primaryColor}] mb-4`}>
                  Prêt à transformer vos résultats en {category.title} ?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Découvrez comment appliquer concrètement ces concepts dans votre PME
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/bootcamp"
                  className={`group p-6 bg-gradient-to-r from-[${theme.primaryColor}] to-[${theme.secondaryColor}] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🎯</span>
                    <h4 className="text-xl font-bold">Bootcamp Spécialisé</h4>
                  </div>
                  <p className="text-white/90 mb-4">
                    Formation intensive sur les techniques de {category.title.toLowerCase()}
                  </p>
                  <span className="text-sm font-medium group-hover:underline">
                    Découvrir le programme →
                  </span>
                </Link>
                
                <Link 
                  href="/contact"
                  className="group p-6 bg-white dark:bg-blue-ink border-2 border-[var(--theme-primary)] rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">💬</span>
                    <h4 className={`text-xl font-bold text-[${theme.primaryColor}]`}>Coaching Personnalisé</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    Accompagnement sur-mesure pour votre équipe commerciale
                  </p>
                  <span className={`text-sm font-medium text-[${theme.primaryColor}] group-hover:underline`}>
                    Prendre rendez-vous →
                  </span>
                </Link>
              </div>
              
              <div className="mt-6 text-center">
                <Link 
                  href="/ressources/meilleurs-livres"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[var(--theme-primary)] transition-colors"
                >
                  ← Retour aux catégories de livres
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contenu additionnel si fourni */}
        {children}
      </main>
    </>
  );
}