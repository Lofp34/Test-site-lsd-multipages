/**
 * Accessibility utilities for enhanced chat components
 * Implements WCAG 2.1 AA standards and ARIA best practices
 */

export interface AccessibilityConfig {
  announceNewMessages: boolean;
  highlightFocusedElements: boolean;
  reduceMotion: boolean;
  highContrastMode: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  screenReaderOptimized: boolean;
  keyboardNavigationEnabled: boolean;
  liveRegionPoliteness: 'polite' | 'assertive' | 'off';
}

export const defaultAccessibilityConfig: AccessibilityConfig = {
  announceNewMessages: true,
  highlightFocusedElements: true,
  reduceMotion: false,
  highContrastMode: false,
  fontSize: 'medium',
  screenReaderOptimized: false,
  keyboardNavigationEnabled: true,
  liveRegionPoliteness: 'polite'
};

/**
 * Detects user's system accessibility preferences
 */
export function detectSystemPreferences(): Partial<AccessibilityConfig> {
  if (typeof window === 'undefined') return {};

  const preferences: Partial<AccessibilityConfig> = {};

  // Detect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    preferences.reduceMotion = true;
  }

  // Detect high contrast preference
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    preferences.highContrastMode = true;
  }

  // Detect screen reader usage (heuristic)
  if (navigator.userAgent.includes('NVDA') || 
      navigator.userAgent.includes('JAWS') || 
      navigator.userAgent.includes('VoiceOver')) {
    preferences.screenReaderOptimized = true;
    preferences.liveRegionPoliteness = 'assertive';
  }

  return preferences;
}

/**
 * ARIA live region manager for announcing dynamic content
 */
export class LiveRegionManager {
  private politeRegion: HTMLElement | null = null;
  private assertiveRegion: HTMLElement | null = null;
  private statusRegion: HTMLElement | null = null;

  constructor() {
    this.createLiveRegions();
  }

  createLiveRegions() {
    if (typeof document === 'undefined') return;

    // Polite announcements (non-interrupting)
    this.politeRegion = document.createElement('div');
    this.politeRegion.setAttribute('aria-live', 'polite');
    this.politeRegion.setAttribute('aria-atomic', 'true');
    this.politeRegion.className = 'sr-only';
    this.politeRegion.id = 'chat-live-region-polite';
    document.body.appendChild(this.politeRegion);

    // Assertive announcements (interrupting)
    this.assertiveRegion = document.createElement('div');
    this.assertiveRegion.setAttribute('aria-live', 'assertive');
    this.assertiveRegion.setAttribute('aria-atomic', 'true');
    this.assertiveRegion.className = 'sr-only';
    this.assertiveRegion.id = 'chat-live-region-assertive';
    document.body.appendChild(this.assertiveRegion);

    // Status announcements
    this.statusRegion = document.createElement('div');
    this.statusRegion.setAttribute('role', 'status');
    this.statusRegion.setAttribute('aria-atomic', 'true');
    this.statusRegion.className = 'sr-only';
    this.statusRegion.id = 'chat-status-region';
    document.body.appendChild(this.statusRegion);
  }

  /**
   * Announce message to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' | 'status' = 'polite') {
    const region = priority === 'assertive' ? this.assertiveRegion :
                   priority === 'status' ? this.statusRegion : this.politeRegion;
    
    if (region) {
      // Clear and set new message
      region.textContent = '';
      setTimeout(() => {
        region.textContent = message;
      }, 100);
    }
  }

  /**
   * Announce new chat message
   */
  announceNewMessage(role: 'user' | 'assistant', content: string, isStreaming = false) {
    const roleText = role === 'user' ? 'Vous avez dit' : 'Assistant répond';
    const streamingText = isStreaming ? ' (en cours de génération)' : '';
    const truncatedContent = content.length > 100 ? 
      content.substring(0, 100) + '...' : content;
    
    this.announce(`${roleText}: ${truncatedContent}${streamingText}`, 'polite');
  }

  /**
   * Announce streaming status changes
   */
  announceStreamingStatus(status: 'started' | 'completed' | 'error') {
    const messages = {
      started: 'L\'assistant commence à répondre',
      completed: 'Réponse de l\'assistant terminée',
      error: 'Erreur lors de la génération de la réponse'
    };
    
    this.announce(messages[status], 'status');
  }

  /**
   * Announce scroll position changes
   */
  announceScrollPosition(position: 'top' | 'bottom' | 'middle') {
    const messages = {
      top: 'Début de la conversation',
      bottom: 'Fin de la conversation',
      middle: 'Milieu de la conversation'
    };
    
    this.announce(messages[position], 'polite');
  }

