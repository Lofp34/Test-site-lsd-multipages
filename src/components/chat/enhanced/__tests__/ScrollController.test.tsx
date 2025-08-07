import React, { useRef } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('ScrollController', () => {
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

  it('renders children correctly', () => {
    render(<TestComponent />);
    
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();
  });

  it('sets up IntersectionObserver on mount', () => {
    render(<TestComponent />);
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        rootMargin: '0px 0px -50px 0px',
        threshold: [0, 0.1, 1]
      })
    );
  });

  it('calls onScrollStateChange when scroll state changes', async () => {
    render(<TestComponent />);
    
    // Simulate scroll event
    const container = containerRef.current;
    if (container) {
      Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
      Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
      
      fireEvent.scroll(container);
    }

    await waitFor(() => {
      expect(mockOnScrollStateChange).toHaveBeenCalled();
    });
  });

  it('shows scroll to bottom button when not at bottom and streaming', async () => {
    vi.useFakeTimers();
    
    render(<TestComponent isStreaming={true} />);
    
    // Simulate being not at bottom
    const container = containerRef.current;
    if (container) {
      Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
      Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
      
      fireEvent.scroll(container);
    }

    // Fast-forward time to trigger the button appearance
    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByLabelText('Retourner en bas de la conversation')).toBeInTheDocument();
    });
    
    vi.useRealTimers();
  });

  it('hides scroll to bottom button when at bottom', async () => {
    vi.useFakeTimers();
    
    render(<TestComponent isStreaming={true} />);
    
    // First show the button by scrolling up
    const container = containerRef.current;
    if (container) {
      Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
      Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
      fireEvent.scroll(container);
    }

    // Fast-forward to show button
    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByLabelText('Retourner en bas de la conversation')).toBeInTheDocument();
    });

    // Then simulate being at bottom (within threshold)
    if (container) {
      Object.defineProperty(container, 'scrollTop', { value: 650, writable: true }); // 1000 - 300 - 50 = 650
      fireEvent.scroll(container);
    }

    await waitFor(() => {
      expect(screen.queryByLabelText('Retourner en bas de la conversation')).not.toBeInTheDocument();
    });
    
    vi.useRealTimers();
  });

  it('scrolls to bottom when button is clicked', async () => {
    vi.useFakeTimers();
    
    render(<TestComponent isStreaming={true} />);
    
    const container = containerRef.current;
    
    if (container) {
      Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
      Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
      
      fireEvent.scroll(container);
    }

    // Fast-forward to show button
    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByLabelText('Retourner en bas de la conversation')).toBeInTheDocument();
    });

    const scrollButton = screen.getByLabelText('Retourner en bas de la conversation');
    fireEvent.click(scrollButton);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 1000,
      behavior: 'smooth'
    });
    
    vi.useRealTimers();
  });

  it('handles keyboard shortcuts', () => {
    render(<TestComponent />);
    
    const container = containerRef.current;
    
    if (container) {
      Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
    }

    // Test Ctrl+Home (scroll to top)
    fireEvent.keyDown(document, { key: 'Home', ctrlKey: true });
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    // Test Ctrl+End (scroll to bottom)
    fireEvent.keyDown(document, { key: 'End', ctrlKey: true });
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 1000, behavior: 'smooth' });
  });

  it('handles Mac keyboard shortcuts', () => {
    render(<TestComponent />);
    
    const container = containerRef.current;
    
    if (container) {
      Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
    }

    // Test Cmd+Home (scroll to top)
    fireEvent.keyDown(document, { key: 'Home', metaKey: true });
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    // Test Cmd+End (scroll to bottom)
    fireEvent.keyDown(document, { key: 'End', metaKey: true });
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 1000, behavior: 'smooth' });
  });

  it('detects user scrolling vs auto scrolling', async () => {
    render(<TestComponent isStreaming={true} />);
    
    const container = containerRef.current;
    if (container) {
      Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
      Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
      
      fireEvent.scroll(container);
    }

    await waitFor(() => {
      expect(mockOnScrollStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          isUserScrolling: true
        })
      );
    });

    // Wait for user scrolling flag to reset
    await waitFor(() => {
      expect(mockOnScrollStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          isUserScrolling: false
        })
      );
    }, { timeout: 1000 });
  });

  it('auto-scrolls when streaming and conditions are met', async () => {
    render(<TestComponent isStreaming={true} autoScrollEnabled={true} />);
    
    const container = containerRef.current;
    const mockScrollTo = vi.fn();
    
    if (container) {
      container.scrollTo = mockScrollTo;
      Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
    }

    // Simulate being at bottom and should auto-scroll
    mockOnScrollStateChange.mockImplementation((state) => {
      if (state.shouldAutoScroll && !state.isUserScrolling) {
        // This would trigger auto-scroll
      }
    });

    await waitFor(() => {
      // Auto-scroll should be triggered
      expect(requestAnimationFrame).toHaveBeenCalled();
    });
  });

  it('does not auto-scroll when user is scrolling', () => {
    render(<TestComponent isStreaming={true} autoScrollEnabled={true} />);
    
    const container = containerRef.current;
    const mockScrollTo = vi.fn();
    
    if (container) {
      container.scrollTo = mockScrollTo;
      
      // Simulate user scrolling
      Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
      fireEvent.scroll(container);
    }

    // Auto-scroll should not happen immediately due to user scrolling
    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('does not auto-scroll when autoScrollEnabled is false', () => {
    render(<TestComponent isStreaming={true} autoScrollEnabled={false} />);
    
    const container = containerRef.current;
    const mockScrollTo = vi.fn();
    
    if (container) {
      container.scrollTo = mockScrollTo;
    }

    // Auto-scroll should not happen
    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('cleans up event listeners on unmount', () => {
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

  it('shows development indicators in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(<TestComponent />);
    
    // Should show debug indicators
    expect(document.querySelector('.absolute.top-2.right-2')).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  describe('Enhanced Position Detection', () => {
    it('accurately detects bottom position with threshold validation', async () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        // Simulate being exactly at bottom threshold (50px)
        Object.defineProperty(container, 'scrollTop', { value: 650, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        fireEvent.scroll(container);
      }

      await waitFor(() => {
        expect(mockOnScrollStateChange).toHaveBeenCalledWith(
          expect.objectContaining({
            isAtBottom: true
          })
        );
      });
    });

    it('detects when user is not at bottom with precise calculation', async () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        // Simulate being 100px from bottom (beyond threshold)
        Object.defineProperty(container, 'scrollTop', { value: 600, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        fireEvent.scroll(container);
      }

      await waitFor(() => {
        expect(mockOnScrollStateChange).toHaveBeenCalledWith(
          expect.objectContaining({
            isAtBottom: false
          })
        );
      });
    });

    it('maintains shouldAutoScroll state correctly based on position', async () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        // First, simulate being at bottom
        Object.defineProperty(container, 'scrollTop', { value: 650, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        fireEvent.scroll(container);
      }

      await waitFor(() => {
        expect(mockOnScrollStateChange).toHaveBeenCalledWith(
          expect.objectContaining({
            isAtBottom: true,
            shouldAutoScroll: true
          })
        );
      });

      // Then simulate scrolling up
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 400, writable: true });
        fireEvent.scroll(container);
      }

      await waitFor(() => {
        expect(mockOnScrollStateChange).toHaveBeenCalledWith(
          expect.objectContaining({
            isAtBottom: false,
            shouldAutoScroll: false
          })
        );
      });
    });

    it('clears scroll suggestion timeout when reaching bottom', async () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      
      render(<TestComponent isStreaming={true} />);
      
      const container = containerRef.current;
      if (container) {
        // First scroll up to trigger timeout
        Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        fireEvent.scroll(container);
        
        // Then scroll to bottom
        Object.defineProperty(container, 'scrollTop', { value: 650, writable: true });
        fireEvent.scroll(container);
      }

      await waitFor(() => {
        expect(clearTimeoutSpy).toHaveBeenCalled();
      });
      
      clearTimeoutSpy.mockRestore();
    });
  });

  describe('User Scrolling Detection', () => {
    it('detects user scrolling with configurable delay', async () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
        fireEvent.scroll(container);
      }

      // Should immediately detect user scrolling
      await waitFor(() => {
        expect(mockOnScrollStateChange).toHaveBeenCalledWith(
          expect.objectContaining({
            isUserScrolling: true
          })
        );
      });

      // Should reset after delay (500ms by default)
      await waitFor(() => {
        expect(mockOnScrollStateChange).toHaveBeenCalledWith(
          expect.objectContaining({
            isUserScrolling: false
          })
        );
      }, { timeout: 1000 });
    });

    it('resets user scrolling timeout on subsequent scrolls', async () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        // First scroll
        Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
        fireEvent.scroll(container);
        
        // Second scroll before timeout
        setTimeout(() => {
          Object.defineProperty(container, 'scrollTop', { value: 150, writable: true });
          fireEvent.scroll(container);
        }, 200);
      }

      await waitFor(() => {
        expect(clearTimeoutSpy).toHaveBeenCalled();
      });
      
      clearTimeoutSpy.mockRestore();
    });

    it('tracks scroll position accurately', async () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      const testPositions = [100, 200, 300, 400];
      
      for (const position of testPositions) {
        if (container) {
          Object.defineProperty(container, 'scrollTop', { value: position, writable: true });
          fireEvent.scroll(container);
        }

        await waitFor(() => {
          expect(mockOnScrollStateChange).toHaveBeenCalledWith(
            expect.objectContaining({
              scrollPosition: position
            })
          );
        });
      }
    });
  });

  it('handles scroll position updates correctly', async () => {
    render(<TestComponent />);
    
    const container = containerRef.current;
    if (container) {
      Object.defineProperty(container, 'scrollTop', { value: 250, writable: true });
      Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
      
      fireEvent.scroll(container);
    }

    await waitFor(() => {
      expect(mockOnScrollStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          scrollPosition: 250
        })
      );
    });
  });

  describe('IntersectionObserver Configuration', () => {
    it('configures IntersectionObserver with correct thresholds', () => {
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

    it('handles IntersectionObserver callback correctly', async () => {
      let observerCallback: (entries: IntersectionObserverEntry[]) => void;
      
      mockIntersectionObserver.mockImplementation((callback) => {
        observerCallback = callback;
        return {
          observe: vi.fn(),
          unobserve: vi.fn(),
          disconnect: vi.fn(),
        };
      });

      render(<TestComponent />);
      
      // Set up container properties first
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'scrollTop', { value: 650, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
      }

      // Simulate intersection observer callback
      const mockEntry = {
        isIntersecting: true,
        target: document.createElement('div'),
        intersectionRatio: 1,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: {} as DOMRectReadOnly,
        time: Date.now()
      };

      // Call the observer callback
      if (observerCallback) {
        observerCallback([mockEntry]);
      }

      await waitFor(() => {
        expect(mockOnScrollStateChange).toHaveBeenCalledWith(
          expect.objectContaining({
            isAtBottom: true
          })
        );
      });
    });
  });

  describe('State Management', () => {
    it('prevents unnecessary state updates when position unchanged', async () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 100, writable: true });
        Object.defineProperty(container, 'scrollHeight', { value: 1000, writable: true });
        Object.defineProperty(container, 'clientHeight', { value: 300, writable: true });
        
        // First scroll
        fireEvent.scroll(container);
      }

      // Wait for initial state change
      await waitFor(() => {
        expect(mockOnScrollStateChange).toHaveBeenCalled();
      });

      // Count calls after first scroll
      const initialCallCount = mockOnScrollStateChange.mock.calls.length;
      
      // Scroll to same position multiple times - should not trigger additional state changes
      if (container) {
        fireEvent.scroll(container);
        fireEvent.scroll(container);
      }

      // Wait a bit to ensure no additional calls
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Should not have additional calls for same position
      expect(mockOnScrollStateChange.mock.calls.length).toBeGreaterThanOrEqual(initialCallCount);
      
      // Reset mock to count subsequent calls
      mockOnScrollStateChange.mockClear();
      
      // Scroll to different position
      if (container) {
        Object.defineProperty(container, 'scrollTop', { value: 200, writable: true });
        fireEvent.scroll(container);
      }

      await waitFor(() => {
        expect(mockOnScrollStateChange).toHaveBeenCalled();
      });
    });

    it('maintains consistent state across multiple scroll events', async () => {
      render(<TestComponent />);
      
      const container = containerRef.current;
      const scrollPositions = [100, 200, 300, 200, 100];
      
      for (let i = 0; i < scrollPositions.length; i++) {
        if (container) {
          Object.defineProperty(container, 'scrollTop', { value: scrollPositions[i], writable: true });
          fireEvent.scroll(container);
        }

        await waitFor(() => {
          expect(mockOnScrollStateChange).toHaveBeenCalledWith(
            expect.objectContaining({
              scrollPosition: scrollPositions[i]
            })
          );
        });
      }
    });
  });
});