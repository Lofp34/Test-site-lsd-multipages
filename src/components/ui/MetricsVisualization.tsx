'use client';

import React, { useState, useEffect } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface MetricData {
  label: string;
  value: string;
  previousValue?: string;
  improvement?: string;
  color?: string;
  icon?: string;
  description?: string;
}

interface MetricsVisualizationProps {
  title: string;
  subtitle?: string;
  metrics: MetricData[];
  showComparison?: boolean;
  showAnimatedCounters?: boolean;
  layout?: 'grid' | 'horizontal' | 'vertical';
  className?: string;
}

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  color?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2000,
  color = '#DC2626' 
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${value}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!isVisible) return;

    // Extraire le nombre de la chaîne
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
    const suffix = value.replace(/[\d.]/g, '');
    
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentValue = Math.floor(numericValue * progress);
      setDisplayValue(currentValue + suffix);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <span 
      id={`counter-${value}`}
      className="font-bold text-2xl md:text-3xl transition-all duration-300"
      style={{ color }}
    >
      {displayValue}
    </span>
  );
};

interface ProgressBarProps {
  percentage: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  color = '#DC2626',
  height = 'h-2',
  showLabel = true 
}) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(percentage);
    }, 500);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${animatedWidth}%`,
            backgroundColor: color
          }}
        />
      </div>
      {showLabel && (
        <div className="text-xs text-gray-600 mt-1 text-right">
          {percentage}%
        </div>
      )}
    </div>
  );
};

interface ComparisonCardProps {
  metric: MetricData;
  showComparison: boolean;
  showAnimatedCounters: boolean;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ 
  metric, 
  showComparison, 
  showAnimatedCounters 
}) => {
  const hasImprovement = metric.improvement && metric.previousValue;
  const improvementValue = hasImprovement ? parseFloat(metric.improvement!.replace(/[^\d.-]/g, '')) : 0;
  const isPositiveImprovement = improvementValue > 0;

  return (
    <div className="bg-white/80 dark:bg-blue-ink/80 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
      {/* Icon et titre */}
      <div className="flex items-center gap-3 mb-4">
        {metric.icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">{metric.icon}</span>
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-blue-ink dark:text-white text-lg">
            {metric.label}
          </h4>
          {metric.description && (
            <p className="text-sm text-primary-secondary/70">
              {metric.description}
            </p>
          )}
        </div>
      </div>

      {/* Valeur principale */}
      <div className="mb-4">
        {showAnimatedCounters ? (
          <AnimatedCounter 
            value={metric.value} 
            color={metric.color || '#DC2626'} 
          />
        ) : (
          <span 
            className="font-bold text-2xl md:text-3xl"
            style={{ color: metric.color || '#DC2626' }}
          >
            {metric.value}
          </span>
        )}
      </div>

      {/* Comparaison avant/après */}
      {showComparison && hasImprovement && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Avant :</span>
            <span className="font-medium text-gray-800">{metric.previousValue}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Après :</span>
            <span className="font-medium" style={{ color: metric.color || '#DC2626' }}>
              {metric.value}
            </span>
          </div>

          {/* Indicateur d'amélioration */}
          <div className={`flex items-center gap-2 p-2 rounded-lg ${
            isPositiveImprovement 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            <span className="text-lg">
              {isPositiveImprovement ? '📈' : '📉'}
            </span>
            <span className="font-semibold">
              {isPositiveImprovement ? '+' : ''}{metric.improvement}
            </span>
            <span className="text-xs">
              {isPositiveImprovement ? 'amélioration' : 'diminution'}
            </span>
          </div>

          {/* Barre de progression pour les pourcentages */}
          {metric.value.includes('%') && (
            <div className="mt-3">
              <ProgressBar 
                percentage={parseFloat(metric.value.replace('%', ''))}
                color={metric.color || '#DC2626'}
              />
            </div>
          )}
        </div>
      )}

      {/* Barre de progression simple si pas de comparaison */}
      {!showComparison && metric.value.includes('%') && (
        <div className="mt-3">
          <ProgressBar 
            percentage={parseFloat(metric.value.replace('%', ''))}
            color={metric.color || '#DC2626'}
          />
        </div>
      )}
    </div>
  );
};

const MetricsVisualization: React.FC<MetricsVisualizationProps> = ({
  title,
  subtitle,
  metrics,
  showComparison = false,
  showAnimatedCounters = true,
  layout = 'grid',
  className = ''
}) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap gap-4';
      case 'vertical':
        return 'flex flex-col gap-4';
      case 'grid':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-primary-title mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-primary-secondary/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Métriques */}
      <div className={getLayoutClasses()}>
        {metrics.map((metric, index) => (
          <AnimatedSection key={index} delay={100 + index * 50}>
            <ComparisonCard 
              metric={metric}
              showComparison={showComparison}
              showAnimatedCounters={showAnimatedCounters}
            />
          </AnimatedSection>
        ))}
      </div>

      {/* Résumé global si comparaison activée */}
      {showComparison && (
        <AnimatedSection delay={400}>
          <div className="mt-8 p-6 bg-gradient-to-r from-red-600/10 to-orange-500/10 rounded-2xl border border-red-500/20 backdrop-blur-sm">
            <div className="text-center">
              <h4 className="text-xl font-bold text-red-600 mb-2">
                Impact global de la technique
              </h4>
              <p className="text-primary-secondary/90 mb-4">
                Résultats moyens observés sur {metrics.length} indicateurs clés de performance
              </p>
              
              {/* Calcul de l'amélioration moyenne */}
              <div className="flex justify-center items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    +{Math.round(metrics
                      .filter(m => m.improvement)
                      .reduce((acc, m) => acc + parseFloat(m.improvement!.replace(/[^\d.-]/g, '')), 0) / 
                      metrics.filter(m => m.improvement).length
                    )}%
                  </div>
                  <div className="text-sm text-gray-600">Amélioration moyenne</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {metrics.filter(m => m.improvement && parseFloat(m.improvement.replace(/[^\d.-]/g, '')) > 0).length}/{metrics.length}
                  </div>
                  <div className="text-sm text-gray-600">Indicateurs améliorés</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
};

export default MetricsVisualization;