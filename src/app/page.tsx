import type { Metadata } from 'next';
import ClientPageWrapper from '@/components/ClientPageWrapper';

export const metadata: Metadata = {
  title: 'Laurent Serre Développement — Accompagnement Commercial & Formation PME',
  description: 'Accompagnement commercial pour PME : structuration des équipes, formation à la vente, méthodes éprouvées. Diagnostic gratuit, bootcamp intensif, coaching terrain. 20 ans d\'expérience + outils IA.',
  alternates: {
    canonical: 'https://www.laurentserre.com',
  },
  other: {
    // Indiquer que le chat est un élément interactif non-critique pour le SEO
    'chat-widget': 'interactive-enhancement',
  },
};

export default function Home() {
  return <ClientPageWrapper />;
}