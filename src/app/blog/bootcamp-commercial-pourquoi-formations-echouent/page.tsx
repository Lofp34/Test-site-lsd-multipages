import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Bootcamp commercial : pourquoi 80% des formations échouent | Laurent Serre',
  description: 'Analyse des raisons pour lesquelles la plupart des formations commerciales n\'atteignent pas leurs objectifs et notre approche différente qui fonctionne.',
  keywords: 'formation commerciale, bootcamp commercial, échec formation, formation équipe vente, PME',
  alternates: {
    canonical: 'https://laurentserre.com/blog/bootcamp-commercial-pourquoi-formations-echouent',
  },
  openGraph: {
    title: 'Bootcamp commercial : pourquoi 80% des formations échouent',
    description: 'Analyse des raisons pour lesquelles la plupart des formations commerciales n\'atteignent pas leurs objectifs.',
    url: 'https://laurentserre.com/blog/bootcamp-commercial-pourquoi-formations-echouent',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurentserre.com/equipe_bureau.jpg',
        width: 1200,
        height: 630,
        alt: 'Formation commerciale bootcamp - équipe en formation',
      },
    ],
  },
};

export default function Article4() {
  return (
    <main className="bg-primary-bg dark:bg-gray-dark text-gray-dark dark:text-primary-bg">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-blue-ink/10 backdrop-blur-sm border border-blue-ink/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-blue-ink text-sm">Formation</span>
            </div>
            
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink dark:text-white sm:text-5xl mb-6">
              Bootcamp commercial : pourquoi 80% des formations échouent
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2024-12-28">28 décembre 2024</time>
              <span>•</span>
              <span>9 min de lecture</span>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Chaque année, les entreprises investissent des millions dans la formation commerciale. 
            Pourtant, 80% de ces formations n'améliorent pas durablement les performances. 
            Décryptage d'un gâchis et solutions pour que ça marche vraiment.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Raison #1 : Le syndrome de la formation "one-shot"
          </h2>
          
          <p className="mb-6">
            <strong>Le problème :</strong> Une journée de formation intensive, puis plus rien. 
            On bombarde les commerciaux d'informations sans suivi ni accompagnement. 
            Résultat : 90% des acquis sont oubliés en 30 jours.
          </p>
          
          <div className="bg-mint-green/10 border-l-4 border-mint-green p-6 my-8">
            <p className="text-base italic">
              <strong>Notre approche :</strong> Formation étalée sur 3 mois avec sessions hebdomadaires, 
              mise en pratique immédiate et coaching individuel. La mémorisation et l'ancrage sont garantis.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Raison #2 : Formation générique vs réalité terrain
          </h2>
          
          <p className="mb-6">
            Les formations standards ignorent votre contexte spécifique : votre marché, 
            vos clients, vos concurrents, vos objections récurrentes. 
            Vos commerciaux repartent avec de beaux concepts... inapplicables.
          </p>
          
          <p className="mb-6">
            <strong>Solution :</strong> Formation 100% personnalisée basée sur vos vrais cas clients, 
            vos vraies objections, votre vraie concurrence. Chaque module est adapté à votre réalité.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Raison #3 : Pas de mesure, pas d'amélioration
          </h2>
          
          <p className="mb-6">
            Comment mesurer l'efficacité d'une formation ? Par la satisfaction des participants ? 
            C'est insuffisant. Il faut mesurer l'impact business : plus de rendez-vous, 
            meilleur taux de conversion, augmentation du panier moyen.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>KPI à suivre :</strong> Taux de transformation prospect → client, 
              durée moyenne du cycle de vente, valeur moyenne des deals, 
              taux de rétention client.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Raison #4 : Le manager n'est pas impliqué
          </h2>
          
          <p className="mb-6">
            Formation des commerciaux ≠ Formation des managers. 
            Si le manager continue avec ses anciennes méthodes, 
            impossible d'ancrer les nouvelles pratiques dans l'équipe.
          </p>
          
          <p className="mb-6">
            <strong>Notre méthode :</strong> Formation simultanée des managers sur le coaching commercial, 
            l'animation d'équipe et le suivi des KPI. Manager et équipe avancent ensemble.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Raison #5 : Formation sans outils opérationnels
          </h2>
          
          <p className="mb-6">
            Apprendre de nouvelles techniques sans avoir les outils pour les appliquer, 
            c'est comme apprendre à conduire sans voiture. Il faut des scripts, des grilles, 
            des processus, un CRM adapté...
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Notre approche "bootcamp terrain"
          </h2>
          
          <p className="mb-6">
            <strong>1. Diagnostic préalable</strong> : On analyse votre existant avant de former
          </p>
          
          <p className="mb-6">
            <strong>2. Formation séquencée</strong> : 12 semaines d'accompagnement progressif
          </p>
          
          <p className="mb-6">
            <strong>3. Mise en pratique immédiate</strong> : Chaque semaine, application directe sur vos vrais prospects
          </p>
          
          <p className="mb-6">
            <strong>4. Coaching individuel</strong> : Suivi personnalisé de chaque commercial
          </p>
          
          <p className="mb-6">
            <strong>5. Mesure d'impact</strong> : KPI suivis en temps réel, ajustements continus
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Prêt pour une formation qui marche vraiment ?
            </h3>
            <p className="mb-6">
              Notre bootcamp commercial a fait ses preuves : +30% de performance moyenne, 
              95% de satisfaction, ROI mesuré dès le 2ème mois.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/diagnostic" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Évaluer vos besoins formation
              </Link>
              <Link 
                href="/bootcamp" 
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
              >
                Découvrir le bootcamp
              </Link>
            </div>
          </div>

          <p className="mb-6">
            <em>
              Une formation commerciale réussie transforme durablement votre équipe. 
              Mais pour cela, elle doit être conçue comme un accompagnement, 
              pas comme un événement ponctuel.
            </em>
          </p>
        </div>
      </article>
      <section className="py-16 bg-white dark:bg-gray-anthracite/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink dark:text-primary-bg mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}