'use client';

import React, { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { CommonMistakesProps } from '@/types/negotiation-technique';

const CommonMistakes: React.FC<CommonMistakesProps> = ({ mistakes }) => {
  const [expandedMistake, setExpandedMistake] = useState<number | null>(null);
  const [showAllSolutions, setShowAllSolutions] = useState(false);

  const toggleMistake = (index: number) => {
    setExpandedMistake(expandedMistake === index ? null : index);
  };

  const getMistakeIcon = (index: number) => {
    const icons = ['⚠️', '🚫', '❌', '⛔', '🔴', '💥'];
    return icons[index % icons.length];
  };

  const getSeverityColor = (index: number) => {
    // Alternate between different severity levels for visual variety
    const colors = [
      { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', accent: 'text-red-600' },
      { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', accent: 'text-orange-600' },
      { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', accent: 'text-yellow-600' },
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="max-w-6xl mx-auto mb-16 px-4" aria-labelledby="common-mistakes-title">
      <AnimatedSection animation="fade-in" delay={0}>
        <div className="text-center mb-12">
          <span className="inline-block bg-red-600/20 text-red-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
            <span className="inline mr-2">⚠️</span>
            Pièges à éviter
          </span>
          <h2 id="common-mistakes-title" className="text-3xl md:text-4xl font-bold text-blue-ink mb-4">
            Les erreurs qui coûtent cher
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Apprenez des erreurs les plus courantes observées par Laurent Serre chez ses clients PME. 
            Chaque piège est accompagné de ses conséquences réelles et de la solution éprouvée pour l'éviter.
          </p>
        </div>
      </AnimatedSection>

      {/* Warning banner */}
      <AnimatedSection animation="slide-up" delay={100}>
        <div className="mb-8 p-6 bg-gradient-to-r from-red-100 to-orange-100 border-l-4 border-red-500 rounded-r-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="text-2xl">🎯</div>
            <div>
              <h3 className="font-bold text-red-800 mb-2">
                Attention : Ces erreurs peuvent détruire votre crédibilité en quelques secondes
              </h3>
              <p className="text-red-700 text-sm">
                Chris Voss le répète : "En négociation, une seule erreur peut annuler des heures de préparation." 
                Ces pièges sont tirés de l'analyse de 500+ négociations PME réelles.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Mistakes grid */}
      <div className="space-y-6">
        {mistakes.map((mistake, index) => {
          const colors = getSeverityColor(index);
          const isExpanded = expandedMistake === index;
          
          return (
            <AnimatedSection key={index} animation="slide-up" delay={200 + index * 100}>
              <div className={`
                ${colors.bg} ${colors.border} border-2 rounded-2xl shadow-lg 
                transition-all duration-300 hover:shadow-xl
                ${isExpanded ? 'ring-2 ring-red-300' : ''}
              `}>
                {/* Mistake header */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleMistake(index)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={`mistake-${index}-content`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleMistake(index);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl flex-shrink-0 mt-1">
                      {getMistakeIcon(index)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-bold ${colors.text} text-lg`}>
                          Piège #{index + 1}
                        </h3>
                        <div className={`
                          w-6 h-6 rounded-full ${colors.accent} flex items-center justify-center
                          transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}
                        `}>
                          <span className="text-sm">▼</span>
                        </div>
                      </div>
                      <p className={`${colors.text} font-medium leading-relaxed`}>
                        {mistake.mistake}
                      </p>
                      
                      {/* Quick preview when collapsed */}
                      {!isExpanded && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs bg-white/60 px-2 py-1 rounded-full font-medium">
                            💥 Conséquence grave
                          </span>
                          <span className="text-xs bg-white/60 px-2 py-1 rounded-full font-medium">
                            ✅ Solution disponible
                          </span>
                          <span className={`text-xs ${colors.accent} font-medium`}>
                            Cliquer pour voir les détails →
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div id={`mistake-${index}-content`} className="px-6 pb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Consequence */}
                      <div className="bg-white/70 rounded-xl p-5 border border-red-200">
                        <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                          <span>💥</span>
                          Conséquences observées
                        </h4>
                        <p className="text-gray-800 leading-relaxed text-sm">
                          {mistake.consequence}
                        </p>
                        
                        {/* Impact metrics */}
                        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="text-xs font-semibold text-red-600 mb-2">
                            Impact mesuré chez nos clients PME :
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-red-700">
                              📉 Perte de crédibilité : <span className="font-bold">Immédiate</span>
                            </div>
                            <div className="text-red-700">
                              💰 Impact marge : <span className="font-bold">-15 à -30%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Solution */}
                      <div className="bg-white/70 rounded-xl p-5 border border-mint-green">
                        <h4 className="font-bold text-mint-green mb-3 flex items-center gap-2">
                          <span>✅</span>
                          Solution Laurent Serre
                        </h4>
                        <p className="text-gray-800 leading-relaxed text-sm mb-4">
                          {mistake.solution}
                        </p>
                        
                        {/* Action steps */}
                        <div className="bg-mint-green/10 rounded-lg p-3 border border-mint-green/30">
                          <div className="text-xs font-semibold text-mint-green mb-2">
                            🎯 Action immédiate :
                          </div>
                          <div className="text-xs text-gray-700">
                            Pratiquez cette correction lors de votre prochaine négociation et mesurez la différence.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Memory aid */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                        <span>🧠</span>
                        Aide-mémoire pour retenir
                      </h4>
                      <p className="text-blue-700 text-sm italic">
                        "Quand je sens que je vais {mistake.mistake.toLowerCase()}, 
                        je me rappelle : {mistake.solution.split('.')[0]}."
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Summary and prevention tips */}
      <AnimatedSection animation="fade-in" delay={600}>
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200 shadow-lg">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-blue-ink mb-4">
              🛡️ Système de prévention Laurent Serre
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Pour éviter ces pièges, adoptez cette routine avant chaque négociation importante :
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/60 rounded-xl border border-blue-200">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold text-blue-ink mb-2">Préparation mentale</h4>
              <p className="text-sm text-gray-700">
                Répétez 3x : "Un bon accord ne peut pas naître d'un mauvais compromis"
              </p>
            </div>
            
            <div className="text-center p-4 bg-white/60 rounded-xl border border-blue-200">
              <div className="text-3xl mb-3">📋</div>
              <h4 className="font-bold text-blue-ink mb-2">Checklist anti-pièges</h4>
              <p className="text-sm text-gray-700">
                Vérifiez vos 5 alternatives créatives et votre prix plancher
              </p>
            </div>
            
            <div className="text-center p-4 bg-white/60 rounded-xl border border-blue-200">
              <div className="text-3xl mb-3">🤝</div>
              <h4 className="font-bold text-blue-ink mb-2">Empathie tactique</h4>
              <p className="text-sm text-gray-700">
                Préparez 3 phrases d'empathie : "Je comprends que...", "Je vois que..."
              </p>
            </div>
          </div>

          {/* Toggle for showing all solutions */}
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllSolutions(!showAllSolutions)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              {showAllSolutions ? '📖 Masquer' : '📚 Voir toutes les solutions'} en un coup d'œil
            </button>
          </div>

          {/* All solutions summary */}
          {showAllSolutions && (
            <div className="mt-6 p-6 bg-white/80 rounded-xl border border-blue-300">
              <h4 className="font-bold text-blue-ink mb-4 text-center">
                📝 Résumé des solutions - À imprimer et garder sous la main
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {mistakes.map((mistake, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-semibold text-blue-800 text-sm mb-1">
                      Piège #{index + 1} : {mistake.mistake.substring(0, 50)}...
                    </div>
                    <div className="text-xs text-blue-700">
                      💡 {mistake.solution.substring(0, 100)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Call to action */}
      <AnimatedSection animation="fade-in" delay={700}>
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
          <h3 className="text-xl font-bold text-blue-ink mb-4">
            Ne laissez plus ces erreurs saborder vos négociations
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Téléchargez le guide complet "Éviter les 6 pièges mortels en négociation" 
            avec des exercices pratiques pour automatiser les bonnes réactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/formation-commerciale-pme"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-center"
            >
              🎯 Formation personnalisée
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default CommonMistakes;