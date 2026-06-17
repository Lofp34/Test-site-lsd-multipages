import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const articleUrl = 'https://www.laurentserre.com/blog/gap-selling-methode-b2b';
const heroImage = 'https://www.laurentserre.com/images/blog/2026-06-13-gap-selling-hero.webp';

export const metadata: Metadata = {
  title: 'Gap Selling : la méthode B2B qui a changé ma façon de vendre | Laurent Serre',
  description:
    `Qu'est-ce que le Gap Selling ? Une méthode de vente B2B qui aide le client à mesurer l'écart entre sa situation actuelle et le résultat qu'il veut atteindre.`,
  keywords:
    'gap selling, méthode gap selling, gap selling Keenan, challenger sale, challenger sales France, vente B2B méthode',
  alternates: {
    canonical: articleUrl,
  },
  openGraph: {
    title: 'Gap Selling : la méthode B2B qui a changé ma façon de vendre',
    description:
      `Une méthode de vente B2B racontée depuis le terrain : peur de bousculer le client, difficulté à creuser le vrai problème, quantification de l'inaction.`,
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 1024,
        alt: `Laurent Serre accompagne un commercial B2B devant un tableau qui montre l'écart entre la situation actuelle du client et le résultat visé`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gap Selling : la méthode B2B qui a changé ma façon de vendre',
    description:
      `Le client n'achète pas une solution. Il achète la réduction d'un écart qu'il a enfin compris et mesuré.`,
    images: [heroImage],
  },
};

const carouselPrefix = '/images/blog/carrousel-gap-selling-webp';

const carouselImages = [
  { src: `${carouselPrefix}/01-cover.webp`, alt: 'Cover : Gap Selling sur le terrain', index: 0 },
  { src: `${carouselPrefix}/02-piege-prix.webp`, alt: 'Le piège : baisser le prix trop tôt', index: 1 },
  { src: `${carouselPrefix}/03-fosse.webp`, alt: `Le client achète la réduction d'un écart`, index: 2 },
  { src: `${carouselPrefix}/04-decouverte.webp`, alt: 'Découverte : creuser le vrai problème', index: 3 },
  { src: `${carouselPrefix}/05-quantification.webp`, alt: `Quantification : mesurer le coût de l'inaction`, index: 4 },
  { src: `${carouselPrefix}/06-amplification.webp`, alt: 'Amplification : faire apparaître les conséquences', index: 5 },
  { src: `${carouselPrefix}/07-alignement.webp`, alt: 'Alignement : relier la solution au problème mesuré', index: 6 },
  { src: `${carouselPrefix}/08-erreur-pitcher-tot.webp`, alt: 'Erreur : présenter la solution trop tôt', index: 7 },
  { src: `${carouselPrefix}/09-erreur-non-quantifier.webp`, alt: 'Erreur : ne pas chiffrer le problème', index: 8 },
  { src: `${carouselPrefix}/10-closing.webp`, alt: 'Conclusion : poser trois questions de plus', index: 9 },
];

const faqItems = [
  {
    question: `Qu'est-ce que le Gap Selling ?`,
    answer:
      `Le Gap Selling est une méthode de vente B2B popularisée par Keenan. Elle consiste à aider le client à mesurer l'écart entre sa situation actuelle, souvent inconfortable mais supportée depuis longtemps, et la situation future qu'il veut vraiment atteindre. La vente avance quand cet écart devient concret, chiffré et prioritaire pour le client.`,
  },
  {
    question: 'Quelle est la différence entre Gap Selling et Challenger Sale ?',
    answer:
      `Gap Selling part du problème du client et cherche à mesurer le fossé entre aujourd'hui et le résultat attendu. Challenger Sale met davantage l'accent sur la capacité du commercial à apporter une lecture nouvelle, à bousculer positivement son interlocuteur et à créer une tension utile. Les deux approches peuvent se compléter : Gap Selling structure le diagnostic, Challenger Sale aide à faire bouger une conviction trop installée.`,
  },
  {
    question: 'Comment appliquer Gap Selling en entretien commercial ?',
    answer:
      `En entretien, il faut ralentir avant de proposer. Commencez par comprendre la situation actuelle, puis creusez les conséquences concrètes : pertes de chiffre, temps perdu, décisions reportées, tension dans l'équipe, clients qui partent. Ensuite seulement, faites préciser la situation souhaitée et mesurez l'écart. La proposition doit arriver après ce travail, pas avant.`,
  },
  {
    question: `Qu'est-ce que la méthode Challenger en vente B2B ?`,
    answer:
      `La méthode Challenger en vente B2B repose sur une idée simple : le commercial ne se contente pas de répondre à une demande, il aide le client à regarder son problème autrement. Il apporte un point de vue, crée une tension constructive et garde la main sans forcer. Dans une PME, cela demande du tact : bousculer l'analyse, pas la personne.`,
  },
  {
    question: 'Gap Selling ou SPIN Selling : quelle méthode choisir ?',
    answer:
      `SPIN Selling est très utile pour structurer les questions : situation, problème, implication, besoin de solution. Gap Selling est plus fort pour faire mesurer l'écart et le coût de l'inaction. Dans la pratique, je ne les oppose pas. SPIN aide à conduire l'entretien, Gap Selling aide à transformer les réponses en décision commerciale.`,
  },
];

