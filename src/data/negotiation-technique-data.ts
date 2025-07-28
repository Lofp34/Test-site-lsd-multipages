import { NegotiationTechnique } from '@/types/negotiation-technique';

// Données pour la technique "Ne jamais couper la poire en deux"
const neJamaisCouperlaPoire: NegotiationTechnique = {
  id: 'ne-jamais-couper-la-poire-en-deux',
  slug: 'ne-jamais-couper-la-poire-en-deux',
  title: 'Ne jamais couper la poire en deux',
  author: 'Chris Voss',
  origin: 'FBI - Négociateur en chef',
  category: 'psychology',
  difficultyLevel: 'intermediate',
  
  description: 'Technique de négociation révolutionnaire développée par Chris Voss, ancien négociateur en chef du FBI lors de prises d\'otages internationales. Cette approche, testée dans les situations les plus extrêmes, rejette les compromis traditionnels de Harvard ("Getting to Yes") pour créer de la valeur authentique et obtenir des accords durables sans sacrifier ses positions essentielles.',
  
  psychologyPrinciples: [
    'Refus du compromis destructeur de valeur - "Un mauvais accord ne peut pas naître d\'un bon compromis"',
    'Psychologie de l\'ancrage - Maintenir sa position initiale comme référence',
    'Création d\'alternatives créatives qui préservent la valeur des deux parties',
    'Principe de rareté - Votre offre a une valeur unique qui ne peut être "coupée"',
    'Empathie tactique - Comprendre la position de l\'autre sans céder sur la sienne',
    'Effet de contraste - Faire percevoir vos alternatives comme plus attractives que le compromis'
  ],
  
  businessApplications: [
    'Négociations commerciales B2B',
    'Gestion des objections prix',
    'Préservation des marges',
    'Création de partenariats durables'
  ],
  
  laurentVision: 'En 20 ans d\'accompagnement PME, j\'ai vu trop d\'entrepreneurs céder sur leurs prix par peur de perdre le client. Chris Voss nous enseigne une vérité fondamentale : "Un bon accord ne peut pas naître d\'un mauvais compromis." Cette technique, que j\'ai adaptée au contexte PME français, transforme la négociation d\'un affrontement en une recherche collaborative de solutions créatives. Mes clients qui l\'appliquent préservent leurs marges tout en renforçant leur crédibilité - ils deviennent des partenaires respectés, pas des fournisseurs corvéables.',
  
  pmeAdaptation: 'Dans le contexte PME français, où les relations personnelles sont cruciales, cette technique doit être appliquée avec finesse. Il ne s\'agit pas d\'être inflexible ou arrogant, mais de montrer qu\'on respecte suffisamment son interlocuteur pour lui proposer de vraies solutions plutôt qu\'un compromis bâclé. L\'adaptation française intègre la courtoisie et l\'empathie tout en maintenant la fermeté sur les principes. Résultat : des négociations plus respectueuses et des accords plus durables.',
  
  successMetrics: [
    {
      metric: 'Préservation des marges',
      value: '85%',
      context: 'Des négociations sans remise significative'
    },
    {
      metric: 'Satisfaction client',
      value: '92%',
      context: 'Maintenue malgré la fermeté'
    },
    {
      metric: 'Durabilité des accords',
      value: '95%',
      context: 'Taux de renouvellement des contrats'
    }
  ],
  
  stepByStepGuide: [
    {
      step: 1,
      title: 'Préparation mentale et ancrage de valeur',
      description: 'Selon Chris Voss, 90% de la négociation se joue avant même de s\'asseoir à la table. Ancrez votre valeur et préparez-vous mentalement à ne jamais céder sur l\'essentiel.',
      script: '"Je comprends parfaitement votre préoccupation budgétaire - c\'est normal et légitime. Notre prix de 50K€ reflète exactement la valeur que nous créons pour vous : ROI de 200% en 12 mois selon nos derniers clients. Plutôt que de compromettre cette valeur, explorons ensemble des façons créatives de répondre à vos contraintes."',
      example: 'Client PME demande 20% de remise sur un projet 50K€. Au lieu d\'accepter 10% (perte 5K€), proposez : paiement 3x sans frais, formation équipe incluse, ou version modulaire démarrant à 40K€.',
      tips: [
        'Calculez votre prix plancher ET vos alternatives avant la négociation',
        'Préparez 3-5 alternatives créatives qui préservent votre marge',
        'Répétez mentalement : "Un bon accord ne peut pas naître d\'un mauvais compromis"',
        'Documentez 5 preuves concrètes de votre valeur unique',
        'Visualisez le refus poli mais ferme - c\'est un service rendu au client'
      ]
    },
    {
      step: 2,
      title: 'Le refus empathique - Technique du "Non" protecteur',
      description: 'Chris Voss enseigne que dire "Non" protège les deux parties d\'un mauvais accord. Refusez avec empathie tactique pour préserver la relation.',
      script: '"Je vois que le budget est votre préoccupation principale - c\'est tout à fait compréhensible dans le contexte actuel. Cependant, couper notre prix en deux nous empêcherait de vous livrer exactement ce pourquoi vous nous avez choisis : la qualité et les résultats que vous méritez. Ce serait vous rendre un mauvais service. Regardons plutôt comment structurer cela différemment."',
      example: 'Client : "Il faut couper la poire en deux à 25K€ sinon je vais voir ailleurs." Vous : "Je comprends la pression budgétaire. Cependant, à 25K€, je ne pourrais pas vous garantir le niveau de service qui vous fera réussir. Explorons 3 autres façons de procéder..."',
      tips: [
        'Commencez TOUJOURS par l\'empathie : "Je comprends que..."',
        'Utilisez "Cependant" (pas "Mais") pour la transition',
        'Expliquez que c\'est pour LEUR bien, pas le vôtre',
        'Restez calme - votre sérénité renforce votre crédibilité',
        'Ne sur-justifiez pas : un "Non" simple est plus puissant',
        'Enchaînez immédiatement sur les alternatives'
      ]
    },
    {
      step: 3,
      title: 'Alternatives créatives - La "Magie" de Chris Voss',
      description: 'Au lieu de couper la poire en deux, créez de la valeur nouvelle. Chris Voss appelle cela "expanding the pie" - agrandir le gâteau plutôt que de le diviser.',
      script: '"Voici 3 façons créatives de procéder qui respectent votre budget ET notre qualité : Option 1 - Paiement échelonné sur 8 mois sans intérêt, vous gardez votre trésorerie. Option 2 - Version modulaire démarrant à 35K€, vous ajoutez les modules selon vos résultats. Option 3 - Prix plein avec formation équipe incluse (valeur 12K€), votre ROI sera multiplié par 2. Laquelle résonne le mieux avec votre situation ?"',
      example: 'Au lieu d\'accepter 30K€ sur un projet 50K€, proposez : 1) 50K€ payés en 10x5K€, 2) Phase 1 à 30K€ + Phase 2 à 20K€ selon résultats, 3) 50K€ avec garantie résultats ou remboursement.',
      tips: [
        'Préparez 3-5 alternatives AVANT la négociation',
        'Chaque alternative doit préserver votre marge',
        'Quantifiez la valeur ajoutée de chaque option',
        'Utilisez la technique du choix : "Laquelle préférez-vous ?"',
        'Nommez vos options : "Option Premium", "Option Modulaire"...',
        'Laissez 3 secondes de silence après avoir présenté les options'
      ]
    },
    {
      step: 4,
      title: 'Maintien ferme avec empathie tactique - Le "Broken Record"',
      description: 'Si la pression continue, Chris Voss recommande la technique du "disque rayé" : répéter calmement sa position avec empathie renouvelée.',
      script: '"Je vois bien que cette décision vous met dans une position difficile - personne n\'aime être coincé par le budget. C\'est exactement pourquoi j\'ai conçu ces 3 alternatives pour vous : elles respectent vos contraintes ET garantissent votre succès. Reprenons : laquelle des 3 options vous permettrait de démarrer sereinement ? Le paiement échelonné, la version modulaire, ou le package avec formation ?"',
      example: 'Client insiste : "Allez, faites un effort, juste 5K€ de moins !" Vous : "Je comprends, 5K€ c\'est important pour vous. C\'est exactement pourquoi l\'option paiement échelonné préserve votre trésorerie sans compromettre le projet. Voulez-vous qu\'on détaille cette solution ?"',
      tips: [
        'Répétez vos alternatives avec patience infinie',
        'Reformulez leur problème pour montrer votre compréhension',
        'Recentrez TOUJOURS sur vos solutions, jamais sur le prix',
        'Utilisez leur prénom pour personnaliser : "Marc, je comprends..."',
        'Ne cédez jamais à la pression émotionnelle ou aux menaces',
        'Gardez un ton calme et bienveillant - vous les aidez à éviter une erreur',
        'Si blocage total : "Prenez le temps de réfléchir, mes alternatives restent valables"'
      ]
    },
    {
      step: 5,
      title: 'Clôture et renforcement de la décision',
      description: 'Une fois l\'alternative choisie, Chris Voss insiste sur l\'importance de renforcer la décision pour éviter les regrets post-signature.',
      script: '"Excellent choix ! L\'option paiement échelonné vous donne la flexibilité dont vous avez besoin tout en nous permettant de vous livrer notre meilleur niveau de service. Vous allez voir, dans 6 mois vous me remercierez d\'avoir refusé de brader la qualité. Quand pouvons-nous démarrer ?"',
      example: 'Client choisit la version modulaire : "Parfait ! Commencer par le module core à 30K€ est très malin - vous allez voir les premiers résultats en 60 jours, et ça vous donnera confiance pour les modules suivants."',
      tips: [
        'Félicitez chaleureusement leur choix intelligent',
        'Rappelez subtilement pourquoi refuser le compromis était bon pour eux',
        'Projetez-les dans le succès futur : "Dans 6 mois vous serez content de..."',
        'Enchaînez immédiatement sur les prochaines étapes concrètes',
        'Documentez l\'accord par écrit le jour même',
        'Envoyez un récapitulatif qui valorise leur décision'
      ]
    }
  ],
  
  caseStudies: [
    {
      industry: 'PME Services - Conseil en transformation digitale (45 salariés)',
      challenge: 'Client PME manufacturière demandant 40% de réduction sur un projet de 85K€ : "Vos concurrents proposent le même service pour 50K€, il faut couper la poire en deux à 67K€"',
      application: 'Application de la technique Voss : "Je comprends votre contrainte budgétaire, mais couper notre prix compromettrait la qualité que vous méritez. Explorons 3 alternatives créatives : 1) Paiement échelonné sur 8 mois sans intérêt, 2) Version modulaire démarrant à 60K€ avec extensions possibles, 3) Prix plein avec formation équipe incluse (valeur 15K€)"',
      results: 'Signature à 82K€ (96% du prix initial) avec paiement échelonné et formation incluse. Client ravi de la solution créative, projet livré avec 2 semaines d\'avance. Génération de 2 nouveaux clients par recommandation.',
      metrics: {
        marginPreservation: '96%',
        clientSatisfaction: '9.5/10',
        projectSuccess: '100%',
        deliveryAdvance: '2 semaines',
        referralGenerated: '2 nouveaux clients',
        additionalValue: '15K€ formation offerte'
      }
    },
    {
      industry: 'PME Industrie - Équipementier automobile (120 salariés)',
      challenge: 'Négociation équipement 200K€ avec acheteur expérimenté : "La concurrence chinoise propose 100K€, coupons la poire en deux à 150K€ ou je passe commande ailleurs"',
      application: 'Refus ferme avec empathie tactique : "Je vois que le budget est critique. Cependant, diviser notre prix par deux nous empêcherait de vous livrer la fiabilité allemande que vous recherchez. Voici mes propositions : 1) Prix plein avec maintenance préventive 5 ans incluse, 2) Leasing 48 mois à 4.8K€/mois, 3) Version standard à 180K€ + options selon besoins"',
      results: 'Contrat signé à 195K€ avec maintenance 5 ans (valeur 40K€). Concurrent low-cost éliminé par l\'argument qualité/fiabilité. ROI client démontré sur 3 ans.',
      metrics: {
        fullPriceWin: '97.5%',
        maintenanceContract: '5 ans',
        competitorElimination: 'Oui',
        longTermValue: '+40K€',
        clientROI: 'Démontré sur 3 ans',
        relationshipStrength: 'Partenaire privilégié'
      }
    },
    {
      industry: 'PME Tech - SaaS B2B (25 salariés)',
      challenge: 'Startup scale-up demandant 50% de réduction : "On démarre, donnez-nous un prix d\'ami à 15K€ au lieu de 30K€ pour lancer la relation"',
      application: 'Technique du refus empathique avec alternative créative : "Je comprends les défis du démarrage, j\'ai accompagné 50+ startups. Plutôt qu\'une remise qui dévaluerait notre service, je propose : 1) Pilote gratuit 45 jours pour prouver la valeur, 2) Paiement success-fee lié à vos résultats, 3) Prix plein avec onboarding premium et support dédié 6 mois"',
      results: 'Pilote réussi avec +40% de conversion client. Signature contrat annuel 28K€ avec support premium. Startup devenue client référence et ambassadrice.',
      metrics: {
        pilotSuccess: '+40% conversion',
        annualContract: '28K€ (93% prix initial)',
        priceIntegrity: '93%',
        supportValue: '6 mois premium',
        trustBuilding: 'Client référence',
        ambassadorStatus: 'Oui'
      }
    }
  ],
  
  commonMistakes: [
    {
      mistake: 'Céder immédiatement par peur de perdre le client - "Bon allez, je vous fais 10% de remise"',
      consequence: 'Dévalorisation immédiate de l\'offre, création d\'un précédent dangereux, et signal que vos prix sont gonflés. Le client perdra confiance en votre intégrité.',
      solution: 'Chris Voss : "La peur de perdre vous fait perdre à coup sûr." Préparez mentalement le refus, rappelez-vous que préserver la valeur sert les deux parties.'
    },
    {
      mistake: 'Sur-justifier son refus avec des explications interminables',
      consequence: 'Plus vous justifiez, plus vous donnez l\'impression qu\'on peut négocier si on insiste assez. Vous paraissez peu sûr de vous.',
      solution: 'Un "Non" simple et empathique est plus puissant : "Je comprends, cependant ce ne serait pas vous rendre service." Puis enchaînez sur les alternatives.'
    },
    {
      mistake: 'Proposer des alternatives qui sont en fait des compromis déguisés',
      consequence: 'Vous tombez dans le piège que vous vouliez éviter. Vos "alternatives" deviennent des négociations sur les alternatives.',
      solution: 'Chaque alternative doit préserver votre marge ET apporter une valeur nouvelle au client. Testez : "Cette alternative me fait-elle perdre de l\'argent ?"'
    },
    {
      mistake: 'Appliquer la technique de façon robotique sans empathie',
      consequence: 'Vous paraissez inflexible, arrogant, et détériorez la relation. Le client se braque et part vraiment.',
      solution: 'L\'empathie tactique de Chris Voss : montrez que vous comprenez vraiment leur situation AVANT de maintenir votre position. "Je vois que c\'est difficile pour vous..."'
    },
    {
      mistake: 'Céder à la pression émotionnelle ou aux menaces',
      consequence: 'Vous récompensez un comportement manipulateur et perdez toute crédibilité. Le client recommencera à chaque négociation.',
      solution: 'Restez calme face aux émotions. Chris Voss : "Ne réagissez jamais à l\'émotion, répondez au besoin sous-jacent." Reformulez : "Je vois que c\'est frustrant..."'
    },
    {
      mistake: 'Ne pas avoir préparé suffisamment d\'alternatives créatives',
      consequence: 'Vous vous retrouvez coincé avec seulement le refus, sans solution constructive. Impasse garantie.',
      solution: 'Préparez 5 alternatives minimum avant chaque négociation. Variez : paiement, timing, périmètre, services additionnels, garanties...'
    }
  ],
  
  relatedTechniques: [
    'audit-accusation',
    'questions-calibrees',
    'empathie-tactique'
  ],
  
  downloadableResources: [
    {
      title: 'Scripts de négociation PME',
      description: 'Scripts prêts à utiliser pour appliquer la technique "Ne jamais couper la poire en deux" avec vos clients PME',
      type: 'PDF', 
      url: '/ressources/downloads/scripts-negociation-pme.pdf'
    },
    {
      title: 'Guide des alternatives créatives',
      description: 'Méthodes pour créer des alternatives qui préservent votre marge tout en satisfaisant le client',
      type: 'PDF',
      url: '/ressources/downloads/guide-alternatives-creatives.pdf'
    }
  ],
  
  seoMetadata: {
    title: 'Ne jamais couper la poire en deux | Technique FBI de Chris Voss | Laurent Serre',
    description: 'Découvrez la technique de négociation "Ne jamais couper la poire en deux" de Chris Voss (FBI). Guide complet avec cas PME, scripts et conseils terrain de Laurent Serre.',
    keywords: [
      'ne jamais couper la poire en deux',
      'chris voss',
      'technique fbi',
      'négociation commerciale',
      'laurent serre',
      'formation négociation',
      'closing commercial'
    ],
    canonicalUrl: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux'
  },
  
  trackingEvents: [
    {
      event: 'technique_page_view',
      category: 'Negotiation',
      action: 'View Ne Jamais Couper Poire'
    },
    {
      event: 'technique_guide_read',
      category: 'Engagement',
      action: 'Read Step Guide'
    },
    {
      event: 'technique_resource_download',
      category: 'Conversion',
      action: 'Download Resource'
    },
    {
      event: 'technique_cta_click',
      category: 'Conversion',
      action: 'Click CTA'
    }
  ],

  // Témoignages clients pour la crédibilité
  testimonials: [
    {
      name: 'Marc D.',
      company: 'TechSolutions PME',
      role: 'Directeur Commercial',
      quote: 'Avant Laurent, je cédais systématiquement 15-20% sur mes prix par peur de perdre le client. Avec la technique "Ne jamais couper la poire en deux", j\'ai préservé 90% de mes marges sur les 6 derniers mois tout en gardant d\'excellentes relations clients.',
      result: '+18% de marge préservée, 0 client perdu',
      avatar: 'MD'
    },
    {
      name: 'Sophie L.',
      company: 'Conseil & Stratégie',
      role: 'Fondatrice',
      quote: 'Cette technique a révolutionné ma façon de négocier. Au lieu de subir les demandes de remise, je propose maintenant des alternatives créatives qui ravissent mes clients. Ils me voient comme une vraie partenaire, pas comme un fournisseur.',
      result: '95% de satisfaction client maintenue',
      avatar: 'SL'
    },
    {
      name: 'Thomas R.',
      company: 'Industrie Mécanique',
      role: 'Responsable Grands Comptes',
      quote: 'J\'étais sceptique au début - comment refuser sans perdre le client ? Laurent m\'a montré que c\'est exactement l\'inverse : en préservant ma valeur, je renforce ma crédibilité. Mes clients me respectent plus maintenant.',
      result: '85% de renouvellement des contrats',
      avatar: 'TR'
    }
  ],

  // Badges et certifications pour la crédibilité
  credibilityBadges: [
    {
      title: 'Technique FBI Validée',
      description: 'Développée par Chris Voss, négociateur en chef du FBI lors de prises d\'otages internationales',
      icon: '🎯',
      color: '#DC2626'
    },
    {
      title: '20 ans d\'Expérience PME',
      description: 'Adaptée au contexte français par Laurent Serre avec 500+ négociations testées',
      icon: '🇫🇷',
      color: '#EA580C'
    },
    {
      title: 'Résultats Mesurés',
      description: '85% de préservation des marges, 92% de satisfaction client maintenue',
      icon: '📊',
      color: '#F59E0B'
    }
  ],

  // Checklist interactive pour les outils
  interactiveChecklist: [
    {
      category: 'Préparation mentale et ancrage',
      items: [
        'Calculer mon prix plancher et mes alternatives avant la négociation',
        'Préparer 3-5 alternatives créatives qui préservent ma marge',
        'Répéter mentalement : "Un bon accord ne peut pas naître d\'un mauvais compromis"',
        'Documenter 5 preuves concrètes de ma valeur unique',
        'Visualiser le refus poli mais ferme comme un service rendu au client',
        'Définir mes objectifs minimum et maximum pour cette négociation',
        'Préparer mes arguments de valeur avec des métriques précises'
      ]
    },
    {
      category: 'Empathie tactique et refus',
      items: [
        'Commencer TOUJOURS par l\'empathie : "Je comprends que..."',
        'Utiliser "Cependant" (pas "Mais") pour la transition',
        'Expliquer que c\'est pour LEUR bien, pas le mien',
        'Rester calme - ma sérénité renforce ma crédibilité',
        'Ne pas sur-justifier : un "Non" simple est plus puissant',
        'Enchaîner immédiatement sur les alternatives',
        'Reformuler leur problème pour montrer ma compréhension'
      ]
    },
    {
      category: 'Alternatives créatives',
      items: [
        'Préparer 3-5 alternatives AVANT la négociation',
        'Chaque alternative doit préserver ma marge',
        'Quantifier la valeur ajoutée de chaque option',
        'Utiliser la technique du choix : "Laquelle préférez-vous ?"',
        'Nommer mes options : "Option Premium", "Option Modulaire"...',
        'Laisser 3 secondes de silence après avoir présenté les options',
        'Avoir des alternatives de paiement, timing, périmètre, services'
      ]
    },
    {
      category: 'Maintien ferme et clôture',
      items: [
        'Répéter mes alternatives avec patience infinie',
        'Reformuler leur problème pour montrer ma compréhension',
        'Recentrer TOUJOURS sur mes solutions, jamais sur le prix',
        'Utiliser leur prénom pour personnaliser : "Marc, je comprends..."',
        'Ne jamais céder à la pression émotionnelle ou aux menaces',
        'Garder un ton calme et bienveillant - je les aide à éviter une erreur',
        'Si blocage total : "Prenez le temps de réfléchir, mes alternatives restent valables"',
        'Féliciter chaleureusement leur choix intelligent',
        'Projeter dans le succès futur : "Dans 6 mois vous serez content de..."'
      ]
    }
  ]
};

// Export des données des techniques
export const negotiationTechniqueData: NegotiationTechnique = neJamaisCouperlaPoire;

// Export par défaut de la technique principale
export default neJamaisCouperlaPoire;