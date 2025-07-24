import { bookCategories } from '@/data/books';
import Link from 'next/link';
import Head from 'next/head';

const book = bookCategories.find(cat => cat.slug === 'prospection-sdr')?.books.find(b => b.slug === 'predictable-revenue');

export default function PredictableRevenuePage() {
  if (!book) return <div>Livre non trouvé.</div>;

  return (
    <>
      <Head>
        <title>{book.title} : résumé complet | Meilleurs livres | LSD</title>
        <meta name="description" content={`Résumé détaillé, points clés et avis sur ${book.title} de ${book.author}. Découvrez la méthode SaaS pour générer un flux de leads prévisible.`} />
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
            <p className="text-base text-white/80 italic mb-4 max-w-xl mx-auto">Le modèle SaaS pour générer un flux de leads prévisible.</p>
          </div>
        </section>

        {/* Résumé détaillé */}
        <article className="prose prose-lg max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-12 border border-mint-green/20">
          <h2 className="text-2xl font-bold text-blue-ink mb-4">Résumé du livre</h2>
          <p>
            Predictable Revenue est la « bible » de la prospection SaaS. Aaron Ross et Marylou Tyler y introduisent la spécialisation des rôles commerciaux (SDR, closer, farmer), le Cold Calling 2.0, et la segmentation Seeds/Nets/Spears. Le livre propose un processus outbound reproductible pour générer un flux de leads prévisible et assurer une croissance régulière. Il formalise la stratégie d’emails ciblés, la mesure des métriques clés, et la structuration d’une équipe performante.
          </p>

          <h3 className="mt-8 text-xl font-bold text-mint-green">Chapitres clés</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>La spécialisation des rôles : SDR, Closer, Farmer</li>
            <li>Le Cold Calling 2.0 : emails ciblés vs appels à froid classiques</li>
            <li>La segmentation Seeds, Nets & Spears</li>
            <li>Structurer un processus outbound reproductible</li>
            <li>Définir et suivre les bons KPIs pour piloter la croissance</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold text-mint-green">À retenir / Conseils terrain</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Spécialiser les rôles pour maximiser l’efficacité de chaque commercial</li>
            <li>Privilégier les emails ciblés pour la prise de rendez-vous</li>
            <li>Adapter ses efforts selon le type de lead (Seed, Net, Spear)</li>
            <li>Mettre en place un process outbound mesurable et scalable</li>
            <li>Suivre ses métriques pour ajuster et améliorer en continu</li>
          </ul>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-blue-ink mb-6">
            « La croissance prévisible repose sur un process reproductible, des rôles clairs et des métriques suivies avec rigueur. »
          </blockquote>
        </article>

        {/* CTA Bootcamp */}
        <div className="max-w-2xl mx-auto text-center mt-8 mb-12">
          <div className="inline-block bg-mint-green/20 text-mint-green font-semibold rounded-full px-4 py-1 text-sm mb-2 shadow-md backdrop-blur">Passez du livre au terrain</div>
          <h4 className="text-2xl font-bold text-blue-ink mb-2">Découvrez le Bootcamp Vente by LSD</h4>
          <p className="text-lg text-gray-700 mb-4">Formez-vous avec les meilleures méthodes issues de ce livre, adaptées à la réalité du terrain B2B.</p>
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