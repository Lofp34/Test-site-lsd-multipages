import type { Metadata } from 'next';
import { Phone, Mail, MessageSquare, Download, CheckCircle, ArrowRight, Target, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Scripts de Prospection IMPACT et AIDA+ | Laurent Serre',
  description: 'Téléchargez nos scripts de prospection éprouvés : méthodes IMPACT et AIDA+ pour transformer vos appels à froid et emails de prospection.',
  keywords: 'scripts prospection, IMPACT, AIDA+, appels à froid, emails prospection, scripts téléphoniques, prospection commerciale',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/scripts-prospection',
  },
  openGraph: {
    title: 'Scripts de Prospection IMPACT et AIDA+ | Laurent Serre',
    description: 'Scripts de prospection éprouvés pour transformer vos appels à froid et emails de prospection.',
    url: 'https://laurent-serre-developpement.fr/ressources/scripts-prospection',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
};

export default function ScriptsProspectionPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
            <Phone className="w-5 h-5 text-mint-green" />
            <span className="font-title font-semibold text-white">
              Scripts de Prospection
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-title font-extrabold text-white leading-tight mb-6">
            Scripts IMPACT et AIDA+
            <span className="block text-mint-green">Prospection Efficace</span>
          </h1>
          
          <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
            Transformez vos appels à froid et emails de prospection avec nos scripts éprouvés. 
            Méthodes IMPACT et AIDA+ testées sur le terrain par Laurent Serre.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Télécharger les Scripts
            </Link>
            <Link href="/bootcamp" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Zap className="w-5 h-5 mr-2" />
              Formation Bootcamp
            </Link>
          </div>
        </div>
      </section>

      {/* Méthode IMPACT */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Méthode IMPACT
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Structure éprouvée pour vos appels à froid et premiers contacts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">I</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Introduction
              </h3>
              <p className="text-gray-anthracite">
                Présentez-vous clairement et créez un lien de confiance dès les premières secondes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">M</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Motif
              </h3>
              <p className="text-gray-anthracite">
                Expliquez clairement pourquoi vous appelez et l'intérêt pour votre interlocuteur.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">P</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Problème
              </h3>
              <p className="text-gray-anthracite">
                Identifiez un problème courant de votre cible pour créer de l'intérêt.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">A</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Avantage
              </h3>
              <p className="text-gray-anthracite">
                Présentez brièvement comment vous pouvez résoudre ce problème.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">C</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Crédibilité
              </h3>
              <p className="text-gray-anthracite">
                Apportez une preuve sociale ou référence pour légitimer votre approche.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-mint-green">T</span>
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
                Transition
              </h3>
              <p className="text-gray-anthracite">
                Proposez un rendez-vous ou la prochaine étape de manière naturelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Méthode AIDA+ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink mb-6">
              Méthode AIDA+ pour Emails
            </h2>
            <p className="text-xl text-gray-anthracite max-w-3xl mx-auto">
              Structure optimisée pour vos emails de prospection B2B
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Attention
              </h3>
              <p className="text-gray-anthracite mb-4">
                Objet percutant et personnalisé pour maximiser l'ouverture.
              </p>
              <div className="bg-mint-green/10 p-4 rounded-lg">
                <p className="text-sm text-gray-anthracite italic">
                  "Exemple : [Prénom], 3 minutes pour augmenter votre CA de 25% ?"
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Intérêt
              </h3>
              <p className="text-gray-anthracite mb-4">
                Créez de l'intérêt avec un bénéfice concret et mesurable.
              </p>
              <div className="bg-mint-green/10 p-4 rounded-lg">
                <p className="text-sm text-gray-anthracite italic">
                  "Nos clients PME augmentent leur taux de conversion de 40% en moyenne..."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Désir
              </h3>
              <p className="text-gray-anthracite mb-4">
                Renforcez le désir avec des preuves sociales et témoignages.
              </p>
              <div className="bg-mint-green/10 p-4 rounded-lg">
                <p className="text-sm text-gray-anthracite italic">
                  "Comme [Entreprise similaire], qui a doublé ses ventes en 6 mois..."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <ArrowRight className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
                Action+
              </h3>
              <p className="text-gray-anthracite mb-4">
                Call-to-action clair avec proposition de valeur immédiate.
              </p>
              <div className="bg-mint-green/10 p-4 rounded-lg">
                <p className="text-sm text-gray-anthracite italic">
                  "15 minutes d'échange pour identifier vos 3 leviers prioritaires ?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Téléchargez Vos Scripts Maintenant
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Accédez immédiatement à nos scripts complets avec exemples concrets et variantes sectorielles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Télécharger les Scripts
            </Link>
            <Link href="/ressources/guide-prospection" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Guide Prospection Complet
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}