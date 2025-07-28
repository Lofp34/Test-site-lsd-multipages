'use client';

import React, { useState, useEffect } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface ROIData {
  investment: number;
  returns: number;
  timeframe: string;
  currency?: string;
  description?: string;
}

interface ROIIndicatorProps {
  data: ROIData;
  showBreakdown?: boolean;
  showProjection?: boolean;
  className?: string;
}

interface ROIBreakdownProps {
  investment: number;
  returns: number;
  currency: string;
}

const ROIBreakdown: React.FC<ROIBreakdownProps> = ({ investment, returns, currency }) => {
  const profit = returns - investment;
  const roiPercentage = ((profit / investment) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Investissement */}
        <div className="bg-red-50/50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
          <div className="text-sm text-red-600 font-medium mb-1">Investissement</div>
          <div className="text-xl font-bold text-red-700">
            {investment.toLocaleString()} {currency}
          </div>
        </div>

        {/* Retours */}
        <div className="bg-green-50/50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
          <div className="text-sm text-green-600 font-medium mb-1">Retours</div>
          <div className="text-xl font-bold text-green-700">
            {returns.toLocaleString()} {currency}
          </div>
        </div>
      </div>

      {/* Profit net */}
      <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
        <div className="text-sm text-blue-600 font-medium mb-1">Profit net</div>
        <div className="text-2xl font-bold text-blue-700">
          +{profit.toLocaleString()} {currency}
        </div>
        <div className="text-sm text-blue-600 mt-1">
          Soit {roiPercentage.toFixed(1)}% de ROI
        </div>
      </div>
    </div>
  );
};

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#DC2626',
  backgroundColor = '#E5E7EB'
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(Math.min(percentage, 100));
    }, 500);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {Math.round(animatedPercentage)}%
        </span>
      </div>
    </div>
  );
};

const ROIIndicator: React.FC<ROIIndicatorProps> = ({
  data,
  showBreakdown = true,
  showProjection = false,
  className = ''
}) => {
  const { investment, returns, timeframe, currency = '€', description } = data;
  const profit = returns - investment;
  const roiPercentage = ((profit / investment) * 100);
  
  // Calcul de projections (exemple sur 12 mois)
  const monthlyROI = roiPercentage / (timeframe.includes('mois') ? parseInt(timeframe) : 12);
  const yearlyProjection = investment * (1 + (monthlyROI / 100) * 12);

  return (
    <div className={`bg-white/80 dark:bg-blue-ink/80 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h4 className="text-xl font-bold text-blue-ink dark:text-white mb-2">
          Retour sur Investissement (ROI)
        </h4>
        {description && (
          <p className="text-sm text-primary-secondary/80">
            {description}
          </p>
        )}
      </div>

      {/* ROI principal avec graphique circulaire */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
        <div className="flex-shrink-0">
          <CircularProgress 
            percentage={Math.min(roiPercentage, 300)} // Cap à 300% pour l'affichage
            color="#DC2626"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
            {roiPercentage.toFixed(1)}%
          </div>
          <div className="text-lg text-primary-secondary/90 mb-1">
            de retour sur investissement
          </div>
          <div className="text-sm text-primary-secondary/70">
            sur {timeframe}
          </div>
          
          {/* Indicateur de performance */}
          <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-sm font-medium ${
            roiPercentage >= 200 
              ? 'bg-green-100 text-green-800' 
              : roiPercentage >= 100 
                ? 'bg-blue-100 text-blue-800'
                : 'bg-orange-100 text-orange-800'
          }`}>
            <span>
              {roiPercentage >= 200 ? '🚀' : roiPercentage >= 100 ? '📈' : '⚡'}
            </span>
            {roiPercentage >= 200 
              ? 'ROI Exceptionnel' 
              : roiPercentage >= 100 
                ? 'ROI Excellent'
                : 'ROI Positif'
            }
          </div>
        </div>
      </div>

      {/* Détail des calculs */}
      {showBreakdown && (
        <ROIBreakdown 
          investment={investment}
          returns={returns}
          currency={currency}
        />
      )}

      {/* Projections */}
      {showProjection && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200/50">
          <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
            📊 Projection annuelle
          </h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-600">ROI mensuel moyen :</span>
              <div className="font-bold text-blue-800">
                {monthlyROI.toFixed(1)}%
              </div>
            </div>
            <div>
              <span className="text-blue-600">Projection 12 mois :</span>
              <div className="font-bold text-blue-800">
                {yearlyProjection.toLocaleString()} {currency}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to action */}
      <div className="mt-6 text-center">
        <div className="text-sm text-primary-secondary/80 mb-3">
          Résultats basés sur l'accompagnement Laurent Serre
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/diagnostic"
            className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            <span className="mr-2">🎯</span>
            Calculer votre ROI
          </a>
          <a
            href="/formation-commerciale-pme"
            className="inline-flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm text-red-600 text-sm font-medium rounded-lg border border-red-500/30 hover:bg-red-50/50 transition-colors"
          >
            <span className="mr-2">🚀</span>
            Démarrer maintenant
          </a>
        </div>
      </div>
    </div>
  );
};

export default ROIIndicator;