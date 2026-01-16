import Link from 'next/link';
import Head from 'next/head';

export default function PredictablyIrrationalPage() {
  return (
    <>
      <Head>
        <title>Predictably Irrational : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de Predictably Irrational (Dan Ariely). Comprendre l'irrationalité prévisible de nos décisions et ses applications en marketing et vente." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Psychologie & Influence</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Predictably Irrational</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Dan Ariely <span className="text-white/60 font-normal">— 2008</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Comprendre l’irrationalité prévisible de nos décisions.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            Ariely démontre à travers des expériences à quel point nos décisions sont souvent irrationnelles… de manière prévisible ! Il décortique l’effet de leurre, le pouvoir de la gratuité, le biais d’ancrage, et explique pourquoi nous accordons trop de valeur à nos possessions. Une mine d’or pour comprendre les motivations cachées des consommateurs.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Concepts clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>L’effet de leurre (decoy effect)</li>
            <li>Le pouvoir de la gratuité</li>
            <li>Biais d’ancrage</li>
            <li>Effet de dotation (endowment effect)</li>
            <li>Nos choix sont irrationnels, mais de façon prévisible</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Utiliser l’effet de leurre pour orienter les choix</li>
            <li>Exploiter la gratuité pour augmenter l’engagement</li>
            <li>Être conscient de ses propres biais pour mieux décider</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « Nos décisions ne sont pas aussi rationnelles qu’on le croit… et c’est prévisible. »
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