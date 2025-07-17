import { enterpriseAccountCategory } from '@/data/books-enriched';
import Link from 'next/link';
import Head from 'next/head';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ComparisonTable from '@/components/ui/ComparisonTable';
import BookCard from '@/components/ui/BookCard';
import React from 'react';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export default function EnterpriseAccountPage() {
  const category = enterpriseAccountCategory;

  return (
    <>
      <Head>
        <title>Gestion des comptes entreprises | Meilleurs livres | LSD</title>
        <meta name="description" content="Les meilleurs livres pour gérer et développer les comptes stratégiques, grands comptes et key account management. Résumés, avis, conseils terrain sur Strategic Selling, Key Account Management, etc." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">Catégorie</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Gestion des comptes entreprises</h1>
          <p className="text-lg md:text-xl text-white/80 mb-6">Account Management & vente grands comptes : méthodes, outils et stratégies pour fidéliser et développer vos clients stratégiques.</p>
        </section>

        {/* Tableau comparatif avec nouveau composant */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-6xl mx-auto px-4">
            <ComparisonTable 
              books={category.books} 
              category="enterprise-account" 
            />
          </div>
        </AnimatedSection>

        {/* Grid de livres avec nouveau composant BookCard */}
        <AnimatedSection>
          <div className="max-w-6xl mx-auto mb-12 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.books.map((book, index) => (
                <AnimatedSection key={book.slug} delay={0.1 + index * 0.1}>
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
        <AnimatedSection delay={0.4}>
          <div className="max-w-2xl mx-auto text-center mt-8">
            <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
            <h4 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-2">Découvrez le Bootcamp Grands Comptes by LSD</h4>
            <p className="text-lg text-gray-700 dark:text-gray-100 mb-4">Formez-vous avec les meilleures méthodes issues de ces livres, adaptées à la gestion des comptes stratégiques et grands comptes.</p>
            <Link href="/bootcamp" className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition">Voir le Bootcamp</Link>
          </div>
        </AnimatedSection>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8">
          <Link href="/ressources/meilleurs-livres" className="text-mint-green underline hover:text-mint-green/80 text-lg">← Retour à la rubrique Meilleurs livres</Link>
        </div>
      </main>
    </>
  );
} 