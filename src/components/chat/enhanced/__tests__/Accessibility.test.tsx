/**
 * Comprehensive accessibility tests for enhanced chat components
 * Tests WCAG 2.1 AA compliance and ARIA best practices
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import MarkdownRenderer from '../MarkdownRenderer';
import ScrollController from '../ScrollController';
import ChatControls from '../ChatControls';
import EnhancedChatWidget from '../EnhancedChatWidget';
import { LiveRegionManager, AccessibilityConfig } from '@/lib/chat/accessibility';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' })
}));

// Mock mobile optimization hook
jest.mock('@/hooks/useMobileOptimization', () => ({
  useMobileOptimization: () => ({
    isMobile: false,
    getMobileClasses: (desktop: string, mobile: string) => desktop
  })
}));

describe('Chat Accessibility', () => {
  let liveRegionManager: LiveRegionManager;

  beforeEach(() => {
    liveRegionManager = new LiveRegionManager();
  });

  afterEach(() => {
    liveRegionManager.destroy();
  });

  describe('MarkdownRenderer Accessibility', () => {
    const accessibilityConfig: AccessibilityConfig = {
      announceNewMessages: true,
      highlightFocusedElements: true,
      reduceMotion: false,
      highContrastMode: false,
      fontSize: 'medium',
      screenReaderOptimized: true,
      keyboardNavigationEnabled: true,
      liveRegionPoliteness: 'polite'
    };

    it('should have no accessibility violations', async () => {
      const { container } = render(
        <MarkdownRenderer
          content="# Test Heading\n\nThis is a test paragraph with **bold** text."
          isStreaming={false}
          accessibilityConfig={accessibilityConfig}
          messageRole="assistant"
          messageTimestamp={new Date()}
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes', () => {
      render(
        <MarkdownRenderer
          content="# Test Content"
          isStreaming={false}
          accessibilityConfig={accessibilityConfig}
          messageRole="assistant"
          messageTimestamp={new Date()}
        />
      );

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('aria-label', expect.stringContaining('Message assistant'));
      expect(article).toHaveAttribute('aria-live', 'off');
      expect(article).toHaveAttribute('aria-busy', 'false');
    });

    it('should announce streaming content', () => {
      render(
        <MarkdownRenderer
          content="Streaming content..."
          isStreaming={true}
          accessibilityConfig={accessibilityConfig}
          messageRole="assistant"
          messageTimestamp={new Date()}
        />
      );

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('aria-live', 'polite');
      expect(article).toHaveAttribute('aria-busy', 'true');
    });

    it('should have accessible headings with proper hierarchy', () => {
      render(
        <MarkdownRenderer
          content="# Heading 1\n## Heading 2\n### Heading 3"
          isStreaming={false}
          accessibilityConfig={accessibilityConfig}
        />
      );

      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });
      const h3 = screen.getByRole('heading', { level: 3 });

      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();

      // Check for keyboard navigation support
      expect(h1).toHaveAttribute('tabIndex', '0');
      expect(h2).toHaveAttribute('tabIndex', '0');
      expect(h3).toHaveAttribute('tabIndex', '0');
    });

    it('should have accessible code blocks', () => {
      render(
        <MarkdownRenderer
          content="```javascript\nconsole.log('Hello World');\n```"
          isStreaming={false}
          accessibilityConfig={accessibilityConfig}
        />
      );

      const codeRegion = screen.getByRole('region', { name: /Code javascript/i });
      expect(codeRegion).toBeInTheDocument();
      expect(codeRegion).toHaveAttribute('tabIndex', '0');

      const copyButton = screen.getByRole('button', { name: /Copier le code javascript/i });
      expect(copyButton).toBeInTheDocument();
      expect(copyButton).toHaveAttribute('type', 'button');
    });

    it('should have accessible tables', () => {
      render(
        <MarkdownRenderer
          content="| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |"
          isStreaming={false}
          accessibilityConfig={accessibilityConfig}
        />
      );

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();

      const tableRegion = table.closest('[role="region"]');
      expect(tableRegion).toBeInTheDocument();
      expect(tableRegion).toHaveAttribute('tabIndex', '0');
    });

    it('should have accessible links', () => {
      render(
        <MarkdownRenderer
          content="[Test Link](https://example.com)"
          isStreaming={false}
          accessibilityConfig={accessibilityConfig}
        />
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('aria-label', expect.stringContaining('lien externe'));
    });

    it('should have accessible images', () => {
      render(
        <MarkdownRenderer
          content="![Alt text](https://example.com/image.jpg)"
          isStreaming={false}
          accessibilityConfig={accessibilityConfig}
        />
      );

      const figure = screen.getByRole('img');
      expect(figure).toBeInTheDocument();

      const img = screen.getByRole('img').querySelector('img');
      expect(img).toHaveAttribute('alt', 'Alt text');
      expect(img).toHaveAttribute('tabIndex', '0');

      const caption = screen.getByText('Alt text');
      expect(caption).toBeInTheDocument();
    });

    it('should respect reduced motion preferences', () => {
      const reducedMotionConfig = {
        ...accessibilityConfig,
        reduceMotion: true
      };

      render(
        <MarkdownRenderer
          content="Loading..."
          isStreaming={true}
          accessibilityConfig={reducedMotionConfig}
        />
      );

      const statusIndicator = screen.getByRole('status');
      expect(statusIndicator).toHaveClass('motion-reduce:animate-none');
    });

    it('should support different font sizes', () => {
      const { rerender } = render(
        <MarkdownRenderer
          content="Test content"
          isStreaming={false}
          accessibilityConfig={{ ...accessibilityConfig, fontSize: 'large' }}
        />
      );

      let article = screen.getByRole('article');
      expect(article).toHaveClass('text-lg');

      rerender(
        <MarkdownRenderer
          content="Test content"
          isStreaming={false}
          accessibilityConfig={{ ...accessibilityConfig, fontSize: 'xl' }}
        />
      );

      article = screen.getByRole('article');
      expect(article).toHaveClass('text-xl');
    });

    it('should provide screen reader optimized content', () => {
      render(
        <MarkdownRenderer
          content="# Test\nMultiple lines\nof content"
          isStreaming={false}
          accessibilityConfig={accessibilityConfig}
        />
      );

      const srContent = screen.getByText(/Fin du message assistant/);
      expect(srContent).toHaveClass('sr-only');
    });
  });

  describe('ScrollController Accessibility', () => {
    const mockContainerRef = React.createRef<HTMLDivElement>();
    const mockScrollState = {
      isAtBottom: false,
      isUserScrolling: false,
      shouldAutoScroll: true,
      scrollPosition: 100
    };

    beforeEach(() => {
      // Mock container element
      const mockContainer = document.createElement('div');
      mockContainer.scrollHeight = 1000;
      mockContainer.clientHeight = 500;
      mockContainer.scrollTop = 100;
      (mockContainerRef as any).current = mockContainer;
    });

    it('should have no accessibility violations', async () => {
      const { container } = render(
        <ScrollController
          containerRef={mockContainerRef}
          isStreaming={false}
          autoScrollEnabled={true}
          onScrollStateChange={() => {}}
          liveRegionManager={liveRegionManager}
        >
          <div>Test content</div>
        </ScrollController>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have accessible scroll to bottom button', () => {
      render(
        <ScrollController
          containerRef={mockContainerRef}
          isStreaming={false}
          autoScrollEnabled={true}
          onScrollStateChange={() => {}}
          liveRegionManager={liveRegionManager}
        >
          <div>Test content</div>
        </ScrollController>
      );

      // Simulate showing the scroll button
      fireEvent.scroll(mockContainerRef.current!, { target: { scrollTop: 100 } });

      const scrollButton = screen.getByRole('button', { name: /Retourner en bas/i });
      expect(scrollButton).toBeInTheDocument();
      expect(scrollButton).toHaveAttribute('type', 'button');
      expect(scrollButton).toHaveAttribute('title', expect.stringContaining('Ctrl+Fin'));
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <ScrollController
          containerRef={mockContainerRef}
          isStreaming={false}
          autoScrollEnabled={true}
          onScrollStateChange={() => {}}
          liveRegionManager={liveRegionManager}
        >
          <div>Test content</div>
        </ScrollController>
      );

      // Focus the container
      mockContainerRef.current!.focus();

      // Test Ctrl+Home (scroll to top)
      await user.keyboard('{Control>}{Home}{/Control}');
      expect(mockContainerRef.current!.scrollTop).toBe(0);

      // Test Ctrl+End (scroll to bottom)
      await user.keyboard('{Control>}{End}{/Control}');
      expect(mockContainerRef.current!.scrollTop).toBe(500); // scrollHeight - clientHeight
    });

    it('should provide screen reader instructions', () => {
      const accessibilityConfig = {
        screenReaderOptimized: true,
        keyboardNavigationEnabled: true
      } as AccessibilityConfig;

      render(
        <ScrollController
          containerRef={mockContainerRef}
          isStreaming={false}
          autoScrollEnabled={true}
          onScrollStateChange={() => {}}
          accessibilityConfig={accessibilityConfig}
          liveRegionManager={liveRegionManager}
        >
          <div>Test content</div>
        </ScrollController>
      );

      expect(screen.getByText(/Navigation au clavier disponible/)).toHaveClass('sr-only');
      expect(screen.getByText(/Ctrl\+Début/)).toBeInTheDocument();
      expect(screen.getByText(/Ctrl\+Fin/)).toBeInTheDocument();
    });

    it('should announce scroll position changes', async () => {
      const mockAnnounce = jest.spyOn(liveRegionManager, 'announceScrollPosition');

      render(
        <ScrollController
          containerRef={mockContainerRef}
          isStreaming={false}
          autoScrollEnabled={true}
          onScrollStateChange={() => {}}
          liveRegionManager={liveRegionManager}
        >
          <div>Test content</div>
        </ScrollController>
      );

      const scrollButton = screen.getByRole('button', { name: /Retourner en bas/i });
      fireEvent.click(scrollButton);

      expect(mockAnnounce).toHaveBeenCalledWith('bottom');
    });
  });

  describe('ChatControls Accessibility', () => {
    const defaultProps = {
      onClose: jest.fn(),
      onMinimize: jest.fn(),
      onFullscreen: jest.fn(),
      isMinimized: false,
      isFullscreen: false,
      isStreaming: false
    };

    it('should have no accessibility violations', async () => {
      const { container } = render(<ChatControls {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper toolbar role and attributes', () => {
      render(<ChatControls {...defaultProps} />);

      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveAttribute('aria-label', 'Contrôles du chat');
      expect(toolbar).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have accessible control buttons', () => {
      render(<ChatControls {...defaultProps} />);

      const closeButton = screen.getByRole('button', { name: /Fermer le chat/i });
      expect(closeButton).toBeInTheDocument();

      const minimizeButton = screen.getByRole('button', { name: /Réduire/i });
      expect(minimizeButton).toBeInTheDocument();

      const fullscreenButton = screen.getByRole('button', { name: /Plein écran/i });
      expect(fullscreenButton).toBeInTheDocument();
    });

    it('should show accessible confirmation dialog', () => {
      render(<ChatControls {...defaultProps} isStreaming={true} />);

      const closeButton = screen.getByRole('button', { name: /Fermer le chat/i });
      fireEvent.click(closeButton);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'confirm-dialog-title');
      expect(dialog).toHaveAttribute('aria-describedby', 'confirm-dialog-description');

      const title = screen.getByText('Confirmer l\'action');
      expect(title).toHaveAttribute('id', 'confirm-dialog-title');

      const description = screen.getByText(/Êtes-vous sûr de vouloir fermer le chat/);
      expect(description).toHaveAttribute('id', 'confirm-dialog-description');
    });

    it('should support keyboard shortcuts', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(<ChatControls {...defaultProps} onClose={onClose} />);

      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalled();
    });

    it('should handle dialog keyboard navigation', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(<ChatControls {...defaultProps} onClose={onClose} isStreaming={true} />);

      // Open dialog
      const closeButton = screen.getByRole('button', { name: /Fermer le chat/i });
      await user.click(closeButton);

      // Test Enter to confirm
      await user.keyboard('{Enter}');
      expect(onClose).toHaveBeenCalled();
    });

    it('should show reopening indicator when closed', () => {
      render(
        <ChatControls 
          {...defaultProps} 
          isClosed={true} 
          onReopen={jest.fn()} 
        />
      );

      const reopenButton = screen.getByRole('button', { name: /Rouvrir le chat/i });
      expect(reopenButton).toBeInTheDocument();
      expect(reopenButton).toHaveAttribute('aria-label', 'Rouvrir le chat');
    });
  });

  describe('LiveRegionManager', () => {
    it('should create live regions with proper attributes', () => {
      const manager = new LiveRegionManager();

      const politeRegion = document.getElementById('chat-live-region-polite');
      expect(politeRegion).toHaveAttribute('aria-live', 'polite');
      expect(politeRegion).toHaveAttribute('aria-atomic', 'true');
      expect(politeRegion).toHaveClass('sr-only');

      const assertiveRegion = document.getElementById('chat-live-region-assertive');
      expect(assertiveRegion).toHaveAttribute('aria-live', 'assertive');

      const statusRegion = document.getElementById('chat-status-region');
      expect(statusRegion).toHaveAttribute('role', 'status');

      manager.destroy();
    });

    it('should announce messages correctly', async () => {
      const manager = new LiveRegionManager();

      manager.announce('Test message', 'polite');

      await waitFor(() => {
        const politeRegion = document.getElementById('chat-live-region-polite');
        expect(politeRegion?.textContent).toBe('Test message');
      });

      manager.destroy();
    });

    it('should announce new chat messages', async () => {
      const manager = new LiveRegionManager();

      manager.announceNewMessage('assistant', 'Hello world', false);

      await waitFor(() => {
        const politeRegion = document.getElementById('chat-live-region-polite');
        expect(politeRegion?.textContent).toContain('Assistant répond: Hello world');
      });

      manager.destroy();
    });

    it('should announce streaming status', async () => {
      const manager = new LiveRegionManager();

      manager.announceStreamingStatus('started');

      await waitFor(() => {
        const statusRegion = document.getElementById('chat-status-region');
        expect(statusRegion?.textContent).toBe('L\'assistant commence à répondre');
      });

      manager.destroy();
    });
  });

  describe('Integration Tests', () => {
    it('should work together in EnhancedChatWidget', async () => {
      const { container } = render(
        <EnhancedChatWidget
          isOpen={true}
          onClose={jest.fn()}
          accessibilityConfig={{
            announceNewMessages: true,
            highlightFocusedElements: true,
            reduceMotion: false,
            highContrastMode: false,
            fontSize: 'medium',
            screenReaderOptimized: true,
            keyboardNavigationEnabled: true,
            liveRegionPoliteness: 'polite'
          }}
        />
      );

      // Check for main accessibility landmarks
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
      
      // Run axe accessibility tests
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should handle keyboard navigation across components', async () => {
      const user = userEvent.setup();

      render(
        <EnhancedChatWidget
          isOpen={true}
          onClose={jest.fn()}
          accessibilityConfig={{
            announceNewMessages: true,
            highlightFocusedElements: true,
            reduceMotion: false,
            highContrastMode: false,
            fontSize: 'medium',
            screenReaderOptimized: true,
            keyboardNavigationEnabled: true,
            liveRegionPoliteness: 'polite'
          }}
        />
      );

      // Test tab navigation
      await user.tab();
      expect(document.activeElement).toBeInTheDocument();

      // Test escape key
      await user.keyboard('{Escape}');
      // Should trigger close confirmation or close directly
    });
  });
});