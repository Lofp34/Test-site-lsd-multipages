/**
 * Tests pour le service d'analytics du chat Gemini
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { chatAnalyticsService } from '@/lib/gemini/analytics-service';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock fetch
const fetchMock = vi.fn();

// Setup global mocks
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

Object.defineProperty(global, 'fetch', {
  value: fetchMock
});

// Mock navigator
Object.defineProperty(window, 'navigator', {
  value: {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
});

describe('ChatAnalyticsService', () => {
  let analyticsService: any;

  beforeEach(() => {
    // Créer une nouvelle instance pour chaque test
    analyticsService = new (chatAnalyticsService.constructor as any)();
    
    // Clear mocks
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    });
  });

  afterEach(() => {
    // Nettoyer les timers
    if (analyticsService.flushTimer) {
      clearInterval(analyticsService.flushTimer);
    }
  });

  describe('Session Management', () => {
    test('should start a new session', () => {
      const sessionId = 'test-session-1';
      const conversationId = 'test-conversation-1';
      
      const session = analyticsService.startSession(sessionId, conversationId);
      
      expect(session).toBeDefined();
      expect(session.id).toBe(sessionId);
      expect(session.conversationId).toBe(conversationId);
      expect(session.startTime).toBeInstanceOf(Date);
      expect(session.messageCount).toBe(0);
      expect(session.deviceType).toBe('desktop');
    });

    test('should end a session', () => {
      const sessionId = 'test-session-2';
      
      // Démarrer la session
      analyticsService.startSession(sessionId);
      
      // Ajouter quelques messages
      analyticsService.trackMessage(sessionId, 'msg1', 'user', 50);
      analyticsService.trackMessage(sessionId, 'msg2', 'assistant', 100);
      
      // Terminer la session
      analyticsService.endSession(sessionId);
      
      const sessions = Array.from(analyticsService.sessions.values());
      const session = sessions.find(s => s.id === sessionId);
      
      expect(session?.endTime).toBeInstanceOf(Date);
    });

    test('should detect device type correctly', () => {
      // Mock mobile user agent
      Object.defineProperty(window, 'navigator', {
        value: {
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)'
        },
        configurable: true
      });
      
      const sessionId = 'test-session-mobile';
      const session = analyticsService.startSession(sessionId);
      
      expect(session.deviceType).toBe('mobile');
    });
  });

  describe('Message Tracking', () => {
    test('should track user messages', () => {
      const sessionId = 'test-session-3';
      analyticsService.startSession(sessionId);
      
      analyticsService.trackMessage(
        sessionId,
        'msg1',
        'user',
        50,
        {
          hasFiles: true,
          fileTypes: ['image/jpeg', 'image/png']
        }
      );
      
      expect(analyticsService.messages).toHaveLength(1);
      
      const message = analyticsService.messages[0];
      expect(message.sessionId).toBe(sessionId);
      expect(message.role).toBe('user');
      expect(message.messageLength).toBe(50);
      expect(message.hasFiles).toBe(true);
      expect(message.fileTypes).toEqual(['image/jpeg', 'image/png']);
    });

    test('should track assistant messages with performance data', () => {
      const sessionId = 'test-session-4';
      analyticsService.startSession(sessionId);
      
      analyticsService.trackMessage(
        sessionId,
        'msg2',
        'assistant',
        200,
        {
          processingTime: 1500,
          tokenCount: 50,
          errorOccurred: false
        }
      );
      
      expect(analyticsService.messages).toHaveLength(1);
      
      const message = analyticsService.messages[0];
      expect(message.role).toBe('assistant');
      expect(message.processingTime).toBe(1500);
      expect(message.tokenCount).toBe(50);
      expect(message.errorOccurred).toBe(false);
    });

    test('should update session message count', () => {
      const sessionId = 'test-session-5';
      analyticsService.startSession(sessionId);
      
      analyticsService.trackMessage(sessionId, 'msg1', 'user', 50);
      analyticsService.trackMessage(sessionId, 'msg2', 'assistant', 100);
      analyticsService.trackMessage(sessionId, 'msg3', 'user', 75);
      
      const session = analyticsService.sessions.get(sessionId);
      expect(session?.messageCount).toBe(3);
    });
  });

  describe('Error Tracking', () => {
    test('should track API errors', () => {
      const sessionId = 'test-session-6';
      analyticsService.startSession(sessionId);
      
      analyticsService.trackError(
        sessionId,
        'api_error',
        'Rate limit exceeded',
        {
          errorCode: '429',
          context: { endpoint: '/api/chat' },
          retryAttempted: true
        }
      );
      
      expect(analyticsService.errors).toHaveLength(1);
      
      const error = analyticsService.errors[0];
      expect(error.sessionId).toBe(sessionId);
      expect(error.errorType).toBe('api_error');
      expect(error.errorMessage).toBe('Rate limit exceeded');
      expect(error.errorCode).toBe('429');
      expect(error.retryAttempted).toBe(true);
    });

    test('should track different error types', () => {
      const sessionId = 'test-session-7';
      analyticsService.startSession(sessionId);
      
      analyticsService.trackError(sessionId, 'network_error', 'Connection timeout');
      analyticsService.trackError(sessionId, 'file_upload_error', 'File too large');
      analyticsService.trackError(sessionId, 'validation_error', 'Invalid input');
      
      expect(analyticsService.errors).toHaveLength(3);
      
      const errorTypes = analyticsService.errors.map(e => e.errorType);
      expect(errorTypes).toContain('network_error');
      expect(errorTypes).toContain('file_upload_error');
      expect(errorTypes).toContain('validation_error');
    });
  });

  describe('Performance Tracking', () => {
    test('should track response time metrics', () => {
      const sessionId = 'test-session-8';
      analyticsService.startSession(sessionId);
      
      analyticsService.trackPerformance(
        sessionId,
        'response_time',
        1500,
        'ms',
        { messageLength: 100 }
      );
      
      expect(analyticsService.performanceMetrics).toHaveLength(1);
      
      const metric = analyticsService.performanceMetrics[0];
      expect(metric.metricType).toBe('response_time');
      expect(metric.value).toBe(1500);
      expect(metric.unit).toBe('ms');
      expect(metric.context?.messageLength).toBe(100);
    });

    test('should track file upload performance', () => {
      const sessionId = 'test-session-9';
      analyticsService.startSession(sessionId);
      
      analyticsService.trackPerformance(
        sessionId,
        'file_upload_time',
        3000,
        'ms',
        {
          fileSize: 1024000,
          fileType: 'image/jpeg'
        }
      );
      
      const metric = analyticsService.performanceMetrics[0];
      expect(metric.metricType).toBe('file_upload_time');
      expect(metric.context?.fileSize).toBe(1024000);
      expect(metric.context?.fileType).toBe('image/jpeg');
    });

    test('should track streaming latency', () => {
      const sessionId = 'test-session-10';
      analyticsService.startSession(sessionId);
      
      analyticsService.trackPerformance(
        sessionId,
        'streaming_latency',
        200,
        'ms',
        {
          chunkCount: 10,
          totalChars: 500
        }
      );
      
      const metric = analyticsService.performanceMetrics[0];
      expect(metric.metricType).toBe('streaming_latency');
      expect(metric.value).toBe(200);
    });
  });

  describe('Statistics Generation', () => {
    test('should generate global statistics', () => {
      const sessionId1 = 'test-session-11';
      const sessionId2 = 'test-session-12';
      
      // Créer des sessions avec des données
      analyticsService.startSession(sessionId1);
      analyticsService.startSession(sessionId2);
      
      analyticsService.trackMessage(sessionId1, 'msg1', 'user', 50);
      analyticsService.trackMessage(sessionId1, 'msg2', 'assistant', 100);
      analyticsService.trackMessage(sessionId2, 'msg3', 'user', 75);
      
      analyticsService.trackError(sessionId1, 'api_error', 'Test error');
      
      analyticsService.endSession(sessionId1);
      analyticsService.endSession(sessionId2);
      
      const stats = analyticsService.getGlobalStats();
      
      expect(stats.totalSessions).toBe(2);
      expect(stats.totalMessages).toBe(3);
      expect(stats.totalErrors).toBe(1);
      expect(stats.errorRate).toBeCloseTo(0.333, 2);
      expect(stats.deviceBreakdown.desktop).toBe(2);
      expect(stats.topErrorTypes).toHaveLength(1);
      expect(stats.topErrorTypes[0].type).toBe('api_error');
    });

    test('should generate performance statistics', () => {
      const sessionId = 'test-session-13';
      analyticsService.startSession(sessionId);
      
      // Ajouter des métriques de performance
      analyticsService.trackPerformance(sessionId, 'response_time', 1000, 'ms');
      analyticsService.trackPerformance(sessionId, 'response_time', 1500, 'ms');
      analyticsService.trackPerformance(sessionId, 'response_time', 2000, 'ms');
      
      analyticsService.trackPerformance(sessionId, 'file_upload_time', 3000, 'ms');
      analyticsService.trackPerformance(sessionId, 'streaming_latency', 100, 'ms');
      analyticsService.trackPerformance(sessionId, 'token_processing_rate', 50, 'tokens_per_second');
      
      const stats = analyticsService.getPerformanceStats();
      
      expect(stats.averageResponseTime).toBe(1500); // (1000 + 1500 + 2000) / 3
      expect(stats.averageFileUploadTime).toBe(3000);
      expect(stats.averageStreamingLatency).toBe(100);
      expect(stats.tokenProcessingRate).toBe(50);
      expect(stats.performanceTrends).toBeDefined();
    });
  });

  describe('Data Management', () => {
    test('should trim storage when exceeding limits', () => {
      const sessionId = 'test-session-14';
      analyticsService.startSession(sessionId);
      
      // Simuler le dépassement de limite en modifiant la limite
      analyticsService.MAX_STORAGE_ITEMS = 5;
      
      // Ajouter plus de messages que la limite
      for (let i = 0; i < 10; i++) {
        analyticsService.trackMessage(sessionId, `msg${i}`, 'user', 50);
      }
      
      expect(analyticsService.messages.length).toBe(5);
    });

    test('should save to localStorage', () => {
      const sessionId = 'test-session-15';
      analyticsService.startSession(sessionId);
      analyticsService.trackMessage(sessionId, 'msg1', 'user', 50);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'chat_analytics',
        expect.any(String)
      );
    });

    test('should load from localStorage', () => {
      const mockData = {
        sessions: [['session1', {
          id: 'session1',
          startTime: new Date().toISOString(),
          messageCount: 1,
          userAgent: 'test',
          deviceType: 'desktop'
        }]],
        messages: [{
          sessionId: 'session1',
          messageId: 'msg1',
          timestamp: new Date().toISOString(),
          role: 'user',
          messageLength: 50,
          hasFiles: false,
          errorOccurred: false
        }],
        errors: [],
        performanceMetrics: [],
        conversationAnalytics: []
      };
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));
      
      // Créer une nouvelle instance qui devrait charger les données
      const newService = new (chatAnalyticsService.constructor as any)();
      
      expect(newService.sessions.size).toBe(1);
      expect(newService.messages).toHaveLength(1);
    });

    test('should export data correctly', () => {
      const sessionId = 'test-session-16';
      analyticsService.startSession(sessionId);
      analyticsService.trackMessage(sessionId, 'msg1', 'user', 50);
      analyticsService.trackError(sessionId, 'api_error', 'Test error');
      
      const exportedData = analyticsService.exportData();
      
      expect(exportedData.sessions).toHaveLength(1);
      expect(exportedData.messages).toHaveLength(1);
      expect(exportedData.errors).toHaveLength(1);
      expect(exportedData.performanceMetrics).toHaveLength(0);
      expect(exportedData.conversationAnalytics).toHaveLength(0);
    });

    test('should clear all data', () => {
      const sessionId = 'test-session-17';
      analyticsService.startSession(sessionId);
      analyticsService.trackMessage(sessionId, 'msg1', 'user', 50);
      analyticsService.trackError(sessionId, 'api_error', 'Test error');
      
      analyticsService.clearData();
      
      expect(analyticsService.sessions.size).toBe(0);
      expect(analyticsService.messages).toHaveLength(0);
      expect(analyticsService.errors).toHaveLength(0);
      expect(analyticsService.performanceMetrics).toHaveLength(0);
      expect(analyticsService.conversationAnalytics).toHaveLength(0);
    });
  });

  describe('Conversation Analytics', () => {
    test('should generate conversation analytics on session end', () => {
      const sessionId = 'test-session-18';
      analyticsService.startSession(sessionId);
      
      // Simuler une conversation
      analyticsService.trackMessage(sessionId, 'msg1', 'user', 50);
      analyticsService.trackMessage(sessionId, 'msg2', 'assistant', 100, { processingTime: 1000, tokenCount: 25 });
      analyticsService.trackMessage(sessionId, 'msg3', 'user', 75, { hasFiles: true, fileTypes: ['image/jpeg'] });
      analyticsService.trackMessage(sessionId, 'msg4', 'assistant', 150, { processingTime: 1500, tokenCount: 35 });
      
      analyticsService.trackPerformance(sessionId, 'response_time', 1000, 'ms');
      analyticsService.trackPerformance(sessionId, 'response_time', 1500, 'ms');
      
      // Attendre un peu pour simuler la durée de conversation
      setTimeout(() => {
        analyticsService.endSession(sessionId);
        
        const conversationAnalytics = analyticsService.getConversationAnalytics();
        expect(conversationAnalytics).toHaveLength(1);
        
        const analytics = conversationAnalytics[0];
        expect(analytics.sessionId).toBe(sessionId);
        expect(analytics.totalMessages).toBe(4);
        expect(analytics.averageResponseTime).toBe(1250); // (1000 + 1500) / 2
        expect(analytics.totalTokensUsed).toBe(60); // 25 + 35
        expect(analytics.filesUploaded).toBe(1);
        expect(analytics.topicsDiscussed).toContain('multimodal_interaction');
      }, 100);
    });

    test('should calculate conversion intent correctly', () => {
      const sessionId = 'test-session-19';
      analyticsService.startSession(sessionId);
      
      // Simuler une conversation longue avec fichiers (high intent)
      for (let i = 0; i < 10; i++) {
        analyticsService.trackMessage(sessionId, `msg${i}`, i % 2 === 0 ? 'user' : 'assistant', 100);
      }
      analyticsService.trackMessage(sessionId, 'msg_file', 'user', 50, { hasFiles: true });
      
      // Simuler une longue durée
      setTimeout(() => {
        analyticsService.endSession(sessionId);
        
        const conversationAnalytics = analyticsService.getConversationAnalytics();
        const analytics = conversationAnalytics[0];
        
        // Avec 11 messages, une longue durée et des fichiers, devrait être 'high'
        expect(analytics.conversionIntent).toBe('high');
      }, 350); // Plus de 300ms pour simuler une longue conversation
    });
  });

  describe('Server Communication', () => {
    test('should flush data to server', async () => {
      // Mock successful response
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true })
      });
      
      const sessionId = 'test-session-20';
      analyticsService.startSession(sessionId);
      analyticsService.trackMessage(sessionId, 'msg1', 'user', 50);
      
      // Déclencher le flush manuellement
      await analyticsService.flushToServer();
      
      expect(fetchMock).toHaveBeenCalled();
    });

    test('should handle server errors gracefully', async () => {
      // Mock error response
      fetchMock.mockRejectedValue(new Error('Network error'));
      
      const sessionId = 'test-session-21';
      analyticsService.startSession(sessionId);
      analyticsService.trackMessage(sessionId, 'msg1', 'user', 50);
      
      // Le flush ne devrait pas lever d'exception
      await expect(analyticsService.flushToServer()).resolves.not.toThrow();
    });
  });
});