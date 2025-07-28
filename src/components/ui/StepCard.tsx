import React from 'react';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  script?: string;
  example?: string;
  tips?: string[];
  className?: string;
  onComplete?: () => void;
  isCompleted?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  title,
  description,
  script,
  example,
  tips,
  className = '',
  onComplete,
  isCompleted = false
}) => {
  const cardClasses = `bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border transition-all duration-300 group relative ${
    isCompleted 
      ? 'border-mint-green/50 bg-mint-green/5' 
      : 'border-red-200/50 hover:shadow-2xl hover:border-red-300/70'
  } ${className}`;

  const numberClasses = `w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 ${
    isCompleted 
      ? 'bg-gradient-to-br from-mint-green to-mint-green/80' 
      : 'bg-gradient-to-br from-red-600 to-orange-500'
  }`;

  return (
    <div className={cardClasses}>
      {/* Completion indicator */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-mint-green rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-xs">✓</span>
        </div>
      )}

      <div className="p-6">
        {/* Step number and title */}
        <div className="flex items-center gap-4 mb-4">
          <div className={numberClasses}>
            {isCompleted ? '✓' : stepNumber}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-ink">
              {title}
            </h3>
            {isCompleted && (
              <div className="text-sm text-mint-green font-medium">
                ✅ Étape complétée
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-4">
          {description}
        </p>

        {/* Script section */}
        {script && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-2">
              <span>💬</span>
              Script recommandé
            </h4>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-gray-800 italic">
                "{script}"
              </p>
            </div>
          </div>
        )}

        {/* Example section */}
        {example && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-orange-600 mb-2 flex items-center gap-2">
              <span>💡</span>
              Exemple concret
            </h4>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-gray-800">
                {example}
              </p>
            </div>
          </div>
        )}

        {/* Tips section */}
        {tips && tips.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-blue-ink mb-2 flex items-center gap-2">
              <span>🎯</span>
              Conseils pratiques
            </h4>
            <ul className="space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-mint-green text-sm mt-1">•</span>
                  <span className="text-gray-700 text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepCard;