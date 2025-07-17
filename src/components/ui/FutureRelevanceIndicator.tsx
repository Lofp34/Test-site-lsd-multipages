import React, { memo, useMemo } from 'react';

interface FutureRelevanceIndicatorProps {
  relevanceScore: number; // Score from 1 to 5
  timeHorizon?: string; // e.g., "2025-2030", "Long terme"
  trend?: 'rising' | 'stable' | 'declining';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FutureRelevanceIndicator: React.FC<FutureRelevanceIndicatorProps> = memo(({
  relevanceScore,
  timeHorizon = "2025+",
  trend = 'stable',
  showLabel = true,
  size = 'md',
  className = ''
}) => {
  // Clamp score between 1 and 5
  const score = Math.max(1, Math.min(5, relevanceScore));
  
  // Memoize configurations for better performance
  const relevanceConfig = useMemo(() => {
    if (score >= 4.5) {
      return {
        level: 'Critique',
        color: 'from-green-400 to-emerald-500',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-800 dark:text-green-300',
        borderColor: 'border-green-200 dark:border-green-700',
        icon: '🚀',
        description: 'Indispensable pour l\'avenir'
      };
    } else if (score >= 3.5) {
      return {
        level: 'Élevée',
        color: 'from-blue-400 to-cyan-500',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-800 dark:text-blue-300',
        borderColor: 'border-blue-200 dark:border-blue-700',
        icon: '⭐',
        description: 'Très pertinent à long terme'
      };
    } else if (score >= 2.5) {
      return {
        level: 'Modérée',
        color: 'from-orange-400 to-yellow-500',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        textColor: 'text-orange-800 dark:text-orange-300',
        borderColor: 'border-orange-200 dark:border-orange-700',
        icon: '📊',
        description: 'Pertinence moyenne'
      };
    } else if (score >= 1.5) {
      return {
        level: 'Limitée',
        color: 'from-gray-400 to-gray-500',
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        textColor: 'text-gray-700 dark:text-gray-300',
        borderColor: 'border-gray-200 dark:border-gray-600',
        icon: '⚠️',
        description: 'Pertinence décroissante'
      };
    } else {
      return {
        level: 'Faible',
        color: 'from-red-400 to-red-500',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-800 dark:text-red-300',
        borderColor: 'border-red-200 dark:border-red-700',
        icon: '📉',
        description: 'Peu pertinent à l\'avenir'
      };
    }
  }, [score]);

  const trendConfig = useMemo(() => {
    switch (trend) {
      case 'rising':
        return {
          icon: '📈',
          color: 'text-green-600 dark:text-green-400',
          label: 'En hausse'
        };
      case 'declining':
        return {
          icon: '📉',
          color: 'text-red-600 dark:text-red-400',
          label: 'En baisse'
        };
      case 'stable':
      default:
        return {
          icon: '➡️',
          color: 'text-blue-600 dark:text-blue-400',
          label: 'Stable'
        };
    }
  }, [trend]);

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'p-3',
      title: 'text-sm',
      score: 'text-lg',
      description: 'text-xs',
      badge: 'px-2 py-1 text-xs'
    },
    md: {
      container: 'p-4',
      title: 'text-base',
      score: 'text-xl',
      description: 'text-sm',
      badge: 'px-3 py-1 text-sm'
    },
    lg: {
      container: 'p-6',
      title: 'text-lg',
      score: 'text-2xl',
      description: 'text-base',
      badge: 'px-4 py-2 text-base'
    }
  };

  const sizeClasses = sizeConfig[size];

  return (
    <div className={`
      bg-white/90 dark:bg-blue-ink/90 
      border ${relevanceConfig.borderColor}
      rounded-2xl ${sizeClasses.container} shadow-lg hover:shadow-xl 
      transition-all duration-300 backdrop-blur-sm
      ${className}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{relevanceConfig.icon}</span>
          {showLabel && (
            <h4 className={`font-semibold text-blue-ink dark:text-mint-green ${sizeClasses.title}`}>
              Pertinence Future
            </h4>
          )}
        </div>
        
        {/* Time horizon badge */}
        <span className={`
          inline-flex items-center rounded-full font-medium
          bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300
          border border-cyan-200 dark:border-cyan-700
          ${sizeClasses.badge}
        `}>
          {timeHorizon}
        </span>
      </div>

      {/* Score visualization */}
      <div className="flex items-center gap-4 mb-3">
        {/* Circular progress */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div className={`
              w-12 h-12 rounded-full bg-gradient-to-br ${relevanceConfig.color}
              flex items-center justify-center text-white font-bold ${sizeClasses.score}
            `}>
              {score.toFixed(1)}
            </div>
          </div>
          
          {/* Progress ring */}
          <svg className="absolute top-0 left-0 w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${(score / 5) * 175.93} 175.93`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`stop-color-green-400`} />
                <stop offset="100%" className={`stop-color-emerald-500`} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Level and description */}
        <div className="flex-1">
          <div className={`
            inline-flex items-center gap-1 rounded-full font-medium border
            ${relevanceConfig.bgColor} ${relevanceConfig.textColor} ${relevanceConfig.borderColor}
            ${sizeClasses.badge}
          `}>
            {relevanceConfig.level}
          </div>
          
          <p className={`mt-2 ${relevanceConfig.textColor} ${sizeClasses.description}`}>
            {relevanceConfig.description}
          </p>
        </div>
      </div>

      {/* Trend indicator */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm">{trendConfig.icon}</span>
          <span className={`${sizeClasses.description} font-medium ${trendConfig.color}`}>
            Tendance: {trendConfig.label}
          </span>
        </div>
        
        {/* Stars visualization */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-sm transition-colors ${
                star <= score 
                  ? 'text-yellow-400' 
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            >
              ⭐
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

FutureRelevanceIndicator.displayName = 'FutureRelevanceIndicator';

export default FutureRelevanceIndicator;