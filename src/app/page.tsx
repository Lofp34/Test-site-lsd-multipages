import type { Metadata } from 'next';
import ClientPageWrapper from '@/components/ClientPageWrapper';

export const metadata: Metadata = {
  title: 'Laurent Serre Développement - Expert Commercial & Formation',
  description: 'Accompagnement commercial pour PME : structuration des équipes, formation à la vente, méthodes éprouvées. 20 ans d\'expérience terrain + outils IA.',
  alternates: {
    canonical: 'https://laurentserre.com',
  },
  other: {
    // Indiquer que le chat est un élément interactif non-critique pour le SEO
    'chat-widget': 'interactive-enhancement',
  },
};

export default function Home() {
  return <ClientPageWrapper />;
}