import Link from 'next/link';
import Head from 'next/head';

export default function SolutionSellingPage() {
  return (
    <>
      <Head>
        <title>Solution Selling : résumé complet | Méthodes & Processus de vente | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de Solution Selling (Michael Bosworth). La méthode pour vendre en résolvant les problèmes clients." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Méthodes & Process</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Solution Selling</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Michael Bosworth <span className="text-white/60 font-normal">— 1994</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">La méthode pour vendre en résolvant les problèmes clients.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            Solution Selling propose un processus en plusieurs étapes : rechercher les difficultés du client, les qualifier, proposer une vision de la solution, faire valider cette vision, justifier le ROI, puis négocier l’accord. L’accent est mis sur la découverte approfondie : un bon vendeur doit agir comme un médecin qui pose un diagnostic avant de prescrire.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Étapes clés de Solution Selling</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Découverte approfondie des problèmes du client</li>
            <li>Qualification et validation de la vision de la solution</li>
            <li>Justification du ROI</li>
            <li>Négociation et accord final</li>
          </ul>
          <p>La méthode a inculqué l’idée que “vendre, c’est résoudre un problème”, et qu’il faut commencer par écouter et comprendre.</p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Agir comme un médecin : diagnostiquer avant de prescrire</li>
            <li>Creuser la “douleur” du client pour proposer une solution personnalisée</li>
            <li>Co-construire la solution avec le client</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « Vendre, c’est résoudre un problème, pas pousser un produit. »
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