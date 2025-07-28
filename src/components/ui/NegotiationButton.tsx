import React from 'react';
import { useNegotiationClasses } from '@/hooks/useNegotiationTheme';

interface NegotiationButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glowEffect?: boolean;
}

const NegotiationButton: React.FC<NegotiationButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'left',
  glowEffect = false
}) => {
  const { getCTAClasses, getConditionalClasses } = useNegotiationClasses();

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[48px]'
  };

  // Base classes
  const baseClasses = `
    font-semibold rounded-full transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-red-500/50 
    disabled:opacity-50 disabled:cursor-not-allowed 
    group relative overflow-hidden inline-flex items-center justify-center gap-2
  `;

  // Variant-specific classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'negotiation-cta-primary';
      
      case 'secondary':
        return 'negotiation-cta-secondary';
      
      case 'outline':
        return 'negotiation-cta-outline';
      
      case 'ghost':
        return 'bg-transparent text-red-600 hover:bg-red-50 hover:text-red-700';
      
      default:
        return 'negotiation-cta-primary';
    }
  };

  // Glow effect classes
  const glowClasses = glowEffect ? 'animate-negotiation-glow' : '';

  // Loading spinner
  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <>
          {loadingSpinner}
          Chargement...
        </>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          <span className="group-hover:animate-bounce-in">{icon}</span>
          {children}
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          {children}
          <span className="group-hover:animate-bounce-in">{icon}</span>
        </>
      );
    }

    return children;
  };

  const combinedClasses = getConditionalClasses(
    `${baseClasses} ${sizeClasses[size]} ${getVariantClasses()} ${glowClasses} ${className}`,
    'hover:scale-105',
    'active:scale-95'
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
      role="button"
      aria-disabled={disabled || loading}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {/* Ripple effect for mobile feedback */}
      <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-active:opacity-100 group-active:animate-ping pointer-events-none"></span>
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {renderContent()}
      </span>
    </button>
  );
};

export default NegotiationButton;