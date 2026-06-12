import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Je reçois 50 messages LinkedIn par jour — et j\'en lis à peine 3 | Laurent Serre',
  description:
    'LinkedIn prospection B2B : 50 messages génériques reçus, 3 lus. La différence ? L\'attention réelle. Une règle simple avant d\'écrire à un prospect.',
  keywords:
    'LinkedIn prospection B2B, message LinkedIn personnalisé, prospection commerciale LinkedIn, attention réelle prospect, template LinkedIn, générique, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/linkedin-prospection-b2b-50-messages-par-jour',
  },
  other: {
    'dateModified': '2026-05-11',
  },
  openGraph: {
    title: 'Je reçois 50 messages LinkedIn par jour — et j\'en lis à peine 3',
    description:
      'LinkedIn ne marche pas ? Le problème n\'est pas la plateforme. C\'est le message. Ce qui fait la différence entre un message supprimé et un rendez-vous.',
    url: 'https://www.laurentserre.com/blog/linkedin-prospection-b2b-50-messages-par-jour',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-10-linkedin-prospection-b2b-hero.webp',
        width: 1536,
        height: 864,
        alt: 'LinkedIn prospection B2B — l\'attention réelle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Je reçois 50 messages LinkedIn par jour — et j\'en lis à peine 3 | Laurent Serre',
    description:
      'LinkedIn ne marche pas ? Le problème n\'est pas la plateforme. C\'est le message. Ce qui fait la différence entre un message supprimé et un rendez-vous.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-10-linkedin-prospection-b2b-hero.webp'],
  },
};

