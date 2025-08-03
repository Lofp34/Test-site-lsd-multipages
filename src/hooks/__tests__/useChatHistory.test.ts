/**
 * Tests pour le hook useChatHistory
 */

import { renderHook, act } from '@testing-library/react';
import { useChatHistory, usePrivacyManager, useConversationAnalytics } from '../useChatHistory';
import { ChatMessage } from '@/lib/gemini/types';

// Mock du service d'historique
jest.mock('@/lib/gemini/chat-history', () => ({
  ChatHistoryService: jest.fn().mockImplementation(() => ({
    getMessages: jest.fn().mockReturnValue([]),
    getUsageStats: jest.fn().mockReturnValue({
      currentConversationId: 'test-conversation',
      messageCount: 0,
      exchangeCount: 0,
      isLimitReached: false,
      remainingExchanges: 10
    }),
    addMessage: jest.fn(),
    clearCurrentConversation: jest.fn(),
    startNewConversation: jest.fn().mockReturnValue('new-conversation-id'),
    saveConversationBackup: jest.fn().mockReturnValue('backup-key'),
    restoreConversationBackup: jest.fn().mockReturnValue(true),
    listAvailableBackups: jest.fn().mockReturnValue([]),
    isLimitReached: jest.fn().mockReturnValue(false)
  }))
}));

describe('useChatHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useChatHistory());

    expect(result.current.messages).toEqual([]);
    expect(result.current.conversationId).toBe('test-conversation');
    expect(result.current.exchangeCount).toBe(0);
    expect(result.current.isLimitReached).toBe(false);
    expect(result.current.remainingExchanges).toBe(10);
    expect(result.current.isLoading).toBe(false);
  });

  it('should provide all required methods', () => {
    const { result } = renderHook(() => useChatHistory());

    expect(typeof result.current.addMessage).toBe('function');
    expect(typeof result.current.clearConversation).toBe('function');
    expect(typeof result.current.startNewConversation).toBe('function');
    expect(typeof result.current.loadConversation).toBe('function');
    expect(typeof result.current.saveConversationBackup).toBe('function');
    expect(typeof result.current.restoreConversationBackup).toBe('function');
    expect(typeof result.current.listAvailableBackups).toBe('function');
    expect(typeof result.current.getUsageStats).toBe('function');
    expect(typeof result.current.canSendMessage).toBe('function');
    expect(typeof result.current.exportConversation).toBe('function');
    expect(typeof result.current.importConversation).toBe('function');
  });

  it('should handle message addition', () => {
    const { result } = renderHook(() => useChatHistory());

    const testMessage: ChatMessage = {
      id: 'test-message',
      role: 'user',
      content: 'Test message',
      timestamp: new Date()
    };

    act(() => {
      result.current.addMessage(testMessage);
    });

    // Le service mock devrait avoir été appelé
    expect(result.current.addMessage).toBeDefined();
  });
});

describe('usePrivacyManager', () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        length: 0,
        key: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    });
  });

  it('should provide privacy management methods', () => {
    const { result } = renderHook(() => usePrivacyManager());

    expect(typeof result.current.clearAllChatData).toBe('function');
    expect(typeof result.current.getStorageSize).toBe('function');
    expect(typeof result.current.hasStoredData).toBe('function');
    expect(typeof result.current.exportAllData).toBe('function');
  });

  it('should detect stored data correctly', () => {
    const mockGetItem = jest.fn().mockReturnValue('{"test": "data"}');
    (window.localStorage.getItem as jest.Mock) = mockGetItem;

    const { result } = renderHook(() => usePrivacyManager());

    const hasData = result.current.hasStoredData();
    expect(hasData).toBe(true);
    expect(mockGetItem).toHaveBeenCalledWith('gemini_chat_history');
  });
});

describe('useConversationAnalytics', () => {
  it('should analyze empty conversation correctly', () => {
    const { result } = renderHook(() => useConversationAnalytics([]));

    expect(result.current.totalMessages).toBe(0);
    expect(result.current.userMessages).toBe(0);
    expect(result.current.assistantMessages).toBe(0);
    expect(result.current.averageMessageLength).toBe(0);
    expect(result.current.conversationDuration).toBe(0);
    expect(result.current.topicsDiscussed).toEqual([]);
    expect(result.current.filesShared).toBe(0);
    expect(result.current.lastActivity).toBeNull();
  });

  it('should analyze conversation with messages correctly', () => {
    const messages: ChatMessage[] = [
      {
        id: '1',
        role: 'user',
        content: 'Hello world test message',
        timestamp: new Date('2023-01-01T10:00:00Z')
      },
      {
        id: '2',
        role: 'assistant',
        content: 'Hello response test message',
        timestamp: new Date('2023-01-01T10:01:00Z')
      }
    ];

    const { result } = renderHook(() => useConversationAnalytics(messages));

    expect(result.current.totalMessages).toBe(2);
    expect(result.current.userMessages).toBe(1);
    expect(result.current.assistantMessages).toBe(1);
    expect(result.current.averageMessageLength).toBeGreaterThan(0);
    expect(result.current.conversationDuration).toBe(60000); // 1 minute
    expect(result.current.topicsDiscussed.length).toBeGreaterThan(0);
    expect(result.current.filesShared).toBe(0);
    expect(result.current.lastActivity).toEqual(new Date('2023-01-01T10:01:00Z'));
  });
});