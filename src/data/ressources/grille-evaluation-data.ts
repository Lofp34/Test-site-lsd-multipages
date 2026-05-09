import { ResourceTool } from '../../types/resource-tool';

export const grilleEvaluationData: ResourceTool = {
  id: 'grille-evaluation-commerciale',
  slug: 'grille-evaluation',
  title: 'Grille d\'Évaluation Commerciale',
  subtitle: 'Outil d\'évaluation des performances',
  description: 'Évaluez objectivement les performances de vos commerciaux avec cette grille complète. Critères mesurables, plan de développement personnalisé et suivi des progrès inclus.',
  category: 'evaluation',
  
  features: [
    'Grille d\'évaluation Excel complète',
    '25 critères de performance mesurables',
    'Système de notation objectif',
    'Plan de développement automatique',
    'Suivi des progrès dans le temps',
    'Comparaison inter-équipes',
    'Identification des forces et faiblesses',
    'Recommandations de formation ciblées'
  ],
  
  benefits: [
    'Évaluation objective et équitable des commerciaux',
    'Identification précise des axes d\'amélioration',
    'Plans de développement personnalisés',
    'Motivation par la reconnaissance des forces',
    'Réduction des biais d\'évaluation managériaux',
    'Amélioration continue des performances',
    'Base solide pour les entretiens annuels'
  ],
  
  targetAudience: [
    'Managers commerciaux',
    'Directeurs des ventes',
    'Responsables RH',
    'Dirigeants de PME',
    'Consultants en développement commercial',
    'Formateurs commerciaux'
  ],
  
  deliveryFormat: 'excel',
  estimatedTime: '30 min par évaluation',
  difficulty: 'intermédiaire',
  prerequisites: [
    'Connaissance des activités commerciales',
    'Accès aux données de performance',
    'Formation préalable à l\'évaluation objective'
  ],
  
  preview: {
    type: 'image',
    src: '/ressources/previews/grille-evaluation-preview.jpg',
    alt: 'Aperçu de la grille d\'évaluation commerciale',
    thumbnail: '/ressources/previews/grille-evaluation-thumb.jpg'
  },
  
  testimonials: [
    {
      name: 'Claire M.',
      company: 'Distribution Spécialisée',
      role: 'Directrice Commerciale',
      quote: 'Cette grille a révolutionné mes entretiens d\'évaluation. Fini les discussions subjectives ! Maintenant j\'ai des critères objectifs et mes commerciaux comprennent exactement où ils doivent progresser.',
      result: 'Entretiens 2x plus efficaces',
      avatar: 'CM'
    },
    {
      name: 'Jean-Paul R.',
      company: 'Services B2B',
      role: 'Manager Commercial',
      quote: 'J\'ai découvert que mon meilleur commercial avait en fait des lacunes importantes en prospection. La grille m\'a permis de cibler sa formation et il a progressé de 30% en 6 mois.',
      result: '+30% de performance en 6 mois',
      avatar: 'JPR'
    },
    {
      name: 'Amélie T.',
      company: 'Tech Solutions',
      role: 'RH & Formation',
      quote: 'Enfin un outil qui permet d\'évaluer les commerciaux de façon équitable ! Les plans de développement générés automatiquement nous font gagner un temps fou.',
      result: '5h/mois économisées sur les évaluations',
      avatar: 'AT'
    }
  ],
  
  caseStudies: [
    {
      company: 'PME Services - Conseil Marketing',
      industry: 'Services marketing (25 salariés)',
      challenge: 'Évaluations subjectives, commerciaux démotivés par le manque de feedback constructif, difficultés à identifier les besoins de formation',
      solution: 'Déploiement de la grille d\'évaluation avec formation des managers, mise en place d\'évaluations trimestrielles, plans de développement individualisés',
      results: 'Amélioration de 40% de la satisfaction des commerciaux, identification de 15 axes de formation, augmentation de 25% des performances moyennes',
      metrics: {
        'Satisfaction commerciaux': '+40%',
        'Performance moyenne': '+25%',
        'Axes formation identifiés': '15',
        'Objectivité évaluations': '+80%'
      }
    },
    {
      company: 'PME Industrie - Équipements Professionnels',
      industry: 'Équipements industriels (60 salariés)',
      challenge: 'Équipe commerciale hétérogène, difficultés à standardiser les évaluations, manque de visibilité sur les compétences individuelles',
      solution: 'Adaptation de la grille aux spécificités techniques, formation des évaluateurs, mise en place d\'un suivi mensuel des progrès',
      results: 'Standardisation des évaluations, identification de 3 talents cachés, amélioration de 35% de la performance globale équipe',
      metrics: {
        'Standardisation': '100%',
        'Talents identifiés': '3',
        'Performance globale': '+35%',
        'Temps d\'évaluation': '-50%'
      }
    }
  ],
  
  formConfig: {
    deliveryMethod: 'email',
    requiredFields: {
      email: true,
      firstName: true,
      company: true,
      message: true
    },
    autoResponse: true,
    followUpSequence: true
  },
  
  seoConfig: {
    title: 'Grille d\'Évaluation Commerciale | Outil Gratuit Manager | Laurent Serre',
    description: 'Téléchargez gratuitement notre grille d\'évaluation commerciale. 25 critères objectifs, plans de développement automatiques, spécialement conçue pour les managers.',
    keywords: [
      'grille évaluation commerciale',
      'évaluation performance commercial',
      'outil manager commercial',
      'critères évaluation vente',
      'laurent serre',
      'plan développement commercial',
      'management équipe commerciale'
    ],
    canonicalUrl: 'https://www.laurentserre.com/ressources/grille-evaluation',
    openGraph: {
      title: 'Grille d\'Évaluation Commerciale | Outil Gratuit Manager',
      description: 'Évaluez objectivement vos commerciaux avec notre grille gratuite. 25 critères mesurables, plans de développement automatiques.',
      image: 'https://www.laurentserre.com/ressources/og/grille-evaluation-og.jpg',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Grille d\'Évaluation Commerciale | Outil Gratuit Manager',
      description: 'Évaluez objectivement vos commerciaux avec notre grille gratuite. 25 critères mesurables, plans de développement automatiques.',
      image: 'https://www.laurentserre.com/ressources/og/grille-evaluation-og.jpg'
    },
    structuredData: {
      type: 'DigitalDocument',
      name: 'Grille d\'Évaluation Commerciale',
      description: 'Outil d\'évaluation objective des performances commerciales avec 25 critères mesurables et plans de développement',
      provider: {
        '@type': 'Person',
        name: 'Laurent Serre',
        url: 'https://www.laurentserre.com'
      },
      downloadUrl: 'https://www.laurentserre.com/ressources/grille-evaluation',
      fileFormat: 'application/vnd.ms-excel',
      datePublished: '2024-02-01',
      dateModified: '2024-12-01'
    }
  },
  
  trackingEvents: [
    {
      event: 'grille_evaluation_page_view',
      category: 'Resource',
      action: 'View Grille Evaluation Page'
    },
    {
      event: 'grille_evaluation_preview_click',
      category: 'Engagement',
      action: 'Click Preview'
    },
    {
      event: 'grille_evaluation_form_submit',
      category: 'Conversion',
      action: 'Submit Download Form'
    },
    {
      event: 'grille_evaluation_download_success',
      category: 'Conversion',
      action: 'Successful Download'
    }
  ],
  
  relatedResources: ['tableau-bord-commercial', 'reporting-automatise'],
  relatedServices: ['coach-commercial-entreprise', 'formation-commerciale-pme'],
  
  theme: {
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    gradient: 'bg-gradient-to-br from-purple-600 via-pink-500/10 to-primary-bg',
    icon: '📋',
    particleColor: '#8B5CF6'
  },
  
  stats: {
    downloads: '750+',
    users: '400+',
    satisfaction: '4.7/5',
    criteresEvaluation: '25'
  }
};

export default grilleEvaluationData;