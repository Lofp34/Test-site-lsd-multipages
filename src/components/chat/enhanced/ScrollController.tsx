'use client';

import React, { useEffect, useRef, useCallback, useState, RefObject } from 'react';
import { AriaHelper, LiveRegionManager, AccessibilityConfig, defaultAccessibilityConfig } from '@/lib/chat/accessibility';

interface ScrollControllerProps {
  containerRef: RefObject<HTMLDivElement>;
  isStreaming: boolean;
  autoScrollEnabled: boolean;
  onScrollStateChange: (state: ScrollState) => void;
  children: React.ReactNode;
  accessibilityConfig?: AccessibilityConfig;
  liveRegionManager?: LiveRegionManager;
}

interface ScrollState {
  isAtBottom: boolean;
  isUserScrolling: boolean;
  shouldAutoScroll: boolean;
  scrollPosition: number;
}

interface ScrollConfig {
  bottomThreshold: number; // pixels from bottom to consider "at bottom"
  autoScrollDelay: number; // ms before suggesting return to bottom
  smoothScrollDuration: number;
  userScrollDetectionDelay: number; // ms to detect end of user scrolling
  intersectionThreshold: number; // threshold for intersection observer
}

const defaultConfig: ScrollConfig = {
  bottomThreshold: 50,
  autoScrollDelay: 3000,
  smoothScrollDuration: 300,
  userScrollDetectionDelay: 500,
  intersectionThreshold: 0.1,
};

