'use client';

import React from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { NegotiationTechnique } from '@/types/negotiation-technique';

interface HeroSectionProps {
  technique: NegotiationTechnique;
}

const HeroSection: React.FC<HeroSectionProps> = ({ technique }) => {
  // Transform technique data for hero display
  const heroData = {
    technique: {
      title: technique.title,
      author: technique.author,
      context: technique.origin,
      description: technique.description,
      keyBenefit: technique.psychologyPrinciples[0] || 'Technique de négociation avancée'
    },
    stats: {
      successRate: technique.successMetrics.find(m => m.metric.includes('marge'))?.value || '85%',
      applicationContext: technique.businessApplications[0] || 'Négociations B2B',
      difficultyLevel: technique.difficultyLevel === 'intermediate' ? 'Intermédiaire' : 
                      technique.difficultyLevel === 'advanced' ? 'Avancé' : 'Débutant'
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* ParticleBackground avec thème négociation */}
      <ParticleBackground 
        density={30}
        speed={0.3}
        color="#DC2626"
        opacity={0.4}
        className="absolute inset-0"
      />
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg" />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <AnimatedSection animation="fade-in" delay={0}>
          {/* FBI Badge */}
          <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-2 mb-6">
            <span className="text-2xl" role="img" aria-label="FBI">🎯</span>
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wide">
              Technique FBI
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slide-up" delay={100}>
          {/* Main Title - SEO Optimized */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-title mb-6 leading-tight">
            <span className="block">{heroData.technique.title}</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl text-red-600 mt-2 font-medium">
              Technique FBI de {heroData.technique.author}
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection animation="slide-up" delay={200}>
          {/* Context Badge */}
          <div className="inline-block bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-lg px-4 py-2 mb-6">
            <span className="text-orange-600 font-medium">
              {heroData.technique.context}
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slide-up" delay={300}>
          {/* Description */}
          <p className="text-lg md:text-xl text-primary-secondary/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            {heroData.technique.description.substring(0, 200)}...
          </p>
        </AnimatedSection>

        <AnimatedSection animation="slide-up" delay={400}>
          {/* Key Benefit Highlight */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-red-500/20 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">💡</span>
              </div>
              <h2 className="text-xl font-semibold text-red-600">
                Principe Fondamental
              </h2>
            </div>
            <p className="text-primary-secondary/90 leading-relaxed">
              {heroData.technique.keyBenefit}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slide-up" delay={500}>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {heroData.stats.successRate}
              </div>
              <div className="text-sm text-primary-secondary/70 uppercase tracking-wide">
                Taux de Réussite
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {heroData.stats.difficultyLevel}
              </div>
              <div className="text-sm text-primary-secondary/70 uppercase tracking-wide">
                Niveau
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-amber-500/20">
              <div className="text-lg font-bold text-amber-600 mb-2">
                B2B PME
              </div>
              <div className="text-sm text-primary-secondary/70 uppercase tracking-wide">
                Application
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slide-up" delay={600}>
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="group relative bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => {
                document.getElementById('guide')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Découvrir la technique complète
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              className="text-red-600 hover:text-red-700 font-medium px-6 py-4 border border-red-600/30 hover:border-red-600/50 rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-red-600/5"
              onClick={() => {
                document.getElementById('cases')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Voir les cas clients PME
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-in" delay={700}>
          {/* Scroll Indicator */}
          <div className="mt-12 flex flex-col items-center">
            <div className="text-primary-secondary/60 text-sm mb-2">
              Découvrez la méthode complète
            </div>
            <div className="w-6 h-10 border-2 border-red-600/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-red-600 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Performance optimization: Preload critical resources */}
      <link 
        rel="preload" 
        href="/fonts/inter.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
    </section>
  );
};

export default HeroSection;