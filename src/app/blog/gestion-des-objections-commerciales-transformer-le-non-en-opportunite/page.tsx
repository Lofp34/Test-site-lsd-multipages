import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Gestion des objections commerciales : transformer le non en opportunité | Laurent Serre',
  description:
    'Les objections ne sont pas des obstacles, ce sont des portes. Découvrez la méthode en 4 étapes pour traiter n\'importe quelle objection B2B sans forcer.',
  keywords:
    'objections commerciales, gestion objections, vente B2B, objection prix, objection concurrence, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite',
  },
  openGraph: {
    title: 'Gestion des objections commerciales : transformer le non en opportunité',
    description:
      'Une objection n\'est pas un refus. C\'est un engagement qui cache un frein identifiable. Voici comment le travailler.',
    url: 'https://www.laurentserre.com/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-03-gestion-objections-commerciales-hero.jpg',
        width: 1536,
        height: 1024,
        alt: 'Client en réunion commerciale exposant une objection, coach à l\'écoute',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gestion des objections commerciales : transformer le non en opportunité',
    description:
      'L\'objection n\'est pas la fin de la vente. C\'est le début de la vraie conversation.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-03-gestion-objections-commerciales-hero.jpg'],
  },
};

export default function GestionObjectionsCommerciales() {
  const articleUrl = 'https://www.laurentserre.com/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Gestion des objections commerciales : transformer le non en opportunité',
    description:
      'Les objections ne sont pas des obstacles, ce sont des portes. Découvrez la méthode en 4 étapes pour traiter n\'importe quelle objection B2B sans forcer.',
    image: 'https://www.laurentserre.com/images/blog/2026-05-03-gestion-objections-commerciales-hero.jpg',
    datePublished: '2026-05-03',
    dateModified: '2026-05-03',
    author: {
      '@type': 'Person',
      name: 'Laurent Serre',
      url: 'https://www.laurentserre.com/a-propos',
      sameAs: [
        'https://www.linkedin.com/in/laurentserre34/',
        'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Laurent Serre Développement',
      url: 'https://www.laurentserre.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.laurentserre.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: 'Vente B2B / objections',
    keywords: ['objections commerciales', 'gestion objections', 'vente B2B', 'objection prix', 'objection concurrence', 'traitement objections'],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Pourquoi les objections commerciales sont-elles une bonne nouvelle pour un vendeur ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Une objection signifie que le prospect est engagé et envisage sérieusement l\'offre. Un prospect désintéressé ne soulève pas d\'objections — il dit non merci et s\'en va. Une objection est une information précieuse car elle révèle un frein identifiable, et un frein identifiable peut être travaillé.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quels sont les 4 types d\'objections les plus fréquentes en vente B2B ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les 4 types d\'objections les plus fréquentes sont : l\'objection prix (c\'est trop cher, pas de budget), l\'objection timing (ce n\'est pas le bon moment), l\'objection concurrence (on travaille déjà avec quelqu\'un) et l\'objection autorité (je dois en parler à mon associé).',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelle est la méthode en 4 étapes pour traiter une objection commerciale ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La méthode se déroule en 4 étapes : 1) Accuser réception de l\'objection sans céder ni réfuter, 2) Creuser avec des questions ouvertes pour comprendre le vrai fond, 3) Reformuler et valider pour s\'assurer d\'avoir bien compris, 4) Répondre avec précision en utilisant des faits, des exemples et des chiffres.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment réagir quand un prospect dit "c\'est trop cher" ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ne pas baisser immédiatement le prix : cela signalerait que le tarif initial n\'était pas sérieux. À la place : accuser réception, creuser l\'origine de la comparaison (budget disponible ou offre concurrente ?), recadrer sur le coût de l\'inaction vs l\'investissement, et proposer une alternative comme un démarrage progressif ou un paiement étalé.',
        },
      },
      {
        '@type': 'Question',
        name: 'Que faire face à l\'objection "je dois en parler à mon associé" ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ne pas envoyer une proposition par email seul. Proposer un document ciblé sur les préoccupations de l\'associé, et demander à le rencontrer, même 20 minutes par visio, pour répondre directement à ses questions. L\'objectif est de rester dans la boucle de décision.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Gestion des objections commerciales', item: articleUrl },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Vente B2B / objections</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Gestion des objections commerciales : transformer le non en opportunité
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-05-03">3 mai 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-05-03-gestion-objections-commerciales-hero.jpg"
              alt="Client en réunion commerciale exposant une objection"
              width={1536}
              height={1024}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="mb-8">Votre prospect dit « c'est trop cher ». Ou « on travaille déjà avec quelqu'un ». Ou « ce n'est pas le bon moment ». Comment réagissez-vous ?</p>

          <p className="mb-8">Si votre premier réflexe est de justifier, d'argumenter ou de paniquer, vous perdez l'affaire avant même d'avoir commencé à la défendre.</p>

          <p className="mb-8">La gestion des objections commerciales est l'une des compétences les plus déterminantes en vente B2B. Pas parce qu'elle vous permet de « vaincre » votre prospect — mais parce qu'elle vous permet de comprendre ce qui se passe vraiment et de trouver ensemble le bon chemin.</p>

          <p className="mb-8">Voici ma méthode, testée sur le terrain depuis 20 ans.</p>

          <nav className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 mb-8 not-prose" aria-label="Sommaire">
            <p className="font-title font-bold text-blue-ink mb-3">Au sommaire</p>
            <ol className="space-y-1.5 text-sm">
              <li><a href="#pourquoi-bonne-nouvelle" className="text-blue-ink hover:text-mint-green transition-colors">1. Pourquoi les objections sont une bonne nouvelle</a></li>
              <li><a href="#4-types" className="text-blue-ink hover:text-mint-green transition-colors">2. Les 4 types d'objections</a></li>
              <li><a href="#methode-4-etapes" className="text-blue-ink hover:text-mint-green transition-colors">3. La methode en 4 etapes</a></li>
              <li><a href="#cas-trop-cher" className="text-blue-ink hover:text-mint-green transition-colors">4. Cas pratique : C'est trop cher</a></li>
              <li><a href="#cas-associe" className="text-blue-ink hover:text-mint-green transition-colors">5. Cas pratique : Je dois en parler a mon associe</a></li>
              <li><a href="#conclusion-actions" className="text-blue-ink hover:text-mint-green transition-colors">6. Conclusion : 3 actions pour cette semaine</a></li>
            </ol>
          </nav>
          

          <div className="bg-mint-green/5 border-l-4 border-mint-green p-6 rounded-r-2xl mb-12">
            <p className="font-title font-bold text-blue-ink text-lg mb-3">À retenir</p>
            <ul className="space-y-2 text-gray-dark">
              <li><strong>Une objection n'est pas un refus</strong> — c'est un signe d'engagement. Le prospect désintéressé ne soulève pas d'objections.</li>
              <li><strong>Il existe 4 grandes familles</strong> : prix, timing, concurrence, autorité — chacune se traite différemment.</li>
              <li><strong>La méthode en 4 étapes</strong> : accuser réception → creuser → reformuler → répondre avec précision.</li>
              <li><strong>Ne jamais baisser le prix</strong> en première intention — recadrer la valeur avant d'envisager une alternative.</li>
            </ul>
          </div>

          <h2 id="pourquoi-bonne-nouvelle" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi les objections sont une bonne nouvelle</h2>

          <p className="mb-8">Contre-intuitif ? Oui. Mais réel.</p>

          <p className="mb-8">Une objection signifie que votre prospect est engagé. Il réfléchit. Il envisage sérieusement votre offre — sinon, il ne perdrait pas son temps à vous expliquer pourquoi il hésite.</p>

          <p className="mb-8">Le prospect désintéressé ne soulève pas d'objections. Il dit « non merci » et s'en va.</p>

          <p className="mb-8">Celui qui objecte vous donne une information précieuse : il y a un frein identifiable. Et un frein identifiable, ça se travaille.</p>

          <h2 id="4-types" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les 4 types d'objections que vous rencontrerez</h2>

          <p className="mb-4 font-semibold">1. L'objection prix</p>
          <p className="mb-8">« C'est trop cher », « On n'a pas le budget », « Votre concurrent est moins cher ».</p>
          <p className="mb-8">Souvent, ce n'est pas vraiment une question de prix. C'est une question de valeur perçue. Si le prospect ne voit pas clairement ce qu'il gagne, le prix sera toujours trop élevé.</p>

          <p className="mb-4 font-semibold">2. L'objection timing</p>
          <p className="mb-8">« Ce n'est pas le bon moment », « Revenez dans 6 mois », « On est en pleine réorganisation ».</p>
          <p className="mb-8">Parfois vraie, parfois prétexte pour esquiver. Votre mission : distinguer les deux.</p>

          <p className="mb-4 font-semibold">3. L'objection concurrence</p>
          <p className="mb-8">« On travaille déjà avec quelqu'un », « On est satisfaits de notre prestataire actuel ».</p>
          <p className="mb-8">Ne dénigrez jamais le concurrent. Explorez ce qui pourrait amener le prospect à changer ou à élargir.</p>

          <p className="mb-4 font-semibold">4. L'objection autorité</p>
          <p className="mb-8">« Je dois en parler à mon associé », « Ce n'est pas moi qui décide ».</p>
          <p className="mb-8">Classique. Identifiez les vrais décideurs et impliquez-les dans le processus.</p>

          <h2 id="methode-4-etapes" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">La méthode en 4 étapes pour traiter n'importe quelle objection</h2>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-10 mb-4">Étape 1 : Accuser réception sans céder</h3>
          <p className="mb-8">Ne réfutez pas immédiatement. Ne vous justifiez pas non plus. Accusez réception avec calme.</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « Je comprends votre préoccupation. »
          </blockquote>
          <p className="mb-8">Cette réaction désarme. Elle montre que vous n'êtes pas sur la défensive. Elle crée un espace de dialogue.</p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-10 mb-4">Étape 2 : Creuser pour comprendre le vrai fond</h3>
          <p className="mb-8">L'objection exprimée n'est souvent que la surface. Posez une question ouverte pour aller plus loin.</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « Quand vous dites que c'est trop cher, vous le comparez à quoi exactement ? »<br />
            « Qu'est-ce qui vous rend satisfait de votre prestataire actuel ? »
          </blockquote>
          <p className="mb-8">Cette étape est cruciale. Elle vous donne l'information réelle pour construire votre réponse.</p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-10 mb-4">Étape 3 : Reformuler et valider</h3>
          <p className="mb-8">Avant de répondre, reformulez ce que vous avez compris.</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « Si je comprends bien, votre hésitation principale porte sur le retour sur investissement — vous n'êtes pas certain que les résultats obtenus justifieront l'investissement. C'est ça ? »
          </blockquote>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-10 mb-4">Étape 4 : Répondre avec précision</h3>
          <p className="mb-8">Maintenant seulement, vous répondez. Avec des faits, des exemples, des chiffres si possible.</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « C'est exactement pour cette raison que je vais vous partager les résultats obtenus par une PME similaire à la vôtre : +35 % de rendez-vous qualifiés en 90 jours, pour un investissement de X€. Le ROI a été atteint en 4 mois. »
          </blockquote>

          <h2 id="cas-trop-cher" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Cas pratique : « C'est trop cher »</h2>

          <p className="mb-4 font-semibold">Ne pas faire :</p>
          <p className="mb-8">Baisser immédiatement le prix. Vous signalez que votre tarif initial n'était pas sérieux.</p>

          <p className="mb-4 font-semibold">Ce qu'il faut faire :</p>
          <ol className="list-decimal pl-6 mb-8">
            <li className="mb-2">Accuser réception : « Je comprends que le budget est une contrainte importante. »</li>
            <li className="mb-2">Creuser : « Pour être sûr de bien vous répondre — vous le comparez à votre budget disponible ou à l'offre d'un concurrent ? »</li>
            <li className="mb-2">Recadrer la valeur : montrer le coût de l'inaction vs l'investissement</li>
            <li className="mb-2">Proposer une alternative : démarrage progressif, paiement étalé</li>
          </ol>

          <h2 id="cas-associe" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Cas pratique : « Je dois en parler à mon associé »</h2>

          <p className="mb-8">Cette objection cache souvent une réalité simple : vous n'avez pas encore convaincu tous les décideurs.</p>

          <p className="mb-4 font-semibold">Ne pas faire :</p>
          <p className="mb-8">Envoyer une proposition par email en espérant que l'associé sera convaincu tout seul.</p>

          <p className="mb-4 font-semibold">Ce qu'il faut faire :</p>
          <blockquote className="border-l-4 border-mint-green pl-4 italic mb-8">
            « Bien sûr. Pour faciliter votre présentation à votre associé, qu'est-ce qui lui tient le plus à cœur dans ce type de décision ? Je peux préparer un document qui répond précisément à ses préoccupations. Et si c'est possible, j'apprécierais de le rencontrer — même 20 minutes par visio — pour répondre directement à ses questions. »
          </blockquote>
          <p className="mb-8">L'objectif : rester dans la boucle et ne pas laisser votre deal se perdre dans un dialogue entre votre prospect et une personne que vous n'avez pas encore rencontrée.</p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <p className="mb-6">
              Si vos équipes peinent à transformer les objections en opportunités, on peut travailler ensemble leur méthode de traitement et leur posture face aux freins réels des prospects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Échanger sur votre situation
              </Link>
            </div>
          </div>

          <h2 id="conclusion-actions" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Conclusion : 3 actions pour cette semaine</h2>

          <ol className="list-decimal pl-6 mb-8">
            <li className="mb-4"><strong>Listez les 5 objections que vous entendez le plus souvent.</strong> Pour chacune, rédigez votre réponse idéale en suivant les 4 étapes : réception → creuser → reformuler → répondre.</li>
            <li className="mb-4"><strong>Organisez un roleplay</strong> de 30 minutes avec un collègue ou votre équipe. L'un joue le prospect difficile, l'autre s'entraîne à traiter les objections.</li>
            <li className="mb-4"><strong>Après votre prochain entretien commercial,</strong> notez les objections soulevées et comment vous les avez traitées. L'analyse post-entretien est la meilleure école.</li>
          </ol>

          <p className="mb-8">Les objections ne sont pas des obstacles. Ce sont des portes. Apprenez à les ouvrir.</p>
        </div>
      </article>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-title font-bold text-blue-ink mb-8 text-center">
            Articles similaires
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/blog/pourquoi-meme-des-commerciaux-experimentes-se-font-encore-bananer-sur-lobjection-prix"
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <p className="text-xs text-mint-green font-semibold uppercase tracking-wide mb-2">Objection prix</p>
              <p className="font-title font-semibold text-blue-ink text-sm leading-snug">
                Objection prix : même des commerciaux expérimentés se font encore bananer
              </p>
            </Link>
            <Link
              href="/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader"
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <p className="text-xs text-mint-green font-semibold uppercase tracking-wide mb-2">Closing B2B</p>
              <p className="font-title font-semibold text-blue-ink text-sm leading-snug">
                Techniques de closing B2B : signer sans forcer et sans brader
              </p>
            </Link>
            <Link
              href="/blog/pourquoi-vos-commerciaux-repondent-trop-vite-aux-objections"
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <p className="text-xs text-mint-green font-semibold uppercase tracking-wide mb-2">Objections</p>
              <p className="font-title font-semibold text-blue-ink text-sm leading-snug">
                Objections : répondre trop vite vous fait perdre la main
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d'en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre cas mérite un échange plus direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
