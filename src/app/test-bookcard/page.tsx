import React from 'react';
import BookCard from '@/components/ui/BookCard';
import { enterpriseAccountCategory, salesManagementCategory } from '@/data/books-enriched';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function TestBookCardPage() {
  return (
    <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            BookCard Component Test
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-6">
            Démonstration des nouveaux composants BookCard enrichis
          </p>
        </div>

        {/* Grid variant */}
        <AnimatedSection delay={0.1}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Grid Variant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enterpriseAccountCategory.books.slice(0, 3).map((book) => (
                <BookCard key={book.slug} book={book} variant="grid" />
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* List variant */}
        <AnimatedSection delay={0.2}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">List Variant</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {enterpriseAccountCategory.books.slice(0, 2).map((book) => (
                <BookCard key={book.slug} book={book} variant="list" />
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Featured variant */}
        <AnimatedSection delay={0.3}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Variant</h2>
            <div className="max-w-md mx-auto">
              <BookCard book={enterpriseAccountCategory.books[0]} variant="featured" />
            </div>
          </section>
        </AnimatedSection>

        {/* Sales Management books */}
        <AnimatedSection delay={0.4}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Sales Management Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salesManagementCategory.books.slice(0, 3).map((book) => (
                <BookCard key={book.slug} book={book} variant="grid" />
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Different configurations */}
        <AnimatedSection delay={0.5}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Different Configurations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BookCard 
                book={enterpriseAccountCategory.books[0]} 
                variant="grid" 
                showRating={false}
                showDifficulty={true}
                showReadingTime={true}
              />
              <BookCard 
                book={enterpriseAccountCategory.books[1]} 
                variant="grid" 
                showRating={true}
                showDifficulty={false}
                showReadingTime={true}
              />
              <BookCard 
                book={enterpriseAccountCategory.books[2]} 
                variant="grid" 
                showRating={true}
                showDifficulty={true}
                showReadingTime={false}
              />
            </div>
          </section>
        </AnimatedSection>

        {/* Navigation */}
        <div className="text-center mt-12">
          <a 
            href="/ressources/meilleurs-livres" 
            className="text-mint-green underline hover:text-mint-green/80 text-lg"
          >
            ← Retour aux meilleurs livres
          </a>
        </div>
      </div>
    </main>
  );
}