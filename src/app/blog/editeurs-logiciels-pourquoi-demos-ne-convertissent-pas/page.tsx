import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

export const metadata: Metadata = {
  title: 'Éditeurs de logiciels : pourquoi vos démos ne convertissent pas | Laurent Serre',
  description:
    '70% des démos SaaS n\'aboutissent pas à une vente. Non pas parce que le produit est mauvais, mais parce que le commercial le montre trop tôt. Les 3 erreurs des éditeurs de logiciels — et comment les corriger.',
  keywords:
    'éditeur logiciel, SaaS, conversion démo, vente logiciel B2B, commercial SaaS, démo produit, gap selling, discovery commercial, cycle vente logiciel',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/editeurs-logiciels-pourquoi-demos-ne-convertissent-pas',
  },
  openGraph: {
    title: 'Éditeurs de logiciels : pourquoi vos démos ne convertissent pas',
    description:
      '70% des démos SaaS n\'aboutissent pas à une vente. Non pas parce que le produit est mauvais, mais parce que le commercial le montre trop tôt.',
    url: 'https://www.laurentserre.com/blog/editeurs-logiciels-pourquoi-demos-ne-convertissent-pas',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://www.laurentserre.com/images/blog/2026-05-28-editeurs-logiciels-demos-hero.webp',
        width: 2048,
        height: 1365,
        alt: 'Laurent Serre, expert en coaching commercial pour éditeurs de logiciels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Éditeurs de logiciels : pourquoi vos démos ne convertissent pas',
    description:
      '70% des démos SaaS n\'aboutissent pas à une vente. Non pas parce que le produit est mauvais, mais parce que le commercial le montre trop tôt.',
    images: ['https://www.laurentserre.com/images/blog/2026-05-28-editeurs-logiciels-demos-hero.webp'],
  },
};

export default function EditeursLogicielsDemosPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline:
      'Éditeurs de logiciels : pourquoi vos démos ne convertissent pas',
    description:
      '70% des démos SaaS n\'aboutissent pas à une vente. Non pas parce que le produit est mauvais, mais parce que le commercial le montre trop tôt. Analyse terrain par Laurent Serre.',
    author: {
      '@type': 'Person',
      name: 'Laurent Serre',
    },
    datePublished: '2026-05-28',
    dateModified: '2026-05-28',
    image: 'https://www.laurentserre.com/images/blog/2026-05-28-editeurs-logiciels-demos-hero.webp',
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mt-8 mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Accueil
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            Blog
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Éditeurs de logiciels</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-4">
          Éditeurs de logiciels : pourquoi vos démos ne convertissent pas
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          70% des démos SaaS n'aboutissent pas à une vente. Non pas parce que le produit est mauvais, mais parce que le commercial le montre trop tôt. Les 3 erreurs des éditeurs de logiciels — et comment les corriger.
        </p>

        <AuthorCard
          name="Laurent Serre"
          date="28 mai 2026"
          readTime="9 min"
          category="Vente SaaS / Éditeurs logiciels"
          image="/images/blog/2026-05-28-editeurs-logiciels-demos-hero.webp"
        />

        <div className="relative w-full aspect-[3/2] mb-12 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/blog/2026-05-28-editeurs-logiciels-demos-hero.webp"
            alt="Laurent Serre, expert en coaching commercial pour éditeurs de logiciels"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Badge CTA intégré dans la zone héro */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8 rounded-r-lg">
          <p className="text-sm sm:text-base text-orange-900">
            <strong>Vous êtes éditeur de logiciels ?</strong> Je propose des diagnostics terrain d'une demi-journée pour analyser votre cycle de vente.{' '}
            <Link href="/contact" className="text-blue-600 font-semibold underline hover:text-blue-800">
              Me contacter
            </Link>
          </p>
        </div>

        <p className="mb-6">
          Je vais vous raconter une scène que j'ai vue au moins cinquante fois chez des éditeurs de logiciels.
        </p>

        <p className="mb-6">
          Le commercial ouvre la réunion. Trois slides sur l'entreprise. Puis il lance la démo. Il montre l'interface, les fonctionnalités, le dashboard. Tout est fluide, le produit est beau, le prospect semble intéressé. Le commercial sent que ça se passe bien.
        </p>

        <p className="mb-6">
          Trois mois plus tard, le dossier est toujours en cours. Le prospect teste, compare, fait remonter des demandes techniques. La décision n'arrive pas. Et un jour, le CRM affiche « perdu face au concurrent ».
        </p>

        <p className="mb-6">
          Le problème n'est pas le produit. C'est le moment où on l'a montré. On a sauté le diagnostic. On a vendu une solution sans savoir quel était le vrai problème.
        </p>

        <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
          Le piège numéro un : montrer le produit avant de comprendre le problème
        </h2>

        <p className="mb-6">
          C'est le réflexe le plus partagé chez les commerciaux d'éditeurs de logiciels. Et c'est le plus dangereux.
        </p>

        <p className="mb-6">
          Un commercial SaaS qui lance sa démo sans avoir fait un vrai discovery arrive en réunion avec une solution. Le problème, c'est qu'il ne sait pas encore quel est le problème. Il va présenter son produit comme la réponse à une question que le prospect ne s'est peut-être jamais posée.
        </p>

        <p className="mb-6">
          Ce que j'observe :
        </p>

        <p className="mb-6">
          D'un côté, le prospect laisse faire. Il regarde la démo poliment, pose des questions techniques, prend des notes. Il se dit qu'il verra bien à l'usage si l'outil correspond à ses besoins.
        </p>

        <p className="mb-6">
          De l'autre côté, le commercial interprète l'intérêt poli comme un engagement. Il note le deal à 60% dans le CRM. Mais il n'a pas validé une seule fois que le problème du prospect était suffisamment urgent pour justifier un achat.
        </p>

        <p className="mb-6">
          Le résultat : des cycles de vente qui s'allongent, des POC qui s'éternisent, des deals qui disparaissent sans qu'on sache pourquoi. Selon Gartner, 67% des acheteurs B2B préfèrent aujourd'hui ne pas passer par un commercial pour s'informer. Quand la démo arrive trop tôt, elle conforte ce choix — le prospect repart avec une image incomplète et le sentiment d'avoir perdu son temps.
        </p>

        <p className="mb-6">
          La règle est simple : on ne montre pas une solution avant d'avoir fait le tour complet du problème. C'est du Gap Selling appliqué au terrain. Creuser, diagnostiquer, mesurer la douleur. Ensuite seulement, aligner la démo sur les vrais points de blocage.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 my-10 rounded-r-lg">
          <p className="font-semibold text-blue-900 mb-2">Bonne pratique vs erreur</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <p className="font-bold text-red-600 mb-2">Erreur fréquente</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Présenter l'entreprise dès l'ouverture</li>
                <li>Lancer la démo au premier rendez-vous</li>
                <li>Montrer toutes les fonctionnalités</li>
                <li>Interpréter l'intérêt poli comme un engagement</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <p className="font-bold text-green-600 mb-2">Bonne pratique</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Diagnostiquer le problème avant toute démo</li>
                <li>Cartographier les décideurs dès le premier échange</li>
                <li>Ne montrer que ce qui résout le blocage identifié</li>
                <li>Valider l'urgence et le budget avant de démontrer</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
          Les 4 décideurs : celui qui valide la technique n'est pas celui qui signe le chèque
        </h2>

        <p className="mb-6">
          Une autre erreur classique dans la vente de logiciels : on croit avoir convaincu un décideur, mais on a juste convaincu un utilisateur.
        </p>

        <p className="mb-6">
          Dans un achat SaaS B2B de plus de 10 000 euros par an, il y a en moyenne 11 personnes impliquées dans la décision. Mais dans les faits, quatre rôles sont presque toujours présents :
        </p>

        <ol className="list-decimal list-inside mb-6 space-y-3 text-gray-800">
          <li>
            <strong>Le sponsor métier</strong> — celui qui va utiliser le logiciel au quotidien. Il veut que ça marche, que ça lui simplifie la vie. C'est votre allié naturel, mais il ne décide pas seul.
          </li>
          <li>
            <strong>Le CTO ou DSI</strong> — il valide la sécurité, l'intégration, la maintenabilité. Sans son aval technique, rien ne passe. Mais un oui technique n'est pas un oui budgétaire.
          </li>
          <li>
            <strong>Les achats</strong> — ils comparent les prix, négocient, vérifient que l'investissement est justifié. Ils arrivent souvent tard dans le processus et peuvent tout faire dérailler.
          </li>
          <li>
            <strong>Le DG ou COMEX</strong> — celui qui tranche sur les gros budgets. Il veut savoir quel problème stratégique vous résolvez et en combien de temps. Pas le détail des fonctionnalités.
          </li>
        </ol>

        <p className="mb-6">
          Le piège, c'est de passer tout le cycle à parler au sponsor métier et au CTO, puis de découvrir au moment de signer que le DG n'a jamais été briefé sur le sujet.
        </p>

        <p className="mb-6">
          La correction : cartographier les décideurs dès le premier rendez-vous. Identifier qui décide quoi. Et s'assurer que la démo parle le langage de chacun. La démo qui convertit n'est pas celle qui montre tout. C'est celle qui répond à la question que chaque interlocuteur se pose.
        </p>

        <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
          Le POC qui n'en finit pas : quand le client teste mais n'achète pas
        </h2>

        <p className="mb-6">
          C'est le cauchemar des éditeurs de logiciels. Le prospect demande un POC. Il veut « tester l'outil sur un cas concret ». Le commercial accepte, ravi de prouver la valeur du produit.
        </p>

        <p className="mb-6">
          Le POC dure deux semaines. Puis quatre. Puis deux mois. Le client fait des retours, demande des ajustements, compare avec un concurrent en test chez lui. L'équipe technique passe du temps à configurer, à paramétrer. Et à la fin, le client dit : « On n'est pas encore prêts. On a besoin de plus de temps. » Ou pire : « Finalement, on a trouvé une solution interne. »
        </p>

        <p className="mb-6">
          Le POC est un piège quand il n'est pas cadré. Le cycle de vente SaaS médian est de 84 jours. Un POC non cadré peut facilement en représenter la moitié, sans garantie de conversion.
        </p>

        <p className="mb-6 font-semibold">
          Un POC doit avoir :
        </p>

        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-800">
          <li>une durée fixe et courte (2 à 4 semaines maximum)</li>
          <li>un critère de succès mesurable défini à l'avance</li>
          <li>un engagement clair sur la prochaine étape après le POC</li>
          <li>un point d'arrêt : si le critère n'est pas atteint, on arrête proprement</li>
        </ul>

        <p className="mb-6">
          Sans ces quatre conditions, un POC est une façon polie pour un prospect de reporter sa décision. Et pour un commercial, de perdre son temps sur un deal qui n'aboutira pas.
        </p>

        <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
          Le syndrome du commercial-expert
        </h2>

        <p className="mb-6">
          Chez les éditeurs de logiciels, beaucoup de commerciaux viennent de la technique. Anciens ingénieurs, anciens consultants, ils connaissent le produit sur le bout des doigts. Et c'est à la fois leur force et leur faiblesse.
        </p>

        <p className="mb-6">
          Leur force : ils peuvent répondre à toutes les questions. Ils inspirent confiance par leur expertise.
        </p>

        <p className="mb-6">
          Leur faiblesse : ils passent leur temps à démontrer au lieu de diagnostiquer. Leur premier réflexe, c'est d'ouvrir l'interface. Leur second, c'est d'expliquer comment ça marche. Mais pendant ce temps, ils ne posent pas les questions qui permettraient de comprendre le vrai problème du prospect.
        </p>

        <p className="mb-6">
          Un commercial-expert typique :
        </p>

        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-800">
          <li>répond à toutes les objections techniques</li>
          <li>personnalise la démo en direct</li>
          <li>mais n'a pas validé que le problème est prioritaire</li>
          <li>et n'a pas identifié qui décide vraiment</li>
        </ul>

        <p className="mb-6">
          La difficulté, c'est que ça marche sur les petits deals. Pour un abonnement à 200 euros par mois, la démo directe peut suffire. Mais dès qu'on monte en budget et en complexité, le défaut de diagnostic se paie cash. En cycles longs qui dépassent les 84 jours médians, en POC interminables, en pertes inexplicables.
        </p>

        <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
          Structurer le discovery avant la démo
        </h2>

        <p className="mb-6">
          La solution est simple dans son principe, exigeante dans son exécution.
        </p>

        <p className="mb-6">
          Avant toute démo, le commercial doit pouvoir répondre à trois questions :
        </p>

        <div className="bg-gray-50 border-l-4 border-blue-500 p-5 my-6 rounded-r-lg">
          <p className="font-semibold text-blue-900 mb-3">Les 3 questions à valider avant toute démo</p>
          <ol className="list-decimal list-inside space-y-3 text-gray-800">
            <li>
              <strong>Quel est le vrai problème que vous résolvez pour ce prospect ?</strong>
              <p className="ml-6 mt-1 text-sm text-gray-600">Pas le problème général. Le problème spécifique, situé, incarné : « Votre équipe support perd 12 heures par semaine à ressaisir les données client entre votre CRM et votre outil de ticketing. »</p>
            </li>
            <li>
              <strong>Pourquoi maintenant ? Quelle est l'urgence ?</strong>
              <p className="ml-6 mt-1 text-sm text-gray-600">Si rien ne presse, le deal n'arrivera jamais. Il faut un déclencheur : un audit qui arrive, une embauche qui change l'équipe, une perte de client qui alerte la direction.</p>
            </li>
            <li>
              <strong>Qui décide et sur quels critères ?</strong>
              <p className="ml-6 mt-1 text-sm text-gray-600">Cartographie des parties prenantes. Critères objectifs de sélection. Budget alloué ou à dégager.</p>
            </li>
          </ol>
        </div>

        <p className="mb-6">
          Si le commercial ne peut pas répondre à ces trois questions avec précision, la démo est prématurée. Il faut un rendez-vous de discovery avant.
        </p>

        <p className="mb-6">
          Et quand la démo arrive enfin, elle ne doit pas être une visite guidée du produit. Elle doit être une réponse sur mesure aux problèmes identifiés. On ne montre pas tout. On montre ce qui résout le point de blocage numéro un. On s'arrête là. On valide. On passe à l'étape suivante.
        </p>

        <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
          Ce que ça change concrètement
        </h2>

        <p className="mb-6">
          J'accompagne un éditeur de logiciels RH qui faisait face à ce problème. L'équipe commerciale montrait la solution au premier rendez-vous. Le cycle moyen était de 120 jours. Les POC duraient en moyenne 6 semaines. Le taux de conversion démo vers closing était autour de 22%.
        </p>

        <p className="mb-6">
          En trois mois de travail sur la structuration du discovery :
        </p>

        <div className="bg-gray-50 p-5 my-6 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Cycle de vente</p>
              <p className="text-2xl font-bold text-green-600">120j → 75j</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Conversion démo → close</p>
              <p className="text-2xl font-bold text-green-600">22% → 34%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Durée POC</p>
              <p className="text-2xl font-bold text-green-600">6 sem. → 3 sem.</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Démos non qualifiées</p>
              <p className="text-2xl font-bold text-green-600">En baisse</p>
            </div>
          </div>
        </div>

        <p className="mb-6">
          Ce n'est pas un résultat exceptionnel. C'est le résultat normal quand on arrête de montrer le produit trop tôt.
        </p>

        <h2 className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
          Ce qu'il faut retenir
        </h2>

        <p className="mb-6">
          Si vous êtes dirigeant d'un éditeur de logiciels, regardez honnêtement votre cycle de vente. Regardez le nombre de démos qui ne mènent à rien. Regardez la durée de vos POC. Et posez-vous une seule question :
        </p>

        <p className="mb-8 text-lg font-semibold text-gray-800 italic">
          Est-ce que vos commerciaux passent plus de temps à montrer le produit qu'à comprendre le problème du client ?
        </p>

        <p className="mb-6">
          Si la réponse est oui, le levier d'amélioration n'est pas dans votre produit. Il est dans votre méthode de vente.
        </p>

        {/* Pour aller plus loin */}
        <div className="bg-blue-50 rounded-xl p-6 my-10">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Pour aller plus loin</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/gap-selling-methode-terrain-b2b" className="text-blue-700 hover:text-blue-900 underline">
                Gap Selling appliqué au terrain : vendre en creusant le vrai problème
              </Link>
            </li>
            <li>
              <Link href="/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre" className="text-blue-700 hover:text-blue-900 underline">
                Vente consultative B2B : devenir le conseiller que vos clients ne veulent pas perdre
              </Link>
            </li>
            <li>
              <Link href="/expert-developpement-commercial-pme" className="text-blue-700 hover:text-blue-900 underline">
                Expertise en développement commercial PME
              </Link>
            </li>
          </ul>
        </div>

        {/* CTA double */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 my-10 text-white">
          <h3 className="text-2xl font-bold mb-3">Vous reconnaissez ces situations dans votre équipe ?</h3>
          <p className="mb-6 text-blue-100">
            Je propose des diagnostics terrain d'une demi-journée pour les éditeurs de logiciels. On observe vos démos, on cartographie vos décideurs, on structure votre discovery. Pas de méthode toute faite — du sur-mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-800 font-semibold rounded-full hover:bg-blue-50 transition-colors"
            >
              Me contacter
            </Link>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors"
            >
              Découvrir le bootcamp commercial
            </Link>
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
