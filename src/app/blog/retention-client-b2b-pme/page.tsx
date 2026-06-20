import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HubSpotForm from '@/components/HubSpotForm';
import AuthorCard from '@/components/AuthorCard';
import BDCarousel from '@/components/BDCarousel';

const articleUrl = 'https://www.laurentserre.com/blog/retention-client-b2b-pme';
const heroImage = '/images/blog/retention-client-b2b-pme/retention-client-hero.webp';
const ogImage = 'https://www.laurentserre.com/images/blog/retention-client-b2b-pme/retention-client-og.jpg';

export const metadata: Metadata = {
  title: 'Rétention client B2B : pourquoi vos meilleurs clients partent en silence',
  description:
    'Vos meilleurs clients ne partent pas à cause du prix. Ils partent en silence quand personne ne s\'en occupe. La méthode terrain pour construire la rétention : rituel, indicateur, responsabilité.',
  keywords:
    'rétention client B2B, fidélisation client B2B PME, perte client silencieuse, design commercial rétention, revue trimestrielle client, score santé compte, Laurent Serre',
  alternates: {
    canonical: articleUrl,
  },
  other: {
    dateModified: '2026-06-20',
  },
  openGraph: {
    title: 'Vos meilleurs clients partent en silence',
    description:
      'La rétention ne se décrète pas. Elle se construit. Pourquoi vos meilleurs clients partent en silence et ce que faire pour le éviter.',
    url: articleUrl,
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Rétention client B2B — vos meilleurs clients partent en silence',
      },
    ],
    siteName: 'Laurent Serre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vos meilleurs clients partent en silence | Laurent Serre',
    description:
      'La rétention ne se décrète pas. Elle se construit. Le design commercial qui empêche vos clients de partir en silence.',
    images: [ogImage],
  },
};

const carouselPrefix = '/images/blog/retention-client-b2b-pme';

const carouselImages = [
  { src: `${carouselPrefix}/bd-slide-01-cover.webp`, alt: 'Couverture — Vos meilleurs clients partent en silence', index: 0 },
  { src: `${carouselPrefix}/bd-slide-02-mail.webp`, alt: 'Le mail qui annonce le non-renouvellement', index: 1 },
  { src: `${carouselPrefix}/bd-slide-03-flashback.webp`, alt: 'Flashback : la signature six mois plus tôt', index: 2 },
  { src: `${carouselPrefix}/bd-slide-04-justification.webp`, alt: 'La justification automatique du commercial', index: 3 },
  { src: `${carouselPrefix}/bd-slide-05-laurent.webp`, alt: 'Laurent pose la question qui dérange', index: 4 },
  { src: `${carouselPrefix}/bd-slide-06-silence.webp`, alt: 'Le silence gêné du commercial', index: 5 },
  { src: `${carouselPrefix}/bd-slide-07-laurent-creuse.webp`, alt: 'Laurent creuse : personne n\'a rappelé', index: 6 },
  { src: `${carouselPrefix}/bd-slide-08-revelation.webp`, alt: 'La révélation : le client est parti parce qu\'on a disparu', index: 7 },
  { src: `${carouselPrefix}/bd-slide-09-methode.webp`, alt: 'La méthode : rituel, indicateur, responsable', index: 8 },
  { src: `${carouselPrefix}/bd-slide-10-action.webp`, alt: 'Stéphane se met en mouvement et rappelle son client', index: 9 },
  { src: `${carouselPrefix}/bd-slide-11-chute.webp`, alt: 'La chute : signer n\'est pas la fin, c\'est le début', index: 10 },
  { src: `${carouselPrefix}/bd-slide-12-cta.webp`, alt: 'CTA — Diagnostic offert sur laurentserre.com', index: 11 },
];

