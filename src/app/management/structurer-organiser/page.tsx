import type { Metadata } from 'next';
import { ArrowLeft, Users, FolderKanban, TrendingUp, CheckSquare, FileText, Share2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Structurer & Organiser une Équipe Commerciale | Process & Outils',
  description: "Mettez en place des processus de vente clairs et des outils qui font gagner du temps. Guide pour les managers souhaitant structurer et organiser leur équipe commerciale.",
  keywords: 'processus de vente, structurer équipe commerciale, organisation commerciale, sales playbook, outils vente',
  alternates: {
    canonical: 'https://laurentserre.com/management/structurer-organiser',
  },
};

export default function StructurerOrganiserPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-anthracite">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-ink to-rose-500/20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/management-equipe-commerciale" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au Management d'Équipe
          </Link>
          
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-rose-500/10 backdrop-blur-sm border border-rose-500/30 px-6 py-3 rounded-full">
              <FolderKanban className="w-5 h-5 text-rose-400" />
              <span className="font-title font-semibold text-rose-400">
                Chantier 5 • Structurer & Organiser
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-title font-bold text-white leading-tight">
              Structurer et Organiser :
              <span className="block text-rose-400">Bâtir la Machine de Vente</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              La performance durable ne repose pas sur des héros solitaires, mais sur un système robuste. Donnez à votre équipe le cadre et les outils pour exceller.
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
              <Share2 className="w-8 h-8 text-rose-500 mr-3" />
              Pourquoi le "système" bat le talent seul
            </h2>
            <p className="text-lg text-gray-anthracite dark:text-primary-bg/80 mb-4">
              Un commercial talentueux dans un système chaotique sera toujours moins performant à long terme qu'un commercial moyen dans un système bien structuré.
            </p>
            <p className="text-lg text-gray-anthracite dark:text-primary-bg/80">
              <strong className="text-rose-500">Structurer, c'est clarifier le chemin vers le succès.</strong> C'est définir des étapes de vente claires, fournir les bons outils et créer des ressources partagées pour que l'intelligence collective prime sur l'effort individuel.
            </p>
          </div>
        </section>

        {/* Chapitre 1 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <span className="bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">1</span>
            Le Sales Playbook : La Bible de l'Équipe
          </h2>
          <div className="space-y-6">
            <p className="text-lg text-gray-anthracite dark:text-primary-bg/80 mb-4">
              Le Sales Playbook est le document de référence qui centralise toutes les meilleures pratiques de votre équipe. C'est un document vivant, qui doit évoluer.
            </p>
            <div className="bg-white dark:bg-gray-anthracite/10 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-title font-semibold text-blue-ink dark:text-primary-bg mb-4">Contenu Essentiel du Playbook :</h3>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-gray-anthracite dark:text-primary-bg/80">
                <li className="flex items-start"><FileText className="w-5 h-5 text-rose-500 mr-3 mt-1 flex-shrink-0" /><span>La présentation de l'offre et les personas cibles.</span></li>
                <li className="flex items-start"><FileText className="w-5 h-5 text-rose-500 mr-3 mt-1 flex-shrink-0" /><span>Les étapes détaillées du processus de vente.</span></li>
                <li className="flex items-start"><FileText className="w-5 h-5 text-rose-500 mr-3 mt-1 flex-shrink-0" /><span>Les scripts d'appel et modèles d'emails.</span></li>
                <li className="flex items-start"><FileText className="w-5 h-5 text-rose-500 mr-3 mt-1 flex-shrink-0" /><span>Le traitement des objections les plus fréquentes.</span></li>
                <li className="flex items-start"><FileText className="w-5 h-5 text-rose-500 mr-3 mt-1 flex-shrink-0" /><span>Les études de cas et témoignages clients.</span></li>
                <li className="flex items-start"><FileText className="w-5 h-5 text-rose-500 mr-3 mt-1 flex-shrink-0" /><span>Les guides d'utilisation des outils (CRM, etc.).</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Chapitre 2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 flex items-center">
            <span className="bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-lg">2</span>
            Optimiser le Processus de Vente
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-anthracite dark:text-primary-bg/80 mb-4">
              Un processus de vente clair, partagé par tous et aligné dans le CRM est la colonne vertébrale de votre organisation.
            </p>
            <div className="border-l-4 border-rose-500 pl-6 space-y-8">
              <div>
                <h4 className="font-title font-bold text-xl text-blue-ink dark:text-primary-bg mb-2">Définir les Étapes Claires du Pipeline</h4>
                <p className="text-gray-anthracite dark:text-primary-bg/80">Exemple : "Nouveau Lead" -> "Contact Établi" -> "RDV1 Réalisé" -> "Proposition Envoyée" -> "Négociation" -> "Gagné / Perdu". Chaque étape doit avoir des critères de sortie clairs et non-ambigus.</p>
              </div>
              <div>
                <h4 className="font-title font-bold text-xl text-blue-ink dark:text-primary-bg mb-2">Automatiser les Tâches à Faible Valeur</h4>
                <p className="text-gray-anthracite dark:text-primary-bg/80">Utilisez votre CRM et d'autres outils pour automatiser les emails de relance, la prise de rendez-vous, la création de rapports. Libérez du temps à vos commerciaux pour qu'ils se concentrent sur la vente.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <div className="bg-gradient-to-br from-blue-ink to-blue-ink/95 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-title font-bold text-white mb-4">
              Bâtissez une organisation commerciale d'élite.
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              La structure est le socle sur lequel la performance peut s'épanouir. Arrêtez de bricoler, commencez à construire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostic" className="inline-flex items-center bg-rose-500 hover:bg-rose-500/90 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                <CheckSquare className="w-5 h-5 mr-2" />
                Auditer mon organisation commerciale
              </Link>
              <Link href="/contact" className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-ink px-8 py-4 rounded-full font-semibold transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Discuter de mes processus
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 