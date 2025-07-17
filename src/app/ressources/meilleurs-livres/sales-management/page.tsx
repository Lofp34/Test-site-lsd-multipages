import { salesManagementCategory } from '@/data/books-enriched';
import Link from 'next/link';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ComparisonTable from '@/components/ui/ComparisonTable';
import BookCard from '@/components/ui/BookCard';
import React from 'react';

// Données structurées Schema.org pour la page catégorie
const categoryStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Sales Management & Leadership - Meilleurs Livres",
  "description": "Management et leadership commercial : les références pour diriger, motiver et développer des équipes commerciales performantes.",
  "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Meilleurs livres Sales Management & Leadership",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "Good to Great",
        "author": "Jim Collins",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/good-to-great"
      },
      {
        "@type": "Book", 
        "position": 2,
        "name": "High Output Management",
        "author": "Andy Grove",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/high-output-management"
      },
      {
        "@type": "Book",
        "position": 3, 
        "name": "Blue Ocean Strategy",
        "author": "W. Chan Kim & Renée Mauborgne",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/blue-ocean-strategy"
      },
      {
        "@type": "Book",
        "position": 4,
        "name": "The Innovator's Dilemma", 
        "author": "Clayton Christensen",
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/innovators-dilemma"
      },
      {
        "@type": "Book",
        "position": 5,
        "name": "Leaders Eat Last",
        "author": "Simon Sinek", 
        "url": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management/leaders-eat-last"
      }
    ]
  },
  "breadcrumb": {
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
        "name": "Meilleurs Livres",
        "item": "https://laurent-serre-developpement.fr/ressources/meilleurs-livres"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Sales Management & Leadership"
      }
    ]
  }
};

export const metadata: Metadata = {
  title: 'Sales Management & Leadership | Meilleurs Livres | Laurent Serre',
  description: 'Les meilleurs livres de management et leadership commercial. Good to Great, High Output Management, Blue Ocean Strategy. Résumés détaillés et avis terrain de Laurent Serre.',
  keywords: [
    'management commercial',
    'leadership vente', 
    'manager équipe commerciale',
    'good to great',
    'high output management',
    'blue ocean strategy',
    'leaders eat last',
    'innovators dilemma',
    'laurent serre'
  ],
  openGraph: {
    title: 'Sales Management & Leadership | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres de management et leadership commercial. Good to Great, High Output Management, Blue Ocean Strategy. Résumés détaillés et avis terrain.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Management & Leadership | Meilleurs Livres | Laurent Serre',
    description: 'Les meilleurs livres de management et leadership commercial. Good to Great, High Output Management, Blue Ocean Strategy.',
  },
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/meilleurs-livres/sales-management',
  },
  other: {
    'preload': '/ressources/meilleurs-livres/sales-management/good-to-great as document',
  },
};

export default function SalesManagementPage() {
  const category = salesManagementCategory;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
      {/* Hero section */}
      <section className="max-w-4xl mx-auto text-center mb-12 px-4">
        <AnimatedSection animation="fade-in" delay={0}>
          <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
            {category.icon} Catégorie
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {category.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed">
            {category.description}
          </p>
        </AnimatedSection>
      </section>

      {/* Tableau comparatif */}
      <AnimatedSection delay={100}>
        <div className="max-w-6xl mx-auto px-4">
          <ComparisonTable 
            books={category.books} 
            category="sales-management" 
          />
        </div>
      </AnimatedSection>

      {/* Grid de livres */}
      <AnimatedSection delay={200}>
        <div className="max-w-6xl mx-auto mb-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.books.map((book, index) => (
              <AnimatedSection key={book.slug} delay={300 + index * 100}>
                <BookCard 
                  book={book} 
                  variant="grid"
                  showRating={true}
                  showDifficulty={true}
                  showReadingTime={true}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Bootcamp */}
      <AnimatedSection delay={400}>
        <div className="max-w-2xl mx-auto text-center mt-8 px-4">
          <div className="bg-white/70 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-8 border border-mint-green/20 backdrop-blur-sm">
            <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">
              Passez du livre au terrain
            </div>
            <h4 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">
              Découvrez le Bootcamp Commercial Intensif by LSD
            </h4>
            <p className="text-lg text-gray-700 dark:text-gray-100 mb-6 leading-relaxed">
              Formez-vous avec les meilleures méthodes de management commercial issues de ces livres de référence, adaptées aux enjeux des PME françaises.
            </p>
            <Link 
              href="/bootcamp-commercial-intensif" 
              className="inline-block bg-mint-green text-blue-ink font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-mint-green/80 hover:scale-105 transition-all duration-300"
            >
              Voir le Bootcamp
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Navigation retour */}
      <div className="max-w-3xl mx-auto text-center mt-8 px-4">
        <Link 
          href="/ressources/meilleurs-livres" 
          className="text-mint-green underline hover:text-mint-green/80 text-lg transition-colors"
        >
          ← Retour à la rubrique Meilleurs livres
        </Link>
      </div>
      </main>
    </>
  );
}