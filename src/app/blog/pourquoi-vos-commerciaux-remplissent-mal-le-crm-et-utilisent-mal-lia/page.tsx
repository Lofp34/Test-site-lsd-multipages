import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Pourquoi vos commerciaux remplissent mal le CRM… et utilisent mal l’IA | Laurent Serre',
  description:
    'Quand le CRM est vide ou flou, l’IA ne rend pas l’équipe plus pertinente. Elle industrialise surtout le flou commercial et le transforme en prose plus propre.',
  keywords:
    'CRM commercial, IA commerciale, commerciaux PME, notes CRM, intelligence artificielle vente, management commercial, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/pourquoi-vos-commerciaux-remplissent-mal-le-crm-et-utilisent-mal-lia',
  },
  openGraph: {
    title: 'Pourquoi vos commerciaux remplissent mal le CRM… et utilisent mal l’IA',
    description:
      'Le problème n’est pas seulement l’adoption de l’IA. C’est souvent la pauvreté de la matière commerciale capturée après les rendez-vous.',
    url: 'https://www.laurentserre.com/blog/pourquoi-vos-commerciaux-remplissent-mal-le-crm-et-utilisent-mal-lia',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-14-crm-ia-hero.png',
        width: 1149,
        height: 928,
        alt: 'Commercial devant une illustration opposant un CRM superficiel à une lecture utile du rendez-vous client',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pourquoi vos commerciaux remplissent mal le CRM… et utilisent mal l’IA',
    description:
      'Un CRM vide n’est pas qu’un problème de discipline. C’est souvent le symptôme d’une lecture commerciale trop pauvre pour nourrir une IA utile.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-14-crm-ia-hero.png'],
  },
};

