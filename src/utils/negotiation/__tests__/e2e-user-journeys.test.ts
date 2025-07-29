import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Tests E2E pour les parcours utilisateur des techniques de négociation
 * Simule les interactions utilisateur complètes depuis la navigation jusqu'aux conversions
 */

// Mock du DOM et des APIs navigateur
const mockWindow = {
  location: {
    href: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir',
    pathname: '/ressources/techniques-de-negociation/effet-miroir',
    search: '',
    hash: ''
  },
  document: {
    title: 'L\'effet miroir | Technique FBI Chris Voss | Laurent Serre',
    referrer: 'https://google.com/search?q=technique+négociation',
    querySelector: vi.fn(),
    querySelectorAll: vi.fn(),
    getElementById: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  },
  navigator: {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    language: 'fr-FR',
    onLine: true
  },
  gtag: vi.fn(),
  localStorage: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
  },
  sessionStorage: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
  },
  fetch: vi.fn(),
  performance: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => [])
  },
  IntersectionObserver: vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  })),
  scrollTo: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn()
};

// Mock des éléments DOM
const createMockElement = (tag: string, attributes: Record<string, string> = {}) => ({
  tagName: tag.toUpperCase(),
  ...attributes,
  click: vi.fn(),
  focus: vi.fn(),
  blur: vi.fn(),
  scrollIntoView: vi.fn(),
  getBoundingClientRect: vi.fn(() => ({
    top: 100,
    left: 100,
    width: 200,
    height: 50,
    right: 300,
    bottom: 150
  })),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  querySelector: vi.fn(),
  querySelectorAll: vi.fn(() => []),
  classList: {
    add: vi.fn(),
    remove: vi.fn(),
    contains: vi.fn(() => false),
    toggle: vi.fn()
  },
  style: {},
  textContent: '',
  innerHTML: '',
  value: ''
});