export default function GapSellingMethodeB2bPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Gap Selling : la méthode B2B qui a changé ma façon de vendre',
        description:
          `Une méthode de vente B2B racontée depuis le terrain : peur de bousculer le client, difficulté à creuser le vrai problème, quantification de l'inaction.`,
        image: heroImage,
        datePublished: '2026-06-13',
        dateModified: '2026-06-13',
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
        articleSection: 'Méthode de vente B2B',
        keywords: ['gap selling', 'méthode gap selling', 'gap selling Keenan', 'challenger sale', 'vente B2B méthode'],
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
          { '@type': 'ListItem', position: 3, name: 'Gap Selling : la méthode B2B', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Gap Selling</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Méthode de vente B2B
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Gap Selling : la méthode B2B qui a changé ma façon de vendre
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
              <time dateTime="2026-06-13">13 juin 2026</time>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src="/images/blog/2026-06-13-gap-selling-hero.webp"
              alt="Laurent Serre accompagne un commercial B2B devant un tableau qui montre l'écart entre la situation actuelle du client et le résultat visé"
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

          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              Ce qu'il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le Gap Selling aide le client à mesurer l'écart entre sa situation actuelle et le résultat visé. Le commercial creuse d'abord le problème, chiffre l'inaction, puis propose seulement sa solution.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Les 10 planches Gap Selling
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L'histoire d'un commercial qui croit devoir baisser son prix, puis découvre que le vrai sujet n'était pas le prix.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Gap Selling sur le terrain"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-gap-selling-methode-b2b.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (10 planches)
              </Link>
            </div>
          </div>

          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vos équipes creusent-elles vraiment le problème ? Diagnostic commercial
            </Link>
          </div>

          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#definition" className="text-mint-green hover:underline">Qu'est-ce que le Gap Selling ?</a></li>
              <li><a href="#scene" className="text-mint-green hover:underline">La scène qui m'a fait changer ma façon de vendre</a></li>
              <li><a href="#entretien" className="text-mint-green hover:underline">Comment appliquer Gap Selling en entretien commercial</a></li>
              <li><a href="#erreurs" className="text-mint-green hover:underline">Les erreurs qui font échouer la méthode</a></li>
              <li><a href="#methodes" className="text-mint-green hover:underline">Gap Selling, Challenger Sale ou SPIN Selling ?</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">Questions fréquentes</a></li>
            </ul>
          </div>

          <h2 id="definition" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Qu'est-ce que le Gap Selling ?
          </h2>

          <p className="mb-8 text-xl text-gray-600 leading-relaxed">
            Le Gap Selling est une méthode de vente B2B popularisée par Keenan. Elle consiste à aider le client à mesurer l'écart entre sa situation actuelle, celle qu'il supporte parfois depuis trop longtemps, et la situation future qu'il veut vraiment atteindre. La vente avance quand cet écart devient concret, chiffré et prioritaire.
          </p>

          <p className="mb-8">
            Dit plus simplement : le client n'achète pas votre solution. Il achète la réduction d'un fossé. Tant que ce fossé reste flou, votre proposition ressemble à une dépense. Quand le fossé devient visible, votre proposition devient une décision logique.
          </p>

          <h2 id="scene" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La scène qui m'a fait changer ma façon de vendre
          </h2>

          <p className="mb-8">
            Le commercial arrive avec son dossier sous le bras. Appelons-le Stéphane. Bon commercial, pas débutant, pas timide. Il connaît son offre, il connaît son marché, il a travaillé sa proposition. Et pourtant, il sent que le rendez-vous client lui échappe.
          </p>

          <p className="mb-8">
            Le client lui a dit trois phrases que j'entends souvent : « C'est intéressant », « il faut que je regarde avec mon associé », « vous pouvez nous refaire une proposition un peu plus serrée ? » Stéphane traduit tout de suite : problème de prix. Il veut baisser un peu, ajouter deux options, rendre la proposition plus acceptable.
          </p>

          <p className="mb-8">
            Je lui demande simplement : « Qu'est-ce que le client perd vraiment s'il ne fait rien ? » Silence. Puis il me répond : « Il perd du temps. » Je lui demande combien. Nouveau silence. Il n'avait pas creusé. Il avait entendu un besoin, mais il n'avait pas mesuré le coût du problème.
          </p>

          <p className="mb-8">
            C'est là que Gap Selling devient utile. Pas comme une méthode américaine à réciter. Comme un rappel assez brutal : si le client ne voit pas clairement ce qu'il perd aujourd'hui et ce qu'il peut gagner demain, il négocie votre prix parce que c'est la seule chose concrète sur la table.
          </p>

          <div className="bg-blue-ink/10 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>
                Beaucoup de ventes ne sont pas perdues à cause du prix. Elles sont perdues parce que le problème n'a pas été assez bien creusé.
              </strong>
            </p>
          </div>

          <h2 id="entretien" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Comment appliquer Gap Selling en entretien commercial
          </h2>

          <p className="mb-8">
            La première discipline, c'est de ralentir. Le réflexe naturel d'un commercial est de reconnaître un besoin, puis de présenter l'offre qui correspond. C'est humain : on veut montrer qu'on a compris. Mais dans beaucoup de ventes B2B, c'est trop tôt.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            1. Faire préciser la situation actuelle
          </h3>

          <p className="mb-8">
            Le client arrive rarement avec le vrai problème formulé. Il arrive avec un symptôme : les ventes stagnent, les commerciaux ne relancent pas, les devis traînent, les recrutements commerciaux ne tiennent pas, les démos ne débouchent pas. Il faut rester là, dans le concret.
          </p>

          <p className="mb-8">
            Dans une PME industrielle, un dirigeant m'a dit qu'il voulait améliorer sa performance commerciale. Formule propre, mais trop large. En creusant, le vrai sujet était ailleurs : son meilleur commercial partait dans six mois, personne ne pouvait reprendre ses comptes, et deux clients importants risquaient de partir avec lui. Ce n'était pas un sujet de motivation. C'était un risque de chiffre d'affaires.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            2. Chiffrer ce que coûte l'inaction
          </h3>

          <p className="mb-8">
            Sans chiffre, le problème reste une impression. Avec un chiffre, il devient difficile à ignorer. Combien d'heures perdues par semaine ? Combien de devis qui n'avancent pas ? Combien de clients qui reportent leur décision ? Combien de marge sacrifiée pour sauver des ventes mal construites ?
          </p>

          <p className="mb-8">
            Dans le dossier de Stéphane, le problème n'était pas une remise de 5 %. Le client perdait environ douze heures par semaine à ressaisir des commandes et à corriger des erreurs internes. Sur un an, avec les retards, les avoirs et le temps manager, on dépassait largement le montant qu'il voulait négocier.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            3. Faire nommer la situation souhaitée
          </h3>

          <p className="mb-8">
            La situation future ne doit pas être un slogan. « Gagner en efficacité » ne suffit pas. Le client doit pouvoir dire ce qui aura changé dans son quotidien : moins de ressaisie, une réponse devis en 48 heures, un dirigeant qui ne repasse plus derrière chaque proposition, un commercial qui sait pourquoi le client doit décider maintenant.
          </p>

          <p className="mb-8">
            Quand le client décrit lui-même ce futur plus clairement, la vente change de nature. Vous ne poussez plus une offre. Vous vérifiez avec lui si ce que vous proposez réduit vraiment l'écart qu'il vient de formuler.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            4. Relier la solution au fossé mesuré
          </h3>

          <p className="mb-8">
            C'est seulement à ce moment-là que la proposition doit arriver. Pas avec toute la plaquette. Pas avec les dix fonctionnalités. Avec un lien clair entre le problème mesuré et ce que votre solution change concrètement.
          </p>

          <p className="mb-8">
            La question n'est plus : « Est-ce que vous aimez notre solution ? » La question devient : « Est-ce que cette solution réduit assez fortement l'écart que vous venez de mesurer ? » Ce n'est pas la même conversation.
          </p>

          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Pour travailler cette discipline avec vos équipes
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente travaille précisément cette bascule : passer d'une découverte polie à un diagnostic commercial qui aide le client à décider.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          <h2 id="erreurs" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les erreurs qui font échouer la méthode
          </h2>

          <p className="mb-8">
            J'ai vu des équipes adopter Gap Selling avec enthousiasme, puis revenir trois mois plus tard avec une phrase classique : « ça ne marche pas chez nous ». En général, la méthode n'est pas le sujet. C'est l'application qui dérape.
          </p>

          <p className="mb-4">
            <strong>Première erreur : faire semblant de creuser.</strong> Le commercial pose trois questions, prend des notes, puis sort la même proposition qu'avant. Le client sent très vite que la découverte n'a servi qu'à habiller un discours déjà prêt.
          </p>

          <p className="mb-4">
            <strong>Deuxième erreur : ne pas chiffrer.</strong> « On perd du temps » ne déclenche pas une décision. « On perd douze heures par semaine et deux jours de délai sur chaque commande » commence à créer une vraie discussion.
          </p>

          <p className="mb-4">
            <strong>Troisième erreur : confondre exigence et brutalité.</strong> Gap Selling demande parfois de bousculer positivement son interlocuteur. Pas de le mettre en défaut. Si le client se sent jugé, il se ferme. Si le client se sent aidé à voir plus clair, il avance.
          </p>

          <p className="mb-4">
            <strong>Quatrième erreur : oublier qui décide vraiment.</strong> Vous pouvez mesurer un fossé très clair avec une personne qui n'a pas la main sur la décision. C'est utile, mais incomplet. À un moment, il faut que celui qui tranche entende le problème, le chiffre et le risque.
          </p>

          <p className="mb-8">
            <strong>Cinquième erreur : présenter la solution trop tôt.</strong> C'est la plus fréquente. Le commercial a peur du silence, peur de pousser trop loin, peur de perdre la sympathie du client. Alors il revient à ce qu'il maîtrise : son offre. Et la vente redevient fragile.
          </p>

          <h2 id="methodes" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Gap Selling, Challenger Sale ou SPIN Selling ?
          </h2>

          <p className="mb-8">
            Je ne suis pas attaché aux méthodes pour elles-mêmes. Ce qui m'intéresse, c'est ce qu'elles changent dans un vrai rendez-vous. Gap Selling m'a surtout appris à ne plus confondre besoin exprimé et problème mesuré.
          </p>

          <p className="mb-8">
            SPIN Selling est très utile pour structurer les questions. Situation, problème, implication, besoin de solution : la trame aide un commercial à ne pas rester en surface. Mais elle ne suffit pas toujours à faire sentir l'écart économique et humain.
          </p>

          <p className="mb-8">
            Challenger Sale apporte autre chose : la capacité à apporter une lecture qui dérange un peu, mais qui aide le client. Dans une PME française, je préfère parler de bousculer positivement son interlocuteur. C'est plus juste. On ne cherche pas la confrontation. On cherche le déclic.
          </p>

          <p className="mb-8">
            Dans la pratique, les trois peuvent se combiner. SPIN pour tenir l'entretien. Gap Selling pour mesurer le fossé. Challenger Sale pour oser nommer ce que le client n'a pas encore envie de regarder. La méthode n'a de valeur que si elle rend la conversation plus vraie.
          </p>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vos commerciaux vendent-ils une solution ou un fossé clairement mesuré ?
            </h3>
            <p className="mb-6">
              Dans beaucoup d'équipes, le vrai frein n'est pas la connaissance produit. C'est la qualité du diagnostic : problème trop vite accepté, conséquences pas assez chiffrées, décideur mal identifié, proposition partie trop tôt. Un diagnostic commercial permet de voir où la vente se fragilise vraiment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic commercial
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
              >
                Découvrir le Bootcamp Méthodes de vente
              </Link>
            </div>
          </div>

          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Questions fréquentes
          </h2>

          <div className="space-y-6 mt-6 mb-10">
            {faqItems.map((item) => (
              <div key={item.question}>
                <p className="font-bold text-blue-ink mb-1">
                  {item.question}
                </p>
                <p className="text-gray-700">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link
                  href="/ressources/meilleurs-livres/methodes-process/gap-selling"
                  className="text-mint-green hover:underline font-medium"
                >
                  Gap Selling : la fiche livre complète
                </Link>
                <span className="text-gray-500">
                  {' '}: Pour retrouver la méthode de Keenan et ses points clés.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/challenger-sales-methode-terrain-b2b"
                  className="text-mint-green hover:underline font-medium"
                >
                  Challenger Sales appliqué au terrain B2B
                </Link>
                <span className="text-gray-500">
                  {' '}: Pour travailler la tension constructive sans agressivité.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/dilemme-innovateur-vente-b2b"
                  className="text-mint-green hover:underline font-medium"
                >
                  Le dilemme de l&apos;innovateur en vente B2B
                </Link>
                <span className="text-gray-500">
                  {' '}: Pour comprendre pourquoi une méthode qui fonctionnait hier peut devenir un frein demain.
                </span>
              </li>
              <li>
                <Link
                  href="/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre"
                  className="text-mint-green hover:underline font-medium"
                >
                  Vente consultative B2B : devenir le conseiller qu'on ne veut pas perdre
                </Link>
                <span className="text-gray-500">
                  {' '}: Pour renforcer la posture de diagnosticien.
                </span>
              </li>
            </ul>
          </div>

          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            Quand le client négocie trop vite, posez trois questions de plus. Le vrai fossé est souvent juste derrière le prix.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <AuthorCard />
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d'en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre cas mérite un échange plus direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>

      <section className="py-8 bg-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors font-medium"
          >
            ← Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
