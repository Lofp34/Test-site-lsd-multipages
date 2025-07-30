import type { Metadata } from 'next';
import { Users, Target, TrendingUp, CheckCircle, Star, ArrowRight, Award, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Formation Commerciale PME | Laurent Serre - Programmes Sur-Mesure',
  description: 'Formations commerciales adaptées aux PME. Bootcamp intensif, prospection, closing, management. Méthodes terrain éprouvées par Laurent Serre, expert 20 ans.',
  keywords: 'formation commerciale PME, formation vente PME, bootcamp commercial, formation prospection, formation closing, formation équipe commerciale PME',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/formation-commerciale-pme',
  },
  openGraph: {
    title: 'Formation Commerciale PME | Laurent Serre - Programmes Sur-Mesure',
    description: 'Formations commerciales adaptées aux PME. Bootcamp intensif, prospection, closing, management. Méthodes terrain éprouvées.',
    url: 'https://laurentserre.com/formation-commerciale-pme',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FormationCommercialePMEPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
              <Award className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-white">
                Formations Commerciales PME
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
              Formation Commerciale
              <span className="block text-mint-green">PME</span>
            </h1>
            
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial</Link>, 
              conçoit des formations adaptées aux spécificités des PME. Du 
              <Link href="/bootcamp" className="text-mint-green hover:underline"> bootcamp intensif</Link> aux 
              <Link href="/ressources/guide-prospection" className="text-mint-green hover:underline"> ressources pratiques</Link>, 
              transformez vos équipes avec des méthodes terrain éprouvées.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Diagnostic Gratuit
              </Link>
              <Link href="/bootcamp" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Zap className="w-5 h-5 mr-2" />
                Bootcamp Intensif
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Formations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Nos Formations Spécialisées PME
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Des programmes conçus spécifiquement pour répondre aux défis commerciaux des PME
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Bootcamp Commercial Intensif */}
            <div className="bg-white rounded-2xl p-8 border border-mint-green/20 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Bootcamp Commercial Intensif
              </h3>
              <p className="text-gray-anthracite mb-6">
                Formation accélérée de 3 jours pour transformer rapidement vos commerciaux.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/guide-prospection" className="hover:text-mint-green">Prospection moderne</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/guide-closing" className="hover:text-mint-green">Techniques de closing</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/outil-preparation-rdv" className="hover:text-mint-green">Préparation RDV</Link>
                </div>
              </div>
              <Link href="/bootcamp" className="inline-flex items-center text-mint-green hover:underline font-semibold">
                En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Formation Prospection Avancée */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Formation Prospection Avancée
              </h3>
              <p className="text-gray-anthracite mb-6">
                Maîtrisez les 7 canaux de prospection moderne avec notre <Link href="/ressources/guide-prospection" className="text-mint-green hover:underline">guide expert</Link>.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/impact-aida-script-prospection-pme" className="hover:text-mint-green">Scripts IMPACT et AIDA+</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/linkedin-prospection" className="hover:text-mint-green">LinkedIn et réseaux sociaux</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/systeme-suivi-prospects" className="hover:text-mint-green">Système de suivi efficace</Link>
                </div>
              </div>
              <Link href="/ressources/guide-prospection" className="inline-flex items-center text-mint-green hover:underline font-semibold">
                Télécharger le guide <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Formation Management Commercial */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Management Commercial
              </h3>
              <p className="text-gray-anthracite mb-6">
                Développez vos compétences de <Link href="/management-equipe-commerciale" className="text-mint-green hover:underline">manager commercial</Link> pour PME.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/techniques-motivation-equipe" className="hover:text-mint-green">Motivation et coaching</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/suivi-performance" className="hover:text-mint-green">Pilotage performance</Link>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  <Link href="/ressources/guide-recrutement-commercial" className="hover:text-mint-green">Recrutement commercial</Link>
                </div>
              </div>
              <Link href="/management-equipe-commerciale" className="inline-flex items-center text-mint-green hover:underline font-semibold">
                Découvrir <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Techniques de Négociation Avancées */}
      <section className="py-20 bg-gradient-to-r from-mint-green/5 to-blue-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              🎯 Techniques de Négociation Avancées
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Complétez votre formation avec nos guides détaillés sur les techniques de négociation les plus efficaces
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              href="/ressources/techniques-de-negociation/effet-miroir"
              className="group block bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-mint-green/40"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">🪞</span>
                <div>
                  <h3 className="font-title font-bold text-blue-ink group-hover:text-mint-green mb-2">
                    L'effet miroir
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Technique FBI d'empathie tactique pour faire parler et découvrir les vraies motivations
                  </p>
                  <span className="text-mint-green font-semibold text-sm">
                    Guide complet →
                  </span>
                </div>
              </div>
            </Link>
            
            <Link 
              href="/ressources/techniques-de-negociation/negociation-raisonnee"
              className="group block bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-mint-green/40"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">⚖️</span>
                <div>
                  <h3 className="font-title font-bold text-blue-ink group-hover:text-mint-green mb-2">
                    La négociation raisonnée
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Méthode Harvard gagnant-gagnant avec BATNA pour des accords durables
                  </p>
                  <span className="text-mint-green font-semibold text-sm">
                    Guide complet →
                  </span>
                </div>
              </div>
            </Link>
            
            <Link 
              href="/ressources/techniques-de-negociation/silence-strategique"
              className="group block bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-mint-green/40"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">🤫</span>
                <div>
                  <h3 className="font-title font-bold text-blue-ink group-hover:text-mint-green mb-2">
                    Le silence stratégique
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Maîtriser l'art du silence pour créer la tension et obtenir des informations
                  </p>
                  <span className="text-mint-green font-semibold text-sm">
                    Guide complet →
                  </span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/ressources/techniques-de-negociation"
              className="inline-flex items-center bg-blue-ink text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-ink/90 transition-colors"
            >
              Voir toutes les techniques
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ressources Gratuites */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Ressources Formation Gratuites
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Accédez immédiatement à nos outils et guides pratiques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/ressources/guide-prospection" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Guide Ultime de la Prospection
                </h3>
                <p className="text-gray-anthracite mb-4">
                  Méthodes complètes, scripts et système de suivi pour transformer votre prospection.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Télécharger gratuitement <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            <Link href="/ressources/guide-closing" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Guide Ultime du Closing
                </h3>
                <p className="text-gray-anthracite mb-4">
                  7 techniques avancées et méthode AREA pour transformer vos négociations.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Télécharger gratuitement <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            <Link href="/ressources/outil-preparation-rdv" className="group">
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-blue-ink group-hover:text-mint-green mb-3">
                  Outil Préparation RDV
                </h3>
                <p className="text-gray-anthracite mb-4">
                  Checklist complète et questions types pour préparer vos rendez-vous commerciaux.
                </p>
                <div className="flex items-center text-mint-green font-medium">
                  Utiliser l'outil <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Laurent Serre */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Formateur Commercial Expert PME
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
            intervient comme <Link href="/formateur-vente-pme" className="text-mint-green hover:underline">formateur vente spécialisé PME</Link> depuis 20 ans.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Diagnostic Formation Gratuit
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