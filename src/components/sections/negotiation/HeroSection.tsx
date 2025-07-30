'use client';

import React from 'react';
import { NegotiationTechnique } from '@/types/negotiation-technique';
import { TechniqueTheme } from '@/utils/negotiation/theme-manager';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ParticleBackground from '@/components/ui/ParticleBackground';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface HeroSectionProps {
  technique: NegotiationTechnique;
  theme: TechniqueTheme;
}

interface TechniqueBadgeProps {
  author: string;
  origin: string;
  theme: TechniqueTheme;
}

interface SuccessMetricsProps {
  metrics: {
    metric: string;
    value: string;
    context: string;
  }[];
  theme: TechniqueTheme;
}

interface HeroCTAsProps {
  technique: NegotiationTechnique;
  theme: TechniqueTheme;
}

// Composant Badge de technique avec autorité
const TechniqueBadge: React.FC<TechniqueBadgeProps> = ({ author, origin, theme }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
      <Badge 
        variant="default" 
        size="md"
        className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold shadow-lg"
      >
        <span className="mr-2" aria-hidden="true">{theme.icon}</span>
        Technique {author}
      </Badge>
      
      <Badge 
        variant="outline" 
        size="sm"
        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 hover:bg-white/20"
      >
        {origin}
      </Badge>
    </div>
  );
};

// Composant Métriques de succès
const SuccessMetrics: React.FC<SuccessMetricsProps> = ({ metrics, theme }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">
      {metrics.slice(0, 3).map((metric, index) => (
        <AnimatedSection key={index} delay={200 + index * 100} animation="scale-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="text-center">
              <div 
                className="text-2xl md:text-3xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300"
                style={{ color: theme.colors.accent }}
              >
                {metric.value}
              </div>
              <div className="text-white/90 font-medium text-sm mb-1">
                {metric.metric}
              </div>
              <div className="text-white/70 text-xs leading-relaxed">
                {metric.context}
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
};

// Composant CTAs Hero adaptatifs
const HeroCTAs: React.FC<HeroCTAsProps> = ({ technique, theme }) => {
  const handleDiagnosticClick = () => {
    // Track CTA click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'Negotiation',
        event_label: `Hero Diagnostic - ${technique.title}`,
        technique_id: technique.id
      });
    }
  };

  const handleFormationClick = () => {
    // Track CTA click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'Negotiation',
        event_label: `Hero Formation - ${technique.title}`,
        technique_id: technique.id
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <AnimatedSection delay={400} animation="slide-up">
        <Button
          variant="primary"
          size="lg"
          onClick={handleDiagnosticClick}
          className="w-full sm:w-auto bg-white text-blue-ink hover:bg-white/90 hover:scale-105 shadow-2xl"
          icon={<span>🎯</span>}
        >
          Diagnostic gratuit
        </Button>
      </AnimatedSection>
      
      <AnimatedSection delay={500} animation="slide-up">
        <Button
          variant="outline"
          size="lg"
          onClick={handleFormationClick}
          className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-ink"
          icon={<span>🚀</span>}
        >
          Formation {technique.category === 'closing' ? 'Closing' : 'Négociation'}
        </Button>
      </AnimatedSection>
    </div>
  );
};

// Composant principal HeroSection
const HeroSection: React.FC<HeroSectionProps> = ({ technique, theme }) => {
  return (
    <section 
      className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden ${theme.className}`}
      style={{
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 50%, ${theme.colors.accent} 100%)`
      }}
      aria-labelledby="hero-title"
    >
      {/* ParticleBackground avec thème personnalisé */}
      <ParticleBackground 
        density={30}
        speed={0.3}
        color={theme.colors.particle}
        opacity={0.4}
        className="absolute inset-0"
      />
      
      {/* Overlay gradient pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      
      {/* Contenu principal */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
        <AnimatedSection animation="fade-in" delay={0}>
          <TechniqueBadge 
            author={technique.author}
            origin={technique.origin}
            theme={theme}
          />
        </AnimatedSection>
        
        <AnimatedSection animation="slide-up" delay={100}>
          <h1 
            id="hero-title" 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
          >
            {technique.title}
          </h1>
        </AnimatedSection>
        
        <AnimatedSection animation="slide-up" delay={200}>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            {technique.description}
          </p>
        </AnimatedSection>
        
        {/* Métriques de succès */}
        {technique.successMetrics && technique.successMetrics.length > 0 && (
          <SuccessMetrics 
            metrics={technique.successMetrics}
            theme={theme}
          />
        )}
        
        {/* CTAs Hero */}
        <HeroCTAs 
          technique={technique}
          theme={theme}
        />
        
        {/* Indicateur de scroll */}
        <AnimatedSection delay={600} animation="fade-in">
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300">
              <span className="text-sm mb-2 font-medium">Découvrir la technique</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm animate-pulse delay-500"></div>
    </section>
  );
};

export default HeroSection;