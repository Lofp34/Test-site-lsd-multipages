/**
 * Accessibility enhancement utilities for resource pages
 */

// Focus management utilities
export const focusManagement = {
  // Trap focus within a container
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },

  // Restore focus to previous element
  restoreFocus: (previousElement: HTMLElement | null) => {
    if (previousElement && typeof previousElement.focus === 'function') {
      previousElement.focus();
    }
  },

  // Skip to main content
  skipToMainContent: () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

// Keyboard navigation enhancements
export const keyboardNavigation = {
  // Handle arrow key navigation for lists
  handleArrowKeyNavigation: (
    event: KeyboardEvent,
    items: NodeListOf<HTMLElement> | HTMLElement[],
    currentIndex: number,
    onIndexChange: (newIndex: number) => void
  ) => {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        event.preventDefault();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        event.preventDefault();
        break;
      case 'Home':
        newIndex = 0;
        event.preventDefault();
        break;
      case 'End':
        newIndex = items.length - 1;
        event.preventDefault();
        break;
      default:
        return;
    }

    onIndexChange(newIndex);
    (items[newIndex] as HTMLElement).focus();
  },

  // Handle Enter and Space key activation
  handleActivationKeys: (event: KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  }
};

// Screen reader announcements
export const screenReaderAnnouncements = {
  // Create live region for announcements
  createLiveRegion: (id: string = 'sr-live-region') => {
    if (document.getElementById(id)) return;

    const liveRegion = document.createElement('div');
    liveRegion.id = id;
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    
    document.body.appendChild(liveRegion);
  },

  // Announce message to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = document.getElementById('sr-live-region');
    if (!liveRegion) {
      screenReaderAnnouncements.createLiveRegion();
      return screenReaderAnnouncements.announce(message, priority);
    }

    liveRegion.setAttribute('aria-live', priority);
    liveRegion.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
};

// Color contrast and visual enhancements
export const visualEnhancements = {
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Check if user prefers high contrast
  prefersHighContrast: () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Apply high contrast mode
  applyHighContrastMode: () => {
    document.documentElement.classList.add('high-contrast');
  },

  // Remove high contrast mode
  removeHighContrastMode: () => {
    document.documentElement.classList.remove('high-contrast');
  },

  // Reduce animations if user prefers
  respectMotionPreferences: () => {
    if (visualEnhancements.prefersReducedMotion()) {
      document.documentElement.classList.add('reduce-motion');
    }
  }
};

// Form accessibility enhancements
export const formAccessibility = {
  // Associate labels with form controls
  associateLabels: (container: HTMLElement) => {
    const inputs = container.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      const id = input.id || `input-${Math.random().toString(36).substr(2, 9)}`;
      input.id = id;

      // Find associated label
      let label = container.querySelector(`label[for="${id}"]`);
      if (!label) {
        label = input.closest('label');
      }

      if (label && !label.getAttribute('for')) {
        label.setAttribute('for', id);
      }
    });
  },

  // Add error announcements
  announceFormErrors: (errors: string[]) => {
    if (errors.length > 0) {
      const errorMessage = `Erreurs de formulaire : ${errors.join(', ')}`;
      screenReaderAnnouncements.announce(errorMessage, 'assertive');
    }
  },

  // Add success announcements
  announceFormSuccess: (message: string) => {
    screenReaderAnnouncements.announce(message, 'polite');
  }
};

// Image accessibility
export const imageAccessibility = {
  // Generate descriptive alt text for decorative images
  generateAltText: (context: string, type: 'preview' | 'icon' | 'decorative') => {
    switch (type) {
      case 'preview':
        return `Aperçu de ${context}`;
      case 'icon':
        return `Icône ${context}`;
      case 'decorative':
        return '';
      default:
        return context;
    }
  },

  // Add loading states for images
  addImageLoadingStates: (img: HTMLImageElement) => {
    img.setAttribute('aria-busy', 'true');
    
    const handleLoad = () => {
      img.removeAttribute('aria-busy');
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };

    const handleError = () => {
      img.setAttribute('aria-label', 'Image non disponible');
      img.removeAttribute('aria-busy');
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
  }
};

// Initialize all accessibility enhancements
export const initializeAccessibilityEnhancements = () => {
  if (typeof window === 'undefined') return;

  // Create live region for screen reader announcements
  screenReaderAnnouncements.createLiveRegion();

  // Respect user motion preferences
  visualEnhancements.respectMotionPreferences();

  // Apply high contrast if preferred
  if (visualEnhancements.prefersHighContrast()) {
    visualEnhancements.applyHighContrastMode();
  }

  // Add skip link functionality
  const skipLink = document.querySelector('[href="#main-content"]');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      focusManagement.skipToMainContent();
    });
  }

  // Enhance form accessibility
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    formAccessibility.associateLabels(form);
  });

  // Add keyboard navigation to interactive elements
  const interactiveElements = document.querySelectorAll('[role="button"]:not(button)');
  interactiveElements.forEach((element) => {
    element.addEventListener('keydown', (e) => {
      keyboardNavigation.handleActivationKeys(e as KeyboardEvent, () => {
        (element as HTMLElement).click();
      });
    });
  });
};

// Accessibility testing utilities (for development)
export const accessibilityTesting = {
  // Check for missing alt text
  checkMissingAltText: () => {
    const images = document.querySelectorAll('img');
    const missingAlt: HTMLImageElement[] = [];
    
    images.forEach((img) => {
      if (!img.alt && !img.getAttribute('aria-label') && img.getAttribute('role') !== 'presentation') {
        missingAlt.push(img);
      }
    });

    if (missingAlt.length > 0 && process.env.NODE_ENV === 'development') {
      console.warn('Images missing alt text:', missingAlt);
    }

    return missingAlt;
  },

  // Check for missing form labels
  checkMissingFormLabels: () => {
    const inputs = document.querySelectorAll('input, select, textarea');
    const missingLabels: Element[] = [];

    inputs.forEach((input) => {
      const hasLabel = input.id && document.querySelector(`label[for="${input.id}"]`);
      const hasAriaLabel = input.getAttribute('aria-label');
      const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
      const isInLabel = input.closest('label');

      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy && !isInLabel) {
        missingLabels.push(input);
      }
    });

    if (missingLabels.length > 0 && process.env.NODE_ENV === 'development') {
      console.warn('Form controls missing labels:', missingLabels);
    }

    return missingLabels;
  },

  // Check color contrast (basic check)
  checkColorContrast: () => {
    // This is a simplified check - in production, use a proper contrast checking library
    const elements = document.querySelectorAll('*');
    const lowContrastElements: Element[] = [];

    elements.forEach((element) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;

      // Basic check for very light text on light backgrounds
      if (color.includes('rgb(255') && backgroundColor.includes('rgb(255')) {
        lowContrastElements.push(element);
      }
    });

    if (lowContrastElements.length > 0 && process.env.NODE_ENV === 'development') {
      console.warn('Potential low contrast elements:', lowContrastElements);
    }

    return lowContrastElements;
  }
};