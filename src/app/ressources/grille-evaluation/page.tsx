import React from 'react';
import { Metadata } from 'next';
import { grilleEvaluationData } from '@/data/ressources/grille-evaluation-data';
import GrilleEvaluationPageClient from './GrilleEvaluationPageClient';

// Enhanced SEO Metadata
export const metadata: Metadata = {
  title: grilleEvaluationData.seoConfig.title,
  description: grilleEvaluationData.seoConfig.description,
  keywords: grilleEvaluationData.seoConfig.keywords,
  authors: [{ name: 'Laurent Serre', url: 'https://laurent-serre-developpement.fr' }],
  creator: 'Laurent Serre',
  publisher: 'Laurent Serre Développement',
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
  openGraph: {
    title: grilleEvaluationData.seoConfig.openGraph.title,
    description: grilleEvaluationData.seoConfig.openGraph.description,
    type: 'website',
    locale: 'fr_FR',
    url: grilleEvaluationData.seoConfig.canonicalUrl,
    siteName: 'Laurent Serre Développement',
    images: [
      {
        url: grilleEvaluationData.seoConfig.openGraph.image,
        width: 1200,
        height: 630,
        alt: 'Grille d\'Évaluation Commerciale - Laurent Serre',
        type: 'image/jpeg',
      },
      {
        url: 'https://laurent-serre-developpement.fr/images/grille-evaluation-square.jpg',
        width: 400,
        height: 400,
        alt: 'Grille d\'Évaluation - Aperçu',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LaurentSerre',
    creator: '@LaurentSerre',
    title: grilleEvaluationData.seoConfig.twitter.title,
    description: grilleEvaluationData.seoConfig.twitter.description,
    images: [
      {
        url: grilleEvaluationData.seoConfig.twitter.image,
        alt: 'Grille d\'Évaluation Commerciale - Laurent Serre',
      },
    ],
  },
  alternates: {
    canonical: grilleEvaluationData.seoConfig.canonicalUrl,
    languages: {
      'fr-FR': grilleEvaluationData.seoConfig.canonicalUrl,
    },
  },
  category: 'Business Tools',
  classification: 'Business Application',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'msapplication-TileColor': '#8B5CF6',
    'theme-color': '#8B5CF6',
  },
};

const GrilleEvaluationPage: React.FC = () => {
  // Enhanced structured data with multiple schemas
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": grilleEvaluationData.seoConfig.structuredData.name,
    "description": grilleEvaluationData.seoConfig.structuredData.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Microsoft Excel",
    "url": grilleEvaluationData.seoConfig.canonicalUrl,
    "downloadUrl": grilleEvaluationData.seoConfig.structuredData.downloadUrl,
    "fileFormat": grilleEvaluationData.seoConfig.structuredData.fileFormat,
    "datePublished": grilleEvaluationData.seoConfig.structuredData.datePublished,
    "dateModified": grilleEvaluationData.seoConfig.structuredData.dateModified,
    "author": {
      "@type": "Person",
      "name": "Laurent Serre",
      "url": "https://laurent-serre-developpement.fr",
      "jobTitle": "Expert en développement commercial PME",
      "worksFor": {
        "@type": "Organization",
        "name": "Laurent Serre Développement",
        "url": "https://laurent-serre-developpement.fr"
      }
    },
    "provider": {
      "@type": grilleEvaluationData.seoConfig.structuredData.provider['@type'],
      "name": grilleEvaluationData.seoConfig.structuredData.provider.name,
      "url": grilleEvaluationData.seoConfig.structuredData.provider.url
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": grilleEvaluationData.seoConfig.structuredData.datePublished
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "400",
      "bestRating": "5"
    },
    "keywords": grilleEvaluationData.seoConfig.keywords.join(", ")
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        "name": "Grille d'Évaluation Commerciale",
        "item": "https://laurent-serre-developpement.fr/ressources/grille-evaluation"
      }
    ]
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Laurent Serre Développement",
    "url": "https://laurent-serre-developpement.fr",
    "logo": "https://laurent-serre-developpement.fr/images/logo.png",
    "founder": {
      "@type": "Person",
      "name": "Laurent Serre"
    },
    "areaServed": "France",
    "serviceType": "Développement commercial PME"
  };

  return (
    <>
      {/* Enhanced Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />

      <GrilleEvaluationPageClient />
    </>
  );
};

export default GrilleEvaluationPage;