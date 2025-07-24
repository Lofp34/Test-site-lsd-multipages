'use client';

import { ArrowLeft, Users, BarChart, TrendingUp, CheckCircle, Award, Target, Brain, Shield, FolderKanban, Briefcase, Heart } from 'lucide-react';
import Link from 'next/link';

const chantiers = [
  { 
    title: 'Recruter & Intégrer', 
    description: "Attirer les talents et assurer leur montée en puissance rapide.",
    icon: Briefcase,
    href: '/management/recruter-integrer'
  },
  { 
    title: 'Motiver & Engager', 
    description: "Créer un environnement qui stimule la motivation intrinsèque et l'esprit d'équipe.",
    icon: Heart,
    href: '/management/motiver-engager'
  },
  { 
    title: 'Piloter la Performance', 
    description: "Définir des KPIs pertinents et utiliser la data pour prendre des décisions éclairées.",
    icon: BarChart,
    href: '/management/piloter-performance'
  },
  { 
    title: 'Former & Coacher', 
    description: "Faire monter en compétence chaque membre de l'équipe par un suivi individualisé.",
    icon: Brain,
    href: '/management/former-coacher'
  },
  { 
    title: 'Structurer & Organiser', 
    description: "Mettre en place des processus de vente clairs et des outils qui font gagner du temps.",
    icon: FolderKanban,
    href: '/management/structurer-organiser'
  },
];

export default function ManagementEquipeCommercialePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-ink to-blue-ink/90 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/services" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux services
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
              <Users className="w-5 h-5 text-white" />
              <span className="font-title font-semibold text-white">
                Service • Management d'Équipe Commerciale
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Transformez vos Managers en Leaders
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Le manager est la clé de voûte de la performance commerciale. Nous vous aidons à développer leurs compétences pour en faire de véritables coachs.
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
              <Shield className="w-8 h-8 text-blue-ink/80 mr-3" />
              Le maillon fort de votre stratégie
            </h2>
            <p className="text-lg text-gray-anthracite
              Un bon manager ne se contente pas de superviser. Il recrute, motive, coache, et structure. Il est le garant de la culture de la performance et le premier rempart contre le découragement. Investir sur vos managers, c'est investir sur la pérennité de vos résultats.
            </p>
          </div>
        </section>

        {/* Chapitre 1 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink mb-8 flex items-center">
            <span className="bg-mint-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">1</span>
            Les 5 Chantiers du Manager Performant
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {chantiers.map((chantier) => {
              const Icon = chantier.icon;
              return (
                <Link href={chantier.href} key={chantier.title} className="block group">
                  <div className="bg-white rounded-xl p-6 border border-slate-200 h-full group-hover:border-mint-green group-hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-6 h-6 text-blue-ink />
                      <h3 className="text-xl font-title font-semibold text-blue-ink
                    </div>
                    <p className="text-gray-anthracite text-sm">
                      {chantier.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <div className="bg-gradient-to-br from-blue-ink to-blue-ink/95 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-title font-bold text-white mb-4">
              Évaluez les compétences de vos managers.
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Identifions ensemble les axes prioritaires pour faire de vos managers les leaders dont votre équipe a besoin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-mint-green hover:bg-mint-green/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <Target className="w-5 h-5 mr-2" />
                Lancer un diagnostic managérial
              </Link>
              <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Parler à un expert
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 