import type { Metadata } from 'next';
import { Linkedin, Users, MessageSquare, TrendingUp, CheckCircle, ArrowRight, Target, Share2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LinkedIn et Réseaux Sociaux pour PME | Guide Prospection | Laurent Serre',
  description: 'Guide complet LinkedIn et réseaux sociaux pour PME. Stratégies de prospection, templates de messages et techniques éprouvées.',
  keywords: 'LinkedIn PME, prospection LinkedIn, réseaux sociaux B2B, social selling, prospection digitale, LinkedIn Sales Navigator',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurent-serre-developpement.fr/ressources/linkedin-prospection',
  },
  openGraph: {
    title: 'LinkedIn et Réseaux Sociaux pour PME | Laurent Serre',
    description: 'Guide complet LinkedIn et réseaux sociaux pour PME. Stratégies de prospection et techniques éprouvées.',
    url: 'https://laurent-serre-developpement.fr/ressources/linkedin-prospection',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
  },
};

export default function LinkedinProspectionPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-anthracite">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
            <Linkedin className="w-5 h-5 text-mint-green" />
            <span className="font-title font-semibold text-white">
              LinkedIn & Réseaux Sociaux
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-title font-extrabold text-white leading-tight mb-6">
            LinkedIn et Réseaux Sociaux
            <span className="block text-mint-green">Guide PME</span>
          </h1>
          
          <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8">
            Transformez LinkedIn en machine à prospects pour votre PME. Stratégies, templates et techniques 
            éprouvées pour générer des leads qualifiés via les réseaux sociaux.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Target className="w-5 h-5 mr-2" />
              Audit LinkedIn Gratuit
            </Link>
            <Link href="/bootcamp" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
              <Share2 className="w-5 h-5 mr-2" />
              Formation Social Selling
            </Link>
          </div>
        </div>
      </section>

      {/* Stratégie LinkedIn PME */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Stratégie LinkedIn pour PME
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Approche spécifique aux contraintes et opportunités des PME
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Profil Optimisé PME
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Créez un profil qui attire vos prospects PME cibles.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Titre accrocheur orienté bénéfice
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Résumé centré sur vos clients
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Recommandations clients PME
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Ciblage Précis
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Identifiez et segmentez vos prospects PME efficacement.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Filtres Sales Navigator
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Recherche par secteur/taille
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Identification décideurs
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 border border-mint-green/20">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Messages Personnalisés
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Templates de messages adaptés aux dirigeants PME.
              </p>
              <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Approche consultative
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Références sectorielles
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-mint-green mr-2" />
                  Call-to-action soft
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Templates de Messages */}
      <section className="py-20 bg-slate-50 dark:bg-gray-anthracite/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Templates de Messages LinkedIn
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Messages prêts à utiliser pour différentes situations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Premier Contact
              </h3>
              <div className="bg-mint-green/10 p-6 rounded-lg mb-4">
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  "Bonjour [Prénom],
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  J'ai remarqué que [Entreprise] se développe bien dans [secteur]. 
                  Félicitations pour [actualité/réussite récente] !
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  J'accompagne des dirigeants PME comme vous à [bénéfice spécifique]. 
                  Récemment, [Entreprise similaire] a [résultat concret].
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic">
                  Seriez-vous ouvert à un échange de 15 minutes sur vos enjeux [domaine] ?
                </p>
              </div>
              <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                <strong>Taux de réponse moyen :</strong> 25-30%
              </p>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Relance Soft
              </h3>
              <div className="bg-mint-green/10 p-6 rounded-lg mb-4">
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  "Bonjour [Prénom],
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  Je vous avais contacté il y a quelques semaines concernant [sujet].
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  Entre temps, j'ai aidé [Entreprise similaire] à [résultat récent]. 
                  Cela pourrait vous intéresser ?
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic">
                  Si ce n'est pas le bon moment, n'hésitez pas à me le dire.
                </p>
              </div>
              <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                <strong>Taux de réponse moyen :</strong> 15-20%
              </p>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Partage de Contenu
              </h3>
              <div className="bg-mint-green/10 p-6 rounded-lg mb-4">
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  "Bonjour [Prénom],
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  Je viens de publier une étude sur [sujet pertinent pour sa PME]. 
                  Les résultats pourraient vous intéresser.
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  [Insight clé de l'étude]
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic">
                  Qu'en pensez-vous ? Cela correspond à votre expérience ?
                </p>
              </div>
              <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                <strong>Taux d'engagement :</strong> 35-40%
              </p>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8">
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Référence Commune
              </h3>
              <div className="bg-mint-green/10 p-6 rounded-lg mb-4">
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  "Bonjour [Prénom],
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  [Contact commun] m'a parlé de vos enjeux [domaine] chez [Entreprise].
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic mb-4">
                  J'ai récemment aidé [Entreprise similaire] à [résultat concret] 
                  sur une problématique similaire.
                </p>
                <p className="text-gray-anthracite dark:text-primary-bg/80 italic">
                  Seriez-vous intéressé par un retour d'expérience ?
                </p>
              </div>
              <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                <strong>Taux de réponse moyen :</strong> 45-50%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Autres Réseaux Sociaux */}
      <section className="py-20 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6">
              Autres Réseaux Sociaux B2B
            </h2>
            <p className="text-xl text-gray-anthracite dark:text-primary-bg/80 max-w-3xl mx-auto">
              Diversifiez vos canaux de prospection digitale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Twitter/X
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80">
                Engagement via les discussions sectorielles et partage d'expertise.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                Facebook Groupes
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80">
                Participation active dans les groupes de dirigeants PME.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/40 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-mint-green/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-mint-green" />
              </div>
              <h3 className="text-xl font-title font-bold text-blue-ink dark:text-primary-bg mb-4">
                YouTube
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80">
                Contenu éducatif pour démontrer votre expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-title font-bold text-white mb-6">
            Transformez LinkedIn en Machine à Prospects
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Audit gratuit de votre profil LinkedIn et stratégie personnalisée pour votre PME.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
              <Linkedin className="w-5 h-5 mr-2" />
              Audit LinkedIn Gratuit
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