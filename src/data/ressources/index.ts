// Export de toutes les données de ressources

export { default as tableauBordData } from './tableau-bord-data';
export { default as grilleEvaluationData } from './grille-evaluation-data';
export { default as reportingData } from './reporting-data';

import tableauBordData from './tableau-bord-data';
import grilleEvaluationData from './grille-evaluation-data';
import reportingData from './reporting-data';

// Collection de toutes les ressources
export const allResourcesData = {
  'outil-tableau-bord': tableauBordData,
  'grille-evaluation': grilleEvaluationData,
  'reporting-automatise': reportingData
};

// Helper pour récupérer une ressource par slug
export const getResourceBySlug = (slug: string) => {
  return allResourcesData[slug as keyof typeof allResourcesData];
};

// Liste de toutes les ressources
export const resourcesList = [
  tableauBordData,
  grilleEvaluationData,
  reportingData
];

// Ressources par catégorie
export const resourcesByCategory = {
  'tableau-bord': [tableauBordData],
  'evaluation': [grilleEvaluationData],
  'reporting': [reportingData]
};

// Configuration SEO globale pour les ressources
export const resourcesGlobalSEO = {
  siteName: 'Laurent Serre',
  baseUrl: 'https://www.laurentserre.com',
  defaultImage: 'https://www.laurentserre.com/images/og-resources-default.jpg',
  twitterHandle: '@laurentserre',
  author: {
    name: 'Laurent Serre',
    url: 'https://www.laurentserre.com',
    description: 'Expert en développement commercial PME depuis 20 ans'
  }
};