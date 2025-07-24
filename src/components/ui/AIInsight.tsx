import React from 'react';
import AIIcon from './AIIcon';

interface AIInsightProps {
  title: string;
  description: string;
  businessImpact: string;
  implementationLevel: 'Débutant' | 'Intermédiaire' | 'Avancé';
  technologies?: string[];
  trend?: 'rising' | 'stable' | 'declining';
  className?: string;
}

const AIInsight: React.FC<AIInsightProps> = ({
  title,
  description,
  businessImpact,
  implementationLevel,
  technologies = [],
  trend = 'stable',
  className = ''
}) => {
  // Get implementation level styling
  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'Débutant':
        return {
          color: 'from-green-400 to-emerald-500',
          bgColor: 'bg-green-100
          textColor: 'text-green-800
          borderColor: 'border-green-200
          icon: '🟢'
        };
      case 'Intermédiaire':
        return {
          color: 'from-orange-400 to-yellow-500',
          bgColor: 'bg-orange-100
          textColor: 'text-orange-800
          borderColor: 'border-orange-200
          icon: '🟡'
        };
      case 'Avancé':
        return {
          color: 'from-red-400 to-pink-500',
          bgColor: 'bg-red-100
          textColor: 'text-red-800
          borderColor: 'border-red-200
          icon: '🔴'
        };
      default:
        return {
          color: 'from-gray-400 to-gray-500',
          bgColor: 'bg-gray-100
          textColor: 'text-gray-700
          borderColor: 'border-gray-200
          icon: '⚪'
        };
    }
  };

  // Get trend styling
  const getTrendConfig = (trend: string) => {
    switch (trend) {
      case 'rising':
        return {
          icon: '📈',
          color: 'text-green-600
          label: 'Tendance croissante'
        };
      case 'declining':
        return {
          icon: '📉',
          color: 'text-red-600
          label: 'Tendance décroissante'
        };
      case 'stable':
      default:
        return {
          icon: '➡️',
          color: 'text-blue-600
          label: 'Tendance stable'
        };
    }
  };

  const levelConfig = getLevelConfig(implementationLevel);
  const trendConfig = getTrendConfig(trend);

  return (
    <div className={`
      relative bg-white/90 
      border border-cyan-400/30
      rounded-2xl p-6 shadow-lg hover:shadow-2xl 
      transition-all duration-500 backdrop-blur-sm
      hover:scale-[1.02] hover:border-cyan-400/50
      overflow-hidden group
      ${className}
    `}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating particles effect */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
      <div className="absolute top-6 right-6 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
      <div className="absolute top-4 right-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-700"></div>

      {/* Header */}
      <div className="relative flex items-start gap-4 mb-5">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl 
                          flex items-center justify-center shadow-lg group-hover:shadow-cyan-400/25 
                          transition-all duration-300 group-hover:scale-110">
            <AIIcon type="brain" size="lg" color="white" animated />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-blue-ink leading-tight">
              {title}
            </h3>
            <span className={`text-sm ${trendConfig.color}`}>
              {trendConfig.icon}
            </span>
          </div>
          
          {/* Implementation level badge */}
          <div className={`
            inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border
            ${levelConfig.bgColor} ${levelConfig.textColor} ${levelConfig.borderColor}
          `}>
            <span>{levelConfig.icon}</span>
            {implementationLevel}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="relative mb-5">
        <p className="text-gray-700 leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Business impact section */}
        <div className="bg-gradient-to-r from-mint-green/10 to-cyan-400/10 rounded-xl p-4 
                        border border-mint-green/20
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-mint-green to-teal-500 rounded-lg 
                              flex items-center justify-center">
                <AIIcon type="data" size="sm" color="white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-mint-green mb-1">
                Impact Business
              </h4>
              <p className="text-sm text-gray-700
                {businessImpact}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies */}
      {technologies.length > 0 && (
        <div className="relative mb-4">
          <h4 className="text-sm font-semibold text-blue-ink mb-3 flex items-center gap-2">
            <AIIcon type="circuit" size="sm" />
            Technologies clés
          </h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 
                           bg-gradient-to-r from-blue-100 to-cyan-100 
                          
                           text-blue-800 
                           text-xs font-medium rounded-full
                           border border-blue-200
                           hover:from-blue-200 hover:to-cyan-200
                          
                           transition-all duration-200 hover:scale-105"
              >
                <AIIcon type="automation" size="sm" className="mr-1" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Trend indicator */}
      <div className="relative flex items-center justify-between pt-4 border-t border-gray-200
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${trendConfig.color}`}>
            {trendConfig.label}
          </span>
        </div>
        
        {/* Animated progress bar */}
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className={`
              h-full bg-gradient-to-r ${levelConfig.color} rounded-full
              transition-all duration-1000 group-hover:animate-pulse
            `} style={{ 
              width: implementationLevel === 'Débutant' ? '33%' : 
                     implementationLevel === 'Intermédiaire' ? '66%' : '100%' 
            }}></div>
          </div>
          <AIIcon type="future" size="sm" className="text-cyan-400" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 
                      rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-500/20 
                      rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  );
};

export default AIInsight;