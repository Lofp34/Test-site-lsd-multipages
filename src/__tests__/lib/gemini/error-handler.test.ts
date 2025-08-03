/**
 * Tests pour le système de gestion d'erreurs du chat Gemini
 */

import { chatErrorHandler, ErrorContext } from '@/lib/gemini/error-handler';
import { ChatErrorType } from '@/lib/gemini/types';

// Mock des analytics
jest.mock('@/lib/gemini/analytics-service', () => ({
  chatAnalyticsService: {
    trackError: jest.fn()
  }
}));

describe('ChatErrorHandler', () => {
  const mockContext: ErrorContext = {
    sessionId: 'test-session',
    operation: 'send_message',
    userAgent: 'test-agent',
    timestamp: new Date(),
    retryCount: 0
  };

  beforeEach(() => {
    // Réinitialiser les compteurs de retry
    chatErrorHandler.resetRetryCount(mockContext.sessionId, mockContext.operation);
  });

  describe('handleError', () => {
    it('should convert network error correctly', async () => {
      const networkError = new Error('Network request failed');
      
      const result = await chatErrorHandler.handleError(networkError, mockContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.NETWORK_ERROR);
      expect(result.chatError.retryable).toBe(true);
      expect(result.shouldRetry).toBe(true);
      expect(result.recoveryAction.type).toBe('retry');
    });

    it('should convert API unavailable error correctly', async () => {
      const apiError = new Error('API service unavailable');
      
      const result = await chatErrorHandler.handleError(apiError, mockContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.API_UNAVAILABLE);
      expect(result.chatError.retryable).toBe(true);
      expect(result.shouldRetry).toBe(true);
    });

    it('should convert quota exceeded error correctly', async () => {
      const quotaError = new Error('Quota exceeded for this request');
      
      const result = await chatErrorHandler.handleError(quotaError, mockContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.QUOTA_EXCEEDED);
      expect(result.chatError.retryable).toBe(true);
      expect(result.recoveryAction.type).toBe('fallback');
    });

    it('should convert rate limit error correctly', async () => {
      const rateLimitError = new Error('Too many requests');
      
      const result = await chatErrorHandler.handleError(rateLimitError, mockContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.RATE_LIMIT);
      expect(result.chatError.retryable).toBe(true);
      expect(result.recoveryAction.type).toBe('retry');
    });

    it('should convert file size error correctly', async () => {
      const fileSizeError = new Error('File size exceeds limit');
      
      const result = await chatErrorHandler.handleError(fileSizeError, mockContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.FILE_TOO_LARGE);
      expect(result.chatError.retryable).toBe(false);
      expect(result.shouldRetry).toBe(false);
      expect(result.recoveryAction.type).toBe('manual');
    });

    it('should convert unsupported file error correctly', async () => {
      const fileTypeError = new Error('Unsupported file type');
      
      const result = await chatErrorHandler.handleError(fileTypeError, mockContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.UNSUPPORTED_FILE);
      expect(result.chatError.retryable).toBe(false);
      expect(result.shouldRetry).toBe(false);
    });

    it('should convert upload failed error correctly', async () => {
      const uploadError = new Error('Upload failed');
      
      const result = await chatErrorHandler.handleError(uploadError, mockContext);
      
      expect(result.chatError.type).toBe(ChatErrorType.UPLOAD_FAILED);
      expect(result.chatError.retryable).toBe(true);
      expect(result.shouldRetry).toBe(true);
    });

    it('should not retry after max attempts', async () => {
      const error = new Error('Network error');
      const contextWithRetries = {
        ...mockContext,
        retryCount: 3 // Au-dessus de la limite
      };
      
      const result = await chatErrorHandler.handleError(error, contextWithRetries);
      
      expect(result.shouldRetry).toBe(false);
    });

    it('should calculate progressive retry delays', async () => {
      const error = new Error('Network error');
      
      // Premier retry
      const result1 = await chatErrorHandler.handleError(error, {
        ...mockContext,
        retryCount: 0
      });
      
      // Deuxième retry
      const result2 = await chatErrorHandler.handleError(error, {
        ...mockContext,
        retryCount: 1
      });
      
      // Troisième retry
      const result3 = await chatErrorHandler.handleError(error, {
        ...mockContext,
        retryCount: 2
      });
      
      expect(result1.recoveryAction.delay).toBeLessThan(result2.recoveryAction.delay!);
      expect(result2.recoveryAction.delay).toBeLessThan(result3.recoveryAction.delay!);
    });
  });

  describe('retry count management', () => {
    it('should track retry counts correctly', () => {
      expect(chatErrorHandler.getRetryCount(mockContext.sessionId, mockContext.operation)).toBe(0);
      
      // Simuler une erreur pour incrémenter le compteur
      chatErrorHandler.handleError(new Error('test'), mockContext);
      
      expect(chatErrorHandler.getRetryCount(mockContext.sessionId, mockContext.operation)).toBe(1);
    });

    it('should reset retry counts correctly', () => {
      // Simuler quelques erreurs
      chatErrorHandler.handleError(new Error('test'), mockContext);
      chatErrorHandler.handleError(new Error('test'), {
        ...mockContext,
        retryCount: 1
      });
      
      expect(chatErrorHandler.getRetryCount(mockContext.sessionId, mockContext.operation)).toBe(2);
      
      // Reset
      chatErrorHandler.resetRetryCount(mockContext.sessionId, mockContext.operation);
      
      expect(chatErrorHandler.getRetryCount(mockContext.sessionId, mockContext.operation)).toBe(0);
    });
  });

  describe('network recovery', () => {
    it('should attempt network recovery for network errors', async () => {
      // Mock navigator.onLine
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true
      });

      const networkError = new Error('Network request failed');
      
      const result = await chatErrorHandler.handleError(networkError, mockContext);
      
      expect(result.recoveryAction.type).toBe('retry');
      expect(result.recoveryAction.fallbackMessage).toContain('connexion');
    });

    it('should provide fallback when offline', async () => {
      // Mock navigator.onLine
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      const networkError = new Error('Network request failed');
      
      const result = await chatErrorHandler.handleError(networkError, mockContext);
      
      expect(result.recoveryAction.type).toBe('fallback');
      expect(result.recoveryAction.fallbackMessage).toContain('hors ligne');
    });
  });

  describe('contextual error messages', () => {
    it('should provide contextual messages for different error types', async () => {
      const testCases = [
        {
          error: new Error('Network failed'),
          expectedType: ChatErrorType.NETWORK_ERROR,
          expectedMessageContains: 'connexion'
        },
        {
          error: new Error('API unavailable'),
          expectedType: ChatErrorType.API_UNAVAILABLE,
          expectedMessageContains: 'indisponible'
        },
        {
          error: new Error('Rate limit exceeded'),
          expectedType: ChatErrorType.RATE_LIMIT,
          expectedMessageContains: 'messages'
        },
        {
          error: new Error('File too large'),
          expectedType: ChatErrorType.FILE_TOO_LARGE,
          expectedMessageContains: '10MB'
        }
      ];

      for (const testCase of testCases) {
        const result = await chatErrorHandler.handleError(testCase.error, mockContext);
        
        expect(result.chatError.type).toBe(testCase.expectedType);
        expect(result.chatError.userMessage.toLowerCase()).toContain(
          testCase.expectedMessageContains.toLowerCase()
        );
      }
    });
  });

  describe('recovery callbacks', () => {
    it('should register and execute recovery callbacks', async () => {
      const mockCallback = jest.fn().mockResolvedValue(undefined);
      const callbackKey = 'test-recovery';
      
      chatErrorHandler.registerRecoveryCallback(callbackKey, mockCallback);
      
      const success = await chatErrorHandler.executeRecovery(callbackKey);
      
      expect(success).toBe(true);
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should handle callback errors gracefully', async () => {
      const mockCallback = jest.fn().mockRejectedValue(new Error('Callback failed'));
      const callbackKey = 'test-recovery-error';
      
      chatErrorHandler.registerRecoveryCallback(callbackKey, mockCallback);
      
      const success = await chatErrorHandler.executeRecovery(callbackKey);
      
      expect(success).toBe(false);
      expect(mockCallback).toHaveBeenCalled();
    });
  });
});

describe('Error Handler Integration', () => {
  it('should work with real-world error scenarios', async () => {
    const scenarios = [
      {
        name: 'Network timeout',
        error: new Error('Request timeout'),
        expectedRecovery: 'retry'
      },
      {
        name: 'API key invalid',
        error: new Error('Invalid API key'),
        expectedRecovery: 'fallback'
      },
      {
        name: 'File upload failure',
        error: new Error('Upload failed due to network'),
        expectedRecovery: 'retry'
      }
    ];

    for (const scenario of scenarios) {
      const result = await chatErrorHandler.handleError(scenario.error, mockContext);
      
      expect(result.recoveryAction.type).toBe(scenario.expectedRecovery);
      expect(result.chatError.userMessage).toBeTruthy();
      expect(typeof result.chatError.userMessage).toBe('string');
    }
  });
});