import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Blog Développement Commercial - Conseils d\'Expert | Laurent Serre',
  description: 'Découvrez nos articles d\'expert sur le développement commercial, la formation des équipes de vente et les stratégies B2B. Conseils pratiques pour PME.',
  keywords: 'blog développement commercial, formation commerciale, stratégies vente B2B, conseils PME, expert commercial',
  alternates: {
    canonical: 'https://laurentserre.com/blog',
  },
  openGraph: {
    title: 'Blog Développement Commercial - Conseils d\'Expert',
    description: 'Découvrez nos articles d\'expert sur le développement commercial, la formation des équipes de vente et les stratégies B2B.',
    url: 'https://laurentserre.com/blog',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurentserre.com/erreurs-fatales.png',
        width: 1200,
        height: 630,
        alt: 'Blog développement commercial Laurent Serre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Développement Commercial - Conseils d\'Expert',
    description: 'Découvrez nos articles d\'expert sur le développement commercial, la formation des équipes de vente et les stratégies B2B.',
    images: ['https://laurentserre.com/erreurs-fatales.png'],
  },
};

const blogPosts = [
  {
    slug: 'le-28-du-mois-vos-ventes-ne-se-sauvent-plus-elles-se-relisent',
    title: 'Le 28 du mois, vos ventes ne se sauvent plus. Elles se relisent.',
    description: 'Quand une équipe veut sauver le mois dans les derniers jours, elle ne rattrape presque jamais une vente. Elle révèle surtout tout ce qu’elle n’a pas voulu regarder plus tôt.',
    date: '2026-04-27',
    readTime: '6 min de lecture',
    category: 'Dirigeant / arbitrage commercial',
    image: '/images/blog/2026-03-29-comite-commercial-mensuel-hero.jpg',
    featured: true
  },
  {
    slug: 'reunion-commerciale-sans-decision-commenter-les-chiffres',
    title: 'Une réunion commerciale sans décision apprend surtout à commenter les chiffres',
    description: 'Quand une réunion commerciale se contente de commenter les chiffres sans trancher, elle donne une impression de sérieux mais ne fait presque jamais avancer les ventes.',
    date: '2026-04-26',
    readTime: '6 min de lecture',
    category: 'Méthode / pilotage commercial',
    image: '/images/blog/2026-04-26-reunion-commerciale-sans-decision-hero.jpg',
    featured: true
  },
  {
    slug: 'pourquoi-un-manager-commercial-reprend-trop-souvent-les-rendez-vous-a-la-place-de-lequipe',
    title: 'Manager commercial : à force de sauver les rendez-vous, vous affaiblissez l’équipe',
    description: 'Quand un manager commercial reprend trop souvent les rendez-vous à la place de l’équipe, il rassure sur le moment mais il apprend surtout aux commerciaux à attendre qu’on les sauve.',
    date: '2026-04-25',
    readTime: '6 min de lecture',
    category: 'Management / coaching commercial',
    image: '/images/blog/2026-04-25-manager-reprend-rendez-vous-equipe-hero.png',
    featured: true
  },
  {
    slug: 'pourquoi-meme-des-commerciaux-experimentes-se-font-encore-bananer-sur-lobjection-prix',
    title: 'Objection prix : même des commerciaux expérimentés se font encore bananer',
    description: 'Quand une vente bloque sur le prix, le tarif n’est pas toujours le vrai sujet. Très souvent, l’objection prix masque un diagnostic commercial évité trop vite.',
    date: '2026-04-24',
    readTime: '6 min de lecture',
    category: 'Objection prix / vente terrain',
    image: '/images/blog/2026-04-24-objection-prix-bd-hero-selected.png',
    featured: true
  },
  {
    slug: 'pourquoi-la-motivation-ne-regle-presque-jamais-le-probleme-commercial',
    title: 'Le vrai problème de votre équipe n’est presque jamais la motivation',
    description: 'Quand une équipe commerciale cale, parler motivation permet souvent d’éviter le vrai sujet : des rendez-vous faibles, un management mou ou des ventes mal relues.',
    date: '2026-04-23',
    readTime: '6 min de lecture',
    category: 'Psychologie commerciale / management',
    image: '/images/blog/2026-04-23-motivation-ne-regle-pas-probleme-commercial-hero.png',
    featured: true
  },
  {
    slug: 'pourquoi-un-manager-commercial-tolere-trop-longtemps-les-bonnes-excuses',
    title: 'Manager commercial : tolérer les bonnes excuses vous coûte des ventes',
    description: 'Quand un manager commercial laisse passer trop longtemps les bonnes excuses, il protège le confort de l’équipe mais laisse aussi s’installer des ventes fragiles et des habitudes faibles.',
    date: '2026-04-22',
    readTime: '6 min de lecture',
    category: 'Management / coaching commercial',
    image: '/images/blog/2026-04-22-manager-tolere-bonnes-excuses-hero.png',
    featured: true
  },
  {
    slug: 'pourquoi-un-forecast-rassurant-fait-souvent-perdre-du-temps-et-des-ventes',
    title: 'Prévisions commerciales : les chiffres qui rassurent font souvent perdre des ventes',
    description: 'Des prévisions commerciales rassurantes ne prouvent pas que les ventes avancent. Souvent, elles masquent surtout des affaires déjà fragiles.',
    date: '2026-04-21',
    readTime: '6 min de lecture',
    category: 'Erreur fréquente / pilotage commercial',
    image: '/images/blog/2026-04-21-previsions-rassurantes-pas-fiables-hero.jpg',
    featured: true
  },
  {
    slug: 'vous-navez-pas-perdu-face-au-concurrent-vous-avez-perdu-bien-avant',
    title: 'Vous n’avez pas perdu face au concurrent, vous avez perdu bien avant',
    description: 'Quand une équipe dit qu’elle a perdu face au concurrent, elle évite souvent une vérité moins confortable. La vente s’est généralement fragilisée bien plus tôt.',
    date: '2026-04-20',
    readTime: '6 min de lecture',
    category: 'Point de vue / lecture commerciale',
    image: '/images/blog/2026-04-20-concurrent-verite-confortable-hero.png',
    featured: true
  },
  {
    slug: 'pourquoi-vos-commerciaux-confondent-interet-et-decision',
    title: 'Un prospect intéressé n’est pas encore une décision',
    description: 'Un prospect intéressé n’est pas encore une vente qui avance. Beaucoup d’équipes confondent un bon échange avec une vraie progression de décision.',
    date: '2026-04-19',
    readTime: '7 min de lecture',
    category: 'Terrain / qualification commerciale',
    image: '/images/blog/2026-04-19-interet-vs-decision-hero-v3.png',
    featured: true
  },
  {
    slug: 'pourquoi-vos-commerciaux-repondent-trop-vite-aux-objections',
    title: 'Objections commerciales : répondre trop vite vous fait perdre la main',
    description: 'Quand un commercial répond trop vite à une objection, il saute sur sa réponse avant d’avoir compris ce que le client essayait vraiment de dire.',
    date: '2026-04-18',
    readTime: '7 min de lecture',
    category: 'Erreur fréquente / vente terrain',
    image: '/images/blog/2026-04-18-objections-trop-tot-hero-v2.png',
    featured: true
  },
  {
    slug: 'pourquoi-meilleurs-commerciaux-dirco-entrepreneurs-se-cassent-la-figure',
    title: 'Passer de commercial à dirco, puis de dirco à entrepreneur : trois métiers, trois pièges',
    description: 'Passer de commercial à directeur commercial, puis de dirco à entrepreneur, ce ne sont pas des promotions. Ce sont trois métiers différents. Voici pourquoi les meilleurs se plantent en changeant d’étage, et ce qu’il faut vraiment installer pour tenir.',
    date: '2026-04-17',
    readTime: '11 min de lecture',
    category: 'Management / transformation commerciale',
    image: '/images/blog/2026-04-17-commerciaux-dirco-entrepreneurs-hero-v2.png',
    featured: true
  },
  {
    slug: 'en-2030-toiture-et-compagnie-les-agents-ia-ont-change-le-rythme',
    title: 'En 2030, chez Toiture et COMPAGNIE, les agents IA ont changé le rythme',
    description: 'Projection 2030, crédible et assumée, de la transformation d’une PME de couverture par des agents IA utiles, côté direction, commerce, chantiers et pilotage.',
    date: '2026-04-16',
    readTime: '7 min',
    category: 'IA utile / transformation PME',
    image: '/images/blog/2026-04-16-toiture-et-compagnie-agents-ia-hero.jpg',
    featured: true
  },
  {
    slug: 'largent-nest-pas-le-probleme-cest-la-mesure-objective-de-la-valeur',
    title: 'L’argent n’est pas le problème, c’est la mesure objective de la valeur',
    description: 'Quand un prospect dit qu’il n’a pas le budget, le vrai sujet est souvent ailleurs. L’argent mesure surtout la valeur perçue, la priorité et la confiance accordée à la décision.',
    date: '2026-04-16',
    readTime: '5 min',
    category: 'Psychologie commerciale',
    image: '/images/blog/2026-04-16-argent-mesure-valeur-hero.png',
    featured: true
  },
  {
    slug: 'anticiper-lechec-nest-pas-du-pessimisme-cest-une-discipline-commerciale',
    title: 'Anticiper l’échec n’est pas du pessimisme, c’est une discipline commerciale',
    description: 'En vente, la pensée positive rassure. La lucidité, elle, aide à mieux vendre, à mieux qualifier et à éviter les illusions confortables.',
    date: '2026-04-15',
    readTime: '6 min',
    category: 'Psychologie commerciale',
    image: '/images/blog/2026-04-15-anticiper-echec-discipline-commerciale-hero.jpg',
    featured: true
  },
  {
    slug: 'pourquoi-vos-commerciaux-remplissent-mal-le-crm-et-utilisent-mal-lia',
    title: 'Pourquoi vos commerciaux remplissent mal le CRM… et utilisent mal l’IA',
    description: 'Quand les notes CRM sont vagues, l’IA ne rend pas l’équipe plus pertinente. Elle industrialise surtout le flou commercial et le transforme en prose plus propre.',
    date: '2026-04-14',
    readTime: '8 min',
    category: 'IA utile',
    image: '/images/blog/2026-04-14-crm-ia-hero.png',
    featured: true
  },
  {
    slug: 'pourquoi-compte-rendu-commercial-ne-remplace-pas-debrief-a-chaud',
    title: 'Pourquoi le compte rendu commercial ne remplace jamais le débrief à chaud',
    description: 'Le compte rendu rassure le management, mais il ne fait pas progresser la vente. Ce qui change vraiment le niveau d’une équipe, c’est le débrief à chaud, court et précis.',
    date: '2026-04-13',
    readTime: '9 min',
    category: 'Méthode / management commercial',
    image: '/images/blog/2026-04-13-compte-rendu-vs-debrief-a-chaud-hero.jpg',
    featured: true
  },
  {
    slug: 'cinq-signes-commercial-motive-va-quand-meme-echouer',
    title: 'Les cinq signes qu’un commercial motivé va quand même échouer',
    description: 'La motivation ne compense pas un mauvais cadrage commercial. Voici les signaux concrets qui montrent qu’un profil engagé risque quand même de se casser.',
    date: '2026-04-12',
    readTime: '9 min',
    category: 'Psychologie commerciale',
    image: '/images/blog/2026-04-12-signes-commercial-motive-va-echouer-hero.jpg',
    featured: true
  },
  {
    slug: 'pourquoi-vos-commerciaux-parlent-trop-tot-des-solutions',
    title: 'Pourquoi vos commerciaux parlent trop tôt des solutions, et combien ça vous coûte',
    description: 'Parler trop tôt de la solution rassure le commercial, mais fragilise souvent la vente. Le vrai sujet est la qualité de la découverte et la construction de la décision.',
    date: '2026-04-11',
    readTime: '10 min',
    category: 'Techniques de vente terrain',
    image: '/images/blog/2026-04-11-commerciaux-parlent-trop-tot-solutions-hero.png',
    featured: true
  },
  {
    slug: 'pourquoi-bons-commerciaux-deviennent-mediocres-mauvais-systeme',
    title: 'Pourquoi de bons commerciaux deviennent médiocres dans un mauvais système',
    description: 'Quand un bon commercial devient irrégulier, le problème n’est pas toujours la personne. Un système flou dégrade la posture, la lecture et la performance de l’équipe.',
    date: '2026-04-05',
    readTime: '10 min',
    category: 'Structure / système commercial',
    image: '/images/blog/2026-04-05-bons-commerciaux-mediocres-mauvais-systeme-hero.jpg',
    featured: true
  },
  {
    slug: 'les-erreurs-onboarding-commercial-qui-plombent-performance-nouveau',
    title: 'Les erreurs d’onboarding commercial qui vont plomber la performance du nouveau',
    description: 'Un onboarding commercial flou coûte des mois de performance. Le nouveau n’échoue pas seul : il hérite souvent d’un système mal cadré.',
    date: '2026-04-04',
    readTime: '10 min',
    category: 'Management / transformation',
    image: '/images/blog/2026-04-04-onboarding-commercial-performance-nouveau-hero.jpg',
    featured: true
  },
  {
    slug: 'pourquoi-beaucoup-relances-commerciales-affaiblissent-vente',
    title: 'Pourquoi beaucoup de relances commerciales affaiblissent la vente au lieu de la faire avancer',
    description: 'Relancer plus ne fait pas toujours avancer une vente. Souvent, cela compense une étape mal sécurisée et affaiblit la valeur perçue.',
    date: '2026-04-03',
    readTime: '10 min',
    category: 'Techniques de vente terrain',
    image: '/images/blog/2026-04-03-relances-commerciales-affaiblissent-vente-hero.jpg',
    featured: true
  },
  {
    slug: 'la-peur-du-prix-le-vrai-probleme-nest-presque-jamais-le-tarif',
    title: 'La peur du prix : le vrai problème n’est presque jamais le tarif',
    description: 'Quand une vente bloque sur le prix, le tarif n’est souvent que la surface du problème. Valeur perçue, découverte et décision pèsent bien plus lourd.',
    date: '2026-04-02',
    readTime: '9 min',
    category: 'Psychologie commerciale',
    image: '/images/blog/2026-04-02-peur-prix-vrai-probleme-pas-tarif-hero.jpg',
    featured: true
  },
  {
    slug: 'pourquoi-ia-sans-plan-vente-produit-surtout-bruit',
    title: 'Pourquoi l’IA sans plan de vente produit surtout du bruit',
    description: 'L’IA aide une équipe claire. Sans plan de vente net, elle accélère surtout la confusion, le reporting et les faux gains de modernité.',
    date: '2026-04-01',
    readTime: '9 min',
    category: 'IA utile',
    image: '/images/blog/2026-04-01-ia-sans-plan-vente-bruit-hero.jpg',
    featured: true
  },
  {
    slug: 'pourquoi-manager-commercial-suit-sans-coacher-plombe-equipe',
    title: 'Pourquoi un manager commercial qui suit sans coacher plombe son équipe',
    description: 'Le vrai problème n’est pas le manque de suivi. C’est un suivi sans progression, qui occupe l’équipe sans la faire grandir.',
    date: '2026-03-31',
    readTime: '10 min',
    category: 'Management / transformation',
    image: '/images/blog/2026-03-31-manager-suivre-sans-coacher-hero.jpg',
    featured: true
  },
  {
    slug: 'reunion-30-minutes-proteger-marge-pipeline-avril',
    title: 'La réunion de 30 minutes qui protège votre marge et votre pipeline en avril',
    description: 'Le rituel dirigeant pour nettoyer le pipeline, éviter les remises réflexes et concentrer le management là où il crée vraiment de la conversion.',
    date: '2026-03-31',
    readTime: '11 min',
    category: 'Pilotage commercial',
    image: '/images/blog/2026-03-31-reunion-30-minutes-marge-pipeline-hero.jpg',
    featured: true
  },
  {
    slug: 'debut-avril-recharger-pipeline-sans-brader-t2',
    title: 'Début avril : 5 décisions pour recharger le pipeline sans brader le T2',
    description: 'Le cadre dirigeant pour recharger un pipeline fragile en début de T2 sans dégrader la marge ni envoyer des propositions prématurées.',
    date: '2026-03-30',
    readTime: '11 min',
    category: 'Dirigeant / arbitrage',
    image: '/images/blog/2026-03-30-avril-recharger-pipeline-t2-hero.jpg',
    featured: true
  },
  {
    slug: 'comite-commercial-mensuel-decisions-dirigeant',
    title: 'Comité commercial mensuel : les 6 décisions qu’un dirigeant doit exiger',
    description: 'Le cadre mensuel pour sortir du commentaire CRM, fiabiliser le forecast et prendre de vraies décisions de pilotage commercial.',
    date: '2026-03-29',
    readTime: '12 min',
    category: 'Pilotage commercial',
    image: '/images/blog/2026-03-29-comite-commercial-mensuel-hero.jpg',
    featured: true
  },
  {
    slug: 'revue-deal-avant-proposition-3-verifications',
    title: 'Avant d\'envoyer une proposition : la revue deal en 17 minutes',
    description: 'Le rituel de revue deal qui évite les propositions prématurées, protège la marge et améliore le taux de signature en B2B.',
    date: '2026-03-28',
    readTime: '11 min',
    category: 'Closing B2B',
    image: '/images/blog/2026-03-28-revue-deal-hero.jpg',
    featured: true
  },
  {
    slug: 'pipeline-fantome-lundi-matin-test-9-minutes',
    title: 'Pipeline fantôme : le test des 9 minutes du lundi matin',
    description: 'Le test simple et exigeant pour repérer les faux deals, requalifier le forecast et reprendre le contrôle dès le lundi matin.',
    date: '2026-03-28',
    readTime: '10 min',
    category: 'Pilotage commercial',
    image: '/images/blog/2026-03-28-pipeline-fantome-lundi-hero.jpg',
    featured: true
  },
  {
    slug: 'comptes-strategiques-dormants-relance-dirigeant',
    title: 'Comptes stratégiques dormants : la relance que les dirigeants oublient trop souvent',
    description: 'La méthode premium pour réactiver des comptes dormants à fort potentiel sans tomber dans la relance opportuniste ni le théâtre CRM.',
    date: '2026-03-27',
    readTime: '11 min',
    category: 'Développement de comptes',
    image: '/images/blog/2026-03-27-comptes-strategiques-dormants-hero.png',
    featured: true
  },
  {
    slug: 'fin-trimestre-commercial-7-arbitrages-eviter-avril-creux',
    title: 'Fin de trimestre commercial : 7 arbitrages pour éviter un mois d\'avril creux',
    description: 'Les arbitrages concrets de fin de trimestre pour protéger avril, éviter les remises panique et garder un pipeline crédible.',
    date: '2026-03-26',
    readTime: '12 min',
    category: 'Pilotage commercial',
    image: '/images/blog/2026-03-26-fin-trimestre-arbitrages-hero.svg',
    featured: true
  },
  {
    slug: 'reunion-commerciale-hebdo-rituel-closing',
    title: 'Réunion commerciale hebdo : le rituel de 45 minutes qui fait remonter le closing',
    description: 'Le rituel hebdomadaire pour assainir le pipeline, coacher les deals et faire progresser le taux de conversion sans micro-manager.',
    date: '2026-03-25',
    readTime: '9 min',
    category: 'Management commercial',
    image: '/images/blog/2026-03-25-revue-pipeline-rituel.svg',
    featured: true
  },
  {
    slug: 'systeme-90-jours-anti-yo-yo-ca',
    title: 'Système commercial 90 jours : le plan anti yo-yo du chiffre d\'affaires',
    description: 'Le cadre opérationnel en 3 sprints pour stabiliser le CA, améliorer la conversion et sécuriser le trimestre suivant.',
    date: '2026-03-24',
    readTime: '10 min',
    category: 'Exécution commerciale',
    image: '/images/blog/2026-03-24-systeme-90-jours-hero.png',
    featured: true
  },
  {
    slug: 'pipeline-commercial-q2-2026-5-decisions-dirigeant',
    title: 'Pipeline commercial Q2 2026 : 5 décisions de dirigeant pour sécuriser le chiffre d\'affaires',
    description: 'Un plan concret pour fiabiliser vos prévisions, accélérer les décisions et convertir plus sereinement au T2 2026.',
    date: '2026-03-23',
    readTime: '11 min',
    category: 'Stratégie commerciale',
    image: '/images/blog/2026-03-23-pipeline-q2-hero.png',
    featured: true
  },
  {
    slug: 'prospection-b2b-2026-methode-4-blocs-rdv-qualifies',
    title: 'Prospection B2B 2026 : la méthode 4 blocs pour générer plus de RDV qualifiés',
    description: 'Ciblage, message, séquence, pilotage : une méthode terrain simple pour améliorer la qualité de votre pipeline commercial B2B.',
    date: '2026-03-22',
    readTime: '10 min',
    category: 'Prospection',
    image: '/equipe_bureau.jpg',
    featured: true
  },
  {
    slug: 'commission-breath-3-mecanismes-tuent-closing',
    title: 'Commission Breath : les 3 mécanismes invisibles qui tuent votre closing',
    description: 'Découvrez pourquoi vos leads ne sont pas mauvais et comment la biologie, l\'identité et le cadre sabotent vos ventes. Méthode du détachement radical.',
    date: '2025-01-15',
    readTime: '10 min',
    category: 'Psychologie de vente',
    image: '/images/closing_post.png',
    featured: true
  },
  {
    slug: 'closing-b2b-7-techniques',
    title: 'Closing B2B : 7 techniques qui marchent (+ scripts à copier)',
    description: 'Augmentez votre taux de closing en 90 jours sans forcer grâce au MAP, trial close, business case, POC cadré et 5 scripts copiables.',
    date: '2025-10-13',
    readTime: '12 min',
    category: 'Techniques de vente',
    image: '/images/closing_post.png',
    featured: true
  },
  {
    slug: 'accompagnement-equipes-commerciales-6-leviers-2025',
    title: 'Accompagnement des équipes commerciales : 6 leviers d\'expert pour booster vos ventes en 2025',
    description: 'Structuration, coaching, outils et méthode pour faire monter votre équipe en compétences et en performance, avec un guide pratique d\'externalisation.',
    date: '2025-09-30',
    readTime: '10 min',
    category: 'Management',
    image: '/accompagnement_commercial.png',
    featured: true
  },
  {
    slug: '7-etapes-transformer-non-en-oui-performant-2025',
    title: '7 étapes pour transformer un « non » frustrant en « oui » performant en 2025',
    description: 'Une méthode claire et moderne pour transformer chaque refus client en opportunité commerciale durable et efficace. Conseils pratiques, techniques d’écoute et outils IA pour performer en 2025.',
    date: '2025-07-11',
    readTime: '9 min',
    category: 'Techniques de vente',
    image: '/equipe_bureau.jpg',
    featured: true
  },
  {
    slug: '5-signes-structurer-equipe-commerciale',
    title: '5 signes qu\'il est temps de structurer votre équipe commerciale',
    description: 'Découvrez les signaux d\'alerte qui indiquent qu\'il est temps de passer à l\'étape supérieure dans l\'organisation de votre force de vente.',
    date: '2025-06-16',
    readTime: '8 min',
    category: 'Stratégie',
    image: '/equipe_bureau.jpg',
    featured: true,
  },
  {
    slug: 'ia-transforme-developpement-commercial-2025',
    title: 'Comment l\'IA transforme le développement commercial en 2025',
    description: 'L\'intelligence artificielle révolutionne la prospection, le scoring et le suivi client. Voici comment l\'intégrer efficacement.',
    date: '2025-06-03',
    readTime: '10 min',
    category: 'Innovation',
    image: '/tableau-de-bord.jpeg',
    featured: true,
  },
  {
    slug: 'erreurs-fatales-prospection-b2b',
    title: 'Les erreurs fatales dans la prospection B2B (et comment les éviter)',
    description: 'Analyse des erreurs les plus communes qui sabotent vos efforts de prospection et les solutions concrètes pour les éviter.',
    date: '2025-05-21',
    readTime: '12 min',
    category: 'Prospection',
    image: '/erreurs-fatales.png',
    featured: false,
  },
  {
    slug: 'bootcamp-commercial-pourquoi-formations-echouent',
    title: 'Bootcamp commercial : pourquoi 80% des formations échouent',
    description: 'Décryptage des raisons pour lesquelles la plupart des formations commerciales n\'atteignent pas leurs objectifs et notre approche différente.',
    date: '2025-05-03',
    readTime: '9 min',
    category: 'Formation',
    image: '/photo-formation.png',
    featured: false,
  },
  {
    slug: 'vendeur-commercial-transformation-decisive',
    title: 'De vendeur à commercial : la transformation qui change tout',
    description: 'Comprendre la différence fondamentale entre un vendeur et un commercial, et comment opérer cette transformation dans votre équipe.',
    date: '2025-04-18',
    readTime: '11 min',
    category: 'Management',
    image: '/equipedeface.jpg',
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <main className="bg-primary-bg text-gray-dark">
      {/* Hero Section conforme */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-ink via-blue-ink/95 to-mint-green/20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
              <span className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></span>
              <span className="font-title font-semibold text-mint-green text-sm md:text-base">
                Expertise & Conseils
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
              <span className="text-white">Blog</span> <span className="text-mint-green">Développement Commercial</span>
            </h1>
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-white/95 leading-relaxed drop-shadow-md px-2">
                Découvrez nos conseils d'expert pour développer votre activité commerciale, structurer vos équipes et optimiser vos performances de vente.
              </p>
              <p className="text-base sm:text-lg md:text-xl font-italic text-white/90 leading-relaxed drop-shadow-sm px-2">
                Analyses, méthodes, retours terrain et innovations pour booster votre business B2B.
              </p>
            </div>
            {/* Boutons d'appel à l'action */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row justify-center items-center pt-6 sm:pt-8 pb-12 sm:pb-16 px-4">
              <Link href="/diagnostic">
                <Button 
                  variant="primary"
                  size="lg"
                  icon="🎯"
                  className="w-full sm:w-auto"
                >
                  Diagnostic gratuit
                </Button>
              </Link>
              <Link href="/bootcamp">
                <Button 
                  variant="outline"
                  size="lg"
                  icon="🚀"
                  className="w-full sm:w-auto"
                >
                  Découvrir le bootcamp
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Articles en vedette */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-12">
            Articles en vedette
          </h2>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-mint-green text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readTime} de lecture</span>
                    </div>
                    
                    <h3 className="text-xl font-title font-semibold text-blue-ink mb-3 group-hover:text-mint-green transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tous les articles */}
      <section className="py-16 bg-primary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-12">
            Tous les articles
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-ink text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-title font-semibold text-blue-ink mb-2 group-hover:text-mint-green transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-ink to-blue-ink/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-title font-bold text-white mb-4">
            Prêt à transformer votre équipe commerciale ?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Découvrez comment notre approche peut améliorer durablement 
            les performances commerciales de votre entreprise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/diagnostic" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
            >
              Diagnostic gratuit
            </Link>
            <Link 
              href="/bootcamp" 
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
            >
              Découvrir le bootcamp
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
