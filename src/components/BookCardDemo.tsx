import React from 'react';
import BookCard from './ui/BookCard';
import { enterpriseAccountCategory } from '@/data/books-enriched';

const BookCardDemo: React.FC = () => {
  // Get a sample book with enriched data
  const sampleBook = enterpriseAccountCategory.books[0]; // "The Challenger Customer"

  if (!sampleBook) {
    return <div>No sample book available</div>;
  }

  return (
    <div className="min-h-screen bg-bg-main p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-ink mb-8 text-center">
          BookCard Component Demo
        </h1>
        
        {/* Grid variant */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-ink mb-6">Grid Variant</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BookCard book={sampleBook} variant="grid" />
            <BookCard book={sampleBook} variant="grid" showRating={false} />
            <BookCard book={sampleBook} variant="grid" showDifficulty={false} />
          </div>
        </section>

        {/* List variant */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-ink mb-6">List Variant</h2>
          <div className="space-y-4">
            <BookCard book={sampleBook} variant="list" />
            <BookCard book={sampleBook} variant="list" showReadingTime={false} />
          </div>
        </section>

        {/* Featured variant */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-ink mb-6">Featured Variant</h2>
          <div className="max-w-md mx-auto">
            <BookCard book={sampleBook} variant="featured" />
          </div>
        </section>

        {/* All books from enterprise category */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-ink mb-6">All Enterprise Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseAccountCategory.books.map((book) => (
              <BookCard key={book.slug} book={book} variant="grid" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookCardDemo;