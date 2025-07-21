import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: '7 étapes pour transformer un « non » frustrant en « oui » performant en 2025 | Laurent Serre',
  description: 'Découvrez une méthode en 7 étapes pour transformer chaque refus client frustrant en opportunité commerciale durable et efficace. Conseils pratiques, techniques d’écoute et outils IA pour performer en 2025.',
  keywords: 'refus client, objection commerciale, transformation vente, techniques de vente, développement commercial, IA commerciale',
  alternates: {
    canonical: 'https://laurentserre.com/blog/7-etapes-transformer-non-en-oui-performant-2025',
  },
  openGraph: {
    title: '7 étapes pour transformer un « non » frustrant en « oui » performant en 2025',
    description: 'Découvrez une méthode en 7 étapes pour transformer chaque refus client frustrant en opportunité commerciale durable et efficace.',
    url: 'https://laurentserre.com/blog/7-etapes-transformer-non-en-oui-performant-2025',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurentserre.com/equipe_bureau.jpg',
        width: 1200,
        height: 630,
        alt: 'Réunion commerciale - transformer un non frustrant en oui performant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7 étapes pour transformer un « non » frustrant en « oui » performant en 2025',
    description: 'Découvrez une méthode en 7 étapes pour transformer chaque refus client frustrant en opportunité commerciale durable et efficace.',
    images: ['https://laurentserre.com/equipe_bureau.jpg'],
  },
};

