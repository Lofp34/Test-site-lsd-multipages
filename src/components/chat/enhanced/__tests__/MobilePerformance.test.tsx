import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import LazyMarkdownRenderer from '../LazyMarkdownRenderer';
import ConnectionSpeedIndicator from '../ConnectionSpeedIndicator';
import BatteryOptimizer from '../BatteryOptimizer';
import { useMobilePerformance } from '@/hooks/useMobilePerformance';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

// Mock the hooks
vi.mock('@/hooks/useMobilePerformance');
vi.mock('@/hooks/useMobileOptimization');

const mockUseMobilePerformance = vi.mocked(useMobilePerformance);
const mockUseMobileOptimization = vi.mocked(useMobileOptimization);

describe('Mobile Performance Components', () => {
  const mockPerformanceState = {
    connectionInfo: {
      effectiveType: '4g' as const,
      downlink: 10,
      rtt: 50,
      saveData: false
    },
    isSlowConnection: false,
    isOffline: false,
    batteryInfo: {
      level: 0.8,
      charging: false,
      chargingTime: Infinity,
      dischargingTime: 7200
    },
    isLowBattery: false,
    shouldEnergySave: false,
    performanceMetrics: {
      memoryUsage: 0.3,
      renderTime: 10,
      scrollPerformance: 60,
      networkLatency: 100
    },
    shouldLazyLoad: false,
    shouldReduceAnimations: false,
    shouldCompressImages: false,
    shouldLimitMarkdown: false,
    optimizeForConnection: vi.fn(),
    optimizeForBattery: vi.fn(),
    measurePerformance: vi.fn((name, fn) => fn()),
    getOptimizedConfig: () => ({
      maxMessageLength: 5000,
      enableSyntaxHighlighting: true,
      enableAnimations: true,
      imageQuality: 'high' as const,
      lazyLoadThreshold: 300,
      debounceDelay: 200
    })
  };

  const mockMobileState = {
    isMobile: true,
    isTablet: false,
    isKeyboardVisible: false,
    orientation: 'portrait' as const,
    screenHeight: 800,
    viewportHeight: 800,
    touchGesture: null,
    getChatPosition: () => ({ bottom: '20px', right: '16px' }),
    getChatSize: () => ({ width: '320px', height: '480px' }),
    getMobileClasses: (base: string, mobile: string) => `${base} ${mobile}`,
    onSwipeUp: vi.fn(),
    onSwipeDown: vi.fn(),
    onSwipeLeft: vi.fn(),
    onSwipeRight: vi.fn()
  };

  beforeEach(() => {
    mockUseMobilePerformance.mockReturnValue(mockPerformanceState);
    mockUseMobileOptimization.mockReturnValue(mockMobileState);
    
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn()
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('LazyMarkdownRenderer', () => {
    it('should render content immediately when not lazy loading', async () => {
      render(
        <LazyMarkdownRenderer 
          content="# Test Content\n\nThis is a test."
          priority="high"
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText('This is a test.')).toBeInTheDocument();
      });
    });

    it('should show loading placeholder when lazy loading', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        shouldLazyLoad: true
      });

      render(
        <LazyMarkdownRenderer 
          content="# Test Content\n\nThis is a test."
          priority="low"
        />
      );
      
      // Should show loading placeholder
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('should split long content into chunks', () => {
      const longContent = 'A'.repeat(6000); // Longer than default max
      
      render(
        <LazyMarkdownRenderer 
          content={longContent}
          maxLength={1000}
        />
      );
      
      // Should create multiple chunks
      expect(document.querySelectorAll('[data-chunk-id]')).toHaveLength.greaterThan(1);
    });

    it('should use plain text when markdown is limited', async () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        shouldLimitMarkdown: true,
        getOptimizedConfig: () => ({
          ...mockPerformanceState.getOptimizedConfig(),
          enableSyntaxHighlighting: false
        })
      });

      render(
        <LazyMarkdownRenderer 
          content="# Test Content\n\nThis is a test."
        />
      );
      
      await waitFor(() => {
        // Should render as plain text, not markdown
        expect(screen.getByText('# Test Content\n\nThis is a test.')).toBeInTheDocument();
      });
    });

    it('should call onRenderComplete when finished', async () => {
      const onRenderComplete = vi.fn();
      
      render(
        <LazyMarkdownRenderer 
          content="Test content"
          onRenderComplete={onRenderComplete}
        />
      );
      
      await waitFor(() => {
        expect(onRenderComplete).toHaveBeenCalled();
      });
    });
  });

  describe('ConnectionSpeedIndicator', () => {
    it('should show connection status', () => {
      render(<ConnectionSpeedIndicator showDetails={true} />);
      
      expect(screen.getByText('4G')).toBeInTheDocument();
      expect(screen.getByText('10.0 Mbps • 50ms')).toBeInTheDocument();
    });

    it('should indicate slow connection', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        isSlowConnection: true,
        connectionInfo: {
          ...mockPerformanceState.connectionInfo,
          effectiveType: '2g'
        }
      });

      render(<ConnectionSpeedIndicator showDetails={true} />);
      
      expect(screen.getByText('2G')).toBeInTheDocument();
      expect(document.querySelector('.bg-red-500')).toBeInTheDocument();
    });

    it('should show offline status', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        isOffline: true
      });

      render(<ConnectionSpeedIndicator showDetails={true} />);
      
      expect(screen.getByText('Hors ligne')).toBeInTheDocument();
      expect(document.querySelector('.bg-red-500')).toBeInTheDocument();
    });

    it('should show optimization suggestions for slow connections', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        isSlowConnection: true,
        shouldCompressImages: true,
        getOptimizedConfig: () => ({
          ...mockPerformanceState.getOptimizedConfig(),
          enableSyntaxHighlighting: false,
          enableAnimations: false
        })
      });

      render(<ConnectionSpeedIndicator showDetails={true} />);
      
      expect(screen.getByText('Images compressées')).toBeInTheDocument();
      expect(screen.getByText('Coloration syntaxique désactivée')).toBeInTheDocument();
      expect(screen.getByText('Animations réduites')).toBeInTheDocument();
    });

    it('should call onSpeedChange when speed category changes', () => {
      const onSpeedChange = vi.fn();
      
      render(<ConnectionSpeedIndicator onSpeedChange={onSpeedChange} />);
      
      expect(onSpeedChange).toHaveBeenCalledWith('fast');
    });
  });

  describe('BatteryOptimizer', () => {
    it('should show battery status', () => {
      render(<BatteryOptimizer />);
      
      expect(screen.getByText('80%')).toBeInTheDocument();
      expect(screen.getByText('2h restantes')).toBeInTheDocument();
    });

    it('should show charging status', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        batteryInfo: {
          ...mockPerformanceState.batteryInfo!,
          charging: true
        }
      });

      render(<BatteryOptimizer />);
      
      expect(screen.getByText('En charge')).toBeInTheDocument();
      expect(screen.getByText('🔌')).toBeInTheDocument();
    });

    it('should activate optimization for low battery', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        isLowBattery: true,
        shouldEnergySave: true,
        batteryInfo: {
          ...mockPerformanceState.batteryInfo!,
          level: 0.15
        }
      });

      render(<BatteryOptimizer autoOptimize={true} />);
      
      expect(screen.getByText('Économie ON')).toBeInTheDocument();
      expect(screen.getByText('Mode économie d\'énergie actif')).toBeInTheDocument();
    });

    it('should show optimization details when active', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        shouldEnergySave: true
      });

      render(<BatteryOptimizer autoOptimize={true} />);
      
      expect(screen.getByText('✓ Animations réduites')).toBeInTheDocument();
      expect(screen.getByText('✓ Tâches en arrière-plan limitées')).toBeInTheDocument();
    });

    it('should show low battery warning', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        isLowBattery: true,
        shouldEnergySave: true,
        batteryInfo: {
          ...mockPerformanceState.batteryInfo!,
          level: 0.1
        }
      });

      render(<BatteryOptimizer autoOptimize={true} />);
      
      expect(screen.getByText('⚠️ Batterie faible - Optimisations maximales activées')).toBeInTheDocument();
    });

    it('should call onOptimizationChange when optimization state changes', () => {
      const onOptimizationChange = vi.fn();
      
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        shouldEnergySave: true
      });

      render(<BatteryOptimizer onOptimizationChange={onOptimizationChange} autoOptimize={true} />);
      
      expect(onOptimizationChange).toHaveBeenCalledWith(true);
    });

    it('should not show on desktop', () => {
      mockUseMobileOptimization.mockReturnValue({
        ...mockMobileState,
        isMobile: false
      });

      const { container } = render(<BatteryOptimizer />);
      
      expect(container.firstChild).toBeNull();
    });

    it('should not show when battery API is unavailable', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        batteryInfo: null
      });

      const { container } = render(<BatteryOptimizer />);
      
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Performance Integration', () => {
    it('should measure performance for operations', () => {
      const measurePerformance = vi.fn((name, fn) => fn());
      
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        measurePerformance
      });

      const onRenderComplete = vi.fn();
      
      render(
        <LazyMarkdownRenderer 
          content="Test content"
          onRenderComplete={onRenderComplete}
        />
      );
      
      // Should measure performance when render completes
      expect(measurePerformance).toHaveBeenCalled();
    });

    it('should adapt to connection speed changes', () => {
      const { rerender } = render(<ConnectionSpeedIndicator />);
      
      // Change to slow connection
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        isSlowConnection: true,
        connectionInfo: {
          ...mockPerformanceState.connectionInfo,
          effectiveType: '2g'
        }
      });
      
      rerender(<ConnectionSpeedIndicator />);
      
      expect(document.querySelector('.bg-red-500')).toBeInTheDocument();
    });

    it('should optimize for both battery and connection', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        isSlowConnection: true,
        isLowBattery: true,
        shouldEnergySave: true,
        shouldLazyLoad: true,
        shouldLimitMarkdown: true,
        getOptimizedConfig: () => ({
          maxMessageLength: 1000,
          enableSyntaxHighlighting: false,
          enableAnimations: false,
          imageQuality: 'low' as const,
          lazyLoadThreshold: 100,
          debounceDelay: 500
        })
      });

      render(
        <div>
          <ConnectionSpeedIndicator showDetails={true} />
          <BatteryOptimizer autoOptimize={true} />
          <LazyMarkdownRenderer content="Test content" />
        </div>
      );
      
      // Should show both optimizations
      expect(screen.getByText('Images compressées')).toBeInTheDocument();
      expect(screen.getByText('Mode économie d\'énergie actif')).toBeInTheDocument();
    });
  });
});