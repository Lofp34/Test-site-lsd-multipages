import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Commission Breath : les 3 mécanismes invisibles qui tuent votre closing | Laurent Serre',
  description: 'Découvrez pourquoi vos leads ne sont pas mauvais et comment la biologie, l\'identité et le cadre sabotent vos ventes. Méthode du détachement radical pour closer sans pression.',
  keywords: 'commission breath, closing, neurones miroirs, détachement radical, psychologie vente, closing B2B, taux de conversion, cadre diagnostic, techniques closing',
  alternates: {
    canonical: 'https://laurentserre.com/blog/commission-breath-3-mecanismes-tuent-closing',
  },
  openGraph: {
    title: 'Commission Breath : les 3 mécanismes invisibles qui tuent votre closing',
    description: 'Pourquoi vos leads ne sont pas mauvais. Les 3 mécanismes biologiques et psychologiques qui sabotent vos ventes, et comment les inverser.',
    url: 'https://laurentserre.com/blog/commission-breath-3-mecanismes-tuent-closing',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://laurentserre.com/images/closing_post.png',
        width: 1200,
        height: 630,
        alt: 'Commission Breath : les 3 mécanismes invisibles qui tuent votre closing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commission Breath : les 3 mécanismes invisibles qui tuent votre closing',
    description: 'Pourquoi vos leads ne sont pas mauvais. Les 3 mécanismes biologiques et psychologiques qui sabotent vos ventes.',
    images: ['https://laurentserre.com/images/closing_post.png'],
  },
};

