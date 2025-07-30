'use client';

import React, { useState, useEffect } from 'react';
import { NegotiationTechnique } from '@/types/negotiation-technique';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface PracticalGuideProps {
  steps: {
    step: number;
    title: string;
    description: string;
    script: string;
    example: string;
    tips: string[];
  }[];
  technique?: NegotiationTechnique;
}

interface StepButtonProps {
  step: {
    step: number;
    title: string;
    description: string;
    script: string;
    example: string;
    tips: string[];
  };
  isActive: boolean;
  onClick: () => void;
  isCompleted: boolean;
}

interface StepDetailProps {
  step?: {
    step: number;
    title: string;
    description: string;
    script: string;
    example: string;
    tips: string[];
  };
  technique?: NegotiationTechnique;
}

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  completedSteps: Set<number>;
}

interface TipsAccordionProps {
  tips: string[];
  stepNumber: number;
}

// Composant Bouton d'étape
const StepButton: React.FC<StepButtonProps> = ({ step, isActive, onClick, isCompleted }) => {
  const handleClick = () => {
    onClick();
    
    // Track step navigation
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'step_navigation', {
        event_category: 'Practical Guide',
        event_label: `Step ${step.step}`,
        step_number: step.step
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-300 text-left w-full
        ${isActive 
          ? 'border-mint-green bg-mint-green/10 shadow-lg scale-105' 
          : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-blue-ink/30 hover:border-mint-green/50 hover:bg-mint-green/5'
        }
        ${isCompleted ? 'ring-2 ring-mint-green/30' : ''}
      `}
      aria-pressed={isActive}
      aria-label={`Étape ${step.step}: ${step.title}`}
    >
      <div className="flex items-center gap-3">
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
          ${isActive 
            ? 'bg-mint-green text-white' 
            : isCompleted 
              ? 'bg-mint-green/20 text-mint-green' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }
        `}>
          {isCompleted ? '✓' : step.step}
        </div>
        
        <div className="flex-1">
          <h4 className={`font-semibold text-sm mb-1 ${isActive ? 'text-mint-green' : 'text-blue-ink dark:text-white'}`}>
            {step.title}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {step.description}
          </p>
        </div>
        
        {isCompleted && (
          <div className="w-6 h-6 bg-mint-green rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
    </button>
  );
};

// Composant Accordéon de conseils
const TipsAccordion: React.FC<TipsAccordionProps> = ({ tips, stepNumber }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTips = () => {
    setIsOpen(!isOpen);
    
    // Track tips interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tips_interaction', {
        event_category: 'Practical Guide',
        event_label: `Step ${stepNumber} Tips`,
        action: isOpen ? 'close' : 'open'
      });
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={toggleTips}
        className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl border border-mint-green/20 hover:from-mint-green/15 hover:to-blue-ink/15 transition-all duration-300"
        aria-expanded={isOpen}
        aria-controls={`tips-${stepNumber}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-mint-green/20 rounded-lg flex items-center justify-center">
            <span className="text-mint-green text-sm">💡</span>
          </div>
          <span className="font-semibold text-blue-ink dark:text-white">
            Conseils pratiques ({tips.length})
          </span>
        </div>
        
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-mint-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <div 
        id={`tips-${stepNumber}`}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white/70 dark:bg-blue-ink/40 rounded-lg">
              <div className="w-6 h-6 bg-mint-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-mint-green text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Composant Détail d'étape
const StepDetail: React.FC<StepDetailProps> = ({ step, technique }) => {
  if (!step) return null;

  const trackStepRead = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'step_read', {
        event_category: 'Practical Guide',
        event_label: `Step ${step.step} - ${technique?.title || 'Unknown'}`,
        step_number: step.step
      });
    }
  };

  useEffect(() => {
    trackStepRead();
  }, [step.step]);

  return (
    <div className="bg-white/80 dark:bg-blue-ink/60 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
      {/* En-tête de l'étape */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-mint-green to-blue-ink rounded-2xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">{step.step}</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-blue-ink dark:text-white mb-1">
            {step.title}
          </h3>
          <Badge variant="default" size="sm" className="bg-mint-green/20 text-mint-green">
            Étape {step.step}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          {step.description}
        </p>
      </div>

      {/* Script et Exemple */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Script */}
        <div className="bg-gradient-to-br from-blue-ink/10 to-mint-green/10 rounded-xl p-6 border border-blue-ink/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-ink/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-ink text-sm">💬</span>
            </div>
            <h4 className="font-bold text-blue-ink dark:text-white">Script type</h4>
          </div>
          <div className="bg-white/70 dark:bg-blue-ink/30 rounded-lg p-4 border-l-4 border-blue-ink">
            <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
              {step.script}
            </p>
          </div>
        </div>

        {/* Exemple */}
        <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-xl p-6 border border-mint-green/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-mint-green/20 rounded-lg flex items-center justify-center">
              <span className="text-mint-green text-sm">📝</span>
            </div>
            <h4 className="font-bold text-blue-ink dark:text-white">Exemple concret</h4>
          </div>
          <div className="bg-white/70 dark:bg-blue-ink/30 rounded-lg p-4 border-l-4 border-mint-green">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {step.example}
            </p>
          </div>
        </div>
      </div>

      {/* Conseils pratiques */}
      <TipsAccordion tips={step.tips} stepNumber={step.step} />
    </div>
  );
};

// Composant Boutons de navigation
const NavigationButtons: React.FC<NavigationButtonsProps> = ({ 
  currentStep, 
  totalSteps, 
  onStepChange, 
  completedSteps 
}) => {
  const canGoPrevious = currentStep > 1;
  const canGoNext = currentStep < totalSteps;
  const isCurrentCompleted = completedSteps.has(currentStep);

  const handlePrevious = () => {
    if (canGoPrevious) {
      onStepChange(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onStepChange(currentStep + 1);
    }
  };

  const markAsCompleted = () => {
    // This would be handled by parent component
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'step_completed', {
        event_category: 'Practical Guide',
        event_label: `Step ${currentStep}`,
        step_number: currentStep
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="md"
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          className="disabled:opacity-50"
          icon={<span>←</span>}
        >
          Étape précédente
        </Button>
        
        <Button
          variant="ghost"
          size="md"
          onClick={handleNext}
          disabled={!canGoNext}
          className="disabled:opacity-50"
          icon={<span>→</span>}
          iconPosition="right"
        >
          Étape suivante
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {currentStep} / {totalSteps}
        </div>
        
        {!isCurrentCompleted && (
          <Button
            variant="primary"
            size="sm"
            onClick={markAsCompleted}
            icon={<span>✓</span>}
          >
            Marquer comme lu
          </Button>
        )}
      </div>
    </div>
  );
};

// Composant principal PracticalGuide
const PracticalGuide: React.FC<PracticalGuideProps> = ({ steps, technique }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Load completed steps from localStorage
  useEffect(() => {
    if (technique?.id) {
      const saved = localStorage.getItem(`completed-steps-${technique.id}`);
      if (saved) {
        setCompletedSteps(new Set(JSON.parse(saved)));
      }
    }
  }, [technique?.id]);

  // Save completed steps to localStorage
  const markStepAsCompleted = (stepNumber: number) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepNumber);
    setCompletedSteps(newCompleted);
    
    if (technique?.id) {
      localStorage.setItem(`completed-steps-${technique.id}`, JSON.stringify([...newCompleted]));
    }
  };

  const currentStepData = steps.find(s => s.step === activeStep);
  const progressPercentage = (completedSteps.size / steps.length) * 100;

  return (
    <section className="py-16 bg-gradient-to-b from-white/50 to-primary-bg dark:from-blue-ink/20 dark:to-blue-ink/40">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête de section */}
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="text-center mb-12">
            <Badge variant="default" size="md" className="mb-4">
              <span className="mr-2">📋</span>
              Guide Pratique
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-ink dark:text-white mb-4">
              Appliquez {technique?.title || 'la technique'} étape par étape
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6">
              Suivez ce guide interactif pour maîtriser la technique avec des scripts prêts à utiliser 
              et des conseils terrain éprouvés.
            </p>
            
            {/* Barre de progression */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Progression</span>
                <span>{completedSteps.size}/{steps.length} étapes</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-mint-green to-blue-ink h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation des étapes */}
          <div className="lg:col-span-1">
            <AnimatedSection animation="slide-right" delay={100}>
              <div className="sticky top-24">
                <h3 className="font-bold text-blue-ink dark:text-white mb-4">
                  Étapes ({steps.length})
                </h3>
                <div className="space-y-3">
                  {steps.map((step) => (
                    <StepButton
                      key={step.step}
                      step={step}
                      isActive={activeStep === step.step}
                      isCompleted={completedSteps.has(step.step)}
                      onClick={() => setActiveStep(step.step)}
                    />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contenu de l'étape */}
          <div className="lg:col-span-3">
            <AnimatedSection animation="slide-left" delay={200} key={activeStep}>
              <StepDetail 
                step={currentStepData}
                technique={technique}
              />
              
              <NavigationButtons
                currentStep={activeStep}
                totalSteps={steps.length}
                onStepChange={setActiveStep}
                completedSteps={completedSteps}
              />
            </AnimatedSection>
          </div>
        </div>

        {/* Résumé de progression */}
        {completedSteps.size > 0 && (
          <AnimatedSection animation="fade-in" delay={400}>
            <div className="mt-12 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-2xl p-8 border border-mint-green/20 text-center">
              <h3 className="text-xl font-bold text-blue-ink dark:text-white mb-4">
                🎉 Excellent progrès !
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Vous avez complété {completedSteps.size} étape{completedSteps.size > 1 ? 's' : ''} sur {steps.length}. 
                {completedSteps.size === steps.length 
                  ? ' Félicitations, vous maîtrisez maintenant cette technique !' 
                  : ' Continuez pour maîtriser complètement la technique.'
                }
              </p>
              
              {completedSteps.size === steps.length && (
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-4"
                  icon={<span>🚀</span>}
                >
                  Passer à la pratique
                </Button>
              )}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default PracticalGuide;