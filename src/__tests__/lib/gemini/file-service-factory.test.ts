/**
 * Tests pour le FileServiceFactory
 * Vérifie la détection d'environnement, le lazy loading, les fallbacks et la gestion d'erreurs
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  FileServiceFactory, 
  FileServiceFactoryError,
  createFileService,
  createFileServiceSync,
  detectServiceType,
  getEnvironmentInfo,
  clearServiceCache,
  preloadFileService
} from '../../../lib/gemini/file-service-factory';
import type { IFileService, FileServiceType } from '../../../lib/gemini/file-service-interface';

// Mock des modules
vi.mock('../../../lib/gemini/file-service-client', () => ({
  ClientFileService: vi.fn().mockImplementation(() => ({
    validateFile: vi.fn(),
    uploadFile: vi.fn(),
    uploadFiles: vi.fn(),
    isFileTypeSupported: vi.fn(),
    getSupportedFileTypes: vi.fn(),
    getFileLimits: vi.fn(),
    validateFiles: vi.fn(),
    isAvailable: vi.fn(() => true)
  }))
}));

vi.mock('../../../lib/gemini/file-service', () => ({
  FileService: vi.fn().mockImplementation(() => ({
    validateFile: vi.fn(),
    uploadFile: vi.fn(),
    uploadFiles: vi.fn(),
    isFileTypeSupported: vi.fn(),
    getSupportedFileTypes: vi.fn(),
    getFileLimits: vi.fn(),
    validateFiles: vi.fn()
  }))
}));

// Mock des variables d'environnement
const originalWindow = global.window;
const originalProcess = global.process;

describe('FileServiceFactory', () => {
  let factory: FileServiceFactory;

  beforeEach(() => {
    factory = FileServiceFactory.getInstance();
    clearServiceCache();
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restaurer l'environnement original
    global.window = originalWindow;
    global.process = originalProcess;
    clearServiceCache();
  });

  describe('Détection d\'environnement', () => {
    it('devrait détecter l\'environnement client', () => {
      // Simuler un environnement client
      global.window = { FileReader: vi.fn(), Blob: vi.fn() } as any;
      global.document = {} as any;

      const serviceType = factory.detectServiceType();
      expect(serviceType).toBe('client');
    });

    it('devrait détecter l\'environnement serveur', () => {
      // Simuler un environnement serveur
      delete (global as any).window;
      delete (global as any).document;
      global.process = { env: {} } as any;

      const serviceType = factory.detectServiceType();
      expect(serviceType).toBe('server');
    });

    it('devrait privilégier client en cas d\'environnement indéterminé', () => {
      // Environnement ambigu
      delete (global as any).window;
      delete (global as any).document;
      delete (global as any).process;

      const serviceType = factory.detectServiceType();
      expect(serviceType).toBe('client');
    });
  });

  describe('Création de services', () => {
    beforeEach(() => {
      // Simuler un environnement client par défaut
      global.window = { FileReader: vi.fn(), Blob: vi.fn() } as any;
      global.document = {} as any;
    });

    it('devrait créer un service client en mode auto', async () => {
      const service = await factory.createService('auto');
      expect(service).toBeDefined();
      expect(typeof service.validateFile).toBe('function');
    });

    it('devrait créer un service client explicitement', async () => {
      const service = await factory.createService('client');
      expect(service).toBeDefined();
      expect(typeof service.uploadFile).toBe('function');
    });

    it('devrait utiliser le cache pour éviter les rechargements', async () => {
      const service1 = await factory.createService('client');
      const service2 = await factory.createService('client');
      
      // Devrait être la même instance grâce au cache
      expect(service1).toBe(service2);
    });

    it('devrait gérer les options de configuration', async () => {
      const options = {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        debug: true
      };

      const service = await factory.createService('client', options);
      expect(service).toBeDefined();
    });
  });

  describe('Gestion des erreurs et fallbacks', () => {
    it('devrait lancer une erreur pour un type de service non supporté', async () => {
      await expect(
        factory.createService('invalid' as FileServiceType)
      ).rejects.toThrow(FileServiceFactoryError);
    });

    it('devrait gérer le timeout de chargement', async () => {
      // Mock d'un import qui prend trop de temps
      vi.doMock('../../../lib/gemini/file-service-client', () => {
        return new Promise(resolve => {
          setTimeout(() => resolve({ ClientFileService: vi.fn() }), 2000);
        });
      });

      await expect(
        factory.createService('client', { loadTimeout: 100 })
      ).rejects.toThrow('Timeout');
    });

    it('devrait tenter un fallback en cas d\'échec', async () => {
      // Simuler un environnement mixte
      global.window = { FileReader: vi.fn(), Blob: vi.fn() } as any;
      global.process = { env: { GEMINI_API_KEY: 'test-key' } } as any;

      // Mock d'un échec du service client
      vi.doMock('../../../lib/gemini/file-service-client', () => {
        throw new Error('Client service failed');
      });

      // Le fallback vers serveur devrait fonctionner
      const service = await factory.createService('client');
      expect(service).toBeDefined();
    });
  });

  describe('Mode synchrone', () => {
    it('devrait retourner un service depuis le cache', async () => {
      // Charger d'abord le service de manière asynchrone
      await factory.createService('client');

      // Puis l'obtenir de manière synchrone
      const service = factory.createServiceSync('client');
      expect(service).toBeDefined();
    });

    it('devrait lancer une erreur si le service n\'est pas en cache', () => {
      expect(() => {
        factory.createServiceSync('client');
      }).toThrow('Service non disponible en mode synchrone');
    });
  });

  describe('Informations d\'environnement', () => {
    it('devrait retourner les bonnes informations d\'environnement client', () => {
      global.window = { FileReader: vi.fn(), Blob: vi.fn() } as any;

      const envInfo = factory.getEnvironmentInfo();
      expect(envInfo.isClient).toBe(true);
      expect(envInfo.isServer).toBe(false);
      expect(envInfo.hasFileReader).toBe(true);
      expect(envInfo.hasBlob).toBe(true);
    });

    it('devrait retourner les bonnes informations d\'environnement serveur', () => {
      delete (global as any).window;

      const envInfo = factory.getEnvironmentInfo();
      expect(envInfo.isClient).toBe(false);
      expect(envInfo.isServer).toBe(true);
      expect(envInfo.hasFileReader).toBe(false);
      expect(envInfo.hasBlob).toBe(false);
    });
  });

  describe('Gestion du cache', () => {
    beforeEach(() => {
      global.window = { FileReader: vi.fn(), Blob: vi.fn() } as any;
    });

    it('devrait vérifier si un service est en cache', async () => {
      expect(factory.isServiceCached('client')).toBe(false);
      
      await factory.createService('client');
      
      expect(factory.isServiceCached('client')).toBe(true);
    });

    it('devrait nettoyer le cache', async () => {
      await factory.createService('client');
      expect(factory.isServiceCached('client')).toBe(true);
      
      factory.clearCache();
      expect(factory.isServiceCached('client')).toBe(false);
    });

    it('devrait précharger un service', async () => {
      expect(factory.isServiceCached('client')).toBe(false);
      
      await factory.preloadService('client');
      
      expect(factory.isServiceCached('client')).toBe(true);
    });
  });

  describe('Validation d\'interface', () => {
    it('devrait valider qu\'un service implémente IFileService', async () => {
      const service = await factory.createService('client');
      
      // Vérifier que toutes les méthodes requises sont présentes
      expect(typeof service.validateFile).toBe('function');
      expect(typeof service.uploadFile).toBe('function');
      expect(typeof service.uploadFiles).toBe('function');
      expect(typeof service.isFileTypeSupported).toBe('function');
      expect(typeof service.getSupportedFileTypes).toBe('function');
      expect(typeof service.getFileLimits).toBe('function');
      expect(typeof service.validateFiles).toBe('function');
    });

    it('devrait rejeter un service qui n\'implémente pas l\'interface', async () => {
      // Mock d'un service invalide
      vi.doMock('../../../lib/gemini/file-service-client', () => ({
        ClientFileService: vi.fn().mockImplementation(() => ({
          // Méthodes manquantes
          validateFile: vi.fn()
        }))
      }));

      await expect(
        factory.createService('client')
      ).rejects.toThrow('ne respecte pas l\'interface IFileService');
    });
  });

  describe('Singleton pattern', () => {
    it('devrait retourner la même instance', () => {
      const factory1 = FileServiceFactory.getInstance();
      const factory2 = FileServiceFactory.getInstance();
      
      expect(factory1).toBe(factory2);
    });
  });
});

describe('Fonctions utilitaires', () => {
  beforeEach(() => {
    global.window = { FileReader: vi.fn(), Blob: vi.fn() } as any;
    clearServiceCache();
  });

  afterEach(() => {
    global.window = originalWindow;
    clearServiceCache();
  });

  describe('createFileService', () => {
    it('devrait créer un service avec les paramètres par défaut', async () => {
      const service = await createFileService();
      expect(service).toBeDefined();
    });

    it('devrait créer un service avec des options', async () => {
      const service = await createFileService('client', { debug: true });
      expect(service).toBeDefined();
    });
  });

  describe('createFileServiceSync', () => {
    it('devrait créer un service synchrone depuis le cache', async () => {
      // Charger d'abord
      await createFileService('client');
      
      // Puis obtenir de manière synchrone
      const service = createFileServiceSync('client');
      expect(service).toBeDefined();
    });
  });

  describe('detectServiceType', () => {
    it('devrait détecter le type de service', () => {
      const type = detectServiceType();
      expect(['client', 'server']).toContain(type);
    });
  });

  describe('getEnvironmentInfo', () => {
    it('devrait retourner les informations d\'environnement', () => {
      const info = getEnvironmentInfo();
      expect(info).toHaveProperty('isClient');
      expect(info).toHaveProperty('isServer');
      expect(info).toHaveProperty('hasFileReader');
      expect(info).toHaveProperty('hasBlob');
    });
  });

  describe('preloadFileService', () => {
    it('devrait précharger un service', async () => {
      await preloadFileService('client');
      
      // Vérifier que le service est maintenant en cache
      const service = createFileServiceSync('client');
      expect(service).toBeDefined();
    });

    it('devrait gérer les erreurs de préchargement silencieusement', async () => {
      // Mock d'un échec de chargement
      vi.doMock('../../../lib/gemini/file-service-client', () => {
        throw new Error('Preload failed');
      });

      // Ne devrait pas lancer d'erreur
      await expect(preloadFileService('client')).resolves.toBeUndefined();
    });
  });
});

describe('FileServiceFactoryError', () => {
  it('devrait créer une erreur avec code', () => {
    const error = new FileServiceFactoryError('Test message', 'TEST_CODE');
    
    expect(error.message).toBe('Test message');
    expect(error.code).toBe('TEST_CODE');
    expect(error.name).toBe('FileServiceFactoryError');
    expect(error instanceof Error).toBe(true);
  });
});

describe('Scénarios d\'intégration', () => {
  beforeEach(() => {
    clearServiceCache();
  });

  afterEach(() => {
    global.window = originalWindow;
    global.process = originalProcess;
  });

  it('devrait gérer un scénario client complet', async () => {
    // Simuler environnement client
    global.window = { FileReader: vi.fn(), Blob: vi.fn() } as any;
    global.document = {} as any;

    const factory = FileServiceFactory.getInstance();
    
    // Détecter le type
    const type = factory.detectServiceType();
    expect(type).toBe('client');
    
    // Créer le service
    const service = await factory.createService(type);
    expect(service).toBeDefined();
    
    // Vérifier qu'il est en cache
    expect(factory.isServiceCached(type)).toBe(true);
    
    // Obtenir depuis le cache
    const cachedService = factory.createServiceSync(type);
    expect(cachedService).toBe(service);
  });

  it('devrait gérer un scénario serveur complet', async () => {
    // Simuler environnement serveur
    delete (global as any).window;
    delete (global as any).document;
    global.process = { env: { GEMINI_API_KEY: 'test-key' } } as any;

    const factory = FileServiceFactory.getInstance();
    
    // Détecter le type
    const type = factory.detectServiceType();
    expect(type).toBe('server');
    
    // Créer le service
    const service = await factory.createService(type, { 
      apiKey: 'test-key' 
    });
    expect(service).toBeDefined();
  });

  it('devrait gérer les chargements concurrents', async () => {
    global.window = { FileReader: vi.fn(), Blob: vi.fn() } as any;

    const factory = FileServiceFactory.getInstance();
    
    // Lancer plusieurs chargements en parallèle
    const promises = [
      factory.createService('client'),
      factory.createService('client'),
      factory.createService('client')
    ];
    
    const services = await Promise.all(promises);
    
    // Tous devraient être la même instance
    expect(services[0]).toBe(services[1]);
    expect(services[1]).toBe(services[2]);
  });
});