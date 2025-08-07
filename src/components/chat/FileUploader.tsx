'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FileUploaderProps, UploadedFile } from '@/lib/gemini/types';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import { useFileService } from '@/hooks/useFileService';

interface FileUploaderState {
  isDragOver: boolean;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  connectionSpeed: 'fast' | 'slow' | 'unknown';
  compressionProgress: number;
  isCompressing: boolean;
  uploadQueue: File[];
  currentUploadIndex: number;
}

export default function FileUploader({
  onFileSelect,
  acceptedTypes,
  maxFileSize,
  maxFiles,
  disabled = false
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<FileUploaderState>({
    isDragOver: false,
    isUploading: false,
    uploadProgress: 0,
    error: null,
    connectionSpeed: 'unknown',
    compressionProgress: 0,
    isCompressing: false,
    uploadQueue: [],
    currentUploadIndex: 0
  });

  // Hook d'optimisation mobile
  const { 
    isMobile, 
    isTablet, 
    orientation,
    getMobileClasses 
  } = useMobileOptimization();

  // Hook pour gérer le FileService avec gestion d'erreurs
  const {
    service: fileService,
    isLoading: serviceLoading,
    error: serviceError,
    isReady: serviceReady,
    validateFiles,
    retry: retryService
  } = useFileService({
    onLoadError: (error) => {
      console.error('Erreur de chargement du FileService:', error);
      setState(prev => ({
        ...prev,
        error: `Erreur de chargement du service: ${error.message}`
      }));
    }
  });

  // Détecter la vitesse de connexion
  useEffect(() => {
    const detectConnectionSpeed = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const effectiveType = connection?.effectiveType;
        
        if (effectiveType === '4g' || effectiveType === '3g') {
          setState(prev => ({ ...prev, connectionSpeed: 'fast' }));
        } else if (effectiveType === '2g' || effectiveType === 'slow-2g') {
          setState(prev => ({ ...prev, connectionSpeed: 'slow' }));
        }
      }
    };

    detectConnectionSpeed();
    
    // Écouter les changements de connexion
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection?.addEventListener('change', detectConnectionSpeed);
      
      return () => {
        connection?.removeEventListener('change', detectConnectionSpeed);
      };
    }
  }, []);

  // Compression d'image pour connexions lentes
  const compressImage = useCallback(async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/') || state.connectionSpeed !== 'slow') {
      return file;
    }

    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Réduire la taille pour connexions lentes
        const maxWidth = isMobile ? 800 : 1200;
        const maxHeight = isMobile ? 600 : 900;
        
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, file.type, 0.8); // 80% qualité
      };

      img.src = URL.createObjectURL(file);
    });
  }, [state.connectionSpeed, isMobile]);

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Vérifier que le service est prêt
    if (!serviceReady || !fileService) {
      setState(prev => ({
        ...prev,
        error: 'Service de fichiers non disponible. Veuillez réessayer.'
      }));
      return;
    }

    const fileArray = Array.from(files);
    
    // Limiter le nombre de fichiers
    const selectedFiles = fileArray.slice(0, maxFiles);
    
    setState(prev => ({
      ...prev,
      isUploading: true,
      uploadProgress: 0,
      error: null,
      uploadQueue: selectedFiles,
      currentUploadIndex: 0
    }));

    try {
      // Valider les fichiers avec le hook
      const validationResult = validateFiles(selectedFiles);
      
      if (!validationResult) {
        setState(prev => ({
          ...prev,
          error: 'Erreur lors de la validation des fichiers',
          isUploading: false,
          uploadQueue: []
        }));
        return;
      }

      const { valid, invalid } = validationResult;
      
      if (invalid.length > 0) {
        setState(prev => ({
          ...prev,
          error: `Fichiers invalides: ${invalid.map(i => i.file.name).join(', ')}`,
          isUploading: false,
          uploadQueue: []
        }));
        return;
      }

      if (valid.length > 0) {
        const processedFiles: File[] = [];
        
        // Traitement des fichiers avec compression si nécessaire
        for (let i = 0; i < valid.length; i++) {
          setState(prev => ({ 
            ...prev, 
            currentUploadIndex: i,
            isCompressing: true,
            compressionProgress: 0
          }));

          // Compression progressive pour les images
          let processedFile = valid[i];
          if (valid[i].type.startsWith('image/') && state.connectionSpeed === 'slow') {
            // Simuler la progression de compression
            for (let progress = 0; progress <= 100; progress += 20) {
              setState(prev => ({ ...prev, compressionProgress: progress }));
              await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            processedFile = await compressImage(valid[i]);
          }

          setState(prev => ({ ...prev, isCompressing: false }));
          processedFiles.push(processedFile);

          // Simuler l'upload avec progression adaptée à la connexion
          const uploadSpeed = state.connectionSpeed === 'slow' ? 200 : 50;
          for (let progress = 0; progress <= 100; progress += 10) {
            setState(prev => ({ 
              ...prev, 
              uploadProgress: Math.round(((i * 100) + progress) / valid.length)
            }));
            await new Promise(resolve => setTimeout(resolve, uploadSpeed));
          }
        }

        setState(prev => ({ 
          ...prev, 
          error: null,
          isUploading: false,
          uploadProgress: 100,
          uploadQueue: []
        }));
        
        onFileSelect(processedFiles);
        
        // Reset progress après un délai
        setTimeout(() => {
          setState(prev => ({ 
            ...prev, 
            uploadProgress: 0,
            currentUploadIndex: 0
          }));
        }, 1500);
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur d\'upload',
        isUploading: false,
        uploadProgress: 0,
        uploadQueue: [],
        isCompressing: false
      }));
    }
  }, [maxFiles, onFileSelect, serviceReady, fileService, validateFiles, state.connectionSpeed, compressImage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files);
    // Reset input pour permettre de sélectionner le même fichier
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled && serviceReady) {
      setState(prev => ({ ...prev, isDragOver: true }));
    }
  }, [disabled, serviceReady]);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setState(prev => ({ ...prev, isDragOver: false }));
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setState(prev => ({ ...prev, isDragOver: false }));
    
    if (!disabled && serviceReady) {
      handleFileSelect(event.dataTransfer.files);
    }
  }, [disabled, serviceReady, handleFileSelect]);

  const handleClick = () => {
    if (!disabled && serviceReady && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCameraClick = () => {
    if (!disabled && serviceReady && cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  // Fonction pour réessayer le chargement du service
  const handleRetryService = useCallback(async () => {
    setState(prev => ({ ...prev, error: null }));
    try {
      await retryService();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: `Impossible de charger le service: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      }));
    }
  }, [retryService]);

  return (
    <div className="file-uploader">
      {/* Zone de drop */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 cursor-pointer
          ${state.isDragOver 
            ? 'border-mint-green bg-mint-green/10' 
            : 'border-gray-300 hover:border-mint-green/50'
          }
          ${disabled || !serviceReady ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isMobile && serviceReady ? handleClick : undefined}
      >
        {/* Input pour fichiers généraux */}
        <input
          ref={fileInputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={Array.isArray(acceptedTypes) ? acceptedTypes.join(',') : acceptedTypes}
          onChange={handleInputChange}
          disabled={disabled || !serviceReady}
          className="hidden"
        />

        {/* Input pour caméra (mobile) */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*,video/*"
          capture="environment"
          onChange={handleInputChange}
          disabled={disabled || !serviceReady}
          className="hidden"
        />

        {/* Input pour caméra frontale (selfie) */}
        <input
          ref={useRef<HTMLInputElement>(null)}
          type="file"
          accept="image/*,video/*"
          capture="user"
          onChange={handleInputChange}
          disabled={disabled || !serviceReady}
          className="hidden"
        />

        <div className="text-center">
          {serviceLoading ? (
            <div className={getMobileClasses('space-y-3', 'space-y-2')}>
              <div className={getMobileClasses(
                'w-12 h-12 mx-auto border-3 border-blue-ink border-t-transparent rounded-full animate-spin',
                'w-8 h-8 border-2'
              )} />
              <p className={getMobileClasses('text-sm font-medium text-gray-700', 'text-xs')}>
                Chargement du service de fichiers...
              </p>
            </div>
          ) : serviceError ? (
            <div className={getMobileClasses('space-y-3', 'space-y-2')}>
              <div className={getMobileClasses('w-12 h-12 mx-auto text-red-500', 'w-8 h-8')}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <div>
                <p className={getMobileClasses('text-sm font-medium text-red-600', 'text-xs')}>
                  Erreur de chargement
                </p>
                <p className={getMobileClasses('text-xs text-red-500 mt-1', 'text-[10px]')}>
                  {serviceError.message}
                </p>
                <button
                  onClick={handleRetryService}
                  className={getMobileClasses(
                    'mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs transition-colors',
                    'px-2 py-0.5 text-[10px]'
                  )}
                >
                  Réessayer
                </button>
              </div>
            </div>
          ) : state.isUploading ? (
            <div className={getMobileClasses('space-y-3', 'space-y-2')}>
              <div className={getMobileClasses(
                'w-12 h-12 mx-auto border-3 border-mint-green border-t-transparent rounded-full animate-spin',
                'w-8 h-8 border-2'
              )} />
              
              {/* Indicateur de compression */}
              {state.isCompressing ? (
                <div className="space-y-2">
                  <p className={getMobileClasses('text-sm font-medium text-gray-700', 'text-xs')}>
                    Optimisation pour mobile...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-orange-soft to-mint-green h-2 rounded-full transition-all duration-300"
                      style={{ width: `${state.compressionProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className={getMobileClasses('text-sm font-medium text-gray-700', 'text-xs')}>
                    {state.uploadQueue.length > 1 
                      ? `Upload ${state.currentUploadIndex + 1}/${state.uploadQueue.length}...`
                      : 'Upload en cours...'
                    }
                  </p>
                  
                  {/* Barre de progression améliorée */}
                  <div className={getMobileClasses('w-full bg-gray-200 rounded-full h-3 overflow-hidden', 'h-2')}>
                    <div 
                      className="bg-gradient-to-r from-mint-green to-blue-ink rounded-full transition-all duration-500 ease-out relative h-full"
                      style={{ width: `${state.uploadProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={getMobileClasses('text-xs text-gray-500', 'text-[10px]')}>
                      {state.uploadProgress}% terminé
                    </p>
                    
                    {/* Indicateur de vitesse de connexion */}
                    {state.connectionSpeed !== 'unknown' && (
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${
                          state.connectionSpeed === 'fast' ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                        <span className={getMobileClasses('text-xs text-gray-500', 'text-[10px]')}>
                          {state.connectionSpeed === 'fast' ? 'Rapide' : 'Lent'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={getMobileClasses('space-y-3', 'space-y-2')}>
              <div className={getMobileClasses('w-12 h-12 mx-auto text-mint-green', 'w-8 h-8')}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
              </div>
              <div>
                <p className={getMobileClasses('text-sm font-medium text-gray-900', 'text-xs')}>
                  {isMobile ? 'Sélectionnez vos fichiers' : 'Cliquez ou glissez vos fichiers ici'}
                </p>
                <p className={getMobileClasses('text-xs text-gray-500 mt-1', 'text-[10px]')}>
                  Images, vidéos, audio • Max {Math.round(maxFileSize / (1024 * 1024))}MB
                </p>
                {maxFiles > 1 && (
                  <p className={getMobileClasses('text-xs text-gray-500', 'text-[10px]')}>
                    Jusqu'à {maxFiles} fichiers
                  </p>
                )}
                
                {/* Indicateur d'optimisation mobile */}
                {isMobile && state.connectionSpeed === 'slow' && (
                  <p className="text-[10px] text-orange-soft mt-1 flex items-center justify-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Compression automatique activée</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Boutons mobiles pour caméra/galerie */}
      {isMobile && !state.isUploading && !serviceLoading && (
        <div className={getMobileClasses('mt-3 grid grid-cols-2 gap-2', 'grid-cols-3 gap-1.5 mt-2')}>
          <button
            onClick={handleClick}
            disabled={disabled || !serviceReady}
            className={getMobileClasses(
              'flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50',
              'px-2 py-1.5 space-x-1 active:bg-gray-300'
            )}
          >
            <svg className={getMobileClasses('w-4 h-4 text-gray-600', 'w-3 h-3')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className={getMobileClasses('text-sm text-gray-700', 'text-xs')}>Galerie</span>
          </button>
          
          <button
            onClick={handleCameraClick}
            disabled={disabled || !serviceReady}
            className={getMobileClasses(
              'flex items-center justify-center space-x-2 px-4 py-2 bg-mint-green hover:bg-mint-green/90 text-white rounded-lg transition-colors disabled:opacity-50',
              'px-2 py-1.5 space-x-1 active:bg-mint-green/80'
            )}
          >
            <svg className={getMobileClasses('w-4 h-4', 'w-3 h-3')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={getMobileClasses('text-sm', 'text-xs')}>Caméra</span>
          </button>

          {/* Bouton caméra frontale (selfie) */}
          <button
            onClick={() => {
              if (!serviceReady) return;
              const selfieInput = document.createElement('input');
              selfieInput.type = 'file';
              selfieInput.accept = 'image/*,video/*';
              selfieInput.setAttribute('capture', 'user');
              selfieInput.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                handleFileSelect(target.files);
              };
              selfieInput.click();
            }}
            disabled={disabled || !serviceReady}
            className={getMobileClasses(
              'flex items-center justify-center space-x-2 px-4 py-2 bg-blue-ink hover:bg-blue-ink/90 text-white rounded-lg transition-colors disabled:opacity-50',
              'px-2 py-1.5 space-x-1 active:bg-blue-ink/80'
            )}
          >
            <svg className={getMobileClasses('w-4 h-4', 'w-3 h-3')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className={getMobileClasses('text-sm', 'text-xs')}>Selfie</span>
          </button>
        </div>
      )}

      {/* Erreur */}
      {state.error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-600">{state.error}</p>
            </div>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 flex-shrink-0"
              title="Fermer l'erreur"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Informations sur les limites */}
      <div className={getMobileClasses('mt-3 space-y-1', 'mt-2 space-y-0.5')}>
        <div className={getMobileClasses(
          'flex items-center justify-between text-xs text-gray-500',
          'text-[10px]'
        )}>
          <span>Types acceptés:</span>
          <span className="font-medium">Images, Vidéos, Audio</span>
        </div>
        <div className={getMobileClasses(
          'flex items-center justify-between text-xs text-gray-500',
          'text-[10px]'
        )}>
          <span>Taille max:</span>
          <span className="font-medium">
            {Math.round(maxFileSize / (1024 * 1024))} MB
            {state.connectionSpeed === 'slow' && isMobile && ' (compressé auto)'}
          </span>
        </div>
        {maxFiles > 1 && (
          <div className={getMobileClasses(
            'flex items-center justify-between text-xs text-gray-500',
            'text-[10px]'
          )}>
            <span>Fichiers max:</span>
            <span className="font-medium">{maxFiles}</span>
          </div>
        )}
        
        {/* Indicateur de statut du service */}
        <div className="flex items-center space-x-1 text-xs">
          <div className={`w-2 h-2 rounded-full ${
            serviceReady ? 'bg-green-500' : serviceLoading ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <span className={`text-[10px] ${
            serviceReady ? 'text-green-600' : serviceLoading ? 'text-yellow-600' : 'text-red-600'
          }`}>
            Service: {serviceReady ? 'Prêt' : serviceLoading ? 'Chargement...' : 'Erreur'}
          </span>
        </div>

        {/* Indicateurs de support mobile */}
        {isMobile && serviceReady && (
          <div className="space-y-1 mt-2">
            <div className="flex items-center space-x-1 text-xs text-mint-green">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-[10px]">Accès caméra et galerie disponible</span>
            </div>
            
            {/* Indicateur de connexion */}
            {state.connectionSpeed !== 'unknown' && (
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  state.connectionSpeed === 'fast' ? 'bg-green-500' : 'bg-orange-500'
                }`} />
                <span className="text-[10px] text-gray-500">
                  Connexion {state.connectionSpeed === 'fast' ? 'rapide' : 'lente'} détectée
                  {state.connectionSpeed === 'slow' && ' - Compression activée'}
                </span>
              </div>
            )}

            {/* Conseils pour mobile */}
            {orientation === 'landscape' && (
              <div className="flex items-center space-x-1 text-orange-soft">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-[10px]">Mode paysage - Meilleure qualité photo</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}