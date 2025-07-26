"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Book } from '@/data/books-enriched';
import StarRating from './StarRating';
import Badge from './Badge';
import Button from './Button';

interface ComparisonTableProps {
  books: Book[];
  category: string;
  className?: string;
}

type SortField = 'title' | 'readingTime' | 'difficulty' | 'rating';
type SortDirection = 'asc' | 'desc';

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  books,
  category,
  className = ''
}) => {
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  // Filter books based on difficulty
  const filteredBooks = useMemo(() => {
    if (difficultyFilter === 'all') return books;
    return books.filter(book => book.difficulty === difficultyFilter);
  }, [books, difficultyFilter]);

  // Sort books
  const sortedBooks = useMemo(() => {
    return [...filteredBooks].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'readingTime':
          // Extract numeric value from reading time (e.g., "6h" -> 6)
          aValue = parseInt(a.readingTime?.replace(/[^\d]/g, '') || '0');
          bValue = parseInt(b.readingTime?.replace(/[^\d]/g, '') || '0');
          break;
        case 'difficulty':
          const difficultyOrder = { 'Facile': 1, 'Intermédiaire': 2, 'Avancé': 3 };
          aValue = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0;
          bValue = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0;
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredBooks, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-mint-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-mint-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const uniqueDifficulties = Array.from(new Set(books.map(book => book.difficulty).filter(Boolean)));

  return (
    <div className={`bg-white/70 rounded-xl shadow-lg p-6 mb-10 
                    border border-mint-green/20 backdrop-blur-sm ${className}`}>
      <h3 className="text-2xl font-bold text-blue-ink mb-4">
        Comment choisir ?
      </h3>
      
      <p className="text-gray-600 mb-6">
        Comparez les livres selon vos critères pour trouver celui qui correspond le mieux à votre profil et vos objectifs.
      </p>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Difficulté :
            </label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white 
                         focus:ring-2 focus:ring-mint-green/50 
                         focus:border-mint-green transition-colors"
            >
              <option value="all">Tous niveaux</option>
              {uniqueDifficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-gray-500">
            {filteredBooks.length} livre{filteredBooks.length > 1 ? 's' : ''} affiché{filteredBooks.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-mint-green border-b border-mint-green/20">
              <th className="py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center gap-2 hover:text-mint-green/80 transition-colors"
                >
                  Titre
                  {getSortIcon('title')}
                </button>
              </th>
              <th className="py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort('readingTime')}
                  className="flex items-center gap-2 hover:text-mint-green/80 transition-colors"
                >
                  Durée lecture
                  {getSortIcon('readingTime')}
                </button>
              </th>
              <th className="py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort('difficulty')}
                  className="flex items-center gap-2 hover:text-mint-green/80 transition-colors"
                >
                  Difficulté
                  {getSortIcon('difficulty')}
                </button>
              </th>
              <th className="py-3 px-4 font-semibold">Pour qui ?</th>
              <th className="py-3 px-4 font-semibold">
                <button
                  onClick={() => handleSort('rating')}
                  className="flex items-center gap-2 hover:text-mint-green/80 transition-colors"
                >
                  Note
                  {getSortIcon('rating')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map(book => (
              <tr 
                key={book.slug} 
                className="border-b border-gray-200/20 hover:bg-mint-green/5 transition-colors"
              >
                <td className="py-3 px-4">
                  <Link 
                    href={`/ressources/meilleurs-livres/${category}/${book.slug}`}
                    className="text-mint-green underline hover:text-mint-green/80 font-medium 
                               transition-colors block"
                  >
                    {book.title}
                  </Link>
                  <div className="text-xs text-gray-500 mt-1">
                    {book.author} ({book.year})
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-700">
                    {book.readingTime || 'N/A'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {book.difficulty ? (
                    <Badge variant="difficulty" size="sm" difficulty={book.difficulty}>
                      {book.difficulty}
                    </Badge>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-700 max-w-xs">
                    {book.targetProfiles?.slice(0, 2).join(', ') || 'Tous profils'}
                    {book.targetProfiles && book.targetProfiles.length > 2 && (
                      <span className="text-gray-500">
                        {' '}+{book.targetProfiles.length - 2} autres
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  {book.rating ? (
                    <div className="flex items-center gap-2">
                      <StarRating rating={book.rating} size="sm" />
                      <span className="text-xs text-gray-500">
                        {book.rating.toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {sortedBooks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Aucun livre ne correspond aux critères sélectionnés.
          </p>
          <button
            onClick={() => setDifficultyFilter('all')}
            className="mt-2 text-mint-green hover:text-mint-green/80 underline text-sm"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
      
      {/* CTA Quiz futur */}
      <div className="mt-8 text-center border-t border-gray-200/20 pt-6">
        <p className="text-sm text-gray-600 mb-3">
          Pas sûr de votre choix ? Laissez-nous vous guider !
        </p>
        <Button variant="outline" size="sm" disabled className="cursor-not-allowed opacity-60">
          🎯 Quiz : Quel livre pour votre profil ? (Bientôt disponible)
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          En attendant, n'hésitez pas à{' '}
          <Link 
            href="/contact" 
            className="text-mint-green hover:text-mint-green/80 underline"
          >
            me contacter
          </Link>
          {' '}pour des conseils personnalisés.
        </p>
      </div>
    </div>
  );
};

export default ComparisonTable;