import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const heroImage = '/images/blog/closing-b2b-2026/closing-b2b-2026-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/closing-b2b-2026/closing-b2b-2026-hero.webp';

export const metadata: Metadata = {
  title: 'Closing B2B en 2026 : les techniques ne marchent plus. Voici ce qui marche. | Laurent Serre',
  description:
    'Le closing a changé. Les techniques manipulatrices (alternative close, urgence factice) ne fonctionnent plus face à des acheteurs hyper-informés. Laurent Serre partage son expérience terrain : ce qui fait vraiment signer en 2026.',
  keywords:
    'closing B2B 2026, techniques de closing 2026, comment faire du closing, closing commercial B2B, closing vente B2B, clôturer une vente B2B, acheteurs informés closing, closing terrain',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/closing-b2b-2026',
  },
  openGraph: {
    title: 'Closing B2B en 2026 : les techniques ne marchent plus. Voici ce qui marche.',
    description:
      'Le closing a changé. Les vieilles techniques ne fonctionnent plus face à des acheteurs qui ont déjà tout vu. Découvrez ce qui marche vraiment sur le terrain en 2026.',
    url: 'https://www.laurentserre.com/blog/closing-b2b-2026',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Closing B2B 2026 - nouvelles approches terrain Laurent Serre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Closing B2B en 2026 : les techniques ne marchent plus. Voici ce qui marche.',
    description:
      'Les techniques de closing classiques s effondrent face aux acheteurs de 2026. Ce qui marche vraiment sur le terrain, avec des exemples chiffrés.',
    images: [heroImageAbsolute],
  },
};

