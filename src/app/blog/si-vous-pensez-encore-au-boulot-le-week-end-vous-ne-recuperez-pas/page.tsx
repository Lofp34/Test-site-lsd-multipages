import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Si vous pensez encore au boulot le week-end, vous ne récupérez pas | Laurent Serre',
  description:
    'Un dirigeant qui ne décroche jamais le week-end ne revient pas vraiment reposé le lundi. La récupération commence par une vraie clôture de semaine.',
  keywords:
    'dirigeant PME, récupération entrepreneur, déconnexion week-end, management commercial, fatigue dirigeant, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/si-vous-pensez-encore-au-boulot-le-week-end-vous-ne-recuperez-pas',
  },
  openGraph: {
    title: 'Si vous pensez encore au boulot le week-end, vous ne récupérez pas',
    description:
      'Le problème n’a pas commencé le lundi matin. Il a commencé pendant le week-end, quand le bureau n’a jamais vraiment quitté la tête du dirigeant.',
    url: 'https://www.laurentserre.com/blog/si-vous-pensez-encore-au-boulot-le-week-end-vous-ne-recuperez-pas',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-27-recuperation-week-end-hero.png',
        width: 1536,
        height: 1024,
        alt: 'Dirigeant de PME un lundi matin, téléphone posé, après un week-end où il n’a pas vraiment décroché',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Si vous pensez encore au boulot le week-end, vous ne récupérez pas',
    description:
      'Un week-end où le travail continue en bruit de fond n’est pas un vrai week-end.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-27-recuperation-week-end-hero.png'],
  },
};

export default function SiVousPensezEncoreAuBoulotLeWeekEndVousNeRecuperezPasPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Dirigeant / récupération</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Si vous pensez encore au boulot le week-end, vous ne récupérez pas
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-27">27 avril 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-27-recuperation-week-end-hero.png"
              alt="Dirigeant de PME un lundi matin, téléphone posé, après un week-end où il n’a pas vraiment décroché"
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
          <p className="mb-8">Et le lundi matin, ça se voit tout de suite.</p>

          <p className="mb-8">Il y a des dirigeants qui arrivent reposés. Ils sont là. Ils écoutent bien. Ils décident plus vite. Ils ont les idées plus claires.</p>

          <p className="mb-8">Et puis il y a ceux qui arrivent déjà fatigués. Plus tendus. Plus nerveux. Plus secs avec tout le monde. Le problème n’a pas commencé le lundi matin. Il a commencé pendant le week-end.</p>

          <p className="mb-8">Je vois ça régulièrement chez mes clients et amis entrepreneurs et directeurs commerciaux.</p>

          <p className="mb-8">Ils sont chez eux, mais ils ne décrochent pas. Le téléphone reste à côté. Un message leur revient dans la tête au milieu du repas. Un devis en suspens refait surface pendant la promenade. Une inquiétude sur la trésorerie les suit jusque dans le salon. Ils ont quitté le bureau, mais le bureau ne les a pas quittés.</p>

          <p className="mb-4">Au début, ils appellent ça du sérieux.</p>

          <p className="mb-4">Après, ils appellent ça de l’exigence.</p>

          <p className="mb-4">Et parfois même du courage.</p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base"><strong>En réalité, c’est souvent comme ça que l’usure commence.</strong></p>
          </div>

          <p className="mb-8">On ne s’épuise pas seulement dans les grosses semaines. On s’épuise aussi dans les week-ends qui n’en sont pas vraiment. On reste à moitié au travail. On croit tenir. En fait, on se vide.</p>

          <p className="mb-8">Je le vois chez les entrepreneurs que je connais et que j’accompagne. Très peu tombent d’un coup. La plupart s’abîment petit à petit. Ils restent joignables. Ils surveillent. Ils regardent juste deux minutes. Et ces deux minutes suffisent à remettre la machine en route.</p>

          <p className="mb-8">Le vrai sujet, ce n’est pas le courage. C’est la capacité à déconnecter. C’est la capacité à lâcher prise.</p>

          <p className="mb-8">Beaucoup de dirigeants finissent leur vendredi sans avoir clôturé leur semaine. Ils partent avec des sujets ouverts, des contrariétés, des décisions repoussées, des inquiétudes qu’ils n’ont pas traitées. Ensuite, ils s’étonnent de ne pas réussir à couper.</p>

          <p className="mb-8">Mais on ne coupe pas par bonne volonté.</p>

          <p className="mb-8">On coupe parce qu’on a clôturé sa semaine.</p>

          <p className="mb-8">Clôturer sa semaine, c’est simple. Voilà ce qui est réglé. Voilà ce qui attendra lundi. Voilà ce qui justifie vraiment qu’on m’appelle. Le reste, on ne le compte pas.</p>

          <p className="mb-8">Tant que ce tri n’est pas fait, le week-end ne commence pas.</p>

          <p className="mb-8">Autre piège : appeler urgence tout ce qui bouge.</p>

          <p className="mb-8">Dans la plupart des PME, tout ne peut pas exploser entre le vendredi soir et le dimanche soir. En revanche, beaucoup de dirigeants ont pris l’habitude de surveiller. Et surveiller fatigue. À force de garder un œil sur tout, on ne récupère jamais assez pour redevenir calme, lucide et solide.</p>

          <p className="mb-8">Il faut donc une vraie coupure.</p>

          <p className="mb-8">Pas un faux repos avec des mails entre deux cafés. Pas un samedi off avec dix vérifications de téléphone. Une vraie coupure. Une marche. Du sport. Du bricolage. Un repas qu’on prépare vraiment. Du temps entier avec les enfants. Un livre. Un jardin. N’importe quoi, du moment que vous y êtes vraiment.</p>

          <p className="mb-8">Sinon, le travail continue en bruit de fond. Et ce bruit de fond use plus qu’on ne le croit.</p>

          <p className="mb-8">Et si vous n’arrivez jamais à couper, il faut regarder les choses en face.</p>

          <p className="mb-8">Le problème n’est pas toujours personnel. Il est souvent dans l’organisation. Trop de choses reposent sur vous. Trop de validations remontent jusqu’à vous. Trop de clients prennent trop de place. Trop de sujets ne tiennent que parce que vous gardez la main dessus en permanence.</p>

          <p className="mb-8">Autrement dit, un week-end sacrifié n’est pas toujours la preuve qu’un dirigeant se donne à fond.</p>

          <p className="mb-8">C’est parfois la preuve que son entreprise repose sur un équilibre trop fragile.</p>

          <div className="bg-mint-green/10 border-l-4 border-mint-green p-6 my-8">
            <p className="text-base"><strong>Le repos du week-end n’est pas un luxe.</strong></p>
          </div>

          <p className="mb-8">C’est une condition pour tenir longtemps et tenir juste.</p>

          <p className="mb-8">On est lundi matin.</p>

          <p className="mb-8">Et la meilleure chose que vous ayez à faire, c’est peut-être de préparer le week-end prochain dès maintenant.</p>

          <p className="mb-8">Organisez votre semaine. Posez vos priorités. Avancez vraiment sur ce qui compte. Pour que, vendredi soir, vous soyez assez au clair pour relâcher.</p>

          <p className="mb-8">Et que, cette fois, le prochain week-end en soit vraiment un.</p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Votre entreprise vous laisse-t-elle vraiment récupérer ?</h3>
            <p className="mb-6">
              Si tout remonte encore vers vous le week-end, le sujet n’est pas seulement personnel. Il est souvent organisationnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Échanger sur votre situation
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
