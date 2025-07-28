'use client';

import React from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import NegotiationCTA from '@/components/ui/NegotiationCTA';
import { trackSectionView, trackAdvancedUserJourney } from '@/utils/cta-tracking';

interface ConversionCTAsProps {
  techniqueName: string;
  className?: string;
}

const ConversionCTAs: React.FC<ConversionCTAsProps> = ({
  techniqueName,
  className = ''
}) => {
  React.useEffect(() => {
    // Track section view
    trackSectionView('conversion_ctas');
  }, []);

  const handleCTAInteraction = (ctaType: string) => {
    trackAdvancedUserJourney({
      fromSection: 'conversion_ctas',
      toSection: ctaType,
      timeSpent: Date.now() - (window as any).sectionStartTime || 0
    });
  };

  return (
    <section className={`py-16 ${className}`} aria-labelledby="conversion-ctas-title">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection animation="fade-in" delay={0}>
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/20 text-red-600 font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
              🎯 Prêt à passer à l'action ?
            </span>
            <h2 id="conversion-ctas-title" className="text-3xl md:text-4xl font-bold text-primary-title mb-4">
              Maîtrisez "{techniqueName}" avec Laurent Serre
            </h2>
            <p className="text-lg text-primary-secondary/90 leading-relaxed max-w-3xl mx-auto">
              Transformez cette technique en avantage concurrentiel grâce à un accompagnement personnalisé 
              et des outils pratiques éprouvés sur le terrain.
            </p>
          </div>
        </AnimatedSection>

        {/* Primary CTAs Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Diagnostic Commercial CTA */}
          <AnimatedSection animation="slide-up" delay={100}>
            <NegotiationCTA
              variant="diagnostic"
              title="Diagnostic Commercial Gratuit"
              description="Évaluez votre niveau actuel en négociation et recevez un plan d'action personnalisé pour intégrer cette technique dans votre processus commercial."
              buttonText="Démarrer mon diagnostic"
              href="/diagnostic"
              icon={<span>📊</span>}
              ctaId="conversion-diagnostic"
              section="conversion_ctas"
              position={1}
              className="h-full"
            />
          </AnimatedSection>

          {/* Bootcamp Commercial CTA */}
          <AnimatedSection animation="slide-up" delay={200}>
            <NegotiationCTA
              variant="bootcamp"
              title="Bootcamp Commercial Intensif"
              description="Formation complète de 3 jours pour maîtriser cette technique et 7 autres méthodes de négociation avancées. Prochaine session à Montpellier."
              buttonText="Découvrir le bootcamp"
              href="/formation-commerciale-pme"
              icon={<span>🚀</span>}
              ctaId="conversion-bootcamp"
              section="conversion_ctas"
              position={2}
              className="h-full"
            />
          </AnimatedSection>
        </div>

        {/* Secondary CTAs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Consultation Personnalisée CTA */}
          <AnimatedSection animation="slide-up" delay={300}>
            <NegotiationCTA
              variant="consultation"
              title="Consultation Personnalisée"
              description="Séance individuelle de 90 minutes pour adapter cette technique à votre secteur d'activité et vos enjeux commerciaux spécifiques."
              buttonText="Réserver ma consultation"
              href="/contact"
              icon={<span>👨‍💼</span>}
              ctaId="conversion-consultation"
              section="conversion_ctas"
              position={3}
              className="h-full"
            />
          </AnimatedSection>

          {/* Ressources Complémentaires CTA */}
          <AnimatedSection animation="slide-up" delay={400}>
            <NegotiationCTA
              variant="resources"
              title="Ressources Complémentaires"
              description="Accédez à notre bibliothèque complète de guides, scripts et outils pour approfondir vos compétences en négociation commerciale."
              buttonText="Explorer les ressources"
              href="/ressources"
              icon={<span>📚</span>}
              ctaId="conversion-resources"
              section="conversion_ctas"
              position={4}
              className="h-full"
            />
          </AnimatedSection>
        </div>

        {/* Urgency and Social Proof Section */}
        <AnimatedSection animation="fade-in" delay={500}>
          <div className="mt-12 p-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl border border-red-200/30">
            <div className="text-center">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">
                ⏰ Offre Limitée - Janvier 2025
              </h3>
              <p className="text-primary-secondary/90 mb-6 leading-relaxed">
                Les 20 premiers participants au diagnostic commercial recevront gratuitement 
                le guide "8 Techniques de Négociation FBI" (valeur 47€) et un accès privilégié 
                au prochain bootcamp avec 30% de réduction.
              </p>
              
              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-red-200/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">847</div>
                  <div className="text-sm text-primary-secondary/70">Dirigeants formés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">+34%</div>
                  <div className="text-sm text-primary-secondary/70">Taux de closing moyen</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">4.9/5</div>
                  <div className="text-sm text-primary-secondary/70">Satisfaction client</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Trust Indicators */}
        <AnimatedSection animation="fade-in" delay={600}>
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-primary-secondary/70">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Satisfaction garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>20 ans d'expérience terrain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Méthodes éprouvées en PME</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Suivi personnalisé inclus</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ConversionCTAs;