import { Metadata } from 'next';
import { reportingData } from '@/data/ressources/reporting-data';
import ReportingPageClient from './ReportingPageClient';

// Enhanced SEO Metadata
export const metadata: Metadata = {
  title: reportingData.seoConfig.title,
  description: reportingData.seoConfig.description,
  keywords: reportingData.seoConfig.keywords,
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
    title: reportingData.seoConfig.openGraph.title,
    description: reportingData.seoConfig.openGraph.description,
    type: 'website',
    locale: 'fr_FR',
    url: reportingData.seoConfig.canonicalUrl,
    siteName: 'Laurent Serre Développement',
    images: [
      {
        url: reportingData.seoConfig.openGraph.image,
        width: 1200,
        height: 630,
        alt: 'Pack Reporting Commercial Automatisé - Laurent Serre',
        type: 'image/jpeg',
      },
      {
        url: 'https://laurent-serre-developpement.fr/images/reporting-square.jpg',
        width: 400,
        height: 400,
        alt: 'Pack Reporting - Aperçu',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LaurentSerre',
    creator: '@LaurentSerre',
    title: reportingData.seoConfig.twitter.title,
    description: reportingData.seoConfig.twitter.description,
    images: [
      {
        url: reportingData.seoConfig.twitter.image,
        alt: 'Pack Reporting Commercial Automatisé - Laurent Serre',
      },
    ],
  },
  alternates: {
    canonical: reportingData.seoConfig.canonicalUrl,
    languages: {
      'fr-FR': reportingData.seoConfig.canonicalUrl,
    },
  },
  category: 'Business Tools',
  classification: 'Business Application',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'msapplication-TileColor': '#3B82F6',
    'theme-color': '#3B82F6',
    'preload': '/ressources/reporting-automatise/templates as document',
  },
};

export default function ReportingAutomatisePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": reportingData.seoConfig.structuredData.name,
    "description": reportingData.seoConfig.structuredData.description,
    "url": reportingData.seoConfig.canonicalUrl,
    "provider": {
      "@type": "Person",
      "name": "Laurent Serre",
      "url": "https://laurent-serre-developpement.fr",
      "jobTitle": "Expert en développement commercial PME",
      "worksFor": {
        "@type": "Organization",
        "name": "Laurent Serre Développement"
      }
    },
    "downloadUrl": reportingData.seoConfig.structuredData.downloadUrl,
    "fileFormat": reportingData.seoConfig.structuredData.fileFormat,
    "contentSize": reportingData.seoConfig.structuredData.contentSize,
    "datePublished": reportingData.seoConfig.structuredData.datePublished,
    "dateModified": reportingData.seoConfig.structuredData.dateModified,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "350",
      "bestRating": "5"
    }
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
        "name": "Pack Reporting Automatisé",
        "item": "https://laurent-serre-developpement.fr/ressources/reporting-automatise"
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <ReportingPageClient />
    </>
  );
}