import { mindsetPerformanceCategory } from '@/data/books-enriched';
import { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BookCard from '@/components/ui/BookCard';
import CategoryBreadcrumb from '@/components/ui/CategoryBreadcrumb';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { categoryBreadcrumbSuggestions } from '@/utils/cross-category-suggestions';
import React from 'react';

// Trouver le livre dans les données de façon sécurisée
const book = mindsetPerformanceCategory.books.find(b => b.slug === 'atomic-habits');

if (!book) {
  throw new Error('Livre Atomic Habits non trouvé dans les données');
}

// Ensure required properties exist with default values
const bookData = {
  ...book,
  keyPoints: book.keyPoints || [],
  targetProfiles: book.targetProfiles || [],
  detailedSummary: book.detailedSummary || book.summary,
  terrainAdvice: book.terrainAdvice || "Conseils terrain en cours de rédaction...",
  rating: book.rating || 4,
  difficulty: book.difficulty || "Intermédiaire",
  readingTime: book.readingTime || "5h"
};

export const metadata: Metadata = {
  title: `${bookData.title} | ${bookData.author} | Résumé et Conseils | Laurent Serre`,
  description: `${bookData.title} de ${bookData.author} (${bookData.year}) : ${bookData.tagline} Résumé détaillé, points clés et conseils terrain de Laurent Serre pour appliquer les micro-habitudes en développement commercial.`,
  keywords: [
    'atomic habits',
    'james clear',
    'habitudes commerciales',
    'micro-habitudes',
    'performance commerciale',
    'développement personnel',
    'mindset commercial',
    'laurent serre',
    'amélioration continue',
    'système vs objectifs'
  ],
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/mindset-performance/atomic-habits',
  },
};

export default function AtomicHabitsPage() {
  return (
    <main className="relative bg-gradient-to-br from-orange-soft via-orange-soft/10 to-primary-bg min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Particle background */}
      <ParticleBackground 
        density={25}
        speed={0.3}
        color="#FFAA5C"
        opacity={0.3}
        className="absolute inset-0"
      />
      
      {/* Breadcrumb navigation */}
      <CategoryBreadcrumb 
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Ressources', href: '/ressources' },
          { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
          { label: 'Mindset & Performance', href: '/ressources/meilleurs-livres/mindset-performance' },
          { label: bookData.title, href: `/ressources/meilleurs-livres/mindset-performance/atomic-habits`, current: true }
        ]}
        relatedCategories={categoryBreadcrumbSuggestions['mindset-performance']}
      />

      {/* Hero section avec le livre */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-soft/20">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Informations du livre */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-orange-soft/20 text-orange-soft px-3 py-1 rounded-full text-sm font-medium">
                    🧠 Mindset & Performance
                  </span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                    {bookData.year}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {bookData.title}
                </h1>
                <p className="text-xl text-orange-300 mb-4">
                  par {bookData.author}
                </p>
                <p className="text-lg text-white/80 mb-6 leading-relaxed">
                  {bookData.tagline}
                </p>
                
                {/* Métadonnées du livre */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-soft">{bookData.rating}/5</div>
                    <div className="text-xs text-white/70">Note Laurent Serre</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-soft">{bookData.difficulty}</div>
                    <div className="text-xs text-white/70">Difficulté</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-soft">{bookData.readingTime}</div>
                    <div className="text-xs text-white/70">Lecture</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-soft">★★★</div>
                    <div className="text-xs text-white/70">Impact commercial</div>
                  </div>
                </div>
              </div>
              
              {/* BookCard en version featured */}
              <div className="lg:w-80">
                <BookCard 
                  book={bookData} 
                  variant="featured"
                  showRating={true}
                  showDifficulty={true}
                  showReadingTime={true}
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Résumé détaillé */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <AnimatedSection delay={100}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-soft/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-orange-soft">📖</span>
              Résumé détaillé
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-white/90 leading-relaxed mb-6">
                {bookData.detailedSummary}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Points clés */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <AnimatedSection delay={200}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-soft/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-orange-soft">🎯</span>
              Points clés à retenir
            </h2>
            <div className="grid gap-4">
              {Array.isArray(bookData.keyPoints) && bookData.keyPoints.length > 0 ? bookData.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-orange-soft/10">
                  <span className="text-orange-soft font-bold text-lg">{index + 1}.</span>
                  <p className="text-white/90 leading-relaxed">{point}</p>
                </div>
              )) : (
                <p className="text-white/70">Points clés en cours de rédaction...</p>
              )}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Conseils terrain Laurent Serre */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <AnimatedSection delay={300}>
          <div className="bg-gradient-to-r from-orange-soft/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl p-8 border border-orange-soft/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-soft rounded-full flex items-center justify-center">
                <span className="text-white font-bold">LS</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Conseils terrain Laurent Serre</h2>
                <p className="text-orange-300">20 ans d'expérience en développement commercial PME</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 border border-orange-soft/20">
              <p className="text-white/90 leading-relaxed whitespace-pre-line">
                {bookData.terrainAdvice}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Profils cibles */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <AnimatedSection delay={400}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-soft/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-orange-soft">👥</span>
              Pour qui ce livre ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(bookData.targetProfiles) && bookData.targetProfiles.length > 0 ? bookData.targetProfiles.map((profile, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-orange-soft/10">
                  <span className="text-orange-soft">✓</span>
                  <span className="text-white/90">{profile}</span>
                </div>
              )) : (
                <p className="text-white/70">Profils cibles en cours de définition...</p>
              )}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Suggestions de livres complémentaires */}
      <section className="max-w-6xl mx-auto mb-12 px-4">
        <AnimatedSection delay={500}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-soft/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-orange-soft">📚</span>
              Livres complémentaires recommandés
            </h2>
            <p className="text-white/80 mb-4">
              Pour approfondir votre développement personnel et commercial, découvrez ces autres références essentielles.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/ressources/meilleurs-livres/mindset-performance/mindset-new-psychology-success" 
                    className="bg-orange-soft/20 text-orange-soft px-3 py-1 rounded-full text-sm hover:bg-orange-soft/30 transition-colors">
                Mindset - Carol Dweck
              </Link>
              <Link href="/ressources/meilleurs-livres/mindset-performance/7-habitudes-gens-efficaces" 
                    className="bg-orange-soft/20 text-orange-soft px-3 py-1 rounded-full text-sm hover:bg-orange-soft/30 transition-colors">
                Les 7 Habitudes - Stephen Covey
              </Link>
              <Link href="/ressources/meilleurs-livres/mindset-performance/grit-power-passion-perseverance" 
                    className="bg-orange-soft/20 text-orange-soft px-3 py-1 rounded-full text-sm hover:bg-orange-soft/30 transition-colors">
                Grit - Angela Duckworth
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}