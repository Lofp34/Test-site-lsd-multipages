import Link from 'next/link';
import Head from 'next/head';

export default function TheNewSuccessfulLargeAccountManagementPage() {
  return (
    <>
      <Head>
        <title>The New Successful Large Account Management (LAMP) : résumé complet | Gestion des comptes entreprises | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de The New Successful Large Account Management (LAMP). La méthode pour industrialiser la gestion et la croissance des grands comptes." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Gestion des comptes entreprises</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">The New Successful Large Account Management (LAMP)</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Robert Miller, Stephen Heiman, Tad Tuleja <span className="text-white/60 font-normal">— 2005</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">La méthode LAMP pour industrialiser la gestion et la croissance des grands comptes.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            Les fondateurs de Miller Heiman ont formalisé le processus de management des comptes existants via la méthode LAMP (Large Account Management Process). Ce livre explique comment classer ses comptes (top, stratégiques…) et comment élaborer un plan de croissance par compte. La philosophie est de construire des relations long terme mutuellement profitables.
          </p>
          <p>
            Les auteurs détaillent comment conduire régulièrement des revues de compte avec le client, comment détecter de nouvelles opportunités de vente upsell/cross-sell, et comment apporter davantage de valeur pour devenir un partenaire indispensable du client. LAMP fournit des outils pratiques comme l’analyse des « white spaces » (identifier les lignes de produits non encore vendues au client), le plan d’action annuel co-construit, etc. Il s’agit d’industrialiser la gestion de la relation client pour fidéliser et développer ses principaux clients.
          </p>
          <p>
            Un impératif quand on sait que généralement 20% des clients génèrent 80% du chiffre d’affaires. Ce livre, parent du Strategic Selling, aide à passer d’une posture de vendeur à celle de gestionnaire de partenariat sur le long terme.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Concepts clés / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Classer ses comptes (top, stratégiques, etc.) pour prioriser les efforts</li>
            <li>Élaborer un plan de croissance par compte, co-construit avec le client</li>
            <li>Conduire des revues de compte régulières pour détecter de nouvelles opportunités</li>
            <li>Analyser les « white spaces » pour identifier les axes de développement</li>
            <li>Passer d’une posture de vendeur à celle de gestionnaire de partenariat</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « Industrialiser la gestion de la relation client, c’est fidéliser et développer ses principaux clients sur le long terme. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-2">Découvrez le Bootcamp Grands Comptes by LSD</h4>
          <p className="text-lg text-gray-700 dark:text-gray-100 mb-4">Formez-vous avec les meilleures méthodes issues de ce livre, adaptées à la gestion des comptes stratégiques et grands comptes.</p>
          <Link href="/bootcamp" className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition">Voir le Bootcamp</Link>
        </div>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8">
          <Link href="/ressources/meilleurs-livres/enterprise-account" className="text-mint-green underline hover:text-mint-green/80 text-lg">← Retour à la catégorie Gestion des comptes entreprises</Link>
        </div>
      </main>
    </>
  );
} 