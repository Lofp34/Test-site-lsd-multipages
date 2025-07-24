import type { Metadata } from 'next';
import { ArrowLeft, Users, Brain, TrendingUp, UserPlus, MessageSquare, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Former & Coacher l\'Équipe Commerciale | De Manager à Coach',
  description: "Passez du rôle de manager à celui de coach. Découvrez des méthodes pour faire monter en compétence chaque membre de l'équipe par un suivi individualisé et pertinent.",
  keywords: 'coaching commercial, former équipe de vente, coaching manager, faire progresser commerciaux, management coaching',
  alternates: {
    canonical: 'https://laurentserre.com/management/former-coacher',
  },
};

export default function FormerCoacherPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-ink to-emerald-500/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/management-equipe-commerciale" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au Management d'Équipe
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 px-6 py-3 rounded-full">
              <Brain className="w-5 h-5 text-emerald-400" />
              <span className="font-title font-semibold text-emerald-400">
                Chantier 4 • Former & Coacher
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Former et Coacher :
              <span className="block text-emerald-400">Votre Levier de Performance N°1</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Le plus grand atout d'un manager n'est pas sa propre performance, mais sa capacité à rendre les autres meilleurs. Devenez le coach que votre équipe mérite.
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
              <Award className="w-8 h-8 text-emerald-500 mr-3" />
              La différence entre Former et Coacher
            </h2>
            <p className="text-lg text-gray-anthracite mb-4">
              <strong className="text-emerald-500">Former, c'est transmettre un savoir</strong> (ex: la méthode de qualification). C'est essentiel, mais insuffisant.
            </p>
            <p className="text-lg text-gray-anthracite
              <strong className="text-emerald-500">Coacher, c'est aider la personne à trouver ses propres solutions</strong> en posant les bonnes questions. C'est l'art de faire grandir, de développer l'autonomie et la prise de conscience. Un manager performant maîtrise les deux.
            </p>
          </div>
        </section>

        {/* Chapitre 1 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">1</span>
            Les Principes du Manager-Coach
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <MessageSquare className="w-6 h-6 text-emerald-500 mr-3" />
                L'Écoute Active avant le Conseil
              </h3>
              <p className="text-gray-anthracite
                Le réflexe du manager est souvent de donner la solution. Le coach, lui, résiste à cette tentation. Il écoute, reformule et pose des questions ouvertes ("Qu'as-tu essayé ?", "Quelle autre approche pourrais-tu imaginer ?") pour guider le commercial vers sa propre solution.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4 flex items-center">
                <UserPlus className="w-6 h-6 text-emerald-500 mr-3" />
                S'appuyer sur les Forces
              </h3>
              <p className="text-gray-anthracite
                Le coaching est plus efficace quand il vise à amplifier les points forts plutôt qu'à corriger sans cesse les faiblesses. Identifiez le talent unique de chaque membre de l'équipe (le "super-pouvoir") et aidez-le à l'exploiter pleinement.
              </p>
            </div>
          </div>
        </section>

        {/* Chapitre 2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">2</span>
            Le Coaching sur le Terrain : L'Écoute d'Appel
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-anthracite mb-4">
              L'écoute d'un appel (en direct ou enregistré) est l'outil de coaching le plus puissant. Voici comment le rendre efficace et bienveillant.
            </p>
            <div className="border-l-4 border-emerald-500 pl-6 space-y-8">
              <div>
                <h4 className="font-title font-bold text-xl text-blue-ink mb-2">1. L'Auto-Évaluation d'Abord</h4>
                <p className="text-gray-anthracite l'appel, la première question à poser est toujours : "Comment as-tu trouvé que ça s'est passé ?". Laissez le commercial analyser sa propre performance. C'est la première étape de la prise de conscience.</p>
              </div>
              <div>
                <h4 className="font-title font-bold text-xl text-blue-ink mb-2">2. Le Feedback Positif Spécifique</h4>
                <p className="text-gray-anthracite TOUJOURS par ce qui a bien fonctionné. Soyez précis. "J'ai beaucoup aimé la façon dont tu as reformulé son besoin à la 5ème minute" est plus puissant que "Bon appel".</p>
              </div>
              <div>
                <h4 className="font-title font-bold text-xl text-blue-ink mb-2">3. L'Axe de Progression Unique</h4>
                <p className="text-gray-anthracite UN seul point d'amélioration, le plus impactant. "Pour le prochain appel, si tu es d'accord, je te propose de te concentrer sur le fait de poser la question du budget un peu plus tôt. Qu'en penses-tu ?"</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <div className="bg-gradient-to-br from-blue-ink to-blue-ink/95 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-title font-bold text-white mb-4">
              Devenez le leader que votre équipe attend.
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Investir dans vos compétences de coach est le meilleur moyen d'obtenir une performance durable et une équipe autonome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/bootcamp-commercial-intensif" className="inline-flex items-center bg-emerald-500 hover:bg-emerald-500/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <TrendingUp className="w-5 h-5 mr-2" />
                Découvrir le programme du Bootcamp
              </Link>
              <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Demander un coaching personnalisé
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 