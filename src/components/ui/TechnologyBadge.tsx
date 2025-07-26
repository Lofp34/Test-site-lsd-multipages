import React, { memo, useMemo } from 'react';

interface TechnologyBadgeProps {
  technology: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const TechnologyBadge: React.FC<TechnologyBadgeProps> = memo(({
  technology,
  variant = 'primary',
  size = 'md',
  showIcon = true,
  className = ''
}) => {
  // Memoize technology configuration for better performance
  const config = useMemo(() => {
    const normalizedTech = technology.toLowerCase();
    
    // AI/Machine Learning technologies
    if (normalizedTech.includes('ia') || normalizedTech.includes('ai') || normalizedTech.includes('intelligence artificielle')) {
      return { icon: '🤖', color: 'cyan' };
    }
    if (normalizedTech.includes('machine learning') || normalizedTech.includes('ml') || normalizedTech.includes('apprentissage automatique')) {
      return { icon: '🧠', color: 'purple' };
    }
    if (normalizedTech.includes('deep learning') || normalizedTech.includes('réseaux de neurones')) {
      return { icon: '🔬', color: 'indigo' };
    }
    if (normalizedTech.includes('nlp') || normalizedTech.includes('traitement du langage')) {
      return { icon: '💬', color: 'blue' };
    }
    
    // Automation technologies
    if (normalizedTech.includes('automation') || normalizedTech.includes('automatisation')) {
      return { icon: '⚙️', color: 'orange' };
    }
    if (normalizedTech.includes('rpa') || normalizedTech.includes('robotic process')) {
      return { icon: '🤖', color: 'teal' };
    }
    if (normalizedTech.includes('workflow') || normalizedTech.includes('flux de travail')) {
      return { icon: '🔄', color: 'green' };
    }
    
    // Data technologies
    if (normalizedTech.includes('big data') || normalizedTech.includes('données massives')) {
      return { icon: '📊', color: 'emerald' };
    }
    if (normalizedTech.includes('analytics') || normalizedTech.includes('analyse')) {
      return { icon: '📈', color: 'blue' };
    }
    if (normalizedTech.includes('crm') || normalizedTech.includes('customer relationship')) {
      return { icon: '👥', color: 'teal' };
    }
    
    // Digital transformation
    if (normalizedTech.includes('digital') || normalizedTech.includes('numérique')) {
      return { icon: '💻', color: 'cyan' };
    }
    if (normalizedTech.includes('cloud') || normalizedTech.includes('nuage')) {
      return { icon: '☁️', color: 'sky' };
    }
    if (normalizedTech.includes('api') || normalizedTech.includes('intégration')) {
      return { icon: '🔗', color: 'gray' };
    }
    
    // Sales technologies
    if (normalizedTech.includes('sales tech') || normalizedTech.includes('vente digitale')) {
      return { icon: '💼', color: 'mint' };
    }
    if (normalizedTech.includes('prospection') || normalizedTech.includes('lead generation')) {
      return { icon: '🎯', color: 'red' };
    }
    
    // Default
    return { icon: '🔧', color: 'gray' };
  }, [technology]);

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'px-2 py-1 text-xs',
      icon: 'text-xs'
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      icon: 'text-sm'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 'text-base'
    }
  };

  // Color configurations
  const colorConfig: Record<string, any> = {
    cyan: {
      primary: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-400',
      secondary: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      outline: 'bg-transparent text-cyan-600 border-cyan-300'
    },
    purple: {
      primary: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-purple-400',
      secondary: 'bg-purple-100 text-purple-800 border-purple-200',
      outline: 'bg-transparent text-purple-600 border-purple-300'
    },
    indigo: {
      primary: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-indigo-400',
      secondary: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      outline: 'bg-transparent text-indigo-600 border-indigo-300'
    },
    blue: {
      primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-400',
      secondary: 'bg-blue-100 text-blue-800 border-blue-200',
      outline: 'bg-transparent text-blue-600 border-blue-300'
    },
    orange: {
      primary: 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400',
      secondary: 'bg-orange-100 text-orange-800 border-orange-200',
      outline: 'bg-transparent text-orange-600 border-orange-300'
    },
    teal: {
      primary: 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-teal-400',
      secondary: 'bg-teal-100 text-teal-800 border-teal-200',
      outline: 'bg-transparent text-teal-600 border-teal-300'
    },
    green: {
      primary: 'bg-gradient-to-r from-green-500 to-teal-500 text-white border-green-400',
      secondary: 'bg-green-100 text-green-800 border-green-200',
      outline: 'bg-transparent text-green-600 border-green-300'
    },
    emerald: {
      primary: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-400',
      secondary: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      outline: 'bg-transparent text-emerald-600 border-emerald-300'
    },
    red: {
      primary: 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400',
      secondary: 'bg-red-100 text-red-800 border-red-200',
      outline: 'bg-transparent text-red-600 border-red-300'
    },
    mint: {
      primary: 'bg-gradient-to-r from-mint-green to-teal-400 text-blue-ink border-mint-green',
      secondary: 'bg-mint-green/20 text-mint-green border-mint-green/30',
      outline: 'bg-transparent text-mint-green border-mint-green/50'
    },
    gray: {
      primary: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-400',
      secondary: 'bg-gray-100 text-gray-700 border-gray-200',
      outline: 'bg-transparent text-gray-600 border-gray-300'
    }
  };

  const colorClasses = colorConfig[config.color]?.[variant] || colorConfig.gray[variant];

  const combinedClasses = `
    inline-flex items-center justify-center font-medium rounded-full border
    transition-all duration-200 hover:scale-105 hover:shadow-md
    ${sizeConfig[size].container}
    ${colorClasses}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <span 
      className={combinedClasses}
      role="status"
      aria-label={`Technology: ${technology}`}
    >
      {showIcon && (
        <span className={`mr-1.5 ${sizeConfig[size].icon}`}>
          {config.icon}
        </span>
      )}
      {technology}
    </span>
  );
});

TechnologyBadge.displayName = 'TechnologyBadge';

export default TechnologyBadge;