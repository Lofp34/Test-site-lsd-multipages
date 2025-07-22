import type { Metadata } from 'next';
import { Users, Target, TrendingUp, Heart, CheckCircle, ArrowRight, Download, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Techniques de Motivation Équipe Commerciale PME | Laurent Serre',
  description: 'Guide complet des techniques de motivation et coaching commercial pour PME. Méthodes éprouvées pour booster la performance de vos équipes.',
  keywords: 'motivation équipe commerciale, coaching commercial PME, management commercial, techniques motivation, leadership commercial, performance équipe',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/techniques-motivation-equipe',
  },
  openGraph: {
    title: 'Techniques de Motivation Équipe Commerciale PME | Laurent Serre',
    description: 'Guide complet des techniques de motivation et coaching commercial pour PME.',
    url: 'https://laurent-serre-developpement.fr/ressources/techniques-motivation-equipe',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
};

export default function TechniquesMotivationEquipePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-anthracite">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
            <Heart className="w-5 h-5 text-mint-green" />
            <span className="font-title font-semibold text-white">
              Motivation & Coaching
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-title font-extrabold text-white leading-tight mb-6">
            Techniques de Motivation
            <span className="block text-mint-green">Équipe Commerciale</span>
          </h1>
          
          <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
            Transformez vos commerciaux en équipe haute performance avec nos techniques de motivation 
            et coaching spécialement adaptées aux PME. Méthodes terrain éprouvées par Laurent Serre.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Guide Motivation Gratuit
            </Link>
            <Link href="/management-equipe-commerciale" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Users className="w-5 h-5 mr-2" />
              Formation Management
            </Link>
          </div>
        </div>
      </section>

      {/* Les 5 Piliers de la Motivation */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Les 5 Piliers de la Motivation Commerciale
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Méthode éprouvée pour maintenir une équipe commerciale motivée et performante
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20 lg:col-span-1">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">1</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Objectifs Clairs et Atteignables
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Définissez des objectifs SMART adaptés aux capacités de chaque commercial.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Objectifs individualisés
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Paliers progressifs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Suivi hebdomadaire
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20 lg:col-span-1">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">2</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Reconnaissance et Récompenses
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Système de reconnaissance adapté aux budgets PME mais efficace.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Reconnaissance publique
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Primes variables
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Avantages non-monétaires
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20 lg:col-span-1">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">3</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Formation Continue
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Investissement dans le développement des compétences.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Sessions mensuelles
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Coaching individuel
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Partage d'expériences
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20 lg:col-span-1">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">4</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Communication Transparente
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Créez un climat de confiance par la transparence.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Réunions régulières
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Feedback constructif
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Écoute active
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20 lg:col-span-2">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">5</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Environnement de Travail Positif
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Créez une culture d'entreprise qui favorise la performance et le bien-être.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                    Esprit d'équipe
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                    Autonomie responsable
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                    Équilibre vie pro/perso
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                    Outils performants
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                    Défis stimulants
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                    Célébration des succès
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Techniques de Coaching */}
      <section className="py-20 bg-slate-50 dark:bg-gray-anthracite/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Techniques de Coaching Commercial
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Méthodes pratiques pour développer le potentiel de chaque commercial
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Coaching Individuel
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-6">
                Accompagnement personnalisé pour développer les compétences spécifiques.
              </p>
              <div className="space-y-4">
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Entretiens One-to-One</h4>
                  <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                    Sessions hebdomadaires de 30 minutes pour faire le point et définir les axes d'amélioration.
                  </p>
                </div>
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Accompagnement Terrain</h4>
                  <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                    Participation aux RDV clients pour observer et conseiller en temps réel.
                  </p>
                </div>
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Plan de Développement</h4>
                  <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                    Feuille de route personnalisée avec objectifs et échéances.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Coaching d'Équipe
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-6">
                Dynamiques collectives pour renforcer la cohésion et la performance.
              </p>
              <div className="space-y-4">
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Réunions Commerciales</h4>
                  <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                    Sessions hebdomadaires structurées : résultats, bonnes pratiques, défis.
                  </p>
                </div>
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg/80 mb-2">Jeux de Rôles</h4>
                  <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                    Simulations de situations commerciales pour s'entraîner ensemble.
                  </p>
                </div>
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Challenges Collectifs</h4>
                  <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                    Défis d'équipe pour stimuler l'émulation et la solidarité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outils de Motivation PME */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Outils de Motivation Adaptés PME
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Solutions pratiques et économiques pour motiver vos équipes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Tableau des Performances
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Affichage visuel des résultats pour créer une saine émulation.
              </p>
              <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-2">
                <li>• Classement mensuel</li>
                <li>• Évolution individuelle</li>
                <li>• Objectifs atteints</li>
                <li>• Badges de réussite</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Système de Points
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Gamification des activités commerciales pour maintenir l'engagement.
              </p>
              <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-2">
                <li>• Points par activité</li>
                <li>• Bonus objectifs</li>
                <li>• Échange contre récompenses</li>
                <li>• Niveaux de progression</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Programme Bien-être
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Initiatives pour le bien-être et l'équilibre vie professionnelle.
              </p>
              <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-2">
                <li>• Horaires flexibles</li>
                <li>• Télétravail partiel</li>
                <li>• Activités d'équipe</li>
                <li>• Formation personnelle</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cas Pratiques PME */}
      <section className="py-20 bg-slate-50 dark:bg-gray-anthracite/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Cas Pratiques PME
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Exemples concrets de mise en œuvre dans des PME
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                PME Services B2B - 15 salariés
              </h3>
              <div className="mb-6">
                <h4 className="font-semibold text-mint-green mb-2">Problématique :</h4>
                <p className="text-gray-anthracite dark:text-primary-bg/80 text-sm mb-4">
                  Équipe commerciale démotivée, turnover élevé, objectifs non atteints depuis 6 mois.
                </p>
                <h4 className="font-semibold text-mint-green mb-2">Solutions mises en place :</h4>
                <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                  <li>• Redéfinition des objectifs individualisés</li>
                  <li>• Mise en place de primes par paliers</li>
                  <li>• Coaching hebdomadaire</li>
                  <li>• Tableau de bord visuel</li>
                </ul>
              </div>
              <div className="bg-mint-green/10 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Résultats après 3 mois :</h4>
                <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                  <li>• +45% de performance commerciale</li>
                  <li>• 0% de turnover</li>
                  <li>• +60% de satisfaction équipe</li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                PME Industrielle - 35 salariés
              </h3>
              <div className="mb-6">
                <h4 className="font-semibold text-mint-green mb-2">Problématique :</h4>
                <p className="text-gray-anthracite dark:text-primary-bg/80 text-sm mb-4">
                  Commerciaux expérimentés mais peu motivés, résistance au changement.
                </p>
                <h4 className="font-semibold text-mint-green mb-2">Solutions mises en place :</h4>
                <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                  <li>• Implication dans la définition des objectifs</li>
                  <li>• Formation continue sur nouvelles techniques</li>
                  <li>• Reconnaissance expertise terrain</li>
                  <li>• Challenges d'équipe</li>
                </ul>
              </div>
              <div className="bg-mint-green/10 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Résultats après 6 mois :</h4>
                <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                  <li>• +30% de nouveaux clients</li>
                  <li>• +25% de CA par commercial</li>
                  <li>• Adhésion totale aux nouvelles méthodes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Transformez Votre Équipe Commerciale
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Guide complet + templates d'outils de motivation adaptés aux PME.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Guide Motivation Gratuit
            </Link>
            <Link href="/management-equipe-commerciale" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Users className="w-5 h-5 mr-2" />
              Formation Management
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}