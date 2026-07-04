import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

const articleUrl = 'https://www.laurentserre.com/blog/vente-b2b-2030-commercial-excuses';
const heroImage = '/images/blog/vente-b2b-2030-commercial-excuses/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/vente-b2b-2030-commercial-excuses/hero.webp';

export const metadata: Metadata = {
  title: 'En 2030, le commercial moyen n&rsquo;aura plus beaucoup d&rsquo;excuses | Laurent Serre',
  description:
    'L\u2019IA ne va pas remplacer les commerciaux. Elle va r\u00e9v\u00e9ler ceux qui confondent activit\u00e9 et impact. La question pour un dirigeant de PME : si j\u2019enl\u00e8ve les t\u00e2ches de confort, que reste-t-il comme vraie comp\u00e9tence commerciale ?',
  keywords: [
    'avenir vente B2B 2030',
    'commercial 2030 compétences',
    'IA révélation commercial',
    'activité vs impact commercial',
    'vente B2B futur',
    'compétences commerciales 2030',
    'dirigeant PME vente',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-07-04',
  },
  openGraph: {
    title: 'En 2030, le commercial moyen n\u2019aura plus beaucoup d\u2019excuses',
    description:
      'L\u2019IA ne va pas remplacer les commerciaux. Elle va r\u00e9v\u00e9ler ceux qui confondent activit\u00e9 et impact.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Un dirigeant de PME interroge son équipe commerciale : que reste-t-il quand l\u2019IA fait la mécanique ?',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'En 2030, le commercial moyen n\u2019aura plus beaucoup d\u2019excuses',
    description:
      'L\u2019IA ne va pas remplacer les commerciaux. Elle va r\u00e9v\u00e9ler ceux qui confondent activit\u00e9 et impact.',
    images: [heroImageAbsolute],
  },
};

const faqItems = [
  {
    question: 'L\u2019IA va-t-elle remplacer les commerciaux en 2030 ?',
    answer:
      'Non. L\u2019IA ne va pas remplacer les commerciaux, elle va rendre les commerciaux faibles plus visibles. En automatisant les t\u00e2ches m\u00e9caniques (recherche, CRM, relances, comptes-rendus), elle enl\u00e8ve une protection confortable : l\u2019excuse de l\u2019activit\u00e9. Le commercial qui sait \u00e9couter, qualifier, comprendre qui d\u00e9cide et conduire une vraie conversation restera plus pr\u00e9cieux que jamais. La vente B2B de 2030 sera moins indulgente avec ceux qui confondent activit\u00e9 et impact, mais elle ne sera pas moins humaine.',
  },
  {
    question: 'Quelles comp\u00e9tences pour les commerciaux en 2030 ?',
    answer:
      'Les comp\u00e9tences qui compteront en 2030 sont celles que l\u2019IA ne peut pas automatiser : \u00e9couter les mots exacts du client, qualifier une situation sans se fier aux apparences, comprendre qui d\u00e9cide vraiment dans une organisation, d\u00e9fendre un prix sans se r\u00e9fugier dans la remise, faire parler un client sur ce qui bloque vraiment, construire une prochaine \u00e9tape qui engage. L\u2019IA peut pr\u00e9parer le dossier et r\u00e9diger la proposition. Elle ne peut pas porter une d\u00e9cision difficile avec des humains autour de la table.',
  },
  {
    question: 'Comment l\u2019IA change-t-elle la vente B2B ?',
    answer:
      'L\u2019IA change la vente B2B en automatisant ce qui \u00e9tait chronophage et \u00e0 faible valeur ajout\u00e9e : recherche d\u2019informations sur les prospects, mise \u00e0 jour CRM, r\u00e9sum\u00e9 de rendez-vous, premi\u00e8re version de propositions standards. Mais ce n\u2019est pas le c\u0153ur du changement. Le vrai changement, c\u2019est que le commercial n\u2019aura bient\u00f4t plus d\u2019excuse pour arriver mal pr\u00e9par\u00e9. Et donc que le vrai niveau de chaque commercial deviendra visible. La question ne sera plus \u00ab As-tu eu le temps de pr\u00e9parer ? \u00bb mais \u00ab Qu\u2019as-tu compris de tout \u00e7a ? \u00bb',
  },
  {
    question: 'Comment pr\u00e9parer son \u00e9quipe commerciale \u00e0 l\u2019IA ?',
    answer:
      'La premi\u00e8re chose \u00e0 faire n\u2019est pas d\u2019\u00e9quiper l\u2019\u00e9quipe d\u2019outils d\u2019IA. C\u2019est de v\u00e9rifier le niveau de comp\u00e9tence commerciale de fond. Posez-vous la question : si toutes les t\u00e2ches de confort disparaissaient demain, que sauraient faire vos commerciaux de vraiment diff\u00e9renciant ? Savent-ils qualifier proprement ? Savent-ils comprendre les vrais blocages ? Savent-ils \u00e9crire un message qui ne ressemble pas \u00e0 un mod\u00e8le maquill\u00e9 ? Si la r\u00e9ponse est fragile, commencez par l\u00e0, pas par l\u2019outil. Former sur les fondamentaux, puis ajouter l\u2019IA comme amplificateur.',
  },
  {
    question: 'L\u2019activit\u00e9 commerciale va-t-elle diminuer avec l\u2019IA ?',
    answer:
      'L\u2019activit\u00e9 va surtout changer de nature. Les t\u00e2ches administratives et de recherche vont diminuer, lib\u00e9rant du temps. Mais le pi\u00e8ge est de croire que ce temps lib\u00e9r\u00e9 se transforme automatiquement en ventes. Ce n\u2019est pas le volume d\u2019activit\u00e9 qui fait la performance, c\u2019est la qualit\u00e9 des interactions. Un commercial qui appelle trois fois plus parce que l\u2019IA a g\u00e9n\u00e9r\u00e9 ses listes ne vendra pas n\u00e9cessairement mieux. Celui qui utilise ce temps pour mieux comprendre chaque situation, mieux pr\u00e9parer chaque conversation, oui. L\u2019IA ne r\u00e9compense pas l\u2019activit\u00e9. Elle r\u00e9compense le jugement.',
  },
];

