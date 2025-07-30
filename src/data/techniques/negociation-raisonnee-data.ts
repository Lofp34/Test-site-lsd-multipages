import { NegotiationTechnique } from '@/types/negotiation-technique';

export const negociationRaisonneeData: NegotiationTechnique = {
  id: 'negociation-raisonnee',
  slug: 'negociation-raisonnee',
  title: 'La négociation raisonnée',
  author: 'Fisher & Ury',
  origin: 'Harvard - Programme de négociation',
  category: 'preparation',
  difficultyLevel: 'intermediate',
  
  description: 'Méthode de négociation développée à Harvard qui privilégie la recherche d\'accords gagnant-gagnant en se concentrant sur les intérêts plutôt que sur les positions. Cette approche collaborative permet de créer de la valeur pour toutes les parties tout en préservant les relations à long terme.',
  
  psychologyPrinciples: [
    'Séparation des personnes du problème - Préserver la relation tout en résolvant le conflit',
    'Focus sur les intérêts, pas les positions - Comprendre le "pourquoi" derrière les demandes',
    'Génération d\'options créatives - Élargir le gâteau avant de le partager',
    'Utilisation de critères objectifs - Légitimer l\'accord par des standards externes',
    'Développement du BATNA - Connaître ses alternatives pour négocier sereinement'
  ],
  
  businessApplications: [
    'Négociations commerciales complexes',
    'Résolution de conflits internes',
    'Partenariats stratégiques',
    'Négociations multi-parties',
    'Accords à long terme'
  ],
  
  laurentVision: 'La négociation raisonnée de Harvard a révolutionné ma pratique PME. Au lieu de me battre sur le prix, je cherche d\'abord à comprendre pourquoi le client a ce budget. Souvent, on découvre ensemble des solutions créatives : étalement, services inclus, partenariat... En 20 ans, cette approche m\'a permis de transformer 60% des "non" en accords durables.',
  
  pmeAdaptation: 'En PME française, la négociation raisonnée doit intégrer la dimension relationnelle forte. J\'ai adapté la méthode en commençant toujours par reconnaître les contraintes du dirigeant : "Je comprends que vous devez optimiser chaque euro investi..." Cette empathie initiale ouvre la voie à une collaboration authentique pour trouver LA solution qui marche pour tous.',
  
  successMetrics: [
    {
      metric: 'Accords gagnant-gagnant créés',
      value: '89%',
      context: 'Des négociations aboutissent à des solutions créatives'
    },
    {
      metric: 'Préservation des relations',
      value: '94%',
      context: 'Des clients restent satisfaits du processus'
    },
    {
      metric: 'Durabilité des accords',
      value: '87%',
      context: 'Des contrats sont renouvelés ou étendus'
    }
  ],
  
  stepByStepGuide: [
    {
      step: 1,
      title: 'Séparer les personnes du problème',
      description: 'Établissez une relation de confiance en montrant que vous attaquez le problème ensemble, pas l\'un contre l\'autre.',
      script: 'Vous: "Je vois qu\'on a tous les deux un défi à résoudre : vous avez des contraintes budgétaires légitimes, et moi j\'ai une solution qui a de la valeur. Comment peut-on travailler ensemble pour trouver une solution qui marche pour nous deux ?"',
      example: 'Au lieu de défendre votre prix, vous positionnez le budget comme un défi commun à résoudre.',
      tips: [
        'Utilisez "nous" et "ensemble" plutôt que "vous" et "moi"',
        'Reconnaissez explicitement leurs contraintes comme légitimes',
        'Montrez que vous voulez résoudre LEUR problème, pas vendre votre solution',
        'Créez un climat de collaboration dès le début',
        'Évitez tout langage qui pourrait être perçu comme accusateur'
      ]
    },
    {
      step: 2,
      title: 'Découvrir les intérêts derrière les positions',
      description: 'Creusez au-delà de ce qu\'ils demandent pour comprendre pourquoi ils le demandent. Les vrais intérêts sont souvent cachés.',
      script: 'Client: "Votre prix est trop élevé, il faut descendre à 30K€." Vous: "Je comprends l\'importance du budget. Aidez-moi à comprendre : qu\'est-ce qui vous amène à ce montant de 30K€ ? Y a-t-il d\'autres éléments importants pour vous au-delà du prix ?"',
      example: 'La position est "30K€ maximum". L\'intérêt peut être "respecter le budget annuel", "rassurer l\'associé", ou "garder une marge pour les imprévus".',
      tips: [
        'Posez des questions ouvertes : "Qu\'est-ce qui est important pour vous ?"',
        'Creusez avec "Pourquoi ?" et "Comment ça marche chez vous ?"',
        'Écoutez les émotions : peur, espoir, frustration révèlent les vrais enjeux',
        'Partagez aussi vos propres intérêts pour créer la réciprocité',
        'Notez tous les intérêts exprimés, même ceux qui semblent secondaires'
      ]
    },
    {
      step: 3,
      title: 'Générer des options créatives ensemble',
      description: 'Brainstormez des solutions alternatives avant de décider. L\'objectif est d\'élargir le gâteau, pas de le partager.',
      script: 'Vous: "OK, donc vous avez besoin de rester dans votre budget annuel de 30K€, mais vous voulez aussi être sûr que ça marche bien. Et moi, j\'ai besoin de valoriser mon expertise. Quelles options pourrait-on imaginer ? Étalement sur 2 ans ? Pilote puis déploiement ? Partenariat avec d\'autres prestations ?"',
      example: 'Au lieu de négocier le prix, vous explorez ensemble : paiement étalé, services inclus, partenariat, pilote, garanties...',
      tips: [
        'Séparez la génération d\'idées de l\'évaluation - brainstormez d\'abord',
        'Encouragez la créativité : "Et si on imaginait..." "Qu\'est-ce qui se passerait si..."',
        'Construisez sur les idées de l\'autre : "Intéressant, et si on ajoutait..."',
        'Pensez aux intérêts des deux parties simultanément',
        'Notez toutes les options sans les juger dans un premier temps'
      ]
    },
    {
      step: 4,
      title: 'Utiliser des critères objectifs pour légitimer',
      description: 'Appuyez-vous sur des standards externes (marché, précédents, normes) pour justifier l\'accord final.',
      script: 'Vous: "Pour évaluer ces options, on pourrait regarder ce qui se fait sur le marché pour ce type de projet. J\'ai ici une étude qui montre que la moyenne est à 35K€. On pourrait aussi regarder le ROI : si ça vous fait gagner 50K€ par an, quel investissement ça justifie ?"',
      example: 'Au lieu d\'imposer votre prix, vous utilisez des références externes : études de marché, ROI, précédents, normes sectorielles.',
      tips: [
        'Préparez vos critères objectifs à l\'avance : études, benchmarks, ROI',
        'Utilisez LEURS critères quand c\'est possible : "Selon vos propres standards..."',
        'Référencez des précédents : "Avec d\'autres clients similaires..."',
        'Quantifiez la valeur : ROI, gains de temps, économies réalisées',
        'Restez factuels, pas émotionnels : "Les chiffres montrent que..."'
      ]
    },
    {
      step: 5,
      title: 'Développer et utiliser votre BATNA',
      description: 'Connaissez votre meilleure alternative si la négociation échoue. Cela vous donne la sérénité pour négocier sans pression.',
      script: 'Mental: "Si ça ne marche pas avec eux, j\'ai 2 autres prospects chauds à 40K€, plus mon client existant qui veut étendre son contrat. Je peux donc négocier sereinement." Verbal: "Je comprends vos contraintes. De mon côté, j\'ai besoin de valoriser mon expertise à sa juste valeur."',
      example: 'Votre BATNA vous permet de rester ferme sur vos intérêts essentiels tout en étant flexible sur les modalités.',
      tips: [
        'Développez votre BATNA AVANT la négociation, pas pendant',
        'Améliorez constamment vos alternatives : autres prospects, autres projets',
        'Ne révélez votre BATNA que si nécessaire pour débloquer',
        'Utilisez votre BATNA pour fixer vos limites, pas pour menacer',
        'Un bon BATNA vous donne la confiance pour être créatif'
      ]
    }
  ],
  
  caseStudies: [
    {
      industry: 'PME Services - Cabinet d\'expertise comptable (50 salariés)',
      challenge: 'Digitalisation complète 60K€. Client: "Impossible, notre budget IT annuel est de 40K€ maximum."',
      application: 'Négociation raisonnée : découverte des intérêts (modernisation urgente, contrainte budgétaire, peur du changement). Génération d\'options créatives : étalement sur 18 mois, formation incluse, maintenance comprise.',
      results: 'Accord à 58K€ étalé sur 18 mois avec formation et maintenance 2 ans. Client ravi de la solution sur-mesure.',
      metrics: {
        finalValue: '58K€ (97% prix initial)',
        paymentTerms: '18 mois étalement',
        addedServices: 'Formation + maintenance 2 ans',
        clientSatisfaction: '9.7/10',
        relationshipStrength: 'Partenaire privilégié',
        referrals: '3 nouveaux clients générés'
      }
    },
    {
      industry: 'PME Industrie - Fabricant agroalimentaire (80 salariés)',
      challenge: 'Équipement production 150K€. Directeur: "Nos actionnaires ne valideront jamais plus de 120K€."',
      application: 'Exploration des intérêts : validation actionnaires (critère ROI), amélioration productivité, contrainte trésorerie. Solution créative : leasing avec option d\'achat, garantie ROI 18 mois.',
      results: 'Contrat 145K€ en leasing avec garantie ROI. Actionnaires convaincus par le modèle financier.',
      metrics: {
        financingModel: 'Leasing avec option achat',
        roiGuarantee: '18 mois garanti',
        stakeholderApproval: '100% actionnaires',
        cashflowImpact: 'Neutre la 1ère année',
        productivityGain: '+25% mesurée',
        contractExtension: 'Maintenance 5 ans signée'
      }
    },
    {
      industry: 'PME Tech - Éditeur logiciel (30 salariés)',
      challenge: 'Conseil stratégique 45K€. CEO: "On préfère recruter un consultant interne pour ce budget."',
      application: 'Négociation raisonnée : intérêts découverts (expertise immédiate, contrôle interne, budget formation). Option créative : mission courte + formation équipe + accompagnement recrutement.',
      results: 'Mission 42K€ : 3 mois conseil + formation équipe + aide recrutement consultant interne.',
      metrics: {
        missionDuration: '3 mois intensifs',
        teamTraining: '5 jours formation',
        recruitmentSupport: 'Aide recrutement incluse',
        knowledgeTransfer: '100% méthodologie transmise',
        internalConsultant: 'Recruté avec succès',
        followUpContract: 'Accompagnement 6 mois'
      }
    }
  ],
  
  commonMistakes: [
    {
      mistake: 'Confondre positions et intérêts - Se battre sur les demandes sans comprendre les besoins',
      consequence: 'Négociation bloquée, solutions sous-optimales, relations détériorées. Passage en force ou échec.',
      solution: 'Toujours creuser le "pourquoi" derrière chaque demande. Poser des questions ouvertes sur leurs motivations réelles.'
    },
    {
      mistake: 'Générer des options trop tôt sans avoir compris les intérêts',
      consequence: 'Solutions inadaptées, perte de temps, client qui ne se sent pas compris.',
      solution: 'D\'abord découvrir TOUS les intérêts des deux parties, puis seulement brainstormer les options ensemble.'
    },
    {
      mistake: 'Négliger la préparation de son BATNA',
      consequence: 'Négociation sous pression, concessions excessives, accord défavorable par peur de perdre.',
      solution: 'Développer ses alternatives AVANT chaque négociation importante. Améliorer constamment son BATNA.'
    },
    {
      mistake: 'Utiliser la méthode comme manipulation - Faire semblant de collaborer',
      consequence: 'Perte de confiance quand la manipulation est détectée. Relation définitivement compromise.',
      solution: 'Être authentiquement dans l\'esprit gagnant-gagnant. Vraiment chercher des solutions qui marchent pour tous.'
    },
    {
      mistake: 'Abandonner ses intérêts essentiels au nom de la collaboration',
      consequence: 'Accord déséquilibré, frustration, relation malsaine à long terme.',
      solution: 'Collaborer sur les modalités, rester ferme sur ses intérêts fondamentaux. Le BATNA donne cette force.'
    },
    {
      mistake: 'Oublier de légitimer l\'accord final par des critères objectifs',
      consequence: 'Accord perçu comme arbitraire, remise en cause ultérieure, difficultés d\'exécution.',
      solution: 'Toujours appuyer l\'accord final sur des standards externes : marché, ROI, précédents, normes.'
    }
  ],
  
  relatedTechniques: [
    'effet-miroir',
    'questions-calibrees',
    'ancrage-tactique'
  ],
  
  downloadableResources: [
    {
      title: 'Guide de la négociation raisonnée Harvard',
      type: 'PDF',
      url: '/ressources/downloads/guide-negociation-raisonnee.pdf'
    },
    {
      title: 'Template de préparation BATNA',
      type: 'PDF',
      url: '/ressources/downloads/template-batna.pdf'
    },
    {
      title: 'Checklist des critères objectifs',
      type: 'PDF',
      url: '/ressources/downloads/checklist-criteres-objectifs.pdf'
    }
  ],
  
  seoMetadata: {
    title: 'La négociation raisonnée | Méthode Harvard Fisher & Ury | Laurent Serre',
    description: 'Maîtrisez la négociation raisonnée de Harvard pour vos accords PME. Guide complet avec BATNA, intérêts vs positions et cas concrets.',
    keywords: [
      'négociation raisonnée',
      'fisher ury',
      'harvard négociation',
      'batna',
      'gagnant gagnant',
      'laurent serre',
      'intérêts positions',
      'accord collaboratif'
    ],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/negociation-raisonnee'
  },
  
  trackingEvents: [
    {
      event: 'technique_page_view',
      category: 'Negotiation',
      action: 'View Negociation Raisonnee'
    },
    {
      event: 'technique_guide_read',
      category: 'Engagement',
      action: 'Read Harvard Guide'
    },
    {
      event: 'technique_resource_download',
      category: 'Conversion',
      action: 'Download Harvard Resource'
    }
  ],
  
  testimonials: [
    {
      name: 'Isabelle T.',
      company: 'Conseil Stratégique',
      role: 'Directrice Associée',
      quote: 'La négociation raisonnée a transformé mes relations clients. Au lieu de me battre sur les prix, je trouve des solutions créatives. Mes clients deviennent des partenaires.',
      result: '89% d\'accords gagnant-gagnant',
      avatar: 'IT'
    },
    {
      name: 'Jean-Marc P.',
      company: 'Équipements Industriels',
      role: 'Directeur Commercial',
      quote: 'Avant, je perdais des affaires sur le prix. Maintenant, je comprends leurs vrais besoins et je trouve toujours une solution. Mon BATNA me donne la sérénité.',
      result: '+35% de taux de closing',
      avatar: 'JMP'
    }
  ],
  
  credibilityBadges: [
    {
      title: 'Méthode Harvard',
      description: 'Développée par le Programme de Négociation de Harvard University',
      icon: '🎓',
      color: '#10B981'
    },
    {
      title: 'Approche Scientifique',
      description: 'Basée sur des décennies de recherche en psychologie de la négociation',
      icon: '🔬',
      color: '#34D399'
    },
    {
      title: '89% de Succès',
      description: 'Taux d\'accords gagnant-gagnant mesuré sur 180+ négociations',
      icon: '📊',
      color: '#059669'
    }
  ],
  
  interactiveChecklist: [
    {
      category: 'Préparation de la négociation',
      items: [
        'Identifier mes intérêts essentiels vs mes positions négociables',
        'Développer mon BATNA (meilleure alternative)',
        'Préparer mes critères objectifs (études, benchmarks, ROI)',
        'Anticiper leurs intérêts probables derrière leurs positions',
        'Définir ma zone d\'accord possible (ZOPA)'
      ]
    },
    {
      category: 'Conduite de la négociation raisonnée',
      items: [
        'Séparer les personnes du problème dès le début',
        'Découvrir leurs intérêts avec des questions ouvertes',
        'Partager mes propres intérêts pour créer la réciprocité',
        'Brainstormer des options créatives ensemble',
        'Évaluer les options avec des critères objectifs'
      ]
    },
    {
      category: 'Finalisation de l\'accord',
      items: [
        'Vérifier que l\'accord répond aux intérêts des deux parties',
        'Légitimer l\'accord par des standards externes',
        'Définir clairement les modalités d\'exécution',
        'Prévoir les mécanismes de suivi et d\'ajustement',
        'Célébrer la collaboration réussie'
      ]
    }
  ]
};