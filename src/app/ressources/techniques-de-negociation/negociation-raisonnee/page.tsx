import { Metadata } from 'next';
import { negociationRaisonneeData } from '@/data/techniques/negociation-raisonnee-data';
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

// Génération des métadonnées SEO avec thème vert équilibre
export const metadata: Metadata = SEOGenerator.generateMetadata({
  technique: negociationRaisonneeData,
  ...seoConfig
});

/**
 * Page dédiée à la technique "La négociation raisonnée"
 * Thème vert équilibre - Approche Harvard gagnant-gagnant
 */
export default function NegociationRaisonneePage() {
  return (
    <TechniquePage 
      technique={negociationRaisonneeData}
      seoConfig={seoConfig}
    />
  );
}

// Génération des données structurées Schema.org pour l'approche Harvard
export function generateStructuredData() {
  return SEOGenerator.generateStructuredData({
    technique: negociationRaisonneeData,
    ...seoConfig
  });
}