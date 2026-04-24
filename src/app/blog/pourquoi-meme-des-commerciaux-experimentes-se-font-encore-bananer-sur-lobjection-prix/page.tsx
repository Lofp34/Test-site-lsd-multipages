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
      'Le prix arrive à la fin, mais le vrai problème a souvent commencé bien avant.',
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
            La phrase arrive souvent très vite. Le dossier vient de sortir. La proposition est partie. Le prospect a freiné. Et en dix secondes, le débrief est déjà presque terminé.
          </p>

          <p className="mb-8">Prix.</p>

          <p className="mb-8">
            Le problème, c’est que cette conclusion est souvent trop rapide. Pas parce que le prix ne compte pas. Bien sûr qu’il compte. Mais parce qu’il sert très souvent de mot pratique pour éviter un diagnostic plus exigeant.
          </p>

          <p className="mb-8">
            Je vois des commerciaux expérimentés se faire bananer là-dessus en permanence. Pas parce qu’ils sont mauvais. Justement parce qu’ils connaissent trop bien la musique. Ils ont déjà entendu cent fois « c’est trop cher ». Alors ils anticipent. Ils repartent sur la valeur, le retour sur investissement, la qualité de service, la différence d’approche, parfois même sur une concession plus ou moins habillée. Ils répondent vite. Ils remplissent vite le blanc qui peut se créer quand on commence à parler du tarif. Ils négocient déjà avant que le client ait vraiment exprimé le fond de sa pensée.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Et c’est là qu’ils perdent la main.</strong>
            </p>
          </div>

          <p className="mb-8">
            L’objection prix n’est pas toujours un problème de prix. C’est souvent un mélange plus confus : valeur mal posée, problème pas assez coûteux, vraie priorité pas vraiment installée, décideur encore mal embarqué, comparaison faussée, ou proposition envoyée trop tôt.
          </p>

          <p className="mb-8">Autrement dit : le prix arrive à la fin, mais le vrai problème a souvent commencé bien avant.</p>

          <p className="mb-8">
            C’est d’ailleurs pour ça que des commerciaux expérimentés tombent eux aussi dans le piège. L’expérience les aide à reconnaître les objections. Mais elle peut aussi les rendre trop rapides. Ils croient reconnaître la scène avant de l’avoir relue. Ils entendent un mot, et ils sortent la réponse qui va avec. Sur l’objection prix, cette vitesse est rarement une force. Très souvent, c’est une négligence.
          </p>

          <p className="mb-8">
            Le client dit peut-être « c’est trop cher ». Mais ce qu’il pense vraiment est parfois tout autre. Peut-être qu’il ne voit pas assez la différence. Peut-être qu’il n’a pas encore relié votre offre à un problème assez coûteux pour bouger. Peut-être qu’il n’a pas embarqué le vrai décideur. Peut-être qu’il compare votre proposition complète à une proposition plus étriquée, plus floue, moins complète, moins adaptée. Et peut-être aussi que le sujet n’est simplement pas assez prioritaire pour passer devant le reste.
          </p>

          <p className="mb-8">
            Si vous répondez trop vite, vous ne travaillez rien de tout ça. Vous défendez seulement votre tarif contre une objection dont vous n’avez pas encore creusé le vrai contenu.
          </p>

          <p className="mb-8">
            C’est aussi pour ça que beaucoup de commerciaux remettent ensuite très vite la faute sur l’entreprise. « On est trop chers. » « Avec nos prix, ça ne passe pas. » « Le marché ne veut plus payer ça. »
          </p>

          <p className="mb-8">
            Parfois, c’est vrai. Il existe des offres mal positionnées. Il existe des écarts trop grands. Il existe des marchés devenus plus durs. Mais dans énormément de cas, cette explication protège surtout le commercial d’une question moins confortable : est-ce que la vente a été vraiment construite ?
          </p>

          <p className="mb-8">
            Est-ce que le problème du client a été assez creusé ? Est-ce que le coût de l’inaction a été assez travaillé ? Est-ce que la valeur a été formulée assez tôt, assez clairement, assez concrètement ? Est-ce que le niveau de décision a été mesuré correctement ? Est-ce que la proposition est partie au bon moment ?
          </p>

          <p className="mb-8">
            Tant que ces questions restent floues, l’objection prix devient un refuge parfait. Pour le prospect comme pour le commercial. Le prospect s’abrite derrière un mot simple. Le commercial s’abrite derrière une explication simple. Et tout le monde évite le vrai travail.
          </p>

          <p className="mb-8">
            Sur ce sujet, un bon commercial ne contre pas d’abord. Il ralentit un peu. Pas pour devenir mou. Pour devenir juste.
          </p>

          <div className="my-10 rounded-2xl border border-blue-ink/15 bg-white p-6">
            <p className="text-base text-gray-700 mb-4">
              « Trop cher par rapport à quoi exactement ? »<br />
              « Qu’est-ce qui vous fait hésiter aujourd’hui ? »<br />
              « Qu’est-ce qui vous manquerait pour considérer que ce sujet mérite vraiment cet investissement ? »<br />
              « Qui d’autre doit valider ce niveau de décision ? »
            </p>
          </div>

          <p className="mb-8">
            Là, on commence à travailler. Là, on sort du théâtre habituel. Là, on arrête de traiter le prix comme une réponse, pour le traiter enfin comme un signal.
          </p>

          <p className="mb-8">
            Le vrai sujet n’est donc pas d’apprendre à mieux défendre ses prix. Le vrai sujet, c’est d’arrêter de laisser l’objection prix faire le ménage à la place du commercial. Parce qu’à ce moment-là, elle ramasse tout : le flou, la négligence, la précipitation, la proposition trop tôt, la valeur mal installée.
          </p>

          <p className="mb-8">
            Et tant qu’une équipe dira trop vite « on était trop chers », elle continuera à se faire bananer sur un sujet qu’elle croit pourtant connaître par cœur.
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
