import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const heroImage = '/images/blog/vente-perdue-avant-non/vente-perdue-avant-non-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/vente-perdue-avant-non/vente-perdue-avant-non-hero.webp';
const ogImageAbsolute = 'https://www.laurentserre.com/images/blog/vente-perdue-avant-non/vente-perdue-avant-non-og.jpg';

export const metadata: Metadata = {
  title: 'La vente se perd souvent avant que le client dise non | Laurent Serre',
  description:
    'Un deal ne se perd pas au moment du non. Il se perd en amont, par petites lachetes commerciales : pitcher trop tot, ne pas qualifier le vrai decideur, proposer sans rendez-vous.',
  keywords:
    'vente B2B erreurs, deal perdu B2B, qualification commerciale, closing B2B, process de vente PME',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/vente-perdue-avant-non-b2b',
  },
  openGraph: {
    title: 'La vente se perd souvent avant que le client dise non',
    description:
      'Un deal ne se perd pas au moment du non. Il se perd en amont, par petites lachetes commerciales.',
    url: 'https://www.laurentserre.com/blog/vente-perdue-avant-non-b2b',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Vente B2B - les deals se perdent bien avant le non du client',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La vente se perd souvent avant que le client dise non',
    description:
      'Les vrais signes qu\'un deal est mort apparaissent des semaines avant le non. Voici ce qu\'il faut regarder.',
    images: [ogImageAbsolute],
  },
};

