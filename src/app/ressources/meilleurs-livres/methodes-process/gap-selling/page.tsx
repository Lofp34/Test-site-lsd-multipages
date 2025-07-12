import Link from 'next/link';
import Head from 'next/head';

export default function GapSellingPage() {
  return (
    <>
      <Head>
        <title>Gap Selling : résumé complet | Méthodes & Processus de vente | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de Gap Selling (Keenan). La méthode pour combler le fossé entre l'état actuel et l'état désiré du client." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Méthodes & Process</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Gap Selling</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Keenan <span className="text-white/60 font-normal">— 2018</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">La méthode pour combler le fossé entre l’état actuel et l’état désiré du client.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            Gap Selling est centré sur le concept de “combler le fossé” (gap) entre l’état actuel du client et l’état futur souhaité. Le commercial agit comme un diagnosticien : il doit découvrir la situation présente du client, l’aider à définir où il veut aller, puis montrer comment la solution réduit ce gap.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Étapes clés de Gap Selling</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Découverte exhaustive de la situation actuelle du client</li>
            <li>Définition de l’état futur souhaité</li>
            <li>Amplification de la conscience du gap</li>
            <li>Alignement de la solution sur le gap réel</li>
          </ul>
          <p>L’approche est exigeante, mais promet des ventes plus solides et un véritable rôle de consultant auprès du client.</p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Creuser beaucoup plus loin dans la découverte client</li>
            <li>Quantifier l’impact du problème et du gap</li>
            <li>Ne jamais proposer de solution avant d’avoir cerné le gap</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « La vente, c’est l’art de combler le fossé entre où est le client et où il veut aller. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-2">Découvrez le Bootcamp Méthodes de vente by LSD</h4>
          <p className="text-lg text-gray-700 dark:text-gray-100 mb-4">Formez-vous avec les meilleures méthodes issues de ce livre, adaptées à la réalité du terrain B2B.</p>
          <Link href="/bootcamp" className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition">Voir le Bootcamp</Link>
        </div>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8">
          <Link href="/ressources/meilleurs-livres/methodes-process" className="text-mint-green underline hover:text-mint-green/80 text-lg">← Retour à la catégorie Méthodes & Processus de vente</Link>
        </div>
      </main>
    </>
  );
} 