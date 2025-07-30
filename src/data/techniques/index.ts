// Export centralisé de toutes les techniques de négociation

export { effetMiroirData } from './effet-miroir-data';
export { silenceStrategiqueData } from './silence-strategique-data';
export { negociationRaisonneeData } from './negociation-raisonnee-data';
export { ancrageTactiqueData } from './ancrage-tactique-data';
export { ouiProgressifData } from './oui-progressif-data';
export { recadrageValeurData } from './recadrage-valeur-data';
export { concessionCalculeeData } from './concession-calculee-data';

// Collection de toutes les techniques
import { effetMiroirData } from './effet-miroir-data';
import { silenceStrategiqueData } from './silence-strategique-data';
import { negociationRaisonneeData } from './negociation-raisonnee-data';
import { ancrageTactiqueData } from './ancrage-tactique-data';
import { ouiProgressifData } from './oui-progressif-data';
import { recadrageValeurData } from './recadrage-valeur-data';
import { concessionCalculeeData } from './concession-calculee-data';

export const allTechniquesData = [
  effetMiroirData,
  silenceStrategiqueData,
  negociationRaisonneeData,
  ancrageTactiqueData,
  ouiProgressifData,
  recadrageValeurData,
  concessionCalculeeData
];

// Helper pour récupérer une technique par son ID
export const getTechniqueById = (id: string) => {
  return allTechniquesData.find(technique => technique.id === id);
};

// Helper pour récupérer une technique par son slug
export const getTechniqueBySlug = (slug: string) => {
  return allTechniquesData.find(technique => technique.slug === slug);
};

// Helper pour récupérer les techniques par catégorie
export const getTechniquesByCategory = (category: string) => {
  return allTechniquesData.filter(technique => technique.category === category);
};

// Helper pour récupérer les techniques liées
export const getRelatedTechniques = (currentTechniqueId: string) => {
  const currentTechnique = getTechniqueById(currentTechniqueId);
  if (!currentTechnique) return [];
  
  return currentTechnique.relatedTechniques
    .map(id => getTechniqueById(id))
    .filter(Boolean);
};