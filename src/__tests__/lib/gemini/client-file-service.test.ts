/**
 * Tests unitaires pour ClientFileService
 * Vérifie toutes les méthodes de validation et d'upload
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ClientFileService, FileErrorCode } from '@/lib/gemini/file-service-client';

// Mock des APIs navigateur pour les tests
const mockFileReader = {
  readAsDataURL: vi.fn(),
  result: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A',
  onload: null as any,
  onerror: null as any,
  onabort: null as any
};

// Helper pour créer un mock FileReader avec succès
const createSuccessfulFileReaderMock = () => {
  mockFileReader.result = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A';
  mockFileReader.readAsDataURL = vi.fn().mockImplementation(() => {
    // Résolution immédiate synchrone
    if (mockFileReader.onload) {
      mockFileReader.onload();
    }
  });
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

describe('ClientFileService', () => {
  let service: ClientFileService;

  beforeEach(() => {
    service = new ClientFileService();
    vi.clearAllMocks();
  });

  describe('Constructor et vérifications d\'environnement', () => {
    it('devrait créer une instance sans erreur', () => {
      expect(service).toBeInstanceOf(ClientFileService);
    });

    it('devrait vérifier la disponibilité du service', () => {
      expect(service.isAvailable()).toBe(true);
    });

    it('devrait retourner les informations d\'environnement correctes', () => {
      const envInfo = service.getEnvironmentInfo();
      expect(envInfo.isClient).toBe(true);
      expect(envInfo.isServer).toBe(false);
      expect(envInfo.hasFileReader).toBe(true);
      expect(envInfo.hasBlob).toBe(true);
    });
  });

  describe('Validation de fichiers', () => {
    it('devrait valider un fichier image valide', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const result = service.validateFile(file);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('devrait rejeter un fichier trop volumineux', () => {
      const largeContent = new Array(11 * 1024 * 1024).fill('a').join(''); // 11MB
      const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
      const result = service.validateFile(file);
      
      expect(result.isValid).toBe(false);
      expect(result.errorCode).toBe(FileErrorCode.FILE_TOO_LARGE);
      expect(result.error).toContain('trop volumineux');
    });

    it('devrait rejeter un type de fichier non supporté', () => {
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      const result = service.validateFile(file);
      
      expect(result.isValid).toBe(false);
      expect(result.errorCode).toBe(FileErrorCode.UNSUPPORTED_TYPE);
      expect(result.error).toContain('non supporté');
    });

    it('devrait rejeter un fichier vide', () => {
      const file = new File([], '', { type: 'image/jpeg' });
      const result = service.validateFile(file);
      
      expect(result.isValid).toBe(false);
      expect(result.errorCode).toBe(FileErrorCode.INVALID_FILE);
      expect(result.error).toContain('invalide ou vide');
    });

    it('devrait valider différents types de fichiers supportés', () => {
      const testCases = [
        { name: 'image.png', type: 'image/png' },
        { name: 'video.mp4', type: 'video/mp4' },
        { name: 'audio.mp3', type: 'audio/mpeg' },
        { name: 'image.webp', type: 'image/webp' }
      ];

      testCases.forEach(({ name, type }) => {
        const file = new File(['test'], name, { type });
        const result = service.validateFile(file);
        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('Validation de fichiers multiples', () => {
    it('devrait séparer les fichiers valides et invalides', () => {
      const validFile = new File(['test'], 'valid.jpg', { type: 'image/jpeg' });
      const invalidFile = new File(['test'], 'invalid.txt', { type: 'text/plain' });
      const emptyFile = new File([], '', { type: 'image/jpeg' });
      
      const result = service.validateFiles([validFile, invalidFile, emptyFile]);
      
      expect(result.valid).toHaveLength(1);
      expect(result.valid[0]).toBe(validFile);
      expect(result.invalid).toHaveLength(2);
      expect(result.invalid[0].file).toBe(invalidFile);
      expect(result.invalid[1].file).toBe(emptyFile);
    });

    it('devrait gérer une liste vide', () => {
      const result = service.validateFiles([]);
      expect(result.valid).toHaveLength(0);
      expect(result.invalid).toHaveLength(0);
    });
  });

  describe('Types de fichiers supportés', () => {
    it('devrait retourner true pour les types supportés', () => {
      const supportedTypes = [
        'image/jpeg',
        'image/png',
        'video/mp4',
        'audio/mpeg'
      ];

      supportedTypes.forEach(type => {
        expect(service.isFileTypeSupported(type)).toBe(true);
      });
    });

    it('devrait retourner false pour les types non supportés', () => {
      const unsupportedTypes = [
        'text/plain',
        'application/pdf',
        'application/zip'
      ];

      unsupportedTypes.forEach(type => {
        expect(service.isFileTypeSupported(type)).toBe(false);
      });
    });

    it('devrait retourner la chaîne des types acceptés', () => {
      const acceptedTypes = service.getSupportedFileTypes();
      expect(acceptedTypes).toBe('image/*,video/*,audio/*');
    });
  });

  describe('Limites de fichiers', () => {
    it('devrait retourner les limites correctes', () => {
      const limits = service.getFileLimits();
      
      expect(limits.maxFileSize).toBe(10 * 1024 * 1024); // 10MB
      expect(limits.maxFileSizeFormatted).toBe('10 MB');
      expect(limits.supportedTypes).toBeInstanceOf(Array);
      expect(limits.supportedTypes.length).toBeGreaterThan(0);
      expect(limits.supportedTypesForInput).toBe('image/*,video/*,audio/*');
    });
  });

  describe('Upload de fichiers', () => {
    beforeEach(() => {
      // Setup du mock FileReader pour simuler un upload réussi
      mockFileReader.onload = null;
      mockFileReader.onerror = null;
      mockFileReader.onabort = null;
    });

    it('devrait uploader un fichier valide', async () => {
      const file = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      
      // Mock de la méthode readAsDataURL avec résolution immédiate
      mockFileReader.readAsDataURL = vi.fn().mockImplementation(() => {
        // Résolution immédiate pour éviter les timeouts
        if (mockFileReader.onload) {
          mockFileReader.onload();
        }
      });

      const result = await service.uploadFile(file);
      
      expect(result).toBeDefined();
      expect(result.id).toMatch(/^file_\d+_[a-z0-9]+$/);
      expect(result.name).toBe('test.jpg');
      expect(result.mimeType).toBe('image/jpeg');
      expect(result.size).toBe(file.size);
      expect(result.uri).toMatch(/^data:image\/jpeg;base64,/);
      expect(result.uploadedAt).toBeInstanceOf(Date);
    });

    it('devrait rejeter un fichier invalide', async () => {
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      
      await expect(service.uploadFile(file)).rejects.toThrow('non supporté');
    });

    it('devrait gérer les erreurs de FileReader', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      // Mock pour simuler une erreur de FileReader
      mockFileReader.readAsDataURL = vi.fn().mockImplementation(() => {
        if (mockFileReader.onerror) {
          mockFileReader.onerror();
        }
      });

      await expect(service.uploadFile(file)).rejects.toThrow('Erreur lors de la lecture du fichier');
    });

    it('devrait gérer l\'interruption de FileReader', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      // Mock pour simuler une interruption de FileReader
      mockFileReader.readAsDataURL = vi.fn().mockImplementation(() => {
        if (mockFileReader.onabort) {
          mockFileReader.onabort();
        }
      });

      await expect(service.uploadFile(file)).rejects.toThrow('Lecture du fichier interrompue');
    });

    it('devrait gérer les résultats invalides de FileReader', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      // Mock pour simuler un résultat invalide
      mockFileReader.result = 'invalid-result';
      mockFileReader.readAsDataURL = vi.fn().mockImplementation(() => {
        if (mockFileReader.onload) {
          mockFileReader.onload();
        }
      });

      await expect(service.uploadFile(file)).rejects.toThrow('Impossible de convertir le fichier en base64');
    });

    it('devrait uploader plusieurs fichiers', async () => {
      const files = [
        new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
        new File(['test2'], 'test2.png', { type: 'image/png' })
      ];
      
      // Mock pour les uploads multiples avec résolution immédiate
      createSuccessfulFileReaderMock();

      const results = await service.uploadFiles(files);
      
      expect(results).toHaveLength(2);
      expect(results[0].name).toBe('test1.jpg');
      expect(results[1].name).toBe('test2.png');
    }, 10000); // Timeout plus long au cas où

    it('devrait gérer les erreurs lors de l\'upload multiple', async () => {
      const files = [
        new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
        new File(['test2'], 'test2.txt', { type: 'text/plain' }) // Fichier invalide
      ];

      await expect(service.uploadFiles(files)).rejects.toThrow();
    });

    it('devrait gérer une liste vide pour l\'upload multiple', async () => {
      const results = await service.uploadFiles([]);
      expect(results).toHaveLength(0);
    });
  });

  describe('Gestion des erreurs et cas limites', () => {
    it('devrait gérer les fichiers avec extension mais sans type MIME', () => {
      const file = new File(['test'], 'test.jpg', { type: '' });
      const result = service.validateFile(file);
      
      // Le service devrait valider via l'extension quand le type MIME est vide
      expect(result.isValid).toBe(true);
    });

    it('devrait gérer les fichiers avec type MIME générique', () => {
      const file = new File(['test'], 'test.jpg', { type: 'application/octet-stream' });
      const result = service.validateFile(file);
      
      expect(result.isValid).toBe(true);
    });

    it('devrait rejeter les fichiers avec extension non supportée et type générique', () => {
      const file = new File(['test'], 'test.exe', { type: 'application/octet-stream' });
      const result = service.validateFile(file);
      
      expect(result.isValid).toBe(false);
      expect(result.errorCode).toBe(FileErrorCode.UNSUPPORTED_TYPE);
    });

    it('devrait gérer les fichiers sans extension', () => {
      const file = new File(['test'], 'testfile', { type: 'image/jpeg' });
      const result = service.validateFile(file);
      
      expect(result.isValid).toBe(true);
    });

    it('devrait gérer les types MIME avec casse différente', () => {
      expect(service.isFileTypeSupported('IMAGE/JPEG')).toBe(true);
      expect(service.isFileTypeSupported('Video/MP4')).toBe(true);
    });

    it('devrait gérer les valeurs null et undefined', () => {
      expect(service.isFileTypeSupported('')).toBe(false);
      expect(service.isFileTypeSupported(null as any)).toBe(false);
      expect(service.isFileTypeSupported(undefined as any)).toBe(false);
    });
  });

  describe('Compatibilité environnement', () => {
    it('devrait détecter l\'absence de FileReader', () => {
      // Temporairement supprimer FileReader
      const originalFileReader = (global as any).window.FileReader;
      delete (global as any).window.FileReader;

      expect(() => new ClientFileService()).toThrow('FileReader API non supportée');

      // Restaurer FileReader
      (global as any).window.FileReader = originalFileReader;
    });

    it('devrait détecter l\'absence de Blob', () => {
      // Temporairement supprimer Blob
      const originalBlob = (global as any).window.Blob;
      delete (global as any).window.Blob;

      expect(() => new ClientFileService()).toThrow('Blob API non supportée');

      // Restaurer Blob
      (global as any).window.Blob = originalBlob;
    });

    it('devrait détecter l\'environnement serveur', () => {
      // Temporairement redéfinir window comme undefined
      const originalWindow = (global as any).window;
      (global as any).window = undefined;

      expect(() => new ClientFileService()).toThrow('ne peut être utilisé que côté client');

      // Restaurer window
      (global as any).window = originalWindow;
    });
  });

  describe('Méthodes utilitaires privées (via comportement public)', () => {
    it('devrait formater correctement les tailles de fichiers', () => {
      const limits = service.getFileLimits();
      expect(limits.maxFileSizeFormatted).toBe('10 MB');
    });

    it('devrait générer des IDs uniques pour les fichiers', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      // Mock pour upload réussi
      createSuccessfulFileReaderMock();

      const result1 = await service.uploadFile(file);
      const result2 = await service.uploadFile(file);
      
      expect(result1.id).not.toBe(result2.id);
      expect(result1.id).toMatch(/^file_\d+_[a-z0-9]+$/);
      expect(result2.id).toMatch(/^file_\d+_[a-z0-9]+$/);
    });

    it('devrait détecter correctement les extensions de fichiers', () => {
      // Test via validation de fichiers avec différentes extensions
      const testCases = [
        { name: 'test.JPG', type: '', shouldBeValid: true },
        { name: 'test.mp4', type: '', shouldBeValid: true },
        { name: 'test.MP3', type: '', shouldBeValid: true },
        { name: 'test.unknown', type: '', shouldBeValid: false }
      ];

      testCases.forEach(({ name, type, shouldBeValid }) => {
        const file = new File(['test'], name, { type });
        const result = service.validateFile(file);
        expect(result.isValid).toBe(shouldBeValid);
      });
    });

    it('devrait mapper correctement les extensions vers les types MIME', async () => {
      const file = new File(['test'], 'test.png', { type: '' });
      
      createSuccessfulFileReaderMock();

      const result = await service.uploadFile(file);
      expect(result.mimeType).toBe('image/png');
    });
  });

  describe('Tests de performance et limites', () => {
    it('devrait gérer les fichiers à la limite de taille', () => {
      // Fichier exactement à la limite (10MB)
      const maxSizeContent = new Array(10 * 1024 * 1024).fill('a').join('');
      const file = new File([maxSizeContent], 'max.jpg', { type: 'image/jpeg' });
      const result = service.validateFile(file);
      
      expect(result.isValid).toBe(true);
    });

    it('devrait rejeter les fichiers dépassant la limite d\'un octet', () => {
      // Fichier dépassant la limite de 1 octet
      const oversizeContent = new Array(10 * 1024 * 1024 + 1).fill('a').join('');
      const file = new File([oversizeContent], 'oversize.jpg', { type: 'image/jpeg' });
      const result = service.validateFile(file);
      
      expect(result.isValid).toBe(false);
      expect(result.errorCode).toBe(FileErrorCode.FILE_TOO_LARGE);
    });

    it('devrait gérer un grand nombre de fichiers en validation', () => {
      const files = Array.from({ length: 100 }, (_, i) => 
        new File(['test'], `test${i}.jpg`, { type: 'image/jpeg' })
      );
      
      const result = service.validateFiles(files);
      expect(result.valid).toHaveLength(100);
      expect(result.invalid).toHaveLength(0);
    });
  });

  describe('Intégration et compatibilité', () => {
    it('devrait maintenir la cohérence entre les méthodes de validation', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      // La validation individuelle et multiple doivent être cohérentes
      const singleValidation = service.validateFile(file);
      const multipleValidation = service.validateFiles([file]);
      
      expect(singleValidation.isValid).toBe(true);
      expect(multipleValidation.valid).toContain(file);
      expect(multipleValidation.invalid).toHaveLength(0);
    });

    it('devrait être compatible avec les différents constructeurs de File', () => {
      // Test avec différentes façons de créer un File
      const file1 = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const file2 = new File([new Blob(['content'])], 'test.jpg', { type: 'image/jpeg' });
      
      expect(service.validateFile(file1).isValid).toBe(true);
      expect(service.validateFile(file2).isValid).toBe(true);
    });

    it('devrait gérer les caractères spéciaux dans les noms de fichiers', () => {
      const specialNames = [
        'test-file.jpg',
        'test_file.jpg',
        'test file.jpg',
        'test.file.jpg',
        'tést-filé.jpg',
        '测试.jpg'
      ];

      specialNames.forEach(name => {
        const file = new File(['test'], name, { type: 'image/jpeg' });
        const result = service.validateFile(file);
        expect(result.isValid).toBe(true);
      });
    });
  });
});