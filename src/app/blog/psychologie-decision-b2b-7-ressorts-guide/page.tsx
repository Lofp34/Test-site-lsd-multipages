import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

const articleUrl = 'https://www.laurentserre.com/blog/psychologie-decision-b2b-7-ressorts-guide';
const heroImage = '/images/blog/psychologie-decision-b2b-guide/psychologie-decision-b2b-guide-hero.webp';

export const metadata: Metadata = {
  title: "Psychologie de décision B2B : guide gratuit des 7 ressorts qui font signer | Laurent Serre",
  description:
    "Un prospect ne compare pas des offres, il compare des risques. Découvrez les 7 ressorts psychologiques qui influencent toute décision d'achat B2B — et téléchargez le guide complet.",
  keywords:
    "psychologie de décision B2B, guide psychologie achat B2B, 7 ressorts décision achat, vente B2B psychologie, décision défendable, Laurent Serre",
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-09',
  },
  openGraph: {
    title: "Psychologie de décision B2B : les 7 ressorts qui poussent un prospect à signer",
    description:
      'Un acheteur B2B ne compare pas des offres, il compare des risques. Téléchargez le guide complet.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 1024,
        alt: 'Guide psychologie décision B2B - les 7 ressorts',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Psychologie de décision B2B : les 7 ressorts qui font signer",
    description:
      'Guide gratuit : les 7 ressorts psychologiques qui influencent toute décision d\'achat B2B.',
    images: [heroImage],
  },
};

