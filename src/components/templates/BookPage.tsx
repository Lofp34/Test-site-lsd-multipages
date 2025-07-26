'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BookCard from '@/components/ui/BookCard';
import CategoryBreadcrumb from '@/components/ui/CategoryBreadcrumb';
import ParticleBackground from '@/components/ui/ParticleBackground';
import CrossCategoryNavigation from '@/components/ui/CrossCategoryNavigation';
import { BookPageProps } from '@/types/category-templates';
import { useCategoryTheme } from '@/hooks/useTheme';
import { categoryBreadcrumbSuggestions } from '@/utils/cross-category-suggestions';

interface BookPageTemplateProps extends BookPageProps {
  structuredData: any;
  children?: React.ReactNode;
}

export default function BookPageTemplate({
  book,
  category,
  relatedBooks,
  crossCategorySuggestions,
  structuredData,
  children
}: BookPageTemplateProps) {
  const { themeStyles, particleProps } = useCategoryTheme(category.slug);
  const theme = category.theme;

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main 
        className={`relative bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientVia} ${theme.gradientTo} min-h-screen pt-24 pb-16 overflow-hidden`}
        style={themeStyles}
      >
        {/* Particle Background hérité de la catégorie */}
        <ParticleBackground 
          {...particleProps}
          className="absolute inset-0"
        />

        {/* CategoryBreadcrumb avec navigation vers catégorie */}
        <CategoryBreadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: category.title, href: `/ressources/meilleurs-livres/${category.slug}` },
            { label: book.title, href: `/ressources/meilleurs-livres/${category.slug}/${book.slug}`, current: true }
          ]}
          relatedCategories={categoryBreadcrumbSuggestions[category.slug] || []}
        />

        {/* Book Hero Section */}
        <section className="max-w-6xl mx-auto mb-12 px-4" aria-labelledby="book-title">
          <AnimatedSection animation="fade-in" delay={0}>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Couverture du livre */}
              <div className="md:col-span-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-primary)]/20 to-[var(--theme-secondary)]/20 rounded-xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[var(--theme-primary)]/20">
                    {book.cover ? (
                      <Image
                        src={book.cover}
                        alt={`Couverture du livre ${book.title}`}
                        width={300}
                        height={400}
                        className="w-full h-auto rounded-lg shadow-2xl"
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-lg flex items-center justify-center">
                        <span className="text-white text-4xl">{category.theme.icon}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Informations du livre */}
              <div className="md:col-span-2">
                <div className="mb-4">
                  <span 
                    className={`inline-block bg-[${theme.primaryColor}]/20 text-[${theme.primaryColor}] font-semibold rounded-full px-3 py-1 text-sm mb-3`}
                  >
                    {category.theme.icon} {category.title}
                  </span>
                </div>
                
                <h1 id="book-title" className="text-3xl md:text-4xl font-bold text-primary-title mb-2">
                  {book.title}
                </h1>
                
                <p className="text-xl text-primary-secondary/80 mb-4">
                  par {book.author} • {book.year}
                </p>
                
                <p className="text-lg text-primary-secondary/90 mb-6 leading-relaxed">
                  {book.tagline}
                </p>

                {/* Métadonnées du livre */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {book.content.difficulty && (
                    <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className={`text-lg font-bold text-[${theme.primaryColor}]`}>
                        {book.content.difficulty}
                      </div>
                      <div className="text-xs text-primary-secondary/70">Difficulté</div>
                    </div>
                  )}
                  
                  {book.content.readingTime && (
                    <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className={`text-lg font-bold text-[${theme.primaryColor}]`}>
                        {book.content.readingTime}
                      </div>
                      <div className="text-xs text-primary-secondary/70">Lecture</div>
                    </div>
                  )}
                  
                  {book.rating && (
                    <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className={`text-lg font-bold text-[${theme.primaryColor}]`}>
                        {book.rating}/5
                      </div>
                      <div className="text-xs text-primary-secondary/70">Note</div>
                    </div>
                  )}
                  
                  <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className={`text-lg font-bold text-[${theme.primaryColor}]`}>
                      {book.year}
                    </div>
                    <div className="text-xs text-primary-secondary/70">Année</div>
                  </div>
                </div>

                {/* Profils cibles */}
                {book.content.targetProfiles && book.content.targetProfiles.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-primary-secondary/80 mb-2">
                      Idéal pour :
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {book.content.targetProfiles.map((profile, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 bg-[${theme.accentColor}] text-[${theme.primaryColor}] text-sm rounded-full`}
                        >
                          {profile}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Résumé détaillé */}
        <AnimatedSection delay={100}>
          <section className="max-w-4xl mx-auto mb-12 px-4" aria-labelledby="detailed-summary">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-[var(--theme-primary)]/20 backdrop-blur-sm">
              <h2 id="detailed-summary" className={`text-2xl font-bold text-blue-ink mb-6`}>
                Résumé détaillé
              </h2>
              <div className="prose prose-lg max-w-none text-primary-secondary">
                {book.content.detailedSummary.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Points clés à retenir */}
        <AnimatedSection delay={150}>
          <section className="max-w-4xl mx-auto mb-12 px-4" aria-labelledby="key-takeaways">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-[var(--theme-primary)]/20 backdrop-blur-sm">
              <h2 id="key-takeaways" className={`text-2xl font-bold text-blue-ink mb-6`}>
                Points clés à retenir
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {book.content.keyTakeaways.map((takeaway, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-[var(--theme-primary)]/10 to-[var(--theme-secondary)]/10 rounded-lg border border-[var(--theme-primary)]/20"
                  >
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-primary-secondary text-sm leading-relaxed">
                      {takeaway}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Recommandations Laurent Serre */}
        <AnimatedSection delay={200}>
          <section className="max-w-4xl mx-auto mb-12 px-4" aria-labelledby="laurent-recommendations">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-[var(--theme-primary)]/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <span className="text-white font-bold">LS</span>
                </div>
                <h2 id="laurent-recommendations" className={`text-2xl font-bold text-blue-ink`}>
                  Conseils d'application Laurent Serre
                </h2>
              </div>
              
              <div className="space-y-4">
                {book.content.laurentRecommendations.map((recommendation, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gradient-to-r from-[var(--theme-accent)]/30 to-[var(--theme-accent)]/10 rounded-lg border-l-4"
                    style={{ borderLeftColor: theme.primaryColor }}
                  >
                    <p className="text-primary-secondary leading-relaxed">
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Cas d'usage PME */}
        <AnimatedSection delay={250}>
          <section className="max-w-4xl mx-auto mb-12 px-4" aria-labelledby="pme-use-case">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-[var(--theme-primary)]/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🏢</span>
                <h2 id="pme-use-case" className={`text-2xl font-bold text-blue-ink`}>
                  Cas d'usage PME concret
                </h2>
              </div>
              
              <div className="bg-gradient-to-r from-[var(--theme-primary)]/10 to-[var(--theme-secondary)]/10 rounded-xl p-6 border border-[var(--theme-primary)]/20">
                <div className="mb-4">
                  <h3 className={`text-lg font-bold text-[${theme.primaryColor}] mb-2`}>
                    {book.content.pmeUseCase.title}
                  </h3>
                  <div className="flex gap-4 text-sm text-primary-secondary/80 mb-3">
                    <span>📊 {book.content.pmeUseCase.industry}</span>
                    <span>👥 {book.content.pmeUseCase.companySize}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary-title mb-2">Contexte :</h4>
                    <p className="text-primary-secondary text-sm leading-relaxed">
                      {book.content.pmeUseCase.context}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary-title mb-2">Application :</h4>
                    <p className="text-primary-secondary text-sm leading-relaxed">
                      {book.content.pmeUseCase.application}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary-title mb-2">Résultats :</h4>
                    <p className="text-primary-secondary text-sm leading-relaxed">
                      {book.content.pmeUseCase.results}
                    </p>
                  </div>
                  
                  <div className="mt-4 p-4 bg-white/50 rounded-lg">
                    <p className="text-primary-secondary text-sm italic">
                      💡 <strong>Laurent Serre :</strong> "{book.content.pmeUseCase.laurentComment}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Livres complémentaires */}
        {relatedBooks && relatedBooks.length > 0 && (
          <AnimatedSection delay={300}>
            <section className="max-w-6xl mx-auto mb-12 px-4" aria-labelledby="related-books">
              <div className="text-center mb-8">
                <h2 id="related-books" className="text-2xl font-bold text-primary-title mb-4">
                  Livres complémentaires
                </h2>
                <p className="text-primary-secondary/90">
                  Pour approfondir vos connaissances en {category.title.toLowerCase()}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBooks.slice(0, 3).map((relatedBook, index) => (
                  <AnimatedSection key={relatedBook.slug} delay={350 + index * 100}>
                    <BookCard 
                      book={relatedBook} 
                      variant="grid"
                      showRating={true}
                      showDifficulty={true}
                      categoryTheme={theme}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* Navigation cross-catégories */}
        <AnimatedSection delay={400}>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <CrossCategoryNavigation 
              suggestions={crossCategorySuggestions}
              currentCategory={category.slug}
              currentTheme={theme}
            />
          </div>
        </AnimatedSection>

        {/* CTAs de fin */}
        <AnimatedSection delay={450}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-[var(--theme-primary)]/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold text-blue-ink mb-4`}>
                  Prêt à appliquer les concepts de ce livre ?
                </h3>
                <p className="text-primary-secondary">
                  Découvrez comment intégrer ces techniques dans votre stratégie commerciale
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Link 
                  href="/bootcamp"
                  className={`group p-6 bg-gradient-to-r from-[${theme.primaryColor}] to-[${theme.secondaryColor}] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🎯</span>
                    <h4 className="text-xl font-bold">Formation Pratique</h4>
                  </div>
                  <p className="text-white/90 mb-4">
                    Apprenez à appliquer concrètement ces concepts
                  </p>
                  <span className="text-sm font-medium group-hover:underline">
                    Découvrir le programme →
                  </span>
                </Link>
                
                <Link 
                  href="/contact"
                  className="group p-6 bg-white border-2 border-[var(--theme-primary)] rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">💬</span>
                    <h4 className={`text-xl font-bold text-[${theme.primaryColor}]`}>Coaching Personnalisé</h4>
                  </div>
                  <p className="text-primary-secondary mb-4">
                    Accompagnement sur-mesure pour votre équipe
                  </p>
                  <span className={`text-sm font-medium text-[${theme.primaryColor}] group-hover:underline`}>
                    Prendre rendez-vous →
                  </span>
                </Link>
              </div>
              
              <div className="text-center space-y-2">
                <Link 
                  href={`/ressources/meilleurs-livres/${category.slug}`}
                  className="inline-flex items-center gap-2 text-primary-secondary/80 hover:text-primary-accent transition-colors"
                >
                  ← Retour à {category.title}
                </Link>
                <br />
                <Link 
                  href="/ressources/meilleurs-livres"
                  className="inline-flex items-center gap-2 text-primary-secondary/80 hover:text-primary-accent transition-colors text-sm"
                >
                  Voir toutes les catégories
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