export default function CommissionBreathArticle() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Psychologie de vente</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Commission Breath : les 3 mécanismes invisibles qui tuent votre closing
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2025-01-15">15 janvier 2025</time>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/closing_post.png"
              alt="Commission Breath : les 3 mécanismes invisibles qui tuent votre closing"
              width={1200}
              height={630}
              className="w-full h-80 object-cover object-center rounded-2xl shadow-lg"
              quality={60}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Vos leads ne sont pas mauvais. C&apos;est <strong>vous</strong> qui sentez mauvais. Si vous plafonnez à 20 ou 30 % de closing, ce n&apos;est pas un problème de script, ce n&apos;est pas un problème de prix, et ce n&apos;est certainement pas la faute du marketing.
          </p>

          <div className="grid gap-4 bg-blue-ink/5 border-l-4 border-blue-ink p-6 rounded-r-xl mb-10">
            <div className="font-semibold text-blue-ink">Le concept américain : Commission Breath</div>
            <p className="text-gray-600 mb-0">
              Les Américains appellent ça la <strong>&quot;Commission Breath&quot;</strong> — littéralement, l&apos;haleine de la commission. Votre prospect <em>sent</em> votre besoin de vendre avant même que vous n&apos;ouvriez la bouche.
            </p>
          </div>

          <p className="mb-6">
            Aujourd&apos;hui, on ne va pas parler de technique de vente. On va parler de <strong>biologie</strong>. Je vais vous montrer comment l&apos;effet miroir détruit mathématiquement vos ventes... et comment l&apos;inverser pour que ce soit le prospect qui <em>vous</em> demande de payer.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le radar millénaire du cerveau humain</h2>

          <p className="mb-6">
            Le cerveau humain possède un radar millénaire. Il détecte la pression. Dès que vous avez <strong>envie</strong> de closer, vous émettez des micro-signaux d&apos;anxiété que votre interlocuteur capte inconsciemment.
          </p>

          <p className="mb-6">
            En 2025, les prospects sont sur-sollicités. Ils ont développé une immunité totale aux scripts bateaux. Le paradoxe est brutal : <strong>plus vous avez besoin de cet argent, moins vous avez de chances de l&apos;obtenir.</strong>
          </p>

          <p className="mb-8">
            Voici les trois mécanismes invisibles qui tuent votre closing — et comment les hacker.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">1. La biologie : vos neurones miroirs vous trahissent</h2>

          <p className="mb-6">
            Vous avez des <strong>neurones miroirs</strong>. Si je baille, vous baillez. Si je stresse, vous stressez. C&apos;est un mécanisme neurologique automatique et inconscient.
          </p>

          <div className="grid gap-4 bg-mint-green/10 border-l-4 border-mint-green p-6 rounded-r-xl mb-8">
            <div className="font-semibold text-blue-ink">Le transfert d&apos;anxiété</div>
            <p className="text-gray-600 mb-0">
              Quand vous entrez en appel avec la peur de perdre la vente, vos neurones miroirs transfèrent cette anxiété au prospect. Lui ne se dit pas &quot;le vendeur est stressé&quot;. Il se dit &quot;ce produit est <strong>risqué</strong>&quot;. Il ressent un danger, mais il ne sait pas pourquoi.
            </p>
          </div>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">La solution : le détachement radical</h3>

          <p className="mb-4">
            Avant chaque appel, vous devez <strong>accepter le NON</strong>. Visualisez le pire scénario et soyez en paix avec ça.
          </p>

          <ul className="list-disc pl-6 mb-8">
            <li><strong>Si vous n&apos;avez pas besoin de la vente</strong> → vous devenez l&apos;EXPERT</li>
            <li><strong>Si vous en avez besoin</strong> → vous êtes juste un DEMANDEUR</li>
          </ul>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">2. L&apos;identité : la dissonance énergétique</h2>

          <p className="mb-6">
            C&apos;est l&apos;erreur fatale que je vois chez 90 % des closers intermédiaires : <strong>vous essayez de vendre quelque chose que vous n&apos;avez pas acheté vous-même.</strong>
          </p>

          <p className="mb-6">
            Pas le produit. Le <strong>concept</strong>.
          </p>

          <p className="mb-6">
            Comment voulez-vous qu&apos;un prospect investisse 5 000 € en lui-même si <em>vous</em> tremblez à l&apos;idée de dépenser 500 € en formation ? C&apos;est une dissonance énergétique.
          </p>

          <div className="grid gap-4 bg-blue-ink/5 border-l-4 border-blue-ink p-6 rounded-r-xl mb-8">
            <div className="font-semibold text-blue-ink">La vente = un transfert de certitude</div>
            <p className="text-gray-600 mb-0">
              La vente, c&apos;est un transfert de certitude. Du plus certain au moins certain. Si <strong>votre</strong> certitude est fissurée par vos propres blocages financiers, le prospect va s&apos;engouffrer dans la brèche.
            </p>
          </div>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">Action : l&apos;audit de croyance</h3>

          <p className="mb-4">
            Faites un audit. Sur une échelle de 1 à 10, à quel point croyez-vous que votre offre change des vies ?
          </p>

          <p className="mb-8">
            <strong>Si c&apos;est un 9, vous avez perdu.</strong> Ça doit être un <strong>11</strong>.
          </p>

          <div className="grid gap-4 bg-gray-100 border-l-4 border-gray-400 p-6 rounded-r-xl mb-8">
            <div className="font-semibold text-gray-700">&quot;Mais Laurent, j&apos;ai un loyer à payer !&quot;</div>
            <p className="text-gray-600 mb-0">
              Je sais. Et c&apos;est <strong>justement</strong> parce que vous devez payer ce loyer que vous devez arrêter d&apos;agir comme si votre vie en dépendait. Les chirurgiens aussi ont des loyers. Mais ils ne vous <em>supplient</em> pas de vous faire opérer.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">3. Le cadre : diagnostiquer, pas convaincre</h2>

          <p className="mb-6">
            Un vendeur essaie de <strong>convaincre</strong>. Un expert essaie de <strong>diagnostiquer</strong>.
          </p>

          <ul className="list-disc pl-6 mb-8">
            <li>Quand vous cherchez à convaincre → vous créez de la <strong>résistance</strong></li>
            <li>Quand vous cherchez à comprendre → vous créez de l&apos;<strong>attraction</strong></li>
          </ul>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">La bascule mentale</h3>

          <p className="mb-4">
            Arrêtez de pitcher. Commencez à <strong>disqualifier</strong>. Votre état d&apos;esprit doit passer de :
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
              <p className="font-semibold text-red-700 mb-1">Avant</p>
              <p className="text-gray-600 mb-0">&quot;J&apos;espère qu&apos;il va acheter.&quot;</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <p className="font-semibold text-green-700 mb-1">Après</p>
              <p className="text-gray-600 mb-0">&quot;Est-ce qu&apos;il <strong>mérite</strong> mon temps ?&quot;</p>
            </div>
          </div>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-8 mb-4">Script d&apos;ouverture : tuer la pression instantanément</h3>

          <p className="mb-4">Au début de l&apos;appel, dites ceci :</p>

          <pre className="bg-gray-50 p-4 rounded-xl overflow-x-auto mb-8"><code>
