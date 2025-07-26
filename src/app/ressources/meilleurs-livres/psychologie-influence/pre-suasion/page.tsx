import Link from 'next/link';
import Head from 'next/head';

export default function PreSuasionPage() {
  return (
    <>
      <Head>
        <title>Pré-Suasion : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de Pré-Suasion (Robert Cialdini). L'art de préparer le terrain psychologique avant de persuader." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Psychologie & Influence</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Pré-Suasion</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Robert Cialdini <span className="text-white/60 font-normal">— 2016</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">L’art de préparer le terrain psychologique avant de persuader.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            Cialdini s’intéresse à l’art de la préparation mentale à la persuasion : « le moment avant le message » compte autant que le message lui-même. Il explique comment capturer puis canaliser l’attention du public pour créer le bon contexte psychologique avant de formuler sa requête. Pré-Suasion ajoute un 7e principe à la liste de Cialdini : l’unité (créer un sentiment d’identité commune avec son audience).
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Concepts clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>L’importance du « priming » (amorçage) avant le message</li>
            <li>Capturer et canaliser l’attention pour préparer la persuasion</li>
            <li>Créer un contexte psychologique favorable</li>
            <li>Le 7e principe : l’unité (sentiment d’identité commune)</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Soigner l’introduction et le contexte avant de délivrer un message clé</li>
            <li>Utiliser l’amorçage pour influencer la réceptivité</li>
            <li>Créer un sentiment d’unité avec son audience</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « Le moment avant le message compte autant que le message lui-même. »
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