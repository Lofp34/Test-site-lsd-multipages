import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'difficulty' | 'outline' | 'category' | 'default';
  size?: 'sm' | 'md' | 'lg';
  difficulty?: 'Facile' | 'Intermédiaire' | 'Avancé';
  category?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  difficulty,
  category,
  className = ''
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-full 
    transition-all duration-200 whitespace-nowrap
  `;

  // Variant-specific classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'difficulty':
        return getDifficultyClasses(difficulty);
      
      case 'outline':
        return `
          border-2 border-gray-300 
          text-gray-700 
          bg-transparent hover:bg-gray-50:bg-gray-800/50
          hover:border-gray-400:border-gray-500
        `;
      
      case 'category':
        return getCategoryClasses(category);
      
      case 'default':
      default:
        return `
          bg-mint-green/10 text-mint-green 
          border border-mint-green/30
          hover:bg-mint-green/20 hover:border-mint-green/50
        `;
    }
  };

  // Difficulty-specific styling
  const getDifficultyClasses = (level?: string) => {
    switch (level) {
      case 'Facile':
        return `
          bg-green-100 
          text-green-800
          border border-green-200
          hover:bg-green-200:bg-green-900/50
        `;
      
      case 'Intermédiaire':
        return `
          bg-orange-100 
          text-orange-800
          border border-orange-200
          hover:bg-orange-200:bg-orange-900/50
        `;
      
      case 'Avancé':
        return `
          bg-red-100 
          text-red-800
          border border-red-200
          hover:bg-red-200:bg-red-900/50
        `;
      
      default:
        return `
          bg-gray-100 
          text-gray-700
          border border-gray-200
          hover:bg-gray-200:bg-gray-700
        `;
    }
  };

  // Category-specific styling
  const getCategoryClasses = (categorySlug?: string) => {
    const categoryStyles: Record<string, string> = {
      'prospection-sdr': `
        bg-blue-100 
        text-blue-800
        border border-blue-200
        hover:bg-blue-200:bg-blue-900/50
      `,
      'negociation-closing': `
        bg-green-100 
        text-green-800
        border border-green-200
        hover:bg-green-200:bg-green-900/50
      `,
      'psychologie-influence': `
        bg-purple-100 
        text-purple-800
        border border-purple-200
        hover:bg-purple-200:bg-purple-900/50
      `,
      'methodes-process': `
        bg-orange-100 
        text-orange-800
        border border-orange-200
        hover:bg-orange-200:bg-orange-900/50
      `,
      'enterprise-account': `
        bg-indigo-100 
        text-indigo-800
        border border-indigo-200
        hover:bg-indigo-200:bg-indigo-900/50
      `,
      'sales-management': `
        bg-teal-100 
        text-teal-800
        border border-teal-200
        hover:bg-teal-200:bg-teal-900/50
      `,
      'management-leadership': `
        bg-teal-100 
        text-teal-800
        border border-teal-200
        hover:bg-teal-200:bg-teal-900/50
      `,
      'digital-ai': `
        bg-cyan-100 
        text-cyan-800
        border border-cyan-200
        hover:bg-cyan-200:bg-cyan-900/50
      `,
      'mindset-performance': `
        bg-pink-100 
        text-pink-800
        border border-pink-200
        hover:bg-pink-200:bg-pink-900/50
      `
    };

    return categoryStyles[categorySlug || ''] || `
      bg-gray-100 
      text-gray-700
      border border-gray-200
      hover:bg-gray-200:bg-gray-700
    `;
  };

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${getVariantClasses()}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <span 
      className={combinedClasses}
      role="status"
      aria-label={`Badge: ${children}`}
    >
      {children}
    </span>
  );
};

export default Badge;