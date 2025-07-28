'use client';

import React from 'react';
import { ExpertiseSectionProps } from '@/types/negotiation-technique';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useNegotiationTheme } from '@/hooks/useNegotiationTheme';

interface PsychologyInsight {
  principle: string;
  explanation: string;
  businessApplication: string;
  icon: string;
}

interface ExpertiseSectionData {
  laurentVision: string;
  pmeAdaptation: string;
  successMetrics: {
    metric: string;
    value: string;
    context: string;
  }[];
  psychologyPrinciples: string[];
}

interface ExpertiseSectionComponentProps {
  data: ExpertiseSectionData;
}

const ExpertiseSection: React.FC<ExpertiseSectionComponentProps> = ({ data }) => {
  const theme = useNegotiationTheme();

  // Transform psychology principles into insights with icons and explanations
  const psychologyInsights: PsychologyInsight[] = data.psychologyPrinciples.slice(0, 4).map((principle, index) => {
    const icons = ['🧠', '⚖️', '🎯', '💡'];
    const explanations = [
      'La psychologie cognitive nous enseigne que les compromis activent le système de perte dans notre cerveau, créant de l\'insatisfaction.',
      'L\'équilibre en négociation ne vient pas du partage égal, mais de la création de valeur mutuelle respectant les besoins de chacun.',
      'La précision dans l\'argumentation et la fermeté sur les principes créent plus de respect que la flexibilité excessive.',
      'L\'innovation dans les solutions permet de sortir du cadre traditionnel gagnant-perdant pour créer des accords durables.'
    ];
    const applications = [
      'Préservation des marges tout en maintenant la satisfaction client',
      'Négociations équilibrées basées sur la valeur réelle apportée',
      'Positionnement d\'expert respecté plutôt que de fournisseur corvéable',
      'Création de partenariats durables par des solutions créatives'
    ];

    return {
      principle,
      explanation: explanations[index] || 'Principe psychologique fondamental appliqué à la négociation commerciale.',
      businessApplication: applications[index] || 'Application concrète en contexte PME.',
      icon: icons[index] || '🔍'
    };
  });

  return (
    <section className="max-w-6xl mx-auto mb-16 px-4" aria-labelledby="expertise-title">
      {/* Header Section */}
      <AnimatedSection animation="fade-in" delay={0}>
        <div className="text-center mb-12">
          <span 
            className={`inline-block bg-${theme.primaryColor}/20 text-${theme.primaryColor} font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur`}
            style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
          >
            <span className="inline mr-2">👨‍🏫</span>
            Expertise Laurent Serre
          </span>
          <h2 id="expertise-title" className="text-3xl md:text-4xl font-bold text-primary-title mb-4">
            Vision Terrain & Adaptation PME
          </h2>
          <p className="text-lg text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
            20 ans d'expérience terrain avec les PME françaises pour adapter les techniques FBI au contexte business européen
          </p>
        </div>
      </AnimatedSection>

      {/* Laurent Vision Section */}
      <AnimatedSection delay={100}>
        <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 mb-12 border border-red-500/20 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Photo Laurent Serre */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white font-bold text-2xl lg:text-3xl">LS</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-mint-green rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse opacity-75"></div>
              </div>
            </div>

            {/* Vision Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl lg:text-2xl font-bold text-red-600 dark:text-red-400">
                  Vision Laurent Serre
                </h3>
                <span className="text-sm text-primary-secondary/70 bg-primary-bg/50 px-3 py-1 rounded-full">
                  20 ans d'expérience PME
                </span>
              </div>
              
              <blockquote className="text-primary-secondary/90 leading-relaxed mb-6 italic text-lg border-l-4 border-red-500 pl-6">
                "{data.laurentVision}"
              </blockquote>

              {/* Success Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-red-500/20">
                {data.successMetrics.map((metric, index) => (
                  <AnimatedSection key={index} delay={200 + index * 50}>
                    <div className="text-center p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
                      <div className="text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm font-semibold text-primary-title mb-1">
                        {metric.metric}
                      </div>
                      <div className="text-xs text-primary-secondary/70">
                        {metric.context}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* PME Adaptation Section */}
      <AnimatedSection delay={200}>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 mb-12 border border-orange-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🇫🇷</span>
            </div>
            <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              Adaptation PME Française
            </h3>
          </div>
          
          <p className="text-primary-secondary/90 leading-relaxed text-lg">
            {data.pmeAdaptation}
          </p>
        </div>
      </AnimatedSection>

      {/* Psychology Insights Grid */}
      <AnimatedSection delay={300}>
        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="inline-block bg-orange-500/20 text-orange-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
              <span className="inline mr-2">🧠</span>
              Insights Psychologiques
            </span>
            <h3 className="text-2xl font-bold text-primary-title mb-4">
              Fondements Scientifiques de la Technique
            </h3>
            <p className="text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
              Comprendre les mécanismes psychologiques pour appliquer la technique avec finesse et efficacité
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {psychologyInsights.map((insight, index) => (
              <AnimatedSection key={index} delay={350 + index * 100}>
                <div className="bg-white/70 dark:bg-blue-ink/80 rounded-xl p-6 shadow-lg border border-red-500/10 hover:border-red-500/30 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md">
                      <span className="text-2xl">{insight.icon}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-primary-title mb-2 line-clamp-2">
                        {insight.principle.split(' - ')[0]}
                      </h4>
                      
                      <p className="text-sm text-primary-secondary/80 mb-3 leading-relaxed">
                        {insight.explanation}
                      </p>
                      
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-3 border-l-4 border-red-500">
                        <p className="text-sm text-primary-secondary/90 font-medium">
                          <span className="text-red-600 dark:text-red-400 font-semibold">Application PME :</span> {insight.businessApplication}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Credibility Indicators */}
      <AnimatedSection delay={500}>
        <div className="bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg rounded-2xl p-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-2xl"></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h3 className="text-2xl font-bold text-white mb-6">
              Pourquoi Faire Confiance à Cette Approche ?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🎯</div>
                <div className="text-xl font-bold text-white mb-2">Terrain Prouvé</div>
                <div className="text-white/90 text-sm leading-relaxed">
                  Testée sur 500+ négociations PME avec 85% de préservation des marges
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🏆</div>
                <div className="text-xl font-bold text-white mb-2">Expertise FBI</div>
                <div className="text-white/90 text-sm leading-relaxed">
                  Technique développée par Chris Voss, négociateur en chef du FBI
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🇫🇷</div>
                <div className="text-xl font-bold text-white mb-2">Adaptation Française</div>
                <div className="text-white/90 text-sm leading-relaxed">
                  Adaptée au contexte PME français par 20 ans d'expérience terrain
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default ExpertiseSection;