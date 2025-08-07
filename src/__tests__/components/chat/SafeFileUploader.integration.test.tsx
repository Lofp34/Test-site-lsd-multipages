/**
 * Tests d'intégration pour SafeFileUploader
 * Vérifie l'intégration entre FileServiceErrorBoundary et FileUploader
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SafeFileUploader, { 
  ChatSafeFileUploader,
  FormSafeFileUploader,
  MediaSafeFileUploader,
  useSafeFileUploader,
  SafeFileUploaderExample
} from '@/components/chat/SafeFileUploader';

// ===== MOCKS =====

// Mock du FileUploader pour contrôler les erreurs
jest.mock('@/components/chat/FileUploader', () => {
  return function MockFileUploader({ onFileSelect, disabled }: any) {
    // Simuler une erreur webpack si disabled est true
    if (disabled) {
      throw new Error("Cannot read properties of undefined (reading 'call')");
    }
    
    return (
      <div data-testid="file-uploader">
        <button
          onClick={() => onFileSelect([new File(['test'], 'test.jpg', { type: 'image/jpeg' })])}
          data-testid="select-file-button"
        >
          Sélectionner fichier
        </button>
      </div>
    );
  };
});

// Mock du hook useMobileOptimization
jest.mock('@/hooks/useMobileOptimization', () => ({
  useMobileOptimization: () => ({
    isMobile: false,
    isTablet: false,
    orientation: 'portrait',
    getMobileClasses: (desktop: string, mobile: string) => desktop
  })
}));

// Mock du hook useFileService
jest.mock('@/hooks/useFileService', () => ({
  useFileService: () => ({
    service: {
      validateFile: () => ({ isValid: true }),
      validateFiles: () => ({ valid: [], invalid: [] }),
      isFileTypeSupported: () => true,
      getSupportedFileTypes: () => 'image/*,video/*',
      getFileLimits: () => ({ maxFileSize: 10485760, maxFileSizeFormatted: '10MB' })
    },
    isLoading: false,
    error: null,
    isReady: true,
    validateFiles: () => ({ valid: [], invalid: [] }),
    retry: jest.fn()
  })
}));

// ===== COMPOSANTS DE TEST =====

/**
 * Composant de test qui utilise le hook useSafeFileUploader
 */
function TestHookComponent() {
  const {
    uploadState,
    handleFileSelect,
    handleServiceError,
    clearError,
    reset
  } = useSafeFileUploader();

  return (
    <div>
      <div data-testid="upload-state">
        {JSON.stringify(uploadState)}
      </div>
      <button
        onClick={() => handleFileSelect([new File(['test'], 'test.jpg')])}
        data-testid="handle-file-select"
      >
        Sélectionner fichier
      </button>
      <button
        onClick={() => handleServiceError(new Error('Test error'), 'webpack')}
        data-testid="trigger-error"
      >
        Déclencher erreur
      </button>
      <button onClick={clearError} data-testid="clear-error">
        Effacer erreur
      </button>
      <button onClick={reset} data-testid="reset">
        Reset
      </button>
    </div>
  );
}

// ===== TESTS PRINCIPAUX =====

