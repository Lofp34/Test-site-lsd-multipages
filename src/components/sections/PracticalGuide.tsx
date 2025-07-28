'use client';

import React, { useState, useRef, useEffect } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StepCard from '@/components/ui/StepCard';
import SectionSharing from '@/components/ui/SectionSharing';
import { PracticalGuideProps } from '@/types/negotiation-technique';

const PracticalGuide: React.FC<PracticalGuideProps> = ({ steps }) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [readingProgress, setReadingProgress] = useState<Record<number, number>>({});
  const tooltipRef = useRef<HTMLDivElement>(null);

  const toggleStep = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
    
    // Track step expansion for analytics
    if (expandedStep !== stepNumber) {
      // Mark step as started
      setReadingProgress(prev => ({
        ...prev,
        [stepNumber]: Date.now()
      }));
    }
  };

  const markStepCompleted = (stepNumber: number) => {
    setCompletedSteps(prev => new Set([...prev, stepNumber]));
  };

  const handleTooltip = (tooltipId: string | null) => {
    setShowTooltip(tooltipId);
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate overall progress
  const overallProgress = (completedSteps.size / steps.length) * 100;

  return (
    <section className="max-w-6xl mx-auto mb-16 px-4" aria-labelledby="practical-guide-title">
      <AnimatedSection animation="fade-in" delay={0}>
        <div className="text-center mb-12">
          <span className="inline-block bg-red-600/20 text-red-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
            <span className="inline mr-2">📋</span>
            Guide pratique
          </span>
          <h2 id="practical-guide-title" className="text-3xl md:text-4xl font-bold text-blue-ink mb-4">
            Guide étape par étape
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Suivez cette méthode éprouvée de Chris Voss, adaptée au contexte PME français par Laurent Serre. 
            Chaque étape inclut des scripts testés, des exemples concrets et des conseils terrain.
          </p>
        </div>
      </AnimatedSection>

      {/* Enhanced Progress indicator */}
      <AnimatedSection animation="slide-up" delay={100}>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Progression du guide</span>
              <div className="bg-mint-green/20 text-mint-green px-2 py-1 rounded-full text-xs font-medium">
                {completedSteps.size}/{steps.length} étapes complétées
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {expandedStep ? `Étape ${expandedStep} sur ${steps.length}` : 'Cliquez sur une étape pour la développer'}
            </span>
          </div>
          
          {/* Overall progress bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-mint-green to-mint-green/80 transition-all duration-500 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1 text-right">
              {Math.round(overallProgress)}% complété
            </div>
          </div>
          
          {/* Step indicators */}
          <div className="flex gap-2">
            {steps.map((step) => (
              <div
                key={step.step}
                className={`
                  flex-1 h-2 rounded-full transition-all duration-300 cursor-pointer relative group
                  ${completedSteps.has(step.step)
                    ? 'bg-mint-green'
                    : expandedStep === step.step 
                      ? 'bg-gradient-to-r from-red-600 to-orange-500' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }
                `}
                onClick={() => toggleStep(step.step)}
                role="button"
                tabIndex={0}
                aria-label={`Aller à l'étape ${step.step}: ${step.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleStep(step.step);
                  }
                }}
              >
                {/* Hover tooltip for step indicator */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <div className="bg-blue-ink text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Étape {step.step}: {step.title.substring(0, 30)}...
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-blue-ink"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Steps overview */}
      <AnimatedSection animation="fade-in" delay={200}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                ${expandedStep === step.step
                  ? 'border-red-500 bg-red-50 shadow-lg'
                  : 'border-gray-200 bg-white/50 hover:border-red-300 hover:bg-red-50/50'
                }
              `}
              onClick={() => toggleStep(step.step)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedStep === step.step}
              aria-controls={`step-${step.step}-content`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleStep(step.step);
                }
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold
                  ${expandedStep === step.step
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {step.step}
                </div>
                <h3 className="font-semibold text-blue-ink text-sm leading-tight">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">
                {step.description.substring(0, 100)}...
              </p>
              
              {/* Enhanced tooltip for additional context */}
              <div className="relative mt-2">
                <button
                  className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors"
                  onMouseEnter={() => handleTooltip(`step-${step.step}`)}
                  onMouseLeave={() => handleTooltip(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTooltip(showTooltip === `step-${step.step}` ? null : `step-${step.step}`);
                  }}
                  aria-describedby={`tooltip-step-${step.step}`}
                >
                  <span>ℹ️</span>
                  Aperçu rapide
                </button>
                
                {showTooltip === `step-${step.step}` && (
                  <div
                    ref={tooltipRef}
                    id={`tooltip-step-${step.step}`}
                    className="absolute bottom-full left-0 mb-2 p-4 bg-blue-ink text-white text-xs rounded-lg shadow-xl z-20 w-72 border border-blue-ink/20"
                    role="tooltip"
                  >
                    <div className="mb-3">
                      <div className="font-semibold text-mint-green mb-1">
                        📋 Étape {step.step}: {step.title}
                      </div>
                      <p className="text-gray-200 leading-relaxed">
                        {step.description.substring(0, 120)}...
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/10 rounded p-2">
                        <div className="text-mint-green font-medium">💬 Script</div>
                        <div className="text-gray-300">Formulation prête</div>
                      </div>
                      <div className="bg-white/10 rounded p-2">
                        <div className="text-mint-green font-medium">💡 Exemple</div>
                        <div className="text-gray-300">Cas concret PME</div>
                      </div>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-white/20">
                      <div className="text-mint-green text-xs">
                        🎯 {step.tips.length} conseils pratiques • ⏱️ ~3 min de lecture
                      </div>
                    </div>
                    
                    <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-ink"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Detailed step content */}
      {expandedStep && (
        <AnimatedSection animation="slide-up" delay={0} key={expandedStep}>
          <div id={`step-${expandedStep}-content`} className="mb-8">
            {steps
              .filter(step => step.step === expandedStep)
              .map((step, index) => (
                <div key={step.step}>
                  <StepCard
                    stepNumber={step.step}
                    title={step.title}
                    description={step.description}
                    script={step.script}
                    example={step.example}
                    tips={step.tips}
                    className="mb-6"
                    onComplete={() => markStepCompleted(step.step)}
                    isCompleted={completedSteps.has(step.step)}
                  />
                  
                  {/* Navigation between steps */}
                  <div className="flex justify-between items-center mt-6 p-4 bg-white/60 rounded-xl border border-gray-200">
                    <button
                      onClick={() => toggleStep(Math.max(1, step.step - 1))}
                      disabled={step.step === 1}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                        ${step.step === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                        }
                      `}
                      aria-label="Étape précédente"
                    >
                      <span>←</span>
                      Étape précédente
                    </button>
                    
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">
                        Étape {step.step} sur {steps.length}
                      </div>
                      <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto">
                        <div 
                          className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full transition-all duration-300"
                          style={{ width: `${(step.step / steps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleStep(Math.min(steps.length, step.step + 1))}
                      disabled={step.step === steps.length}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                        ${step.step === steps.length
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                        }
                      `}
                      aria-label="Étape suivante"
                    >
                      Étape suivante
                      <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </AnimatedSection>
      )}

      {/* Call to action */}
      <AnimatedSection animation="fade-in" delay={300}>
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
          <h3 className="text-xl font-bold text-blue-ink mb-4">
            Prêt à appliquer cette technique ?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Téléchargez la checklist complète et les scripts prêts à utiliser pour maîtriser 
            la technique "Ne jamais couper la poire en deux" dans vos négociations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg border-2 border-red-600 hover:bg-red-50 transition-colors text-center"
            >
              🎯 Réserver un coaching
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default PracticalGuide;