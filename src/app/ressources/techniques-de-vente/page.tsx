import Link from 'next/link';

const techniques = [
  { slug: 'spin-selling', title: 'SPIN Selling' },
  { slug: 'bant-meddic', title: 'BANT / MEDDIC' },
  { slug: 'challenger-sale', title: 'CHALLENGER Sale' },
  { slug: 'soncas', title: 'SONCAS' },
  { slug: 'aida-cab-cap', title: 'AIDA / CAB / CAP' },
  { slug: 'neat-selling', title: 'NEAT Selling' },
  { slug: 'customercentric-selling', title: 'CustomerCentric Selling' },
  { slug: 'snap-selling', title: 'SNAP Selling' },
  { slug: 'sandler-selling', title: 'Sandler Selling' },
  { slug: 'methode-socratique', title: 'Méthode Socratique' },
  { slug: 'methode-lsd', title: 'Méthode LSD (Synthèse IA)' },
];

export default function TechniquesVente() {
  return (
    <main className="bg-primary-bg text-gray-dark min-h-screen">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-title font-bold text-blue-ink mb-8">
            Techniques de vente – Toutes les méthodes décryptées par Laurent Serre
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            SPIN, CHALLENGER, MEDDIC… autant de méthodes souvent citées, rarement comprises. Voici un décryptage clair, critique et applicable pour chaque technique.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {techniques.map((tech) => (
              <Link key={tech.slug} href={`/blog/${tech.slug}`} className="block bg-white/80 rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform border-2 border-mint-green/20 hover:border-mint-green/60 mb-4">
                <h2 className="text-xl font-title font-bold text-blue-ink mb-2">{tech.title}</h2>
                <p className="text-gray-600">Découvrir la méthode</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles liés */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">📖 Pour aller plus loin</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li><Link href="/blog/methodes-vente-comparees-spin-bant-bebedc" className="text-mint-green hover:underline font-medium">Méthodes de vente comparées : SPIN, BANT, BEBEDC</Link></li>
            <li><Link href="/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite" className="text-mint-green hover:underline font-medium">Gestion des objections commerciales</Link></li>
            <li><Link href="/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre" className="text-mint-green hover:underline font-medium">Vente consultative B2B</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
} 