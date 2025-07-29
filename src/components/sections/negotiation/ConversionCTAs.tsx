'use client';

import React, { useState, useEffect } from 'react';
import { NegotiationTechnique } from '@/types/negotiation-technique';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface ConversionCTAsProps {
  technique: NegotiationTechnique;
}

interface CTACardProps {
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaIcon: string;
  variant: 'primary' | 'secondary' | 'outline';
  urgency?: string;
  socialProof?: string;
  onClick: () => void;
  index: number;
}

interface ProgressBasedCTAProps {
  technique: NegotiationTechnique;
  readingProgress: number;
}

interface StickyBottomCTAProps {
  technique: NegotiationTechnique;
  isVisible: boolean;
}

interface UrgencyBannerProps {
  technique: NegotiationTechnique;
}

// Composant Carte CTA
const CTACard: React.FC<CTACardProps> = ({
  title,
  description,
  benefits,
  ctaText,
  ctaIcon,
  variant,
  urgency,
  socialProof,
  onClick,
  index
}) => {
  const getCardStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: 'bg-gradient-to-br from-mint-green/20 to-blue-ink/20',
          border: 'border-mint-green/30',
          highlight: 'text-mint-green'
        };
      case 'secondary':
        return {
          bg: 'bg-gradient-to-br from-blue-ink/20 to-mint-green/20',
          border: 'border-blue-ink/30',
          highlight: 'text-blue-ink'
        };
      case 'outline':
        return {
          bg: 'bg-white/80 dark:bg-blue-ink/60',
          border: 'border-gray-200 dark:border-gray-700',
          highlight: 'text-gray-700 dark:text-gray-300'
        };
      default:
        return {
          bg: 'bg-white/80 dark:bg-blue-ink/60',
          border: 'border-gray-200 dark:border-gray-700',
          highlight: 'text-gray-700 dark:text-gray-300'
        };
    }
  };

  const styles = getCardStyles();

  return (
    <AnimatedSection delay={100 + index * 100} animation="slide-up">
      <div className={`${styles.bg} ${styles.border} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}>
        {/* Badge d'urgence */}
        {urgency && (
          <div className="absolute top-4 right-4">
            <Badge variant="default" size="sm" className="bg-red-100 text-red-600 border-red-200 animate-pulse">
              {urgency}
            </Badge>
          </div>
        )}

        {/* Contenu principal */}
        <div className="mb-6">
          <h4 className="text-xl font-bold text-blue-ink dark:text-white mb-3">
            {title}
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {description}
          </p>

          {/* Bénéfices */}
          <div className="space-y-2 mb-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-mint-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-mint-green text-xs">✓</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Preuve sociale */}
          {socialProof && (
            <div className="bg-white/50 dark:bg-blue-ink/30 rounded-lg p-3 border border-gray-200 dark:border-gray-700 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-mint-green">👥</span>
                {socialProof}
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button
          variant={variant}
          size="lg"
          onClick={onClick}
          className="w-full group-hover:scale-105 transition-transform duration-300"
          icon={<span>{ctaIcon}</span>}
        >
          {ctaText}
        </Button>

        {/* Effet de brillance au survol */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </AnimatedSection>
  );
};

// Composant CTA basé sur la progression de lecture
const ProgressBasedCTA: React.FC<ProgressBasedCTAProps> = ({ technique, readingProgress }) => {
  const getCTAByProgress = () => {
    if (readingProgress < 25) {
      return {
        title: "Découvrez le potentiel complet",
        description: "Vous venez de commencer à explorer cette technique. Obtenez un diagnostic personnalisé pour voir comment l'appliquer dans votre contexte.",
        ctaText: "Diagnostic gratuit",
        ctaIcon: "🎯",
        variant: "outline" as const
      };
    } else if (readingProgress < 50) {
      return {
        title: "Approfondissez vos connaissances",
        description: "Vous progressez bien ! Accédez à notre formation complète pour maîtriser tous les aspects de cette technique.",
        ctaText: "Voir la formation",
        ctaIcon: "📚",
        variant: "secondary" as const
      };
    } else if (readingProgress < 75) {
      return {
        title: "Passez à la pratique",
        description: "Vous avez une bonne compréhension. Un coaching personnalisé vous aidera à appliquer efficacement cette technique.",
        ctaText: "Coaching individuel",
        ctaIcon: "🎯",
        variant: "primary" as const
      };
    } else {
      return {
        title: "Excellente progression !",
        description: "Vous maîtrisez les concepts. Rejoignez notre programme avancé pour devenir expert en négociation.",
        ctaText: "Programme expert",
        ctaIcon: "🏆",
        variant: "primary" as const
      };
    }
  };

  const cta = getCTAByProgress();

  const handleClick = () => {
    // Track progress-based CTA
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'progress_cta_click', {
        event_category: 'Conversion',
        event_label: `${Math.round(readingProgress)}% - ${cta.ctaText}`,
        technique_id: technique.id,
        reading_progress: readingProgress
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-2xl p-6 border border-mint-green/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-bold text-blue-ink dark:text-white">
            {cta.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-mint-green to-blue-ink h-2 rounded-full transition-all duration-500"
                style={{ width: `${readingProgress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(readingProgress)}%
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
        {cta.description}
      </p>
      
      <Button
        variant={cta.variant}
        size="md"
        onClick={handleClick}
        icon={<span>{cta.ctaIcon}</span>}
      >
        {cta.ctaText}
      </Button>
    </div>
  );
};

