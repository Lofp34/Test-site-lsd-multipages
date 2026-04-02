import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'La peur du prix : le vrai problème n’est presque jamais le tarif | Laurent Serre',
  description:
    'Quand une vente bloque sur le prix, le tarif n’est souvent que la surface du problème. Valeur perçue, découverte, décision et courage commercial pèsent bien plus lourd.',
  keywords:
    'peur du prix, objection prix, valeur perçue, vente B2B, négociation commerciale, Laurent Serre, bootcamp commercial, diagnostic commercial',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/la-peur-du-prix-le-vrai-probleme-nest-presque-jamais-le-tarif',
  },
  openGraph: {
    title: 'La peur du prix : le vrai problème n’est presque jamais le tarif',
    description:
      'La crispation sur le prix cache souvent un problème de valeur perçue, de découverte ou de courage commercial bien avant la négociation.',
    url: 'https://www.laurentserre.com/blog/la-peur-du-prix-le-vrai-probleme-nest-presque-jamais-le-tarif',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-02-peur-prix-vrai-probleme-pas-tarif-hero.jpg',
        width: 1536,
        height: 1024,
        alt: 'Discussion commerciale premium entre un dirigeant et un prospect autour d’une décision de prix',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La peur du prix : le vrai problème n’est presque jamais le tarif',
    description:
      'Quand le prix devient le sujet central, la vente a souvent été affaiblie bien avant le moment de parler tarif.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-02-peur-prix-vrai-probleme-pas-tarif-hero.jpg'],
  },
};

