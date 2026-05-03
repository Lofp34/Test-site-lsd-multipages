import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'L’argent n’est pas le problème, c’est la mesure objective de la valeur | Laurent Serre',
  description:
    'Quand un prospect dit qu’il n’a pas le budget, le vrai sujet est souvent ailleurs. L’argent mesure surtout la valeur perçue, la priorité et la confiance accordée à la décision.',
  keywords:
    'budget client vente, valeur perçue vente, objection prix b2b, arbitrage budget prospect, priorite commerciale, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/largent-nest-pas-le-probleme-cest-la-mesure-objective-de-la-valeur',
  },
  openGraph: {
    title: 'L’argent n’est pas le problème, c’est la mesure objective de la valeur',
    description:
      'En vente, l’argent ne sert pas seulement à payer. Il révèle ce que le client est vraiment prêt à traiter maintenant.',
    url: 'https://www.laurentserre.com/blog/largent-nest-pas-le-probleme-cest-la-mesure-objective-de-la-valeur',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-16-argent-mesure-valeur-hero.png',
        width: 2048,
        height: 2048,
        alt: 'Portrait éditorial avec symbole euro et balance pour illustrer la valeur perçue en vente',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L’argent n’est pas le problème, c’est la mesure objective de la valeur',
    description:
      'Quand le budget ne sort pas, le vrai sujet est souvent la valeur perçue, la priorité et la confiance.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-16-argent-mesure-valeur-hero.png'],
  },
};

