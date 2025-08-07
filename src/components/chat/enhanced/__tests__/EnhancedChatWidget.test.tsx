import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import EnhancedChatWidget from '../EnhancedChatWidget';

// Mock all the dependencies
vi.mock('../MarkdownRenderer', () => ({
  default: ({ content, isStreaming }: any) => (
    <div data-testid="markdown-renderer">
      {content}
      {isStreaming && <span>Streaming...</span>}
    </div>
  )
}));

vi.mock('../ScrollController', () => ({
  default: ({ children, onScrollStateChange }: any) => {
    // Simulate scroll state changes
    React.useEffect(() => {
      onScrollStateChange({
        isAtBottom: true,
        isUserScrolling: false,
        shouldAutoScroll: true,
        scrollPosition: 0
      });
    }, [onScrollStateChange]);
    
    return <div data-testid="scroll-controller">{children}</div>;
  }
}));

vi.mock('../ChatControls', () => ({
  default: ({ onClose, onMinimize, onFullscreen, isStreaming }: any) => (
    <div data-testid="chat-controls">
      <button onClick={onClose}>Close</button>
      <button onClick={onMinimize}>Minimize</button>
      <button onClick={onFullscreen}>Fullscreen</button>
      {isStreaming && <span>Streaming indicator</span>}
    </div>
  )
}));

vi.mock('../ChatInterface', () => ({
  default: ({ onSendMessage, hideMessages }: any) => (
    <div data-testid="chat-interface">
      <button onClick={() => onSendMessage('test message')}>Send Message</button>
      {hideMessages && <span>Messages hidden</span>}
    </div>
  )
}));

vi.mock('../PrivacyNotice', () => ({
  default: ({ isVisible, onAccept, onDecline }: any) => 
    isVisible ? (
      <div data-testid="privacy-notice">
        <button onClick={() => onAccept({ allowCookies: true })}>Accept</button>
        <button onClick={onDecline}>Decline</button>
      </div>
    ) : null
}));

vi.mock('../PrivacySettings', () => ({
  default: ({ isOpen, onClose }: any) => 
    isOpen ? (
      <div data-testid="privacy-settings">
        <button onClick={onClose}>Close Settings</button>
      </div>
    ) : null
}));

vi.mock('@/hooks/useGeminiChatSimple', () => ({
  useGeminiChatSimple: () => ({
    messages: [
      { id: '1', role: 'user', content: 'Hello', timestamp: new Date() },
      { id: '2', role: 'assistant', content: '**Hello!** How can I help you?', timestamp: new Date() }
    ],
    isStreaming: false,
    streamingMessage: '',
    sendMessage: vi.fn(),
    error: null,
    clearError: vi.fn(),
    retryLastOperation: vi.fn(),
    isRecovering: false,
    recoveryAction: null
  })
}));

vi.mock('@/hooks/useMobileOptimization', () => ({
  useMobileOptimization: () => ({
    isMobile: false,
    isTablet: false,
    orientation: 'portrait',
    isKeyboardVisible: false,
    getChatPosition: () => ({ bottom: '1rem', right: '1rem' }),
    getChatSize: () => ({ width: '400px', height: '600px' }),
    getMobileClasses: (desktop: string, mobile: string) => desktop
  })
}));

vi.mock('@/lib/gemini/privacy-manager', () => ({
  PrivacyManager: class {
    hasUserConsent = vi.fn(() => true);
    recordUserConsent = vi.fn();
    updateSettings = vi.fn();
  }
}));

vi.mock('@/lib/gemini/cookie-free-mode', () => ({
  CookieFreeMode: {
    getInstance: () => ({
      enable: vi.fn(),
      disable: vi.fn()
    })
  }
}));

