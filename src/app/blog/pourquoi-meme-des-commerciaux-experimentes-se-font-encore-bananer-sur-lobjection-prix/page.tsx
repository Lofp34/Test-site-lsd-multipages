import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Pourquoi même des commerciaux expérimentés se font encore bananer sur l’objection prix | Laurent Serre',
  description:
    'Quand une vente bloque sur le prix, le tarif n’est pas toujours le vrai sujet. Très souvent, l’objection prix masque un diagnostic commercial évité trop vite.',
  keywords:
    'objection prix, prix trop cher, vente b2b, négociation commerciale, valeur perçue, Laurent Serre',
  alternates: {
    canonical:
      'https://www.laurentserre.com/blog/pourquoi-meme-des-commerciaux-experimentes-se-font-encore-bananer-sur-lobjection-prix',
  },
  openGraph: {
    title: 'Pourquoi même des commerciaux expérimentés se font encore bananer sur l’objection prix',
    description:
      'L’objection prix n’est pas toujours un problème de prix. C’est souvent le nom pratique d’un problème plus ancien dans la vente.',
    url: 'https://www.laurentserre.com/blog/pourquoi-meme-des-commerciaux-experimentes-se-font-encore-bananer-sur-lobjection-prix',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-24-objection-prix-bd-hero-selected.png',
        width: 1536,
        height: 1024,
        alt: 'Deux commerciaux en discussion tendue autour d’une objection prix en PME',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pourquoi même des commerciaux expérimentés se font encore bananer sur l’objection prix',
    description:
      'Quand un client dit que c’est trop cher, le vrai blocage est souvent ailleurs et il est apparu bien avant le prix.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-24-objection-prix-bd-hero-selected.png'],
  },
};

export default function PourquoiMemeDesCommerciauxExperimentesSeFontEncoreBananerSurLObjectionPrixPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Objection prix / vente terrain</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Pourquoi même des commerciaux expérimentés se font encore bananer sur l’objection prix
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-24">24 avril 2026</time>
              <span>•</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-24-objection-prix-bd-hero-selected.png"
              alt="Deux commerciaux en discussion tendue autour d’une objection prix en PME"
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
          <blockquote className="border-l-4 border-blue-ink pl-6 italic text-xl text-gray-700 mb-8">
            « On était trop chers. »
          </blockquote>

          <p className="mb-8">
            La phrase tombe souvent trop vite. La proposition est partie. Le client a freiné. Le commercial revient un peu secoué. Et, en deux minutes, tout le monde se range derrière la même explication : on était trop chers.
          </p>

          <p className="mb-8">
            Parfois, c’est vrai. Mais très souvent, le prix arrive à la fin pour recouvrir tout le reste.
          </p>

          <p className="mb-8">
            Je pense à ces rendez-vous où le client dit : « Franchement, c’est au-dessus de ce qu’on avait en tête. » Là, beaucoup de commerciaux expérimentés partent aussitôt en défense. Ils détaillent le service, rappellent la qualité, expliquent pourquoi leur offre tient mieux la route. Certains commencent même à rogner avant d’avoir compris ce qui gêne vraiment.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>C’est là qu’ils se piègent.</strong>
            </p>
          </div>

          <p className="mb-8">
            Quand un client parle du prix, il peut vouloir dire autre chose. Qu’il ne voit pas assez la différence. Qu’il ne voit pas encore ce que lui coûte l’attente. Que le sujet n’est pas assez urgent. Que la bonne personne n’a pas donné son avis. Ou simplement qu’il compare votre proposition complète à quelque chose de plus court et de moins solide.
          </p>

          <p className="mb-8">
            Dans tous ces cas, répondre trop vite ne sert à rien. Vous défendez un chiffre alors que le doute est ailleurs.
          </p>

          <p className="mb-8">
            C’est pour ça que même des commerciaux solides se font encore avoir. L’habitude les rend rapides. Or, sur le prix, cette vitesse est souvent une paresse déguisée. On croit aller droit au but. En réalité, on évite la seule chose utile : comprendre ce que le client met derrière sa phrase. C’est la même dérive que lorsqu’une équipe se met à{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-repondent-trop-vite-aux-objections" className="text-blue-ink font-semibold underline hover:text-mint-green">
              répondre trop vite aux objections
            </Link>
            .
          </p>

          <p className="mb-8">
            Ensuite, le réflexe classique arrive. « Avec nos tarifs, ça ne passe plus. » « En face, ils sont moins chers. » « Le marché est devenu trop dur. »
          </p>

          <p className="mb-8">
            Cela peut arriver, bien sûr. Mais, dans beaucoup de dossiers, cette explication arrange tout le monde. Le client s’abrite derrière le prix. Le commercial s’abrite derrière l’entreprise. Et le manager évite une question plus gênante : à quel moment exact la vente a-t-elle commencé à se fragiliser ?
          </p>

          <p className="mb-8">
            Est-ce que le client avait vraiment compris ce qu’il achetait ? Est-ce qu’il voyait clairement ce que cela changeait pour lui ? Est-ce que le problème était assez sérieux pour l’obliger à bouger ? Est-ce que la personne qui tranche était réellement dans la discussion ? Est-ce que la proposition est partie trop tôt ?
          </p>

          <p className="mb-8">
            Tant que ces questions ne sont pas posées, dire « c’est trop cher » ne sert presque à rien. C’est une étiquette, pas un diagnostic.
          </p>

          <p className="mb-8">
            Un bon commercial ne contre donc pas tout de suite. Il ralentit.
          </p>

          <div className="my-10 rounded-2xl border border-blue-ink/15 bg-white p-6">
            <p className="text-base text-gray-700 mb-4">
              « Trop cher par rapport à quoi ? »<br />
              « Qu’est-ce que vous comparez exactement ? »<br />
              « Qu’est-ce qui vous fait hésiter maintenant ? »<br />
              « Qui doit encore se prononcer ? »
            </p>
          </div>

          <p className="mb-8">
            Le but n’est pas de faire parler pour faire parler. Le but est de remettre la vente sur le vrai point de blocage.
          </p>

          <p className="mb-8">
            Le prix n’est souvent que l’endroit où le dossier craque en dernier. Le problème, lui, est apparu bien avant : dans un besoin mal creusé, une différence mal montrée, une urgence mal installée, une proposition envoyée trop tôt ou une discussion menée sans la bonne personne.
          </p>

          <p className="mb-8">
            Tant qu’une équipe dira trop vite « on l’a perdu au prix », elle continuera à confondre la dernière phrase du client avec la vraie raison de la vente ratée.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez traiter l’objection prix avec plus de justesse ?</h3>
            <p className="mb-6">
              Si votre équipe répond trop vite au prix, négocie trop tôt ou laisse partir des propositions avant d’avoir construit la vraie décision, on peut repartir d’un diagnostic concret de vos entretiens de vente et de votre mécanique commerciale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Découvrir le Bootcamp
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d’en parler plus directement ?
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
