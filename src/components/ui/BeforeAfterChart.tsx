'use client';

import React, { useState, useEffect } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface BeforeAfterData {
  label: string;
  before: number;
  after: number;
  unit?: string;
  color?: string;
  icon?: string;
}

interface BeforeAfterChartProps {
  title: string;
  subtitle?: string;
  data: BeforeAfterData[];
  showPercentageImprovement?: boolean;
  className?: string;
}

interface BarChartProps {
  data: BeforeAfterData;
  maxValue: number;
  showPercentageImprovement: boolean;
  index: number;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  maxValue, 
  showPercentageImprovement,
  index 
}) => {
  const [animatedBefore, setAnimatedBefore] = useState(0);
  const [animatedAfter, setAnimatedAfter] = useState(0);
  
  const beforePercentage = (data.before / maxValue) * 100;
  const afterPercentage = (data.after / maxValue) * 100;
  const improvement = ((data.after - data.before) / data.before) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedBefore(beforePercentage);
      setAnimatedAfter(afterPercentage);
    }, 200 + index * 100);

    return () => clearTimeout(timer);
  }, [beforePercentage, afterPercentage, index]);

  return (
    <div className="bg-white/80 dark:bg-blue-ink/80 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {data.icon && (
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-lg">{data.icon}</span>
          </div>
        )}
        <div>
          <h4 className="font-semibold text-blue-ink dark:text-white">
            {data.label}
          </h4>
          {showPercentageImprovement && (
            <div className={`text-sm font-medium ${
              improvement > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}% d'amélioration
            </div>
          )}
        </div>
      </div>

      {/* Graphique en barres */}
      <div className="space-y-4">
        {/* Avant */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Avant</span>
            <span className="text-sm font-medium text-gray-800">
              {data.before}{data.unit || ''}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gray-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${animatedBefore}%` }}
            />
          </div>
        </div>

        {/* Après */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-red-600 font-medium">Après</span>
            <span className="text-sm font-bold text-red-600">
              {data.after}{data.unit || ''}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${animatedAfter}%`,
                backgroundColor: data.color || '#DC2626'
              }}
            />
          </div>
        </div>
      </div>

      {/* Indicateur d'amélioration */}
      <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
        improvement > 0 
          ? 'bg-green-50 text-green-700 border border-green-200' 
          : 'bg-red-50 text-red-700 border border-red-200'
      }`}>
        <span className="text-lg">
          {improvement > 0 ? '📈' : '📉'}
        </span>
        <div>
          <div className="font-semibold">
            {improvement > 0 ? 'Amélioration' : 'Diminution'} de {Math.abs(improvement).toFixed(1)}%
          </div>
          <div className="text-xs opacity-80">
            Différence: {improvement > 0 ? '+' : ''}{(data.after - data.before).toFixed(1)}{data.unit || ''}
          </div>
        </div>
      </div>
    </div>
  );
};

const BeforeAfterChart: React.FC<BeforeAfterChartProps> = ({
  title,
  subtitle,
  data,
  showPercentageImprovement = true,
  className = ''
}) => {
  // Calculer la valeur maximale pour normaliser les barres
  const maxValue = Math.max(...data.map(d => Math.max(d.before, d.after)));
  
  // Calculer les statistiques globales
  const totalImprovement = data.reduce((acc, d) => {
    const improvement = ((d.after - d.before) / d.before) * 100;
    return acc + improvement;
  }, 0) / data.length;

  const positiveImprovements = data.filter(d => d.after > d.before).length;

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-primary-title mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-primary-secondary/80 max-w-2xl mx-auto mb-4">
            {subtitle}
          </p>
        )}
        
        {/* Statistiques globales */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              +{totalImprovement.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Amélioration moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {positiveImprovements}/{data.length}
            </div>
            <div className="text-sm text-gray-600">Indicateurs améliorés</div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <AnimatedSection key={index} delay={100 + index * 50}>
            <BarChart 
              data={item}
              maxValue={maxValue}
              showPercentageImprovement={showPercentageImprovement}
              index={index}
            />
          </AnimatedSection>
        ))}
      </div>

      {/* Résumé des résultats */}
      <AnimatedSection delay={400}>
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl border border-green-200/50">
          <div className="text-center">
            <h4 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
              🎯 Impact de la technique "Ne jamais couper la poire en deux"
            </h4>
            <p className="text-green-600 dark:text-green-300 mb-4">
              Résultats mesurés sur {data.length} indicateurs clés de performance commerciale
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 dark:bg-blue-ink/50 rounded-lg p-3">
                <div className="font-semibold text-green-700">Efficacité prouvée</div>
                <div className="text-green-600">
                  {((positiveImprovements / data.length) * 100).toFixed(0)}% des métriques améliorées
                </div>
              </div>
              <div className="bg-white/50 dark:bg-blue-ink/50 rounded-lg p-3">
                <div className="font-semibold text-blue-700">Performance moyenne</div>
                <div className="text-blue-600">
                  +{totalImprovement.toFixed(1)}% d'amélioration globale
                </div>
              </div>
              <div className="bg-white/50 dark:bg-blue-ink/50 rounded-lg p-3">
                <div className="font-semibold text-red-700">ROI formation</div>
                <div className="text-red-600">
                  240% en moyenne sur 12 mois
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default BeforeAfterChart;