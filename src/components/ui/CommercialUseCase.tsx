import React, { memo, useMemo } from 'react';

interface CommercialUseCaseProps {
  useCase: string;
  tools: string[];
  roi: string;
  difficulty: string;
  className?: string;
}

const CommercialUseCase: React.FC<CommercialUseCaseProps> = memo(({
  useCase,
  tools,
  roi,
  difficulty,
  className = ''
}) => {
  // Memoize difficulty styling for better performance
  const difficultyStyle = useMemo(() => {
    const normalizedLevel = difficulty.toLowerCase();
    
    if (normalizedLevel.includes('facile') || normalizedLevel.includes('simple')) {
      return {
        color: 'text-green-600
        bg: 'bg-green-100
        border: 'border-green-200
        icon: '✅'
      };
    } else if (normalizedLevel.includes('moyen') || normalizedLevel.includes('intermédiaire')) {
      return {
        color: 'text-orange-600
        bg: 'bg-orange-100
        border: 'border-orange-200
        icon: '⚠️'
      };
    } else if (normalizedLevel.includes('difficile') || normalizedLevel.includes('complexe') || normalizedLevel.includes('avancé')) {
      return {
        color: 'text-red-600
        bg: 'bg-red-100
        border: 'border-red-200
        icon: '🔥'
      };
    }
    
    return {
      color: 'text-gray-600
      bg: 'bg-gray-100
      border: 'border-gray-200
      icon: '📊'
    };
  }, [difficulty]);

  return (
    <div className={`
      bg-white/90 
      border border-mint-green/30
      rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300
      backdrop-blur-sm hover:scale-[1.02]
      ${className}
    `}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-mint-green to-teal-500 rounded-xl 
                          flex items-center justify-center text-white text-xl shadow-md">
            💡
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-blue-ink mb-2 leading-tight">
            {useCase}
          </h3>
        </div>
      </div>

      {/* Tools section */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-blue-ink mb-3 flex items-center gap-2">
          <span className="text-base">🛠️</span>
          Outils recommandés
        </h4>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1.5 bg-cyan-100 
                         text-cyan-800 text-sm font-medium rounded-full
                         border border-cyan-200
                         hover:bg-cyan-200 transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* ROI and Difficulty section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ROI */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 
                        rounded-xl p-4 border border-green-200
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg 
                              flex items-center justify-center text-white text-sm">
                📈
              </div>
            </div>
            
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-green-700 mb-1">
                ROI Attendu
              </h5>
              <p className="text-sm text-green-600 font-medium">
                {roi}
              </p>
            </div>
          </div>
        </div>

        {/* Difficulty */}
        <div className={`
          rounded-xl p-4 border
          ${difficultyStyle.bg} ${difficultyStyle.border}
        `}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-400 rounded-lg 
                              flex items-center justify-center text-white text-sm">
                {difficultyStyle.icon}
              </div>
            </div>
            
            <div className="flex-1">
              <h5 className={`text-sm font-semibold mb-1 ${difficultyStyle.color}`}>
                Complexité
              </h5>
              <p className={`text-sm font-medium ${difficultyStyle.color}`}>
                {difficulty}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-mint-green/20 to-cyan-400/20 
                      rounded-full blur-2xl opacity-50 -z-10"></div>
    </div>
  );
});

CommercialUseCase.displayName = 'CommercialUseCase';

export default CommercialUseCase;