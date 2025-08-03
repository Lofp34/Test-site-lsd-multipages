/**
 * Tests unitaires pour le hook useGeminiChat
 * Couvre la gestion d'état, l'envoi de messages, l'upload de fichiers et la récupération d'erreurs
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { ChatErrorType } from '@/lib/gemini/types';

// Mock des dépendances
vi.mock('@/lib/gemini/service');
vi.mock('@/lib/gemini/error-handler');
vi.mock('@/lib/gemini/error-recovery');
vi.mock('@/lib/gemini/analytics-service');
vi.mock('@/lib/gemini/cache-service');
vi.mock('@/lib/gemini/memory-manager');

// Mock de GeminiService
const mockGeminiService = {
  initializeChat: vi.fn(),
  sendMessageStream: vi.fn(),
  uploadFile: vi.fn(),
  getConversationHistory: vi.fn(),
  clearConversation: vi.fn(),
  startNewConversation: vi.fn(),
  getUsageStats: vi.fn(),
  isReady: vi.fn()
};

// Mock des services
const mockAnalytics = {
  startSession: vi.fn(),
  endSession: vi.fn(),
  trackMessage: vi.fn(),
  trackPerformance: vi.fn()
};

const mockCache = {
  get: vi.fn(),
  set: vi.fn()
};

const mockMemoryManager = {
  optimizeConversation: vi.fn()
};

const mockErrorHandler = {
  handleError: vi.fn(),
  resetRetryCount: vi.fn(),
  getRetryCount: vi.fn()
};

const mockErrorRecovery = {
  executeRecovery: vi.fn()
};

// Setup mocks
vi.mocked(require('@/lib/gemini/service')).GeminiService = vi.fn(() => mockGeminiService);
vi.mocked(require('@/lib/gemini/analytics-service')).useChatAnalytics = () => mockAnalytics;
vi.mocked(require('@/lib/gemini/cache-service')).useChatCache = () => mockCache;
vi.mocked(require('@/lib/gemini/memory-manager')).useChatMemoryManager = () => mockMemoryManager;
vi.mocked(require('@/lib/gemini/error-handler')).chatErrorHandler = mockErrorHandler;
vi.mocked(require('@/lib/gemini/error-recovery')).chatErrorRecoveryService = mockErrorRecovery;

describe('useGeminiChat', () => {
  const defaultConfig = {
    apiKey: 'test-api-key',
    systemInstruction: 'Tu es Laurent Serre, expert en développement commercial.',
    config: {
      model: 'gemini-2.5-flash' as const,
      temperature: 0.7,
      thinkingBudget: 0,
      maxTokens: 2048
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mock returns
    mockGeminiService.initializeChat.mockResolvedValue(undefined);
    mockGeminiService.getConversationHistory.mockResolvedValue([]);
    mockGeminiService.isReady.mockReturnValue(true);
    mockErrorHandler.getRetryCount.mockReturnValue(0);
    mockMemoryManager.optimizeConversation.mockReturnValue({ optimizedMessages: [] });
    mockCache.get.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initialisation', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      expect(result.current.messages).toEqual([]);
      expect(result.current.isStreaming).toBe(false);
      expect(result.current.streamingMessage).toBe('');
      expect(result.current.error).toBe(null);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.uploadProgress).toEqual({});
    });

    it('should initialize GeminiService on mount', async () => {
      renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(mockGeminiService.initializeChat).toHaveBeenCalled();
        expect(mockAnalytics.startSession).toHaveBeenCalled();
      });
    });

    it('should handle missing API key', async () => {
      const configWithoutKey = { ...defaultConfig, apiKey: '' };
      const { result } = renderHook(() => useGeminiChat(configWithoutKey));

      await waitFor(() => {
        expect(result.current.error).toEqual({
          type: ChatErrorType.API_UNAVAILABLE,
          message: 'API key missing',
          userMessage: 'Clé API Gemini manquante',
          retryable: false
        });
        expect(result.current.isInitialized).toBe(false);
      });
    });

    it('should load existing conversation history', async () => {
      const mockHistory = [
        {
          id: 'msg1',
          role: 'user' as const,
          content: 'Bonjour',
          timestamp: new Date()
        }
      ];
      
      mockGeminiService.getConversationHistory.mockResolvedValue(mockHistory);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.messages).toEqual(mockHistory);
        expect(result.current.isInitialized).toBe(true);
      });
    });

    it('should handle initialization error', async () => {
      const initError = new Error('Initialization failed');
      mockGeminiService.initializeChat.mockRejectedValue(initError);
      
      mockErrorHandler.handleError.mockResolvedValue({
        chatError: {
          type: ChatErrorType.API_UNAVAILABLE,
          message: 'Initialization failed',
          userMessage: 'Service indisponible',
          retryable: true
        },
        recoveryAction: { type: 'retry', delay: 1000 },
        shouldRetry: false
      });

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.error).toBeDefined();
        expect(result.current.isInitialized).toBe(false);
      });
    });
  });

  describe('Envoi de messages', () => {
    beforeEach(async () => {
      // Ensure service is initialized
      mockGeminiService.getConversationHistory.mockResolvedValue([]);
    });

    it('should send message successfully', async () => {
      const mockStream = (async function* () {
        yield 'Bonjour ';
        yield 'comment ';
        yield 'allez-vous ?';
      })();

      mockGeminiService.sendMessageStream.mockResolvedValue(mockStream);
      mockGeminiService.getConversationHistory.mockResolvedValue([
        {
          id: 'msg1',
          role: 'user',
          content: 'Bonjour',
          timestamp: new Date()
        },
        {
          id: 'msg2',
          role: 'assistant',
          content: 'Bonjour comment allez-vous ?',
          timestamp: new Date()
        }
      ]);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await result.current.sendMessage('Bonjour');
      });

      await waitFor(() => {
        expect(result.current.isStreaming).toBe(false);
        expect(result.current.messages).toHaveLength(2);
        expect(mockAnalytics.trackMessage).toHaveBeenCalledTimes(2);
      });
    });

    it('should handle empty message', async () => {
      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await result.current.sendMessage('');
      });

      expect(mockGeminiService.sendMessageStream).not.toHaveBeenCalled();
    });

    it('should use cached response when available', async () => {
      const cachedResponse = 'Réponse en cache';
      mockCache.get.mockReturnValue(cachedResponse);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await result.current.sendMessage('Question fréquente');
      });

      await waitFor(() => {
        expect(result.current.messages).toHaveLength(2);
        expect(result.current.messages[1].content).toBe(cachedResponse);
        expect(result.current.messages[1].metadata?.cached).toBe(true);
      });

      expect(mockGeminiService.sendMessageStream).not.toHaveBeenCalled();
    });

    it('should handle streaming error', async () => {
      const streamError = new Error('Streaming failed');
      mockGeminiService.sendMessageStream.mockRejectedValue(streamError);
      
      mockErrorHandler.handleError.mockResolvedValue({
        chatError: {
          type: ChatErrorType.NETWORK_ERROR,
          message: 'Streaming failed',
          userMessage: 'Erreur de connexion',
          retryable: true
        },
        recoveryAction: { type: 'retry', delay: 5000 },
        shouldRetry: false
      });

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await result.current.sendMessage('Test message');
      });

      await waitFor(() => {
        expect(result.current.error).toBeDefined();
        expect(result.current.error?.type).toBe(ChatErrorType.NETWORK_ERROR);
        expect(result.current.isStreaming).toBe(false);
      });
    });

    it('should update streaming message during stream', async () => {
      const mockStream = (async function* () {
        yield 'Première ';
        yield 'partie ';
        yield 'du message';
      })();

      mockGeminiService.sendMessageStream.mockResolvedValue(mockStream);
      mockGeminiService.getConversationHistory.mockResolvedValue([]);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      let streamingStates: string[] = [];
      
      await act(async () => {
        const promise = result.current.sendMessage('Test');
        
        // Capture streaming states
        await new Promise(resolve => setTimeout(resolve, 10));
        streamingStates.push(result.current.streamingMessage);
        
        await promise;
      });

      expect(result.current.isStreaming).toBe(false);
    });
  });

  describe('Upload de fichiers', () => {
    beforeEach(async () => {
      mockGeminiService.getConversationHistory.mockResolvedValue([]);
    });

    it('should upload file successfully', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockUploadedFile = {
        id: 'file1',
        name: 'test.jpg',
        uri: 'gs://bucket/test.jpg',
        mimeType: 'image/jpeg',
        size: 1024,
        uploadedAt: new Date()
      };

      mockGeminiService.uploadFile.mockResolvedValue(mockUploadedFile);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      let uploadedFile;
      await act(async () => {
        uploadedFile = await result.current.uploadFile(mockFile);
      });

      expect(uploadedFile).toEqual(mockUploadedFile);
      expect(mockAnalytics.trackPerformance).toHaveBeenCalledWith(
        expect.any(String),
        'file_upload_time',
        expect.any(Number),
        'ms',
        expect.objectContaining({
          fileSize: 1024,
          fileType: 'image/jpeg',
          fileName: 'test.jpg'
        })
      );
    });

    it('should track upload progress', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      // Simulate slow upload
      mockGeminiService.uploadFile.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          id: 'file1',
          name: 'test.jpg',
          uri: 'gs://bucket/test.jpg',
          mimeType: 'image/jpeg',
          size: 1024,
          uploadedAt: new Date()
        }), 200))
      );

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        const uploadPromise = result.current.uploadFile(mockFile);
        
        // Check progress during upload
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(Object.keys(result.current.uploadProgress)).toHaveLength(1);
        
        await uploadPromise;
      });

      // Progress should be cleaned up after upload
      await waitFor(() => {
        expect(Object.keys(result.current.uploadProgress)).toHaveLength(0);
      }, { timeout: 3000 });
    });

    it('should handle upload error', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const uploadError = new Error('Upload failed');
      
      mockGeminiService.uploadFile.mockRejectedValue(uploadError);
      mockErrorHandler.handleError.mockResolvedValue({
        chatError: {
          type: ChatErrorType.UPLOAD_FAILED,
          message: 'Upload failed',
          userMessage: 'Échec de l\'upload',
          retryable: true
        },
        recoveryAction: { type: 'retry', delay: 1000 },
        shouldRetry: false
      });

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await expect(result.current.uploadFile(mockFile)).rejects.toThrow();
      });

      expect(result.current.uploadProgress).toEqual({});
    });
  });

  describe('Gestion des conversations', () => {
    beforeEach(async () => {
      mockGeminiService.getConversationHistory.mockResolvedValue([]);
    });

    it('should clear messages', async () => {
      mockGeminiService.clearConversation.mockResolvedValue(undefined);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await result.current.clearMessages();
      });

      expect(result.current.messages).toEqual([]);
      expect(mockGeminiService.clearConversation).toHaveBeenCalled();
    });

    it('should start new conversation', async () => {
      const newConversationId = 'new-conversation-123';
      mockGeminiService.startNewConversation.mockResolvedValue(newConversationId);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      let conversationId;
      await act(async () => {
        conversationId = await result.current.startNewConversation();
      });

      expect(conversationId).toBe(newConversationId);
      expect(result.current.messages).toEqual([]);
    });

    it('should get conversation history', async () => {
      const mockHistory = [
        {
          id: 'msg1',
          role: 'user' as const,
          content: 'Test',
          timestamp: new Date()
        }
      ];
      
      mockGeminiService.getConversationHistory.mockResolvedValue(mockHistory);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      let history;
      await act(async () => {
        history = await result.current.getConversationHistory();
      });

      expect(history).toEqual(mockHistory);
    });

    it('should get usage stats', () => {
      const mockStats = { messagesCount: 5, tokensUsed: 150 };
      mockGeminiService.getUsageStats.mockReturnValue(mockStats);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      const stats = result.current.getUsageStats();
      expect(stats).toEqual(mockStats);
    });
  });

  describe('Gestion d\'erreurs et récupération', () => {
    beforeEach(async () => {
      mockGeminiService.getConversationHistory.mockResolvedValue([]);
    });

    it('should clear error', async () => {
      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      // Set an error first
      await act(async () => {
        result.current.clearError();
      });

      expect(result.current.error).toBe(null);
    });

    it('should retry last operation', async () => {
      const mockStream = (async function* () {
        yield 'Retry successful';
      })();

      mockGeminiService.sendMessageStream.mockResolvedValue(mockStream);
      mockGeminiService.getConversationHistory.mockResolvedValue([]);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // First, send a message to set up last operation
      await act(async () => {
        await result.current.sendMessage('Test message');
      });

      // Then retry
      await act(async () => {
        await result.current.retryLastOperation();
      });

      expect(mockGeminiService.sendMessageStream).toHaveBeenCalledTimes(2);
    });

    it('should handle automatic recovery', async () => {
      const streamError = new Error('Network error');
      mockGeminiService.sendMessageStream.mockRejectedValue(streamError);
      
      mockErrorHandler.handleError.mockResolvedValue({
        chatError: {
          type: ChatErrorType.NETWORK_ERROR,
          message: 'Network error',
          userMessage: 'Erreur de connexion',
          retryable: true
        },
        recoveryAction: { type: 'retry', delay: 1000 },
        shouldRetry: true
      });

      mockErrorRecovery.executeRecovery.mockResolvedValue({
        success: true,
        message: 'Récupération réussie'
      });

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await result.current.sendMessage('Test message');
      });

      expect(mockErrorRecovery.executeRecovery).toHaveBeenCalled();
    });

    it('should use fallback response when recovery provides one', async () => {
      const streamError = new Error('API error');
      mockGeminiService.sendMessageStream.mockRejectedValue(streamError);
      
      mockErrorHandler.handleError.mockResolvedValue({
        chatError: {
          type: ChatErrorType.API_UNAVAILABLE,
          message: 'API error',
          userMessage: 'Service indisponible',
          retryable: true
        },
        recoveryAction: { type: 'fallback', delay: 0 },
        shouldRetry: true
      });

      mockErrorRecovery.executeRecovery.mockResolvedValue({
        success: false,
        fallbackUsed: true,
        message: 'Réponse de secours'
      });

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await result.current.sendMessage('Test message');
      });

      await waitFor(() => {
        expect(result.current.error).toBe(null);
        expect(result.current.streamingMessage).toBe('Réponse de secours');
      });
    });
  });

  describe('Optimisation mémoire et cache', () => {
    beforeEach(async () => {
      mockGeminiService.getConversationHistory.mockResolvedValue([]);
    });

    it('should optimize conversation memory', async () => {
      const longHistory = Array.from({ length: 20 }, (_, i) => ({
        id: `msg${i}`,
        role: (i % 2 === 0 ? 'user' : 'assistant') as const,
        content: `Message ${i}`,
        timestamp: new Date()
      }));

      const optimizedHistory = longHistory.slice(-10);
      
      mockGeminiService.getConversationHistory.mockResolvedValue(longHistory);
      mockMemoryManager.optimizeConversation.mockReturnValue({
        optimizedMessages: optimizedHistory
      });

      const mockStream = (async function* () {
        yield 'Response';
      })();
      mockGeminiService.sendMessageStream.mockResolvedValue(mockStream);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await result.current.sendMessage('Test');
      });

      expect(mockMemoryManager.optimizeConversation).toHaveBeenCalled();
    });

    it('should cache responses for text-only messages', async () => {
      const mockStream = (async function* () {
        yield 'Cached response';
      })();

      mockGeminiService.sendMessageStream.mockResolvedValue(mockStream);
      mockGeminiService.getConversationHistory.mockResolvedValue([]);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await result.current.sendMessage('Question cachable');
      });

      expect(mockCache.set).toHaveBeenCalledWith(
        'Question cachable',
        'Cached response',
        undefined,
        expect.objectContaining({
          tokens: expect.any(Number),
          confidence: 0.8,
          source: 'gemini'
        })
      );
    });

    it('should not cache responses with files', async () => {
      const mockFiles = [{
        id: 'file1',
        name: 'test.jpg',
        uri: 'gs://bucket/test.jpg',
        mimeType: 'image/jpeg',
        size: 1024,
        uploadedAt: new Date()
      }];

      const mockStream = (async function* () {
        yield 'Response with file';
      })();

      mockGeminiService.sendMessageStream.mockResolvedValue(mockStream);
      mockGeminiService.getConversationHistory.mockResolvedValue([]);

      const { result } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      await act(async () => {
        await result.current.sendMessage('Analyse cette image', mockFiles);
      });

      expect(mockCache.set).not.toHaveBeenCalled();
    });
  });

  describe('Nettoyage et lifecycle', () => {
    it('should cleanup on unmount', () => {
      const { unmount } = renderHook(() => useGeminiChat(defaultConfig));

      unmount();

      expect(mockAnalytics.endSession).toHaveBeenCalled();
    });

    it('should abort ongoing requests on unmount', async () => {
      const { result, unmount } = renderHook(() => useGeminiChat(defaultConfig));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Start a message that would take time
      act(() => {
        result.current.sendMessage('Long message');
      });

      // Unmount before completion
      unmount();

      // Should not throw errors
      expect(mockAnalytics.endSession).toHaveBeenCalled();
    });
  });
});