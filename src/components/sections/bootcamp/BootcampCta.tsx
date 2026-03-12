'use client';

import HubSpotForm from '@/components/HubSpotForm';
import Button from '@/components/ui/Button';
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function BootcampCta() {
  return (
    <section id="bootcamp-contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Titre */}
        <AnimatedSection animation="slide-up" delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-blue-ink leading-tight mb-6">
              Prêt à transformer
              <span className="block text-mint-green">vos résultats commerciaux ?</span>
            </h2>
            <p className="text-xl font-body text-gray-anthracite/80 max-w-3xl mx-auto">
              Réservez un appel gratuit de 30 minutes pour échanger sur vos enjeux
              et voir si le Bootcamp est fait pour vous.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Option 1 : Prise de RDV directe (prioritaire) */}
          <AnimatedSection animation="slide-up" delay={200}>
            <div className="bg-gradient-to-br from-mint-green/5 to-blue-ink/5 rounded-3xl p-8 shadow-xl border-2 border-mint-green/30 h-full flex flex-col">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-mint-green text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  Recommandé
                </div>
                <h3 className="text-2xl md:text-3xl font-title font-bold text-blue-ink mb-3">
                  Réservez directement un créneau
                </h3>
                <p className="text-lg font-body text-gray-anthracite/80 leading-relaxed">
                  Choisissez un créneau dans l'agenda de Laurent pour un échange personnalisé de 30 minutes.
                </p>
              </div>

              <div className="flex-grow flex flex-col justify-center items-center gap-6 py-6">
                <Button
                  variant="primary"
                  size="lg"
                  icon="📅"
                  onClick={() => window.open('https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone', '_blank')}
                  className="w-full sm:w-auto sm:min-w-[280px] bg-mint-green hover:bg-mint-green/90 text-white shadow-lg"
                >
                  Choisir un créneau maintenant
                </Button>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-anthracite/70">
                  <span className="flex items-center gap-1">
                    <span className="text-mint-green">&#10003;</span> Gratuit
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-mint-green">&#10003;</span> 30 minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-mint-green">&#10003;</span> Sans engagement
                  </span>
                </div>
              </div>

              {/* Ce que vous obtiendrez */}
              <div className="bg-white/80 rounded-2xl p-6 mt-auto">
                <p className="font-title font-semibold text-blue-ink mb-3 text-sm">Durant cet appel, nous allons :</p>
                <ul className="space-y-2 text-sm text-gray-anthracite/80">
                  <li className="flex items-start gap-2">
                    <span className="text-mint-green mt-0.5">&#10003;</span>
                    Analyser votre situation commerciale actuelle
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mint-green mt-0.5">&#10003;</span>
                    Identifier vos 3 leviers de croissance prioritaires
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mint-green mt-0.5">&#10003;</span>
                    Voir si le Bootcamp peut vous aider concrètement
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Option 2 : Formulaire de contact */}
          <AnimatedSection animation="slide-up" delay={400}>
            <div className="bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-3xl p-8 shadow-xl border border-blue-ink/10 h-full flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-title font-bold text-blue-ink mb-3">
                  Ou envoyez-nous un message
                </h3>
                <p className="text-lg font-body text-gray-anthracite/80 leading-relaxed">
                  Décrivez-nous vos enjeux et nous vous recontacterons sous 24h.
                </p>
              </div>

              <div className="flex-grow">
                <HubSpotForm
                  portalId="7401198"
                  formId="884e2971-2d90-4ca1-86ee-eb824f43f074"
                  region="na1"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Réassurance finale */}
        <AnimatedSection animation="fade-in" delay={600}>
          <div className="text-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-2">&#9200;</div>
                <p className="font-body text-sm text-gray-anthracite/70">
                  Premier échange gratuit
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">&#129309;</div>
                <p className="font-body text-sm text-gray-anthracite/70">
                  Aucun engagement
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">&#127942;</div>
                <p className="font-body text-sm text-gray-anthracite/70">
                  Certifié Qualiopi
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">&#128176;</div>
                <p className="font-body text-sm text-gray-anthracite/70">
                  Finançable OPCO
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
