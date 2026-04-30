import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Prospection téléphonique B2B : l’appel au hasard est mort | Laurent Serre',
  description:
    'La prospection téléphonique fonctionne encore quand elle sert un vrai échange préparé. Ce qui ne marche plus, c’est l’appel lancé au hasard pour réciter un argumentaire.',
  keywords:
    'prospection téléphonique B2B, prospection commerciale, appel commercial, cold calling B2B, prospection PME, rendez-vous qualifiés, vente B2B',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/le-telephone-nest-pas-mort-mais-lappel-au-hasard-lest',
  },
  openGraph: {
    title: 'Le téléphone n’est pas mort, mais l’appel au hasard l’est',
    description:
      'La prospection téléphonique fonctionne encore quand elle sert un vrai échange préparé. Ce qui ne marche plus, c’est l’appel lancé au hasard pour réciter un argumentaire.',
    url: 'https://www.laurentserre.com/blog/le-telephone-nest-pas-mort-mais-lappel-au-hasard-lest',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-30-prospection-telephone-b2b-hero.png',
        width: 1536,
        height: 1024,
        alt: 'Laurent Serre prépare un appel de prospection téléphonique B2B avec des notes et une liste de prospects qualifiés',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le téléphone n’est pas mort, mais l’appel au hasard l’est',
    description:
      'La prospection téléphonique fonctionne encore quand elle est préparée, située et utile. L’appel lancé au hasard, lui, abîme la vente.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-30-prospection-telephone-b2b-hero.png'],
  },
};

export default function TelephoneNestPasMortMaisAppelAuHasardPage() {
  const articleUrl = 'https://www.laurentserre.com/blog/le-telephone-nest-pas-mort-mais-lappel-au-hasard-lest';
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Le téléphone n’est pas mort, mais l’appel au hasard l’est',
    description:
      'La prospection téléphonique fonctionne encore quand elle sert un vrai échange préparé. Ce qui ne marche plus, c’est l’appel lancé au hasard pour réciter un argumentaire.',
    image: 'https://www.laurentserre.com/images/blog/2026-04-30-prospection-telephone-b2b-hero.png',
    datePublished: '2026-04-30',
    dateModified: '2026-04-30',
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
    articleSection: 'Prospection commerciale',
    keywords: ['prospection téléphonique B2B', 'prospection commerciale', 'vente B2B PME', 'rendez-vous qualifiés'],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'La prospection téléphonique B2B fonctionne-t-elle encore en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, si l’appel est préparé, ciblé et relié à une situation précise du prospect. Ce qui fonctionne moins, c’est l’appel lancé au hasard avec un script générique.',
        },
      },
      {
        '@type': 'Question',
        name: 'Pourquoi les appels de prospection échouent-ils souvent ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ils échouent souvent parce que le commercial appelle sans raison claire, parle trop vite de lui ou cherche à présenter une solution avant d’avoir vérifié si le problème existe vraiment.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel est le rôle du téléphone dans une séquence de prospection moderne ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le téléphone sert à remettre de l’humain dans une séquence plus large, à qualifier vite un sujet et à entendre des signaux que l’écrit ne montre pas toujours.',
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
      { '@type': 'ListItem', position: 3, name: 'Prospection téléphonique B2B', item: articleUrl },
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
              <span className="font-title font-semibold text-mint-green text-sm">Prospection commerciale / vente terrain</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Le téléphone n’est pas mort, mais l’appel au hasard l’est
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-30">30 avril 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-30-prospection-telephone-b2b-hero.png"
              alt="Laurent Serre prépare un appel de prospection téléphonique B2B avec des notes et une liste de prospects qualifiés"
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
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            La prospection téléphonique fonctionne encore quand elle sert un vrai échange préparé. Ce qui ne marche plus, c’est l’appel lancé au hasard pour réciter un argumentaire.
          </p>

          <p className="mb-8">La prospection téléphonique n’est pas morte. Ce qui est mort, c’est l’appel au hasard, sans préparation, sans raison claire, sans respect du temps de la personne en face.</p>

          <p className="mb-8">Et franchement, c’est plutôt une bonne nouvelle.</p>

          <p className="mb-8">Pendant des années, beaucoup d’équipes ont confondu prospection téléphonique et volume d’appels. On donnait une liste, un script, un objectif de contacts, puis on demandait au commercial de tenir. À la fin de la matinée, il avait surtout dérangé vingt personnes et pris trois refus qui n’apprenaient pas grand-chose.</p>

          <p className="mb-8">Dans une PME, je vois encore cette scène. Le dirigeant veut relancer la conquête. Le directeur commercial demande plus d’activité. Les commerciaux reprennent le téléphone, mais sans savoir exactement pourquoi ils appellent cette entreprise-là, cette personne-là, maintenant.</p>

          <p className="mb-8">Alors l’appel commence mal.</p>

          <p className="mb-8">“Bonjour, je me présente, nous sommes spécialisés dans…”</p>

          <p className="mb-8">Le prospect décroche entre deux réunions. Il n’a rien demandé. Il entend une phrase de plaquette. Il se protège. Et tout le monde conclut que le téléphone ne marche plus.</p>

          <p className="mb-8">Ce n’est pas le téléphone qui ne marche plus. C’est l’appel pauvre.</p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Un appel utile commence avant de composer le numéro</h2>

          <p className="mb-8">Un bon appel de prospection en 2026 doit arriver après un minimum de lecture. Pas une enquête de trois heures. Juste assez pour comprendre l’entreprise, le rôle de la personne, le moment possible, le sujet qui peut mériter trente secondes d’attention.</p>

          <p className="mb-8">On n’appelle pas pour dérouler une présentation. On appelle pour vérifier si un problème existe vraiment, s’il compte maintenant, et s’il vaut un échange plus sérieux.</p>

          <p className="mb-8">La différence est énorme.</p>

          <p className="mb-8">Un commercial qui appelle “pour présenter ses solutions” se met tout de suite en position de gêner. Un commercial qui appelle parce qu’il a repéré une situation précise peut ouvrir une conversation. C’est la même logique que dans la découverte : si <Link href="/blog/votre-client-nest-souvent-pas-conscient-du-probleme-que-vous-pouvez-resoudre">le client n’est pas encore conscient du vrai problème</Link>, il faut l’aider à le regarder, pas lui réciter une offre.</p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8 rounded-r-xl">
            <p className="text-base mb-0">
              <strong>À retenir :</strong> un appel de prospection n’a pas besoin d’être brillant. Il doit être situé, légitime et facile à refuser. C’est souvent ce qui le rend possible à écouter.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">La première phrase dit déjà beaucoup du niveau commercial</h2>

          <p className="mb-8">Par exemple : “Je vous appelle parce que je travaille avec des PME qui ont du mal à transformer leurs actions de prospection en rendez-vous vraiment qualifiés. J’ai vu que vous renforciez votre équipe commerciale. Est-ce que le sujet est d’actualité chez vous, ou pas du tout ?”</p>

          <p className="mb-8">Ce n’est pas magique. Certains diront non. Certains couperont court. C’est normal.</p>

          <p className="mb-8">Mais l’appel devient propre. Court. Situé. Facile à refuser. Et justement, parce qu’il est facile à refuser, il devient parfois possible à écouter.</p>

          <p className="mb-8">L’autre erreur, c’est de croire que le téléphone doit tout faire. Non. Le téléphone n’est pas une stratégie complète. C’est un moment de vérité dans une séquence plus large : un contenu vu, un message envoyé, une recommandation, un signal d’activité, puis un appel qui remet de l’humain là où tout le monde automatise.</p>

          <p className="mb-8">Dans un marché saturé de messages LinkedIn tièdes et d’emails écrits par l’IA, une voix préparée peut redevenir différenciante.</p>

          <p className="mb-8">Mais seulement si elle ne vient pas réciter.</p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le téléphone sert à qualifier, pas à forcer</h2>

          <p className="mb-8">Le téléphone sert à entendre une hésitation, une impatience, une curiosité, une objection qui n’aurait jamais été écrite dans un mail. Il sert aussi à qualifier vite : est-ce un vrai sujet, un sujet pour plus tard, ou pas un sujet du tout ?</p>

          <p className="mb-8">C’est précieux pour une équipe commerciale. À condition de le traiter comme un outil de discernement, pas comme une punition d’activité.</p>

          <p className="mb-8">Si vos commerciaux n’aiment plus appeler, la question n’est pas seulement leur motivation. Il faut regarder la qualité des listes, la clarté de l’angle, la pertinence des premières phrases, et surtout ce qu’ils cherchent vraiment à obtenir. Sinon, on retombe vite dans <Link href="/blog/pourquoi-beaucoup-relances-commerciales-affaiblissent-vente">des relances qui affaiblissent la vente</Link> au lieu de la faire avancer.</p>

          <p className="mb-8">Un appel de prospection n’a pas besoin d’être brillant.</p>

          <p className="mb-8">Il doit être légitime.</p>

          <p className="mb-8">Et c’est souvent là que tout se joue.</p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <p className="mb-6">
              Si vos commerciaux appellent beaucoup mais obtiennent peu de vrais échanges, on peut reprendre vos accroches, vos listes et votre manière de qualifier les premiers signaux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/bootcamp-commercial-intensif" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Structurer la prospection avec le Bootcamp
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
