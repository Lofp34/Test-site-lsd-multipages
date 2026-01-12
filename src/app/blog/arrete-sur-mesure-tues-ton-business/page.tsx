import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Arrête le sur-mesure (tu tues ton business) | Laurent Serre',
  description: 'Pourquoi le sur-mesure paralyse votre équipe commerciale et comment packager votre expertise pour scaler : 3 étapes actionnables et un cas concret.',
  keywords: 'sur-mesure, scaling commercial, packaging offre, standardiser offre, process vente, PME',
  alternates: {
    canonical: 'https://laurentserre.com/blog/arrete-sur-mesure-tues-ton-business',
  },
  openGraph: {
    title: 'Arrête le sur-mesure (tu tues ton business)',
    description: 'Le sur-mesure crée une surcharge cognitive et empêche le scaling. Voici comment transformer votre expertise en process.',
    url: 'https://laurentserre.com/blog/arrete-sur-mesure-tues-ton-business',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurentserre.com/equipe_bureau.jpg',
        width: 1200,
        height: 630,
        alt: 'Arrête le sur-mesure : structure commerciale et scaling',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arrête le sur-mesure (tu tues ton business)',
    description: 'Pourquoi le sur-mesure paralyse vos ventes et comment packager votre offre.',
    images: ['https://laurentserre.com/equipe_bureau.jpg'],
  },
};

export default function ArreteSurMesureArticle() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Stratégie</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Arrête le sur-mesure (tu tues ton business)
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-01-12">12 janvier 2026</time>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/equipe_bureau.jpg"
              alt="Arrête le sur-mesure : structurer l’offre pour scaler"
              width={1200}
              height={630}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={60}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Il est 22h. Tes bureaux sont vides. Tes commerciaux sont chez eux depuis 18h.
            Et toi ? Tu es encore là, seul, à réécrire un devis parce que « c’est compliqué »
            et que « personne d’autre ne peut le faire ». Si tu te reconnais, le problème
            n’est pas ton équipe. C’est que tu as construit une prison dorée… dont tu es le seul gardien.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le constat : ton génie ne se scale pas
          </h2>
          <p className="mb-6">
            Toi, tu convertis un prospect sur deux. Tes vendeurs ? Un sur dix.
            Tu crois qu’ils manquent de talent ? Faux. Ils sont en surcharge cognitive.
          </p>
          <p className="mb-6">
            Quand tu vends, tu improvises : 15 ans de métier, c’est du jazz.
            Quand un junior essaie de t’imiter, c’est la cacophonie. Il passe 3 heures
            à « monter une solution » sur-mesure. Et toutes les 15 minutes, il frappe
            à ta porte pour valider une virgule.
          </p>
          <div className="bg-orange-soft/10 border-l-4 border-orange-soft p-6 my-8">
            <p className="text-base">
              Résultat : ton entreprise ne dépend pas d’un système. Elle dépend de ton génie.
              Et le génie… ça ne se duplique pas.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            La logique : plus c’est flexible, plus ça s’effondre
          </h2>
          <p className="mb-6">
            C’est neuroscientifique : l’heuristique de fluidité.
            Un client n’achète pas ce qui est « mieux ». Il achète ce qui est clair.
            Si ton vendeur hésite, bégaye ou bricole l’offre devant le prospect,
            le cerveau détecte un danger. Doute = pas de vente.
          </p>
          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              Équation simple : <strong>plus ton offre est flexible, plus le closing de ton équipe s’effondre.</strong>
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le plan : transformer ton expertise en process (3 étapes)
          </h2>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Étape 1 — Standardise l’invisible
          </h3>
          <p className="mb-6">
            Prends tes 20 dernières ventes. Dans 80% des cas, c’est la même chose.
            C’est ton cœur d’offre. Tout le sur-mesure « pour flatter l’ego » ?
            Tu le supprimes. Ou tu le factures le triple.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Étape 2 — L’architecture du choix
          </h3>
          <p className="mb-6">
            Arrête avec les devis à tiroirs. Tu ne vends pas des ingrédients, tu vends le plat.
            Crée 3 packages fermes, orientés résultat :
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li><strong>Essential</strong> : résoudre le problème.</li>
            <li><strong>Performance</strong> : aller plus vite.</li>
            <li><strong>Total Care</strong> : ne plus jamais y penser.</li>
          </ul>
          <p className="mb-6">
            Le job du vendeur n’est plus de « créer », mais de guider le client dans la bonne case.
          </p>

          <h3 className="text-2xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Étape 3 — Vends l’histoire, pas la fiche technique
          </h3>
          <p className="mb-6">
            Une offre packagée est une histoire simple.
            Au lieu de dire « On a un moteur V12 », ton vendeur dit :
            « Avec l’offre Performance, vous divisez votre temps de production par deux. »
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            La preuve : un cas concret
          </h2>
          <p className="mb-6">
            Client dans le bâtiment. Devis 15 pages. 4 jours pour les sortir.
            Le client final ne comprenait rien et négociait le prix.
          </p>
          <p className="mb-6">
            On a tout cassé. On a créé 3 forfaits par niveau de risque.
            Le lendemain, un junior prend un appel :
            « Vous cherchez le prix le plus bas avec un risque modéré, ou une garantie totale sur 10 ans ? »
          </p>
          <p className="mb-6">
            Réponse client : « Je veux la garantie. »
            Réponse vendeur : « Alors c’est l’offre Sérénité. »
            <strong>Boum. Vendu en 20 minutes. Sans passer par le patron.</strong>
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Conclusion & CTA
            </h3>
            <p className="mb-6">
              Simplifier ton offre, ce n’est pas une régression.
              C’est le seul moyen de redevenir un CEO — pas le commercial le plus fatigué de la boîte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Demander un audit
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
            Arrête le sur-mesure. Commence à faire du volume.
          </p>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
