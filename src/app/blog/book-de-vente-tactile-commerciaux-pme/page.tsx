import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const heroImage = '/images/blog/book-de-vente-tactile-commerciaux-pme/book-de-vente-tactile-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/book-de-vente-tactile-commerciaux-pme/book-de-vente-tactile-hero.webp';

export const metadata: Metadata = {
  title: 'Book de vente tactile : le guide complet pour vos commerciaux',
  description:
    'Un book de vente tactile est un outil digital interactif qui centralise tous les supports de vente sur tablette, permettant aux commerciaux de présenter, personnaliser et argumenter sans jamais perdre le fil. Guide complet pour PME.',
  keywords:
    'book de vente tactile, book de vente pour commerciaux, book de vente digital, outil de vente tactile PME, sales enablement PME, support de vente tablette, argumentaire commercial digital',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/book-de-vente-tactile-commerciaux-pme',
  },
  openGraph: {
    title: 'Book de vente tactile : le guide complet pour vos commerciaux',
    description:
      'Un book de vente tactile est un outil digital interactif qui centralise tous les supports de vente sur tablette. Créez le vôtre sans dépenser 10K€ en logiciels.',
    url: 'https://www.laurentserre.com/blog/book-de-vente-tactile-commerciaux-pme',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: 'Commercial présentant un book de vente tactile sur tablette lors d\'un rendez-vous client en PME',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book de vente tactile : le guide complet pour vos commerciaux',
    description:
      'Un book de vente tactile est un outil digital interactif qui centralise tous les supports de vente sur tablette. Créez le vôtre sans dépenser 10K€ en logiciels.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/carrousel-book-de-vente-tactile';

const carouselImages = [
  { src: `${carouselPrefix}/01-cover.webp`, alt: 'Cover : Book de vente tactile', index: 0 },
  { src: `${carouselPrefix}/02-constat.webp`, alt: 'Le constat : un commercial improvise en rendez-vous', index: 1 },
  { src: `${carouselPrefix}/03-fouille.webp`, alt: 'Le commercial fouille dans ses mails pendant le rdv', index: 2 },
  { src: `${carouselPrefix}/04-cliente-perdue.webp`, alt: 'La cliente perd le fil face à un commercial désorganisé', index: 3 },
  { src: `${carouselPrefix}/05-debrief-rate.webp`, alt: 'DИbrief : la vente Иtait bonne sur le fond mais pas sur la forme', index: 4 },
  { src: `${carouselPrefix}/06-laurent-propose.webp`, alt: 'Laurent propose le book de vente tactile', index: 5 },
  { src: `${carouselPrefix}/07-book-presentation.webp`, alt: 'Le book de vente tactile : tout est centralisИ sur tablette', index: 6 },
  { src: `${carouselPrefix}/08-avant-apres.webp`, alt: 'Avant/AprХs : sans book puis avec book en rendez-vous', index: 7 },
  { src: `${carouselPrefix}/09-rdv-reussi.webp`, alt: 'Rendez-vous rИussi : le commercial prИsente avec aisance', index: 8 },
  { src: `${carouselPrefix}/10-3-approches.webp`, alt: 'Les 3 approches pour crИer son book sans se ruiner', index: 9 },
  { src: `${carouselPrefix}/11-adoption-equipe.webp`, alt: 'L\'adoption par l\'Иquipe : la clИ du succХs', index: 10 },
  { src: `${carouselPrefix}/12-cta.webp`, alt: 'CTA : Commencez par un diagnostic offert sur laurentserre.com', index: 11 },
];

export default function BookDeVenteTactilePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Book de vente tactile : le guide complet pour vos commerciaux',
    description:
      'Un book de vente tactile est un outil digital interactif qui centralise tous les supports de vente sur tablette, permettant aux commerciaux de présenter, personnaliser et argumenter sans jamais perdre le fil.',
    image: heroImageAbsolute,
    datePublished: '2026-06-18',
    dateModified: '2026-06-18',
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
      '@id': 'https://www.laurentserre.com/blog/book-de-vente-tactile-commerciaux-pme',
    },
    articleSection: 'Performance commerciale / Sales enablement',
    keywords: [
      'book de vente tactile',
      'book de vente pour commerciaux',
      'outil de vente tactile PME',
      'sales enablement PME',
      'argumentaire commercial digital',
      'support de vente tablette',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "C'est quoi un book de vente tactile ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Un book de vente tactile est un outil digital interactif qui centralise tous les supports de vente sur tablette, permettant aux commerciaux de présenter, personnaliser et argumenter sans jamais perdre le fil.",
        },
      },
      {
        '@type': 'Question',
        name: "Quelle différence entre un playbook commercial et un book de vente tactile ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Le playbook est la méthode : le guide de la relation client, les étapes de vente, les scripts. Le book de vente tactile est l'outil : le support digital qu'on déroule pendant le rendez-vous. L'un ne remplace pas l'autre, ils se complètent.",
        },
      },
      {
        '@type': 'Question',
        name: "Comment créer un book de vente tactile sans dépenser 10 000 euros ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Avec Google Slides, Canva ou un PDF interactif sur tablette. L'approche dépend de votre budget : zéro euro avec Google Slides, 50 euros par mois avec Canva Pro, ou 500 euros avec un designer freelance. Pas besoin d'éditeurs spécialisés à 10K€.",
        },
      },
      {
        '@type': 'Question',
        name: "Quels contenus mettre dans un book de vente tactile ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Cinq contenus indispensables : une page de diagnostic client, une présentation de l'offre en 3-4 slides maximum, des études de cas ou témoignages, un simulateur de ROI ou de prix, et une proposition simplifiée prête à signer. Le tout en une dizaine de slides.",
        },
      },
      {
        '@type': 'Question',
        name: "Book de vente tactile ou catalogue papier : lequel choisir ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Le book tactile remplace avantageusement le catalogue papier : il se met à jour en un clic, s'adapte au profil client en temps réel, et permet de capturer les questions et objections pendant l'échange.",
        },
      },
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.laurentserre.com/' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.laurentserre.com/blog' },
              { '@type': 'ListItem', position: 3, name: 'Book de vente tactile', item: 'https://www.laurentserre.com/blog/book-de-vente-tactile-commerciaux-pme' },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-mint-green transition-colors">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-mint-green transition-colors">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-ink font-medium" aria-current="page">Book de vente tactile</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Performance commerciale / Sales enablement</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Book de vente tactile : vos commerciaux improvisent chaque rendez-vous (et ça vous coûte cher)
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-06-18">18 juin 2026</time>
              <span>•</span>
              <span>9 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Commercial présentant un book de vente tactile sur tablette lors d'un rendez-vous client dans une PME"
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
          {/* AuthorCard top */}
          <div className="mb-8">
            <AuthorCard />
          </div>

          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Vos commerciaux improvisent chaque rendez-vous parce qu&apos;ils n&apos;ont pas d&apos;outil qui centralise leur discours, leurs arguments, leurs preuves. Le book de vente tactile change ça : tout tient sur une tablette, se personnalise en un clic, et donne aux commerciaux une structure qui ne les enferme pas. Ce guide vous montre comment en créer un sans dépenser 10 000 euros en logiciels.
            </p>
          </div>

          {/* Carrousel BD — accroche visuelle */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Book de vente tactile en action
            </p>
            <p className="text-sm text-amber-700 mb-5">
              12 planches illustrées du avant/après, du constat à la solution.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Book de vente tactile"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-book-de-vente-tactile.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (12 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA diagnostic */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Vous ne savez pas par o√π commencer pour structurer vos rendez-vous commerciaux ? Faites un diagnostic offert →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#probleme" className="text-mint-green hover:underline">Le vrai problème : vos commerciaux improvisent chaque rendez-vous</a></li>
              <li><a href="#playbook-vs-book" className="text-mint-green hover:underline">Playbook vs Book de vente tactile : ne confondez pas la méthode et l&apos;outil</a></li>
              <li><a href="#contenus" className="text-mint-green hover:underline">Les 5 contenus indispensables dans un book de vente qui convertit</a></li>
              <li><a href="#creer" className="text-mint-green hover:underline">Comment créer un book de vente efficace sans dépenser 10 000 euros</a></li>
              <li><a href="#erreurs" className="text-mint-green hover:underline">Les 3 erreurs qui plombent l&apos;adoption par l&apos;équipe</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">FAQ Book de vente tactile</a></li>
            </ul>
          </div>

          {/* Introduction */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Il y a trois semaines, je débriefe avec Thomas, DirCo d&apos;une PME industrielle de 40 personnes. Il me dit :
          </p>

          <p className="mb-8">
            « Mes commerciaux sont bons. Ils connaissent le produit. Mais en rendez-vous, je ne les retrouve pas. L&apos;un sort son iPhone et cherche une photo dans sa galerie. L&apos;autre imprime un PDF la veille. Le troisième improvise au fil de l&apos;eau. »
          </p>

          <p className="mb-8">
            Je lui demande : « Et le client, il voit quoi, lui ? »
          </p>

          <p className="mb-8">
            Il marque un silence. Puis : « Il voit trois personnes différentes qui lui vendent trois choses différentes. »
          </p>

          <p className="mb-8">
            Thomas vient de nommer le problème que je vois dans 80% des PME que j&apos;accompagne. Ce n&apos;est pas un problème de compétence. C&apos;est un problème d&apos;outil. Les commerciaux n&apos;ont rien de tangible à dérouler pendant le rendez-vous. Alors ils bricolent. Et le client sent le bricolage.
          </p>

          {/* H2 : Le vrai problème */}
          <h2 id="probleme" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Le vrai problème : vos commerciaux improvisent chaque rendez-vous</h2>

          <p className="mb-8">
            Je vais être direct : si vos commerciaux n&apos;ont pas de support structuré pour leurs rendez-vous, vous perdez des ventes. Pas parce qu&apos;ils sont mauvais. Parce qu&apos;ils sont seuls face au client avec des bouts de contenu éparpillés.
          </p>

          <p className="mb-8">
            Regardez ce qui se passe concrètement dans la voiture avant un rendez-vous. Le commercial ouvre son téléphone. Il cherche la proposition dans ses mails. Il trouve une vieille présentation. Il vérifie les prix sur son ERP. Il espère que rien n&apos;a changé depuis la dernière fois.
          </p>

          <p className="mb-8">
            Pendant le rendez-vous, il montre un PDF sur son écran pliable. Il doit faire défiler des pages pour trouver l&apos;info que le client demande. Le client attend. Le moment est gâché.
          </p>

          <p className="mb-8">
            Je vois des équipes perdre 30 à 40% de leur impact commercial simplement parce que le support ne suit pas. Le message est bon, l&apos;offre est bonne, mais la présentation est désorganisée. Le client retient le désordre avant de retenir l&apos;offre.
          </p>

          <p className="mb-8">
            Le problème n&apos;est pas la qualité de vos commerciaux. Le problème c&apos;est qu&apos;on leur demande d&apos;être bons avec des outils qui datent de 2005.
          </p>

          {/* H2 : Playbook vs Book */}
          <h2 id="playbook-vs-book" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Playbook vs Book de vente tactile : ne confondez pas la méthode et l&apos;outil</h2>

          <p className="mb-8">
            Une confusion revient tout le temps : « On a déjà un playbook commercial, pourquoi on aurait besoin d&apos;un book de vente tactile ? »
          </p>

          <p className="mb-8">
            La différence est simple. Le playbook commercial, c&apos;est la méthode : les étapes de la vente, les scripts d&apos;appel, les questions de qualification, les manières de répondre aux objections. C&apos;est ce qu&apos;on apprend et ce qu&apos;on répète entre les rendez-vous.
          </p>

          <p className="mb-8">
            Le book de vente tactile, c&apos;est l&apos;outil qu&apos;on déroule pendant le rendez-vous. C&apos;est le support visuel, interactif, que le commercial et le client regardent ensemble sur une tablette.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Un playbook sans book tactile, c&apos;est une méthode sans mise en sceànne.</p>

          <p className="mb-8">
            Vos commerciaux savent quoi dire, mais ils ne savent pas comment le montrer. Le playbook leur donne les répliques, le book leur donne le décor.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Un book tactile sans playbook, c&apos;est un beau support qui ne sert à rien.</p>

          <p className="mb-8">
            Si le commercial n&apos;a pas la méthode derrière, le book devient un catalogue amélioré. Il clique, il montre, mais il ne vend pas. Les deux sont complémentaires, pas interchangeables.
          </p>

          <p className="mb-8">
            Quand je travaille avec une équipe, je commence toujours par le playbook : clarifier le message, poser la méthode. Ensuite seulement, on construit le book de vente tactile qui met en scène ce message.
          </p>

          {/* H2 : 5 contenus */}
          <h2 id="contenus" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les 5 contenus indispensables dans un book de vente qui convertit</h2>

          <p className="mb-8">
            Beaucoup de books de vente que je vois sont en fait des présentations institutionnelles déguisées. « Notre entreprise, notre histoire, nos valeurs, notre équipe. » C&apos;est le meilleur moyen de perdre l&apos;attention du client avant la troisième slide.
          </p>

          <p className="mb-8">
            Un book de vente tactile qui convertit contient cinq choses, pas une de plus.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">1. Un diagnostic client interactif.</p>
          <p className="mb-8">
            La première slide n&apos;est pas « qui nous sommes ». C&apos;est « vous, votre situation, votre problème ». Le commercial pose la tablette et remplit avec le client un diagnostic en 3-4 questions. C&apos;est ce qui personnalise toute la suite. Sans cette étape, le book est un catalogue.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">2. Une présentation de l&apos;offre en 3-4 slides maximum.</p>
          <p className="mb-8">
            Pas cinquante slides. Trois ou quatre. Une slide par bénéfice client. Chaque slide répond à la question que le client vient de poser pendant le diagnostic. Le book devient un miroir de sa situation, pas un argumentaire préfabriqué.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">3. Des cas clients visuels et parlants.</p>
          <p className="mb-8">
            Pas des logos alignés. Un cas par slide avec : la situation de départ, ce qu&apos;on a fait, le résultat chiffré. Si possible un témoignage. Le client doit pouvoir se projeter. « Si ça a marché pour eux, ça peut marcher pour moi. »
          </p>

          <p className="mb-4 font-semibold text-blue-ink">4. Un simulateur de ROI ou de prix.</p>
          <p className="mb-8">
            C&apos;est la slide qui transforme. Un simulateur simple, que le commercial remplit avec le client : combien vous coûte le problème qu&apos;on résout, combien rapporte la solution. Pas besoin d&apos;être développeur : trois champs dans Google Slides ou un tableur intégré suffisent.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">5. Une proposition simplifiée prête à signer.</p>
          <p className="mb-8">
            La dernieère slide est une proposition en une page. Le commercial la remplit pendant le rendez-vous, le client la signe sur la tablette. Pas de devis à envoyer le lendemain, pas de proposition à finaliser au bureau. La vente se conclut dans le book.
          </p>

          <p className="mb-8">
            Je vois des équipes doubler leur taux de closing juste en ajoutant le diagnostic interactif et la proposition prête à signer. Le reste, c&apos;est du bonus.
          </p>

          {/* Mid-article CTA Bootcamp */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Vous voulez construire un playbook ET un book de vente tactile pour votre équipe ?
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Le Bootcamp commercial intensif de Laurent Serre vous accompagne pas à pas pour structurer votre message, vos supports et vos rituels de performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/bootcamp"
                className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
              >
                Découvrir le Bootcamp →
              </Link>
              <Link
                href="/diagnostic"
                className="inline-flex items-center gap-2 text-teal-600 text-sm font-medium px-5 py-2.5 hover:bg-teal-50 rounded-full transition-colors"
              >
                Faire un diagnostic offert →
              </Link>
            </div>
          </div>

          {/* H2 : 3 approches budget */}
          <h2 id="creer" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Comment créer un book de vente efficace sans dépenser 10 000 euros</h2>

          <p className="mb-8">
            Les éditeurs de logiciels de sales enablement vous vendront des solutions à 10 000, 20 000, 50 000 euros par an. Pour une PME, c&apos;est hors-sol. Voici trois approches qui fonctionnent, classées par budget.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Approche 1 : 0 euro Google Slides version tactile</p>
          <p className="mb-8">
            Vous créez votre book dans Google Slides en mode 4:3 ou 16:9. Chaque commercial l&apos;ouvre sur sa tablette en mode présentation. Le diagnostic interactif se fait avec des questions posées à l&apos;oral. Le simulateur de ROI : une feuille Google Sheets ouverte à côté. La proposition : un modèle de document Google Docs que le commercial remplit et fait signer avec une app de signature électronique gratuite.
          </p>
          <p className="mb-8">
            Avantage : gratuit, collaboratif, se met a jour en temps réel. Inconvénient : moins fluide, demande un peu de discipline pour que tout reste cohérent.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Approche 2 : 40-50 euros par mois Canva Pro + tablette</p>
          <p className="mb-8">
            Vous concevez votre book dans Canva, exportable en PDF interactif. Les liens cliquables, les vidéos intégrées, les animations simples. Le commercial projette sur sa tablette en mode plein écran. Canva permet aussi de créer des versions personnalisables par profil client.
          </p>
          <p className="mb-8">
            Avantage : design pro sans designer, interactif, facile à mettre à jour. Inconvénient : pas de CRM intégré, nécessite de former l&apos;équipe à Canva.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Approche 3 : 500 euros avec un designer freelance</p>
          <p className="mb-8">
            Vous investissez dans un book sur mesure conçu par un designer freelance sur une plateforme comme Malt ou Codeur. Vous obtenez un fichier Figma ou PowerPoint interactif, optimisé pour tablette, avec votre charte graphique. Le designer forme l&apos;équipe à la mise à jour.
          </p>
          <p className="mb-8">
            Avantage : qualité pro, sur mesure, réutilisable. Inconvénient : budget unique, nécessite de refaire appel pour les grosses évolutions.
          </p>

          <p className="mb-8">
            Mon conseil : commencez par l&apos;approche 1. Testez pendant un mois. Si ça tient et que l&apos;équipe adopte, passez à l&apos;approche 2 ou 3. Ne faites pas l&apos;inverse.
          </p>

          {/* H2 : 3 erreurs */}
          <h2 id="erreurs" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les 3 erreurs qui plombent l&apos;adoption par l&apos;équipe commerciale</h2>

          <p className="mb-8">
            J&apos;ai vu des dirigeants dépenser du temps et de l&apos;argent dans un book de vente tactile, pour que les commerciaux ne l&apos;utilisent jamais. Voici les trois erreurs les plus fréquentes.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Erreur 1 : Le book a été conçu sans les commerciaux.</p>
          <p className="mb-8">
            Le dirigeant et le marketing passent trois mois à créer le book parfait. Le jour de la livraison, les commerciaux regardent et disent : « C&apos;est beau, mais concrètement, je mets quoi dans l&apos;introduction ? » Ils n&apos;ont pas participé, donc le book ne répond pas à leurs vrais besoins. Solution : co-construire avec deux ou trois commerciaux dès le départ. Ils vous diront ce qui est utile et ce qui ne l&apos;est pas.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Erreur 2 : Le book est trop long.</p>
          <p className="mb-8">
            Trente slides, quarante slides, un catalogue complet. Le commercial ne sait pas où trouver l&apos;info au bon moment. Il passe son temps à chercher. Le client s&apos;impatiente. La règle est simple : si vous ne pouvez pas le présenter en 10 slides, vous n&apos;avez pas assez simplifié votre message.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Erreur 3 : Pas de rituel d&apos;utilisation.</p>
          <p className="mb-8">
            Le livreur arrive avec les tablettes. On distribue. Et ensuite : rien. Pas d&apos;atelier de prise en main, pas de jeu de rôle, pas de débrief sur ce qui fonctionne. Le book devient un objet de décorum. Solution : prévoir un après-midi de formation-pratique, où chaque commercial présente le book à un collègue qui joue le client. Les bugs remontent, les blocages se lèvent.
          </p>

          <p className="mb-8">
            J&apos;ai accompagné une équipe qui avait un book magnifique, conçu par une agence. Personne ne l&apos;utilisait. On a passé une demi-journée a le retravailler avec les commerciaux. On est passé de 40 slides à 9. Résultat : 100% d&apos;adoption en deux semaines.
          </p>

          {/* FAQ */}
          <h2 id="faq" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">FAQ Book de vente tactile</h2>

          <div className="space-y-6 mb-8">
            <div>
              <p className="font-semibold text-blue-ink mb-1">C&apos;est quoi un book de vente tactile ?</p>
              <p className="text-gray-700">Un book de vente tactile est un outil digital interactif qui centralise tous les supports de vente sur tablette, permettant aux commerciaux de présenter, personnaliser et argumenter sans jamais perdre le fil.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Quelle différence entre un playbook commercial et un book de vente tactile ?</p>
              <p className="text-gray-700">Le playbook est la méthode : le guide de la relation client, les étapes de vente, les scripts. Le book de vente tactile est l&apos;outil : le support digital qu&apos;on déroule pendant le rendez-vous.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Comment créer un book de vente tactile sans dépenser 10 000 euros ?</p>
              <p className="text-gray-700">Avec Google Slides, Canva ou un PDF interactif sur tablette. L&apos;approche dépend de votre budget : zéro euro avec Google Slides, 50 euros par mois avec Canva Pro, ou 500 euros avec un designer freelance.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Quels contenus mettre dans un book de vente tactile ?</p>
              <p className="text-gray-700">Cinq contenus : un diagnostic client interactif, une présentation de l&apos;offre en 3-4 slides, des cas clients visuels, un simulateur de ROI, et une proposition simplifiée prête à signer.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-ink mb-1">Book de vente tactile ou catalogue papier : lequel choisir ?</p>
              <p className="text-gray-700">Le book tactile remplace avantageusement le catalogue papier : il se met à jour en un clic, s&apos;adapte au profil client en temps réel, et capture les questions pendant l&apos;échange.</p>
            </div>
          </div>

          {/* Pour aller plus loin */}
          <div className="mt-12 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/playbook-commercial-guide-pratique-terrain" className="text-mint-green hover:underline font-medium">
                  Playbook commercial : le guide pratique pour créer celui qui va vraiment être utilisé
                </Link>
                <span className="block text-gray-500 mt-0.5">Construire la méthode que vos commerciaux appliqueront.</span>
              </li>
              <li>
                <Link href="/blog/plan-prospection-commerciale-machine-leads-annee" className="text-mint-green hover:underline font-medium">
                  Plan de prospection commerciale : la machine à leads de l&apos;année
                </Link>
                <span className="block text-gray-500 mt-0.5">Alimenter le pipeline avant de le transformer.</span>
              </li>
              <li>
                <Link href="/blog/sales-enablement-pme-structurer-performance-commerciale" className="text-mint-green hover:underline font-medium">
                  Sales enablement PME : structurer sans se ruiner
                </Link>
                <span className="block text-gray-500 mt-0.5">Structurer la performance de votre équipe sans budget.</span>
              </li>
            </ul>
          </div>

          {/* CTA gradient final */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vos commerciaux perdent des ventes faute de support structuré ?</h3>
            <p className="mb-6">
              La plupart des dirigeants de PME pensent qu&apos;il faut un logiciel coûteux ou une agence pour créer un book de vente tactile qui tient la route. La réalité est plus simple : avec les bons contenus et la bonne méthode, vous pouvez construire un outil qui double votre impact commercial, pour le prix d&apos;un abonnement Canva. Un diagnostic offert permet de voir où ça coince vraiment dans votre cycle de vente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic offert
              </Link>
              <Link
                href="/bootcamp"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
              >
                Découvrir le Bootcamp commercial
              </Link>
            </div>
          </div>

          {/* Chute */}
          <p className="text-xl text-gray-700 font-semibold border-t border-gray-200 pt-8 mt-10">
            Le book de vente tactile n&apos;est pas un catalogue digital. C&apos;est un outil qui transforme la manière dont vos commerciaux se présentent, argumentent et concluent. Et comme pour tout outil, ce qui compte n&apos;est pas son prix, c&apos;est la discipline de l&apos;équipe à l&apos;utiliser.
          </p>
        </div>

        {/* AuthorCard bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <AuthorCard />
        </div>
      </article>

      {/* HubSpot Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d&apos;en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre cas mérite un échange plus direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>

      {/* Retour blog */}
      <section className="py-8 bg-primary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-mint-green hover:text-mint-green/80 transition-colors font-medium"
          >
            Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
