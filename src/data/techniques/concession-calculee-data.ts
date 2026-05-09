import { NegotiationTechnique } from '@/types/negotiation-technique';

export const concessionCalculeeData: NegotiationTechnique = {
  id: 'concession-calculee',
  slug: 'concession-calculee',
  title: 'La concession calculée',
  author: 'Négociation stratégique',
  origin: 'Théorie des jeux appliquée',
  category: 'closing',
  difficultyLevel: 'advanced',
  
  description: 'Technique avancée d\'échange de valeur stratégique où chaque concession est planifiée et conditionnée à une contrepartie. Au lieu de céder sous la pression, on orchestre des échanges gagnant-gagnant qui préservent la valeur tout en facilitant l\'accord final.',
  
  psychologyPrinciples: [
    'Réciprocité conditionnelle - Chaque concession appelle une contrepartie',
    'Perception de valeur - Les concessions difficiles à obtenir sont plus valorisées',
    'Équité procédurale - L\'échange équitable renforce l\'acceptation',
    'Engagement par l\'effort - Ce qui coûte est plus apprécié',
    'Théorie des jeux - Optimisation des gains mutuels'
  ],
  
  businessApplications: [
    'Négociations contractuelles complexes',
    'Closing de ventes importantes',
    'Résolution de blocages tarifaires',
    'Négociations multi-critères',
    'Accords de partenariat'
  ],
  
  laurentVision: 'La concession calculée, c\'est l\'art de donner pour mieux recevoir. En 20 ans, j\'ai appris que les clients valorisent ce qu\'ils ont "arraché". Quand je dis "Je peux faire un effort sur le prix, mais j\'ai besoin que vous vous engagiez sur 3 ans", la concession devient précieuse. Le secret : toujours échanger, jamais donner gratuitement.',
  
  pmeAdaptation: 'En PME française, la concession calculée doit préserver la relation. J\'ai développé la "concession collaborative" : "Pour vous aider à respecter votre budget, je peux réduire de 10%, mais ça m\'oblige à étaler la prestation sur 6 mois au lieu de 3. Ça vous va ?" Le dirigeant comprend l\'effort et accepte la contrepartie naturellement.',
  
  successMetrics: [
    {
      metric: 'Préservation de la marge',
      value: '89%',
      context: 'Malgré les concessions accordées'
    },
    {
      metric: 'Satisfaction client post-accord',
      value: '94%',
      context: 'Grâce à l\'équité perçue des échanges'
    },
    {
      metric: 'Durabilité des accords',
      value: '91%',
      context: 'Taux de renouvellement des contrats'
    }
  ],
  
  stepByStepGuide: [
    {
      step: 1,
      title: 'Préparation de la matrice d\'échanges',
      description: 'Avant la négociation, listez vos concessions possibles et leurs contreparties souhaitées. Chaque concession doit avoir un prix.',
      script: 'Préparation mentale: "Si ils demandent -10% prix, je peux accepter contre engagement 3 ans. Si ils veulent délais plus courts, je peux faire contre +15% prix. Si ils veulent formation incluse, je peux faire contre référence client." Chaque concession = contrepartie.',
      example: 'Vous entrez en négociation avec un plan d\'échanges, pas en subissant les demandes.',
      tips: [
        'Listez 5-7 concessions possibles avec leurs contreparties',
        'Valorisez chaque concession : combien ça vous coûte vraiment ?',
        'Préparez plusieurs niveaux de concessions selon l\'enjeu',
        'Identifiez ce qui a de la valeur pour eux mais vous coûte peu',
        'Gardez toujours une concession "ultime" en réserve'
      ]
    },
    {
      step: 2,
      title: 'Résistance initiale et exploration des besoins',
      description: 'Face à une demande de concession, résistez d\'abord pour en augmenter la valeur perçue, puis explorez leurs vrais besoins.',
      script: 'Client: "Il faut que vous fassiez un geste sur le prix." Vous: "Je comprends votre demande, mais mes prix sont déjà très serrés. Aidez-moi à comprendre : qu\'est-ce qui vous permettrait de valider ce projet ? C\'est uniquement le prix ou y a-t-il d\'autres éléments ?"',
      example: 'Vous ne cédez pas immédiatement, vous explorez d\'abord leurs vrais leviers de décision.',
      tips: [
        'Ne jamais céder à la première demande - ça dévalue votre concession',
        'Explorez leurs vrais besoins : prix, délais, conditions, garanties ?',
        'Montrez que votre concession vous coûte : "C\'est difficile mais..."',
        'Cherchez à comprendre leurs contraintes réelles',
        'Identifiez ce qui a le plus de valeur pour eux'
      ]
    },
    {
      step: 3,
      title: 'Proposition d\'échange conditionnel',
      description: 'Proposez votre concession en la conditionnant explicitement à une contrepartie de valeur équivalente.',
      script: 'Vous: "Écoutez, je comprends votre contrainte budgétaire. Je peux faire un effort de 8% sur le prix, mais ça m\'oblige à revoir mon organisation. En contrepartie, j\'aurais besoin que vous vous engagiez sur 2 ans au lieu d\'1 an. Ça équilibre l\'équation pour nous deux. Qu\'en pensez-vous ?"',
      example: 'Votre concession devient un échange équitable, pas une faiblesse. Les deux parties gagnent quelque chose.',
      tips: [
        'Utilisez "en contrepartie", "en échange", "pour équilibrer"',
        'Justifiez pourquoi vous avez besoin de cette contrepartie',
        'Montrez l\'équité de l\'échange : "ça équilibre pour nous deux"',
        'Demandez leur avis : "Qu\'en pensez-vous ?"',
        'Restez ferme : pas de concession sans contrepartie'
      ]
    },
    {
      step: 4,
      title: 'Négociation de la contrepartie',
      description: 'Si ils résistent à votre contrepartie, négociez-la plutôt que d\'abandonner votre concession. Trouvez un échange qui marche.',
      script: 'Client: "2 ans c\'est trop long, on ne peut pas s\'engager." Vous: "Je comprends. Que pourriez-vous faire pour m\'aider à justifier cet effort prix ? Un acompte plus important ? Une recommandation LinkedIn ? Nous présenter à vos partenaires ? Il faut qu\'on trouve un équilibre."',
      example: 'Vous cherchez ensemble une contrepartie acceptable. L\'échange reste le principe, seules les modalités changent.',
      tips: [
        'Ne lâchez jamais le principe de l\'échange',
        'Proposez plusieurs alternatives de contrepartie',
        'Soyez créatif : témoignage, référence, acompte, délais...',
        'Impliquez-les dans la recherche de solution',
        'Gardez l\'esprit gagnant-gagnant'
      ]
    },
    {
      step: 5,
      title: 'Finalisation et valorisation de l\'accord',
      description: 'Une fois l\'échange trouvé, valorisez l\'effort mutuel et formalisez l\'accord pour éviter les remises en cause.',
      script: 'Vous: "Parfait ! Donc on s\'accorde sur 42K€ au lieu de 45K€, avec un engagement 18 mois et une recommandation LinkedIn. C\'est un bel effort des deux côtés. Je vais formaliser ça dans notre proposition. Vous êtes d\'accord pour qu\'on démarre sur ces bases ?"',
      example: 'L\'accord devient un succès partagé où chacun a fait un effort. La satisfaction est mutuelle.',
      tips: [
        'Récapitulez l\'échange complet obtenu',
        'Valorisez l\'effort des deux parties',
        'Formalisez immédiatement pour éviter les retours en arrière',
        'Créez un sentiment de réussite partagée',
        'Demandez confirmation finale avant de conclure'
      ]
    }
  ],
  
  caseStudies: [
    {
      industry: 'PME Services - Cabinet expertise comptable (60 salariés)',
      challenge: 'Logiciel de gestion 80K€. Associé principal: "80K€ c\'est trop, nos concurrents font 65K€."',
      application: 'Concession calculée: "Je peux m\'aligner à 68K€, mais j\'ai besoin de sécuriser mon investissement. En contrepartie, engagement 3 ans au lieu de 1 an, plus une recommandation à 2 confrères. Ça équilibre l\'effort consenti."',
      results: 'Accord à 68K€ avec engagement 3 ans + 2 recommandations. Client satisfait de l\'échange équitable.',
      metrics: {
        priceReduction: '15% concédé',
        contractExtension: '3 ans vs 1 an',
        referralCommitment: '2 recommandations obtenues',
        totalValue: '204K€ sur 3 ans vs 80K€',
        clientSatisfaction: '9.4/10',
        referralsGenerated: '2 nouveaux clients signés'
      }
    },
    {
      industry: 'PME Industrie - Fabricant métallurgie (90 salariés)',
      challenge: 'Équipement production 250K€. Directeur: "Il faut descendre à 220K€ pour passer en comité."',
      application: 'Concession calculée: "220K€ c\'est possible, mais ça change mon équilibre économique. En contrepartie, j\'ai besoin d\'un acompte de 50% à la commande au lieu de 30%, et que vous acceptiez un délai de 4 mois au lieu de 3. Ça marche ?"',
      results: 'Signature à 220K€ avec acompte 50% et délai 4 mois. Amélioration de la trésorerie compensant la baisse.',
      metrics: {
        priceAdjustment: '220K€ (88% objectif initial)',
        downPayment: '50% vs 30% standard',
        deliveryTime: '4 mois vs 3 mois',
        cashflowImprovement: '+60K€ trésorerie immédiate',
        marginPreservation: '89% marge maintenue',
        clientApproval: 'Comité validé unanimement'
      }
    },
    {
      industry: 'PME Tech - Startup SaaS (20 salariés)',
      challenge: 'Conseil stratégique 50K€. CEO: "On peut monter à 40K€ maximum, c\'est notre budget."',
      application: 'Concession calculée: "40K€ c\'est serré mais faisable si on optimise. En contrepartie, j\'ai besoin que vous acceptiez un paiement en 2 fois au lieu de 3, et que vous me fassiez un témoignage vidéo pour mon site. Deal ?"',
      results: 'Mission à 40K€ avec paiement optimisé + témoignage vidéo. CEO ravi de l\'arrangement.',
      metrics: {
        budgetRespected: '40K€ (80% objectif)',
        paymentTerms: '2 fois vs 3 fois',
        testimonialValue: 'Vidéo témoignage obtenue',
        cashflowGain: '+2 mois trésorerie',
        marketingAsset: 'Témoignage client premium',
        relationshipStrength: 'Partenariat renforcé'
      }
    }
  ],
  
  commonMistakes: [
    {
      mistake: 'Concession gratuite sans contrepartie - Céder sous la pression',
      consequence: 'Érosion des marges, dévalorisation de l\'offre, client qui en demande toujours plus.',
      solution: 'Toujours conditionner chaque concession à une contrepartie de valeur équivalente.'
    },
    {
      mistake: 'Céder trop vite sans résistance initiale',
      consequence: 'Concession dévalorisée, client qui pense pouvoir obtenir plus facilement.',
      solution: 'Toujours résister d\'abord pour augmenter la valeur perçue de votre concession.'
    },
    {
      mistake: 'Contrepartie sans valeur réelle pour vous',
      consequence: 'Échange déséquilibré, perte sèche déguisée en négociation.',
      solution: 'Chaque contrepartie doit avoir une valeur concrète : financière, commerciale, ou stratégique.'
    },
    {
      mistake: 'Ne pas formaliser l\'échange obtenu',
      consequence: 'Remise en cause ultérieure, client qui "oublie" ses engagements.',
      solution: 'Toujours récapituler et formaliser l\'échange complet avant de conclure.'
    },
    {
      mistake: 'Concessions trop importantes d\'un coup',
      consequence: 'Perte de crédibilité, client qui pense que vos prix étaient gonflés.',
      solution: 'Concessions progressives et justifiées. Maximum 10-15% en une fois.'
    },
    {
      mistake: 'Oublier de valoriser l\'effort mutuel',
      consequence: 'Accord perçu comme normal, pas de satisfaction particulière du client.',
      solution: 'Toujours souligner que les deux parties ont fait un effort. Créer la satisfaction partagée.'
    }
  ],
  
  relatedTechniques: [
    'negociation-raisonnee',
    'ancrage-tactique',
    'recadrage-valeur'
  ],
  
  downloadableResources: [
    {
      title: 'Guide de la concession calculée',
      type: 'PDF',
      url: '/ressources/downloads/guide-concession-calculee.pdf'
    },
    {
      title: 'Matrice d\'échanges négociation',
      type: 'Excel',
      url: '/ressources/downloads/matrice-echanges-negociation.xlsx'
    },
    {
      title: 'Calculateur de valeur des concessions',
      type: 'Excel',
      url: '/ressources/downloads/calculateur-valeur-concessions.xlsx'
    }
  ],
  
  seoMetadata: {
    title: 'La concession calculée | Technique négociation stratégique | Laurent Serre',
    description: 'Maîtrisez la concession calculée pour vos négociations PME. Guide complet avec échanges de valeur, contreparties et cas concrets.',
    keywords: [
      'concession calculée',
      'négociation stratégique',
      'échange valeur',
      'contrepartie négociation',
      'laurent serre',
      'closing commercial',
      'théorie jeux',
      'accord gagnant gagnant'
    ],
    canonicalUrl: 'https://www.laurentserre.com/ressources/techniques-de-negociation/concession-calculee'
  },
  
  trackingEvents: [
    {
      event: 'technique_page_view',
      category: 'Negotiation',
      action: 'View Concession Calculee'
    },
    {
      event: 'technique_guide_read',
      category: 'Engagement',
      action: 'Read Calculated Concession Guide'
    },
    {
      event: 'technique_resource_download',
      category: 'Conversion',
      action: 'Download Calculated Concession Resource'
    }
  ],
  
  testimonials: [
    {
      name: 'Thierry M.',
      company: 'Solutions Industrielles',
      role: 'Directeur Commercial',
      quote: 'La concession calculée a sauvé mes marges. Avant, je cédais sous la pression. Maintenant, chaque concession a son prix. Mes clients respectent plus mes efforts.',
      result: '+15% de marge préservée',
      avatar: 'TM'
    },
    {
      name: 'Céline R.',
      company: 'Conseil Digital',
      role: 'Directrice Associée',
      quote: 'Cette technique m\'a appris l\'art de l\'échange équitable. Mes clients sont plus satisfaits car ils ont l\'impression d\'avoir négocié. Et moi je préserve ma valeur.',
      result: '94% satisfaction client post-accord',
      avatar: 'CR'
    }
  ],
  
  credibilityBadges: [
    {
      title: 'Négociation Stratégique',
      description: 'Basée sur la théorie des jeux et l\'optimisation des gains mutuels',
      icon: '🎯',
      color: '#EF4444'
    },
    {
      title: 'Échange Équitable',
      description: 'Technique d\'échange de valeur préservant les intérêts des deux parties',
      icon: '⚖️',
      color: '#F87171'
    },
    {
      title: '89% de Marge',
      description: 'Taux de préservation des marges malgré les concessions accordées',
      icon: '📊',
      color: '#DC2626'
    }
  ],
  
  interactiveChecklist: [
    {
      category: 'Préparation des échanges',
      items: [
        'Lister mes concessions possibles avec leur coût réel',
        'Identifier les contreparties de valeur pour chaque concession',
        'Préparer plusieurs niveaux de concessions selon l\'enjeu',
        'Évaluer ce qui a de la valeur pour eux mais me coûte peu',
        'Garder une concession "ultime" en réserve'
      ]
    },
    {
      category: 'Gestion des demandes de concession',
      items: [
        'Résister initialement pour valoriser ma future concession',
        'Explorer leurs vrais besoins au-delà du prix',
        'Proposer un échange conditionnel équitable',
        'Négocier la contrepartie si résistance',
        'Maintenir le principe d\'échange dans tous les cas'
      ]
    },
    {
      category: 'Finalisation de l\'accord',
      items: [
        'Récapituler l\'échange complet obtenu',
        'Valoriser l\'effort mutuel des deux parties',
        'Formaliser immédiatement l\'accord',
        'Créer un sentiment de réussite partagée',
        'Confirmer l\'engagement sur les contreparties'
      ]
    }
  ]
};