&quot;On va voir si ce qu&apos;on fait peut t&apos;aider, et si ce n&apos;est pas le cas,
je te redirigerai vers quelque chose de mieux pour toi.&quot;
          </code></pre>

          <p className="mb-8">
            Cette simple phrase tue la pression de vente. <strong>Instantanément.</strong>
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">La guerre des cadres</h2>

          <p className="mb-6">
            Le closing n&apos;est pas une guerre de mots. C&apos;est une <strong>guerre de cadres</strong>. Celui qui a le cadre le plus fort gagne.
          </p>

          <div className="grid gap-4 bg-mint-green/10 border-l-4 border-mint-green p-6 rounded-r-xl mb-8">
            <div className="font-semibold text-blue-ink">Le cadre le plus fort</div>
            <p className="text-gray-600 mb-0">
              Le cadre le plus fort, c&apos;est toujours celui qui est <strong>prêt à partir sans le deal</strong>.
            </p>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Récapitulatif : les 3 leviers à activer</h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-ink text-white">
                  <th className="p-4 text-left">Mécanisme</th>
                  <th className="p-4 text-left">Problème</th>
                  <th className="p-4 text-left">Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold">1. Biologie</td>
                  <td className="p-4">Neurones miroirs transfèrent l&apos;anxiété</td>
                  <td className="p-4">Détachement radical — accepter le NON avant l&apos;appel</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-semibold">2. Identité</td>
                  <td className="p-4">Dissonance entre ce que vous vendez et ce que vous croyez</td>
                  <td className="p-4">Audit de croyance — votre conviction doit être à 11/10</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold">3. Cadre</td>
                  <td className="p-4">Posture de vendeur qui crée la résistance</td>
                  <td className="p-4">Cadre diagnostic — disqualifier plutôt que convaincre</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Mise en pratique immédiate</h2>

          <p className="mb-4">Avant votre prochain appel :</p>

          <ol className="list-decimal pl-6 mb-8">
            <li className="mb-2"><strong>Visualisez le refus</strong> pendant 30 secondes. Acceptez-le. Soyez en paix.</li>
            <li className="mb-2"><strong>Notez votre niveau de conviction</strong> sur 10. Si c&apos;est moins de 11, travaillez d&apos;abord sur vos croyances.</li>
            <li className="mb-2"><strong>Ouvrez avec la phrase de désengagement</strong> : &quot;On va voir si on peut t&apos;aider...&quot;</li>
            <li className="mb-2"><strong>Posez des questions de diagnostic</strong>, pas des questions orientées closing.</li>
          </ol>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-3">Passez à l&apos;action</h3>
            <p className="mb-4 text-white/90">
              Ces mécanismes sont simples à comprendre, mais demandent un vrai travail de fond pour être intégrés. Si vous voulez aller plus loin et transformer durablement votre approche commerciale :
            </p>
            <div className="grid gap-3">
              <Link href="/diagnostic" className="underline text-white/90 hover:text-white">Réserver un diagnostic gratuit (30 min)</Link>
              <Link href="/bootcamp" className="underline text-white/90 hover:text-white">Découvrir le Bootcamp Vente</Link>
            </div>
          </div>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-title font-bold text-blue-ink mb-8">Articles connexes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/closing-b2b-7-techniques" className="group block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <h3 className="font-title font-semibold text-blue-ink group-hover:text-mint-green transition-colors mb-2">
                Closing B2B : 7 techniques qui marchent (+ scripts)
              </h3>
              <p className="text-gray-600 text-sm">
                Les techniques terrain pour augmenter votre taux de closing en 90 jours.
              </p>
            </Link>
            <Link href="/blog/7-etapes-transformer-non-en-oui-performant-2025" className="group block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <h3 className="font-title font-semibold text-blue-ink group-hover:text-mint-green transition-colors mb-2">
                7 étapes pour transformer un « non » en « oui »
              </h3>
              <p className="text-gray-600 text-sm">
                Méthode pour transformer chaque refus en opportunité commerciale.
              </p>
            </Link>
          </div>
        </div>
      </section>

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
