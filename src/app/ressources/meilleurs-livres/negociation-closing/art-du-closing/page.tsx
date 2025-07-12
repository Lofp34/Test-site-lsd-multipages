import Link from 'next/link';
import Head from 'next/head';

export default function ArtDuClosingPage() {
  return (
    <>
      <Head>
        <title>L’Art du closing : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content="Résumé détaillé, techniques, conseils terrain et citation de L’Art du closing (Anthony Iannarino, Zig Ziglar, Brian Tracy…). Le guide pour conclure ses ventes avec méthode et confiance." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Négociation & Closing</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">L’Art du closing</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Anthony Iannarino, Zig Ziglar, Brian Tracy…</p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Obtenir l’engagement final du client, étape par étape.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            Le closing n’est pas un acte unique en fin de cycle, mais une série de « mini-engagements » tout au long du processus de vente. Anthony Iannarino démontre que chaque étape doit apporter de la valeur pour mériter la signature. Ce type d’ouvrage complète les approches globales en fournissant des formules concrètes pour répondre aux dernières objections, créer un sentiment d’urgence et formuler la demande de commande avec confiance.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Techniques et concepts clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Le closing comme succession de micro-engagements (prochaine réunion, implication du décideur, etc.).</li>
            <li>Créer de la valeur à chaque étape pour mériter la signature.</li>
            <li>Formules de langage pour lever les dernières objections et créer l’urgence.</li>
            <li>Demander la commande de façon assumée et confiante.</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Préparer chaque étape du closing comme une progression naturelle, pas une rupture.</li>
            <li>Oser demander l’engagement quand on a vraiment aidé le client à se décider.</li>
            <li>Utiliser des formulations positives et assumées pour conclure.</li>
            <li>Créer un sentiment d’urgence sans pression excessive.</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « Qui ne demande pas, n’obtient pas. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-2">Découvrez le Bootcamp Négociation by LSD</h4>
          <p className="text-lg text-gray-700 dark:text-gray-100 mb-4">Formez-vous avec les meilleures méthodes issues de ce livre, adaptées à la réalité du terrain B2B.</p>
          <Link href="/bootcamp-commercial-intensif" className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition">Voir le Bootcamp</Link>
        </div>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8">
          <Link href="/ressources/meilleurs-livres/negociation-closing" className="text-mint-green underline hover:text-mint-green/80 text-lg">← Retour à la catégorie Négociation & Closing</Link>
        </div>
      </main>
    </>
  );
} 