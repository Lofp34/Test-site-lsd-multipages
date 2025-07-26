import type { Metadata } from 'next';
import { ArrowLeft, Award, Target, Brain, Zap, CheckCircle, TrendingUp, Star, Crown, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guide Ultime du Closing | Laurent Serre Développement',
  description: 'Maîtrisez l\'art du closing et les techniques avancées pour conclure plus d\'affaires avec confiance et efficacité.',
  keywords: 'closing, techniques de vente, négociation, conclure une vente, commercial, closing commercial',
  alternates: {
    canonical: 'https://laurentserre.com/ressources/guide-closing',
  },
};

export default function GuideClosingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/ressources" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux ressources
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
              <Crown className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-mint-green">
                Guide Exclusif • Techniques de Closing
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Le Guide Ultime du
              <span className="block text-mint-green">Closing</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Transformez vos entretiens commerciaux en succès garantis grâce aux techniques de closing les plus efficaces.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6 flex items-center">
              <Crown className="w-8 h-8 text-mint-green mr-3" />
              Le Closing : L'Art de Conclure
            </h2>
            <p className="text-lg text-gray-anthracite mb-4">
              Le closing n'est pas de la manipulation, c'est un service rendu au client. C'est l'art de l'accompagner 
              vers la décision qui va résoudre son problème.
            </p>
            <p className="text-lg text-gray-anthracite">
              Ce guide vous révèle les <strong className="text-mint-green">7 techniques de closing</strong> qui transformeront 
              vos entretiens commerciaux en succès mesurables.
            </p>
          </div>
        </section>

        {/* Chapitre 1 - Mindset */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">1</span>
            Le Mindset du Closer
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4">
                🧠 Les 4 Piliers Mentaux du Closing
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-ink">Confiance Absolue</h4>
                      <p className="text-sm text-gray-anthracite">
                        Vous devez être 100% convaincu que votre solution est LA solution pour votre prospect.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-ink">Détachement du Résultat</h4>
                      <p className="text-sm text-gray-anthracite">
                        Paradoxalement, moins vous avez besoin de vendre, plus vous vendez.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-ink">Focus sur la Valeur</h4>
                      <p className="text-sm text-gray-anthracite">
                        Concentrez-vous sur ce que le client va gagner, pas sur ce que vous allez vendre.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-ink">Patience Active</h4>
                      <p className="text-sm text-gray-anthracite">
                        Savoir attendre le bon moment tout en guidant subtilement vers la décision.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapitre 2 - Les 7 Techniques */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">2</span>
            Les 7 Techniques de Closing Avancées
          </h2>
          
          <div className="space-y-8">
            {/* Technique 1 */}
            <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl p-6">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">1</span>
                Le Closing Assumé
              </h3>
              <p className="text-gray-anthracite mb-4">
                Agissez comme si la vente était déjà acquise et posez des questions de mise en œuvre.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-mono text-sm">
                  <strong className="text-mint-green">Exemple :</strong> "Alors, pour la mise en route, vous préférez qu'on commence 
                  lundi prochain ou la semaine suivante ?"
                </p>
              </div>
            </div>

            {/* Technique 2 */}
            <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 rounded-xl p-6">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">2</span>
                Le Closing Alternatif
              </h3>
              <p className="text-gray-anthracite mb-4">
                Proposez deux options qui mènent toutes les deux à la vente.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-mono text-sm">
                  <strong className="text-mint-green">Exemple :</strong> "Vous préférez la formule Premium avec tout inclus 
                  ou la formule Standard que vous pourrez faire évoluer ?"
                </p>
              </div>
            </div>

            {/* Technique 3 */}
            <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl p-6">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">3</span>
                Le Closing d'Urgence
              </h3>
              <p className="text-gray-anthracite mb-4">
                Créez une raison légitime d'agir maintenant (sans pression artificielle).
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-mono text-sm">
                  <strong className="text-mint-green">Exemple :</strong> "On a 2 places disponibles pour le démarrage de janvier. 
                  Après, ce sera mars au minimum..."
                </p>
              </div>
            </div>

            {/* Technique 4 */}
            <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 rounded-xl p-6">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">4</span>
                Le Closing Émotionnel
              </h3>
              <p className="text-gray-anthracite mb-4">
                Reconnectez avec l'émotion et les conséquences de l'inaction.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-mono text-sm">
                  <strong className="text-mint-green">Exemple :</strong> "Vous m'avez dit que ne pas atteindre vos objectifs 
                  cette année remettrait en question votre poste. On est d'accord ?"
                </p>
              </div>
            </div>

            {/* Technique 5 */}
            <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl p-6">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">5</span>
                Le Closing Récapitulatif
              </h3>
              <p className="text-gray-anthracite mb-4">
                Résumez tous les bénéfices convenus et demandez la décision.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-mono text-sm">
                  <strong className="text-mint-green">Exemple :</strong> "Récapitulons : vous allez économiser 50K€/an, 
                  gagner 15h/semaine et résoudre vos problèmes de stock. On démarre quand ?"
                </p>
              </div>
            </div>

            {/* Technique 6 */}
            <div className="bg-gradient-to-r from-blue-ink/10 to-mint-green/10 rounded-xl p-6">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">6</span>
                Le Closing Silencieux
              </h3>
              <p className="text-gray-anthracite mb-4">
                Après votre question de closing, fermez-vous et laissez le client réfléchir.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-mono text-sm">
                  <strong className="text-mint-green">Règle d'or :</strong> Celui qui parle en premier après la question 
                  de closing perd la négociation.
                </p>
              </div>
            </div>

            {/* Technique 7 */}
            <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/10 rounded-xl p-6">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <span className="bg-mint-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">7</span>
                Le Closing Objection
              </h3>
              <p className="text-gray-anthracite mb-4">
                Anticipez l'objection et proposez une solution avant qu'elle ne soit formulée.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-mono text-sm">
                  <strong className="text-mint-green">Exemple :</strong> "Je sens que vous vous dites que c'est un investissement 
                  important. C'est normal, et c'est justement pourquoi on propose un paiement en 3 fois."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapitre 3 - Gérer les Objections */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">3</span>
            Gérer les Objections comme un Pro
          </h2>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="text-xl font-title font-semibold text-blue-ink mb-6">
              🛡️ La Méthode AREA
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">A - Accueillir</h4>
                  <p className="text-sm text-gray-anthracite">
                    "Je comprends votre préoccupation, c'est légitime..."
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">R - Reformuler</h4>
                  <p className="text-sm text-gray-anthracite">
                    "Si je comprends bien, vous vous demandez si..."
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">E - Élargir</h4>
                  <p className="text-sm text-gray-anthracite">
                    "Qu'est-ce qui vous fait dire ça ? Avez-vous déjà vécu..."
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-mint-green mb-2">A - Apporter la solution</h4>
                  <p className="text-sm text-gray-anthracite">
                    "Justement, c'est exactement pour ça que..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapitre 4 - Signaux d'Achat */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">4</span>
            Détecter les Signaux d'Achat
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-title font-semibold text-blue-ink mb-4">
                🗣️ Signaux Verbaux
              </h3>
              <ul className="space-y-2 text-sm text-gray-anthracite">
                <li>• "Et si on..."</li>
                <li>• "Quand est-ce que..."</li>
                <li>• "Comment ça marche..."</li>
                <li>• "Mes équipes vont..."</li>
                <li>• "On pourrait..."</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-title font-semibold text-blue-ink mb-4">
                👁️ Signaux Non-Verbaux
              </h3>
              <ul className="space-y-2 text-sm text-gray-anthracite">
                <li>• Se penche vers vous</li>
                <li>• Prend des notes</li>
                <li>• Pose des questions détaillées</li>
                <li>• Regarde sa montre/agenda</li>
                <li>• Sourit et acquiesce</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-title font-semibold text-blue-ink mb-4">
                🎯 Signaux Comportementaux
              </h3>
              <ul className="space-y-2 text-sm text-gray-anthracite">
                <li>• Partage des informations confidentielles</li>
                <li>• Introduit d'autres décideurs</li>
                <li>• Parle de budget spontanément</li>
                <li>• Évoque des délais précis</li>
                <li>• Demande des références</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Plan d'Action */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-mint-green/10 to-blue-ink/10 rounded-2xl p-8">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-6 text-center">
              🎯 Votre Plan d'Entraînement Closing
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-title font-semibold text-mint-green mb-4">Semaine 1-2 : Bases</h3>
                <ul className="space-y-2 text-sm text-gray-anthracite">
                  <li>• Travailler votre mindset</li>
                  <li>• Préparer vos scripts de closing</li>
                  <li>• Identifier vos propres signaux d'achat</li>
                  <li>• Filmer 3 entretiens pour analyse</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-title font-semibold text-mint-green mb-4">Semaine 3-4 : Perfectionnement</h3>
                <ul className="space-y-2 text-sm text-gray-anthracite">
                  <li>• Tester les 7 techniques</li>
                  <li>• Maîtriser la méthode AREA</li>
                  <li>• Analyser vos succès et échecs</li>
                  <li>• Mesurer votre taux de transformation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-blue-ink rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-title font-bold mb-4">
              Prêt à devenir un Closer d'exception ?
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Le closing s'apprend, se perfectionne et se maîtrise. Avec un accompagnement personnalisé, 
              vous pouvez doubler votre taux de transformation en 60 jours.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Booster mon closing
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}