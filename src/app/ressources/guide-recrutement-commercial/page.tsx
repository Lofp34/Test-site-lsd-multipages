import type { Metadata } from 'next';
import { Users, Search, CheckCircle, FileText, ArrowRight, Download, Target, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guide Recrutement Commercial PME | Grilles Évaluation | Laurent Serre',
  description: 'Guide complet du recrutement commercial pour PME. Grilles d\'évaluation, templates d\'entretien et méthodes éprouvées pour recruter les bons commerciaux.',
  keywords: 'recrutement commercial PME, grille évaluation commercial, entretien commercial, profil commercial, recrutement vendeur, sélection commerciaux',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/guide-recrutement-commercial',
  },
  openGraph: {
    title: 'Guide Recrutement Commercial PME | Laurent Serre',
    description: 'Guide complet du recrutement commercial pour PME. Grilles d\'évaluation et templates d\'entretien.',
    url: 'https://laurent-serre-developpement.fr/ressources/guide-recrutement-commercial',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
};

export default function GuideRecrutementCommercialPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-anthracite">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
            <Search className="w-5 h-5 text-mint-green" />
            <span className="font-title font-semibold text-white">
              Recrutement Commercial
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-title font-extrabold text-white leading-tight mb-6">
            Guide Recrutement
            <span className="block text-mint-green">Commercial PME</span>
          </h1>
          
          <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
            Recrutez les bons commerciaux pour votre PME avec notre guide complet. 
            Grilles d'évaluation, templates d'entretien et méthodes éprouvées par Laurent Serre.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Télécharger le Guide
            </Link>
            <Link href="/formation-commerciale-pme" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Users className="w-5 h-5 mr-2" />
              Formation Équipes
            </Link>
          </div>
        </div>
      </section>

      {/* Enjeux du Recrutement Commercial PME */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Enjeux du Recrutement Commercial en PME
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Pourquoi le recrutement commercial est critique pour les PME
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center border border-red-500/20">
              <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-red-500">70%</span>
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink dark:text-primary-bg mb-2">
                Échec Recrutement
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 text-sm">
                Des recrutements commerciaux échouent en PME
              </p>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center border border-orange-500/20">
              <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-orange-500">6</span>
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink dark:text-primary-bg mb-2">
                Mois Intégration
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 text-sm">
                Temps moyen pour être opérationnel
              </p>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-mint-green">3x</span>
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink dark:text-primary-bg mb-2">
                Coût Échec
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 text-sm">
                Le salaire annuel en cas d'échec
              </p>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center border border-blue-500/20">
              <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-500">+50%</span>
              </div>
              <h3 className="text-lg font-title font-bold text-blue-ink dark:text-primary-bg mb-2">
                Impact CA
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 text-sm">
                Avec le bon recrutement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Processus de Recrutement */}
      <section className="py-20 bg-slate-50 dark:bg-gray-anthracite/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Processus de Recrutement Structuré
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Méthode en 6 étapes pour recruter le bon commercial
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">1</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Définition du Profil
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Clarifiez précisément le profil recherché selon votre contexte PME.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Compétences techniques
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Soft skills prioritaires
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Expérience requise
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Fit culturel
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">2</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Sourcing Candidats
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Stratégies de sourcing adaptées aux budgets PME.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  LinkedIn ciblé
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Cooptation interne
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Jobboards spécialisés
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Réseau professionnel
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">3</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Présélection CV
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Grille de lecture pour identifier les candidats prometteurs.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Critères éliminatoires
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Signaux positifs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Cohérence parcours
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Résultats quantifiés
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">4</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Entretien Téléphonique
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Premier filtre pour valider la motivation et l'adéquation.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Questions de motivation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Validation expérience
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Évaluation communication
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Disponibilité/mobilité
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">5</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Entretien Présentiel
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Évaluation approfondie des compétences et du potentiel.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Entretien comportemental
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Mise en situation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Test de vente
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Questions techniques
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">6</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Décision & Intégration
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Finalisation du recrutement et plan d'intégration.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Synthèse évaluations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Vérification références
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Négociation offre
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Plan d'onboarding
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Grilles d'Évaluation */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Grilles d'Évaluation
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Outils d'évaluation objectifs pour chaque étape du processus
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Grille Entretien Téléphonique
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-6">
                Évaluation rapide et efficace en 15-20 minutes.
              </p>
              <div className="space-y-4">
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Motivation (0-5 points)</h4>
                  <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                    <li>• Connaissance de l'entreprise</li>
                    <li>• Raisons de candidature</li>
                    <li>• Projet professionnel</li>
                  </ul>
                </div>
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Communication (0-5 points)</h4>
                  <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                    <li>• Clarté d'expression</li>
                    <li>• Écoute active</li>
                    <li>• Aisance relationnelle</li>
                  </ul>
                </div>
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Expérience (0-5 points)</h4>
                  <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                    <li>• Adéquation secteur/produit</li>
                    <li>• Résultats quantifiés</li>
                    <li>• Progression de carrière</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Grille Entretien Présentiel
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-6">
                Évaluation complète sur 100 points répartis en 5 domaines.
              </p>
              <div className="space-y-4">
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Compétences Vente (0-25 points)</h4>
                  <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                    <li>• Techniques de prospection</li>
                    <li>• Conduite d'entretien</li>
                    <li>• Closing et négociation</li>
                  </ul>
                </div>
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Soft Skills (0-20 points)</h4>
                  <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                    <li>• Empathie et écoute</li>
                    <li>• Adaptabilité</li>
                    <li>• Résilience</li>
                  </ul>
                </div>
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Fit Culturel (0-20 points)</h4>
                  <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                    <li>• Valeurs partagées</li>
                    <li>• Esprit d'équipe</li>
                    <li>• Autonomie</li>
                  </ul>
                </div>
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Potentiel (0-20 points)</h4>
                  <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                    <li>• Capacité d'apprentissage</li>
                    <li>• Ambition</li>
                    <li>• Leadership</li>
                  </ul>
                </div>
                <div className="bg-mint-green/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Mise en Situation (0-15 points)</h4>
                  <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                    <li>• Performance test vente</li>
                    <li>• Gestion objections</li>
                    <li>• Créativité solutions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates d'Entretien */}
      <section className="py-20 bg-slate-50 dark:bg-gray-anthracite/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Templates d'Entretien
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Questions types et mises en situation pour évaluer efficacement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Questions Comportementales
              </h3>
              <div className="space-y-3 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <div className="bg-mint-green/10 p-3 rounded">
                  <p className="font-medium mb-1">"Décrivez-moi votre plus belle réussite commerciale"</p>
                  <p className="text-xs">→ Évalue les résultats et la fierté du métier</p>
                </div>
                <div className="bg-mint-green/10 p-3 rounded">
                  <p className="font-medium mb-1">"Comment gérez-vous un refus client ?"</p>
                  <p className="text-xs">→ Teste la résilience et l'adaptabilité</p>
                </div>
                <div className="bg-mint-green/10 p-3 rounded">
                  <p className="font-medium mb-1">"Que faites-vous quand vous n'atteignez pas vos objectifs ?"</p>
                  <p className="text-xs">→ Évalue la remise en question et l'amélioration continue</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Questions Techniques
              </h3>
              <div className="space-y-3 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <div className="bg-mint-green/10 p-3 rounded">
                  <p className="font-medium mb-1">"Comment préparez-vous un RDV client ?"</p>
                  <p className="text-xs">→ Évalue la méthode et la rigueur</p>
                </div>
                <div className="bg-mint-green/10 p-3 rounded">
                  <p className="font-medium mb-1">"Quelle est votre technique de closing préférée ?"</p>
                  <p className="text-xs">→ Teste les compétences de conclusion</p>
                </div>
                <div className="bg-mint-green/10 p-3 rounded">
                  <p className="font-medium mb-1">"Comment gérez-vous votre pipeline ?"</p>
                  <p className="text-xs">→ Évalue l'organisation et le suivi</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Mises en Situation
              </h3>
              <div className="space-y-3 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <div className="bg-mint-green/10 p-3 rounded">
                  <p className="font-medium mb-1">Appel à froid</p>
                  <p className="text-xs">→ "Appelez-moi pour me vendre [votre produit]"</p>
                </div>
                <div className="bg-mint-green/10 p-3 rounded">
                  <p className="font-medium mb-1">Gestion d'objection</p>
                  <p className="text-xs">→ "C'est trop cher" / "Je dois réfléchir"</p>
                </div>
                <div className="bg-mint-green/10 p-3 rounded">
                  <p className="font-medium mb-1">Présentation produit</p>
                  <p className="text-xs">→ "Présentez-moi notre solution en 3 minutes"</p>
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
            Recrutez les Bons Commerciaux
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Guide complet + grilles d'évaluation + templates d'entretien prêts à utiliser.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Télécharger le Guide
            </Link>
            <Link href="/formation-commerciale-pme" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Users className="w-5 h-5 mr-2" />
              Former Vos Équipes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}