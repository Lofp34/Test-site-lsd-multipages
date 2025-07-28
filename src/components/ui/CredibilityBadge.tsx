'use client';

import React from 'react';
import AnimatedSection from './AnimatedSection';

interface CredibilityBadgeProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
}

const CredibilityBadge: React.FC<CredibilityBadgeProps> = ({
  title,
  description,
  icon,
  color,
  delay = 0,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: {
      container: 'p-4',
      icon: 'w-10 h-10 text-2xl',
      title: 'text-sm font-bold',
      description: 'text-xs'
    },
    md: {
      container: 'p-6',
      icon: 'w-12 h-12 text-3xl',
      title: 'text-lg font-bold',
      description: 'text-sm'
    },
    lg: {
      container: 'p-8',
      icon: 'w-16 h-16 text-4xl',
      title: 'text-xl font-bold',
      description: 'text-base'
    }
  };

  const classes = sizeClasses[size];

  return (
    <AnimatedSection delay={delay}>
      <div className={`bg-white/10 backdrop-blur-sm rounded-xl ${classes.container} text-center border border-white/20 hover:bg-white/15 transition-all duration-300 group`}>
        <div 
          className={`${classes.icon} mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
          style={{ backgroundColor: `${color}30` }}
        >
          <span>{icon}</span>
        </div>
        
        <div className={`${classes.title} text-white mb-2`}>
          {title}
        </div>
        
        <div className={`${classes.description} text-white/80 leading-relaxed`}>
          {description}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default CredibilityBadge;