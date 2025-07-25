import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'left'
}) => {
  const baseClasses = 'font-title font-semibold rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-green/60 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-mint-green hover:bg-mint-green/90 text-white shadow-xl hover:shadow-mint-green/30 hover:scale-105 active:scale-95',
    secondary: 'bg-blue-ink hover:bg-blue-ink/90 text-white shadow-xl hover:shadow-blue-ink/30 hover:scale-105 active:scale-95',
    ghost: 'bg-transparent text-blue-ink/80 hover:text-mint-green hover:bg-mint-green/5 active:bg-mint-green/10',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-blue-ink shadow-lg hover:scale-105 active:scale-95'
  };
  
  // Enhanced mobile-first sizing with proper touch targets
  const sizeClasses = {
    sm: 'px-4 py-3 text-sm min-h-[44px] min-w-[44px]', // Minimum 44px touch target
    md: 'px-6 py-4 text-base min-h-[48px] min-w-[48px]', // Comfortable touch target
    lg: 'px-8 py-5 text-lg min-h-[56px] min-w-[56px] sm:px-10 sm:py-6' // Large touch target with responsive padding
  };

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

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      // Enhanced mobile accessibility
      role="button"
      aria-disabled={disabled || loading}
      aria-label={typeof children === 'string' ? children : undefined}
      // Mobile tactile feedback - handled via CSS active state instead of JS events
    >
      {/* Ripple effect for mobile feedback */}
      <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-active:opacity-100 group-active:animate-ping pointer-events-none"></span>
      
      <span className="flex items-center justify-center gap-2 relative z-10">
        {renderContent()}
      </span>
    </button>
  );
};

export default Button; 