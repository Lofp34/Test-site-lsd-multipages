'use client';

import React, { useState, useEffect } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import TestimonialCard from '@/components/ui/TestimonialCard';
import CredibilityBadge from '@/components/ui/CredibilityBadge';
import { useNegotiationTheme } from '@/hooks/useNegotiationTheme';

interface CredibilityMetric {
  label: string;
  value: string;
  description: string;
  icon: string;
  color: string;
}

interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  result: string;
  avatar: string;
}

interface Badge {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface CredibilitySectionProps {
  metrics: CredibilityMetric[];
  testimonials?: Testimonial[];
  badges: Badge[];
  showAnimatedCounters?: boolean;
}

const CredibilitySection: React.FC<CredibilitySectionProps> = ({ 
  metrics, 
  testimonials = [], 
  badges,
  showAnimatedCounters = true 
}) => {
  const theme = useNegotiationTheme();
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  // Animate counters on mount
  useEffect(() => {
    if (!showAnimatedCounters) return;

    const animateCounters = () => {
      metrics.forEach((metric, index) => {
        const numericValue = parseInt(metric.value.replace(/[^\d]/g, ''));
        if (isNaN(numericValue)) return;

        let current = 0;
        const increment = numericValue / 50; // 50 steps animation
        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({
            ...prev,
            [metric.label]: Math.floor(current)
          }));
        }, 30);
      });
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, [metrics, showAnimatedCounters]);

  const formatAnimatedValue = (metric: CredibilityMetric): string => {
    if (!showAnimatedCounters) return metric.value;
    
    const animatedValue = animatedValues[metric.label];
    if (animatedValue === undefined) return '0';
    
    const suffix = metric.value.replace(/[\d]/g, '');
    return `${animatedValue}${suffix}`;
  };

  return (
    <section className="max-w-6xl mx-auto mb-16 px-4" aria-labelledby="credibility-title">
      {/* Header */}
      <AnimatedSection animation="fade-in" delay={0}>
        <div className="text-center mb-12">
          <span 
            className="inline-block bg-red-500/20 text-red-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur"
          >
            <span className="inline mr-2">🏆</span>
            Preuves de Performance
          </span>
          <h2 id="credibility-title" className="text-3xl md:text-4xl font-bold text-primary-title mb-4">
            Résultats Mesurés & Validés
          </h2>
          <p className="text-lg text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
            Des métriques concrètes qui démontrent l'efficacité de cette technique en contexte PME français
          </p>
        </div>
      </AnimatedSection>

      {/* Success Metrics with Animation */}
      <AnimatedSection delay={100}>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <AnimatedSection key={index} delay={150 + index * 100}>
              <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl p-8 text-center shadow-xl border border-red-500/10 hover:border-red-500/30 transition-all duration-300 group">
                <div className="relative mb-6">
                  <div 
                    className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}
                    style={{ backgroundColor: `${metric.color}20` }}
                  >
                    <span>{metric.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-mint-green rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: metric.color }}
                >
                  <AnimatedCounter 
                    end={parseInt(metric.value.replace(/[^\d]/g, ''))} 
                    suffix={metric.value.replace(/[\d]/g, '')}
                    startAnimation={showAnimatedCounters}
                  />
                </div>
                
                <div className="text-lg font-semibold text-primary-title mb-2">
                  {metric.label}
                </div>
                
                <div className="text-sm text-primary-secondary/70 leading-relaxed">
                  {metric.description}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* Testimonials Section (if provided) */}
      {testimonials.length > 0 && (
        <AnimatedSection delay={300}>
          <div className="mb-12">
            <div className="text-center mb-8">
              <span className="inline-block bg-orange-500/20 text-orange-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
                <span className="inline mr-2">💬</span>
                Témoignages Clients
              </span>
              <h3 className="text-2xl font-bold text-primary-title mb-4">
                Ce Que Disent Nos Clients PME
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  company={testimonial.company}
                  role={testimonial.role}
                  quote={testimonial.quote}
                  result={testimonial.result}
                  avatar={testimonial.avatar}
                  delay={350 + index * 100}
                  variant="default"
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Expertise Badges */}
      <AnimatedSection delay={400}>
        <div className="bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Certifications & Expertise
            </h3>
            <p className="text-white/90 max-w-2xl mx-auto">
              Une expertise reconnue et validée par des années de pratique terrain
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <CredibilityBadge
                key={index}
                title={badge.title}
                description={badge.description}
                icon={badge.icon}
                color={badge.color}
                delay={450 + index * 100}
                size="md"
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Social Proof Indicators */}
      <AnimatedSection delay={500}>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 bg-white/70 dark:bg-blue-ink/80 rounded-full px-8 py-4 shadow-lg border border-red-500/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-primary-title">
                500+ PME accompagnées
              </span>
            </div>
            
            <div className="w-px h-6 bg-primary-secondary/20"></div>
            
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <span className="text-sm font-semibold text-primary-title">
                4.9/5 satisfaction
              </span>
            </div>
            
            <div className="w-px h-6 bg-primary-secondary/20"></div>
            
            <div className="flex items-center gap-2">
              <span className="text-mint-green text-lg">🏆</span>
              <span className="text-sm font-semibold text-primary-title">
                Expert reconnu
              </span>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default CredibilitySection;