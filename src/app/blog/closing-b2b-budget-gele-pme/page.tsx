import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/closing-b2b-budget-gele-pme';
const heroImage = 'https://www.laurentserre.com/images/blog/closing-budget-gele/closing-budget-gele-hero.webp';
const ogImage = 'https://www.laurentserre.com/images/blog/closing-budget-gele/closing-budget-gele-og.jpg';

export const metadata: Metadata = {
  title: 'Budget gelé en B2B : comment signer quand le client dit non',
  description:
    'Le budget gelé n\'est pas une objection de prix, c\'est une objection de priorité. La méthode terrain pour diagnostiquer le vrai blocage, construire un dossier bancable et signer avec des solutions sans risque.',
  keywords:
    'closing b2b budget gelé pme, objection budget gelé B2B, comment closer quand le client n\'a pas de budget, signer deal pme budget serré, techniques closing pme 2026, closing b2b en temps de crise, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-21',
  },
  openGraph: {
    title: 'Quand un client dit « budget gelé », il ne parle pas d\'argent',
    description:
      'Le budget gelé n\'est pas une objection de prix, c\'est une objection de priorité. La méthode terrain pour diagnostiquer, justifier et signer.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Budget gelé en B2B : l\'objection la plus mal traitée',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quand un client dit « budget gelé », il ne parle pas d\'argent | Laurent Serre',
    description:
      'Le budget gelé n\'est pas une objection de prix, c\'est une objection de priorité. Méthode terrain pour diagnostiquer, justifier et signer.',
    images: [ogImage],
  },
};

const carouselPrefix = '/images/blog/closing-budget-gele';

const carouselImages = [
  { src: `${carouselPrefix}/closing-budget-gele-slide-cover.webp`, alt: 'Couverture : Budget gelé, l\'objection la plus mal traitée', index: 0 },
  { src: `${carouselPrefix}/closing-budget-gele-slide-01-scene.webp`, alt: 'La scène : le client dit budget gelé', index: 1 },
  { src: `${carouselPrefix}/closing-budget-gele-slide-02-reflexe.webp`, alt: 'Le mauvais réflexe : accepter et passer à autre chose', index: 2 },
  { src: `${carouselPrefix}/closing-budget-gele-slide-03-consequence.webp`, alt: 'La conséquence : le dossier reste en suspens', index: 3 },
  { src: `${carouselPrefix}/closing-budget-gele-slide-04-declic.webp`, alt: 'Le déclic : ce n\'est pas une question de prix', index: 4 },
  { src: `${carouselPrefix}/closing-budget-gele-slide-05-diagnostic.webp`, alt: 'Diagnostiquer le vrai blocage', index: 5 },
  { src: `${carouselPrefix}/closing-budget-gele-slide-06-cout.webp`, alt: 'Quantifier le coût de l\'inaction', index: 6 },
  { src: `${carouselPrefix}/closing-budget-gele-slide-07-bancable.webp`, alt: 'Construire un dossier bancable', index: 7 },
  { src: `${carouselPrefix}/closing-budget-gele-slide-08-solution.webp`, alt: 'Proposer une solution sans risque', index: 8 },
  { src: `${carouselPrefix}/closing-budget-gele-slide-09-signature.webp`, alt: 'La signature avec paiement différé', index: 9 },
  { src: `${carouselPrefix}/closing-budget-gele-slide-10-cta.webp`, alt: 'CTA : Commencez par un diagnostic', index: 10 },
];

