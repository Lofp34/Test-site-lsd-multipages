import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Pourquoi des prévisions commerciales rassurantes font souvent perdre des ventes | Laurent Serre',
  description:
    'Des prévisions commerciales rassurantes ne prouvent pas que les ventes avancent. Souvent, elles masquent surtout des affaires déjà fragiles.',
  keywords:
    'prévisions commerciales, pilotage commercial PME, pipeline commercial, direction commerciale, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/pourquoi-un-forecast-rassurant-fait-souvent-perdre-du-temps-et-des-ventes',
  },
  openGraph: {
    title: 'Pourquoi des prévisions commerciales rassurantes font souvent perdre des ventes',
    description:
      'Quand les prévisions commerciales rassurent trop, elles cachent souvent des affaires fragiles plutôt qu’une vraie avance dans les ventes.',
    url: 'https://www.laurentserre.com/blog/pourquoi-un-forecast-rassurant-fait-souvent-perdre-du-temps-et-des-ventes',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-21-previsions-rassurantes-pas-fiables-hero.jpg',
        width: 1200,
        height: 675,
        alt: 'Laurent Serre devant un visuel de prévisions de ventes annoté avec le message Rassurant. Pas fiable.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pourquoi des prévisions commerciales rassurantes font souvent perdre des ventes',
    description:
      'Des prévisions trop rassurantes cachent souvent des affaires fragiles et une lecture commerciale trop indulgente.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-21-previsions-rassurantes-pas-fiables-hero.jpg'],
  },
};

export default function PourquoiUnForecastRassurantFaitSouventPerdreDuTempsEtDesVentesPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Erreur fréquente / pilotage commercial</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Pourquoi des prévisions commerciales rassurantes font souvent perdre des ventes
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-21">21 avril 2026</time>
              <span>•</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-21-previsions-rassurantes-pas-fiables-hero.jpg"
              alt="Laurent Serre devant un visuel de prévisions de ventes annoté avec le message Rassurant. Pas fiable."
              width={1200}
              height={675}
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
            Dans beaucoup de PME, il y a une scène que je connais par cœur.
          </p>

          <p className="mb-8">
            Le dirigeant ou le directeur commercial demande où en sont les affaires en cours. On fait le tour. Un commercial dit que ça avance bien. Un autre dit que le contact est bon. Un troisième explique qu’une proposition a été envoyée et qu’on attend un retour. La réunion se passe bien. Le pipe a l’air vivant. Le mois a l’air de tenir.
          </p>

          <p className="mb-8">
            Et souvent, c’est exactement là qu’on commence à se raconter des histoires.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Dans beaucoup d’équipes, les bonnes excuses servent à fluidifier la relation. Malheureusement, ça se fait au détriment des ventes et donc du chiffre d’affaires.</strong>
            </p>
          </div>

          <p className="mb-8">
            Je vois souvent les mêmes scènes en réunion commerciale. Un commercial déroule son dossier. Le contact est bon. Le client a dit qu’il était intéressé. Une proposition est partie. Il faut juste attendre le retour. Tout ça a l’air crédible.
          </p>

          <p className="mb-8">
            Le problème, ce n’est pas l’excuse du commercial. Le problème, c’est qu’à ce moment-là, le manager ne creuse pas. Il ne cherche pas à challenger son commercial sur la réalité du deal.
          </p>

          <p className="mb-8">
            Une bonne excuse est dangereuse parce qu’elle est crédible. Elle calme les esprits, protège l’ego du commercial, la tranquillité du dirco et retarde le vrai diagnostic. Un peu de sérénité tout de suite. Plus de stress après.
          </p>

          <p className="mb-8">
            Quand un manager tolère trop longtemps ces explications, il n’apporte pas du soutien. Il installe du flou. Il installe du mou. Et l’équipe apprend vite la règle implicite : tant que l’histoire est propre, personne n’ira chercher ce qui n’a pas été validé, ce qui n’a pas été découvert ou le moment exact où la vente a commencé à se dégrader.
          </p>

          <p className="mb-8">
            C’est comme ça qu’on laisse monter des dossiers fragiles. Pas forcément parce que les commerciaux mentent. Mais parce que les explications propres, mais trompeuses, arrivent trop tôt et sont acceptées trop vite.
          </p>

          <div className="my-10 rounded-2xl border border-blue-ink/15 bg-white p-6">
            <p className="text-base text-gray-700 mb-4">
              Si vos commerciaux apportent souvent des dossiers qui paraissent rassurants, mais qui sont en fait fragiles, on peut repartir d’un diagnostic clair des entretiens de vente, des excuses acceptées trop vite et des sessions qui ne sont jamais vraiment challengées.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
              Demander un diagnostic commercial
            </Link>
          </div>

          <p className="mb-8">
            On retrouve souvent les mêmes signes derrière. Une priorité floue. Un vrai décideur pas touché. Une objection mal traitée. Une proposition envoyée trop tôt. Un commercial qui pense que le deal avance parce que la relation reste fluide, alors que la décision, elle, n’a presque pas bougé.
          </p>

          <p className="mb-8">
            Beaucoup de managers n’aiment pas ce moment parce qu’ils ont peur de casser la motivation ou de perdre leur leadership. C’est justement là qu’ils se trompent. Un bon manager débriefe un entretien pendant qu’il est encore chaud. Il ne demande pas un beau compte-rendu dans le CRM.
          </p>

          <p className="mb-8">
            Parce qu’une excuse bien amenée peut sauver une réunion, mais elle ne sauve jamais une vente.
          </p>

          <p className="mb-8">
            Si on veut améliorer le niveau commercial d’une équipe, il faut apprendre à aller derrière des explications propres, mais trompeuses. C’est là qu’on recommence à voir le vrai état des ventes.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez améliorer l’impact de vos réunions commerciales ?</h3>
            <p className="mb-6">
              Si vos commerciaux apportent souvent des dossiers qui paraissent rassurants, mais en fait sont fragiles, on peut repartir d’un diagnostic clair des entretiens de vente, des excuses acceptées trop vite et des sessions qui ne sont jamais vraiment challengées.
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
