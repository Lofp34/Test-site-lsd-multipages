import type { Metadata } from 'next';
import { Users, Target, Award, CheckCircle, ArrowRight, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Coach Commercial Entreprise | Laurent Serre - Coaching Personnalisé PME',
  description: 'Coach commercial entreprise spécialisé PME. Laurent Serre accompagne vos commerciaux individuellement et collectivement. Coaching terrain personnalisé, résultats mesurables.',
  keywords: 'coach commercial entreprise, coaching commercial PME, coach commercial individuel, coaching équipe commerciale, développement commercial coaching',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/coach-commercial-entreprise',
  },
  openGraph: {
    title: 'Coach Commercial Entreprise | Laurent Serre - Coaching Personnalisé PME',
    description: 'Coach commercial entreprise spécialisé PME. Coaching personnalisé pour développer vos performances commerciales.',
    url: 'https://laurentserre.com/coach-commercial-entreprise',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CoachCommercialEntreprisePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
              <Award className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-white">
                Coach Commercial Entreprise
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
              Coach Commercial
              <span className="block text-mint-green">Entreprise</span>
            </h1>
            
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
              accompagne vos commerciaux avec un coaching personnalisé. Développement individuel et collectif, 
              <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline"> méthodes de formation intégrées</Link> et 
              <Link href="/transformation-commerciale" className="text-mint-green hover:underline"> accompagnement terrain</Link> 
              pour des résultats durables.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Diagnostic Coaching Gratuit
              </Link>
              <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Démarrer un Coaching
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Types de Coaching */}
      <section className="py-20 bg-white
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Coaching Commercial Adapté à Votre Entreprise
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Une approche personnalisée selon vos enjeux, votre secteur et vos objectifs de développement commercial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Coaching Individuel */}
            <div className="bg-white rounded-2xl p-8 border border-mint-green/20 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Coaching Individuel
              </h3>
              <p className="text-gray-anthracite mb-6">
                Accompagnement personnalisé de vos commerciaux pour développer leurs compétences spécifiques et leur performance.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Bilan de compétences commercial
                </div>
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Plan de développement personnalisé
                </div>
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/guide-prospection" className="hover:text-mint-green">Outils prospection avancés</Link>
                </div>
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Suivi régulier et ajustements
                </div>
              </div>
            </div>

            {/* Coaching Équipe */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Coaching Équipe
              </h3>
              <p className="text-gray-anthracite mb-6">
                Dynamique collective, cohésion d'équipe et montée en compétences groupée pour maximiser la performance globale.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Analyse dynamique d'équipe
                </div>
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Ateliers collectifs pratiques
                </div>
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/guide-closing" className="hover:text-mint-green">Techniques closing partagées</Link>
                </div>
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Émulation et motivation groupe
                </div>
              </div>
            </div>

            {/* Coaching Management */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Coaching Management
              </h3>
              <p className="text-gray-anthracite mb-6">
                Développement des compétences managériales pour diriger efficacement votre équipe commerciale.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Leadership commercial
                </div>
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Pilotage performance
                </div>
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/outil-strategie-commerciale" className="hover:text-mint-green">Stratégie et planification</Link>
                </div>
                <div className="flex items-center text-gray-600
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Motivation et recrutement
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Méthodologie Coaching */}
      <section className="py-20 bg-slate-50
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-title font-bold text-blue-ink mb-8">
                Méthodologie de Coaching Terrain
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Évaluation Initiale</h3>
                    <p className="text-gray-anthracite
                      <Link href="/diagnostic" className="text-mint-green hover:underline">Diagnostic approfondi</Link> des compétences, 
                      motivations et freins de chaque commercial ou de l'équipe.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Plan de Développement</h3>
                    <p className="text-gray-anthracite
                      Conception d'un parcours personnalisé intégrant <Link href="/formation-commerciale-pme" className="text-mint-green hover:underline">formation</Link> 
                      et coaching terrain adapté aux besoins identifiés.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Accompagnement Terrain</h3>
                    <p className="text-gray-anthracite
                      Sessions pratiques, accompagnement client, débriefing immédiat et ajustements en temps réel 
                      des techniques commerciales.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Autonomisation</h3>
                    <p className="text-gray-anthracite
                      Transfert progressif des compétences pour rendre vos commerciaux autonomes et maintenir 
                      la performance dans le temps.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Résultats Coaching Moyens
              </h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">+22%</div>
                  <div className="text-gray-anthracite Individuelle</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">+100%</div>
                  <div className="text-gray-anthracite Équipe</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">-37%</div>
                  <div className="text-gray-anthracite Commercial</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-mint-green mb-2">+100%</div>
                  <div className="text-gray-anthracite en Soi</div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-ink mb-3">Témoignage Coaching</h4>
                <p className="text-gray-anthracite italic mb-3">
                  "Le coaching de Laurent a transformé notre équipe. En 6 mois, nos commerciaux ont gagné 
                  en confiance, en technique et en résultats. Un investissement qui change tout !"
                </p>
                <div className="text-sm text-mint-green font-semibold">
                  Directeur Commercial PME Tech • 8 commerciaux coachés
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ressources Coaching */}
      <section className="py-20 bg-white
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Outils et Ressources de Coaching
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Des ressources pratiques pour accompagner le développement de vos commerciaux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/ressources/guide-prospection" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Guide Prospection Coaching
                </h3>
                <p className="text-gray-anthracite mb-4">
                  Méthodes et scripts pour accompagner vos commerciaux dans la maîtrise de la prospection moderne.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Coaching avec ce guide <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            <Link href="/ressources/outil-preparation-rdv" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Outil Préparation RDV
                </h3>
                <p className="text-gray-anthracite mb-4">
                  Checklist et méthode pour coacher vos commerciaux sur la préparation optimale des rendez-vous.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Utiliser en coaching <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            <Link href="/ressources/kit-gestion-grands-comptes" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Kit Gestion Grands Comptes
                </h3>
                <p className="text-gray-anthracite mb-4">
                  Outils de coaching spécialisés pour développer l'expertise grands comptes de vos équipes.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Coaching grands comptes <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Expert */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Coach Commercial Expert PME
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
            accompagne vos commerciaux avec un coaching personnalisé qui transforme durablement les performances.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Diagnostic Coaching Gratuit
            </Link>
            <Link href="/expert-developpement-commercial-pme" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Star className="w-5 h-5 mr-2" />
              Découvrir l'Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}