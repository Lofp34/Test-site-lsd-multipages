'use client';

import React, { forwardRef, useCallback, useState } from 'react';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import MobileTouchHandler from './MobileTouchHandler';

interface MobileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  hapticFeedback?: boolean;
  visualFeedback?: boolean;
  children: React.ReactNode;
}

const MobileButton = forwardRef<HTMLButtonElement, MobileButtonProps>(({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  hapticFeedback = true,
  visualFeedback = true,
  className = '',
  disabled,
  onClick,
  children,
  ...props
}, ref) => {
  const [isPressed, setIsPressed] = useState(false);
  const { isMobile, getMobileClasses } = useMobileOptimization();

  // Get variant styles
  const getVariantStyles = useCallback(() => {
    const variants = {
      primary: 'bg-gradient-to-r from-mint-green to-mint-green/90 hover:from-mint-green/90 hover:to-mint-green/80 text-white shadow-md hover:shadow-lg',
      secondary: 'bg-white hover:bg-gray-50 text-blue-ink border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md',
      danger: 'bg-gradient-to-r from-orange-soft to-orange-soft/90 hover:from-orange-soft/90 hover:to-orange-soft/80 text-white shadow-md hover:shadow-lg',
      ghost: 'bg-transparent hover:bg-white/10 text-current border border-white/20 hover:border-white/30'
    };
    return variants[variant];
  }, [variant]);

  // Get size styles
  const getSizeStyles = useCallback(() => {
    const sizes = {
      sm: isMobile ? 'min-w-[44px] min-h-[44px] px-3 py-2 text-sm' : 'px-3 py-2 text-sm',
      md: isMobile ? 'min-w-[44px] min-h-[44px] px-4 py-3 text-base' : 'px-4 py-2 text-base',
      lg: isMobile ? 'min-w-[48px] min-h-[48px] px-6 py-4 text-lg' : 'px-6 py-3 text-lg'
    };
    return sizes[size];
  }, [size, isMobile]);

  // Handle button press
  const handlePress = useCallback(() => {
    if (disabled || loading) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  }, [disabled, loading]);

  // Handle click
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    handlePress();
    if (onClick) {
      onClick(e);
    }
  }, [disabled, loading, onClick, handlePress]);

  // Base button classes
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium rounded-xl
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-mint-green/50 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${getSizeStyles()}
    ${getVariantStyles()}
  `;

  // Mobile-specific classes
  const mobileClasses = `
    mobile-button
    active:scale-95
    touch-manipulation
    select-none
    ${isPressed ? 'scale-95' : ''}
  `;

  const buttonContent = (
    <>
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin opacity-60" />
        </div>
      )}
      
      {/* Button content */}
      <div className={`flex items-center space-x-2 ${loading ? 'opacity-0' : ''}`}>
        {icon && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </div>
      
      {/* Press indicator */}
      {isPressed && visualFeedback && (
        <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
      )}
    </>
  );

  if (isMobile) {
    return (
      <MobileTouchHandler
        onTap={!disabled && !loading ? () => {
          const syntheticEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }) as any;
          handleClick(syntheticEvent);
        } : undefined}
        enableHapticFeedback={hapticFeedback}
        enableVisualFeedback={visualFeedback}
        disabled={disabled || loading}
        className={getMobileClasses(baseClasses, mobileClasses) + ' ' + className}
      >
        <button
          ref={ref}
          disabled={disabled || loading}
          className="w-full h-full bg-transparent border-none outline-none cursor-pointer"
          style={{ touchAction: 'manipulation' }}
          {...props}
        >
          {buttonContent}
        </button>
      </MobileTouchHandler>
    );
  }

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      onClick={handleClick}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {buttonContent}
    </button>
  );
});

MobileButton.displayName = 'MobileButton';

export default MobileButton;
export type { MobileButtonProps };