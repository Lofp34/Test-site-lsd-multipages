'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

interface MobileTouchHandlerProps {
  children: React.ReactNode;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onTap?: () => void;
  onLongPress?: () => void;
  className?: string;
  disabled?: boolean;
  // Touch feedback options
  enableHapticFeedback?: boolean;
  enableVisualFeedback?: boolean;
  // Gesture thresholds
  swipeThreshold?: number;
  longPressThreshold?: number;
}

interface TouchState {
  startX: number;
  startY: number;
  startTime: number;
  isLongPress: boolean;
  hasMoved: boolean;
}

const MobileTouchHandler: React.FC<MobileTouchHandlerProps> = ({
  children,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onTap,
  onLongPress,
  className = '',
  disabled = false,
  enableHapticFeedback = true,
  enableVisualFeedback = true,
  swipeThreshold = 50,
  longPressThreshold = 500
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [touchState, setTouchState] = useState<TouchState | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  
  const { isMobile, getMobileClasses } = useMobileOptimization();

  // Haptic feedback simulation
  const triggerHapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!enableHapticFeedback || !isMobile) return;
    
    // Use native haptic feedback if available
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  }, [enableHapticFeedback, isMobile]);

  // Visual feedback
  const triggerVisualFeedback = useCallback(() => {
    if (!enableVisualFeedback || !containerRef.current) return;
    
    const element = containerRef.current;
    element.style.transform = 'scale(0.95)';
    element.style.transition = 'transform 0.1s ease-out';
    
    setTimeout(() => {
      element.style.transform = 'scale(1)';
      setTimeout(() => {
        element.style.transition = '';
      }, 100);
    }, 100);
  }, [enableVisualFeedback]);

  // Touch start handler
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || !isMobile) return;
    
    const touch = e.touches[0];
    const newTouchState: TouchState = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      isLongPress: false,
      hasMoved: false
    };
    
    setTouchState(newTouchState);
    setIsPressed(true);
    
    // Start long press timer
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        if (touchState && !touchState.hasMoved) {
          setTouchState(prev => prev ? { ...prev, isLongPress: true } : null);
          triggerHapticFeedback('medium');
          onLongPress();
        }
      }, longPressThreshold);
    }
    
    // Light haptic feedback on touch start
    triggerHapticFeedback('light');
    
    // Prevent default to avoid unwanted behaviors
    e.preventDefault();
  }, [disabled, isMobile, onLongPress, longPressThreshold, triggerHapticFeedback, touchState]);

  // Touch move handler
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled || !isMobile || !touchState) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchState.startX;
    const deltaY = touch.clientY - touchState.startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Mark as moved if significant movement
    if (distance > 10 && !touchState.hasMoved) {
      setTouchState(prev => prev ? { ...prev, hasMoved: true } : null);
      
      // Cancel long press if user moved
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    }
  }, [disabled, isMobile, touchState]);

  // Touch end handler
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (disabled || !isMobile || !touchState) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchState.startX;
    const deltaY = touch.clientY - touchState.startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = Date.now() - touchState.startTime;
    
    setIsPressed(false);
    
    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    
    // Handle different gestures
    if (!touchState.hasMoved && !touchState.isLongPress && duration < 300) {
      // Tap gesture
      if (onTap) {
        triggerHapticFeedback('light');
        triggerVisualFeedback();
        onTap();
      }
    } else if (distance > swipeThreshold && !touchState.isLongPress) {
      // Swipe gesture
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      
      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          triggerHapticFeedback('medium');
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          triggerHapticFeedback('medium');
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          triggerHapticFeedback('medium');
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          triggerHapticFeedback('medium');
          onSwipeUp();
        }
      }
    }
    
    setTouchState(null);
  }, [
    disabled, 
    isMobile, 
    touchState, 
    swipeThreshold, 
    onTap, 
    onSwipeRight, 
    onSwipeLeft, 
    onSwipeDown, 
    onSwipeUp,
    triggerHapticFeedback,
    triggerVisualFeedback
  ]);

  // Touch cancel handler
  const handleTouchCancel = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setTouchState(null);
    setIsPressed(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  // Don't apply touch handling on non-mobile devices
  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={getMobileClasses(
        className,
        `mobile-touch-target ${isPressed ? 'opacity-90' : ''} ${
          enableVisualFeedback ? 'transition-all duration-150' : ''
        }`
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none'
      }}
    >
      {children}
      
      {/* Visual feedback indicator */}
      {isPressed && enableVisualFeedback && (
        <div className="absolute inset-0 bg-mint-green/10 rounded-lg pointer-events-none animate-pulse" />
      )}
      
      {/* Long press indicator */}
      {touchState?.isLongPress && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-mint-green rounded-full animate-ping" />
      )}
    </div>
  );
};

export default MobileTouchHandler;
export type { MobileTouchHandlerProps };