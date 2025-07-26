import type { Metadata } from 'next';
import { ArrowLeft, Users, Heart, Zap, TrendingUp, Shield, Sun, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Motiver & Engager Vos Équipes Commerciales | Stratégies de Manager',
  description: "Découvrez des stratégies concrètes pour créer un environnement de travail qui stimule la motivation intrinsèque, l'engagement et l'esprit d'équipe de vos commerciaux.",
  keywords: 'motiver équipe commerciale, engager commerciaux, motivation manager, leadership commercial, esprit d\'équipe vente',
  alternates: {
    canonical: 'https://laurentserre.com/management/motiver-engager',
  },
};

export default function MotiverEngagerPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-ink to-amber-500/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/management-equipe-commerciale" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au Management d'Équipe
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-amber-500/10 backdrop-blur-sm border border-amber-500/30 px-6 py-3 rounded-full">
              <Heart className="w-5 h-5 text-amber-500" />
              <span className="font-title font-semibold text-amber-500">
                Chantier 2 • Motiver & Engager
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Motiver et Engager :
              <span className="block text-amber-400">Le Carburant de la Performance</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              La rémunération est un facteur d'hygiène, pas de motivation. Créez un environnement qui donne envie à votre équipe de se dépasser, ensemble.
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
              <Zap className="w-8 h-8 text-amber-500 mr-3" />
              Au-delà de la carotte et du bâton
            </h2>
            <p className="text-lg text-gray-anthracite mb-4">
              La motivation d'un commercial est un capital précieux et volatile. Le rôle du manager n'est pas de "motiver" artificiellement, mais de créer les conditions pour que la <strong className="text-amber-500">motivation intrinsèque</strong> de chacun puisse s'épanouir.
            </p>
            <p className="text-lg text-gray-anthracite">
              Cette page explore les leviers concrets et durables pour construire une équipe engagée, résiliente et animée par un véritable esprit de corps.
            </p>
          </div>
        </section>

        {/* Chapitre 1 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">1</span>
            Les 3 Piliers de la Motivation Intrinsèque
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-2">Autonomie</h3>
              <p className="text-gray-anthracite">Donner la liberté sur le "comment" tout en étant clair sur le "quoi" et le "pourquoi". Laisser les commerciaux s'approprier leur secteur et leurs méthodes, dans le respect du cadre défini.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-2">Maîtrise</h3>
              <p className="text-gray-anthracite">Aider chaque membre de l'équipe à progresser et à devenir meilleur dans son art. Le sentiment de compétence est un moteur puissant. Cela passe par le coaching et la formation continue.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-2">Finalité</h3>
              <p className="text-gray-anthracite">Connecter le travail quotidien à une mission plus grande. Montrer l'impact du travail de l'équipe sur les clients et sur le succès de l'entreprise. Célébrer les victoires collectives.</p>
            </div>
          </div>
        </section>

        {/* Chapitre 2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">2</span>
            Instaurer un Climat de Sécurité Psychologique
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-anthracite mb-4">
              Personne ne peut être performant dans la peur. La sécurité psychologique est le fondement qui permet la prise de risque, l'innovation et la collaboration. En tant que manager, vous êtes le garant de ce climat.
            </p>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <ul className="space-y-4 text-gray-anthracite">
                <li className="flex items-start">
                  <Shield className="w-6 h-6 text-amber-500 mr-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-ink">Valoriser la Transparence, pas la Faute</h4>
                    <p>Encouragez les retours sur les échecs sans chercher de coupable. L'objectif est d'apprendre, pas de punir. Une opportunité perdue est une source de leçons précieuses pour toute l'équipe.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Sun className="w-6 h-6 text-amber-500 mr-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-ink">Célébrer les Comportements, pas Uniquement les Résultats</h4>
                    <p>Mettez en lumière les bonnes pratiques, même si elles n'ont pas encore abouti à une signature. Félicitez la persévérance, la bonne préparation d'un rendez-vous, l'entraide entre collègues.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-amber-500 mr-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-ink">Mener des Rituels d'Équipe Efficaces</h4>
                    <p>Le "morning brief" pour s'aligner, la revue de pipeline pour s'entraider, la célébration du "deal de la semaine"... Ces rituels créent du lien et un sentiment d'appartenance.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <div className="bg-gradient-to-br from-blue-ink to-blue-ink/95 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-title font-bold text-white mb-4">
              Prêt à insuffler une nouvelle dynamique ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Une équipe engagée est votre plus grand avantage concurrentiel. Faisons le point sur vos leviers de motivation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-amber-500 hover:bg-amber-500/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <TrendingUp className="w-5 h-5 mr-2" />
                Diagnostiquer l'engagement de mon équipe
              </Link>
              <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Échanger sur mes enjeux managériaux
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 