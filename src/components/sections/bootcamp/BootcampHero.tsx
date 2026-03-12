'use client';

import { useMemo } from 'react';
import Button from "@/components/ui/Button";

function getNextSessionDate(): string {
  const now = new Date();
  // Ajouter 3 semaines
  const target = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);
  // Trouver le prochain lundi (1 = lundi)
  const dayOfWeek = target.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
  target.setDate(target.getDate() + daysUntilMonday);

  return target.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BootcampHero() {
  const nextSessionDate = useMemo(() => getNextSessionDate(), []);

  const scrollToContact = () => {
    document.getElementById('bootcamp-contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-ink via-blue-ink/95 to-mint-green/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
            <span className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></span>
            <span className="font-title font-semibold text-mint-green text-sm md:text-base">
              Places limitées — Prochaine session le {nextSessionDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
            <span className="block">Bootcamp</span>
            <span className="block text-mint-green">Commercial</span>
          </h1>

          <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-white/95 leading-relaxed drop-shadow-md px-2">
              42h d&apos;accompagnement intensif pour transformer votre force de vente
              en une équipe structurée, outillée et performante.
            </p>

            {/* Chiffres clés en ligne */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 pt-2">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-title font-bold text-mint-green">97%</div>
                <div className="text-sm text-white/80">de satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-title font-bold text-mint-green">+50%</div>
                <div className="text-sm text-white/80">de performance moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-title font-bold text-mint-green">0%</div>
                <div className="text-sm text-white/80">d&apos;abandon</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-title font-bold text-orange-soft">6 950&euro;</div>
                <div className="text-sm text-white/80">H.T. / 6 personnes</div>
              </div>
            </div>
          </div>

          {/* CTAs de conversion directe */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row justify-center items-center pt-6 sm:pt-8 pb-12 sm:pb-16 px-4">
            <Button
              variant="primary"
              size="lg"
              icon="📅"
              className="w-full sm:w-auto sm:min-w-[320px]"
              onClick={() => window.open('https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone', '_blank')}
            >
              Réserver un appel de 30 min (gratuit)
            </Button>

            <Button
              variant="outline"
              size="lg"
              icon="👇"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-ink"
              onClick={scrollToContact}
            >
              Voir comment ça fonctionne
            </Button>
          </div>

          {/* Réassurance */}
          <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-mint-green">&#10003;</span> Sans engagement
            </span>
            <span className="flex items-center gap-2">
              <span className="text-mint-green">&#10003;</span> Certifié Qualiopi
            </span>
            <span className="flex items-center gap-2">
              <span className="text-mint-green">&#10003;</span> Finançable OPCO
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-mint-green rounded-full flex justify-center bg-white/10 backdrop-blur-sm shadow-lg">
          <div className="w-1 h-3 bg-mint-green rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