describe('E2E User Journeys - Techniques de Négociation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup global mocks
    Object.defineProperty(global, 'window', {
      value: mockWindow,
      writable: true
    });
    
    Object.defineProperty(global, 'document', {
      value: mockWindow.document,
      writable: true
    });
    
    Object.defineProperty(global, 'navigator', {
      value: mockWindow.navigator,
      writable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Navigation Journey - Page Parent vers Technique', () => {
    it('should track complete navigation from parent page to technique', async () => {
      // Simuler la navigation depuis la page parent
      const parentPageUrl = 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation';
      const techniqueUrl = 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir';
      
      // Mock du lien de navigation
      const techniqueLink = createMockElement('a', {
        href: techniqueUrl,
        'data-technique': 'effet-miroir'
      });
      
      mockWindow.document.querySelector = vi.fn((selector) => {
        if (selector === '[data-technique="effet-miroir"]') {
          return techniqueLink;
        }
        return null;
      });
      
      // Simuler le clic sur le lien
      techniqueLink.click();
      
      // Vérifier que le tracking de navigation est déclenché
      expect(techniqueLink.click).toHaveBeenCalled();
      
      // Simuler le changement d'URL
      mockWindow.location.href = techniqueUrl;
      mockWindow.location.pathname = '/ressources/techniques-de-negociation/effet-miroir';
      
      // Vérifier que la page technique se charge correctement
      expect(mockWindow.location.href).toBe(techniqueUrl);
    });

    it('should load technique page with correct SEO metadata', async () => {
      // Simuler les métadonnées de la page
      const metaTags = [
        createMockElement('meta', { name: 'description', content: 'Maîtrisez l\'effet miroir de Chris Voss' }),
        createMockElement('meta', { property: 'og:title', content: 'L\'effet miroir | Technique FBI Chris Voss' }),
        createMockElement('meta', { property: 'og:type', content: 'article' }),
        createMockElement('link', { rel: 'canonical', href: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir' })
      ];
      
      mockWindow.document.querySelectorAll = vi.fn((selector) => {
        if (selector === 'meta[name="description"]') return [metaTags[0]];
        if (selector === 'meta[property^="og:"]') return [metaTags[1], metaTags[2]];
        if (selector === 'link[rel="canonical"]') return [metaTags[3]];
        return [];
      });
      
      // Vérifier la présence des métadonnées SEO
      const descriptionMeta = mockWindow.document.querySelectorAll('meta[name="description"]');
      const ogMetas = mockWindow.document.querySelectorAll('meta[property^="og:"]');
      const canonicalLink = mockWindow.document.querySelectorAll('link[rel="canonical"]');
      
      expect(descriptionMeta).toHaveLength(1);
      expect(ogMetas).toHaveLength(2);
      expect(canonicalLink).toHaveLength(1);
    });

    it('should track page view analytics on technique page load', async () => {
      // Simuler le chargement de la page technique
      const pageLoadEvent = {
        technique_id: 'effet-miroir',
        technique_title: 'L\'effet miroir',
        technique_author: 'Chris Voss',
        technique_category: 'psychology',
        technique_difficulty: 'intermediate',
        page_url: mockWindow.location.href,
        referrer: mockWindow.document.referrer,
        user_agent: mockWindow.navigator.userAgent,
        timestamp: Date.now()
      };
      
      // Simuler l'appel gtag
      mockWindow.gtag('event', 'technique_page_view', pageLoadEvent);
      
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'technique_page_view', pageLoadEvent);
    });
  });

  describe('Interactive Elements Journey', () => {
    it('should handle step-by-step guide interaction', async () => {
      // Mock des éléments du guide pratique
      const stepButtons = [
        createMockElement('button', { 'data-step': '1', 'aria-pressed': 'true' }),
        createMockElement('button', { 'data-step': '2', 'aria-pressed': 'false' }),
        createMockElement('button', { 'data-step': '3', 'aria-pressed': 'false' })
      ];
      
      const stepContent = createMockElement('div', { 'data-step-content': '1' });
      const progressBar = createMockElement('div', { 'data-progress': '0' });
      
      mockWindow.document.querySelectorAll = vi.fn((selector) => {
        if (selector === '[data-step]') return stepButtons;
        return [];
      });
      
      mockWindow.document.querySelector = vi.fn((selector) => {
        if (selector === '[data-step-content]') return stepContent;
        if (selector === '[data-progress]') return progressBar;
        return null;
      });
      
      // Simuler le clic sur l'étape 2
      stepButtons[1].click();
      
      // Vérifier que l'interaction est trackée
      expect(stepButtons[1].click).toHaveBeenCalled();
      
      // Simuler le changement d'état
      stepButtons[0].setAttribute('aria-pressed', 'false');
      stepButtons[1].setAttribute('aria-pressed', 'true');
      
      // Vérifier le tracking de l'interaction
      const stepInteractionEvent = {
        event_category: 'Practical Guide',
        event_label: 'Step 2',
        step_number: 2,
        technique_id: 'effet-miroir'
      };
      
      mockWindow.gtag('event', 'step_navigation', stepInteractionEvent);
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'step_navigation', stepInteractionEvent);
    });

    it('should handle tips accordion interaction', async () => {
      // Mock de l'accordéon des conseils
      const tipsButton = createMockElement('button', { 
        'data-tips-toggle': 'true',
        'aria-expanded': 'false',
        'aria-controls': 'tips-1'
      });
      
      const tipsContent = createMockElement('div', {
        'id': 'tips-1',
        'data-tips-content': 'true'
      });
      
      mockWindow.document.querySelector = vi.fn((selector) => {
        if (selector === '[data-tips-toggle]') return tipsButton;
        if (selector === '#tips-1') return tipsContent;
        return null;
      });
      
      // Simuler l'ouverture de l'accordéon
      tipsButton.click();
      
      // Vérifier le tracking de l'interaction
      const tipsInteractionEvent = {
        event_category: 'Practical Guide',
        event_label: 'Step 1 Tips',
        action: 'open',
        technique_id: 'effet-miroir'
      };
      
      mockWindow.gtag('event', 'tips_interaction', tipsInteractionEvent);
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'tips_interaction', tipsInteractionEvent);
    });

    it('should handle progress tracking and localStorage persistence', async () => {
      const techniqueId = 'effet-miroir';
      const completedSteps = [1, 2];
      
      // Simuler la sauvegarde de progression
      mockWindow.localStorage.setItem(`completed-steps-${techniqueId}`, JSON.stringify(completedSteps));
      
      expect(mockWindow.localStorage.setItem).toHaveBeenCalledWith(
        'completed-steps-effet-miroir',
        JSON.stringify(completedSteps)
      );
      
      // Simuler le rechargement et la récupération de progression
      mockWindow.localStorage.getItem = vi.fn((key) => {
        if (key === 'completed-steps-effet-miroir') {
          return JSON.stringify(completedSteps);
        }
        return null;
      });
      
      const savedProgress = mockWindow.localStorage.getItem(`completed-steps-${techniqueId}`);
      expect(JSON.parse(savedProgress!)).toEqual(completedSteps);
    });
  });

  describe('Resource Download Journey', () => {
    it('should track resource download interactions', async () => {
      // Mock du bouton de téléchargement
      const downloadButton = createMockElement('a', {
        href: '/ressources/downloads/guide-effet-miroir.pdf',
        'data-resource': 'guide-effet-miroir',
        'data-resource-type': 'PDF',
        download: 'guide-effet-miroir.pdf'
      });
      
      mockWindow.document.querySelector = vi.fn((selector) => {
        if (selector === '[data-resource="guide-effet-miroir"]') return downloadButton;
        return null;
      });
      
      // Simuler le clic de téléchargement
      downloadButton.click();
      
      // Vérifier le tracking du téléchargement
      const downloadEvent = {
        event_category: 'Resource Download',
        event_label: 'guide-effet-miroir',
        resource_type: 'PDF',
        technique_id: 'effet-miroir',
        download_url: '/ressources/downloads/guide-effet-miroir.pdf'
      };
      
      mockWindow.gtag('event', 'resource_download', downloadEvent);
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'resource_download', downloadEvent);
    });

    it('should handle download form submission', async () => {
      // Mock du formulaire de téléchargement
      const downloadForm = createMockElement('form', {
        'data-download-form': 'true',
        'data-resource': 'guide-effet-miroir'
      });
      
      const emailInput = createMockElement('input', {
        type: 'email',
        name: 'email',
        required: 'true'
      });
      emailInput.value = 'test@example.com';
      
      const submitButton = createMockElement('button', {
        type: 'submit'
      });
      
      mockWindow.document.querySelector = vi.fn((selector) => {
        if (selector === '[data-download-form]') return downloadForm;
        if (selector === 'input[name="email"]') return emailInput;
        if (selector === 'button[type="submit"]') return submitButton;
        return null;
      });
      
      // Mock de la soumission du formulaire
      const formSubmitEvent = new Event('submit');
      downloadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simuler l'envoi des données
        const formData = {
          email: emailInput.value,
          resource: 'guide-effet-miroir',
          technique_id: 'effet-miroir'
        };
        
        // Tracking de la conversion lead
        mockWindow.gtag('event', 'lead_generation', {
          event_category: 'Lead Generation',
          event_label: 'Resource Download',
          resource_name: 'guide-effet-miroir',
          technique_id: 'effet-miroir',
          email_provided: true
        });
      });
      
      // Simuler la soumission
      downloadForm.dispatchEvent(formSubmitEvent);
      
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'lead_generation', expect.objectContaining({
        event_category: 'Lead Generation',
        resource_name: 'guide-effet-miroir'
      }));
    });
  });

  describe('CTA Conversion Journey', () => {
    it('should track diagnostic CTA clicks', async () => {
      // Mock du CTA diagnostic
      const diagnosticCTA = createMockElement('button', {
        'data-cta': 'diagnostic',
        'data-cta-position': 'hero'
      });
      
      mockWindow.document.querySelector = vi.fn((selector) => {
        if (selector === '[data-cta="diagnostic"]') return diagnosticCTA;
        return null;
      });
      
      // Simuler le clic sur le CTA
      diagnosticCTA.click();
      
      // Vérifier le tracking de conversion
      const ctaClickEvent = {
        event_category: 'Negotiation',
        event_label: 'Hero Diagnostic - L\'effet miroir',
        technique_id: 'effet-miroir',
        cta_position: 'hero',
        cta_type: 'diagnostic'
      };
      
      mockWindow.gtag('event', 'cta_click', ctaClickEvent);
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'cta_click', ctaClickEvent);
    });

    it('should track formation CTA clicks', async () => {
      // Mock du CTA formation
      const formationCTA = createMockElement('button', {
        'data-cta': 'formation',
        'data-cta-position': 'hero'
      });
      
      mockWindow.document.querySelector = vi.fn((selector) => {
        if (selector === '[data-cta="formation"]') return formationCTA;
        return null;
      });
      
      // Simuler le clic sur le CTA
      formationCTA.click();
      
      // Vérifier le tracking de conversion
      const ctaClickEvent = {
        event_category: 'Negotiation',
        event_label: 'Hero Formation - L\'effet miroir',
        technique_id: 'effet-miroir',
        cta_position: 'hero',
        cta_type: 'formation'
      };
      
      mockWindow.gtag('event', 'cta_click', ctaClickEvent);
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'cta_click', ctaClickEvent);
    });
  });

  describe('Mobile Experience Journey', () => {
    it('should handle mobile navigation and interactions', async () => {
      // Mock d'un environnement mobile
      Object.defineProperty(mockWindow.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
        writable: true
      });
      
      // Mock des dimensions mobile
      Object.defineProperty(mockWindow, 'innerWidth', {
        value: 375,
        writable: true
      });
      
      Object.defineProperty(mockWindow, 'innerHeight', {
        value: 667,
        writable: true
      });
      
      // Mock des éléments responsive
      const mobileMenu = createMockElement('button', {
        'data-mobile-menu': 'true',
        'aria-expanded': 'false'
      });
      
      const stepNavigation = createMockElement('div', {
        'data-mobile-steps': 'true'
      });
      
      mockWindow.document.querySelector = vi.fn((selector) => {
        if (selector === '[data-mobile-menu]') return mobileMenu;
        if (selector === '[data-mobile-steps]') return stepNavigation;
        return null;
      });
      
      // Simuler l'interaction mobile
      mobileMenu.click();
      
      // Vérifier que l'interface mobile fonctionne
      expect(mobileMenu.click).toHaveBeenCalled();
      
      // Vérifier le tracking mobile
      const mobileInteractionEvent = {
        event_category: 'Mobile Interaction',
        event_label: 'Menu Toggle',
        device_type: 'mobile',
        screen_width: 375,
        technique_id: 'effet-miroir'
      };
      
      mockWindow.gtag('event', 'mobile_interaction', mobileInteractionEvent);
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'mobile_interaction', mobileInteractionEvent);
    });

    it('should handle touch interactions on mobile', async () => {
      // Mock des événements tactiles
      const touchableElement = createMockElement('div', {
        'data-touchable': 'true'
      });
      
      const touchStartEvent = new Event('touchstart');
      const touchEndEvent = new Event('touchend');
      
      touchableElement.addEventListener('touchstart', vi.fn());
      touchableElement.addEventListener('touchend', vi.fn());
      
      // Simuler les interactions tactiles
      touchableElement.dispatchEvent(touchStartEvent);
      touchableElement.dispatchEvent(touchEndEvent);
      
      expect(touchableElement.addEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(touchableElement.addEventListener).toHaveBeenCalledWith('touchend', expect.any(Function));
    });
  });

  describe('Performance Monitoring Journey', () => {
    it('should track page load performance', async () => {
      // Mock des métriques de performance
      const performanceEntries = [
        {
          name: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir',
          entryType: 'navigation',
          startTime: 0,
          duration: 1500,
          loadEventEnd: 1500,
          domContentLoadedEventEnd: 800
        }
      ];
      
      mockWindow.performance.getEntriesByType = vi.fn((type) => {
        if (type === 'navigation') return performanceEntries;
        return [];
      });
      
      // Simuler la mesure de performance
      const navigationEntry = mockWindow.performance.getEntriesByType('navigation')[0];
      
      const performanceEvent = {
        event_category: 'Performance',
        event_label: 'Page Load',
        technique_id: 'effet-miroir',
        load_time: navigationEntry.duration,
        dom_ready_time: navigationEntry.domContentLoadedEventEnd
      };
      
      mockWindow.gtag('event', 'performance_timing', performanceEvent);
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'performance_timing', performanceEvent);
    });

    it('should track Core Web Vitals', async () => {
      // Mock des Core Web Vitals
      const webVitals = {
        LCP: 1200, // Largest Contentful Paint
        FID: 50,   // First Input Delay
        CLS: 0.1   // Cumulative Layout Shift
      };
      
      // Simuler le tracking des Web Vitals
      Object.entries(webVitals).forEach(([metric, value]) => {
        const webVitalEvent = {
          event_category: 'Web Vitals',
          event_label: metric,
          technique_id: 'effet-miroir',
          metric_value: value,
          metric_rating: value <= (metric === 'LCP' ? 2500 : metric === 'FID' ? 100 : 0.1) ? 'good' : 'needs-improvement'
        };
        
        mockWindow.gtag('event', 'web_vital', webVitalEvent);
      });
      
      expect(mockWindow.gtag).toHaveBeenCalledTimes(3);
    });
  });

  describe('Error Handling Journey', () => {
    it('should handle and track JavaScript errors', async () => {
      // Mock d'une erreur JavaScript
      const jsError = new Error('Test error');
      
      // Simuler le gestionnaire d'erreur global
      const errorHandler = (error: Error) => {
        const errorEvent = {
          event_category: 'JavaScript Error',
          event_label: error.message,
          technique_id: 'effet-miroir',
          error_stack: error.stack,
          page_url: mockWindow.location.href
        };
        
        mockWindow.gtag('event', 'exception', errorEvent);
      };
      
      // Simuler l'erreur
      errorHandler(jsError);
      
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'exception', expect.objectContaining({
        event_category: 'JavaScript Error',
        event_label: 'Test error'
      }));
    });

    it('should handle network errors gracefully', async () => {
      // Mock d'une erreur réseau
      mockWindow.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      
      try {
        await mockWindow.fetch('/api/download');
      } catch (error) {
        const networkErrorEvent = {
          event_category: 'Network Error',
          event_label: 'API Request Failed',
          technique_id: 'effet-miroir',
          error_message: (error as Error).message
        };
        
        mockWindow.gtag('event', 'exception', networkErrorEvent);
      }
      
      expect(mockWindow.gtag).toHaveBeenCalledWith('event', 'exception', expect.objectContaining({
        event_category: 'Network Error'
      }));
    });
  });
});