'use client';

import HubSpotForm from '@/components/HubSpotForm';
import Button from '@/components/ui/Button';
import AnimatedSection from "@/components/ui/AnimatedSection";
import { trackBusinessEvents } from '@/components/GoogleAnalytics';

export default function FinalCtaSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleCtaClick = (ctaName: string, sectionId?: string) => {
    // Tracking Google Analytics
    trackBusinessEvents.ctaClicked(ctaName, 'final_cta_section');
    
    // Navigation
    if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-anthracite/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Titre principal */}
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-blue-ink dark:text-primary-bg leading-tight mb-6">
              Prêt à transformer
              <span className="block text-mint-green">vos résultats ?</span>
            </h2>
            <p className="text-xl font-body text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Commençons par un échange simple pour comprendre vos enjeux et identifier les opportunités
            </p>
          </div>
        </AnimatedSection>

        {/* CTA principal avec formulaire */}
        <AnimatedSection animation="slide-up" delay={200}>
          <div className="text-center mb-12">
            <div className="bg-gradient-to-br from-mint-green/5 to-blue-ink/5 rounded-3xl p-8 mb-8 shadow-xl border border-mint-green/20">
              <div className="max-w-2xl mx-auto">
                <div className="text-4xl mb-6">🚀</div>
                <h3 className="text-2xl md:text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                  Commençons par échanger 30 minutes
                </h3>
                <p className="text-lg font-body text-gray-anthracite dark:text-primary-bg/80 mb-8 leading-relaxed">
                  Un simple appel pour comprendre vos enjeux, identifier les opportunités et voir comment nous pouvons travailler ensemble.
                </p>
                
                {/* Formulaire HubSpot intégré avec tracking */}
                <div className="bg-white/80 dark:bg-gray-anthracite/40 rounded-2xl p-6 mb-6">
                  <div 
                    onFocus={() => trackBusinessEvents.ctaClicked('contact_form_focused', 'final_cta_section')}
                  >
                    <HubSpotForm />
                  </div>
                </div>

                {/* Alternative Calendly */}
                <div className="border-t border-mint-green/20 pt-6">
                  <p className="text-sm font-body text-gray-anthracite dark:text-primary-bg/70 mb-4">
                    Ou choisissez directement un créneau dans mon agenda
                  </p>
                  <Button 
                    variant="secondary"
                    icon="📅"
                    onClick={() => {
                      handleCtaClick('hubspot_calendar_access');
                      window.open('https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone', '_blank');
                    }}
                    className="border-2 border-mint-green text-mint-green hover:bg-mint-green hover:text-white"
                  >
                    Prenez rendez-vous directement dans mon agenda
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTAs secondaires */}
        <AnimatedSection animation="fade-in" delay={400}>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-mint-green/5 border border-mint-green/20 rounded-2xl p-6 text-center hover:bg-mint-green/10 transition-all duration-300 hover:scale-[1.02] group">
              <div className="text-3xl mb-4 group-hover:animate-bounce-in">📚</div>
              <h3 className="font-title font-bold text-blue-ink dark:text-primary-bg mb-3">
                Ressources gratuites
              </h3>
              <p className="font-body text-gray-anthracite dark:text-primary-bg/80 text-sm mb-4">
                Accédez à nos guides et outils pour améliorer vos ventes
              </p>
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => handleCtaClick('ressources_gratuites')}
                className="bg-mint-green text-white hover:bg-mint-green/90 shadow-lg"
              >
                Télécharger les ressources
              </Button>
            </div>

            <div className="bg-blue-ink/5 border border-blue-ink/20 rounded-2xl p-6 text-center hover:bg-blue-ink/10 transition-all duration-300 hover:scale-[1.02] group">
              <div className="text-3xl mb-4 group-hover:animate-bounce-in">🎯</div>
              <h3 className="font-title font-bold text-blue-ink dark:text-primary-bg mb-3">
                Faire le diagnostic
              </h3>
              <p className="font-body text-gray-anthracite dark:text-primary-bg/80 text-sm mb-4">
                Évaluez votre maturité commerciale en 2 minutes
              </p>
              <Button 
                variant="primary"
                size="sm"
                onClick={() => handleCtaClick('lancer_diagnostic', 'diagnostic')}
              >
                Lancer le test gratuit
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Réassurance finale */}
        <AnimatedSection animation="fade-in" delay={600}>
          <div className="text-center mt-12">
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-2">⏱️</div>
                <p className="font-body text-sm text-gray-anthracite dark:text-primary-bg/80">
                  Premier échange gratuit
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🤝</div>
                <p className="font-body text-sm text-gray-anthracite dark:text-primary-bg/80">
                  Aucun engagement
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <p className="font-body text-sm text-gray-anthracite dark:text-primary-bg/80">
                  Solutions sur mesure
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
} 