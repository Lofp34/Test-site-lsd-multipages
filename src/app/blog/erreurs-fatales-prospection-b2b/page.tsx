import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Les erreurs fatales dans la prospection B2B (et comment les éviter) | Laurent Serre',
  description: 'Découvrez les 7 erreurs qui sabotent vos efforts de prospection B2B et les solutions concrètes pour les éviter. Guide expert pour PME.',
  keywords: 'erreurs prospection B2B, démarchage commercial, techniques prospection, PME, vente B2B',
  alternates: {
    canonical: 'https://laurentserre.com/blog/erreurs-fatales-prospection-b2b',
  },
  openGraph: {
    title: 'Les erreurs fatales dans la prospection B2B (et comment les éviter)',
    description: 'Découvrez les 7 erreurs qui sabotent vos efforts de prospection B2B et les solutions concrètes pour les éviter.',
    url: 'https://laurentserre.com/blog/erreurs-fatales-prospection-b2b',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurentserre.com/erreurs-fatales.png',
        width: 1200,
        height: 630,
        alt: 'Erreurs fatales dans la prospection B2B - Guide expert',
      },
    ],
  },
};

export default function Article3() {
  return (
    <main className="bg-primary-bg dark:bg-gray-dark text-gray-dark dark:text-primary-bg">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">Prospection</span>
            </div>
            
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink dark:text-white sm:text-5xl mb-6">
              Les erreurs fatales dans la prospection B2B (et comment les éviter)
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2025-01-05">5 janvier 2025</time>
              <span>•</span>
              <span>12 min de lecture</span>
            </div>
          </div>
          
          <div className="relative mb-12">
            <Image
              src="/erreurs-fatales.png"
              alt="Erreurs fatales dans la prospection B2B - Guide expert"
              width={1200}
              height={600}
              className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Après 20 ans d'expérience terrain, j'ai identifié 7 erreurs récurrentes qui sabotent 90% des efforts de prospection B2B. 
            Ces erreurs coûtent des millions d'opportunités manquées chaque année. Voici comment les éviter.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Erreur #1 : Prospecter sans persona défini
          </h2>
          
          <p className="mb-6">
            <strong>Le symptôme :</strong> Vos commerciaux contactent "toutes les entreprises de plus de 50 salariés" 
            sans stratégie précise. Résultat : un taux de réponse catastrophique et une démotivation d'équipe.
          </p>
          
          <div className="bg-mint-green/10 border-l-4 border-mint-green p-6 my-8">
            <p className="text-base italic">
              <strong>Solution :</strong> Définissez 2-3 personas ultra-précis avec douleurs spécifiques, 
              budget estimé et processus de décision. Ciblez 100 prospects qualifiés plutôt que 1000 aléatoires.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Erreur #2 : L'approche produit plutôt que problème
          </h2>
          
          <p className="mb-6">
            "Bonjour, nous vendons des logiciels de gestion..." STOP ! Personne ne se lève le matin 
            en se disant "j'ai besoin d'un logiciel". Les gens ont des problèmes à résoudre.
          </p>
          
          <p className="mb-6">
            <strong>Reformulez :</strong> "Bonjour, nous aidons les dirigeants de PME à récupérer 2h par jour 
            en automatisant leur gestion administrative." Voyez la différence ?
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Erreur #3 : Négliger la recherche préalable
          </h2>
          
          <p className="mb-6">
            Appeler un prospect sans connaître son actualité, ses défis ou son contexte, 
            c'est comme arriver à un rendez-vous les mains vides. L'impression est désastreuse.
          </p>
          
          <p className="mb-6">
            <strong>Avant chaque appel :</strong> 5 minutes sur LinkedIn, Google Actualités et le site de l'entreprise. 
            Cette préparation multiplie vos chances par 5.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Template gagnant :</strong> "J'ai vu que vous venez de lever 2M€. Félicitations ! 
              Cette croissance va sûrement créer de nouveaux défis en [domaine]. C'est justement notre spécialité..."
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Erreur #4 : Le pitch trop long dès le premier contact
          </h2>
          
          <p className="mb-6">
            Objectif du premier contact : <strong>obtenir un rendez-vous</strong>, pas vendre. 
            Gardez vos arguments pour le face-à-face. Sinon, vous donnez au prospect 
            toutes les raisons de vous dire non immédiatement.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Erreur #5 : Abandonner après 2-3 tentatives
          </h2>
          
          <p className="mb-6">
            Statistique révélatrice : 80% des commerciaux abandonnent après 3 relances, 
            alors que 80% des ventes se font après le 5ème contact. Cherchez l'erreur !
          </p>
          
          <p className="mb-6">
            <strong>Stratégie de relance :</strong> Variez les canaux (email, téléphone, LinkedIn, courrier) 
            et apportez de la valeur à chaque contact (article pertinent, étude de cas, invitation événement).
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Erreur #6 : Ignorer les signaux d'achat digitaux
          </h2>
          
          <p className="mb-6">
            Vos prospects laissent des indices partout : téléchargement de livre blanc, 
            visite répétée de votre site, consultation de vos tarifs... 
            Ces signaux chauds doivent déclencher une prospection prioritaire.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Erreur #7 : Ne pas mesurer pour s'améliorer
          </h2>
          
          <p className="mb-6">
            Combien d'appels par jour ? Quel taux de décrochage ? Combien de rendez-vous obtenus ? 
            Sans mesure, impossible d'améliorer. Les meilleurs commerciaux sont obsédés par leurs KPI.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Transformez votre prospection
            </h3>
            <p className="mb-6">
              Notre bootcamp commercial corrige ces erreurs et forme vos équipes aux techniques 
              qui fonctionnent vraiment. Résultats mesurés dès la première semaine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/diagnostic" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Auditer votre prospection
              </Link>
              <Link 
                href="/bootcamp" 
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
              >
                Formation prospection
              </Link>
            </div>
          </div>

          <p className="mb-6">
            <em>
              La prospection efficace n'est pas une question de volume, mais de méthode. 
              Corrigez ces 7 erreurs et observez vos résultats décoller en quelques semaines.
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