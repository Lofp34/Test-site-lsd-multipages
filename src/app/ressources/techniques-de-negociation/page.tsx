import Link from 'next/link';

const techniques = [
  { slug: 'ne-jamais-couper-la-poire-en-deux', title: 'Ne jamais couper la poire en deux', auteur: 'Chris Voss (FBI)', remarque: 'Ancrage fort, refus de compromis' },
  { slug: 'effet-miroir', title: 'L’effet miroir', auteur: 'Chris Voss', remarque: 'Technique d’empathie active' },
  { slug: 'negociation-raisonnee', title: 'La négociation raisonnée', auteur: 'Fisher & Ury (Harvard)', remarque: 'Gagnant-gagnant, BATNA' },
  { slug: 'silence-strategique', title: 'Le silence stratégique', auteur: 'Approche terrain', remarque: 'Utilisé pour créer la tension' },
  { slug: 'pire-scenario', title: 'La technique du “pire scénario”', auteur: 'Méthode socratique', remarque: 'Anticiper les objections' },
  { slug: 'reformuler-gagner', title: 'La stratégie du “je reformule donc je gagne”', auteur: 'Vente active', remarque: 'Ancrage + perception d’écoute' },
  { slug: 'reciprocite', title: 'Principe de réciprocité', auteur: 'Cialdini', remarque: 'Redonner l’initiative à l’autre' },
  { slug: 'dissociation-emotionnelle', title: 'Négociation en mode dissociation émotionnelle', auteur: 'Intelligence émotionnelle', remarque: 'Pour désamorcer les tensions' },
];

export default function TechniquesNegociation() {
  return (
    <main className="bg-primary-bg text-gray-dark min-h-screen">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-title font-bold text-blue-ink mb-8">
            Techniques de négociation – Ce que le FBI, les psy et les commerciaux ont en commun
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            Négocier, ce n’est pas convaincre. C’est influencer le cadre. Voici les techniques les plus efficaces, du FBI aux salles de réunion, analysées et contextualisées pour le business B2B.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {techniques.map((tech) => (
              <Link key={tech.slug} href={`/blog/${tech.slug}`} className="block bg-white/80 rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform border-2 border-blue-ink/20 hover:border-blue-ink/60 mb-4">
                <h2 className="text-xl font-title font-bold text-blue-ink mb-2">{tech.title}</h2>
                <p className="text-gray-600 mb-1">{tech.auteur}</p>
                <p className="text-gray-500 text-sm">{tech.remarque}</p>
                <p className="text-mint-green font-semibold mt-2">Découvrir la technique</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 