import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ChatWidget from '@/components/chat/ChatWidget';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

// Mock du hook d'optimisation mobile
jest.mock('@/hooks/useMobileOptimization');
const mockUseMobileOptimization = useMobileOptimization as jest.MockedFunction<typeof useMobileOptimization>;

// Mock du hook Gemini
jest.mock('@/hooks/useGeminiChat', () => ({
  useGeminiChat: () => ({
    messages: [],
    isStreaming: false,
    streamingMessage: '',
    sendMessage: jest.fn(),
    error: null,
    clearError: jest.fn()
  })
}));

// Mock CSS import
jest.mock('@/styles/mobile-chat.css', () => ({}));

describe('Mobile Chat Optimizations', () => {
  const mockMobileOptimization = {
    isMobile: true,
    isTablet: false,
    orientation: 'portrait' as const,
    isKeyboardVisible: false,
    touchGesture: null,
    getChatPosition: () => ({ bottom: '20px', right: '16px' }),
    getChatSize: () => ({ width: '320px', height: '480px' }),
    getMobileClasses: (base: string, mobile: string) => `${base} ${mobile}`,
    onSwipeDown: jest.fn(),
    onSwipeUp: jest.fn(),
    onSwipeLeft: jest.fn(),
    onSwipeRight: jest.fn()
  };

  beforeEach(() => {
    mockUseMobileOptimization.mockReturnValue(mockMobileOptimization);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Mobile Interface Adaptations', () => {
    it('should render mobile-optimized chat button', () => {
      render(<ChatWidget />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      expect(chatButton).toHaveClass('w-14', 'h-14'); // Mobile size classes
    });

    it('should apply mobile positioning', () => {
      render(<ChatWidget />);
      
      const chatContainer = screen.getByLabelText('Ouvrir le chat Laurent Serre').closest('div');
      expect(chatContainer).toHaveStyle({
        bottom: '20px',
        right: '16px'
      });
    });

    it('should show swipe indicators on mobile when chat is open', async () => {
      render(<ChatWidget />);
      
      // Ouvrir le chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);

      await waitFor(() => {
        expect(screen.getByText('Swipe')).toBeInTheDocument();
      });
    });

    it('should handle keyboard visibility changes', () => {
      const mockWithKeyboard = {
        ...mockMobileOptimization,
        isKeyboardVisible: true
      };
      
      mockUseMobileOptimization.mockReturnValue(mockWithKeyboard);
      
      render(<ChatWidget />);
      
      // Ouvrir le chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);

      // Vérifier que l'interface s'adapte au clavier
      expect(screen.getByRole('textbox')).toHaveStyle({
        fontSize: '16px' // Évite le zoom sur iOS
      });
    });
  });

  describe('Touch Gestures', () => {
    it('should register swipe gestures', async () => {
      render(<ChatWidget />);
      
      // Ouvrir le chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);

      // Simuler un swipe
      const mockGesture = {
        startX: 100,
        startY: 100,
        currentX: 200,
        currentY: 100,
        deltaX: 100,
        deltaY: 0,
        distance: 100,
        direction: 'right' as const
      };

      mockUseMobileOptimization.mockReturnValue({
        ...mockMobileOptimization,
        touchGesture: mockGesture
      });

      // Re-render pour déclencher l'effet
      render(<ChatWidget />);
      
      expect(mockMobileOptimization.onSwipeRight).toHaveBeenCalled();
    });

    it('should minimize chat on swipe down', () => {
      const onSwipeDown = jest.fn((callback) => callback());
      
      mockUseMobileOptimization.mockReturnValue({
        ...mockMobileOptimization,
        onSwipeDown
      });

      render(<ChatWidget />);
      
      // Ouvrir le chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);

      // Le swipe down devrait minimiser
      expect(onSwipeDown).toHaveBeenCalled();
    });
  });

  describe('Responsive Design', () => {
    it('should adapt to landscape orientation', () => {
      const mockLandscape = {
        ...mockMobileOptimization,
        orientation: 'landscape' as const
      };
      
      mockUseMobileOptimization.mockReturnValue(mockLandscape);
      
      render(<ChatWidget />);
      
      // Ouvrir le chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);

      // Vérifier l'adaptation à l'orientation paysage
      expect(screen.getByText('Mode paysage - Meilleure qualité photo')).toBeInTheDocument();
    });

    it('should show tablet-specific optimizations', () => {
      const mockTablet = {
        ...mockMobileOptimization,
        isMobile: false,
        isTablet: true
      };
      
      mockUseMobileOptimization.mockReturnValue(mockTablet);
      
      render(<ChatWidget />);
      
      // Les tablettes devraient avoir des tailles intermédiaires
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      expect(chatButton).not.toHaveClass('w-14', 'h-14'); // Pas les classes mobile
    });
  });

  describe('Performance Optimizations', () => {
    it('should not apply click-outside behavior on mobile', () => {
      const mockClickOutside = jest.fn();
      
      render(<ChatWidget />);
      
      // Ouvrir le chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);

      // Cliquer à l'extérieur ne devrait pas fermer sur mobile
      fireEvent.mouseDown(document.body);
      
      expect(screen.getByText('Laurent Serre')).toBeInTheDocument();
    });

    it('should use mobile-optimized font sizes', () => {
      render(<ChatWidget />);
      
      // Ouvrir le chat
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      fireEvent.click(chatButton);

      // Vérifier les tailles de police mobile
      const headerTitle = screen.getByText('Laurent Serre');
      expect(headerTitle).toHaveClass('text-xs'); // Classe mobile
    });
  });

  describe('Accessibility on Mobile', () => {
    it('should maintain touch target sizes', () => {
      render(<ChatWidget />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      
      // Les boutons doivent avoir une taille minimale de 44px sur mobile
      const styles = window.getComputedStyle(chatButton);
      const minSize = parseInt(styles.minHeight) || parseInt(styles.height);
      expect(minSize).toBeGreaterThanOrEqual(44);
    });

    it('should provide haptic feedback simulation', () => {
      render(<ChatWidget />);
      
      const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
      expect(chatButton).toHaveClass('active:scale-90'); // Simulation haptic
    });
  });
});

describe('Mobile File Upload Optimizations', () => {
  beforeEach(() => {
    mockUseMobileOptimization.mockReturnValue(mockMobileOptimization);
  });

  it('should show mobile camera options', async () => {
    render(<ChatWidget />);
    
    // Ouvrir le chat
    const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
    fireEvent.click(chatButton);

    // Ouvrir l'uploader
    await waitFor(() => {
      const attachButton = screen.getByTitle('Ajouter des fichiers');
      fireEvent.click(attachButton);
    });

    // Vérifier les options mobile
    expect(screen.getByText('Galerie')).toBeInTheDocument();
    expect(screen.getByText('Caméra')).toBeInTheDocument();
    expect(screen.getByText('Selfie')).toBeInTheDocument();
  });

  it('should show connection speed indicators', async () => {
    // Mock d'une connexion lente
    Object.defineProperty(navigator, 'connection', {
      value: {
        effectiveType: '2g'
      },
      configurable: true
    });

    render(<ChatWidget />);
    
    // Ouvrir le chat et l'uploader
    const chatButton = screen.getByLabelText('Ouvrir le chat Laurent Serre');
    fireEvent.click(chatButton);

    await waitFor(() => {
      const attachButton = screen.getByTitle('Ajouter des fichiers');
      fireEvent.click(attachButton);
    });

    // Vérifier l'indicateur de compression
    expect(screen.getByText('Compression automatique activée')).toBeInTheDocument();
  });
});