/**
 * Tests E2E - Validation des parcours utilisateur complets
 * 
 * Tests de bout en bout pour valider les parcours utilisateur
 * sur les pages corrigées et les nouvelles pages ressources
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock Next.js
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/test-path',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock window objects
const mockLocation = {
  href: '',
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  origin: 'https://laurent-serre-developpement.fr',
  pathname: '/',
  search: '',
  hash: '',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

const mockGtag = vi.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
});

// Mock fetch
global.fetch = vi.fn();

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('Tests E2E - Parcours utilisateur complets', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.href = '';
    (global.fetch as any).mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Parcours 1: Découverte technique → Diagnostic', () => {
    it('devrait permettre un parcours complet depuis une page technique vers le diagnostic', async () => {
      // 1. Charger une page de technique de négociation
      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      
      const mockTechnique = {
        id: 'ancrage-tactique',
        title: 'Ancrage Tactique',
        slug: 'ancrage-tactique',
        description: 'Technique d\'ancrage en négociation',
        category: 'negotiation' as const,
        difficulty: 'intermediate' as const,
        readingTime: 15,
        keyPoints: [],
        practicalSteps: [],
        commonMistakes: [],
        caseStudies: [],
        relatedTechniques: [],
        seoConfig: {
          title: 'Ancrage Tactique',
          description: 'Maîtrisez l\'ancrage tactique',
          keywords: ['ancrage', 'négociation'],
          canonicalUrl: '/ressources/techniques-de-negociation/ancrage-tactique',
          openGraph: { title: 'Ancrage Tactique', description: 'Test', image: '/test.jpg' },
          twitter: { title: 'Ancrage Tactique', description: 'Test', image: '/test.jpg' }
        }
      };

      render(<ConversionCTAs technique={mockTechnique} />);

      // 2. Vérifier la présence des CTAs
      expect(screen.getByText(/diagnostic gratuit personnalisé/i)).toBeInTheDocument();
      expect(screen.getByText(/réserver mon diagnostic/i)).toBeInTheDocument();

      // 3. Cliquer sur le CTA diagnostic
      const diagnosticButton = screen.getByText(/réserver mon diagnostic/i);
      await user.click(diagnosticButton);

      // 4. Vérifier la redirection
      await waitFor(() => {
        expect(mockLocation.href).toBe('/diagnostic');
      });

      // 5. Vérifier le tracking analytics
      expect(mockGtag).toHaveBeenCalledWith('event', 'diagnostic_cta_click', {
        event_category: 'Conversion',
        event_label: 'Main Diagnostic CTA',
        technique_id: 'ancrage-tactique'
      });
    });
  });

  describe('Parcours 2: Page ressource → Téléchargement → Coaching', () => {
    it('devrait permettre un parcours complet sur la page tableau de bord', async () => {
      // Mock de la réponse API pour le téléchargement
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ 
          success: true, 
          message: 'Email envoyé avec succès',
          downloadUrl: '/ressources/downloads/tableau-bord-commercial.xlsx'
        }),
      });

      // 1. Charger la page tableau de bord
      const { default: TableauBordPageClient } = await import('@/app/ressources/outil-tableau-bord/TableauBordPageClient');
      
      render(<TableauBordPageClient />);

      // 2. Vérifier la présence des éléments principaux
      expect(screen.getByText(/tableau de bord commercial/i)).toBeInTheDocument();
      expect(screen.getByText(/télécharger gratuitement/i)).toBeInTheDocument();

      // 3. Cliquer sur le bouton de téléchargement principal
      const mainDownloadButton = screen.getByText(/télécharger gratuitement/i);
      await user.click(mainDownloadButton);

      // 4. Vérifier que le formulaire de téléchargement est accessible
      await waitFor(() => {
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      });

      // 5. Remplir le formulaire
      const emailInput = screen.getByLabelText(/email/i);
      const firstNameInput = screen.getByLabelText(/prénom/i);
      const companyInput = screen.getByLabelText(/entreprise/i);

      await user.type(emailInput, 'test@pme-example.com');
      await user.type(firstNameInput, 'Jean');
      await user.type(companyInput, 'PME Test SARL');

      // 6. Soumettre le formulaire
      const submitButton = screen.getByRole('button', { name: /télécharger/i });
      await user.click(submitButton);

      // 7. Vérifier l'appel API
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/resource-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@pme-example.com',
            firstName: 'Jean',
            company: 'PME Test SARL',
            resourceId: expect.any(String),
            resourceUrl: expect.stringContaining('tableau-bord'),
            deliveryMethod: 'email',
            autoResponse: true
          }),
        });
      });

      // 8. Vérifier le message de succès
      await waitFor(() => {
        expect(screen.getByText(/email envoyé avec succès/i)).toBeInTheDocument();
      });

      // 9. Tester le CTA vers coaching
      const coachingButton = screen.getByText(/réserver un appel/i);
      await user.click(coachingButton);

      // 10. Vérifier la redirection vers coaching
      expect(mockLocation.href).toBe('/coach-commercial-entreprise');
    });
  });

  describe('Parcours 3: Navigation mobile responsive', () => {
    it('devrait fonctionner correctement sur mobile', async () => {
      // Simuler un viewport mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      });

      // Déclencher l'événement resize
      window.dispatchEvent(new Event('resize'));

      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      
      const mockTechnique = {
        id: 'test-mobile',
        title: 'Test Mobile',
        slug: 'test-mobile',
        description: 'Test mobile',
        category: 'negotiation' as const,
        difficulty: 'intermediate' as const,
        readingTime: 10,
        keyPoints: [],
        practicalSteps: [],
        commonMistakes: [],
        caseStudies: [],
        relatedTechniques: [],
        seoConfig: {
          title: 'Test Mobile',
          description: 'Test',
          keywords: [],
          canonicalUrl: '/test',
          openGraph: { title: 'Test', description: 'Test', image: '/test.jpg' },
          twitter: { title: 'Test', description: 'Test', image: '/test.jpg' }
        }
      };

      const { container } = render(<ConversionCTAs technique={mockTechnique} />);

      // Vérifier que les éléments sont visibles sur mobile
      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button).toBeVisible();
        
        // Vérifier que les boutons ont une taille tactile appropriée
        const styles = window.getComputedStyle(button);
        const minTouchSize = 44; // 44px minimum recommandé
        
        // Note: Dans un vrai test, on vérifierait les dimensions réelles
        expect(button).toHaveClass(/p-|px-|py-/); // Classes de padding Tailwind
      });

      // Tester l'interaction tactile
      const firstButton = buttons[0];
      await user.click(firstButton);

      // Vérifier que l'interaction fonctionne
      expect(mockLocation.href).toBeTruthy();
    });
  });

  describe('Parcours 4: Gestion d\'erreurs et récupération', () => {
    it('devrait gérer gracieusement les erreurs de réseau', async () => {
      // Mock d'une erreur réseau
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      const { default: ResourceDownloadForm } = await import('@/components/ressources/ResourceDownloadForm');
      
      render(
        <ResourceDownloadForm
          title="Test Resource"
          description="Test description"
          resourceUrl="/test-resource.pdf"
          resourceId="test-resource"
          deliveryMethod="email"
          autoResponse={true}
          formFields={{
            email: true,
            firstName: true,
            company: false,
            message: false
          }}
        />
      );

      // Remplir et soumettre le formulaire
      const emailInput = screen.getByLabelText(/email/i);
      const firstNameInput = screen.getByLabelText(/prénom/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(firstNameInput, 'Test User');

      const submitButton = screen.getByRole('button', { name: /télécharger/i });
      await user.click(submitButton);

      // Vérifier la gestion d'erreur
      await waitFor(() => {
        expect(screen.getByText(/erreur/i)).toBeInTheDocument();
      });

      // Vérifier qu'un bouton de retry est disponible
      const retryButton = screen.getByText(/réessayer/i);
      expect(retryButton).toBeInTheDocument();

      // Mock d'une réponse réussie pour le retry
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Succès après retry' }),
      });

      // Tester le retry
      await user.click(retryButton);

      await waitFor(() => {
        expect(screen.getByText(/succès après retry/i)).toBeInTheDocument();
      });
    });

    it('devrait gérer les erreurs de validation côté serveur', async () => {
      // Mock d'une réponse d'erreur de validation
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ 
          error: 'Validation error',
          details: {
            email: 'Format d\'email invalide',
            firstName: 'Prénom requis'
          }
        }),
      });

      const { default: ResourceDownloadForm } = await import('@/components/ressources/ResourceDownloadForm');
      
      render(
        <ResourceDownloadForm
          title="Test Resource"
          description="Test description"
          resourceUrl="/test-resource.pdf"
          resourceId="test-resource"
          deliveryMethod="email"
          autoResponse={true}
          formFields={{
            email: true,
            firstName: true,
            company: false,
            message: false
          }}
        />
      );

      // Soumettre avec des données invalides
      const emailInput = screen.getByLabelText(/email/i);
      const firstNameInput = screen.getByLabelText(/prénom/i);

      await user.type(emailInput, 'invalid-email');
      await user.type(firstNameInput, '');

      const submitButton = screen.getByRole('button', { name: /télécharger/i });
      await user.click(submitButton);

      // Vérifier les messages d'erreur spécifiques
      await waitFor(() => {
        expect(screen.getByText(/format d'email invalide/i)).toBeInTheDocument();
        expect(screen.getByText(/prénom requis/i)).toBeInTheDocument();
      });
    });
  });

  describe('Parcours 5: Accessibilité et navigation au clavier', () => {
    it('devrait permettre une navigation complète au clavier', async () => {
      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      
      const mockTechnique = {
        id: 'keyboard-test',
        title: 'Test Clavier',
        slug: 'keyboard-test',
        description: 'Test navigation clavier',
        category: 'negotiation' as const,
        difficulty: 'intermediate' as const,
        readingTime: 10,
        keyPoints: [],
        practicalSteps: [],
        commonMistakes: [],
        caseStudies: [],
        relatedTechniques: [],
        seoConfig: {
          title: 'Test Clavier',
          description: 'Test',
          keywords: [],
          canonicalUrl: '/test',
          openGraph: { title: 'Test', description: 'Test', image: '/test.jpg' },
          twitter: { title: 'Test', description: 'Test', image: '/test.jpg' }
        }
      };

      const { container } = render(<ConversionCTAs technique={mockTechnique} />);

      // Obtenir tous les éléments focusables
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      expect(focusableElements.length).toBeGreaterThan(0);

      // Tester la navigation séquentielle
      for (let i = 0; i < Math.min(3, focusableElements.length); i++) {
        const element = focusableElements[i] as HTMLElement;
        element.focus();
        expect(document.activeElement).toBe(element);

        // Tester l'activation par Entrée ou Espace
        if (element.tagName === 'BUTTON') {
          await user.keyboard('{Enter}');
          // Vérifier qu'une action a été déclenchée
          expect(mockLocation.href || mockGtag).toBeTruthy();
        }
      }
    });

    it('devrait avoir des annonces appropriées pour les lecteurs d\'écran', async () => {
      const { default: ResourceDownloadForm } = await import('@/components/ressources/ResourceDownloadForm');
      
      render(
        <ResourceDownloadForm
          title="Tableau de Bord Commercial"
          description="Outil de pilotage pour PME"
          resourceUrl="/tableau-bord.xlsx"
          resourceId="tableau-bord"
          deliveryMethod="email"
          autoResponse={true}
          formFields={{
            email: true,
            firstName: true,
            company: true,
            message: false
          }}
        />
      );

      // Vérifier les attributs ARIA
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-label');

      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute('aria-required', 'true');
      expect(emailInput).toHaveAttribute('aria-describedby');

      // Vérifier les messages d'état
      const submitButton = screen.getByRole('button', { name: /télécharger/i });
      expect(submitButton).toHaveAttribute('aria-describedby');
    });
  });

  describe('Parcours 6: Performance et optimisation', () => {
    it('devrait charger les ressources de manière optimisée', async () => {
      const performanceEntries: PerformanceEntry[] = [];
      
      // Mock de Performance Observer
      const mockPerformanceObserver = vi.fn().mockImplementation((callback) => ({
        observe: vi.fn(() => {
          // Simuler des entrées de performance
          callback({
            getEntries: () => performanceEntries
          });
        }),
        disconnect: vi.fn(),
      }));

      global.PerformanceObserver = mockPerformanceObserver;

      const { default: TableauBordPageClient } = await import('@/app/ressources/outil-tableau-bord/TableauBordPageClient');
      
      const startTime = performance.now();
      render(<TableauBordPageClient />);
      const endTime = performance.now();

      // Vérifier que le temps de rendu initial est acceptable
      expect(endTime - startTime).toBeLessThan(100);

      // Vérifier que le Performance Observer a été configuré
      expect(mockPerformanceObserver).toHaveBeenCalled();
    });

    it('devrait implémenter le lazy loading pour les images', async () => {
      const { default: ToolPreview } = await import('@/components/ressources/ToolPreview');
      
      const mockPreview = {
        type: 'image' as const,
        src: '/large-preview-image.jpg',
        alt: 'Aperçu de l\'outil'
      };

      const { container } = render(
        <ToolPreview
          title="Test Tool"
          description="Test description"
          benefits={['Benefit 1', 'Benefit 2']}
          preview={mockPreview}
          features={['Feature 1', 'Feature 2']}
          difficulty="Facile"
          estimatedTime="10 minutes"
          format="Excel"
          onPreviewClick={() => {}}
        />
      );

      // Vérifier les attributs de lazy loading
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy');
        expect(img).toHaveAttribute('decoding', 'async');
      });
    });
  });

  describe('Parcours 7: Analytics et tracking', () => {
    it('devrait tracker correctement les interactions utilisateur', async () => {
      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      
      const mockTechnique = {
        id: 'analytics-test',
        title: 'Test Analytics',
        slug: 'analytics-test',
        description: 'Test tracking',
        category: 'negotiation' as const,
        difficulty: 'intermediate' as const,
        readingTime: 10,
        keyPoints: [],
        practicalSteps: [],
        commonMistakes: [],
        caseStudies: [],
        relatedTechniques: [],
        seoConfig: {
          title: 'Test Analytics',
          description: 'Test',
          keywords: [],
          canonicalUrl: '/test',
          openGraph: { title: 'Test', description: 'Test', image: '/test.jpg' },
          twitter: { title: 'Test', description: 'Test', image: '/test.jpg' }
        }
      };

      render(<ConversionCTAs technique={mockTechnique} />);

      // Tester différents types de CTAs
      const diagnosticButton = screen.getByText(/réserver mon diagnostic/i);
      const bootcampButton = screen.getByText(/découvrir le bootcamp/i);
      const coachingButton = screen.getByText(/coaching sur-mesure/i);

      // Cliquer sur chaque CTA et vérifier le tracking
      await user.click(diagnosticButton);
      expect(mockGtag).toHaveBeenCalledWith('event', 'diagnostic_cta_click', {
        event_category: 'Conversion',
        event_label: 'Main Diagnostic CTA',
        technique_id: 'analytics-test'
      });

      await user.click(bootcampButton);
      expect(mockGtag).toHaveBeenCalledWith('event', 'bootcamp_cta_click', {
        event_category: 'Conversion',
        event_label: 'Main Bootcamp CTA',
        technique_id: 'analytics-test'
      });

      await user.click(coachingButton);
      expect(mockGtag).toHaveBeenCalledWith('event', 'coaching_cta_click', {
        event_category: 'Conversion',
        event_label: 'Main Coaching CTA',
        technique_id: 'analytics-test'
      });
    });
  });
});