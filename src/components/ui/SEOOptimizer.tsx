'use client';

import React, { useEffect, useMemo } from 'react';
import Head from 'next/head';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
  priority?: 'high' | 'medium' | 'low';
  noIndex?: boolean;
  children?: React.ReactNode;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ArticleData {
  headline: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  description: string;
}

export const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title = "Laurent Serre Développement - Expert Commercial PME",
  description = "Expert en développement commercial pour PME. Formation, coaching et accompagnement terrain avec 20 ans d'expérience. Structuration d'équipes commerciales performantes.",
  keywords = "expert développement commercial PME, formation commerciale, coaching commercial, accompagnement vente, structuration équipe commerciale, Laurent Serre",
  canonical,
  ogImage = "https://laurentserre.com/laurent.jpg",
  ogType = "website",
  structuredData,
  priority = "medium",
  noIndex = false,
  children
}) => {
  const defaultStructuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Laurent Serre Développement",
    "url": "https://laurentserre.com",
    "logo": "https://laurentserre.com/laurent.jpg",
    "image": "https://laurentserre.com/laurent.jpg",
    "description": description,
    "foundingDate": "2020",
    "areaServed": {
      "@type": "Place",
      "name": "France",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR",
        "addressRegion": "Occitanie",
        "addressLocality": "Mauguio"
      }
    },
    "serviceType": [
      "Formation commerciale",
      "Coaching commercial",
      "Accompagnement développement commercial",
      "Structuration équipe commerciale"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de développement commercial",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Formation commerciale PME",
            "description": "Formation spécialisée pour équipes commerciales PME"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Coaching commercial",
            "description": "Accompagnement personnalisé des commerciaux"
          }
        }
      ]
    }
  }), [description]);

  const finalStructuredData = structuredData || defaultStructuredData;

  // Génération automatique des métadonnées optimisées
  const optimizedTitle = useMemo(() => {
    const baseTitle = title;
    const maxLength = 60;
    return baseTitle.length > maxLength 
      ? `${baseTitle.substring(0, maxLength - 3)}...` 
      : baseTitle;
  }, [title]);

  const optimizedDescription = useMemo(() => {
    const maxLength = 160;
    return description.length > maxLength 
      ? `${description.substring(0, maxLength - 3)}...` 
      : description;
  }, [description]);

  // Optimisation des mots-clés
  const optimizedKeywords = useMemo(() => {
    const baseKeywords = keywords.split(',').map(k => k.trim());
    const priorityKeywords = [
      'expert développement commercial PME',
      'formation commerciale',
      'coaching commercial',
      'Laurent Serre'
    ];
    
    // Ajouter les mots-clés prioritaires en premier
    const allKeywords = [...priorityKeywords, ...baseKeywords];
    return [...new Set(allKeywords)].join(', ');
  }, [keywords]);

  // Génération des données structurées pour les articles
  const generateArticleStructuredData = (articleData: ArticleData) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.headline,
    "author": {
      "@type": "Person",
      "name": articleData.author
    },
    "datePublished": articleData.datePublished,
    "dateModified": articleData.dateModified,
    "image": articleData.image || ogImage,
    "description": articleData.description,
    "publisher": {
      "@type": "Organization",
      "name": "Laurent Serre Développement",
      "logo": {
        "@type": "ImageObject",
        "url": "https://laurentserre.com/laurent.jpg"
      }
    }
  });

  // Génération des breadcrumbs structurés
  const generateBreadcrumbStructuredData = (breadcrumbs: BreadcrumbItem[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });

  // Optimisation des performances SEO
  useEffect(() => {
    // Préchargement des ressources critiques
    if (priority === 'high') {
      const preloadLinks = [
        { rel: 'preload', href: ogImage, as: 'image' },
        { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' }
      ];

      preloadLinks.forEach(link => {
        const linkElement = document.createElement('link');
        Object.assign(linkElement, link);
        document.head.appendChild(linkElement);
      });
    }

    // Amélioration de l'accessibilité pour le SEO
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('role', 'main');
      mainContent.setAttribute('aria-label', 'Contenu principal');
    }
  }, [priority, ogImage]);

  return (
    <>
      <Head>
        {/* Métadonnées de base */}
        <title>{optimizedTitle}</title>
        <meta name="description" content={optimizedDescription} />
        <meta name="keywords" content={optimizedKeywords} />
        <meta name="author" content="Laurent Serre" />
        <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
        
        {/* Canonical */}
        {canonical && <link rel="canonical" href={canonical} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={optimizedTitle} />
        <meta property="og:description" content={optimizedDescription} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonical || "https://laurentserre.com"} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Laurent Serre Développement" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={optimizedTitle} />
        <meta name="twitter:description" content={optimizedDescription} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Données structurées */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(finalStructuredData)
          }}
        />
        
        {/* Métadonnées supplémentaires pour le SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1B365D" />
        <meta name="msapplication-TileColor" content="#1B365D" />
        
        {/* Préchargement des ressources critiques */}
        {priority === 'high' && (
          <>
            <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
            <link rel="preload" href="/fonts/roboto-slab-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          </>
        )}
      </Head>
      
      {children}
    </>
  );
};

// Hook pour l'optimisation SEO dynamique
export const useSEOOptimization = () => {
  const updatePageTitle = (title: string) => {
    if (typeof document !== 'undefined') {
      document.title = title;
    }
  };

  const updateMetaDescription = (description: string) => {
    if (typeof document !== 'undefined') {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  };

  const addStructuredData = (data: any) => {
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    }
  };

  return {
    updatePageTitle,
    updateMetaDescription,
    addStructuredData
  };
};

// Composant pour les breadcrumbs SEO
export const SEOBreadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const breadcrumbData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }), [items]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              <a 
                href={item.url}
                className="hover:text-mint-green transition-colors"
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default SEOOptimizer; 