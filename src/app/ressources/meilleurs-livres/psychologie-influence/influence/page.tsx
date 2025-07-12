import Link from 'next/link';
import Head from 'next/head';

export default function InfluencePage() {
  return (
    <>
      <Head>
        <title>Influence: The Psychology of Persuasion : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de Influence: The Psychology of Persuasion (Robert Cialdini). Le classique de la persuasion et de l'influence psychologique." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Psychologie & Influence</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Influence: The Psychology of Persuasion</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Robert Cialdini <span className="text-white/60 font-normal">— 1984</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Le classique de la persuasion.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            Cialdini détaille 6 grands principes universels qui guident nos comportements d’acceptation : la réciprocité, la cohérence, la preuve sociale, l’autorité, la sympathie et la rareté. Pour chacun, il explique les expériences psychologiques qui les sous-tendent et comment les mettre en œuvre de façon éthique. Influence est une lecture fascinante qui permet de comprendre pourquoi nous disons « oui » et comment se protéger des manipulations.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Les 6 principes de l’influence</h3>
          <ul className="list-disc ml-6 mb-6">
            <li><b>Réciprocité</b> : donner pour recevoir.</li>
            <li><b>Cohérence</b> : l’engagement et la constance.</li>
            <li><b>Preuve sociale</b> : suivre l’exemple des autres.</li>
            <li><b>Autorité</b> : écouter les experts ou figures d’autorité.</li>
            <li><b>Sympathie</b> : nous sommes plus influencés par ceux que nous aimons.</li>
            <li><b>Rareté</b> : ce qui est rare a plus de valeur.</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Utiliser la réciprocité pour augmenter le taux de réponse (ex : offrir un contenu gratuit).</li>
            <li>Créer de la preuve sociale pour rassurer (témoignages, logos clients…)</li>
            <li>Être attentif à l’éthique : influencer n’est pas manipuler.</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « Comprendre l’influence, c’est se donner le pouvoir de dire oui… ou non. »
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