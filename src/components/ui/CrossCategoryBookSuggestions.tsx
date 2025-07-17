import Link from 'next/link';
import { Book } from '@/data/books-enriched';

interface CrossCategoryBookSuggestionsProps {
  currentBook: Book;
  suggestedBooks: {
    book: Book;
    category: string;
    categoryTitle: string;
    reason: string;
  }[];
  className?: string;
}

export default function CrossCategoryBookSuggestions({ 
  currentBook, 
  suggestedBooks, 
  className = "" 
}: CrossCategoryBookSuggestionsProps) {
  if (suggestedBooks.length === 0) return null;

  return (
    <section className={`max-w-4xl mx-auto px-6 mb-12 ${className}`}>
      <div className="bg-white/95 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 border border-blue-300/20">
        <h2 className="text-3xl font-bold text-blue-ink dark:text-blue-300 mb-6">
          📚 Livres complémentaires d'autres catégories
        </h2>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Pour approfondir votre compréhension et élargir vos compétences au-delà de <strong>{currentBook.title}</strong>
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {suggestedBooks.map((suggestion, index) => (
            <Link 
              key={suggestion.book.slug}
              href={`/ressources/meilleurs-livres/${suggestion.category}/${suggestion.book.slug}`}
              className="group p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="inline-block bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium px-2 py-1 rounded-full mb-2">
                    {suggestion.categoryTitle}
                  </span>
                  <h3 className="text-xl font-bold text-blue-ink dark:text-blue-300 mb-2 group-hover:text-blue-500 transition-colors">
                    {suggestion.book.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {suggestion.book.author} • {suggestion.book.year}
                  </p>
                </div>
                <span className="text-blue-500 text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                {suggestion.reason}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {suggestion.book.difficulty && (
                    <span className="bg-orange-soft/20 text-orange-soft text-xs px-2 py-1 rounded-full">
                      {suggestion.book.difficulty}
                    </span>
                  )}
                  {suggestion.book.readingTime && (
                    <span className="bg-blue-ink/20 text-blue-ink dark:text-white text-xs px-2 py-1 rounded-full">
                      {suggestion.book.readingTime}
                    </span>
                  )}
                </div>
                <span className="text-blue-500 font-medium group-hover:underline text-sm">
                  Lire le résumé
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}