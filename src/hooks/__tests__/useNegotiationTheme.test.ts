import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useNegotiationTheme, useNegotiationClasses } from '../useNegotiationTheme';

// Mock window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

// Mock window.addEventListener
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();
Object.defineProperty(window, 'addEventListener', {
  writable: true,
  configurable: true,
  value: mockAddEventListener,
});
Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  configurable: true,
  value: mockRemoveEventListener,
});

describe('useNegotiationTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.innerWidth = 1024; // Desktop by default
  });

  it('returns theme object', () => {
    const { result } = renderHook(() => useNegotiationTheme());
    
    expect(result.current.theme).toBeDefined();
    expect(result.current.utils).toBeDefined();
  });

  it('detects desktop screen size', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useNegotiationTheme());
    
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
  });

  it('detects mobile screen size', () => {
    window.innerWidth = 600;
    const { result } = renderHook(() => useNegotiationTheme());
    
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isTablet).toBe(false);
  });

  it('detects tablet screen size', () => {
    window.innerWidth = 800;
    const { result } = renderHook(() => useNegotiationTheme());
    
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isDesktop).toBe(false);
  });

  it('sets up resize event listener', () => {
    renderHook(() => useNegotiationTheme());
    
    expect(mockAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('determines hover effects based on mobile state', () => {
    window.innerWidth = 600; // Mobile
    const { result } = renderHook(() => useNegotiationTheme());
    
    expect(result.current.shouldDisableHoverEffects).toBeDefined();
    expect(result.current.shouldReduceAnimations).toBeDefined();
  });

  it('cleans up event listener on unmount', () => {
    const { unmount } = renderHook(() => useNegotiationTheme());
    
    unmount();
    
    expect(mockRemoveEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});

describe('useNegotiationClasses', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.innerWidth = 1024; // Desktop by default
  });

  it('provides conditional classes helper', () => {
    const { result } = renderHook(() => useNegotiationClasses());
    
    const classes = result.current.getConditionalClasses('base-class', 'hover-class', 'animation-class');
    expect(classes).toContain('base-class');
  });

  it('provides CTA classes', () => {
    const { result } = renderHook(() => useNegotiationClasses());
    
    const primaryCTA = result.current.getCTAClasses('primary');
    expect(primaryCTA).toBeDefined();
    
    const secondaryCTA = result.current.getCTAClasses('secondary');
    expect(secondaryCTA).toBeDefined();
  });

  it('provides card classes', () => {
    const { result } = renderHook(() => useNegotiationClasses());
    
    const cardClasses = result.current.getCardClasses();
    expect(cardClasses).toContain('negotiation-card');
  });

  it('provides interactive classes', () => {
    const { result } = renderHook(() => useNegotiationClasses());
    
    const interactiveClasses = result.current.getInteractiveClasses();
    expect(interactiveClasses).toContain('negotiation-interactive');
  });

  it('disables hover effects on mobile', () => {
    window.innerWidth = 600; // Mobile
    const { result } = renderHook(() => useNegotiationClasses());
    
    const cardClasses = result.current.getCardClasses();
    expect(cardClasses).toBeDefined();
  });

  it('handles card hover enablement', () => {
    const { result } = renderHook(() => useNegotiationClasses());
    
    const cardWithHover = result.current.getCardClasses(true);
    const cardWithoutHover = result.current.getCardClasses(false);
    
    expect(cardWithHover).toBeDefined();
    expect(cardWithoutHover).toBeDefined();
  });
});