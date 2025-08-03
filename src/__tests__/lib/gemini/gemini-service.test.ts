/**
 * Tests unitaires pour GeminiService
 * Couvre l'initialisation, l'envoi de messages, l'upload de fichiers et la gestion d'erreurs
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { GeminiService } from '@/lib/gemini/service';
import { ChatErrorType, GeminiConfig } from '@/lib/gemini/types';

// Mock des dépendances
vi.mock('@/lib/gemini/chat-history');
vi.mock('@/lib/gemini/cookie-free-mode');
vi.mock('@/lib/gemini/streaming');

// Mock global fetch
const mockFetch = vi.fn() as Mock;
global.fetch = mockFetch;

describe('GeminiService', () => {
  let geminiService: GeminiService;
  let mockConfig: GeminiConfig;

  beforeEach(() => {
    mockConfig = {
      model: 'gemini-2.5-flash',
      temperature: 0.7,
      thinkingBudget: 0,
      maxTokens: 2048,
      systemInstruction: 'Tu es Laurent Serre, expert en développement commercial.'
    };

    geminiService = new GeminiService('test-api-key', mockConfig);
    
    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initialisation', () => {
    it('should initialize with correct configuration', () => {
      expect(geminiService).toBeDefined();
      expect(geminiService.isReady()).toBe(false);
    });

    it('should initialize chat successfully', async () => {
      // Mock successful health check
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200
      });

      await geminiService.initializeChat();
      
      expect(geminiService.isReady()).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith('/api/chat/gemini', {
        method: 'OPTIONS'
      });
    });

    it('should handle initialization failure', async () => {
      // Mock failed health check
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await expect(geminiService.initializeChat()).rejects.toThrow();
      expect(geminiService.isReady()).toBe(false);
    });

    it('should initialize with default config when none provided', () => {
      const serviceWithDefaults = new GeminiService('test-key');
      expect(serviceWithDefaults).toBeDefined();
    });
  });

  describe('Envoi de messages', () => {
    beforeEach(async () => {
      // Mock successful initialization
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200
      });
      await geminiService.initializeChat();
    });

    it('should send message and return stream', async () => {
      const mockResponse = {
        ok: true,
        body: {
          getReader: () => ({
            read: vi.fn()
              .mockResolvedValueOnce({
                done: false,
                value: new TextEncoder().encode('data: {"text": "Bonjour"}\n')
              })
              .mockResolvedValueOnce({
                done: false,
                value: new TextEncoder().encode('data: {"text": " Laurent"}\n')
              })
              .mockResolvedValueOnce({
                done: true,
                value: undefined
              })
          })
        }
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      const stream = await geminiService.sendMessage('Bonjour');
      
      const chunks: string[] = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      expect(chunks).toEqual(['Bonjour', ' Laurent']);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/chat/gemini'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Accept': 'text/event-stream'
          })
        })
      );
    });

    it('should handle API error during message sending', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ error: 'Rate limit exceeded' })
      });

      await expect(geminiService.sendMessage('Test')).rejects.toThrow();
    });

    it('should auto-initialize if not ready', async () => {
      const uninitializedService = new GeminiService('test-key', mockConfig);
      
      // Mock initialization and message sending
      mockFetch
        .mockResolvedValueOnce({ ok: true, status: 200 }) // Health check
        .mockResolvedValueOnce({ // Message response
          ok: true,
          body: {
            getReader: () => ({
              read: vi.fn().mockResolvedValueOnce({
                done: true,
                value: undefined
              })
            })
          }
        });

      const stream = await uninitializedService.sendMessage('Test');
      expect(uninitializedService.isReady()).toBe(true);
    });

    it('should include files in message when provided', async () => {
      const mockFiles = [{
        id: 'file1',
        name: 'test.jpg',
        uri: 'data:image/jpeg;base64,test',
        mimeType: 'image/jpeg',
        size: 1024,
        uploadedAt: new Date()
      }];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        body: {
          getReader: () => ({
            read: vi.fn().mockResolvedValueOnce({
              done: true,
              value: undefined
            })
          })
        }
      });

      await geminiService.sendMessage('Analyse cette image', mockFiles);
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('message=Analyse%20cette%20image'),
        expect.any(Object)
      );
    });
  });

  describe('Upload de fichiers', () => {
    beforeEach(async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });
      await geminiService.initializeChat();
    });

    it('should upload file successfully', async () => {
      const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(mockFile, 'size', { value: 1024 });

      const mockUploadResponse = {
        ok: true,
        json: async () => ({
          id: 'uploaded-file-id',
          uri: 'gs://bucket/file.jpg'
        })
      };

      mockFetch.mockResolvedValueOnce(mockUploadResponse);

      const result = await geminiService.uploadFile(mockFile);

      expect(result).toEqual({
        id: 'uploaded-file-id',
        name: 'test.jpg',
        uri: 'gs://bucket/file.jpg',
        mimeType: 'image/jpeg',
        size: 1024,
        uploadedAt: expect.any(Date)
      });

      expect(mockFetch).toHaveBeenCalledWith('/api/chat/files/upload', {
        method: 'POST',
        body: expect.any(FormData)
      });
    });

    it('should validate file size before upload', async () => {
      const largeFile = new File(['test'], 'large.jpg', { type: 'image/jpeg' });
      Object.defineProperty(largeFile, 'size', { value: 15 * 1024 * 1024 }); // 15MB

      await expect(geminiService.uploadFile(largeFile)).rejects.toThrow('File too large');
    });

    it('should validate file type before upload', async () => {
      const invalidFile = new File(['test'], 'doc.pdf', { type: 'application/pdf' });
      Object.defineProperty(invalidFile, 'size', { value: 1024 });

      await expect(geminiService.uploadFile(invalidFile)).rejects.toThrow('Unsupported file type');
    });

    it('should handle upload API error', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(mockFile, 'size', { value: 1024 });

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Upload failed' })
      });

      await expect(geminiService.uploadFile(mockFile)).rejects.toThrow();
    });
  });

  describe('Gestion de l\'historique', () => {
    beforeEach(async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });
      await geminiService.initializeChat();
    });

    it('should return conversation history', async () => {
      const history = await geminiService.getConversationHistory();
      expect(Array.isArray(history)).toBe(true);
    });

    it('should clear conversation', async () => {
      // Mock re-initialization after clear
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });
      
      await expect(geminiService.clearConversation()).resolves.not.toThrow();
    });

    it('should start new conversation', async () => {
      // Mock re-initialization
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });
      
      const newId = await geminiService.startNewConversation();
      expect(typeof newId).toBe('string');
      expect(newId.length).toBeGreaterThan(0);
    });

    it('should get current conversation ID', () => {
      const id = geminiService.getCurrentConversationId();
      expect(typeof id).toBe('string');
    });
  });

  describe('Gestion d\'erreurs', () => {
    it('should handle quota exceeded error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ error: 'quota exceeded' })
      });

      try {
        await geminiService.sendMessage('Test');
      } catch (error: any) {
        expect(error.type).toBe(ChatErrorType.QUOTA_EXCEEDED);
        expect(error.retryable).toBe(true);
        expect(error.retryAfter).toBe(60000);
      }
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('NetworkError'));

      try {
        await geminiService.sendMessage('Test');
      } catch (error: any) {
        expect(error.type).toBe(ChatErrorType.NETWORK_ERROR);
        expect(error.retryable).toBe(true);
      }
    });

    it('should handle generic API error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal server error' })
      });

      try {
        await geminiService.sendMessage('Test');
      } catch (error: any) {
        expect(error.type).toBe(ChatErrorType.API_UNAVAILABLE);
        expect(error.userMessage).toContain('temporairement indisponible');
      }
    });
  });

  describe('Statistiques et monitoring', () => {
    it('should return usage stats', () => {
      const stats = geminiService.getUsageStats();
      expect(stats).toBeDefined();
    });

    it('should return session stats', () => {
      const sessionStats = geminiService.getSessionStats();
      expect(sessionStats).toHaveProperty('isInitialized');
      expect(sessionStats).toHaveProperty('configValid');
    });
  });

  describe('Streaming sécurisé', () => {
    beforeEach(async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });
      await geminiService.initializeChat();
    });

    it('should handle streaming response correctly', async () => {
      const mockStreamData = [
        'data: {"text": "Bonjour"}\n',
        'data: {"text": " comment"}\n',
        'data: {"text": " allez-vous ?"}\n',
        'data: [DONE]\n'
      ];

      let dataIndex = 0;
      const mockResponse = {
        ok: true,
        body: {
          getReader: () => ({
            read: vi.fn().mockImplementation(() => {
              if (dataIndex < mockStreamData.length) {
                const data = mockStreamData[dataIndex++];
                return Promise.resolve({
                  done: false,
                  value: new TextEncoder().encode(data)
                });
              }
              return Promise.resolve({ done: true, value: undefined });
            })
          })
        }
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      const stream = await geminiService.sendMessage('Bonjour');
      const chunks: string[] = [];
      
      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      expect(chunks).toEqual(['Bonjour', ' comment', ' allez-vous ?']);
    });

    it('should handle malformed streaming data gracefully', async () => {
      const mockResponse = {
        ok: true,
        body: {
          getReader: () => ({
            read: vi.fn()
              .mockResolvedValueOnce({
                done: false,
                value: new TextEncoder().encode('data: invalid json\n')
              })
              .mockResolvedValueOnce({
                done: false,
                value: new TextEncoder().encode('data: {"text": "valid"}\n')
              })
              .mockResolvedValueOnce({
                done: true,
                value: undefined
              })
          })
        }
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      const stream = await geminiService.sendMessage('Test');
      const chunks: string[] = [];
      
      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      // Should only include valid chunks
      expect(chunks).toEqual(['valid']);
    });

    it('should handle stream reading errors', async () => {
      const mockResponse = {
        ok: true,
        body: {
          getReader: () => ({
            read: vi.fn().mockRejectedValue(new Error('Stream error'))
          })
        }
      };

      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(async () => {
        const stream = await geminiService.sendMessage('Test');
        for await (const chunk of stream) {
          // Should throw during iteration
        }
      }).rejects.toThrow();
    });
  });

  describe('Configuration et validation', () => {
    it('should work with minimal configuration', () => {
      const minimalService = new GeminiService('test-key');
      expect(minimalService).toBeDefined();
    });

    it('should validate configuration on creation', () => {
      const invalidConfig = {
        ...mockConfig,
        model: 'invalid-model' as any
      };

      // Should not throw on creation, but validation should fail
      const service = new GeminiService('test-key', invalidConfig);
      const stats = service.getSessionStats();
      expect(stats.configValid).toBe(false);
    });

    it('should handle missing API key gracefully', () => {
      const service = new GeminiService('');
      expect(service).toBeDefined();
    });
  });
});