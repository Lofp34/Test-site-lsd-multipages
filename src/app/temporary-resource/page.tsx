/**
 * Page temporaire générique pour ressources manquantes
 * 
 * Cette page peut être utilisée via des redirections pour afficher
 * une page temporaire pour n'importe quelle ressource manquante.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TemporaryResourcePage from '@/components/ui/TemporaryResourcePage';

interface PageProps {
  searchParams: {
    url?: string;
    source?: string;
    type?: string;
    title?: string;
    description?: string;
    estimated?: string;
    priority?: string;
  };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resourceUrl = searchParams.url;
  const title = searchParams.title || 'Ressource en développement';
  
  return {
    title: `${title} | Laurent Serre Développement`,
    description: searchParams.description || 'Cette ressource est actuellement en cours de développement et sera disponible prochainement.',
    robots: 'noindex, nofollow', // Éviter l'indexation des pages temporaires
    openGraph: {
      title: `${title} | Laurent Serre Développement`,
      description: searchParams.description || 'Ressource en cours de développement',
      type: 'website',
      locale: 'fr_FR',
    },
  };
}

export default function TemporaryResourcePageRoute({ searchParams }: PageProps) {
  const resourceUrl = searchParams.url;
  const sourceUrl = searchParams.source || '/';
  
  // URL est requise
  if (!resourceUrl) {
    notFound();
  }
  
  // Valider le type de ressource
  const validTypes = ['download', 'page', 'guide', 'tool', 'template', 'other'];
  const resourceType = validTypes.includes(searchParams.type || '') 
    ? (searchParams.type as any) 
    : 'other';
  
  // Valider la priorité
  const validPriorities = ['high', 'medium', 'low'];
  const priority = validPriorities.includes(searchParams.priority || '') 
    ? (searchParams.priority as any) 
    : 'medium';
  
  // Décoder les paramètres URL
  const decodedTitle = searchParams.title ? decodeURIComponent(searchParams.title) : undefined;
  const decodedDescription = searchParams.description ? decodeURIComponent(searchParams.description) : undefined;
  const decodedEstimated = searchParams.estimated ? decodeURIComponent(searchParams.estimated) : undefined;
  
  return (
    <TemporaryResourcePage
      resourceUrl={decodeURIComponent(resourceUrl)}
      sourceUrl={decodeURIComponent(sourceUrl)}
      resourceType={resourceType}
      title={decodedTitle}
      description={decodedDescription}
      estimatedDate={decodedEstimated}
      priority={priority}
      alternatives={[
        {
          title: 'Ressources disponibles',
          url: '/ressources',
          description: 'Découvrez toutes nos ressources actuellement disponibles',
          type: 'internal'
        },
        {
          title: 'Nous contacter',
          url: '/contact',
          description: 'Contactez-nous pour des besoins spécifiques',
          type: 'internal'
        }
      ]}
    />
  );
}