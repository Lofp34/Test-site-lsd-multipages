import { bookCategories } from '@/data/books';
import Link from 'next/link';
import Head from 'next/head';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

const categoryIcons: Record<string, string> = {
  'prospection-sdr': '📞',
  'negociation-closing': '🤝',
  'psychologie-influence': '🧠',
  'methodes-process': '🛠️',
  'enterprise-account': '🏢',
  'management-leadership': '👔',
  'digital-ai': '🤖',
  'mindset-performance': '🔥',
};

export default function MeilleursLivresPage() {
  return (
    <>
      <Head>
        <title>Le guide ultime des livres de vente | Meilleurs livres | LSD</title>
        <meta name="description" content="Découvrez la sélection LSD des meilleurs livres de vente, négociation, influence, management, digital et mindset. Résumés, avis, conseils terrain." />
      </Head>
      <main className="bg-primary-bg dark:bg-gray-dark text-gray-dark dark:text-primary-bg pt-24 min-h-screen overflow-x-hidden">
        {/* Hero Section alignée blog */}
        <section className="min-h-[60vh] relative overflow-hidden flex items-center justify-center pt-8 pb-12">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-ink via-blue-ink/95 to-mint-green/20"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
                <span className="w-3 h-3 bg-mint-green rounded-full animate-pulse"></span>
                <span className="font-title font-semibold text-mint-green text-sm md:text-base">
                  Sélection LSD • Références incontournables pour performer en 2025
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-title font-extrabold text-white leading-tight drop-shadow-lg">
                <span className="text-white">Le guide ultime des</span> <span className="text-mint-green">livres de vente</span>
              </h1>
              <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-white/95 leading-relaxed drop-shadow-md px-2">
                  Les meilleurs ouvrages pour booster votre prospection, négociation, influence, management, digital et mindset. Résumés, avis, conseils terrain, tout pour passer à l’action.
                </p>
                <p className="text-base sm:text-lg md:text-xl font-italic text-white/90 leading-relaxed drop-shadow-sm px-2">
                  Sélection indépendante, ton direct, retours terrain et synthèses actionnables pour progresser vite.
                </p>
              </div>
              {/* CTA boutons */}
              <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row justify-center items-center pt-6 sm:pt-8 pb-4 sm:pb-8 px-4">
                <Link href="/ressources">
                  <Button 
                    variant="primary"
                    size="lg"
                    icon="📚"
                    className="w-full sm:w-auto"
                  >
                    Toutes les ressources
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button 
                    variant="outline"
                    size="lg"
                    icon="📝"
                    className="w-full sm:w-auto"
                  >
                    Voir le blog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Grid catégories (inchangée) */}
        <section className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="slide-up" delay={0}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
              {bookCategories.map((cat, i) => (
                <AnimatedSection key={cat.slug} animation="fade-in" delay={200 + i * 80}>
                  <Link
                    href={`/ressources/meilleurs-livres/${cat.slug}`}
                    className="group relative rounded-3xl bg-white/80 dark:bg-gray-anthracite/40 backdrop-blur-md border border-mint-green/20 shadow-2xl hover:shadow-3xl p-8 flex flex-col items-center transition-all duration-300 hover:scale-[1.03] overflow-hidden min-h-[340px]"
                  >
                    {/* Icône catégorie */}
                    <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-2xl bg-mint-green/10 group-hover:bg-mint-green/20 shadow-lg transition-colors">
                      <span className="text-4xl">{categoryIcons[cat.slug] || '📚'}</span>
                    </div>
                    <h2 className="text-2xl font-title font-bold text-blue-ink dark:text-mint-green text-center mb-2 group-hover:text-mint-green transition-colors">
                      {cat.title}
                    </h2>
                    <p className="text-center text-base text-gray-anthracite dark:text-primary-bg/80 mb-4 italic font-body">
                      {cat.pitch}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-auto mb-4">
                      {cat.books.slice(0, 5).map((book) => (
                        <span key={book.slug} className="bg-mint-green/10 text-mint-green text-xs px-3 py-1 rounded-full font-medium">
                          {book.title}
                        </span>
                      ))}
                      {cat.books.length > 5 && (
                        <span className="bg-mint-green/10 text-mint-green text-xs px-3 py-1 rounded-full font-medium">+{cat.books.length - 5} autres</span>
                      )}
                    </div>
                    <span className="absolute bottom-6 right-6 text-mint-green text-2xl opacity-70 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* Footer d'accroche (inchangé) */}
        <AnimatedSection animation="fade-in" delay={900}>
          <div className="mt-20 text-center">
            <p className="text-xl md:text-2xl font-title font-semibold text-blue-ink dark:text-mint-green">
              Enrichissez votre bibliothèque, boostez vos performances !
            </p>
            <p className="mt-2 text-base text-gray-anthracite dark:text-primary-bg/70">
              Chaque livre est une pépite : découvrez les résumés, avis et conseils terrain pour passer du savoir à l’action.
            </p>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
} 