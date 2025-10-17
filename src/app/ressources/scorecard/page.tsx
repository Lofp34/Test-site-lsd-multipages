import type { Metadata } from 'next';
import ScorecardLeadMagnet from '@/components/lead-magnet/ScorecardLeadMagnet';

export const metadata: Metadata = {
  title: 'Scorecard Commerciale & Mini-Playbook IA | Laurent Serre Développement',
  description: 'Diagnostiquez vos 5 leviers commerciaux en 12 minutes et repartez avec 3 actions à fort impact. Scorecard + mini-playbook IA by Laurent Serre Développement.',
  openGraph: {
    title: 'Scorecard commerciale + Mini-Playbook IA',
    description: 'Structurez votre force de vente avec la scorecard Laurent Serre Développement.',
    type: 'website',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://laurentserre.com/ressources/scorecard',
  },
};

export default function ScorecardPage() {
  return <ScorecardLeadMagnet />;
}

