import type { Metadata } from 'next';
import { ArrowLeft, Download, Target, Users, Phone, Mail, Calendar, CheckCircle, TrendingUp, Star, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guide Ultime de la Prospection | Laurent Serre Développement',
  description: 'Découvrez les techniques et stratégies avancées de prospection commerciale pour générer des leads qualifiés et développer votre chiffre d\'affaires.',
  keywords: 'prospection commerciale, génération de leads, développement commercial, techniques de vente, stratégie commerciale',
  alternates: {
    canonical: 'https://laurentserre.com/ressources/guide-prospection',
  },
};

export default function GuideProspectionPage() {
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
              <Target className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-mint-green">
                Guide Exclusif • Prospection Commerciale
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Le Guide Ultime de la
              <span className="block text-mint-green">Prospection</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Maîtrisez l'art de la prospection commerciale et transformez votre approche pour générer des leads qualifiés de manière constante.
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
              <Award className="w-8 h-8 text-mint-green mr-3" />
              Pourquoi ce guide ?
            </h2>
            <p className="text-lg text-gray-anthracite dark:text-primary-bg/80 mb-4">
              Après 20 ans dans le développement commercial, j'ai accompagné des centaines d'entrepreneurs et de commerciaux. 
              Le constat est toujours le même : la prospection est leur plus grand défi.
            </p>
            <p className="text-lg text-gray-anthracite dark:text-primary-bg/80">
              Ce guide compile les meilleures techniques et stratégies que j'ai testées et validées sur le terrain pour vous aider à 
              <strong className="text-mint-green"> multiplier vos résultats de prospection par 3 en 90 jours.</strong>
            </p>
          </div>
        </section>

        {/* Chapitre 1 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">1</span>
            Mindset et Préparation
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4">
                🧠 Le Mindset du Prospecteur de Haut Niveau
              </h3>
              <ul className="space-y-3 text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Rejet = Redirection :</strong> Chaque "non" vous rapproche du "oui" qui compte vraiment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Valeur avant vente :</strong> Apportez de la valeur dès le premier contact</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Régularité = Résultats :</strong> 1h de prospection quotidienne vaut mieux que 8h une fois par mois</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4">
                🎯 Définir votre Persona Idéal
              </h3>
              <div className="space-y-4">
                <p className="text-gray-anthracite dark:text-primary-bg/80">
                  <strong>La règle des 3D :</strong> Définissez précisément qui vous voulez cibler
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-gray-anthracite/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Démographique</h4>
                    <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                      <li>• Secteur d'activité</li>
                      <li>• Taille d'entreprise</li>
                      <li>• Chiffre d'affaires</li>
                      <li>• Localisation</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 dark:bg-gray-anthracite/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Décisionnel</h4>
                    <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                      <li>• Poste occupé</li>
                      <li>• Pouvoir de décision</li>
                      <li>• Budget disponible</li>
                      <li>• Processus d'achat</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 dark:bg-gray-anthracite/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-ink dark:text-primary-bg mb-2">Défi</h4>
                    <ul className="text-sm text-gray-anthracite dark:text-primary-bg/80 space-y-1">
                      <li>• Problèmes rencontrés</li>
                      <li>• Objectifs à atteindre</li>
                      <li>• Conséquences de l'inaction</li>
                      <li>• Urgence de la situation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapitre 2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">2</span>
            Les 7 Canaux de Prospection
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-mint-green mr-3" />
                <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg">Prospection Téléphonique</h3>
              </div>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Le canal le plus direct et efficace pour créer du lien humain.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span><strong>Taux de conversion :</strong> 2-5%</span>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                  <span><strong>Meilleur créneau :</strong> 9h-11h et 14h-16h</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-mint-green mr-3" />
                <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg">Email Marketing</h3>
              </div>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Scalable et mesurable, idéal pour les approches éducatives.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span><strong>Taux d'ouverture :</strong> 20-35%</span>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                  <span><strong>Meilleur jour :</strong> Mardi et Mercredi</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-mint-green mr-3" />
                <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg">LinkedIn</h3>
              </div>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Le réseau social B2B par excellence pour les décideurs.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span><strong>Taux de réponse :</strong> 10-15%</span>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                  <span><strong>Astuce :</strong> Interagir avant de contacter</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-mint-green mr-3" />
                <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg">Événements Networking</h3>
              </div>
              <p className="text-gray-anthracite dark:text-primary-bg/80 mb-4">
                Rencontres physiques pour créer des relations durables.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span><strong>Qualité :</strong> Très élevée</span>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                  <span><strong>ROI :</strong> Long terme mais excellent</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapitre 3 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">3</span>
            Scripts et Templates Éprouvés
          </h2>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl p-6">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4">
                📞 Script d'Approche Téléphonique "IMPACT"
              </h3>
              <div className="bg-white dark:bg-gray-anthracite/20 rounded-lg p-4 font-mono text-sm">
                <p className="mb-2"><strong className="text-mint-green">Introduction :</strong> "Bonjour [Prénom], je suis [Votre nom] de [Entreprise]."</p>
                <p className="mb-2"><strong className="text-mint-green">Motif :</strong> "Je vous appelle car j'ai remarqué que [observation pertinente]."</p>
                <p className="mb-2"><strong className="text-mint-green">Permission :</strong> "Avez-vous 2 minutes pour que je vous explique pourquoi ?"</p>
                <p className="mb-2"><strong className="text-mint-green">Accroche :</strong> "J'aide les [persona] à [bénéfice principal] sans [objection principale]."</p>
                <p className="mb-2"><strong className="text-mint-green">Curiosité :</strong> "Par exemple, [client similaire] a obtenu [résultat concret]."</p>
                <p><strong className="text-mint-green">Transition :</strong> "Ça vous intéresse d'en savoir plus ?"</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 rounded-xl p-6">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4">
                ✉️ Template Email "AIDA+"
              </h3>
              <div className="bg-white dark:bg-gray-anthracite/20 rounded-lg p-4 space-y-3">
                <div>
                  <strong className="text-mint-green">Objet :</strong> [Prénom], 3 questions sur [leur défi]
                </div>
                <div>
                  <strong className="text-mint-green">Attention :</strong> Personnalisation basée sur leur actualité
                </div>
                <div>
                  <strong className="text-mint-green">Intérêt :</strong> Statistique ou insight surprenant
                </div>
                <div>
                  <strong className="text-mint-green">Désir :</strong> Bénéfice tangible avec preuve sociale
                </div>
                <div>
                  <strong className="text-mint-green">Action :</strong> CTA simple et spécifique
                </div>
                <div>
                  <strong className="text-mint-green">+ Valeur :</strong> Ressource gratuite en P.J.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapitre 4 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">4</span>
            Système de Suivi et Mesure
          </h2>
          
          <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
            <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-6">
              📊 Tableau de Bord Prospection
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-mint-green mb-3">Indicateurs d'Activité</h4>
                <ul className="space-y-2 text-gray-anthracite dark:text-primary-bg/80">
                  <li>• Nombre de contacts par jour</li>
                  <li>• Taux de joignabilité</li>
                  <li>• Temps moyen par contact</li>
                  <li>• Nombre de follow-up</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-mint-green mb-3">Indicateurs de Performance</h4>
                <ul className="space-y-2 text-gray-anthracite dark:text-primary-bg/80">
                  <li>• Taux de conversion en RDV</li>
                  <li>• Taux de transformation RDV → Vente</li>
                  <li>• Panier moyen par prospect</li>
                  <li>• ROI par canal</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Plan d'Action */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
            <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-6 text-center">
              🚀 Votre Plan d'Action des 30 Premiers Jours
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-anthracite/20 rounded-xl p-6">
                <h3 className="text-lg font-title font-semibold text-mint-green mb-4">Semaine 1-2</h3>
                <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                  <li>• Définir votre persona idéal</li>
                  <li>• Créer votre base de prospects</li>
                  <li>• Préparer vos scripts</li>
                  <li>• Tester sur 10 prospects</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-anthracite/20 rounded-xl p-6">
                <h3 className="text-lg font-title font-semibold text-mint-green mb-4">Semaine 3-4</h3>
                <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                  <li>• Optimiser selon les retours</li>
                  <li>• Augmenter à 25 contacts/jour</li>
                  <li>• Mettre en place le suivi</li>
                  <li>• Mesurer les premiers résultats</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-anthracite/20 rounded-xl p-6">
                <h3 className="text-lg font-title font-semibold text-mint-green mb-4">Mois 2-3</h3>
                <ul className="space-y-2 text-sm text-gray-anthracite dark:text-primary-bg/80">
                  <li>• Industrialiser le processus</li>
                  <li>• Automatiser ce qui peut l'être</li>
                  <li>• Analyser et ajuster</li>
                  <li>• Célébrer vos succès !</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-blue-ink rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-title font-bold mb-4">
              Prêt à transformer votre prospection ?
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Ce guide n'est que le début. Pour un accompagnement personnalisé et des résultats encore plus rapides, 
              découvrez mes programmes d'accompagnement.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Discutons de votre projet
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}