export default function PourquoiVosCommerciauxRemplissentMalLeCrmEtUtilisentMalLiaPage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">IA utile / exécution commerciale</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Pourquoi vos commerciaux remplissent mal le CRM… et utilisent mal l’IA
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-14">14 avril 2026</time>
              <span>•</span>
              <span>8 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-14-crm-ia-hero.png"
              alt="Commercial devant une illustration opposant un CRM superficiel à une lecture utile du rendez-vous client"
              width={1149}
              height={928}
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
            Il existe un lien direct entre les équipes qui remplissent mal leur CRM et celles qui utilisent mal l’IA. Tant que la matière commerciale captée après les rendez-vous reste floue, l’outil ne fait qu’industrialiser le flou.
          </p>

          <p className="mb-8">
            Vendredi, je discutais avec un dirigeant.
          </p>

          <p className="mb-8">
            Nous parlions d’intelligence artificielle, de ses commerciaux, et du fait qu’ils l’utilisaient surtout pour rédiger des mails et faire des propositions.
          </p>

          <p className="mb-8">
            Son constat était simple : les résultats n’étaient pas terribles.
          </p>

          <p className="mb-8">
            Les mails devenaient plus longs.<br />
            Les propositions plus bavardes.<br />
            Le tout plus propre en apparence, mais souvent plus creux dans le fond.
          </p>

          <p className="mb-8">
            Je lui ai glissé qu’il faudrait peut-être former un peu mieux l’équipe à l’IA.
          </p>

          <p className="mb-8">
            Sa réponse m’a fait sourire :
          </p>

          <p className="mb-8 italic">
            “Déjà qu’ils ne remplissent pas le CRM, je ne vais pas claquer de l’argent pour rien.”
          </p>

          <p className="mb-8">
            En réalité, il mettait le doigt sur quelque chose de beaucoup plus profond que la simple adoption d’un nouvel outil.
          </p>

          <p className="mb-8">
            Parce qu’il existe un lien direct entre les équipes qui remplissent mal leur CRM… et celles qui utilisent mal l’IA. J’en avais déjà parlé autrement dans{' '}
            <Link href="/blog/pourquoi-ia-sans-plan-vente-produit-surtout-bruit" className="text-blue-ink font-semibold underline hover:text-mint-green">
              Pourquoi l’IA sans plan de vente produit surtout du bruit
            </Link>
            .
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le problème n’est pas toujours la fainéantise</h2>

          <p className="mb-6">
            Soyons clairs.
          </p>

          <p className="mb-6">
            Quand un commercial ne remplit pas son CRM, il peut y avoir un sujet de rigueur, de discipline ou de savoir-faire. Et quand c’est le cas, il faut le corriger.
          </p>

          <p className="mb-8">
            Mais très souvent, ce n’est pas le vrai problème.
          </p>

          <p className="mb-8">
            Le vrai problème, c’est que beaucoup de commerciaux pensent, à raison ou à tort, que le CRM <strong>ne leur sert à rien</strong>. C’est souvent le symptôme d’un problème plus large de système, comme je l’explique dans{' '}
            <Link href="/blog/pourquoi-bons-commerciaux-deviennent-mediocres-mauvais-systeme" className="text-blue-ink font-semibold underline hover:text-mint-green">
              Pourquoi de bons commerciaux deviennent médiocres dans un mauvais système
            </Link>
            .
          </p>

          <p className="mb-8">
            Ils ont l’impression qu’on leur demande de faire de la paperasse pour rassurer le management. Pas de construire un outil qui va les aider à mieux vendre.
          </p>

          <p className="mb-8">
            Alors ils écrivent des choses vagues.<br />
            Des choses acceptables.<br />
            Des choses qui remplissent des cases.
          </p>

          <p className="mb-8">
            “Bon échange.”<br />
            “Client intéressé.”<br />
            “À relancer.”<br />
            “Proposition possible.”
          </p>

          <p className="mb-8">
            Autrement dit : une trace. Mais pas une matière utile. C’est aussi toute la différence entre un commentaire CRM et{' '}
            <Link href="/blog/pourquoi-compte-rendu-commercial-ne-remplace-pas-debrief-a-chaud" className="text-blue-ink font-semibold underline hover:text-mint-green">
              un vrai débrief commercial à chaud
            </Link>
            .
          </p>

          <p className="mb-8">
            Et c’est exactement là que commence aussi le mauvais usage de l’IA.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">L’IA ne sauve pas une pensée commerciale vide</h2>

          <p className="mb-8">
            Aujourd’hui, beaucoup d’équipes commerciales utilisent l’IA de manière superficielle.
          </p>

          <p className="mb-8">
            Elles lui demandent d’écrire un mail.<br />
            De reformuler un compte rendu.<br />
            De faire une proposition.<br />
            De rendre le tout “plus pro”.
          </p>

          <p className="mb-8">
            Le résultat, on le voit partout : un texte plus lisse, plus long, plus poli… mais pas forcément plus pertinent.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Si la matière CRM est floue, l’IA ne crée pas de l’intelligence commerciale.</strong> Elle industrialise le flou, le rend plus présentable, puis le diffuse plus vite.
            </p>
          </div>

          <p className="mb-8">
            C’est ce que j’appelle du <strong>“slope IA”</strong>.
          </p>

          <p className="mb-8">
            Ce n’est pas que l’outil est mauvais. C’est qu’on lui donne une matière de départ médiocre.
          </p>

          <p className="mb-8">
            Si votre note CRM dit :
          </p>

          <p className="mb-8 italic">
            “Le prospect semble intéressé, à relancer, besoin de réfléchir, proposition à envoyer”,
          </p>

          <p className="mb-8">
            l’IA ne va pas fabriquer par magie de l’intelligence commerciale.
          </p>

          <p className="mb-8">
            Elle va industrialiser le flou.
          </p>

          <p className="mb-8">
            Elle va produire un beau texte à partir d’une pauvre pensée.
          </p>

          <p className="mb-8">
            Elle va mettre du costume sur du vide.
          </p>

          <p className="mb-8">
            Et c’est précisément pour ça que tant de mails IA paraissent longs, mous, génériques, et presque toujours un peu à côté du vrai sujet du client.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le sujet n’est pas d’abord de former à écrire avec l’IA</h2>

          <p className="mb-8">
            Le premier réflexe de beaucoup de dirigeants, c’est de dire :
          </p>

          <p className="mb-8 italic">
            “Il faut former mes commerciaux à ChatGPT.”
          </p>

          <p className="mb-8">
            Je pense souvent que ce n’est pas le bon point de départ.
          </p>

          <p className="mb-8">
            Avant de former une équipe à mieux <em>rédiger</em> avec l’IA, il faut l’aider à mieux <strong>capturer</strong>, mieux <strong>lire</strong> et mieux <strong>structurer</strong> la réalité de ses rendez-vous. C’est exactement ce qui manque aussi quand{' '}
            <Link href="/blog/pourquoi-vos-commerciaux-parlent-trop-tot-des-solutions" className="text-blue-ink font-semibold underline hover:text-mint-green">
              les commerciaux parlent trop tôt de leur solution
            </Link>
            {' '}au lieu d’aller chercher le vrai problème.
          </p>

          <p className="mb-8">
            Sinon, on forme juste des gens à produire plus vite des contenus plus élégants… mais pas plus utiles.
          </p>

          <p className="mb-8">
            Le bon point de départ, c’est souvent beaucoup plus simple.
          </p>

          <p className="mb-8">
            Un petit abonnement bien choisi.<br />
            Un vrai outil de capture.<br />
            Une logique claire après chaque rendez-vous.
          </p>

          <p className="mb-8">
            Des outils comme Granola ou Upmeet peuvent déjà changer énormément de choses quand ils sont bien utilisés.
          </p>

          <p className="mb-8">
            Pourquoi ?
          </p>

          <p className="mb-6">
            Parce qu’ils aident à conserver la matière vivante du rendez-vous :
          </p>

          <ul className="list-disc pl-6 mb-8">
            <li>les vraies formulations du client ;</li>
            <li>les objections réelles ;</li>
            <li>les signaux faibles ;</li>
            <li>les priorités exprimées ;</li>
            <li>les zones d’hésitation ;</li>
            <li>la prochaine étape concrète.</li>
          </ul>

          <p className="mb-8">
            Et là, soudain, l’IA devient intéressante.
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">À quoi ressemble un bon usage de l’IA commerciale</h2>

          <p className="mb-8">
            Un bon usage de l’IA commerciale, ce n’est pas de demander :
          </p>

          <p className="mb-8 italic">
            “Rédige-moi un joli mail de relance.”
          </p>

          <p className="mb-6">
            Un bon usage, c’est de lui donner une matière précise et exploitable, puis de lui demander quelque chose d’utile.
          </p>

          <p className="mb-6">
            Par exemple :
          </p>

          <ul className="list-disc pl-6 mb-8">
            <li>rédiger un mail de suivi <strong>court</strong>, centré sur les priorités réelles du client ;</li>
            <li>transformer un entretien en <strong>proposition claire et impactante en quelques lignes</strong> ;</li>
            <li>structurer une note CRM qui servira vraiment au prochain rendez-vous ;</li>
            <li>faire ressortir les objections, les signaux d’achat et les angles à creuser ;</li>
            <li>préparer le commercial à être plus juste, plus pertinent et plus brillant au rendez-vous suivant.</li>
          </ul>

          <p className="mb-8">
            Là, oui, l’IA commence à donner des ailes aux commerciaux.
          </p>

          <p className="mb-8">
            Pas parce qu’elle remplace leur intelligence.
          </p>

          <p className="mb-8">
            Parce qu’elle <strong>magnifie leur côté humain</strong>.
          </p>

          <p className="mb-8">
            Elle leur fait gagner du temps sur la reformulation.<br />
            Elle les aide à remettre de l’ordre dans la matière.<br />
            Elle leur évite de repartir de zéro.<br />
            Elle leur rappelle ce qui compte vraiment.
          </p>

          <p className="mb-8">
            Et surtout, elle les recentre sur une règle fondamentale :
          </p>

          <p className="mb-8">
            <strong>leurs priorités ne sont pas celles de leurs clients.<br />
            Mais les priorités de leurs clients, elles, doivent devenir les leurs.</strong>
          </p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que je recommande concrètement</h2>

          <p className="mb-8">
            Dans une équipe commerciale, je préfère voir trois choses simples en place plutôt qu’un grand discours sur l’IA.
          </p>

          <p className="mb-6">
            Après chaque rendez-vous important, il faut pouvoir retrouver rapidement :
          </p>

          <ol className="list-decimal pl-6 mb-8">
            <li><strong>ce que le client veut vraiment</strong> ;</li>
            <li><strong>ce qui bloque réellement</strong> ;</li>
            <li><strong>quelle est la prochaine étape datée et bilatérale</strong>.</li>
          </ol>

          <p className="mb-8">
            Quand cette matière existe, l’IA devient un levier formidable.
          </p>

          <p className="mb-8">
            Quand elle n’existe pas, l’IA devient surtout une machine à produire du texte supplémentaire.
          </p>

          <p className="mb-8">
            Et franchement, ce n’est pas ce dont les commerciaux ont besoin.
          </p>

          <p className="mb-8">
            Ils n’ont pas besoin de plus de prose.<br />
            Ils ont besoin de plus de justesse.<br />
            Plus de mémoire utile.<br />
            Plus de clarté.<br />
            Plus de continuité entre un rendez-vous et le suivant.
          </p>

          <p className="mb-8">
            Le CRM ne doit pas être un cimetière de rendez-vous. Et l’IA ne doit pas être une usine à “slope IA”.
          </p>

          <p className="mb-8">
            Bien utilisés ensemble, les deux peuvent au contraire transformer une équipe. C’est le sujet que je développe plus largement dans la page dédiée à l’<Link href="/ia-commercial-pme" className="text-blue-ink font-semibold underline hover:text-mint-green">IA commerciale pour PME</Link>.
          </p>

          <p className="mb-8">
            Le CRM garde la mémoire.<br />
            L’IA active cette mémoire.<br />
            Et le commercial, lui, redevient plus présent, plus fin, plus humain, plus fort.
          </p>

          <p className="mb-8">
            C’est là que ça devient intéressant.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez faire de l’IA un vrai levier commercial, pas un vernis de plus ?</h3>
            <p className="mb-6">
              J’aide les dirigeants et équipes commerciales à remettre de la matière utile dans leurs rendez-vous, leur CRM et leurs usages de l’IA, pour que les outils servent enfin la vente au lieu de masquer le vide.
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
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
            Prendre contact avec Laurent Serre
          </h2>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
