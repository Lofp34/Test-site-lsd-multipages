import { bookCategories } from '@/data/books';
import Link from 'next/link';
import Head from 'next/head';

const book = bookCategories.find(cat => cat.slug === 'negociation-closing')?.books.find(b => b.slug === 'getting-to-yes');

export default function GettingToYesPage() {
  if (!book) return <div>Livre non trouvé.</div>;

  return (
    <>
      <Head>
        <title>{book.title} : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content={`Résumé détaillé, points clés et avis sur ${book.title} de ${book.author}. Le classique de la négociation raisonnée de Harvard.`} />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-44 bg-gradient-to-br from-mint-green/30 to-blue-ink/10 rounded-lg flex items-center justify-center text-5xl shadow-lg mb-2">
              {/* Placeholder cover */}
              🤝
            </div>
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Négociation & Closing</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">{book.title}</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">{book.author} <span className="text-white/60 font-normal">— {book.year}</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Le classique de la négociation raisonnée de Harvard.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            Getting to Yes expose une méthode en quatre principes pour trouver des accords gagnant-gagnant : raisonner en intérêts (et non en positions), générer des options mutuellement avantageuses, s’appuyer sur des critères objectifs, dissocier les personnes du problème. Les auteurs introduisent le concept de BATNA (meilleure solution de repli) pour négocier avec sérénité et obtenir des résultats durables.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Chapitres clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Raisonner en intérêts, pas en positions</li>
            <li>Générer des options mutuellement avantageuses</li>
            <li>S’appuyer sur des critères objectifs</li>
            <li>Dissocier les personnes du problème</li>
            <li>Le concept de BATNA (Best Alternative to a Negotiated Agreement)</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Creuser les intérêts réels de chaque partie</li>
            <li>Imaginer plusieurs solutions avant de décider</li>
            <li>Utiliser des critères objectifs pour légitimer l’accord</li>
            <li>Gérer les émotions à part pour éviter les blocages</li>
            <li>Connaître sa BATNA pour négocier avec confiance</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « On n’obtient pas ce qu’on mérite, mais ce qu’on négocie intelligemment. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink mb-2">Découvrez le Bootcamp Vente by LSD</h4>
          <p className="text-lg text-gray-700 mb-4">Formez-vous avec les meilleures méthodes issues de ce livre, adaptées à la réalité du terrain B2B.</p>
          <Link href="/bootcamp" className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition">Voir le Bootcamp</Link>
        </div>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8">
          <Link href="/ressources/meilleurs-livres/negociation-closing" className="text-mint-green underline hover:text-mint-green/80 text-lg">← Retour à la catégorie Négociation & Closing</Link>
        </div>
      </main>
    </>
  );
} 