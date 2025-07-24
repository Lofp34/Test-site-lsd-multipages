'use client';

import React from 'react';
import { ImplementationPhase, CategoryTheme } from '@/types/category-templates';
import AnimatedSection from './AnimatedSection';

interface ImplementationRoadmapProps {
  phases: ImplementationPhase[];
  categoryTheme: CategoryTheme;
  domainTitle: string;
}

export default function ImplementationRoadmap({
  phases,
  categoryTheme,
  domainTitle
}: ImplementationRoadmapProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return '#10B981'; // green
      case 'Intermédiaire':
        return '#F59E0B'; // amber
      case 'Avancé':
        return '#EF4444'; // red
      default:
        return categoryTheme.primaryColor;
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return '🟢';
      case 'Intermédiaire':
        return '🟡';
      case 'Avancé':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="bg-white/70 rounded-2xl shadow-2xl p-8 border border-[var(--theme-primary)]/20 backdrop-blur-sm">
      <div className="text-center mb-8">
        <span className="inline-block bg-orange-soft/20 text-orange-soft font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
          🚀 Implémentation
        </span>
        <h3 className={`text-2xl font-bold text-blue-ink mb-4`}>
          Feuille de route pour maîtriser {domainTitle}
        </h3>
        <p className="text-gray-700 mb-6">
          Un plan d'implémentation progressive en 4 phases pour transformer vos résultats
        </p>
      </div>

      <div className="space-y-8">
        {phases.map((phase, index) => (
          <AnimatedSection key={phase.phase} delay={100 + index * 150}>
            <div className="relative">
              {/* Ligne de connexion entre les phases */}
              {index < phases.length - 1 && (
                <div 
                  className="absolute left-6 top-16 w-0.5 h-16 opacity-30"
                  style={{ backgroundColor: categoryTheme.primaryColor }}
                ></div>
              )}
              
              <div className="flex gap-6">
                {/* Numéro de phase */}
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    style={{ backgroundColor: categoryTheme.primaryColor }}
                  >
                    {phase.phase}
                  </div>
                </div>
                
                {/* Contenu de la phase */}
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-white/50 to-white/30 rounded-xl p-6 border border-[var(--theme-primary)]/20">
                    {/* En-tête de phase */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className={`text-xl font-bold text-[${categoryTheme.primaryColor}] mb-2`}>
                          Phase {phase.phase}: {phase.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600
                          <span>⏱️ {phase.duration}</span>
                          <span className="flex items-center gap-1">
                            {getDifficultyIcon(phase.difficulty)}
                            {phase.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {phase.description}
                    </p>
                    
                    {/* Actions clés */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 mb-2">
                        Actions clés :
                      </h5>
                      <ul className="space-y-1">
                        {phase.keyActions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start gap-2 text-sm text-gray-700
                            <span className="text-[var(--theme-primary)] mt-1">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Résultats attendus */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 mb-2">
                        Résultats attendus :
                      </h5>
                      <div className="grid md:grid-cols-2 gap-2">
                        {phase.expectedResults.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-start gap-2 text-sm">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="text-gray-700
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Prérequis si disponibles */}
                    {phase.prerequisites && phase.prerequisites.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-800 mb-2">
                          Prérequis :
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {phase.prerequisites.map((prerequisite, preqIndex) => (
                            <span 
                              key={preqIndex}
                              className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                            >
                              {prerequisite}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Conseil Laurent Serre */}
                    <div 
                      className="p-4 rounded-lg border-l-4"
                      style={{ 
                        backgroundColor: `${categoryTheme.accentColor}30`,
                        borderLeftColor: categoryTheme.primaryColor
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: categoryTheme.primaryColor }}
                        >
                          <span className="text-white font-bold text-xs">LS</span>
                        </div>
                        <span className="text-sm font-semibold" style={{ color: categoryTheme.primaryColor }}>
                          Conseil Laurent Serre
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm italic">
                        "{phase.laurentTip}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
      
      {/* Résumé final */}
      <div className="mt-8 p-6 bg-gradient-to-r from-[var(--theme-primary)]/10 to-[var(--theme-secondary)]/10 rounded-xl border border-[var(--theme-primary)]/20">
        <div className="text-center">
          <h4 className={`text-lg font-bold text-[${categoryTheme.primaryColor}] mb-2`}>
            Résultat après 6 mois d'implémentation
          </h4>
          <p className="text-gray-700 text-sm">
            Une maîtrise progressive et durable des concepts de {domainTitle.toLowerCase()}, 
            avec des résultats mesurables dès la phase 2 et une transformation complète 
            de vos performances commerciales.
          </p>
        </div>
      </div>
    </div>
  );
}