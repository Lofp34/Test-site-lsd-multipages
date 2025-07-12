import Link from 'next/link';
import Head from 'next/head';

export default function ThinkingFastAndSlowPage() {
  return (
    <>
      <Head>
        <title>Thinking, Fast and Slow : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de Thinking, Fast and Slow (Daniel Kahneman). Comprendre les biais cognitifs et la psychologie de la décision." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Psychologie & Influence</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Thinking, Fast and Slow</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Daniel Kahneman <span className="text-white/60 font-normal">— 2011</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Comprendre les biais cognitifs et la psychologie de la décision.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            Kahneman explique que notre esprit comporte deux systèmes de pensée : le Système 1, rapide, instinctif et émotionnel, et le Système 2, plus lent, réfléchi et logique. De nombreux biais cognitifs proviennent des raccourcis pris par le Système 1. Ce livre enseigne une pensée plus critique et lucide, pour mieux persuader et se prémunir des manipulations.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Concepts clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Système 1 : pensée rapide, intuitive, émotionnelle</li>
            <li>Système 2 : pensée lente, analytique, logique</li>
            <li>Biais cognitifs : excès de confiance, aversion aux pertes, effet d’ancrage…</li>
            <li>Importance de la vigilance face à nos intuitions</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Prendre conscience de ses biais pour mieux décider</li>
            <li>Adapter son message aux réflexes mentaux du public</li>
            <li>Développer une pensée critique pour éviter les manipulations</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « Nous surestimons souvent la fiabilité de nos intuitions. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-2">Découvrez le Bootcamp Influence by LSD</h4>
          <p className="text-lg text-gray-700 dark:text-gray-100 mb-4">Formez-vous avec les meilleures techniques issues de ce livre, adaptées à la réalité du terrain B2B.</p>
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