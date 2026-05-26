import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';

const heroImage = '/images/blog/acheteurs-b2b-70-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/acheteurs-b2b-70-hero.webp';

export const metadata: Metadata = {
  title: '70% des acheteurs B2B ne veulent plus parler aux commerciaux, et c\'est une bonne nouvelle | Laurent Serre',
  description:
    'Gartner confirme : 70% des acheteurs B2B préfèrent une expérience 100% digitale sans commercial. Mais ce n\'est pas un rejet du conseil , c\'est un rejet du mauvais commercial. Analyse des chiffres et leçons terrain.',
  keywords:
    'acheteurs B2B, comportement acheteur B2B, Gartner CSO, vente B2B, transformation commerciale, prospection B2B, autonomie acheteur, digital commerce',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux',
  },
  openGraph: {
    title: '70% des acheteurs B2B ne veulent plus parler aux commerciaux, et c\'est une bonne nouvelle',
    description:
      'Gartner confirme : 70% des acheteurs B2B préfèrent une expérience 100% digitale sans commercial. Analyse des chiffres et leçons terrain.',
    url: 'https://www.laurentserre.com/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: '70% des acheteurs B2B ne veulent plus parler aux commerciaux - données Gartner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '70% des acheteurs B2B ne veulent plus parler aux commerciaux, et c\'est une bonne nouvelle',
    description:
      'Gartner confirme : 70% des acheteurs B2B préfèrent une expérience 100% digitale sans commercial. Analyse des chiffres et leçons terrain.',
    images: [heroImageAbsolute],
  },
};

