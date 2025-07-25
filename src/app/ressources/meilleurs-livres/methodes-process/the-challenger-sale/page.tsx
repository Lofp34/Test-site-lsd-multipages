import Link from 'next/link';
import Head from 'next/head';

export default function ChallengerSalePage() {
  return (
    <>
      <Head>
        <title>The Challenger Sale : résumé complet | Méthodes & Processus de vente | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de The Challenger Sale (Dixon & Adamson). Le livre de référence pour la vente complexe et la négociation B2B." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Méthodes & Process</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">The Challenger Sale</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Matthew Dixon & Brent Adamson <span className="text-white/60 font-normal">— 2011</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Vendre en leader d’opinion, bousculer le statu quo.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            Basé sur une vaste étude, The Challenger Sale a bousculé le monde de la vente en identifiant le profil du Challenger comme le plus performant. Le vendeur Challenger éduque le client, personnalise son approche et contrôle la vente. Il ose remettre en question la vision du client, apporte des idées nouvelles et sait gérer des ventes complexes à multiples décideurs.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Le modèle Challenger</h3>
          <ul className="list-disc ml-6 mb-6">
            <li><b>Teach</b> : Apporter un insight inédit au client, l’éduquer sur son business.</li>
            <li><b>Tailor</b> : Personnaliser l’approche selon les interlocuteurs.</li>
            <li><b>Take Control</b> : Contrôler la vente, aborder les sujets difficiles, maintenir une tension constructive.</li>
          </ul>
          <p>Le Challenger ose bousculer les croyances du client pour lui faire prendre conscience d’un problème latent et de la valeur de la solution.</p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Ne pas hésiter à challenger la vision du client, même si cela crée une tension constructive.</li>
            <li>Adapter son argumentaire aux préoccupations spécifiques de chaque décideur.</li>
            <li>Apporter des insights nouveaux pour se différencier et créer de la valeur.</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « Les vendeurs Challenger ne se contentent pas de répondre à la demande, ils la redéfinissent. »
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