describe('SafeFileUploader', () => {
  // Supprimer les logs d'erreur pendant les tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  describe('Rendu normal', () => {
    it('rend le FileUploader quand il n\'y a pas d\'erreur', () => {
      const handleFileSelect = jest.fn();
      
      render(
        <SafeFileUploader
          onFileSelect={handleFileSelect}
          acceptedTypes={['image/*']}
          maxFileSize={1024 * 1024}
          maxFiles={1}
        />
      );

      expect(screen.getByTestId('file-uploader')).toBeInTheDocument();
    });

    it('passe correctement les props au FileUploader', () => {
      const handleFileSelect = jest.fn();
      
      render(
        <SafeFileUploader
          onFileSelect={handleFileSelect}
          acceptedTypes={['image/*', 'video/*']}
          maxFileSize={5 * 1024 * 1024}
          maxFiles={3}
        />
      );

      const selectButton = screen.getByTestId('select-file-button');
      fireEvent.click(selectButton);

      expect(handleFileSelect).toHaveBeenCalledWith([
        expect.objectContaining({
          name: 'test.jpg',
          type: 'image/jpeg'
        })
      ]);
    });
  });

  describe('Gestion d\'erreurs', () => {
    it('capture les erreurs du FileUploader', () => {
      const handleFileSelect = jest.fn();
      const handleServiceError = jest.fn();
      
      render(
        <SafeFileUploader
          onFileSelect={handleFileSelect}
          onServiceError={handleServiceError}
          acceptedTypes={['image/*']}
          maxFileSize={1024 * 1024}
          maxFiles={1}
          disabled={true} // Déclenche une erreur dans le mock
        />
      );

      // Vérifier que l'error boundary a capturé l'erreur
      expect(screen.getByText('Service de fichiers indisponible')).toBeInTheDocument();
      expect(screen.getByText('Type d\'erreur: webpack')).toBeInTheDocument();
    });

    it('appelle le callback onServiceError quand une erreur est capturée', async () => {
      const handleFileSelect = jest.fn();
      const handleServiceError = jest.fn();
      
      render(
        <SafeFileUploader
          onFileSelect={handleFileSelect}
          onServiceError={handleServiceError}
          acceptedTypes={['image/*']}
          maxFileSize={1024 * 1024}
          maxFiles={1}
          disabled={true}
        />
      );

      // Attendre que le callback soit appelé
      await waitFor(() => {
        expect(handleServiceError).toHaveBeenCalledWith(
          expect.any(Error),
          'webpack'
        );
      });
    });

    it('utilise un message d\'erreur personnalisé', () => {
      const customMessage = 'Message d\'erreur personnalisé pour les tests';
      
      render(
        <SafeFileUploader
          onFileSelect={jest.fn()}
          customErrorMessage={customMessage}
          acceptedTypes={['image/*']}
          maxFileSize={1024 * 1024}
          maxFiles={1}
          disabled={true}
        />
      );

      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });

  describe('Configuration', () => {
    it('applique la classe CSS personnalisée', () => {
      render(
        <SafeFileUploader
          onFileSelect={jest.fn()}
          containerClassName="custom-uploader-class"
          acceptedTypes={['image/*']}
          maxFileSize={1024 * 1024}
          maxFiles={1}
        />
      );

      const container = document.querySelector('.custom-uploader-class');
      expect(container).toBeInTheDocument();
    });

    it('configure correctement les paramètres de retry', () => {
      render(
        <SafeFileUploader
          onFileSelect={jest.fn()}
          maxRetries={5}
          retryDelay={3000}
          acceptedTypes={['image/*']}
          maxFileSize={1024 * 1024}
          maxFiles={1}
          disabled={true}
        />
      );

      // Vérifier que le bouton de retry affiche le bon nombre
      expect(screen.getByText(/🔄 Réessayer \(0\/5\)/)).toBeInTheDocument();
    });
  });
});

// ===== TESTS POUR LES COMPOSANTS SPÉCIALISÉS =====

