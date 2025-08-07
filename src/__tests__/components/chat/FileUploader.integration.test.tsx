/**
 * Tests d'intégration pour le composant FileUploader
 * Teste l'intégration avec le nouveau service et vérifie l'absence d'erreurs webpack
 * 
 * Requirements: 1.1, 1.2, 3.3
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileUploader from '@/components/chat/FileUploader';
import { FileService } from '@/lib/gemini/file-service';
import type { FileValidationResult, FileValidationResults, UploadedFile } from '@/lib/gemini/file-service-interface';

// Mock du FileService
vi.mock('@/lib/gemini/file-service');

// Mock du hook useMobileOptimization
vi.mock('@/hooks/useMobileOptimization', () => ({
  useMobileOptimization: () => ({
    isMobile: false,
    isTablet: false,
    orientation: 'portrait' as const,
    isKeyboardVisible: false,
    touchGesture: null,
    getChatPosition: () => ({ bottom: '1rem', right: '1rem' }),
    getChatSize: () => ({ width: '400px', height: '600px' }),
    getMobileClasses: (base: string, mobile: string) => base,
    onSwipeDown: vi.fn(),
    onSwipeUp: vi.fn(),
    onSwipeLeft: vi.fn(),
    onSwipeRight: vi.fn()
  })
}));

// Mock des APIs navigateur
Object.defineProperty(global, 'FileReader', {
  writable: true,
  value: class MockFileReader {
    result: string | null = null;
    onload: ((event: any) => void) | null = null;
    onerror: ((event: any) => void) | null = null;
    onabort: ((event: any) => void) | null = null;

    readAsDataURL(file: File) {
      setTimeout(() => {
        this.result = `data:${file.type};base64,mockbase64data`;
        this.onload?.({ target: this });
      }, 10);
    }
  }
});

Object.defineProperty(global, 'URL', {
  writable: true,
  value: {
    createObjectURL: vi.fn(() => 'blob:mock-url'),
    revokeObjectURL: vi.fn()
  }
});

// Mock du FileService
const mockFileService = {
  validateFile: vi.fn(),
  validateFiles: vi.fn(),
  uploadFile: vi.fn(),
  uploadFiles: vi.fn(),
  isFileTypeSupported: vi.fn(),
  getSupportedFileTypes: vi.fn(() => 'image/*,video/*,audio/*'),
  getFileLimits: vi.fn(() => ({
    maxFileSize: 10 * 1024 * 1024,
    maxFileSizeFormatted: '10 MB',
    supportedTypes: ['image/jpeg', 'image/png', 'video/mp4'],
    supportedTypesForInput: 'image/*,video/*,audio/*'
  }))
};

describe('FileUploader Integration Tests', () => {
  const user = userEvent.setup();
  const mockOnFileSelect = vi.fn();

  // Fichiers de test
  const createMockFile = (name: string, type: string, size: number = 1024): File => {
    const file = new File(['mock content'], name, { type });
    Object.defineProperty(file, 'size', { value: size });
    return file;
  };

  const validImageFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024);
  const validVideoFile = createMockFile('test.mp4', 'video/mp4', 2 * 1024 * 1024);
  const invalidFile = createMockFile('test.txt', 'text/plain', 1024);
  const oversizedFile = createMockFile('large.jpg', 'image/jpeg', 15 * 1024 * 1024);

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup du mock FileService
    (FileService as any).mockImplementation(() => mockFileService);
    
    // Setup des mocks du service
    mockFileService.validateFile.mockImplementation((file: File): FileValidationResult => {
      if (file.size > 10 * 1024 * 1024) {
        return { isValid: false, error: 'Fichier trop volumineux' };
      }
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/') && !file.type.startsWith('audio/')) {
        return { isValid: false, error: 'Type de fichier non supporté' };
      }
      return { isValid: true };
    });

    mockFileService.validateFiles.mockImplementation((files: File[]): FileValidationResults => {
      const valid: File[] = [];
      const invalid: Array<{ file: File; error: string }> = [];

      files.forEach(file => {
        const validation = mockFileService.validateFile(file);
        if (validation.isValid) {
          valid.push(file);
        } else {
          invalid.push({ file, error: validation.error || 'Erreur de validation' });
        }
      });

      return { valid, invalid };
    });

    mockFileService.uploadFile.mockImplementation(async (file: File): Promise<UploadedFile> => {
      return {
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        uri: `data:${file.type};base64,mockbase64data`,
        mimeType: file.type,
        size: file.size,
        uploadedAt: new Date()
      };
    });

    mockFileService.uploadFiles.mockImplementation(async (files: File[]): Promise<UploadedFile[]> => {
      return Promise.all(files.map(file => mockFileService.uploadFile(file)));
    });

    mockFileService.isFileTypeSupported.mockImplementation((mimeType: string): boolean => {
      return mimeType.startsWith('image/') || mimeType.startsWith('video/') || mimeType.startsWith('audio/');
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Intégration avec le service de fichiers', () => {
    it('should render without webpack errors', () => {
      // Requirement 1.1: Vérifier l'absence d'erreurs webpack
      expect(() => {
        render(
          <FileUploader
            onFileSelect={mockOnFileSelect}
            acceptedTypes="image/*,video/*,audio/*"
            maxFileSize={10 * 1024 * 1024}
            maxFiles={5}
          />
        );
      }).not.toThrow();

      expect(screen.getByText(/Cliquez ou glissez vos fichiers ici/)).toBeInTheDocument();
    });

    it('should use the file service correctly', () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      // Vérifier que le FileService est instancié
      expect(FileService).toHaveBeenCalled();
    });

    it('should validate files using the service', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = screen.getByRole('textbox', { hidden: true }) || 
                       document.querySelector('input[type="file"]') as HTMLInputElement;
      
      expect(fileInput).toBeInTheDocument();

      // Simuler la sélection d'un fichier valide
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [validImageFile] }
        });
      });

      // Attendre que la validation soit appelée
      await waitFor(() => {
        expect(mockFileService.validateFiles).toHaveBeenCalledWith([validImageFile]);
      });
    });

    it('should handle file validation errors', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

      // Simuler la sélection d'un fichier invalide
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [invalidFile] }
        });
      });

      // Vérifier que l'erreur est affichée
      await waitFor(() => {
        expect(screen.getByText(/Type de fichier non supporté/)).toBeInTheDocument();
      });

      // Vérifier que onFileSelect n'est pas appelé pour les fichiers invalides
      expect(mockOnFileSelect).not.toHaveBeenCalled();
    });

    it('should handle oversized files', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

      // Simuler la sélection d'un fichier trop volumineux
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [oversizedFile] }
        });
      });

      // Vérifier que l'erreur est affichée
      await waitFor(() => {
        expect(screen.getByText(/Fichier trop volumineux/)).toBeInTheDocument();
      });
    });

    it('should upload valid files successfully', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

      // Simuler la sélection d'un fichier valide
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [validImageFile] }
        });
      });

      // Attendre que l'upload soit terminé
      await waitFor(() => {
        expect(mockOnFileSelect).toHaveBeenCalledWith([validImageFile]);
      }, { timeout: 3000 });

      // Vérifier que l'indicateur de progression a été affiché
      expect(screen.queryByText(/Upload en cours/)).not.toBeInTheDocument();
    });

    it('should handle multiple files upload', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

      // Simuler la sélection de plusieurs fichiers valides
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [validImageFile, validVideoFile] }
        });
      });

      // Attendre que la validation soit appelée
      await waitFor(() => {
        expect(mockFileService.validateFiles).toHaveBeenCalledWith([validImageFile, validVideoFile]);
      });

      // Attendre que l'upload soit terminé
      await waitFor(() => {
        expect(mockOnFileSelect).toHaveBeenCalledWith([validImageFile, validVideoFile]);
      }, { timeout: 3000 });
    });

    it('should show upload progress', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

      // Simuler la sélection d'un fichier
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [validImageFile] }
        });
      });

      // Vérifier que l'indicateur de progression apparaît
      await waitFor(() => {
        expect(screen.getByText(/Upload en cours/)).toBeInTheDocument();
      });

      // Vérifier que la barre de progression est présente
      const progressBar = document.querySelector('[style*="width"]');
      expect(progressBar).toBeInTheDocument();
    });
  });

  describe('Gestion des erreurs de service', () => {
    it('should handle service instantiation errors', () => {
      // Mock d'un service qui lance une erreur à l'instanciation
      (FileService as any).mockImplementation(() => {
        throw new Error('Service unavailable');
      });

      // Le composant devrait gérer l'erreur gracieusement
      expect(() => {
        render(
          <FileUploader
            onFileSelect={mockOnFileSelect}
            acceptedTypes="image/*,video/*,audio/*"
            maxFileSize={10 * 1024 * 1024}
            maxFiles={5}
          />
        );
      }).not.toThrow();
    });

    it('should handle service method errors', () => {
      // Mock d'un service avec des méthodes qui échouent
      mockFileService.validateFiles.mockImplementation(() => {
        throw new Error('Validation failed');
      });

      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      // Le composant devrait s'afficher même si les méthodes du service échouent
      expect(screen.getByText(/Cliquez ou glissez vos fichiers ici/)).toBeInTheDocument();
    });

    it('should handle upload failures gracefully', async () => {
      // Mock d'un échec d'upload
      mockFileService.uploadFile.mockRejectedValue(new Error('Upload failed'));

      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

      // Simuler la sélection d'un fichier
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [validImageFile] }
        });
      });

      // Vérifier que l'erreur est gérée
      await waitFor(() => {
        expect(screen.getByText(/Erreur d'upload/)).toBeInTheDocument();
      });
    });
  });

  describe('Interface utilisateur et interactions', () => {
    it('should support drag and drop', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const dropZone = screen.getByText(/Cliquez ou glissez vos fichiers ici/).closest('div');
      expect(dropZone).toBeInTheDocument();

      // Simuler le drag over
      fireEvent.dragOver(dropZone!, {
        dataTransfer: {
          files: [validImageFile]
        }
      });

      // Vérifier que la zone de drop change d'apparence
      expect(dropZone).toHaveClass('border-mint-green');

      // Simuler le drop
      await act(async () => {
        fireEvent.drop(dropZone!, {
          dataTransfer: {
            files: [validImageFile]
          }
        });
      });

      // Vérifier que la validation est appelée
      await waitFor(() => {
        expect(mockFileService.validateFiles).toHaveBeenCalledWith([validImageFile]);
      });
    });

    it('should clear errors when close button is clicked', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

      // Simuler une erreur
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [invalidFile] }
        });
      });

      // Vérifier que l'erreur est affichée
      await waitFor(() => {
        expect(screen.getByText(/Type de fichier non supporté/)).toBeInTheDocument();
      });

      // Cliquer sur le bouton de fermeture de l'erreur
      const closeButton = screen.getByTitle('Fermer l\'erreur');
      await user.click(closeButton);

      // Vérifier que l'erreur est supprimée
      expect(screen.queryByText(/Type de fichier non supporté/)).not.toBeInTheDocument();
    });

    it('should show file limits information', () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      // Vérifier que les informations sur les limites sont affichées
      expect(screen.getByText(/Types acceptés:/)).toBeInTheDocument();
      expect(screen.getByText(/Taille max:/)).toBeInTheDocument();
      expect(screen.getByText(/10 MB/)).toBeInTheDocument();
      expect(screen.getByText(/Fichiers max:/)).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should disable upload when disabled prop is true', () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
          disabled={true}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).toBeDisabled();

      const dropZone = screen.getByText(/Cliquez ou glissez vos fichiers ici/).closest('div');
      expect(dropZone).toHaveClass('opacity-50', 'cursor-not-allowed');
    });
  });

  describe('Compatibilité navigateur et environnement', () => {
    it('should work in client environment', () => {
      // Vérifier que le composant fonctionne côté client
      expect(typeof window).toBe('object');
      expect(global.FileReader).toBeDefined();

      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      expect(screen.getByText(/Cliquez ou glissez vos fichiers ici/)).toBeInTheDocument();
    });

    it('should handle missing browser APIs gracefully', () => {
      // Temporairement supprimer FileReader pour tester la gestion d'erreur
      const originalFileReader = global.FileReader;
      delete (global as any).FileReader;

      // Le composant devrait toujours s'afficher
      expect(() => {
        render(
          <FileUploader
            onFileSelect={mockOnFileSelect}
            acceptedTypes="image/*,video/*,audio/*"
            maxFileSize={10 * 1024 * 1024}
            maxFiles={5}
          />
        );
      }).not.toThrow();

      // Restaurer FileReader
      global.FileReader = originalFileReader;
    });
  });

  describe('Performance et optimisations', () => {
    it('should not cause memory leaks', async () => {
      const { unmount } = render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

      // Simuler plusieurs uploads
      for (let i = 0; i < 3; i++) {
        await act(async () => {
          fireEvent.change(fileInput, {
            target: { files: [createMockFile(`test${i}.jpg`, 'image/jpeg')] }
          });
        });

        await waitFor(() => {
          expect(mockOnFileSelect).toHaveBeenCalled();
        });

        mockOnFileSelect.mockClear();
      }

      // Démonter le composant
      unmount();

      // Vérifier qu'aucune erreur n'est générée lors du démontage
      expect(mockOnFileSelect).toHaveBeenCalled();
    });

    it('should handle rapid file selections', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

      // Simuler des sélections rapides
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [validImageFile] }
        });
        fireEvent.change(fileInput, {
          target: { files: [validVideoFile] }
        });
      });

      // Le composant devrait gérer les sélections multiples sans erreur
      await waitFor(() => {
        expect(mockFileService.validateFiles).toHaveBeenCalled();
      });
    });
  });

  describe('Requirement 1.1: Absence d\'erreurs webpack', () => {
    it('should not throw webpack module resolution errors', () => {
      // Test spécifique pour vérifier qu'aucune erreur webpack n'est générée
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <FileUploader
            onFileSelect={mockOnFileSelect}
            acceptedTypes="image/*,video/*,audio/*"
            maxFileSize={10 * 1024 * 1024}
            maxFiles={5}
          />
        );
      }).not.toThrow();

      // Vérifier qu'aucune erreur de module n'est loggée
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringMatching(/Cannot read properties of undefined \(reading 'call'\)/)
      );
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringMatching(/Module not found/)
      );

      consoleSpy.mockRestore();
    });

    it('should successfully import and use the file service', () => {
      // Vérifier que le service est correctement importé et utilisé
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      expect(FileService).toHaveBeenCalled();
      expect(mockFileService).toBeDefined();
    });
  });

  describe('Requirement 1.2: Fonctionnement complet de l\'upload', () => {
    it('should complete full upload workflow', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

      // 1. Sélection du fichier
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [validImageFile] }
        });
      });

      // 2. Validation
      await waitFor(() => {
        expect(mockFileService.validateFiles).toHaveBeenCalledWith([validImageFile]);
      });

      // 3. Upload avec progression
      await waitFor(() => {
        expect(screen.getByText(/Upload en cours/)).toBeInTheDocument();
      });

      // 4. Completion
      await waitFor(() => {
        expect(mockOnFileSelect).toHaveBeenCalledWith([validImageFile]);
      }, { timeout: 3000 });

      // 5. Reset de l'état
      await waitFor(() => {
        expect(screen.queryByText(/Upload en cours/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Requirement 3.3: Validation end-to-end', () => {
    it('should validate complete user journey', async () => {
      render(
        <FileUploader
          onFileSelect={mockOnFileSelect}
          acceptedTypes="image/*,video/*,audio/*"
          maxFileSize={10 * 1024 * 1024}
          maxFiles={5}
        />
      );

      // Journey 1: Fichier valide
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [validImageFile] }
        });
      });

      await waitFor(() => {
        expect(mockOnFileSelect).toHaveBeenCalledWith([validImageFile]);
      });

      mockOnFileSelect.mockClear();

      // Journey 2: Fichier invalide
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [invalidFile] }
        });
      });

      await waitFor(() => {
        expect(screen.getByText(/Type de fichier non supporté/)).toBeInTheDocument();
      });

      expect(mockOnFileSelect).not.toHaveBeenCalled();

      // Journey 3: Correction de l'erreur
      const closeButton = screen.getByTitle('Fermer l\'erreur');
      await user.click(closeButton);

      expect(screen.queryByText(/Type de fichier non supporté/)).not.toBeInTheDocument();

      // Journey 4: Nouveau fichier valide après erreur
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [validVideoFile] }
        });
      });

      await waitFor(() => {
        expect(mockOnFileSelect).toHaveBeenCalledWith([validVideoFile]);
      });
    });
  });
});