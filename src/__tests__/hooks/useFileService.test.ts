/**
 * Tests pour le hook useFileService
 * Teste la gestion d'état, les erreurs, le loading et les optimisations de performance
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useFileService, useFileValidation, useFileUpload, useFileServiceInfo } from '@/hooks/useFileService';
import type { IFileService, FileValidationResult, UploadedFile } from '@/lib/gemini/file-service-interface';
import * as fileServiceFactory from '@/lib/gemini/file-service-factory';

// ===== MOCKS =====

// Mock du factory
jest.mock('@/lib/gemini/file-service-factory', () => ({
  createFileService: jest.fn(),
  detectServiceType: jest.fn(() => 'client'),
  getEnvironmentInfo: jest.fn(() => ({
    isClient: true,
    isServer: false,
    hasFileReader: true,
    hasBlob: true
  }))
}));

// Mock du service de fichiers
const mockFileService: jest.Mocked<IFileService> = {
  validateFile: jest.fn(),
  validateFiles: jest.fn(),
  isFileTypeSupported: jest.fn(),
  uploadFile: jest.fn(),
  uploadFiles: jest.fn(),
  getSupportedFileTypes: jest.fn(() => 'image/*,video/*,audio/*'),
  getFileLimits: jest.fn(() => ({
    maxFileSize: 10485760,
    maxFileSizeFormatted: '10 MB',
    supportedTypes: ['image/jpeg', 'image/png'],
    supportedTypesForInput: 'image/*,video/*,audio/*'
  }))
};

// Fichier de test
const createTestFile = (name = 'test.jpg', type = 'image/jpeg', size = 1024): File => {
  const file = new File(['test content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('useFileService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fileServiceFactory.createFileService as jest.Mock).mockResolvedValue(mockFileService);
  });

  describe('État initial et chargement', () => {
    it('devrait avoir un état initial correct', () => {
      const { result } = renderHook(() => useFileService({ disableAutoLoad: true }));

      expect(result.current.service).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.serviceType).toBe('client');
      expect(result.current.isReady).toBe(false);
    });

    it('devrait charger le service automatiquement par défaut', async () => {
      const { result } = renderHook(() => useFileService());

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      expect(result.current.service).toBe(mockFileService);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('devrait respecter disableAutoLoad', () => {
      const { result } = renderHook(() => useFileService({ disableAutoLoad: true }));

      expect(result.current.isLoading).toBe(false);
      expect(result.current.service).toBeNull();
      expect(fileServiceFactory.createFileService).not.toHaveBeenCalled();
    });

    it('devrait appeler onServiceLoaded quand le service est chargé', async () => {
      const onServiceLoaded = jest.fn();
      
      renderHook(() => useFileService({ onServiceLoaded }));

      await waitFor(() => {
        expect(onServiceLoaded).toHaveBeenCalledWith(mockFileService);
      });
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait gérer les erreurs de chargement', async () => {
      const error = new Error('Erreur de chargement');
      (fileServiceFactory.createFileService as jest.Mock).mockRejectedValue(error);
      
      const onLoadError = jest.fn();
      const { result } = renderHook(() => useFileService({ onLoadError }));

      await waitFor(() => {
        expect(result.current.error).toBe(error);
      });

      expect(result.current.service).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isReady).toBe(false);
      expect(onLoadError).toHaveBeenCalledWith(error);
    });

    it('devrait permettre de réessayer après une erreur', async () => {
      const error = new Error('Erreur temporaire');
      (fileServiceFactory.createFileService as jest.Mock)
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce(mockFileService);

      const { result } = renderHook(() => useFileService());

      // Attendre l'erreur
      await waitFor(() => {
        expect(result.current.error).toBe(error);
      });

      // Réessayer
      await act(async () => {
        await result.current.retry();
      });

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      expect(result.current.service).toBe(mockFileService);
      expect(result.current.error).toBeNull();
    });

    it('devrait respecter le nombre maximum de tentatives', async () => {
      const error = new Error('Erreur persistante');
      (fileServiceFactory.createFileService as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useFileService({ retryAttempts: 2, retryDelay: 10 }));

      // Attendre l'erreur initiale
      await waitFor(() => {
        expect(result.current.error).toBe(error);
      });

      // Première tentative
      await act(async () => {
        await result.current.retry();
      });

      // Deuxième tentative
      await act(async () => {
        await result.current.retry();
      });

      // Troisième tentative ne devrait pas se faire
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      await act(async () => {
        await result.current.retry();
      });

      expect(consoleSpy).toHaveBeenCalledWith('Nombre maximum de tentatives atteint (2)');
      consoleSpy.mockRestore();
    });
  });

  describe('Méthodes de validation', () => {
    it('devrait valider un fichier correctement', async () => {
      const validationResult: FileValidationResult = { isValid: true };
      mockFileService.validateFile.mockReturnValue(validationResult);

      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      const file = createTestFile();
      const result_validation = result.current.validateFile(file);

      expect(result_validation).toBe(validationResult);
      expect(mockFileService.validateFile).toHaveBeenCalledWith(file);
    });

    it('devrait retourner null si le service n\'est pas prêt', () => {
      const { result } = renderHook(() => useFileService({ disableAutoLoad: true }));

      const file = createTestFile();
      const validation = result.current.validateFile(file);

      expect(validation).toBeNull();
      expect(mockFileService.validateFile).not.toHaveBeenCalled();
    });

    it('devrait gérer les erreurs de validation', async () => {
      mockFileService.validateFile.mockImplementation(() => {
        throw new Error('Erreur de validation');
      });

      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      const file = createTestFile();
      const validation = result.current.validateFile(file);

      expect(validation).toEqual({
        isValid: false,
        error: 'Erreur de validation'
      });
    });

    it('devrait valider plusieurs fichiers', async () => {
      const validationResults = {
        valid: [createTestFile('valid.jpg')],
        invalid: [{ file: createTestFile('invalid.txt'), error: 'Type non supporté' }]
      };
      mockFileService.validateFiles.mockReturnValue(validationResults);

      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      const files = [createTestFile('file1.jpg'), createTestFile('file2.txt')];
      const results = result.current.validateFiles(files);

      expect(results).toBe(validationResults);
      expect(mockFileService.validateFiles).toHaveBeenCalledWith(files);
    });

    it('devrait vérifier si un type MIME est supporté', async () => {
      mockFileService.isFileTypeSupported.mockReturnValue(true);

      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      const isSupported = result.current.isFileTypeSupported('image/jpeg');

      expect(isSupported).toBe(true);
      expect(mockFileService.isFileTypeSupported).toHaveBeenCalledWith('image/jpeg');
    });
  });

  describe('Méthodes d\'upload', () => {
    it('devrait uploader un fichier', async () => {
      const uploadedFile: UploadedFile = {
        id: 'file123',
        name: 'test.jpg',
        uri: 'data:image/jpeg;base64,abc123',
        mimeType: 'image/jpeg',
        size: 1024,
        uploadedAt: new Date()
      };
      mockFileService.uploadFile.mockResolvedValue(uploadedFile);

      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      const file = createTestFile();
      const uploaded = await result.current.uploadFile(file);

      expect(uploaded).toBe(uploadedFile);
      expect(mockFileService.uploadFile).toHaveBeenCalledWith(file);
    });

    it('devrait retourner null si le service n\'est pas prêt pour l\'upload', async () => {
      const { result } = renderHook(() => useFileService({ disableAutoLoad: true }));

      const file = createTestFile();
      const uploaded = await result.current.uploadFile(file);

      expect(uploaded).toBeNull();
      expect(mockFileService.uploadFile).not.toHaveBeenCalled();
    });

    it('devrait propager les erreurs d\'upload', async () => {
      const error = new Error('Erreur d\'upload');
      mockFileService.uploadFile.mockRejectedValue(error);

      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      const file = createTestFile();
      
      await expect(result.current.uploadFile(file)).rejects.toThrow('Erreur d\'upload');
    });

    it('devrait uploader plusieurs fichiers', async () => {
      const uploadedFiles: UploadedFile[] = [
        {
          id: 'file1',
          name: 'test1.jpg',
          uri: 'data:image/jpeg;base64,abc123',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        }
      ];
      mockFileService.uploadFiles.mockResolvedValue(uploadedFiles);

      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      const files = [createTestFile()];
      const uploaded = await result.current.uploadFiles(files);

      expect(uploaded).toBe(uploadedFiles);
      expect(mockFileService.uploadFiles).toHaveBeenCalledWith(files);
    });
  });

  describe('Méthodes d\'information', () => {
    it('devrait retourner les types supportés', async () => {
      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      expect(result.current.getSupportedFileTypes).toBe('image/*,video/*,audio/*');
    });

    it('devrait retourner les limites de fichiers', async () => {
      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      const limits = result.current.getFileLimits;
      expect(limits).toEqual({
        maxFileSize: 10485760,
        maxFileSizeFormatted: '10 MB',
        supportedTypes: ['image/jpeg', 'image/png'],
        supportedTypesForInput: 'image/*,video/*,audio/*'
      });
    });

    it('devrait retourner null pour les limites si le service n\'est pas prêt', () => {
      const { result } = renderHook(() => useFileService({ disableAutoLoad: true }));

      expect(result.current.getFileLimits).toBeNull();
    });
  });

  describe('Méthodes de contrôle', () => {
    it('devrait permettre de recharger le service', async () => {
      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      // Simuler un nouveau service
      const newMockService = { ...mockFileService };
      (fileServiceFactory.createFileService as jest.Mock).mockResolvedValue(newMockService);

      await act(async () => {
        await result.current.reloadService();
      });

      expect(result.current.service).toBe(newMockService);
    });

    it('devrait permettre de nettoyer l\'état', async () => {
      const { result } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      act(() => {
        result.current.cleanup();
      });

      expect(result.current.service).toBeNull();
      expect(result.current.isReady).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('Optimisations de performance', () => {
    it('ne devrait pas recréer les fonctions à chaque render', async () => {
      const { result, rerender } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      const firstRenderFunctions = {
        validateFile: result.current.validateFile,
        uploadFile: result.current.uploadFile,
        reloadService: result.current.reloadService
      };

      rerender();

      expect(result.current.validateFile).toBe(firstRenderFunctions.validateFile);
      expect(result.current.uploadFile).toBe(firstRenderFunctions.uploadFile);
      expect(result.current.reloadService).toBe(firstRenderFunctions.reloadService);
    });

    it('devrait memoizer les valeurs calculées', async () => {
      const { result, rerender } = renderHook(() => useFileService());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      const firstSupportedTypes = result.current.getSupportedFileTypes;
      const firstLimits = result.current.getFileLimits;

      rerender();

      expect(result.current.getSupportedFileTypes).toBe(firstSupportedTypes);
      expect(result.current.getFileLimits).toBe(firstLimits);
    });
  });
});

describe('Hooks utilitaires', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fileServiceFactory.createFileService as jest.Mock).mockResolvedValue(mockFileService);
  });

  describe('useFileValidation', () => {
    it('devrait exposer uniquement les méthodes de validation', async () => {
      const { result } = renderHook(() => useFileValidation());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      expect(result.current).toHaveProperty('validateFile');
      expect(result.current).toHaveProperty('validateFiles');
      expect(result.current).toHaveProperty('isFileTypeSupported');
      expect(result.current).toHaveProperty('getSupportedFileTypes');
      expect(result.current).toHaveProperty('getFileLimits');
      expect(result.current).toHaveProperty('isReady');

      // Ne devrait pas avoir les méthodes d'upload
      expect(result.current).not.toHaveProperty('uploadFile');
      expect(result.current).not.toHaveProperty('uploadFiles');
    });
  });

  describe('useFileUpload', () => {
    it('devrait exposer uniquement les méthodes d\'upload', async () => {
      const { result } = renderHook(() => useFileUpload());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      expect(result.current).toHaveProperty('uploadFile');
      expect(result.current).toHaveProperty('uploadFiles');
      expect(result.current).toHaveProperty('isReady');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('error');

      // Ne devrait pas avoir les méthodes de validation
      expect(result.current).not.toHaveProperty('validateFile');
      expect(result.current).not.toHaveProperty('validateFiles');
    });
  });

  describe('useFileServiceInfo', () => {
    it('devrait exposer uniquement les informations du service', async () => {
      const { result } = renderHook(() => useFileServiceInfo());

      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });

      expect(result.current).toHaveProperty('serviceType');
      expect(result.current).toHaveProperty('environmentInfo');
      expect(result.current).toHaveProperty('getSupportedFileTypes');
      expect(result.current).toHaveProperty('getFileLimits');
      expect(result.current).toHaveProperty('isReady');

      // Ne devrait pas avoir les méthodes d'action
      expect(result.current).not.toHaveProperty('uploadFile');
      expect(result.current).not.toHaveProperty('validateFile');
    });
  });
});