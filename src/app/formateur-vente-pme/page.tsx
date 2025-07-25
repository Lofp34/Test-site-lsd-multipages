import type { Metadata } from 'next';
import { Award, Target, Users, CheckCircle, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Formateur Vente PME | Laurent Serre - Expert Formation Commerciale',
  description: 'Formateur vente PME expert. Laurent Serre forme vos équipes commerciales avec des méthodes terrain éprouvées. Formations sur-mesure et résultats garantis.',
  keywords: 'formateur vente PME, formation commerciale PME, formateur commercial entreprise, expert formation vente, développement commercial formation',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/formateur-vente-pme',
  },
  openGraph: {
    title: 'Formateur Vente PME | Laurent Serre - Expert Formation Commerciale',
    description: 'Formateur vente PME expert. Formations commerciales sur-mesure pour développer vos équipes.',
    url: 'https://laurentserre.com/formateur-vente-pme',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FormateurVentePMEPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
              <Award className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-white">
                Formateur Vente PME Expert
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
              Formateur Vente
              <span className="block text-mint-green">PME</span>
            </h1>
            
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
              forme vos équipes commerciales avec des méthodes terrain éprouvées. 
              <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline">Formations sur-mesure</Link> et 
              <Link href="/transformation-commerciale" className="text-mint-green hover:underline">accompagnement personnalisé</Link> 
              pour des résultats durables.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Formation Sur-Mesure
              </Link>
              <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Échanger avec le Formateur
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Approche Formation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Approche Formation Terrain
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Des formations concrètes, actionnables et adaptées aux spécificités des PME
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Méthodes Pédagogiques Innovantes
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-mint-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-ink mb-2">Formation Action</h4>
                    <p className="text-gray-anthracite">
                      80% de pratique, 20% de théorie. Vos commerciaux appliquent immédiatement 
                      ce qu'ils apprennent sur leurs vrais prospects et clients.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-mint-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-ink mb-2">Personnalisation Totale</h4>
                    <p className="text-gray-anthracite">
                      Chaque formation est adaptée à votre secteur, vos enjeux et votre maturité commerciale. 
                      Pas de formation générique.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-mint-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-ink mb-2">Suivi Post-Formation</h4>
                    <p className="text-gray-anthracite">
                      Accompagnement terrain pour garantir l'ancrage des nouvelles pratiques 
                      et mesurer les résultats obtenus.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Résultats Formation Moyens
              </h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">+35%</div>
                  <div className="text-gray-anthracite">Performance Individuelle</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">+150%</div>
                  <div className="text-gray-anthracite">Confiance en Soi</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">85%</div>
                  <div className="text-gray-anthracite">Ancrage à 6 Mois</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">+25%</div>
                  <div className="text-gray-anthracite">CA Équipe</div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-ink mb-3">Témoignage Formation</h4>
                <p className="text-gray-anthracite italic mb-3">
                  "Laurent a formé notre équipe de 8 commerciaux. Sa méthode terrain et ses exercices 
                  pratiques ont transformé nos résultats. Du concret, pas de blabla !"
                </p>
                <div className="text-sm text-mint-green font-semibold">
                  Directeur Commercial PME • 45 collaborateurs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes Formation */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Programmes de Formation Vente
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Des modules adaptés aux besoins spécifiques de votre équipe commerciale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Formation Prospection Efficace
              </h3>
              <p className="text-gray-anthracite mb-4">
                <Link href="/ressources/guide-prospection" className="text-mint-green hover:underline">Maîtrisez la prospection moderne</Link> : 
                techniques multi-canaux, scripts performants et organisation optimale.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Prospection téléphonique efficace</li>
                <li>• LinkedIn et réseaux sociaux</li>
                <li>• Email marketing ciblé</li>
                <li>• Qualification des prospects</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Formation Techniques de Vente
              </h3>
              <p className="text-gray-anthracite mb-4">
                <Link href="/ressources/guide-closing" className="text-mint-green hover:underline">Perfectionnez vos techniques de closing</Link> 
                et optimisez chaque étape du processus de vente.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Découverte besoins approfondie</li>
                <li>• Présentation solution adaptée</li>
                <li>• Traitement objections</li>
                <li>• Techniques de closing</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Formation Négociation Commerciale
              </h3>
              <p className="text-gray-anthracite mb-4">
                <Link href="/ressources/techniques-de-negociation" className="text-mint-green hover:underline">Développez vos compétences de négociation</Link> 
                pour préserver vos marges et fidéliser vos clients.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Préparation négociation</li>
                <li>• Stratégies win-win</li>
                <li>• Gestion de la pression</li>
                <li>• Conclusion accord</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Formation */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Formateur Vente PME Reconnu
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Faites confiance à <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre</Link>, 
            formateur vente PME avec 20 ans d'expérience terrain pour développer les compétences de vos équipes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Formation Sur-Mesure
            </Link>
            <Link href="/formation-commerciale-pme" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Award className="w-5 h-5 mr-2" />
              Voir Nos Formations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}