  /**
   * Clean up live regions
   */
  destroy() {
    [this.politeRegion, this.assertiveRegion, this.statusRegion].forEach(region => {
      if (region && region.parentNode) {
        region.parentNode.removeChild(region);
      }
    });
  }
}

/**
 * Keyboard navigation manager
 */
export class KeyboardNavigationManager {
  private focusableElements: HTMLElement[] = [];
  private currentFocusIndex = -1;
  private container: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.updateFocusableElements();
    this.setupKeyboardListeners();
  }

  updateFocusableElements() {
    if (!this.container) return;

    const selector = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]:not([disabled])',
      '[role="link"]',
      '[role="menuitem"]'
    ].join(', ');

    this.focusableElements = Array.from(
      this.container.querySelectorAll(selector)
    ) as HTMLElement[];
  }

  setupKeyboardListeners() {
    if (!this.container) return;

    this.container.addEventListener('keydown', (event) => {
      this.handleKeyDown(event);
    });

    // Update focusable elements when DOM changes
    const observer = new MutationObserver(() => {
      this.updateFocusableElements();
    });

    observer.observe(this.container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'tabindex', 'aria-hidden']
    });
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Tab':
        this.handleTabNavigation(event);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        if (event.ctrlKey || event.metaKey) {
          this.handleVerticalNavigation(event);
        }
        break;
      case 'Home':
        if (event.ctrlKey || event.metaKey) {
          this.focusFirst();
          event.preventDefault();
        }
        break;
      case 'End':
        if (event.ctrlKey || event.metaKey) {
          this.focusLast();
          event.preventDefault();
        }
        break;
      case 'Escape':
        this.handleEscape(event);
        break;
    }
  }

  handleTabNavigation(event: KeyboardEvent) {
    if (this.focusableElements.length === 0) return;

    const activeElement = document.activeElement as HTMLElement;
    const currentIndex = this.focusableElements.indexOf(activeElement);

    if (event.shiftKey) {
      // Shift+Tab - previous element
      const prevIndex = currentIndex <= 0 ? 
        this.focusableElements.length - 1 : currentIndex - 1;
      this.focusableElements[prevIndex]?.focus();
    } else {
      // Tab - next element
      const nextIndex = currentIndex >= this.focusableElements.length - 1 ? 
        0 : currentIndex + 1;
      this.focusableElements[nextIndex]?.focus();
    }

    event.preventDefault();
  }

  handleVerticalNavigation(event: KeyboardEvent) {
    // Scroll to top/bottom of chat
    if (!this.container) return;

    const scrollContainer = this.container.querySelector('[data-scroll-container]') as HTMLElement;
    if (!scrollContainer) return;

    if (event.key === 'ArrowUp') {
      scrollContainer.scrollTop = 0;
    } else {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }

    event.preventDefault();
  }

  handleEscape(event: KeyboardEvent) {
    // Emit escape event for parent components to handle
    const escapeEvent = new CustomEvent('chat-escape', {
      bubbles: true,
      cancelable: true
    });
    
    this.container?.dispatchEvent(escapeEvent);
  }

  focusFirst() {
    this.focusableElements[0]?.focus();
  }

  focusLast() {
    this.focusableElements[this.focusableElements.length - 1]?.focus();
  }

  /**
   * Focus specific element by role or data attribute
   */
  focusElement(selector: string) {
    const element = this.container?.querySelector(selector) as HTMLElement;
    element?.focus();
  }

  /**
   * Get current focus index
   */
  getCurrentFocusIndex(): number {
    const activeElement = document.activeElement as HTMLElement;
    return this.focusableElements.indexOf(activeElement);
  }

  destroy() {
    // Cleanup is handled by garbage collection
  }
}

/**
 * Focus management utilities
 */
export class FocusManager {
  private focusStack: HTMLElement[] = [];

  /**
   * Save current focus and set new focus
   */
  pushFocus(element: HTMLElement) {
    const currentFocus = document.activeElement as HTMLElement;
    if (currentFocus && currentFocus !== document.body) {
      this.focusStack.push(currentFocus);
    }
    element.focus();
  }

  /**
   * Restore previous focus
   */
  popFocus() {
    const previousFocus = this.focusStack.pop();
    if (previousFocus) {
      previousFocus.focus();
    }
  }

