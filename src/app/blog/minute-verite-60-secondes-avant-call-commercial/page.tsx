import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';

const heroImage = '/images/blog/minute-verite-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/minute-verite-hero.webp';

export const metadata: Metadata = {
  title: '60 secondes avant un appel : une minute qui change tout',
  description:
    'Les 60 secondes avant un call commercial ne sont pas une perte de temps. Découvrez le rituel en 3 questions qui transforme un rendez-vous banal en opportunité de closing.',
  keywords:
    '60 secondes avant appel commercial, préparation appel B2B, rituel appel commercial, closing B2B, coaching commercial Laurent Serre, minute de vérité vente, mindset commercial',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/minute-verite-60-secondes-avant-call-commercial',
  },
  openGraph: {
    title: '60 secondes avant un appel : une minute qui change tout',
    description:
      'Les 60 secondes avant un call commercial ne sont pas une perte de temps. C\'est l\'investissement qui transforme un rendez-vous anodin en opportunité de closing.',
    url: 'https://www.laurentserre.com/blog/minute-verite-60-secondes-avant-call-commercial',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1536,
        height: 1024,
        alt: 'Laurent Serre - 60 secondes avant un appel commercial, la minute de vérité',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '60 secondes avant un appel : une minute qui change tout',
    description:
      'Les 60 secondes avant un call commercial ne sont pas une perte de temps. C\'est l\'investissement qui transforme un rendez-vous anodin en opportunité de closing.',
    images: [heroImageAbsolute],
  },
};

const carouselPrefix = '/images/blog/carrousel-minute-verite';

const carouselImages = [
  { src: `${carouselPrefix}/01.webp`, alt: 'Cover - 60 secondes avant un appel, la minute de vérité', index: 0 },
  { src: `${carouselPrefix}/02.webp`, alt: 'Julien presse avant l\'appel, scroll frénétique sur le CRM', index: 1 },
  { src: `${carouselPrefix}/03.webp`, alt: 'Laurent arrive et arrête Julien : Avant de composer, prends une minute', index: 2 },
  { src: `${carouselPrefix}/04.webp`, alt: 'Question 1 : qu\'est-ce que tu veux savoir, pas dire', index: 3 },
  { src: `${carouselPrefix}/05.webp`, alt: 'Question 2 : qu\'est-ce qui a changé depuis la dernière fois', index: 4 },
  { src: `${carouselPrefix}/06.webp`, alt: 'Question 3 : quelle est la seule chose à obtenir à la fin', index: 5 },
  { src: `${carouselPrefix}/07.webp`, alt: 'La respiration qui marque la transition', index: 6 },
  { src: `${carouselPrefix}/08.webp`, alt: 'L\'appel commence par une intention d\'apprendre', index: 7 },
  { src: `${carouselPrefix}/09.webp`, alt: 'Le client se confie, Julien écoute vraiment', index: 8 },
  { src: `${carouselPrefix}/10.webp`, alt: 'Après l\'appel - cette minute ne coûte rien, elle rapporte tout', index: 9 },
  { src: `${carouselPrefix}/11.webp`, alt: 'La leçon : un rituel mental, pas une checklist', index: 10 },
  { src: `${carouselPrefix}/12.webp`, alt: 'CTA - Commencez par un diagnostic gratuit', index: 11 },
];

