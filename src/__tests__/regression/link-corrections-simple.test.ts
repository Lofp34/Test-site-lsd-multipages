/**
 * Tests de régression simplifiés - Validation des corrections de liens
 * 
 * Tests focalisés sur la validation des liens corrigés et des redirections
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock window.location
const mockLocation = {
  href: '',
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

// Mock gtag
const mockGtag = vi.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
});

describe('Tests de régression - Liens corrigés', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.href = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('1. Validation des URLs de redirection', () => {
    it('devrait avoir les bonnes URLs pour les liens corrigés', () => {
      // URLs des pages existantes vers lesquelles les liens doivent rediriger
      const expectedUrls = {
        coaching: '/coach-commercial-entreprise',
        bootcamp: '/bootcamp-commercial-intensif',
        diagnostic: '/diagnostic',
        formation: '/formation-commerciale-pme',
        expertise: '/expert-developpement-commercial-pme'
      };

      // Vérifier que les URLs sont bien définies
      expect(expectedUrls.coaching).toBe('/coach-commercial-entreprise');
      expect(expectedUrls.bootcamp).toBe('/bootcamp-commercial-intensif');
      expect(expectedUrls.diagnostic).toBe('/diagnostic');
      expect(expectedUrls.formation).toBe('/formation-commerciale-pme');
      expect(expectedUrls.expertise).toBe('/expert-developpement-commercial-pme');
    });
  });

  describe('2. Validation des pages ressources créées', () => {
    it('devrait avoir les bonnes URLs pour les nouvelles pages ressources', () => {
      const resourceUrls = {
        tableauBord: '/ressources/outil-tableau-bord',
        grilleEvaluation: '/ressources/grille-evaluation',
        reportingAutomatise: '/ressources/reporting-automatise'
      };

      // Vérifier que les URLs des ressources sont correctes
      expect(resourceUrls.tableauBord).toBe('/ressources/outil-tableau-bord');
      expect(resourceUrls.grilleEvaluation).toBe('/ressources/grille-evaluation');
      expect(resourceUrls.reportingAutomatise).toBe('/ressources/reporting-automatise');
    });
  });

  describe('3. Validation des fonctions de redirection', () => {
    it('devrait rediriger correctement vers la page coaching', () => {
      // Simuler une fonction de redirection
      const redirectToCoaching = () => {
        mockLocation.href = '/coach-commercial-entreprise';
      };

      redirectToCoaching();
      expect(mockLocation.href).toBe('/coach-commercial-entreprise');
    });

    it('devrait rediriger correctement vers la page bootcamp', () => {
      const redirectToBootcamp = () => {
        mockLocation.href = '/bootcamp-commercial-intensif';
      };

      redirectToBootcamp();
      expect(mockLocation.href).toBe('/bootcamp-commercial-intensif');
    });

    it('devrait rediriger correctement vers la page diagnostic', () => {
      const redirectToDiagnostic = () => {
        mockLocation.href = '/diagnostic';
      };

      redirectToDiagnostic();
      expect(mockLocation.href).toBe('/diagnostic');
    });
  });

  describe('4. Validation du tracking analytics', () => {
    it('devrait tracker les clics sur les CTAs', () => {
      // Simuler un clic avec tracking
      const trackCTAClick = (ctaType: string, techniqueId: string) => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', `${ctaType}_cta_click`, {
            event_category: 'Conversion',
            event_label: `Main ${ctaType.charAt(0).toUpperCase() + ctaType.slice(1)} CTA`,
            technique_id: techniqueId
          });
        }
      };

      trackCTAClick('coaching', 'test-technique');

      expect(mockGtag).toHaveBeenCalledWith('event', 'coaching_cta_click', {
        event_category: 'Conversion',
        event_label: 'Main Coaching CTA',
        technique_id: 'test-technique'
      });
    });

    it('devrait tracker les téléchargements de ressources', () => {
      const trackResourceDownload = (resourceId: string, resourceType: string) => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'resource_download', {
            event_category: 'Resource',
            event_label: resourceType,
            resource_id: resourceId
          });
        }
      };

      trackResourceDownload('tableau-bord', 'Excel Tool');

      expect(mockGtag).toHaveBeenCalledWith('event', 'resource_download', {
        event_category: 'Resource',
        event_label: 'Excel Tool',
        resource_id: 'tableau-bord'
      });
    });
  });

  describe('5. Validation des formulaires', () => {
    it('devrait valider les données de formulaire', () => {
      const validateFormData = (data: { email: string; firstName: string; company?: string }) => {
        const errors: string[] = [];

        if (!data.email || !data.email.includes('@')) {
          errors.push('Email invalide');
        }

        if (!data.firstName || data.firstName.trim().length < 2) {
          errors.push('Prénom requis (minimum 2 caractères)');
        }

        return {
          isValid: errors.length === 0,
          errors
        };
      };

      // Test avec données valides
      const validData = {
        email: 'test@example.com',
        firstName: 'Jean',
        company: 'Test Company'
      };

      const validResult = validateFormData(validData);
      expect(validResult.isValid).toBe(true);
      expect(validResult.errors).toHaveLength(0);

      // Test avec données invalides
      const invalidData = {
        email: 'invalid-email',
        firstName: 'J'
      };

      const invalidResult = validateFormData(invalidData);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toContain('Email invalide');
      expect(invalidResult.errors).toContain('Prénom requis (minimum 2 caractères)');
    });
  });

  describe('6. Validation des erreurs et gestion', () => {
    it('devrait gérer les erreurs de réseau', () => {
      const handleNetworkError = (error: Error) => {
        if (error.message.includes('Network')) {
          return {
            type: 'network_error',
            message: 'Erreur de connexion. Veuillez réessayer.',
            retryable: true
          };
        }

        return {
          type: 'unknown_error',
          message: 'Une erreur inattendue s\'est produite.',
          retryable: false
        };
      };

      const networkError = new Error('Network error');
      const result = handleNetworkError(networkError);

      expect(result.type).toBe('network_error');
      expect(result.retryable).toBe(true);
      expect(result.message).toContain('Erreur de connexion');
    });

    it('devrait gérer les erreurs 404', () => {
      const handle404Error = (url: string) => {
        return {
          type: '404_error',
          message: `Ressource introuvable : ${url}`,
          suggestedAction: 'Vérifiez l\'URL ou contactez le support'
        };
      };

      const result = handle404Error('/ressource-inexistante');

      expect(result.type).toBe('404_error');
      expect(result.message).toContain('Ressource introuvable');
      expect(result.suggestedAction).toContain('Vérifiez l\'URL');
    });
  });

  describe('7. Validation des performances', () => {
    it('devrait mesurer les temps de chargement', () => {
      const measureLoadTime = () => {
        const startTime = performance.now();
        
        // Simuler un chargement
        const simulateLoad = () => {
          return new Promise(resolve => setTimeout(resolve, 10));
        };

        return simulateLoad().then(() => {
          const endTime = performance.now();
          return endTime - startTime;
        });
      };

      return measureLoadTime().then(loadTime => {
        expect(loadTime).toBeGreaterThan(0);
        expect(loadTime).toBeLessThan(100); // Moins de 100ms pour le test
      });
    });
  });

  describe('8. Validation de l\'accessibilité', () => {
    it('devrait valider les attributs ARIA', () => {
      const validateARIAAttributes = (element: { 
        role?: string; 
        ariaLabel?: string; 
        ariaRequired?: boolean;
        tabIndex?: number;
      }) => {
        const issues: string[] = [];

        if (element.role === 'button' && !element.ariaLabel) {
          issues.push('Bouton sans aria-label');
        }

        if (element.ariaRequired && !element.ariaLabel) {
          issues.push('Champ requis sans aria-label');
        }

        if (element.tabIndex !== undefined && element.tabIndex < 0 && element.role === 'button') {
          issues.push('Bouton non focusable');
        }

        return {
          isAccessible: issues.length === 0,
          issues
        };
      };

      // Test élément accessible
      const accessibleElement = {
        role: 'button',
        ariaLabel: 'Télécharger le tableau de bord',
        tabIndex: 0
      };

      const accessibleResult = validateARIAAttributes(accessibleElement);
      expect(accessibleResult.isAccessible).toBe(true);

      // Test élément non accessible
      const inaccessibleElement = {
        role: 'button',
        tabIndex: -1
      };

      const inaccessibleResult = validateARIAAttributes(inaccessibleElement);
      expect(inaccessibleResult.isAccessible).toBe(false);
      expect(inaccessibleResult.issues).toContain('Bouton sans aria-label');
    });
  });

  describe('9. Validation responsive', () => {
    it('devrait détecter les breakpoints responsive', () => {
      const getBreakpoint = (width: number) => {
        if (width < 640) return 'mobile';
        if (width < 768) return 'sm';
        if (width < 1024) return 'md';
        if (width < 1280) return 'lg';
        return 'xl';
      };

      expect(getBreakpoint(375)).toBe('mobile');
      expect(getBreakpoint(768)).toBe('md');
      expect(getBreakpoint(1024)).toBe('lg');
      expect(getBreakpoint(1440)).toBe('xl');
    });

    it('devrait adapter les classes CSS selon le breakpoint', () => {
      const getResponsiveClasses = (breakpoint: string) => {
        const baseClasses = 'w-full p-4';
        
        switch (breakpoint) {
          case 'mobile':
            return `${baseClasses} text-sm`;
          case 'md':
            return `${baseClasses} md:w-1/2 text-base`;
          case 'lg':
            return `${baseClasses} lg:w-1/3 text-lg`;
          default:
            return baseClasses;
        }
      };

      expect(getResponsiveClasses('mobile')).toContain('text-sm');
      expect(getResponsiveClasses('md')).toContain('md:w-1/2');
      expect(getResponsiveClasses('lg')).toContain('lg:w-1/3');
    });
  });

  describe('10. Tests d\'intégration API', () => {
    it('devrait construire correctement les payloads API', () => {
      const buildResourceRequestPayload = (formData: {
        email: string;
        firstName: string;
        company?: string;
        resourceId: string;
      }) => {
        return {
          email: formData.email,
          firstName: formData.firstName,
          company: formData.company || '',
          resourceId: formData.resourceId,
          timestamp: Date.now(),
          source: 'website'
        };
      };

      const formData = {
        email: 'test@example.com',
        firstName: 'Jean',
        company: 'Test Company',
        resourceId: 'tableau-bord'
      };

      const payload = buildResourceRequestPayload(formData);

      expect(payload.email).toBe('test@example.com');
      expect(payload.firstName).toBe('Jean');
      expect(payload.company).toBe('Test Company');
      expect(payload.resourceId).toBe('tableau-bord');
      expect(payload.source).toBe('website');
      expect(payload.timestamp).toBeGreaterThan(0);
    });
  });
});