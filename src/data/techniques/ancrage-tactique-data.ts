import { NegotiationTechnique } from '@/types/negotiation-technique';

export const ancrageTactiqueData: NegotiationTechnique = {
  id: 'ancrage-tactique',
  slug: 'ancrage-tactique',
  title: 'L\'ancrage tactique',
  author: 'Daniel Kahneman',
  origin: 'Psychologie cognitive - Prix Nobel',
  category: 'psychology',
  difficultyLevel: 'advanced',
  
  description: 'Technique basée sur le biais cognitif d\'ancrage découvert par Daniel Kahneman. Elle consiste à influencer la perception de valeur en présentant stratégiquement un premier chiffre qui servira de référence mentale pour toute la négociation. L\'ancrage façonne inconsciemment les attentes et les décisions.',
  
  psychologyPrinciples: [
    'Biais d\'ancrage - Le premier chiffre influence tous les suivants',
    'Heuristique d\'ajustement - On ajuste à partir de l\'ancre, sans s\'en éloigner assez',
    'Effet de primauté - Les premières informations ont plus d\'impact',
    'Aversion à la perte - L\'ancre crée un point de référence pour évaluer gains/pertes',
    'Système 1 vs Système 2 - L\'ancrage exploite la pensée rapide et intuitive'
  ],
  
  businessApplications: [
    'Négociation de prix et tarifs',
    'Présentation d\'offres commerciales',
    'Évaluation de budgets projets',
    'Négociation de conditions contractuelles',
    'Positionnement concurrentiel'
  ],
  
  laurentVision: 'L\'ancrage tactique de Kahneman est l\'arme secrète des négociateurs experts. En 20 ans, j\'ai appris qu\'on ne négocie jamais dans l\'absolu, mais toujours par rapport à une référence. Quand je dis "Habituellement, ce type de projet coûte entre 80 et 120K€, mais pour vous...", j\'ancre à 100K€. Même si je propose 60K€, ça paraît raisonnable. L\'ancrage façonne la perception de valeur.',
  
  pmeAdaptation: 'En PME française, l\'ancrage doit être subtil et justifié pour ne pas paraître manipulateur. J\'ai développé "l\'ancrage par la valeur" : au lieu d\'annoncer un prix élevé, je commence par quantifier les bénéfices. "Ce projet peut vous faire économiser 200K€ par an. L\'investissement de 50K€ représente donc 3 mois d\'économies." L\'ancre devient le ROI, pas le prix.',
  
  successMetrics: [
    {
      metric: 'Amélioration des prix obtenus',
      value: '23%',
      context: 'Vs négociations sans ancrage préalable'
    },
    {
      metric: 'Réduction des objections prix',
      value: '67%',
      context: 'Grâce au recadrage de la valeur'
    },
    {
      metric: 'Accélération des décisions',
      value: '41%',
      context: 'L\'ancrage réduit l\'incertitude'
    }
  ],
  
  stepByStepGuide: [
    {
      step: 1,
      title: 'Préparation de l\'ancre stratégique',
      description: 'Choisissez votre ancre en fonction de votre objectif : prix élevé pour négocier vers le bas, ou valeur élevée pour justifier votre prix.',
      script: 'Préparation mentale: "Mon objectif est 50K€. Je vais ancrer à 80K€ avec le marché, puis proposer 50K€ comme effort commercial." Ou: "Je vais ancrer sur la valeur : 200K€ d\'économies annuelles pour justifier 50K€ d\'investissement."',
      example: 'L\'ancre peut être un prix de marché, un coût de non-action, un ROI, ou une référence concurrentielle.',
      tips: [
        'Votre ancre doit être crédible et justifiable',
        'Préparez plusieurs ancres selon les scénarios possibles',
        'L\'ancre doit être significativement différente de votre objectif',
        'Documentez vos ancres avec des sources externes',
        'Adaptez l\'ancre au profil de votre interlocuteur'
      ]
    },
    {
      step: 2,
      title: 'Présentation de l\'ancre avec légitimité',
      description: 'Introduisez votre ancre de manière naturelle et légitime, appuyée par des références externes crédibles.',
      script: 'Vous: "D\'après l\'étude Gartner que j\'ai ici, les entreprises de votre taille investissent en moyenne 80 à 120K€ pour ce type de transformation digitale. Chez nos concurrents, j\'ai vu des devis à 90K€ pour des projets similaires."',
      example: 'L\'ancre est présentée comme une information factuelle, pas comme votre prix. Vous créez le contexte de référence.',
      tips: [
        'Utilisez des sources externes : études, benchmarks, concurrents',
        'Présentez l\'ancre comme une information, pas une proposition',
        'Laissez un temps de pause après l\'ancrage pour que ça s\'imprime',
        'Observez leur réaction pour ajuster la suite',
        'Restez factuel et professionnel, pas commercial'
      ]
    },
    {
      step: 3,
      title: 'Exploitation de l\'effet d\'ancrage',
      description: 'Une fois l\'ancre posée, utilisez-la comme référence pour présenter votre offre comme avantageuse par comparaison.',
      script: 'Vous: "Maintenant, pour votre projet spécifique, j\'ai étudié vos besoins et je peux vous proposer une solution complète à 55K€. C\'est significativement en dessous du marché parce que j\'ai optimisé l\'approche pour votre contexte."',
      example: 'Votre prix de 55K€ paraît raisonnable comparé à l\'ancre de 80-120K€, même s\'il était votre objectif initial.',
      tips: [
        'Présentez votre offre comme un avantage par rapport à l\'ancre',
        'Justifiez l\'écart par votre expertise ou votre approche',
        'Utilisez des mots comme "optimisé", "adapté", "efficace"',
        'Maintenez la référence à l\'ancre pendant la négociation',
        'Ne révélez jamais que l\'ancrage était intentionnel'
      ]
    },
    {
      step: 4,
      title: 'Gestion des contre-ancres',
      description: 'Si le client tente de poser sa propre ancre (budget très bas), recadrez immédiatement avec votre ancre de valeur.',
      script: 'Client: "Notre budget maximum est 30K€." Vous: "Je comprends la contrainte budgétaire. Regardons la valeur : ce projet va vous faire économiser 200K€ par an. Même à 55K€, le ROI est de 4 mois. Comment peut-on ajuster le périmètre pour respecter votre budget tout en préservant ce ROI ?"',
      example: 'Au lieu de négocier sur le prix, vous recadrez sur la valeur et proposez d\'ajuster le périmètre.',
      tips: [
        'Ne laissez jamais leur ancre basse devenir la référence',
        'Recadrez immédiatement sur la valeur ou le ROI',
        'Proposez d\'ajuster le périmètre plutôt que le prix',
        'Maintenez votre ancre de valeur comme référence',
        'Utilisez des questions pour les faire réfléchir au coût de l\'inaction'
      ]
    },
    {
      step: 5,
      title: 'Renforcement et clôture avec l\'ancre',
      description: 'Utilisez l\'ancre pour faciliter la décision finale en montrant l\'avantage obtenu par rapport à la référence initiale.',
      script: 'Vous: "Récapitulons : le marché est à 80-120K€, je vous propose 55K€ avec les mêmes résultats. Vous économisez au minimum 25K€ sur l\'investissement, plus les 200K€ par an de bénéfices. C\'est une opportunité unique. Qu\'est-ce qui vous empêcherait de démarrer ?"',
      example: 'La décision devient évidente : ils obtiennent un avantage significatif par rapport à la référence du marché.',
      tips: [
        'Récapitulez l\'avantage par rapport à l\'ancre initiale',
        'Quantifiez les bénéfices obtenus grâce à votre offre',
        'Créez un sentiment d\'urgence : "opportunité unique"',
        'Posez une question d\'engagement pour déclencher la décision',
        'Restez confiant : votre offre est objectivement avantageuse'
      ]
    }
  ],
  
  caseStudies: [
    {
      industry: 'PME Services - Agence communication (40 salariés)',
      challenge: 'Refonte site web + stratégie digitale. Client: "On a eu des devis entre 15 et 25K€ ailleurs."',
      application: 'Ancrage tactique sur la valeur : "Une stratégie digitale complète génère en moyenne 300K€ de CA supplémentaire la première année selon HubSpot. L\'investissement de 35K€ représente donc 1,4 mois de retour." Contre-ancrage sur leur budget bas.',
      results: 'Signature à 32K€ avec stratégie complète. Client convaincu par le ROI vs les "sites vitrine" concurrents.',
      metrics: {
        valueAnchor: '300K€ CA supplémentaire/an',
        roiFraming: '1,4 mois de retour',
        finalPrice: '32K€ (91% objectif initial)',
        competitorDifferentiation: 'Stratégie vs site vitrine',
        clientConviction: 'ROI démontré',
        projectSuccess: '+280K€ CA première année'
      }
    },
    {
      industry: 'PME Industrie - Fabricant emballages (60 salariés)',
      challenge: 'Automatisation ligne production 180K€. Directeur: "C\'est énorme pour nous, on pensait à 100K€ maximum."',
      application: 'Ancrage sur le coût de l\'inaction : "Sans automatisation, vous perdez 50K€ par an en productivité vs vos concurrents automatisés. Sur 5 ans, ça fait 250K€ de manque à gagner. L\'investissement de 180K€ vous fait économiser 70K€ net."',
      results: 'Accord à 175K€ avec financement étalé. Directeur convaincu par l\'analyse coût/bénéfice.',
      metrics: {
        inactionCost: '250K€ sur 5 ans',
        netSavings: '70K€ économisés',
        finalPrice: '175K€ (97% objectif)',
        financingModel: 'Étalement sur 3 ans',
        productivityGain: '+35% mesurée',
        competitiveAdvantage: 'Rattrapage concurrence'
      }
    },
    {
      industry: 'PME Tech - Éditeur SaaS (25 salariés)',
      challenge: 'Conseil stratégique levée de fonds 60K€. CEO: "Les autres consultants proposent 40K€."',
      application: 'Ancrage sur l\'enjeu : "Une levée de fonds ratée coûte 6-12 mois de retard et peut tuer une startup. Une levée réussie, c\'est 2-5M€ levés. Mon accompagnement à 60K€ représente 1,2% de la levée pour maximiser vos chances de succès."',
      results: 'Mission à 58K€ avec bonus au succès. Levée de 3M€ réussie 4 mois plus tard.',
      metrics: {
        stakesAnchor: '2-5M€ enjeu levée',
        investmentRatio: '1,2% de la levée',
        finalPrice: '58K€ + bonus succès',
        fundraisingSuccess: '3M€ levés',
        timeToMarket: '4 mois vs 12 mois moyenne',
        clientROI: '5000% sur honoraires'
      }
    }
  ],
  
  commonMistakes: [
    {
      mistake: 'Ancrage trop élevé ou non crédible - Prix fantaisiste sans justification',
      consequence: 'Perte de crédibilité immédiate, client qui se braque ou qui part. Effet inverse de l\'ancrage.',
      solution: 'Ancre toujours justifiée par des sources externes crédibles. Rester dans une fourchette réaliste du marché.'
    },
    {
      mistake: 'Ancrage trop évident ou manipulateur - "Normalement c\'est 200K€ mais pour vous 50K€"',
      consequence: 'Client qui détecte la manipulation et perd confiance. Relation commerciale compromise.',
      solution: 'Ancrage subtil et factuel. Présenter comme information de marché, pas comme votre prix initial.'
    },
    {
      mistake: 'Mauvais timing de l\'ancrage - Trop tôt ou trop tard dans la négociation',
      consequence: 'Ancrage inefficace, client pas réceptif ou déjà fixé sur ses références.',
      solution: 'Ancrer après la découverte des besoins, avant la présentation de prix. Moment optimal de réceptivité.'
    },
    {
      mistake: 'Ne pas exploiter l\'ancre posée - Oublier de s\'y référer ensuite',
      consequence: 'Ancrage sans effet, négociation qui repart de zéro sur d\'autres bases.',
      solution: 'Maintenir la référence à l\'ancre tout au long de la négociation. Y revenir pour justifier votre offre.'
    },
    {
      mistake: 'Céder face à une contre-ancre client sans recadrer',
      consequence: 'Leur ancre basse devient la référence, négociation défavorable assurée.',
      solution: 'Recadrer immédiatement sur la valeur ou le coût de l\'inaction. Ne jamais accepter leur ancre basse.'
    },
    {
      mistake: 'Ancrage uniquement sur le prix - Ignorer l\'ancrage de valeur',
      consequence: 'Négociation centrée sur le coût, pas sur les bénéfices. Commoditisation de l\'offre.',
      solution: 'Privilégier l\'ancrage sur la valeur, le ROI, les bénéfices. Le prix devient secondaire.'
    }
  ],
  
  relatedTechniques: [
    'recadrage-valeur',
    'negociation-raisonnee',
    'effet-miroir'
  ],
  
  downloadableResources: [
    {
      title: 'Guide de l\'ancrage tactique en négociation',
      type: 'PDF',
      url: '/ressources/downloads/guide-ancrage-tactique.pdf'
    },
    {
      title: 'Templates d\'ancrage par secteur',
      type: 'PDF',
      url: '/ressources/downloads/templates-ancrage-secteur.pdf'
    },
    {
      title: 'Calculateur ROI pour ancrage valeur',
      type: 'Excel',
      url: '/ressources/downloads/calculateur-roi-ancrage.xlsx'
    }
  ],
  
  seoMetadata: {
    title: 'L\'ancrage tactique | Technique Kahneman | Négociation PME | Laurent Serre',
    description: 'Maîtrisez l\'ancrage tactique de Kahneman pour vos négociations PME. Guide complet avec biais cognitifs, techniques d\'influence et cas concrets.',
    keywords: [
      'ancrage tactique',
      'daniel kahneman',
      'biais ancrage',
      'négociation prix',
      'influence cognitive',
      'laurent serre',
      'psychologie vente',
      'techniques persuasion'
    ],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ancrage-tactique'
  },
  
  trackingEvents: [
    {
      event: 'technique_page_view',
      category: 'Negotiation',
      action: 'View Ancrage Tactique'
    },
    {
      event: 'technique_guide_read',
      category: 'Engagement',
      action: 'Read Anchoring Guide'
    },
    {
      event: 'technique_resource_download',
      category: 'Conversion',
      action: 'Download Anchoring Resource'
    }
  ],
  
  testimonials: [
    {
      name: 'Frédéric L.',
      company: 'Solutions Industrielles',
      role: 'Directeur Commercial',
      quote: 'L\'ancrage tactique a révolutionné mes négociations. En ancrant sur la valeur avant de parler prix, mes clients voient l\'investissement, pas le coût. Mes marges ont progressé de 25%.',
      result: '+25% de marge moyenne',
      avatar: 'FL'
    },
    {
      name: 'Nathalie B.',
      company: 'Conseil Digital',
      role: 'Fondatrice',
      quote: 'Avant, je subissais les budgets clients. Maintenant, j\'ancre sur le ROI et le coût de l\'inaction. Mes prix ne sont plus jamais remis en question.',
      result: '67% d\'objections prix en moins',
      avatar: 'NB'
    }
  ],
  
  credibilityBadges: [
    {
      title: 'Prix Nobel Kahneman',
      description: 'Basé sur les travaux du Prix Nobel d\'économie Daniel Kahneman',
      icon: '🏆',
      color: '#F59E0B'
    },
    {
      title: 'Science Cognitive',
      description: 'Fondé sur 40 ans de recherche en psychologie cognitive',
      icon: '🧠',
      color: '#FBBF24'
    },
    {
      title: '+23% de Prix',
      description: 'Amélioration moyenne des prix obtenus mesurée sur 120+ négociations',
      icon: '📈',
      color: '#D97706'
    }
  ],
  
  interactiveChecklist: [
    {
      category: 'Préparation de l\'ancrage',
      items: [
        'Définir mon objectif de prix et ma stratégie d\'ancrage',
        'Rechercher les références de marché crédibles',
        'Calculer le ROI et la valeur pour le client',
        'Préparer plusieurs ancres selon les scénarios',
        'Documenter mes sources pour légitimer l\'ancrage'
      ]
    },
    {
      category: 'Application de l\'ancrage tactique',
      items: [
        'Présenter l\'ancre comme information factuelle',
        'Utiliser des sources externes crédibles',
        'Laisser un temps de pause après l\'ancrage',
        'Observer la réaction du client',
        'Maintenir la référence à l\'ancre pendant la négociation'
      ]
    },
    {
      category: 'Exploitation et clôture',
      items: [
        'Présenter mon offre comme avantageuse vs l\'ancre',
        'Recadrer sur la valeur si contre-ancrage client',
        'Quantifier l\'avantage obtenu par rapport au marché',
        'Utiliser l\'ancre pour faciliter la décision',
        'Clôturer en rappelant l\'opportunité unique'
      ]
    }
  ]
};