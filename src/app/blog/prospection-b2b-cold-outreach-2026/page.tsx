import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import BDCarousel from '@/components/BDCarousel';
import AuthorCard from '@/components/AuthorCard';

const heroImage = '/images/blog/prospection-b2b-cold-outreach-2026/prospection-b2b-cold-outreach-hero.webp';
const heroImageAbsolute = 'https://www.laurentserre.com/images/blog/prospection-b2b-cold-outreach-2026/prospection-b2b-cold-outreach-hero.webp';

export const metadata: Metadata = {
  title: 'Prospection B2B en 2026 : faut-il abandonner le cold outreach ? | Laurent Serre',
  description:
    'Le cold outreach est-il vraiment mort ? Laurent Serre, fort de 20+ ans de prospection terrain, répond au débat. Ni \"oui le cold call est mort\" ni \"non il faut juste forcer plus\". Une analyse lucide.',
  keywords:
    'prospection B2B 2026, cold outreach B2B 2026, prospection à froid B2B, techniques de prospection B2B 2026, comment prospecter en 2026, cold call, prospection commerciale',
  alternates: {
    canonical: 'https://www.laurentserre.com/blog/prospection-b2b-cold-outreach-2026',
  },
  openGraph: {
    title: 'Prospection B2B en 2026 : faut-il abandonner le cold outreach ?',
    description:
      'Le cold outreach est-il vraiment mort ? Ni oui ni non. Une analyse lucide de ce qui marche encore, ce qui a changé, et ce qu\'il faut faire à la place en 2026.',
    url: 'https://www.laurentserre.com/blog/prospection-b2b-cold-outreach-2026',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImageAbsolute,
        width: 1200,
        height: 630,
        alt: 'Prospection B2B 2026 - cold outreach analyse terrain Laurent Serre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prospection B2B en 2026 : faut-il abandonner le cold outreach ?',
    description:
      'Le cold outreach est-il vraiment mort ? Laurent Serre répond au débat. Ni oui ni non, une analyse lucide de ce qui marche encore.',
    images: [heroImageAbsolute],
  },
};

