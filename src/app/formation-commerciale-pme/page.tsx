import type { Metadata } from 'next';
import { Award, Target, Users, CheckCircle, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Formation Commerciale PME | Laurent Serre - Expert Développement Commercial',
  description: 'Formation commerciale PME sur-mesure. Laurent Serre développe les compétences de vos équipes avec des méthodes terrain éprouvées. Résultats garantis.',
  keywords: 'formation commerciale PME, formation vente PME, formation équipe commerciale, bootcamp commercial PME, développement commercial formation',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/formation-commerciale-pme',
  },
  openGraph: {
    title: 'Formation Commerciale PME | Laurent Serre - Expert Développement Commercial',
    description: 'Formation commerciale PME sur-mesure. Développez les compétences de vos équipes commerciales.',
    url: 'https://laurentserre.com/formation-commerciale-pme',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FormationCommercialePMEPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
              <Award className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-white">
                Formations Commerciales PME
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
              Formation Commerciale
              <span className="block text-mint-green">PME</span>
            </h1>
            
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
              conçoit des formations commerciales sur-mesure adaptées aux spécificités des PME. 
              <Link href="/formateur-vente-pme" className="text-mint-green hover:underline">Méthodes terrain éprouvées</Link> et 
              <Link href="/transformation-commerciale" className="text-mint-green hover:underline">résultats garantis</Link> 
              pour développer vos équipes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Formation Sur-Mesure
              </Link>
              <Link href="/bootcamp-commercial-intensif" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <BookOpen className="w-5 h-5 mr-2" />
                Bootcamp Intensif
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes Formation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Programmes de Formation Commerciale
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Des formations adaptées aux besoins spécifiques de votre équipe commerciale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/ressources/guide-prospection" className="group">
              <div className="bg-white rounded-xl p-6 border border-mint-green/20 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Formation Prospection
                </h3>
                <p className="text-gray-anthracite mb-4">
                  Maîtrisez les techniques modernes de prospection : téléphone, email, LinkedIn et réseaux sociaux.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Voir le programme <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            <Link href="/ressources/guide-closing" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Formation Techniques de Vente
                </h3>
                <p className="text-gray-anthracite mb-4">
                  Perfectionnez vos techniques de closing et optimisez chaque étape du processus de vente.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Voir le programme <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            <Link href="/ressources/techniques-de-negociation" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Formation Négociation
                </h3>
                <p className="text-gray-anthracite mb-4">
                  Développez vos compétences de négociation pour préserver vos marges et fidéliser vos clients.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Voir le programme <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Méthodes Formation */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-title font-bold text-blue-ink mb-8">
                Méthodes de Formation Terrain
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Formation Action</h3>
                    <p className="text-gray-anthracite">
                      80% de pratique, 20% de théorie. Vos commerciaux appliquent immédiatement 
                      les techniques sur leurs vrais prospects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Personnalisation</h3>
                    <p className="text-gray-anthracite">
                      Chaque formation est adaptée à votre secteur, vos enjeux et votre maturité commerciale.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Suivi Terrain</h3>
                    <p className="text-gray-anthracite">
                      Accompagnement post-formation pour ancrer les nouvelles pratiques et mesurer les résultats.
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
                  <div className="text-4xl font-bold text-mint-green mb-2">+30%</div>
                  <div className="text-gray-anthracite">Performance Équipe</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">90%</div>
                  <div className="text-gray-anthracite">Satisfaction Formation</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">+40%</div>
                  <div className="text-gray-anthracite">Taux de Closing</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">85%</div>
                  <div className="text-gray-anthracite">Ancrage à 6 Mois</div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-ink mb-3">Témoignage Formation</h4>
                <p className="text-gray-anthracite italic mb-3">
                  "Formation exceptionnelle ! Laurent adapte parfaitement sa pédagogie aux contraintes PME. 
                  Nos commerciaux ont immédiatement appliqué les techniques."
                </p>
                <div className="text-sm text-mint-green font-semibold">
                  DRH PME Services • 18 collaborateurs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Formation */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Formation Commerciale PME Expert
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Transformez les compétences de vos équipes avec 
            <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline"> Laurent Serre</Link>, 
            expert en formation commerciale PME.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Formation Sur-Mesure
            </Link>
            <Link href="/formateur-vente-pme" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Award className="w-5 h-5 mr-2" />
              Découvrir le Formateur
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}