  /**
   * Create focus trap for modal dialogs
   */
  createFocusTrap(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll(
      'button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }
}

/**
 * ARIA attributes helper
 */
export const AriaHelper = {
  /**
   * Generate unique ID for ARIA relationships
   */
  generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Set ARIA attributes for chat message
   */
  setChatMessageAttributes(element: HTMLElement, role: 'user' | 'assistant', timestamp: Date) {
    element.setAttribute('role', 'article');
    element.setAttribute('aria-label', `Message de ${role === 'user' ? 'l\'utilisateur' : 'l\'assistant'} à ${timestamp.toLocaleTimeString()}`);
    element.setAttribute('data-message-role', role);
    element.setAttribute('data-timestamp', timestamp.toISOString());
  },

  /**
   * Set ARIA attributes for streaming content
   */
  setStreamingAttributes(element: HTMLElement, isStreaming: boolean) {
    element.setAttribute('aria-live', isStreaming ? 'polite' : 'off');
    element.setAttribute('aria-busy', isStreaming.toString());
    
    if (isStreaming) {
      element.setAttribute('aria-label', 'Contenu en cours de génération');
    } else {
      element.removeAttribute('aria-label');
    }
  },

  /**
   * Set ARIA attributes for scroll container
   */
  setScrollContainerAttributes(element: HTMLElement) {
    element.setAttribute('role', 'log');
    element.setAttribute('aria-label', 'Historique de conversation');
    element.setAttribute('aria-live', 'polite');
    element.setAttribute('data-scroll-container', 'true');
  },

  /**
   * Set ARIA attributes for control buttons
   */
  setControlButtonAttributes(element: HTMLElement, action: string, state?: boolean) {
    element.setAttribute('role', 'button');
    element.setAttribute('aria-label', this.getButtonLabel(action, state));
    
    if (typeof state === 'boolean') {
      element.setAttribute('aria-pressed', state.toString());
    }
  },

  getButtonLabel(action: string, state?: boolean): string {
    const labels: Record<string, string> = {
      close: 'Fermer le chat',
      minimize: state ? 'Restaurer le chat' : 'Réduire le chat',
      fullscreen: state ? 'Quitter le plein écran' : 'Passer en plein écran',
      scrollToBottom: 'Aller à la fin de la conversation',
      scrollToTop: 'Aller au début de la conversation'
    };
    
    return labels[action] || action;
  }
};

/**
 * Accessibility validation utilities
 */
export const AccessibilityValidator = {
  /**
   * Check if element has proper ARIA labels
   */
  validateAriaLabels(element: HTMLElement): string[] {
    const issues: string[] = [];
    
    // Check for missing aria-label on interactive elements
    if (this.isInteractive(element) && !this.hasAccessibleName(element)) {
      issues.push('Interactive element missing accessible name');
    }
    
    // Check for proper role usage
    const role = element.getAttribute('role');
    if (role && !this.isValidRole(role)) {
      issues.push(`Invalid ARIA role: ${role}`);
    }
    
    return issues;
  },

  /**
   * Check color contrast ratios
   */
  validateColorContrast(element: HTMLElement): boolean {
    const styles = window.getComputedStyle(element);
    const backgroundColor = styles.backgroundColor;
    const color = styles.color;
    
    // This is a simplified check - in production, use a proper contrast calculation library
    return backgroundColor !== 'transparent' && color !== 'transparent';
  },

  /**
   * Check keyboard accessibility
   */
  validateKeyboardAccess(element: HTMLElement): string[] {
    const issues: string[] = [];
    
    if (this.isInteractive(element)) {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex === '-1' && !element.hasAttribute('aria-hidden')) {
        issues.push('Interactive element not keyboard accessible');
      }
    }
    
    return issues;
  },

  isInteractive(element: HTMLElement): boolean {
    const interactiveTags = ['button', 'input', 'textarea', 'select', 'a'];
    const interactiveRoles = ['button', 'link', 'menuitem', 'tab'];
    
    return interactiveTags.includes(element.tagName.toLowerCase()) ||
           interactiveRoles.includes(element.getAttribute('role') || '') ||
           element.hasAttribute('onclick') ||
           element.hasAttribute('tabindex');
  },

  hasAccessibleName(element: HTMLElement): boolean {
    return !!(
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.getAttribute('title') ||
      element.textContent?.trim()
    );
  },

  isValidRole(role: string): boolean {
    const validRoles = [
      'button', 'link', 'menuitem', 'tab', 'tabpanel', 'dialog', 'alertdialog',
      'article', 'banner', 'complementary', 'contentinfo', 'form', 'main',
      'navigation', 'region', 'search', 'alert', 'log', 'status', 'timer'
    ];
    
    return validRoles.includes(role);
  }
};