import Link from 'next/link';
import Head from 'next/head';

export default function KeyAccountManagementDefinitiveGuidePage() {
  return (
    <>
      <Head>
        <title>Key Account Management: The Definitive Guide : résumé complet | Gestion des comptes entreprises | LSD</title>
        <meta name="description" content="Résumé détaillé, concepts clés, conseils terrain et citation de Key Account Management: The Definitive Guide (Woodburn & McDonald). Le guide avancé pour structurer un programme KAM performant et mondialement cohérent." />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Gestion des comptes entreprises</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Key Account Management: The Definitive Guide</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">Diana Woodburn & Malcolm McDonald <span className="text-white/60 font-normal">— 2019</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Le guide avancé pour structurer un programme KAM performant et mondialement cohérent.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            Cette référence académique offre un panorama complet des meilleures pratiques en gestion des comptes stratégiques. Bien qu’un peu ardue pour les débutants (plutôt destinée aux grandes entreprises matures), elle fournit des outils structurés pour segmenter ses clients clés, bâtir des plans d’action par compte, développer les relations multi-niveaux et mesurer la profitabilité des comptes.
          </p>
          <p>
            Woodburn et McDonald, experts du sujet, définissent notamment comment identifier un « compte clé » (KAM) – typiquement via une matrice attrait du compte / position concurrentielle – et comment formaliser un plan de compte détaillé : objectifs du client, plan de création de valeur, plan de contacts du compte, etc. Ils insistent aussi sur les compétences du Key Account Manager (communication, influence interne, compréhension du business client, leadership transversal) et sur l’importance d’une culture d’entreprise orientée client pour réussir le KAM.
          </p>
          <p>
            Cet ouvrage puise dans des recherches de l’université de Cranfield et sert de guide avancé pour structurer un programme KAM performant et mondialement cohérent. En somme, The Definitive Guide porte bien son nom : un manuel exhaustif pour passer d’une gestion opportuniste des grands comptes à une démarche stratégique et collaborative.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Concepts clés / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Segmenter ses clients clés avec des outils structurés (matrice attrait/position)</li>
            <li>Bâtir des plans d’action détaillés et personnalisés par compte</li>
            <li>Développer des relations multi-niveaux et mesurer la profitabilité</li>
            <li>Maîtriser les compétences clés du KAM : communication, influence, compréhension du business client, leadership transversal</li>
            <li>Instaurer une culture d’entreprise orientée client pour réussir le KAM</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « Passer d’une gestion opportuniste des grands comptes à une démarche stratégique et collaborative, c’est tout l’enjeu du Key Account Management moderne. »
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