const faqItems = [
  {
    question: 'Comment faire face à l\'objection budget gelé en B2B ?',
    answer:
      'Le budget gelé n\'est pas une objection de prix, c\'est une objection de priorité. Votre rôle n\'est pas de brader, mais d\'aider votre client à justifier l\'investissement. Pour cela : diagnostiquez le vrai blocage (priorité, trésorerie, validation interne), quantifiez ce que coûte le statu quo, construisez un dossier bancable avec un ROI clair, et proposez une solution sans risque comme un paiement différé ou un POC.',
  },
  {
    question: 'Qu\'est-ce qu\'une objection de priorité en vente B2B ?',
    answer:
      'Une objection de priorité, c\'est quand le client ne dit pas « c\'est trop cher » mais « ce n\'est pas le moment » ou « j\'ai d\'autres urgences ». Le budget existe, mais l\'investissement n\'est pas assez justifié pour passer avant les autres dépenses. La réponse n\'est pas de baisser le prix, mais de rendre l\'investissement bancable : démontrer le ROI, chiffrer le coût de l\'inaction, proposer un modèle de paiement adapté.',
  },
  {
    question: 'Comment construire un business case bancable pour une PME ?',
    answer:
      'Un business case bancable pour une PME contient quatre éléments : le coût du problème actuel (perte de CA, temps perdu, inefficacité), le gain attendu de la solution (chiffres concrets, délai de retour sur investissement), un plan de financement réaliste (paiement échelonné, différé, POC), et une preuve de risque limité (garantie, période test, clause de sortie). L\'objectif est que le dirigeant puisse aller voir son banquier avec un dossier solide.',
  },
  {
    question: 'Quelles solutions proposer quand un client B2B n\'a pas de budget immédiat ?',
    answer:
      'Cinq solutions concrètes : le paiement différé de 60 à 90 jours, le paiement échelonné sur 6 à 12 mois, le POC ou pilote sur un périmètre réduit, la réallocation depuis un budget existant (formation, consulting), et l\'argument d\'urgence réglementaire comme la facturation électronique obligatoire en 2026 qui force l\'investissement.',
  },
];