// Composant CTA sticky en bas
const StickyBottomCTA: React.FC<StickyBottomCTAProps> = ({ technique, isVisible }) => {
  const handleClick = () => {
    // Track sticky CTA
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sticky_cta_click', {
        event_category: 'Conversion',
        event_label: 'Bottom Sticky CTA',
        technique_id: technique.id
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-mint-green to-blue-ink p-4 shadow-2xl backdrop-blur-sm border-t border-white/20">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="text-white">
          <div className="font-bold text-lg">
            Prêt à maîtriser {technique.title} ?
          </div>
          <div className="text-white/90 text-sm">
            Diagnostic gratuit • Résultats garantis • 20 ans d'expérience
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={handleClick}
            className="border-white text-white hover:bg-white hover:text-blue-ink"
            icon={<span>🎯</span>}
          >
            Diagnostic gratuit
          </Button>
          
          <button
            onClick={() => {/* Hide sticky CTA */}}
            className="text-white/70 hover:text-white p-2"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant Bannière d'urgence
const UrgencyBanner: React.FC<UrgencyBannerProps> = ({ technique }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUrgentClick = () => {
    // Track urgency CTA
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'urgency_cta_click', {
        event_category: 'Conversion',
        event_label: 'Urgency Banner',
        technique_id: technique.id
      });
    }
  };

  return (
    <AnimatedSection animation="slide-down" delay={0}>
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 text-white shadow-2xl border border-red-500/30 relative overflow-hidden">
        {/* Effet d'animation de fond */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/50 to-orange-600/50 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center animate-bounce">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h4 className="text-xl font-bold">
                  Offre limitée - Diagnostic gratuit
                </h4>
                <p className="text-white/90 text-sm">
                  Analyse personnalisée de votre potentiel avec {technique.title}
                </p>
              </div>
            </div>
            
            {/* Compteur */}
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-white/80 text-xs">
                Temps restant
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/90">
              ✓ Analyse de votre contexte PME<br/>
              ✓ Plan d'action personnalisé<br/>
              ✓ 30 minutes avec Laurent Serre
            </div>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleUrgentClick}
              className="border-white text-white hover:bg-white hover:text-red-600 animate-pulse"
              icon={<span>🎯</span>}
            >
              Réserver maintenant
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Composant principal ConversionCTAs
const ConversionCTAs: React.FC<ConversionCTAsProps> = ({ technique }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Calculer la progression de lecture
  useEffect(() => {
    const calculateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
      
      // Afficher la barre sticky après 50% de lecture
      setShowStickyBar(progress > 50);
    };

    window.addEventListener('scroll', calculateReadingProgress);
    return () => window.removeEventListener('scroll', calculateReadingProgress);
  }, []);

  // Définir les CTAs principaux
  const mainCTAs = [
    {
      title: "Diagnostic gratuit personnalisé",
      description: "Analysons ensemble votre contexte PME et identifions comment appliquer efficacement cette technique dans vos négociations.",
      benefits: [
        "Analyse de votre contexte commercial",
        "Plan d'action personnalisé",
        "30 minutes avec Laurent Serre",
        "Recommandations spécifiques"
      ],
      ctaText: "Réserver mon diagnostic",
      ctaIcon: "🎯",
      variant: "primary" as const,
      socialProof: "Déjà 847 dirigeants PME accompagnés",
      onClick: () => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'diagnostic_cta_click', {
            event_category: 'Conversion',
            event_label: 'Main Diagnostic CTA',
            technique_id: technique.id
          });
        }
      }
    },
    {
      title: "Formation complète en négociation",
      description: "Maîtrisez cette technique et 6 autres méthodes éprouvées dans notre bootcamp intensif spécialement conçu pour les PME.",
      benefits: [
        "7 techniques de négociation avancées",
        "Cas pratiques secteur PME",
        "Certification Laurent Serre",
        "Suivi post-formation 3 mois"
      ],
      ctaText: "Découvrir la formation",
      ctaIcon: "🚀",
      variant: "secondary" as const,
      urgency: "Places limitées",
      socialProof: "4.9/5 - 156 avis clients",
      onClick: () => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'formation_cta_click', {
            event_category: 'Conversion',
            event_label: 'Main Formation CTA',
            technique_id: technique.id
          });
        }
      }
    },
    {
      title: "Coaching individuel intensif",
      description: "Accompagnement personnalisé pour intégrer cette technique dans votre style de négociation et vos processus commerciaux.",
      benefits: [
        "Sessions 1-to-1 avec Laurent Serre",
        "Adaptation à votre secteur",
        "Mise en pratique supervisée",
        "Résultats mesurés et garantis"
      ],
      ctaText: "Coaching sur-mesure",
      ctaIcon: "👨‍💼",
      variant: "outline" as const,
      socialProof: "92% de réussite mesurée",
      onClick: () => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'coaching_cta_click', {
            event_category: 'Conversion',
            event_label: 'Main Coaching CTA',
            technique_id: technique.id
          });
        }
      }
    }
  ];

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-white/50 to-primary-bg dark:from-blue-ink/40 dark:to-blue-ink/20">
        <div className="max-w-6xl mx-auto px-4">
          {/* En-tête de section */}
          <AnimatedSection animation="fade-in" delay={0}>
            <div className="text-center mb-12">
              <Badge variant="default" size="md" className="mb-4">
                <span className="mr-2">🎯</span>
                Passez à l'action
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-ink dark:text-white mb-4">
                Transformez vos négociations dès maintenant
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Vous avez découvert {technique.title}. Maintenant, faites le pas suivant pour 
                l'intégrer efficacement dans votre approche commerciale.
              </p>
            </div>
          </AnimatedSection>

          {/* Bannière d'urgence */}
          <div className="mb-12">
            <UrgencyBanner technique={technique} />
          </div>

          {/* CTAs principaux */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {mainCTAs.map((cta, index) => (
              <CTACard
                key={index}
                {...cta}
                index={index}
              />
            ))}
          </div>

          {/* CTA basé sur la progression */}
          <div className="mb-12">
            <ProgressBasedCTA 
              technique={technique}
              readingProgress={readingProgress}
            />
          </div>

          {/* Garanties et réassurances */}
          <AnimatedSection animation="slide-up" delay={400}>
            <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 rounded-2xl p-8 border border-blue-ink/20 text-center">
              <h3 className="text-xl font-bold text-blue-ink dark:text-white mb-6">
                🛡️ Nos garanties
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-mint-green/20 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">💯</span>
                  </div>
                  <h4 className="font-bold text-blue-ink dark:text-white mb-2">
                    Satisfaction garantie
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Remboursement intégral si vous n'êtes pas satisfait
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-mint-green/20 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <h4 className="font-bold text-blue-ink dark:text-white mb-2">
                    20 ans d'expertise
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Méthodes éprouvées sur 1000+ négociations PME
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-mint-green/20 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">📞</span>
                  </div>
                  <h4 className="font-bold text-blue-ink dark:text-white mb-2">
                    Support continu
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Accompagnement personnalisé jusqu'à vos premiers succès
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Témoignage final */}
          <AnimatedSection animation="fade-in" delay={500}>
            <div className="mt-12 text-center">
              <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-4">
                "La différence entre connaître une technique et la maîtriser, c'est la pratique accompagnée. 
                Je suis là pour vous guider dans cette transformation."
              </blockquote>
              <cite className="text-mint-green font-semibold">
                — Laurent Serre, Expert développement commercial PME
              </cite>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA sticky en bas */}
      <StickyBottomCTA 
        technique={technique}
        isVisible={showStickyBar}
      />
    </>
  );
};

export default ConversionCTAs;