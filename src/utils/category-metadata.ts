import { Metadata } from 'next';
import { CategoryPageProps, CategoryTheme } from '@/types/category-templates';
import { Book } from '@/data/books-enriched';

/**
 * Génère les métadonnées SEO complètes pour une page catégorie
 */
export function generateCategoryMetadata(
  category: CategoryPageProps['category'],
  theme: CategoryTheme
): Metadata {
  const baseUrl = 'https://laurent-serre-developpement.fr';
  const pageUrl = `${baseUrl}/ressources/meilleurs-livres/${category.slug}`;
  
  // Génère la liste des livres pour la description
  const booksList = category.books.slice(0, 3).map(book => book.title).join(', ');
  const moreBooks = category.books.length > 3 ? ` et ${category.books.length - 3} autres` : '';
  
  return {
    title: `${theme.name} | Meilleurs Livres | Laurent Serre`,
    description: `Les meilleurs livres sur ${theme.name.toLowerCase()}. ${booksList}${moreBooks}. Résumés détaillés et conseils terrain de Laurent Serre.`,
    keywords: [
      ...(category.seoKeywords || []),
      'laurent serre',
      'meilleurs livres',
      'développement commercial',
      'formation vente',
      'coaching commercial',
      'PME'
    ],
    openGraph: {
      title: `${theme.name} | Meilleurs Livres | Laurent Serre`,
      description: category.description || `Découvrez les meilleurs livres sur ${theme.name.toLowerCase()} sélectionnés par Laurent Serre.`,
      type: 'website',
      locale: 'fr_FR',
      url: pageUrl,
      images: [
        {
          url: `${baseUrl}/images/og-${category.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${theme.name} - Meilleurs Livres par Laurent Serre`,
        },
      ],
      siteName: 'Laurent Serre Développement',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${theme.name} | Meilleurs Livres | Laurent Serre`,
      description: category.description || `Les meilleurs livres sur ${theme.name.toLowerCase()} par Laurent Serre.`,
      images: [`${baseUrl}/images/og-${category.slug}.jpg`],
    },
    alternates: {
      canonical: pageUrl,
    },
    other: {
      'preload': category.books.length > 0 ? `${pageUrl}/${category.books[0].slug} as document` : undefined,
    },
  };
}

/**
 * Génère les données structurées Schema.org pour une page catégorie
 */
export function generateCategoryStructuredData(
  category: CategoryPageProps['category'],
  theme: CategoryTheme
) {
  const baseUrl = 'https://laurent-serre-developpement.fr';
  const pageUrl = `${baseUrl}/ressources/meilleurs-livres/${category.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${theme.name} - Meilleurs Livres`,
    "description": category.description,
    "url": pageUrl,
    "mainEntity": {
      "@type": "ItemList",
      "name": `Meilleurs livres ${theme.name}`,
      "numberOfItems": category.books.length,
      "itemListElement": category.books.map((book, index) => ({
        "@type": "Book",
        "position": index + 1,
        "name": book.title,
        "author": book.author,
        "datePublished": book.year.toString(),
        "url": `${pageUrl}/${book.slug}`,
        "description": book.tagline,
        "aggregateRating": book.rating ? {
          "@type": "AggregateRating",
          "ratingValue": book.rating,
          "bestRating": 5,
          "ratingCount": 1
        } : undefined
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Ressources",
          "item": `${baseUrl}/ressources`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Meilleurs Livres",
          "item": `${baseUrl}/ressources/meilleurs-livres`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": theme.name
        }
      ]
    },
    "author": {
      "@type": "Person",
      "name": "Laurent Serre",
      "url": baseUrl,
      "jobTitle": "Expert en développement commercial PME",
      "worksFor": {
        "@type": "Organization",
        "name": "Laurent Serre Développement"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Laurent Serre Développement",
      "url": baseUrl
    }
  };
}

/**
 * Génère les métadonnées SEO pour une page livre individuelle
 */
export function generateBookMetadata(
  book: Book,
  category: { slug: string; title: string; theme: CategoryTheme }
): Metadata {
  const baseUrl = 'https://laurent-serre-developpement.fr';
  const pageUrl = `${baseUrl}/ressources/meilleurs-livres/${category.slug}/${book.slug}`;
  
  return {
    title: `${book.title} par ${book.author} | ${category.theme.name} | Laurent Serre`,
    description: `${book.tagline} Résumé détaillé, points clés et conseils d'application par Laurent Serre. ${book.difficulty ? `Niveau ${book.difficulty}.` : ''} ${book.readingTime ? `Lecture ${book.readingTime}.` : ''}`,
    keywords: [
      book.title.toLowerCase(),
      book.author.toLowerCase(),
      category.theme.name.toLowerCase(),
      'résumé livre',
      'laurent serre',
      'développement commercial',
      'formation vente'
    ],
    openGraph: {
      title: `${book.title} | ${category.theme.name} | Laurent Serre`,
      description: book.tagline,
      type: 'article',
      locale: 'fr_FR',
      url: pageUrl,
      images: [
        {
          url: book.cover || `${baseUrl}/images/og-book-${book.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `Couverture du livre ${book.title} par ${book.author}`,
        },
      ],
      siteName: 'Laurent Serre Développement',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${book.title} | ${category.theme.name} | Laurent Serre`,
      description: book.tagline,
      images: [book.cover || `${baseUrl}/images/og-book-${book.slug}.jpg`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

/**
 * Génère les données structurées Schema.org pour une page livre
 */
export function generateBookStructuredData(
  book: Book,
  category: { slug: string; title: string; theme: CategoryTheme }
) {
  const baseUrl = 'https://laurent-serre-developpement.fr';
  const pageUrl = `${baseUrl}/ressources/meilleurs-livres/${category.slug}/${book.slug}`;
  const categoryUrl = `${baseUrl}/ressources/meilleurs-livres/${category.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": book.title,
    "author": {
      "@type": "Person",
      "name": book.author
    },
    "datePublished": book.year.toString(),
    "description": book.tagline,
    "url": pageUrl,
    "image": book.cover,
    "genre": category.title,
    "inLanguage": "fr-FR",
    "aggregateRating": book.rating ? {
      "@type": "AggregateRating",
      "ratingValue": book.rating,
      "bestRating": 5,
      "ratingCount": 1
    } : undefined,
    "review": {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Laurent Serre",
        "jobTitle": "Expert en développement commercial PME"
      },
      "reviewBody": book.summary || book.tagline,
      "reviewRating": book.rating ? {
        "@type": "Rating",
        "ratingValue": book.rating,
        "bestRating": 5
      } : undefined
    },
    "isPartOf": {
      "@type": "CollectionPage",
      "name": category.title,
      "url": categoryUrl
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Ressources",
          "item": `${baseUrl}/ressources`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Meilleurs Livres",
          "item": `${baseUrl}/ressources/meilleurs-livres`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": category.title,
          "item": categoryUrl
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": book.title
        }
      ]
    }
  };
}