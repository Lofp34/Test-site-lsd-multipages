import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';

const articleUrl = 'https://www.laurentserre.com/blog/pricing-b2b-pme-prix-tenable';
const heroImage = '/images/blog/pricing-b2b-pme-prix-tenable/hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/pricing-b2b-pme-prix-tenable/hero.webp';

export const metadata: Metadata = {
  title: 'Pricing B2B PME : pourquoi vous perdez vos ventes (et ce n&rsquo;est pas le prix) | Laurent Serre',
  description:
    'Vous ne perdez pas vos ventes parce que vous êtes trop cher. Vous les perdez parce que la valeur n&rsquo;a pas été construite avant le prix. Le guide pour un pricing tenable en B2B.',
  keywords: [
    'pricing B2B PME',
    'stratégie de prix B2B',
    'comment fixer son prix en B2B',
    'value-based pricing PME',
    'tenir son prix commercial',
    'négociation prix B2B PME',
    'ne pas brader son prix',
  ],
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-07-05',
  },
  openGraph: {
    title: 'Pricing B2B PME : pourquoi vous perdez vos ventes (et ce n&rsquo;est pas le prix)',
    description:
      'Vous ne perdez pas vos ventes parce que vous êtes trop cher. Vous les perdez parce que la valeur n&rsquo;a pas été construite avant le prix.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Dirigeant de PME qui tient son prix face à un prospect : la valeur se construit avant le tarif',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing B2B PME : pourquoi vous perdez vos ventes (et ce n&rsquo;est pas le prix)',
    description:
      'Vous ne perdez pas vos ventes parce que vous êtes trop cher. Vous les perdez parce que la valeur n&rsquo;a pas été construite avant le prix.',
    images: [heroImageAbsolute],
  },
};

const faqItems = [
  {
    question: 'Pourquoi mes commerciaux perdent-ils des affaires sur le prix ?',
    answer:
      'Dans la grande majorité des cas, ce n&rsquo;est pas le montant qui pose problème. C&rsquo;est le moment où il arrive. Si le client n&rsquo;a pas mesuré ce que son problème lui coûte, votre prix arrive comme une dépense. S&rsquo;il n&rsquo;a pas anticipé ce qui changera après votre intervention, il compare deux montants sans référentiel. Le vrai problème, c&rsquo;est que la valeur n&rsquo;a pas été construite avant le prix. Vos commerciaux sont en train de réparer un prix qui n&rsquo;a pas été assez préparé.',
  },
  {
    question: 'Comment justifier un prix élevé en B2B ?',
    answer:
      'On ne justifie pas un prix élevé. On construit une valeur qui le rend naturel. Si vous devez justifier votre prix, c&rsquo;est que vous avez annoncé le montant trop tôt dans la vente. Avant d&rsquo;envoyer une proposition, assurez-vous que le client a mesuré trois choses : le coût réel de son problème, ce qui changera après votre intervention, et le lien entre ce sujet et une priorité stratégique. Si ces trois conditions sont remplies, le prix ne se « justifie » plus : il se décide.',
  },
  {
    question: 'Faut-il baisser son prix pour signer un deal important ?',
    answer:
      'Baisser son prix pour signer, c&rsquo;est souvent entrer dans une spirale qui abîme la marge et habitue le marché à ne pas payer le vrai prix de votre travail. Ce n&rsquo;est pas une question de rigidité : il y a des situations où une remise stratégique se défend. Mais avant d&rsquo;en arriver là, posez-vous la question : est-ce que le client a vraiment compris la valeur de ce qu&rsquo;on lui propose ? Si la réponse est non, la remise ne réglera rien. Si la réponse est oui et qu&rsquo;il négocie quand même, alors peut-être que ce n&rsquo;est pas le bon deal.',
  },
  {
    question: 'Quand doit-on parler prix dans un cycle de vente B2B ?',
    answer:
      'Le plus tard possible, mais pas avant que trois conditions soient réunies : le client a mesuré l&rsquo;impact de son problème, il visualise ce qui changera avec votre solution, et le vrai décideur a fait le lien avec une priorité stratégique. Si vous annoncez un prix avant cela, vous créez une discussion sur le tarif au lieu d&rsquo;une discussion sur l&rsquo;investissement. Certains commerciaux ont peur d&rsquo;attendre : ils croient que le prix sera mieux accepté s&rsquo;il arrive tôt. C&rsquo;est l&rsquo;inverse.',
  },
  {
    question: 'Comment tenir son prix sans perdre le client ?',
    answer:
      'Tenir son prix ne consiste pas à réciter une phrase ferme en fin de vente. C&rsquo;est une discipline qui commence bien avant : ne pas annoncer un montant tant que la valeur, la priorité et le coût du statu quo n&rsquo;ont pas été regardés en face. Si le client a vraiment compris ce que son problème lui coûte, le prix devient un investissement logique. S&rsquo;il ne l&rsquo;a pas compris, aucune formule de fermeté ne sauvera l&rsquo;affaire.',
  },
];

