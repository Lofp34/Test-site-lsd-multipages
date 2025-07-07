import type { Metadata } from 'next';
import { ArrowLeft, Briefcase, CheckCircle, Target, Users, Calendar, FileText, Star, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Outil Préparation RDV Commercial | Laurent Serre Développement',
  description: 'Préparez vos rendez-vous commerciaux comme un pro avec notre checklist complète. Ne laissez plus rien au hasard avant un entretien clé.',
  keywords: 'préparation rdv commercial, checklist entretien commercial, préparation rendez-vous client, outils commercial, techniques de vente',
  authors: [{ name: 'Laurent Serre' }],
  alternates: {
    canonical: 'https://laurentserre.com/ressources/outil-preparation-rdv',
  },
  openGraph: {
    title: 'Outil Préparation RDV Commercial | Laurent Serre Développement',
    description: 'Préparez vos rendez-vous commerciaux comme un pro avec notre checklist complète. Ne laissez plus rien au hasard avant un entretien clé.',
    url: 'https://laurentserre.com/ressources/outil-preparation-rdv',
    type: 'article',
    locale: 'fr_FR',
    siteName: 'Laurent Serre Développement',
    images: [
      {
        url: 'https://laurentserre.com/laurent.jpg',
        width: 1200,
        height: 630,
        alt: 'Outil de préparation RDV commercial Laurent Serre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outil Préparation RDV Commercial | Laurent Serre Développement',
    description: 'Préparez vos rendez-vous commerciaux comme un pro avec notre checklist complète.',
    images: ['https://laurentserre.com/laurent.jpg'],
    creator: '@laurentserre',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OutilPreparationRDVPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-anthracite">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/ressources" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux ressources
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
              <Briefcase className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-mint-green">
                Outil Professionnel • Préparation RDV
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Outil de Préparation
              <span className="block text-mint-green">RDV Commercial</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Ne laissez plus rien au hasard avant vos entretiens commerciaux. Préparez-vous comme un pro avec notre checklist complète.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-slate-50 dark:bg-gray-anthracite/20 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6 flex items-center">
              <Target className="w-8 h-8 text-mint-green mr-3" />
              La Préparation : Clé du Succès Commercial
            </h2>
            <p className="text-lg text-gray-anthracite dark:text-primary-bg/80 mb-4">
              "Un RDV bien préparé, c'est 80% du succès assuré." Cette phrase résume 20 ans d'expérience terrain. 
              La différence entre un commercial moyen et un top performer ? La préparation.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-white dark:bg-gray-anthracite/10 rounded-xl">
                <div className="text-3xl font-bold text-mint-green mb-2">85%</div>
                <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">des RDV ratés sont dus à une mauvaise préparation</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-anthracite/10 rounded-xl">
                <div className="text-3xl font-bold text-mint-green mb-2">3x</div>
                <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">plus de chances de conclure avec une bonne préparation</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-anthracite/10 rounded-xl">
                <div className="text-3xl font-bold text-mint-green mb-2">30min</div>
                <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">de préparation suffisent pour faire la différence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist Complète */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <CheckCircle className="w-8 h-8 text-mint-green mr-3" />
            Checklist Complète de Préparation
          </h2>
          
          <div className="space-y-8">
            {/* Phase 1 - Recherche */}
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">1</span>
                Recherche et Renseignement (J-3 à J-1)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-mint-green mb-3">📊 Entreprise</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Chiffre d'affaires et effectifs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Actualités récentes (presse, réseaux sociaux)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Concurrents principaux</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Challenges sectoriels</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-mint-green mb-3">👤 Contact</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Profil LinkedIn complet</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Parcours professionnel</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Centres d'intérêt</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Références communes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 2 - Préparation */}
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">2</span>
                Préparation Stratégique (J-1)
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-gray-anthracite/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">🎯 Objectifs du RDV</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Objectif principal (ex: identifier le besoin)</li>
                    <li>• Objectif secondaire (ex: rencontrer le décideur)</li>
                    <li>• Objectif minimum (ex: fixer le prochain RDV)</li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-gray-anthracite/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">❓ Questions Clés</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 5 questions de découverte préparées</li>
                    <li>• 3 questions d'approfondissement</li>
                    <li>• 2 questions de closing</li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-gray-anthracite/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">📋 Supports</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Présentation personnalisée</li>
                    <li>• Cas clients similaires</li>
                    <li>• Proposition de valeur adaptée</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 3 - Jour J */}
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">3</span>
                Jour J - Avant le RDV
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-mint-green mb-3">⏰ 2h avant</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Relire le dossier complet</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Vérifier le matériel (ordina, démo, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Calculer le temps de trajet</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-mint-green mb-3">📱 30min avant</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Confirmer le RDV par SMS</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Vérifier sa tenue</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-mint-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Se mettre en condition mentale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Questions Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <FileText className="w-8 h-8 text-mint-green mr-3" />
            Bank de Questions Types
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-title font-semibold text-mint-green mb-4">🔍 Questions de Découverte</h3>
              <ul className="space-y-3 text-sm">
                <li className="bg-slate-50 dark:bg-gray-anthracite/20 p-3 rounded-lg">
                  "Comment fonctionne actuellement votre processus commercial ?"
                </li>
                <li className="bg-slate-50 dark:bg-gray-anthracite/20 p-3 rounded-lg">
                  "Quels sont vos principaux défis en matière de développement commercial ?"
                </li>
                <li className="bg-slate-50 dark:bg-gray-anthracite/20 p-3 rounded-lg">
                  "Que se passerait-il si vous ne réglez pas cette problématique ?"
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-title font-semibold text-mint-green mb-4">🎯 Questions d'Approfondissement</h3>
              <ul className="space-y-3 text-sm">
                <li className="bg-slate-50 dark:bg-gray-anthracite/20 p-3 rounded-lg">
                  "Pouvez-vous me donner un exemple concret de cette situation ?"
                </li>
                <li className="bg-slate-50 dark:bg-gray-anthracite/20 p-3 rounded-lg">
                  "Qu'avez-vous déjà essayé pour résoudre ce problème ?"
                </li>
                <li className="bg-slate-50 dark:bg-gray-anthracite/20 p-3 rounded-lg">
                  "Qui d'autre est impliqué dans cette décision ?"
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Scénarios Difficiles */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <AlertCircle className="w-8 h-8 text-mint-green mr-3" />
            Gérer les Situations Difficiles
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-title font-semibold text-red-500 mb-3">😤 "Je n'ai que 10 minutes"</h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-3">
                <strong>Réaction :</strong> "Parfait, j'ai justement 3 questions essentielles à vous poser. Cela nous permettra de voir si on peut vous aider efficacement."
              </p>
              <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                <strong>Stratégie :</strong> Poser les questions les plus importantes et proposer un RDV de suivi.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-title font-semibold text-red-500 mb-3">💰 "C'est trop cher"</h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-3">
                <strong>Réaction :</strong> "Je comprends cette réaction. Dites-moi, par rapport à quoi trouvez-vous cela cher ?"
              </p>
              <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                <strong>Stratégie :</strong> Creuser l'objection et ramener sur la valeur plutôt que sur le prix.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-title font-semibold text-red-500 mb-3">🤔 "On va réfléchir"</h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-3">
                <strong>Réaction :</strong> "Bien sûr. À quoi précisément souhaitez-vous réfléchir ? Peut-être puis-je vous aider à clarifier certains points ?"
              </p>
              <p className="text-sm text-gray-anthracite dark:text-primary-bg/80">
                <strong>Stratégie :</strong> Identifier les vraies objections et proposer un processus de décision.
              </p>
            </div>
          </div>
        </section>

        {/* Template de Suivi */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
            <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6 text-center">
              📧 Template de Suivi Post-RDV
            </h2>
            
            <div className="bg-white dark:bg-gray-anthracite/20 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="font-mono text-sm space-y-4">
                <div>
                  <strong>Objet :</strong> Merci pour votre temps - [Nom de l'entreprise]
                </div>
                <div>
                  <strong>Bonjour [Prénom],</strong>
                </div>
                <div>
                  Merci pour l'échange d'aujourd'hui. J'ai été ravi de découvrir vos enjeux concernant [problématique identifiée].
                </div>
                <div>
                  Pour résumer notre échange :
                  <br />• Votre défi principal : [défi identifié]
                  <br />• Votre objectif : [objectif mentionné]
                  <br />• Votre deadline : [timing évoqué]
                </div>
                <div>
                  Comme convenu, je vous envoie [document/proposition mentionné].
                </div>
                <div>
                  Prochaine étape : [action définie ensemble]
                </div>
                <div>
                  Excellente journée,
                  <br />[Votre signature]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-blue-ink rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-title font-bold mb-4">
              Prêt à transformer vos RDV commerciaux ?
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Cette checklist n'est qu'un début. Découvrez comment préparer et mener des entretiens commerciaux 
              qui convertissent à plus de 80%.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Maîtriser l'art du RDV commercial
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}