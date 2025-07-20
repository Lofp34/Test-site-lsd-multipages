'use client';

import React from 'react';
import Link from 'next/link';
import { CategorySuggestion, CategoryTheme } from '@/types/category-templates';
import AnimatedSection from './AnimatedSection';

interface CrossCategoryNavigationProps {
  suggestions: CategorySuggestion[];
  currentCategory: string;
  currentTheme: CategoryTheme;
}

export default function CrossCategoryNavigation({
  suggestions,
  currentCategory,
  currentTheme
}: CrossCategoryNavigationProps) {
  const getRelationshipIcon = (type: string) => {
    switch (type) {
      case 'complementary':
        return '🔗';
      case 'prerequisite':
        return '📚';
      case 'advanced':
        return '🚀';
      default:
        return '💡';
    }
  };

  const getRelationshipLabel = (type: string) => {
    switch (type) {
      case 'complementary':
        return 'Complémentaire';
      case 'prerequisite':
        return 'Prérequis';
      case 'advanced':
        return 'Niveau avancé';
      default:
        return 'Recommandé';
    }
  };

  const getRelationshipColor = (type: string) => {
    switch (type) {
      case 'complementary':
        return '#10B981'; // green
      case 'prerequisite':
        return '#3B82F6'; // blue
      case 'advanced':
        return '#F59E0B'; // amber
      default:
        return '#6B7280'; // gray
    }
  };

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-[var(--theme-primary)]/20 backdrop-blur-sm">
      <div className="text-center mb-8">
        <span className="inline-block bg-purple-500/20 text-purple-400 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
          🔗 Domaines connexes
        </span>
        <h3 className={`text-2xl font-bold text-blue-ink dark:text-[${currentTheme.primaryColor}] mb-4`}>
          Explorez les domaines complémentaires
        </h3>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Découvrez d'autres catégories qui enrichiront votre expertise
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion, index) => (
          <AnimatedSection key={suggestion.slug} delay={100 + index * 100}>
            <Link 
              href={`/ressources/meilleurs-livres/${suggestion.slug}`}
              className="group block p-6 bg-gradient-to-br from-white/50 to-white/30 dark:from-blue-800/50 dark:to-blue-800/30 rounded-xl border border-gray-200/50 dark:border-gray-600/50 hover:border-[var(--theme-primary)]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* En-tête avec icône et relation */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{suggestion.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-[var(--theme-primary)] transition-colors">
                      {suggestion.title}
                    </h4>
                  </div>
                </div>
                
                {/* Badge de relation */}
                <div className="flex items-center gap-1">
                  <span className="text-sm">{getRelationshipIcon(suggestion.relationshipType)}</span>
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${getRelationshipColor(suggestion.relationshipType)}20`,
                      color: getRelationshipColor(suggestion.relationshipType)
                    }}
                  >
                    {getRelationshipLabel(suggestion.relationshipType)}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {suggestion.description}
              </p>
              
              {/* Livres suggérés si disponibles */}
              {suggestion.suggestedBooks && suggestion.suggestedBooks.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    Livres recommandés :
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {suggestion.suggestedBooks.slice(0, 2).map((bookSlug, bookIndex) => (
                      <span 
                        key={bookIndex}
                        className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                      >
                        {bookSlug.replace(/-/g, ' ')}
                      </span>
                    ))}
                    {suggestion.suggestedBooks.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                        +{suggestion.suggestedBooks.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* CTA */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Découvrir la catégorie
                </span>
                <span className="text-[var(--theme-primary)] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
      
      {/* Lien de retour */}
      <div className="mt-8 text-center">
        <Link 
          href="/ressources/meilleurs-livres"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[var(--theme-primary)] transition-colors"
        >
          ← Voir toutes les catégories de livres
        </Link>
      </div>
    </div>
  );
}