// Structure de données pour la librairie des meilleurs livres
export type Book = {
  slug: string;
  title: string;
  author: string;
  year: number;
  cover: string; // à compléter plus tard
  tagline: string;
  summary: string;
  detailedSummary?: string; // Nouveau : résumé long pour pages individuelles
  keyPoints?: string[];     // Nouveau : points clés à retenir
  targetProfiles?: string[]; // Nouveau : profils cibles
  difficulty?: 'Facile' | 'Intermédiaire' | 'Avancé'; // Nouveau
  readingTime?: string;     // Nouveau : durée de lecture estimée
  terrainAdvice?: string;   // Nouveau : conseil terrain Laurent Serre
  rating?: number;          // Nouveau : note sur 5
  category: string;
  complementaryBooks?: string[]; // Nouveau : slugs des livres complémentaires
};

export type BookCategory = {
  slug: string;
  title: string;
  pitch: string;
  description?: string;     // Nouveau : description longue de la catégorie
  icon?: string;           // Nouveau : emoji/icône
  books: Book[];
  seoKeywords?: string[];  // Nouveau : mots-clés SEO spécifiques
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
    description: "Maîtriser la vente aux grandes entreprises nécessite des compétences spécifiques : naviguer dans des processus d'achat complexes, gérer de multiples décideurs, construire des relations long terme et apporter une valeur business mesurable. Cette catégorie regroupe les références incontournables pour réussir dans l'univers des grands comptes.",
    icon: "🏢",
    seoKeywords: ["vente grands comptes", "enterprise sales", "account management", "vente complexe", "B2B enterprise"],
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
    slug: "sales-management",
    title: "Sales Management & Leadership",
    pitch: "Manager, motiver et développer son équipe commerciale",
    description: "Management et leadership commercial : les références pour diriger, motiver et développer des équipes commerciales performantes. Cette catégorie regroupe les ouvrages essentiels pour transformer une équipe ordinaire en organisation d'excellence, maîtriser l'art du leadership et créer une culture de performance durable.",
    icon: "👥",
    seoKeywords: ["management commercial", "leadership vente", "manager équipe commerciale", "good to great", "high output management", "blue ocean strategy", "laurent serre"],
    books: [
      {
        slug: "good-to-great",
        title: "Good to Great",
        author: "Jim Collins",
        year: 2001,
        cover: "/covers/good-to-great.jpg",
        tagline: "Les facteurs durables de la réussite organisationnelle",
        summary: "Résultat d'une étude approfondie sur des entreprises ayant fait le saut de 'bonnes' à 'excellentes', ce livre identifie les facteurs durables de la réussite organisationnelle. Collins y introduit des concepts devenus cultes, comme le Leadership de niveau 5 : des dirigeants humbles mais déterminés, combinant ambition pour l'entreprise et modestie personnelle.",
        category: "sales-management"
      },
      {
        slug: "high-output-management",
        title: "High Output Management",
        author: "Andy Grove",
        year: 1983,
        cover: "/covers/high-output-management.jpg",
        tagline: "La bible du manager : productivité, OKR et management opérationnel",
        summary: "Écrit par le légendaire CEO d'Intel, ce livre est considéré dans la Silicon Valley comme la bible du manager. Andy Grove y partage une vision très pragmatique du management, vue comme une fonction de 'multiplication' : la productivité d'un manager se mesure à la somme des outputs de son équipe et de tous ceux qu'il influence.",
        category: "sales-management"
      },
      {
        slug: "blue-ocean-strategy",
        title: "Blue Ocean Strategy",
        author: "W. Chan Kim & Renée Mauborgne",
        year: 2005,
        cover: "/covers/blue-ocean-strategy.jpg",
        tagline: "Créer son propre marché incontesté",
        summary: "Un livre de stratégie d'entreprise au retentissement mondial, qui prône de quitter les 'océans rouges' saturés de concurrence pour créer son propre 'océan bleu' de marché incontesté. Les auteurs introduisent le concept de l'Innovation-valeur et la matrice ERAC pour repenser les attributs d'une offre.",
        category: "sales-management"
      },
      {
        slug: "innovators-dilemma",
        title: "The Innovator's Dilemma",
        author: "Clayton Christensen",
        year: 1997,
        cover: "/covers/innovators-dilemma.jpg",
        tagline: "Pourquoi les entreprises leaders échouent face à l'innovation disruptive",
        summary: "Un livre culte en gestion de l'innovation, qui explique pourquoi les entreprises leaders échouent parfois en dépit de décisions apparemment excellentes. Christensen y introduit le concept de technologie de rupture versus technologie de maintien.",
        category: "sales-management"
      },
      {
        slug: "leaders-eat-last",
        title: "Leaders Eat Last",
        author: "Simon Sinek",
        year: 2014,
        cover: "/covers/leaders-eat-last.jpg",
        tagline: "Le leadership bienveillant et le cercle de sécurité",
        summary: "Sinek explore le rôle du leader sous l'angle de la confiance et de la sécurité qu'il crée pour son équipe. Il développe l'idée d'un 'Cercle de sécurité' : un bon leader élargit ce cercle au maximum pour que ses employés se sentent protégés, soutenus.",
        category: "sales-management"
      }
    ]
  },
  {
    slug: "digital-ai",
    title: "Digital & AI Sales",
    pitch: "Social, automation, IA générative",
    description: "La transformation numérique et l'intelligence artificielle révolutionnent le métier commercial. Découvrez les références essentielles pour maîtriser l'IA en vente, comprendre l'impact des technologies numériques et préparer votre équipe aux métiers de demain.",
    icon: "🤖",
    seoKeywords: ["IA vente", "digital sales", "intelligence artificielle commercial", "transformation digitale", "vente augmentée", "laurent serre"],
    books: [
      {
        slug: "the-second-machine-age",
        title: "The Second Machine Age",
        author: "Erik Brynjolfsson & Andrew McAfee",
        year: 2014,
        cover: "/covers/the-second-machine-age.jpg",
        tagline: "Comprendre l'impact économique des technologies numériques sur la vente",
        summary: "Un ouvrage de référence sur l'impact économique des technologies numériques. Les auteurs argumentent que nous vivons une 'seconde révolution industrielle', où les machines augmentent nos capacités mentales avec l'informatique et l'IA.",
        difficulty: "Intermédiaire",
        readingTime: "7h",
        rating: 4.3,
        category: "digital-ai"
      },
      {
        slug: "ai-superpowers",
        title: "AI Superpowers",
        author: "Kai-Fu Lee",
        year: 2018,
        cover: "/covers/ai-superpowers.jpg",
        tagline: "Anticiper l'évolution des métiers commerciaux à l'ère de l'IA",
        summary: "Un livre passionnant écrit par un pionnier de l'IA sino-américain, qui compare l'avancée de l'intelligence artificielle aux États-Unis et en Chine et analyse ses implications géopolitiques et socio-économiques.",
        difficulty: "Intermédiaire",
        readingTime: "6h",
        rating: 4.4,
        category: "digital-ai"
      },
      {
        slug: "life-3-0",
        title: "Life 3.0",
        author: "Max Tegmark",
        year: 2017,
        cover: "/covers/life-3-0.jpg",
        tagline: "Vision long terme de l'IA en entreprise et implications pour les dirigeants",
        summary: "Un livre visionnaire qui traite du futur de l'intelligence artificielle et de son impact potentiel sur l'humanité à long terme. Tegmark explore les scénarios d'IA générale et de superintelligence.",
        difficulty: "Avancé",
        readingTime: "8h",
        rating: 4.1,
        category: "digital-ai"
      },
      {
        slug: "human-machine",
        title: "Human + Machine",
        author: "Paul Daugherty & James Wilson",
        year: 2018,
        cover: "/covers/human-machine.jpg",
        tagline: "Réinventer les processus commerciaux avec l'IA : collaboration homme-machine",
        summary: "Ce livre se concentre sur la transformation concrète du travail par l'IA et propose le concept de fusion homme-machine. Plutôt que de voir l'IA comme une automatisation pure remplaçant l'humain, les auteurs décrivent comment l'IA peut augmenter les humains dans leurs tâches.",
        difficulty: "Intermédiaire",
        readingTime: "5h",
        rating: 4.5,
        category: "digital-ai"
      },
      {
        slug: "lean-startup",
        title: "The Lean Startup",
        author: "Eric Ries",
        year: 2011,
        cover: "/covers/lean-startup.jpg",
        tagline: "Approche test & learn pour la transformation commerciale digitale",
        summary: "Lean Startup propose une méthode agile pour innover en contexte d'incertitude extrême : construire rapidement un MVP, mesurer les retours, apprendre et itérer.",
        difficulty: "Facile",
        readingTime: "6h",
        rating: 4.2,
        category: "digital-ai"
      }
    ]
  },
  {
    slug: "mindset-performance",
    title: "Mindset & Performance",
    pitch: "État d'esprit gagnant et performance personnelle",
    description: "Développer un mindset de croissance et optimiser ses performances personnelles sont des facteurs clés de réussite commerciale. Cette catégorie regroupe les références essentielles pour cultiver l'état d'esprit gagnant, développer sa résilience et maximiser son potentiel.",
    icon: "🧠",
    seoKeywords: ["mindset commercial", "performance personnelle", "état d'esprit", "développement personnel", "psychologie du succès"],
    books: [
      {
        slug: "mindset-new-psychology-success",
        title: "Mindset: The New Psychology of Success",
        author: "Carol Dweck",
        year: 2006,
        cover: "/covers/mindset-new-psychology-success.jpg",
        tagline: "L'état d'esprit de développement, clé de la réussite commerciale",
        summary: "Carol Dweck expose sa découverte clé : l'opposition entre 'état d'esprit fixe' et 'état d'esprit de développement'. Avec un mindset de croissance, on est convaincu que ses capacités peuvent s'améliorer par l'effort et l'expérience, et l'on voit l'échec comme une opportunité d'apprentissage.",
        difficulty: "Facile",
        readingTime: "6h",
        rating: 4.5,
        category: "mindset-performance",
        terrainAdvice: "Un livre fondamental pour tout commercial. Le mindset de croissance transforme la façon de voir les objections et les échecs. Indispensable pour développer la résilience commerciale.",
        keyPoints: ["Mindset fixe vs mindset de croissance", "Transformer l'échec en apprentissage", "Développer la résilience face aux objections"],
        targetProfiles: ["Commerciaux", "Managers", "Entrepreneurs"],
        complementaryBooks: ["grit-power-passion-perseverance", "atomic-habits"]
      },
      {
        slug: "grit-power-passion-perseverance",
        title: "Grit: The Power of Passion and Perseverance",
        author: "Angela Duckworth",
        year: 2016,
        cover: "/covers/grit-power-passion-perseverance.jpg",
        tagline: "La ténacité, facteur clé de réussite en prospection commerciale",
        summary: "Angela Duckworth démontre que le grit (ténacité) est souvent un meilleur prédicteur de succès que le QI ou le talent. Le grit se construit en ayant une vision à long terme, en s'entraînant de façon délibérée et en restant optimiste malgré les obstacles.",
        difficulty: "Facile",
        readingTime: "7h",
        rating: 4.4,
        category: "mindset-performance",
        terrainAdvice: "Essentiel pour la prospection ! Le grit, c'est ce qui différencie les commerciaux qui abandonnent après 3 appels de ceux qui persévèrent jusqu'au succès.",
        keyPoints: ["Passion + persévérance = grit", "Vision long terme", "Entraînement délibéré", "Optimisme face aux obstacles"],
        targetProfiles: ["SDR", "Commerciaux prospection", "Managers commerciaux"],
        complementaryBooks: ["mindset-new-psychology-success", "atomic-habits"]
      },
      {
        slug: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        year: 2018,
        cover: "/covers/atomic-habits.jpg",
        tagline: "Construire des habitudes de performance commerciale durables",
        summary: "James Clear révèle l'art de construire de bonnes habitudes par petits changements continus. Les habitudes sont les 'atomes' du succès : de minuscules routines quotidiennes qui, cumulées, produisent de grandes différences sur la durée.",
        difficulty: "Facile",
        readingTime: "6h",
        rating: 4.6,
        category: "mindset-performance",
        terrainAdvice: "Le livre le plus actionnable de la catégorie. Parfait pour mettre en place des routines de prospection, de suivi client, et de développement personnel. Les 4 lois sont un game-changer.",
        keyPoints: ["Les 4 lois des habitudes", "Amélioration continue 1%", "Système vs objectifs", "Identité et habitudes"],
        targetProfiles: ["Tous commerciaux", "Managers", "Entrepreneurs"],
        complementaryBooks: ["deep-work", "7-habitudes-gens-efficaces"]
      },
      {
        slug: "deep-work",
        title: "Deep Work",
        author: "Cal Newport",
        year: 2016,
        cover: "/covers/deep-work.jpg",
        tagline: "Concentration intense pour la préparation client et la stratégie commerciale",
        summary: "Cal Newport définit le Deep Work comme une concentration intense sans distraction sur une tâche cognitivement exigeante. Dans un monde d'interruptions permanentes, cette capacité devient un avantage compétitif rare pour les commerciaux.",
        difficulty: "Intermédiaire",
        readingTime: "7h",
        rating: 4.3,
        category: "mindset-performance",
        terrainAdvice: "Crucial pour la préparation client et l'analyse de comptes complexes. Les techniques de concentration profonde transforment la qualité du travail commercial.",
        keyPoints: ["Concentration sans distraction", "Blocs de temps dédiés", "Éliminer les sollicitations", "Rituels de concentration"],
        targetProfiles: ["Account managers", "Commerciaux grands comptes", "Consultants"],
        complementaryBooks: ["atomic-habits", "7-habitudes-gens-efficaces"]
      },
      {
        slug: "7-habitudes-gens-efficaces",
        title: "Les 7 habitudes des gens très efficaces",
        author: "Stephen R. Covey",
        year: 1989,
        cover: "/covers/7-habitudes-gens-efficaces.jpg",
        tagline: "Leadership commercial et efficacité personnelle",
        summary: "Stephen Covey présente 7 habitudes interdépendantes pour l'épanouissement personnel et professionnel. Une approche 'de l'intérieur vers l'extérieur' : travailler d'abord sur son caractère pour être efficace avec les autres.",
        difficulty: "Intermédiaire",
        readingTime: "8h",
        rating: 4.5,
        category: "mindset-performance",
        terrainAdvice: "Un classique intemporel. Les habitudes 4-6 (gagnant-gagnant, écoute empathique, synergie) sont fondamentales pour le commercial moderne. À relire régulièrement.",
        keyPoints: ["Proactivité", "Vision long terme", "Priorités", "Gagnant-gagnant", "Écoute empathique", "Synergie", "Renouvellement"],
        targetProfiles: ["Managers commerciaux", "Leaders d'équipe", "Commerciaux seniors"],
        complementaryBooks: ["mindset-new-psychology-success", "deep-work"]
      },
      {
        slug: "cant-hurt-me",
        title: "Can't Hurt Me",
        author: "David Goggins",
        year: 2018,
        cover: "/covers/cant-hurt-me.jpg",
        tagline: "Maîtriser son mental pour dépasser ses limites commerciales",
        summary: "David Goggins raconte sa transformation d'un homme en surpoids vers l'un des athlètes d'endurance les plus durs au monde. Il révèle comment développer une mentalité inébranlable pour surmonter tous les obstacles. Le concept de 'callusing the mind' - endurcir son mental par l'exposition répétée à l'inconfort.",
        difficulty: "Intermédiaire",
        readingTime: "8h",
        rating: 4.7,
        category: "mindset-performance",
        terrainAdvice: "Un livre brutal mais transformateur. La méthode Goggins appliquée à la prospection commerciale donne des résultats exceptionnels. Parfait pour développer la résilience face aux refus.",
        keyPoints: ["Callusing the mind", "Règle des 40%", "Accountability Mirror", "Cookie Jar Method"],
        targetProfiles: ["SDR", "Commerciaux prospection", "Managers ambitieux"],
        complementaryBooks: ["grit-power-passion-perseverance", "atomic-habits"]
      },
      {
        slug: "pouvoir-maintenant",
        title: "Le Pouvoir du Moment Présent",
        author: "Eckhart Tolle",
        year: 1997,
        cover: "/covers/pouvoir-maintenant.jpg",
        tagline: "Présence et sérénité pour une vente authentique",
        summary: "Eckhart Tolle enseigne l'art de vivre dans le moment présent, libéré des pensées parasites du passé et des anxiétés du futur. Une approche spirituelle pour développer la présence, l'écoute authentique et la sérénité dans les relations commerciales.",
        difficulty: "Intermédiaire",
        readingTime: "6h",
        rating: 4.2,
        category: "mindset-performance",
        terrainAdvice: "Excellent complément aux techniques commerciales. La présence authentique transforme la qualité des échanges clients. Particulièrement utile pour gérer le stress des négociations importantes.",
        keyPoints: ["Présence authentique", "Gestion du stress", "Écoute profonde", "Sérénité en négociation"],
        targetProfiles: ["Commerciaux seniors", "Négociateurs", "Managers"],
        complementaryBooks: ["7-habitudes-gens-efficaces", "deep-work"]
      },
      {
        slug: "peak-performance",
        title: "Peak Performance",
        author: "Brad Stulberg & Steve Magness",
        year: 2017,
        cover: "/covers/peak-performance.jpg",
        tagline: "Atteindre l'excellence commerciale par la science de la performance",
        summary: "Stulberg et Magness révèlent les secrets de la haute performance basés sur les dernières recherches scientifiques. Ils montrent comment alterner stress et récupération, développer la concentration et maintenir la motivation sur le long terme.",
        difficulty: "Intermédiaire",
        readingTime: "7h",
        rating: 4.4,
        category: "mindset-performance",
        terrainAdvice: "Une approche scientifique de la performance commerciale. Les cycles stress/récupération sont essentiels pour maintenir un haut niveau sur la durée. Parfait pour les commerciaux ambitieux.",
        keyPoints: ["Cycles stress/récupération", "Science de la motivation", "Concentration optimale", "Performance durable"],
        targetProfiles: ["Top performers", "Managers commerciaux", "Équipes d'élite"],
        complementaryBooks: ["atomic-habits", "deep-work"]
      }
    ]
  }
];

