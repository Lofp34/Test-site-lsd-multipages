import Link from 'next/link';
import Head from 'next/head';

export default function SpinSellingPage() {
  return (
    <>
      <Head>
        <title>SPIN Selling : résumé complet | Méthodes & Processus de vente | LSD</title>
        <meta name="description" content="Résumé détaillé, méthode SPIN, conseils terrain et citation de SPIN Selling (Neil Rackham). La référence pour la vente complexe et la négociation B2B." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Méthodes & Process</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">SPIN Selling</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Neil Rackham <span className="text-white/60 font-normal">— 1988</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">La méthode structurée pour la vente complexe.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            SPIN Selling est l’une des premières méthodes de vente consultative fondées sur la recherche, centrée sur le questionnement et la création de valeur conjointe. Basé sur 12 ans de recherche et l’analyse de 35 000 entretiens de vente, Rackham démontre que, dans les ventes à fort enjeu, les techniques traditionnelles sont inefficaces. Il propose à la place l’approche SPIN : une séquence de questions à poser au client pour l’amener à exprimer lui-même ses besoins et la valeur de la solution.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">La méthode SPIN</h3>
          <ul className="list-disc ml-6 mb-6">
            <li><b>Situation</b> : comprendre la situation actuelle du client.</li>
            <li><b>Problème</b> : identifier un problème ou une douleur.</li>
            <li><b>Implication</b> : explorer les conséquences négatives du problème.</li>
            <li><b>Need-Payoff</b> : aider le client à formuler l’intérêt d’une solution.</li>
          </ul>
          <p>Cette séquence de questions permet au client de prendre conscience de ses besoins et de la valeur de la solution, au lieu de subir un argumentaire trop tôt.</p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Privilégier l’écoute active et le questionnement structuré.</li>
            <li>Ne pas précipiter la présentation de la solution : faire émerger le besoin d’abord.</li>
            <li>Utiliser la méthode SPIN pour guider la découverte client et créer de la valeur conjointe.</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « Les meilleurs vendeurs posent plus de questions, et de meilleures questions, que les autres. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink mb-2">Découvrez le Bootcamp Méthodes de vente by LSD</h4>
          <p className="text-lg text-gray-700 mb-4">Formez-vous avec les meilleures méthodes issues de ce livre, adaptées à la réalité du terrain B2B.</p>
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