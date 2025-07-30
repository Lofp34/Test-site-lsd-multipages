// Export centralisé pour tous les composants sections de négociation

// Ces composants seront créés dans les prochaines tâches
// export { default as HeroSection } from './HeroSection';
// export { default as ExpertiseSection } from './ExpertiseSection';
// export { default as PracticalGuide } from './PracticalGuide';
// export { default as CaseStudies } from './CaseStudies';
// export { default as CommonMistakes } from './CommonMistakes';
// export { default as InteractiveTools } from './InteractiveTools';
// export { default as ConversionCTAs } from './ConversionCTAs';
// export { default as RelatedTechniques } from './RelatedTechniques';

// Types pour les props des composants
export interface BaseSectionProps {
  className?: string;
  id?: string;
}

export interface HeroSectionProps extends BaseSectionProps {
  technique: import('@/types/negotiation-technique').NegotiationTechnique;
  theme: import('@/utils/negotiation/theme-manager').TechniqueTheme;
}

export interface ExpertiseSectionProps extends BaseSectionProps {
  technique: import('@/types/negotiation-technique').NegotiationTechnique;
}

export interface PracticalGuideProps extends BaseSectionProps {
  steps: import('@/types/negotiation-technique').NegotiationTechnique['stepByStepGuide'];
  technique: import('@/types/negotiation-technique').NegotiationTechnique;
}

export interface CaseStudiesProps extends BaseSectionProps {
  cases: import('@/types/negotiation-technique').NegotiationTechnique['caseStudies'];
  laurentFeedback: string;
}

export interface CommonMistakesProps extends BaseSectionProps {
  mistakes: import('@/types/negotiation-technique').NegotiationTechnique['commonMistakes'];
}

export interface InteractiveToolsProps extends BaseSectionProps {
  technique: import('@/types/negotiation-technique').NegotiationTechnique;
}

export interface ConversionCTAsProps extends BaseSectionProps {
  technique: import('@/types/negotiation-technique').NegotiationTechnique;
}

export interface RelatedTechniquesProps extends BaseSectionProps {
  current: string;
  relatedTechniques?: string[];
}

// Configuration des sections disponibles
export const availableSections = [
  'hero',
  'expertise',
  'practical-guide', 
  'case-studies',
  'common-mistakes',
  'interactive-tools',
  'conversion-ctas',
  'related-techniques'
] as const;

export type SectionId = typeof availableSections[number];

// Métadonnées des sections pour l'organisation
export const sectionMetadata: Record<SectionId, {
  title: string;
  description: string;
  order: number;
  required: boolean;
}> = {
  'hero': {
    title: 'Section Hero',
    description: 'Présentation principale de la technique avec thème visuel',
    order: 1,
    required: true
  },
  'expertise': {
    title: 'Vision Laurent Serre',
    description: 'Expertise et adaptation PME française',
    order: 2,
    required: true
  },
  'practical-guide': {
    title: 'Guide Pratique',
    description: 'Guide étape par étape avec scripts et exemples',
    order: 3,
    required: true
  },
  'case-studies': {
    title: 'Cas Clients PME',
    description: 'Exemples concrets d\'application en entreprise',
    order: 4,
    required: true
  },
  'common-mistakes': {
    title: 'Erreurs Courantes',
    description: 'Erreurs à éviter et solutions pratiques',
    order: 5,
    required: true
  },
  'interactive-tools': {
    title: 'Outils Interactifs',
    description: 'Checklists et ressources téléchargeables',
    order: 6,
    required: false
  },
  'conversion-ctas': {
    title: 'CTAs de Conversion',
    description: 'Propositions de formation et coaching',
    order: 7,
    required: true
  },
  'related-techniques': {
    title: 'Techniques Liées',
    description: 'Navigation vers techniques complémentaires',
    order: 8,
    required: false
  }
};

/**
 * Utilitaire pour obtenir les sections dans l'ordre correct
 */
export function getSectionsInOrder(sections: SectionId[] = availableSections): SectionId[] {
  return sections.sort((a, b) => sectionMetadata[a].order - sectionMetadata[b].order);
}

/**
 * Utilitaire pour obtenir les sections requises
 */
export function getRequiredSections(): SectionId[] {
  return availableSections.filter(section => sectionMetadata[section].required);
}

/**
 * Utilitaire pour valider une configuration de sections
 */
export function validateSectionConfiguration(sections: string[]): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Vérifier que toutes les sections existent
  const invalidSections = sections.filter(section => !availableSections.includes(section as SectionId));
  if (invalidSections.length > 0) {
    errors.push(`Sections invalides: ${invalidSections.join(', ')}`);
  }
  
  // Vérifier que les sections requises sont présentes
  const requiredSections = getRequiredSections();
  const missingSections = requiredSections.filter(section => !sections.includes(section));
  if (missingSections.length > 0) {
    errors.push(`Sections requises manquantes: ${missingSections.join(', ')}`);
  }
  
  // Avertissements pour l'ordre des sections
  const validSections = sections.filter(section => availableSections.includes(section as SectionId)) as SectionId[];
  const orderedSections = getSectionsInOrder(validSections);
  if (JSON.stringify(validSections) !== JSON.stringify(orderedSections)) {
    warnings.push('L\'ordre des sections ne suit pas l\'ordre recommandé');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}