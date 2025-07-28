import React from 'react';
import Link from 'next/link';
import Badge from './Badge';

interface TechniqueCardProps {
  title: string;
  description: string;
  author: string;
  origin: string;
  difficulty: 'Facile' | 'Intermédiaire' | 'Avancé';
  category: string;
  slug: string;
  icon?: string;
  successRate?: string;
  applicationContext?: string;
  className?: string;
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({
  title,
  description,
  author,
  origin,
  difficulty,
  category,
  slug,
  icon = '🤝',
  successRate,
  applicationContext,
  className = ''
}) => {
  const getCategoryGradient = (categorySlug: string): string => {
    const gradientMap: Record<string, string> = {
      'closing': 'bg-gradient-to-br from-red-500 to-orange-500',
      'psychology': 'bg-gradient-to-br from-purple-500 to-pink-500',
      'preparation': 'bg-gradient-to-br from-blue-500 to-cyan-500',
      'objection-handling': 'bg-gradient-to-br from-emerald-500 to-green-500'
    };
    
    return gradientMap[categorySlug] || 'bg-gradient-to-br from-red-500 to-orange-500';
  };

  return (
    <div className={`
      bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl 
      hover:scale-105 hover:shadow-3xl transition-all duration-300 
      border border-red-200/50 p-6 h-full flex flex-col
      ${className}
    `}>
      {/* Header with icon */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`
          w-16 h-16 rounded-2xl flex items-center justify-center text-2xl
          ${getCategoryGradient(category)}
        `}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-ink mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600">
            {author} • {origin}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="difficulty" difficulty={difficulty} size="sm">
          {difficulty}
        </Badge>
        {successRate && (
          <Badge variant="outline" size="sm">
            {successRate} succès
          </Badge>
        )}
        {applicationContext && (
          <Badge variant="category" category="negociation-closing" size="sm">
            {applicationContext}
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed mb-6 flex-1">
        {description}
      </p>

      {/* CTA */}
      <Link 
        href={`/ressources/techniques-de-negociation/${slug}`}
        className="
          bg-gradient-to-r from-red-600 to-orange-500 
          text-white font-semibold px-6 py-3 rounded-full 
          shadow-lg hover:shadow-red-500/30 
          hover:scale-105 transition-all duration-300 
          text-center block
        "
      >
        Découvrir la technique
      </Link>
    </div>
  );
};

export default TechniqueCard;