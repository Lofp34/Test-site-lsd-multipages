import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';

export const metadata: Metadata = {
  title: 'Votre meilleur commercial n\'est pas le plus sympa. C\'est celui qui ose déranger. | Laurent Serre',
  description:
    'Les commerciaux les plus appréciés ne sont pas ceux qui vendent le plus. La méthode Challenger Sales appliquée au terrain B2B français , sans confondre tension constructive et agressivité.',
  keywords:
    'challenger sales, méthode challenger sale, teach tailor take control, profil challenger, vente B2B, relation commerciale, tension constructive',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/challenger-sales-methode-terrain-b2b',
  },
  openGraph: {
    title: 'Votre meilleur commercial n\'est pas le plus sympa. C\'est celui qui ose déranger.',
    description:
      'Les commerciaux les plus appréciés ne sont pas ceux qui vendent le plus. La méthode Challenger Sales appliquée au terrain B2B français.',
    url: 'https://www.laurentserre.com/blog/challenger-sales-methode-terrain-b2b',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-25-challenger-sales-hero.webp',
        width: 1536,
        height: 1024,
        alt: 'Un commercial en rendez-vous client, qui ose poser une question inconfortable plutôt que de faire la conversation agréable',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Votre meilleur commercial n\'est pas le plus sympa. C\'est celui qui ose déranger.',
    description:
      'Les commerciaux les plus appréciés ne sont pas ceux qui vendent le plus. La réalité du terrain B2B le confirme.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-25-challenger-sales-hero.webp'],
  },
};

const carouselPrefix = '/images/blog/carrousel-challenger-sales';

const carouselImages = [
    { src: `${carouselPrefix}/01-cover.webp`, alt: 'Cover - Les 5 erreurs du vendeur gentil', index: 0 },
    { src: `${carouselPrefix}/02-erreur1.webp`, alt: 'Erreur 1 : confondre relationnel et avancement', index: 1 },
    { src: `${carouselPrefix}/03-erreur2.webp`, alt: 'Erreur 2 : éviter les sujets qui fâchent', index: 2 },
    { src: `${carouselPrefix}/04-erreur3.webp`, alt: 'Erreur 3 : accepter les je vais réfléchir', index: 3 },
    { src: `${carouselPrefix}/05-correction.webp`, alt: 'La correction : oser poser la question qui dérange', index: 4 },
  ];

