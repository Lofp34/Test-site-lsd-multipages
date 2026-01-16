import Link from 'next/link';
import Head from 'next/head';

export default function ChallengerCustomerPage() {
  return (
    <>
      <Head>
        <title>The Challenger Customer : résumé complet | Gestion des comptes entreprises | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de The Challenger Customer (Brent Adamson et al.). Le guide pour vendre à un comité d'achat complexe et mobiliser les bons alliés internes." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Gestion des comptes entreprises</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">The Challenger Customer</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Brent Adamson et al. <span className="text-white/60 font-normal">— 2015</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Vendre efficacement à un comité d’achat complexe en entreprise.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            Suite du Challenger Sale, ce livre se focalise sur l’autre côté de la table : comment vendre efficacement à un comité d’achat complexe. Les auteurs démystifient le processus d’achat en entreprise moderne, qu’ils décrivent comme dysfonctionnel par défaut : en moyenne 5,4 personnes (parfois plus) participent à la décision, chacune avec ses priorités, ce qui conduit souvent à l’immobilisme ou au choix par défaut (le moins risqué).
          </p>
          <p>
            La clé est d’identifier et de mobiliser au sein du client un « Challenger Customer », c’est-à-dire un allié qui, en interne, va challenger le statu quo et évangéliser le changement. Les auteurs appellent ces personnes les Mobilizers (les mobilisateurs) – par opposition aux Talkers (bavards qui ne font rien avancer) et aux Blockers (ceux qui s’opposent).
          </p>
          <p>
            The Challenger Customer conseille de concentrer ses efforts sur ces alliés mobilisateurs, quitte à ignorer les autres interlocuteurs moins influents. Le livre fournit des stratégies pour équiper ces alliés (en insights et arguments chocs) et en faire des relais capables de construire le consensus interne autour de votre solution. C’est un guide précieux pour naviguer les méandres politiques d’un grand compte et remporter l’adhésion collective nécessaire à la signature.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Concepts clés / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Identifier les Mobilizers (alliés du changement) chez le client</li>
            <li>Équiper ces alliés avec des insights et arguments différenciants</li>
            <li>Construire le consensus interne plutôt que de convaincre chaque individu isolément</li>
            <li>Ignorer les Talkers et Blockers pour se concentrer sur les vrais moteurs du changement</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « Pour vendre à un grand compte, il ne suffit pas de convaincre un décideur : il faut mobiliser un allié interne capable de porter le changement et de construire le consensus. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink mb-2">Découvrez le Bootcamp Grands Comptes by LSD</h4>
          <p className="text-lg text-gray-700 mb-4">Formez-vous avec les meilleures méthodes issues de ce livre, adaptées à la gestion des comptes stratégiques et grands comptes.</p>
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