export default function VentePerdueAvantNonPage() {
  const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: 'La vente se perd souvent avant que le client dise non',
          description:
            'Un deal ne se perd pas au moment du non. Il se perd en amont, par petites lachetes commerciales.',
          image: heroImageAbsolute,
          datePublished: '2026-06-10',
          dateModified: '2026-06-10',
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
            '@id': 'https://www.laurentserre.com/blog/vente-perdue-avant-non-b2b',
          },
          articleSection: 'Vente B2B / Process de vente',
          keywords: [
            'vente B2B',
            'deals perdus',
            'qualification commerciale',
            'process de vente',
          ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.laurentserre.com/blog/vente-perdue-avant-non-b2b"
    },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.laurentserre.com/blog/vente-perdue-avant-non-b2b#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Pour aller plus loin',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '→ Kit gestion grands comptes → Les 7 erreurs de qualification qui font fuir vos prospects → Sales enablement PME : structurer la performance Faire un diagnostic offert Decouvrir le Bootcamp',
            },
          },
          {
            '@type': 'Question',
            name: 'Prendre contact avec Laurent Serre',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '← Retour au blog ); }',
            },
          }
        ],
      },
  
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.laurentserre.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.laurentserre.com/blog' },
          { '@type': 'ListItem', 'position': 3, 'name': 'La vente se perd souvent avant que le client dise…', 'item': 'https://www.laurentserre.com/blog/vente-perdue-avant-non-b2b' },
        ],
      }
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">
                Vente B2B / Process de vente
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              La vente se perd souvent avant que le client dise non
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
              <time dateTime="2026-06-10">10 juin 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Commercial B2B analysant un deal perdu"
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
              Carrousel BD : le non arrive toujours trop tard
            </p>
            <p className="text-sm text-amber-700 mb-5">
              Marc, commercial B2B depuis 8 ans, vient de perdre un deal qu&rsquo;il pensait solide. Il est convaincu que le client a choisi un concurrent moins cher. Mais en revisitant son propre process avec Laurent, il decouvre que la vente etait deja morte des le premier rendez-vous.
            </p>
            <BDCarousel
              images={[
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-01-cover.webp', alt: 'Cover - Le non arrive toujours trop tard', index: 0 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-02-deal-perdu.webp', alt: 'Marc a perdu un deal et pense savoir pourquoi', index: 1 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-03-pitch-trop-tot.webp', alt: 'Flashback : Marc a pitché trop vite au premier rendez-vous', index: 2 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-04-pas-qualifie.webp', alt: 'Il n a pas vérifié qui décide vraiment', index: 3 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-05-proposition-vide.webp', alt: 'Pas d urgence créée, la proposition traîne', index: 4 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-06-signaux-ignores.webp', alt: 'Les signaux d alerte étaient là, il ne les a pas vus', index: 5 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-07-regard-exterieur.webp', alt: 'Laurent aide Marc à voir ce qu il a manqué', index: 6 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-08-ce-qu-il-a-manque.webp', alt: 'Marc applique la rigueur sur une nouvelle affaire', index: 7 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-09-rigueur.webp', alt: 'Il pose les bonnes questions cette fois', index: 8 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-10-ne-gagne-pas-tout.webp', alt: 'Marc ne gagne pas tout, mais il voit clair', index: 9 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-11-vraie-lecon.webp', alt: 'La vraie leçon sur la rigueur commerciale', index: 10 },
                { src: '/images/blog/vente-perdue-avant-non/bd-slide-12-cta.webp', alt: 'Commencez par un diagnostic offert', index: 11 },
              ]}
              title="Le non arrive toujours trop tard"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-vente-perdue-avant-non.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Telecharger le PDF (12 planches)
              </Link>
            </div>
          </div>

          {/* TL;DR */}
          <div className="bg-gradient-to-r from-amber-50 via-amber-50/80 to-transparent border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
            <p className="text-lg font-semibold text-amber-800 mb-2">Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Un deal ne se perd pas au moment ou le client dit non. Il se perd en amont, par petites lachetes commerciales. Voici pourquoi et comment les eviter.
            </p>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Quand une vente est perdue, l&rsquo;explication arrive souvent tres vite. Le concurrent etait moins cher. Le projet a ete repousse. Le contact n&rsquo;a pas reussi a faire passer le dossier. Le client n&rsquo;etait pas mur.
          </p>

          <p className="mb-4">
            Parfois, c&rsquo;est vrai.
          </p>

          <p className="mb-8">
            Mais dans beaucoup de PME, ces phrases servent surtout a rendre la perte acceptable. Elles racontent la fin de l&rsquo;histoire. Pas le moment ou la vente a commence a se degrader.
          </p>

          <p className="mb-8">
            Ce moment arrive souvent bien plus tot.
          </p>

          <p className="mb-4">
            Des le premier rendez-vous, quand le commercial presente trop vite ce qu&rsquo;il vend avant d&rsquo;avoir compris ce que le client cherche vraiment a regler.
          </p>

          <p className="mb-4">
            Des la decouverte, quand il entend un besoin mais ne verifie pas si ce besoin est prioritaire, finance, porte par la bonne personne.
          </p>

          <p className="mb-8">
            Des la proposition, quand il envoie un document par email en esperant qu&rsquo;il fera le travail a sa place.
          </p>

          <p className="mb-8">
            Le probleme n&rsquo;est pas seulement une erreur de methode. C&rsquo;est une perte de rigueur dans la lecture de l&rsquo;affaire.
          </p>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
            <p className="text-gray-700 leading-relaxed italic">
              &laquo; J&rsquo;ai vu des commerciaux sortir d&rsquo;un rendez-vous en disant : &laquo; Tres bon contact. &raquo; Et quand on creuse, il n&rsquo;y a pas grand-chose derriere. &raquo;
            </p>
          </div>

          <p className="mb-4">
            On ne sait pas qui decide vraiment.
            On ne sait pas ce qui se passe si le client ne fait rien.
            On ne sait pas avec quoi il compare.
            On ne sait pas quelle prochaine etape engage reellement quelqu&rsquo;un.
          </p>

          <p className="mb-8">
            Mais comme l&rsquo;echange a ete agreable, l&rsquo;affaire entre dans le pipe.
          </p>

          <p className="mb-4">
            Trois semaines plus tard, elle devient silencieuse.
            Six semaines plus tard, elle est encore &laquo; en reflexion &raquo;.
            A la reunion commerciale, on explique qu&rsquo;il faut relancer.
          </p>

          <p className="mb-8">
            En realite, il aurait souvent fallu requalifier beaucoup plus tot.
          </p>

          <p className="mb-4">
            Une vente B2B ne se perd pas toujours sur un grand moment visible. Elle se perd par petites lachetes commerciales.
          </p>

          <p className="mb-4">
            Ne pas poser la question sur le vrai decideur parce qu&rsquo;on a peur de casser l&rsquo;ambiance.
            Ne pas demander ce qui se passera si rien ne change.
            Ne pas verifier si le calendrier est reel.
            Ne pas dire au client : &laquo; J&rsquo;ai l&rsquo;impression que ce sujet n&rsquo;est pas encore assez prioritaire pour avancer. Je me trompe ? &raquo;
          </p>

          <p className="mb-8">
            Ces phrases ne sont pas agressives. Elles sont saines.
          </p>

          <p className="mb-8">
            Elles evitent de confondre une discussion interessante avec une affaire solide.
          </p>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
            <p className="text-gray-700 leading-relaxed italic">
              &laquo; La rigueur commerciale, ce n&rsquo;est pas reciter un processus. C&rsquo;est accepter de regarder la vente comme elle est, meme quand elle est moins avancee qu&rsquo;on aimerait. &raquo;
            </p>
          </div>

          <p className="mb-4">
            Un commercial qui fait ca ne gagne pas toutes ses affaires.
          </p>

          <p className="mb-4">
            Mais il perd moins de temps avec les mauvaises.
            Il voit plus tot les dossiers qui n&rsquo;avanceront pas.
            Il sait pourquoi une vente bloque.
            Et surtout, il arrete de decouvrir la verite au moment ou le client dit non.
          </p>

          <p className="mb-8">
            C&rsquo;est souvent la que le niveau commercial se joue.
          </p>

          <p className="mb-8 font-semibold text-lg">
            Pas dans la derniere relance. Dans la capacite a voir, des le debut, si une vente existe vraiment.
          </p>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-8 my-12">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">Pour aller plus loin</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/ressources/kit-gestion-grands-comptes" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  <span className="text-mint-green">→</span> Kit gestion grands comptes
                </Link>
              </li>
              <li>
                <Link href="/blog/qualification-commerciale-b2b-7-erreurs" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  <span className="text-mint-green">→</span> Les 7 erreurs de qualification qui font fuir vos prospects
                </Link>
              </li>
              <li>
                <Link href="/blog/sales-enablement-pme-structurer-performance-commerciale" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  <span className="text-mint-green">→</span> Sales enablement PME : structurer la performance
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
              Decouvrir le Bootcamp
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

      <div className="border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuthorCard />
        </div>
      </div>

      <div className="pb-12 text-center">
        <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
          ← Retour au blog
        </Link>
      </div>
    </main>
  );
}
