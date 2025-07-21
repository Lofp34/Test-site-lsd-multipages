import { bookCategories } from '@/data/books';
import Link from 'next/link';
import Head from 'next/head';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SmartCategoryBreadcrumb from '@/components/ui/SmartCategoryBreadcrumb';
import CrossCategoryNavigation from '@/components/ui/CrossCategoryNavigation';
import React from 'react';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

const category = bookCategories.find(cat => cat.slug === 'prospection-sdr');

export default function ProspectionSDRPage() {
  if (!category) return <div>Catégorie non trouvée.</div>;

  return (
    <>
      <Head>
        <title>Livres de prospection & SDR | Meilleurs livres | LSD</title>
        <meta name="description" content="Les meilleurs livres pour générer du pipe, prospecter efficacement, et booster votre flux d'opportunités commerciales. Résumés, avis, conseils terrain." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-4 shadow-md backdrop-blur">Catégorie</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Livres de prospection & SDR</h1>
          <p className="text-lg md:text-xl text-white/80 mb-6">Générez un flux constant d’opportunités et maîtrisez l’art de la prospection moderne en 2025.</p>
        </section>

        {/* Smart Category Breadcrumb with Cross-Category Navigation */}
        <SmartCategoryBreadcrumb
          items={[
            { label: 'Ressources', href: '/ressources' },
            { label: 'Meilleurs Livres', href: '/ressources/meilleurs-livres' },
            { label: 'Prospection & SDR', href: '/ressources/meilleurs-livres/prospection-sdr', current: true }
          ]}
          currentCategory="prospection-sdr"
          showIntelligentRecommendations={true}
          userProfile="SDR"
        />

        {/* Tableau comparatif (déplacé au-dessus de la grid) */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto bg-white/70 dark:bg-blue-ink/80 rounded-xl shadow-lg p-6 mb-10 border border-mint-green/20">
            <h3 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Comment choisir ?</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="text-mint-green">
                    <th className="py-2 px-3">Titre</th>
                    <th className="py-2 px-3">Durée lecture</th>
                    <th className="py-2 px-3">Difficulté</th>
                    <th className="py-2 px-3">Pour qui ?</th>
                  </tr>
                </thead>
                <tbody>
                  {category.books.map(book => (
                    <tr key={book.slug}>
                      <td className="py-2 px-3 font-semibold">
                        <Link href={`/ressources/meilleurs-livres/prospection-sdr/${book.slug}`} className="text-mint-green underline hover:text-mint-green/80">
                          {book.title}
                        </Link>
                      </td>
                      {/* Valeurs fictives à adapter si besoin */}
                      <td className="py-2 px-3">{book.title === 'Fanatical Prospecting' || book.title === 'New Sales. Simplified.' ? '6h' : '7h'}</td>
                      <td className="py-2 px-3">{book.title === 'Fanatical Prospecting' || book.title === 'New Sales. Simplified.' ? 'Facile' : 'Intermédiaire'}</td>
                      <td className="py-2 px-3">{
                        book.title === 'Fanatical Prospecting' ? 'SDR, Commercial débutant' :
                        book.title === 'Predictable Revenue' ? 'SDR, Manager' :
                        book.title === 'The Sales Development Playbook' ? 'SDR, Team Leader' :
                        book.title === 'New Sales. Simplified.' ? 'Commercial, Indépendant' :
                        'SDR, Outbound'
                      }</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link href="#quiz" className="text-mint-green underline hover:text-mint-green/80">👉 Quel livre pour votre profil ? (Quiz à venir)</Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Grid de livres */}
        <AnimatedSection>
          <div className="max-w-6xl mx-auto mb-12">
            {chunkArray(category.books, 3).map((row, idx, arr) => {
              const isLast = idx === arr.length - 1;
              const missing = 3 - row.length;
              return (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {row.map(book => (
                    <div key={book.slug} className="bg-white/80 dark:bg-blue-ink/80 rounded-2xl shadow-2xl p-6 flex flex-col items-center glassmorphism hover:scale-105 hover:shadow-3xl transition-all duration-300 border border-mint-green/30">
                      <div className="w-28 h-40 bg-gradient-to-br from-mint-green/30 to-blue-ink/10 rounded-lg mb-4 flex items-center justify-center text-4xl">📞</div>
                      <h2 className="text-xl font-bold text-blue-ink dark:text-mint-green mb-2 text-center">{book.title}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-200 mb-2 italic">{book.author} — {book.year}</p>
                      <p className="text-base text-gray-700 dark:text-gray-100 mb-4 text-center">{book.tagline}</p>
                      <Link href={`/ressources/meilleurs-livres/prospection-sdr/${book.slug}`} className="mt-auto inline-block bg-mint-green text-blue-ink font-semibold px-4 py-2 rounded-full shadow hover:bg-mint-green/80 transition">Résumé complet</Link>
                    </div>
                  ))}
                  {isLast && missing > 0 && Array.from({ length: missing }).map((_, i) => (
                    <div key={`empty-${i}`} className="invisible" />
                  ))}
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Cross-Category Navigation */}
        <AnimatedSection delay={0.3}>
          <CrossCategoryNavigation 
            currentCategory="prospection-sdr"
            userProfile="SDR"
            className="mb-12"
          />
        </AnimatedSection>

        {/* CTA Bootcamp */}
        <AnimatedSection delay={0.4}>
          <div className="max-w-2xl mx-auto text-center mt-8">
            <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
            <h4 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-2">Découvrez le Bootcamp Vente by LSD</h4>
            <p className="text-lg text-gray-700 dark:text-gray-100 mb-4">Formez-vous avec les meilleures méthodes issues de ces livres, adaptées à la réalité du terrain B2B.</p>
            <Link href="/bootcamp" className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition">Voir le Bootcamp</Link>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
} 