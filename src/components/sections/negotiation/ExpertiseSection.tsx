'use client';

import React from 'react';
import { NegotiationTechnique } from '@/types/negotiation-technique';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';

interface ExpertiseSectionProps {
  technique: NegotiationTechnique;
}

interface LaurentVisionProps {
  laurentVision: string;
  techniqueTitle: string;
}

interface PMEAdaptationProps {
  pmeAdaptation: string;
  techniqueTitle: string;
}

interface PsychologyPrinciplesProps {
  principles: string[];
  techniqueTitle: string;
}

interface TestimonialsProps {
  testimonials?: {
    name: string;
    company: string;
    role: string;
    quote: string;
    result: string;
    avatar: string;
  }[];
}

interface CredibilityBadgesProps {
  badges?: {
    title: string;
    description: string;
    icon: string;
    color: string;
  }[];
}

// Composant Vision Laurent Serre
const LaurentVision: React.FC<LaurentVisionProps> = ({ laurentVision, techniqueTitle }) => {
  return (
    <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 rounded-2xl p-8 border border-blue-ink/20 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-ink to-mint-green rounded-2xl flex items-center justify-center shadow-xl">
          <span className="text-white font-bold text-lg">LS</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-blue-ink mb-1">Vision Laurent Serre</h3>
          <p className="text-gray-600 text-sm">Expert développement commercial PME • 20 ans d'expérience</p>
        </div>
      </div>
      
      <blockquote className="relative">
        <div className="absolute -top-2 -left-2 text-4xl text-mint-green/30 font-serif">"</div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic pl-6 pr-6">
          {laurentVision}
        </p>
        <div className="absolute -bottom-2 -right-2 text-4xl text-mint-green/30 font-serif">"</div>
      </blockquote>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Expertise terrain • {techniqueTitle}</span>
          <Badge variant="default" size="sm" className="bg-mint-green/20 text-mint-green">
            Approche PME
          </Badge>
        </div>
      </div>
    </div>
  );
};

// Composant Adaptation PME
const PMEAdaptation: React.FC<PMEAdaptationProps> = ({ pmeAdaptation, techniqueTitle }) => {
  return (
    <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl p-6 border border-mint-green/20 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-mint-green rounded-xl flex items-center justify-center">
          <span className="text-white text-lg">🇫🇷</span>
        </div>
        <h4 className="text-lg font-bold text-blue-ink dark:text-mint-green">
          Adaptation PME Française
        </h4>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {pmeAdaptation}
      </p>
      
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" size="sm" className="border-mint-green/30 text-mint-green">
          PME 10-100 salariés
        </Badge>
        <Badge variant="outline" size="sm" className="border-mint-green/30 text-mint-green">
          Contexte français
        </Badge>
        <Badge variant="outline" size="sm" className="border-mint-green/30 text-mint-green">
          Approche relationnelle
        </Badge>
      </div>
    </div>
  );
};

// Composant Principes Psychologiques
const PsychologyPrinciples: React.FC<PsychologyPrinciplesProps> = ({ principles, techniqueTitle }) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h4 className="text-xl font-bold text-blue-ink dark:text-white mb-2">
          Principes Psychologiques
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          Les mécanismes scientifiques derrière {techniqueTitle}
        </p>
      </div>
      
      <div className="grid gap-4">
        {principles.map((principle, index) => (
          <AnimatedSection key={index} delay={100 + index * 50} animation="slide-left">
            <div className="bg-gradient-to-r from-white/80 to-white/60 dark:from-blue-ink/60 dark:to-blue-ink/40 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-mint-green/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-mint-green/30 transition-colors duration-300">
                  <span className="text-mint-green font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {principle}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

// Composant Témoignages
const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="mt-8">
      <h4 className="text-lg font-bold text-blue-ink dark:text-white mb-4 text-center">
        Retours d'expérience clients
      </h4>
      
      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.slice(0, 2).map((testimonial, index) => (
          <AnimatedSection key={index} delay={200 + index * 100} animation="scale-in">
            <div className="bg-white/80 dark:bg-blue-ink/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-mint-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-blue-ink dark:text-white text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
              
              <blockquote className="text-gray-700 dark:text-gray-300 text-sm italic mb-3 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="text-mint-green font-semibold text-xs">
                Résultat: {testimonial.result}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

// Composant Badges de Crédibilité
const CredibilityBadges: React.FC<CredibilityBadgesProps> = ({ badges }) => {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <AnimatedSection key={index} delay={300 + index * 100} animation="slide-up">
            <div className="bg-white/60 dark:bg-blue-ink/40 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-all duration-300 group">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${badge.color}20` }}
              >
                <span className="text-2xl">{badge.icon}</span>
              </div>
              <h5 className="font-bold text-blue-ink dark:text-white text-sm mb-2">
                {badge.title}
              </h5>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {badge.description}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

// Composant principal ExpertiseSection
const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ technique }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary-bg to-white/50 dark:to-blue-ink/20">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête de section */}
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="text-center mb-12">
            <Badge variant="default" size="md" className="mb-4">
              <span className="mr-2">🎓</span>
              Expertise Laurent Serre
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-ink dark:text-white mb-4">
              Vision Expert & Adaptation PME
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment Laurent Serre adapte {technique.title} au contexte spécifique des PME françaises, 
              avec 20 ans d'expérience terrain et des résultats mesurés.
            </p>
          </div>
        </AnimatedSection>

        {/* Vision Laurent Serre */}
        <AnimatedSection animation="slide-up" delay={100}>
          <div className="mb-12">
            <LaurentVision 
              laurentVision={technique.laurentVision}
              techniqueTitle={technique.title}
            />
          </div>
        </AnimatedSection>

        {/* Grille principale */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Adaptation PME */}
          <AnimatedSection animation="slide-right" delay={200}>
            <PMEAdaptation 
              pmeAdaptation={technique.pmeAdaptation}
              techniqueTitle={technique.title}
            />
          </AnimatedSection>

          {/* Principes Psychologiques */}
          <AnimatedSection animation="slide-left" delay={250}>
            <PsychologyPrinciples 
              principles={technique.psychologyPrinciples}
              techniqueTitle={technique.title}
            />
          </AnimatedSection>
        </div>

        {/* Badges de Crédibilité */}
        {technique.credibilityBadges && (
          <CredibilityBadges badges={technique.credibilityBadges} />
        )}

        {/* Témoignages */}
        {technique.testimonials && (
          <Testimonials testimonials={technique.testimonials} />
        )}

        {/* Applications Business */}
        {technique.businessApplications && technique.businessApplications.length > 0 && (
          <AnimatedSection animation="fade-in" delay={400}>
            <div className="mt-12 bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-2xl p-8 border border-mint-green/20">
              <h4 className="text-xl font-bold text-blue-ink dark:text-white mb-6 text-center">
                Applications Business Concrètes
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                {technique.businessApplications.map((application, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-blue-ink/30 rounded-lg">
                    <div className="w-8 h-8 bg-mint-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {application}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default ExpertiseSection;