export default function ProspectionB2BColdOutreachPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Prospection B2B en 2026 : faut-il abandonner le cold outreach ?',
    description:
      'Le cold outreach est-il vraiment mort ? Laurent Serre, fort de 20+ ans de prospection terrain, répond au débat. Ni \"oui le cold call est mort\" ni \"non il faut juste forcer plus\". Une analyse lucide de ce qui marche encore, ce qui a changé, et ce qu\'il faut faire à la place.',
    image: heroImageAbsolute,
    datePublished: '2026-06-03',
    dateModified: '2026-06-03',
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
      '@id': 'https://www.laurentserre.com/blog/prospection-b2b-cold-outreach-2026',
    },
    articleSection: 'Prospection B2B / Transformation commerciale',
    keywords: [
      'prospection B2B',
      'cold outreach',
      'prospection à froid',
      'techniques de prospection',
      'vente B2B 2026',
    ],
  };

  // FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Le cold outreach est-il efficace en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, à condition quil ne soit plus "à froid". Le cold outreach traditionnel (appel non préparé, email générique) ne marche plus. Mais un outreach ciblé, préparé, avec une intention claire et un message prouvant que vous avez fait le travail en amont, reste très efficace.'
        }
      },
      {
        '@type': 'Question',
        name: 'Comment prospecter quand les emails ne répondent plus ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En passant au multicanal avec une intention unique. Téléphone, email, LinkedIn : le même message adapté au canal, pas trois messages différents jetés contre le mur. Et en arrêtant denvoyer du volume pour envoyer de la pertinence.'
        }
      },
      {
        '@type': 'Question',
        name: 'Faut-il abandonner la prospection téléphonique ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non, mais il faut abandonner lappel sans préparation. Ce qui ne marche plus, ce nest pas le téléphone, cest lappel générique récité sans contexte. Un appel préparé et contextualisé reste un des meilleurs moyens de décrocher un rendez-vous B2B.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quelles sont les méthodes de prospection qui marchent en B2B en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le mix gagnant : ciblage humain (même avec des outils IA), message contextualisé prouvant une vraie recherche, multicanal cohérent, persistance utile (5 à 7 touches sur 3 semaines), et arrêt clair quand ça ne marche pas.'
        }
      },
      {
        '@type': 'Question',
        name: 'LIA va-t-elle remplacer les commerciaux en prospection ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non, mais elle va remplacer ceux qui nutilisent que le volume. LIA exécute et industrialise. Elle ne décide pas à qui parler ni pourquoi. Le travail de ciblage, dintention et de message reste humain. Les meilleures équipes utilisent lIA pour amplifier leur pertinence, pas pour noyer le prospect.'
        }
      }
    ]
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

      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-soft/10 backdrop-blur-sm border border-orange-soft/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-orange-soft text-sm">
                Prospection B2B
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Prospection B2B en 2026 : faut-il abandonner le cold outreach ?
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
              <time dateTime="2026-06-03">3 juin 2026</time>
              <span>•</span>
              <span>5 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Prospection B2B 2026 : analyse terrain du cold outreach"
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

          {/* BDCarousel — accroche visuelle */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD : Le parcours du commercial en 2026
            </p>
            <p className="text-sm text-amber-700 mb-5">
              Du cold call traditionnel à la prospection multicanal augmentée : suivez le parcours de Stéphane, commercial terrain, accompagné par Laurent et son jeune collègue Alex.
            </p>
            <BDCarousel
              images={[
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-01-cover.webp', alt: 'Cover - Prospection 2026', index: 0 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-02-constat.webp', alt: 'Constat - Le cold call ne marche plus', index: 1 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-03-observer.webp', alt: 'Observer - Que faites-vous ?', index: 2 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-04-diagnostic.webp', alt: 'Diagnostic - Identifier les vrais problèmes', index: 3 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-05-ia-piege.webp', alt: 'Piège IA - Le volume ne remplace pas la pertinence', index: 4 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-06-limite-ia.webp', alt: 'Limite de lIA', index: 5 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-07-declic.webp', alt: 'Déclic - Lalchimie gagnante', index: 6 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-08-preparation.webp', alt: 'Préparation - La clé', index: 7 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-09-appel-qui-marche.webp', alt: 'Lappel qui marche', index: 8 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-10-mix-multicanal.webp', alt: 'Mix multicanal', index: 9 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-11-persistance-utile.webp', alt: 'Persistance utile', index: 10 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-12-resultat.webp', alt: 'Résultat', index: 11 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-13-lecon.webp', alt: 'Leçon', index: 12 },
                { src: '/images/blog/prospection-b2b-cold-outreach-2026/bd-slide-14-cta.webp', alt: 'CTA - Commencez par un diagnostic', index: 13 },
              ]}
              title="Le parcours du commercial en 2026"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-prospection-cold-outreach-2026.pdf"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (14 planches)
              </Link>
            </div>
          </div>

          {/* TL;DR */}
          <div className="bg-gradient-to-r from-amber-50 via-amber-50/80 to-transparent border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
            <p className="text-lg font-semibold text-amber-800 mb-2">✨ Ce que vous allez retenir</p>
            <p className="text-gray-700 leading-relaxed">
              Le cold outreach nest pas mort : cest la prospection paresseuse qui lest. En 2026, les outils ont changé, les acheteurs sont mieux informés, mais le besoin fondamental reste : un prospect décroche si vous avez une vraie raison de lappeler. Ce qui sépare un bon commercial dun commercial bruyant, ce nest pas loutil, cest lintention, la préparation et la pertinence du message.
            </p>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Vous avez vu passer le débat. Sur Reddit, sur Twitter, dans les groupes de vente. Un thread toutes les semaines : le cold outreach est mort depuis 2023. Personne ne décroche plus. Les acheteurs ne veulent plus parler aux commerciaux.
          </p>

          <p className="mb-4">
            À côté de ça, des équipes remplissent encore leur pipeline avec du téléphone et quelques emails.
          </p>

          <p className="mb-8">
            Alors qui a raison ?
          </p>

          <p className="mb-8 font-semibold text-blue-ink">
            Personne. Et tout le monde.
          </p>

          <p className="mb-8">
            La question n'est pas &laquo; le cold outreach est-il mort &raquo;. La question est &laquo; ce que vous appelez cold outreach est-il encore en vie &raquo;.
          </p>

          <h2 id="la-scene" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            La scène que je vois trop souvent
          </h2>

          <p className="mb-4">
            Un commercial ouvre son CRM, sort une liste achetée sur un annuaire, compose un numéro, tombe sur une assistante qui lui demande de rappeler dans six mois. Il laisse un message, envoie un email copié-collé, puis recommence le lendemain sur une autre ligne.
          </p>

          <p className="mb-8">
            Ça, ce n'est pas de la prospection. C'est du bruit.
          </p>

          <p className="mb-8">
            Le problème n'est pas le cold outreach. Le problème est que beaucoup d'équipes confondent le geste technique (décrocher un téléphone, envoyer un email) avec une stratégie de mise en relation. Le geste technique, l'IA le fait mieux que nous aujourd'hui. Les outils de séquence, les agents de recherche, les générateurs de messages personnalisés : tout ça existe et marche. Mais si le fond derrière est pauvre, on obtient juste plus de bruit, plus vite.
          </p>

          <h2 id="telephone" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Quand le téléphone ne marche plus
          </h2>

          <p className="mb-4">
            Quand un commercial me dit &laquo; le téléphone ne marche plus &raquo;, je lui demande : &laquo; Quand est-ce que tu as préparé ton appel ? &raquo; La plupart du temps, la réponse est gênante.
          </p>

          <p className="mb-4">
            Ce qui ne marche plus, ce n'est pas le cold call. C'est l'appel sans préparation, sans ciblage, sans raison d'appeler autre que &laquo; je dois faire mon quota aujourd'hui &raquo;. L'appel qui consiste à réciter un argumentaire générique en espérant que quelqu'un aura pitié.
          </p>

          <p className="mb-8">
            Ce qui marche encore, et même très bien : l'appel préparé, contextualisé, qui sert une vraie intention. Le &laquo; je vous appelle parce que j'ai vu que vous recrutiez dans telle région &raquo; ou &laquo; j'ai remarqué que votre concurrent a changé de stratégie sur tel segment &raquo;. Un appel qui prouve que vous avez fait le travail avant de composer le numéro.
          </p>

          <h2 id="ia-changed" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            L'IA a changé la donne, mais pas comme on le croit
          </h2>

          <p className="mb-4">
            Avant, le problème c'était le volume. Les équipes passaient 80% de leur temps à chercher des contacts, qualifier des leads, écrire des messages. Aujourd'hui, les outils font ça en quelques minutes.
          </p>

          <p className="mb-4">
            Le nouveau problème : l'IA permet d'envoyer cinq cents emails personnalisés en une heure, avec des messages qui sonnent presque humains. Et ça pousse les équipes à compenser le manque de ciblage par le volume. Résultat : les boîtes de réception sont saturées de messages bien écrits qui ne veulent rien dire. Les prospects ne lisent plus. Ou pire, ils ont activé leur filtre anti-spam IA.
          </p>

          <p className="mb-8">
            Le piège n'est pas de rater le train de l'IA. Le piège est de croire que l'IA peut remplacer la réflexion amont. Le ciblage, le message, l'intention : ça reste du travail humain. L'IA exécute. Elle ne décide pas à qui parler ni pourquoi.
          </p>

          <h2 id="acheteurs" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Les acheteurs ont changé, c'est vrai
          </h2>

          <p className="mb-4">
            Ils font leurs recherches avant de décrocher. Ils lisent les avis, comparent silencieusement, éliminent les offres sans même vous parler. La fenêtre d'influence du commercial s'est réduite.
          </p>

          <p className="mb-4">
            Mais ça ne veut pas dire qu'ils ne veulent plus parler à des commerciaux. Ça veut dire qu'ils ne veulent plus parler à des commerciaux qui n'ont rien à leur apprendre. Un acheteur qui a déjà fait ses recherches n'a pas besoin qu'on lui récite sa brochure. Il a besoin qu'on lui apporte une information qu'il n'a pas trouvée tout seul. Un point de vue, une donnée terrain, une expérience similaire.
          </p>

          <p className="mb-8">
            C'est là que la prospection bascule de l'outreach à la relation utile. Et c'est là que la plupart des équipes coincent.
          </p>

          <h2 id="concret" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Concrètement, ça donne quoi en 2026 ?
          </h2>

          <p className="mb-4">Le mix qui fonctionne sur le terrain :</p>

          <div className="space-y-4 mb-8">
            <p>
              <strong>Du ciblage humain, pas algorithmique.</strong> L'IA trouve les comptes, mais c'est vous qui choisissez ceux qui valent le coup.
            </p>
            <p>
              <strong>Un message qui prouve que vous avez lu votre prospect.</strong> Pas une personnalisation de surface (le prénom dans l'objet), mais une référence précise à son activité, ses résultats, ses annonces récentes.
            </p>
            <p>
              <strong>Du multicanal avec une intention unique.</strong> Téléphone, email, LinkedIn : le même message, adapté au canal, pas trois messages différents jetés contre le mur.
            </p>
            <p>
              <strong>De la persistance utile, pas du harcèlement.</strong> Une séquence de cinq à sept touches sur trois semaines, chacune apportant un angle ou une information nouvelle.
            </p>
            <p>
              <strong>Un arrêt clair quand ça ne marche pas.</strong> Les équipes performent mieux quand elles savent quoi ne pas faire que quand elles essaient tout.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">
              Le cold outreach n'est pas mort. Ce qui est mort, c'est la prospection paresseuse.
            </h3>
            <p className="mb-6">
              Celle qui consiste à prendre une liste, composer un numéro et espérer que ça tombe bien. Celle qui repose sur le volume plutôt que sur la pertinence. Celle où le commercial n'a pas fait son travail de préparation.
            </p>
            <p className="mb-6">
              Les prospects sont devenus plus exigeants. Les outils ont changé. L'IA a industrialisé le bruit. Mais le besoin fondamental reste le même : un acheteur B2B a besoin de comprendre pourquoi il devrait prendre du temps pour vous parler.
            </p>
            <p className="mb-6">
              Si vous avez une vraie raison de l'appeler, il vous écoutera. Si vous l'appelez parce que votre CRM vous a dit de passer quarante appels aujourd'hui, il raccrochera.
            </p>
            <p className="font-semibold">
              La différence n'a jamais été une question d'outil ou de canal. Elle a toujours été une question d'intention, de préparation et de pertinence.
            </p>
          </div>

          {/* FAQ */}
          <div className="my-12">
            <h2 id="faq" className="text-3xl font-title font-bold text-blue-ink mb-6">
              Questions fréquentes sur la prospection B2B
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Le cold outreach est-il efficace en 2026 ?</h3>
                <p className="text-gray-600">Oui, à condition qu'il ne soit plus "à froid". Le cold outreach traditionnel (appel non préparé, email générique) ne marche plus. Mais un outreach ciblé, préparé, avec une intention claire et un message prouvant que vous avez fait le travail en amont, reste très efficace.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Comment prospecter quand les emails ne répondent plus ?</h3>
                <p className="text-gray-600">En passant au multicanal avec une intention unique. Téléphone, email, LinkedIn : le même message adapté au canal. Et en arrêtant d'envoyer du volume pour envoyer de la pertinence.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">Faut-il abandonner la prospection téléphonique ?</h3>
                <p className="text-gray-600">Non, mais il faut abandonner l'appel sans préparation. Un appel préparé et contextualisé reste un des meilleurs moyens de décrocher un rendez-vous B2B.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-ink mb-2">L'IA va-t-elle remplacer les commerciaux en prospection ?</h3>
                <p className="text-gray-600">Non, mais elle va remplacer ceux qui n'utilisent que le volume. L'IA exécute et industrialise. Elle ne décide pas à qui parler ni pourquoi. Le travail de ciblage, d'intention et de message reste humain.</p>
              </div>
            </div>
          </div>

          {/* Pour aller plus loin */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-8 my-12">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-6">Pour aller plus loin</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/prospection-b2b-2026-methode-4-blocs-rdv-qualifies" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  → Méthode 4 blocs pour des rendez-vous qualifiés
                </Link>
              </li>
              <li>
                <Link href="/blog/erreurs-fatales-prospection-b2b" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  → Les erreurs fatales en prospection B2B
                </Link>
              </li>
              <li>
                <Link href="/blog/acheteurs-b2b-ne-veulent-plus-parler-aux-commerciaux" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
                  → Les acheteurs ne veulent plus parler aux commerciaux
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

      {/* AuthorCard bas */}
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
