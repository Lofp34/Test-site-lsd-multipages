'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Target, CheckCircle, Calendar, ArrowRight, Award, Phone, Mail, Zap, Loader } from 'lucide-react';
import Link from 'next/link';
import TestExpress from '@/components/TestExpress';

const metadata: Metadata = {
  title: 'Diagnostic Commercial Gratuit PME | Laurent Serre - 30 min',
  description: 'Diagnostic commercial gratuit 30 minutes avec Laurent Serre, expert développement commercial PME. Analyse personnalisée de votre organisation commerciale.',
  keywords: 'diagnostic commercial gratuit, audit commercial PME, diagnostic gratuit équipe commerciale, évaluation commerciale PME, Laurent Serre diagnostic',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/diagnostic',
  },
  openGraph: {
    title: 'Diagnostic Commercial Gratuit PME | Laurent Serre - 30 min',
    description: 'Diagnostic commercial gratuit avec expert PME. Analyse personnalisée en 30 minutes.',
    url: 'https://laurentserre.com/diagnostic',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

function DiagnosticPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    principal_defi_commercial: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Préparer les données pour HubSpot
      const hubspotData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        principal_defi_commercial: formData.principal_defi_commercial,
        formId: 'e4741a23-ddaf-4cb5-8774-9e36f7937c79'
      };

      console.log('📤 Envoi des données vers HubSpot:', hubspotData);

      const response = await fetch('/api/hubspot/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Réinitialiser le formulaire
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          phone: '',
          principal_defi_commercial: ''
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
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-anthracite">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
                <Award className="w-5 h-5 text-mint-green" />
                <span className="font-title font-semibold text-white">
                  Diagnostic Commercial Gratuit
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
                Diagnostic Commercial
                <span className="block text-mint-green">Gratuit 30min</span>
              </h1>
              
              <p className="text-xl text-white/95 leading-relaxed mb-8">
                <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
                analyse gratuitement votre organisation commerciale. Identifiez vos leviers de croissance prioritaires et découvrez comment 
                <Link href="/transformation-commerciale" className="text-mint-green hover:underline"> transformer votre performance</Link> rapidement.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3" />
                  <span>Audit complet de votre organisation commerciale</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3" />
                  <span>Identification des leviers de performance prioritaires</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3" />
                  <span>Plan d'action personnalisé immédiat</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3" />
                  <span>Sans engagement • 100% confidentiel</span>
                </div>
              </div>
            </div>

            {/* Formulaire de Diagnostic */}
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-2">
                  Réservez Votre Diagnostic
                </h2>
                <p className="text-gray-anthracite dark:text-primary-bg/80">
                  30 minutes qui peuvent transformer votre business
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus === 'success' && (
                  <div className="bg-mint-green/10 border border-mint-green/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-mint-green mr-2" />
                      <p className="text-mint-green font-semibold">
                        Merci ! Votre demande a été envoyée avec succès.
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Laurent vous contactera dans les 24h pour planifier votre diagnostic gratuit.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-700 font-semibold">
                      Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Votre prénom"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Entreprise *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nom de votre entreprise"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="votre@entreprise.com"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="principal_defi_commercial" className="block text-sm font-medium text-gray-700 mb-2">
                    Principal défi commercial *
                  </label>
                  <select
                    id="principal_defi_commercial"
                    name="principal_defi_commercial"
                    required
                    value={formData.principal_defi_commercial}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionnez votre principal défi</option>
                    <option value="Difficultés de prospect">Difficultés de prospection</option>
                    <option value="Problèmes de closing">Problèmes de closing</option>
                    <option value="Gestion d'équipe comr">Gestion d'équipe commerciale</option>
                    <option value="Stratégie commerciale">Stratégie commerciale</option>
                    <option value="Performance commer">Performance commerciale</option>
                    <option value="Transformation digital">Transformation digitale</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-mint-green hover:bg-mint-green/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Réserver Mon Diagnostic Gratuit
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté par Laurent Serre Développement. 
                  Vos données sont confidentielles et ne seront jamais transmises à des tiers.
                </p>
              </form>

              {/* Séparateur */}
              <div className="my-8 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-anthracite/40 text-gray-500">ou</span>
                  </div>
                </div>
              </div>

              {/* Bouton Test Express */}
              <div className="text-center">
                <button 
                  id="test-express-btn"
                  className="inline-flex items-center bg-orange-soft hover:bg-orange-soft/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  onClick={() => {
                    const testSection = document.getElementById('test-express-section');
                    if (testSection) {
                      testSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Test Express 5 Minutes
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Évaluation rapide de votre situation commerciale
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Test Express */}
      <section id="test-express-section" className="py-20 bg-slate-50 dark:bg-gray-anthracite/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
              Test Express Commercial
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80">
              Évaluez rapidement votre situation commerciale en 5 questions
            </p>
          </div>
          
          <TestExpress />
          
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              Ce test express vous donne un premier aperçu. Pour une analyse complète et personnalisée, 
              <button 
                className="text-mint-green hover:underline font-medium"
                onClick={() => {
                  const form = document.querySelector('form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                réservez votre diagnostic gratuit de 30 minutes
              </button>.
            </p>
          </div>
        </div>
      </section>

      {/* Processus Diagnostic */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Comment Se Déroule Votre Diagnostic ?
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Un processus structuré pour identifier précisément vos leviers de croissance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-mint-green">1</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Analyse Situation Actuelle
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80">
                Évaluation de votre organisation, processus commerciaux, équipes et résultats actuels. 
                Identification des forces et axes d'amélioration prioritaires.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-mint-green">2</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Identification Opportunités
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80">
                Détection des leviers de performance à court et moyen terme. 
                Priorisation selon l'impact potentiel et la facilité de mise en œuvre.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-mint-green">3</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Plan d'Action Immédiat
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80">
                Recommandations concrètes et applicables immédiatement. 
                Roadmap personnalisée pour transformer votre performance commerciale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Domaines Analysés */}
      <section className="py-20 bg-slate-50 dark:bg-gray-anthracite/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Domaines Analysés Lors Du Diagnostic
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-2xl mx-auto">
              Un audit complet pour identifier toutes vos opportunités d'amélioration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-ink dark:text-primary-bg mb-3">
                Organisation & Processus
              </h3>
              <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-2">
                <li>• Structure équipe commerciale</li>
                <li>• Processus de vente existant</li>
                <li>• Outils et systèmes CRM</li>
                <li>• Management commercial</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-ink dark:text-primary-bg mb-3">
                Prospection & Lead Gen
              </h3>
              <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-2">
                <li>• Canaux de prospection utilisés</li>
                <li>• Qualité et volume des leads</li>
                <li>• <Link href="/ressources/guide-prospection" className="text-mint-green hover:underline">Scripts et méthodes</Link></li>
                <li>• Suivi et relance prospects</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-ink dark:text-primary-bg mb-3">
                Négociation & Closing
              </h3>
              <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-2">
                <li>• <Link href="/ressources/outil-preparation-rdv" className="text-mint-green hover:underline">Préparation des RDV</Link></li>
                <li>• <Link href="/ressources/guide-closing" className="text-mint-green hover:underline">Techniques de closing</Link></li>
                <li>• Traitement des objections</li>
                <li>• Taux de conversion actuel</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-ink dark:text-primary-bg mb-3">
                Suivi & Performance
              </h3>
              <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-2">
                <li>• <Link href="/ressources/kit-gestion-grands-comptes" className="text-mint-green hover:underline">Gestion portefeuille clients</Link></li>
                <li>• Indicateurs de performance</li>
                <li>• Cycle de vente moyen</li>
                <li>• Fidélisation et upselling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-12">
            Retours Après Diagnostic
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-xl p-6">
              <blockquote className="text-lg text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                "Le diagnostic de Laurent a été révélateur. En 30 minutes, il a identifié précisément 
                nos blocages et nous a donné un plan d'action concret. Résultat : +40% de CA en 6 mois !"
              </blockquote>
              <div className="text-mint-green font-semibold">
                Directrice PME Services • 12 collaborateurs
              </div>
            </div>

            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-xl p-6">
              <blockquote className="text-lg text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                "Diagnostic gratuit qui vaut de l'or ! Laurent nous a aidés à restructurer notre approche 
                commerciale. Nos équipes sont maintenant beaucoup plus efficaces."
              </blockquote>
              <div className="text-mint-green font-semibold">
                CEO PME Industrie • 25 collaborateurs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Transformez Votre Performance Commerciale
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez les centaines de PME qui ont déjà bénéficié de l'expertise de 
            <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline"> Laurent Serre</Link> 
            pour développer leur chiffre d'affaires.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#diagnostic-form" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Calendar className="w-5 h-5 mr-2" />
              Réserver Maintenant
            </a>
            <Link href="/formation-commerciale-pme" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <ArrowRight className="w-5 h-5 mr-2" />
              Découvrir Nos Formations
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
            <div className="flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>Disponible aussi sur Montpellier</span>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>Réponse garantie sous 24h</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DiagnosticPage; 