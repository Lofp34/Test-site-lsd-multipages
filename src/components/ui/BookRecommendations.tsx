import Link from 'next/link';
import { Book } from '@/data/books-enriched';
import { generateCrossCategorySuggestions, CrossCategorySuggestion } from '@/utils/cross-category-suggestions';

interface BookRecommendationsProps {
  currentBook: Book;
  currentCategory: string;
  maxSuggestions?: number;
  className?: string;
}

export default function BookRecommendations({ 
  currentBook, 
  currentCategory, 
  maxSuggestions = 3,
  className = "" 
}: BookRecommendationsProps) {
  const suggestions = generateCrossCategorySuggestions(currentBook, currentCategory, maxSuggestions);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className={`max-w-6xl mx-auto px-4 ${className}`}>
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200/30">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-ink mb-3">
            📚 Livres Complémentaires Recommandés
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Approfondissez vos connaissances avec ces livres sélectionnés pour leur complémentarité avec <strong>{currentBook.title}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((suggestion, index) => (
            <BookSuggestionCard 
              key={index} 
              suggestion={suggestion} 
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-4">
            Ces recommandations sont basées sur l'expertise terrain de Laurent Serre et les complémentarités métier
          </p>
          <Link
            href="/ressources/meilleurs-livres"
            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Voir toutes les catégories
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function BookSuggestionCard({ suggestion }: { suggestion: CrossCategorySuggestion }) {
  const bookHref = `/ressources/meilleurs-livres/${suggestion.category}/${suggestion.book.slug}`;
  const categoryHref = `/ressources/meilleurs-livres/${suggestion.category}`;

  return (
    <div className="bg-white/80 rounded-xl border border-purple-200/30 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Book Link */}
      <Link href={bookHref} className="block p-6 hover:bg-purple-50/50 transition-colors">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-blue-ink hover:text-blue-500 transition-colors text-lg mb-1">
              {suggestion.book.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              par {suggestion.book.author}
            </p>
            <Link 
              href={categoryHref}
              className="inline-flex items-center text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
            >
              {suggestion.categoryTitle}
            </Link>
          </div>
          <span className="text-blue-500 opacity-70 hover:opacity-100 transition-opacity">
            →
          </span>
        </div>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {suggestion.book.tagline}
        </p>
      </Link>

      {/* Recommendation Reason */}
      <div className="px-6 pb-6">
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-700 font-medium mb-1">
            💡 Pourquoi ce livre ?
          </p>
          <p className="text-xs text-blue-600
            {suggestion.reason}
          </p>
        </div>
      </div>
    </div>
  );
}