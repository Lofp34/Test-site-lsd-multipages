// Types pour les outils et ressources téléchargeables

export interface ResourceTool {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: 'tableau-bord' | 'evaluation' | 'reporting' | 'guide' | 'template';
  
  // Caractéristiques de l'outil
  features: string[];
  benefits: string[];
  targetAudience: string[];
  deliveryFormat: 'pdf' | 'excel' | 'template' | 'guide' | 'pack';
  estimatedTime: string;
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  prerequisites?: string[];
  
  // Contenu et aperçu
  preview?: {
    type: 'image' | 'video' | 'demo' | 'document';
    src: string;
    alt: string;
    thumbnail?: string;
  };
  
  // Témoignages et cas d'usage
  testimonials?: {
    name: string;
    company: string;
    role: string;
    quote: string;
    result: string;
    avatar: string;
  }[];
  
  caseStudies?: {
    company: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string;
    metrics: {
      [key: string]: string;
    };
  }[];
  
  // Configuration du formulaire
  formConfig: {
    deliveryMethod: 'email' | 'download' | 'both';
    requiredFields: {
      email: boolean;
      firstName?: boolean;
      lastName?: boolean;
      company?: boolean;
      phone?: boolean;
      message?: boolean;
    };
    autoResponse: boolean;
    followUpSequence?: boolean;
  };
  
  // SEO et métadonnées
  seoConfig: ResourceSEOConfig;
  
  // Analytics et tracking
  trackingEvents: {
    event: string;
    category: string;
    action: string;
  }[];
  
  // Ressources liées
  relatedResources?: string[];
  relatedServices?: string[];
  
  // Configuration visuelle
  theme: {
    primaryColor: string;
    secondaryColor: string;
    gradient: string;
    icon: string;
    particleColor?: string;
  };
  
  // Statistiques et métriques
  stats?: {
    downloads: string;
    users: string;
    satisfaction: string;
    [key: string]: string;
  };
}

export interface ResourceSEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: 'website' | 'article';
  };
  twitter: {
    card: 'summary' | 'summary_large_image';
    title: string;
    description: string;
    image: string;
  };
  structuredData: {
    type: 'DigitalDocument' | 'HowTo' | 'Product' | 'SoftwareApplication';
    name: string;
    description: string;
    provider: {
      '@type': 'Organization' | 'Person';
      name: string;
      url?: string;
    };
    downloadUrl?: string;
    fileFormat?: string;
    contentSize?: string;
    datePublished?: string;
    dateModified?: string;
  };
}

// Configuration pour les pages de ressources
export interface ResourcePageConfig {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    primaryCTA: {
      text: string;
      action: 'download' | 'form' | 'contact';
      trackingEvent: string;
    };
    secondaryCTA?: {
      text: string;
      href: string;
      trackingEvent: string;
    };
    stats?: {
      label: string;
      value: string;
    }[];
  };
  
  sections: {
    toolDescription: boolean;
    features: boolean;
    preview: boolean;
    testimonials: boolean;
    caseStudies: boolean;
    downloadForm: boolean;
    relatedCTAs: boolean;
  };
  
  ctas: ResourceCTA[];
}

export interface ResourceCTA {
  type: 'primary' | 'secondary' | 'outline';
  title: string;
  description: string;
  buttonText: string;
  href: string;
  icon?: string;
  highlight?: boolean;
  trackingEvent: string;
}

// Données par défaut pour les CTAs ressources
export const defaultResourceCTAs: ResourceCTA[] = [
  {
    type: 'primary',
    title: 'Coaching Personnalisé',
    description: 'Accompagnement individuel pour maximiser l\'impact de vos outils',
    buttonText: 'Réserver un appel',
    href: '/coach-commercial-entreprise',
    icon: '🎯',
    highlight: true,
    trackingEvent: 'resource_cta_coaching_click'
  },
  {
    type: 'secondary',
    title: 'Formation Équipe',
    description: 'Formez votre équipe à l\'utilisation optimale des outils commerciaux',
    buttonText: 'Découvrir le bootcamp',
    href: '/bootcamp-commercial-intensif',
    icon: '👥',
    trackingEvent: 'resource_cta_bootcamp_click'
  },
  {
    type: 'outline',
    title: 'Autres Ressources',
    description: 'Découvrez tous nos outils et guides gratuits',
    buttonText: 'Voir toutes les ressources',
    href: '/ressources',
    icon: '📚',
    trackingEvent: 'resource_cta_resources_click'
  }
];

// Types pour les formulaires de ressources
export interface ResourceFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  message?: string;
  resourceId: string;
  source: string;
  timestamp: number;
}

export interface ResourceFormConfig {
  title: string;
  description: string;
  resourceUrl?: string;
  deliveryMethod: 'email' | 'download' | 'both';
  formFields: {
    email: boolean;
    firstName?: boolean;
    lastName?: boolean;
    company?: boolean;
    phone?: boolean;
    message?: boolean;
  };
  validation: {
    email: {
      required: boolean;
      pattern: string;
      message: string;
    };
    firstName?: {
      required: boolean;
      minLength: number;
      message: string;
    };
    company?: {
      required: boolean;
      minLength: number;
      message: string;
    };
    message?: {
      maxLength: number;
      message: string;
    };
  };
  privacyNotice: string;
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
}

// Événements de tracking pour les ressources
export const resourceTrackingEvents = {
  PAGE_VIEW: 'resource_page_view',
  TOOL_PREVIEW: 'resource_tool_preview',
  FORM_START: 'resource_form_start',
  FORM_SUBMIT: 'resource_form_submit',
  DOWNLOAD_SUCCESS: 'resource_download_success',
  CTA_CLICK: 'resource_cta_click',
  TESTIMONIAL_VIEW: 'resource_testimonial_view',
  CASE_STUDY_VIEW: 'resource_case_study_view'
};