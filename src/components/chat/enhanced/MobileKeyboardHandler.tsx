'use client';

import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

interface MobileKeyboardHandlerProps {
  children: React.ReactNode;
  onKeyboardShow?: (height: number) => void;
  onKeyboardHide?: () => void;
  onOrientationChange?: (orientation: 'portrait' | 'landscape') => void;
  adjustLayout?: boolean;
  className?: string;
}

interface KeyboardState {
  isVisible: boolean;
  height: number;
  animating: boolean;
}

const MobileKeyboardHandler: React.FC<MobileKeyboardHandlerProps> = ({
  children,
  onKeyboardShow,
  onKeyboardHide,
  onOrientationChange,
  adjustLayout = true,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    isVisible: false,
    height: 0,
    animating: false
  });
  
  const { 
    isMobile, 
    isKeyboardVisible, 
    orientation, 
    screenHeight, 
    viewportHeight,
    getMobileClasses 
  } = useMobileOptimization();

  // Calculate keyboard height
  const calculateKeyboardHeight = useCallback(() => {
    if (!isMobile) return 0;
    
    const heightDiff = screenHeight - viewportHeight;
    
    // Account for browser UI changes
    const minKeyboardHeight = 150;
    const maxKeyboardHeight = screenHeight * 0.6;
    
    if (heightDiff > minKeyboardHeight) {
      return Math.min(heightDiff, maxKeyboardHeight);
    }
    
    return 0;
  }, [isMobile, screenHeight, viewportHeight]);

  // Handle keyboard visibility changes
  useEffect(() => {
    const keyboardHeight = calculateKeyboardHeight();
    const wasVisible = keyboardState.isVisible;
    const isNowVisible = isKeyboardVisible && keyboardHeight > 0;
    
    if (wasVisible !== isNowVisible) {
      setKeyboardState(prev => ({ ...prev, animating: true }));
      
      setTimeout(() => {
        setKeyboardState({
          isVisible: isNowVisible,
          height: keyboardHeight,
          animating: false
        });
        
        if (isNowVisible && onKeyboardShow) {
          onKeyboardShow(keyboardHeight);
        } else if (!isNowVisible && onKeyboardHide) {
          onKeyboardHide();
        }
      }, 50); // Small delay to ensure smooth animation
    } else if (isNowVisible && keyboardState.height !== keyboardHeight) {
      // Update height if keyboard is visible but height changed
      setKeyboardState(prev => ({ ...prev, height: keyboardHeight }));
    }
  }, [
    isKeyboardVisible, 
    calculateKeyboardHeight, 
    keyboardState.isVisible, 
    keyboardState.height,
    onKeyboardShow, 
    onKeyboardHide
  ]);

  // Handle orientation changes
  useEffect(() => {
    if (onOrientationChange) {
      onOrientationChange(orientation);
    }
  }, [orientation, onOrientationChange]);

  // Viewport height adjustment for iOS Safari
  useEffect(() => {
    if (!isMobile) return;
    
    const updateViewportHeight = () => {
      // Set CSS custom property for viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);
    
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, [isMobile]);

  // Prevent zoom on input focus (iOS)
  useEffect(() => {
    if (!isMobile) return;
    
    const preventZoom = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const element = target as HTMLInputElement | HTMLTextAreaElement;
        const currentFontSize = window.getComputedStyle(element).fontSize;
        const fontSize = parseFloat(currentFontSize);
        
        // Ensure minimum 16px font size to prevent zoom on iOS
        if (fontSize < 16) {
          element.style.fontSize = '16px';
        }
      }
    };
    
    document.addEventListener('focusin', preventZoom);
    
    return () => {
      document.removeEventListener('focusin', preventZoom);
    };
  }, [isMobile]);

  // Handle safe area insets
  const getSafeAreaStyle = useCallback((): React.CSSProperties => {
    if (!isMobile) return {};
    
    const baseStyle: React.CSSProperties = {
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)'
    };
    
    if (keyboardState.isVisible && adjustLayout) {
      return {
        ...baseStyle,
        paddingBottom: `${keyboardState.height}px`,
        transition: keyboardState.animating ? 'padding-bottom 0.3s ease-out' : 'none'
      };
    }
    
    return {
      ...baseStyle,
      paddingBottom: 'env(safe-area-inset-bottom)'
    };
  }, [isMobile, keyboardState, adjustLayout]);

  // Get container classes based on keyboard state
  const getContainerClasses = useCallback(() => {
    const baseClasses = getMobileClasses(className, 'mobile-keyboard-container');
    
    if (!isMobile) return baseClasses;
    
    const stateClasses = [
      keyboardState.isVisible ? 'keyboard-visible' : 'keyboard-hidden',
      keyboardState.animating ? 'keyboard-animating' : '',
      orientation === 'landscape' ? 'landscape-mode' : 'portrait-mode'
    ].filter(Boolean).join(' ');
    
    return `${baseClasses} ${stateClasses}`;
  }, [className, getMobileClasses, isMobile, keyboardState, orientation]);

  // Scroll to focused element when keyboard appears
  useEffect(() => {
    if (!isMobile || !keyboardState.isVisible) return;
    
    const scrollToFocusedElement = () => {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        setTimeout(() => {
          activeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 300); // Wait for keyboard animation
      }
    };
    
    scrollToFocusedElement();
  }, [isMobile, keyboardState.isVisible]);

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={getContainerClasses()}
      style={getSafeAreaStyle()}
      data-keyboard-visible={keyboardState.isVisible}
      data-keyboard-height={keyboardState.height}
      data-orientation={orientation}
    >
      {children}
      
      {/* Keyboard state indicator for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 left-0 bg-black/80 text-white text-xs p-2 z-50 rounded-br-lg">
          <div>Keyboard: {keyboardState.isVisible ? 'Visible' : 'Hidden'}</div>
          <div>Height: {keyboardState.height}px</div>
          <div>Orientation: {orientation}</div>
          <div>Viewport: {viewportHeight}px</div>
          <div>Screen: {screenHeight}px</div>
        </div>
      )}
      
      {/* Keyboard spacer */}
      {keyboardState.isVisible && adjustLayout && (
        <div 
          className="keyboard-spacer"
          style={{ 
            height: `${keyboardState.height}px`,
            transition: keyboardState.animating ? 'height 0.3s ease-out' : 'none'
          }}
        />
      )}
    </div>
  );
};

export default MobileKeyboardHandler;
export type { MobileKeyboardHandlerProps, KeyboardState };