export default function PsychologieDecisionGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: 'Psychologie de décision B2B : les 7 ressorts qui poussent un prospect à signer',
        description:
          'Un prospect ne compare pas des offres, il compare des risques. Découvrez les 7 ressorts psychologiques de la décision d\'achat B2B.',
        image: heroImage,
        datePublished: '2026-06-09',
        dateModified: '2026-06-09',
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
      {
        '@type': 'FAQPage',
        '@id': articleUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quels sont les 7 ressorts psychologiques de la décision d\'achat B2B ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les 7 ressorts sont : 1) l\'aversion au risque (perdre est plus fort que gagner), 2) le biais de confirmation (le client cherche des preuves de sa décision), 3) la preuve sociale (les pairs l\'ont fait), 4) l\'autorité (crédibilité du vendeur), 5) la cohérence (le client veut être aligné avec ses décisions passées), 6) la rareté (opportunité limitée dans le temps), 7) la réciprocité (donner avant de recevoir).',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment utiliser la psychologie de décision en vente B2B ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En pratique, cela signifie : cartographier les risques perçus par le client avant de pitcher votre solution, utiliser des cas clients comme preuve sociale, démontrer votre crédibilité par des faits précis plutôt que des arguments génériques, créer une cohérence entre les décisions passées du client et votre proposition, et donner de la valeur en amont (contenu, diagnostic) pour activer la réciprocité.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre une objection et un risque psychologique ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Une objection est ce que le client dit (prix, délai, concurrent). Un risque est ce qu\'il ressent : peur de se tromper, peur de perdre sa crédibilité en interne, peur de regretter après l\'achat. La plupart des objections de surface masquent un risque plus profond. Les traiter à la racine est plus efficace que d\'y répondre frontalement.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pourquoi les décisions B2B prennent-elles plus de temps que les décisions B2C ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Parce qu\'une décision B2B engage la responsabilité de l\'acheteur devant plusieurs parties prenantes. Ce n\'est pas un achat personnel mais une décision collective. L\'acheteur doit être capable de défendre son choix en interne après l\'entretien. Si vous ne l\'aidez pas à construire cette défense, le processus de décision s\'allonge indéfiniment.',
            },
          },
        ],
      },
    
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Ce qui se passe vraiment dans la tête d\'un…', 'item': 'https://www.laurentserre.com/blog/psychologie-decision-b2b-7-ressorts-guide' },
        ],
      }
],
  };

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Psychologie de décision B2B - Guide gratuit</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          Ce qui se passe vraiment dans la tête d'un acheteur B2B
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span>9 juin 2026</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full" />
          <span>~4 min de lecture</span>
        </div>

        <AuthorCard
          author={{
            name: 'Laurent Serre',
            role: 'Coach commercial : 15 ans de terrain PME',
            image: '/images/blog/Laurent-Serre-avatar.jpg',
          }}
        />

        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-10 shadow-lg">
          <Image
            src={heroImage}
            alt="Psychologie de décision B2B - les 7 ressorts"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Dans beaucoup de ventes B2B, le commercial croit que le client compare deux solutions.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            En réalité, il compare surtout deux risques.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Le risque de changer. Le risque de ne rien faire. Le risque de se tromper devant son patron. Le risque d'embarquer son équipe dans un choix qu'elle ne suivra pas. Le risque de payer trop cher pour un résultat trop flou.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            C'est là que se jouent beaucoup de ventes. Pas dans la dernière ligne du devis. Pas dans la remise. Pas dans la slide qui explique encore une fois pourquoi la solution est meilleure.
          </p>

          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            La décision n'est pas rationnelle, elle est défendable
          </h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            L'acheteur B2B cherche moins la solution parfaite que la décision qu'il pourra défendre en interne. Derrière chaque signature, il y a une personne qui doit pouvoir raconter pourquoi elle a choisi cette option, à ce moment-là, avec ce budget.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Les commerciaux qui comprennent ça ne vendent pas une solution. Ils vendent une décision que le client peut porter sans risque.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Mais comment faire concrètement ? Quels sont les ressorts qui poussent un prospect à dire oui -- ou à rester bloqué ? J'ai passé quinze ans à observer ces mécanismes sur le terrain. J'en ai tiré sept leviers psychologiques récurrents, avec pour chacun une question pratique à poser en entretien.
          </p>

          {/* CTA bloc - lead magnet */}
          <div className="mt-10 mb-10 bg-gradient-to-br from-blue-ink to-blue-ink/95 text-white rounded-2xl overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <p className="text-mint-green text-sm font-semibold uppercase tracking-wider mb-2">
                    Guide gratuit
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-title font-bold mb-4">
                    Psychologie de décision B2B : les 7 ressorts qui poussent un prospect à signer
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    11 pages. Cas concrets. Questions à poser. Checklist d'auto-diagnostic.
                  </p>
                  <a
                    href="/downloads/psychologie-decision-b2b-guide.pdf"
                    className="inline-flex items-center justify-center gap-2 bg-mint-green text-blue-ink font-semibold px-6 py-3 rounded-xl hover:bg-mint-green/90 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Télécharger le guide gratuit →
                  </a>
                </div>
                <div className="w-40 h-auto flex-shrink-0">
                  <Image
                    src="/images/guide-cover-thumb-psychologie-decision-b2b.webp"
                    alt="Couverture du guide Psychologie de décision B2B"
                    width={160}
                    height={240}
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            En quinze ans, j'ai vu des centaines de deals parfaitement construits sur le papier rester bloqués. Pas parce que l'offre était faible ou le prix trop élevé. Parce que la décision d'achat ne se jouait pas là où le commercial regardait.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Ce guide vous donne les clés de lecture de ce qui se passe vraiment dans la tête de votre prospect. Et surtout, les questions à poser pour l'aider à se décider.
          </p>

          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 7 ressorts en un coup d'oeil
          </h2>

          <div className="space-y-4 mb-8">
            {[
              ["La peur de la perte", "Ce que le client perd à ne rien faire pèse plus que ce qu'il gagne à changer."],
              ["La protection du statut", "Votre acheteur veut rester crédible avant tout."],
              ["La preuve sociale", "Personne n'aime être le premier à essayer quelque chose qui peut échouer."],
              ["L'autorité de confiance", "L'expert reconnu rassure plus que le vendeur bien préparé."],
              ["La cohérence engagée", "Un prospect qui s'est engagé verbalement est plus proche de signer."],
              ["La rareté utile", "Ce qui est disponible sans limite n'a pas de valeur perçue."],
              ["La sympathie professionnelle", "On achète plus facilement à quelqu'un qu'on apprécie et qui nous comprend."],
            ].map(([ressort, desc], i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl">
                <span className="text-mint-green font-bold text-lg flex-shrink-0 w-8">{(i+1).toString().padStart(2, '0')}</span>
                <div>
                  <p className="font-semibold text-blue-ink text-sm">{ressort}</p>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Pour chaque ressort, le guide détaille une scène concrète que vous avez probablement vécue, ce qu'il faut faire à la place, et la question exacte à poser. Et en fin de guide, une checklist pour analyser vos deals en cours.
          </p>

          {/* CTA final */}
          <div className="mt-12 bg-gradient-to-br from-blue-ink to-blue-ink/95 text-white rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-title font-bold mb-4">
              Prêt à lire le guide complet ?
            </h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
              11 pages avec cas concrets, questions à poser et checklist. Gratuit, sans inscription.
            </p>
            <a
              href="/downloads/psychologie-decision-b2b-guide.pdf"
              className="inline-flex items-center justify-center gap-2 bg-mint-green text-blue-ink font-semibold px-8 py-4 rounded-xl hover:bg-mint-green/90 transition-colors text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Télécharger le guide (PDF)
            </a>
          </div>

          {/* Lien vers l'article détaillé */}
          <div className="mt-8 p-6 bg-mint-green/5 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-blue-ink mb-2">Pour aller plus loin</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Vous préférez lire un article détaillé ? Découvrez
              <Link href="/blog/psychologie-acheteur-b2b-decision-defendable" className="text-mint-green hover:underline">
                {' '}l'article complet sur la psychologie de l'acheteur B2B{' '}
              </Link>
              et comment l'aider à défendre sa décision en interne.
            </p>
          </div>

        </div>

        {/* HubSpot Form */}
        <div className="mt-12">
          <HubSpotForm
            formId="blog-contact-form"
            title="Vous avez une question ?"
            description="Parlons de votre situation."
          />
        </div>

      </article>
    </main>
  );
}
