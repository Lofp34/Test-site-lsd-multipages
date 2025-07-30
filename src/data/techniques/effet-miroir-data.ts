import { NegotiationTechnique } from '@/types/negotiation-technique';

export const effetMiroirData: NegotiationTechnique = {
  id: 'effet-miroir',
  slug: 'effet-miroir',
  title: 'L\'effet miroir',
  author: 'Chris Voss',
  origin: 'FBI - Négociation d\'otages',
  category: 'psychology',
  difficultyLevel: 'intermediate',
  
  description: 'Technique d\'empathie tactique développée par Chris Voss pour créer une connexion instantanée avec l\'interlocuteur en reflétant ses derniers mots. Cette technique, utilisée par le FBI lors de négociations critiques, permet de faire parler l\'autre et de découvrir ses véritables motivations.',
  
  psychologyPrinciples: [
    'Principe de réciprocité conversationnelle - L\'autre se sent écouté et continue à parler',
    'Activation du système de récompense neuronal - Le cerveau aime être compris',
    'Réduction des défenses psychologiques - L\'empathie désarme la méfiance',
    'Effet de clarification - Forcer l\'autre à préciser sa pensée',
    'Création de lien émotionnel - Base de toute influence durable'
  ],
  
  businessApplications: [
    'Découverte des besoins clients cachés',
    'Gestion des objections complexes',
    'Négociations tendues ou bloquées',
    'Création de rapport commercial'
  ],
  
  laurentVision: 'En 20 ans de négociations PME, j\'ai découvert que l\'effet miroir de Chris Voss est l\'outil le plus puissant pour débloquer les situations tendues. Quand un client dit "C\'est trop cher", au lieu de justifier, je répète "Trop cher ?" avec empathie. Dans 80% des cas, il précise sa pensée et révèle le vrai problème. Cette technique transforme l\'objection en opportunité de découverte.',
  
  pmeAdaptation: 'Dans le contexte PME français, l\'effet miroir doit être appliqué avec subtilité pour éviter de paraître mécanique. J\'ai adapté la technique en y ajoutant une dimension émotionnelle : "Je sens que le budget vous préoccupe vraiment..." avant de faire le miroir. Cette approche respecte la relation personnelle cruciale en PME tout en obtenant les informations nécessaires.',
  
  successMetrics: [
    {
      metric: 'Découverte d\'informations cachées',
      value: '78%',
      context: 'Des négociations révèlent de nouveaux éléments'
    },
    {
      metric: 'Réduction des tensions',
      value: '85%',
      context: 'Des situations conflictuelles apaisées'
    },
    {
      metric: 'Amélioration du closing',
      value: '65%',
      context: 'De signatures après utilisation'
    }
  ],
  
  stepByStepGuide: [
    {
      step: 1,
      title: 'Écoute active et identification du déclencheur',
      description: 'Identifiez le moment précis où votre interlocuteur exprime une émotion, une objection ou une préoccupation. C\'est votre signal pour utiliser l\'effet miroir.',
      script: 'Client: "Votre solution est intéressante mais franchement, 50K€ pour notre petite structure, c\'est énorme." Vous: (Pause 2 secondes) "C\'est énorme ?"',
      example: 'Au lieu de justifier immédiatement le prix, vous reflétez l\'émotion exprimée pour encourager l\'approfondissement.',
      tips: [
        'Attendez 2-3 secondes avant de faire le miroir - le silence amplifie l\'effet',
        'Répétez les 1-3 derniers mots les plus chargés émotionnellement',
        'Utilisez une intonation légèrement montante, comme une question douce',
        'Gardez un visage empathique et ouvert, pas interrogateur',
        'Ne répétez jamais plus de 3 mots - sinon ça devient du perroquet'
      ]
    },
    {
      step: 2,
      title: 'Application du miroir avec empathie tactique',
      description: 'Répétez les derniers mots significatifs avec une intonation empathique légèrement montante. L\'objectif est de faire parler, pas d\'interroger.',
      script: 'Client: "On n\'a jamais investi autant dans le digital." Vous: "Jamais investi autant ?" (avec empathie) Client: "Non, on est plutôt traditionnels, mais on voit bien qu\'il faut évoluer..."',
      example: 'Le miroir révèle souvent les vraies préoccupations : ici, la peur du changement plus que le budget.',
      tips: [
        'Votre ton doit exprimer "Dites-moi en plus" pas "Qu\'est-ce que vous voulez dire ?"',
        'Accompagnez d\'un léger hochement de tête bienveillant',
        'Si le client ne développe pas, ajoutez "Je sens que c\'est important pour vous..."',
        'Ne faites jamais deux miroirs consécutifs - alternez avec d\'autres techniques',
        'Adaptez votre posture : légèrement penchée vers l\'avant, attentive'
      ]
    },
    {
      step: 3,
      title: 'Exploitation de l\'information révélée',
      description: 'Une fois que le miroir a fait parler votre interlocuteur, exploitez intelligemment l\'information obtenue pour adapter votre approche.',
      script: 'Client: "En fait, on a eu une mauvaise expérience avec un prestataire digital l\'an dernier. On a perdu 20K€ et 6 mois." Vous: "Je comprends parfaitement cette prudence. Voulez-vous qu\'on regarde ensemble comment éviter ce type d\'écueil ?"',
      example: 'L\'objection prix devient une préoccupation de sécurité - vous pouvez maintenant proposer des garanties.',
      tips: [
        'Reformulez ce que vous avez compris pour valider',
        'Montrez que l\'information change votre approche',
        'Proposez des solutions spécifiques au problème révélé',
        'Utilisez cette information pour personnaliser votre offre',
        'Remerciez la confiance : "Merci de me partager cela..."'
      ]
    },
    {
      step: 4,
      title: 'Enchaînement et approfondissement',
      description: 'Continuez à utiliser l\'effet miroir pour approfondir la découverte, mais variez avec d\'autres techniques pour éviter la répétition.',
      script: 'Client: "Notre priorité c\'est vraiment la sécurité des données." Vous: "La sécurité des données ?" Client: "Oui, on traite des informations sensibles clients." Vous: "Qu\'est-ce qui vous inquiète le plus côté sécurité ?"',
      example: 'Alternez miroir et questions ouvertes pour maintenir le flux d\'information sans lasser.',
      tips: [
        'Maximum 2-3 miroirs par conversation pour rester naturel',
        'Alternez avec des questions ouvertes et des reformulations',
        'Notez mentalement chaque information révélée',
        'Adaptez votre solution en temps réel aux découvertes',
        'Gardez le focus sur leurs préoccupations, pas vos arguments'
      ]
    },
    {
      step: 5,
      title: 'Clôture et utilisation stratégique',
      description: 'Utilisez les informations obtenues par l\'effet miroir pour personnaliser votre proposition finale et lever les vraies objections.',
      script: 'Vous: "Basé sur ce que vous m\'avez partagé - votre prudence après l\'expérience passée et votre priorité sécurité - je propose qu\'on démarre par un pilote sécurisé de 3 mois avec garantie résultats. Qu\'est-ce que vous en pensez ?"',
      example: 'Votre proposition finale intègre directement les préoccupations révélées par les miroirs précédents.',
      tips: [
        'Référencez explicitement ce qu\'ils vous ont confié',
        'Montrez comment votre solution répond aux vraies préoccupations',
        'Proposez des preuves spécifiques aux inquiétudes exprimées',
        'Utilisez leur vocabulaire et leurs expressions',
        'Terminez par une question d\'engagement douce'
      ]
    }
  ],
  
  caseStudies: [
    {
      industry: 'PME Services - Cabinet comptable (35 salariés)',
      challenge: 'Négociation logiciel de gestion 25K€. Client: "25K€ c\'est notre budget formation annuel complet, c\'est impossible."',
      application: 'Effet miroir: "Votre budget formation complet ?" Client révèle: "On forme 2-3 personnes par an, mais là on parle de former toute l\'équipe sur un nouveau système..." Découverte: peur de la conduite du changement, pas du budget.',
      results: 'Signature à 23K€ avec formation incluse et accompagnement changement 6 mois. Client ravi de l\'approche personnalisée.',
      metrics: {
        informationRevealed: 'Peur du changement (pas budget)',
        solutionAdapted: 'Formation + accompagnement',
        finalPrice: '23K€ (92% prix initial)',
        clientSatisfaction: '9.2/10',
        implementationSuccess: '100%',
        referralGenerated: '1 nouveau client'
      }
    },
    {
      industry: 'PME Industrie - Fabricant métallurgie (80 salariés)',
      challenge: 'Équipement 150K€. Acheteur: "Vos concurrents allemands sont 30% moins chers, comment vous justifiez ça ?"',
      application: 'Miroir empathique: "30% moins chers ?" Révélation: "En fait, on a eu des problèmes de SAV avec eux, mais le prix..." Vraie préoccupation: qualité du service, pas le prix.',
      results: 'Contrat 145K€ avec SAV premium 5 ans. Concurrent éliminé sur l\'argument service.',
      metrics: {
        pricePreservation: '97%',
        serviceContract: '5 ans SAV premium',
        competitorElimination: 'Concurrent allemand écarté',
        trustBuilding: 'Relation partenaire établie',
        longTermValue: '+25K€ SAV',
        clientRetention: '100%'
      }
    },
    {
      industry: 'PME Tech - Startup EdTech (15 salariés)',
      challenge: 'Prestation conseil 40K€. CEO: "On démarre, on n\'a pas les moyens des grandes boîtes."',
      application: 'Miroir: "Pas les moyens des grandes boîtes ?" Révélation: "On veut pas faire comme les gros groupes qui dépensent sans compter, on veut être malins." Vraie motivation: efficacité, pas économie.',
      results: 'Signature 38K€ avec approche "startup lean" et paiement au succès partiel.',
      metrics: {
        approachAdaptation: 'Méthode "startup lean"',
        paymentModel: 'Paiement au succès',
        finalContract: '38K€ (95% prix initial)',
        startupAlignment: 'Parfaite adéquation culturelle',
        resultDelivery: '+40% efficacité mesurée',
        ambassadorStatus: 'Client référence'
      }
    }
  ],
  
  commonMistakes: [
    {
      mistake: 'Répéter mécaniquement sans empathie - "Trop cher ? Trop cher ? Trop cher ?"',
      consequence: 'Vous paraissez robotique et agaçant. Le client se ferme et peut partir irrité par votre attitude.',
      solution: 'Un seul miroir par idée, avec une vraie empathie dans la voix. Alternez avec d\'autres techniques d\'écoute active.'
    },
    {
      mistake: 'Faire le miroir sur des mots neutres ou sans émotion',
      consequence: 'Aucun effet, vous perdez votre temps et paraissez bizarre. Le client ne développe pas.',
      solution: 'Ciblez uniquement les mots chargés émotionnellement : objections, peurs, désirs, frustrations.'
    },
    {
      mistake: 'Répéter plus de 3 mots ou des phrases entières',
      consequence: 'Vous passez pour un perroquet, l\'effet est cassé et le client peut se moquer.',
      solution: 'Maximum 1-3 mots, les plus significatifs. "Trop cher ?" pas "C\'est trop cher pour notre budget ?"'
    },
    {
      mistake: 'Utiliser une intonation interrogative agressive',
      consequence: 'Le client se sent attaqué ou jugé, il se braque au lieu de s\'ouvrir.',
      solution: 'Intonation douce, légèrement montante, avec empathie. Comme si vous disiez "Dites-moi en plus..."'
    },
    {
      mistake: 'Ne pas exploiter l\'information révélée par le miroir',
      consequence: 'Vous gâchez l\'opportunité de découverte et revenez à votre argumentaire standard.',
      solution: 'Adaptez immédiatement votre approche aux informations obtenues. Montrez que vous avez écouté.'
    },
    {
      mistake: 'Faire des miroirs consécutifs sans laisser respirer',
      consequence: 'Effet d\'interrogatoire, le client se sent harcelé et se ferme.',
      solution: 'Un miroir, puis silence, puis reformulation ou question ouverte. Variez les techniques d\'écoute.'
    }
  ],
  
  relatedTechniques: [
    'ne-jamais-couper-la-poire-en-deux',
    'silence-strategique',
    'questions-calibrees'
  ],
  
  downloadableResources: [
    {
      title: 'Guide de l\'effet miroir en négociation',
      type: 'PDF',
      url: '/ressources/downloads/guide-effet-miroir.pdf'
    },
    {
      title: 'Checklist des mots déclencheurs',
      type: 'PDF',
      url: '/ressources/downloads/checklist-mots-declencheurs.pdf'
    }
  ],
  
  seoMetadata: {
    title: 'L\'effet miroir | Technique FBI Chris Voss | Laurent Serre',
    description: 'Maîtrisez l\'effet miroir de Chris Voss (FBI) pour vos négociations PME. Guide complet avec scripts, cas concrets et conseils terrain de Laurent Serre.',
    keywords: [
      'effet miroir',
      'chris voss',
      'technique fbi',
      'empathie tactique',
      'négociation commerciale',
      'laurent serre',
      'découverte client',
      'écoute active'
    ],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/effet-miroir'
  },
  
  trackingEvents: [
    {
      event: 'technique_page_view',
      category: 'Negotiation',
      action: 'View Effet Miroir'
    },
    {
      event: 'technique_guide_read',
      category: 'Engagement',
      action: 'Read Mirror Guide'
    },
    {
      event: 'technique_resource_download',
      category: 'Conversion',
      action: 'Download Mirror Resource'
    }
  ],
  
  testimonials: [
    {
      name: 'Claire M.',
      company: 'Conseil RH',
      role: 'Directrice',
      quote: 'L\'effet miroir a révolutionné mes entretiens clients. Au lieu de parler, j\'écoute et je découvre leurs vraies préoccupations. Mes propositions sont maintenant sur-mesure.',
      result: '+60% de découverte d\'informations',
      avatar: 'CM'
    },
    {
      name: 'Philippe D.',
      company: 'Solutions IT',
      role: 'Commercial Senior',
      quote: 'Avant, quand un client disait "c\'est cher", je justifiais. Maintenant je fais "C\'est cher ?" et j\'apprends pourquoi. Ça change tout !',
      result: '85% d\'objections transformées en découverte',
      avatar: 'PD'
    }
  ],
  
  credibilityBadges: [
    {
      title: 'Technique FBI Éprouvée',
      description: 'Développée par Chris Voss lors de négociations d\'otages internationales',
      icon: '🎯',
      color: '#4F46E5'
    },
    {
      title: 'Adaptation PME Française',
      description: 'Personnalisée par Laurent Serre pour le contexte business français',
      icon: '🇫🇷',
      color: '#6366F1'
    },
    {
      title: '78% de Découverte',
      description: 'Taux de révélation d\'informations cachées mesuré sur 200+ négociations',
      icon: '📊',
      color: '#8B5CF6'
    }
  ],
  
  interactiveChecklist: [
    {
      category: 'Préparation à l\'écoute active',
      items: [
        'Me préparer mentalement à écouter plus que parler',
        'Identifier les moments émotionnels propices au miroir',
        'Préparer ma posture d\'écoute empathique',
        'Définir mes objectifs de découverte pour cet entretien'
      ]
    },
    {
      category: 'Application de l\'effet miroir',
      items: [
        'Attendre 2-3 secondes avant de faire le miroir',
        'Répéter maximum 1-3 mots les plus chargés émotionnellement',
        'Utiliser une intonation douce et légèrement montante',
        'Accompagner d\'un langage corporel empathique',
        'Laisser le silence faire son effet après le miroir'
      ]
    },
    {
      category: 'Exploitation des informations',
      items: [
        'Noter mentalement chaque information révélée',
        'Reformuler pour valider ma compréhension',
        'Adapter ma solution aux préoccupations découvertes',
        'Remercier la confiance accordée',
        'Utiliser leur vocabulaire dans ma réponse'
      ]
    }
  ]
};