export default function LargentNestPasLeProblemeCestLaMesureObjectiveDeLaValeurPage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "L’argent n’est pas le problème, c’est la mesure objective de la valeur",
  "description": "Quand un prospect dit qu’il n’a pas le budget, le vrai sujet est souvent ailleurs. L’argent mesure surtout la valeur perçue, la priorité et la confiance accordée à la décision.",
  "image": "https://www.laurentserre.com/images/blog/2026-04-16-argent-mesure-valeur-hero.png",
  "datePublished": "2026-04-16",
  "dateModified": "2026-04-16",
  "author": {
    "@type": "Person",
    "name": "Laurent Serre",
    "url": "https://www.laurentserre.com/a-propos",
    "sameAs": [
      "https://www.linkedin.com/in/laurentserre34/",
      "https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Laurent Serre Développement",
    "url": "https://www.laurentserre.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.laurentserre.com/blog/largent-nest-pas-le-probleme-cest-la-mesure-objective-de-la-valeur"
  },
  "articleSection": "Psychologie commerciale / valeur perçue",
  "keywords": [
    "budget client vente",
    "valeur perçue vente",
    "objection prix b2b",
    "arbitrage budget prospect",
    "priorite commerciale",
    "Laurent Serre"
  ]
};

  return (
<main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Psychologie commerciale / valeur perçue</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              L’argent n’est pas le problème, c’est la mesure objective de la valeur
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-16">16 avril 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-16-argent-mesure-valeur-hero.png"
              alt="Portrait éditorial avec symbole euro et balance pour illustrer la valeur perçue en vente"
              width={2048}
              height={2048}
              className="w-full h-auto object-cover object-center rounded-2xl shadow-lg"
              quality={78}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            On a tous entendu des commerciaux sortir d’un rendez-vous en disant : « Le client n’a pas le budget. » C’est rarement vrai.
          </p>

          <p className="mb-8">
            Dans la même semaine, la même entreprise peut valider un recrutement, changer un outil ou changer sa flotte de véhicules. L’argent existe. Ce qui manque, le plus souvent, c’est la preuve que votre sujet mérite de remonter dans les priorités.
          </p>

          <p className="mb-8">
            L’argent a une vertu brutale : il révèle la vraie valeur que votre client vous accorde. Tant qu’un prospect échange, pose des questions, trouve votre approche intéressante et dit que le sujet est important, on peut se raconter beaucoup d’histoires. Le jour où il faut arbitrer un budget, le réel arrive.
          </p>

          <p className="mb-8">
            C’est là que beaucoup de commerciaux se trompent. Ils traitent l’argent comme un sujet délicat, presque gênant. Ils le repoussent, l’enrobent, espèrent que la valeur sera comprise toute seule. Puis, quand le prix arrive, ils se mettent à défendre leur tarif. Trop tard. C’est exactement le mécanisme que je décris dans{' '}
            <Link href="/blog/la-peur-du-prix-le-vrai-probleme-nest-presque-jamais-le-tarif" className="text-blue-ink font-semibold underline hover:text-mint-green">
              La peur du prix : le vrai problème n’est presque jamais le tarif
            </Link>
            .
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>En entreprise, l’argent n’est pas un tabou. C’est un instrument d’arbitrage.</strong>
            </p>
          </div>

          <p className="mb-8">
            Il mesure la gravité d’un problème, l’importance d’un enjeu et le niveau de confiance accordé à un résultat.
          </p>

          <p className="mb-8">
            Quand un dirigeant accepte de dépenser, il ne dit pas seulement oui à une offre. Il dit : ce sujet mérite qu’on déplace des ressources maintenant. Il dit aussi : le coût de l’inaction commence à me gêner davantage que le coût de la décision.
          </p>

          <p className="mb-8">
            C’est pour ça que l’argent est utile en vente. Il oblige à sortir des bonnes intentions.
          </p>

          <p className="mb-8">
            À l’inverse, quand tout le monde dit que le sujet est pertinent mais que rien ne sort, il faut arrêter de se raconter des histoires. Le problème n’est pas assez prioritaire, pas assez douloureux, pas assez clair, ou pas assez relié à un résultat concret. Ce n’est pas forcément un refus. Mais ce n’est certainement pas encore validé.
          </p>

          <p className="mb-8">
            Je vois souvent des commerciaux argumenter sur leur prix alors qu’ils n’ont pas encore fait ce travail. Ils détaillent, justifient, concèdent parfois, alors que le client n’a pas encore relié la dépense à quelque chose qu’il veut vraiment changer. Très souvent, le problème a commencé plus tôt, au moment où ils ont{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-parlent-trop-tot-des-solutions" className="text-blue-ink font-semibold underline hover:text-mint-green">
              parlé trop tôt de leur solution
            </Link>
            {' '}au lieu de creuser vraiment l’enjeu. Un sujet intéressant n’a jamais suffi à signer un bon de commande. Il faut un enjeu réel, un arbitrage assumé et une valeur perçue comme suffisamment forte pour faire sortir un budget.
          </p>

          <p className="mb-8">
            Un vrai échange commercial ne devrait donc pas contourner l’argent. Il devrait s’en servir pour mesurer la motivation réelle du prospect. Qu’est-ce que ce problème coûte aujourd’hui ? Qu’est-ce que l’entreprise laisse filer si rien ne bouge ? Qui décidera vraiment ? Par rapport à quoi la dépense sera-t-elle jugée acceptable ou excessive ? À quel moment ce sujet passera-t-il devant les autres ?
          </p>

          <p className="mb-8">
            Ces questions ne tendent pas la relation avec le client. Elles la clarifient. Elles évitent les dossiers sympathiques, polis, prometteurs, qui finissent dans des échanges de plus en plus distants parce que la vraie décision n’avait été ni préparée, ni abordée, ni validée. Elles obligent le commercial à regarder le dossier pour ce qu’il est, pas pour ce qu’il espère. C’est le même travail de lucidité que dans{' '}
            <Link href="/blog/anticiper-lechec-nest-pas-du-pessimisme-cest-une-discipline-commerciale" className="text-blue-ink font-semibold underline hover:text-mint-green">
              Anticiper l’échec n’est pas du pessimisme, c’est une discipline commerciale
            </Link>
            .
          </p>

          <p className="mb-8">
            Il faut d’ailleurs arrêter avec une illusion tenace : croire qu’un client qui trouve votre approche pertinente finira naturellement par payer. Non. Entre trouver une idée intéressante et signer un bon de commande, il y a un cap à franchir. Et ce cap ne porte jamais seulement sur le montant. Il porte sur la valeur, le risque, le timing, la priorité et la confiance.
          </p>

          <p className="mb-12 font-semibold text-blue-ink">
            En vente, les mots ouvrent la discussion. L’argent, lui, dit ce qui compte vraiment.
          </p>
        </div>
      </article>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
            <h2 className="text-3xl font-title font-bold text-blue-ink mb-4">
              Vous voulez aider vos commerciaux à mieux faire sortir les vraies priorités ?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Je vous aide à muscler la découverte, la valeur perçue et les échanges qui préparent une vraie décision, pas juste une discussion intéressante.
            </p>
            <HubSpotForm />
          </div>
        </div>
      </section>
    </main>
  );
}
