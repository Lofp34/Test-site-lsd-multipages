import type { Metadata } from 'next';
import { ArrowLeft, DraftingCompass, Target, TrendingUp, Users, BarChart, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Outil Stratégie Commerciale sur 1 an | Laurent Serre Développement',
  description: 'Construisez votre plan d\'action commercial sur 1 an avec notre outil interactif. Définissez objectifs, stratégies et tactiques pour réussir.',
  keywords: 'stratégie commerciale, plan action commercial, objectifs commerciaux, tactiques de vente, développement commercial PME',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://www.laurentserre.com/ressources/outil-strategie-commerciale',
  },
  openGraph: {
    title: 'Outil Stratégie Commerciale sur 1 an | Laurent Serre Développement',
    description: 'Construisez votre plan d\'action commercial sur 1 an avec notre outil interactif. Définissez objectifs, stratégies et tactiques pour réussir.',
    url: 'https://www.laurentserre.com/ressources/outil-strategie-commerciale',
    type: 'article',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
    images: [
      {
        url: 'https://www.laurentserre.com/laurent.jpg',
        width: 1200,
        height: 630,
        alt: 'Outil de stratégie commerciale Laurent Serre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outil Stratégie Commerciale sur 1 an | Laurent Serre',
    description: 'Construisez votre plan d\'action commercial sur 1 an avec notre outil interactif.',
    images: ['https://www.laurentserre.com/laurent.jpg'],
    creator: '@laurentserre',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OutilStrategieCommercialePage() {
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
              <DraftingCompass className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-mint-green">
                Outil Stratégique • Plan Commercial
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Outil Stratégie
              <span className="block text-mint-green">Commerciale</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Construisez votre plan d'action commercial sur 1 an avec méthode et vision stratégique.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6 flex items-center">
              <Target className="w-8 h-8 text-mint-green mr-3" />
              Votre Feuille de Route Commerciale
            </h2>
            <p className="text-lg text-gray-anthracite mb-4">
              Une stratégie commerciale sans plan d'action, c'est comme naviguer sans boussole. 
              Cet outil vous guide pour construire votre stratégie commerciale sur 12 mois.
            </p>
            <div className="grid md:grid-cols-4 gap-4 mt-8">
              <div className="text-center p-4 bg-white rounded-xl">
                <Target className="w-8 h-8 text-mint-green mx-auto mb-2" />
                <h3 className="font-semibold text-blue-ink text-sm">Objectifs Clairs</h3>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <TrendingUp className="w-8 h-8 text-mint-green mx-auto mb-2" />
                <h3 className="font-semibold text-blue-ink text-sm">Croissance Planifiée</h3>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <Users className="w-8 h-8 text-mint-green mx-auto mb-2" />
                <h3 className="font-semibold text-blue-ink text-sm">Équipe Alignée</h3>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <BarChart className="w-8 h-8 text-mint-green mx-auto mb-2" />
                <h3 className="font-semibold text-blue-ink text-sm">Résultats Mesurés</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <DraftingCompass className="w-8 h-8 text-mint-green mr-3" />
            Les 5 Piliers de Votre Stratégie
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">1</span>
                Analyse de Situation
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-3">📊 Audit Interne</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• CA actuel et évolution sur 3 ans</li>
                    <li>• Performance de l'équipe commerciale</li>
                    <li>• Analyse du pipe commercial</li>
                    <li>• Taux de conversion par étape</li>
                    <li>• Cycle de vente moyen</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-3">🔍 Analyse Externe</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Évolution du marché</li>
                    <li>• Analyse concurrentielle</li>
                    <li>• Nouveaux entrants</li>
                    <li>• Tendances sectorielles</li>
                    <li>• Opportunités réglementaires</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">2</span>
                Définition des Objectifs SMART
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">🎯 Objectifs Financiers</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Chiffre d'affaires cible (+X% vs N-1)</li>
                    <li>• Marge brute objectif</li>
                    <li>• Nombre de nouveaux clients</li>
                    <li>• Panier moyen cible</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">📈 Objectifs Opérationnels</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Nombre de prospects à contacter</li>
                    <li>• Taux de conversion RDV → Proposition</li>
                    <li>• Taux de transformation Proposition → Vente</li>
                    <li>• Délai moyen de closing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">3</span>
                Stratégies et Tactiques
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">🔎 Prospection</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Canaux prioritaires</li>
                    <li>• Messages d'approche</li>
                    <li>• Fréquence de relance</li>
                    <li>• Outils et automation</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">🎭 Proposition de Valeur</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Différenciation concurrentielle</li>
                    <li>• Arguments clés</li>
                    <li>• Preuves sociales</li>
                    <li>• Objections anticipées</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">💰 Politique Tarifaire</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Grille tarifaire</li>
                    <li>• Conditions de remise</li>
                    <li>• Modalités de paiement</li>
                    <li>• Packages et bundles</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">4</span>
                Plan d'Actions Trimestriel
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-mint-green mb-3">🌟 Q1 - Lancement</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Formation équipe sur nouveaux processus</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Mise en place des outils</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Campagne de prospection massive</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-mint-green mb-3">⚡ Q2 - Accélération</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Optimisation des processus</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Actions sur comptes clés</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Partenariats stratégiques</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">5</span>
                Tableau de Bord et KPIs
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-3">📊 KPIs Principaux</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• CA réalisé vs objectif</li>
                    <li>• Nombre de nouveaux clients</li>
                    <li>• Taux de conversion global</li>
                    <li>• Cycle de vente moyen</li>
                    <li>• Pipeline valeur</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-3">⚠️ Signaux d'Alerte</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Pipeline inférieur à 3x objectif mensuel</li>
                    <li>• Taux de conversion inférieur au seuil</li>
                    <li>• Cycle de vente qui s'allonge</li>
                    <li>• Retard sur objectifs trimestriels</li>
                    <li>• Turnover équipe commerciale</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <div className="bg-blue-ink rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-title font-bold mb-4">
              Besoin d'aide pour votre stratégie commerciale ?
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Ce template est un excellent point de départ. Pour une stratégie personnalisée et un accompagnement 
              dans la mise en œuvre, parlons de votre projet.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Construire ma stratégie commerciale
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}