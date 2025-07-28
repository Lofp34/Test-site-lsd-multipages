import { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { negotiationTechniqueData } from '@/data/negotiation-technique-data';
import { preloadCriticalResources, addResourceHints, checkPerformanceBudget } from '@/utils/performance-optimization';

// Lazy load the main component with optimized loading
const TechniquePage = dynamic(() => import('@/components/templates/TechniquePage'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-primary-secondary">Chargement de la technique...</p>
      </div>
    </div>
  ),
  ssr: true, // Enable SSR for SEO
});

// Métadonnées SEO avancées optimisées pour la technique
export const metadata: Metadata = {
  title: 'Ne jamais couper la poire en deux | Technique FBI de Chris Voss | Laurent Serre',
  description: 'Découvrez la technique de négociation "Ne jamais couper la poire en deux" de Chris Voss (FBI). Guide complet avec cas PME, scripts et conseils terrain de Laurent Serre. 85% de préservation des marges.',
  keywords: [
    'ne jamais couper la poire en deux',
    'chris voss',
    'technique fbi négociation',
    'négociation commerciale pme',
    'laurent serre expert',
    'formation négociation montpellier',
    'closing commercial b2b',
    'préservation marges',
    'alternatives créatives négociation',
    'empathie tactique'
  ],
  authors: [{ name: 'Laurent Serre', url: 'https://laurent-serre-developpement.fr' }],
  creator: 'Laurent Serre',
  publisher: 'Laurent Serre Développement',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Ne jamais couper la poire en deux | Technique FBI | Laurent Serre',
    description: 'Maîtrisez la technique de négociation FBI "Ne jamais couper la poire en deux" avec les conseils terrain de Laurent Serre. 85% de préservation des marges, cas PME concrets.',
    type: 'article',
    locale: 'fr_FR',
    url: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux',
    siteName: 'Laurent Serre Développement',
    images: [
      {
        url: 'https://laurent-serre-developpement.fr/images/og-technique-ne-jamais-couper-poire.jpg',
        width: 1200,
        height: 630,
        alt: 'Technique FBI Ne jamais couper la poire en deux - Laurent Serre Expert Négociation',
        type: 'image/jpeg',
      },
      {
        url: 'https://laurent-serre-developpement.fr/images/og-technique-ne-jamais-couper-poire-square.jpg',
        width: 600,
        height: 600,
        alt: 'Technique FBI Ne jamais couper la poire en deux - Laurent Serre',
        type: 'image/jpeg',
      },
    ],
    article: {
      publishedTime: '2025-01-27T10:00:00.000Z',
      modifiedTime: '2025-01-27T10:00:00.000Z',
      authors: ['Laurent Serre'],
      section: 'Techniques de Négociation',
      tags: ['négociation', 'FBI', 'Chris Voss', 'PME', 'closing commercial', 'empathie tactique', 'alternatives créatives'],
    },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@laurent_serre',
    creator: '@laurent_serre',
    title: 'Ne jamais couper la poire en deux | Technique FBI | Laurent Serre',
    description: 'Maîtrisez la technique de négociation FBI avec 85% de préservation des marges. Guide complet avec cas PME.',
    images: {
      url: 'https://laurent-serre-developpement.fr/images/og-technique-ne-jamais-couper-poire.jpg',
      alt: 'Technique FBI Ne jamais couper la poire en deux - Laurent Serre',
    },
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'article:author': 'Laurent Serre',
    'article:publisher': 'https://laurent-serre-developpement.fr',
    'article:reading_time': '15',
    'article:word_count': '3500',
    'og:see_also': [
      'https://laurent-serre-developpement.fr/ressources/techniques-de-negociation',
      'https://laurent-serre-developpement.fr/formation-commerciale-pme',
      'https://laurent-serre-developpement.fr/expert-developpement-commercial-pme'
    ],
    // Métadonnées pour featured snippets
    'og:type': 'article',
    'og:article:author': 'Laurent Serre',
    'og:article:section': 'Techniques de Négociation',
    'og:article:tag': 'négociation commerciale, technique FBI, Chris Voss, PME',
    // Métadonnées pour rich snippets
    'schema:author': 'Laurent Serre',
    'schema:datePublished': '2025-01-27T10:00:00+01:00',
    'schema:dateModified': '2025-01-27T10:00:00+01:00',
    'schema:headline': 'Ne jamais couper la poire en deux - Technique FBI de Chris Voss',
    'schema:description': 'Guide complet de la technique de négociation FBI adaptée aux PME françaises',
    'schema:image': 'https://laurent-serre-developpement.fr/images/technique-ne-jamais-couper-poire.jpg',
    // Métadonnées pour l'indexation mobile
    'mobile-web-app-capable': 'yes',
    'mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-title': 'Technique FBI - Laurent Serre',
    // Métadonnées pour l'accessibilité et les lecteurs d'écran
    'accessibility-features': 'alternativeText,structuralNavigation,readingOrder',
    'accessibility-hazards': 'none',
    'accessibility-api': 'ARIA',
    // Métadonnées pour la géolocalisation
    'geo.region': 'FR-34',
    'geo.placename': 'Montpellier',
    'geo.position': '43.610769;3.876716',
    'ICBM': '43.610769, 3.876716',
  },
};

