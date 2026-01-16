import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import AboutSection from '@/components/sections/AboutSection';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'À propos de Laurent Serre – Expert Commercial',
  description: "Découvrez le parcours de Laurent Serre, expert en développement commercial avec 20 ans d'expérience terrain. Méthodes, valeurs, approche.",
  alternates: {
    canonical: 'https://laurentserre.com/a-propos',
  },
};

export default function AProposPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section pour À propos */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-ink via-blue-ink/95 to-orange-soft/20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-6 py-3 rounded-full">
              <span className="w-3 h-3 bg-orange-soft rounded-full animate-pulse"></span>
              <span className="font-title font-semibold text-orange-soft text-sm md:text-base">
                Parcours & Expertise
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
              À <span className="text-orange-soft">propos</span>
            </h1>
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-white/95 leading-relaxed drop-shadow-md px-2">
                20 ans d'expérience terrain au service de votre développement commercial. Découvrez mon parcours, mes méthodes et mes valeurs.
              </p>
              <p className="text-base sm:text-lg md:text-xl font-italic text-white/90 leading-relaxed drop-shadow-sm px-2">
                Une approche humaine et pragmatique pour des résultats durables.
              </p>
            </div>
            {/* Boutons d'appel à l'action */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row justify-center items-center pt-6 sm:pt-8 pb-12 sm:pb-16 px-4">
              <Link href="/diagnostic">
                <Button 
                  variant="primary"
                  size="lg"
                  icon="🎯"
                  className="w-full sm:w-auto"
                >
                  Faire le diagnostic
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline"
                  size="lg"
                  icon="📞"
                  className="w-full sm:w-auto"
                >
                  Prendre contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation Laurent Serre */}
      <AboutSection />

      {/* Formulaire de contact */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}