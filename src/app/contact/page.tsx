import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Button from "@/components/ui/Button";


const FinalCtaSection = dynamic(() => import('@/components/sections/FinalCtaSection'));

export const metadata: Metadata = {
  title: 'Contact – Laurent Serre Développement',
  description: 'Contactez Laurent Serre pour discuter de vos besoins en développement commercial. Prise de contact rapide et personnalisée.',
  alternates: {
    canonical: 'https://laurentserre.com/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section pour Contact */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-ink via-blue-ink/95 to-mint-green/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
              <span className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></span>
              <span className="font-title font-semibold text-mint-green text-sm md:text-base">
                Prise de Contact
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
              <span className="block">Prenons</span>
              <span className="block text-mint-green">Contact</span>
            </h1>

            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-white/95 leading-relaxed drop-shadow-md px-2">
                Discutons de vos enjeux commerciaux et voyons comment je peux vous accompagner vers la réussite.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl font-italic text-white/90 leading-relaxed drop-shadow-sm px-2">
                Échange gratuit et sans engagement pour mieux comprendre vos besoins.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row justify-center items-center pt-6 sm:pt-8 pb-12 sm:pb-16 px-4">
              <a href="tel:+33614944060" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="primary"
                  size="lg"
                  icon="📞"
                  className="w-full sm:w-auto"
                >
                  Appeler Laurent Serre
                </Button>
              </a>
              <a href="https://meetings.hubspot.com/laurent34/rdv-laurent-45-mn-clone" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline"
                  size="lg"
                  icon="📅"
                  className="w-full sm:w-auto"
                >
                  Prendre rendez-vous
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </main>
  );
}