/**
 * Exemple d'utilisation du hook useFileService
 * Démontre les différentes façons d'utiliser le hook
 */

import React from 'react';
import { useFileService, useFileValidation, useFileUpload } from './useFileService';

// ===== EXEMPLE COMPLET =====

export function FileServiceExample() {
  const {
    service,
    isLoading,
    error,
    isReady,
    validateFile,
    uploadFile,
    getSupportedFileTypes,
    getFileLimits,
    reloadService,
    retry
  } = useFileService({
    serviceType: 'auto',
    onServiceLoaded: (service) => {
      console.log('Service chargé:', service);
    },
    onLoadError: (error) => {
      console.error('Erreur de chargement:', error);
    }
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validation
    const validation = validateFile(file);
    if (!validation?.isValid) {
      alert(`Fichier invalide: ${validation?.error}`);
      return;
    }

    // Upload
    try {
      const uploadedFile = await uploadFile(file);
      if (uploadedFile) {
        console.log('Fichier uploadé:', uploadedFile);
        alert('Fichier uploadé avec succès!');
      }
    } catch (error) {
      console.error('Erreur d\'upload:', error);
      alert('Erreur lors de l\'upload');
    }
  };

  if (isLoading) {
    return <div>Chargement du service de fichiers...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Erreur: {error.message}</p>
        <button onClick={retry}>Réessayer</button>
        <button onClick={reloadService}>Recharger</button>
      </div>
    );
  }

  if (!isReady) {
    return <div>Service non disponible</div>;
  }

  const limits = getFileLimits;
  const supportedTypes = getSupportedFileTypes;

  return (
    <div>
      <h3>Service de fichiers prêt</h3>
      <p>Taille max: {limits?.maxFileSizeFormatted}</p>
      <p>Types supportés: {supportedTypes}</p>
      
      <input
        type="file"
        accept={supportedTypes}
        onChange={handleFileSelect}
      />
      
      <div>
        <button onClick={reloadService}>Recharger le service</button>
      </div>
    </div>
  );
}

// ===== EXEMPLE VALIDATION UNIQUEMENT =====

export function FileValidationExample() {
  const {
    validateFile,
    validateFiles,
    isFileTypeSupported,
    getSupportedFileTypes,
    isReady
  } = useFileValidation();

  const handleValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 1) {
      // Validation d'un seul fichier
      const validation = validateFile(files[0]);
      console.log('Validation:', validation);
    } else if (files.length > 1) {
      // Validation de plusieurs fichiers
      const validations = validateFiles(files);
      console.log('Validations:', validations);
    }
  };

  if (!isReady) {
    return <div>Service de validation non prêt</div>;
  }

  return (
    <div>
      <h3>Validation de fichiers</h3>
      <input
        type="file"
        multiple
        accept={getSupportedFileTypes}
        onChange={handleValidation}
      />
      
      <div>
        <p>JPEG supporté: {isFileTypeSupported('image/jpeg') ? 'Oui' : 'Non'}</p>
        <p>PDF supporté: {isFileTypeSupported('application/pdf') ? 'Oui' : 'Non'}</p>
      </div>
    </div>
  );
}

// ===== EXEMPLE UPLOAD UNIQUEMENT =====

export function FileUploadExample() {
  const {
    uploadFile,
    uploadFiles,
    isReady,
    isLoading,
    error
  } = useFileUpload();

  const [uploading, setUploading] = React.useState(false);

  const handleSingleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadFile(file);
      console.log('Upload réussi:', result);
    } catch (error) {
      console.error('Erreur d\'upload:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleMultipleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const results = await uploadFiles(files);
      console.log('Uploads réussis:', results);
    } catch (error) {
      console.error('Erreur d\'uploads:', error);
    } finally {
      setUploading(false);
    }
  };

  if (!isReady) {
    return <div>Service d'upload non prêt</div>;
  }

  if (error) {
    return <div>Erreur du service: {error.message}</div>;
  }

  return (
    <div>
      <h3>Upload de fichiers</h3>
      
      <div>
        <label>Upload simple:</label>
        <input
          type="file"
          onChange={handleSingleUpload}
          disabled={uploading || isLoading}
        />
      </div>
      
      <div>
        <label>Upload multiple:</label>
        <input
          type="file"
          multiple
          onChange={handleMultipleUpload}
          disabled={uploading || isLoading}
        />
      </div>
      
      {(uploading || isLoading) && <p>Upload en cours...</p>}
    </div>
  );
}

// ===== EXEMPLE AVEC CONFIGURATION AVANCÉE =====

export function AdvancedFileServiceExample() {
  const {
    service,
    serviceType,
    environmentInfo,
    isReady,
    error,
    reloadService
  } = useFileService({
    serviceType: 'client', // Force le service client
    retryAttempts: 5,
    retryDelay: 2000,
    onServiceLoaded: (service) => {
      console.log('Service avancé chargé:', service);
    },
    onLoadError: (error) => {
      console.error('Erreur service avancé:', error);
    }
  });

  if (!isReady) {
    return <div>Configuration avancée en cours...</div>;
  }

  return (
    <div>
      <h3>Configuration avancée</h3>
      <p>Type de service: {serviceType}</p>
      <p>Environnement client: {environmentInfo.isClient ? 'Oui' : 'Non'}</p>
      <p>FileReader disponible: {environmentInfo.hasFileReader ? 'Oui' : 'Non'}</p>
      <p>Blob disponible: {environmentInfo.hasBlob ? 'Oui' : 'Non'}</p>
      
      {error && (
        <div style={{ color: 'red' }}>
          <p>Erreur: {error.message}</p>
          <button onClick={reloadService}>Recharger</button>
        </div>
      )}
      
      <button onClick={reloadService}>
        Recharger le service
      </button>
    </div>
  );
}