// Fonctions utilitaires pour les nouveaux champs

/**
 * Retourne l'icône/emoji associé à une catégorie de livre
 */
export function getCategoryIcon(categorySlug: string): string {
  const iconMap: Record<string, string> = {
    'prospection-sdr': '🎯',
    'negociation-closing': '🤝',
    'psychologie-influence': '🧠',
    'methodes-process': '⚙️',
    'enterprise-account': '🏢',
    'sales-management': '👥',
    'management-leadership': '👥',
    'digital-ai': '🤖',
    'mindset-performance': '🧠'
  };

  return iconMap[categorySlug] || '📚';
}

/**
 * Retourne la variante de style pour le badge de difficulté
 */
export function getDifficultyVariant(difficulty: 'Facile' | 'Intermédiaire' | 'Avancé'): string {
  const variantMap: Record<string, string> = {
    'Facile': 'bg-green-100 text-green-800 border-green-200',
    'Intermédiaire': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Avancé': 'bg-red-100 text-red-800 border-red-200'
  };

  return variantMap[difficulty] || 'bg-gray-100 text-gray-800 border-gray-200';
}

/**
 * Retourne le gradient CSS personnalisé pour une catégorie
 */
export function getCategoryGradient(categorySlug: string): string {
  const gradientMap: Record<string, string> = {
    'prospection-sdr': 'bg-gradient-to-br from-blue-400 to-blue-600',
    'negociation-closing': 'bg-gradient-to-br from-green-400 to-green-600',
    'psychologie-influence': 'bg-gradient-to-br from-purple-400 to-purple-600',
    'methodes-process': 'bg-gradient-to-br from-orange-400 to-orange-600',
    'enterprise-account': 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'sales-management': 'bg-gradient-to-br from-teal-400 to-teal-600',
    'management-leadership': 'bg-gradient-to-br from-teal-400 to-teal-600',
    'digital-ai': 'bg-gradient-to-br from-cyan-400 to-cyan-600',
    'mindset-performance': 'bg-gradient-to-br from-pink-400 to-pink-600'
  };

  return gradientMap[categorySlug] || 'bg-gradient-to-br from-gray-400 to-gray-600';
}

/**
 * Trouve un livre par son slug dans toutes les catégories
 */
export function getBookBySlug(slug: string): Book | undefined {
  for (const category of bookCategories) {
    const book = category.books.find(book => book.slug === slug);
    if (book) {
      return book;
    }
  }
  return undefined;
}

/**
 * Trouve une catégorie par son slug
 */
export function getCategoryBySlug(slug: string): BookCategory | undefined {
  return bookCategories.find(category => category.slug === slug);
}