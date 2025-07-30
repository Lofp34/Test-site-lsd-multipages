import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import PracticalGuide from '../PracticalGuide';
import { NegotiationTechnique } from '@/types/negotiation-technique';

// Mock des composants UI
vi.mock('@/components/ui/AnimatedSection', () => ({
  default: ({ children, delay, animation }: any) => (
    <div data-testid="animated-section" data-delay={delay} data-animation={animation}>
      {children}
    </div>
  )
}));

vi.mock('@/components/ui/Badge', () => ({
  default: ({ children, variant, size, className }: any) => (
    <span data-testid="badge" data-variant={variant} data-size={size} className={className}>
      {children}
    </span>
  )
}));

vi.mock('@/components/ui/Button', () => ({
  default: ({ children, variant, size, onClick, className, icon, iconPosition, disabled }: any) => (
    <button 
      data-testid="button" 
      data-variant={variant} 
      data-size={size}
      onClick={onClick}
      className={className}
      disabled={disabled}
      data-icon-position={iconPosition}
    >
      {icon && <span data-testid="button-icon">{icon}</span>}
      {children}
    </button>
  )
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock window.gtag
const mockGtag = vi.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true
});

// Mock data
const mockSteps = [
  {
    step: 1,
    title: 'Écoute active',
    description: 'Identifiez le moment précis où votre interlocuteur exprime une émotion forte.',
    script: 'Client: "C\'est trop cher." Vous: "Trop cher ?"',
    example: 'Au lieu de justifier immédiatement, vous reflétez l\'émotion exprimée.',
    tips: [
      'Attendez 2-3 secondes avant de répondre',
      'Répétez uniquement les mots chargés émotionnellement',
      'Utilisez une intonation légèrement interrogative'
    ]
  },
  {
    step: 2,
    title: 'Observation des réactions',
    description: 'Analysez la réaction de votre interlocuteur après le miroir.',
    script: 'Observez les micro-expressions et le langage corporel.',
    example: 'Le client se détend et commence à expliquer ses contraintes budgétaires.',
    tips: [
      'Notez les changements de posture',
      'Écoutez les variations de ton',
      'Repérez les signaux d\'ouverture'
    ]
  },
  {
    step: 3,
    title: 'Approfondissement',
    description: 'Utilisez l\'ouverture créée pour approfondir la découverte.',
    script: 'Posez des questions ouvertes pour explorer davantage.',
    example: 'Vous découvrez que le budget est bloqué jusqu\'au prochain trimestre.',
    tips: [
      'Posez des questions ouvertes',
      'Creusez les émotions révélées',
      'Restez dans l\'empathie'
    ]
  }
];

const mockTechnique: NegotiationTechnique = {
  id: 'effet-miroir',
  slug: 'effet-miroir',
  title: 'L\'effet miroir',
  author: 'Chris Voss',
  origin: 'FBI',
  category: 'psychology',
  difficultyLevel: 'intermediate',
  description: 'Test description',
  psychologyPrinciples: [],
  businessApplications: [],
  laurentVision: 'Test vision',
  pmeAdaptation: 'Test adaptation',
  successMetrics: [],
  stepByStepGuide: mockSteps,
  caseStudies: [],
  commonMistakes: [],
  relatedTechniques: [],
  downloadableResources: [],
  seoMetadata: {
    title: 'Test',
    description: 'Test',
    keywords: ['test'],
    canonicalUrl: 'https://test.com'
  },
  trackingEvents: []
};

describe('PracticalGuide', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render practical guide with correct structure', () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    // Vérifier la structure principale
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByText('Guide Pratique')).toBeInTheDocument();
    expect(screen.getByText(/Appliquez L'effet miroir étape par étape/)).toBeInTheDocument();
  });

  it('should display progress bar correctly', () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    expect(screen.getByText('Progression')).toBeInTheDocument();
    expect(screen.getByText('0/3 étapes')).toBeInTheDocument();
    
    // Vérifier la barre de progression
    const progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toBeInTheDocument();
  });

  it('should render all step buttons', () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    expect(screen.getByText('Étapes (3)')).toBeInTheDocument();
    
    // Vérifier que les 3 étapes sont affichées
    expect(screen.getByText('Écoute active')).toBeInTheDocument();
    expect(screen.getByText('Observation des réactions')).toBeInTheDocument();
    expect(screen.getByText('Approfondissement')).toBeInTheDocument();
  });

  it('should display first step as active by default', () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    // Vérifier que la première étape est active
    const firstStepButton = screen.getByText('Écoute active').closest('button');
    expect(firstStepButton).toHaveAttribute('aria-pressed', 'true');
    
    // Vérifier que le contenu de la première étape est affiché
    expect(screen.getByText('Identifiez le moment précis où votre interlocuteur exprime une émotion forte.')).toBeInTheDocument();
  });

  it('should switch steps when clicking step buttons', async () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    // Cliquer sur la deuxième étape
    const secondStepButton = screen.getByText('Observation des réactions').closest('button');
    fireEvent.click(secondStepButton!);
    
    await waitFor(() => {
      expect(secondStepButton).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByText('Analysez la réaction de votre interlocuteur après le miroir.')).toBeInTheDocument();
    });
  });

  it('should track step navigation with gtag', async () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    const secondStepButton = screen.getByText('Observation des réactions').closest('button');
    fireEvent.click(secondStepButton!);
    
    await waitFor(() => {
      expect(mockGtag).toHaveBeenCalledWith('event', 'step_navigation', {
        event_category: 'Practical Guide',
        event_label: 'Step 2',
        step_number: 2
      });
    });
  });

  it('should display step content correctly', () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    // Vérifier le contenu de l'étape 1
    expect(screen.getByText('Écoute active')).toBeInTheDocument();
    expect(screen.getByText('Étape 1')).toBeInTheDocument();
    
    // Vérifier le script
    expect(screen.getByText('Script type')).toBeInTheDocument();
    expect(screen.getByText('Client: "C\'est trop cher." Vous: "Trop cher ?"')).toBeInTheDocument();
    
    // Vérifier l'exemple
    expect(screen.getByText('Exemple concret')).toBeInTheDocument();
    expect(screen.getByText('Au lieu de justifier immédiatement, vous reflétez l\'émotion exprimée.')).toBeInTheDocument();
  });

  it('should handle tips accordion correctly', async () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    // Vérifier que l'accordéon des conseils est fermé par défaut
    expect(screen.getByText('Conseils pratiques (3)')).toBeInTheDocument();
    
    // Cliquer pour ouvrir l'accordéon
    const tipsButton = screen.getByText('Conseils pratiques (3)').closest('button');
    fireEvent.click(tipsButton!);
    
    await waitFor(() => {
      expect(screen.getByText('Attendez 2-3 secondes avant de répondre')).toBeInTheDocument();
      expect(screen.getByText('Répétez uniquement les mots chargés émotionnellement')).toBeInTheDocument();
      expect(screen.getByText('Utilisez une intonation légèrement interrogative')).toBeInTheDocument();
    });
  });

  it('should track tips interaction', async () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    const tipsButton = screen.getByText('Conseils pratiques (3)').closest('button');
    fireEvent.click(tipsButton!);
    
    await waitFor(() => {
      expect(mockGtag).toHaveBeenCalledWith('event', 'tips_interaction', {
        event_category: 'Practical Guide',
        event_label: 'Step 1 Tips',
        action: 'open'
      });
    });
  });

  it('should handle navigation buttons correctly', () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    // Vérifier les boutons de navigation
    const prevButton = screen.getByText('Étape précédente');
    const nextButton = screen.getByText('Étape suivante');
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
    
    // Vérifier l'indicateur de progression
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('should navigate with navigation buttons', async () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    const nextButton = screen.getByText('Étape suivante');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('2 / 3')).toBeInTheDocument();
      expect(screen.getByText('Observation des réactions')).toBeInTheDocument();
    });
    
    // Maintenant le bouton précédent devrait être activé
    const prevButton = screen.getByText('Étape précédente');
    expect(prevButton).not.toBeDisabled();
  });

  it('should save and load completed steps from localStorage', () => {
    // Mock localStorage avec des étapes complétées
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([1, 2]));
    
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    // Vérifier que les étapes complétées sont chargées
    expect(screen.getByText('2/3 étapes')).toBeInTheDocument();
    
    // Vérifier que la barre de progression reflète les étapes complétées
    const progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toHaveStyle({ width: '66.66666666666666%' });
  });

  it('should mark step as completed', async () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    const markCompleteButton = screen.getByText('Marquer comme lu');
    fireEvent.click(markCompleteButton);
    
    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'completed-steps-effet-miroir',
        JSON.stringify([1])
      );
    });
  });

  it('should show completion celebration when all steps are done', () => {
    // Mock toutes les étapes comme complétées
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([1, 2, 3]));
    
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    expect(screen.getByText('🎉 Excellent progrès !')).toBeInTheDocument();
    expect(screen.getByText(/Félicitations, vous maîtrisez maintenant cette technique/)).toBeInTheDocument();
    expect(screen.getByText('Passer à la pratique')).toBeInTheDocument();
  });

  it('should handle missing technique gracefully', () => {
    render(<PracticalGuide steps={mockSteps} />);
    
    expect(screen.getByText(/Appliquez la technique étape par étape/)).toBeInTheDocument();
  });

  it('should handle empty steps array', () => {
    render(<PracticalGuide steps={[]} technique={mockTechnique} />);
    
    expect(screen.getByText('Étapes (0)')).toBeInTheDocument();
    expect(screen.getByText('0/0 étapes')).toBeInTheDocument();
  });

  it('should track step read events', async () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    // Le premier step devrait être tracké automatiquement
    await waitFor(() => {
      expect(mockGtag).toHaveBeenCalledWith('event', 'step_read', {
        event_category: 'Practical Guide',
        event_label: 'Step 1 - L\'effet miroir',
        step_number: 1
      });
    });
  });

  it('should have proper accessibility attributes', () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    // Vérifier les attributs ARIA
    const stepButtons = screen.getAllByRole('button');
    stepButtons.forEach(button => {
      if (button.getAttribute('aria-pressed')) {
        expect(button).toHaveAttribute('aria-pressed');
      }
    });
    
    // Vérifier les labels
    const firstStepButton = screen.getByLabelText('Étape 1: Écoute active');
    expect(firstStepButton).toBeInTheDocument();
  });

  it('should handle step completion tracking', async () => {
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    const markCompleteButton = screen.getByText('Marquer comme lu');
    fireEvent.click(markCompleteButton);
    
    await waitFor(() => {
      expect(mockGtag).toHaveBeenCalledWith('event', 'step_completed', {
        event_category: 'Practical Guide',
        event_label: 'Step 1',
        step_number: 1
      });
    });
  });

  it('should show correct step indicators', () => {
    // Mock avec étape 1 complétée
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([1]));
    
    render(<PracticalGuide steps={mockSteps} technique={mockTechnique} />);
    
    // La première étape devrait montrer une coche
    const completedStepButton = screen.getByText('Écoute active').closest('button');
    expect(completedStepButton?.querySelector('[data-testid="button-icon"]')).toBeInTheDocument();
  });
});