export default function ClosingBudgetGelePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Quand un client dit « budget gelé », il ne parle pas d\'argent',
        description:
          'Le budget gelé n\'est pas une objection de prix, c\'est une objection de priorité. La méthode terrain pour diagnostiquer, justifier et signer.',
        image: heroImage,
        datePublished: '2026-06-21',
        dateModified: '2026-06-21',
        author: {
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com/a-propos',
          sameAs: [
            'https://www.linkedin.com/in/laurentserre34/',
            'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
          ],
        },
        publisher: {
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com',
        },
        mainEntityOfPage: {
          '@id': articleUrl,
        },
        articleSection: 'Closing / Négociation',
        keywords: [
          'closing b2b budget gelé pme',
          'objection budget gelé B2B',
          'comment closer quand le client n\'a pas de budget',
          'signer deal pme budget serré',
          'techniques closing pme 2026',
          'closing b2b en temps de crise',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${articleUrl}#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'Closing B2B budget gelé', item: articleUrl },
        ],
      },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Closing budget gelé</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Closing / Négociation
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Quand un client dit « budget gelé », il ne parle pas d&apos;argent
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/laurent.jpg"
                  alt="Laurent Serre"
                  width={32}
                  height={32}
                  className="rounded-full"
                  quality={60}
                  sizes="32px"
                  loading="lazy"
                />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-06-21">21 juin 2026</time>
              <span>•</span>
              <span>9 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/closing-budget-gele/closing-budget-gele-hero.webp"
              alt="Budget gelé en B2B : le client ne parle pas d'argent"
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
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              Ce qu&apos;il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              « Budget gelé » n&apos;est pas une objection de prix. C&apos;est une objection de priorité. Votre client ne vous dit pas que c&apos;est trop cher : il vous dit qu&apos;il n&apos;a pas assez de raisons de mettre cet investissement avant les autres. Brader ne sert à rien. La seule chose qui marche : aider votre client à justifier la dépense, construire un dossier bancable, et proposer une solution sans risque.
            </p>
          </div>

          {/* BD Carousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Budget gelé, le vrai diagnostic
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire de Karim, commercial qui entend « budget gelé » pour la troisième fois en un mois. Du réflexe qui tue à la signature avec paiement différé.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Budget gelé en B2B"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-closing-budget-gele.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (11 planches)
              </Link>
            </div>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vos commerciaux savent-ils traiter l&apos;objection budget gelé ? Diagnostic offert
            </Link>
          </div>

          {/* Introduction */}
          <p className="mb-8">
            J&apos;étais en rendez-vous la semaine dernière avec un dirigeant de PME industrielle. 80 personnes, un carnet de commandes correct, mais une trésorerie sous pression. On parlait de ses commerciaux. Il m&apos;a montré son pipe : trois dossiers en stand-by depuis avril. Tous avec la même annotation.
          </p>
          <p className="mb-8">
            « Budget gelé. »
          </p>
          <p className="mb-8">
            Son commercial avait noté ça et passé à autre chose. Classique. Et complètement faux.
          </p>
          <p className="mb-8">
            « Budget gelé » n&apos;est pas une réponse. C&apos;est un réflexe. Une formule que tout le monde utilise parce qu&apos;elle est socialement acceptable, qu&apos;elle ne blesse personne et qu&apos;elle ferme la conversation proprement. Mais dans huit cas sur dix, quand vous creusez un peu, le budget n&apos;est pas gelé. Il est ailleurs. Ou il attend une raison de se débloquer.
          </p>

          {/* Le contexte 2026 */}
          <h2 id="contexte-2026" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le contexte 2026 est brutal. Mais pas pour les raisons que vous croyez
          </h2>
          <p className="mb-8">
            Il faut être honnête sur le contexte. En 2026, l&apos;environnement est dur. Plus de 70 000 défaillances d&apos;entreprises en France sur les douze derniers mois. Les banques resserrent les crédits. Les trésoreries sont tendues. Les comités de direction passent leur temps à couper dans tout ce qui n&apos;est pas strictement indispensable.
          </p>
          <p className="mb-8">
            Quand un dirigeant de PME vous dit « budget gelé », il ne ment pas. Sa trésorerie est réellement sous pression. Son banquier lui a dit non la semaine dernière. Son comité vient de geler tous les investissements non stratégiques.
          </p>
          <p className="mb-8">
            Mais voici ce que ça change : cela ne veut pas dire qu&apos;il ne dépense plus. Cela veut dire qu&apos;il ne dépense plus pour ce qui n&apos;est pas justifié.
          </p>
          <p className="mb-8">
            Et c&apos;est là que tout se joue. Si votre client signe chez un concurrent la semaine prochaine après vous avoir dit « budget gelé », ce n&apos;est pas son budget qui s&apos;est dégelé. C&apos;est que le concurrent lui a donné une raison que vous ne lui avez pas donnée.
          </p>

          {/* Budget gelé != prix */}
          <h2 id="objection-priorite" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            « Budget gelé » n&apos;est pas une objection de prix
          </h2>
          <p className="mb-8">
            C&apos;est la distinction la plus importante que vous ayez à faire en closing cette année.
          </p>
          <p className="mb-8">
            La plupart des commerciaux entendent « budget gelé » et traduisent par : « c&apos;est trop cher ». Alors ils font ce qu&apos;on leur a appris en formation : ils préparent une remise, ils proposent un échelonnement, ils sortent le tableau Excel avec le retour sur investissement. Et ça ne marche pas. Parce que le problème n&apos;est pas le prix.
          </p>
          <p className="mb-8">
            « Budget gelé » est une objection de priorité. Votre client ne vous dit pas : « Je n&apos;ai pas l&apos;argent. » Il vous dit : « Je n&apos;ai pas assez de raisons de mettre cet investissement avant les autres. »
          </p>
          <p className="mb-8">
            La différence est énorme. Sur une objection de prix, vous pouvez négocier, brader, trouver un compromis. Sur une objection de priorité, baisser votre tarif ne sert à rien. Même à moitié prix, si l&apos;investissement n&apos;est pas prioritaire, il ne se fera pas.
          </p>
          <p className="mb-8">
            Le bon réflexe n&apos;est pas de baisser le prix. C&apos;est d&apos;aider votre client à justifier l&apos;investissement. C&apos;est très différent. Et c&apos;est ce que font les meilleurs commerciaux en 2026 : ils ne vendent plus, ils aident à acheter.
          </p>
          <p className="mb-8">
            Pour creuser ce sujet en profondeur, lisez <Link href="/blog/la-peur-du-prix-le-vrai-probleme-nest-presque-jamais-le-tarif" className="text-mint-green hover:underline">cet article sur la peur du prix</Link> où je détaille pourquoi le tarif n&apos;est presque jamais le vrai problème.
          </p>

          {/* Les erreurs fatales */}
          <h2 id="erreurs-fatales" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les erreurs qui vous coûtent des signatures
          </h2>
          <p className="mb-8">
            J&apos;ai accompagné assez de PME pour identifier les cinq erreurs récurrentes face à un « budget gelé ». Aucune n&apos;est compliquée. Toutes sont destructrices.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Accepter le non au premier degré
          </h3>
          <p className="mb-8">
            C&apos;est l&apos;erreur la plus fréquente. Le client dit « budget gelé » et le commercial note dans son CRM : « Attente débloquage budget. Relance dans trois mois. » Trois mois plus tard, le client a signé ailleurs. Le commercial ne comprend pas.
          </p>
          <p className="mb-8">
            « Budget gelé » n&apos;est pas un non. C&apos;est un « pas maintenant, et je ne sais pas comment justifier ça autrement ». Le commercial qui accepte le non au premier degré abandonne son client au mauvais moment.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Brader pour rentrer dans le budget
          </h3>
          <p className="mb-8">
            Autre réflexe classique : « Si le budget est serré, je fais un geste commercial. » Sauf que brader sur une objection de priorité envoie le pire signal possible : vous confirmez que votre offre n&apos;est pas prioritaire, puisque vous-mêmes vous la traitez comme négociable.
          </p>
          <p className="mb-8">
            Un client qui voit un commercial baisser son prix de 20 % dès qu&apos;il dit « budget gelé » pense deux choses : « Il y avait de la marge, donc je me suis fait avoir sur le premier prix » et « Si lui-même ne défend pas son tarif, c&apos;est que la valeur n&apos;est pas réelle. »
          </p>
          <p className="mb-8">
            Pour défendre vos prix sans jamais casser vos marges, lisez <Link href="/blog/negociation-commerciale-b2b-defendre-vos-prix-sans-jamais-casser-vos-marges" className="text-mint-green hover:underline">cet article sur la négociation commerciale en B2B</Link>.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Ignorer la dimension bancaire
          </h3>
          <p className="mb-8">
            Dans une PME, un investissement de plus de 30 000 euros passe rarement sans l&apos;avis du banquier. Or la plupart des commerciaux font leur proposition comme si le client décidait seul. Ils ne pensent pas à construire un dossier que le dirigeant peut présenter à sa banque.
          </p>
          <p className="mb-8">
            C&apos;est une erreur énorme. Votre client n&apos;est pas votre seul décideur. Son banquier l&apos;est aussi. Et si vous ne lui donnez pas les arguments pour convaincre sa banque, quelqu&apos;un d&apos;autre le fera.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Forcer la fermeture
          </h3>
          <p className="mb-8">
            À l&apos;inverse du commercial qui abandonne, il y a celui qui pousse trop. « Il faut signer maintenant, sinon le prix augmente. » Ça ne marche plus en 2026. Les dirigeants de PME sont trop sollicités, trop méfiants, trop sous pression pour céder à la pression. Forcer la fermeture sur une objection de priorité produit l&apos;effet inverse : le client se ferme complètement.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Oublier les dispositifs d&apos;aide et urgence
          </h3>
          <p className="mb-8">
            En 2026, il existe plus de dispositifs qu&apos;on ne le croit pour faciliter un investissement B2B en PME. Crédit-bail, location financière, paiements échelonnés, POC, aides régionales, cofinancement OPCO pour la formation. Et surtout : des urgences réglementaires qui forcent l&apos;investissement. La facturation électronique obligatoire en est l&apos;exemple le plus parlant cette année. Tout entrepreneur concerné devra investir, budget ou pas. Le bon commercial connaît ces leviers et les met sur la table.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Pour former vos commerciaux au closing en contexte difficile
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente travaille les techniques de closing adaptées au contexte 2026 : traitement des objections de priorité, construction de business case bancable, solutions de financement. Vos commerciaux repartent avec des scripts terrain testés.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          {/* La méthode terrain */}
          <h2 id="methode-terrain" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que fait le bon commercial face à un budget gelé
          </h2>
          <p className="mb-8">
            Quand le client dit « budget gelé », le bon commercial ne panique pas et ne négocie pas. Il fait quatre choses, dans cet ordre. Ce n&apos;est pas une méthode apprise en formation théorique. C&apos;est ce que je vois fonctionner sur le terrain, en mission, chez les PME que j&apos;accompagne.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Diagnostiquer le vrai blocage
          </h3>
          <p className="mb-8">
            La première chose à faire, c&apos;est de comprendre ce que « budget gelé » veut dire vraiment pour ce client précis. Est-ce un problème de trésorerie ? Un problème de priorité ? Un problème de validation interne ? Un problème de peur ?
          </p>
          <p className="mb-8">
            La question que j&apos;utilise systématiquement en mission est simple : « Si le budget n&apos;était pas un sujet, est-ce que ce projet serait votre priorité ? »
          </p>
          <p className="mb-8">
            Si la réponse est oui, vous avez un problème de financement. C&apos;est résolvable. Si la réponse est non, vous avez un problème de priorité. C&apos;est plus profond, et ça demande de revenir à la valeur de votre proposition.
          </p>
          <p className="mb-8">
            Trop de commerciaux sautent cette étape. Ils entendent « budget gelé » et ils proposent une remise. Mais sans diagnostic, vous traitez un symptôme sans connaître la maladie.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Quantifier ce que coûte le statu quo
          </h3>
          <p className="mb-8">
            Une fois que vous savez que le projet est prioritaire mais que le financement pose question, votre travail change. Vous ne vendez plus votre solution. Vous chiffrez ce que coûte de ne rien faire.
          </p>
          <p className="mb-8">
            C&apos;est la bascule la plus puissante en closing B2B. Votre client pense « coût de l&apos;investissement ». Votre rôle est de lui montrer « coût du statu quo ». Combien il perd chaque mois à ne pas décider. Combien de temps son équipe perd sur des processus manuels. Combien d&apos;affaires il rate parce que son système actuel est trop lent.
          </p>
          <p className="mb-8">
            Quand le coût du statu quo devient supérieur au coût de l&apos;investissement, la décision devient évidente. Pas forcément facile, mais évidente.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Construire un dossier bancable
          </h3>
          <p className="mb-8">
            Si votre client doit convaincre son banquier, son directeur financier ou son comité, donnez-lui les armes pour le faire. Ça veut dire : un document simple qui montre le coût du problème, le gain attendu, le délai de retour sur investissement et le plan de financement.
          </p>
          <p className="mb-8">
            Pas un dossier de 40 pages. Une page, deux maximum. Le banquier veut voir trois choses : combien ça coûte, combien ça rapporte, comment c&apos;est remboursé. Si vous aidez votre client à répondre à ces trois questions, vous avez fait 80 % du travail de closing.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Proposer une solution sans risque
          </h3>
          <p className="mb-8">
            Le dernier blocage, c&apos;est la peur. Le dirigeant de PME a peur de se tromper, peur d&apos;engager une dépense qu&apos;il ne pourra pas annuler, peur de signer un contrat qui le piégera si son activité baisse.
          </p>
          <p className="mb-8">
            C&apos;est là que les techniques de dérisquage entrent en jeu. Et elles marchent.
          </p>

          {/* Techniques concrètes */}
          <h2 id="techniques-terrain" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les techniques qui décoincent vraiment un budget gelé
          </h2>
          <p className="mb-8">
            J&apos;ai vu ces cinq techniques faire signer des dossiers « gelés » depuis des mois. Aucune n&apos;est un truc de mentaliste. Ce sont des mécaniques commerciales simples, alignées sur le réel d&apos;une PME en 2026.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Le paiement différé
          </h3>
          <p className="mb-8">
            Premier réflexe. Le client signe maintenant, paie dans 60 ou 90 jours. Ça lui donne le temps de générer du chiffre avec votre solution avant de la payer. C&apos;est particulièrement puissant pour les solutions qui ont un impact rapide sur le chiffre d&apos;affaires ou la productivité.
          </p>
          <p className="mb-8">
            J&apos;ai vu un éditeur logiciel signer un deal à 80 000 euros avec un paiement différé de 90 jours. Le client a généré 40 000 euros d&apos;économies avant le premier règlement. Le dossier était bancable sans effort.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            Le POC sur un périmètre réduit
          </h3>
          <p className="mb-8">
            Au lieu de vendre tout le projet, commencez par une preuve de concept sur un périmètre limité. Ça divise le budget par trois ou quatre, ça réduit le risque perçu, et ça permet au client de mesurer le résultat avant de s&apos;engager plus largement.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            L&apos;échelonnement sur 6 à 12 mois
          </h3>
          <p className="mb-8">
            Le paiement échelonné lisse la dépense dans le temps. Pour une PME en tension de trésorerie, ça fait la différence entre un oui et un non. C&apos;est aussi un signal de confiance : vous acceptez d&apos;attendre, donc vous croyez en ce que vous vendez.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            La réallocation depuis un budget existant
          </h3>
          <p className="mb-8">
            Dans une PME, il y a presque toujours un budget quelque part. Formation, consulting, matériel, communication. Le bon commercial aide son client à regarder ses budgets existants sous un autre angle. « Est-ce que votre budget formation pourrait couvrir le déploiement ? » « Est-ce que ce que vous dépensez en consulting externe pourrait financer la solution ? »
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
            L&apos;urgence réglementaire
          </h3>
          <p className="mb-8">
            En 2026, la facturation électronique obligatoire est le meilleur argument pour débloquer un budget gelé. Ce n&apos;est plus un choix, c&apos;est une obligation. Le budget ne peut pas rester gelé sur un sujet qui devient illégal à ne pas traiter. Si votre solution touche de près ou de loin à la facturation, aux flux financiers ou à la conformité, c&apos;est un levier majeur.
          </p>
          <p className="mb-8">
            Pour aller plus loin sur les techniques de closing, lisez <Link href="/blog/closing-b2b-7-techniques" className="text-mint-green hover:underline">les 7 techniques de closing B2B</Link> que j&apos;utilise en mission.
          </p>

          {/* Scripts terrain */}
          <h2 id="scripts-terrain" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les phrases qui marchent en rendez-vous
          </h2>
          <p className="mb-8">
            Voici les phrases que j&apos;utilise en mission quand un client me dit « budget gelé ». Elles ne sont pas magiques. Elles sont justes, directes, et elles ouvrent une conversation au lieu de la fermer.
          </p>
          <p className="mb-8">
            <strong>Pour diagnostiquer :</strong> « Si le budget n&apos;était pas un sujet, est-ce que ce projet serait votre priorité ? »
          </p>
          <p className="mb-8">
            <strong>Pour quantifier :</strong> « Combien vous coûte le fait de ne pas décider aujourd&apos;hui ? »
          </p>
          <p className="mb-8">
            <strong>Pour le banquier :</strong> « Qu&apos;est-ce qu&apos;il faudrait comme dossier pour que votre banquier dise oui ? »
          </p>
          <p className="mb-8">
            <strong>Pour dérisquer :</strong> « Et si on commençait par un périmètre réduit, avec un paiement différé de 90 jours ? »
          </p>
          <p className="mb-8">
            Ces phrases ne sont pas des scripts appris par cœur. Ce sont des ouvertures. Elles marchent parce qu&apos;elles ne forcent pas la décision. Elles aident le client à réfléchir autrement.
          </p>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vos commerciaux entendent « budget gelé » tous les jours ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              La plupart des équipes que j&apos;accompagne traitent cette objection par défaut. Elles baissent le prix, elles attendent, elles relancent dans trois mois. Et elles perdent des dossiers qui étaient signables. Le diagnostic commercial offert vous donne une photographie nette de là où votre équipe perd des ventes sur ce type d&apos;objection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 bg-mint-green text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic offert
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
              >
                Découvrir le Bootcamp
              </Link>
            </div>
          </div>

          {/* Conclusion */}
          <h2 id="conclusion" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le budget n&apos;est jamais gelé pour ce qui compte vraiment
          </h2>
          <p className="mb-8">
            J&apos;ai vu des PME en redressement judiciaire trouver le budget pour un outil qui leur sauvait la mise. J&apos;ai vu des directions financières intraitables signer en une semaine quand le dossier était bancable. J&apos;ai vu des dirigeants prêts à investir sur place quand ils comprenaient ce que coûtaient trois mois de plus sans décision.
          </p>
          <p className="mb-8">
            « Budget gelé » est presque toujours une question de justification, pas de moyens. Le client n&apos;a pas un problème d&apos;argent. Il a un problème d&apos;argument. Et c&apos;est votre travail de le lui donner.
          </p>
          <p className="mb-8">
            Ne bradez pas. Ne forcez pas. Ne laissez pas le dossier en suspens non plus. Diagnostiquez le vrai blocage. Aidez votre client à justifier la dépense. Construisez avec lui le chemin le plus simple vers un oui. Et proposez une solution qui réduit son risque à zéro.
          </p>
          <p className="mb-8 text-lg font-semibold text-blue-ink">
            Le budget n&apos;est jamais gelé pour ce qui compte vraiment. À vous de lui montrer que ça compte.
          </p>

          {/* FAQ */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8">
              Questions fréquentes
            </h2>
            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-title font-semibold text-blue-ink mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* HubSpot Form */}
          <div className="mt-16">
            <HubSpotForm />
          </div>
        </div>
      </article>
    </main>
  );
}
