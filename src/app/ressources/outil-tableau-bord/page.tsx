import React from 'react';
import { Metadata } from 'next';
import { BarChart3, Download, Users, Target, BookOpen, MessageCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ParticleBackground from '@/components/ui/ParticleBackground';
import ResourceHero from '@/components/ressources/ResourceHero';
import ToolPreview from '@/components/ressources/ToolPreview';
import ResourceDownloadForm from '@/components/ressources/ResourceDownloadForm';
import ResourceCTAs from '@/components/ressources/ResourceCTAs';
import { tableauBordData } from '@/data/ressources/tableau-bord-data';
import TableauBordPageClient from './TableauBordPageClient';

// Enhanced SEO Metadata
export const metadata: Metadata = {
  title: tableauBordData.seoConfig.title,
  description: tableauBordData.seoConfig.description,
  keywords: tableauBordData.seoConfig.keywords,
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
    title: tableauBordData.seoConfig.openGraph.title,
    description: tableauBordData.seoConfig.openGraph.description,
    type: 'website',
    locale: 'fr_FR',
    url: tableauBordData.seoConfig.canonicalUrl,
    siteName: 'Laurent Serre Développement',
    images: [
      {
        url: tableauBordData.seoConfig.openGraph.image,
        width: 1200,
        height: 630,
        alt: 'Tableau de Bord Commercial Excel - Laurent Serre',
        type: 'image/jpeg',
      },
      {
        url: 'https://laurent-serre-developpement.fr/images/tableau-bord-square.jpg',
        width: 400,
        height: 400,
        alt: 'Tableau de Bord Commercial - Aperçu',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LaurentSerre',
    creator: '@LaurentSerre',
    title: tableauBordData.seoConfig.twitter.title,
    description: tableauBordData.seoConfig.twitter.description,
    images: [
      {
        url: tableauBordData.seoConfig.twitter.image,
        alt: 'Tableau de Bord Commercial Excel - Laurent Serre',
      },
    ],
  },
  alternates: {
    canonical: tableauBordData.seoConfig.canonicalUrl,
    languages: {
      'fr-FR': tableauBordData.seoConfig.canonicalUrl,
    },
  },
  category: 'Business Tools',
  classification: 'Business Application',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'msapplication-TileColor': '#00BDA4',
    'theme-color': '#00BDA4',
  },
};

const TableauBordPage: React.FC = () => {
  // Enhanced structured data with multiple schemas
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tableauBordData.seoConfig.structuredData.name,
    "description": tableauBordData.seoConfig.structuredData.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Microsoft Excel",
    "url": tableauBordData.seoConfig.canonicalUrl,
    "downloadUrl": tableauBordData.seoConfig.structuredData.downloadUrl,
    "fileFormat": tableauBordData.seoConfig.structuredData.fileFormat,
    "datePublished": tableauBordData.seoConfig.structuredData.datePublished,
    "dateModified": tableauBordData.seoConfig.structuredData.dateModified,
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
      "@type": tableauBordData.seoConfig.structuredData.provider['@type'],
      "name": tableauBordData.seoConfig.structuredData.provider.name,
      "url": tableauBordData.seoConfig.structuredData.provider.url
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": tableauBordData.seoConfig.structuredData.datePublished
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500",
      "bestRating": "5"
    },
    "keywords": tableauBordData.seoConfig.keywords.join(", ")
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
        "name": "Tableau de Bord Commercial",
        "item": "https://laurent-serre-developpement.fr/ressources/outil-tableau-bord"
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

      <TableauBordPageClient />
    </>
  );
};

export default TableauBordPage;