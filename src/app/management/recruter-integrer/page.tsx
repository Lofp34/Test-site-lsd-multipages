import type { Metadata } from 'next';
import { ArrowLeft, Users, Briefcase, TrendingUp, CheckCircle, Award, Target, UserCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Recruter & Intégrer Vos Commerciaux | Méthode pour Manager',
  description: "Apprenez à recruter les bons profils commerciaux et à construire un processus d'onboarding (intégration) qui garantit leur succès et leur performance rapide.",
  keywords: 'recrutement commercial, onboarding commercial, intégration commercial, recruter vendeur, manager commercial',
  alternates: {
    canonical: 'https://laurentserre.com/management/recruter-integrer',
  },
};

export default function RecruterIntegrerPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/management-equipe-commerciale" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au Management d'Équipe
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
              <Briefcase className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-mint-green">
                Chantier 1 • Recruter & Intégrer
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Recruter et Intégrer :
              <span className="block text-mint-green">Les Piliers de Votre Croissance</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Le succès d'une équipe commerciale commence bien avant la première vente. Il commence par le bon recrutement et un onboarding impeccable.
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
              <Award className="w-8 h-8 text-mint-green mr-3" />
              Le coût d'une erreur de casting
            </h2>
            <p className="text-lg text-gray-anthracite mb-4">
              Un mauvais recrutement coûte cher. Très cher. On estime qu'il représente entre 6 et 18 mois du salaire du poste. Au-delà du coût financier, il y a l'impact sur le moral de l'équipe, la relation client et le temps perdu.
            </p>
            <p className="text-lg text-gray-anthracite
              Cette section vous donne une méthode structurée pour <strong className="text-mint-green">sécuriser vos recrutements</strong> et <strong className="text-mint-green">accélérer la montée en compétence</strong> de vos nouvelles recrues.
            </p>
          </div>
        </section>

        {/* Chapitre 1 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">1</span>
            Définir le Profil Idéal : Au-delà du CV
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4">
                La "Scorecard" du Poste : Votre Boussole
              </h3>
              <p className="text-gray-anthracite mb-4">Avant de chercher, sachez ce que vous voulez trouver. La scorecard définit le succès pour le poste :</p>
              <ul className="space-y-3 text-gray-anthracite
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Mission :</strong> Quelle est la raison d'être du poste ? (Ex: "Développer un portefeuille de nouveaux clients sur le secteur Est").</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Résultats Clés (Outcomes) :</strong> Quels sont les 3 à 5 résultats mesurables attendus après 12 mois ? (Ex: "Atteindre 300k€ de nouveau business signé").</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4">
                Les Compétences Non-Négociables
              </h3>
              <p className="text-gray-anthracite mb-4">L'expérience c'est bien, mais les savoir-être (soft skills) font la différence sur le long terme. Cherchez activement :</p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 p-4 rounded-lg"><strong>Curiosité</strong><p className="text-sm">Veut sincèrement comprendre le problème du client.</p></div>
                <div className="bg-slate-50 p-4 rounded-lg"><strong>Résilience</strong><p className="text-sm">Ne se décourage pas face au "non".</p></div>
                <div className="bg-slate-50 p-4 rounded-lg"><strong>Coachabilité</strong><p className="text-sm">Est ouvert au feedback et cherche à progresser.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapitre 2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">2</span>
            Le Processus d'Onboarding Structuré : Le Plan 30-60-90
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-anthracite mb-4">
              L'intégration est un sprint, pas un marathon. Chaque jour compte. Voici un plan structuré pour garantir le succès.
            </p>
            <div className="border-l-4 border-mint-green pl-6 space-y-8">
              <div>
                <h4 className="font-title font-bold text-xl text-blue-ink mb-2">Jours 1-30 : Immersion & Premières Bases</h4>
                <ul className="space-y-2 text-gray-anthracite
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span>Immersion culturelle : rencontres avec les équipes clés (produit, marketing, support).</span></li>
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span>Formation produit/service intensive.</span></li>
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span>Prise en main des outils (CRM).</span></li>
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span>Premiers appels en écoute (shadowing) avec un commercial senior.</span></li>
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span><strong>Objectif :</strong> Comprendre l'écosystème et le discours.</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-title font-bold text-xl text-blue-ink mb-2">Jours 31-60 : Action & Premiers Feedbacks</h4>
                <ul className="space-y-2 text-gray-anthracite
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span>Lancement des premières actions de prospection.</span></li>
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span>Premiers rendez-vous menés en binôme avec le manager.</span></li>
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span>Points de feedback hebdomadaires structurés.</span></li>
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span><strong>Objectif :</strong> Générer les premières opportunités et itérer sur l'approche.</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-title font-bold text-xl text-blue-ink mb-2">Jours 61-90 : Autonomie & Performance</h4>
                <ul className="space-y-2 text-gray-anthracite
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span>Gestion autonome du cycle de vente sur des prospects qualifiés.</span></li>
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span>Atteinte des premiers objectifs d'activité (KPIs).</span></li>
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span>Bilan de performance des 90 jours et définition du plan de développement.</span></li>
                  <li className="flex"><UserCheck className="w-5 h-5 text-mint-green mr-3 flex-shrink-0" /><span><strong>Objectif :</strong> Devenir un membre contributeur et autonome de l'équipe.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <div className="bg-gradient-to-br from-blue-ink to-blue-ink/95 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-title font-bold text-white mb-4">
              Besoin de structurer votre processus ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Un recrutement et un onboarding réussis sont les investissements les plus rentables que vous puissiez faire. Parlons-en.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Auditer mon processus de recrutement
              </Link>
              <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Discuter avec un expert
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 