import React from 'react';
import Link from 'next/link';
import { Book } from '@/data/books-enriched';
import StarRating from './StarRating';
import Badge from './Badge';

interface BookCardProps {
  book: Book;
  variant?: 'grid' | 'list' | 'featured';
  showRating?: boolean;
  showDifficulty?: boolean;
  showReadingTime?: boolean;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  variant = 'grid',
  showRating = true,
  showDifficulty = true,
  showReadingTime = true,
  className = ''
}) => {
  /**
   * Retourne l'icône/emoji associé à une catégorie de livre
   */
  const getCategoryIcon = (categorySlug: string): string => {
    const iconMap: Record<string, string> = {
      'prospection-sdr': '🎯',
      'negociation-closing': '🤝',
      'psychologie-influence': '🧠',
      'methodes-process': '⚙️',
      'enterprise-account': '🏢',
      'sales-management': '👥',
      'management-leadership': '👥',
      'digital-ai': '🤖',
      'mindset-performance': '💪'
    };
    
    return iconMap[categorySlug] || '📚';
  };

  /**
   * Retourne le gradient CSS personnalisé pour une catégorie
   */
  const getCategoryGradient = (categorySlug: string): string => {
    const gradientMap: Record<string, string> = {
      'prospection-sdr': 'bg-gradient-to-br from-blue-400 to-blue-600',
      'negociation-closing': 'bg-gradient-to-br from-green-400 to-green-600',
      'psychologie-influence': 'bg-gradient-to-br from-purple-400 to-purple-600',
      'methodes-process': 'bg-gradient-to-br from-orange-400 to-orange-600',
      'enterprise-account': 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      'sales-management': 'bg-gradient-to-br from-teal-400 to-teal-600',
      'management-leadership': 'bg-gradient-to-br from-teal-400 to-teal-600',
      'digital-ai': 'bg-gradient-to-br from-cyan-400 to-cyan-600',
      'mindset-performance': 'bg-gradient-to-br from-pink-400 to-pink-600'
    };
    
    return gradientMap[categorySlug] || 'bg-gradient-to-br from-gray-400 to-gray-600';
  };

  const baseCardClasses = `
    bg-white/80 dark:bg-blue-ink/80 rounded-2xl shadow-2xl 
    hover:scale-105 hover:shadow-3xl transition-all duration-300 
    border border-mint-green/30 backdrop-blur-sm
  `;

  if (variant === 'list') {
    return (
      <div className={`${baseCardClasses} p-4 ${className}`}>
        <div className="flex items-start gap-4">
          {/* Cover placeholder */}
          <div className={`w-16 h-24 rounded-lg flex items-center justify-center text-2xl flex-shrink-0
                          ${getCategoryGradient(book.category)}`}>
            {getCategoryIcon(book.category)}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-blue-ink dark:text-mint-green mb-1 truncate">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-200 mb-2">
                  {book.author} — {book.year}
                </p>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {showDifficulty && book.difficulty && (
                    <Badge variant="difficulty" size="sm" difficulty={book.difficulty}>
                      {book.difficulty}
                    </Badge>
                  )}
                  {showReadingTime && book.readingTime && (
                    <Badge variant="outline" size="sm">{book.readingTime}</Badge>
                  )}
                  {showRating && book.rating && (
                    <div className="flex items-center">
                      <StarRating rating={book.rating} size="sm" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-700 dark:text-gray-100 line-clamp-2">
                  {book.tagline}
                </p>
              </div>
              
              {/* CTA */}
              <Link 
                href={`/ressources/meilleurs-livres/${book.category}/${book.slug}`}
                className="bg-mint-green text-blue-ink font-semibold px-4 py-2 rounded-full 
                           shadow hover:bg-mint-green/80 transition text-sm whitespace-nowrap"
              >
                Voir détails
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={`${baseCardClasses} p-8 ${className}`}>
        <div className="text-center">
          {/* Cover placeholder - larger for featured */}
          <div className={`w-32 h-48 rounded-lg mb-6 flex items-center justify-center text-5xl mx-auto
                          ${getCategoryGradient(book.category)}`}>
            {getCategoryIcon(book.category)}
          </div>
          
          {/* Title and metadata */}
          <h3 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-2">
            {book.title}
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-200 mb-4 italic">
            {book.author} — {book.year}
          </p>
          
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {showDifficulty && book.difficulty && (
              <Badge variant="difficulty" difficulty={book.difficulty}>
                {book.difficulty}
              </Badge>
            )}
            {showReadingTime && book.readingTime && (
              <Badge variant="outline">{book.readingTime}</Badge>
            )}
          </div>
          
          {/* Rating */}
          {showRating && book.rating && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <StarRating rating={book.rating} size="md" showValue />
            </div>
          )}
          
          {/* Tagline */}
          <p className="text-lg text-gray-700 dark:text-gray-100 mb-6 leading-relaxed">
            {book.tagline}
          </p>
          
          {/* CTA */}
          <Link 
            href={`/ressources/meilleurs-livres/${book.category}/${book.slug}`}
            className="inline-block bg-mint-green text-blue-ink font-semibold 
                       px-8 py-3 rounded-full shadow-lg hover:bg-mint-green/80 
                       hover:scale-105 transition-all duration-300 text-lg"
          >
            Résumé complet
          </Link>
        </div>
      </div>
    );
  }

  // Default grid variant
  return (
    <div className={`${baseCardClasses} p-6 ${className}`}>
      <div className="flex flex-col h-full">
        {/* Cover placeholder */}
        <div className={`w-28 h-40 rounded-lg mb-4 flex items-center justify-center text-4xl mx-auto
                        ${getCategoryGradient(book.category)}`}>
          {getCategoryIcon(book.category)}
        </div>
        
        {/* Title and metadata */}
        <h3 className="text-xl font-bold text-blue-ink dark:text-mint-green mb-2 text-center">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-200 mb-3 italic text-center">
          {book.author} — {book.year}
        </p>
        
        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {showDifficulty && book.difficulty && (
            <Badge variant="difficulty" size="sm" difficulty={book.difficulty}>
              {book.difficulty}
            </Badge>
          )}
          {showReadingTime && book.readingTime && (
            <Badge variant="outline" size="sm">{book.readingTime}</Badge>
          )}
        </div>
        
        {/* Rating */}
        {showRating && book.rating && (
          <div className="flex items-center justify-center gap-1 mb-3">
            <StarRating rating={book.rating} size="sm" />
            <span className="text-xs text-gray-500 ml-1">{book.rating}/5</span>
          </div>
        )}
        
        {/* Tagline */}
        <p className="text-base text-gray-700 dark:text-gray-100 mb-4 text-center flex-1 
                      leading-relaxed line-clamp-3">
          {book.tagline}
        </p>
        
        {/* CTA */}
        <Link 
          href={`/ressources/meilleurs-livres/${book.category}/${book.slug}`}
          className="mt-auto inline-block bg-mint-green text-blue-ink font-semibold 
                     px-4 py-2 rounded-full shadow hover:bg-mint-green/80 
                     transition-all duration-300 w-full text-center hover:scale-105"
        >
          Résumé complet
        </Link>
      </div>
    </div>
  );
};

export default BookCard;