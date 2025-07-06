import dynamic from 'next/dynamic';
import type { Metadata, Viewport } from 'next';
import Button from "@/components/ui/Button";
import Link from "next/link";

const TestimonialVideoSection = dynamic(() => import('@/components/sections/TestimonialVideoSection'));
const FinalCtaSection = dynamic(() => import('@/components/sections/FinalCtaSection'));

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Cas clients & Témoignages – Laurent Serre',
  description: 'Découvrez les résultats concrets obtenus avec nos clients : amélioration des performances commerciales, structuration des équipes, ROI mesurable.',
  alternates: {
    canonical: 'https://laurentserre.com/cas-clients',
  },
};

export default function CasClientsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section pour Cas Clients */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-ink via-blue-ink/95 to-mint-green/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
              <span className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></span>
              <span className="font-title font-semibold text-mint-green text-sm md:text-base">
                Preuves sociales & Résultats
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
              <span className="block">Cas</span>
              <span className="block text-mint-green">Clients</span>
            </h1>

            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-white/95 leading-relaxed drop-shadow-md px-2">
                Découvrez les résultats concrets obtenus avec nos clients : performances commerciales améliorées, équipes structurées, ROI mesurable.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl font-italic text-white/90 leading-relaxed drop-shadow-sm px-2">
                Témoignages authentiques de dirigeants qui ont transformé leur approche commerciale.
              </p>
            </div>

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
              
              <Link href="/bootcamp">
                <Button 
                  variant="outline"
                  size="lg"
                  icon="🚀"
                  className="w-full sm:w-auto"
                >
                  Découvrir le bootcamp
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TestimonialVideoSection />
      <FinalCtaSection />
    </main>
  );
}