import { NegotiationTechnique } from '@/types/negotiation-technique';

export const recadrageValeurData: NegotiationTechnique = {
  id: 'recadrage-valeur',
  slug: 'recadrage-valeur',
  title: 'Le recadrage de valeur',
  author: 'Approche consultative',
  origin: 'Vente de solutions complexes',
  category: 'objection-handling',
  difficultyLevel: 'advanced',
  
  description: 'Technique avancée qui consiste à transformer les objections en opportunités en recadrant la perspective du client sur la valeur. Au lieu de défendre le prix, on déplace la conversation vers les bénéfices, le ROI et le coût de l\'inaction pour repositionner l\'investissement comme une évidence.',
  
  psychologyPrinciples: [
    'Recadrage cognitif - Changer la perspective pour changer la perception',
    'Aversion à la perte - Mettre l\'accent sur ce qu\'on perd en ne faisant rien',
    'Ancrage de valeur - Établir de nouveaux points de référence',
    'Dissonance cognitive - Créer un inconfort entre situation actuelle et idéale',
    'Rationalisation post-décision - Donner des arguments logiques pour justifier l\'émotion'
  ],
  
  businessApplications: [
    'Gestion des objections prix',
    'Transformation des "non" en "comment"',
    'Repositionnement concurrentiel',
    'Justification d\'investissements importants',
    'Vente de solutions premium'
  ],
  
  laurentVision: 'Le recadrage de valeur est l\'art de transformer un coût en investissement. En 20 ans, j\'ai appris que les clients n\'achètent jamais un prix, ils achètent une transformation. Quand un client dit "C\'est cher", je réponds "Cher par rapport à quoi ? Au coût de ne rien faire ? Aux 200K€ que vous perdez chaque année sans cette solution ?" Le recadrage change tout.',
  
  pmeAdaptation: 'En PME française, le recadrage doit être empathique et concret. J\'ai développé le "recadrage PME" : au lieu de parler ROI abstrait, je quantifie en temps dirigeant. "Ces 50K€ représentent 2 semaines de votre temps par mois récupérées. Sur un an, c\'est 6 mois de votre vie professionnelle. Quel prix mettez-vous sur 6 mois de liberté ?" Cette approche humaine résonne avec les dirigeants PME.',
  
  successMetrics: [
    {
      metric: 'Transformation d\'objections prix',
      value: '81%',
      context: 'Des objections prix transformées en discussions valeur'
    },
    {
      metric: 'Maintien des marges',
      value: '92%',
      context: 'Des négociations sans concession prix'
    },
    {
      metric: 'Accélération des décisions',
      value: '47%',
      context: 'Grâce à la clarification de la valeur'
    }
  ],
  
  stepByStepGuide: [
    {
      step: 1,
      title: 'Accueil empathique de l\'objection',
      description: 'Accueillez l\'objection sans la combattre. Montrez que vous comprenez leur préoccupation avant de recadrer.',
      script: 'Client: "Votre solution est trop chère." Vous: "Je comprends parfaitement votre préoccupation sur l\'investissement. C\'est normal de vouloir optimiser chaque euro investi. Puis-je vous poser une question pour mieux comprendre ?"',
      example: 'Vous validez leur émotion avant de challenger leur logique. Cela crée la confiance nécessaire au recadrage.',
      tips: [
        'Ne jamais contredire directement une objection prix',
        'Utilisez des mots comme "je comprends", "c\'est légitime", "normal"',
        'Montrez de l\'empathie avant de recadrer',
        'Demandez la permission de poser des questions',
        'Créez un climat de collaboration, pas de confrontation'
      ]
    },
    {
      step: 2,
      title: 'Questionnement pour révéler le coût de l\'inaction',
      description: 'Posez des questions pour faire prendre conscience du coût réel de ne rien faire ou de continuer comme avant.',
      script: 'Vous: "Cher par rapport à quoi exactement ? Au coût de continuer comme aujourd\'hui ? Combien vous coûte actuellement le problème qu\'on cherche à résoudre ? En temps, en efficacité, en opportunités manquées ?"',
      example: 'Vous déplacez la référence du prix de votre solution vers le coût de leur problème actuel.',
      tips: [
        'Quantifiez le coût de l\'inaction en euros, temps, opportunités',
        'Utilisez leurs propres chiffres et données',
        'Explorez les coûts cachés : stress, démotivation, image',
        'Projetez sur 1 an, 3 ans : "Si rien ne change..."',
        'Faites-les exprimer eux-mêmes le coût de l\'inaction'
      ]
    },
    {
      step: 3,
      title: 'Recadrage par la valeur créée',
      description: 'Repositionnez votre prix comme un investissement en montrant la valeur créée et le ROI généré.',
      script: 'Vous: "Regardons différemment : cette solution va vous faire économiser 150K€ par an en optimisation. L\'investissement de 50K€ représente donc 4 mois d\'économies. Les 8 mois suivants, c\'est 100K€ de bénéfice net. Comment voyez-vous cet investissement maintenant ?"',
      example: 'Le prix devient dérisoire comparé aux bénéfices générés. L\'investissement se justifie par lui-même.',
      tips: [
        'Utilisez des chiffres concrets et vérifiables',
        'Calculez le ROI de manière conservative',
        'Montrez les bénéfices sur plusieurs années',
        'Incluez les bénéfices intangibles : sérénité, image, compétitivité',
        'Faites valider chaque étape du calcul'
      ]
    },
    {
      step: 4,
      title: 'Comparaison avec les alternatives',
      description: 'Comparez votre solution aux alternatives réelles : ne rien faire, solution interne, ou concurrence.',
      script: 'Vous: "Comparons les options : ne rien faire vous coûte 150K€/an. Développer en interne coûterait 200K€ et 18 mois. La solution concurrente à 40K€ ne résout que 60% du problème. Notre solution à 50K€ résout 100% en 3 mois. Quelle est vraiment l\'option la plus chère ?"',
      example: 'Votre solution devient l\'évidence économique parmi toutes les alternatives possibles.',
      tips: [
        'Listez TOUTES les alternatives réelles',
        'Chiffrez le coût total de chaque alternative',
        'Incluez les coûts cachés et les délais',
        'Montrez les risques de chaque option',
        'Positionnez votre solution comme la plus rationnelle'
      ]
    },
    {
      step: 5,
      title: 'Ancrage sur la transformation obtenue',
      description: 'Ancrez la décision sur la transformation de leur business plutôt que sur le prix payé.',
      script: 'Vous: "Au final, la vraie question n\'est pas "Combien ça coûte ?" mais "Combien ça rapporte ?". Dans 2 ans, vous ne vous souviendrez plus des 50K€ investis, mais vous profiterez encore des 300K€ économisés. Vous voulez cette transformation pour votre entreprise ?"',
      example: 'La décision se prend sur la vision future, pas sur le coût présent. L\'investissement devient un détail.',
      tips: [
        'Projetez dans le futur : "Dans 2 ans, vous serez..."',
        'Ancrez sur les bénéfices durables',
        'Minimisez l\'importance du prix dans l\'équation globale',
        'Créez une vision désirable de leur futur',
        'Terminez par une question d\'engagement sur la transformation'
      ]
    }
  ],
  
  caseStudies: [
    {
      industry: 'PME Services - Agence immobilière (30 salariés)',
      challenge: 'CRM + site web 45K€. Directeur: "45K€ c\'est énorme, on peut avoir un site à 5K€ ailleurs."',
      application: 'Recadrage valeur : "5K€ pour un site vitrine vs 45K€ pour un système qui génère des leads ? Combien de mandats perdez-vous par manque de visibilité ? Un mandat à 10K€ de commission, il en faut 5 pour rentabiliser. Combien en gagneriez-vous en plus avec un vrai système ?"',
      results: 'Signature à 43K€. Client convaincu par le calcul : +20 mandats/an = 200K€ de CA supplémentaire.',
      metrics: {
        valueReframe: '200K€ CA supplémentaire/an',
        roiCalculation: '5 mandats pour rentabiliser',
        finalPrice: '43K€ (96% objectif)',
        competitorElimination: 'Site vitrine écarté',
        businessImpact: '+20 mandats/an réalisés',
        clientROI: '465% première année'
      }
    },
    {
      industry: 'PME Industrie - Fabricant textile (70 salariés)',
      challenge: 'Automatisation production 180K€. Directeur: "180K€, c\'est 2 ans de bénéfices, c\'est impossible."',
      application: 'Recadrage par coût inaction : "2 ans de bénéfices pour automatiser ? Combien perdez-vous en productivité vs vos concurrents automatisés ? 50K€/an ? Sur 10 ans, c\'est 500K€. L\'investissement de 180K€ vous fait économiser 320K€ net. C\'est 2 ans de bénéfices... en plus !"',
      results: 'Accord à 175K€ avec financement. Directeur : "Je ne peux pas me permettre de NE PAS investir."',
      metrics: {
        inactionCost: '500K€ sur 10 ans',
        netSavings: '320K€ économisés',
        mindsetShift: 'Coût → Investissement obligatoire',
        finalPrice: '175K€ avec financement',
        productivityGain: '+40% mesurée',
        competitiveAdvantage: 'Rattrapage concurrence'
      }
    },
    {
      industry: 'PME Tech - Éditeur logiciel (25 salariés)',
      challenge: 'Conseil stratégique 60K€. CEO: "60K€ pour du conseil, on peut recruter un junior à ce prix."',
      application: 'Recadrage alternatives : "Un junior à 60K€/an, plus charges, formation, management... 80K€ réels. Il lui faut 2 ans pour être opérationnel. Coût total : 160K€. Moi, 60K€ pour 6 mois d\'expertise immédiate. Quelle option vous fait gagner du temps et de l\'argent ?"',
      results: 'Mission à 58K€. CEO convaincu par l\'analyse coût/bénéfice et la rapidité d\'exécution.',
      metrics: {
        alternativeCost: '160K€ sur 2 ans (junior)',
        timeToValue: '6 mois vs 24 mois',
        expertiseLevel: 'Immédiate vs progressive',
        finalPrice: '58K€ (97% objectif)',
        projectDelivery: '5 mois vs 24 mois',
        businessAcceleration: '+18 mois avance concurrentielle'
      }
    }
  ],
  
  commonMistakes: [
    {
      mistake: 'Défendre le prix au lieu de recadrer sur la valeur',
      consequence: 'Négociation sur le prix, érosion des marges, commoditisation de l\'offre.',
      solution: 'Ne jamais justifier le prix. Toujours recadrer sur la valeur, le ROI, ou le coût de l\'inaction.'
    },
    {
      mistake: 'Recadrage trop agressif sans empathie préalable',
      consequence: 'Client qui se braque, perte de confiance, fin de la relation commerciale.',
      solution: 'Toujours commencer par valider leur émotion avant de challenger leur logique.'
    },
    {
      mistake: 'Utiliser des chiffres non vérifiables ou exagérés',
      consequence: 'Perte de crédibilité, client qui remet tout en question, échec du recadrage.',
      solution: 'Utiliser leurs propres chiffres, être conservateur, faire valider chaque étape du calcul.'
    },
    {
      mistake: 'Oublier de quantifier le coût de l\'inaction',
      consequence: 'Recadrage incomplet, client qui reste focalisé sur le coût d\'achat.',
      solution: 'Toujours chiffrer ce que coûte le statu quo. Rendre l\'inaction plus chère que l\'action.'
    },
    {
      mistake: 'Ne pas comparer avec les vraies alternatives',
      consequence: 'Client qui trouve d\'autres options moins chères, perte de l\'affaire.',
      solution: 'Identifier et évaluer TOUTES les alternatives réelles. Montrer le coût total de chacune.'
    },
    {
      mistake: 'Recadrage uniquement rationnel sans dimension émotionnelle',
      consequence: 'Conviction intellectuelle sans passage à l\'acte, décision reportée.',
      solution: 'Allier chiffres rationnels et bénéfices émotionnels : sérénité, fierté, compétitivité.'
    }
  ],
  
  relatedTechniques: [
    'ancrage-tactique',
    'negociation-raisonnee',
    'effet-miroir'
  ],
  
  downloadableResources: [
    {
      title: 'Guide du recadrage de valeur',
      type: 'PDF',
      url: '/ressources/downloads/guide-recadrage-valeur.pdf'
    },
    {
      title: 'Calculateur ROI pour recadrage',
      type: 'Excel',
      url: '/ressources/downloads/calculateur-roi-recadrage.xlsx'
    },
    {
      title: 'Scripts de recadrage par objection',
      type: 'PDF',
      url: '/ressources/downloads/scripts-recadrage-objections.pdf'
    }
  ],
  
  seoMetadata: {
    title: 'Le recadrage de valeur | Technique objections prix | Laurent Serre',
    description: 'Maîtrisez le recadrage de valeur pour transformer les objections prix en opportunités. Guide complet avec ROI, scripts et cas PME concrets.',
    keywords: [
      'recadrage valeur',
      'objection prix',
      'transformation objections',
      'roi négociation',
      'laurent serre',
      'vente consultative',
      'coût inaction',
      'closing commercial'
    ],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/recadrage-valeur'
  },
  
  trackingEvents: [
    {
      event: 'technique_page_view',
      category: 'Negotiation',
      action: 'View Recadrage Valeur'
    },
    {
      event: 'technique_guide_read',
      category: 'Engagement',
      action: 'Read Value Reframing Guide'
    },
    {
      event: 'technique_resource_download',
      category: 'Conversion',
      action: 'Download Value Reframing Resource'
    }
  ],
  
  testimonials: [
    {
      name: 'Olivier P.',
      company: 'Solutions Digitales',
      role: 'Directeur Commercial',
      quote: 'Le recadrage de valeur a sauvé mes marges. Avant, je baissais mes prix face aux objections. Maintenant, je montre le coût de ne rien faire. Mes clients me remercient de les avoir aidés à voir clair.',
      result: '+28% de marge moyenne',
      avatar: 'OP'
    },
    {
      name: 'Sandrine L.',
      company: 'Conseil Stratégique',
      role: 'Consultante Senior',
      quote: 'Cette technique m\'a appris à transformer chaque "c\'est cher" en opportunité de démontrer ma valeur. Mes clients comprennent maintenant qu\'ils n\'achètent pas du temps, mais des résultats.',
      result: '81% d\'objections prix transformées',
      avatar: 'SL'
    }
  ],
  
  credibilityBadges: [
    {
      title: 'Approche Consultative',
      description: 'Technique éprouvée de la vente de solutions complexes B2B',
      icon: '🔄',
      color: '#14B8A6'
    },
    {
      title: 'Psychologie Cognitive',
      description: 'Basée sur les mécanismes de recadrage et d\'aversion à la perte',
      icon: '🧠',
      color: '#5EEAD4'
    },
    {
      title: '81% de Transformation',
      description: 'Taux d\'objections prix transformées en discussions valeur',
      icon: '📊',
      color: '#0F766E'
    }
  ],
  
  interactiveChecklist: [
    {
      category: 'Préparation du recadrage',
      items: [
        'Calculer le coût de l\'inaction pour le client',
        'Quantifier le ROI de ma solution de manière conservative',
        'Identifier toutes les alternatives réelles',
        'Préparer les chiffres et sources pour légitimer',
        'Anticiper les objections prix probables'
      ]
    },
    {
      category: 'Gestion de l\'objection prix',
      items: [
        'Accueillir l\'objection avec empathie',
        'Demander "cher par rapport à quoi ?"',
        'Quantifier le coût du problème actuel',
        'Recadrer sur la valeur et le ROI',
        'Comparer avec les vraies alternatives'
      ]
    },
    {
      category: 'Finalisation du recadrage',
      items: [
        'Ancrer sur la transformation future',
        'Minimiser l\'importance du prix dans l\'équation',
        'Créer l\'urgence de décision',
        'Poser une question d\'engagement',
        'Confirmer la compréhension de la valeur'
      ]
    }
  ]
};