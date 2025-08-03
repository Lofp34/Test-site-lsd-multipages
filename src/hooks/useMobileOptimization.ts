'use client';

import { useState, useEffect } from 'react';

interface MobileOptimizationState {
  isMobile: boolean;
  isKeyboardVisible: boolean;
  orientation: 'portrait' | 'landscape';
  screenHeight: number;
  viewportHeight: number;
}

export function useMobileOptimization(): MobileOptimizationState {
  const [state, setState] = useState<MobileOptimizationState>({
    isMobile: false,
    isKeyboardVisible: false,
    orientation: 'portrait',
    screenHeight: 0,
    viewportHeight: 0
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      const screenHeight = window.screen?.height || window.innerHeight;
      const viewportHeight = window.innerHeight;
      const isKeyboardVisible = isMobile && screenHeight - viewportHeight > 150;

      setState({
        isMobile,
        isKeyboardVisible,
        orientation,
        screenHeight,
        viewportHeight
      });
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

  return state;
}