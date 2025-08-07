/**
 * Vérification de compatibilité des implémentations avec l'interface IFileService
 * Ce fichier sert à valider que les implémentations existantes sont compatibles
 */

import { IFileService, isFileService } from './file-service-interface';
import { ClientFileService } from './file-service-client';
import { FileService } from './file-service';

/**
 * Fonction utilitaire pour vérifier qu'un service implémente correctement l'interface
 */
export function validateServiceImplementation(service: any): service is IFileService {
  return isFileService(service);
}

/**
 * Exemple d'utilisation polymorphe des services
 */
export function useFileService(service: IFileService, file: File) {
  // Validation
  const validation = service.validateFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Informations sur les limites
  const limits = service.getFileLimits();
  console.log(`Taille max: ${limits.maxFileSizeFormatted}`);

  // Types supportés
  const supportedTypes = service.getSupportedFileTypes();
  console.log(`Types supportés: ${supportedTypes}`);

  // Upload (retourne une Promise)
  return service.uploadFile(file);
}

/**
 * Test de compatibilité des implémentations
 */
export function testCompatibility() {
  // Test ClientFileService
  if (typeof window !== 'undefined') {
    const clientService = new ClientFileService();
    const isClientCompatible = validateServiceImplementation(clientService);
    console.log('ClientFileService compatible:', isClientCompatible);
  }

  // Test FileService
  const serverService = new FileService('test-key');
  const isServerCompatible = validateServiceImplementation(serverService);
  console.log('FileService compatible:', isServerCompatible);

  return {
    clientCompatible: typeof window !== 'undefined' ? validateServiceImplementation(new ClientFileService()) : true,
    serverCompatible: validateServiceImplementation(new FileService('test-key'))
  };
}