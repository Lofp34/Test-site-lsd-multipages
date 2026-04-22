import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

export const metadata: Metadata = {
  title: 'Pourquoi les meilleurs commerciaux se cassent la gueule quand ils deviennent dirco, et pourquoi les meilleurs dirco se cassent la figure quand ils deviennent entrepreneurs | Laurent Serre',
  description:
    'Passer de commercial à directeur commercial, puis de dirco à entrepreneur, ce ne sont pas des promotions. Ce sont trois métiers différents. Voici pourquoi les meilleurs se plantent en changeant d’étage, et ce qu’il faut vraiment installer pour tenir.',
  keywords:
    'directeur commercial, entrepreneur, management commercial, transformation commerciale, promotion commerciale, Laurent Serre',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/pourquoi-meilleurs-commerciaux-dirco-entrepreneurs-se-cassent-la-figure',
  },
  openGraph: {
    title: 'Pourquoi les meilleurs commerciaux se cassent la gueule quand ils deviennent dirco, et pourquoi les meilleurs dirco se cassent la figure quand ils deviennent entrepreneurs',
    description:
      'Passer de commercial à directeur commercial, puis de dirco à entrepreneur, ce ne sont pas des promotions. Ce sont trois métiers différents.',
    url: 'https://www.laurentserre.com/blog/pourquoi-meilleurs-commerciaux-dirco-entrepreneurs-se-cassent-la-figure',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-04-17-commerciaux-dirco-entrepreneurs-hero-v2.png',
        width: 1536,
        height: 1024,
        alt: 'Illustration éditoriale sur le passage de commercial à dirco puis entrepreneur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pourquoi les meilleurs commerciaux se cassent la gueule quand ils deviennent dirco, et pourquoi les meilleurs dirco se cassent la figure quand ils deviennent entrepreneurs',
    description:
      'Trois métiers différents, pas trois niveaux. Pourquoi les meilleurs se plantent en changeant d’étage.',
    images: ['https://www.laurentserre.com/images/blog/2026-04-17-commerciaux-dirco-entrepreneurs-hero-v2.png'],
  },
};

