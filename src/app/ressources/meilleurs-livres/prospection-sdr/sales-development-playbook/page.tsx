import { bookCategories } from '@/data/books';
import Link from 'next/link';
import Head from 'next/head';

const book = bookCategories.find(cat => cat.slug === 'prospection-sdr')?.books.find(b => b.slug === 'sales-development-playbook');

export default function SalesDevelopmentPlaybookPage() {
  if (!book) return <div>Livre non trouvé.</div>;

  return (
    <>
      <Head>
        <title>{book.title} : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content={`Résumé détaillé, points clés et avis sur ${book.title} de ${book.author}. Le manuel pour bâtir une équipe SDR performante.`} />
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
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Le manuel pour bâtir une équipe SDR performante.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            The Sales Development Playbook est un manuel complet pour bâtir et faire monter en puissance une équipe de Sales Development Representatives (SDR). Trish Bertuzzi y décrit six piliers du succès SDR : stratégie, spécialisation, recrutement, motivation, exécution, leadership. L’autrice partage des conseils pratiques pour aligner vente et marketing, segmenter les prospects, structurer l’équipe, et rédiger des scripts d’appels et d’emails efficaces.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Chapitres clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Les 6 piliers du succès SDR : stratégie, spécialisation, recrutement, motivation, exécution, leadership</li>
            <li>Aligner les équipes vente et marketing</li>
            <li>Segmenter les prospects (A-list, Bread & Butter, Compelling Events, Dead Ends)</li>
            <li>Structurer l’équipe entre inbound et outbound</li>
            <li>Recruter, former et motiver les SDR</li>
            <li>Scripts d’appels et d’emails qui convertissent</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Segmenter finement ses prospects pour adapter l’approche</li>
            <li>Aligner vente et marketing pour maximiser la conversion</li>
            <li>Structurer l’équipe pour gérer inbound et outbound efficacement</li>
            <li>Former et motiver les SDR pour limiter le turnover</li>
            <li>Utiliser des scripts testés et adaptés à chaque segment</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « Le succès d’une équipe SDR repose sur la stratégie, la spécialisation et la motivation continue. »
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