'use client';

import React from 'react';
import { ArrowRight, Calendar, MessageCircle, BookOpen, Users, Target, Phone } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

export interface CTAConfig {
  title: string;
  description: string;
  buttonText: string;
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary' | 'outline';
  highlight?: boolean;
}

export interface ResourceCTAsProps {
  title?: string;
  subtitle?: string;
  ctas: CTAConfig[];
  layout?: 'grid' | 'stack' | 'horizontal';
  maxCTAs?: number;
  className?: string;
}

const ResourceCTAs: React.FC<ResourceCTAsProps> = ({
  title = "Aller plus loin avec Laurent Serre",
  subtitle = "Transformez vos connaissances en résultats concrets",
  ctas,
  layout = 'grid',
  maxCTAs = 4,
  className = ''
}) => {
  const displayedCTAs = ctas.slice(0, maxCTAs);

  const getLayoutClasses = () => {
    switch (layout) {
      case 'stack':
        return 'space-y-4';
      case 'horizontal':
        return 'flex flex-col sm:flex-row gap-4';
      case 'grid':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 gap-6';
    }
  };

  const handleCTAClick = (cta: CTAConfig) => {
    if (cta.onClick) {
      cta.onClick();
    } else if (cta.href) {
      if (cta.href.startsWith('http') || cta.href.startsWith('mailto') || cta.href.startsWith('tel')) {
        window.open(cta.href, '_blank');
      } else {
        if (typeof window !== 'undefined') {
          window.location.href = cta.href;
        }
      }
    }
  };

  return (
    <section className={`py-16 px-4 bg-gradient-to-br from-blue-ink via-blue-ink/95 to-blue-ink/90 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* CTAs Grid */}
        <div className={getLayoutClasses()}>
          {displayedCTAs.map((cta, index) => (
            <AnimatedSection 
              key={index} 
              animation="slide-up" 
              delay={100 + index * 100}
            >
              <div 
                className={`relative group h-full ${
                  cta.highlight 
                    ? 'bg-gradient-to-br from-mint-green to-mint-green/90' 
                    : 'bg-white/10 backdrop-blur-sm'
                } rounded-2xl p-6 border ${
                  cta.highlight 
                    ? 'border-mint-green/30' 
                    : 'border-white/20'
                } hover:border-white/40 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-lg hover:shadow-xl`}
              >
                {/* Highlight Badge */}
                {cta.highlight && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-orange-soft text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      ⭐ Recommandé
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  cta.highlight 
                    ? 'bg-white/20' 
                    : 'bg-mint-green/20'
                }`}>
                  <div className={`${
                    cta.highlight 
                      ? 'text-white' 
                      : 'text-mint-green'
                  }`}>
                    {cta.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-3 ${
                    cta.highlight 
                      ? 'text-white' 
                      : 'text-white'
                  }`}>
                    {cta.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    cta.highlight 
                      ? 'text-white/90' 
                      : 'text-white/80'
                  }`}>
                    {cta.description}
                  </p>
                </div>

                {/* Button */}
                <div className="mt-auto">
                  <Button
                    variant={cta.highlight ? 'outline' : cta.variant}
                    size="md"
                    onClick={() => handleCTAClick(cta)}
                    className={`w-full group-hover:scale-105 transition-transform duration-300 ${
                      cta.highlight 
                        ? 'border-white text-white hover:bg-white hover:text-mint-green' 
                        : cta.variant === 'primary' 
                          ? 'bg-mint-green hover:bg-mint-green/90 text-white' 
                          : cta.variant === 'secondary'
                            ? 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                            : 'border-white/40 text-white hover:bg-white/10'
                    }`}
                    icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
                    iconPosition="right"
                  >
                    {cta.buttonText}
                  </Button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Trust Indicator */}
        <AnimatedSection animation="fade-in" delay={600}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-mint-green rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">LS</span>
                </div>
                <div className="w-8 h-8 bg-orange-soft rounded-full border-2 border-white flex items-center justify-center">
                  <Users size={14} className="text-white" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Laurent Serre</p>
                <p className="text-white/70 text-xs">Expert développement commercial PME</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-xs">Disponible</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Predefined CTA configurations for common use cases
export const defaultResourceCTAs: CTAConfig[] = [
  {
    title: "Coaching Individuel",
    description: "Accompagnement personnalisé pour développer votre performance commerciale et atteindre vos objectifs.",
    buttonText: "Réserver un appel",
    href: "/coach-commercial-entreprise",
    icon: <Target size={24} />,
    variant: "primary",
    highlight: true
  },
  {
    title: "Formation Équipe",
    description: "Bootcamp commercial intensif pour transformer les performances de votre équipe de vente.",
    buttonText: "Découvrir le programme",
    href: "/bootcamp-commercial-intensif",
    icon: <Users size={24} />,
    variant: "secondary"
  },
  {
    title: "Diagnostic Gratuit",
    description: "Évaluation complète de votre organisation commerciale avec recommandations personnalisées.",
    buttonText: "Faire le diagnostic",
    href: "/diagnostic",
    icon: <BookOpen size={24} />,
    variant: "outline"
  },
  {
    title: "Contact Direct",
    description: "Échangeons directement sur vos enjeux commerciaux et trouvons la meilleure solution ensemble.",
    buttonText: "Prendre contact",
    href: "/contact",
    icon: <MessageCircle size={24} />,
    variant: "outline"
  }
];

export default ResourceCTAs;