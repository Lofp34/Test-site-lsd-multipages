'use client';

import { useState, useEffect, useCallback } from 'react';

interface TouchGesture {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  distance: number;
  direction: 'up' | 'down' | 'left' | 'right' | null;
}

interface MobileOptimizationState {
  isMobile: boolean;
  isTablet: boolean;
  isKeyboardVisible: boolean;
  orientation: 'portrait' | 'landscape';
  screenHeight: number;
  viewportHeight: number;
  touchGesture: TouchGesture | null;
  // Helper functions
  getChatPosition: () => React.CSSProperties;
  getChatSize: () => React.CSSProperties;
  getMobileClasses: (baseClasses: string, mobileClasses: string) => string;
  // Touch gesture handlers
  onSwipeUp: (callback: () => void) => void;
  onSwipeDown: (callback: () => void) => void;
  onSwipeLeft: (callback: () => void) => void;
  onSwipeRight: (callback: () => void) => void;
}

export function useMobileOptimization(): MobileOptimizationState {
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isKeyboardVisible: false,
    orientation: 'portrait' as const,
    screenHeight: 0,
    viewportHeight: 0,
    touchGesture: null as TouchGesture | null
  });

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [swipeCallbacks, setSwipeCallbacks] = useState<{
    up?: () => void;
    down?: () => void;
    left?: () => void;
    right?: () => void;
  }>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Enhanced mobile detection
      const isMobile = width <= 768 || /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = !isMobile && (width <= 1024 || /iPad/i.test(userAgent));
      
      const orientation = height > width ? 'portrait' : 'landscape';
      const screenHeight = window.screen?.height || height;
      const viewportHeight = height;
      
      // Enhanced keyboard detection for mobile
      const isKeyboardVisible = isMobile && screenHeight - viewportHeight > 150;

      setState(prev => ({
        ...prev,
        isMobile,
        isTablet,
        isKeyboardVisible,
        orientation,
        screenHeight,
        viewportHeight
      }));
    };

    // Initial check
    checkMobile();

    // Listen for changes
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  // Touch gesture handling
  useEffect(() => {
    if (typeof window === 'undefined' || !state.isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      let direction: TouchGesture['direction'] = null;
      if (distance > 30) { // Minimum swipe distance
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          direction = deltaX > 0 ? 'right' : 'left';
        } else {
          direction = deltaY > 0 ? 'down' : 'up';
        }
      }

      setState(prev => ({
        ...prev,
        touchGesture: {
          startX: touchStart.x,
          startY: touchStart.y,
          currentX: touch.clientX,
          currentY: touch.clientY,
          deltaX,
          deltaY,
          distance,
          direction
        }
      }));
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart || !state.touchGesture) return;
      
      const { direction, distance } = state.touchGesture;
      
      // Execute swipe callbacks if gesture is significant enough
      if (direction && distance > 50) {
        const callback = swipeCallbacks[direction];
        if (callback) {
          callback();
        }
      }
      
      setTouchStart(null);
      setState(prev => ({ ...prev, touchGesture: null }));
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [state.isMobile, touchStart, state.touchGesture, swipeCallbacks]);

  // Helper functions
  const getChatPosition = useCallback((): React.CSSProperties => {
    if (state.isMobile) {
      return {
        bottom: state.isKeyboardVisible ? '10px' : '20px',
        right: '16px',
        left: '16px'
      };
    } else if (state.isTablet) {
      return {
        bottom: '24px',
        right: '24px'
      };
    }
    return {
      bottom: '1rem',
      right: '1rem'
    };
  }, [state.isMobile, state.isTablet, state.isKeyboardVisible]);

  const getChatSize = useCallback((): React.CSSProperties => {
    if (state.isMobile) {
      if (state.orientation === 'landscape') {
        return {
          width: '100%',
          height: state.isKeyboardVisible ? '60vh' : '70vh',
          maxHeight: '400px'
        };
      }
      return {
        width: '100%',
        height: state.isKeyboardVisible ? '50vh' : '60vh',
        maxHeight: '500px'
      };
    } else if (state.isTablet) {
      return {
        width: '400px',
        height: '500px'
      };
    }
    return {
      width: '380px',
      height: '600px'
    };
  }, [state.isMobile, state.isTablet, state.orientation, state.isKeyboardVisible]);

  const getMobileClasses = useCallback((baseClasses: string, mobileClasses: string): string => {
    return state.isMobile ? `${baseClasses} ${mobileClasses}` : baseClasses;
  }, [state.isMobile]);

  // Swipe gesture handlers
  const onSwipeUp = useCallback((callback: () => void) => {
    setSwipeCallbacks(prev => ({ ...prev, up: callback }));
  }, []);

  const onSwipeDown = useCallback((callback: () => void) => {
    setSwipeCallbacks(prev => ({ ...prev, down: callback }));
  }, []);

  const onSwipeLeft = useCallback((callback: () => void) => {
    setSwipeCallbacks(prev => ({ ...prev, left: callback }));
  }, []);

  const onSwipeRight = useCallback((callback: () => void) => {
    setSwipeCallbacks(prev => ({ ...prev, right: callback }));
  }, []);

  return {
    ...state,
    getChatPosition,
    getChatSize,
    getMobileClasses,
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight
  };
}