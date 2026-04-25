import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Vous n’avez pas perdu face au concurrent, vous avez perdu bien avant | Laurent Serre',
  description:
    'Quand une équipe dit qu’elle a perdu face au concurrent, elle évite souvent une vérité moins confortable. La vente s’est généralement fragilisée bien plus tôt.',
  keywords:
    'concurrent vente b2b, perte commerciale, qualification commerciale, décision client, Laurent Serre, PME',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/vous-navez-pas-perdu-face-au-concurrent-vous-avez-perdu-bien-avant',
  },
  openGraph: {
    title: 'Vous n’avez pas perdu face au concurrent, vous avez perdu bien avant',
    description:
      'Beaucoup d’équipes attribuent une perte au concurrent pour éviter de regarder là où la vente s’est vraiment dégradée.',
    url: 'https://www.laurentserre.com/blog/vous-navez-pas-perdu-face-au-concurrent-vous-avez-perdu-bien-avant',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-20-concurrent-verite-confortable-hero.png',
        width: 1536,
        height: 1024,
        alt: 'Deux responsables commerciaux relisent une affaire perdue et questionnent la vraie cause de la perte',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vous n’avez pas perdu face au concurrent, vous avez perdu bien avant',
    description:
      'Le concurrent sert souvent d’explication confortable alors que la vente s’est fragilisée bien avant sa vraie apparition.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-20-concurrent-verite-confortable-hero.png'],
  },
};

export default function VousNAvezPasPerduFaceAuConcurrentVousAvezPerduBienAvantPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Point de vue / lecture commerciale</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Vous n’avez pas perdu face au concurrent, vous avez perdu bien avant
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-20">20 avril 2026</time>
              <span>•</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-20-concurrent-verite-confortable-hero.png"
              alt="Deux responsables commerciaux relisent une affaire perdue et questionnent la vraie cause de la perte"
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
            Quand une affaire se perd, le mot « concurrent » arrive souvent très vite. Trop vite.
          </p>

          <p className="mb-8">
            Le client a demandé une proposition. Les échanges étaient cordiaux. Le commercial pensait être dans la course. Puis le dossier se ferme. On apprend qu’un autre a été retenu. Et, tout de suite, l’explication qui soulage sort en premier : le concurrent était meilleur.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Le concurrent est souvent le nom pratique de ce qu’on n’a pas assez regardé plus tôt.</strong>
            </p>
          </div>

          <p className="mb-8">
            Dans beaucoup de cas, le dossier s’était fragilisé bien avant son arrivée visible. Le client avait montré de l’intérêt, mais pas une priorité assez forte. Le problème était connu, mais pas relié à une conséquence concrète. Le commercial parlait avec quelqu’un d’impliqué, mais pas avec la personne qui pouvait vraiment trancher. Ou la proposition était partie trop tôt, sur la base d’un « envoyez-moi quelque chose » pris pour une avancée.
          </p>

          <p className="mb-8">
            C’est la même mécanique que quand une équipe confond un rendez-vous agréable avec une vraie avancée. J’en ai parlé ici sur le fait de{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-confondent-interet-et-decision" className="text-blue-ink font-semibold underline hover:text-mint-green">
              confondre intérêt et décision
            </Link>
            . Tant que la priorité, la décision et la prochaine étape ne sont pas solides, l’affaire peut sembler vivante tout en étant déjà fragile.
          </p>

          <p className="mb-8">
            À partir de là, le concurrent devient une explication très pratique. Il protège l’ego du commercial. Il protège aussi le management d’un débrief plus exigeant. Parce que si on retire cette excuse, il faut regarder autre chose : pourquoi la proposition est-elle partie si tôt ? Pourquoi a-t-on accepté un « envoyez-moi quelque chose » comme une avancée ? Pourquoi personne n’a vraiment vérifié qui déciderait, sur quoi et à quel moment ?
          </p>

          <div className="my-10 rounded-2xl border border-blue-ink/15 bg-white p-6">
            <p className="text-base text-gray-700 mb-4">
              Si vos affaires perdues finissent trop souvent classées en « concurrent », le sujet n’est pas le logiciel ni le tableau de suivi. C’est la qualité de lecture commerciale avant la proposition, la manière dont vous qualifiez, et le niveau d’exigence de vos débriefs.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
              Demander un diagnostic commercial
            </Link>
          </div>

          <p className="mb-8">
            En débrief, il y a une question simple et dure : à quel moment exact avons-nous commencé à perdre cette vente ? Si l’équipe répond « quand le concurrent est arrivé », elle reste à la surface. Si elle peut nommer un rendez-vous trop flou, une décision non préparée, une objection traitée trop vite ou une proposition envoyée trop tôt, alors elle commence enfin à voir le vrai problème. Et c’est beaucoup plus utile pour la suite. D’ailleurs, si vous voulez éviter ce type de départ prématuré, relisez aussi la{' '}
            <Link href="/blog/revue-deal-avant-proposition-3-verifications" className="text-blue-ink font-semibold underline hover:text-mint-green">
              revue avant proposition
            </Link>
            .
          </p>

          <p className="mb-8">
            Une équipe progresse quand elle arrête de se raconter des histoires propres. Le concurrent existe, bien sûr. Mais dans beaucoup d’affaires perdues, il n’est pas la cause profonde. Il est juste celui qui profite d’une vente déjà mal engagée.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez des débriefs qui font vraiment progresser l’équipe ?</h3>
            <p className="mb-6">
              Si vos pertes sont trop souvent expliquées par le prix, le timing ou le concurrent, il faut reprendre les entretiens perdus plus tôt et regarder la mécanique réelle de décision. Et si vous voulez installer ce niveau d’exigence durablement, le Bootcamp peut servir d’appui.
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