export default function Article7EtapesNonOui() {
  return (
    <main className="bg-primary-bg dark:bg-gray-dark text-gray-dark dark:text-primary-bg">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Techniques de vente
              </span>
            </div>
            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink dark:text-white sm:text-5xl mb-6">
              7 étapes pour transformer un « non » frustrant en « oui » performant en 2025
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/laurent.jpg"
                  alt="Laurent Serre"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2025-07-01">1 juillet 2025</time>
              <span>•</span>
              <span>9 min de lecture</span>
            </div>
          </div>
          <div className="relative mb-12">
            <Image
              src="/equipe_bureau.jpg"
              alt="Réunion commerciale - transformer le non en oui"
              width={1200}
              height={600}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none prose-headings:text-blue-ink prose-headings:dark:text-white prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-strong:text-blue-ink prose-strong:dark:text-white prose-li:text-gray-700 prose-li:dark:text-gray-300">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Un « non » client, c’est souvent frustrant. Pourtant, en 2025, les meilleurs commerciaux ne se contentent plus d’accepter ce refus : ils savent transformer un non frustrant en oui performant. Découvrez une méthode éprouvée, en 7 étapes, pour faire de chaque « non » une opportunité commerciale.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            1. Réaliser un audit express du refus
          </h2>
          <p className="mb-6">
            Ne considérez jamais un refus comme définitif sans en comprendre la cause profonde. Interrogez votre client avec tact pour clarifier l’obstacle réel.
          </p>
          <div className="bg-mint-green/10 border-l-4 border-mint-green p-6 my-8">
            <p className="text-base italic">
              <strong>Question clé à poser :</strong> « Je comprends. Qu’est-ce qui vous empêche, précisément, de dire oui aujourd’hui ? »<br/>
              <strong>Bénéfice :</strong> Vous transformez un rejet vague en une objection claire et exploitable.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            2. Reformuler avec empathie
          </h2>
          <p className="mb-6">
            Montrez à votre interlocuteur que vous avez entendu son refus et compris ses raisons. La reformulation désamorce la tension et ouvre la voie à un dialogue constructif.
          </p>
          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Exemple :</strong> « Si je vous comprends bien, ce n’est pas le produit qui vous gêne, mais le timing ? »
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            3. Libérer les raisons sous-jacentes
          </h2>
          <p className="mb-6">
            Parfois, le client lui-même ne sait pas exactement pourquoi il refuse. Votre rôle : l’aider à clarifier ses véritables freins.
          </p>
          <ul className="mb-6">
            <li><strong>Technique à utiliser :</strong> la maïeutique commerciale (questions ouvertes, écoute active).</li>
            <li><strong>Exemple :</strong> « Qu’est-ce qui ferait basculer votre décision dans l’autre sens ? »</li>
            <li><strong>Bénéfice :</strong> Vous devenez partenaire de réflexion, plus seulement vendeur.</li>
          </ul>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            4. Repositionner votre solution sur mesure
          </h2>
          <p className="mb-6">
            Une fois les objections réelles identifiées, recentrez votre discours sur les besoins spécifiques du client. Proposez une adaptation personnalisée de votre offre.
          </p>
          <ul className="mb-6">
            <li><strong>Astuce IA :</strong> Utilisez des outils de personnalisation intelligente (analyse sémantique) pour adapter votre discours à chaque profil client.</li>
          </ul>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            5. Tester une petite action concrète
          </h2>
          <p className="mb-6">
            Si la vente reste bloquée, proposez une action intermédiaire simple et sans risque pour engager le client.
          </p>
          <div className="bg-mint-green/10 border-l-4 border-mint-green p-6 my-8">
            <p className="text-base italic">
              <strong>Exemple :</strong> « Et si nous organisions un atelier test gratuit de 2 heures ? »<br/>
              <strong>Bénéfice :</strong> Vous transformez le refus en première étape d’engagement.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            6. Renforcer la relation par un mini-geste humain
          </h2>
          <p className="mb-6">
            Même en cas de refus persistant, restez présent dans l’esprit de votre interlocuteur par une attention humaine.
          </p>
          <ul className="mb-6">
            <li><strong>Idée à tester :</strong> Envoyez un article utile, une ressource gratuite, ou un message personnel bienveillant.</li>
            <li><strong>Erreur à éviter :</strong> Ne pas donner suite après un refus, laissant un goût amer et définitif.</li>
          </ul>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            7. Mesurer, ajuster et relancer au bon rythme
          </h2>
          <p className="mb-6">
            Inscrivez chaque refus dans un cycle précis de relances douces et pertinentes. Utilisez votre CRM pour planifier et personnaliser vos relances.
          </p>
          <ul className="mb-6">
            <li><strong>Méthode recommandée :</strong> Intégrez les relances dans votre CRM avec des rappels précis.</li>
            <li><strong>Outil pratique :</strong> Configurez des alertes intelligentes (sentiment analysis IA) pour détecter le meilleur moment émotionnel pour relancer.</li>
          </ul>

          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mt-12 mb-6">
            Conclusion : Transformez chaque « non » frustrant en tremplin relationnel et en « oui » performant
          </h2>
          <p className="mb-6">
            Chaque refus, même frustrant, est une occasion unique d’approfondir la relation avec votre client. En appliquant ces 7 étapes avec méthode et empathie, vous augmenterez vos chances de transformer un « non » frustrant en « oui » performant, tout en renforçant durablement vos liens commerciaux.
          </p>
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Envie de savoir où vous en êtes sur la gestion de vos refus commerciaux ?
            </h3>
            <p className="mb-6">
              Faites le point gratuitement sur vos pratiques et découvrez des axes d’amélioration personnalisés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/diagnostic" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Faire mon diagnostic gratuit
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Author Bio */}
      <section className="bg-white dark:bg-gray-anthracite py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <Image
                src="/laurent.jpg"
                alt="Laurent Serre - Expert en développement commercial"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-title font-bold text-blue-ink dark:text-white mb-2">
                Laurent Serre
              </h3>
              <p className="text-lg text-mint-green mb-4">
                Expert en développement commercial • 20 ans d'expérience
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Spécialiste de la transformation commerciale et de la formation à la vente, Laurent accompagne les PME dans l’optimisation de leur performance. Fort de 20 ans d’expérience terrain, il combine méthodes éprouvées et outils innovants pour des résultats concrets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-title font-bold text-blue-ink dark:text-white mb-8">
            Articles recommandés
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/blog/erreurs-fatales-prospection-b2b" className="group">
              <div className="bg-white dark:bg-gray-anthracite p-6 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-title font-semibold text-blue-ink dark:text-white mb-2 group-hover:text-mint-green transition-colors">
                  Les 7 erreurs fatales en prospection B2B
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Découvrez les pièges à éviter pour réussir vos campagnes de prospection et booster vos résultats.
                </p>
              </div>
            </Link>
            <Link href="/blog/ia-transforme-developpement-commercial-2025" className="group">
              <div className="bg-white dark:bg-gray-anthracite p-6 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-title font-semibold text-blue-ink dark:text-white mb-2 group-hover:text-mint-green transition-colors">
                  Comment l’IA transforme le développement commercial en 2025
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Analyse des nouvelles pratiques et outils IA pour doper la performance commerciale.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

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

 