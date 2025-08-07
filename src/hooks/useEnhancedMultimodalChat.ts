'use client';

import { useState, useCallback, useRef } from 'react';
import { ChatMessage, UploadedFile } from '@/lib/gemini/types';
import { FileService } from '@/lib/gemini/file-service';
import { MultimodalService } from '@/lib/gemini/multimodal-service';
import { EnhancedChatMessage } from './useEnhancedGeminiChat';

interface EnhancedUploadedFile extends UploadedFile {
  // Enhanced metadata for file rendering
  renderingState?: 'pending' | 'rendering' | 'complete' | 'error';
  previewGenerated?: boolean;
  analysisComplete?: boolean;
  metadata?: {
    dimensions?: { width: number; height: number };
    duration?: number; // for videos
    pageCount?: number; // for PDFs
    extractedText?: string;
    analysisResults?: any;
    [key: string]: any;
  };
}

interface UseEnhancedMultimodalChatState {
  messages: EnhancedChatMessage[];
  isUploading: boolean;
  uploadError: string | null;
  pendingFiles: File[];
  uploadedFiles: EnhancedUploadedFile[];
  // Enhanced state
  fileAnalysisEnabled: boolean;
  previewGenerationEnabled: boolean;
  uploadMetrics: {
    totalUploads: number;
    successfulUploads: number;
    failedUploads: number;
    averageUploadTime: number;
    totalUploadSize: number;
  };
}

interface UseEnhancedMultimodalChatReturn {
  // Base functionality
  messages: EnhancedChatMessage[];
  isUploading: boolean;
  uploadError: string | null;
  pendingFiles: File[];
  uploadedFiles: EnhancedUploadedFile[];
  
  // Enhanced functionality
  fileAnalysisEnabled: boolean;
  previewGenerationEnabled: boolean;
  uploadMetrics: any;
  
  // Actions
  addFiles: (files: File[]) => Promise<void>;
  removeFile: (fileId: string) => void;
  removePendingFile: (index: number) => void;
  clearFiles: () => void;
  sendMultimodalMessage: (text: string) => Promise<void>;
  clearUploadError: () => void;
  
  // Enhanced actions
  analyzeFile: (fileId: string) => Promise<void>;
  generatePreview: (fileId: string) => Promise<void>;
  toggleFileAnalysis: () => void;
  togglePreviewGeneration: () => void;
  retryFailedUpload: (fileIndex: number) => Promise<void>;
  
  // Utilities
  hasFiles: boolean;
  canSendMessage: boolean;
  getFileAnalysis: (fileId: string) => any;
  getUploadProgress: (fileId: string) => number;
  exportFileData: () => string;
  importFileData: (data: string) => boolean;
}

