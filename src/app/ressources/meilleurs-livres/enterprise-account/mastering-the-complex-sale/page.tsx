import Link from 'next/link';
import Head from 'next/head';

export default function MasteringTheComplexSalePage() {
  return (
    <>
      <Head>
        <title>Mastering the Complex Sale : résumé complet | Gestion des comptes entreprises | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de Mastering the Complex Sale (Jeff Thull). Le cadre stratégique pour réussir les ventes complexes et vendre de la valeur." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Gestion des comptes entreprises</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Mastering the Complex Sale</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Jeff Thull <span className="text-white/60 font-normal">— 2003</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Le cadre stratégique pour réussir les ventes complexes et vendre de la valeur.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            Jeff Thull propose un cadre stratégique appelé « Diagnostic Business Development » pour réussir les ventes complexes. Il insiste sur la notion de « valeur » : l’erreur de nombreux commerciaux est de vendre leur produit, au lieu d’aider le client à diagnostiquer ses vrais besoins et à quantifier la valeur d’une solution. Thull articule un processus en quatre phases (modèle « Prime Process ») : Discover, Diagnose, Design, Deliver.
          </p>
          <ul className="list-disc ml-6 mb-6">
            <li><b>Discover</b> : identifier les clients cibles et formuler une hypothèse de valeur</li>
            <li><b>Diagnose</b> : approfondir avec le client pour découvrir les causes racines de ses problèmes</li>
            <li><b>Design</b> : co-concevoir avec lui une solution sur mesure</li>
            <li><b>Deliver</b> : déployer la solution et mesurer les résultats</li>
          </ul>
          <p>
            Mastering the Complex Sale insiste sur l’importance d’éviter la commoditisation (banalisation) de son offre en apportant cette approche conseil unique. L’auteur met aussi en garde contre les « pièges » pour le commercial (vouloir trop présenter trop tôt, mal qualifier le processus décisionnel, etc.). Ce livre fournit en somme une feuille de route méthodique pour vendre de la valeur et bâtir une relation de confiance, particulièrement utile pour des ventes B2B complexes où le risque d’« échouer en faisant tout bien » est élevé si on ne réinvente pas le modèle de discussion.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Concepts clés / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Adopter une posture de consultant : diagnostiquer avant de prescrire</li>
            <li>Quantifier la valeur de la solution pour le client</li>
            <li>Éviter la banalisation de l’offre en personnalisant la solution</li>
            <li>Se méfier des pièges classiques : présentation trop précoce, mauvaise qualification du processus décisionnel</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « Vendre de la valeur, c’est d’abord aider le client à comprendre ses vrais problèmes et à mesurer l’impact d’une solution sur son business. »
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