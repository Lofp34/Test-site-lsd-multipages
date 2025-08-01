import { ResourceTool } from '../../types/resource-tool';

export const tableauBordData: ResourceTool = {
  id: 'tableau-bord-commercial',
  slug: 'outil-tableau-bord',
  title: 'Tableau de Bord Commercial',
  subtitle: 'Outil de pilotage PME',
  description: 'Suivez vos performances commerciales en temps réel avec cet outil simple et efficace, spécialement conçu pour les PME. Dashboard Excel avec KPIs essentiels, graphiques automatiques et alertes personnalisables.',
  category: 'tableau-bord',
  
  features: [
    'Dashboard Excel prêt à l\'emploi',
    'KPIs commerciaux essentiels',
    'Graphiques automatiques',
    'Alertes et seuils personnalisables',
    'Suivi mensuel et trimestriel',
    'Comparaison objectifs vs réalisé',
    'Analyse de la performance par commercial',
    'Export PDF pour présentations'
  ],
  
  benefits: [
    'Pilotage en temps réel de votre activité commerciale',
    'Identification rapide des écarts et problèmes',
    'Motivation des équipes avec des objectifs clairs',
    'Prise de décision basée sur des données fiables',
    'Gain de temps sur le reporting (2h/semaine économisées)',
    'Amélioration de la visibilité sur les tendances',
    'Standardisation du suivi commercial'
  ],
  
  targetAudience: [
    'Dirigeants de PME (10-100 salariés)',
    'Directeurs commerciaux',
    'Responsables des ventes',
    'Managers d\'équipes commerciales',
    'Consultants en développement commercial'
  ],
  
  deliveryFormat: 'excel',
  estimatedTime: '15 min de configuration',
  difficulty: 'intermédiaire',
  prerequisites: [
    'Notions de base Excel',
    'Accès aux données commerciales de l\'entreprise',
    'Définition préalable des objectifs commerciaux'
  ],
  
  preview: {
    type: 'image',
    src: '/ressources/previews/tableau-bord-preview.jpg',
    alt: 'Aperçu du tableau de bord commercial Excel',
    thumbnail: '/ressources/previews/tableau-bord-thumb.jpg'
  },
  
  testimonials: [
    {
      name: 'Marc D.',
      company: 'TechSolutions PME',
      role: 'Directeur Commercial',
      quote: 'Enfin un outil simple qui me donne une vision claire de ma performance ! Fini les heures perdues à compiler des données dans tous les sens. Maintenant je pilote vraiment mon activité.',
      result: '2h/semaine économisées sur le reporting',
      avatar: 'MD'
    },
    {
      name: 'Sophie L.',
      company: 'Conseil & Stratégie',
      role: 'Fondatrice',
      quote: 'Le tableau de bord de Laurent m\'a permis d\'identifier que 20% de mes prospects généraient 80% de mon CA. J\'ai pu recentrer mes efforts et augmenter ma rentabilité.',
      result: '+25% de rentabilité en 3 mois',
      avatar: 'SL'
    },
    {
      name: 'Thomas R.',
      company: 'Industrie Mécanique',
      role: 'Responsable Grands Comptes',
      quote: 'Mes commerciaux adorent ! Ils voient enfin où ils en sont par rapport aux objectifs. La motivation a clairement augmenté depuis qu\'on utilise cet outil.',
      result: '+15% de performance équipe',
      avatar: 'TR'
    }
  ],
  
  caseStudies: [
    {
      company: 'PME Services - Conseil IT',
      industry: 'Services informatiques (35 salariés)',
      challenge: 'Manque de visibilité sur la performance commerciale, reporting manuel chronophage, difficultés à identifier les leviers d\'amélioration',
      solution: 'Mise en place du tableau de bord commercial avec suivi hebdomadaire des KPIs, formation de l\'équipe à l\'utilisation, définition d\'objectifs SMART',
      results: 'Réduction de 70% du temps de reporting, identification de 3 leviers d\'amélioration majeurs, augmentation de 20% du taux de conversion',
      metrics: {
        'Temps de reporting': '-70%',
        'Taux de conversion': '+20%',
        'Visibilité performance': '+100%',
        'Satisfaction équipe': '9/10'
      }
    },
    {
      company: 'PME Industrie - Équipementier',
      industry: 'Industrie manufacturière (80 salariés)',
      challenge: 'Cycles de vente longs difficiles à suivre, prévisions commerciales imprécises, management commercial basé sur le ressenti',
      solution: 'Adaptation du tableau de bord aux cycles longs, mise en place d\'indicateurs avancés, formation du management à l\'analyse des données',
      results: 'Amélioration de 40% de la précision des prévisions, réduction de 25% des cycles de vente, meilleur pilotage des équipes',
      metrics: {
        'Précision prévisions': '+40%',
        'Cycles de vente': '-25%',
        'Pilotage équipes': '+60%',
        'ROI outil': '300%'
      }
    }
  ],
  
  formConfig: {
    deliveryMethod: 'email',
    requiredFields: {
      email: true,
      firstName: true,
      company: true,
      message: false
    },
    autoResponse: true,
    followUpSequence: true
  },
  
  seoConfig: {
    title: 'Tableau de Bord Commercial Excel | Outil Gratuit PME | Laurent Serre',
    description: 'Téléchargez gratuitement notre tableau de bord commercial Excel. Outil de pilotage simple et efficace pour PME. KPIs, graphiques automatiques, alertes personnalisables.',
    keywords: [
      'tableau de bord commercial',
      'outil pilotage commercial',
      'dashboard excel gratuit',
      'kpi commercial pme',
      'laurent serre',
      'suivi performance commerciale',
      'reporting commercial automatique'
    ],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/outil-tableau-bord',
    openGraph: {
      title: 'Tableau de Bord Commercial Excel | Outil Gratuit PME',
      description: 'Pilotez votre activité commerciale avec notre tableau de bord Excel gratuit. KPIs essentiels, graphiques automatiques, spécialement conçu pour les PME.',
      image: 'https://laurent-serre-developpement.fr/ressources/og/tableau-bord-og.jpg',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Tableau de Bord Commercial Excel | Outil Gratuit PME',
      description: 'Pilotez votre activité commerciale avec notre tableau de bord Excel gratuit. KPIs essentiels, graphiques automatiques.',
      image: 'https://laurent-serre-developpement.fr/ressources/og/tableau-bord-og.jpg'
    },
    structuredData: {
      type: 'SoftwareApplication',
      name: 'Tableau de Bord Commercial Excel',
      description: 'Outil de pilotage commercial pour PME avec KPIs essentiels et graphiques automatiques',
      provider: {
        '@type': 'Person',
        name: 'Laurent Serre',
        url: 'https://laurent-serre-developpement.fr'
      },
      downloadUrl: 'https://laurent-serre-developpement.fr/ressources/outil-tableau-bord',
      fileFormat: 'application/vnd.ms-excel',
      datePublished: '2024-01-15',
      dateModified: '2024-12-01'
    }
  },
  
  trackingEvents: [
    {
      event: 'tableau_bord_page_view',
      category: 'Resource',
      action: 'View Tableau Bord Page'
    },
    {
      event: 'tableau_bord_preview_click',
      category: 'Engagement',
      action: 'Click Preview'
    },
    {
      event: 'tableau_bord_form_submit',
      category: 'Conversion',
      action: 'Submit Download Form'
    },
    {
      event: 'tableau_bord_download_success',
      category: 'Conversion',
      action: 'Successful Download'
    }
  ],
  
  relatedResources: ['grille-evaluation', 'reporting-automatise'],
  relatedServices: ['coach-commercial-entreprise', 'bootcamp-commercial-intensif'],
  
  theme: {
    primaryColor: '#00BDA4',
    secondaryColor: '#1B365D',
    gradient: 'bg-gradient-to-br from-mint-green via-mint-green/90 to-blue-ink',
    icon: '📊',
    particleColor: '#00BDA4'
  },
  
  stats: {
    downloads: '1000+',
    users: '500+',
    satisfaction: '4.8/5',
    timesSaved: '2h/semaine'
  }
};

export default tableauBordData;