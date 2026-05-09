import { Metadata } from 'next';
import { ancrageTactiqueData } from '@/data/techniques/ancrage-tactique-data';
import { SEOGenerator } from '@/utils/negotiation/seo-generator';
import TechniquePage from '@/components/templates/TechniquePage';

// Configuration SEO pour Laurent Serre
const seoConfig = {
  baseUrl: 'https://www.laurentserre.com',
  authorInfo: {
    name: 'Laurent Serre',
    url: 'https://www.laurentserre.com/a-propos',
    image: 'https://www.laurentserre.com/images/laurent-serre.jpg',
    description: 'Expert en développement commercial PME avec 20 ans d\'expérience terrain. Formateur et coach spécialisé dans les techniques de négociation avancées.'
  },
  organizationInfo: {
    name: 'Laurent Serre',
    url: 'https://www.laurentserre.com',
    logo: 'https://www.laurentserre.com/images/logo-laurent-serre.png',
    description: 'Cabinet de conseil en développement commercial pour PME. Formation, coaching et transformation commerciale.'
  }
};

// Génération des métadonnées SEO avec thème orange influence
export const metadata: Metadata = SEOGenerator.generateMetadata({
  technique: ancrageTactiqueData,
  ...seoConfig
});

/**
 * Page dédiée à la technique "L'ancrage tactique"
 * Thème orange influence - Technique d'influence cognitive Kahneman
 */
export default function AncrageTactiquePage() {
  return (
    <TechniquePage 
      technique={ancrageTactiqueData}
      seoConfig={seoConfig}
    />
  );
}

// Génération des données structurées Schema.org pour l'influence cognitive
export function generateStructuredData() {
  return SEOGenerator.generateStructuredData({
    technique: ancrageTactiqueData,
    ...seoConfig
  });
}