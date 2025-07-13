// Structure de données pour la librairie des meilleurs livres
export type Book = {
  slug: string;
  title: string;
  author: string;
  year: number;
  cover: string; // à compléter plus tard
  tagline: string;
  summary: string;
  category: string;
};

export type BookCategory = {
  slug: string;
  title: string;
  pitch: string;
  books: Book[];
};

export const bookCategories: BookCategory[] = [
  {
    slug: "prospection-sdr",
    title: "Prospection & SDR",
    pitch: "Générer du pipe : scripts, cadence, mindset",
    books: [
      {
        slug: "fanatical-prospecting",
        title: "Fanatical Prospecting",
        author: "Jeb Blount",
        year: 2015,
        cover: "/covers/fanatical-prospecting.jpg",
        tagline: "La bible de la prospection moderne, pour remplir son pipe sans relâche.",
        summary: "Un guide incontournable pour générer un flux constant d’opportunités. Blount détaille les 5 C du social selling, un cadre téléphonique en 5 étapes, et insiste sur l’importance d’une prospection régulière. Tactiques applicables pour surmonter les objections et obtenir plus de rendez-vous qualifiés.",
        category: "prospection-sdr",
      },
      {
        slug: "predictable-revenue",
        title: "Predictable Revenue",
        author: "Aaron Ross & Marylou Tyler",
        year: 2011,
        cover: "/covers/predictable-revenue.jpg",
        tagline: "Le modèle SaaS pour générer un flux de leads prévisible.",
        summary: "La 'bible' de la prospection SaaS. Ross introduit la spécialisation des rôles (SDR, closer, farmer), le Cold Calling 2.0, et la segmentation Seeds/Nets/Spears. Un processus outbound reproductible pour une croissance régulière.",
        category: "prospection-sdr",
      },
      {
        slug: "sales-development-playbook",
        title: "The Sales Development Playbook",
        author: "Trish Bertuzzi",
        year: 2016,
        cover: "/covers/sales-development-playbook.jpg",
        tagline: "Le manuel pour bâtir une équipe SDR performante.",
        summary: "Six piliers du succès SDR : stratégie, spécialisation, recrutement, motivation, exécution, leadership. Conseils pratiques pour aligner vente/marketing, segmenter les prospects, structurer l’équipe, et scripts d’appels/emails efficaces.",
        category: "prospection-sdr",
      },
      {
        slug: "new-sales-simplified",
        title: "New Sales. Simplified.",
        author: "Mike Weinberg",
        year: 2012,
        cover: "/covers/new-sales-simplified.jpg",
        tagline: "Le retour aux fondamentaux de la conquête client.",
        summary: "Un cadre simple pour conquérir de nouveaux clients : histoire de vente convaincante, liste ciblée, ouverture d’appel à froid, emails percutants, power statement. Un concentré de bonnes pratiques pour maîtriser l’art du cold call.",
        category: "prospection-sdr",
      },
      {
        slug: "sales-development-cracking-code",
        title: "Sales Development: Cracking the Code of Outbound Sales",
        author: "Cory Bray & Hilmon Sorey",
        year: 2018,
        cover: "/covers/sales-development-cracking-code.jpg",
        tagline: "Le guide moderne et actionnable du SDR outbound.",
        summary: "Tout le processus SDR : séquences multicanal, qualification, collaboration avec les AE, conseils de carrière. Un manuel opérationnel pour professionnaliser la prospection outbound et progresser en équipe.",
        category: "prospection-sdr",
      },
    ],
  },
  {
    slug: "negociation-closing",
    title: "Négociation & Closing",
    pitch: "Transformer les deals sans couper la poire",
    books: [
      {
        slug: "never-split-the-difference",
        title: "Never Split the Difference",
        author: "Chris Voss",
        year: 2016,
        cover: "/covers/never-split-the-difference.jpg",
        tagline: "Révolutionnez vos négociations avec l’empathie tactique.",
        summary: "L’ancien négociateur du FBI Chris Voss enseigne l’empathie tactique, l’écoute active, le mirroring et l’art d’obtenir la confiance de l’autre partie pour négocier sans concession inutile.",
        category: "negociation-closing",
      },
      {
        slug: "getting-to-yes",
        title: "Getting to Yes",
        author: "Roger Fisher & William Ury",
        year: 1981,
        cover: "/covers/getting-to-yes.jpg",
        tagline: "Le classique de la négociation raisonnée de Harvard.",
        summary: "Fisher et Ury exposent une méthode en quatre principes pour trouver des accords gagnant-gagnant : raisonner en intérêts, générer des options mutuellement avantageuses, s’appuyer sur des critères objectifs, dissocier les personnes du problème. Introduction du concept de BATNA pour négocier avec sérénité.",
        category: "negociation-closing",
      },
      {
        slug: "spin-selling",
        title: "SPIN Selling",
        author: "Neil Rackham",
        year: 1988,
        cover: "/covers/spin-selling.jpg",
        tagline: "La méthode structurée pour la vente complexe.",
        summary: "SPIN Selling est l’une des premières méthodes de vente consultative fondées sur la recherche, centrée sur le questionnement et la création de valeur conjointe. Basé sur 12 ans de recherche et l’analyse de 35 000 entretiens, Rackham propose une séquence de questions (Situation, Problème, Implication, Need-payoff) pour amener le client à exprimer ses besoins et la valeur de la solution.",
        category: "negociation-closing",
      },
      {
        slug: "the-challenger-sale",
        title: "The Challenger Sale",
        author: "Matthew Dixon & Brent Adamson",
        year: 2011,
        cover: "/covers/the-challenger-sale.jpg",
        tagline: "Vendre en leader d’opinion, bousculer le statu quo.",
        summary: "Basé sur une vaste étude, ce livre identifie le profil du Challenger comme le plus performant. Le vendeur Challenger éduque le client, personnalise son approche et contrôle la vente. Il ose remettre en question la vision du client, apporte des idées nouvelles et sait gérer des ventes complexes à multiples décideurs.",
        category: "negociation-closing",
      },
      {
        slug: "art-du-closing",
        title: "L’Art du closing",
        author: "Anthony Iannarino, Zig Ziglar, Brian Tracy…",
        year: 2017,
        cover: "/covers/art-du-closing.jpg",
        tagline: "Obtenir l’engagement final du client, étape par étape.",
        summary: "Le closing n’est pas un acte unique, mais une série de mini-engagements tout au long du processus de vente. Apport moderne d’Anthony Iannarino : chaque étape doit apporter de la valeur pour mériter la signature. Conseils concrets pour répondre aux dernières objections, créer l’urgence et formuler la demande de commande avec confiance.",
        category: "negociation-closing",
      },
    ]
  },
  {
    slug: "psychologie-influence",
    title: "Psychologie & Influence",
    pitch: "Décoder et guider les décisions d’achat",
    books: [
      {
        slug: "influence",
        title: "Influence: The Psychology of Persuasion",
        author: "Robert Cialdini",
        year: 1984,
        cover: "/covers/influence.jpg",
        tagline: "Le classique de la persuasion.",
        summary: "Cialdini y détaille 6 grands principes universels qui guident nos comportements d’acceptation et explique comment les mettre en œuvre de façon éthique.",
        category: "psychologie-influence"
      },
      {
        slug: "comment-se-faire-des-amis",
        title: "Comment se faire des amis",
        author: "Dale Carnegie",
        year: 1936,
        cover: "",
        tagline: "Le classique intemporel de la psychologie relationnelle.",
        summary: "Carnegie distille des conseils concrets pour améliorer ses relations et influencer positivement autrui : manifester un intérêt sincère, se souvenir du prénom, éviter la critique frontale, valoriser honnêtement les qualités de l’autre… L’influence commence par l’empathie et la bienveillance.",
        category: "psychologie-influence"
      },
      {
        slug: "thinking-fast-and-slow",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        year: 2011,
        cover: "",
        tagline: "Comprendre les biais cognitifs et la psychologie de la décision.",
        summary: "Kahneman explique que notre esprit comporte deux systèmes de pensée : le Système 1, rapide, instinctif et émotionnel, et le Système 2, plus lent, réfléchi et logique. De nombreux biais cognitifs proviennent des raccourcis du Système 1. Ce livre enseigne une pensée plus critique et lucide.",
        category: "psychologie-influence"
      },
      {
        slug: "predictably-irrational",
        title: "Predictably Irrational",
        author: "Dan Ariely",
        year: 2008,
        cover: "",
        tagline: "Comprendre l’irrationalité prévisible de nos décisions.",
        summary: "Ariely démontre à travers des expériences à quel point nos décisions sont souvent irrationnelles… de manière prévisible ! Il décortique l’effet de leurre, le pouvoir de la gratuité, le biais d’ancrage, et explique pourquoi nous accordons trop de valeur à nos possessions.",
        category: "psychologie-influence"
      },
      {
        slug: "pre-suasion",
        title: "Pré-Suasion",
        author: "Robert Cialdini",
        year: 2016,
        cover: "",
        tagline: "L’art de préparer le terrain psychologique avant de persuader.",
        summary: "Cialdini s’intéresse à l’art de la préparation mentale à la persuasion : « le moment avant le message » compte autant que le message lui-même. Pré-Suasion ajoute un 7e principe à la liste de Cialdini : l’unité (créer un sentiment d’identité commune avec son audience).",
        category: "psychologie-influence"
      },
    ]
  },
  {
    slug: "methodes-process",
    title: "Méthodes & Process",
    pitch: "Cadres éprouvés, de SPIN à Challenger",
    books: [
      {
        slug: "spin-selling",
        title: "SPIN Selling",
        author: "Neil Rackham",
        year: 1988,
        cover: "/covers/spin-selling.jpg",
        tagline: "La méthode structurée pour la vente complexe.",
        summary: "SPIN Selling est l’une des premières méthodes de vente consultative fondées sur la recherche, centrée sur le questionnement et la création de valeur conjointe. Basé sur 12 ans de recherche et l’analyse de 35 000 entretiens, Rackham propose une séquence de questions (Situation, Problème, Implication, Need-payoff) pour amener le client à exprimer ses besoins et la valeur de la solution.",
        category: "methodes-process"
      },
      {
        slug: "the-challenger-sale",
        title: "The Challenger Sale",
        author: "Matthew Dixon & Brent Adamson",
        year: 2011,
        cover: "/covers/the-challenger-sale.jpg",
        tagline: "Vendre en leader d’opinion, bousculer le statu quo.",
        summary: "Basé sur une vaste étude, ce livre identifie le profil du Challenger comme le plus performant. Le vendeur Challenger éduque le client, personnalise son approche et contrôle la vente. Il ose remettre en question la vision du client, apporte des idées nouvelles et sait gérer des ventes complexes à multiples décideurs.",
        category: "methodes-process"
      },
      {
        slug: "solution-selling",
        title: "Solution Selling",
        author: "Michael Bosworth",
        year: 1994,
        cover: "/covers/solution-selling.jpg",
        tagline: "La méthode pour vendre en résolvant les problèmes clients.",
        summary: "Solution Selling propose un processus en plusieurs étapes : rechercher les difficultés du client, les qualifier, proposer une vision de la solution, faire valider cette vision, justifier le ROI, puis négocier l’accord. L’accent est mis sur la découverte approfondie : un bon vendeur doit agir comme un médecin qui pose un diagnostic avant de prescrire.",
        category: "methodes-process"
      },
      {
        slug: "gap-selling",
        title: "Gap Selling",
        author: "Keenan",
        year: 2018,
        cover: "/covers/gap-selling.jpg",
        tagline: "La méthode pour combler le fossé entre l’état actuel et l’état désiré du client.",
        summary: "Gap Selling est centré sur le concept de “combler le fossé” (gap) entre l’état actuel du client et l’état futur souhaité. Le commercial agit comme un diagnosticien : il doit découvrir la situation présente du client, l’aider à définir où il veut aller, puis montrer comment la solution réduit ce gap.",
        category: "methodes-process"
      },
      {
        slug: "strategic-selling",
        title: "Strategic Selling",
        author: "Robert Miller & Stephen Heiman",
        year: 1985,
        cover: "/covers/strategic-selling.jpg",
        tagline: "Le guide de la vente grands comptes structurée.",
        summary: "Strategic Selling propose un processus structuré pour gérer des ventes complexes impliquant de multiples décideurs. L’outil clé est la “Blue Sheet” : cartographier tous les acteurs du compte, leurs critères de succès et le plan d’action pour chacun. La méthode introduit aussi le concept de win-win partagé et la notion de “vendre avec le client”.",
        category: "methodes-process"
      }
    ]
  },
  {
    slug: "enterprise-account",
    title: "Enterprise & Accounts",
    pitch: "Vendre gros, long et complexe",
    books: [
      {
        slug: "the-challenger-customer",
        title: "The Challenger Customer",
        author: "Brent Adamson et al.",
        year: 2015,
        cover: "/covers/the-challenger-customer.jpg",
        tagline: "Mobiliser les bons alliés pour vendre à un comité d’achat complexe.",
        summary: "Suite du Challenger Sale, ce livre se focalise sur l’autre côté de la table : comment vendre efficacement à un comité d’achat complexe. Les auteurs démystifient le processus d’achat en entreprise moderne, qu’ils décrivent comme dysfonctionnel par défaut : en moyenne 5,4 personnes participent à la décision, chacune avec ses priorités, ce qui conduit souvent à l’immobilisme. La clé est d’identifier et de mobiliser un Challenger Customer, un allié interne qui va challenger le statu quo et évangéliser le changement. Le livre fournit des stratégies pour équiper ces alliés et en faire des relais capables de construire le consensus interne autour de votre solution. Un guide précieux pour naviguer les méandres politiques d’un grand compte et remporter l’adhésion collective nécessaire à la signature.",
        category: "enterprise-account"
      },
      {
        slug: "mastering-the-complex-sale",
        title: "Mastering the Complex Sale",
        author: "Jeff Thull",
        year: 2003,
        cover: "/covers/mastering-the-complex-sale.jpg",
        tagline: "Le cadre stratégique pour réussir les ventes complexes et vendre de la valeur.",
        summary: "Jeff Thull propose un cadre stratégique appelé 'Diagnostic Business Development' pour réussir les ventes complexes. Il insiste sur la notion de valeur : l’erreur de nombreux commerciaux est de vendre leur produit, au lieu d’aider le client à diagnostiquer ses vrais besoins et à quantifier la valeur d’une solution. Thull articule un processus en quatre phases (modèle Prime Process) : Discover, Diagnose, Design, Deliver. En Discover : identifier les clients cibles et formuler une hypothèse de valeur ; en Diagnose : approfondir avec le client pour découvrir les causes racines de ses problèmes ; en Design : co-concevoir avec lui une solution sur mesure ; en Deliver : déployer la solution et mesurer les résultats. Mastering the Complex Sale insiste sur l’importance d’éviter la commoditisation de son offre en apportant cette approche conseil unique. L’auteur met aussi en garde contre les pièges pour le commercial (vouloir trop présenter trop tôt, mal qualifier le processus décisionnel, etc.). Ce livre fournit une feuille de route méthodique pour vendre de la valeur et bâtir une relation de confiance, particulièrement utile pour des ventes B2B complexes où le risque d’échouer en faisant tout bien est élevé si on ne réinvente pas le modèle de discussion.",
        category: "enterprise-account"
      },
      {
        slug: "key-account-management-definitive-guide",
        title: "Key Account Management: The Definitive Guide",
        author: "Diana Woodburn & Malcolm McDonald",
        year: 2019,
        cover: "/covers/key-account-management-definitive-guide.jpg",
        tagline: "Le guide avancé pour structurer un programme KAM performant et mondialement cohérent.",
        summary: "Cette référence académique offre un panorama complet des meilleures pratiques en gestion des comptes stratégiques. Elle fournit des outils structurés pour segmenter ses clients clés, bâtir des plans d’action par compte, développer les relations multi-niveaux et mesurer la profitabilité des comptes. Woodburn et McDonald définissent notamment comment identifier un 'compte clé' (KAM) – typiquement via une matrice attrait du compte / position concurrentielle – et comment formaliser un plan de compte détaillé : objectifs du client, plan de création de valeur, plan de contacts du compte, etc. Ils insistent aussi sur les compétences du Key Account Manager (communication, influence interne, compréhension du business client, leadership transversal) et sur l’importance d’une culture d’entreprise orientée client pour réussir le KAM. Cet ouvrage puise dans des recherches de l’université de Cranfield et sert de guide avancé pour structurer un programme KAM performant et mondialement cohérent. Un manuel exhaustif pour passer d’une gestion opportuniste des grands comptes à une démarche stratégique et collaborative.",
        category: "enterprise-account"
      },
      {
        slug: "the-new-successful-large-account-management",
        title: "The New Successful Large Account Management (LAMP)",
        author: "Robert Miller, Stephen Heiman, Tad Tuleja",
        year: 2005,
        cover: "/covers/the-new-successful-large-account-management.jpg",
        tagline: "La méthode LAMP pour industrialiser la gestion et la croissance des grands comptes.",
        summary: "Les fondateurs de Miller Heiman ont formalisé le processus de management des comptes existants via la méthode LAMP (Large Account Management Process). Ce livre explique comment classer ses comptes (top, stratégiques…) et comment élaborer un plan de croissance par compte. La philosophie est de construire des relations long terme mutuellement profitables. Les auteurs détaillent comment conduire régulièrement des revues de compte avec le client, comment détecter de nouvelles opportunités de vente upsell/cross-sell, et comment apporter davantage de valeur pour devenir un partenaire indispensable du client. LAMP fournit des outils pratiques comme l’analyse des 'white spaces' (identifier les lignes de produits non encore vendues au client), le plan d’action annuel co-construit, etc. Il s’agit d’industrialiser la gestion de la relation client pour fidéliser et développer ses principaux clients. Un impératif quand on sait que généralement 20% des clients génèrent 80% du chiffre d’affaires. Ce livre, parent du Strategic Selling, aide à passer d’une posture de vendeur à celle de gestionnaire de partenariat sur le long terme.",
        category: "enterprise-account"
      },
      {
        slug: "selling-to-big-companies",
        title: "Selling to Big Companies",
        author: "Jill Konrath",
        year: 2005,
        cover: "/covers/selling-to-big-companies.jpg",
        tagline: "Le guide concret pour prospecter et obtenir des rendez-vous avec les grands comptes.",
        summary: "Focus sur la prospection des grands comptes. Jill Konrath y aborde un problème concret : comment réussir à obtenir l’attention et des rendez-vous avec des décideurs très sollicités dans les grandes entreprises. Elle commence par dresser le constat que les acheteurs B2B sont saturés, surinformés, pressés, et qu’il est de plus en plus difficile de 'percer' jusqu’à eux. Konrath propose une approche méthodique pour y parvenir : 1) Cibler finement un segment d’industrie ou de fonction, 2) Rechercher les enjeux et priorités spécifiques de ces prospects, 3) Préparer un message d’accroche ultra-pertinent qui montre en une phrase qu’on peut résoudre un de leurs problèmes critiques, 4) Utiliser un mix d’appels à froid et d’emails percutants, personnalisés, pour décrocher une rencontre. Elle donne de nombreux conseils sur la rédaction d’un bon email de prospection (focalisé sur le client, très court, orienté résultats) et sur la préparation d’un 'elevator pitch' crédible. Selling to Big Companies est ainsi un guide très concret pour tous les commerciaux qui peinent à franchir les barrages et veulent savoir quoi dire aux gros clients potentiels pour susciter leur intérêt. Konrath insiste notamment sur l’importance de parler la langue du client (ex. ROI, productivité, part de marché) plutôt que la langue de son produit. Un livre précieux pour conquérir de nouveaux comptes majeurs.",
        category: "enterprise-account"
      }
    ]
  },
  {
    slug: "management-leadership",
    title: "Sales Management",
    pitch: "Recruter, coacher, prédire le chiffre",
    books: [
      // (vide pour éviter les erreurs 404)
    ]
  },
  {
    slug: "digital-ai",
    title: "Digital & AI Sales",
    pitch: "Social, automation, IA générative",
    books: [
      // (vide pour éviter les erreurs 404)
    ]
  },
  {
    slug: "mindset-performance",
    title: "Mindset & Performance",
    pitch: "Habitudes, discipline, mental de tueur",
    books: [
      {
        slug: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        year: 2018,
        cover: "/covers/atomic-habits.jpg",
        tagline: "L’art de construire de bonnes habitudes.",
        summary: "Un best-seller mondial sur l’art de construire de bonnes habitudes et d’éliminer les mauvaises, par petits changements continus.",
        category: "mindset-performance"
      }
    ]
  }
]; 