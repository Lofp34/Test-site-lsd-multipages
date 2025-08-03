import type { Metadata } from 'next';
import ClientPageWrapper from '@/components/ClientPageWrapper';

export const metadata: Metadata = {
  title: 'Laurent Serre Développement - Expert Commercial & Formation',
  description: 'Accompagnement commercial pour PME : structuration des équipes, formation à la vente, méthodes éprouvées. 20 ans d\'expérience terrain + outils IA.',
  alternates: {
    canonical: 'https://laurentserre.com',
  },
  other: {
    // Indiquer que le chat est un élément interactif non-critique pour le SEO
    'chat-widget': 'interactive-enhancement',
  },
};

export default function Home() {
  return (
    <ClientPageWrapper 
      enableChat={true}
      chatConfig={{
        position: 'bottom-right',
        theme: 'auto',
        initialMessage: 'Bonjour ! Je suis l\'assistant de Laurent Serre. Comment puis-je vous aider avec votre développement commercial ?'
      }}
    >
      {/* Contenu principal de la page d'accueil */}
      <main className="min-h-screen bg-primary-bg">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-ink via-primary-bg to-mint-green/10 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-primary-title mb-6">
                Expert en Développement Commercial
                <span className="block text-mint-green">pour PME</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-secondary mb-8 max-w-3xl mx-auto">
                20 ans d'expérience terrain pour structurer vos équipes commerciales 
                et booster vos performances de vente
              </p>
              
              {/* CTA Principal */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-mint-green hover:bg-mint-green/90 text-blue-ink font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Découvrir mes formations
                </button>
                <button className="border-2 border-mint-green text-mint-green hover:bg-mint-green hover:text-blue-ink font-semibold px-8 py-4 rounded-xl transition-all duration-300">
                  Diagnostic gratuit
                </button>
              </div>
            </div>
          </div>
          
          {/* Indicateur de chat disponible */}
          <div className="absolute bottom-8 right-8 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <p className="text-sm text-white/80 flex items-center gap-2">
                <span className="w-2 h-2 bg-mint-green rounded-full animate-pulse"></span>
                Chat expert disponible
              </p>
            </div>
          </div>
        </section>

        {/* Section Expertise */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-ink mb-4">
                Mon Expertise à Votre Service
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Une approche pragmatique basée sur 20 ans d'expérience terrain 
                avec plus de 200 PME accompagnées
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Expertise 1 */}
              <div className="bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-mint-green rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-ink mb-3">
                  Prospection & Lead Generation
                </h3>
                <p className="text-gray-600 mb-4">
                  Méthodes éprouvées pour générer un flux constant de prospects qualifiés 
                  et optimiser votre taux de conversion.
                </p>
                <div className="text-sm text-mint-green font-medium">
                  +150% de leads en moyenne
                </div>
              </div>

              {/* Expertise 2 */}
              <div className="bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-mint-green rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-ink mb-3">
                  Négociation & Closing
                </h3>
                <p className="text-gray-600 mb-4">
                  Techniques avancées de négociation et de conclusion pour 
                  maximiser votre taux de transformation.
                </p>
                <div className="text-sm text-mint-green font-medium">
                  +80% de taux de closing
                </div>
              </div>

              {/* Expertise 3 */}
              <div className="bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-mint-green rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-ink mb-3">
                  Management Commercial
                </h3>
                <p className="text-gray-600 mb-4">
                  Structuration et animation d'équipes commerciales performantes 
                  avec des outils de pilotage adaptés.
                </p>
                <div className="text-sm text-mint-green font-medium">
                  +200% de performance équipe
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA Chat */}
        <section className="py-12 bg-gradient-to-r from-blue-ink to-mint-green">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Une Question ? Parlons-en Directement !
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Mon assistant IA est disponible 24/7 pour répondre à vos questions 
              sur le développement commercial et vous orienter vers les meilleures solutions.
            </p>
            <div className="flex items-center justify-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-sm">Réponses instantanées</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-sm">Conseils personnalisés</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-sm">Expertise 20 ans</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Témoignages */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-ink mb-4">
                Ils Me Font Confiance
              </h2>
              <p className="text-lg text-gray-600">
                Plus de 200 PME accompagnées avec des résultats mesurables
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Témoignage 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-mint-green rounded-full flex items-center justify-center">
                    <span className="text-blue-ink font-bold">JD</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-blue-ink">Jean Dupont</h4>
                    <p className="text-sm text-gray-600">CEO, TechStart PME</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Grâce à Laurent, nous avons doublé notre chiffre d'affaires en 18 mois. 
                  Son approche pragmatique et ses outils concrets font la différence."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>

              {/* Témoignage 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-mint-green rounded-full flex items-center justify-center">
                    <span className="text-blue-ink font-bold">SM</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-blue-ink">Sophie Martin</h4>
                    <p className="text-sm text-gray-600">Directrice Commerciale</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "La formation de Laurent a transformé notre équipe commerciale. 
                  Nos commerciaux sont plus confiants et plus efficaces."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>

              {/* Témoignage 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-mint-green rounded-full flex items-center justify-center">
                    <span className="text-blue-ink font-bold">PL</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-blue-ink">Pierre Leroy</h4>
                    <p className="text-sm text-gray-600">Fondateur, InnovPME</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "L'accompagnement de Laurent nous a permis de structurer notre 
                  approche commerciale et d'atteindre nos objectifs plus rapidement."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 bg-blue-ink">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à Booster Vos Performances Commerciales ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Commencez par une conversation avec mon assistant IA ou 
              réservez directement un diagnostic gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-mint-green hover:bg-mint-green/90 text-blue-ink font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                Diagnostic Gratuit
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-ink font-semibold px-8 py-4 rounded-xl transition-all duration-300">
                Voir les Formations
              </button>
            </div>
          </div>
        </section>
      </main>
    </ClientPageWrapper>
  );
}