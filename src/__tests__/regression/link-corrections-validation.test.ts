/**
 * Tests de régression et validation finale - Correction des liens cassés
 * 
 * Ce fichier teste tous les aspects de la tâche 9 :
 * - Liens corrigés sur les pages de négociation
 * - Parcours utilisateur complet pour chaque ressource
 * - Compatibilité mobile et responsive design
 * - Formulaires et réception des emails
 * - Redirections et gestion d'erreurs
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

// Mock Next.js router
const mockPush = vi.fn();
const mockReplace = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/test-path',
  useSearchParams: () => new URLSearchParams(),
}));

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

// Mock gtag for analytics
const mockGtag = vi.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
});

// Mock fetch for API calls
global.fetch = vi.fn();

describe('Tests de régression - Correction des liens cassés', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.href = '';
    (global.fetch as any).mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('1. Tests des liens corrigés sur les pages de négociation', () => {
    it('devrait rediriger correctement le lien "Coaching individuel" vers /coach-commercial-entreprise', async () => {
      // Import du composant ConversionCTAs
      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      
      const mockTechnique = {
        id: 'test-technique',
        title: 'Technique de test',
        slug: 'test-technique',
        description: 'Description de test',
        category: 'negotiation' as const,
        difficulty: 'intermediate' as const,
        readingTime: 10,
        keyPoints: [],
        practicalSteps: [],
        commonMistakes: [],
        caseStudies: [],
        relatedTechniques: [],
        seoConfig: {
          title: 'Test',
          description: 'Test',
          keywords: [],
          canonicalUrl: '/test',
          openGraph: { title: 'Test', description: 'Test', image: '/test.jpg' },
          twitter: { title: 'Test', description: 'Test', image: '/test.jpg' }
        }
      };

      render(<ConversionCTAs technique={mockTechnique} />);

      // Chercher le bouton de coaching
      const coachingButton = screen.getByText(/coaching sur-mesure/i);
      expect(coachingButton).toBeInTheDocument();

      // Simuler le clic
      fireEvent.click(coachingButton);

      // Vérifier la redirection
      await waitFor(() => {
        expect(mockLocation.href).toBe('/coach-commercial-entreprise');
      });

      // Vérifier le tracking analytics
      expect(mockGtag).toHaveBeenCalledWith('event', 'coaching_cta_click', {
        event_category: 'Conversion',
        event_label: 'Main Coaching CTA',
        technique_id: 'test-technique'
      });
    });

    it('devrait rediriger correctement le lien "Formation équipe" vers /bootcamp-commercial-intensif', async () => {
      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      
      const mockTechnique = {
        id: 'test-technique',
        title: 'Technique de test',
        slug: 'test-technique',
        description: 'Description de test',
        category: 'negotiation' as const,
        difficulty: 'intermediate' as const,
        readingTime: 10,
        keyPoints: [],
        practicalSteps: [],
        commonMistakes: [],
        caseStudies: [],
        relatedTechniques: [],
        seoConfig: {
          title: 'Test',
          description: 'Test',
          keywords: [],
          canonicalUrl: '/test',
          openGraph: { title: 'Test', description: 'Test', image: '/test.jpg' },
          twitter: { title: 'Test', description: 'Test', image: '/test.jpg' }
        }
      };

      render(<ConversionCTAs technique={mockTechnique} />);

      // Chercher le bouton de bootcamp
      const bootcampButton = screen.getByText(/découvrir le bootcamp/i);
      expect(bootcampButton).toBeInTheDocument();

      // Simuler le clic
      fireEvent.click(bootcampButton);

      // Vérifier la redirection
      await waitFor(() => {
        expect(mockLocation.href).toBe('/bootcamp-commercial-intensif');
      });

      // Vérifier le tracking analytics
      expect(mockGtag).toHaveBeenCalledWith('event', 'bootcamp_cta_click', {
        event_category: 'Conversion',
        event_label: 'Main Bootcamp CTA',
        technique_id: 'test-technique'
      });
    });

    it('devrait rediriger correctement le lien "Diagnostic gratuit" vers /diagnostic', async () => {
      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      
      const mockTechnique = {
        id: 'test-technique',
        title: 'Technique de test',
        slug: 'test-technique',
        description: 'Description de test',
        category: 'negotiation' as const,
        difficulty: 'intermediate' as const,
        readingTime: 10,
        keyPoints: [],
        practicalSteps: [],
        commonMistakes: [],
        caseStudies: [],
        relatedTechniques: [],
        seoConfig: {
          title: 'Test',
          description: 'Test',
          keywords: [],
          canonicalUrl: '/test',
          openGraph: { title: 'Test', description: 'Test', image: '/test.jpg' },
          twitter: { title: 'Test', description: 'Test', image: '/test.jpg' }
        }
      };

      render(<ConversionCTAs technique={mockTechnique} />);

      // Chercher le bouton de diagnostic
      const diagnosticButton = screen.getByText(/réserver mon diagnostic/i);
      expect(diagnosticButton).toBeInTheDocument();

      // Simuler le clic
      fireEvent.click(diagnosticButton);

      // Vérifier la redirection
      await waitFor(() => {
        expect(mockLocation.href).toBe('/diagnostic');
      });

      // Vérifier le tracking analytics
      expect(mockGtag).toHaveBeenCalledWith('event', 'diagnostic_cta_click', {
        event_category: 'Conversion',
        event_label: 'Main Diagnostic CTA',
        technique_id: 'test-technique'
      });
    });
  });

  describe('2. Tests du parcours utilisateur complet pour chaque ressource', () => {
    it('devrait permettre un parcours complet sur la page tableau-bord', async () => {
      const { default: TableauBordPageClient } = await import('@/app/ressources/outil-tableau-bord/TableauBordPageClient');
      
      render(<TableauBordPageClient />);

      // Vérifier la présence des éléments principaux
      expect(screen.getByText(/tableau de bord commercial/i)).toBeInTheDocument();
      expect(screen.getByText(/télécharger gratuitement/i)).toBeInTheDocument();
      
      // Tester le bouton de téléchargement
      const downloadButton = screen.getByText(/télécharger gratuitement/i);
      fireEvent.click(downloadButton);

      // Vérifier que le formulaire apparaît ou que l'action est déclenchée
      await waitFor(() => {
        // Le formulaire devrait être visible ou une action déclenchée
        expect(screen.getByText(/télécharger/i)).toBeInTheDocument();
      });
    });

    it('devrait permettre un parcours complet sur la page grille-evaluation', async () => {
      const { default: GrilleEvaluationPageClient } = await import('@/app/ressources/grille-evaluation/GrilleEvaluationPageClient');
      
      render(<GrilleEvaluationPageClient />);

      // Vérifier la présence des éléments principaux
      expect(screen.getByText(/grille d'évaluation/i)).toBeInTheDocument();
      
      // Vérifier les CTAs vers les services
      const coachingLinks = screen.getAllByText(/coaching/i);
      expect(coachingLinks.length).toBeGreaterThan(0);
    });

    it('devrait permettre un parcours complet sur la page reporting-automatise', async () => {
      const { default: ReportingPageClient } = await import('@/app/ressources/reporting-automatise/ReportingPageClient');
      
      render(<ReportingPageClient />);

      // Vérifier la présence des éléments principaux
      expect(screen.getByText(/reporting automatisé/i)).toBeInTheDocument();
      
      // Vérifier les CTAs vers les services
      const bootcampLinks = screen.getAllByText(/bootcamp/i);
      expect(bootcampLinks.length).toBeGreaterThan(0);
    });
  });

  describe('3. Tests de compatibilité mobile et responsive design', () => {
    it('devrait être responsive sur mobile pour ConversionCTAs', async () => {
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

      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      
      const mockTechnique = {
        id: 'test-technique',
        title: 'Technique de test',
        slug: 'test-technique',
        description: 'Description de test',
        category: 'negotiation' as const,
        difficulty: 'intermediate' as const,
        readingTime: 10,
        keyPoints: [],
        practicalSteps: [],
        commonMistakes: [],
        caseStudies: [],
        relatedTechniques: [],
        seoConfig: {
          title: 'Test',
          description: 'Test',
          keywords: [],
          canonicalUrl: '/test',
          openGraph: { title: 'Test', description: 'Test', image: '/test.jpg' },
          twitter: { title: 'Test', description: 'Test', image: '/test.jpg' }
        }
      };

      const { container } = render(<ConversionCTAs technique={mockTechnique} />);

      // Vérifier que les classes responsive sont présentes
      const gridElements = container.querySelectorAll('.md\\:grid-cols-3');
      expect(gridElements.length).toBeGreaterThan(0);

      // Vérifier que les boutons sont accessibles
      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button).toBeVisible();
      });
    });

    it('devrait être responsive sur tablette pour les pages ressources', async () => {
      // Simuler un viewport tablette
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      const { default: TableauBordPageClient } = await import('@/app/ressources/outil-tableau-bord/TableauBordPageClient');
      
      const { container } = render(<TableauBordPageClient />);

      // Vérifier les classes responsive pour tablette
      const responsiveElements = container.querySelectorAll('.lg\\:grid-cols-2, .md\\:grid-cols-2, .md\\:grid-cols-3');
      expect(responsiveElements.length).toBeGreaterThan(0);
    });
  });

  describe('4. Tests des formulaires et réception des emails', () => {
    it('devrait soumettre correctement le formulaire de demande de ressource', async () => {
      // Mock de la réponse API
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Email envoyé avec succès' }),
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
            company: true,
            message: false
          }}
        />
      );

      // Remplir le formulaire
      const emailInput = screen.getByLabelText(/email/i);
      const firstNameInput = screen.getByLabelText(/prénom/i);
      const companyInput = screen.getByLabelText(/entreprise/i);

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(companyInput, { target: { value: 'Test Company' } });

      // Soumettre le formulaire
      const submitButton = screen.getByRole('button', { name: /télécharger/i });
      fireEvent.click(submitButton);

      // Vérifier l'appel API
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/resource-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            firstName: 'John',
            company: 'Test Company',
            resourceId: 'test-resource',
            resourceUrl: '/test-resource.pdf',
            deliveryMethod: 'email',
            autoResponse: true
          }),
        });
      });
    });

    it('devrait gérer les erreurs de soumission de formulaire', async () => {
      // Mock d'une réponse d'erreur
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

      // Remplir le formulaire
      const emailInput = screen.getByLabelText(/email/i);
      const firstNameInput = screen.getByLabelText(/prénom/i);

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(firstNameInput, { target: { value: 'John' } });

      // Soumettre le formulaire
      const submitButton = screen.getByRole('button', { name: /télécharger/i });
      fireEvent.click(submitButton);

      // Vérifier la gestion d'erreur
      await waitFor(() => {
        expect(screen.getByText(/erreur/i)).toBeInTheDocument();
      });
    });

    it('devrait valider les champs requis du formulaire', async () => {
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
            company: true,
            message: false
          }}
        />
      );

      // Essayer de soumettre sans remplir les champs
      const submitButton = screen.getByRole('button', { name: /télécharger/i });
      fireEvent.click(submitButton);

      // Vérifier les messages de validation
      await waitFor(() => {
        const emailInput = screen.getByLabelText(/email/i);
        expect(emailInput).toBeInvalid();
      });
    });
  });

  describe('5. Tests des redirections et gestion d\'erreurs', () => {
    it('devrait gérer les erreurs 404 pour les ressources inexistantes', async () => {
      // Mock d'une réponse 404
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Resource not found' }),
      });

      const { default: ResourceDownloadForm } = await import('@/components/ressources/ResourceDownloadForm');
      
      render(
        <ResourceDownloadForm
          title="Test Resource"
          description="Test description"
          resourceUrl="/nonexistent-resource.pdf"
          resourceId="nonexistent-resource"
          deliveryMethod="download"
          autoResponse={false}
          formFields={{
            email: true,
            firstName: false,
            company: false,
            message: false
          }}
        />
      );

      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      const submitButton = screen.getByRole('button', { name: /télécharger/i });
      fireEvent.click(submitButton);

      // Vérifier la gestion de l'erreur 404
      await waitFor(() => {
        expect(screen.getByText(/ressource introuvable/i)).toBeInTheDocument();
      });
    });

    it('devrait rediriger correctement vers les pages existantes depuis les CTAs', async () => {
      const { default: ResourceCTAs } = await import('@/components/ressources/ResourceCTAs');
      
      const mockCTAs = [
        {
          title: "Coaching Personnalisé",
          description: "Test description",
          buttonText: "Réserver un appel",
          href: "/coach-commercial-entreprise",
          icon: <div>Icon</div>,
          variant: "primary" as const,
          onClick: () => {
            mockLocation.href = "/coach-commercial-entreprise";
          }
        }
      ];

      render(
        <ResourceCTAs
          title="Test CTAs"
          subtitle="Test subtitle"
          ctas={mockCTAs}
          layout="grid"
          maxCTAs={4}
        />
      );

      const ctaButton = screen.getByText(/réserver un appel/i);
      fireEvent.click(ctaButton);

      // Vérifier la redirection
      expect(mockLocation.href).toBe('/coach-commercial-entreprise');
    });

    it('devrait gérer les timeouts de requête', async () => {
      // Mock d'un timeout
      (global.fetch as any).mockImplementationOnce(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 100)
        )
      );

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
            firstName: false,
            company: false,
            message: false
          }}
        />
      );

      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      const submitButton = screen.getByRole('button', { name: /télécharger/i });
      fireEvent.click(submitButton);

      // Vérifier la gestion du timeout
      await waitFor(() => {
        expect(screen.getByText(/timeout/i)).toBeInTheDocument();
      }, { timeout: 5000 });
    });
  });

  describe('6. Tests d\'accessibilité et navigation au clavier', () => {
    it('devrait être navigable au clavier', async () => {
      const { default: ConversionCTAs } = await import('@/components/sections/negotiation/ConversionCTAs');
      
      const mockTechnique = {
        id: 'test-technique',
        title: 'Technique de test',
        slug: 'test-technique',
        description: 'Description de test',
        category: 'negotiation' as const,
        difficulty: 'intermediate' as const,
        readingTime: 10,
        keyPoints: [],
        practicalSteps: [],
        commonMistakes: [],
        caseStudies: [],
        relatedTechniques: [],
        seoConfig: {
          title: 'Test',
          description: 'Test',
          keywords: [],
          canonicalUrl: '/test',
          openGraph: { title: 'Test', description: 'Test', image: '/test.jpg' },
          twitter: { title: 'Test', description: 'Test', image: '/test.jpg' }
        }
      };

      const { container } = render(<ConversionCTAs technique={mockTechnique} />);

      // Vérifier que tous les boutons sont focusables
      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('tabIndex');
        expect(button.tabIndex).toBeGreaterThanOrEqual(0);
      });

      // Tester la navigation au clavier
      const firstButton = buttons[0];
      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);

      // Simuler Tab pour passer au bouton suivant
      fireEvent.keyDown(firstButton, { key: 'Tab' });
    });

    it('devrait avoir des labels ARIA appropriés', async () => {
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
            company: true,
            message: false
          }}
        />
      );

      // Vérifier les labels ARIA
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute('aria-required', 'true');

      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-label');
    });
  });

  describe('7. Tests de performance et optimisation', () => {
    it('devrait charger les composants de manière optimisée', async () => {
      const startTime = performance.now();
      
      const { default: TableauBordPageClient } = await import('@/app/ressources/outil-tableau-bord/TableauBordPageClient');
      
      render(<TableauBordPageClient />);
      
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      // Vérifier que le temps de chargement est raisonnable (< 100ms)
      expect(loadTime).toBeLessThan(100);
    });

    it('devrait implémenter le lazy loading pour les images', async () => {
      const { default: ToolPreview } = await import('@/components/ressources/ToolPreview');
      
      const mockPreview = {
        type: 'image' as const,
        src: '/test-image.jpg',
        alt: 'Test image'
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
          format="PDF"
          onPreviewClick={() => {}}
        />
      );

      // Vérifier que les images ont l'attribut loading="lazy"
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });
  });
});