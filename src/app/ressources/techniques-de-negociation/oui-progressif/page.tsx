import { Metadata } from 'next';
import { ouiProgressifData } from '@/data/techniques/oui-progressif-data';
import { SEOGenerator } from '@/utils/negotiation/seo-generator';
import TechniquePage from '@/components/templates/TechniquePage';

// Configuration SEO pour Laurent Serre
const seoConfig = {
  baseUrl: 'https://laurent-serre-developpement.fr',
  authorInfo: {
    name: 'Laurent Serre',
    url: 'https://laurent-serre-developpement.fr/a-propos',
    image: 'https://laurent-serre-developpement.fr/images/laurent-serre.jpg',
    description: 'Expert en développement commercial PME avec 20 ans d\'expérience terrain. Formateur et coach spécialisé dans les techniques de négociation avancées.'
  },
  organizationInfo: {
    name: 'Laurent Serre Développement',
    url: 'https://laurent-serre-developpement.fr',
    logo: 'https://laurent-serre-developpement.fr/images/logo-laurent-serre.png',
    description: 'Cabinet de conseil en développement commercial pour PME. Formation, coaching et transformation commerciale.'
  }
};

// Génération des métadonnées SEO avec thème violet persuasion
export const metadata: Metadata = SEOGenerator.generateMetadata({
  technique: ouiProgressifData,
  ...seoConfig
});

/**
 * Page dédiée à la technique "La technique du Oui progressif"
 * Thème violet persuasion - Technique d'engagement progressif Cialdini
 */
export default function OuiProgressifPage() {
  return (
    <TechniquePage 
      technique={ouiProgressifData}
      seoConfig={seoConfig}
    />
  );
}

// Génération des données structurées Schema.org pour l'engagement progressif
export function generateStructuredData() {
  return SEOGenerator.generateStructuredData({
    technique: ouiProgressifData,
    ...seoConfig
  });
}