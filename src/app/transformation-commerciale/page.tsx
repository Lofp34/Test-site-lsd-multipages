import type { Metadata } from 'next';
import { TrendingUp, Target, Zap, CheckCircle, BarChart, ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transformation Commerciale PME | Laurent Serre - Accompagnement Expert',
  description: 'Transformez votre organisation commerciale PME avec Laurent Serre. Accompagnement complet : diagnostic, stratégie, mise en œuvre. Résultats mesurables garantis.',
  keywords: 'transformation commerciale PME, accompagnement commercial PME, restructuration commerciale, optimisation processus vente, transformation équipe commerciale',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/transformation-commerciale',
  },
  openGraph: {
    title: 'Transformation Commerciale PME | Laurent Serre - Accompagnement Expert',
    description: 'Transformez votre organisation commerciale PME avec un expert. Accompagnement complet et résultats mesurables.',
    url: 'https://laurentserre.com/transformation-commerciale',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TransformationCommercialePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-anthracite">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
              <Award className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-white">
                Transformation Commerciale
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title font-extrabold text-white leading-tight mb-6">
              Transformation
              <span className="block text-mint-green">Commerciale</span>
            </h1>
            
            <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
              <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
              accompagne votre transformation commerciale complète. Du 
              <Link href="/diagnostic" className="text-mint-green hover:underline"> diagnostic initial</Link> à l'implémentation de 
              <Link href="/ressources/outil-strategie-commerciale" className="text-mint-green hover:underline"> stratégies sur-mesure</Link>, 
              des résultats mesurables en moins de 6 mois.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Diagnostic Gratuit
              </Link>
              <Link href="/expert-developpement-commercial-pme" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <TrendingUp className="w-5 h-5 mr-2" />
                Voir l'Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Méthodologie de Transformation
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Une approche structurée en 4 phases pour transformer durablement votre performance commerciale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Phase 1: Diagnostic */}
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center border border-mint-green/20 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-mint-green font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Diagnostic Complet
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-6">
                Audit approfondi de votre organisation, processus et équipes commerciales.
              </p>
              <Link href="/diagnostic" className="inline-flex items-center text-mint-green hover:underline font-semibold">
                Demander un diagnostic <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Phase 2: Stratégie */}
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-mint-green font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Stratégie Sur-Mesure
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-6">
                Conception d'un plan d'action adapté à vos enjeux spécifiques.
              </p>
              <Link href="/ressources/outil-strategie-commerciale" className="inline-flex items-center text-mint-green hover:underline font-semibold">
                Outil stratégie <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Phase 3: Formation */}
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-mint-green font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Formation & Coaching
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-6">
                Développement des compétences et accompagnement terrain.
              </p>
              <Link href="/formation-commerciale-pme" className="inline-flex items-center text-mint-green hover:underline font-semibold">
                Nos formations <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Phase 4: Suivi */}
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-mint-green font-bold text-2xl">4</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Suivi & Optimisation
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-6">
                Mesure des résultats et ajustements pour pérenniser la performance.
              </p>
              <Link href="/suivi-performance" className="inline-flex items-center text-mint-green hover:underline font-semibold">
                Découvrir <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Domaines de Transformation */}
      <section className="py-20 bg-slate-50 dark:bg-gray-anthracite/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Domaines de Transformation
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-2xl mx-auto">
              Une approche globale qui couvre tous les aspects de votre performance commerciale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
                Transformation Organisationnelle
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Structuration équipe commerciale :</strong> Organisation optimale selon vos objectifs et marché
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Processus de vente :</strong> Standardisation et optimisation de votre cycle commercial
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Outils et systèmes :</strong> Implémentation CRM et automatisation adaptés PME
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Management commercial :</strong> Développement des compétences de <Link href="/management-equipe-commerciale" className="text-mint-green hover:underline">management</Link>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
                Transformation Opérationnelle
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Prospection moderne :</strong> Maîtrise des <Link href="/ressources/guide-prospection" className="text-mint-green hover:underline">7 canaux de prospection</Link>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Techniques de closing :</strong> Formation aux <Link href="/ressources/guide-closing" className="text-mint-green hover:underline">méthodes avancées</Link>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Gestion grands comptes :</strong> Développement du <Link href="/ressources/kit-gestion-grands-comptes" className="text-mint-green hover:underline">portefeuille stratégique</Link>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-mint-green mt-1" />
                  <div>
                    <strong>Préparation commerciale :</strong> Optimisation de la <Link href="/ressources/outil-preparation-rdv" className="text-mint-green hover:underline">préparation RDV</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats Transformation */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8">
                Résultats de Transformation
              </h2>
              <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 mb-8">
                Des transformations mesurables et durables pour nos clients PME
              </p>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-mint-green/10 to-transparent p-6 rounded-xl">
                  <div className="text-3xl font-bold text-mint-green mb-2">+26%</div>
                  <div className="text-gray-anthracite dark:text-primary-bg/80">Chiffre d'affaires moyen</div>
                </div>
                <div className="bg-gradient-to-r from-mint-green/10 to-transparent p-6 rounded-xl">
                  <div className="text-3xl font-bold text-mint-green mb-2">-40%</div>
                  <div className="text-gray-anthracite dark:text-primary-bg/80">Cycle de vente</div>
                </div>
                <div className="bg-gradient-to-r from-mint-green/10 to-transparent p-6 rounded-xl">
                  <div className="text-3xl font-bold text-mint-green mb-2">+32%</div>
                  <div className="text-gray-anthracite dark:text-primary-bg/80">Leads qualifiés</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
                Témoignage Transformation
              </h3>
              <blockquote className="text-lg text-gray-anthracite dark:text-primary-bg/80 italic mb-6">
                "En 18 mois, Laurent a complètement transformé notre approche commerciale. 
                Notre équipe est maintenant autonome, notre processus optimisé et notre CA a doublé. 
                Une transformation qui dépasse toutes nos attentes."
              </blockquote>
              <div className="text-mint-green font-semibold">
                Directeur PME Industrie • 45 collaborateurs
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-3">Résultats obtenus :</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mint-green">x2</div>
                    <div className="text-sm">Chiffre d'Affaires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mint-green">+60%</div>
                    <div className="text-sm">Taux Conversion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Expert */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Expert Transformation Commerciale PME
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            <Link href="/expert-developpement-commercial-pme" className="text-mint-green hover:underline">Laurent Serre, expert développement commercial PME</Link>, 
            accompagne votre transformation avec 20 ans d'expérience terrain et des méthodes éprouvées.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Diagnostic Transformation Gratuit
            </Link>
            <Link href="/expert-developpement-commercial-pme" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <BarChart className="w-5 h-5 mr-2" />
              Découvrir l'Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}