export function useEnhancedMultimodalChat(
  apiKey: string,
  onSendMessage?: (message: string, files?: EnhancedUploadedFile[]) => Promise<void>,
  options?: {
    fileAnalysisEnabled?: boolean;
    previewGenerationEnabled?: boolean;
    maxFileSize?: number;
    allowedFileTypes?: string[];
  }
): UseEnhancedMultimodalChatReturn {
  const [state, setState] = useState<UseEnhancedMultimodalChatState>({
    messages: [],
    isUploading: false,
    uploadError: null,
    pendingFiles: [],
    uploadedFiles: [],
    fileAnalysisEnabled: options?.fileAnalysisEnabled ?? true,
    previewGenerationEnabled: options?.previewGenerationEnabled ?? true,
    uploadMetrics: {
      totalUploads: 0,
      successfulUploads: 0,
      failedUploads: 0,
      averageUploadTime: 0,
      totalUploadSize: 0
    }
  });

  const fileServiceRef = useRef<FileService | null>(null);
  const multimodalServiceRef = useRef<MultimodalService | null>(null);
  const uploadTimesRef = useRef<number[]>([]);
  const uploadProgressRef = useRef<Record<string, number>>({});

  // Initialize services
  if (!fileServiceRef.current) {
    fileServiceRef.current = new FileService(apiKey);
  }
  if (!multimodalServiceRef.current) {
    multimodalServiceRef.current = new MultimodalService(apiKey);
  }

  const fileService = fileServiceRef.current;
  const multimodalService = multimodalServiceRef.current;

  // Enhanced file enhancement with metadata
  const enhanceUploadedFile = useCallback((file: UploadedFile): EnhancedUploadedFile => {
    return {
      ...file,
      renderingState: 'complete',
      previewGenerated: false,
      analysisComplete: false,
      metadata: {
        ...file.metadata
      }
    };
  }, []);

  // Enhanced file analysis
  const analyzeFile = useCallback(async (fileId: string) => {
    const file = state.uploadedFiles.find(f => f.id === fileId);
    if (!file || !state.fileAnalysisEnabled) return;

    setState(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.map(f =>
        f.id === fileId
          ? { ...f, renderingState: 'rendering' }
          : f
      )
    }));

    try {
      // Simulate file analysis (in a real implementation, this would call an analysis service)
      const analysisResults = await simulateFileAnalysis(file);
      
      setState(prev => ({
        ...prev,
        uploadedFiles: prev.uploadedFiles.map(f =>
          f.id === fileId
            ? {
                ...f,
                renderingState: 'complete',
                analysisComplete: true,
                metadata: {
                  ...f.metadata,
                  analysisResults
                }
              }
            : f
        )
      }));
    } catch (error) {
      console.error('Erreur lors de l\'analyse du fichier:', error);
      setState(prev => ({
        ...prev,
        uploadedFiles: prev.uploadedFiles.map(f =>
          f.id === fileId
            ? { ...f, renderingState: 'error' }
            : f
        )
      }));
    }
  }, [state.uploadedFiles, state.fileAnalysisEnabled]);

  // Enhanced preview generation
  const generatePreview = useCallback(async (fileId: string) => {
    const file = state.uploadedFiles.find(f => f.id === fileId);
    if (!file || !state.previewGenerationEnabled) return;

    setState(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.map(f =>
        f.id === fileId
          ? { ...f, renderingState: 'rendering' }
          : f
      )
    }));

    try {
      // Simulate preview generation
      const previewData = await simulatePreviewGeneration(file);
      
      setState(prev => ({
        ...prev,
        uploadedFiles: prev.uploadedFiles.map(f =>
          f.id === fileId
            ? {
                ...f,
                renderingState: 'complete',
                previewGenerated: true,
                metadata: {
                  ...f.metadata,
                  ...previewData
                }
              }
            : f
        )
      }));
    } catch (error) {
      console.error('Erreur lors de la génération de l\'aperçu:', error);
      setState(prev => ({
        ...prev,
        uploadedFiles: prev.uploadedFiles.map(f =>
          f.id === fileId
            ? { ...f, renderingState: 'error' }
            : f
        )
      }));
    }
  }, [state.uploadedFiles, state.previewGenerationEnabled]);

  // Enhanced file upload with progress tracking and analysis
  const addFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    setState(prev => ({
      ...prev,
      pendingFiles: [...prev.pendingFiles, ...files],
      isUploading: true,
      uploadError: null
    }));

    const startTime = Date.now();

    try {
      // Validate files with enhanced validation
      const { valid, invalid } = fileService.validateFiles(files);
      
      if (invalid.length > 0) {
        setState(prev => ({
          ...prev,
          uploadError: `Fichiers invalides: ${invalid.map(i => i.file.name).join(', ')}. ${invalid.map(i => i.reason).join(', ')}`,
          isUploading: false,
          uploadMetrics: {
            ...prev.uploadMetrics,
            failedUploads: prev.uploadMetrics.failedUploads + invalid.length
          }
        }));
        return;
      }

      // Upload files with progress tracking
      const uploadPromises = valid.map(async (file, index) => {
        const fileId = `file_${Date.now()}_${index}`;
        uploadProgressRef.current[fileId] = 0;

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          uploadProgressRef.current[fileId] = Math.min(
            (uploadProgressRef.current[fileId] || 0) + Math.random() * 20,
            90
          );
        }, 200);

        try {
          const uploadedFile = await fileService.uploadFiles([file]);
          clearInterval(progressInterval);
          uploadProgressRef.current[fileId] = 100;

          const enhancedFile = enhanceUploadedFile(uploadedFile[0]);

          // Auto-analyze if enabled
          if (state.fileAnalysisEnabled) {
            setTimeout(() => analyzeFile(enhancedFile.id), 500);
          }

          // Auto-generate preview if enabled
          if (state.previewGenerationEnabled) {
            setTimeout(() => generatePreview(enhancedFile.id), 1000);
          }

          return enhancedFile;
        } catch (error) {
          clearInterval(progressInterval);
          delete uploadProgressRef.current[fileId];
          throw error;
        }
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      const uploadTime = Date.now() - startTime;
      uploadTimesRef.current.push(uploadTime);

      const totalSize = valid.reduce((sum, file) => sum + file.size, 0);
      const averageUploadTime = uploadTimesRef.current.reduce((a, b) => a + b, 0) / uploadTimesRef.current.length;

      setState(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...uploadedFiles],
        pendingFiles: prev.pendingFiles.filter(f => !valid.includes(f)),
        isUploading: false,
        uploadError: null,
        uploadMetrics: {
          totalUploads: prev.uploadMetrics.totalUploads + uploadedFiles.length,
          successfulUploads: prev.uploadMetrics.successfulUploads + uploadedFiles.length,
          failedUploads: prev.uploadMetrics.failedUploads,
          averageUploadTime,
          totalUploadSize: prev.uploadMetrics.totalUploadSize + totalSize
        }
      }));

      // Clean up progress tracking
      setTimeout(() => {
        uploadedFiles.forEach(file => {
          delete uploadProgressRef.current[file.id];
        });
      }, 3000);

    } catch (error) {
      console.error('Erreur lors de l\'upload amélioré:', error);
      setState(prev => ({
        ...prev,
        uploadError: error instanceof Error ? error.message : 'Erreur d\'upload',
        isUploading: false,
        pendingFiles: prev.pendingFiles.filter(f => !files.includes(f)),
        uploadMetrics: {
          ...prev.uploadMetrics,
          failedUploads: prev.uploadMetrics.failedUploads + files.length
        }
      }));
    }
  }, [fileService, enhanceUploadedFile, state.fileAnalysisEnabled, state.previewGenerationEnabled, analyzeFile, generatePreview]);

  // Enhanced file removal with cleanup
  const removeFile = useCallback((fileId: string) => {
    setState(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter(f => f.id !== fileId)
    }));
    
    // Clean up progress tracking
    delete uploadProgressRef.current[fileId];
  }, []);

  // Remove pending file
  const removePendingFile = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      pendingFiles: prev.pendingFiles.filter((_, i) => i !== index)
    }));
  }, []);

  // Enhanced file clearing
  const clearFiles = useCallback(() => {
    setState(prev => ({
      ...prev,
      uploadedFiles: [],
      pendingFiles: [],
      uploadError: null
    }));
    
    // Clear all progress tracking
    uploadProgressRef.current = {};
  }, []);

  // Enhanced multimodal message sending
  const sendMultimodalMessage = useCallback(async (text: string) => {
    const { uploadedFiles } = state;
    
    // Enhanced validation
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
      // Create enhanced chat message
      const chatMessage: EnhancedChatMessage = {
        ...multimodalService.createChatMessage(text, uploadedFiles, 'user'),
        isMarkdown: false,
        renderingState: 'complete',
        metadata: {
          hasFiles: uploadedFiles.length > 0,
          fileTypes: uploadedFiles.map(f => f.mimeType),
          fileAnalysisComplete: uploadedFiles.every(f => f.analysisComplete),
          previewsGenerated: uploadedFiles.every(f => f.previewGenerated)
        }
      };

      // Add message to history
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, chatMessage]
      }));

      // Send message via callback
      if (onSendMessage) {
        await onSendMessage(text, uploadedFiles);
      }

      // Clear files after successful send
      clearFiles();

    } catch (error) {
      console.error('Erreur lors de l\'envoi multimodal amélioré:', error);
      setState(prev => ({
        ...prev,
        uploadError: error instanceof Error ? error.message : 'Erreur d\'envoi'
      }));
    }
  }, [state, multimodalService, onSendMessage, clearFiles]);

  // Retry failed upload
  const retryFailedUpload = useCallback(async (fileIndex: number) => {
    const file = state.pendingFiles[fileIndex];
    if (!file) return;

    // Remove from pending and retry
    setState(prev => ({
      ...prev,
      pendingFiles: prev.pendingFiles.filter((_, i) => i !== fileIndex)
    }));

    await addFiles([file]);
  }, [state.pendingFiles, addFiles]);

  // Feature toggles
  const toggleFileAnalysis = useCallback(() => {
    setState(prev => ({
      ...prev,
      fileAnalysisEnabled: !prev.fileAnalysisEnabled
    }));
  }, []);

  const togglePreviewGeneration = useCallback(() => {
    setState(prev => ({
      ...prev,
      previewGenerationEnabled: !prev.previewGenerationEnabled
    }));
  }, []);

  // Utility functions
  const clearUploadError = useCallback(() => {
    setState(prev => ({
      ...prev,
      uploadError: null
    }));
  }, []);

  const getFileAnalysis = useCallback((fileId: string) => {
    const file = state.uploadedFiles.find(f => f.id === fileId);
    return file?.metadata?.analysisResults || null;
  }, [state.uploadedFiles]);

  const getUploadProgress = useCallback((fileId: string) => {
    return uploadProgressRef.current[fileId] || 0;
  }, []);

  // Enhanced export/import
  const exportFileData = useCallback(() => {
    try {
      const exportData = {
        version: '2.0',
        type: 'enhanced_multimodal_data',
        uploadedFiles: state.uploadedFiles,
        uploadMetrics: state.uploadMetrics,
        settings: {
          fileAnalysisEnabled: state.fileAnalysisEnabled,
          previewGenerationEnabled: state.previewGenerationEnabled
        },
        exportDate: new Date().toISOString()
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Erreur lors de l\'export des données de fichiers:', error);
      return '';
    }
  }, [state]);

  const importFileData = useCallback((data: string) => {
    try {
      const importData = JSON.parse(data);
      
      if (importData.type !== 'enhanced_multimodal_data' || !importData.uploadedFiles) {
        throw new Error('Format de données invalide');
      }

      setState(prev => ({
        ...prev,
        uploadedFiles: importData.uploadedFiles || [],
        uploadMetrics: importData.uploadMetrics || prev.uploadMetrics,
        fileAnalysisEnabled: importData.settings?.fileAnalysisEnabled ?? prev.fileAnalysisEnabled,
        previewGenerationEnabled: importData.settings?.previewGenerationEnabled ?? prev.previewGenerationEnabled
      }));

      return true;
    } catch (error) {
      console.error('Erreur lors de l\'import des données de fichiers:', error);
      return false;
    }
  }, []);

  // Computed properties
  const hasFiles = state.uploadedFiles.length > 0 || state.pendingFiles.length > 0;
  const canSendMessage = !state.isUploading && (
    state.uploadedFiles.length > 0 || 
    state.pendingFiles.length === 0
  );

  return {
    // Base functionality
    messages: state.messages,
    isUploading: state.isUploading,
    uploadError: state.uploadError,
    pendingFiles: state.pendingFiles,
    uploadedFiles: state.uploadedFiles,
    
    // Enhanced functionality
    fileAnalysisEnabled: state.fileAnalysisEnabled,
    previewGenerationEnabled: state.previewGenerationEnabled,
    uploadMetrics: state.uploadMetrics,
    
    // Actions
    addFiles,
    removeFile,
    removePendingFile,
    clearFiles,
    sendMultimodalMessage,
    clearUploadError,
    
    // Enhanced actions
    analyzeFile,
    generatePreview,
    toggleFileAnalysis,
    togglePreviewGeneration,
    retryFailedUpload,
    
    // Utilities
    hasFiles,
    canSendMessage,
    getFileAnalysis,
    getUploadProgress,
    exportFileData,
    importFileData
  };
}

