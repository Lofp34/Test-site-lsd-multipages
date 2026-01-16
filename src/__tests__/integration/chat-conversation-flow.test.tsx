/**
 * Tests d'intégration pour le flow complet de conversation
 * Teste l'interaction entre tous les composants du chat
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatWidget from '@/components/chat/ChatWidget';
import { ChatMessage, ChatErrorType } from '@/lib/gemini/types';

// Mock global fetch
const mockFetch = vi.fn() as Mock;
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock des modules externes
vi.mock('@/lib/gemini/privacy-manager');
vi.mock('@/lib/gemini/cookie-free-mode');
vi.mock('@/styles/mobile-chat.css', () => ({}));

// Mock du PrivacyManager
const mockPrivacyManager = {
  hasUserConsent: vi.fn(() => true),
  recordUserConsent: vi.fn(),
  updateSettings: vi.fn()
};

// Mock du CookieFreeMode
const mockCookieFreeMode = {
  enable: vi.fn(),
  disable: vi.fn()
};

vi.mocked(require('@/lib/gemini/privacy-manager')).PrivacyManager = vi.fn(() => mockPrivacyManager);
vi.mocked(require('@/lib/gemini/cookie-free-mode')).CookieFreeMode = {
  getInstance: vi.fn(() => mockCookieFreeMode)
};

describe('Chat Conversation Flow Integration', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    
    // Mock successful API responses by default
    mockFetch.mockImplementation((url: string, options: any) => {
      if (url.includes('/api/chat/gemini') && options?.method === 'OPTIONS') {
        // Health check
        return Promise.resolve({
          ok: true,
          status: 200
        });
      }
      
      if (url.includes('/api/chat/gemini') && options?.method === 'GET') {
        // Streaming response
        return Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: vi.fn()
                .mockResolvedValueOnce({
                  done: false,
                  value: new TextEncoder().encode('data: {"text": "Je souhaite augmenter la performance de mon équipe commerciale mais "}\n')
                })
                .mockResolvedValueOnce({
                  done: false,
                  value: new TextEncoder().encode('data: {"text": "j’ai du mal à prioriser, "}\n')
                })
                .mockResolvedValueOnce({
                  done: false,
                  value: new TextEncoder().encode('data: {"text": "que me conseilles-tu ?"}\n')
                })
                .mockResolvedValueOnce({
                  done: true,
                  value: undefined
                })
            })
          }
        });
      }
      
      return Promise.reject(new Error('Unhandled fetch'));
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Flow de conversation basique', () => {
    it('should complete a full conversation cycle', async () => {
      render(<ChatWidget apiKey="test-api-key" />);
      
      // 1. Ouvrir le chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      // Attendre que le chat soit initialisé
      await waitFor(() => {
        expect(screen.getByText('Laurent Serre')).toBeInTheDocument();
      });
      
      // 2. Envoyer un message
      const input = screen.getByRole('textbox');
      await user.type(input, 'Bonjour, pouvez-vous m\'aider avec ma prospection ?');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);
      
      // 3. Vérifier que le message utilisateur apparaît
      await waitFor(() => {
        expect(screen.getByText('Bonjour, pouvez-vous m\'aider avec ma prospection ?')).toBeInTheDocument();
      });
      
      // 4. Vérifier que la réponse streaming apparaît
      await waitFor(() => {
        expect(
          screen.getByText(
            /Je souhaite augmenter la performance de mon équipe commerciale mais j’ai du mal à prioriser, que me conseilles-tu/
          )
        ).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // 5. Vérifier que le streaming est terminé
      await waitFor(() => {
        expect(
          screen.getByText(
            /Je souhaite augmenter la performance de mon équipe commerciale mais j’ai du mal à prioriser, que me conseilles-tu/
          )
        ).toBeInTheDocument();
      });
      
      // 6. Vérifier les appels API
      expect(mockFetch).toHaveBeenCalledWith('/api/chat/gemini', {
        method: 'OPTIONS'
      });
      
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

    it('should handle multiple messages in sequence', async () => {
      render(<ChatWidget apiKey="test-api-key" />);
      
      // Ouvrir le chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      
      // Premier message
      const input = screen.getByRole('textbox');
      await user.type(input, 'Première question');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);
      
      // Attendre la réponse
      await waitFor(() => {
        expect(screen.getByText('Première question')).toBeInTheDocument();
      });
      
      // Deuxième message
      await user.clear(input);
      await user.type(input, 'Question de suivi');
      await user.click(sendButton);
      
      // Vérifier que les deux messages sont présents
      await waitFor(() => {
        expect(screen.getByText('Première question')).toBeInTheDocument();
        expect(screen.getByText('Question de suivi')).toBeInTheDocument();
      });
      
      // Vérifier que l'API a été appelée deux fois pour les messages
      expect(mockFetch).toHaveBeenCalledTimes(3); // 1 health check + 2 messages
    });

    it('should maintain conversation context', async () => {
      // Mock localStorage pour simuler un historique existant
      const existingHistory: ChatMessage[] = [
        {
          id: 'msg1',
          role: 'user',
          content: 'Message précédent',
          timestamp: new Date(Date.now() - 60000)
        },
        {
          id: 'msg2',
          role: 'assistant',
          content: 'Réponse précédente de Laurent Serre',
          timestamp: new Date(Date.now() - 59000)
        }
      ];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        messages: existingHistory,
        conversationId: 'existing-conversation'
      }));
      
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      // Vérifier que l'historique est chargé
      await waitFor(() => {
        expect(screen.getByText('Message précédent')).toBeInTheDocument();
        expect(screen.getByText('Réponse précédente de Laurent Serre')).toBeInTheDocument();
      });
      
      // Envoyer un nouveau message
      const input = screen.getByRole('textbox');
      await user.type(input, 'Nouveau message');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);
      
      // Vérifier que le contexte est maintenu
      await waitFor(() => {
        expect(screen.getByText('Message précédent')).toBeInTheDocument();
        expect(screen.getByText('Nouveau message')).toBeInTheDocument();
      });
    });
  });

  describe('Gestion des erreurs en flow complet', () => {
    it('should handle API error and show recovery options', async () => {
      // Mock d'une erreur API
      mockFetch.mockImplementation((url: string, options: any) => {
        if (url.includes('/api/chat/gemini') && options?.method === 'OPTIONS') {
          return Promise.resolve({ ok: true, status: 200 });
        }
        
        if (url.includes('/api/chat/gemini') && options?.method === 'GET') {
          return Promise.resolve({
            ok: false,
            status: 429,
            json: async () => ({ error: 'Rate limit exceeded' })
          });
        }
        
        return Promise.reject(new Error('Unhandled fetch'));
      });
      
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      
      // Envoyer un message qui va échouer
      const input = screen.getByRole('textbox');
      await user.type(input, 'Message qui va échouer');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);
      
      // Vérifier que l'erreur est affichée
      await waitFor(() => {
        expect(screen.getByText(/Trop de requêtes/)).toBeInTheDocument();
      });
      
      // Vérifier que le bouton de retry est présent
      const retryButton = screen.getByRole('button', { name: /réessayer/i });
      expect(retryButton).toBeInTheDocument();
    });

    it('should recover from network error automatically', async () => {
      let callCount = 0;
      
      mockFetch.mockImplementation((url: string, options: any) => {
        if (url.includes('/api/chat/gemini') && options?.method === 'OPTIONS') {
          return Promise.resolve({ ok: true, status: 200 });
        }
        
        if (url.includes('/api/chat/gemini') && options?.method === 'GET') {
          callCount++;
          
          if (callCount === 1) {
            // Premier appel échoue
            return Promise.reject(new Error('NetworkError'));
          } else {
            // Deuxième appel réussit
            return Promise.resolve({
              ok: true,
              body: {
                getReader: () => ({
                  read: vi.fn()
                    .mockResolvedValueOnce({
                      done: false,
                      value: new TextEncoder().encode('data: {"text": "Connexion rétablie"}\n')
                    })
                    .mockResolvedValueOnce({
                      done: true,
                      value: undefined
                    })
                })
              }
            });
          }
        }
        
        return Promise.reject(new Error('Unhandled fetch'));
      });
      
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'Test de récupération');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);
      
      // Attendre la récupération automatique
      await waitFor(() => {
        expect(screen.getByText('Connexion rétablie')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      expect(callCount).toBe(2); // Premier échec + retry réussi
    });

    it('should show fallback response when API is unavailable', async () => {
      mockFetch.mockImplementation((url: string, options: any) => {
        if (url.includes('/api/chat/gemini') && options?.method === 'OPTIONS') {
          return Promise.resolve({ ok: true, status: 200 });
        }
        
        if (url.includes('/api/chat/gemini') && options?.method === 'GET') {
          return Promise.resolve({
            ok: false,
            status: 503,
            json: async () => ({ error: 'Service unavailable' })
          });
        }
        
        return Promise.reject(new Error('Unhandled fetch'));
      });
      
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'Question sur la prospection');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);
      
      // Vérifier qu'une réponse de fallback est affichée
      await waitFor(() => {
        expect(screen.getByText(/temporairement indisponible/)).toBeInTheDocument();
        expect(screen.getByText(/Laurent Serre/)).toBeInTheDocument();
      });
    });
  });

  describe('Persistance et restauration', () => {
    it('should save conversation to localStorage', async () => {
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'Message à sauvegarder');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);
      
      // Attendre que la conversation soit sauvegardée
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          expect.stringMatching(/chat_history/),
          expect.any(String)
        );
      });
    });

    it('should clear conversation when requested', async () => {
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      
      // Envoyer un message
      const input = screen.getByRole('textbox');
      await user.type(input, 'Message à effacer');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);
      
      await waitFor(() => {
        expect(screen.getByText('Message à effacer')).toBeInTheDocument();
      });
      
      // Effacer la conversation (via menu ou bouton)
      const clearButton = screen.getByRole('button', { name: /effacer/i });
      await user.click(clearButton);
      
      // Vérifier que les messages sont effacés
      await waitFor(() => {
        expect(screen.queryByText('Message à effacer')).not.toBeInTheDocument();
      });
    });
  });

  describe('Intégration avec les analytics', () => {
    it('should track conversation metrics', async () => {
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      
      // Envoyer plusieurs messages pour générer des métriques
      const input = screen.getByRole('textbox');
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      
      await user.type(input, 'Premier message');
      await user.click(sendButton);
      
      await waitFor(() => {
        expect(screen.getByText('Premier message')).toBeInTheDocument();
      });
      
      await user.clear(input);
      await user.type(input, 'Deuxième message');
      await user.click(sendButton);
      
      // Vérifier que les métriques sont sauvegardées
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'chat_analytics',
          expect.any(String)
        );
      });
    });
  });

  describe('Optimisation des performances', () => {
    it('should handle rapid message sending', async () => {
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      
      const input = screen.getByRole('textbox');
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      
      // Envoyer plusieurs messages rapidement
      await user.type(input, 'Message 1');
      await user.click(sendButton);
      
      await user.clear(input);
      await user.type(input, 'Message 2');
      await user.click(sendButton);
      
      await user.clear(input);
      await user.type(input, 'Message 3');
      await user.click(sendButton);
      
      // Vérifier que tous les messages sont traités
      await waitFor(() => {
        expect(screen.getByText('Message 1')).toBeInTheDocument();
        expect(screen.getByText('Message 2')).toBeInTheDocument();
        expect(screen.getByText('Message 3')).toBeInTheDocument();
      });
    });

    it('should optimize memory usage for long conversations', async () => {
      // Simuler une longue conversation
      const longHistory: ChatMessage[] = Array.from({ length: 50 }, (_, i) => ({
        id: `msg${i}`,
        role: (i % 2 === 0 ? 'user' : 'assistant') as const,
        content: `Message ${i}`,
        timestamp: new Date(Date.now() - (50 - i) * 60000)
      }));
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        messages: longHistory,
        conversationId: 'long-conversation'
      }));
      
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      // Vérifier que seuls les messages récents sont affichés
      await waitFor(() => {
        expect(screen.getByText('Message 49')).toBeInTheDocument();
        expect(screen.queryByText('Message 0')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibilité en flow complet', () => {
    it('should maintain focus management throughout conversation', async () => {
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      
      // Focus initial sur le bouton
      chatButton.focus();
      expect(chatButton).toHaveFocus();
      
      // Ouvrir le chat
      await user.click(chatButton);
      
      // Le focus devrait se déplacer vers l'input
      await waitFor(() => {
        const input = screen.getByRole('textbox');
        expect(input).toHaveFocus();
      });
      
      // Envoyer un message
      const input = screen.getByRole('textbox');
      await user.type(input, 'Test d\'accessibilité');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);
      
      // Le focus devrait rester sur l'input après l'envoi
      expect(input).toHaveFocus();
    });

    it('should provide proper ARIA live regions for streaming', async () => {
      render(<ChatWidget apiKey="test-api-key" />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      await user.click(chatButton);
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'Test ARIA');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);
      
      // Vérifier que les régions live sont présentes pour le streaming
      await waitFor(() => {
        const liveRegion = screen.getByRole('log', { name: /messages du chat/i });
        expect(liveRegion).toBeInTheDocument();
      });
    });
  });
});
