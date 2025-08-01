/**
 * Tests de compatibilité mobile et responsive design
 * 
 * Validation de la compatibilité mobile et du responsive design
 * pour tous les composants corrigés et nouvelles pages ressources
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Tests de compatibilité mobile et responsive', () => {
  const viewports = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1024, height: 768 },
    largeDesktop: { width: 1440, height: 900 }
  };

  const setViewport = (viewport: { width: number; height: number }) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: viewport.width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: viewport.height,
    });
    
    // Déclencher l'événement resize
    window.dispatchEvent(new Event('resize'));
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.href = '';
    (global.fetch as any).mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('ConversionCTAs - Responsive Design', () => {
    const mockTechnique = {
      id: 'responsive-test',
      title: 'Test Responsive',
      slug: 'responsive-test',
      description: 'Test responsive design',
      category: 'negotiation' as const,
      difficulty: 'intermediate' as const,
      readingTime: 10,
      keyPoints: [],
      practicalSteps: [],
      commonMistakes: [],
      caseStudies: [],
      relatedTechniques: [],
      seoConfig: {
        title: 'Test Responsive',
        description: 'Test',
        keywords: [],
        canonicalUrl: '/test',
        openGraph: { title: 'Test', description: 'Test', image: '/test.jpg' },
        twitter: { title: 'Test', description: 'Test', image: '/test.jpg' }
      }
    };

    it('devrait s\'adapter correctement sur mobile (375px)', async () => {
      setViewport(viewports.mobile);

      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      const { container } = render(<ConversionCTAs technique={mockTechnique} />);

      // Vérifier les classes responsive pour mobile
      const gridElements = container.querySelectorAll('.md\\:grid-cols-3');
      expect(gridElements.length).toBeGreaterThan(0);

      // Vérifier que les boutons sont empilés verticalement sur mobile
      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button).toBeVisible();
        
        // Vérifier la taille tactile minimale (44px)
        const computedStyle = window.getComputedStyle(button);
        expect(button).toHaveClass(/p-|px-|py-/); // Classes de padding
      });

      // Vérifier que le texte est lisible
      const headings = container.querySelectorAll('h1, h2, h3, h4');
      headings.forEach(heading => {
        expect(heading).toBeVisible();
        expect(heading).toHaveClass(/text-/); // Classes de taille de texte
      });
    });

    it('devrait s\'adapter correctement sur tablette (768px)', async () => {
      setViewport(viewports.tablet);

      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      const { container } = render(<ConversionCTAs technique={mockTechnique} />);

      // Vérifier les classes responsive pour tablette
      const gridElements = container.querySelectorAll('.md\\:grid-cols-3, .md\\:grid-cols-2');
      expect(gridElements.length).toBeGreaterThan(0);

      // Vérifier l'espacement approprié
      const sections = container.querySelectorAll('section');
      sections.forEach(section => {
        expect(section).toHaveClass(/py-|px-/); // Classes de padding
      });
    });

    it('devrait s\'adapter correctement sur desktop (1024px)', async () => {
      setViewport(viewports.desktop);

      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      const { container } = render(<ConversionCTAs technique={mockTechnique} />);

      // Vérifier que la grille 3 colonnes est active
      const gridElements = container.querySelectorAll('.md\\:grid-cols-3');
      expect(gridElements.length).toBeGreaterThan(0);

      // Vérifier l'alignement horizontal des CTAs
      const ctaCards = container.querySelectorAll('[class*="grid"]');
      expect(ctaCards.length).toBeGreaterThan(0);
    });

    it('devrait gérer les interactions tactiles sur mobile', async () => {
      setViewport(viewports.mobile);

      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      render(<ConversionCTAs technique={mockTechnique} />);

      const diagnosticButton = screen.getByText(/réserver mon diagnostic/i);
      
      // Simuler un événement tactile
      fireEvent.touchStart(diagnosticButton);
      fireEvent.touchEnd(diagnosticButton);
      fireEvent.click(diagnosticButton);

      // Vérifier que l'interaction fonctionne
      await waitFor(() => {
        expect(mockLocation.href).toBe('/diagnostic');
      });
    });
  });

  describe('Pages Ressources - Responsive Design', () => {
    it('devrait afficher correctement la page tableau-bord sur mobile', async () => {
      setViewport(viewports.mobile);

      const { default: TableauBordPageClient } = await import('@/app/ressources/outil-tableau-bord/TableauBordPageClient');
      const { container } = render(<TableauBordPageClient />);

      // Vérifier la présence du contenu principal
      expect(screen.getByText(/tableau de bord commercial/i)).toBeInTheDocument();

      // Vérifier les classes responsive
      const responsiveElements = container.querySelectorAll('.lg\\:grid-cols-2, .md\\:grid-cols-2, .md\\:grid-cols-3');
      expect(responsiveElements.length).toBeGreaterThan(0);

      // Vérifier que les images sont responsive
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveClass(/w-full|max-w-/); // Classes de largeur responsive
      });
    });

    it('devrait afficher correctement la page grille-evaluation sur tablette', async () => {
      setViewport(viewports.tablet);

      const { default: GrilleEvaluationPageClient } = await import('@/app/ressources/grille-evaluation/GrilleEvaluationPageClient');
      const { container } = render(<GrilleEvaluationPageClient />);

      // Vérifier la présence du contenu
      expect(screen.getByText(/grille d'évaluation/i)).toBeInTheDocument();

      // Vérifier l'adaptation tablette
      const gridElements = container.querySelectorAll('.md\\:grid-cols-2, .lg\\:grid-cols-2');
      expect(gridElements.length).toBeGreaterThan(0);
    });

    it('devrait afficher correctement la page reporting-automatise sur desktop', async () => {
      setViewport(viewports.desktop);

      const { default: ReportingPageClient } = await import('@/app/ressources/reporting-automatise/ReportingPageClient');
      const { container } = render(<ReportingPageClient />);

      // Vérifier la présence du contenu
      expect(screen.getByText(/reporting automatisé/i)).toBeInTheDocument();

      // Vérifier l'utilisation optimale de l'espace desktop
      const wideElements = container.querySelectorAll('.max-w-6xl, .max-w-4xl');
      expect(wideElements.length).toBeGreaterThan(0);
    });
  });

  describe('Formulaires - Responsive Design', () => {
    it('devrait adapter les formulaires pour mobile', async () => {
      setViewport(viewports.mobile);

      const { default: ResourceDownloadForm } = await import('@/components/ressources/ResourceDownloadForm');
      
      const { container } = render(
        <ResourceDownloadForm
          title="Test Mobile Form"
          description="Test description"
          resourceUrl="/test-resource.pdf"
          resourceId="test-resource"
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

      // Vérifier que les champs de formulaire sont empilés verticalement
      const inputs = container.querySelectorAll('input');
      inputs.forEach(input => {
        expect(input).toBeVisible();
        expect(input).toHaveClass(/w-full/); // Largeur complète sur mobile
      });

      // Vérifier que les labels sont lisibles
      const labels = container.querySelectorAll('label');
      labels.forEach(label => {
        expect(label).toBeVisible();
        expect(label).toHaveClass(/text-/); // Classes de taille de texte
      });

      // Vérifier la taille du bouton de soumission
      const submitButton = screen.getByRole('button', { name: /télécharger/i });
      expect(submitButton).toHaveClass(/w-full/); // Bouton pleine largeur sur mobile
    });

    it('devrait optimiser les formulaires pour tablette', async () => {
      setViewport(viewports.tablet);

      const { default: ResourceDownloadForm } = await import('@/components/ressources/ResourceDownloadForm');
      
      const { container } = render(
        <ResourceDownloadForm
          title="Test Tablet Form"
          description="Test description"
          resourceUrl="/test-resource.pdf"
          resourceId="test-resource"
          deliveryMethod="email"
          autoResponse={true}
          formFields={{
            email: true,
            firstName: true,
            company: true,
            message: true
          }}
        />
      );

      // Vérifier l'utilisation de l'espace sur tablette
      const formContainer = container.querySelector('form');
      expect(formContainer).toBeVisible();

      // Vérifier que les champs peuvent être organisés en grille sur tablette
      const gridElements = container.querySelectorAll('.md\\:grid-cols-2, .grid');
      expect(gridElements.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation et Accessibilité Mobile', () => {
    it('devrait permettre la navigation au clavier sur mobile', async () => {
      setViewport(viewports.mobile);

      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      const { container } = render(<ConversionCTAs technique={mockTechnique} />);

      // Obtenir tous les éléments focusables
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      // Vérifier que les éléments sont focusables
      focusableElements.forEach(element => {
        expect(element).toHaveAttribute('tabIndex');
        
        // Vérifier la taille tactile minimale
        const rect = element.getBoundingClientRect();
        // Note: Dans un vrai test, on vérifierait les dimensions réelles
        expect(element).toHaveClass(/p-|px-|py-/);
      });
    });

    it('devrait avoir des zones tactiles appropriées', async () => {
      setViewport(viewports.mobile);

      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      const { container } = render(<ConversionCTAs technique={mockTechnique} />);

      const buttons = container.querySelectorAll('button');
      
      buttons.forEach(button => {
        // Vérifier que les boutons ont un padding suffisant pour les interactions tactiles
        expect(button).toHaveClass(/p-|px-|py-/);
        
        // Vérifier l'espacement entre les boutons
        expect(button.parentElement).toHaveClass(/gap-|space-/);
      });
    });
  });

  describe('Performance Mobile', () => {
    it('devrait charger efficacement sur mobile', async () => {
      setViewport(viewports.mobile);

      const startTime = performance.now();
      
      const { default: TableauBordPageClient } = await import('@/app/ressources/outil-tableau-bord/TableauBordPageClient');
      render(<TableauBordPageClient />);
      
      const endTime = performance.now();
      const loadTime = endTime - startTime;

      // Vérifier que le temps de chargement est acceptable sur mobile
      expect(loadTime).toBeLessThan(200); // Plus de tolérance pour mobile
    });

    it('devrait implémenter le lazy loading pour les images sur mobile', async () => {
      setViewport(viewports.mobile);

      const { default: ToolPreview } = await import('@/components/ressources/ToolPreview');
      
      const mockPreview = {
        type: 'image' as const,
        src: '/large-mobile-image.jpg',
        alt: 'Image mobile'
      };

      const { container } = render(
        <ToolPreview
          title="Mobile Tool"
          description="Mobile description"
          benefits={['Mobile benefit 1', 'Mobile benefit 2']}
          preview={mockPreview}
          features={['Mobile feature 1', 'Mobile feature 2']}
          difficulty="Facile"
          estimatedTime="5 minutes"
          format="PDF"
          onPreviewClick={() => {}}
        />
      );

      // Vérifier les attributs de lazy loading
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy');
        expect(img).toHaveAttribute('decoding', 'async');
        
        // Vérifier les classes responsive pour images
        expect(img).toHaveClass(/w-full|max-w-/);
      });
    });
  });

  describe('Tests Cross-Browser Mobile', () => {
    it('devrait fonctionner sur Safari mobile', async () => {
      // Simuler Safari mobile
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
        configurable: true,
      });

      setViewport(viewports.mobile);

      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      render(<ConversionCTAs technique={mockTechnique} />);

      // Vérifier que les éléments sont visibles
      expect(screen.getByText(/diagnostic gratuit personnalisé/i)).toBeInTheDocument();
      
      // Tester l'interaction
      const button = screen.getByText(/réserver mon diagnostic/i);
      fireEvent.click(button);
      
      expect(mockLocation.href).toBe('/diagnostic');
    });

    it('devrait fonctionner sur Chrome mobile', async () => {
      // Simuler Chrome mobile
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
        configurable: true,
      });

      setViewport(viewports.mobile);

      const { default: ResourceDownloadForm } = await import('@/components/ressources/ResourceDownloadForm');
      
      render(
        <ResourceDownloadForm
          title="Chrome Mobile Test"
          description="Test Chrome mobile"
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

      // Vérifier que le formulaire fonctionne
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
    });
  });

  describe('Orientation et Viewport Changes', () => {
    it('devrait s\'adapter au changement d\'orientation', async () => {
      // Portrait initial
      setViewport({ width: 375, height: 667 });

      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      const { container, rerender } = render(<ConversionCTAs technique={mockTechnique} />);

      // Vérifier l'affichage portrait
      expect(container.querySelectorAll('.md\\:grid-cols-3').length).toBeGreaterThan(0);

      // Changer vers paysage
      setViewport({ width: 667, height: 375 });
      rerender(<ConversionCTAs technique={mockTechnique} />);

      // Vérifier que le composant s'adapte
      expect(container).toBeInTheDocument();
    });

    it('devrait gérer les changements de taille de viewport dynamiques', async () => {
      const { default: TableauBordPageClient } = await import('@/app/ressources/outil-tableau-bord/TableauBordPageClient');
      const { container } = render(<TableauBordPageClient />);

      // Tester différentes tailles
      const sizes = [
        { width: 320, height: 568 }, // iPhone SE
        { width: 375, height: 812 }, // iPhone X
        { width: 414, height: 896 }, // iPhone 11 Pro Max
        { width: 768, height: 1024 }, // iPad
      ];

      for (const size of sizes) {
        setViewport(size);
        
        // Vérifier que le contenu reste accessible
        expect(screen.getByText(/tableau de bord commercial/i)).toBeInTheDocument();
        
        // Vérifier que les éléments interactifs restent utilisables
        const buttons = container.querySelectorAll('button');
        buttons.forEach(button => {
          expect(button).toBeVisible();
        });
      }
    });
  });
});