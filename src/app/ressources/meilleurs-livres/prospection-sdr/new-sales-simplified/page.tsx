import { bookCategories } from '@/data/books';
import Link from 'next/link';
import Head from 'next/head';

const book = bookCategories.find(cat => cat.slug === 'prospection-sdr')?.books.find(b => b.slug === 'new-sales-simplified');

export default function NewSalesSimplifiedPage() {
  if (!book) return <div>Livre non trouvé.</div>;

  return (
    <>
      <Head>
        <title>{book.title} : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content={`Résumé détaillé, points clés et avis sur ${book.title} de ${book.author}. Le retour aux fondamentaux de la conquête client.`} />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-44 bg-gradient-to-br from-mint-green/30 to-blue-ink/10 rounded-lg flex items-center justify-center text-5xl shadow-lg mb-2">
              {/* Placeholder cover */}
              📞
            </div>
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Prospection & SDR</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">{book.title}</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">{book.author} <span className="text-white/60 font-normal">— {book.year}</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Le retour aux fondamentaux de la conquête client.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            New Sales. Simplified. est un livre percutant sur la vente « new business » qui fournit un cadre simple et éprouvé pour conquérir de nouveaux clients. Mike Weinberg insiste sur le retour aux fondamentaux de la prospection : histoire de vente convaincante, démarche proactive, construction d’une liste ciblée, ouverture d’appel à froid, emails percutants, power statement. Un concentré de bonnes pratiques pour maîtriser l’art du cold call.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Chapitres clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Construire une histoire de vente convaincante</li>
            <li>Élaborer une liste ciblée de prospects de qualité</li>
            <li>Réussir l’ouverture d’appel à froid</li>
            <li>Rédiger des emails percutants et laisser des messages vocaux efficaces</li>
            <li>Le concept de « power statement » pour formaliser sa proposition de valeur</li>
            <li>Créer son plan de prospection et maîtriser l’art du cold call</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Revenir aux fondamentaux pour conquérir de nouveaux clients</li>
            <li>Préparer son histoire de vente et ses scripts à l’avance</li>
            <li>Être proactif et discipliné dans la prospection</li>
            <li>Utiliser le power statement comme base de tous ses pitchs</li>
            <li>Ne pas négliger l’impact d’un bon message vocal ou email</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « Maîtriser l’art du cold call, c’est d’abord maîtriser son histoire et sa discipline. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-2">Découvrez le Bootcamp Vente by LSD</h4>
          <p className="text-lg text-gray-700 dark:text-gray-100 mb-4">Formez-vous avec les meilleures méthodes issues de ce livre, adaptées à la réalité du terrain B2B.</p>
          <Link href="/bootcamp" className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition">Voir le Bootcamp</Link>
        </div>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8">
          <Link href="/ressources/meilleurs-livres/prospection-sdr" className="text-mint-green underline hover:text-mint-green/80 text-lg">← Retour à la catégorie Prospection & SDR</Link>
        </div>
      </main>
    </>
  );
} 