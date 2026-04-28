import type { Metadata } from 'next';
import { ArrowLeft, Target, Crown, Users, TrendingUp, Calendar, Star, Shield, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kit Gestion Grands Comptes | Laurent Serre Développement',
  description: 'Méthodes et outils pour développer vos comptes stratégiques. Kit complet pour Key Account Managers et commerciaux grands comptes.',
  keywords: 'gestion grands comptes, key account manager, comptes stratégiques, développement grands comptes, KAM, commercial grands comptes',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/kit-gestion-grands-comptes',
  },
  openGraph: {
    title: 'Kit Gestion Grands Comptes | Laurent Serre Développement',
    description: 'Méthodes et outils pour développer vos comptes stratégiques. Kit complet pour Key Account Managers.',
    url: 'https://www.laurentserre.com/ressources/kit-gestion-grands-comptes',
    type: 'article',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
    images: [
      {
        url: 'https://www.laurentserre.com/laurent.jpg',
        width: 1200,
        height: 630,
        alt: 'Kit gestion grands comptes Laurent Serre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kit Gestion Grands Comptes | Laurent Serre',
    description: 'Méthodes et outils pour développer vos comptes stratégiques.',
    images: ['https://www.laurentserre.com/laurent.jpg'],
    creator: '@laurentserre',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function KitGestionGrandsComptesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/ressources" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux ressources
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
              <Crown className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-mint-green">
                Kit Exclusif • Grands Comptes
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Kit Gestion
              <span className="block text-mint-green">Grands Comptes</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Méthodes et outils pour développer vos comptes stratégiques et maximiser leur potentiel.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6 flex items-center">
              <Crown className="w-8 h-8 text-mint-green mr-3" />
              L'Art du Key Account Management
            </h2>
            <p className="text-lg text-gray-anthracite mb-4">
              80% de votre chiffre d'affaires vient probablement de 20% de vos clients. 
              Ces comptes stratégiques méritent une approche particulière, méthodique et relationnelle.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-3xl font-bold text-mint-green mb-2">5x</div>
                <p className="text-sm text-gray-anthracite">Potentiel de croissance d'un grand compte</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-3xl font-bold text-mint-green mb-2">65%</div>
                <p className="text-sm text-gray-anthracite">de probabilité de vente supplémentaire</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-3xl font-bold text-mint-green mb-2">25%</div>
                <p className="text-sm text-gray-anthracite">de marge supplémentaire en moyenne</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <Target className="w-8 h-8 text-mint-green mr-3" />
            Matrice de Classification des Comptes
          </h2>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Comptes Stratégiques
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• CA supérieur à 100K€/an</li>
                    <li>• Potentiel de croissance élevé</li>
                    <li>• Relation privilégiée</li>
                    <li>• Référence marché</li>
                  </ul>
                  <p className="text-xs text-green-600 mt-2">
                    <strong>Action :</strong> Plan de développement personnalisé
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Comptes Développement
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• CA 25-100K€/an</li>
                    <li>• Potentiel identifié</li>
                    <li>• Relation à construire</li>
                    <li>• Secteur porteur</li>
                  </ul>
                  <p className="text-xs text-blue-600 mt-2">
                    <strong>Action :</strong> Plan d'action commercial renforcé
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-700 mb-2 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Comptes Maintenance
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• CA stable 10-25K€/an</li>
                    <li>• Potentiel limité</li>
                    <li>• Relation établie</li>
                    <li>• Rentabilité correcte</li>
                  </ul>
                  <p className="text-xs text-yellow-600 mt-2">
                    <strong>Action :</strong> Gestion optimisée, up-sell ponctuel
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="text-lg font-semibold text-red-700 mb-2 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Comptes Problématiques
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• CA inférieur à 10K€/an ou déclin</li>
                    <li>• Relation dégradée</li>
                    <li>• Rentabilité faible</li>
                    <li>• Nombreuses difficultés</li>
                  </ul>
                  <p className="text-xs text-red-600 mt-2">
                    <strong>Action :</strong> Plan de sauvetage ou abandon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <Users className="w-8 h-8 text-mint-green mr-3" />
            Plan de Développement de Compte
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">1</span>
                Analyse et Diagnostic
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">🔍 Analyse Business</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Modèle économique</li>
                    <li>• Enjeux stratégiques</li>
                    <li>• Challenges sectoriels</li>
                    <li>• Projets en cours</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">👥 Mapping Relationnel</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Décideurs identifiés</li>
                    <li>• Influenceurs mapping</li>
                    <li>• Processus de décision</li>
                    <li>• Alliés et opposants</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">⚡ Analyse SWOT</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Forces client</li>
                    <li>• Faiblesses identifiées</li>
                    <li>• Opportunités business</li>
                    <li>• Menaces concurrentielles</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">2</span>
                Stratégie de Développement
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">🎯 Objectifs SMART</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Quantitatifs :</strong>
                      <ul className="space-y-1 mt-1">
                        <li>• Croissance CA : +X% en 12 mois</li>
                        <li>• Nouveaux produits/services</li>
                        <li>• Extension géographique</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Qualitatifs :</strong>
                      <ul className="space-y-1 mt-1">
                        <li>• Statut de partenaire stratégique</li>
                        <li>• Accès aux projets innovants</li>
                        <li>• Référence pour d'autres prospects</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">3</span>
                Plan d'Actions Opérationnel
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-mint-green mb-3">📅 Planning Relationnel</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>RDV trimestriels direction générale</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Points mensuels équipes opérationnelles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Événements et invitations</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-mint-green mb-3">🚀 Actions Commerciales</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Propositions proactives</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Cross-selling stratégique</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Innovation collaborative</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <div className="bg-blue-ink rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-title font-bold mb-4">
              Maximisez le potentiel de vos grands comptes
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Ce kit vous donne les bases. Pour une approche personnalisée et un accompagnement 
              dans le développement de vos comptes stratégiques, échangeons.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Développer mes grands comptes
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}