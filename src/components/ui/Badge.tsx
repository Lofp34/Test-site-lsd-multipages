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
          border-2 border-gray-300 dark:border-gray-600 
          text-gray-700 dark:text-gray-200 
          bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50
          hover:border-gray-400 dark:hover:border-gray-500
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
          bg-green-100 dark:bg-green-900/30 
          text-green-800 dark:text-green-300
          border border-green-200 dark:border-green-700
          hover:bg-green-200 dark:hover:bg-green-900/50
        `;
      
      case 'Intermédiaire':
        return `
          bg-orange-100 dark:bg-orange-900/30 
          text-orange-800 dark:text-orange-300
          border border-orange-200 dark:border-orange-700
          hover:bg-orange-200 dark:hover:bg-orange-900/50
        `;
      
      case 'Avancé':
        return `
          bg-red-100 dark:bg-red-900/30 
          text-red-800 dark:text-red-300
          border border-red-200 dark:border-red-700
          hover:bg-red-200 dark:hover:bg-red-900/50
        `;
      
      default:
        return `
          bg-gray-100 dark:bg-gray-800 
          text-gray-700 dark:text-gray-300
          border border-gray-200 dark:border-gray-600
          hover:bg-gray-200 dark:hover:bg-gray-700
        `;
    }
  };

  // Category-specific styling
  const getCategoryClasses = (categorySlug?: string) => {
    const categoryStyles: Record<string, string> = {
      'prospection-sdr': `
        bg-blue-100 dark:bg-blue-900/30 
        text-blue-800 dark:text-blue-300
        border border-blue-200 dark:border-blue-700
        hover:bg-blue-200 dark:hover:bg-blue-900/50
      `,
      'negociation-closing': `
        bg-green-100 dark:bg-green-900/30 
        text-green-800 dark:text-green-300
        border border-green-200 dark:border-green-700
        hover:bg-green-200 dark:hover:bg-green-900/50
      `,
      'psychologie-influence': `
        bg-purple-100 dark:bg-purple-900/30 
        text-purple-800 dark:text-purple-300
        border border-purple-200 dark:border-purple-700
        hover:bg-purple-200 dark:hover:bg-purple-900/50
      `,
      'methodes-process': `
        bg-orange-100 dark:bg-orange-900/30 
        text-orange-800 dark:text-orange-300
        border border-orange-200 dark:border-orange-700
        hover:bg-orange-200 dark:hover:bg-orange-900/50
      `,
      'enterprise-account': `
        bg-indigo-100 dark:bg-indigo-900/30 
        text-indigo-800 dark:text-indigo-300
        border border-indigo-200 dark:border-indigo-700
        hover:bg-indigo-200 dark:hover:bg-indigo-900/50
      `,
      'sales-management': `
        bg-teal-100 dark:bg-teal-900/30 
        text-teal-800 dark:text-teal-300
        border border-teal-200 dark:border-teal-700
        hover:bg-teal-200 dark:hover:bg-teal-900/50
      `,
      'management-leadership': `
        bg-teal-100 dark:bg-teal-900/30 
        text-teal-800 dark:text-teal-300
        border border-teal-200 dark:border-teal-700
        hover:bg-teal-200 dark:hover:bg-teal-900/50
      `,
      'digital-ai': `
        bg-cyan-100 dark:bg-cyan-900/30 
        text-cyan-800 dark:text-cyan-300
        border border-cyan-200 dark:border-cyan-700
        hover:bg-cyan-200 dark:hover:bg-cyan-900/50
      `,
      'mindset-performance': `
        bg-pink-100 dark:bg-pink-900/30 
        text-pink-800 dark:text-pink-300
        border border-pink-200 dark:border-pink-700
        hover:bg-pink-200 dark:hover:bg-pink-900/50
      `
    };

    return categoryStyles[categorySlug || ''] || `
      bg-gray-100 dark:bg-gray-800 
      text-gray-700 dark:text-gray-300
      border border-gray-200 dark:border-gray-600
      hover:bg-gray-200 dark:hover:bg-gray-700
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