describe('EnhancedChatWidget', () => {
  const mockOnStateChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders floating button when closed', () => {
    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    expect(screen.getByLabelText('Ouvrir le chat Laurent Serre')).toBeInTheDocument();
    expect(screen.queryByTestId('chat-controls')).not.toBeInTheDocument();
  });

  it('opens chat when floating button is clicked', async () => {
    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByLabelText('Ouvrir le chat Laurent Serre'));

    await waitFor(() => {
      expect(screen.getByTestId('chat-controls')).toBeInTheDocument();
      expect(screen.getByText('Laurent Serre')).toBeInTheDocument();
    });
  });

  it('displays chat messages with markdown rendering', async () => {
    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByLabelText('Ouvrir le chat Laurent Serre'));

    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByTestId('markdown-renderer')).toBeInTheDocument();
    });
  });

  it('integrates scroll controller', async () => {
    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByLabelText('Ouvrir le chat Laurent Serre'));

    await waitFor(() => {
      expect(screen.getByTestId('scroll-controller')).toBeInTheDocument();
    });
  });

  it('handles close action', async () => {
    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByLabelText('Ouvrir le chat Laurent Serre'));

    await waitFor(() => {
      expect(screen.getByTestId('chat-controls')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.queryByTestId('chat-controls')).not.toBeInTheDocument();
      expect(screen.getByLabelText('Ouvrir le chat Laurent Serre')).toBeInTheDocument();
    });
  });

  it('handles minimize action', async () => {
    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByLabelText('Ouvrir le chat Laurent Serre'));

    await waitFor(() => {
      expect(screen.getByTestId('chat-controls')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Minimize'));

    // Chat should still be open but minimized
    expect(screen.getByTestId('chat-controls')).toBeInTheDocument();
    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        isMinimized: true
      })
    );
  });

  it('handles fullscreen action', async () => {
    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByLabelText('Ouvrir le chat Laurent Serre'));

    await waitFor(() => {
      expect(screen.getByTestId('chat-controls')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Fullscreen'));

    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        isFullscreen: true
      })
    );
  });

  it('calls onStateChange when state changes', async () => {
    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByLabelText('Ouvrir le chat Laurent Serre'));

    await waitFor(() => {
      expect(mockOnStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          isOpen: true,
          isMinimized: false,
          isFullscreen: false,
          isStreaming: false,
          messageCount: 2
        })
      );
    });
  });

  it('handles message sending', async () => {
    const mockSendMessage = vi.fn();
    vi.mocked(require('@/hooks/useGeminiChatSimple').useGeminiChatSimple).mockReturnValue({
      messages: [],
      isStreaming: false,
      streamingMessage: '',
      sendMessage: mockSendMessage,
      error: null,
      clearError: vi.fn(),
      retryLastOperation: vi.fn(),
      isRecovering: false,
      recoveryAction: null
    });

    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByLabelText('Ouvrir le chat Laurent Serre'));

    await waitFor(() => {
      expect(screen.getByTestId('chat-interface')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Send Message'));

    expect(mockSendMessage).toHaveBeenCalledWith('test message', undefined);
  });

  it('shows new message notification when closed', () => {
    const { rerender } = render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    // Simulate new message arriving
    vi.mocked(require('@/hooks/useGeminiChatSimple').useGeminiChatSimple).mockReturnValue({
      messages: [{ id: '1', role: 'assistant', content: 'New message', timestamp: new Date() }],
      isStreaming: false,
      streamingMessage: '',
      sendMessage: vi.fn(),
      error: null,
      clearError: vi.fn(),
      retryLastOperation: vi.fn(),
      isRecovering: false,
      recoveryAction: null
    });

    rerender(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    const floatingButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
    expect(floatingButton).toHaveClass('animate-bounce');
  });

  it('applies custom configurations', () => {
    const markdownConfig = { enableSyntaxHighlighting: false };
    const scrollConfig = { bottomThreshold: 100 };
    const controlsConfig = { showMinimizeButton: false };

    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
        markdownConfig={markdownConfig}
        scrollConfig={scrollConfig}
        controlsConfig={controlsConfig}
      />
    );

    // Configurations should be passed to child components
    // This would be tested more thoroughly in integration tests
    expect(screen.getByLabelText('Ouvrir le chat Laurent Serre')).toBeInTheDocument();
  });

  it('handles different positions', () => {
    render(
      <EnhancedChatWidget
        position="bottom-left"
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    const widget = screen.getByLabelText('Ouvrir le chat Laurent Serre').closest('.fixed');
    expect(widget).toHaveStyle({ bottom: '1rem', left: '1rem' });
  });

  it('handles center position', () => {
    render(
      <EnhancedChatWidget
        position="center"
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    const widget = screen.getByLabelText('Ouvrir le chat Laurent Serre').closest('.fixed');
    expect(widget).toHaveStyle({ 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)' 
    });
  });

  it('shows privacy notice when no consent', () => {
    vi.mocked(require('@/lib/gemini/privacy-manager').PrivacyManager).mockImplementation(() => ({
      hasUserConsent: vi.fn(() => false),
      recordUserConsent: vi.fn(),
      updateSettings: vi.fn()
    }));

    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    expect(screen.getByTestId('privacy-notice')).toBeInTheDocument();
  });

  it('handles privacy acceptance', async () => {
    vi.mocked(require('@/lib/gemini/privacy-manager').PrivacyManager).mockImplementation(() => ({
      hasUserConsent: vi.fn(() => false),
      recordUserConsent: vi.fn(),
      updateSettings: vi.fn()
    }));

    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByText('Accept'));

    await waitFor(() => {
      expect(screen.queryByTestId('privacy-notice')).not.toBeInTheDocument();
    });
  });

  it('handles privacy decline', async () => {
    vi.mocked(require('@/lib/gemini/privacy-manager').PrivacyManager).mockImplementation(() => ({
      hasUserConsent: vi.fn(() => false),
      recordUserConsent: vi.fn(),
      updateSettings: vi.fn()
    }));

    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByText('Decline'));

    await waitFor(() => {
      expect(screen.queryByTestId('privacy-notice')).not.toBeInTheDocument();
    });
  });

  it('handles streaming state', () => {
    vi.mocked(require('@/hooks/useGeminiChatSimple').useGeminiChatSimple).mockReturnValue({
      messages: [],
      isStreaming: true,
      streamingMessage: 'Streaming content...',
      sendMessage: vi.fn(),
      error: null,
      clearError: vi.fn(),
      retryLastOperation: vi.fn(),
      isRecovering: false,
      recoveryAction: null
    });

    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByLabelText('Ouvrir le chat Laurent Serre'));

    expect(screen.getByText('En train d\'écrire...')).toBeInTheDocument();
    expect(mockOnStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        isStreaming: true
      })
    );
  });

  it('handles error states', async () => {
    const mockError = {
      type: 'API_ERROR',
      message: 'Test error',
      userMessage: 'Une erreur est survenue'
    };

    vi.mocked(require('@/hooks/useGeminiChatSimple').useGeminiChatSimple).mockReturnValue({
      messages: [],
      isStreaming: false,
      streamingMessage: '',
      sendMessage: vi.fn(),
      error: mockError,
      clearError: vi.fn(),
      retryLastOperation: vi.fn(),
      isRecovering: false,
      recoveryAction: null
    });

    render(
      <EnhancedChatWidget
        onStateChange={mockOnStateChange}
        apiKey="test-key"
      />
    );

    fireEvent.click(screen.getByLabelText('Ouvrir le chat Laurent Serre'));

    await waitFor(() => {
      expect(screen.getByText('Une erreur est survenue')).toBeInTheDocument();
    });
  });
});