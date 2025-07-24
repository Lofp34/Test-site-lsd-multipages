import type { Metadata } from 'next';
import { BarChart, Target, TrendingUp, CheckCircle, ArrowRight, Award, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Suivi & Optimisation Performance | Laurent Serre - KPI Commerciaux PME',
  description: 'Suivi et optimisation de la performance commerciale PME. Laurent Serre accompagne le pilotage de vos KPI et l\'amélioration continue de vos résultats.',
  keywords: 'suivi performance commerciale, KPI commercial PME, pilotage commercial, optimisation performance vente, tableaux de bord commercial',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/suivi-performance',
  },
  openGraph: {
    title: 'Suivi & Optimisation Performance | Laurent Serre - KPI Commerciaux PME',
    description: 'Accompagnement suivi et optimisation performance commerciale PME. Pilotage KPI et amélioration continue.',
    url: 'https://laurentserre.com/suivi-performance',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SuiviPerformancePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
              <Award className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-white">
                Suivi & Optimisation Performance
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
              Suivi & Optimisation
              <span className="block text-mint-green">Performance</span>
            </h1>
            
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
              vous accompagne dans le pilotage et l'optimisation continue de votre performance commerciale. 
              Tableaux de bord, KPI adaptés PME et <Link href="/transformation-commerciale" className="text-mint-green hover:underline">amélioration continue</Link> 
              pour pérenniser vos résultats.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Audit Performance Gratuit
              </Link>
              <Link href="/expert-developpement-commercial-pme" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <BarChart className="w-5 h-5 mr-2" />
                Découvrir l'Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Essentiels */}
      <section className="py-20 bg-white
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              KPI Commerciaux Essentiels PME
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Les indicateurs clés pour piloter efficacement votre performance commerciale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Indicateurs Prospection */}
            <div className="bg-white rounded-2xl p-6 border border-mint-green/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-mint-green" />
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink mb-3">
                Prospection
              </h3>
              <div className="space-y-2 text-sm text-gray-anthracite
                <div>• Nombre de prospects contactés</div>
                <div>• Taux de réponse par canal</div>
                <div>• Coût d'acquisition prospect</div>
                <div>• Temps moyen de qualification</div>
              </div>
            </div>

            {/* Indicateurs Conversion */}
            <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-mint-green" />
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink mb-3">
                Conversion
              </h3>
              <div className="space-y-2 text-sm text-gray-anthracite
                <div>• Taux de conversion global</div>
                <div>• Taux par étape du tunnel</div>
                <div>• Durée cycle de vente</div>
                <div>• Valeur moyenne commande</div>
              </div>
            </div>

            {/* Indicateurs Performance */}
            <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-mint-green" />
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink mb-3">
                Performance Équipe
              </h3>
              <div className="space-y-2 text-sm text-gray-anthracite
                <div>• CA par commercial</div>
                <div>• Activité commerciale</div>
                <div>• Atteinte des objectifs</div>
                <div>• Évolution compétences</div>
              </div>
            </div>

            {/* Indicateurs Clients */}
            <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-mint-green" />
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink mb-3">
                Satisfaction Client
              </h3>
              <div className="space-y-2 text-sm text-gray-anthracite
                <div>• Taux de satisfaction</div>
                <div>• Net Promoter Score</div>
                <div>• Taux de fidélisation</div>
                <div>• Revenus récurrents</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Méthodologie Suivi */}
      <section className="py-20 bg-slate-50
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-title font-bold text-blue-ink mb-8">
                Méthodologie de Suivi Performance
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Définition KPI Pertinents</h3>
                    <p className="text-gray-anthracite
                      Sélection des indicateurs clés adaptés à votre secteur, taille et objectifs. 
                      Focus sur les métriques actionnables et impactantes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Tableaux de Bord Visuels</h3>
                    <p className="text-gray-anthracite
                      Création de dashboards simples et efficaces, adaptés aux PME. 
                      Visualisation claire pour un pilotage quotidien optimisé.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Analyse & Optimisation</h3>
                    <p className="text-gray-anthracite
                      Reviews régulières des performances, identification des écarts 
                      et plans d'action correctives pour l'amélioration continue.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-mint-green font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-ink mb-2">Autonomisation Équipes</h3>
                    <p className="text-gray-anthracite
                      Formation des équipes au suivi autonome, rituel de performance 
                      et culture de l'amélioration continue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Bénéfices du Suivi Performance
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green" />
                  <span className="text-gray-anthracite en temps réel de l'activité</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green" />
                  <span className="text-gray-anthracite rapide des écarts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green" />
                  <span className="text-gray-anthracite continue des processus</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green" />
                  <span className="text-gray-anthracite équipes par objectifs clairs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green" />
                  <span className="text-gray-anthracite mesurable des actions</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white/50 rounded-xl">
                <h4 className="font-semibold text-blue-ink mb-3">Résultat Moyen</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mint-green mb-1">+26%</div>
                  <div className="text-sm text-gray-anthracite commerciale avec suivi optimisé</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outils et Ressources */}
      <section className="py-20 bg-white
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Outils de Suivi Performance
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Des outils simples et efficaces pour piloter votre performance commerciale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Tableau de Bord Commercial
              </h3>
              <p className="text-gray-anthracite mb-4">
                Dashboard simple avec KPI essentiels, suivi temps réel et alertes automatiques.
              </p>
              <Link href="/ressources/outil-tableau-bord" className="inline-flex items-center text-mint-green hover:underline font-medium">
                Télécharger l'outil <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Grille d'Évaluation Performance
              </h3>
              <p className="text-gray-anthracite mb-4">
                Outil d'évaluation des commerciaux avec critères objectifs et plan de développement.
              </p>
              <Link href="/ressources/grille-evaluation" className="inline-flex items-center text-mint-green hover:underline font-medium">
                Utiliser la grille <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-ink mb-3">
                Reporting Automatisé
              </h3>
              <p className="text-gray-anthracite mb-4">
                Modèles de reports automatisés pour CRM, analyse mensuelle et pilotage équipe.
              </p>
              <Link href="/ressources/reporting-automatise" className="inline-flex items-center text-mint-green hover:underline font-medium">
                Configurer les reports <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Expert */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Optimisez Votre Performance Commerciale
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
            vous accompagne dans la mise en place d'un suivi performance adapté à votre PME.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Audit Performance Gratuit
            </Link>
            <Link href="/transformation-commerciale" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <TrendingUp className="w-5 h-5 mr-2" />
              Transformation Complète
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}