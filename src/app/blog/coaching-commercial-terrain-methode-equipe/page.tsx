import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const heroImage = '/images/blog/coaching-terrain-methode/coaching-terrain-methode-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/coaching-terrain-methode/coaching-terrain-methode-hero.webp';

export const metadata: Metadata = {
  title: 'Coaching commercial terrain : la méthode qui transforme vraiment les pratiques de votre équipe | Laurent Serre',
  description:
    'Les formations en salle ne changent presque rien aux pratiques. Le coaching terrain, oui, à condition de suivre une méthode précise en 4 temps. Découvrez le protocole qui transforme durablement une équipe commerciale.',
  keywords:
    'coaching commercial terrain, méthode coaching terrain, accompagnement terrain commercial, coaching terrain équipe commerciale, transformation équipe commerciale, protocole coaching terrain, coaching développement commercial',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/coaching-commercial-terrain-methode-equipe',
  },
  openGraph: {
    title: 'Coaching commercial terrain : la méthode qui transforme vraiment les pratiques de votre équipe',
    description:
      'Les formations en salle ne changent presque rien aux pratiques. Le coaching terrain, oui, à condition de suivre une méthode en 4 temps : observer, questionner, prioriser, répéter.',
    url: 'https://www.laurentserre.com/blog/coaching-commercial-terrain-methode-equipe',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: 'Un coach commercial expérimenté débriefe avec un commercial dans une voiture après un rendez-vous client',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching commercial terrain : la méthode qui transforme vraiment les pratiques de votre équipe',
    description:
      'Les formations en salle ne changent presque rien aux pratiques. Le coaching terrain, oui, à condition de suivre une méthode en 4 temps.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/carrousel-coaching-terrain-methode';

const carouselImages = [
  { src: `${carouselPrefix}/01-cover.webp`, alt: 'Cover : Coaching terrain, la méthode en 4 temps', index: 0 },
  { src: `${carouselPrefix}/02-scene-depart.webp`, alt: 'Le manager frustré : les formations n\'ont rien changé', index: 1 },
  { src: `${carouselPrefix}/03-observer.webp`, alt: 'Observer sans intervenir pendant le rendez-vous', index: 2 },
  { src: `${carouselPrefix}/04-debrief.webp`, alt: 'Débriefer en questionnant dans la voiture', index: 3 },
  { src: `${carouselPrefix}/05-priorite.webp`, alt: 'Une seule priorité par session', index: 4 },
  { src: `${carouselPrefix}/06-mise-situation.webp`, alt: 'Mise en situation : Stéphane joue le client', index: 5 },
  { src: `${carouselPrefix}/07-progres.webp`, alt: 'Progrès visible après 8 semaines', index: 6 },
  { src: `${carouselPrefix}/08-chute.webp`, alt: 'Le coaching terrain construit des réflexes durables', index: 7 },
  { src: `${carouselPrefix}/09-cta.webp`, alt: 'CTA : diagnostic gratuit coaching terrain', index: 8 },
];

export default function CoachingCommercialTerrainMethodePage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: 'Coaching commercial terrain : la méthode qui transforme vraiment les pratiques de votre équipe',
          description:
            'Les formations en salle ne changent presque rien aux pratiques. Le coaching terrain, oui, à condition de suivre une méthode en 4 temps : observer sans intervenir, débriefer en questionnant, travailler une priorité à la fois, répéter chaque semaine.',
          image: heroImageAbsolute,
          datePublished: '2026-06-01',
          dateModified: '2026-06-01',
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
            '@id': 'https://www.laurentserre.com/blog/coaching-commercial-terrain-methode-equipe',
          },
          articleSection: 'Coaching commercial / Management d\'équipe',
          keywords: [
            'coaching commercial terrain',
            'méthode coaching terrain',
            'accompagnement terrain commercial',
            'transformation équipe commerciale',
            'protocole coaching terrain',
          ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.laurentserre.com/blog/coaching-commercial-terrain-methode-equipe"
    },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/coaching-commercial-terrain-methode-equipe#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Temps 1 : Observer sans intervenir',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Première règle du coaching terrain : on ne corrige pas pendant l&apos;action. Quand vous êtes assis à côté d&apos;un commercial pendant un rendez-vous client, votre instinct vous dit d&apos;intervenir. Il va droit dans le mur. Il rate l&apos;objection. Il vend trop tôt. Vous voulez rattraper. Ne faites rien. Votre rôle, à ce moment-là, n&apos;est pas de sauver le rendez-vous. C&apos;est de regarder ce qui se passe vraiment. Pas ce que le commercial croit faire. Pas ce qu&apos;il vous a dit qu&ap',
            },
          },
          {
            '@type': 'Question',
            name: 'Temps 2 : Débriefer en questionnant, pas en listant',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le débrief, c&apos;est le moment où la plupart des managers tuent leur coaching. Ils sortent leur liste : « Tu n&apos;as pas fait ça, tu aurais dû faire ça, la prochaine fois tu feras ça. » Le commercial écoute, hoche la tête, et oublie tout dans la demi-heure. Pourquoi ? Parce qu&apos;il n&apos;a rien construit. On lui a donné des réponses à des questions qu&apos;il ne s&apos;est pas posées. Le bon débrief, c&apos;est l&apos;inverse. Le commercial trouve lui-même ce qu&apos;il doit améliorer. V',
            },
          },
          {
            '@type': 'Question',
            name: 'Temps 3 : Une seule priorité par session',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'C&apos;est l&apos;erreur la plus répandue. Le manager identifie trois, quatre, cinq points d&apos;amélioration. Il les donne tous en même temps. Le commercial repart avec une liste. Il n&apos;en applique aucun. Pourquoi ? Parce que changer un geste commercial demande de la répétition. Pas de la bonne intention. Si vous voulez qu&apos;un commercial pose des questions ouvertes, vous ne pouvez pas en même temps lui demander de mieux négocier, de mieux conclure et de mieux prospecter. C&apos;est tro',
            },
          },
          {
            '@type': 'Question',
            name: 'Temps 4 : Répéter à fréquence régulière',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le coaching terrain ne se fait pas en stage d&apos;une semaine. Il se fait à un rythme régulier, maintenu dans le temps. Le format que j&apos;ai vu fonctionner partout : une heure par semaine, par commercial. Pas plus. Pas d&apos;excuse de planning. Une heure, c&apos;est assez pour faire le point, travailler une mise en situation et définir l&apos;objectif de la semaine. Pas moins non plus. Trente minutes, c&apos;est trop court pour s&apos;installer dans le travail. À chaque séance : 5 minutes :',
            },
          },
          {
            '@type': 'Question',
            name: 'Cas concret : la transformation d&apos;une équipe en huit semaines',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'J&apos;accompagnais une PME de trente personnes, six commerciaux, un marché concurrentiel, des marges qui fondaient. Le directeur commercial avait tout essayé : formations, challenges, primes. Rien ne tenait. On a mis en place le protocole des 4 temps. Une heure par commercial, par semaine. Un seul levier à la fois, choisi ensemble. Premier constat : quatre des six commerciaux avaient le même défaut. Ils répondaient trop vite aux objections. Client disait « c&apos;est cher », ils sortaient une r',
            },
          },
          {
            '@type': 'Question',
            name: 'Les trois erreurs qui tuent le coaching terrain',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Je les vois chez presque tous mes clients. Si vous voulez que votre coaching marche, évitez-les. 1. Coacher comme un inspecteur Vous arrivez avec une grille d&apos;évaluation, vous notez chaque écart, vous donnez une note. Le commercial se sent jugé, pas accompagné. Il se ferme. Le coaching n&apos;est pas un contrôle. C&apos;est un entraînement. L&apos;inspecteur regarde ce qui ne va pas. L&apos;entraîneur regarde ce qu&apos;on peut améliorer. La différence est dans l&apos;intention, et le comme',
            },
          }
        ],
      },
  
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Coaching commercial terrain', 'item': 'https://www.laurentserre.com/blog/coaching-commercial-terrain-methode-equipe' },
        ],
      }
],
};

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

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
              <li className="text-blue-ink font-medium" aria-current="page">Coaching terrain méthode</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Coaching commercial / Management d&apos;équipe</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Coaching commercial terrain : la méthode qui transforme vraiment les pratiques de votre équipe
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-06-01">1 juin 2026</time>
              <span>•</span>
              <span>9 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Un coach commercial expérimenté débriefe avec un commercial dans une voiture après un rendez-vous client"
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
            <p className="text-sm font-semibold text-mint-green mb-2">✨ Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Les formations en salle ne changent presque rien aux pratiques. Le coaching terrain, oui, à condition de suivre une méthode en 4 temps : observer sans intervenir, débriefer en questionnant, travailler une seule priorité à la fois, répéter chaque semaine. Cet article vous donne le protocole concret, avec des exemples de terrain.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Coaching terrain mode d&apos;emploi
            </p>
            <p className="text-sm text-amber-700 mb-5">
              9 planches illustrées, la méthode en action de A à Z.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Coaching terrain méthode"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-playbook-commercial-terrain.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (9 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA diagnostic */}
          <div className="mb-8 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vous ne savez pas si votre équipe est prête pour le coaching terrain ? Faites un diagnostic gratuit →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#temps1" className="text-mint-green hover:underline">Temps 1 : Observer sans intervenir</a></li>
              <li><a href="#temps2" className="text-mint-green hover:underline">Temps 2 : Débriefer en questionnant, pas en listant</a></li>
              <li><a href="#temps3" className="text-mint-green hover:underline">Temps 3 : Une seule priorité par session</a></li>
              <li><a href="#temps4" className="text-mint-green hover:underline">Temps 4 : Répéter à fréquence régulière</a></li>
              <li><a href="#cas" className="text-mint-green hover:underline">Cas concret : transformation d&apos;une équipe en 8 semaines</a></li>
              <li><a href="#erreurs" className="text-mint-green hover:underline">Les 3 erreurs qui tuent le coaching terrain</a></li>
              <li><a href="#demarrer" className="text-mint-green hover:underline">Par où commencer concrètement demain</a></li>
            </ul>
          </div>

          {/* Contenu */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Je suis dans la voiture avec Julien, un directeur commercial qui vient d&apos;observer son commercial chez un client.
          </p>

          <p className="mb-8">
            Il me dit : « Franchement, il sait tout. Il a eu la formation. Il connaît la théorie. Mais en situation, il fait l&apos;inverse. Ça m&apos;énerve. »
          </p>

          <p className="mb-8">
            Je lui demande : « Qu&apos;est-ce que tu lui as dit après ? »
          </p>

          <p className="mb-8">
            « Je lui ai listé ce qu&apos;il devait changer. Trois points. Quatre, même. »
          </p>

          <p className="mb-8">
            « Et tu penses qu&apos;il va les appliquer ? »
          </p>

          <p className="mb-8">
            Silence.
          </p>

          <p className="mb-8">
            Julien sait que non. Il est déjà passé par là. Le commercial va faire un effort pendant trois jours, puis retomber dans ses habitudes. Non par mauvaise volonté. Parce qu&apos;on n&apos;apprend pas un geste en l&apos;entendant une fois. On l&apos;apprend en le répétant, en se trompant, en se faisant corriger, en recommençant.
          </p>

          <p className="mb-8">
            Ça s&apos;appelle du coaching terrain. Et ça marche. Mais pas comme on croit.
          </p>

          <p className="mb-8">
            Beaucoup de managers imaginent que coacher, c&apos;est dire aux gens ce qu&apos;ils doivent faire. C&apos;est l&apos;inverse. Coacher, c&apos;est créer les conditions pour qu&apos;ils trouvent eux-mêmes ce qui marche. Et ça demande une méthode.
          </p>

          <p className="mb-8">
            En vingt ans, j&apos;ai vu une seule approche tenir la route sur la durée. Je l&apos;appelle le protocole des 4 temps. Le voici.
          </p>

          {/* Temps 1 */}
          <h2 id="temps1" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Temps 1 : Observer sans intervenir</h2>

          <p className="mb-8">
            Première règle du coaching terrain : on ne corrige pas pendant l&apos;action.
          </p>

          <p className="mb-8">
            Quand vous êtes assis à côté d&apos;un commercial pendant un rendez-vous client, votre instinct vous dit d&apos;intervenir. Il va droit dans le mur. Il rate l&apos;objection. Il vend trop tôt. Vous voulez rattraper.
          </p>

          <p className="mb-8">
            Ne faites rien.
          </p>

          <p className="mb-8">
            Votre rôle, à ce moment-là, n&apos;est pas de sauver le rendez-vous. C&apos;est de regarder ce qui se passe vraiment. Pas ce que le commercial croit faire. Pas ce qu&apos;il vous a dit qu&apos;il ferait. Ce qu&apos;il fait effectivement.
          </p>

          <p className="mb-8">
            Prenez des notes. Pas sur ce qu&apos;il fait mal. Sur ce qu&apos;il fait. La chronologie exacte. Ses mots. Le moment où tout a basculé. La réaction du client.
          </p>

          <p className="mb-8">
            Je suis allé avec un commercial qui disait « maîtriser la découverte ». En vingt minutes de rendez-vous, il avait posé quatre questions fermées, laissé le client répondre trois mots, et enchaîné sur sa démo. Il était sincère en disant qu&apos;il faisait de la découverte. Il croyait vraiment que poser des questions, c&apos;était ça.
          </p>

          <p className="mb-8">
            Si j&apos;étais intervenu en plein rendez-vous pour le recadrer, il se serait braqué. Il aurait passé le reste de l&apos;échange à douter de lui. Je n&apos;aurais rien appris de plus.
          </p>

          <p className="mb-8">
            En restant silencieux, j&apos;ai vu le vrai problème. Et au débrief du soir, je pouvais lui dire : « À 10h23, tu as posé ta première question fermée. Regarde dans tes notes à quel moment tu en as reposé une ouverte. » Il a compté. Sept minutes plus tard. Il s&apos;est rendu compte tout seul.
          </p>

          <p className="mb-8">
            C&apos;est ça, l&apos;observation qui sert. Pas un jugement. Un constat partageable.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Quelques règles :</p>
          <ul className="space-y-2 mb-8 text-gray-700">
            <li>Vous ne prenez pas la parole pendant le rendez-vous. Jamais. Sauf si la conversation part vraiment en vrille et que c&apos;est vous le responsable direct.</li>
            <li>Vous notez des faits, pas des impressions. Pas « il n&apos;a pas été bon », mais « il a interrompu le client deux fois, proposé un devis à la 14e minute, n&apos;a pas demandé le budget ».</li>
            <li>Vous ne partagez pas vos notes tout de suite. Pas dans la voiture en repartant. Pas dans le couloir. Le débrief, c&apos;est plus tard.</li>
          </ul>

          {/* Temps 2 */}
          <h2 id="temps2" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Temps 2 : Débriefer en questionnant, pas en listant</h2>

          <p className="mb-8">
            Le débrief, c&apos;est le moment où la plupart des managers tuent leur coaching.
          </p>

          <p className="mb-8">
            Ils sortent leur liste : « Tu n&apos;as pas fait ça, tu aurais dû faire ça, la prochaine fois tu feras ça. » Le commercial écoute, hoche la tête, et oublie tout dans la demi-heure. Pourquoi ? Parce qu&apos;il n&apos;a rien construit. On lui a donné des réponses à des questions qu&apos;il ne s&apos;est pas posées.
          </p>

          <p className="mb-8">
            Le bon débrief, c&apos;est l&apos;inverse. Le commercial trouve lui-même ce qu&apos;il doit améliorer. Vous, vous l&apos;aidez à voir clair.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">Je fonctionne toujours avec les trois mêmes questions, dans l&apos;ordre :</p>
          <ol className="mb-8 space-y-3 list-decimal ml-6">
            <li>« Qu&apos;est-ce qui s&apos;est bien passé selon toi ? » Pas une question de politesse. Le commercial doit nommer ce qu&apos;il a bien fait. Ça l&apos;oblige à avoir un regard lucide. S&apos;il dit « tout », il n&apos;a pas analysé. S&apos;il dit « rien », pareil.</li>
            <li>« Qu&apos;est-ce que tu ferais différemment si c&apos;était à refaire ? » C&apos;est la question clé. S&apos;il répond « je ne sais pas », vous avez un problème : il n&apos;a pas vu ce qui n&apos;a pas fonctionné. S&apos;il nomme quelque chose, même partiel, vous avez une base.</li>
            <li>« Qu&apos;est-ce que tu veux travailler pour la prochaine fois ? » Pas ce que vous voulez qu&apos;il travaille. Ce qu&apos;il veut travailler. Si c&apos;est cohérent avec ce que vous avez observé, vous avancez ensemble. Si c&apos;est à côté, vous pouvez dire : « Je comprends, mais j&apos;ai vu autre chose qui me semble plus prioritaire. On commence par ça ? »</li>
          </ol>

          <p className="mb-8">
            Ensuite seulement, vous ajoutez votre regard. Mais toujours en partant de ce qu&apos;il a identifié. « Tu as raison sur le questionnement. J&apos;ajouterais que tu as aussi laissé passer l&apos;objection sur le délai sans la creuser. »
          </p>

          <p className="mb-8">
            Un débrief qui dure plus de quinze minutes est un monologue déguisé.
          </p>

          <p className="mb-8">
            Exemple concret. J&apos;ai coaché un commercial qui concluait mal, pensait-il. Au débrief, il m&apos;a dit : « J&apos;ai du mal à demander la commande. »
          </p>

          <p className="mb-8">
            Je lui ai demandé : « Quand as-tu essayé de le faire dans ce rendez-vous ? »
          </p>

          <p className="mb-8">
            Il a réfléchi. « Après ma démo. »
          </p>

          <p className="mb-8">
            « Et avant la démo, qu&apos;as-tu fait pour préparer la conclusion ? »
          </p>

          <p className="mb-8">
            « Rien. J&apos;ai présenté, puis j&apos;ai demandé. »
          </p>

          <p className="mb-8">
            « Donc le problème, ce n&apos;est peut-être pas la conclusion. C&apos;est peut-être que tu n&apos;as pas construit de terrain pour conclure. »
          </p>

          <p className="mb-8">
            Il a vu le décalage tout seul. Je n&apos;ai pas eu à le lui dire.
          </p>

          {/* Temps 3 */}
          <h2 id="temps3" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Temps 3 : Une seule priorité par session</h2>

          <p className="mb-8">
            C&apos;est l&apos;erreur la plus répandue. Le manager identifie trois, quatre, cinq points d&apos;amélioration. Il les donne tous en même temps. Le commercial repart avec une liste. Il n&apos;en applique aucun.
          </p>

          <p className="mb-8">
            Pourquoi ? Parce que changer un geste commercial demande de la répétition. Pas de la bonne intention. Si vous voulez qu&apos;un commercial pose des questions ouvertes, vous ne pouvez pas en même temps lui demander de mieux négocier, de mieux conclure et de mieux prospecter. C&apos;est trop.
          </p>

          <p className="mb-8">
            Une priorité par session. Une seule.
          </p>

          <p className="mb-8">
            Pas par jour. Par session de coaching. Vous travaillez le même point pendant deux, trois, quatre séances s&apos;il le faut. Jusqu&apos;à ce que le nouveau réflexe soit ancré. Ensuite, vous passez au suivant.
          </p>

          <p className="mb-8">
            Comment choisir la priorité ? Le commercial et vous êtes d&apos;accord. Pas vous tout seul. Pas lui tout seul. Vous regardez vos observations, vous confrontez, et vous décidez ensemble. Si vous n&apos;êtes pas d&apos;accord, la priorité, c&apos;est d&apos;en discuter jusqu&apos;à trouver un terrain commun.
          </p>

          <p className="mb-8">
            Chez un client, j&apos;ai passé six séances sur le même levier : commencer le rendez-vous par une question ouverte plutôt qu&apos;une présentation. Le commercial avait vingt ans de métier. Son réflexe était profond. Ça a pris six semaines pour qu&apos;il pose naturellement sa question avant de se présenter. Six séances. Un seul levier.
          </p>

          <p className="mb-8">
            Au bout, son taux de transformation a grimpé. Pas parce que j&apos;avais une méthode secrète. Parce qu&apos;on n&apos;a pas changé de cible en cours de route.
          </p>

          {/* Temps 4 */}
          <h2 id="temps4" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Temps 4 : Répéter à fréquence régulière</h2>

          <p className="mb-8">
            Le coaching terrain ne se fait pas en stage d&apos;une semaine. Il se fait à un rythme régulier, maintenu dans le temps.
          </p>

          <p className="mb-8">
            Le format que j&apos;ai vu fonctionner partout : une heure par semaine, par commercial. Pas plus. Pas d&apos;excuse de planning. Une heure, c&apos;est assez pour faire le point, travailler une mise en situation et définir l&apos;objectif de la semaine.
          </p>

          <p className="mb-8">
            Pas moins non plus. Trente minutes, c&apos;est trop court pour s&apos;installer dans le travail.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">À chaque séance :</p>
          <ul className="space-y-2 mb-8 text-gray-700">
            <li>5 minutes : retour sur la semaine écoulée. Qu&apos;est-ce qui a marché ? Qu&apos;est-ce qui a bloqué ?</li>
            <li>30 minutes : mise en situation. Je joue le client, le commercial répète. On corrige, on refait.</li>
            <li>10 minutes : débrief de la mise en situation. Qu&apos;est-ce qu&apos;il en retient ?</li>
            <li>5 minutes : fixation de l&apos;objectif pour la semaine. Un seul point à surveiller.</li>
          </ul>

          <p className="mb-8">
            Pas d&apos;écran. Pas de présentation. Pas de rapport à lire. Juste la pratique.
          </p>

          <p className="mb-8">
            Le jour de la séance doit être le même chaque semaine. Pas « on verra selon les agendas ». Le mardi 10h, par exemple. C&apos;est fixe. Ça crée un rythme. Le commercial sait qu&apos;il va être mis en situation. Il prépare sa semaine en conséquence.
          </p>

          <p className="mb-8">
            Au bout de huit à douze séances, les résultats commencent à se voir. Pas avant. Parce que ça prend au moins deux mois pour changer un réflexe. Certains y arrivent plus tôt, mais ne comptez pas dessus. Le coaching terrain est un investissement de temps, pas un raccourci.
          </p>

          {/* Mid-article CTA Diagnostic */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-green/20 border border-teal-200/40 rounded-2xl p-6 my-8">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              🎯 Vous voulez voir si votre équipe est prête ?
            </p>
            <p className="text-sm text-teal-700 mb-4">
              Un diagnostic gratuit d&apos;une demi-journée permet d&apos;identifier les vrais freins. Pas de méthode toute faite, pas de promesses en l&apos;air.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Demander un diagnostic gratuit →
            </Link>
          </div>

          {/* Cas concret */}
          <h2 id="cas" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Cas concret : la transformation d&apos;une équipe en huit semaines</h2>

          <p className="mb-8">
            J&apos;accompagnais une PME de trente personnes, six commerciaux, un marché concurrentiel, des marges qui fondaient. Le directeur commercial avait tout essayé : formations, challenges, primes. Rien ne tenait.
          </p>

          <p className="mb-8">
            On a mis en place le protocole des 4 temps. Une heure par commercial, par semaine. Un seul levier à la fois, choisi ensemble.
          </p>

          <p className="mb-8">
            Premier constat : quatre des six commerciaux avaient le même défaut. Ils répondaient trop vite aux objections. Client disait « c&apos;est cher », ils sortaient une remise. Client disait « je vais réfléchir », ils laissaient tomber.
          </p>

          <p className="mb-8">
            On a travaillé ça. Semaine après semaine. Mise en situation. Correction. Répétition.
          </p>

          <p className="mb-8">
            À la semaine 4, un commercial m&apos;a dit : « J&apos;ai eu un client qui m&apos;a dit que c&apos;était trop cher. Je lui ai demandé par rapport à quoi. Je n&apos;ai jamais fait ça avant. » Il avait posé une question. Ce n&apos;était pas encore un réflexe, mais il avait franchi le pas.
          </p>

          <p className="mb-8">
            À la semaine 8, quatre commerciaux sur six traitaient les objections au lieu de les subir. Le taux de transformation avait gagné cinq points. Pas un miracle. Huit semaines de travail régulier.
          </p>

          <p className="mb-8">
            Le directeur commercial m&apos;a dit : « J&apos;aurais dû faire ça depuis le début. »
          </p>

          <p className="mb-8">
            Oui. Mais tout le monde croit qu&apos;il faut une méthode complexe. La vérité, c&apos;est que le coaching terrain se résume à quatre temps. Observer. Questionner. Prioriser. Répéter. Le reste, c&apos;est la discipline de tenir dans la durée.
          </p>

          {/* Erreurs */}
          <h2 id="erreurs" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les trois erreurs qui tuent le coaching terrain</h2>

          <p className="mb-8">
            Je les vois chez presque tous mes clients. Si vous voulez que votre coaching marche, évitez-les.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">1. Coacher comme un inspecteur</p>
          <p className="mb-8">
            Vous arrivez avec une grille d&apos;évaluation, vous notez chaque écart, vous donnez une note. Le commercial se sent jugé, pas accompagné. Il se ferme.
          </p>
          <p className="mb-8">
            Le coaching n&apos;est pas un contrôle. C&apos;est un entraînement. L&apos;inspecteur regarde ce qui ne va pas. L&apos;entraîneur regarde ce qu&apos;on peut améliorer. La différence est dans l&apos;intention, et le commercial la sent immédiatement.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">2. Vouloir tout changer en même temps</p>
          <p className="mb-8">
            Vous identifiez cinq axes de progression. Vous les donnez tous. Le commercial fait un effort dispersé, ne progresse sur rien, et se décourage.
          </p>
          <p className="mb-8">
            La priorisation n&apos;est pas une perte de temps. C&apos;est le seul chemin qui marche. Un point après l&apos;autre. Accepter la lenteur apparente pour aller plus vite au bout.
          </p>

          <p className="mb-4 font-semibold text-blue-ink">3. Sauter des séances</p>
          <p className="mb-8">
            « Cette semaine, on n&apos;a pas le temps. On reporte. » Puis la semaine d&apos;après non plus. Le rythme est cassé. Le commercial perd le fil.
          </p>
          <p className="mb-8">
            La régularité est plus importante que l&apos;intensité. Une heure par semaine, quoi qu&apos;il arrive. Même si le commercial pense qu&apos;il n&apos;a pas besoin. Même si vous êtes débordé. C&apos;est le rythme qui construit le changement, pas le contenu de chaque séance.
          </p>

          {/* Démarrer */}
          <h2 id="demarrer" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Par où commencer concrètement demain</h2>

          <p className="mb-8">
            Si vous voulez tester le coaching terrain sans tout déployer, voici les trois actions les plus simples :
          </p>

          <ol className="mb-8 space-y-3 list-decimal ml-6">
            <li>Choisissez un commercial volontaire. Pas celui qui résiste le plus. Celui qui est ouvert au retour. Commencez par lui. Le reste de l&apos;équipe suivra en voyant les résultats.</li>
            <li>Bloquez une heure fixe par semaine. Le même créneau, le même jour. Pas négociable. Pour vous et pour lui.</li>
            <li>Observez un seul rendez-vous. Pas deux. Pas trois. Un. Prenez des notes sans rien dire. Le soir, posez les trois questions.</li>
          </ol>

          <p className="mb-8">
            Si vous faites ça pendant quatre semaines, vous aurez déjà changé quelque chose. C&apos;est plus efficace que la plupart des plans de coaching qu&apos;on voit dans les entreprises.
          </p>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">📖 Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/coaching-commercial-terrain-5-leviers-transformation-equipe" className="text-mint-green hover:underline font-medium">
                  Coaching commercial terrain : les 5 leviers qui transforment durablement une équipe
                </Link>
                <span className="block text-gray-500 mt-0.5">Les principes fondamentaux du coaching terrain.</span>
              </li>
              <li>
                <Link href="/blog/coaching-commercial-diagnostic-ecoute" className="text-mint-green hover:underline font-medium">
                  Ce n&apos;est pas un problème de motivation, c&apos;est un problème de diagnostic
                </Link>
                <span className="block text-gray-500 mt-0.5">L&apos;écoute avant le coaching.</span>
              </li>
              <li>
                <Link href="/blog/coaching-developpement-commercial-guide-complet-pme" className="text-mint-green hover:underline font-medium">
                  Coaching développement commercial : le guide complet pour dirigeants PME
                </Link>
                <span className="block text-gray-500 mt-0.5">Tout savoir avant d&apos;investir dans un coaching.</span>
              </li>
            </ul>
          </div>

          {/* CTA gradient final */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez savoir si votre équipe est prête pour le coaching terrain ?</h3>
            <p className="mb-6">
              Beaucoup de managers pensent qu&apos;il faut encore une formation. Le vrai levier est ailleurs : un accompagnement qui transforme les pratiques sur le terrain. Un diagnostic gratuit d&apos;une demi-journée permet de voir où ça coince vraiment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors"
              >
                Demander un diagnostic coaching gratuit
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
            La formation apporte des connaissances. Le coaching terrain construit des réflexes. La méthode tient en quatre temps : observer sans intervenir, débriefer en questionnant, travailler une priorité à la fois, répéter chaque semaine. Le résultat n&apos;est pas immédiat, mais il dure.
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
            ← Tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
