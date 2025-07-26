import { bookCategories } from '@/data/books';
import Link from 'next/link';
import Head from 'next/head';

const book = bookCategories.find(cat => cat.slug === 'negociation-closing')?.books.find(b => b.slug === 'never-split-the-difference');

export default function NeverSplitTheDifferencePage() {
  if (!book) return <div>Livre non trouvé.</div>;

  return (
    <>
      <Head>
        <title>{book.title} : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content={`Résumé détaillé, points clés et avis sur ${book.title} de ${book.author}. Les meilleures techniques de négociation par l’ancien du FBI.`} />
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
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Révolutionnez vos négociations avec l’empathie tactique et l’écoute active.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            Never Split the Difference, écrit par l’ancien négociateur du FBI Chris Voss, révolutionne les techniques de négociation en prônant l’empathie tactique et l’écoute active. Voss explique comment décrypter les émotions et besoins profonds de l’autre, utiliser le mirroring et les questions calibrées, et pratiquer l’audit d’accusation pour désamorcer la méfiance. Il recommande d’encourager le « non » pour découvrir les vraies préoccupations et enseigne à négocier sans concession inutile, en obtenant la confiance de l’autre partie.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Chapitres clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>L’empathie tactique et l’écoute active</li>
            <li>Le mirroring et les questions calibrées</li>
            <li>L’audit d’accusation pour désamorcer les objections</li>
            <li>Encourager le « non » pour mieux comprendre l’autre</li>
            <li>Créer des solutions gagnant-gagnant créatives</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Pratiquer l’écoute active pour comprendre les besoins cachés</li>
            <li>Utiliser le mirroring pour instaurer la confiance</li>
            <li>Formuler les objections de l’autre avant qu’il ne le fasse</li>
            <li>Ne pas avoir peur du « non » : c’est le début de la vraie négociation</li>
            <li>Rechercher la confiance et la créativité plutôt que le compromis</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « L’empathie tactique, c’est comprendre l’autre mieux qu’il ne se comprend lui-même. »
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