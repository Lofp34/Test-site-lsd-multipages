'use client';

import { useState, useCallback, useRef } from 'react';
import { ChatMessage, UploadedFile } from '@/lib/gemini/types';
import { FileService } from '@/lib/gemini/file-service';
import { MultimodalService } from '@/lib/gemini/multimodal-service';

interface UseMultimodalChatState {
  messages: ChatMessage[];
  isUploading: boolean;
  uploadError: string | null;
  pendingFiles: File[];
  uploadedFiles: UploadedFile[];
}

interface UseMultimodalChatReturn {
  // État
  messages: ChatMessage[];
  isUploading: boolean;
  uploadError: string | null;
  pendingFiles: File[];
  uploadedFiles: UploadedFile[];
  
  // Actions
  addFiles: (files: File[]) => Promise<void>;
  removeFile: (fileId: string) => void;
  removePendingFile: (index: number) => void;
  clearFiles: () => void;
  sendMultimodalMessage: (text: string) => Promise<void>;
  clearUploadError: () => void;
  
  // Enhanced actions (backward compatible)
  analyzeFile?: (fileId: string) => Promise<void>;
  generatePreview?: (fileId: string) => Promise<void>;
  retryFailedUpload?: (fileIndex: number) => Promise<void>;
  
  // Utilitaires
  hasFiles: boolean;
  canSendMessage: boolean;
  
  // Enhanced utilities (backward compatible)
  getFileAnalysis?: (fileId: string) => any;
  getUploadProgress?: (fileId: string) => number;
  uploadMetrics?: any;
}

