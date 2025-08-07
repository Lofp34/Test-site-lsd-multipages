import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import MobileTouchHandler from '../MobileTouchHandler';
import MobileButton from '../MobileButton';
import MobileKeyboardHandler from '../MobileKeyboardHandler';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

// Mock the mobile optimization hook
vi.mock('@/hooks/useMobileOptimization');
const mockUseMobileOptimization = vi.mocked(useMobileOptimization);

// Mock CSS import
vi.mock('@/styles/mobile-chat.css', () => ({}));

describe('Mobile Touch Interface Components', () => {
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
    mockUseMobileOptimization.mockReturnValue(mockMobileState);
    
    // Mock navigator.vibrate
    Object.defineProperty(navigator, 'vibrate', {
      value: vi.fn(),
      configurable: true
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('MobileTouchHandler', () => {
    it('should render children correctly on mobile', () => {
      render(
        <MobileTouchHandler>
          <div>Touch content</div>
        </MobileTouchHandler>
      );
      
      expect(screen.getByText('Touch content')).toBeInTheDocument();
    });

    it('should handle tap gestures', async () => {
      const onTap = vi.fn();
      
      render(
        <MobileTouchHandler onTap={onTap}>
          <button>Tap me</button>
        </MobileTouchHandler>
      );
      
      const button = screen.getByText('Tap me');
      
      // Simulate touch events
      fireEvent.touchStart(button, {
        touches: [{ clientX: 100, clientY: 100 }]
      });
      
      fireEvent.touchEnd(button, {
        changedTouches: [{ clientX: 100, clientY: 100 }]
      });
      
      await waitFor(() => {
        expect(onTap).toHaveBeenCalled();
      });
    });

    it('should handle swipe gestures', async () => {
      const onSwipeRight = vi.fn();
      
      render(
        <MobileTouchHandler onSwipeRight={onSwipeRight}>
          <div>Swipe area</div>
        </MobileTouchHandler>
      );
      
      const swipeArea = screen.getByText('Swipe area');
      
      // Simulate swipe right
      fireEvent.touchStart(swipeArea, {
        touches: [{ clientX: 100, clientY: 100 }]
      });
      
      fireEvent.touchMove(swipeArea, {
        touches: [{ clientX: 200, clientY: 100 }]
      });
      
      fireEvent.touchEnd(swipeArea, {
        changedTouches: [{ clientX: 200, clientY: 100 }]
      });
      
      await waitFor(() => {
        expect(onSwipeRight).toHaveBeenCalled();
      });
    });

    it('should handle long press gestures', async () => {
      const onLongPress = vi.fn();
      
      render(
        <MobileTouchHandler onLongPress={onLongPress} longPressThreshold={100}>
          <div>Long press area</div>
        </MobileTouchHandler>
      );
      
      const longPressArea = screen.getByText('Long press area');
      
      // Start touch
      fireEvent.touchStart(longPressArea, {
        touches: [{ clientX: 100, clientY: 100 }]
      });
      
      // Wait for long press threshold
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 150));
      });
      
      expect(onLongPress).toHaveBeenCalled();
    });

    it('should provide haptic feedback', () => {
      const onTap = vi.fn();
      
      render(
        <MobileTouchHandler onTap={onTap} enableHapticFeedback={true}>
          <button>Haptic button</button>
        </MobileTouchHandler>
      );
      
      const button = screen.getByText('Haptic button');
      
      fireEvent.touchStart(button, {
        touches: [{ clientX: 100, clientY: 100 }]
      });
      
      // Check if vibrate was called
      expect(navigator.vibrate).toHaveBeenCalledWith([10]);
    });

    it('should not apply touch handling on desktop', () => {
      mockUseMobileOptimization.mockReturnValue({
        ...mockMobileState,
        isMobile: false
      });
      
      render(
        <MobileTouchHandler>
          <div>Desktop content</div>
        </MobileTouchHandler>
      );
      
      const content = screen.getByText('Desktop content');
      expect(content.parentElement).not.toHaveClass('mobile-touch-target');
    });
  });

  describe('MobileButton', () => {
    it('should render with mobile-optimized size', () => {
      render(
        <MobileButton size="md">
          Mobile Button
        </MobileButton>
      );
      
      const button = screen.getByText('Mobile Button');
      expect(button.parentElement).toHaveClass('min-w-[44px]', 'min-h-[44px]');
    });

    it('should handle loading state', () => {
      render(
        <MobileButton loading={true}>
          Loading Button
        </MobileButton>
      );
      
      // Should show loading spinner
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('should apply variant styles correctly', () => {
      render(
        <MobileButton variant="primary">
          Primary Button
        </MobileButton>
      );
      
      const button = screen.getByText('Primary Button');
      expect(button.parentElement).toHaveClass('bg-gradient-to-r', 'from-mint-green');
    });

    it('should handle icon prop', () => {
      const icon = <span data-testid="button-icon">🔥</span>;
      
      render(
        <MobileButton icon={icon}>
          Icon Button
        </MobileButton>
      );
      
      expect(screen.getByTestId('button-icon')).toBeInTheDocument();
      expect(screen.getByText('Icon Button')).toBeInTheDocument();
    });

    it('should provide visual feedback on press', async () => {
      const onClick = vi.fn();
      
      render(
        <MobileButton onClick={onClick} visualFeedback={true}>
          Feedback Button
        </MobileButton>
      );
      
      const button = screen.getByText('Feedback Button');
      
      // Simulate press
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(onClick).toHaveBeenCalled();
      });
    });
  });

  describe('MobileKeyboardHandler', () => {
    it('should detect keyboard visibility', () => {
      const onKeyboardShow = vi.fn();
      const onKeyboardHide = vi.fn();
      
      mockUseMobileOptimization.mockReturnValue({
        ...mockMobileState,
        isKeyboardVisible: true,
        viewportHeight: 400 // Reduced height indicates keyboard
      });
      
      render(
        <MobileKeyboardHandler 
          onKeyboardShow={onKeyboardShow}
          onKeyboardHide={onKeyboardHide}
        >
          <div>Keyboard content</div>
        </MobileKeyboardHandler>
      );
      
      expect(screen.getByText('Keyboard content')).toBeInTheDocument();
    });

    it('should handle orientation changes', () => {
      const onOrientationChange = vi.fn();
      
      render(
        <MobileKeyboardHandler onOrientationChange={onOrientationChange}>
          <div>Orientation content</div>
        </MobileKeyboardHandler>
      );
      
      // Simulate orientation change
      act(() => {
        mockUseMobileOptimization.mockReturnValue({
          ...mockMobileState,
          orientation: 'landscape'
        });
      });
      
      // Re-render to trigger effect
      render(
        <MobileKeyboardHandler onOrientationChange={onOrientationChange}>
          <div>Orientation content</div>
        </MobileKeyboardHandler>
      );
      
      expect(onOrientationChange).toHaveBeenCalledWith('landscape');
    });

    it('should apply safe area styles', () => {
      render(
        <MobileKeyboardHandler adjustLayout={true}>
          <div>Safe area content</div>
        </MobileKeyboardHandler>
      );
      
      const container = screen.getByText('Safe area content').parentElement;
      expect(container).toHaveAttribute('data-keyboard-visible', 'false');
      expect(container).toHaveAttribute('data-orientation', 'portrait');
    });

    it('should not apply mobile handling on desktop', () => {
      mockUseMobileOptimization.mockReturnValue({
        ...mockMobileState,
        isMobile: false
      });
      
      render(
        <MobileKeyboardHandler>
          <div>Desktop keyboard content</div>
        </MobileKeyboardHandler>
      );
      
      const content = screen.getByText('Desktop keyboard content');
      expect(content.parentElement).not.toHaveClass('mobile-keyboard-container');
    });
  });

  describe('Touch Target Accessibility', () => {
    it('should maintain minimum 44px touch targets', () => {
      render(
        <MobileButton size="sm">
          Small Button
        </MobileButton>
      );
      
      const button = screen.getByText('Small Button');
      const styles = window.getComputedStyle(button.parentElement!);
      
      // Should have minimum touch target size
      expect(button.parentElement).toHaveClass('min-w-[44px]', 'min-h-[44px]');
    });

    it('should prevent text selection on touch elements', () => {
      render(
        <MobileTouchHandler>
          <div>No select text</div>
        </MobileTouchHandler>
      );
      
      const element = screen.getByText('No select text').parentElement;
      expect(element).toHaveStyle({ userSelect: 'none' });
    });

    it('should disable tap highlight on mobile', () => {
      render(
        <MobileTouchHandler>
          <div>No highlight</div>
        </MobileTouchHandler>
      );
      
      const element = screen.getByText('No highlight').parentElement;
      expect(element).toHaveStyle({ WebkitTapHighlightColor: 'transparent' });
    });
  });

  describe('Performance Optimizations', () => {
    it('should use touch-action manipulation', () => {
      render(
        <MobileTouchHandler>
          <div>Touch optimized</div>
        </MobileTouchHandler>
      );
      
      const element = screen.getByText('Touch optimized').parentElement;
      expect(element).toHaveStyle({ touchAction: 'manipulation' });
    });

    it('should debounce rapid touch events', async () => {
      const onTap = vi.fn();
      
      render(
        <MobileTouchHandler onTap={onTap}>
          <button>Rapid tap</button>
        </MobileTouchHandler>
      );
      
      const button = screen.getByText('Rapid tap');
      
      // Rapid taps
      fireEvent.touchStart(button, { touches: [{ clientX: 100, clientY: 100 }] });
      fireEvent.touchEnd(button, { changedTouches: [{ clientX: 100, clientY: 100 }] });
      
      fireEvent.touchStart(button, { touches: [{ clientX: 100, clientY: 100 }] });
      fireEvent.touchEnd(button, { changedTouches: [{ clientX: 100, clientY: 100 }] });
      
      await waitFor(() => {
        // Should only register valid taps
        expect(onTap).toHaveBeenCalledTimes(2);
      });
    });
  });
});