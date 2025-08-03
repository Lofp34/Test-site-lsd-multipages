/**
 * Tests unitaires pour la gestion d'erreurs du chat Gemini
 * Couvre le ChatErrorHandler et les mécanismes de récupération
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { chatErrorHandler, ErrorContext } from '@/lib/gemini/error-handler';
import { chatErrorRecoveryService } from '@/lib/gemini/error-recovery';
import { ChatErrorType } from '@/lib/gemini/types';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('ChatErrorHandler', () => {
  let errorContext: ErrorContext;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    
    errorContext = {
      sessionId: 'test-session-123',
      operation: 'send_message',
      userAgent: 'Mozilla/5.0 Test Browser',
      timestamp: new Date(),
      retryCount: 0
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Identification des types d\'erreurs', () => {
    it('should identify API unavailable error', async () => {
      const error = new Error('Service unavailable');
      
      const result = await chatErrorHandler.handleError(error, errorContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.API_UNAVAILABLE);
      expect(result.chatError.userMessage).toContain('temporairement indisponible');
      expect(result.chatError.retryable).toBe(true);
    });

    it('should identify quota exceeded error', async () => {
      const error = new Error('quota exceeded');
      
      const result = await chatErrorHandler.handleError(error, errorContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.QUOTA_EXCEEDED);
      expect(result.chatError.userMessage).toContain('Limite d\'utilisation atteinte');
      expect(result.chatError.retryAfter).toBe(60000);
    });

    it('should identify rate limit error', async () => {
      const error = new Error('rate limit exceeded');
      
      const result = await chatErrorHandler.handleError(error, errorContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.RATE_LIMIT);
      expect(result.chatError.retryable).toBe(true);
    });

    it('should identify network error', async () => {
      const error = new Error('NetworkError');
      error.name = 'NetworkError';
      
      const result = await chatErrorHandler.handleError(error, errorContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.NETWORK_ERROR);
      expect(result.chatError.userMessage).toContain('Erreur de connexion');
      expect(result.chatError.retryAfter).toBe(5000);
    });

    it('should identify file too large error', async () => {
      const error = new Error('File too large: 15MB');
      
      const result = await chatErrorHandler.handleError(error, errorContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.FILE_TOO_LARGE);
      expect(result.chatError.userMessage).toContain('Fichier trop volumineux');
      expect(result.chatError.retryable).toBe(false);
    });

    it('should identify unsupported file type error', async () => {
      const error = new Error('Unsupported file type: application/pdf');
      
      const result = await chatErrorHandler.handleError(error, errorContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.UNSUPPORTED_FILE);
      expect(result.chatError.userMessage).toContain('Type de fichier non supporté');
      expect(result.chatError.retryable).toBe(false);
    });
  });

  describe('Stratégies de récupération', () => {
    it('should suggest retry for retryable errors', async () => {
      const error = new Error('Temporary network issue');
      error.name = 'NetworkError';
      
      const result = await chatErrorHandler.handleError(error, errorContext);
      
      expect(result.recoveryAction.type).toBe('retry');
      expect(result.recoveryAction.delay).toBeGreaterThan(0);
      expect(result.shouldRetry).toBe(true);
    });

    it('should not suggest retry for non-retryable errors', async () => {
      const error = new Error('File too large');
      
      const result = await chatErrorHandler.handleError(error, errorContext);
      
      expect(result.shouldRetry).toBe(false);
      expect(result.recoveryAction.type).toBe('user_action');
    });

    it('should increase retry delay with retry count', async () => {
      const errorContextWithRetries = {
        ...errorContext,
        retryCount: 3
      };
      
      const error = new Error('NetworkError');
      error.name = 'NetworkError';
      
      const result = await chatErrorHandler.handleError(error, errorContextWithRetries);
      
      expect(result.recoveryAction.delay).toBeGreaterThan(5000); // Base delay
    });

    it('should stop retrying after max attempts', async () => {
      const errorContextMaxRetries = {
        ...errorContext,
        retryCount: 5
      };
      
      const error = new Error('NetworkError');
      error.name = 'NetworkError';
      
      const result = await chatErrorHandler.handleError(error, errorContextMaxRetries);
      
      expect(result.shouldRetry).toBe(false);
      expect(result.recoveryAction.type).toBe('fallback');
    });
  });

  describe('Gestion des compteurs de retry', () => {
    it('should track retry count per session and operation', () => {
      const sessionId = 'session-123';
      const operation = 'send_message';
      
      chatErrorHandler.incrementRetryCount(sessionId, operation);
      chatErrorHandler.incrementRetryCount(sessionId, operation);
      
      const count = chatErrorHandler.getRetryCount(sessionId, operation);
      expect(count).toBe(2);
    });

    it('should reset retry count', () => {
      const sessionId = 'session-123';
      const operation = 'send_message';
      
      chatErrorHandler.incrementRetryCount(sessionId, operation);
      chatErrorHandler.resetRetryCount(sessionId, operation);
      
      const count = chatErrorHandler.getRetryCount(sessionId, operation);
      expect(count).toBe(0);
    });

    it('should handle different operations separately', () => {
      const sessionId = 'session-123';
      
      chatErrorHandler.incrementRetryCount(sessionId, 'send_message');
      chatErrorHandler.incrementRetryCount(sessionId, 'upload_file');
      chatErrorHandler.incrementRetryCount(sessionId, 'send_message');
      
      expect(chatErrorHandler.getRetryCount(sessionId, 'send_message')).toBe(2);
      expect(chatErrorHandler.getRetryCount(sessionId, 'upload_file')).toBe(1);
    });
  });

  describe('Logging et analytics', () => {
    it('should log error details', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const error = new Error('Test error');
      await chatErrorHandler.handleError(error, errorContext);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Chat Error Handler'),
        expect.objectContaining({
          error: error,
          context: errorContext
        })
      );
      
      consoleSpy.mockRestore();
    });

    it('should save error statistics', async () => {
      const error = new Error('Test error');
      await chatErrorHandler.handleError(error, errorContext);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'chat_error_stats',
        expect.any(String)
      );
    });

    it('should track error patterns', async () => {
      const error1 = new Error('NetworkError');
      error1.name = 'NetworkError';
      
      const error2 = new Error('NetworkError');
      error2.name = 'NetworkError';
      
      await chatErrorHandler.handleError(error1, errorContext);
      await chatErrorHandler.handleError(error2, {
        ...errorContext,
        timestamp: new Date(Date.now() + 1000)
      });
      
      const stats = chatErrorHandler.getErrorStats();
      expect(stats.networkErrors).toBe(2);
      expect(stats.totalErrors).toBe(2);
    });
  });

  describe('Messages d\'erreur contextuels', () => {
    it('should provide specific message for file upload errors', async () => {
      const uploadContext = {
        ...errorContext,
        operation: 'upload_file' as const,
        fileInfo: {
          name: 'large-image.jpg',
          size: 15 * 1024 * 1024,
          type: 'image/jpeg'
        }
      };
      
      const error = new Error('File too large');
      const result = await chatErrorHandler.handleError(error, uploadContext);
      
      expect(result.chatError.userMessage).toContain('Fichier trop volumineux');
      expect(result.recoveryAction.suggestion).toContain('Réduisez la taille');
    });

    it('should provide specific message for streaming errors', async () => {
      const streamingContext = {
        ...errorContext,
        operation: 'send_message' as const,
        messageInfo: {
          length: 150,
          hasFiles: false
        }
      };
      
      const error = new Error('Stream interrupted');
      const result = await chatErrorHandler.handleError(error, streamingContext);
      
      expect(result.chatError.userMessage).toContain('Connexion interrompue');
      expect(result.recoveryAction.type).toBe('retry');
    });

    it('should adapt message based on user context', async () => {
      const mobileContext = {
        ...errorContext,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        deviceType: 'mobile' as const
      };
      
      const error = new Error('NetworkError');
      error.name = 'NetworkError';
      
      const result = await chatErrorHandler.handleError(error, mobileContext);
      
      expect(result.chatError.userMessage).toContain('connexion mobile');
      expect(result.recoveryAction.suggestion).toContain('Wi-Fi');
    });
  });
});

describe('ChatErrorRecoveryService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Stratégies de récupération', () => {
    it('should execute retry recovery', async () => {
      const chatError = {
        type: ChatErrorType.NETWORK_ERROR,
        message: 'Network error',
        userMessage: 'Erreur de connexion',
        retryable: true,
        retryAfter: 1000
      };
      
      const context: ErrorContext = {
        sessionId: 'test-session',
        operation: 'send_message',
        userAgent: 'test',
        timestamp: new Date(),
        retryCount: 1
      };
      
      const result = await chatErrorRecoveryService.executeRecovery(chatError, context);
      
      expect(result.success).toBe(true);
      expect(result.strategy).toBe('retry');
    });

    it('should provide fallback response for API errors', async () => {
      const chatError = {
        type: ChatErrorType.API_UNAVAILABLE,
        message: 'API unavailable',
        userMessage: 'Service indisponible',
        retryable: false
      };
      
      const context: ErrorContext = {
        sessionId: 'test-session',
        operation: 'send_message',
        userAgent: 'test',
        timestamp: new Date(),
        retryCount: 3
      };
      
      const result = await chatErrorRecoveryService.executeRecovery(chatError, context);
      
      expect(result.fallbackUsed).toBe(true);
      expect(result.message).toContain('Laurent Serre');
      expect(result.message).toContain('temporairement indisponible');
    });

    it('should handle quota exceeded with specific guidance', async () => {
      const chatError = {
        type: ChatErrorType.QUOTA_EXCEEDED,
        message: 'Quota exceeded',
        userMessage: 'Limite atteinte',
        retryable: true,
        retryAfter: 60000
      };
      
      const context: ErrorContext = {
        sessionId: 'test-session',
        operation: 'send_message',
        userAgent: 'test',
        timestamp: new Date(),
        retryCount: 0
      };
      
      const result = await chatErrorRecoveryService.executeRecovery(chatError, context);
      
      expect(result.fallbackUsed).toBe(true);
      expect(result.message).toContain('limite d\'utilisation');
      expect(result.message).toContain('contact direct');
    });

    it('should provide file-specific recovery for upload errors', async () => {
      const chatError = {
        type: ChatErrorType.FILE_TOO_LARGE,
        message: 'File too large',
        userMessage: 'Fichier trop volumineux',
        retryable: false
      };
      
      const context: ErrorContext = {
        sessionId: 'test-session',
        operation: 'upload_file',
        userAgent: 'test',
        timestamp: new Date(),
        retryCount: 0,
        fileInfo: {
          name: 'large-file.jpg',
          size: 15 * 1024 * 1024,
          type: 'image/jpeg'
        }
      };
      
      const result = await chatErrorRecoveryService.executeRecovery(chatError, context);
      
      expect(result.fallbackUsed).toBe(true);
      expect(result.message).toContain('compresser');
      expect(result.message).toContain('10 MB');
    });
  });

  describe('Réponses de fallback contextuelles', () => {
    it('should provide expertise-specific fallback', async () => {
      const chatError = {
        type: ChatErrorType.API_UNAVAILABLE,
        message: 'API error',
        userMessage: 'Service indisponible',
        retryable: false
      };
      
      const context: ErrorContext = {
        sessionId: 'test-session',
        operation: 'send_message',
        userAgent: 'test',
        timestamp: new Date(),
        retryCount: 2,
        messageInfo: {
          content: 'Comment améliorer ma prospection ?',
          length: 35,
          hasFiles: false
        }
      };
      
      const result = await chatErrorRecoveryService.executeRecovery(chatError, context);
      
      expect(result.message).toContain('prospection');
      expect(result.message).toContain('Laurent Serre');
    });

    it('should adapt fallback to user device', async () => {
      const chatError = {
        type: ChatErrorType.NETWORK_ERROR,
        message: 'Network error',
        userMessage: 'Erreur réseau',
        retryable: true
      };
      
      const mobileContext: ErrorContext = {
        sessionId: 'test-session',
        operation: 'send_message',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        timestamp: new Date(),
        retryCount: 1,
        deviceType: 'mobile'
      };
      
      const result = await chatErrorRecoveryService.executeRecovery(chatError, mobileContext);
      
      expect(result.message).toContain('mobile');
      expect(result.message).toContain('Wi-Fi');
    });

    it('should provide time-aware fallback messages', async () => {
      const chatError = {
        type: ChatErrorType.API_UNAVAILABLE,
        message: 'API error',
        userMessage: 'Service indisponible',
        retryable: false
      };
      
      // Simuler une heure de pointe
      const peakHourContext: ErrorContext = {
        sessionId: 'test-session',
        operation: 'send_message',
        userAgent: 'test',
        timestamp: new Date('2024-01-15T14:30:00'), // 14h30
        retryCount: 1
      };
      
      const result = await chatErrorRecoveryService.executeRecovery(chatError, peakHourContext);
      
      expect(result.message).toContain('forte affluence');
    });
  });

  describe('Métriques de récupération', () => {
    it('should track recovery success rates', async () => {
      const chatError = {
        type: ChatErrorType.NETWORK_ERROR,
        message: 'Network error',
        userMessage: 'Erreur réseau',
        retryable: true
      };
      
      const context: ErrorContext = {
        sessionId: 'test-session',
        operation: 'send_message',
        userAgent: 'test',
        timestamp: new Date(),
        retryCount: 1
      };
      
      await chatErrorRecoveryService.executeRecovery(chatError, context);
      
      const metrics = chatErrorRecoveryService.getRecoveryMetrics();
      expect(metrics.totalRecoveryAttempts).toBe(1);
      expect(metrics.successfulRecoveries).toBe(1);
    });

    it('should track fallback usage', async () => {
      const chatError = {
        type: ChatErrorType.API_UNAVAILABLE,
        message: 'API error',
        userMessage: 'Service indisponible',
        retryable: false
      };
      
      const context: ErrorContext = {
        sessionId: 'test-session',
        operation: 'send_message',
        userAgent: 'test',
        timestamp: new Date(),
        retryCount: 3
      };
      
      await chatErrorRecoveryService.executeRecovery(chatError, context);
      
      const metrics = chatErrorRecoveryService.getRecoveryMetrics();
      expect(metrics.fallbacksUsed).toBe(1);
      expect(metrics.fallbacksByType[ChatErrorType.API_UNAVAILABLE]).toBe(1);
    });
  });
});