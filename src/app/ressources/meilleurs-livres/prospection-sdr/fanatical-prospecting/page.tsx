import { bookCategories } from '@/data/books';
import Link from 'next/link';
import Head from 'next/head';

const book = bookCategories.find(cat => cat.slug === 'prospection-sdr')?.books.find(b => b.slug === 'fanatical-prospecting');

export default function FanaticalProspectingPage() {
  if (!book) return <div>Livre non trouvé.</div>;

  return (
    <>
      <Head>
        <title>Fanatical Prospecting : résumé et méthode de prospection B2B</title>
        <meta name="description" content={`Résumé détaillé, points clés et avis sur ${book.title} de ${book.author}. Découvrez les meilleures techniques de prospection moderne.`} />
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
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">La bible de la prospection moderne, pour remplir son pipe sans relâche.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            Fanatical Prospecting est un guide incontournable pour générer un flux constant d’opportunités commerciales. Jeb Blount y détaille les 5 C du social selling, un cadre téléphonique en 5 étapes, et insiste sur l’importance d’une prospection régulière et disciplinée. L’auteur partage des tactiques immédiatement applicables pour surmonter les objections, obtenir plus de rendez-vous qualifiés et remplir son pipeline sans relâche. Ce livre est une référence pour tous ceux qui veulent maîtriser l’art de la prospection moderne.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Chapitres clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Les 5 C du social selling : Contact, Cadence, Cadre, Conversation, Conversion</li>
            <li>Le script téléphonique en 5 étapes pour réussir ses appels à froid</li>
            <li>Comment surmonter les objections de début de cycle</li>
            <li>La discipline de la prospection quotidienne</li>
            <li>Remplir et gérer son pipeline pour performer sur la durée</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>La régularité de la prospection est la clé du succès</li>
            <li>Préparer ses scripts et ses séquences à l’avance</li>
            <li>Ne jamais attendre que le pipe se vide pour prospecter</li>
            <li>Utiliser le social selling pour obtenir plus de rendez-vous</li>
            <li>Travailler son mental pour rester motivé face au rejet</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « La prospection fanatique, c’est la discipline qui sépare les top performers des vendeurs moyens. »
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
          <Link href="/ressources/meilleurs-livres/prospection-sdr" className="text-mint-green underline hover:text-mint-green/80 text-lg">← Retour à la catégorie Prospection & SDR</Link>
        </div>
      </main>
    </>
  );
} 