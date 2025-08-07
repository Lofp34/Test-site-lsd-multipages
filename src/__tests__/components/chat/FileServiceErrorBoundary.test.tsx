/**
 * Tests pour FileServiceErrorBoundary
 * Vérifie la capture d'erreurs de chargement de modules et les fallbacks gracieux
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  FileServiceErrorBoundary, 
  SimpleFileServiceErrorBoundary,
  withFileServiceErrorBoundary 
} from '@/components/chat/FileServiceErrorBoundary';

// ===== COMPOSANTS DE TEST =====

/**
 * Composant qui lance une erreur webpack
 */
const WebpackErrorComponent = () => {
  throw new Error("Cannot read properties of undefined (reading 'call')");
};

/**
 * Composant qui lance une erreur de chargement de module
 */
const ModuleLoadingErrorComponent = () => {
  throw new Error("Loading chunk 1 failed");
};

/**
 * Composant qui lance une erreur d'initialisation de service
 */
const ServiceInitErrorComponent = () => {
  throw new Error("FileService initialization failed");
};

/**
 * Composant qui fonctionne normalement
 */
const WorkingComponent = () => (
  <div data-testid="working-component">Composant fonctionnel</div>
);

/**
 * Composant qui peut être contrôlé pour lancer des erreurs
 */
interface ControlledErrorComponentProps {
  shouldThrow?: boolean;
  errorType?: 'webpack' | 'module' | 'service' | 'runtime';
}

const ControlledErrorComponent: React.FC<ControlledErrorComponentProps> = ({ 
  shouldThrow = false, 
  errorType = 'webpack' 
}) => {
  if (shouldThrow) {
    switch (errorType) {
      case 'webpack':
        throw new Error("Cannot read properties of undefined (reading 'call')");
      case 'module':
        throw new Error("Failed to resolve module");
      case 'service':
        throw new Error("FileService constructor failed");
      case 'runtime':
        throw new Error("Runtime execution error");
    }
  }
  
  return <div data-testid="controlled-component">Composant contrôlé</div>;
};

// ===== TESTS PRINCIPAUX =====

