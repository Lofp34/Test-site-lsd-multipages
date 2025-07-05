import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Button from "@/components/ui/Button";
import Link from "next/link";

const DiagnosticSection = dynamic(() => import('@/components/sections/DiagnosticSection'));

export const metadata: Metadata = {
  title: 'Diagnostic Commercial Gratuit - Évaluez votre Équipe | Laurent Serre',
  description: 'Diagnostic commercial gratuit pour PME : évaluez la performance de votre équipe commerciale, identifiez les axes d\'amélioration. Audit personnalisé sans engagement.',
  keywords: 'diagnostic commercial gratuit, audit équipe commerciale, PME, évaluation performance vente, Montpellier',
  alternates: {
    canonical: 'https://laurentserre.com/diagnostic',
  },
  openGraph: {
    title: 'Diagnostic Commercial Gratuit - Évaluez votre Équipe',
    description: 'Diagnostic commercial gratuit pour PME : évaluez la performance de votre équipe commerciale, identifiez les axes d\'amélioration.',
    url: 'https://laurentserre.com/diagnostic',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurentserre.com/tableau-de-bord.jpeg',
        width: 1200,
        height: 630,
        alt: 'Diagnostic commercial gratuit Laurent Serre - Tableau de bord performance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnostic Commercial Gratuit - Évaluez votre Équipe',
    description: 'Diagnostic commercial gratuit pour PME : évaluez la performance de votre équipe commerciale, identifiez les axes d\'amélioration.',
    images: ['https://laurentserre.com/tableau-de-bord.jpeg'],
  },
};

export default function DiagnosticPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section pour Diagnostic */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-ink via-blue-ink/95 to-orange-soft/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-6 py-3 rounded-full">
              <span className="w-3 h-3 bg-orange-soft rounded-full animate-pulse"></span>
              <span className="font-title font-semibold text-orange-soft text-sm md:text-base">
                Diagnostic Commercial Gratuit
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
              <span className="block">Diagnostic</span>
              <span className="block text-orange-soft">Gratuit</span>
            </h1>

            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-white/95 leading-relaxed drop-shadow-md px-2">
                Évaluez la performance de votre équipe commerciale et identifiez les axes d'amélioration prioritaires.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl font-italic text-white/90 leading-relaxed drop-shadow-sm px-2">
                Audit personnalisé, recommandations concrètes, sans engagement.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row justify-center items-center pt-6 sm:pt-8 pb-12 sm:pb-16 px-4">
              <Link href="/bootcamp">
                <Button 
                  variant="primary"
                  size="lg"
                  icon="🚀"
                  className="w-full sm:w-auto"
                >
                  Découvrir le bootcamp
                </Button>
              </Link>
              
              <Link href="/cas-clients">
                <Button 
                  variant="outline"
                  size="lg"
                  icon="👥"
                  className="w-full sm:w-auto"
                >
                  Témoignages clients
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DiagnosticSection />
    </main>
  );
} 