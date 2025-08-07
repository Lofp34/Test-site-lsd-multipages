import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import EnhancedChatWidget from '../EnhancedChatWidget';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import { useMobilePerformance } from '@/hooks/useMobilePerformance';
import { useEnhancedGeminiChat } from '@/hooks/useEnhancedGeminiChat';
import { useChatPreferences } from '@/lib/chat/preferences';

// Mock all the hooks
vi.mock('@/hooks/useMobileOptimization');
vi.mock('@/hooks/useMobilePerformance');
vi.mock('@/hooks/useEnhancedGeminiChat');
vi.mock('@/hooks/useEnhancedChatHistory');
vi.mock('@/hooks/useEnhancedMultimodalChat');
vi.mock('@/lib/chat/preferences');
vi.mock('@/lib/gemini/privacy-manager');
vi.mock('@/lib/gemini/cookie-free-mode');
vi.mock('@/styles/mobile-chat.css', () => ({}));

const mockUseMobileOptimization = vi.mocked(useMobileOptimization);
const mockUseMobilePerformance = vi.mocked(useMobilePerformance);
const mockUseEnhancedGeminiChat = vi.mocked(useEnhancedGeminiChat);
const mockUseChatPreferences = vi.mocked(useChatPreferences);

describe('Mobile Experience Validation', () => {
  const mockMobileState = {
    isMobile: true,
    isTablet: false,
    isKeyboardVisible: false,
    orientation: 'portrait' as const,
    screenHeight: 800,
    viewportHeight: 800,
    touchGesture: null,
    getChatPosition: () => ({ bottom: '20px', right: '16px', left: '16px' }),
    getChatSize: () => ({ width: '100%', height: '60vh', maxHeight: '500px' }),
    getMobileClasses: (base: string, mobile: string) => `${base} ${mobile}`,
    onSwipeUp: vi.fn(),
    onSwipeDown: vi.fn(),
    onSwipeLeft: vi.fn(),
    onSwipeRight: vi.fn()
  };

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

  const mockChatState = {
    messages: [
      {
        id: '1',
        content: 'Hello, how can I help you?',
        role: 'assistant' as const,
        timestamp: new Date(),
        isMarkdown: true,
        renderingState: 'complete' as const,
        metadata: {
          hasCode: false,
          hasTables: false,
          hasLinks: false,
          renderTime: 50
        }
      }
    ],
    isStreaming: false,
    streamingMessage: '',
    sendMessage: vi.fn(),
    error: null,
    clearError: vi.fn(),
    retryLastOperation: vi.fn(),
    isRecovering: false,
    recoveryAction: null,
    toggleMarkdown: vi.fn(),
    toggleAutoScroll: vi.fn(),
    toggleKeyboardShortcuts: vi.fn(),
    getConversationMetrics: () => ({ messageCount: 1, totalTokens: 100 }),
    exportConversation: vi.fn(),
    importConversation: vi.fn()
  };

  const mockPreferences = {
    markdownEnabled: true,
    autoScrollEnabled: true,
    keyboardShortcutsEnabled: true,
    theme: 'auto' as const,
    fontSize: 'medium' as const,
    reducedMotion: false,
    saveToLocalStorage: true,
    sessionTimeout: 30
  };

  beforeEach(() => {
    mockUseMobileOptimization.mockReturnValue(mockMobileState);
    mockUseMobilePerformance.mockReturnValue(mockPerformanceState);
    mockUseEnhancedGeminiChat.mockReturnValue(mockChatState);
    mockUseChatPreferences.mockReturnValue({
      preferences: mockPreferences,
      updatePreferences: vi.fn(),
      scrollConfig: {},
      markdownConfig: {},
      keyboardShortcuts: {}
    });

    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn()
    }));

    // Mock ResizeObserver
    global.ResizeObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn()
    }));

    // Mock navigator APIs
    Object.defineProperty(navigator, 'vibrate', {
      value: vi.fn(),
      configurable: true
    });

    Object.defineProperty(navigator, 'onLine', {
      value: true,
      configurable: true
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Mobile Interface Adaptation', () => {
    it('should render mobile-optimized chat button', () => {
      render(<EnhancedChatWidget />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      expect(chatButton).toBeInTheDocument();
      
      // Should have mobile classes
      expect(chatButton.parentElement).toHaveClass('mobile-touch-target');
    });

    it('should adapt to portrait orientation', () => {
      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should apply mobile positioning
      const chatContainer = screen.getByText('Laurent Serre').closest('[data-orientation]');
      expect(chatContainer).toHaveAttribute('data-orientation', 'portrait');
    });

    it('should adapt to landscape orientation', () => {
      mockUseMobileOptimization.mockReturnValue({
        ...mockMobileState,
        orientation: 'landscape',
        getChatSize: () => ({ width: '100%', height: '70vh', maxHeight: '400px' })
      });

      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should adapt to landscape
      const chatContainer = screen.getByText('Laurent Serre').closest('[data-orientation]');
      expect(chatContainer).toHaveAttribute('data-orientation', 'landscape');
    });

    it('should handle keyboard visibility', () => {
      mockUseMobileOptimization.mockReturnValue({
        ...mockMobileState,
        isKeyboardVisible: true,
        viewportHeight: 400 // Reduced height indicates keyboard
      });

      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should detect keyboard
      const keyboardContainer = screen.getByText('Laurent Serre').closest('[data-keyboard-visible]');
      expect(keyboardContainer).toHaveAttribute('data-keyboard-visible', 'true');
    });

    it('should provide touch targets of minimum 44px', () => {
      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Check control buttons
      const closeButton = screen.getByLabelText('Fermer le chat');
      expect(closeButton.parentElement).toHaveClass('min-w-[44px]', 'min-h-[44px]');
    });
  });

  describe('Touch Gesture Support', () => {
    it('should handle swipe gestures', async () => {
      const onSwipeDown = vi.fn();
      mockUseMobileOptimization.mockReturnValue({
        ...mockMobileState,
        onSwipeDown
      });

      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Simulate swipe down
      const chatContainer = screen.getByText('Laurent Serre').closest('.mobile-chat-container');
      
      fireEvent.touchStart(chatContainer!, {
        touches: [{ clientX: 100, clientY: 100 }]
      });
      
      fireEvent.touchMove(chatContainer!, {
        touches: [{ clientX: 100, clientY: 200 }]
      });
      
      fireEvent.touchEnd(chatContainer!, {
        changedTouches: [{ clientX: 100, clientY: 200 }]
      });
      
      // Should trigger swipe handler
      expect(onSwipeDown).toHaveBeenCalled();
    });

    it('should provide haptic feedback', () => {
      render(<EnhancedChatWidget />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      
      // Simulate touch
      fireEvent.touchStart(chatButton, {
        touches: [{ clientX: 100, clientY: 100 }]
      });
      
      // Should trigger vibration
      expect(navigator.vibrate).toHaveBeenCalledWith([10]);
    });
  });

  describe('Performance Optimization', () => {
    it('should show connection speed indicator for slow connections', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        isSlowConnection: true,
        connectionInfo: {
          ...mockPerformanceState.connectionInfo,
          effectiveType: '2g'
        }
      });

      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should show slow connection indicator
      expect(screen.getByText('Connexion lente')).toBeInTheDocument();
    });

    it('should show battery optimizer for low battery', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        isLowBattery: true,
        batteryInfo: {
          ...mockPerformanceState.batteryInfo!,
          level: 0.15
        }
      });

      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should show low battery indicator
      expect(screen.getByText('Batterie faible')).toBeInTheDocument();
    });

    it('should use lazy loading for heavy content', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        shouldLazyLoad: true,
        shouldLimitMarkdown: true
      });

      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should use lazy loading
      expect(document.querySelector('[data-performance-optimized="true"]')).toBeInTheDocument();
    });

    it('should measure performance metrics', () => {
      const measurePerformance = vi.fn((name, fn) => fn());
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        measurePerformance
      });

      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should measure performance
      expect(measurePerformance).toHaveBeenCalled();
    });
  });

  describe('Accessibility on Mobile', () => {
    it('should maintain focus management', () => {
      render(<EnhancedChatWidget />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      
      // Should be focusable
      chatButton.focus();
      expect(document.activeElement).toBe(chatButton);
    });

    it('should provide ARIA labels for mobile elements', () => {
      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Check ARIA labels
      expect(screen.getByLabelText('Fermer le chat')).toBeInTheDocument();
      expect(screen.getByLabelText('Réduire')).toBeInTheDocument();
    });

    it('should support screen reader announcements', () => {
      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should have live region for streaming
      const liveRegion = document.querySelector('[aria-live]');
      expect(liveRegion).toBeInTheDocument();
    });

    it('should respect reduced motion preferences', () => {
      mockUseChatPreferences.mockReturnValue({
        preferences: {
          ...mockPreferences,
          reducedMotion: true
        },
        updatePreferences: vi.fn(),
        scrollConfig: {},
        markdownConfig: {},
        keyboardShortcuts: {}
      });

      render(<EnhancedChatWidget />);
      
      // Should apply reduced motion
      expect(document.body).toHaveClass('reduce-motion');
    });
  });

  describe('Cross-Browser Compatibility', () => {
    it('should work without modern APIs', () => {
      // Remove modern APIs
      delete (global as any).IntersectionObserver;
      delete (navigator as any).vibrate;
      delete (navigator as any).getBattery;

      render(<EnhancedChatWidget />);
      
      // Should still render
      expect(screen.getByLabelText('Ouvrir le chat Laurent Serre')).toBeInTheDocument();
    });

    it('should handle touch events gracefully', () => {
      // Mock touch events not supported
      const originalTouchStart = HTMLElement.prototype.addEventListener;
      HTMLElement.prototype.addEventListener = vi.fn((event, handler) => {
        if (event.startsWith('touch')) {
          throw new Error('Touch events not supported');
        }
        return originalTouchStart.call(this, event, handler);
      });

      render(<EnhancedChatWidget />);
      
      // Should still render without touch support
      expect(screen.getByLabelText('Ouvrir le chat Laurent Serre')).toBeInTheDocument();
      
      // Restore
      HTMLElement.prototype.addEventListener = originalTouchStart;
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        isOffline: true
      });

      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should show offline indicator
      expect(screen.getByText('Hors ligne')).toBeInTheDocument();
    });

    it('should recover from rendering errors', () => {
      // Mock rendering error
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      mockUseEnhancedGeminiChat.mockReturnValue({
        ...mockChatState,
        error: {
          type: 'RENDER_ERROR',
          message: 'Rendering failed',
          userMessage: 'Une erreur est survenue lors du rendu'
        }
      });

      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should show error message
      expect(screen.getByText('Une erreur est survenue lors du rendu')).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });

    it('should provide fallback for failed optimizations', () => {
      // Mock optimization failure
      mockUseMobilePerformance.mockReturnValue({
        ...mockPerformanceState,
        optimizeForBattery: vi.fn(() => { throw new Error('Optimization failed'); }),
        optimizeForConnection: vi.fn(() => { throw new Error('Optimization failed'); })
      });

      render(<EnhancedChatWidget />);
      
      // Should still render
      expect(screen.getByLabelText('Ouvrir le chat Laurent Serre')).toBeInTheDocument();
    });
  });

  describe('Performance Benchmarks', () => {
    it('should render within performance budget', async () => {
      const startTime = performance.now();
      
      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByText('Laurent Serre')).toBeInTheDocument();
      });
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render within 100ms budget
      expect(renderTime).toBeLessThan(100);
    });

    it('should handle large message volumes efficiently', async () => {
      const manyMessages = Array.from({ length: 100 }, (_, i) => ({
        id: `msg-${i}`,
        content: `Message ${i} with some content`,
        role: 'assistant' as const,
        timestamp: new Date(),
        isMarkdown: false,
        renderingState: 'complete' as const,
        metadata: {}
      }));

      mockUseEnhancedGeminiChat.mockReturnValue({
        ...mockChatState,
        messages: manyMessages
      });

      const startTime = performance.now();
      
      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByText('Message 0 with some content')).toBeInTheDocument();
      });
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should handle large volumes within reasonable time
      expect(renderTime).toBeLessThan(500);
    });
  });

  describe('User Experience Flows', () => {
    it('should complete full conversation flow', async () => {
      const sendMessage = vi.fn();
      mockUseEnhancedGeminiChat.mockReturnValue({
        ...mockChatState,
        sendMessage
      });

      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Should show chat interface
      expect(screen.getByText('Laurent Serre')).toBeInTheDocument();
      
      // Type and send message
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Hello' } });
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      fireEvent.click(sendButton);
      
      // Should send message
      expect(sendMessage).toHaveBeenCalledWith('Hello', undefined);
    });

    it('should handle minimize and restore flow', () => {
      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Minimize
      const minimizeButton = screen.getByLabelText('Réduire');
      fireEvent.click(minimizeButton);
      
      // Should be minimized
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      
      // Restore
      const restoreButton = screen.getByLabelText('Agrandir');
      fireEvent.click(restoreButton);
      
      // Should be restored
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should handle close and reopen flow', () => {
      render(<EnhancedChatWidget />);
      
      // Open chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);
      
      // Close
      const closeButton = screen.getByLabelText('Fermer le chat');
      fireEvent.click(closeButton);
      
      // Should be closed
      expect(screen.queryByText('Laurent Serre')).not.toBeInTheDocument();
      
      // Should show reopen button
      expect(screen.getByLabelText('Ouvrir le chat Laurent Serre')).toBeInTheDocument();
    });
  });
});