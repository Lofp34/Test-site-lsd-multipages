/**
 * Tests pour l'intégration analytics du chat Gemini
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { AnalyticsIntegratedGeminiService, useAnalyticsIntegration, AnalyticsUtils } from '@/lib/gemini/analytics-integration';
import { chatAnalyticsService } from '@/lib/gemini/analytics-service';

// Mock du service d'analytics
vi.mock('@/lib/gemini/analytics-service', () => ({
  chatAnalyticsService: {
    startSession: vi.fn(),
    endSession: vi.fn(),
    trackMessage: vi.fn(),
    trackError: vi.fn(),
    trackPerformance: vi.fn(),
    getGlobalStats: vi.fn(),
    getPerformanceStats: vi.fn(),
    getConversationAnalytics: vi.fn()
  }
}));

// Mock navigator
Object.defineProperty(window, 'navigator', {
  value: {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  configurable: true
});

describe('AnalyticsIntegratedGeminiService', () => {
  let analyticsService: AnalyticsIntegratedGeminiService;
  const sessionId = 'test-session';
  const conversationId = 'test-conversation';

  beforeEach(() => {
    vi.clearAllMocks();
    analyticsService = new AnalyticsIntegratedGeminiService(sessionId, conversationId);
  });

  describe('Initialization', () => {
    test('should start analytics session on creation', () => {
      expect(chatAnalyticsService.startSession).toHaveBeenCalledWith(sessionId, conversationId);
    });
  });

  describe('Message Sending with Analytics', () => {
    test('should track message and performance on successful send', async () => {
      const mockSendMessage = vi.fn().mockResolvedValue({
        text: 'Test response from AI'
      });

      const message = 'Hello, how are you?';
      const files = [new File(['test'], 'test.txt', { type: 'text/plain' })];

      const result = await analyticsService.sendMessageWithAnalytics(
        mockSendMessage,
        message,
        files
      );

      // Vérifier que le message original a été appelé
      expect(mockSendMessage).toHaveBeenCalledWith(message, files);

      // Vérifier le tracking du message utilisateur
      expect(chatAnalyticsService.trackMessage).toHaveBeenCalledWith(
        sessionId,
        expect.stringContaining('_user'),
        'user',
        message.length,
        {
          hasFiles: true,
          fileTypes: ['text/plain']
        }
      );

      // Vérifier le tracking de la performance
      expect(chatAnalyticsService.trackPerformance).toHaveBeenCalledWith(
        sessionId,
        'response_time',
        expect.any(Number),
        'ms',
        expect.objectContaining({
          messageLength: message.length,
          hasFiles: true,
          fileCount: 1
        })
      );

      // Vérifier le tracking du message assistant
      expect(chatAnalyticsService.trackMessage).toHaveBeenCalledWith(
        sessionId,
        expect.stringContaining('_assistant'),
        'assistant',
        'Test response from AI'.length,
        expect.objectContaining({
          processingTime: expect.any(Number),
          tokenCount: expect.any(Number),
          errorOccurred: false
        })
      );

      expect(result.text).toBe('Test response from AI');
    });

    test('should track error on failed send', async () => {
      const mockError = new Error('API Error');
      const mockSendMessage = vi.fn().mockRejectedValue(mockError);

      const message = 'Hello, how are you?';

      await expect(
        analyticsService.sendMessageWithAnalytics(mockSendMessage, message)
      ).rejects.toThrow('API Error');

      // Vérifier le tracking de l'erreur
      expect(chatAnalyticsService.trackError).toHaveBeenCalledWith(
        sessionId,
        'api_error',
        'API Error',
        expect.objectContaining({
          errorCode: undefined,
          context: undefined,
          retryAttempted: false
        })
      );
    });
  });

  describe('File Upload with Analytics', () => {
    test('should track upload performance on successful upload', async () => {
      const mockUploadFile = vi.fn().mockResolvedValue({
        uri: 'test-uri',
        mimeType: 'image/jpeg'
      });

      const file = new File(['test image'], 'test.jpg', { type: 'image/jpeg' });

      const result = await analyticsService.uploadFileWithAnalytics(
        mockUploadFile,
        file
      );

      expect(mockUploadFile).toHaveBeenCalledWith(file);

      expect(chatAnalyticsService.trackPerformance).toHaveBeenCalledWith(
        sessionId,
        'file_upload_time',
        expect.any(Number),
        'ms',
        {
          fileSize: file.size,
          fileType: file.type,
          fileName: file.name
        }
      );

      expect(result.uri).toBe('test-uri');
    });

    test('should track error on failed upload', async () => {
      const mockError = new Error('Upload failed');
      const mockUploadFile = vi.fn().mockRejectedValue(mockError);

      const file = new File(['test'], 'test.txt', { type: 'text/plain' });

      await expect(
        analyticsService.uploadFileWithAnalytics(mockUploadFile, file)
      ).rejects.toThrow('Upload failed');

      expect(chatAnalyticsService.trackError).toHaveBeenCalledWith(
        sessionId,
        'file_upload_error',
        'Upload failed',
        expect.objectContaining({
          context: {
            fileSize: file.size,
            fileType: file.type,
            fileName: file.name
          }
        })
      );
    });
  });

  describe('Streaming with Analytics', () => {
    test('should track streaming performance', async () => {
      const mockChunks = [
        { text: 'Hello' },
        { text: ' world' },
        { text: '!' }
      ];

      async function* mockStream() {
        for (const chunk of mockChunks) {
          yield chunk;
        }
      }

      const chunks = [];
      for await (const chunk of analyticsService.streamWithAnalytics(mockStream())) {
        chunks.push(chunk);
      }

      expect(chunks).toEqual(mockChunks);

      // Vérifier que les métriques de streaming ont été trackées
      expect(chatAnalyticsService.trackPerformance).toHaveBeenCalledWith(
        sessionId,
        'token_processing_rate',
        expect.any(Number),
        'tokens_per_second',
        expect.objectContaining({
          totalChars: expect.any(Number),
          totalStreamTime: expect.any(Number),
          chunkCount: expect.any(Number)
        })
      );
    });

    test('should track error during streaming', async () => {
      const mockError = new Error('Streaming error');

      async function* mockStream() {
        yield { text: 'Hello' };
        throw mockError;
      }

      await expect(async () => {
        for await (const chunk of analyticsService.streamWithAnalytics(mockStream())) {
          // Process chunk
        }
      }).rejects.toThrow('Streaming error');

      expect(chatAnalyticsService.trackError).toHaveBeenCalledWith(
        sessionId,
        'api_error',
        'Streaming error',
        expect.objectContaining({
          context: expect.objectContaining({
            streamingContext: true
          })
        })
      );
    });
  });

  describe('Session Management', () => {
    test('should end session', () => {
      analyticsService.endSession();
      expect(chatAnalyticsService.endSession).toHaveBeenCalledWith(sessionId);
    });
  });

  describe('Error Tracking', () => {
    test('should track different error types', () => {
      const error = new Error('Test error');
      error.code = '500';

      analyticsService.trackError('network_error', error, { custom: 'context' });

      expect(chatAnalyticsService.trackError).toHaveBeenCalledWith(
        sessionId,
        'network_error',
        'Test error',
        {
          errorCode: '500',
          context: { custom: 'context' },
          retryAttempted: false
        }
      );
    });

    test('should track retry attempts', () => {
      const error = new Error('Retry error');

      analyticsService.trackRetry('api_error', error, { retry: 'attempt' });

      expect(chatAnalyticsService.trackError).toHaveBeenCalledWith(
        sessionId,
        'api_error',
        'Retry error',
        {
          errorCode: undefined,
          context: { retry: 'attempt' },
          retryAttempted: true
        }
      );
    });
  });
});

describe('AnalyticsUtils', () => {
  describe('ID Generation', () => {
    test('should create unique session IDs', () => {
      const id1 = AnalyticsUtils.createSessionId();
      const id2 = AnalyticsUtils.createSessionId();

      expect(id1).toMatch(/^session_\d+_[a-z0-9]+$/);
      expect(id2).toMatch(/^session_\d+_[a-z0-9]+$/);
      expect(id1).not.toBe(id2);
    });

    test('should create unique conversation IDs', () => {
      const id1 = AnalyticsUtils.createConversationId();
      const id2 = AnalyticsUtils.createConversationId();

      expect(id1).toMatch(/^conv_\d+_[a-z0-9]+$/);
      expect(id2).toMatch(/^conv_\d+_[a-z0-9]+$/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('Device Detection', () => {
    test('should detect mobile device', () => {
      Object.defineProperty(window, 'navigator', {
        value: {
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)'
        },
        configurable: true
      });

      expect(AnalyticsUtils.isMobileDevice()).toBe(true);
    });

    test('should detect desktop device', () => {
      Object.defineProperty(window, 'navigator', {
        value: {
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        configurable: true
      });

      expect(AnalyticsUtils.isMobileDevice()).toBe(false);
    });
  });

  describe('Session Info', () => {
    test('should get session information', () => {
      const sessionInfo = AnalyticsUtils.getSessionInfo();

      expect(sessionInfo).toHaveProperty('userAgent');
      expect(sessionInfo).toHaveProperty('referrer');
      expect(sessionInfo).toHaveProperty('timestamp');
      expect(sessionInfo).toHaveProperty('timezone');
      expect(sessionInfo).toHaveProperty('language');
      expect(sessionInfo.timestamp).toBeInstanceOf(Date);
    });
  });

  describe('Performance Metrics', () => {
    test('should calculate performance metrics', () => {
      const startTime = 1000;
      const endTime = 2500;
      const dataSize = 1000;

      const metrics = AnalyticsUtils.calculatePerformanceMetrics(startTime, endTime, dataSize);

      expect(metrics.duration).toBe(1500);
      expect(metrics.throughput).toBeCloseTo(666.67, 1);
      expect(metrics.efficiency).toBe('good'); // 1500ms is in the 'good' range
    });

    test('should classify efficiency correctly', () => {
      expect(AnalyticsUtils.calculatePerformanceMetrics(0, 500).efficiency).toBe('excellent');
      expect(AnalyticsUtils.calculatePerformanceMetrics(0, 2000).efficiency).toBe('good');
      expect(AnalyticsUtils.calculatePerformanceMetrics(0, 4000).efficiency).toBe('average');
      expect(AnalyticsUtils.calculatePerformanceMetrics(0, 6000).efficiency).toBe('poor');
    });
  });

  describe('Data Validation', () => {
    test('should validate correct analytics data', () => {
      const validData = {
        sessionId: 'test-session',
        timestamp: new Date(),
        message: 'test message'
      };

      expect(AnalyticsUtils.validateAnalyticsData(validData)).toBe(true);
    });

    test('should reject invalid analytics data', () => {
      expect(AnalyticsUtils.validateAnalyticsData(null)).toBe(false);
      expect(AnalyticsUtils.validateAnalyticsData({})).toBe(false);
      expect(AnalyticsUtils.validateAnalyticsData({ sessionId: 'test' })).toBe(false);
      expect(AnalyticsUtils.validateAnalyticsData({ 
        sessionId: 'test', 
        timestamp: 'invalid-date' 
      })).toBe(false);
    });
  });

  describe('Data Formatting', () => {
    test('should format data for export', () => {
      const data = { test: 'value', number: 123 };
      const formatted = AnalyticsUtils.formatDataForExport(data);

      expect(formatted).toBe(JSON.stringify(data, null, 2));
    });

    test('should handle formatting errors', () => {
      const circularData = {};
      circularData.self = circularData;

      const formatted = AnalyticsUtils.formatDataForExport(circularData);
      expect(formatted).toBe('Error formatting data');
    });
  });
});

describe('useAnalyticsIntegration Hook', () => {
  test('should provide analytics integration methods', () => {
    const sessionId = 'test-session';
    const conversationId = 'test-conversation';

    const integration = useAnalyticsIntegration(sessionId, conversationId);

    expect(integration).toHaveProperty('sendMessageWithAnalytics');
    expect(integration).toHaveProperty('uploadFileWithAnalytics');
    expect(integration).toHaveProperty('streamWithAnalytics');
    expect(integration).toHaveProperty('trackError');
    expect(integration).toHaveProperty('trackRetry');
    expect(integration).toHaveProperty('endSession');
    expect(integration).toHaveProperty('getGlobalStats');
    expect(integration).toHaveProperty('getPerformanceStats');
    expect(integration).toHaveProperty('getConversationAnalytics');

    expect(typeof integration.sendMessageWithAnalytics).toBe('function');
    expect(typeof integration.uploadFileWithAnalytics).toBe('function');
    expect(typeof integration.streamWithAnalytics).toBe('function');
    expect(typeof integration.trackError).toBe('function');
    expect(typeof integration.trackRetry).toBe('function');
    expect(typeof integration.endSession).toBe('function');
    expect(typeof integration.getGlobalStats).toBe('function');
    expect(typeof integration.getPerformanceStats).toBe('function');
    expect(typeof integration.getConversationAnalytics).toBe('function');
  });
});