const faqItems = [
  {
    question: 'Pourquoi mes meilleurs clients partent-ils sans raison apparente ?',
    answer:
      'Vos meilleurs clients ne partent pas à cause du prix ou de la concurrence. Ils partent en silence parce que personne dans votre équipe n\'a maintenu la relation après la signature. Le client a acheté une promesse et personne ne lui a montré que la promesse tenait dans le réel. La perte de ce client est la conséquence directe d\'un vide dans votre design commercial : personne n\'était nommément responsable de le rappeler, de vérifier que tout fonctionnait, de détecter les signaux faibles.',
  },
  {
    question: 'Qu\'est-ce qu\'un design commercial de rétention ?',
    answer:
      'Un design commercial de rétention, c\'est trois mécanismes simples. D\'abord un rituel : une revue trimestrielle avec chaque client stratégique, un vrai rendez-vous calendaire avec un ordre du jour. Ensuite un indicateur : un score de santé du compte simple, qui mesure les échanges, l\'usage et l\'engagement des personnes clés. Enfin une responsabilité : un nom, pas un rôle flou. Le commercial qui a signé garde le compte pendant 12 mois. Ce n\'est pas le support qui gère la relation, c\'est celui qui a promis.',
  },
  {
    question: 'Comment mesurer la santé d\'un compte client B2B ?',
    answer:
      'La santé d\'un compte client B2B se mesure avec trois indicateurs simples. Est-ce qu\'on a eu des échanges ce mois-ci (appel, rendez-vous, pas seulement un mail) ? Est-ce que l\'usage du produit ou service monte ou descend ? Est-ce que les personnes qui étaient engagées au départ sont toujours là ou ont-elles été remplacées ? Si un compte devient silencieux sur ces trois dimensions, c\'est un signal d\'alerte qui précède de plusieurs mois le non-renouvellement.',
  },
  {
    question: 'Qui devrait être responsable de la rétention client dans une PME ?',
    answer:
      'Le commercial qui a signé le client doit garder la responsabilité du compte pendant au moins 12 mois après la signature. Ce n\'est pas le rôle du support ou du service client, qui n\'ont pas la posture commerciale pour détecter une opportunité d\'expansion. Et ce n\'est pas le rôle du directeur commercial, qui n\'a pas le temps de suivre chaque compte individuellement. Celui qui a fait la promesse lors de la vente doit être celui qui vérifie qu\'elle est tenue.',
  },
  {
    question: 'Comment éviter le silence commercial après la signature ?',
    answer:
      'Le silence commercial après la signature s\'évite avec de la discipline, pas avec de la bonne volonté. Trois mécanismes concrets. Un rituel calendaire : une revue trimestrielle avec chaque client stratégique, bloquée dans l\'agenda, non négociable. Un indicateur de santé du compte vérifié mensuellement. Et une responsabilité nominative claire : un nom attaché à chaque compte, pas un rôle vague comme « le support » ou « l\'équipe ». Le client doit savoir qui appeler, et cette personne doit appeler la première.',
  },
];

