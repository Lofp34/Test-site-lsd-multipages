import Link from 'next/link';
import { allTechniquesData } from '@/data/techniques';

// Techniques avec pages dédiées complètes
const dedicatedTechniques = [
  { 
    slug: 'ne-jamais-couper-la-poire-en-deux', 
    title: 'Ne jamais couper la poire en deux', 
    author: 'Chris Voss (FBI)', 
    description: 'Ancrage fort, refus de compromis',
    popularity: 95,
    type: 'dedicated',
    metrics: { views: '12.5K', engagement: '89%', conversion: '23%' },
    icon: '🚫'
  },
  { 
    slug: 'effet-miroir', 
    title: 'L\'effet miroir', 
    author: 'Chris Voss', 
    description: 'Technique d\'empathie tactique pour faire parler',
    popularity: 92,
    type: 'dedicated',
    metrics: { views: '8.2K', engagement: '85%', conversion: '19%' },
    icon: '🪞'
  },
  { 
    slug: 'silence-strategique', 
    title: 'Le silence stratégique', 
    author: 'Approche terrain', 
    description: 'Utiliser le silence pour créer la tension',
    popularity: 88,
    type: 'dedicated',
    metrics: { views: '6.8K', engagement: '82%', conversion: '21%' },
    icon: '🤫'
  },
  { 
    slug: 'negociation-raisonnee', 
    title: 'La négociation raisonnée', 
    author: 'Fisher & Ury (Harvard)', 
    description: 'Approche gagnant-gagnant avec BATNA',
    popularity: 90,
    type: 'dedicated',
    metrics: { views: '7.1K', engagement: '87%', conversion: '25%' },
    icon: '⚖️'
  },
  { 
    slug: 'ancrage-tactique', 
    title: 'L\'ancrage tactique', 
    author: 'Kahneman', 
    description: 'Influence cognitive et biais de décision',
    popularity: 86,
    type: 'dedicated',
    metrics: { views: '5.9K', engagement: '79%', conversion: '18%' },
    icon: '⚓'
  },
  { 
    slug: 'oui-progressif', 
    title: 'La technique du "Oui" progressif', 
    author: 'Cialdini', 
    description: 'Engagement et cohérence comportementale',
    popularity: 84,
    type: 'dedicated',
    metrics: { views: '5.2K', engagement: '76%', conversion: '20%' },
    icon: '✅'
  },
  { 
    slug: 'recadrage-valeur', 
    title: 'Le recadrage de valeur', 
    author: 'Approche consultative', 
    description: 'Transformer les objections en opportunités',
    popularity: 82,
    type: 'dedicated',
    metrics: { views: '4.8K', engagement: '74%', conversion: '17%' },
    icon: '🔄'
  },
  { 
    slug: 'concession-calculee', 
    title: 'La concession calculée', 
    author: 'Négociation stratégique', 
    description: 'Échange de valeur stratégique et planifié',
    popularity: 80,
    type: 'dedicated',
    metrics: { views: '4.3K', engagement: '72%', conversion: '16%' },
    icon: '🎯'
  }
];

// Techniques avec articles blog uniquement
const blogTechniques = [
  { slug: 'pire-scenario', title: 'La technique du "pire scénario"', author: 'Méthode socratique', description: 'Anticiper les objections', type: 'blog', icon: '⚠️' },
  { slug: 'reformuler-gagner', title: 'La stratégie du "je reformule donc je gagne"', author: 'Vente active', description: 'Ancrage + perception d\'écoute', type: 'blog', icon: '🔄' },
  { slug: 'reciprocite', title: 'Principe de réciprocité', author: 'Cialdini', description: 'Redonner l\'initiative à l\'autre', type: 'blog', icon: '🤝' },
  { slug: 'dissociation-emotionnelle', title: 'Négociation en mode dissociation émotionnelle', author: 'Intelligence émotionnelle', description: 'Pour désamorcer les tensions', type: 'blog', icon: '🧘' },
];

// Trier les techniques dédiées par popularité
const sortedDedicatedTechniques = dedicatedTechniques.sort((a, b) => b.popularity - a.popularity);

