// Types pour les techniques de négociation individuelles

export interface NegotiationTechnique {
  id: string;
  slug: string;
  title: string;
  author: string;
  origin: string;
  category: 'closing' | 'psychology' | 'preparation' | 'objection-handling';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  
  // Contenu principal
  description: string;
  psychologyPrinciples: string[];
  businessApplications: string[];
  
  // Expertise Laurent Serre
  laurentVision: string;
  pmeAdaptation: string;
  successMetrics: {
    metric: string;
    value: string;
    context: string;
  }[];
  
  // Guide pratique
  stepByStepGuide: {
    step: number;
    title: string;
    description: string;
    script: string;
    example: string;
    tips: string[];
  }[];
  
  // Cas clients
  caseStudies: {
    industry: string;
    challenge: string;
    application: string;
    results: string;
    metrics: {
      [key: string]: string;
    };
  }[];
  
  // Ressources
  commonMistakes: {
    mistake: string;
    consequence: string;
    solution: string;
  }[];
  
  relatedTechniques: string[];
  downloadableResources: {
    title: string;
    type: string;
    url: string;
  }[];
  
  // SEO
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
  };
  
  // Analytics
  trackingEvents: {
    event: string;
    category: string;
    action: string;
  }[];

  // Témoignages clients
  testimonials?: {
    name: string;
    company: string;
    role: string;
    quote: string;
    result: string;
    avatar: string;
  }[];

  // Badges de crédibilité
  credibilityBadges?: {
    title: string;
    description: string;
    icon: string;
    color: string;
  }[];

  // Checklist interactive
  interactiveChecklist?: {
    category: string;
    items: string[];
  }[];
}

// Structure de page pour les techniques
export interface TechniquePageStructure {
  breadcrumb: {
    label: string;
    href: string;
    current?: boolean;
  }[];
  
  sections: {
    id: string;
    title: string;
    component: string;
    props: object;
    seoHeading: string;
  }[];
  
  ctas: {
    type: 'primary' | 'secondary';
    text: string;
    href: string;
    trackingEvent: string;
    position: string;
  }[];
  
  relatedContent: {
    type: 'technique' | 'article' | 'resource';
    title: string;
    href: string;
    description: string;
  }[];
}

// Props pour les composants de technique
export interface HeroSectionProps {
  technique: {
    title: string;
    author: string;
    context: string;
    description: string;
    keyBenefit: string;
  };
  stats: {
    successRate: string;
    applicationContext: string;
    difficultyLevel: string;
  };
}

export interface ExpertiseSectionProps {
  laurentVision: {
    quote: string;
    adaptation: string;
    pmeContext: string;
  };
  psychologyInsights: {
    principle: string;
    explanation: string;
    businessApplication: string;
  }[];
}

export interface PracticalGuideProps {
  steps: {
    step: number;
    title: string;
    description: string;
    example: string;
    script: string;
    tips: string[];
  }[];
  technique?: NegotiationTechnique;
}

export interface CommonMistakesProps {
  mistakes: {
    mistake: string;
    consequence: string;
    solution: string;
  }[];
}

export interface CaseStudiesProps {
  cases: {
    industry: string;
    situation: string;
    application: string;
    results: string;
    metrics: {
      improvement: string;
      timeframe: string;
    };
  }[];
  laurentFeedback: string;
}

export interface InteractiveToolsProps {
  checklist: {
    category: string;
    items: string[];
  }[];
  downloadableResources: {
    title: string;
    description: string;
    format: string;
    downloadUrl: string;
  }[];
}

// Thème visuel pour les techniques de négociation
export interface NegotiationTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  particleColor: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
}

// Configuration du thème négociation
export const negotiationTheme: NegotiationTheme = {
  primaryColor: '#DC2626', // Rouge principal
  secondaryColor: '#EA580C', // Orange accent
  accentColor: '#F59E0B', // Ambre highlight
  particleColor: '#DC2626',
  gradientFrom: 'from-red-600',
  gradientTo: 'via-orange-500/10 to-primary-bg',
  icon: '🤝'
};

// Métriques de performance pour les techniques
export interface TechniqueMetrics {
  pageLoadTime: number;
  contentLoadTime: number;
  interactionDelay: number;
  conversionEvents: {
    event: string;
    timestamp: number;
    value?: number;
  }[];
}

// Configuration des événements de tracking
export const techniqueTrackingEvents = {
  PAGE_VIEW: 'technique_page_view',
  SECTION_READ: 'technique_section_read',
  RESOURCE_DOWNLOAD: 'technique_resource_download',
  CTA_CLICK: 'technique_cta_click',
  SHARE_SOCIAL: 'technique_share_social',
  TIME_SPENT: 'technique_time_spent'
};