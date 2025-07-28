'use client';

import React from 'react';
import AnimatedSection from './AnimatedSection';

interface TestimonialCardProps {
  name: string;
  company: string;
  role: string;
  quote: string;
  result: string;
  avatar: string;
  delay?: number;
  variant?: 'default' | 'compact' | 'featured';
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  company,
  role,
  quote,
  result,
  avatar,
  delay = 0,
  variant = 'default'
}) => {
  const variantClasses = {
    default: {
      container: 'bg-white/70 dark:bg-blue-ink/80 rounded-xl p-6 shadow-lg border border-orange-500/10',
      avatar: 'w-12 h-12',
      quote: 'text-primary-secondary/90 italic mb-4 leading-relaxed',
      result: 'bg-gradient-to-r from-green-50 to-mint-green/10 dark:from-green-900/20 dark:to-mint-green/10 rounded-lg p-3 border-l-4 border-mint-green'
    },
    compact: {
      container: 'bg-white/60 dark:bg-blue-ink/60 rounded-lg p-4 shadow-md border border-orange-500/5',
      avatar: 'w-10 h-10',
      quote: 'text-primary-secondary/80 italic mb-3 leading-relaxed text-sm',
      result: 'bg-mint-green/10 rounded-md p-2 border-l-2 border-mint-green'
    },
    featured: {
      container: 'bg-gradient-to-br from-white/80 to-orange-50/80 dark:from-blue-ink/90 dark:to-orange-900/20 rounded-2xl p-8 shadow-xl border border-orange-500/20',
      avatar: 'w-16 h-16',
      quote: 'text-primary-secondary/95 italic mb-6 leading-relaxed text-lg',
      result: 'bg-gradient-to-r from-green-100 to-mint-green/20 dark:from-green-900/30 dark:to-mint-green/20 rounded-xl p-4 border-l-4 border-mint-green shadow-sm'
    }
  };

  const classes = variantClasses[variant];

  return (
    <AnimatedSection delay={delay}>
      <div className={`${classes.container} hover:shadow-xl transition-all duration-300 group`}>
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex-shrink-0 ${classes.avatar} rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
            <span className="text-white font-bold text-sm">
              {avatar}
            </span>
          </div>
          
          <div className="flex-1">
            <div className="font-semibold text-primary-title">
              {name}
            </div>
            <div className="text-sm text-primary-secondary/70">
              {role} - {company}
            </div>
          </div>

          {/* Quote icon */}
          <div className="text-orange-500/30 text-2xl">
            "
          </div>
        </div>
        
        <blockquote className={classes.quote}>
          {quote}
        </blockquote>
        
        <div className={classes.result}>
          <div className="text-sm font-semibold text-mint-green flex items-center gap-2">
            <span className="text-lg">✓</span>
            Résultat : {result}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary-secondary/10">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-sm">⭐</span>
            ))}
          </div>
          <div className="text-xs text-primary-secondary/60">
            Client vérifié
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TestimonialCard;