export default function ArticlePage() {
  const articleUrl = 'https://www.laurentserre.com/blog/linkedin-prospection-b2b-50-messages-par-jour';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Je reçois 50 messages LinkedIn par jour — et j\'en lis à peine 3',
        description:
          'LinkedIn prospection B2B : 50 messages génériques reçus, 3 lus. La différence ? L\'attention réelle. Ce qui fait la différence entre un message supprimé et un rendez-vous.',
        image: 'https://www.laurentserre.com/images/blog/2026-05-10-linkedin-prospection-b2b-hero.webp',
        datePublished: '2026-05-11',
        dateModified: '2026-05-11',
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
          name: 'Laurent Serre',
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
      },
    ,
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/linkedin-prospection-b2b-50-messages-par-jour#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Ce qui fait la différence entre un message supprimé et un rendez-vous',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'J\'accompagne des PME depuis quinze ans. Quand un commercial me dit « LinkedIn ne marche pas », je lui demande de me montrer ses messages sortants. Dans 9 cas sur 10, le problème saute aux yeux. Le message est générique. Il pourrait être envoyé à n\'importe qui. Le prospect le lit et ne se sent pas concerné. À l\'inverse, les rares messages qui obtiennent une réponse ont un point commun : ils montrent que l\'expéditeur a pris le temps de regarder qui est vraiment son interlocuteur. Pas « J\'ai vu vot',
            },
          },
          {
            '@type': 'Question',
            name: 'Le piège des templates',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Quand on commence à prospecter sur LinkedIn, on cherche des modèles. C\'est humain. On veut être efficace, gagner du temps. Mais un template sans personnalisation, c\'est comme un argumentaire de vente lu sans regarder le client. Ça se sent. Et ça repousse plus que ça n\'attire. Les cinq types de messages qui marchent vraiment sur LinkedIn sont ceux qu\'on ne peut pas copier-coller sans rien changer : un insight tiré de l\'activité réelle du prospect, une référence à un échange commun, un trigger lié',
            },
          },
          {
            '@type': 'Question',
            name: 'Ce que les gens confondent avec de la prospection',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Beaucoup de commerciaux confondent volume et visibilité. Envoyer 50 messages génériques par jour donne l\'impression d\'être actif. Mais l\'impact réel est proche de zéro. À l\'inverse, envoyer 5 messages ultra-personnalisés par semaine, c\'est peu gratifiant sur le moment. Mais sur trois mois, c\'est cinq fois plus efficace. LinkedIn n\'est pas un distributeur de rendez-vous. C\'est un amplificateur d\'attention réelle. Si vous n\'avez pas pris le temps de comprendre votre prospect avant d\'écrire, la pla',
            },
          },
          {
            '@type': 'Question',
            name: 'Une règle simple',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Avant d\'écrire à quelqu\'un sur LinkedIn, posez-vous une question : est-ce que je serais prêt à lui dire la même chose en face, en le regardant dans les yeux ? Si la réponse est non, votre message ne mérite pas d\'être envoyé. Si elle est oui, alors LinkedIn est le canal le plus efficace pour transformer une attention réelle en rendez-vous commercial. La plateforme ne fait pas le travail à votre place. Mais elle vous donne un accès direct à des centaines de décideurs que vous n\'auriez jamais attei',
            },
          }
        ],
      },
],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Fil d'Ariane */}
        <nav className="mb-8 text-sm">
          <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors">
            Blog
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500">LinkedIn prospection B2B</span>
        </nav>

        {/* Image hero */}
        <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/blog/2026-05-10-linkedin-prospection-b2b-hero.webp"
            alt="LinkedIn prospection B2B — l'attention réelle"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <time dateTime="2026-05-11">11 mai 2026</time>
          <span aria-hidden="true">·</span>
          <span>Prospection commerciale</span>
        </div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          Je reçois 50 messages LinkedIn par jour — et j'en lis à peine 3
        </h1>

        {/* Auteur */}
        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial',
            image: '/images/blog/Laurent-Serre-avatar.jpg',
          }}
        />

        {/* TL;DR */}
        <div className="mt-8 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
          <p className="text-sm font-semibold text-blue-ink mb-2">À retenir</p>
          <p className="text-gray-700 leading-relaxed">
            Les messages LinkedIn génériques sont ignorés. Ceux qui obtiennent des rendez-vous montrent
            une attention réelle au prospect. Envoyer 5 messages ultra-personnalisés par semaine est
            plus efficace que 50 templates. Règle simple : si vous ne le diriez pas en face, ne
            l'écrivez pas.
          </p>
        </div>

        {/* Sommaire */}
        <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Sommaire</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#difference" className="text-mint-green hover:underline">
                Ce qui fait la différence entre un message supprimé et un rendez-vous
              </a>
            </li>
            <li>
              <a href="#piege-templates" className="text-mint-green hover:underline">
                Le piège des templates
              </a>
            </li>
            <li>
              <a href="#confusion" className="text-mint-green hover:underline">
                Ce que les gens confondent avec de la prospection
              </a>
            </li>
            <li>
              <a href="#regle" className="text-mint-green hover:underline">
                Une règle simple
              </a>
            </li>
          </ul>
        </div>

        {/* Contenu */}
        <div className="mt-10 prose prose-lg max-w-none prose-a:text-mint-green prose-a:no-underline hover:prose-a:underline prose-strong:text-blue-ink">
          <p>
            La semaine dernière, un commercial m'a envoyé un message sur LinkedIn. Il commençait par
            « J'ai vu votre profil très intéressant ». Il n'avait pas vu mon profil. Il avait copié-collé
            un template.
          </p>

          <p>
            Je ne lui ai pas répondu. Pas parce que je suis désagréable. Parce que 47 autres commerciaux
            avaient fait exactement la même chose dans la même semaine.
          </p>

          <p>
            Et pourtant. Certains messages LinkedIn, je les ouvre. Je les lis. Et parfois, je prends un
            rendez-vous.
          </p>

          <p className="font-semibold text-blue-ink text-xl">
            La différence n'a rien à voir avec LinkedIn. Elle a tout à voir avec la façon dont le message
            est construit.
          </p>

          <h2 id="difference" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce qui fait la différence entre un message supprimé et un rendez-vous
          </h2>

          <p>
            J'accompagne des PME depuis quinze ans. Quand un commercial me dit « LinkedIn ne marche pas
            », je lui demande de me montrer ses messages sortants. Dans 9 cas sur 10, le problème saute
            aux yeux.
          </p>

          <p>
            Le message est générique. Il pourrait être envoyé à n'importe qui. Le prospect le lit et ne
            se sent pas concerné.
          </p>

          <p>
            À l'inverse, les rares messages qui obtiennent une réponse ont un point commun : ils montrent
            que l'expéditeur a pris le temps de regarder qui est vraiment son interlocuteur.
          </p>

          <p>
            Pas « J'ai vu votre profil intéressant ». Mais « J'ai lu votre post sur la transformation des
            équipes, et je suis en train d'accompagner une PME qui vit exactement ce passage. »
          </p>

          <p className="font-semibold">
            La différence, c'est l'attention réelle. Et ça se voit.
          </p>

          <h2 id="piege-templates" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Le piège des templates</h2>

          <p>
            Quand on commence à prospecter sur LinkedIn, on cherche des modèles. C'est humain. On veut
            être efficace, gagner du temps.
          </p>

          <p>
            Mais un template sans personnalisation, c'est comme un argumentaire de vente lu sans regarder
            le client. Ça se sent. Et ça repousse plus que ça n'attire.
          </p>

          <p>
            Les cinq types de messages qui marchent vraiment sur LinkedIn sont ceux qu'on ne peut pas
            copier-coller sans rien changer : un insight tiré de l'activité réelle du prospect, une
            référence à un échange commun, un trigger lié à une actualité récente.
          </p>

          <p>Pas besoin d'être un expert LinkedIn. Juste d'être attentif.</p>

          <h2 id="confusion" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que les gens confondent avec de la prospection</h2>

          <p>
            Beaucoup de commerciaux confondent volume et visibilité. Envoyer 50 messages génériques par
            jour donne l'impression d'être actif. Mais l'impact réel est proche de zéro.
          </p>

          <p>
            À l'inverse, envoyer 5 messages ultra-personnalisés par semaine, c'est peu gratifiant sur le
            moment. Mais sur trois mois, c'est cinq fois plus efficace.
          </p>

          <p>
            LinkedIn n'est pas un distributeur de rendez-vous. C'est un amplificateur d'attention réelle.
            Si vous n'avez pas pris le temps de comprendre votre prospect avant d'écrire, la plateforme
            n'y changera rien.
          </p>

          {/* Bloc chiffre clé */}
          <div className="not-prose my-10 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-mint-green/20 text-center">
            <p className="text-4xl font-bold text-blue-ink mb-2">50 vs 5</p>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              50 messages génériques par jour pour l'impression d'être actif. 5 messages
              personnalisés par semaine pour des rendez-vous réels.
            </p>
          </div>

          <h2 id="regle" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Une règle simple</h2>

          <p>
            Avant d'écrire à quelqu'un sur LinkedIn, posez-vous une question : est-ce que je serais prêt
            à lui dire la même chose en face, en le regardant dans les yeux ?
          </p>

          <p>
            Si la réponse est non, votre message ne mérite pas d'être envoyé.
          </p>

          <p>
            Si elle est oui, alors LinkedIn est le canal le plus efficace pour transformer une attention
            réelle en rendez-vous commercial.
          </p>

          <p>
            La plateforme ne fait pas le travail à votre place. Mais elle vous donne un accès direct à
            des centaines de décideurs que vous n'auriez jamais atteints autrement. À vous de faire le
            reste.
          </p>

          <p className="font-semibold text-xl text-blue-ink">
            Et ça commence par regarder vraiment la personne de l'autre côté de l'écran.
          </p>
        </div>

        {/* Pour aller plus loin */}
        <div className="mt-12 p-8 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
          <p className="text-lg font-title font-bold text-blue-ink mb-4">📖 Pour aller plus loin</p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <Link href="/blog/prospection-b2b-2026-methode-4-blocs-rdv-qualifies" className="text-mint-green hover:underline font-medium">
                Prospection B2B 2026 : la méthode 4 blocs pour générer plus de RDV qualifiés
              </Link>
              <span className="block text-gray-500 mt-0.5">Le complément méthode pour transformer l'attention réelle en rendez-vous qualifiés.</span>
            </li>
            <li>
              <Link href="/blog/pipeline-commercial-q2-2026-5-decisions-dirigeant" className="text-mint-green hover:underline font-medium">
                Pipeline commercial Q2 2026 : 5 décisions de dirigeant pour sécuriser le chiffre d'affaires
              </Link>
              <span className="block text-gray-500 mt-0.5">Une fois le contact établi, comment construire un pipeline solide et arbitrable.</span>
            </li>
            <li>
              <Link href="/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre" className="text-mint-green hover:underline font-medium">
                Vente consultative B2B : devenir le conseiller que vos clients ne veulent pas perdre
              </Link>
              <span className="block text-gray-500 mt-0.5">De la prospection à la vente : la posture qui transforme l'approche.</span>
            </li>
          </ul>
          <p className="text-xs text-gray-400 mt-4">
            Source externe : <a href="https://hbr.org/2024/02/research-how-to-build-and-maintain-social-capital-on-linkedin" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">Research: How to Build and Maintain Social Capital on LinkedIn — Harvard Business Review</a>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-ink/5 to-mint-green/5 rounded-2xl border border-mint-green/20">
          <h3 className="text-2xl font-title font-bold text-blue-ink mb-4">
            🎯 Vous voulez que vos messages LinkedIn obtiennent des rendez-vous ?
          </h3>
          <p className="text-gray-600 mb-6">
            Je peux vous aider à construire une approche de prospection qui repose sur l'attention
            réelle, pas sur le volume. Commencez par un diagnostic commercial.
          </p>
          <Link
            href="/diagnostic?utm_source=blog&utm_medium=organic&utm_campaign=prospection-commerciale&utm_content=linkedin-50-messages"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
          >
            Diagnostic gratuit →
          </Link>
        </div>

        {/* Navigation articles */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="text-mint-green hover:text-mint-green/80 transition-colors font-medium"
          >
            ← Tous les articles du blog
          </Link>
        </div>
      </article>

      {/* HubSpot form */}
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