// Données structurées Schema.org avancées pour rich snippets et featured snippets
const techniqueStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#article",
      "headline": "Ne jamais couper la poire en deux - Technique FBI de Chris Voss",
      "alternativeHeadline": "Technique de négociation FBI pour préserver ses marges sans compromettre la relation client",
      "description": "Guide complet de la technique de négociation de Chris Voss adaptée au contexte PME français par Laurent Serre. 85% de préservation des marges, scripts inclus.",
      "author": {
        "@type": "Person",
        "@id": "https://laurent-serre-developpement.fr#laurent-serre",
        "name": "Laurent Serre",
        "url": "https://laurent-serre-developpement.fr",
        "jobTitle": "Expert Développement Commercial PME",
        "description": "Expert en développement commercial PME avec 20 ans d'expérience terrain",
        "sameAs": [
          "https://www.linkedin.com/in/laurent-serre-developpement",
          "https://twitter.com/laurent_serre"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "Laurent Serre Développement"
        },
        "knowsAbout": [
          "Négociation commerciale",
          "Développement commercial PME",
          "Formation commerciale",
          "Techniques de closing"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://laurent-serre-developpement.fr#organization",
        "name": "Laurent Serre Développement",
        "url": "https://laurent-serre-developpement.fr",
        "logo": {
          "@type": "ImageObject",
          "url": "https://laurent-serre-developpement.fr/images/logo-laurent-serre.png",
          "width": 400,
          "height": 400
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+33-4-67-00-00-00",
          "contactType": "customer service",
          "availableLanguage": "French"
        }
      },
      "datePublished": "2025-01-27T10:00:00+01:00",
      "dateModified": "2025-01-27T10:00:00+01:00",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux"
      },
      "image": [
        {
          "@type": "ImageObject",
          "url": "https://laurent-serre-developpement.fr/images/technique-ne-jamais-couper-poire.jpg",
          "width": 1200,
          "height": 630,
          "caption": "Technique FBI Ne jamais couper la poire en deux par Laurent Serre"
        },
        {
          "@type": "ImageObject",
          "url": "https://laurent-serre-developpement.fr/images/chris-voss-fbi-technique.jpg",
          "width": 800,
          "height": 600,
          "caption": "Chris Voss, ancien négociateur FBI, créateur de la technique"
        }
      ],
      "articleSection": "Techniques de Négociation",
      "keywords": "négociation commerciale, technique FBI, Chris Voss, PME, closing commercial, préservation marges, empathie tactique, alternatives créatives",
      "wordCount": 3500,
      "readingTime": "PT15M",
      "inLanguage": "fr-FR",
      "about": [
        {
          "@type": "Thing",
          "name": "Négociation commerciale",
          "description": "Techniques avancées de négociation pour PME",
          "sameAs": "https://fr.wikipedia.org/wiki/Négociation"
        },
        {
          "@type": "Thing",
          "name": "Chris Voss",
          "description": "Ancien négociateur en chef du FBI, auteur de Never Split the Difference",
          "sameAs": "https://en.wikipedia.org/wiki/Chris_Voss"
        }
      ],
      "mentions": [
        {
          "@type": "Book",
          "name": "Never Split the Difference",
          "author": "Chris Voss",
          "isbn": "978-0062407801"
        }
      ],
      "citation": [
        {
          "@type": "CreativeWork",
          "name": "Never Split the Difference: Negotiating As If Your Life Depended On It",
          "author": "Chris Voss"
        }
      ],
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".technique-title", ".laurent-vision", ".step-description"]
      }
    },
    {
      "@type": "HowTo",
      "@id": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#howto",
      "name": "Comment appliquer la technique 'Ne jamais couper la poire en deux'",
      "description": "Guide étape par étape pour maîtriser la technique de négociation FBI de Chris Voss adaptée aux PME françaises. Préservez 85% de vos marges sans compromettre la relation client.",
      "image": {
        "@type": "ImageObject",
        "url": "https://laurent-serre-developpement.fr/images/technique-ne-jamais-couper-poire.jpg",
        "width": 1200,
        "height": 630
      },
      "totalTime": "PT20M",
      "prepTime": "PT5M",
      "performTime": "PT15M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "EUR",
        "value": "0"
      },
      "yield": "85% de préservation des marges",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Préparation mentale et ancrage de valeur",
          "requiredQuantity": "1"
        },
        {
          "@type": "HowToSupply",
          "name": "Connaissance approfondie du dossier client",
          "requiredQuantity": "1"
        },
        {
          "@type": "HowToSupply",
          "name": "3-5 alternatives créatives préparées",
          "requiredQuantity": "3-5"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Techniques d'empathie tactique",
          "requiredQuantity": "1"
        },
        {
          "@type": "HowToTool",
          "name": "Questions calibrées de Chris Voss",
          "requiredQuantity": "1"
        },
        {
          "@type": "HowToTool",
          "name": "Scripts de négociation PME",
          "requiredQuantity": "1"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Préparation mentale et ancrage de valeur",
          "text": "Ancrez votre valeur et préparez-vous mentalement à ne jamais céder sur l'essentiel. Calculez votre prix plancher ET vos alternatives avant la négociation. Préparez 3-5 alternatives créatives qui préservent votre marge.",
          "url": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#preparation",
          "image": {
            "@type": "ImageObject",
            "url": "https://laurent-serre-developpement.fr/images/step-preparation.jpg",
            "width": 800,
            "height": 600
          }
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Le refus empathique - Technique du 'Non' protecteur",
          "text": "Refusez avec empathie tactique pour préserver la relation. Commencez TOUJOURS par l'empathie : 'Je comprends que...' puis utilisez 'Cependant' pour la transition vers votre position ferme.",
          "url": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#refus-empathique",
          "image": {
            "@type": "ImageObject",
            "url": "https://laurent-serre-developpement.fr/images/step-refus-empathique.jpg",
            "width": 800,
            "height": 600
          }
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Alternatives créatives - La 'Magie' de Chris Voss",
          "text": "Au lieu de couper la poire en deux, créez de la valeur nouvelle. Proposez 3-5 alternatives qui préservent votre marge : paiement échelonné, version modulaire, services additionnels inclus.",
          "url": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#alternatives",
          "image": {
            "@type": "ImageObject",
            "url": "https://laurent-serre-developpement.fr/images/step-alternatives.jpg",
            "width": 800,
            "height": 600
          }
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Maintien ferme avec empathie tactique",
          "text": "Répétez calmement votre position avec empathie renouvelée. Utilisez la technique du 'disque rayé' : reformulez leur problème pour montrer votre compréhension, puis recentrez sur vos solutions.",
          "url": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#maintien-ferme",
          "image": {
            "@type": "ImageObject",
            "url": "https://laurent-serre-developpement.fr/images/step-maintien.jpg",
            "width": 800,
            "height": 600
          }
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Clôture et renforcement de la décision",
          "text": "Renforcez la décision pour éviter les regrets post-signature. Félicitez chaleureusement leur choix intelligent et projetez-les dans le succès futur.",
          "url": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#cloture",
          "image": {
            "@type": "ImageObject",
            "url": "https://laurent-serre-developpement.fr/images/step-cloture.jpg",
            "width": 800,
            "height": 600
          }
        }
      ],
      "video": {
        "@type": "VideoObject",
        "name": "Technique Ne jamais couper la poire en deux - Démonstration Laurent Serre",
        "description": "Démonstration pratique de la technique de négociation FBI par Laurent Serre",
        "thumbnailUrl": "https://laurent-serre-developpement.fr/images/video-technique-thumbnail.jpg",
        "uploadDate": "2025-01-27T10:00:00+01:00",
        "duration": "PT8M30S",
        "contentUrl": "https://laurent-serre-developpement.fr/videos/technique-ne-jamais-couper-poire.mp4"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qu'est-ce que la technique 'Ne jamais couper la poire en deux' ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "C'est une technique de négociation développée par Chris Voss, ancien négociateur en chef du FBI, qui rejette les compromis traditionnels pour créer de la valeur authentique sans sacrifier ses positions essentielles. Elle consiste à refuser poliment mais fermement les demandes de remise et à proposer des alternatives créatives qui préservent la marge tout en apportant de la valeur au client.",
            "author": {
              "@type": "Person",
              "name": "Laurent Serre"
            }
          }
        },
        {
          "@type": "Question",
          "name": "Comment adapter cette technique au contexte PME français ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Laurent Serre a adapté cette technique en intégrant la courtoisie et l'empathie française tout en maintenant la fermeté sur les principes. L'approche respecte les relations personnelles cruciales en PME en commençant toujours par 'Je comprends que...' avant d'expliquer pourquoi un compromis ne servirait ni le client ni le fournisseur. L'adaptation française privilégie les solutions créatives aux refus secs.",
            "author": {
              "@type": "Person",
              "name": "Laurent Serre"
            }
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les résultats obtenus avec cette technique ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les résultats mesurés par Laurent Serre sur ses clients PME montrent : 85% de préservation des marges (vs 40% avec les compromis traditionnels), 92% de satisfaction client maintenue malgré la fermeté, 95% de durabilité des accords (moins de renégociations), et 78% d'amélioration de la perception de valeur de l'entreprise.",
            "author": {
              "@type": "Person",
              "name": "Laurent Serre"
            }
          }
        },
        {
          "@type": "Question",
          "name": "Quelles sont les erreurs à éviter avec cette technique ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les principales erreurs sont : céder immédiatement par peur de perdre le client, sur-justifier son refus avec des explications interminables, proposer des alternatives qui sont en fait des compromis déguisés, appliquer la technique de façon robotique sans empathie, et ne pas avoir préparé suffisamment d'alternatives créatives avant la négociation.",
            "author": {
              "@type": "Person",
              "name": "Laurent Serre"
            }
          }
        },
        {
          "@type": "Question",
          "name": "Comment préparer ses alternatives créatives ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Préparez 3-5 alternatives minimum avant chaque négociation en variant : le paiement (échelonné, différé), le timing (livraison modulaire), le périmètre (version allégée puis extensions), les services additionnels (formation, maintenance), et les garanties (résultats, satisfaction). Chaque alternative doit préserver votre marge ET apporter une valeur nouvelle au client.",
            "author": {
              "@type": "Person",
              "name": "Laurent Serre"
            }
          }
        },
        {
          "@type": "Question",
          "name": "Cette technique fonctionne-t-elle en négociation B2B complexe ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, particulièrement en B2B complexe où les relations long terme sont cruciales. Chris Voss l'a développée pour des négociations de vie ou de mort au FBI. En B2B, elle permet de construire une réputation de partenaire fiable qui ne brade pas sa valeur, ce qui renforce paradoxalement la confiance et facilite les négociations futures.",
            "author": {
              "@type": "Person",
              "name": "Laurent Serre"
            }
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://laurent-serre-developpement.fr"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Ressources",
          "item": "https://laurent-serre-developpement.fr/ressources"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Techniques de Négociation",
          "item": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Ne jamais couper la poire en deux",
          "item": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux"
        }
      ]
    },
    {
      "@type": "Course",
      "@id": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#course",
      "name": "Maîtriser la technique 'Ne jamais couper la poire en deux'",
      "description": "Formation complète à la technique de négociation FBI de Chris Voss adaptée aux PME françaises",
      "provider": {
        "@type": "Organization",
        "name": "Laurent Serre Développement",
        "url": "https://laurent-serre-developpement.fr"
      },
      "instructor": {
        "@type": "Person",
        "name": "Laurent Serre",
        "jobTitle": "Expert Développement Commercial PME"
      },
      "courseCode": "NEG-001",
      "educationalLevel": "Intermediate",
      "timeRequired": "PT2H",
      "inLanguage": "fr-FR",
      "learningResourceType": "Course",
      "teaches": [
        "Technique de refus empathique",
        "Création d'alternatives créatives",
        "Préservation des marges commerciales",
        "Négociation sans compromis destructeur"
      ],
      "coursePrerequisites": "Expérience de base en négociation commerciale",
      "educationalCredentialAwarded": "Certificat de maîtrise technique FBI",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#webpage",
      "url": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux",
      "name": "Ne jamais couper la poire en deux | Technique FBI | Laurent Serre",
      "description": "Guide complet de la technique de négociation FBI de Chris Voss adaptée aux PME françaises. 85% de préservation des marges, scripts et cas concrets inclus.",
      "inLanguage": "fr-FR",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://laurent-serre-developpement.fr#website",
        "name": "Laurent Serre Développement",
        "url": "https://laurent-serre-developpement.fr"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://laurent-serre-developpement.fr/images/technique-ne-jamais-couper-poire.jpg"
      },
      "datePublished": "2025-01-27T10:00:00+01:00",
      "dateModified": "2025-01-27T10:00:00+01:00",
      "author": {
        "@type": "Person",
        "name": "Laurent Serre"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Laurent Serre Développement"
      },
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux"
        },
        {
          "@type": "ShareAction",
          "target": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux"
        }
      ],
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".technique-title", ".laurent-vision", ".step-description", ".case-study-result"]
      }
    },
    {
      "@type": "ItemList",
      "@id": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux#related-techniques",
      "name": "Techniques de négociation complémentaires",
      "description": "Autres techniques de négociation recommandées par Laurent Serre",
      "numberOfItems": 3,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Article",
            "name": "Audit d'accusation",
            "url": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/audit-accusation"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Article",
            "name": "Questions calibrées",
            "url": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/questions-calibrees"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Article",
            "name": "Empathie tactique",
            "url": "https://laurent-serre-developpement.fr/ressources/techniques-de-negociation/empathie-tactique"
          }
        }
      ]
    }
  ]
};

