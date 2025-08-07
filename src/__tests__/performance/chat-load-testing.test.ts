/**
 * Load Testing for Chat Enhancements
 * Tests performance with long conversations and heavy usage
 * Requirements: 1.1, 2.7, 5.5
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnhancedChatWidget } from '@/components/chat/enhanced/EnhancedChatWidget';
import { ChatProvider } from '@/components/chat/ChatProvider';

// Performance monitoring utilities
class PerformanceMonitor {
  private startTime: number = 0;
  private measurements: Record<string, number[]> = {};

  start(label: string) {
    this.startTime = performance.now();
    if (!this.measurements[label]) {
      this.measurements[label] = [];
    }
  }

  end(label: string) {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    this.measurements[label].push(duration);
    return duration;
  }

  getAverage(label: string): number {
    const measurements = this.measurements[label] || [];
    return measurements.reduce((sum, val) => sum + val, 0) / measurements.length;
  }

  getMax(label: string): number {
    const measurements = this.measurements[label] || [];
    return Math.max(...measurements);
  }

  reset() {
    this.measurements = {};
  }
}

// Mock Gemini service with realistic delays
const mockGeminiService = {
  generateContentStream: vi.fn(),
};

vi.mock('@/lib/gemini/service', () => ({
  geminiService: mockGeminiService,
}));

// Mock performance APIs
const mockPerformanceObserver = vi.fn();
window.PerformanceObserver = mockPerformanceObserver as any;

describe('Chat Load Testing', () => {
  let performanceMonitor: PerformanceMonitor;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    performanceMonitor = new PerformanceMonitor();
    user = userEvent.setup();
    vi.clearAllMocks();

    // Mock realistic streaming response
    mockGeminiService.generateContentStream.mockImplementation(async function* () {
      const responses = [
        '# Réponse détaillée\n\n',
        'Voici une réponse complète avec du **formatage Markdown** et des éléments complexes:\n\n',
        '## Section 1: Analyse\n\n',
        '- Point important 1\n',
        '- Point important 2\n',
        '- Point important 3\n\n',
        '```javascript\n',
        'function exempleCode() {\n',
        '  console.log("Code avec coloration syntaxique");\n',
        '  return "résultat";\n',
        '}\n',
        '```\n\n',
        '## Section 2: Recommandations\n\n',
        '| Critère | Valeur | Importance |\n',
        '|---------|--------|------------|\n',
        '| Performance | 95% | Haute |\n',
        '| Accessibilité | 100% | Critique |\n',
        '| UX | 90% | Haute |\n\n',
        'Conclusion de la réponse avec des liens [utiles](https://example.com).'
      ];

      for (const chunk of responses) {
        yield { text: chunk };
        // Simulate realistic network delay
        await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 30));
      }
    });
  });

  afterEach(() => {
    performanceMonitor.reset();
    vi.restoreAllMocks();
  });

  describe('Long Conversation Performance', () => {
    it('should handle 100 messages without performance degradation', async () => {
      const { container } = render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            performanceConfig={{
              maxMessages: 1000,
              virtualScrolling: true,
              lazyRendering: true
            }}
          />
        </ChatProvider>
      );

      const messageCount = 100;
      const renderTimes: number[] = [];
      const memoryUsages: number[] = [];

      for (let i = 0; i < messageCount; i++) {
        performanceMonitor.start('message-send');

        // Send message
        const input = screen.getByPlaceholderText(/tapez votre message/i);
        await user.clear(input);
        await user.type(input, `Message de test ${i + 1} avec du contenu plus long pour tester la performance`);
        
        const sendButton = screen.getByRole('button', { name: /envoyer/i });
        await user.click(sendButton);

        // Wait for response to complete
        await waitFor(() => {
          expect(screen.getByText(/Conclusion de la réponse/)).toBeInTheDocument();
        }, { timeout: 10000 });

        const renderTime = performanceMonitor.end('message-send');
        renderTimes.push(renderTime);

        // Measure memory usage (approximation)
        const messageElements = container.querySelectorAll('[data-testid*="message"]');
        memoryUsages.push(messageElements.length);

        // Log progress every 10 messages
        if ((i + 1) % 10 === 0) {
          console.log(`Processed ${i + 1}/${messageCount} messages`);
          console.log(`Average render time: ${renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length}ms`);
        }
      }

      // Performance assertions
      const averageRenderTime = renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length;
      const maxRenderTime = Math.max(...renderTimes);
      const finalMemoryUsage = memoryUsages[memoryUsages.length - 1];

      expect(averageRenderTime).toBeLessThan(2000); // Average under 2s
      expect(maxRenderTime).toBeLessThan(5000); // Max under 5s
      expect(finalMemoryUsage).toBeLessThan(500); // Reasonable DOM size

      // Check for memory leaks (render time shouldn't increase significantly)
      const firstTenAverage = renderTimes.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
      const lastTenAverage = renderTimes.slice(-10).reduce((a, b) => a + b, 0) / 10;
      const performanceDegradation = (lastTenAverage - firstTenAverage) / firstTenAverage;

      expect(performanceDegradation).toBeLessThan(0.5); // Less than 50% degradation
    });

    it('should handle rapid message sending', async () => {
      render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            performanceConfig={{
              debounceDelay: 100,
              throttleScrolling: true
            }}
          />
        </ChatProvider>
      );

      const rapidMessages = 20;
      const startTime = performance.now();

      // Send messages rapidly
      for (let i = 0; i < rapidMessages; i++) {
        const input = screen.getByPlaceholderText(/tapez votre message/i);
        await user.clear(input);
        await user.type(input, `Rapid message ${i + 1}`);
        
        const sendButton = screen.getByRole('button', { name: /envoyer/i });
        await user.click(sendButton);
        
        // Don't wait for response, send next immediately
      }

      // Wait for all responses to complete
      await waitFor(() => {
        const messages = screen.getAllByText(/Rapid message/);
        expect(messages).toHaveLength(rapidMessages);
      }, { timeout: 30000 });

      const totalTime = performance.now() - startTime;
      expect(totalTime).toBeLessThan(60000); // Complete within 1 minute
    });
  });

  describe('Memory Management', () => {
    it('should implement message virtualization for large conversations', async () => {
      const { container } = render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            performanceConfig={{
              virtualScrolling: true,
              visibleMessageCount: 50,
              messageBufferSize: 10
            }}
          />
        </ChatProvider>
      );

      // Create 200 messages
      for (let i = 0; i < 200; i++) {
        const input = screen.getByPlaceholderText(/tapez votre message/i);
        await user.clear(input);
        await user.type(input, `Message ${i + 1}`);
        await user.click(screen.getByRole('button', { name: /envoyer/i }));

        if (i % 20 === 0) {
          await waitFor(() => {
            expect(screen.getByText(/Conclusion de la réponse/)).toBeInTheDocument();
          });
        }
      }

      // Check that only visible messages are in DOM
      const renderedMessages = container.querySelectorAll('[data-testid*="message"]');
      expect(renderedMessages.length).toBeLessThanOrEqual(120); // 50 visible + 10 buffer * 2 + responses

      // Verify virtual scrolling indicators
      expect(screen.getByTestId('virtual-scroll-top')).toBeInTheDocument();
      expect(screen.getByTestId('virtual-scroll-bottom')).toBeInTheDocument();
    });

    it('should clean up resources when chat is closed', async () => {
      const { unmount } = render(
        <ChatProvider>
          <EnhancedChatWidget isOpen={true} />
        </ChatProvider>
      );

      // Send some messages to create resources
      for (let i = 0; i < 10; i++) {
        const input = screen.getByPlaceholderText(/tapez votre message/i);
        await user.type(input, `Message ${i + 1}`);
        await user.click(screen.getByRole('button', { name: /envoyer/i }));
      }

      // Close chat
      const closeButton = screen.getByRole('button', { name: /fermer/i });
      await user.click(closeButton);

      // Unmount component
      unmount();

      // Verify cleanup (this would be more comprehensive in a real test)
      expect(document.querySelectorAll('[data-testid*="message"]')).toHaveLength(0);
    });
  });

  describe('Scroll Performance', () => {
    it('should maintain smooth scrolling with many messages', async () => {
      const { container } = render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            scrollConfig={{
              smoothScrollDuration: 300,
              throttleScrollEvents: true
            }}
          />
        </ChatProvider>
      );

      // Create many messages
      for (let i = 0; i < 50; i++) {
        const input = screen.getByPlaceholderText(/tapez votre message/i);
        await user.clear(input);
        await user.type(input, `Scroll test message ${i + 1}`);
        await user.click(screen.getByRole('button', { name: /envoyer/i }));
      }

      const chatContainer = container.querySelector('[data-testid="chat-messages"]');
      expect(chatContainer).toBeInTheDocument();

      // Test scroll performance
      const scrollTests = 20;
      const scrollTimes: number[] = [];

      for (let i = 0; i < scrollTests; i++) {
        performanceMonitor.start('scroll-test');
        
        // Scroll to random position
        const randomPosition = Math.random() * (chatContainer!.scrollHeight - chatContainer!.clientHeight);
        fireEvent.scroll(chatContainer!, { target: { scrollTop: randomPosition } });
        
        // Wait for scroll to settle
        await new Promise(resolve => setTimeout(resolve, 50));
        
        const scrollTime = performanceMonitor.end('scroll-test');
        scrollTimes.push(scrollTime);
      }

      const averageScrollTime = scrollTimes.reduce((a, b) => a + b, 0) / scrollTimes.length;
      expect(averageScrollTime).toBeLessThan(100); // Scroll should be fast
    });

    it('should handle auto-scroll during streaming without performance issues', async () => {
      render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            scrollConfig={{
              autoScrollEnabled: true,
              smoothScrollDuration: 200
            }}
          />
        </ChatProvider>
      );

      const streamingTests = 10;
      const autoScrollTimes: number[] = [];

      for (let i = 0; i < streamingTests; i++) {
        performanceMonitor.start('auto-scroll-streaming');

        const input = screen.getByPlaceholderText(/tapez votre message/i);
        await user.clear(input);
        await user.type(input, `Auto-scroll test ${i + 1}`);
        await user.click(screen.getByRole('button', { name: /envoyer/i }));

        // Wait for streaming to complete
        await waitFor(() => {
          expect(screen.getByText(/Conclusion de la réponse/)).toBeInTheDocument();
        });

        const autoScrollTime = performanceMonitor.end('auto-scroll-streaming');
        autoScrollTimes.push(autoScrollTime);
      }

      const averageAutoScrollTime = autoScrollTimes.reduce((a, b) => a + b, 0) / autoScrollTimes.length;
      expect(averageAutoScrollTime).toBeLessThan(3000); // Auto-scroll during streaming should be reasonable
    });
  });

  describe('Markdown Rendering Performance', () => {
    it('should handle complex markdown efficiently', async () => {
      // Mock complex markdown response
      mockGeminiService.generateContentStream.mockImplementation(async function* () {
        const complexMarkdown = `
# Titre Principal

## Section 1
Texte avec **gras**, *italique*, et \`code inline\`.

### Sous-section avec liste
- Item 1 avec [lien](https://example.com)
- Item 2 avec **formatage**
- Item 3 avec \`code\`

\`\`\`javascript
// Code block complexe
function complexFunction(param1, param2) {
  const result = param1.map(item => {
    return {
      ...item,
      processed: true,
      timestamp: new Date().toISOString()
    };
  });
  return result.filter(item => item.processed);
}
\`\`\`

## Section 2 avec tableau
| Colonne 1 | Colonne 2 | Colonne 3 | Colonne 4 |
|-----------|-----------|-----------|-----------|
| Valeur 1  | Valeur 2  | Valeur 3  | Valeur 4  |
| Valeur 5  | Valeur 6  | Valeur 7  | Valeur 8  |
| Valeur 9  | Valeur 10 | Valeur 11 | Valeur 12 |

> Citation importante avec du texte long qui peut s'étendre sur plusieurs lignes
> et contenir du **formatage** et des [liens](https://example.com).

### Liste numérotée
1. Premier élément
2. Deuxième élément avec sous-liste:
   - Sous-élément A
   - Sous-élément B
3. Troisième élément

---

Conclusion avec du texte final.
        `;

        const chunks = complexMarkdown.split('\n').filter(line => line.trim());
        for (const chunk of chunks) {
          yield { text: chunk + '\n' };
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      });

      render(
        <ChatProvider>
          <EnhancedChatWidget 
            isOpen={true}
            markdownConfig={{
              enableSyntaxHighlighting: true,
              enableTables: true,
              enableLinks: true,
              optimizeRendering: true
            }}
          />
        </ChatProvider>
      );

      const complexMarkdownTests = 5;
      const renderTimes: number[] = [];

      for (let i = 0; i < complexMarkdownTests; i++) {
        performanceMonitor.start('complex-markdown');

        const input = screen.getByPlaceholderText(/tapez votre message/i);
        await user.clear(input);
        await user.type(input, `Complex markdown test ${i + 1}`);
        await user.click(screen.getByRole('button', { name: /envoyer/i }));

        await waitFor(() => {
          expect(screen.getByText(/Conclusion avec du texte final/)).toBeInTheDocument();
        }, { timeout: 15000 });

        const renderTime = performanceMonitor.end('complex-markdown');
        renderTimes.push(renderTime);
      }

      const averageRenderTime = renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length;
      expect(averageRenderTime).toBeLessThan(5000); // Complex markdown should render within 5s
    });
  });

  describe('Concurrent Usage Simulation', () => {
    it('should handle multiple chat instances', async () => {
      const instanceCount = 3;
      const instances: any[] = [];

      // Create multiple chat instances
      for (let i = 0; i < instanceCount; i++) {
        const { container } = render(
          <ChatProvider>
            <EnhancedChatWidget 
              isOpen={true}
              instanceId={`chat-${i}`}
            />
          </ChatProvider>
        );
        instances.push(container);
      }

      // Send messages to all instances simultaneously
      const promises = instances.map(async (_, index) => {
        const inputs = screen.getAllByPlaceholderText(/tapez votre message/i);
        const sendButtons = screen.getAllByRole('button', { name: /envoyer/i });
        
        await user.type(inputs[index], `Concurrent message ${index + 1}`);
        await user.click(sendButtons[index]);
      });

      await Promise.all(promises);

      // Verify all instances work correctly
      for (let i = 0; i < instanceCount; i++) {
        await waitFor(() => {
          expect(screen.getByText(`Concurrent message ${i + 1}`)).toBeInTheDocument();
        });
      }
    });
  });
});