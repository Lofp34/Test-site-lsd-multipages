import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Pourquoi vos commerciaux confondent intérêt et décision | Laurent Serre',
  description:
    'Un prospect intéressé n’est pas encore une vente qui avance. Beaucoup d’équipes confondent un bon échange avec une vraie progression de décision.',
  keywords:
    'intérêt prospect, décision commerciale, vente B2B, qualification commerciale, Laurent Serre, PME',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/pourquoi-vos-commerciaux-confondent-interet-et-decision',
  },
  openGraph: {
    title: 'Pourquoi vos commerciaux confondent intérêt et décision',
    description:
      'Quand un prospect dit que c’est intéressant, beaucoup de commerciaux se détendent trop tôt. Le problème, c’est que l’intérêt ne vaut pas encore décision.',
    url: 'https://www.laurentserre.com/blog/pourquoi-vos-commerciaux-confondent-interet-et-decision',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-19-interet-vs-decision-hero-v3.png',
        width: 1536,
        height: 1024,
        alt: 'Un rendez-vous commercial agréable qui masque une décision pas encore engagée',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pourquoi vos commerciaux confondent intérêt et décision',
    description:
      'Un prospect intéressé n’est pas encore une décision qui avance, et c’est là que beaucoup d’équipes se trompent trop tôt.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-19-interet-vs-decision-hero-v3.png'],
  },
};

export default function PourquoiVosCommerciauxConfondentInteretEtDecisionPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Terrain / qualification commerciale</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Pourquoi vos commerciaux confondent intérêt et décision
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-19">19 avril 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-19-interet-vs-decision-hero-v3.png"
              alt="Un rendez-vous commercial agréable qui masque une décision pas encore engagée"
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
            Un prospect peut être sincèrement intéressé et ne rien décider du tout.
          </p>

          <p className="mb-8">
            Le rendez-vous se passe bien. Le courant passe. Le prospect pose quelques questions, demande une proposition, dit que le sujet lui parle. Le commercial ressort regonflé. Une semaine plus tard, presque plus rien. Les réponses ralentissent. La proposition reste sans vraie suite. Et on découvre trop tard que l’intérêt était réel, mais que la décision, elle, n’avait presque pas bougé.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>L’intérêt est utile.</strong> Mais ce n’est pas encore une avancée tant qu’un problème prioritaire, une prochaine étape nette et une vraie décision ne sont pas engagés.
            </p>
          </div>

          <p className="mb-8">
            Le piège vient d’une confusion très humaine. Un échange agréable rassure le commercial. Il entend de l’attention, il la transforme en adhésion, puis il transforme cette adhésion supposée en probabilité de signature. C’est exactement le même mécanisme que quand on se met à{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-parlent-trop-tot-des-solutions" className="text-blue-ink font-semibold underline hover:text-mint-green">
              parler trop tôt des solutions
            </Link>{' '}
            ou à{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-repondent-trop-vite-aux-objections" className="text-blue-ink font-semibold underline hover:text-mint-green">
              répondre trop vite aux objections
            </Link>
            : on prend un signal partiel pour une validation complète.
          </p>

          <p className="mb-8">
            Ce qu’il faut regarder est plus simple et plus exigeant. Est-ce que le prospect a nommé un problème qui mérite vraiment d’être traité maintenant ? Est-ce qu’il voit clairement ce qu’il perd à rester comme ça ? Est-ce qu’une prochaine étape a été fixée avec une date, un objectif et les bonnes personnes ? Est-ce que la personne qui tranche existe dans la scène, ou seulement dans le discours ? Tant que ça n’est pas clair, l’intérêt reste une température. Pas une décision.
          </p>

          <p className="mb-8">
            C’est aussi pour ça que beaucoup de propositions partent trop tôt. On croit répondre à un intérêt alors qu’on devrait encore clarifier le problème, la priorité et la décision. Résultat, la proposition remplace la vente au lieu de la faire avancer. Si ce sujet revient souvent chez vous, relisez aussi{' '}
            <Link href="/blog/revue-deal-avant-proposition-3-verifications" className="text-blue-ink font-semibold underline hover:text-mint-green">
              la revue avant proposition
            </Link>
            .
          </p>

          <div className="my-10 rounded-2xl border border-blue-ink/15 bg-white p-6">
            <p className="text-base text-gray-700 mb-4">
              Si vos commerciaux confondent souvent rendez-vous agréable et vente qui avance, le sujet n’est pas leur énergie. C’est leur lecture commerciale.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
              Demander un diagnostic commercial
            </Link>
          </div>

          <p className="mb-8">
            En débrief, je recommande une question très concrète : qu’est-ce qui a vraiment avancé dans la décision du client pendant ce rendez-vous ? Si la réponse tourne autour de l’ambiance, de la qualité du contact ou d’un « ils ont trouvé ça intéressant », on n’a pas encore la bonne matière. En revanche, si l’équipe peut nommer une priorité confirmée, un risque reconnu, une personne engagée pour décider et une prochaine étape solide, là, oui, la vente avance vraiment.
          </p>

          <p className="mb-8">
            Ce discernement change beaucoup de choses. Il évite les faux espoirs dans les affaires en cours. Il évite aussi d’envoyer des commerciaux se rassurer avec des signaux faibles. Et surtout, il remet le travail au bon endroit : moins d’interprétation optimiste, plus de lecture nette de la décision réelle.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez fiabiliser la lecture des affaires dans l’équipe ?</h3>
            <p className="mb-6">
              Si vos commerciaux confondent souvent intérêt, politesse et vraie avancée, le plus utile est d’abord de reprendre les scènes et les critères de décision. Et si vous voulez installer un cadre durable, le Bootcamp peut servir d’appui.
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