const ScrollController: React.FC<ScrollControllerProps> = ({
  containerRef,
  isStreaming,
  autoScrollEnabled,
  onScrollStateChange,
  children,
  accessibilityConfig = defaultAccessibilityConfig,
  liveRegionManager
}) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isAtBottom: true,
    isUserScrolling: false,
    shouldAutoScroll: true,
    scrollPosition: 0
  });

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const lastScrollTimeRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const isAutoScrollingRef = useRef(false);
  const userScrollDetectionRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced position detection using Intersection Observer
  useEffect(() => {
    if (!containerRef.current || !bottomSentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isAtBottom = entry.isIntersecting;
        
        // Enhanced position detection with additional validation
        const container = containerRef.current;
        if (container) {
          const scrollHeight = container.scrollHeight;
          const scrollTop = container.scrollTop;
          const clientHeight = container.clientHeight;
          const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
          
          // Double-check with manual calculation for accuracy
          const isActuallyAtBottom = distanceFromBottom <= defaultConfig.bottomThreshold;
          const finalIsAtBottom = isAtBottom && isActuallyAtBottom;
          
          setScrollState(prev => {
            if (prev.isAtBottom !== finalIsAtBottom) {
              const newState = { 
                ...prev, 
                isAtBottom: finalIsAtBottom,
                shouldAutoScroll: finalIsAtBottom || prev.shouldAutoScroll
              };
              onScrollStateChange(newState);
              return newState;
            }
            return prev;
          });

          // Hide scroll to bottom button if at bottom
          if (finalIsAtBottom) {
            setShowScrollToBottom(false);
            // Clear any pending scroll suggestion timeout
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
              scrollTimeoutRef.current = null;
            }
          }
        }
      },
      {
        root: containerRef.current,
        rootMargin: `0px 0px -${defaultConfig.bottomThreshold}px 0px`,
        threshold: [0, defaultConfig.intersectionThreshold, 1]
      }
    );

    observer.observe(bottomSentinelRef.current);
    intersectionObserverRef.current = observer;

    return () => {
      observer.disconnect();
      intersectionObserverRef.current = null;
    };
  }, [containerRef, onScrollStateChange]);

  // Handle scroll events to detect user scrolling
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollPosition = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const isAtBottom = scrollHeight - scrollPosition - clientHeight <= defaultConfig.bottomThreshold;

    // Update scroll position
    setScrollState(prev => {
      const newState = { 
        ...prev, 
        scrollPosition,
        isAtBottom
      };
      onScrollStateChange(newState);
      return newState;
    });

    // Detect user scrolling (not auto-scroll)
    if (!isAutoScrollingRef.current) {
      const now = Date.now();
      lastScrollTimeRef.current = now;

      // Mark as user scrolling
      setScrollState(prev => {
        const newState = { 
          ...prev, 
          isUserScrolling: true,
          shouldAutoScroll: isAtBottom
        };
        onScrollStateChange(newState);
        return newState;
      });

      // Clear previous timeout
      if (userScrollDetectionRef.current) {
        clearTimeout(userScrollDetectionRef.current);
      }

      // Reset user scrolling flag after delay
      userScrollDetectionRef.current = setTimeout(() => {
        setScrollState(prev => {
          const newState = { 
            ...prev, 
            isUserScrolling: false
          };
          onScrollStateChange(newState);
          return newState;
        });
      }, defaultConfig.userScrollDetectionDelay);

      // Show scroll to bottom suggestion if not at bottom
      if (!isAtBottom && isStreaming) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          setShowScrollToBottom(true);
        }, defaultConfig.autoScrollDelay);
      }
    }
  }, [containerRef, isStreaming, onScrollStateChange]);

  // Attach scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, handleScroll]);

  // Auto-scroll when streaming and conditions are met
  useEffect(() => {
    if (!containerRef.current || !isStreaming || !autoScrollEnabled) return;
    if (!scrollState.shouldAutoScroll || scrollState.isUserScrolling) return;

    const container = containerRef.current;
    
    // Smooth scroll to bottom
    const scrollToBottom = () => {
      isAutoScrollingRef.current = true;
      
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });

      // Reset auto-scrolling flag after animation
      setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, defaultConfig.smoothScrollDuration);
    };

    // Use requestAnimationFrame for smooth performance
    const animationFrame = requestAnimationFrame(scrollToBottom);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [containerRef, isStreaming, autoScrollEnabled, scrollState.shouldAutoScroll, scrollState.isUserScrolling]);

  // Manual scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    isAutoScrollingRef.current = true;
    
    container.scrollTo({
      top: container.scrollHeight,
      behavior: accessibilityConfig.reduceMotion ? 'auto' : 'smooth'
    });

    // Announce scroll action to screen readers
    if (liveRegionManager) {
      liveRegionManager.announceScrollPosition('bottom');
    }

    // Update state
    setScrollState(prev => {
      const newState = { 
        ...prev, 
        shouldAutoScroll: true,
        isUserScrolling: false
      };
      onScrollStateChange(newState);
      return newState;
    });

    setShowScrollToBottom(false);

    // Reset auto-scrolling flag
    setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, defaultConfig.smoothScrollDuration);
  }, [containerRef, onScrollStateChange, accessibilityConfig.reduceMotion, liveRegionManager]);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.scrollTo({ 
      top: 0, 
      behavior: accessibilityConfig.reduceMotion ? 'auto' : 'smooth' 
    });

    // Announce scroll action to screen readers
    if (liveRegionManager) {
      liveRegionManager.announceScrollPosition('top');
    }
  }, [containerRef, accessibilityConfig.reduceMotion, liveRegionManager]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!accessibilityConfig.keyboardNavigationEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current) return;

      // Only handle if focus is within the chat container
      const container = containerRef.current;
      if (!container.contains(document.activeElement)) return;
      
      // Ctrl/Cmd + Home: scroll to top
      if ((event.ctrlKey || event.metaKey) && event.key === 'Home') {
        event.preventDefault();
        scrollToTop();
      }
      
      // Ctrl/Cmd + End: scroll to bottom
      if ((event.ctrlKey || event.metaKey) && event.key === 'End') {
        event.preventDefault();
        scrollToBottom();
      }

      // Page Up/Down for scroll navigation
      if (event.key === 'PageUp') {
        event.preventDefault();
        container.scrollBy({ 
          top: -container.clientHeight * 0.8, 
          behavior: accessibilityConfig.reduceMotion ? 'auto' : 'smooth' 
        });
      }
      
      if (event.key === 'PageDown') {
        event.preventDefault();
        container.scrollBy({ 
          top: container.clientHeight * 0.8, 
          behavior: accessibilityConfig.reduceMotion ? 'auto' : 'smooth' 
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, scrollToBottom, scrollToTop, accessibilityConfig.keyboardNavigationEnabled, accessibilityConfig.reduceMotion]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (userScrollDetectionRef.current) {
        clearTimeout(userScrollDetectionRef.current);
      }
    };
  }, []);

  // Set up container accessibility attributes
  useEffect(() => {
    if (containerRef.current) {
      AriaHelper.setScrollContainerAttributes(containerRef.current);
    }
  }, [containerRef]);

  return (
    <div className="relative h-full">
      {/* Main content */}
      <div className="h-full">
        {children}
        
        {/* Bottom sentinel for intersection observer */}
        <div 
          ref={bottomSentinelRef} 
          className="h-1 w-full"
          aria-hidden="true"
        />
      </div>

      {/* Scroll to bottom button */}
      {showScrollToBottom && (
        <button
          onClick={scrollToBottom}
          className={`absolute bottom-4 right-4 z-10 w-12 h-12 bg-mint-green hover:bg-blue-ink text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-offset-2 ${accessibilityConfig.reduceMotion ? '' : 'hover:scale-105'}`}
          aria-label="Retourner en bas de la conversation"
          title="Retourner en bas (Ctrl+Fin)"
          type="button"
        >
          <svg 
            className={`w-5 h-5 ${accessibilityConfig.reduceMotion ? '' : 'transform group-hover:translate-y-0.5 transition-transform'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
          
          {/* Pulse animation for attention - respects motion preferences */}
          {!accessibilityConfig.reduceMotion && (
            <div className="absolute inset-0 rounded-full bg-mint-green animate-ping opacity-20"></div>
          )}
        </button>
      )}

      {/* Accessibility: Scroll navigation instructions */}
      {accessibilityConfig.screenReaderOptimized && (
        <div className="sr-only">
          <p>Navigation au clavier disponible :</p>
          <ul>
            <li>Ctrl+Début : Aller au début de la conversation</li>
            <li>Ctrl+Fin : Aller à la fin de la conversation</li>
            <li>Page précédente : Faire défiler vers le haut</li>
            <li>Page suivante : Faire défiler vers le bas</li>
          </ul>
        </div>
      )}

      {/* Live region for scroll announcements */}
      <div 
        id="scroll-announcements"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Scroll position indicator (for debugging - can be removed) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
          {scrollState.isAtBottom ? '⬇️' : '⬆️'} 
          {scrollState.isUserScrolling ? ' 👆' : ''}
          {scrollState.shouldAutoScroll ? ' 🤖' : ''}
        </div>
      )}
    </div>
  );
};

export default ScrollController;
export type { ScrollControllerProps, ScrollState, ScrollConfig };