import { bookCategories } from '@/data/books';
import Link from 'next/link';
import Head from 'next/head';

const book = bookCategories.find(cat => cat.slug === 'prospection-sdr')?.books.find(b => b.slug === 'sales-development-cracking-code');

export default function SalesDevelopmentCrackingCodePage() {
  if (!book) return <div>Livre non trouvé.</div>;

  return (
    <>
      <Head>
        <title>{book.title} : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content={`Résumé détaillé, points clés et avis sur ${book.title} de ${book.author}. Le guide moderne et actionnable du SDR outbound.`} />
      </Head>
      <main className="bg-gradient-to-br from-blue-ink via-mint-green/10 to-primary-bg min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-44 bg-gradient-to-br from-mint-green/30 to-blue-ink/10 rounded-lg flex items-center justify-center text-5xl shadow-lg mb-2">
              {/* Placeholder cover */}
              📞
            </div>
            <span className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm shadow-md backdrop-blur mb-2">Prospection & SDR</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">{book.title}</h1>
            <p className="text-lg text-mint-green font-semibold mb-1">{book.author} <span className="text-white/60 font-normal">— {book.year}</span></p>
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Le guide moderne et actionnable du SDR outbound.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 dark:bg-blue-ink/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-4">Résumé du livre</h2>
          <p>
            Sales Development: Cracking the Code of Outbound Sales est un guide moderne 100% focalisé sur le rôle de SDR et les meilleures techniques d’outbound. Cory Bray & Hilmon Sorey couvrent tout le processus SDR : séquences multicanal, qualification, collaboration avec les AE, conseils de carrière. Un manuel opérationnel pour professionnaliser la prospection outbound et progresser en équipe.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Chapitres clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Structurer sa séquence d’approche par email et téléphone</li>
            <li>Bien qualifier les besoins du prospect</li>
            <li>Collaborer efficacement avec les Account Executives</li>
            <li>Maîtriser l’outreach multicanal et la gestion du pipe</li>
            <li>Conseils de carrière pour SDR ambitieux</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Professionnaliser chaque étape du process outbound</li>
            <li>Travailler en synergie avec les AE pour optimiser le cycle de vente</li>
            <li>Développer ses compétences clés (outreach, discovery, pipe management)</li>
            <li>Ne pas négliger l’importance du mentorat et de la progression de carrière</li>
            <li>Être proactif dans la collaboration interservices</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink dark:text-mint-green mb-6">
            « Un SDR pro, c’est celui qui maîtrise le process, la collaboration et la progression continue. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink dark:text-mint-green mb-2">Découvrez le Bootcamp Vente by LSD</h4>
          <p className="text-lg text-gray-700 dark:text-gray-100 mb-4">Formez-vous avec les meilleures méthodes issues de ce livre, adaptées à la réalité du terrain B2B.</p>
          <Link href="/bootcamp" className="inline-block bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-full shadow hover:bg-mint-green/80 transition">Voir le Bootcamp</Link>
        </div>

        {/* Navigation retour */}
        <div className="max-w-3xl mx-auto text-center mt-8">
          <Link href="/ressources/meilleurs-livres/prospection-sdr" className="text-mint-green underline hover:text-mint-green/80 text-lg">← Retour à la catégorie Prospection & SDR</Link>
        </div>
      </main>
    </>
  );
} 