// Simulation functions (in a real implementation, these would be actual services)
async function simulateFileAnalysis(file: EnhancedUploadedFile): Promise<any> {
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const analysisResults: any = {
    fileType: file.mimeType,
    size: file.metadata?.size || 0,
    analysisDate: new Date().toISOString()
  };

  // Simulate different analysis based on file type
  if (file.mimeType.startsWith('image/')) {
    analysisResults.imageAnalysis = {
      dimensions: { width: 1920, height: 1080 },
      colorProfile: 'sRGB',
      hasText: Math.random() > 0.5,
      objects: ['person', 'building', 'car'].filter(() => Math.random() > 0.7)
    };
  } else if (file.mimeType.startsWith('video/')) {
    analysisResults.videoAnalysis = {
      duration: Math.floor(Math.random() * 300) + 30,
      resolution: '1920x1080',
      frameRate: 30,
      hasAudio: Math.random() > 0.3
    };
  } else if (file.mimeType === 'application/pdf') {
    analysisResults.documentAnalysis = {
      pageCount: Math.floor(Math.random() * 50) + 1,
      hasText: true,
      language: 'fr',
      wordCount: Math.floor(Math.random() * 5000) + 100
    };
  }

  return analysisResults;
}

async function simulatePreviewGeneration(file: EnhancedUploadedFile): Promise<any> {
  // Simulate preview generation delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  const previewData: any = {
    previewGenerated: true,
    previewDate: new Date().toISOString()
  };

  // Simulate different preview data based on file type
  if (file.mimeType.startsWith('image/')) {
    previewData.thumbnailUrl = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#f0f0f0"/><text x="50" y="50" text-anchor="middle" dy=".3em">IMG</text></svg>')}`;
  } else if (file.mimeType.startsWith('video/')) {
    previewData.thumbnailUrl = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#e0e0e0"/><text x="50" y="50" text-anchor="middle" dy=".3em">VID</text></svg>')}`;
  } else if (file.mimeType === 'application/pdf') {
    previewData.thumbnailUrl = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#d0d0d0"/><text x="50" y="50" text-anchor="middle" dy=".3em">PDF</text></svg>')}`;
  }

  return previewData;
}

export type { 
  EnhancedUploadedFile, 
  UseEnhancedMultimodalChatReturn 
};