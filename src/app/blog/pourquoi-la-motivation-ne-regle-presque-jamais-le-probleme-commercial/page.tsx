import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Le vrai problème de votre équipe n’est presque jamais la motivation | Laurent Serre',
  description:
    'Quand une équipe commerciale cale, parler motivation permet souvent d’éviter le vrai sujet : des rendez-vous faibles, un management mou ou des ventes mal relues.',
  keywords:
    'motivation commerciale, management commercial, performance commerciale PME, coaching commercial, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/pourquoi-la-motivation-ne-regle-presque-jamais-le-probleme-commercial',
  },
  openGraph: {
    title: 'Le vrai problème de votre équipe n’est presque jamais la motivation',
    description:
      'Quand une équipe cale, le mot motivation sert souvent à éviter un diagnostic plus exigeant.',
    url: 'https://www.laurentserre.com/blog/pourquoi-la-motivation-ne-regle-presque-jamais-le-probleme-commercial',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-23-motivation-ne-regle-pas-probleme-commercial-hero.png',
        width: 1536,
        height: 1024,
        alt: 'Débrief commercial lucide entre un manager et un commercial dans une PME française',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le vrai problème de votre équipe n’est presque jamais la motivation',
    description:
      'Le mot motivation rassure. Il évite souvent de regarder le vrai problème : des scènes mal tenues, un management faible ou des ventes mal construites.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-23-motivation-ne-regle-pas-probleme-commercial-hero.png'],
  },
};

export default function PourquoiLaMotivationNeReglePresqueJamaisLeProblemeCommercialPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Psychologie commerciale / management</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Le vrai problème de votre équipe n’est presque jamais la motivation
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-23">23 avril 2026</time>
              <span>•</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-23-motivation-ne-regle-pas-probleme-commercial-hero.png"
              alt="Débrief commercial lucide entre un manager et un commercial dans une PME française"
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
            Quand une équipe commerciale cale, le mot motivation arrive très vite. Et très souvent, il arrive à la place du vrai diagnostic.
          </p>

          <p className="mb-8">
            Je vois souvent la même scène. Un dirigeant ou un manager me dit que ses commerciaux ont perdu l’envie, qu’ils manquent de niaque, qu’il faut les rebooster. Puis on regarde les rendez-vous, les affaires en cours, les relances, les débriefs. Et on tombe sur autre chose : des découvertes trop faibles, des propositions parties trop tôt, des managers qui suivent les chiffres sans coacher les scènes, des dossiers qu’on laisse vivre avec des explications propres, mais fragiles.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Le manque de motivation est souvent le nom pratique d’un problème qu’on n’a pas voulu regarder de près.</strong>
            </p>
          </div>

          <p className="mb-8">
            C’est plus confortable de parler d’énergie que de méthode. Plus simple de dire qu’un commercial n’a plus envie que d’admettre qu’il ne sait plus très bien comment faire avancer une vente. Ou qu’il n’est presque jamais repris sur sa manière de questionner, sur son timing, sur sa façon de prendre une objection ou de faire sortir le vrai problème du client.
          </p>

          <p className="mb-8">
            Bien sûr que la motivation compte. Mais dans beaucoup de PME, elle est traitée comme une cause alors qu’elle est souvent une conséquence. Un commercial qui enchaîne les rendez-vous flous, les relances faibles et les affaires qui dérapent finit par se fatiguer. Pas seulement parce qu’il doute de lui. Parce qu’il travaille dans un cadre qui ne l’aide pas à progresser. C’est exactement ce qu’on retrouve quand{' '}
            <Link href="/blog/pourquoi-bons-commerciaux-deviennent-mediocres-mauvais-systeme" className="text-blue-ink font-semibold underline hover:text-mint-green">
              de bons commerciaux deviennent moyens dans un mauvais système
            </Link>
            .
          </p>

          <p className="mb-8">
            Le réflexe utile n’est donc pas de demander comment remotiver l’équipe. Le vrai réflexe, c’est de regarder où elle perd sa solidité. Est-ce que les rendez-vous sont bien préparés ? Est-ce que les managers débriefent pendant que l’entretien est encore chaud ? Est-ce qu’on fait vraiment de la mise en situation ? Est-ce qu’on reprend les excuses crédibles avant qu’elles deviennent des habitudes ? Sans ça, on confond animation et progression. On fait monter un peu l’ambiance, mais on ne fait pas monter le niveau.
          </p>

          <p className="mb-8">
            Je le dis souvent aux dirigeants : une équipe peut être motivée et faible. Elle peut aussi être fatiguée parce qu’elle n’est pas assez tenue, pas assez coachée, pas assez aidée à lire ce qui se joue vraiment dans les ventes. Quand un manager laisse filer des scènes mal construites, il ne protège pas la motivation. Il laisse surtout s’installer le flou. Et ce flou finit toujours par user les bonnes volontés, exactement comme quand{' '}
            <Link href="/blog/pourquoi-un-manager-commercial-tolere-trop-longtemps-les-bonnes-excuses" className="text-blue-ink font-semibold underline hover:text-mint-green">
              les bonnes excuses remplacent le vrai débrief commercial
            </Link>
            .
          </p>

          <div className="my-10 rounded-2xl border border-blue-ink/15 bg-white p-6">
            <p className="text-base text-gray-700 mb-4">
              Si vous avez le sentiment que votre équipe commerciale manque d’élan, on peut d’abord vérifier si le vrai problème vient de la motivation, du management, de la qualité des rendez-vous ou d’une manière de piloter devenue trop floue.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
              Demander un diagnostic commercial
            </Link>
          </div>

          <p className="mb-8">
            Le bon manager commercial ne passe pas son temps à rebooster. Il remet du réel dans la machine. Il reprend une scène précise. Il demande ce qui a été validé, ce qui a été évité, où la vente a commencé à se ramollir, et par où il faudrait reprendre. C’est pour ça que{' '}
            <Link href="/blog/pourquoi-compte-rendu-commercial-ne-remplace-pas-debrief-a-chaud" className="text-blue-ink font-semibold underline hover:text-mint-green">
              le débrief à chaud vaut plus qu’un beau compte rendu
            </Link>
            .
          </p>

          <p className="mb-8">
            La motivation aide parfois à repartir. Mais elle ne corrige ni un cadre faible, ni un management mou, ni une vente mal engagée. Et tant qu’on traite la motivation comme le problème principal, on évite souvent le seul travail qui ferait vraiment progresser l’équipe.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez remettre du niveau sans jouer au coach motivateur ?</h3>
            <p className="mb-6">
              On peut repartir des scènes de vente, du management de proximité et des mécaniques qui fatiguent votre équipe au lieu de l’aider à progresser.
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