describe('FileServiceErrorBoundary', () => {
  // Supprimer les logs d'erreur pendant les tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  describe('Rendu normal', () => {
    it('rend les enfants quand il n\'y a pas d\'erreur', () => {
      render(
        <FileServiceErrorBoundary>
          <WorkingComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByTestId('working-component')).toBeInTheDocument();
    });

    it('rend plusieurs enfants correctement', () => {
      render(
        <FileServiceErrorBoundary>
          <div data-testid="child-1">Enfant 1</div>
          <div data-testid="child-2">Enfant 2</div>
        </FileServiceErrorBoundary>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });
  });

  describe('Capture d\'erreurs webpack', () => {
    it('capture les erreurs webpack et affiche le message approprié', () => {
      render(
        <FileServiceErrorBoundary>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText('Service de fichiers indisponible')).toBeInTheDocument();
      expect(screen.getByText(/Erreur de chargement des modules/)).toBeInTheDocument();
      expect(screen.getByText('Type d\'erreur: webpack')).toBeInTheDocument();
    });

    it('affiche les suggestions de résolution pour les erreurs webpack', () => {
      render(
        <FileServiceErrorBoundary>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText('💡 Solutions suggérées:')).toBeInTheDocument();
      expect(screen.getByText(/Actualisez la page pour recharger les modules/)).toBeInTheDocument();
      expect(screen.getByText(/Vérifiez que JavaScript est activé/)).toBeInTheDocument();
    });
  });

  describe('Capture d\'erreurs de chargement de modules', () => {
    it('capture les erreurs de chargement de modules', () => {
      render(
        <FileServiceErrorBoundary>
          <ModuleLoadingErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText('Type d\'erreur: module loading')).toBeInTheDocument();
      expect(screen.getByText(/Impossible de charger les composants nécessaires/)).toBeInTheDocument();
    });

    it('affiche les suggestions appropriées pour les erreurs de modules', () => {
      render(
        <FileServiceErrorBoundary>
          <ModuleLoadingErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText(/Vérifiez votre connexion internet/)).toBeInTheDocument();
      expect(screen.getByText(/Réessayez dans quelques instants/)).toBeInTheDocument();
    });
  });

  describe('Capture d\'erreurs d\'initialisation de service', () => {
    it('capture les erreurs d\'initialisation de service', () => {
      render(
        <FileServiceErrorBoundary>
          <ServiceInitErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText('Type d\'erreur: service initialization')).toBeInTheDocument();
      expect(screen.getByText(/Le service de gestion des fichiers n'a pas pu démarrer/)).toBeInTheDocument();
    });
  });

  describe('Fonctionnalités de récupération', () => {
    it('affiche le bouton de retry avec le compteur', () => {
      render(
        <FileServiceErrorBoundary maxAutoRetries={3}>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText(/🔄 Réessayer \(0\/3\)/)).toBeInTheDocument();
    });

    it('permet le retry manuel', async () => {
      const { rerender } = render(
        <FileServiceErrorBoundary>
          <ControlledErrorComponent shouldThrow={true} />
        </FileServiceErrorBoundary>
      );

      // Vérifier que l'erreur est affichée
      expect(screen.getByText('Service de fichiers indisponible')).toBeInTheDocument();

      // Simuler un retry avec un composant qui fonctionne
      const retryButton = screen.getByText(/🔄 Réessayer/);
      
      // Rerender avec un composant qui ne lance plus d'erreur
      rerender(
        <FileServiceErrorBoundary>
          <ControlledErrorComponent shouldThrow={false} />
        </FileServiceErrorBoundary>
      );

      fireEvent.click(retryButton);

      await waitFor(() => {
        expect(screen.getByTestId('controlled-component')).toBeInTheDocument();
      });
    });

    it('affiche le bouton de mode fallback', () => {
      render(
        <FileServiceErrorBoundary>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText('🛠️ Mode simplifié')).toBeInTheDocument();
    });

    it('active le mode fallback quand demandé', async () => {
      render(
        <FileServiceErrorBoundary>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      const fallbackButton = screen.getByText('🛠️ Mode simplifié');
      fireEvent.click(fallbackButton);

      await waitFor(() => {
        expect(screen.getByText('Mode simplifié')).toBeInTheDocument();
        expect(screen.getByText(/Le service de fichiers fonctionne en mode limité/)).toBeInTheDocument();
      });
    });

    it('affiche le bouton d\'actualisation de page', () => {
      render(
        <FileServiceErrorBoundary>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText('🔄 Actualiser la page')).toBeInTheDocument();
    });
  });

  describe('Callbacks et événements', () => {
    it('appelle le callback onError quand une erreur est capturée', () => {
      const onErrorMock = jest.fn();
      
      render(
        <FileServiceErrorBoundary onError={onErrorMock}>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(onErrorMock).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String)
        }),
        'webpack'
      );
    });

    it('appelle le callback onRetry quand le retry est demandé', async () => {
      const onRetryMock = jest.fn();
      
      render(
        <FileServiceErrorBoundary onRetry={onRetryMock}>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      const retryButton = screen.getByText(/🔄 Réessayer/);
      fireEvent.click(retryButton);

      expect(onRetryMock).toHaveBeenCalled();
    });
  });

  describe('Configuration et personnalisation', () => {
    it('utilise un message d\'erreur personnalisé', () => {
      const customMessage = 'Message d\'erreur personnalisé pour les tests';
      
      render(
        <FileServiceErrorBoundary customErrorMessage={customMessage}>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('désactive le mode fallback quand demandé', () => {
      render(
        <FileServiceErrorBoundary disableFallback={true}>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.queryByText('🛠️ Mode simplifié')).not.toBeInTheDocument();
    });

    it('affiche les détails techniques en mode développement', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      render(
        <FileServiceErrorBoundary>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText('🔧 Détails techniques')).toBeInTheDocument();

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Informations de contact', () => {
    it('affiche les informations de contact', () => {
      render(
        <FileServiceErrorBoundary>
          <WebpackErrorComponent />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText(/Besoin d'aide/)).toBeInTheDocument();
      expect(screen.getByText(/contact@laurent-serre-developpement.fr/)).toBeInTheDocument();
      expect(screen.getByText(/Section FAQ du site/)).toBeInTheDocument();
    });
  });
});

// ===== TESTS POUR LE WRAPPER SIMPLIFIÉ =====

describe('SimpleFileServiceErrorBoundary', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('fonctionne comme un wrapper simplifié', () => {
    render(
      <SimpleFileServiceErrorBoundary>
        <WebpackErrorComponent />
      </SimpleFileServiceErrorBoundary>
    );

    expect(screen.getByText('Service de fichiers indisponible')).toBeInTheDocument();
  });

  it('appelle le callback onError simplifié', () => {
    const onErrorMock = jest.fn();
    
    render(
      <SimpleFileServiceErrorBoundary onError={onErrorMock}>
        <WebpackErrorComponent />
      </SimpleFileServiceErrorBoundary>
    );

    expect(onErrorMock).toHaveBeenCalledWith(expect.any(Error));
  });
});

// ===== TESTS POUR LE HOC =====

describe('withFileServiceErrorBoundary HOC', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('protège un composant avec l\'error boundary', () => {
    const ProtectedComponent = withFileServiceErrorBoundary(WebpackErrorComponent);
    
    render(<ProtectedComponent />);

    expect(screen.getByText('Service de fichiers indisponible')).toBeInTheDocument();
  });

  it('passe les props au composant protégé', () => {
    const TestComponent: React.FC<{ testProp: string }> = ({ testProp }) => (
      <div data-testid="test-component">{testProp}</div>
    );
    
    const ProtectedComponent = withFileServiceErrorBoundary(TestComponent);
    
    render(<ProtectedComponent testProp="test value" />);

    expect(screen.getByText('test value')).toBeInTheDocument();
  });

  it('utilise les props de l\'error boundary passées au HOC', () => {
    const customMessage = 'Message HOC personnalisé';
    const ProtectedComponent = withFileServiceErrorBoundary(
      WebpackErrorComponent,
      { customErrorMessage: customMessage }
    );
    
    render(<ProtectedComponent />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});

// ===== TESTS D'INTÉGRATION =====

describe('Intégration avec différents types d\'erreurs', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  const errorTypes: Array<{
    type: 'webpack' | 'module' | 'service' | 'runtime';
    expectedText: string;
  }> = [
    { type: 'webpack', expectedText: 'Type d\'erreur: webpack' },
    { type: 'module', expectedText: 'Type d\'erreur: module loading' },
    { type: 'service', expectedText: 'Type d\'erreur: service initialization' },
    { type: 'runtime', expectedText: 'Type d\'erreur: runtime' }
  ];

  errorTypes.forEach(({ type, expectedText }) => {
    it(`gère correctement les erreurs de type ${type}`, () => {
      render(
        <FileServiceErrorBoundary>
          <ControlledErrorComponent shouldThrow={true} errorType={type} />
        </FileServiceErrorBoundary>
      );

      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });
});