export default function PricingB2bPmePrixTenablePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Vous ne perdez pas vos ventes parce que vous êtes trop cher',
        description:
          'Vous ne perdez pas vos ventes parce que vous êtes trop cher. Vous les perdez parce que la valeur n&rsquo;a pas été construite avant le prix. Le guide pour un pricing tenable en B2B.',
        image: heroImageAbsolute,
        datePublished: '2026-07-05',
        dateModified: '2026-07-05',
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
        articleSection: 'Stratégie & Croissance / Pricing B2B',
        keywords: [
          'pricing B2B PME',
          'stratégie de prix B2B',
          'value-based pricing PME',
          'tenir son prix commercial',
          'négociation prix B2B PME',
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
          { '@type': 'ListItem', position: 3, name: 'Vous ne perdez pas vos ventes parce que vous êtes trop cher', item: articleUrl },
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

      {/* Hero section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Vous ne perdez pas vos ventes parce que vous êtes trop cher</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Stratégie & Croissance
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Vous ne perdez pas vos ventes parce que vous êtes trop cher
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32}
                  className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>&bull;</span>
              <time dateTime="2026-07-05">5 juillet 2026</time>
              <span>&bull;</span>
              <span>8 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Dirigeant de PME qui tient son prix face à un prospect autour d'une table de réunion"
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

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          {/* AuthorCard : top */}
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">
              ✨ Ce que vous allez retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Un prix ne se defend pas au moment ou le client le conteste. Il se prepare pendant toute la
              vente. Si vos commerciaux perdent des affaires sur le prix, ce n&rsquo;est pas un probleme
              de tarif : c&rsquo;est un probleme de diagnostic commercial. Ce guide vous montre pourquoi
              et comment construire la valeur avant d&rsquo;annoncer le montant.
            </p>
          </div>

          {/* Badge CTA */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vous perdez des affaires sur le prix ? Faites un diagnostic &rarr;
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#constat" className="text-mint-green hover:underline">Le constat qui derange</a></li>
              <li><a href="#diagnostic" className="text-mint-green hover:underline">Pourquoi le prix arrive mal</a></li>
              <li><a href="#erreur" className="text-mint-green hover:underline">L&rsquo;erreur typique : reparer au lieu de construire</a></li>
              <li><a href="#vrai-sujet" className="text-mint-green hover:underline">Le prix reflete un diagnostic, pas un tarif</a></li>
              <li><a href="#proposition" className="text-mint-green hover:underline">La proposition comme revelateur</a></li>
              <li><a href="#tenir" className="text-mint-green hover:underline">Tenir son prix : ce que ca veut vraiment dire</a></li>
              <li><a href="#perdre" className="text-mint-green hover:underline">Perdre une affaire a cause du prix</a></li>
              <li><a href="#question" className="text-mint-green hover:underline">La question qui change tout</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">Questions frequentes</a></li>
            </ul>
          </div>

          {/* ──────────────── 1. Le constat ──────────────── */}
          <h2 id="constat" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le constat qui derange
          </h2>

          <p className="mb-8">
            Dans beaucoup de PME, le prix devient un sujet trop tard.
          </p>

          <p className="mb-4">
            Le rendez-vous s&rsquo;est bien passe. Le prospect a compris l&rsquo;offre. Il dit que le
            sujet est interessant. Il demande une proposition.
          </p>

          <p className="mb-4">
            Puis le commercial envoie son prix.
          </p>

          <p className="mb-4">
            Et la, tout se tend.
          </p>

          <p className="mb-4">
            Le prospect repond : &laquo; C&rsquo;est quand meme un budget. &raquo; Ou : &laquo; On a vu
            moins cher ailleurs. &raquo; Ou simplement : &laquo; Il faut que je regarde. &raquo;
          </p>

          <p className="mb-8">
            Cette scene, vous la connaissez. Elle se joue tous les jours dans les PME francaises. Et
            presque toujours, on se trompe sur le diagnostic.
          </p>

          {/* ──────────────── 2. Pourquoi le prix arrive mal ──────────────── */}
          <h2 id="diagnostic" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Pourquoi le prix arrive mal
          </h2>

          <p className="mb-4">
            Quand un commercial entend un client dire que c&rsquo;est trop cher, il croit avoir un
            probleme de tarif. Dans neuf cas sur dix, c&rsquo;est autre chose.
          </p>

          <p className="mb-4">
            Il y a trois conditions qui font qu&rsquo;un prix arrive bien ou mal. Et si elles ne sont
            pas remplies, aucun montant ne sera jamais &laquo; juste &raquo;.
          </p>

          <p className="mb-4 mt-6">
            <strong>1. Le client n&rsquo;a pas mesure ce que son probleme lui coute</strong>
          </p>

          <p className="mb-4">
            Si le dirigeant n&rsquo;a pas mis de chiffres sur ce que son probleme lui coute en temps,
            en marge perdue, en energie gaspillee, en opportunites ratees, alors votre prix arrive
            comme une depense. Il n&rsquo;a pas de referentiel pour le comparer a autre chose qu&rsquo;a
            d&rsquo;autres prix.
          </p>

          <p className="mb-4 mt-6">
            <strong>2. Le client n&rsquo;a pas compris ce qui changera apres votre intervention</strong>
          </p>

          <p className="mb-4">
            Il ne voit pas a quoi ressemblera son quotidien apres. Il n&rsquo;imagine pas les consequences
            concretes de votre travail. Votre prix ressemble a une ligne de budget qu&rsquo;on coche ou
            qu&rsquo;on decoche.
          </p>

          <p className="mb-4 mt-6">
            <strong>3. Le vrai decideur n&rsquo;a pas relie le sujet a une priorite forte</strong>
          </p>

          <p className="mb-8">
            La personne qui decide n&rsquo;a pas fait le lien entre ce projet et un enjeu strategique.
            Du coup, votre prix devient reportable. On remet a plus tard. On regarde autre chose.
            C&rsquo;est facile de dire non quand rien de crucial n&rsquo;est en jeu.
          </p>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-gray-600 my-8">
            Un prix ne se defend pas seulement au moment ou le client le conteste. Il se prepare pendant
            toute la vente.
          </blockquote>

          {/* ──────────────── 3. L'erreur typique ──────────────── */}
          <h2 id="erreur" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            L&rsquo;erreur typique : reparer au lieu de construire
          </h2>

          <p className="mb-4">
            Le commercial sent que l&rsquo;affaire peut lui echapper. Alors il explique. Il detaille
            les livrables. Il rappelle le temps passe. Il propose une remise. Il enleve un morceau.
            Il promet de faire un effort.
          </p>

          <p className="mb-4">
            En apparence, il negocie.
          </p>

          <p className="mb-8">
            En realite, il est en train de reparer un prix qui n&rsquo;a pas ete assez construit avant.
          </p>

          <p className="mb-4">
            C&rsquo;est la que beaucoup de PME se bradent. Pas parce que leurs offres ne valent rien.
            Mais parce qu&rsquo;elles annoncent un prix avant d&rsquo;avoir fait exister la valeur dans
            la tete du client.
          </p>

          <p className="mb-8">
            Et quand la valeur n&rsquo;est pas claire, le prix prend toute la place.
          </p>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-gray-600 my-8">
            On croit alors avoir un probleme de tarif. En fait, on a souvent un probleme de diagnostic
            commercial.
          </blockquote>

          {/* Mid-article CTA : Bootcamp */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-2">
              Vos commerciaux bradent parce qu&rsquo;ils ne savent pas construire la valeur ?
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Le Bootcamp Commercial est un programme de 8 semaines pour transformer vos commerciaux en
              terrain. Construction de valeur, tenue de prix, diagnostic commercial : les reflexe qui
              font la difference.
            </p>
            <div className="text-center">
              <Link
                href="/bootcamp"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-ink text-white text-sm font-medium rounded-full hover:bg-blue-ink/90 transition-colors"
              >
                Decouvrir le Bootcamp Commercial &rarr;
              </Link>
            </div>
          </div>

          {/* ──────────────── 4. Le vrai sujet ──────────────── */}
          <h2 id="vrai-sujet" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le prix reflete un diagnostic, pas un tarif
          </h2>

          <p className="mb-4">
            Le prospect compare le montant, parce qu&rsquo;il ne compare pas encore le risque evite,
            le temps gagne, les erreurs supprimees, la decision rendue plus simple, ou le resultat
            rendu plus probable.
          </p>

          <p className="mb-8">
            Il compare deux prix, parce que la vente ne lui a pas encore permis de comparer deux
            niveaux d&rsquo;impact.
          </p>

          <p className="mb-4">
            C&rsquo;est toute la difference entre une discussion de tarif et une discussion
            d&rsquo;investissement. Pour passer de l&rsquo;une a l&rsquo;autre, il faut que le client
            ait repondu a une question simple : qu&rsquo;est-ce que cela me coute de ne rien faire ?
          </p>

          <p className="mb-4">
            Si cette question n&rsquo;a pas ete travaillee serieusement, le prix tombe dans le vide.
            Le client n&rsquo;a aucun ancrage pour evaluer le montant. Il le compare a son budget,
            a d&rsquo;autres devis, a son intuition. Mais pas a l&rsquo;impact reel.
          </p>

          <p className="mb-8">
            Vous pouvez avoir le meilleur produit, la meilleure equipe, les meilleurs resultats :
            si le client n&rsquo;a pas mesure l&rsquo;ecart entre sa situation actuelle et sa situation
            desiree, votre prix sera toujours trop eleve. Je l&rsquo;explique d&rsquo;ailleurs plus en
            detail dans un article sur la methode Gap Selling, qui precise justement comment mesurer
            cet ecart.
          </p>

          {/* ──────────────── 5. La proposition commerciale ──────────────── */}
          <h2 id="proposition" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La proposition commerciale comme revelateur
          </h2>

          <p className="mb-4">
            C&rsquo;est tres visible dans les propositions commerciales.
          </p>

          <p className="mb-4">
            Certaines commencent par ce que l&rsquo;entreprise va faire : nombre de jours, ateliers,
            livrables, accompagnement, suivi.
          </p>

          <p className="mb-4">
            Tout cela peut etre utile. Mais si le client lit seulement une liste de moyens, il cherchera
            naturellement a discuter les moyens. Peut-on faire moins de jours ? Peut-on enlever un
            atelier ? Peut-on simplifier le suivi ?
          </p>

          <p className="mb-4">
            La discussion descend vite sur le cout.
          </p>

          <p className="mb-8">
            Un prix tenable part d&rsquo;ailleurs. Il part du probleme tel qu&rsquo;il existe vraiment
            chez le client. Qu&rsquo;est-ce qui se passe aujourd&rsquo;hui ? Qu&rsquo;est-ce que cela
            abime ? Qu&rsquo;est-ce que cela coute en temps, en energie, en marge, en ventes perdues,
            en tension manageriale ? Qu&rsquo;est-ce qui se passera si rien ne change dans six mois ?
          </p>

          <p className="mb-8">
            Quand ces questions ont ete travaillees serieusement, le prix n&rsquo;est plus pose dans
            le vide. Il devient une decision a prendre face a une situation reelle. J&rsquo;ai deja
            aborde ce sujet dans un article sur la peur du prix : le vrai probleme n&rsquo;est presque
            jamais le tarif.
          </p>

          {/* ──────────────── 6. Tenir son prix ──────────────── */}
          <h2 id="tenir" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Tenir son prix : ce que ca veut vraiment dire
          </h2>

          <p className="mb-4">
            Tenir son prix ne consiste pas a reciter une phrase ferme en fin de vente.
          </p>

          <p className="mb-8">
            C&rsquo;est une discipline beaucoup plus simple, mais beaucoup plus exigeante : ne pas
            annoncer un montant tant que la valeur, la priorite et le cout du statu quo n&rsquo;ont
            pas ete regardes en face.
          </p>

          <p className="mb-4">
            Quand le budget est gele, le prix devient un pretexte pour repousser une decision qui
            n&rsquo;a pas ete construite. J&rsquo;ai ecrit un article sur le closing B2B budget gele
            qui developpe precisement ce mecanisme : un prix ne se defend pas au moment ou le client
            dit que le budget n&rsquo;est pas la. Il se construit avant.
          </p>

          <p className="mb-8">
            Dans une equipe commerciale, cela demande une discipline collective. Le commercial ne
            doit pas etre mis en situation de devoir annoncer un prix alors que ces conditions ne
            sont pas reunies. Et le manager doit etre capable de lire les dossiers pour verifier que
            la construction de valeur est suffisante avant de laisser envoyer une proposition.
          </p>

          <blockquote className="border-l-4 border-mint-green pl-4 italic text-gray-600 my-8">
            Le vrai danger, pour une PME, n&rsquo;est pas de perdre quelques affaires a cause du prix.
            Le vrai danger, c&rsquo;est de signer trop souvent avec un prix qu&rsquo;elle n&rsquo;assume
            pas vraiment.
          </blockquote>

          {/* ──────────────── 7. Perdre une affaire ──────────────── */}
          <h2 id="perdre" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Perdre une affaire a cause du prix
          </h2>

          <p className="mb-4">
            Cela ne veut pas dire que le client dira toujours oui.
          </p>

          <p className="mb-8">
            Heureusement.
          </p>

          <p className="mb-4">
            Un prix juste doit parfois faire perdre des affaires qui n&rsquo;etaient pas les bonnes.
            Des prospects qui veulent surtout acheter moins cher. Des dossiers ou le probleme
            n&rsquo;est pas assez prioritaire. Des entreprises qui demandent une solution serieuse
            mais ne veulent pas payer le niveau d&rsquo;engagement necessaire.
          </p>

          <p className="mb-4">
            Ce n&rsquo;est pas forcement une mauvaise nouvelle.
          </p>

          <p className="mb-8">
            Parce qu&rsquo;ensuite, tout se paie. La marge baisse. Les equipes livrent sous tension.
            Le client demande le meme niveau d&rsquo;exigence pour un budget reduit. Le commercial
            apprend qu&rsquo;une remise est la meilleure facon de sauver une affaire. Et petit a
            petit, l&rsquo;entreprise habitue son marche a ne pas payer le vrai prix de son travail.
          </p>

          <p className="mb-4">
            Un pricing tenable s&rsquo;inscrit dans une strategie commerciale claire. J&rsquo;ai
            ecrit un article sur la strategie commerciale PME qui montre comment aligner le prix
            sur la valeur apportee, plutot que de le definir comme un simplecout de revient.
          </p>

          {/* ──────────────── 8. La question qui change tout ──────────────── */}
          <h2 id="question" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            La question qui change tout
          </h2>

          <p className="mb-4">
            La bonne question n&rsquo;est pas : &laquo; Comment justifier notre prix ? &raquo;
          </p>

          <p className="mb-8">
            La vraie question est : &laquo; Avons-nous aide le client a comprendre pourquoi ce
            probleme merite ce niveau de decision ? &raquo;
          </p>

          <p className="mb-4">
            Si la reponse est non, ce n&rsquo;est pas le prix qu&rsquo;il faut reparer. C&rsquo;est
            le diagnostic commercial.
          </p>

          <p className="mb-8">
            Et si la reponse est oui, alors le prix n&rsquo;est plus un probleme. Il devient une
            decision logique que le client prend en connaissance de cause.
          </p>

          {/* ──────────────── FAQ ──────────────── */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Questions frequentes sur le pricing B2B PME
          </h2>

          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <p className="font-bold text-blue-ink mb-1">{item.question}</p>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>

          {/* ──────────────── Pour aller plus loin ──────────────── */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/la-peur-du-prix-le-vrai-probleme-nest-presque-jamais-le-tarif" className="text-mint-green hover:underline font-medium">
                  La peur du prix : le vrai probleme n&rsquo;est presque jamais le tarif
                </Link>
                <span className="text-gray-500">&nbsp;: j&rsquo;ai deja aborde ce sujet. La peur du prix cache presque toujours un autre probleme.</span>
              </li>
              <li>
                <Link href="/blog/closing-b2b-budget-gele-pme" className="text-mint-green hover:underline font-medium">
                  Closing B2B : quand le budget est gele, le prix devient un pretexte
                </Link>
                <span className="text-gray-500">&nbsp;: comment un budget gele masque souvent un diagnostic qui n&rsquo;a pas ete fait.</span>
              </li>
              <li>
                <Link href="/blog/gap-selling-methode-b2b" className="text-mint-green hover:underline font-medium">
                  La methode Gap Selling : mesurer l&rsquo;ecart entre situation actuelle et desiree
                </Link>
                <span className="text-gray-500">&nbsp;: la methode precise pour construire la valeur avant d&rsquo;annoncer le prix.</span>
              </li>
              <li>
                <Link href="/blog/strategie-commerciale-pme-cadre-une-page" className="text-mint-green hover:underline font-medium">
                  Strategie commerciale PME : le cadre qui tient sur une page
                </Link>
                <span className="text-gray-500">&nbsp;: un pricing tenable s&rsquo;inscrit dans une strategie commerciale claire.</span>
              </li>
            </ul>
          </div>

          {/* ──────────────── CTA final gradient ──────────────── */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous perdez des affaires sur le prix sans comprendre pourquoi ?
            </h3>
            <p className="mb-6">
              Je propose un diagnostic commercial qui regarde votre cycle de vente, la facon dont
              vos commerciaux construisent la valeur, et les vrais motifs de refus. Sans fausses
              promesses de resultats miracles.
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
                Decouvrir le Bootcamp commercial
              </Link>
            </div>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            Le probleme de vos commerciaux, ce n&rsquo;est pas le prix. C&rsquo;est la valeur qu&rsquo;ils
            n&rsquo;arrivent pas a construire avant.
          </p>
        </div>

        {/* AuthorCard (bas) */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <AuthorCard />
        </div>
      </article>

      {/* HubSpotForm */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d&rsquo;en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre situation de pricing merite un echange direct, vous pouvez aussi laisser un
            message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>

      {/* Lien retour blog */}
      <section className="py-8 bg-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors font-medium"
          >
            &larr; Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
