import type { Metadata } from 'next';
import { BarChart3, Target, Calendar, Users, CheckCircle, ArrowRight, Download, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Système de Suivi des Prospects PME | Outil CRM Simple | Laurent Serre',
  description: 'Système de suivi des prospects adapté aux PME. Templates de tableaux de bord, métriques de performance et outils de pilotage commercial.',
  keywords: 'suivi prospects PME, CRM simple, tableau de bord commercial, métriques vente, pilotage commercial PME, pipeline management',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/systeme-suivi-prospects',
  },
  openGraph: {
    title: 'Système de Suivi des Prospects PME | Laurent Serre',
    description: 'Système de suivi des prospects adapté aux PME. Templates et outils de pilotage commercial.',
    url: 'https://laurent-serre-developpement.fr/ressources/systeme-suivi-prospects',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
};

export default function SystemeSuiviProspectsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
            <BarChart3 className="w-5 h-5 text-mint-green" />
            <span className="font-title font-semibold text-white">
              Suivi des Prospects
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-title font-extrabold text-white leading-tight mb-6">
            Système de Suivi
            <span className="block text-mint-green">des Prospects PME</span>
          </h1>
          
          <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
            Pilotez efficacement votre activité commerciale avec notre système de suivi adapté aux PME. 
            Templates, métriques et tableaux de bord pour ne plus perdre aucune opportunité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Télécharger les Templates
            </Link>
            <Link href="/suivi-performance" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <TrendingUp className="w-5 h-5 mr-2" />
              Suivi Performance Avancé
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi un Système de Suivi */}
      <section className="py-20 bg-white
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Pourquoi un Système de Suivi ?
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Les PME perdent en moyenne 27% de leurs prospects par manque de suivi structuré
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center border border-mint-green/20">
              <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-red-500">27%</span>
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink mb-2">
                Prospects Perdus
              </h3>
              <p className="text-gray-anthracite text-sm">
                Par manque de suivi structuré
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center border border-mint-green/20">
              <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-orange-500">5x</span>
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink mb-2">
                Relances Nécessaires
              </h3>
              <p className="text-gray-anthracite text-sm">
                En moyenne pour conclure
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-mint-green">+40%</span>
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink mb-2">
                Taux de Conversion
              </h3>
              <p className="text-gray-anthracite text-sm">
                Avec un suivi structuré
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center border border-mint-green/20">
              <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-500">3h</span>
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink mb-2">
                Temps Économisé
              </h3>
              <p className="text-gray-anthracite text-sm">
                Par semaine et par commercial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Composants du Système */}
      <section className="py-20 bg-slate-50
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Composants du Système
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Tout ce dont vous avez besoin pour un suivi efficace
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Tableau de Bord Principal
              </h3>
              <p className="text-gray-anthracite mb-4">
                Vue d'ensemble de votre pipeline commercial avec métriques clés.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Nombre de prospects par étape
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Taux de conversion par étape
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Chiffre d'affaires prévisionnel
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Fiche Prospect Complète
              </h3>
              <p className="text-gray-anthracite mb-4">
                Template de fiche pour centraliser toutes les informations.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Informations entreprise
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Historique des interactions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Besoins et objections
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Planning de Relances
              </h3>
              <p className="text-gray-anthracite mb-4">
                Système automatisé de rappels et relances programmées.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Relances automatiques
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Templates d'emails
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Calendrier intégré
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Scoring des Prospects
              </h3>
              <p className="text-gray-anthracite mb-4">
                Système de notation pour prioriser vos efforts commerciaux.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Critères de qualification
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Probabilité de closing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Priorités d'action
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Métriques de Performance
              </h3>
              <p className="text-gray-anthracite mb-4">
                KPIs essentiels pour piloter votre activité commerciale.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Taux de conversion
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Cycle de vente moyen
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  ROI par canal
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Rapports Hebdomadaires
              </h3>
              <p className="text-gray-anthracite mb-4">
                Templates de reporting pour suivre l'évolution de votre activité.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Synthèse hebdomadaire
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Analyse des tendances
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Plan d'action
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Métriques Clés PME */}
      <section className="py-20 bg-white
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Métriques Clés pour PME
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Les indicateurs essentiels adaptés aux spécificités des PME
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Métriques d'Activité
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-mint-green/10 rounded-lg">
                  <span className="font-semibold text-gray-anthracite prospects/semaine</span>
                  <span className="text-mint-green font-bold">10-15</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-mint-green/10 rounded-lg">
                  <span className="font-semibold text-gray-anthracite
                  <span className="text-mint-green font-bold">20-30</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-mint-green/10 rounded-lg">
                  <span className="font-semibold text-gray-anthracite obtenus/semaine</span>
                  <span className="text-mint-green font-bold">3-5</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-mint-green/10 rounded-lg">
                  <span className="font-semibold text-gray-anthracite envoyées</span>
                  <span className="text-mint-green font-bold">2-3</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Métriques de Performance
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-mint-green/10 rounded-lg">
                  <span className="font-semibold text-gray-anthracite de conversion prospect→RDV</span>
                  <span className="text-mint-green font-bold">15-25%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-mint-green/10 rounded-lg">
                  <span className="font-semibold text-gray-anthracite de conversion RDV→Proposition</span>
                  <span className="text-mint-green font-bold">60-80%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-mint-green/10 rounded-lg">
                  <span className="font-semibold text-gray-anthracite de closing</span>
                  <span className="text-mint-green font-bold">25-35%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-mint-green/10 rounded-lg">
                  <span className="font-semibold text-gray-anthracite de vente moyen</span>
                  <span className="text-mint-green font-bold">30-60j</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Téléchargez Votre Système de Suivi
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Templates Excel/Google Sheets prêts à utiliser + guide d'implémentation complet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Télécharger les Templates
            </Link>
            <Link href="/suivi-performance" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <TrendingUp className="w-5 h-5 mr-2" />
              Suivi Performance Avancé
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}