export function useMultimodalChat(
  apiKey: string,
  onSendMessage?: (message: string, files?: UploadedFile[]) => Promise<void>,
  enhancedMode: boolean = false
): UseMultimodalChatReturn {
  const [state, setState] = useState<UseMultimodalChatState>({
    messages: [],
    isUploading: false,
    uploadError: null,
    pendingFiles: [],
    uploadedFiles: []
  });

  const fileServiceRef = useRef<FileService | null>(null);
  const multimodalServiceRef = useRef<MultimodalService | null>(null);

  // Initialisation des services
  if (!fileServiceRef.current) {
    fileServiceRef.current = new FileService(apiKey);
  }
  if (!multimodalServiceRef.current) {
    multimodalServiceRef.current = new MultimodalService(apiKey);
  }

  const fileService = fileServiceRef.current;
  const multimodalService = multimodalServiceRef.current;

  // Ajouter des fichiers et les uploader
  const addFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    setState(prev => ({
      ...prev,
      pendingFiles: [...prev.pendingFiles, ...files],
      isUploading: true,
      uploadError: null
    }));

    try {
      // Valider les fichiers
      const { valid, invalid } = fileService.validateFiles(files);
      
      if (invalid.length > 0) {
        setState(prev => ({
          ...prev,
          uploadError: `Fichiers invalides: ${invalid.map(i => i.file.name).join(', ')}`,
          isUploading: false
        }));
        return;
      }

      // Uploader les fichiers valides
      const uploadedFiles = await fileService.uploadFiles(valid);
      
      setState(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...uploadedFiles],
        pendingFiles: prev.pendingFiles.filter(f => !valid.includes(f)),
        isUploading: false,
        uploadError: null
      }));

    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      setState(prev => ({
        ...prev,
        uploadError: error instanceof Error ? error.message : 'Erreur d\'upload',
        isUploading: false,
        pendingFiles: prev.pendingFiles.filter(f => !files.includes(f))
      }));
    }
  }, [fileService]);

  // Supprimer un fichier uploadé
  const removeFile = useCallback((fileId: string) => {
    setState(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter(f => f.id !== fileId)
    }));
  }, []);

  // Supprimer un fichier en attente
  const removePendingFile = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      pendingFiles: prev.pendingFiles.filter((_, i) => i !== index)
    }));
  }, []);

  // Vider tous les fichiers
  const clearFiles = useCallback(() => {
    setState(prev => ({
      ...prev,
      uploadedFiles: [],
      pendingFiles: [],
      uploadError: null
    }));
  }, []);

  // Envoyer un message multimodal
  const sendMultimodalMessage = useCallback(async (text: string) => {
    const { uploadedFiles } = state;
    
    // Valider le message
    const validation = multimodalService.validateMultimodalMessage({
      text,
      files: uploadedFiles
    });

    if (!validation.isValid) {
      setState(prev => ({
        ...prev,
        uploadError: validation.error || 'Message invalide'
      }));
      return;
    }

    try {
      // Créer le message de chat
      const chatMessage = multimodalService.createChatMessage(
        text,
        uploadedFiles,
        'user'
      );

      // Ajouter le message à l'historique
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, chatMessage]
      }));

      // Envoyer le message via le callback
      if (onSendMessage) {
        await onSendMessage(text, uploadedFiles);
      }

      // Vider les fichiers après envoi
      clearFiles();

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setState(prev => ({
        ...prev,
        uploadError: error instanceof Error ? error.message : 'Erreur d\'envoi'
      }));
    }
  }, [state, multimodalService, onSendMessage, clearFiles]);

  // Effacer l'erreur d'upload
  const clearUploadError = useCallback(() => {
    setState(prev => ({
      ...prev,
      uploadError: null
    }));
  }, []);

  // Enhanced functionality (only in enhanced mode)
  const analyzeFile = enhancedMode ? useCallback(async (fileId: string) => {
    console.log('Enhanced mode: analyzing file', fileId);
    // Placeholder for file analysis
  }, []) : undefined;

  const generatePreview = enhancedMode ? useCallback(async (fileId: string) => {
    console.log('Enhanced mode: generating preview', fileId);
    // Placeholder for preview generation
  }, []) : undefined;

  const retryFailedUpload = enhancedMode ? useCallback(async (fileIndex: number) => {
    const file = state.pendingFiles[fileIndex];
    if (!file) return;

    setState(prev => ({
      ...prev,
      pendingFiles: prev.pendingFiles.filter((_, i) => i !== fileIndex)
    }));

    await addFiles([file]);
  }, [state.pendingFiles, addFiles]) : undefined;

  const getFileAnalysis = enhancedMode ? useCallback((fileId: string) => {
    const file = state.uploadedFiles.find(f => f.id === fileId);
    return file?.metadata || null;
  }, [state.uploadedFiles]) : undefined;

  const getUploadProgress = enhancedMode ? useCallback((fileId: string) => {
    // Placeholder for upload progress tracking
    return 100;
  }, []) : undefined;

  const uploadMetrics = enhancedMode ? {
    totalUploads: state.uploadedFiles.length,
    successfulUploads: state.uploadedFiles.length,
    failedUploads: 0,
    averageUploadTime: 1000
  } : undefined;

  // Propriétés calculées
  const hasFiles = state.uploadedFiles.length > 0 || state.pendingFiles.length > 0;
  const canSendMessage = !state.isUploading && (
    state.uploadedFiles.length > 0 || 
    state.pendingFiles.length === 0
  );

  return {
    // État
    messages: state.messages,
    isUploading: state.isUploading,
    uploadError: state.uploadError,
    pendingFiles: state.pendingFiles,
    uploadedFiles: state.uploadedFiles,
    
    // Actions
    addFiles,
    removeFile,
    removePendingFile,
    clearFiles,
    sendMultimodalMessage,
    clearUploadError,
    
    // Enhanced actions (only in enhanced mode)
    ...(enhancedMode && {
      analyzeFile,
      generatePreview,
      retryFailedUpload
    }),
    
    // Utilitaires
    hasFiles,
    canSendMessage,
    
    // Enhanced utilities (only in enhanced mode)
    ...(enhancedMode && {
      getFileAnalysis,
      getUploadProgress,
      uploadMetrics
    })
  };
}