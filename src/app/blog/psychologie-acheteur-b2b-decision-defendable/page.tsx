import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/psychologie-acheteur-b2b-decision-defendable';
const heroImage = 'https://www.laurentserre.com/images/blog/2026-05-18-psychologie-acheteur-b2b-hero.webp';

export const metadata: Metadata = {
  title: 'Psychologie acheteur B2B : vendre une décision défendable',
  description:
    'Un acheteur B2B compare surtout des risques. Voici comment aider votre prospect à défendre sa décision en interne sans forcer la vente.',
  keywords:
    'psychologie acheteur B2B, décision d\'achat B2B, vente B2B, acheteur professionnel, vente complexe, décision défendable, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-05-19',
  },
  openGraph: {
    title: 'Psychologie acheteur B2B : vendre une décision défendable',
    description:
      'Un acheteur B2B n\'achète presque jamais seul dans sa tête. Le travail du commercial, c\'est d\'aider le client à clarifier sa propre décision.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 1024,
        alt: 'Psychologie acheteur B2B - aider le client à défendre sa décision',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psychologie acheteur B2B : vendre une décision défendable',
    description:
      'Un acheteur B2B compare des risques avant de comparer des offres. Aidez-le à défendre sa décision.',
    images: [heroImage],
  },
};

export default function PsychologieAcheteurB2BPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#posting',
        headline: 'Psychologie acheteur B2B : vendre une décision défendable',
        description:
          'Un acheteur B2B compare surtout des risques. Voici comment aider votre prospect à défendre sa décision en interne sans forcer la vente.',
        image: heroImage,
        datePublished: '2026-05-18',
        dateModified: '2026-05-19',
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
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.laurentserre.com/logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
        articleSection: 'Vente B2B / psychologie d\'achat',
        keywords: [
          'psychologie acheteur B2B',
          'décision d\'achat B2B',
          'vente B2B',
          'acheteur professionnel',
          'vente complexe',
          'décision défendable',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': articleUrl + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Pourquoi un acheteur B2B hésite même quand l\'offre semble bonne ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Parce qu\'il ne compare pas seulement des offres. Il compare le risque de changer, le risque de ne rien faire, le risque de se tromper devant son manager et le risque de ne pas réussir à embarquer les équipes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment aider un prospect B2B à prendre une décision ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Il faut l\'aider à clarifier ce qu\'il devra défendre en interne : pourquoi cette solution, pourquoi maintenant, quels risques sont réduits, qui doit être rassuré et quelles conséquences de l\'inaction sont sous-estimées.',
            },
          },
          {
            '@type': 'Question',
            name: 'La psychologie de l\'acheteur B2B sert-elle à manipuler ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Non. Elle sert à comprendre qu\'une décision B2B apparemment rationnelle est portée par une personne qui cherche aussi à rester crédible, à éviter le mauvais choix et à expliquer clairement pourquoi la décision tient debout.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': articleUrl + '#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: 'https://www.laurentserre.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://www.laurentserre.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Psychologie acheteur B2B',
            item: articleUrl,
          },
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

      <section className="py-24 sm:py-32 pb-14 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500" aria-label="Fil d'Ariane">
            <Link href="/blog" className="hover:text-mint-green transition-colors">
              ← Retour au blog
            </Link>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">Vente B2B / psychologie d&apos;achat</span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Votre prospect ne compare pas seulement des offres. Il cherche une décision qu&apos;il pourra défendre.
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              En vente complexe, le vrai sujet n&apos;est pas toujours la préférence pour une solution.
              C&apos;est la capacité du client à porter son choix devant les autres.
            </p>

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
              <time dateTime="2026-05-18">18 mai 2026</time>
              <span>•</span>
              <span>6 min de lecture</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/blog/2026-05-18-psychologie-acheteur-b2b-hero.webp"
              alt="Psychologie acheteur B2B - aider le client à défendre sa décision"
              width={1536}
              height={1024}
              className="w-full h-auto object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg max-w-none">
          <div className="bg-mint-green/10 border border-mint-green/30 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">Ce que vous allez retenir</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Un acheteur B2B compare d&apos;abord des risques</strong> : changer, ne rien faire, se tromper, embarquer l&apos;équipe.</li>
              <li><strong>Une offre convaincante ne suffit pas</strong> si le client ne sait pas comment défendre son choix en interne.</li>
              <li><strong>Le rôle du commercial</strong> est d&apos;aider le prospect à clarifier sa décision, pas d&apos;empiler des arguments.</li>
              <li><strong>Les deals fragiles</strong> ne bloquent pas toujours sur le prix : ils bloquent souvent sur une décision encore impossible à porter.</li>
            </ul>
          </div>

          {/* Carrousel BD */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mb-10">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              🎬 Carrousel BD — Psychologie Acheteur B2B
            </p>
            <p className="text-sm text-amber-700 mb-5">
              13 planches illustrées — cliquez sur une vignette pour feuilleter la BD dans le lecteur intégré.
            </p>
            <BDCarousel
              images={[
                { src: '/images/blog/carrousel-psychologie-acheteur/01-cover-psychologie-acheteur-b2b.webp', alt: 'Couverture — Psychologie acheteur B2B', index: 1 },
                { src: '/images/blog/carrousel-psychologie-acheteur/02-marc-perdu-cafe.webp', alt: 'Marc perdu dans ses pensées au café', index: 2 },
                { src: '/images/blog/carrousel-psychologie-acheteur/03-laurent-questionne.webp', alt: 'Laurent questionne la situation', index: 3 },
                { src: '/images/blog/carrousel-psychologie-acheteur/04-sophie-bureau-pensive.webp', alt: 'Sophie pensive à son bureau', index: 4 },
                { src: '/images/blog/carrousel-psychologie-acheteur/05-sophie-risques.webp', alt: 'Sophie évalue les risques', index: 5 },
                { src: '/images/blog/carrousel-psychologie-acheteur/06-splitscreen-marc-sophie.webp', alt: 'Split-screen Marc et Sophie', index: 6 },
                { src: '/images/blog/carrousel-psychologie-acheteur/07-laurent-carnet-schema.webp', alt: 'Laurent dessine un schéma', index: 7 },
                { src: '/images/blog/carrousel-psychologie-acheteur/08-laurent-trois-regles.webp', alt: 'Les trois règles de Laurent', index: 8 },
                { src: '/images/blog/carrousel-psychologie-acheteur/09-laurent-explique-80pct.webp', alt: 'Laurent explique le 80%', index: 9 },
                { src: '/images/blog/carrousel-psychologie-acheteur/10-marc-note-questions.webp', alt: 'Marc note les questions clés', index: 10 },
                { src: '/images/blog/carrousel-psychologie-acheteur/11-marc-retour-sophie.webp', alt: 'Marc retourne voir Sophie', index: 11 },
                { src: '/images/blog/carrousel-psychologie-acheteur/12-chute-laurent-systeme-validation.webp', alt: 'Le système de validation', index: 12 },
                { src: '/images/blog/carrousel-psychologie-acheteur/13-cta-final-aller-plus-loin.webp', alt: 'CTA — Aller plus loin', index: 13 },
              ]}
              title="Carrousel BD — Psychologie Acheteur B2B"
              maxPreview={2}
            />
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-semibold text-sm rounded-full hover:bg-amber-700 transition-colors shadow-sm"
              >
                🔍 Évaluez votre équipe — Diagnostic gratuit
              </Link>
              <a
                href="/downloads/carrousel-psychologie-acheteur-b2b-019.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-700 text-xs hover:text-amber-900 transition-colors underline underline-offset-2"
              >
                Télécharger le PDF (13 planches)
              </a>
            </div>
          </div>

          <nav className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 mb-10" aria-label="Sommaire">
            <p className="font-title font-bold text-blue-ink text-sm uppercase tracking-wider mb-3">Sommaire</p>
            <ul className="space-y-1.5 text-sm">
              <li><a href="#risques" className="text-mint-green hover:underline">1. L&apos;acheteur B2B compare deux risques</a></li>
              <li><a href="#decision-interne" className="text-mint-green hover:underline">2. Ce que le client devra défendre après l&apos;entretien</a></li>
              <li><a href="#clarifier" className="text-mint-green hover:underline">3. Clarifier la décision au lieu d&apos;ajouter des arguments</a></li>
              <li><a href="#faq" className="text-mint-green hover:underline">4. FAQ psychologie acheteur B2B</a></li>
            </ul>
          </nav>

          <h2 id="risques" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            L&apos;acheteur B2B compare d&apos;abord des risques
          </h2>

          <p className="mb-8">
            Dans beaucoup de ventes B2B, le commercial croit que le client compare deux solutions.
          </p>
          <p className="mb-8">
            En réalité, il compare surtout deux risques.
          </p>
          <p className="mb-8">
            Le risque de changer.<br />
            Le risque de ne rien faire.<br />
            Le risque de se tromper devant son patron.<br />
            Le risque d&apos;embarquer son équipe dans un choix qu&apos;elle ne suivra pas.<br />
            Le risque de payer trop cher pour un résultat trop flou.
          </p>
          <p className="mb-8">
            C&apos;est là que beaucoup de ventes se jouent.<br />
            Pas dans la dernière ligne du devis.<br />
            Pas dans la remise.<br />
            Pas dans la slide qui explique encore une fois pourquoi la solution est meilleure.
          </p>
          <p className="mb-8">
            Je vois souvent des commerciaux très préparés sur leur offre, mais beaucoup moins sur la situation intérieure du client. Ils savent expliquer ce qu&apos;ils vendent. Ils savent répondre aux objections. Ils savent défendre leur prix.
          </p>
          <p className="mb-8">
            Mais ils n&apos;ont pas assez regardé ce que l&apos;acheteur doit défendre, lui, une fois que le commercial a quitté la salle.
          </p>

          <h2 id="decision-interne" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Ce que le client devra défendre après l&apos;entretien
          </h2>

          <p className="mb-8">
            Parce qu&apos;un acheteur B2B n&apos;achète presque jamais seul dans sa tête.
          </p>
          <p className="mb-8">
            Même quand il est décideur, il pense déjà aux questions qui vont arriver :
          </p>
          <blockquote className="border-l-4 border-mint-green pl-5 italic text-gray-700 my-8">
            <p className="mb-0">
              « Pourquoi eux ? »<br />
              « Pourquoi maintenant ? »<br />
              « Qu&apos;est-ce qu&apos;on risque si ça ne marche pas ? »<br />
              « Qu&apos;est-ce que ça va changer pour les équipes ? »<br />
              « Est-ce qu&apos;on va vraiment s&apos;en servir ? »
            </p>
          </blockquote>
          <p className="mb-8">
            Si le commercial répond seulement avec des arguments, il laisse son interlocuteur seul avec le plus difficile : porter la décision en interne.
          </p>
          <p className="mb-8">
            Et c&apos;est souvent là que la vente ralentit.
          </p>
          <p className="mb-8">
            Le client dit qu&apos;il doit réfléchir. Il dit qu&apos;il doit en parler. Il dit qu&apos;il revient vers vous après le prochain comité. Parfois c&apos;est vrai. Mais parfois, ce qu&apos;il veut dire, c&apos;est : « Je ne suis pas encore assez armé pour défendre ce choix. »
          </p>
          <p className="mb-8">
            La psychologie de l&apos;acheteur B2B, ce n&apos;est pas manipuler ses émotions. C&apos;est comprendre que derrière une décision apparemment rationnelle, il y a toujours une personne qui cherche à ne pas se mettre en danger.
          </p>

          <h2 id="clarifier" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            Clarifier la décision au lieu d&apos;ajouter des arguments
          </h2>

          <p className="mb-8">
            Elle veut faire avancer son entreprise, bien sûr.<br />
            Mais elle veut aussi rester crédible.<br />
            Elle veut éviter le mauvais choix.<br />
            Elle veut pouvoir expliquer clairement pourquoi cette décision tient debout.
          </p>
          <p className="mb-8">
            Le travail du commercial, à ce moment-là, n&apos;est pas d&apos;ajouter trois arguments.
          </p>
          <p className="mb-8">
            C&apos;est d&apos;aider le client à clarifier sa propre décision.
          </p>
          <p className="mb-8">
            Qu&apos;est-ce qui coince vraiment ?<br />
            Qui devra être rassuré ?<br />
            Quelle peur n&apos;est pas encore dite ?<br />
            Quelle conséquence de l&apos;inaction est sous-estimée ?<br />
            Qu&apos;est-ce que le client devra raconter à son équipe lundi matin ?
          </p>
          <p className="mb-8">
            Quand ces questions ne sont pas traitées, la vente peut avoir l&apos;air avancée alors qu&apos;elle est fragile. Le client est intéressé, mais pas prêt. Le besoin existe, mais la décision n&apos;est pas encore défendable.
          </p>
          <p className="mb-8">
            Un bon entretien commercial ne sert donc pas seulement à convaincre.
          </p>
          <p className="mb-8">
            Il sert à faire émerger ce que le client devra assumer après l&apos;entretien.
          </p>
          <p className="mb-8">
            Et plus cette partie est claire, moins la vente dépend d&apos;un dernier effort de persuasion. C&apos;est aussi pour cela qu&apos;une{' '}
            <Link href="/blog/revue-deal-avant-proposition-3-verifications" className="text-mint-green hover:underline font-medium">
              revue de deal avant proposition
            </Link>{' '}
            doit vérifier la décision interne, pas seulement le besoin exprimé.
          </p>

          {/* CTA mi-article — bootcamp */}
          <div className="bg-gradient-to-r from-mint-green/20 to-teal-50 border border-mint-green/30 rounded-2xl p-6 my-10 text-center">
            <p className="text-lg font-title font-bold text-blue-ink mb-2">
              Vous avez reconnu votre équipe dans ces 3 concepts&nbsp;?
            </p>
            <p className="text-sm text-gray-600 mb-4">
              La plupart des PME stagnent entre l&rsquo;étape 1 et 2. Le
              bootcamp commercial accélère cette transformation en
              8 semaines avec un coaching terrain personnalisé.
            </p>
            <Link
              href="/bootcamp"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-ink text-white font-semibold text-sm rounded-full hover:bg-blue-ink/90 transition-colors shadow-sm"
            >
              Découvrir le bootcamp
            </Link>
          </div>

          <p className="text-xs text-gray-400 mb-8">
            Source E-E-A-T : ce sujet rejoint les travaux publiés par Harvard Business Review sur la vente complexe et la difficulté à mobiliser un consensus d&apos;achat, notamment{' '}
            <a href="https://hbr.org/2015/03/making-the-consensus-sale" target="_blank" rel="noopener noreferrer" className="text-mint-green hover:underline">
              Making the Consensus Sale
            </a>
            .
          </p>

          <h2 id="faq" className="text-3xl font-title font-bold text-blue-ink mt-12 mb-6">
            FAQ — psychologie acheteur B2B
          </h2>
          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
                Pourquoi un acheteur B2B hésite même quand l&apos;offre semble bonne ?
              </h3>
              <p className="mb-0">
                Parce qu&apos;il ne compare pas seulement des offres. Il compare le risque de changer, le risque de ne rien faire, le risque de se tromper devant son manager et le risque de ne pas réussir à embarquer les équipes.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
                Comment aider un prospect B2B à prendre une décision ?
              </h3>
              <p className="mb-0">
                Il faut l&apos;aider à clarifier ce qu&apos;il devra défendre en interne : pourquoi cette solution, pourquoi maintenant, quels risques sont réduits, qui doit être rassuré et quelles conséquences de l&apos;inaction sont sous-estimées.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-title font-semibold text-blue-ink mb-3">
                La psychologie de l&apos;acheteur B2B sert-elle à manipuler ?
              </h3>
              <p className="mb-0">
                Non. Elle sert à comprendre qu&apos;une décision B2B apparemment rationnelle est portée par une personne qui cherche aussi à rester crédible, à éviter le mauvais choix et à expliquer clairement pourquoi la décision tient debout.
              </p>
            </div>
          </div>

          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/vente-consultative-b2b-comment-devenir-le-conseiller-que-vos-clients-ne-veulent-pas-perdre" className="text-mint-green hover:underline font-medium">
                  Vente consultative B2B : devenir le conseiller que vos clients gardent
                </Link>
                <span className="text-gray-500"> — Pour structurer la posture commerciale autour du diagnostic client.</span>
              </li>
              <li>
                <Link href="/blog/methodes-vente-comparees-spin-bant-bebedc" className="text-mint-green hover:underline font-medium">
                  Méthodes de vente comparées : SPIN, BANT, BEBEDC
                </Link>
                <span className="text-gray-500"> — Pour choisir une grille de qualification adaptée à une décision complexe.</span>
              </li>
              <li>
                <Link href="/blog/closing-b2b-7-techniques" className="text-mint-green hover:underline font-medium">
                  Closing B2B : 7 techniques pour conclure sans forcer
                </Link>
                <span className="text-gray-500"> — Pour conclure quand la décision a été clarifiée en amont.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h2 className="text-2xl font-title font-bold mb-4">
              Vos commerciaux préparent leurs offres, mais pas assez la décision intérieure du client ?
            </h2>
            <p className="mb-6">
              Un diagnostic commercial permet d&apos;identifier les vrais freins dans votre cycle de vente : qualification, décision interne, objections tardives, propositions envoyées trop tôt ou deals qui stagnent.
            </p>
            <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
              Faire un diagnostic commercial →
            </Link>
          </div>

          <div className="mt-12">
            <AuthorCard />
          </div>

          <section className="mt-12 pt-10 border-t border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-title font-bold text-blue-ink mb-8 text-center">
              Prendre contact avec Laurent Serre
            </h2>
            <HubSpotForm />
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog" className="text-mint-green hover:text-mint-green/80 transition-colors font-medium">
              ← Tous les articles du blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
