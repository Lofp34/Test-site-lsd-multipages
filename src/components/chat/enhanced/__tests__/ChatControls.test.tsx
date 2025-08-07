import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ChatControls from '../ChatControls';

describe('ChatControls', () => {
  const mockOnClose = vi.fn();
  const mockOnMinimize = vi.fn();
  const mockOnFullscreen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders all control buttons', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    expect(screen.getByLabelText('Plein écran')).toBeInTheDocument();
    expect(screen.getByLabelText('Réduire')).toBeInTheDocument();
    expect(screen.getByLabelText('Fermer le chat')).toBeInTheDocument();
  });

  it('shows maximize button when minimized', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={true}
        isFullscreen={false}
      />
    );

    expect(screen.getByLabelText('Agrandir')).toBeInTheDocument();
    expect(screen.queryByLabelText('Réduire')).not.toBeInTheDocument();
  });

  it('shows exit fullscreen icon when in fullscreen', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={true}
      />
    );

    expect(screen.getByLabelText('Quitter le plein écran')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    fireEvent.click(screen.getByLabelText('Fermer le chat'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onMinimize when minimize button is clicked', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    fireEvent.click(screen.getByLabelText('Réduire'));
    expect(mockOnMinimize).toHaveBeenCalledTimes(1);
  });

  it('calls onFullscreen when fullscreen button is clicked', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    fireEvent.click(screen.getByLabelText('Plein écran'));
    expect(mockOnFullscreen).toHaveBeenCalledTimes(1);
  });

  it('shows confirmation dialog when closing while streaming', async () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={true}
        showCloseConfirmation={true}
      />
    );

    fireEvent.click(screen.getByLabelText('Fermer le chat'));
    
    await waitFor(() => {
      expect(screen.getByText('Confirmer l\'action')).toBeInTheDocument();
      expect(screen.getByText('Laurent Serre est en train de répondre')).toBeInTheDocument();
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('shows confirmation dialog when minimizing while streaming', async () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={true}
        showCloseConfirmation={true}
      />
    );

    fireEvent.click(screen.getByLabelText('Réduire'));
    
    await waitFor(() => {
      expect(screen.getByText('Confirmer l\'action')).toBeInTheDocument();
    });

    expect(mockOnMinimize).not.toHaveBeenCalled();
  });

  it('confirms close action in dialog', async () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={true}
        showCloseConfirmation={true}
      />
    );

    fireEvent.click(screen.getByLabelText('Fermer le chat'));
    
    await waitFor(() => {
      expect(screen.getByText('Fermer le chat')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Fermer le chat'));
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('confirms minimize action in dialog', async () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={true}
        showCloseConfirmation={true}
      />
    );

    fireEvent.click(screen.getByLabelText('Réduire'));
    
    await waitFor(() => {
      expect(screen.getByText('Réduire le chat')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Réduire le chat'));
    
    await waitFor(() => {
      expect(mockOnMinimize).toHaveBeenCalledTimes(1);
    });
  });

  it('cancels action in confirmation dialog', async () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={true}
        showCloseConfirmation={true}
      />
    );

    fireEvent.click(screen.getByLabelText('Fermer le chat'));
    
    await waitFor(() => {
      expect(screen.getByText('Annuler')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Annuler'));
    
    await waitFor(() => {
      expect(screen.queryByText('Confirmer l\'action')).not.toBeInTheDocument();
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('handles Escape key to close', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handles Ctrl+M to minimize', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    fireEvent.keyDown(document, { key: 'm', ctrlKey: true });
    expect(mockOnMinimize).toHaveBeenCalledTimes(1);
  });

  it('handles Cmd+M to minimize on Mac', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    fireEvent.keyDown(document, { key: 'm', metaKey: true });
    expect(mockOnMinimize).toHaveBeenCalledTimes(1);
  });

  it('handles F11 for fullscreen', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    fireEvent.keyDown(document, { key: 'F11' });
    expect(mockOnFullscreen).toHaveBeenCalledTimes(1);
  });

  it('handles Enter key in confirmation dialog', async () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={true}
        showCloseConfirmation={true}
      />
    );

    fireEvent.click(screen.getByLabelText('Fermer le chat'));
    
    await waitFor(() => {
      expect(screen.getByText('Confirmer l\'action')).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Enter' });
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('handles Escape key in confirmation dialog', async () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={true}
        showCloseConfirmation={true}
      />
    );

    fireEvent.click(screen.getByLabelText('Fermer le chat'));
    
    await waitFor(() => {
      expect(screen.getByText('Confirmer l\'action')).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByText('Confirmer l\'action')).not.toBeInTheDocument();
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('shows streaming indicator when streaming', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={true}
      />
    );

    expect(screen.getByText('Laurent répond...')).toBeInTheDocument();
  });

  it('hides streaming indicator when not streaming', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={false}
      />
    );

    expect(screen.queryByText('Laurent répond...')).not.toBeInTheDocument();
  });

  it('does not show confirmation when showCloseConfirmation is false', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={true}
        showCloseConfirmation={false}
      />
    );

    fireEvent.click(screen.getByLabelText('Fermer le chat'));
    
    expect(screen.queryByText('Confirmer l\'action')).not.toBeInTheDocument();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        className="custom-controls"
      />
    );

    expect(document.querySelector('.custom-controls')).toBeInTheDocument();
  });

  it('shows reopening indicator when chat is closed', () => {
    const mockOnReopen = vi.fn();
    
    render(
      <ChatControls
        onClose={mockOnClose}
        isMinimized={false}
        isFullscreen={false}
        isClosed={true}
        onReopen={mockOnReopen}
      />
    );

    expect(screen.getByLabelText('Rouvrir le chat')).toBeInTheDocument();
    expect(screen.getByTitle('Rouvrir le chat Laurent Serre')).toBeInTheDocument();
  });

  it('calls onReopen when reopening indicator is clicked', () => {
    const mockOnReopen = vi.fn();
    
    render(
      <ChatControls
        onClose={mockOnClose}
        isMinimized={false}
        isFullscreen={false}
        isClosed={true}
        onReopen={mockOnReopen}
      />
    );

    fireEvent.click(screen.getByLabelText('Rouvrir le chat'));
    expect(mockOnReopen).toHaveBeenCalledTimes(1);
  });

  it('does not show main controls when chat is closed', () => {
    const mockOnReopen = vi.fn();
    
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isClosed={true}
        onReopen={mockOnReopen}
      />
    );

    expect(screen.queryByLabelText('Fermer le chat')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Plein écran')).not.toBeInTheDocument();
  });

  it('shows enhanced streaming indicator with proper styling', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
        isStreaming={true}
      />
    );

    expect(screen.getByText('Laurent répond...')).toBeInTheDocument();
  });

  it('has proper mobile touch target sizes', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    const closeButton = screen.getByLabelText('Fermer le chat');
    const minimizeButton = screen.getByLabelText('Réduire');
    const fullscreenButton = screen.getByLabelText('Plein écran');

    // Check that buttons have minimum touch target size (44px)
    expect(closeButton).toHaveClass('min-w-[44px]', 'min-h-[44px]');
    expect(minimizeButton).toHaveClass('min-w-[44px]', 'min-h-[44px]');
    expect(fullscreenButton).toHaveClass('min-w-[44px]', 'min-h-[44px]');
  });

  it('handles missing onMinimize prop gracefully', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    // Should not render minimize button when onMinimize is not provided
    expect(screen.queryByLabelText('Réduire')).not.toBeInTheDocument();
  });

  it('handles missing onFullscreen prop gracefully', () => {
    render(
      <ChatControls
        onClose={mockOnClose}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    // Should not render fullscreen button when onFullscreen is not provided
    expect(screen.queryByLabelText('Plein écran')).not.toBeInTheDocument();
  });

  it('cleans up event listeners on unmount', () => {
    const { unmount } = render(
      <ChatControls
        onClose={mockOnClose}
        onMinimize={mockOnMinimize}
        onFullscreen={mockOnFullscreen}
        isMinimized={false}
        isFullscreen={false}
      />
    );

    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('fullscreenchange', expect.any(Function));
  });
});