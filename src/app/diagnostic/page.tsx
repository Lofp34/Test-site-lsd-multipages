'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Target, CheckCircle, ArrowRight, Users, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Note: metadata cannot be exported from client components, so we'll handle SEO differently

export default function DiagnosticPage() {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    email: '',
    phone: '',
    sector: '',
    teamSize: '',
    currentChallenges: [] as string[],
    goals: [] as string[],
    timeline: '',
    budget: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const challenges = [
    'Prospection inefficace',
    'Taux de conversion faible',
    'Équipe commerciale démotivée',
    'Processus commercial non structuré',
    'Manque de formation',
    'Suivi client insuffisant',
    'Concurrence forte',
    'Négociation difficile'
  ];

  const goals = [
    'Augmenter le chiffre d\'affaires',
    'Améliorer la performance commerciale',
    'Structurer l\'équipe commerciale',
    'Former les commerciaux',
    'Optimiser les processus',
    'Développer de nouveaux marchés',
    'Fidéliser les clients',
    'Réduire le cycle de vente'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'currentChallenges' | 'goals') => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/hubspot/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Diagnostic Gratuit',
          currentChallenges: formData.currentChallenges.join(', '),
          goals: formData.goals.join(', ')
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          company: '',
          role: '',
          email: '',
          phone: '',
          sector: '',
          teamSize: '',
          currentChallenges: [],
          goals: [],
          timeline: '',
          budget: '',
          additionalInfo: ''
        });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
                <Target className="w-5 h-5 text-mint-green" />
                <span className="font-title font-semibold text-white">
                  Diagnostic Gratuit
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
                Diagnostic Commercial
                <span className="block text-mint-green">Gratuit</span>
              </h1>
              
              <p className="text-xl text-white/95 leading-relaxed mb-8">
                Obtenez un diagnostic personnalisé de votre performance commerciale et découvrez 
                les actions prioritaires pour développer vos ventes et optimiser votre équipe.
              </p>
              
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-2" />
                  <span>100% Gratuit</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-2" />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-2" />
                  <span>Retour sous 48h</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-title font-bold text-white mb-6">
                Pourquoi faire un diagnostic ?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-mint-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div className="text-white/90">
                    <strong className="text-white">Identifier vos freins :</strong> Découvrez les obstacles qui limitent votre croissance
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-mint-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div className="text-white/90">
                    <strong className="text-white">Définir les priorités :</strong> Obtenez un plan d'actions concret et personnalisé
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-mint-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div className="text-white/90">
                    <strong className="text-white">Optimiser votre ROI :</strong> Maximisez l'impact de vos investissements commerciaux
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-4">
              Diagnostic Commercial Personnalisé
            </h2>
            <p className="text-xl text-gray-anthracite">
              Remplissez ce formulaire pour recevoir votre diagnostic gratuit sous 48h
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="bg-mint-green/10 border border-mint-green/30 rounded-xl p-6 mb-8">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-mint-green mr-3" />
                <div>
                  <h3 className="font-semibold text-mint-green">Diagnostic envoyé !</h3>
                  <p className="text-gray-600">Vous recevrez votre diagnostic personnalisé sous 48h par email.</p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">!</span>
                </div>
                <div>
                  <h3 className="font-semibold text-red-700">Erreur d'envoi</h3>
                  <p className="text-red-600">Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                  placeholder="Votre entreprise"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Votre fonction *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                >
                  <option value="">Sélectionnez votre fonction</option>
                  <option value="Dirigeant">Dirigeant</option>
                  <option value="Directeur Commercial">Directeur Commercial</option>
                  <option value="Responsable Vente">Responsable Vente</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                  placeholder="votre.email@entreprise.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                  Secteur d'activité *
                </label>
                <input
                  type="text"
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                  placeholder="Ex: Services B2B, Industrie, Tech..."
                />
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                  Taille de l'équipe commerciale *
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                >
                  <option value="">Sélectionnez</option>
                  <option value="1 personne">1 personne (solo)</option>
                  <option value="2-5 personnes">2-5 personnes</option>
                  <option value="6-15 personnes">6-15 personnes</option>
                  <option value="16+ personnes">16+ personnes</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Quels sont vos défis commerciaux actuels ? (plusieurs choix possibles)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {challenges.map((challenge) => (
                  <label key={challenge} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      value={challenge}
                      checked={formData.currentChallenges.includes(challenge)}
                      onChange={(e) => handleCheckboxChange(e, 'currentChallenges')}
                      className="text-mint-green focus:ring-mint-green"
                    />
                    <span className="text-gray-700">{challenge}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Quels sont vos objectifs prioritaires ? (plusieurs choix possibles)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {goals.map((goal) => (
                  <label key={goal} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      value={goal}
                      checked={formData.goals.includes(goal)}
                      onChange={(e) => handleCheckboxChange(e, 'goals')}
                      className="text-mint-green focus:ring-mint-green"
                    />
                    <span className="text-gray-700">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                  Dans quel délai souhaitez-vous agir ?
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                >
                  <option value="">Sélectionnez</option>
                  <option value="Immédiatement">Immédiatement</option>
                  <option value="Dans les 3 mois">Dans les 3 mois</option>
                  <option value="Dans les 6 mois">Dans les 6 mois</option>
                  <option value="Pas de délai précis">Pas de délai précis</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Budget approximatif pour l'accompagnement
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                >
                  <option value="">Sélectionnez</option>
                  <option value="< 5K€">Moins de 5 000€</option>
                  <option value="5-15K€">5 000€ - 15 000€</option>
                  <option value="15-30K€">15 000€ - 30 000€</option>
                  <option value="30K€+">Plus de 30 000€</option>
                  <option value="À définir">À définir</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                Informations complémentaires
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-green focus:border-transparent"
                placeholder="Décrivez votre contexte, vos enjeux spécifiques, vos attentes..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 disabled:bg-gray-400 text-white px-8 py-4 rounded-full font-semibold transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5 mr-2" />
                    Recevoir mon diagnostic gratuit
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Ce que vous recevrez
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Un diagnostic complet et personnalisé pour transformer votre performance commerciale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Analyse Détaillée
              </h3>
              <p className="text-gray-anthracite">
                Évaluation complète de votre situation commerciale actuelle avec identification 
                précise des points de blocage et des opportunités d'amélioration.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Plan d'Actions Prioritaires
              </h3>
              <p className="text-gray-anthracite">
                Recommandations concrètes et hiérarchisées pour optimiser rapidement 
                vos résultats commerciaux avec un ROI mesurable.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Stratégie Personnalisée
              </h3>
              <p className="text-gray-anthracite">
                Solutions adaptées à votre secteur, votre taille d'équipe et vos objectifs 
                avec des étapes d'implémentation claires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Prêt à transformer vos résultats commerciaux ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Obtenez votre diagnostic personnalisé gratuit et découvrez comment booster 
            votre performance commerciale dès maintenant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#form" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Commencer le diagnostic
            </Link>
            <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Users className="w-5 h-5 mr-2" />
              Parler à un expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 