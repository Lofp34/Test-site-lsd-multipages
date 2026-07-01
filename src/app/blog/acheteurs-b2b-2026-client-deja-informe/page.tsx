import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

const articleUrl = 'https://www.laurentserre.com/blog/acheteurs-b2b-2026-client-deja-informe';
const heroImage = '/images/blog/acheteurs-b2b-2026-client-deja-informe/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/acheteurs-b2b-2026-client-deja-informe/hero.webp';

export const metadata: Metadata = {
  title: 'Acheteurs B2B 2026 : votre client arrive déjà informé en rendez-vous',
  description:
    'Le client a déjà fait 70 à 80 % de sa recherche avant de vous rencontrer. Le commercial ne doit plus pitcher : il doit aider à décider.',
  keywords: [
    'acheteurs B2B 2026',
    'client déjà informé rendez-vous commercial',
    'vente B2B client informé',
    'transformation rendez-vous commercial',
    'sensemaking vente B2B',
    'décision d\'achat B2B',
    'commercial 2026',
    'pitch commercial dépassé',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-07-01',
  },
  openGraph: {
    title: 'Acheteurs B2B 2026 : votre client arrive déjà informé en rendez-vous',
    description:
      'Le client a déjà fait 70 à 80 % de sa recherche avant de vous rencontrer. Le commercial ne doit plus pitcher : il doit aider à décider.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Acheteurs B2B 2026 : le client arrive déjà informé en rendez-vous commercial',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acheteurs B2B 2026 : votre client arrive déjà informé en rendez-vous',
    description:
      'Le client a déjà fait 70 à 80 % de sa recherche avant de vous rencontrer. Le commercial ne doit plus pitcher : il doit aider à décider.',
    images: [heroImageAbsolute],
  },
};

const faqItems = [
  {
    question: 'Comment les acheteurs B2B prennent-ils leurs décisions en 2026 ?',
    answer:
      'En 2026, un acheteur B2B réalise 70 à 80 % de sa recherche avant tout contact commercial. Il utilise l\'IA générative comme outil principal de recherche (89 % des acheteurs selon Forrester), consulte des avis, compare des concurrents et demande des retours à son réseau. Quand il arrive en rendez-vous, il a déjà une hypothèse sur ce qu\'il veut acheter. Le rendez-vous ne sert plus à découvrir l\'offre : il sert à vérifier, clarifier et décider.',
  },
  {
    question: 'Pourquoi les acheteurs B2B évitent-ils les commerciaux ?',
    answer:
      'Selon Gartner, 61 % des acheteurs B2B préfèrent une expérience sans représentant commercial. La raison principale : les commerciaux perdent leur temps à présenter des informations déjà disponibles en ligne. L\'acheteur ne veut pas qu\'on lui répète ce qu\'il a déjà lu. Il veut qu\'on l\'aide à interpréter, à trancher entre plusieurs options, à évaluer les risques réels d\'implémentation. Un commercial qui arrive avec un pitch standard ajoute du bruit, pas de la valeur.',
  },
  {
    question: 'Quel est le parcours d\'achat B2B en 2026 ?',
    answer:
      'Le parcours d\'achat B2B en 2026 commence dans le dark funnel : l\'acheteur fait ses recherches seul, via l\'IA générative, LinkedIn, la presse professionnelle et les recommandations. Il arrive au premier contact avec une pré-sélection déjà faite. La phase de découverte traditionnelle est court-circuitée. Le commercial doit passer directement à une phase de sensemaking : aider l\'acheteur à donner du sens aux informations qu\'il a déjà collectées, valider ce qui est juste, corriger ce qui ne l\'est pas.',
  },
  {
    question: 'Comment vendre à un acheteur B2B déjà informé ?',
    answer:
      'La clé est de ne pas pitcher. Préparer le rendez-vous en se demandant ce que le client a déjà pu voir, lire et comprendre. Ouvrir par une question qui montre qu\'on a fait ce travail : « Si je comprends bien, vous avez surtout regardé tel aspect. Est-ce que c\'est déjà clair chez vous ? » Vérifier ce qui est juste, corriger ce qui est dangereux, ajouter ce qui manque dans son raisonnement. Le rôle du commercial n\'est plus d\'informer : c\'est d\'aider le client à mieux décider.',
  },
  {
    question: 'Qu\'est-ce que le sensemaking en vente B2B ?',
    answer:
      'Le sensemaking, c\'est l\'art d\'aider un acheteur déjà informé à faire le tri entre ce qui compte et ce qui relève du discours commercial. Le prospect a trop d\'informations, parfois de mauvaise qualité. Il a besoin qu\'on l\'aide à passer de l\'information à une vraie décision. Le commercial utile ne récite pas un argumentaire : il met le doigt sur ce qui manque dans le raisonnement du client, il apporte une lecture que le client n\'avait pas encore. C\'est un travail de clarification, pas de persuasion.',
  },
];