export default function PeurDuPrixPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Psychologie commerciale / valeur perçue</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              La peur du prix : le vrai problème n’est presque jamais le tarif
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-02">2 avril 2026</time>
              <span>•</span>
              <span>9 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-02-peur-prix-vrai-probleme-pas-tarif-hero.jpg"
              alt="Discussion commerciale premium entre un dirigeant et un prospect autour d’une décision de prix"
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
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Beaucoup d’équipes commerciales disent la même chose après une vente perdue : <em>“On s’est fait sortir sur le prix.”</em> C’est pratique. C’est simple. Et c’est très souvent faux.
          </p>

          <p className="mb-8">
            <strong>Le prix devient rarement le vrai problème au moment où il est prononcé.</strong> Dans la majorité des cas, il révèle plutôt une vente affaiblie plus tôt : valeur perçue insuffisante, découverte trop faible, urgence mal travaillée, décideur mal lu, ou commercial qui cherche à rassurer avant d’avoir vraiment clarifié l’enjeu.
          </p>

          <p className="mb-8">
            Quand une équipe voit du “prix” partout, elle corrige souvent la mauvaise chose. Elle revoit son offre, baisse ses tarifs, ajoute des gestes commerciaux ou demande un argumentaire plus musclé. Alors que le problème est souvent ailleurs : dans la façon dont la vente a été construite.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le prix apparaît à la fin. Le problème, lui, commence bien avant.</h2>
          <p className="mb-4">
            Un client accepte rarement de payer plus cher juste parce qu’on défend mieux son prix. Il accepte plus facilement quand la valeur est devenue évidente, quand le coût de l’inaction est clair et quand la décision paraît plus risquée à repousser qu’à prendre.
          </p>
          <p className="mb-6">
            Autrement dit : si la conversation commerciale n’a pas suffisamment travaillé le problème, les conséquences, la priorité et la différence de votre approche, le prix récupère tout le poids de l’hésitation. Il devient le dernier mot d’un doute plus profond.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Règle simple :</strong> plus la valeur perçue est faible, plus le prix devient bruyant. Plus la vente est claire, plus le prix retrouve sa vraie place.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Les 4 vraies causes que les équipes cachent derrière “c’est trop cher”</h2>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">1. Une découverte trop courte</h3>
          <p className="mb-6">
            Beaucoup de commerciaux parlent du prix alors qu’ils n’ont pas suffisamment éclairé le problème. Ils ont compris la demande, mais pas le coût réel du statu quo. Résultat : au moment de chiffrer, le client compare un montant certain à un enjeu encore flou. C’est exactement le terrain où le prix prend trop de place.
          </p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">2. Une valeur mal posée</h3>
          <p className="mb-6">
            Présenter des livrables, des étapes ou des fonctionnalités ne suffit pas. Tant que le client ne relie pas clairement votre intervention à un impact business tangible, il évalue une dépense, pas une décision utile. La valeur ne se déclare pas. Elle se construit dans la conversation.
          </p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">3. Une urgence insuffisamment clarifiée</h3>
          <p className="mb-6">
            Un prospect qui ne voit pas pourquoi il doit agir maintenant regarde naturellement le prix avec plus de dureté. Quand le coût d’attendre reste faible, toute proposition paraît trop chère. Le sujet n’est alors pas le budget. C’est l’absence de tension sur l’inaction.
          </p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">4. Un commercial qui se crispe lui-même</h3>
          <p className="mb-8">
            La peur du prix vient aussi du vendeur. Beaucoup redoutent de nommer leur tarif avec calme. Ils justifient trop tôt, concèdent trop vite ou surchargent leur argumentaire pour compenser leur propre inconfort. Le client le sent immédiatement. Et quand le vendeur doute, le prix paraît encore plus lourd.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi baisser le prix règle rarement le vrai problème</h2>
          <p className="mb-4">
            Quand une vente bloque, réduire le prix donne l’illusion d’avancer. Parfois cela débloque un dossier. Mais très souvent, cela ne corrige rien de durable. Cela affaiblit la marge, abîme le positionnement et entretient une lecture dangereuse : “pour vendre, il faut surtout céder”.
          </p>
          <p className="mb-8">
            Le pire, c’est que l’équipe apprend alors la mauvaise leçon. Elle croit avoir un problème tarifaire récurrent, alors qu’elle a surtout un problème de découverte, de posture ou de lecture de décision. C’est le même piège que dans{' '}
            <Link href="/blog/pourquoi-ia-sans-plan-vente-produit-surtout-bruit" className="text-blue-ink font-semibold underline hover:text-mint-green">
              les équipes qui ajoutent des outils sans clarifier leur méthode
            </Link>
            {' '} : on agit sur la surface parce que le vrai défaut de structure coûte plus de lucidité.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce qu’un commercial doit sécuriser avant de parler prix</h2>
          <ul className="list-disc pl-6 mb-8">
            <li><strong>Le problème prioritaire :</strong> ce qui fait réellement mal aujourd’hui chez le client.</li>
            <li><strong>Le coût du statu quo :</strong> ce que l’inaction continue de coûter en temps, en marge, en charge ou en opportunités perdues.</li>
            <li><strong>Le niveau de décision :</strong> qui arbitre vraiment, selon quels critères, dans quel timing.</li>
            <li><strong>La valeur de votre approche :</strong> pourquoi votre intervention change le résultat, pas seulement le process.</li>
            <li><strong>La prochaine étape :</strong> ce qui permet d’avancer sans laisser la discussion retomber dans une comparaison stérile.</li>
          </ul>

          <p className="mb-8">
            Si ces points sont faibles, le prix devient un refuge logique pour le prospect. Si ces points sont solides, l’objection prix change de nature : elle devient une discussion de décision, pas une remise en cause totale de la valeur.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le vrai travail des managers sur le sujet prix</h2>
          <p className="mb-4">
            Un manager commercial utile ne coachera pas son équipe avec une simple liste de réponses aux objections. Il remontera plus haut. Il regardera comment la découverte a été menée, comment la valeur a été formulée, où la tension a disparu et comment le commercial a tenu — ou non — le moment de vérité.
          </p>
          <p className="mb-8">
            C’est d’ailleurs là que beaucoup de managers se trompent : ils veulent aider à “mieux défendre le prix”, alors qu’il faut surtout aider à mieux construire la vente. Sur ce point, la logique rejoint celle de{' '}
            <Link href="/blog/pourquoi-manager-commercial-suit-sans-coacher-plombe-equipe" className="text-blue-ink font-semibold underline hover:text-mint-green">
              ce qu’un vrai coaching commercial doit changer sur le terrain
            </Link>
            .
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que les dirigeants doivent retenir</h2>
          <p className="mb-4">
            Si votre équipe invoque le prix en boucle, ne corrigez pas trop vite l’offre ou la grille tarifaire. Demandez-vous plutôt : la valeur est-elle vraiment comprise ? Le problème client a-t-il été suffisamment creusé ? L’urgence est-elle réelle ? Le commercial assume-t-il son prix avec calme ?
          </p>
          <p className="mb-8">
            Tant que ces questions restent floues, le tarif servira de bouc émissaire commode. Et vous risquez d’abîmer votre marge pour réparer un problème qui n’était pas tarifaire au départ.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez aider votre équipe à mieux vendre sans céder trop vite sur le prix ?</h3>
            <p className="mb-6">
              Le Bootcamp aide les dirigeants, managers et commerciaux à renforcer la découverte, clarifier la valeur et tenir les conversations de vente avec plus de justesse et plus de marge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Découvrir le Bootcamp
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Demander un diagnostic commercial
              </Link>
            </div>
          </div>
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
