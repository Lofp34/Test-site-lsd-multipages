/**
 * End-to-End Tests for Chat Enhancements
 * Tests all user scenarios with new functionalities
 * Requirements: 1.1, 2.7, 3.7, 5.5
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EnhancedChatWidget from '@/components/chat/enhanced/EnhancedChatWidget';

// Mock Gemini service
const mockGeminiService = {
  generateContent: vi.fn(),
  generateContentStream: vi.fn(),
};

vi.mock('@/lib/gemini/service', () => ({
  geminiService: mockGeminiService,
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock requestAnimationFrame
window.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16));

describe('Chat Enhancements E2E Tests', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    
    // Reset localStorage
    localStorage.clear();
    
    // Mock successful streaming response
    mockGeminiService.generateContentStream.mockImplementation(async function* () {
      const chunks = [
        '# Réponse avec Markdown\n\n',
        'Voici une **réponse formatée** avec:\n\n',
        '- Liste à puces\n',
        '- Autre élément\n\n',
        '```javascript\n',
        'console.log("Code avec coloration");\n',
        '```\n\n',
        'Fin de la réponse.'
      ];
      
      for (const chunk of chunks) {
        yield { text: chunk };
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Scenario 1: Complete conversation with Markdown rendering', () => {
    it('should handle a complete conversation flow with markdown rendering', async () => {
      render(
        <EnhancedChatWidget 
          markdownConfig={{ enableSyntaxHighlighting: true, enableTables: true, enableLinks: true }}
        />
      );

      // User sends a message
      const input = screen.getByPlaceholderText(/tapez votre message/i);
      await user.type(input, 'Peux-tu me donner un exemple de code JavaScript ?');
      
      const sendButton = screen.getByRole('button', { name: /envoyer/i });
      await user.click(sendButton);

      // Wait for streaming to complete
      await waitFor(() => {
        expect(screen.getByText(/Réponse avec Markdown/)).toBeInTheDocument();
      }, { timeout: 5000 });

      // Verify markdown rendering
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Réponse avec Markdown');
      expect(screen.getByText('réponse formatée')).toHaveStyle('font-weight: bold');
      
      // Verify code block with syntax highlighting
      const codeBlock = screen.getByText('console.log("Code avec coloration");');
      expect(codeBlock.closest('pre')).toBeInTheDocument();
      
      // Verify list rendering
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
      expect(listItems[0]).toHaveTextContent('Liste à puces');
    });
  });

  describe('Scenario 2: Scroll behavior during streaming', () => {
    it('should manage scroll intelligently during streaming', async () => {
      const { container } = render(
        <EnhancedChatWidget 
          scrollConfig={{ 
            bottomThreshold: 50,
            autoScrollDelay: 1000,
            smoothScrollDuration: 300
          }}
        />
      );

      const chatContainer = container.querySelector('[data-testid="chat-messages"]');
      expect(chatContainer).toBeInTheDocument();

      // Send message to trigger streaming
      const input = screen.getByPlaceholderText(/tapez votre message/i);
      await user.type(input, 'Message de test');
      await user.click(screen.getByRole('button', { name: /envoyer/i }));

      // Simulate user scrolling up during streaming
      act(() => {
        fireEvent.scroll(chatContainer!, { target: { scrollTop: 100 } });
      });

      // Wait for streaming to start
      await waitFor(() => {
        expect(screen.getByText(/Réponse avec Markdown/)).toBeInTheDocument();
      });

      // Verify auto-scroll is disabled when user scrolled up
      expect(chatContainer).not.toHaveAttribute('data-auto-scroll', 'true');

      // Simulate user scrolling back to bottom
      act(() => {
        fireEvent.scroll(chatContainer!, { 
          target: { 
            scrollTop: chatContainer!.scrollHeight - chatContainer!.clientHeight 
          } 
        });
      });

      // Verify auto-scroll is re-enabled
      await waitFor(() => {
        expect(chatContainer).toHaveAttribute('data-auto-scroll', 'true');
      });
    });
  });

  describe('Scenario 3: Chat controls functionality', () => {
    it('should handle chat closing and reopening with state preservation', async () => {
      render(
        <EnhancedChatWidget 
          controlsConfig={{
            showMinimizeButton: true,
            showFullscreenButton: true,
            confirmCloseOnStreaming: true
          }}
        />
      );

      // Send a message first
      const input = screen.getByPlaceholderText(/tapez votre message/i);
      await user.type(input, 'Message à préserver');
      await user.click(screen.getByRole('button', { name: /envoyer/i }));

      // Wait for message to appear
      await waitFor(() => {
        expect(screen.getByText('Message à préserver')).toBeInTheDocument();
      });

      // Close the chat
      const closeButton = screen.getByRole('button', { name: /fermer/i });
      await user.click(closeButton);

      // Verify chat is closed
      expect(screen.queryByPlaceholderText(/tapez votre message/i)).not.toBeInTheDocument();

      // Reopen the chat (simulate clicking reopen indicator)
      const reopenButton = screen.getByRole('button', { name: /ouvrir le chat/i });
      await user.click(reopenButton);

      // Verify state is preserved
      await waitFor(() => {
        expect(screen.getByText('Message à préserver')).toBeInTheDocument();
      });
    });

    it('should handle keyboard shortcuts', async () => {
      render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            controlsConfig={{
              keyboardShortcuts: {
                close: 'Escape',
                minimize: 'Ctrl+M',
                fullscreen: 'F11',
                scrollToTop: 'Ctrl+Home',
                scrollToBottom: 'Ctrl+End'
              }
            }}
          />
        </ChatProvider>
      );

      // Test Escape key to close
      await user.keyboard('{Escape}');
      expect(screen.queryByPlaceholderText(/tapez votre message/i)).not.toBeInTheDocument();

      // Reopen for further tests
      const reopenButton = screen.getByRole('button', { name: /ouvrir le chat/i });
      await user.click(reopenButton);

      // Test Ctrl+Home for scroll to top
      await user.keyboard('{Control>}{Home}{/Control}');
      
      // Test Ctrl+End for scroll to bottom
      await user.keyboard('{Control>}{End}{/Control}');
    });
  });

  describe('Scenario 4: Long conversation performance', () => {
    it('should handle long conversations without performance degradation', async () => {
      const startTime = performance.now();
      
      render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      // Simulate a long conversation (20 messages)
      for (let i = 0; i < 20; i++) {
        const input = screen.getByPlaceholderText(/tapez votre message/i);
        await user.clear(input);
        await user.type(input, `Message ${i + 1}`);
        await user.click(screen.getByRole('button', { name: /envoyer/i }));
        
        // Wait for response
        await waitFor(() => {
          expect(screen.getByText(/Réponse avec Markdown/)).toBeInTheDocument();
        });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Verify performance (should complete within reasonable time)
      expect(totalTime).toBeLessThan(30000); // 30 seconds max

      // Verify all messages are present
      for (let i = 1; i <= 20; i++) {
        expect(screen.getByText(`Message ${i}`)).toBeInTheDocument();
      }

      // Verify memory usage is reasonable (check DOM node count)
      const messageNodes = screen.getAllByTestId(/chat-message/);
      expect(messageNodes.length).toBeLessThanOrEqual(50); // Including responses
    });
  });

  describe('Scenario 5: Error handling and recovery', () => {
    it('should handle streaming errors gracefully', async () => {
      // Mock streaming error
      mockGeminiService.generateContentStream.mockImplementation(async function* () {
        yield { text: 'Début de réponse...' };
        throw new Error('Network error during streaming');
      });

      render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      const input = screen.getByPlaceholderText(/tapez votre message/i);
      await user.type(input, 'Message qui va échouer');
      await user.click(screen.getByRole('button', { name: /envoyer/i }));

      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText(/erreur lors de la génération/i)).toBeInTheDocument();
      });

      // Verify partial content is still displayed
      expect(screen.getByText('Début de réponse...')).toBeInTheDocument();

      // Verify retry functionality
      const retryButton = screen.getByRole('button', { name: /réessayer/i });
      expect(retryButton).toBeInTheDocument();
    });

    it('should handle markdown parsing errors', async () => {
      // Mock response with malformed markdown
      mockGeminiService.generateContentStream.mockImplementation(async function* () {
        yield { text: '# Titre\n\n```javascript\nconsole.log("code non fermé"\n\n**gras non fermé' };
      });

      render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      const input = screen.getByPlaceholderText(/tapez votre message/i);
      await user.type(input, 'Message avec markdown malformé');
      await user.click(screen.getByRole('button', { name: /envoyer/i }));

      // Wait for response
      await waitFor(() => {
        expect(screen.getByText(/Titre/)).toBeInTheDocument();
      });

      // Verify fallback to plain text for malformed parts
      expect(screen.getByText('**gras non fermé')).toBeInTheDocument();
    });
  });

  describe('Scenario 6: Mobile experience validation', () => {
    it('should adapt to mobile viewport', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375 });
      Object.defineProperty(window, 'innerHeight', { value: 667 });
      
      // Mock touch events
      const mockTouchStart = vi.fn();
      const mockTouchMove = vi.fn();
      const mockTouchEnd = vi.fn();

      render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            mobileConfig={{
              adaptiveUI: true,
              touchOptimized: true,
              keyboardHandling: true
            }}
          />
        </ChatProvider>
      );

      const chatContainer = screen.getByTestId('chat-container');
      
      // Verify mobile-specific classes are applied
      expect(chatContainer).toHaveClass('mobile-optimized');

      // Test touch interactions
      fireEvent.touchStart(chatContainer, {
        touches: [{ clientX: 100, clientY: 100 }]
      });
      
      fireEvent.touchMove(chatContainer, {
        touches: [{ clientX: 100, clientY: 150 }]
      });
      
      fireEvent.touchEnd(chatContainer);

      // Verify touch scroll behavior
      expect(chatContainer).toHaveAttribute('data-touch-scrolling', 'true');
    });
  });

  describe('Scenario 7: Accessibility compliance', () => {
    it('should meet WCAG 2.1 AA standards', async () => {
      render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            accessibilityConfig={{
              announceNewMessages: true,
              highlightFocusedElements: true,
              screenReaderOptimized: true
            }}
          />
        </ChatProvider>
      );

      // Verify ARIA labels
      expect(screen.getByRole('region', { name: /chat interface/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /message input/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();

      // Test keyboard navigation
      const input = screen.getByRole('textbox');
      input.focus();
      expect(document.activeElement).toBe(input);

      // Tab to send button
      await user.tab();
      expect(document.activeElement).toBe(screen.getByRole('button', { name: /send/i }));

      // Tab to close button
      await user.tab();
      expect(document.activeElement).toBe(screen.getByRole('button', { name: /close/i }));

      // Verify live region for announcements
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Scenario 8: Integration with existing Gemini system', () => {
    it('should maintain compatibility with existing chat features', async () => {
      render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            // Test backward compatibility
            onMessage={vi.fn()}
            onClose={vi.fn()}
            initialMessages={[
              { id: '1', content: 'Message existant', role: 'user', timestamp: new Date() }
            ]}
          />
        </ChatProvider>
      );

      // Verify existing message is displayed
      expect(screen.getByText('Message existant')).toBeInTheDocument();

      // Test multimodal capabilities
      const fileInput = screen.getByLabelText(/upload file/i);
      expect(fileInput).toBeInTheDocument();

      // Test privacy settings
      const privacyButton = screen.getByRole('button', { name: /privacy settings/i });
      expect(privacyButton).toBeInTheDocument();
    });
  });
});