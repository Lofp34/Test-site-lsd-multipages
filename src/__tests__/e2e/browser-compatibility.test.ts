/**
 * Browser Compatibility Tests for Chat Enhancements
 * Tests compatibility across different browsers
 * Requirements: 5.5
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EnhancedChatWidget } from '@/components/chat/enhanced/EnhancedChatWidget';
import { ChatProvider } from '@/components/chat/ChatProvider';

// Browser feature detection mocks
const createBrowserMock = (browserName: string, features: Record<string, boolean>) => {
  const originalUserAgent = navigator.userAgent;
  const originalIntersectionObserver = window.IntersectionObserver;
  const originalRequestAnimationFrame = window.requestAnimationFrame;
  const originalResizeObserver = window.ResizeObserver;

  return {
    setup: () => {
      // Mock user agent
      Object.defineProperty(navigator, 'userAgent', {
        value: getBrowserUserAgent(browserName),
        configurable: true
      });

      // Mock browser features
      if (!features.intersectionObserver) {
        delete (window as any).IntersectionObserver;
      }
      
      if (!features.requestAnimationFrame) {
        delete (window as any).requestAnimationFrame;
      }
      
      if (!features.resizeObserver) {
        delete (window as any).ResizeObserver;
      }

      // Mock CSS support
      if (!features.cssGrid) {
        const originalSupports = CSS.supports;
        CSS.supports = vi.fn((property: string) => {
          if (property.includes('grid')) return false;
          return originalSupports.call(CSS, property);
        });
      }
    },
    
    teardown: () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true
      });
      
      if (originalIntersectionObserver) {
        window.IntersectionObserver = originalIntersectionObserver;
      }
      
      if (originalRequestAnimationFrame) {
        window.requestAnimationFrame = originalRequestAnimationFrame;
      }
      
      if (originalResizeObserver) {
        window.ResizeObserver = originalResizeObserver;
      }
    }
  };
};

const getBrowserUserAgent = (browser: string): string => {
  const userAgents = {
    chrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    firefox: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
    safari: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
    edge: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    ie11: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko'
  };
  return userAgents[browser as keyof typeof userAgents] || userAgents.chrome;
};

describe('Browser Compatibility Tests', () => {
  describe('Chrome Compatibility', () => {
    const chromeMock = createBrowserMock('chrome', {
      intersectionObserver: true,
      requestAnimationFrame: true,
      resizeObserver: true,
      cssGrid: true,
      es6: true
    });

    beforeEach(() => {
      chromeMock.setup();
    });

    afterEach(() => {
      chromeMock.teardown();
    });

    it('should work fully in Chrome', () => {
      render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      // All features should be available
      expect(screen.getByTestId('chat-container')).toBeInTheDocument();
      expect(screen.getByTestId('markdown-renderer')).toBeInTheDocument();
      expect(screen.getByTestId('scroll-controller')).toBeInTheDocument();
      expect(screen.getByTestId('chat-controls')).toBeInTheDocument();
    });
  });

  describe('Firefox Compatibility', () => {
    const firefoxMock = createBrowserMock('firefox', {
      intersectionObserver: true,
      requestAnimationFrame: true,
      resizeObserver: true,
      cssGrid: true,
      es6: true
    });

    beforeEach(() => {
      firefoxMock.setup();
    });

    afterEach(() => {
      firefoxMock.teardown();
    });

    it('should work fully in Firefox', () => {
      render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      expect(screen.getByTestId('chat-container')).toBeInTheDocument();
      expect(screen.getByTestId('markdown-renderer')).toBeInTheDocument();
      expect(screen.getByTestId('scroll-controller')).toBeInTheDocument();
      expect(screen.getByTestId('chat-controls')).toBeInTheDocument();
    });
  });

  describe('Safari Compatibility', () => {
    const safariMock = createBrowserMock('safari', {
      intersectionObserver: true,
      requestAnimationFrame: true,
      resizeObserver: false, // Safari has limited ResizeObserver support
      cssGrid: true,
      es6: true
    });

    beforeEach(() => {
      safariMock.setup();
    });

    afterEach(() => {
      safariMock.teardown();
    });

    it('should work with fallbacks in Safari', () => {
      render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      expect(screen.getByTestId('chat-container')).toBeInTheDocument();
      
      // Should use fallback for ResizeObserver
      const scrollController = screen.getByTestId('scroll-controller');
      expect(scrollController).toHaveAttribute('data-fallback-mode', 'true');
    });
  });

  describe('Edge Compatibility', () => {
    const edgeMock = createBrowserMock('edge', {
      intersectionObserver: true,
      requestAnimationFrame: true,
      resizeObserver: true,
      cssGrid: true,
      es6: true
    });

    beforeEach(() => {
      edgeMock.setup();
    });

    afterEach(() => {
      edgeMock.teardown();
    });

    it('should work fully in Edge', () => {
      render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      expect(screen.getByTestId('chat-container')).toBeInTheDocument();
      expect(screen.getByTestId('markdown-renderer')).toBeInTheDocument();
      expect(screen.getByTestId('scroll-controller')).toBeInTheDocument();
      expect(screen.getByTestId('chat-controls')).toBeInTheDocument();
    });
  });

  describe('Legacy Browser Support', () => {
    const legacyMock = createBrowserMock('ie11', {
      intersectionObserver: false,
      requestAnimationFrame: false,
      resizeObserver: false,
      cssGrid: false,
      es6: false
    });

    beforeEach(() => {
      legacyMock.setup();
    });

    afterEach(() => {
      legacyMock.teardown();
    });

    it('should provide basic functionality with polyfills', () => {
      render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            fallbackMode={true}
          />
        </ChatProvider>
      );

      // Basic chat should work
      expect(screen.getByTestId('chat-container')).toBeInTheDocument();
      
      // Should use fallback components
      expect(screen.getByTestId('chat-container')).toHaveAttribute('data-legacy-mode', 'true');
      
      // Advanced features should be disabled
      expect(screen.queryByTestId('scroll-controller')).not.toBeInTheDocument();
      expect(screen.getByTestId('basic-chat-interface')).toBeInTheDocument();
    });
  });

  describe('Mobile Browser Compatibility', () => {
    it('should work on iOS Safari', () => {
      // Mock iOS Safari
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        configurable: true
      });

      render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            mobileOptimized={true}
          />
        </ChatProvider>
      );

      const container = screen.getByTestId('chat-container');
      expect(container).toHaveClass('mobile-ios');
      expect(container).toHaveAttribute('data-mobile-optimized', 'true');
    });

    it('should work on Android Chrome', () => {
      // Mock Android Chrome
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        configurable: true
      });

      render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            mobileOptimized={true}
          />
        </ChatProvider>
      );

      const container = screen.getByTestId('chat-container');
      expect(container).toHaveClass('mobile-android');
      expect(container).toHaveAttribute('data-mobile-optimized', 'true');
    });
  });

  describe('Feature Detection and Graceful Degradation', () => {
    it('should detect missing IntersectionObserver and use fallback', () => {
      // Remove IntersectionObserver
      delete (window as any).IntersectionObserver;

      render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      const scrollController = screen.getByTestId('scroll-controller');
      expect(scrollController).toHaveAttribute('data-fallback-scroll', 'true');
    });

    it('should detect missing requestAnimationFrame and use setTimeout', () => {
      // Remove requestAnimationFrame
      delete (window as any).requestAnimationFrame;

      render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      const container = screen.getByTestId('chat-container');
      expect(container).toHaveAttribute('data-animation-fallback', 'true');
    });

    it('should handle CSS Grid fallback', () => {
      // Mock CSS.supports to return false for grid
      const originalSupports = CSS.supports;
      CSS.supports = vi.fn((property: string) => {
        if (property.includes('grid')) return false;
        return originalSupports.call(CSS, property);
      });

      render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      const container = screen.getByTestId('chat-container');
      expect(container).toHaveClass('flexbox-layout');
      expect(container).not.toHaveClass('grid-layout');

      // Restore original
      CSS.supports = originalSupports;
    });
  });

  describe('Performance Across Browsers', () => {
    it('should maintain performance standards in all browsers', async () => {
      const browsers = ['chrome', 'firefox', 'safari', 'edge'];
      
      for (const browser of browsers) {
        const mock = createBrowserMock(browser, {
          intersectionObserver: true,
          requestAnimationFrame: true,
          resizeObserver: true,
          cssGrid: true,
          es6: true
        });

        mock.setup();

        const startTime = performance.now();
        
        render(
          <ChatProvider>
            <EnhancedChatWidget isOpen={true} />
          </ChatProvider>
        );

        const endTime = performance.now();
        const renderTime = endTime - startTime;

        // Should render within 100ms
        expect(renderTime).toBeLessThan(100);

        mock.teardown();
      }
    });
  });
});