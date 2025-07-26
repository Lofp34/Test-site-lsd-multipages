import type { Metadata } from 'next';
import { ArrowLeft, Users, Target, BarChart, TrendingUp, Filter, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Piloter la Performance Commerciale | KPIs & Data pour Manager',
  description: "Apprenez à définir des KPIs pertinents et à utiliser la data pour prendre des décisions éclairées. Guide complet pour un pilotage de la performance commerciale efficace.",
  keywords: 'piloter performance commerciale, KPI vente, indicateur performance commercial, management par la data, coaching commercial',
  alternates: {
    canonical: 'https://laurentserre.com/management/piloter-performance',
  },
};

export default function PiloterPerformancePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-ink to-indigo-500/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/management-equipe-commerciale" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au Management d'Équipe
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/30 px-6 py-3 rounded-full">
              <BarChart className="w-5 h-5 text-indigo-400" />
              <span className="font-title font-semibold text-indigo-400">
                Chantier 3 • Piloter la Performance
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Piloter la Performance :
              <span className="block text-indigo-400">De l'Intuition à la Décision</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Cessez de naviguer à vue. Un pilotage efficace transforme la data en un levier de croissance prédictible et en un outil de coaching puissant.
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
              <Target className="w-8 h-8 text-indigo-500 mr-3" />
              Ce qui ne se mesure pas ne s'améliore pas
            </h2>
            <p className="text-lg text-gray-anthracite mb-4">
              Le pilotage par la data n'est pas du "flicage". C'est un outil au service de la performance collective et individuelle. Il permet d'objectiver les discussions, d'identifier les vrais points de blocage et de concentrer les efforts là où ils ont le plus d'impact.
            </p>
            <p className="text-lg text-gray-anthracite">
              L'objectif est de passer d'un management réactif ("On n'a pas fait le chiffre") à un management proactif ("Je vois que ton taux de conversion chute, comment puis-je t'aider ?").
            </p>
          </div>
        </section>

        {/* Chapitre 1 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">1</span>
            Choisir les Bons Indicateurs (KPIs)
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-title font-semibold text-blue-ink mb-4">
                Indicateurs d'Activité (Leading) vs. de Résultat (Lagging)
              </h3>
              <p className="text-gray-anthracite mb-4">Un bon tableau de bord équilibre deux types de KPIs :</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-ink">Indicateurs d'Activité (Cause)</h4>
                  <p className="text-sm text-gray-anthracite">Mesurent l'effort. Ils sont contrôlables et prédictifs du résultat futur.</p>
                  <ul className="mt-2 text-sm space-y-1 list-disc list-inside">
                    <li>Nombre d'appels / emails</li>
                    <li>Nombre de rendez-vous pris</li>
                    <li>Nombre de nouvelles opportunités créées</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-ink">Indicateurs de Résultat (Conséquence)</h4>
                  <p className="text-sm text-gray-anthracite">Mesurent la performance passée. Ils sont la conséquence de l'effort.</p>
                  <ul className="mt-2 text-sm space-y-1 list-disc list-inside">
                    <li>Chiffre d'Affaires signé</li>
                    <li>Taux de conversion (closing rate)</li>
                    <li>Panier moyen par vente</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-xl p-6">
              <AlertTriangle className="w-10 h-10 flex-shrink-0" />
              <p><strong>Le piège à éviter :</strong> Ne piloter que le chiffre d'affaires. C'est comme conduire en ne regardant que dans le rétroviseur. Le vrai pilotage se fait sur les indicateurs d'activité.</p>
            </div>
          </div>
        </section>

        {/* Chapitre 2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">2</span>
            Animer les Rituels de Performance
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-anthracite mb-4">
              La data n'a de valeur que si elle est utilisée pour animer des conversations constructives.
            </p>
            <div className="border-l-4 border-indigo-500 pl-6 space-y-8">
              <div>
                <h4 className="font-title font-bold text-xl text-blue-ink mb-2">Le "Pipeline Review" Hebdomadaire</h4>
                <p className="text-gray-anthracite">Ce n'est pas une séance de justification. C'est un atelier de travail collectif pour débloquer les opportunités. Chaque commercial présente 1 ou 2 "deals" sur lesquels il souhaite l'avis du groupe.</p>
                <p className="font-semibold mt-2">Questions clés : "Où est le risque sur ce deal ?", "De quoi as-tu besoin pour avancer ?"</p>
              </div>
              <div>
                <h4 className="font-title font-bold text-xl text-blue-ink mb-2">Le Point de Coaching Individuel</h4>
                <p className="text-gray-anthracite">Basé sur le tableau de bord individuel. On analyse les ratios (ex: taux de conversion entre étape 1 et 2) pour identifier la compétence précise à travailler.</p>
                <p className="font-semibold mt-2">Exemple : "Je vois que tu as beaucoup de RDV1 mais peu de RDV2. Travaillons ensemble ta phase de découverte."</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <div className="bg-gradient-to-br from-blue-ink to-blue-ink/95 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-title font-bold text-white mb-4">
              Mettez la data au service de votre croissance.
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Un bon pilotage est la clé pour transformer vos objectifs en résultats concrets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-indigo-500 hover:bg-indigo-500/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Filter className="w-5 h-5 mr-2" />
                Auditer mes KPIs et mon pilotage
              </Link>
              <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Construire mon tableau de bord
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 