// Données structurées pour l'entreprise locale (Laurent Serre à Montpellier)
const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://laurent-serre-developpement.fr#business",
  "name": "Laurent Serre Développement",
  "description": "Expert en développement commercial PME - Formation et coaching en négociation commerciale",
  "url": "https://laurent-serre-developpement.fr",
  "telephone": "+33-4-67-00-00-00",
  "email": "contact@laurent-serre-developpement.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Place de la Comédie",
    "addressLocality": "Montpellier",
    "postalCode": "34000",
    "addressRegion": "Occitanie",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.610769,
    "longitude": 3.876716
  },
  "founder": {
    "@type": "Person",
    "name": "Laurent Serre",
    "jobTitle": "Expert Développement Commercial PME",
    "knowsAbout": ["Négociation commerciale", "Formation commerciale", "Développement PME"]
  },
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "serviceType": [
    "Formation commerciale",
    "Coaching en négociation",
    "Développement commercial PME",
    "Techniques de closing"
  ],
  "priceRange": "€€",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [
    "https://www.linkedin.com/in/laurent-serre-developpement",
    "https://twitter.com/laurent_serre"
  ]
};

export default function NeJamaisCouperlaPoire() {
  const techniqueData = negotiationTechniqueData;

  // Initialize performance optimizations on client side
  if (typeof window !== 'undefined') {
    preloadCriticalResources();
    addResourceHints();
    checkPerformanceBudget();
  }

  return (
    <>
      {/* Schema.org structured data pour la technique */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techniqueStructuredData) }}
      />
      
      {/* Schema.org structured data pour l'entreprise locale */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-500/10 to-primary-bg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-primary-secondary">Chargement de la technique...</p>
          </div>
        </div>
      }>
        <TechniquePage technique={techniqueData} />
      </Suspense>
    </>
  );
}