describe('Composants spécialisés', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  describe('ChatSafeFileUploader', () => {
    it('utilise un message d\'erreur adapté au chat', () => {
      render(
        <ChatSafeFileUploader
          onFileSelect={jest.fn()}
          acceptedTypes={['image/*']}
          maxFileSize={1024 * 1024}
          maxFiles={1}
          disabled={true}
        />
      );

      expect(screen.getByText(/L'upload de fichiers est temporairement indisponible, mais vous pouvez continuer à envoyer des messages texte/)).toBeInTheDocument();
    });

    it('applique la classe CSS pour le chat', () => {
      render(
        <ChatSafeFileUploader
          onFileSelect={jest.fn()}
          acceptedTypes={['image/*']}
          maxFileSize={1024 * 1024}
          maxFiles={1}
        />
      );

      const container = document.querySelector('.chat-file-uploader');
      expect(container).toBeInTheDocument();
    });
  });

  describe('FormSafeFileUploader', () => {
    it('utilise un message d\'erreur adapté aux formulaires', () => {
      render(
        <FormSafeFileUploader
          onFileSelect={jest.fn()}
          acceptedTypes={['image/*']}
          maxFileSize={1024 * 1024}
          maxFiles={1}
          disabled={true}
        />
      );

      expect(screen.getByText(/Le service d'upload rencontre des difficultés/)).toBeInTheDocument();
    });
  });

  describe('MediaSafeFileUploader', () => {
    it('utilise les types de fichiers médias par défaut', () => {
      render(
        <MediaSafeFileUploader
          onFileSelect={jest.fn()}
          maxFileSize={1024 * 1024}
          maxFiles={1}
        />
      );

      expect(screen.getByTestId('file-uploader')).toBeInTheDocument();
    });

    it('utilise un message d\'erreur adapté aux médias', () => {
      render(
        <MediaSafeFileUploader
          onFileSelect={jest.fn()}
          maxFileSize={1024 * 1024}
          maxFiles={1}
          disabled={true}
        />
      );

      expect(screen.getByText(/L'upload de médias est temporairement indisponible/)).toBeInTheDocument();
    });
  });
});

// ===== TESTS POUR LE HOOK =====

describe('useSafeFileUploader hook', () => {
  it('gère l\'état d\'upload correctement', async () => {
    render(<TestHookComponent />);

    const selectButton = screen.getByTestId('handle-file-select');
    fireEvent.click(selectButton);

    // Vérifier que l'état passe à "uploading"
    await waitFor(() => {
      const stateElement = screen.getByTestId('upload-state');
      const state = JSON.parse(stateElement.textContent || '{}');
      expect(state.isUploading).toBe(true);
    });

    // Attendre que l'upload se termine
    await waitFor(() => {
      const stateElement = screen.getByTestId('upload-state');
      const state = JSON.parse(stateElement.textContent || '{}');
      expect(state.isUploading).toBe(false);
      expect(state.uploadedFiles).toHaveLength(1);
    }, { timeout: 2000 });
  });

  it('gère les erreurs correctement', () => {
    render(<TestHookComponent />);

    const errorButton = screen.getByTestId('trigger-error');
    fireEvent.click(errorButton);

    const stateElement = screen.getByTestId('upload-state');
    const state = JSON.parse(stateElement.textContent || '{}');
    
    expect(state.hasError).toBe(true);
    expect(state.errorMessage).toContain('Erreur webpack: Test error');
  });

  it('permet d\'effacer les erreurs', () => {
    render(<TestHookComponent />);

    // Déclencher une erreur
    const errorButton = screen.getByTestId('trigger-error');
    fireEvent.click(errorButton);

    // Effacer l'erreur
    const clearButton = screen.getByTestId('clear-error');
    fireEvent.click(clearButton);

    const stateElement = screen.getByTestId('upload-state');
    const state = JSON.parse(stateElement.textContent || '{}');
    
    expect(state.hasError).toBe(false);
    expect(state.errorMessage).toBe(null);
  });

  it('permet de réinitialiser l\'état', async () => {
    render(<TestHookComponent />);

    // Sélectionner un fichier
    const selectButton = screen.getByTestId('handle-file-select');
    fireEvent.click(selectButton);

    // Attendre que l'upload se termine
    await waitFor(() => {
      const stateElement = screen.getByTestId('upload-state');
      const state = JSON.parse(stateElement.textContent || '{}');
      expect(state.uploadedFiles).toHaveLength(1);
    }, { timeout: 2000 });

    // Réinitialiser
    const resetButton = screen.getByTestId('reset');
    fireEvent.click(resetButton);

    const stateElement = screen.getByTestId('upload-state');
    const state = JSON.parse(stateElement.textContent || '{}');
    
    expect(state.uploadedFiles).toHaveLength(0);
    expect(state.hasError).toBe(false);
    expect(state.isUploading).toBe(false);
  });
});

// ===== TESTS POUR L'EXEMPLE =====

describe('SafeFileUploaderExample', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('rend l\'exemple complet', () => {
    render(<SafeFileUploaderExample />);

    expect(screen.getByText('Upload sécurisé de fichiers')).toBeInTheDocument();
    expect(screen.getByTestId('file-uploader')).toBeInTheDocument();
  });

  it('affiche les messages d\'état', async () => {
    render(<SafeFileUploaderExample />);

    const selectButton = screen.getByTestId('select-file-button');
    fireEvent.click(selectButton);

    // Vérifier que le message de succès apparaît
    await waitFor(() => {
      expect(screen.getByText(/fichier\(s\) uploadé\(s\) avec succès/)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});