export default function MinuteVeritePage() {
  const articleJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      headline: '60 secondes avant un appel : une minute qui change tout',
      description:
        'Les 60 secondes avant un call commercial ne sont pas une perte de temps. Découvrez le rituel en 3 questions qui transforme un rendez-vous banal en opportunité de closing.',
      image: heroImageAbsolute,
      datePublished: '2026-06-24',
      dateModified: '2026-06-24',
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
        '@id': 'https://www.laurentserre.com/blog/minute-verite-60-secondes-avant-call-commercial',
      },
      articleSection: 'Closing / Mindset commercial',
      keywords: [
        '60 secondes avant appel commercial',
        'préparation appel B2B',
        'rituel appel commercial',
        'closing B2B',
        'mindset commercial',
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.laurentserre.com/blog/minute-verite-60-secondes-avant-call-commercial',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.laurentserre.com/blog/minute-verite-60-secondes-avant-call-commercial#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Combien de temps faut-il pour voir les effets de ce rituel ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les premiers effets sont immédiats : dès le premier appel, le ton change et le prospect se confie davantage. Les résultats commerciaux (taux de transformation, nombre de deuxièmes rendez-vous) progressent généralement en 2 à 3 semaines d\'application régulière.',
          },
        },
        {
          '@type': 'Question',
          name: 'Faut-il appliquer ce rituel à chaque appel ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Idéalement, oui. Même pour un appel de suivi rapide. La question clé est toujours la même : qu\'est-ce que je veux apprendre ? Même trente secondes suffisent pour se poser cette question. Le piège, c\'est l\'appel mécanique sans intention.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment gérer quand on a des appels back-to-back ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'C\'est la difficulté la plus fréquente. Mon conseil : garder un bloc-notes à côté du téléphone. Entre deux appels, vous notez trois mots pour chaque question. Ça prend vingt secondes, pas une minute. L\'important n\'est pas la durée, c\'est l\'existence du rituel.',
          },
        },
        {
          '@type': 'Question',
          name: 'Est-ce que ça marche aussi pour les appels vidéo ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Encore plus. En visio, le commercial a tendance à sur-préparer ses slides au lieu de préparer son intention. Le rituel des 60 secondes est encore plus important : il recentre sur l\'humain avant la technique.',
          },
        },
        {
          '@type': 'Question',
          name: 'Et si le prospect ne répond pas, la minute est perdue ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Non. Cette minute a déjà changé votre état d\'esprit. Quand vous rappellerez, vous serez dans la bonne posture. Et c\'est souvent dans le second appel que le prospect est disponible et que la différence se sent.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
        { '@type': 'ListItem', 'position': 3, 'name': '60 secondes avant un appel', 'item': 'https://www.laurentserre.com/blog/minute-verite-60-secondes-avant-call-commercial' },
      ],
    },
  ],
};

  return (
    <main className="bg-primary-bg text-gray-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Closing / Mindset commercial</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              60 secondes avant un appel : une minute qui change tout
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Image src="/laurent.jpg" alt="Laurent Serre" width={32} height={32} className="rounded-full" quality={60} sizes="32px" loading="lazy" />
                <span>Laurent Serre</span>
              </div>
              <span>•</span>
              <time dateTime="2026-06-24">24 juin 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Laurent Serre - 60 secondes avant un appel commercial"
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
          {/* TL;DR */}
          <div className="mt-8 p-6 bg-mint-green/10 rounded-xl border border-mint-green/20">
            <p className="text-sm font-semibold text-mint-green mb-2">Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Les 60 secondes avant un call commercial ne sont pas une perte de temps. Elles sont l'investissement qui transforme un rendez-vous anodin en une opportunité de closing. Un rituel de 3 questions et une respiration suffisent pour changer la nature de vos appels.
            </p>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD - La minute de vérité : les 60 secondes avant un appel
            </p>
            <p className="text-sm text-amber-700 mb-5">
              12 planches illustrees : Julien, commercial terrain, s'apprete a appeler un prospect. Laurent lui montre le rituel des 3 questions qui change tout.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD - La minute de verite avant un appel commercial"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-minute-verite.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Telecharger le PDF (12 planches)
              </Link>
            </div>
          </div>

          {/* Badge CTA sous le carrousel */}
          <div className="mb-6 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              Decouvrir si vos appels commerciaux ont besoin d'etre retravailles
            </Link>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Je suis chez un client, mardi matin. Son commercial, Julien, a un rendez-vous
            telephonique dans trois minutes avec un prospect qu'il relance depuis deux mois.
          </p>

          <p className="mb-8">
            Julien ouvre son CRM, parcourt l'historique, note le poste du client. Il sort un
            paperboard mental : « Je dois lui rappeler notre offre, poser la question du budget,
            et essayer de decrocher une demo. »
          </p>

          <p className="mb-8">
            Je l'arrete. « Avant de composer, prends une minute. »
          </p>

          <p className="mb-8">
            Cette minute, la plupart des commerciaux ne la prennent pas. Ils enchainent. Un appel
            apres l'autre, sans transition, sans intention claire. Et ils se demandent pourquoi le
            prospect sent un robot au bout du fil.
          </p>

          <p className="mb-8">
            <strong>
              Les 60 secondes avant un appel ne sont pas une perte de temps. C'est l'investissement
              qui transforme un rendez-vous anodin en opportunite de closing.
            </strong>
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Le piege : appeler pour dire, pas pour apprendre
          </h2>

          <p className="mb-8">
            Quand un commercial prepare son appel, il pense souvent a ce qu'il va dire. « Je vais
            presenter notre solution, detailer nos avantages, repondre aux objections previsibles. »
          </p>

          <p className="mb-8">
            C'est un reflexe comprehensible. Il faut montrer sa valeur. Sauf que dans la vraie vie,
            ce reflexe produit l'inverse : le prospect ecoute poliment, puis il trouve une excuse
            pour raccrocher.
          </p>

          <p className="mb-8">
            Pourquoi ? Parce qu'il n'a pas ete touche. Le commercial a servi son menu sans savoir
            ou se situe la faim du client.
          </p>

          <p className="mb-8">
            La minute avant l'appel, c'est le moment ou on decide de l'attitude qu'on va avoir.
            Pas la liste des points a cocher. L'intention reelle de l'echange.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les 3 questions qui changent la donne
          </h2>

          <p className="mb-8">
            Je propose toujours trois questions simples aux commerciaux que j'accompagne. Pas une
            checklist technique. Un rituel mental.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            1. Qu'est-ce que je veux savoir ?
          </h3>

          <p className="mb-8">
            Pas qu'est-ce que je veux <em>dire</em>. Qu'est-ce que je veux
            <em> apprendre</em>. La difference change tout. Si vous appelez pour apprendre,
            vous ecouterez davantage. Et le client le sent. Il se sent considere, pas sollicite.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            2. Qu'est-ce qui a change depuis la derniere fois ?
          </h3>

          <p className="mb-8">
            La pire erreur, c'est de reprendre la conversation la ou elle s'est arretee.
            « Comme je vous disais la derniere fois... » Le prospect n'en a rien a faire. Ce qui
            l'interesse, c'est ce qui a bouge depuis. Son contexte, ses priorites, ses contraintes.
            Si rien n'a change, vous perdez votre temps.
          </p>

          <h3 className="text-xl font-title font-bold text-blue-ink mt-8 mb-4">
            3. Quelle est la seule chose que je veux obtenir a la fin ?
          </h3>

          <p className="mb-8">
            Un objectif. Un seul. Pas trois. « Je veux qu'il accepte un deuxieme rendez-vous. »
            Ou « Je veux comprendre pourquoi le budget est bloque. » Ou « Je veux verifier si
            le besoin est toujours present. » Une intention unique donne de la clarte. Et le
            prospect sent que vous savez ou vous allez.
          </p>

          {/* Mid-article CTA */}
          <div className="bg-teal-50 border border-teal-200/60 rounded-2xl p-6 my-10">
            <p className="font-title font-bold text-teal-800 text-sm uppercase tracking-wider mb-2">
              Un rituel ne suffit pas toujours
            </p>
            <p className="text-sm text-teal-700 mb-3">
              Certains appels echouent parce que le cycle de vente est mal engage bien avant.
              Le Bootcamp commercial intensif vous apprend a structurer l'ensemble de votre
              demarche, de la premier contact a la conclusion.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Decouvrir le programme du Bootcamp
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Une respiration, puis l'appel
          </h2>

          <p className="mb-8">
            Apres ces trois questions, une seule respiration profonde. Pas pour se calmer.
            Pour marquer la transition entre le bruit ambiant et l'echange a venir.
          </p>

          <p className="mb-8">
            Ensuite, on compose. Et quand le prospect decroche, on ne commence pas par
            « Bonjour, je vous appelle pour vous parler de... »
          </p>

          <p className="mb-8">
            On commence par l'intention d'apprendre : « Bonjour, je suis content de vous avoir.
            Je voulais verifier ou vous en etes depuis notre dernier echange. »
          </p>

          <p className="mb-8">
            La difference tenue en apparence. Elle change tout sur le fond.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">
            Pourquoi ca marche
          </h2>

          <p className="mb-8">
            Ce rituel de 60 secondes n'a rien de magique. Il force une bascule mentale. Avant,
            vous etes dans le mode « tache » : enchainement des appels, cocher la case.
            Apres, vous etes dans le mode « echange » : present, concentre, ouvert.
          </p>

          <p className="mb-8">
            Le client ne sait pas que vous venez de prendre une minute pour vous preparer.
            Mais il le sent. Parce que votre voix est differente. Parce que vos questions
            sont plus precises. Parce que vous ne forcez pas.
          </p>

          <div className="bg-mint-green/10 border-l-4 border-mint-green p-6 my-8">
            <p className="text-base">
              <strong>La regle :</strong> cette minute ne coute rien. Elle rapporte tout.
            </p>
          </div>

          <p className="mb-8">
            Prochaine fois que vous decrochez votre telephone, ne composez pas tout de suite.
            Prenez 60 secondes. Et regardez ce qui change.
          </p>

          {/* FAQ */}
          <div className="mt-12 mb-10">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">FAQ - 60 secondes avant un appel</h2>

            <div className="space-y-4">
              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">Combien de temps faut-il pour voir les effets de ce rituel ?</p>
                <p className="text-sm text-gray-700">Les premiers effets sont immediats : des le premier appel, le ton change et le prospect se confie davantage. Les resultats commerciaux progressent generalement en 2 a 3 semaines d'application reguliere.</p>
              </div>

              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">Faut-il appliquer ce rituel a chaque appel ?</p>
                <p className="text-sm text-gray-700">Idealement, oui. Meme pour un appel de suivi rapide. Le piege, c'est l'appel mecanique sans intention. La question cle est toujours la meme : qu'est-ce que je veux apprendre ? Meme trente secondes suffisent pour se la poser.</p>
              </div>

              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">Comment gerer quand on a des appels back-to-back ?</p>
                <p className="text-sm text-gray-700">Gardez un bloc-notes a cote du telephone. Entre deux appels, notez trois mots pour chaque question. Ca prend vingt secondes, pas une minute. L'important n'est pas la duree, c'est l'existence du rituel.</p>
              </div>

              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">Est-ce que ca marche aussi pour les appels video ?</p>
                <p className="text-sm text-gray-700">Encore plus. En visio, le commercial a tendance a sur-preparer ses slides au lieu de preparer son intention. Le rituel des 60 secondes recentre sur l'humain avant la technique.</p>
              </div>

              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">Et si le prospect ne repond pas, la minute est perdue ?</p>
                <p className="text-sm text-gray-700">Non. Cette minute a deja change votre etat d'esprit. Quand vous rappellerez, vous serez dans la bonne posture. Et c'est souvent dans le second appel que le prospect est disponible et que la difference se sent.</p>
              </div>

              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">Est-ce que ce rituel fonctionne pour les commerciaux debutants ?</p>
                <p className="text-sm text-gray-700">Encore plus que pour les confirmes. Le debutant a tendance a sur-preparer son discours parce qu'il manque de confiance. Le rituel le force a decrocher de son script et a entrer en veritable ecoute. C'est le meilleur accélérateur de progression pour un commercial junior.</p>
              </div>

              <div className="p-4 bg-blue-ink/5 rounded-xl border border-blue-ink/10">
                <p className="font-semibold text-blue-ink mb-1">Le manager peut-il verifier que ses commerciaux appliquent le rituel ?</p>
                <p className="text-sm text-gray-700">Oui, sans les controler. En debut de point hebdomadaire, demandez a chaque commercial : « Sur quel appel de la semaine as-tu applique le rituel, et qu'est-ce que ca a change ? » Ce n'est pas un controle, c'est un partage de pratique. Et les meilleurs exemples deviennent des modeles pour l'equipe.</p>
              </div>
            </div>
          </div>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/closing-b2b-budget-gele-pme" className="text-mint-green hover:underline font-medium">
                  Quand un client dit « budget gele », il ne parle pas d'argent
                </Link>
                <span className="text-gray-500"> - Comprendre la vraie objection derriere les mots.</span>
              </li>
              <li>
                <Link href="/blog/gap-selling-methode-b2b" className="text-mint-green hover:underline font-medium">
                  Gap Selling : la methode B2B qui a change ma facon de vendre
                </Link>
                <span className="text-gray-500"> - Creer le besoin avant de presenter la solution.</span>
              </li>
              <li>
                <Link href="/blog/book-de-vente-tactile-commerciaux-pme" className="text-mint-green hover:underline font-medium">
                  Book de vente tactile : vos commerciaux improvisent chaque rendez-vous
                </Link>
                <span className="text-gray-500"> - Donner un support physique a vos equipes.</span>
              </li>
            </ul>
          </div>

          {/* CTA gradient final */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Vous voulez verifier si vos commerciaux preparent vraiment leurs appels ?
            </h3>
            <p className="mb-6">
              Je propose un diagnostic gratuit d'une demi-journee : j'observe un commercial en
              situation, je vous livre mes observations sur sa posture d'appel, et je vous dis si
              le rituel des 60 secondes peut s'appliquer a votre equipe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander mon diagnostic gratuit
              </Link>
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Decouvrir le Bootcamp commercial intensif
              </Link>
            </div>
          </div>
        </div>

        {/* Author card */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start gap-4">
            <Image src="/laurent.jpg" alt="Laurent Serre" width={64} height={64} className="rounded-full" quality={80} sizes="64px" />
            <div>
              <p className="font-title font-bold text-blue-ink">Laurent Serre</p>
              <p className="text-sm text-gray-600 mt-1">
                Coach commercial independant, j'accompagne les dirigeants et directeurs
                commerciaux de PME a transformer durablement leur equipe. Pas de theorie.
                Juste du concret.
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-4 text-center">
            Besoin d'en parler plus directement ?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Si votre cas merite un echange plus direct, vous pouvez aussi laisser un message ici.
          </p>
          <HubSpotForm />
        </div>
      </section>
    </main>
  );
}
