import { mindsetPerformanceCategory } from '@/data/books-enriched';
import { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BookCard from '@/components/ui/BookCard';
import CategoryBreadcrumb from '@/components/ui/CategoryBreadcrumb';
import ParticleBackground from '@/components/ui/ParticleBackground';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import { categoryBreadcrumbSuggestions } from '@/utils/cross-category-suggestions';
import React from 'react';

// Trouver le livre dans les données de façon sécurisée
const book = mindsetPerformanceCategory.books.find(b => b.slug === 'the-7-habits');

if (!book) {
  throw new Error('Livre Les 7 habitudes des gens très efficaces non trouvé dans les données');
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
  readingTime: book.readingTime || "8h"
};

export const metadata: Metadata = {
  title: `${bookData.title} | ${bookData.author} | Résumé et Conseils | Laurent Serre`,
  description: `${bookData.title} de ${bookData.author} (${bookData.year}) : ${bookData.tagline} Résumé détaillé, points clés et conseils terrain de Laurent Serre pour appliquer les 7 habitudes en développement commercial.`,
  keywords: [
    '7 habitudes',
    'stephen covey',
    'efficacité personnelle',
    'leadership commercial',
    'développement personnel',
    'mindset commercial',
    'laurent serre',
    'proactivité',
    'gagnant-gagnant'
  ],
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/meilleurs-livres/mindset-performance/the-7-habits',
  },
};

export default function The7HabitsPage() {
  return (
    <main className="relative bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-primary-bg min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Particle background */}
      <ParticleBackground 
        density={25}
        speed={0.3}
        color="#3B82F6"
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
          { label: bookData.title, href: `/ressources/meilleurs-livres/mindset-performance/the-7-habits`, current: true }
        ]}
        relatedCategories={categoryBreadcrumbSuggestions['mindset-performance']}
      />

      {/* Hero section avec le livre */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
            <div className="flex flex-col gap-8 items-start">
              {/* Informations du livre */}
              <div className="w-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    🧠 Mindset & Performance
                  </span>
                  <span className="bg-white/20 text-primary-secondary px-3 py-1 rounded-full text-sm">
                    {bookData.year}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-primary-title mb-2">
                  {bookData.title}
                </h1>
                <p className="text-xl text-primary-secondary mb-4">
                  par {bookData.author}
                </p>
                <p className="text-lg text-primary-secondary/90 mb-6 leading-relaxed">
                  {bookData.tagline}
                </p>
                
                {/* Métadonnées du livre */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{bookData.rating}/5</div>
                    <div className="text-xs text-primary-secondary">Note Laurent Serre</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{bookData.difficulty}</div>
                    <div className="text-xs text-primary-secondary">Difficulté</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{bookData.readingTime}</div>
                    <div className="text-xs text-primary-secondary">Lecture</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">★★★</div>
                    <div className="text-xs text-primary-secondary">Impact commercial</div>
                  </div>
                </div>
              </div>
              

            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Résumé détaillé */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <AnimatedSection delay={100}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-primary-title mb-6 flex items-center gap-3">
              <span className="text-blue-400">📖</span>
              Résumé détaillé
            </h2>
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer 
                content={bookData.detailedSummary} 
                className="text-primary-secondary"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Points clés */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <AnimatedSection delay={200}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-primary-title mb-6 flex items-center gap-3">
              <span className="text-blue-400">🎯</span>
              Points clés à retenir
            </h2>
            <div className="grid gap-4">
              {Array.isArray(bookData.keyPoints) && bookData.keyPoints.length > 0 ? bookData.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-blue-500/10">
                  <span className="text-blue-400 font-bold text-lg">{index + 1}.</span>
                  <p className="text-primary-secondary leading-relaxed">{point}</p>
                </div>
              )) : (
                <p className="text-primary-secondary/70">Points clés en cours de rédaction...</p>
              )}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Conseils terrain Laurent Serre */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <AnimatedSection delay={300}>
          <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">LS</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-title">Conseils terrain Laurent Serre</h2>
                <p className="text-primary-secondary">20 ans d'expérience en développement commercial PME</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 border border-blue-500/20">
              <MarkdownRenderer 
                content={bookData.terrainAdvice} 
                className="text-primary-secondary"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Profils cibles */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <AnimatedSection delay={400}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-primary-title mb-6 flex items-center gap-3">
              <span className="text-blue-400">👥</span>
              Pour qui ce livre ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(bookData.targetProfiles) && bookData.targetProfiles.length > 0 ? bookData.targetProfiles.map((profile, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-blue-500/10">
                  <span className="text-blue-400">✓</span>
                  <span className="text-primary-secondary">{profile}</span>
                </div>
              )) : (
                <p className="text-primary-secondary/70">Profils cibles en cours de définition...</p>
              )}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Suggestions de livres complémentaires */}
      <section className="max-w-6xl mx-auto mb-12 px-4">
        <AnimatedSection delay={500}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-primary-title mb-6 flex items-center gap-3">
              <span className="text-blue-400">📚</span>
              Livres complémentaires recommandés
            </h2>
            <p className="text-primary-secondary mb-4">
              Pour approfondir votre développement personnel et votre leadership commercial.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/ressources/meilleurs-livres/mindset-performance/mindset" 
                    className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm hover:bg-blue-500/30 transition-colors">
                Mindset - Carol Dweck
              </Link>
              <Link href="/ressources/meilleurs-livres/mindset-performance/atomic-habits" 
                    className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm hover:bg-blue-500/30 transition-colors">
                Atomic Habits - James Clear
              </Link>
              <Link href="/ressources/meilleurs-livres/mindset-performance/grit-power-passion-perseverance" 
                    className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm hover:bg-blue-500/30 transition-colors">
                Grit - Angela Duckworth
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}