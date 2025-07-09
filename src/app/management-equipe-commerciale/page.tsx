import type { Metadata } from 'next';
import { ArrowLeft, Users, BarChart, TrendingUp, CheckCircle, Award, Target, Brain, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Management Équipe Commerciale | Formation & Coaching Laurent Serre',
  description: "Développez les compétences de vos managers commerciaux. Formation et coaching pour transformer vos chefs des ventes en leaders inspirants et performants.",
  keywords: 'management commercial, formation manager, coaching chef des ventes, développer compétences managériales, leadership commercial',
  alternates: {
    canonical: 'https://laurentserre.com/management-equipe-commerciale',
  },
};

export default function ManagementEquipeCommercialePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-anthracite">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-ink to-mint-green/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/transformation-commerciale" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à la Transformation Commerciale
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-6 py-3 rounded-full">
              <Users className="w-5 h-5 text-mint-green" />
              <span className="font-title font-semibold text-mint-green">
                Compétence Clé • Management d'Équipe
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Maîtrisez l'Art du
              <span className="block text-mint-green">Management Commercial</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Transformez vos managers en véritables coachs et démultipliez la performance de toute votre force de vente.
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
              Le paradoxe du manager commercial
            </h2>
            <p className="text-lg text-gray-anthracite dark:text-primary-bg/80 mb-4">
              On promeut souvent le meilleur commercial au poste de manager. C'est une erreur classique. Les compétences qui font un excellent vendeur sont rarement celles qui font un grand leader.
            </p>
            <p className="text-lg text-gray-anthracite dark:text-primary-bg/80">
              Le résultat ? Un bon vendeur de moins, et un mauvais manager de plus. Cette page est conçue pour briser ce cycle en vous donnant les clés pour développer un <strong className="text-mint-green">management commercial d'excellence</strong>.
            </p>
          </div>
        </section>

        {/* Chapitre 1 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">1</span>
            Les 5 Chantiers du Manager Performant
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {['Recruter & Intégrer', 'Motiver & Engager', 'Piloter la Performance', 'Former & Coacher', 'Structurer & Organiser'].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
                <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-2">{item}</h3>
                <p className="text-gray-anthracite dark:text-primary-bg/80 text-sm">
                  {
                    [
                      "Attirer les talents et assurer leur montée en puissance rapide.",
                      "Créer un environnement qui stimule la motivation intrinsèque et l'esprit d'équipe.",
                      "Définir des KPIs pertinents et utiliser la data pour prendre des décisions éclairées.",
                      "Faire monter en compétence chaque membre de l'équipe par un suivi individualisé.",
                      "Mettre en place des processus de vente clairs et des outils qui font gagner du temps."
                    ][index]
                  }
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Chapitre 2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">2</span>
            Méthodologie : Développer le Manager-Coach
          </h2>
          <p className="text-lg text-gray-anthracite dark:text-primary-bg/80 mb-8">
            Mon approche vise à transformer le "chef" en "coach". Le manager ne doit plus être celui qui contrôle, mais celui qui élève le niveau de jeu de son équipe. Cela passe par le développement de 4 compétences fondamentales.
          </p>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4">
                <Brain className="inline-block w-6 h-6 mr-2 text-mint-green" />
                Le Leadership Situationnel
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80">
                Adapter son style de management au niveau de maturité et d'autonomie de chaque commercial. Savoir quand diriger, quand coacher, quand supporter et quand déléguer.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4">
                <BarChart className="inline-block w-6 h-6 mr-2 text-mint-green" />
                Le Pilotage par la Donnée
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80">
                Arrêter de manager à l'intuition. Utiliser le CRM et les tableaux de bord non pas pour fliquer, mais pour identifier les axes d'amélioration et objectiver les performances.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4">
                <TrendingUp className="inline-block w-6 h-6 mr-2 text-mint-green" />
                La Culture du Feedback
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80">
                Instaurer des rituels de feedback constructif, qu'ils soient formels (points hebdomadaires) ou informels. Savoir débriefer une vente, qu'elle soit gagnée ou perdue.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4">
                <Shield className="inline-block w-6 h-6 mr-2 text-mint-green" />
                La Posture de "Servant Leader"
              </h3>
              <p className="text-gray-anthracite dark:text-primary-bg/80">
                Le rôle du manager est de protéger son équipe des distractions et de lui fournir les ressources nécessaires pour réussir. Il est au service de la performance de ses commerciaux.
              </p>
            </div>
          </div>
        </section>

        {/* Chapitre 3 */}
        <section className="mb-16">
           <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">3</span>
            Les Rituels du Management d'Excellence
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-anthracite dark:text-primary-bg/80 mb-4">
              La performance managériale repose sur des routines claires et régulières. Voici les 3 rituels que nous mettons en place :
            </p>
            <ul className="space-y-3 text-gray-anthracite dark:text-primary-bg/80">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Le Point Hebdomadaire (1-to-1) :</strong> 30 minutes ciblées sur 3 points : les réussites, les blocages, les priorités de la semaine à venir.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>La Réunion d'Équipe (Sales Meeting) :</strong> Un format dynamique pour partager les victoires, analyser les chiffres clés et lancer des challenges collectifs.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-mint-green mr-3 mt-0.5 flex-shrink-0" />
                <span><strong>Le Coaching sur le Terrain (Shadowing) :</strong> Accompagner un commercial en rendez-vous (ou en écoute téléphonique) pour un débriefing constructif immédiat.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <div className="bg-gradient-to-br from-blue-ink to-blue-ink/95 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-title font-bold text-white mb-4">
              Prêt à former les leaders de demain ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Un management de qualité est le plus grand levier de performance de votre entreprise. Discutons de la manière de le développer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Faire un diagnostic managérial
              </Link>
              <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Discuter d'un plan de formation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 