export default function PourquoiMeilleursCommerciauxDircoEntrepreneursSeCassentLaFigurePage() {
  return (
    <main className="bg-primary-bg text-gray-dark">
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Management / transformation commerciale</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Pourquoi les meilleurs commerciaux se cassent la gueule quand ils deviennent dirco, et pourquoi les meilleurs dirco se cassent la figure quand ils deviennent entrepreneurs
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-04-17">17 avril 2026</time>
              <span>•</span>
              <span>11 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-04-17-commerciaux-dirco-entrepreneurs-hero-v2.png"
              alt="Illustration éditoriale sur le passage de commercial à dirco puis entrepreneur"
              width={1536}
              height={1024}
              className="w-full h-auto object-cover object-center rounded-2xl shadow-lg"
              quality={80}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <p className="mb-8">Dans beaucoup de PME, on raisonne comme ça : « Il est excellent commercial, on va le passer dirco. » Et plus tard : « Elle est excellente dirco, elle devrait se lancer. » Comme si c’était la suite logique. Comme si passer d’un étage à l’autre, c’était juste une récompense.</p>

          <p className="mb-8">Ce n’est pas une récompense. C’est un changement de métier.</p>

          <p className="mb-8">Un très bon commercial qui devient dirco ne fait pas plus de ce qu’il sait faire. Il doit arrêter de le faire. Et un très bon dirco qui devient entrepreneur ne fait pas non plus plus de ce qu’il sait faire. Il doit, lui aussi, arrêter de faire ce qui faisait sa valeur.</p>

          <p className="mb-8">C’est pour ça que les meilleurs se cassent la figure au moment où ils passent l’étage. Pas parce qu’ils sont devenus mauvais. Parce qu’ils font bien le métier d’avant dans le métier d’après.</p>

          <p className="mb-8">J’ai vu ça des dizaines de fois en vingt ans de terrain. Ce n’est pas un problème de talent. C’est un problème de cadre.</p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Trois métiers, pas trois niveaux</h2>

          <p className="mb-8">Un commercial est payé pour vendre. Concrètement : tenir un rendez-vous, lire un client, poser un cadre, qualifier, faire avancer un deal, closer.</p>

          <p className="mb-8">Un directeur commercial est payé pour faire vendre les autres. Ce qui est radicalement différent. Il ne gagne plus au mètre, il gagne à travers un système, une équipe, des rituels, un forecast tenu.</p>

          <p className="mb-8">Un entrepreneur est payé pour arbitrer. Où va l’argent, où va le temps, où va l’attention. Il n’est pas là pour vendre ni pour faire vendre. Il est là pour trancher sur la direction de l’entreprise, alors qu’à peu près aucune information ne lui arrive propre.</p>

          <p className="mb-8">Chaque étage change la nature du travail. La devise aussi : le commercial vend du temps contre des signatures, le dirco vend du cadre contre de la performance d’équipe, l’entrepreneur vend une vision contre des décisions lourdes et souvent irréversibles.</p>

          <p className="mb-8">Changer d’étage n’est pas monter. C’est changer de métier. Tant que ce n’est pas dit clairement, on gâche des bons profils en pensant les promouvoir.</p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi les meilleurs commerciaux se cassent la gueule en devenant dirco</h2>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">1. Ils continuent à vendre au lieu de construire un système</h3>

          <p className="mb-8">C’est le premier piège, et de loin le plus fréquent. Le nouveau dirco va sur le terrain, reprend les deals compliqués, sauve les comptes stratégiques, rassure les gros clients. L’équipe applaudit. Le dirigeant se félicite du recrutement.</p>

          <p className="mb-8">Sauf qu’au bout de trois ou quatre mois, le système n’a pas bougé d’un cran. Le nouveau dirco fait juste tourner ses propres dossiers à travers une équipe qui l’attend. Le pipeline reste fragile, le forecast imprévisible, les autres commerciaux se déresponsabilisent. Et on se retrouve avec un super vendeur qui porte l’équipe sur son dos au lieu d’un patron commercial qui la rend autonome.</p>

          <p className="mb-8">C’est précisément le mécanisme que je décris dans <Link href="/blog/pourquoi-bons-commerciaux-deviennent-mediocres-mauvais-systeme" className="text-blue-ink font-semibold underline hover:text-mint-green">pourquoi de bons commerciaux deviennent médiocres dans un mauvais système</Link> : quand le cadre n’est pas posé en amont, même les meilleurs profils dérivent.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">2. Ils aiment encore trop vendre pour coacher</h3>

          <p className="mb-8">Un très bon commercial adore vendre.</p>

          <p className="mb-8">C’est normal, c’est ce qui l’a nourri pendant dix ou quinze ans. Le problème, c’est que coacher n’a rien à voir avec vendre. Coacher, c’est regarder quelqu’un faire mal ce qu’on ferait soi-même très bien, et lui apprendre à progresser à son rythme, pas au vôtre.</p>

          <p className="mb-8">La plupart des nouveaux dircos ne coachent pas. Ils corrigent. Ils reprennent. Ils montrent. Parfois même, ils finissent le rendez-vous à la place du commercial. C’est flatteur pour l’ego, catastrophique pour l’équipe.</p>

          <p className="mb-8">Ce glissement ressemble énormément à <Link href="/blog/pourquoi-manager-commercial-suit-sans-coacher-plombe-equipe" className="text-blue-ink font-semibold underline hover:text-mint-green">ce que produit un manager qui suit sans coacher</Link> : une équipe suivie, commentée, contrôlée, mais jamais vraiment transformée.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">3. Ils pilotent à l’instinct, pas au système</h3>

          <p className="mb-8">Un bon commercial a une intuition remarquable. Il sent le client, il sent le deal, il sent la bonne relance. Cette intuition l’a souvent mis hors norme dans l’équipe précédente. Mais un dirco ne peut pas piloter une équipe à l’intuition.</p>

          <p className="mb-8">Une équipe, ça a besoin de critères. Qu’est-ce qu’une opportunité qualifiée chez nous ? Qu’est-ce qu’un deal mûr pour proposition ? Qu’est-ce qu’une relance utile ? Tant que ces questions n’ont pas de réponses écrites, lisibles et partagées, chaque commercial invente sa propre règle, et le dirco passe sa semaine à arbitrer au cas par cas.</p>

          <p className="mb-8">Le résultat est toujours le même : du temps perdu, un forecast faux, et des décisions de pilotage qui reposent sur du ressenti plutôt que sur de la lecture.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">4. Ils confondent reporting et pilotage</h3>

          <p className="mb-8">Quand ils prennent le poste, beaucoup de nouveaux dircos se mettent à produire des tableaux. Beaucoup de tableaux. Très soignés. Très complets. Et très peu utiles.</p>

          <p className="mb-8">Le reporting raconte ce qui s’est passé. Le pilotage décide ce qui va se passer. Un dirco qui produit un beau reporting mensuel mais qui n’anime pas de vraie revue de deals, qui ne pose pas les bonnes questions sur les opportunités à risque, qui ne tranche pas quand il faut abandonner un dossier, ne pilote rien. Il archive.</p>

          <p className="mb-8">C’est exactement ce que je remets en place dans des rituels comme <Link href="/blog/comite-commercial-mensuel-decisions-dirigeant" className="text-blue-ink font-semibold underline hover:text-mint-green">le comité commercial mensuel</Link> ou <Link href="/blog/revue-deal-avant-proposition-3-verifications" className="text-blue-ink font-semibold underline hover:text-mint-green">la revue deal en 17 minutes</Link> : pas plus d’info, mais de vraies décisions.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">5. Ils portent l’équipe au lieu de la faire grandir</h3>

          <p className="mb-8">C’est le piège final, et souvent celui qui use le plus. Le nouveau dirco, parce qu’il était excellent vendeur, devient le filet de sécurité permanent. Le client qui menace de partir, c’est pour lui. Le deal à gros enjeu, c’est pour lui. La proposition délicate, c’est pour lui. Le rendez-vous stratégique, c’est pour lui.</p>

          <p className="mb-8">Au bout de six mois, il est épuisé. L’équipe est dépendante. Et la boîte n’a pas un directeur commercial, elle a un super commercial senior très bien payé. Ce n’est pas la même chose.</p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi les meilleurs dircos se cassent la figure en devenant entrepreneurs</h2>

          <p className="mb-8">Le saut suivant est encore plus brutal. Parce que là, il n’y a plus personne pour poser le cadre.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">1. Ils ont toujours piloté une seule fonction, et là il faut tout</h3>

          <p className="mb-8">Un dirco a passé des années à exceller dans une zone précise : la performance commerciale. Il a appris à lire un pipe, animer une équipe, négocier un gros contrat, tenir un forecast. Mais quand il devient entrepreneur, la commerciale redevient une fonction parmi cinq ou six.</p>

          <p className="mb-8">Il faut arbitrer entre vendre plus et recruter, entre investir dans le marketing et renforcer la production, entre embaucher un commercial et prendre un comptable. Il faut comprendre un bilan, lire un prévisionnel, négocier avec une banque, gérer des sujets RH qu’il n’a jamais eu à traiter seul.</p>

          <p className="mb-8">Et le piège, c’est qu’il se réfugie souvent dans ce qu’il sait faire : vendre. Parce que c’est confortable. Parce que ça rapporte tout de suite. Parce que c’est gratifiant. Résultat : la boîte vend bien au début, puis bute sur tous les autres sujets qu’il n’a jamais appris à piloter.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">2.Ils ont toujours eu une marque derrière eux</h3>

          <p className="mb-8">C’est un point que les très bons dircos sous-estiment presque toujours. Quand ils décrochent leur téléphone, la marque de l’entreprise parle pour eux. Le prospect reçoit l’appel d’un dirco d’une boîte connue. Ça ouvre des portes. Ça crédibilise les prix. Ça raccourcit les cycles.</p>

          <p className="mb-8">Quand ils se lancent en indépendant ou créent leur boîte, cette marque disparaît. Il ne reste que leur nom et leurs résultats personnels à raconter. Or, vendre sa propre expertise, ce n’est pas vendre le produit d’une entreprise établie. C’est un tout autre exercice, beaucoup plus exposé, beaucoup plus personnel, beaucoup plus lent à décoller.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">3. Ils pensent à court terme commercial, pas à moyen terme entreprise</h3>

          <p className="mb-8">Un dirco raisonne en trimestre, parfois en mois. L’entrepreneur, lui, doit raisonner en années. Où je veux être dans dix-huit mois ? Qu’est-ce que j’accepte comme clients aujourd’hui pour ne pas me fermer le marché que je vise dans deux ans ? Est-ce que ce contrat, très rémunérateur à court terme, ne me positionne pas mal pour la suite ?</p>

          <p className="mb-8">Cette gymnastique est nouvelle. Le réflexe naturel du bon dirco, c’est de dire oui au chiffre d’affaires disponible. Et c’est souvent là qu’il abîme son positionnement sans s’en rendre compte, en acceptant tout ce qui rentre au lieu de trier lucidement ce qui va construire l’entreprise.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">4. Ils confondent liberté et absence de cadre</h3>

          <p className="mb-8">Beaucoup de dircos partent à l’entrepreneuriat avec cette idée : « Je vais enfin être libre. » Ils découvrent très vite qu’un entrepreneur sans cadre n’est pas libre. Il est débordé.</p>

          <p className="mb-8">Pas de routine. Pas de rituels. Pas de plan de vente écrit. Pas de revue régulière. Pas de discipline sur le temps. Juste des journées pleines d’urgences, d’emails, de propositions faites en catastrophe, et d’un sentiment permanent de ne jamais avoir fait ce qu’il fallait vraiment faire.</p>

          <p className="mb-8">J’ai développé ce sujet plus largement dans <Link href="/blog/pourquoi-ia-sans-plan-vente-produit-surtout-bruit" className="text-blue-ink font-semibold underline hover:text-mint-green">pourquoi l’IA sans plan de vente produit surtout du bruit</Link> : sans cadre clair, n’importe quel moyen, même les meilleurs, n’accélère que la confusion.</p>

          <h3 className="text-2xl font-title font-bold text-blue-ink mt-10 mb-4">5. Ils doivent vendre ce qu’ils sont, pas ce qu’ils connaissent</h3>

          <p className="mb-8">C’est peut-être le changement le plus difficile. En tant que dirco, on vendait un service, un produit, une offre portée par une entreprise. En tant qu’entrepreneur, on vend quelque chose de beaucoup plus exposé : sa propre vision, sa propre lecture du marché, sa propre posture.</p>

          <p className="mb-8">Et ça demande un vrai travail éditorial, un travail de positionnement, un travail de récit. Des années de performance commerciale ne préparent pas à ça. Il faut réapprendre à se présenter, à cadrer une conversation de prospection sur soi, à écrire, à expliquer ce qu’on fait de manière simple, à refuser les missions qui ne ressemblent pas à ce qu’on veut construire.</p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Le point commun des deux sauts</h2>

          <p className="mb-8">Dans les deux cas, la cause profonde est la même : on change de métier sans s’autoriser à changer de pratiques.</p>

          <p className="mb-8">Le commercial devenu dirco continue à vendre parce que c’est ce qui le rassure. Le dirco devenu entrepreneur continue à piloter une fonction commerciale parce que c’est là qu’il performe. Aucun des deux ne se met vraiment dans la peau du nouveau rôle. Et c’est ça, au fond, qui les fait tomber.</p>

          <p className="mb-8">Ce n’est pas un problème d’intelligence, d’énergie ou de compétence. C’est un problème de lucidité sur ce qu’il faut arrêter de faire pour réussir l’étage suivant.</p>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce qu’un dirigeant doit vraiment installer au moment du changement d’étage</h2>

          <p className="mb-8">Si vous êtes dirigeant et que vous promouvez un bon commercial au poste de dirco, ou si vous êtes vous-même dirco en train de sauter vers l’entrepreneuriat, voici les quatre choses que j’installe systématiquement en accompagnement :</p>

          <ul className="list-disc pl-6 mb-8">
            <li>Un cadre écrit et partagé : critères de qualification, standards de progression d’un deal, définition claire d’une proposition prête à partir. Sans ça, le nouveau dirco pilote à l’œil et le nouvel entrepreneur subit ses journées.</li>
            <li>Des rituels de pilotage courts et tenus : revue de pipe hebdo, revue de deal avant proposition, comité mensuel. Ce n’est pas du reporting, c’est ce qui fait basculer un rôle de commentaire à un rôle de décision.</li>
            <li>Un vrai travail de posture : apprendre à ne plus vendre pour coacher, apprendre à ne plus piloter une fonction pour piloter une entreprise. Ce travail n’est pas spontané, il s’accompagne.</li>
            <li>Un filtre sur les clients et les dossiers : ce qu’on prend, ce qu’on refuse, ce qu’on délègue. Ce filtre protège le temps, la marge et la trajectoire.</li>
          </ul>

          <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que je vois en vingt ans de terrain</h2>

          <p className="mb-8">Les meilleurs commerciaux qui réussissent leur poste de dirco sont ceux qui acceptent, les six premiers mois, de vendre beaucoup moins et d’installer beaucoup plus.</p>

          <p className="mb-8">Les meilleurs dircos qui réussissent leur bascule entrepreneur sont ceux qui, très tôt, se donnent un cadre plus strict que celui qu’ils avaient en entreprise, pas l’inverse.</p>

          <p className="mb-8">On ne réussit pas le niveau suivant en faisant mieux le niveau précédent. On le réussit en acceptant que le métier a changé.</p>

          <p className="mb-12">C’est souvent la phrase que personne ne dit au moment de la promotion. Et c’est pourtant celle qui évite, à elle seule, la plupart des échecs que je vois sur le terrain.</p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous êtes en train de promouvoir un commercial au poste de dirco, ou de franchir le pas de l’entrepreneuriat ?</h3>
            <p className="mb-6">Je travaille avec des dirigeants de PME et des anciens dircos qui veulent sécuriser ce changement d’étage : structurer le système commercial, installer les bons rituels de pilotage, clarifier la posture et éviter les six premiers mois qui cassent la plupart des nouveaux rôles.</p>
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
