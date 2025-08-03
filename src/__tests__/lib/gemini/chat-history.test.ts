/**
 * Tests pour le service de gestion de l'historique des conversations
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ChatHistoryService } from '@/lib/gemini/chat-history';
import { ChatMessage } from '@/types/chat';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock window.confirm
Object.defineProperty(window, 'confirm', {
  value: vi.fn(() => true),
});

describe('ChatHistoryService', () => {
  let historyService: ChatHistoryService;
  let mockMessages: ChatMessage[];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    
    historyService = new ChatHistoryService();
    
    mockMessages = [
      {
        id: 'msg1',
        role: 'user',
        content: 'Bonjour',
        timestamp: new Date('2024-01-01T10:00:00Z'),
      },
      {
        id: 'msg2',
        role: 'assistant',
        content: 'Bonjour ! Comment puis-je vous aider ?',
        timestamp: new Date('2024-01-01T10:00:30Z'),
      },
    ];
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Gestion des messages', () => {
    it('devrait ajouter un message à l\'historique', () => {
      const message = mockMessages[0];
      historyService.addMessage(message);
      
      const messages = historyService.getMessages();
      expect(messages).toHaveLength(1);
      expect(messages[0]).toEqual(message);
    });

    it('devrait maintenir l\'ordre chronologique des messages', () => {
      mockMessages.forEach(msg => historyService.addMessage(msg));
      
      const messages = historyService.getMessages();
      expect(messages).toHaveLength(2);
      expect(messages[0].id).toBe('msg1');
      expect(messages[1].id).toBe('msg2');
    });

    it('devrait limiter le nombre de messages à 20 (10 échanges)', () => {
      // Ajouter 25 messages (plus que la limite)
      for (let i = 0; i < 25; i++) {
        historyService.addMessage({
          id: `msg${i}`,
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: `Message ${i}`,
          timestamp: new Date(),
        });
      }
      
      const messages = historyService.getMessages();
      expect(messages).toHaveLength(20); // Limite de 20 messages
      
      // Vérifier que ce sont les messages les plus récents
      expect(messages[0].id).toBe('msg5'); // Les 5 premiers ont été supprimés
      expect(messages[19].id).toBe('msg24');
    });
  });

  describe('Comptage des échanges', () => {
    it('devrait compter correctement le nombre d\'échanges', () => {
      // Ajouter 3 échanges (6 messages)
      for (let i = 0; i < 6; i++) {
        historyService.addMessage({
          id: `msg${i}`,
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: `Message ${i}`,
          timestamp: new Date(),
        });
      }
      
      expect(historyService.getExchangeCount()).toBe(3);
    });

    it('devrait détecter quand la limite est atteinte', () => {
      // Ajouter exactement 10 échanges
      for (let i = 0; i < 20; i++) {
        historyService.addMessage({
          id: `msg${i}`,
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: `Message ${i}`,
          timestamp: new Date(),
        });
      }
      
      expect(historyService.isLimitReached()).toBe(true);
    });

    it('ne devrait pas détecter la limite si elle n\'est pas atteinte', () => {
      // Ajouter seulement 5 échanges
      for (let i = 0; i < 10; i++) {
        historyService.addMessage({
          id: `msg${i}`,
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: `Message ${i}`,
          timestamp: new Date(),
        });
      }
      
      expect(historyService.isLimitReached()).toBe(false);
    });
  });

  describe('Gestion des conversations', () => {
    it('devrait générer un ID de conversation unique', () => {
      const service1 = new ChatHistoryService();
      const service2 = new ChatHistoryService();
      
      expect(service1.getCurrentConversationId()).not.toBe(service2.getCurrentConversationId());
    });

    it('devrait pouvoir démarrer une nouvelle conversation', () => {
      const originalId = historyService.getCurrentConversationId();
      historyService.addMessage(mockMessages[0]);
      
      const newId = historyService.startNewConversation();
      
      expect(newId).not.toBe(originalId);
      expect(historyService.getCurrentConversationId()).toBe(newId);
      expect(historyService.getMessages()).toHaveLength(0);
    });

    it('devrait pouvoir effacer la conversation courante', () => {
      mockMessages.forEach(msg => historyService.addMessage(msg));
      expect(historyService.getMessages()).toHaveLength(2);
      
      historyService.clearCurrentConversation();
      
      expect(historyService.getMessages()).toHaveLength(0);
    });
  });

  describe('Persistance localStorage', () => {
    it('devrait sauvegarder les messages dans localStorage', () => {
      historyService.addMessage(mockMessages[0]);
      
      expect(localStorageMock.setItem).toHaveBeenCalled();
      const [key, value] = localStorageMock.setItem.mock.calls[0];
      expect(key).toBe('gemini_chat_history');
      
      const savedData = JSON.parse(value);
      expect(Array.isArray(savedData)).toBe(true);
    });

    it('devrait charger les messages depuis localStorage', () => {
      const mockStoredData = [{
        id: 'test-conv',
        messages: mockMessages,
        createdAt: { __type: 'Date', value: '2024-01-01T10:00:00.000Z' },
        lastUpdated: { __type: 'Date', value: '2024-01-01T10:00:00.000Z' },
        messageCount: 2
      }];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockStoredData));
      
      const service = new ChatHistoryService('test-conv');
      const messages = service.getMessages();
      
      expect(messages).toHaveLength(2);
      expect(messages[0].content).toBe('Bonjour');
    });
  });

  describe('Format Gemini API', () => {
    it('devrait formater l\'historique pour l\'API Gemini', () => {
      mockMessages.forEach(msg => historyService.addMessage(msg));
      
      const geminiHistory = historyService.getGeminiHistory();
      
      expect(geminiHistory).toHaveLength(2);
      expect(geminiHistory[0]).toEqual({
        role: 'user',
        parts: [{ text: 'Bonjour' }]
      });
      expect(geminiHistory[1]).toEqual({
        role: 'model',
        parts: [{ text: 'Bonjour ! Comment puis-je vous aider ?' }]
      });
    });

    it('devrait convertir "assistant" en "model" pour l\'API', () => {
      historyService.addMessage({
        id: 'test',
        role: 'assistant',
        content: 'Test response',
        timestamp: new Date(),
      });
      
      const geminiHistory = historyService.getGeminiHistory();
      expect(geminiHistory[0].role).toBe('model');
    });
  });

  describe('Statistiques d\'utilisation', () => {
    it('devrait retourner les bonnes statistiques', () => {
      // Ajouter 3 échanges (6 messages)
      for (let i = 0; i < 6; i++) {
        historyService.addMessage({
          id: `msg${i}`,
          role: i % 2 === 0 ? 'user' : 'assistant',
          content: `Message ${i}`,
          timestamp: new Date(),
        });
      }
      
      const stats = historyService.getUsageStats();
      
      expect(stats.messageCount).toBe(6);
      expect(stats.exchangeCount).toBe(3);
      expect(stats.isLimitReached).toBe(false);
      expect(stats.remainingExchanges).toBe(7);
      expect(stats.currentConversationId).toBeTruthy();
    });
  });

  describe('Nettoyage automatique', () => {
    it('devrait nettoyer les anciennes conversations', () => {
      // Cette méthode statique devrait nettoyer localStorage
      ChatHistoryService.cleanupOldConversations();
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith('gemini_chat_history');
    });

    it('devrait pouvoir supprimer toutes les conversations', () => {
      ChatHistoryService.clearAllConversations();
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('gemini_chat_history');
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait gérer les erreurs de localStorage gracieusement', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      // Ne devrait pas lever d'exception
      expect(() => new ChatHistoryService()).not.toThrow();
    });

    it('devrait gérer les données corrompues dans localStorage', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      
      const service = new ChatHistoryService();
      expect(service.getMessages()).toHaveLength(0);
    });
  });

  describe('Sauvegarde et restauration', () => {
    it('devrait pouvoir sauvegarder une conversation', () => {
      mockMessages.forEach(msg => historyService.addMessage(msg));
      
      const backupKey = historyService.saveConversationBackup();
      
      expect(backupKey).toBeTruthy();
      expect(backupKey).toContain('chat_backup_');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        backupKey,
        expect.any(String)
      );
    });

    it('devrait pouvoir lister les backups disponibles', () => {
      // Mock des backups existants
      localStorageMock.length = 2;
      localStorageMock.key.mockImplementation((index) => {
        return index === 0 ? 'chat_backup_test1' : 'other_key';
      });
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'chat_backup_test1') {
          return JSON.stringify({
            id: 'test1',
            lastUpdated: { __type: 'Date', value: '2024-01-01T10:00:00.000Z' },
            messageCount: 5
          });
        }
        return null;
      });
      
      const backups = historyService.listAvailableBackups();
      
      expect(backups).toHaveLength(1);
      expect(backups[0].id).toBe('test1');
      expect(backups[0].messageCount).toBe(5);
    });
  });
});