export default function AcheteursB2b2026ClientDejaInformePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Le client n\'arrive plus en rendez-vous pour découvrir votre offre',
        description:
          'Le client a déjà fait 70 à 80 % de sa recherche avant de vous rencontrer. Le commercial ne doit plus pitcher : il doit aider à décider.',
        image: heroImageAbsolute,
        datePublished: '2026-07-01',
        dateModified: '2026-07-01',
        author: {
          '@type': 'Person',
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com/a-propos',
          sameAs: [
            'https://www.linkedin.com/in/laurentserre34/',
            'https://www.youtube.com/channel/UCeYXC96USUJDsZrBPoHCN1A/',
          ],
        },
        publisher: {
          '@type': 'Organization',
          name: 'Laurent Serre',
          url: 'https://www.laurentserre.com',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
        articleSection: 'Vente B2B / Comportement acheteur',
        keywords: [
          'acheteurs B2B 2026',
          'client déjà informé rendez-vous commercial',
          'sensemaking vente B2B',
          'transformation rendez-vous commercial',
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
          { '@type': 'ListItem', position: 3, name: 'Le client n\'arrive plus en rendez-vous pour découvrir votre offre', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Le client n'arrive plus en rendez-vous pour découvrir votre offre</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Vente B2B / Comportement acheteur
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Le client n&apos;arrive plus en rendez-vous pour découvrir votre offre
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
              <time dateTime="2026-07-01">1 juillet 2026</time>
              <span>•</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un dirigeant de PME assis à son bureau, smartphone et laptop ouverts, ayant déjà préparé sa recherche avant un rendez-vous commercial, regard concentré mais serein"
              width={1200}
              height={630}
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
              Ce qu'il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              En 2026, un acheteur B2B réalise 70 à 80 % de sa recherche avant tout contact commercial. 
              Le rendez-vous ne sert plus à découvrir l'offre : il sert à vérifier, clarifier et décider. 
              Le commercial qui continue à pitcher ajoute du bruit. Celui qui prépare le rendez-vous en partant de ce que le client sait déjà devient un interlocuteur utile.
            </p>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vos rendez-vous commerciaux sont-ils encore des séances d'information ? Diagnostic offert
            </Link>
          </div>

          <p className="mb-8">
            Il y a des rendez-vous qui se perdent dans les dix premières minutes.
          </p>

          <p className="mb-8">
            Pas parce que le commercial parle mal. Pas parce que la plaquette est mauvaise. Pas parce que le prospect n'est pas intéressé.
          </p>

          <p className="mb-8">
            Ils se perdent parce que le commercial vient présenter ce que le client a déjà compris tout seul.
          </p>

          <p className="mb-8">
            Le client a regardé le site. Il a lu deux articles. Il a comparé trois concurrents. Il a demandé un avis à quelqu'un de son réseau. Il s'est peut-être déjà fait une opinion assez précise sur ce qu'il veut acheter, sur ce qu'il craint, et sur ce qu'il ne veut surtout pas revivre.
          </p>

          <p className="mb-8">
            Et le commercial démarre comme si tout commençait à zéro.
          </p>

          <p className="mb-8">
            Présentation de l'entreprise. Quelques références. Une explication de l'offre. Deux questions de contexte. Une proposition de prochain rendez-vous.
          </p>

          <p className="mb-8">
            En face, le client reste poli. Mais intérieurement, il se dit souvent : je savais déjà tout ça avant qu'on se parle.
          </p>

          <p className="mb-8">
            C'est là que beaucoup de ventes se fragilisent aujourd'hui.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le client n'arrive plus vide
          </h2>

          <p className="mb-8">
            Le rôle du commercial n'est plus seulement d'informer. Le client a déjà beaucoup d'information. Parfois trop. Parfois de mauvaise qualité. Mais il n'arrive plus vide.
          </p>

          <p className="mb-8">
            Il arrive avec une hypothèse. Il veut vérifier si l'entreprise en face comprend vraiment sa situation. Il veut voir si le commercial sait faire le tri entre ce qui compte et ce qui n'est que du discours. Il veut sentir si la solution correspond à son problème réel, pas seulement à une catégorie d'offre.
          </p>

          <p className="mb-8">
            C'est une différence énorme.
          </p>

          <p className="mb-8">
            Un commercial qui continue à dérouler son pitch croit rassurer. En réalité, il ajoute du bruit.
          </p>

          <p className="mb-8">
            Un commercial utile fait autre chose. Il part de ce que le client semble déjà avoir compris. Il vérifie ce qui est juste. Il corrige ce qui est dangereux. Il met le doigt sur ce qui manque dans le raisonnement.
          </p>

          <p className="mb-8">
            Pas avec une posture de donneur de leçon. Avec une vraie préparation.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Le réflexe qui change un rendez-vous
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp Méthodes de vente entraîne vos commerciaux à préparer chaque rendez-vous en partant de ce que le client sait déjà. Découverte, sensemaking, aide à la décision. Vos équipes repartent avec des réflexes qui changent leur impact commercial.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Découvrir le Bootcamp Méthodes de vente
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le virage du sensemaking
          </h2>

          <p className="mb-8">
            Concrètement, qu'est-ce qui change dans le déroulé d'un rendez-vous ?
          </p>

          <p className="mb-8">
            Au lieu de dire l'ouverture standard, le commercial préparé peut dire : « Si je comprends bien, vous avez surtout regardé la partie outil. Mais dans les projets que je vois, ce qui bloque rarement, c'est l'outil. C'est plutôt la façon dont l'équipe va l'utiliser au quotidien. Est-ce que c'est déjà clair chez vous ? »
          </p>

          <p className="mb-8">
            Là, le rendez-vous change de nature. On ne présente plus. On aide le client à mieux décider.
          </p>

          <p className="mb-8">
            Et c'est souvent ce que l'acheteur attend sans toujours le formuler. Il n'a pas besoin qu'on lui répète les informations disponibles en ligne. Il a besoin qu'on l'aide à comprendre ce qu'elles veulent dire pour lui.
          </p>

          <p className="mb-8">
            C'est ce qu'on appelle le <strong>sensemaking</strong> : donner du sens aux informations que le client a déjà collectées. Valider ce qui est juste. Corriger ce qui peut l'égarer. Ajouter une perspective qu'il n'avait pas.
          </p>

          <p className="mb-8">
            La difficulté, c'est que cela demande plus de courage commercial.
          </p>

          <p className="mb-8">
            Il faut accepter de ne pas tout dérouler. Il faut poser une question plus précise. Il faut parfois dire au client que son analyse est incomplète. Il faut aussi savoir reconnaître quand il a déjà fait une partie du travail.
          </p>

          <p className="mb-8">
            Beaucoup de commerciaux ont peur de perdre la main s'ils ne présentent pas tout. C'est souvent l'inverse.
          </p>

          <p className="mb-8">
            Ils perdent la main quand ils prennent du temps sur ce que le client sait déjà. Ils la reprennent quand ils apportent une lecture que le client n'avait pas encore.
          </p>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-8 text-gray-700">
            <p className="mb-0">
              <strong>Quelques repères terrain :</strong> Selon une étude Forrester, 89 % des acheteurs B2B utilisent l'IA générative comme outil principal de recherche. Gartner rapporte que 61 % des acheteurs préfèrent une expérience sans représentant commercial. Sur Reddit, les communautés r/sales observent que les acheteurs complètent plus de 70 % de leur recherche seuls avant tout contact. Le signal est clair : le commercial qui informe n'a plus sa place. Celui qui aide à décider, si.
            </p>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que le commercial doit changer
          </h2>

          <p className="mb-8">
            Si vous managez une équipe commerciale, posez-vous ces questions rapidement :
          </p>

          <p className="mb-8">
            Vos commerciaux préparent-ils leurs rendez-vous en cherchant ce que le client a déjà pu voir, lire et comprendre avant d'arriver ?
          </p>

          <p className="mb-8">
            Ouvrent-ils par des questions qui montrent qu'ils ont fait ce travail, ou par un pitch standard ?
          </p>

          <p className="mb-8">
            Savent-ils passer du rôle d'informateur au rôle d'aide à la décision quand le client a déjà tout vu en ligne ?
          </p>

          <p className="mb-8">
            Si la réponse est non sur au moins un de ces points, le rendez-vous commence déjà en retard.
          </p>

          <p className="mb-8">
            Et c'est compréhensible : on a formé des générations de commerciaux à maîtriser leur pitch, à connaître leur offre, à la dérouler avec conviction. Personne ne leur a appris à faire le tri dans ce que le client sait déjà.
          </p>

          <p className="mb-8">
            Mais en 2026, un commercial qui ne s'adapte pas à ce nouveau comportement d'achat perd des ventes sans comprendre pourquoi. Le prospect continue son chemin. Poliment. Mais sans lui.
          </p>

          <p className="mb-8">
            C'est aussi ce que j'explore dans l'article sur le{' '}
            <Link href="/blog/commercial-en-2026-competences-qui-feront-difference" className="text-mint-green hover:underline">
              commercial en 2026 et les compétences qui feront la différence
            </Link>
            , ou dans celui sur la{' '}
            <Link href="/blog/psychologie-acheteur-b2b-decision-defendable" className="text-mint-green hover:underline">
              psychologie de l'acheteur B2B
            </Link>
            . Les acheteurs ne veulent plus de commerciaux qui informent. Ils veulent des interlocuteurs qui les aident à décider.
          </p>

          <p className="mb-8">
            Et c'est exactement ce que montre l'évolution des{' '}
            <Link href="/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux" className="text-mint-green hover:underline">
              acheteurs B2B qui ne veulent plus parler aux commerciaux
            </Link>
            . Le refus n'est pas un caprice. C'est une rationalisation du temps.
          </p>

          <p className="text-lg font-semibold text-blue-ink mt-8 mb-8">
            Un acheteur B2B en 2026 ne cherche pas forcément un commercial plus brillant. Il cherche un interlocuteur qui ne lui fasse pas perdre de temps.
          </p>

          {/* CTA FORT */}
          <div className="bg-gradient-to-br from-blue-ink to-blue-700 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vos commerciaux vendent encore en mode découverte ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic commercial identifie les décalages entre votre approche commerciale et le vrai comportement des acheteurs en 2026. Vos rendez-vous sont-ils encore des séances d'information, ou aident-ils vraiment vos clients à décider ?
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

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux" className="text-mint-green hover:underline">
                  Acheteurs B2B : pourquoi ils ne veulent plus parler aux commerciaux
                </Link>
              </li>
              <li>
                <Link href="/blog/commercial-en-2026-competences-qui-feront-difference" className="text-mint-green hover:underline">
                  Le commercial en 2026 : les compétences qui feront la différence
                </Link>
              </li>
              <li>
                <Link href="/blog/psychologie-acheteur-b2b-decision-defendable" className="text-mint-green hover:underline">
                  Psychologie de l'acheteur B2B : une décision défendable plutôt qu'une bonne affaire
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8" id="faq">
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

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-mint-green hover:underline text-sm">
              Retour au blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