export default function VenteB2b2030CommercialExcusesPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'En 2030, le commercial moyen n\u2019aura plus beaucoup d\u2019excuses',
        description:
          'L\u2019IA ne va pas remplacer les commerciaux. Elle va r\u00e9v\u00e9ler ceux qui confondent activit\u00e9 et impact. La question pour un dirigeant de PME : si j\u2019enl\u00e8ve les t\u00e2ches de confort, que reste-t-il comme vraie comp\u00e9tence commerciale ?',
        image: heroImageAbsolute,
        datePublished: '2026-07-04',
        dateModified: '2026-07-04',
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
        articleSection: 'Vente B2B / IA',
        keywords: [
          'avenir vente B2B 2030',
          'commercial 2030 compétences',
          'IA révélation commercial',
          'activité vs impact commercial',
          'vente B2B futur',
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
          { '@type': 'ListItem', position: 3, name: 'En 2030, le commercial moyen n\u2019aura plus beaucoup d\u2019excuses', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">En 2030, le commercial moyen n&rsquo;aura plus beaucoup d&rsquo;excuses</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Vente B2B / IA
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              En 2030, le commercial moyen n&rsquo;aura plus beaucoup d&rsquo;excuses
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
              <span>&bull;</span>
              <time dateTime="2026-07-04">4 juillet 2026</time>
              <span>&bull;</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="mb-8">
            <AuthorCard />
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un dirigeant de PME dans son bureau, post-it et tableau blanc en fond, regard r\u00e9fl\u00e9chi face \u00e0 l\u2019avenir de son \u00e9quipe commerciale"
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

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              ✨ Ce que vous allez retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              L\u2019IA ne va pas remplacer les commerciaux. Elle va enlever leurs excuses et r\u00e9v\u00e9ler ceux qui confondent activit\u00e9 et impact.
              La question pour un dirigeant de PME n\u2019est pas \u00ab Faut-il mettre de l\u2019IA dans la vente ? \u00bb mais \u00ab Si j\u2019enl\u00e8ve toutes les t\u00e2ches de confort, que reste-t-il comme vraie comp\u00e9tence commerciale ? \u00bb.
            </p>
          </div>

          {/* CTA SOFT */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vos commerciaux savent-ils vendre sans les excuses ? Faites un diagnostic
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#merfiance" className="text-mint-green hover:underline">La m\u00e9fiance envers les articles pr\u00e9dictifs</a></li>
              <li><a href="#activite-excuse" className="text-mint-green hover:underline">L\u2019activit\u00e9 comme protection confortable</a></li>
              <li><a href="#vraie-question" className="text-mint-green hover:underline">La vraie question que l\u2019IA pose aux \u00e9quipes</a></li>
              <li><a href="#revelateur" className="text-mint-green hover:underline">L\u2019IA comme r\u00e9v\u00e9lateur de niveau</a></li>
              <li><a href="#ce-qui-compte" className="text-mint-green hover:underline">Ce qui devient plus important quand la machine fait la m\u00e9canique</a></li>
              <li><a href="#question-dirigeant" className="text-mint-green hover:underline">La question que tout dirigeant devrait se poser</a></li>
            </ul>
          </div>

          {/* Article body */}

          <h2 id="merfiance" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Je me m\u00e9fie des articles qui expliquent \u00e0 quoi ressemblera la vente dans cinq ans
          </h2>

          <p className="mb-8">
            Je les lis comme tout le monde. Certains sont bien inform\u00e9s. D\u2019autres sont surtout inquiets.
          </p>

          <p className="mb-8">
            Mais presque tous ont un point commun : ils disent que tout va changer, et que le commercial doit avoir peur de l\u2019avenir.
          </p>

          <p className="mb-8">
            Je crois que le vrai sujet est plus simple que \u00e7a.
          </p>

          <p className="mb-8">
            En 2030, beaucoup de t\u00e2ches qui donnent aujourd\u2019hui l\u2019impression de travailler auront disparu ou seront largement assist\u00e9es par l\u2019IA. Chercher des informations sur une entreprise. Pr\u00e9parer un premier message. R\u00e9sumer un rendez-vous. Mettre \u00e0 jour le CRM. Retrouver ce qui a \u00e9t\u00e9 dit trois semaines plus t\u00f4t. Produire une premi\u00e8re version d\u2019un email de relance.
          </p>

          <p className="mb-8">
            Tout cela prendra moins de temps. Et c\u2019est une bonne nouvelle.
          </p>

          <p className="mb-8">
            Comme je le montrais dans l\u2019article sur{' '}
            <Link href="/blog/acheteurs-b2b-2026-client-deja-informe" className="text-mint-green hover:underline">
              les acheteurs B2B qui arrivent d\u00e9j\u00e0 inform\u00e9s en rendez-vous
            </Link>
            , le client a de moins en moins besoin d\u2019un commercial qui lui r\u00e9cite une plaquette. Il a besoin de quelqu\u2019un qui l\u2019aide \u00e0 d\u00e9cider. L\u2019IA ne change pas cette r\u00e9alit\u00e9 : elle l\u2019acc\u00e9l\u00e8re.
          </p>

          <p className="mb-8">
            Mais en acc\u00e9l\u00e9rant la pr\u00e9paration, elle enl\u00e8ve aussi une protection confortable \u00e0 beaucoup d\u2019\u00e9quipes commerciales.
          </p>

          <h2 id="activite-excuse" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L\u2019activit\u00e9 est devenue une protection
          </h2>

          <p className="mb-8">
            Regardons les choses en face.
          </p>

          <p className="mb-8">
            Aujourd\u2019hui, un commercial peut remplir sa semaine avec des recherches, des relances, des comptes-rendus, des tableaux, des fichiers, des pr\u00e9parations de rendez-vous, des mises \u00e0 jour CRM. \u00c0 la fin de la semaine, il a beaucoup fait. Il peut montrer son volume d\u2019activit\u00e9.
          </p>

          <p className="mb-8">
            Mais il n\u2019a pas forc\u00e9ment mieux vendu.
          </p>

          <p className="mb-8">
            C\u2019est le pi\u00e8ge que j\u2019ai d\u00e9j\u00e0 explor\u00e9 en parlant de{' '}
            <Link href="/blog/ia-commercial-b2b-revelateur-competences" className="text-mint-green hover:underline">
              comment l\u2019IA r\u00e9v\u00e8le le vrai niveau des commerciaux
            </Link>
            . Quand la pr\u00e9paration devient automatique, le manque de jugement devient visible.
          </p>

          <p className="mb-8">
            Demain, si ces t\u00e2ches m\u00e9caniques deviennent plus rapides ou disparaissent, la vraie question appara\u00eetra plus clairement : qu\u2019est-ce que le commercial apporte quand la machine a d\u00e9j\u00e0 fait la partie m\u00e9canique ?
          </p>

          <p className="mb-8">
            La r\u00e9ponse ne sera pas dans le volume. Elle sera dans la qualit\u00e9 de la conversation.
          </p>

          <h2 id="vraie-question" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La vraie question que l\u2019IA pose aux \u00e9quipes
          </h2>

          <p className="mb-8">
            On parle beaucoup de ce que l\u2019IA va apporter aux commerciaux. Moins de ce qu\u2019elle va leur enlever.
          </p>

          <p className="mb-8">
            Je ne parle pas des emplois. Je parle des protections invisibles.
          </p>

          <p className="mb-8">
            Aujourd\u2019hui, un commercial peut encore justifier un r\u00e9sultat moyen par le manque de temps. Pas assez de prospection. Pas assez de relances. Pas assez de donn\u00e9es sur le prospect. Pas assez de suivi CRM.
          </p>

          <p className="mb-8">
            Ces excuses tiennent parce que ces t\u00e2ches prennent effectivement du temps.
          </p>

          <p className="mb-8">
            Mais si l\u2019IA les fait en cinq minutes, que reste-t-il ?
          </p>

          <p className="mb-8">
            Il reste la capacit\u00e9 \u00e0 conduire une vraie conversation commerciale.
          </p>

          <p className="mb-8">
            Et l\u00e0, les \u00e9carts deviennent plus visibles.
          </p>

          <p className="mb-8 italic text-gray-600">
            C\u2019est exactement ce que je raconte dans l\u2019article sur{' '}
            <Link href="/blog/ia-generative-commercial-b2b-demander-mieux" className="text-mint-green hover:underline">
              comment savoir quoi demander \u00e0 l\u2019IA
            </Link>
            . L\u2019outil ne fait pas le travail \u00e0 votre place. Il r\u00e9v\u00e8le si vous savez quoi lui demander.
          </p>

          <h2 id="revelateur" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L\u2019IA comme r\u00e9v\u00e9lateur, pas comme remplacement
          </h2>

          <p className="mb-8">
            Un acheteur B2B arrive d\u00e9j\u00e0 plus inform\u00e9 qu\u2019avant. Il a lu, compar\u00e9, demand\u00e9 autour de lui, regard\u00e9 LinkedIn, parcouru le site, parfois test\u00e9 plusieurs solutions.
          </p>

          <p className="mb-8">
            Il ne vient pas chercher un commercial qui r\u00e9cite une plaquette. Il vient chercher quelqu\u2019un qui l\u2019aide \u00e0 comprendre ce qu\u2019il doit vraiment d\u00e9cider.
          </p>

          <p className="mb-8">
            C\u2019est l\u00e0 que la vente va se durcir.
          </p>

          <p className="mb-8">
            Pas parce que l\u2019IA va remplacer tous les commerciaux. Mais parce qu\u2019elle va rendre les commerciaux faibles plus visibles.
          </p>

          <p className="mb-8">
            Celui qui ne sait pas \u00e9couter sera moins utile.
          </p>

          <p className="mb-8">
            Celui qui pose trois questions g\u00e9n\u00e9riques sera vite rep\u00e9r\u00e9.
          </p>

          <p className="mb-8">
            Celui qui envoie un message personnalis\u00e9 en surface, mais vide au fond, sera noy\u00e9 dans la masse.
          </p>

          <p className="mb-8">
            Celui qui ne comprend pas l\u2019entreprise de son client restera un interm\u00e9diaire de plus.
          </p>

          <p className="mb-8">
            Ce n\u2019est pas une question de technologie. C\u2019est une question de niveau.
          </p>

          <p className="mb-8">
            Je l\u2019ai \u00e9crit \u00e0 plusieurs reprises, notamment en parlant des{' '}
            <Link href="/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux" className="text-mint-green hover:underline">
              acheteurs B2B qui ne veulent plus parler aux commerciaux
            </Link>
            : le client n\u2019a pas moins besoin du commercial, mais il attend une autre valeur que la pr\u00e9sentation de l\u2019offre.
          </p>

          {/* CTA MEDIUM */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Le probl\u00e8me n\u2019est pas l\u2019IA. C\u2019est le niveau des conversations.
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp M\u00e9thodes de vente entra\u00eene vos commerciaux sur ce que l\u2019IA ne r\u00e8gle pas : \u00e9couter, qualifier, comprendre qui d\u00e9cide, construire une prochaine \u00e9tape qui engage. Un programme terrain qui renforce les fondamentaux avant d\u2019ajouter les outils.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              D\u00e9couvrir le Bootcamp M\u00e9thodes de vente
            </Link>
          </div>

          <h2 id="ce-qui-compte" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce qui devient plus important quand la machine fait la m\u00e9canique
          </h2>

          <p className="mb-8">
            Contrairement \u00e0 ce que racontent les articles alarmistes, tout ne change pas.
          </p>

          <p className="mb-8">
            Certaines choses deviennent plus importantes.
          </p>

          <p className="mb-8">
            Le bon commercial aura plus de place en 2030. Pas malgr\u00e9 l\u2019IA. Gr\u00e2ce \u00e0 elle.
          </p>

          <p className="mb-8">
            Parce qu\u2019il arrivera mieux pr\u00e9par\u00e9. Parce qu\u2019il passera moins de temps \u00e0 recopier ce qui s\u2019est dit. Parce qu\u2019il pourra rep\u00e9rer plus vite les signaux faibles. Parce qu\u2019il consacrera davantage d\u2019\u00e9nergie \u00e0 la seule chose qui ne se d\u00e9l\u00e8gue pas vraiment : faire avancer une d\u00e9cision difficile avec des humains autour de la table.
          </p>

          <p className="mb-8">
            L\u2019IA ne supprime pas le besoin d\u2019\u00e9coute, de jugement, de timing. Elle amplifie ceux qui les ont. Elle expose ceux qui ne les ont pas.
          </p>

          <p className="mb-8">
            Je vois d\u00e9j\u00e0 ce ph\u00e9nom\u00e8ne dans les \u00e9quipes que j\u2019accompagne. Les commerciaux qui \u00e9taient solides deviennent tr\u00e8s solides parce qu\u2019ils utilisent l\u2019IA pour \u00eatre plus pr\u00e9sents sur ce qui compte. Ceux qui naviguaient deviennent visibles dans leur m\u00e9diocrit\u00e9.
          </p>

          <p className="mb-8">
            L\u2019IA acc\u00e9l\u00e8re le tri naturel qui \u00e9tait d\u00e9j\u00e0 en cours. Comme je l\u2019\u00e9voquais en parlant de la{' '}
            <Link href="/blog/ia-transforme-developpement-commercial-2025" className="text-mint-green hover:underline">
              transformation du d\u00e9veloppement commercial par l\u2019IA
            </Link>
            , l\u2019outil ne cr\u00e9e pas le changement : il le rend visible plus vite.
          </p>

          <h2 id="question-dirigeant" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La question que tout dirigeant devrait se poser d\u00e8s maintenant
          </h2>

          <p className="mb-8">
            Pour un dirigeant de PME, la question n\u2019est donc pas : \u00ab Faut-il mettre de l\u2019IA dans la vente ? \u00bb
          </p>

          <p className="mb-8 font-semibold">
            La question est : \u00ab Si j\u2019enl\u00e8ve \u00e0 mon \u00e9quipe toutes les t\u00e2ches de confort, que reste-t-il comme vraie comp\u00e9tence commerciale ? \u00bb
          </p>

          <p className="mb-8">
            Posez ces cinq questions \u00e0 froid, avec honn\u00eatet\u00e9 :
          </p>

          <ul className="space-y-2 text-sm text-gray-700 mb-8">
            <li>Est-ce que mon \u00e9quipe sait qualifier proprement, ou est-ce qu\u2019elle confond int\u00e9r\u00eat et d\u00e9cision ?</li>
            <li>Est-ce qu\u2019elle sait faire parler un client sur ce qui bloque vraiment, ou est-ce qu\u2019elle reste en surface ?</li>
            <li>Est-ce qu\u2019elle sait comprendre qui d\u00e9cidera, ou est-ce qu\u2019elle parle au mauvais interlocuteur ?</li>
            <li>Est-ce qu\u2019elle sait d\u00e9fendre un prix sans se r\u00e9fugier dans la remise imm\u00e9diate ?</li>
            <li>Est-ce qu\u2019elle sait \u00e9crire un message qui ressemble \u00e0 autre chose qu\u2019\u00e0 un mod\u00e8le un peu maquill\u00e9 ?</li>
          </ul>

          <p className="mb-8">
            Si vous r\u00e9pondez \u00ab pas s\u00fbr \u00bb \u00e0 plusieurs de ces questions, ce n\u2019est pas un outil d\u2019IA qu\u2019il faut d\u2019abord acheter.
          </p>

          <p className="mb-8">
            C\u2019est un travail sur le fond du m\u00e9tier.
          </p>

          <p className="mb-8">
            Dans un autre registre mais avec le m\u00eame horizon 2030, j\u2019ai d\u00e9j\u00e0 montr\u00e9{' '}
            <Link href="/blog/en-2030-toiture-et-compagnie-les-agents-ia-ont-change-le-rythme" className="text-mint-green hover:underline">
              comment les agents IA changent le rythme m\u00eame des m\u00e9tiers terrain
            </Link>
            . Le constat est le m\u00eame partout : ceux qui ne font que de l\u2019ex\u00e9cution seront remplac\u00e9s, mais ceux qui apportent un jugement seront valoris\u00e9s.
          </p>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-xl p-6 my-12">
            <h3 className="text-xl font-title font-bold text-blue-ink mb-4">
              Pour aller plus loin
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/blog/acheteurs-b2b-2026-client-deja-informe" className="text-mint-green hover:underline">
                  Acheteurs B2B 2026 : votre client arrive d\u00e9j\u00e0 inform\u00e9 en rendez-vous
                </Link>
                <span className="text-gray-500">{' '}: le constat de d\u00e9part du cluster IA & Futur de la vente B2B</span>
              </li>
              <li>
                <Link href="/blog/ia-commercial-b2b-revelateur-competences" className="text-mint-green hover:underline">
                  L\u2019IA montre le vrai niveau commercial
                </Link>
                <span className="text-gray-500">{' '}: comment l\u2019IA r\u00e9v\u00e8le les \u00e9carts de comp\u00e9tence dans une \u00e9quipe</span>
              </li>
              <li>
                <Link href="/blog/ia-generative-commercial-b2b-demander-mieux" className="text-mint-green hover:underline">
                  Savoir quoi demander \u00e0 l\u2019IA
                </Link>
                <span className="text-gray-500">{' '}: la comp\u00e9tence n\u00e9glig\u00e9e qui fera la diff\u00e9rence entre un commercial moyen et un bon</span>
              </li>
            </ul>
          </div>

          {/* CTA FORT */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Que reste-t-il de votre \u00e9quipe commerciale sans les t\u00e2ches de confort ?
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Le diagnostic commercial \u00e9value en 45 minutes le vrai niveau de votre \u00e9quipe : capacit\u00e9 \u00e0 qualifier, \u00e0 \u00e9couter les vrais blocages, \u00e0 d\u00e9fendre un prix, \u00e0 construire une prochaine \u00e9tape qui engage. Un \u00e9tat des lieux concret pour savoir par o\u00f9 commencer \u2014 sans vendre d\u2019outil.
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
                D\u00e9couvrir le Bootcamp commercial
              </Link>
            </div>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            La vente B2B de 2030 ne sera probablement pas moins humaine. Elle sera moins indulgente avec les commerciaux qui confondent activit\u00e9 et impact. Et c\u2019est peut-\u00eatre ce qui fera le plus grand tri.
          </p>

          {/* FAQ */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8" id="faq">
              Questions fr\u00e9quentes sur l\u2019avenir de la vente B2B
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

          {/* AuthorCard bottom */}
          <div className="mt-16">
            <AuthorCard />
          </div>

          {/* HubSpot Form */}
          <div className="mt-8">
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
