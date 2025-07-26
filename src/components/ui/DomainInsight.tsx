import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Lightbulb, TrendingUp, HelpCircle, Target, Users, BookOpen } from 'lucide-react';
import AIIcon from '@/components/ui/AIIcon';
import { CategoryTheme } from '@/types/category-templates';

export interface DomainInsightProps {
  title: string;
  description: string;
  businessImpact: string;
  implementationLevel: 'Débutant' | 'Intermédiaire' | 'Avancé';
  keyElements?: string[];
  technologies?: string[];
  trend?: 'rising' | 'stable' | 'declining';
  metrics?: {
    label: string;
    value: string;
  }[];
  icon?: string;
  color?: string;
  domainTheme?: CategoryTheme;
  adaptiveColors?: boolean;
}

const DomainInsight: React.FC<DomainInsightProps> = ({
  title,
  description,
  businessImpact,
  implementationLevel,
  keyElements = [],
  technologies = [],
  trend = 'stable',
  metrics = [],
  icon = "💡",
  color = "#00BDA4",
  domainTheme,
  adaptiveColors = false
}) => {
  const effectiveColor = domainTheme?.primaryColor || color;
  const accentColor = domainTheme?.accentColor || domainTheme?.secondaryColor || effectiveColor;

  const getTrendIcon = () => {
    switch (trend) {
      case 'rising': return '📈';
      case 'stable': return '📊';
      case 'declining': return '📉';
      default: return '📊';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'rising': return 'text-green-600';
      case 'stable': return 'text-blue-600';
      case 'declining': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  const getLevelColor = () => {
    switch (implementationLevel) {
      case 'Débutant': return 'text-green-600 bg-green-50 border-green-200';
      case 'Intermédiaire': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Avancé': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-primary-secondary bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white/90 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200/50 backdrop-blur-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden">
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl"
        style={{ 
          background: `linear-gradient(135deg, ${effectiveColor}20, ${accentColor}10)` 
        }}
      />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-md transform group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: `${effectiveColor}20`, color: effectiveColor }}
          >
            {icon}
          </div>
          <div className="flex-1">
            <h4 
              className="font-bold text-base sm:text-lg text-primary-title group-hover:transition-colors duration-300"
              style={{ color: `var(--tw-text-opacity) && ${effectiveColor}` }}
            >
              {title}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getLevelColor()}`}>
                {implementationLevel}
              </span>
              <span className={`text-xs sm:text-sm flex items-center gap-1 ${getTrendColor()}`}>
                <span className="animate-pulse">{getTrendIcon()}</span>
                <span className="hidden sm:inline">Tendance</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-primary-secondary/90 leading-relaxed text-sm sm:text-base relative z-10">
        {description}
      </p>

      {/* Business Impact */}
      <div 
        className="rounded-lg p-3 sm:p-4 mb-4 border relative z-10 group/impact hover:shadow-md transition-shadow duration-300"
        style={{ 
          backgroundColor: `${effectiveColor}08`,
          borderColor: `${effectiveColor}30`
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span 
            className="font-semibold text-xs sm:text-sm flex items-center gap-1"
            style={{ color: effectiveColor }}
          >
            <span className="group-hover/impact:animate-bounce">📊</span>
            Impact Business
          </span>
        </div>
        <p 
          className="text-xs sm:text-sm font-medium leading-relaxed"
          style={{ color: `${effectiveColor}dd` }}
        >
          {businessImpact}
        </p>
      </div>

      {/* Technologies (if available) */}
      {technologies.length > 0 && (
        <div className="space-y-2 relative z-10 mb-4">
          <h5 className="font-semibold text-primary-title text-xs sm:text-sm mb-3 flex items-center gap-1">
            <span className="animate-pulse">⚙️</span>
            Technologies
          </h5>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs px-2 sm:px-3 py-1 rounded-full border hover:shadow-sm hover:scale-105 transition-all duration-200 cursor-default"
                style={{
                  backgroundColor: `${effectiveColor}15`,
                  borderColor: `${effectiveColor}40`,
                  color: effectiveColor,
                  animationDelay: `${index * 100}ms`
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Key Elements */}
      {keyElements.length > 0 && (
        <div className="space-y-2 relative z-10 mb-4">
          <h5 className="font-semibold text-primary-title text-xs sm:text-sm mb-3 flex items-center gap-1">
            <span className="animate-pulse">🔑</span>
            Éléments clés
          </h5>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {keyElements.map((element, index) => (
              <span
                key={index}
                className="text-xs px-2 sm:px-3 py-1 rounded-full bg-background/50 text-primary-secondary border border-gray-200 hover:shadow-sm hover:scale-105 transition-all duration-200 cursor-default"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {element}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Metrics (if available) */}
      {metrics.length > 0 && (
        <div className="space-y-2 relative z-10">
          <h5 className="font-semibold text-primary-title text-xs sm:text-sm mb-3 flex items-center gap-1">
            <span className="animate-pulse">📈</span>
            Métriques
          </h5>
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="text-center p-2 rounded-lg border"
                style={{
                  backgroundColor: `${effectiveColor}08`,
                  borderColor: `${effectiveColor}20`
                }}
              >
                <div 
                  className="text-sm font-bold"
                  style={{ color: effectiveColor }}
                >
                  {metric.value}
                </div>
                <div className="text-xs text-primary-secondary/70">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainInsight;