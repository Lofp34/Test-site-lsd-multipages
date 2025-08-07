/**
 * Tests de compatibilité pour l'interface IFileService
 * Vérifie que les implémentations existantes sont compatibles avec l'interface commune
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  IFileService, 
  isFileService, 
  FileErrorCode,
  formatFileSize,
  generateFileId,
  isClientEnvironment,
  isServerEnvironment,
  FILE_SERVICE_DEFAULTS
} from '@/lib/gemini/file-service-interface';
import { ClientFileService } from '@/lib/gemini/file-service-client';
import { FileService } from '@/lib/gemini/file-service';

// Mock des APIs navigateur pour les tests
const mockFileReader = {
  readAsDataURL: vi.fn(),
  result: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A',
  onload: null as any,
  onerror: null as any,
  onabort: null as any
};

// Mock global pour FileReader
(global as any).FileReader = vi.fn(() => mockFileReader);

// Mock global pour window
Object.defineProperty(global, 'window', {
  value: {
    FileReader: (global as any).FileReader,
    Blob: class MockBlob {
      constructor(public parts: any[], public options?: any) {}
    }
  },
  writable: true
});

describe('Interface IFileService', () => {
  let clientService: ClientFileService;
  let serverService: FileService;

  beforeEach(() => {
    clientService = new ClientFileService();
    serverService = new FileService('test-api-key');
    vi.clearAllMocks();
  });

  describe('Compatibilité des implémentations', () => {
    it('ClientFileService devrait implémenter IFileService', () => {
      expect(isFileService(clientService)).toBe(true);
    });

    it('FileService devrait implémenter IFileService', () => {
      expect(isFileService(serverService)).toBe(true);
    });

    it('Un objet vide ne devrait pas implémenter IFileService', () => {
      expect(isFileService({})).toBe(false);
      expect(isFileService(null)).toBe(false);
      expect(isFileService(undefined)).toBe(false);
    });
  });

  describe('Méthodes communes requises', () => {
    const testFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });

    it('validateFile devrait fonctionner sur les deux implémentations', () => {
      const clientResult = clientService.validateFile(testFile);
      const serverResult = serverService.validateFile(testFile);

      expect(clientResult).toHaveProperty('isValid');
      expect(serverResult).toHaveProperty('isValid');
      expect(typeof clientResult.isValid).toBe('boolean');
      expect(typeof serverResult.isValid).toBe('boolean');
    });

    it('isFileTypeSupported devrait fonctionner sur les deux implémentations', () => {
      const clientResult = clientService.isFileTypeSupported('image/jpeg');
      const serverResult = serverService.isFileTypeSupported('image/jpeg');

      expect(typeof clientResult).toBe('boolean');
      expect(typeof serverResult).toBe('boolean');
      expect(clientResult).toBe(true);
      expect(serverResult).toBe(true);
    });

    it('getSupportedFileTypes devrait fonctionner sur les deux implémentations', () => {
      const clientResult = clientService.getSupportedFileTypes();
      const serverResult = serverService.getSupportedFileTypes();

      expect(typeof clientResult).toBe('string');
      expect(typeof serverResult).toBe('string');
      expect(clientResult).toContain('image/*');
      expect(serverResult).toContain('image/*');
    });

    it('getFileLimits devrait fonctionner sur les deux implémentations', () => {
      const clientResult = clientService.getFileLimits();
      const serverResult = serverService.getFileLimits();

      expect(clientResult).toHaveProperty('maxFileSize');
      expect(clientResult).toHaveProperty('maxFileSizeFormatted');
      expect(clientResult).toHaveProperty('supportedTypes');
      expect(clientResult).toHaveProperty('supportedTypesForInput');

      expect(serverResult).toHaveProperty('maxFileSize');
      expect(serverResult).toHaveProperty('maxFileSizeFormatted');
      expect(serverResult).toHaveProperty('supportedTypes');
      expect(serverResult).toHaveProperty('supportedTypesForInput');
    });

    it('validateFiles devrait fonctionner sur les deux implémentations', () => {
      const files = [testFile];
      const clientResult = clientService.validateFiles(files);
      const serverResult = serverService.validateFiles(files);

      expect(clientResult).toHaveProperty('valid');
      expect(clientResult).toHaveProperty('invalid');
      expect(serverResult).toHaveProperty('valid');
      expect(serverResult).toHaveProperty('invalid');

      expect(Array.isArray(clientResult.valid)).toBe(true);
      expect(Array.isArray(clientResult.invalid)).toBe(true);
      expect(Array.isArray(serverResult.valid)).toBe(true);
      expect(Array.isArray(serverResult.invalid)).toBe(true);
    });
  });

  describe('Méthodes optionnelles', () => {
    it('ClientFileService devrait avoir les méthodes optionnelles', () => {
      expect(typeof clientService.isAvailable).toBe('function');
      expect(typeof clientService.getEnvironmentInfo).toBe('function');
    });

    it('FileService peut ne pas avoir les méthodes optionnelles', () => {
      // Ces méthodes sont optionnelles, donc on vérifie juste qu'elles n'existent pas ou sont des fonctions
      if ('isAvailable' in serverService) {
        expect(typeof serverService.isAvailable).toBe('function');
      }
      if ('getEnvironmentInfo' in serverService) {
        expect(typeof serverService.getEnvironmentInfo).toBe('function');
      }
    });
  });

  describe('Fonctions utilitaires', () => {
    it('formatFileSize devrait formater correctement les tailles', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
    });

    it('generateFileId devrait générer des IDs uniques', () => {
      const id1 = generateFileId();
      const id2 = generateFileId();

      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^file_\d+_[a-z0-9]+$/);
    });

    it('isClientEnvironment devrait détecter l\'environnement client', () => {
      // Dans les tests, window est défini
      expect(isClientEnvironment()).toBe(true);
    });

    it('isServerEnvironment devrait détecter l\'environnement serveur', () => {
      // Dans les tests, window est défini donc ce n'est pas un environnement serveur
      expect(isServerEnvironment()).toBe(false);
    });
  });

  describe('Constantes par défaut', () => {
    it('FILE_SERVICE_DEFAULTS devrait contenir les bonnes valeurs', () => {
      expect(FILE_SERVICE_DEFAULTS.MAX_FILE_SIZE).toBe(10 * 1024 * 1024);
      expect(FILE_SERVICE_DEFAULTS.INPUT_ACCEPT).toBe('image/*,video/*,audio/*');
      expect(FILE_SERVICE_DEFAULTS.UPLOAD_TIMEOUT).toBe(30000);
      expect(Array.isArray(FILE_SERVICE_DEFAULTS.SUPPORTED_TYPES)).toBe(true);
      expect(FILE_SERVICE_DEFAULTS.SUPPORTED_TYPES.length).toBeGreaterThan(0);
    });
  });

  describe('Codes d\'erreur', () => {
    it('FileErrorCode devrait contenir tous les codes nécessaires', () => {
      expect(FileErrorCode.FILE_TOO_LARGE).toBe('file_too_large');
      expect(FileErrorCode.UNSUPPORTED_TYPE).toBe('unsupported_type');
      expect(FileErrorCode.INVALID_FILE).toBe('invalid_file');
      expect(FileErrorCode.UPLOAD_FAILED).toBe('upload_failed');
      expect(FileErrorCode.BROWSER_NOT_SUPPORTED).toBe('browser_not_supported');
      expect(FileErrorCode.NETWORK_ERROR).toBe('network_error');
      expect(FileErrorCode.QUOTA_EXCEEDED).toBe('quota_exceeded');
    });
  });
});