import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import BootcampHero from '@/components/sections/bootcamp/BootcampHero';

const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection'));
const PromiseSection = dynamic(() => import('@/components/sections/PromiseSection'));
const BootcampTestimonials = dynamic(() => import('@/components/sections/bootcamp/BootcampTestimonials'));
const BootcampCta = dynamic(() => import('@/components/sections/bootcamp/BootcampCta'));
const ResultsSection = dynamic(() => import('@/components/sections/ResultsSection'));

export const metadata: Metadata = {
  title: 'Bootcamp Commercial pour PME - Formation Intensive | Laurent Serre',
  description: 'Transformez votre équipe commerciale avec notre bootcamp intensif. Méthodes éprouvées, accompagnement terrain et résultats mesurables pour PME. 20 ans d\'expérience.',
  keywords: 'bootcamp commercial, formation équipe commerciale, PME, accompagnement vente, structuration commerciale, Montpellier',
  alternates: {
    canonical: 'https://www.laurentserre.com/bootcamp',
  },
  openGraph: {
    title: 'Bootcamp Commercial pour PME - Formation Intensive',
    description: 'Transformez votre équipe commerciale avec notre bootcamp intensif. Méthodes éprouvées et résultats mesurables.',
    url: 'https://www.laurentserre.com/bootcamp',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/equipe_bureau.jpg',
        width: 1200,
        height: 630,
        alt: 'Bootcamp commercial Laurent Serre - Formation équipe commerciale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bootcamp Commercial pour PME - Formation Intensive',
    description: 'Transformez votre équipe commerciale avec notre bootcamp intensif. Méthodes éprouvées et résultats mesurables.',
    images: ['https://www.laurentserre.com/equipe_bureau.jpg'],
  },
};

export default function BootcampPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <BootcampHero />
      <ProcessSection />
      <PromiseSection />
      <BootcampTestimonials />
      <BootcampCta />
      <ResultsSection />
    </main>
  );
}
