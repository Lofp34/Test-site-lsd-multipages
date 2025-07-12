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
      }
    ]
  },
  {
    slug: "enterprise-account",
    title: "Enterprise & Accounts",
    pitch: "Vendre gros, long et complexe",
    books: [
      {
        slug: "strategic-selling",
        title: "Strategic Selling",
        author: "Robert Miller & Stephen Heiman",
        year: 1985,
        cover: "/covers/strategic-selling.jpg",
        tagline: "Le guide de la vente grands comptes.",
        summary: "Ce livre propose un processus structuré pour gérer des ventes complexes impliquant de multiples décideurs dans l’entreprise cliente.",
        category: "enterprise-account"
      }
    ]
  },
  {
    slug: "management-leadership",
    title: "Sales Management",
    pitch: "Recruter, coacher, prédire le chiffre",
    books: [
      {
        slug: "good-to-great",
        title: "Good to Great",
        author: "Jim Collins",
        year: 2001,
        cover: "/covers/good-to-great.jpg",
        tagline: "Les facteurs durables de la réussite organisationnelle.",
        summary: "Ce livre identifie les facteurs durables de la réussite organisationnelle et introduit des concepts cultes comme le leadership de niveau 5.",
        category: "management-leadership"
      }
    ]
  },
  {
    slug: "digital-ai",
    title: "Digital & AI Sales",
    pitch: "Social, automation, IA générative",
    books: [
      {
        slug: "the-second-machine-age",
        title: "The Second Machine Age",
        author: "Erik Brynjolfsson & Andrew McAfee",
        year: 2014,
        cover: "/covers/the-second-machine-age.jpg",
        tagline: "L’impact économique des technologies numériques.",
        summary: "Un ouvrage de référence sur l’impact économique des technologies numériques et la révolution de l’IA sur la société.",
        category: "digital-ai"
      }
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