export default function AcheteursB2BPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '70% des acheteurs B2B ne veulent plus parler aux commerciaux, et c\'est une bonne nouvelle',
    description:
      'Gartner confirme : 70% des acheteurs B2B préfèrent une expérience 100% digitale sans commercial. Mais ce n\'est pas un rejet du conseil , c\'est un rejet du mauvais commercial. 7 data points Gartner sourcés et analyse terrain.',
    image: heroImageAbsolute,
    datePublished: '2026-05-26',
    dateModified: '2026-05-26',
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
      '@id': 'https://www.laurentserre.com/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux',
    },
    articleSection: 'Comportement acheteur B2B / transformation commerciale',
    keywords: [
      'acheteurs B2B',
      'comportement acheteur B2B',
      'Gartner CSO',
      'vente B2B',
      'prospection B2B',
      'autonomie acheteur',
      'digital commerce',
    ],
  };

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Fil d'Ariane */}
        <nav className="mb-8 text-sm" aria-label="Fil d'Ariane">
          <Link href="/" className="text-mint-green hover:text-mint-green/80 transition-colors">
            Accueil
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors">
            Blog
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500" aria-current="page">Acheteurs B2B</span>
        </nav>

        {/* Image hero */}
        <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={heroImage}
            alt="70% des acheteurs B2B ne veulent plus parler aux commerciaux - données Gartner"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <time dateTime="2026-05-26">26 mai 2026</time>
          <span aria-hidden="true">·</span>
          <span>Comportement acheteur B2B / transformation commerciale</span>
        </div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-blue-ink leading-tight mb-6">
          70% des acheteurs B2B ne veulent plus parler aux commerciaux, et c&apos;est une bonne nouvelle
        </h1>

        {/* Auteur inline */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
          <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" />
          <span>Laurent Serre</span>
          <span aria-hidden="true">·</span>
          <span>5 min de lecture</span>
        </div>

      
        <div className="prose prose-lg max-w-none">
          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">✨ Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              70% des acheteurs B2B préfèrent le 100% digital. Mais ce n&apos;est pas un rejet des commerciaux. C&apos;est un rejet de la prospection de masse. Les entreprises qui adaptent leur approche performent 3,2 fois mieux.
            </p>
          </div>

          {/* Badge CTA , sous le header */}
          <div className="mt-8 mb-6 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              📊 Vous voulez analyser votre cycle de vente ? Parlons-en →
            </Link>
          </div>

          {/* Sommaire */}
          <div className="mt-10 p-6 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
            <p className="text-sm font-semibold text-blue-ink mb-3">📑 Sommaire</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#chiffres" className="text-mint-green hover:underline">Ce que les chiffres disent vraiment</a></li>
              <li><a href="#pourquoi" className="text-mint-green hover:underline">Pourquoi les acheteurs fuient , et ce qu&apos;ils fuient vraiment</a></li>
              <li><a href="#concret" className="text-mint-green hover:underline">Ce que ça change concrètement</a></li>
              <li><a href="#mondes" className="text-mint-green hover:underline">Les deux mondes qui se séparent</a></li>
              <li><a href="#terrain" className="text-mint-green hover:underline">Ce que je vois sur le terrain</a></li>
            </ul>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Je reçois ce chiffre depuis trois jours dans tous mes fils : 70 % des acheteurs B2B préfèrent une expérience 100 % digitale, sans interaction humaine avec les commerciaux.
          </p>

          <p className="mb-8">
            La première réaction dans les équipes que j&apos;accompagne, c&apos;est la panique. « On va tous être remplacés par un chatbot. » La seconde, c&apos;est le déni. « C&apos;est un chiffre de consultant, ça ne tient pas sur le terrain. »
          </p>

          <p className="mb-8">
            Les deux lectures sont fausses.
          </p>

          <p className="mb-8">
            J&apos;ai passé du temps sur les données Gartner des deux derniers quarters, et je les confronte à ce que je vois chez mes clients. La réalité est plus nuancée , et plus intéressante pour ceux qui veulent gagner.
          </p>

          <h2 id="chiffres" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que les chiffres disent vraiment</h2>

          <p className="mb-8">
            Gartner a interrogé les acheteurs B2B sur leur comportement réel. Pas sur ce qu&apos;ils disent faire, sur ce qu&apos;ils font.
          </p>

          <p className="mb-8">
            Première découverte : <strong>61 % des acheteurs veulent une phase de découverte sans aucun contact commercial</strong>. Pas de démo, pas d&apos;appel discovery, pas de « laissez-moi vous présenter notre solution ». Rien. Ils veulent explorer seuls, à leur rythme.
          </p>

          <p className="mb-8">
            Deuxième : <strong>60 % fuient activement les fournisseurs qui envoient trop de messages</strong>. Et <strong>76 % évitent ceux dont les messages ne sont pas pertinents</strong>.
          </p>

          <p className="mb-8">
            Ça veut dire que trois quarts de vos prospects vous ignorent ou vous évitent parce que vous les sollicitez au mauvais moment, avec le mauvais message, pour la mauvaise raison.
          </p>

          <p className="mb-8">
            Troisième chiffre : <strong>74 % des responsables commerciaux B2B disent que conclure des affaires est devenu plus difficile</strong>. C&apos;est un sentiment partagé sur tout le marché, pas une impression isolée.
          </p>

          <div className="bg-blue-ink/5 border-l-4 border-blue-ink p-6 my-8">
            <p className="text-base">
              <strong>Mais le chiffre clé :</strong> les organisations qui adaptent leur design commercial à cette nouvelle réalité ont <strong>3,2 fois plus de chances de performer</strong>. Pas un peu plus. 3,2 fois.
            </p>
          </div>

          <h2 id="pourquoi" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Pourquoi les acheteurs fuient , et ce qu&apos;ils fuient vraiment</h2>

          <p className="mb-8">
            Quand je lis ces chiffres, je ne vois pas un rejet du conseil humain. Je vois le rejet d&apos;une mécanique commerciale épuisante.
          </p>

          <p className="mb-8">
            Le prospect reçoit en moyenne combien de messages de commerciaux chaque jour ? Huit ? Dix ? Des relances automatiques, des demandes de rendez-vous génériques, des « je passais justement dans le coin » qui sentent le script à plein nez. Il finit par tout ignorer.
          </p>

          <p className="mb-8">
            Et franchement, il a raison.
          </p>

          <p className="mb-8">
            Ce que les acheteurs disent, à travers ces chiffres, c&apos;est : « Arrêtez de me contacter tant que je ne suis pas prêt. Et quand je serai prêt, soyez utiles. »
          </p>

          <p className="mb-8">
            Ils ne disent pas « supprimez les commerciaux ». Ils disent « changez votre façon d&apos;intervenir ».
          </p>

          <p className="mb-8">
            Un acheteur B2B passe 70 % de son parcours à chercher des informations seul avant de contacter un fournisseur. Il lit, compare, élimine. Quand il vous contacte, il a déjà éliminé 80 % des options. Si vous l&apos;avez sollicité trop tôt ou trop souvent, vous êtes déjà dans les 80 % éliminés , pas dans les 20 % retenus.
          </p>

          <h2 id="concret" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que ça change concrètement</h2>

          <p className="mb-8">
            Le commercial qui passe ses journées à envoyer des messages en masse et à relancer des prospects qui ne l&apos;ont pas appelé est en train de tuer son propre pipeline. Les chiffres Gartner le disent : chaque message non pertinent est une raison supplémentaire pour le prospect de vous fuir.
          </p>

          <p className="mb-8">
            La bascule à faire est simple à énoncer, difficile à exécuter :
          </p>

          <p className="mb-8">
            <strong>Passer du volume à la valeur.</strong> Envoyer 50 messages par jour, c&apos;est du bruit. Envoyer 5 messages extrêmement pertinents, c&apos;est du signal. Vos prospects ne sont pas en manque d&apos;information. Ils sont en manque d&apos;information qui compte vraiment pour eux.
          </p>

          <p className="mb-8">
            <strong>Intervenir au bon moment.</strong> L&apos;acheteur B2B veut être autonome en phase de découverte. Ne le dérangez pas. Mais quand il commence à chercher une solution, à comparer des options, à douter , soyez là. Avec une lecture qu&apos;il ne peut pas trouver seul.
          </p>

          <p className="mb-8">
            <strong>Chaque interaction doit apporter quelque chose que l&apos;acheteur ne peut pas obtenir sans vous.</strong> Si votre message se résume à « je voulais prendre de vos nouvelles », vous êtes dans le bruit. Si vous lui apportez une donnée, une mise en garde, une question qu&apos;il ne s&apos;était pas posée , vous êtes dans la pertinence.
          </p>

          {/* Mid-article CTA */}
          <div className="bg-teal-50 border border-teal-200/60 rounded-2xl p-6 my-10">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">🎯 Vous voulez repenser votre approche commerciale ?</p>
            <p className="text-sm text-teal-700 mb-3">
              Je vous aide à passer d&apos;une prospection de volume à des interactions à forte valeur ajoutée.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Discutons de votre cycle de vente →
            </Link>
          </div>

          <h2 id="mondes" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Les deux mondes qui se séparent</h2>

          <p className="mb-8">
            Les chiffres Gartner montrent aussi que les entreprises où le marketing et les ventes collaborent sur le digital commerce ont <strong>2,1 fois plus de croissance</strong>.
          </p>

          <p className="mb-8">
            C&apos;est logique : le marketing prépare le terrain avec du contenu que l&apos;acheteur consomme seul. Les ventes interviennent après, quand l&apos;acheteur a besoin d&apos;un regard humain sur ce qu&apos;il a trouvé. La jointure entre les deux fait la différence.
          </p>

          <p className="mb-8">
            Les équipes qui gardent une approche de prospection de masse, sans qualification, sans timing, sans pertinence, vont voir leur pipeline se vider. Pas parce que leurs commerciaux sont mauvais. Parce que leurs prospects ont changé de comportement et que leur méthode n&apos;a pas changé.
          </p>

          <p className="mb-8">
            Les équipes qui acceptent que l&apos;acheteur contrôle son parcours et qui adaptent leur intervention en conséquence , celles-là vont capter le marché.
          </p>

          <h2 id="terrain" className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Ce que je vois sur le terrain</h2>

          <p className="mb-8">
            Chez mes clients qui réussissent cette transition, je vois trois choses.
          </p>

          <p className="mb-8">
            D&apos;abord, ils ont arrêté de compter les appels. Ils comptent les interactions utiles. Pas les relances. Pas les mails de prise de contact. Les échanges où le prospect a appris quelque chose.
          </p>

          <p className="mb-8">
            Ensuite, ils ont investi dans la qualification avant la prospection. Leurs commerciaux passent plus de temps à comprendre le contexte d&apos;un prospect qu&apos;à le contacter. Le ratio s&apos;est inversé.
          </p>

          <p className="mb-8">
            Enfin, ils ont accepté que certains prospects ne veuillent jamais leur parler. Et ils ne les forcent pas. Ils laissent la porte ouverte, avec un contenu pertinent, et ils attendent que le prospect vienne.
          </p>

          <p className="mb-8">
            Ça demande de la discipline. Un commercial formé à la prospection de masse a l&apos;impression de ne « rien faire » quand il n&apos;envoie pas ses 50 messages. Le changement est aussi culturel que méthodologique.
          </p>

          <div className="bg-mint-green/10 border-l-4 border-mint-green p-6 my-8">
            <p className="text-base">
              La conclusion courte : l&apos;acheteur n&apos;a pas arrêté d&apos;acheter. Il a arrêté de se laisser vendre. À vous de choisir votre camp.
            </p>
          </div>

          <p className="text-sm text-gray-500 italic mb-8">
            Sources : Gartner CSO Quarterly 1Q26 et 2Q26, Redefining Revenue Growth Guide.
          </p>

          {/* FAQ */}
          <div className="mt-12 mb-10">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">FAQ , Acheteurs B2B et comportement d&apos;achat</h2>

            <div className="space-y-4">
              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">70% des acheteurs B2B préfèrent le digital : est-ce que ça signifie la fin du commercial ?</p>
                <p className="text-sm text-gray-700">Non. Les chiffres Gartner montrent que les acheteurs rejettent la prospection de masse non pertinente, pas le conseil humain. Les équipes qui adaptent leur approche (pertinence, timing, qualification) performent 3,2 fois mieux.</p>
              </div>

              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">Comment savoir si mes messages sont « pertinents » ou « du bruit » ?</p>
                <p className="text-sm text-gray-700">Un message est pertinent quand l&apos;acheteur ne peut pas trouver l&apos;information sans vous : une donnée exclusive, une mise en garde sur son marché, une question qu&apos;il ne s&apos;est pas posée. Si c&apos;est une simple relance ou une présentation générique, c&apos;est du bruit.</p>
              </div>

              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">Faut-il arrêter la prospection sortante ?</p>
                <p className="text-sm text-gray-700">Pas arrêter, mais la repenser radicalement. Moins de volume, plus de qualification. Moins de relances, plus de valeur ajoutée dans chaque interaction. Le timing devient plus important que le nombre de contacts.</p>
              </div>

              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ik/10">
                <p className="font-semibold text-blue-ink mb-1">Comment le marketing peut-il aider à répondre à cette nouvelle réalité ?</p>
                <p className="text-sm text-gray-700">En produisant du contenu que l&apos;acheteur consomme seul en phase de découverte (études, benchmarks, guides comparatifs). Et en passant le relais aux ventes quand l&apos;acheteur a besoin d&apos;un regard humain. Gartner confirme que la collaboration marketing-ventes sur le digital commerce génère 2,1 fois plus de croissance.</p>
              </div>

              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">Quel est le risque à ignorer ces tendances ?</p>
                <p className="text-sm text-gray-700">Voir son pipeline se vider progressivement, pas parce que vos commerciaux sont mauvais, mais parce que vos prospects ont changé de comportement et que votre méthode n&apos;a pas changé. Les acheteurs vous ignoreront, vous et vos concurrents qui n&apos;auront pas adapté leur approche.</p>
              </div>
            </div>
          </div>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/linkedin-prospection-b2b-50-messages-par-jour" className="text-mint-green hover:underline font-medium">
                  Pourquoi vos 50 messages LinkedIn par jour ne marchent plus
                </Link>
                <span className="text-gray-500"> , Le piège du volume et comment en sortir.</span>
              </li>
              <li>
                <Link href="/blog/plan-prospection-commerciale-machine-leads-annee" className="text-mint-green hover:underline font-medium">
                  Plan de prospection commerciale : construire une machine à leads pour l&apos;année
                </Link>
                <span className="text-gray-500"> , Structurer une prospection qui attire plutôt qu&apos;elle ne force.</span>
              </li>
              <li>
                <Link href="/blog/ia-et-prospection-commerciale-ce-qui-change-vraiment-pour-vos-equipes-en-2026" className="text-mint-green hover:underline font-medium">
                  IA et prospection commerciale : ce qui change vraiment pour vos équipes
                </Link>
                <span className="text-gray-500"> , Comment l&apos;IA peut aider à qualifier avant de contacter.</span>
              </li>
            </ul>
            <div className="mt-4 text-xs text-gray-500 border-t border-blue-ink/10 pt-4">
              <strong>Source Gartner :</strong>{' '}
              Gartner CSO Quarterly, Q1 & Q2 2026{' '}
              |{' '}
              Redefining Revenue Growth Guide
            </div>
          </div>

          {/* CTA gradient final */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vous voulez analyser votre cycle de vente ?</h3>
            <p className="mb-6">
              Je vous aide à repenser votre approche commerciale pour passer d&apos;une prospection de volume à des interactions à forte valeur ajoutée , là où vos prospects vous attendent vraiment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Discutons de votre cycle de vente
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Faire un diagnostic commercial
              </Link>
            </div>
          </div>
        </div>

        {/* Author card bas */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start gap-4">
            <Image src="/laurent.jpg" alt="Laurent Serre" width={64} height={64} className="rounded-full" quality={80} sizes="64px" />
            <div>
              <p className="font-title font-bold text-blue-ink">Laurent Serre</p>
              <p className="text-sm text-gray-600 mt-1">
                Coach commercial indépendant, j&apos;accompagne les dirigeants et directeurs commerciaux de PME à transformer leur approche commerciale pour répondre aux nouvelles attentes des acheteurs B2B. Données Gartner, application terrain.
              </p>
            </div>
          </div>
        </div>
      </article>

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
    </main>
  );
}
