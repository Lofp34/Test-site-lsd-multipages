import type { Metadata } from 'next';
import ResourcesSection from '@/components/sections/ResourcesSection';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Ressources Gratuites - Outils et Guides | Laurent Serre Développement',
  description: 'Téléchargez nos ressources gratuites pour booster votre performance commerciale : guides, outils, vidéos et stratégies concrètes. 20 ans d\'expérience terrain.',
  keywords: 'ressources commerciales gratuites, outils vente, guide prospection, formation commerciale, PME, développement commercial, closing techniques, scripts téléphoniques, stratégie commerciale',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/ressources',
  },
  openGraph: {
    title: 'Ressources Gratuites - Outils et Guides | Laurent Serre Développement',
    description: 'Téléchargez nos ressources gratuites pour booster votre performance commerciale : guides, outils, vidéos et stratégies concrètes.',
    url: 'https://laurentserre.com/ressources',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
    images: [
      {
        url: 'https://laurentserre.com/laurent.jpg',
        width: 1200,
        height: 630,
        alt: 'Ressources commerciales gratuites Laurent Serre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ressources Gratuites - Outils et Guides | Laurent Serre Développement',
    description: 'Téléchargez nos ressources gratuites pour booster votre performance commerciale : guides, outils, vidéos et stratégies concrètes.',
    images: ['https://laurentserre.com/laurent.jpg'],
    creator: '@laurentserre',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function RessourcesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[70vh] relative overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-ink via-blue-ink/95 to-mint-green/20"></div>
        </div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-mint-green rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-soft rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="animate-fade-in-up mb-8">
              <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
                <span className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></span>
                <span className="font-title font-semibold text-mint-green text-sm md:text-base">
                  Ressources Gratuites • Outils Exclusifs
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
              <span className="block">Boostez votre</span>
              <span className="block text-mint-green">performance commerciale</span>
            </h1>

            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl font-body text-white/95 leading-relaxed drop-shadow-md px-2">
                Découvrez nos ressources exclusives, guides pratiques et outils concrets 
                pour développer votre activité commerciale.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl font-italic text-white/90 leading-relaxed drop-shadow-sm px-2">
                Fruit de 20 ans d'expérience terrain, ces ressources vous aideront à passer à l'action immédiatement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <ResourcesSection />

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Besoin d'un accompagnement personnalisé ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Nos ressources gratuites sont un excellent point de départ. Pour aller plus loin, 
            découvrez nos solutions d'accompagnement sur-mesure.
          </p>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}