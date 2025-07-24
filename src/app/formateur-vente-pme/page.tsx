import type { Metadata } from 'next';
import { Users, Target, Award, CheckCircle, ArrowRight, BookOpen, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Formateur Vente PME | Laurent Serre - Formations Commerciales Expertes',
  description: 'Formateur vente spécialisé PME. Laurent Serre conçoit des formations commerciales sur-mesure adaptées aux spécificités des PME. Résultats terrain garantis.',
  keywords: 'formateur vente PME, formation commerciale PME, formateur commercial PME, formation vente sur mesure, bootcamp commercial PME',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/formateur-vente-pme',
  },
  openGraph: {
    title: 'Formateur Vente PME | Laurent Serre - Formations Commerciales Expertes',
    description: 'Formateur vente spécialisé PME. Formations commerciales sur-mesure adaptées aux spécificités des PME.',
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
    <main className="flex flex-col min-h-screen bg-white
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
              conçoit des <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline">formations commerciales sur-mesure</Link> 
              adaptées aux spécificités des PME. De la prospection au closing, 
              des méthodes terrain éprouvées pour transformer vos équipes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Diagnostic Formation Gratuit
              </Link>
              <Link href="/bootcamp-commercial-intensif" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Zap className="w-5 h-5 mr-2" />
                Bootcamp Intensif
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spécificités PME */}
      <section className="py-20 bg-white
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Formations Adaptées aux Spécificités PME
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Des programmes conçus pour répondre aux défis uniques des PME : contraintes budget, 
              équipes réduites, besoins de résultats rapides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-mint-green/20">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-mint-green" />
              </div>
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Contraintes PME Intégrées
              </h3>
              <ul className="text-sm text-gray-anthracite space-y-2">
                <li>• Formations courtes et intensives</li>
                <li>• Budgets formation optimisés</li>
                <li>• Planning adapté à l'activité</li>
                <li>• ROI immédiat sur investissement</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-mint-green" />
              </div>
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Équipes Pluridisciplinaires
              </h3>
              <ul className="text-sm text-gray-anthracite space-y-2">
                <li>• Dirigeants multi-casquettes</li>
                <li>• Commerciaux polyvalents</li>
                <li>• Équipes mixtes terrain/sédentaire</li>
                <li>• Niveaux d'expérience variés</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-mint-green" />
              </div>
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Besoins Spécifiques PME
              </h3>
              <ul className="text-sm text-gray-anthracite space-y-2">
                <li>• Croissance rapide et durable</li>
                <li>• Autonomie opérationnelle</li>
                <li>• Outils simples et efficaces</li>
                <li>• Méthodes applicables immédiatement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Méthodes de Formation */}
      <section className="py-20 bg-slate-50
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Méthodes de Formation Éprouvées
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Une pédagogie active basée sur la pratique et l'expérience terrain
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Approche Pédagogique
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>70% Pratique - 30% Théorie :</strong> Jeux de rôles, cas réels, mises en situation immersives
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Personnalisation :</strong> Adaptation aux secteurs d'activité et problématiques spécifiques
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Outils concrets :</strong> Remise de <Link href="/ressources/guide-prospection" className="text-mint-green hover:underline">guides pratiques</Link> et d'<Link href="/ressources/outil-preparation-rdv" className="text-mint-green hover:underline">outils opérationnels</Link>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Suivi post-formation :</strong> Accompagnement pour ancrer les nouvelles pratiques
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Formats Disponibles
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-ink mb-2">
                    <Link href="/bootcamp-commercial-intensif" className="text-mint-green hover:underline">Bootcamp Intensif 3 jours</Link>
                  </h4>
                  <p className="text-sm text-gray-anthracite
                    Formation accélérée pour transformation rapide des équipes
                  </p>
                </div>
                
                <div className="bg-white/50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-ink mb-2">Modules Thématiques</h4>
                  <p className="text-sm text-gray-anthracite
                    Sessions spécialisées : prospection, closing, management commercial
                  </p>
                </div>
                
                <div className="bg-white/50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-ink mb-2">Accompagnement Long Terme</h4>
                  <p className="text-sm text-gray-anthracite
                    Programme étalé avec <Link href="/transformation-commerciale" className="text-mint-green hover:underline">transformation progressive</Link>
                  </p>
                </div>
                
                <div className="bg-white/50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-ink mb-2">Format Hybride</h4>
                  <p className="text-sm text-gray-anthracite
                    Combinaison présentiel + digital pour optimiser l'investissement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes de Formation */}
      <section className="py-20 bg-white
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Programmes de Formation
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Découvrez nos <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline">formations commerciales PME</Link> 
              et leurs contenus détaillés
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/ressources/guide-prospection" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Prospection Moderne PME
                </h3>
                <p className="text-gray-anthracite mb-4">
                  Maîtrisez les 7 canaux de prospection adaptés aux PME avec scripts et méthodes terrain.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Voir le programme <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            <Link href="/ressources/guide-closing" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Closing & Négociation
                </h3>
                <p className="text-gray-anthracite mb-4">
                  7 techniques avancées et méthode AREA pour conclure plus efficacement.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Voir le programme <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            <Link href="/management-equipe-commerciale" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Management Commercial
                </h3>
                <p className="text-gray-anthracite mb-4">
                  Développer vos compétences de manager commercial pour motiver et piloter.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Découvrir <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages Formation */}
      <section className="py-20 bg-slate-50
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-12">
            Retours de Nos Formations PME
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6">
              <blockquote className="text-lg text-gray-anthracite italic mb-4">
                "Formation bootcamp commercial exceptionnelle ! Laurent adapte parfaitement 
                sa pédagogie aux contraintes PME. Nos commerciaux ont immédiatement appliqué 
                les techniques et nos résultats ont décollé."
              </blockquote>
              <div className="text-mint-green font-semibold">
                DRH PME Services • 18 collaborateurs
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <blockquote className="text-lg text-gray-anthracite italic mb-4">
                "Enfin un formateur qui comprend nos enjeux PME ! Méthodes concrètes, 
                outils directement utilisables et accompagnement sur la durée. 
                Investissement formation le plus rentable que nous ayons fait."
              </blockquote>
              <div className="text-mint-green font-semibold">
                CEO PME Industrie • 45 collaborateurs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Formateur Vente Expert PME
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre</Link> 
            conçoit des formations commerciales sur-mesure qui transforment réellement vos équipes PME.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Diagnostic Formation Gratuit
            </Link>
            <Link href="/formation-commerciale-pme" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <BookOpen className="w-5 h-5 mr-2" />
              Voir Nos Formations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}