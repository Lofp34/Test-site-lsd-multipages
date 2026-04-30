import type { Metadata } from 'next';
import { TrendingUp, Target, CheckCircle, BarChart, ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transformation Commerciale PME | Laurent Serre - Accompagnement Expert',
  description: 'Transformez votre organisation commerciale PME avec Laurent Serre. Accompagnement complet : diagnostic, stratégie, mise en œuvre et suivi terrain.',
  keywords: 'transformation commerciale PME, accompagnement commercial PME, restructuration commerciale, optimisation processus vente, transformation équipe commerciale',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://www.laurentserre.com/transformation-commerciale',
  },
  openGraph: {
    title: 'Transformation Commerciale PME | Laurent Serre - Accompagnement Expert',
    description: 'Transformez votre organisation commerciale PME avec un expert. Accompagnement complet, diagnostic et suivi terrain.',
    url: 'https://www.laurentserre.com/transformation-commerciale',
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
    <main className="flex flex-col min-h-screen bg-white">
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
              un plan d'action commercial plus clair, plus pilotable et mieux suivi dans la durée.
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Méthodologie de Transformation
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Une approche structurée en 4 phases pour transformer durablement votre performance commerciale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Phase 1: Diagnostic */}
            <div className="bg-white rounded-2xl p-8 text-center border border-mint-green/20 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-mint-green font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Diagnostic Complet
              </h3>
              <p className="text-gray-anthracite mb-6">
                Audit approfondi de votre organisation, processus et équipes commerciales.
              </p>
              <Link href="/diagnostic" className="inline-flex items-center text-mint-green hover:underline font-semibold">
                Demander un diagnostic <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Phase 2: Stratégie */}
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-mint-green font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Stratégie Sur-Mesure
              </h3>
              <p className="text-gray-anthracite mb-6">
                Conception d'un plan d'action adapté à vos enjeux spécifiques.
              </p>
              <Link href="/ressources/outil-strategie-commerciale" className="inline-flex items-center text-mint-green hover:underline font-semibold">
                Outil stratégie <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Phase 3: Formation */}
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-mint-green font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Formation & Coaching
              </h3>
              <p className="text-gray-anthracite mb-6">
                Développement des compétences et accompagnement terrain.
              </p>
              <Link href="/formation-commerciale-pme" className="inline-flex items-center text-mint-green hover:underline font-semibold">
                Nos formations <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Phase 4: Suivi */}
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-mint-green font-bold text-2xl">4</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Suivi & Optimisation
              </h3>
              <p className="text-gray-anthracite mb-6">
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
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6">
              Domaines de Transformation
            </h2>
            <p className="text-xl text-gray-anthracite max-w-2xl mx-auto">
              Une approche globale qui couvre tous les aspects de votre performance commerciale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
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
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-title font-bold text-blue-ink mb-8">
                Ce qui se transforme concrètement
              </h2>
              <p className="text-xl text-gray-anthracite mb-8">
                Une transformation commerciale utile ne se résume pas à une moyenne. Elle rend le réel plus lisible et les actions plus suivables.
              </p>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-mint-green/10 to-transparent p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-ink mb-2">Diagnostic plus clair</h3>
                  <div className="text-gray-anthracite">Identifier les vrais blocages : ciblage, qualification, pilotage des opportunités, préparation des rendez-vous ou conclusion des ventes.</div>
                </div>
                <div className="bg-gradient-to-r from-mint-green/10 to-transparent p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-ink mb-2">Plan d'action partagé</h3>
                  <div className="text-gray-anthracite">Transformer les priorités commerciales en rituels, outils et décisions suivies par l'équipe.</div>
                </div>
                <div className="bg-gradient-to-r from-mint-green/10 to-transparent p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-ink mb-2">Pilotage plus exigeant</h3>
                  <div className="text-gray-anthracite">Aider les managers à questionner les opportunités et à faire progresser les gestes commerciaux.</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-6">
                Preuves clients vérifiables
              </h3>
              <p className="text-lg text-gray-anthracite mb-6">
                Les cas clients publics montrent des progressions différentes selon les contextes : structuration du management commercial, meilleure préparation des rendez-vous, clarification du plan de vente et montée en exigence des équipes.
              </p>
              <p className="text-gray-anthracite mb-8">
                Chaque preuve doit rester reliée à son contexte. C'est ce qui la rend utile pour un dirigeant de PME, et lisible pour les moteurs ou assistants IA.
              </p>
              
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-blue-ink mb-3">À lire dans les cas clients :</h4>
                <div className="space-y-3 text-gray-anthracite">
                  <div>• contexte commercial de départ ;</div>
                  <div>• travail mené avec les équipes ;</div>
                  <div>• changement observé après accompagnement ;</div>
                  <div>• vidéo ou témoignage public quand disponible.</div>
                </div>
                <Link href="/cas-clients" className="mt-6 inline-flex items-center text-mint-green hover:underline font-semibold">
                  Voir les cas clients documentés <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
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