export default function RetentionClientB2BPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: 'Vos meilleurs clients partent en silence',
        description:
          'Vos meilleurs clients ne partent pas à cause du prix. Ils partent en silence quand personne ne s\'en occupe. La méthode terrain pour construire la rétention.',
        image: heroImage,
        datePublished: '2026-06-20',
        dateModified: '2026-06-20',
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
          '@id': articleUrl,
        },
        articleSection: 'Rétention client / Design commercial',
        keywords: [
          'rétention client B2B',
          'fidélisation client B2B PME',
          'perte client silencieuse',
          'design commercial rétention',
          'revue trimestrielle client',
          'score santé compte',
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
          { '@type': 'ListItem', position: 3, name: 'Rétention client B2B', item: articleUrl },
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
              <li className="text-blue-ink font-medium" aria-current="page">Rétention client B2B</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-mint-green/10 backdrop-blur-sm border border-mint-green/30 px-4 py-2 rounded-full mb-6">
              <span className="font-title font-semibold text-mint-green text-sm">
                Rétention client / Design commercial
              </span>
            </div>

            <h1 className="text-4xl font-title font-bold tracking-tight text-blue-ink sm:text-5xl mb-6">
              Vos meilleurs clients partent en silence
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
              <time dateTime="2026-06-20">20 juin 2026</time>
              <span>•</span>
              <span>7 min de lecture</span>
            </div>
          </div>

          <div className="relative mb-12">
            <Image
              src={heroImage}
              alt="Rétention client B2B — vos meilleurs clients partent en silence"
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
            <p className="text-sm font-semibold text-mint-green mb-2">
              Ce qu&apos;il faut retenir
            </p>
            <p className="text-gray-700 leading-relaxed">
              Le commercial ne finit pas à la signature. C&apos;est là qu&apos;il commence vraiment. Trois mécanismes pour construire la rétention : un rituel de revue trimestrielle, un indicateur de santé du compte, et un nom responsable pendant 12 mois.
            </p>
          </div>

          {/* BD Carousel */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-6 mt-10 mb-6">
            <p className="font-title font-bold text-amber-800 text-sm uppercase tracking-wider mb-4">
              Carrousel BD : Le client qui part en silence
            </p>
            <p className="text-sm text-amber-700 mb-5">
              L&apos;histoire de Stéphane, commercial senior, qui découvre que son meilleur client est parti sans un mot. De la sidération à la méthode qui empêche que ça se reproduise.
            </p>
            <BDCarousel
              images={carouselImages}
              title="Carrousel BD : Rétention client B2B — le client qui part en silence"
              maxPreview={2}
            />
            <div className="mt-4 text-center">
              <Link
                href="/downloads/carrousel-retention-client-b2b.pdf"
                className="inline-flex items-center gap-2 text-sm font-medium text-mint-green hover:text-mint-green/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Télécharger le carrousel PDF
              </Link>
            </div>
          </div>

          {/* CTA SOFT — après carrousel */}
          <div className="mb-6 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-mint-green/10 text-mint-green text-sm font-medium px-4 py-2 rounded-full hover:bg-mint-green/20 transition-colors"
            >
              🔍 Vos meilleurs clients deviennent silencieux ? Faites un diagnostic →
            </Link>
          </div>

          <p className="lead text-xl text-gray-700 leading-relaxed mb-8">
            Vos meilleurs clients ne partent pas à cause du prix. Ils partent quand personne ne s&apos;en occupe.
          </p>

          <p>
            Vos meilleurs clients partent en silence. Pas après une crise. Pas après une réclamation mal gérée. Ils partent comme on s&apos;éloigne d&apos;une conversation qui n&apos;apporte plus rien. Sans bruit. Sans motif apparent. Un jour, le contrat n&apos;est pas renouvelé. Ou le volume baisse. Ou le référent change et personne n&apos;appelle.
          </p>

          <p>
            Je vois souvent des commerciaux qui vivent la signature comme la fin du travail. Le contrat est signé. L&apos;affaire est dans le CRM. On passe au suivant.
          </p>

          <p>
            Le problème, c&apos;est que le client n&apos;a jamais considéré que c&apos;était terminé.
          </p>

          <p>
            Pour lui, la vraie relation commence juste. Il a acheté une promesse. Maintenant il veut voir ce que ça donne dans le vrai monde, avec ses équipes, dans sa vraie vie. Et pendant ce temps-là, le commercial qui l&apos;a signé est déjà sur le prochain prospect.
          </p>

          <p>
            Ce n&apos;est pas un problème de service client. C&apos;est un problème de design commercial.
          </p>

          <p>
            Qui appelle le client à 30 jours ? À 60 jours ? Qui vérifie que la promesse tient dans le réel ? Qui détecte les signaux faibles avant qu&apos;ils ne deviennent du silence ?
          </p>

          <p>
            Dans la plupart des PME que j&apos;accompagne, la réponse est : personne. Ou alors le support, qui n&apos;a pas la posture commerciale pour détecter une opportunité d&apos;expansion. Ou le DirCo, qui n&apos;a pas le temps.
          </p>

          <p>
            La vérité dure : la rétention ne se décrète pas. Elle se construit, ou elle n&apos;existe pas.
          </p>

          <p>
            Un client qui ne donne pas de nouvelles n&apos;est pas un client satisfait. C&apos;est un client qui n&apos;a pas encore trouvé le moment de partir.
          </p>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">La méthode : trois mécanismes qui changent tout</h2>

          <p>
            La méthode n&apos;est pas compliquée. Mais elle demande de la discipline.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">Un rituel</h3>

          <p>
            Une revue trimestrielle avec chaque client stratégique. Pas un mail. Pas un message rapide. Un vrai rendez-vous calendaire, avec un ordre du jour, où on parle de ce qui marche, de ce qui ne marche pas, et de ce qui va changer. Si le client décline, c&apos;est un signal. S&apos;il vient, la relation se renforce.
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">Un indicateur</h3>

          <p>
            Ne pas attendre le non-renouvellement pour réagir. Chaque compte devrait avoir un score de santé simple. Est-ce qu&apos;on a eu des échanges ce mois-ci ? Est-ce que l&apos;usage monte ou descend ? Est-ce que les personnes engagées au départ sont toujours là ?
          </p>

          <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">Une responsabilité</h3>

          <p>
            Pas un rôle flou. Un nom. Le commercial qui a signé garde le compte pendant 12 mois. Ce n&apos;est pas le support qui gère la relation. C&apos;est celui qui a promis.
          </p>

          {/* CTA MEDIUM — entre les sections */}
          <div className="bg-gradient-to-r from-mint-green/10 to-blue-ink/5 border border-mint-green/20 rounded-2xl p-6 my-10 text-center">
            <p className="text-lg font-title font-bold text-blue-ink mb-3">
              Vous savez combien de clients sont sortis par l&apos;autre bout cette année ?
            </p>
            <p className="text-gray-600 mb-5 max-w-xl mx-auto">
              Un diagnostic terrain de 2 heures suffit pour identifier les fuites et mettre en place les trois mécanismes qui les stoppent.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-ink hover:bg-blue-ink/90 transition-colors"
            >
              Demander un diagnostic offert
            </Link>
          </div>

          <h2 className="text-2xl font-title font-bold text-blue-ink mt-12 mb-6">Remplir une passoire</h2>

          <p>
            J&apos;accompagne des DirCo obnubilés par le volume de prospects. Combien de nouveaux rendez-vous cette semaine. Combien d&apos;opportunités nouvelles dans le CRM.
          </p>

          <p>
            Ils ne regardent jamais combien de clients sont sortis par l&apos;autre bout.
          </p>

          <p>
            C&apos;est remplir une passoire en espérant qu&apos;elle se remplisse.
          </p>

          <p>
            Avant de prospecter plus, bouchez les fuites.
          </p>

          <p>
            Vos meilleurs clients sont ceux que vous avez déjà. Ce sont les plus rentables, les plus faciles à développer, les plus susceptibles de vous recommander. Et ce sont les premiers à partir en silence quand personne ne s&apos;en occupe.
          </p>

          <p className="text-xl font-title font-bold text-blue-ink mt-12 mb-4">
            Le commercial ne finit pas à la signature. C&apos;est là qu&apos;il commence vraiment.
          </p>

          {/* ════════ POUR ALLER PLUS LOIN ════════ */}
          <div className="bg-blue-ink/5 border border-blue-ink/10 rounded-2xl p-6 my-10">
            <p className="text-lg font-title font-bold text-blue-ink mb-4">Pour aller plus loin</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/blog/comptes-strategiques-dormants-relance-dirigeant" className="text-mint-green hover:underline font-medium">
                  Comptes stratégiques dormants : la relance par le dirigeant
                </Link>
                <span className="text-gray-500"> — Comment réveiller les comptes endormis avant qu&apos;ils ne partent.</span>
              </li>
              <li>
                <Link href="/blog/coaching-commercial-terrain-5-leviers-transformation-equipe" className="text-mint-green hover:underline font-medium">
                  Coaching commercial terrain : 5 leviers de transformation d&apos;équipe
                </Link>
                <span className="text-gray-500"> — Les leviers concrets pour transformer une équipe commerciale.</span>
              </li>
              <li>
                <Link href="/blog/fatigue-commercial-terrain-rythme-performance" className="text-mint-green hover:underline font-medium">
                  Fatigue du commercial terrain : tenir sans s&apos;épuiser
                </Link>
                <span className="text-gray-500"> — Un commercial fatigué laisse filer ses clients sans le voir.</span>
              </li>
              <li>
                <Link href="/blog/comite-commercial-mensuel-decisions-dirigeant" className="text-mint-green hover:underline font-medium">
                  Comité commercial mensuel : les décisions du dirigeant
                </Link>
                <span className="text-gray-500"> — Le rituel mensuel pour piloter la rétention, pas seulement l&apos;acquisition.</span>
              </li>
            </ul>
          </div>

          {/* CTA FORT — bloc gradient, 2 boutons */}
          <div className="bg-gradient-to-r from-blue-ink to-blue-ink/90 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-title font-bold mb-4">Vos clients partent en silence ?</h3>
            <p className="mb-6">
              La plupart des dirigeants découvrent les fuites quand il est trop tard. Un diagnostic permet d&apos;identifier quels comptes sont à risque et de mettre en place les trois mécanismes qui construisent la rétention.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-blue-ink bg-mint-green hover:bg-mint-green/90 transition-colors">
                Demander un diagnostic commercial
              </Link>
              <Link href="/bootcamp" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors">
                Découvrir le Bootcamp Méthodes de vente
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-title font-bold text-blue-ink mb-8">
              Questions fréquentes sur la rétention client B2B
            </h2>
            <div className="space-y-8">
              {faqItems.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-title font-semibold text-blue-ink mt-8 mb-4">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AuthorCard + CTA secondaire */}
          <div className="mt-12">
            <AuthorCard />
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Coach commercial terrain depuis 15 ans. J&apos;accompagne les PME B2B à construire des designs commerciaux qui tiennent dans le réel, de la prospection à la rétention.{' '}
              <Link href="/contact" className="text-mint-green hover:text-mint-green/80 font-medium transition-colors">
                Contactez-moi
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