export default function ChallengerSalesMethodeTerrainB2bPage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": "Votre meilleur commercial n'est pas le plus sympa. C'est celui qui ose déranger.",
        "description": "Les commerciaux les plus appréciés ne sont pas ceux qui vendent le plus. La méthode Challenger Sales appliquée au terrain B2B français , sans confondre tension constructive et agressivité.",
        "image": "https://www.laurentserre.com/images/blog/2026-05-25-challenger-sales-hero.webp",
        "datePublished": "2026-05-25",
        "dateModified": "2026-05-25",
        "author": {
          "name": "Laurent Serre",
          "url": "https://www.laurentserre.com/a-propos",
          "sameAs": [
            "https://www.linkedin.com/in/laurentserre34/",
            "https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/"
          ]
        },
        "publisher": {
          "name": "Laurent Serre",
          "url": "https://www.laurentserre.com"
        },
        "mainEntityOfPage": {
          "@id": "https://www.laurentserre.com/blog/challenger-sales-methode-terrain-b2b"
        },
        "articleSection": "Méthode de vente / posture commerciale",
        "keywords": [
          "challenger sales",
          "méthode challenger sale",
          "profil challenger",
          "vente B2B",
          "tension constructive"
        ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.laurentserre.com/blog/challenger-sales-methode-terrain-b2b"
    },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/challenger-sales-methode-terrain-b2b#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Pilier 1 , Teach : apporter quelque chose qui dérange',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le client vous reçoit parce qu\'il pense avoir un problème. Votre travail n\'est pas de confirmer ce qu\'il croit savoir. C\'est de lui montrer que la situation est différente , et souvent plus urgente , qu\'il ne le pense. Je vois des commerciaux qui passent un rendez-vous entier à reformuler ce que le client leur a dit au téléphone. Ils pensent prouver leur écoute. En réalité, ils ne déplacent rien. Un bon insight, c\'est une information que le client n\'a pas, ou qu\'il refuse de regarder en face.',
            },
          },
          {
            '@type': 'Question',
            name: 'Pilier 2 , Tailor : chaque interlocuteur a sa porte d\'entrée',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le même dossier, trois décideurs. L\'un achète sur la performance opérationnelle. L\'autre sur la sécurité. Le troisième sur l\'image politique interne. Si vous racontez exactement la même histoire aux trois, vous perdez au moins deux de ces décideurs. Personnaliser, ce n\'est pas changer la couleur du Powerpoint. C\'est montrer à chaque personne présente autour de la table pourquoi le sujet la concerne personnellement, dans ses objectifs, dans ses craintes, dans ce qu\'elle risque de perdre si elle n',
            },
          },
          {
            '@type': 'Question',
            name: 'Pilier 3 , Take Control : la tension constructive',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le mot « contrôle » fait peur aux commerciaux français. Ils l\'associent à la pression, au forcing, au closing agressif. Ce n\'est pas de ça qu\'il s\'agit. Prendre le contrôle, c\'est refuser de laisser le client définir seul le rythme, les critères et le calendrier. C\'est accepter qu\'une tension s\'installe, pas pour dominer l\'autre, mais pour que la conversation aille là où elle doit aller. Concrètement : quand un client dit « on va réfléchir », vous ne dites pas « parfait, je vous relance dans qui',
            },
          },
          {
            '@type': 'Question',
            name: 'Trois erreurs qui coûtent cher',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '1. Confondre challenger et agressif. Un challenger pose des questions inconfortables. Un agressif impose des réponses. La différence est dans l\'intention : l\'un cherche à faire réfléchir, l\'autre à faire plier. 2. Challenger trop tôt. Si vous ne connaissez pas le contexte et les vrais enjeux, votre insight sonne comme une leçon. La tension constructive se mérite : on ne dérange utilement que quand on a compris le terrain. 3. Challenger sans proposition. Déranger pour déranger, ça ne sert à rien.',
            },
          },
          {
            '@type': 'Question',
            name: 'Besoin d\'en parler plus directement ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Si votre cas mérite un échange plus direct, vous pouvez aussi laisser un message ici. ); }',
            },
          }
        ],
      },
  ],
};

  return (
<main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Méthode de vente / posture commerciale</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Votre meilleur commercial n'est pas le plus sympa. C'est celui qui ose déranger.
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-05-25">25 mai 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-05-25-challenger-sales-hero.webp"
              alt="Un commercial en rendez-vous, qui pose une question inconfortable à son client plutôt que de faire la conversation agréable"
              width={1536}
              height={1024}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={78}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          {/* TL;DR , Ce que vous allez retenir */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">✨ Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Les commerciaux les plus appréciés ne sont pas ceux qui vendent le plus. La méthode Challenger Sales repose sur trois piliers : Teach, Tailor, Take Control. Cet article vous montre comment oser la tension constructive sans être agressif.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD , Les 5 erreurs du vendeur gentil
            </p>
            <p className="text-sm text-amber-700 mb-5">
              5 planches illustrées , les pièges qui empêchent vos commerciaux de décrocher des décisions.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD , Les 5 erreurs du vendeur gentil"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-challenger-sales.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (5 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA , sous le carrousel */}
          <div className="mb-6 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vous ne savez pas si vos équipes challengent ou simplement écoutent ? Faites un diagnostic →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#pilier1" className="text-mint-green hover:underline">Pilier 1 , Teach : apporter quelque chose qui dérange</a></li>
              <li><a href="#pilier2" className="text-mint-green hover:underline">Pilier 2 , Tailor : chaque interlocuteur a sa porte d'entrée</a></li>
              <li><a href="#pilier3" className="text-mint-green hover:underline">Pilier 3 , Take Control : la tension constructive</a></li>
              <li><a href="#erreurs" className="text-mint-green hover:underline">Trois erreurs qui coûtent cher</a></li>
            </ul>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Il arrive chez le client souriant. Il écoute, il note, il rebondit. Il pose des questions polies, il crée une bonne ambiance. Le client l'apprécie. Le rendez-vous se termine bien. Puis le dossier n'avance pas.
          </p>

          <p className="mb-8">
            Le commercial ne comprend pas. Le client l'aime bien, non ? Oui. Mais dans un cycle B2B long et complexe, être apprécié ne suffit pas. Il faut aussi déranger un peu. Pas pour être désagréable , pour faire bouger la réflexion.
          </p>

          <p className="mb-8">
            C'est le cœur de ce que la littérature anglo-saxonne appelle Challenger Sales. Les équipes de vente qui performent dans les cycles complexes ne sont pas celles qui écoutent le mieux en réunion. Ce sont celles qui apportent une lecture dérangeante, personnalisent leur message par décideur, et gardent la main sur le rythme de la vente. Ce n'est pas de l'agressivité. C'est de la tension constructive.
          </p>

          <p className="mb-8">
            Le piège est simple : on forme les commerciaux à bien s'entendre avec tout le monde. On leur dit d'écouter, de comprendre, d'être empathiques. Et on se demande pourquoi ils décrochent des sourires sans décrocher des décisions. Le problème ne vient pas de leur écoute. Il vient de ce qu'ils n'osent pas faire avec cette écoute.
          </p>

          <h2 id="pilier1" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pilier 1 , Teach : apporter quelque chose qui dérange</h2>

          <p className="mb-8">
            Le client vous reçoit parce qu'il pense avoir un problème. Votre travail n'est pas de confirmer ce qu'il croit savoir. C'est de lui montrer que la situation est différente , et souvent plus urgente , qu'il ne le pense.
          </p>

          <p className="mb-8">
            Je vois des commerciaux qui passent un rendez-vous entier à reformuler ce que le client leur a dit au téléphone. Ils pensent prouver leur écoute. En réalité, ils ne déplacent rien. Un bon insight, c'est une information que le client n'a pas, ou qu'il refuse de regarder en face.
          </p>

          <h2 id="pilier2" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pilier 2 , Tailor : chaque interlocuteur a sa porte d'entrée</h2>

          <p className="mb-8">
            Le même dossier, trois décideurs. L'un achète sur la performance opérationnelle. L'autre sur la sécurité. Le troisième sur l'image politique interne. Si vous racontez exactement la même histoire aux trois, vous perdez au moins deux de ces décideurs.
          </p>

          <p className="mb-8">
            Personnaliser, ce n'est pas changer la couleur du Powerpoint. C'est montrer à chaque personne présente autour de la table pourquoi le sujet la concerne personnellement, dans ses objectifs, dans ses craintes, dans ce qu'elle risque de perdre si elle ne tranche pas.
          </p>

          <h2 id="pilier3" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pilier 3 , Take Control : la tension constructive</h2>

          <p className="mb-8">
            Le mot « contrôle » fait peur aux commerciaux français. Ils l'associent à la pression, au forcing, au closing agressif. Ce n'est pas de ça qu'il s'agit. Prendre le contrôle, c'est refuser de laisser le client définir seul le rythme, les critères et le calendrier. C'est accepter qu'une tension s'installe, pas pour dominer l'autre, mais pour que la conversation aille là où elle doit aller.
          </p>

          <p className="mb-8">
            Concrètement : quand un client dit « on va réfléchir », vous ne dites pas « parfait, je vous relance dans quinze jours ». Vous dites « qu'est-ce que vous allez regarder précisément ? » Et vous creusez.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>La tension n'est pas un problème relationnel. C'est un signal que la décision devient sérieuse.</strong>
            </p>
          </div>

          <h2 id="erreurs" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Trois erreurs qui coûtent cher</h2>

          <p className="mb-8">
            <strong>1. Confondre challenger et agressif.</strong> Un challenger pose des questions inconfortables. Un agressif impose des réponses. La différence est dans l'intention : l'un cherche à faire réfléchir, l'autre à faire plier.
          </p>

          <p className="mb-8">
            <strong>2. Challenger trop tôt.</strong> Si vous ne connaissez pas le contexte et les vrais enjeux, votre insight sonne comme une leçon. La tension constructive se mérite : on ne dérange utilement que quand on a compris le terrain.
          </p>

          <p className="mb-8">
            <strong>3. Challenger sans proposition.</strong> Déranger pour déranger, ça ne sert à rien. Si vous mettez le client mal à l'aise, vous devez avoir une porte de sortie : une autre manière de voir, une solution, une direction qu'il n'avait pas envisagée.
          </p>

          <p className="mb-8">
            Ce n'est pas un concours de gentillesse. Si vous voulez creuser un autre levier de la relation de confiance, le modèle{' '}
            <Link href="/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre" className="text-blue-ink font-semibold underline hover:text-mint-green">
              vente consultative
            </Link>
            reste un bon socle. La{' '}
            <Link href="/ressources/meilleurs-livres/methodes-process/the-challenger-sale" className="text-blue-ink font-semibold underline hover:text-mint-green">
              fiche détaillée du livre The Challenger Sale
            </Link>
            peut aussi vous aider à creuser le concept.
          </p>

          <p className="mb-8">
            Un bon commercial ne choisit pas entre être apprécié et être efficace. Il choisit d'être utile , et parfois, être utile, ça commence par déranger un peu.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez vérifier si vos équipes challengent ou simplement écoutent ?</h3>
            <p className="mb-6">
              Beaucoup de dirigeants pensent que leurs commerciaux doivent être plus « agressifs » pour vendre plus. Le problème n'est souvent pas là : ils manquent d'aisance dans la tension utile. Un diagnostic permet de voir où ça coince vraiment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Découvrir le Bootcamp Méthodes de vente
              </Link>
            </div>
          </div>

          {/* ════════ POUR ALLER PLUS LOIN ════════ */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/ressources/meilleurs-livres/methodes-process/the-challenger-sale" className="text-mint-green hover:underline font-medium">
                  The Challenger Sale , la fiche livre complète
                </Link>
                <span className="text-gray-500"> , Pour creuser le concept et les études CEB.</span>
              </li>
              <li>
                <Link href="/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre" className="text-mint-green hover:underline font-medium">
                  Vente consultative B2B : devenir le conseiller qu'on ne veut pas perdre
                </Link>
                <span className="text-gray-500"> , L'autre posture complémentaire au challenger.</span>
              </li>
              <li>
                <Link href="/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader" className="text-mint-green hover:underline font-medium">
                  Techniques de closing B2B
                </Link>
                <span className="text-gray-500"> , Pour conclure sans brader quand la tension a porté ses fruits.</span>
              </li>
            </ul>
          </div>
        </div>
      </article>

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
