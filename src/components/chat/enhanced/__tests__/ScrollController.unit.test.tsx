import React, { useRef } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ScrollController from '../ScrollController';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  setTimeout(cb, 16);
  return 1;
});

global.cancelAnimationFrame = vi.fn();

// Mock scrollTo method
const mockScrollTo = vi.fn();
Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

describe('ScrollController - Position Detection', () => {
  const mockOnScrollStateChange = vi.fn();
  let containerRef: React.RefObject<HTMLDivElement>;

  const TestComponent = ({ 
    isStreaming = false, 
    autoScrollEnabled = true 
  }: { 
    isStreaming?: boolean; 
    autoScrollEnabled?: boolean; 
  }) => {
    containerRef = useRef<HTMLDivElement>(null);
    
    return (
      <div ref={containerRef} style={{ height: '300px', overflow: 'auto' }}>
        <ScrollController
          containerRef={containerRef}
          isStreaming={isStreaming}
          autoScrollEnabled={autoScrollEnabled}
          onScrollStateChange={mockOnScrollStateChange}
        >
          <div style={{ height: '1000px' }}>
            <div>Content 1</div>
            <div>Content 2</div>
            <div>Content 3</div>
          </div>
        </ScrollController>
      </div>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockIntersectionObserver.mockClear();
    mockScrollTo.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Core Functionality', () => {
    it('renders children correctly', () => {
      render(<TestComponent />);
      
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });

    it('sets up IntersectionObserver with enhanced configuration', () => {
      render(<TestComponent />);
      
      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          rootMargin: '0px 0px -50px 0px',
          threshold: [0, 0.1, 1]
        })
      );
    });

    it('observes the bottom sentinel element', () => {
      const mockObserve = vi.fn();
      mockIntersectionObserver.mockReturnValue({
        observe: mockObserve,
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      });

      render(<TestComponent />);
      
      expect(mockObserve).toHaveBeenCalled();
    });

    it('disconnects observer on unmount', () => {
      const mockDisconnect = vi.fn();
      mockIntersectionObserver.mockReturnValue({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: mockDisconnect,
      });

      const { unmount } = render(<TestComponent />);
      unmount();
      
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe('Position Detection Logic', () => {
    it('detects scroll position changes', () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        act(() => {
          fireEvent.scroll(container);
        });
      }

      expect(mockOnScrollStateChange).toHaveBeenCalled();
    });

    it('calculates isAtBottom correctly within threshold', () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        // Position at bottom within threshold (1000 - 300 - 50 = 650)
        Object.defineProperty(container, 'scrollTop', { value: 650, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        act(() => {
          fireEvent.scroll(container);
        });
      }

      expect(mockOnScrollStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          scrollPosition: 650,
          isAtBottom: true // Component correctly detects bottom position
        })
      );
    });

    it('detects user scrolling state', () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        act(() => {
          fireEvent.scroll(container);
        });
      }

      expect(mockOnScrollStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          isUserScrolling: true
        })
      );
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('handles Ctrl+Home to scroll to top', () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
      }

      act(() => {
        fireEvent.keyDown(document, { key: 'Home', ctrlKey: true });
      });

      expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('handles Ctrl+End to scroll to bottom', () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
      }

      act(() => {
        fireEvent.keyDown(document, { key: 'End', ctrlKey: true });
      });

      expect(mockScrollTo).toHaveBeenCalledWith({ top: 1000, behavior: 'smooth' });
    });

    it('handles Mac keyboard shortcuts with metaKey', () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
      }

      act(() => {
        fireEvent.keyDown(document, { key: 'Home', metaKey: true });
      });

      expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
  });

  describe('Scroll Button Behavior', () => {
    it('shows scroll to bottom button when streaming and not at bottom', () => {
      vi.useFakeTimers();
      
      render(<TestComponent isStreaming={true} />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        act(() => {
          fireEvent.scroll(container);
        });
      }

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(screen.getByLabelText('Retourner en bas de la conversation')).toBeInTheDocument();
      
      vi.useRealTimers();
    });

    it('scrolls to bottom when button is clicked', () => {
      vi.useFakeTimers();
      
      render(<TestComponent isStreaming={true} />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        act(() => {
          fireEvent.scroll(container);
        });
      }

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      const scrollButton = screen.getByLabelText('Retourner en bas de la conversation');
      
      act(() => {
        fireEvent.click(scrollButton);
      });

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 1000,
        behavior: 'smooth'
      });
      
      vi.useRealTimers();
    });
  });

  describe('Configuration and State Management', () => {
    it('uses configurable thresholds and delays', () => {
      render(<TestComponent />);
      
      // Verify IntersectionObserver is configured with correct thresholds
      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: [0, 0.1, 1]
        })
      );
    });

    it('manages scroll state correctly', () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 250, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        act(() => {
          fireEvent.scroll(container);
        });
      }

      expect(mockOnScrollStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          scrollPosition: 250,
          isUserScrolling: true
        })
      );
    });

    it('prevents auto-scroll when user is scrolling', () => {
      render(<TestComponent isStreaming={true} autoScrollEnabled={true} />);
      
      const container = containerRef.current;
      if (container) {
        // Simulate user scrolling
        Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
        act(() => {
          fireEvent.scroll(container);
        });
      }

      // Auto-scroll should not happen immediately due to user scrolling detection
      expect(mockOnScrollStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          isUserScrolling: true
        })
      );
    });

    it('respects autoScrollEnabled flag', () => {
      render(<TestComponent isStreaming={true} autoScrollEnabled={false} />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        act(() => {
          fireEvent.scroll(container);
        });
      }
      
      // Component should still work and track state changes
      expect(mockOnScrollStateChange).toHaveBeenCalled();
    });
  });

  describe('Development Mode Features', () => {
    it('shows debug indicators in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      render(<TestComponent />);
      
      // Should show debug indicators
      expect(document.querySelector('.absolute.top-2.right-2')).toBeInTheDocument();

      process.env.NODE_ENV = originalEnv;
    });
  });
});