import { ResourceTool } from '../../types/resource-tool';

export const reportingData: ResourceTool = {
  id: 'reporting-automatise',
  slug: 'reporting-automatise',
  title: 'Pack Reporting Automatisé',
  subtitle: 'Templates de reporting commercial',
  description: 'Automatisez votre reporting commercial avec ce pack complet de templates. Rapports CRM, analyses mensuelles, pilotage d\'équipe et présentations direction inclus.',
  category: 'reporting',
  
  features: [
    'Pack de 8 templates de reporting',
    'Rapport CRM automatisé',
    'Analyse mensuelle des performances',
    'Dashboard de pilotage équipe',
    'Présentation direction (PowerPoint)',
    'Suivi des objectifs trimestriels',
    'Analyse de la pipeline commerciale',
    'Reporting ROI actions commerciales'
  ],
  
  benefits: [
    'Automatisation complète du reporting commercial',
    'Gain de temps considérable (8h/mois économisées)',
    'Standardisation des rapports dans l\'entreprise',
    'Amélioration de la communication avec la direction',
    'Suivi précis des performances et tendances',
    'Identification rapide des problèmes et opportunités',
    'Professionnalisation de l\'image commerciale'
  ],
  
  targetAudience: [
    'Directeurs commerciaux',
    'Managers d\'équipes de vente',
    'Responsables CRM',
    'Dirigeants de PME',
    'Consultants en organisation commerciale',
    'Contrôleurs de gestion commerciale'
  ],
  
  deliveryFormat: 'pack',
  estimatedTime: '1h de configuration initiale',
  difficulty: 'avancé',
  prerequisites: [
    'Maîtrise avancée d\'Excel',
    'Accès aux données CRM',
    'Connaissance des KPIs commerciaux',
    'Notions de PowerPoint pour les présentations'
  ],
  
  preview: {
    type: 'image',
    src: '/ressources/previews/reporting-pack-preview.jpg',
    alt: 'Aperçu du pack de templates de reporting',
    thumbnail: '/ressources/previews/reporting-pack-thumb.jpg'
  },
  
  testimonials: [
    {
      name: 'Philippe D.',
      company: 'Solutions Industrielles',
      role: 'Directeur Commercial',
      quote: 'Ce pack m\'a fait gagner 2 jours par mois sur le reporting ! Les templates sont professionnels et les analyses automatiques m\'aident vraiment à piloter mon équipe.',
      result: '2 jours/mois économisés',
      avatar: 'PD'
    },
    {
      name: 'Nathalie B.',
      company: 'Conseil & Formation',
      role: 'Responsable Commercial',
      quote: 'Mes présentations à la direction ont un tout autre niveau maintenant. Les graphiques automatiques et les analyses de tendances impressionnent à chaque fois.',
      result: 'Crédibilité direction +100%',
      avatar: 'NB'
    },
    {
      name: 'Olivier M.',
      company: 'Services Numériques',
      role: 'Manager Commercial',
      quote: 'Le template de pilotage équipe est génial ! Je vois immédiatement qui performe et qui a besoin d\'aide. Mes one-to-one sont beaucoup plus efficaces.',
      result: 'Efficacité management +50%',
      avatar: 'OM'
    }
  ],
  
  caseStudies: [
    {
      company: 'PME Services - Conseil RH',
      industry: 'Conseil en ressources humaines (40 salariés)',
      challenge: 'Reporting manuel chronophage, manque de visibilité sur les tendances, difficultés à communiquer les résultats à la direction',
      solution: 'Déploiement du pack complet avec formation des équipes, automatisation des extractions CRM, standardisation des rapports mensuels',
      results: 'Réduction de 80% du temps de reporting, amélioration de la visibilité sur les tendances, satisfaction direction en hausse',
      metrics: {
        'Temps de reporting': '-80%',
        'Visibilité tendances': '+90%',
        'Satisfaction direction': '+60%',
        'Fréquence reporting': 'Hebdomadaire'
      }
    },
    {
      company: 'PME Industrie - Fabrication Équipements',
      industry: 'Fabrication industrielle (120 salariés)',
      challenge: 'Reporting hétérogène entre régions, difficultés de consolidation, manque d\'analyses prédictives',
      solution: 'Standardisation avec les templates, formation des managers régionaux, mise en place d\'analyses prédictives automatisées',
      results: 'Harmonisation complète du reporting, amélioration de 40% de la précision des prévisions, pilotage unifié',
      metrics: {
        'Standardisation': '100%',
        'Précision prévisions': '+40%',
        'Temps consolidation': '-70%',
        'Satisfaction managers': '9.2/10'
      }
    }
  ],
  
  formConfig: {
    deliveryMethod: 'email',
    requiredFields: {
      email: true,
      firstName: true,
      lastName: true,
      company: true,
      phone: false,
      message: true
    },
    autoResponse: true,
    followUpSequence: true
  },
  
  seoConfig: {
    title: 'Pack Reporting Commercial Automatisé | Templates Gratuits | Laurent Serre',
    description: 'Téléchargez gratuitement notre pack de 8 templates de reporting commercial. Automatisation complète, analyses CRM, pilotage équipe, présentations direction.',
    keywords: [
      'reporting commercial automatisé',
      'templates reporting gratuits',
      'dashboard commercial excel',
      'analyse crm automatique',
      'laurent serre',
      'pilotage équipe commerciale',
      'reporting direction commercial'
    ],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/reporting-automatise',
    openGraph: {
      title: 'Pack Reporting Commercial Automatisé | Templates Gratuits',
      description: 'Automatisez votre reporting commercial avec notre pack gratuit de 8 templates. Analyses CRM, pilotage équipe, présentations direction.',
      image: 'https://laurent-serre-developpement.fr/ressources/og/reporting-pack-og.jpg',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Pack Reporting Commercial Automatisé | Templates Gratuits',
      description: 'Automatisez votre reporting commercial avec notre pack gratuit de 8 templates. Analyses CRM, pilotage équipe.',
      image: 'https://laurent-serre-developpement.fr/ressources/og/reporting-pack-og.jpg'
    },
    structuredData: {
      type: 'Product',
      name: 'Pack Reporting Commercial Automatisé',
      description: 'Pack complet de 8 templates pour automatiser le reporting commercial : CRM, analyses, pilotage équipe, présentations',
      provider: {
        '@type': 'Person',
        name: 'Laurent Serre',
        url: 'https://laurent-serre-developpement.fr'
      },
      downloadUrl: 'https://laurent-serre-developpement.fr/ressources/reporting-automatise',
      fileFormat: 'application/zip',
      contentSize: '15MB',
      datePublished: '2024-03-01',
      dateModified: '2024-12-01'
    }
  },
  
  trackingEvents: [
    {
      event: 'reporting_pack_page_view',
      category: 'Resource',
      action: 'View Reporting Pack Page'
    },
    {
      event: 'reporting_pack_preview_click',
      category: 'Engagement',
      action: 'Click Preview'
    },
    {
      event: 'reporting_pack_form_submit',
      category: 'Conversion',
      action: 'Submit Download Form'
    },
    {
      event: 'reporting_pack_download_success',
      category: 'Conversion',
      action: 'Successful Download'
    }
  ],
  
  relatedResources: ['tableau-bord-commercial', 'grille-evaluation-commerciale'],
  relatedServices: ['coach-commercial-entreprise', 'bootcamp-commercial-intensif'],
  
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#06B6D4',
    gradient: 'bg-gradient-to-br from-blue-600 via-cyan-500/10 to-primary-bg',
    icon: '📈',
    particleColor: '#3B82F6'
  },
  
  stats: {
    downloads: '600+',
    users: '350+',
    satisfaction: '4.9/5',
    templatesInclus: '8',
    tempsEconomise: '8h/mois'
  }
};

export default reportingData;