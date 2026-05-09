import { NegotiationTechnique } from '@/types/negotiation-technique';

export const ouiProgressifData: NegotiationTechnique = {
  id: 'oui-progressif',
  slug: 'oui-progressif',
  title: 'La technique du "Oui" progressif',
  author: 'Robert Cialdini',
  origin: 'Psychologie de l\'influence',
  category: 'psychology',
  difficultyLevel: 'intermediate',
  
  description: 'Technique basée sur le principe de cohérence comportementale de Cialdini. Elle consiste à obtenir une série de petits "oui" pour créer un élan d\'engagement qui facilite l\'acceptation de la demande finale. Chaque micro-engagement renforce la disposition à dire oui à la suite.',
  
  psychologyPrinciples: [
    'Principe de cohérence - Nous voulons être cohérents avec nos engagements précédents',
    'Escalade d\'engagement - Chaque "oui" facilite le suivant',
    'Dissonance cognitive - Difficile de dire non après avoir dit oui plusieurs fois',
    'Construction d\'identité - "Je suis quelqu\'un qui dit oui à cette personne"',
    'Momentum psychologique - L\'élan créé par les micro-engagements'
  ],
  
  businessApplications: [
    'Progression vers la signature',
    'Validation d\'étapes de projet',
    'Obtention d\'accords partiels',
    'Construction de consensus',
    'Gestion des objections progressives'
  ],
  
  laurentVision: 'Le "Oui progressif" de Cialdini est ma technique préférée pour les négociations complexes. Au lieu de demander directement la signature, je construis un chemin de micro-engagements. "Êtes-vous d\'accord que votre productivité doit s\'améliorer ?" Oui. "Pensez-vous qu\'une solution digitale peut aider ?" Oui. "Voulez-vous voir comment ça marche ?" Oui. Arrivé à la proposition, le client a déjà dit oui 10 fois.',
  
  pmeAdaptation: 'En PME française, le "Oui progressif" doit respecter la relation de confiance. J\'ai développé la technique du "Oui collaboratif" : au lieu de manipuler, je co-construis les étapes avec le client. "On est d\'accord qu\'il faut résoudre ce problème ?" devient "Comment voyez-vous la résolution de ce problème ?" Cette approche collaborative génère des oui authentiques.',
  
  successMetrics: [
    {
      metric: 'Taux de closing final',
      value: '73%',
      context: 'Après séquence de oui progressifs'
    },
    {
      metric: 'Réduction des objections',
      value: '58%',
      context: 'Grâce aux micro-engagements préalables'
    },
    {
      metric: 'Accélération des décisions',
      value: '35%',
      context: 'Momentum créé par les oui successifs'
    }
  ],
  
  stepByStepGuide: [
    {
      step: 1,
      title: 'Conception de la séquence de micro-engagements',
      description: 'Planifiez une série de questions qui mènent logiquement vers votre objectif final, en commençant par des évidences.',
      script: 'Planification mentale: "1. Accord sur le problème, 2. Accord sur l\'urgence, 3. Accord sur les critères de solution, 4. Accord sur l\'approche, 5. Accord sur le timing, 6. Demande finale." Chaque étape doit être logique et facile à accepter.',
      example: 'Pour vendre une formation : Problème → Urgence → Critères → Méthode → Timing → Inscription.',
      tips: [
        'Commencez par des évidences que personne ne peut contester',
        'Chaque question doit découler logiquement de la précédente',
        'Préparez 5-8 micro-engagements avant la demande finale',
        'Testez votre séquence mentalement : chaque "oui" est-il naturel ?',
        'Adaptez la séquence au profil de votre interlocuteur'
      ]
    },
    {
      step: 2,
      title: 'Démarrage par l\'évidence partagée',
      description: 'Commencez par une question si évidente que le "non" est impossible. Créez le premier engagement positif.',
      script: 'Vous: "Monsieur Dupont, on est d\'accord que dans votre secteur, la concurrence s\'intensifie ?" Client: "Oui, c\'est certain." Vous: "Et vous voulez que votre entreprise reste compétitive ?" Client: "Évidemment."',
      example: 'Vous créez un climat d\'accord dès le début. Le client entre dans une dynamique positive.',
      tips: [
        'Choisissez des évidences liées à leur secteur ou situation',
        'Utilisez leur langage et leurs préoccupations connues',
        'Observez leur langage corporel : hochements de tête positifs',
        'Si premier "non", recadrez immédiatement sur une évidence plus large',
        'Créez un rythme : question → oui → validation → question suivante'
      ]
    },
    {
      step: 3,
      title: 'Progression logique vers l\'enjeu',
      description: 'Enchaînez avec des questions qui approfondissent l\'enjeu, chacune découlant naturellement de la précédente.',
      script: 'Vous: "Pour rester compétitif, il faut optimiser vos processus ?" Client: "Oui." Vous: "Et l\'optimisation passe souvent par la digitalisation ?" Client: "C\'est logique." Vous: "Vous pensez que votre équipe serait prête à évoluer ?" Client: "Je pense, oui."',
      example: 'Chaque "oui" renforce l\'engagement et prépare le terrain pour votre solution.',
      tips: [
        'Maintenez la logique : chaque question découle de la réponse précédente',
        'Variez les formulations : "Vous pensez que...", "On peut dire que...", "Il serait logique de..."',
        'Laissez de petites pauses pour que chaque "oui" s\'imprime',
        'Si hésitation, reformulez ou revenez à une évidence plus simple',
        'Comptez mentalement vos "oui" : objectif 5-8 avant la proposition'
      ]
    },
    {
      step: 4,
      title: 'Validation des critères de solution',
      description: 'Obtenez l\'accord sur les critères que doit remplir la solution idéale. Préparez l\'acceptation de votre offre.',
      script: 'Vous: "Pour choisir la bonne solution, vous privilégieriez l\'efficacité ?" Client: "Oui." Vous: "Et la facilité de mise en œuvre ?" Client: "Bien sûr." Vous: "Avec un accompagnement pour sécuriser le changement ?" Client: "Ce serait idéal."',
      example: 'Le client définit lui-même les critères que votre solution remplit parfaitement.',
      tips: [
        'Orientez les critères vers les forces de votre solution',
        'Faites-les exprimer leurs priorités : "Qu\'est-ce qui compte le plus ?"',
        'Validez chaque critère : "Donc l\'efficacité est importante ?"',
        'Notez mentalement tous les critères validés',
        'Préparez la démonstration que votre solution les remplit tous'
      ]
    },
    {
      step: 5,
      title: 'Présentation de la solution avec rappel des engagements',
      description: 'Présentez votre solution en rappelant tous les points d\'accord précédents. Le "oui" final devient logique.',
      script: 'Vous: "Parfait. Vous voulez rester compétitif, optimiser par le digital, avec une solution efficace et facile à mettre en œuvre, accompagnée pour sécuriser le changement. C\'est exactement ce que je vous propose avec cette solution. Ça correspond à vos attentes ?"',
      example: 'Votre proposition devient l\'aboutissement logique de tous leurs "oui" précédents.',
      tips: [
        'Récapitulez tous les points d\'accord obtenus',
        'Montrez que votre solution répond à chaque critère validé',
        'Utilisez leurs propres mots et expressions',
        'Créez une évidence : "C\'est exactement ce dont vous avez besoin"',
        'Terminez par une question d\'engagement douce'
      ]
    }
  ],
  
  caseStudies: [
    {
      industry: 'PME Services - Cabinet d\'avocats (20 salariés)',
      challenge: 'Logiciel de gestion 35K€. Associé principal réticent aux investissements tech.',
      application: 'Séquence de oui progressifs : "Accord que le temps c\'est de l\'argent ?" → "Accord que l\'efficacité administrative libère du temps ?" → "Accord qu\'un bon outil peut améliorer l\'efficacité ?" → "Accord que l\'investissement se justifie si ROI rapide ?" → Proposition 35K€ avec ROI 8 mois.',
      results: 'Signature immédiate à 35K€. Client convaincu par la logique de ses propres réponses.',
      metrics: {
        yesSequence: '7 oui obtenus avant proposition',
        decisionTime: 'Signature immédiate',
        finalPrice: '35K€ (100% objectif)',
        roiDemonstration: '8 mois validé',
        clientConviction: 'Logique imparable',
        implementationSuccess: '100% adoption équipe'
      }
    },
    {
      industry: 'PME Industrie - Menuiserie industrielle (45 salariés)',
      challenge: 'Formation équipe commerciale 25K€. Dirigeant sceptique sur la formation.',
      application: 'Oui progressifs : "Accord que vos commerciaux sont votre force ?" → "Accord qu\'ils peuvent encore progresser ?" → "Accord que la formation peut aider ?" → "Accord que le ROI formation se mesure ?" → "Accord qu\'investir dans l\'humain est rentable ?" → Proposition formation.',
      results: 'Accord à 24K€ avec engagement de mesure ROI. Dirigeant devenu ambassadeur de la formation.',
      metrics: {
        convictionBuilding: '6 oui avant proposition',
        priceAcceptance: '96% objectif atteint',
        roiCommitment: 'Mesure ROI acceptée',
        leadershipBuyIn: 'Dirigeant ambassadeur',
        teamEngagement: '100% participation',
        salesImprovement: '+30% performance équipe'
      }
    },
    {
      industry: 'PME Tech - Startup FinTech (15 salariés)',
      challenge: 'Conseil stratégique 40K€. CEO jeune, pressé, peu patient pour les longs argumentaires.',
      application: 'Oui progressifs adaptés au profil : "Accord que la croissance est votre priorité ?" → "Accord que les erreurs stratégiques coûtent cher ?" → "Accord qu\'un regard externe peut aider ?" → "Accord que l\'expérience compte ?" → Proposition conseil express.',
      results: 'Signature 38K€ en 20 minutes. CEO séduit par l\'approche directe et logique.',
      metrics: {
        meetingDuration: '20 minutes total',
        decisionSpeed: 'Signature immédiate',
        profileAdaptation: 'Approche directe validée',
        finalPrice: '38K€ (95% objectif)',
        projectDelivery: '3 mois vs 6 mois standard',
        startupGrowth: '+150% CA année suivante'
      }
    }
  ],
  
  commonMistakes: [
    {
      mistake: 'Questions trop évidentes ou condescendantes - "Vous voulez gagner de l\'argent ?"',
      consequence: 'Client qui se sent pris pour un idiot, perte de crédibilité, résistance psychologique.',
      solution: 'Questions pertinentes liées à leur contexte spécifique. Montrer qu\'on comprend leurs enjeux réels.'
    },
    {
      mistake: 'Séquence trop longue ou répétitive - Plus de 10 questions avant la proposition',
      consequence: 'Client qui comprend la manipulation, lassitude, effet inverse de résistance.',
      solution: 'Maximum 5-8 micro-engagements. Varier les formulations. Garder un rythme naturel de conversation.'
    },
    {
      mistake: 'Forcer le "oui" quand le client hésite ou dit "non"',
      consequence: 'Rupture de la dynamique positive, client qui se braque, fin de la technique.',
      solution: 'Si hésitation, revenir à une évidence plus simple. Si "non", explorer pourquoi avant de continuer.'
    },
    {
      mistake: 'Oublier de rappeler les engagements lors de la proposition finale',
      consequence: 'Perte de l\'effet cumulatif, proposition qui paraît déconnectée des échanges précédents.',
      solution: 'Récapituler tous les points d\'accord avant de présenter la solution. Créer la cohérence logique.'
    },
    {
      mistake: 'Utiliser la technique de manière mécanique sans adaptation',
      consequence: 'Approche robotique, manque d\'authenticité, client qui détecte la manipulation.',
      solution: 'Adapter la séquence au profil du client. Rester naturel et conversationnel. Écouter vraiment les réponses.'
    },
    {
      mistake: 'Ne pas gérer les objections qui surgissent pendant la séquence',
      consequence: 'Séquence interrompue, momentum perdu, retour à une négociation classique.',
      solution: 'Traiter chaque objection avant de continuer. Transformer l\'objection en nouveau micro-engagement.'
    }
  ],
  
  relatedTechniques: [
    'effet-miroir',
    'negociation-raisonnee',
    'recadrage-valeur'
  ],
  
  downloadableResources: [
    {
      title: 'Guide de la technique du Oui progressif',
      type: 'PDF',
      url: '/ressources/downloads/guide-oui-progressif.pdf'
    },
    {
      title: 'Templates de séquences par secteur',
      type: 'PDF',
      url: '/ressources/downloads/sequences-oui-progressif.pdf'
    },
    {
      title: 'Scripts de micro-engagements',
      type: 'PDF',
      url: '/ressources/downloads/scripts-micro-engagements.pdf'
    }
  ],
  
  seoMetadata: {
    title: 'La technique du Oui progressif | Méthode Cialdini | Laurent Serre',
    description: 'Maîtrisez la technique du Oui progressif de Cialdini pour vos négociations PME. Guide complet avec séquences, scripts et cas concrets.',
    keywords: [
      'oui progressif',
      'robert cialdini',
      'micro engagements',
      'cohérence comportementale',
      'technique persuasion',
      'laurent serre',
      'closing commercial',
      'psychologie vente'
    ],
    canonicalUrl: 'https://www.laurentserre.com/ressources/techniques-de-negociation/oui-progressif'
  },
  
  trackingEvents: [
    {
      event: 'technique_page_view',
      category: 'Negotiation',
      action: 'View Oui Progressif'
    },
    {
      event: 'technique_guide_read',
      category: 'Engagement',
      action: 'Read Progressive Yes Guide'
    },
    {
      event: 'technique_resource_download',
      category: 'Conversion',
      action: 'Download Progressive Yes Resource'
    }
  ],
  
  testimonials: [
    {
      name: 'Christophe M.',
      company: 'Solutions Logicielles',
      role: 'Directeur Commercial',
      quote: 'Le Oui progressif a transformé mes rendez-vous. Au lieu de subir les objections, je construis l\'accord étape par étape. Mes clients arrivent naturellement à la signature.',
      result: '+45% de taux de closing',
      avatar: 'CM'
    },
    {
      name: 'Valérie S.',
      company: 'Conseil RH',
      role: 'Consultante Senior',
      quote: 'Cette technique m\'a appris la patience commerciale. Avant, je proposais trop vite. Maintenant, je prépare le terrain avec des micro-oui. C\'est magique !',
      result: '73% de signatures immédiates',
      avatar: 'VS'
    }
  ],
  
  credibilityBadges: [
    {
      title: 'Méthode Cialdini',
      description: 'Basée sur les travaux de Robert Cialdini, référence mondiale en influence',
      icon: '✅',
      color: '#8B5CF6'
    },
    {
      title: 'Psychologie Prouvée',
      description: 'Fondée sur le principe de cohérence comportementale scientifiquement validé',
      icon: '🧠',
      color: '#A78BFA'
    },
    {
      title: '73% de Closing',
      description: 'Taux de signature finale mesuré sur 160+ négociations avec séquence complète',
      icon: '📊',
      color: '#7C3AED'
    }
  ],
  
  interactiveChecklist: [
    {
      category: 'Préparation de la séquence',
      items: [
        'Définir mon objectif final et ma demande principale',
        'Concevoir 5-8 micro-engagements logiques vers cet objectif',
        'Commencer par des évidences incontestables',
        'Tester mentalement la fluidité de ma séquence',
        'Préparer des variantes selon les profils clients'
      ]
    },
    {
      category: 'Conduite du Oui progressif',
      items: [
        'Démarrer par une évidence partagée évidente',
        'Maintenir un rythme naturel de conversation',
        'Observer les signaux d\'accord (verbal et non-verbal)',
        'Adapter si hésitation ou résistance',
        'Compter mentalement mes "oui" obtenus'
      ]
    },
    {
      category: 'Finalisation et closing',
      items: [
        'Récapituler tous les points d\'accord obtenus',
        'Présenter ma solution comme aboutissement logique',
        'Utiliser leurs propres mots et expressions',
        'Poser une question d\'engagement finale douce',
        'Gérer les dernières hésitations avec empathie'
      ]
    }
  ]
};