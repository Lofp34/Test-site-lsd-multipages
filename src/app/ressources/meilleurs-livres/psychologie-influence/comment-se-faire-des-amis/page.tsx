import Link from 'next/link';
import Head from 'next/head';

export default function CommentSeFaireDesAmisPage() {
  return (
    <>
      <Head>
        <title>Comment se faire des amis : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de Comment se faire des amis (Dale Carnegie). Le classique intemporel de la psychologie relationnelle et de l'influence." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Psychologie & Influence</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Comment se faire des amis</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Dale Carnegie <span className="text-white/60 font-normal">— 1936</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Le classique intemporel de la psychologie relationnelle.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            Carnegie distille des conseils concrets pour améliorer ses relations et influencer positivement autrui : manifester un intérêt sincère pour les autres, se souvenir de leur prénom, éviter de critiquer frontalement, valoriser honnêtement les qualités de son interlocuteur… Ce livre, best-seller mondial depuis près de 90 ans, montre que l’influence commence par l’empathie et la bienveillance.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Principes clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Manifester un intérêt sincère pour les autres</li>
            <li>Se souvenir du prénom de son interlocuteur</li>
            <li>Éviter la critique directe, valoriser honnêtement</li>
            <li>Parler d’abord des intérêts de l’autre</li>
            <li>Écouter activement et valoriser les progrès</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>L’influence commence par l’empathie et la bienveillance</li>
            <li>Valoriser les autres sincèrement pour créer des relations durables</li>
            <li>Appliquer les principes de Carnegie pour améliorer son leadership et son charisme</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « Parlez d’abord des intérêts de l’autre, et il s’intéressera à vous. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink mb-2">Découvrez le Bootcamp Influence by LSD</h4>
          <p className="text-lg text-gray-700 mb-4">Formez-vous avec les meilleures techniques issues de ce livre, adaptées à la réalité du terrain B2B.</p>
          <Link href="/bootcamp" className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition">Voir le Bootcamp</Link>
        </div>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8">
          <Link href="/ressources/meilleurs-livres/psychologie-influence" className="text-mint-green underline hover:text-mint-green/80 text-lg">← Retour à la catégorie Psychologie & Influence</Link>
        </div>
      </main>
    </>
  );
} 