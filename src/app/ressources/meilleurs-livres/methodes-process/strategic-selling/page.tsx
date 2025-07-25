import Link from 'next/link';
import Head from 'next/head';

export default function StrategicSellingPage() {
  return (
    <>
      <Head>
        <title>Strategic Selling : résumé complet | Méthodes & Processus de vente | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de Strategic Selling (Miller & Heiman). Le guide de la vente grands comptes structurée." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Méthodes & Process</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Strategic Selling</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Robert Miller & Stephen Heiman <span className="text-white/60 font-normal">— 1985</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Le guide de la vente grands comptes structurée.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            Strategic Selling propose un processus structuré pour gérer des ventes complexes impliquant de multiples décideurs. L’outil clé est la “Blue Sheet” : cartographier tous les acteurs du compte, leurs critères de succès et le plan d’action pour chacun. La méthode introduit aussi le concept de win-win partagé et la notion de “vendre avec le client”.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Concepts clés de Strategic Selling</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>La Blue Sheet : cartographie des acteurs et plan d’action</li>
            <li>Les 4 types de personnes dans un compte (coach, utilisateur, décideur, gatekeeper)</li>
            <li>Win-win partagé, vendre avec le client</li>
            <li>Stratégie par compte, gestion des ventes complexes</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Cartographier tous les décideurs et influenceurs</li>
            <li>Adapter sa stratégie à chaque acteur</li>
            <li>Construire un plan d’action détaillé pour chaque compte</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « Vendre avec le client, pas au client. »
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