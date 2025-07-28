import React from 'react';
import { useNegotiationClasses } from '@/hooks/useNegotiationTheme';

interface NegotiationBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'difficulty' | 'success';
  size?: 'sm' | 'md' | 'lg';
  difficulty?: 'Facile' | 'Intermédiaire' | 'Avancé';
  animated?: boolean;
  className?: string;
}

const NegotiationBadge: React.FC<NegotiationBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  difficulty,
  animated = false,
  className = ''
}) => {
  const { getConditionalClasses } = useNegotiationClasses();

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-full 
    transition-all duration-200 whitespace-nowrap border
  `;

  // Variant-specific classes
  const getVariantClasses = () => {
    if (difficulty) {
      return getDifficultyClasses(difficulty);
    }

    switch (variant) {
      case 'primary':
        return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
      
      case 'secondary':
        return 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200';
      
      case 'accent':
        return 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200';
      
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      
      default:
        return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
    }
  };

  // Difficulty-specific styling
  const getDifficultyClasses = (level: string) => {
    switch (level) {
      case 'Facile':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      
      case 'Intermédiaire':
        return 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200';
      
      case 'Avancé':
        return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
      
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200';
    }
  };

  // Animation classes
  const animationClasses = animated ? 'animate-negotiation-pulse' : '';

  const combinedClasses = getConditionalClasses(
    `${baseClasses} ${sizeClasses[size]} ${getVariantClasses()} ${className}`,
    'hover:scale-105',
    animationClasses
  );

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

export default NegotiationBadge;