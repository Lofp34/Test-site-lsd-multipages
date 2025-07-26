'use client';

import React from 'react';

export interface DomainStatProps {
  label: string;
  value: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: string;
  tooltip?: string;
}

export interface DomainStatsProps {
  title: string;
  subtitle?: string;
  stats: DomainStatProps[];
  domainColor?: string;
  variant?: 'horizontal' | 'grid' | 'compact';
  animated?: boolean;
  showTrends?: boolean;
}

const DomainStats: React.FC<DomainStatsProps> = ({
  title,
  subtitle,
  stats,
  domainColor = "#00BDA4",
  variant = 'horizontal',
  animated = true,
  showTrends = true
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [animatedValues, setAnimatedValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    setIsVisible(true);
    if (animated) {
      // Initialize animated values
      setAnimatedValues(stats.map(() => '0'));
      
      // Animate to final values
      const timer = setTimeout(() => {
        setAnimatedValues(stats.map(stat => stat.value));
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [stats, animated]);

  const getGridClass = () => {
    switch (variant) {
      case 'grid':
        return 'grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4';
      case 'compact':
        return 'flex flex-wrap justify-center gap-4 sm:gap-6';
      default:
        return 'grid grid-cols-1 sm:grid-cols-3 gap-4';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '📊';
      default: return '';
    }
  };

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      case 'stable': return 'text-blue-500';
      default: return '';
    }
  };

  return (
    <div 
      className={`bg-white/90 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ borderColor: `${domainColor}20` }}
    >
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
          {title}
        </h4>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Stats Grid */}
      <div className={getGridClass()}>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`text-center group/stat relative ${
              variant === 'compact' ? 'min-w-[120px]' : ''
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Tooltip */}
            {stat.tooltip && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
                {stat.tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            )}

            {/* Icon */}
            {stat.icon && (
              <div className="text-lg sm:text-xl mb-1 group-hover/stat:animate-bounce">
                {stat.icon}
              </div>
            )}

            {/* Value with animation */}
            <div className="relative">
              <div 
                className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 transition-all duration-500 ${
                  animated ? 'group-hover/stat:scale-110' : 'group-hover/stat:scale-105'
                }`}
                style={{ color: domainColor }}
              >
                {animated ? animatedValues[index] || stat.value : stat.value}
              </div>
              
              {/* Trend indicator */}
              {showTrends && stat.trend && (
                <div 
                  className={`absolute -top-1 -right-1 text-xs ${getTrendColor(stat.trend)} animate-pulse`}
                >
                  {getTrendIcon(stat.trend)}
                </div>
              )}
            </div>

            {/* Label */}
            <div className="text-xs sm:text-sm text-gray-600 font-medium leading-tight mb-1">
              {stat.label}
            </div>

            {/* Description */}
            {stat.description && (
              <div className="text-xs text-gray-500 leading-tight opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300">
                {stat.description}
              </div>
            )}

            {/* Hover effect background */}
            <div 
              className="absolute inset-0 rounded-lg opacity-0 group-hover/stat:opacity-5 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: domainColor }}
            />
          </div>
        ))}
      </div>

      {/* Animated progress bar at bottom */}
      {animated && (
        <div className="mt-4 sm:mt-6">
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                backgroundColor: domainColor,
                width: isVisible ? '100%' : '0%'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainStats;