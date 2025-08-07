'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

export interface ResourceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  primaryCTA: {
    text: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryCTA?: {
    text: string;
    href: string;
    icon?: LucideIcon;
  };
  stats?: {
    label: string;
    value: string;
  }[];
  className?: string;
}

const ResourceHero: React.FC<ResourceHeroProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  gradient,
  primaryCTA,
  secondaryCTA,
  stats,
  className = ''
}) => {
  return (
    <section 
      className={`relative py-16 px-4 overflow-hidden ${gradient} ${className}`}
      aria-labelledby="resource-hero-title"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <AnimatedSection animation="fade-in" delay={0}>
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg">
            <Icon size={32} className="text-white" />
          </div>

          {/* Subtitle Badge */}
          <span 
            className="inline-block bg-white/20 text-white font-semibold rounded-full px-4 py-2 text-sm mb-4 shadow-md backdrop-blur-sm"
            role="status"
            aria-label={`Catégorie ${subtitle}`}
          >
            {subtitle}
          </span>

          {/* Main Title */}
          <h1 
            id="resource-hero-title" 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight"
          >
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </AnimatedSection>

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <AnimatedSection animation="slide-up" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* CTA Buttons */}
        <AnimatedSection animation="slide-up" delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" role="group" aria-label="Actions principales">
            <Button
              variant="primary"
              size="lg"
              onClick={primaryCTA.onClick}
              icon={primaryCTA.icon && <primaryCTA.icon size={20} />}
              className="bg-white text-blue-ink hover:bg-white/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-white/50 focus:outline-none"
              aria-describedby="primary-cta-description"
            >
              {primaryCTA.text}
            </Button>
            <div id="primary-cta-description" className="sr-only">
              Télécharger gratuitement la ressource
            </div>

            {secondaryCTA && (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(secondaryCTA.href, '_blank')}
                  icon={secondaryCTA.icon && <secondaryCTA.icon size={20} />}
                  className="border-white text-white hover:bg-white hover:text-blue-ink focus:ring-4 focus:ring-white/50 focus:outline-none"
                  aria-describedby="secondary-cta-description"
                >
                  {secondaryCTA.text}
                </Button>
                <div id="secondary-cta-description" className="sr-only">
                  Ouvrir l'aperçu dans un nouvel onglet
                </div>
              </>
            )}
          </div>
        </AnimatedSection>

        {/* Trust Indicator */}
        <AnimatedSection animation="fade-in" delay={600}>
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-white/70 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Ressource créée par Laurent Serre, expert en développement commercial PME
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ResourceHero;