export default function TechniquesNegociation() {
  return (
    <main className="bg-primary-bg text-gray-dark min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-title font-bold text-blue-ink mb-8">
              Techniques de négociation – Ce que le FBI, les psy et les commerciaux ont en commun
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              Négocier, ce n'est pas convaincre. C'est influencer le cadre. Voici les techniques les plus efficaces, 
              du FBI aux salles de réunion, analysées et contextualisées pour le business B2B.
            </p>
            
            {/* Stats globales */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-mint-green">8</div>
                <div className="text-sm text-gray-600">Guides complets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-mint-green">47K+</div>
                <div className="text-sm text-gray-600">Vues totales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-mint-green">83%</div>
                <div className="text-sm text-gray-600">Engagement moyen</div>
              </div>
            </div>
          </div>

          {/* Techniques avec pages dédiées */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-title font-bold text-blue-ink">
                Guides Complets & Interactifs
              </h2>
              <span className="bg-mint-green/20 text-mint-green px-3 py-1 rounded-full text-sm font-semibold">
                🎯 Pages dédiées
              </span>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedDedicatedTechniques.map((tech, index) => (
                <Link 
                  key={tech.slug} 
                  href={`/ressources/techniques-de-negociation/${tech.slug}`}
                  className="group block bg-white/90 rounded-2xl shadow-lg p-6 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-mint-green/60 relative overflow-hidden"
                >
                  {/* Badge popularité */}
                  {index < 3 && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {index === 0 ? '🔥 TOP' : index === 1 ? '⭐ HOT' : '📈 TREND'}
                      </span>
                    </div>
                  )}
                  
                  {/* Icône technique */}
                  <div className="text-4xl mb-4">{tech.icon}</div>
                  
                  <h3 className="text-xl font-title font-bold text-blue-ink mb-2 group-hover:text-mint-green transition-colors">
                    {tech.title}
                  </h3>
                  <p className="text-gray-600 mb-2 font-semibold">{tech.author}</p>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tech.description}</p>
                  
                  {/* Métriques */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div className="text-center bg-gray-50 rounded p-2">
                      <div className="font-bold text-blue-ink">{tech.metrics.views}</div>
                      <div className="text-gray-500">Vues</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded p-2">
                      <div className="font-bold text-mint-green">{tech.metrics.engagement}</div>
                      <div className="text-gray-500">Engagement</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded p-2">
                      <div className="font-bold text-orange-500">{tech.metrics.conversion}</div>
                      <div className="text-gray-500">Conversion</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-mint-green font-semibold text-sm group-hover:text-blue-ink transition-colors">
                      Guide complet →
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="inline-block bg-mint-green/20 text-mint-green text-xs font-semibold rounded-full px-2 py-1">
                        🎯 Interactif
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Techniques blog */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-title font-bold text-blue-ink">
                Articles & Techniques Complémentaires
              </h2>
              <span className="bg-blue-ink/20 text-blue-ink px-3 py-1 rounded-full text-sm font-semibold">
                📝 Articles blog
              </span>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {blogTechniques.map((tech) => (
                <Link 
                  key={tech.slug} 
                  href={`/blog/${tech.slug}`}
                  className="block bg-white/70 rounded-xl shadow-md p-6 hover:scale-102 transition-all duration-200 border border-gray-200 hover:border-blue-ink/40"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{tech.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-title font-bold text-blue-ink mb-1">{tech.title}</h3>
                      <p className="text-gray-600 mb-1 text-sm">{tech.author}</p>
                      <p className="text-gray-500 text-sm mb-3">{tech.description}</p>
                      <span className="text-blue-ink font-semibold text-sm hover:text-mint-green transition-colors">
                        Lire l'article →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Section recommandations personnalisées */}
          <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-2xl p-8 mb-16">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                🎯 Recommandations Personnalisées
              </h3>
              <p className="text-gray-700 mb-6">
                Basées sur votre profil et vos défis commerciaux actuels
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/80 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h4 className="font-bold text-blue-ink mb-2">Débutant</h4>
                <p className="text-sm text-gray-600 mb-3">Commencez par les bases</p>
                <Link href="/ressources/techniques-de-negociation/effet-miroir" className="text-mint-green font-semibold text-sm hover:underline">
                  L'effet miroir →
                </Link>
              </div>
              
              <div className="bg-white/80 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-bold text-blue-ink mb-2">Intermédiaire</h4>
                <p className="text-sm text-gray-600 mb-3">Techniques avancées</p>
                <Link href="/ressources/techniques-de-negociation/negociation-raisonnee" className="text-mint-green font-semibold text-sm hover:underline">
                  Négociation raisonnée →
                </Link>
              </div>
              
              <div className="bg-white/80 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-bold text-blue-ink mb-2">Expert</h4>
                <p className="text-sm text-gray-600 mb-3">Maîtrise complète</p>
                <Link href="/ressources/techniques-de-negociation/ne-jamais-couper-la-poire-en-deux" className="text-mint-green font-semibold text-sm hover:underline">
                  Ancrage absolu →
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-blue-ink rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-title font-bold mb-4">
              Prêt à transformer vos négociations ?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Découvrez comment appliquer ces techniques dans votre contexte PME avec un accompagnement personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-mint-green text-blue-ink px-6 py-3 rounded-lg font-semibold hover:bg-mint-green/90 transition-colors"
              >
                Diagnostic gratuit
              </Link>
              <Link 
                href="/bootcamp-commercial-intensif" 
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-ink transition-colors"
              >
                Formation intensive
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}