export default function ClosingB2B2026Page() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Closing B2B en 2026 : les techniques ne marchent plus. Voici ce qui marche.',
    description:
      'Le closing a radicalement changé. Les techniques agressives ne fonctionnent plus face à des acheteurs B2B hyper-informés. Laurent Serre partage son expérience de terrain : ce qui marche vraiment en 2026.',
    image: heroImageAbsolute,
    datePublished: '2026-06-05',
    dateModified: '2026-06-05',
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
      '@id': 'https://www.laurentserre.com/blog/closing-b2b-2026',
    },
    articleSection: 'Closing B2B / Techniques de vente',
    keywords: [
      'closing B2B',
      'techniques de closing',
      'closing commercial',
      'vente B2B',
      'nouvelles approches closing',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qu\'est-ce que le closing B2B en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le closing B2B en 2026 n\'est plus un ensemble de techniques de conclusion mais une démarche de validation progressive tout au long du cycle de vente. L\'acheteur étant déjà informé à 70%, le closing n\'est plus une "fermeture" mais une confirmation de la valeur construite ensemble.'
        }
      },
      {
        '@type': 'Question',
        name: 'Pourquoi les techniques de closing classiques ne marchent plus ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les acheteurs B2B ont vu toutes les techniques des centaines de fois. La fausse urgence, l\'alternative close, la pénurie factice : ils les repèrent en quelques secondes et ça les agace. Ces techniques reposaient sur un déséquilibre d\'information qui n\'existe plus. L\'acheteur sait tout avant même de vous parler.'
        }
      },
      {
        '@type': 'Question',
        name: 'Comment faire du closing sans être agressif ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En arrêtant de "faire du closing" justement. Le closing n\'est pas un moment séparé. C\'est une validation continue. Si vous avez construit la valeur tout au long du cycle, la signature n\'est qu\'une étape administrative. Le travail n\'est pas de convaincre à la fin mais de faire émerger la conviction pendant tout le processus.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quelles sont les techniques de closing qui marchent en B2B en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ce qui marche : poser les conditions de signature dès le début, faire valider à chaque étape, construire une conséquence mesurable de l\'inaction, impliquer le vrai décideur avant la proposition, savoir ralentir au lieu d\'accélérer quand le doute apparaît. Aucune de ces approches n\'est une "technique" au sens classique. Ce sont des disciplines de pilotage.'
        }
      },
      {
        '@type': 'Question',
        name: 'Comment gérer l\'objection prix en closing en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En 2026, l\'objection prix n\'est presque jamais la vraie raison. L\'acheteur informé compare, mais il compare moins un prix qu\'une incertitude. La question n\'est pas "est-ce que c\'est trop cher" mais "est-ce que je suis sûr du résultat". Le closing qui marche traite cette incertitude, pas le prix.'
        }
      },
      {
        '@type': 'Question',
        name: 'Le closing en face à face est-il plus efficace qu\'à distance en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pour les deals importants, oui. Les données terrain montrent que le closing en face à face reste le plus efficace pour les décisions à fort enjeu. Mais ce n\'est pas la présence physique qui fait la différence, c\'est la qualité de la préparation. Un closing à distance bien préparé bat un closing en présentiel improvisé.'
        }
      }
    ]
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Les techniques de closing ne marchent plus', 'item': 'https://www.laurentserre.com/blog/closing-b2b-2026' },
    ],
  };


  return (
    <main className="bg-primary-bg text-gray-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />


      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">
                Closing B2B / Techniques de vente
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Les techniques de closing ne marchent plus. Voici ce qui marche en 2026.
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
              <time dateTime="2026-06-05">5 juin 2026</time>
              <span>•</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Closing B2B 2026 : nouvelles approches terrain"
              width={1536}
              height={1024}
              className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
              quality={60}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          {/* AuthorCard */}
          <div className="not-prose mb-8">
            <AuthorCard />
          </div>

          {/* BDCarousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Stéphane face au closing 2026
            </p>
            <p className="text-sm text-amber-700 mb-5">
              De la technique qui échoue au diagnostic qui fait signer : 14 planches qui suivent Stéphane dans sa transformation du closing. Du piège des vieilles méthodes à la redécouverte de ce qui fait vraiment avancer une vente.
            </p>
            <BDCarousel
              images={[
                { src: '/images/blog/closing-b2b-2026/bd-slide-01-cover.webp', alt: 'Cover - Closing 2026', index: 0 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-02-constat.webp', alt: 'Constat - Les techniques ne marchent plus', index: 1 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-03-piege-urgence.webp', alt: 'Piège - L urgence factice', index: 2 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-04-acheteur-informe.webp', alt: 'Acheteur hyper informé', index: 3 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-05-declic.webp', alt: 'Déclic - Changer d approche', index: 4 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-06-conditions-avant.webp', alt: 'Poser les conditions avant', index: 5 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-07-validation-etape.webp', alt: 'Valider à chaque étape', index: 6 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-08-consequence-inaction.webp', alt: 'Conséquence de l inaction', index: 7 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-09-vrai-decideur.webp', alt: 'Le vrai décideur', index: 8 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-10-ralentir.webp', alt: 'Savoir ralentir', index: 9 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-11-valeur-construite.webp', alt: 'La valeur construite ensemble', index: 10 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-12-signature.webp', alt: 'La signature arrive', index: 11 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-13-lecon.webp', alt: 'Leçon - Le closing n est pas une technique', index: 12 },
                { src: '/images/blog/closing-b2b-2026/bd-slide-14-cta.webp', alt: 'CTA - Diagnostic offert', index: 13 },
              ]}
              title="Stéphane face au closing 2026"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-closing-b2b-2026.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (14 planches)
              </Link>
            </div>
          </div>

          {/* TL;DR */}
          <div className="bg-gradient-to-r from-amber-50 via-amber-50/80 to-transparent border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
            <p className="text-lg font-semibold text-amber-800 mb-2">Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Les techniques de closing apprises il y a cinq ans vous font aujourd&rsquo;hui perdre des ventes. Les acheteurs les repèrent, les détestent, et elles créent exactement l&rsquo;inverse de ce qu&rsquo;elles devaient produire. En 2026, le closing n&rsquo;est plus un moment. C&rsquo;est une discipline de pilotage qui commence au premier rendez-vous.
            </p>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            J&rsquo;ai formé des centaines de commerciaux au closing. Et je dois vous dire une chose qui m&rsquo;a pris du temps à admettre : une grande partie de ce qu&rsquo;on m&rsquo;a appris est devenu inutile, parfois même nuisible.
          </p>

          <h2 id="la-scene-que-je-vois" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            La scène que je vois trop souvent
          </h2>

          <p className="mb-4">
            Un commercial arrive à son dernier rendez-vous avec un prospect qui a vu trois concurrents. Il sort sa technique : alternative close, urgence calendaire, bonus de signature. Le prospect le regarde, sourit poliment, et dit qu&rsquo;il va réfléchir.
          </p>

          <p className="mb-4">
            Le commercial repart en pensant que sa technique n&rsquo;était pas assez bien exécutée. Il va s&rsquo;entraîner dessus, la répéter, la perfectionner. Et il continuera à perdre.
          </p>

          <p className="mb-8">
            Le problème n&rsquo;est pas l&rsquo;exécution. Le problème est la technique elle-même.
          </p>

          <h2 id="pourquoi-ca-ne-marche-plus" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Pourquoi ça ne marche plus
          </h2>

          <p className="mb-4">
            Les techniques de closing classiques reposent sur un postulat : l&rsquo;acheteur ne sait pas tout, et le commercial utilise ce déséquilibre pour créer une pression qui déclenche la décision.
          </p>

          <p className="mb-4">
            L&rsquo;alternative close : &laquo; préférez-vous livraison en septembre ou en octobre ? &raquo; L&rsquo;urgence : &laquo; les prix augmentent la semaine prochaine &raquo;. La pénurie : &laquo; il ne reste que deux places &raquo;.
          </p>

          <p className="mb-4">
            Ces techniques ont marché quand l&rsquo;information était rare. Aujourd&rsquo;hui, l&rsquo;acheteur sait tout avant de vous parler. Il a lu vos fiches produits, comparé vos tarifs sur LinkedIn, regardé vos vidéos, lu les avis, et parfois même parlé à vos clients.
          </p>

          <p className="mb-8">
            Quand vous sortez votre alternative close, il la reconnaît. Il lui a déjà donné un nom. Et ça l&rsquo;agace profondément. Vous êtes passé de &laquo; commercial qui maîtrise &raquo; à &laquo; commercial qui manipule &raquo; sans même avoir changé votre geste.
          </p>

          <h2 id="le-vrai-travail" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le vrai travail du closing en 2026
          </h2>

          <p className="mb-4">
            Je vais vous raconter un deal qui m&rsquo;a appris plus que toutes les formations.
          </p>

          <p className="mb-4">
            Une PME de services, vingt commerciaux, un dirigeant qui me dit en premier rendez-vous : &laquo; Laurent, je veux que vous me convainquiez. &raquo; J&rsquo;aurais pu sortir une technique à ce moment-là. J&rsquo;ai fait autre chose.
          </p>

          <p className="mb-4">
            Je lui ai dit : &laquo; Je ne vais pas vous convaincre aujourd&rsquo;hui. Je vais plutôt vous montrer ce que je regarde chez les équipes qui performent, et vous me direz si ça ressemble à ce que vous cherchez. &raquo;
          </p>

          <p className="mb-4">
            On a passé une heure à regarder son organisation ensemble. Sans pression, sans échéance, sans faux choix. À la fin, il m&rsquo;a dit : &laquo; On commence quand ? &raquo;
          </p>

          <p className="mb-8">
            Je n&rsquo;ai pas clos cette vente. Il s&rsquo;est clos tout seul.
          </p>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
            <p className="text-gray-700 leading-relaxed italic">
              &laquo; Le closing n&rsquo;est pas un moment. C&rsquo;est la conséquence naturelle d&rsquo;une valeur construite ensemble tout au long du cycle. &raquo;
            </p>
          </div>

          <h2 id="ce-qui-marche" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce qui marche vraiment sur le terrain
          </h2>

          <p className="mb-4">
            En 2026, le closing efficace repose sur cinq disciplines. Aucune n&rsquo;est une &laquo; technique &raquo; au sens classique. Ce sont des choix de pilotage.
          </p>

          <div className="space-y-6 mb-8">
            <p>
              <strong>1. Poser les conditions de la signature au premier rendez-vous.</strong> Pas pour mettre la pression, mais pour clarifier. &laquo; Si on devait avancer, comment ça se passerait pour vous ? Qui doit valider ? Quel budget ? Quel calendrier ? &raquo; Avant de commencer, pas à la fin.
            </p>
            <p>
              <strong>2. Valider à chaque étape, pas seulement à la fin.</strong> Un closing qui marche est une série de petits oui. Pas un grand oui à la fin après cent non. Chaque rendez-vous se termine par une validation explicite de l&rsquo;étape suivante.
            </p>
            <p>
              <strong>3. Construire la conséquence de l&rsquo;inaction.</strong> L&rsquo;acheteur ne signe pas parce que votre offre est bonne. Il signe parce que ne pas signer lui coûte quelque chose de concret. Un chiffre d&rsquo;affaires perdu, un problème qui s&rsquo;aggrave, une opportunité manquée. Si vous n&rsquo;avez pas construit cette conscience, vous êtes dans la comparaison d&rsquo;offres.
            </p>
            <p>
              <strong>4. Impliquer le vrai décideur avant la proposition.</strong> Si la personne qui signe n&rsquo;a pas participé au diagnostic, votre closing repose sur un intermédiaire qui va devoir revendre votre offre en interne. Vous ne maîtrisez pas votre closing dans cette configuration.
            </p>
            <p>
              <strong>5. Savoir ralentir quand le doute apparaît.</strong> Le réflexe classique : accélérer quand ça coince. Forcer, insister, recadrer. En 2026, le bon réflexe est l&rsquo;inverse. Ralentir, poser le doute, le creuser. &laquo; Je sens une hésitation. De quoi s&rsquo;agit-il exactement ? &raquo; C&rsquo;est la question la plus puissante du closing moderne.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Les techniques de closing que vous avez apprises ne sont pas devenues mauvaises. Elles sont devenues visibles.
            </h3>
            <p className="mb-6">
              Et un acheteur qui voit la technique arrêter d&rsquo;écouter. Il ne se dit pas &laquo; ce commercial maîtrise son métier &raquo;. Il se dit &laquo; on me prend pour un débutant &raquo;.
            </p>
            <p className="mb-6">
              Le closing de 2026 ne repose pas sur un geste technique du dernier rendez-vous. Il repose sur la qualité de tout ce qui a été fait avant. La découverte, la construction de la valeur, la gestion du doute, l&rsquo;implication du décideur, la clarté des conditions.
            </p>
            <p className="mb-6">
              La signature n&rsquo;est plus une victoire du commercial sur l&rsquo;acheteur. C&rsquo;est la confirmation que le chemin était le bon.
            </p>
            <p className="font-semibold">
              Et ça, aucune technique ne pourra le remplacer.
            </p>
          </div>

          {/* FAQ */}
          <div className="my-12">
            <h2 id="faq" className="text-3xl font-title font-bold text-blue-ink mb-6">
              Questions frequentes sur le closing B2B
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Qu&rsquo;est-ce que le closing B2B en 2026 ?</h3>
                <p className="text-gray-600">Le closing B2B en 2026 n&rsquo;est plus un ensemble de techniques de conclusion mais une construction de validation tout au long du cycle. L&rsquo;acheteur étant déjà informé à 70%, le closing devient une confirmation de la valeur construite ensemble, pas une &laquo; fermeture &raquo;.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Pourquoi les techniques de closing classiques ne marchent plus ?</h3>
                <p className="text-gray-600">Les acheteurs B2B les ont vues des centaines de fois. Fausse urgence, alternative close, pénurie factice : ils les repèrent en quelques secondes. Ces techniques reposaient sur un déséquilibre d&rsquo;information qui n&rsquo;existe plus. L&rsquo;acheteur sait tout avant de vous parler.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Comment faire du closing sans etre agressif ?</h3>
                <p className="text-gray-600">En arrêtant de &laquo; faire du closing &raquo; justement. Si vous construisez la valeur tout au long du cycle, la signature n&rsquo;est qu&rsquo;une étape administrative. Le travail n&rsquo;est pas de convaincre à la fin mais de faire émerger la conviction pendant tout le processus.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Quelles approches de closing marchent en B2B en 2026 ?</h3>
                <p className="text-gray-600">Poser les conditions de signature dès le début, faire valider à chaque étape, construire une conséquence mesurable de l&rsquo;inaction, impliquer le vrai décideur avant la proposition, et savoir ralentir au lieu d&rsquo;accélérer quand le doute apparaît. Ce sont des disciplines de pilotage, pas des techniques.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Comment gerer l&rsquo;objection prix en closing en 2026 ?</h3>
                <p className="text-gray-600">L&rsquo;objection prix n&rsquo;est presque jamais la vraie raison. L&rsquo;acheteur informé compare moins un prix qu&rsquo;une incertitude. La question n&rsquo;est pas &laquo; est-ce trop cher &raquo; mais &laquo; suis-je sûr du résultat &raquo;. Le closing qui marche traite cette incertitude, pas le prix.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Le closing en face a face est-il plus efficace qu&rsquo;a distance ?</h3>
                <p className="text-gray-600">Pour les deals importants, oui. Mais ce n&rsquo;est pas la présence physique qui fait la différence, c&rsquo;est la qualité de la préparation. Un closing à distance bien préparé bat un closing en présentiel improvisé.</p>
              </div>
            </div>
          </div>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-8 my-12">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">Pour aller plus loin</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/techniques-de-closing-b2b-comment-signer-sans-forcer-et-sans-brader" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  → Techniques de closing : signer sans forcer ni brader
                </Link>
              </li>
              <li>
                <Link href="/blog/gestion-des-objections-commerciales-transformer-le-non-en-opportunite" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  → Gestion des objections commerciales : transformer le non
                </Link>
              </li>
              <li>
                <Link href="/blog/coaching-commercial-terrain-5-leviers-transformation-equipe" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  → Coaching commercial terrain : les 5 leviers
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA chute */}
          <div className="flex flex-col sm:flex-row gap-4 my-12">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors text-center"
            >
              Faire un diagnostic offert
            </Link>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-ink text-base font-medium rounded-full text-blue-ink hover:bg-blue-ink/10 transition-colors text-center"
            >
              Découvrir le Bootcamp
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

      {/* AuthorCard */}
      <div className="border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuthorCard />
        </div>
      </div>

      {/* Lien retour blog */}
      <div className="pb-12 text-center">
        <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
          ← Retour au blog
        </Link>
      </div>
    </main>
  );
}
