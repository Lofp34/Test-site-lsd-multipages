/**
 * Tests pour le hook useGeminiChat
 */

import { renderHook, act } from '@testing-library/react';
import { useGeminiChat } from '../useGeminiChat';

// Mock du service Gemini
jest.mock('@/lib/gemini/service', () => ({
  GeminiService: jest.fn().mockImplementation(() => ({
    initializeChat: jest.fn().mockResolvedValue(undefined),
    sendMessageStream: jest.fn().mockResolvedValue(async function* () {
      yield 'Hello';
      yield ' world';
      yield '!';
    }),
    uploadFile: jest.fn().mockResolvedValue({
      id: 'test-file',
      name: 'test.jpg',
      uri: 'test-uri',
      mimeType: 'image/jpeg',
      size: 1024,
      uploadedAt: new Date()
    }),
    getConversationHistory: jest.fn().mockResolvedValue([]),
    clearConversation: jest.fn().mockResolvedValue(undefined),
    startNewConversation: jest.fn().mockResolvedValue('new-conversation-id'),
    getUsageStats: jest.fn().mockReturnValue({
      messageCount: 0,
      exchangeCount: 0,
      isLimitReached: false
    })
  }))
}));

describe('useGeminiChat', () => {
  const defaultConfig = {
    apiKey: 'test-api-key',
    systemInstruction: 'Test system instruction'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useGeminiChat(defaultConfig));

    expect(result.current.messages).toEqual([]);
    expect(result.current.isStreaming).toBe(false);
    expect(result.current.streamingMessage).toBe('');
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.uploadProgress).toEqual({});
  });

  it('should handle API key missing', () => {
    const { result } = renderHook(() => useGeminiChat({
      ...defaultConfig,
      apiKey: ''
    }));

    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.userMessage).toBe('Clé API Gemini manquante');
    expect(result.current.isInitialized).toBe(false);
  });

  it('should provide all required methods', () => {
    const { result } = renderHook(() => useGeminiChat(defaultConfig));

    expect(typeof result.current.sendMessage).toBe('function');
    expect(typeof result.current.uploadFile).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
    expect(typeof result.current.clearMessages).toBe('function');
    expect(typeof result.current.startNewConversation).toBe('function');
    expect(typeof result.current.getConversationHistory).toBe('function');
    expect(typeof result.current.getUsageStats).toBe('function');
  });

  it('should clear error when clearError is called', async () => {
    const { result } = renderHook(() => useGeminiChat({
      ...defaultConfig,
      apiKey: ''
    }));

    // Vérifier qu'il y a une erreur
    expect(result.current.error).toBeTruthy();

    // Effacer l'erreur
    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});